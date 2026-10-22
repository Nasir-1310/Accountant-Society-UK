import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Images } from "lucide-react";
import magazines from "@/app/data/magazines";
import galleryData from "@/app/data/galleryData";

export default function Highlights() {
  const magazine = magazines[0];
  const album = galleryData[0];
  if (!magazine && !album) return null;

  return (
    <section aria-labelledby="highlights-heading" className="site-container pb-6 ">
      <h2 id="highlights-heading" className="sr-only">
        Highlights
      </h2>
      <div className="grid gap-6 lg:grid-cols-2">
        {magazine && (
          <Link
            href={`/news-and-events/magazine/${magazine.slug}`}
            className="card card-hover group flex overflow-hidden"
          >
            <div className="relative w-32 flex-shrink-0 bg-brand-50 sm:w-40">
              <Image
                src={magazine.cover}
                alt=""
                fill
                sizes="160px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="eyebrow inline-flex items-center gap-1.5">
                <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
                Latest magazine
              </p>
              <h3 className="mt-2 text-lg font-bold text-brand-950">{magazine.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">{magazine.description}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-800">
                Read the magazine
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        )}

        {album && (
          <Link
            href={`/news-and-events/gallery/${album.slug}`}
            className="card card-hover group flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[21/8] w-full overflow-hidden bg-slate-100">
              <Image
                src={album.coverImageUrl}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                unoptimized={album.coverImageUrl.startsWith("http")}
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="eyebrow inline-flex items-center gap-1.5">
                <Images aria-hidden="true" className="h-3.5 w-3.5" />
                From the gallery
              </p>
              <h3 className="mt-2 text-lg font-bold text-brand-950">{album.title}</h3>
              <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-brand-800">
                View photos{album.videoUrl ? " and video" : ""}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
