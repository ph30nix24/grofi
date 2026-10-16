import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import prisma from "@/libs/db";
import { BlogItem } from "../components/type";
import BlogImage from "../components/BlogImage";
import BlogCard from "../components/BlogCard";
import MarkdownContent from "./components/MarkdownContent";
import JsonLd from "@/app/components/JsonLd";
import {
  Clock,
  Calendar,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  Tag,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Revalidate blog post every 60s so edits/updates appear automatically without manual redeployment
export const revalidate = 60;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post || !post.published) {
      return {
        title: "Article Not Found | Grofi",
        description: "The requested financial guide could not be found.",
      };
    }

    const imageUrl = post.image
      ? post.image.startsWith("http")
        ? post.image
        : `https://www.grofi.in${post.image}`
      : "https://www.grofi.in/og-image.png";

    return {
      title: `${post.title} | Grofi Financial Insights`,
      description: post.excerpt,
      alternates: {
        canonical: `/blogs/${post.slug}`,
      },
      keywords: post.tags,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `https://www.grofi.in/blogs/${post.slug}`,
        siteName: "Grofi",
        type: "article",
        publishedTime: post.createdAt.toISOString(),
        modifiedTime: post.updatedAt.toISOString(),
        authors: [post.author],
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating blog metadata:", error);
    return {
      title: "Financial Insights & Credit Guides | Grofi",
      description: "Explore in-depth credit card and loan guides, comparisons, and financial insights on Grofi.",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let rawPost = null;
  let relatedPosts: BlogItem[] = [];

  try {
    rawPost = await prisma.blogPost.findUnique({
      where: { slug },
    });
    
    if (rawPost && rawPost.published) {
      const rawRelated = await prisma.blogPost.findMany({
        where: {
          slug: { not: slug },
          published: true,
        },
        take: 2,
        orderBy: { createdAt: "desc" },
      });
      relatedPosts = JSON.parse(JSON.stringify(rawRelated)) as BlogItem[];
    }
  } catch (error) {
    console.error("Error fetching blog post data:", error);
  }

  if (!rawPost || !rawPost.published) {
    notFound();
  }

  const post = JSON.parse(JSON.stringify(rawPost)) as BlogItem;

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const postImageUrl = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `https://www.grofi.in${post.image}`
    : "https://www.grofi.in/og-image.png";

  // JSON-LD structured data with BreadcrumbList and BlogPosting
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.grofi.in",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blogs",
            item: "https://www.grofi.in/blogs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://www.grofi.in/blogs/${post.slug}`,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: [postImageUrl],
        datePublished: post.createdAt,
        dateModified: post.updatedAt || post.createdAt,
        author: {
          "@type": "Person",
          name: post.author,
          jobTitle: post.authorRole || "Financial Analyst",
        },
        publisher: {
          "@type": "Organization",
          name: "Grofi",
          url: "https://www.grofi.in",
          logo: {
            "@type": "ImageObject",
            url: "https://www.grofi.in/icon.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.grofi.in/blogs/${post.slug}`,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd schema={jsonLd} />
      <main className="flex flex-col min-h-screen bg-[#FDFBF7] font-montserrat overflow-x-clip">
        <Navbar />

        {/* Article Header & Breadcrumbs */}
        <section className="pt-6 pb-8 sm:pt-8 sm:pb-10 bg-linear-to-b from-[#F2EFE9] to-[#FDFBF7] border-b border-gray-200/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb nav */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6 font-medium overflow-x-auto scrollbar-hidden scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <Link href="/" className="hover:text-primary transition-colors shrink-0 py-0.5">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <Link href="/blogs" className="hover:text-primary transition-colors shrink-0 py-0.5">
                Blogs
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-primary font-semibold truncate max-w-35 xs:max-w-[200px] sm:max-w-md py-0.5">
                {post.title}
              </span>
            </nav>

            {/* Back link */}
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-gold transition-colors mb-4 sm:mb-5 touch-manipulation py-2 min-h-11 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all insights</span>
            </Link>

            {/* Category badge & metadata */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-2xs"
                style={{
                  backgroundColor: post.categoryBg || "#F4F2EC",
                  color: post.categoryColor || "#02474D",
                }}
              >
                {post.category}
              </span>

              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{post.readTime}</span>
              </div>

              <span className="text-gray-300">•</span>

              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Main title */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold font-bricolage text-[#02282C] tracking-tight leading-tight mb-4 wrap-break-word">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 wrap-break-word">
              {post.excerpt}
            </p>

            {/* Author Attribution */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200/70 gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm sm:text-base font-bricolage shadow-2xs shrink-0">
                  {"G"}
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm md:text-base font-bold text-gray-900 leading-tight truncate">
                    {"Grofi Editorial"}
                  </p>
                  {post.authorRole && (
                    <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 leading-tight truncate">
                      {post.authorRole}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-emerald-800 bg-emerald-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-emerald-200 shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold hidden sm:inline">Editorial Fact-Checked</span>
                <span className="font-semibold sm:hidden">Verified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Visual Banner */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 mb-8 w-full">
          <div className="rounded-2xl overflow-hidden aspect-video shadow-md border border-gray-200/80">
            <BlogImage
              src={post.image}
              alt={post.title}
              category={post.category}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Article Body */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 w-full">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 p-4 xs:p-6 sm:p-10 lg:p-12 shadow-2xs">
            {post.content ? (
              <MarkdownContent content={post.content} />
            ) : (
              <p className="text-gray-600">{post.excerpt}</p>
            )}

            {/* Tags row */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 sm:mt-12 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs font-semibold text-gray-500 mr-1 sm:mr-2">
                  Tagged under:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium bg-[#F4F2EC] text-gray-700 px-2.5 sm:px-3 py-1 rounded-lg border border-gray-200/60"
                  >
                    <Tag className="w-3 h-3 text-gold shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* Related Guides from DB (strictly DB posts) */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full border-t border-gray-200/80">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold font-bricolage text-[#02282C] wrap-break-word">
                More Guides From Grofi
              </h2>
              <Link
                href="/blogs"
                className="text-xs sm:text-sm md:text-base font-bold text-primary hover:text-gold transition-colors py-2 px-1 min-h-11 inline-flex items-center touch-manipulation cursor-pointer"
              >
                View all insights →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <BlogCard key={related.id} blog={related} />
              ))}
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
}
