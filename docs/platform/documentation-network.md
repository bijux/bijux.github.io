---
title: Documentation Network
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-12
---

# Documentation Network

The documentation network works only if every site behaves like part of
the same system family. Readers should be able to jump between repos and
keep the same mental model for where they are and what to do next.

<div class="bijux-callout"><strong>Documentation is part of the product surface here.</strong>
The shared shell matters because the portfolio is trying to prove
delivery and systems thinking, not just collect screenshots of separate
repositories. Navigation consistency is one way that engineering quality
becomes visible to readers.</div>

## Shared Navigation Contract

- the hub strip moves between repositories
- the site tabs move between the major handbook branches in the current site
- the detail strip narrows to the active branch within the current site
- the left navigation stays scoped to the active branch instead of showing the whole tree at once

## Why This Matters

Without a shared shell, the root site becomes a brochure and each repo
becomes an island. With a shared shell, the root site is a real starting
point and every handbook feels like part of the same documentation
product.

## Reader Path

1. Start at the hub when the owned repository is not obvious yet.
2. Move into the repository handbook that owns the concern.
3. Stay inside the same chrome while moving deeper into that site.

## Maintenance Rule

If the hub describes a repository, the destination repository should
still expose the same top-strip navigation and stable public URL.
