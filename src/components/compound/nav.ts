/**
 * Component: Nav (Side Nav)
 *
 * One Copilot / Bebop Design System — the single shared navigation shell.
 *
 * One Copilot navigation organizes the product around a small set of top-level
 * modes rather than a long list of features. Users switch between four primary
 * pivots — Chat is the default entry and session history. It supports two modes:
 *   Expanded  — full-width items with labels, sections, and me control
 *   Collapsed — icon-only vertical rail; hovering an item opens a flyout
 *
 * Sub-components:
 *   Nav (container)     — header + tab pivot + scrollable body + me control
 *   Header              — Copilot wordmark + open / apps (grid-dots) / collapse
 *   Tab pivot           — Chat | Tasks (reuses Segmented Switch) + right tool icons
 *   Nav Item            — primary row (icon + label + right slots)
 *   Section (Pinned/Chats) — caption header + rows
 *   Flyout              — popover menu opened from an item (reuses Menu/Popover)
 *   Me Control          — avatar footer + profile menu (Settings, Recent pages,
 *                          Scheduled prompts, Give feedback, Download apps)
 *
 * Reused primitives: Segmented Switch, Button, Avatar, Menu/menuListItem,
 * Divider, Popover.
 *
 * Prefix: --c-nav-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Side Nav (page 318:24131; expanded
 *        4227:63888, collapsed 4227:105674, flyouts 4227:96245, me control
 *        4227:100223). Work variant.
 */

// ─── Container Tokens ───────────────────────────────────────

export const navContainer = {
  /** Surface background */
  background: 'var(--f-color-white)',
  /** Width — expanded */
  widthExpanded: '256px',
  /** Width — collapsed (icon rail) */
  widthCollapsed: '56px',
  /** Padding — regular/medium */
  padding: '8px',
  /** Gap between items */
  gap: '0px',
} as const;

// ─── Nav Item Tokens ────────────────────────────────────────

export const navItemSize = {
  /** Full width (expanded) */
  width: '278px',
  /** Collapsed width (icon-only) */
  widthCollapsed: '44px',
  /** Minimum height */
  minHeight: '36px',
  /** Padding left — regular/large (12px) */
  paddingLeft: '12px',
  /** Padding right — tight/large (10px) */
  paddingRight: '10px',
  /** Padding block — tight/medium (6px) */
  paddingBlock: '6px',
  /** Gap between icon/title/right — atomic/large (8px) */
  gap: '8px',
  /** Border radius — atomic/medium (12px) */
  borderRadius: '12px',
  /** Primary icon size */
  iconSize: '20px',
  /** Primary icon container radius — atomic/small (8px) */
  iconRadius: '8px',
  /** Title min height */
  titleMinHeight: '24px',
} as const;

export const navItemTypography = {
  /** Font family */
  fontFamily: 'var(--f-typography-fontFamily-body)',
  /** Title font size — body-medium (14px) */
  fontSize: '14px',
  /** Title font weight — regular (rest) */
  fontWeight: '400',
  /** Title font weight — selected (semibold) */
  fontWeightSelected: '600',
  /** Title line height */
  lineHeight: '1.4',
  /** Secondary text font size — caption (10px) */
  secondaryFontSize: '10px',
  /** Letter spacing */
  letterSpacing: '0px',
} as const;

export const navItemStyleRest = {
  /** Background — transparent */
  background: 'rgba(36, 36, 36, 0)',
  /** Title color — foreground/neutral/primary */
  color: '#242424',
  /** Secondary text color — foreground/neutral/tertiary */
  secondaryColor: '#6f6f6f',
} as const;

export const navItemStyleHover = {
  /** Background — 4% black overlay */
  background: 'rgba(36, 36, 36, 0.04)',
  /** Title color — slightly darker */
  color: '#1d1d1d',
  /** Secondary text color — tertiary hover */
  secondaryColor: '#666666',
} as const;

export const navItemStyleSelected = {
  /** Background — neutral-soft */
  background: '#ebebeb',
  /** Title color */
  color: '#242424',
  /** Secondary text color — foreground/neutral/secondary */
  secondaryColor: '#5d5d5d',
} as const;

export const navItemStyleSelectedHover = {
  /** Background — neutral-soft-hover */
  background: '#e1e1e1',
  /** Title color */
  color: '#1d1d1d',
  /** Secondary text color */
  secondaryColor: '#5d5d5d',
} as const;

// ─── Right Icon Container ───────────────────────────────────

export const navItemRightIcons = {
  /** Secondary icon size */
  iconSize: '16px',
  /** Padding around each icon — regular/small (4px) */
  iconPadding: '4px',
} as const;

// ─── Unread Badge ───────────────────────────────────────────

export const navItemUnreadBadge = {
  /** Dot size */
  size: '8px',
  /** Badge color */
  background: '#242424',
  /** Border radius */
  borderRadius: '9999px',
} as const;

// ─── Nav Item Split ─────────────────────────────────────────

export const navItemSplit = {
  /** Primary area: flex 1, same padding as navItem */
  primaryPaddingInline: '12px',
  primaryPaddingBlock: '6px',
  primaryGap: '8px',
  primaryBorderRadius: '12px',
  /** Secondary (chevron) area */
  secondaryPaddingInline: '12px',
  secondaryPaddingBlock: '6px',
  secondaryGap: '8px',
  secondaryHeight: '36px',
  secondaryBorderRadius: '12px',
  /** Background rest */
  backgroundRest: 'rgba(36, 36, 36, 0)',
  /** Background hover */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
} as const;

// ─── Section Header ─────────────────────────────────────────

export const navSectionHeader = {
  /** Width — full */
  width: '278px',
  /** Padding — tight/medium (6px) */
  padding: '6px',
  /** Background — surface/neutral/default */
  background: 'var(--f-color-white)',
  /** Input text size — caption (12px) / body-small  */
  fontSize: '12px',
  /** Input text color — placeholder */
  colorPlaceholder: '#6f6f6f',
  /** Input padding — 6px inline */
  inputPadding: '6px',
  /** Input corner radius — 4px */
  inputRadius: '4px',
  /** Active filter tag radius — circular */
  filterBorderRadius: '9999px',
} as const;

// ─── Header Button ──────────────────────────────────────────

export const navHeaderButton = {
  /** Padding inline — regular/large (12px) */
  paddingInline: '12px',
  /** Padding block — regular/medium (8px) */
  paddingBlock: '8px',
  /** Border radius — atomic/medium (12px) */
  borderRadius: '12px',
  /** Background rest — transparent */
  backgroundRest: 'rgba(36, 36, 36, 0)',
  /** Background hover — 4% overlay */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Icon size */
  iconSize: '20px',
  /** Icon color */
  color: '#242424',
} as const;

// ─── Notification Badge ─────────────────────────────────────

export const navNotificationBadge = {
  /** Min width (circular container) */
  minWidth: '16px',
  /** Height */
  height: '16px',
  /** Background — neutral-heavy */
  background: '#242424',
  /** Border — matches bg */
  border: '1px solid #242424',
  /** Border radius — circular */
  borderRadius: '9999px',
  /** Text color — white */
  color: '#ffffff',
  /** Font size — caption (10px) */
  fontSize: '10px',
  /** Font weight — semibold */
  fontWeight: '600',
  /** Inline padding */
  paddingInline: '2px',
} as const;

// ─── Me Control ─────────────────────────────────────────────

export const navMeControl = {
  /** Width — expanded */
  width: '282px',
  /** Width — collapsed */
  widthCollapsed: '44px',
  /** Min height */
  minHeight: '36px',
  /** Padding inline — tight/large (10px) */
  paddingInline: '10px',
  /** Padding block (3px) */
  paddingBlock: '3px',
  /** Gap — atomic/large (8px) */
  gap: '8px',
  /** Border radius — atomic/medium (12px) */
  borderRadius: '12px',
  /** Background rest — transparent */
  backgroundRest: 'rgba(36, 36, 36, 0)',
  /** Background hover */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Avatar size */
  avatarSize: '28px',
  /** Name font size — body-small (12px) */
  nameFontSize: '12px',
  /** Name color */
  nameColor: '#242424',
  /** License font size — caption (10px) */
  licenseFontSize: '10px',
  /** License color — tertiary */
  licenseColor: '#6f6f6f',
  /** License gap — atomic/small (4px) */
  licenseGap: '4px',
} as const;

// ─── Collapsed Behaviour ────────────────────────────────────

export const navCollapsed = {
  /** Width — icon rail */
  width: '56px',
  /** Nav item width — icon only */
  itemWidth: '44px',
  /** Nav item padding — center icon */
  itemPadding: '8px 12px',
  /** Nav item justify — center icon */
  itemJustify: 'center',
  /** Hidden elements: titles, right icons, section headers, split chevrons, me-info */
  hiddenSelectors: '.ni__title, .ni__right, .nsh, .ni-split__sec, .me__info',
  /** Pinned section collapses to single Pin icon */
  pinnedIcon: 'pin-20-regular',
  /** Chat items hidden entirely */
  chatsVisible: false,
  /** Waffle/grid-dots button hidden */
  waffleVisible: false,
  /** Me control avatar only (info hidden) */
  meWidth: '44px',
  /** Me control padding */
  mePadding: '8px',
} as const;

// ─── Tab Pivot (Chat | Tasks) ───────────────────────────────

/** Primary pivot at the top of the nav body. Reuses the Segmented Switch primitive. */
export const navTabs = {
  tabs: ['Chat', 'Tasks'],
  selected: 'Chat',
  /** Trailing tool icons (settings, refiner, copilot, code) */
  toolIcons: ['settings-20-regular', 'panel-left-20-regular', 'bot-20-regular', 'code-20-regular'],
  primitive: 'segmentedSwitch',
} as const;

// ─── Flyout (popover from a nav item) ───────────────────────

/**
 * Hovering or clicking certain nav items (Notebooks, Tasks, Agents, More)
 * opens a flyout popover beside the rail. Reuses the Popover surface + Menu
 * / menuListItem rows.
 */
export const navFlyout = {
  /** --gnrc-color-surface-neutral-nearer */
  background: '#ffffff',
  /** --gnrc-border-radius-base-300 (12px) */
  borderRadius: '12px',
  border: '1px solid #dedede',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12), 0 0 2px rgba(0,0,0,0.06)',
  padding: '4px',
  itemPrimitive: 'menuListItem',
} as const;

// ─── Me Control Menu (profile flyout) ───────────────────────

export const navMeControlMenu = {
  items: ['Settings', 'Recent pages', 'Scheduled prompts', 'Give feedback'],
  submenu: 'Download apps',
  footerLinks: ['Privacy', 'Terms', 'FAQ'],
  primitive: 'menu',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const nav = {
  container: navContainer,
  tabs: navTabs,
  item: {
    size: navItemSize,
    typography: navItemTypography,
    rest: navItemStyleRest,
    hover: navItemStyleHover,
    selected: navItemStyleSelected,
    selectedHover: navItemStyleSelectedHover,
    rightIcons: navItemRightIcons,
    unreadBadge: navItemUnreadBadge,
  },
  split: navItemSplit,
  sectionHeader: navSectionHeader,
  headerButton: navHeaderButton,
  notificationBadge: navNotificationBadge,
  flyout: navFlyout,
  meControl: navMeControl,
  meControlMenu: navMeControlMenu,
  collapsed: navCollapsed,
} as const;
