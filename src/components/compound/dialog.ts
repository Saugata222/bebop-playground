/**
 * Component: Dialog
 *
 * Bebop Design System — Modal dialog surface.
 *
 * A dialog is a supplemental surface that can provide helpful interactions
 * or require someone to take an action before they can continue their task,
 * like confirming a deletion.
 *
 * Based on Fluent 2 Dialog, simplified for Bebop (no checkbox).
 *
 * Anatomy:
 *   Surface   — white card with elevated shadow and rounded corners
 *   Header    — title text (subtitle) + optional dismiss icon button
 *   Body      — descriptive text (body-medium)
 *   Footer    — left slot (tertiary) + right slot (primary + secondary)
 *   Overlay   — semi-transparent backdrop behind the dialog
 *
 * Optional parts:
 *   dismiss:         true | false (× icon button top-right)
 *   body:            true | false
 *   footer:          true | false
 *   secondaryButton: true | false
 *   tertiaryButton:  true | false
 *
 * Prefix: --c-dialog-{property}
 */

// ─── Surface Tokens ─────────────────────────────────────────

export const dialogSurface = {
  /** Background — surface/neutral/default (white) */
  background: 'var(--f-color-white)',
  /** Minimum width */
  minWidth: '480px',
  /** Default width */
  width: '600px',
  /** Padding — relaxed/medium (24px) */
  padding: '24px',
  /** Gap between header/body/footer sections — composite/small (8px) */
  gap: '8px',
  /** Border radius — composite/medium (16px) */
  borderRadius: '16px',
  /** Border — transparent 1px (structural only) */
  border: '1px solid rgba(36, 36, 36, 0)',
  /** Elevation — elevated shadow */
  boxShadow: '0px 12px 48px 0px rgba(0, 0, 0, 0.24), 0px 0px 3px 0px rgba(0, 0, 0, 0.03)',
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
  /** Title font size — subtitle (20px) */
  fontSize: '20px',
  /** Title font weight — semibold */
  fontWeight: '600',
  /** Title line height */
  lineHeight: '1.4',
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
  /** Font size — body-medium (14px) */
  fontSize: '14px',
  /** Font weight — regular */
  fontWeight: '400',
  /** Line height */
  lineHeight: '1.4',
  /** Text color — foreground/neutral/primary */
  color: '#242424',
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
  typography: dialogTypography,
} as const;
