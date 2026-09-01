/**
 * Copilot Menu — Interactive HTML Preview
 *
 * Header dropdown anchored to the "More" button in the Copilot chat shell.
 *   - Six action items (4 plain + 2 with submenu chevron)
 *   - Divider
 *   - "Copilot response includes" section label
 *   - Web search toggle row
 *
 * States shown:
 *   1. Default surface (open, all items rest)
 *   2. Hover on action item
 *   3. Hover on submenu-bearing item (chevron visible)
 *   4. Toggle row — off
 *   5. Anchored-to-trigger demo (closed → open by clicking the More button)
 *
 * Usage:  npx tsx preview/src/copilotMenu.ts
 * Output: preview/dist/copilotMenu.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { tokensCSS } from './_tokens';

// ─── Icons (20px, fill="currentColor") ──────────────────────

function readIcon(name: string): string {
  const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, ' ').trim();
}

const documentIco = readIcon('document-20-regular.svg');
const clockIco = readIcon('clock-20-regular.svg');
const settingsIco = readIcon('settings-20-regular.svg');
const arrowDownloadIco = readIcon('arrow-download-20-regular.svg');
const questionCircleIco = readIcon('question-circle-20-regular.svg');
const personFeedbackIco = readIcon('person-feedback-20-regular.svg');
const globeIco = readIcon('globe-20-regular.svg');
const chevronRightIco = readIcon('chevron-right-20-regular.svg');
const moreIco = readIcon('more-horizontal-20-regular.svg');

// ─── CSS ────────────────────────────────────────────────────

let css = '';
css += tokensCSS;
css += '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n';
css += "html, body { height: 100%; font-family: var(--f-typography-fontFamily-functional); color: #242424; background: #f5f5f5; }\n";
css += '.page { padding: 40px; display: flex; flex-direction: column; gap: 48px; }\n';
css += 'h2 { font-size: 14px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }\n';
css += '.demo { background: #fff; border-radius: 16px; padding: 32px; border: 1px solid #e8e8e8; display: inline-flex; }\n';
css += '.demo--stage { background: #fafafa; padding: 60px 48px; min-height: 280px; }\n';
css += '.state-row { display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-start; }\n';
css += '.state-cell { display: flex; flex-direction: column; gap: 8px; }\n';
css += '.state-label { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.6px; }\n';

// ─── Copilot Menu surface ─── (mirror of fccFlow .cop-menu, but free-standing for previews)
css += ".cm { width: 280px; background: #fff; border-radius: 12px; box-shadow: 0px 8px 24px rgba(0,0,0,0.18), 0px 0px 2px rgba(0,0,0,0.06); padding: 8px; display: flex; flex-direction: column; gap: 0; font-family: var(--f-typography-fontFamily-functional); }\n";

// ─── Action item ───
css += ".cm__item { display: flex; align-items: center; gap: 8px; height: 36px; padding: 8px 12px; border-radius: 8px; border: none; background: transparent; cursor: pointer; color: #242424; font-family: inherit; font-size: 14px; font-weight: 400; line-height: 20px; transition: background 0.1s ease; outline: none; text-align: left; width: 100%; }\n";
css += '.cm__item:hover { background: rgba(36,36,36,0.04); }\n';
css += '.cm__item:focus-visible { outline: 2px solid #000; outline-offset: -2px; box-shadow: 0 0 0 1px #fff inset; }\n';
// Forced-state classes for the static state cells
css += '.cm__item--hover { background: rgba(36,36,36,0.04); }\n';

// ─── Item slots ───
css += '.cm__icon { width: 20px; height: 20px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; color: #242424; }\n';
css += '.cm__icon svg { width: 20px; height: 20px; display: block; }\n';
css += '.cm__label { flex: 1; min-width: 0; }\n';
css += '.cm__chev { width: 20px; height: 20px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; color: #424242; }\n';
css += '.cm__chev svg { width: 20px; height: 20px; display: block; }\n';

// ─── Divider + section label ───
css += '.cm__divider { height: 1px; background: #ebebeb; margin: 6px 4px; }\n';
css += '.cm__section-label { padding: 8px 12px 4px; font-size: 12px; font-weight: 600; line-height: 16px; color: #424242; }\n';

// ─── Toggle row ───
css += '.cm__toggle-row { display: flex; align-items: center; gap: 8px; height: 36px; padding: 8px 12px; border-radius: 8px; color: #242424; font-size: 14px; font-weight: 400; line-height: 20px; cursor: pointer; transition: background 0.1s ease; }\n';
css += '.cm__toggle-row:hover { background: rgba(36,36,36,0.04); }\n';
css += '.cm__toggle-row--hover { background: rgba(36,36,36,0.04); }\n';

// ─── Toggle pill — 32x16, 12px thumb ───
css += '.cm__tgl { width: 32px; height: 16px; border-radius: 9999px; position: relative; cursor: pointer; transition: background 0.15s; flex-shrink: 0; background: #fff; border: 1px solid #dedede; }\n';
css += '.cm__tgl::after { content: ""; position: absolute; top: 50%; left: 2px; width: 12px; height: 12px; border-radius: 9999px; background: #6f6f6f; transform: translateY(-50%); transition: left 0.15s, background 0.15s; }\n';
css += '.cm__tgl--on { background: #242424; border-color: transparent; }\n';
css += '.cm__tgl--on::after { left: 18px; background: #fff; }\n';

// ─── Anchored trigger demo (the stage) ───
css += '.stage { position: relative; display: inline-block; }\n';
css += '.stage__trigger { width: 32px; height: 32px; border-radius: 8px; background: transparent; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; color: #242424; transition: background 0.1s ease; }\n';
css += '.stage__trigger:hover { background: rgba(36,36,36,0.04); }\n';
css += '.stage__trigger[aria-expanded="true"] { background: rgba(36,36,36,0.08); }\n';
css += '.stage__menu { position: absolute; top: calc(100% + 4px); right: 0; z-index: 50; display: none; }\n';
css += '.stage__menu--open { display: block; }\n';

// ─── Helper ─────────────────────────────────────────────────

function item(icon: string, label: string, opts: { chevron?: boolean; hover?: boolean } = {}): string {
  const cls = 'cm__item' + (opts.hover ? ' cm__item--hover' : '');
  let html = '<button class="' + cls + '" role="menuitem"' + (opts.chevron ? ' aria-haspopup="menu"' : '') + '>';
  html += '<span class="cm__icon">' + icon + '</span>';
  html += '<span class="cm__label">' + label + '</span>';
  if (opts.chevron) {
    html += '<span class="cm__chev">' + chevronRightIco + '</span>';
  }
  html += '</button>';
  return html;
}

function toggleRow(icon: string, label: string, on: boolean, opts: { hover?: boolean } = {}): string {
  const rowCls = 'cm__toggle-row' + (opts.hover ? ' cm__toggle-row--hover' : '');
  const tglCls = 'cm__tgl' + (on ? ' cm__tgl--on' : '');
  let html = '<div class="' + rowCls + '" role="menuitemcheckbox" aria-checked="' + (on ? 'true' : 'false') + '" tabindex="0">';
  html += '<span class="cm__icon">' + icon + '</span>';
  html += '<span class="cm__label">' + label + '</span>';
  html += '<span class="' + tglCls + '" aria-hidden="true"></span>';
  html += '</div>';
  return html;
}

function menuSurface(opts: { hoverIndex?: number; chevHoverIndex?: number; webSearchOn?: boolean; webSearchHover?: boolean } = {}): string {
  const items = [
    { icon: documentIco, label: 'Recent pages' },
    { icon: clockIco, label: 'Scheduled prompts' },
    { icon: settingsIco, label: 'Chat settings' },
    { icon: arrowDownloadIco, label: 'Download apps', chevron: true },
    { icon: questionCircleIco, label: 'Help and tips', chevron: true },
    { icon: personFeedbackIco, label: 'Send feedback' },
  ];
  let html = '<div class="cm" role="menu" aria-label="Settings">';
  items.forEach((it, idx) => {
    const hover = opts.hoverIndex === idx || (opts.chevHoverIndex === idx && it.chevron === true);
    html += item(it.icon, it.label, { chevron: it.chevron === true, hover });
  });
  html += '<div class="cm__divider"></div>';
  html += '<div class="cm__section-label">Copilot response includes</div>';
  html += toggleRow(globeIco, 'Web search', opts.webSearchOn !== false, { hover: opts.webSearchHover === true });
  html += '</div>';
  return html;
}

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html>';
html += '<html lang="en">';
html += '<head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Copilot Menu \u2014 M365 Copilot Design System Preview</title>';
html += '<style>' + css + '</style>';
html += '</head>';
html += '<body>';
html += '<div class="page">';

// ─── Section 1: Default open state ─────────────────────────
html += '<div>';
html += '<h2>Copilot Menu \u2014 Default (open)</h2>';
html += '<div class="demo">';
html += menuSurface();
html += '</div>';
html += '</div>';

// ─── Section 2: States matrix ──────────────────────────────
html += '<div>';
html += '<h2>States</h2>';
html += '<div class="state-row">';
html += '<div class="state-cell"><span class="state-label">Action item — Hover</span>';
html += '<div class="demo">' + menuSurface({ hoverIndex: 1 }) + '</div>';
html += '</div>';
html += '<div class="state-cell"><span class="state-label">Submenu item — Hover</span>';
html += '<div class="demo">' + menuSurface({ chevHoverIndex: 3 }) + '</div>';
html += '</div>';
html += '<div class="state-cell"><span class="state-label">Toggle — Off</span>';
html += '<div class="demo">' + menuSurface({ webSearchOn: false }) + '</div>';
html += '</div>';
html += '<div class="state-cell"><span class="state-label">Toggle row — Hover</span>';
html += '<div class="demo">' + menuSurface({ webSearchHover: true }) + '</div>';
html += '</div>';
html += '</div>';
html += '</div>';

// ─── Section 3: Anchored-to-trigger interactive demo ───────
html += '<div>';
html += '<h2>Interactive \u2014 Anchored to trigger</h2>';
html += '<div class="demo demo--stage">';
html += '<div class="stage">';
html += '<button class="stage__trigger" id="moreBtn" aria-haspopup="menu" aria-expanded="false" aria-label="More">';
html += moreIco;
html += '</button>';
html += '<div class="stage__menu" id="stageMenu">';
html += menuSurface();
html += '</div>';
html += '</div>';
html += '</div>';
html += '</div>';

html += '</div>'; // page

// ─── Script ─────────────────────────────────────────────────
html += '<script>';
html += 'var moreBtn = document.getElementById("moreBtn");';
html += 'var stageMenu = document.getElementById("stageMenu");';
html += 'moreBtn.addEventListener("click", function(e) {';
html += '  e.stopPropagation();';
html += '  var open = stageMenu.classList.toggle("stage__menu--open");';
html += '  moreBtn.setAttribute("aria-expanded", open ? "true" : "false");';
html += '});';
html += 'document.addEventListener("click", function(e) {';
html += '  if (stageMenu.classList.contains("stage__menu--open") && !stageMenu.contains(e.target) && e.target !== moreBtn && !moreBtn.contains(e.target)) {';
html += '    stageMenu.classList.remove("stage__menu--open");';
html += '    moreBtn.setAttribute("aria-expanded", "false");';
html += '  }';
html += '});';
html += 'document.addEventListener("keydown", function(e) {';
html += '  if (e.key === "Escape" && stageMenu.classList.contains("stage__menu--open")) {';
html += '    stageMenu.classList.remove("stage__menu--open");';
html += '    moreBtn.setAttribute("aria-expanded", "false");';
html += '    moreBtn.focus();';
html += '  }';
html += '});';
// Toggle interactivity inside the live menu
html += 'document.querySelectorAll(".stage__menu .cm__tgl").forEach(function(t) {';
html += '  var row = t.closest(".cm__toggle-row");';
html += '  function flip() {';
html += '    var on = t.classList.toggle("cm__tgl--on");';
html += '    if (row) row.setAttribute("aria-checked", on ? "true" : "false");';
html += '  }';
html += '  if (row) {';
html += '    row.addEventListener("click", function(e) { if (e.target !== t) flip(); });';
html += '    row.addEventListener("keydown", function(e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } });';
html += '  }';
html += '});';
html += '</script>';

html += '</body>';
html += '</html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'copilotMenu.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
