import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CareersPageClient from "./components/CareersPageClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Careers at Grofi | Hiring BD Executives, Content Creators, Video Editor & HR (Delhi - WFO)",
  description:
    "Join Grofi in Delhi (WFO)! We are actively hiring 10 Business & Development Executives, 5 Content Creators, 1 Video Editor, and 2 HR Executives for our Delhi office. Fast-track 48h application review, high incentives, and growth.",
  alternates: { canonical: "/careers" },
  keywords: [
    "Grofi careers",
    "business development executive jobs Delhi",
    "content creator jobs Delhi",
    "video editor jobs Delhi",
    "HR executive jobs Delhi",
    "Delhi fintech jobs",
    "WFO jobs Delhi",
    "sales executive jobs Delhi NCR",
    "reels creator jobs Delhi",
    "Grofi jobs",
  ],
  openGraph: {
    title: "Careers at Grofi | 18 Open Roles in Delhi (WFO)",
    description:
      "Join Grofi's Delhi office (WFO)! Now hiring 10 BD Executives, 5 Content Creators, 1 Video Editor, and 2 HR Executives. Apply with your PDF resume in under 2 minutes.",
    url: "https://www.grofi.in/careers",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Grofi | 18 Active Openings in Delhi (WFO)",
    description:
      "Join Grofi Delhi! Hiring BD Executives (10), Content Creators (5), Video Editor (1), and HR Executives (2). WFO model with fast-track 48-hour interview turnaround.",
  },
};

export default function CareersPage() {
  // Google Jobs Structured Data
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
            "name": "Careers",
            "item": "https://www.grofi.in/careers",
          },
        ],
      },
      {
        "@type": "JobPosting",
        "title": "Business and Development Executive (10 Openings)",
        "description":
          "Drive corporate tie-ups, retail lending distribution, and customer acquisition for credit cards and loans with uncapped incentives.",
        "identifier": {
          "@type": "PropertyValue",
          "name": "Grofi",
          "value": "bde-10",
        },
        "datePosted": "2026-03-01",
        "validThrough": "2026-12-31",
        "employmentType": "FULL_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Grofi",
          "sameAs": "https://www.grofi.in",
          "logo": "https://www.grofi.in/icon.png",
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Delhi",
            "addressRegion": "Delhi",
            "addressCountry": "IN",
          },
        },
      },
      {
        "@type": "JobPosting",
        "title": "Content Creator (5 Openings)",
        "description":
          "Script, record, and present viral short-form personal finance videos breaking down Indian credit cards and loan hacks.",
        "identifier": {
          "@type": "PropertyValue",
          "name": "Grofi",
          "value": "content-creator-5",
        },
        "datePosted": "2026-03-01",
        "validThrough": "2026-12-31",
        "employmentType": "FULL_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Grofi",
          "sameAs": "https://www.grofi.in",
          "logo": "https://www.grofi.in/icon.png",
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Delhi",
            "addressRegion": "Delhi",
            "addressCountry": "IN",
          },
        },
      },
      {
        "@type": "JobPosting",
        "title": "Video Editor (1 Opening)",
        "description":
          "Edit fast-paced, high-retention Reels, Shorts, and long-form breakdowns using dynamic typography and kinetic motion graphics.",
        "identifier": {
          "@type": "PropertyValue",
          "name": "Grofi",
          "value": "video-editor-1",
        },
        "datePosted": "2026-03-01",
        "validThrough": "2026-12-31",
        "employmentType": "FULL_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Grofi",
          "sameAs": "https://www.grofi.in",
          "logo": "https://www.grofi.in/icon.png",
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Delhi",
            "addressRegion": "Delhi",
            "addressCountry": "IN",
          },
        },
      },
      {
        "@type": "JobPosting",
        "title": "HR Executive (2 Openings)",
        "description":
          "Lead active recruitment pipelines, candidate screening, smooth onboarding, and cultivate Grofi's vibrant workplace culture.",
        "identifier": {
          "@type": "PropertyValue",
          "name": "Grofi",
          "value": "hr-executive-2",
        },
        "datePosted": "2026-03-01",
        "validThrough": "2026-12-31",
        "employmentType": "FULL_TIME",
        "hiringOrganization": {
          "@type": "Organization",
          "name": "Grofi",
          "sameAs": "https://www.grofi.in",
          "logo": "https://www.grofi.in/icon.png",
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Delhi",
            "addressRegion": "Delhi",
            "addressCountry": "IN",
          },
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
        <CareersPageClient />
        <Footer />
      </main>
    </>
  );
}