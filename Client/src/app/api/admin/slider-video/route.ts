import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import SiteSetting, { SLIDER_SETTING_KEY } from "@/models/SiteSetting";
import { getSliderVideoSettings, toSliderVideoSettings } from "@/lib/sliderVideoSettings";
import { getVideoEmbedUrl } from "@/lib/videoEmbed";
import { authenticateAdmin } from "@/lib/authMiddleware";

export const dynamic = "force-dynamic";

// GET - current homepage slider video setting (admin only)
export async function GET(request: NextRequest) {
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        await dbConnect();
        const settings = await getSliderVideoSettings();
        return NextResponse.json(settings, { status: 200 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to read setting";
        console.error("Error reading slider video setting:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// PUT - switch the homepage slider between the image slides and a video
export async function PUT(request: NextRequest) {
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        await dbConnect();
        const body = await request.json().catch(() => ({}));
        const current = await getSliderVideoSettings();

        const next = {
            enabled: typeof body.enabled === "boolean" ? body.enabled : current.enabled,
            videoUrl: typeof body.videoUrl === "string" ? body.videoUrl.trim() : current.videoUrl,
            title: typeof body.title === "string" ? body.title.trim() : current.title,
            description: typeof body.description === "string" ? body.description.trim() : current.description,
        };

        if (next.videoUrl && !getVideoEmbedUrl(next.videoUrl)) {
            return NextResponse.json(
                { error: "Enter a valid Google Drive or YouTube video link." },
                { status: 400 }
            );
        }
        if (next.enabled && !next.videoUrl) {
            return NextResponse.json(
                { error: "Add a video link before switching the slider to video." },
                { status: 400 }
            );
        }
        if (next.title.length > 200 || next.description.length > 500) {
            return NextResponse.json(
                { error: "Title must be 200 characters or fewer and description 500 or fewer." },
                { status: 400 }
            );
        }

        const doc = await SiteSetting.findOneAndUpdate(
            { key: SLIDER_SETTING_KEY },
            {
                $set: {
                    sliderVideoEnabled: next.enabled,
                    sliderVideoUrl: next.videoUrl,
                    sliderVideoTitle: next.title,
                    sliderVideoDescription: next.description,
                },
                $setOnInsert: { key: SLIDER_SETTING_KEY },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).lean();

        return NextResponse.json(toSliderVideoSettings(doc), { status: 200 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update setting";
        console.error("Error updating slider video setting:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
