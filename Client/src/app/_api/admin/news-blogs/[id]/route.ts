// // =================================================================
// // 8. CREATE: src/app/api/admin/news-blogs/[id]/route.ts
// // =================================================================
// import { NextRequest, NextResponse } from "next/server";
// import { dbConnect } from "@/lib/dbConnect";
// import { authenticateAdmin } from "@/lib/authMiddleware";
// import NewsBlogs from "@/models/NewsBlogs";

// // GET: fetch a single post by id
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const authResult = authenticateAdmin(request);
//     if (!authResult.success) {
//       return NextResponse.json(
//         { success: false, error: authResult.error },
//         { status: authResult.status }
//       );
//     }

//     await dbConnect();
//     const post = await NewsBlogs.findById(params.id);

//     if (!post) {
//       return NextResponse.json(
//         { success: false, error: "Post not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: post });
//   } catch (error) {
//     console.error("Error fetching post:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch post" },
//       { status: 500 }
//     );
//   }
// }

// // PUT: update a post
// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const authResult = authenticateAdmin(request);
//     if (!authResult.success) {
//       return NextResponse.json(
//         { success: false, error: authResult.error },
//         { status: authResult.status }
//       );
//     }

//     await dbConnect();
//     const body = await request.json();

//     const post = await NewsBlogs.findById(params.id);
//     if (!post) {
//       return NextResponse.json(
//         { success: false, error: "Post not found" },
//         { status: 404 }
//       );
//     }

//     const {
//       title,
//       type,
//       category,
//       date,
//       description,
//       icon,
//       link,
//       isPublished,
//     } = body;

//     interface UpdateData {
//       title?: string;
//       type?: string;
//       category?: string;
//       date?: Date;
//       description?: string;
//       icon?: string;
//       link?: string;
//       isPublished?: boolean;
//       updatedAt?: Date;
//     }
//     const updateData: UpdateData = {};

//     if (title) updateData.title = title;
//     if (type) updateData.type = type;
//     if (category) updateData.category = category;
//     if (date) updateData.date = new Date(date);
//     if (description !== undefined) updateData.description = description;
//     if (icon !== undefined) updateData.icon = icon;
//     if (link !== undefined) updateData.link = link;
//     if (typeof isPublished === "boolean") updateData.isPublished = isPublished;

//     updateData.updatedAt = new Date();

//     const updatedPost = await NewsBlogs.findByIdAndUpdate(
//       params.id,
//       updateData,
//       { new: true }
//     );

//     return NextResponse.json({
//       success: true,
//       data: updatedPost,
//       message: "Post updated successfully",
//     });
//   } catch (error) {
//     console.error("Error updating post:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to update post" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE: remove a post
// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const authResult = authenticateAdmin(request);
//     if (!authResult.success) {
//       return NextResponse.json(
//         { success: false, error: authResult.error },
//         { status: authResult.status }
//       );
//     }

//     await dbConnect();
//     const post = await NewsBlogs.findById(params.id);
//     if (!post) {
//       return NextResponse.json(
//         { success: false, error: "Post not found" },
//         { status: 404 }
//       );
//     }

//     await NewsBlogs.findByIdAndDelete(params.id);

//     return NextResponse.json({
//       success: true,
//       message: "Post deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting post:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to delete post" },
//       { status: 500 }
//     );
//   }
// }


// =================================================================
// src/app/api/admin/news-blogs/[id]/route.ts
// =================================================================
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { authenticateAdmin } from "@/lib/authMiddleware";
import NewsBlogs from "@/models/NewsBlogs";

// ------------------------------
// GET: fetch a single post by id
// ------------------------------
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    await dbConnect();

    const postId = params?.id;
    if (!postId) {
      return NextResponse.json(
        { success: false, error: "Missing ID parameter" },
        { status: 400 }
      );
    }

    const post = await NewsBlogs.findById(postId);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// ------------------------------
// PUT: update a post by id
// ------------------------------
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    await dbConnect();

    const postId = params?.id;
    if (!postId) {
      return NextResponse.json(
        { success: false, error: "Missing ID parameter" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const post = await NewsBlogs.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    const {
      title,
      type,
      category,
      date,
      description,
      icon,
      link,
      isPublished,
    } = body;

    const updateData: Partial<{
      title: string;
      type: string;
      category: string;
      date: Date;
      description: string;
      icon: string;
      link: string;
      isPublished: boolean;
      updatedAt: Date;
    }> = {};

    if (title) updateData.title = title;
    if (type) updateData.type = type;
    if (category) updateData.category = category;
    if (date) updateData.date = new Date(date);
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;
    if (link !== undefined) updateData.link = link;
    if (typeof isPublished === "boolean") updateData.isPublished = isPublished;

    updateData.updatedAt = new Date();

    const updatedPost = await NewsBlogs.findByIdAndUpdate(postId, updateData, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      data: updatedPost,
      message: "Post updated successfully",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// ------------------------------
// DELETE: remove a post by id
// ------------------------------
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = authenticateAdmin(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    await dbConnect();

    const postId = params?.id;
    if (!postId) {
      return NextResponse.json(
        { success: false, error: "Missing ID parameter" },
        { status: 400 }
      );
    }

    const post = await NewsBlogs.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    await NewsBlogs.findByIdAndDelete(postId);

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
