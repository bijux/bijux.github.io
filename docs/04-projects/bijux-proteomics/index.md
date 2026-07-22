---
title: Bijux Proteomics
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-07-22
---

# Bijux Proteomics

Bijux Proteomics is a composable Python platform for proteomics analysis,
reproducible execution, evidence-aware interpretation, decision support, and
laboratory follow-up. It is designed so a reviewer can trace a result from
accepted and rejected scientific inputs through execution, grounding,
recommendation, and observed consequence.

No layer receives authority over all the others. A completed run does not prove
scientific acceptance. Grounded evidence does not authorize an action. A
recommendation does not establish laboratory value.

<div class="bijux-quicklinks">
<a class="md-button md-button--primary" href="https://bijux.io/bijux-proteomics/">Open Proteomics Documentation</a>
<a class="md-button" href="https://bijux.io/bijux-proteomics/01-bijux-proteomics/foundation/scientist-journey/">Follow The Scientist Journey</a>
<a class="md-button" href="https://bijux.io/bijux-proteomics/01-bijux-proteomics/foundation/current-capability-limits/">Inspect Capability Limits</a>
<a class="md-button" href="https://github.com/bijux/bijux-proteomics">View Source</a>
</div>

## Six Accountable Layers

```mermaid
flowchart TD
    request["Scientific question"] --> core["Core<br/>scientific calculation and acceptance"]
    core --> runtime["Runtime<br/>execution custody"]
    runtime --> knowledge["Knowledge<br/>support and contradiction"]
    knowledge --> intelligence["Intelligence<br/>challenge and recommendation"]
    intelligence --> lab["Lab<br/>readiness and consequence"]
    foundation["Foundation<br/>identity, schema, canonical bytes"] -. binds .-> core
    foundation -. binds .-> runtime
    foundation -. binds .-> knowledge
    foundation -. binds .-> intelligence
    foundation -. binds .-> lab
    core -. missing burden .-> narrow["Narrow or refuse"]
    runtime -. missing burden .-> narrow
    knowledge -. missing burden .-> narrow
    intelligence -. missing burden .-> narrow
    lab -. observed outcome .-> knowledge
```

| Layer | Question it owns | Durable record |
| --- | --- | --- |
| Foundation | how is a subject, schema, and serialized record identified? | canonical representation, digest, producer, compatibility, and typed disposition |
| Core | what scientific computation ran and what did it accept or reject? | inputs, assumptions, QC, result, rejection, benchmark lineage, and limitation |
| Runtime | what executed, under which state and environment? | request, selected capability, events, artifacts, terminal state, comparison, and replay evidence |
| Knowledge | which evidence supports or contradicts the claim? | source identity, context, support, contradiction, freshness, and unresolved gaps |
| Intelligence | why was an action ranked, downgraded, or refused? | candidate universe, policy, alternatives, sensitivity, confidence posture, and refusal conditions |
| Lab | what follow-up was feasible and what happened? | readiness, controls, custody, deviation, observation, consequence, and feedback |

The stable join between layers is a typed identity or artifact reference. A
filename, display label, dashboard color, or prose summary is not enough to
join scientific records across packages or revisions.

## Scientific Inputs Preserve Rejection

Proteomics input APIs return reports rather than silently filtering to a list
of accepted values. A partially valid FASTA document, search result, or
quantification table can therefore retain both the records used and the
records excluded.

```mermaid
flowchart LR
    input["Scientific input"] --> contract["Typed scientific contract"]
    contract --> accepted["Accepted records"]
    contract --> rejected["Rejections and diagnostics"]
    contract --> policy["Assumptions and provenance"]
    accepted --> result["Scientific result"]
    rejected --> result
    policy --> result
```

The rejected portion is evidence about the population actually analyzed. It
must travel with downstream QC and interpretation because hidden exclusions
can change the conclusion.

## Database Preparation Is Part Of The Result

Protein databases, spectral libraries, identifier maps, literature collections,
and benchmark corpora are analytical inputs with their own scientific
decisions. Their construction must remain visible beside downstream results.

```mermaid
flowchart LR
    sources["Versioned sources<br/>and licenses"] --> capture["Captured members<br/>and native identities"]
    capture --> normalize["Canonical identifiers<br/>and typed records"]
    normalize --> reconcile["Aliases, isoforms,<br/>decoys, conflicts"]
    reconcile --> qualify["Coverage, exclusions,<br/>context, and review"]
    qualify --> publish["Database or library<br/>manifest + digest"]
    publish --> workflow["Workflow-family input"]
```

| Preparation decision | Evidence to retain | Scientific consequence if hidden |
| --- | --- | --- |
| source and release selection | accession, release, retrieval context, license, and digest | silent database drift or biased coverage |
| identifier normalization | native ID, canonical ID, organism, isoform, and mapping rule | distinct entities collapse or one entity fragments |
| sequence and record admission | accepted and rejected members with diagnostics | analyzed population cannot be reconstructed |
| target/decoy construction | producer, rule, seed or determinism record, and manifest role | error-control assumptions become unverifiable |
| spectral or assay library transfer | source context, instrument and workflow compatibility, calibration and exclusions | library presence is mistaken for transfer validity |
| literature and ontology grounding | source version, claim relationship, context, contradiction, and freshness | citation count is mistaken for support |
| benchmark preparation | truth source, population, leakage controls, expected metrics, and limitations | performance is evaluated against self-confirming evidence |

A database digest identifies bytes, not suitability. Suitability belongs to
the workflow-family contract and intended use. The same database may be
adequate for exploratory identification and inadequate for transferable
quantification or an experimental recommendation.

## Preserve Study Design And Error Control

Proteomics evidence depends on more than accepted peptide or protein records.
The study design and its error-control policy determine which comparisons the
data can support.

| Scientific boundary | Evidence that must remain inspectable |
| --- | --- |
| sample structure | subject, condition, biological replicate, technical replicate, blocking, batch, and run order |
| identification error | target/decoy policy, search space, score direction, threshold scope, and retained population |
| protein inference | peptide-to-protein ambiguity, grouping rule, shared evidence, and unresolved alternatives |
| quantification | normalization, aggregation, censoring, imputation, and uncertainty propagation |
| contrasts and multiplicity | declared contrasts, tested family, correction method, denominator, and omitted tests |
| calibration and interference | calibrators, fitted range, residuals, carryover, selectivity, and out-of-range behavior |

```mermaid
flowchart LR
    design["Study design and contrasts"] --> observations["PSMs, peptides, proteins,<br/>intensities, and missing values"]
    observations --> decisions["Identification, inference,<br/>normalization, and error control"]
    decisions --> result["Estimate, uncertainty,<br/>and complete decision population"]
    result --> transfer["Transfer test in a distinct context"]
```

False discovery rate and q-values are properties of a declared decision
population under a declared procedure. They do not prove that an individual
identification is correct, and a threshold computed for one family cannot be
silently reused for a narrower favorable subset. Protein-level claims also
need their own inference and error boundary; peptide-level control is not an
automatic protein-level guarantee.

Missingness must preserve scientific meaning. Below-detection, absent from the
search result, failed quality control, not measured, and structurally
inapplicable are different states. An imputed value is a modeled value and must
not replace the observed-state record from which it was derived.

## Test Transfer With A Separate Population

Internal repeatability and companion-package performance answer different
questions. A transfer claim names both the development context and the target
context, then tests the assumptions expected to survive between them.

For every transfer result, retain:

- the primary and companion or holdout package identities and their selection
  rules;
- cohort, specimen, preparation, acquisition, instrument, library, software,
  and processing differences;
- the invariant being tested, the allowed tolerance, and the complete eligible
  denominator;
- failures, exclusions, missing strata, and the context in which performance
  no longer supports the declared claim.

When one package determines the method, thresholds, or preferred model and
also supplies the final score, the result is development evidence. Calling it
external validation does not create independence. A successful transfer in
one companion population remains evidence for that named context, not a
universal claim across laboratories, instruments, or cohorts.

## Evidence Ladder

A workflow family earns only the strongest language supported by every
required layer.

```mermaid
flowchart LR
    asset["Source, license, benchmark manifest"] --> science["Scientific contract"]
    science --> execution["Runtime lane and run bundle"]
    execution --> grounding["Support, contradiction, context"]
    grounding --> judgment["Challenge, sensitivity, refusal"]
    judgment --> consequence["Feasibility and observed outcome"]
    consequence --> status["Bounded trust status"]
    asset -. missing .-> narrow["Narrow or refuse"]
    execution -. imported or unstable .-> narrow
    grounding -. contradicted .-> narrow
    consequence -. infeasible .-> narrow
```

A later success cannot promote an earlier weak record. A complete run bundle
cannot compensate for an unclear scientific acceptance policy. A grounded
claim cannot compensate for a decision that reverses under small policy
changes. A recommendation cannot compensate for infeasible follow-up.

## Workflow Families Have Independent Ceilings

Evidence is assessed separately for DDA, DIA, LFQ, multiplex, PTM, and targeted
workflows. Scientific assumptions and execution modes differ, so strength in
one family cannot be borrowed by another.

| Family | Current documented posture | Essential limit |
| --- | --- | --- |
| DDA | `review_grade_bounded` | primary evidence begins with external search-engine results; repository-owned raw search execution is not claimed |
| DIA | `outsider_auditable_bounded` | checked-report execution does not establish chromatogram-native or universal library transfer |
| LFQ | `outsider_auditable_bounded` | repeatability does not establish cross-cohort transfer or external quantitative truth |
| multiplex | `internal_support_only` | companion transfer remains fragile and outsider consequence closure is incomplete |
| PTM | `outsider_auditable_bounded` | localization does not establish occupancy, function, causality, or regulation |
| targeted | `outsider_auditable_bounded` | vendor parity, calibration transfer, interference, and assay burden remain bounded |

These tokens are claim ceilings, not general maturity grades. The
[workflow-family guide](https://bijux.io/bijux-proteomics/01-bijux-proteomics/foundation/workflow-families/)
is the authority for current evidence and blockers.

## Read The Status Vocabulary Literally

| Status | What it permits | What it does not permit |
| --- | --- | --- |
| `internal_support_only` | useful implementation inside a restricted authority boundary | public recommendation or outsider consequence claims |
| `review_grade_bounded` | scientific review under named limits | raw execution parity, general transfer, or authority to act |
| `outsider_auditable_bounded` | external inspection and rerun of the declared bounded chain | clinical, universal, or decision-grade authority |
| release-ready | all required repository-wide categories pass for one source candidate | universal scientific validity |

The exact status belongs in machine-readable evidence and public prose.
Replacing it with a friendlier but stronger phrase creates an unreviewed claim.

## Recommendation Records Preserve Counterfactuals

A defensible recommendation records why it would change. Comparator removal,
literature removal, policy changes, laboratory burden, and observed outcomes
are tested as separate drivers.

```mermaid
flowchart TD
    prior["Retained prior decision"] --> compare["Compare input revisions"]
    compare --> evidence{"Evidence changed?"}
    compare --> policy{"Policy changed?"}
    compare --> burden{"Burden changed?"}
    compare --> outcome{"Outcome observed?"}
    evidence --> attribution["Named driver set"]
    policy --> attribution
    burden --> attribution
    outcome --> attribution
    attribution --> revised["New posture and rationale"]
    revised --> audit["Old and new records remain inspectable"]
```

If removing one evidence axis or increasing downstream burden collapses the
recommendation, that weaker posture is part of the truthful product surface.
An observed outcome changes the next decision; it does not rewrite the prior
record.

## Operate Without Losing Scientific Meaning

Runtime scale and service behavior matter only if the evidence-bearing
population remains equivalent. Optimizations that discard ambiguity,
contradictions, provenance, rejections, or rare failure classes change the
scientific operation even when throughput improves.

| Operational pressure | Preserve | Unsafe shortcut |
| --- | --- | --- |
| batched ingestion | source manifest, deterministic member identity, rejection population, and cross-batch integrity | treating batches as independent when identities or conflicts cross them |
| indexed identifier resolution | every candidate, evidence tier, organism and alias context | first-match collapse of ambiguity |
| partitioned evidence graph | stable partition key, cross-partition edges, conflicts, and final integrity audit | ignoring relationships outside the selected shard |
| parallel workflow execution | request and environment identity, event order where meaningful, artifacts, failures, and terminal state | aggregating only successful worker outputs |
| large recommendation universe | complete candidate population, pruning policy, alternatives, sensitivity, and burden | ranking only preselected favorable candidates |
| retained laboratory evidence | custody, controls, deviations, observations, and link to the prior decision | replacing analytical history with the eventual outcome |

The repository exposes performance and behavioral evidence but does not turn
that into a universal service-level objective. Capacity claims require the
named workload, environment, dataset, evidence-completeness checks, and
observation window. A faster result that changes ambiguity or conflict counts
is not the same scientific result.

## Release Authority Is Multi-Dimensional

A candidate may publish only when the required scientific, runtime,
knowledge, recommendation, laboratory, compatibility, security, and channel
owners agree for that revision. This is an intersection, not a majority vote.

```mermaid
flowchart TB
    candidate["Source candidate"] --> science["Scientific evidence"]
    candidate --> runtime["Execution evidence"]
    candidate --> knowledge["Grounding and freshness"]
    candidate --> decision["Recommendation stability"]
    candidate --> consequence["Lab consequence boundary"]
    candidate --> delivery["Compatibility, security,<br/>and channel evidence"]
    science --> verdict{"Release disposition"}
    runtime --> verdict
    knowledge --> verdict
    decision --> verdict
    consequence --> verdict
    delivery --> verdict
```

One blocking owner narrows or refuses the affected claim even when every other
lane is green. The disposition must retain blocker codes, affected workflow
families and claims, evidence identities, and the condition that would permit
reconsideration.

## Verify A Proteomics Claim

| Claim | Evidence route |
| --- | --- |
| a record entered the calculation | canonical identity, accepted/rejected report, schema, and provenance |
| a scientific workflow supports a result | family contract, benchmark lineage, QC, comparison, and claim ceiling |
| the result can be rerun | runtime request, environment, state, artifact ledger, and comparison record |
| a claim is grounded | cited context, supporting and contradicting evidence, freshness, and gaps |
| a recommendation is proportionate | alternatives, ranking policy, sensitivity, burden, confidence, and refusal behavior |
| a follow-up changed the evidence | readiness, custody, controls, deviation, observation, and linked consequence record |
| a repository candidate may publish | revision-specific readiness matrix, blocker codes, governed outputs, and channel decision |

Readiness does not use majority voting. A green runtime result cannot erase a
benchmark blocker, and a strong benchmark cannot erase an unreviewable
laboratory consequence path.

## Scope And Non-Claims

The repository implements sequence, peptide, spectrum, confidence, protein
inference, quantification, DIA, LFQ, PTM, targeted, evidence-grounding,
recommendation, and laboratory-follow-up surfaces. Coverage is not a blanket
accuracy claim.

The platform does not claim universal transfer across cohorts, instruments,
search engines, acquisition modes, or experimental designs. It does not
convert execution success into biological truth, or advisory output into
clinical or autonomous authority.

Continue with [Applied Domains](../../01-platform/applied-domains/index.md) for
the wider scientific evidence model or [Operational Assurance](../../01-platform/operational-assurance/index.md)
to compare run evidence with delivery and recovery qualification.
