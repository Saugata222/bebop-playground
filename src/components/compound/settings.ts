/**
 * Component: Settings
 *
 * Bebop Design System — Settings dialog with tabbed navigation.
 *
 * A modal settings panel with a left navigation pane and a scrollable
 * content area. Used for Copilot chat settings including General,
 * Data controls, Agents, Personalization, and Sources tabs.
 *
 * Anatomy:
 *   Dialog surface       — 24px radius, standard shadow, white bg
 *   Title bar            — 64px, breadcrumb ("Settings > Chat settings"), dismiss ✕
 *   Nav pane             — 220px left column, vertical nav items
 *   Nav item             — 40px height, icon + label, selected state with blue pill
 *   Content area         — scrollable right column, tab-specific content
 *   Connected card       — bordered card showing a connected source
 *   Connector card       — bordered card in a 3-column grid for available connectors
 *
 * Composes: dialogSurface (shadow + radius), navItemSize (item layout),
 *           buttonStyleSubtle (dismiss/more buttons), scrollbar
 *
 * Prefix: --c-settings-{property}
 */

// ─── Dialog Surface ─────────────────────────────────────────

export const settingsSurface = {
  /** Background */
  background: '#ffffff',
  /** Border radius */
  borderRadius: '24px',
  /** Box shadow — elevation/shadow-28 */
  boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.2), 0px 14px 28px 0px rgba(0, 0, 0, 0.24)',
} as const;

// ─── Title Bar ──────────────────────────────────────────────

export const settingsTitleBar = {
  /** Height */
  height: '64px',
  /** Padding inline */
  paddingInline: '20px',
  /** Padding block */
  paddingBlock: '8px',
  /** Background */
  background: '#ffffff',
  /** Border radius (top corners match surface) */
  borderRadiusTop: '24px',
  /** Breadcrumb text color — tertiary */
  breadcrumbColor: '#616161',
  /** Breadcrumb active text color */
  breadcrumbActiveColor: '#242424',
  /** Breadcrumb font size */
  breadcrumbFontSize: '14px',
  /** Dismiss icon size */
  dismissSize: '32px',
} as const;

// ─── Nav Pane ───────────────────────────────────────────────

export const settingsNavPane = {
  /** Width */
  width: '220px',
  /** Padding top */
  paddingTop: '16px',
  /** Padding left (items) */
  paddingLeft: '20px',
  /** Background — transparent (inherits surface) */
  background: 'transparent',
} as const;

// ─── Nav Item ───────────────────────────────────────────────

export const settingsNavItem = {
  /** Height */
  height: '40px',
  /** Padding block */
  paddingBlock: '3px',
  /** Inner padding left */
  innerPaddingLeft: '10px',
  /** Inner padding right */
  innerPaddingRight: '12px',
  /** Gap — icon to label */
  gap: '8px',
  /** Border radius — inner container */
  borderRadius: '4px',
  /** Icon size */
  iconSize: '20px',
  /** Font size — body-1 (14px) */
  fontSize: '14px',
  /** Font weight */
  fontWeight: '400',
  /** Line height */
  lineHeight: '20px',
  /** Rest color */
  colorRest: '#242424',
  /** Rest background */
  backgroundRest: 'transparent',
  /** Hover background */
  backgroundHover: 'rgba(0, 0, 0, 0.04)',
} as const;

// ─── Nav Item Selected ──────────────────────────────────────

export const settingsNavItemSelected = {
  /** Selected height (taller) */
  height: '48px',
  /** Selected background */
  background: 'rgba(0, 0, 0, 0.04)',
  /** Selected border radius */
  borderRadius: '12px',
  /** Blue pill indicator width */
  pillWidth: '3px',
  /** Blue pill indicator height */
  pillHeight: '16px',
  /** Blue pill color — brand */
  pillColor: '#464feb',
  /** Blue pill border radius */
  pillRadius: '999px',
} as const;

// ─── Content Area ───────────────────────────────────────────

export const settingsContent = {
  /** Padding top */
  paddingTop: '24px',
  /** Gap between sections */
  sectionGap: '24px',
  /** Background */
  background: '#ffffff',
} as const;

// ─── Sources — Page Header ──────────────────────────────────

export const settingsSourcesHeader = {
  /** Title font size — subtitle-1 (20px) */
  titleFontSize: '20px',
  /** Title font weight — bold */
  titleFontWeight: '700',
  /** Title line height */
  titleLineHeight: '28px',
  /** Title color */
  titleColor: '#242424',
  /** Description font size — body-1 (14px) */
  descFontSize: '14px',
  /** Description color */
  descColor: '#424242',
  /** Link color — brand */
  linkColor: '#464feb',
  /** Gap between title and description */
  gap: '10px',
} as const;

// ─── Connected Source Card ──────────────────────────────────

export const settingsConnectedCard = {
  /** Padding */
  padding: '16px',
  /** Border */
  border: '1px solid #e0e0e0',
  /** Border radius */
  borderRadius: '12px',
  /** Background */
  background: '#ffffff',
  /** Logo size */
  logoSize: '32px',
  /** Gap between logo and text */
  gap: '12px',
  /** Name font size — body-1-strong (14px) */
  nameFontSize: '14px',
  /** Name font weight */
  nameFontWeight: '600',
  /** Name color */
  nameColor: '#242424',
  /** Caption font size — caption-1 (12px) */
  captionFontSize: '12px',
  /** Caption color */
  captionColor: '#424242',
  /** Caption line height */
  captionLineHeight: '16px',
} as const;

// ─── Connector Grid Card ────────────────────────────────────

export const settingsConnectorCard = {
  /** Padding */
  padding: '16px',
  /** Border */
  border: '1px solid #e0e0e0',
  /** Border radius */
  borderRadius: '12px',
  /** Background */
  background: '#ffffff',
  /** Hover background */
  backgroundHover: 'rgba(0, 0, 0, 0.04)',
  /** Icon size */
  iconSize: '20px',
  /** Name font size — body-1-strong (14px) */
  nameFontSize: '14px',
  /** Name font weight */
  nameFontWeight: '600',
  /** Name color */
  nameColor: '#242424',
  /** Gap between icon and name */
  gap: '4px',
  /** Grid columns */
  gridColumns: 3,
  /** Grid gap */
  gridGap: '16px',
} as const;

// ─── Section Title ──────────────────────────────────────────

export const settingsSectionTitle = {
  /** Font size — subtitle-2 (16px) */
  fontSize: '16px',
  /** Font weight — semibold */
  fontWeight: '600',
  /** Line height */
  lineHeight: '24px',
  /** Color */
  color: '#242424',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const settings = {
  surface: settingsSurface,
  titleBar: settingsTitleBar,
  navPane: settingsNavPane,
  navItem: settingsNavItem,
  navItemSelected: settingsNavItemSelected,
  content: settingsContent,
  sourcesHeader: settingsSourcesHeader,
  connectedCard: settingsConnectedCard,
  connectorCard: settingsConnectorCard,
  sectionTitle: settingsSectionTitle,
} as const;
