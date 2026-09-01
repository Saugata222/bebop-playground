/**
 * Component: CIQ Menu (Connector IQ / Skills palette)
 *
 * One Copilot / Bebop Design System — the content + skills palette that opens
 * below the composer. Invoked from "Add content" in the Add menu, or by typing
 * "/" in the chat input (which focuses the Skills tab as a slash-command
 * palette). Selecting a row attaches it to the composer as an attachment pill.
 *
 * Anatomy (top → bottom, rendered inline below the composer — no card):
 *   Tab bar (Tablist)   — pill tabs: All · Skills · Files · People · Meetings ·
 *                         Emails · Chats · Others. Selected = neutral-heavy
 *                         (#242424) filled pill with white label; unselected =
 *                         transparent with primary label + subtle hover.
 *   List (Suggestions)  — a scrolling stack of CIQ menu items, each a
 *                         MenuListItem (reuses --c-menu-list-item):
 *     • Content/file item — icon + label + trailing timestamp (Secondary=Right)
 *     • Skill item        — icon + "/name" title over description (Secondary=Under)
 *
 * Composes (reuse-first): tabList + tab (pill), menuListItem (Right / Under),
 * attachmentPill (on select). Figma: Connector Skills — CiQ + Sources list
 * (file HrcwzQ59vChIgZU5PvPVQM, node 32:66172).
 *
 * Prefix: --c-ciq-menu-{property}
 */

// ─── Menu Container ─────────────────────────────────────────

export const ciqMenuContainer = {
  /** Vertical stack, rendered inline under the composer (no surface/shadow) */
  display: 'flex',
  flexDirection: 'column',
  /** Gap between the tab bar and the list — gap/atomic/large (8px) */
  gap: '8px',
  /** Content width — matches the composer inner width */
  width: '584px',
  /** Left-aligned under the composer */
  alignItems: 'flex-start',
  /** Background — transparent (no card) */
  background: 'transparent',
} as const;

// ─── Tab Bar (pill Tablist) ─────────────────────────────────

export const ciqMenuTabBar = {
  /** Horizontal pill row */
  display: 'flex',
  alignItems: 'center',
  /** Gap between tabs — base-100 (4px) */
  gap: '4px',
  /** Wraps on narrow widths */
  flexWrap: 'wrap',
} as const;

/** A single pill tab (shared geometry across selected + rest). */
export const ciqMenuTab = {
  /** Inline padding — base-300 (12px) */
  paddingInline: '12px',
  /** Block padding — base-150 (6px) */
  paddingBlock: '6px',
  /** Corner radius — base-300 (12px) */
  borderRadius: '12px',
  /** Label — Functional Body Medium Strong (Segoe Sans 14 / 20, semibold) */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '625',
  /** opsz axis for the functional face */
  fontVariationSettings: "'opsz' 8, 'wght' 625",
} as const;

/** Selected tab — neutral-heavy filled pill, white label. */
export const ciqMenuTabSelected = {
  /** Background — --gnrc-color-background-neutral-heavy */
  background: '#242424',
  /** Label — foreground-neutral-onloud */
  color: '#ffffff',
} as const;

/** Rest / unselected tab — transparent, primary label, subtle hover. */
export const ciqMenuTabRest = {
  /** Background — transparent */
  background: 'rgba(36, 36, 36, 0)',
  /** Label — foreground-neutral-primary */
  color: '#242424',
  /** Hover — transparent neutral hover */
  hoverBackground: 'rgba(36, 36, 36, 0.04)',
} as const;

// ─── List (Suggestions) ─────────────────────────────────────

export const ciqMenuList = {
  /** Vertical stack of rows */
  display: 'flex',
  flexDirection: 'column',
  /** No gap between rows — each row carries its own padding */
  gap: '0px',
  /** Full palette width */
  width: '100%',
  /** Scrolls when overflowing the palette height */
  maxHeight: '208px',
  overflowY: 'auto',
} as const;

// ─── Menu Item (reuses --c-menu-list-item) ──────────────────

/** Shared row geometry — matches menuListItem. */
export const ciqMenuItem = {
  /** Gap between icon, content, trailing — base-150 (6px) */
  gap: '6px',
  /** Inline padding — base-300 (12px) */
  paddingInline: '12px',
  /** Block padding — base-250 (10px) */
  paddingBlock: '10px',
  /** Corner radius — base-300 (12px) */
  borderRadius: '12px',
  /** Leading icon size */
  iconSize: '20px',
  /** Surface — transparent, subtle hover */
  background: 'rgba(36, 36, 36, 0)',
  hoverBackground: 'rgba(36, 36, 36, 0.04)',
} as const;

/** Content / file item (Secondary=Right): label + trailing timestamp. */
export const ciqMenuItemContent = {
  /** Label — Functional Body Medium (14 / 20, regular) */
  labelFontSize: '14px',
  labelLineHeight: '20px',
  labelFontWeight: '420',
  labelColor: '#242424',
  /** Trailing timestamp — Functional Body Small (12 / 16, secondary) */
  trailingFontSize: '12px',
  trailingLineHeight: '16px',
  trailingColor: '#5d5d5d',
} as const;

/** Skill item (Secondary=Under): "/name" title over description. */
export const ciqMenuItemSkill = {
  /** Vertical gap between title and description — base-100 (4px) */
  stackGap: '4px',
  /** Title "/name" — Functional Body Medium Strong, softened (14 / 20, ~550) */
  titleFontSize: '14px',
  titleLineHeight: '20px',
  titleFontWeight: '550',
  titleColor: '#242424',
  /** Description — Functional Body Small (12 / 16, secondary), truncated */
  descFontSize: '12px',
  descLineHeight: '16px',
  descColor: '#5d5d5d',
} as const;

// ─── Modal variant ("Add content" dialog, node 48:181228) ───

/**
 * Renders the SAME palette (tabBar + list) inside a centered dialog, invoked
 * from the Add menu's "Add content". A title ("Add content") + dismiss header
 * sits above a full-width Search field, then the pill Tablist (adds a "Sites"
 * tab), then the list.
 */
export const ciqMenuModal = {
  /** Dialog width */
  width: '720px',
  /** Surface — white, radius 24, Shadow/Highest (elevated) */
  background: '#ffffff',
  borderRadius: '24px',
  boxShadow: '0 0 2px 0 rgba(0,0,0,0.15), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08)',
  /** Padding — 24 top / 28 sides / 20 bottom */
  padding: '24px 28px 20px',
  /** Vertical gap between header, search, tabs, list — base-400 (16px) */
  gap: '16px',
  /** Scrim — translucent + blur */
  scrim: 'rgba(0,0,0,0.15)',
  /** Title — Functional Subtitle (20 / 28, semibold) */
  titleFontSize: '20px',
  titleLineHeight: '28px',
  titleFontWeight: '600',
} as const;

/** Search field at the top of the modal (rounded pill input). */
export const ciqMenuModalSearch = {
  /** Height */
  height: '44px',
  /** Inline padding */
  paddingInline: '16px',
  /** Gap between magnifier and input — base-200 (8px) */
  gap: '8px',
  /** Border — thin subtle stroke */
  border: '1px solid #dedede',
  /** Corner radius — circular */
  borderRadius: '9999px',
  /** Icon size */
  iconSize: '20px',
  /** Placeholder / input — Functional Body Medium (14 / 20) */
  fontSize: '14px',
  lineHeight: '20px',
  placeholderColor: '#6f6f6f',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const ciqMenu = {
  container: ciqMenuContainer,
  tabBar: ciqMenuTabBar,
  tab: ciqMenuTab,
  tabSelected: ciqMenuTabSelected,
  tabRest: ciqMenuTabRest,
  list: ciqMenuList,
  item: ciqMenuItem,
  itemContent: ciqMenuItemContent,
  itemSkill: ciqMenuItemSkill,
  modal: ciqMenuModal,
  modalSearch: ciqMenuModalSearch,
} as const;
