import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { loanLinks, cardLinks, toolLinks, companyLinks } from "../app/components/Footer";

describe("Footer Sitewide Internal Links Integrity", () => {
  const allFooterLinkGroups = [
    { group: "loanLinks", links: loanLinks },
    { group: "cardLinks", links: cardLinks },
    { group: "toolLinks", links: toolLinks },
    { group: "companyLinks", links: companyLinks },
  ];

  test("No footer link uses bare relative hash anchors (#...) or dead links (#)", () => {
    for (const { group, links } of allFooterLinkGroups) {
      for (const item of links) {
        assert.ok(
          !item.href.startsWith("#"),
          `In ${group}, "${item.label}" href "${item.href}" must not be a bare relative hash anchor. Use sitewide routes (/...) or root anchors (/#...).`
        );
        assert.notEqual(
          item.href,
          "#",
          `In ${group}, "${item.label}" must not be a dead link "#"`
        );
        assert.ok(
          item.href.startsWith("/") || item.href.startsWith("http"),
          `In ${group}, "${item.label}" href "${item.href}" must start with "/" or "http"`
        );
      }
    }
  });

  test("Loan links provide sitewide crawlable internal paths to all core money categories", () => {
    const loanHrefs = loanLinks.map((l) => l.href);
    assert.ok(loanHrefs.includes("/personal-loans"), "Must link to /personal-loans");
    assert.ok(loanHrefs.includes("/personal-loans/instant-loans"), "Must link to /personal-loans/instant-loans");
    assert.ok(loanHrefs.includes("/personal-loans/short-term-loans"), "Must link to /personal-loans/short-term-loans");
    assert.ok(loanHrefs.includes("/business-loans"), "Must link to /business-loans");
    assert.ok(loanHrefs.includes("/home-loans"), "Must link to /home-loans");
    assert.ok(loanHrefs.includes("/home-loans/loan-against-property"), "Must link to /home-loans/loan-against-property");
    assert.ok(loanHrefs.includes("/home-loans/balance-transfer"), "Must link to /home-loans/balance-transfer");
  });

  test("Credit card links provide sitewide crawlable internal paths to cards hub and detail pages", () => {
    const cardHrefs = cardLinks.map((c) => c.href);
    assert.ok(cardHrefs.includes("/credit-cards"), "Must link to /credit-cards hub");
    assert.ok(cardHrefs.includes("/credit-cards/features"), "Must link to /credit-cards/features");
    
    // Check that flagship card pages use canonical /credit-cards/[bank]/[card] structure
    for (const href of cardHrefs) {
      if (href !== "/credit-cards" && href !== "/credit-cards/features") {
        assert.match(
          href,
          /^\/credit-cards\/[a-z0-9-]+\/[a-z0-9-]+$/,
          `Card link "${href}" must follow /credit-cards/[bank]/[card] pattern`
        );
      }
    }
  });

  test("Company and tools links provide sitewide-accessible routes", () => {
    const companyHrefs = companyLinks.map((c) => c.href);
    assert.ok(companyHrefs.includes("/careers"), "Must link to /careers");
    assert.ok(companyHrefs.includes("/secure-with-us"), "Must link to /secure-with-us");
    assert.ok(companyHrefs.includes("/blogs"), "Must link to /blogs");

    const toolHrefs = toolLinks.map((t) => t.href);
    assert.ok(toolHrefs.some((h) => h.startsWith("/personal-loans")), "Tool must link to personal loan calculator");
    assert.ok(toolHrefs.some((h) => h.startsWith("/home-loans")), "Tool must link to home loan calculator");
    assert.ok(toolHrefs.some((h) => h.startsWith("/business-loans")), "Tool must link to business loan calculator");
  });
});
