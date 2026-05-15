#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$REPO_ROOT"

if [[ ! -x "scripts/dev/bootstrap.sh" ]]; then
  echo "Expected scripts/dev/bootstrap.sh to exist and be executable."
  exit 1
fi

scripts/dev/bootstrap.sh
scripts/dev/doctor.sh
