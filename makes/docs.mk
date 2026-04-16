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
DOCS_ENV             := DISABLE_MKDOCS_2_WARNING=true
PYTHON_BIN           ?= $(shell command -v python3 2>/dev/null)
TABLE_GUARD          ?= internal/quality/markdown_table_guard.py
SHELL_SYNC_SCRIPT    ?= internal/scripts/sync_bijux_shell.sh
SITE_PUBLISH_SCRIPT  ?= internal/scripts/publish_site_root.sh
SHELL_SOT_GUARD      ?= internal/scripts/verify_shell_source_of_truth.sh
SHELL_CONTRACT_GUARD ?= internal/quality/validate_shell_contract.py

ifeq ($(strip $(UV_BIN)),)
  ifeq ($(strip $(MKDOCS_BIN_CAND)),)
    DOCS_RUN =
  else
    DOCS_RUN = XDG_CACHE_HOME="$(DOCS_CACHE_DIR)" $(DOCS_ENV) "$(MKDOCS_BIN_CAND)"
  endif
else
  DOCS_RUN = XDG_CACHE_HOME="$(DOCS_CACHE_DIR)" UV_PROJECT_ENVIRONMENT="$(DOCS_VENV_DIR)" $(DOCS_ENV) "$(UV_BIN)" run --with-requirements "$(DOCS_REQUIREMENTS)" mkdocs
endif

.PHONY: docs docs-clean docs-require docs-serve docs-sanity site-root shell-sync shell-check

##@ Documentation
docs-require: ## Verify the documentation build inputs are present
	@test -f "$(MKDOCS_CFG)" || (echo "ERROR: missing $(MKDOCS_CFG)" && exit 1)
	@test -f "$(DOCS_REQUIREMENTS)" || (echo "ERROR: missing $(DOCS_REQUIREMENTS)" && exit 1)
	@test -n "$(DOCS_RUN)" || (echo "ERROR: install uv or mkdocs to build docs" && exit 1)
	@test -n "$(PYTHON_BIN)" || (echo "ERROR: install python3 for docs sanity checks" && exit 1)
	@test -f "$(TABLE_GUARD)" || (echo "ERROR: missing $(TABLE_GUARD)" && exit 1)
	@test -f "$(SHELL_SYNC_SCRIPT)" || (echo "ERROR: missing $(SHELL_SYNC_SCRIPT)" && exit 1)
	@test -f "$(SHELL_SOT_GUARD)" || (echo "ERROR: missing $(SHELL_SOT_GUARD)" && exit 1)
	@test -f "$(SHELL_CONTRACT_GUARD)" || (echo "ERROR: missing $(SHELL_CONTRACT_GUARD)" && exit 1)

docs: docs-clean docs-require shell-sync ## Build documentation into artifacts/docs/site
	@echo "Building documentation"
	@mkdir -p "$(DOCS_CACHE_DIR)" "$(DOCS_VENV_DIR)"
	@SITE_URL="$(SITE_URL)" $(DOCS_RUN) build --strict --config-file "$(MKDOCS_CFG)" --site-dir "$(DOCS_SITE_DIR)"
	@if test -f CNAME; then cp CNAME "$(DOCS_SITE_DIR)/CNAME"; fi
	@echo "Documentation build complete"

shell-sync: docs-require ## Synchronize shared shell into docs and generated root mirrors
	@bash "$(SHELL_SYNC_SCRIPT)"

shell-check: docs-require ## Verify shared shell mirrors and contract checks
	@"$(PYTHON_BIN)" "$(SHELL_CONTRACT_GUARD)" .
	@bash "$(SHELL_SOT_GUARD)"

docs-sanity: docs-require ## Run lightweight documentation sanity checks
	@"$(PYTHON_BIN)" "$(TABLE_GUARD)" docs
	@$(MAKE) shell-sync
	@$(MAKE) shell-check
	@$(MAKE) docs

site-root: docs ## Publish the built site into the repository root served by GitHub Pages
	@test -f "$(SITE_PUBLISH_SCRIPT)" || (echo "ERROR: missing $(SITE_PUBLISH_SCRIPT)" && exit 1)
	@bash "$(SITE_PUBLISH_SCRIPT)" "$(DOCS_SITE_DIR)"
	@echo "Repository root publication complete"

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
