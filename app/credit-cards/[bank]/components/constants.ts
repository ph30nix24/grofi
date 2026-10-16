import {
  CreditCard as CreditCardIcon,
  Crown,
  Percent,
  Plane,
  Utensils,
  Gift,
  Zap,
  Tag,
  Briefcase,
} from "lucide-react";
import { CardStructure } from "../../components/type";

export const CARDS_PER_PAGE = 6;

// Partner Banks for navigation and branding
export const PARTNER_BANKS = [
  { name: "HDFC Bank", slug: "hdfc-bank", logo: "/partners-logos/hdfc-logo.webp", tag: "SmartBuy Rewards" },
  { name: "SBI Bank", slug: "sbi-bank", logo: "/partners-logos/sbi-logo.webp", tag: "5% Online Cashback" },
  { name: "ICICI Bank", slug: "icici-bank", logo: "/partners-logos/icici-logo.webp", tag: "Amazon Pay & LTF" },
  { name: "AXIS Bank", slug: "axis-bank", logo: "/partners-logos/axis-logo.webp", tag: "Edge Miles & Lounges" },
  { name: "AU Bank", slug: "au-bank", logo: "/partners-logos/au-logo.webp", tag: "Customizable Packs" },
  { name: "IDFC Bank", slug: "idfc-bank", logo: "/partners-logos/idfc-logo.webp", tag: "Lifetime Free & 10X" },
  { name: "INDUSIND Bank", slug: "indusind-bank", logo: "/partners-logos/indusind-logo.webp", tag: "Zero Forex & Dining" },
  { name: "YES Bank", slug: "yes-bank", logo: "/partners-logos/yes-bank-logo.webp", tag: "Metal & Lifestyle" },
  { name: "FEDERAL Bank", slug: "federal-bank", logo: "/partners-logos/federal-logo.webp", tag: "Scapia Travel" },
  { name: "BOB Bank", slug: "bob-bank", logo: "/partners-logos/bob-logo.webp", tag: "RuPay UPI Cards" },
];

// Canonical alias map for issuers with naming variations
const BANK_ALIASES: Record<string, string> = {
  sbi: "sbi-bank",
  "sbi card": "sbi-bank",
  "sbi cards": "sbi-bank",
  "state bank of india": "sbi-bank",
  bob: "bob-bank",
  baroda: "bob-bank",
  "bank of baroda": "bob-bank",
  hdfc: "hdfc-bank",
  icici: "icici-bank",
  axis: "axis-bank",
  idfc: "idfc-bank",
  "idfc first": "idfc-bank",
  "idfc first bank": "idfc-bank",
  indusind: "indusind-bank",
  yes: "yes-bank",
  federal: "federal-bank",
  au: "au-bank",
  "au small finance": "au-bank",
  "au small finance bank": "au-bank",
  hsbc: "hsbc-bank",
  kotak: "kotak-bank",
  "kotak mahindra": "kotak-bank",
  "kotak mahindra bank": "kotak-bank",
  canara: "canara-bank",
  "canara bank": "canara-bank",
  pnb: "pnb-bank",
  "punjab national bank": "pnb-bank",
  union: "union-bank",
  "union bank": "union-bank",
  "union bank of india": "union-bank",
};

// Helper: Convert bank issuer string to canonical URL slug
export function getBankSlug(issuer?: string | null): string {
  if (!issuer) return "other-bank";
  const trimmed = issuer.trim();
  if (!trimmed) return "other-bank";

  const lower = trimmed.toLowerCase();

  // 1. Direct partner match by name or slug
  const matched = PARTNER_BANKS.find(
    (b) => b.name.toLowerCase() === lower || b.slug.toLowerCase() === lower
  );
  if (matched) return matched.slug;

  // 2. Direct alias match
  if (BANK_ALIASES[lower]) {
    return BANK_ALIASES[lower];
  }

  // 3. Fallback: URL-safe kebab slug
  return lower.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Category filter tabs
export const CATEGORY_TABS = [
  { id: "all", label: "All Cards", icon: CreditCardIcon },
  { id: "popular", label: "Popular & Top Rated", icon: Crown },
  { id: "cashback", label: "Cashback & Shopping", icon: Percent },
  { id: "travel", label: "Travel & Airport Lounge", icon: Plane },
  { id: "dining", label: "Dining & Food", icon: Utensils },
  { id: "lifestyle", label: "Lifestyle & Luxury", icon: Gift },
  { id: "upi", label: "UPI & RuPay", icon: Zap },
  { id: "entry-level", label: "Lifetime Free & Entry", icon: Tag },
  { id: "business", label: "Business & Corporate", icon: Briefcase },
];

// Fee filter options
export const FEE_FILTERS = [
  { id: "all", label: "All Annual Fees" },
  { id: "free", label: "Lifetime Free (₹0)" },
  { id: "under1k", label: "Under ₹1,000" },
  { id: "mid", label: "₹1,000 - ₹5,000" },
  { id: "premium", label: "₹5,000+" },
];

// Network filter options
export const NETWORK_FILTERS = [
  { id: "all", label: "All Networks" },
  { id: "visa", label: "Visa" },
  { id: "mastercard", label: "Mastercard" },
  { id: "rupay", label: "RuPay" },
  { id: "diners", label: "Diners Club" },
];

// Numeric fee parser
export function parseFeeNumber(feeStr?: string): number {
  if (!feeStr) return 0;
  if (/nil|free|₹0|zero/i.test(feeStr)) return 0;
  const match = feeStr.replace(/,/g, "").match(/₹?\s*(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Check if card is lifetime free
export function isFreeCard(card: CardStructure): boolean {
  return (
    parseFeeNumber(card.annualFee) === 0 ||
    /nil|free|₹0|zero/i.test(card.annualFee || "") ||
    /lifetime free/i.test(card.badge || "") ||
    /lifetime free/i.test(card.categoryLabel || "")
  );
}

// Pagination page numbers with ellipsis
export function getPageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }

  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
}

// Resolve bank logo from partner banks list or card data
export function getBankLogoUrl(bankSlug: string, bankName: string, fallback?: string): string {
  const matched = PARTNER_BANKS.find(
    (b) => b.slug.toLowerCase() === bankSlug.toLowerCase() || b.name.toLowerCase() === bankName.toLowerCase()
  );
  if (matched) return matched.logo;
  if (fallback) return fallback;
  return "/partners-logos/hdfc-logo.webp";
}
