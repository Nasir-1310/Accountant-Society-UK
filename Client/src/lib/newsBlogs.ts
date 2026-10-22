import { dbConnect } from "@/lib/dbConnect";
import NewsBlogs from "@/models/NewsBlogs";

export interface NewsBlogItem {
  id: string;
  type: "news" | "blog" | "event";
  title: string;
  category: string;
  date: string;
  description: string;
  link: string;
  tags: string[];
}

async function loadNewsBlogs(limit: number): Promise<NewsBlogItem[]> {
  await dbConnect();
  const docs = await NewsBlogs.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()
    .exec();

  return (docs as Array<Record<string, unknown>>).map((doc) => ({
    id: String(doc._id),
    type: (doc.type as NewsBlogItem["type"]) || "news",
    title: String(doc.title || ""),
    category: String(doc.category || ""),
    date: String(doc.date || ""),
    description: String(doc.description || ""),
    link: String(doc.link || ""),
    tags: Array.isArray(doc.tags) ? (doc.tags as string[]) : [],
  }));
}

/**
 * Published news and blog posts for server-rendered pages. Returns null if
 * the database is slow or unavailable so the page can still render.
 */
export async function getPublishedNewsBlogs(limit = 6, timeoutMs = 3000): Promise<NewsBlogItem[] | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), timeoutMs);
  });

  try {
    return await Promise.race([loadNewsBlogs(limit), timeout]);
  } catch (error) {
    console.error("Error loading news and blogs:", error instanceof Error ? error.message : String(error));
    return null;
  } finally {
    clearTimeout(timer);
  }
}
