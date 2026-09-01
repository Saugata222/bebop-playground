/**
 * Component: MenuListItem  (+ Menu surface)
 *
 * One Copilot / Bebop Design System — Selectable row for a floating Menu, plus
 * the Menu Popover surface that hosts a stack of these rows.
 *
 * New in One Copilot; styling maps 1:1 onto Bebop foundations (transparent
 * surface, neutral foreground ramp, functional body type, atomic radius/spacing,
 * Shadow/Low elevation, and the shared selected affordance — filled icon +
 * semibold label + soft #ebebeb backplate).
 *
 * This is the focused One Copilot primitive; the richer bebop compound `menu`
 * (checkmark / avatar / chevron / split-item slots) remains separate.
 *
 * Anatomy — MenuListItem (left → right):
 *   [icon 20]  [label / secondary]  [trailing]
 *   Secondary position:
 *     Right  — single line: label + inline secondary text  (row height 40)
 *     Under  — two lines: label over secondary text        (row height 60)
 *
 * Anatomy — Menu (surface):
 *   Popover  — white card, 8px inset, Shadow/Low, radius 16
 *   └─ Content slot: stacked MenuListItem rows
 *
 * Properties — MenuListItem:
 *   State:        Rest | Hover | Pressed | Disabled
 *   Selected:     true | false   (filled icon + semibold label + backplate)
 *   Secondary:    Right | Under
 *
 * Focus ring: 2px black outer + 1px white inner (identical to button)
 *
 * Prefix: --c-menu-list-item-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Menu (node 1956:15558),
 *        MenuListItem (node 1956:14786)
 */

// ─── Item Layout ────────────────────────────────────────────

export const menuListItemLayout = {
  /** Surface — --gnrc-color-background-neutral-transparent */
  background: 'rgba(36,36,36,0)',
  /** Gap between icon, content and trailing — base-150 (6px) */
  gap: '6px',
  /** Inline padding — --gnrc-spacing-component-base-300 (12px) */
  paddingInline: '12px',
  /** Block padding — --gnrc-spacing-component-base-250 (10px) */
  paddingBlock: '10px',
  /** Corner radius — --gnrc-border-radius-base-300 (12px) */
  borderRadius: '12px',
  /** Row height — Secondary=Right (single line) */
  heightSingle: '40px',
  /** Row height — Secondary=Under (two line) */
  heightStacked: '60px',
  /** Default width — matches Menu content slot */
  width: '224px',
  /** Vertical gap between label and secondary (Secondary=Under) — base-100 (4px) */
  stackGap: '4px',
} as const;

// ─── Leading Icon ───────────────────────────────────────────

export const menuListItemIcon = {
  /** Icon size */
  size: '20px',
  /** Color — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
  /** Disabled color — --gnrc-color-foreground-neutral-disabled */
  colorDisabled: '#929292',
  /** Variant at rest */
  variantRest: 'regular',
  /** Variant when selected */
  variantSelected: 'filled',
} as const;

// ─── Trailing Slot ──────────────────────────────────────────

export const menuListItemTrailing = {
  /** Reserved trailing container (Secondary=Under) */
  size: '32px',
} as const;

// ─── Label ──────────────────────────────────────────────────

export const menuListItemLabel = {
  /** Family — --gnrc-font-family-functional */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  /** Functional Body Medium — 14px */
  fontSize: '14px',
  /** Line height — --gnrc-line-height-functional-body-medium (20px) */
  lineHeight: '20px',
  /** Letter spacing */
  letterSpacing: '0px',
  /** Weight — rest (regular) */
  fontWeightRest: '420',
  /** Weight — selected (semibold, Body Medium Strong) */
  fontWeightSelected: '625',
  /** Variable-font axes — rest */
  variationRest: "'opsz' 8, 'wght' 420",
  /** Variable-font axes — selected */
  variationSelected: "'opsz' 8, 'wght' 625",
  /** Color — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
  /** Disabled — --gnrc-color-foreground-neutral-disabled */
  colorDisabled: '#929292',
} as const;

// ─── Secondary Text ─────────────────────────────────────────

export const menuListItemSecondary = {
  /** Functional Body Small — 12px */
  fontSize: '12px',
  /** Line height — --gnrc-line-height-functional-body-small (16px) */
  lineHeight: '16px',
  /** Letter spacing */
  letterSpacing: '0px',
  /** Weight — regular */
  fontWeight: '420',
  /** Variable-font axes */
  variation: "'opsz' 8, 'wght' 420",
  /** Color — --gnrc-color-foreground-neutral-secondary */
  color: '#5d5d5d',
  /** Disabled — --gnrc-color-foreground-neutral-disabled */
  colorDisabled: '#929292',
} as const;

// ─── Interaction States (backplate) ─────────────────────────

export const menuListItemState = {
  /** Rest — transparent */
  backgroundRest: 'rgba(36,36,36,0)',
  /** Hover — 4% neutral overlay */
  backgroundHover: 'rgba(36,36,36,0.04)',
  /** Pressed — 8% neutral overlay */
  backgroundPressed: 'rgba(36,36,36,0.08)',
  /** Disabled — transparent */
  backgroundDisabled: 'rgba(36,36,36,0)',
} as const;

// ─── Selected Affordance ────────────────────────────────────

export const menuListItemSelected = {
  /** Soft backplate — --gnrc-color-background-neutral-soft (#ebebeb) */
  background: '#ebebeb',
  /** Hover over selected */
  backgroundHover: '#e0e0e0',
  /** Icon variant swap */
  iconVariant: 'filled',
  /** Label weight swap */
  fontWeight: '625',
} as const;

// ─── Focus Ring ─────────────────────────────────────────────

export const menuListItemFocusRing = {
  /** Outer ring — 2px solid black */
  outer: '2px solid #242424',
  /** Inner ring — 1px white inset */
  inner: '0 0 0 1px #ffffff inset',
  /** Ring offset radius */
  borderRadius: '12px',
} as const;

// ─── Menu Popover Surface ───────────────────────────────────

export const menuListItemSurface = {
  /** Background — --gnrc-color-surface-neutral-nearer (white) */
  background: '#ffffff',
  /** Border thickness — --gnrc-stroke-width-thin */
  borderWidth: '1px',
  /** Border color — --gnrc-color-stroke-neutral-transparent */
  borderColor: 'rgba(36,36,36,0)',
  /** Corner radius — --gnrc-border-radius-base-400 (16px) */
  borderRadius: '16px',
  /** Content slot inset — --gnrc-spacing-component-base-200 (8px) */
  padding: '8px',
  /** Default width (content 224 + inset 8×2) */
  width: '240px',
  /** Elevation — Shadow/Low (contour + soft ambient + key) */
  boxShadow:
    '0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08)',
} as const;

// ─── Typography Roll-up ─────────────────────────────────────

export const menuListItemTypography = {
  label: menuListItemLabel,
  secondary: menuListItemSecondary,
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const menuListItem = {
  layout: menuListItemLayout,
  icon: menuListItemIcon,
  trailing: menuListItemTrailing,
  label: menuListItemLabel,
  secondary: menuListItemSecondary,
  state: menuListItemState,
  selected: menuListItemSelected,
  focusRing: menuListItemFocusRing,
  surface: menuListItemSurface,
  typography: menuListItemTypography,
} as const;
