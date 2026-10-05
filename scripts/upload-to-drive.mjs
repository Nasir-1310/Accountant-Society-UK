// Upload a local folder of event photos to a Google Drive folder, so the
// website gallery (which reads public Drive folders) can display them.
//
// Usage:
//   node upload-to-drive.mjs --key ./service-account.json --source "./photos" --parent <driveFolderId> [--all]
//
// Flags:
//   --key     Path to the Google service-account JSON key file.   (required)
//   --source  Local folder containing the downloaded photos.      (required)
//   --parent  The Google Drive folder ID to upload INTO.          (required)
//             (Create this folder in your own Drive, share it with
//              the service-account email as Editor, and set it to
//              "Anyone with the link: Viewer".)
//   --all     Also upload videos (mp4/mov/webm). Default: images only.
//
// See README.md in this folder for the full step-by-step setup.

import fs from "node:fs";
import path from "node:path";
import { google } from "googleapis";

// ---- tiny arg parser -------------------------------------------------------
function parseArgs(argv) {
    const args = {};
    for (let i = 0; i < argv.length; i++) {
        const token = argv[i];
        if (token.startsWith("--")) {
            const key = token.slice(2);
            const next = argv[i + 1];
            if (next && !next.startsWith("--")) {
                args[key] = next;
                i++;
            } else {
                args[key] = true; // boolean flag
            }
        }
    }
    return args;
}

const args = parseArgs(process.argv.slice(2));

const keyPath = args.key;
const sourceDir = args.source;
const parentId = args.parent;
const includeVideos = Boolean(args.all);

function fail(message) {
    console.error(`\n❌ ${message}\n`);
    console.error("Run with: node upload-to-drive.mjs --key ./service-account.json --source \"./photos\" --parent <driveFolderId> [--all]\n");
    process.exit(1);
}

if (!keyPath) fail("Missing --key (path to the service-account JSON key).");
if (!sourceDir) fail("Missing --source (local folder with the photos).");
if (!parentId) fail("Missing --parent (the Google Drive folder ID to upload into).");
if (!fs.existsSync(keyPath)) fail(`Key file not found: ${keyPath}`);
if (!fs.existsSync(sourceDir)) fail(`Source folder not found: ${sourceDir}`);

// ---- mime map --------------------------------------------------------------
const IMAGE_MIME = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".heic": "image/heic",
    ".heif": "image/heif",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
};
const VIDEO_MIME = {
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
    ".webm": "video/webm",
    ".m4v": "video/x-m4v",
};

function mimeFor(ext) {
    if (IMAGE_MIME[ext]) return IMAGE_MIME[ext];
    if (includeVideos && VIDEO_MIME[ext]) return VIDEO_MIME[ext];
    return null;
}

// ---- collect files (recurses into subfolders, uploads flat) ---------------
function collectFiles(dir, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            collectFiles(full, out);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            const mimeType = mimeFor(ext);
            if (mimeType) out.push({ full, name: entry.name, mimeType });
        }
    }
    return out;
}

async function listExistingNames(drive, folderId) {
    const names = new Set();
    let pageToken;
    do {
        const res = await drive.files.list({
            q: `'${folderId}' in parents and trashed=false`,
            fields: "nextPageToken, files(name)",
            pageSize: 1000,
            pageToken,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });
        for (const f of res.data.files || []) names.add(f.name);
        pageToken = res.data.nextPageToken || undefined;
    } while (pageToken);
    return names;
}

async function uploadOne(drive, file, parentId, attempt = 1) {
    try {
        await drive.files.create({
            requestBody: { name: file.name, parents: [parentId] },
            media: { mimeType: file.mimeType, body: fs.createReadStream(file.full) },
            fields: "id,name",
            supportsAllDrives: true,
        });
        return true;
    } catch (err) {
        if (attempt < 3) {
            const wait = attempt * 2000;
            console.warn(`   ⚠️  ${file.name} failed (attempt ${attempt}) — retrying in ${wait / 1000}s...`);
            await new Promise((r) => setTimeout(r, wait));
            return uploadOne(drive, file, parentId, attempt + 1);
        }
        console.error(`   ❌ ${file.name} failed permanently: ${err?.message || err}`);
        return false;
    }
}

async function main() {
    const files = collectFiles(sourceDir);
    if (files.length === 0) {
        fail(`No ${includeVideos ? "image/video" : "image"} files found in ${sourceDir}.` +
            (includeVideos ? "" : " (Add --all to also include videos.)"));
    }

    console.log(`\n📂 Source:  ${path.resolve(sourceDir)}`);
    console.log(`🎯 Target:  Google Drive folder ${parentId}`);
    console.log(`🖼️  Found:   ${files.length} file(s) to consider (${includeVideos ? "images + videos" : "images only"})\n`);

    const auth = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const drive = google.drive({ version: "v3", auth });

    // Resume support: skip files already present (matched by name).
    let existing;
    try {
        existing = await listExistingNames(drive, parentId);
    } catch (err) {
        fail(`Could not read the target Drive folder. Check the folder ID and that it is shared with the service account as Editor.\n   Details: ${err?.message || err}`);
    }

    let uploaded = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const label = `[${i + 1}/${files.length}] ${file.name}`;
        if (existing.has(file.name)) {
            console.log(`   ⏭️  ${label} — already in Drive, skipping`);
            skipped++;
            continue;
        }
        process.stdout.write(`   ⬆️  ${label} ... `);
        const ok = await uploadOne(drive, file, parentId);
        if (ok) {
            console.log("done");
            uploaded++;
        } else {
            failed++;
        }
    }

    console.log("\n──────────────────────────────────────────");
    console.log(`✅ Uploaded: ${uploaded}`);
    console.log(`⏭️  Skipped (already there): ${skipped}`);
    if (failed) console.log(`❌ Failed: ${failed}`);
    console.log("──────────────────────────────────────────");
    console.log(`\n👉 Drive folder ID for the website:  ${parentId}`);
    console.log(`   Paste it into Client/src/app/data/galleryData.ts`);
    console.log(`   (replace "REPLACE_WITH_2026_DRIVE_FOLDER_ID").`);
    console.log(`\n   Make sure the folder is shared "Anyone with the link: Viewer"`);
    console.log(`   so the website can display the photos.\n`);

    if (failed) process.exit(1);
}

main().catch((err) => {
    console.error(`\n❌ Unexpected error: ${err?.message || err}\n`);
    process.exit(1);
});
