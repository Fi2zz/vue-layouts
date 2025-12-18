# Makefile for FlueKit Project

# Default shell
SHELL := /bin/bash

# Project variables
PACKAGE_NAME := fluekit
DOCS_PACKAGE := fluekit-docs
DIST_DIR := packages/fluekit/dist
DOCS_DIST_DIR := packages/docs/.vitepress/dist

.PHONY: help install dev build build-lib build-docs test lint format clean publish

# Default target
help:
	@echo "FlueKit Makefile Commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make dev        - Start documentation dev server"
	@echo "  make build      - Build library and documentation"
	@echo "  make build-lib  - Build FlueKit library only"
	@echo "  make build-docs - Build documentation only"
	@echo "  make test       - Run unit tests"
	@echo "  make lint       - Run linter"
	@echo "  make format     - Format code with Prettier"
	@echo "  make clean      - Clean build artifacts"
	@echo "  make publish    - Publish package to npm (requires login)"
	@echo "  make publish-dry - Dry run publish to check contents"

# Install dependencies
install:
	pnpm install

# Development
dev:
	pnpm docs:dev

# Build
build: build-lib build-docs

build-lib:
	pnpm build:fluekit

build-docs:
	pnpm docs:build

# Testing & Quality Control
test:
	pnpm -C packages/fluekit test run

lint:
	pnpm lint

format:
	pnpm format

# Clean build artifacts
clean:
	rm -rf $(DIST_DIR)
	rm -rf $(DOCS_DIST_DIR)
	rm -rf packages/fluekit/node_modules
	rm -rf packages/docs/node_modules
	rm -rf node_modules

# Publish flow
# Note: Ensure you are logged in to npm via `npm login` or `pnpm login` before running this
publish: build-lib test lint
	@echo "Publishing $(PACKAGE_NAME)..."
	cd packages/fluekit && pnpm publish --no-git-checks

# Dry run publish to verify contents without actually publishing
publish-dry: build-lib test lint
	@echo "Dry run publishing $(PACKAGE_NAME)..."
	cd packages/fluekit && pnpm publish --dry-run --no-git-checks
