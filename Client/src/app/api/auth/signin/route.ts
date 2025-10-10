import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect";
import Admin from "@/models/Admin";

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();
  const admin = await Admin.findOne({ email });

  if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 86400 });
  return res;
}
