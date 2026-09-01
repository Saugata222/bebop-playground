/**
 * Segmented Switch — Interactive Preview
 *
 * One Copilot primitive (node 4020:2650). Track-based control with 2–5 mutually
 * exclusive segments and a sliding white indicator. Shows the Copilot
 * Chat/Cowork/Code switcher, segment counts 2–5, Equal + Mixed grid width, and
 * light + dark themes. Click a segment to slide the indicator.
 *
 * Icons: real Fluent image-20. Font: Segoe Sans.
 */

import * as fs from 'fs';
import * as path from 'path';
import { section, stage, segControl, specs, guidance } from './_scaffold';

// ─── Icon ───────────────────────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function icon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"').replace(/\n/g, '').trim();
}
const image20 = icon('image-20-regular.svg');
const chat20 = icon('chat-20-regular.svg');
const people20 = icon('people-team-20-regular.svg');
const code20 = icon('code-20-regular.svg');
const bot20 = icon('bot-20-regular.svg');

// ─── Builder ────────────────────────────────────────────────

let uid = 0;
type Seg = { label?: string; icon?: boolean; glyph?: string };

function segSwitch(segs: Seg[], selected: number, opts?: { mixed?: boolean; theme?: string; mode?: boolean; nav?: boolean }): string {
  const id = 'ss' + (uid++);
  const mixed = opts && opts.mixed;
  const mode = opts && opts.mode;
  const theme = (opts && opts.theme) || 'light';
  let items = '';
  segs.forEach((s, i) => {
    const sel = i === selected ? ' ss__seg--selected' : '';
    const iconOnly = !mode && s.icon && !s.label ? ' ss__seg--icon' : '';
    let inner = '';
    // Mode switcher: every segment carries BOTH a glyph and a label; CSS shows
    // the label on the active segment and the icon on the inactive ones.
    if (mode) inner += '<span class="ss__icon">' + (s.glyph || image20) + '</span>';
    else if (s.icon) inner += '<span class="ss__icon">' + (s.glyph || image20) + '</span>';
    if (s.label) inner += '<span class="ss__label"><span class="ss__ghost">' + s.label + '</span><span class="ss__real">' + s.label + '</span></span>';
    items += '<button class="ss__seg' + sel + iconOnly + '" data-i="' + i + '">' + inner + '</button>';
  });
  const cls = 'ss ss--' + theme + (mode ? ' ss--mode' : mixed ? ' ss--mixed' : ' ss--equal') + (opts && opts.nav ? ' ss--nav' : '');
  return '<div class="' + cls + '" id="' + id + '" data-selected="' + selected + '">'
    + '<span class="ss__indicator"></span>' + items + '</div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 28px; }
.wrap { max-width: 900px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; display: block; }
.slot { background: #fcfcfc; border-radius: 16px; padding: 40px; display: flex; justify-content: center; margin-bottom: 16px; }
.stack { display: flex; flex-direction: column; gap: 20px; }

/* ─── Segmented switch ─── */
.ss { position: relative; display: inline-flex; align-items: stretch; gap: 4px; padding: 4px; background: rgba(0,0,0,0.05); border-radius: 12px; }
.ss--equal .ss__seg { flex: 1 0 0; }
.ss__seg {
  position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; gap: 4px;
  min-width: 0; padding: 6px 12px; border: none; border-radius: 12px; background: transparent; cursor: pointer;
  color: #5d5d5d; transition: color 0.15s;
}
.ss__seg--icon { padding: 6px; }

/* Mode switcher: active segment shows its label (expands to 1fr), inactive
   segments collapse to a 32px icon-only square. */
.ss--mode .ss__seg { flex: 0 0 32px; width: 32px; padding: 6px; }
.ss--mode .ss__seg .ss__label { display: none; }
.ss--mode .ss__seg--selected { flex: 1 1 auto; width: auto; padding: 6px 12px; }
.ss--mode .ss__seg--selected .ss__label { display: inline-grid; }
.ss--mode .ss__seg--selected .ss__icon { display: none; }
.ss__seg:hover:not(.ss__seg--selected) { color: #242424; }
.ss__seg--selected { color: #242424; }
.ss__icon { display: inline-flex; width: 20px; height: 20px; flex-shrink: 0; }
.ss__icon svg { width: 20px; height: 20px; display: block; }

/* Ghost/real label so semibold selection doesn't reflow */
.ss__label { position: relative; display: inline-grid; }
.ss__ghost { visibility: hidden; font-size: 14px; font-weight: 625; line-height: 20px; grid-area: 1 / 1; }
.ss__real { grid-area: 1 / 1; font-size: 14px; font-weight: 420; line-height: 20px; white-space: nowrap; }
.ss__seg--selected .ss__real { font-weight: 625; }

/* Sliding white indicator */
.ss__indicator {
  position: absolute; z-index: 0; top: 4px; left: 4px; bottom: 4px;
  background: #fff; border: 1px solid #dedede; border-radius: 12px;
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.05);
  transition: transform 0.22s cubic-bezier(0.2,0,0,1), width 0.22s cubic-bezier(0.2,0,0,1);
}

/* ─── Dark theme ─── */
.ss--dark { background: rgba(255,255,255,0.06); }
.ss--dark .ss__seg { color: #adadad; }
.ss--dark .ss__seg:hover:not(.ss__seg--selected) { color: #fff; }
.ss--dark .ss__seg--selected { color: #fff; }
.ss--dark .ss__indicator { background: #3b3b3b; border-color: rgba(255,255,255,0.08); }
.dark-slot { background: #242424; }

/* ─── Usage ─── */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin: 16px 0 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
.usage { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.usage__col { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; }
.usage__col h3 { font-size: 12px; font-weight: 600; margin-bottom: 8px; }
.usage__col--do h3 { color: #0f7b0f; }
.usage__col--dont h3 { color: #b10e1c; }
.usage__col ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.usage__col li { font-size: 12px; line-height: 1.5; color: #5d5d5d; padding-left: 16px; position: relative; }
.usage__col li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 6px; border-radius: 50%; }
.usage__col--do li::before { background: #0f7b0f; }
.usage__col--dont li::before { background: #b10e1c; }
`;

// ─── Segment sets ───────────────────────────────────────────

const modes: Seg[] = [{ label: 'Chat' }, { label: 'Cowork' }, { label: 'Code' }];
const modeSwitcher: Seg[] = [
  { label: 'Chat', icon: true, glyph: chat20 },
  { label: 'Cowork', icon: true, glyph: people20 },
  { label: 'Code', icon: true, glyph: code20 },
  { label: 'Autopilot', icon: true, glyph: bot20 },
];
const homeAgents: Seg[] = [{ label: 'Home' }, { label: 'Agents' }];
const mixed3: Seg[] = [{ label: 'Label' }, { icon: true }, { icon: true }];
const mixed4: Seg[] = [{ label: 'Label' }, { icon: true }, { icon: true }, { icon: true }];
const equal4: Seg[] = [{ label: 'Chat' }, { label: 'Label' }, { label: 'Label' }, { label: 'Label' }];
const equal5: Seg[] = [{ label: 'Label' }, { label: 'Label' }, { label: 'Label' }, { label: 'Label' }, { label: 'Label' }];

const body = [
  stage('<div style="width:260px">' + segSwitch(modes, 0) + '</div>',
    segControl('Theme', 'theme', [
      { value: 'light', label: 'Light', active: true },
      { value: 'dark', label: 'Dark' },
    ])),

  section('Nav mode switcher',
    '<div class="bp-card" style="padding:40px;display:flex;justify-content:center"><div style="width:256px">' + segSwitch(modeSwitcher, 0, { mode: true }) + '</div></div>',
    'Active mode shows its label; the others collapse to icons'),

  section('Segment count & grid width',
    '<div class="bp-card" style="padding:28px 32px"><div class="stack">' +
    '<div><span class="rl">2 \u00b7 Equal</span><div style="width:180px">' + segSwitch(homeAgents, 0) + '</div></div>' +
    '<div><span class="rl">3 \u00b7 Equal</span><div style="width:300px">' + segSwitch(modes, 0) + '</div></div>' +
    '<div><span class="rl">3 \u00b7 Mixed (label + icons)</span>' + segSwitch(mixed3, 0, { mixed: true }) + '</div>' +
    '<div><span class="rl">4 \u00b7 Equal</span><div style="width:360px">' + segSwitch(equal4, 0) + '</div></div>' +
    '<div><span class="rl">4 \u00b7 Mixed</span>' + segSwitch(mixed4, 0, { mixed: true }) + '</div>' +
    '<div><span class="rl">5 \u00b7 Equal</span><div style="width:420px">' + segSwitch(equal5, 0) + '</div></div>' +
    '</div></div>'),

  section('Specs', specs([
    { k: 'Track padding', v: '4 px' },
    { k: 'Segment radius', v: '12 px' },
    { k: 'Indicator', v: '#fff \u00b7 1px #dedede' },
    { k: 'Slide', v: '0.22s cubic-bezier' },
    { k: 'Segments', v: '2\u20135' },
    { k: 'Selected weight', v: '625' },
    { k: 'Icon', v: '20 px' },
    { k: 'Dark track', v: 'rgba(255,255,255,0.06)' },
  ])),

  section('Usage guidance',
    '<div class="bp-usage"><div class="bp-usage__card"><div class="bp-usage__sec"><h4>When to use</h4>' +
    '<p>A segment switch toggles between 2\u20135 mutually exclusive states of a single setting or mode \u2014 in Copilot, the Chat / Cowork / Code switcher. The continuous track reinforces toggling within one control; use Tabs instead when each option reveals a different content panel.</p>' +
    '</div></div></div><div style="height:12px"></div>' +
    guidance(
      [
        'Keep exactly one segment selected; slide the indicator on change.',
        'Reserve the semibold width (ghost node) so selection doesn\'t reflow.',
        'Use Equal width for peer options; Mixed for a label + icon actions.',
        'Limit to 2\u20135 short segments.',
      ],
      [
        'Use it to switch between content views \u2014 that\'s Tabs.',
        'Exceed 5 segments or use long labels that wrap.',
        'Allow zero or multiple selected segments.',
        'Fill the track with a heavy color \u2014 the white indicator carries the weight.',
      ],
    )),
].join('\n');

// ─── Interaction: position + move the indicator ─────────────

let js = '';
js += '<script>';
js += '\n';
js += 'function layout(ss) {';
js += '\n';
js += '  var segs = ss.querySelectorAll(\'.ss__seg\');';
js += '\n';
js += '  var sel = parseInt(ss.getAttribute(\'data-selected\'), 10) || 0;';
js += '\n';
js += '  var ind = ss.querySelector(\'.ss__indicator\');';
js += '\n';
js += '  var t = segs[sel]; if (!t || !ind) return;';
js += '\n';
js += '  ind.style.width = t.offsetWidth + \'px\';';
js += '\n';
js += '  ind.style.transform = \'translateX(\' + (t.offsetLeft - 4) + \'px)\';';
js += '\n';
js += '}';
js += '\n';
js += 'document.querySelectorAll(\'.ss\').forEach(function (ss) {';
js += '\n';
js += '  layout(ss);';
js += '\n';
js += '  ss.querySelectorAll(\'.ss__seg\').forEach(function (seg) {';
js += '\n';
js += '    seg.addEventListener(\'click\', function () {';
js += '\n';
js += '      ss.querySelectorAll(\'.ss__seg\').forEach(function (s) { s.classList.remove(\'ss__seg--selected\'); });';
js += '\n';
js += '      seg.classList.add(\'ss__seg--selected\');';
js += '\n';
js += '      ss.setAttribute(\'data-selected\', seg.getAttribute(\'data-i\'));';
js += '\n';
js += '      layout(ss);';
js += '\n';
js += '    });';
js += '\n';
js += '  });';
js += '\n';
js += '});';
js += '\n';
js += 'window.addEventListener(\'resize\', function () { document.querySelectorAll(\'.ss\').forEach(layout); });';
js += '\n';
js += '</script>';

const themeScript = `
<script>
(function () {
  var canvas = document.querySelector('.bp-stage__canvas');
  var heroSs = canvas ? canvas.querySelector('.ss') : null;
  document.querySelectorAll('[data-ctrl="theme"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dark = btn.getAttribute('data-value') === 'dark';
      if (canvas) canvas.classList.toggle('bp-stage__canvas--dark', dark);
      if (heroSs) heroSs.classList.toggle('ss--dark', dark);
      var seg = document.querySelector('[data-seg="theme"]');
      if (seg) seg.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
    });
  });
})();
</script>`;

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Segmented Switch Preview</title><style>' + css + '</style></head><body>'
  + body + js + themeScript + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'segmentedSwitch.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
