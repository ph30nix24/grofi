"use client";

import React from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, Tag } from "lucide-react";
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
  const formattedDate = formatDate(blog.createdAt);

  if (viewMode === "list") {
    return (
      <article className="group bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col md:flex-row font-montserrat">
        {/* Image / Graphic */}
        <Link
          href={`/blogs/${blog.slug}`}
          className="relative md:w-72 lg:w-80 h-48 md:h-auto shrink-0 overflow-hidden block"
        >
          <BlogImage
            src={blog.image}
            alt={blog.title}
            category={blog.category}
            className="h-full w-full object-cover"
          />
        </Link>

        {/* Content body */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            {/* Top row: Category badge, Read time, Date */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide inline-flex items-center"
                style={{
                  backgroundColor: blog.categoryBg || "#F4F2EC",
                  color: blog.categoryColor || "#02474D",
                }}
              >
                {blog.category}
              </span>

              <span className="text-gray-300">•</span>

              <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{blog.readTime || "5 min read"}</span>
              </div>

              <span className="text-gray-300">•</span>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-bold font-bricolage text-[#02282C] group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
              <Link href={`/blogs/${blog.slug}`} className="focus:outline-hidden">
                {blog.title}
              </Link>
            </h2>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4">
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
                    className="inline-flex items-center gap-1 text-[11px] font-medium bg-gray-50 hover:bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md border border-gray-200/60 transition-colors"
                  >
                    <Tag className="w-2.5 h-2.5 text-gray-400" />
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom row: Author and Read CTA */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs font-bricolage">
                {blog.author ? blog.author.charAt(0) : "G"}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-900 leading-tight">
                  {blog.author || "Grofi Editorial"}
                </p>
                {blog.authorRole && (
                  <p className="text-[11px] text-gray-500 leading-tight">
                    {blog.authorRole}
                  </p>
                )}
              </div>
            </div>

            <Link
              href={`/blogs/${blog.slug}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary group-hover:text-gold transition-colors"
            >
              <span>Read Guide</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Grid view (Default)
  return (
    <article className="group bg-white rounded-2xl border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col font-montserrat h-full">
      {/* Image / Thematic Graphic */}
      <Link
        href={`/blogs/${blog.slug}`}
        className="relative aspect-16/9 w-full overflow-hidden block"
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
            className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide shadow-xs backdrop-blur-md"
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
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata chips */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2.5">
            <div className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{blog.readTime || "5 min read"}</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold font-bricolage text-[#02282C] group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
            <Link href={`/blogs/${blog.slug}`} className="focus:outline-hidden">
              {blog.title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
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
                  className="inline-flex items-center gap-1 text-[11px] font-medium bg-gray-50 hover:bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md border border-gray-200/60 transition-colors"
                >
                  <Tag className="w-2.5 h-2.5 text-gray-400" />
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Author & Link */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs font-bricolage">
              {blog.author ? blog.author.charAt(0) : "G"}
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-gray-900 leading-tight truncate max-w-[120px]">
                {blog.author || "Grofi Editorial"}
              </p>
              {blog.authorRole && (
                <p className="text-[10px] text-gray-500 leading-tight truncate max-w-[120px]">
                  {blog.authorRole}
                </p>
              )}
            </div>
          </div>

          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-gold transition-colors"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
