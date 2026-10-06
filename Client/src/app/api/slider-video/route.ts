import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { getSliderVideoSettings } from "@/lib/sliderVideoSettings";

export const dynamic = "force-dynamic";

// Public endpoint: tells the homepage slider whether to show a video.
export async function GET() {
    try {
        await dbConnect();
        const settings = await getSliderVideoSettings();
        return NextResponse.json(settings, { status: 200 });
    } catch (error) {
        console.error(
            "Error reading slider video setting:",
            error instanceof Error ? error.message : String(error)
        );
        // Fail safe: fall back to the normal image slider.
        return NextResponse.json(
            { enabled: false, videoUrl: "", title: "", description: "" },
            { status: 200 }
        );
    }
}
