/**
 * Connected Source Item — Interactive HTML Preview
 *
 * Row item used in Settings → Sources to manage connected data sources.
 * Each row has a logo, header (source name), description, and toggle switch.
 *
 * Variants:
 *   On  — toggle enabled (source is active, retrieved by Copilot)
 *   Off — toggle disabled (source remains connected but not retrieved)
 *
 * Usage:  npx tsx preview/src/connectedSourceItem.ts
 * Output: preview/dist/connectedSourceItem.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { renderStatesMatrix, statesMatrixCss, type RowSpec, type StateCol } from './_statesMatrix.js';
import { tokensCSS } from './_tokens';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, ' ').trim();
}

const moreHzIco = readIcon('more-horizontal-16-regular.svg');
const deleteIco = readIcon('delete-20-regular.svg');

// ─── CSS ────────────────────────────────────────────────────

let css = '';
css += tokensCSS;
css += '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n';
css += "html, body { height: 100%; font-family: var(--f-typography-fontFamily-functional); color: #242424; background: #f5f5f5; }\n";
css += '.page { padding: 40px; display: flex; flex-direction: column; gap: 48px; max-width: 1024px; margin: 0 auto; }\n';
css += 'h2 { font-size: 14px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }\n';
css += '.demo { background: #fff; border-radius: 16px; padding: 32px; border: 1px solid #e8e8e8; }\n';

// ─── List ───
css += '.csi-list { display: flex; flex-direction: column; gap: 8px; }\n';

// ─── Item ───
css += ".csi { display: flex; align-items: center; gap: 14.083px; padding: 12px 18px; border: 1.174px solid #d1d1d1; border-radius: 14.083px; background: #fff; transition: border-color 0.1s, background 0.1s; }\n";
css += '.csi:hover, .csi.is-hover { border-color: #b8b8b8; background: #fafafa; }\n';

// Icon
css += '.csi__icon { width: 48px; height: 48px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n';
css += '.csi__icon img { width: 48px; height: 48px; object-fit: contain; }\n';

// Text stack
css += '.csi__text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; justify-content: center; }\n';
css += ".csi__header { font-family: var(--f-typography-fontFamily-functional); font-size: 18px; font-weight: 600; line-height: 23.472px; color: #242424; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n";
css += ".csi__desc { font-family: var(--f-typography-fontFamily-functional); font-size: 14px; font-weight: 400; line-height: 20px; color: #616161; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n";

// ─── Overflow (more button + Disconnect menu) ───
css += '.csi__overflow { position: relative; flex-shrink: 0; }\n';
css += '.csi__more { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: #242424; cursor: pointer; border-radius: 8px; transition: background 0.1s; border: none; background: transparent; padding: 8px; visibility: hidden; }\n';
css += '.csi:hover .csi__more, .csi.is-hover .csi__more, .csi__overflow.csi__overflow--open .csi__more { visibility: visible; }\n';
css += '.csi__more:hover { background: rgba(36,36,36,0.04); }\n';
css += '.csi__more svg { width: 16px; height: 16px; }\n';
css += '.csi__menu { position: absolute; top: 100%; right: 0; background: #fff; border-radius: 16px; padding: 8px; box-shadow: 0px 3px 12px 0px rgba(0,0,0,0.18); z-index: 10; min-width: 186px; display: none; flex-direction: column; }\n';
css += '.csi__menu--visible { display: flex; }\n';
css += ".csi-menu-item { display: flex; align-items: center; gap: 6px; padding: 10px 12px; border-radius: 12px; cursor: pointer; transition: background 0.1s; border: none; background: transparent; width: 100%; text-align: left; font-family: var(--f-typography-fontFamily-functional); font-size: 14px; font-weight: 400; color: #242424; line-height: 20px; }\n";
css += '.csi-menu-item:hover { background: rgba(36,36,36,0.04); }\n';
css += '.csi-menu-item svg { width: 20px; height: 20px; flex-shrink: 0; color: #242424; }\n';

// ─── Toggle (small, 32×16) ───
css += '.csi__toggle { padding: 2px; flex-shrink: 0; cursor: pointer; }\n';
css += '.csi__toggle-track { position: relative; width: 32px; height: 16px; border-radius: 9999px; background: #242424; transition: background 0.15s ease; }\n';
css += '.csi__toggle-track--off { background: #fff; box-shadow: inset 0 0 0 1px #6f6f6f; }\n';
css += '.csi__toggle-thumb { position: absolute; top: 3px; left: 18px; width: 10px; height: 10px; border-radius: 9999px; background: #fff; transition: left 0.15s ease, background 0.15s ease; }\n';
css += '.csi__toggle-track--off .csi__toggle-thumb { left: 4px; background: #6f6f6f; }\n';
css += statesMatrixCss + '\n';

// ─── States Matrix ──────────────────────────────────────────

function csiHtml(extra: string, opts: { on: boolean }): string {
  const trackCls = opts.on ? 'csi__toggle-track' : 'csi__toggle-track csi__toggle-track--off';
  let s = '<div class="csi' + (extra ? ' ' + extra : '') + '" style="min-width:520px">';
  s += '<div class="csi__icon"><img src="../../src/components/icons/servicenow-logo.png" alt=""></div>';
  s += '<div class="csi__text"><span class="csi__header">ServiceNow</span><span class="csi__desc">Works in Chat and Researcher</span></div>';
  s += '<div class="csi__overflow"><button class="csi__more">' + moreHzIco + '</button></div>';
  s += '<div class="csi__toggle"><div class="' + trackCls + '"><div class="csi__toggle-thumb"></div></div></div>';
  s += '</div>';
  return s;
}

function buildStatesMatrix(): string {
  const rows: RowSpec[] = [
    { label: 'On',  meta: { on: true } },
    { label: 'Off', meta: { on: false } },
  ];
  const cols: StateCol[] = [
    { label: 'Rest',  cls: '' },
    { label: 'Hover', cls: 'is-hover' },
  ];
  let out = '<div class="page" style="padding-top:0">';
  out += renderStatesMatrix({
    title: 'States Matrix',
    subtitle: 'On/Off \u00d7 hover. The overflow \u201c\u2026\u201d button only appears on hover.',
    rows,
    cols,
    render: (rowSpec, col) => {
      const m = rowSpec.meta as { on: boolean };
      return csiHtml(col.cls, { on: m.on });
    },
  });
  out += '</div>';
  return out;
}

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html>';
html += '<html lang="en"><head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Connected Source Item — Component Preview</title>';
html += '<style>' + css + '</style>';
html += '</head><body>';
html += '<div class="page">';

// ─── On (default) ───
html += '<div><h2>On (Default)</h2><div class="demo"><div class="csi-list">';

const itemsOn = [
  { name: 'ServiceNow', desc: 'Works in Chat and Researcher', icon: 'servicenow-logo.png' },
  { name: 'Jira', desc: 'Works in Chat and Researcher', icon: 'jira-logo.png' },
  { name: 'S&P Global', desc: 'Works in Chat and Researcher', icon: 'sp-global-logo.png' },
  { name: 'Github', desc: 'Works in Chat, Researcher, and Analyst', icon: 'github-logo.png' },
];

for (const it of itemsOn) {
  html += '<div class="csi">';
  html += '  <div class="csi__icon"><img src="../../src/components/icons/' + it.icon + '" alt="' + it.name + '"></div>';
  html += '  <div class="csi__text">';
  html += '    <span class="csi__header">' + it.name + '</span>';
  html += '    <span class="csi__desc">' + it.desc + '</span>';
  html += '  </div>';
  html += '  <div class="csi__overflow">';
  html += '    <button class="csi__more">' + moreHzIco + '</button>';
  html += '    <div class="csi__menu">';
  html += '      <button class="csi-menu-item">' + deleteIco + ' Disconnect</button>';
  html += '    </div>';
  html += '  </div>';
  html += '  <div class="csi__toggle">';
  html += '    <div class="csi__toggle-track"><div class="csi__toggle-thumb"></div></div>';
  html += '  </div>';
  html += '</div>';
}

html += '</div></div></div>';

// ─── Off ───
html += '<div><h2>Off</h2><div class="demo"><div class="csi-list">';

const itemsOff = [
  { name: 'Confluence', desc: 'Connected but disabled from retrieval', icon: 'confluence-logo.png' },
  { name: 'Hubspot', desc: 'Connected but disabled from retrieval', icon: 'hubspot-20-color.svg' },
];

for (const it of itemsOff) {
  html += '<div class="csi">';
  html += '  <div class="csi__icon"><img src="../../src/components/icons/' + it.icon + '" alt="' + it.name + '"></div>';
  html += '  <div class="csi__text">';
  html += '    <span class="csi__header">' + it.name + '</span>';
  html += '    <span class="csi__desc">' + it.desc + '</span>';
  html += '  </div>';
  html += '  <div class="csi__overflow">';
  html += '    <button class="csi__more">' + moreHzIco + '</button>';
  html += '    <div class="csi__menu">';
  html += '      <button class="csi-menu-item">' + deleteIco + ' Disconnect</button>';
  html += '    </div>';
  html += '  </div>';
  html += '  <div class="csi__toggle">';
  html += '    <div class="csi__toggle-track csi__toggle-track--off"><div class="csi__toggle-thumb"></div></div>';
  html += '  </div>';
  html += '</div>';
}

html += '</div></div></div>';

html += '</div>'; // end page
html += buildStatesMatrix();

// ─── Script (toggle interactivity + hover menu) ───
html += '<script>';
html += 'document.querySelectorAll(".csi__toggle").forEach(function(el) {';
html += '  el.addEventListener("click", function() {';
html += '    var track = el.querySelector(".csi__toggle-track");';
html += '    track.classList.toggle("csi__toggle-track--off");';
html += '  });';
html += '});';
html += '\n';
html += 'document.querySelectorAll(".csi__overflow").forEach(function(el) {';
html += '  var menu = el.querySelector(".csi__menu");';
html += '  var hideTimer = null;';
html += '  el.addEventListener("mouseenter", function() {';
html += '    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }';
html += '    menu.classList.add("csi__menu--visible");';
html += '    el.classList.add("csi__overflow--open");';
html += '  });';
html += '\n';
html += '  el.addEventListener("mouseleave", function() {';
html += '    hideTimer = setTimeout(function() {';
html += '      menu.classList.remove("csi__menu--visible");';
html += '      el.classList.remove("csi__overflow--open");';
html += '    }, 80);';
html += '  });';
html += '\n';
html += '});';
html += '</script>';

html += '</body></html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'connectedSourceItem.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
