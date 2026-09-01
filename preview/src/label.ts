/**
 * Label — Interactive HTML Preview
 *
 * Ported from the One Copilot Desktop UI Kit (Figma node 2119:4448).
 * Renders the full size × weight × state matrix plus the required variant.
 *
 * Font (exact): --gnrc-font-family-functional = Segoe Sans; weights 420 / 625;
 * optical size steps by label size — Small & Medium use the "Small" optical
 * (opsz 8), Large uses the "Text" optical (opsz 12).
 */

import * as fs from 'fs';
import * as path from 'path';
import { section, stage, segControl, matrix as matrixTbl, specs } from './_scaffold';

// ─── Markup builder ─────────────────────────────────────────

function lbl(size: string, weight: string, state: string, required: boolean): string {
  const cls = ['lbl', 'lbl--' + size, 'lbl--' + weight, 'lbl--' + state];
  const star = required ? '<span class="lbl__req">*</span>' : '';
  return '<span class="' + cls.join(' ') + '"><span class="lbl__text">Label</span>' + star + '</span>';
}

function row(size: string, weight: string): string {
  return [
    '<div class="matrix__rl">' + weight + ' \u00b7 ' + size + '</div>',
    '<div>' + lbl(size, weight, 'rest', false) + '</div>',
    '<div>' + lbl(size, weight, 'disabled', false) + '</div>',
    '<div>' + lbl(size, weight, 'rest', true) + '</div>',
    '<div>' + lbl(size, weight, 'disabled', true) + '</div>',
  ].join('\n');
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 760px; margin: 0 auto; }

/* Matrix */
.matrix { display: grid; grid-template-columns: 150px repeat(4, 1fr); gap: 14px 16px; align-items: center; background: #fff; border: 1px solid #ececec; border-radius: 12px; padding: 20px 24px; }
.matrix__col { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; text-align: left; padding-bottom: 4px; }
.matrix__rl { font-size: 11px; font-weight: 600; color: #5d5d5d; }

/* ─── Label ─── */
.lbl {
  display: inline-flex; align-items: center; gap: 2px;
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  letter-spacing: 0; white-space: nowrap;
}
.lbl__text { display: inline-block; }
.lbl__req { display: inline-block; color: #a62147; }

/* Sizes — font-size / line-height + optical size axis */
.lbl--small  { font-size: 12px; line-height: 16px; }
.lbl--medium { font-size: 14px; line-height: 20px; }
.lbl--large  { font-size: 16px; line-height: 22px; }
.lbl--small,  .lbl--medium { font-variation-settings: 'opsz' 8; }
.lbl--large   { font-variation-settings: 'opsz' 12; }

/* Weights — 420 regular / 625 semibold (with matching wght axis) */
.lbl--regular.lbl--small,  .lbl--regular.lbl--medium { font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }
.lbl--regular.lbl--large   { font-weight: 420; font-variation-settings: 'opsz' 12, 'wght' 420; }
.lbl--strong.lbl--small,   .lbl--strong.lbl--medium  { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.lbl--strong.lbl--large    { font-weight: 625; font-variation-settings: 'opsz' 12, 'wght' 625; }

/* States */
.lbl--rest     { color: #242424; }
.lbl--disabled { color: rgba(0, 0, 0, 0.43); }
.lbl--disabled .lbl__req { color: rgba(0, 0, 0, 0.43); }
`;

// ─── Body markup ────────────────────────────────────────────

const hero =
  '<span id="heroLbl" class="lbl lbl--large lbl--strong lbl--rest" style="font-size:20px;line-height:26px">' +
  '<span class="lbl__text">Label</span><span class="lbl__req" style="display:none">*</span></span>';

const controls =
  segControl('Size', 'size', [
    { value: 'small', label: 'S' },
    { value: 'medium', label: 'M' },
    { value: 'large', label: 'L', active: true },
  ]) +
  segControl('Weight', 'weight', [
    { value: 'regular', label: 'Regular' },
    { value: 'strong', label: 'Strong', active: true },
  ]) +
  segControl('Required', 'required', [
    { value: 'off', label: 'Off', active: true },
    { value: 'on', label: 'On' },
  ]) +
  segControl('Disabled', 'dis', [
    { value: 'off', label: 'Off', active: true },
    { value: 'on', label: 'On' },
  ]);

const sizes = ['small', 'medium', 'large'];
const weights = ['strong', 'regular'];
function mrow(weight: string, size: string) {
  return {
    label: weight + ' \u00b7 ' + size,
    cells: [
      lbl(size, weight, 'rest', false),
      lbl(size, weight, 'disabled', false),
      lbl(size, weight, 'rest', true),
      lbl(size, weight, 'disabled', true),
    ],
  };
}
const rows: { label: string; cells: string[] }[] = [];
weights.forEach((w) => sizes.forEach((s) => rows.push(mrow(w, s))));
const statesMatrix = matrixTbl(['Rest', 'Disabled', 'Rest \u00b7 Required', 'Disabled \u00b7 Required'], rows);

const specTable = specs([
  { k: 'Sizes', v: '12 / 14 / 16 px' },
  { k: 'Line height', v: '16 / 20 / 22' },
  { k: 'Optical size', v: '8 (S/M) \u00b7 12 (L)' },
  { k: 'Regular weight', v: '420' },
  { k: 'Strong weight', v: '625' },
  { k: 'Required mark', v: '#a62147' },
  { k: 'Disabled', v: 'rgba(0,0,0,0.43)' },
  { k: 'Font', v: 'Segoe Sans' },
]);

const heroScript = `
<script>
(function () {
  var hero = document.getElementById('heroLbl');
  var star = hero.querySelector('.lbl__req');
  var st = { size: 'large', weight: 'strong', required: false, dis: false };
  function paint() {
    var state = st.dis ? 'disabled' : 'rest';
    hero.className = 'lbl lbl--' + st.size + ' lbl--' + st.weight + ' lbl--' + state;
    star.style.display = st.required ? 'inline-block' : 'none';
  }
  document.querySelectorAll('[data-ctrl]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-ctrl');
      var val = btn.getAttribute('data-value');
      if (name === 'size') st.size = val;
      else if (name === 'weight') st.weight = val;
      else if (name === 'required') st.required = val === 'on';
      else if (name === 'dis') st.dis = val === 'on';
      var seg = document.querySelector('[data-seg="' + name + '"]');
      if (seg) seg.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      paint();
    });
  });
  paint();
})();
</script>`;

const body = [
  stage(hero, controls),
  section('Size \u00d7 Weight \u00d7 State', statesMatrix),
  section('Specs', specTable),
  heroScript,
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Label Preview</title><style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'label.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
