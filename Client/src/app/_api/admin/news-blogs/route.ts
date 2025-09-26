
//src/app/api/admin/news-blogs/route.ts

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { authenticateAdmin } from "@/lib/authMiddleware";
import NewsBlogs from "@/models/NewsBlogs";

export async function GET(request: NextRequest) {
  try {
    // Authenticate admin
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "20");
    const page = parseInt(searchParams.get("page") || "1");

    const query: Record<string, unknown> = {};

    if (type && ["news", "blog", "event"].includes(type)) {
      query.type = type;
    }
    if (category) {
      query.category = category;
    }

    const newsBlogs = await NewsBlogs.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await NewsBlogs.countDocuments(query);

    const stats = {
      total: await NewsBlogs.countDocuments(),
      byType: {
        news: await NewsBlogs.countDocuments({ type: "news" }),
        blog: await NewsBlogs.countDocuments({ type: "blog" }),
        event: await NewsBlogs.countDocuments({ type: "event" }),
      },
      byCategory: await NewsBlogs.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ]),
    };

    return NextResponse.json({
      success: true,
      data: newsBlogs,
      stats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching admin news/blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch news/blogs" },
      { status: 500 }
    );
  }
}
