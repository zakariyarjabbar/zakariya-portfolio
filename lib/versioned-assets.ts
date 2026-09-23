import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join, resolve, sep } from "node:path";

/** Run on the server/build only. Keep JSON paths simple; version URLs automatically. */
export function versionPublicAsset(src: string) {
  const publicDirectory = join(process.cwd(), "public");
  if (!src.startsWith("/") || src.startsWith("//")) {
    throw new Error(`Project images must use a local /path in public/: ${src}`);
  }

  const url = new URL(src, "https://portfolio.local");
  const file = resolve(publicDirectory, `.${decodeURIComponent(url.pathname)}`);
  if (!file.startsWith(`${resolve(publicDirectory)}${sep}`)) {
    throw new Error(`Image path is outside public/: ${src}`);
  }

  // Keep the read statically scoped so Next's file tracing only includes public assets.
  const contents = readFileSync(join(process.cwd(), "public", decodeURIComponent(url.pathname)));
  const version = createHash("sha256").update(contents).digest("hex").slice(0, 16);
  url.searchParams.set("v", version);
  return `${url.pathname}${url.search}`;
}
