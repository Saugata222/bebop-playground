/**
 * Foundation: Typography
 *
 * Bebop Design System — Type primitives and type sets.
 *
 * Typefaces:
 *   Display: Segoe Sans
 *   Body:    Aptos
 *
 * Type sets:
 *   Functional — UI labels, buttons, form controls
 *   Content    — articles, headings, paragraphs
 *
 * Prefix: --prmt-font-{property}  |  --gnrc-type-{set}-{name}
 */

// ─── Primitive: Font Families ───────────────────────────────

export const fontFamily = {
  display: "'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif",
  body:    "'Aptos', 'Segoe UI', system-ui, -apple-system, sans-serif",
  mono:    "'Cascadia Code', 'Fira Code', monospace",
} as const;

// ─── Primitive: Font Sizes ──────────────────────────────────

export const fontSize = {
  10: '10px',
  12: '12px',
  14: '14px',
  16: '16px',
  18: '18px',
  20: '20px',
  24: '24px',
  28: '28px',
  32: '32px',
  40: '40px',
  48: '48px',
  56: '56px',
  68: '68px',
} as const;

// ─── Primitive: Font Weights ────────────────────────────────

export const fontWeight = {
  regular:  '400',
  semibold: '600',
  bold:     '700',
} as const;

// ─── Primitive: Line Heights ────────────────────────────────

export const lineHeight = {
  1.0: '1.0',
  1.14: '1.14',
  1.2: '1.2',
  1.29: '1.29',
  1.33: '1.33',
  1.4: '1.4',
  1.43: '1.43',
  1.5: '1.5',
  1.71: '1.71',
} as const;

// ─── Primitive: Letter Spacing ──────────────────────────────

export const letterSpacing = {
  0: '0px',
} as const;

// ─── Generic: Functional Type Set ───────────────────────────
// Used for UI controls, labels, navigation

export const typeFunctional = {
  display:        { family: 'display', size: '68px', weight: '700', lineHeight: '1.0' },
  pageTitle:      { family: 'display', size: '40px', weight: '700', lineHeight: '1.2' },
  titleLarge:     { family: 'display', size: '28px', weight: '700', lineHeight: '1.29' },
  titleMedium:    { family: 'display', size: '24px', weight: '700', lineHeight: '1.33' },
  titleSmall:     { family: 'display', size: '20px', weight: '600', lineHeight: '1.4' },
  subtitle:       { family: 'body',    size: '18px', weight: '600', lineHeight: '1.4' },
  bodyLargeStrong:  { family: 'body', size: '16px', weight: '600', lineHeight: '1.5' },
  bodyLarge:        { family: 'body', size: '16px', weight: '400', lineHeight: '1.5' },
  bodyMediumStrong: { family: 'body', size: '14px', weight: '600', lineHeight: '1.43' },
  bodyMedium:       { family: 'body', size: '14px', weight: '400', lineHeight: '1.43' },
  bodySmallStrong:  { family: 'body', size: '12px', weight: '600', lineHeight: '1.33' },
  bodySmall:        { family: 'body', size: '12px', weight: '400', lineHeight: '1.33' },
  captionStrong:    { family: 'body', size: '10px', weight: '600', lineHeight: '1.4' },
  caption:          { family: 'body', size: '10px', weight: '400', lineHeight: '1.4' },
} as const;

// ─── Generic: Content Type Set ──────────────────────────────
// Used for articles, documentation, reading content

export const typeContent = {
  expressiveLarge:       { family: 'display', size: '56px', weight: '700', lineHeight: '1.14' },
  expressiveMedium:      { family: 'display', size: '48px', weight: '700', lineHeight: '1.17' },
  expressiveSmall:       { family: 'display', size: '40px', weight: '700', lineHeight: '1.2' },
  pageHeader:            { family: 'display', size: '32px', weight: '700', lineHeight: '1.25' },
  h1:                    { family: 'display', size: '28px', weight: '700', lineHeight: '1.29' },
  h2:                    { family: 'display', size: '24px', weight: '700', lineHeight: '1.33' },
  h3:                    { family: 'display', size: '20px', weight: '600', lineHeight: '1.4' },
  h4:                    { family: 'body',    size: '18px', weight: '600', lineHeight: '1.4' },
  subheadline:           { family: 'body',    size: '16px', weight: '600', lineHeight: '1.5' },
  paragraphLargeStrong:  { family: 'body', size: '18px', weight: '600', lineHeight: '1.71' },
  paragraphLarge:        { family: 'body', size: '18px', weight: '400', lineHeight: '1.71' },
  paragraphMediumStrong: { family: 'body', size: '16px', weight: '600', lineHeight: '1.5' },
  paragraphMedium:       { family: 'body', size: '16px', weight: '400', lineHeight: '1.5' },
  paragraphSmallStrong:  { family: 'body', size: '14px', weight: '600', lineHeight: '1.43' },
  paragraphSmall:        { family: 'body', size: '14px', weight: '400', lineHeight: '1.43' },
  tableStrong:           { family: 'body', size: '14px', weight: '600', lineHeight: '1.43' },
  table:                 { family: 'body', size: '14px', weight: '400', lineHeight: '1.43' },
  code:                  { family: 'mono', size: '14px', weight: '400', lineHeight: '1.43' },
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  typeFunctional,
  typeContent,
} as const;
