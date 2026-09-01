/**
 * Component: TabList
 *
 * One Copilot / Bebop Design System — Horizontal strip of Tab components.
 *
 * A transparent layout wrapper that groups tabs and manages their layout and
 * keyboard model (roving tabindex). It must always have exactly one Selected
 * tab. An optional End content slot holds a trailing action (overflow menu,
 * add-tab affordance) aligned to the trailing edge. Never apply a background
 * fill or stroke to the container — visual weight comes from the child tabs.
 *
 * Anatomy:
 *   Tablist container — flex row, 4px gap, overflow-clip, holds the Tabs
 *   End content       — optional trailing slot (e.g. circular icon button)
 *
 * Properties:
 *   Layout:     Text tabs | Icon tabs (never mixed within one tablist)
 *   Direction:  Horizontal
 *   EndContent: none | present
 *
 * Prefix: --c-tabList-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Tablist (node 1413:25804)
 */

// ─── Layout Tokens ──────────────────────────────────────────

export const tabListLayout = {
  /** Flex direction */
  display: 'flex',
  /** Gap between tabs — --gnrc-spacing-component-base-100 (4px) */
  gap: '4px',
  /** Align items to start */
  alignItems: 'flex-start',
  /** Container is a transparent wrapper — never fill or stroke it */
  background: 'transparent',
  /** Tab strip clips overflow; end content stays pinned to the trailing edge */
  overflow: 'clip',
} as const;

// ─── End Content Slot ───────────────────────────────────────

export const tabListEndContent = {
  /** Trailing icon-button padding — --gnrc-spacing-component-base-150 (6px) */
  padding: '6px',
  /** Icon size */
  iconSize: '20px',
  /** Circular affordance — --gnrc-border-radius-atomic-circular */
  borderRadius: '9999px',
  /** Transparent border at rest — --gnrc-color-stroke-neutral-transparent */
  borderColor: 'rgba(36,36,36,0)',
  /** Border thickness — --gnrc-stroke-width-thin */
  borderWidth: '1px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const tabList = {
  layout: tabListLayout,
  endContent: tabListEndContent,
} as const;
