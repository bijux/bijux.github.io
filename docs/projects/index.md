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
is for.

This section offers a concentrated cross-section of the work itself.
Each repository below reveals a different part of the same system
family through a different responsibility.
This map provides a quick structural view before diving into individual
project pages.
Projects remain separate in ownership but aligned through shared
standards in `bijux-std`.

```mermaid
graph TD
    standards["Shared standards (`bijux-std`)"] --> projects["Projects"]
    projects["Projects"] --> core["Core"]
    projects --> canon["Canon"]
    projects --> atlas["Atlas"]
    projects --> proteomics["Proteomics"]
    projects --> pollenomics["Pollenomics"]
    projects --> learning["Learning branch reference"]

    learning --> learning_index["Learning index (top-level branch)"]
    standards --> learning_index
```

It can serve as orientation before moving to the project pages for
repository-specific detail and inspection routes.

## Capability Clusters

| Capability cluster | Repositories |
| --- | --- |
| runtime authority and execution governance | [Bijux Core](bijux-core.md) |
| knowledge-system orchestration and reasoning boundaries | [Bijux Canon](bijux-canon.md) |
| public delivery interfaces and service publication | [Bijux Atlas](bijux-atlas.md) |
| proteomics scientific product workflows | [Bijux Proteomics](bijux-proteomics.md) |
| evidence-mapping product workflows | [Bijux Pollenomics](bijux-pollenomics.md) |
| learning branch route (top-level, not a project repository) | [Learning catalog](../learning/index.md) |

<div class="bijux-showcase-grid">
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">runtime and governance backbone</div>
    <h2>Bijux Core</h2>
    <p>What it is: the runtime authority repository for CLI and DAG execution.</p>
    <p>Why it exists: to keep execution behavior and governance boundaries explicit.</p>
    <p>Where to inspect first: [Bijux Core project page](bijux-core/).</p>
    <div class="bijux-tag-list">
      <span class="bijux-tag">cli</span>
      <span class="bijux-tag">runtime</span>
      <span class="bijux-tag">governance</span>
    </div>
    <p><a href="bijux-core/">Read the project page</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">governed knowledge system</div>
    <h2>Bijux Canon</h2>
    <p>What it is: the knowledge-system orchestration repository.</p>
    <p>Why it exists: to separate ingest, indexing, reasoning, orchestration, and runtime control into accountable interfaces.</p>
    <p>Where to inspect first: [Bijux Canon project page](bijux-canon/).</p>
    <div class="bijux-tag-list">
      <span class="bijux-tag">ingest</span>
      <span class="bijux-tag">reasoning</span>
      <span class="bijux-tag">agents</span>
    </div>
    <p><a href="bijux-canon/">Read the project page</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">data and service delivery</div>
    <h2>Bijux Atlas</h2>
    <p>What it is: the public delivery-interface repository for APIs, datasets, and publication routes.</p>
    <p>Why it exists: to keep service delivery behavior inspectable and operated as a product surface.</p>
    <p>Where to inspect first: [Bijux Atlas project page](bijux-atlas/).</p>
    <div class="bijux-tag-list">
      <span class="bijux-tag">api</span>
      <span class="bijux-tag">datasets</span>
      <span class="bijux-tag">operations</span>
    </div>
    <p><a href="bijux-atlas/">Read the project page</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">applied scientific products</div>
    <h2>Bijux Proteomics</h2>
    <p>What it is: the proteomics scientific product repository.</p>
    <p>Why it exists: to apply platform discipline to evidence-heavy discovery workflows.</p>
    <p>Where to inspect first: [Bijux Proteomics project page](bijux-proteomics/).</p>
    <div class="bijux-tag-list">
      <span class="bijux-tag">proteomics</span>
      <span class="bijux-tag">product</span>
      <span class="bijux-tag">scientific software</span>
    </div>
    <p><a href="bijux-proteomics/">Read the project page</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">evidence and site selection</div>
    <h2>Bijux Pollenomics</h2>
    <p>What it is: the evidence-mapping scientific product repository.</p>
    <p>Why it exists: to keep archaeology/eDNA/aDNA interpretation outputs traceable and reproducible.</p>
    <p>Where to inspect first: [Bijux Pollenomics project page](bijux-pollenomics/).</p>
    <div class="bijux-tag-list">
      <span class="bijux-tag">pollenomics</span>
      <span class="bijux-tag">evidence mapping</span>
      <span class="bijux-tag">archaeology</span>
    </div>
    <p><a href="bijux-pollenomics/">Read the project page</a></p>
  </article>
</div>

## What Each Repository Demonstrates

| Repository | What it demonstrates |
| --- | --- |
| [Bijux Core](bijux-core.md) | runtime truth, deterministic execution, and control-plane separation in a stable backbone |
| [Bijux Canon](bijux-canon.md) | governed knowledge-system decomposition with explicit package contracts and compatibility surfaces |
| [Bijux Atlas](bijux-atlas.md) | data-service delivery treated as operated product architecture with immutable artifact posture |
| [Bijux Proteomics](bijux-proteomics.md) | scientific product engineering with explicit evidence governance and domain contracts |
| [Bijux Pollenomics](bijux-pollenomics.md) | uncommon domain adaptation that keeps reproducibility and engineering structure visible |

## What This Page Makes Clear

- this is a coherent set of repository ownership boundaries, not disconnected projects
- each repository is responsible for a distinct layer in the broader architecture
- architecture, delivery, domain pressure, and learning surfaces are inspectable in public

## Reading Guide

| If you care most about... | Start here |
| --- | --- |
| platform and runtime engineering | [Bijux Core](bijux-core.md) |
| governed AI and knowledge systems | [Bijux Canon](bijux-canon.md) |
| data delivery and service architecture | [Bijux Atlas](bijux-atlas.md) |
| bioinformatics and scientific product work | [Bijux Proteomics](bijux-proteomics.md) |
| evidence mapping and field-oriented domain systems | [Bijux Pollenomics](bijux-pollenomics.md) |
| teaching and engineering communication | [Learning catalog](../learning/index.md) |

## Reading Rule

The cards provide orientation, and the project pages offer a closer view
of what each repository owns.

The projects branch is meant to be read as a coherent family of systems
rather than disconnected experiments. Each repository owns a distinct
slice of runtime, delivery, domain, or learning responsibility, and
together they show a consistent pattern of boundary design, explanation,
and system-level engineering judgment.
