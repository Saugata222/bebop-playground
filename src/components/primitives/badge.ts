/**
 * badge.ts — Badge primitive
 *
 * One Copilot / Bebop Design System. A small circular pill label used to tag an
 * item inline with a short status word (e.g. "Recommended" beside a source name).
 *
 * Anatomy: pill container (soft neutral fill, circular radius) → caption label.
 * Prefix: --c-badge-{property}
 *
 * Figma: Source Discovery — Badge component (node 1838:40290).
 * Sizing/typography map to foundation atomic radius + functional caption type.
 */

// ─── Size Tokens ────────────────────────────────────────────
export const badgeSize = {
  height: '16px',
  minHeight: '16px',
  maxHeight: '16px',
  paddingInline: '4px', // --gnrc-spacing-component-base-100
  gap: '2px', // --gnrc-spacing-component-base-50
  radius: '9999px', // radiusAtomic.circular
} as const;

// ─── Style Tokens ───────────────────────────────────────────
// Neutral — soft neutral fill (default, e.g. "Recommended").
export const badgeStyleNeutral = {
  background: 'rgba(0, 0, 0, 0.08)', // color.background.brand.soft
  color: '#242424', // color.foreground.brand.primary
} as const;

// Brand — soft brand-blue fill (e.g. "New").
export const badgeStyleBrand = {
  background: 'rgba(25, 103, 210, 0.2)', // brand blue #1967d2 @ 20%
  color: '#1967d2', // color.foreground.brand.accent
} as const;

// ─── Typography Tokens ──────────────────────────────────────
// Functional / Caption — Segoe Sans, Small Regular.
export const badgeTypography = {
  fontFamily: "'Segoe Sans', 'Segoe UI', sans-serif",
  fontSize: '10px',
  lineHeight: '14px',
  fontWeight: '400',
  fontVariationSettings: "'opsz' 8, 'wght' 400",
  letterSpacing: '0px',
  whiteSpace: 'nowrap',
} as const;

// ─── Aggregate Export ───────────────────────────────────────
export const badge = {
  size: badgeSize,
  style: {
    neutral: badgeStyleNeutral,
    brand: badgeStyleBrand,
  },
  typography: badgeTypography,
} as const;
