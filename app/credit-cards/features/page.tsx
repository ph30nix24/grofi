import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AllBanksFeaturesExplorer from "../components/AllBanksFeaturesExplorer";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Sparkles, CheckCircle2, Zap } from "lucide-react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Bank Credit Card Features & Benefits for Every Bank in India (2026) | Grofi",
  description:
    "Explore credit card features and benefits across all major Indian banks: HDFC, SBI, ICICI, Axis, AU Bank, IDFC FIRST, IndusInd, YES Bank, Federal Bank, and BOB. Compare reward accelerators, lounge access, RuPay UPI, and annual fee waivers.",
  alternates: { canonical: "/credit-cards/features" },
  keywords: [
    "credit card features and benefits",
    "bank credit card benefits",
    "hdfc credit card features",
    "sbi credit card features",
    "icici credit card benefits",
    "axis bank credit card rewards",
    "idfc first lifetime free credit card",
    "best credit card rewards India",
    "airport lounge credit cards",
    "rupay upi credit card benefits",
    "zero forex markup credit card",
  ],
  openGraph: {
    title: "Bank Credit Card Features & Benefits for Every Bank in India | Grofi",
    description:
      "Comprehensive side-by-side comparison of credit card features, reward accelerators, airport lounge access, and lifetime free offers across 10 partner banks.",
    url: "https://www.grofi.in/credit-cards/features",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
};

export const revalidate = 3600;

const BANK_FEATURES_FAQS = [
  {
    q: "Which bank offers the highest reward rate on credit cards in India?",
    a: "HDFC Bank currently offers India's highest reward acceleration on super-premium cards like Infinia Metal and Diners Club Black through the SmartBuy portal, yielding up to 33.3% return (10X points) on flights, hotels, and gift vouchers. Axis Bank also offers top-tier rewards with up to 5:4 air mile conversion ratios on Axis Atlas and Magnus.",
  },
  {
    q: "Which banks offer lifetime free (LTF) credit cards without annual conditions?",
    a: "IDFC FIRST Bank leads the industry by offering 100% unconditional Lifetime Free credit cards across its core lineup (FIRST Classic, Millennia, Select, Wealth) with no minimum spend requirements. ICICI Bank also offers the unconditional lifetime-free Amazon Pay ICICI card, and AU Bank issues lifetime-free upgraded cards through its SwipeUp platform.",
  },
  {
    q: "Which bank credit cards offer zero (0.00%) foreign exchange markup?",
    a: "Federal Bank (via the Scapia Federal Card) and IndusInd Bank (via Pioneer Heritage and Tiger Credit Card) offer 0.00% forex markup on all overseas transactions. AU Bank (Zenith+ at 0.99%) and YES Bank (Marquee at 1.00%) also offer subsidized, ultra-low forex markups.",
  },
  {
    q: "How does RuPay UPI on credit cards work across different banks?",
    a: "All 10 partner banks—including Bank of Baroda, HDFC Bank, ICICI Bank, SBI Card, and AU Bank—support RuPay credit cards that can be linked to Google Pay, PhonePe, Paytm, or BHIM. You can scan any merchant QR code and pay directly using your credit card limit with up to 50 days of interest-free credit float.",
  },
  {
    q: "What are the common airport lounge access rules across banks in 2026?",
    a: "Super-premium cards (HDFC Infinia, Axis Magnus, ICICI Emeralde, YES Marquee) offer unlimited domestic and international lounge access with complimentary guest visits. Entry and mid-tier cards generally require cardholders to meet a quarterly retail spending threshold (typically ₹10,000 to ₹50,000) to unlock lounge visits in the subsequent calendar quarter.",
  },
];

export default function BankFeaturesPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* ── Page Hero Header ────────────────────────────────────────── */}
      <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 md:px-8 bg-linear-to-b from-[#F3F0DF]/80 via-[#F3F0DF]/35 to-white border-b border-[#DDE3C1]/60">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6 font-montserrat">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/credit-cards" className="hover:text-primary transition-colors">
              Credit Cards
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-primary font-bold">Bank Features &amp; Benefits</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-primary/20 shadow-xs mb-4">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-xs font-bold text-primary font-montserrat tracking-wide">
                10 Partner Banks • 200+ Verified Cards
              </span>
            </div>

            <h1 className="font-bricolage font-extrabold text-3xl sm:text-5xl text-primary leading-tight">
              Bank Credit Card <span className="text-gold">Features &amp; Benefits</span> for Every Bank
            </h1>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-montserrat mt-4">
              Discover the unique strengths, proprietary rewards portals, airport lounge access policies, RuPay UPI features, and annual fee waiver rules across every major credit card issuing bank in India.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-600 font-montserrat">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero CIBIL Impact Check</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>100% Unbiased Advisory</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant Video KYC Approvals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Banks Interactive Explorer ──────────────────────────── */}
      <AllBanksFeaturesExplorer />

      {/* ── FAQ Section for Bank Features ───────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto border-t border-gray-200">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>EXPERT ANSWERS</span>
          </div>
          <h2 className="font-bricolage font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-tight">
            Frequently Asked Questions on Bank Features
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-montserrat mt-2">
            Clear insights into reward valuations, lounge access rules, and annual fee waivers across banks.
          </p>
        </div>

        <div className="space-y-4">
          {BANK_FEATURES_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-2xs"
            >
              <h3 className="font-bricolage font-bold text-base text-gray-900 mb-2">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-montserrat leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
