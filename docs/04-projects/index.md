---
title: Project Catalog
audience: mixed
type: index
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-12
---

# Projects

This is the fastest way to understand what each public Bijux repository
does. Projects stay separate in ownership but aligned through shared
standards in `bijux-std`, so this page gives a structural view before
deeper project pages.

Use this page after Platform when you want the fastest sense of where
each repository belongs.

If your question is still about governance or shared standards, open
[Bijux Infrastructure-as-Code](../02-bijux-iac/index.md) or
[Bijux Standards](../03-bijux-std/index.md) first. Projects begin where
those two shared layers stop and repository-owned runtime, delivery,
knowledge, or domain work takes over.

```mermaid
graph TD
    subgraph foundations["Shared foundations"]
        iac["bijux-iac"]
        std["bijux-std"]
    end

    hub["bijux.github.io<br/>documentation hub"]
    core["bijux-core<br/>shared runtime backbone"]

    subgraph projects["Projects"]
        canon["Canon<br/>knowledge system"]
        atlas["Atlas<br/>delivery interfaces"]
        telecom["Telecom<br/>service systems"]
        genomics["Genomics<br/>rust genomics systems"]
        proteomics["Proteomics<br/>scientific workflows"]
        pollenomics["Pollenomics<br/>evidence mapping"]
    end

    learning_index["Learning catalog"]

    iac --> core
    std --> core
    std --> hub
    iac --> learning_index
    std --> learning_index
    hub --> learning_index
    core --> canon
    core --> atlas
    core --> telecom
    core --> genomics
    core --> proteomics
    core --> pollenomics
```

## Primary Responsibility Clusters

| Capability cluster | Repositories |
| --- | --- |
| runtime authority and execution governance | [Bijux Core](bijux-core/index.md) |
| knowledge-system orchestration and reasoning boundaries | [Bijux Canon](bijux-canon/index.md) |
| public delivery interfaces and service publication | [Bijux Atlas](bijux-atlas/index.md) |
| proteomics scientific product workflows | [Bijux Proteomics](bijux-proteomics/index.md) |
| evidence-mapping product workflows | [Bijux Pollenomics](bijux-pollenomics/index.md) |

Learning is a top-level branch reference, not a peer project repository:
[Learning catalog](../05-learning/index.md).

The foundations that support all of these are:

- [`bijux-iac`](../02-bijux-iac/index.md) for GitHub governance as code
- [`bijux-std`](../03-bijux-std/index.md) for shared standards

The shared runtime backbone for the project family is:

- `bijux-core` for CLI, DAG, evidence, and release discipline reused across projects

The public hub for the family is:

- `bijux.github.io` for documentation and movement across the family

<div class="bijux-showcase-grid">
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">runtime and governance backbone</div>
    <h2>Bijux Core</h2>
    <p>The runtime authority repository for CLI and DAG execution.</p>
    <p>It keeps execution behavior and governance boundaries stable under long-term change.</p>
    <p><a href="bijux-core/index.md">Open Bijux Core</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">governed knowledge system</div>
    <h2>Bijux Canon</h2>
    <p>The knowledge-system orchestration repository.</p>
    <p>It separates ingest, indexing, reasoning, orchestration, and runtime control into durable interfaces.</p>
    <p><a href="bijux-canon/index.md">Open Bijux Canon</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">data and service delivery</div>
    <h2>Bijux Atlas</h2>
    <p>The public delivery-interface repository for APIs, datasets, and publication routes.</p>
    <p>It treats service delivery as a maintained product surface.</p>
    <p><a href="bijux-atlas/index.md">Open Bijux Atlas</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">applied scientific products</div>
    <h2>Bijux Proteomics</h2>
    <p>The proteomics scientific product repository.</p>
    <p>It applies platform discipline to evidence-heavy discovery workflows.</p>
    <p><a href="bijux-proteomics/index.md">Open Bijux Proteomics</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">evidence and site selection</div>
    <h2>Bijux Pollenomics</h2>
    <p>The evidence-mapping scientific product repository.</p>
    <p>It keeps archaeology/eDNA/aDNA interpretation outputs traceable and reproducible.</p>
    <p><a href="bijux-pollenomics/index.md">Open Bijux Pollenomics</a></p>
  </article>
</div>

## Primary Responsibility By Repository

| Repository | Primary job | What you can inspect quickly |
| --- | --- | --- |
| [Bijux Core](bijux-core/index.md) | runtime authority and execution governance | CLI/DAG split, evidence routes, release discipline |
| [Bijux Canon](bijux-canon/index.md) | governed knowledge-system decomposition | ingest/index/reason/orchestrate/runtime layer split |
| [Bijux Atlas](bijux-atlas/index.md) | data-service delivery and operated publication | API, datasets, OpenAPI, reporting, control plane |
| [Bijux Proteomics](bijux-proteomics/index.md) | proteomics scientific product engineering | workflow contracts, evidence posture, lab-facing outputs |
| [Bijux Pollenomics](bijux-pollenomics/index.md) | evidence-mapping scientific product engineering | mapped outputs, report bundles, reproducible evidence handling |

## What This Page Shows

- this is a coherent set of repository ownership boundaries, not disconnected projects
- `bijux-core` is a shared project backbone rather than just one more peer project
- each project repository exposes a different kind of technical surface
- the shared foundations stay separate from both the hub and the project layer on purpose
- architecture, delivery, domain pressure, and learning surfaces are visible in public

## Reading Guide

| If you care most about... | Start here |
| --- | --- |
| shared governance and repo-wide review controls | [Bijux Infrastructure-as-Code](../02-bijux-iac/index.md) |
| shared standards and cross-repository continuity | [Bijux Standards](../03-bijux-std/index.md) |
| platform and runtime engineering | [Bijux Core](bijux-core/index.md) |
| governed AI and knowledge systems | [Bijux Canon](bijux-canon/index.md) |
| data delivery and service architecture | [Bijux Atlas](bijux-atlas/index.md) |
| bioinformatics and scientific product work | [Bijux Proteomics](bijux-proteomics/index.md) |
| evidence mapping and field-oriented domain systems | [Bijux Pollenomics](bijux-pollenomics/index.md) |
| teaching and engineering communication | [Learning catalog](../05-learning/index.md) |

## Reading Rule

Use the cards for quick orientation, then open the project pages for
the repository-owned details.
