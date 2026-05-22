import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import EventRegistration from "@/models/EventRegistration";
import { authenticateAdmin } from "@/lib/authMiddleware";

function escapeCsv(value: string) {
    if (value.includes("\"")) {
        value = value.replace(/\"/g, "\"\"");
    }
    if (/[",\n]/.test(value)) {
        return `"${value}"`;
    }
    return value;
}

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

        const headers = [
            "First Name",
            "Middle Name",
            "Surname",
            "Phone",
            "Email",
            "Company",
            "Event Name",
            "Event Date",
            "Registered At",
        ];

        const rows = registrations.map((item) => [
            item.firstName || "",
            item.middleName || "",
            item.surname || "",
            item.phone || "",
            item.email || "",
            item.company || "",
            item.eventName || "",
            item.eventDate ? new Date(item.eventDate).toISOString().split("T")[0] : "",
            item.createdAt ? new Date(item.createdAt).toISOString() : "",
        ]);

        const csv = [
            headers.map(escapeCsv).join(","),
            ...rows.map((row) => row.map((value) => escapeCsv(String(value))).join(",")),
        ].join("\n");

        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": "attachment; filename=event-registrations.csv",
            },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to export CSV";
        console.error("Error exporting registrations:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
