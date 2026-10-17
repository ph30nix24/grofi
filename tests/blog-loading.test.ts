import { test, describe } from "node:test";
import assert from "node:assert/strict";
import BlogPostLoading from "../app/blogs/[slug]/loading";
import BlogsIndexLoading from "../app/blogs/loading";

describe("Blog Route Loading Skeletons", () => {
  test("BlogPostLoading renders complete article skeleton structure", () => {
    const element = BlogPostLoading();
    assert.ok(element, "BlogPostLoading must return a valid React element");

    const json = JSON.stringify(element);
    assert.ok(json.includes("Fetching financial guide..."), "Must include fetching guide status badge");
    assert.ok(json.includes("Loading guide media..."), "Must include media placeholder");
  });

  test("BlogsIndexLoading renders blog list skeleton structure", () => {
    const element = BlogsIndexLoading();
    assert.ok(element, "BlogsIndexLoading must return a valid React element");

    const json = JSON.stringify(element);
    assert.ok(json.includes("Fetching financial insights..."), "Must include fetching insights status badge");
  });
});
