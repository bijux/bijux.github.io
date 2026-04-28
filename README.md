# bijux.github.io

This repo is where we publish the Bijux documentation hub.



The public site lives here, the shared docs shell comes from `bijux-std`, and
the actual hub content and navigation stay owned here.

## What this repo is

This is the public documentation hub for the Bijux repository family.

It is the place where the hub site is built, organized, and published so a
reader can move from high-level orientation into the owning repos and their
actual delivery surfaces.

The root README explains the repo itself.
The public site content starts in [`docs/index.md`](docs/index.md).

## What lives here

- `docs/`
  The hub content, section structure, navigation content, and repository-facing
  pages that make up the published site.
- `mkdocs.yml`
  The hub site configuration for navigation, site metadata, and build behavior.
- `makes/docs.mk`
  Repo-owned docs build and serve commands.
- `.bijux/shared/bijux-docs`
  The shared docs shell synced from `bijux-std`.
- `.github`
  Managed GitHub standards content synced from `bijux-std`.

## What does not live here

Do not use `bijux.github.io` for:

- shared docs shell source of truth
- cross-repo standards logic
- live GitHub admin control-plane settings
- product or domain implementation code from the other Bijux repos

So the split is:

- `bijux.github.io` owns the public hub site and its repo-specific content
- `bijux-std` owns the shared docs shell and managed standards content
- `bijux-iac` owns live GitHub admin governance

## How this repo works

The repo has two layers:

1. repo-owned hub content and site structure
2. synced shared docs shell and standards inputs

That means we write the actual hub pages here, but we do not hand-fork the
shared shell that should stay aligned across Bijux sites.

Normal flow:

1. edit hub content here when the hub itself changes
2. change `bijux-std` first when the shared shell or managed standards change
3. sync the shared layer into this repo
4. run docs and standards checks before shipping

## Main commands

### Build the site

```bash
make docs
```

Builds the site into `artifacts/docs/site`.

### Run docs sanity checks

```bash
make docs-sanity
```

Runs lightweight docs checks, shared shell sync/checks, and a full docs build.

### Serve locally

```bash
make docs-serve
```

Starts a local MkDocs server and automatically picks another port if `8000` is
already in use.

### Refresh shared docs shell

```bash
make bijux-docs-sync
```

Synchronizes the shared docs shell into this repo's docs assets.

### Verify shared standards

```bash
make bijux-std-checks
```

Checks that the shared standard surfaces still match `bijux-std`.

## Relationship to the public site

This repo is the source for `bijux.io`.

The published hub is meant to help a reader find the right owning repo first,
then continue into the real implementation surfaces without losing repository
boundaries.

That is why this repo should stay focused on the hub itself: site structure,
navigation, public framing, and published documentation delivery.

## License

This repository is licensed under the MIT License. Copyright 2026 Bijan
Mousavi <bijan@bijux.io>. See [`LICENSE`](LICENSE).
