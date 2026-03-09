/**
 * Component: Toggle (Switch)
 *
 * Bebop Design System — Small toggle switch for binary on/off states.
 *
 * Anatomy:
 *   Track  — Pill-shaped background (32×16 px)
 *   Thumb  — Circular indicator that slides left/right (12 px)
 *   Label  — Optional text label to the left of the switch
 *
 * Properties:
 *   Checked:  true | false
 *   State:    Rest | Hover | Disabled
 *   Label:    true | false
 *
 * Checked=true:  Track is neutral-heavy (#242424), thumb is white, positioned right.
 * Checked=false: Track is bordered (#dedede), thumb is tertiary (#6f6f6f), positioned left.
 *
 * Prefix: --c-toggle-{property}
 */

// ─── Track Tokens ───────────────────────────────────────────

export const toggleTrack = {
  /** Track width */
  width: '32px',
  /** Track height */
  height: '16px',
  /** Border radius — fully rounded */
  borderRadius: '9999px',
} as const;

export const toggleTrackChecked = {
  /** Background — neutral-heavy */
  background: '#242424',
  /** Hover */
  backgroundHover: '#2b2b2b',
  /** Border */
  border: 'none',
} as const;

export const toggleTrackUnchecked = {
  /** Background — transparent/white */
  background: '#ffffff',
  /** Hover */
  backgroundHover: '#f5f5f5',
  /** Border — stroke/neutral/subtle */
  border: '1px solid #dedede',
} as const;

// ─── Thumb Tokens ───────────────────────────────────────────

export const toggleThumb = {
  /** Thumb diameter */
  size: '12px',
  /** Border radius — circular */
  borderRadius: '9999px',
  /** Offset from track edge */
  offset: '2px',
} as const;

export const toggleThumbChecked = {
  /** Thumb color when on — white */
  background: '#ffffff',
} as const;

export const toggleThumbUnchecked = {
  /** Thumb color when off — foreground/neutral/tertiary */
  background: '#6f6f6f',
} as const;

// ─── Label Tokens ───────────────────────────────────────────

export const toggleLabel = {
  /** Font size — body-small (12px) */
  fontSize: '12px',
  /** Line height */
  lineHeight: '16px',
  /** Color — foreground/neutral/secondary */
  color: '#5d5d5d',
} as const;

// ─── Layout Tokens ──────────────────────────────────────────

export const toggleLayout = {
  /** Gap between label and switch — atomic/medium (6px) */
  gap: '6px',
  /** Container padding — regular/small (4px) */
  padding: '4px',
} as const;

// ─── Disabled State ─────────────────────────────────────────

export const toggleStateDisabled = {
  /** Track background (checked) */
  trackBackgroundChecked: '#ebebeb',
  /** Track background (unchecked) */
  trackBackgroundUnchecked: '#ffffff',
  /** Track border (unchecked) */
  trackBorder: '1px solid #dedede',
  /** Thumb color */
  thumbBackground: '#929292',
  /** Label color */
  labelColor: '#929292',
  /** Cursor */
  cursor: 'not-allowed',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const toggleTypography = {
  fontFamily: 'var(--f-typography-fontFamily-body)',
  letterSpacing: '0px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const toggle = {
  track: {
    size: toggleTrack,
    checked: toggleTrackChecked,
    unchecked: toggleTrackUnchecked,
  },
  thumb: {
    size: toggleThumb,
    checked: toggleThumbChecked,
    unchecked: toggleThumbUnchecked,
  },
  label: toggleLabel,
  layout: toggleLayout,
  disabled: toggleStateDisabled,
  typography: toggleTypography,
} as const;
