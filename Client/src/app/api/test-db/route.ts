// app/api/test-db/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    return NextResponse.json({ status: "connected" });
  } catch (error) {
    return NextResponse.json({ status: "error", error });
  }
}
