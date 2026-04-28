---
title: Bijux Standard
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-17
---

# Bijux Standard

`bijux-std` is the shared standards repository for the Bijux system
family.

It defines the parts of the ecosystem that are meant to stay aligned
across multiple repositories and sites: the shared documentation shell,
the shared Python-oriented make layer, and the shared compliance and
sync checks used in CI.

It is the shared standards layer that keeps the public system coherent.

This branch explains how repeated repository behavior becomes shared
infrastructure instead of staying trapped as local convention.

## Why It Matters In Public

Without a visible standards layer, readers can see the repositories but
not the mechanism that keeps them coherent.

`bijux-std` makes that mechanism inspectable:

- shared presentation has a named source
- repeated workflow behavior has a reviewable home
- cross-repository checks stop being folklore
- standardization follows real usage instead of abstract policy

## What A Reader Can Infer Quickly

| If you inspect... | You can infer... |
| --- | --- |
| shared shell assets and manifests | continuity across sites is engineered deliberately |
| shared make behavior and checks | repository quality is being treated as a repeatable system |
| promotion rules for new standards | standardization is earned from usage rather than declared too early |

## Why It Exists

The Bijux repositories are split by responsibility. That split only
holds if the shared layer has a clear home. Without a standards
repository, shell behavior, make logic, and cross-repository checks
drift over time. `bijux-std` keeps those shared parts defined,
synchronized, and verified in one place.

## What It Owns

`bijux-std` owns the cross-repository standards layer.

That includes:

- shared documentation shell assets
- shared Python-oriented make modules
- shared compliance and update checks
- canonical manifests used to verify shared directory integrity

The rule behind that ownership is simple: something becomes part of
`bijux-std` after it is already being used in a similar and stable way
across repositories.

## What It Does Not Own

`bijux-std` does **not** own:

- runtime logic from `bijux-core`
- knowledge-system architecture from `bijux-canon`
- delivery products from `bijux-atlas`
- domain software from `bijux-proteomics` or `bijux-pollenomics`
- course content from `bijux-masterclass`

Those remain owned by the repositories that implement them.

## How It Fits The Architecture

```mermaid
graph TD
    std["bijux-std"] --> shell["shared docs shell"]
    std --> checks["shared checks"]
    std --> makes["shared make layer"]

    shell --> hub["bijux.github.io"]
    shell --> projectdocs["project docs sites"]
    shell --> masterclass["bijux-masterclass"]

    checks --> hub
    checks --> projectdocs

    makes --> repos["Python-oriented repositories"]
```

In plain language:

- the repositories keep their own responsibilities
- `bijux-std` keeps the shared layer consistent across them
- the docs surfaces and CI checks stay aligned without collapsing
  everything into one repository

## What It Changes Across The Family

When `bijux-std` is doing its job well:

- repositories still feel local, but shared behavior stops drifting
- docs sites read as one family without flattening their content
- repeated automation becomes easier to trust and easier to evolve
- standards move upstream only after they are real enough to deserve it

## Promotion Model

Shared behavior is promoted into `bijux-std` after the pattern is
already visible across repositories.

Today that is most mature in the Python-oriented group:

- shared make behavior already exists across repositories such as `bijux-canon`, `bijux-proteomics`, and `bijux-pollenomics`
- documentation shell behavior and baseline checks are already shared across the public family

For the Rust-oriented repositories, the same rule still applies:

- common gates and make behavior should emerge across the Rust repositories first
- once those patterns are stable and clearly shared, they can be promoted into `bijux-std`
- the goal is consistency from real usage, not premature standardization

## Shared Vs Local

| Layer | Owned by |
| --- | --- |
| shared docs shell and compliance contract | `bijux-std` |
| repository docs meaning and page content | the consuming repository |
| domain logic, runtime logic, and product behavior | the consuming repository |

This separation gives Bijux continuity across sites and repositories
without erasing local ownership.

## Consumption Model

The normal flow is simple:

1. shared standards are updated in `bijux-std`
2. consuming repositories synchronize the shared layer locally
3. checks verify that local copies still match the standard
4. each repository publishes its own docs and keeps ownership of its own content

Operational commands in consuming repositories:

- `make bijux-std-update`
- `make bijux-std-checks`

## What It Changes Across The System

If the shared layer is working well:

- navigation stays coherent
- shell behavior remains predictable
- documentation presentation stays consistent
- repositories remain locally owned without fragmenting the public system

## Where To Go Next

- [Documentation Network](../01-platform/documentation-network/index.md)
- [Shell Architecture](../01-platform/shell-architecture/index.md)
- [Repository Matrix](../01-platform/repository-matrix/index.md)

## In One Sentence

`bijux-std` is the shared standards layer that keeps the Bijux
ecosystem consistent across documentation, automation, and CI-verifiable
repository behavior.
