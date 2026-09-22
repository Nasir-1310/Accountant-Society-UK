import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import EventRegistration from "@/models/EventRegistration";
import nodemailer from "nodemailer";

function buildAllDayIcs(params: {
    eventName: string;
    eventDate?: string;
    recipientEmail: string;
}) {
    const eventDate = params.eventDate ? new Date(params.eventDate) : null;
    if (!eventDate || Number.isNaN(eventDate.getTime())) {
        return null;
    }

    const pad = (value: number) => String(value).padStart(2, "0");
    const year = eventDate.getUTCFullYear();
    const month = pad(eventDate.getUTCMonth() + 1);
    const day = pad(eventDate.getUTCDate());
    const startDate = `${year}${month}${day}`;
    const endDateObj = new Date(Date.UTC(year, eventDate.getUTCMonth(), eventDate.getUTCDate() + 1));
    const endDate = `${endDateObj.getUTCFullYear()}${pad(endDateObj.getUTCMonth() + 1)}${pad(endDateObj.getUTCDate())}`;
    const now = new Date();
    const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

    const uid = `${Date.now()}-${params.recipientEmail}`;

    return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//TPAS//Event Registration//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:REQUEST",
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${startDate}`,
        `DTEND;VALUE=DATE:${endDate}`,
        `SUMMARY:${params.eventName}`,
        "DESCRIPTION:Your registration has been confirmed. We look forward to seeing you.",
        "STATUS:CONFIRMED",
        "TRANSP:TRANSPARENT",
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");
}

function escapeHtml(value: unknown) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[char] || char);
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
    } catch (error) {
        console.error("Registration database unavailable:", error instanceof Error ? error.message : String(error));
        return NextResponse.json(
            { error: "Registration is temporarily unavailable. Please try again later." },
            { status: 503 }
        );
    }

    try {
        const body = await request.json();
        const {
            first_name,
            middle_name,
            surname,
            phone,
            email,
            profession,
            professionOther,
            interest,
            interestOther,
            eventName,
            eventDate,
        } = body || {};

        const attendeeEmail = String(email || "").trim();

        if (!first_name || !surname || !phone || !email || !eventName) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!/\S+@\S+\.\S+/.test(attendeeEmail)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        const professionValue = String(profession || "").trim();
        const professionOtherValue = professionValue === "Other" ? String(professionOther || "").trim() : "";
        const interestValue = String(interest || "").trim();
        const interestOtherValue = interestValue === "Other" ? String(interestOther || "").trim() : "";

        if (!professionValue || !interestValue) {
            return NextResponse.json({ error: "Profession and interest are required" }, { status: 400 });
        }

        if (!["Student", "Accountant", "Finance Professional", "Business Owner", "Other"].includes(professionValue) ||
            !["Membership", "Sponsorship", "Advertising", "Other"].includes(interestValue) ||
            (professionValue === "Other" && !professionOtherValue) ||
            (interestValue === "Other" && !interestOtherValue)) {
            return NextResponse.json({ error: "Invalid profession or interest" }, { status: 400 });
        }

        const registration = await EventRegistration.create({
            firstName: first_name,
            middleName: middle_name || "",
            surname,
            phone,
            email,
            profession: professionValue,
            professionOther: professionOtherValue,
            interest: interestValue,
            interestOther: interestOtherValue,
            eventName,
            eventDate: eventDate ? new Date(eventDate) : undefined,
        });

        let emailSent = false;
        let attendeeEmailSent = false;
        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_PASS;
        const transporter = gmailUser && gmailPass
            ? nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: gmailUser,
                    pass: gmailPass,
                },
            })
            : null;

        if (transporter && gmailUser) {
            try {
                await transporter.sendMail({
                    from: `"TPAS Registration" <${gmailUser}>`,
                    to: gmailUser,
                    subject: `New registration — ${eventName}`,
                    replyTo: attendeeEmail,
                    html: `
            <p><strong>Event:</strong> ${escapeHtml(eventName)}</p>
            <p><strong>Date:</strong> ${escapeHtml(eventDate || "N/A")}</p>
            <p><strong>Name:</strong> ${escapeHtml(first_name)} ${escapeHtml(middle_name)} ${escapeHtml(surname)}</p>
            <p><strong>Email:</strong> ${escapeHtml(attendeeEmail)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Profession:</strong> ${escapeHtml(professionValue === "Other" ? professionOtherValue : professionValue || "N/A")}</p>
            <p><strong>Interested in:</strong> ${escapeHtml(interestValue === "Other" ? interestOtherValue : interestValue || "N/A")}</p>
            <p><strong>Registered At:</strong> ${registration.createdAt?.toISOString()}</p>
          `,
                });
                emailSent = true;
            } catch (mailError) {
                console.error("Failed to send registration email:", mailError);
            }

            try {
                const calendarInvite = buildAllDayIcs({
                    eventName,
                    eventDate,
                    recipientEmail: attendeeEmail,
                });

                const attachments = calendarInvite
                    ? [
                        {
                            filename: "event.ics",
                            content: calendarInvite,
                            contentType: "text/calendar; charset=utf-8; method=REQUEST",
                        },
                    ]
                    : [];

                await transporter.sendMail({
                    from: `"TPAS" <${gmailUser}>`,
                    to: attendeeEmail,
                    replyTo: gmailUser,
                    subject: `Registration confirmed — ${eventName}`,
                    text: `Dear ${first_name} ${surname},\n\nYour registration has been successfully completed for ${eventName}.\nYou can add the event to your calendar using the attached invite.\n\nRegards,\nTPAS Team`,
                    html: `
            <p>Dear ${escapeHtml(first_name)} ${escapeHtml(surname)},</p>
            <p>Your registration has been successfully completed for <strong>${escapeHtml(eventName)}</strong>.</p>
            <p>We are delighted to welcome you. You can add the event to your calendar using the attached invite.</p>
            <p>Regards,<br/>TPAS Team</p>
          `,
                    attachments,
                    icalEvent: calendarInvite
                        ? { method: "REQUEST", content: calendarInvite }
                        : undefined,
                });
                attendeeEmailSent = true;
            } catch (mailError) {
                console.error("Failed to send attendee confirmation email:", mailError);
            }
        }

        return NextResponse.json(
            {
                id: registration._id.toString(),
                createdAt: registration.createdAt?.toISOString(),
                emailSent,
                attendeeEmailSent,
            },
            { status: 201 }
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to register";
        console.error("Error creating registration:", message);
        return NextResponse.json({ error: "Failed to register. Please try again." }, { status: 500 });
    }
}
