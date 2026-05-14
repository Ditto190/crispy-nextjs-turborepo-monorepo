#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

MODE="${1:-quick}"
BASE_REF="${2:-origin/main}"

if [[ "$MODE" != "quick" && "$MODE" != "full" ]]; then
  echo "Usage: scripts/dev/debug-ci.sh [quick|full] [base-ref]"
  exit 1
fi

echo "== Environment =="
echo "Node: $(node --version)"
echo "pnpm: $(pnpm --version)"
echo "Git: $(git --version)"

echo
scripts/dev/doctor.sh

echo
echo "== Lockfile check (CI parity) =="
if ! pnpm install --frozen-lockfile >/dev/null; then
  echo "❌ Frozen lockfile install failed. This often causes CI failures."
  echo "   Try running: pnpm install --no-frozen-lockfile"
  exit 1
fi

echo "✅ Frozen lockfile install succeeded."

echo
if [[ "$MODE" == "quick" ]]; then
  echo "== Running changed-scope diagnostics against $BASE_REF =="
  scripts/dev/lint-changed.sh "$BASE_REF"
  scripts/dev/test-changed.sh "$BASE_REF"
else
  echo "== Running full CI-like checks =="
  pnpm lint
  pnpm build
  pnpm -r --if-present check-types
  pnpm -r --if-present test
fi

