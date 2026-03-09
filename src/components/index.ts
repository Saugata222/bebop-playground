/**
 * Component tokens — barrel export
 *
 * Bebop Design System
 *
 * Structure:
 *   shared/      — Reusable tokens (focus ring, disabled, selected affordance)
 *   primitives/  — Atomic components (button, tag, divider, tab, tabList)
 *   compound/    — Composed components (toolbar, chatInput, canvasChat, dialog, menu)
 *   icons/       — Fluent UI System Icons (SVG files)
 */

// Shared tokens
export { focusRing, disabledState, selectedAffordance } from './shared';

// Primitives
export * from './primitives';

// Compound components
export * from './compound';
