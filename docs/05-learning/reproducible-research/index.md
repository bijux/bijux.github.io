---
title: Reproducible Research
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-07-22
---

# Reproducible Research

The Reproducible Research family teaches how to keep computation truthful
under changing inputs, parallel execution, publication, handoff, and recovery.
Its three programs address different trust boundaries: build-graph truth,
workflow orchestration, and experiment-state identity.

<div class="bijux-quicklinks">
<a class="md-button md-button--primary" href="https://bijux.io/bijux-masterclass/reproducible-research/">Open The Family Catalog</a>
<a class="md-button" href="https://bijux.io/bijux-masterclass/reproducible-research/deep-dive-make/">Deep Dive Make</a>
<a class="md-button" href="https://bijux.io/bijux-masterclass/reproducible-research/deep-dive-snakemake/">Deep Dive Snakemake</a>
<a class="md-button" href="https://bijux.io/bijux-masterclass/reproducible-research/deep-dive-dvc/">Deep Dive DVC</a>
</div>

## Start From The Failure

```mermaid
flowchart LR
    failure["Observed failure"] --> graph{"Dependency or rebuild truth?"}
    failure --> workflow{"Workflow or publication contract?"}
    failure --> state{"Data, parameter, or experiment identity?"}
    graph --> make["Deep Dive Make"]
    workflow --> snakemake["Deep Dive Snakemake"]
    state --> dvc["Deep Dive DVC"]
```

| Pressure | Program | System model | Completion evidence |
| --- | --- | --- | --- |
| targets rebuild incorrectly, parallel execution races, or release artifacts cross unclear boundaries | Deep Dive Make | a build is a truthful dependency graph with public targets and atomic publication contracts | deterministic rebuild behavior, parallel-safety checks, artifact and install proofs |
| file interfaces are implicit, dynamic discovery changes planning, or profiles mix policy with workflow meaning | Deep Dive Snakemake | a workflow is a file-driven DAG with declared interfaces, execution policy, and downstream publication contracts | planned graph, file-contract checks, controlled profiles, logs, and publish evidence |
| data, parameters, metrics, and experiments cannot be identified or recovered together | Deep Dive DVC | reproducibility is an explicit state model with remote, registry, promotion, and recovery boundaries | state reconstruction, experiment comparison, promotion record, and recovery drill |

The tools overlap, but the trust problems do not. Make may invoke a scientific
workflow; Snakemake may track DVC-managed data; neither relationship erases the
owner of build truth, workflow semantics, or experiment state.

## Evidence Chain For A Reproducible Result

```mermaid
flowchart LR
    source["Source and data identity"] --> graph["Declared dependency graph"]
    graph --> params["Parameters and environment"]
    params --> execute["Recorded execution"]
    execute --> artifacts["Verified outputs"]
    artifacts --> publish["Atomic publication"]
    publish --> recover["Rebuild or recover from identity"]
```

A result is not reproducible merely because a second invocation succeeds. The
rerun must establish which inputs, graph, parameters, environment, and output
identity were compared. External services and undeclared ambient state remain
outside the proof unless the workflow records and controls them.

## Test Failure, Not Only Repetition

Reproducibility contracts become visible when a workflow is interrupted,
partially stale, concurrently executed, or separated from an ambient cache.

| Failure exercise | Contract under review | Evidence of a correct response |
| --- | --- | --- |
| modify one prerequisite | dependency graph | exactly the affected descendants rebuild; unrelated outputs remain stable |
| interrupt before publication | atomic promotion | readers observe the prior complete state or no promoted state, never a partial product |
| run independent branches concurrently | parallel ownership | no shared-path corruption, hidden ordering, or nondeterministic output identity |
| remove local generated state | reconstruction | retained sources and declared commands reproduce the governed outputs |
| change parameters with fixed data | experiment identity | comparison attributes differences to parameter state rather than ambiguous filenames |
| remove or replace a remote | recovery boundary | the failure is explicit; restoration uses named custody and verifies reconstructed identity |
| alter execution profile only | policy separation | workflow meaning stays stable while operational configuration changes visibly |

Failure injection must have a bounded target and cleanup path. Deleting the
only copy of data or corrupting a shared environment is not a useful proof.
Capstones operate on owned fixtures and preserve pre-failure identity so the
recovery result can be compared.

## Distinguish Rebuild, Replay, Restore, And Reproduce

| Operation | Question |
| --- | --- |
| rebuild | do declared dependencies produce the target from current inputs? |
| replay | does a retained execution or event record compare under a named rule? |
| restore | can an owned prior state be recovered after loss or corruption? |
| reproduce | can another controlled execution reconstruct the claimed result and evidence? |

These operations may share commands but not conclusions. Restoring cached
outputs does not exercise reconstruction. A clean rebuild does not prove that
a remote backup is usable. Reproducing one metric does not establish identity
for the full experiment state.

## Capstone Evidence Packet

Each reproducibility capstone should leave a reviewer with the dependency or
state model, input and tool identities, clean-path result, injected failure,
observed partial state, recovery action, output verification, and remaining
ambient assumptions. The learner should be able to explain which edge or state
record made the failure diagnosable before showing the command that repaired it.

## Deep Dive Make

Use Make when the central question is whether dependencies and targets tell the
truth.

The program moves from graph foundations through parallel safety,
deterministic debugging, rule semantics, portability, generated files,
repository architecture, release artifacts, observability, and migration
judgment. It treats Make as a build engine with a public API—not as a shell
snippet launcher.

The capstone demonstrates:

- correct rebuild and no-op behavior;
- race-free parallel execution;
- explicit multi-output and generated-file contracts;
- atomic publication and install boundaries;
- evidence for incident review and tool migration.

## Deep Dive Snakemake

Use Snakemake when the central question is how a multi-step data workflow plans,
executes, publishes, and changes.

The program covers file contracts, dynamic discovery, checkpoints, profiles,
failure policy, workflow modules, software boundaries, downstream publication,
operating contexts, observability, and governance. Dynamic behavior is treated
as a contract that requires deterministic discovery and a visible publish
boundary.

The capstone demonstrates:

- a reviewable file-driven graph;
- separation of workflow meaning from execution profiles;
- controlled dynamic discovery;
- stable file interfaces between rule families;
- logs, artifacts, and recovery evidence appropriate to the claim.

## Deep Dive DVC

Use DVC when the central question is which data, parameter, metric, experiment,
or promoted model state is authoritative.

The program treats data identity, pipeline state, remotes, experiments,
metrics, registries, promotion, and recovery as one system. Command familiarity
is secondary to being able to reconstruct why a result was selected and which
state must be restored.

The capstone demonstrates:

- versioned data and parameter identity;
- comparable metrics and experiment state;
- explicit remote and registry boundaries;
- promotion records that identify the accepted state;
- recovery without relying on an operator's memory.

## Proof Is Proportional

| Claim | Smallest honest proof |
| --- | --- |
| a dependency edge is correct | change the prerequisite and observe the expected target rebuild |
| parallel execution is safe | exercise concurrency repeatedly and inspect output integrity |
| a workflow plans deterministically | compare plans from the same declared inputs and configuration |
| a publication is atomic | interrupt or fail before promotion and verify readers do not observe partial state |
| an experiment can be recovered | reconstruct the declared data, parameters, code, and metrics from retained identity |
| a tool boundary remains appropriate | show which contract the tool owns and which pressure now exceeds it |

## Beyond Research

These models apply to CI pipelines, package builds, data platforms, model
training, documentation publication, and service operations. The transferable
skill is not remembering three command languages. It is recognizing graph,
state, publication, and recovery contracts wherever they appear.

Return to [Learning](../index.md) to compare program families, or continue to
[Operational Assurance](../../01-platform/operational-assurance/index.md) to
see how the same evidence principles qualify delivered systems.
