#!/usr/bin/env bash
# S3 REST origins (CloudFront default) do not map /founders/ to /founders/index.html.
# Upload each built page to extensionless and trailing-slash keys as well.
set -euo pipefail

bucket="${1:?Usage: sync-s3-routes.sh <s3-bucket> [dist-dir]}"
dist="${2:-dist}"

routes=(
  founders
  fractional-product-engineer
  startup-mvp-engineer
  gpts/roguelike-deckbuilder-designer
  playbooks/roguelike-deckbuilder-mvp
  playbooks/deckbuilder-balance-checklist
  playbooks/card-system-design
  playbooks/cursor-spec-for-card-games
)

for route in "${routes[@]}"; do
  src="${dist}/${route}/index.html"
  if [[ ! -f "$src" ]]; then
    echo "Missing ${src}; run npm run build first." >&2
    exit 1
  fi

  # /founders
  aws s3 cp "$src" "s3://${bucket}/${route}" \
    --content-type text/html \
    --cache-control "public, max-age=0, must-revalidate"

  # /founders/ (literal trailing-slash object key; `aws s3 cp .../route/` would overwrite index.html)
  aws s3api put-object \
    --bucket "$bucket" \
    --key "${route}/" \
    --body "$src" \
    --content-type text/html \
    --cache-control "public, max-age=0, must-revalidate"

  echo "Published /${route} and /${route}/"
done
