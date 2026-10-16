import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("StickyNav Alignment & Header Clearance Integrity", () => {
  const cardStickyNavPath = path.resolve(
    process.cwd(),
    "app/credit-cards/[bank]/[card]/components/CardStickyNav.tsx"
  );

  test("CardStickyNav uses top-18 sm:top-21 or top-[72px] sm:top-[84px] to clear the main Navbar", () => {
    assert.ok(fs.existsSync(cardStickyNavPath), "CardStickyNav.tsx must exist");
    const content = fs.readFileSync(cardStickyNavPath, "utf-8");

    // Must not use top-14 or top-16 (which causes sticky nav to be hidden behind the main navbar)
    assert.ok(
      !content.includes("top-14 sm:top-16"),
      "CardStickyNav must not use top-14 sm:top-16 as it hides behind the ~84px main navbar"
    );

    // Must include clearance classes for both mobile (72px) and desktop (84px)
    const hasValidTopClass =
      (content.includes("top-18") && content.includes("sm:top-21")) ||
      (content.includes("top-[72px]") && content.includes("sm:top-[84px]"));

    assert.ok(
      hasValidTopClass,
      "CardStickyNav must have top-18 sm:top-21 or top-[72px] sm:top-[84px] to clear the main navbar"
    );
  });

  test("CardStickyNav navOffset accounts for both Navbar and StickyNav heights", () => {
    const content = fs.readFileSync(cardStickyNavPath, "utf-8");

    // navOffset on desktop must be at least 140px to ensure scrolled section headers are not covered
    assert.match(
      content,
      /navOffset = window\.innerWidth < 640 \? (12[0-9]|130) : (14[0-9]|150)/,
      "navOffset must correctly account for combined navbar and stickynav height"
    );
  });
});
