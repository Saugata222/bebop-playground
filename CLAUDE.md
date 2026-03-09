# Bebop Design System — Agent Instructions

## What This Project Is

A **specification-as-code** design system for the Microsoft Copilot shell UI. Design decisions from Figma are encoded as deeply typed TypeScript constant objects that flatten to CSS custom properties. The preview system generates standalone interactive HTML prototypes directly from token values — no build framework, no runtime UI library.

The crown jewel is `preview/dist/shell.html`: a fully working Copilot prototype with nav sidebar, header, chat input, thinking animation, and streaming response — all in one generated HTML file.

## Architecture

Three token layers, each with a CSS variable prefix:

| Layer | Prefix | Location | What it holds |
|-------|--------|----------|---------------|
| Foundations | `--f-` | `src/tokens/foundations/` | Color ramps, type scales, spacing tiers, elevation, stroke, grid, state |
| Components | `--c-` | `src/components/` | Button, tag, tab, toggle, divider, toolbar, nav, dialog, menu, chatInput, etc. |
| Patterns | `--p-` | `src/patterns/` | Page-level compositions (future) |

**How tokens become CSS**: `src/tokens/contract.ts` recursively flattens nested TS objects into `{ '--f-color-brand-500': '#6366F1' }` via `flattenTokens()`. `tokenVar('foundations', 'color.brand.500')` returns `var(--f-color-brand-500)`. `rootCSS` is the complete `:root { ... }` string.

## File Structure

```
src/
  tokens/
    foundations/           8 modules: color, typography, spacing, radius, stroke, elevation, grid, state
    types.ts               CSSVarMap, TokenValue, TokenLayer, TOKEN_PREFIX
    contract.ts            flattenTokens(), tokenVar(), rootCSS
    index.ts               Re-exports foundations + contract

  components/
    shared/                Cross-cutting tokens used by all interactive components
      focusRing.ts         2px black outer + 1px white inner
      disabledState.ts     #929292 text, #ebebeb bg, not-allowed cursor
      selectedAffordance.ts  Semibold text, filled icons, #ebebeb backplate
    primitives/            9 atomic components: button, tag, tab, tabList, toggle, divider, scrollbar, suggestionChips
    compound/              10 composed components: toolbar, chatInput, canvasChat, dialog, menu, nav, header, addMenu, sourcesMenu
    icons/                 64 Fluent UI System Icon assets (SVG + PNG + GIF)
    index.ts               Barrel: shared + primitives + compound

  patterns/                Future page compositions
  utils/                   Future shared helpers

preview/
  index.html               Component catalog with frosted-glass topbar, card grid, iframe viewer
  getting-started.html     Onboarding guide (Terminal / Claude Code / Copilot Chat tabs)
  src/
    _icons.ts              ~50 shared SVG icon string constants (all use fill="currentColor")
    _inject.ts             Injects catalog topbar into all preview HTML files
    shell.ts               1185-line interactive Copilot prototype generator
    {component}.ts         One generator per component → writes to preview/dist/{component}.html
  dist/                    16 generated HTML files (gitignored)
```

## Code Style

- `as const` on every exported object/array — all values become literal types
- Named exports only — no default exports
- `import type` for type-only imports (`verbatimModuleSyntax: true`)
- camelCase for all identifiers; numeric keys where natural (`fontSize[10]`, `neutral[26]`)
- No enums — `as const` objects instead
- Section separators: `// ─── Section Name ─────────────────────────────`
- JSDoc file headers with purpose, naming prefix, design rationale

Exemplary files: `src/tokens/foundations/color.ts`, `src/tokens/foundations/typography.ts`, `src/components/primitives/button.ts`

## Token Authoring Pattern

```typescript
/** JSDoc header: component name, anatomy, prefix */

// ─── Size Tokens ──────────
export const componentSizeSmall = { height: '24px', padding: '4px 8px' } as const;
export const componentSizeMedium = { height: '32px', padding: '6px 12px' } as const;

// ─── Style Tokens ─────────
export const componentStylePrimary = { background: '#242424', color: '#ffffff' } as const;

// ─── Aggregate Export ─────
export const component = {
  size: { small: componentSizeSmall, medium: componentSizeMedium },
  style: { primary: componentStylePrimary },
} as const;
```

Every directory has a barrel `index.ts` re-exporting all public API.

## Foundation Token Design

- **Color**: 7 HSL hues × 16 lightness stops [26..99], transparent variants (`neutralTransparent`, `brandTransparent`), semantic roles (surface/background/foreground/stroke with contrast targets)
- **Typography**: 3 font families (Segoe Sans, Aptos, Cascadia Code), 13 size stops, `typeFunctional` (14 UI styles) + `typeContent` (19 reading styles)
- **Spacing**: three-tier gap (atomic/composite/layout) + three-tier padding (tight/regular/relaxed)
- **Radius**: atomic (8/12/16/circular) → composite (12/16/24) → layout (0)
- **Stroke**: dual naming — numeric (`1`/`2`/`3`) + semantic (`thin`/`thick`/`thicker`)
- **Elevation**: 7 levels (none → floating), each with `{ light, dark }` box-shadows
- **Grid**: 6 breakpoints (320px → 1920px+), column counts 4–16
- **State**: accessibility-first affordance strategies (not pixel values) — all target 3:1 contrast from rest

## Semantic Colors (not in foundation ramps)

These Figma semantic aliases appear across components:

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

## Selected State Affordance

Three signals combined consistently across Button, Tab, Toolbar, Menu, Nav:

1. **Typographic**: Regular (400) → Semibold (600)
2. **Icon-only**: Regular icon → Filled icon
3. **Transparent variants**: add `#ebebeb` backplate

Defined in `src/components/shared/selectedAffordance.ts`.

## Figma-to-Token Workflow

1. Get design with `mcp_com_figma_mcp_get_design_context`
2. Extract exact values: hex colors, px spacing, font sizes, radii, shadows
3. Cross-reference with foundations — use `var(--f-...)` where a match exists
4. Hardcode only component-specific values not in the ramps
5. Copy needed Fluent icons from `/Users/saugata/Downloads/fluentui-system-icons-main/assets/` to `src/components/icons/`

## Build & Verify

```sh
npx tsc --noEmit            # Type-check
npx tsx preview/src/X.ts    # Generate single component preview
npm run build               # Build shell preview only
npm run build:all           # Build all 16 previews + inject catalog topbar
npm run serve               # python3 -m http.server 8765
```

View at: `http://localhost:8765/preview/dist/shell.html` (or `preview/index.html` for the catalog)

## TypeScript Strictness

- `strict: true`, `noUncheckedIndexedAccess` (indexed access → `T | undefined`), `exactOptionalPropertyTypes`
- `verbatimModuleSyntax` — must use `import type` / `export type` for type-only imports
- Target: ES2020, Module: ESNext

## Preview Generator Pattern

Each `preview/src/{component}.ts` file:
1. Imports icon SVGs from `_icons.ts`
2. Builds CSS via `let css = ''; css += '...';`
3. Builds HTML via `let html = ''; html += '...';`
4. Writes self-contained HTML to `preview/dist/{component}.html`

```typescript
const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'componentName.html'), html, 'utf-8');
```

## Shell Preview — How to Modify

`preview/src/shell.ts` (1185 lines) → `preview/dist/shell.html`

**Structure**: Icon SVG constants → CSS concatenation → HTML concatenation → `<script>` JS → file write

**CSS class states**:
- `.shell--sent` — after send (thinking animation visible)
- `.shell--responded` — after skip thinking (streamed response visible)
- `.nav--collapsed` — sidebar in icon-only mode (56px)
- `.am-overlay--open` — add menu frosted overlay
- `.src-overlay--open` — sources panel overlay

**Key DOM elements**:
- `#textarea` — chat input
- `#sendBtn` / `#stopBtn` — send and stop buttons
- `#addBtn` / `#addBtn2` — + buttons (greeting / response states)
- `#skipThinking` — skip thinking button
- `#navToggle` — copilot logo (toggles nav collapse)
- `#changeDsBtn` — "Change data sources" in add menu

**To add a feature**:
1. CSS rules via `css += '...'`
2. HTML elements via `html += '...'`
3. JS logic via `html += '...'` inside the `<script>` section
4. Use `'\n'` for newlines in JS strings — NOT `'\\n'`
5. Rebuild: `npx tsx preview/src/shell.ts`

## Fluent UI Web Components

Use `@fluentui/web-components` (FAST Element) for runtime UI — don't recreate components.

```typescript
import { setTheme } from '@fluentui/web-components';
import { webLightTheme } from '@fluentui/tokens';
setTheme(webLightTheme);
```

Icons: `src/components/icons/` (64 assets). Naming: `{name}-{size}-{variant}.svg` (e.g., `dismiss-20-regular.svg`, `stop-16-filled.svg`).
