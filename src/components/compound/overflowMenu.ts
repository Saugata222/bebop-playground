/**
 * Component: Overflow Menu
 *
 * Bebop Design System — Header "More" (⋯) dropdown menu.
 * Appears when the user clicks the 3-dot action button in the header's
 * right action bar (property1 = "Overflow" variant of [Bebop] Menu).
 *
 * Unlike the Model Selector variant (fixed 307px width), this menu
 * auto-fits to its content (min-width 260px).
 *
 * Anatomy (top to bottom):
 *   Account row     — avatar + label + chevron right
 *   Divider
 *   Icon items      — 20px icon + label [+ optional chevron right]
 *   Divider
 *   Toggle row      — icon + label + Fluent Switch
 *   Divider
 *   Section header  — "Internal only" semibold caption
 *   Toggle rows     — label + Fluent Switch (no icon)
 *   Info rows       — label only
 *
 * Items:
 *   Change account     avatar   chevron
 *   Recent pages       pages    —
 *   Scheduled prompts  clock    —
 *   Chat settings      gear     —
 *   Download apps      down     chevron
 *   Help and tips      ?        chevron
 *   Send feedback      person   —
 *   ── divider ──
 *   Harmful content protection  shield  toggle (on)
 *   ── divider ──
 *   [Internal only section header]
 *   Try Bebop style     —    toggle (on)
 *   Try SSR             —    toggle (off)
 *   Ring: SDF           —    —
 *   License: Premium    —    —
 *
 * Prefix: --c-overflow-menu-{property}
 */

// ─── Surface ──────────────────────────────────────────────────────────
// Identical to menuSurface — white card with Elevation 3 shadow

export const overflowMenuSurface = {
  /** Background — surface/neutral/default */
  background: 'var(--f-color-white)',
  /** Padding — regular/medium (8px) */
  padding: '8px',
  /** Border radius — composite/medium (16px) */
  borderRadius: '16px',
  /** Elevation 3 ambient shadow */
  boxShadow: '0px 3px 12px 0px rgba(0, 0, 0, 0.18)',
  /** Width — auto-fit (no fixed width unlike model selector) */
  width: 'auto',
  /** Minimum width */
  minWidth: '260px',
} as const;

// ─── List Item ────────────────────────────────────────────────────────
// Reuses menuItemSize + menuItemStyleUnselected

export const overflowMenuListItem = {
  /** Padding inline — regular/large (12px) */
  paddingInline: '12px',
  /** Padding block — tight/large (10px) */
  paddingBlock: '10px',
  /** Gap between slots — atomic/medium (6px) */
  gap: '6px',
  /** Border radius — atomic/medium (12px) */
  borderRadius: '12px',
  /** Icon size */
  iconSize: '20px',
  /** Font size — body-medium (14px) */
  fontSize: 'var(--f-typography-fontSize-14)',
  /** Font weight — regular */
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  /** Line height */
  lineHeight: '1.4',
  /** Rest background — transparent */
  backgroundRest: 'rgba(36, 36, 36, 0)',
  /** Hover background — 4% black overlay */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Text color — foreground/neutral/primary */
  color: '#242424',
} as const;

// ─── Account Row ──────────────────────────────────────────────────────

export const overflowMenuAccountRow = {
  /** Avatar size */
  avatarSize: '20px',
  /** Avatar border radius — circular */
  avatarBorderRadius: '9999px',
} as const;

// ─── Section Header ──────────────────────────────────────────────────
// Reuses menuSectionHeader

export const overflowMenuSectionHeader = {
  /** Font size — body-small (12px) */
  fontSize: 'var(--f-typography-fontSize-12)',
  /** Font weight — semibold */
  fontWeight: 'var(--f-typography-fontWeight-semibold)',
  /** Line height */
  lineHeight: '1.4',
  /** Text color */
  color: '#242424',
  /** Background — transparent (non-interactive) */
  background: 'rgba(36, 36, 36, 0)',
} as const;

// ─── Toggle Row ───────────────────────────────────────────────────────
// The Fluent Switch pattern used inline within menu rows

export const overflowMenuToggle = {
  /** Track width */
  trackWidth: '40px',
  /** Track height */
  trackHeight: '20px',
  /** Track border radius */
  trackBorderRadius: '9999px',
  /** Track ON background — neutral/primary */
  trackOnBackground: '#242424',
  /** Track OFF background — white */
  trackOffBackground: '#ffffff',
  /** Track OFF border */
  trackOffBorder: '1px solid #dedede',
  /** Thumb diameter */
  thumbSize: '12px',
  /** Thumb ON color — white */
  thumbOnColor: '#ffffff',
  /** Thumb OFF color — tertiary foreground */
  thumbOffColor: '#6f6f6f',
} as const;

// ─── Aggregate Export ─────────────────────────────────────────────────

export const overflowMenu = {
  surface: overflowMenuSurface,
  listItem: overflowMenuListItem,
  accountRow: overflowMenuAccountRow,
  sectionHeader: overflowMenuSectionHeader,
  toggle: overflowMenuToggle,
} as const;
