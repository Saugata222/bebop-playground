/**
 * Component: Button
 *
 * One Copilot / Bebop Design System — Multi-variant button component.
 *
 * Already present in Bebop; the One Copilot spec maps 1:1 onto Bebop
 * foundations. Two functional TYPES: Standard (fires and returns to rest)
 * and Toggle (holds a selected / unselected state). Selecting a toggle
 * shifts the label from regular to semibold — reserve the layout space at
 * the semibold width up front (ghost-element pattern) so the container does
 * not resize on selection. Icon toggles swap Regular → Filled glyphs.
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
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Button (node 1413:21099),
 *        usage guidance (node 1480:6946)
 */

// ─── Size Tokens ────────────────────────────────────────────

export const buttonSizeSmall = {
  /** --gnrc-size-* Small container height */
  height: '24px',
  /** Small icon slot — 16px */
  iconSize: '16px',
  /** --gnrc-font-size-functional-body-small */
  fontSize: '12px',
  /** --gnrc-font-weight-functional-regular */
  fontWeight: '420',
  /** --gnrc-font-weight-functional-bold — selected/toggle */
  fontWeightStrong: '625',
  /** --gnrc-line-height-functional-body-small (16px) */
  lineHeight: '16px',
  /** --gnrc-spacing-component-base-200 / atomic 8px */
  paddingInline: '8px',
  /** --gnrc-spacing-component-base-100 / atomic 4px */
  paddingBlock: '4px',
  /** --gnrc-spacing-component-base-50 / atomic 2px */
  gap: '2px',
  /** --gnrc-border-radius-base-200 / atomic-small 8px */
  borderRadius: '8px',
} as const;

export const buttonSizeMedium = {
  height: '32px',
  iconSize: '20px',
  fontSize: '14px',
  fontWeight: '420',
  fontWeightStrong: '625',
  lineHeight: '20px',
  paddingInline: '10px',
  paddingBlock: '6px',
  gap: '4px',
  borderRadius: '12px',
} as const;

export const buttonSizeLarge = {
  height: '38px',
  iconSize: '20px',
  fontSize: '16px',
  fontWeight: '420',
  fontWeightStrong: '625',
  lineHeight: '22px',
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
  /** Border — --gnrc-color-stroke-neutral-subtle */
  border: '1px solid rgba(189,189,189,0.5)',
} as const;

export const buttonStyleSecondary = {
  /** Rest: --gnrc-color-background-neutral-subtle (translucent) */
  backgroundRest: 'rgba(229, 229, 229, 0.5)',
  /** Hover: --gnrc-color-background-neutral-subtle +lightness-hover */
  backgroundHover: 'rgba(212,212,212,0.54)',
  /** Text and icon color — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
  /** No border */
  border: 'none',
} as const;

export const buttonStylePrimary = {
  /** Rest: brand-heavy */
  backgroundRest: '#242424',
  /** Hover: --gnrc-color-background-brand-heavy -lightness-hover */
  backgroundHover: '#313131',
  /** Text and icon color — white on dark */
  color: '#ffffff',
  /** No border */
  border: 'none',
} as const;

// ─── Selected Style Tokens ──────────────────────────────────

export const buttonSelectedSubtle = {
  /** Selected rest: --gnrc-color-background-neutral-soft */
  backgroundRest: 'rgba(215,215,215,0.5)',
  /** Selected hover */
  backgroundHover: 'rgba(200,200,200,0.54)',
  /** Text color */
  color: '#242424',
  /** Icon variant: Filled (not Regular) */
  iconVariant: 'Filled',
  /** Text weight: Semibold */
  fontWeight: '600',
  border: 'none',
} as const;

export const buttonSelectedOutline = {
  /** Selected rest: --gnrc-color-background-neutral-soft */
  backgroundRest: 'rgba(215,215,215,0.5)',
  /** Selected hover */
  backgroundHover: 'rgba(200,200,200,0.54)',
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
  backgroundHover: '#313131',
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
  /** --gnrc-font-family-functional — Segoe Sans */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  /** --gnrc-letter-spacing-functional-body-* (0) */
  letterSpacing: '0px',
} as const;

// ─── Toggle Width Reservation ───────────────────────────────

/**
 * Toggle buttons must hold their width across selection: the label weight
 * shifts regular → semibold when selected, which would otherwise resize the
 * container. Reserve the space up front with a hidden semibold ghost.
 */
export const buttonToggleGhost = {
  /** Ghost renders at the strong weight the selected label will use */
  fontWeight: '600',
  /** Ghost is invisible but occupies width */
  visibility: 'hidden',
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
  toggleGhost: buttonToggleGhost,
} as const;
