import type { MetadataRoute } from "next";
import prisma from "@/libs/db";
import { getBankSlug } from "./credit-cards/[bank]/components/constants";

const BASE_URL = "https://www.grofi.in";
// Fixed release timestamp for purely static pages or missing timestamps (avoids changing new Date() on every crawl)
const STATIC_FALLBACK_DATE = new Date("2026-10-10T00:00:00.000Z");

// Helper: Safely calculate the latest date from a list of timestamps
function getLatestDate(
  dates: (Date | undefined | null)[],
  fallback: Date = STATIC_FALLBACK_DATE
): Date {
  const valid = dates.filter(
    (d): d is Date => d instanceof Date && !isNaN(d.getTime())
  );
  if (valid.length === 0) return fallback;
  return new Date(Math.max(...valid.map((d) => d.getTime())));
}

// Revalidate sitemap every hour so new blog slugs appear automatically without manual redeployment
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Query all product and content tables in parallel with graceful error handling
  const [
    cardsResult,
    personalLoansResult,
    instantLoansResult,
    shortTermLoansResult,
    homeLoansResult,
    balanceTransferResult,
    lapResult,
    businessLoansResult,
    blogsResult,
  ] = await Promise.allSettled([
    prisma.creditCard.findMany({
      select: { id: true, issuer: true, updatedAt: true },
    }),
    prisma.personalLoanLender.findMany({
      select: { id: true, updatedAt: true },
    }),
    prisma.instantLoansData.findMany({
      select: { id: true, updatedAt: true },
    }),
    prisma.shortTermLoan.findMany({
      select: { id: true, updatedAt: true },
    }),
    prisma.homeLoanData.findMany({
      select: { id: true, updatedAt: true },
    }),
    prisma.loanTransfer.findMany({
      select: { id: true, updatedAt: true },
    }),
    prisma.loanAgainstProperty.findMany({
      select: { id: true, updatedAt: true },
    }),
    prisma.businessLoanData.findMany({
      select: { id: true, updatedAt: true },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const results = [
    { name: "cards", res: cardsResult },
    { name: "personalLoans", res: personalLoansResult },
    { name: "instantLoans", res: instantLoansResult },
    { name: "shortTermLoans", res: shortTermLoansResult },
    { name: "homeLoans", res: homeLoansResult },
    { name: "balanceTransfers", res: balanceTransferResult },
    { name: "lapLoans", res: lapResult },
    { name: "businessLoans", res: businessLoansResult },
    { name: "blogs", res: blogsResult },
  ];
  for (const { name, res } of results) {
    if (res.status === "rejected") {
      console.error(`Sitemap: Query failed for ${name}:`, res.reason);
    }
  }

  const cards = cardsResult.status === "fulfilled" ? cardsResult.value : [];
  const personalLoans =
    personalLoansResult.status === "fulfilled" ? personalLoansResult.value : [];
  const instantLoans =
    instantLoansResult.status === "fulfilled" ? instantLoansResult.value : [];
  const shortTermLoans =
    shortTermLoansResult.status === "fulfilled" ? shortTermLoansResult.value : [];
  const homeLoans =
    homeLoansResult.status === "fulfilled" ? homeLoansResult.value : [];
  const balanceTransfers =
    balanceTransferResult.status === "fulfilled"
      ? balanceTransferResult.value
      : [];
  const lapLoans = lapResult.status === "fulfilled" ? lapResult.value : [];
  const businessLoans =
    businessLoansResult.status === "fulfilled" ? businessLoansResult.value : [];
  const blogs = blogsResult.status === "fulfilled" ? blogsResult.value : [];

  // Compute category-specific latest modification dates
  const cardsLastMod = getLatestDate(cards.map((c) => c.updatedAt));
  const personalLoansLastMod = getLatestDate(personalLoans.map((p) => p.updatedAt));
  const instantLoansLastMod = getLatestDate(instantLoans.map((i) => i.updatedAt));
  const shortTermLoansLastMod = getLatestDate(shortTermLoans.map((s) => s.updatedAt));
  const homeLoansLastMod = getLatestDate(homeLoans.map((h) => h.updatedAt));
  const balanceTransfersLastMod = getLatestDate(
    balanceTransfers.map((b) => b.updatedAt)
  );
  const lapLoansLastMod = getLatestDate(lapLoans.map((l) => l.updatedAt));
  const businessLoansLastMod = getLatestDate(businessLoans.map((b) => b.updatedAt));
  const blogsLastMod = getLatestDate(blogs.map((b) => b.updatedAt));

  // Global site latest modification date for the homepage
  const siteLastMod = getLatestDate([
    cardsLastMod,
    personalLoansLastMod,
    instantLoansLastMod,
    shortTermLoansLastMod,
    homeLoansLastMod,
    balanceTransfersLastMod,
    lapLoansLastMod,
    businessLoansLastMod,
    blogsLastMod,
  ]);

  // 1. Core Category Hubs and Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: siteLastMod,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/credit-cards`,
      lastModified: cardsLastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/credit-cards/features`,
      lastModified: STATIC_FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/personal-loans`,
      lastModified: personalLoansLastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/personal-loans/instant-loans`,
      lastModified: instantLoansLastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/personal-loans/short-term-loans`,
      lastModified: shortTermLoansLastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/home-loans`,
      lastModified: homeLoansLastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/home-loans/balance-transfer`,
      lastModified: balanceTransfersLastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/home-loans/loan-against-property`,
      lastModified: lapLoansLastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/business-loans`,
      lastModified: businessLoansLastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: blogsLastMod,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: STATIC_FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/secure-with-us`,
      lastModified: STATIC_FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: STATIC_FALLBACK_DATE,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // 2. Bank Category Pages (/credit-cards/[bank])
  const bankSlugsSet = new Set<string>();
  cards.forEach((c) => c.issuer && bankSlugsSet.add(getBankSlug(c.issuer)));

  const bankRoutes: MetadataRoute.Sitemap = Array.from(bankSlugsSet).map((slug) => {
    const bankCards = cards.filter(
      (c) => getBankSlug(c.issuer).toLowerCase() === slug.toLowerCase()
    );
    const bankLastMod = getLatestDate(
      bankCards.map((c) => c.updatedAt),
      cardsLastMod
    );
    return {
      url: `${BASE_URL}/credit-cards/${slug}`,
      lastModified: bankLastMod,
      changeFrequency: "weekly",
      priority: 0.85,
    };
  });

  // 3. Individual Credit Cards (/credit-cards/[bank]/[card])
  const cardRoutes: MetadataRoute.Sitemap = cards.map((card) => ({
    url: `${BASE_URL}/credit-cards/${getBankSlug(card.issuer)}/${card.id}`,
    lastModified: card.updatedAt || STATIC_FALLBACK_DATE,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4. Individual Personal Loans (/personal-loans/[loan])
  const personalLoanRoutes: MetadataRoute.Sitemap = personalLoans.map((loan) => ({
    url: `${BASE_URL}/personal-loans/${loan.id}`,
    lastModified: loan.updatedAt || STATIC_FALLBACK_DATE,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 5. Individual Instant Loans (/personal-loans/instant-loans/[loan])
  const instantLoanRoutes: MetadataRoute.Sitemap = instantLoans.map((loan) => ({
    url: `${BASE_URL}/personal-loans/instant-loans/${loan.id}`,
    lastModified: loan.updatedAt || STATIC_FALLBACK_DATE,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 6. Individual Short-Term Loans (/personal-loans/short-term-loans/[loan])
  const shortTermLoanRoutes: MetadataRoute.Sitemap = shortTermLoans.map((loan) => ({
    url: `${BASE_URL}/personal-loans/short-term-loans/${loan.id}`,
    lastModified: loan.updatedAt || STATIC_FALLBACK_DATE,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 7. Individual Home Loans (/home-loans/[loan])
  const homeLoanRoutes: MetadataRoute.Sitemap = homeLoans.map((loan) => ({
    url: `${BASE_URL}/home-loans/${loan.id}`,
    lastModified: loan.updatedAt || STATIC_FALLBACK_DATE,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 8. Individual Balance Transfer Loans (/home-loans/balance-transfer/[loan])
  const balanceTransferRoutes: MetadataRoute.Sitemap = balanceTransfers.map((loan) => ({
    url: `${BASE_URL}/home-loans/balance-transfer/${loan.id}`,
    lastModified: loan.updatedAt || STATIC_FALLBACK_DATE,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 9. Individual LAP Loans (/home-loans/loan-against-property/[loan])
  const lapRoutes: MetadataRoute.Sitemap = lapLoans.map((loan) => ({
    url: `${BASE_URL}/home-loans/loan-against-property/${loan.id}`,
    lastModified: loan.updatedAt || STATIC_FALLBACK_DATE,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 10. Individual Business Loans (/business-loans/[loan])
  const businessLoanRoutes: MetadataRoute.Sitemap = businessLoans.map((loan) => ({
    url: `${BASE_URL}/business-loans/${loan.id}`,
    lastModified: loan.updatedAt || STATIC_FALLBACK_DATE,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 11. Individual Published Blog Posts (/blogs/[slug])
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${BASE_URL}/blogs/${post.slug}`,
    lastModified: post.updatedAt || STATIC_FALLBACK_DATE,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...bankRoutes,
    ...cardRoutes,
    ...personalLoanRoutes,
    ...instantLoanRoutes,
    ...shortTermLoanRoutes,
    ...homeLoanRoutes,
    ...balanceTransferRoutes,
    ...lapRoutes,
    ...businessLoanRoutes,
    ...blogRoutes,
  ];
}