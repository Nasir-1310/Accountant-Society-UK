# Gallery → Google Drive uploader

A one-off helper that uploads a folder of event photos to a Google Drive
folder, so the website gallery (which reads **public Google Drive folders**)
can display them.

You download the photos from the Aftershoot client portal yourself
(one click: **Download all**), then this script handles the upload.

---

## One-time setup (≈10 minutes)

### 1. Create a Google Cloud service account + key

1. Go to <https://console.cloud.google.com/> and create a project (or pick one).
2. Enable the Drive API:
   **APIs & Services → Library → search "Google Drive API" → Enable**.
3. Create the service account:
   **APIs & Services → Credentials → Create credentials → Service account**.
   Give it a name (e.g. `gallery-uploader`), click **Done**.
4. Make a key:
   Click the new service account → **Keys** tab → **Add key → Create new key
   → JSON**. A `.json` file downloads. **Keep it private — never commit it.**
5. Open that JSON file and copy the `client_email` value
   (looks like `gallery-uploader@your-project.iam.gserviceaccount.com`).

### 2. Create the Drive folder and share it

1. In **your own** Google Drive, create a folder, e.g.
   `British Bangladeshi Accountants Day 2026`.
2. Right-click the folder → **Share**:
   - Add the service account's `client_email` as **Editor**
     (so the script can upload into it).
   - Also set **General access → Anyone with the link → Viewer**
     (so the website can read the photos).
3. Open the folder and copy its ID from the URL:
   `https://drive.google.com/drive/folders/`**`THIS_IS_THE_FOLDER_ID`**

### 3. Install dependencies (once)

From this `scripts/` folder:

```bash
npm install
```

---

## Each time you have new photos

1. In the Aftershoot portal, click **Download all**, then unzip it to a folder,
   e.g. `C:\Users\HP\Downloads\accountants-day-2026`.
2. Run (from this `scripts/` folder):

```bash
node upload-to-drive.mjs --key "C:\path\to\service-account.json" --source "C:\Users\HP\Downloads\accountants-day-2026" --parent THE_FOLDER_ID
```

   Add `--all` to also upload videos (mp4/mov/webm):

```bash
node upload-to-drive.mjs --key "...json" --source "...folder" --parent FOLDER_ID --all
```

The script:
- uploads every image (and videos with `--all`), recursing into subfolders;
- **skips files already in Drive**, so you can safely re-run it to resume;
- retries failed uploads up to 3 times;
- prints the folder ID to use on the website at the end.

3. Put that folder ID into the website:
   open `Client/src/app/data/galleryData.ts` and replace
   `REPLACE_WITH_2026_DRIVE_FOLDER_ID` with the folder ID.

That's it — the gallery page will show the photos.

---

## Notes

- **Images only by default.** The site gallery renders images; videos are
  uploaded only with `--all` (the current gallery page does not display them).
- The service-account JSON key is a secret. Store it outside the repo, or at
  least never commit it. (`*.json` keys are not tracked by this folder.)
- If you see *"Could not read the target Drive folder"*, the folder isn't
  shared with the service-account email as Editor, or the folder ID is wrong.
