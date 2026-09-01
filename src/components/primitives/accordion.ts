/**
 * Component: Accordion
 *
 * One Copilot / Bebop Design System — Expand-and-collapse section primitive.
 *
 * A single-row disclosure control: a Header that toggles the visibility of a
 * Body slot. New in One Copilot; styling maps 1:1 onto Bebop foundations
 * (transparent surface, atomic radius/spacing, functional body-small strong type).
 *
 * Anatomy:
 *   Header            — 24px row: Chevron + Leading icon + Title (or Content container + Chevron)
 *   Body (slot)       — consumer-provided content, revealed when expanded
 *
 * Properties:
 *   Chevron position: Leading (default) | Trailing
 *   State:            Collapsed | Expanded
 *   Interaction:      Rest | Hover | Focused
 *
 * Prefix: --c-accordion-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Accordion (node 2039:35606)
 */

// ─── Header ─────────────────────────────────────────────────

export const accordionHeader = {
  /** Row min height */
  height: '24px',
  /** Horizontal padding — --gnrc-spacing-component-base-200 / atomic 8px */
  paddingInline: '8px',
  /** Vertical padding — --gnrc-spacing-component-base-100 / atomic 4px */
  paddingBlock: '4px',
  /** Gap between chevron, icon, title — atomic 4px */
  gap: '4px',
  /** Corner radius — --gnrc-border-radius-base-200 / atomic 8px */
  borderRadius: '8px',
  /** Rest surface — neutralTransparent */
  backgroundRest: 'transparent',
  /** Hover surface — transparent hover tint */
  backgroundHover: 'rgba(36,36,36,0.04)',
  /** Pressed surface */
  backgroundPressed: '#f5f5f5',
} as const;

// ─── Chevron ────────────────────────────────────────────────

export const accordionChevron = {
  /** Icon size */
  size: '16px',
  /** Icon color — foreground neutral primary */
  color: '#242424',
  /** Collapsed rotation (chevron-right at rest) */
  rotationCollapsed: '0deg',
  /** Expanded rotation (rotates to chevron-down) */
  rotationExpanded: '90deg',
  /** Rotation transition */
  transition: 'transform 0.15s ease',
} as const;

// ─── Leading Icon ───────────────────────────────────────────

export const accordionLeadingIcon = {
  /** Icon size */
  size: '16px',
  /** Icon color — foreground neutral primary */
  color: '#242424',
} as const;

// ─── Title ──────────────────────────────────────────────────

export const accordionTitle = {
  /** Functional / Body Small Strong — Segoe Sans (variable) */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  /** --gnrc-font-size-functional-body-small */
  fontSize: '12px',
  /** --gnrc-font-weight-functional-bold — variable weight 625 (not 600) */
  fontWeight: '625',
  /** Variable-font axes: optical size 8, weight 625 */
  fontVariationSettings: "'opsz' 8, 'wght' 625",
  /** --gnrc-line-height-functional-body-small */
  lineHeight: '16px',
  /** --gnrc-letter-spacing-functional-body-small */
  letterSpacing: '0px',
  /** --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

// ─── Body (slot) ────────────────────────────────────────────

export const accordionBody = {
  /** Inline padding — aligns with header inset */
  paddingInline: '8px',
  /** Space between header and body */
  paddingTop: '4px',
  /** Trailing space */
  paddingBottom: '8px',
  /** Body reading type — Aptos body */
  fontFamily: 'var(--f-typography-fontFamily-body)',
  fontSize: '12px',
  lineHeight: '16px',
  /** Secondary text color */
  color: '#5d5d5d',
} as const;

// ─── Focus Ring ─────────────────────────────────────────────

export const accordionFocusRing = {
  /** Outer ring width */
  outerWidth: '2px',
  /** Outer ring color */
  outerColor: '#242424',
  /** Ring offset from header edge */
  offset: '1px',
  /** Ring radius follows header radius */
  borderRadius: '8px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const accordion = {
  header: accordionHeader,
  chevron: accordionChevron,
  leadingIcon: accordionLeadingIcon,
  title: accordionTitle,
  body: accordionBody,
  focusRing: accordionFocusRing,
} as const;
