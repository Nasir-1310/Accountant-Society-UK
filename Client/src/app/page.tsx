import type { Metadata } from "next";
import FeatureSection from "@/components/FeatureSection";
import NewsAndBlogsSection from "@/components/NewsAndBlogsSection";
import Slider from "@/components/Slider";

// ✅ Page Metadata for SEO
export const metadata: Metadata = {
  title: "The Professional Accountants' Society | Official Website",
  description:
    "Welcome to The Professional Accountants' Society — fostering excellence in the accounting profession through news, events, and resources for members.",
  keywords: [
    "Accountants Society",
    "Professional Accountants",
    "Accounting News",
    "Accounting Events",
    "Financial Professionals",
  ],
  openGraph: {
    title: "The Professional Accountants' Society",
    description:
      "Official website of The Professional Accountants' Society — stay updated with the latest accounting news, blogs, and events.",
    url: "https://accountantssociety.org",
    siteName: "The Professional Accountants' Society",
    images: [
      {
        url: "/OG_image.png", // ✅ Place the OG image in /public folder
        width: 1200,
        height: 630,
        alt: "The Professional Accountants' Society - Official Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Professional Accountants' Society",
    description:
      "Official site of the society featuring news, events, and updates for accounting professionals.",
    images: ["/OG_image.png"],
  },
  alternates: {
    canonical: "https://accountantssociety.org",
  },
};

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      {/* ✅ Use semantic sections for SEO */}
      <section aria-label="Homepage Banner">
        <Slider />
      </section>

      <section aria-label="Features of the Society">
        <FeatureSection />
      </section>

      <section aria-label="Latest News and Blogs">
        <NewsAndBlogsSection />
      </section>
    </main>
  );
}
