import "dotenv/config";
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import SelectedBankCreditCard, { generateMetadata } from "../app/credit-cards/[bank]/page";

describe("Bank Credit Cards Page & notFound() Behavior", () => {
  test("Unknown bank slug triggers notFound()", async () => {
    let notFoundTriggered = false;
    try {
      await SelectedBankCreditCard({
        params: Promise.resolve({ bank: "non-existent-bank-xyz" }),
      });
    } catch (err: unknown) {
      // In Next.js, notFound() throws an error with digest NEXT_HTTP_ERROR_FALLBACK;404 or NEXT_NOT_FOUND
      const message = err instanceof Error ? err.message : String(err);
      const digest = (err as { digest?: string })?.digest || "";
      if (
        digest.includes("NEXT_HTTP_ERROR_FALLBACK") ||
        digest.includes("NEXT_NOT_FOUND") ||
        digest.includes("404") ||
        message.includes("NEXT_NOT_FOUND") ||
        message.includes("NEXT_HTTP_ERROR_FALLBACK")
      ) {
        notFoundTriggered = true;
      } else {
        throw err;
      }
    }

    assert.equal(
      notFoundTriggered,
      true,
      "Expected notFound() to be called when query returns no cards"
    );
  });

  test("Unknown bank slug returns 'Bank Not Found' in generateMetadata", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ bank: "unknown-bank-slug" }),
    });

    assert.equal(meta.title, "Bank Not Found | Grofi");
  });

  test("BankCardExplorer enforces 2-up cards on mobile screen invariant", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const filePath = path.resolve(
      process.cwd(),
      "app/credit-cards/[bank]/components/BankCardExplorer.tsx"
    );
    const content = await fs.readFile(filePath, "utf-8");

    // Invariant: grid must specify grid-cols-2 for mobile
    assert.match(
      content,
      /grid-cols-2\s+md:grid-cols-2\s+lg:grid-cols-3/,
      "BankCardExplorer must use grid-cols-2 on mobile for 2 cards at a time"
    );

    // Invariant: Responsive image sizes must account for 50vw on mobile
    assert.match(
      content,
      /\(max-width:\s*640px\)\s*50vw/,
      "Image sizes must allocate 50vw for mobile 2-up cards"
    );

    // Invariant: Quick filter pills must be available for instant mobile scanning
    assert.match(
      content,
      /Lifetime Free \(₹0\)/,
      "Quick filters must include Lifetime Free filter"
    );
  });

  test("CreditCardExplorer enforces 2-up cards on mobile screen invariant", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const filePath = path.resolve(
      process.cwd(),
      "app/credit-cards/components/CreditCardExplorer.tsx"
    );
    const content = await fs.readFile(filePath, "utf-8");

    // Invariant: grid must specify grid-cols-2 for mobile
    assert.match(
      content,
      /grid-cols-2\s+md:grid-cols-2\s+lg:grid-cols-3/,
      "CreditCardExplorer must use grid-cols-2 on mobile for 2 cards at a time"
    );

    // Invariant: Responsive image sizes must account for 50vw on mobile
    assert.match(
      content,
      /\(max-width:\s*640px\)\s*50vw/,
      "Image sizes must allocate 50vw for mobile 2-up cards"
    );

    // Invariant: Quick filter pills must be available for instant mobile scanning
    assert.match(
      content,
      /Lifetime Free \(₹0\)/,
      "Quick filters must include Lifetime Free filter"
    );
  });

  test("SimilarCardsSection enforces 2-up cards on mobile screen invariant", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const filePath = path.resolve(
      process.cwd(),
      "app/credit-cards/[bank]/[card]/components/SimilarCardsSection.tsx"
    );
    const content = await fs.readFile(filePath, "utf-8");

    // Invariant: grid must specify grid-cols-2 for mobile
    assert.match(
      content,
      /grid-cols-2\s+md:grid-cols-2\s+lg:grid-cols-3/,
      "SimilarCardsSection must use grid-cols-2 on mobile for 2 cards at a time"
    );

    // Invariant: Responsive image sizes must account for 50vw on mobile
    assert.match(
      content,
      /\(max-width:\s*640px\)\s*50vw/,
      "Image sizes must allocate 50vw for mobile 2-up cards"
    );
  });
});
