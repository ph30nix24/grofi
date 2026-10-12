import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { PARTNER_BANKS } from "../app/credit-cards/[bank]/components/constants";

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
});
