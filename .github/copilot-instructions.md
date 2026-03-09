# Bebop Design System — Agent Guidelines

## What This Is

A **TypeScript specification-as-code** design system for the Microsoft Copilot shell. Design tokens are hand-authored TS objects with `as const` that flatten to CSS custom properties via `src/tokens/contract.ts`. A preview system generates self-contained interactive HTML prototypes — the shell preview (`preview/dist/shell.html`) is a fully working Copilot prototype.

## Architecture

Three token layers with CSS variable prefixes:

| Layer | Prefix | Location | Status |
|-------|--------|----------|--------|
| Foundations | `--f-` | `src/tokens/foundations/` | 8 modules: color, typography, spacing, radius, stroke, elevation, grid, state |
| Components | `--c-` | `src/components/` | 3 shared + 9 primitives + 10 compound tokens |
| Patterns | `--p-` | `src/patterns/` | Future page compositions |

`src/tokens/contract.ts` provides `flattenTokens()` to recursively convert nested objects into CSS custom properties, `tokenVar(layer, path)` for `var(--f-…)` references, and `rootCSS` as the complete `:root { }` string.

## Code Style

- **`as const`** on every exported object/array — all values become literal types
- **Named exports only** — no default exports
- **`import type`** for type-only imports (`verbatimModuleSyntax: true`)
- **camelCase** for all identifiers; numeric keys where natural (`fontSize[10]`, `neutral[26]`)
- **No enums** — `as const` objects instead
- **Section separators**: `// ─── Section Name ─────────────────────────────`
- **JSDoc file headers** with naming prefix, purpose, design rationale

Exemplary files: `src/tokens/foundations/color.ts`, `src/tokens/foundations/typography.ts`, `src/components/primitives/button.ts`

## File & Export Conventions

Every token file: JSDoc header → granular named exports with `as const` → aggregate export combining them. Every directory has a barrel `index.ts`.

```typescript
export const componentSizeSmall = { height: '24px' } as const;
export const componentSizeMedium = { height: '32px' } as const;
export const component = {
  size: { small: componentSizeSmall, medium: componentSizeMedium },
} as const;
```

## Token Design Patterns

- **Three-tier scaling**: spacing, radius, and gap use atomic → composite → layout tiers
- **Dual naming**: stroke uses both numeric (`1`/`2`/`3`) and semantic (`thin`/`thick`)
- **Light/dark variants**: elevation provides `{ light, dark }` box-shadows per level
- **HSL color ramps**: 7 hues × 16 lightness stops `[26..99]`, transparent variants, semantic roles
- **Selected affordance**: semibold (600) text + filled icon + `#ebebeb` backplate (see `src/components/shared/selectedAffordance.ts`)

## Build & Verify

```sh
npx tsc --noEmit            # Type-check (strict: true, noUncheckedIndexedAccess, exactOptionalPropertyTypes)
npx tsx preview/src/X.ts    # Generate single component preview
npm run build               # Build shell preview
npm run build:all           # Build all 16 previews + inject catalog topbar
npm run serve               # python3 -m http.server 8765
```

Preview catalog: `http://localhost:8765/preview/index.html`
Shell prototype: `http://localhost:8765/preview/dist/shell.html`

## TypeScript Strictness

- `noUncheckedIndexedAccess` — indexed access returns `T | undefined`
- `exactOptionalPropertyTypes` — `undefined` must be explicit, not implied by `?`
- `verbatimModuleSyntax` — use `import type` / `export type` for types
- Target: ES2020, Module: ESNext

## Preview System

Each `preview/src/{component}.ts` builds CSS + HTML strings and writes a self-contained file to `preview/dist/`. Shared icons live in `preview/src/_icons.ts` (~50 SVG constants, all `fill="currentColor"`).

The shell (`preview/src/shell.ts`, 1185 lines) generates the full interactive Copilot prototype. Key CSS states: `.shell--sent` (thinking), `.shell--responded` (response visible), `.nav--collapsed`, `.am-overlay--open`, `.src-overlay--open`. To modify: add CSS/HTML/JS via string concatenation (`css += '...'`, `html += '...'`), then rebuild with `npx tsx preview/src/shell.ts`.

## Fluent UI Web Components

Use `@fluentui/web-components` (FAST Element) for runtime UI — don't recreate Fluent components.

```ts
import { setTheme } from '@fluentui/web-components';
import { webLightTheme } from '@fluentui/tokens';
setTheme(webLightTheme);
```

64 Fluent UI System Icons in `src/components/icons/`. Naming: `{name}-{size}-{variant}.svg`.
