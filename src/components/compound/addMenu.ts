/**
 * Component: Add Menu
 *
 * Bebop Design System — Flyout menu attached to the "+" (Add) toolbar button
 * in the chat input. Opens upward from the input bar, offering quick actions
 * for adding content, uploading files, and switching data sources.
 *
 * Anatomy:
 *   Surface (card)        — white bg, 16px radius, standard shadow (reuses menuSurface)
 *   Header Row            — icon + label + toggle switch (Work IQ)
 *   Divider               — 1px #f0f0f0 with 8px vertical padding
 *   Menu Items            — icon + label rows (reuses menu list item tokens)
 *
 * Menu Items:
 *   1. Add work content       — Add icon
 *   2. Upload images & files  — Arrow Upload icon
 *   3. Attach cloud files     — Cloud (OneDrive) icon
 *   4. Change data sources    — Flow icon
 *   5. Chat with agents       — Mention icon
 *
 * Header row has a 44px height with a small toggle switch (32×16px)
 * that controls the "Work IQ" feature.
 *
 * Composes: menuSurface, menuItemSize, menuItemStyleUnselected, toggle
 *
 * Prefix: --c-addMenu-{property}
 */

// ─── Header Row Tokens ──────────────────────────────────────

export const addMenuHeader = {
  /** Total row height */
  height: '44px',
  /** Padding block — small (4px) */
  paddingBlock: '4px',
  /** Inner container padding inline — large (12px) */
  paddingInline: '12px',
  /** Inner container padding block — medium (8px) */
  containerPaddingBlock: '8px',
  /** Gap between icon, label, switch — medium (8px) */
  gap: '8px',
  /** Border radius — large (12px) */
  borderRadius: '12px',
  /** Background — transparent */
  background: 'rgba(36, 36, 36, 0)',
  /** Icon size */
  iconSize: '20px',
  /** Label font size — body-medium (14px) */
  fontSize: '14px',
  /** Label font weight */
  fontWeight: '400',
  /** Label line height */
  lineHeight: '20px',
  /** Label color */
  color: '#242424',
} as const;

// ─── Toggle Switch (small) ──────────────────────────────────

export const addMenuToggle = {
  /** Track width */
  trackWidth: '32px',
  /** Track height */
  trackHeight: '16px',
  /** Track border radius */
  trackRadius: '9999px',
  /** Track off background */
  trackOffBackground: '#ababab',
  /** Track on background */
  trackOnBackground: '#242424',
  /** Thumb size */
  thumbSize: '12px',
  /** Thumb color */
  thumbColor: '#ffffff',
  /** Thumb offset rest */
  thumbOffset: '2px',
  /** Outer padding */
  padding: '2px',
} as const;

// ─── Divider ────────────────────────────────────────────────

export const addMenuDivider = {
  /** Divider color — light */
  color: '#f0f0f0',
  /** Divider height */
  height: '1px',
  /** Wrapper padding block */
  paddingBlock: '8px',
} as const;

// ─── Menu Item (reuses menu tokens, overrides gap) ──────────

export const addMenuItem = {
  /** Padding — regular/large (12px) all sides */
  padding: '12px',
  /** Gap between icon and label — atomic/large (8px) */
  gap: '8px',
  /** Border radius — atomic/medium (12px) */
  borderRadius: '12px',
  /** Icon size */
  iconSize: '20px',
  /** Font size — body-medium (14px) */
  fontSize: '14px',
  /** Font weight */
  fontWeight: '400',
  /** Line height */
  lineHeight: '20px',
  /** Rest background — transparent */
  backgroundRest: 'rgba(36, 36, 36, 0)',
  /** Hover background — 4% black */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Rest text color */
  colorRest: '#242424',
  /** Hover text color */
  colorHover: '#1d1d1d',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const addMenu = {
  header: addMenuHeader,
  toggle: addMenuToggle,
  divider: addMenuDivider,
  item: addMenuItem,
} as const;
