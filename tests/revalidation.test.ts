import "dotenv/config";
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { revalidate as blogIndexRevalidate } from "../app/blogs/page";
import { revalidate as blogPostRevalidate } from "../app/blogs/[slug]/page";
import { revalidate as sitemapRevalidate } from "../app/sitemap";
import { GET, POST } from "../app/api/revalidate/route";
import { NextRequest } from "next/server";

describe("Cache Invalidation & Revalidation System", () => {
  const TEST_SECRET = "super-secret-token-12345";

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

  test("GET /api/revalidate is rejected with 405 Method Not Allowed", async () => {
    const res = await GET();
    assert.equal(res.status, 405, "GET revalidation must return 405 Method Not Allowed");
  });

  test("Revalidation fails closed if secret is not configured in environment", async () => {
    const prev1 = process.env.REVALIDATION_SECRET;
    const prev2 = process.env.REVALIDATE_SECRET;
    delete process.env.REVALIDATION_SECRET;
    delete process.env.REVALIDATE_SECRET;
    try {
      const req = new NextRequest("https://www.grofi.in/api/revalidate", {
        method: "POST",
        headers: { "x-revalidate-secret": TEST_SECRET },
      });
      const res = await POST(req);
      assert.equal(res.status, 401, "Must fail closed (401) when secret is not configured in env");
    } finally {
      process.env.REVALIDATION_SECRET = prev1;
      process.env.REVALIDATE_SECRET = prev2;
    }
  });

  test("Revalidation rejects query-string secret (dropped for security)", async () => {
    const prev = process.env.REVALIDATION_SECRET;
    try {
      process.env.REVALIDATION_SECRET = TEST_SECRET;
      const req = new NextRequest(
        `https://www.grofi.in/api/revalidate?secret=${TEST_SECRET}&slug=test-guide`,
        { method: "POST" }
      );
      const res = await POST(req);
      assert.equal(res.status, 401, "Query string secret must be rejected with 401");
    } finally {
      process.env.REVALIDATION_SECRET = prev;
    }
  });

  test("POST /api/revalidate with header auth defaults to blogs and sitemap invalidation", async () => {
    const prev = process.env.REVALIDATION_SECRET;
    try {
      process.env.REVALIDATION_SECRET = TEST_SECRET;
      const req = new NextRequest("https://www.grofi.in/api/revalidate", {
        method: "POST",
        headers: { "x-revalidate-secret": TEST_SECRET },
      });
      const res = await POST(req);
      const data = await res.json();

      assert.equal(res.status, 200);
      assert.equal(data.revalidated, true);
      assert.ok(data.paths.includes("/blogs"), "Must revalidate /blogs");
      assert.ok(data.paths.includes("/sitemap.xml"), "Must revalidate /sitemap.xml");
    } finally {
      process.env.REVALIDATION_SECRET = prev;
    }
  });

  test("POST /api/revalidate with slug and Bearer auth revalidates the specific blog slug", async () => {
    const prev = process.env.REVALIDATION_SECRET;
    try {
      process.env.REVALIDATION_SECRET = TEST_SECRET;
      const req = new NextRequest(
        "https://www.grofi.in/api/revalidate?slug=test-finance-guide",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${TEST_SECRET}` },
        }
      );
      const res = await POST(req);
      const data = await res.json();

      assert.equal(res.status, 200);
      assert.equal(data.revalidated, true);
      assert.ok(data.paths.includes("/blogs"), "Must revalidate /blogs");
      assert.ok(
        data.paths.includes("/blogs/test-finance-guide"),
        "Must revalidate /blogs/test-finance-guide"
      );
      assert.ok(data.paths.includes("/sitemap.xml"), "Must revalidate /sitemap.xml");
    } finally {
      process.env.REVALIDATION_SECRET = prev;
    }
  });

  test("POST /api/revalidate with JSON body and header revalidates requested path and slug", async () => {
    const prev = process.env.REVALIDATION_SECRET;
    try {
      process.env.REVALIDATION_SECRET = TEST_SECRET;
      const req = new NextRequest("https://www.grofi.in/api/revalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-revalidate-secret": TEST_SECRET,
        },
        body: JSON.stringify({ slug: "new-credit-card-post" }),
      });

      const res = await POST(req);
      const data = await res.json();

      assert.equal(res.status, 200);
      assert.equal(data.revalidated, true);
      assert.ok(data.paths.includes("/blogs"));
      assert.ok(data.paths.includes("/blogs/new-credit-card-post"));
      assert.ok(data.paths.includes("/sitemap.xml"));
    } finally {
      process.env.REVALIDATION_SECRET = prev;
    }
  });

  test("Revalidation endpoint rejects invalid or missing secrets", async () => {
    const originalSecret = process.env.REVALIDATION_SECRET;
    try {
      process.env.REVALIDATION_SECRET = TEST_SECRET;

      // 1. Without secret -> 401
      const unauthReq = new NextRequest("https://www.grofi.in/api/revalidate", {
        method: "POST",
      });
      const unauthRes = await POST(unauthReq);
      assert.equal(unauthRes.status, 401);

      // 2. With wrong secret header -> 401
      const wrongReq = new NextRequest("https://www.grofi.in/api/revalidate", {
        method: "POST",
        headers: { "x-revalidate-secret": "wrong-secret" },
      });
      const wrongRes = await POST(wrongReq);
      assert.equal(wrongRes.status, 401);

      // 3. With correct secret via header -> 200
      const validHeaderReq = new NextRequest(
        "https://www.grofi.in/api/revalidate",
        {
          method: "POST",
          headers: { "x-revalidate-secret": TEST_SECRET },
        }
      );
      const validHeaderRes = await POST(validHeaderReq);
      assert.equal(validHeaderRes.status, 200);
    } finally {
      process.env.REVALIDATION_SECRET = originalSecret;
    }
  });
});
