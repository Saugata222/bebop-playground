/**
 * Component: Popover
 *
 * One Copilot / Bebop Design System — Floating anchored surface with a directional beak.
 *
 * New in One Copilot. A white, rounded container that floats next to a trigger and
 * points back at it with a small arrow. Holds arbitrary content in a slot.
 *
 * Anatomy:
 *   Surface       — white, radius 16, 16px padding, Shadow/Low elevation, no visible border
 *   Content slot  — consumer-provided content (example 200×80)
 *   Beak (Arrow)  — white triangle pointing toward the anchor; 12×6 (Above/Below) or 6×12 (Left/Right)
 *
 * Properties:
 *   Position: Above | Below | Left | Right (side of the trigger the popover sits on)
 *
 * Prefix: --c-popover-{property}
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Popover (node 1413:28119)
 */

// ─── Surface ────────────────────────────────────────────────

export const popoverSurface = {
  /** Surface fill */
  background: '#ffffff',
  /** --gnrc-border-radius-base-400 */
  borderRadius: '16px',
  /** Content inset (232×112 surface wraps a 200×80 slot) */
  padding: '16px',
  /** Stroke is authored at 0% opacity — no visible border */
  border: 'none',
  /** Shadow/Low — contour + soft ambient + key */
  shadow: '0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.03), 0 4px 6px rgba(0,0,0,0.08)',
} as const;

// ─── Beak (Arrow) ───────────────────────────────────────────

export const popoverBeak = {
  /** Base length along the surface edge (Above/Below) */
  length: '12px',
  /** Protrusion depth from the edge */
  depth: '6px',
  /** Matches the surface fill so the seam is invisible */
  color: '#ffffff',
} as const;

// ─── Positions ──────────────────────────────────────────────

/** Popover above the trigger — beak on bottom edge, points down */
export const popoverPositionAbove = { placement: 'above', beakEdge: 'bottom' } as const;
/** Popover below the trigger — beak on top edge, points up */
export const popoverPositionBelow = { placement: 'below', beakEdge: 'top' } as const;
/** Popover left of the trigger — beak on right edge, points right */
export const popoverPositionLeft = { placement: 'left', beakEdge: 'right' } as const;
/** Popover right of the trigger — beak on left edge, points left */
export const popoverPositionRight = { placement: 'right', beakEdge: 'left' } as const;

// ─── Aggregate Export ───────────────────────────────────────

export const popover = {
  surface: popoverSurface,
  beak: popoverBeak,
  position: {
    above: popoverPositionAbove,
    below: popoverPositionBelow,
    left: popoverPositionLeft,
    right: popoverPositionRight,
  },
} as const;
