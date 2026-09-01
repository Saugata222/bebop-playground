/**
 * Component: Dropdown
 *
 * One Copilot / Bebop Design System — Single-select dropdown (combobox / listbox).
 *
 * A 32px trigger (Input) that opens a floating Popover containing a list of
 * selectable ListboxItem rows. New in One Copilot; styling maps 1:1 onto Bebop
 * foundations (transparent surface, neutral stroke ramp, functional body-medium
 * type, atomic radius/spacing, Shadow/Low elevation).
 *
 * Anatomy:
 *   Input (trigger)   — 32px row: text/placeholder + trailing chevron
 *   Popover           — white surface, revealed on open
 *   ListboxItem       — 40px row: leading icon + label, single-select
 *
 * Properties:
 *   State:      Rest | Focused/Open | Disabled
 *   Value:      Placeholder | Selected
 *
 * Prefix: --c-dropdown-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Dropdown (node 2149:4637)
 */

// ─── Input (trigger) ────────────────────────────────────────

export const dropdownInput = {
  /** Row height */
  height: '32px',
  /** Default width (consumer may override) */
  width: '232px',
  /** Surface — --gnrc-color-background-neutral-transparent */
  background: 'rgba(36,36,36,0)',
  /** Border thickness — --gnrc-stroke-width-thin */
  borderWidth: '1px',
  /** Rest border — --gnrc-color-stroke-neutral-loud */
  borderColorRest: '#6f6f6f',
  /** Focused / open border — --gnrc-color-stroke-neutral-heavy */
  borderColorActive: '#242424',
  /** Corner radius — --gnrc-border-radius-base-300 (12px) */
  borderRadius: '12px',
  /** Inline padding of the text stack — --gnrc-spacing-component-base-250 (10px) */
  paddingInline: '10px',
  /** Block padding of the text — --gnrc-spacing-component-base-150 (6px) */
  paddingBlock: '6px',
  /** Gap between text stack and trailing icon — base-250 (10px) */
  gap: '10px',
  /** Trailing icon right padding — --gnrc-spacing-component-base-150 (6px) */
  iconEndPaddingRight: '6px',
} as const;

// ─── Trailing Chevron ───────────────────────────────────────

export const dropdownChevron = {
  /** Icon size (chevron-down) */
  size: '20px',
  /** Icon color — foreground neutral tertiary */
  color: '#6f6f6f',
  /** Open-state color — foreground neutral primary */
  colorOpen: '#242424',
} as const;

// ─── Typography (Input text) ────────────────────────────────

export const dropdownTypography = {
  /** Functional / Body Medium — --gnrc-font-family-functional (Segoe Sans) */
  fontFamily: 'var(--f-typography-fontFamily-display)',
  /** --gnrc-font-size-functional-body-medium */
  fontSize: '14px',
  /** --gnrc-font-weight-functional-regular */
  fontWeight: '420',
  /** --gnrc-line-height-functional-body-medium */
  lineHeight: '20px',
  /** --gnrc-letter-spacing-functional-body-medium */
  letterSpacing: '0px',
  /** Placeholder color — --gnrc-color-foreground-neutral-tertiary */
  colorPlaceholder: '#6f6f6f',
  /** Selected value color — --gnrc-color-foreground-neutral-primary */
  colorValue: '#242424',
} as const;

// ─── Popover (surface) ──────────────────────────────────────

export const dropdownPopover = {
  /** Surface — --gnrc-color-surface-neutral-nearer */
  background: '#ffffff',
  /** Border thickness — --gnrc-stroke-width-thin */
  borderWidth: '1px',
  /** Border color — --gnrc-color-stroke-neutral-transparent */
  borderColor: 'rgba(36,36,36,0)',
  /** Corner radius — --gnrc-border-radius-base-400 (16px) */
  borderRadius: '16px',
  /** Content inset — --gnrc-spacing-component-base-200 (8px) */
  padding: '8px',
  /** Offset below the input */
  offsetTop: '4px',
  /** Elevation — Shadow/Low (contour + soft ambient + key) */
  boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.08), 0px 2px 4px 0px rgba(0,0,0,0.03), 0px 4px 6px 0px rgba(0,0,0,0.08)',
} as const;

// ─── Listbox Item ───────────────────────────────────────────

export const dropdownListboxItem = {
  /** Row height */
  height: '40px',
  /** Inline padding — --gnrc-spacing-component-base-300 (12px) */
  paddingInline: '12px',
  /** Gap between leading icon and label — base-200 (8px) */
  gap: '8px',
  /** Corner radius — --gnrc-border-radius-base-200 (8px) */
  borderRadius: '8px',
  /** Leading icon size */
  iconSize: '20px',
  /** Icon color — foreground neutral primary */
  iconColor: '#242424',
  /** Rest surface */
  backgroundRest: 'transparent',
  /** Hover surface — transparent hover tint */
  backgroundHover: 'rgba(36,36,36,0.04)',
  /** Selected surface — soft backplate */
  backgroundSelected: '#ebebeb',
  /** Label color — foreground neutral primary */
  labelColor: '#242424',
  /** Label weight — regular; selected uses semibold (625) */
  labelWeight: '420',
  labelWeightSelected: '625',
} as const;

// ─── Focus Ring ─────────────────────────────────────────────

export const dropdownFocusRing = {
  /** Outer ring width */
  outerWidth: '2px',
  /** Outer ring color */
  outerColor: '#242424',
  /** Ring offset from input edge */
  offset: '1px',
  /** Ring radius follows input radius */
  borderRadius: '12px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const dropdown = {
  input: dropdownInput,
  chevron: dropdownChevron,
  typography: dropdownTypography,
  popover: dropdownPopover,
  listboxItem: dropdownListboxItem,
  focusRing: dropdownFocusRing,
} as const;
