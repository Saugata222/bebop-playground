/**
 * Component: List Item - Cowork
 *
 * One Copilot / Connector Skills (Cowork) — an installed-plugin row used in the
 * Customize page "Installed" list. A soft-filled row with a leading brand logo,
 * name + single-line description, and a trailing toggle (reference on/off) plus
 * a chevron that opens the plugin's L2 detail.
 *
 * Anatomy:
 *   Logo      — 24px brand mark (rounded square), flex-none
 *   Text      — Name (Functional Body Medium Strong 14/600) + single-line
 *               description (Functional Body Small 12/16, secondary, truncated)
 *   Toggle    — small switch (reference this plugin when doing a task)
 *   Chevron   — 20px chevron-right → opens L2
 *
 * Prefix: --c-list-item-cowork-{property}
 *
 * Figma: Connector-Skills — Customize (node 45:172081), Installed row.
 */

// ─── Row Container ──────────────────────────────────────────

export const listItemCoworkContainer = {
  /** Horizontal row */
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  /** Surface — subtle neutral fill */
  background: '#f5f5f5',
  border: 'none',
  /** Corner radius — base-300 (12px) */
  borderRadius: '12px',
  /** Padding — 12 block / 16 inline */
  padding: '12px 16px',
  /** Hover — soft */
  hoverBackground: '#efefef',
  cursor: 'pointer',
} as const;

// ─── List (stack) ───────────────────────────────────────────

export const listItemCoworkList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
} as const;

// ─── Logo ───────────────────────────────────────────────────

export const listItemCoworkLogo = {
  width: '24px',
  height: '24px',
  flexShrink: '0',
  borderRadius: '6px',
  objectFit: 'contain',
} as const;

// ─── Text ───────────────────────────────────────────────────

export const listItemCoworkText = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0px',
  minWidth: '0',
  flex: '1',
} as const;

/** Plugin name — Functional Body Medium Strong (14 / 20, semibold). */
export const listItemCoworkName = {
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '600',
  color: '#242424',
} as const;

/** Description — Functional Body Small (12 / 16, secondary), single line trunc. */
export const listItemCoworkDesc = {
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: '400',
  color: '#5d5d5d',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
} as const;

// ─── Trailing controls ──────────────────────────────────────

/** Small toggle switch (reference this plugin on/off). */
export const listItemCoworkToggle = {
  trackWidth: '40px',
  trackHeight: '20px',
  trackRadius: '9999px',
  thumbSize: '16px',
  onBackground: '#242424',
  offBackground: '#8a8a8a',
} as const;

/** Trailing chevron → opens the plugin L2 detail. */
export const listItemCoworkChevron = {
  size: '20px',
  color: '#6f6f6f',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const listItemCowork = {
  container: listItemCoworkContainer,
  list: listItemCoworkList,
  logo: listItemCoworkLogo,
  text: listItemCoworkText,
  name: listItemCoworkName,
  desc: listItemCoworkDesc,
  toggle: listItemCoworkToggle,
  chevron: listItemCoworkChevron,
} as const;
