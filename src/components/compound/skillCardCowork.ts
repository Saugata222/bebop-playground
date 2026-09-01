/**
 * Component: Skill Card - Cowork
 *
 * One Copilot / Connector Skills (Cowork) — a skill / MCP row used inside a
 * plugin's L2 detail (the "MCPs" and "Skills" sections). A bordered white row
 * with a leading glyph, name + description, and a trailing control that depends
 * on the plugin's connection state.
 *
 * Anatomy:
 *   Icon      — 20px Fluent glyph (Script for skills, MCP mark for servers)
 *   Text      — Name (Functional Body Medium Strong 14/600) + description
 *               (Functional Body Small 12/16, secondary)
 *   Trailing  — chevron-right (not connected) → becomes an overflow (⋮) menu
 *               once the plugin is connected. MCP rows have no trailing control.
 *
 * The overflow menu (connected) offers: Try in Copilot · Share · View details.
 *
 * Prefix: --c-skill-card-cowork-{property}
 *
 * Figma: Connector-Skills — plugin L2 (nodes 45:172759 rest, 45:172992 connected).
 */

// ─── Row Container ──────────────────────────────────────────

export const skillCardCoworkContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  /** Surface — white, subtle 1px stroke */
  background: '#ffffff',
  border: '1px solid #dedede',
  /** Corner radius — base-300 (12px) */
  borderRadius: '12px',
  /** Padding — 12 block / 16 inline */
  padding: '12px 16px',
  hoverBackground: '#fcfcfc',
} as const;

// ─── List (stack) ───────────────────────────────────────────

export const skillCardCoworkList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
} as const;

// ─── Icon ───────────────────────────────────────────────────

export const skillCardCoworkIcon = {
  width: '20px',
  height: '20px',
  flexShrink: '0',
  color: '#242424',
  /** Aligns to the first text line for multi-line rows */
  alignSelf: 'flex-start',
} as const;

/**
 * Icon tile — used on the Customize › Skills page (Figma 45:172574): a 38px
 * white, 12px-radius tile holding the source plugin's 20px logo (or a generic
 * glyph for built-in skills), so each card reads back to its plugin.
 */
export const skillCardCoworkIconTile = {
  width: '38px',
  height: '38px',
  borderRadius: '12px',
  background: '#ffffff',
  glyphSize: '20px',
} as const;

// ─── Text ───────────────────────────────────────────────────

export const skillCardCoworkText = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: '0',
  flex: '1',
} as const;

/** Skill name — Functional Body Medium Strong (14 / 20, semibold). */
export const skillCardCoworkName = {
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '600',
  color: '#242424',
} as const;

/** Description — Functional Body Small (12 / 16, secondary). */
export const skillCardCoworkDesc = {
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: '400',
  color: '#5d5d5d',
} as const;

// ─── Trailing (state-dependent) ─────────────────────────────

/** Not connected → chevron-right; connected → overflow (⋮, More Vertical). */
export const skillCardCoworkTrailing = {
  size: '20px',
  color: '#6f6f6f',
  chevronIcon: 'chevron-right-20-regular',
  overflowIcon: 'more-vertical-20-regular',
} as const;

/** Overflow menu items (connected). */
export const skillCardCoworkMenu = {
  items: ['Try in Copilot', 'Share', 'View details'],
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const skillCardCowork = {
  container: skillCardCoworkContainer,
  list: skillCardCoworkList,
  icon: skillCardCoworkIcon,
  iconTile: skillCardCoworkIconTile,
  text: skillCardCoworkText,
  name: skillCardCoworkName,
  desc: skillCardCoworkDesc,
  trailing: skillCardCoworkTrailing,
  menu: skillCardCoworkMenu,
} as const;
