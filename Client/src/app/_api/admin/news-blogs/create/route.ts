// =================================================================
// 7. CREATE: src/app/api/admin/news-blogs/create/route.ts
// =================================================================
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
      isPublished = false
    } = body;

    // Validation
    if (!title || !type || !category || !date || !description) {
      return NextResponse.json(
        { success: false, error: "Title, type, category, date, and description are required" },
        { status: 400 }
      );
    }

    if (!['news', 'blog', 'event'].includes(type)) {
      return NextResponse.json(
        { success: false, error: "Invalid type. Must be 'news', 'blog', or 'event'" },
        { status: 400 }
      );
    }

    // Create slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Ensure slug is unique
    let uniqueSlug = slug;
    let counter = 1;
    while (await NewsBlogs.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const newPost = new NewsBlogs({
      title,
      slug: uniqueSlug,
      type,
      category,
      date,
      description,
      icon: icon || '',
      link: link || '',
      isPublished,
      createdBy: adminId
    });

    await newPost.save();

    return NextResponse.json({
      success: true,
      data: newPost,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} created successfully`
    });

  } catch (error) {
    console.error("Error creating news/blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 }
    );
  }
}
