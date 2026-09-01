/**
 * Component: Dialog (One Copilot)
 *
 * One Copilot Desktop UI Kit — Dialog. A modal that temporarily interrupts the
 * main workflow to demand attention and action; reserved for critical
 * interactions requiring explicit acknowledgement (confirmations, warnings,
 * structured inputs).
 *
 * Anatomy:
 *   1. Surface — elevated white popover (radius 24, 28px inset, Shadow/Highest)
 *   2. Text — Title (Functional Title Small 24/28 semibold) + supporting body
 *      (Functional Body Large 16/22 regular), 12px gap
 *   3. Divider padding — 32px spacer between text and footer
 *   4. Footer — right-aligned action row, 6px gap: a subtle Cancel + a primary
 *      confirm. Three types:
 *        · Neutral      — Cancel (subtle) + Okay (secondary grey)
 *        · On Brand     — Cancel (subtle) + Submit feedback (primary #242424)
 *        · Destructive  — Delete (subtle danger) + Keep (primary #242424)
 *
 * Prefix: --c-dialogOc-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Dialog (node 4020:1796);
 * instance "Open this link?" (User-Level-Sync-Connectors node 3154:21700).
 */

// ─── Surface ────────────────────────────────────────────────

export const dialogOcSurface = {
  /** --gnrc-color-surface-neutral-nearer */
  background: '#ffffff',
  /** 1px --gnrc-color-stroke-neutral-transparent */
  border: '1px solid rgba(36, 36, 36, 0)',
  /** --gnrc-border-radius-base-600 */
  borderRadius: '24px',
  /** --gnrc-spacing-component-base-700 */
  padding: '28px',
  /** 28px inset + 392px content */
  width: '448px',
  /** Shadow/Highest */
  boxShadow: '0 0 1px 0 rgba(0,0,0,0.08), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
} as const;

// ─── Text ───────────────────────────────────────────────────

export const dialogOcText = {
  display: 'flex',
  flexDirection: 'column',
  /** --gnrc-spacing-component-base-300 */
  gap: '12px',
  /** --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

/** Functional/Title Small */
export const dialogOcTitle = {
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '24px',
  lineHeight: '28px',
  fontWeight: 600,
  fontVariationSettings: "'opsz' 12, 'wght' 600",
  letterSpacing: '-0.15px',
  color: '#242424',
} as const;

/** Functional/Body Large */
export const dialogOcBody = {
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: 420,
  fontVariationSettings: "'opsz' 8, 'wght' 420",
  letterSpacing: '0px',
  color: '#242424',
} as const;

// ─── Divider padding (spacer between text and footer) ───────

export const dialogOcDividerPadding = {
  height: '32px',
  /** --gnrc-spacing-component-base-200 top/bottom */
  paddingBlock: '8px',
} as const;

// ─── Footer ─────────────────────────────────────────────────

export const dialogOcFooter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  /** --gnrc-spacing-component-base-150 */
  gap: '6px',
} as const;

// ─── Buttons ────────────────────────────────────────────────

/** Shared button geometry (Button primitive, medium) */
export const dialogOcButton = {
  height: '32px',
  /** px --gnrc-spacing-component-base-250 / py --gnrc-spacing-component-base-150 */
  padding: '6px 10px',
  borderRadius: '12px',
  border: 'none',
  cursor: 'pointer',
  /** Functional Body Medium */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 420,
} as const;

/** Subtle — Cancel (transparent) */
export const dialogOcButtonSubtle = {
  backgroundRest: 'rgba(36, 36, 36, 0)',
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  color: '#242424',
} as const;

/** Secondary — Okay (translucent grey) */
export const dialogOcButtonSecondary = {
  backgroundRest: 'rgba(229, 229, 229, 0.5)',
  backgroundHover: 'rgba(212, 212, 212, 0.54)',
  color: '#242424',
} as const;

/** Primary — Submit feedback / Keep */
export const dialogOcButtonPrimary = {
  backgroundRest: '#242424',
  backgroundHover: '#313131',
  color: '#ffffff',
} as const;

/** Destructive subtle — Delete (pink bg + crimson text) */
export const dialogOcButtonDestructive = {
  backgroundRest: '#ffe3e6',
  backgroundHover: '#fcd3d9',
  /** --gnrc-color-foreground-danger */
  color: '#c42344',
} as const;

// ─── Dark theme ─────────────────────────────────────────────

export const dialogOcThemeDark = {
  /** Surface on dark */
  surface: '#292929',
  border: '1px solid rgba(255,255,255,0)',
  /** Text */
  color: '#ededed',
  /** Subtle Cancel hover */
  subtleHover: 'rgba(255,255,255,0.08)',
  /** Secondary (Okay) */
  secondaryBackground: 'rgba(255,255,255,0.08)',
  secondaryHover: 'rgba(255,255,255,0.12)',
  /** Primary inverts to white surface, dark label */
  primaryBackground: '#ffffff',
  primaryColor: '#242424',
  primaryHover: '#f0f0f0',
  /** Destructive subtle on dark */
  destructiveBackground: 'rgba(196,35,68,0.24)',
  destructiveColor: '#ffb3c0',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const dialogOneCopilot = {
  surface: dialogOcSurface,
  text: dialogOcText,
  title: dialogOcTitle,
  body: dialogOcBody,
  dividerPadding: dialogOcDividerPadding,
  footer: dialogOcFooter,
  button: {
    base: dialogOcButton,
    subtle: dialogOcButtonSubtle,
    secondary: dialogOcButtonSecondary,
    primary: dialogOcButtonPrimary,
    destructive: dialogOcButtonDestructive,
  },
  themeDark: dialogOcThemeDark,
} as const;
