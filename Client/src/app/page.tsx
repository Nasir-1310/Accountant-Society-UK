import type { Metadata } from "next";
import FeatureSection from "@/components/FeatureSection";
import NewsAndBlogsSection from "@/components/NewsAndBlogsSection";
import Slider from "@/components/Slider";
import { getHomeHeroData } from "@/lib/homeHero";
import { getPublishedNewsBlogs } from "@/lib/newsBlogs";
import AboutIntro from "@/components/home/AboutIntro";
import EventsPreview from "@/components/home/EventsPreview";
import Highlights from "@/components/home/Highlights";

// Render per request so the slider (images or video) is correct on first
// paint and admin changes show immediately.
export const dynamic = "force-dynamic";

// ✅ Page Metadata for SEO
export const metadata: Metadata = {
  title: { absolute: "The Professional Accountants' Society | Official Website" },
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

export default async function Home() {
  const [heroData, newsBlogs] = await Promise.all([getHomeHeroData(), getPublishedNewsBlogs(6)]);

  return (
    <>
      <h1 className="sr-only">The Professional Accountants&apos; Society — British Bangladeshi accountants in the UK</h1>

      <section aria-label="Homepage banner" className="pt-4 sm:pt-6">
        <Slider initialData={heroData} />
      </section>

      <div className="mt-8 sm:mt-10">
        <FeatureSection />
      </div>

      <AboutIntro />

      <EventsPreview />

      <NewsAndBlogsSection items={newsBlogs} />

      <Highlights />
    </>
  );
}
