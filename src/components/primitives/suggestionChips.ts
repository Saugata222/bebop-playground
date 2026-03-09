/**
 * Component: Suggestion Chips
 *
 * Bebop Design System — Horizontal row of outline-style suggestion chips
 * with an optional overflow (more) button. Used in the Copilot shell's
 * home screen to offer quick-start prompts.
 *
 * Anatomy:
 *   Container (horizontal flex) → Chip* → Overflow button (optional)
 *
 * Properties:
 *   Container: width 820px (full content), height 32px, gap 8px
 *   Chip:      Outline Medium button (text-only), 32px height
 *   Overflow:  Icon-only Outline Medium button (More Horizontal icon)
 *   State:     Rest | Hover | Focus
 *
 * Each chip uses Outline button style (1px solid #dedede, transparent bg)
 * with Medium sizing (32px, 12px radius, 14px font).
 *
 * The overflow button is a 32×32 icon-only pill with the same outline style.
 *
 * Prefix: --c-suggestionChips-{property}
 */

// ─── Container Layout ───────────────────────────────────────

export const suggestionChipsLayout = {
  /** Horizontal flex row */
  display: 'flex',
  /** Left-aligned chips */
  alignItems: 'center',
  /** Horizontal gap between chips */
  gap: '8px',
  /** Row height matches chip height */
  height: '32px',
  /** Allow wrapping if container is narrow */
  flexWrap: 'nowrap',
  /** Clip overflow when chips exceed container */
  overflow: 'hidden',
} as const;

// ─── Chip Tokens ────────────────────────────────────────────

export const suggestionChipSize = {
  /** Total height — matches Medium button */
  height: '32px',
  /** Inline padding */
  paddingInline: '12px',
  /** Block padding */
  paddingBlock: '6px',
  /** Border radius — Medium */
  borderRadius: '12px',
  /** Font size — body-medium */
  fontSize: '14px',
  /** Font weight — regular */
  fontWeight: '400',
  /** Line height */
  lineHeight: '1.4',
  /** No wrap */
  whiteSpace: 'nowrap',
} as const;

export const suggestionChipStyle = {
  /** Rest: transparent */
  backgroundRest: 'transparent',
  /** Hover: 4% black overlay */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Text color */
  color: '#242424',
  /** Outline border */
  border: '1px solid #dedede',
  /** Hover border — slightly darker */
  borderHover: '1px solid #c4c4c4',
} as const;

// ─── Overflow Button Tokens ─────────────────────────────────

export const suggestionChipOverflow = {
  /** Fixed 32×32 icon-only circle */
  width: '32px',
  /** Height */
  height: '32px',
  /** Icon size */
  iconSize: '20px',
  /** Circular shape */
  borderRadius: '9999px',
  /** Padding (center 20px icon in 32px box) */
  padding: '6px',
  /** Rest: transparent (outline style) */
  backgroundRest: 'transparent',
  /** Hover */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Icon color */
  color: '#242424',
  /** Outline border */
  border: '1px solid #dedede',
  /** Hover border */
  borderHover: '1px solid #c4c4c4',
} as const;

// ─── Focus Ring ─────────────────────────────────────────────

export const suggestionChipFocusRing = {
  /** 2px black outer ring */
  outline: '2px solid #000000',
  /** No offset */
  outlineOffset: '0',
  /** 1px white inner ring */
  boxShadow: 'inset 0 0 0 1px #ffffff',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const suggestionChips = {
  layout: suggestionChipsLayout,
  chip: {
    size: suggestionChipSize,
    style: suggestionChipStyle,
    focusRing: suggestionChipFocusRing,
  },
  overflow: suggestionChipOverflow,
} as const;
