/**
 * Component: Header
 *
 * One Copilot / Bebop Design System — primary anchor bar of the experience.
 *
 * Surfaces key context and controls with a minimal footprint: a left cluster
 * (Work IQ badge + model picker) and a right cluster (compliance shield +
 * temporary chat, plus session controls). A single shared header lets every
 * team start from a common foundation. This is the COMMERCIAL variant (Work IQ
 * present); the Consumer variant drops the Work IQ badge and shield.
 *
 * Anatomy:
 *   Left cluster   — Work IQ badge + Model picker ("Auto" + chevron)
 *   Right cluster  — Compliance shield + Temporary chat (icon-only Subtle);
 *                    session context adds Share / More / overflow
 *
 * Responsive (fills width; controls collapse as space shrinks):
 *   1024+       — Work IQ + Auto | shield + temp chat
 *   480–1023    — Work IQ + Auto | shield + share/temp chat + overflow (…)
 *   320–479     — hamburger | shield + add + overflow (…)
 *
 * Reused primitives: Button (icon-only Medium Subtle actions; Subtle Medium
 * model picker), Tag/Badge-style Work IQ chip.
 *
 * Prefix: --c-header-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Header (page 3230:49558;
 *        4202:7003, variants 4202:33244)
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

// ─── Work IQ Badge (left cluster, Commercial only) ──────────

export const headerWorkIqBadge = {
  /** Compact pill label */
  text: 'Work IQ',
  /** Height */
  height: '24px',
  /** Inline padding — --gnrc-spacing-component-base-200 (8px) */
  paddingInline: '8px',
  /** Radius — --gnrc-border-radius-base-300 (12px) */
  borderRadius: '12px',
  /** Surface — neutral soft */
  background: '#f0f0f0',
  /** Label — Functional Body Small Strong (12/16, 625) */
  fontSize: '12px',
  fontWeight: '625',
  lineHeight: '16px',
  /** --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

// ─── Compliance Shield (right cluster, Commercial only) ─────

export const headerComplianceShield = {
  /** Fluent shield-task glyph */
  icon: 'shield-task-20-regular',
  iconSize: '20px',
  /** Loud success green — --gnrc-color-background-success-loud */
  color: '#008455',
  /** Icon-only Subtle Medium, circular */
  size: '32px',
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
  workIqBadge: headerWorkIqBadge,
  complianceShield: headerComplianceShield,
  modelPicker: headerModelPicker,
  actionButton: headerActionButton,
  typeIcons: headerTypeIcons,
  breakpoints: headerBreakpoints,
  typography: headerTypography,
} as const;
