/**
 * Foundation: Radius
 *
 * Bebop Design System — Border radius at 3 levels.
 *
 * Prefix: --gnrc-borderRadius-{level}-{name}
 *
 *   Level 1: Atomic    — smallest controls (chips, badges, inputs)
 *   Level 2: Composite — compound components (cards, dialogs)
 *   Level 3: Layout    — page-level containers (navigation, drawers)
 */

// ─── Level 1: Atomic ────────────────────────────────────────

export const radiusAtomic = {
  small:    '8px',
  medium:   '12px',
  large:    '16px',
  circular: '9999px',
} as const;

// ─── Level 2: Composite ────────────────────────────────────

export const radiusComposite = {
  small:  '12px',
  medium: '16px',
  large:  '24px',
} as const;

// ─── Level 3: Layout ───────────────────────────────────────

export const radiusLayout = {
  medium: '0px',
} as const;

// ─── Aggregate Export ──────────────────────────────────────

export const radius = {
  atomic:    radiusAtomic,
  composite: radiusComposite,
  layout:    radiusLayout,
} as const;
