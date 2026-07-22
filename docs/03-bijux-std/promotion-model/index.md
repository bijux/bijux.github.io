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

## Compatibility Classification

The managed diff must be interpreted as an interface change, not just as a set
of files. Review classifies which consumer assumptions may move:

| Change class | Examples | Required adoption evidence |
| --- | --- | --- |
| content-preserving | comment, documentation, or equivalent generated formatting | identity checks and affected contract checks |
| additive | new optional target, manifest field, or capability behavior | default behavior remains valid; opt-in path is tested |
| behavior-changing | target semantics, workflow trigger, default, or validation rule changes | affected consumers run contract and product gates against the new behavior |
| structural | managed path, package boundary, capability membership, or manifest shape changes | old layout is removed deliberately and new layout and digests resolve |
| withdrawing | target, field, output, or extension point is removed | all known consumers have migrated or explicitly retain a supported prior pin |

The commit identity tells consumers exactly which implementation they selected;
it does not make every change backward compatible. Compatibility is established
by the contract for the affected interface and by consumer evidence at adoption.
When the change is behavior-changing or structural, the standards change should
name the affected capability and consumer obligation so a repository can decide
whether to adopt, hold, or prepare a local product change.

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

For a multi-commit migration, consumers should select only accepted commits
that each represent a coherent contract. A temporary source state that needs
unpublished follow-up work is not an adoption point. If old and new consumer
shapes must coexist, that coexistence needs an explicit contract and removal
condition rather than a generator that guesses which shape a repository uses.

## Deprecation And Withdrawal

Deprecation is a compatibility window, not a synonym for deletion. A useful
deprecation identifies:

- the interface being superseded and its owning package;
- the replacement and any consumer-side preparation;
- how use of the old interface can be detected;
- the evidence required before withdrawal;
- the last accepted source revision that retains the old contract when known.

```mermaid
stateDiagram-v2
    [*] --> Supported
    Supported --> Deprecated: replacement and detection exist
    Deprecated --> Migrating: consumers adopt compatible replacement
    Migrating --> ReadyToWithdraw: known consumers provide migration evidence
    ReadyToWithdraw --> Withdrawn: old interface removed and contracts updated
    Deprecated --> Supported: replacement is rejected
```

Withdrawal is safe only when known consumers no longer depend on the old
interface or when remaining consumers deliberately stay on a prior supported
pin with their limitation recorded. Silently changing a shared target's
meaning under the same interface is not deprecation; it is an unclassified
behavior change.

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

## Exception Lifecycle

```mermaid
stateDiagram-v2
    [*] --> LocalExtension
    LocalExtension --> DurableLocal: expresses product meaning
    LocalExtension --> UpstreamCandidate: invariant is shared unchanged
    UpstreamCandidate --> Canonical: accepted with contract and tests
    Canonical --> ConsumerAdoption: exact revision selected
    ConsumerAdoption --> Verified: standards and product gates pass
    ConsumerAdoption --> Held: compatibility evidence fails
    Held --> Verified: consumer adapts and revalidates
    Held --> LocalException: urgent bounded deviation is explicitly owned
    LocalException --> Canonical: durable fix accepted upstream
    LocalException --> Removed: exception no longer needed
```

A local exception must never become a second silent source of truth. Its
record should identify the exact managed surface, why local ownership is
temporarily necessary, what evidence bounds the deviation, and which event
removes or upstreams it.

## Adoption Is Independently Reversible

Consumer adoption changes a pinned revision and a managed snapshot. If the new
standard is incompatible, the consumer can retain or restore its last accepted
pin while the upstream standard remains valid for other repositories.

Reversal must preserve identity:

- restore an exact previously accepted commit, not a remembered branch state;
- regenerate the selected capabilities from that source;
- recompute managed checksums rather than copying old files selectively;
- rerun standards and product gates;
- retain the failed adoption evidence for diagnosis.

This is a repository-level rollback of shared inputs. It does not roll back
product data, releases, or live GitHub administration.

## Evidence Boundary

Upstream acceptance proves the shared package against the standards contract.
Consumer adoption proves the selected snapshot against that repository's
declared capabilities and local gates. Neither proves the consumer's
production readiness unless its product qualification exercises that claim.

Continue with [Shared Surfaces](../shared-surfaces/index.md) to see what each
capability brings into a repository.
