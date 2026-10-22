// src/app/news-and-events/latest-news/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { dbConnect } from "@/lib/dbConnect";
import LatestNews from "@/models/LatestNews";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Latest News",
  alternates: { canonical: "/news-and-events/latest-news" },
  description:
    "Read the latest news and updates from the Professional Accountants' Society. Stay informed on achievements, industry changes, and community milestones.",
  openGraph: {
    title: "Latest News | The Professional Accountants' Society",
    description:
      "Catch up on TPAS's latest news — from professional highlights to community activities and updates.",
    url: "/news-and-events/latest-news",
    type: "website",
    images: [
      {
        url: "/OG_image.png",
        width: 1200,
        height: 630,
        alt: "Latest News - TPAS",
      },
    ],
  },
};

// Disable caching for dynamic data
export const revalidate = 0;

type NewsItem = {
  _id: string;
  title: string;
  description: string;
  date: Date;
  image: string;
  link?: string;
  published: boolean;
};

// Fetch data on the server
async function getLatestNews(): Promise<NewsItem[]> {
  try {
    await dbConnect();

    const news = await LatestNews.find({ published: true })
      .sort({ date: -1 })
      .lean()
      .exec();

    // Convert MongoDB documents to plain objects with string IDs
    return news.map((item) => ({
      _id: item._id.toString(),
      title: item.title,
      description: item.description,
      date: new Date(item.date),
      image: item.image,
      link: item.link,
      published: item.published,
    }));
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
}

export default async function LatestNewsPage() {
  const latestNews = await getLatestNews();
  const baseUrl = "https://www.accountantssociety.org";

  return (
    <>
      <PageHeader
        eyebrow="News & events"
        title="TPAS Newsroom"
        description="Stay informed with the latest news from TPAS."
        breadcrumbs={[{ label: "News & Events", href: "/news-and-events" }, { label: "Latest News" }]}
      />

      <div className="site-container py-12  sm:py-16">
        {latestNews.length === 0 ? (
          <p className="card px-6 py-14 text-center text-slate-600">No news available at the moment.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {latestNews.map((news) => {
              const newsUrl = news.link || `${baseUrl}/news-and-events/latest-news#${news._id}`;
              const external = !!news.link && news.link.startsWith("http");

              return (
                <li key={news._id} id={news._id}>
                  <article className="card card-hover flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={news.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays aria-hidden="true" className="h-4 w-4 text-brand-500" />
                        <time dateTime={news.date.toISOString()}>
                          {news.date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </time>
                      </div>

                      <h2 className="mt-3 text-lg font-bold leading-snug text-brand-950">
                        {news.link ? (
                          <Link
                            href={news.link}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            className="hover:text-brand-700 hover:underline"
                          >
                            {news.title}
                            {external && <span className="sr-only"> (opens in a new tab)</span>}
                          </Link>
                        ) : (
                          news.title
                        )}
                      </h2>

                      <p className="mt-3 flex-grow text-sm leading-relaxed text-slate-600">{news.description}</p>

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <ShareButtons title={news.title} description={news.description} url={newsUrl} />
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-14 flex flex-col items-center gap-3 rounded-2xl bg-brand-50 px-6 py-10 text-center">
          <h2 className="text-xl font-bold text-brand-950">Have news to share?</h2>
          <p className="max-w-xl text-slate-600">Members can send us news, achievements and updates for the newsroom.</p>
          <Link href="/contact-us" className="btn-primary mt-2">
            Submit your news
          </Link>
        </div>
      </div>
    </>
  );
}
