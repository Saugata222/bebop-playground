/**
 * Component: Tag
 *
 * Bebop Design System — Dismissible tag / chip that labels or filters content.
 * Aligned to the One Copilot Desktop UI Kit (Figma node 11328:125711).
 *
 * Anatomy:
 *   Container        — dark pill; the ENTIRE surface is the dismiss target.
 *   Leading icon     — optional Fluent Image glyph (iconBefore), 2px container pad.
 *   Label            — Functional Body Small/Medium. A semibold "ghost" copy
 *                      reserves width so Selected (semibold) and rest (regular)
 *                      never reflow.
 *   Dismiss icon     — Fluent Dismiss (×), always 12px, always Regular.
 *
 * Properties:
 *   Layout:   Icon and text | Icon only
 *   Size:     Small (24px) | Medium (32px)
 *   State:    Rest | Hover | Pressed | Disabled
 *   Selected: true (semibold label) | false (regular label)
 *
 * Behavior — a tag is not an action button: it labels or filters content and
 * never triggers a discrete action. Selecting anywhere on the tag dismisses it.
 * All icons (leading + dismiss) use the Regular style — there is NO filled
 * variant for Tag. Selected changes only the label weight, not the icons.
 *
 * Prefix: --c-tag-{property}
 */

// ─── Size Tokens ────────────────────────────────────────────

export const tagSizeSmall = {
  /** Total height */
  height: '24px',
  /** Icon+text inline padding */
  paddingInline: '8px',
  /** Icon+text block padding */
  paddingBlock: '4px',
  /** Icon-only padding (circular) */
  paddingIconOnly: '4px',
  /** Gap between children — spacing/component/base-100 */
  gap: '4px',
  /** Icon-only gap (none) */
  gapIconOnly: '0px',
  /** Text+icon border radius — base-200 */
  borderRadius: '8px',
  /** Icon-only border radius — circular */
  borderRadiusIconOnly: '9999px',
  /** Font size — functional body-small */
  fontSize: '12px',
  /** Line height */
  lineHeight: '16px',
  /** Leading icon glyph size */
  iconBeforeSize: '16px',
  /** Dismiss glyph size (Dismiss/20 @ 12) */
  dismissIconSize: '12px',
  /** Leading icon container padding — base-50 */
  iconPadding: '2px',
} as const;

export const tagSizeMedium = {
  /** Total height */
  height: '32px',
  /** Icon+text inline padding */
  paddingInline: '10px',
  /** Icon+text block padding */
  paddingBlock: '6px',
  /** Icon-only padding (circular) */
  paddingIconOnly: '6px',
  /** Gap between children — spacing/component/base-100 */
  gap: '4px',
  /** Icon-only gap — spacing/component/base-50 */
  gapIconOnly: '2px',
  /** Text+icon border radius — base-300 */
  borderRadius: '12px',
  /** Icon-only border radius — circular */
  borderRadiusIconOnly: '9999px',
  /** Font size — functional body-medium */
  fontSize: '14px',
  /** Line height */
  lineHeight: '20px',
  /** Leading icon glyph size */
  iconBeforeSize: '20px',
  /** Dismiss glyph size (Dismiss/20 @ 12) */
  dismissIconSize: '12px',
  /** Leading icon container padding — base-50 */
  iconPadding: '2px',
} as const;

// ─── State Tokens ───────────────────────────────────────────
// Single dark style. Background steps down in lightness on hover/press;
// disabled swaps to the neutral-disabled fill. Foreground stays white
// except when disabled.

export const tagStateRest = {
  /** background/brand-heavy */
  background: '#242424',
  /** foreground/brand-onloud */
  color: '#ffffff',
} as const;

export const tagStateHover = {
  /** oklch(brand-heavy − lightness-hover) */
  background: '#313131',
  color: '#ffffff',
} as const;

export const tagStatePressed = {
  /** oklch(brand-heavy − lightness-press) */
  background: '#3e3e3e',
  color: '#ffffff',
} as const;

export const tagStateDisabled = {
  /** background/neutral-disabled */
  background: '#c7c7c7',
  /** foreground/neutral-disabled */
  color: '#929292',
} as const;

// ─── Selected Tokens ────────────────────────────────────────
// Selected changes only the label weight. Icons never change (no filled variant).

export const tagSelected = {
  /** font-weight/functional-bold */
  fontWeightSelected: '625',
  /** font-weight/functional-regular */
  fontWeightRest: '420',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const tagTypography = {
  fontFamily: 'Segoe Sans',
  letterSpacing: '0px',
} as const;

// ─── Focus Ring ─────────────────────────────────────────────

export const tagFocusRing = {
  /** stroke/thick */
  outerWidth: '2px',
  /** stroke/focus/outer */
  outerColor: '#000000',
  /** stroke/thin */
  innerWidth: '1px',
  /** stroke/focus/inner */
  innerColor: '#ffffff',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const tag = {
  size: {
    small: tagSizeSmall,
    medium: tagSizeMedium,
  },
  state: {
    rest: tagStateRest,
    hover: tagStateHover,
    pressed: tagStatePressed,
    disabled: tagStateDisabled,
  },
  selected: tagSelected,
  typography: tagTypography,
  focusRing: tagFocusRing,
} as const;
