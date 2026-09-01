/**
 * Component: Tab
 *
 * One Copilot / Bebop Design System — Pill-style tab for use inside a TabList.
 *
 * A tab allows people to switch between categories of related information.
 * Uses a filled-backplate affordance: the selected tab receives a neutral-heavy
 * background with white foreground, while unselected tabs are transparent.
 * A tab is never standalone — it must live inside a TabList, which must always
 * have exactly one Selected tab.
 *
 * Properties:
 *   Layout:   Icon + label | Icon only
 *   State:    Rest | Hover | Pressed | Disabled
 *   Selected: true | false
 *   Focused:  true | false (keyboard focus ring overlay)
 *
 * Selected affordance (container/singleSelect):
 *   - Background shifts to neutral-heavy (#242424)
 *   - Text becomes white, weight shifts Regular (420) -> Semibold (625)
 *   - Icon variant shifts from Regular to Filled
 *
 * Font — EXACT: Segoe Sans (functional), body-medium 14 / 20.
 * Focus ring: 2px black outer border + 1px white inner border.
 *
 * Prefix: --c-tab-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Tab (node 1413:25925)
 */

// ─── Size Tokens ─────────────────────────────────────

/**
 * Icon + Label layout — single size (medium) matching the Figma spec.
 * min-height and min-width ensure touch-target compliance.
 */
export const tabSize = {
  /** Minimum height */
  height: '32px',
  /** Minimum width */
  minWidth: '32px',
  /** Icon size (leading icon) */
  iconSize: '20px',
  /** Font size — --gnrc-font-size-functional-body-medium (14px) */
  fontSize: '14px',
  /** Font weight — --gnrc-font-weight-functional-regular (unselected) */
  fontWeight: '420',
  /** Font weight — --gnrc-font-weight-functional-bold (selected, semibold) */
  fontWeightSelected: '625',
  /** Line height — --gnrc-line-height-functional-body-medium */
  lineHeight: '20px',
  /** Horizontal padding — --gnrc-spacing-component-base-300 (12px) */
  paddingInline: '12px',
  /** Vertical padding — --gnrc-spacing-component-base-150 (6px) */
  paddingBlock: '6px',
  /** Gap between icon and label — --gnrc-spacing-component-base-100 (4px) */
  gap: '4px',
  /** Border radius — --gnrc-border-radius-base-300 (12px) */
  borderRadius: '12px',
} as const;

// ─── Icon-Only Size Tokens ──────────────────────────────────

/**
 * Icon-only layout — circular pill containing a single 20px icon.
 */
export const tabIconOnly = {
  /** Padding — padding/tight/medium (6px) */
  padding: '6px',
  /** Icon size */
  iconSize: '20px',
  /** Circular border radius */
  borderRadius: '9999px',
} as const;

// ─── Style Tokens — Unselected ──────────────────────────────

export const tabStyleUnselected = {
  /** Rest: fully transparent — --gnrc-color-background-neutral-transparent */
  backgroundRest: 'rgba(36, 36, 36, 0)',
  /** Hover: transparent + alpha-hover overlay (rgba(24,24,24,0.04)) */
  backgroundHover: 'rgba(24, 24, 24, 0.04)',
  /** Pressed: transparent + alpha-press overlay (rgba(13,13,13,0.08)) */
  backgroundPressed: 'rgba(13, 13, 13, 0.08)',
  /** Text color — foreground/neutral/primary */
  colorRest: '#242424',
  /** Hover text — primary + lightness-hover */
  colorHover: '#181818',
  /** Pressed text — primary + lightness-press */
  colorPressed: '#0d0d0d',
  /** Icon variant — Regular (outline) */
  iconVariant: 'Regular',
} as const;

// ─── Style Tokens — Selected ───────────────────────────

export const tabStyleSelected = {
  /** Rest: neutral-heavy */
  backgroundRest: '#242424',
  /** Hover: neutral-heavy - lightness-hover */
  backgroundHover: '#313131',
  /** Pressed: neutral-heavy - lightness-press */
  backgroundPressed: '#3e3e3e',
  /** Text color — foreground/neutral/onLoud (white) */
  colorRest: '#ffffff',
  /** Hover text — stays white */
  colorHover: '#ffffff',
  /** Pressed text — stays white */
  colorPressed: '#ffffff',
  /** Icon variant — Filled */
  iconVariant: 'Filled',
} as const;

// ─── State Tokens ────────────────────────────────

export const tabStateDisabled = {
  /** Disabled background (selected + unselected) — --gnrc-color-background-neutral-disabled */
  backgroundUnselected: 'rgba(143, 143, 143, 0.5)',
  /** Selected disabled background — same neutral-disabled fill */
  backgroundSelected: 'rgba(143, 143, 143, 0.5)',
  /** Foreground/neutral/disabled */
  color: 'rgba(0, 0, 0, 0.43)',
  /** Cursor */
  cursor: 'not-allowed',
} as const;

// ─── Focus Ring ─────────────────────────────────────────────

export const tabFocusRing = {
  /** Outer border — black, 2px (strokeWidthThick) */
  outerWidth: '2px',
  outerColor: '#000000',
  /** Inner border — white, 1px (strokeWidthThin) */
  innerWidth: '1px',
  innerColor: '#ffffff',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const tabTypography = {
  /** Functional — --gnrc-font-family-functional (Segoe Sans / display) */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  letterSpacing: '0px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const tab = {
  size: tabSize,
  iconOnly: tabIconOnly,
  style: {
    unselected: tabStyleUnselected,
    selected: tabStyleSelected,
  },
  disabled: tabStateDisabled,
  focusRing: tabFocusRing,
  typography: tabTypography,
} as const;
