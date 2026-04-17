---
title: Shell Architecture
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-17
---

# Shell Architecture

The shared shell exists to preserve navigation consistency and reduce
cross-repository drift across Bijux documentation sites.

The shell is the common navigation and explanation layer used across
Bijux docs surfaces. It keeps the top navigation model, style behavior,
and shell runtime rules aligned while allowing each repository to own
its local technical content.

## Purpose

The shell architecture exists so readers can:

- move between repository docs without relearning navigation
- keep orientation when switching between platform, projects, and learning surfaces
- trust that shared UI behavior is deliberate and versioned, not ad hoc per site

## Ownership

Canonical shell source lives under shared ownership:

- `shared/bijux-docs/partials/*`
- `shared/bijux-docs/styles/*`
- `shared/bijux-docs/scripts/*`

Generated mirrors in the local docs tree are synchronized outputs:

- `docs/overrides/partials/*`
- `docs/assets/styles/*`
- `docs/assets/javascripts/shell/*`
- `docs/assets/javascripts/navigation-sync.js`

## What Stays Shared Vs Local

### Shared

- shell partial structure and top navigation behavior
- shell styles and responsive behavior contract
- shell runtime state and navigation JavaScript wiring

### Local

- repository-specific docs pages and handbook content
- domain-specific vocabulary, examples, and technical depth
- repository-owned docs IA below shared shell routes

### Shared-Local Boundary

The shell controls movement and baseline behavior. Repository docs
control local meaning and implementation detail.
