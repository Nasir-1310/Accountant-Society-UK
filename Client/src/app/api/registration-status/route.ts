import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { getRegistrationSettings } from "@/lib/registrationSettings";

export const dynamic = "force-dynamic";

// Public endpoint: lets the site know whether the registration form is open.
export async function GET() {
    try {
        await dbConnect();
        const settings = await getRegistrationSettings();
        return NextResponse.json(settings, { status: 200 });
    } catch (error) {
        console.error(
            "Error reading registration status:",
            error instanceof Error ? error.message : String(error)
        );
        // Fail safe: treat as closed if we cannot read the setting.
        return NextResponse.json(
            { open: false, eventName: "", eventDate: "" },
            { status: 200 }
        );
    }
}
