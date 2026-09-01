/**
 * Component: Skill Attachment
 *
 * One Copilot / Connector Skills — a chip that represents a connector skill
 * attached to the prompt box. Added when a user selects a "/skill" from a
 * source's skills list (Change sources → source L2). Sits above the composer
 * textarea as a removable attachment.
 *
 * Anatomy:
 *   1. Chip — 186×58 rounded card, white surface, 1px subtle stroke, radius 16
 *   2. Icon — 32px circular background-brand-subtle (#f5f5f5) holding the 20px
 *      Fluent "Script" glyph
 *   3. Meta — two lines: name (/skill, Functional Body Medium Strong, truncated)
 *      + description (Functional Body Small, secondary, truncated)
 *   4. Dismiss — 12px Fluent Dismiss glyph, top-right, removes the attachment
 *
 * Prefix: --c-skillAttachment-{property}
 *
 * Figma: Connector-Skills — Attachment (node 29:30041); in-composer variant
 * (node 29:30145).
 */

// ─── Chip ───────────────────────────────────────────────────

export const skillAttachmentChip = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  /** --gnrc-spacing-gap-atomic-large */
  gap: '8px',
  /** Fixed component width; text truncates within */
  width: '186px',
  height: '58px',
  /** --padding/regular/medium */
  padding: '8px',
  /** Space for the top-right dismiss */
  paddingRight: '26px',
  background: '#ffffff',
  /** 1px --gnrc-color-stroke-neutral-subtle */
  border: '1px solid #dedede',
  /** --gnrc-border-radius-atomic-large */
  borderRadius: '16px',
} as const;

// ─── Icon ───────────────────────────────────────────────────

export const skillAttachmentIcon = {
  width: '32px',
  height: '32px',
  /** --gnrc-border-radius-circular */
  borderRadius: '9999px',
  /** --gnrc-color-background-brand-subtle */
  background: '#f5f5f5',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  /** --gnrc-color-foreground-neutral-secondary */
  color: '#616161',
  glyphSize: '20px',
  flexShrink: 0,
} as const;

// ─── Meta ───────────────────────────────────────────────────

export const skillAttachmentMeta = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: 0,
} as const;

/** Functional/Body Medium Strong */
export const skillAttachmentName = {
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 600,
  fontVariationSettings: "'opsz' 8, 'wght' 600",
  color: '#242424',
  maxWidth: '120px',
  truncate: true,
} as const;

/** Functional/Body Small — secondary */
export const skillAttachmentDescription = {
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 420,
  color: '#5d5d5d',
  maxWidth: '120px',
  truncate: true,
} as const;

// ─── Dismiss ────────────────────────────────────────────────

export const skillAttachmentDismiss = {
  position: 'absolute',
  top: '6px',
  right: '6px',
  width: '16px',
  height: '16px',
  padding: 0,
  border: 'none',
  background: 'none',
  borderRadius: '4px',
  color: '#616161',
  cursor: 'pointer',
  /** Fluent Dismiss 12 */
  glyphSize: '12px',
  backgroundHover: 'rgba(36, 36, 36, 0.06)',
  colorHover: '#242424',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const skillAttachment = {
  chip: skillAttachmentChip,
  icon: skillAttachmentIcon,
  meta: skillAttachmentMeta,
  name: skillAttachmentName,
  description: skillAttachmentDescription,
  dismiss: skillAttachmentDismiss,
} as const;
