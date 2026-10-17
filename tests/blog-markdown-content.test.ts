import { test, describe } from "node:test";
import assert from "node:assert/strict";
import MarkdownContent from "../app/blogs/[slug]/components/MarkdownContent";

describe("Blog MarkdownContent Parser Safety & Invariant Tests", () => {
  test("renders long bold-only paragraph (> 160 chars) without infinite loop", () => {
    const longText =
      "This is a very comprehensive opening paragraph for the new financial guide that outlines all the nuances of interest rate fluctuations, market dynamics, borrowing costs, and economic factors affecting personal loans in India today and well into the future.";
    assert.ok(longText.length > 160, `Length must exceed 160 (actual: ${longText.length})`);

    const markdown = `**${longText}**\n\nNext regular paragraph.`;

    const start = Date.now();
    const element = MarkdownContent({ content: markdown });
    const duration = Date.now() - start;

    assert.ok(duration < 1000, "Parser must terminate quickly without hanging in an infinite loop");
    assert.ok(element, "MarkdownContent must return a React element");

    const json = JSON.stringify(element);
    assert.ok(json.includes(longText), "Must contain the bold paragraph text");
    assert.ok(json.includes("Next regular paragraph"), "Must contain the subsequent paragraph");
  });

  test("renders short bold-only line (< 160 chars) as subheading", () => {
    const shortBold = "Frequently Asked Questions About Credit Cards";
    assert.ok(shortBold.length < 160);

    const markdown = `**${shortBold}**\n\nSome answer text.`;
    const element = MarkdownContent({ content: markdown });
    assert.ok(element);

    const json = JSON.stringify(element);
    assert.ok(json.includes(shortBold));
  });

  test("renders callout bold line correctly", () => {
    const markdown = `**Tip: Always verify the processing fee before applying.**\n\nCheck the bank website.`;
    const element = MarkdownContent({ content: markdown });
    assert.ok(element);

    const json = JSON.stringify(element);
    assert.ok(json.includes("Tip:"));
    assert.ok(json.includes("Always verify the processing fee before applying"));
  });

  test("handles line starting with #hashtag without infinite loop (e.g. #RBI)", () => {
    const markdown = `#RBI is trending today after the policy announcement.\n\nMore details follow.`;
    const start = Date.now();
    const element = MarkdownContent({ content: markdown });
    const duration = Date.now() - start;

    assert.ok(duration < 1000, "Parser must not loop infinitely on #hashtag");
    assert.ok(element);

    const json = JSON.stringify(element);
    assert.ok(json.includes("#RBI is trending today"));
  });

  test("handles heading depth > 4 (##### H5) without infinite loop", () => {
    const markdown = `##### Small Section Heading\n\nContent for this sub-section.`;
    const start = Date.now();
    const element = MarkdownContent({ content: markdown });
    const duration = Date.now() - start;

    assert.ok(duration < 1000, "Parser must not loop infinitely on ##### heading");
    assert.ok(element);

    const json = JSON.stringify(element);
    assert.ok(json.includes("##### Small Section Heading"));
  });

  test("handles markdown image with trailing text on same line without infinite loop", () => {
    const markdown = `![Card](https://res.cloudinary.com/demo/image.png) Some inline trailing description on the same line.\n\nParagraph text.`;
    const start = Date.now();
    const element = MarkdownContent({ content: markdown });
    const duration = Date.now() - start;

    assert.ok(duration < 1000, "Parser must not loop infinitely on image followed by text");
    assert.ok(element);

    const json = JSON.stringify(element);
    assert.ok(json.includes("https://res.cloudinary.com/demo/image.png"));
  });

  test("handles HTML img with trailing text on same line without infinite loop", () => {
    const markdown = `<img src="https://res.cloudinary.com/demo/image.png" alt="Test" /> Trailing commentary here.\n\nParagraph text.`;
    const start = Date.now();
    const element = MarkdownContent({ content: markdown });
    const duration = Date.now() - start;

    assert.ok(duration < 1000, "Parser must not loop infinitely on HTML img followed by text");
    assert.ok(element);

    const json = JSON.stringify(element);
    assert.ok(json.includes("Trailing commentary here"));
  });
});
