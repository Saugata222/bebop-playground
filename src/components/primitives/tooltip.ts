/**
 * Component: Tooltip
 *
 * One Copilot / Bebop Design System — Read-only floating label that supplements
 * an already-affordable control (icon-only button, truncated text, shortcut hint).
 *
 * New in One Copilot; styling maps 1:1 onto Bebop foundations (white surface,
 * neutral-primary foreground, functional body-small type, atomic radius/spacing,
 * Shadow/Low elevation). Beakless surface; placement (Above/Below/Left/Right) is
 * handled by the consumer's positioner.
 *
 * Anatomy:
 *   Surface  — white card, 4px×8px padding, radius 8, Shadow/Low
 *   Label    — single line of Functional Body Small text (12/16)
 *
 * Properties:
 *   Position:  Above (default) | Below | Left | Right
 *
 * Purely descriptive — never focusable, never interactive. The trigger owns
 * focus; the tooltip is referenced via aria-describedby and dismissed with Esc.
 *
 * Prefix: --c-tooltip-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Tooltip (node 1413:28897),
 *        usage guidance (node 1506:1467)
 */

// ─── Surface ────────────────────────────────────────────────

export const tooltipSurface = {
  /** Background — --gnrc-color-surface-neutral-nearer (white) */
  background: '#ffffff',
  /** Inline padding — --gnrc-spacing-component-base-200 (8px) */
  paddingInline: '8px',
  /** Block padding — --gnrc-spacing-component-base-100 (4px) */
  paddingBlock: '4px',
  /** Corner radius — --gnrc-border-radius-base-200 (8px) */
  borderRadius: '8px',
  /** Elevation — Shadow/Low (contour + soft ambient + key) */
  boxShadow:
    '0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08)',
  /** Max width before wrapping (consumer may override) */
  maxWidth: '240px',
} as const;

// ─── Label ──────────────────────────────────────────────────

export const tooltipLabel = {
  /** Family — --gnrc-font-family-functional */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  /** Functional Body Small — 12px */
  fontSize: '12px',
  /** Line height — --gnrc-line-height-functional-body-small (16px) */
  lineHeight: '16px',
  /** Letter spacing */
  letterSpacing: '0px',
  /** Weight — regular */
  fontWeight: '420',
  /** Variable-font axes */
  variation: "'opsz' 8, 'wght' 420",
  /** Color — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

// ─── Placement ──────────────────────────────────────────────

export const tooltipPlacement = {
  /** Default placement */
  default: 'above',
  /** Gap between trigger and tooltip surface */
  offset: '8px',
} as const;

// ─── Motion ─────────────────────────────────────────────────

export const tooltipMotion = {
  /** Fade-in duration */
  duration: '100ms',
  /** Easing */
  easing: 'ease',
  /** Reduced-motion: no fade — show/hide instantly */
  reducedMotion: 'none',
} as const;

// ─── Typography Roll-up ─────────────────────────────────────

export const tooltipTypography = {
  label: tooltipLabel,
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const tooltip = {
  surface: tooltipSurface,
  label: tooltipLabel,
  placement: tooltipPlacement,
  motion: tooltipMotion,
  typography: tooltipTypography,
} as const;
