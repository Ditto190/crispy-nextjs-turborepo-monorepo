#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

if [[ ! -d node_modules ]]; then
  echo "Dependencies are missing. Running bootstrap..."
  scripts/dev/bootstrap.sh
fi

echo "Workspace ready. Useful commands:"
echo "  - pnpm dev"
echo "  - scripts/dev/doctor.sh"
echo "  - scripts/dev/lint-changed.sh"
echo "  - scripts/dev/test-changed.sh"
