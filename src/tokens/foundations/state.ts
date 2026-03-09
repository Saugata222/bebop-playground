/**
 * Foundation: State
 *
 * Bebop Design System — Interaction state affordance patterns.
 *
 * This is a design guideline definition, not numerical token values.
 * State tokens describe which visual strategies to apply per interaction type.
 *
 * Affordance types:
 *   structural  — built-in indicator (checkbox, radio, switch)
 *   container   — backplate / surface color change
 *   typographic — semibold weight shift
 *   iconOnly    — icon fill toggle + color shift
 *
 * Accessibility target: 3:1 contrast ratio from rest state
 */

export const stateAffordance = {
  structural: {
    description: 'Built-in selection indicator (checkbox, radio, switch)',
    contrastFromRest: '3:1',
    useSemibold: false,
  },
  container: {
    singleSelect: {
      description: 'Backplate/surface color change + semibold text + filled icon',
      contrastFromRest: '3:1',
      useSemibold: true,
      useFilledIcon: true,
    },
    multiSelect: {
      description: 'Checkbox in reserved slot + backplate color change',
      contrastFromRest: '3:1',
      useSemibold: false,
      useFilledIcon: false,
    },
  },
  typographic: {
    description: 'Semibold text transformation for selected state',
    contrastFromRest: '3:1',
    useSemibold: true,
  },
  iconOnly: {
    description: 'Icon fill toggle (regular → filled) + accessible color shift',
    contrastFromRest: '3:1',
    useFilledIcon: true,
  },
} as const;

export const additionalAffordances = [
  'tintOrSubtleChange',
  'iconographyChange',
  'surfaceOrElevationChange',
  'motionOrToggleShift',
  'messagingOrStatusText',
  'silence',
  'dimFadeFocus',
  'opacityOrVisibilityShift',
  'elevationChange',
  'hapticOrAuditoryFeedback',
  'cursorChange',
] as const;

export const state = {
  stateAffordance,
  additionalAffordances,
} as const;
