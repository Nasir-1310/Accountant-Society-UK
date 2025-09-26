// src/app/api/news-blogs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import NewsBlogs from "@/models/NewsBlogs";
import jwt from "jsonwebtoken";

interface RouteParams {
  params: { id: string };
}

// GET - Fetch single news/blog item
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const newsItem = await NewsBlogs.findById(params.id).populate('createdBy', 'email');
    
    if (!newsItem) {
      return NextResponse.json(
        { success: false, error: "News/blog item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: newsItem
    });
  } catch (error) {
    console.error("Error fetching news/blog item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news/blog item" },
      { status: 500 }
    );
  }
}

// PUT - Update news/blog item (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('adminToken')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    jwt.verify(token, process.env.JWT_SECRET!);
    
    await dbConnect();

    const body = await request.json();
    const { type, title, category, date, description, link, tags, isPublished } = body;

    // Set icon based on type
    const iconMap = {
      news: "📄",
      blog: "✏️",
      event: "📅"
    };

    interface UpdateData {
      type?: string;
      icon?: string;
      title?: string;
      category?: string;
      date?: string;
      description?: string;
      link?: string;
      tags?: string[];
      isPublished?: boolean;
    }

    const updateData: UpdateData = {
      ...(type && { type, icon: iconMap[type as keyof typeof iconMap] }),
      ...(title && { title: title.trim() }),
      ...(category && { category: category.trim() }),
      ...(date && { date: date.trim() }),
      ...(description && { description: description.trim() }),
      ...(link && { link: link.trim() }),
      ...(tags !== undefined && { tags: Array.isArray(tags) ? tags.map((tag: string) => tag.trim()).filter(Boolean) : [] }),
      ...(isPublished !== undefined && { isPublished })
    };

    const updatedItem = await NewsBlogs.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'email');

    if (!updatedItem) {
      return NextResponse.json(
        { success: false, error: "News/blog item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedItem,
      message: "News/blog updated successfully"
    });

  } catch (error) {
    console.error("Error updating news/blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update news/blog" },
      { status: 500 }
    );
  }
}

// DELETE - Delete news/blog item (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('adminToken')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    jwt.verify(token, process.env.JWT_SECRET!);
    
    await dbConnect();

    const deletedItem = await NewsBlogs.findByIdAndDelete(params.id);

    if (!deletedItem) {
      return NextResponse.json(
        { success: false, error: "News/blog item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "News/blog deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting news/blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete news/blog" },
      { status: 500 }
    );
  }
}
