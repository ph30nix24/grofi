// libs/instagram.ts
// Helper to fetch live Instagram reels from Instagram Graph API
// Uses INSTAGRAM_ACCESS_TOKEN from .env.local / process.env

export interface InstagramReel {
  id: string;
  caption?: string;
  media_type: string;
  media_product_type?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
}

const BASE_URL = "https://graph.instagram.com";

function getAccessToken(): string | undefined {
  return process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
}

// Curated high-converting fallback reels from Grofi's verified account
// Ensures zero downtime if Instagram Graph API token is refreshed or rate-limited
export const FALLBACK_REELS: InstagramReel[] = [
  {
    id: "Dd6YkSfB_Hz",
    permalink: "https://www.instagram.com/reel/Dd6YkSfB_Hz/",
    thumbnail_url: "/products/personal-loan.webp",
    caption: "September–October finance updates are everywhere, but not every viral tip is genuine! Here is what you actually need to know about bank rate changes. 💡",
    timestamp: "2026-09-30T12:55:05+0000",
    like_count: 8,
    media_type: "VIDEO",
    media_product_type: "REELS",
  },
  {
    id: "DUKmI3_kTLE",
    permalink: "https://www.instagram.com/reel/DUKmI3_kTLE/",
    thumbnail_url: "/cards/marriott-bonvoy.webp",
    caption: "Physical Gold vs Digi-Gold ✨ Smart investor banein, sirf consumer nahi! Full cost breakdown and tax implications. 🪙",
    timestamp: "2026-09-28T12:00:00+0000",
    like_count: 24,
    media_type: "VIDEO",
    media_product_type: "REELS",
  },
  {
    id: "DdtglDVhZfu",
    permalink: "https://www.instagram.com/reel/DdtglDVhZfu/",
    thumbnail_url: "/products/credit-cards.webp",
    caption: "Closing a credit card? 💳 Don't just request closure and forget about it! Check your credit history length and utilization first.",
    timestamp: "2026-09-25T12:55:06+0000",
    like_count: 6,
    media_type: "VIDEO",
    media_product_type: "REELS",
  },
  {
    id: "DdoW_f4ha3S",
    permalink: "https://www.instagram.com/reel/DdoW_f4ha3S/",
    thumbnail_url: "/cards/sbi-simplysave-rupay.webp",
    caption: "Sent money to the wrong UPI ID? 😭 Don't panic—act quickly and report it with this 3-step banking reversal formula.",
    timestamp: "2026-09-23T12:55:06+0000",
    like_count: 11,
    media_type: "VIDEO",
    media_product_type: "REELS",
  },
  {
    id: "DdlxlgahAum",
    permalink: "https://www.instagram.com/reel/DdlxlgahAum/",
    thumbnail_url: "/products/instant-loan.webp",
    caption: "Your mother is the nominee, so the insurance money will automatically reach her? Watch out for this critical claim mistake! 🛡️",
    timestamp: "2026-09-22T12:50:06+0000",
    like_count: 6,
    media_type: "VIDEO",
    media_product_type: "REELS",
  },
  {
    id: "Dd30SzbByXX",
    permalink: "https://www.instagram.com/reel/Dd30SzbByXX/",
    thumbnail_url: "/products/home-loan.webp",
    caption: "A ₹1 lakh salary doesn't automatically mean financial freedom. 💸 The 50-30-20 rule that actually works in metro cities.",
    timestamp: "2026-09-29T13:00:05+0000",
    like_count: 12,
    media_type: "VIDEO",
    media_product_type: "REELS",
  },
];

export async function getReels(limit: number = 12): Promise<InstagramReel[]> {
  const token = getAccessToken();

  if (!token) {
    console.warn("INSTAGRAM_ACCESS_TOKEN not found, using curated fallback reels.");
    return FALLBACK_REELS;
  }

  try {
    const fields = "id,caption,media_type,media_product_type,thumbnail_url,permalink,timestamp,like_count";
    const url = `${BASE_URL}/me/media?fields=${fields}&limit=50&access_token=${token}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour in Next.js
    });

    if (!res.ok) {
      console.warn(`Instagram API returned status ${res.status}, using fallback.`);
      return FALLBACK_REELS;
    }

    const data = await res.json();
    const allItems: InstagramReel[] = data.data || [];
    const reelsOnly = allItems.filter((item) => item.media_product_type === "REELS");

    if (reelsOnly.length === 0) {
      return FALLBACK_REELS;
    }

    return reelsOnly.slice(0, limit);
  } catch (error) {
    console.error("Error fetching Instagram reels:", error);
    return FALLBACK_REELS;
  }
}
