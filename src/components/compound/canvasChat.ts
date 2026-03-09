/**
 * Component: Canvas Chat
 *
 * Bebop Design System — Inline AI prompt surface for document editing.
 *
 * A floating card embedded in the canvas where users type instructions
 * to edit content with Copilot. Handles input, latency/generation
 * feedback, and output display within a single rounded container.
 *
 * Anatomy (10 parts):
 *   1. Add button          — opens menu/CIQ for attaching files
 *   2. Text input          — textarea with placeholder + dictation button
 *   3. Send button         — arrow-up icon; disabled until text entered
 *   4. Expand button       — chevron to expand output panel
 *   5. Collapse button     — chevron to collapse expanded output
 *   6. Output content      — scrollable paragraph area
 *   7. Edit with Copilot   — action to return to prompt input
 *   8. Spinner             — animated loading indicator
 *   9. Latency string      — status text (e.g., "Thinking")
 *  10. Stop button         — abort generation
 *
 * Optional parts:
 *   - Attachment list      — horizontal row of file/image chips
 *   - CIQ panel            — tabbed search overlay for work content
 *
 * Prefix: --c-canvasChat-{part}-{property}
 */

// ─── Container ──────────────────────────────────────────────

export const canvasChatContainer = {
  /** Card background */
  background: 'var(--f-color-white)',
  /** E3 Standard shadow — floating card */
  shadow: 'var(--f-elevation-standard-light)',
  /** Composite medium (16px) */
  borderRadius: 'var(--f-radius-composite-medium)',
  /** Default width when resting */
  minWidth: '420px',
  /** Max width when text entered or output shown */
  maxWidth: '600px',
} as const;

// ─── Output ─────────────────────────────────────────────────

export const canvasChatOutput = {
  /** Output container top corners — composite large (24px) */
  borderRadius: 'var(--f-radius-composite-large)',
  /** Bottom border separating output from input — stroke/neutral/subtle */
  borderColor: '#dedede',
  /** Stroke width for output divider */
  borderWidth: 'var(--f-stroke-primitive-1)',
  /** Padding inside content area for short output */
  paddingShort: 'var(--f-spacing-padding-relaxed-inline)',
  /** Padding inside content area for long output */
  paddingLong: 'var(--f-spacing-padding-relaxed-block)',
  /** Short output max height */
  maxHeightCollapsed: '520px',
  /** Long output max height before scroll */
  maxHeightExpanded: '400px',
} as const;

// ─── Output Typography ──────────────────────────────────────

export const canvasChatOutputTypography = {
  /** Content paragraph-medium */
  fontFamily: 'var(--f-typography-fontFamily-body)',
  fontSize: 'var(--f-typography-fontSize-16)',
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  lineHeight: 'var(--f-typography-lineHeight-1-71)',
  letterSpacing: 'var(--f-typography-letterSpacing-0)',
} as const;

// ─── Input Container ────────────────────────────────────────

export const canvasChatInputContainer = {
  /** Horizontal padding around the input row */
  paddingInline: 'var(--f-spacing-padding-regular-left)',
  /** Vertical padding around the input row */
  paddingBlock: 'var(--f-spacing-padding-tight-top)',
} as const;

// ─── Input Textarea ─────────────────────────────────────────

export const canvasChatInput = {
  /** Placeholder text color — foreground/neutral/tertiary */
  placeholderColor: '#6f6f6f',
  /** Entered text color */
  textColor: 'var(--f-color-neutral-26)',
  /** Underline at rest — stroke/neutral/loud */
  underlineColorRest: '#6f6f6f',
  /** Underline when focused — stroke/neutral/heavy */
  underlineColorFocus: 'var(--f-color-neutral-26)',
  /** Input row height in rest/focus-empty states */
  restRowHeight: '56px',
  /** Underline thickness */
  underlineWidth: 'var(--f-stroke-primitive-1)',
  /** Underline corner radius */
  underlineRadius: '4px',
  /** Cursor color */
  cursorColor: 'var(--f-color-neutral-26)',
  /** Cursor width */
  cursorWidth: '1px',
  /** Cursor corner radius */
  cursorRadius: '1px',
} as const;

// ─── Input Typography ───────────────────────────────────────

export const canvasChatInputTypography = {
  /** Placeholder — content paragraph-medium */
  placeholder: {
    fontFamily: 'var(--f-typography-fontFamily-body)',
    fontSize: 'var(--f-typography-fontSize-16)',
    fontWeight: 'var(--f-typography-fontWeight-regular)',
    lineHeight: 'var(--f-typography-lineHeight-1-71)',
  },
  /** Entered text — content paragraph-large */
  entered: {
    fontFamily: 'var(--f-typography-fontFamily-body)',
    fontSize: 'var(--f-typography-fontSize-16)',
    fontWeight: 'var(--f-typography-fontWeight-regular)',
    lineHeight: '24px',
  },
} as const;

// ─── Icon Buttons (Add, Mic, Send) ─────────────────────────

export const canvasChatIconButton = {
  /** Icon size inside buttons */
  iconSize: '16px',
  /** Button padding */
  padding: 'var(--f-spacing-padding-regular-top)',
  /** Circular border radius */
  borderRadius: 'var(--f-radius-atomic-circular)',
  /** Total button size (16px icon + 4px × 2 padding) */
  size: '24px',
} as const;

// ─── Add Button ─────────────────────────────────────────────

export const canvasChatAddButton = {
  /** Transparent background — background/neutral/transparent */
  background: 'transparent',
  /** Icon foreground */
  iconColor: 'var(--f-color-neutral-26)',
} as const;

// ─── Mic Button ─────────────────────────────────────────────

export const canvasChatMicButton = {
  /** Transparent background — background/neutral/transparent */
  background: 'transparent',
  /** Icon foreground */
  iconColor: 'var(--f-color-neutral-26)',
} as const;

// ─── Send Button ────────────────────────────────────────────

export const canvasChatSendButton = {
  /** Background when disabled — background/neutral/disabled */
  backgroundDisabled: '#ebebeb',
  /** Background when enabled — background/brand/heavy */
  backgroundEnabled: 'var(--f-color-neutral-26)',
  /** Icon color when disabled */
  iconColorDisabled: 'var(--f-color-neutral-57)',
  /** Icon color when enabled — white on dark bg */
  iconColorEnabled: 'var(--f-color-white)',
} as const;

// ─── Expand / Collapse Button ───────────────────────────────

export const canvasChatExpandButton = {
  /** White background with own shadow — floats above card */
  background: 'var(--f-color-white)',
  /** Chevron icon color */
  iconColor: 'var(--f-color-neutral-26)',
  /** Icon size — 12px chevron (smaller than other buttons) */
  iconSize: '12px',
  /** Total button size (12px icon + 4px × 2 padding) */
  size: '20px',
  /** Circular border radius */
  borderRadius: 'var(--f-radius-atomic-circular)',
  /** E3 Standard shadow — same as card */
  shadow: 'var(--f-elevation-standard-light)',
  /** Button padding */
  padding: 'var(--f-spacing-padding-regular-top)',
  /** Vertical offset above card top edge */
  topOffset: '-12px',
} as const;

// ─── Latency State ──────────────────────────────────────────

export const canvasChatLatency = {
  /** Spinner + text row gap */
  gap: 'var(--f-spacing-gap-atomic-large)',
  /** Status string gradient start — foreground/neutral/primary */
  textColorStart: 'var(--f-color-neutral-26)',
  /** Status string gradient end — foreground/neutral/tertiary */
  textColorEnd: '#6f6f6f',
  /** Spinner size */
  spinnerSize: '24px',
  /** Text container left padding */
  textPaddingLeft: 'var(--f-spacing-padding-regular-top)',
  /** Text container height */
  textHeight: '32px',
} as const;

// ─── Latency Typography ─────────────────────────────────────

export const canvasChatLatencyTypography = {
  /** Functional body-medium */
  fontFamily: 'var(--f-typography-fontFamily-body)',
  fontSize: 'var(--f-typography-fontSize-14)',
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  lineHeight: 'var(--f-typography-lineHeight-1-4)',
} as const;

// ─── Stop Button ────────────────────────────────────────────

export const canvasChatStopButton = {
  /** Dark pill background */
  background: 'var(--f-color-neutral-26)',
  /** White icon on dark bg */
  iconColor: 'var(--f-color-white)',
  /** Circular border radius */
  borderRadius: 'var(--f-radius-atomic-circular)',
} as const;

// ─── Attachment List ────────────────────────────────────────

export const canvasChatAttachment = {
  /** Row gap between chips */
  gap: 'var(--f-spacing-gap-composite-small)',
  /** Left offset to align with input */
  paddingLeft: '44px',
  /** Chip background — background/neutral/subtle */
  chipBackground: '#f5f5f5',
  /** Chip border radius — atomic large (16px) */
  chipBorderRadius: 'var(--f-radius-atomic-large)',
  /** Chip height */
  chipHeight: '44px',
  /** Chip horizontal padding */
  chipPaddingInline: 'var(--f-spacing-padding-regular-left)',
  /** Chip max width before truncation */
  chipMaxWidth: '200px',
  /** Chip icon size */
  chipIconSize: '20px',
  /** Chip text–icon gap */
  chipIconGap: 'var(--f-spacing-gap-atomic-small)',
  /** Overflow "+N" pill background — background/neutral/subtle */
  overflowBackground: '#f5f5f5',
} as const;

// ─── Edit with Copilot Button (output mode) ─────────────────

export const canvasChatEditButton = {
  /** Transparent background */
  background: 'transparent',
  /** Text + icon color */
  color: 'var(--f-color-neutral-26)',
  /** Pill border radius — atomic medium (12px) */
  borderRadius: 'var(--f-radius-atomic-medium)',
  /** Horizontal padding */
  paddingInline: '10px',
  /** Vertical padding */
  paddingBlock: '6px',
} as const;

// ─── Edit with Copilot Typography ───────────────────────────

export const canvasChatEditButtonTypography = {
  /** Functional body-medium */
  fontFamily: 'var(--f-typography-fontFamily-body)',
  fontSize: 'var(--f-typography-fontSize-14)',
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  lineHeight: 'var(--f-typography-lineHeight-1-4)',
} as const;

// ─── Attachment Typography ──────────────────────────────────

export const canvasChatAttachmentTypography = {
  /** Functional body-medium — chip label */
  fontFamily: 'var(--f-typography-fontFamily-body)',
  fontSize: 'var(--f-typography-fontSize-14)',
  fontWeight: 'var(--f-typography-fontWeight-regular)',
  lineHeight: 'var(--f-typography-lineHeight-1-4)',
  textColor: 'var(--f-color-neutral-26)',
} as const;

// ─── Layout Spacing ─────────────────────────────────────────

export const canvasChatSpacing = {
  /** Gap between toolbar button and input area */
  toolbarGap: 'var(--f-spacing-gap-atomic-xSmall)',
  /** Gap between input text and action buttons */
  inputActionsGap: 'var(--f-spacing-gap-atomic-large)',
  /** Gap inside the input container row */
  inputRowGap: 'var(--f-spacing-gap-composite-small)',
  /** Output paragraph bottom spacing */
  outputParagraphGap: 'var(--f-spacing-gap-layout-small)',
  /** Output container top padding */
  outputTopPadding: 'var(--f-spacing-padding-relaxed-inline)',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const canvasChat = {
  container: canvasChatContainer,
  output: canvasChatOutput,
  outputTypography: canvasChatOutputTypography,
  inputContainer: canvasChatInputContainer,
  input: canvasChatInput,
  inputTypography: canvasChatInputTypography,
  iconButton: canvasChatIconButton,
  addButton: canvasChatAddButton,
  micButton: canvasChatMicButton,
  sendButton: canvasChatSendButton,
  expandButton: canvasChatExpandButton,
  editButton: canvasChatEditButton,
  editButtonTypography: canvasChatEditButtonTypography,
  latency: canvasChatLatency,
  latencyTypography: canvasChatLatencyTypography,
  stopButton: canvasChatStopButton,
  attachment: canvasChatAttachment,
  attachmentTypography: canvasChatAttachmentTypography,
  spacing: canvasChatSpacing,
} as const;
