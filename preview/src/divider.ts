/**
 * Divider — Interactive Preview
 *
 * One Copilot primitive (node 1413:24271). Shows horizontal + vertical
 * orientation, center / start / end layout, plain / label / icon+label content,
 * and the rendered Usage guidance (node 1506:785).
 */

import * as fs from 'fs';
import * as path from 'path';
import { section, stage, specs, usageGuidance } from './_scaffold';

// ─── Icon — exact Fluent System asset (read from src/components/icons) ───────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
const image20 = readIcon('image-20-regular.svg');

// ─── Content slot ───────────────────────────────────────────

function content(text: string, icon: boolean, vertical: boolean): string {
  const cls = vertical ? 'dv__content dv__content--v' : 'dv__content';
  const ic = icon ? '<span class="dv__icon">' + image20 + '</span>' : '';
  const tx = text ? '<span class="dv__text">' + text + '</span>' : '';
  return '<div class="' + cls + '">' + ic + tx + '</div>';
}

// ─── Horizontal dividers ────────────────────────────────────

function hDiv(layout: string, text: string, icon: boolean): string {
  const before = layout === 'start' ? '<div class="dv__stub"></div>' : '<div class="dv__line"></div>';
  const after = layout === 'end' ? '<div class="dv__stub"></div>' : '<div class="dv__line"></div>';
  const c = text || icon ? content(text, icon, false) : '';
  return '<div class="dv dv--h">' + before + c + after + '</div>';
}

function hDivPlain(): string {
  return '<div class="dv dv--h"><div class="dv__line"></div></div>';
}

// ─── Vertical dividers ──────────────────────────────────────

function vDiv(layout: string, text: string, icon: boolean): string {
  const before = layout === 'start' ? '<div class="dv__stub-v"></div>' : '<div class="dv__line-v"></div>';
  const after = layout === 'end' ? '<div class="dv__stub-v"></div>' : '<div class="dv__line-v"></div>';
  const c = text || icon ? content(text, icon, true) : '';
  return '<div class="dv dv--v">' + before + c + after + '</div>';
}

function vDivPlain(): string {
  return '<div class="dv dv--v"><div class="dv__line-v"></div></div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 760px; margin: 0 auto; }
.hrow { display: flex; flex-direction: column; gap: 24px; margin-bottom: 16px; }
.vrow { display: flex; gap: 48px; margin-bottom: 16px; height: 140px; }
.vlabel { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; text-align: center; margin-bottom: 6px; }
.vcell { display: flex; flex-direction: column; align-items: center; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; }

/* === Base divider container === */
.dv { display: flex; align-items: center; }
.dv--h { width: 100%; flex-direction: row; }
.dv--v { flex-direction: column; height: 100%; }

/* === Horizontal line (flex-grow) === */
.dv__line { flex: 1; height: 1px; background: rgba(189,189,189,0.5); min-width: 0; }
/* Short stub (4px) for start/end layouts */
.dv__stub { width: 4px; height: 1px; background: rgba(189,189,189,0.5); flex-shrink: 0; }

/* === Vertical line (flex-grow) === */
.dv__line-v { flex: 1; width: 1px; background: rgba(189,189,189,0.5); min-height: 0; }
/* Short stub (4px) for start/end vertical layouts */
.dv__stub-v { height: 4px; width: 1px; background: rgba(189,189,189,0.5); flex-shrink: 0; }

/* === Content (horizontal) === */
.dv__content {
  display: flex; gap: 6px; align-items: center; justify-content: center;
  padding: 0 12px; flex-shrink: 0;
}
/* === Content (vertical) === */
.dv__content--v { flex-direction: column; padding: 12px 0; }

/* === Icon === */
.dv__icon { display: inline-flex; width: 20px; height: 20px; color: #5d5d5d; flex-shrink: 0; }

/* === Text label — Functional / Body Small (Segoe Sans) === */
.dv__text {
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  font-size: 12px; font-weight: 420; line-height: 16px; letter-spacing: 0;
  color: #5d5d5d; white-space: nowrap;
}

/* === Usage guidance === */
.usage { margin-top: 8px; }
.usage__sec { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 20px 22px; margin-bottom: 12px; }
.usage__sec h3 { font-size: 16px; font-weight: 600; letter-spacing: -0.3px; margin-bottom: 10px; }
.usage__sec p.lead { font-size: 13px; line-height: 1.6; color: #5d5d5d; margin-bottom: 12px; }
.usage__sub { font-size: 12px; font-weight: 600; color: #242424; margin: 12px 0 6px; }
.usage__sec ul { list-style: none; display: flex; flex-direction: column; gap: 7px; }
.usage__sec li { font-size: 13px; line-height: 1.55; color: #5d5d5d; padding-left: 18px; position: relative; }
.usage__sec li::before { content: ''; position: absolute; left: 2px; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: #c7c7c7; }
.usage__sec li b { color: #242424; font-weight: 600; }
.usage__sec--dos li::before { background: #0f7b0f; }
.usage__sec--donts li::before { background: #b10e1c; }
`;

// ─── Variant markup ─────────────────────────────────────────

const body = [
  stage('<div style="width:360px">' + hDiv('center', 'Label', true) + '</div>'),
  section('Horizontal', '<div class="bp-card" style="padding:28px 32px"><div class="hrow">'
    + '<div><span class="rl">No content</span>' + hDivPlain() + '</div>'
    + '<div><span class="rl">Center \u00b7 label</span>' + hDiv('center', 'Label', false) + '</div>'
    + '<div><span class="rl">Center \u00b7 icon + label</span>' + hDiv('center', 'Label', true) + '</div>'
    + '<div><span class="rl">Start</span>' + hDiv('start', 'Label', true) + '</div>'
    + '<div><span class="rl">End</span>' + hDiv('end', 'Label', true) + '</div>'
    + '</div></div>'),
  section('Vertical', '<div class="bp-card" style="padding:28px 32px"><div class="vrow">'
    + '<div class="vcell"><span class="vlabel">No content</span>' + vDivPlain() + '</div>'
    + '<div class="vcell"><span class="vlabel">Center</span>' + vDiv('center', 'Label', true) + '</div>'
    + '<div class="vcell"><span class="vlabel">Start</span>' + vDiv('start', 'Label', true) + '</div>'
    + '<div class="vcell"><span class="vlabel">End</span>' + vDiv('end', 'Label', true) + '</div>'
    + '</div></div>'),

  '<div class="bp-section"><div class="bp-section__head"><span class="bp-section__title">Usage guidance</span></div>',
  '<div class="usage" style="max-width:none">',

  '<div class="usage__sec"><h3>Behavior</h3><ul>',
  '<li>Never use a Divider when spacing alone communicates the boundary. A Divider is explicit visual reinforcement \u2014 if gap tokens or typographic hierarchy already separate content, adding a Divider creates visual noise.</li>',
  '<li>Never use a Divider as an interactive element. It has no states, no focus behavior, and no select behavior. If you need a selectable separator, use a different pattern.</li>',
  '<li>Always use semantic separator markup. Don\'t implement Dividers as purely visual &lt;div&gt; elements \u2014 the platform\'s separator primitive must be used so assistive technology can announce the thematic break.</li>',
  '<li>Always let the Divider stretch to fill its parent container. Don\'t set a fixed width or height on the Divider itself \u2014 the parent layout controls extent.</li>',
  '<li>Use the Content slot visibility to toggle between labeled and plain dividers. Don\'t hide the label by setting it to an empty string \u2014 toggle the Content slot or Text boolean instead.</li>',
  '</ul></div>',

  '<div class="usage__sec"><h3>Layout</h3>',
  '<p class="lead">Use a Divider when spacing and typographic hierarchy alone are insufficient to separate distinct content groups within a surface.</p>',
  '<div class="usage__sub">When to use</div><ul class="usage__sec--dos">',
  '<li>To visually separate distinct content groups within a surface when spacing and typographic hierarchy alone are insufficient.</li>',
  '<li>To break a long vertical list or form into logical sections with optional section labels.</li>',
  '<li>To create a vertical boundary between side-by-side content regions, like panel edges or column separators.</li>',
  '<li>To add a labeled section break where the label provides contextual orientation, like \u201cOr\u201d, a date, or a category name.</li>',
  '</ul>',
  '<div class="usage__sub">When not to use</div><ul class="usage__sec--donts">',
  '<li>Don\'t use a Divider purely for decoration \u2014 if content groups are already visually distinct through spacing, background color, or type hierarchy, a Divider adds clutter.</li>',
  '<li>Don\'t use a Divider between every item in a list \u2014 prefer spacing. Reserve Dividers for grouping boundaries.</li>',
  '<li>Don\'t use a Divider as an interactive element \u2014 it has no states, no focus behavior, and no interactive role.</li>',
  '</ul></div>',

  '<div class="usage__sec"><h3>Accessibility</h3><ul>',
  '<li><b>Semantic markup:</b> Use the native &lt;hr&gt; element for horizontal dividers, or role="separator" for vertical and non-&lt;hr&gt; implementations. Purely visual &lt;div&gt; elements with no semantic role are inaccessible.</li>',
  '<li><b>Orientation attribute:</b> When Vertical=True, set aria-orientation="vertical". Omitting this causes assistive technology to assume horizontal, misrepresenting the layout.</li>',
  '<li><b>Decorative dividers:</b> When the separation is already communicated by heading structure, apply aria-hidden="true" to reduce screen reader verbosity.</li>',
  '</ul></div>',

  '<div class="usage__sec"><h3>Content</h3><ul>',
  '<li>Never place long-form text in the label slot. Divider labels are short navigational cues \u2014 a word or brief phrase. If you need more than a few words, use a heading instead.</li>',
  '<li>Always use functional typography for labels. Never apply content-set type (Segoe Serif, editorial styles) to divider labels \u2014 they\'re UI chrome, not editorial content.</li>',
  '</ul></div>',

  '</div></div>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Divider Preview</title><style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'divider.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
