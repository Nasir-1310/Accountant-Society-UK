import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import SiteSetting, { REGISTRATION_SETTING_KEY } from "@/models/SiteSetting";
import { getRegistrationSettings } from "@/lib/registrationSettings";
import { authenticateAdmin } from "@/lib/authMiddleware";

export const dynamic = "force-dynamic";

// GET - current registration setting (admin only)
export async function GET(request: NextRequest) {
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        await dbConnect();
        const settings = await getRegistrationSettings();
        return NextResponse.json(settings, { status: 200 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to read setting";
        console.error("Error reading registration setting:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// PUT - open/close the registration form, and optionally set the event details
export async function PUT(request: NextRequest) {
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
        return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    try {
        await dbConnect();
        const body = await request.json().catch(() => ({}));

        const update: Record<string, unknown> = {};
        if (typeof body.open === "boolean") update.registrationOpen = body.open;
        if (typeof body.eventName === "string") update.registrationEventName = body.eventName.trim();
        if (typeof body.eventDate === "string") update.registrationEventDate = body.eventDate.trim();

        if (Object.keys(update).length === 0) {
            return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
        }

        const doc = await SiteSetting.findOneAndUpdate(
            { key: REGISTRATION_SETTING_KEY },
            { $set: update, $setOnInsert: { key: REGISTRATION_SETTING_KEY } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).lean();

        const setting = doc as unknown as {
            registrationOpen?: boolean;
            registrationEventName?: string;
            registrationEventDate?: string;
        } | null;

        return NextResponse.json(
            {
                open: Boolean(setting?.registrationOpen),
                eventName: setting?.registrationEventName || "",
                eventDate: setting?.registrationEventDate || "",
            },
            { status: 200 }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update setting";
        console.error("Error updating registration setting:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
