#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

BASE_REF="${1:-}"
if [[ -z "$BASE_REF" ]]; then
  if git rev-parse --verify origin/main >/dev/null 2>&1; then
    BASE_REF="origin/main"
  elif git rev-parse --verify main >/dev/null 2>&1; then
    BASE_REF="main"
  else
    echo "Could not find origin/main or main. Running full tests instead."
    pnpm -r --if-present test
    exit 0
  fi
fi

if ! git rev-parse --verify "$BASE_REF" >/dev/null 2>&1; then
  echo "Base ref '$BASE_REF' does not exist. Running full tests instead."
  pnpm -r --if-present test
  exit 0
fi

changed_files="$(git diff --name-only "$BASE_REF...HEAD")"
if [[ -z "$changed_files" ]]; then
  echo "No changed files relative to $BASE_REF. Skipping tests."
  exit 0
fi

mapfile -t workspaces < <(printf '%s\n' "$changed_files" | awk -F/ '($1=="apps" || $1=="packages") && $2!="" {print $1"/"$2}' | sort -u)

if (( ${#workspaces[@]} == 0 )); then
  echo "No changed workspaces detected. Running full tests as fallback."
  pnpm -r --if-present test
  exit 0
fi

echo "Testing changed workspaces against $BASE_REF: ${workspaces[*]}"
for workspace in "${workspaces[@]}"; do
  pnpm --filter "./$workspace" --if-present test
done

echo "✅ Changed workspace tests completed."
