/**
 * Primitive: Scrollbar
 *
 * Bebop Design System — Minimal scrollbar styling.
 *
 * A thin, pill-shaped thumb inside a transparent track.
 * On hover the thumb widens from 2px to 6px (filling the track).
 *
 * Properties:
 *   Thumb width rest:  2px
 *   Thumb width hover: 6px
 *   Thumb color:       #6f6f6f (foreground/neutral/tertiary)
 *   Thumb radius:      9999px (pill)
 *   Track width:       6px
 *   Track background:  transparent
 *   Track padding:     4px left
 *
 * Prefix: --c-scrollbar-{property}
 */

// ─── Scrollbar Tokens ───────────────────────────────────────

export const scrollbarThumb = {
  /** Thumb width — rest */
  widthRest: '2px',
  /** Thumb width — hover */
  widthHover: '6px',
  /** Thumb color */
  color: '#6f6f6f',
  /** Thumb border radius — pill */
  borderRadius: '9999px',
} as const;

export const scrollbarTrack = {
  /** Track width */
  width: '6px',
  /** Track background — transparent */
  background: 'transparent',
  /** Track padding left */
  paddingLeft: '4px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const scrollbar = {
  thumb: scrollbarThumb,
  track: scrollbarTrack,
} as const;
