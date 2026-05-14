# GitHub Agentic Workflows starter

This repository keeps its local `gh aw` authoring guidance in `.github/aw/` and its workflow sources in `.github/workflows/*.md`.

## What is included

- `issue-triage.md` — labels and comments on new or reopened issues
- `pr-review-helper.md` — on-demand PR scope and risk review via `/review-helper`
- `debug-helper.md` — on-demand CI or issue failure triage via `/debug-ci`

## Repository-specific defaults

- Package manager: `pnpm@9.12.1`
- Task runner: Turborepo (`pnpm lint`, `pnpm build`)
- Main apps: `apps/web`, `apps/server`, `apps/docs`
- Shared packages: `packages/ui`, `packages/types`, `packages/utils`
- Existing CI workflow name: `CI/CD`

## Authoring flow

1. Install the GitHub CLI extension:
   ```bash
   gh extension install github/gh-aw
   ```
2. Edit the markdown source in `.github/workflows/*.md`.
3. Recompile after any frontmatter change:
   ```bash
   gh aw compile
   ```
4. Commit both the source `.md` file and the generated `.lock.yml` file.

Markdown body edits are safe to make directly in GitHub, but frontmatter changes require recompilation.

## Validation

Use the lightest useful validation for this repo:

```bash
gh aw compile --actionlint
pnpm lint
pnpm build
```

Add `--zizmor` and `--poutine` locally if those tools are installed.

## Starter labels

Create these labels before relying on the starter triage flows:

- `bug`
- `enhancement`
- `documentation`
- `question`
- `needs-info`
- `needs-reproduction`
- `good-first-issue`

`gh aw` can create referenced labels during maintenance runs, or you can create them manually in repository settings.

## Remaining manual setup

This PR can add the source files and compiled workflow files, but full adoption still requires repository-level setup:

- install and trust the `gh aw` toolchain for maintainers
- enable the repo workflows in GitHub Actions
- create or sync the labels used by safe outputs
- decide whether review/debug workflows stay command-driven or get promoted to broader triggers later
