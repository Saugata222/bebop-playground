/**
 * Component: Add Menu (One Copilot)
 *
 * One Copilot / Bebop Design System — The menu triggered by the "+" (add)
 * button in the chat input. A floating Menu that lets people add content,
 * upload files, attach cloud files, add capabilities, and change data sources.
 *
 * Composed entirely from existing One Copilot primitives — it is a Menu
 * (Popover surface + MenuListItem rows) grouped by Dividers. No new visual
 * tokens: it reuses `menuListItem` (rows + surface) and `divider`.
 *
 * Anatomy:
 *   Trigger  — "+" icon button (add-20) in the chat input footer
 *   Popover  — white surface, 8px inset, radius 16, Shadow/Low, 240px wide
 *   └─ MenuListItem × 3   (Add content · Upload image and files · Attach cloud files)
 *      Divider
 *      MenuListItem        (Add capabilities → trailing chevron, opens a submenu)
 *      Divider
 *      MenuListItem        (Change data sources)
 *
 * Placement: opens Above the trigger, left-aligned to it (bottom-left anchor).
 *
 * Prefix: --c-add-menu-oc-{property}
 *
 * Figma: User-Level-Sync-Connectors — Menu (node 3090:16767),
 *        placement (node 3090:16313)
 */

import { menuListItemSurface, menuListItemLayout, menuListItemIcon, menuListItemLabel } from '../primitives/menuListItem';

// ─── Surface (reuses the Menu Popover) ──────────────────────

export const addMenuOneCopilotSurface = {
  background: menuListItemSurface.background,
  borderWidth: menuListItemSurface.borderWidth,
  borderColor: menuListItemSurface.borderColor,
  borderRadius: menuListItemSurface.borderRadius,
  padding: menuListItemSurface.padding,
  width: menuListItemSurface.width,
  boxShadow: menuListItemSurface.boxShadow,
} as const;

// ─── Item (reuses MenuListItem) ─────────────────────────────

export const addMenuOneCopilotItem = {
  height: menuListItemLayout.heightSingle,
  paddingInline: menuListItemLayout.paddingInline,
  paddingBlock: menuListItemLayout.paddingBlock,
  gap: menuListItemLayout.gap,
  borderRadius: menuListItemLayout.borderRadius,
  iconSize: menuListItemIcon.size,
  iconColor: menuListItemIcon.color,
  labelFontSize: menuListItemLabel.fontSize,
  labelLineHeight: menuListItemLabel.lineHeight,
  labelFontWeight: menuListItemLabel.fontWeightRest,
  labelColor: menuListItemLabel.color,
  /** Trailing chevron (submenu) — tertiary */
  chevronSize: '20px',
  chevronColor: '#6f6f6f',
} as const;

// ─── Item list (label · icon · grouping) ────────────────────

export const addMenuOneCopilotItems = [
  { label: 'Add content',           icon: 'attach-20-regular' },
  { label: 'Upload image and files', icon: 'arrow-upload-20-regular' },
  { label: 'Attach cloud files',    icon: 'cloud-20-regular' },
  { divider: true },
  { label: 'Add capabilities',      icon: 'options-20-regular', submenu: true },
  { divider: true },
  { label: 'Change data sources',   icon: 'flow-20-regular' },
] as const;

// ─── Trigger ("+" button) ───────────────────────────────────

export const addMenuOneCopilotTrigger = {
  /** Icon-only subtle button (medium) */
  size: '32px',
  iconSize: '20px',
  icon: 'add-20-regular',
  borderRadius: '12px',
  /** Placement relative to trigger */
  placement: 'above',
  /** Gap between trigger and menu */
  offset: '8px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const addMenuOneCopilot = {
  surface: addMenuOneCopilotSurface,
  item: addMenuOneCopilotItem,
  items: addMenuOneCopilotItems,
  trigger: addMenuOneCopilotTrigger,
} as const;
