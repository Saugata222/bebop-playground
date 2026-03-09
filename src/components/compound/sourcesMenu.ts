/**
 * Component: Sources Menu
 *
 * Bebop Design System — Data-source picker shown below the chat input.
 *
 * A scrollable list of data-source rows, each with an icon, label,
 * and a right-side action: either a toggle switch (with optional
 * sub-label like "Chats, Emails, Meetings") or a "Connect" button.
 *
 * Anatomy:
 *   Sources Container — vertical list, horizontal padding, scrollable
 *   Source Item (Default) — 44px row: [icon 20px] [label 14px] [toggle/connect]
 *   Source Item (Small)   — compact row: [icon 16px] [label 12px] [toggle/connect]
 *
 * Properties — Source Item:
 *   Size:    Default | Small
 *   State:   Rest | Hover
 *   Action:  Toggle (on/off, optional sub-label) | Connect (button)
 *
 * Reuses:
 *   Toggle (from primitives/toggle.ts) — 32×16px switch
 *   Button (from primitives/button.ts) — subtle style for "Connect"
 *
 * Prefix: --c-sourcesMenu-{property}
 */

// ─── Container Tokens ───────────────────────────────────────

export const sourcesMenuContainer = {
  /** Width */
  width: '820px',
  /** Horizontal padding */
  paddingInline: '56px',
  /** Vertical gap between items */
  gap: '0px',
} as const;

// ─── Item Size — Default ────────────────────────────────────

export const sourcesMenuItemDefault = {
  /** Outer row height */
  height: '44px',
  /** Outer row vertical padding */
  paddingBlock: '4px',
  /** Container horizontal padding */
  containerPaddingInline: '12px',
  /** Container vertical padding */
  containerPaddingBlock: '8px',
  /** Container gap between icon/label/action */
  containerGap: '8px',
  /** Container border radius */
  containerRadius: '12px',
  /** Icon size */
  iconSize: '20px',
  /** Label font size — body-medium (14px) */
  fontSize: '14px',
  /** Label line height */
  lineHeight: '20px',
} as const;

// ─── Item Size — Small ──────────────────────────────────────

export const sourcesMenuItemSmall = {
  /** Outer row vertical padding */
  paddingBlock: '2px',
  /** Container horizontal padding */
  containerPaddingInline: '12px',
  /** Container vertical padding */
  containerPaddingBlock: '4px',
  /** Container gap */
  containerGap: '8px',
  /** Container border radius */
  containerRadius: '12px',
  /** Icon size */
  iconSize: '16px',
  /** Label font size — body-small (12px) */
  fontSize: '12px',
  /** Label line height */
  lineHeight: '16px',
  /** Sub-text font size — caption (10px) */
  subtextFontSize: '10px',
  /** Sub-text line height */
  subtextLineHeight: '14px',
} as const;

// ─── Item Style ─────────────────────────────────────────────

export const sourcesMenuItemStyle = {
  /** Rest background */
  backgroundRest: 'rgba(36, 36, 36, 0)',
  /** Hover background */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Label color */
  color: '#242424',
  /** Sub-text / toggle label color */
  secondaryColor: '#5d5d5d',
} as const;

// ─── Toggle Label ───────────────────────────────────────────

export const sourcesMenuToggleLabel = {
  /** Font size — caption / body-small (12px) */
  fontSize: '12px',
  /** Line height */
  lineHeight: '16px',
  /** Color */
  color: '#5d5d5d',
  /** Gap between label and toggle — atomic/medium (6px) */
  gap: '6px',
  /** Padding around the toggle+label group */
  padding: '2px',
} as const;

// ─── Connect Button ─────────────────────────────────────────

export const sourcesMenuConnectButton = {
  /** Style — subtle (transparent bg) */
  background: 'transparent',
  /** Hover */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Text color */
  color: '#242424',
  /** Font size — body-medium (14px) */
  fontSize: '14px',
  /** Font weight */
  fontWeight: '400',
  /** Height */
  height: '32px',
  /** Padding */
  paddingInline: '10px',
  paddingBlock: '6px',
  /** Border radius */
  borderRadius: '12px',
} as const;

// ─── Scrollbar ──────────────────────────────────────────────

export const sourcesMenuScrollbar = {
  /** Track width */
  width: '2px',
  /** Track color */
  thumbColor: '#929292',
  /** Track background */
  trackColor: '#d9d9d9',
  /** Border radius */
  borderRadius: '9999px',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const sourcesMenuTypography = {
  fontFamily: 'var(--f-typography-fontFamily-body)',
  letterSpacing: '0px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const sourcesMenu = {
  container: sourcesMenuContainer,
  item: {
    default: sourcesMenuItemDefault,
    small: sourcesMenuItemSmall,
    style: sourcesMenuItemStyle,
  },
  toggleLabel: sourcesMenuToggleLabel,
  connectButton: sourcesMenuConnectButton,
  scrollbar: sourcesMenuScrollbar,
  typography: sourcesMenuTypography,
} as const;
