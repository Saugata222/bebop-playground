/**
 * Foundation: Spacing
 *
 * Bebop Design System — Gap & Padding token scale.
 *
 * Gap tokens: --gnrc-gap-{level}-{name}
 *   Level 1: Atomic   (smallest component internals)
 *   Level 2: Composite (compound component spacing)
 *   Level 3: Layout    (page-level spacing)
 *
 * Padding tokens: --gnrc-padding-{tier}-{direction?}
 *   Tier 1: Tight   (compact density)
 *   Tier 2: Regular (standard density)
 *   Tier 3: Relaxed (spacious density)
 */

// ─── Gap: Level 1 — Atomic ─────────────────────────────────

export const gapAtomic = {
  xxSmall: '2px',
  xSmall:  '4px',
  small:   '6px',
  medium:  '8px',
  large:   '12px',
  xLarge:  '16px',
} as const;

// ─── Gap: Level 2 — Composite ──────────────────────────────

export const gapComposite = {
  xSmall: '4px',
  small:  '6px',
  medium: '8px',
  large:  '12px',
  xLarge: '16px',
} as const;

// ─── Gap: Level 3 — Layout ─────────────────────────────────

export const gapLayout = {
  small:   '16px',
  medium:  '24px',
  large:   '32px',
  xLarge:  '48px',
  xxLarge: '96px',
} as const;

// ─── Padding: Tier 1 — Tight ───────────────────────────────

export const paddingTight = {
  top:    '2px',
  right:  '4px',
  bottom: '2px',
  left:   '20px',
} as const;

// ─── Padding: Tier 2 — Regular ─────────────────────────────

export const paddingRegular = {
  top:    '4px',
  right:  '8px',
  bottom: '4px',
  left:   '12px',
} as const;

// ─── Padding: Tier 3 — Relaxed ─────────────────────────────

export const paddingRelaxed = {
  all:    '8px',
  top:    '12px',
  inline: '16px',
  block:  '24px',
  xLarge: '40px',
} as const;

// ─── Aggregate Exports ──────────────────────────────────────

export const gap = {
  atomic:    gapAtomic,
  composite: gapComposite,
  layout:    gapLayout,
} as const;

export const padding = {
  tight:   paddingTight,
  regular: paddingRegular,
  relaxed: paddingRelaxed,
} as const;

export const spacing = {
  gap,
  padding,
} as const;
