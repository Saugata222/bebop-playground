/**
 * Tag — Interactive HTML Preview
 *
 * Aligned to the One Copilot Desktop UI Kit (Figma node 11328:125711).
 * Renders the full Layout × Size × Selected × State matrix plus the Figma
 * "Usage guidance" (node 1510:743). The whole tag surface is the dismiss
 * target; all icons use the Regular style (no filled variant).
 */

import * as fs from 'fs';
import * as path from 'path';
import { section, stage, segControl, variants, matrix as matrixTbl, specs, usageGuidance } from './_scaffold';

// ─── Glyphs (Fluent UI System Icons, read from src/components/icons) ─────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function icon(file: string, size: number): string {
  return fs.readFileSync(path.join(iconsDir, file), 'utf-8')
    .replace(/<\?xml[^>]*>/, '')
    .replace(/width="\d+"/, 'width="' + size + '"')
    .replace(/height="\d+"/, 'height="' + size + '"')
    .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"')
    .trim();
}
// Dismiss = Fluent Dismiss/20 rendered at 12px. Leading = Fluent Image 16 / 20.
const DISMISS = icon('dismiss-20-regular.svg', 12);
const IMAGE16 = icon('image-16-regular.svg', 16);
const IMAGE20 = icon('image-20-regular.svg', 20);

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 880px; margin: 0 auto; }

/* Matrix */
.matrix { display: grid; grid-template-columns: 150px repeat(4, 1fr); gap: 16px 12px; align-items: center; background: #fff; border: 1px solid #ececec; border-radius: 12px; padding: 24px; }
.matrix__col { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; }
.matrix__rl { font-size: 11px; font-weight: 600; color: #5d5d5d; }
.cell { display: flex; align-items: center; }

/* ─── Tag ─── */
.tag { display: inline-flex; align-items: center; justify-content: center; position: relative; border: none; font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; letter-spacing: 0; cursor: pointer; transition: background 0.1s, opacity 0.15s, transform 0.15s; }
.tag--sm { padding: 4px 8px; gap: 4px; border-radius: 8px; font-size: 12px; line-height: 16px; }
.tag--md { padding: 6px 10px; gap: 4px; border-radius: 12px; font-size: 14px; line-height: 20px; }
.tag--sm-io { padding: 4px; gap: 0; border-radius: 9999px; }
.tag--md-io { padding: 6px; gap: 2px; border-radius: 9999px; }

/* Label — semibold ghost reserves width so Selected never reflows */
.tag__label { position: relative; display: inline-flex; }
.tag__label .ghost { font-weight: 625; white-space: nowrap; opacity: 0; }
.tag__label .vis { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-weight: 420; white-space: nowrap; }
.tag--selected .tag__label .vis { font-weight: 625; }

/* Icon slots */
.tag__lead { display: inline-flex; align-items: center; justify-content: center; padding: 2px; }
.tag__dismiss { display: inline-flex; align-items: center; justify-content: center; }
.tag svg { display: block; }

/* States */
.tag--rest { background: #242424; color: #fff; }
.tag--hover { background: #313131; color: #fff; }
.tag--pressed { background: #3e3e3e; color: #fff; }
.tag--disabled { background: #c7c7c7; color: #929292; cursor: not-allowed; }

/* Live interactive */
.tag--live:hover { background: #313131; }
.tag--live:active { background: #3e3e3e; }
.tag.removing { opacity: 0; transform: scale(0.9); }

/* Usage guidance */
.usage { background: #fff; border: 1px solid #ececec; border-radius: 12px; padding: 28px 32px; margin-top: 24px; }
.usage h3 { font-size: 16px; font-weight: 600; color: #242424; margin: 22px 0 10px; }
.usage h3:first-child { margin-top: 0; }
.usage p { font-size: 14px; line-height: 1.55; color: #424242; margin-bottom: 12px; }
.usage ul { margin: 0 0 12px 20px; }
.usage li { font-size: 14px; line-height: 1.55; color: #424242; margin-bottom: 8px; }
.usage li b { color: #242424; }

/* Stage / matrix helpers */
.tag--sm .tag__lead .l20 { display: none; }
.tag--md .tag__lead .l16 { display: none; }
.tag.hide-lead .tag__lead { display: none; }
.tag.hide-label .tag__label { display: none; }
.tag-live-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
`;

// ─── Tag builder ────────────────────────────────────────────

type State = 'rest' | 'hover' | 'pressed' | 'disabled';

function label(text: string): string {
  return '<span class="tag__label"><span class="ghost">' + text + '</span><span class="vis">' + text + '</span></span>';
}

function tag(opts: { size: 'sm' | 'md'; state: State; selected?: boolean; iconOnly?: boolean; lead?: boolean; text?: string; live?: boolean }): string {
  const io = opts.iconOnly;
  const cls = ['tag', io ? 'tag--' + opts.size + '-io' : 'tag--' + opts.size, 'tag--' + opts.state];
  if (opts.selected) cls.push('tag--selected');
  if (opts.live) cls.push('tag--live');
  const img = opts.size === 'sm' ? IMAGE16 : IMAGE20;
  let inner = '';
  if (io || opts.lead) inner += '<span class="tag__lead">' + img + '</span>';
  if (!io) inner += label(opts.text || 'Tag text');
  inner += '<span class="tag__dismiss">' + DISMISS + '</span>';
  const dis = opts.state === 'disabled';
  const aria = io ? ' aria-label="Remove tag"' : '';
  return '<button class="' + cls.join(' ') + '"' + aria + (dis ? ' disabled aria-disabled="true"' : '') + '>' + inner + '</button>';
}

function matrix(iconOnly: boolean): string {
  const states: State[] = ['rest', 'hover', 'pressed', 'disabled'];
  const rows: { size: 'sm' | 'md'; selected: boolean; label: string }[] = [
    { size: 'sm', selected: false, label: 'Small · Regular' },
    { size: 'sm', selected: true, label: 'Small · Selected' },
    { size: 'md', selected: false, label: 'Medium · Regular' },
    { size: 'md', selected: true, label: 'Medium · Selected' },
  ];
  let out = '<div class="matrix">';
  out += '<div class="matrix__col"></div>';
  states.forEach(function (s) { out += '<div class="matrix__col">' + s + '</div>'; });
  rows.forEach(function (r) {
    out += '<div class="matrix__rl">' + r.label + '</div>';
    states.forEach(function (s) {
      out += '<div class="cell">' + tag({ size: r.size, state: s, selected: r.selected, iconOnly }) + '</div>';
    });
  });
  out += '</div>';
  return out;
}

// ─── Usage guidance (Figma node 1510:743) — verbatim ────────

const usage = usageGuidance([
  {
    h: 'Behavior',
    body:
      '<ul>' +
      '<li>Never use a tag as an action button. Tags label or filter content \u2014 they don\'t trigger discrete actions. For actions, use a button instead.</li>' +
      '<li>Selecting anywhere on the tag dismisses it. The entire surface is the dismiss target \u2014 there\'s no separate close hit zone to aim for.</li>' +
      '<li>Always use the Fluent Iconography instance as the default icon value. Don\'t substitute placeholder frames or custom vectors in the icon slots.</li>' +
      '</ul>' +
      '<p>All icons (leading and dismiss) use the Regular style. There\'s no Filled icon variant for tag.</p>',
  },
  {
    h: 'Layout',
    body: '<ul><li>Never mix icon sizes across sizes. Small tags use 16px icons; medium tags use 20px icons. Keep the icon size paired to the tag size in every instance.</li></ul>',
  },
  {
    h: 'Accessibility',
    body:
      '<ul>' +
      '<li><strong>Icon-only labels:</strong> Icon only tags require an aria-label that describes the tag\'s category and dismiss intent (for example, "Remove Engineering filter"). Never label the tag with the icon\'s shape.</li>' +
      '<li><strong>Reduced motion:</strong> When someone has reduced motion turned on, all tag transitions should be instant.</li>' +
      '</ul>',
  },
]);

// ─── Page ───────────────────────────────────────────────────

const hero =
  '<button id="heroTag" class="tag tag--md tag--rest">' +
  '<span class="tag__lead"><span class="l16">' + IMAGE16 + '</span><span class="l20">' + IMAGE20 + '</span></span>' +
  label('Design') +
  '<span class="tag__dismiss">' + DISMISS + '</span></button>';

const controls =
  segControl('Size', 'size', [
    { value: 'sm', label: 'S' },
    { value: 'md', label: 'M', active: true },
  ]) +
  segControl('Selected', 'sel', [
    { value: 'off', label: 'Off', active: true },
    { value: 'on', label: 'On' },
  ]) +
  segControl('Disabled', 'dis', [
    { value: 'off', label: 'Off', active: true },
    { value: 'on', label: 'On' },
  ]);

const layoutTiles = [
  { label: 'Icon + text', html: tag({ size: 'md', state: 'rest', text: 'Tag text' }) },
  { label: 'Leading icon', html: tag({ size: 'md', state: 'rest', lead: true, text: 'Tag text' }) },
  { label: 'Icon only', html: tag({ size: 'md', state: 'rest', iconOnly: true }) },
];

const stateRows: { size: 'sm' | 'md'; selected: boolean; label: string }[] = [
  { size: 'sm', selected: false, label: 'Small \u00b7 Regular' },
  { size: 'sm', selected: true, label: 'Small \u00b7 Selected' },
  { size: 'md', selected: false, label: 'Medium \u00b7 Regular' },
  { size: 'md', selected: true, label: 'Medium \u00b7 Selected' },
];
const stateCols: State[] = ['rest', 'hover', 'pressed', 'disabled'];
const statesMatrix = matrixTbl(
  ['Rest', 'Hover', 'Pressed', 'Disabled'],
  stateRows.map((r) => ({ label: r.label, cells: stateCols.map((s) => tag({ size: r.size, state: s, selected: r.selected })) })),
);

const liveRow =
  '<div class="tag-live-row">' +
  tag({ size: 'md', state: 'rest', live: true, text: 'Engineering' }) +
  tag({ size: 'md', state: 'rest', live: true, selected: true, text: 'Design' }) +
  tag({ size: 'sm', state: 'rest', live: true, lead: true, text: 'Research' }) +
  tag({ size: 'md', state: 'rest', live: true, iconOnly: true }) +
  '</div>';

const specTable = specs([
  { k: 'Small', v: '24px \u00b7 r8 \u00b7 16 icon' },
  { k: 'Medium', v: '32px \u00b7 r12 \u00b7 20 icon' },
  { k: 'Icon only', v: 'circular (9999)' },
  { k: 'Rest', v: '#242424' },
  { k: 'Hover / Pressed', v: '#313131 / #3e3e3e' },
  { k: 'Disabled', v: '#c7c7c7 \u00b7 #929292' },
  { k: 'Selected weight', v: '625' },
  { k: 'Dismiss target', v: 'whole surface' },
]);

const heroScript = `
<script>
(function () {
  var hero = document.getElementById('heroTag');
  var st = { size: 'md', sel: false, dis: false };
  function paint() {
    var cls = ['tag', 'tag--' + st.size, 'tag--rest'];
    if (st.sel) cls.push('tag--selected');
    if (st.dis) cls.push('tag--disabled');
    hero.className = cls.join(' ');
    hero.disabled = st.dis;
  }
  document.querySelectorAll('[data-ctrl]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-ctrl');
      var val = btn.getAttribute('data-value');
      if (name === 'size') st.size = val;
      else if (name === 'sel') st.sel = val === 'on';
      else if (name === 'dis') st.dis = val === 'on';
      var seg = document.querySelector('[data-seg="' + name + '"]');
      if (seg) seg.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      paint();
    });
  });
  paint();
  document.querySelectorAll('.tag--live').forEach(function (t) {
    t.addEventListener('click', function () {
      t.classList.add('removing');
      setTimeout(function () { t.remove(); }, 160);
    });
  });
})();
</script>`;

const body = [
  stage(hero, controls),
  section('Layouts', variants(layoutTiles)),
  section('States', statesMatrix, 'Small &amp; Medium \u00d7 Regular &amp; Selected'),
  section('Interactive', liveRow, 'Click a tag to dismiss it \u2014 the whole surface is the target'),
  section('Specs', specTable),
  usage,
  heroScript,
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Tag Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'tag.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
