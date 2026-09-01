/**
 * Component: Teaching Notification
 *
 * One Copilot Design System — Source Discovery teaching popover.
 *
 * A rounded notification that teaches the user about connectable sources. A
 * clipped Citation Preview (three source references) sits on a soft grey plate
 * at the top, followed by a title, a body sentence, and a Skip / Connect
 * sources action row. Composes the Citation Preview and Button primitives.
 *
 * Anatomy:
 *   Container (radius 16, bg #fcfcfc, Shadow/Raised, 20px bottom padding, 320w)
 *     Image plate (320×180, bg #f0f0f0, clips a scaled Citation Preview @20,20)
 *     Text (pad 20/20/16, gap 8 — title 14/1.4 semibold, body 14/1.4 regular)
 *     Footer (h32, pt4, px20, gap8, right — Skip subtle · Connect sources heavy)
 *
 * Prefix: --c-teaching-notification-{property}
 *
 * Figma: Source Discovery — Teaching popover (node 1719:32051)
 */

// ─── Container ──────────────────────────────────────────────

export const teachingNotificationContainer = {
  /** --gnrc-border-radius-base-400 */
  borderRadius: '16px',
  /** --gnrc-color-surface-neutral-near */
  background: '#fcfcfc',
  /** --gnrc-spacing-component-base-500 */
  paddingBottom: '20px',
  /** Shadow/Raised — ambient */
  boxShadow: '0px 6px 24px 0px rgba(0,0,0,0.2)',
  /** Fixed width */
  width: '320px',
} as const;

// ─── Image plate (clips the Citation Preview) ───────────────

export const teachingNotificationPlate = {
  width: '320px',
  height: '180px',
  background: '#f0f0f0',
  overflow: 'hidden',
  /** Citation Preview offset within the plate */
  previewOffset: '20px',
} as const;

// ─── Embedded Citation Preview (scaled ~0.92) ───────────────

export const teachingNotificationPreview = {
  width: '279.53px',
  borderRadius: '22.07px',
  padding: '7.36px',
  itemGap: '2px',
  background: '#ffffff',
  boxShadow:
    '0px 7.36px 11.03px 0px rgba(0,0,0,0.08), 0px 3.68px 7.36px 0px rgba(0,0,0,0.03), 0px 0px 0.92px 0px rgba(0,0,0,0.08)',
} as const;

export const teachingNotificationPreviewItem = {
  padding: '7.36px',
  gap: '5.52px',
  borderRadius: '14.71px',
  headerGap: '7.36px',
  logoSize: '18.39px',
  logoRadius: '4.6px',
  sourceFontSize: '11.03px',
  sourceLineHeight: '14.71px',
  sourceColor: '#5d5d5d',
  titleFontSize: '12.87px',
  titleLineHeight: '18.39px',
  titleColor: '#242424',
} as const;

// ─── Text block ─────────────────────────────────────────────

export const teachingNotificationText = {
  paddingTop: '20px',
  paddingRight: '20px',
  paddingBottom: '16px',
  paddingLeft: '20px',
  gap: '8px',
  titleFontSize: '14px',
  titleLineHeight: '1.4',
  titleFontWeight: 600,
  titleColor: '#242424',
  bodyFontSize: '14px',
  bodyLineHeight: '1.4',
  bodyFontWeight: 400,
  bodyColor: '#242424',
} as const;

// ─── Footer actions ─────────────────────────────────────────

export const teachingNotificationFooter = {
  height: '32px',
  paddingTop: '4px',
  paddingInline: '20px',
  gap: '8px',
  justify: 'flex-end',
} as const;

export const teachingNotificationButton = {
  height: '32px',
  padding: '6px 10px',
  borderRadius: '12px',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 400,
} as const;

export const teachingNotificationButtonSkip = {
  /** --gnrc-color-background-neutral-subtle */
  background: '#f2f2f2',
  color: '#242424',
} as const;

export const teachingNotificationButtonConnect = {
  /** --gnrc-color-background-brand-heavy */
  background: '#242424',
  color: '#ffffff',
} as const;

// ─── Aggregate ──────────────────────────────────────────────

export const teachingNotification = {
  container: teachingNotificationContainer,
  plate: teachingNotificationPlate,
  preview: teachingNotificationPreview,
  previewItem: teachingNotificationPreviewItem,
  text: teachingNotificationText,
  footer: teachingNotificationFooter,
  button: teachingNotificationButton,
  buttonSkip: teachingNotificationButtonSkip,
  buttonConnect: teachingNotificationButtonConnect,
} as const;
