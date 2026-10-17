"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, Tag, Loader2 } from "lucide-react";
import { BlogItem } from "./type";
import BlogImage from "./BlogImage";

interface BlogCardProps {
  blog: BlogItem;
  viewMode?: "grid" | "list";
  onSelectTag?: (tag: string) => void;
}

function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "Recently Updated";
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Recently Updated";
  }
}

export default function BlogCard({
  blog,
  viewMode = "grid",
  onSelectTag,
}: BlogCardProps) {
  const [isFetching, setIsFetching] = useState(false);
  const formattedDate = formatDate(blog.createdAt);

  const handleNavigate = () => {
    setIsFetching(true);
  };

  if (viewMode === "list") {
    return (
      <article className="group relative bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col md:flex-row font-montserrat w-full min-w-0 max-w-full">
        {isFetching && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-gold to-primary animate-pulse z-20" />
        )}
        {/* Image / Graphic */}
        <Link
          href={`/blogs/${blog.slug}`}
          onClick={handleNavigate}
          className="relative w-full md:w-72 lg:w-80 h-48 md:h-auto shrink-0 overflow-hidden block min-w-0"
        >
          <BlogImage
            src={blog.image}
            alt={blog.title}
            category={blog.category}
            className="h-full w-full object-cover"
          />
        </Link>

        {/* Content body */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between w-full min-w-0 max-w-full">
          <div>
            {/* Top row: Category badge, Read time, Date */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide inline-flex items-center shrink-0"
                style={{
                  backgroundColor: blog.categoryBg || "#F4F2EC",
                  color: blog.categoryColor || "#02474D",
                }}
              >
                {blog.category}
              </span>

              <span className="text-gray-300 shrink-0">•</span>

              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 font-medium shrink-0">
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{blog.readTime || "5 min read"}</span>
              </div>

              <span className="text-gray-300 shrink-0">•</span>

              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 shrink-0">
                <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold font-bricolage text-[#02282C] group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug wrap-break-word">
              <Link href={`/blogs/${blog.slug}`} onClick={handleNavigate} className="focus:outline-hidden">
                {blog.title}
              </Link>
            </h2>

            {/* Excerpt */}
            <p className="text-xs xs:text-sm sm:text-base text-gray-600 line-clamp-2 leading-relaxed mb-4 wrap-break-word">
              {blog.excerpt}
            </p>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                {blog.tags.slice(0, 3).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onSelectTag?.(tag)}
                    type="button"
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium bg-gray-50 hover:bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-gray-200/60 transition-colors touch-manipulation cursor-pointer"
                  >
                    <Tag className="w-2.5 h-2.5 text-gray-400" />
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom row: Author and Read CTA */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs sm:text-sm font-bricolage shrink-0">
                {"G"}
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight truncate">
                  {"Grofi Editorial"}
                </p>
                {blog.authorRole && (
                  <p className="text-[11px] sm:text-xs text-gray-500 leading-tight truncate">
                    {blog.authorRole}
                  </p>
                )}
              </div>
            </div>

            <Link
              href={`/blogs/${blog.slug}`}
              onClick={handleNavigate}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary group-hover:text-gold transition-colors py-1 px-2.5 min-h-11 touch-manipulation shrink-0"
            >
              {isFetching ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-primary shrink-0" />
                  <span>Fetching...</span>
                </>
              ) : (
                <>
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                </>
              )}
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Grid view (Default)
  return (
    <article className="group relative bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col font-montserrat h-full w-full min-w-0 max-w-full">
      {isFetching && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-gold to-primary animate-pulse z-20" />
      )}
      {/* Image / Thematic Graphic */}
      <Link
        href={`/blogs/${blog.slug}`}
        onClick={handleNavigate}
        className="relative aspect-video w-full overflow-hidden block min-w-0"
      >
        <BlogImage
          src={blog.image}
          alt={blog.title}
          category={blog.category}
          className="h-full w-full object-cover"
        />
        {/* Floating Category Tag inside image top */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wide shadow-xs backdrop-blur-md"
            style={{
              backgroundColor: blog.categoryBg || "rgba(255, 255, 255, 0.9)",
              color: blog.categoryColor || "#02474D",
            }}
          >
            {blog.category}
          </span>
        </div>
      </Link>

      {/* Content body */}
      <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between w-full min-w-0 max-w-full">
        <div>
          {/* Metadata chips */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2.5 flex-wrap">
            <div className="flex items-center gap-1 font-medium shrink-0">
              <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{blog.readTime || "5 min read"}</span>
            </div>
            <span className="text-gray-300 shrink-0">•</span>
            <div className="flex items-center gap-1 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-base xs:text-lg sm:text-xl font-bold font-bricolage text-[#02282C] group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug wrap-break-word">
            <Link href={`/blogs/${blog.slug}`} onClick={handleNavigate} className="focus:outline-hidden">
              {blog.title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="text-xs xs:text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed mb-4 wrap-break-word">
            {blog.excerpt}
          </p>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              {blog.tags.slice(0, 3).map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSelectTag?.(tag)}
                  type="button"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium bg-gray-50 hover:bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-gray-200/60 transition-colors touch-manipulation cursor-pointer"
                >
                  <Tag className="w-2.5 h-2.5 text-gray-400" />
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Author & Link */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs sm:text-sm font-bricolage shrink-0">
              {"G"}
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight truncate max-w-30">
                {"Grofi Editorial"}
              </p>
              {blog.authorRole && (
                <p className="text-[10px] sm:text-xs text-gray-500 leading-tight truncate max-w-30">
                  {blog.authorRole}
                </p>
              )}
            </div>
          </div>

          <Link
            href={`/blogs/${blog.slug}`}
            onClick={handleNavigate}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-primary group-hover:text-gold transition-colors py-1 px-2.5 min-h-11 touch-manipulation shrink-0"
          >
            {isFetching ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary shrink-0" />
                <span>Fetching...</span>
              </>
            ) : (
              <>
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 shrink-0" />
              </>
            )}
          </Link>
        </div>
      </div>
    </article>
  );
}
