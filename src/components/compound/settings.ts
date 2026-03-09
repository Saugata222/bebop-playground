/**
 * Component: Settings
 *
 * Bebop Design System — Settings dialog with tabbed navigation.
 *
 * Fully styled in the Bebop design language:
 *   - 16px surface radius + standard shadow (not Rocksteady 24px/shadow-28)
 *   - 56px header (not 64px)
 *   - Bebop nav items: 36px, 12px radius, #ebebeb selected backplate
 *     with semibold text (selectedAffordance pattern, no blue pill)
 *   - Nav pane has right border #dedede (like main Copilot nav)
 *   - #dedede card borders (not #e0e0e0)
 *   - #5d5d5d secondary text (not #424242)
 *   - Link color #242424 underlined (not brand blue)
 *   - Section titles use body-medium-strong (14px/600, not 16px)
 *
 * Composes: dialogSurface, navItemSize, selectedAffordance,
 *           buttonStyleSubtle, scrollbar
 *
 * Prefix: --c-settings-{property}
 */

// ─── Dialog Surface ─────────────────────────────────────────

export const settingsSurface = {
  /** Background */
  background: '#ffffff',
  /** Border radius — Bebop dialog (16px) */
  borderRadius: '16px',
  /** Box shadow — Bebop dialog elevation */
  boxShadow: '0px 12px 48px 0px rgba(0, 0, 0, 0.24), 0px 0px 3px 0px rgba(0, 0, 0, 0.03)',
} as const;

// ─── Header Bar ─────────────────────────────────────────────

export const settingsHeader = {
  /** Height — matches Bebop shell header */
  height: '56px',
  /** Padding inline */
  paddingInline: '20px',
  /** Gap */
  gap: '8px',
  /** Background */
  background: '#ffffff',
  /** Breadcrumb rest color — foreground/neutral/secondary */
  breadcrumbColor: '#5d5d5d',
  /** Breadcrumb active color — primary */
  breadcrumbActiveColor: '#242424',
  /** Font size — body-medium */
  fontSize: '14px',
  /** Dismiss — Bebop action button (32px, circular, subtle) */
  dismissSize: '32px',
} as const;

// ─── Nav Pane ───────────────────────────────────────────────

export const settingsNavPane = {
  /** Width */
  width: '220px',
  /** Padding — matches Bebop nav container */
  padding: '8px 6px',
  /** Gap between items */
  gap: '0px',
  /** Border right — Bebop nav separator */
  borderRight: '1px solid #dedede',
} as const;

// ─── Nav Item (Bebop pattern) ───────────────────────────────

export const settingsNavItem = {
  /** Min height — Bebop nav item */
  minHeight: '36px',
  /** Padding */
  paddingBlock: '6px',
  paddingLeft: '12px',
  paddingRight: '10px',
  /** Gap — icon to label */
  gap: '8px',
  /** Border radius — Bebop atomic/medium */
  borderRadius: '12px',
  /** Icon size */
  iconSize: '20px',
  /** Font size — body-medium */
  fontSize: '14px',
  /** Font weight rest */
  fontWeight: '400',
  /** Font weight selected — semibold (selectedAffordance) */
  fontWeightSelected: '600',
  /** Line height */
  lineHeight: '1.4',
  /** Color */
  color: '#242424',
  /** Background rest — transparent */
  backgroundRest: 'transparent',
  /** Background hover — 4% overlay */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Background selected — Bebop selectedAffordance backplate */
  backgroundSelected: '#ebebeb',
  /** Background selected hover */
  backgroundSelectedHover: '#e1e1e1',
} as const;

// ─── Content Area ───────────────────────────────────────────

export const settingsContent = {
  /** Padding */
  padding: '20px 24px',
  /** Gap between sections */
  sectionGap: '24px',
} as const;

// ─── Sources — Page Header ──────────────────────────────────

export const settingsSourcesHeader = {
  /** Title font size — Bebop functional subtitle */
  titleFontSize: '20px',
  /** Title font weight — semibold (not bold) */
  titleFontWeight: '600',
  /** Title line height */
  titleLineHeight: '28px',
  /** Title color */
  titleColor: '#242424',
  /** Description font size — body-medium */
  descFontSize: '14px',
  /** Description color — secondary */
  descColor: '#5d5d5d',
  /** Link color — primary with underline (Bebop, not brand blue) */
  linkColor: '#242424',
  /** Gap */
  gap: '8px',
} as const;

// ─── Connected Source Card ──────────────────────────────────

export const settingsConnectedCard = {
  /** Padding */
  padding: '16px',
  /** Border — Bebop stroke/neutral/subtle */
  border: '1px solid #dedede',
  /** Border radius — atomic/medium */
  borderRadius: '12px',
  /** Background */
  background: '#ffffff',
  /** Logo size */
  logoSize: '32px',
  /** Gap */
  gap: '12px',
  /** Name — body-medium-strong */
  nameFontSize: '14px',
  nameFontWeight: '600',
  nameColor: '#242424',
  /** Caption */
  captionFontSize: '12px',
  captionColor: '#5d5d5d',
} as const;

// ─── Connector Grid Card ────────────────────────────────────

export const settingsConnectorCard = {
  /** Padding */
  padding: '16px',
  /** Border — Bebop stroke/neutral/subtle */
  border: '1px solid #dedede',
  /** Border radius — atomic/medium */
  borderRadius: '12px',
  /** Background */
  background: '#ffffff',
  /** Hover — Bebop transparent hover */
  backgroundHover: 'rgba(36, 36, 36, 0.04)',
  /** Icon size */
  iconSize: '20px',
  /** Name */
  nameFontSize: '14px',
  nameFontWeight: '600',
  nameColor: '#242424',
  /** Gap between icon and name */
  gap: '4px',
  /** Grid */
  gridColumns: 3,
  gridGap: '12px',
} as const;

// ─── Section Title ──────────────────────────────────────────

export const settingsSectionTitle = {
  /** Font size — body-medium-strong (Bebop, not subtitle) */
  fontSize: '14px',
  /** Font weight — semibold */
  fontWeight: '600',
  /** Line height */
  lineHeight: '1.4',
  /** Color */
  color: '#242424',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const settings = {
  surface: settingsSurface,
  header: settingsHeader,
  navPane: settingsNavPane,
  navItem: settingsNavItem,
  content: settingsContent,
  sourcesHeader: settingsSourcesHeader,
  connectedCard: settingsConnectedCard,
  connectorCard: settingsConnectorCard,
  sectionTitle: settingsSectionTitle,
} as const;
