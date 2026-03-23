/**
 * Source Card — Interactive HTML Preview
 *
 * Shows the source card component in all 4 states:
 *   Add, Added, Enabled, Disabled
 * Plus interactive cards that transition between states.
 *
 * Usage:  npx tsx preview/src/sourceCard.ts
 * Output: preview/dist/sourceCard.html
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, ' ').trim();
}

const serviceNowIco = readIcon('servicenow-20-color.svg');
const notionIco = readIcon('notion-20-color.svg');
const hubspotIco = readIcon('hubspot-20-color.svg');

const addIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5C10.2761 2.5 10.5 2.72386 10.5 3V9.5H17C17.2761 9.5 17.5 9.72386 17.5 10C17.5 10.2761 17.2761 10.5 17 10.5H10.5V17C10.5 17.2761 10.2761 17.5 10 17.5C9.72386 17.5 9.5 17.2761 9.5 17V10.5H3C2.72386 10.5 2.5 10.2761 2.5 10C2.5 9.72386 2.72386 9.5 3 9.5H9.5V3C9.5 2.72386 9.72386 2.5 10 2.5Z" fill="currentColor"/></svg>';

const checkIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.72 13.53l-3.47-3.47a.75.75 0 00-1.06 1.06l4 4a.75.75 0 001.06 0l9-9a.75.75 0 00-1.06-1.06L7.72 13.53z" fill="#107C10"/></svg>';

// ─── CSS ────────────────────────────────────────────────────

let css = '';
css += '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n';
css += "html, body { height: 100%; font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif; color: #242424; background: #f5f5f5; }\n";
css += '.page { padding: 40px; display: flex; flex-direction: column; gap: 48px; }\n';
css += 'h2 { font-size: 14px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }\n';
css += '.demo { background: #fff; border-radius: 16px; padding: 32px; border: 1px solid #e8e8e8; display: inline-flex; gap: 24px; flex-wrap: wrap; }\n';
css += '.state-cell { display: flex; flex-direction: column; gap: 8px; }\n';
css += '.state-label { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.6px; }\n';

// Source card
css += ".src-card { display: flex; flex-direction: column; width: 180px; height: 84px; padding: 12px 20px; border: 1px solid #dedede; border-radius: 20px; background: #fff; font-family: 'Segoe UI', sans-serif; cursor: default; transition: border-color 0.15s, opacity 0.2s; }\n";
css += '.src-card:hover { border-color: #c4c4c4; }\n';
css += '.src-card__inner { display: flex; align-items: flex-start; justify-content: space-between; width: 100%; }\n';
css += '.src-card__left { display: flex; flex-direction: column; gap: 8px; }\n';
css += '.src-card__icon { width: 32px; height: 32px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }\n';
css += '.src-card__icon img, .src-card__icon svg { width: 32px; height: 32px; object-fit: contain; display: block; }\n';
css += '.src-card__name { font-size: 14px; font-weight: 400; line-height: 20px; color: #242424; white-space: nowrap; }\n';
css += '.src-card__action { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; flex-shrink: 0; }\n';
// Add button
css += '.src-card__add-btn { width: 32px; height: 32px; border-radius: 9999px; border: none; background: rgba(36,36,36,0.04); color: #242424; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.1s; padding: 0; outline: none; }\n';
css += '.src-card__add-btn:hover { background: rgba(36,36,36,0.08); }\n';
css += '.src-card__add-btn svg { width: 20px; height: 20px; display: block; }\n';
// Check
css += '.src-card__check { width: 32px; height: 32px; border-radius: 9999px; background: rgba(36,36,36,0.04); color: #107C10; display: flex; align-items: center; justify-content: center; }\n';
css += '.src-card__check svg { width: 20px; height: 20px; display: block; }\n';
// Toggle
css += '.src-card__toggle { width: 32px; height: 16px; border-radius: 9999px; position: relative; cursor: pointer; transition: background 0.15s; flex-shrink: 0; margin-top: 8px; }\n';
css += '.src-card__toggle::after { content: ""; width: 12px; height: 12px; border-radius: 9999px; position: absolute; top: 2px; transition: left 0.15s, background 0.15s; }\n';
css += '.src-card__toggle--on { background: #242424; }\n';
css += '.src-card__toggle--on::after { background: #fff; left: 18px; }\n';
css += '.src-card__toggle--off { background: #fff; border: 1px solid #dedede; }\n';
css += '.src-card__toggle--off::after { background: #6f6f6f; left: 2px; }\n';
// Disabled
css += '.src-card--disabled { opacity: 0.4; }\n';
css += '.src-card--disabled .src-card__name { color: #929292; }\n';

// ─── Helpers ────────────────────────────────────────────────

function card(icon: string, name: string, action: string, extra = ''): string {
  return '<div class="src-card' + extra + '"><div class="src-card__inner">'
    + '<div class="src-card__left">'
    + '<span class="src-card__icon">' + icon + '</span>'
    + '<span class="src-card__name">' + name + '</span>'
    + '</div>'
    + '<div class="src-card__action">' + action + '</div>'
    + '</div></div>';
}

const addBtn = '<button class="src-card__add-btn">' + addIco + '</button>';
const checkEl = '<span class="src-card__check">' + checkIco + '</span>';
const toggleOn = '<div class="src-card__toggle src-card__toggle--on"></div>';
const toggleOff = '<div class="src-card__toggle src-card__toggle--off"></div>';

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html>';
html += '<html lang="en">';
html += '<head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Source Card \u2014 Bebop Design System Preview</title>';
html += '<style>' + css + '</style>';
html += '</head>';
html += '<body>';
html += '<div class="page">';

// Section 1: Static states
html += '<div>';
html += '<h2>Source Card \u2014 4 States</h2>';
html += '<div class="demo">';
html += '<div class="state-cell"><span class="state-label">Add</span>';
html += card(serviceNowIco, 'ServiceNow', addBtn);
html += '</div>';
html += '<div class="state-cell"><span class="state-label">Added</span>';
html += card(serviceNowIco, 'ServiceNow', checkEl);
html += '</div>';
html += '<div class="state-cell"><span class="state-label">Enabled</span>';
html += card(serviceNowIco, 'ServiceNow', toggleOn);
html += '</div>';
html += '<div class="state-cell"><span class="state-label">Disabled</span>';
html += card(serviceNowIco, 'ServiceNow', toggleOff, ' src-card--disabled');
html += '</div>';
html += '</div>';
html += '</div>';

// Section 2: Interactive
html += '<div>';
html += '<h2>Interactive \u2014 Click + to Connect</h2>';
html += '<div class="demo">';
html += card(notionIco, 'Notion', addBtn);
html += card(hubspotIco, 'Hubspot', addBtn);
html += card(serviceNowIco, 'ServiceNow', toggleOn);
html += '</div>';
html += '</div>';

// Section 3: Different icons
html += '<div>';
html += '<h2>Various Sources</h2>';
html += '<div class="demo">';
html += card('<img src="../../src/components/icons/jira-20-color.png" alt="Jira" />', 'Jira', toggleOn);
html += card(notionIco, 'Notion', addBtn);
html += card(hubspotIco, 'Hubspot', checkEl);
html += '</div>';
html += '</div>';

html += '</div>'; // page

// Script
html += '<script>';
// Toggle click
html += 'document.querySelectorAll(".src-card__toggle").forEach(function(el) {';
html += '  el.addEventListener("click", function() {';
html += '    var isOn = el.classList.contains("src-card__toggle--on");';
html += '    el.classList.toggle("src-card__toggle--on");';
html += '    el.classList.toggle("src-card__toggle--off");';
html += '    el.closest(".src-card").classList.toggle("src-card--disabled", isOn);';
html += '  });';
html += '});';
html += '\n';
// Add button click -> added -> enabled
html += 'document.querySelectorAll(".src-card__add-btn").forEach(function(btn) {';
html += '  btn.addEventListener("click", function() {';
html += '    var card = btn.closest(".src-card");';
html += '    var action = card.querySelector(".src-card__action");';
html += '    action.innerHTML = \'<span class="src-card__check">' + checkIco + '</span>\';';
html += '    setTimeout(function() {';
html += '      action.innerHTML = \'<div class="src-card__toggle src-card__toggle--on"></div>\';';
html += '      var tgl = action.querySelector(".src-card__toggle");';
html += '      tgl.addEventListener("click", function() {';
html += '        var isOn = tgl.classList.contains("src-card__toggle--on");';
html += '        tgl.classList.toggle("src-card__toggle--on");';
html += '        tgl.classList.toggle("src-card__toggle--off");';
html += '        card.classList.toggle("src-card--disabled", isOn);';
html += '      });';
html += '    }, 1500);';
html += '  });';
html += '});';
html += '\n';
html += '</script>';

html += '</body>';
html += '</html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'sourceCard.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
