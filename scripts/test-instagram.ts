// scripts/test-instagram.ts
// Run from your project root:
//   npx tsx scripts/test-instagram.ts
// Reads INSTAGRAM_ACCESS_TOKEN from .env.local (or from the shell environment).
import "dotenv/config";
import { readFileSync, existsSync } from "node:fs";

type InstaProfile = {
  user_id?: string;
  username?: string;
  account_type?: string;
};

type InstaMedia = {
  id: string;
  caption?: string;
  media_type: string;
  media_product_type?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
};

type GraphError = { error?: { message?: string } };

// --- load .env.local without extra dependencies ---
if (!process.env.INSTAGRAM_ACCESS_TOKEN && existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
}

const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
const BASE = "https://graph.instagram.com";

const ok = (msg: string) => console.log(`\u2705 ${msg}`);
const fail = (msg: string) => console.log(`\u274C ${msg}`);

async function call<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<{ res: Response; json: T & GraphError }> {
  const url = new URL(`${BASE}${path}`);
  Object.entries({ ...params, access_token: token ?? "" }).forEach(([k, v]) =>
    url.searchParams.set(k, v)
  );
  const res = await fetch(url);
  const json = (await res.json().catch(() => ({}))) as T & GraphError;
  return { res, json };
}

async function main(): Promise<void> {
  // 1. Token present
  if (!token) {
    fail("INSTAGRAM_ACCESS_TOKEN not found. Add it to .env.local and run again.");
    process.exit(1);
  }
  ok(`Token found (${token.length} characters)`);

  // 2. Token valid + account info
  const me = await call<InstaProfile>("/me", {
    fields: "user_id,username,account_type",
  });
  if (!me.res.ok) {
    fail(`Profile request failed: ${me.json.error?.message ?? me.res.status}`);
    console.log("   Common causes: token expired, copied with extra spaces, or wrong token.");
    process.exit(1);
  }
  ok(`Logged in as @${me.json.username} (${me.json.account_type ?? "unknown type"})`);

  // 3. Media list
  const fields =
    "id,caption,media_type,media_product_type,thumbnail_url,permalink,timestamp,like_count";
  const media = await call<{ data?: InstaMedia[] }>("/me/media", {
    fields,
    limit: "50",
  });
  if (!media.res.ok) {
    fail(`Media request failed: ${media.json.error?.message ?? media.res.status}`);
    process.exit(1);
  }

  const items = media.json.data ?? [];
  ok(`Fetched ${items.length} recent posts`);

  // 4. Reels only
  const reels = items.filter((m) => m.media_product_type === "REELS");
  if (reels.length === 0) {
    fail("No reels found in the last 50 posts.");
    console.log("   Check that the account has reels and that the permission was granted.");
    process.exit(1);
  }
  ok(`Found ${reels.length} reels`);

  // 5. Show the first few
  console.log("\nLatest reels:");
  reels.slice(0, 5).forEach((r, i) => {
    console.log(`\n${i + 1}. ${r.permalink}`);
    console.log(`   posted:    ${r.timestamp}`);
    console.log(`   likes:     ${r.like_count ?? "n/a"}`);
    console.log(`   thumbnail: ${r.thumbnail_url ? "yes" : "MISSING"}`);
    console.log(`   caption:   ${(r.caption ?? "").slice(0, 70).replace(/\n/g, " ")}...`);
  });

  // 6. Thumbnail URL actually loads
  const first = reels.find((r) => r.thumbnail_url);
  if (first?.thumbnail_url) {
    const img = await fetch(first.thumbnail_url, { method: "HEAD" });
    if (img.ok) ok("Thumbnail URL is reachable");
    else fail(`Thumbnail URL returned ${img.status}`);
  }

  console.log("\nAll checks done. Your getReels() function should work.");
}

main().catch((err: unknown) => {
  fail(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});