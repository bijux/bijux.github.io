# Browser checks consume the same built bundle selected for publication.
DOCS_READER_RUNTIME ?= artifacts/docs/reader-runtime
DOCS_READER_REPORT_DIR ?= artifacts/docs/readers
DOCS_READER_BROWSERS ?= chromium firefox webkit
DOCS_READER_BROWSER_FLAGS ?=
DOCS_READER_BROWSER_DIR ?= $(CURDIR)/artifacts/docs/browsers
DOCS_READER_ENV = DOCS_SITE_DIR="$(DOCS_SITE_DIR)" DOCS_READER_RUNTIME="$(DOCS_READER_RUNTIME)" DOCS_READER_REPORT_DIR="$(DOCS_READER_REPORT_DIR)" DOCS_READER_BROWSERS="$(DOCS_READER_BROWSERS)" PLAYWRIGHT_BROWSERS_PATH="$(DOCS_READER_BROWSER_DIR)" TMPDIR="$(CURDIR)/artifacts/docs/browser-profiles"

.PHONY: docs-reader-install docs-reader-browsers docs-reader-check docs-reader-ci gh-docs-install

docs-reader-install: ## Install the pinned documentation browser runtime under artifacts
	@mkdir -p "$(DOCS_READER_RUNTIME)" artifacts/docs/npm-cache artifacts/docs/browser-profiles
	@cp configs/docs/browser/package.json configs/docs/browser/package-lock.json "$(DOCS_READER_RUNTIME)/"
	@npm ci --prefix "$(DOCS_READER_RUNTIME)" --cache artifacts/docs/npm-cache --ignore-scripts --no-audit --no-fund

docs-reader-browsers: docs-reader-install ## Install browser engines for the reader checks
	@$(DOCS_READER_ENV) node "$(DOCS_READER_RUNTIME)/node_modules/playwright/cli.js" install $(DOCS_READER_BROWSER_FLAGS) $(DOCS_READER_BROWSERS)

docs-reader-check: ## Reject any authored diagram without a healthy rendered SVG
	@mkdir -p "$(DOCS_READER_REPORT_DIR)" artifacts/docs/browser-profiles
	@$(DOCS_READER_ENV) node tests/docs/readers/diagrams.mjs

docs-reader-ci: ## Build and verify every diagram in real browser engines
	@$(MAKE) docs-sanity
	@$(MAKE) docs-reader-browsers
	@$(MAKE) docs-reader-check

gh-docs-install: docs-reader-browsers ## Prepare the browser verification required by Pages
