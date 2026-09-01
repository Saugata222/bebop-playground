/**
 * Component: Link
 *
 * One Copilot / Bebop Design System — Inline text hyperlink.
 *
 * Two type variants (Functional and Content), each with Rest, Hover, Pressed,
 * and Disabled states. New in One Copilot.
 *
 * Font — EXACT to Figma: both variants render in Segoe Sans.
 *   Functional : --gnrc-font-family-functional = Segoe Sans "Small Regular"
 *   Content    : --gnrc-font-family-content    = Segoe Sans "Text Regular"
 * (Bebop's body family is Aptos, but One Copilot's content family resolves to
 *  Segoe Sans here — so we use the Segoe Sans / display stack for both to stay exact.)
 *
 * Underline affordance:
 *   Functional — 1px solid underline on hover / press
 *   Content    — 2px dotted underline on hover / press
 *   Rest & Disabled — no underline
 *   text-decoration-skip-ink: none
 *
 * Anatomy:
 *   Link — inline-flex, 2px gap (base-50) for an optional leading/trailing icon
 *
 * Prefix: --c-link-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Link (node 2149:3308)
 */

// ─── Layout ─────────────────────────────────────────────────

export const linkLayout = {
  /** Gap for optional icon — --gnrc-spacing-component-base-50 (2px) */
  gap: '2px',
  /** Never skip the ink under descenders */
  textDecorationSkipInk: 'none',
} as const;

// ─── State Colors (shared) ──────────────────────────────────

export const linkState = {
  /** Rest — --gnrc-color-foreground-neutral-primary */
  colorRest: '#242424',
  /** Hover — primary + lightness-hover (oklch) */
  colorHover: '#181818',
  /** Pressed — primary + lightness-press (oklch) */
  colorPressed: '#0d0d0d',
  /** Disabled — --gnrc-color-foreground-neutral-disabled */
  colorDisabled: 'rgba(0,0,0,0.43)',
} as const;

// ─── Functional Variant ─────────────────────────────────────

export const linkFunctional = {
  /** Segoe Sans (Small Regular) — --gnrc-font-family-functional */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  /** --gnrc-font-size-functional-body-medium */
  fontSize: '14px',
  /** --gnrc-font-weight-functional-regular */
  fontWeight: '420',
  /** --gnrc-line-height-functional-body-medium */
  lineHeight: '20px',
  /** --gnrc-letter-spacing-functional-body-medium */
  letterSpacing: '0px',
  /** Underline on hover / press */
  underlineWidth: '1px',
  underlineStyle: 'solid',
} as const;

// ─── Content Variant ────────────────────────────────────────

export const linkContent = {
  /** Segoe Sans (Text Regular) — --gnrc-font-family-content (resolves to Segoe Sans) */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  /** --gnrc-font-size-content-paragraph-medium */
  fontSize: '16px',
  /** FontWeight/Content/Regular */
  fontWeight: '420',
  /** --gnrc-line-height-content-paragraph-medium */
  lineHeight: '28px',
  /** --gnrc-letter-spacing-content-paragraph-medium */
  letterSpacing: '0px',
  /** Underline on hover / press */
  underlineWidth: '2px',
  underlineStyle: 'dotted',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const link = {
  layout: linkLayout,
  state: linkState,
  functional: linkFunctional,
  content: linkContent,
} as const;
