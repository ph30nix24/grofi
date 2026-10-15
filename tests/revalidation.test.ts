import "dotenv/config";
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { revalidate as blogIndexRevalidate } from "../app/blogs/page";
import { revalidate as blogPostRevalidate } from "../app/blogs/[slug]/page";
import { revalidate as sitemapRevalidate } from "../app/sitemap";
import { GET, POST } from "../app/api/revalidate/route";
import { NextRequest } from "next/server";

describe("Cache Invalidation & Revalidation System", () => {
  test("Page route segment configs define aggressive ISR fallback frequencies", () => {
    assert.equal(
      blogIndexRevalidate,
      60,
      "Blog index (/blogs) revalidate must be 60 seconds"
    );
    assert.equal(
      blogPostRevalidate,
      60,
      "Blog post (/blogs/[slug]) revalidate must be 60 seconds"
    );
    assert.equal(
      sitemapRevalidate,
      3600,
      "Sitemap revalidate must be defined and set to 3600 seconds"
    );
  });

  test("GET /api/revalidate without parameters defaults to blogs and sitemap invalidation", async () => {
    const req = new NextRequest("https://www.grofi.in/api/revalidate");
    const res = await GET(req);
    const data = await res.json();

    assert.equal(res.status, 200);
    assert.equal(data.revalidated, true);
    assert.ok(data.paths.includes("/blogs"), "Must revalidate /blogs");
    assert.ok(data.paths.includes("/sitemap.xml"), "Must revalidate /sitemap.xml");
  });

  test("GET /api/revalidate with slug revalidates the specific blog slug", async () => {
    const req = new NextRequest(
      "https://www.grofi.in/api/revalidate?slug=test-finance-guide"
    );
    const res = await GET(req);
    const data = await res.json();

    assert.equal(res.status, 200);
    assert.equal(data.revalidated, true);
    assert.ok(data.paths.includes("/blogs"), "Must revalidate /blogs");
    assert.ok(
      data.paths.includes("/blogs/test-finance-guide"),
      "Must revalidate /blogs/test-finance-guide"
    );
    assert.ok(data.paths.includes("/sitemap.xml"), "Must revalidate /sitemap.xml");
  });

  test("POST /api/revalidate with JSON body revalidates requested path and slug", async () => {
    const req = new NextRequest("https://www.grofi.in/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: "new-credit-card-post" }),
    });

    const res = await POST(req);
    const data = await res.json();

    assert.equal(res.status, 200);
    assert.equal(data.revalidated, true);
    assert.ok(data.paths.includes("/blogs"));
    assert.ok(data.paths.includes("/blogs/new-credit-card-post"));
    assert.ok(data.paths.includes("/sitemap.xml"));
  });

  test("Revalidation endpoint rejects invalid secrets when REVALIDATION_SECRET is set", async () => {
    const originalSecret = process.env.REVALIDATION_SECRET;
    try {
      process.env.REVALIDATION_SECRET = "super-secret-token-12345";

      // 1. Without secret -> 401
      const unauthReq = new NextRequest("https://www.grofi.in/api/revalidate");
      const unauthRes = await GET(unauthReq);
      assert.equal(unauthRes.status, 401);

      // 2. With wrong secret -> 401
      const wrongReq = new NextRequest(
        "https://www.grofi.in/api/revalidate?secret=wrong-secret"
      );
      const wrongRes = await GET(wrongReq);
      assert.equal(wrongRes.status, 401);

      // 3. With correct secret via header -> 200
      const validHeaderReq = new NextRequest(
        "https://www.grofi.in/api/revalidate",
        {
          headers: { "x-revalidate-secret": "super-secret-token-12345" },
        }
      );
      const validHeaderRes = await GET(validHeaderReq);
      assert.equal(validHeaderRes.status, 200);

      // 4. With correct secret via query parameter -> 200
      const validQueryReq = new NextRequest(
        "https://www.grofi.in/api/revalidate?secret=super-secret-token-12345&slug=top-loans"
      );
      const validQueryRes = await GET(validQueryReq);
      assert.equal(validQueryRes.status, 200);
      const validData = await validQueryRes.json();
      assert.ok(validData.paths.includes("/blogs/top-loans"));
    } finally {
      process.env.REVALIDATION_SECRET = originalSecret;
    }
  });
});
