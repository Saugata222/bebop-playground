/**
 * Component: Panel (Secondary Panel)
 *
 * One Copilot Design System — Right-docked secondary panel with a header and
 * scrollable content. This file covers the panel shell + the References content
 * (a list of source-reference items in file and web variants).
 *
 * Anatomy:
 *   Panel        — 360 wide, surface-neutral-near, left border, header + content
 *     Header     — 56px: title + info icon (left), dismiss (right)
 *     Content    — reference list (12px inset, 2px item gap)
 *       Item     — 336 wide, 8px padding, radius 16, transparent (hover tint)
 *         File   — icon + title / author·date + overflow / snippet
 *         Web    — favicon + source / title / url
 *       Section header — "Related results" divider label
 *
 * Themes: Light (bg #fcfcfc) · Dark (bg #242424)
 *
 * Prefix: --c-panel-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — References panel (node 4020:1718)
 */

// ─── Shell ──────────────────────────────────────────────────

export const panelShell = {
  width: '360px',
  /** surface-neutral-near */
  backgroundLight: '#fcfcfc',
  backgroundDark: '#242424',
  /** stroke-neutral-subtle (left border) */
  borderLight: 'rgba(189, 189, 189, 0.5)',
  borderDark: 'rgba(103, 103, 103, 0.5)',
} as const;

// ─── Header ─────────────────────────────────────────────────

export const panelHeader = {
  height: '56px',
  paddingInline: '12px',
  /** Title — Functional Body Medium Strong */
  titleFontFamily: 'var(--f-typography-fontFamily-display)',
  titleFontSize: '14px',
  titleLineHeight: '20px',
  titleFontWeight: '625',
  titleFontVariationSettings: "'opsz' 8, 'wght' 625",
  titleColorLight: '#242424',
  titleColorDark: '#dedede',
  /** Info icon */
  infoIconSize: '16px',
  infoColorLight: '#5d5d5d',
  infoColorDark: '#aeaeae',
  /** Dismiss — subtle circular icon button */
  dismissSize: '32px',
  dismissIconSize: '20px',
  dismissRadius: '9999px',
  dismissColorLight: '#242424',
  dismissColorDark: '#dedede',
  dismissHoverLight: 'rgba(36, 36, 36, 0.04)',
  dismissHoverDark: 'rgba(255, 255, 255, 0.06)',
} as const;

// ─── List ───────────────────────────────────────────────────

export const panelList = {
  paddingInline: '12px',
  gap: '2px',
} as const;

// ─── Reference item ─────────────────────────────────────────

export const referencesItem = {
  padding: '8px',
  borderRadius: '16px',
  width: '336px',
  /** Column gap (icon ↔ text) */
  gap: '6px',
  iconSize: '16px',
  hoverLight: 'rgba(36, 36, 36, 0.04)',
  hoverDark: 'rgba(255, 255, 255, 0.06)',
  /** Title — Functional Body Medium */
  titleFontSize: '14px',
  titleLineHeight: '20px',
  titleColorLight: '#242424',
  titleColorDark: '#dedede',
  /** Secondary (source / meta / url / snippet) — Body Small */
  secondaryFontSize: '12px',
  secondaryLineHeight: '16px',
  secondaryColorLight: '#5d5d5d',
  secondaryColorDark: '#aeaeae',
} as const;

// ─── Section header ─────────────────────────────────────────

export const panelSectionHeader = {
  /** "Related results" */
  fontSize: '12px',
  fontWeight: '625',
  fontVariationSettings: "'opsz' 8, 'wght' 625",
  paddingInline: '8px',
  paddingBlock: '8px',
  colorLight: '#5d5d5d',
  colorDark: '#aeaeae',
} as const;

// ─── CoT (Chain of Thought) content ─────────────────────────

export const cotStep = {
  /** Step row */
  padding: '4px 8px',
  borderRadius: '8px',
  width: '336px',
  gap: '2px',
  /** Status column (progress indicator) */
  statusWidth: '16px',
  statusHeight: '24px',
  /** Status ↔ title gap */
  titleGap: '8px',
  /** Body (active step): rail ↔ description */
  bodyGap: '8px',
  /** Description paragraph gap */
  descGap: '10px',
  descPaddingTop: '2px',
  descPaddingBottom: '8px',
  /** Vertical progress rail */
  railWidth: '1px',
  railColorLight: '#dedede',
  railColorDark: '#484848',
  /** Title — Functional Body Medium */
  titleFontSize: '14px',
  titleLineHeight: '20px',
  titleColorLight: '#242424',
  titleColorDark: '#dedede',
  /** Body text — Functional Body Small, secondary */
  bodyFontSize: '12px',
  bodyLineHeight: '16px',
  bodyColorLight: '#5d5d5d',
  bodyColorDark: '#aeaeae',
  /** Active bullet (filled circle) */
  bulletSize: '12px',
  bulletColorLight: '#242424',
  bulletColorDark: '#dedede',
  /** Collapsed chevron */
  chevronSize: '12px',
  chevronColorLight: '#5d5d5d',
  chevronColorDark: '#aeaeae',
} as const;

export const cotCitation = {
  /** background-neutral-subtle */
  backgroundLight: '#f2f2f2',
  backgroundDark: '#2e2e2e',
  borderRadius: '8px',
  paddingInline: '6px',
  paddingBlock: '2px',
  gap: '4px',
  iconSize: '16px',
  fontSize: '12px',
  colorLight: '#242424',
  colorDark: '#dedede',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const panel = {
  shell: panelShell,
  header: panelHeader,
  list: panelList,
  referencesItem,
  sectionHeader: panelSectionHeader,
  cot: {
    step: cotStep,
    citation: cotCitation,
  },
} as const;
