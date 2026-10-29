"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [poster, setPoster] = useState(posterUrl);
  const [muted, setMuted] = useState(true);
  // Auto-play YouTube runs as a clean "background" video: YouTube's own
  // controls are hidden and a transparent layer stops hover/clicks from
  // bringing up its title bar or "More videos". Our button handles sound.
  const backgroundMode = autoPlay && !!embedUrl?.includes("youtube");

  const sendCommand = (func: string, args: unknown[] = []) =>
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");

  // YouTube may switch on auto-generated captions for muted playback; turn
  // them off once the player is running (retry while it finishes loading).
  useEffect(() => {
    if (!backgroundMode || !loaded) return;
    const hideCaptions = () => {
      sendCommand("unloadModule", ["captions"]);
      sendCommand("unloadModule", ["cc"]);
    };
    hideCaptions();
    const timers = [1000, 3000, 6000].map((ms) => setTimeout(hideCaptions, ms));
    return () => timers.forEach(clearTimeout);
  }, [backgroundMode, loaded]);

  const toggleSound = () => {
    const player = iframeRef.current?.contentWindow;
    if (!player) return;
    const send = (func: string) => sendCommand(func);
    if (muted) {
      send("unMute");
      send("playVideo");
    } else {
      send("mute");
    }
    setMuted(!muted);
  };

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
          ref={iframeRef}
          src={embedUrl}
          title={title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen={!backgroundMode}
          // In background mode, keep the poster up briefly so YouTube's
          // start-up title never flashes before playback begins.
          onLoad={() => (backgroundMode ? setTimeout(() => setLoaded(true), 1500) : setLoaded(true))}
          className="absolute inset-0 h-full w-full border-0"
        />
      )}

      {backgroundMode && (
        <>
          <div aria-hidden="true" className="absolute inset-0 z-[1]" />
          {loaded && (
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!muted}
              className="absolute bottom-3 right-3 z-[2] inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-white"
            >
              {muted ? <VolumeX aria-hidden="true" className="h-4 w-4" /> : <Volume2 aria-hidden="true" className="h-4 w-4" />}
              {muted ? "Sound on" : "Mute"}
            </button>
          )}
        </>
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
