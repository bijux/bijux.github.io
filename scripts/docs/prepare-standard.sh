#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
source_root="${BIJUX_STD_ROOT:?BIJUX_STD_ROOT must select the accepted source cache}"
pin="$(tr -d '[:space:]' < "${repo_root}/.github/standards/bijux-std.sha")"
[[ "${pin}" =~ ^[a-f0-9]{40}$ ]] || {
  echo 'ERROR: the standard pin must be one full commit SHA' >&2
  exit 1
}

if [[ ! -e "${source_root}" ]]; then
  mkdir -p "${source_root}"
  git -C "${source_root}" init --quiet
  git -C "${source_root}" remote add origin https://github.com/bijux/bijux-std.git
else
  [[ "$(git -C "${source_root}" rev-parse --show-toplevel)" == "$(cd "${source_root}" && pwd -P)" ]]
  [[ "$(git -C "${source_root}" remote get-url origin)" == 'https://github.com/bijux/bijux-std.git' ]]
  [[ -z "$(git -C "${source_root}" status --porcelain --untracked-files=all)" ]] || {
    echo 'ERROR: preserve modified standard source inputs before preparing docs' >&2
    exit 1
  }
fi

git -C "${source_root}" fetch --quiet --depth 1 origin "${pin}"
[[ "$(git -C "${source_root}" rev-parse 'FETCH_HEAD^{commit}')" == "${pin}" ]]
if [[ "$(git -C "${source_root}" rev-parse HEAD 2>/dev/null || true)" != "${pin}" ]]; then
  case "${source_root}" in
    "${repo_root}"/artifacts/*) git -C "${source_root}" checkout --quiet --detach "${pin}" ;;
    *) echo 'ERROR: explicit external source must already be at the tracked pin' >&2; exit 1 ;;
  esac
fi
bash "${repo_root}/.bijux/shared/bijux-checks/scripts/verify-accepted-source.sh" "${source_root}" "${pin}"
