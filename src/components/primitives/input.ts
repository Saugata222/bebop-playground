/**
 * Component: Input
 *
 * One Copilot / Bebop Design System — Single-line text input field.
 *
 * New in One Copilot. A bordered text field with a placeholder / entered value,
 * an optional leading icon, two border shapes, three sizes, and a full state set.
 *
 * Anatomy:
 *   Contents          — bordered container (Outline: all sides + radius, Underline: bottom only)
 *   Icon-Text stack   — optional leading icon + text, size-specific padding & gap
 *   .Text             — placeholder (tertiary) or entered value (primary)
 *
 * Properties:
 *   Shape:  Outline | Underline
 *   Size:   Small | Medium | Large
 *   State:  Rest | Hover | Pressed | Focus | Error | Disabled | Filled
 *
 * Prefix: --c-input-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Input (node 3285:37151)
 */

// ─── Shape ──────────────────────────────────────────────────

export const inputShapeOutline = {
  /** Border on all four sides */
  borderWidth: '1px',
  borderStyle: 'solid',
} as const;

export const inputShapeUnderline = {
  /** Bottom border only, no radius */
  borderWidth: '0 0 1px 0',
  borderStyle: 'solid',
  borderRadius: '0px',
} as const;

// ─── Size ───────────────────────────────────────────────────

export const inputSizeSmall = {
  /** --gnrc-border-radius-base-200 (Outline only) */
  borderRadius: '8px',
  /** Inline padding — component-base-150 */
  paddingInline: '6px',
  /** Block padding — component-base-100 */
  paddingBlock: '4px',
  /** Icon↔text gap — component-base-150 */
  gap: '6px',
  /** Body Small — Segoe Sans Small Regular */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: '420',
  fontVariationSettings: "'opsz' 8, 'wght' 420",
  letterSpacing: '0px',
} as const;

export const inputSizeMedium = {
  /** --gnrc-border-radius-base-300 (Outline only) */
  borderRadius: '12px',
  /** Inline padding — component-base-250 */
  paddingInline: '10px',
  /** Block padding — component-base-150 */
  paddingBlock: '6px',
  /** Icon↔text gap — component-base-250 */
  gap: '10px',
  /** Body Medium — Segoe Sans Small Regular */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '420',
  fontVariationSettings: "'opsz' 8, 'wght' 420",
  letterSpacing: '0px',
} as const;

export const inputSizeLarge = {
  /** --gnrc-border-radius-base-400 (Outline only) */
  borderRadius: '16px',
  /** Inline padding — component-base-300 */
  paddingInline: '12px',
  /** Block padding — component-base-200 */
  paddingBlock: '8px',
  /** Icon↔text gap — component-base-300 */
  gap: '12px',
  /** Body Large — Segoe Sans Text Regular */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: '420',
  fontVariationSettings: "'wght' 420",
  letterSpacing: '0px',
} as const;

// ─── State ──────────────────────────────────────────────────

export const inputStateRest = {
  /** stroke-neutral-loud */
  border: '#6f6f6f',
  /** foreground-neutral-tertiary (placeholder) */
  text: '#6f6f6f',
  /** transparent surface */
  background: 'transparent',
} as const;

export const inputStateHover = {
  /** stroke-neutral-loud − hover lightness */
  border: '#787878',
  text: '#6f6f6f',
} as const;

export const inputStatePressed = {
  /** stroke-neutral-loud − press lightness */
  border: '#818181',
  text: '#6f6f6f',
} as const;

export const inputStateFocus = {
  /** stroke-neutral-heavy */
  border: '#242424',
  /** placeholder stays tertiary when empty+focused */
  text: '#6f6f6f',
} as const;

export const inputStateError = {
  /** stroke-danger-loud */
  border: '#c02e56',
  text: '#6f6f6f',
} as const;

export const inputStateDisabled = {
  /** stroke-neutral-disabled */
  border: 'rgba(37,37,37,0.5)',
  /** foreground-neutral-disabled */
  text: 'rgba(0,0,0,0.43)',
} as const;

export const inputStateFilled = {
  /** subtle border once a value is entered */
  border: 'rgba(37,37,37,0.5)',
  /** foreground-neutral-primary (entered value) */
  text: '#242424',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const input = {
  shape: {
    outline: inputShapeOutline,
    underline: inputShapeUnderline,
  },
  size: {
    small: inputSizeSmall,
    medium: inputSizeMedium,
    large: inputSizeLarge,
  },
  state: {
    rest: inputStateRest,
    hover: inputStateHover,
    pressed: inputStatePressed,
    focus: inputStateFocus,
    error: inputStateError,
    disabled: inputStateDisabled,
    filled: inputStateFilled,
  },
} as const;
