# Bebop Design System — Agent Guidelines

Spec-as-code design system for the Microsoft Copilot shell. TS `as const` objects → CSS custom properties via `src/tokens/contract.ts`. See `CLAUDE.md` for full architecture, semantic colors, and Figma workflow.

## Architecture

Three token layers: **Foundations** (`--f-`, `src/tokens/foundations/`), **Components** (`--c-`, `src/components/`), **Patterns** (`--p-`, `src/patterns/`). Token pipeline: nested TS objects → `flattenTokens()` → `CSSVarMap` → `rootCSS` (`:root { ... }` string). Use `tokenVar('foundations', 'color.brand.500')` → `var(--f-color-brand-500)`.

## Code Style

- `as const` on every exported object/array — named exports only, no default exports
- `import type` for type-only imports (`verbatimModuleSyntax: true`)
- camelCase identifiers; numeric keys where natural (`fontSize[10]`, `neutral[26]`)
- Section separators: `// ─── Section Name ─────────────────────────────`
- JSDoc file headers with naming prefix, purpose, design rationale

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
npm run build:all           # All 16 previews + inject catalog topbar
npm run serve               # python3 -m http.server 8765
```

**Important**: `preview/` is excluded from tsconfig — preview scripts are not type-checked, only run via `tsx`. No test framework; validation is `tsc --noEmit` only.

## Preview System

Each `preview/src/{component}.ts` builds CSS + HTML as strings → writes self-contained HTML to `preview/dist/`. Icons from `preview/src/_icons.ts` (~50 SVG constants) or read directly from `src/components/icons/` via `fs.readFileSync`.

**Shell** (`preview/src/shell.ts`): CSS/HTML/JS all via string concatenation. To modify: add `css += '...'`, `html += '...'`. JS newlines must use `'\n'` not `'\\n'`. Rebuild with `npx tsx preview/src/shell.ts`. Key CSS states: `.shell--sent`, `.shell--responded`, `.nav--collapsed`, `.am-overlay--open`, `.src-overlay--open`.

## Fluent UI

Use `@fluentui/web-components` for runtime UI. 64 icons in `src/components/icons/`, naming: `{name}-{size}-{variant}.svg`.
