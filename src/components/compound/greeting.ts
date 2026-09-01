/**
 * Component: Greeting & Zero State
 *
 * One Copilot / Bebop Design System — the first-impression welcome and the
 * empty chat surface built around it.
 *
 * Greeting is a warm, personal welcome that recognizes the user by name
 * before they express any intent ("Hi Elvia, how can I help?"). It is set in
 * the expressive serif content type — the only place UI chrome uses editorial
 * type — to establish Copilot's voice.
 *
 * Zero state composes the Greeting with the Composer (Prompt Box, initial
 * pill) and a row of prompt suggestion chips, centered on the surface.
 *
 * Anatomy (Zero state):
 *   Greeting        — Content Expressive Small serif headline
 *   Composer        — the Prompt Box in its initial (single-line pill) state
 *   Suggestions     — outline prompt chips + overflow (…)
 *
 * Reused: Composer compound; suggestion chips match promptSuggestions.
 *
 * Prefix: --c-greeting-{property} / --c-zeroState-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Greeting & zero state (page 1763:43777;
 *        Greeting 4020:1834, Zero state 3992:132662)
 */

// ─── Greeting Headline ──────────────────────────────────────

export const greetingHeadline = {
  /** Expressive serif — Content Expressive Small (Segoe Serif) */
  fontFamily: "'Segoe Serif', Georgia, 'Times New Roman', serif",
  /** --gnrc-font-size-content-expressive-small */
  fontSize: '28px',
  /** --gnrc-line-height-content-expressive-small */
  lineHeight: '34px',
  /** --gnrc-font-weight-regular */
  fontWeight: '400',
  /** --gnrc-letter-spacing-content (0) */
  letterSpacing: '0px',
  /** Centered on the zero-state surface */
  textAlign: 'center',
  /** Default sample copy */
  text: 'Hi Elvia, how can I help?',
} as const;

// ─── Greeting Theming ───────────────────────────────────────

export const greetingThemeLight = {
  /** --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

export const greetingThemeDark = {
  /** foreground on dark surface */
  color: '#ffffff',
} as const;

// ─── Zero State Layout ──────────────────────────────────────

export const zeroStateLayout = {
  /** Vertical stack, centered */
  display: 'flex',
  direction: 'column',
  align: 'center',
  /** Constrain to the Composer width */
  maxWidth: '744px',
  /** Space from greeting down to the composer */
  greetingToComposer: '24px',
  /** Space from composer down to the suggestions */
  composerToSuggestions: '16px',
} as const;

// ─── Suggestion Chips (matches promptSuggestions) ───────────

export const zeroStateSuggestions = {
  /** Gap between chips — --gnrc-spacing-component-base-300 (12px) */
  gap: '12px',
  chip: {
    /** Border — 1px, translucent neutral stroke */
    border: '1px solid rgba(189,189,189,0.5)',
    /** Radius — --gnrc-border-radius-base-300 (12px) */
    borderRadius: '12px',
    /** Padding — --gnrc-spacing-component-base-250 (10px) */
    padding: '10px',
    /** Gap between icon and label — base-100 (4px) */
    gap: '4px',
    /** Functional Body Medium (14/20, regular 420) */
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '420',
    /** --gnrc-color-foreground-neutral-secondary */
    color: '#5d5d5d',
    /** Rest background — neutral transparent */
    background: 'transparent',
    /** Hover overlay */
    backgroundHover: 'rgba(24,24,24,0.04)',
  },
  overflow: {
    /** Circular icon-only paddle */
    borderRadius: '9999px',
    /** --gnrc-color-foreground-neutral-tertiary */
    color: '#6f6f6f',
    icon: 'more-horizontal-20-regular',
  },
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const greeting = {
  headline: greetingHeadline,
  theme: { light: greetingThemeLight, dark: greetingThemeDark },
} as const;

export const zeroState = {
  layout: zeroStateLayout,
  suggestions: zeroStateSuggestions,
} as const;
