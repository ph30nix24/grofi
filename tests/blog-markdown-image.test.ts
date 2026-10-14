import { test, describe } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import MarkdownContent from "../app/blogs/[slug]/components/MarkdownContent";

describe("Blog Markdown Image Rendering", () => {
  test("renders standalone markdown image correctly", () => {
    const markdown =
      "![How a credit card works illustration showing the five steps](https://res.cloudinary.com/hfougdko/image/upload/v1791957494/3353de22-ba43-4cae-ba3e-43cf3d8bf4e8.png)";

    const element = MarkdownContent({ content: markdown });
    assert.ok(element, "MarkdownContent must return a React element");

    const json = JSON.stringify(element);
    assert.ok(
      json.includes("https://res.cloudinary.com/hfougdko/image/upload/v1791957494/3353de22-ba43-4cae-ba3e-43cf3d8bf4e8.png"),
      "Must include the Cloudinary image URL"
    );
    assert.ok(
      json.includes("How a credit card works illustration showing the five steps"),
      "Must include the alt / caption text"
    );
  });

  test("renders markdown image with optional title", () => {
    const markdown =
      '![Debit Card](https://res.cloudinary.com/hfougdko/image/upload/v1791957941/251b2e89-5c68-42b0-a6de-34b93ff16b31.png "How a debit card works")';

    const element = MarkdownContent({ content: markdown });
    assert.ok(element);

    const json = JSON.stringify(element);
    assert.ok(
      json.includes("https://res.cloudinary.com/hfougdko/image/upload/v1791957941/251b2e89-5c68-42b0-a6de-34b93ff16b31.png"),
      "Must include the image URL"
    );
    assert.ok(json.includes("How a debit card works"), "Must include the caption from title");
  });

  test("renders inline markdown image inside a paragraph", () => {
    const markdown =
      "Check out this infographic: ![Credit Card Infographic](https://res.cloudinary.com/demo/image.png) for more details.";

    const element = MarkdownContent({ content: markdown });
    assert.ok(element);

    const json = JSON.stringify(element);
    assert.ok(
      json.includes("https://res.cloudinary.com/demo/image.png"),
      "Must render the inline image URL"
    );
    assert.ok(
      json.includes("Credit Card Infographic"),
      "Must render the inline image alt text"
    );
  });

  test("renders HTML img tag if present in markdown", () => {
    const markdown =
      '<img src="https://res.cloudinary.com/demo/html-img.png" alt="HTML Tag Image" />';

    const element = MarkdownContent({ content: markdown });
    assert.ok(element);

    const json = JSON.stringify(element);
    assert.ok(
      json.includes("https://res.cloudinary.com/demo/html-img.png"),
      "Must support HTML img src"
    );
    assert.ok(
      json.includes("HTML Tag Image"),
      "Must support HTML img alt"
    );
  });
});
