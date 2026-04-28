---
title: Repository Coverage
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-28
---

# Repository Coverage

`bijux-iac` governs a repository family, not a single codebase. The
coverage model is therefore grouped by role instead of by one flat list
of unrelated repositories.

## Coverage Map

```mermaid
graph TD
    iac["bijux-iac"] --> foundations["shared foundations"]
    iac --> web["web and documentation repos"]
    iac --> python["python-oriented repos"]
    iac --> rust["rust-oriented repos"]

    foundations --> std["bijux-std"]
    foundations --> hub["bijux.github.io"]

    web --> masterclass["bijux-masterclass"]

    python --> canon["bijux-canon"]
    python --> proteomics["bijux-proteomics"]
    python --> pollenomics["bijux-pollenomics"]

    rust --> core["bijux-core"]
    rust --> atlas["bijux-atlas"]
    rust --> telecom["bijux-telecom"]
    rust --> genomics["bijux-genomics"]
```

## Why Coverage Is Grouped

Each group shares similar workflow pressure:

- the foundations need the strictest review posture because they act on the rest of the family
- web and docs repositories need stable publication and review behavior
- Python-oriented repositories already share more mature standards behavior
- Rust-oriented repositories are converging toward stronger shared gates without pretending they are identical today

## Rollout Rule

The control plane should expand when the repository group is ready for a
clear, durable rule. That keeps governance real instead of aspirational.

In practice:

- stable rules should land first in the foundations
- repeated patterns should then move across adjacent repositories
- repository-specific exceptions should stay narrow and temporary
- shared policy should widen only when the workflow is mature enough to deserve enforcement

## Continue Reading

- [Governance Model](../governance-model/index.md)
- [Bijux Standards](../../03-bijux-std/index.md)
- [Repository Matrix](../../01-platform/repository-matrix/index.md)
