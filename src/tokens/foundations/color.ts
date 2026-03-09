/**
 * Foundation: Color
 *
 * Bebop Design System — HSL-based color architecture.
 *
 * The color system generates ramps from base hues at specific lightness stops.
 * Interaction states (hover, pressed) are computed via HSL lightness/alpha shifts.
 *
 * Prefix: --prmt-color-{hue}-{lightness}
 *
 * Lightness scale: 26, 30, 35, 40, 45, 48, 50, 54, 57, 66, 77, 83, 90, 94, 97, 99
 *
 * Semantic roles (from Color generics page):
 *   surface      — base page canvas  (1.1:1)
 *   background   — component containers (transparent / subtle / soft / loud / heavy)
 *   foreground   — text & icons (primary / secondary / onLoud)
 *   stroke       — borders & dividers (subtle / soft / loud)
 */

// ─── Lightness Scale ────────────────────────────────────────

export const lightnessScale = [26, 30, 35, 40, 45, 48, 50, 54, 57, 66, 77, 83, 90, 94, 97, 99] as const;

// ─── Primitive Color Ramps ──────────────────────────────────

export const neutral = {
  26:  '#242424',
  30:  '#2E2E2E',
  35:  '#383838',
  40:  '#424242',
  45:  '#4D4D4D',
  48:  '#525252',
  50:  '#575757',
  54:  '#5E5E5E',
  57:  '#666666',
  66:  '#7A7A7A',
  77:  '#9E9E9E',
  83:  '#B3B3B3',
  90:  '#CFCFCF',
  94:  '#E0E0E0',
  97:  '#F0F0F0',
  99:  '#FAFAFA',
} as const;

export const brand = {
  26:  '#6B1039',
  30:  '#7D1342',
  35:  '#93174E',
  40:  '#A91B5A',
  45:  '#BF1F66',
  48:  '#CC226D',
  50:  '#D42473',
  54:  '#DB3C83',
  57:  '#E05293',
  66:  '#E880AF',
  77:  '#F0ABCA',
  83:  '#F5C4D9',
  90:  '#F9DDE8',
  94:  '#FBEDF3',
  97:  '#FDF5F8',
  99:  '#FFFBFD',
} as const;

export const red = {
  26:  '#6B1325',
  30:  '#7F172C',
  35:  '#961B34',
  40:  '#AD1F3C',
  45:  '#C42344',
  48:  '#D0254A',
  50:  '#D9274D',
  54:  '#DE3E5E',
  57:  '#E3536F',
  66:  '#EB8294',
  77:  '#F2ABB7',
  83:  '#F6C5CD',
  90:  '#FADEE3',
  94:  '#FCEEEF',
  97:  '#FEF5F5',
  99:  '#FFFBFB',
} as const;

export const orange = {
  26:  '#6B3300',
  30:  '#7F3D00',
  35:  '#964800',
  40:  '#AD5300',
  45:  '#C45E00',
  48:  '#D06400',
  50:  '#D96A00',
  54:  '#E07C1A',
  57:  '#E58C33',
  66:  '#EDAB66',
  77:  '#F3C899',
  83:  '#F7D9B3',
  90:  '#FAEACC',
  94:  '#FDF4E6',
  97:  '#FEF9F0',
  99:  '#FFFDFB',
} as const;

export const green = {
  26:  '#0D5E1C',
  30:  '#0F6E21',
  35:  '#128227',
  40:  '#15962D',
  45:  '#18AA33',
  48:  '#1AB537',
  50:  '#1CBF3A',
  54:  '#36C64F',
  57:  '#4ECD63',
  66:  '#7DDB8C',
  77:  '#AAE8B3',
  83:  '#C4F0CA',
  90:  '#DEF7E0',
  94:  '#EEFBEF',
  97:  '#F6FDF6',
  99:  '#FCFEFC',
} as const;

export const blue = {
  26:  '#0F3B6B',
  30:  '#11467F',
  35:  '#145396',
  40:  '#1760AD',
  45:  '#1A6DC4',
  48:  '#1C74D0',
  50:  '#1E7AD9',
  54:  '#3688DE',
  57:  '#4D96E3',
  66:  '#7DB4EB',
  77:  '#AACFF2',
  83:  '#C4DEF6',
  90:  '#DEECFA',
  94:  '#EEF5FD',
  97:  '#F6FAFE',
  99:  '#FCFDFF',
} as const;

export const teal = {
  26:  '#005E5E',
  30:  '#006E6E',
  35:  '#008282',
  40:  '#009696',
  45:  '#00AAAA',
  48:  '#00B5B5',
  50:  '#00BFBF',
  54:  '#1AC6C6',
  57:  '#33CDCD',
  66:  '#66DBDB',
  77:  '#99E8E8',
  83:  '#B3F0F0',
  90:  '#CCF7F7',
  94:  '#E6FBFB',
  97:  '#F0FDFD',
  99:  '#FBFFFE',
} as const;

// ─── Static Colors ──────────────────────────────────────────

export const white = '#FFFFFF' as const;
export const black = '#000000' as const;

// ─── Transparent Primitives ─────────────────────────────────

export const neutralTransparent = {
  4:  'rgba(0, 0, 0, 0.04)',
  8:  'rgba(0, 0, 0, 0.08)',
  12: 'rgba(0, 0, 0, 0.12)',
  16: 'rgba(0, 0, 0, 0.16)',
  24: 'rgba(0, 0, 0, 0.24)',
  32: 'rgba(0, 0, 0, 0.32)',
  48: 'rgba(0, 0, 0, 0.48)',
  64: 'rgba(0, 0, 0, 0.64)',
  80: 'rgba(0, 0, 0, 0.80)',
} as const;

export const brandTransparent = {
  4:  'rgba(212, 36, 115, 0.04)',
  8:  'rgba(212, 36, 115, 0.08)',
  12: 'rgba(212, 36, 115, 0.12)',
  16: 'rgba(212, 36, 115, 0.16)',
  24: 'rgba(212, 36, 115, 0.24)',
  32: 'rgba(212, 36, 115, 0.32)',
} as const;

// ─── Generic Color Roles ────────────────────────────────────

export const colorRole = {
  surface:    { contrastTarget: '1.1:1' },
  background: { contrastTarget: '1.2:1',  variants: ['transparent', 'subtle', 'soft', 'loud', 'heavy'] },
  foreground: { contrastTarget: '7:1',    variants: ['primary', 'secondary', 'onLoud'] },
  stroke:     { contrastTarget: '3:1',    variants: ['subtle', 'soft', 'loud'] },
} as const;

// ─── Interaction Modifiers ──────────────────────────────────

export const colorInteraction = {
  lightness: {
    hover:           '+5%',
    pressed:         '+10%',
    selectedHover:   '+5%',
    selectedPressed: '+10%',
  },
  alpha: {
    hover:   '+0.04',
    pressed: '+0.08',
  },
} as const;

// ─── Aggregate Export ───────────────────────────────────────

export const color = {
  white,
  black,
  neutral,
  brand,
  red,
  orange,
  green,
  blue,
  teal,
  neutralTransparent,
  brandTransparent,
  lightnessScale,
  colorRole,
  colorInteraction,
} as const;
