// src/app/api/news-blogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import NewsBlogs from "@/models/NewsBlogs";
import jwt from "jsonwebtoken";

// 📍 GET - Public route - Fetch all published news/blogs
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    // ✅ Only show published items publicly
    const query: Record<string, unknown> = { isPublished: true };

    if (type && ["news", "blog", "event"].includes(type)) {
      query.type = type;
    }

    const newsBlogs = await NewsBlogs.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("createdBy", "email");

    const total = await NewsBlogs.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: newsBlogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ Error fetching news/blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news/blogs" },
      { status: 500 }
    );
  }
}

// 📍 POST - Admin only - Create new news/blog
export async function POST(request: NextRequest) {
  try {
    // ✅ Verify admin
    const token = request.cookies.get("adminToken")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    interface JwtPayload {
      id: string;
      [key: string]: unknown;
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    await dbConnect();

    const body = await request.json();
    const { type, title, category, date, description, link, tags } = body;

    if (!type || !title || !category || !date || !description || !link) {
      return NextResponse.json(
        { success: false, error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // ✅ Automatically set icon based on type
    const iconMap = {
      news: "📄",
      blog: "✏️",
      event: "📅",
    };

    const newItem = new NewsBlogs({
      type,
      title: title.trim(),
      category: category.trim(),
      date: date.trim(),
      description: description.trim(),
      link: link.trim(),
      tags: tags
        ? tags.map((tag: string) => tag.trim()).filter(Boolean)
        : [],
      icon: iconMap[type as keyof typeof iconMap],
      createdBy: decoded.id,
      isPublished: true, // ✅ important for public visibility
    });

    await newItem.save();
    await newItem.populate("createdBy", "email");

    return NextResponse.json(
      {
        success: true,
        data: newItem,
        message: "✅ News/blog created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error creating news/blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create news/blog" },
      { status: 500 }
    );
  }
}
