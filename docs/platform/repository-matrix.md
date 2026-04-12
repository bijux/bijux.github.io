---
title: Repository Matrix
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-12
---

# Repository Matrix

This matrix is the shortest route to understanding how the public Bijux
repositories differ by responsibility, inspection angle, and recurring
work quality.

## System Family At A Glance

| Repository | Primary responsibility | What it owns publicly | Inspection angle | Start here |
| --- | --- | --- | --- | --- |
| `bijux-core` | execution backbone and repository governance | CLI surfaces, DAG runtime, artifacts, evidence, release rules | runtime authority and operational discipline | [Project page](../projects/bijux-core.md) |
| `bijux-canon` | governed knowledge-system architecture | ingest, indexing, reasoning, orchestration, controlled runtime | AI and knowledge workflows split into accountable components | [Project page](../projects/bijux-canon.md) |
| `bijux-atlas` | data and service delivery | APIs, datasets, reporting, docs-aware control-plane behavior | service architecture and public delivery posture | [Project page](../projects/bijux-atlas.md) |
| `bijux-proteomics` | proteomics-oriented product system | domain workflows, discovery context, scientific product framing | bioinformatics software under real domain pressure | [Project page](../projects/bijux-proteomics.md) |
| `bijux-pollenomics` | evidence mapping and site-selection product system | archaeology-facing narratives, evidence surfaces, domain framing | unusual domain adaptation without structural collapse | [Project page](../projects/bijux-pollenomics.md) |
| `bijux-masterclass` | public technical education | sequenced programs, deep dives, reusable learning structure | technical clarity that remains rigorous enough to teach | [Project page](../projects/bijux-masterclass.md) |

## How The Repositories Work Together

| Layer | Repositories | Why the split stays useful |
| --- | --- | --- |
| backbone | `bijux-core` | execution, evidence, and governance stay visible instead of disappearing into scripts and convention |
| knowledge and service architecture | `bijux-canon`, `bijux-atlas` | knowledge workflows and delivery surfaces can evolve independently without losing system coherence |
| domain products | `bijux-proteomics`, `bijux-pollenomics` | domain systems inherit platform discipline instead of becoming isolated one-off projects |
| learning surface | `bijux-masterclass` | the same engineering language becomes teachable, reusable, and public-facing |

## Quick Routes

| If you are starting from... | Open these repositories first |
| --- | --- |
| platform engineering and runtime design | `bijux-core` -> `bijux-canon` |
| data services and public delivery | `bijux-atlas` -> `bijux-canon` |
| bioinformatics and scientific software | `bijux-proteomics` -> `bijux-pollenomics` |
| technical communication and teaching | `bijux-masterclass` -> `bijux-core` |

## Reading Rule

Use the matrix to choose the right repository quickly. Use the
repository pages and handbook sites when orientation needs to turn into
closer inspection.
