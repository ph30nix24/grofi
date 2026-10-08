import { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import prisma from "@/libs/db";
import { BlogItem } from "./components/type";
import BlogHero from "./components/BlogHero";
import BlogExplorer from "./components/BlogExplorer";
import BlogTrustBanner from "./components/BlogTrustBanner";




export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Grofi Financial Insights & Blogs | Credit Cards, Loans & Wealth - Grofi",
  description:
    "In-depth credit card reward strategies, personal loan guides, CIBIL score optimization blueprints, and smart wealth roadmaps curated by Grofi financial analysts.",
  alternates: { canonical: "/blogs" },
  keywords: [
    "Grofi blogs",
    "financial insights",
    "credit card guide",
    "credit score guide",
    "personal loan guide",
    "cibil score improvement",
    "best credit card rewards",
    "smart money habits",
    "financial planning India",
  ],
  openGraph: {
    title: "Grofi Financial Insights & Guides | Credit Cards, Loans & Wealth",
    description:
      "Explore data-backed credit card hacks, loan interest comparisons, and credit score mastery from Grofi researchers.",
    url: "https://www.grofi.in/blogs",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grofi Financial Insights & Blogs | Credit Cards & Loans",
    description:
      "Expert articles, reward hacks, and actionable personal finance guides curated by Grofi.",
  },
};

export const revalidate = 3600;

async function fetchBlogs(): Promise<BlogItem[]> {
  try {
    const rawData = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return JSON.parse(JSON.stringify(rawData)) as BlogItem[];
  } catch (error) {
    console.error("Failed to fetch blogs from database:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.grofi.in",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blogs & Insights",
            "item": "https://www.grofi.in/blogs",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": "https://www.grofi.in/blogs/#collection",
        "url": "https://www.grofi.in/blogs",
        "name": "Grofi Financial Insights & Blogs",
        "description":
          "In-depth credit card reward strategies, personal loan guides, CIBIL score optimization blueprints, and smart wealth roadmaps.",
        "publisher": {
          "@type": "Organization",
          "name": "Grofi",
          "url": "https://www.grofi.in",
        },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": blogs.map((post, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://www.grofi.in/blogs/${post.slug}`,
            "name": post.title,
            "description": post.excerpt,
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
        <Navbar />
        <BlogHero totalBlogs={blogs.length} />
        <Suspense
          fallback={
            <div className="min-h-[400px] flex items-center justify-center text-sm text-gray-500 font-montserrat">
              Loading financial insights...
            </div>
          }
        >
          <BlogExplorer initialBlogs={blogs} />
        </Suspense>
        <BlogTrustBanner />
        <Footer />
      </main>
    </>
  );
}