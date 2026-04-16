# Shell Architecture

The Bijux shell is centralized and shared.

Canonical source:

- `shared/bijux-shell/partials/*`
- `shared/bijux-shell/styles/*`
- `shared/bijux-shell/scripts/*`

Generated mirrors:

- `docs/overrides/partials/*`
- `docs/assets/styles/*`
- `docs/assets/javascripts/shell/*`
- `docs/assets/javascripts/navigation-sync.js`
- `assets/styles/*`
- `assets/javascripts/shell/*`
- `assets/javascripts/navigation-sync.js`

## Commands

- `make shell-sync` to synchronize shell files (`shared -> docs -> assets`)
- `make shell-check` to validate shell contract and drift checks
- `make docs-sanity` to run shell checks plus docs build

## Project Contract

Each consuming project must provide shell config under `extra.bijux`:

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
- Projects can customize labels and URLs, but should not fork shell partial structure or shell runtime logic.
