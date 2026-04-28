---
title: Platform Overview
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-12
---

# Platform

Platform explains how the Bijux repository family is held together.

This section shows where governance is owned, where shared standards
are owned, where orientation is owned, and how runtime, delivery,
domain, and learning repositories sit on top of that foundation.

<div class="bijux-callout"><strong>Focus on responsibility before repository count.</strong>
The key question is not how many repositories exist, but why responsibilities are split the way they are.
Runtime governance, knowledge workflows, delivery, domain products, and
learning programs each have their own home, but they still read as one
system.</div>

## Platform Map

```mermaid
graph TD
    context["Operating context"] --> principles["Platform principles"]
    principles --> control["Control plane<br/>bijux-iac"]
    principles --> standards["Shared standards<br/>bijux-std"]
    principles --> hub["Public hub<br/>bijux.github.io"]

    control --> runtime["Runtime and knowledge repos"]
    standards --> runtime
    hub --> runtime

    runtime --> delivery["Delivery and public interfaces"]
    runtime --> domains["Applied domain systems"]
    runtime --> learning["Learning programs"]
```

## Canonical Platform Axes

- context: the operating reasons and constraints behind the repository family
- control plane: how GitHub governance is applied as code
- shared standards: how shell behavior and quality checks stay aligned
- public hub: how readers move through the system without losing ownership
- delivery: how architecture becomes visible through release and public interfaces

## What Belongs Here

- the route between repositories
- the principles that make the split coherent
- the stable route that readers can navigate today

## What Does Not Belong Here

- package-level implementation details
- repository-specific maintainer rules
- course-level teaching detail that already lives in masterclass

## Why This Branch Exists

- show the control-plane, standards, and hub layers before readers dive into implementation repositories
- explain why runtime authority, knowledge architecture, delivery responsibilities, and domain work are split into separate repositories
- keep repository boundaries stable while allowing domain-specific evolution
- make documentation useful for inspection and review, not only orientation
- show where evidence for structure and delivery decisions can be checked directly

## Where To Inspect Evidence

- GitHub governance ownership: [Bijux Infrastructure-as-Code](bijux-iac/index.md)
- shared shell and cross-repository standards: [Bijux standard layer](bijux-std/index.md)
- repository ownership and split intent: [Repository matrix](repository-matrix/index.md)
- layer boundaries and responsibility flow: [System map](system-map/index.md)
- delivery and publication posture: [Delivery surfaces](delivery-surfaces/index.md)
- recurring standards that remain stable across repositories: [Work qualities](work-qualities/index.md)

## Principles

| Principle | What it changes in public |
| --- | --- |
| boundaries before breadth | clear ownership is easier to inspect than a vague super-repository |
| delivery as part of design | documentation, release posture, and public routes should reinforce the architecture rather than decorate it |
| domain pressure belongs in the system | the engineering posture should survive scientific and evidence-heavy contexts, not stop at generic tooling |
| explainability matters | systems that can be taught, sequenced, and documented clearly are usually better understood and easier to operate |

## System Shape

<div class="bijux-panel-grid">
  <div class="bijux-panel"><h3>Control Plane</h3><p>`bijux-iac` keeps GitHub governance visible as code instead of leaving it buried in repository settings.</p></div>
  <div class="bijux-panel"><h3>Hub</h3><p>`bijux.github.io` owns the public route design so readers can move through the repository family without losing responsibility boundaries.</p></div>
  <div class="bijux-panel"><h3>Core</h3><p>The execution and governance backbone for command surfaces, DAG behavior, evidence, and repository discipline.</p></div>
  <div class="bijux-panel"><h3>Canon</h3><p>The governed knowledge-system stack for ingest, indexing, reasoning, orchestration, and controlled runtime behavior.</p></div>
  <div class="bijux-panel"><h3>Atlas</h3><p>The delivery and control-plane surface for APIs, datasets, docs-aware checks, and operational reporting.</p></div>
  <div class="bijux-panel"><h3>Bijux Standard Layer</h3><p>The shared standards source for documentation shell continuity, cross-repository checks, and shared make behavior.</p></div>
  <div class="bijux-panel"><h3>Products And Programs</h3><p>Proteomics, Pollenomics, and Masterclass show the same architectural discipline under domain work and technical education.</p></div>
</div>

## System Reading Order

| Read this first when you need to understand... | Open |
| --- | --- |
| where live GitHub governance is owned and enforced | [Bijux Infrastructure-as-Code](bijux-iac/index.md) |
| where shared standards are defined and verified across repositories | [Bijux standard layer](bijux-std/index.md) |
| which qualities recur across the public work | [Work qualities](work-qualities/index.md) |
| the layered structure of the whole public system family | [System map](system-map/index.md) |
| the repository split at a glance | [Repository matrix](repository-matrix/index.md) |
| where delivery work shows up most clearly across the repositories | [Delivery surfaces](delivery-surfaces/index.md) |
| how the engineering extends into domain-heavy product work | [Applied domains](applied-domains/index.md) |
| the broader operating context behind the current repository family | [Operating context](operating-context/index.md) |
| why the docs shell is shared instead of duplicated carelessly | [Documentation network](documentation-network/index.md) |
| which public destinations exist today | [Public surface](public-surface/index.md) |
