/**
 * Component: Connect Dialog
 *
 * Bebop Design System — Connector authorization dialog with frosted overlay.
 *
 * Appears when a user clicks "Connect" on an unconnected source in the sources
 * panel. Shows the Copilot icon, connector icon, title, description, and
 * primary "Continue to {Name}" + secondary "Cancel" buttons.
 *
 * Anatomy:
 *   1. Frosted overlay — backdrop blur, white 70% opacity
 *   2. Dialog surface — 556px wide, white, 16px radius, #dedede border
 *   3. Banner — #f5f5f5, 122px tall, full width
 *   4. Icon row — Copilot (48px) + dots (32px) + Connector icon (48px), centered over banner
 *   5. Header — "Connect {Name}" title (20px semibold) + "Developed by..." subtitle (12px)
 *   6. Body — description text (14px regular) with Settings link
 *   7. Footer — right-aligned primary + secondary buttons
 *
 * Prefix: --c-connectDialog-{property}
 */

// ─── Overlay ────────────────────────────────────────────────

export const connectDialogOverlay = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(20px)',
} as const;

// ─── Surface ────────────────────────────────────────────────

export const connectDialogSurface = {
  width: '556px',
  background: '#ffffff',
  borderRadius: '16px',
  border: '1px solid #dedede',
  boxShadow: '0px 12px 48px rgba(0, 0, 0, 0.12)',
  overflow: 'hidden',
} as const;

// ─── Banner ─────────────────────────────────────────────────

export const connectDialogBanner = {
  width: '100%',
  height: '122px',
  background: '#f5f5f5',
} as const;

// ─── Icon Row ───────────────────────────────────────────────

export const connectDialogIconRow = {
  /** Centered over the banner, overlapping top and bottom */
  top: '38px',
  gap: '16px',
  /** Copilot and connector icons */
  iconSize: '48px',
  /** Dots separator */
  dotsSize: '32px',
} as const;

// ─── Content ────────────────────────────────────────────────

export const connectDialogContent = {
  paddingInline: '24px',
  paddingTop: '16px',
  paddingBottom: '24px',
  gap: '16px',
} as const;

// ─── Header ─────────────────────────────────────────────────

export const connectDialogHeader = {
  /** "Connect {Name}" */
  titleFontSize: '20px',
  titleFontWeight: '600',
  titleLineHeight: '28px',
  titleColor: '#242424',
  /** "Developed by Microsoft Corporation" */
  subtitleFontSize: '12px',
  subtitleFontWeight: '400',
  subtitleLineHeight: '16px',
  subtitleColor: '#424242',
  /** Gap between title and subtitle */
  gap: '2px',
} as const;

// ─── Body ───────────────────────────────────────────────────

export const connectDialogBody = {
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '20px',
  color: '#242424',
  /** "Settings" link */
  linkTextDecoration: 'underline',
} as const;

// ─── Footer ─────────────────────────────────────────────────

export const connectDialogFooter = {
  paddingTop: '4px',
  buttonGap: '8px',
  justifyContent: 'flex-end',
} as const;

// ─── Buttons ────────────────────────────────────────────────

export const connectDialogButtonPrimary = {
  height: '32px',
  paddingInline: '12px',
  paddingBlock: '6px',
  borderRadius: '12px',
  background: '#242424',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '400',
  backgroundHover: '#3b3b3b',
} as const;

export const connectDialogButtonSecondary = {
  height: '32px',
  paddingInline: '12px',
  paddingBlock: '6px',
  borderRadius: '12px',
  background: '#f5f5f5',
  color: '#242424',
  fontSize: '14px',
  fontWeight: '400',
  backgroundHover: '#ebebeb',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const connectDialog = {
  overlay: connectDialogOverlay,
  surface: connectDialogSurface,
  banner: connectDialogBanner,
  iconRow: connectDialogIconRow,
  content: connectDialogContent,
  header: connectDialogHeader,
  body: connectDialogBody,
  footer: connectDialogFooter,
  button: {
    primary: connectDialogButtonPrimary,
    secondary: connectDialogButtonSecondary,
  },
} as const;
