/**
 * Foundation: Stroke
 *
 * Bebop Design System — Border width tokens.
 *
 * Primitive prefix: --prmt-stroke-width-{n}
 * Generic prefix:  --gnrc-stroke-width-{name}
 */

// ─── Primitive Stroke Widths ────────────────────────────────

export const strokePrimitive = {
  1: '1px',
  2: '2px',
  3: '3px',
} as const;

// ─── Generic Stroke Widths ─────────────────────────────────

export const strokeGeneric = {
  thin:    '1px',
  thick:   '2px',
  thicker: '3px',
} as const;

// ─── Aggregate Export ──────────────────────────────────────

export const stroke = {
  primitive: strokePrimitive,
  generic:   strokeGeneric,
} as const;
