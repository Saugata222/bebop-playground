/**
 * Component: Store Card
 *
 * Bebop Design System — Agent/skill discovery card for the Extensions store.
 *
 * A card that represents an available agent or skill in the Copilot store.
 * Shows the agent icon (with tinted glass background), name, and short
 * description. Used in the "Connect more" section of the Extensions page.
 *
 * Anatomy:
 *   Container (333×110, rounded-18, 1px #dedede border, white bg)
 *     Inner row (9px gap)
 *       Icon area (54×54, rounded-12, backdrop-blur, tinted glass bg)
 *       Text column (220px)
 *         Name (14px/600 semibold, #242424)
 *         Description (14px/400 regular, #616161, 2-line clamp)
 *
 * Foundation references:
 *   Border:     strokeGeneric.thin (1px) + semantic #dedede
 *   Radius:     18px container (between radiusAtomic.large and radiusComposite.small)
 *   Color:      neutral[26] (#242424) name, #616161 description
 *   Typography: typeFunctional.bodyMediumStrong (name), typeFunctional.bodyMedium (desc)
 *
 * Prefix: --c-storeCard-{property}
 */

// ─── Container Tokens ───────────────────────────────────────

export const storeCardContainer = {
  /** Card width */
  width: '333px',
  /** Card height */
  height: '110px',
  /** Padding left */
  paddingLeft: '26px',
  /** Padding right */
  paddingRight: '24px',
  /** Padding vertical */
  paddingBlock: '17px',
  /** Border */
  border: '1px solid #dedede',
  /** Border radius — 18px */
  borderRadius: '18px',
  /** Background */
  background: '#ffffff',
} as const;

// ─── Icon Tokens ────────────────────────────────────────────

export const storeCardIcon = {
  /** Icon container size */
  size: '54px',
  /** Inner icon size */
  iconSize: '34px',
  /** Border radius — rounded-12 */
  borderRadius: '12px',
  /** Backdrop blur */
  backdropBlur: '8.4px',
  /** Border */
  border: '0.844px solid rgba(0, 0, 0, 0.05)',
  /** Box shadow */
  boxShadow: '0px 1.688px 6.75px 0px rgba(0, 0, 0, 0.05)',
  /** Gap to text column */
  gapToText: '9px',
} as const;

// ─── Text Tokens ────────────────────────────────────────────

export const storeCardText = {
  /** Text column width */
  width: '220px',
  /** Name — typeFunctional.bodyMediumStrong */
  nameFontSize: '14px',
  nameFontWeight: '600',
  nameLineHeight: '20px',
  nameColor: '#242424',
  /** Description — typeFunctional.bodyMedium */
  descFontSize: '14px',
  descFontWeight: '400',
  descLineHeight: '20px',
  descColor: '#616161',
  /** Description max height (2 lines) */
  descMaxHeight: '40px',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const storeCard = {
  container: storeCardContainer,
  icon: storeCardIcon,
  text: storeCardText,
} as const;
