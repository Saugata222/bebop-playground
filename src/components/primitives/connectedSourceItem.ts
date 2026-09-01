/**
 * Component: Connected Source Item
 *
 * Bebop Design System — Row item for the Sources tab in Settings.
 *
 * Anatomy:
 *   [Logo 48×48] [Header + Description] ········ [Toggle Switch]
 *
 * Used in Settings → Sources to manage connected data sources. Toggling
 * a row off keeps the source connected but disables it from Copilot's
 * retrieval. The same source appears in the Store's "Connected sources"
 * grid; toggling here updates state across both surfaces.
 *
 * Prefix: --c-connectedSourceItem-{property}
 */

// ─── Container Tokens ───────────────────────────────────────

export const connectedSourceItemContainer = {
  /** Padding (vertical + horizontal) */
  padding: '12px 18px',
  /** Gap between icon, text, and toggle */
  gap: '14.083px',
  /** Border — rest */
  border: '1.174px solid #d1d1d1',
  /** Border — hover */
  borderHover: '1.174px solid #b8b8b8',
  /** Border radius */
  borderRadius: '14.083px',
  /** Background — rest */
  background: '#ffffff',
  /** Background — hover */
  backgroundHover: '#fafafa',
} as const;

// ─── Icon Tokens ────────────────────────────────────────────

export const connectedSourceItemIcon = {
  /** Container size */
  size: '48px',
  /** Inner image size */
  imgSize: '48px',
} as const;

// ─── Text Tokens ────────────────────────────────────────────

export const connectedSourceItemHeader = {
  /**
   * Font size.
   *
   * TODO: 18px is not in the 19-stop type ramp (see
   * src/tokens/foundations/typography.ts). Nearest ramp values are 16 and 20.
   * Verify against Figma before swapping to a var reference; kept as a literal
   * pending design review.
   */
  fontSize: '18px',
  /** Font weight — semibold */
  fontWeight: 'var(--f-typography-fontWeight-semibold)',
  /** Line height */
  lineHeight: '23.472px',
  /** Color */
  color: '#242424',
} as const;

export const connectedSourceItemDescription = {
  /** Font size */
  fontSize: 'var(--f-typography-fontSize-14)',
  /** Font weight — regular */
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  /** Line height */
  lineHeight: '20px',
  /** Color */
  color: '#616161',
} as const;

// ─── Layout Tokens ──────────────────────────────────────────

export const connectedSourceItemTextStack = {
  /** Vertical gap between header and description */
  gap: '2px',
} as const;

export const connectedSourceItemList = {
  /** Vertical gap between rows */
  gap: '8px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const connectedSourceItem = {
  container: connectedSourceItemContainer,
  icon: connectedSourceItemIcon,
  header: connectedSourceItemHeader,
  description: connectedSourceItemDescription,
  textStack: connectedSourceItemTextStack,
  list: connectedSourceItemList,
} as const;
