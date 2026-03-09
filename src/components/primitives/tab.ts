/**
 * Component: Tab
 *
 * Bebop Design System — Pill-style tab for use inside a TabList.
 *
 * A tab allows people to switch between categories of related information.
 * Uses a filled-backplate affordance: selected tabs receive a neutral-heavy
 * background with white foreground, while unselected tabs are transparent.
 *
 * Properties:
 *   Layout:   Icon + label | Icon only
 *   State:    Rest | Hover | Disabled
 *   Selected: true | false
 *   Focused:  true | false (keyboard focus ring overlay)
 *
 * Selected affordance (container/singleSelect):
 *   - Background shifts to neutral-heavy (#242424)
 *   - Text becomes white, weight shifts to semibold (600)
 *   - Icon variant shifts from Regular to Filled
 *
 * Focus ring: 2px black outer border + 1px white inner border
 *   (identical to button/tag focus ring)
 *
 * Prefix: --c-tab-{property}
 */

// ─── Size Tokens ────────────────────────────────────────────

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
  /** Font size — body-medium default (14px) */
  fontSize: '14px',
  /** Font weight — regular (unselected) */
  fontWeight: '400',
  /** Font weight — semibold (selected) */
  fontWeightSelected: '600',
  /** Line height — 1.4 */
  lineHeight: '1.4',
  /** Horizontal padding — padding/tight/large (10px) */
  paddingInline: '10px',
  /** Vertical padding — padding/tight/medium (6px) */
  paddingBlock: '6px',
  /** Gap between icon and label — gap/atomic/small (4px) */
  gap: '4px',
  /** Border radius — atomic/medium (12px) */
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
  /** Rest: fully transparent */
  backgroundRest: 'rgba(36, 36, 36, 0)',
  /** Hover: 4% black overlay */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Text color — foreground/neutral/primary */
  colorRest: '#242424',
  /** Hover text — slightly darker */
  colorHover: '#1d1d1d',
  /** Icon variant — Regular (outline) */
  iconVariant: 'Regular',
} as const;

// ─── Style Tokens — Selected ────────────────────────────────

export const tabStyleSelected = {
  /** Rest: neutral-heavy */
  backgroundRest: '#242424',
  /** Hover: slightly lighter */
  backgroundHover: '#2b2b2b',
  /** Text color — foreground/neutral/onLoud (white) */
  colorRest: '#ffffff',
  /** Hover text — stays white */
  colorHover: '#ffffff',
  /** Icon variant — Filled */
  iconVariant: 'Filled',
} as const;

// ─── State Tokens ───────────────────────────────────────────

export const tabStateDisabled = {
  /** Unselected disabled background — transparent */
  backgroundUnselected: 'rgba(36, 36, 36, 0)',
  /** Selected disabled background — muted */
  backgroundSelected: '#ebebeb',
  /** Foreground/neutral/disabled */
  color: '#929292',
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
  fontFamily: 'var(--f-typography-fontFamily-body)',
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
