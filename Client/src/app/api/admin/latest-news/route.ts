// src/app/api/admin/latest-news/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import LatestNews from "@/models/LatestNews";
import { uploadToS3 } from "@/lib/s3";
import { Document, Types } from "mongoose";

// Type for a LatestNews document
type LatestNewsDoc = Document & {
  _id: Types.ObjectId;  // ✅ replace `any` with ObjectId
  title: string;
  description: string;
  date: Date;
  link?: string | null;
  image: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

// Simple admin verification (replace with your own logic)
async function verifyAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("adminToken")?.value;
  return Boolean(token);
}

// GET — fetch all news
export async function GET(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const news = await LatestNews.find().sort({ date: -1 }).lean();
    const formatted = news.map((n) => ({
      id: n._id.toString(),
      title: n.title,
      description: n.description,
      date: n.date?.toISOString(),
      image: n.image,
      link: n.link,
      published: n.published,
      createdAt: n.createdAt?.toISOString(),
      updatedAt: n.updatedAt?.toISOString(),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

// POST — create new news
export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const link = formData.get("link") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !date || !imageFile) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, date, and image are required" },
        { status: 400 }
      );
    }

    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Uploaded file must be an image" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const imageUrl = await uploadToS3(buffer, imageFile.name, imageFile.type);

    // Properly typed document
    const news = (await LatestNews.create({
      title,
      description,
      date: new Date(date),
      link: link || null,
      image: imageUrl,
      published: true,
    })) as LatestNewsDoc;

    const formatted = {
      id: news._id.toString(),
      title: news.title,
      description: news.description,
      date: news.date.toISOString(),
      image: news.image,
      link: news.link,
      published: news.published,
      createdAt: news.createdAt?.toISOString(),
      updatedAt: news.updatedAt?.toISOString(),
    };

    return NextResponse.json(formatted, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create news";
    console.error("❌ Error creating news:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
