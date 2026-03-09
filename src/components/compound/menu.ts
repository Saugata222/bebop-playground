/**
 * Component: Menu
 *
 * Bebop Design System — Floating menu surface with list items, section headers,
 * and split items.
 *
 * Anatomy:
 *   Menu (surface)       — white card with standard shadow
 *   Section Header       — small semibold label for grouping
 *   Menu List Item       — selectable row with optional slots
 *   Menu Split Item      — list item + split chevron button
 *
 * Menu List Item anatomy (left → right):
 *   [checkmark] [avatar] [icon] [label / secondary] [chevron]
 *
 * Properties — Menu List Item:
 *   Style:           List Item | Section Header
 *   State:           Rest | Hover | Disabled | Loading
 *   Selected:        true | false
 *   SecondaryPos:    Right | Under
 *   Optional slots:  checkmark, avatar, icon, secondaryContent, chevron
 *
 * Properties — Menu Split Item:
 *   Same as List Item, plus a separate split button (chevron) with
 *   its own hover/focus state.
 *
 * Focus ring: 2px black outer + 1px white inner (identical to button)
 *
 * Prefix: --c-menu-{property}
 */

// ─── Surface Tokens ─────────────────────────────────────────

export const menuSurface = {
  /** Background — surface/neutral/default */
  background: 'var(--f-color-white)',
  /** Padding — regular/medium (8px) */
  padding: '8px',
  /** Border radius — composite/medium (16px) */
  borderRadius: '16px',
  /** Elevation — standard shadow */
  boxShadow: '0px 3px 12px 0px rgba(0, 0, 0, 0.18)',
} as const;

// ─── Item Size / Layout Tokens ──────────────────────────────

export const menuItemSize = {
  /** Default width */
  width: '240px',
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
  fontSize: '14px',
  /** Font weight — regular */
  fontWeight: '400',
  /** Font weight — selected (semibold) */
  fontWeightSelected: '600',
  /** Line height */
  lineHeight: '1.4',
} as const;

// ─── Item Style — Unselected ────────────────────────────────

export const menuItemStyleUnselected = {
  /** Rest: transparent background */
  backgroundRest: 'rgba(36, 36, 36, 0)',
  /** Hover: 4% black overlay */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Text color — rest */
  colorRest: '#242424',
  /** Text color — hover (slightly darker) */
  colorHover: '#1d1d1d',
} as const;

// ─── Item Style — Selected ──────────────────────────────────

export const menuItemStyleSelected = {
  /** Rest: neutral-soft */
  backgroundRest: '#ebebeb',
  /** Hover: neutral-soft-hover */
  backgroundHover: '#e1e1e1',
  /** Text color — rest */
  colorRest: '#242424',
  /** Text color — hover */
  colorHover: '#1d1d1d',
} as const;

// ─── Item State — Disabled ──────────────────────────────────

export const menuItemStateDisabled = {
  /** Background — transparent */
  background: 'rgba(36, 36, 36, 0)',
  /** Foreground/neutral/disabled */
  color: '#929292',
  /** Cursor */
  cursor: 'not-allowed',
} as const;

// ─── Section Header ─────────────────────────────────────────

export const menuSectionHeader = {
  /** Font size — body-small (12px) */
  fontSize: '12px',
  /** Font weight — semibold */
  fontWeight: '600',
  /** Line height */
  lineHeight: '1.4',
  /** Text color */
  color: '#242424',
  /** Disabled text color */
  colorDisabled: '#929292',
  /** Background — transparent (no hover) */
  background: 'rgba(36, 36, 36, 0)',
} as const;

// ─── Secondary Content ──────────────────────────────────────

export const menuItemSecondary = {
  /** Font size — body-small (12px) */
  fontSize: '12px',
  /** Font weight — regular */
  fontWeight: '400',
  /** Font weight — selected (semibold) */
  fontWeightSelected: '600',
  /** Line height */
  lineHeight: '1.4',
  /** Text color — foreground/neutral/secondary */
  color: '#5d5d5d',
  /** Disabled text color */
  colorDisabled: '#929292',
} as const;

// ─── Checkmark Slot ─────────────────────────────────────────

export const menuItemCheckmark = {
  /** Checkmark icon size */
  iconSize: '16px',
  /** Vertical padding around checkmark */
  paddingBlock: '2px',
} as const;

// ─── Avatar Slot ────────────────────────────────────────────

export const menuItemAvatar = {
  /** Avatar size */
  size: '16px',
  /** Padding around avatar */
  padding: '2px',
  /** Border radius — circular */
  borderRadius: '9999px',
} as const;

// ─── Chevron / Submenu Indicator ────────────────────────────

export const menuItemChevron = {
  /** Chevron icon size */
  iconSize: '20px',
} as const;

// ─── Split Item (Chevron Button) ────────────────────────────

export const menuSplitItem = {
  /** Fixed width */
  width: '44px',
  /** Padding inline — regular/large (12px) */
  paddingInline: '12px',
  /** Padding block — tight/large (10px) */
  paddingBlock: '10px',
  /** Border radius — atomic/medium (12px) */
  borderRadius: '12px',
  /** Background rest — transparent */
  backgroundRest: 'rgba(36, 36, 36, 0)',
  /** Background hover — 4% black overlay */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Icon color */
  color: '#242424',
  /** Disabled color */
  colorDisabled: '#929292',
} as const;

// ─── Focus Ring ─────────────────────────────────────────────

export const menuFocusRing = {
  /** Outer border — black, 2px */
  outerWidth: '2px',
  outerColor: '#000000',
  /** Inner border — white, 1px */
  innerWidth: '1px',
  innerColor: '#ffffff',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const menuTypography = {
  fontFamily: 'var(--f-typography-fontFamily-body)',
  letterSpacing: '0px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const menu = {
  surface: menuSurface,
  item: {
    size: menuItemSize,
    unselected: menuItemStyleUnselected,
    selected: menuItemStyleSelected,
    disabled: menuItemStateDisabled,
    secondary: menuItemSecondary,
    checkmark: menuItemCheckmark,
    avatar: menuItemAvatar,
    chevron: menuItemChevron,
  },
  sectionHeader: menuSectionHeader,
  splitItem: menuSplitItem,
  focusRing: menuFocusRing,
  typography: menuTypography,
} as const;
