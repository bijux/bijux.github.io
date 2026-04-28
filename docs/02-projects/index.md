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

```mermaid
graph TD
    standards["Shared standards (bijux-std)"] --> projects["Projects"]
    projects["Projects"] --> core["Core"]
    projects --> canon["Canon"]
    projects --> atlas["Atlas"]
    projects --> proteomics["Proteomics"]
    projects --> pollenomics["Pollenomics"]
    projects --> learning["Learning branch reference"]

    learning --> learning_index["Learning index (top-level branch)"]
    standards --> learning_index
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

<div class="bijux-showcase-grid">
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">runtime and governance backbone</div>
    <h2>Bijux Core</h2>
    <p>What it is: the runtime authority repository for CLI and DAG execution.</p>
    <p>Why it exists: to keep execution behavior and governance boundaries explicit.</p>
    <p><a href="bijux-core/index.md">Open Bijux Core</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">governed knowledge system</div>
    <h2>Bijux Canon</h2>
    <p>What it is: the knowledge-system orchestration repository.</p>
    <p>Why it exists: to separate ingest, indexing, reasoning, orchestration, and runtime control into accountable interfaces.</p>
    <p><a href="bijux-canon/index.md">Open Bijux Canon</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">data and service delivery</div>
    <h2>Bijux Atlas</h2>
    <p>What it is: the public delivery-interface repository for APIs, datasets, and publication routes.</p>
    <p>Why it exists: to keep service delivery behavior inspectable and operated as a product surface.</p>
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

| Repository | What each repository covers |
| --- | --- |
| [Bijux Core](bijux-core/index.md) | runtime truth, deterministic execution, and control-plane separation in a stable backbone |
| [Bijux Canon](bijux-canon/index.md) | governed knowledge-system decomposition with explicit package contracts and compatibility surfaces |
| [Bijux Atlas](bijux-atlas/index.md) | data-service delivery treated as operated product architecture with immutable artifact posture |
| [Bijux Proteomics](bijux-proteomics/index.md) | scientific product engineering with explicit evidence governance and domain contracts |
| [Bijux Pollenomics](bijux-pollenomics/index.md) | uncommon domain adaptation that keeps reproducibility and engineering structure visible |

## What This Page Makes Clear

- this is a coherent set of repository ownership boundaries, not disconnected projects
- each repository is responsible for a distinct layer in the broader architecture
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
