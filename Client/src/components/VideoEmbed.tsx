"use client";

import { useEffect, useRef, useState } from "react";
import { getVideoEmbedUrl, getVideoPosterUrl } from "@/lib/videoEmbed";

interface VideoEmbedProps {
  // Google Drive or YouTube share link.
  url: string;
  title: string;
  // Start playing (muted, looping) once the video scrolls into view.
  // Works with YouTube; Google Drive can't auto-play.
  autoPlay?: boolean;
}

/**
 * Fills its positioned parent (give the parent `relative` and an aspect
 * ratio). Shows the video's thumbnail with a spinner until the player has
 * loaded, so visitors never see the player's black loading screen.
 */
export default function VideoEmbed({ url, title, autoPlay = false }: VideoEmbedProps) {
  const embedUrl = getVideoEmbedUrl(url, { autoplay: autoPlay });
  const posterUrl = getVideoPosterUrl(url);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [poster, setPoster] = useState(posterUrl);

  useEffect(() => {
    // Auto-play videos load only when near the viewport, so the player
    // doesn't download (and play unseen) for visitors who never scroll there.
    if (autoPlay && wrapperRef.current && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setMounted(true);
            observer.disconnect();
          }
        },
        { rootMargin: "200px" }
      );
      observer.observe(wrapperRef.current);
      return () => observer.disconnect();
    }
    // Otherwise mount after hydration so the player's onLoad is always caught.
    setMounted(true);
  }, [autoPlay]);

  useEffect(() => {
    if (!mounted) return;
    // Safety net: never cover the player forever if onLoad doesn't fire.
    const timer = setTimeout(() => setLoaded(true), 15000);
    return () => clearTimeout(timer);
  }, [mounted]);

  if (!embedUrl) return null;

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      {mounted && (
        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full border-0"
        />
      )}

      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-500 ${loaded ? "pointer-events-none opacity-0" : "opacity-100"}`}
        style={{ background: "linear-gradient(160deg, #1e3a6e 0%, #1a4fa8 50%, #1565c0 100%)" }}
      >
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            className="h-full w-full object-cover"
            // YouTube doesn't always have a full-HD thumbnail.
            onError={() => setPoster(poster.includes("maxresdefault") ? poster.replace("maxresdefault", "hqdefault") : null)}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white sm:h-12 sm:w-12" />
        </div>
      </div>
    </div>
  );
}
