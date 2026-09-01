/**
 * Primitive: Scrollbar
 *
 * One Copilot / Bebop Design System — Minimal overlay scrollbar.
 *
 * A thin, pill-shaped thumb inside a transparent, end-aligned track. Supports
 * vertical and horizontal orientation. Styling maps 1:1 onto Bebop foundations
 * (tertiary thumb, circular radius, atomic 4px track padding). The thumb rests
 * at 2px and widens to 6px on hover as a grab affordance.
 *
 * Anatomy:
 *   Track  — transparent rail, 4px padding, thumb aligned to the end edge
 *   Thumb  — pill that fills the long axis, 2px on the short axis (rest)
 *
 * Properties:
 *   Orientation:       Vertical | Horizontal
 *   Thumb width rest:  2px  (prmt-sizing-2)
 *   Thumb width hover: 6px
 *   Thumb color:       #6f6f6f (--gnrc-color-foreground-neutral-tertiary)
 *   Thumb radius:      9999px (--gnrc-border-radius-circular)
 *   Track padding:     4px    (--gnrc-spacing-component-base-100)
 *   Track background:  transparent
 *
 * Prefix: --c-scrollbar-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Scrollbar (node 2430:2330)
 */

// ─── Scrollbar Tokens ───────────────────────────────────────

export const scrollbarThumb = {
  /** Thumb thickness — rest (prmt-sizing-2) */
  widthRest: '2px',
  /** Thumb thickness — hover */
  widthHover: '6px',
  /** Thumb color — --gnrc-color-foreground-neutral-tertiary */
  color: '#6f6f6f',
  /** Thumb border radius — --gnrc-border-radius-circular (pill) */
  borderRadius: '9999px',
} as const;

export const scrollbarTrack = {
  /** Track thickness (padding + hover thumb) */
  width: '6px',
  /** Track background — transparent */
  background: 'transparent',
  /** Track padding — --gnrc-spacing-component-base-100 (4px, all sides) */
  padding: '4px',
  /** Thumb alignment within the track — end edge (right / bottom) */
  align: 'end',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const scrollbar = {
  thumb: scrollbarThumb,
  track: scrollbarTrack,
} as const;
