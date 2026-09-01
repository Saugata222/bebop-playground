/**
 * Component: MessageBar
 *
 * One Copilot / Bebop Design System — Inline status notification.
 *
 * A page- or section-level bar that surfaces the outcome of an action or a
 * persistent system state that needs attention. New in One Copilot; styling
 * maps 1:1 onto Bebop foundations (functional body type, subtle intent
 * surfaces, atomic radius/spacing). Not for inline field validation (use a
 * field error), floating notifications (use a Toast), or destructive
 * confirmations (use a Dialog).
 *
 * Anatomy:
 *   Container       — rounded-16, 1px intent stroke, 12px padding, 8px gap
 *     Status icon   — 20px Fluent glyph, colored by intent
 *     Message       — flex-1 functional body-medium (14/20), #242424 always
 *     Actions       — up to two subtle Buttons + a circular dismiss (X)
 *
 * Intents (status): Neutral (Information) | Warning | Danger (Error) | Success
 *   Match the status to the meaning of the message — never use Warning tokens
 *   to soften an Error. Message text stays neutral #242424 in every intent;
 *   only the surface, stroke, and icon carry the intent color.
 *
 * Prefix: --c-messageBar-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — MessageBar (node 1413:28316),
 *        usage guidance (node 1506:991)
 */

// ─── Container ──────────────────────────────────────────────

export const messageBarContainer = {
  /** Padding — --gnrc-spacing-component-base-300 / atomic 12px */
  padding: '12px',
  /** Gap between icon, message, actions — --gnrc-spacing-component-base-200 / 8px */
  gap: '8px',
  /** Corner radius — --gnrc-border-radius-base-400 / atomic-large 16px */
  borderRadius: '16px',
  /** Border width — --gnrc-stroke-width-thin */
  borderWidth: '1px',
  /** Width fills the parent — the 800px design value is layout only */
  width: '100%',
} as const;

// ─── Intent Tokens ──────────────────────────────────────────

/** Neutral / Information — routine, non-blocking heads-up */
export const messageBarIntentNeutral = {
  /** --gnrc-color-background-neutral-subtle */
  background: '#f2f2f2',
  /** --gnrc-color-stroke-neutral-subtle */
  borderColor: '#dedede',
  /** Status icon color — --gnrc-color-foreground-neutral-primary */
  iconColor: '#242424',
  /** Fluent glyph */
  icon: 'info-20-regular',
} as const;

/** Warning — non-critical issue that needs attention */
export const messageBarIntentWarning = {
  /** --gnrc-color-background-warning-subtle */
  background: '#fff2ee',
  /** --gnrc-color-stroke-warning-subtle */
  borderColor: '#ffd3c4',
  /** --gnrc-color-foreground-warning-primary */
  iconColor: '#a93901',
  /** Fluent glyph */
  icon: 'warning-20-regular',
} as const;

/** Danger / Error — failure or blocking condition */
export const messageBarIntentDanger = {
  /** --gnrc-color-background-danger-subtle */
  background: '#fff1f3',
  /** --gnrc-color-stroke-danger-subtle */
  borderColor: '#ffd0d6',
  /** --gnrc-color-foreground-danger-primary */
  iconColor: '#a62147',
  /** Fluent glyph */
  icon: 'diamond-dismiss-20-regular',
} as const;

/** Success — confirms a positive outcome */
export const messageBarIntentSuccess = {
  /** --gnrc-color-background-success-subtle */
  background: '#e3fcee',
  /** --gnrc-color-stroke-success-subtle */
  borderColor: '#b1efcc',
  /** --gnrc-color-foreground-success-primary */
  iconColor: '#017048',
  /** Fluent glyph */
  icon: 'checkmark-circle-20-regular',
} as const;

// ─── Status Icon ────────────────────────────────────────────

export const messageBarIcon = {
  /** Icon slot size */
  size: '20px',
} as const;

// ─── Message ────────────────────────────────────────────────

export const messageBarMessage = {
  /** --gnrc-font-family-functional — Segoe Sans */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  /** --gnrc-font-size-functional-body-medium */
  fontSize: '14px',
  /** --gnrc-line-height-functional-body-medium */
  lineHeight: '20px',
  /** --gnrc-font-weight-functional-regular */
  fontWeight: '420',
  /** --gnrc-letter-spacing-functional-body-medium */
  letterSpacing: '0px',
  /** Constant across every intent — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

// ─── Actions ────────────────────────────────────────────────

export const messageBarActions = {
  /** Gap between action buttons and dismiss — --gnrc-spacing-component-base-200 / 8px */
  gap: '8px',
} as const;

/**
 * Action buttons use the Button primitive — Subtle style, Small size.
 * Rest label is regular (Body Small, 420) with a semibold ghost for width;
 * subtle hover is rgba(36,36,36,0.04). Show no more than two; more responses
 * call for a Dialog instead.
 */
export const messageBarActionButton = {
  style: 'subtle',
  size: 'small',
} as const;

/**
 * Dismiss uses the Button primitive — Subtle, Icon-only, Medium (32px), circular.
 * The 20px glyph maps to the Medium icon-only size. Always give it an
 * accessible name; the X glyph alone is not enough.
 */
export const messageBarDismiss = {
  style: 'subtle',
  layout: 'iconOnly',
  size: 'medium',
  /** Container — icon-only Medium */
  containerSize: '32px',
  /** --gnrc-border-radius-circular */
  borderRadius: '9999px',
  /** Fluent glyph */
  icon: 'dismiss-20-regular',
  iconSize: '20px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const messageBar = {
  container: messageBarContainer,
  intent: {
    neutral: messageBarIntentNeutral,
    warning: messageBarIntentWarning,
    danger: messageBarIntentDanger,
    success: messageBarIntentSuccess,
  },
  icon: messageBarIcon,
  message: messageBarMessage,
  actions: messageBarActions,
  actionButton: messageBarActionButton,
  dismiss: messageBarDismiss,
} as const;
