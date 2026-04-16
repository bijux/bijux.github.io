# Shell Architecture

The Bijux docs shell is centralized and shared.

Canonical source:

- `shared/bijux-docs/partials/*`
- `shared/bijux-docs/styles/*`
- `shared/bijux-docs/scripts/*`

Generated mirrors:

- `docs/overrides/partials/*`
- `docs/assets/styles/*`
- `docs/assets/javascripts/shell/*`
- `docs/assets/javascripts/navigation-sync.js`

## Commands

- `make bijux-docs-sync` to synchronize docs shell files (`shared -> docs`)
- `make bijux-docs-check` to validate docs shell contract and drift checks
- `make docs-sanity` to run docs shell checks plus docs build
- Backward-compatible aliases: `make shell-sync`, `make shell-check`

## Project Contract

Each consuming project is expected to provide shell config under
`extra.bijux`:

```yaml
extra:
  bijux:
    repository: <string>
    hub_links:
      - key: <string>
        label: <string>
        url: <absolute-url>
    nav_mode: default
    theme_key: bijux:theme
```

Notes:

- `theme_key` must remain shared (`bijux:theme`) for cross-project dark/light persistence.
- `nav_mode` is currently `default` and reserved for controlled shell-level behavior changes.
- Projects can customize labels and URLs, but should not fork docs shell partial structure or runtime logic.
