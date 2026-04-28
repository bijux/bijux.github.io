---
title: Bijux Infrastructure-as-Code
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-28
---

# Bijux Infrastructure-as-Code

`bijux-iac` is the live GitHub control-plane repository for the Bijux
repository family.

`iac` stands for `Infrastructure-as-Code`.

Here that means GitHub administration is declared, reviewed, and
applied in code instead of being left to hidden settings pages.

This branch explains the part of the Bijux system that acts on
repositories from the outside. It is the control plane for the family,
not another product repository.

## Why It Matters In Public

Strong repository architecture is hard to trust if the merge rules,
required checks, and protection model only exist as invisible admin
settings.

`bijux-iac` makes those controls inspectable:

- repository governance is declared in source
- control-plane changes follow the same review path as the repositories they govern
- `main` protection, required checks, and policy rollout stop being private context

## What A Reader Can Infer Quickly

| If you inspect... | You can infer... |
| --- | --- |
| repository inventory and policy surfaces | governance is being treated as an owned system, not as scattered settings |
| Terraform-managed GitHub controls | the family is designed to scale without losing review discipline |
| the relationship to `bijux-std` | control-plane policy and shared repository content are separated on purpose |

## What It Owns

`bijux-iac` owns the settings that act on repositories from the outside.

That includes:

- branch protection and merge rules
- required status checks
- repository governance inventory
- Terraform-managed GitHub policy surfaces
- the GitHub control plane applied across the Bijux repository family

## What It Does Not Own

`bijux-iac` does not own the files that repositories synchronize into
themselves. Those belong to `bijux-std`.

The split is direct:

- `bijux-iac` owns live GitHub control-plane policy
- `bijux-std` owns shared repository content
- `bijux-iac` still consumes shared standards from `bijux-std` like the other repositories

## What It Changes Across The Family

When `bijux-iac` is doing its job well:

- repositories inherit the same merge discipline instead of drifting apart
- shared foundations stay governed by the same rules as consuming repositories
- rollout decisions become visible and reversible
- platform standards can be enforced without pretending governance is part of app code

## How It Fits

```mermaid
graph TD
    iac["bijux-iac"] --> github["live GitHub policy"]
    std["bijux-std"] --> iacrepo["shared standards consumed by bijux-iac"]
    std --> repos["shared repo content"]
    hub["bijux.github.io"] --> readers["public orientation"]

    github --> repos
    github --> iacrepo
    std --> hub
    repos --> hub
```

In practice:

- `bijux-iac` decides how repositories are governed in GitHub
- `bijux-std` decides which shared files and shared checks stay aligned
- each repository still owns its own product, runtime, domain, or learning work

## Current Scope

Right now `bijux-iac` starts with `main` branch protection for the
public Bijux repositories. The scope is intentionally narrow: establish
the control plane first, then expand into more GitHub governance
surfaces over time.

## Where To Go Next

- [Platform overview](../01-platform/index.md)
- [Repository matrix](../01-platform/repository-matrix/index.md)
- [Bijux standard layer](../03-bijux-std/index.md)
