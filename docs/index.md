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
  <div class="bijux-hero__eyebrow">systems, services, domain products, and technical education</div>
  <h1 class="bijux-hero__title">A public body of work built around architecture, delivery discipline, and domain-aware engineering.</h1>
  <p class="bijux-hero__lede"><code>bijux.io</code> is the public surface of a deliberately connected portfolio: governed runtime systems, documentation infrastructure, data delivery platforms, applied bioinformatics products, and technical education that is built with the same engineering discipline as the software itself.</p>
  <div class="bijux-signal-row">
    <span class="bijux-signal-pill">platform architecture</span>
    <span class="bijux-signal-pill">data services</span>
    <span class="bijux-signal-pill">bioinformatics products</span>
    <span class="bijux-signal-pill">documentation as product</span>
    <span class="bijux-signal-pill">teaching through systems</span>
  </div>
</section>

<div class="bijux-callout"><strong>Start here when you want to understand the shape of the work before opening a single repository.</strong>
The point of this hub is not to summarize everything into one page. The
point is to make the structure legible enough that a careful reader can
see how platform thinking, delivery discipline, domain products, and
teaching practice reinforce each other across the Bijux ecosystem.</div>

<div class="bijux-panel-grid">
  <div class="bijux-panel"><h3>Systems With Boundaries</h3><p>The repositories are split by responsibility on purpose. Runtime, knowledge systems, delivery surfaces, and domain applications are separated clearly enough that ownership can stay visible under change.</p></div>
  <div class="bijux-panel"><h3>Operationally Serious</h3><p>The public work is not presented as loose experiments. It is documented through contracts, release flows, evidence artifacts, navigation discipline, and repositories that are built to stand up to inspection.</p></div>
  <div class="bijux-panel"><h3>Domain-Aware</h3><p>The platform work does not stop at generic infrastructure. It carries into proteomics, pollenomics, evidence mapping, data products, and learning programs where technical architecture has to meet real subject matter.</p></div>
</div>

<div class="bijux-quicklinks">
<a class="md-button md-button--primary" href="projects/">Browse the work</a>
<a class="md-button" href="platform/">Open the platform narrative</a>
<a class="md-button" href="learning/">Open the learning surface</a>
</div>

## What This Surface Makes Visible

| Area | What a careful reader can see |
| --- | --- |
| Platform engineering | systems are organized by clear ownership, constrained interfaces, and documentation that behaves like part of the product |
| Software engineering | repositories show architectural separation, operational guardrails, release discipline, and maintainable information design |
| Data and service engineering | Atlas, Canon, and Core expose delivery, runtime, evidence, API, and contract thinking as first-class concerns |
| Applied bioinformatics | Proteomics and Pollenomics show how the same engineering posture extends into domain-specific products rather than stopping at infrastructure |

## Navigate By Intent

| If you want to understand... | Open this first |
| --- | --- |
| how the repositories fit together as one engineering system | [Platform overview](platform/index.md) |
| the strongest cross-section of public work | [Project catalog](projects/index.md) |
| how the engineering style carries into teaching | [Learning catalog](learning/index.md) |
| the standards behind the docs shell itself | [Stewardship overview](stewardship/index.md) |

## Fast Reading Paths

<div class="bijux-showcase-grid">
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">for architecture-first readers</div>
    <h2>Start with platform structure</h2>
    <p>Open the system map, then Core and Canon, if you want to assess architecture, system boundaries, and technical judgment first.</p>
    <p><a href="start-here.md">Open reading paths</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">for delivery-focused readers</div>
    <h2>Start with service and proof surfaces</h2>
    <p>Open Delivery Signals, then Atlas, if you care most about operational seriousness, data delivery, and public proof paths.</p>
    <p><a href="start-here.md">Open reading paths</a></p>
  </article>
  <article class="bijux-showcase-card">
    <div class="bijux-showcase-card__eyebrow">for domain and teaching readers</div>
    <h2>Start with scientific and learning work</h2>
    <p>Open Applied Domains, then Proteomics, Pollenomics, and Masterclass, if you want to see how engineering structure survives in specialized contexts.</p>
    <p><a href="start-here.md">Open reading paths</a></p>
  </article>
</div>

## Public Surface Map

```mermaid
flowchart LR
    hub["bijux.io"]
    platform["platform narrative"]
    projects["repository portfolio"]
    learning["learning programs"]
    stewardship["documentation discipline"]
    core["bijux-core"]
    canon["bijux-canon"]
    atlas["bijux-atlas"]
    proteomics["bijux-proteomics"]
    pollenomics["bijux-pollenomics"]
    masterclass["bijux-masterclass"]
    hub --> platform
    hub --> projects
    hub --> learning
    hub --> stewardship
    projects --> core
    projects --> canon
    projects --> atlas
    projects --> proteomics
    projects --> pollenomics
    learning --> masterclass
```

## Main Repositories

| Repository | Role in the system family | Docs |
| --- | --- | --- |
| `bijux-core` | CLI, DAG runtime, repository governance, evidence, and release backbone | [Core docs](https://bijux.io/bijux-core/) |
| `bijux-canon` | governed ingest, retrieval, reasoning, orchestration, and runtime control | [Canon docs](https://bijux.io/bijux-canon/) |
| `bijux-atlas` | data delivery, service interfaces, dataset operations, and docs control-plane behavior | [Atlas docs](https://bijux.io/bijux-atlas/) |
| `bijux-proteomics` | proteomics and discovery-oriented product system | [Proteomics docs](https://bijux.io/bijux-proteomics/) |
| `bijux-pollenomics` | evidence mapping and site-selection product system | [Pollenomics docs](https://bijux.io/bijux-pollenomics/) |
| `bijux-masterclass` | public programs and deep-dive teaching tracks | [Masterclass docs](https://bijux.io/bijux-masterclass/) |

## Reading Rule

Use this page to understand the body of work before choosing a handbook.
Once the owned surface is clear, move into the repository docs and let
the repository prove the details.
