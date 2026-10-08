"use client";

import { useEffect, useState } from "react";
import { getVideoEmbedUrl, getVideoPosterUrl } from "@/lib/videoEmbed";

interface VideoEmbedProps {
  // Google Drive or YouTube share link.
  url: string;
  title: string;
}

/**
 * Fills its positioned parent (give the parent `relative` and an aspect
 * ratio). Shows the video's thumbnail with a spinner until the player has
 * loaded, so visitors never see the player's black loading screen.
 */
export default function VideoEmbed({ url, title }: VideoEmbedProps) {
  const embedUrl = getVideoEmbedUrl(url);
  const posterUrl = getVideoPosterUrl(url);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Mount the player after hydration so its onLoad is always caught.
    setMounted(true);
    // Safety net: never cover the player forever if onLoad doesn't fire.
    const timer = setTimeout(() => setLoaded(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  if (!embedUrl) return null;

  return (
    <>
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
        {posterUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={posterUrl} alt="" className="h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white sm:h-12 sm:w-12" />
        </div>
      </div>
    </>
  );
}
