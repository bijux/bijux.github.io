#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"

if [[ -d "${repo_root}/overrides" ]]; then
  echo "ERROR: root overrides/ must not exist; use docs/overrides/ as shell source of truth" >&2
  exit 1
fi

compare_if_present() {
  local source_rel="$1"
  local generated_rel="$2"

  local source_path="${repo_root}/${source_rel}"
  local generated_path="${repo_root}/${generated_rel}"

  if [[ ! -f "${source_path}" ]]; then
    echo "ERROR: missing source file ${source_rel}" >&2
    exit 1
  fi

  if [[ -f "${generated_path}" ]] && ! cmp -s "${source_path}" "${generated_path}"; then
    echo "ERROR: generated file ${generated_rel} drifted from ${source_rel}" >&2
    echo "Run: make site-root" >&2
    exit 1
  fi
}

compare_if_present "docs/assets/styles/extra.css" "assets/styles/extra.css"
compare_if_present "docs/assets/styles/00-tokens.css" "assets/styles/00-tokens.css"
compare_if_present "docs/assets/styles/01-theme.css" "assets/styles/01-theme.css"
compare_if_present "docs/assets/styles/02-layout.css" "assets/styles/02-layout.css"
compare_if_present "docs/assets/styles/03-header.css" "assets/styles/03-header.css"
compare_if_present "docs/assets/styles/04-nav.css" "assets/styles/04-nav.css"
compare_if_present "docs/assets/styles/05-content.css" "assets/styles/05-content.css"
compare_if_present "docs/assets/styles/06-components.css" "assets/styles/06-components.css"
compare_if_present "docs/assets/styles/07-utilities.css" "assets/styles/07-utilities.css"
compare_if_present "docs/assets/styles/08-responsive.css" "assets/styles/08-responsive.css"
compare_if_present "docs/assets/javascripts/external-links.js" "assets/javascripts/external-links.js"
compare_if_present "docs/assets/javascripts/mermaid-init.js" "assets/javascripts/mermaid-init.js"
compare_if_present "docs/assets/javascripts/navigation-sync.js" "assets/javascripts/navigation-sync.js"
compare_if_present "docs/assets/javascripts/vendor/mermaid-11.6.0.min.js" "assets/javascripts/vendor/mermaid-11.6.0.min.js"
compare_if_present "docs/assets/javascripts/shell/theme-persistence.js" "assets/javascripts/shell/theme-persistence.js"
compare_if_present "docs/assets/javascripts/shell/viewport-profile.js" "assets/javascripts/shell/viewport-profile.js"
compare_if_present "docs/assets/javascripts/shell/nav-state.js" "assets/javascripts/shell/nav-state.js"
compare_if_present "docs/assets/javascripts/shell/detail-tabs.js" "assets/javascripts/shell/detail-tabs.js"
compare_if_present "docs/assets/javascripts/shell/nav-reveal.js" "assets/javascripts/shell/nav-reveal.js"
compare_if_present "docs/assets/javascripts/shell/bootstrap.js" "assets/javascripts/shell/bootstrap.js"

echo "Shell source-of-truth checks passed"
