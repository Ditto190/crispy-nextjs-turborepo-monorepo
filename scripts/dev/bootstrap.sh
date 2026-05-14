#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

need_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required tool: $1"
    exit 1
  fi
}

need_cmd git

if command -v corepack >/dev/null 2>&1; then
  corepack enable >/dev/null 2>&1 || true
fi

need_cmd pnpm

install_frozen() {
  pnpm install --frozen-lockfile
}

install_relaxed() {
  pnpm install --no-frozen-lockfile
}

mode="auto"
if [[ "${1:-}" == "--frozen-lockfile" ]]; then
  mode="frozen"
elif [[ "${1:-}" == "--no-frozen-lockfile" ]]; then
  mode="relaxed"
fi

if [[ "$mode" == "frozen" ]] || [[ "$mode" == "auto" && -n "${CI:-}" ]]; then
  echo "Installing dependencies with --frozen-lockfile..."
  install_frozen
elif [[ "$mode" == "relaxed" ]]; then
  echo "Installing dependencies with --no-frozen-lockfile..."
  install_relaxed
else
  echo "Installing dependencies with --frozen-lockfile (fallbacks to --no-frozen-lockfile)..."
  if ! install_frozen; then
    echo "Frozen install failed. Retrying with --no-frozen-lockfile for local bootstrap."
    install_relaxed
  fi
fi
