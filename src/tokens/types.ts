/**
 * Token type definitions
 *
 * Shared types for the token system.
 */

/** A flat map of CSS variable name → value */
export type CSSVarMap = Record<string, string>;

/** Recursive token object — leaves are strings */
export type TokenValue = string | number | { [key: string]: TokenValue };

/** Token layer identifiers */
export type TokenLayer = 'foundations' | 'components' | 'patterns';

/** CSS variable prefixes per layer */
export const TOKEN_PREFIX: Record<TokenLayer, string> = {
  foundations: '--f',
  components: '--c',
  patterns:   '--p',
} as const;
