/**
 * Compound: Attachment Overflow Menu
 *
 * One Copilot / Bebop Design System — Popover listing all composer attachments.
 *
 * Appears when clicking the overflow attachment pill. A titled Popover surface
 * ("Attachments" + dismiss) lists every attachment as a row: leading type glyph
 * (filetype color icon / Fluent line icon / circular avatar), name + secondary,
 * and a trailing Remove button.
 *
 * Composed from primitives (reuse-first):
 *   • popover     → the elevated surface (Shadow/Highest, radius 16)
 *   • button      → dismiss (icon-only subtle) + Remove (outline, per row)
 *   • menuListItem → the row layout (leading glyph + name/secondary)
 *   • avatar      → person rows
 *   • Fluent icons → filetype color icons (word/excel/powerpoint) + dismiss
 *
 * Missing icon assets (fallback to document-20): calendar-20, mail-20.
 *
 * Anatomy (top → bottom):
 *   Header  — "Attachments" subtitle + dismiss button
 *   List    — attachment rows (glyph + name/secondary + Remove)
 *
 * Properties:
 *   Theme:  Light | Dark
 *
 * Prefix: --p-attachment-menu-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Attachment overflow menu (node 24632:20936)
 */

// ─── Surface ────────────────────────────────────────────────

export const attachmentMenuSurface = {
  /** Width */
  width: '480px',
  /** Surface — --gnrc-color-surface-neutral-nearer */
  background: '#ffffff',
  /** Border — thin transparent */
  border: '1px solid rgba(36,36,36,0)',
  /** Corner radius — --gnrc-border-radius-base-400 (16px) */
  borderRadius: '16px',
  /** Inset padding — --gnrc-spacing-component-base-200 (8px) */
  padding: '8px',
  /** Elevation — Shadow/Highest (contour + elevated ambient + key) */
  boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.08), 0px 8px 16px 0px rgba(0,0,0,0.03), 0px 32px 48px 0px rgba(0,0,0,0.08)',
} as const;

// ─── Header ─────────────────────────────────────────────────

export const attachmentMenuHeader = {
  /** Title — Functional/Subtitle (Segoe Sans 20 / 28 / 600) */
  titleFontSize: '20px',
  titleLineHeight: '28px',
  titleFontWeight: '600',
  titleLetterSpacing: '-0.15px',
  /** Title color — --gnrc-color-foreground-neutral-primary */
  titleColor: '#242424',
  /** Header padding */
  padding: '12px 12px 8px',
  /** Dismiss button icon size */
  dismissIconSize: '20px',
  /** Dismiss color — --gnrc-color-foreground-neutral-primary */
  dismissColor: '#242424',
  /** Dismiss hover surface */
  dismissBackgroundHover: 'rgba(24,24,24,0.04)',
} as const;

// ─── Row ────────────────────────────────────────────────────

export const attachmentMenuRow = {
  /** Gap between glyph, text, and Remove — base-300 (12px) */
  gap: '12px',
  /** Inline padding — base-300 (12px) */
  paddingInline: '12px',
  /** Block padding — base-200 (8px) */
  paddingBlock: '8px',
  /** Corner radius on hover — base-200 (8px) */
  borderRadius: '8px',
  /** Hover surface */
  backgroundHover: 'rgba(24,24,24,0.04)',
  /** Leading glyph size */
  glyphSize: '20px',
  /** Avatar / entity size */
  avatarSize: '32px',
} as const;

// ─── Row Text ───────────────────────────────────────────────

export const attachmentMenuText = {
  /** Family — --gnrc-font-family-functional (Segoe Sans) */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  /** Name — Functional Body Medium (14 / 20) */
  nameFontSize: '14px',
  nameLineHeight: '20px',
  nameFontWeight: '420',
  /** Name color — --gnrc-color-foreground-neutral-primary */
  nameColor: '#242424',
  /** Secondary — Functional Body Small (12 / 16) */
  secondaryFontSize: '12px',
  secondaryLineHeight: '16px',
  secondaryFontWeight: '420',
  /** Secondary color — --gnrc-color-foreground-neutral-secondary */
  secondaryColor: '#5d5d5d',
} as const;

// ─── Remove Button (reuses button — outline) ────────────────

export const attachmentMenuRemove = {
  /** Outline surface */
  background: 'transparent',
  /** Outline border — --gnrc-color-stroke-neutral-subtle */
  border: '1px solid #dedede',
  /** Corner radius — base-300 (12px) */
  borderRadius: '12px',
  /** Padding */
  padding: '6px 12px',
  /** Label — Functional Body Medium (14 / 20) */
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '420',
  /** Label color — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
  /** Hover surface */
  backgroundHover: 'rgba(24,24,24,0.04)',
} as const;

// ─── Dark Theme ─────────────────────────────────────────────

export const attachmentMenuThemeDark = {
  /** Cell surround */
  cell: '#242424',
  /** Surface on dark */
  background: '#292929',
  /** Border on dark */
  border: '1px solid #484848',
  /** Title / name on dark */
  title: '#ffffff',
  name: '#ffffff',
  /** Secondary on dark */
  secondary: '#adadad',
  /** Remove border on dark */
  removeBorder: '#5a5a5a',
  /** Remove label / dismiss on dark */
  onDark: '#ffffff',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const attachmentMenu = {
  surface: attachmentMenuSurface,
  header: attachmentMenuHeader,
  row: attachmentMenuRow,
  text: attachmentMenuText,
  remove: attachmentMenuRemove,
  themeDark: attachmentMenuThemeDark,
} as const;
