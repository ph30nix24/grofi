"use client";

import React, { useState } from "react";
import { ImageOff, Maximize2, Sparkles } from "lucide-react";

interface ContentImageProps {
  src: string;
  alt: string;
  caption?: string;
  inline?: boolean;
}

export default function ContentImage({
  src,
  alt,
  caption,
  inline = false,
}: ContentImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const displayCaption = caption || (alt && alt !== "Blog illustration" ? alt : "");

  if (hasError || !src) {
    return (
      <div className="my-6 p-6 rounded-2xl border border-dashed border-gray-300 bg-gray-50/80 flex flex-col items-center justify-center text-center">
        <ImageOff className="w-7 h-7 text-gray-400 mb-2" />
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-montserrat">
          Illustration Unavailable
        </span>
        {displayCaption && (
          <p className="text-sm text-gray-600 mt-1 italic max-w-lg font-montserrat">
            {displayCaption}
          </p>
        )}
      </div>
    );
  }

  const content = (
    <>
      <div className="relative w-full overflow-hidden flex items-center justify-center p-2 xs:p-3 sm:p-5 bg-white">
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <span className="text-xs text-gray-400 font-montserrat">Loading graphic...</span>
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || "Blog illustration"}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-auto max-h-145 object-contain rounded-xl sm:rounded-2xl mx-auto transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Expand / View Full Resolution button */}
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          title="Open original high-res image"
          aria-label="Open original image in new tab"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 min-h-11 min-w-11 p-2.5 sm:px-3 sm:py-2 rounded-xl bg-gray-900/75 hover:bg-primary text-white backdrop-blur-md opacity-80 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 flex items-center justify-center gap-1.5 text-xs font-medium shadow-md touch-manipulation cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline font-montserrat">View full</span>
        </a>
      </div>

      {displayCaption && (
        <figcaption className="text-center text-xs sm:text-sm text-gray-600 italic py-3 px-4 sm:px-6 bg-[#FDFBF7] border-t border-gray-200/70 font-montserrat leading-relaxed flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 opacity-75" />
          <span>{displayCaption}</span>
        </figcaption>
      )}
    </>
  );

  if (inline) {
    return (
      <span className="block my-6 overflow-hidden rounded-2xl border border-gray-200/80 bg-[#FDFBF7] shadow-2xs group">
        {content}
      </span>
    );
  }

  return (
    <figure className="my-8 sm:my-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-[#FDFBF7] shadow-2xs group">
      {content}
    </figure>
  );
}
