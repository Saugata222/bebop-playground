/**
 * Component: Source Filter
 *
 * One Copilot / Bebop Design System — a "Filter by" dropdown used to narrow a
 * connector / source list by category. Aligned to the Source Discovery file
 * (Figma node 1774:46045).
 *
 * A transparent trigger ("Filter by" + chevron) opens a small menu of mutually
 * exclusive category options. The first option is "Recommended" (the surfaced
 * top connectors); the rest are competitive-use categories (Finance,
 * Productivity, Sales). Selecting a category filters the list; the trigger
 * label reflects the active category.
 *
 * Composes the Dropdown trigger + Menu patterns; the menu rows are MenuListItem.
 *
 * Anatomy:
 *   Trigger  — 32px, transparent, radius 12, Body Medium label + chevron-down 20
 *   Menu     — white popover, radius 12, Shadow/Low, category rows
 *   Item     — 36px row, Body Medium, hover backplate, checkmark when selected
 *
 * Prefix: --c-source-filter-{property}
 */

// ─── Trigger ────────────────────────────────────────────────

export const sourceFilterTrigger = {
  height: '32px',
  /** Inline padding — 12 lead / 8 trail (chevron) */
  paddingInline: '12px',
  paddingTrail: '8px',
  /** Gap between label and chevron — base-100 */
  gap: '4px',
  /** Radius — base-300 */
  borderRadius: '12px',
  /** Rest — background/neutral/transparent */
  background: 'rgba(36,36,36,0)',
  /** Hover — transparent hover */
  backgroundHover: 'rgba(36,36,36,0.04)',
  /** Open — soft backplate */
  backgroundOpen: '#ebebeb',
  /** Label — Functional Body Medium */
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '420',
  /** Label color — foreground/neutral/primary */
  color: '#242424',
  /** Chevron size + color (tertiary) */
  chevronSize: '20px',
  chevronColor: '#6f6f6f',
} as const;

// ─── Menu (popover) ─────────────────────────────────────────

export const sourceFilterMenu = {
  /** Surface — surface/neutral/nearer */
  background: '#ffffff',
  /** Border — 1px transparent */
  border: '1px solid rgba(36,36,36,0)',
  /** Radius — base-300 */
  borderRadius: '12px',
  /** Inset padding — base-100 */
  padding: '4px',
  /** Min width */
  minWidth: '168px',
  /** Shadow/Low — contour + soft ambient + low key */
  boxShadow:
    '0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08)',
  /** Offset below the trigger */
  offset: '4px',
} as const;

// ─── Menu Item ──────────────────────────────────────────────

export const sourceFilterItem = {
  /** Row height */
  height: '36px',
  /** Inline padding — base-300 */
  paddingInline: '12px',
  /** Block padding — base-200 */
  paddingBlock: '8px',
  /** Gap between check and label — base-150 */
  gap: '6px',
  /** Radius — base-200 */
  borderRadius: '8px',
  /** Label — Functional Body Medium */
  fontSize: '14px',
  lineHeight: '20px',
  /** Rest weight / selected weight (Body Medium Strong) */
  fontWeight: '420',
  fontWeightSelected: '625',
  /** Color — foreground/neutral/primary */
  color: '#242424',
  /** Hover — transparent hover */
  backgroundHover: 'rgba(36,36,36,0.04)',
  /** Selected — soft backplate */
  backgroundSelected: '#ebebeb',
  /** Trailing checkmark size */
  checkSize: '16px',
} as const;

// ─── Categories ─────────────────────────────────────────────
// "Recommended" surfaces the top connectors; the rest are competitive-use
// categories connectors are commonly grouped by.

export const sourceFilterCategories = ['Recommended', 'Productivity', 'Development', 'Communication', 'Design', 'Finance', 'Sales'] as const;

// ─── Aggregate Export ───────────────────────────────────────

export const sourceFilter = {
  trigger: sourceFilterTrigger,
  menu: sourceFilterMenu,
  item: sourceFilterItem,
  categories: sourceFilterCategories,
} as const;
