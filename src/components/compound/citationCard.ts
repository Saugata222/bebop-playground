/**
 * Component: CitationCard (popover)
 *
 * Bebop Design System — Citation source popover card.
 *
 * A floating popover card that expands from an inline citation chip.
 * Shows one or more source list items with file icon, title, metadata,
 * optional excerpt body, and an "Ask about this" action.
 *
 * Anatomy:
 *   Surface      — white card, elevation shadow, 16px radius
 *   ListItem     — icon + title row + metadata + optional body + optional footer
 *     TypeIcon   — 16px file-type icon (Word, Excel, Web, Meeting, Email, etc.)
 *     Title      — body-large text, truncated to one line
 *     HoverActions — shield + icon buttons, visible on hover
 *     Metadata   — 12px secondary — "Author modified X days ago"
 *     Body       — 12px secondary — excerpt/quote text
 *     Footer     — outline "Ask about this" button
 *   ScrollOverlay — gradient fade at bottom when list overflows
 *
 * Variants:
 *   Single — one list item, includes body excerpt + footer button
 *   Multi  — multiple list items, scrollable with fade overlay
 *
 * States:
 *   Rest  — hover actions hidden (opacity-0)
 *   Hover — hover actions visible (opacity-1)
 *
 * Prefix: --c-citation-card-{property}
 */

// ─── Surface Tokens ─────────────────────────────────────────

export const citationCardSurface = {
  /** Width — fixed */
  width: '320px',
  /** Background — white */
  background: '#ffffff',
  /** Border radius — composite/medium (16px) */
  borderRadius: '16px',
  /** Padding — regular/medium (8px) */
  padding: '8px',
  /** Elevation 3 — standard ambient shadow */
  boxShadow: '0px 3px 12px 0px rgba(0, 0, 0, 0.18)',
  /** Max height before scroll kicks in */
  maxHeight: '292px',
  /** Overflow hidden to respect border-radius */
  overflow: 'hidden',
} as const;

// ─── List Item Tokens ────────────────────────────────────────

export const citationCardItem = {
  /** Padding around each list item — atomic/large (8px) */
  padding: '8px',
  /** Gap between header row and metadata/body — atomic/xsmall (2px) */
  gapInner: '2px',
  /** Gap between metadata and body sections — composite/small (8px) */
  gapSections: '8px',
} as const;

// ─── Icon Tokens ────────────────────────────────────────────

export const citationCardIcon = {
  /** File-type icon size */
  size: '16px',
  /** Vertical padding to align with title baseline */
  paddingBlock: '6px',
} as const;

// ─── Title Tokens ────────────────────────────────────────────

export const citationCardTitle = {
  /** Body-large font size (16px) */
  fontSize: 'var(--f-typography-fontSize-16)',
  /** Regular weight */
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  /** Line height */
  lineHeight: '1.4',
  /** Primary foreground */
  color: '#242424',
  /** Gap between icon and title — atomic/large (8px) */
  iconGap: '8px',
  /** Truncate to single line */
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
} as const;

// ─── Hover Actions Tokens ────────────────────────────────────

export const citationCardHoverActions = {
  /** Hidden at rest */
  opacityRest: '0',
  /** Visible on hover */
  opacityHover: '1',
  /** Gap between action buttons — atomic/small (4px) */
  gap: '4px',
  /** Vertical padding */
  paddingBlock: '2px',
} as const;

// ─── Metadata Tokens ─────────────────────────────────────────

export const citationCardMetadata = {
  /** Body-small font size (12px) */
  fontSize: 'var(--f-typography-fontSize-12)',
  /** Regular weight */
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  /** Line height */
  lineHeight: '1.4',
  /** Secondary foreground */
  color: '#5d5d5d',
  /** Left indent to align under title (past icon + gap) */
  paddingLeft: '24px',
} as const;

// ─── Body Tokens ─────────────────────────────────────────────

export const citationCardBody = {
  /** Body-small font size (12px) */
  fontSize: 'var(--f-typography-fontSize-12)',
  /** Regular weight */
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  /** Line height */
  lineHeight: '1.4',
  /** Secondary foreground */
  color: '#5d5d5d',
  /** Left indent to align under title (past icon + gap) */
  paddingLeft: '24px',
} as const;

// ─── Footer Tokens ────────────────────────────────────────────

export const citationCardFooter = {
  /** Top padding above footer button — atomic/large (8px) */
  paddingTop: '8px',
  /** Left indent to align under title */
  paddingLeft: '24px',
} as const;

// ─── Scroll Overlay Tokens ────────────────────────────────────

export const citationCardScrollOverlay = {
  /** Gradient height */
  height: '40px',
  /** Fade from transparent white to solid white */
  background: 'linear-gradient(to bottom, rgba(255,255,255,0), #ffffff)',
  /** Gradient covers 75% of its own height */
  backgroundSize: '100% 100%',
} as const;

// ─── List Divider ─────────────────────────────────────────────

export const citationCardDivider = {
  /** 1px hairline between list items */
  height: '1px',
  background: '#ebebeb',
  marginInline: '8px',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const citationCardTypography = {
  fontFamily: 'var(--f-typography-fontFamily-body)',
  letterSpacing: '0px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const citationCard = {
  surface: citationCardSurface,
  item: citationCardItem,
  icon: citationCardIcon,
  title: citationCardTitle,
  hoverActions: citationCardHoverActions,
  metadata: citationCardMetadata,
  body: citationCardBody,
  footer: citationCardFooter,
  scrollOverlay: citationCardScrollOverlay,
  divider: citationCardDivider,
  typography: citationCardTypography,
} as const;
