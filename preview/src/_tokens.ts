/**
 * Preview token injector.
 *
 * Single source of truth for preview HTML styling:
 *   1. Declares the local Segoe Sans variable woff2 via @font-face
 *      (loaded from ../fonts/ relative to preview/dist/{name}.html).
 *   2. Emits the full foundation + component :root { --f-*, --c-* }
 *      contract from src/tokens/contract.ts.
 *
 * Usage inside any generator under preview/src/:
 *   import { tokensCSS } from './_tokens';
 *   ...
 *   let css = '';
 *   css += tokensCSS;       // must come before any other rules
 *   css += 'body { ... }';
 *
 * Once injected, preview CSS can reference:
 *   font-family: var(--f-typography-fontFamily-functional);
 *   font-family: var(--f-typography-fontFamily-content);
 *   font-family: var(--f-typography-fontFamily-contentCode);
 *   font-size:   var(--f-typography-fontSize-14);
 *   font-weight: var(--f-typography-fontWeight-semibold);
 *   line-height: var(--f-typography-lineHeight-regular);
 */

import { rootCSS } from '../../src/tokens/contract';

const fontFaceCSS = [
  '@font-face {',
  "  font-family: 'Segoe Sans';",
  "  src: url('../fonts/Segoe-sans.woff2') format('woff2-variations'),",
  "       url('../fonts/Segoe-sans.woff2') format('woff2');",
  '  font-weight: 100 900;',
  '  font-style: normal;',
  '  font-display: swap;',
  '}',
  '@font-face {',
  "  font-family: 'Segoe Sans';",
  "  src: url('../fonts/Segoe-sans-Italic.woff2') format('woff2-variations'),",
  "       url('../fonts/Segoe-sans-Italic.woff2') format('woff2');",
  '  font-weight: 100 900;',
  '  font-style: italic;',
  '  font-display: swap;',
  '}',
].join('\n');

export const tokensCSS = fontFaceCSS + '\n' + rootCSS + '\n';

// ─── Family aliases for generator code readability ────────────

/** UI chrome — controls, navigation, menus, form fields. */
export const FAMILY_FUNCTIONAL = 'var(--f-typography-fontFamily-functional)';
/** Long-form reading — assistant responses, paragraphs. */
export const FAMILY_CONTENT = 'var(--f-typography-fontFamily-content)';
/** Editorial expressive titles (Segoe Serif). */
export const FAMILY_EDITORIAL = 'var(--f-typography-fontFamily-contentEditorial)';
/** Monospace / code (Consolas). */
export const FAMILY_CODE = 'var(--f-typography-fontFamily-contentCode)';
