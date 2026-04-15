/**
 * Component: Acquired Card
 *
 * Bebop Design System — Compact chip for an already-installed agent or skill.
 *
 * Used in the "My agents & skills" grid on the Extensions page. Shows the
 * agent icon and name in a compact pill. On hover, reveals a "..." overflow
 * button that opens a 3-item context menu (About, Share, Manage).
 *
 * Anatomy:
 *   Card (242×62, rounded-14, #f5f5f5 bg)
 *     Row (14px gap, center-aligned)
 *       Icon (37.5×37.5, app icon or gradient avatar)
 *       Name (16px regular, #242424, flex-1, ellipsis)
 *       Overflow (20px "..." icon, visible on hover only)
 *
 *   Context Menu (202×136, rounded-16, white bg, elevation-3 shadow)
 *     3 list items: About, Share, Manage
 *     Each: 40px tall, 12px horizontal padding, 10px vertical, 6px icon-text gap, rounded-12
 *
 * Foundation references:
 *   Radius:     14px card (between radiusAtomic.medium 12px and large 16px)
 *   Color:      neutral[97] (#f5f5f5) card bg, neutral[26] (#242424) text
 *   Typography: 16px/400 for name, 14px/400 for menu items
 *   Elevation:  level 3 for context menu (0px 3px 12px rgba(0,0,0,0.18))
 *   Menu:       reuses menuSurface tokens (white bg, rounded-16, elevation-3)
 *
 * Prefix: --c-acquiredCard-{property}
 */

// ─── Card Tokens ────────────────────────────────────────────

export const acquiredCardContainer = {
  /** Card width */
  width: '242px',
  /** Card height */
  height: '62px',
  /** Padding horizontal */
  paddingInline: '18px',
  /** Padding vertical */
  paddingBlock: '9px',
  /** Border radius — 14px */
  borderRadius: '14px',
  /** Background — neutral[97] */
  background: '#f5f5f5',
  /** Background hover */
  backgroundHover: '#ebebeb',
  /** Gap between icon and text */
  gap: '14px',
} as const;

// ─── Icon Tokens ────────────────────────────────────────────

export const acquiredCardIcon = {
  /** Icon container size */
  size: '37.5px',
  /** Inner icon size (for product logos) */
  iconSize: '33px',
} as const;

// ─── Name Tokens ────────────────────────────────────────────

export const acquiredCardName = {
  /** Font size */
  fontSize: '16px',
  /** Font weight — regular */
  fontWeight: '400',
  /** Line height */
  lineHeight: '24px',
  /** Color — neutral[26] */
  color: '#242424',
} as const;

// ─── Overflow Button Tokens ─────────────────────────────────

export const acquiredCardOverflow = {
  /** Icon size */
  iconSize: '20px',
  /** Color */
  color: '#242424',
  /** Visibility — shown on card hover only */
  restOpacity: '0',
  hoverOpacity: '1',
} as const;

// ─── Context Menu Tokens ────────────────────────────────────
// Reuses menu primitive pattern: white bg, rounded-16, elevation-3

export const acquiredCardMenu = {
  /** Menu width */
  width: '202px',
  /** Background */
  background: '#ffffff',
  /** Border radius — radiusComposite.medium */
  borderRadius: '16px',
  /** Padding */
  padding: '8px',
  /** Elevation 3 shadow */
  boxShadow: '0px 3px 12px 0px rgba(0, 0, 0, 0.18)',
} as const;

export const acquiredCardMenuItem = {
  /** Item height */
  height: '40px',
  /** Padding horizontal */
  paddingInline: '12px',
  /** Padding vertical */
  paddingBlock: '10px',
  /** Gap between icon and text */
  gap: '6px',
  /** Border radius */
  borderRadius: '12px',
  /** Background rest */
  background: 'transparent',
  /** Background hover */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Font size — typeFunctional.bodyMedium */
  fontSize: '14px',
  /** Font weight */
  fontWeight: '400',
  /** Line height */
  lineHeight: '20px',
  /** Color — neutral[26] */
  color: '#242424',
  /** Icon size */
  iconSize: '20px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const acquiredCard = {
  container: acquiredCardContainer,
  icon: acquiredCardIcon,
  name: acquiredCardName,
  overflow: acquiredCardOverflow,
  menu: acquiredCardMenu,
  menuItem: acquiredCardMenuItem,
} as const;
