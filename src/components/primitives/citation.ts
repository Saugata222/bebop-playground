/**
 * Component: Citation
 *
 * One Copilot / Bebop Design System — Inline indicator that marks where a
 * referenced source appears within a response. Acts as an entry point into a
 * Citation Preview (hover card) or the full References panel.
 *
 * Aligned to One Copilot; styling maps 1:1 onto Bebop foundations (subtle
 * neutral backplate, functional caption type, circular radius, atomic spacing).
 *
 * Anatomy — two variants:
 *   ┌───────────┐   ┌──────────────────┐
 *   │ [icn] +N  │   │  Source name +N  │
 *   └───────────┘   └──────────────────┘
 *      Work                 Web
 *
 *   Work — leading 16px product / app icon (Excel, Word, PowerPoint, connector)
 *   Web  — leading source-name text (e.g. "Yahoo News"), truncated at 80px
 *   Both may carry a trailing "+N" overflow count when several sources collapse.
 *
 * Properties:
 *   Variant:   Work | Web
 *   Selected:  false (subtle backplate) | true (heavy/inverted backplate)
 *   Theme:     Light | Dark (backplate + foreground adapt to the surface)
 *
 * Selected inverts the pill: on a light surface it fills heavy #242424 with
 * white text; on a dark surface it fills white with #242424 text.
 *
 * Prefix: --c-citation-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Citation (node 3992:126696)
 */

// ─── Shared Shape ───────────────────────────────────────────

export const citationShape = {
  /** Minimum pill height (all variants) */
  minHeight: '24px',
  /** Inline padding — --gnrc-spacing-component-base-200 (8px) */
  paddingInline: '8px',
  /** Block padding — --gnrc-spacing-component-base-100 (4px) */
  paddingBlock: '4px',
  /** Gap between mark/label and overflow — --gnrc-spacing-component-base-50 (2px) */
  gap: '2px',
  /** Circular pill — --gnrc-border-radius-circular */
  borderRadius: '9999px',
  /** Leading product / app mark size (Work) */
  iconSize: '16px',
  /** Max source-name width before ellipsis (Web) */
  labelMaxWidth: '80px',
} as const;

// ─── Variant — Work (leading product icon) ──────────────────

export const citationVariantWork = {
  /** Leading mark size */
  iconSize: '16px',
} as const;

// ─── Variant — Web (leading source name) ────────────────────

export const citationVariantWeb = {
  /** Max label width before ellipsis */
  labelMaxWidth: '80px',
} as const;

// ─── Overflow "+N" ──────────────────────────────────────────

export const citationOverflow = {
  /** Functional caption — 10px */
  fontSize: '10px',
  /** Line height — --gnrc-line-height-functional-caption (14px) */
  lineHeight: '14px',
  /** Regular weight */
  fontWeight: '420',
} as const;

// ─── Theme — Light surface ──────────────────────────────────

export const citationThemeLight = {
  /** Rest backplate — --gnrc-color-background-neutral-subtle */
  backgroundRest: '#f2f2f2',
  /** Rest foreground — --gnrc-color-foreground-neutral-secondary */
  colorRest: '#5d5d5d',
  /** Selected backplate — --gnrc-color-background-neutral-heavy */
  backgroundSelected: '#242424',
  /** Selected foreground — --gnrc-color-foreground-neutral-onloud */
  colorSelected: '#ffffff',
} as const;

// ─── Theme — Dark surface ───────────────────────────────────

export const citationThemeDark = {
  /** Rest backplate — --gnrc-color-background-neutral-subtle (dark) */
  backgroundRest: '#2e2e2e',
  /** Rest foreground — --gnrc-color-foreground-neutral-secondary (dark) */
  colorRest: '#aeaeae',
  /** Selected backplate — --gnrc-color-background-neutral-heavy (dark → white) */
  backgroundSelected: '#ffffff',
  /** Selected foreground — --gnrc-color-foreground-neutral-onloud (dark → dark) */
  colorSelected: '#242424',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const citationTypography = {
  /** Family — --gnrc-font-family-functional */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  /** Functional caption — 10px */
  fontSize: '10px',
  /** Line height — 14px */
  lineHeight: '14px',
  /** Letter spacing */
  letterSpacing: '0px',
  /** Regular weight */
  fontWeight: '420',
  /** Variable-font axes */
  variation: "'opsz' 8, 'wght' 420",
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const citation = {
  shape: citationShape,
  variant: {
    work: citationVariantWork,
    web: citationVariantWeb,
  },
  overflow: citationOverflow,
  theme: {
    light: citationThemeLight,
    dark: citationThemeDark,
  },
  typography: citationTypography,
} as const;
