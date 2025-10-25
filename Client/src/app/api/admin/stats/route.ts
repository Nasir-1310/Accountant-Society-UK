// src/app/api/admin/status/route.ts
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import LatestNews from "@/models/LatestNews";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    // Verify admin authentication
    const token = req.headers.get("cookie")?.split("token=")[1];
    if (!token) {
      return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === "string" || !("email" in decoded)) {
      return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    // Connect to database
    await dbConnect();

    // Count latest news
    const totalPosts = await LatestNews.countDocuments();

    // Count members if you have a Member model
    let totalMembers = 0;
    try {
      const Member = mongoose.models.Member;
      if (Member) {
        totalMembers = await Member.countDocuments();
      }
    } catch (error: unknown) {
      console.log("Member model not found:", error);
    }

    // Count events if you have an Event model
    let totalEvents = 0;
    try {
      const Event = mongoose.models.Event;
      if (Event) {
        totalEvents = await Event.countDocuments();
      }
    } catch (error: unknown) {
      console.log("Event model not found:", error);
    }

    return NextResponse.json({
      loggedIn: true,
      email: (decoded as { email: string }).email,
      totalPosts,
      totalEvents,
      totalMembers,
    });
  } catch (error: unknown) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}
