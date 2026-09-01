/**
 * Latency (AI States & Behaviors) — Interactive Preview
 *
 * One Copilot compound (node 4020:2536). The thinking states shown before a
 * response renders: Loading → Thinking → CoT → Complete, for Default and Agent
 * types across light and dark. Uses the REAL Figma motion asset
 * (latency-thinking-hero.gif) for the animated Copilot mark, plus a shimmer
 * sweep on the active label. Includes a hero, the full state matrix, a live
 * state cycler, and usage guidance.
 *
 * Icons: exact Fluent assets from src/components/icons. Font: Segoe Sans.
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Assets ─────────────────────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
function gifDataUri(name: string): string {
  const buf = fs.readFileSync(path.join(iconsDir, name));
  return 'data:image/gif;base64,' + buf.toString('base64');
}
const chevronR12 = readIcon('chevron-right-12-regular.svg');
const briefcase20 = readIcon('briefcase-20-regular.svg');
const heroGif = gifDataUri('latency-thinking-hero.gif');

// ─── Markup builders ────────────────────────────────────────

interface StateOpts {
  state: 'loading' | 'thinking' | 'cot' | 'complete';
  label?: string;
  substep?: string;
  chevron?: boolean;
  agentIcon?: boolean;
}

function mark(): string {
  return '<span class="lat__mark" role="img" aria-label="Copilot thinking"></span>';
}

function latency(opts: StateOpts): string {
  const active = opts.state === 'thinking' || opts.state === 'cot';
  let head = '';
  if (opts.state === 'loading') {
    head = mark();
  } else if (active) {
    head = mark()
      + '<span class="lat__label lat__label--shimmer">' + (opts.label || 'Thinking') + '</span>'
      + (opts.chevron ? '<span class="lat__chev">' + chevronR12 + '</span>' : '');
  } else {
    // complete
    head = (opts.agentIcon ? '<span class="lat__agent">' + briefcase20 + '</span>' : '')
      + '<span class="lat__label lat__label--complete">' + (opts.label || 'Complete') + '</span>'
      + (opts.chevron ? '<span class="lat__chev lat__chev--complete">' + chevronR12 + '</span>' : '');
  }
  let html = '<div class="lat"><div class="lat__head">' + head + '</div>';
  if (opts.substep) {
    html += '<div class="lat__substep">' + opts.substep + '</div>';
  }
  html += '</div>';
  return html;
}

function cell(theme: 'light' | 'dark', label: string, node: string): string {
  return '<div class="mcell mcell--' + theme + '"><span class="mcell__lbl">' + label + '</span><div class="mcell__stage">' + node + '</div></div>';
}

// The 8 Figma rows (state × type), rendered per theme.
const rows: { label: string; build: () => string }[] = [
  { label: 'Default \u00b7 Loading', build: () => latency({ state: 'loading' }) },
  { label: 'Default \u00b7 Thinking', build: () => latency({ state: 'thinking', label: 'Thinking' }) },
  { label: 'Agent \u00b7 Thinking', build: () => latency({ state: 'thinking', label: 'Copilot for Sales: Thinking' }) },
  { label: 'Default \u00b7 CoT', build: () => latency({ state: 'cot', label: 'Researching financial details', chevron: true, substep: 'Get a quick answer' }) },
  { label: 'Agent \u00b7 CoT', build: () => latency({ state: 'cot', label: 'Copilot for Sales: Researching financial details', chevron: true, substep: 'Get a quick answer' }) },
  { label: 'Default \u00b7 CoT complete', build: () => latency({ state: 'complete', label: 'Case complete', chevron: true }) },
  { label: 'Agent \u00b7 Complete', build: () => latency({ state: 'complete', label: 'Copilot for Sales', agentIcon: true }) },
  { label: 'Agent \u00b7 CoT complete', build: () => latency({ state: 'complete', label: 'Copilot for Sales', agentIcon: true, chevron: true }) },
];

// ─── CSS ────────────────────────────────────────────────────

const css = `
:root { --lat-gif: url('` + heroGif + `'); }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 760px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px; }

/* Hero */
.hero { background: #fcfcfc; border: 1px solid #ebebeb; border-radius: 16px; padding: 48px; display: flex; align-items: center; justify-content: center; }
.hero__img { width: 96px; height: 96px; background: var(--lat-gif) center/contain no-repeat; }

/* Matrix — light / dark columns */
.matrix { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-radius: 16px; overflow: hidden; }
.mcell { padding: 22px 24px; display: flex; flex-direction: column; gap: 8px; }
.mcell--light { background: #fcfcfc; }
.mcell--dark { background: #242424; }
.mcell__lbl { font-size: 11px; color: #6f6f6f; }
.mcell--dark .mcell__lbl { color: #9a9a9a; }
.mcell__stage { display: flex; align-items: center; min-height: 40px; }

/* ─── Latency row ─── */
.lat { display: flex; flex-direction: column; gap: 4px; }
.lat__head { display: flex; align-items: center; gap: 6px; }
.lat__mark { width: 20px; height: 20px; display: inline-block; flex-shrink: 0; background: var(--lat-gif) center/contain no-repeat; }
.lat__agent { display: inline-flex; width: 20px; height: 20px; color: #5d5d5d; flex-shrink: 0; }
.mcell--dark .lat__agent { color: #adadad; }
.lat__agent svg { width: 20px; height: 20px; }

/* Label — Content Paragraph Medium 16/28 */
.lat__label { font-size: 16px; line-height: 28px; letter-spacing: 0; white-space: nowrap; }
.lat__label--complete { color: #5d5d5d; }
.mcell--dark .lat__label--complete { color: #adadad; }

/* Shimmer sweep on the active (Thinking / CoT) label */
.lat__label--shimmer {
  color: #242424;
  background: linear-gradient(100deg, #b8b8b8 20%, #242424 45%, #242424 55%, #b8b8b8 80%);
  background-size: 200% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
  animation: latShimmer 1.8s linear infinite;
}
.mcell--dark .lat__label--shimmer {
  background: linear-gradient(100deg, #6b6b6b 20%, #ffffff 45%, #ffffff 55%, #6b6b6b 80%);
  background-size: 200% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
@keyframes latShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) {
  .lat__label--shimmer { animation: none; -webkit-text-fill-color: currentColor; color: #242424; background: none; }
  .mcell--dark .lat__label--shimmer { color: #ededed; }
}

/* Chevron */
.lat__chev { display: inline-flex; width: 12px; height: 12px; color: #242424; flex-shrink: 0; }
.mcell--dark .lat__chev { color: #ededed; }
.lat__chev--complete { color: #5d5d5d; }
.mcell--dark .lat__chev--complete { color: #adadad; }
.lat__chev svg { width: 12px; height: 12px; }

/* Substep — Functional Body Small 12/16, indented under the mark */
.lat__substep { padding-left: 26px; font-size: 12px; line-height: 16px; color: #242424; font-variation-settings: 'opsz' 8, 'wght' 420; }
.mcell--dark .lat__substep { color: #ededed; }

/* ─── Live cycler ─── */
.live { background: #fff; border: 1px solid #ebebeb; border-radius: 16px; padding: 32px; display: flex; align-items: center; gap: 24px; min-height: 96px; }
.live__slot { flex: 1; }
.live__btn { height: 32px; padding: 6px 14px; border: 1px solid #dedede; border-radius: 12px; background: #fff; font-family: inherit; font-size: 13px; color: #242424; cursor: pointer; transition: background 0.1s; }
.live__btn:hover { background: rgba(36,36,36,0.04); }

/* ─── Usage docs ─── */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
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
`;

// ─── Body markup ────────────────────────────────────────────

let matrix = '';
for (const r of rows) {
  matrix += cell('light', r.label, r.build());
  matrix += cell('dark', r.label, r.build());
}

const body = [
  '<h2>Motion</h2>',
  '<p class="hint" style="text-align:left;margin:0 0 12px;">The animated Copilot mark \u2014 the exact Figma motion asset (<code>latency-thinking-hero.gif</code>).</p>',
  '<div class="hero"><span class="hero__img" role="img" aria-label="Copilot thinking animation"></span></div>',

  '<h2>States</h2>',
  '<div class="matrix">' + matrix + '</div>',

  '<h2>Interactive</h2>',
  '<p class="hint" style="text-align:left;margin:0 0 12px;">Loading \u2192 Thinking \u2192 Chain-of-Thought \u2192 Complete.</p>',
  '<div class="live"><div class="live__slot" id="liveSlot"></div><button class="live__btn" id="liveBtn" type="button">Replay</button></div>',

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> Latency covers the thinking states before a response is successfully rendered. It should feel dynamic and responsive so people never perceive the system as stuck or unresponsive \u2014 move from Loading to Thinking to Chain-of-Thought as work progresses, then settle each step to a static, dimmed Complete.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Animate the Copilot mark and shimmer the active label so the state reads as live.</li>',
  '<li>Progress through states as real work happens \u2014 don\'t hold on Loading.</li>',
  '<li>Prefix agent runs with the agent name (and lead completed agent steps with its icon).</li>',
  '<li>Dim completed steps to secondary and expose a chevron to expand the reasoning.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Freeze on a single frame \u2014 a static mark reads as \u201cstuck\u201d.</li>',
  '<li>Keep shimmering a step that has finished \u2014 settle it to the completed style.</li>',
  '<li>Ignore reduced-motion \u2014 drop the shimmer and hold the mark still.</li>',
  '<li>Bury the current step \u2014 keep the active label primary and legible.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

// ─── Interaction script ─────────────────────────────────────

const frames = [
  latency({ state: 'loading' }),
  latency({ state: 'thinking', label: 'Thinking' }),
  latency({ state: 'cot', label: 'Researching financial details', chevron: true, substep: 'Get a quick answer' }),
  latency({ state: 'complete', label: 'Case complete', chevron: true }),
];

let js = '';
js += '<script>';
js += '\n';
js += 'var slot = document.getElementById(\'liveSlot\');';
js += '\n';
js += 'var btn = document.getElementById(\'liveBtn\');';
js += '\n';
js += 'var frames = ' + JSON.stringify(frames) + ';';
js += '\n';
js += 'var timers = [];';
js += '\n';
js += 'function clearTimers() { timers.forEach(clearTimeout); timers = []; }';
js += '\n';
js += 'function run() {';
js += '\n';
js += '  clearTimers();';
js += '\n';
js += '  slot.innerHTML = frames[0];';
js += '\n';
js += '  timers.push(setTimeout(function () { slot.innerHTML = frames[1]; }, 1100));';
js += '\n';
js += '  timers.push(setTimeout(function () { slot.innerHTML = frames[2]; }, 3100));';
js += '\n';
js += '  timers.push(setTimeout(function () { slot.innerHTML = frames[3]; }, 5300));';
js += '\n';
js += '}';
js += '\n';
js += 'btn.addEventListener(\'click\', run);';
js += '\n';
js += 'run();';
js += '\n';
js += '</script>';

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Latency Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Latency \u2014 Component Preview</h1>'
  + '<p class="hint">The thinking states before a response renders \u2014 dynamic and responsive so the system never feels stuck. Real Figma motion GIF + shimmer label.</p>'
  + body + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'latency.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
