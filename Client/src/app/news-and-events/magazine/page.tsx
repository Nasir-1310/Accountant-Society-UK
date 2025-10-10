// ============================================
// FILE 2: src/app/news-and-events/magazine/page.tsx
// ============================================

import Container from "@/components/Container";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import magazines from "@/app/data/magazines";
import { Square_Button } from "@/components/Square_Button";

export const metadata: Metadata = {
  title: "TPAS Magazine | The Professional Accountants' Society",
  description:
    "Explore TPAS Magazines featuring insights, industry trends, and thought leadership articles from the Professional Accountants' Society.",
  openGraph: {
    title: "TPAS Magazine | The Professional Accountants' Society",
    description:
      "Browse the official TPAS Magazines filled with professional insights, community updates, and expert contributions.",
    url: "https://www.accountantssociety.org/news-and-events/magazine",
    type: "website",
    images: [
      {
        url: "https://www.accountantssociety.org/og/magazine.jpg",
        width: 1200,
        height: 630,
        alt: "TPAS Magazine - Cover",
      },
    ],
  },
};

export default function MagazinePage() {
  return (
    <Container>
      <div className="mx-3 px-5 border-l border-r border-gray-200 bg-white">
        <main className="w-full py-20 max-w-full">
          {/* Header */}
          <div data-aos="fade-up" className="mb-12">
            <div className="text-[10px] md:text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-teal-600">
                Home
              </Link>
              <span className="mx-2">|</span>
              <Link href="/news-and-events" className="hover:text-teal-600">
                News & Events
              </Link>
              <span className="mx-2">|</span>
              <span className="text-gray-700">Magazine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              TPAS Magazines
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-7xl">
              Discover our curated collection of TPAS Magazines featuring
              in-depth articles, professional insights, and updates from our
              community of accountants and thought leaders.
            </p>
          </div>

          {/* Featured Magazine Layout */}
          <div className="space-y-16">
            {magazines.map((mag, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition duration-200 overflow-hidden"
              >
                {/* Left: Cover Image */}
                <div className="relative w-full md:w-1/2 h-[400px] md:h-[500px] flex-shrink-0 bg-gray-50">
                  <Image
                    src={mag.cover}
                    alt={mag.title}
                    fill
                    className="object-contain md:object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Right: Magazine Info */}
                <div className="flex flex-col justify-center p-6 md:p-10 md:w-1/2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                    {mag.title}
                  </h3>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FileText className="w-4 h-4 mr-2 text-teal-600" />
                    {new Date(mag.date).toLocaleDateString("en-GB", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>

                  <p className="text-gray-700 text-base leading-relaxed mb-6">
                    {mag.description}
                  </p>

                  <Link
                    href={`/news-and-events/magazine/${mag.slug}`}
                    className="inline-block"
                  >
                    <Square_Button>Read Full Magazine</Square_Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Container>
  );
}
