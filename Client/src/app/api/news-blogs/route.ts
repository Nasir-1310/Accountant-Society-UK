// src/app/api/news-blogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import NewsBlogs from "@/models/NewsBlogs";
import jwt from "jsonwebtoken";

// ✅ GET - PUBLIC ROUTE - No authentication required
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "50"); // Increased default limit
    const page = parseInt(searchParams.get("page") || "1");

    // Only show published items to public
    const query: Record<string, unknown> = { isPublished: true };

    if (type && ["news", "blog", "event"].includes(type)) {
      query.type = type;
    }

    const newsBlogs = await NewsBlogs.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-__v') // Exclude version key
      .lean(); // Use lean() for better performance on public route

    const total = await NewsBlogs.countDocuments(query);

    console.log(`✅ Public GET: Found ${total} published items`);

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
  }  catch {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }
}

// ✅ POST - ADMIN ONLY - Create new news/blog
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
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
    
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { type, title, category, date, description, link, tags } = body;

    // Validation
    if (!type || !title || !category || !date || !description || !link) {
      return NextResponse.json(
        { success: false, error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Set icon based on type
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
      tags: Array.isArray(tags)
        ? tags.map((tag: string) => tag.trim()).filter(Boolean)
        : [],
      icon: iconMap[type as keyof typeof iconMap] || "📄",
      createdBy: decoded.id,
      isPublished: true, // Auto-publish
    });

    await newItem.save();
    await newItem.populate("createdBy", "email");

    console.log(`✅ Created new ${type}:`, newItem.title);

    return NextResponse.json(
      {
        success: true,
        data: newItem,
        message: "News/blog created successfully",
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