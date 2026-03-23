/**
 * Component: Source Card
 *
 * Bebop Design System — Connector source card for the Apps and Sources page.
 *
 * A card that represents a third-party connector (e.g. ServiceNow, Jira,
 * Hubspot). Shows the connector icon and name, with an action area that
 * changes based on state.
 *
 * Anatomy:
 *   Container (180×84, rounded-20, 1px border)
 *     Inner row (justify-between)
 *       Left: icon (32×32) + name (14px)
 *       Right: action (varies by state)
 *
 * States:
 *   Add      — "+" button (32×32 circular, permanent subtle bg)
 *   Added    — green checkmark in circular bg (auto-transitions to Enabled)
 *   Enabled  — toggle switch ON (dark track, white thumb)
 *   Disabled — toggle switch OFF (light track), card at 0.4 opacity
 *
 * Prefix: --c-sourceCard-{property}
 */

// ─── Container Tokens ───────────────────────────────────────

export const sourceCardContainer = {
  /** Card width */
  width: '180px',
  /** Card height */
  height: '84px',
  /** Padding horizontal */
  paddingInline: '20px',
  /** Padding vertical */
  paddingBlock: '12px',
  /** Border */
  border: '1px solid #dedede',
  /** Border hover */
  borderHover: '1px solid #c4c4c4',
  /** Border radius */
  borderRadius: '20px',
  /** Background */
  background: '#ffffff',
} as const;

// ─── Icon Tokens ────────────────────────────────────────────

export const sourceCardIcon = {
  /** Icon container size */
  size: '32px',
  /** Gap between icon and name */
  gapToName: '8px',
} as const;

// ─── Name Tokens ────────────────────────────────────────────

export const sourceCardName = {
  /** Font size — body-medium */
  fontSize: '14px',
  /** Font weight */
  fontWeight: '400',
  /** Line height */
  lineHeight: '20px',
  /** Color — rest */
  color: '#242424',
  /** Color — disabled */
  colorDisabled: '#929292',
} as const;

// ─── Add Button Tokens ──────────────────────────────────────

export const sourceCardAddButton = {
  /** Size */
  size: '32px',
  /** Border radius — circular */
  borderRadius: '9999px',
  /** Background — always subtle (permanent hover) */
  background: 'rgba(36, 36, 36, 0.04)',
  /** Background — actual hover */
  backgroundHover: 'rgba(36, 36, 36, 0.08)',
  /** Icon size */
  iconSize: '20px',
  /** Icon color */
  color: '#242424',
} as const;

// ─── Added Check Tokens ─────────────────────────────────────

export const sourceCardCheck = {
  /** Container size — same as add button */
  size: '32px',
  /** Border radius — circular */
  borderRadius: '9999px',
  /** Background — subtle */
  background: 'rgba(36, 36, 36, 0.04)',
  /** Check icon color — green */
  color: '#107C10',
  /** Icon size */
  iconSize: '20px',
  /** Auto-transition delay to Enabled (ms) */
  transitionDelay: 1500,
} as const;

// ─── Toggle Tokens ──────────────────────────────────────────

export const sourceCardToggle = {
  /** Track width */
  trackWidth: '32px',
  /** Track height */
  trackHeight: '16px',
  /** Track radius */
  trackRadius: '9999px',
  /** Track ON background */
  trackOnBackground: '#242424',
  /** Track OFF background */
  trackOffBackground: '#ffffff',
  /** Track OFF border */
  trackOffBorder: '1px solid #dedede',
  /** Thumb size */
  thumbSize: '12px',
  /** Thumb ON color */
  thumbOnColor: '#ffffff',
  /** Thumb OFF color */
  thumbOffColor: '#6f6f6f',
  /** Thumb ON left */
  thumbOnLeft: '18px',
  /** Thumb OFF left */
  thumbOffLeft: '2px',
  /** Margin top (vertical centering offset) */
  marginTop: '8px',
} as const;

// ─── Disabled State ─────────────────────────────────────────

export const sourceCardDisabled = {
  /** Whole card opacity */
  opacity: '0.4',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const sourceCard = {
  container: sourceCardContainer,
  icon: sourceCardIcon,
  name: sourceCardName,
  addButton: sourceCardAddButton,
  check: sourceCardCheck,
  toggle: sourceCardToggle,
  disabled: sourceCardDisabled,
} as const;
