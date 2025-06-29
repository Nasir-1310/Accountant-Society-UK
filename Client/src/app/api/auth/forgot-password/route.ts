import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes
  await user.save();

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  // ⚠️ Send email here using your preferred email service
  console.log("RESET LINK:", resetLink);

  return Response.json({ message: "Reset link sent to email (mocked)" });
}
