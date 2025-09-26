// src/app/news-and-events/latest-news /page.tsx
import Container from "@/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import latestNews from "@/app/data/latestNews";
import { Square_Button } from "@/components/Square_Button";

export const metadata: Metadata = {
  title: "Latest News | The Professional Accountants' Society",
  description:
    "Read the latest news and updates from the Professional Accountants’ Society. Stay informed on achievements, industry changes, and community milestones.",
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

export default function LatestNewsPage() {
  return (
    <Container>
      <div className="mx-3 px-5 border-l border-r border-gray-200 bg-white">
        <main className="w-full py-20 max-w-full">
          {/* Header */}
          <div data-aos="fade-up" className="mb-10">
            <div
              data-aos="fade-up"
              className="text-[10px] md:text-sm text-gray-500 mb-6"
            >
              <Link href="/" className="hover:text-teal-600">
                Home
              </Link>
              <span className="mx-2">|</span>
              <Link href="/members" className="hover:text-teal-600">
                News & Events
              </Link>
              <span className="mx-2">|</span>
              <span className="text-gray-700">Latest News</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              TPAS Newsroom
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              Stay informed with the latest news from TPAS.
            </p>
          </div>

          {/* News Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-12">
  {latestNews.map((news, idx) =>
    news.link ? (
      <Link
        key={idx}
        href={news.link}
        className="group h-full"
        target={news.link.startsWith("http") ? "_blank" : "_self"}
        rel={news.link.startsWith("http") ? "noopener noreferrer" : ""}
      >
        <div data-aos="fade-up" className="flex flex-col h-full rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white group-hover:shadow-lg transition duration-200">
          <Image
            src={news.image}
            alt={news.title}
            width={800}
            height={500}
            className="w-full h-56 object-cover"
          />
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {news.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <CalendarDays className="w-4 h-4 mr-2 text-teal-600" />
              {new Date(news.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <p className="text-gray-600 text-sm sm:text-base flex-grow">
              {news.description}
            </p>
          </div>
        </div>
      </Link>
    ) : null
  )}
</div>


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
