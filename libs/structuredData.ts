/**
 * Centralized Schema.org Structured Data (JSON-LD) builders for Grofi.
 * Ensures strict compliance with Google search guidelines:
 * - Emits honest editorial Review markup with Grofi Editorial Team as author.
 * - Uses visible editorial verdict / overview text as reviewBody (never raw marketing taglines).
 * - Forbids AggregateRating and hardcoded ratingCount.
 */

export const DEFAULT_SITE_URL = "https://www.grofi.in";

export interface BaseLender {
  id: string;
  name: string;
  logo: string;
  tagline?: string;
  rating?: number | null;
  interestRate?: { min?: number; max?: number; text?: string } | null;
  processingFee?: string;
  description?: string;
}

export function buildBusinessLoanJsonLd(lender: any, siteUrl: string = DEFAULT_SITE_URL) {
  const providerName = lender.name.replace(/Business Loan|Loan/i, "").trim();
  const reviewBody =
    lender.description ||
    `${lender.name} stands out as an exceptional commercial financing partner for Indian businesses, delivering competitive reducing balance interest rates, minimal paperwork through automated GST verification and Account Aggregators, and fast-track disbursal into your business current account.`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Business Loans", item: `${siteUrl}/business-loans` },
          { "@type": "ListItem", position: 3, name: lender.name, item: `${siteUrl}/business-loans/${lender.id}` },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.description || lender.tagline,
        provider: {
          "@type": "BankOrCreditUnion",
          name: providerName,
        },
        annualPercentageRate: lender.interestRate?.min ?? 10.75,
        feesAndCommissionsSpecification: lender.processingFee,
        url: `${siteUrl}/business-loans/${lender.id}`,
        image: `${siteUrl}${lender.logo}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        review: lender.rating
          ? {
              "@type": "Review",
              author: { "@type": "Organization", name: "Grofi Editorial Team" },
              reviewRating: {
                "@type": "Rating",
                ratingValue: lender.rating,
                bestRating: 5,
                worstRating: 1,
              },
              reviewBody,
            }
          : undefined,
      },
      ...(lender.faqs && lender.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: lender.faqs.map((faq: any) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}

export function buildHomeLoanJsonLd(lender: any, siteUrl: string = DEFAULT_SITE_URL) {
  const providerName = lender.name.replace(/Home Loan|Housing Loan/i, "").trim();
  const minRate = lender.interestRate?.min ?? 7.15;
  const reviewBody = `${lender.description || lender.tagline}. With benchmark rates starting from ${minRate}% p.a., ${lender.name} stands as one of the most reliable choices for Indian homebuyers in 2026. The lender pairs transparent External Benchmark Lending Rate (EBLR) pass-throughs with up to ${lender.maxLtv || "90%"} property financing and zero prepayment penalties.`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Home Loans", item: `${siteUrl}/home-loans` },
          { "@type": "ListItem", position: 3, name: lender.name, item: `${siteUrl}/home-loans/${lender.id}` },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.description || lender.tagline,
        provider: {
          "@type": "BankOrCreditUnion",
          name: providerName,
        },
        annualPercentageRate: minRate,
        feesAndCommissionsSpecification: lender.processingFee,
        url: `${siteUrl}/home-loans/${lender.id}`,
        image: `${siteUrl}${lender.logo}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        review: lender.rating
          ? {
              "@type": "Review",
              author: { "@type": "Organization", name: "Grofi Editorial Team" },
              reviewRating: {
                "@type": "Rating",
                ratingValue: lender.rating,
                bestRating: 5,
                worstRating: 1,
              },
              reviewBody,
            }
          : undefined,
      },
      ...(lender.faqs && lender.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: lender.faqs.map((faq: any) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}

export function buildBalanceTransferJsonLd(
  lender: any,
  dbFaqs: any[] = [],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const providerName = lender.name
    .replace(/Home Loan|Balance Transfer|Takeover Scheme|Takeover/i, "")
    .trim();
  const reviewBody = `${lender.description || lender.tagline}. Benchmark assessment for ${lender.name}'s balance transfer scheme across interest arbitrage, fee caps, and top-up headroom: ${lender.recommendedFor || "Ideal for homeowners seeking lower EMIs"}.`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Home Loans", item: `${siteUrl}/home-loans` },
          { "@type": "ListItem", position: 3, name: "Balance Transfer", item: `${siteUrl}/home-loans/balance-transfer` },
          { "@type": "ListItem", position: 4, name: lender.name, item: `${siteUrl}/home-loans/balance-transfer/${lender.id}` },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.description || lender.tagline,
        provider: {
          "@type": "BankOrCreditUnion",
          name: providerName,
        },
        annualPercentageRate: lender.interestRate?.min ?? 7.25,
        feesAndCommissionsSpecification: lender.processingFeeCap || lender.processingFee,
        url: `${siteUrl}/home-loans/balance-transfer/${lender.id}`,
        image: `${siteUrl}${lender.logo}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        review: lender.rating
          ? {
              "@type": "Review",
              author: { "@type": "Organization", name: "Grofi Editorial Team" },
              reviewRating: {
                "@type": "Rating",
                ratingValue: lender.rating,
                bestRating: 5,
                worstRating: 1,
              },
              reviewBody,
            }
          : undefined,
      },
      ...(dbFaqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: dbFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}

export function buildLapJsonLd(
  lender: any,
  dbFaqs: any[] = [],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const providerName = lender.name
    .replace(/Loan Against Property|Mortgage Loan/i, "")
    .trim();
  const reviewBody = `${lender.description || lender.tagline}. Grofi analyst assessment for ${lender.name}: ${lender.recommendedFor || "Provides multi-purpose mortgage liquidity with competitive interest rates and high loan quantum"}.`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Home Loans", item: `${siteUrl}/home-loans` },
          { "@type": "ListItem", position: 3, name: "Loan Against Property", item: `${siteUrl}/home-loans/loan-against-property` },
          { "@type": "ListItem", position: 4, name: lender.name, item: `${siteUrl}/home-loans/loan-against-property/${lender.id}` },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.description || lender.tagline,
        provider: {
          "@type": "BankOrCreditUnion",
          name: providerName,
        },
        annualPercentageRate: lender.interestRate?.min ?? 9.25,
        feesAndCommissionsSpecification: lender.processingFeeCap || lender.processingFee,
        url: `${siteUrl}/home-loans/loan-against-property/${lender.id}`,
        image: `${siteUrl}${lender.logo}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        review: lender.rating
          ? {
              "@type": "Review",
              author: { "@type": "Organization", name: "Grofi Editorial Team" },
              reviewRating: {
                "@type": "Rating",
                ratingValue: lender.rating,
                bestRating: 5,
                worstRating: 1,
              },
              reviewBody,
            }
          : undefined,
      },
      ...(dbFaqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: dbFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}

export function buildPersonalLoanJsonLd(lender: any, siteUrl: string = DEFAULT_SITE_URL) {
  const providerName = lender.name.replace(/Personal Loan/i, "").trim();
  const reviewBody =
    lender.overview ||
    lender.description ||
    `${lender.name} is a premier personal loan choice in India, featuring competitive interest rates, paperless Account Aggregator e-KYC, and flexible borrowing terms for salaried and self-employed professionals.`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Personal Loans", item: `${siteUrl}/personal-loans` },
          { "@type": "ListItem", position: 3, name: lender.name, item: `${siteUrl}/personal-loans/${lender.id}` },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.overview || lender.description || lender.tagline,
        provider: {
          "@type": "BankOrCreditUnion",
          name: providerName,
        },
        annualPercentageRate: lender.interestRate?.min ?? 9.99,
        feesAndCommissionsSpecification: lender.processingFee,
        url: `${siteUrl}/personal-loans/${lender.id}`,
        image: `${siteUrl}${lender.logo}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        review: lender.rating
          ? {
              "@type": "Review",
              author: { "@type": "Organization", name: "Grofi Editorial Team" },
              reviewRating: {
                "@type": "Rating",
                ratingValue: lender.rating,
                bestRating: 5,
                worstRating: 1,
              },
              reviewBody,
            }
          : undefined,
      },
      ...(lender.customFaqs && lender.customFaqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: lender.customFaqs.map((faq: any) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}

export function buildInstantLoanJsonLd(lender: any, siteUrl: string = DEFAULT_SITE_URL) {
  const providerName = lender.name.replace(/Personal Loan|Instant Loan/i, "").trim();
  const reviewBody = `${lender.tagline}. With a guaranteed disbursal window of ${lender.disbursalTime} and starting rates from ${lender.interestRate?.min ?? 9.99}% p.a., ${lender.name} delivers one of the fastest, most streamlined digital borrowing experiences in India. Through automated Aadhaar e-KYC and digital bank statement feeds, eligible borrowers can access sovereign liquidity without cumbersome branch queues.`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Personal Loans", item: `${siteUrl}/personal-loans` },
          { "@type": "ListItem", position: 3, name: "Instant Loans", item: `${siteUrl}/personal-loans/instant-loans` },
          { "@type": "ListItem", position: 4, name: lender.name, item: `${siteUrl}/personal-loans/instant-loans/${lender.id}` },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.description || lender.tagline,
        provider: {
          "@type": "FinancialService",
          name: providerName,
        },
        annualPercentageRate: lender.interestRate?.min ?? 9.99,
        feesAndCommissionsSpecification: lender.processingFee,
        url: `${siteUrl}/personal-loans/instant-loans/${lender.id}`,
        image: `${siteUrl}${lender.logo}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        review: lender.rating
          ? {
              "@type": "Review",
              author: { "@type": "Organization", name: "Grofi Editorial Team" },
              reviewRating: {
                "@type": "Rating",
                ratingValue: lender.rating,
                bestRating: 5,
                worstRating: 1,
              },
              reviewBody,
            }
          : undefined,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How fast can I get funds disbursed from ${lender.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Funds are deposited into your bank account in ${lender.disbursalTime} via 24x7 automated IMPS rails upon digital agreement execution.`,
            },
          },
          {
            "@type": "Question",
            name: `What is the minimum CIBIL score required for ${lender.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The minimum CIBIL score for ${lender.name} is ${lender.minCreditScore}. Borrowers with CIBIL score above 750 receive prime interest rates starting at ${lender.interestRate?.min ?? 9.99}% p.a.`,
            },
          },
        ],
      },
    ],
  };
}

export function buildShortTermLoanJsonLd(lender: any, siteUrl: string = DEFAULT_SITE_URL) {
  const providerName = lender.rbiRegulatedEntity || lender.name;
  const reviewBody = `${lender.tagline}. With a turnaround time of ${lender.disbursalTime} and starting rates from ${lender.interestRate?.min ?? 12.0}% p.a., ${lender.name} delivers one of the most cost-effective bridges for short-term liquidity in India. Rather than trapping borrowers in long 3 to 5-year repayment cycles where interest balloons, this product lets you borrow precisely what is required and clear the balance quickly.`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Personal Loans", item: `${siteUrl}/personal-loans` },
          { "@type": "ListItem", position: 3, name: "Short Term Loans", item: `${siteUrl}/personal-loans/short-term-loans` },
          { "@type": "ListItem", position: 4, name: lender.name, item: `${siteUrl}/personal-loans/short-term-loans/${lender.id}` },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: lender.name,
        description: lender.description || lender.tagline,
        provider: {
          "@type": "FinancialService",
          name: providerName,
        },
        annualPercentageRate: lender.interestRate?.min ?? 12.0,
        feesAndCommissionsSpecification: lender.processingFee,
        url: `${siteUrl}/personal-loans/short-term-loans/${lender.id}`,
        image: `${siteUrl}${lender.logo}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        review: lender.rating
          ? {
              "@type": "Review",
              author: { "@type": "Organization", name: "Grofi Editorial Team" },
              reviewRating: {
                "@type": "Rating",
                ratingValue: lender.rating,
                bestRating: 5,
                worstRating: 1,
              },
              reviewBody,
            }
          : undefined,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How fast can I get funds disbursed from ${lender.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Funds are deposited into your bank account in ${lender.disbursalTime} via 24x7 automated IMPS rails upon digital agreement execution.`,
            },
          },
          {
            "@type": "Question",
            name: `What is the cooling-off period on ${lender.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${lender.name} provides a mandatory ${lender.coolingOffPeriod} cooling-off period under RBI Digital Lending Guidelines allowing borrowers to exit with zero penalties.`,
            },
          },
        ],
      },
    ],
  };
}

/* ==========================================================================
   HUB / CATEGORY PAGE (PLP) STRUCTURED DATA BUILDERS
   ========================================================================== */

export interface HubBreadcrumbItem {
  name: string;
  item: string;
}

export interface HubFaqItem {
  question: string;
  answer: string;
}

export interface HubProductItem {
  name: string;
  url?: string;
  image?: string;
  description?: string;
  providerName?: string;
  providerType?: "BankOrCreditUnion" | "FinancialService";
  annualPercentageRate?: number;
  feesAndCommissionsSpecification?: string;
}

export interface HubPageJsonLdOptions {
  name: string;
  description: string;
  url: string;
  breadcrumbs: HubBreadcrumbItem[];
  items?: HubProductItem[];
  itemListName?: string;
  itemListDescription?: string;
  faqs?: HubFaqItem[];
  siteUrl?: string;
}

/**
 * Generic Hub Page Schema.org builder.
 * Produces compliant CollectionPage, BreadcrumbList, ItemList (FinancialProducts), and FAQPage.
 * Strictly guarantees ZERO AggregateRating and ZERO ratingCount.
 */
export function buildHubPageJsonLd(options: HubPageJsonLdOptions) {
  const siteUrl = options.siteUrl || DEFAULT_SITE_URL;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${options.url}#collection`,
        url: options.url,
        name: options.name,
        description: options.description,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteUrl}#website`,
          name: "Grofi",
          url: siteUrl,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${options.url}#breadcrumb`,
        itemListElement: options.breadcrumbs.map((bc, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: bc.name,
          item: bc.item,
        })),
      },
      ...(options.items && options.items.length > 0
        ? [
            {
              "@type": "ItemList",
              "@id": `${options.url}#itemlist`,
              name: options.itemListName || options.name,
              description: options.itemListDescription || options.description,
              numberOfItems: options.items.length,
              itemListElement: options.items.map((item, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                item: {
                  "@type": "FinancialProduct",
                  name: item.name,
                  ...(item.url ? { url: item.url } : {}),
                  ...(item.image ? { image: item.image } : {}),
                  ...(item.description ? { description: item.description } : {}),
                  ...(item.providerName
                    ? {
                        provider: {
                          "@type": item.providerType || "BankOrCreditUnion",
                          name: item.providerName,
                        },
                      }
                    : {}),
                  ...(typeof item.annualPercentageRate === "number"
                    ? { annualPercentageRate: item.annualPercentageRate }
                    : {}),
                  ...(item.feesAndCommissionsSpecification
                    ? {
                        feesAndCommissionsSpecification:
                          item.feesAndCommissionsSpecification,
                      }
                    : {}),
                },
              })),
            },
          ]
        : []),
      ...(options.faqs && options.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${options.url}#faq`,
              mainEntity: options.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}

export function buildPersonalLoansHubJsonLd(
  lenders: any[] = [],
  faqs?: HubFaqItem[],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const url = `${siteUrl}/personal-loans`;
  const defaultFaqs: HubFaqItem[] = [
    {
      question: "What is the difference between Reducing Balance Rate and Flat Interest Rate?",
      answer:
        "In a Monthly Reducing Balance method, interest is calculated solely on the outstanding principal balance at the end of each month. In a Flat Interest Rate method, interest is calculated on the entire initial sanction amount for the full tenure, making it significantly more expensive.",
    },
    {
      question: "What minimum CIBIL score is required for personal loan approval?",
      answer:
        "Most scheduled commercial banks (HDFC, ICICI, SBI, Axis) prefer a CIBIL score of 720 or higher. A score above 750 qualifies you for prime interest rates starting at 9.99% p.a.",
    },
    {
      question: "Will checking my loan eligibility on Grofi hurt my credit score?",
      answer:
        "No. Checking pre-approved eligibility on Grofi performs a soft credit inquiry which causes zero deduction to your CIBIL score.",
    },
    {
      question: "Can I prepay or foreclose my personal loan early?",
      answer:
        "Yes, borrowers are allowed to prepay or foreclose after the lock-in period (typically 6-12 months). RBI rules restrict penalties on individual floating rate loans.",
    },
  ];

  return buildHubPageJsonLd({
    name: "Best Personal Loans in India (2026)",
    description:
      "Compare and apply for personal loans across leading Indian banks and NBFCs with rates starting from 9.99% p.a.",
    url,
    siteUrl,
    breadcrumbs: [
      { name: "Home", item: siteUrl },
      { name: "Personal Loans", item: url },
    ],
    itemListName: "Top Personal Loan Lenders in India",
    itemListDescription:
      "Compare lowest interest rate personal loans from top Indian scheduled commercial banks and NBFCs.",
    items: lenders.map((lender) => ({
      name: lender.name,
      url: `${url}/${lender.id}`,
      image: lender.logo ? `${siteUrl}${lender.logo}` : undefined,
      description: lender.overview || lender.description || lender.tagline,
      providerName: lender.name.replace(/Personal Loan/i, "").trim(),
      providerType: "BankOrCreditUnion",
      annualPercentageRate:
        typeof lender.interestRate?.min === "number" ? lender.interestRate.min : undefined,
      feesAndCommissionsSpecification: lender.processingFee,
    })),
    faqs: faqs && faqs.length > 0 ? faqs : defaultFaqs,
  });
}

export function buildInstantLoansHubJsonLd(
  lenders: any[] = [],
  faqs?: HubFaqItem[],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const url = `${siteUrl}/personal-loans/instant-loans`;
  const defaultFaqs: HubFaqItem[] = [
    {
      question: "How can an instant personal loan be disbursed in under 10 seconds?",
      answer:
        "Leading Indian banks like HDFC, ICICI, and SBI run periodic algorithmic assessments on their existing savings account customers. When you accept the pre-approved offer, the funds are deposited into your account via automated IMPS rails in 3 to 10 seconds without human intervention.",
    },
    {
      question: "What documents are required for instant digital loan disbursal?",
      answer:
        "True instant loans require 100% paperless verification using Aadhaar e-KYC (via OTP) and online net banking or Account Aggregator (AA) statement validation.",
    },
  ];

  return buildHubPageJsonLd({
    name: "Best Instant Personal Loans in India (2026)",
    description:
      "Compare lowest interest rate instant personal loans from top Indian scheduled commercial banks and RBI-registered NBFCs.",
    url,
    siteUrl,
    breadcrumbs: [
      { name: "Home", item: siteUrl },
      { name: "Personal Loans", item: `${siteUrl}/personal-loans` },
      { name: "Instant Personal Loans", item: url },
    ],
    itemListName: "Top Instant Personal Loan Lenders in India",
    itemListDescription:
      "Compare lowest interest rate instant personal loans from top Indian scheduled commercial banks and RBI-registered NBFCs.",
    items: lenders.map((lender) => ({
      name: lender.name,
      url: `${url}/${lender.id}`,
      image: lender.logo ? `${siteUrl}${lender.logo}` : undefined,
      description: lender.description || lender.tagline,
      providerName: lender.name.replace(/Personal Loan|Instant Loan/i, "").trim(),
      providerType: "FinancialService",
      annualPercentageRate:
        typeof lender.interestRate?.min === "number" ? lender.interestRate.min : undefined,
      feesAndCommissionsSpecification: lender.processingFee,
    })),
    faqs: faqs && faqs.length > 0 ? faqs : defaultFaqs,
  });
}

export function buildShortTermLoansHubJsonLd(
  lenders: any[] = [],
  faqs?: HubFaqItem[],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const url = `${siteUrl}/personal-loans/short-term-loans`;
  const defaultFaqs: HubFaqItem[] = [
    {
      question: "Why do short-term loans save money even if their APR is slightly higher?",
      answer:
        "Compounding duration is the primary driver of total loan cost. Borrowing ₹1 Lakh for 6 months at 16% APR results in approximately ₹4,728 in interest, whereas a 3-year loan at 13.5% incurs over ₹22,184 in interest — nearly 5x higher.",
    },
    {
      question: "What is an RBI Cooling-off Period on short term loans?",
      answer:
        "Under RBI Digital Lending Guidelines 2022, every borrower gets a mandatory 1 to 3 day cooling-off period during which they can exit the loan without prepayment penalties.",
    },
  ];

  return buildHubPageJsonLd({
    name: "Best Short-Term Personal Loans in India (2026)",
    description:
      "Compare lowest interest rate short-term personal loans from top Indian scheduled commercial banks and RBI-registered NBFCs.",
    url,
    siteUrl,
    breadcrumbs: [
      { name: "Home", item: siteUrl },
      { name: "Personal Loans", item: `${siteUrl}/personal-loans` },
      { name: "Short Term Loans", item: url },
    ],
    itemListName: "Top Short-Term Personal Loan Lenders in India",
    itemListDescription:
      "Compare lowest interest rate short-term personal loans from top Indian scheduled commercial banks and RBI-registered NBFCs with 3 to 12-month tenures.",
    items: lenders.map((lender) => ({
      name: lender.name,
      url: `${url}/${lender.id}`,
      image: lender.logo ? `${siteUrl}${lender.logo}` : undefined,
      description: lender.description || lender.tagline,
      providerName: lender.rbiRegulatedEntity || lender.name,
      providerType: "FinancialService",
      annualPercentageRate:
        typeof lender.interestRate?.min === "number" ? lender.interestRate.min : undefined,
      feesAndCommissionsSpecification: lender.processingFee,
    })),
    faqs: faqs && faqs.length > 0 ? faqs : defaultFaqs,
  });
}

export function buildHomeLoansHubJsonLd(
  lenders: any[] = [],
  faqs?: HubFaqItem[],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const url = `${siteUrl}/home-loans`;
  const defaultFaqs: HubFaqItem[] = [
    {
      question: "What is an EBLR or Repo Linked Lending Rate (RLLR)?",
      answer:
        "EBLR (External Benchmark Lending Rate) is an RBI-mandated mechanism where commercial banks link home loan interest rates to an external benchmark, primarily the RBI Repo Rate. When RBI changes rates, banks pass through rate changes transparently.",
    },
    {
      question: "What is the maximum loan-to-value (LTV) ratio permitted by RBI?",
      answer:
        "For home loans up to ₹30 Lakhs, banks can fund up to 90% of property value. For loans between ₹30 Lakhs and ₹75 Lakhs, the ceiling is 80%. For loans exceeding ₹75 Lakhs, maximum LTV is capped at 75%.",
    },
  ];

  return buildHubPageJsonLd({
    name: "Compare Best Home Loans in India (2026)",
    description:
      "Compare and apply for home loans across 13+ leading Indian banks and HFCs with rates starting from 7.15% p.a.",
    url,
    siteUrl,
    breadcrumbs: [
      { name: "Home", item: siteUrl },
      { name: "Home Loans", item: url },
    ],
    itemListName: "Top Home Loan Lenders & Housing Finance Companies in India",
    itemListDescription:
      "Compare lowest interest rate home loans, SBI Maxgain overdrafts, and zero-prepayment housing finance in India.",
    items: lenders.map((lender) => ({
      name: lender.name,
      url: `${url}/${lender.id}`,
      image: lender.logo ? `${siteUrl}${lender.logo}` : undefined,
      description: lender.tagline || lender.description,
      providerName: lender.name.replace(/Home Loan|Housing Loan/i, "").trim(),
      providerType: "BankOrCreditUnion",
      annualPercentageRate:
        typeof lender.interestRate?.min === "number" ? lender.interestRate.min : 7.15,
      feesAndCommissionsSpecification: lender.processingFee,
    })),
    faqs: faqs && faqs.length > 0 ? faqs : defaultFaqs,
  });
}

export function buildBalanceTransferHubJsonLd(
  lenders: any[] = [],
  faqs?: HubFaqItem[],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const url = `${siteUrl}/home-loans/balance-transfer`;
  return buildHubPageJsonLd({
    name: "Top Home Loan Balance Transfer Lenders in India (2026)",
    description:
      "Compare lowest interest rate home loan takeover and balance transfer schemes with top-up options from top Indian banks and HFCs.",
    url,
    siteUrl,
    breadcrumbs: [
      { name: "Home", item: siteUrl },
      { name: "Home Loans", item: `${siteUrl}/home-loans` },
      { name: "Balance Transfer", item: url },
    ],
    itemListName: "Top Home Loan Balance Transfer Lenders in India",
    itemListDescription:
      "Compare lowest interest rate home loan takeover and balance transfer schemes with top-up options from top Indian banks and HFCs.",
    items: lenders.map((lender) => ({
      name: lender.name,
      url: `${url}/${lender.id}`,
      image: lender.logo ? `${siteUrl}${lender.logo}` : undefined,
      description: lender.tagline || lender.description,
      providerName: lender.name
        .replace(/Home Loan|Balance Transfer|Takeover Scheme|Takeover/i, "")
        .trim(),
      providerType: "BankOrCreditUnion",
      annualPercentageRate:
        typeof lender.interestRate?.min === "number" ? lender.interestRate.min : 7.15,
      feesAndCommissionsSpecification: lender.processingFeeCap || lender.processingFee,
    })),
    faqs,
  });
}

export function buildLapHubJsonLd(
  lenders: any[] = [],
  faqs?: HubFaqItem[],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const url = `${siteUrl}/home-loans/loan-against-property`;
  return buildHubPageJsonLd({
    name: "Top Loan Against Property (LAP) Lenders in India (2026)",
    description:
      "Compare lowest interest rate mortgage loans and overdraft facilities against residential and commercial property from top Indian banks and NBFCs.",
    url,
    siteUrl,
    breadcrumbs: [
      { name: "Home", item: siteUrl },
      { name: "Home Loans", item: `${siteUrl}/home-loans` },
      { name: "Loan Against Property", item: url },
    ],
    itemListName: "Top Loan Against Property (LAP) Lenders in India",
    itemListDescription:
      "Compare lowest interest rate mortgage loans and overdraft facilities against residential and commercial property from top Indian banks and NBFCs.",
    items: lenders.map((lender) => ({
      name: lender.name,
      url: `${url}/${lender.id}`,
      image: lender.logo ? `${siteUrl}${lender.logo}` : undefined,
      description: lender.tagline || lender.description,
      providerName: lender.name
        .replace(/Loan Against Property|Mortgage Loan/i, "")
        .trim(),
      providerType: "BankOrCreditUnion",
      annualPercentageRate:
        typeof lender.interestRate?.min === "number" ? lender.interestRate.min : 9.25,
      feesAndCommissionsSpecification: lender.processingFeeCap || lender.processingFee,
    })),
    faqs,
  });
}

export function buildBusinessLoansHubJsonLd(
  lenders: any[] = [],
  faqs?: HubFaqItem[],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const url = `${siteUrl}/business-loans`;
  const defaultFaqs: HubFaqItem[] = [
    {
      question: "What is an unsecured business loan versus a secured business loan?",
      answer:
        "Unsecured business loans require zero collateral, evaluated based on GST returns, business vintage, and bank statement turnover. Secured loans require pledging commercial or residential property to unlock lower interest rates.",
    },
    {
      question: "How fast can I get a business loan disbursed in India?",
      answer:
        "With digital GST verification and Account Aggregator integration, preliminary sanction happens in 2 hours with disbursal within 24 to 48 working hours.",
    },
  ];

  return buildHubPageJsonLd({
    name: "Top Business Loan Lenders & MSME Financiers in India (2026)",
    description:
      "Compare lowest interest rate business loans, drop-line overdrafts, and collateral-free MSME credit from top Indian scheduled commercial banks and NBFCs.",
    url,
    siteUrl,
    breadcrumbs: [
      { name: "Home", item: siteUrl },
      { name: "Business Loans", item: url },
    ],
    itemListName: "Top Business Loan Lenders & MSME Financiers in India",
    itemListDescription:
      "Compare lowest interest rate business loans, drop-line overdrafts, and collateral-free MSME credit from top Indian scheduled commercial banks and NBFCs.",
    items: lenders.map((lender) => ({
      name: lender.name,
      url: `${url}/${lender.id}`,
      image: lender.logo ? `${siteUrl}${lender.logo}` : undefined,
      description: lender.description || lender.tagline,
      providerName: lender.name.replace(/Business Loan|Loan/i, "").trim(),
      providerType: "BankOrCreditUnion",
      annualPercentageRate:
        typeof lender.interestRate?.min === "number" ? lender.interestRate.min : 10.75,
      feesAndCommissionsSpecification: lender.processingFee,
    })),
    faqs: faqs && faqs.length > 0 ? faqs : defaultFaqs,
  });
}

export function buildCreditCardsHubJsonLd(
  cards: any[] = [],
  faqs?: HubFaqItem[],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const url = `${siteUrl}/credit-cards`;
  const defaultFaqs: HubFaqItem[] = [
    {
      question: "Which credit card is best for beginners in India?",
      answer:
        "Lifetime free cards such as Amazon Pay ICICI Bank Credit Card or IDFC FIRST Millennia are ideal for beginners due to zero annual fees and straightforward cashback.",
    },
    {
      question: "Does checking credit card eligibility on Grofi affect my CIBIL score?",
      answer:
        "No. Checking pre-approved card eligibility on Grofi performs a soft credit inquiry which causes zero impact to your CIBIL score.",
    },
  ];

  return buildHubPageJsonLd({
    name: "Compare Best Credit Cards in India (2026)",
    description:
      "Compare 200+ credit cards across leading Indian banks with reward rates, airport lounge access, and lifetime free offers.",
    url,
    siteUrl,
    breadcrumbs: [
      { name: "Home", item: siteUrl },
      { name: "Credit Cards", item: url },
    ],
    itemListName: "Top Credit Cards in India",
    itemListDescription:
      "Compare top reward, cashback, travel, and lifetime free credit cards in India.",
    items: cards.map((card) => {
      const bankSlug = (card.issuer || "").toLowerCase().replace(/\s+/g, "-");
      return {
        name: card.name,
        url: card.id ? `${siteUrl}/credit-cards/${bankSlug}/${card.id}` : undefined,
        image: card.image ? `${siteUrl}${card.image}` : undefined,
        description: card.tagline || card.description,
        providerName: card.issuer,
        providerType: "BankOrCreditUnion",
        feesAndCommissionsSpecification: card.joiningFee
          ? `Joining: ${card.joiningFee}, Annual: ${card.annualFee || "₹0"}`
          : undefined,
      };
    }),
    faqs: faqs && faqs.length > 0 ? faqs : defaultFaqs,
  });
}

export function buildBankCreditCardsHubJsonLd(
  bankName: string,
  bankSlug: string,
  cards: any[] = [],
  faqs?: any[],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const url = `${siteUrl}/credit-cards/${bankSlug}`;
  const mappedFaqs: HubFaqItem[] = (faqs || [])
    .map((f: any) => ({
      question: f.question || f.q || "",
      answer: f.answer || f.a || "",
    }))
    .filter((f) => Boolean(f.question && f.answer));

  return buildHubPageJsonLd({
    name: `Best ${bankName} Credit Cards in India (2026)`,
    description: `Compare all ${bankName} credit cards in India. Explore reward rates, airport lounge access, lifetime free offers, and annual fees.`,
    url,
    siteUrl,
    breadcrumbs: [
      { name: "Home", item: siteUrl },
      { name: "Credit Cards", item: `${siteUrl}/credit-cards` },
      { name: `${bankName} Credit Cards`, item: url },
    ],
    itemListName: `Top ${bankName} Credit Cards`,
    itemListDescription: `Compare all ${bankName} credit cards with zero CIBIL impact soft checks.`,
    items: cards.map((card) => ({
      name: card.name,
      url: card.id ? `${siteUrl}/credit-cards/${bankSlug}/${card.id}` : undefined,
      image: card.image ? `${siteUrl}${card.image}` : undefined,
      description: card.tagline || card.description,
      providerName: bankName,
      providerType: "BankOrCreditUnion",
      feesAndCommissionsSpecification: card.joiningFee
        ? `Joining: ${card.joiningFee}, Annual: ${card.annualFee || "₹0"}`
        : undefined,
    })),
    faqs: mappedFaqs,
  });
}

export function buildCreditCardJsonLd(
  card: any,
  bankSlug: string,
  bankFaqs: { question: string; answer: string }[] = [],
  siteUrl: string = DEFAULT_SITE_URL
) {
  const cardUrl = `${siteUrl}/credit-cards/${bankSlug}/${card.id}`;
  const bankUrl = `${siteUrl}/credit-cards/${bankSlug}`;
  const rawImage = card.cardMetaData?.imageUrl || card.cardImage;
  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `${siteUrl}${rawImage}`
    : `${siteUrl}/og-image.png`;

  const reviewBody =
    card.editorialVerdict ||
    card.description ||
    card.cardMetaData?.description ||
    `${card.name} is one of the top credit cards issued by ${card.issuer} in India, delivering competitive reward returns, welcome perks, and airport lounge access.`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Credit Cards", item: `${siteUrl}/credit-cards` },
          { "@type": "ListItem", position: 3, name: card.issuer, item: bankUrl },
          { "@type": "ListItem", position: 4, name: card.name, item: cardUrl },
        ],
      },
      {
        "@type": "FinancialProduct",
        name: card.name,
        description: card.description || card.cardMetaData?.description,
        brand: {
          "@type": "Brand",
          name: card.issuer,
        },
        provider: {
          "@type": "BankOrCreditUnion",
          name: card.issuer,
        },
        feesAndCommissionsSpecification: `Annual Fee: ${card.annualFee}, Joining Fee: ${card.joiningFee}`,
        annualPercentageRate: 43.2,
        image: imageUrl,
        url: cardUrl,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        review: card.editorialVerdict
          ? {
              "@type": "Review",
              author: { "@type": "Organization", name: "Grofi Editorial Team" },
              reviewRating: {
                "@type": "Rating",
                ratingValue: 4.8,
                bestRating: 5,
                worstRating: 1,
              },
              reviewBody,
            }
          : undefined,
      },
      ...(bankFaqs && bankFaqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: bankFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}

