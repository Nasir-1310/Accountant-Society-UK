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

// YouTube shows its title, channel and controls for a few seconds whenever
// playback starts, even with controls hidden. Keep our poster over the video
// until that overlay has faded.
const REVEAL_DELAY_MS = 6000;
// The background player is drawn this much taller at the top and bottom than
// its box (and cropped). YouTube letterboxes the video into the extra space,
// so the video still fills the box while YouTube's title bar (top) and
// "More videos"/logo bar (bottom) sit outside the visible area.
const BAR_CROP_PX = 64;
const SAFETY_TIMEOUT_MS = 15000;

/**
 * Fills its positioned parent (give the parent `relative` and an aspect
 * ratio). Shows the video's thumbnail with a spinner until the player is
 * ready, so visitors never see the player's black loading screen.
 */
export default function VideoEmbed({ url, title, autoPlay = false }: VideoEmbedProps) {
  const embedUrl = getVideoEmbedUrl(url, { autoplay: autoPlay });
  const posterUrl = getVideoPosterUrl(url);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heardFromPlayer = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [covered, setCovered] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [poster, setPoster] = useState(posterUrl);
  const [muted, setMuted] = useState(true);
  // Auto-play YouTube runs as a clean "background" video: YouTube's controls
  // are hidden, a transparent layer stops hover/clicks from bringing up its
  // menus, and our own button handles sound.
  const backgroundMode = autoPlay && !!embedUrl?.includes("youtube");

  const sendToPlayer = (message: Record<string, unknown>) =>
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(message), "*");
  const sendCommand = (func: string, args: unknown[] = []) => sendToPlayer({ event: "command", func, args });
  const hideCaptions = () => {
    // YouTube may switch on auto-generated captions for muted playback.
    sendCommand("unloadModule", ["captions"]);
    sendCommand("unloadModule", ["cc"]);
  };

  const toggleSound = () => {
    if (muted) {
      sendCommand("unMute");
      sendCommand("playVideo");
    } else {
      sendCommand("mute");
    }
    setMuted(!muted);
  };

  // Auto-play videos load only when near the viewport, so the player doesn't
  // download (and play unseen) for visitors who never scroll there.
  useEffect(() => {
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

  // Safety net: never cover the player forever (e.g. if the player's
  // messages are blocked).
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      if (!backgroundMode || !heardFromPlayer.current) setCovered(false);
    }, SAFETY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [mounted, backgroundMode]);

  // Background mode: follow YouTube's player state to decide when to reveal.
  useEffect(() => {
    if (!backgroundMode || !mounted) return;

    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow || typeof event.data !== "string") return;
      let data: { event?: string; info?: unknown };
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }
      heardFromPlayer.current = true;

      const state =
        data.event === "onStateChange" && typeof data.info === "number"
          ? data.info
          : data.event === "infoDelivery" && data.info && typeof (data.info as { playerState?: unknown }).playerState === "number"
            ? (data.info as { playerState: number }).playerState
            : undefined;
      if (state === undefined) return;

      if (state === 1) {
        // Playing: reveal once YouTube's start-up overlay has faded.
        if (!revealTimer.current) {
          hideCaptions();
          revealTimer.current = setTimeout(() => {
            hideCaptions();
            setCovered(false);
            setHasPlayed(true);
          }, REVEAL_DELAY_MS);
        }
      } else if (state === 0 || state === -1) {
        // Ended / restarting the loop: cover the restart overlay too.
        if (revealTimer.current) clearTimeout(revealTimer.current);
        revealTimer.current = null;
        setCovered(true);
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      if (revealTimer.current) clearTimeout(revealTimer.current);
      revealTimer.current = null;
    };
    // hideCaptions only posts messages to the iframe, so it is safe to omit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundMode, mounted]);

  // Ask the player to send its state updates (repeat until it answers).
  const startListening = () => {
    let attempts = 0;
    const ping = () => {
      if (heardFromPlayer.current || attempts++ > 20) return;
      sendToPlayer({ event: "listening", id: "tpas-video", channel: "widget" });
      sendCommand("addEventListener", ["onStateChange"]);
      setTimeout(ping, 500);
    };
    ping();
  };

  if (!embedUrl) return null;

  const src =
    backgroundMode && typeof window !== "undefined"
      ? `${embedUrl}&origin=${encodeURIComponent(window.location.origin)}`
      : embedUrl;

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden">
      {mounted && (
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen={!backgroundMode}
          onLoad={() => (backgroundMode ? startListening() : setCovered(false))}
          className={backgroundMode ? "absolute inset-x-0 w-full border-0" : "absolute inset-0 h-full w-full border-0"}
          style={
            backgroundMode
              ? { top: -BAR_CROP_PX, height: `calc(100% + ${BAR_CROP_PX * 2}px)` }
              : undefined
          }
        />
      )}

      {backgroundMode && (
        <>
          <div aria-hidden="true" className="absolute inset-0 z-[1]" />
          {!covered && (
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!muted}
              className="absolute bottom-3 right-3 z-[3] inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-white"
            >
              {muted ? <VolumeX aria-hidden="true" className="h-4 w-4" /> : <Volume2 aria-hidden="true" className="h-4 w-4" />}
              {muted ? "Sound on" : "Mute"}
            </button>
          )}
        </>
      )}

      <div
        aria-hidden="true"
        className={`absolute inset-0 z-[2] transition-opacity duration-500 ${covered ? "opacity-100" : "pointer-events-none opacity-0"}`}
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
        {!hasPlayed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white sm:h-12 sm:w-12" />
          </div>
        )}
      </div>
    </div>
  );
}
