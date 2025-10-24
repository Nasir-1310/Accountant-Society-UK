// ============================================
// src/app/api/admin/latest-news/[id]/route.ts
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import LatestNews from "@/models/LatestNews";
import { uploadToS3, deleteFromS3 } from "@/lib/s3";
import mongoose from "mongoose";

// Admin verification
async function verifyAdmin(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("adminToken")?.value;
  return Boolean(token);
}

// PUT - Update news
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { id } = await context.params;

    console.log("📝 Updating news with ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid news ID" }, { status: 400 });
    }

    const formData = await request.formData();

    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const date = formData.get("date") as string | null;
    const link = formData.get("link") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !date) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, and date are required" },
        { status: 400 }
      );
    }

    const existingNews = await LatestNews.findById(id);
    if (!existingNews) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    let imageUrl = existingNews.image;

    if (imageFile && imageFile.size > 0) {
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Invalid file type. Please upload an image file." },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadToS3(buffer, imageFile.name, imageFile.type);

      if (existingNews.image) {
        try {
          await deleteFromS3(existingNews.image);
        } catch (err: unknown) {
          console.error("Error deleting old image:", err);
        }
      }
    }

    const updatedNews = await LatestNews.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date: new Date(date),
        link: link || null,
        image: imageUrl,
        published: true,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedNews) {
      return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
    }

    const formattedNews = {
      id: updatedNews._id.toString(),
      title: updatedNews.title,
      description: updatedNews.description,
      date: updatedNews.date.toISOString(),
      image: updatedNews.image,
      link: updatedNews.link,
      published: updatedNews.published,
      createdAt: updatedNews.createdAt?.toISOString(),
      updatedAt: updatedNews.updatedAt?.toISOString(),
    };

    return NextResponse.json(formattedNews, { status: 200 });
  } catch (error: unknown) {
    let message = "Failed to update news";
    if (error instanceof Error) message = error.message;
    console.error("❌ Error updating news:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE - Delete news
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { id } = await context.params;

    console.log("🗑️ Deleting news with ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid news ID" }, { status: 400 });
    }

    const news = await LatestNews.findById(id);
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    if (news.image) {
      try {
        await deleteFromS3(news.image);
      } catch (err: unknown) {
        console.error("Error deleting image from S3:", err);
      }
    }

    await LatestNews.findByIdAndDelete(id);

    return NextResponse.json({ message: "News deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    let message = "Failed to delete news";
    if (error instanceof Error) message = error.message;
    console.error("❌ Error deleting news:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
