/**
 * Component: Sources Menu  ("Change data sources")
 *
 * One Copilot / Bebop Design System — modal popover for toggling which data
 * sources Copilot may draw from. Aligned to the One Copilot Desktop UI Kit
 * (Figma node 4096:12750).
 *
 * Composition (reuses existing One Copilot primitives):
 *   Popover        — white card, 28px inset, radius 16, Shadow/Highest
 *   ├─ Header      — Subtitle title + subtle close Button (dismiss-20)
 *   ├─ Search      — Input (search-20 leading, "Search" placeholder), 40px
 *   ├─ List        — stack of Source Menu items + footer MenuListItem
 *   │   Source Menu item = MenuListItem row (icon 20 + Body Medium label)
 *   │     + optional Body Small metadata (#5d5d5d)
 *   │     + trailing control: Toggle (on/off) | "Connect" link
 *   │   Footer = MenuListItem ("Manage sources", more-horizontal-20)
 *   └─ Scrollbar   — overflow affordance
 *
 * The Source Menu item row geometry is identical to the MenuListItem primitive
 * (px 12 / py 10, gap 6, radius 12, Body Medium label). The trailing Toggle
 * reuses the Toggle primitive (32×16 track, 12 thumb).
 *
 * Prefix: --c-sources-menu-{property}
 */

// ─── Popover Surface ────────────────────────────────────────

export const sourcesMenuPopover = {
  /** Modal width */
  width: '664px',
  /** Modal min height */
  minHeight: '520px',
  /** Surface — --gnrc-color-surface-neutral-nearer */
  background: '#ffffff',
  /** Border — 1px --gnrc-color-stroke-neutral-transparent */
  border: '1px solid rgba(36,36,36,0)',
  /** Corner radius — --gnrc-border-radius-base-400 */
  borderRadius: '16px',
  /** Content inset — --gnrc-spacing-component-base-700 */
  padding: '28px',
  /** Vertical gap between header / search / list — base-400 */
  sectionGap: '16px',
  /** Shadow/Highest — contour + elevated ambient + elevated key */
  boxShadow:
    '0 0 1px 0 rgba(0,0,0,0.08), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08)',
} as const;

// ─── Header ─────────────────────────────────────────────────

export const sourcesMenuHeader = {
  /** Row height */
  height: '32px',
  /** Title — Functional Subtitle (Display Semibold) */
  titleFontSize: '20px',
  titleLineHeight: '28px',
  titleFontWeight: '600',
  titleLetterSpacing: '-0.15px',
  /** Title color — --gnrc-color-foreground-neutral-primary */
  titleColor: '#242424',
  /** Close button footprint (subtle icon Button) */
  closeButtonSize: '32px',
  /** Close glyph — dismiss-20 */
  closeIconSize: '20px',
} as const;

// ─── Search ─────────────────────────────────────────────────

export const sourcesMenuSearch = {
  /** Input height (medium) */
  height: '40px',
  /** Pill shape — --gnrc-border-radius-circular */
  borderRadius: '9999px',
  /** Border — --gnrc-color-stroke-neutral-subtle */
  borderColor: 'rgba(189,189,189,0.5)',
  /** Leading glyph — search-20 */
  iconSize: '20px',
  /** Placeholder — --gnrc-color-foreground-neutral-tertiary */
  placeholderColor: '#6f6f6f',
} as const;

// ─── Sources list (scroll viewport) ──────────────────────
// 6 connectors are visible in the viewport; the rest load on an infinite,
// lazy scroll as the list is scrolled toward the bottom.

export const sourcesMenuList = {
  /** Rows visible in the viewport before scrolling */
  visibleRows: 6,
  /** Viewport height (6 × 56px row pitch) */
  maxHeight: '360px',
  /** Row divider — --gnrc-color-stroke-neutral-subtle */
  rowDivider: '1px solid rgba(189,189,189,0.5)',
} as const;

// ─── Source Menu item (row) ─────────────────────────────────
// Row = MenuListItem geometry; trailing control varies by state.

export const sourcesMenuItem = {
  /** Row pitch (slot height) */
  height: '56px',
  /** Interactive backplate — surface --gnrc-color-background-neutral-transparent */
  background: 'rgba(36,36,36,0)',
  /** Hover backplate — transparent hover */
  backgroundHover: 'rgba(36,36,36,0.04)',
  /** Inline padding — base-300 */
  paddingInline: '12px',
  /** Block padding — base-250 */
  paddingBlock: '10px',
  /** Gap between icon / label / trailing — base-150 */
  gap: '6px',
  /** Backplate radius — base-300 */
  borderRadius: '12px',
  /** Leading connector logo size */
  iconSize: '20px',
  /** Label — Functional Body Medium */
  labelFontSize: '14px',
  labelLineHeight: '20px',
  labelFontWeight: '420',
  /** Label color — --gnrc-color-foreground-neutral-primary */
  labelColor: '#242424',
  /** Metadata — Functional Body Small, --gnrc-color-foreground-neutral-secondary */
  metadataFontSize: '12px',
  metadataLineHeight: '16px',
  metadataColor: '#5d5d5d',
  /** Hairline divider under each row — --gnrc-color-stroke-neutral-subtle */
  rowDivider: '1px solid rgba(189,189,189,0.5)',
} as const;

// ─── "Connect" trailing link ────────────────────────────────

export const sourcesMenuConnect = {
  /** Functional Body Medium */
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '420',
  /** Color — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

// ─── Footer row (MenuListItem) ──────────────────────────────

export const sourcesMenuFooter = {
  /** Row height */
  height: '40px',
  /** Leading glyph — more-horizontal-20 */
  iconSize: '20px',
  /** Label — Functional Body Medium, neutral-primary */
  fontSize: '14px',
  lineHeight: '20px',
  color: '#242424',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const sourcesMenuTypography = {
  fontFamily: 'Segoe Sans',
  letterSpacing: '0px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const sourcesMenu = {
  popover: sourcesMenuPopover,
  header: sourcesMenuHeader,
  search: sourcesMenuSearch,
  list: sourcesMenuList,
  item: sourcesMenuItem,
  connect: sourcesMenuConnect,
  footer: sourcesMenuFooter,
  typography: sourcesMenuTypography,
} as const;
