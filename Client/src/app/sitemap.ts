import type { MetadataRoute } from "next";
import galleryData from "@/app/data/galleryData";
import magazines from "@/app/data/magazines";

const siteUrl = "https://accountantssociety.org";

const staticRoutes = [
  "/",
  "/about-us",
  "/contact-us",
  "/find-an-accountants",
  "/founding-members/members",
  "/members",
  "/members/benefits",
  "/members/membership-and-fees",
  "/members/cpd-training",
  "/members/rules-and-guidance",
  "/members/journal",
  "/members/professional-support",
  "/members/wellbeing",
  "/members/strategic-partners",
  "/cpd-and-training/inspiring-futures-changing-lives",
  "/news-and-events",
  "/news-and-events/latest-news",
  "/news-and-events/upcoming-events",
  "/news-and-events/gallery",
  "/news-and-events/magazine",
  "/policies/constitution",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: (route === "/" || route.startsWith("/news-and-events") ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: route === "/" ? 1 : 0.7,
    })),
    ...galleryData.map((album) => ({
      url: `${siteUrl}/news-and-events/gallery/${album.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...magazines.map((magazine) => ({
      url: `${siteUrl}/news-and-events/magazine/${encodeURIComponent(magazine.slug)}`,
      lastModified: new Date(magazine.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
