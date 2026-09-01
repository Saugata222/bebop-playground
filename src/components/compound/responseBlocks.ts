/**
 * Component: Response Blocks
 *
 * One Copilot / Bebop Design System — The text (and content) blocks used to
 * construct a response. There are various blocks to represent different
 * information; they're built with spacings depending on the typography scale.
 *
 * This is the content type system that governs how responses are built. Values
 * are the exact One Copilot content variables (--gnrc-*), captured from Figma.
 *
 * Font families (exact):
 *   Content   — Segoe Sans   (--gnrc-font-family-content)
 *   Editorial — Georgia Var  (--gnrc-font-family-content-editorial)   → quotes
 *   Code      — Consolas     (--gnrc-font-family-content-code)
 *
 * Content font weights (exact):
 *   Regular 420 · Medium 550 (headings) · Bold 625 (strong)
 *
 * Block inventory:
 *   Headings H1–H5 · Subheadline · Subtext · Paragraph L/M/S (+Strong +Link)
 *   List · Divider · Quote (editorial) · Table · Code
 *
 * Prefix: --c-response-block-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Response Blocks (node 4136:159976)
 */

// ─── Font Families ──────────────────────────────────────────

export const responseBlocksFont = {
  /** --gnrc-font-family-content */
  content: "'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif",
  /** --gnrc-font-family-content-editorial (Georgia Var) */
  editorial: "'Georgia Pro', Georgia, 'Times New Roman', serif",
  /** --gnrc-font-family-content-code (Consolas) */
  code: "'Consolas', 'Cascadia Code', 'SF Mono', ui-monospace, monospace",
  /** Weights */
  weightRegular: '420',
  weightMedium: '550',
  weightBold: '625',
} as const;

// ─── Foreground ─────────────────────────────────────────────

export const responseBlocksColor = {
  /** --gnrc-color-foreground-neutral-primary */
  primary: '#242424',
  /** --gnrc-color-foreground-neutral-secondary */
  secondary: '#5d5d5d',
  /** Dark theme primary */
  primaryDark: '#ededed',
  /** Dark theme secondary */
  secondaryDark: '#adadad',
} as const;

// ─── Headings (Segoe Sans, weight 550, ls -0.15) ────────────

export const responseBlocksHeading = {
  /** Content H1 — 36 / 44 */
  h1: { fontSize: '36px', lineHeight: '44px', fontWeight: '550', letterSpacing: '-0.15px' },
  /** Content H2 — 32 / 38 */
  h2: { fontSize: '32px', lineHeight: '38px', fontWeight: '550', letterSpacing: '-0.15px' },
  /** Content H3 — 28 / 34 */
  h3: { fontSize: '28px', lineHeight: '34px', fontWeight: '550', letterSpacing: '-0.15px' },
  /** Content H4 — 24 / 28 */
  h4: { fontSize: '24px', lineHeight: '28px', fontWeight: '550', letterSpacing: '-0.15px' },
  /** Content H5 — 20 / 24 */
  h5: { fontSize: '20px', lineHeight: '24px', fontWeight: '550', letterSpacing: '-0.15px' },
} as const;

// ─── Subheadline / Subtext ──────────────────────────────────

export const responseBlocksSubheadline = {
  /** Content Subheadline — 16 / 22, regular */
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: '420',
  letterSpacing: '0px',
} as const;

export const responseBlocksSubtext = {
  /** Content Subtext — 10 / 14, regular, secondary */
  fontSize: '10px',
  lineHeight: '14px',
  fontWeight: '420',
  letterSpacing: '0px',
} as const;

// ─── Paragraphs (Segoe Sans) ────────────────────────────────

export const responseBlocksParagraph = {
  /** Paragraph Large — 20 / 34 */
  large:       { fontSize: '20px', lineHeight: '34px', fontWeight: '420', letterSpacing: '0px' },
  largeStrong: { fontSize: '20px', lineHeight: '34px', fontWeight: '625', letterSpacing: '0px' },
  /** Paragraph Medium — 16 / 28 (the default response body) */
  medium:       { fontSize: '16px', lineHeight: '28px', fontWeight: '420', letterSpacing: '0px' },
  mediumStrong: { fontSize: '16px', lineHeight: '28px', fontWeight: '625', letterSpacing: '0px' },
  /** Paragraph Small — 12 / 20 */
  small:       { fontSize: '12px', lineHeight: '20px', fontWeight: '420', letterSpacing: '0px' },
  smallStrong: { fontSize: '12px', lineHeight: '20px', fontWeight: '625', letterSpacing: '0px' },
} as const;

// ─── Links (content, underlined) ────────────────────────────

export const responseBlocksLink = {
  /** Link color — primary, underlined; strong variants use weight 625 */
  color: '#242424',
  colorDark: '#ededed',
  textDecoration: 'underline',
  /** Underline offset for readability */
  underlineOffset: '2px',
} as const;

// ─── List ───────────────────────────────────────────────────

export const responseBlocksList = {
  /** Item type — paragraph medium */
  fontSize: '16px',
  lineHeight: '28px',
  fontWeight: '420',
  /** Marker → item gap */
  markerGap: '8px',
  /** Vertical gap between items */
  itemGap: '4px',
  /** Left indent */
  indent: '20px',
} as const;

// ─── Divider block ──────────────────────────────────────────

export const responseBlocksDivider = {
  /** Line color — --gnrc-color-stroke-neutral-subtle */
  color: 'rgba(189,189,189,0.5)',
  /** Thickness */
  thickness: '1px',
} as const;

// ─── Quote block (editorial, Georgia) ───────────────────────

export const responseBlocksQuote = {
  /** Family — editorial (Georgia Var) */
  fontFamily: "'Georgia Pro', Georgia, 'Times New Roman', serif",
  /** Content Editorial Expressive Small — 28 / 34 */
  fontSize: '28px',
  lineHeight: '34px',
  fontWeight: '420',
  letterSpacing: '-0.15px',
  /** Centered with a leading quote mark */
  textAlign: 'center',
  /** Quote mark color */
  markColor: '#242424',
} as const;

// ─── Table block (Segoe Sans) ───────────────────────────────

export const responseBlocksTable = {
  /** Content Table — 16 / 22 */
  fontSize: '16px',
  lineHeight: '22px',
  /** Body weight / header weight */
  fontWeight: '420',
  headerFontWeight: '625',
  /** Row divider — stroke subtle */
  borderColor: 'rgba(189,189,189,0.5)',
  borderWidth: '1px',
  /** Cell padding — regular/large 12 × tight/large 10 */
  cellPaddingInline: '12px',
  cellPaddingBlock: '10px',
} as const;

// ─── Code block (Consolas) ──────────────────────────────────

export const responseBlocksCode = {
  /** Family — content code (Consolas) */
  fontFamily: "'Consolas', 'Cascadia Code', 'SF Mono', ui-monospace, monospace",
  /** Content Code — 16 / 22 */
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: '420',
  /** Surface — --gnrc-color-background-neutral-subtle */
  background: '#f5f5f5',
  /** Corner radius — --gnrc-border-radius-base-400 (16px) */
  borderRadius: '16px',
  /** Padding */
  padding: '16px',
} as const;

// ─── Block Layout ───────────────────────────────────────────

export const responseBlocksLayout = {
  /** Response column width */
  width: '720px',
  /** Vertical gap between blocks — --gnrc-spacing-layout-base-200 (16px) */
  blockGap: '16px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const responseBlocks = {
  font: responseBlocksFont,
  color: responseBlocksColor,
  heading: responseBlocksHeading,
  subheadline: responseBlocksSubheadline,
  subtext: responseBlocksSubtext,
  paragraph: responseBlocksParagraph,
  link: responseBlocksLink,
  list: responseBlocksList,
  divider: responseBlocksDivider,
  quote: responseBlocksQuote,
  table: responseBlocksTable,
  code: responseBlocksCode,
  layout: responseBlocksLayout,
} as const;
