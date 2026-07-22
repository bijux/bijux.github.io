---
title: Bijux Infrastructure-as-Code
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-07-22
---

# Bijux Infrastructure-as-Code

`bijux-iac` is the live GitHub governance control plane for the Bijux
repository family. It turns a reviewed twelve-repository inventory into
repository settings and default-branch rulesets, then audits GitHub to verify
that the declared policy is active.

<div class="bijux-quicklinks">
<a class="md-button md-button--primary" href="https://github.com/bijux/bijux-iac">Inspect the control-plane source</a>
<a class="md-button" href="governance-model/">Follow plan, apply, and audit</a>
<a class="md-button" href="repository-coverage/">See governed coverage</a>
</div>

## Why A Control Plane Exists

Repository settings affect every accepted change, yet settings changed only in
an administration interface are difficult to review, reproduce, or compare.
They can drift without leaving a useful source history.

`bijux-iac` gives that state a versioned path:

```mermaid
flowchart LR
    inventory["Repository inventory"] --> validate["Contract validation"]
    validate --> settings["Repository settings"]
    validate --> render["Rendered Terraform inputs"]
    render --> rulesets["Default-branch rulesets"]
    settings --> audit["Live governance audit"]
    rulesets --> audit
```

The inventory is authoritative. Generated Terraform inputs are committed so a
pull request reveals the exact target set before an apply can write to GitHub.

## Owned Surfaces

| Surface | Control-plane responsibility |
| --- | --- |
| repository identity and classification | maintain the complete family, stack, and delivery-state contract |
| repository settings | visibility, features, merge behavior, branch deletion, and related administration |
| default-branch rulesets | pull-request requirement, review behavior, required checks, and destructive-action restrictions |
| change planning | validate and import live resources before showing the proposed Terraform change |
| change application | serialize writes, apply settings and rulesets, and stop on failed imports |
| live audit | compare declared inventory with active GitHub settings and rulesets |

## Ownership Boundary

`bijux-iac` owns controls that act on repositories from the outside. It does
not own:

- shared workflow, Make, check, or documentation-shell source; those belong to
  `bijux-std`;
- runtime, package, dataset, or domain behavior; those belong to product
  repositories;
- the hub's public information architecture; that belongs to
  `bijux.github.io`.

The control-plane repository consumes managed standards for its own repository
just like other consumers. Being the governance authority does not make it the
standards authority.

## Default-Branch Baseline

All managed repositories use an active ruleset for the default branch. The
baseline requires:

- pull requests before changes enter `main`;
- merge commits as the allowed merge method;
- dismissal of stale reviews after new commits;
- resolution of review conversations;
- strict required status checks;
- rejection of force pushes and default-branch deletion.

The family baseline names four required contexts:

- `policy / github`;
- `policy / pr approval`;
- `std / standard`;
- `std / report`.

Repository-specific checks can extend the baseline when they run reliably for
that repository.

The native ruleset approval count is zero because approval authority is
enforced by the required `policy / pr approval` context. Owner-authored pull
requests require the `owner-self-signoff` label; other pull requests require
the owner's latest review state to be approved. Keeping this rule in a named
check makes both paths explicit instead of pretending that an owner can submit
a separate approval review on their own pull request.

## Change Path

```mermaid
flowchart TD
    edit["Edit authoritative inventory"] --> tests["Validate family and rendering contracts"]
    tests --> render["Render committed Terraform inputs"]
    render --> pr["Review pull request"]
    pr --> plan["Import live rulesets and produce plan"]
    plan --> merge["Merge after required checks"]
    merge --> apply["Serialized settings and Terraform apply"]
    apply --> audit["Audit live settings and rulesets"]
    audit --> match{"Declared equals live?"}
    match -->|yes| governed["Governed state"]
    match -->|no| fail["Fail and reconcile drift"]
```

The apply path does not use a persistent Terraform backend. It imports live
resources into ephemeral runner state for each execution. This avoids a
separate state store, but makes successful import mandatory: the workflow
stops rather than attempting a write against unowned state.

## Security Boundary

Read-only validation and planning use narrower permissions than live
administration. Apply and audit require a GitHub token with repository
administration permission across the governed family. That credential is read
from the protected workflow environment; it does not belong in inventory,
Terraform variables, shell history, or generated artifacts.

Serialization prevents two governance applies from racing. Validation fails
closed on unknown repositories, missing checks, malformed settings, generated
input drift, failed resource imports, or differences between declared and live
state.

## Evidence And Limits

A passing local contract suite proves inventory and rendering behavior without
writing to GitHub. A Terraform plan proves the proposed change against imported
state. Only the post-apply live audit compares the accepted declaration with
active GitHub settings.

The control plane governs GitHub repository admission and settings. It does not
establish the correctness, availability, or scientific validity of a product
delivered from those repositories.

## Governance Claim Ladder

| Claim | Minimum evidence | What it does not prove |
| --- | --- | --- |
| the inventory is structurally valid | network-free contract tests and deterministic rendering | that GitHub currently matches the declaration |
| a proposed ruleset change is known | import of live resources and a Terraform plan | that the change was applied |
| an apply workflow completed | settings patch and Terraform apply results | that every modeled field now equals the declaration |
| governance is active as declared | post-apply live audit at an identified revision | historical continuity or future freedom from manual drift |

The strongest governance statement therefore needs the live audit. A local
green check is necessary source evidence, not evidence of active GitHub state.

Continue with [Governance Model](governance-model/index.md) for the evidence
boundaries or [Repository Coverage](repository-coverage/index.md) for the
current family contract.
