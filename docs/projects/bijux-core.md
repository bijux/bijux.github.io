---
title: Bijux Core
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-12
---

# Bijux Core

`bijux-core` is the execution and governance backbone for the public
Bijux system family. It is the best starting point when the question is
about runtime authority, repository discipline, or the engineering
machinery that should remain stable beneath higher-level products.

<div class="bijux-quicklinks">
<a class="md-button md-button--primary" href="https://bijux.io/bijux-core/">Open Core docs</a>
<a class="md-button" href="https://github.com/bijux/bijux-core">Open repository</a>
</div>

## Repository Shape

`bijux-core` is where the portfolio becomes harder to dismiss as
presentation. The repository owns the command runtime and DAG execution
backbone that higher-level systems depend on, while keeping governance,
evidence, and release discipline visible in the same public surface.

## What Lives Here

- two distinct products with shared governance: `bijux-cli` and `bijux-dag`
- command and runtime thinking that is explicit rather than hidden in scripts
- evidence, release, and repository control surfaces treated as first-class concerns
- crate and package boundaries that keep execution, artifacts, and governance legible

## Open Here First

| If you are looking for... | Open this part of Core |
| --- | --- |
| runtime authority | the CLI and DAG handbooks, plus the crate split across runtime, artifacts, and app layers |
| repository discipline | release flows, evidence surfaces, and maintainer control-plane material |
| product boundaries | the fact that `bijux-cli` and `bijux-dag` are separate products under one governance backbone |
| traceability | public docs, tagged releases, and repository-owned operating rules that align with the code layout |

## Best Entry Questions

- the question is about CLI behavior, DAG execution, runtime control, or release discipline
- you want the strongest public evidence of platform engineering structure
- you care whether governance and release posture are visible instead of implied

## In The Larger Picture

Core shows that the rest of the portfolio is not resting on vague
infrastructure claims. The backbone is visible, named, and inspectable,
which makes the higher-level product work more credible.
