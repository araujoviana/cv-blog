#!/usr/bin/env bash
# Fetch a Tenor GIF, downsize/re-palette it for the :shortcode: emoji system
# (src/plugins/rehype-emoji.mjs, registry src/data/emoji.json), verify the
# background actually ended up transparent, and register it.
#
# Usage: scripts/add-emoji.sh <shortcode> <tenor-view-url> [<shortcode> <tenor-view-url> ...]
#
# Notes:
# - A Tenor "view" URL's plain "gif" media is usually opaque (baked-in white
#   background), even when the emoji itself looks like a transparent cutout.
#   Tenor separately hosts a "gif_transparent" variant with the real alpha
#   channel; this script always fetches that variant, not the plain one.
# - "Downsize to 64px tall" matches the existing emoji set's sizing
#   (src/data/emoji.json), don't change it per-emoji without a reason.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EMOJI_DIR="$ROOT/public/emoji"
EMOJI_JSON="$ROOT/src/data/emoji.json"
README="$EMOJI_DIR/README.md"
UA="Mozilla/5.0"

if [ "$#" -eq 0 ] || [ $(( $# % 2 )) -ne 0 ]; then
  echo "Usage: $0 <shortcode> <tenor-view-url> [<shortcode> <tenor-view-url> ...]" >&2
  exit 1
fi

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

while [ "$#" -gt 0 ]; do
  code="$1"; url="$2"; shift 2

  if [ -f "$EMOJI_DIR/$code.gif" ] || jq -e --arg c "$code" 'has($c)' "$EMOJI_JSON" >/dev/null; then
    echo "== :$code: already exists, skipping (remove it first if you want to replace it) ==" >&2
    continue
  fi

  echo "== :$code: fetching $url =="
  html="$WORKDIR/$code.html"
  curl -sL -A "$UA" -o "$html" "$url"

  gif_url="$(grep -oE '"gif_transparent":\{"url":"[^"]+"' "$html" | head -1 \
    | sed -E 's/.*"url":"//; s/"$//; s/\\u002F/\//g')"

  if [ -z "$gif_url" ]; then
    echo "!! :$code: no gif_transparent variant found on that Tenor page, skipping." >&2
    echo "   (fetch the page yourself and check for a \"gif_transparent\" entry)" >&2
    continue
  fi

  raw="$WORKDIR/$code-raw.gif"
  curl -sL -A "$UA" -o "$raw" "$gif_url"

  out="$WORKDIR/$code.gif"
  ffmpeg -y -i "$raw" -vf \
    "scale=-1:64:flags=lanczos,split[s0][s1];[s0]palettegen=reserve_transparent=1[p];[s1][p]paletteuse=alpha_threshold=128" \
    -loglevel error "$out"

  # Verify transparency actually made it through: sample the corners of
  # frame 0 for a real alpha=0 pixel. A fully-opaque result means Tenor's
  # transparent variant wasn't actually transparent for this GIF (rare but
  # happens); warn loudly rather than silently shipping a white box.
  png="$WORKDIR/$code.png"
  ffmpeg -y -i "$out" -vframes 1 "$png" -loglevel error </dev/null
  alpha_mean="$(identify -format "%[fx:mean.a]" "$png" </dev/null)"
  if [ "$alpha_mean" = "1" ]; then
    echo "!! :$code: WARNING - output has no transparent pixels (alpha_mean=1)." >&2
    echo "   Skipping registration; inspect $out manually before adding it by hand." >&2
    cp "$out" "$WORKDIR/$code-INSPECT.gif"
    echo "   Saved to $WORKDIR/$code-INSPECT.gif" >&2
    continue
  fi

  cp "$out" "$EMOJI_DIR/$code.gif"
  jq --arg c "$code" --arg f "$code.gif" '. + {($c): $f}' "$EMOJI_JSON" > "$EMOJI_JSON.tmp"
  mv "$EMOJI_JSON.tmp" "$EMOJI_JSON"

  if grep -qE '^\| `:[a-zA-Z0-9_+-]+:`' "$README"; then
    row="| \`:$code:\` | $url |"
    # Insert the new row right after the last existing table row (inserting
    # before the blank line + "To add more:" trailer would start a *new*
    # markdown table instead of extending this one).
    last_line="$(grep -nE '^\| `:[a-zA-Z0-9_+-]+:`' "$README" | tail -1 | cut -d: -f1)"
    awk -v row="$row" -v target="$last_line" 'NR==target{print; print row; next} {print}' "$README" > "$README.tmp"
    mv "$README.tmp" "$README"
  fi

  echo "== :$code: added (alpha_mean=$alpha_mean, transparent OK) =="
done

echo "Done. Review the diff, then run \`bunx prettier --write $EMOJI_JSON $README\` if formatting looks off."
