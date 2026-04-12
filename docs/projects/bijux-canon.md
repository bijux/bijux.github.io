---
title: Bijux Canon
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-12
---

# Bijux Canon

`bijux-canon` is the governed knowledge-system stack for deterministic
ingest, retrieval, reasoning, orchestration, and controlled runtime
acceptance. It is a clear route into system decomposition around AI and
knowledge workflows.

<div class="bijux-quicklinks">
<a class="md-button md-button--primary" href="https://bijux.io/bijux-canon/">Open published docs</a>
<a class="md-button" href="https://github.com/bijux/bijux-canon">Open GitHub repository</a>
</div>

## Repository Shape

`bijux-canon` resists the usual collapse of ingest, indexing, reasoning,
orchestration, and policy into one blurred "AI platform" layer. The
repository makes those concerns explicit through packages, contracts,
compatibility surfaces, and runtime boundaries that readers can inspect
directly.

## What Lives Here

- a contract-first package family instead of one all-purpose AI library
- explicit separation between ingest, index, reason, agent, and runtime responsibilities
- compatibility handled openly through dedicated package surfaces rather than hidden breaking changes
- release and documentation discipline aligned with the repository layout

## Open Here First

| If you are looking for... | Open this part of Canon |
| --- | --- |
| knowledge-system boundaries | the package map across runtime, ingest, index, reason, and agent surfaces |
| contract discipline | checked-in schemas, package-specific docs, and the repository-owned documentation structure |
| compatibility judgment | the compat packages and consolidation material that keep older names explicit |
| governed execution | runtime and replay language that makes control and verification part of the system model |

## Best Entry Questions

- the question is about ingest, indexing, reasoning, agents, or runtime control
- you want to see how a knowledge system is split into accountable components
- you care whether AI-oriented architecture stays inspectable as the package family grows

## In The Larger Picture

Canon keeps AI and knowledge workflows split into maintained parts
instead of collapsing them into one vague layer. The package boundaries
stay visible all the way out to the public docs.
