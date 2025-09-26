import { dbConnect } from "@/lib/dbConnect";
// Update the import path if your News model is located elsewhere, for example:
import { NextResponse } from "next/server";
import News from "@/models/News";

export async function GET() {
  await dbConnect();
  const news = await News.find().sort({ date: -1 });
  return NextResponse.json(news);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  await dbConnect();
  const newNews = await News.create({ title, content });
  return NextResponse.json(newNews);
}
