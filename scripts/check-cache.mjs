import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// Run against a production server: node scripts/check-cache.mjs http://127.0.0.1:3107
const base = process.argv[2] || "http://127.0.0.1:3107";
const projects = JSON.parse(readFileSync(new URL("../data/projects.json", import.meta.url), "utf8"));
const page = await fetch(base);
assert.equal(page.status, 200);
assert.doesNotMatch(page.headers.get("cache-control") || "", /immutable/);
const html = await page.text();

const photos = [
  ...projects,
  { title: "Hero portrait", image: "/hero-portrait.png" },
  { title: "About portrait", image: "/about-photo.png" },
];
for (const project of photos) {
  const bytes = readFileSync(new URL(`../public${project.image}`, import.meta.url));
  const version = createHash("sha256").update(bytes).digest("hex").slice(0, 16);
  const source = `${project.image}?v=${version}`;
  const portrait = project.image === "/hero-portrait.png" || project.image === "/about-photo.png";
  assert.ok(html.includes(portrait ? encodeURIComponent(source) : source), `Page must use versioned ${project.image}`);
  const original = await fetch(`${base}${project.image}`);
  assert.equal(original.headers.get("cache-control"), "public, max-age=0, must-revalidate");
  await original.arrayBuffer();
  const versioned = await fetch(`${base}${source}`);
  assert.equal(versioned.headers.get("cache-control"), "public, max-age=31536000, immutable");
  await versioned.arrayBuffer();
  const optimizedUrl = `${base}/_next/image?url=${encodeURIComponent(source)}&w=640&q=75`;
  const first = await fetch(optimizedUrl, { headers: { Accept: "image/webp" } });
  assert.equal(first.status, 200);
  assert.equal(first.headers.get("content-type"), "image/webp");
  assert.match(first.headers.get("cache-control"), /max-age=31536000/);
  const optimizedBytes = (await first.arrayBuffer()).byteLength;
  const repeat = await fetch(optimizedUrl, { headers: { Accept: "image/webp" } });
  assert.equal(repeat.headers.get("x-nextjs-cache"), "HIT");
  await repeat.arrayBuffer();
  console.log(`${project.title}: ${bytes.length} original bytes → ${optimizedBytes} bytes at 640px; repeat request HIT`);
}

const script = html.match(/<script[^>]*src="([^\"]+)"/)[1];
const asset = await fetch(new URL(script, base));
assert.match(asset.headers.get("cache-control"), /max-age=31536000, immutable/);
await asset.arrayBuffer();
console.log("PASS: HTML is not immutable; versioned photos and hashed scripts cache for one year; optimizer cache hits verified.");
