/**
 * Component: Response
 *
 * One Copilot / Bebop Design System — A structured turn that composes all the
 * pieces needed to model a reply: a user message, an optional latency state,
 * the Copilot message (a stack of Response Blocks with inline citations), and a
 * Response Footer. Response templates are flexible blueprints that adapt to any
 * context, in Light and Dark.
 *
 * Composes One Copilot primitives/compounds: responseBlocks (type system),
 * citation (inline source marks), latency (thinking state), and the button
 * primitive (footer actions).
 *
 * Anatomy — Turn (720px column):
 *   User message           — right-aligned subtle bubble
 *   [Latency]              — optional thinking state (see `latency`)
 *   Copilot message        — vertical stack of Response Blocks (16px gap)
 *   Response Footer        — action buttons + References avatar stack
 *
 * Properties:
 *   Theme: Light | Dark
 *
 * Prefix: --c-response-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Response (node 4020:2612)
 */

// ─── Turn Layout ────────────────────────────────────────────

export const responseLayout = {
  /** Turn / column width */
  width: '720px',
  /** Gap between user message and the Copilot message */
  userToBodyGap: '16px',
  /** Gap between blocks in the Copilot message — layout-base-200 (16px) */
  blockGap: '16px',
  /** Gap before the Response Footer */
  bodyToFooterGap: '16px',
} as const;

// ─── User Message ───────────────────────────────────────────

export const responseUserMessage = {
  /** Surface — --gnrc-color-background-neutral-subtle */
  background: '#f5f5f5',
  /** Dark surface */
  backgroundDark: '#363636',
  /** Corner radius — --gnrc-border-radius-base-500 (20px) */
  borderRadius: '20px',
  /** Inline padding — regular/large (16px) */
  paddingInline: '16px',
  /** Block padding — regular (12px) */
  paddingBlock: '12px',
  /** Max width (hugs, right-aligned) */
  maxWidth: '460px',
  /** Alignment within the column */
  align: 'flex-end',
  /** Text — Content Paragraph Medium 16/28 */
  fontSize: '16px',
  lineHeight: '28px',
  fontWeight: '420',
  /** Text color */
  color: '#242424',
  colorDark: '#ededed',
} as const;

// ─── Response Footer ────────────────────────────────────────

export const responseFooterBar = {
  /** Bar height */
  height: '48px',
  /** Gap between action buttons */
  actionGap: '2px',
  /** Action button size (icon-only, subtle) */
  actionSize: '32px',
  /** Action icon size */
  actionIconSize: '20px',
  /** Action icon color */
  actionColor: '#242424',
  actionColorDark: '#ededed',
  /** Hover backplate */
  actionHover: 'rgba(36,36,36,0.04)',
  actionHoverDark: 'rgba(255,255,255,0.06)',
  /** Action button radius */
  actionRadius: '8px',
  /** References avatar size */
  refAvatarSize: '20px',
  /** References avatar overlap */
  refAvatarOverlap: '-6px',
  /** References label — Functional Body Medium 14/20 */
  refFontSize: '14px',
  refLineHeight: '20px',
  refFontWeight: '420',
  /** References label color */
  refColor: '#242424',
  refColorDark: '#ededed',
  /** Gap between avatar stack and label */
  refGap: '8px',
} as const;

// ─── Theme ──────────────────────────────────────────────────

export const responseThemeLight = {
  /** Page / surface behind the turn */
  surface: '#ffffff',
  /** Body text primary */
  colorPrimary: '#242424',
  /** Body text secondary */
  colorSecondary: '#5d5d5d',
} as const;

export const responseThemeDark = {
  /** Page / surface behind the turn */
  surface: '#242424',
  /** Body text primary */
  colorPrimary: '#ededed',
  /** Body text secondary */
  colorSecondary: '#adadad',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const response = {
  layout: responseLayout,
  userMessage: responseUserMessage,
  footer: responseFooterBar,
  theme: {
    light: responseThemeLight,
    dark: responseThemeDark,
  },
} as const;
