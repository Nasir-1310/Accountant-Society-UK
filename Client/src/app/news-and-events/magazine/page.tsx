// src/app/news-and-events/magazine/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import magazines from "@/app/data/magazines";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "TPAS Magazine",
  description:
    "Explore TPAS Magazines featuring insights, industry trends, and thought leadership articles from the Professional Accountants' Society.",
  alternates: { canonical: "/news-and-events/magazine" },
  openGraph: {
    title: "TPAS Magazine | The Professional Accountants' Society",
    description:
      "Browse the official TPAS Magazines filled with professional insights, community updates, and expert contributions.",
    url: "/news-and-events/magazine",
    type: "website",
    images: [{ url: "/OG_image.png", width: 1200, height: 630, alt: "TPAS Magazine" }],
  },
};

export default function MagazinePage() {
  return (
    <>
      <PageHeader
        eyebrow="News & events"
        title="TPAS Magazines"
        description="Discover our curated collection of TPAS Magazines featuring in-depth articles, professional insights, and updates from our community of accountants and thought leaders."
        breadcrumbs={[{ label: "News & Events", href: "/news-and-events" }, { label: "Magazine" }]}
      />

      <div className="site-container py-12  sm:py-16">
        <ul className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {magazines.map((mag, idx) => (
            <li key={mag.slug}>
              <article className="card card-hover group flex h-full flex-col overflow-hidden sm:flex-row">
                <Link
                  href={`/news-and-events/magazine/${mag.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="relative block aspect-[3/4] w-full flex-shrink-0 bg-surface sm:aspect-auto sm:w-56"
                >
                  <Image
                    src={mag.cover}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 224px"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02] sm:object-cover sm:p-0"
                    priority={idx === 0}
                  />
                </Link>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  {idx === 0 && (
                    <span className="mb-3 w-fit rounded-full bg-accent-50 px-2.5 py-1 text-xs font-semibold text-accent-700">
                      Latest issue
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-brand-950 sm:text-2xl">
                    <Link href={`/news-and-events/magazine/${mag.slug}`} className="hover:text-brand-700">
                      {mag.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays aria-hidden="true" className="h-4 w-4 text-brand-500" />
                    {new Date(mag.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                  </p>
                  <p className="mt-4 leading-relaxed text-slate-600">{mag.description}</p>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/news-and-events/magazine/${mag.slug}`}
                      className="btn-primary w-fit"
                      aria-label={`Read ${mag.title}`}
                    >
                      Read the magazine
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
