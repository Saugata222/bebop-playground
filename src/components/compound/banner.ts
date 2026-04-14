/**
 * Component: Banner
 *
 * Bebop Design System — Contextual notification banner for the chat thread.
 *
 * A dismissible inline banner that prompts users to connect data sources
 * or confirms a successful connection. Three layout variants depending
 * on message context:
 *
 *   Single source  — one app icon, CTA to connect that specific source
 *   Multi source   — 2×2 icon grid with overflow count, CTA to browse sources
 *   Connected      — confirmation icon, CTA to explore connected source
 *
 * Anatomy:
 *   Container (rounded-16, 1px #dedede border, 16px padding)
 *     Row (12px gap, center-aligned)
 *       Image area (40×40, varies by variant)
 *       Main area (flex-1, overflow-clip)
 *         Text + Buttons row (20px gap)
 *           Header + Body column
 *             Header (14px/600 — typeFunctional.bodyMediumStrong)
 *             Body   (14px/400 — typeFunctional.bodyMedium)
 *           Buttons row (8px gap)
 *             Action button (buttonStyleSecondary, buttonSizeMedium)
 *             Dismiss button (buttonStyleSubtle, buttonIconOnlyMedium, circular)
 *
 * Foundation references:
 *   Border:    strokeGeneric.thin (1px) + semantic #dedede
 *   Radius:    radiusAtomic.large (16px) container, radiusAtomic.small (8px) icons
 *   Spacing:   gapAtomic.xLarge (16px) padding, gapAtomic.large (12px) icon-to-text,
 *              gapAtomic.medium (8px) buttons gap
 *   Color:     neutral[26] (#242424) text, neutral[97] (#f5f5f5) subtle bg,
 *              neutral[94] (#ebebeb) hover bg
 *   Typography: typeFunctional.bodyMediumStrong (header), typeFunctional.bodyMedium (body)
 *   Button:    buttonStyleSecondary (action), buttonStyleSubtle (dismiss)
 *
 * Prefix: --c-banner-{property}
 */

// ─── Container Tokens ───────────────────────────────────────

export const bannerContainer = {
  /** Padding — matches gapAtomic.xLarge */
  padding: '16px',
  /** Border — strokeGeneric.thin + semantic subtle stroke #dedede */
  border: '1px solid #dedede',
  /** Border radius — radiusAtomic.large */
  borderRadius: 'var(--f-radius-atomic-large, 16px)',
  /** Background — surface white */
  background: '#ffffff',
  /** Gap between image and main — gapAtomic.large */
  gap: '12px',
} as const;

// ─── Image Area Tokens ──────────────────────────────────────

export const bannerImageSingle = {
  /** Single icon container size */
  size: '40px',
  /** Border radius — radiusAtomic.small */
  borderRadius: 'var(--f-radius-atomic-small, 8px)',
} as const;

export const bannerImageMulti = {
  /** Multi-icon grid container width */
  size: '40px',
  /** Individual icon size in 2×2 grid */
  iconSize: '19px',
  /** Border radius for small icons */
  iconBorderRadius: '4px',
  /** Gap between icons — gapAtomic.xxSmall */
  gap: '2px',
  /** Overflow chip background — neutral[97] */
  overflowBackground: '#f5f5f5',
  /** Overflow chip font size */
  overflowFontSize: '10px',
  /** Overflow chip color — neutral[26] */
  overflowColor: '#242424',
} as const;

export const bannerImageConnected = {
  /** Connected icon container size */
  size: '40px',
  /** Icon size within container */
  iconSize: '40px',
} as const;

// ─── Typography Tokens ──────────────────────────────────────
// Maps to typeFunctional.bodyMediumStrong (header) and typeFunctional.bodyMedium (body)

export const bannerTypography = {
  /** Font family — body stack */
  fontFamily: "'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif",
  /** Header — typeFunctional.bodyMediumStrong */
  headerFontSize: '14px',
  headerFontWeight: '600',
  headerLineHeight: '20px',
  /** Body — typeFunctional.bodyMedium */
  bodyFontSize: '14px',
  bodyFontWeight: '400',
  bodyLineHeight: '1.4',
  /** Text color — neutral[26] */
  color: '#242424',
} as const;

// ─── Button Tokens ──────────────────────────────────────────
// Action button = buttonStyleSecondary + buttonSizeMedium
// Dismiss button = buttonStyleSubtle + buttonIconOnlyMedium + circular

export const bannerActionButton = {
  /** Height — buttonSizeMedium.height */
  height: '32px',
  /** Padding — buttonSizeMedium.paddingInline */
  paddingInline: '10px',
  /** Border radius — buttonSizeMedium.borderRadius (radiusAtomic.medium) */
  borderRadius: 'var(--f-radius-atomic-medium, 12px)',
  /** Background — buttonStyleSecondary.backgroundRest (neutral[97]) */
  background: '#f5f5f5',
  /** Background hover — buttonStyleSecondary.backgroundHover (neutral[94]) */
  backgroundHover: '#ebebeb',
  /** Font size — buttonSizeMedium.fontSize */
  fontSize: '14px',
  /** Font weight — buttonSizeMedium.fontWeight */
  fontWeight: '400',
  /** Color — neutral[26] */
  color: '#242424',
} as const;

export const bannerDismissButton = {
  /** Size — buttonIconOnlyMedium.size */
  size: '32px',
  /** Icon size — buttonIconOnlyMedium.iconSize */
  iconSize: '20px',
  /** Border radius — circular */
  borderRadius: 'var(--f-radius-atomic-circular, 9999px)',
  /** Background — buttonStyleSubtle.backgroundRest (transparent) */
  background: 'transparent',
  /** Background hover — buttonStyleSubtle.backgroundHover */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Color — neutral[26] */
  color: '#242424',
} as const;

// ─── Layout Tokens ──────────────────────────────────────────

export const bannerLayout = {
  /** Gap between text column and buttons — 20px */
  textToButtonsGap: '20px',
  /** Gap between action buttons — gapAtomic.medium */
  buttonsGap: '8px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const banner = {
  container: bannerContainer,
  image: {
    single: bannerImageSingle,
    multi: bannerImageMulti,
    connected: bannerImageConnected,
  },
  typography: bannerTypography,
  actionButton: bannerActionButton,
  dismissButton: bannerDismissButton,
  layout: bannerLayout,
} as const;
