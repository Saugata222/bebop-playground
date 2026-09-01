/**
 * Component: Prompt Lab
 *
 * One Copilot / Bebop Design System — the prompt discovery modal.
 *
 * Opens from the suggestion-prompt overflow (the "…" after the zero-state
 * chips). A large elevated dialog for browsing, searching, and saving prompts,
 * organized by a left sidebar (Suggested / Find prompts / Saved / Shared, then
 * Topics, then Agent prompts) with a scrollable prompt list on the right.
 *
 * Anatomy:
 *   Overlay      — dims the shell behind
 *   Surface      — radius 24, Shadow/Highest, 24px padding
 *   Header       — "Prompt Lab" title + dismiss (X)
 *   Sidebar      — nav rows (menuListItem) + section headers
 *   Prompt list  — rows: category label + question title + attribution +
 *                  bookmark (on hover), divided by hairlines
 *
 * Reused primitives: Dialog surface, Menu/menuListItem (sidebar), Button
 * (dismiss / bookmark), Divider.
 *
 * Prefix: --c-promptLab-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Prompt Lab (page 26234:111404;
 *        node 27514:24045)
 */

// ─── Surface ────────────────────────────────────────────────

export const promptLabSurface = {
  /** --gnrc-color-surface-neutral-near */
  background: '#ffffff',
  /** --gnrc-border-radius-base-600 (24px) */
  borderRadius: '24px',
  /** Shadow/Highest */
  boxShadow: '0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.03), 0 32px 48px rgba(0,0,0,0.08)',
  /** --gnrc-padding-relaxed-medium (24px) */
  padding: '24px',
} as const;

// ─── Header ─────────────────────────────────────────────────

export const promptLabHeader = {
  /** Title — display semibold, ~26px */
  titleFontSize: '26px',
  titleFontWeight: '600',
  titleLineHeight: '32px',
  /** --gnrc-color-foreground-neutral-primary */
  titleColor: '#242424',
  /** Dismiss — Button icon-only Subtle Medium */
  dismiss: 'dismiss-20-regular',
} as const;

// ─── Sidebar ────────────────────────────────────────────────

export const promptLabSidebar = {
  /** Nav/Nav Column Width */
  width: '180px',
  /** Nav/Nav Item Spacing */
  gap: '4px',
  /** Nav row (reuses menuListItem) */
  item: {
    height: '32px',
    padding: '6px 8px',
    gap: '8px',
    borderRadius: '8px',
    iconSize: '20px',
    /** Body Medium 14/20 */
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '420',
    /** Rest color */
    color: '#242424',
    /** Selected backplate — --gnrc-color-background-neutral-soft */
    backgroundSelected: '#ebebeb',
    /** Hover */
    backgroundHover: 'rgba(36,36,36,0.04)',
  },
  /** Section header — Body Small, tertiary */
  sectionHeader: {
    fontSize: '12px',
    lineHeight: '16px',
    color: '#6f6f6f',
    marginTop: '12px',
  },
  /** Muted link ("Show all") */
  mutedColor: '#6f6f6f',
} as const;

// ─── Prompt List Item ───────────────────────────────────────

export const promptLabItem = {
  /** Row padding */
  padding: '16px 0',
  /** Category label — Functional Body Small, tertiary */
  category: { fontSize: '12px', lineHeight: '16px', color: '#6f6f6f' },
  /** Question title — ~20px / 28px, primary */
  title: {
    fontFamily: 'var(--f-typography-fontFamily-body)',
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: '400',
    color: '#242424',
    marginBlock: '4px',
  },
  /** Attribution — Functional Body Small, tertiary */
  attribution: { fontSize: '12px', lineHeight: '16px', color: '#6f6f6f' },
  /** Bookmark affordance (hover) */
  bookmark: 'bookmark-20-regular',
  /** Divider between items — --gnrc-color-stroke-neutral-subtle */
  dividerColor: '#dedede',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const promptLab = {
  surface: promptLabSurface,
  header: promptLabHeader,
  sidebar: promptLabSidebar,
  item: promptLabItem,
} as const;
