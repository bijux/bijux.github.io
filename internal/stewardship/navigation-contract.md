---
title: Navigation Contract
audience: maintainer
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-12
---

# Navigation Contract

The shared navigation contract is the rule that makes `bijux.io` and the
repository docs feel like one system family.

## Contract

- `Bijux` stays first in every hub strip
- repository keys in `hub_links` match the active repository identifier exactly
- the site tabs reflect the major handbook branches in the current site
- the detail strip reflects the active branch, not the entire repo tree
- scoped sidebar navigation follows the active branch

## Change Rule

When a navigation label or repository identifier changes in one site,
update every site that participates in the shared hub strip. A partial
rename is a broken contract, not a cosmetic mismatch.
