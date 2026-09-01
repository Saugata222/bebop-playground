/**
 * Compound: Attachment Pill
 *
 * One Copilot / Bebop Design System — Attachment chip for the composer.
 *
 * Attachments are inserted from upload, OneDrive/Business, and CiQ menu with
 * files, emails, meetings, chats, people, sites, channels, connector entities,
 * context grounding, and an uploading (in-progress) state. Each pill shows a
 * leading type glyph (filetype color icon, Fluent line icon, or circular
 * avatar), a name with an optional secondary line, and a trailing chevron.
 *
 * Composed from primitives (reuse-first):
 *   • avatar        → people / company / connector-entity leading glyph (circular)
 *   • Fluent icons  → filetype (word/excel color) + type line icons + chevron
 *
 * Missing icon assets to add for full fidelity (not primitives):
 *   calendar-20, mail-20, channel-20, people-20, text-quote-20, a spinner, and
 *   ppt/sharepoint color filetypes. Uses document-20 as the fallback glyph.
 *
 * Anatomy (left → right):
 *   Leading glyph  — 20px filetype/line icon, or 32px circular avatar/entity
 *   Text stack     — Name (body-medium) over optional Secondary (body-small)
 *   Trailing       — chevron-down dropdown button (dismiss on hover/remove)
 *
 * Properties:
 *   Type:       File | Email | Meeting | Chat | Person | Site | Channel |
 *               Connector entity | Context grounding | Image | Uploading
 *   Secondary:  present | none
 *   Theme:      Light | Dark
 *
 * Prefix: --p-attachment-pill-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Attachment pills (node 4175:67840)
 */

// ─── Container ──────────────────────────────────────────────

export const attachmentPillContainer = {
  /** Surface — --gnrc-color-surface-neutral-near */
  background: '#fcfcfc',
  /** Border — --gnrc-stroke-width-thin + --gnrc-color-stroke-neutral-subtle */
  border: '1px solid #dedede',
  /** Corner radius — Atomic/Large (--gnrc-border-radius-base-400, 16px) */
  borderRadius: '16px',
  /** Padding — Padding/Regular/Medium (8px) */
  padding: '8px',
  /** Gap between glyph, text, trailing — Gap/Atomic/Large (8px) */
  gap: '8px',
  /** Minimum row height */
  minHeight: '58px',
  /** Max pill width */
  maxWidth: '186px',
} as const;

// ─── Leading Glyph ──────────────────────────────────────────

export const attachmentPillGlyph = {
  /** Bare filetype / line icon size */
  iconSize: '20px',
  /** Entity/avatar container — circular 32px chip */
  entitySize: '32px',
  /** Entity container background — --gnrc-color-background-brand-subtle */
  entityBackground: '#f5f5f5',
  /** Entity container radius — --gnrc-border-radius-circular */
  entityRadius: '9999px',
  /** Entity inner icon size */
  entityIconSize: '20px',
} as const;

// ─── Text Stack ─────────────────────────────────────────────

export const attachmentPillText = {
  /** Gap between name and secondary — 2px */
  gap: '2px',
  /** Truncation width */
  maxWidth: '120px',
  /** Family — --gnrc-font-family-functional (Segoe Sans) */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
} as const;

export const attachmentPillName = {
  /** Functional Body Medium — 14px / 20px */
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '420',
  letterSpacing: '0px',
  /** Color — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

export const attachmentPillSecondary = {
  /** Functional Body Small — 12px / 16px */
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: '420',
  letterSpacing: '0px',
  /** Color — --gnrc-color-foreground-neutral-tertiary */
  color: '#6f6f6f',
} as const;

// ─── Trailing (chevron / dismiss) ───────────────────────────

export const attachmentPillTrailing = {
  /** Transparent surface — --gnrc-color-background-neutral-transparent */
  background: 'rgba(36,36,36,0)',
  /** Padding — --gnrc-spacing-component-base-100 (4px) */
  padding: '4px',
  /** Circular — --gnrc-border-radius-circular */
  borderRadius: '9999px',
  /** Icon size (chevron-down / dismiss) */
  iconSize: '20px',
  /** Icon color — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
  /** Hover surface */
  backgroundHover: 'rgba(24,24,24,0.04)',
} as const;

// ─── Dark Theme ─────────────────────────────────────────────

export const attachmentPillThemeDark = {
  /** Cell surround — neutral-heavy */
  cell: '#242424',
  /** Pill surface on dark */
  background: '#2b2b2b',
  /** Pill border on dark */
  border: '1px solid #484848',
  /** Entity container on dark */
  entityBackground: '#3b3b3b',
  /** Name on dark */
  name: '#ffffff',
  /** Secondary on dark */
  secondary: '#adadad',
  /** Trailing icon on dark */
  trailing: '#ffffff',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const attachmentPill = {
  container: attachmentPillContainer,
  glyph: attachmentPillGlyph,
  text: attachmentPillText,
  name: attachmentPillName,
  secondary: attachmentPillSecondary,
  trailing: attachmentPillTrailing,
  themeDark: attachmentPillThemeDark,
} as const;
