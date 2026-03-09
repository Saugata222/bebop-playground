/**
 * Component: Response Footer
 *
 * Bebop Design System — Response footer with action toolbar and sources button.
 *
 * Appears below Copilot's response text after CoT processing is complete.
 * Contains an action toolbar (Copy, Thumbs Up, Thumbs Down) separated from
 * a sources button by a vertical divider.
 *
 * Anatomy:
 *   1. Response footer — full-width row container
 *   2. Action toolbar — icon-only buttons (Copy, Like, Dislike)
 *      a. Copy
 *      b. Thumbs up
 *      c. Thumbs down
 *   3. Divider — vertical, 1px, #dedede, matches button height
 *   4. Sources button — file-type icon stack + chevron right
 *
 * Prefix: --c-responseFooter-{property}
 */

// ─── Container ──────────────────────────────────────────────

export const responseFooterContainer = {
  /** Horizontal flex row */
  display: 'flex',
  alignItems: 'center',
  /** Top padding separating from response text */
  paddingTop: '32px',
  /** Full width of the content area */
  width: '100%',
} as const;

// ─── Action Toolbar ─────────────────────────────────────────

export const responseFooterActionToolbar = {
  display: 'flex',
  alignItems: 'center',
  /** Gap between action buttons */
  gap: '0px',
} as const;

// ─── Action Button ──────────────────────────────────────────

export const responseFooterActionButton = {
  /** Circular button, subtle style */
  width: '32px',
  height: '32px',
  padding: '6px',
  borderRadius: '9999px',
  /** Transparent background at rest */
  background: 'rgba(36, 36, 36, 0)',
  /** Icon inherits color */
  color: '#242424',
  iconSize: '20px',
  border: 'none',
  cursor: 'pointer',
} as const;

export const responseFooterActionButtonHover = {
  background: 'rgba(36, 36, 36, 0.04)',
} as const;

export const responseFooterActionButtonPressed = {
  background: 'rgba(36, 36, 36, 0.08)',
} as const;

// ─── Divider ────────────────────────────────────────────────

export const responseFooterDivider = {
  /** Vertical divider between toolbar and sources */
  width: '1px',
  height: '20px',
  background: '#dedede',
  /** Horizontal margin around divider */
  marginInline: '4px',
} as const;

// ─── Sources Button ─────────────────────────────────────────

export const responseFooterSourcesButton = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  /** Pill-shaped button */
  height: '40px',
  minWidth: '40px',
  paddingInline: '12px',
  paddingBlock: '8px',
  borderRadius: '16px',
  background: 'rgba(36, 36, 36, 0)',
  border: 'none',
  cursor: 'pointer',
  color: '#242424',
} as const;

export const responseFooterSourcesButtonHover = {
  background: 'rgba(36, 36, 36, 0.04)',
} as const;

// ─── Sources Icon Stack ─────────────────────────────────────

export const responseFooterSourcesIconStack = {
  display: 'flex',
  alignItems: 'center',
  /** Small gap between file-type icons */
  gap: '2px',
  /** File-type icon size */
  iconSize: '20px',
} as const;

// ─── Sources Chevron ────────────────────────────────────────

export const responseFooterSourcesChevron = {
  /** 12px chevron-right */
  width: '12px',
  height: '12px',
  color: '#242424',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const responseFooter = {
  container: responseFooterContainer,
  actionToolbar: responseFooterActionToolbar,
  actionButton: {
    rest: responseFooterActionButton,
    hover: responseFooterActionButtonHover,
    pressed: responseFooterActionButtonPressed,
  },
  divider: responseFooterDivider,
  sourcesButton: {
    rest: responseFooterSourcesButton,
    hover: responseFooterSourcesButtonHover,
  },
  sourcesIconStack: responseFooterSourcesIconStack,
  sourcesChevron: responseFooterSourcesChevron,
} as const;
