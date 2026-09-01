/**
 * Component: Avatar
 *
 * Bebop Design System — Circular identity mark for a person, group, bot, or entity.
 * Ported from the One Copilot Desktop UI Kit (Figma node 2149:3419).
 *
 * Anatomy:
 *   Container — circular frame (radius/circular), one of three mutually-exclusive
 *               display modes. Non-interactive: no states, no focus, no hover.
 *   Content   — Image (photo, object-cover) · Icon (Fluent Person glyph) ·
 *               Initials (1–2 uppercase characters, functional type).
 *
 * Display modes (mutually exclusive — show exactly one at runtime):
 *   Image    — photo available; fills the circle edge-to-edge, cropped to the face.
 *   Icon     — no photo; default to the Fluent Person glyph on a soft neutral fill.
 *   Initials — no photo; 1–2 uppercase characters on a soft neutral fill.
 *
 * Sizes map the container diameter to a functional type ramp and an inset padding
 * that governs the icon/initials content box (padding = (size − glyphSize) / 2):
 *   16  → Caption      · icon 12 · pad 2  (base-50)   · initials: 1 char
 *   20  → Caption      · icon 16 · pad 2  (base-50)
 *   28  → Body Small   · icon 16 · pad 6  (base-150)
 *   32  → Body Medium  · icon 24 · pad 4  (base-100)
 *   40  → Body Large   · icon 24 · pad 8  (base-200)
 *   56  → Title Small  · icon 32 · pad 12 (base-300)
 *   120 → Title Large  · icon 56 · pad 32 (layout-400)
 *
 * Non-interactive by default. If the surrounding context needs interaction
 * (open a profile card, start a chat), the wrapper element owns the interactive
 * role and the avatar inside stays decorative or informative chrome.
 *
 * Prefix: --c-avatar-{property}
 */

// ─── Shape Tokens ───────────────────────────────────────────

export const avatarShape = {
  /** Fully circular container — radius/circular */
  radius: '9999px',
  /** Soft neutral fill behind Icon and Initials modes — background/neutral/soft */
  fill: 'rgba(215,215,215,0.5)',
  /** Icon / initials foreground — foreground/neutral/primary */
  foreground: '#242424',
} as const;

// ─── Size Tokens ────────────────────────────────────────────
// size = container diameter; padding = inset around icon/initials content;
// icon = glyph box (size − 2·padding); type = functional style for initials.

export const avatarSize16 = {
  size: '16px',
  padding: '2px',
  icon: '12px',
  fontSize: '10px',
  lineHeight: '14px',
  fontWeight: '420',
  letterSpacing: '0px',
  /** Small clamps initials to a single character */
  maxInitials: 1,
} as const;

export const avatarSize20 = {
  size: '20px',
  padding: '2px',
  icon: '16px',
  fontSize: '10px',
  lineHeight: '14px',
  fontWeight: '420',
  letterSpacing: '0px',
  maxInitials: 2,
} as const;

export const avatarSize28 = {
  size: '28px',
  padding: '6px',
  icon: '16px',
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: '420',
  letterSpacing: '0px',
  maxInitials: 2,
} as const;

export const avatarSize32 = {
  size: '32px',
  padding: '4px',
  icon: '24px',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: '420',
  letterSpacing: '0px',
  maxInitials: 2,
} as const;

export const avatarSize40 = {
  size: '40px',
  padding: '8px',
  icon: '24px',
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: '420',
  letterSpacing: '0px',
  maxInitials: 2,
} as const;

export const avatarSize56 = {
  size: '56px',
  padding: '12px',
  icon: '32px',
  fontSize: '24px',
  lineHeight: '28px',
  fontWeight: '600',
  letterSpacing: '-0.15px',
  maxInitials: 2,
} as const;

export const avatarSize120 = {
  size: '120px',
  padding: '32px',
  icon: '56px',
  fontSize: '32px',
  lineHeight: '38px',
  fontWeight: '600',
  letterSpacing: '-0.15px',
  maxInitials: 2,
} as const;

// ─── Mode Tokens ────────────────────────────────────────────

/** Photo fills the circle edge-to-edge, cropped to the subject. */
export const avatarModeImage = {
  background: 'transparent',
  objectFit: 'cover',
} as const;

/** Fluent Person glyph on a soft neutral fill. */
export const avatarModeIcon = {
  background: 'rgba(215,215,215,0.5)',
  color: '#242424',
} as const;

/** 1–2 uppercase characters on a soft neutral fill. */
export const avatarModeInitials = {
  background: 'rgba(215,215,215,0.5)',
  color: '#242424',
  fontFamily: 'Segoe Sans',
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const avatar = {
  shape: avatarShape,
  size: {
    16: avatarSize16,
    20: avatarSize20,
    28: avatarSize28,
    32: avatarSize32,
    40: avatarSize40,
    56: avatarSize56,
    120: avatarSize120,
  },
  mode: {
    image: avatarModeImage,
    icon: avatarModeIcon,
    initials: avatarModeInitials,
  },
} as const;
