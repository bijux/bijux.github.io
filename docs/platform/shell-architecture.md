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

## Project Contract (`extra.bijux`)

Each consuming project is expected to define shell config in `mkdocs.yml`:

```yaml
extra:
  bijux:
    repository: <string>
    hub_links:
      - key: <string>
        label: <string>
        url: <absolute-url>
    nav_mode: default
    theme_key: bijux:theme
```

Field-by-field behavior:

- `repository`: active repository key used for hub-highlight state in shared navigation.
- `hub_links`: cross-repository top-strip link set; each entry drives label and target URL shown in shell chrome.
- `nav_mode`: shell navigation mode selector; `default` is the canonical mode for current shared behavior.
- `theme_key`: shared browser storage key used by theme persistence so dark/light preference carries across Bijux sites.

## Allowed Customization Vs Forbidden Forks

### Allowed Customization

- repository label and hub link labels/URLs in `extra.bijux`
- repository-local documentation content and information architecture below shared shell strips
- repository-local page styling only when it does not fork shared shell contract behavior

### Forbidden Forks

- changing shared shell partial structure in local mirrors
- replacing shared shell runtime logic with project-specific behavior
- changing shared theme persistence contract (`theme_key`) in a way that breaks cross-site continuity
