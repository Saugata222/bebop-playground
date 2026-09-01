/**
 * Checkbox — Interactive HTML Preview
 *
 * Ported from the One Copilot Desktop UI Kit (Figma node 1413:24050).
 * Renders the full status × state matrix for Standard and Circular styles,
 * an interactive group, and the Figma "Usage guidance" (node 1497:1481).
 */

import * as fs from 'fs';
import * as path from 'path';
import { section, stage, segControl, variants, matrix as matrixTbl, specs, usageGuidance } from './_scaffold';

// ─── Glyphs (Fluent UI System Icons, inlined from src/components/icons) ─────

// checkmark-20-filled.svg (Checked)
const CHECK = '<svg class="cb-check" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.03212 13.9072L3.56056 10.0017C3.28538 9.69214 2.81132 9.66425 2.50174 9.93944C2.19215 10.2146 2.16426 10.6887 2.43945 10.9983L6.43945 15.4983C6.72614 15.8208 7.2252 15.8355 7.53034 15.5303L18.0303 5.03033C18.3232 4.73744 18.3232 4.26256 18.0303 3.96967C17.7374 3.67678 17.2626 3.67678 16.9697 3.96967L7.03212 13.9072Z" fill="currentColor"/></svg>';
// subtract-16-filled.svg (Indeterminate)
const DASH = '<svg class="cb-dash" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8C3 7.58579 3.33579 7.25 3.75 7.25H12.25C12.6642 7.25 13 7.58579 13 8C13 8.41421 12.6642 8.75 12.25 8.75H3.75C3.33579 8.75 3 8.41421 3 8Z" fill="currentColor"/></svg>';

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
h3 { font-size: 13px; font-weight: 600; margin: 20px 0 10px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 860px; margin: 0 auto; }

/* Matrix */
.matrix { display: grid; grid-template-columns: 120px repeat(4, 1fr); gap: 4px 12px; align-items: center; background: #fff; border: 1px solid #ececec; border-radius: 12px; padding: 20px; }
.matrix__col { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; text-align: left; padding-bottom: 4px; }
.matrix__rl { font-size: 11px; font-weight: 600; color: #5d5d5d; }

/* ─── Checkbox ─── */
.cb { display: inline-flex; align-items: center; gap: 4px; position: relative; cursor: pointer; user-select: none; outline: none; border: none; background: none; font-family: inherit; }
.cb--disabled { cursor: not-allowed; }
.cb:focus-visible { border-radius: 12px; outline: 2px solid #000; outline-offset: 1px; box-shadow: 0 0 0 3px #fff; }

.cb__ind { display: flex; align-items: center; justify-content: center; padding: 8px; flex-shrink: 0; }
.cb__box { width: 16px; height: 16px; border: 1px solid transparent; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.12s, border-color 0.12s; overflow: hidden; }
.cb--standard .cb__box { border-radius: 4px; }
.cb--circular .cb__box { border-radius: 9999px; }
.cb__box svg { width: 12px; height: 12px; display: none; }

.cb__label { display: flex; align-items: center; padding: 6px 8px 6px 0; flex-shrink: 0; }
.cb__label span { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 14px; line-height: 20px; letter-spacing: 0; white-space: nowrap; }

/* Glyph visibility */
.cb--checked .cb__box .cb-check { display: block; }
.cb--indeterminate .cb__box .cb-dash { display: block; }

/* Unchecked box */
.cb--unchecked .cb__box { background: rgba(36,36,36,0); border-color: #242424; }
.cb--unchecked .cb__label span { color: #5d5d5d; }

/* Selected (checked / indeterminate) box */
.cb--checked .cb__box, .cb--indeterminate .cb__box { background: #242424; border-color: rgba(36,36,36,0); color: #fff; }
.cb--checked .cb__label span, .cb--indeterminate .cb__label span { color: #242424; }

/* Static state modifiers (showcase matrix) */
.cb--hover.cb--unchecked .cb__box { background: rgba(36,36,36,0.04); border-color: #313131; }
.cb--hover.cb--unchecked .cb__label span { color: #555555; }
.cb--pressed.cb--unchecked .cb__box { background: rgba(36,36,36,0.08); border-color: #3e3e3e; }
.cb--pressed.cb--unchecked .cb__label span { color: #4c4c4c; }
.cb--hover.cb--checked .cb__box, .cb--hover.cb--indeterminate .cb__box { background: #313131; }
.cb--hover.cb--checked .cb__label span, .cb--hover.cb--indeterminate .cb__label span { color: #181818; }
.cb--pressed.cb--checked .cb__box, .cb--pressed.cb--indeterminate .cb__box { background: #3e3e3e; }
.cb--pressed.cb--checked .cb__label span, .cb--pressed.cb--indeterminate .cb__label span { color: #0d0d0d; }

/* Disabled */
.cb--disabled.cb--unchecked .cb__box { background: rgba(36,36,36,0); border-color: #dedede; }
.cb--disabled.cb--checked .cb__box, .cb--disabled.cb--indeterminate .cb__box { background: #ebebeb; border-color: rgba(36,36,36,0); color: #929292; }
.cb--disabled .cb__label span { color: #929292; }

/* Interactive (real hover/active) */
.cb--interactive.cb--unchecked:hover .cb__box { background: rgba(36,36,36,0.04); border-color: #313131; }
.cb--interactive.cb--unchecked:hover .cb__label span { color: #555555; }
.cb--interactive:is(.cb--checked,.cb--indeterminate):hover .cb__box { background: #313131; }
.cb--interactive:is(.cb--checked,.cb--indeterminate):hover .cb__label span { color: #181818; }
.cb--interactive.cb--unchecked:active .cb__box { background: rgba(36,36,36,0.08); border-color: #3e3e3e; }
.cb--interactive:is(.cb--checked,.cb--indeterminate):active .cb__box { background: #3e3e3e; }

/* ─── Usage guidance ─── */
.usage { background: #fff; border: 1px solid #ececec; border-radius: 12px; padding: 28px 32px; margin-top: 24px; }
.usage h3 { font-size: 16px; font-weight: 600; color: #242424; margin: 22px 0 10px; }
.usage h3:first-child { margin-top: 0; }
.usage p { font-size: 14px; line-height: 1.55; color: #424242; margin-bottom: 12px; }
.usage ul { margin: 0 0 4px 20px; }
.usage li { font-size: 14px; line-height: 1.55; color: #424242; margin-bottom: 8px; }
.usage li b { color: #242424; }
.usage code { font-family: 'Cascadia Code', ui-monospace, monospace; font-size: 12.5px; background: #f5f5f5; padding: 1px 5px; border-radius: 4px; }
`;

// ─── HTML builder ───────────────────────────────────────────

type Status = 'unchecked' | 'checked' | 'indeterminate';
type State = 'rest' | 'hover' | 'pressed' | 'disabled';

function cb(opts: { status: Status; state?: State; style?: 'standard' | 'circular'; label?: string | false; interactive?: boolean }): string {
  const style = opts.style || 'standard';
  const state = opts.state || 'rest';
  const cls = ['cb', 'cb--' + opts.status, 'cb--' + style];
  if (state !== 'rest') cls.push('cb--' + state);
  if (opts.interactive) cls.push('cb--interactive');
  const disabled = state === 'disabled';
  let inner = '<span class="cb__ind"><span class="cb__box">' + CHECK + DASH + '</span></span>';
  if (opts.label !== false) {
    inner += '<span class="cb__label"><span>' + (opts.label || 'Label') + '</span></span>';
  }
  const aria = opts.status === 'indeterminate' ? 'mixed' : (opts.status === 'checked' ? 'true' : 'false');
  return '<button class="' + cls.join(' ') + '" role="checkbox" aria-checked="' + aria + '"'
    + (disabled ? ' disabled aria-disabled="true"' : '') + '>' + inner + '</button>';
}

function matrix(style: 'standard' | 'circular'): string {
  const statuses: { key: Status; label: string }[] = [
    { key: 'unchecked', label: 'Unchecked' },
    { key: 'checked', label: 'Checked' },
    { key: 'indeterminate', label: 'Indeterminate' },
  ];
  const states: State[] = ['rest', 'hover', 'pressed', 'disabled'];
  let out = '<div class="matrix">';
  out += '<div class="matrix__col"></div>';
  states.forEach(function (s) { out += '<div class="matrix__col">' + s + '</div>'; });
  statuses.forEach(function (st) {
    out += '<div class="matrix__rl">' + st.label + '</div>';
    states.forEach(function (s) {
      out += '<div>' + cb({ status: st.key, state: s, style: style }) + '</div>';
    });
  });
  out += '</div>';
  return out;
}

// ─── Usage guidance (Figma node 1497:1481) ──────────────────

const usage = usageGuidance([
  {
    h: 'Behavior',
    body:
      '<p>Checkbox is for deferred decisions. The change you make doesn\'t take effect until the surrounding form is submitted, so reach for it in settings panels, filters, and preference lists where someone reviews their choices before applying them.</p>' +
      '<p>If you need an immediate-effect toggle \u2014 like turning a feature on or off the moment someone interacts with it \u2014 use Switch instead. And if a group of options is mutually exclusive, with exactly one valid choice, use Radio. Checkbox allows zero, one, or many selections within a group.</p>' +
      '<ul>' +
      '<li><strong>Always associate a label with the checkbox.</strong> Every checkbox needs an identifiable name, whether a visible label or a programmatic association.</li>' +
      '<li><strong>Always use the Indeterminate status for parent checkboxes in a group.</strong> When some but not all children are selected, the parent must reflect the mixed state \u2014 not Checked or Unchecked.</li>' +
      '<li><strong>Never use Disabled to represent Unchecked.</strong> Disabled means the control is unavailable. Unchecked means the option exists but isn\'t selected.</li>' +
      '<li><strong>Never override the label foreground shift.</strong> The shift from secondary to primary color between Unchecked and Checked is intentional \u2014 it de-emphasizes unselected options and draws attention to selected ones.</li>' +
      '<li><strong>Always apply the correct radius token per Style.</strong> Standard uses <code>--gnrc-border-radius-base-100</code>; Circular uses <code>--gnrc-border-radius-circular</code>. Don\'t hardcode pixel values.</li>' +
      '</ul>',
  },
  {
    h: 'Layout',
    body:
      '<p>The space between the indicator and the label is governed by the gap token \u2014 don\'t add padding on the label\'s start edge to widen it. Padding belongs on the label wrapper\'s outer edges (the end side and the vertical axis), not between the indicator and label.</p>',
  },
  {
    h: 'Accessibility',
    body:
      '<ul><li><strong>Hidden label fallback.</strong> When the visible label is hidden, give the checkbox a programmatic accessible name so screen readers can announce the option. A checkbox with no accessible name is inaccessible.</li></ul>',
  },
]);

// ─── Sections ───────────────────────────────────────────────

const hero =
  '<button id="heroCb" class="cb cb--checked cb--standard" role="checkbox" aria-checked="true">' +
  '<span class="cb__ind"><span class="cb__box">' + CHECK + DASH + '</span></span>' +
  '<span class="cb__label"><span>Include this source</span></span></button>';

const controls =
  segControl('Status', 'status', [
    { value: 'unchecked', label: 'Unchecked' },
    { value: 'checked', label: 'Checked', active: true },
    { value: 'indeterminate', label: 'Mixed' },
  ]) +
  segControl('Style', 'style', [
    { value: 'standard', label: 'Standard', active: true },
    { value: 'circular', label: 'Circular' },
  ]) +
  segControl('Disabled', 'dis', [
    { value: 'off', label: 'Off', active: true },
    { value: 'on', label: 'On' },
  ]);

const statuses: { key: Status; label: string }[] = [
  { key: 'unchecked', label: 'Unchecked' },
  { key: 'checked', label: 'Checked' },
  { key: 'indeterminate', label: 'Indeterminate' },
];
const stateCols: State[] = ['rest', 'hover', 'pressed', 'disabled'];
function buildMatrix(style: 'standard' | 'circular'): string {
  return matrixTbl(
    ['Rest', 'Hover', 'Pressed', 'Disabled'],
    statuses.map((st) => ({ label: st.label, cells: stateCols.map((s) => cb({ status: st.key, state: s, style })) })),
  );
}

const interactiveGroup =
  '<div id="parentRow" style="margin-bottom:8px">' + cb({ status: 'indeterminate', label: 'Data sources', interactive: true }) + '</div>' +
  '<div id="childGroup" style="display:flex;flex-direction:column;gap:4px;padding-left:24px">' +
  cb({ status: 'checked', label: 'Chats', interactive: true }) +
  cb({ status: 'unchecked', label: 'Emails', interactive: true }) +
  cb({ status: 'checked', label: 'Meetings', interactive: true }) +
  cb({ status: 'unchecked', label: 'Files', interactive: true }) +
  '</div>';

const specTable = specs([
  { k: 'Box', v: '16 \u00d7 16 px' },
  { k: 'Standard radius', v: '4 px' },
  { k: 'Circular radius', v: '9999' },
  { k: 'Checked bg', v: '#242424' },
  { k: 'Glyph', v: 'check / subtract \u00b7 #fff' },
  { k: 'Gap', v: '4 px' },
  { k: 'Label', v: 'Segoe Sans 14/20' },
  { k: 'Label shift', v: 'secondary \u2192 primary' },
]);

const scriptTag = `
<script>
(function () {
  function setStatus(el, status) {
    el.classList.remove('cb--unchecked', 'cb--checked', 'cb--indeterminate');
    el.classList.add('cb--' + status);
    el.setAttribute('aria-checked', status === 'indeterminate' ? 'mixed' : (status === 'checked' ? 'true' : 'false'));
  }
  function statusOf(el) {
    if (el.classList.contains('cb--checked')) return 'checked';
    if (el.classList.contains('cb--indeterminate')) return 'indeterminate';
    return 'unchecked';
  }
  function syncSeg(name, val) {
    var seg = document.querySelector('[data-seg="' + name + '"]');
    if (seg) seg.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-value') === val); });
  }
  var hero = document.getElementById('heroCb');
  var st = { status: 'checked', style: 'standard', dis: false };
  function paintHero() {
    var cls = ['cb', 'cb--' + st.status, 'cb--' + st.style];
    if (st.dis) cls.push('cb--disabled');
    hero.className = cls.join(' ');
    hero.setAttribute('aria-checked', st.status === 'indeterminate' ? 'mixed' : (st.status === 'checked' ? 'true' : 'false'));
    hero.disabled = st.dis;
  }
  document.querySelectorAll('[data-ctrl]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-ctrl');
      var val = btn.getAttribute('data-value');
      if (name === 'status') st.status = val;
      else if (name === 'style') st.style = val;
      else if (name === 'dis') st.dis = val === 'on';
      var seg = document.querySelector('[data-seg="' + name + '"]');
      if (seg) seg.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      paintHero();
    });
  });
  paintHero();
  hero.addEventListener('click', function () {
    if (st.dis) return;
    st.status = st.status === 'checked' ? 'unchecked' : 'checked';
    syncSeg('status', st.status);
    paintHero();
  });
  var parent = document.querySelector('#parentRow .cb');
  var children = Array.prototype.slice.call(document.querySelectorAll('#childGroup .cb'));
  function syncParent() {
    var checked = children.filter(function (c) { return statusOf(c) === 'checked'; }).length;
    if (checked === 0) setStatus(parent, 'unchecked');
    else if (checked === children.length) setStatus(parent, 'checked');
    else setStatus(parent, 'indeterminate');
  }
  children.forEach(function (c) {
    c.addEventListener('click', function () {
      setStatus(c, statusOf(c) === 'checked' ? 'unchecked' : 'checked');
      syncParent();
    });
  });
  parent.addEventListener('click', function () {
    var next = statusOf(parent) === 'checked' ? 'unchecked' : 'checked';
    children.forEach(function (c) { setStatus(c, next); });
    setStatus(parent, next);
  });
})();
</script>`;

const body = [
  stage(hero, controls),
  section('Standard', buildMatrix('standard'), 'Status \u00d7 Rest / Hover / Pressed / Disabled'),
  section('Circular', buildMatrix('circular')),
  section('Interactive group', interactiveGroup, 'Parent reflects the mixed state when some \u2014 but not all \u2014 children are selected'),
  section('Specs', specTable),
  usage,
  scriptTag,
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Checkbox Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'checkbox.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
