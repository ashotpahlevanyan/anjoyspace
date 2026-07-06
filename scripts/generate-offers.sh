#!/usr/bin/env bash
#
# Retreat offer generator.
#
# Renders a 1080×1080 offer/program image for each retreat, in both the dark
# and light theme, straight from the retreats content collection — so offers
# always match the site. Re-run any time you add or edit a retreat.
#
# Usage:
#   scripts/generate-offers.sh                 # all retreats, dark + light, RU
#   scripts/generate-offers.sh deep-yoga-weekend
#   LANG_CODE=en scripts/generate-offers.sh deep-yoga-weekend
#   THEMES="dark" scripts/generate-offers.sh   # only dark
#   FORMATS="pdf" scripts/generate-offers.sh   # only PDF (clickable button)
#   FORMATS="png" scripts/generate-offers.sh   # only PNG (default: png pdf)
#
# PNG = flat image for social/messenger. PDF = same design but the
# "Reserve your place" button is a clickable link (great for email/attachments).
#
# Output: marketing/retreat-offers/<slug>-<theme>[-<lang>].{png,pdf}
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

OUT="marketing/retreat-offers"
PORT="${PORT:-4330}"
LANG_CODE="${LANG_CODE:-ru}"
THEMES="${THEMES:-dark light}"
FORMATS="${FORMATS:-png pdf}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

mkdir -p "$OUT"

# Slugs: args, or every non-draft retreat file.
if [ "$#" -gt 0 ]; then
  SLUGS=("$@")
else
  SLUGS=()
  for f in src/content/retreats/*.md; do
    SLUGS+=("$(basename "$f" .md)")
  done
fi

echo "▸ Building site…"
npx astro build >/dev/null

echo "▸ Starting preview on port ${PORT}"
npx astro preview --port "$PORT" >/tmp/anjoy-offers-preview.log 2>&1 &
PREVIEW_PID=$!
trap 'kill "$PREVIEW_PID" 2>/dev/null || true' EXIT

# Wait for the server.
for _ in $(seq 1 60); do
  if curl -sf "http://localhost:$PORT/" >/dev/null 2>&1; then break; fi
  sleep 0.5
done

echo "▸ Rendering offers ($LANG_CODE · ${FORMATS// /+})…"
for slug in "${SLUGS[@]}"; do
  for theme in $THEMES; do
    suffix="$slug-$theme"
    [ "$LANG_CODE" != "ru" ] && suffix="$suffix-$LANG_CODE"
    url="http://localhost:$PORT/offers/$slug?theme=$theme&lang=$LANG_CODE&capture=1"
    for fmt in $FORMATS; do
      if [ "$fmt" = "png" ]; then
        "$CHROME" --headless --disable-gpu --hide-scrollbars \
          --force-device-scale-factor=1 --window-size=1080,1080 \
          --virtual-time-budget=4500 --run-all-compositor-stages-before-draw \
          --screenshot="$OUT/$suffix.png" "$url" >/dev/null 2>&1
        echo "  ✓ $OUT/$suffix.png"
      elif [ "$fmt" = "pdf" ]; then
        "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
          --virtual-time-budget=4500 --run-all-compositor-stages-before-draw \
          --print-to-pdf="$OUT/$suffix.pdf" "$url" >/dev/null 2>&1
        echo "  ✓ $OUT/$suffix.pdf"
      fi
    done
  done
done

echo "▸ Done → $OUT/"
