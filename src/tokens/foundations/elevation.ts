/**
 * Foundation: Elevation
 *
 * Bebop Design System — Box-shadow levels.
 *
 * 6 elevation levels: subtle → floating
 * Each level has ambient + key shadow layers.
 * Dark mode doubles opacity values.
 *
 * Naming: --shadow/{level}
 */

export const elevation = {
  none: 'none',

  /** E1 — Subtle: cards at rest, minimal lift */
  subtle: {
    light: '0px 0.75px 3px 0px rgba(0, 0, 0, 0.18)',
    dark:  '0px 0.75px 3px 0px rgba(0, 0, 0, 0.36)',
  },

  /** E2 — Soft: hovered cards, raised surfaces */
  soft: {
    light: '0px 1.5px 6px 0px rgba(0, 0, 0, 0.18)',
    dark:  '0px 1.5px 6px 0px rgba(0, 0, 0, 0.36)',
  },

  /** E3 — Standard: dropdowns, active containers */
  standard: {
    light: '0px 3px 12px 0px rgba(0, 0, 0, 0.18)',
    dark:  '0px 3px 12px 0px rgba(0, 0, 0, 0.36)',
  },

  /** E4 — Raised: panels, floating actions */
  raised: {
    light: '0px 6px 24px 0px rgba(0, 0, 0, 0.20)',
    dark:  '0px 6px 24px 0px rgba(0, 0, 0, 0.40)',
  },

  /** E5 — Elevated: dialogs, popovers  (ambient + key) */
  elevated: {
    light: '0px 0px 3px 0px rgba(0, 0, 0, 0.03), 0px 12px 48px 0px rgba(0, 0, 0, 0.24)',
    dark:  '0px 0px 3px 0px rgba(0, 0, 0, 0.06), 0px 12px 48px 0px rgba(0, 0, 0, 0.48)',
  },

  /** E6 — Floating: modals, full-screen overlays (ambient + key) */
  floating: {
    light: '0px 0px 4px 0px rgba(0, 0, 0, 0.06), 0px 24px 96px 0px rgba(0, 0, 0, 0.36)',
    dark:  '0px 0px 4px 0px rgba(0, 0, 0, 0.12), 0px 24px 96px 0px rgba(0, 0, 0, 0.72)',
  },
} as const;
