// Upload a local folder of event photos to a Google Drive folder, authenticating
// AS YOU (the Google account that owns the folder) via OAuth.
//
// Use this instead of the service-account version when the Drive is a normal
// (consumer) Gmail account — service accounts have no storage quota there.
//
// Usage:
//   node upload-oauth.mjs --client ./client_secret.json --source "./photos" --parent <driveFolderId> [--all]
//
// Flags:
//   --client  Path to the OAuth client JSON (a "Desktop app" OAuth client you
//             download from Google Cloud Console).                 (required)
//   --source  Local folder containing the downloaded photos.       (required)
//   --parent  The Google Drive folder ID to upload INTO.           (required)
//   --token   Where to cache the sign-in token (default ./oauth-token.json).
//             After the first run you won't need to sign in again.
//   --all     Also upload videos (mp4/mov/webm). Default: images only.
//
// The FIRST run opens your browser once to approve access. After that the
// cached token is reused silently.

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { exec } from "node:child_process";
import { google } from "googleapis";

// ---- tiny arg parser -------------------------------------------------------
function parseArgs(argv) {
    const args = {};
    for (let i = 0; i < argv.length; i++) {
        const token = argv[i];
        if (token.startsWith("--")) {
            const key = token.slice(2);
            const next = argv[i + 1];
            if (next && !next.startsWith("--")) { args[key] = next; i++; }
            else args[key] = true;
        }
    }
    return args;
}

const args = parseArgs(process.argv.slice(2));
const clientPath = args.client;
const sourceDir = args.source;
const parentId = args.parent;
const tokenPath = typeof args.token === "string" ? args.token : "./oauth-token.json";
const includeVideos = Boolean(args.all);

function fail(message) {
    console.error(`\n❌ ${message}\n`);
    console.error('Run: node upload-oauth.mjs --client ./client_secret.json --source "./photos" --parent <driveFolderId> [--all]\n');
    process.exit(1);
}

if (!clientPath) fail("Missing --client (path to the OAuth client JSON).");
if (!sourceDir) fail("Missing --source (local folder with the photos).");
if (!parentId) fail("Missing --parent (the Google Drive folder ID to upload into).");
if (!fs.existsSync(clientPath)) fail(`Client file not found: ${clientPath}`);
if (!fs.existsSync(sourceDir)) fail(`Source folder not found: ${sourceDir}`);

// ---- mime map --------------------------------------------------------------
const IMAGE_MIME = {
    ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
    ".webp": "image/webp", ".gif": "image/gif", ".heic": "image/heic",
    ".heif": "image/heif", ".tif": "image/tiff", ".tiff": "image/tiff",
};
const VIDEO_MIME = {
    ".mp4": "video/mp4", ".mov": "video/quicktime", ".webm": "video/webm", ".m4v": "video/x-m4v",
};
function mimeFor(ext) {
    if (IMAGE_MIME[ext]) return IMAGE_MIME[ext];
    if (includeVideos && VIDEO_MIME[ext]) return VIDEO_MIME[ext];
    return null;
}

function collectFiles(dir, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) collectFiles(full, out);
        else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            const mimeType = mimeFor(ext);
            if (mimeType) out.push({ full, name: entry.name, mimeType });
        }
    }
    return out;
}

// ---- OAuth (installed-app flow with local loopback) ------------------------
function loadClient() {
    const raw = JSON.parse(fs.readFileSync(clientPath, "utf8"));
    const conf = raw.installed || raw.web;
    if (!conf) fail("The client JSON is not a Desktop/installed OAuth client (no 'installed' section).");
    return conf;
}

async function authorize() {
    const conf = loadClient();

    // Reuse a cached token if present.
    if (fs.existsSync(tokenPath)) {
        const oAuth2Client = new google.auth.OAuth2(conf.client_id, conf.client_secret, "http://localhost");
        oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(tokenPath, "utf8")));
        oAuth2Client.on("tokens", (tokens) => {
            const merged = { ...JSON.parse(fs.readFileSync(tokenPath, "utf8")), ...tokens };
            fs.writeFileSync(tokenPath, JSON.stringify(merged, null, 2));
        });
        return oAuth2Client;
    }

    // First run: interactive consent via a local redirect server.
    return new Promise((resolve, reject) => {
        const server = http.createServer();
        server.listen(0, "127.0.0.1", async () => {
            const port = server.address().port;
            const redirectUri = `http://localhost:${port}`;
            const oAuth2Client = new google.auth.OAuth2(conf.client_id, conf.client_secret, redirectUri);

            const authUrl = oAuth2Client.generateAuthUrl({
                access_type: "offline",
                prompt: "select_account consent",
                scope: ["https://www.googleapis.com/auth/drive"],
            });

            server.on("request", async (req, res) => {
                try {
                    const url = new URL(req.url, redirectUri);
                    const code = url.searchParams.get("code");
                    const err = url.searchParams.get("error");
                    if (err) {
                        res.end("Authorization failed. You can close this tab.");
                        server.close();
                        return reject(new Error(`OAuth error: ${err}`));
                    }
                    if (!code) { res.end("Waiting for authorization..."); return; }

                    const { tokens } = await oAuth2Client.getToken(code);
                    oAuth2Client.setCredentials(tokens);
                    fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));
                    res.end("✅ Authorized! You can close this tab and return to the terminal.");
                    server.close();
                    resolve(oAuth2Client);
                } catch (e) {
                    res.end("Something went wrong. You can close this tab.");
                    server.close();
                    reject(e);
                }
            });

            console.log("\n🔐 A browser window should open for you to approve access.");
            console.log("   If it doesn't, open this URL manually:\n");
            console.log(`   ${authUrl}\n`);
            console.log("   (If Google warns the app is unverified: Advanced → Go to <app> (unsafe).\n    This is your own personal OAuth client, so it is safe.)\n");

            // Try to open the browser automatically. On Windows use PowerShell's
            // Start-Process so the URL's & and % characters are not mangled by cmd.
            if (process.platform === "win32") {
                exec(`powershell -NoProfile -Command "Start-Process '${authUrl.replace(/'/g, "''")}'"`, () => { });
            } else if (process.platform === "darwin") {
                exec(`open "${authUrl}"`, () => { });
            } else {
                exec(`xdg-open "${authUrl}"`, () => { });
            }
        });
        server.on("error", reject);
    });
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
    console.log(`🖼️  Found:   ${files.length} file(s) to consider (${includeVideos ? "images + videos" : "images only"})`);

    const auth = await authorize();
    const drive = google.drive({ version: "v3", auth });

    let existing;
    try {
        existing = await listExistingNames(drive, parentId);
    } catch (err) {
        fail(`Could not read the target Drive folder. Check the folder ID and that your account can access it.\n   Details: ${err?.message || err}`);
    }

    let uploaded = 0, skipped = 0, failed = 0;
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
        if (ok) { console.log("done"); uploaded++; } else { failed++; }
    }

    console.log("\n──────────────────────────────────────────");
    console.log(`✅ Uploaded: ${uploaded}`);
    console.log(`⏭️  Skipped (already there): ${skipped}`);
    if (failed) console.log(`❌ Failed: ${failed}`);
    console.log("──────────────────────────────────────────");
    console.log(`\n👉 Drive folder ID for the website:  ${parentId}`);
    console.log(`   Paste it into Client/src/app/data/galleryData.ts`);
    console.log(`   (replace "REPLACE_WITH_2026_DRIVE_FOLDER_ID").`);
    console.log(`   Ensure the folder is shared "Anyone with the link: Viewer".\n`);

    if (failed) process.exit(1);
}

main().catch((err) => {
    console.error(`\n❌ Unexpected error: ${err?.message || err}\n`);
    process.exit(1);
});
