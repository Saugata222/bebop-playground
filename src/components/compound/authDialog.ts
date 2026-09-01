/**
 * Component: Auth Dialog
 *
 * One Copilot Design System — Third-party connection authorization dialog.
 *
 * Shown when Copilot needs the user's consent to connect an external source
 * (e.g. "Connect Figma"). An elevated modal (radius 24, Shadow/Highest) with a
 * Title Small header + partner subtitle, a centered logo handshake row
 * (Copilot · connector dots · partner logo), a Body Medium consent sentence
 * with an inline "Settings" link, and a right-aligned Cancel + primary footer.
 *
 * Shares the Dialog compound's surface, Title Small type, and footer buttons;
 * adds the partner subtitle and the centered logo row.
 *
 * Anatomy:
 *   1. Scrim          — dark smoke behind the modal
 *   2. Surface        — 432px, white, radius 24 (base-600), padding 28 (base-700)
 *   3. Text group     — gap 12 (base-300)
 *        Header       — Title Small (24/28, 600) + Subtitle (Segoe UI 12/16, #424242)
 *        Logo row     — py 40; Copilot 48 · dots 32 · partner 48, gap 16
 *        Body         — Body Medium (14/20, 420) with underlined Settings link
 *   4. Footer         — right-aligned: Cancel (Subtle) + Continue (Primary)
 *
 * Prefix: --c-authDialog-{property}
 *
 * Figma: FCC-AdminX — Auth Dialog (node 121:8045)
 */

// ─── Scrim ──────────────────────────────────────────────────

export const authDialogScrim = {
  background: 'rgba(0, 0, 0, 0.4)',
} as const;

// ─── Surface ────────────────────────────────────────────────

export const authDialogSurface = {
  /** Modal width */
  width: '432px',
  /** Surface — --gnrc-color-surface-neutral-nearer */
  background: '#ffffff',
  /** Border transparent — surface defined by shadow alone */
  border: '1px solid rgba(36, 36, 36, 0)',
  /** Corner radius — --gnrc-border-radius-base-600 (24px) */
  borderRadius: '24px',
  /** Inset — --gnrc-spacing-component-base-700 (28px) */
  padding: '28px',
  /** Elevation — Shadow/Highest (contour + ambient + key) */
  boxShadow: '0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.03), 0 32px 48px rgba(0,0,0,0.08)',
} as const;

// ─── Text Group ─────────────────────────────────────────────

export const authDialogText = {
  /** Gap between header, logo row, and body — base-300 (12px) */
  gap: '12px',
  /** Gap between title and subtitle */
  headerGap: '4px',
} as const;

// ─── Header ─────────────────────────────────────────────────

export const authDialogTitle = {
  /** Functional / Title Small — Segoe Sans */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  fontSize: '24px',
  lineHeight: '28px',
  fontWeight: '600',
  letterSpacing: '-0.15px',
  /** --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

export const authDialogSubtitle = {
  /** Web / Caption 1 — Segoe UI */
  fontFamily: "'Segoe UI', system-ui, sans-serif",
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: '400',
  /** Light / Foreground / Foreground 2 */
  color: '#424242',
} as const;

// ─── Logo Row ───────────────────────────────────────────────

export const authDialogLogoRow = {
  /** Vertical breathing room around the handshake row */
  paddingBlock: '40px',
  /** Gap between the three marks — base-400 (16px) */
  gap: '16px',
  /** Copilot mark */
  copilotSize: '48px',
  /** Connector dots (more-horizontal) */
  dotsSize: '32px',
  /** Dots color — foreground neutral tertiary */
  dotsColor: '#6f6f6f',
  /** Partner logo */
  partnerSize: '48px',
} as const;

// ─── Body ───────────────────────────────────────────────────

export const authDialogBody = {
  /** Functional / Body Medium — Segoe Sans */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '420',
  color: '#242424',
  /** Inline link (Settings) is underlined, same color */
  linkColor: '#242424',
} as const;

// ─── Footer ─────────────────────────────────────────────────

export const authDialogFooter = {
  /** Right-aligned button row */
  justify: 'flex-end',
  /** Gap between buttons — base-150 (6px) */
  gap: '6px',
  /** Top spacer above footer (Divider Padding, 32px block, 8px inset) */
  spacer: '32px',
} as const;

/** Cancel — Subtle button (transparent) */
export const authDialogCancelButton = {
  height: '32px',
  padding: '6px 10px',
  borderRadius: '12px',
  background: 'transparent',
  color: '#242424',
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '420',
} as const;

/** Continue — Primary button (brand heavy) */
export const authDialogPrimaryButton = {
  height: '32px',
  padding: '6px 10px',
  borderRadius: '12px',
  /** --gnrc-color-background-brand-heavy */
  background: '#242424',
  color: '#ffffff',
  backgroundHover: '#3b3b3b',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '420',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const authDialog = {
  scrim: authDialogScrim,
  surface: authDialogSurface,
  text: authDialogText,
  title: authDialogTitle,
  subtitle: authDialogSubtitle,
  logoRow: authDialogLogoRow,
  body: authDialogBody,
  footer: authDialogFooter,
  cancelButton: authDialogCancelButton,
  primaryButton: authDialogPrimaryButton,
} as const;
