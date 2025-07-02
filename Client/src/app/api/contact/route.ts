import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { firstName, lastName, email, subject, message } = await req.json();

  if (!firstName || !lastName || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.GMAIL_USER,
      subject: `📬 ${subject} from ${firstName}`,
      text: message,
      html: `<p>Hi I am ${firstName} ${lastName},</p><p>${message}</p><p>Reply to: ${email}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
