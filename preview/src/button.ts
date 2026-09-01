/**
 * Button — Complete Interactive Preview
 *
 * Full matrix: Style × Size × Layout × State × Selected
 */

import * as fs from 'fs';
import * as path from 'path';
import { section, stage, segControl, variants, matrix, specs, usageGuidance } from './_scaffold';

// Icons
const ir16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 5.50207C11.5 6.0555 11.0514 6.50414 10.4979 6.50414C9.94449 6.50414 9.49585 6.0555 9.49585 5.50207C9.49585 4.94864 9.94449 4.5 10.4979 4.5C11.0514 4.5 11.5 4.94864 11.5 5.50207ZM2 4.5C2 3.11929 3.11929 2 4.5 2H11.5C12.8807 2 14 3.11929 14 4.5V11.5C14 12.8807 12.8807 14 11.5 14H4.5C3.11929 14 2 12.8807 2 11.5V4.5ZM4.5 3C3.67157 3 3 3.67157 3 4.5V11.5C3 11.7316 3.05248 11.9509 3.1462 12.1467L6.79796 8.49499C7.46185 7.8311 8.53823 7.8311 9.20212 8.49499L12.8538 12.1467C12.9475 11.9509 13 11.7316 13 11.5V4.5C13 3.67157 12.3284 3 11.5 3H4.5ZM12.1467 12.8538L8.49501 9.2021C8.22164 8.92873 7.77843 8.92873 7.50506 9.2021L3.85333 12.8538C4.04914 12.9475 4.26844 13 4.5 13H11.5C11.7316 13 11.9509 12.9475 12.1467 12.8538Z" fill="currentColor"/></svg>';
const ir20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4C4.89543 4 4 4.89543 4 6V14C4 14.3726 4.10191 14.7215 4.27937 15.0201L8.94868 10.432C9.53227 9.85859 10.4677 9.85859 11.0513 10.432L15.7206 15.0201C15.8981 14.7215 16 14.3726 16 14V6C16 4.89543 15.1046 4 14 4H6ZM6 16H14C14.3692 16 14.7149 15.9 15.0118 15.7256L10.3504 11.1453C10.1559 10.9542 9.84409 10.9542 9.64956 11.1453L4.98824 15.7256C5.28505 15.9 5.63085 16 6 16Z" fill="currentColor"/></svg>';
const if16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 2C3.11929 2 2 3.11929 2 4.5V11.5C2 12.0096 2.15245 12.4835 2.41422 12.8787L6.79796 8.49499C7.46185 7.8311 8.53823 7.8311 9.20212 8.49499L13.5858 12.8787C13.8476 12.4835 14 12.0095 14 11.5V4.5C14 3.11929 12.8807 2 11.5 2H4.5ZM11.5 5.50207C11.5 6.0555 11.0514 6.50414 10.4979 6.50414C9.94449 6.50414 9.49585 6.0555 9.49585 5.50207C9.49585 4.94864 9.94449 4.5 10.4979 4.5C11.0514 4.5 11.5 4.94864 11.5 5.50207Z" fill="currentColor"/></svg>';
const if20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3C4.34315 3 3 4.34315 3 6V14C3 14.6495 3.20642 15.2509 3.55724 15.7419L8.94759 10.4345C9.53144 9.85964 10.4686 9.85964 11.0524 10.4345L16.4428 15.7419C16.7936 15.2509 17 14.6495 17 14V6C17 4.34315 15.6569 3 14 3H6ZM6 17C5.35372 17 4.75517 16.7956 4.26544 16.448L9.6492 11.1471C9.84381 10.9555 10.1562 10.9555 10.3508 11.1471L15.7346 16.448C15.2448 16.7956 14.6463 17 14 17H6ZM12.5 8.75C11.8096 8.75 11.25 8.19036 11.25 7.5C11.25 6.80964 11.8096 6.25 12.5 6.25C13.1904 6.25 13.75 6.80964 13.75 7.5C13.75 8.19036 13.1904 8.75 12.5 8.75Z" fill="currentColor"/></svg>';

function ico(sz: string): string {
  const is16 = sz.includes('sm') || sz.includes('ism');
  return '<span class="icon-r">' + (is16 ? ir16 : ir20) + '</span><span class="icon-f">' + (is16 ? if16 : if20) + '</span>';
}

function buildSection(title: string, cls: string): string {
  // Label wrapped for ghost-width reservation — reserves semibold width so a
  // toggle button does not resize when its label shifts regular → semibold.
  const lbl = (label: string) =>
    '<span class="b__label" data-text="' + label + '">' + label + '</span>';
  const btn = (sz: string, extra: string, label: string) =>
    '<button class="b b--' + sz + ' b--' + cls + extra + '">' + ico(sz) + lbl(label) + '</button>';
  const txt = (sz: string, extra: string, label: string) =>
    '<button class="b b--' + sz + ' b--' + cls + extra + '">' + lbl(label) + '</button>';
  const ion = (sz: string, extra: string) =>
    '<button class="b b--' + sz + ' b--' + cls + extra + '">' + ico(sz) + '</button>';
  const disBtn = (sz: string) =>
    '<button class="b b--' + sz + ' b--' + cls + '" disabled>' + ico(sz) + lbl('Disabled') + '</button>';
  const disTxt = (sz: string) =>
    '<button class="b b--' + sz + ' b--' + cls + '" disabled>' + lbl('Disabled') + '</button>';
  const disIon = (sz: string) =>
    '<button class="b b--' + sz + ' b--' + cls + '" disabled>' + ico(sz) + '</button>';

  return [
    '<div class="section">',
    '<div class="section-title">' + title + '</div>',
    '<div class="grid">',
    // Icon + Text
    '<div class="row"><span class="rl">Icon+Text</span>'
      + btn('sm', '', 'Button') + btn('md', '', 'Button') + btn('lg', '', 'Button')
      + disBtn('md') + '</div>',
    // Text only
    '<div class="row"><span class="rl">Text only</span>'
      + txt('sm', '', 'Button') + txt('md', '', 'Button') + txt('lg', '', 'Button')
      + disTxt('md') + '</div>',
    // Icon only
    '<div class="row"><span class="rl">Icon only</span>'
      + ion('ism', '') + ion('imd', '') + ion('ilg', '')
      + disIon('imd') + '</div>',
    // Selected
    '<div class="row"><span class="rl">Selected</span>'
      + btn('sm', ' sel', 'Button') + btn('md', ' sel', 'Button') + btn('lg', ' sel', 'Button')
      + ion('imd', ' sel') + '</div>',
    // Selected disabled
    '<div class="row"><span class="rl">Sel+Disabled</span>'
      + '<button class="b b--md b--' + cls + ' sel" disabled>' + ico('md') + ' Disabled</button>'
      + '<button class="b b--imd b--' + cls + ' sel" disabled>' + ico('imd') + '</button>'
      + '</div>',
    '</div></div>',
  ].join('\n');
}

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 40px; }
.section { max-width: 1000px; margin: 0 auto 48px; }
.section-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
.grid { display: flex; flex-direction: column; gap: 12px; }
.row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.rl { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 1px; width: 90px; flex-shrink: 0; }

/* === Base === */
.b { display: inline-flex; align-items: center; justify-content: center; cursor: pointer; position: relative;
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; letter-spacing: 0; transition: background 0.1s; outline: none; white-space: nowrap; }
.b svg { display: block; flex-shrink: 0; }
.b .icon-r { display: inline-flex; } .b .icon-f { display: none; }
.b.sel .icon-r { display: none; } .b.sel .icon-f { display: inline-flex; }
.b.sel { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.b:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }
/* Ghost-width reservation: label cell is sized to its semibold width so a
   toggle does not resize when the weight shifts regular -> semibold. */
.b__label { display: inline-grid; }
.b__label::after { content: attr(data-text); font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; height: 0; visibility: hidden; pointer-events: none; }

/* === Sizes (exact Figma line-heights: 16 / 20 / 22) === */
.b--sm { height: 24px; padding: 4px 8px; gap: 2px; border-radius: 8px; font-size: 12px; line-height: 16px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }
.b--sm svg { width: 16px; height: 16px; }
.b--md { height: 32px; padding: 6px 10px; gap: 4px; border-radius: 12px; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }
.b--md svg { width: 20px; height: 20px; }
.b--lg { height: 38px; padding: 8px 12px; gap: 6px; border-radius: 16px; font-size: 16px; line-height: 22px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }
.b--lg svg { width: 20px; height: 20px; }
.b--ism { width: 24px; height: 24px; padding: 4px; border-radius: 8px; }
.b--ism svg { width: 16px; height: 16px; }
.b--imd { width: 32px; height: 32px; padding: 6px; border-radius: 12px; }
.b--imd svg { width: 20px; height: 20px; }
.b--ilg { width: 40px; height: 40px; padding: 10px; border-radius: 16px; }
.b--ilg svg { width: 20px; height: 20px; }

/* Disabled foreground — --gnrc-color-foreground-neutral-disabled */
.b:disabled { cursor: not-allowed; color: rgba(0,0,0,0.427); }

/* === Subtle === */
.b--subtle { background: transparent; color: #242424; border: none; }
.b--subtle:hover:not(:disabled) { background: rgba(24,24,24,0.04); }
.b--subtle:active:not(:disabled) { background: rgba(13,13,13,0.08); }
.b--subtle.sel { background: rgba(215,215,215,0.5); }
.b--subtle.sel:hover:not(:disabled) { background: rgba(200,200,200,0.54); }
.b--subtle.sel:active:not(:disabled) { background: rgba(186,186,186,0.58); }
.b--subtle:disabled { background: transparent; }
.b--subtle.sel:disabled { background: transparent; }

/* === Outline — border = stroke-neutral-subtle === */
.b--outline { background: transparent; color: #242424; border: 1px solid rgba(189,189,189,0.5); }
.b--outline:hover:not(:disabled) { background: rgba(24,24,24,0.04); }
.b--outline:active:not(:disabled) { background: rgba(13,13,13,0.08); }
.b--outline.sel { background: rgba(215,215,215,0.5); }
.b--outline.sel:hover:not(:disabled) { background: rgba(200,200,200,0.54); }
.b--outline:disabled { background: transparent; border-color: rgba(37,37,37,0.5); }
.b--outline.sel:disabled { background: transparent; border-color: rgba(37,37,37,0.5); }

/* === Secondary — background-neutral-subtle === */
.b--secondary { background: rgba(229,229,229,0.5); color: #242424; border: none; }
.b--secondary:hover:not(:disabled) { background: rgba(212,212,212,0.54); }
.b--secondary:active:not(:disabled) { background: rgba(198,198,198,0.58); }
.b--secondary.sel { background: #242424; color: #fff; }
.b--secondary.sel:hover:not(:disabled) { background: #313131; }
.b--secondary.sel:active:not(:disabled) { background: #3e3e3e; }
.b--secondary:disabled { background: rgba(143,143,143,0.5); }
.b--secondary.sel:disabled { background: rgba(143,143,143,0.5); color: rgba(0,0,0,0.427); }

/* === Primary — background-brand-heavy === */
.b--primary { background: #242424; color: #fff; border: none; }
.b--primary:hover:not(:disabled) { background: #313131; }
.b--primary:active:not(:disabled) { background: #3e3e3e; }
.b--primary.sel { background: #242424; color: #fff; }
.b--primary.sel:hover:not(:disabled) { background: #313131; }
.b--primary:disabled { background: rgba(143,143,143,0.5); color: rgba(0,0,0,0.427); }
.b--primary.sel:disabled { background: rgba(143,143,143,0.5); color: rgba(0,0,0,0.427); }

/* === Stage / layout helpers === */
.b.no-icon .icon-r, .b.no-icon .icon-f { display: none; }
.b.no-label .b__label { display: none; }
.b--subtle.b--fh:not(:disabled) { background: rgba(24,24,24,0.04); }
.b--outline.b--fh:not(:disabled) { background: rgba(24,24,24,0.04); }
.b--secondary.b--fh:not(:disabled) { background: rgba(212,212,212,0.54); }
.b--primary.b--fh:not(:disabled) { background: #313131; }
`;

// ─── Usage guidance (Figma node 1480:6946) ──────────────────

const usageDoc = usageGuidance([
  {
    h: 'Types',
    body:
      '<p>Buttons come in two functional types \u2014 the choice is about whether the button maintains state, not about prominence.</p>' +
      '<p><strong>Standard button</strong> \u2014 Fires a single action and returns to rest. Use for submit, save, delete, and open.</p>' +
      '<p><strong>Toggle button</strong> \u2014 Fires an action and maintains a selected or unselected state. Use where an action needs to stay active, like toggling a view mode or a formatting option in a toolbar.</p>' +
      '<p>Don\'t use disabled to represent a toggled-off state. Disabled means the component is unavailable. For an inactive toggle, use the unselected state of a toggle button.</p>',
  },
  {
    h: 'Behavior',
    body:
      '<p>A button triggers a single, discrete action \u2014 submit, save, delete, open. Use it as the primary call to action on a surface, and pair it with the toggle type in toolbars and command bars where on/off behavior is needed.</p>' +
      '<p>By default, a button fires once and returns to rest. Specify the toggle type when you need the button to keep its state across activations \u2014 and when you do, communicate the selected state with the toggle\u2019s icon and label treatments rather than swapping to a disabled appearance.</p>' +
      '<p>When you place an icon on a toggle button, swap between Regular and Filled glyphs as the state changes \u2014 Regular when unselected, Filled when selected.</p>' +
      '<p>Toggle buttons need to hold their width across selection. The label weight changes from regular to semibold when selected, and that shift would otherwise resize the container. Reserve the layout space at the semibold width up front (ghost element). Standard (non-toggle) buttons don\u2019t need this.</p>',
  },
  {
    h: 'Layout',
    body:
      '<p>Use only one Primary button per surface. Multiple Primaries flatten the hierarchy and create visual noise \u2014 pick the single loudest action and demote the rest to Secondary, Outline, or Subtle.</p>' +
      '<p>The Icon and text layout is the default \u2014 the label improves discoverability. Reach for Icon only when space is tight and the icon is unambiguous on its own. Icon only changes the form factor (circular, no label) and needs both an aria-label and a visible alternative \u2014 typically a tooltip.</p>' +
      '<p>Don\u2019t mix icon sizes across button sizes. Small buttons use 16px icons; Medium and Large use 20px. Always apply the correct radius token per layout \u2014 atomic-small, atomic-medium, or atomic-large for Icon and text by size, and atomic-circular for Icon only.</p>',
  },
  {
    h: 'Accessibility',
    body:
      '<p>Icon only buttons need a paired affordance. The aria-label describes the action for screen readers; a visible alternative \u2014 usually a tooltip \u2014 supports sighted people who don\u2019t recognize the icon. State both; neither is optional.</p>' +
      '<p>When the toggle type is in use, set aria-pressed to reflect the current state so assistive technology can announce the toggle.</p>' +
      '<p>When prefers-reduced-motion: reduce is set, all button transitions should be instant. Buttons don\u2019t use scale, translate, or opacity animation; color-only transitions are acceptable under reduced motion.</p>',
  },
  {
    h: 'Content',
    body:
      '<p>Use functional typography on button labels. Buttons are interactive UI chrome, not editorial content \u2014 don\u2019t apply content-set type like Segoe Serif or other editorial styles to a button label.</p>',
  },
]);

// ─── Scaffold builders ──────────────────────────────────────

const labelSpan = (label: string) => '<span class="b__label" data-text="' + label + '">' + label + '</span>';

// Hero (Stage) — starts Primary / Medium / Icon+text / Rest
const hero = '<button id="heroBtn" class="b b--md b--primary">' + ico('md') + labelSpan('Button') + '</button>';

const controls =
  segControl('Style', 'style', [
    { value: 'subtle', label: 'Subtle' },
    { value: 'outline', label: 'Outline' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'primary', label: 'Primary', active: true },
  ]) +
  segControl('Size', 'size', [
    { value: 'sm', label: 'S' },
    { value: 'md', label: 'M', active: true },
    { value: 'lg', label: 'L' },
  ]) +
  segControl('Layout', 'layout', [
    { value: 'both', label: 'Icon + text', active: true },
    { value: 'text', label: 'Text' },
    { value: 'icon', label: 'Icon' },
  ]) +
  segControl('State', 'state', [
    { value: 'rest', label: 'Rest', active: true },
    { value: 'sel', label: 'Selected' },
    { value: 'dis', label: 'Disabled' },
  ]);

// Variant tiles
const styleTile = (style: string) =>
  '<button class="b b--md b--' + style + '">' + ico('md') + labelSpan('Button') + '</button>';
const styleTiles = [
  { label: 'Subtle', html: styleTile('subtle') },
  { label: 'Outline', html: styleTile('outline') },
  { label: 'Secondary', html: styleTile('secondary') },
  { label: 'Primary', html: styleTile('primary') },
];

const sizeTile = (sz: string, label: string) =>
  '<button class="b b--' + sz + ' b--secondary">' + ico(sz) + labelSpan(label) + '</button>';
const sizeTiles = [
  { label: 'Small', html: sizeTile('sm', 'Button') },
  { label: 'Medium', html: sizeTile('md', 'Button') },
  { label: 'Large', html: sizeTile('lg', 'Button') },
  { label: 'Text only', html: '<button class="b b--md b--secondary">' + labelSpan('Button') + '</button>' },
  { label: 'Icon only', html: '<button class="b b--imd b--secondary">' + ico('imd') + '</button>' },
];

// State matrix — rows = styles, cols = Rest / Hover / Selected / Disabled
const mCell = (style: string, extra: string) => {
  const dis = extra === 'dis';
  const cls = 'b b--md b--' + style + (dis ? '' : extra ? ' ' + extra : '');
  return '<button class="' + cls + '"' + (dis ? ' disabled' : '') + '>' + ico('md') + labelSpan('Button') + '</button>';
};
const styleRow = (label: string, style: string) => ({
  label,
  cells: [mCell(style, ''), mCell(style, 'fh'), mCell(style, 'sel'), mCell(style, 'dis')],
});
const statesMatrix = matrix(
  ['Rest', 'Hover', 'Selected', 'Disabled'],
  [styleRow('Subtle', 'subtle'), styleRow('Outline', 'outline'), styleRow('Secondary', 'secondary'), styleRow('Primary', 'primary')],
);

const specTable = specs([
  { k: 'Height', v: '24 / 32 / 40 px' },
  { k: 'Corner radius', v: '8 / 12 / 16 px' },
  { k: 'Icon size', v: '16 / 20 px' },
  { k: 'Text padding', v: '4·8 / 6·10 / 8·12' },
  { k: 'Label font', v: 'Segoe Sans · opsz 8' },
  { k: 'Rest weight', v: '420' },
  { k: 'Selected weight', v: '625' },
  { k: 'Icon-only shape', v: 'circular · square box' },
]);

const heroScript = `
<script>
(function () {
  var hero = document.getElementById('heroBtn');
  var state = { style: 'primary', size: 'md', layout: 'both', state: 'rest' };
  var iSize = { sm: 'ism', md: 'imd', lg: 'ilg' };
  function paint() {
    var sz = state.layout === 'icon' ? iSize[state.size] : state.size;
    var cls = ['b', 'b--' + sz, 'b--' + state.style];
    if (state.layout === 'text') cls.push('no-icon');
    if (state.layout === 'icon') cls.push('no-label');
    if (state.state === 'sel') cls.push('sel');
    hero.className = cls.join(' ');
    hero.disabled = state.state === 'dis';
  }
  document.querySelectorAll('[data-ctrl]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-ctrl');
      state[name] = btn.getAttribute('data-value');
      var seg = document.querySelector('[data-seg=\"' + name + '\"]');
      if (seg) seg.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      paint();
    });
  });
  paint();
  // Reference grids keep the click-to-toggle-selected affordance
  document.querySelectorAll('.bp-variants .b:not(:disabled), .bp-matrix .b:not(:disabled)').forEach(function (b) {
    b.addEventListener('click', function () { b.classList.toggle('sel'); });
  });
})();
</script>`;

const body = [
  stage(hero, controls),
  section('Styles', variants(styleTiles), 'Four emphasis levels \u2014 one Primary per surface'),
  section('Sizes & layouts', variants(sizeTiles)),
  section('States', statesMatrix, 'Hover &amp; pressed are live in the Stage above'),
  section('Specs', specTable),
  usageDoc,
  heroScript,
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Button Preview</title><style>' + css + '</style></head><body>' + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'button.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
