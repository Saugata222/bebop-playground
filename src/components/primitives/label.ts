/**
 * Component: Label
 *
 * One Copilot / Bebop Design System — Form/field text label primitive.
 *
 * A single line of functional text that names a control, optionally marked
 * required with a trailing danger asterisk. New in One Copilot; styling maps
 * 1:1 onto Bebop foundations (functional body type, foreground neutral).
 *
 * Anatomy:
 *   Text            — the label string (Functional / Body {size} {weight})
 *   Required mark   — optional trailing "*" in danger foreground, 2px gap
 *
 * Properties:
 *   Size:     Small (12/16) | Medium (14/20) | Large (16/22)
 *   Weight:   Strong (Semibold 625) | Regular (420)
 *   State:    Rest | Disabled
 *   Required: true | false
 *
 * Font (get this right): --gnrc-font-family-functional = Segoe Sans, with the
 * optical-size axis stepping by size — Small & Medium use the "Small" optical
 * (opsz 8), Large uses the "Text" optical (opsz 12); weights 420 / 625.
 *
 * Prefix: --c-label-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Label (node 2119:4448)
 */

// ─── Size Tokens ────────────────────────────────────────────

export const labelSizeSmall = {
  /** --gnrc-font-size-functional-body-small */
  fontSize: '12px',
  /** --gnrc-line-height-functional-body-small */
  lineHeight: '16px',
  /** --gnrc-letter-spacing-functional-body-small */
  letterSpacing: '0px',
  /** Optical size — "Small" named instance */
  opticalSize: '8',
} as const;

export const labelSizeMedium = {
  /** --gnrc-font-size-functional-body-medium */
  fontSize: '14px',
  /** --gnrc-line-height-functional-body-medium */
  lineHeight: '20px',
  /** --gnrc-letter-spacing-functional-body-medium */
  letterSpacing: '0px',
  /** Optical size — "Small" named instance */
  opticalSize: '8',
} as const;

export const labelSizeLarge = {
  /** --gnrc-font-size-functional-body-large */
  fontSize: '16px',
  /** --gnrc-line-height-functional-body-large */
  lineHeight: '22px',
  /** --gnrc-letter-spacing-functional-body-large */
  letterSpacing: '0px',
  /** Optical size — "Text" named instance */
  opticalSize: '12',
} as const;

// ─── Weight Tokens ──────────────────────────────────────────

export const labelWeightRegular = {
  /** --gnrc-font-weight-functional-regular */
  fontWeight: '420',
} as const;

export const labelWeightStrong = {
  /** --gnrc-font-weight-functional-bold (Semibold) */
  fontWeight: '625',
} as const;

// ─── State Tokens ───────────────────────────────────────────

export const labelStateRest = {
  /** --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

export const labelStateDisabled = {
  /** --gnrc-color-foreground-neutral-disabled */
  color: 'rgba(0, 0, 0, 0.43)',
} as const;

// ─── Required Mark ──────────────────────────────────────────

export const labelRequired = {
  /** Trailing asterisk glyph */
  glyph: '*',
  /** Gap between label and asterisk — --gnrc-spacing-component-base-50 */
  gap: '2px',
  /** --gnrc-color-foreground-danger-primary */
  color: '#a62147',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const labelTypography = {
  /** --gnrc-font-family-functional — Segoe Sans */
  fontFamily: 'var(--f-typography-fontFamily-display)',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const label = {
  size: {
    small: labelSizeSmall,
    medium: labelSizeMedium,
    large: labelSizeLarge,
  },
  weight: {
    regular: labelWeightRegular,
    strong: labelWeightStrong,
  },
  state: {
    rest: labelStateRest,
    disabled: labelStateDisabled,
  },
  required: labelRequired,
  typography: labelTypography,
} as const;
