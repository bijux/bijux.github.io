---
title: Platform Overview
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-12
---

# Platform

The public Bijux surface is intentionally split by responsibility. The
hub should explain the shape of the system family without flattening the
differences that each repository owns.

## Platform Shape

<div class="bijux-panel-grid">
  <div class="bijux-panel"><h3>Core</h3><p>The execution and governance backbone for commands, DAG behavior, evidence, and repository discipline.</p></div>
  <div class="bijux-panel"><h3>Canon</h3><p>The governed knowledge-system stack for ingest, indexing, reasoning, orchestration, and runtime acceptance.</p></div>
  <div class="bijux-panel"><h3>Atlas</h3><p>The delivery and control-plane surface for APIs, datasets, docs UX checks, and operational reporting.</p></div>
</div>

## Domain Products

- `bijux-proteomics` applies the platform to proteomics and discovery work.
- `bijux-pollenomics` applies it to evidence mapping, archaeology, and site selection.
- `bijux-masterclass` turns the same discipline into public learning material.

## What Belongs Here

- the route between repositories
- the reason the docs shell is shared
- the stable public surface that readers can navigate today

## What Does Not Belong Here

- package-level implementation details
- repository-specific maintainer rules
- course-level teaching detail that already lives in masterclass
