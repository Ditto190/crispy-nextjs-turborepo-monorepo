#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

warnings=0

need_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "❌ Missing required command: $1"
    exit 1
  fi
}

warn() {
  warnings=$((warnings + 1))
  echo "⚠️  $1"
}

need_cmd git
need_cmd node
need_cmd pnpm

if [[ ! -f package.json || ! -f pnpm-workspace.yaml || ! -f turbo.json ]]; then
  echo "❌ Not in monorepo root or required files are missing."
  exit 1
fi

node_major="$(node -p 'process.versions.node.split(".")[0]')"
if (( node_major < 20 )); then
  echo "❌ Node.js 20+ is required. Found: $(node -v)"
  exit 1
fi

pnpm_major="$(pnpm --version | cut -d. -f1)"
if [[ "$pnpm_major" != "9" ]]; then
  warn "Expected pnpm major version 9.x to match packageManager in package.json. Found: $(pnpm --version)"
fi

if ! pnpm exec turbo --version >/dev/null 2>&1; then
  warn "Turbo CLI is not available yet. Run scripts/dev/bootstrap.sh first."
fi

if [[ ! -d .git ]]; then
  warn "Git metadata is missing; changed-package scripts may not work."
fi

if ! git rev-parse --verify origin/main >/dev/null 2>&1 && ! git rev-parse --verify main >/dev/null 2>&1; then
  warn "Could not find base reference origin/main or main for changed-workspace scripts."
fi

if (( warnings == 0 )); then
  echo "✅ Doctor check passed. Environment looks good."
else
  echo "✅ Doctor check completed with $warnings warning(s)."
fi
