# Bebop Playground

AI-native prototyping for M365 Copilot in Bebop UI. Design tokens, interactive component previews, and a fully working Copilot shell prototype — all built to be modified with an AI assistant.

**Live preview:** [saugata222.github.io/bebop-playground/preview/index.html](https://saugata222.github.io/bebop-playground/preview/index.html)

## Get Started

Open your IDE with an AI assistant (VS Code + Copilot, Claude Code, etc.) and ask it:

> "Clone this repository: https://github.com/Saugata222/bebop-playground.git"

> "Install dependencies, build all previews, start the local server, and open Bebop Playground in the browser."

For the full walkthrough, see the [Start Experimenting](preview/getting-started.html) guide.

## What's Inside

| Page | What it has |
|------|-------------|
| **Get Started** | Bebop Shell prototype + Start Experimenting guide |
| **Prototypes** | Community flow explorations + your own experiments |
| **Design System Tokens** | 11 compound components + 7 primitives with interactive previews |

## Build Commands

```sh
npm run build          # Build shell preview only
npm run build:all      # Build all previews + inject catalog topbar
npm run serve          # Start server on port 8765
npm run dev            # Build + serve
npm run typecheck      # Type-check (tsc --noEmit)
```

**First run:** If `node_modules/` doesn't exist, run `npm install` before any build command.

## Architecture

```
src/
  tokens/foundations/    Color, typography, spacing, radius, stroke, elevation, grid, state
  tokens/contract.ts     flattenTokens(), tokenVar(), rootCSS
  components/shared/     Focus ring, disabled state, selected affordance
  components/primitives/ Button, tag, tab, toggle, divider, suggestion chips, source card
  components/compound/   Toolbar, chat input, nav, header, dialog, menu, add menu, sources menu
  components/icons/      94 Fluent UI + app logo icons

preview/
  index.html             Get Started page (landing + shell + experimenting guide)
  prototypes.html        My Prototypes + Community Prototypes
  tokens.html            Compound + Primitive component previews
  getting-started.html   Start Experimenting guide (6 steps)
  src/                   TypeScript preview generators
  dist/                  Generated HTML files (gitignored)
```

Three token layers: **Foundations** (`--f-`), **Components** (`--c-`), **Patterns** (`--p-`). Each layer is a set of TypeScript `as const` objects that flatten to CSS custom properties.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute prototypes, components, and icons.

## Built by

Saugata Pramanik · Microsoft
