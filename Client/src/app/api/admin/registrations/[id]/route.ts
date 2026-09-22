import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { authenticateAdmin } from "@/lib/authMiddleware";
import { dbConnect } from "@/lib/dbConnect";
import EventRegistration from "@/models/EventRegistration";

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
        return NextResponse.json(
            { error: authResult.error },
            { status: authResult.status }
        );
    }

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid registration ID" }, { status: 400 });
    }

    try {
        await dbConnect();
        const registration = await EventRegistration.findByIdAndDelete(id);

        if (!registration) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Registration deleted" });
    } catch (error) {
        console.error("Error deleting registration:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 });
    }
}
