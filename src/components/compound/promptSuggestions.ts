/**
 * Compound: Prompt Suggestions
 *
 * One Copilot / Bebop Design System — Type-ahead prompt autosuggestions.
 *
 * Appears when someone begins typing their own prompt, in the zero-query state
 * only (not turn N). A row of category chips sits above a list of suggested
 * prompt rows; each suggestion can optionally highlight the already-typed
 * ("matched") words so the completion reads as the emphasized part.
 *
 * Composed from primitives (reuse-first):
 *   • suggestionChips  → category chip row + `…` overflow button
 *   • tab (selected)   → the selected category chip (neutral-heavy fill + white)
 *   • menuListItem     → each prompt row (transparent, 12/10 padding, body-medium)
 *   • divider          → subtle bottom border between rows (stroke/neutral/subtle)
 *
 * Anatomy (Prompt list, top → bottom):
 *   Suggestions row  — category chips (single-select) + overflow `…`
 *   List             — stacked Prompt rows for the selected category
 *
 * Properties:
 *   Highlight:  None | Matched words (typed prefix de-emphasized)
 *   Theme:      Light | Dark
 *
 * Prefix: --p-prompt-suggestions-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Prompt suggestions (node 4146:78273)
 */

// ─── List Container ─────────────────────────────────────────

export const promptSuggestionsList = {
  /** Vertical stack */
  display: 'flex',
  flexDirection: 'column',
  /** Content is left-aligned within the block (Figma: items-start) */
  alignItems: 'flex-start',
  /** Gap between the chip row and the prompt list — base-300 (12px) */
  gap: '12px',
  /** Content width from the spec slot (Figma Suggestions frame) */
  width: '656px',
} as const;

// ─── Category Chip Row (reuses suggestionChips) ─────────────

export const promptSuggestionsChipRow = {
  /** Gap between chips — base-300 (12px) */
  gap: '12px',
} as const;

/** Category chip — outline pill (a compound tuning of suggestionChips). */
export const promptSuggestionsChip = {
  /** Surface — --gnrc-color-background-neutral-transparent */
  background: 'rgba(36,36,36,0)',
  /** Border — --gnrc-stroke-width-thin + --gnrc-color-stroke-neutral-subtle */
  border: '1px solid rgba(189,189,189,0.5)',
  /** Corner radius — --gnrc-border-radius-base-300 (12px) */
  borderRadius: '12px',
  /** Padding — --gnrc-spacing-component-base-250 (10px) */
  padding: '10px',
  /** Gap — base-100 (4px) */
  gap: '4px',
  /** Label — Functional Body Medium (Segoe Sans 14 / 20) */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '14px',
  lineHeight: '20px',
  /** Rest weight (regular); ghost semibold reserves width to avoid reflow */
  fontWeight: '420',
  fontWeightGhost: '625',
  /** Label color — --gnrc-color-foreground-neutral-secondary */
  color: '#5d5d5d',
} as const;

/**
 * Selected category chip — single-select. Reuses the Tab primitive's selected
 * affordance (tabStyleSelected): neutral-heavy fill + white label + semibold,
 * so the active category reads as a filled pill. Selecting a chip swaps the
 * suggestion list below to that category's prompts.
 */
export const promptSuggestionsChipSelected = {
  /** Fill — --gnrc-color-background-neutral-heavy (tab selected) */
  background: '#242424',
  /** Hover — neutral-heavy - lightness-hover */
  backgroundHover: '#313131',
  /** Pressed — neutral-heavy - lightness-press */
  backgroundPressed: '#3e3e3e',
  /** No visible outline when filled */
  border: '1px solid transparent',
  /** Label — --gnrc-color-foreground-neutral-onloud (white) */
  color: '#ffffff',
  /** Weight — Body Medium Strong (semibold) */
  fontWeight: '625',
} as const;

/** Overflow `…` — bare circular icon button (no border). */
export const promptSuggestionsOverflow = {
  /** More Horizontal Fluent icon */
  iconSize: '20px',
  /** Circular — --gnrc-border-radius-circular */
  borderRadius: '9999px',
  /** Inline padding — --gnrc-spacing-component-base-150 (6px) */
  paddingInline: '6px',
  /** Block padding — --gnrc-spacing-component-base-200 (8px) */
  paddingBlock: '8px',
  /** Transparent surface */
  background: 'rgba(36,36,36,0)',
  /** Icon color — --gnrc-color-foreground-neutral-tertiary */
  color: '#6f6f6f',
} as const;

// ─── Prompt Row (reuses menuListItem + divider) ─────────────

export const promptSuggestionsRow = {
  /** MenuListItem: transparent surface */
  background: 'rgba(36,36,36,0)',
  /** Gap — base-150 (6px) */
  gap: '6px',
  /** Inline padding — base-300 (12px) */
  paddingInline: '12px',
  /** Block padding — base-250 (10px) */
  paddingBlock: '10px',
  /** Corner radius — base-300 (12px) */
  borderRadius: '12px',
  /** Bottom divider — --gnrc-color-stroke-neutral-subtle (last row omits it) */
  dividerColor: 'rgba(189,189,189,0.5)',
  /** Label — Functional Body Medium (Segoe Sans 14 / 20) */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '420',
  /** Full label color — --gnrc-color-foreground-neutral-primary */
  color: '#242424',
} as const;

// ─── Matched-word Highlight ─────────────────────────────────

export const promptSuggestionsMatched = {
  /** Already-typed prefix — de-emphasized (--gnrc-color-foreground-neutral-tertiary) */
  matchedColor: '#6f6f6f',
  /** Suggested completion — emphasized (--gnrc-color-foreground-neutral-primary) */
  completionColor: '#242424',
} as const;

// ─── Theme ──────────────────────────────────────────────────

export const promptSuggestionsThemeLight = {
  /** Cell / surface — --gnrc-color-surface-neutral-near */
  surface: '#fcfcfc',
  /** Divider — stroke/neutral/subtle (light) */
  divider: '#dedede',
  /** Prompt text — primary */
  text: '#242424',
  /** Completion emphasis */
  completion: '#242424',
} as const;

export const promptSuggestionsThemeDark = {
  /** Cell / surface — neutral-heavy */
  surface: '#242424',
  /** Divider — stroke/neutral/subtle (dark) */
  divider: '#484848',
  /** Prompt text — #dedede on dark */
  text: '#dedede',
  /** Completion emphasis on dark */
  completion: '#dedede',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const promptSuggestions = {
  list: promptSuggestionsList,
  chipRow: promptSuggestionsChipRow,
  chip: promptSuggestionsChip,
  chipSelected: promptSuggestionsChipSelected,
  overflow: promptSuggestionsOverflow,
  row: promptSuggestionsRow,
  matched: promptSuggestionsMatched,
  theme: {
    light: promptSuggestionsThemeLight,
    dark: promptSuggestionsThemeDark,
  },
} as const;
