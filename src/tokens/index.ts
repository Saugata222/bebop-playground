/**
 * Design System Tokens — unified entry point
 *
 * Import foundations from here. Import components from '../components'.
 *
 * Architecture:
 *   src/tokens/         — Foundation tokens + contract utilities
 *   src/components/     — Component tokens (primitives, compound, shared)
 *   src/patterns/       — Pattern tokens (future)
 */

// ─── Foundations ────────────────────────────────────────────
export {
  color, neutral, brand, red, orange, green, blue, teal,
  white, black, neutralTransparent, brandTransparent,
  lightnessScale, colorRole, colorInteraction,
  spacing, gap, padding,
  typography, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing,
  typeFunctional, typeContent,
  radius, radiusAtomic, radiusComposite, radiusLayout,
  stroke, strokePrimitive, strokeGeneric,
  elevation,
  grid, breakpoint, readingGrid,
  state, stateAffordance, additionalAffordances,
} from './foundations';

// ─── Contract Utilities ────────────────────────────────────
export {
  flattenTokens,
  toCSSDeclarations,
  toRootCSS,
  tokenVar,
  foundationVars,
  componentVars,
  patternVars,
  allVars,
  rootCSS,
} from './contract';

// ─── Types ─────────────────────────────────────────────────
export type { CSSVarMap, TokenValue, TokenLayer } from './types';
export { TOKEN_PREFIX } from './types';
