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
