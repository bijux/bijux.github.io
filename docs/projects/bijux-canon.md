---
title: Bijux Canon
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-12
---

# Bijux Canon

`bijux-canon` is the repository that turns incoming knowledge sources
into structured, queryable, and runtime-controlled system behavior.

Canon is the repository where Bijux turns raw knowledge inputs into
indexed, reasoned, and runtime-controlled outputs through explicit
engineering layers.

`bijux-canon` is the governed knowledge-system stack for deterministic
ingest, retrieval, reasoning, orchestration, and controlled runtime
acceptance. It is a clear route into system decomposition around AI and
knowledge workflows.

Here, "governed knowledge-system stack" means five linked surfaces with
distinct responsibilities: ingestion, indexing, retrieval and
reasoning, orchestration, and runtime control.

Shared standards note: Canon docs and checks align with the shared
documentation shell and shared quality standards owned in `bijux-std`.

<div class="bijux-quicklinks">
<a class="md-button md-button--primary" href="https://bijux.io/bijux-canon/">View Published Docs</a>
<a class="md-button" href="https://github.com/bijux/bijux-canon">View GitHub Repository</a>
</div>

## Repository Shape

`bijux-canon` is built as explicit layers with accountable interfaces.
Ingest, indexing, reasoning, orchestration, and runtime control are
kept separate through packages, contracts, compatibility surfaces, and
runtime boundaries that readers can inspect directly.
This map shows the package layers as one governed knowledge system.

```mermaid
graph TD
    canon["Bijux Canon"] --> ingest["Ingest"]
    canon --> index["Index"]
    canon --> reasoning["Reasoning"]
    canon --> orchestration["Orchestration"]
    canon --> runtime["Runtime"]

    ingest --> system["Governed knowledge system"]
    index --> system
    reasoning --> system
    orchestration --> system
    runtime --> system
```

Each layer stays explicit so inputs, reasoning, and runtime behavior can
be reviewed as connected but distinct responsibilities.

## Why The Package Split Is Intentional

| Split reason | Why it matters |
| --- | --- |
| layers change at different speeds | ingest, indexing, reasoning, orchestration, and runtime can evolve without forcing synchronized rewrites |
| compatibility is explicit | compat surfaces stay visible instead of hidden migration breakage |
| boundaries are reviewable | each package edge is a public interface, not only an internal convention |
| growth stays bounded | changes in one layer do not force unrelated redesign in others |

## What Each Layer Prevents

- ingest: prevents raw upstream variability from leaking directly into downstream reasoning.
- indexing: prevents retrieval behavior from depending on ad hoc input assumptions.
- retrieval and reasoning: prevents query and decision logic from being mixed with storage and transport details.
- orchestration: prevents execution flow and policy decisions from being hidden inside single-package internals.
- runtime control: prevents acceptance, replay, and verification rules from becoming implicit and unreviewable.

## What Lives Here

- a contract-first package family instead of one all-purpose AI library
- explicit separation between ingest, index, reason, agent, and runtime responsibilities
- compatibility handled openly through dedicated package surfaces rather than hidden breaking changes
- release and documentation discipline aligned with the repository layout

## Where To Begin

| If you are looking for... | Start with this part of Canon |
| --- | --- |
| knowledge-system boundaries | the package map across runtime, ingest, index, reason, and agent surfaces |
| contract discipline | checked-in schemas, package-specific docs, and the repository-owned documentation structure |
| compatibility judgment | the compat packages and consolidation material that keep older names explicit |
| governed execution | runtime and replay language that makes control and verification part of the system model |

## One Path Through The Stack

```mermaid
graph LR
    input["1. Input"] --> structure["2. Structure"]
    structure --> reasoning["3. Reasoning"]
    reasoning --> orchestration["4. Orchestration"]
    orchestration --> runtime["5. Controlled runtime"]
```

Follow this flow to inspect the stack in order: ingest input,
index structure, reasoning behavior, orchestration control, then runtime
acceptance/replay surfaces.

## When This Page Is Most Useful

- the question is about ingest, indexing, reasoning, agents, or runtime control
- you want to see how a knowledge system is split into accountable components
- you care whether AI-oriented architecture stays inspectable as the package family grows

## In The Larger Picture

Canon keeps AI and knowledge workflows split into maintained parts
instead of collapsing them into one vague layer. The package boundaries
stay visible all the way out to the public docs.

Bijux Canon is organized around the idea that knowledge systems stay
durable only when ingest, indexing, reasoning, orchestration, and
runtime responsibilities are separated with intention. Its value is not
the package count alone, but the layered governance model that keeps the
system extensible, inspectable, and coherent as it evolves.
