---
title: Applied Domains
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-28
---

# Applied Domains

Applied domains show how the same engineering posture behaves when the
subject matter gets more demanding.

That story starts before the product layer. `bijux-canon` is the
knowledge-system substrate for ingest, indexing, retrieval, and
reasoning. `bijux-proteomics` and `bijux-pollenomics` then carry that
discipline into domain-facing product work.

## Domain Map

```mermaid
graph LR
    foundations["Shared platform discipline"] --> canon["Canon"]
    canon --> proteomics["Proteomics"]
    canon --> pollenomics["Pollenomics"]
    canon --> learning["Reproducible Research"]
```

## Domain Surfaces

| Domain surface | What makes it demanding |
| --- | --- |
| Canon knowledge system | source ingestion, structured indexing, and reasoning have to stay clear enough to support downstream domain systems without turning into one vague layer |
| Proteomics | schema depth and evidence lineage requirements from laboratory workflows shape package boundaries, validation, and publication paths |
| Pollenomics | interpretation complexity across archaeology, eDNA, aDNA, and regional context shapes model design and output structure |
| Learning workflows (Masterclass reproducible research) | reproducibility pressure appears as teachable workflow behavior where reruns, artifact lineage, and review steps are part of the deliverable |

## Why These Domains Matter

The value here is not breadth by itself. The value is that the work
moves between infrastructure, data systems, scientific products, and
teaching without losing structural clarity.

## What Stays The Same

- bounded ownership instead of monolithic responsibility
- interfaces and operational contracts that stay visible
- reproducibility and evidence discipline as non-optional quality criteria

## What Gets Harder

- schema complexity: domain entities, relationships, and constraints become deeper than generic data models
- interpretation burden: outputs must remain understandable to specialists making real decisions
- publication burden: delivery surfaces must preserve context, caveats, and reproducibility in public outputs

## Domain-Driven Repositories

<div class="bijux-panel-grid">
  <div class="bijux-panel"><h3>Bijux Canon</h3><p>A knowledge-system substrate for ingest, indexing, retrieval, reasoning, and runtime control. It sits closer to domain work than pure platform infrastructure and makes the downstream scientific surfaces possible.</p></div>
  <div class="bijux-panel"><h3>Bijux Proteomics</h3><p>A domain product surface for proteomics and discovery work, where engineering structure has to remain clear while serving laboratory and scientific context.</p></div>
  <div class="bijux-panel"><h3>Bijux Pollenomics</h3><p>An evidence-mapping and site-selection surface where technical architecture supports archaeology, eDNA, aDNA, and pollenomics narratives without collapsing into generic geodata language.</p></div>
  <div class="bijux-panel"><h3>Reproducible Research (Masterclass)</h3><p>A learning workflow surface where methods, artifacts, and review steps are taught and executed under the same reproducibility discipline used in repository work.</p></div>
</div>

## Pressure Comparison

| Surface | How pressure shows up |
| --- | --- |
| Canon | ingest, indexing, retrieval, and reasoning need to stay reviewable enough to support multiple downstream domains without collapsing into one opaque stack |
| Proteomics | higher schema complexity for biological entities, stronger evidence lineage requirements, and high error cost in interpretation decisions |
| Pollenomics | heavier interpretation burden across archaeology, eDNA, aDNA, and regional narratives, plus publication pressure for evidence-backed reports |
| Learning (Reproducible Research) | pacing and proof requirements so learners can run workflows, follow the artifacts, and validate reproducibility claims |

## Reading Route

Read the platform pages first for shared rules, then move into the
knowledge and domain repositories to see how those rules hold under
ingest pressure, evidence pressure, interpretation burden, and
publication constraints.
