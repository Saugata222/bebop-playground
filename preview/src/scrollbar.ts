/**
 * Scrollbar — Interactive Preview
 *
 * One Copilot primitive (node 2430:2330). Minimal overlay scrollbar: a 2px
 * pill thumb in a transparent, end-aligned track that widens to 6px on hover.
 * Shows vertical + horizontal orientation, rest vs hover thumb, and a live
 * scrollable demo using real styled scrollbars.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Static spec swatches ───────────────────────────────────

function vScroll(hover: boolean): string {
  return '<div class="sb sb--v' + (hover ? ' sb--hover' : '') + '"><div class="sb__thumb"></div></div>';
}
function hScroll(hover: boolean): string {
  return '<div class="sb sb--h' + (hover ? ' sb--hover' : '') + '"><div class="sb__thumb"></div></div>';
}

// ─── Live scroll demo content ───────────────────────────────

let vContent = '';
for (let i = 1; i <= 10; i++) {
  vContent += '<p>Line ' + i + ' \u2014 the overlay scrollbar sits at the end edge of the surface, thin at rest and wider while you drag.</p>';
}
let hContent = '';
for (let i = 1; i <= 12; i++) {
  hContent += '<span class="hcard">Card ' + i + '</span>';
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
.swatch { background: #fcfcfc; border: 1px solid #ebebeb; border-radius: 8px; display: flex; align-items: center; justify-content: center; }

/* ─── Static swatch — track + thumb ─── */
/* Track: transparent rail, 4px padding, thumb aligned to end edge */
.sb { display: flex; padding: 4px; }
.sb--v { flex-direction: column; align-items: flex-end; height: 108px; }
.sb--h { flex-direction: row; align-items: flex-end; width: 108px; }

/* Thumb: 2px pill filling the long axis, #6f6f6f, circular */
.sb__thumb { background: #6f6f6f; border-radius: 9999px; }
.sb--v .sb__thumb { width: 2px; min-height: 0; flex: 1 0 0; }
.sb--h .sb__thumb { height: 2px; min-width: 0; flex: 1 0 0; }
/* Hover widens to 6px */
.sb--v.sb--hover .sb__thumb { width: 6px; }
.sb--h.sb--hover .sb__thumb { height: 6px; }

/* ─── Live scroll demos — real styled scrollbars ─── */
.demo-v {
  width: 300px; height: 200px; overflow-y: auto; background: #fff;
  border: 1px solid #ebebeb; border-radius: 12px; padding: 16px 20px;
}
.demo-v p { font-size: 14px; line-height: 22px; color: #242424; margin-bottom: 12px; }

.demo-h {
  width: 340px; overflow-x: auto; white-space: nowrap; background: #fff;
  border: 1px solid #ebebeb; border-radius: 12px; padding: 16px;
}
.hcard {
  display: inline-flex; align-items: center; justify-content: center;
  width: 120px; height: 72px; margin-right: 12px; border-radius: 8px;
  background: #f5f5f5; color: #242424; font-size: 13px; font-weight: 600;
}

/* Overlay scrollbar styling (WebKit/Blink) — thin, transparent track, tertiary pill */
.demo-v::-webkit-scrollbar, .demo-h::-webkit-scrollbar { width: 10px; height: 10px; }
.demo-v::-webkit-scrollbar-track, .demo-h::-webkit-scrollbar-track { background: transparent; }
.demo-v::-webkit-scrollbar-thumb, .demo-h::-webkit-scrollbar-thumb {
  background: #6f6f6f; border-radius: 9999px;
  border: 4px solid transparent; background-clip: content-box;
}
.demo-v::-webkit-scrollbar-thumb { min-height: 24px; }
.demo-h::-webkit-scrollbar-thumb { min-width: 24px; }
.demo-v:hover::-webkit-scrollbar-thumb, .demo-h:hover::-webkit-scrollbar-thumb {
  border-width: 2px; /* widen from 2px to 6px visible thumb on hover */
}
/* Firefox */
.demo-v, .demo-h { scrollbar-width: thin; scrollbar-color: #6f6f6f transparent; }

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

const body = [
  stage('<div class="demo-v" style="width:320px">' + vContent + '</div>'),
  '<h2>Orientation \u00d7 state</h2>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Vertical \u00b7 rest</span><div class="swatch">' + vScroll(false) + '</div></div>',
  '<div class="cell"><span class="rl">Vertical \u00b7 hover</span><div class="swatch">' + vScroll(true) + '</div></div>',
  '<div class="cell"><span class="rl">Horizontal \u00b7 rest</span><div class="swatch">' + hScroll(false) + '</div></div>',
  '<div class="cell"><span class="rl">Horizontal \u00b7 hover</span><div class="swatch">' + hScroll(true) + '</div></div>',
  '</div>',

  '<h2>Live scroll</h2>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Vertical</span><div class="demo-v">' + vContent + '</div></div>',
  '<div class="cell"><span class="rl">Horizontal</span><div class="demo-h">' + hContent + '</div></div>',
  '</div>',

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> The scrollbar appears automatically on any surface whose content overflows. It is a passive overlay affordance \u2014 thin and unobtrusive at rest, widening on hover so it is easy to grab. Never add explicit scroll arrows or a solid track.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Keep the thumb tertiary (#6f6f6f) with a circular (pill) radius.</li>',
  '<li>Rest at 2px and widen to 6px on hover.</li>',
  '<li>Align the thumb to the end edge over a transparent track.</li>',
  '<li>Let overflow drive visibility \u2014 hide it when content fits.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Add a filled track, borders, or scroll-arrow buttons.</li>',
  '<li>Reserve permanent gutter space that shifts the layout.</li>',
  '<li>Recolor the thumb per surface \u2014 keep it neutral tertiary.</li>',
  '<li>Use it as a progress or range indicator.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Scrollbar Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Scrollbar \u2014 Component Preview</h1>'
  + '<p class="hint">Minimal overlay scrollbar. 2px tertiary pill thumb in a transparent end-aligned track, widening to 6px on hover. Scroll the live panels to see it in action.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'scrollbar.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
