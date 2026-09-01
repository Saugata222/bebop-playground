/**
 * Component: Chat Settings
 *
 * Bebop Design System — Full-screen settings modal.
 * Triggered from "Chat settings" in the header overflow (⋯) menu.
 *
 * Anatomy (left → right, top → bottom):
 *   Overlay          — semi-transparent backdrop
 *   Modal (824×709)  — white card, Elevation 3 shadow, 24px radius
 *     Header (58px)  — M365 Copilot icon + title · vertical divider · X dismiss
 *     Body
 *       Nav (260px)  — section headers + icon nav items; selected item has 3px left accent
 *       Content      — Browse Sources page (breadcrumb · title · subtitle · 3-col connector grid)
 *
 * Nav sections:
 *   [standalone]  Notifications
 *   Chat          General · Data controls · Personalization · Voice · Agents · Sources ←selected
 *   Feature tools Flags
 *   Internal use  Build Info · Overrides
 *
 * Connector grid: 3 columns, 162px × 76px cards with icon + bold label
 *
 * Prefix: --c-chat-settings-{property}
 */

// ─── Overlay ──────────────────────────────────────────────────────────

export const chatSettingsOverlay = {
  /** Semi-transparent backdrop */
  background: 'rgba(0, 0, 0, 0.40)',
} as const;

// ─── Modal ────────────────────────────────────────────────────────────

export const chatSettingsModal = {
  /** Width — from Figma frame */
  width: '824px',
  /** Height — from Figma frame */
  height: '709px',
  /** Border radius — composite/large (24px) */
  borderRadius: '24px',
  /** Background — surface/neutral/default */
  background: '#ffffff',
  /** Elevation 3 ambient shadow */
  boxShadow: '0px 8px 32px 0px rgba(0, 0, 0, 0.20)',
} as const;

// ─── Header ───────────────────────────────────────────────────────────

export const chatSettingsHeader = {
  /** Height — from Figma Header 4 frame */
  height: '58px',
  /** Horizontal padding */
  paddingInline: '20px',
  /** Bottom separator */
  borderBottom: '1px solid #e8e8e8',
  /** X of vertical divider between nav and content */
  dividerX: '260px',
  /** App name font size */
  titleFontSize: '14px',
  /** App name font weight — semibold */
  titleFontWeight: '600',
  /** App name color */
  titleColor: '#242424',
  /** App icon size */
  iconSize: '20px',
  /** Dismiss button tap target */
  dismissSize: '32px',
  /** Dismiss button radius */
  dismissBorderRadius: '8px',
  /** Dismiss hover fill */
  dismissHoverBackground: 'rgba(36, 36, 36, 0.04)',
} as const;

// ─── Nav Sidebar ──────────────────────────────────────────────────────

export const chatSettingsNav = {
  /** Width — divider at x=260 in Figma */
  width: '260px',
  /** Vertical padding */
  padding: '8px 0',
  /** Right border */
  borderRight: '1px solid #e8e8e8',
} as const;

export const chatSettingsNavItem = {
  /** Minimum row height */
  minHeight: '36px',
  /** Horizontal padding */
  paddingInline: '20px',
  /** Vertical padding */
  paddingBlock: '8px',
  /** Gap between icon and label */
  gap: '8px',
  /** Font size */
  fontSize: 'var(--f-typography-fontSize-14)',
  /** Rest font weight */
  fontWeightRest: '400',
  /** Selected font weight — semibold */
  fontWeightSelected: '600',
  /** Label color */
  color: '#242424',
  /** Hover fill */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Left accent bar width */
  selectedIndicatorWidth: '3px',
  /** Left accent bar color */
  selectedIndicatorColor: '#242424',
  /** Icon size */
  iconSize: '20px',
} as const;

export const chatSettingsNavSection = {
  /** Section label font size */
  fontSize: 'var(--f-typography-fontSize-12)',
  /** Section label font weight */
  fontWeight: 'var(--f-typography-fontWeight-semibold)',
  /** Section label color — secondary */
  color: '#5d5d5d',
  /** Horizontal padding */
  paddingInline: '20px',
  /** Vertical padding */
  paddingBlock: '12px 4px',
} as const;

// ─── Main Content ─────────────────────────────────────────────────────

export const chatSettingsContent = {
  /** Inner padding */
  padding: '30px 40px',
} as const;

export const chatSettingsBreadcrumb = {
  /** Font size */
  fontSize: 'var(--f-typography-fontSize-14)',
  /** Text color — secondary */
  color: '#5d5d5d',
  /** Gap between chevron and label */
  gap: '4px',
  /** Chevron icon size */
  chevronSize: '16px',
  /** Bottom margin before heading */
  marginBottom: '16px',
} as const;

export const chatSettingsPageTitle = {
  /** Heading font size */
  fontSize: 'var(--f-typography-fontSize-20)',
  /** Heading font weight — bold */
  fontWeight: 'var(--f-typography-fontWeight-bold)',
  /** Heading color */
  color: '#242424',
  /** Gap below heading */
  marginBottom: '6px',
} as const;

export const chatSettingsPageSubtitle = {
  /** Subtitle font size */
  fontSize: 'var(--f-typography-fontSize-14)',
  /** Subtitle color — secondary */
  color: '#5d5d5d',
  /** Gap below subtitle before grid */
  marginBottom: '24px',
} as const;

// ─── Connector Card Grid ──────────────────────────────────────────────

export const chatSettingsConnectorCard = {
  /** 3-column layout */
  columns: '3',
  /** Column gap — composite/medium (16px) */
  columnGap: '16px',
  /** Row gap — composite/medium (16px) */
  rowGap: '16px',
  /** Card height — from Figma Settings List item */
  height: '76px',
  /** Card inner padding */
  padding: '16px',
  /** Card border radius — atomic/medium (12px) */
  borderRadius: '12px',
  /** Card border */
  border: '1px solid #e0e0e0',
  /** Card background */
  background: '#ffffff',
  /** Card hover fill */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Card hover border */
  borderColorHover: '#c4c4c4',
  /** Connector icon size */
  iconSize: '20px',
  /** Label font size */
  labelFontSize: '12px',
  /** Label font weight — semibold */
  labelFontWeight: '600',
  /** Label color */
  labelColor: '#242424',
  /** Gap between icon and label */
  gap: '8px',
} as const;

// ─── Aggregate Export ─────────────────────────────────────────────────

export const chatSettings = {
  overlay: chatSettingsOverlay,
  modal: chatSettingsModal,
  header: chatSettingsHeader,
  nav: chatSettingsNav,
  navItem: chatSettingsNavItem,
  navSection: chatSettingsNavSection,
  content: chatSettingsContent,
  breadcrumb: chatSettingsBreadcrumb,
  pageTitle: chatSettingsPageTitle,
  pageSubtitle: chatSettingsPageSubtitle,
  connectorCard: chatSettingsConnectorCard,
} as const;
