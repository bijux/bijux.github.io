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
is for. Projects remain separate in ownership but aligned through shared
standards in `bijux-std`, so this page gives a quick structural view
before deeper project pages.

Use this page after the Platform branch. It answers a narrower question:
which repository should you open next if you care about runtime,
knowledge systems, delivery interfaces, or domain-heavy product work.

```mermaid
graph TD
    subgraph foundations["Foundations"]
        iac["bijux-iac"]
        std["bijux-std"]
        hub["bijux.github.io"]
    end

    subgraph projects["Projects"]
        core["Core<br/>runtime backbone"]
        canon["Canon<br/>knowledge system"]
        atlas["Atlas<br/>delivery interfaces"]
        proteomics["Proteomics<br/>scientific workflows"]
        pollenomics["Pollenomics<br/>evidence mapping"]
    end

    subgraph learning["Learning reference"]
        learning_index["Learning catalog"]
    end

    iac --> core
    std --> core
    hub --> core
    core --> canon
    core --> atlas
    core --> proteomics
    core --> pollenomics
    canon --> atlas
    hub --> learning_index
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
[Learning catalog](../03-learning/index.md).

The foundations that support all of these are:

- `bijux-iac` for GitHub governance as code
- `bijux-std` for shared standards
- `bijux.github.io` for public route design

<div class="bijux-showcase-grid">
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">runtime and governance backbone</div>
    <h2>Bijux Core</h2>
    <p>What it is: the runtime authority repository for CLI and DAG execution.</p>
    <p>Why it exists: to keep execution behavior and governance boundaries stable under long-term change.</p>
    <p><a href="bijux-core/index.md">Open Bijux Core</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">governed knowledge system</div>
    <h2>Bijux Canon</h2>
    <p>What it is: the knowledge-system orchestration repository.</p>
    <p>Why it exists: to separate ingest, indexing, reasoning, orchestration, and runtime control into durable interfaces.</p>
    <p><a href="bijux-canon/index.md">Open Bijux Canon</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">data and service delivery</div>
    <h2>Bijux Atlas</h2>
    <p>What it is: the public delivery-interface repository for APIs, datasets, and publication routes.</p>
    <p>Why it exists: to keep service delivery behavior operated as a maintained product surface.</p>
    <p><a href="bijux-atlas/index.md">Open Bijux Atlas</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">applied scientific products</div>
    <h2>Bijux Proteomics</h2>
    <p>What it is: the proteomics scientific product repository.</p>
    <p>Why it exists: to apply platform discipline to evidence-heavy discovery workflows.</p>
    <p><a href="bijux-proteomics/index.md">Open Bijux Proteomics</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">evidence and site selection</div>
    <h2>Bijux Pollenomics</h2>
    <p>What it is: the evidence-mapping scientific product repository.</p>
    <p>Why it exists: to keep archaeology/eDNA/aDNA interpretation outputs traceable and reproducible.</p>
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

## What This Page Makes Clear

- this is a coherent set of repository ownership boundaries, not disconnected projects
- each project repository exposes a different kind of technical surface
- the foundation layer stays separate from the project layer on purpose
- architecture, delivery, domain pressure, and learning surfaces are inspectable in public

## Reading Guide

| If you care most about... | Start here |
| --- | --- |
| platform and runtime engineering | [Bijux Core](bijux-core/index.md) |
| governed AI and knowledge systems | [Bijux Canon](bijux-canon/index.md) |
| data delivery and service architecture | [Bijux Atlas](bijux-atlas/index.md) |
| bioinformatics and scientific product work | [Bijux Proteomics](bijux-proteomics/index.md) |
| evidence mapping and field-oriented domain systems | [Bijux Pollenomics](bijux-pollenomics/index.md) |
| teaching and engineering communication | [Learning catalog](../03-learning/index.md) |

## Reading Rule

Use the cards for quick orientation, then open project pages for
repository-owned details and inspection routes.
