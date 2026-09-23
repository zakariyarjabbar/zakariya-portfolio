# Project viewer

Edit `data/projects.json` to add, update, remove, or reorder projects. The array order is the viewer order. Each project uses:

```json
{
  "title": "Project name",
  "description": "What the project does.",
  "tags": ["React", "TypeScript"],
  "image": "/project-screenshot.png",
  "imageAlt": "A description of the screenshot",
  "url": "https://example.com/"
}
```

Place screenshots in `public/` and reference them with a leading slash. `imageAlt` is optional; all other fields are required. Use an HTTPS website URL. No component edits are needed when adding projects.

Visitors can switch projects with previous/next buttons or the project selectors. Controls work with keyboard Tab and Enter/Space, and navigation wraps around. With one project, switching is disabled. An empty array displays an empty state.

JSON is imported during the build: changes update the local development preview automatically; rebuild and redeploy to update the published site. This implementation does not include a website admin editor or remote storage.

## Images and caching

- Keep writing ordinary local image paths in the JSON. During rendering, the server adds a version derived from the file's contents. Replacing a photo and rebuilding produces a new URL automatically, even when the filename stays the same.
- Production versioned photos are cacheable for one year. Unversioned public images use a one-hour cache with revalidation. Next.js handles the existing hashed JavaScript, CSS, fonts, and imported portraits with long-lived caching. Page HTML retains Next.js's normal freshness policy.
- Next.js serves responsive WebP images to compatible browsers. The hero is prioritized, the About portrait is lazy-loaded, and both request sizes appropriate to their layouts.
- Once a project image finishes loading, nearby project photos download at low priority during idle time. The loader uses the same responsive URLs as the viewer and skips connections reporting data-saving mode or 2G/3G, and hidden tabs. It downloads at most two neighboring photos per selection, not the entire gallery upfront.
- The browser manages storage and may evict cached assets. This is HTTP caching, not a full offline website or a permanent download. No service worker intercepts pages or API requests.
- Caching headers are enabled in production only. Run `npm run build`, then `npm start -- --port 3107`, then `node scripts/check-cache.mjs http://127.0.0.1:3107` to verify actual image headers, compression, and repeated optimizer cache hits.

Reference: [Next.js image caching](https://nextjs.org/docs/app/api-reference/components/image#caching-behavior).
