/**
 * Component: Composer (Prompt Box)
 *
 * One Copilot / Bebop Design System — the primary chat input.
 *
 * A rounded prompt container that grows from a single-line pill into a
 * multi-line box, and can carry attachments, a capability chip with options,
 * and a bottom list (tab strip + result cards). New in One Copilot; composed
 * from One Copilot primitives — Button (icon-only medium), Tag, Tab/TabList.
 *
 * Anatomy:
 *   Container        — white surface, 1px subtle stroke, 16px padding
 *     Top list       — attachment chips (optional)
 *     Footer row     — Start (Add) · Textarea · End (Dictate + Voice/Send)
 *     Capability row — Add · capability Tag · Options button (optional)
 *     Bottom list    — Tab strip + result cards (optional)
 *
 * States: Initial (pill) | Multiple lines | With attachments |
 *         Capability enabled — Control off | Capability enabled — Control on
 *
 * Reused primitives:
 *   Button  — icon-only Medium, Subtle (Add, Dictate, Voice) and the circular
 *             brand-heavy Send (arrow-up) that replaces Voice once text exists
 *   Tag     — dismissible capability chip
 *   Tab/TabList — bottom-list tab strip
 *
 * Missing primitive (flagged): Card is a separate One Copilot component
 *   (Figma 1525:1904) not yet ported — result cards and attachment file cards
 *   are rendered inline as placeholders until Card is built.
 *
 * Prefix: --c-composer-{part}-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Composer / Prompt Box (page 0:1,
 *        documentation template node 4020:1758)
 */

// ─── Container ──────────────────────────────────────────────

export const composerContainer = {
  /** Fills the parent — never hardcode; 744px in the design is layout only */
  width: '100%',
  /** Surface — --gnrc-color-surface-neutral-nearer */
  background: '#ffffff',
  /** Border — --gnrc-stroke-width-thin + --gnrc-color-stroke-neutral-subtle */
  border: '1px solid #dedede',
  /** Collapsed single-line pill radius — --gnrc-border-radius-base-700 (28px) */
  borderRadiusCollapsed: '28px',
  /** Expanded (multi-line / attachments / capability) radius — --gnrc-border-radius-base-400 (16px) */
  borderRadiusExpanded: '16px',
  /** Padding — --gnrc-spacing-component-base-400 (16px) */
  padding: '16px',
  /** Gap between footer elements — --gnrc-spacing-component-base-100 (4px) */
  gap: '4px',
  /** Focus/hover stroke — --gnrc-color-foreground-neutral-primary */
  borderColorFocus: '#242424',
} as const;

// ─── Textarea ───────────────────────────────────────────────

export const composerTextarea = {
  /** Content font — --gnrc-font-family-content (Segoe Sans) */
  fontFamily: 'var(--f-typography-fontFamily-body)',
  /** --gnrc-font-size-content-paragraph-medium */
  fontSize: '16px',
  /** --gnrc-line-height-content-paragraph-medium */
  lineHeight: '28px',
  /** FontWeight/Content/Regular */
  fontWeight: '400',
  /** Inline padding either side of the text */
  paddingInline: '8px',
  /** Entered text — colors/neutral/grey/12 */
  colorEntered: '#1f1f1f',
  /** Caret — --gnrc-color-foreground-neutral-primary */
  caretColor: '#242424',
} as const;

export const composerPlaceholder = {
  /** Default placeholder copy */
  text: 'Message Copilot',
  /** --gnrc-color-foreground-neutral-tertiary */
  color: '#6f6f6f',
} as const;

// ─── Icon Buttons (Button primitive — icon-only Medium) ─────

/** Add, Dictate, Voice — Subtle icon-only Medium (32px, 20px glyph, circular) */
export const composerIconButton = {
  style: 'subtle',
  layout: 'iconOnly',
  size: 'medium',
  /** Container — icon-only Medium */
  containerSize: '32px',
  /** Padding — --gnrc-spacing-component-base-150 (6px) */
  padding: '6px',
  /** --gnrc-border-radius-circular */
  borderRadius: '9999px',
  /** Glyph */
  iconSize: '20px',
  /** Rest color — --gnrc-color-foreground-neutral-primary */
  iconColor: '#242424',
  /** Subtle hover */
  backgroundHover: 'rgba(36,36,36,0.04)',
} as const;

/**
 * Send — replaces Voice once text is entered. Button primitive: icon-only
 * Medium, brand-heavy (Primary), circular, arrow-up glyph.
 */
export const composerSendButton = {
  style: 'primary',
  layout: 'iconOnly',
  size: 'medium',
  containerSize: '32px',
  borderRadius: '9999px',
  /** Rest at voice state — waveform (device-eq), subtle */
  restIcon: 'device-eq-20-regular',
  /** Once text present — arrow-up, filled brand-heavy */
  activeIcon: 'arrow-up-20-regular',
  /** --gnrc-color-background-brand-heavy */
  activeBackground: '#242424',
  /** Active hover */
  activeBackgroundHover: '#3b3b3b',
  /** --gnrc-color-foreground-brand-onloud */
  activeColor: '#ffffff',
} as const;

// ─── Capability Row ─────────────────────────────────────────

/**
 * Capability chip uses the Tag primitive (dismissible). Options uses the
 * Button primitive — Subtle, Small, icon + text (options glyph + "Options").
 */
export const composerCapabilityRow = {
  /** Gap between add, tag, options — --gnrc-spacing-component-base-200 (8px) */
  gap: '8px',
  capabilityTag: { primitive: 'tag', dismissible: true },
  optionsButton: { primitive: 'button', style: 'subtle', size: 'small', icon: 'options-20-regular' },
} as const;

// ─── Attachment List (top) ──────────────────────────────────

/**
 * Attachment chips row. Image thumbnails plus file cards (icon + name +
 * type, with a dismiss X). File cards render inline pending the Card primitive.
 */
export const composerAttachmentList = {
  /** Gap between attachment chips */
  gap: '8px',
  /** Bottom spacing before the footer row */
  marginBottom: '8px',
  thumbnail: { size: '40px', borderRadius: '8px' },
  fileCard: {
    borderRadius: '8px',
    border: '1px solid #dedede',
    padding: '8px',
    gap: '8px',
    icon: 'document-20-regular',
    /** Title — Functional Body Small Strong (12/16, 625) */
    titleWeight: '625',
    /** Subtitle — Functional Body Small (12/16, 420), tertiary */
    subtitleColor: '#6f6f6f',
    dismiss: 'dismiss-16-regular',
  },
} as const;

// ─── Bottom List (Tab strip + result cards) ─────────────────

/**
 * Bottom list shown in "Capability enabled — Control on". A Tab/TabList strip
 * with chevron paddles over a row of result cards. Cards render inline
 * pending the Card primitive.
 */
export const composerBottomList = {
  /** Space above the bottom list */
  marginTop: '8px',
  tabStrip: { primitive: 'tabList' },
  paddle: { icon: 'chevron-right-20-regular', size: '32px' },
  card: { borderRadius: '12px', border: '1px solid #dedede', flagged: 'Card primitive not yet ported' },
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const composer = {
  container: composerContainer,
  textarea: composerTextarea,
  placeholder: composerPlaceholder,
  iconButton: composerIconButton,
  sendButton: composerSendButton,
  capabilityRow: composerCapabilityRow,
  attachmentList: composerAttachmentList,
  bottomList: composerBottomList,
} as const;
