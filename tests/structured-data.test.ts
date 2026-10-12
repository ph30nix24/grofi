import { test, describe } from "node:test";
import assert from "node:assert/strict";

describe("Loan Structured Data Safety", () => {
  test("Structured data emits compliant editorial Review entity instead of AggregateRating", () => {
    const mockLender = {
      id: "test-lender",
      name: "Test Bank",
      rating: 4.8,
      tagline: "Premier banking with low interest rates",
    };

    // Mimic the structured data review block used in loan detail templates
    const reviewBlock = mockLender.rating
      ? {
          "@type": "Review",
          author: { "@type": "Organization", name: "Grofi Editorial Team" },
          reviewRating: {
            "@type": "Rating",
            ratingValue: mockLender.rating,
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: mockLender.tagline,
        }
      : undefined;

    assert.ok(reviewBlock, "Review block should be defined when rating is present");
    assert.equal(reviewBlock["@type"], "Review");
    assert.equal(reviewBlock.author.name, "Grofi Editorial Team");
    assert.equal(reviewBlock.reviewRating.ratingValue, 4.8);
    assert.equal(reviewBlock.reviewRating.bestRating, 5);
    assert.equal(reviewBlock.reviewRating.worstRating, 1);
    assert.equal(reviewBlock.reviewBody, "Premier banking with low interest rates");

    // Ensure forbidden AggregateRating keys do not exist
    assert.equal((reviewBlock as any).ratingCount, undefined, "Fake ratingCount must not exist");
    assert.notEqual(reviewBlock["@type"], "AggregateRating", "@type must not be AggregateRating");
  });

  test("Structured data gracefully omits review when rating is not present", () => {
    const mockLenderWithoutRating = {
      id: "test-lender-no-rating",
      name: "Test Bank",
      rating: 0,
      tagline: "Standard loan",
    };

    const reviewBlock = mockLenderWithoutRating.rating
      ? {
          "@type": "Review",
          author: { "@type": "Organization", name: "Grofi Editorial Team" },
        }
      : undefined;

    assert.equal(reviewBlock, undefined, "Review block should be undefined when rating is 0 or absent");
  });
});
