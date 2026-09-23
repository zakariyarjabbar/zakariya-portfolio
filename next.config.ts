import type { NextConfig } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { versionPublicAsset } from "./lib/versioned-assets";

function publicImages(directory: string, prefix = ""): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) return publicImages(join(directory, entry.name), path);
    return /\.(?:avif|webp|png|jpe?g|svg|ico)$/i.test(entry.name) ? [path] : [];
  });
}

const imagePaths = publicImages(join(process.cwd(), "public"));
const versionedImages = imagePaths.map((path) => new URL(versionPublicAsset(path), "https://portfolio.local"));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 14400,
    localPatterns: process.env.NODE_ENV === "production" ? [
      { pathname: "/_next/static/media/**", search: "" },
      ...imagePaths.map((pathname) => ({ pathname, search: "" })),
      ...versionedImages.map(({ pathname, search }) => ({ pathname, search })),
    ] : [{ pathname: "/**" }],
  },
  async headers() {
    // Dev responses must stay fresh; check caching using `npm run build && npm start`.
    if (process.env.NODE_ENV !== "production") return [];

    return versionedImages.flatMap(({ pathname: path, searchParams }) => {
      const version = searchParams.get("v")!;
      const source = path.replace(/[():*?+\\]/g, "\\$&");
      return [
        {
          source,
          headers: [{ key: "Cache-Control", value: "public, max-age=3600, must-revalidate" }],
        },
        {
          source,
          has: [{ type: "query" as const, key: "v", value: version }],
          headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
        },
      ];
    });
  },
};

export default nextConfig;
