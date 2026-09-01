/**
 * Compound: User Message
 *
 * One Copilot / Bebop Design System — the sent user turn in a conversation:
 * an optional attachment list, the prompt bubble, and a hover-revealed actions
 * row. Aligned to the One Copilot Desktop UI Kit (Figma node 4136:122598;
 * detailed spec: Response Framework — User & Copilot Message).
 *
 * Right-aligned within a max-720px column. "A user message consists of the
 * sent prompt and actions."
 *
 * Composition (reuse-first):
 *   • attachmentPill (primitive) → the attachment list chips (image / entity)
 *   • button (primitive)         → the icon-only action buttons (edit/copy/save)
 *   • Fluent icons               → edit-20, copy-20, bookmark-20, chevron-down-20
 *
 * Anatomy (top → bottom, right-aligned):
 *   Attachment list — optional: wrap of attachment pills, justify-end, px16 py12
 *   Prompt bubble   — #f2f2f2 fill, radius 12, padding 8/16, max-w 580;
 *                     text = Content Paragraph Medium (16/28, Segoe Sans, #242424)
 *   Actions         — hover-revealed row: edit / copy / bookmark icon buttons
 *                     (circular, 6px pad, 20px glyph) + timestamp (Body Small #6f6f6f)
 *
 * Long messages collapse with a bottom fade + chevron-down "show more"; expanded
 * reveals the full text.
 *
 * Interactions (Response Fundamentals — nodes 73:36666, 73:37134):
 *   • Actions + timestamp reveal on hover AND keyboard focus (focus-within).
 *   • The actions are a roving-tabindex toolbar: focus the message, Enter to
 *     move into the toolbar, ←/→ to navigate, Enter/Space to activate.
 *   • Expand/collapse is two-way: the chevron toggles down (expand) ↔ up
 *     (collapse); expanding removes the fade, collapsing restores it.
 *   • When the message bottom is cut off by scroll, the actions/timestamp lift
 *     onto an elevated white backplate (Shadow/Low) on top of the message.
 *
 * Prefix: --c-user-message-{property}
 */

// ─── Container ──────────────────────────────────────────────

export const userMessageContainer = {
  /** Max column width */
  maxWidth: '720px',
  /** Right-aligned turn */
  align: 'flex-end',
  /** Vertical gap between attachment list / bubble / actions */
  gap: '4px',
} as const;

// ─── Attachment List ────────────────────────────────────────

export const userMessageAttachments = {
  /** Wrap, right-aligned */
  justify: 'flex-end',
  /** Gap between pills — Gap/Atomic/Large (8px) */
  gap: '8px',
  /** Inline padding — base-400 (16px) */
  paddingInline: '16px',
  /** Block padding — base-300 (12px) */
  paddingBlock: '12px',
} as const;

// ─── Prompt Bubble ──────────────────────────────────────────

export const userMessageBubble = {
  /** Fill — --gnrc-color-background-neutral-subtle */
  background: '#f2f2f2',
  /** Corner radius — --gnrc-border-radius-base-300 */
  borderRadius: '12px',
  /** Inline padding — --gnrc-padding-relaxed-xsmall (16px) */
  paddingInline: '16px',
  /** Block padding — --gnrc-padding-regular-medium (8px) */
  paddingBlock: '8px',
  /** Max bubble width */
  maxWidth: '580px',
} as const;

// ─── Prompt Text ────────────────────────────────────────────

export const userMessageText = {
  /** Family — --gnrc-font-family-content */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  /** Content Paragraph Medium — 16px */
  fontSize: '16px',
  /** Line height — --gnrc-line-height-content-paragraph-medium (28px) */
  lineHeight: '28px',
  /** Weight — FontWeight/Content/Regular (420) */
  fontWeight: '420',
  /** Letter spacing */
  letterSpacing: '0px',
  /** Color — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

// ─── Long Message (collapsed) ───────────────────────────────

export const userMessageCollapsed = {
  /** Collapsed max height (~5 lines) */
  maxHeight: '140px',
  /** Bottom fade to bubble fill */
  fade: 'linear-gradient(to bottom, rgba(242,242,242,0), #f2f2f2)',
  /** Chevron glyph — chevron-down-20 */
  chevronSize: '20px',
} as const;

// ─── Actions Row ────────────────────────────────────────────

export const userMessageActions = {
  /** Hidden until hover */
  opacityRest: '0',
  opacityHover: '1',
  /** Gap between the actions cluster and timestamp — base-300 (12px) */
  gap: '12px',
  /** Inline padding — base-200 (8px) */
  paddingInline: '8px',
  /** Block padding — base-100 (4px) */
  paddingBlock: '4px',
  /** Right-aligned */
  justify: 'flex-end',
} as const;

// ─── Action Button (icon-only, subtle circular) ─────────────

export const userMessageActionButton = {
  /** Surface — --gnrc-color-background-neutral-transparent */
  background: 'rgba(36,36,36,0)',
  /** Hover — transparent hover */
  backgroundHover: 'rgba(36,36,36,0.04)',
  /** Padding — base-150 (6px) */
  padding: '6px',
  /** Radius — circular */
  borderRadius: '9999px',
  /** Glyph size */
  iconSize: '20px',
  /** Glyph color — --gnrc-color-foreground-neutral-primary */
  iconColor: '#242424',
} as const;

// ─── Timestamp ──────────────────────────────────────────────

export const userMessageTimestamp = {
  /** Functional Body Small — 12px */
  fontSize: '12px',
  /** Line height (16px) */
  lineHeight: '16px',
  /** Color — --gnrc-color-foreground-neutral-tertiary */
  color: '#6f6f6f',
} as const;

// ─── Elevated Actions (message bottom cut off by scroll) ────
// Actions/timestamp lift onto a floating backplate on top of the message.

export const userMessageActionsElevated = {
  /** Surface — --gnrc-color-surface-neutral-nearer */
  background: '#ffffff',
  /** Radius — base-300 */
  borderRadius: '12px',
  /** Padding around the floating cluster */
  padding: '2px 4px',
  /** Shadow/Low — contour + soft ambient + low key */
  boxShadow:
    '0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08)',
} as const;

// ─── Reveal / Focus ─────────────────────────────────────────
// Actions + timestamp appear on hover OR keyboard focus of the message.

export const userMessageReveal = {
  /** The message turn is focusable to expose the actions toolbar */
  triggers: ['hover', 'focus-within'],
  /** Actions form a roving-tabindex toolbar (role="toolbar") */
  toolbarRole: 'toolbar',
  /** Enter the toolbar with Enter; navigate with ArrowLeft/ArrowRight */
  navKeys: ['ArrowLeft', 'ArrowRight'],
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const userMessage = {
  container: userMessageContainer,
  attachments: userMessageAttachments,
  bubble: userMessageBubble,
  text: userMessageText,
  collapsed: userMessageCollapsed,
  actions: userMessageActions,
  actionButton: userMessageActionButton,
  actionsElevated: userMessageActionsElevated,
  timestamp: userMessageTimestamp,
  reveal: userMessageReveal,
} as const;
