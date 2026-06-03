# CloudFront + S3: subpages and deep links

This site is a **multi-page** static build (Vite), not a single-page app. Built pages live at paths like `founders/index.html`, `fractional-product-engineer/index.html`, and `startup-mvp-engineer/index.html`.

## The problem

CloudFront is usually fronting the **S3 REST API endpoint**, not the S3 website endpoint. That API does **not** automatically map:

- `/founders/` → `/founders/index.html`
- `/founders` → `/founders/index.html`

When a request misses, S3 returns **403**. If CloudFront is configured with custom error responses (403/404 → `/index.html`), visitors get the **home page** instead of the founders page.

Symptoms:

- `/founders/index.html` works
- `/founders/` and `/founders` show the homepage

## Fix used in this repo

The S3 deploy workflow runs `scripts/sync-s3-routes.sh` after `aws s3 sync`. That script uploads each built subpage to both:

- `founders`
- `founders/`

…so pretty URLs work without CloudFront rewrite rules.

After deploying, invalidate CloudFront (`/*`) if cached responses still look wrong.

## Optional: CloudFront Function (rewrite instead of duplicate objects)

If you prefer not to duplicate objects, attach a **viewer request** CloudFront Function:

```javascript
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
```

With this in place, custom 403/404 → `/index.html` error responses are only needed for routes that do not have a real HTML file.

## `portfolio`

`https://yoursite.com/portfolio` works via `public/portfolio/index.html`, which redirects to `/`. The route alias script does not need to include it unless you want `/portfolio/` to resolve without the nested `index.html` path.
