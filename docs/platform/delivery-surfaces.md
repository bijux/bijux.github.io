---
title: Delivery Surfaces
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-12
---

# Delivery Surfaces

A delivery surface is any public, inspectable output through which the
system is used, verified, or reviewed.

## What Counts As Delivery In Bijux

- public documentation that shows ownership, operating routes, and system boundaries
- published software and artifacts that can be traced back to explicit build and release routines
- service and runtime interfaces that are reviewable outside local developer context
- release and operational evidence that shows how quality checks are run, not only claimed

## Delivery Map

```mermaid
graph TD
    delivery["Delivery Surfaces"] --> repos["Repositories"]
    delivery --> docs["Documentation"]
    delivery --> outputs["Published outputs"]
    delivery --> ops["Operational interfaces"]

    repos --> inspectable["Inspectable system"]
    docs --> inspectable
    outputs --> inspectable
    ops --> inspectable
```

## Delivery Classes

| Class | Ownership source | What it includes | What to inspect first |
| --- | --- | --- | --- |
| Documentation | shared standards in `bijux-std`, consumed by repository docs | repository handbooks, docs navigation, and public explanatory routes | whether ownership, boundaries, and operating procedures are explicit and consistent across sites |
| Published software | repository-owned delivery responsibilities | packages, generated artifacts, and versioned release outputs | whether build and release paths are reproducible and reviewable |
| Service interfaces | repository-owned service and runtime boundaries | APIs, runtime interfaces, and user-facing data endpoints | whether interface contracts and behavior expectations are documented clearly |
| Release and ops evidence | repository checks aligned by shared quality standards | CI checks, validation routines, and promotion workflows | whether quality claims are backed by observable checks and traceable evidence |

## Why This Matters Beyond Ops

Delivery is how architecture becomes visible in public. Even if you are
reviewing design rather than operations, delivery surfaces show whether
the stated architecture can be used, verified, and trusted outside the
original implementation team.

## Where Delivery Shows Up

| Surface | What to inspect | Why it is useful |
| --- | --- | --- |
| Repository-owned delivery surfaces | [Bijux Atlas](../projects/bijux-atlas.md) APIs, dataset routes, and release-facing docs | shows where product delivery contracts are owned directly by a delivery repository |
| Shared docs delivery continuity | `bijux.github.io` platform docs and [Masterclass](../learning/index.md) docs routes backed by shared shell standards | shows how documentation delivery stays consistent across separate sites while local content remains independent |
| Contract discipline | repository docs, generated artifacts, schema surfaces, and explicit handbook ownership | serious systems make their interfaces and operating rules visible |
| Release posture | release workflows, published docs, versioned repositories, and visible distribution surfaces | public work should show how it is built, checked, and published |
| Operational thinking | runtime handbooks, validation commands, docs checks, and repository automation | delivery quality is easier to trust when routine checks are part of the workflow |
| Information design | shared docs chrome, stable navigation, scoped handbooks, and repository-specific documentation systems | documentation quality is part of delivery quality, not a separate editorial concern |

## Main Routes

<div class="bijux-panel-grid">
  <div class="bijux-panel"><h3>Core</h3><p>Inspect CLI, DAG, evidence, and release handbooks for runtime and governance delivery boundaries.</p></div>
  <div class="bijux-panel"><h3>Canon</h3><p>Inspect ingest, indexing, reasoning, and orchestration package boundaries in docs and source layout.</p></div>
  <div class="bijux-panel"><h3>Atlas</h3><p>Inspect APIs, datasets, docs checks, and operational routes as maintained product delivery surfaces.</p></div>
</div>

## Where To Inspect

### Fast Checks

- open one repository handbook and verify ownership boundaries are explicit
- open [Public surface](public-surface.md) and confirm destinations map to maintained repositories

### Medium Checks

- inspect package and release workflow docs for clear publication boundaries
- inspect contract or schema references for explicit compatibility promises

### Deep Checks

- follow one release or validation path end to end and confirm reproducible checks
- compare docs claims against automation entry points

## Fast Routes

| If you want to start with... | Open |
| --- | --- |
| public delivery and service posture | [Bijux Atlas](../projects/bijux-atlas.md) |
| runtime governance and repository discipline | [Bijux Core](../projects/bijux-core.md) |
| governed knowledge-system delivery | [Bijux Canon](../projects/bijux-canon.md) |
| stable published destinations | [Public surface](public-surface.md) |

## Open This Page When

- you want direct routes into the strongest delivery-oriented material
- you care more about concrete surfaces than summary alone
- you want to understand why the public docs are treated as part of delivery rather than an afterthought
