//app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { comparePassword, signToken } from "@/lib/auth";
import Admin from "@/models/Admin";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password required" }, { status: 400 });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });

    const isValid = await comparePassword(password, admin.password);
    if (!isValid) return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });

    const token = signToken({ userId: admin._id.toString(), email: admin.email, role: "admin" });

    const res = NextResponse.json({ success: true, message: "Login successful", admin: { id: admin._id, email: admin.email } });

    // Set cookie
    res.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
      path: "/"
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}
