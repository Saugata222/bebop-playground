/**
 * Component: Segmented Switch  (Segment Switch)
 *
 * One Copilot / Bebop Design System — Track-based segmented control.
 *
 * A track with 2–5 mutually exclusive segments where a sliding white indicator
 * marks the active selection. In Copilot it is the primary mechanism for
 * shifting between core modes — Chat, Cowork, Code. The continuous track
 * reinforces toggling within one control rather than switching views.
 *
 * New in One Copilot; standalone control (composes no other primitive).
 *
 * Anatomy:
 *   Track      — grey rounded rail (rgba(0,0,0,0.05)) with 4px inner gaps
 *   Segment    — label (+ optional icon), or icon-only in Mixed width
 *   Indicator  — white pill under the active segment (Shadow/Lowest)
 *
 * Properties:
 *   SegmentCount:  2 | 3 | 4 | 5
 *   Selected:      index of the active segment
 *   GridWidth:     Equal (segments share width) | Mixed (content width)
 *   Theme:         Light | Dark
 *
 * Label weight shifts Regular (420) → Semibold (625) when selected; reserve the
 * semibold width (ghost node) so selection doesn't reflow the track.
 *
 * Nav Mode Switcher usage: the active segment shows its text label while the
 * inactive segments collapse to icon-only, so the active mode expands to fit
 * its label (1fr) and the others stay 32px. Segment & indicator radius 12,
 * indicator hairline border = stroke-neutral-subtle.
 *
 * Prefix: --c-segmented-switch-{property}
 *
 * Figma: Segment Switch (node 4020:2650); Nav Mode Switcher (node 3090:14997)
 */

// ─── Track ──────────────────────────────────────────────────

export const segmentedSwitchTrack = {
  /** Rail background — Color/Shadow/Lowest/Key (rgba(0,0,0,0.05)) */
  background: 'rgba(0,0,0,0.05)',
  /** Corner radius — --gnrc-border-radius-base-300 (12px) */
  borderRadius: '12px',
  /** Inner padding — --gnrc-spacing-component-base-100 (4px) */
  padding: '4px',
  /** Gap between segments — --gnrc-spacing-component-base-100 (4px) */
  gap: '4px',
} as const;

// ─── Segment ────────────────────────────────────────────────

export const segmentedSwitchSegment = {
  /** Inline padding — --gnrc-spacing-component-base-300 (12px) */
  paddingInline: '12px',
  /** Block padding — --gnrc-spacing-component-base-150 (6px) */
  paddingBlock: '6px',
  /** Gap between icon and label — --gnrc-spacing-component-base-100 (4px) */
  gap: '4px',
  /** Corner radius — --gnrc-border-radius-base-300 (12px) */
  borderRadius: '12px',
  /** Icon size (icon-only / leading) */
  iconSize: '20px',
  /** Icon-only square padding */
  iconOnlyPadding: '6px',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const segmentedSwitchTypography = {
  /** Family — --gnrc-font-family-functional (Segoe Sans) */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  /** Functional Body Medium — 14px / 20px */
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0px',
  /** Weight — unselected (regular) */
  fontWeightRest: '420',
  /** Weight — selected (Body Medium Strong, semibold) */
  fontWeightSelected: '625',
} as const;

// ─── Segment States ─────────────────────────────────────────

export const segmentedSwitchSegmentState = {
  /** Unselected label — --gnrc-color-foreground-neutral-secondary */
  colorRest: '#5d5d5d',
  /** Hover label — primary */
  colorHover: '#242424',
  /** Selected label — --gnrc-color-foreground-neutral-primary */
  colorSelected: '#242424',
  /** Hover backplate on an unselected segment */
  backgroundHover: 'rgba(24,24,24,0.04)',
} as const;

// ─── Selected Indicator ─────────────────────────────────────

export const segmentedSwitchIndicator = {
  /** Surface — --gnrc-color-surface-neutral-nearer */
  background: '#ffffff',
  /** Corner radius — --gnrc-border-radius-base-300 (12px) */
  borderRadius: '12px',
  /** Hairline border — --gnrc-color-stroke-neutral-subtle (#dedede) */
  border: '1px solid #dedede',
  /** Elevation — Shadow/Lowest (Color/Shadow/Lowest/Key) */
  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
  /** Slide transition */
  transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
} as const;

// ─── Dark Theme ─────────────────────────────────────────────

export const segmentedSwitchThemeDark = {
  /** Track on dark */
  track: 'rgba(255,255,255,0.06)',
  /** Indicator on dark */
  indicator: '#3b3b3b',
  /** Indicator border on dark */
  indicatorBorder: '1px solid rgba(255,255,255,0.08)',
  /** Selected label on dark */
  colorSelected: '#ffffff',
  /** Unselected label on dark */
  colorRest: '#adadad',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const segmentedSwitch = {
  track: segmentedSwitchTrack,
  segment: segmentedSwitchSegment,
  typography: segmentedSwitchTypography,
  state: segmentedSwitchSegmentState,
  indicator: segmentedSwitchIndicator,
  themeDark: segmentedSwitchThemeDark,
} as const;
