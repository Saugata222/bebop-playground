/**
 * Component: Card - Cowork
 *
 * One Copilot / Connector Skills (Cowork) — a plugin discovery card used in the
 * Customize page "Discover" grid. A bordered white tile with a leading brand
 * logo and a two-line summary. Selecting the card opens the plugin's L2 detail.
 *
 * Anatomy (horizontal):
 *   Logo      — 28px brand mark (rounded square), flex-none
 *   Text      — Name (Functional Body Medium Strong 14/600) over a 2-line
 *               description (Functional Body Small 12/16, secondary, clamped)
 *
 * Laid out in a two-column responsive grid (12px gap).
 *
 * Prefix: --c-card-cowork-{property}
 *
 * Figma: Connector-Skills — Customize (node 45:172081), Discover card.
 */

// ─── Card Container ─────────────────────────────────────────

export const cardCoworkContainer = {
  /** Horizontal tile */
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
  /** Surface — white, subtle 1px stroke */
  background: '#ffffff',
  border: '1px solid #dedede',
  /** Corner radius — base-300 (12px) */
  borderRadius: '12px',
  /** Padding — base-350 (16px) */
  padding: '16px',
  /** Rest → hover affordance */
  hoverBackground: '#fcfcfc',
  hoverBorder: '1px solid #c7c7c7',
  cursor: 'pointer',
} as const;

// ─── Grid ───────────────────────────────────────────────────

export const cardCoworkGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px',
} as const;

// ─── Logo ───────────────────────────────────────────────────

export const cardCoworkLogo = {
  width: '28px',
  height: '28px',
  flexShrink: '0',
  borderRadius: '6px',
  objectFit: 'contain',
} as const;

// ─── Text ───────────────────────────────────────────────────

export const cardCoworkText = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: '0',
} as const;

/** Plugin name — Functional Body Medium Strong (14 / 20, semibold). */
export const cardCoworkName = {
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '600',
  color: '#242424',
} as const;

/** Description — Functional Body Small (12 / 16, secondary), clamped to 2 lines. */
export const cardCoworkDesc = {
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: '400',
  color: '#5d5d5d',
  lineClamp: '2',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const cardCowork = {
  container: cardCoworkContainer,
  grid: cardCoworkGrid,
  logo: cardCoworkLogo,
  text: cardCoworkText,
  name: cardCoworkName,
  desc: cardCoworkDesc,
} as const;
