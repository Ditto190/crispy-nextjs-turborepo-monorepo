# Repository governance and agent autonomy

This document explains the GitHub settings required so agents can:

- open pull requests
- triage and fix issues
- run workflows without manual approval
- merge PRs when checks pass and there are no conflicts

Some capabilities require GitHub UI settings and cannot be fully represented as files in this repository.

## 1) Repository-side policy in git

Implemented in this repository:

- `.github/CODEOWNERS` for critical paths (`.github/**`, workflows, devcontainer, root monorepo config, apps/packages)
- `.github/BRANCH_RULESETS.md` as the branch protection/ruleset configuration template

## 2) GitHub Actions permissions model

Configure in **Settings** → **Actions** → **General**:

1. **Actions permissions**: allow GitHub Actions in this repository.
2. **Workflow permissions**:
   - Prefer default `Read repository contents permission`.
   - Grant `Read and write permissions` only if you need workflow-driven triage/comment/label/merge actions.
3. If you use workflow automation to open/update PRs, enable:
   - **Allow GitHub Actions to create and approve pull requests** (if available in your plan/UI).

### Least-privilege workflow guidance

In each workflow, set explicit `permissions:` blocks and only grant scopes the job needs.

Examples:

- CI validation jobs: `contents: read`
- issue triage jobs: `issues: write`, `pull-requests: write` only when required
- never grant broad write scopes globally unless necessary

## 3) Copilot cloud agent autonomy settings

Configure in **Settings** → **Copilot** → **Cloud agent**:

- Keep built-in validation tooling enabled.
- Disable **Require approval for workflow runs** if you want no manual approval before workflows run.

> Tradeoff: disabling approval increases automation speed, but relies on workflow hardening and least privilege.

## 4) Pull request policy interactions

Use branch rulesets from `.github/BRANCH_RULESETS.md`.

Key interactions:

- `Require pull request before merge` + required checks keep merges gated.
- `Require Code Owners review` enforces human review for sensitive paths.
- `Automatically request Copilot code review` + `Review new pushes` + `Review draft pull requests` ensures continuous machine review.

## 5) Auto-merge and merge queue

Configure in **Settings** → **General**:

- Enable **Allow auto-merge** to merge conflict-free PRs automatically after requirements pass.
- Optionally enable **merge queue** for serialized protected-branch integration if branch traffic increases.

## 6) Known platform constraints

- Branch rulesets, auto-merge toggles, and Copilot cloud agent approval settings are GitHub UI settings.
- Repository files can document and enforce ownership, but cannot directly apply all UI policy toggles.
- Copilot/agent autonomy still operates within repository permissions, rulesets, and token scopes.

## 7) Practical autonomy checklist

- [ ] Add and keep `.github/CODEOWNERS` current
- [ ] Apply branch rulesets for `main` and `release/*` from `.github/BRANCH_RULESETS.md`
- [ ] Enable Copilot automatic review options in rulesets
- [ ] Configure required CI checks (`Quality checks`, and release-specific checks as needed)
- [ ] Configure Actions + workflow permissions with least privilege
- [ ] Disable Copilot workflow approval requirement (only if you accept the risk tradeoff)
- [ ] Enable auto-merge for conflict-free PR merging
