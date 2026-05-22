import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import EventRegistration from "@/models/EventRegistration";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const {
            first_name,
            middle_name,
            surname,
            phone,
            email,
            company,
            eventName,
            eventDate,
        } = body || {};

        if (!first_name || !surname || !phone || !email || !eventName) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        const registration = await EventRegistration.create({
            firstName: first_name,
            middleName: middle_name || "",
            surname,
            phone,
            email,
            company: company || "",
            eventName,
            eventDate: eventDate ? new Date(eventDate) : undefined,
        });

        let emailSent = false;
        if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS,
                    },
                });

                await transporter.sendMail({
                    from: `"TPAS Registration" <${process.env.GMAIL_USER}>`,
                    to: process.env.GMAIL_USER,
                    subject: `New registration — ${eventName}`,
                    replyTo: email,
                    html: `
            <p><strong>Event:</strong> ${eventName}</p>
            <p><strong>Date:</strong> ${eventDate || "N/A"}</p>
            <p><strong>Name:</strong> ${first_name} ${middle_name || ""} ${surname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company || "N/A"}</p>
            <p><strong>Registered At:</strong> ${registration.createdAt?.toISOString()}</p>
          `,
                });
                emailSent = true;
            } catch (mailError) {
                console.error("Failed to send registration email:", mailError);
            }
        }

        return NextResponse.json(
            {
                id: registration._id.toString(),
                createdAt: registration.createdAt?.toISOString(),
                emailSent,
            },
            { status: 201 }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to register";
        console.error("Error creating registration:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
