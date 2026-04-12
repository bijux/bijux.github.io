#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
site_dir="${1:-${DOCS_SITE_DIR:-${repo_root}/artifacts/docs/site}}"

if [[ ! -f "${site_dir}/index.html" ]]; then
  echo "ERROR: missing built site at ${site_dir}/index.html" >&2
  exit 1
fi

protected_entries=(
  ".git"
  ".github"
  ".gitignore"
  ".venv"
  "artifacts"
  "docs"
  "internal"
  "makes"
  "Makefile"
  "mkdocs.shared.yml"
  "mkdocs.yml"
  "requirements-docs.txt"
)

is_protected() {
  local name="$1"

  for entry in "${protected_entries[@]}"; do
    if [[ "${name}" == "${entry}" ]]; then
      return 0
    fi
  done

  return 1
}

shopt -s dotglob nullglob

for path in "${repo_root}"/* "${repo_root}"/.[!.]* "${repo_root}"/..?*; do
  name="$(basename "${path}")"

  if is_protected "${name}"; then
    continue
  fi

  rm -rf "${path}"
done

cp -R "${site_dir}/." "${repo_root}/"
