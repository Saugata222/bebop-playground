/**
 * Component: Header
 *
 * Bebop Design System — Shell header bar for Copilot experiences.
 *
 * A full-width horizontal bar at the top of the shell containing a left section
 * (model picker / page title) and a right section (action buttons).
 *
 * Properties:
 *   Type:       Chat ZQ | Chat Session | Agent ZQ | Agent Session |
 *               Workspace ZQ | Workspace Session | Artifact | Placeholder
 *   Breakpoint: XXX-Large (1920) | XX-Large (1366) | X-Large (1024) | Small (320)
 *
 * Anatomy:
 *   Left section   — Model picker (icon + label + chevron), or page title
 *   Right section  — Icon-only circular Subtle buttons (action bar)
 *
 * Action buttons by type:
 *   Chat ZQ:          Temp Chat, Shield, More
 *   Chat Session:     Share, Shield, More
 *   Agent ZQ:         Temp Chat, Shield, More
 *   Agent Session:    Share, Shield, More
 *   Workspace ZQ:     Share, Temp Chat, Shield, More
 *   Workspace Sess:   Share, Shield, More  (+ Back arrow in left)
 *   Artifact:         Open, More, Dismiss
 *   Placeholder:      More
 *
 * Prefix: --c-header-{property}
 */

// ─── Container ──────────────────────────────────────────────

export const headerContainer = {
  /** Fixed height */
  height: '56px',
  /** Background */
  background: '#ffffff',
  /** Horizontal padding */
  paddingInline: '24px',
  /** Gap between left and right sections */
  gap: '8px',
} as const;

// ─── Section Layout ─────────────────────────────────────────

export const headerSection = {
  /** Both sections flex-grow equally */
  flex: '1 0 0',
  /** Gap between items within a section */
  gap: '4px',
  /** Right section alignment */
  rightJustify: 'flex-end',
} as const;

// ─── Model Picker (left section item) ───────────────────────

export const headerModelPicker = {
  /** Reuses button Medium Subtle (Icon+Text) */
  buttonStyle: 'subtle',
  buttonSize: 'medium',
  /** Chevron down icon appended */
  chevronSize: '16px',
} as const;

// ─── Action Buttons (right section) ─────────────────────────

export const headerActionButton = {
  /** Reuses button Medium Subtle, Icon-only, circular */
  buttonStyle: 'subtle',
  buttonSize: 'medium',
  /** Circular shape (not the default 12px radius) */
  borderRadius: '9999px',
  /** Icon size */
  iconSize: '20px',
  /** Total button size (20 + 6×2 = 32) */
  size: '32px',
  /** Padding */
  padding: '6px',
} as const;

// ─── Type-Specific Icons ────────────────────────────────────

export const headerTypeIcons = {
  /** Left section leading icons per type */
  chat: 'none',
  agent: 'planet-20-regular',
  workspace: 'folder-20-regular',
  artifact: 'copilot-page',
  /** Right section action icons */
  tempChat: 'chat-hint-half-20-regular',
  share: 'share-20-regular',
  shield: 'shield-task-20-regular',
  more: 'more-horizontal-20-regular',
  open: 'open-20-regular',
  dismiss: 'dismiss-20-regular',
  back: 'arrow-left-20-regular',
} as const;

// ─── Breakpoints ────────────────────────────────────────────

export const headerBreakpoints = {
  xxxLarge: '1920px',
  xxLarge: '1366px',
  xLarge: '1024px',
  small: '320px',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const headerTypography = {
  /** Model picker / title label — functional body-medium */
  fontFamily: 'var(--f-typography-fontFamily-body)',
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '1.4',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const header = {
  container: headerContainer,
  section: headerSection,
  modelPicker: headerModelPicker,
  actionButton: headerActionButton,
  typeIcons: headerTypeIcons,
  breakpoints: headerBreakpoints,
  typography: headerTypography,
} as const;
