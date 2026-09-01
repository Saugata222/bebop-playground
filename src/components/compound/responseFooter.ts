/**
 * Component: Response Footer
 *
 * One Copilot / Bebop Design System — Response footer with action toolbar and
 * a references button.
 *
 * Appears below Copilot's response text once processing is complete. Consists
 * of an action toolbar (Copy, Like, Dislike, Try again, More) separated from a
 * References button by a vertical divider. Supports light and dark themes.
 *
 * Anatomy:
 *   1. Response footer — full-width row container
 *   2. Action toolbar — icon-only circular buttons
 *      a. Copy           (copy-20-regular)
 *      b. Thumbs up      (thumb-like-20-regular / -filled when active)
 *      c. Thumbs down    (thumb-dislike-20-regular / -filled when active)
 *      d. Try again      (arrow-sync-20-regular — Fluent “Arrow Clockwise”)
 *      e. More           (more-horizontal-20-regular)
 *   3. Divider — vertical, 1px, stroke/neutral/subtle (rgba(189,189,189,0.5))
 *   4. References button — overlapping source avatars + “References” label
 *
 * Prefix: --c-responseFooter-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Response Footer (node 4174:32463)
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
  /** Vertical divider between toolbar and references */
  width: '1px',
  height: '20px',
  /** stroke/neutral/subtle — --gnrc-color-stroke-neutral-subtle */
  background: 'rgba(189,189,189,0.5)',
  /** Horizontal margin around divider */
  marginInline: '4px',
} as const;

// ─── Sources Button ─────────────────────────────────────────

export const responseFooterSourcesButton = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  /** Pill-shaped button */
  height: '32px',
  paddingInline: '8px',
  paddingBlock: '6px',
  borderRadius: '9999px',
  background: 'rgba(36, 36, 36, 0)',
  border: 'none',
  cursor: 'pointer',
  color: '#242424',
  /** Label typography — functional body-medium (Segoe Sans 14 / 20 / 420) */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 420,
} as const;

export const responseFooterSourcesButtonHover = {
  background: 'rgba(36, 36, 36, 0.04)',
} as const;

// ─── Sources Avatar Stack ──────────────────────────────────

export const responseFooterSourcesAvatarStack = {
  display: 'flex',
  alignItems: 'center',
  /** Overlap by negative gap */
  gap: '-4px',
  /** Each avatar is a circular favicon */
  avatarSize: '20px',
  /** White ring around each avatar to separate from neighbours */
  avatarBorder: '1.5px solid #ffffff',
  borderRadius: '9999px',
} as const;

// ─── Dark Theme ─────────────────────────────────────

export const responseFooterThemeDark = {
  /** Icon / label color on dark */
  color: '#ffffff',
  /** Rest icon color on dark (slightly muted) */
  iconRest: '#e0e0e0',
  /** Hover backplate on dark */
  backgroundHover: 'rgba(255,255,255,0.08)',
  /** Divider on dark — subtle */
  divider: 'rgba(255,255,255,0.16)',
} as const;

// ─── Aggregate Export ──────────────────────────────

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
  sourcesAvatarStack: responseFooterSourcesAvatarStack,
  themeDark: responseFooterThemeDark,
} as const;
