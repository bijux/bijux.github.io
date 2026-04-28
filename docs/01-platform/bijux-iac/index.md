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

- [Platform overview](../index.md)
- [Repository matrix](../repository-matrix/index.md)
- [Bijux standard layer](../bijux-std/index.md)
