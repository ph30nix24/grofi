import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  buildBusinessLoanJsonLd,
  buildHomeLoanJsonLd,
  buildBalanceTransferJsonLd,
  buildLapJsonLd,
  buildPersonalLoanJsonLd,
  buildInstantLoanJsonLd,
  buildShortTermLoanJsonLd,
  buildHubPageJsonLd,
  buildPersonalLoansHubJsonLd,
  buildInstantLoansHubJsonLd,
  buildShortTermLoansHubJsonLd,
  buildHomeLoansHubJsonLd,
  buildBalanceTransferHubJsonLd,
  buildLapHubJsonLd,
  buildBusinessLoansHubJsonLd,
  buildCreditCardsHubJsonLd,
  buildBankCreditCardsHubJsonLd,
  buildCreditCardJsonLd,
} from "../libs/structuredData";

const mockLender = {
  id: "hdfc-bank",
  name: "HDFC Bank Personal Loan",
  logo: "/partners-logos/hdfc.png",
  tagline: "Instant 10-second disbursal for pre-approved customers",
  overview:
    "HDFC Bank is India's largest private sector lender, renowned for offering lightning-fast personal loans with 10-second instant disbursals to pre-approved customers.",
  description:
    "HDFC Bank stands out as an exceptional commercial financing partner for Indian businesses.",
  recommendedFor: "Salaried professionals seeking fast liquidity",
  disbursalTime: "10 Seconds",
  minCreditScore: 720,
  maxLtv: "90%",
  coolingOffPeriod: "3 Days",
  rating: 4.8,
  interestRate: { min: 9.99, max: 15.0, text: "9.99% - 15.0%" },
  processingFee: "Up to 1.5%",
  processingFeeCap: "₹10,000",
  rbiRegulatedEntity: "HDFC Bank Limited",
  faqs: [{ question: "How to apply?", answer: "Online via Grofi." }],
  customFaqs: [{ question: "Is it paperless?", answer: "Yes." }],
};

const allBuilders = [
  { name: "buildBusinessLoanJsonLd", fn: () => buildBusinessLoanJsonLd(mockLender) },
  { name: "buildHomeLoanJsonLd", fn: () => buildHomeLoanJsonLd(mockLender) },
  { name: "buildBalanceTransferJsonLd", fn: () => buildBalanceTransferJsonLd(mockLender, mockLender.faqs) },
  { name: "buildLapJsonLd", fn: () => buildLapJsonLd(mockLender, mockLender.faqs) },
  { name: "buildPersonalLoanJsonLd", fn: () => buildPersonalLoanJsonLd(mockLender) },
  { name: "buildInstantLoanJsonLd", fn: () => buildInstantLoanJsonLd(mockLender) },
  { name: "buildShortTermLoanJsonLd", fn: () => buildShortTermLoanJsonLd(mockLender) },
];

describe("Centralized Structured Data Builders Integrity", () => {
  for (const { name, fn } of allBuilders) {
    test(`${name} emits zero AggregateRating and zero ratingCount`, () => {
      const result = fn();
      const jsonString = JSON.stringify(result);

      // Strict prohibition on fake AggregateRating and ratingCount
      assert.equal(
        jsonString.includes("AggregateRating"),
        false,
        `${name} must NEVER emit AggregateRating`
      );
      assert.equal(
        jsonString.includes("ratingCount"),
        false,
        `${name} must NEVER emit ratingCount`
      );

      // Verify valid FinancialProduct entity
      const product = result["@graph"].find(
        (node: any) => node["@type"] === "FinancialProduct"
      );
      assert.ok(product, `${name} must include a FinancialProduct entity in @graph`);

      // Verify compliant Review entity
      assert.ok(product.review, `${name} must include review when rating is present`);
      assert.equal(product.review["@type"], "Review");
      assert.equal(
        product.review.author.name,
        "Grofi Editorial Team",
        `${name} review author must be Grofi Editorial Team`
      );
      assert.equal(product.review.reviewRating.ratingValue, 4.8);
      assert.equal(product.review.reviewRating.bestRating, 5);
      assert.equal(product.review.reviewRating.worstRating, 1);

      // Verify substantive reviewBody (editorial assessment, not raw marketing tagline)
      assert.ok(
        typeof product.review.reviewBody === "string" &&
          product.review.reviewBody.length > 30,
        `${name} reviewBody must be substantive editorial text`
      );
    });

    test(`${name} cleanly omits review when rating is absent`, () => {
      const lenderWithoutRating = { ...mockLender, rating: null };
      let result: any;
      if (name.includes("BalanceTransfer")) {
        result = buildBalanceTransferJsonLd(lenderWithoutRating, []);
      } else if (name.includes("Lap")) {
        result = buildLapJsonLd(lenderWithoutRating, []);
      } else {
        result = fn.call(null);
        // recreate with no rating
        if (name === "buildBusinessLoanJsonLd") result = buildBusinessLoanJsonLd(lenderWithoutRating);
        if (name === "buildHomeLoanJsonLd") result = buildHomeLoanJsonLd(lenderWithoutRating);
        if (name === "buildPersonalLoanJsonLd") result = buildPersonalLoanJsonLd(lenderWithoutRating);
        if (name === "buildInstantLoanJsonLd") result = buildInstantLoanJsonLd(lenderWithoutRating);
        if (name === "buildShortTermLoanJsonLd") result = buildShortTermLoanJsonLd(lenderWithoutRating);
      }

      const product = result["@graph"].find(
        (node: any) => node["@type"] === "FinancialProduct"
      );
      assert.equal(
        product.review,
        undefined,
        `${name} must not emit review when rating is absent`
      );
    });
  }

  test("Personal loan reviewBody prefers visible overview text over marketing copy", () => {
    const result = buildPersonalLoanJsonLd(mockLender);
    const product: any = result["@graph"].find((node: any) => node["@type"] === "FinancialProduct");
    assert.ok(product);
    assert.ok(product.review);
    assert.equal(product.review.reviewBody, mockLender.overview);
    assert.notEqual(product.review.reviewBody, mockLender.tagline);
  });

  test("buildCreditCardJsonLd emits zero AggregateRating, valid Review and BreadcrumbList", () => {
    const cardWithVerdict = {
      id: "infinia",
      name: "HDFC Infinia Metal",
      issuer: "HDFC Bank",
      annualFee: "₹12,500",
      joiningFee: "₹12,500",
      editorialVerdict:
        "HDFC Infinia Metal is India's leading super-premium card with unmatched SmartBuy reward acceleration.",
    };
    const result = buildCreditCardJsonLd(
      cardWithVerdict,
      "hdfc-bank",
      [{ question: "Is it metal?", answer: "Yes." }]
    );
    const jsonString = JSON.stringify(result);

    assert.equal(jsonString.includes("AggregateRating"), false);
    assert.equal(jsonString.includes("ratingCount"), false);

    const product: any = result["@graph"].find(
      (node: any) => node["@type"] === "FinancialProduct"
    );
    assert.ok(product);
    assert.ok(product.review);
    assert.equal(product.review.author.name, "Grofi Editorial Team");
    assert.equal(product.review.reviewBody, cardWithVerdict.editorialVerdict);

    const breadcrumbs: any = result["@graph"].find(
      (node: any) => node["@type"] === "BreadcrumbList"
    );
    assert.ok(breadcrumbs);
    assert.equal(breadcrumbs.itemListElement.length, 4);

    const faq: any = result["@graph"].find(
      (node: any) => node["@type"] === "FAQPage"
    );
    assert.ok(faq);
  });

  test("buildCreditCardJsonLd cleanly omits review when editorialVerdict is absent", () => {
    const cardWithoutVerdict = {
      id: "infinia",
      name: "HDFC Infinia Metal",
      issuer: "HDFC Bank",
      annualFee: "₹12,500",
      joiningFee: "₹12,500",
    };
    const result = buildCreditCardJsonLd(cardWithoutVerdict, "hdfc-bank");
    const product: any = result["@graph"].find(
      (node: any) => node["@type"] === "FinancialProduct"
    );
    assert.ok(product);
    assert.equal(product.review, undefined);
  });
});

describe("Hub-Page Schema Builders Integrity", () => {
  const mockLenders = [mockLender];
  const mockCards = [
    {
      id: "regalia-gold",
      name: "HDFC Regalia Gold",
      issuer: "HDFC Bank",
      image: "/cards/regalia.png",
      tagline: "Premier travel and lifestyle card",
      joiningFee: "₹2,500",
      annualFee: "₹2,500",
    },
  ];
  const mockFaqs = [
    { question: "What is Grofi?", answer: "A smart financial growth marketplace." },
  ];

  const hubBuilders = [
    { name: "buildPersonalLoansHubJsonLd", fn: () => buildPersonalLoansHubJsonLd(mockLenders) },
    { name: "buildInstantLoansHubJsonLd", fn: () => buildInstantLoansHubJsonLd(mockLenders) },
    { name: "buildShortTermLoansHubJsonLd", fn: () => buildShortTermLoansHubJsonLd(mockLenders) },
    { name: "buildHomeLoansHubJsonLd", fn: () => buildHomeLoansHubJsonLd(mockLenders) },
    { name: "buildBalanceTransferHubJsonLd", fn: () => buildBalanceTransferHubJsonLd(mockLenders, mockFaqs) },
    { name: "buildLapHubJsonLd", fn: () => buildLapHubJsonLd(mockLenders, mockFaqs) },
    { name: "buildBusinessLoansHubJsonLd", fn: () => buildBusinessLoansHubJsonLd(mockLenders) },
    { name: "buildCreditCardsHubJsonLd", fn: () => buildCreditCardsHubJsonLd(mockCards) },
    {
      name: "buildBankCreditCardsHubJsonLd",
      fn: () => buildBankCreditCardsHubJsonLd("HDFC Bank", "hdfc-bank", mockCards, mockFaqs),
    },
  ];

  for (const { name, fn } of hubBuilders) {
    test(`${name} emits zero AggregateRating, valid CollectionPage, Breadcrumbs and ItemList`, () => {
      const result = fn();
      const jsonString = JSON.stringify(result);

      // Strict prohibition on fake AggregateRating and ratingCount
      assert.equal(
        jsonString.includes("AggregateRating"),
        false,
        `${name} must NEVER emit AggregateRating`
      );
      assert.equal(
        jsonString.includes("ratingCount"),
        false,
        `${name} must NEVER emit ratingCount`
      );

      // Check CollectionPage entity
      const collectionPage: any = result["@graph"].find(
        (node: any) => node["@type"] === "CollectionPage"
      );
      assert.ok(collectionPage, `${name} must contain CollectionPage`);
      assert.ok(collectionPage.url);
      assert.ok(collectionPage.name);

      // Check BreadcrumbList entity
      const breadcrumb: any = result["@graph"].find(
        (node: any) => node["@type"] === "BreadcrumbList"
      );
      assert.ok(breadcrumb, `${name} must contain BreadcrumbList`);
      assert.ok(breadcrumb.itemListElement && breadcrumb.itemListElement.length >= 2);
      assert.equal(breadcrumb.itemListElement[0].position, 1);

      // Check ItemList entity
      const itemList: any = result["@graph"].find(
        (node: any) => node["@type"] === "ItemList"
      );
      assert.ok(itemList, `${name} must contain ItemList`);
      assert.equal(itemList.numberOfItems, 1);
      assert.equal(itemList.itemListElement[0].position, 1);
      assert.equal(itemList.itemListElement[0].item["@type"], "FinancialProduct");

      // Check FAQPage entity
      const faqPage: any = result["@graph"].find(
        (node: any) => node["@type"] === "FAQPage"
      );
      assert.ok(faqPage, `${name} must contain FAQPage`);
      assert.ok(faqPage.mainEntity && faqPage.mainEntity.length > 0);
      assert.ok(faqPage.mainEntity[0].name);
      assert.ok(faqPage.mainEntity[0].acceptedAnswer.text);
    });
  }
});

