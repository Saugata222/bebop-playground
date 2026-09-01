/**
 * Component: Checkbox
 *
 * Bebop Design System — Selection control for deferred, multi-select decisions.
 * Ported from the One Copilot Desktop UI Kit (Figma node 1413:24050).
 *
 * Anatomy:
 *   Indicator container — 8px padding wrapper around the box (expands hit target)
 *   Box                 — 16px square/circle with 1px border, holds the glyph
 *   Glyph               — 12px checkmark (Checked) or dash (Indeterminate)
 *   Label container     — 8px end padding + 6px block padding around the text
 *   Label               — Functional Body Medium (14/20, Segoe Sans 400)
 *
 * Properties:
 *   Status: Unchecked | Checked | Indeterminate
 *   State:  Rest | Hover | Pressed | Disabled
 *   Style:  Standard (4px radius) | Circular (9999px radius)
 *   Label:  true | false
 *
 * Behavior — checkbox is for deferred decisions (settings, filters, preference
 * lists reviewed before submit). Use Toggle for immediate-effect switches and
 * Radio for mutually-exclusive single choice. Allows zero, one, or many.
 *
 * The label foreground intentionally shifts from secondary (Unchecked) to
 * primary (Checked/Indeterminate) — de-emphasizing unselected options and
 * drawing attention to selected ones.
 *
 * Prefix: --c-checkbox-{property}
 */

// ─── Layout Tokens ──────────────────────────────────────────

export const checkboxLayout = {
  /** Gap between indicator and label — spacing/component/base-100 */
  gap: '4px',
  /** Padding around the box inside the indicator container — base-200 */
  indicatorPadding: '8px',
  /** Label container end (inline) padding — base-200 */
  labelPaddingEnd: '8px',
  /** Label container block padding — base-150 */
  labelPaddingBlock: '6px',
} as const;

// ─── Box Tokens ─────────────────────────────────────────────

export const checkboxBox = {
  /** Box dimensions */
  size: '16px',
  /** Border width — stroke/thin */
  borderWidth: '1px',
  /** Glyph size (checkmark / dash) */
  glyphSize: '12px',
  /** Standard radius — atomic/xsmall */
  radiusStandard: '4px',
  /** Circular radius */
  radiusCircular: '9999px',
} as const;

// ─── Status Tokens — Unchecked ──────────────────────────────
// Empty box: transparent fill, visible neutral-heavy border.

export const checkboxUnchecked = {
  /** Rest — transparent bg, heavy border */
  background: 'rgba(36,36,36,0)',
  border: '#242424',
  /** Hover — subtle transparent backplate, darker border */
  backgroundHover: 'rgba(36,36,36,0.04)',
  borderHover: '#313131',
  /** Pressed */
  backgroundPressed: 'rgba(36,36,36,0.08)',
  borderPressed: '#3e3e3e',
  /** Disabled — transparent bg, subtle border */
  backgroundDisabled: 'rgba(36,36,36,0)',
  borderDisabled: '#dedede',
} as const;

// ─── Status Tokens — Checked / Indeterminate ────────────────
// Filled box: brand-heavy fill, transparent border, white glyph.

export const checkboxSelected = {
  /** Rest — brand-heavy fill */
  background: '#242424',
  border: 'rgba(36,36,36,0)',
  /** Hover */
  backgroundHover: '#313131',
  /** Pressed */
  backgroundPressed: '#3e3e3e',
  /** Disabled — neutral-disabled fill */
  backgroundDisabled: '#ebebeb',
  /** Glyph color — white on fill */
  glyph: '#ffffff',
  /** Glyph color when disabled */
  glyphDisabled: '#929292',
} as const;

// ─── Label Tokens ───────────────────────────────────────────
// Foreground shifts secondary → primary between Unchecked and Selected.

export const checkboxLabelUnchecked = {
  /** Rest — foreground/neutral/secondary */
  color: '#5d5d5d',
  colorHover: '#555555',
  colorPressed: '#4c4c4c',
} as const;

export const checkboxLabelSelected = {
  /** Rest — foreground/neutral/primary */
  color: '#242424',
  colorHover: '#181818',
  colorPressed: '#0d0d0d',
} as const;

export const checkboxLabelDisabled = {
  /** Disabled — foreground/neutral/disabled (both statuses) */
  color: '#929292',
} as const;

// ─── Focus Ring ─────────────────────────────────────────────

export const checkboxFocusRing = {
  /** Outer ring — 2px black */
  outerWidth: '2px',
  outerColor: '#000000',
  /** Inner ring — 1px white */
  innerWidth: '1px',
  innerColor: '#ffffff',
  /** Ring radius — radius/base-300 */
  borderRadius: '12px',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const checkboxTypography = {
  fontFamily: 'var(--f-typography-fontFamily-body)',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '400',
  letterSpacing: '0px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const checkbox = {
  layout: checkboxLayout,
  box: checkboxBox,
  unchecked: checkboxUnchecked,
  selected: checkboxSelected,
  label: {
    unchecked: checkboxLabelUnchecked,
    selected: checkboxLabelSelected,
    disabled: checkboxLabelDisabled,
  },
  focusRing: checkboxFocusRing,
  typography: checkboxTypography,
} as const;
