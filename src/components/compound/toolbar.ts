/**
 * Component: Toolbar
 *
 * Bebop Design System — Formatting toolbar with icon-only buttons and divider.
 *
 * A horizontal row of icon-only buttons (Bold, Italic | Bullet List, Number List)
 * separated by a vertical divider. Uses the shared Button component's icon-only
 * Subtle variant at two sizes.
 *
 * Properties:
 *   Size: Large | Small
 *
 * Large uses Button Icon-only Large (40×40, p:10) with gap 6px
 * Small uses Button Icon-only Small (24×24, p:4) with gap 2px
 *
 * Divider: 1px wide, stroke/neutral/subtle (#dedede), stretches to button height.
 *
 * Prefix: --c-toolbar-{property}
 */

// ─── Size Tokens ────────────────────────────────────────────

export const toolbarSizeLarge = {
  /** Gap between buttons */
  gap: '6px',
  /** Button size — reuses buttonIconOnlyLarge (40×40) */
  buttonSize: '40px',
  /** Button padding — reuses buttonIconOnlyLarge */
  buttonPadding: '10px',
  /** Icon size */
  iconSize: '16px',
  /** Button border radius */
  buttonBorderRadius: '9999px',
} as const;

export const toolbarSizeSmall = {
  /** Gap between buttons */
  gap: '2px',
  /** Button size — reuses buttonIconOnlySmall (24×24) */
  buttonSize: '24px',
  /** Button padding — reuses buttonIconOnlySmall */
  buttonPadding: '4px',
  /** Icon size */
  iconSize: '16px',
  /** Button border radius */
  buttonBorderRadius: '9999px',
} as const;

// ─── Divider ────────────────────────────────────────────────

export const toolbarDivider = {
  /** Divider width */
  width: '1px',
  /** Divider color — stroke/neutral/subtle */
  color: '#dedede',
} as const;

// ─── Button Style ───────────────────────────────────────────

export const toolbarButtonStyle = {
  /** Reuses buttonStyleSubtle */
  background: 'transparent',
  /** Hover */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Icon color */
  color: '#242424',
} as const;

// \u2500\u2500\u2500 Selected State (per affordance principles) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export const toolbarButtonSelected = {
  /** Backplate introduced for transparent variant (principle 2) */
  background: '#ebebeb',
  /** Hover on selected */
  backgroundHover: '#e0e0e0',
  /** Icon variant: Filled (principle 1 \u2014 icon-only affordance) */
  iconVariant: 'Filled',
  /** Color stays same */
  color: '#242424',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const toolbar = {
  size: {
    large: toolbarSizeLarge,
    small: toolbarSizeSmall,
  },
  divider: toolbarDivider,
  buttonStyle: toolbarButtonStyle,
  buttonSelected: toolbarButtonSelected,
} as const;
