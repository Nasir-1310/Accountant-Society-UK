// app/api/news-and-blogs/route.ts
import { connectDB } from "@/lib/mongoose";
import NewsAndBlogModel from "@/models/NewsAndBlogs";

export async function GET() {
  await connectDB();
  const items = await NewsAndBlogModel.find().sort({ createdAt: -1 });
  return Response.json(items);
}
