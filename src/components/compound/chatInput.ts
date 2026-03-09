/**
 * Component: Chat Input
 *
 * Bebop Design System — Full-width AI prompt bar.
 *
 * A horizontal input row for typing prompts to Copilot, typically
 * docked at the bottom of a chat panel. Contains toolbar buttons
 * on the left, a text area with underline in the center, and
 * action buttons on the right.
 *
 * Anatomy (5 parts):
 *   1. Diamond link button — capability refiner icon (20px, transparent)
 *   2. Add button          — plus icon (20px, transparent)
 *   3. Text input area     — placeholder "Ask Copilot", underline, mic button
 *   4. Mic button          — microphone icon (20px, transparent, inside input)
 *   5. Send button         — device-eq icon (20px, subtle bg), disabled until text
 *
 * Prefix: --c-chatInput-{part}-{property}
 */

// ─── Container ──────────────────────────────────────────────

export const chatInputContainer = {
  /** Full width, no max-width constraint */
  width: '100%',
  /** Gap between toolbar and input area */
  gap: '0px',
} as const;

// ─── Toolbar (Options + Add buttons) ────────────────────────

export const chatInputToolbar = {
  /** Gap between toolbar buttons */
  gap: '4px',
  /** Bottom padding to align buttons with input baseline */
  paddingBottom: 'var(--f-spacing-padding-regular-top)',
} as const;

// ─── Toolbar Button (Options, Add) ──────────────────────────

export const chatInputToolbarButton = {
  /** Icon size */
  iconSize: '20px',
  /** Button padding */
  padding: '10px',
  /** Total button size (20 + 10×2 = 40px) */
  size: '40px',
  /** Transparent background */
  background: 'transparent',
  /** Circular border radius */
  borderRadius: 'var(--f-radius-atomic-circular)',
  /** Icon color */
  iconColor: 'var(--f-color-neutral-26)',
} as const;

// ─── Input Area ─────────────────────────────────────────────

export const chatInputField = {
  /** Gap between text and action buttons */
  gap: '8px',
  /** Vertical padding */
  paddingBlock: '8px',
  /** Left padding inside text container */
  textPaddingLeft: '12px',
  /** Right padding reserved for send button area */
  paddingRight: '44px',
} as const;

// ─── Input Typography ───────────────────────────────────────

export const chatInputTypography = {
  /** Content paragraph-large */
  fontFamily: 'var(--f-typography-fontFamily-body)',
  fontSize: 'var(--f-typography-fontSize-20)',
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  lineHeight: '1.7',
  letterSpacing: 'var(--f-typography-letterSpacing-0)',
} as const;

// ─── Placeholder ────────────────────────────────────────────

export const chatInputPlaceholder = {
  /** Placeholder text */
  text: 'Ask Copilot',
  /** foreground/neutral/tertiary */
  color: '#6f6f6f',
  /** Line height — content paragraph-large at 20px × 1.7 */
  lineHeight: '1.7',
} as const;

// ─── Entered Text ───────────────────────────────────────────

export const chatInputEnteredText = {
  /** colors/neutral/grey/12 */
  color: '#1f1f1f',
  /** Line height — content/paragraph/large explicit value */
  lineHeight: '36px',
  /** Cursor width */
  cursorWidth: '2px',
  /** Cursor height */
  cursorHeight: '32px',
  /** Cursor color */
  cursorColor: 'var(--f-color-neutral-26)',
} as const;

// ─── Underline ──────────────────────────────────────────────

export const chatInputUnderline = {
  /** Rest state — stroke/neutral/loud */
  colorRest: '#6f6f6f',
  /** Focus state — stroke/neutral/heavy */
  colorFocus: 'var(--f-color-neutral-26)',
  /** Thickness */
  width: 'var(--f-stroke-primitive-1)',
  /** Corner radius */
  radius: '4px',
} as const;

// ─── Mic Button (inside input area) ─────────────────────────

export const chatInputMicButton = {
  /** Icon size */
  iconSize: '20px',
  /** Button padding — smaller than toolbar buttons */
  padding: '6px',
  /** Total button size (20 + 6×2 = 32px) */
  size: '32px',
  /** Transparent background */
  background: 'transparent',
  /** Circular border radius */
  borderRadius: 'var(--f-radius-atomic-circular)',
  /** Icon color */
  iconColor: 'var(--f-color-neutral-26)',
} as const;

// ─── Send Button ────────────────────────────────────────────

export const chatInputSendButton = {
  /** Icon size */
  iconSize: '20px',
  /** Button padding */
  padding: '10px',
  /** Total button size (20 + 10×2 = 40px) */
  size: '40px',
  /** background/neutral/subtle — disabled state */
  backgroundDisabled: '#f5f5f5',
  /** background/brand/heavy — enabled state */
  backgroundEnabled: 'var(--f-color-neutral-26)',
  /** Circular border radius */
  borderRadius: 'var(--f-radius-atomic-circular)',
  /** Icon color disabled */
  iconColorDisabled: 'var(--f-color-neutral-26)',
  /** Icon color enabled — white on dark */
  iconColorEnabled: 'var(--f-color-white)',
  /** Bottom padding to align with input baseline */
  paddingBottom: 'var(--f-spacing-padding-regular-top)',
} as const;

// ─── Layout Gap ─────────────────────────────────────────────

export const chatInputSpacing = {
  /** Gap between toolbar area and input field — composite large */
  toolbarToInput: '16px',
  /** Gap inside toolbar between buttons — atomic small */
  toolbarButtons: '4px',
  /** Gap between text and inline buttons — atomic large */
  inputActions: '8px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const chatInput = {
  container: chatInputContainer,
  toolbar: chatInputToolbar,
  toolbarButton: chatInputToolbarButton,
  field: chatInputField,
  typography: chatInputTypography,
  placeholder: chatInputPlaceholder,
  enteredText: chatInputEnteredText,
  underline: chatInputUnderline,
  micButton: chatInputMicButton,
  sendButton: chatInputSendButton,
  spacing: chatInputSpacing,
} as const;
