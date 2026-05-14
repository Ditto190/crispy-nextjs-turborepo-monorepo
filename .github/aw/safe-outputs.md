---
description: Safe-output conventions for this starter monorepo.
---

# Safe outputs

Safe outputs are the only recommended write path for these workflows.

## Starter-safe operations

### `add-labels`

Use for issue triage only. Keep the label set narrow and repo-specific:

- `bug`
- `enhancement`
- `documentation`
- `question`
- `needs-info`
- `needs-reproduction`
- `good-first-issue`

### `add-comment`

Use for short maintainer-facing summaries on issues and PRs.

Recommended comment shape:

1. what was classified or diagnosed
2. why the workflow reached that conclusion
3. the next maintainer or reporter action

### `create-pull-request-review-comment`

Use sparingly for PR review helpers.

- only comment on concrete, changed lines
- keep comments actionable
- prefer a single summary comment when feedback is high-level rather than line-specific

## Avoid in the starter

Do not start with broad write capabilities such as direct pushes, issue closing, or automatic PR approval. Those can be added later once the repo owners are happy with the command-driven helpers.
