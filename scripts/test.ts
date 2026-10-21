import "dotenv/config";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
});

export interface CardStructure {
  id: string;
  name: string;
  issuer: string;
  logo: string;
  cardImage?: string;
  network: string;
  category: ('all' | 'cashback' | 'travel' | 'lifestyle' | 'upi' | 'business' | 'entry-level' | 'popular' | 'dining')[];
  categoryLabel: string;
  badge: string;
  description: string;
  joiningFee: string;
  annualFee: string;
  feeWaiver: string;
  forexMarkup: string;
  popularRank?: number;
  rewardRate: {
    headline: string;
    base: string;
    accelerated: string;
    rewardCurrency: string;
    pointValue: string;
  };
  loungeAccess: {
    domestic: string;
    international: string;
    spendCondition?: string;
  };
  welcomeBenefits: string[];
  keyHighlights: string[];
  pros: string[];
  cons: string[];
  eligibility: {
    minIncome: string;
    minCreditScore: number;
    employmentType: string;
  };
  bestFor: string;
  editorialVerdict: string;
}


const yesCorrectedCards = [
  {
    "id": "yes-bank-klick-kiwi",
    "name": "YES Bank Klick RuPay Credit Card (via Kiwi)",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-klick-kiwi.webp",
    "network": "RuPay",
    "category": [
      "all",
      "entry-level",
      "upi",
      "popular",
      "cashback"
    ],
    "description": "The YES Bank Klick RuPay Credit Card is a virtual credit solution tailored for the Kiwi fintech platform. Operating on the RuPay network with zero recurring fees, it delivers up to 1.5% cashback on merchant UPI QR code scans, enabling cardholders to convert daily street-side and grocery payments into direct cash savings.",
    "categoryLabel": "Virtual UPI & Daily QR Payments",
    "badge": "Most Used UPI Cashback Card",
    "popularRank": 1,
    "joiningFee": "Nil (Lifetime Free)",
    "annualFee": "Nil (Lifetime Free)",
    "feeWaiver": "Lifetime Free unconditionally",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "0.50% cashback on online payments (non-UPI)",
      "headline": "Up to 1.5% cashback on merchant UPI QR scan & pay transactions",
      "pointValue": "₹1.00",
      "accelerated": "Up to 1.5% flat cashback on merchant UPI scan & pay transactions via the Kiwi app",
      "rewardCurrency": "Kiwi Kiwis / Cashback (Direct bank transfer or statement credit)"
    },
    "loungeAccess": {
      "domestic": "Up to 3 complimentary domestic airport lounge visits per year (via Kiwi Neon subscription tier)",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "₹20,000/month",
      "employmentType": "Salaried, Freelancers, or Young Professionals",
      "minCreditScore": 700
    },
    "welcomeBenefits": [
      "Instant digital card issuance inside Kiwi app with bonus cashback drops on first 3 scan-and-pay transactions."
    ],
    "keyHighlights": [
      "Purpose-built for virtual RuPay credit on UPI integration.",
      "Direct cashback on everyday neighborhood merchant QR scans.",
      "100% Lifetime Free with zero hidden annual maintenance charges."
    ],
    "pros": [
      "Zero annual recurring cost (Lifetime Free).",
      "Direct cashback without catalog point redemption friction.",
      "Instant digital onboarding via video KYC."
    ],
    "cons": [
      "Purely virtual card (no physical plastic card shipped).",
      "P2P (peer-to-peer) fund transfers are excluded from cashback.",
      "Airport lounge access requires active Kiwi Neon tier membership."
    ],
    "bestFor": "Everyday smartphone users looking for a dedicated zero-fee RuPay credit card for daily QR scan-and-pay payments.",
    "editorialVerdict": "YES Bank’s highest-frequency card by daily swipes, making routine merchant UPI payments smooth and rewarding.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-select",
    "name": "YES SELECT Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-select.webp",
    "network": "Visa / Mastercard",
    "category": [
      "all",
      "entry-level",
      "popular",
      "lifestyle",
      "dining"
    ],
    "description": "The foundation of YES Bank’s branch and corporate payroll portfolio, the YES SELECT Credit Card balances everyday shopping rewards with entertainment benefits. It provides double points on online retail, monthly BookMyShow ticket discounts, and domestic airport lounge access with an attainable annual fee waiver.",
    "categoryLabel": "Everyday Shopping & Entertainment",
    "badge": "Most Widely Held Branch Card",
    "popularRank": 2,
    "joiningFee": "₹599 + GST (Frequently issued Lifetime Free during promotional campaigns)",
    "annualFee": "₹599 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹1,00,000 or more",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "4 YES Rewardz Points per ₹200 on offline retail spends (0.5% return)",
      "headline": "8 YES Rewardz Points per ₹200 on online shopping + BOGO movie tickets",
      "pointValue": "₹0.25",
      "accelerated": "8 YES Rewardz Points per ₹200 on online shopping (1.0% return, capped at 5,000 points per statement cycle); 2 points per ₹200 on select categories such as utilities, insurance, education and recharges",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "4 complimentary domestic airport lounge visits per calendar year (1 per quarter)",
      "international": "Not available",
      "spendCondition": "Subject to spending ₹50,000 or more in the previous calendar quarter"
    },
    "eligibility": {
      "minIncome": "₹25,000/month or ITR > ₹7,50,000/year",
      "employmentType": "Salaried or Self-Employed",
      "minCreditScore": 710
    },
    "welcomeBenefits": [
      "Joining fee reversed on spends of ₹10,000 within 30 days of card set-up."
    ],
    "keyHighlights": [
      "Buy 1 Get 1 free movie ticket on BookMyShow (up to ₹250 discount once a month).",
      "1% fuel surcharge waiver on fuel transactions between ₹500 and ₹3,000, up to ₹125 per statement cycle.",
      "Accessible fee waiver threshold at ₹1,00,000 annual spend."
    ],
    "pros": [
      "Widely issued as Lifetime Free (LTF) for corporate salary account holders.",
      "Useful BookMyShow movie BOGO discount (up to ₹3,000 annual savings).",
      "Reward points redeem easily against flight and hotel bookings via YES Rewardz."
    ],
    "cons": [
      "Lounge access requires meeting a ₹50,000 quarterly spend threshold.",
      "Standard 3.50% forex fee.",
      "Base offline reward rate is modest (0.5%)."
    ],
    "bestFor": "First-time applicants and mid-level salaried professionals wanting movie savings, online shopping rewards, and lounge access.",
    "editorialVerdict": "YES Bank’s mass-market foundation; the default card issued across branches and corporate payroll relationships.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-virtual-rupay",
    "name": "YES Bank Virtual RuPay Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-virtual-rupay.webp",
    "network": "RuPay",
    "category": [
      "all",
      "entry-level",
      "upi"
    ],
    "description": "The YES Bank Virtual RuPay Credit Card acts as a digital add-on for existing primary cardholders. Linked directly to the primary account’s credit limit, it enables immediate setup on UPI platforms to turn routine QR code merchant payments into reward points with zero annual charges.",
    "categoryLabel": "Virtual UPI Floater",
    "badge": "Virtual UPI Companion",
    "popularRank": 3,
    "joiningFee": "Nil (Lifetime Free for existing cardholders)",
    "annualFee": "Nil (Lifetime Free)",
    "feeWaiver": "Lifetime Free unconditionally",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "2 YES Rewardz Points per ₹200 on other online spends",
      "headline": "Earn reward points on daily merchant UPI scan & pay transactions",
      "pointValue": "₹0.25",
      "accelerated": "4 YES Rewardz Points per ₹200 on UPI transactions above ₹2,000",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "Not available",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "Existing active YES Bank credit cardholder",
      "employmentType": "Salaried or Self-Employed",
      "minCreditScore": 700
    },
    "welcomeBenefits": [
      "Instant digital card issuance directly inside YES Bank Iris Mobile Banking app."
    ],
    "keyHighlights": [
      "Virtual floater credit card sharing the credit limit of your primary YES Bank card.",
      "Links seamlessly to Google Pay, PhonePe, Paytm, and BHIM for QR payments.",
      "Zero extra physical card fee or recurring maintenance charge."
    ],
    "pros": [
      "Instant digital onboarding with zero physical paperwork.",
      "100% Lifetime Free companion card.",
      "Turns routine street-side grocery and merchant QR scans into reward points."
    ],
    "cons": [
      "Purely virtual card (no physical plastic issued).",
      "Zero airport lounge access.",
      "Requires holding an active primary YES Bank credit card."
    ],
    "bestFor": "Existing YES Bank credit cardholders wanting to link their credit line to UPI apps for daily QR scan payments.",
    "editorialVerdict": "A seamless virtual companion that lets existing YES Bank cardholders spend their credit limit via UPI QR codes at zero cost.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-ace",
    "name": "YES ACE Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-ace.webp",
    "network": "Visa / Mastercard",
    "category": [
      "all",
      "entry-level",
      "popular",
      "lifestyle",
      "dining"
    ],
    "description": "An approachable starter card designed for early-career professionals and students entering the formal credit system. It accelerates rewards on e-commerce transactions and provides an accessible annual fee waiver threshold of just ₹50,000.",
    "categoryLabel": "Digital-First & Everyday Spends",
    "badge": "Budget Online Shopper",
    "popularRank": 4,
    "joiningFee": "₹499 + GST",
    "annualFee": "₹499 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹50,000 or more",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "4 YES Rewardz Points per ₹200 on offline retail spends (0.5% return)",
      "headline": "8 YES Rewardz Points per ₹200 on online shopping with low renewal waiver",
      "pointValue": "₹0.25",
      "accelerated": "8 YES Rewardz Points per ₹200 on e-commerce shopping (1.0% return, capped at 5,000 points per statement cycle); 2 points per ₹200 on select categories such as utilities and insurance",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "Not available",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "₹25,000/month or ITR > ₹7,50,000/year",
      "employmentType": "Salaried or Self-Employed",
      "minCreditScore": 690
    },
    "welcomeBenefits": [
      "Joining fee reversed on spends of ₹5,000 within 30 days of card set-up."
    ],
    "keyHighlights": [
      "Double reward points on all online shopping transactions.",
      "Low annual renewal waiver threshold of just ₹50,000.",
      "1% fuel surcharge waiver on fuel transactions between ₹500 and ₹3,000, up to ₹100 per statement cycle."
    ],
    "pros": [
      "Accessible entry-level eligibility for first-time applicants.",
      "Reward points redeemable for flights, hotels, vouchers and statement credit via YES Rewardz.",
      "Easily achievable annual spend threshold for fee waiver."
    ],
    "cons": [
      "No airport or railway lounge access included.",
      "Modest base rewards on non-online purchases (0.5%).",
      "Standard 3.50% foreign exchange fee."
    ],
    "bestFor": "First-time cardholders and college graduates looking for an affordable online shopping card.",
    "editorialVerdict": "An approachable entry-level card offering double rewards on e-commerce checkouts and a very low annual spend waiver requirement.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-pop-club",
    "name": "POP-CLUB YES Bank RuPay Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-pop-club.webp",
    "network": "RuPay",
    "category": [
      "all",
      "entry-level",
      "upi",
      "cashback",
      "popular"
    ],
    "description": "Developed for the modern digital consumer, this co-branded RuPay credit card earns 10 POPcoins per ₹100 on online spends (marketed as 10% value-back), redeemable on the POP Club app across 500+ partner brands. It also supports merchant UPI QR payments with bonus POPcoins via the POP UPI app.",
    "categoryLabel": "D2C E-Commerce & UPI",
    "badge": "Best for Online D2C Brands",
    "popularRank": 5,
    "joiningFee": "Nil (Lifetime Free under introductory onboarding)",
    "annualFee": "₹399 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹1,50,000 or more",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "2 POPcoins per ₹100 on offline retail transactions",
      "headline": "10 POPcoins per ₹100 on online spends + extra POPcoins on UPI via the POP UPI app",
      "pointValue": "Varies by redemption (POPcoins are redeemed inside the POP Club app)",
      "accelerated": "10 POPcoins per ₹100 on eligible online spends; 7 POPcoins per ₹100 on UPI QR payments via the POP UPI app (2 base + 5 bonus, RuPay variant)",
      "rewardCurrency": "POPcoins"
    },
    "loungeAccess": {
      "domestic": "Not available",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "₹20,000/month",
      "employmentType": "Salaried, Young Professionals, or Freelancers",
      "minCreditScore": 700
    },
    "welcomeBenefits": [
      "Welcome benefits worth up to ₹5,000, including 500 POPcoins and partner vouchers/memberships (e.g., Cleartrip, Zomato Gold, Cult.fit)."
    ],
    "keyHighlights": [
      "10 POPcoins per ₹100 on eligible online spends across any website, plus partner-brand offers in the POP Club app.",
      "RuPay enabled for daily merchant UPI scan-and-pay transactions.",
      "POPcoins are redeemable on the POP Club app and partner brand offers."
    ],
    "pros": [
      "High reward velocity for consumers shopping on modern D2C brand websites.",
      "RuPay network compatibility for fast daily QR scan payments.",
      "Low annual maintenance fee easily waived with moderate shopping."
    ],
    "cons": [
      "POPcoins are redeemable only within the POP Club app ecosystem.",
      "No airport lounge privileges included.",
      "Standard 3.50% foreign exchange fee."
    ],
    "bestFor": "Online shoppers and Gen-Z consumers frequently purchasing apparel, grooming, and coffee from Indian D2C brands.",
    "editorialVerdict": "A modern e-commerce co-brand capturing high daily volume across direct-to-consumer retail sites.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-paisasave",
    "name": "Paisabazaar PaisaSave Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-paisasave.webp",
    "network": "RuPay",
    "category": [
      "all",
      "entry-level",
      "cashback",
      "upi",
      "popular"
    ],
    "description": "Acquired through the Paisabazaar platform, the PaisaSave Credit Card delivers flat 1% unlimited cashback on other spends alongside an accelerated 6% return on dining and travel spends. A virtual RuPay variant is available for UPI payments, and cashback accrues as reward points redeemable against the card statement.",
    "categoryLabel": "E-Commerce Cashback & UPI",
    "badge": "Universal Online Cashback",
    "popularRank": 6,
    "joiningFee": "Nil",
    "annualFee": "₹499 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹1,20,000 or more",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "1% flat unlimited cashback on all other retail spends (2 reward points per ₹200)",
      "headline": "6% cashback on dining & travel (up to ₹3,000 per month) + 1% unlimited cashback on other spends",
      "pointValue": "₹1.00",
      "accelerated": "6% cashback (12 reward points per ₹200) on dining and travel spends, capped at ₹3,000 cashback per month; 1% applies beyond the cap",
      "rewardCurrency": "YES Rewardz Points redeemable as cashback/statement credit (no redemption fee)"
    },
    "loungeAccess": {
      "domestic": "Not available",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "₹25,000/month or ITR > ₹7,50,000/year",
      "employmentType": "Salaried or Self-Employed",
      "minCreditScore": 700
    },
    "welcomeBenefits": [
      "No joining fee; instant virtual RuPay card activation for UPI payments."
    ],
    "keyHighlights": [
      "Cashback redeemable as statement credit with zero redemption fee.",
      "RuPay enabled for merchant scan-and-pay UPI transactions across India.",
      "100% digital onboarding via Paisabazaar mobile app with instant virtual card delivery."
    ],
    "pros": [
      "Combines direct statement cashback with RuPay UPI compatibility.",
      "High 6% accelerated return on dining and travel spends (up to ₹3,000 per month).",
      "No joining fee, with annual fee waived at ₹1,20,000 annual spend."
    ],
    "cons": [
      "Accelerated 6% cashback is capped at ₹3,000 per month.",
      "No airport lounge privileges included.",
      "Excludes wallet loads, rent, and government transactions from cashback."
    ],
    "bestFor": "Everyday online shoppers and foodies wanting direct monthly statement cashback and UPI QR scanning.",
    "editorialVerdict": "A high-volume fintech cashback product that converts everyday dining, travel, and UPI scans into direct cash rebates.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-finbooster",
    "name": "FinBooster YES Bank Credit Card (via BankBazaar)",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-finbooster.webp",
    "network": "Visa / RuPay",
    "category": [
      "all",
      "entry-level",
      "popular",
      "lifestyle"
    ],
    "description": "The FinBooster Credit Card combines credit building with lifestyle spending. Issued in partnership with BankBazaar with zero annual maintenance fees, it bundles a CreditStrong credit-fitness report and real-time credit-score tracking dashboard with 5X reward points on online dining and 3X on online grocery and apparel.",
    "categoryLabel": "Credit Score Tracking & Rewards",
    "badge": "Best for Credit Score Tracking",
    "popularRank": 7,
    "joiningFee": "Nil (Lifetime Free)",
    "annualFee": "Nil (Lifetime Free)",
    "feeWaiver": "Lifetime Free unconditionally on standard digital issuance",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "2 Reward Points per ₹200 on general retail spends except fuel (0.25% return)",
      "headline": "5X points on online dining + 3X on online grocery and apparel with credit fitness tracking",
      "pointValue": "₹0.25",
      "accelerated": "5X Reward Points (10 points per ₹200) on online dining; 3X Reward Points (6 points per ₹200) on online grocery and online apparel",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "Not available",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "₹25,000/month or ITR > ₹7,50,000/year",
      "employmentType": "Salaried or Self-Employed",
      "minCreditScore": 680
    },
    "welcomeBenefits": [
      "Complimentary 1-year CreditStrong subscription (real-time credit-fitness dashboard and a free credit report every 30 days)."
    ],
    "keyHighlights": [
      "Free real-time credit score tracking via BankBazaar's CreditStrong dashboard.",
      "5X points on online dining.",
      "100% Lifetime Free structure with zero annual maintenance fees."
    ],
    "pros": [
      "Lifetime Free card with zero recurring costs.",
      "Includes a CreditStrong credit-score tracking dashboard and free credit reports.",
      "Solid reward acceleration on online dining, grocery and apparel."
    ],
    "cons": [
      "Base retail rewards are low (0.25%).",
      "Zero airport lounge access.",
      "Standard 3.50% foreign exchange markup."
    ],
    "bestFor": "First-time borrowers looking to track, monitor, and improve their credit score while earning dining rewards.",
    "editorialVerdict": "Heavily adopted by first-time borrowers checking their CIBIL score on BankBazaar.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-elite-plus",
    "name": "YES ELITE+ Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-elite-plus.webp",
    "network": "Visa / Mastercard",
    "category": [
      "all",
      "lifestyle",
      "travel",
      "popular",
      "dining"
    ],
    "description": "A well-rounded mid-tier product designed for corporate executives, the YES ELITE+ Credit Card offers 8 domestic and 3 international airport lounge visits annually. It pairs a 25% BookMyShow ticket discount (up to ₹250 a month) with a reduced 3.00% foreign exchange markup.",
    "categoryLabel": "Lifestyle All-Rounder",
    "badge": "Popular Lifestyle Pick",
    "popularRank": 8,
    "joiningFee": "₹999 + GST",
    "annualFee": "₹999 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹2,00,000 or more",
    "forexMarkup": "3.00% + GST",
    "rewardRate": {
      "base": "6 YES Rewardz Points per ₹200 on offline retail spends (0.75% return)",
      "headline": "12 YES Rewardz Points per ₹200 on online shopping + BookMyShow movie discounts",
      "pointValue": "₹0.25",
      "accelerated": "12 YES Rewardz Points per ₹200 on online purchases (1.5% return, capped at 12,000 points per statement cycle); 4 points per ₹200 on select categories such as utilities, insurance and education",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "8 complimentary domestic airport lounge visits per calendar year (2 per quarter)",
      "international": "3 complimentary international lounge visits per calendar year",
      "spendCondition": "Domestic visits subject to spending ₹50,000 in previous calendar quarter"
    },
    "eligibility": {
      "minIncome": "₹1,00,000/month or ITR > ₹9,00,000/year",
      "employmentType": "Salaried or Self-Employed",
      "minCreditScore": 720
    },
    "welcomeBenefits": [
      "Joining fee reversed on spends of ₹20,000 within 30 days of card set-up."
    ],
    "keyHighlights": [
      "25% discount on BookMyShow movie tickets, up to ₹250 per month.",
      "Reduced 3.00% foreign exchange markup (vs 3.50% on entry-level YES cards).",
      "Both domestic and international airport lounge privileges included."
    ],
    "pros": [
      "Up to ₹250 monthly movie ticket savings on BookMyShow (25% off).",
      "Decent 1.5% online shopping reward rate.",
      "Domestic and international airport lounge visits for a ₹999 fee."
    ],
    "cons": [
      "Domestic lounge visits require meeting a ₹50,000 quarterly spend threshold.",
      "Annual fee waiver requires spending ₹2 Lakhs.",
      "Base offline reward rate is average (0.75%)."
    ],
    "bestFor": "Corporate professionals and moviegoers wanting regular BookMyShow discounts and domestic lounge perks.",
    "editorialVerdict": "A solid middle-tier upgrade card widely held by experienced corporate executives.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-uni-rupay",
    "name": "Uni YES Bank RuPay Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-uni-rupay.webp",
    "network": "RuPay",
    "category": [
      "all",
      "entry-level",
      "upi",
      "cashback",
      "popular"
    ],
    "description": "The Uni YES Bank RuPay Credit Card delivers straightforward rewards on modern mobile banking. Operating on the RuPay network with zero recurring fees, it provides flat 1% Uni Coins on eligible card swipes and merchant UPI scans, backed by a zero foreign exchange markup for overseas digital subscriptions.",
    "categoryLabel": "FinTech Rewards & UPI",
    "badge": "1% Flat Digital Return",
    "popularRank": 9,
    "joiningFee": "Nil (Lifetime Free)",
    "annualFee": "Nil (Lifetime Free)",
    "feeWaiver": "Lifetime Free unconditionally",
    "forexMarkup": "0.00% (no foreign currency conversion or DCC charge)",
    "rewardRate": {
      "base": "1% flat return as Uni Coins on all eligible card spends and merchant UPI scans",
      "headline": "Flat 1% Uni Coins on all eligible spends + zero forex markup",
      "pointValue": "₹0.01 per Uni Coin (100 Uni Coins = ₹1), convertible to 24K digital gold or cash in the Uni app",
      "accelerated": "Up to 7% back on flights and select brand vouchers booked via the Uni Store (offers vary)",
      "rewardCurrency": "Uni Coins"
    },
    "loungeAccess": {
      "domestic": "Not available",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "₹20,000/month",
      "employmentType": "Young Salaried Professionals & Freelancers",
      "minCreditScore": 710
    },
    "welcomeBenefits": [
      "Instant digital card issuance inside the Uni app."
    ],
    "keyHighlights": [
      "Zero foreign exchange markup and no DCC charge on international transactions.",
      "100% Lifetime Free on the RuPay payment network.",
      "Transparent Uni Coin value (100 Uni Coins = ₹1) inside the app."
    ],
    "pros": [
      "Zero annual recurring maintenance costs forever (Lifetime Free).",
      "Zero forex markup is remarkably rare for a free entry-level card.",
      "Clean in-app spend tracking and instant cashback redemption."
    ],
    "cons": [
      "No airport or railway lounge access.",
      "P2P fund transfers do not earn Uni Coins.",
      "Customer support is primarily routed through in-app chatbot channels."
    ],
    "bestFor": "Digital natives seeking a clean, zero-fee RuPay card with zero forex fee for app subscriptions and UPI scans.",
    "editorialVerdict": "An uncluttered fintech card that delivers flat 1% returns and a rare zero forex markup on a free card.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-marquee",
    "name": "YES BANK MARQUÉE Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-marquee.webp",
    "network": "Visa Infinite / Mastercard World Elite",
    "category": [
      "all",
      "lifestyle",
      "travel",
      "popular",
      "dining"
    ],
    "description": "The YES BANK MARQUÉE Credit Card is recognized for its top-tier reward rates, delivering a 4.5% return on online transactions (up to 1,00,000 points per statement cycle). Bundled with unlimited international lounge visits, 24 domestic lounge visits, a 1.00% forex fee, and substantial BookMyShow ticket discounts, it is a high-value tool for affluent spenders.",
    "categoryLabel": "Super-Premium Travel & Online Rewards",
    "badge": "Best 4.5% Online Reward Rate",
    "popularRank": 10,
    "joiningFee": "₹9,999 + GST",
    "annualFee": "₹4,999 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹10,00,000 or more",
    "forexMarkup": "1.00% + GST",
    "rewardRate": {
      "base": "18 YES Rewardz Points per ₹200 on offline retail spends (2.25% return)",
      "headline": "4.5% flat reward rate on online spends with low 1% forex markup",
      "pointValue": "₹0.25 (redeemable for flights and hotels on YES Rewardz portal)",
      "accelerated": "36 YES Rewardz Points per ₹200 on online retail spends across eligible merchants (4.5% return, cap of 1,00,000 points per statement cycle); 10 points per ₹200 on utilities",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "24 complimentary domestic airport lounge visits per year (6 per quarter), subject to spending ₹1,00,000 in the previous calendar quarter",
      "international": "Unlimited complimentary international airport lounge visits (no spend condition)"
    },
    "eligibility": {
      "minIncome": "₹3,00,000/month or ITR > ₹36,00,000/year",
      "employmentType": "Salaried, CXOs, or Self-Employed Business Owners",
      "minCreditScore": 750
    },
    "welcomeBenefits": [
      "40,000 YES Rewardz Points (worth up to ₹10,000 on flight bookings) as a welcome benefit.",
      "20,000 renewal bonus points upon annual fee payment."
    ],
    "keyHighlights": [
      "Industry-leading 4.5% flat reward return on online spends without brand restrictions.",
      "Subsidized 1.00% foreign exchange markup on international transactions.",
      "Buy 1 Get 1 free movie tickets on BookMyShow (up to ₹800 discount on the free ticket, up to 3 tickets a month).",
      "Unlimited international airport lounge access + 24 domestic lounge visits per year."
    ],
    "pros": [
      "Unrivaled 4.5% return on online e-commerce, flight portals, and digital spends.",
      "Welcome reward points offset most of the joining fee (worth up to ₹10,000 on flights).",
      "Up to ₹2,400 monthly movie ticket savings on BookMyShow (₹28,800/year potential).",
      "Competitive 1.0% forex markup for overseas trips."
    ],
    "cons": [
      "High joining fee of ₹9,999 + GST.",
      "Restricted customer base due to high salary threshold (₹3L/month).",
      "Excludes government/tax payments, wallet load, rent, fuel, insurance and education from rewards."
    ],
    "bestFor": "High spenders, online shoppers, and international travelers wanting a high 4.5% online reward return and unlimited airport lounges.",
    "editorialVerdict": "Unbeatable in rewards return, but held by an exclusive group of high earners rather than mass consumers.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-reserv",
    "name": "YES RESERV Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-reserv.webp",
    "network": "Mastercard World / Visa Signature",
    "category": [
      "all",
      "travel",
      "lifestyle",
      "popular",
      "dining"
    ],
    "description": "The YES RESERV Credit Card bridges the mid-tier and ultra-luxury segments, offering a 3.0% return on online shopping and flight bookings. Complemented by a 2.00% foreign exchange markup, 18 total airport lounge visits, and complimentary golf green-fee waivers, it caters to regular domestic and overseas vacationers.",
    "categoryLabel": "Premium Travel & Golf",
    "badge": "Popular Premium Travel Pick",
    "popularRank": 11,
    "joiningFee": "₹2,499 + GST (Waived on spending ₹40,000 in first 30 days)",
    "annualFee": "₹2,499 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹3,00,000 or more",
    "forexMarkup": "2.00% + GST",
    "rewardRate": {
      "base": "12 YES Rewardz Points per ₹200 on offline retail (1.5% return)",
      "headline": "3% online reward rate + 2.00% low forex markup and complimentary golf",
      "pointValue": "₹0.25 (redeemable for flights and hotels)",
      "accelerated": "24 YES Rewardz Points per ₹200 on online purchases (3.0% return); 6 points per ₹200 on utility and select categories",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "12 complimentary domestic airport lounge visits per calendar year (3 per quarter)",
      "international": "6 complimentary international airport lounge visits per calendar year",
      "spendCondition": "Domestic visits subject to spending ₹1,00,000 in the previous calendar quarter"
    },
    "eligibility": {
      "minIncome": "₹2,00,000/month or ITR > ₹18,00,000/year",
      "employmentType": "Salaried or Self-Employed",
      "minCreditScore": 740
    },
    "welcomeBenefits": [
      "First-year fee waived on spending ₹40,000 within the first 30 days of card issuance.",
      "Golf program: 4 complimentary green-fee waivers and 1 golf lesson per year at select courses."
    ],
    "keyHighlights": [
      "Subsidized 2.00% foreign exchange markup on cross-border payments.",
      "25% discount on BookMyShow movie tickets, up to ₹250 per transaction.",
      "18 total complimentary domestic and international airport lounge visits annually."
    ],
    "pros": [
      "Strong 3.0% reward return on online shopping and flight bookings.",
      "Low 2.00% forex fee makes it practical for international travel.",
      "First-year fee is waived by spending ₹40,000 in the first month.",
      "Generous allowance of 12 domestic and 6 international airport lounge visits a year."
    ],
    "cons": [
      "Renewal fee waiver requires spending ₹3,00,000 annually.",
      "Points capped on utility spending at 750 points per statement cycle.",
      "Non-travel catalog redemptions yield lower value per point."
    ],
    "bestFor": "Frequent flyers, golfers, and international vacationers looking for low forex fees, airport lounges, and 3% online rewards.",
    "editorialVerdict": "A balanced premium card that hits the sweet spot with a 2.00% forex markup, golf perks, and lounge access.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-essence",
    "name": "YES Essence Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-essence.webp",
    "network": "Visa / Mastercard",
    "category": [
      "all",
      "lifestyle",
      "dining",
      "popular"
    ],
    "description": "Designed specifically for salaried women, the YES Essence Credit Card accelerates points on online fashion, beauty, travel, dining and grocery spends. It bundles an annual preventive health checkup with cancer marker screening, BookMyShow movie offers and domestic airport lounge access.",
    "categoryLabel": "Women's Lifestyle & Wellness",
    "badge": "Best Women's Lifestyle Card",
    "popularRank": 12,
    "joiningFee": "₹799 + GST",
    "annualFee": "₹799 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹1,00,000 or more",
    "forexMarkup": "3.00% + GST",
    "rewardRate": {
      "base": "4 YES Rewardz Points per ₹200 on offline retail spends (0.5% return)",
      "headline": "12 YES Rewardz Points per ₹200 on online fashion, beauty, travel, dining and grocery spends",
      "pointValue": "₹0.25",
      "accelerated": "12 YES Rewardz Points per ₹200 on online spends across fashion, beauty, travel, dining and grocery (1.5% return); 8 points per ₹200 on other online spends (1.0% return)",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "4 complimentary domestic airport lounge visits per calendar year (1 per quarter)",
      "international": "Not available",
      "spendCondition": "Subject to spending ₹25,000 or more in the previous calendar quarter"
    },
    "eligibility": {
      "minIncome": "₹30,000/month",
      "employmentType": "Salaried Women",
      "minCreditScore": 710
    },
    "welcomeBenefits": [
      "Welcome vouchers worth ₹1,000 across fashion, beauty, travel and fitness brands."
    ],
    "keyHighlights": [
      "Accelerated 1.5% value-back on online fashion, beauty, travel, dining and grocery spends.",
      "Annual preventive health checkup with cancer marker screening.",
      "Buy 1 Get 1 movie ticket offer plus complimentary coffee at select mall outlets."
    ],
    "pros": [
      "Tailored reward multipliers covering major fashion, grocery, and cosmetic retailers.",
      "Includes domestic airport lounge access and BookMyShow movie discounts.",
      "Specialized wellness benefits and medical checkup allowances."
    ],
    "cons": [
      "Quarterly spend condition (₹25k) required for airport lounge access.",
      "Annual fee of ₹799 unless spend threshold is reached.",
      "Base retail rewards on generic categories are modest."
    ],
    "bestFor": "Women professionals seeking lifestyle savings on apparel, cosmetics, food delivery, and preventive healthcare.",
    "editorialVerdict": "A practical, women-centric lifestyle card providing accelerated points on fashion and beauty alongside airport lounge perks.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-wellness-plus",
    "name": "YES BANK Wellness Plus Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-wellness-plus.webp",
    "network": "Visa",
    "category": [
      "all",
      "lifestyle",
      "dining"
    ],
    "description": "A health-focused lifestyle card created in collaboration with Aditya Birla Wellness. It provides a 3.75% return on pharmacy, medical diagnostic, and chemist purchases, paired with 12 complimentary fitness sessions a month, a 31-parameter annual preventive health checkup, and domestic airport lounge access.",
    "categoryLabel": "Health & Preventive Wellness",
    "badge": "Best for Gym & Health Checkups",
    "popularRank": 13,
    "joiningFee": "₹1,499 + GST",
    "annualFee": "₹1,499 + GST",
    "feeWaiver": "Not applicable (no spend-based fee waiver)",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "6 YES Rewardz Points per ₹200 on general retail spends (0.75% return)",
      "headline": "30 YES Rewardz Points per ₹200 on pharmacies & chemist stores + gym passes",
      "pointValue": "₹0.25",
      "accelerated": "30 YES Rewardz Points per ₹200 spent at pharmacies, chemist shops, and medical diagnostic centers (3.75% return)",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "8 complimentary domestic airport lounge visits per year (2 per quarter), subject to spending ₹50,000 in the previous calendar quarter",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "₹35,000/month",
      "employmentType": "Salaried or Self-Employed",
      "minCreditScore": 710
    },
    "welcomeBenefits": [
      "Complimentary annual preventive health checkup package (31 parameters) via Aditya Birla Wellness.",
      "Complimentary 12 fitness sessions per month (gym, yoga, Zumba) via the Aditya Birla Multiply app."
    ],
    "keyHighlights": [
      "High 3.75% reward return on all pharmacy, medical, and chemist purchases.",
      "Complimentary annual health screening checkup and monthly fitness session passes.",
      "8 complimentary domestic airport lounge visits per year across India."
    ],
    "pros": [
      "Comprehensive wellness package (health checkups and gym sessions) outweighs the ₹1,499 annual fee.",
      "Industry-leading 3.75% return on medical and chemist store bills.",
      "Domestic airport lounge access included."
    ],
    "cons": [
      "Gym access requires booking slots through partner app networks.",
      "Standard 3.50% forex fee.",
      "Reward points on utility spends are capped at 450 points per statement cycle."
    ],
    "bestFor": "Fitness-conscious professionals and families managing regular medical and pharmacy expenses.",
    "editorialVerdict": "An innovative wellness lifestyle card that delivers gym passes, health checkups, and strong pharmacy savings.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-byoc",
    "name": "YES Bank BYOC (Build Your Own Card)",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-byoc.webp",
    "network": "Visa / Mastercard",
    "category": [
      "all",
      "entry-level",
      "cashback",
      "lifestyle"
    ],
    "description": "YES Bank BYOC introduces modular customization to credit cards. Spenders can choose between a Rewards card (YES Rewardz Points) and a Cashback card, pick 2 to 5 partner merchants (Swiggy, Uber, PharmEasy, BigBasket, BookMyShow) for 10% cashback via an optional subscription plan, and choose a regular, eco-friendly or metal card body.",
    "categoryLabel": "Customizable On-Demand Card",
    "badge": "Build Your Own Card",
    "popularRank": 14,
    "joiningFee": "Nil for the regular card; ₹249 (eco-friendly) or ₹3,499 (metal) one-time card fee + GST",
    "annualFee": "No annual fee; monthly membership of ₹99 + GST (Cashback card) or ₹49 + GST (Rewards card); optional subscription ₹99 / ₹149 / ₹249 per month",
    "feeWaiver": "Not applicable (billed monthly; no spend-based waiver)",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "1% cashback on standard card swipes",
      "headline": "10% cashback on up to 5 partner merchants (Swiggy, Uber, PharmEasy, BigBasket, BookMyShow) with an optional subscription plan",
      "pointValue": "₹1.00",
      "accelerated": "10% cashback at Swiggy, Uber, PharmEasy, BigBasket and BookMyShow, capped at ₹100 per merchant per statement cycle (up to ₹500 per cycle on subscription plans)",
      "rewardCurrency": "Statement Cashback (Cashback card) or YES Rewardz Points (Rewards card)"
    },
    "loungeAccess": {
      "domestic": "1 complimentary domestic airport lounge visit per quarter, subject to spending ₹50,000 in the previous calendar quarter",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "₹25,000/month",
      "employmentType": "Salaried or Self-Employed",
      "minCreditScore": 700
    },
    "welcomeBenefits": [
      "Choice of regular, eco-friendly or metal card body at application."
    ],
    "keyHighlights": [
      "Choose 2, 3 or all 5 partner merchants for 10% cashback through the Silver, Gold or Platinum subscription plan.",
      "Regular, eco-friendly (₹249) or metal (₹3,499) card body options.",
      "Choose between reward points or direct monthly statement cashback."
    ],
    "pros": [
      "Allows picking categories you actually spend on (e.g., 10% on food and rides).",
      "Option to choose direct statement cashback rather than points.",
      "Choice of regular, eco-friendly or metal card body."
    ],
    "cons": [
      "Merchant cashback needs a paid monthly subscription (₹99 / ₹149 / ₹249) on top of the monthly membership fee.",
      "Selected feature packs require active tracking to maintain positive ROI.",
      "Standard 3.50% forex fee applies."
    ],
    "bestFor": "Users who want to customize their cashback categories rather than accepting a standard bank rewards structure.",
    "editorialVerdict": "A flexible, customizable card concept where you pay for the perks and merchant discounts you use most.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-wellness",
    "name": "YES BANK Wellness Credit Card (Standard)",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-wellness.webp",
    "network": "Visa",
    "category": [
      "all",
      "entry-level",
      "lifestyle"
    ],
    "description": "An affordable wellness solution for households managing medical expenditures. At a modest ₹499 annual fee, it delivers a 2.5% return on pharmacy and diagnostic center expenses, backed by a complimentary annual preventive health checkup and 6 fitness sessions a month.",
    "categoryLabel": "Budget Health & Wellness",
    "badge": "Affordable Health Pick",
    "popularRank": 15,
    "joiningFee": "₹499 + GST",
    "annualFee": "₹499 + GST",
    "feeWaiver": "Not applicable (no spend-based fee waiver)",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "4 YES Rewardz Points per ₹200 on general retail spends (0.5% return)",
      "headline": "20 YES Rewardz Points per ₹200 on pharmacies and diagnostic centers",
      "pointValue": "₹0.25",
      "accelerated": "20 YES Rewardz Points per ₹200 on chemist stores, medical diagnostics, and pharmacies (2.5% return)",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "Not available",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "₹25,000/month",
      "employmentType": "Salaried or Self-Employed",
      "minCreditScore": 700
    },
    "welcomeBenefits": [
      "Complimentary annual preventive health checkup package (25 parameters) via Aditya Birla Wellness.",
      "6 complimentary fitness sessions per month via the Aditya Birla Multiply app."
    ],
    "keyHighlights": [
      "2.5% return on medical and chemist store bills.",
      "Complimentary annual health screening and monthly fitness session passes.",
      "1% fuel surcharge waiver on fuel transactions between ₹500 and ₹3,000, up to ₹125 per statement cycle."
    ],
    "pros": [
      "Budget-friendly ₹499 alternative to the ₹1,499 Wellness Plus card.",
      "Free preventive health checkup package covers the annual fee.",
      "Steady 2.5% savings on family medical and pharmacy expenses."
    ],
    "cons": [
      "Zero airport lounge access.",
      "Standard 3.50% foreign exchange markup.",
      "Fitness sessions are limited to 6 per month."
    ],
    "bestFor": "Budget-conscious individuals wanting routine pharmacy savings and basic annual health screening checkups.",
    "editorialVerdict": "An economical wellness card that provides essential medical checkups and reliable 2.5% pharmacy savings for ₹499.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-prosperity-business",
    "name": "YES Prosperity Business Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-prosperity-business.webp",
    "network": "Mastercard / Visa",
    "category": [
      "all",
      "business",
      "entry-level"
    ],
    "description": "Tailored for micro, small, and medium enterprise (MSME) owners and sole proprietors, this commercial card optimizes operational liquidity. It features up to 50 days of interest-free credit for vendor payouts, consolidated MIS statements for GST reconciliation, and domestic airport lounge access.",
    "categoryLabel": "MSME & Business Working Capital",
    "badge": "MSME Expense Manager",
    "popularRank": 16,
    "joiningFee": "₹499 + GST",
    "annualFee": "₹499 + GST",
    "feeWaiver": "Waived on annual business retail spends of ₹1,00,000 or more",
    "forexMarkup": "3.00% + GST",
    "rewardRate": {
      "base": "4 YES Rewardz Points per ₹200 on general commercial spends (0.5% return)",
      "headline": "Accelerated rewards on commercial utilities, office supplies, and telecom",
      "pointValue": "₹0.25",
      "accelerated": "8 YES Rewardz Points per ₹200 on office utilities, supplier logistics, and commercial bills",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "4 complimentary domestic airport lounge visits per calendar year (1 per quarter), subject to spending ₹50,000 in the previous calendar quarter",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "Business ITR > ₹3,50,000/year",
      "employmentType": "Sole Proprietors, Small Traders, or MSME Directors",
      "minCreditScore": 710
    },
    "welcomeBenefits": [
      "Up to 50 days interest-free revolving credit cycle for business working capital management."
    ],
    "keyHighlights": [
      "Consolidated monthly MIS statements formatted for GST input tax credit reconciliation.",
      "4 complimentary domestic airport lounge visits annually for business travel.",
      "1% fuel surcharge waiver on fuel transactions between ₹500 and ₹5,000, up to ₹250 per statement cycle."
    ],
    "pros": [
      "Accessible entry-level commercial card for small business proprietors.",
      "Low annual fee easily waived with moderate commercial utility usage.",
      "Includes domestic airport lounge privileges."
    ],
    "cons": [
      "Requires business entity credentials (GST registration or Udyam certificate).",
      "No international lounge access.",
      "Standard 3.0% forex fee applies to international software purchases."
    ],
    "bestFor": "Small business owners and sole proprietors managing routine office utilities, vendor supplies, and local business travel.",
    "editorialVerdict": "An economical commercial card that gives small business owners flexible short-term liquidity, tax tracking, and airport lounge access.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-first-business",
    "name": "YES First Business Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-first-business.webp",
    "network": "Mastercard World / Visa",
    "category": [
      "all",
      "business",
      "travel",
      "lifestyle"
    ],
    "description": "A premium corporate card designed for founders, entrepreneurs, and established SME directors. It features a reduced 2.00% foreign exchange markup on international SaaS tools and advertising platforms, paired with 14 combined domestic and international airport lounge visits for executive business travel.",
    "categoryLabel": "MSME & Commercial Working Capital",
    "badge": "Best for Business Owners",
    "popularRank": 17,
    "joiningFee": "₹999 + GST",
    "annualFee": "₹999 + GST",
    "feeWaiver": "Waived on annual business spends of ₹3,00,000 or more",
    "forexMarkup": "2.00% + GST",
    "rewardRate": {
      "base": "8 YES Rewardz Points per ₹200 on general commercial spends (1.0% return)",
      "headline": "Accelerated rewards on business travel and dining",
      "pointValue": "₹0.25 (up to ₹0.50 on travel portal bookings)",
      "accelerated": "16 YES Rewardz Points per ₹200 on travel agencies, airlines, hotels and dining (capped at 3,000 points per statement cycle); 4 points per ₹200 on select categories such as utilities and education",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "8 complimentary domestic airport lounge visits per calendar year (2 per quarter), subject to spending ₹75,000 in the previous calendar quarter",
      "international": "6 complimentary international airport lounge visits per calendar year via Priority Pass"
    },
    "eligibility": {
      "minIncome": "Business ITR > ₹6,00,000/year",
      "employmentType": "Sole Proprietors, Partners, or MSME Directors",
      "minCreditScore": 720
    },
    "welcomeBenefits": [
      "Up to 50 days interest-free working capital revolving credit window for commercial operations.",
      "Welcome reward points voucher upon first business transaction."
    ],
    "keyHighlights": [
      "Subsidized 2.00% foreign exchange markup on cross-border SaaS and tech tools.",
      "14 combined domestic and international airport lounge visits annually for business travel.",
      "Detailed commercial accounting MIS statements for simplified GST input credit reconciliation."
    ],
    "pros": [
      "Low 2% forex fee saves on overseas software, servers, and advertising expenses.",
      "Combined domestic and international airport lounge access.",
      "Streamlines business expense tracking and tax documentation."
    ],
    "cons": [
      "Requires business entity documentation (GST registration or Udyam certificate).",
      "Annual renewal fee of ₹999 + GST unless spend threshold is reached.",
      "Select categories (utilities, education, transportation) earn only 4 points per ₹200."
    ],
    "bestFor": "Entrepreneurs, founders, and small business owners managing SaaS subscriptions, supplier payouts, and business travel.",
    "editorialVerdict": "A practical commercial credit card that pairs short-term working capital with travel lounges and a low 2% forex markup.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-prosperity-rewards-plus",
    "name": "YES ACE Credit Card against Fixed Deposit (formerly YES Prosperity Rewards Plus)",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-prosperity-rewards-plus.webp",
    "network": "Mastercard / Visa",
    "category": [
      "all",
      "entry-level",
      "lifestyle"
    ],
    "description": "A secured credit card backed by a YES Bank Fixed Deposit. It needs no income documentation or credit score, assigning roughly 75%–90% of the deposit as a revolving credit limit to help beginners and credit repairers build a CIBIL score.",
    "categoryLabel": "Secured & Credit Builder",
    "badge": "No Income Proof Needed",
    "popularRank": 18,
    "joiningFee": "₹499 + GST",
    "annualFee": "₹499 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹50,000 or more",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "4 YES Rewardz Points per ₹200 on offline retail spends (0.5% return)",
      "headline": "Earn YES Rewardz Points on all spends backed by a YES Bank Fixed Deposit",
      "pointValue": "₹0.25",
      "accelerated": "8 YES Rewardz Points per ₹200 on online shopping (capped at 5,000 points per statement cycle); 2 points per ₹200 on select categories",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "Not available",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "No income verification required (secured against a YES Bank Fixed Deposit)",
      "employmentType": "Students, Freelancers, Homemakers, or New Borrowers",
      "minCreditScore": 0
    },
    "welcomeBenefits": [
      "No income documents or credit score required, since the card is secured by a YES Bank Fixed Deposit."
    ],
    "keyHighlights": [
      "Issued against a YES Bank Fixed Deposit; no income proof or credit score required.",
      "Credit limit assigned at roughly 75%–90% of the underlying Fixed Deposit balance.",
      "Underlying Fixed Deposit continues to earn regular term deposit interest."
    ],
    "pros": [
      "No income proof or credit score needed, so suitable for students, freelancers and credit-score repairers.",
      "Reliable mechanism to establish or rebuild a damaged CIBIL score.",
      "Earn YES Rewardz Points on everyday spends while building credit history."
    ],
    "cons": [
      "Requires locking liquidity in a YES Bank Fixed Deposit (minimum amount varies by card).",
      "Fixed deposit cannot be broken while the credit card is operational.",
      "No airport lounge privileges included."
    ],
    "bestFor": "College students, freelancers, and first-time applicants needing a credit card without income proof.",
    "editorialVerdict": "YES Bank's secured workhorse for credit newcomers, offering easy credit access against a term deposit.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-emi",
    "name": "YES Bank EMI Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-emi.webp",
    "network": "Visa / Mastercard",
    "category": [
      "all",
      "entry-level",
      "lifestyle"
    ],
    "description": "A structured financing card designed to prevent accidental debt accumulation. Eligible retail transactions above a pre-set value are automatically converted into structured installments at a reduced interest rate, without requiring manual requests; a processing fee of up to 1% + GST applies to conversions.",
    "categoryLabel": "Instant Auto-EMI Conversion",
    "badge": "Auto-EMI Specialist",
    "popularRank": 19,
    "joiningFee": "₹499 + GST",
    "annualFee": "₹499 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹1,20,000 or more",
    "forexMarkup": "3.50% + GST",
    "rewardRate": {
      "base": "Reward points on non-EMI retail transactions; EMI-converted transactions earn no points",
      "headline": "Automatic conversion of purchases above a pre-set value into low-interest EMIs",
      "pointValue": "₹0.25",
      "accelerated": "Automated conversion of eligible retail purchases above a pre-set value into EMIs (3 to 12-month tenures) at a reduced interest rate, with a processing fee of up to 1% + GST",
      "rewardCurrency": "YES Rewardz Points"
    },
    "loungeAccess": {
      "domestic": "Not available",
      "international": "Not available"
    },
    "eligibility": {
      "minIncome": "₹25,000/month",
      "employmentType": "Salaried or Self-Employed",
      "minCreditScore": 700
    },
    "welcomeBenefits": [
      "No standard welcome bonus; EMI conversions carry a processing fee of up to 1% + GST."
    ],
    "keyHighlights": [
      "Automatic conversion of purchases above a pre-set value into low-interest monthly installments.",
      "No manual request needed on mobile banking—installment plan triggers automatically.",
      "Reduced interest rate schedule compared to standard revolving credit card APRs."
    ],
    "pros": [
      "Prevents accidental debt traps by spreading big purchases into planned installments.",
      "Low interest rate on EMI conversions compared with standard revolving credit.",
      "Helps manage monthly household budgets when purchasing electronics and furniture."
    ],
    "cons": [
      "Transactions above the pre-set value are auto-converted to EMI rather than billed as a single payment.",
      "Accumulates interest charges on all installment splits.",
      "No airport lounge access included."
    ],
    "bestFor": "Consumers outfitting homes or making regular big-ticket electronics purchases on structured monthly budgets.",
    "editorialVerdict": "A specialized financing card that takes the guesswork out of installment payments by automatically splitting larger purchases into planned EMIs.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-private",
    "name": "YES Private Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-private.webp",
    "network": "Mastercard World Elite",
    "category": [
      "all",
      "lifestyle",
      "travel",
      "dining"
    ],
    "description": "An invitation-only metal card reserved for ultra-high-net-worth clients, business leaders, and family offices. It features unlimited domestic and international airport lounge access with 12 complimentary guest visits a year, 24/7 dedicated private banking support, and Oberoi hotel e-gift vouchers.",
    "categoryLabel": "Ultra-Luxury Private Banking",
    "badge": "By-Invitation Metal UHNI",
    "popularRank": 20,
    "joiningFee": "₹50,000 + GST",
    "annualFee": "₹10,000 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹25,00,000 or more",
    "forexMarkup": "0.50% + GST",
    "rewardRate": {
      "base": "20 YES Rewardz Points per ₹200 on domestic retail spends (2.5% return)",
      "headline": "40 Reward Points per ₹200 on international spends (5% return) with 0.50% forex markup + unlimited global lounges",
      "pointValue": "Up to ₹0.25 per point",
      "accelerated": "40 YES Rewardz Points per ₹200 on international spends (5.0% return); 20 points per ₹200 on domestic spends (2.5% return)",
      "rewardCurrency": "YES Private Points"
    },
    "loungeAccess": {
      "domestic": "Unlimited complimentary domestic airport lounge visits for primary and add-on cardholders (no spend condition); 12 complimentary guest visits per calendar year (domestic and international combined)",
      "international": "Unlimited complimentary international airport lounge visits for primary and add-on cardholders; guest visits count toward the 12 per calendar year"
    },
    "eligibility": {
      "minIncome": "By Invitation Only (Ultra-High-Net-Worth Individuals / TRV > ₹1 Crore)",
      "employmentType": "Billionaires, Business Promoters, Industrialists, and CXOs",
      "minCreditScore": 780
    },
    "welcomeBenefits": [
      "2,00,000 YES Rewardz Points and Oberoi Hotels & Resorts e-gift vouchers worth ₹9,000 on realisation of the joining fee."
    ],
    "keyHighlights": [
      "Hand-crafted engraved metal card body issued strictly by invitation.",
      "Unlimited domestic and international airport lounge access with guest entry allowances.",
      "Dedicated 24/7 private wealth banker and bespoke lifestyle concierge desk."
    ],
    "pros": [
      "Unlimited worldwide airport lounge access with guest privileges included.",
      "High 2.5% domestic and 5% international reward return.",
      "Oberoi hotel e-gift vouchers worth ₹9,000 and complimentary golf rounds."
    ],
    "cons": [
      "Steep joining fee of ₹50,000 + GST.",
      "Available strictly by personal invitation to ultra-high-net-worth clients.",
      "Requires substantial Private Wealth relationship balances with YES Bank."
    ],
    "bestFor": "Ultra-high-net-worth clients requiring unlimited worldwide lounge access with guest entry and private concierge services.",
    "editorialVerdict": "An exclusive metal private banking card with unlimited global guest lounge access, held by a small group of UHNI wealth clients.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  },
  {
    "id": "yes-bank-private-prime",
    "name": "YES Private Prime Credit Card",
    "issuer": "YES Bank",
    "logo": "/partners-logos/yes-bank-logo.webp",
    "cardImage": "/cards/yes-bank-private-prime.webp",
    "network": "Mastercard World Elite",
    "category": [
      "all",
      "lifestyle",
      "travel",
      "dining"
    ],
    "description": "The YES Private Prime Credit Card is the step below YES Bank’s flagship YES Private card, issued by invitation to high-net-worth clients. It features an ultra-low 0.50% foreign exchange markup, up to 5% reward return on international spending, and unlimited airport lounge access with 4 guest visits a year.",
    "categoryLabel": "Ultra-Luxury Private Banking",
    "badge": "0.5% Forex Billionaire Metal",
    "popularRank": 21,
    "joiningFee": "₹20,000 + GST",
    "annualFee": "₹10,000 + GST",
    "feeWaiver": "Waived on annual retail spends of ₹20,00,000 or more",
    "forexMarkup": "0.50% + GST",
    "rewardRate": {
      "base": "20 YES Rewardz Points per ₹200 on domestic retail spends (2.5% return)",
      "headline": "40 Reward Points per ₹200 on international spends with ultra-low 0.50% forex markup",
      "pointValue": "Up to ₹0.25 per point",
      "accelerated": "40 YES Rewardz Points per ₹200 on international transactions (5.0% return)",
      "rewardCurrency": "YES Private Reward Points"
    },
    "loungeAccess": {
      "domestic": "Unlimited complimentary domestic airport lounge visits for primary and add-on cardholders (no spend condition); 4 complimentary guest visits per calendar year (domestic and international combined)",
      "international": "Unlimited complimentary international airport lounge visits for primary and add-on cardholders; guest visits count toward the 4 per calendar year"
    },
    "eligibility": {
      "minIncome": "By Invitation Only (Ultra-High-Net-Worth Individuals / TRV > ₹1 Crore)",
      "employmentType": "Billionaires, Business Promoters, Industrialists, and Family Office Principals",
      "minCreditScore": 780
    },
    "welcomeBenefits": [
      "Oberoi Hotels & Resorts e-gift vouchers worth ₹9,000 on realisation of the joining fee.",
      "Oberoi e-gift vouchers worth ₹9,000 are also provided on realisation of the renewal fee."
    ],
    "keyHighlights": [
      "Ultra-low 0.50% foreign exchange transaction markup on all cross-border transactions.",
      "Hand-crafted metal card body issued strictly by personal invitation.",
      "Unlimited domestic and international airport lounge access with 4 guest visits a year."
    ],
    "pros": [
      "Exceptionally low 0.50% forex markup on a top-tier private banking metal card.",
      "Unlimited worldwide airport lounge access with 4 guest visits a year.",
      "High 5.0% reward return on cross-border transactions."
    ],
    "cons": [
      "Joining fee of ₹20,000 + GST (not waivable) and ₹10,000 + GST annual fee.",
      "Available strictly by invitation to ultra-high-net-worth clients.",
      "Requires substantial Private Wealth relationship balances with YES Bank."
    ],
    "bestFor": "Ultra-high-net-worth global travelers seeking an ultra-low 0.50% forex markup and unlimited worldwide airport lounge comfort.",
    "editorialVerdict": "The more accessible tier of YES Bank’s invitation-only private banking cards, built for global travelers who value a 0.50% forex markup and 5% international rewards.",
    "createdAt": "2026-09-17T11:27:18.578Z",
    "updatedAt": "2026-10-20T10:00:00.000Z"
  }
]

async function main() {
  const cards: CardStructure[] = yesCorrectedCards.map(cards => JSON.parse(JSON.stringify(cards)))

  for (const card of cards as any[]) {
    const { id, createdAt, updatedAt, ...fields } = card;
    await prisma.creditCard.update({
      where: { id },
      data: fields,
    });
  }

  
  console.log("Successful in Updating! ")
}


main()
  .catch(console.error)
  .finally(async () => {
    prisma.$disconnect()
  })
