/**
 * Compound: Source Detail (L2)
 *
 * One Copilot / Bebop Design System — the level-2 detail page for a single
 * connector / source, reached from the Settings Sources list. An iteration on
 * the Source Discovery design (Figma node 1759:75932): keeps the identity,
 * About, and metadata, and adds a connected-account block, a read-only Tools
 * list, and a "Reconnect" action in the header overflow menu.
 *
 * Read-only by design: the Tools section lists what the connector exposes but
 * offers no per-tool controls.
 *
 * Composition (reuse-first):
 *   • dialog / settingsV12 modal → surface + sidebar + content pane
 *   • button (primitive)         → Disconnect + overflow icon button
 *   • menu / menuListItem        → overflow menu (Reconnect) + tool rows
 *   • avatar (primitive)         → connected-account avatar
 *   • divider (primitive)        → section rules
 *   • link (primitive)           → Website / Privacy Policy (external ↗)
 *
 * Anatomy (content pane, top → bottom):
 *   Back            — chevron-left + "Sources"
 *   Identity        — connector logo + name (Subtitle) · Disconnect · overflow (⋯ → Reconnect)
 *   Connected acct  — avatar + display name + email
 *   About           — heading + description
 *   Tools           — heading + read-only list (icon + name + description)
 *   Details         — Developer · Category · Website ↗ · Privacy Policy ↗
 *
 * Prefix: --c-source-detail-{property}
 */

// ─── Header / Identity ──────────────────────────────────────

export const sourceDetailHeader = {
  /** Connector logo footprint */
  logoSize: '32px',
  /** Name — Functional Subtitle */
  nameFontSize: '20px',
  nameLineHeight: '28px',
  nameFontWeight: '600',
  nameColor: '#242424',
  /** Gap between logo and name — base-300 */
  gap: '12px',
  /** Overflow icon button (subtle, circular) */
  overflowButtonSize: '32px',
  overflowIconSize: '20px',
} as const;

// ─── Back Affordance ────────────────────────────────────────

export const sourceDetailBack = {
  /** chevron-left glyph */
  iconSize: '20px',
  /** Label — Functional Body Medium, secondary */
  fontSize: '14px',
  lineHeight: '20px',
  color: '#5d5d5d',
  gap: '4px',
} as const;

// ─── Connected Account ──────────────────────────────────────

export const sourceDetailAccount = {
  /** Avatar diameter */
  avatarSize: '32px',
  /** Display name — Body Medium, primary */
  nameFontSize: '14px',
  nameLineHeight: '20px',
  nameColor: '#242424',
  /** Email — Body Small, secondary */
  emailFontSize: '12px',
  emailLineHeight: '16px',
  emailColor: '#5d5d5d',
  gap: '12px',
} as const;

// ─── Section Heading ────────────────────────────────────────

export const sourceDetailSectionHeading = {
  /** Functional Body Medium Strong */
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '625',
  color: '#242424',
  marginBottom: '8px',
} as const;

// ─── Body / Description ─────────────────────────────────────

export const sourceDetailBody = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#5d5d5d',
} as const;

// ─── Tools List (read-only) ─────────────────────────────────

export const sourceDetailToolRow = {
  /** Row block padding */
  paddingBlock: '8px',
  /** Gap between icon and text — base-300 */
  gap: '12px',
  /** Leading icon size + color (secondary, no fill/interaction) */
  iconSize: '20px',
  iconColor: '#5d5d5d',
  /** Tool name — Body Medium, primary */
  nameFontSize: '14px',
  nameLineHeight: '20px',
  nameColor: '#242424',
  /** Tool description — Body Small, secondary */
  descFontSize: '12px',
  descLineHeight: '16px',
  descColor: '#5d5d5d',
  /** No hover, no trailing control — informational only */
  interactive: false,
} as const;

// ─── Details Metadata ───────────────────────────────────────

export const sourceDetailMeta = {
  /** Label — Body Medium, secondary */
  labelColor: '#5d5d5d',
  /** Value — Body Medium, primary */
  valueColor: '#242424',
  fontSize: '14px',
  lineHeight: '20px',
  rowGap: '12px',
  /** External-link glyph (open ↗) */
  linkIconSize: '16px',
} as const;

// ─── Overflow Menu ──────────────────────────────────────────

export const sourceDetailOverflowMenu = {
  background: '#ffffff',
  borderRadius: '12px',
  padding: '4px',
  minWidth: '176px',
  boxShadow:
    '0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08)',
  /** Reconnect item glyph (arrow-sync) */
  itemIconSize: '20px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const sourceDetail = {
  header: sourceDetailHeader,
  back: sourceDetailBack,
  account: sourceDetailAccount,
  sectionHeading: sourceDetailSectionHeading,
  body: sourceDetailBody,
  toolRow: sourceDetailToolRow,
  meta: sourceDetailMeta,
  overflowMenu: sourceDetailOverflowMenu,
} as const;
