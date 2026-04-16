ROOT_MAKEFILE_DIR := $(abspath $(dir $(lastword $(MAKEFILE_LIST))))

include $(ROOT_MAKEFILE_DIR)/bijux-docs.mk
include $(ROOT_MAKEFILE_DIR)/docs.mk

.PHONY: help

##@ Repository
help: ## Show available repository commands
	@awk 'BEGIN {FS = ":.*## "}; /^[a-zA-Z0-9_.-]+:.*## / {printf "%-18s %s\n", $$1, $$2}' \
	  "$(ROOT_MAKEFILE_DIR)/bijux-docs.mk" "$(ROOT_MAKEFILE_DIR)/docs.mk" "$(CURDIR)/Makefile"
