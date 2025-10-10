// =================================================================
// 9. CREATE: src/app/api/admin/news-blogs/stats/route.ts
// =================================================================
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { authenticateAdmin } from "@/lib/authMiddleware";
import NewsBlogs from "@/models/NewsBlogs";

export async function GET(request: NextRequest) {
  try {
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    await dbConnect();

    // Calculate stats
    const totalPosts = await NewsBlogs.countDocuments();


    const byType = {
      news: await NewsBlogs.countDocuments({ type: 'news' }),
      blog: await NewsBlogs.countDocuments({ type: 'blog' }),
      event: await NewsBlogs.countDocuments({ type: 'event' })
    };
// ✅ NEW
return NextResponse.json({
  success: true,
  stats: {
    totalPosts,
    byType
  }
});

  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

