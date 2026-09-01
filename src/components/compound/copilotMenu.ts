/**
 * Component: Copilot Menu
 *
 * Bebop Design System — Header dropdown anchored to the "More" button in the
 * Copilot chat shell. White card surface with a list of navigational action
 * items, a divider, and a "Copilot response includes" section of toggle rows.
 *
 * Anatomy:
 *   ┌─────────────────────────────────┐
 *   │ [icon]  Recent pages            │  ← Action item
 *   │ [icon]  Scheduled prompts       │
 *   │ [icon]  Chat settings           │
 *   │ [icon]  Download apps        ›  │  ← Action item with submenu (chevron)
 *   │ [icon]  Help and tips        ›  │
 *   │ [icon]  Send feedback           │
 *   │ ─────────────────────────────── │  ← Divider
 *   │   Copilot response includes     │  ← Section label
 *   │ [icon]  Web search        [●─]  │  ← Toggle row (on)
 *   └─────────────────────────────────┘
 *
 *   1. Surface — 280px wide, white, 12px radius, 8px padding, dual elevation shadow
 *   2. Action item — 36px tall row, 8px×12px padding, 20px icon + 14px label + optional 20px chevron
 *   3. Divider — 1px line, #ebebeb, 6px×4px margin
 *   4. Section label — 12px semibold caption introducing the toggle group
 *   5. Toggle row — same shape as action item but trailing pill toggle (32×16, 12px thumb)
 *
 * Reference: Figma 322:67106
 *
 * Prefix: --c-copilotMenu-{property}
 */

// ─── Surface ────────────────────────────────────────────────

export const copilotMenuSurface = {
  /** Anchored under the More button — top: calc(100% + 4px) */
  position: 'absolute',
  /** Default anchor — flush to trigger's right edge */
  anchorOffsetRight: '0',
  /** Above all other overlays (am-overlay 80, src-overlay 90, fre-overlay 150, conn-overlay 200) */
  zIndex: 250,
  width: '280px',
  background: '#ffffff',
  borderRadius: '12px',
  /** Elevation — Ambient + Key drop shadows */
  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.18), 0px 0px 2px rgba(0, 0, 0, 0.06)',
  padding: '8px',
} as const;

// ─── Action Item ────────────────────────────────────────────

export const copilotMenuItem = {
  height: '36px',
  padding: '8px 12px',
  borderRadius: '8px',
  background: 'transparent',
  color: '#242424',
  gap: '8px',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  /** Whole row is clickable as a button */
  cursor: 'pointer',
} as const;

export const copilotMenuItemHover = {
  background: 'rgba(36, 36, 36, 0.04)',
} as const;

export const copilotMenuItemFocus = {
  outline: '2px solid #000000',
  outlineOffset: '-2px',
  boxShadow: '0 0 0 1px #ffffff inset',
} as const;

// ─── Item Slots — leading icon, label, trailing chevron ─────

export const copilotMenuItemIcon = {
  size: '20px',
  color: '#242424',
} as const;

export const copilotMenuItemLabel = {
  /** Fills remaining horizontal space */
  flex: '1 1 0',
  /** Truncation safety */
  minWidth: '0',
} as const;

export const copilotMenuItemChevron = {
  size: '20px',
  color: '#424242',
} as const;

// ─── Divider ────────────────────────────────────────────────

export const copilotMenuDivider = {
  height: '1px',
  background: '#ebebeb',
  margin: '6px 4px',
} as const;

// ─── Section Label ──────────────────────────────────────────

export const copilotMenuSectionLabel = {
  padding: '8px 12px 4px',
  fontSize: '12px',
  fontWeight: '600',
  lineHeight: '16px',
  color: '#424242',
} as const;

// ─── Toggle Row ─────────────────────────────────────────────

export const copilotMenuToggleRow = {
  /** Shares the action-item shape */
  height: '36px',
  padding: '8px 12px',
  borderRadius: '8px',
  gap: '8px',
  color: '#242424',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  cursor: 'pointer',
} as const;

export const copilotMenuToggleRowHover = {
  background: 'rgba(36, 36, 36, 0.04)',
} as const;

// ─── Toggle Pill — 32×16 with 12px thumb (matches sources-panel toggle) ───

export const copilotMenuToggleOff = {
  width: '32px',
  height: '16px',
  borderRadius: 'var(--f-radius-atomic-circular)',
  background: '#ffffff',
  border: '1px solid #dedede',
  /** Thumb position when off */
  thumbLeft: '2px',
  thumbSize: '12px',
  thumbBackground: '#6f6f6f',
} as const;

export const copilotMenuToggleOn = {
  background: '#242424',
  border: '1px solid transparent',
  /** Thumb position when on */
  thumbLeft: '18px',
  thumbBackground: '#ffffff',
} as const;

// ─── Aggregate ──────────────────────────────────────────────

export const copilotMenu = {
  surface: copilotMenuSurface,
  item: {
    rest: copilotMenuItem,
    hover: copilotMenuItemHover,
    focus: copilotMenuItemFocus,
    icon: copilotMenuItemIcon,
    label: copilotMenuItemLabel,
    chevron: copilotMenuItemChevron,
  },
  divider: copilotMenuDivider,
  sectionLabel: copilotMenuSectionLabel,
  toggleRow: {
    rest: copilotMenuToggleRow,
    hover: copilotMenuToggleRowHover,
  },
  toggle: {
    off: copilotMenuToggleOff,
    on: copilotMenuToggleOn,
  },
} as const;
