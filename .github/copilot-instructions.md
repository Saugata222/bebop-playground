# Bebop Design System — Agent Guidelines

Spec-as-code design system for the Microsoft Copilot shell. TS `as const` objects → CSS custom properties via `src/tokens/contract.ts`. See `CLAUDE.md` for full architecture details, shell modification guide, and flow exploration patterns.

## Architecture

Three token layers: **Foundations** (`--f-`, `src/tokens/foundations/`), **Components** (`--c-`, `src/components/`), **Patterns** (`--p-`, `src/patterns/`). Token pipeline: nested TS objects → `flattenTokens()` → `CSSVarMap` → `rootCSS` (`:root { ... }` string). Use `tokenVar('foundations', 'color.brand.500')` → `var(--f-color-brand-500)`.

## Semantic Colors

These Figma semantic aliases appear across all components — match them before hardcoding:

| Value | Usage |
|-------|-------|
| `#242424` | Primary text, focus underline, primary button bg |
| `#1f1f1f` | Entered input text |
| `#5d5d5d` | Secondary text, divider text |
| `#6f6f6f` | Tertiary/placeholder text, rest underline |
| `#929292` | Disabled foreground |
| `#f5f5f5` | Subtle background (secondary button, chips) |
| `#ebebeb` | Soft background (selected backplate, disabled bg) |
| `#dedede` | Subtle stroke (divider, outline border) |
| `#2b2b2b` | Heavy hover (primary button, tag) |
| `rgba(36,36,36,0.04)` | Transparent hover |

## Code Style

- `as const` on every exported object/array — named exports only, no default exports
- `import type` for type-only imports (`verbatimModuleSyntax: true`)
- camelCase identifiers; numeric keys where natural (`fontSize[10]`, `neutral[26]`)
- Section separators: `// ─── Section Name ─────────────────────────────`
- JSDoc file headers with `Prefix: --c-{name}-{property}`, purpose, design rationale

Exemplary files: `src/tokens/foundations/color.ts`, `src/components/primitives/button.ts`

## File & Export Conventions

Every token file: JSDoc header → granular named `as const` exports → aggregate export tree. Every directory has a barrel `index.ts`.

```typescript
export const componentSizeSmall = { height: '24px' } as const;
export const componentSizeMedium = { height: '32px' } as const;
export const component = {
  size: { small: componentSizeSmall, medium: componentSizeMedium },
} as const;
```

**Barrel files**: Foundations barrel uses explicit named re-exports grouped by module. Components barrel uses `export *` for primitives/compound but explicit names for shared. Always add new exports to the relevant barrel.

**Cross-layer references**: Component tokens may embed foundation `var()` references as strings (e.g., `borderRadius: 'var(--f-radius-atomic-circular)'`). Match existing foundation values before hardcoding.

## Build & Verify

```sh
npx tsc --noEmit            # Type-check (strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes)
npx tsx preview/src/X.ts    # Generate single component preview
npm run build               # Shell preview only
npm run build:all           # All 24 previews + inject catalog topbar
npm run serve               # python3 -m http.server 8765
```

**First run**: If `node_modules/` doesn't exist, run `npm install` before any build command.

**Important**: `preview/` is excluded from tsconfig — preview scripts are not type-checked, only run via `tsx`. No test framework; validation is `tsc --noEmit` only.

## Preview System

Each `preview/src/{component}.ts` builds CSS + HTML as strings → writes self-contained HTML to `preview/dist/`. Icons from `preview/src/_icons.ts` (~50 SVG constants) or read directly from `src/components/icons/` via `fs.readFileSync`.

**Catalog pages**: `preview/playground.html` (component catalog), `preview/start-experimenting.html` (onboarding guide), `preview/prototypes.html` (flow explorations showcase), `preview/tokens.html` (design system tokens reference).

**String escaping in preview generators**: Three nesting layers (TS string → HTML → browser JS). In `html +=` lines, use single quotes for TS wrapper and escaped `\'` for JS strings. Reserve `"` for HTML attributes only. Browser JS errors are silent — always test in browser console after changes.

**Shell** (`preview/src/shell.ts`): CSS/HTML/JS all via string concatenation. To modify: add `css += '...'`, `html += '...'`. JS newlines must use `'\n'` not `'\\n'`. Rebuild with `npx tsx preview/src/shell.ts`. Key CSS states: `.shell--sent`, `.shell--responded`, `.nav--collapsed`, `.am-overlay--open`, `.src-overlay--open`. Key DOM IDs: `#textarea`, `#sendBtn`, `#stopBtn`, `#addBtn`, `#skipThinking`, `#navToggle`, `#changeDsBtn`.

**Store views** (`store1.ts`, `store2.ts`, `store3.ts`): Agent/connector catalog variants within the shell. `patch-shell-store.ts` patches the store view into `shell.html` post-build.

**Flow explorations** (`connectorsGoldenFlow.ts`, `seamlessConnect.ts`): Full shell replicas with flow-specific state/UI layers on top. These read icons directly via `fs.readFileSync` from `src/components/icons/` rather than importing from `_icons.ts`.

**When creating a new flow exploration**: Also add a card for it in the "My Prototypes" section of `preview/prototypes.html`. If the empty state is showing (the `<!-- EMPTY STATE -->` block), replace it with a featured card. Use the same card markup as the Community Prototypes cards.

**Catalog injection**: `preview/src/_inject.ts` post-processes all preview HTML files using a `ComponentMeta` dictionary (18 entries). When adding a new preview, add a metadata entry in `_inject.ts` (title, desc, type, states, related) or the catalog will be incomplete. Also add a card to `preview/playground.html` and update the component count.

## Adding a New Component

1. Create token file in `src/components/primitives/` or `compound/` (JSDoc header with `Prefix:`, section separators, granular exports + aggregate tree)
2. Add named exports to the relevant barrel `index.ts`
3. Create preview generator in `preview/src/{component}.ts`
4. Add component metadata to `preview/src/_inject.ts`
5. Run `npx tsc --noEmit` then `npm run build:all`

## Fluent UI

Use `@fluentui/web-components` for runtime UI. ~95 icons in `src/components/icons/`, naming: `{name}-{size}-{variant}.svg`.

## Figma-to-Token Workflow

1. Get design with `mcp_com_figma_mcp_get_design_context`
2. Extract exact values: hex colors, px spacing, font sizes, radii, shadows
3. Cross-reference with foundations — use `var(--f-...)` where a match exists
4. Hardcode only component-specific values not in the ramps
5. Copy needed Fluent icons from `/Users/saugata/Downloads/fluentui-system-icons-main/assets/` to `src/components/icons/`
