/**
 * Component: Banner
 *
 * One Copilot Design System — Contextual banner surface (Light + Dark).
 *
 * A rounded surface that presents a message (title + body) with optional
 * leading image or icon and up to two actions plus a dismiss. Restyle of the
 * bebop banner to the One Copilot spec; composes the Button primitive for CTAs.
 *
 * Anatomy:
 *   Container (radius 24, 1px border, 16px padding, 12px row gap)
 *     [ Image 60×60 | Icon 40×40 ]?  →  Main
 *       Header + Body (title 14/20 semibold, body 14/20 regular)
 *       Buttons (Secondary? · Primary · Dismiss) — 20px from text, 4px between
 *
 * Themes:
 *   Light — bg #ffffff, border #dedede, title #242424, body #242424
 *   Dark  — bg #292929, border #484848, title #fffbf8, body #dedede
 *
 * Prefix: --c-banner-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Banner (node 4020:1566)
 */

// ─── Container ──────────────────────────────────────────────

export const bannerContainer = {
  /** --gnrc-border-radius-base-600 */
  borderRadius: '24px',
  /** --gnrc-stroke-width-thin */
  borderWidth: '1px',
  /** --gnrc-spacing-component-base-400 */
  padding: '16px',
  /** Lead ↔ main gap — --gnrc-spacing-component-base-300 */
  rowGap: '12px',
  /** Max width */
  maxWidth: '744px',
} as const;

// ─── Themes ─────────────────────────────────────────────────

export const bannerThemeLight = {
  /** surface-neutral-nearer */
  background: '#ffffff',
  /** stroke-neutral-subtle */
  border: '#dedede',
  /** Title — foreground-neutral-primary */
  title: '#242424',
  /** Body — foreground-neutral-primary */
  body: '#242424',
} as const;

export const bannerThemeDark = {
  /** surface-neutral-nearer (dark) */
  background: '#292929',
  /** stroke-neutral-subtle (dark) */
  border: '#484848',
  /** Title */
  title: '#fffbf8',
  /** Body */
  body: '#dedede',
} as const;

// ─── Lead (optional image / icon) ───────────────────────────

export const bannerImage = {
  /** Image slot */
  size: '60px',
  borderRadius: '12px',
} as const;

export const bannerIcon = {
  /** Icon slot container */
  size: '40px',
  /** Glyph size */
  iconSize: '20px',
} as const;

// ─── Typography (Functional Body Medium — Segoe Sans) ───────

export const bannerTitle = {
  fontFamily: 'var(--f-typography-fontFamily-display)',
  fontSize: '14px',
  lineHeight: '20px',
  /** Body Medium Strong — wght 625 */
  fontWeight: '625',
  fontVariationSettings: "'opsz' 8, 'wght' 625",
  letterSpacing: '0px',
} as const;

export const bannerBody = {
  fontFamily: 'var(--f-typography-fontFamily-display)',
  fontSize: '14px',
  lineHeight: '20px',
  /** Body Medium — wght 420 */
  fontWeight: '420',
  fontVariationSettings: "'opsz' 8, 'wght' 420",
  letterSpacing: '0px',
} as const;

// ─── Layout ─────────────────────────────────────────────────

export const bannerLayout = {
  /** Gap between text column and buttons */
  textToButtonsGap: '20px',
  /** Gap between action buttons / dismiss */
  buttonsGap: '4px',
} as const;

// ─── Actions (compose Button primitive — medium 32h / r12) ──

export const bannerPrimaryButton = {
  height: '32px',
  borderRadius: '12px',
  paddingInline: '10px',
  /** Filled subtle grey — background-neutral-subtle */
  background: 'rgba(229, 229, 229, 0.5)',
  color: '#242424',
  backgroundHover: '#ebebeb',
  /** Dark theme */
  backgroundDark: 'rgba(51, 51, 51, 0.5)',
  colorDark: '#dedede',
  backgroundHoverDark: 'rgba(51, 51, 51, 0.7)',
} as const;

export const bannerSecondaryButton = {
  height: '32px',
  borderRadius: '12px',
  paddingInline: '10px',
  /** Elevated near-white — surface-neutral-near + 1px subtle border */
  background: '#fcfcfc',
  border: '#dedede',
  color: '#242424',
  backgroundHover: '#f5f5f5',
  /** Dark theme */
  backgroundDark: '#242424',
  borderDark: '#484848',
  colorDark: '#dedede',
  backgroundHoverDark: '#303030',
} as const;

export const bannerDismissButton = {
  /** 28×28 (icon 20 + 4 padding), circular subtle */
  size: '28px',
  iconSize: '20px',
  borderRadius: '9999px',
  background: 'transparent',
  color: '#242424',
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Dark theme */
  colorDark: '#dedede',
  backgroundHoverDark: 'rgba(255, 255, 255, 0.06)',
} as const;

// ─── Side Pane Variant ──────────────────────────────────────

/**
 * Compact banner for the narrow side pane. Overrides the default container:
 * smaller width, radius, padding, 36px lead, body-small type, dismiss-only
 * (no CTA buttons). Figma: Banner variant "Side pane" (node 28961:7492).
 */
export const bannerSidePane = {
  /** Fixed narrow width */
  width: '244px',
  /** Corner radius — --gnrc-border-radius-base-400 (16px) */
  borderRadius: '16px',
  /** Padding — --gnrc-spacing-component-base-250 (10px) */
  padding: '10px',
  /** Lead ↔ main gap — --gnrc-spacing-component-base-250 (10px) */
  rowGap: '10px',
  /** Image slot — 36px, radius --gnrc-border-radius-base-200 (8px) */
  imageSize: '36px',
  imageRadius: '8px',
  /** Image background — --gnrc-color-surface-neutral-far */
  imageBackground: '#f2f2f2',
  /** Icon slot — 36px container, 24px glyph, radius 12 */
  iconSize: '36px',
  iconGlyphSize: '24px',
  iconRadius: '12px',
  /** Text column gap + left inset — --gnrc-spacing-component-base-50 (2px) / 4px */
  textGap: '2px',
  textPaddingLeft: '4px',
  /** Typography — Functional Body Small (12 / 16); title Semibold, body Regular */
  titleFontSize: '12px',
  titleLineHeight: '16px',
  titleFontWeight: '625',
  bodyFontSize: '12px',
  bodyLineHeight: '16px',
  bodyFontWeight: '420',
  /** Dismiss — 24px container (6px pad + 12px icon) */
  dismissSize: '24px',
  dismissIconSize: '12px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const banner = {
  container: bannerContainer,
  theme: {
    light: bannerThemeLight,
    dark: bannerThemeDark,
  },
  image: bannerImage,
  icon: bannerIcon,
  title: bannerTitle,
  body: bannerBody,
  layout: bannerLayout,
  primaryButton: bannerPrimaryButton,
  secondaryButton: bannerSecondaryButton,
  dismissButton: bannerDismissButton,
  sidePane: bannerSidePane,
} as const;
