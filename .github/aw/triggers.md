---
description: Recommended trigger choices for the starter gh-aw workflows in this repository.
---

# Trigger recommendations

Keep the starter conservative and public-repo friendly.

## Recommended defaults

| Use case | Recommended trigger | Why |
| --- | --- | --- |
| issue triage | `issues` on `opened`, `reopened` | fast automatic classification with bounded write actions |
| PR review helper | `slash_command` on `pull_request_comment` | avoids noisy unsolicited comments on every push |
| debug helper | `slash_command` on `issues`, `pull_request_comment` | supports both reported failures and CI follow-up from a PR |

## When to expand later

Consider broader triggers only after the starter proves useful:

- automatic `pull_request` review comments on every push
- `workflow_run` debugging summaries for `CI/CD`
- scheduled backlog triage for unlabeled issues

## Security notes

- Treat issue and PR text as untrusted even in same-repo events
- Prefer command-driven review/debug workflows for public repos
- If you later enable forked PR triggers, keep permissions read-only and keep all writes behind `safe-outputs`
