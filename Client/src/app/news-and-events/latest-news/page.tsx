// src/app/news-and-events/latest-news/page.tsx
import Container from "@/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Square_Button } from "@/components/Square_Button";
import { dbConnect } from "@/lib/dbConnect";
import LatestNews from "@/models/LatestNews";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Latest News | The Professional Accountants' Society",
  description:
    "Read the latest news and updates from the Professional Accountants' Society. Stay informed on achievements, industry changes, and community milestones.",
  openGraph: {
    title: "Latest News | The Professional Accountants' Society",
    description:
      "Catch up on TPAS's latest news — from professional highlights to community activities and updates.",
    url: "https://www.accountantssociety.org/news",
    type: "website",
    images: [
      {
        url: "https://www.accountantssociety.org/og/news.jpg",
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
    <Container>
      <div className="mx-3 px-5 border-l border-r border-gray-200 bg-white">
        <main className="w-full py-20 max-w-full">
          {/* Header */}
          <div data-aos="fade-up" className="mb-10">
            <div data-aos="fade-up" className="text-[10px] md:text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-teal-600">Home</Link>
              <span className="mx-2">|</span>
              <Link href="/news-and-events" className="hover:text-teal-600">News & Events</Link>
              <span className="mx-2">|</span>
              <span className="text-gray-700">Latest News</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">TPAS Newsroom</h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              Stay informed with the latest news from TPAS.
            </p>
          </div>

          {/* News Cards */}
          {latestNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-12">
              {latestNews.map((news) => {
                const newsUrl = news.link || `${baseUrl}/news-and-events/latest-news#${news._id}`;
                
                return (
                  <div key={news._id} data-aos="fade-up" className="flex flex-col h-full rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white hover:shadow-lg transition duration-200">
                    {/* Image */}
                    {news.link ? (
                      <Link
                        href={news.link}
                        target={news.link.startsWith("http") ? "_blank" : "_self"}
                        rel={news.link.startsWith("http") ? "noopener noreferrer" : ""}
                      >
                        <Image 
                          src={news.image} 
                          alt={news.title} 
                          width={800} 
                          height={500} 
                          className="w-full h-56 object-cover hover:opacity-95 transition-opacity" 
                        />
                      </Link>
                    ) : (
                      <Image 
                        src={news.image} 
                        alt={news.title} 
                        width={800} 
                        height={500} 
                        className="w-full h-56 object-cover" 
                      />
                    )}

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      {news.link ? (
                        <Link
                          href={news.link}
                          target={news.link.startsWith("http") ? "_blank" : "_self"}
                          rel={news.link.startsWith("http") ? "noopener noreferrer" : ""}
                        >
                          <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-teal-600 transition-colors">
                            {news.title}
                          </h3>
                        </Link>
                      ) : (
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {news.title}
                        </h3>
                      )}

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <CalendarDays className="w-4 h-4 mr-2 text-teal-600" />
                        {news.date.toLocaleDateString("en-GB", { 
                          day: "numeric", 
                          month: "short", 
                          year: "numeric" 
                        })}
                      </div>

                      <p className="text-gray-600 text-sm sm:text-base flex-grow mb-4">
                        {news.description}
                      </p>

                      {/* Share Buttons */}
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <ShareButtons
                          title={news.title}
                          description={news.description}
                          url={newsUrl}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Call to Action */}
          <div data-aos="fade-up" className="text-center">
            <Link href="/contact-us">
              <Square_Button>Submit Your News</Square_Button>
            </Link>
          </div>
        </main>
      </div>
    </Container>
  );
}