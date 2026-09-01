/**
 * Compound: Settings (v1.2)
 *
 * One Copilot / Bebop Design System — the One Copilot Settings modal, v1.2.
 * A left category sidebar + a right content pane, shown inside a centered
 * Dialog. Aligned to the Source Discovery file (Figma node 1774:45318,
 * "Settings v2" → Dialog → One Copilot Settings - Work Web).
 *
 * This is a SEPARATE compound from the existing `settingsModal` (v1) — both
 * are kept. v1.2 introduces the two-pane layout with a Sources pane that
 * mirrors the Sources Menu rows (logo + title + secondary + chevron/Connect).
 *
 * Composition (reuse-first):
 *   • dialog (compound)   → modal surface + overlay + header (title + close)
 *   • menuListItem        → left sidebar category rows + source rows
 *   • dropdown            → the "Filter by" control
 *   • input               → the search field
 *   • divider             → description rule + row separators
 *
 * Anatomy:
 *   Overlay        — scrim behind the modal
 *   Modal          — white card, radius 24, Shadow/Highest, 28px inset
 *   ├─ Header      — "Settings" (Subtitle) + close Button
 *   └─ Body (row)  — Sidebar (categories) | Content pane
 *       Content    — section header (title + Filter-by dropdown + Search),
 *                    description + divider, then a list of source rows.
 *       Source row — logo 20 + title (Body Medium) + secondary (Body Small)
 *                    + trailing chevron-right (configurable) OR "Connect" link.
 *
 * Prefix: --c-settings-v12-{property}
 */

// ─── Overlay ────────────────────────────────────────────────

export const settingsV12Overlay = {
  background: 'rgba(0,0,0,0.4)',
} as const;

// ─── Modal Surface ──────────────────────────────────────────

export const settingsV12Modal = {
  /** Width */
  width: '720px',
  /** Surface — --gnrc-color-surface-neutral-nearer */
  background: '#ffffff',
  /** Radius — --gnrc-border-radius-base-600 */
  borderRadius: '24px',
  /** Inset padding — --gnrc-spacing-component-base-700 */
  padding: '28px',
  /** Shadow/Highest */
  boxShadow:
    '0 0 1px 0 rgba(0,0,0,0.08), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08)',
} as const;

// ─── Header ─────────────────────────────────────────────────

export const settingsV12Header = {
  /** Title — Functional Subtitle (Display Semibold) */
  titleFontSize: '20px',
  titleLineHeight: '28px',
  titleFontWeight: '600',
  titleColor: '#242424',
  /** Close button footprint */
  closeButtonSize: '32px',
  closeIconSize: '20px',
  /** Gap below header */
  marginBottom: '20px',
} as const;

// ─── Body / Sidebar ─────────────────────────────────────────

export const settingsV12Sidebar = {
  /** Column width */
  width: '150px',
  /** Gap between rows */
  gap: '2px',
  /** Gap between sidebar and content */
  columnGap: '24px',
} as const;

/** Sidebar category row — a MenuListItem in text-only form. */
export const settingsV12SidebarItem = {
  height: '32px',
  paddingInline: '12px',
  paddingBlock: '6px',
  borderRadius: '8px',
  fontSize: '14px',
  lineHeight: '20px',
  /** Rest — foreground/neutral/secondary */
  color: '#5d5d5d',
  fontWeight: '420',
  /** Hover — transparent hover */
  backgroundHover: 'rgba(36,36,36,0.04)',
  /** Selected — soft backplate + primary semibold */
  backgroundSelected: '#ebebeb',
  colorSelected: '#242424',
  fontWeightSelected: '625',
} as const;

// ─── Content Pane ───────────────────────────────────────────

export const settingsV12Content = {
  /** Section title — Body Medium Strong, bumped */
  titleFontSize: '16px',
  titleLineHeight: '22px',
  titleFontWeight: '600',
  titleColor: '#242424',
  /** Description — Body Small, secondary */
  descFontSize: '12px',
  descLineHeight: '16px',
  descColor: '#5d5d5d',
  /** Divider under description — stroke/neutral/subtle */
  dividerColor: '#dedede',
  /** Row gap between header / description / list */
  sectionGap: '8px',
} as const;

// ─── Source Row ─────────────────────────────────────────────

export const settingsV12SourceRow = {
  /** Row min height */
  minHeight: '56px',
  /** Block padding */
  paddingBlock: '12px',
  /** Gap between logo / text / trailing — base-300 */
  gap: '12px',
  /** Hover backplate — transparent hover */
  backgroundHover: 'rgba(36,36,36,0.04)',
  /** Row separator */
  dividerColor: '#ededed',
  /** Logo size */
  logoSize: '20px',
  /** Title — Body Medium, primary */
  titleFontSize: '14px',
  titleLineHeight: '20px',
  titleColor: '#242424',
  /** Secondary — Body Small, secondary */
  secondaryFontSize: '12px',
  secondaryLineHeight: '16px',
  secondaryColor: '#5d5d5d',
  /** Trailing chevron — tertiary */
  chevronSize: '20px',
  chevronColor: '#6f6f6f',
  /** "Connect" link — Body Medium, primary */
  connectFontSize: '14px',
  connectColor: '#242424',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const settingsV12 = {
  overlay: settingsV12Overlay,
  modal: settingsV12Modal,
  header: settingsV12Header,
  sidebar: settingsV12Sidebar,
  sidebarItem: settingsV12SidebarItem,
  content: settingsV12Content,
  sourceRow: settingsV12SourceRow,
} as const;
