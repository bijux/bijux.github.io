---
title: Bijux Standard Layer
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-17
---

# Bijux Standard Layer

`bijux-std` is the shared standards repository for the Bijux system
family.

It defines the cross-repository standards layer that should stay
aligned across Bijux repositories and public docs surfaces.

## Why It Exists

Bijux repositories are intentionally split by responsibility.

That split remains coherent only if the shared layer is also explicit.
Without a standards source, shared shell behavior, shared checks, and
shared automation drift quietly over time.

`bijux-std` exists to keep those shared expectations defined once and
managed deliberately.

## What It Owns

`bijux-std` owns the parts of the ecosystem meant to remain shared
across multiple repositories:

- shared documentation shell assets
- shared compliance and sync checks
- shared Python-oriented make modules
- canonical manifests used to verify shared directory integrity

## What It Does Not Own

`bijux-std` does not own:

- runtime implementation from `bijux-core`
- knowledge-system implementation from `bijux-canon`
- delivery products from `bijux-atlas`
- domain implementation from `bijux-proteomics` and `bijux-pollenomics`
- learning content from `bijux-masterclass`

It owns shared standards, not repository-specific product or domain
logic.
