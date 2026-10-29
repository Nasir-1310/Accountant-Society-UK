import Link from "next/link";
import { ArrowRight } from "lucide-react";
import VideoEmbed from "@/components/VideoEmbed";
import homeVideo from "@/app/data/homeVideo";

/** Homepage featured video: auto-plays (muted) when it scrolls into view. */
export default function VideoHighlight() {
  if (!homeVideo.videoUrl) return null;

  return (
    <section aria-labelledby="video-highlight-heading" className="mt-14 bg-brand-950 py-14 text-white sm:mt-20 sm:py-20">
      <div className="site-container grid items-center gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">{homeVideo.eyebrow}</p>
          <h2 id="video-highlight-heading" className="mt-2 text-3xl font-bold sm:text-4xl">
            {homeVideo.title}
          </h2>
          <p className="mt-4 leading-relaxed text-white/75">{homeVideo.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={homeVideo.primaryAction.href} className="btn-accent">
              {homeVideo.primaryAction.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link href={homeVideo.secondaryAction.href} className="btn-ghost-light">
              {homeVideo.secondaryAction.label}
            </Link>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl bg-black shadow-lift ring-1 ring-white/10"
          style={{ aspectRatio: "16 / 9" }}
        >
          <VideoEmbed url={homeVideo.videoUrl} title={`${homeVideo.title} — highlights video`} autoPlay />
        </div>
      </div>
    </section>
  );
}
