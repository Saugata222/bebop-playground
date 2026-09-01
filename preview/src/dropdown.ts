/**
 * Dropdown — Interactive Preview
 *
 * One Copilot primitive (node 2149:4637). Single-select dropdown: a 32px trigger
 * that opens a floating popover of listbox items. Shows rest, focused, and open
 * states, live click-to-open, item hover/selected, and usage docs.
 *
 * Icons: exact Fluent System assets (chevron-down-20, image-20) from src/components/icons.
 * Font: Segoe Sans (functional body-medium).
 */

import * as fs from 'fs';
import * as path from 'path';
import { section, stage, segControl, variants, specs, guidance } from './_scaffold';

// ─── Icons — exact Fluent System assets ─────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
const chevronDown20 = readIcon('chevron-down-20-regular.svg');
const image20 = readIcon('image-20-regular.svg');

// ─── Markup builders ────────────────────────────────────────

function listbox(selectedIndex: number): string {
  let rows = '';
  for (let i = 0; i < 4; i++) {
    const sel = i === selectedIndex ? ' dd__item--selected' : '';
    rows += '<div class="dd__item' + sel + '" role="option"><span class="dd__item-icon">' + image20 + '</span><span class="dd__item-label">Label</span></div>';
  }
  return '<div class="dd__popover" role="listbox">' + rows + '</div>';
}

function dropdown(opts: { value?: string; state?: string; open?: boolean; selectedIndex?: number }): string {
  const value = opts.value || 'Placeholder';
  const isValue = !!opts.value;
  const cls = ['dd'];
  if (opts.state) cls.push('dd--' + opts.state);
  if (opts.open) cls.push('dd--open');

  const text = '<span class="dd__text' + (isValue ? ' dd__text--value' : '') + '">' + value + '</span>';
  const input = '<button class="dd__input" type="button" aria-haspopup="listbox" aria-expanded="' + (opts.open ? 'true' : 'false') + '">'
    + '<span class="dd__stack">' + text + '</span>'
    + '<span class="dd__chev">' + chevronDown20 + '</span>'
    + '</button>';
  const pop = opts.open ? listbox(opts.selectedIndex == null ? -1 : opts.selectedIndex) : '';
  return '<div class="' + cls.join(' ') + '">' + input + pop + '</div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 760px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }
.row { display: flex; gap: 40px; flex-wrap: wrap; align-items: flex-start; margin-bottom: 16px; }
.cell { display: flex; flex-direction: column; }

/* ─── Dropdown ─── */
.dd { position: relative; width: 232px; }

/* Input / trigger — 32px, transparent, 1px neutral-loud border, radius 12 */
.dd__input {
  display: flex; align-items: center; gap: 10px; width: 100%; height: 32px;
  background: rgba(36,36,36,0); border: 1px solid #6f6f6f; border-radius: 12px;
  padding: 0; cursor: pointer; font-family: inherit; overflow: hidden;
  transition: border-color 0.1s;
}
.dd__input:hover { border-color: #242424; }
.dd__input:focus-visible { outline: 2px solid #242424; outline-offset: 1px; border-color: #242424; }
.dd--focused .dd__input, .dd--open .dd__input { border-color: #242424; }

/* Icon-text stack — flex:1, px 10 */
.dd__stack { display: flex; align-items: center; flex: 1 0 0; min-width: 0; overflow: hidden; padding: 6px 0 6px 10px; }

/* Text — Functional / Body Medium (Segoe Sans 14 / 420 / 20) */
.dd__text {
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  font-size: 14px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; line-height: 20px; letter-spacing: 0;
  color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.dd__text--value { color: #242424; }

/* Trailing chevron — 20px, tertiary; darkens on open */
.dd__chev { display: inline-flex; width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; margin-right: 6px; transition: transform 0.15s ease, color 0.1s; }
.dd--open .dd__chev { transform: rotate(180deg); color: #242424; }

/* Popover — white, radius 16, Shadow/Low, 8px inset */
.dd__popover {
  position: absolute; top: calc(100% + 4px); left: 0; z-index: 20; width: 232px;
  background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 16px; padding: 8px;
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.08), 0px 2px 4px 0px rgba(0,0,0,0.03), 0px 4px 6px 0px rgba(0,0,0,0.08);
  display: flex; flex-direction: column;
}

/* Listbox item — 40px, icon 20 + label, radius 8 */
.dd__item {
  display: flex; align-items: center; gap: 8px; height: 40px; padding: 0 12px;
  border-radius: 8px; cursor: pointer; background: transparent; transition: background 0.1s;
}
.dd__item:hover { background: rgba(36,36,36,0.04); }
.dd__item--selected { background: #ebebeb; }
.dd__item-icon { display: inline-flex; width: 20px; height: 20px; color: #242424; flex-shrink: 0; }
.dd__item-label {
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  font-size: 14px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; line-height: 20px; color: #242424; white-space: nowrap;
}
.dd__item--selected .dd__item-label { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }

/* Give open rows vertical room in the static grid */
.cell--tall { min-height: 220px; }

/* ─── Usage docs ─── */
.usage { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }
.usage__col { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; }
.usage__col h3 { font-size: 12px; font-weight: 600; margin-bottom: 8px; }
.usage__col--do h3 { color: #0f7b0f; }
.usage__col--dont h3 { color: #b10e1c; }
.usage__col ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.usage__col li { font-size: 12px; line-height: 1.5; color: #5d5d5d; padding-left: 16px; position: relative; }
.usage__col li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 6px; border-radius: 50%; }
.usage__col--do li::before { background: #0f7b0f; }
.usage__col--dont li::before { background: #b10e1c; }
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
`;

// ─── Body markup ────────────────────────────────────────────

const controls =
  segControl('State', 'state', [
    { value: 'rest', label: 'Rest', active: true },
    { value: 'focused', label: 'Focused' },
  ]) +
  segControl('Value', 'value', [
    { value: 'placeholder', label: 'Placeholder', active: true },
    { value: 'label', label: 'Selected' },
  ]);

const stateTiles = [
  { label: 'Rest', html: dropdown({}) },
  { label: 'Focused', html: dropdown({ state: 'focused' }) },
  { label: 'Selected value', html: dropdown({ value: 'Label' }) },
];

const openExamples =
  '<div style="display:flex;gap:40px;flex-wrap:wrap;min-height:240px">' +
  '<div>' + dropdown({ open: true }) + '</div>' +
  '<div>' + dropdown({ value: 'Label', open: true, selectedIndex: 1 }) + '</div>' +
  '</div>';

const specTable = specs([
  { k: 'Trigger height', v: '32 px' },
  { k: 'Trigger radius', v: '12 px' },
  { k: 'Trigger border', v: '1px #6f6f6f' },
  { k: 'Popover radius', v: '16 px \u00b7 Shadow/Low' },
  { k: 'Item height', v: '40 px \u00b7 r8' },
  { k: 'Text', v: 'Segoe Sans 14/20' },
  { k: 'Selected weight', v: '625' },
  { k: 'Width', v: 'fills container' },
]);

const whenNote =
  '<div class="bp-usage"><div class="bp-usage__card"><div class="bp-usage__sec"><h4>When to use</h4>' +
  '<p>Let people pick a single value from a short, known set of options where the field is collapsed until needed \u2014 settings, filters, form inputs. For free text plus suggestions use a combobox; for many options or search use a picker.</p>' +
  '</div></div></div>';

const usageDos = [
  'Show a placeholder in tertiary (#6f6f6f); switch to primary (#242424) once a value is chosen.',
  'Keep the trigger 32px tall and let it stretch to its container width.',
  'Rotate the chevron and darken the border to #242424 while open.',
  'Close on select, outside click, or Esc; return focus to the trigger.',
];
const usageDonts = [
  'Use a dropdown for two options \u2014 prefer a toggle or segmented control.',
  'Put long-form or wrapping text in an item label.',
  'Nest a dropdown inside another popover row.',
  'Leave the trigger borderless \u2014 the 1px neutral-loud stroke is the affordance.',
];

const body = [
  stage('<div id="live"></div>', controls),
  section('States', variants(stateTiles)),
  section('Open', openExamples, 'Click the Stage dropdown to open it live'),
  section('Specs', specTable),
  section('Usage guidance', whenNote + '<div style="height:12px"></div>' + guidance(usageDos, usageDonts)),
].join('\n');

// ─── Interaction script ─────────────────────────────────────

const js = `
<script>
(function () {
  var live = document.getElementById('live');
  if (!live) return;
  live.innerHTML = ${JSON.stringify(dropdown({}))};
  var dd = live.querySelector('.dd');
  var input = dd.querySelector('.dd__input');
  var popHTML = ${JSON.stringify(listbox(-1))};
  function close() { dd.classList.remove('dd--open'); input.setAttribute('aria-expanded', 'false'); var p = dd.querySelector('.dd__popover'); if (p) p.remove(); }
  function open() { dd.classList.add('dd--open'); input.setAttribute('aria-expanded', 'true'); input.insertAdjacentHTML('afterend', popHTML); bind(); }
  function bind() {
    dd.querySelectorAll('.dd__item').forEach(function (it) {
      it.addEventListener('click', function (e) {
        e.stopPropagation();
        var t = dd.querySelector('.dd__text');
        t.textContent = it.querySelector('.dd__item-label').textContent;
        t.classList.add('dd__text--value');
        close();
      });
    });
  }
  input.addEventListener('click', function (e) { e.stopPropagation(); if (dd.classList.contains('dd--open')) close(); else open(); });
  document.addEventListener('click', function () { if (dd.classList.contains('dd--open')) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  document.querySelectorAll('[data-ctrl]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-ctrl');
      var val = btn.getAttribute('data-value');
      if (name === 'state') dd.classList.toggle('dd--focused', val === 'focused');
      else if (name === 'value') {
        var t = dd.querySelector('.dd__text');
        if (val === 'label') { t.textContent = 'Label'; t.classList.add('dd__text--value'); }
        else { t.textContent = 'Placeholder'; t.classList.remove('dd__text--value'); }
      }
      var seg = document.querySelector('[data-seg="' + name + '"]');
      if (seg) seg.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
    });
  });
})();
</script>`;

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Dropdown Preview</title><style>' + css + '</style></head><body>'
  + body + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'dropdown.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
