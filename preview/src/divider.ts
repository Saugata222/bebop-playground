/**
 * Divider — Interactive Preview
 *
 * Shows all divider variants: Orientation × Layout × Content
 */

import * as fs from 'fs';
import * as path from 'path';

// Horizontal dividers
function hDiv(layout: string, text: string): string {
  const before = layout === 'start' ? '<div class="dv__stub"></div>' : '<div class="dv__line"></div>';
  const after = layout === 'end' ? '<div class="dv__stub"></div>' : '<div class="dv__line"></div>';
  const content = text ? '<div class="dv__content"><span class="dv__text">' + text + '</span></div>' : '';
  return '<div class="dv dv--h">' + before + content + after + '</div>';
}

function hDivPlain(): string {
  return '<div class="dv dv--h"><div class="dv__line"></div></div>';
}

// Vertical dividers
function vDiv(layout: string, text: string): string {
  const before = layout === 'start' ? '<div class="dv__stub-v"></div>' : '<div class="dv__line-v"></div>';
  const after = layout === 'end' ? '<div class="dv__stub-v"></div>' : '<div class="dv__line-v"></div>';
  const content = text ? '<div class="dv__content-v"><span class="dv__text">' + text + '</span></div>' : '';
  return '<div class="dv dv--v">' + before + content + after + '</div>';
}

function vDivPlain(): string {
  return '<div class="dv dv--v"><div class="dv__line-v"></div></div>';
}

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 700px; margin: 0 auto; }
.hrow { display: flex; flex-direction: column; gap: 24px; margin-bottom: 16px; }
.vrow { display: flex; gap: 48px; margin-bottom: 16px; height: 120px; }
.vlabel { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; text-align: center; margin-bottom: 6px; }
.vcell { display: flex; flex-direction: column; align-items: center; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; }

/* === Base divider container === */
.dv { display: flex; align-items: center; }
.dv--h { width: 100%; flex-direction: row; }
.dv--v { flex-direction: column; height: 100%; }

/* === Horizontal line (flex-grow) === */
.dv__line { flex: 1; height: 1px; background: #dedede; min-width: 0; }
/* Short stub (8px) for start/end layouts */
.dv__stub { width: 8px; height: 1px; background: #dedede; flex-shrink: 0; }

/* === Vertical line (flex-grow) === */
.dv__line-v { flex: 1; width: 1px; background: #dedede; min-height: 0; }
/* Short stub (8px) for start/end vertical layouts */
.dv__stub-v { height: 8px; width: 1px; background: #dedede; flex-shrink: 0; }

/* === Content (horizontal) === */
.dv__content {
  display: flex; gap: 6px; align-items: center; justify-content: center;
  padding: 0 12px; flex-shrink: 0; height: 20px;
}

/* === Content (vertical) === */
.dv__content-v {
  display: flex; gap: 6px; align-items: center; justify-content: center;
  padding: 12px 0; flex-shrink: 0;
}

/* === Text label === */
.dv__text {
  font-family: 'Segoe UI', sans-serif;
  font-size: 12px; font-weight: 400; line-height: 1.4;
  color: #5d5d5d; white-space: nowrap;
}
`;

const body = [
  '<h2>Horizontal</h2>',
  '<div class="hrow">',
  '<div><span class="rl">No text</span>' + hDivPlain() + '</div>',
  '<div><span class="rl">Center</span>' + hDiv('center', 'Text') + '</div>',
  '<div><span class="rl">Start</span>' + hDiv('start', 'Text') + '</div>',
  '<div><span class="rl">End</span>' + hDiv('end', 'Text') + '</div>',
  '</div>',
  '<h2>Vertical</h2>',
  '<div class="vrow">',
  '<div class="vcell"><span class="vlabel">No text</span>' + vDivPlain() + '</div>',
  '<div class="vcell"><span class="vlabel">Center</span>' + vDiv('center', 'Text') + '</div>',
  '<div class="vcell"><span class="vlabel">Start</span>' + vDiv('start', 'Text') + '</div>',
  '<div class="vcell"><span class="vlabel">End</span>' + vDiv('end', 'Text') + '</div>',
  '</div>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Divider Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Divider \u2014 Component Preview</h1>'
  + '<p class="hint">Horizontal and vertical dividers with Center, Start, End text positioning.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'divider.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
