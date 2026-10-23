import "dotenv/config";
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

describe("Personal Loan Explorers 2-Up Mobile Screen Invariants", () => {
  test("PersonalLoanExplorer enforces 2 cards at a time on mobile", async () => {
    const filePath = path.resolve(
      process.cwd(),
      "app/personal-loans/components/PersonalLoanExplorer.tsx"
    );
    const content = await fs.readFile(filePath, "utf-8");

    // Invariant: grid must specify grid-cols-2 for mobile
    assert.match(
      content,
      /grid-cols-2\s+md:grid-cols-2\s+lg:grid-cols-3/,
      "PersonalLoanExplorer must use grid-cols-2 on mobile for 2 cards at a time"
    );

    // Invariant: Container padding optimized for mobile 2-up
    assert.match(
      content,
      /px-2\.5\s+sm:px-6\s+lg:px-8/,
      "PersonalLoanExplorer must use compact padding (px-2.5) on mobile"
    );

    // Invariant: Scale compare toggle button present
    assert.match(
      content,
      /<Scale\s+className=/,
      "PersonalLoanExplorer must include Scale icon for quick comparison"
    );

    // Invariant: Clamped 2-line title for uniform height alignment across rows
    assert.match(
      content,
      /line-clamp-2\s+min-h-\[2\.4em\]/,
      "PersonalLoanExplorer must clamp title to 2 lines with min-height for uniform alignment"
    );
  });

  test("InstantLoanExplorer enforces 2 cards at a time on mobile", async () => {
    const filePath = path.resolve(
      process.cwd(),
      "app/personal-loans/instant-loans/components/InstantLoanExplorer.tsx"
    );
    const content = await fs.readFile(filePath, "utf-8");

    // Invariant: grid must specify grid-cols-2 for mobile
    assert.match(
      content,
      /grid-cols-2\s+md:grid-cols-2\s+lg:grid-cols-3/,
      "InstantLoanExplorer must use grid-cols-2 on mobile for 2 cards at a time"
    );

    // Invariant: Container padding optimized for mobile 2-up
    assert.match(
      content,
      /px-2\.5\s+sm:px-6\s+lg:px-8/,
      "InstantLoanExplorer must use compact padding (px-2.5) on mobile"
    );

    // Invariant: Scale compare toggle button present
    assert.match(
      content,
      /<Scale\s+className=/,
      "InstantLoanExplorer must include Scale icon for quick comparison"
    );

    // Invariant: Clamped 2-line title for uniform height alignment across rows
    assert.match(
      content,
      /line-clamp-2\s+min-h-\[2\.4em\]/,
      "InstantLoanExplorer must clamp title to 2 lines with min-height for uniform alignment"
    );
  });

  test("ShortTermLoanExplorer enforces 2 cards at a time on mobile", async () => {
    const filePath = path.resolve(
      process.cwd(),
      "app/personal-loans/short-term-loans/components/ShortTermLoanExplorer.tsx"
    );
    const content = await fs.readFile(filePath, "utf-8");

    // Invariant: grid must specify grid-cols-2 for mobile
    assert.match(
      content,
      /grid-cols-2\s+md:grid-cols-2\s+lg:grid-cols-3/,
      "ShortTermLoanExplorer must use grid-cols-2 on mobile for 2 cards at a time"
    );

    // Invariant: Container padding optimized for mobile 2-up
    assert.match(
      content,
      /px-2\.5\s+sm:px-6\s+lg:px-8/,
      "ShortTermLoanExplorer must use compact padding (px-2.5) on mobile"
    );

    // Invariant: Scale compare toggle button present
    assert.match(
      content,
      /<Scale\s+className=/,
      "ShortTermLoanExplorer must include Scale icon for quick comparison"
    );

    // Invariant: Clamped 2-line title for uniform height alignment across rows
    assert.match(
      content,
      /line-clamp-2\s+min-h-\[2\.4em\]/,
      "ShortTermLoanExplorer must clamp title to 2 lines with min-height for uniform alignment"
    );
  });
});
