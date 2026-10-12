import "dotenv/config";
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import sitemap from "../app/sitemap";

describe("Sitemap Integrity & Safety", () => {
  test("sitemap() returns an array with core static routes and proper metadata", async () => {
    const entries = await sitemap();
    assert.ok(Array.isArray(entries), "Sitemap must return an array");
    assert.ok(entries.length > 0, "Sitemap must not be empty");

    // If database is available, verify full catalog coverage (> 300 URLs)
    if (process.env.DATABASE_URL) {
      assert.ok(
        entries.length >= 300,
        `Sitemap should contain all catalog tables (expected >= 300 URLs, got ${entries.length})`
      );
    }

    const urls = new Set(entries.map((e) => e.url));

    // Verify all core hubs and static pages exist
    const requiredStaticPaths = [
      "https://www.grofi.in",
      "https://www.grofi.in/credit-cards",
      "https://www.grofi.in/credit-cards/features",
      "https://www.grofi.in/personal-loans",
      "https://www.grofi.in/personal-loans/instant-loans",
      "https://www.grofi.in/personal-loans/short-term-loans",
      "https://www.grofi.in/home-loans",
      "https://www.grofi.in/home-loans/balance-transfer",
      "https://www.grofi.in/home-loans/loan-against-property",
      "https://www.grofi.in/business-loans",
      "https://www.grofi.in/blogs",
      "https://www.grofi.in/careers",
      "https://www.grofi.in/secure-with-us",
      "https://www.grofi.in/privacy-policy",
    ];

    for (const path of requiredStaticPaths) {
      assert.ok(urls.has(path), `Sitemap must contain static path: ${path}`);
    }

    // Ensure redirect paths like /privacy are never in the sitemap
    assert.equal(
      urls.has("https://www.grofi.in/privacy"),
      false,
      "Sitemap must not contain redirect routes like /privacy"
    );

    // Verify metadata rules
    for (const entry of entries) {
      assert.ok(entry.url.startsWith("https://www.grofi.in"), `Invalid base URL: ${entry.url}`);
      assert.ok(!entry.url.includes("undefined"), `URL must not contain "undefined": ${entry.url}`);
      assert.ok(!entry.url.includes("null"), `URL must not contain "null": ${entry.url}`);
      assert.ok(entry.lastModified instanceof Date, `lastModified must be a valid Date: ${entry.url}`);
      assert.ok(!isNaN(entry.lastModified.getTime()), `lastModified Date must be valid: ${entry.url}`);
      if (entry.priority !== undefined) {
        assert.ok(entry.priority >= 0 && entry.priority <= 1, `Priority must be between 0 and 1: ${entry.url}`);
      }
    }
  });
});
