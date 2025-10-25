import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import LatestNews from "@/models/LatestNews";
import { uploadToS3, deleteFromS3 } from "@/lib/s3";
import mongoose from "mongoose";

// Helper function to verify admin
async function verifyAdmin(request: NextRequest) {
  const token = request.cookies.get("adminToken")?.value;
  if (!token) return false;
  return true;
}

// PUT - Update news
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid news ID" }, { status: 400 });
    }

    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const link = formData.get("link") as string;
    const imageFile = formData.get("image") as File | null;

    // Validation
    if (!title || !description || !date) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, and date are required" },
        { status: 400 }
      );
    }

    // Get existing news
    const existingNews = await LatestNews.findById(id);

    if (!existingNews) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    let imageUrl = existingNews.image;

    // If new image is provided, upload it and delete old one
    if (imageFile && imageFile.size > 0) {
      // Validate image file
      if (!imageFile.type.startsWith('image/')) {
        return NextResponse.json(
          { error: "Invalid file type. Please upload an image file." },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadToS3(buffer, imageFile.name, imageFile.type);

      // Delete old image from S3
      if (existingNews.image) {
        try {
          await deleteFromS3(existingNews.image);
        } catch (error) {
          console.error("Error deleting old image:", error);
          // Continue even if old image deletion fails
        }
      }
    }

    // Update news
    const updatedNews = await LatestNews.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date: new Date(date),
        link: link || null,
        image: imageUrl,
        published: true, // Always published
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
  } catch (error) {
    console.error("Error updating news:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update news";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE - Delete news
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid news ID" }, { status: 400 });
    }

    // Get news to delete image
    const news = await LatestNews.findById(id);

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    // Delete image from S3
    if (news.image) {
      try {
        await deleteFromS3(news.image);
      } catch (error) {
        console.error("Error deleting image from S3:", error);
        // Continue even if S3 deletion fails
      }
    }

    // Delete news from database
    await LatestNews.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "News deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting news:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to delete news";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
