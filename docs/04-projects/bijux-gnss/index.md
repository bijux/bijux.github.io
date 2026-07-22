---
title: Bijux GNSS
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-07-23
---

# Bijux GNSS

`bijux-gnss` is a Rust workspace for turning GNSS samples and navigation
products into reviewable receiver and positioning evidence. It provides the
`bijux gnss` command, focused libraries, reproducible datasets, and persisted
run records.

<div class="bijux-quicklinks">
<a class="md-button md-button--primary" href="https://bijux.io/bijux-gnss/">Read the GNSS handbook</a>
<a class="md-button" href="https://github.com/bijux/bijux-gnss">Inspect the repository</a>
</div>

## From Samples To Evidence

```mermaid
flowchart LR
    input["Registered dataset<br/>or explicit capture"] --> command["bijux gnss workflow"]
    command --> receiver["Acquisition, tracking,<br/>and observations"]
    receiver --> navigation["Navigation solution<br/>or explicit refusal"]
    navigation --> evidence["Manifest, reports,<br/>and artifacts"]

    signal["Signal definitions<br/>and DSP"] --> receiver
    core["Typed units, time,<br/>records, diagnostics"] --> receiver
    infra["Dataset identity,<br/>run layout, provenance"] --> input
    infra --> evidence
```

The diagram is an ownership map, not a promise that every command reaches every
stage. Acquisition may stop before tracking, a receiver run may omit
navigation, and validation may inspect existing evidence without replaying the
pipeline. Refusal and degraded states are part of the result contract.

## Package Responsibilities

| Package | Public responsibility |
| --- | --- |
| `bijux-gnss-core` | identities, units, time, observations, diagnostics, and artifact envelopes |
| `bijux-gnss-signal` | signal catalogs, codes, raw samples, replicas, and DSP primitives |
| `bijux-gnss-nav` | navigation products, corrections, positioning, RTK, PPP, and integrity |
| `bijux-gnss-receiver` | acquisition, tracking, observations, lifecycle diagnostics, and receiver artifacts |
| `bijux-gnss-infra` | datasets, provenance, run layout, overrides, and experiment infrastructure |
| `bijux-gnss` | facade library and installable command surface |

Repository-only packages own development commands, policies, and independent
test support; they are not presented as public GNSS libraries.

## Match Evidence To The Claim

| Claim | Evidence to prefer | Insufficient by itself |
| --- | --- | --- |
| a command behaves as documented | integration test and structured operator output | helper unit test |
| a persisted run is reconstructable | manifest, provenance, validation status, and referenced files | directory presence |
| receiver state is operationally valid | per-stage lifecycle evidence, diagnostics, and bounded errors | final position alone |
| an algorithm is scientifically correct | independent reference, truth budget, and failure diagnostics | self-generated fixture |
| a signal implementation is coherent | reference vectors, properties, and continuity checks | plausible waveform plot |

## Reproducible Run Identity

The run manifest connects input identity, configuration, reports, diagnostics,
and generated artifacts. It should be read before a presentation report,
because it establishes which execution the report describes.

Synthetic captures are useful for deterministic ingest and injected-truth
tests. They are not live-sky evidence and do not establish real-world
positioning accuracy. Recorded data adds realism, but still requires source,
redistribution, receiver, antenna, timing, and environment context.

### Read the run as joined identities

A run directory is useful only when its records can answer which data,
configuration, implementation, and reference population produced each result.

| Identity | What to retain | Question it answers |
| --- | --- | --- |
| capture | registry key or explicit file, format, sample rate, center frequency, timing, and source provenance | what signal population entered the workflow? |
| configuration | receiver and navigation settings plus their stable hash | which search space, thresholds, and models governed execution? |
| implementation | package version, repository revision and dirty state, enabled features, and machine context | which executable behavior produced the artifacts? |
| stage | acquisition candidate, channel or epoch identity, terminal state, and diagnostics | where did evidence advance, degrade, or stop? |
| reference | truth or external-reference identity, alignment rule, and eligible epochs | what comparison population supports the reported error? |
| artifact | versioned envelope, checksum, inventory role, and manifest link | which bytes belong to this run and how should they be decoded? |

The manifest joins these identities; it does not turn them into scientific
truth. Machine context can explain a changed run, while reference alignment
and the owning scientific budget decide whether the difference is acceptable.

## Preserve The Stage Denominator

GNSS workflows reduce populations as they advance: samples yield acquisition
candidates, accepted candidates yield tracked channels, observations yield
eligible epochs, and integrity criteria admit or reject solutions. Reporting
only the final survivors makes a result impossible to audit.

```mermaid
flowchart LR
    samples["Admitted samples"] --> candidates["Acquisition candidates"]
    candidates --> channels["Tracked channels"]
    channels --> epochs["Observation epochs"]
    epochs --> solutions["Candidate solutions"]
    solutions --> accepted["Integrity-accepted results"]
    candidates -. "rejection + reason" .-> evidence["Stage evidence ledger"]
    channels -. "loss + reason" .-> evidence
    epochs -. "exclusion + reason" .-> evidence
    solutions -. "refusal + reason" .-> evidence
```

For each transition, retain the input population, accepted population,
excluded or failed members, and governing rule. An accuracy statistic over
accepted epochs cannot stand in for acquisition sensitivity, tracking
continuity, availability, or integrity performance; each claim has a different
denominator.

## Build A Reference Hierarchy

GNSS outputs can be compared with several kinds of evidence, and they do not
support the same claim.

| Reference class | Useful for | Required context |
| --- | --- | --- |
| mathematical invariant or published formula | units, transforms, code properties, and model behavior | convention, domain, numerical budget, and edge cases |
| independent implementation | algorithm agreement and regression detection | implementation independence, configuration, and known shared assumptions |
| broadcast or precise product | orbit, clock, correction, and interpolation behavior | source, product family, epoch coverage, frame, time system, and validity interval |
| surveyed station or injected truth | positioning error and convergence under a named scenario | truth provenance, antenna or injection model, environment, and eligible epochs |
| live-sky capture | receiver behavior under observed conditions | equipment, location, interference, timing, and external reference evidence |

Synthetic truth is strong evidence for the injected fault or deterministic
signal model and weak evidence for unmodeled propagation, hardware, and
environment behavior. Live-sky data supplies realism but does not supply truth
by itself. Agreement with a second implementation is also insufficient when
both implementations share the same convention error or input product.

## Align Time, Frame, And Population Before Error

An error statistic is meaningful only after solution and reference records are
joined under an explicit alignment rule. GNSS week or day rollover, leap
seconds, constellation time systems, interpolation windows, coordinate frames,
antenna reference points, and epoch tolerances can all turn numerically close
records into a scientifically invalid comparison.

```mermaid
flowchart LR
    solution["Solution epochs"] --> normalize["Resolve time system,<br/>frame, units, and identity"]
    reference["Reference epochs"] --> normalize
    normalize --> align["Apply declared alignment rule"]
    align --> eligible["Eligible paired epochs"]
    align --> excluded["Unpaired or invalid epochs<br/>with reasons"]
    eligible --> metrics["Error, convergence,<br/>availability, integrity"]
```

The evidence must retain the unpaired and invalid population as well as the
aligned population. “At least one epoch aligned” proves that a comparison can
begin; it does not prove that coverage is representative or that position
error is acceptable.

## Preserve Time Authority And Holdover State

Receiver time is both an input to navigation and a result affected by clocks,
products, signal tracking, and system-time conversion. A timestamp without its
time scale and authority path cannot establish when an observation occurred or
whether two systems agreed.

| Timing state | Evidence to retain |
| --- | --- |
| signal-disciplined | constellation, tracked signals, navigation-data validity, receiver clock state, and conversion rule |
| externally disciplined | external source identity, synchronization method, uncertainty, and observation interval |
| holdover | last valid discipline event, oscillator model, elapsed duration, uncertainty growth, and exit condition |
| stepped or corrected | prior and revised time, cause, affected epochs, and downstream recomputation decision |
| unavailable or ambiguous | unresolved scale, rollover, leap-second, clock, or source condition and refused outputs |

Position continuity during holdover does not prove timing continuity within an
unchanged uncertainty budget. Comparisons should use the timing state valid for
each epoch, retain discontinuities, and reopen dependent velocity, clock,
integrity, or event-order claims when the authority changes.

## Separate Accuracy From Integrity

Accuracy asks how close accepted estimates are to reference truth. Integrity
asks whether the system bounds risk and refuses or alarms when its stated
hypotheses no longer support a trustworthy result. A small observed error does
not prove a protection level, and a protection level is not meaningful without
its threat model, probability assumptions, exclusions, thresholds, geometry,
and unavailable-state behavior.

Integrity evidence should include accepted, degraded, fault-excluded, alarmed,
and refused cases. When prerequisites are missing or inconsistent, the honest
result is unavailable integrity—not a reassuring number inferred from the
position solution.

## Separate Anomaly Detection From Attribution

Unexpected power, correlation, navigation data, clock behavior, residuals, or
geometry can indicate interference, spoofing, equipment failure, multipath,
bad products, or implementation error. Detection establishes that an observed
contract was violated; it does not identify the cause or actor by itself.

```mermaid
flowchart LR
    observations["Signal, receiver, navigation,<br/>and environment observations"] --> detector["Declared detector and threshold"]
    detector --> event["Anomaly event with time,<br/>channels, and diagnostics"]
    event --> hypotheses["Competing technical hypotheses"]
    hypotheses --> evidence["Controlled tests and<br/>independent evidence"]
    evidence --> conclusion["Bounded classification<br/>or unresolved cause"]
```

| Claim | Additional evidence burden |
| --- | --- |
| an anomaly occurred | detector identity, baseline, threshold, affected population, false-alarm context, and retained observations |
| a receiver fault caused it | hardware and software identity, health evidence, reproduction or isolation, and competing-cause review |
| interference was present | spectral and temporal evidence, independent observation where available, equipment response, and local environment |
| spoofing was present | controlled truth or corroborating inconsistencies across signal, navigation, time, motion, geometry, and independent sensors |
| an actor or intent caused it | evidence outside ordinary receiver computation and an explicitly separate authority boundary |

Synthetic fault injection can qualify detector behavior for the injected
scenario. It does not establish field prevalence, universal detection, or
attribution. When evidence separates normal operation from anomaly but not one
cause from another, the honest result is detected and unresolved.

## Protect Capture And Location Custody

GNSS evidence can expose observation time, receiver location or trajectory,
equipment identity, antenna context, nearby interference, and operator
activity. Reproducibility does not require every field or raw capture to be
public.

| Custody decision | Preserve | Public boundary |
| --- | --- | --- |
| raw sample retention | content identity, format, timing basis, access owner, and retention rule | publish bytes only when rights, sensitivity, and redistribution posture permit |
| site or trajectory | coordinate frame, precision, transformation, and scientific role | reduce precision or restrict access when exact location creates safety, privacy, or source risk |
| equipment and operator context | attributes needed to interpret bias, timing, and failure | omit unrelated serials, account identifiers, and personal activity |
| restricted capture use | stable governed identity and approved analysis route | publish derived evidence with an explanation of unavailable source material |
| incident evidence | affected interval, diagnostic identity, custody, and authorized reviewers | avoid exposing secrets, protected infrastructure, or unsupported attribution |

A redacted public artifact should state what was withheld, why, which
interpretive limitation follows, and how an authorized reviewer can resolve
the governed source. Fabricated coordinates, shifted timestamps without a
declared transformation, or anonymous files with no custody relation destroy
the very evidence that restriction is meant to protect.

## Failure Semantics

A GNSS workflow can produce a complete evidence record without producing a
position. Useful terminal states include:

- input rejection with a typed reason;
- acquisition with no acceptable candidate;
- tracking loss or insufficient observations;
- navigation inputs that cannot support a solution;
- a solution rejected by integrity criteria;
- a validation mismatch with preserved diagnostics.

Keeping these states explicit prevents a missing or unreliable result from
being rendered as successful-looking output.

## Published Surfaces

The workspace prepares six public crates under one workspace version and also
publishes governed GitHub and GHCR release artifacts. The release contract is
the authority for package order and exclusions; the handbook and docs.rs carry
human and API documentation respectively.

Use the [GNSS handbook](https://bijux.io/bijux-gnss/) to choose the package that
owns a disputed decision, then follow its contract, implementation, tests, and
run evidence.
