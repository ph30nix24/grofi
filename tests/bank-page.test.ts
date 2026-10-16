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
});
