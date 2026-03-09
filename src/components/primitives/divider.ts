/**
 * Component: Divider
 *
 * Bebop Design System — Content separator with optional label.
 *
 * Properties:
 *   Orientation: Horizontal | Vertical
 *   Layout:      Center (default) | Start | End
 *   Content:     Optional text label and/or icon
 *
 * Line: 1px, stroke/neutral/subtle (#dedede)
 * Text: body-small (12px), foreground/neutral/secondary (#5d5d5d)
 * Content padding: 12px inline (horizontal) or 12px block (vertical)
 * Content icon gap: 6px
 * Start/End stub line: 8px fixed
 *
 * Prefix: --c-divider-{property}
 */

// ─── Line ───────────────────────────────────────────────────

export const dividerLine = {
  /** Line thickness */
  width: '1px',
  /** stroke/neutral/subtle */
  color: '#dedede',
} as const;

// ─── Content ────────────────────────────────────────────────

export const dividerContent = {
  /** Padding around content (inline for horizontal, block for vertical) */
  padding: '12px',
  /** Gap between icon and text */
  gap: '6px',
  /** Start/End stub line length */
  stubLength: '8px',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const dividerTypography = {
  /** Functional body-small */
  fontFamily: 'var(--f-typography-fontFamily-body)',
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '1.4',
  letterSpacing: '0px',
  /** foreground/neutral/secondary */
  color: '#5d5d5d',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const divider = {
  line: dividerLine,
  content: dividerContent,
  typography: dividerTypography,
} as const;
