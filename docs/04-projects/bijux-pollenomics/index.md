---
title: Bijux Pollenomics
audience: mixed
type: guide
status: canonical
owner: bijux-docs
last_reviewed: 2026-07-22
---

# Bijux Pollenomics

`bijux-pollenomics` connects curated evidence to public maps and reports about
pollen, palaeoenvironmental context, archaeology, hydrography, fieldwork, and
ancient DNA. Its database preserves source identity, preparation, scientific
decisions, publication membership, and gaps that prevent stronger claims.

<div class="bijux-quicklinks">
<a class="md-button md-button--primary" href="https://bijux.io/bijux-pollenomics/public/pollenomics/">Read the product guide</a>
<a class="md-button" href="https://bijux.io/bijux-pollenomics/public/pollenomics-data/">Inspect the data system</a>
<a class="md-button" href="https://bijux.io/bijux-pollenomics/report/">Open the report portal</a>
<a class="md-button" href="https://github.com/bijux/bijux-pollenomics">Inspect the repository</a>
</div>

## From Source To Public Claim

```mermaid
flowchart LR
    source["Release, paper,<br/>archive, registry, or API"] --> capture["Captured identity<br/>and material"]
    capture --> normalize["Normalized objects<br/>and relations"]
    normalize --> curate["Claim-specific review<br/>and decision"]
    curate --> manifest["Product manifest<br/>and member"]
    manifest --> view["Map, table, report,<br/>or field record"]
    view -. "trace backward" .-> normalize
```

The chain is reversible. A reader can move backward from a visible member to
its admission decision, governed evidence, captured material, and upstream
identity. A source correction moves forward through affected objects,
decisions, manifests, and views.

## Database Preparation Is Scientific Work

The tracked data system separates lifecycle stages because each stage has a
different authority.

| Stage | Decides | Must preserve |
| --- | --- | --- |
| capture | what source material entered the repository | source family, release, locator, access context, and digest |
| normalization | how source-native records become typed objects | native identity, transformations, units, missingness, and loss |
| curation | which facts, relations, conflicts, and qualifications are accepted | decision owner, proposed use, evidence, reason, and recovery condition |
| review | whether an object is fit for a named claim or product | claim dimension, population, precision, conflicts, and exclusions |
| manifestation | which reviewed objects belong to a public product | manifest identity, member ID, role, geography, caveat, and revision |
| rendering | how product members appear in a map, table, or report | stable member identity and trace back to governed state |

A normalized record is not automatically publication-ready. A map marker
proves product membership, not every scientific statement shown beside it.

## Identify The Result With Three Revisions

Pollenomics results join executable behavior, governed evidence, and a selected
publication. Those surfaces can change independently, so a package version or
map URL alone is not a reproducible identity.

| Revision | Owns | Cannot identify alone |
| --- | --- | --- |
| producer | collectors, schemas, normalization, validation, ranking, and publication behavior | which governed records or decisions were present |
| evidence | captured material, typed objects, relations, conflicts, reviews, exclusions, and recovery state | which eligible objects were selected for one product |
| product | manifest scope, member and non-member sets, roles, caveats, and rendered descendants | the behavior and evidence revision that produced them |

A reusable citation binds all three, then identifies the stable product member
or reported population. This distinction is especially important when a newer
runtime can read an older evidence revision, or when several regional products
select different members from the same governed database.

```mermaid
flowchart LR
    producer["Producer version"] --> run["Publication run"]
    evidence["Evidence revision"] --> run
    contract["Product contract"] --> run
    run --> manifest["Manifest identity"]
    manifest --> member["Member, non-member,<br/>or aggregate identity"]
```

The installed wheel supplies producer behavior. It does not contain the
repository's evidence database or checked-in report products. Conversely, a
tracked report remains a product of its recorded producer and evidence state;
reopening it with a newer installation does not silently requalify it.

## Propagate Corrections Through Ownership

A source correction should invalidate only the descendants that depend on the
changed fact, while preserving the previous decision history and unaffected
members.

```mermaid
flowchart LR
    correction["Corrected source identity<br/>or source-native fact"] --> affected["Affected governed objects"]
    affected --> decisions["Reopened decisions<br/>and conflicts"]
    decisions --> eligibility["Recomputed eligibility<br/>and ranking inputs"]
    eligibility --> manifests["Affected manifests<br/>and member sets"]
    manifests --> views["Regenerated maps,<br/>tables, and reports"]
```

At each edge, record the old identity, new identity, reason for change, and
affected descendants. A renderer is not allowed to repair a source or curation
problem locally. If evidence becomes insufficient, the durable outcome may be
a qualified member, explicit non-member, exclusion, recovery item, or release
refusal—not a fabricated replacement value.

## Evidence Graph

Pollenomics needs several evidence dimensions that cannot substitute for one
another:

- **identity** — which source, project, sample, site, taxon, lake, or product
  member is under discussion;
- **locality and coordinates** — what place is supported, by which geometry,
  method, precision, and conflict resolution;
- **chronology** — which source expression, interval, evidence class, and
  comparability posture are available;
- **taxonomy** — which accepted name, synonym, identification context, and
  uncertainty apply;
- **lineage** — how projects, samples, sites, sources, and products connect;
- **curation** — why evidence was admitted, qualified, excluded, or refused for
  a particular use.

Spatial proximity does not establish association, contemporaneity, or
causation. Matching labels do not establish identity. A contextual period does
not become a numeric temporal comparison without a shared basis and precision.

## Resolve Conflicts Without Erasing Sources

Two sources can disagree about coordinates, chronology, taxonomy, locality, or
association while both source-native records remain valid captures. Curation
decides what a named product may use; it must not rewrite the losing source as
though the disagreement never existed.

```mermaid
flowchart TD
    assertions["Source-native assertions"] --> compare["Normalize for a declared dimension"]
    compare --> agree{"Compatible under the product rule?"}
    agree -->|yes| accept["Accept with retained provenance"]
    agree -->|no| conflict["Record conflict and affected claims"]
    conflict --> decision{"Evidence supports a decision?"}
    decision -->|yes| qualify["Select or qualify with reason"]
    decision -->|no| unresolved["Keep unresolved, exclude,<br/>or block release"]
```

A reviewable conflict record identifies the assertions, dimension, comparison
rule, decision owner, evidence, product use, and condition that would reopen
the decision. Source authority may differ by dimension: a registry can be
preferred for administrative identity while a primary field record owns a
sampling coordinate. Selecting one assertion for one use does not grant it
universal authority over the object.

## Propagate Spatial And Temporal Uncertainty

Coordinates and dates are measurements or interpretations with support, not
decorative attributes. Precision lost during normalization or aggregation
cannot be recovered by displaying more decimal places or a narrower chart bin.

| Input state | Public representation | Prohibited inference |
| --- | --- | --- |
| point with known precision | point plus method and precision | exact sampling location beyond that precision |
| polygon, locality, or administrative area | area or bounded locality | point identity at a centroid |
| conflicting coordinates | qualified selection or visible unresolved state | silent averaging into a new source fact |
| numeric date or interval | original basis, interval, uncertainty, and conversion | false precision after calendar or age-model conversion |
| contextual period | categorical context with its vocabulary and source | direct numeric comparability without a governed mapping |
| missing or withheld location | explicit missingness or access posture | zero coordinate or inferred public point |

Spatial or temporal aggregation adds another claim. A map cell, region count,
or time bin needs a membership rule for geometries that cross boundaries,
uncertain dates that overlap bins, duplicates, qualified records, and missing
values. The aggregate must retain its denominator and the uncertainty policy;
otherwise its clean visual boundary can imply precision that no member owns.

## Keep Map Semantics Auditable

A rendered feature may represent a source observation, a governed object, a
product member, or an aggregate. Those roles require different hover text,
counts, and trace routes. Clustering markers for presentation must not create a
new scientific population, and proximity on the screen must not create a
relation absent from the evidence graph.

Readers should be able to identify the feature role, product and evidence
revision, member or aggregate identity, population rule, caveat, and route back
to source and curation state. When privacy or source restrictions prevent that
detail from being public, the feature needs a bounded access explanation—not a
fabricated precise substitute.

## Count The Right Population

Captured rows, normalized objects, reviewed claims, eligible candidates,
published members, map features, and display aggregates are different
populations.

Before reusing a count, retain:

- observation unit and stable identity namespace;
- source, database, and product revision;
- geographic, temporal, taxonomic, and publication scope;
- eligibility, exclusion, unresolved, and missingness rules;
- the manifest or review surface that owns the denominator.

The repository preserves negative evidence when a visible product member lacks
one accountability dimension. Removing the member would hide collected
evidence; presenting it as fully supported would overstate the record.

Product manifests must therefore preserve more than displayed members. Their
review surface includes eligible members, qualified members, explicit
non-members, exclusions, unresolved candidates, and the rule that partitions
those populations. Otherwise, a smaller map could be mistaken for a more
complete evidence base rather than a stricter publication decision.

## Current Product Boundary

The implemented runtime is an atlas builder and evidence-publication system.
It supports named source collection, source-preserving preparation, governed
objects and decisions, declared ranking models, sensitivity outputs, and
manifested regional and fieldwork products.

It is not yet a general cross-domain harmonization or causal-inference engine.
Unlike observation units are not automatically reconciled, and product
membership does not authorize workflow-wide scientific interpretation.

## Public Surfaces

| Surface | Answers | Does not answer |
| --- | --- | --- |
| source families | what entered, under which identity and access conditions | record-level publication fitness |
| evidence database | objects, relations, fact ownership, revisions, and coherent state | whether every object belongs in a product |
| curation records | conflicts, decisions, recovery, admission, and refusal | new source-native facts |
| product manifests | versioned scope, members, non-members, roles, and caveats | stronger evidence than the database contains |
| Nordic atlas | role-aware spatial comparison and traceability | causation or contemporaneity from proximity |
| fieldwork records | dated visits, locations, media, and bounded observations | lake-wide conditions or sampling readiness |

## Current Scientific Limits

The public products remain deliberately smaller than the collected evidence:

- animal sample, locality, chronology, coordinate, and source-recovery gaps can
  remain qualified, excluded, or release-blocking;
- SEAD supports inventory and spatial context, not general numeric temporal
  comparison;
- RAÄ coverage is Sweden-specific and does not provide an equivalent Nordic
  registry;
- modern administrative boundaries frame publication scope without adding
  scientific weight;
- lake rankings express evidence richness and decision support, not field
  readiness or coring-site selection;
- field visits document bounded observations without validating nearby data
  layers.

These limits are product facts and remain attached to the relevant evidence
and report surfaces.

## Reproduce Or Challenge A Result

1. Name the product manifest and stable member.
2. Recover the admission decision and governed evidence identities.
3. Inspect source, locality, coordinate, chronology, taxonomy, role, and caveat.
4. Confirm database, runtime, and product revisions.
5. Recompute only through the owner of the disputed transition.
6. Compare identities, semantics, decisions, populations, and manifested
   descendants—not only files or rendered appearance.

Continue with the [data guide](https://bijux.io/bijux-pollenomics/public/pollenomics-data/)
for source and curation authority, the [database model](https://bijux.io/bijux-pollenomics/public/pollenomics-data/database/)
for coherent evidence state, or the [report portal](https://bijux.io/bijux-pollenomics/report/)
for checked-in publication products.
