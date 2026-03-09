/**
 * Shared: Selected Affordance
 *
 * Design principles for communicating selected state, applied consistently
 * across Button, Tab, Toolbar, and any selectable component.
 *
 * Typographic affordance (text buttons):
 *   - Font weight: regular (400) → semibold (600)
 *   - For transparent variants: introduce backplate (#ebebeb)
 *
 * Icon-only affordance:
 *   - Icon variant: Regular → Filled
 *   - For transparent variants: introduce backplate (#ebebeb)
 */

export const selectedAffordance = {
  /** Semibold weight for selected text */
  fontWeight: '600',
  /** Regular weight for unselected text */
  fontWeightUnselected: '400',
  /** Icon variant when selected */
  iconVariant: 'Filled',
  /** Icon variant when unselected */
  iconVariantUnselected: 'Regular',
  /** Backplate for transparent (Subtle) variants — background/neutral/soft */
  backplate: '#ebebeb',
  /** Backplate hover */
  backplateHover: '#e0e0e0',
} as const;
