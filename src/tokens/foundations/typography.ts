/**
 * Foundation: Typography
 *
 * Bebop Design System — Type primitives, generics, and type sets.
 * Values match the authoritative Figma spec
 * (Bebop-web-components → Typography primitives / generics / Functional & Content type sets).
 *
 * Typefaces (primitives):
 *   Segoe Sans   — variable (wght 100–900, opsz 5–36). Functional UI + body content.
 *   Segoe Serif  — editorial, expressive titles only.
 *   Consolas     — code.
 *
 * Generic families:
 *   functional       → Segoe Sans (UI chrome)
 *   content          → Segoe Sans (long-form body)
 *   contentEditorial → Segoe Serif (expressive titles)
 *   contentCode      → Consolas (code)
 *
 * Optical-size rule (by font-size, not weight):
 *   < 14px  → Small   (opsz 5)
 *   15–23px → Text    (opsz 10.5)
 *   ≥ 24px  → Display (opsz 36)
 *
 * Prefix: --prmt-font-{property}  |  --gnrc-font-{property}
 */

// ─── Primitive: Font Families ───────────────────────────────

/**
 * `display` and `body` historically existed as separate aliases.
 * Both now resolve to Segoe Sans per the Figma spec (Aptos is not
 * part of the Bebop type system — it was stale documentation).
 * Prefer the new semantic aliases below when authoring new code.
 */
export const fontFamily = {
  display: "'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif",
  body:    "'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif",
  mono:    "'Consolas', 'Cascadia Code', 'Fira Code', monospace",
  segoeSans:  "'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif",
  segoeSerif: "'Segoe Serif', 'Segoe UI', Georgia, serif",
  consolas:   "'Consolas', 'Cascadia Code', 'Fira Code', monospace",
  functional:       "'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif",
  content:          "'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif",
  contentEditorial: "'Segoe Serif', 'Segoe UI', Georgia, serif",
  contentCode:      "'Consolas', 'Cascadia Code', 'Fira Code', monospace",
} as const;

// ─── Primitive: Font Sizes ──────────────────────────────────
// 19-stop ramp from the Figma spec. 4px modular scale with base 16px.

export const fontSize = {
  10: '10px', 12: '12px', 14: '14px', 16: '16px',
  20: '20px', 24: '24px', 28: '28px', 32: '32px',
  36: '36px', 40: '40px', 44: '44px', 48: '48px',
  52: '52px', 56: '56px', 60: '60px', 64: '64px',
  68: '68px', 72: '72px', 76: '76px',
} as const;

// ─── Primitive: Font Weights ────────────────────────────────
// 11-stop ramp. 350 (Semilight) and 590 (Demibold) are variable-font anchors.

export const fontWeight = {
  hairline:  '100',
  thin:      '200',
  light:     '300',
  semilight: '350',
  regular:   '400',
  medium:    '500',
  demibold:  '590',
  semibold:  '600',
  bold:      '700',
  extrabold: '800',
  black:     '900',
} as const;

// ─── Primitive: Line Heights ────────────────────────────────
// Three canonical multipliers. Figma stores percentages in text styles.

export const lineHeight = {
  tight:   '1.2',  // 120% — Functional display/title stack, expressive moments
  regular: '1.4',  // 140% — short-form UI, subtitles, body, tables
  relaxed: '1.7',  // 170% — long-form paragraphs
} as const;

// ─── Primitive: Letter Spacing ──────────────────────────────

export const letterSpacing = {
  0: '0px',
} as const;

// ─── Optical Size ───────────────────────────────────────────
// Named instances of the Segoe Sans variable font.

export const opticalSize = {
  small:   '5',     // font-size < 14px
  text:    '10.5',  // 15–23px
  display: '36',    // ≥ 24px
} as const;

// ─── Generic: Functional Type Set ───────────────────────────
// UI chrome — controls, navigation, menus, form fields.

export const typeFunctional = {
  display:          { family: 'functional', size: '68px', weight: '600', lineHeight: '1.2', opsz: '36' },
  pageTitle:        { family: 'functional', size: '40px', weight: '600', lineHeight: '1.2', opsz: '36' },
  titleLarge:       { family: 'functional', size: '32px', weight: '600', lineHeight: '1.2', opsz: '36' },
  titleMedium:      { family: 'functional', size: '28px', weight: '600', lineHeight: '1.2', opsz: '36' },
  titleSmall:       { family: 'functional', size: '24px', weight: '600', lineHeight: '1.2', opsz: '10.5' },
  subtitle:         { family: 'functional', size: '20px', weight: '600', lineHeight: '1.4', opsz: '10.5' },
  bodyLargeStrong:  { family: 'functional', size: '16px', weight: '600', lineHeight: '1.4', opsz: '10.5' },
  bodyLarge:        { family: 'functional', size: '16px', weight: '400', lineHeight: '1.4', opsz: '10.5' },
  bodyMediumStrong: { family: 'functional', size: '14px', weight: '600', lineHeight: '1.4', opsz: '5' },
  bodyMedium:       { family: 'functional', size: '14px', weight: '400', lineHeight: '1.4', opsz: '5' },
  bodySmallStrong:  { family: 'functional', size: '12px', weight: '600', lineHeight: '1.4', opsz: '5' },
  bodySmall:        { family: 'functional', size: '12px', weight: '400', lineHeight: '1.4', opsz: '5' },
  captionStrong:    { family: 'functional', size: '10px', weight: '600', lineHeight: '1.4', opsz: '5' },
  caption:          { family: 'functional', size: '10px', weight: '400', lineHeight: '1.4', opsz: '5' },
} as const;

// ─── Generic: Content Type Set ──────────────────────────────
// Long-form reading — articles, documentation, assistant responses.

export const typeContent = {
  expressiveLarge:       { family: 'content',     size: '56px', weight: '600', lineHeight: '1.4', opsz: '36' },
  expressiveMedium:      { family: 'content',     size: '36px', weight: '600', lineHeight: '1.4', opsz: '36' },
  expressiveSmall:       { family: 'content',     size: '28px', weight: '600', lineHeight: '1.4', opsz: '36' },
  pageHeader:            { family: 'content',     size: '36px', weight: '600', lineHeight: '1.2', opsz: '36' },
  h1:                    { family: 'content',     size: '32px', weight: '600', lineHeight: '1.2', opsz: '36' },
  h2:                    { family: 'content',     size: '28px', weight: '600', lineHeight: '1.2', opsz: '36' },
  h3:                    { family: 'content',     size: '24px', weight: '600', lineHeight: '1.2', opsz: '10.5' },
  h4:                    { family: 'content',     size: '20px', weight: '600', lineHeight: '1.2', opsz: '10.5' },
  subheadline:           { family: 'content',     size: '14px', weight: '400', lineHeight: '1.4', opsz: '5' },
  paragraphLargeStrong:  { family: 'content',     size: '20px', weight: '600', lineHeight: '1.7', opsz: '10.5' },
  paragraphLarge:        { family: 'content',     size: '20px', weight: '400', lineHeight: '1.7', opsz: '10.5' },
  paragraphMediumStrong: { family: 'content',     size: '16px', weight: '600', lineHeight: '1.7', opsz: '10.5' },
  paragraphMedium:       { family: 'content',     size: '16px', weight: '400', lineHeight: '1.7', opsz: '10.5' },
  paragraphSmallStrong:  { family: 'content',     size: '12px', weight: '600', lineHeight: '1.7', opsz: '5' },
  paragraphSmall:        { family: 'content',     size: '12px', weight: '400', lineHeight: '1.7', opsz: '5' },
  tableStrong:           { family: 'content',     size: '16px', weight: '600', lineHeight: '1.4', opsz: '10.5' },
  table:                 { family: 'content',     size: '16px', weight: '400', lineHeight: '1.4', opsz: '10.5' },
  code:                  { family: 'contentCode', size: '16px', weight: '400', lineHeight: '1.4', opsz: '10.5' },
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  opticalSize,
  typeFunctional,
  typeContent,
} as const;
