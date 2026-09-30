"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Tag,
  Zap,
  ShieldCheck,
  Clock,
  Sparkles,
  FileCheck2,
  Plane,
  ChevronDown,
  Search,
  X,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export interface FAQItem {
  id: string;
  category: "eligibility" | "fees" | "rupay" | "rewards" | "billing";
  categoryLabel: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  question: string;
  quickTakeaway: string;
  answer: string[];
  proTip: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: "cibil-score",
    category: "eligibility",
    categoryLabel: "Eligibility & CIBIL",
    icon: TrendingUp,
    iconColor: "text-emerald-700",
    iconBg: "bg-emerald-50 border-emerald-200/60",
    question: "What minimum credit score is needed for credit card approval?",
    quickTakeaway: "720+ for standard cards • 750+ for luxury metal cards",
    answer: [
      "Most leading Indian banks (HDFC, SBI, ICICI, Axis) prefer a CIBIL score of 720 or higher for standard entry-level and cashback cards. For super-premium and metal cards (such as HDFC Infinia or Axis Magnus), banks typically look for 750+ along with specific income criteria.",
      "If you are new to credit (credit score = -1 or 0), you can kickstart your journey with a Fixed-Deposit (FD) backed credit card from banks like IDFC FIRST, Kotak Mahindra, or OneCard. Operating an FD card and paying your statement on time for 6 consecutive months will build a 750+ CIBIL score effortlessly.",
    ],
    proTip:
      "Maintain a credit utilization ratio under 30% of your total assigned limit. Doing so can boost your CIBIL score by 30 to 50 points within just a few billing cycles.",
  },
  {
    id: "lifetime-free",
    category: "fees",
    categoryLabel: "Fees & Charges",
    icon: Tag,
    iconColor: "text-amber-700",
    iconBg: "bg-amber-50 border-amber-200/60",
    question: "What does \"Lifetime Free\" (LTF) credit card mean?",
    quickTakeaway: "₹0 Joining Fee • ₹0 Annual AMC Forever (No spend traps)",
    answer: [
      "A genuine Lifetime Free (LTF) credit card has ₹0 joining fee and ₹0 annual maintenance fee forever, with no minimum annual spend conditions attached. You only pay for what you actually purchase, or interest charges if you carry an unpaid balance.",
      "Beware of the difference between True LTF cards (like Amazon Pay ICICI, ICICI Platinum, and IDFC FIRST cards) and 'Spend-Waived' cards. Spend-waived cards waive annual fees only if you spend ₹1 Lakh to ₹3 Lakhs in the preceding calendar year.",
    ],
    proTip:
      "Keeping a true LTF card open indefinitely is one of the easiest ways to lengthen your average credit history age—a key metric that boosts your credit score long term.",
  },
  {
    id: "rupay-upi",
    category: "rupay",
    categoryLabel: "RuPay & UPI",
    icon: Zap,
    iconColor: "text-blue-700",
    iconBg: "bg-blue-50 border-blue-200/60",
    question: "How does RuPay UPI credit card integration work?",
    quickTakeaway: "Scan any merchant QR • Pay via UPI credit with up to 50 days float",
    answer: [
      "RuPay credit cards can be directly linked to your favorite UPI apps including Google Pay, PhonePe, Paytm, and BHIM. Once linked, you simply scan any merchant QR code to pay using credit rather than debiting your bank balance directly.",
      "You enjoy the same 45–50 days interest-free repayment period and earn reward points on merchant QR spends. Under RBI & NPCI guidelines, RuPay UPI works for all Merchant (P2M) transactions and online checkouts, though peer-to-peer transfers (sending money to friends/family) are not permitted.",
    ],
    proTip:
      "Set your RuPay credit card as your primary UPI payment method for groceries, fuel, dining, and daily retail shops to earn cashback on micro-spends that normally earn zero bank interest.",
  },
  {
    id: "score-impact",
    category: "eligibility",
    categoryLabel: "Eligibility & CIBIL",
    icon: ShieldCheck,
    iconColor: "text-teal-700",
    iconBg: "bg-teal-50 border-teal-200/60",
    question: "Does checking eligibility on Grofi affect my credit score?",
    quickTakeaway: "Zero Impact • 100% Soft Inquiry with 256-bit bank encryption",
    answer: [
      "No. Grofi performs a 'soft inquiry' which has absolutely zero impact on your CIBIL or Experian credit score. Soft checks allow us to pre-screen which cards you have the highest probability of approval for without triggering bank alerts.",
      "In contrast, directly applying across multiple individual bank portals within a short span triggers multiple 'hard inquiries', which can knock 10 to 25 points off your CIBIL score. Grofi protects your profile by filtering cards you qualify for upfront.",
    ],
    proTip:
      "Checking your pre-approved offers on Grofi is 100% free and does not generate unsolicited telemarketing calls or spam.",
  },
  {
    id: "interest-free-period",
    category: "billing",
    categoryLabel: "Billing & Security",
    icon: Clock,
    iconColor: "text-purple-700",
    iconBg: "bg-purple-50 border-purple-200/60",
    question: "How does the 45 to 50 days interest-free credit period work?",
    quickTakeaway: "30-Day Billing Cycle + 15–20 Day Payment Grace Window",
    answer: [
      "The interest-free period begins on the first day of your monthly billing cycle and ends on your payment due date (typically 15 to 20 days after your statement is generated). This gives you between 15 to 50 days of interest-free credit depending on when you make a transaction.",
      "For example, if your statement date is the 1st of every month and payment is due on the 20th: any purchase made on the 2nd will enjoy nearly 50 days before the payment is due. As long as you pay the 'Total Amount Due' in full by the due date, no interest is ever charged.",
    ],
    proTip:
      "Schedule planned high-value purchases (like appliances, flights, or electronics) 1 to 2 days after your monthly statement generation date to unlock the longest possible 50-day repayment float.",
  },
  {
    id: "cashback-vs-rewards",
    category: "rewards",
    categoryLabel: "Rewards & Lounge",
    icon: Sparkles,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-200/60",
    question: "Cashback vs. Reward Points: Which credit card type should you pick?",
    quickTakeaway: "Cashback = Direct statement bill reduction • Points = Maximum flight/hotel luxury value",
    answer: [
      "Cashback cards (such as SBI Cashback, HDFC Swiggy, or Axis Airtel) provide immediate, tangible savings by crediting cash back directly onto your monthly statement. They require zero calculation and carry zero point-expiry risk.",
      "Reward point cards (such as HDFC Infinia, Axis Atlas, or Amex Platinum) shine when points are converted into airline miles (Singapore Airlines, Air India, Vistara) or 5-star hotel programs (Marriott Bonvoy, Accor). Reward cards often provide 8% to 15% net return value for frequent travelers.",
    ],
    proTip:
      "If your total annual card spends are under ₹4–5 Lakhs, stick to high-earning cashback cards. If you spend over ₹6 Lakhs and travel twice a year, premium points cards offer triple the financial value.",
  },
  {
    id: "required-documents",
    category: "eligibility",
    categoryLabel: "Eligibility & CIBIL",
    icon: FileCheck2,
    iconColor: "text-indigo-700",
    iconBg: "bg-indigo-50 border-indigo-200/60",
    question: "What documents are required to apply, and how fast is approval?",
    quickTakeaway: "PAN + Aadhaar (OTP linked) • Instant Video KYC in 5 minutes",
    answer: [
      "For 90% of applicants today, card applications in India are 100% digital and paperless. You only need your PAN card, Aadhaar number (linked to your mobile for OTP verification), and a smartphone for a quick 2-minute Video KYC (V-KYC).",
      "Salaried individuals may occasionally need net banking salary verification or recent 3-month payslips, while self-employed applicants may need their latest ITR summary. Pre-approved cards on Grofi are issued with instant virtual card numbers for immediate online shopping.",
    ],
    proTip:
      "Complete your Video KYC in a well-lit room with your original physical PAN card handy. This enables instant bank verification and speeds up dispatch within 3–4 business days.",
  },
  {
    id: "forex-markup",
    category: "rewards",
    categoryLabel: "Rewards & Lounge",
    icon: Plane,
    iconColor: "text-sky-700",
    iconBg: "bg-sky-50 border-sky-200/60",
    question: "What is Forex Markup fee and which cards have zero forex charge?",
    quickTakeaway: "Zero Forex cards save 3.5% + 18% GST (over ₹4,130 saved per ₹1L spend)",
    answer: [
      "Forex markup is an extra fee charged by card issuers whenever you transact in a foreign currency—whether traveling abroad or purchasing from international websites (like Airbnb, booking flights, or software subscriptions). Standard credit cards charge 3.5% + 18% GST, totaling over 4.13% in hidden fees.",
      "Zero Forex or low Forex cards (such as Scapia Federal, RBL World Safari, IDFC FIRST Wealth, or AU Ixigo) charge 0% to 0.99% markup, saving travelers thousands of rupees on international hotel bookings and retail purchases.",
    ],
    proTip:
      "When swiping your card abroad or at overseas terminals, always choose to be billed in the local currency (USD, EUR, SGD) rather than INR. Selecting INR triggers 'Dynamic Currency Conversion' (DCC), which can sneak in an extra 5% to 7% exchange markup!",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions", count: FAQ_DATA.length },
  { id: "eligibility", label: "Eligibility & CIBIL", count: 3 },
  { id: "fees", label: "Fees & LTF", count: 1 },
  { id: "rupay", label: "RuPay & UPI", count: 1 },
  { id: "rewards", label: "Rewards & Travel", count: 2 },
  { id: "billing", label: "Billing & Security", count: 1 },
];

export default function CreditCardFAQSection({
  onCheckOffers,
}: {
  onCheckOffers?: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "cibil-score": true,
    "lifetime-free": true,
  });
  const [helpfulFeedback, setHelpfulFeedback] = useState<
    Record<string, "yes" | "no">
  >({});

  // Filtered FAQ items
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.question.toLowerCase().includes(q) ||
        item.quickTakeaway.toLowerCase().includes(q) ||
        item.answer.some((line) => line.toLowerCase().includes(q)) ||
        item.proTip.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFAQs.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenItems(allOpen);
  };

  const handleCollapseAll = () => {
    setOpenItems({});
  };

  const handleFeedback = (id: string, type: "yes" | "no") => {
    setHelpfulFeedback((prev) => ({
      ...prev,
      [id]: type,
    }));
  };

  const allExpanded =
    filteredFAQs.length > 0 &&
    filteredFAQs.every((item) => openItems[item.id]);

  return (
    <div className="mt-16 pt-14 border-t border-gray-200/80">
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 font-montserrat shadow-2xs mb-3.5">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
          <span>KNOWLEDGE BASE & EXPERT FAQS</span>
        </div>

        <h3 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Frequently Asked Questions About{" "}
          <span className="text-primary relative inline-block">
            Credit Cards
            <span className="absolute bottom-1 left-0 w-full h-1.5 bg-gold/30 -z-10 rounded-full" />
          </span>
        </h3>

        <p className="text-xs sm:text-base text-gray-600 font-montserrat mt-3 leading-relaxed">
          Everything you need to know before applying in India — from CIBIL requirements and Lifetime Free cards to RuPay UPI integration.
        </p>

        {/* Trust Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-600 font-montserrat">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero CIBIL Impact for Soft Checks</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>100% Free & Transparent Advice</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-2xs">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Updated for 2026 RBI Guidelines</span>
          </div>
        </div>
      </div>

      {/* ── SEARCH & TOPIC BAR ───────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Live Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. CIBIL, RuPay UPI, Lifetime Free)..."
              className="w-full bg-white border border-gray-200 pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm font-montserrat placeholder:text-gray-400 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick expand/collapse control */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            <span className="text-xs text-gray-500 font-montserrat">
              Showing <span className="font-bold text-gray-800">{filteredFAQs.length}</span> question{filteredFAQs.length === 1 ? "" : "s"}
            </span>
            <button
              onClick={allExpanded ? handleCollapseAll : handleExpandAll}
              className="text-xs font-semibold text-primary hover:text-primary/80 font-montserrat px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{allExpanded ? "Collapse All" : "Expand All"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  allExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hidden">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-montserrat whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 shadow-2xs"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── FAQ CARDS ACCORDION ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto">
            <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="font-bricolage font-bold text-gray-800 text-base">
              No matching questions found
            </p>
            <p className="text-xs text-gray-500 font-montserrat mt-1">
              Try searching with another keyword like &quot;CIBIL&quot;, &quot;UPI&quot;, or &quot;Fees&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline font-montserrat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset search & filters
            </button>
          </div>
        ) : (
          filteredFAQs.map((item) => {
            const isOpen = !!openItems[item.id];
            const Icon = item.icon;
            const feedback = helpfulFeedback[item.id];

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all duration-300 shadow-2xs overflow-hidden ${
                  isOpen
                    ? "border-primary/40 ring-2 ring-primary/5 shadow-md"
                    : "border-gray-200/90 hover:border-gray-300 hover:shadow-xs"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-start gap-3.5 sm:gap-4 cursor-pointer select-none group"
                >
                  {/* Topic Icon Container */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105 ${item.iconBg}`}
                  >
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>

                  {/* Question & Summary */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md font-montserrat">
                        {item.categoryLabel}
                      </span>
                      {/* High-value quick takeaway badge */}
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md font-montserrat inline-flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate max-w-[280px] sm:max-w-none">
                          {item.quickTakeaway}
                        </span>
                      </span>
                    </div>

                    <h4 className="font-bricolage font-bold text-base sm:text-lg text-gray-900 group-hover:text-primary transition-colors leading-snug">
                      {item.question}
                    </h4>
                  </div>

                  {/* Toggle Chevron */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-white rotate-180"
                        : "bg-gray-100 text-gray-400 group-hover:text-gray-700 group-hover:bg-gray-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Expandable Content */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 border-t border-gray-100 animate-fadeIn">
                    {/* Detailed Answer Paragraphs */}
                    <div className="space-y-3 pt-3">
                      {item.answer.map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-xs sm:text-sm text-gray-700 font-montserrat leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Pro Tip / Grofi Insider Callout */}
                    <div className="mt-4 bg-[#FEF6E4]/70 border border-amber-300/60 rounded-xl p-3.5 sm:p-4 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-200/60 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                        <Lightbulb className="w-4 h-4 text-amber-800" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-amber-900 font-montserrat mb-0.5">
                          Grofi Insider Tip
                        </p>
                        <p className="text-xs text-amber-950/80 font-montserrat leading-relaxed">
                          {item.proTip}
                        </p>
                      </div>
                    </div>

                    {/* Helpfulness Feedback Row */}
                    <div className="mt-5 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 font-montserrat">
                      <div className="flex items-center gap-2">
                        {feedback ? (
                          <span className="text-emerald-700 font-medium inline-flex items-center gap-1.5 animate-fadeIn">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Thank you for your feedback!
                          </span>
                        ) : (
                          <>
                            <span>Was this explanation helpful?</span>
                            <button
                              onClick={() => handleFeedback(item.id, "yes")}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-[11px] font-semibold cursor-pointer"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              Yes
                            </button>
                            <button
                              onClick={() => handleFeedback(item.id, "no")}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 hover:bg-rose-50 hover:text-rose-700 transition-colors text-[11px] font-semibold cursor-pointer"
                            >
                              <ThumbsDown className="w-3 h-3" />
                              No
                            </button>
                          </>
                        )}
                      </div>

                      {onCheckOffers && (
                        <button
                          onClick={onCheckOffers}
                          className="text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer ml-auto"
                        >
                          Check cards matching this criterion
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── STILL HAVE QUESTIONS CONCIERGE BANNER ─────────────────────── */}
      <div className="max-w-5xl mx-auto mt-12 bg-linear-to-br from-primary via-[#043b40] to-primary text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/20">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-semibold text-gold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Personalized Card Recommendation</span>
          </div>
          <h4 className="font-bricolage font-extrabold text-xl sm:text-2xl text-white">
            Still unsure which credit card is best for you?
          </h4>
          <p className="text-xs sm:text-sm text-white/80 font-montserrat mt-1.5 leading-relaxed">
            Answer 3 quick questions about your monthly spends to unlock your custom pre-approved card offers across 10+ top Indian banks — with zero paperwork and zero score impact.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          {onCheckOffers && (
            <button
              onClick={onCheckOffers}
              className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-montserrat whitespace-nowrap active:scale-[0.98]"
            >
              <span>Check Pre-Approved Cards</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
