---
description: Repo-specific context patterns for agentic workflows in this starter monorepo.
---

# Context patterns

## Prefer sanitized text

Use `${{ steps.sanitized.outputs.text }}` whenever a workflow needs to reason about issue, PR, or comment content.

Use individual fields only for routing metadata such as:

- `${{ github.event.issue.number }}`
- `${{ github.event.pull_request.number }}`
- `${{ github.event.workflow_run.id }}`
- `${{ github.repository }}`
- `${{ github.actor }}`

## Repo facts worth encoding in prompts

- Root scripts: `pnpm lint`, `pnpm build`, `pnpm clean`, `pnpm preview-storybook`
- CI workflow: `CI/CD`
- Cloud-agent bootstrap workflow: `Copilot Setup Steps`
- Workspace layout: `apps/*` and `packages/*`

## Path-to-workspace mapping

Use these heuristics when reviewing PRs or debugging failures:

- `apps/web/**` → user-facing Next.js changes
- `apps/server/**` → backend/API runtime changes
- `apps/docs/**` → Storybook, docs, or design-system showcase changes
- `packages/ui/**` → shared React component changes that can affect both `web` and `docs`
- `packages/types/**` → contract/type changes that can affect multiple apps
- `packages/utils/**` → shared logic used across the repo
- root config changes → likely repo-wide impact

## Failure-triage hints

When investigating failures, relate job output back to workspace boundaries before proposing next steps. In this repo that usually means:

- Next.js errors → `apps/web`
- Express or `tsc` backend errors → `apps/server`
- Storybook/Vite build errors → `apps/docs`
- shared component/type import errors → `packages/ui` or `packages/types`
- lockfile, workspace, Turbo, or workflow issues → root config or `.github/**`
