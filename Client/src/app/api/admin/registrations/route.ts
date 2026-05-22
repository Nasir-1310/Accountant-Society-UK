import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import EventRegistration from "@/models/EventRegistration";
import { authenticateAdmin } from "@/lib/authMiddleware";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
    try {
        const authResult = authenticateAdmin(request);
        if (!authResult.success) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            );
        }

        await dbConnect();

        const registrations = await EventRegistration.find()
            .sort({ createdAt: -1 })
            .lean()
            .exec();

        const formatted = registrations.map((item) => ({
            id: (item._id as mongoose.Types.ObjectId).toString(),
            firstName: item.firstName as string,
            middleName: (item.middleName as string) || "",
            surname: item.surname as string,
            phone: item.phone as string,
            email: item.email as string,
            company: (item.company as string) || "",
            eventName: item.eventName as string,
            eventDate: item.eventDate ? new Date(item.eventDate).toISOString() : null,
            createdAt: item.createdAt ? new Date(item.createdAt).toISOString() : null,
        }));

        return NextResponse.json(formatted, { status: 200 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch registrations";
        console.error("Error fetching registrations:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
