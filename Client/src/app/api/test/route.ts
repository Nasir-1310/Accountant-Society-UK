// app/api/test/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Member from "@/models/Member";

export async function GET() {
  await dbConnect();
  const newMember = await Member.create({ name: "Nasir", email: "nasir@example.com" });
  return NextResponse.json({ success: true, data: newMember });
}
