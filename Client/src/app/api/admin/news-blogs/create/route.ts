// src/app/api/admin/news-blogs/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { authenticateAdmin } from "@/lib/authMiddleware";
import NewsBlogs from "@/models/NewsBlogs";

export async function POST(request: NextRequest) {
  try {
    // Authenticate admin
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    const adminId = authResult.user!.userId;
    await dbConnect();
    const body = await request.json();

    const {
      title,
      type,
      category,
      date,
      description,
      icon,
      link,
      tags
    } = body;

    // Validation
    if (!title || !type || !category || !date || !description || !link) {
      return NextResponse.json(
        { success: false, error: "Title, type, category, date, description, and link are required" },
        { status: 400 }
      );
    }

    if (!['news', 'blog', 'event'].includes(type)) {
      return NextResponse.json(
        { success: false, error: "Invalid type. Must be 'news', 'blog', or 'event'" },
        { status: 400 }
      );
    }

    // ✅ Set icon based on type if not provided
    const iconMap = {
      news: "📄",
      blog: "✏️",
      event: "📅"
    };

    const newPost = new NewsBlogs({
      title: title.trim(),
      type,
      category: category.trim(),
      date: date.trim(),
      description: description.trim(),
      icon: icon || iconMap[type as keyof typeof iconMap],
      link: link.trim(),
      tags: Array.isArray(tags) ? tags.map((tag: string) => tag.trim()).filter(Boolean) : [],
      isPublished: true, // 🔴 CHANGED: Auto-publish (was false)
      createdBy: adminId
    });

    await newPost.save();

    return NextResponse.json({
      success: true,
      data: newPost,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} created and published successfully`
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating news/blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 }
    );
  }
}