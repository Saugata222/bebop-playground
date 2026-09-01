/**
 * Component: Dialog
 *
 * One Copilot / Bebop Design System — Modal dialog surface.
 *
 * Dialogs temporarily interrupt the main workflow to demand user attention and
 * action, reserved for critical interactions requiring explicit acknowledgment
 * — confirmations, warnings, or structured inputs.
 *
 * Types:
 *   Neutral      — a routine confirmation (Cancel + primary action)
 *   Feedback     — richer body with a primary submit (Cancel + Submit)
 *   Destructive  — irreversible action; the confirm button is Danger
 *
 * Anatomy:
 *   Overlay   — semi-transparent backdrop
 *   Surface   — white card, radius 24, Shadow/Highest, 24px padding
 *   Header    — title (Functional Title Small, 24/28) + optional dismiss
 *   Body      — descriptive text (Functional Body Large, 16/22)
 *   Footer    — right-aligned Cancel (Subtle) + primary/danger action
 *
 * Reused primitive: Button (Subtle Cancel; Primary/Danger confirm).
 *
 * Prefix: --c-dialog-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Dialog (page 2519:484419; node 4020:1796)
 */

// ─── Surface Tokens ─────────────────────────────────────────

export const dialogSurface = {
  /** Background — --gnrc-color-surface-neutral-nearer (white) */
  background: '#ffffff',
  /** Minimum width */
  minWidth: '320px',
  /** Default width */
  width: '360px',
  /** Padding — relaxed/medium (24px) */
  padding: '24px',
  /** Gap between header/body/footer sections — --gnrc-spacing-component-base-300 (12px) */
  gap: '12px',
  /** Border radius — --gnrc-border-radius-base-600 (24px) */
  borderRadius: '24px',
  /** Border — transparent 1px (structural only) */
  border: '1px solid rgba(36, 36, 36, 0)',
  /** Elevation — Shadow/Highest */
  boxShadow: '0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.03), 0 32px 48px rgba(0,0,0,0.08)',
} as const;

// ─── Overlay Tokens ─────────────────────────────────────────

export const dialogOverlay = {
  /** Semi-transparent backdrop */
  background: 'rgba(0, 0, 0, 0.5)',
} as const;

// ─── Header Tokens ──────────────────────────────────────────

export const dialogHeader = {
  /** Gap between title and dismiss — composite/small (8px) */
  gap: '8px',
  /** Title font size — Functional Title Small (24px) */
  fontSize: '24px',
  /** Title font weight — semibold */
  fontWeight: '600',
  /** Title line height — 28px */
  lineHeight: '28px',
  /** Title letter-spacing — --gnrc-letter-spacing-functional-title-small */
  letterSpacing: '-0.15px',
  /** Title color — foreground/neutral/primary */
  color: '#242424',
} as const;

// ─── Dismiss Button Tokens ──────────────────────────────────

export const dialogDismiss = {
  /** Container size (offset wrapper) */
  containerSize: '28px',
  /** Button padding — tight/medium (6px) */
  padding: '6px',
  /** Icon size */
  iconSize: '20px',
  /** Background — transparent */
  backgroundRest: 'rgba(36, 36, 36, 0)',
  /** Hover: 4% black overlay */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Border radius — circular */
  borderRadius: '9999px',
  /** Icon color */
  color: '#242424',
  /** Left padding offset — composite/xSmall (4px) */
  paddingLeft: '4px',
} as const;

// ─── Body Tokens ────────────────────────────────────────────

export const dialogBody = {
  /** Font size — Functional Body Large (16px) */
  fontSize: '16px',
  /** Font weight — regular */
  fontWeight: '420',
  /** Line height — 22px */
  lineHeight: '22px',
  /** Text color — foreground/neutral/primary */
  color: '#242424',
} as const;

// ─── Footer Danger Action (Destructive type) ────────────────

export const dialogButtonDanger = {
  /** Background — --gnrc-color-background-danger-soft */
  background: '#ffe3e6',
  /** Foreground — --gnrc-color-foreground-danger-primary */
  color: '#a62147',
  /** Hover — slightly deeper soft */
  backgroundHover: '#ffd0d6',
} as const;

// ─── Footer Tokens ──────────────────────────────────────────

export const dialogFooter = {
  /** Top padding above footer — regular/small (4px) */
  paddingTop: '4px',
  /** Gap between buttons on the right — composite/small (8px) */
  buttonGap: '8px',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const dialogTypography = {
  fontFamily: 'var(--f-typography-fontFamily-body)',
  letterSpacing: '0px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const dialog = {
  surface: dialogSurface,
  overlay: dialogOverlay,
  header: dialogHeader,
  dismiss: dialogDismiss,
  body: dialogBody,
  footer: dialogFooter,
  buttonDanger: dialogButtonDanger,
  typography: dialogTypography,
} as const;
