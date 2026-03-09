/**
 * Component: Button
 *
 * Bebop Design System — Multi-variant button component.
 *
 * Properties:
 *   Layout: Icon and text | Text only | Icon only
 *   Style:  Subtle | Outline | Secondary | Primary
 *   Size:   Small | Medium | Large
 *   State:  Rest | Hover | Disabled
 *   Selected: true | false
 *
 * Focus ring: 2px black outer border + 1px white inner border
 *
 * Prefix: --c-button-{property}
 */

// ─── Size Tokens ────────────────────────────────────────────

export const buttonSizeSmall = {
  height: '25px',
  iconSize: '16px',
  fontSize: '12px',
  fontWeight: '400',
  fontWeightStrong: '600',
  lineHeight: '1.4',
  paddingInline: '8px',
  paddingBlock: '4px',
  gap: '2px',
  borderRadius: '8px',
} as const;

export const buttonSizeMedium = {
  height: '32px',
  iconSize: '20px',
  fontSize: '14px',
  fontWeight: '400',
  fontWeightStrong: '600',
  lineHeight: '1.4',
  paddingInline: '10px',
  paddingBlock: '6px',
  gap: '4px',
  borderRadius: '12px',
} as const;

export const buttonSizeLarge = {
  height: '38px',
  iconSize: '20px',
  fontSize: '16px',
  fontWeight: '400',
  fontWeightStrong: '600',
  lineHeight: '1.4',
  paddingInline: '12px',
  paddingBlock: '8px',
  gap: '6px',
  borderRadius: '16px',
} as const;

// ─── Icon-Only Size Tokens ──────────────────────────────────

export const buttonIconOnlySmall = {
  size: '24px',
  iconSize: '16px',
  padding: '4px',
  borderRadius: '8px',
} as const;

export const buttonIconOnlyMedium = {
  size: '32px',
  iconSize: '20px',
  padding: '6px',
  borderRadius: '12px',
} as const;

export const buttonIconOnlyLarge = {
  size: '40px',
  iconSize: '20px',
  padding: '10px',
  borderRadius: '16px',
} as const;

// ─── Style Tokens ───────────────────────────────────────────

export const buttonStyleSubtle = {
  /** Rest: transparent */
  backgroundRest: 'transparent',
  /** Hover: 4% black overlay */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Text and icon color */
  color: '#242424',
  /** No border */
  border: 'none',
} as const;

export const buttonStyleOutline = {
  /** Rest: transparent */
  backgroundRest: 'transparent',
  /** Hover: 4% black overlay */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Text and icon color */
  color: '#242424',
  /** Subtle border */
  border: '1px solid #dedede',
} as const;

export const buttonStyleSecondary = {
  /** Rest: neutral subtle */
  backgroundRest: '#f5f5f5',
  /** Hover: 4% black overlay on top */
  backgroundHover: '#ebebeb',
  /** Text and icon color */
  color: '#242424',
  /** No border */
  border: 'none',
} as const;

export const buttonStylePrimary = {
  /** Rest: brand-heavy */
  backgroundRest: '#242424',
  /** Hover: slightly lighter */
  backgroundHover: '#3b3b3b',
  /** Text and icon color — white on dark */
  color: '#ffffff',
  /** No border */
  border: 'none',
} as const;

// ─── Selected Style Tokens ──────────────────────────────────

export const buttonSelectedSubtle = {
  /** Selected rest: neutral-soft */
  backgroundRest: '#ebebeb',
  /** Selected hover */
  backgroundHover: '#e0e0e0',
  /** Text color */
  color: '#242424',
  /** Icon variant: Filled (not Regular) */
  iconVariant: 'Filled',
  /** Text weight: Semibold */
  fontWeight: '600',
  border: 'none',
} as const;

export const buttonSelectedOutline = {
  /** Selected rest: neutral-soft */
  backgroundRest: '#ebebeb',
  /** Selected hover */
  backgroundHover: '#e0e0e0',
  /** Text color */
  color: '#242424',
  /** Icon variant: Filled */
  iconVariant: 'Filled',
  /** Text weight: Semibold */
  fontWeight: '600',
  border: '1px solid #dedede',
} as const;

export const buttonSelectedSecondary = {
  /** Selected rest: neutral-heavy (inverted) */
  backgroundRest: '#242424',
  /** Selected hover */
  backgroundHover: '#3b3b3b',
  /** Text color — white on dark */
  color: '#ffffff',
  /** Icon variant: Filled */
  iconVariant: 'Filled',
  /** Text weight: Semibold */
  fontWeight: '600',
  border: 'none',
} as const;

export const buttonSelectedPrimary = {
  /** Selected rest: brand-heavy (same as unselected) */
  backgroundRest: '#242424',
  /** Selected hover */
  backgroundHover: '#3b3b3b',
  /** Text color — white */
  color: '#ffffff',
  /** Icon variant: Filled */
  iconVariant: 'Filled',
  /** Text weight: Semibold */
  fontWeight: '600',
  border: 'none',
} as const;

// ─── State Tokens ───────────────────────────────────────────

export const buttonStateDisabled = {
  /** Background stays same as rest */
  background: 'transparent',
  /** Foreground/neutral/disabled */
  color: '#929292',
  /** Cursor */
  cursor: 'not-allowed',
} as const;

// ─── Focus Ring ─────────────────────────────────────────────

export const buttonFocusRing = {
  /** Outer border — black, 2px */
  outerWidth: '2px',
  outerColor: '#000000',
  /** Inner border — white, 1px */
  innerWidth: '1px',
  innerColor: '#ffffff',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const buttonTypography = {
  fontFamily: 'var(--f-typography-fontFamily-body)',
  letterSpacing: '0px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const button = {
  size: {
    small: buttonSizeSmall,
    medium: buttonSizeMedium,
    large: buttonSizeLarge,
  },
  iconOnly: {
    small: buttonIconOnlySmall,
    medium: buttonIconOnlyMedium,
    large: buttonIconOnlyLarge,
  },
  style: {
    subtle: buttonStyleSubtle,
    outline: buttonStyleOutline,
    secondary: buttonStyleSecondary,
    primary: buttonStylePrimary,
  },
  selected: {
    subtle: buttonSelectedSubtle,
    outline: buttonSelectedOutline,
    secondary: buttonSelectedSecondary,
    primary: buttonSelectedPrimary,
  },
  disabled: buttonStateDisabled,
  focusRing: buttonFocusRing,
  typography: buttonTypography,
} as const;
