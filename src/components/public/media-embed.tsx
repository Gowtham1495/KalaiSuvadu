import React from "react";

type MediaEmbedProps = {
  type: string; // "IMAGE" | "VIDEO" | "YOUTUBE" | "INSTAGRAM" | "INSTAGRAM-REEL" | "INSTAGRAM-GALLERY"
  url: string;
  altText?: string | null;
};

function getYouTubeEmbedUrl(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
}

function getInstagramEmbedUrl(url: string): string | null {
  try {
    // Strip trailing query params and build the clean embed link
    const cleanUrl = url.split("?")[0].replace(/\/$/, "");
    return `${cleanUrl}/embed/`;
  } catch {
    return null;
  }
}

export function MediaEmbed({ type, url, altText }: MediaEmbedProps) {
  const normalizedType = type.toUpperCase();

  switch (normalizedType) {
    case "YOUTUBE": {
      const embedUrl = getYouTubeEmbedUrl(url);
      if (!embedUrl) {
        return (
          <div className="flex h-48 w-full items-center justify-center bg-stone-100 text-stone-400">
            Invalid YouTube URL
          </div>
        );
      }
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-[1.75rem] border border-stone-200 bg-stone-100 shadow-sm">
          <iframe
            src={embedUrl}
            title={altText || "YouTube Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 h-full w-full border-0"
          />
        </div>
      );
    }

    case "INSTAGRAM":
    case "INSTAGRAM-REEL":
    case "INSTAGRAM-GALLERY": {
      const embedUrl = getInstagramEmbedUrl(url);
      if (!embedUrl) {
        return (
          <div className="flex h-48 w-full items-center justify-center bg-stone-100 text-stone-400">
            Invalid Instagram URL
          </div>
        );
      }
      return (
        <div className="relative w-full overflow-hidden rounded-[1.75rem] border border-stone-200 bg-stone-100 shadow-sm">
          <iframe
            src={embedUrl}
            title={altText || "Instagram Post"}
            allowTransparency
            scrolling="no"
            frameBorder="0"
            className="mx-auto w-full max-w-[540px] aspect-[4/5] min-h-[480px] border-0 block"
          />
        </div>
      );
    }

    case "VIDEO": {
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-[1.75rem] border border-stone-200 bg-stone-100 shadow-sm">
          <video
            src={url}
            controls
            playsInline
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
        </div>
      );
    }

    case "IMAGE":
    default: {
      return (
        <div className="relative w-full overflow-hidden rounded-[1.75rem] border border-stone-200 bg-stone-100 shadow-sm">
          <img
            src={url}
            alt={altText || "Project Media"}
            className="w-full h-auto object-cover max-h-[80vh]"
            loading="lazy"
          />
        </div>
      );
    }
  }
}
