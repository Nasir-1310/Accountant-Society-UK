// src/app/api/latest-news/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import LatestNews, { ILatestNews } from "@/models/LatestNews";

export const dynamic = 'force-dynamic';

// Helper type for MongoDB documents with _id
type MongoDocument = {
  _id?: unknown;
  [key: string]: unknown;
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const includeUnpublished = searchParams.get("all") === "true";

    const query = includeUnpublished ? {} : { published: true };

    const news = await LatestNews.find(query)
      .sort({ date: -1 })
      .lean()
      .exec();

    // Type-safe mapping
    const formattedNews = (news as unknown as ILatestNews[]).map((item) => {
      const itemWithId = item as MongoDocument & ILatestNews;
      const rawId = itemWithId._id;
      const id =
        rawId && typeof rawId === "object" && typeof rawId.toString === "function"
          ? rawId.toString()
          : String(rawId ?? "");

      const toIso = (d: unknown): string | undefined => {
        if (!d) return undefined;
        if (d instanceof Date) return d.toISOString();
        try {
          return new Date(d as string | number | Date).toISOString();
        } catch {
          return undefined;
        }
      };

      return {
        id,
        title: item.title,
        description: item.description,
        date: toIso(item.date),
        image: item.image,
        link: item.link,
        published: item.published,
        createdAt: toIso(item.createdAt),
        updatedAt: toIso(item.updatedAt),
      };
    });

    return NextResponse.json(formattedNews, { status: 200 });
  } catch (error: unknown) {
    let message = "Failed to fetch latest news";
    if (error instanceof Error) message = error.message;
    console.error("Error fetching latest news:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}