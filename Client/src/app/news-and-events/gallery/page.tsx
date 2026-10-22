// src/app/news-and-events/gallery/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, PlayCircle } from "lucide-react";
import galleryData from "@/app/data/galleryData";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from TPAS events, tours and member gatherings.",
  alternates: { canonical: "/news-and-events/gallery" },
};

const GalleryPage = () => {
  return (
    <>
      <PageHeader
        eyebrow="News & events"
        title="Gallery"
        description="Explore memories from our past events, tours, and member gatherings."
        breadcrumbs={[{ label: "News & Events", href: "/news-and-events" }, { label: "Gallery" }]}
      />

      <div className="site-container py-12  sm:py-16">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {galleryData.map((item, idx) => (
            <li key={item.slug}>
              <Link
                href={`/news-and-events/gallery/${item.slug}`}
                className="card card-hover group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.coverImageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    unoptimized={item.coverImageUrl.startsWith("http")}
                    priority={idx === 0}
                  />
                  {item.videoUrl && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-950/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                      <PlayCircle aria-hidden="true" className="h-3.5 w-3.5" />
                      Video
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays aria-hidden="true" className="h-4 w-4 text-brand-500" />
                    {item.date}
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-brand-950 group-hover:text-brand-700">{item.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">{item.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-800">
                    View album
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default GalleryPage;
