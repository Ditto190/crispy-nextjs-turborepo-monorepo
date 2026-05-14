---
description: Repository-local authoring guide for GitHub Agentic Workflows in this pnpm + Turborepo + Next.js starter.
applyTo: ".github/workflows/*.md,.github/workflows/**/*.md"
---

# GitHub Agentic Workflows for this monorepo

Use GitHub Agentic Workflows here as thin orchestration around the existing monorepo conventions rather than as a second CI system.

## Repository defaults

Use these defaults unless a workflow has a clear reason to differ:

```markdown
---
engine: copilot
strict: true
timeout-minutes: 5
network:
  allowed: [defaults, github]
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
---
```

## Write actions

Keep the main job read-only.

- Prefer `contents: read`, `issues: read`, `pull-requests: read`, `actions: read`
- Use `safe-outputs:` for comments, labels, and review comments
- Do not grant `issues: write`, `pull-requests: write`, or `contents: write` to the agent job

## Untrusted text rules

Issue bodies, PR bodies, and comments are untrusted input.

- Prefer `${{ steps.sanitized.outputs.text }}` over raw body fields
- Keep `tools.bash` narrowly allowlisted when reading user content
- Do not echo long logs, stack traces, or secrets back into comments

## Monorepo context to use in prompts

Treat path changes as workspace signals:

| Path | Meaning |
| --- | --- |
| `apps/web/**` | Next.js app impact |
| `apps/server/**` | Express/TypeScript backend impact |
| `apps/docs/**` | Storybook/docs app impact |
| `packages/ui/**` | shared UI system impact |
| `packages/types/**` | shared types/contracts impact |
| `packages/utils/**` | shared utility impact |
| root config files (`package.json`, `pnpm-workspace.yaml`, `turbo.json`, `.github/**`) | repo-wide or CI/tooling impact |

## Validation commands to reference

When a workflow needs to suggest follow-up checks, prefer the commands contributors already use:

- `pnpm lint`
- `pnpm build`
- `pnpm -r --if-present check-types`
- `pnpm -r --if-present test`
- targeted workspace commands such as `pnpm --filter web build`, `pnpm --filter server build`, `pnpm --filter docs build`

## Authoring expectations

- Keep one workflow focused on one maintainer job
- Default review/debug helpers to slash commands unless automatic triggers are clearly worth the noise
- Call out uncertainty instead of inventing diagnoses
- Favor short summary comments with concrete next steps

## Compilation and maintenance

Run `gh aw compile` after frontmatter changes and commit the generated `.lock.yml` files alongside the markdown sources.

For maintenance, expect to:

- update labels used in `safe-outputs`
- recompile after changing triggers, permissions, tools, or safe outputs
- rerun `gh aw compile --actionlint` before merging workflow frontmatter changes
