/**
 * Component: Tag
 *
 * Bebop Design System — Dismissible tag / chip component.
 *
 * Properties:
 *   Layout:   Icon and text | Icon only (dismiss button only)
 *   Style:    Primary | Secondary
 *   Size:     Small (25px) | Medium (32px)
 *   State:    Rest | Hover | Disabled
 *   Selected: true | false
 *   Dismiss:  true | false (shows × icon)
 *   IconBefore: true | false (optional leading icon)
 *
 * Selected uses semibold text and filled dismiss icon.
 * Non-selected uses regular text and regular dismiss icon.
 *
 * Prefix: --c-tag-{property}
 */

// ─── Size Tokens ────────────────────────────────────────────

export const tagSizeSmall = {
  /** Total height */
  height: '25px',
  /** Icon+text padding inline */
  paddingInline: '8px',
  /** Icon+text padding block */
  paddingBlock: '4px',
  /** Icon-only padding (circular) */
  paddingIconOnly: '4px',
  /** Gap between elements */
  gap: '2px',
  /** Text+icon border radius */
  borderRadius: '8px',
  /** Icon-only border radius */
  borderRadiusIconOnly: '9999px',
  /** Font size — body-small */
  fontSize: '12px',
  /** Line height */
  lineHeight: '1.4',
  /** Leading icon size (before label) */
  iconBeforeSize: '12px',
  /** Dismiss icon size */
  dismissIconSize: '16px',
  /** Text inner padding */
  textPaddingInline: '2px',
} as const;

export const tagSizeMedium = {
  /** Total height */
  height: '32px',
  /** Icon+text padding inline */
  paddingInline: '10px',
  /** Icon+text padding block */
  paddingBlock: '6px',
  /** Icon-only padding (circular) */
  paddingIconOnly: '6px',
  /** Gap between elements */
  gap: '2px',
  /** Text+icon border radius */
  borderRadius: '12px',
  /** Icon-only border radius */
  borderRadiusIconOnly: '9999px',
  /** Font size — body-medium */
  fontSize: '14px',
  /** Line height */
  lineHeight: '1.4',
  /** Leading icon size (before label) */
  iconBeforeSize: '16px',
  /** Icon before padding */
  iconBeforePadding: '2px',
  /** Dismiss icon size */
  dismissIconSize: '20px',
  /** Text inner padding */
  textPaddingInline: '2px',
} as const;

// ─── Style Tokens — Primary ────────────────────────────────

export const tagStylePrimary = {
  /** Rest: brand-heavy */
  backgroundRest: '#242424',
  /** Hover */
  backgroundHover: '#2b2b2b',
  /** Disabled */
  backgroundDisabled: '#ebebeb',
  /** Text color — white on dark */
  color: '#ffffff',
  /** Hover text — stays white */
  colorHover: '#ffffff',
  /** Disabled text */
  colorDisabled: '#929292',
} as const;

export const tagStyleSecondary = {
  /** Rest: neutral-heavy (for selected state) */
  backgroundRest: '#242424',
  /** Hover */
  backgroundHover: '#2b2b2b',
  /** Disabled */
  backgroundDisabled: '#ebebeb',
  /** Text color — white on dark */
  color: '#ffffff',
  /** Hover text */
  colorHover: '#ffffff',
  /** Disabled text */
  colorDisabled: '#929292',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const tagTypography = {
  fontFamily: 'var(--f-typography-fontFamily-body)',
  letterSpacing: '0px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const tag = {
  size: {
    small: tagSizeSmall,
    medium: tagSizeMedium,
  },
  style: {
    primary: tagStylePrimary,
    secondary: tagStyleSecondary,
  },
  typography: tagTypography,
} as const;
