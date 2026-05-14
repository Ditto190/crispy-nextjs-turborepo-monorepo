# Branch rulesets for autonomous agents

This repository can store policy docs and CODEOWNERS in git, but **branch rulesets/automerge/approval settings must be configured in GitHub UI**.

Use this as the source-of-truth checklist for `Settings` → `Rules` → `Rulesets`.

## Ruleset strategy

Create 2 branch rulesets:

1. `main-governance-and-copilot-review` (target: `main`)
2. `release-branch-governance` (target: `release/*` and other future protected branches)

Use **Active** enforcement for both.

## Recommended settings (exact)

| Setting | `main` | `release/*` |
| --- | --- | --- |
| Require a pull request before merging | ✅ | ✅ |
| Dismiss stale pull request approvals when new commits are pushed | ✅ | ✅ |
| Require review from Code Owners | ✅ | ✅ |
| Require approval of the most recent reviewable push | ✅ | ✅ |
| Automatically request Copilot code review | ✅ | ✅ |
| Review new pushes | ✅ | ✅ |
| Review draft pull requests | ✅ | ✅ |
| Require status checks to pass before merging | ✅ | ✅ |
| Require branches to be up to date before merging | ✅ | ✅ |
| Block force pushes | ✅ | ✅ |
| Block branch deletion | ✅ | ✅ |

### Required status checks

Set required checks to the CI jobs defined in `.github/workflows/ci-cd.yml`:

- `Quality checks`
- (optional for protected release branches) `Delivery foundation`

> Note: if a check name changes in workflow YAML, update the ruleset immediately.

## Settings for low-friction conflict-free merges

These are configured in **Settings** → **General** (not in repo files):

- Enable **Allow auto-merge**.
- Keep merge method(s) you want (`Squash`, `Merge commit`, `Rebase`) enabled.
- Keep `Require a pull request before merging` enabled in rulesets.

Result:

- Agents can open PRs and keep them updated.
- PRs can merge automatically once required checks/reviews pass and there are no conflicts.

## Allow workflows to run without manual approval

For Copilot cloud agent PRs, configure in **Settings** → **Copilot** → **Cloud agent**:

- Disable **Require approval for workflow runs**.

Security note:

- Only do this with least-privilege workflow `permissions:` and CODEOWNERS protection on `.github/**`.

## Human-controlled safety boundaries (recommended)

Keep these controls human-owned:

- Ruleset edits and bypass lists
- Secrets/environment protection rules
- Changes under `.github/workflows/*`, `.github/**`, and root infra config files (enforced via CODEOWNERS review)

This keeps high autonomy for day-to-day engineering while preserving control over high-risk controls.
