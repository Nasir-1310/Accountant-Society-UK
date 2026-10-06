// Turn a Google Drive or YouTube share link (or a bare Drive file ID) into an
// embeddable player URL. Returns null when the link isn't recognised.
//
// The returned URL is always built from a validated ID, so whatever an admin
// types can only ever point the player at Google Drive or YouTube.

const ID_PATTERN = /^[A-Za-z0-9_-]+$/;

function getYouTubeId(input: string): string | null {
    try {
        const url = new URL(input);
        const host = url.hostname.replace(/^(www|m)\./, "");
        if (host === "youtu.be") return url.pathname.split("/")[1] || null;
        if (host === "youtube.com" || host === "youtube-nocookie.com") {
            if (url.pathname === "/watch") return url.searchParams.get("v");
            const match = url.pathname.match(/^\/(embed|shorts|live)\/([^/?#]+)/);
            if (match) return match[2];
        }
    } catch {
        // Not a URL.
    }
    return null;
}

function getDriveId(input: string): string | null {
    // https://drive.google.com/file/d/<id>/view?usp=sharing
    const fileMatch = input.match(/\/file\/d\/([^/?#]+)/);
    if (fileMatch) return fileMatch[1];

    try {
        // https://drive.google.com/open?id=<id> or .../uc?id=<id>
        const url = new URL(input);
        if (url.hostname === "drive.google.com" || url.hostname === "docs.google.com") {
            return url.searchParams.get("id");
        }
    } catch {
        // Not a URL — accept a bare Drive file ID.
        if (input.length >= 20) return input;
    }
    return null;
}

export function getVideoEmbedUrl(input: string | null | undefined): string | null {
    const value = (input || "").trim();
    if (!value) return null;

    const youTubeId = getYouTubeId(value);
    if (youTubeId && ID_PATTERN.test(youTubeId)) {
        return `https://www.youtube-nocookie.com/embed/${youTubeId}?rel=0`;
    }

    const driveId = getDriveId(value);
    if (driveId && ID_PATTERN.test(driveId)) {
        return `https://drive.google.com/file/d/${driveId}/preview`;
    }

    return null;
}
