/**
 * Token Contract
 *
 * Utilities to flatten token objects into CSS custom properties
 * and generate injectable style strings.
 */

import type { CSSVarMap, TokenValue } from './types';
import { TOKEN_PREFIX } from './types';

// ─── Flattening ────────────────────────────────────────────

/**
 * Recursively flatten a nested token object into a flat CSS variable map.
 *
 * @example
 *   flattenTokens({ color: { brand: { 500: '#6366F1' } } }, '--f')
 *   // => { '--f-color-brand-500': '#6366F1' }
 */
export function flattenTokens(
  obj: Record<string, TokenValue>,
  prefix: string,
  result: CSSVarMap = {},
): CSSVarMap {
  for (const [key, value] of Object.entries(obj)) {
    const varName = `${prefix}-${key}`;

    if (typeof value === 'string') {
      result[varName] = value;
    } else if (typeof value === 'number') {
      result[varName] = String(value);
    } else {
      flattenTokens(value as Record<string, TokenValue>, varName, result);
    }
  }
  return result;
}

// ─── CSS Generation ────────────────────────────────────────

/**
 * Convert a CSSVarMap into a CSS declaration block string.
 *
 * @example
 *   toCSSDeclarations({ '--f-color-white': '#FFFFFF' })
 *   // => '  --f-color-white: #FFFFFF;\n'
 */
export function toCSSDeclarations(vars: CSSVarMap): string {
  return Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');
}

/**
 * Wrap declarations in a `:root` selector.
 */
export function toRootCSS(vars: CSSVarMap): string {
  return `:root {\n${toCSSDeclarations(vars)}\n}`;
}

// ─── Token accessor helper ─────────────────────────────────

/**
 * Build a `var(--prefix-path)` reference string from a dot-path.
 *
 * @example
 *   tokenVar('foundations', 'color.brand.600')
 *   // => 'var(--f-color-brand-600)'
 */
export function tokenVar(layer: keyof typeof TOKEN_PREFIX, path: string): string {
  const prefix = TOKEN_PREFIX[layer];
  const varName = `${prefix}-${path.replace(/\./g, '-')}`;
  return `var(${varName})`;
}

// ─── Pre-built flat maps ───────────────────────────────────

import * as foundations from './foundations';
import * as components from '../components';

export const foundationVars = flattenTokens(
  foundations as unknown as Record<string, TokenValue>,
  TOKEN_PREFIX.foundations,
);

export const componentVars = flattenTokens(
  components as unknown as Record<string, TokenValue>,
  TOKEN_PREFIX.components,
);

export const patternVars = flattenTokens(
  {} as Record<string, TokenValue>,
  TOKEN_PREFIX.patterns,
);

/** All CSS variables merged */
export const allVars: CSSVarMap = {
  ...foundationVars,
  ...componentVars,
  ...patternVars,
};

/** Full :root CSS string — ready to inject */
export const rootCSS = toRootCSS(allVars);
