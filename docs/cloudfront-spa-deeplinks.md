# CloudFront: enable deep links (e.g. /portfolio) for the SPA

When someone opens or refreshes a URL like `https://yoursite.com/portfolio`, the browser requests `/portfolio` from the server. S3 has no object at that path, so it returns **403 Access Denied**, and the user sees an error instead of the app.

Fix: tell CloudFront to serve your **index.html** whenever the origin returns 403 or 404. The SPA loads, the client-side router reads the pathname, and shows the correct view. The URL stays `/portfolio`.

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

After this, requests to `/portfolio` (or any path that doesn’t exist in S3) will get your `index.html` with a 200 response. The app will load and the router will show the portfolio (or a 404 view) based on the path.
