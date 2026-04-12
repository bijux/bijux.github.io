---
title: Bijux Documentation Hub
audience: mixed
type: index
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-12
---

# Bijux

<section class="bijux-hero">
  <div class="bijux-hero__eyebrow">runtime systems, data delivery, scientific products, and technical education</div>
  <h1 class="bijux-hero__title">Architecture, delivery, and domain work made inspectable.</h1>
  <p class="bijux-hero__lede"><code>bijux.io</code> is the public map of the Bijux body of work: execution and governance systems, knowledge and data services, applied bioinformatics products, and technical programs. It is organized so readers can move from a concise overview into repository handbooks, published destinations, and source surfaces without losing the thread.</p>
  <div class="bijux-signal-row">
    <span class="bijux-signal-pill">platform architecture</span>
    <span class="bijux-signal-pill">runtime governance</span>
    <span class="bijux-signal-pill">data-service design</span>
    <span class="bijux-signal-pill">bioinformatics software</span>
    <span class="bijux-signal-pill">documentation as delivery</span>
    <span class="bijux-signal-pill">teaching through systems</span>
  </div>
</section>

<div class="bijux-callout"><strong>This hub works best as a route into the work, not a substitute for it.</strong>
Use it to understand the repository family, choose the right entry
point, and then move into the documentation and source surfaces that own
the details.</div>

<div class="bijux-panel-grid">
  <div class="bijux-panel"><h3>Boundaries That Survive Change</h3><p>Core, Canon, Atlas, and the domain repositories are split by real responsibility. Runtime control, knowledge workflows, delivery surfaces, and scientific products are separate enough that ownership stays legible when the system grows.</p></div>
  <div class="bijux-panel"><h3>Public Work With Operating Surfaces</h3><p>The site routes into repository handbooks, published docs, source repositories, and maintained destinations. The emphasis is on material that can be opened and checked directly.</p></div>
  <div class="bijux-panel"><h3>Domain Pressure, Not Generic Demos</h3><p>The engineering posture carries into proteomics, pollenomics, evidence mapping, and technical education. The same structure has to survive subject-matter constraints, not just generic infrastructure language.</p></div>
  <div class="bijux-panel"><h3>Depth That Travels</h3><p>The same body of work also appears as technical programs and course books. That keeps implementation, explanation, and long-term documentation close to one another instead of splitting them into unrelated surfaces.</p></div>
</div>

<div class="bijux-quicklinks">
<a class="md-button md-button--primary" href="projects/">Browse the repositories</a>
<a class="md-button" href="platform/">Inspect the platform story</a>
<a class="md-button" href="reading-paths/">Choose a reading path</a>
</div>

## What Lives Here

| If you want to understand... | Open this first | What you will find |
| --- | --- |
| how the repositories fit together | [Platform overview](platform/index.md) -> [System map](platform/system-map.md) | the split across runtime, knowledge, delivery, and domain work |
| how delivery shows up publicly | [Delivery signals](platform/delivery-signals.md) -> [Bijux Atlas](projects/bijux-atlas.md) | documentation, published destinations, and operated service surfaces |
| how the work behaves under domain pressure | [Applied domains](platform/applied-domains.md) -> [Bijux Proteomics](projects/bijux-proteomics.md) -> [Bijux Pollenomics](projects/bijux-pollenomics.md) | scientific and evidence-heavy product systems |
| how the technical style carries into teaching | [Learning catalog](learning/index.md) -> [Bijux Masterclass](projects/bijux-masterclass.md) | course books and programs built around the same technical language |

## Read This Site As

- the repositories form a system family instead of a loose namespace
- architecture is visible through boundaries, not claimed through titles
- delivery discipline shows up in documentation, navigation, and published destinations
- the work remains structured when it moves into scientific and educational contexts

## Where To Start

<div class="bijux-showcase-grid">
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">for architecture-first readers</div>
    <h2>Start with the system split</h2>
    <p>Open the system map, then Core and Canon, if you want to start with boundaries, runtime structure, and repository ownership.</p>
    <p><a href="reading-paths.md">Open the reading paths</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">for delivery-focused readers</div>
    <h2>Start with delivery surfaces</h2>
    <p>Open Delivery Signals, then Atlas, if you care most about service design, operational visibility, documentation quality, and published destinations.</p>
    <p><a href="reading-paths.md">Open the reading paths</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">for domain and teaching readers</div>
    <h2>Start where the work gets harder</h2>
    <p>Open Applied Domains, then Proteomics, Pollenomics, and Masterclass, if you want to see how the same structure carries into scientific context and public teaching.</p>
    <p><a href="reading-paths.md">Open the reading paths</a></p>
  </article>
</div>

## Portfolio Map

```mermaid
flowchart LR
    hub["bijux.io"]
    platform["platform argument"]
    projects["repository case studies"]
    learning["technical programs"]
    core["bijux-core"]
    canon["bijux-canon"]
    atlas["bijux-atlas"]
    proteomics["bijux-proteomics"]
    pollenomics["bijux-pollenomics"]
    masterclass["bijux-masterclass"]
    hub --> platform
    hub --> projects
    hub --> learning
    projects --> core
    projects --> canon
    projects --> atlas
    projects --> proteomics
    projects --> pollenomics
    learning --> masterclass
```

## Repository Family

| Repository | Role in the system family | Public entry point |
| --- | --- | --- |
| `bijux-core` | execution and governance backbone | CLI, DAG, evidence, and release surfaces |
| `bijux-canon` | governed knowledge-system stack | ingest, indexing, reasoning, orchestration, and controlled runtime behavior |
| `bijux-atlas` | data and service delivery surface | APIs, datasets, reporting, and docs-aware operations |
| `bijux-proteomics` | scientific product system | proteomics-oriented packages and runtime surfaces |
| `bijux-pollenomics` | evidence mapping product system | Nordic atlas outputs, tracked data, and report publication |
| `bijux-masterclass` | public learning surface | course books and long-form technical programs |

## Reading Rule

Use this page to choose where to inspect first. Once the strongest route
is clear, move into the repository handbooks and let the public systems
prove the depth.
