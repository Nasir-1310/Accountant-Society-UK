// src/components/ShareButtons.tsx
"use client";

import { Facebook, Linkedin, Twitter, Share2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  description: string;
  url: string;
}

export default function ShareButtons({ title, description, url }: ShareButtonsProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Make sure URL is absolute
  const absoluteUrl = url.startsWith('http') ? url : `https://www.accountantssociety.org${url}`;

  // Encode for URL
  const encodedUrl = encodeURIComponent(absoluteUrl);
  const encodedText = encodeURIComponent(`${title} - ${description}`);

  // Share URLs
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const link = shareLinks[platform];
    window.open(link, "_blank", "width=600,height=600,scrollbars=yes");
    setShowShareMenu(false);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  // Native Web Share API (for mobile)
  const handleNativeShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: absoluteUrl,
        });
        setShowShareMenu(false);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.log("Error sharing:", err);
        }
      }
    }
  };

  return (
    <div className="relative z-10">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-600 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors duration-200"
        aria-label="Share this news"
        type="button"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {showShareMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[100]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowShareMenu(false);
            }}
          />

          {/* Share Menu */}
          <div className="absolute left-0 bottom-full mb-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 z-[101]">
            <div className="py-2">
              {/* Facebook */}
              <button
                onClick={(e) => handleShare("facebook", e)}
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
              >
                <Facebook className="w-5 h-5" fill="currentColor" />
                <span className="font-medium">Facebook</span>
              </button>

              {/* Twitter */}
              <button
                onClick={(e) => handleShare("twitter", e)}
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors duration-150"
              >
                <Twitter className="w-5 h-5" fill="currentColor" />
                <span className="font-medium">Twitter / X</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={(e) => handleShare("linkedin", e)}
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
              >
                <Linkedin className="w-5 h-5" fill="currentColor" />
                <span className="font-medium">LinkedIn</span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={(e) => handleShare("whatsapp", e)}
                type="button"
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-150"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="font-medium">WhatsApp</span>
              </button>

              {/* Native share for mobile */}
              {typeof window !== 'undefined' && typeof navigator.share === 'function' && (
                <>
                  <div className="border-t border-gray-200 my-1" />
                  <button
                    onClick={handleNativeShare}
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">More options</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}