// src/app/api/admin/check-auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('adminToken')?.value;
    if (!token) {
      return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string; email: string; role: string };
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    return NextResponse.json({
      loggedIn: true,
      admin: { id: decoded.userId, email: decoded.email }
    });
  } catch (err) {
    console.error("Auth error:", err);
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}
