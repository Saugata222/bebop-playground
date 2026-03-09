/**
 * Foundation: Grid & Layout
 *
 * Bebop Design System — Breakpoints, columns, gutters, and margins.
 *
 * 6 breakpoint tiers: small → xxxLarge
 * Column counts: 4 (mobile) → 8 (tablet) → 12 (desktop sm) → 16 (desktop lg+)
 * Gutters: 16px (compact) or 24px (standard)
 */

export const breakpoint = {
  small:    { min: '320px',  max: '479px',  columns: 4,  gutter: '16px' },
  medium:   { min: '480px',  max: '767px',  columns: 8,  gutter: '16px' },
  large:    { min: '768px',  max: '1023px', columns: 12, gutter: '24px' },
  xLarge:   { min: '1024px', max: '1365px', columns: 16, gutter: '24px' },
  xxLarge:  { min: '1366px', max: '1919px', columns: 16, gutter: '24px' },
  xxxLarge: { min: '1920px', max: 'none',   columns: 16, gutter: '24px' },
} as const;

export const readingGrid = {
  maxWidth: {
    large: '800px',
    small: '448px',
  },
} as const;

export const grid = {
  breakpoint,
  readingGrid,
} as const;
