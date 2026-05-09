# CloudFront: SPA and deep links (404/403 → index.html)

When someone opens a URL path that does not match a real object in S3 (for example a future client-side route), the origin may return **403** or **404**. Without custom error responses, the user sees an error instead of the app.

Fix: tell CloudFront to serve your **index.html** whenever the origin returns 403 or 404 so the SPA can load.

**Note:** `https://yoursite.com/portfolio` still works if you ship a `portfolio/index.html` under `public/` (copied to `dist/`) that redirects to `/`. The main app lives at `/` only.

## Steps (AWS Console)

1. Open **CloudFront** → **Distributions** → select the distribution for your site.
2. Go to the **Error pages** tab.
3. Click **Create custom error response** and add **two** responses:

### 1) 403 → 200 with index.html

| Field | Value |
|-------|--------|
| HTTP error code | 403: Forbidden |
| Customize error response | Yes |
| Response page path | `/index.html` |
| HTTP response code | 200: OK |

Save.

### 2) 404 → 200 with index.html

| Field | Value |
|-------|--------|
| HTTP error code | 404: Not Found |
| Customize error response | Yes |
| Response page path | `/index.html` |
| HTTP response code | 200: OK |

Save.

4. (Optional) Invalidate the cache so the new behavior applies immediately:
   - **Invalidations** tab → **Create invalidation** → Object path: `/*`

After this, requests for missing paths get your `index.html` with a 200 response (optional: add static files under `public/` for paths that should redirect or return their own HTML).
