import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { PARTNER_BANKS, getBankSlug } from "../app/credit-cards/[bank]/components/constants";

describe("Partner Banks Configuration", () => {
  test("PARTNER_BANKS contains required banks with valid structure", () => {
    assert.ok(Array.isArray(PARTNER_BANKS));
    assert.ok(PARTNER_BANKS.length > 0);

    for (const bank of PARTNER_BANKS) {
      assert.ok(bank.name, `Bank must have a name: ${JSON.stringify(bank)}`);
      assert.ok(bank.slug, `Bank must have a slug: ${bank.name}`);
      assert.match(bank.slug, /^[a-z0-9-]+$/, `Bank slug must be kebab-case: ${bank.slug}`);
      assert.ok(bank.logo.startsWith("/"), `Bank logo path must start with /: ${bank.logo}`);
    }
  });

  test("No duplicate partner bank slugs exist", () => {
    const slugs = PARTNER_BANKS.map((b) => b.slug);
    const uniqueSlugs = new Set(slugs);
    assert.equal(slugs.length, uniqueSlugs.size, "All partner bank slugs must be unique");
  });

  test("getBankSlug correctly maps all database issuer values", () => {
    const dbIssuers = [
      { issuer: "HDFC Bank", expected: "hdfc-bank" },
      { issuer: "SBI Bank", expected: "sbi-bank" },
      { issuer: "BOB Bank", expected: "bob-bank" },
      { issuer: "YES Bank", expected: "yes-bank" },
      { issuer: "AU Bank", expected: "au-bank" },
      { issuer: "AXIS Bank", expected: "axis-bank" },
      { issuer: "INDUSIND Bank", expected: "indusind-bank" },
      { issuer: "FEDERAL Bank", expected: "federal-bank" },
      { issuer: "IDFC Bank", expected: "idfc-bank" },
      { issuer: "ICICI Bank", expected: "icici-bank" },
    ];

    for (const { issuer, expected } of dbIssuers) {
      assert.equal(
        getBankSlug(issuer),
        expected,
        `Expected ${issuer} to map to ${expected}`
      );
    }
  });

  test("getBankSlug resolves common aliases without fragile substring matching", () => {
    assert.equal(getBankSlug("SBI Card"), "sbi-bank");
    assert.equal(getBankSlug("State Bank of India"), "sbi-bank");
    assert.equal(getBankSlug("Bank of Baroda"), "bob-bank");
    assert.equal(getBankSlug("AU Small Finance Bank"), "au-bank");
    assert.equal(getBankSlug("IDFC First Bank"), "idfc-bank");
    assert.equal(getBankSlug("Kotak Mahindra Bank"), "kotak-bank");

    // Must NOT match "au-bank" just because it contains "au"
    assert.equal(getBankSlug("aurangabad"), "aurangabad");
    assert.equal(getBankSlug("authority"), "authority");
  });

  test("getBankSlug safely handles null, undefined, and empty inputs", () => {
    assert.equal(getBankSlug(null), "other-bank");
    assert.equal(getBankSlug(undefined), "other-bank");
    assert.equal(getBankSlug(""), "other-bank");
    assert.equal(getBankSlug("   "), "other-bank");
  });
});
