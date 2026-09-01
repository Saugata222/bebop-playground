/**
 * Component: Divider
 *
 * One Copilot / Bebop Design System — Content separator with optional label.
 *
 * A non-interactive thematic break. Stretches to fill its parent; the parent
 * layout controls extent. Optional Content slot (leading icon + short label)
 * sits inline (horizontal) or stacked (vertical). Aligns 1:1 onto Bebop
 * foundations — the One Copilot `--gnrc-*` mappings are noted per token.
 *
 * Properties:
 *   Orientation: Horizontal | Vertical
 *   Layout:      Center (default) | Start | End
 *   Content:     Optional 20px icon + text label
 *
 * Line: 1px, stroke/neutral/subtle (rgba(189,189,189,0.5))
 * Text: body-small (12px / 420), foreground/neutral/secondary (#5d5d5d)
 * Content padding: 12px inline (horizontal) or 12px block (vertical)
 * Content icon gap: 6px
 * Start/End stub line: 4px fixed
 *
 * Prefix: --c-divider-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Divider (node 1413:24271)
 */

// ─── Line ───────────────────────────────────────────────────

export const dividerLine = {
  /** Line thickness */
  width: '1px',
  /** stroke/neutral/subtle — --gnrc-color-stroke-neutral-subtle */
  color: 'rgba(189,189,189,0.5)',
} as const;

// ─── Content ────────────────────────────────────────────────

export const dividerContent = {
  /** Padding around content — --gnrc-spacing-component-base-300 (12px) */
  padding: '12px',
  /** Gap between icon and text — --gnrc-spacing-component-base-150 (6px) */
  gap: '6px',
  /** Optional leading icon size */
  iconSize: '20px',
  /** Start/End stub line length */
  stubLength: '4px',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const dividerTypography = {
  /** Functional body-small — --gnrc-font-family-functional (Segoe Sans / display) */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  /** --gnrc-font-size-functional-body-small */
  fontSize: '12px',
  /** --gnrc-font-weight-functional-regular */
  fontWeight: '420',
  /** --gnrc-line-height-functional-body-small */
  lineHeight: '16px',
  /** --gnrc-letter-spacing-functional-body-small */
  letterSpacing: '0px',
  /** foreground/neutral/secondary — --gnrc-color-foreground-neutral-secondary */
  color: '#5d5d5d',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const divider = {
  line: dividerLine,
  content: dividerContent,
  typography: dividerTypography,
} as const;
