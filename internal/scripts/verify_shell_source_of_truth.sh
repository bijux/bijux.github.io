#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"

if [[ -d "${repo_root}/overrides" ]]; then
  echo "ERROR: root overrides/ must not exist; use shared/bijux-shell as shell source of truth" >&2
  exit 1
fi

compare_required() {
  local source_rel="$1"
  local generated_rel="$2"

  local source_path="${repo_root}/${source_rel}"
  local generated_path="${repo_root}/${generated_rel}"

  if [[ ! -f "${source_path}" ]]; then
    echo "ERROR: missing source file ${source_rel}" >&2
    exit 1
  fi

  if [[ ! -f "${generated_path}" ]]; then
    echo "ERROR: missing generated file ${generated_rel}" >&2
    echo "Run: make shell-sync" >&2
    exit 1
  fi

  if ! cmp -s "${source_path}" "${generated_path}"; then
    echo "ERROR: ${generated_rel} drifted from ${source_rel}" >&2
    echo "Run: make shell-sync" >&2
    exit 1
  fi
}

# shared -> docs (authoritative shell source)
compare_required "shared/bijux-shell/partials/header.html" "docs/overrides/partials/header.html"
compare_required "shared/bijux-shell/partials/nav.html" "docs/overrides/partials/nav.html"
compare_required "shared/bijux-shell/partials/nav-item.html" "docs/overrides/partials/nav-item.html"
compare_required "shared/bijux-shell/partials/bijux-nav.html" "docs/overrides/partials/bijux-nav.html"

for style in 00-tokens.css 01-theme.css 02-layout.css 03-header.css 04-nav.css 05-content.css 06-components.css 07-utilities.css 08-responsive.css extra.css README.md; do
  compare_required "shared/bijux-shell/styles/${style}" "docs/assets/styles/${style}"
done

for script in bootstrap.js detail-tabs.js nav-reveal.js nav-state.js theme-persistence.js viewport-profile.js README.md; do
  compare_required "shared/bijux-shell/scripts/${script}" "docs/assets/javascripts/shell/${script}"
done
compare_required "shared/bijux-shell/scripts/nav-sync.js" "docs/assets/javascripts/navigation-sync.js"

# docs -> generated root mirrors
for style in 00-tokens.css 01-theme.css 02-layout.css 03-header.css 04-nav.css 05-content.css 06-components.css 07-utilities.css 08-responsive.css extra.css; do
  compare_required "docs/assets/styles/${style}" "assets/styles/${style}"
done
for script in bootstrap.js detail-tabs.js nav-reveal.js nav-state.js theme-persistence.js viewport-profile.js; do
  compare_required "docs/assets/javascripts/shell/${script}" "assets/javascripts/shell/${script}"
done
compare_required "docs/assets/javascripts/navigation-sync.js" "assets/javascripts/navigation-sync.js"
compare_required "docs/assets/javascripts/external-links.js" "assets/javascripts/external-links.js"
compare_required "docs/assets/javascripts/mermaid-init.js" "assets/javascripts/mermaid-init.js"
compare_required "docs/assets/javascripts/vendor/mermaid-11.6.0.min.js" "assets/javascripts/vendor/mermaid-11.6.0.min.js"

echo "Shell source-of-truth checks passed"
