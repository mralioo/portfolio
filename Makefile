.PHONY: help env install dev build preview verify clean

NODE_MIN_MAJOR := 22

help:
	@echo "Targets:"
	@echo "  make env      - check Node/npm versions are good enough for this project"
	@echo "  make install  - install npm dependencies"
	@echo "  make dev      - run the local dev server (http://localhost:4321)"
	@echo "  make build    - build the static site into dist/"
	@echo "  make preview  - build, then serve dist/ locally (closest thing to the real GitHub Pages output)"
	@echo "  make verify   - build + preview in one step, for a final check before pushing"
	@echo "  make clean    - remove node_modules, dist, and the Astro cache"

env:
	@command -v node >/dev/null 2>&1 || { echo "Node.js not found. Install Node >= $(NODE_MIN_MAJOR) first."; exit 1; }
	@command -v npm >/dev/null 2>&1 || { echo "npm not found. It ships with Node.js."; exit 1; }
	@node_major=$$(node -v | sed -E 's/^v([0-9]+).*/\1/'); \
	if [ "$$node_major" -lt $(NODE_MIN_MAJOR) ]; then \
		echo "Node $$(node -v) is too old. This project needs Node >= $(NODE_MIN_MAJOR)."; \
		exit 1; \
	fi
	@echo "Node $$(node -v) / npm $$(npm -v) OK."

install: env
	npm install

dev: install
	npm run dev

build: install
	npm run build

preview: build
	npm run preview

# Build + serve the production bundle locally so you can click through the
# site exactly as GitHub Pages will serve it, before pushing to main.
verify: build
	@echo ""
	@echo "Build OK. Starting local preview of the production build..."
	@echo "Open the printed URL, click through every page, then Ctrl+C when done."
	@echo ""
	npm run preview

clean:
	rm -rf node_modules dist .astro
