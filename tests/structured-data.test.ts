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
});
