import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth"; // Your JWT verification helper

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("token=")[1];
    if (!token) {
      return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    const decoded = verifyToken(token); // Your JWT decode function
    if (!decoded || typeof decoded === "string" || !("email" in decoded)) {
      return NextResponse.json({ loggedIn: false }, { status: 401 });
    }
    return NextResponse.json({ loggedIn: true, email: (decoded as { email: string }).email });
  } catch {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}
