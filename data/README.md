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
