import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req: Request) {
  await dbConnect();
  const { name, email, password, role = "user" } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });

  return NextResponse.json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
