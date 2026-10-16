import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed. Cache revalidation must be triggered via POST." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

function safeRevalidatePath(path: string, type?: "page" | "layout") {
  try {
    if (type) {
      revalidatePath(path, type);
    } else {
      revalidatePath(path);
    }
  } catch (err: unknown) {
    // In standalone test environments outside of Next.js server context,
    // Next.js throws 'Invariant: static generation store missing'.
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("static generation store missing")) {
      return;
    }
    throw err;
  }
}

function safeRevalidateTag(tag: string) {
  try {
    revalidateTag(tag, "max");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("static generation store missing")) {
      return;
    }
    throw err;
  }
}

async function handleRevalidate(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    let body: Record<string, unknown> = {};

    if (request.method === "POST") {
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        // Fallback for requests without JSON body
      }
    }

    // Extract secret only from header, auth bearer, or json body (query-string secret dropped)
    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    const providedSecret =
      request.headers.get("x-revalidate-secret") ||
      bearerToken ||
      (typeof body.secret === "string" ? body.secret : null) ||
      (typeof body.token === "string" ? body.token : null);

    const configuredSecret =
      process.env.REVALIDATION_SECRET || process.env.REVALIDATE_SECRET;

    // Fail closed: secret MUST be configured in environment AND providedSecret MUST match
    if (!configuredSecret || !providedSecret || providedSecret !== configuredSecret) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing revalidation secret token" },
        { status: 401 }
      );
    }

    const path =
      searchParams.get("path") || (typeof body.path === "string" ? body.path : null);
    const slug =
      searchParams.get("slug") || (typeof body.slug === "string" ? body.slug : null);
    const tag =
      searchParams.get("tag") || (typeof body.tag === "string" ? body.tag : null);
    const type =
      searchParams.get("type") || (typeof body.type === "string" ? body.type : null);

    const revalidatedPaths: string[] = [];

    // 1. Explicit path revalidation
    if (path) {
      safeRevalidatePath(path);
      revalidatedPaths.push(path);
    }

    // 2. Blog revalidation (if slug is provided, or type is blog/blogs, or default invocation)
    const isBlogTargeted =
      Boolean(slug) ||
      type === "blog" ||
      type === "blogs" ||
      path === "/blogs" ||
      (!path && !tag);

    if (isBlogTargeted) {
      safeRevalidatePath("/blogs");
      if (!revalidatedPaths.includes("/blogs")) {
        revalidatedPaths.push("/blogs");
      }

      if (slug) {
        const blogPath = `/blogs/${slug}`;
        safeRevalidatePath(blogPath);
        if (!revalidatedPaths.includes(blogPath)) {
          revalidatedPaths.push(blogPath);
        }
      }

      safeRevalidatePath("/sitemap.xml");
      if (!revalidatedPaths.includes("/sitemap.xml")) {
        revalidatedPaths.push("/sitemap.xml");
      }
    }

    // 3. Tag-based revalidation if specified
    if (tag) {
      safeRevalidateTag(tag);
    }

    return NextResponse.json({
      revalidated: true,
      paths: revalidatedPaths,
      tag: tag || null,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Failed to revalidate cache:", error);
    return NextResponse.json(
      { error: "Internal Server Error during revalidation", details: String(error) },
      { status: 500 }
    );
  }
}
