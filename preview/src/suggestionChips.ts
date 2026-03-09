/**
 * Suggestion Chips — Interactive HTML Preview
 *
 * Shows the suggestion chips component from the Bebop Design System:
 *   - Horizontal row of outline-style text chips
 *   - Overflow (more) button at the end
 *   - States: Rest, Hover, Focus
 *   - Light background context (white) and dark background context
 *
 * Usage:  npx tsx preview/src/suggestionChips.ts
 * Output: preview/dist/suggestionChips.html
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Icons ──────────────────────────────────────────────────

const moreHorizontalIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 10C6.25 10.6904 5.69036 11.25 5 11.25C4.30964 11.25 3.75 10.6904 3.75 10C3.75 9.30964 4.30964 8.75 5 8.75C5.69036 8.75 6.25 9.30964 6.25 10ZM11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10ZM15 11.25C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25Z" fill="currentColor"/></svg>';

// ─── CSS ────────────────────────────────────────────────────

let css = '';
css += '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }';
css += '\n';
css += "html, body { height: 100%; font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif; color: #242424; background: #f5f5f5; }";
css += '\n';
css += '.page { padding: 40px; display: flex; flex-direction: column; gap: 48px; }';
css += '\n';
css += 'h2 { font-size: 14px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }';
css += '\n';
css += '.demo { background: #fff; border-radius: 16px; padding: 32px; border: 1px solid #e8e8e8; }';
css += '\n';
css += '.demo--dark { background: #2b2b2b; border-color: #404040; }';
css += '\n';

// ─── Suggestion Chips Container ───
css += '.sc { display: flex; align-items: center; gap: 8px; height: 32px; flex-wrap: nowrap; }';
css += '\n';

// ─── Chip ───
css += ".sc__chip { display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 0 12px; border-radius: 12px; border: 1px solid #dedede; background: transparent; color: #242424; font-family: 'Segoe UI', sans-serif; font-size: 14px; font-weight: 400; line-height: 1.4; cursor: pointer; transition: background 0.1s, border-color 0.1s; outline: none; white-space: nowrap; }";
css += '\n';
css += '.sc__chip:hover { background: rgba(36,36,36,0.04); border-color: #c4c4c4; }';
css += '\n';
css += '.sc__chip:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }';
css += '\n';

// ─── Overflow Button ───
css += '.sc__overflow { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border-radius: 9999px; border: 1px solid #dedede; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s, border-color 0.1s; outline: none; flex-shrink: 0; }';
css += '\n';
css += '.sc__overflow:hover { background: rgba(36,36,36,0.04); border-color: #c4c4c4; }';
css += '\n';
css += '.sc__overflow:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }';
css += '\n';
css += '.sc__overflow svg { display: block; width: 20px; height: 20px; }';
css += '\n';

// ─── State demo helpers ───
css += '.state-row { display: flex; gap: 32px; align-items: flex-start; flex-wrap: wrap; }';
css += '\n';
css += '.state-cell { display: flex; flex-direction: column; gap: 8px; }';
css += '\n';
css += '.state-label { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.6px; }';
css += '\n';

// Forced hover state for demo
css += '.sc__chip--hover { background: rgba(36,36,36,0.04); border-color: #c4c4c4; }';
css += '\n';
// Forced focus state for demo
css += '.sc__chip--focus { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }';
css += '\n';
css += '.sc__overflow--hover { background: rgba(36,36,36,0.04); border-color: #c4c4c4; }';
css += '\n';
css += '.sc__overflow--focus { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }';
css += '\n';

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html>';
html += '<html lang="en">';
html += '<head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Suggestion Chips \u2014 Bebop Design System Preview</title>';
html += '<style>' + css + '</style>';
html += '</head>';
html += '<body>';
html += '<div class="page">';

// ─── Section 1: Full Component (interactive) ───
html += '<div>';
html += '<h2>Full Component \u2014 Interactive</h2>';
html += '<div class="demo">';
html += '<div class="sc">';
html += '<button class="sc__chip">Get to know Copilot</button>';
html += '<button class="sc__chip">Prepare for what\u2019s ahead</button>';
html += '<button class="sc__chip">Create something inspiring</button>';
html += '<button class="sc__overflow" aria-label="More suggestions">' + moreHorizontalIco + '</button>';
html += '</div>';
html += '</div>';
html += '</div>';

// ─── Section 2: States ───
html += '<div>';
html += '<h2>Chip States</h2>';
html += '<div class="demo">';
html += '<div class="state-row">';

// Rest
html += '<div class="state-cell">';
html += '<span class="state-label">Rest</span>';
html += '<button class="sc__chip">Get to know Copilot</button>';
html += '</div>';

// Hover
html += '<div class="state-cell">';
html += '<span class="state-label">Hover</span>';
html += '<button class="sc__chip sc__chip--hover">Get to know Copilot</button>';
html += '</div>';

// Focus
html += '<div class="state-cell">';
html += '<span class="state-label">Focus</span>';
html += '<button class="sc__chip sc__chip--focus">Get to know Copilot</button>';
html += '</div>';

html += '</div>'; // state-row
html += '</div>'; // demo
html += '</div>';

// ─── Section 3: Overflow Button States ───
html += '<div>';
html += '<h2>Overflow Button States</h2>';
html += '<div class="demo">';
html += '<div class="state-row">';

// Rest
html += '<div class="state-cell">';
html += '<span class="state-label">Rest</span>';
html += '<button class="sc__overflow">' + moreHorizontalIco + '</button>';
html += '</div>';

// Hover
html += '<div class="state-cell">';
html += '<span class="state-label">Hover</span>';
html += '<button class="sc__overflow sc__overflow--hover">' + moreHorizontalIco + '</button>';
html += '</div>';

// Focus
html += '<div class="state-cell">';
html += '<span class="state-label">Focus</span>';
html += '<button class="sc__overflow sc__overflow--focus">' + moreHorizontalIco + '</button>';
html += '</div>';

html += '</div>'; // state-row
html += '</div>'; // demo
html += '</div>';

// ─── Section 4: Different chip counts ───
html += '<div>';
html += '<h2>Variants \u2014 Chip Count</h2>';
html += '<div class="demo" style="display:flex;flex-direction:column;gap:24px">';

// 2 chips
html += '<div class="sc">';
html += '<button class="sc__chip">Summarize my emails</button>';
html += '<button class="sc__chip">Draft a response</button>';
html += '<button class="sc__overflow" aria-label="More suggestions">' + moreHorizontalIco + '</button>';
html += '</div>';

// 4 chips
html += '<div class="sc">';
html += '<button class="sc__chip">Get to know Copilot</button>';
html += '<button class="sc__chip">Prepare for what\u2019s ahead</button>';
html += '<button class="sc__chip">Create something inspiring</button>';
html += '<button class="sc__chip">Summarize my emails</button>';
html += '<button class="sc__overflow" aria-label="More suggestions">' + moreHorizontalIco + '</button>';
html += '</div>';

// No overflow
html += '<div class="sc">';
html += '<button class="sc__chip">Get to know Copilot</button>';
html += '<button class="sc__chip">Prepare for what\u2019s ahead</button>';
html += '</div>';

html += '</div>'; // demo
html += '</div>';

// ─── Section 5: Full width (820px, matching Figma) ───
html += '<div>';
html += '<h2>Full Width \u2014 820px Container (Figma Spec)</h2>';
html += '<div class="demo">';
html += '<div class="sc" style="width:820px">';
html += '<button class="sc__chip">Get to know Copilot</button>';
html += '<button class="sc__chip">Prepare for what\u2019s ahead</button>';
html += '<button class="sc__chip">Create something inspiring</button>';
html += '<button class="sc__overflow" aria-label="More suggestions">' + moreHorizontalIco + '</button>';
html += '</div>';
html += '</div>';
html += '</div>';

html += '</div>'; // page
html += '</body>';
html += '</html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'suggestionChips.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
