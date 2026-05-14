---
name: code-management-branch-protection-rules
description: Imported TRAE skill from code_management/Branch_Protection_Rules.md
---

# Branch Protection Rules

## Overview
Protect critical branches (main, develop) from accidental deletion or bad code.

## Key Settings (GitHub/GitLab)
1. **Require Pull Request Reviews**: Require at least 1 or 2 approvals before merging.
2. **Require Status Checks**: Ensure CI pipelines (tests, lint) pass before merging.
3. **Require Signed Commits**: Verify commit signatures.
4. **Prevent Force Pushes**: Disable force pushing to protected branches.
5. **Include Administrators**: Apply rules to admins as well.

