import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { PARTNER_BANKS } from "@/app/credit-cards/[bank]/components/constants";

// Helper to get bank slug
function getBankSlug(issuer: string): string {
  const matched = PARTNER_BANKS.find(
    (b) => b.name.toLowerCase() === issuer.toLowerCase()
  );
  if (matched) return matched.slug;
  return issuer.toLowerCase().trim().replace(/\s+/g, "-");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim();

    // If query is empty, return popular / trending cards
    if (!q) {
      const topCards = await prisma.creditCard.findMany({
        take: 6,
        orderBy: [
          { popularRank: "asc" },
          { createdAt: "desc" },
        ],
        select: {
          id: true,
          name: true,
          issuer: true,
          cardImage: true,
          logo: true,
          annualFee: true,
          joiningFee: true,
          badge: true,
          categoryLabel: true,
          network: true,
        },
      });

      return NextResponse.json({
        query: "",
        cards: topCards.map((c) => ({
          ...c,
          bankSlug: getBankSlug(c.issuer),
          url: `/credit-cards/${getBankSlug(c.issuer)}/${c.id}`,
        })),
        matchedBanks: [],
        total: topCards.length,
      });
    }

    const lowerQ = q.toLowerCase();

    // 1. Check if query matches any partner bank name or alias
    const matchedBanks = PARTNER_BANKS.filter(
      (b) =>
        b.name.toLowerCase().includes(lowerQ) ||
        b.slug.toLowerCase().includes(lowerQ) ||
        lowerQ.includes(b.name.toLowerCase().replace(" bank", "")) ||
        b.name.toLowerCase().replace(" bank", "").includes(lowerQ)
    );

    // 2. Query credit cards matching card name, issuer, badge, categoryLabel, description, etc.
    const searchFilter = {
      OR: [
        { name: { contains: q, mode: "insensitive" as const } },
        { issuer: { contains: q, mode: "insensitive" as const } },
        { badge: { contains: q, mode: "insensitive" as const } },
        { categoryLabel: { contains: q, mode: "insensitive" as const } },
        { network: { contains: q, mode: "insensitive" as const } },
        { bestFor: { contains: q, mode: "insensitive" as const } },
        { description: { contains: q, mode: "insensitive" as const } },
      ],
    };

    const [rawCards, totalCount] = await Promise.all([
      prisma.creditCard.findMany({
        where: searchFilter,
        take: 8,
        orderBy: [
          { popularRank: "asc" },
          { createdAt: "desc" },
        ],
        select: {
          id: true,
          name: true,
          issuer: true,
          cardImage: true,
          logo: true,
          annualFee: true,
          joiningFee: true,
          badge: true,
          categoryLabel: true,
          network: true,
        },
      }),
      prisma.creditCard.count({
        where: searchFilter,
      }),
    ]);

    const formattedCards = rawCards.map((c) => {
      const bankSlug = getBankSlug(c.issuer);
      return {
        ...c,
        bankSlug,
        url: `/credit-cards/${bankSlug}/${c.id}`,
      };
    });

    return NextResponse.json({
      query: q,
      cards: formattedCards,
      matchedBanks: matchedBanks.map((b) => ({
        name: b.name,
        slug: b.slug,
        logo: b.logo,
        tag: b.tag,
        url: `/credit-cards/${b.slug}`,
      })),
      total: totalCount,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to search credit cards", cards: [], matchedBanks: [], total: 0 },
      { status: 500 }
    );
  }
}
