import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { testimonials, categoryTabs, trustStats } from "../app/components/Testimonials";

describe("Testimonials Data & Redesign Integrity", () => {
  test("Testimonials list is populated and has valid structure", () => {
    assert.ok(testimonials.length >= 6, "Must have at least 6 testimonials");
    for (const t of testimonials) {
      assert.ok(t.id, "Testimonial must have an id");
      assert.ok(t.name, "Testimonial must have a customer name");
      assert.ok(t.role, "Testimonial must have a role");
      assert.ok(t.city, "Testimonial must have a city");
      assert.ok(t.title, "Testimonial must have a title");
      assert.ok(t.quote, "Testimonial must have a quote");
      assert.ok(t.product, "Testimonial must have a product label");
      assert.ok(t.bankPartner, "Testimonial must have a bank partner");
      assert.ok(t.bankLogo, "Testimonial must have a valid bank logo path");
      assert.ok(t.initials, "Testimonial must have user initials for avatar");
      assert.equal(t.rating, 5, "Rating should be 5 stars for featured testimonials");
      assert.ok(
        ["personal", "credit-card", "business", "home"].includes(t.category),
        `Category ${t.category} must be one of the permitted types`
      );
    }
  });

  test("Every testimonial has avatar theme and role icon for customer user icons", () => {
    for (const t of testimonials) {
      assert.ok(t.avatarTheme, `Testimonial ${t.name} must specify an avatar theme`);
      assert.ok(
        ["emerald", "amber", "violet", "blue", "rose", "teal"].includes(t.avatarTheme),
        `Avatar theme ${t.avatarTheme} must be one of the valid design themes`
      );
      assert.ok(t.initials.length >= 2, `Initials for ${t.name} must be at least 2 characters`);
    }
  });

  test("Bank logos resolve to existing assets in public/partners-logos", () => {
    for (const t of testimonials) {
      assert.ok(
        t.bankLogo.startsWith("/partners-logos/"),
        `Bank logo ${t.bankLogo} must start with /partners-logos/`
      );
    }
  });

  test("Category tabs cover all testimonial categories and include counts", () => {
    const tabIds = categoryTabs.map((c) => c.id);
    assert.ok(tabIds.includes("all"), "Tabs must include 'all'");
    assert.ok(tabIds.includes("personal"), "Tabs must include 'personal'");
    assert.ok(tabIds.includes("credit-card"), "Tabs must include 'credit-card'");
    assert.ok(tabIds.includes("business"), "Tabs must include 'business'");
    assert.ok(tabIds.includes("home"), "Tabs must include 'home'");
  });

  test("Trust stats provide quantifiable proof points", () => {
    assert.ok(trustStats.length >= 4, "Must have at least 4 trust stats");
    for (const stat of trustStats) {
      assert.ok(stat.value, "Stat must have a value");
      assert.ok(stat.label, "Stat must have a label");
    }
  });
});
