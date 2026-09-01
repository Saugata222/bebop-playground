/**
 * Component: Latency (AI States & Behaviors)
 *
 * One Copilot / Bebop Design System — The thinking states shown before a
 * response is successfully rendered. Latency should feel dynamic and responsive
 * so people never perceive the system as stuck or unresponsive.
 *
 * New in One Copilot; styling maps 1:1 onto Bebop foundations (content
 * paragraph-medium type, functional body-small substeps, neutral foreground
 * ramp). The animated Copilot mark is the real Figma motion asset
 * (latency-thinking-hero.gif); active labels carry a shimmer sweep.
 *
 * Anatomy:
 *   [animated Copilot mark]  [label]  [› chevron]
 *   └─ optional substep row (indented under the mark)
 *
 * Properties:
 *   Type:   Default | Agent (agent prefixes the agent name / leads with its icon)
 *   State:  Loading | Thinking | CoT | Complete | CoT complete
 *   Theme:  Light | Dark
 *
 * State behavior:
 *   Loading   — animated mark only (no label yet)
 *   Thinking  — mark + shimmering "Thinking" label (primary)
 *   CoT       — mark + shimmering step label + chevron, optional substep
 *   Complete  — static, secondary label; agent leads with its product icon
 *
 * Prefix: --c-latency-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Latency (AI states & behaviors) (node 4020:2536)
 */

// ─── Layout ─────────────────────────────────────────────────

export const latencyLayout = {
  /** Gap between animated mark and label — --gnrc-spacing-component-base-150 (6px) */
  gap: '6px',
  /** Gap in the complete state (icon ↔ label) — gap/atomic/large (8px) */
  gapComplete: '8px',
  /** Substep indent under the mark */
  substepIndent: '26px',
  /** Vertical alignment */
  align: 'center',
} as const;

// ─── Animated Mark ──────────────────────────────────────────

export const latencyMark = {
  /** Mark size in-flow */
  size: '20px',
  /** Real Figma motion asset (monochrome Copilot mark) */
  asset: 'latency-thinking-hero.gif',
} as const;

// ─── Agent Icon (complete states) ───────────────────────────

export const latencyAgentIcon = {
  /** Leading agent product icon size */
  size: '20px',
} as const;

// ─── Label ──────────────────────────────────────────────────

export const latencyLabel = {
  /** Family — --gnrc-font-family-content */
  fontFamily: "'Segoe Sans', 'Segoe UI', system-ui, sans-serif",
  /** Content Paragraph Medium — 16px */
  fontSize: '16px',
  /** Line height — --gnrc-line-height-content-paragraph-medium (28px) */
  lineHeight: '28px',
  /** Regular weight */
  fontWeight: '400',
  /** Letter spacing */
  letterSpacing: '0px',
} as const;

// ─── Substep (CoT) ──────────────────────────────────────────

export const latencySubstep = {
  /** Functional Body Small — 12px */
  fontSize: '12px',
  /** Line height — 16px */
  lineHeight: '16px',
  /** Regular weight */
  fontWeight: '420',
  /** Variable-font axes */
  variation: "'opsz' 8, 'wght' 420",
} as const;

// ─── Chevron ────────────────────────────────────────────────

export const latencyChevron = {
  /** chevron-right size */
  size: '12px',
} as const;

// ─── Theme — Light surface ──────────────────────────────────

export const latencyThemeLight = {
  /** Active label (Thinking / CoT) — --gnrc-color-foreground-neutral-primary */
  colorActive: '#242424',
  /** Completed label — --gnrc-color-foreground-neutral-secondary */
  colorComplete: '#5d5d5d',
  /** Substep — primary */
  colorSubstep: '#242424',
  /** Shimmer trough (dim) */
  shimmerDim: '#b8b8b8',
  /** Shimmer crest (bright) */
  shimmerBright: '#242424',
} as const;

// ─── Theme — Dark surface ───────────────────────────────────

export const latencyThemeDark = {
  /** Active label — foreground-neutral-primary (dark) */
  colorActive: '#ededed',
  /** Completed label — foreground-neutral-secondary (dark) */
  colorComplete: '#adadad',
  /** Substep — primary (dark) */
  colorSubstep: '#ededed',
  /** Shimmer trough (dim) */
  shimmerDim: '#6b6b6b',
  /** Shimmer crest (bright) */
  shimmerBright: '#ffffff',
} as const;

// ─── Motion ─────────────────────────────────────────────────

export const latencyMotion = {
  /** Shimmer sweep duration */
  shimmerDuration: '1.8s',
  /** Shimmer easing */
  shimmerEasing: 'linear',
  /** Gradient width (background-size) */
  shimmerSpread: '200%',
  /** Reduced-motion: drop shimmer, hold the mark still */
  reducedMotion: 'none',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const latency = {
  layout: latencyLayout,
  mark: latencyMark,
  agentIcon: latencyAgentIcon,
  label: latencyLabel,
  substep: latencySubstep,
  chevron: latencyChevron,
  theme: {
    light: latencyThemeLight,
    dark: latencyThemeDark,
  },
  motion: latencyMotion,
} as const;
