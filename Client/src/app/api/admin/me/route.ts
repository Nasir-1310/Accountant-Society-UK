// /app/api/admin/me/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const tokenMatch = cookie.match(/admin_token=([^;]+)/);
    if (!tokenMatch) return NextResponse.json({ loggedIn: false }, { status: 401 });

    const token = tokenMatch[1];

    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; id: string };

    return NextResponse.json({
      loggedIn: true,
      admin: { email: decoded.email, id: decoded.id },
    });
  } catch (err) {
     console.error("Auth error:", err);
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}
