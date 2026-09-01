/**
 * Component: Store Card
 *
 * Bebop Design System — Multi-variant card for the Copilot Store.
 *
 * Four variants across two axes:
 *   Type:     Acquired (compact, icon + name) | Discover (large, icon + name + description)
 *   Context:  Agent (tinted icon bg, backdrop blur) | Source (plain logo, no bg)
 *
 * Variants:
 *   Agent Acquired    — compact card with tinted icon background (My agents & skills)
 *   Source Acquired   — compact card with plain logo (Connected sources)
 *   Agent Discover    — large card with tinted icon and description (Built by Microsoft)
 *   Source Discover   — large card with plain logo and description (Connect more)
 *
 * Additional icon sub-variant for agents:
 *   Avatar — solid gradient background (e.g. Brainstormer, Deck Creator)
 *
 * Prefix: --c-storeCard-{property}
 */

// ─── Acquired Container Tokens ──────────────────────────────

export const storeCardAcquiredContainer = {
  /** Card height */
  height: '62px',
  /** Minimum width */
  minWidth: '242px',
  /** Maximum width */
  maxWidth: '320px',
  /** Padding */
  padding: '9px 18px',
  /** Gap between icon and name */
  gap: '14px',
  /** Border radius */
  borderRadius: '14px',
  /** Background — rest */
  background: '#f5f5f5',
  /** Background — hover */
  backgroundHover: '#ebebeb',
} as const;

// ─── Discover Container Tokens ──────────────────────────────

export const storeCardDiscoverContainer = {
  /** Padding */
  padding: '17px 24px 17px 26px',
  /** Maximum width */
  maxWidth: '442px',
  /** Border radius — 18px */
  borderRadius: '18px',
  /** Background */
  background: '#ffffff',
  /** Border — rest */
  border: '1px solid #dedede',
  /** Border — hover */
  borderHover: '1px solid #c4c4c4',
  /** Box shadow — hover */
  boxShadowHover: '0 2px 8px rgba(0,0,0,0.06)',
  /** Inner row gap */
  innerGap: '9px',
} as const;

// ─── Agent Icon Tokens ──────────────────────────────────────

export const storeCardAgentIconAcquired = {
  /** Container size */
  size: '38px',
  /** Border radius */
  borderRadius: '12px',
  /** Backdrop filter */
  backdropFilter: 'blur(6px)',
  /** Border */
  border: '0.6px solid rgba(0,0,0,0.08)',
  /** Box shadow */
  boxShadow: '0px 1.2px 4.7px rgba(0,0,0,0.05)',
  /** Inner image size */
  imgSize: '24px',
} as const;

export const storeCardAgentIconDiscover = {
  /** Container size */
  size: '54px',
  /** Border radius */
  borderRadius: '12px',
  /** Backdrop filter */
  backdropFilter: 'blur(8.4px)',
  /** Border */
  border: '0.844px solid rgba(0,0,0,0.08)',
  /** Box shadow */
  boxShadow: '0px 1.7px 6.75px rgba(0,0,0,0.05)',
  /** Inner image size */
  imgSize: '34px',
} as const;

// ─── Agent Avatar Icon Tokens ───────────────────────────────

export const storeCardAvatarIconAcquired = {
  /** Container size */
  size: '38px',
  /** Border radius — rounded square */
  borderRadius: '8px',
  /** Border */
  border: '0.6px solid rgba(0,0,0,0.05)',
  /** Inner image size */
  imgSize: '19px',
} as const;

// ─── Source Icon Tokens ─────────────────────────────────────

export const storeCardSourceIconAcquired = {
  /** Container size */
  size: '38px',
  /** Border radius */
  borderRadius: '12px',
  /** Inner image size — fills container */
  imgSize: '38px',
} as const;

export const storeCardSourceIconDiscover = {
  /** Container size */
  size: '54px',
  /** Border radius */
  borderRadius: '12px',
  /** Inner image size — fills container */
  imgSize: '54px',
} as const;

// ─── Name Tokens ────────────────────────────────────────────

export const storeCardNameAcquired = {
  /** Font size */
  fontSize: 'var(--f-typography-fontSize-16)',
  /** Font weight — regular */
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  /** Line height */
  lineHeight: '23px',
  /** Color */
  color: '#242424',
} as const;

export const storeCardNameDiscover = {
  /** Font size */
  fontSize: 'var(--f-typography-fontSize-14)',
  /** Font weight — semibold */
  fontWeight: 'var(--f-typography-fontWeight-semibold)',
  /** Line height */
  lineHeight: '20px',
  /** Color */
  color: '#242424',
} as const;

// ─── Description Tokens ─────────────────────────────────────

export const storeCardDescription = {
  /** Font size */
  fontSize: 'var(--f-typography-fontSize-14)',
  /** Font weight — regular */
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  /** Line height */
  lineHeight: '20px',
  /** Color */
  color: '#616161',
  /** Max visible lines */
  maxLines: 2,
  /** Max height (2 lines) */
  maxHeight: '40px',
} as const;

// ─── Overflow Menu Tokens ───────────────────────────────────

export const storeCardOverflowMenu = {
  /** Button size */
  buttonSize: '24px',
  /** Icon size */
  iconSize: '16px',
  /** Border radius */
  borderRadius: '8px',
  /** Background — hover */
  backgroundHover: 'rgba(36,36,36,0.04)',
  /** Menu background */
  menuBackground: '#ffffff',
  /** Menu border radius */
  menuBorderRadius: '16px',
  /** Menu padding */
  menuPadding: '8px',
  /** Menu box shadow */
  menuShadow: '0px 3px 12px 0px rgba(0,0,0,0.18)',
  /** Menu minimum width */
  menuMinWidth: '186px',
  /** Menu item padding */
  itemPadding: '10px 12px',
  /** Menu item border radius */
  itemBorderRadius: '12px',
  /** Menu item font size */
  itemFontSize: '14px',
  /** Menu item color */
  itemColor: '#242424',
} as const;

// ─── Grid Tokens ────────────────────────────────────────────

export const storeCardGridAcquired = {
  /** Column template */
  columns: 'repeat(auto-fill, minmax(242px, 1fr))',
  /** Gap */
  gap: '8px',
  /** Margin top */
  marginTop: '16px',
} as const;

export const storeCardGridDiscover = {
  /** Column template */
  columns: 'repeat(auto-fill, minmax(333px, 1fr))',
  /** Gap */
  gap: '8px',
  /** Margin top */
  marginTop: '16px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const storeCard = {
  acquired: {
    container: storeCardAcquiredContainer,
    agentIcon: storeCardAgentIconAcquired,
    avatarIcon: storeCardAvatarIconAcquired,
    sourceIcon: storeCardSourceIconAcquired,
    name: storeCardNameAcquired,
    grid: storeCardGridAcquired,
  },
  discover: {
    container: storeCardDiscoverContainer,
    agentIcon: storeCardAgentIconDiscover,
    sourceIcon: storeCardSourceIconDiscover,
    name: storeCardNameDiscover,
    description: storeCardDescription,
    grid: storeCardGridDiscover,
  },
  overflowMenu: storeCardOverflowMenu,
} as const;
