import type { MetadataRoute } from "next";
import prisma from "@/libs/db";
import { PARTNER_BANKS } from "./credit-cards/[bank]/components/constants";
import { cardsData } from "@/app/utils/index";

const BASE_URL = "https://www.grofi.in";

// Helper: Convert issuer name to canonical URL slug
function getBankSlug(issuer: string): string {
  const matched = PARTNER_BANKS.find(
    (b) => b.name.toLowerCase() === issuer.toLowerCase()
  );
  if (matched) return matched.slug;
  return issuer.toLowerCase().trim().replace(/\s+/g, "-");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. Core High-Priority Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/credit-cards`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/credit-cards/features`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // 2. Bank Pages (/credit-cards/[bank])
  // Start with curated partner banks
  const bankSlugsSet = new Set<string>(PARTNER_BANKS.map((b) => b.slug));

  // Query database for cards and any additional issuers
  let dbCards: { id: string; issuer: string; updatedAt: Date }[] = [];

  try {
    const rawCards = await prisma.creditCard.findMany({
      select: {
        id: true,
        issuer: true,
        updatedAt: true,
      },
    });

    if (rawCards && rawCards.length > 0) {
      dbCards = rawCards;
      // Add any distinct issuers found in DB
      rawCards.forEach((c) => {
        if (c.issuer) {
          bankSlugsSet.add(getBankSlug(c.issuer));
        }
      });
    }
  } catch (error) {
    console.warn("Sitemap: Database query failed, using fallback dataset:", error);
  }

  const bankRoutes: MetadataRoute.Sitemap = Array.from(bankSlugsSet).map((slug) => ({
    url: `${BASE_URL}/credit-cards/${slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  // 3. Individual Card Pages (/credit-cards/[bank]/[card])
  let cardRoutes: MetadataRoute.Sitemap = [];

  if (dbCards.length > 0) {
    cardRoutes = dbCards.map((card) => {
      const bankSlug = getBankSlug(card.issuer);
      return {
        url: `${BASE_URL}/credit-cards/${bankSlug}/${card.id}`,
        lastModified: card.updatedAt || now,
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });
  } else {
    // Fallback: Populate from cardsData in app/utils/index.ts
    cardRoutes = cardsData.map((card) => {
      const bankSlug = getBankSlug(card.bank);
      return {
        url: `${BASE_URL}/credit-cards/${bankSlug}/${card.id}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });
  }

  return [...staticRoutes, ...bankRoutes, ...cardRoutes];
}