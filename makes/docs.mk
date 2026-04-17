# Documentation commands for the Bijux hub site.

UV_BIN               := $(shell command -v uv 2>/dev/null)
MKDOCS_BIN_CAND      ?= $(shell command -v mkdocs 2>/dev/null)
DOCS_REQUIREMENTS    ?= configs/docs/requirements-docs.txt
MKDOCS_CFG           ?= mkdocs.yml
DOCS_SITE_DIR        ?= artifacts/docs/site
DOCS_CACHE_DIR       ?= artifacts/docs/.cache
DOCS_VENV_DIR        ?= artifacts/.venv
DOCS_HOST            ?= 127.0.0.1
DOCS_PORT            ?= 8000
SITE_URL             ?= https://bijux.io/
DOCS_ENV             :=
PYTHON_BIN           ?= $(shell command -v python3 2>/dev/null)
TABLE_GUARD          ?= shared/bijux-docs-tooling/quality/markdown_table_guard.py

ifeq ($(strip $(UV_BIN)),)
  ifeq ($(strip $(MKDOCS_BIN_CAND)),)
    DOCS_RUN =
  else
    DOCS_RUN = XDG_CACHE_HOME="$(DOCS_CACHE_DIR)" $(DOCS_ENV) "$(MKDOCS_BIN_CAND)"
  endif
else
  DOCS_RUN = XDG_CACHE_HOME="$(DOCS_CACHE_DIR)" UV_PROJECT_ENVIRONMENT="$(DOCS_VENV_DIR)" $(DOCS_ENV) "$(UV_BIN)" run --with-requirements "$(DOCS_REQUIREMENTS)" mkdocs
endif

.PHONY: docs docs-clean docs-require docs-serve docs-sanity

##@ Documentation
docs-require: ## Verify the documentation build inputs are present
	@test -f "$(MKDOCS_CFG)" || (echo "ERROR: missing $(MKDOCS_CFG)" && exit 1)
	@test -f "$(DOCS_REQUIREMENTS)" || (echo "ERROR: missing $(DOCS_REQUIREMENTS)" && exit 1)
	@test -n "$(DOCS_RUN)" || (echo "ERROR: install uv or mkdocs to build docs" && exit 1)
	@test -n "$(PYTHON_BIN)" || (echo "ERROR: install python3 for docs sanity checks" && exit 1)
	@test -f "$(TABLE_GUARD)" || (echo "ERROR: missing $(TABLE_GUARD)" && exit 1)
	@test -f "$(BIJUX_DOCS_SYNC_SCRIPT)" || (echo "ERROR: missing $(BIJUX_DOCS_SYNC_SCRIPT)" && exit 1)
	@test -f "$(BIJUX_DOCS_SOT_GUARD)" || (echo "ERROR: missing $(BIJUX_DOCS_SOT_GUARD)" && exit 1)
	@test -f "$(BIJUX_DOCS_CONTRACT_GUARD)" || (echo "ERROR: missing $(BIJUX_DOCS_CONTRACT_GUARD)" && exit 1)

docs: docs-clean docs-require bijux-docs-sync ## Build documentation into artifacts/docs/site
	@echo "Building documentation"
	@mkdir -p "$(DOCS_CACHE_DIR)" "$(DOCS_VENV_DIR)"
	@SITE_URL="$(SITE_URL)" $(DOCS_RUN) build --strict --config-file "$(MKDOCS_CFG)" --site-dir "$(DOCS_SITE_DIR)"
	@if test -f CNAME; then cp CNAME "$(DOCS_SITE_DIR)/CNAME"; fi
	@echo "Documentation build complete"

docs-sanity: docs-require ## Run lightweight documentation sanity checks
	@"$(PYTHON_BIN)" "$(TABLE_GUARD)" docs
	@$(MAKE) bijux-docs-sync
	@$(MAKE) bijux-docs-check
	@$(MAKE) docs

docs-serve: docs-require ## Serve documentation locally with automatic reloads
	@HOST=$${HOST:-$(DOCS_HOST)}; PORT=$${PORT:-$(DOCS_PORT)}; \
	  if command -v lsof >/dev/null 2>&1; then \
	    while lsof -tiTCP:$$PORT -sTCP:LISTEN >/dev/null 2>&1; do PORT=$$((PORT+1)); done; \
	  fi; \
	  echo "Serving documentation on http://$$HOST:$$PORT/"; \
	  mkdir -p "$(DOCS_CACHE_DIR)" "$(DOCS_VENV_DIR)"; \
	  SITE_URL="http://$$HOST:$$PORT/" $(DOCS_RUN) serve --config-file "$(MKDOCS_CFG)" --dev-addr $$HOST:$$PORT

docs-clean: ## Remove generated documentation outputs
	@rm -rf "$(DOCS_SITE_DIR)" "$(DOCS_CACHE_DIR)"
