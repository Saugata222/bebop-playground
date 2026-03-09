/**
 * Component: TabList
 *
 * Bebop Design System — Horizontal list of Tab components.
 *
 * A tablist groups tabs together and manages the layout.
 * Tabs are arranged horizontally with a consistent gap.
 * Supports both text-only and icon-only tab rows.
 *
 * Properties:
 *   Layout:  Text tabs | Icon tabs
 *   Direction: Horizontal (default)
 *
 * Prefix: --c-tabList-{property}
 */

// ─── Layout Tokens ──────────────────────────────────────────

export const tabListLayout = {
  /** Flex direction */
  display: 'flex',
  /** Gap between tabs — gap/atomic/small (4px) */
  gap: '4px',
  /** Align items to start */
  alignItems: 'flex-start',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const tabList = {
  layout: tabListLayout,
} as const;
