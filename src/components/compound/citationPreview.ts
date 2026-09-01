/**
 * Component: Citation Preview
 *
 * One Copilot / Bebop Design System — Floating hover card that surfaces a brief
 * in-line glimpse of referenced source material (source name, headline, and
 * link) without interrupting reading flow. Anchored to a Citation pill; lets a
 * reader assess what the model reasoned over without leaving the response.
 *
 * Composes the One Copilot primitives: a `button` (icon-only "more" action) per
 * reference row. Styling maps 1:1 onto Bebop foundations (white surface,
 * Shadow/High elevation, functional body type, atomic radius/spacing).
 *
 * Anatomy:
 *   Card (surface)          — white, 8px inset, radius 24, Shadow/High, 304px
 *   └─ References list item (repeated)
 *        Header  — favicon (16, radius 4) + source name + hover "more" button
 *        Headline— body-medium primary (the article title, up to 2 lines)
 *        URL     — body-small secondary, truncated
 *
 * The active/hovered row carries a subtle rgba(24,24,24,0.04) backplate; the
 * "more" button only appears on the active row.
 *
 * Prefix: --c-citation-preview-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Citation preview (node 3992:124587)
 */

// ─── Card Surface ───────────────────────────────────────────

export const citationPreviewSurface = {
  /** Background — --gnrc-color-surface-neutral-nearer (white) */
  background: '#ffffff',
  /** Inset padding — --gnrc-spacing-component-base-200 (8px) */
  padding: '8px',
  /** Corner radius — --gnrc-border-radius-base-600 (24px) */
  borderRadius: '24px',
  /** Fixed width */
  width: '304px',
  /** Max height before internal scroll */
  maxHeight: '292px',
  /** Elevation — Shadow/High (contour + standard ambient + key) */
  boxShadow:
    '0 0 1px 0 rgba(0,0,0,0.08), 0 4px 8px 0 rgba(0,0,0,0.03), 0 8px 12px 0 rgba(0,0,0,0.08)',
} as const;

// ─── Reference List Item ────────────────────────────────────

export const citationPreviewItem = {
  /** Row padding — --gnrc-spacing-component-base-200 (8px) */
  padding: '8px',
  /** Vertical gap between header / headline / url — base-150 (6px) */
  gap: '6px',
  /** Corner radius — --gnrc-border-radius-base-400 (16px) */
  borderRadius: '16px',
  /** Rest backplate — transparent */
  backgroundRest: 'rgba(36,36,36,0)',
  /** Active / hover backplate — 4% neutral overlay */
  backgroundActive: 'rgba(24,24,24,0.04)',
} as const;

// ─── Header (favicon + source + more) ───────────────────────

export const citationPreviewHeader = {
  /** Gap between favicon, source name and actions — base-200 (8px) */
  gap: '8px',
  /** Favicon size */
  faviconSize: '16px',
  /** Favicon corner radius — --gnrc-border-radius-base-100 (4px) */
  faviconRadius: '4px',
  /** Favicon vertical padding wrapper — base-100 (4px) */
  faviconPaddingBlock: '4px',
  /** "More" button icon size */
  moreIconSize: '20px',
  /** "More" button padding — base-100 (4px) */
  morePadding: '4px',
} as const;

// ─── Source Name ────────────────────────────────────────────

export const citationPreviewSource = {
  /** Functional Body Small — 12px */
  fontSize: '12px',
  /** Line height — 16px */
  lineHeight: '16px',
  /** Regular weight */
  fontWeight: '420',
  /** Variable-font axes */
  variation: "'opsz' 8, 'wght' 420",
  /** Color — --gnrc-color-foreground-neutral-secondary */
  color: '#5d5d5d',
} as const;

// ─── Headline (article title) ───────────────────────────────

export const citationPreviewHeadline = {
  /** Functional Body Medium — 14px */
  fontSize: '14px',
  /** Line height — 20px */
  lineHeight: '20px',
  /** Regular weight */
  fontWeight: '420',
  /** Variable-font axes */
  variation: "'opsz' 8, 'wght' 420",
  /** Color — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
  /** Clamp to two lines */
  maxLines: '2',
} as const;

// ─── URL ────────────────────────────────────────────────────

export const citationPreviewUrl = {
  /** Functional Body Small — 12px */
  fontSize: '12px',
  /** Line height — 16px */
  lineHeight: '16px',
  /** Regular weight */
  fontWeight: '420',
  /** Variable-font axes */
  variation: "'opsz' 8, 'wght' 420",
  /** Color — --gnrc-color-foreground-neutral-secondary */
  color: '#5d5d5d',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const citationPreview = {
  surface: citationPreviewSurface,
  item: citationPreviewItem,
  header: citationPreviewHeader,
  source: citationPreviewSource,
  headline: citationPreviewHeadline,
  url: citationPreviewUrl,
} as const;
