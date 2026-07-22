---
title: Standards Adoption Model
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-07-22
---

# Standards Adoption Model

A shared standard moves through two independent decisions: acceptance in
`bijux-std` and adoption in each consuming repository. This prevents one merge
from silently mutating the entire repository family.

## From Local Invariant To Shared Contract

```mermaid
flowchart TD
    local["Repository-owned invariant"] --> repeat{"Needed unchanged elsewhere?"}
    repeat -->|no| remain["Remain product-owned"]
    repeat -->|yes| contract["Define shared contract"]
    contract --> implementation["Canonical implementation and tests"]
    implementation --> digest["Generated surfaces and package digest"]
    digest --> review["Standards review and CI"]
    review --> accepted["Accepted immutable commit"]
```

Reuse alone is not enough. A candidate belongs in the standards layer only
when its meaning can remain stable across consumers and local divergence would
represent a defect.

## Qualification Questions

| Question | Standardize when | Keep local when |
| --- | --- | --- |
| Is the invariant cross-repository? | consumers need the same semantics | the behavior expresses one product's contract |
| Is the interface stable? | inputs, outputs, and failures can be described precisely | the design is still exploratory |
| Can consumers verify it? | adoption has deterministic checks | success depends on undocumented local state |
| Can it be selected coherently? | it belongs to a capability with clear dependencies | it requires arbitrary individual-file choices |
| Is ownership unambiguous? | canonical fixes have one durable home | consumers would still need incompatible forks |

## Source Acceptance

The canonical change includes every inseparable part of the invariant:

- implementation;
- executable contract or test;
- generated output where applicable;
- package and managed-file digests;
- documentation of inputs, effects, failure behavior, and extension points.

Standards CI validates the source, contract tests, reports, pinned actions,
generated configuration, and repository policy. The merged commit becomes the
immutable source identity available to consumers.

## Consumer Adoption

```mermaid
flowchart LR
    accepted["Accepted commit SHA"] --> resolve["Resolve declared capabilities"]
    resolve --> stage["Stage vendored snapshot"]
    stage --> checks["Verify digests and contracts"]
    checks --> product["Run repository-specific gates"]
    product --> review["Review consumer diff"]
    review --> merge["Adopt in consumer"]
```

The consumer records the exact upstream commit, reviews the managed diff,
recomputes its checksum manifest, and runs both standards and product checks.
An accepted standard can therefore be valid upstream yet unsuitable for one
consumer until a compatibility issue is resolved.

## Generated Content

Managed consumer files are outputs of a manifest, generator, or canonical
package. Hand-editing them breaks the source relationship and creates a local
fork with no durable repair path.

When a generated surface is wrong:

1. identify the canonical source or typed manifest;
2. correct and validate it in `bijux-std`;
3. accept that change through standards review;
4. refresh the consumer from the accepted commit;
5. validate the consumer in its own context.

## Exceptions

A repository-specific difference is legitimate when it represents product
meaning rather than a shared-infrastructure defect. It should be implemented
as an explicit extension or local policy, not as an untracked mutation of a
managed file.

Temporary local exceptions weaken reproducibility because the consumer no
longer matches the standard it claims to use. They need a narrow scope, an
owner, and a removal or upstream path.

## Evidence Boundary

Upstream acceptance proves the shared package against the standards contract.
Consumer adoption proves the selected snapshot against that repository's
declared capabilities and local gates. Neither proves the consumer's
production readiness unless its product qualification exercises that claim.

Continue with [Shared Surfaces](../shared-surfaces/index.md) to see what each
capability brings into a repository.
