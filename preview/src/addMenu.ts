/**
 * Add Menu — Interactive HTML Preview
 *
 * Shows the Add Menu flyout component with:
 *   - Work IQ header row with toggle switch
 *   - Divider
 *   - 5 menu items with icons
 *   - Hover and focus states
 *
 * Usage:  npx tsx preview/src/addMenu.ts
 * Output: preview/dist/addMenu.html
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Icons (20px, fill="currentColor") ──────────────────────

const briefcaseIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 2C12.2165 2 13 2.7835 13 3.75V5H15C16.6569 5 18 6.34315 18 8V14C18 15.6569 16.6569 17 15 17H5C3.39489 17 2.08421 15.7394 2.00391 14.1543L2 14V8C2 6.34315 3.34315 5 5 5H7V3.75C7 2.7835 7.7835 2 8.75 2H11.25ZM17 11.2314C16.469 11.7077 15.7695 12 15 12H11V12.5C11 12.7761 10.7761 13 10.5 13H9.5C9.22386 13 9 12.7761 9 12.5V12H5C4.23053 12 3.53103 11.7077 3 11.2314V14L3.01074 14.2041C3.113 15.2128 3.96435 16 5 16H15C16.1046 16 17 15.1046 17 14V11.2314ZM5 6C3.89543 6 3 6.89543 3 8V9C3 10.1046 3.89543 11 5 11H9V10.5C9 10.2239 9.22386 10 9.5 10H10.5C10.7761 10 11 10.2239 11 10.5V11H15C16.1046 11 17 10.1046 17 9V8C17 6.89543 16.1046 6 15 6H5ZM8.75 3C8.33579 3 8 3.33579 8 3.75V5H12V3.75C12 3.33579 11.6642 3 11.25 3H8.75Z" fill="currentColor"/></svg>';

const addIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5C10.2761 2.5 10.5 2.72386 10.5 3V9.5H17C17.2761 9.5 17.5 9.72386 17.5 10C17.5 10.2761 17.2761 10.5 17 10.5H10.5V17C10.5 17.2761 10.2761 17.5 10 17.5C9.72386 17.5 9.5 17.2761 9.5 17V10.5H3C2.72386 10.5 2.5 10.2761 2.5 10C2.5 9.72386 2.72386 9.5 3 9.5H9.5V3C9.5 2.72386 9.72386 2.5 10 2.5Z" fill="currentColor"/></svg>';

const arrowUploadIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 3.00195C15.2761 3.00195 15.5 2.7781 15.5 2.50195C15.5 2.25649 15.3231 2.05235 15.0899 2.01001L15 2.00195H4C3.72386 2.00195 3.5 2.22581 3.5 2.50195C3.5 2.74741 3.67688 2.95156 3.91012 2.9939L4 3.00195H15ZM9.50014 17.9997C9.7456 17.9997 9.9497 17.8227 9.99197 17.5895L10 17.4996L9.996 5.70574L13.6414 9.35408C13.8148 9.5278 14.0842 9.54734 14.2792 9.41252L14.3485 9.35473C14.5222 9.18132 14.5418 8.91192 14.407 8.71692L14.3492 8.64762L9.85745 4.14762C9.78495 4.07499 9.69568 4.02931 9.60207 4.01059L9.49608 4.00085C9.33511 4.00085 9.19192 4.07697 9.10051 4.19517L4.64386 8.64704C4.44846 8.84217 4.44823 9.15875 4.64336 9.35415C4.8168 9.52784 5.08621 9.54732 5.28117 9.41246L5.35046 9.35465L8.996 5.71374L9 17.4999C9.00008 17.776 9.224 17.9997 9.50014 17.9997Z" fill="currentColor"/></svg>';

const cloudIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4C12.8166 4 14.4145 5.92329 14.6469 8.24599L14.7179 8.24599C16.5306 8.24599 18 9.75792 18 11.623C18 13.4881 16.5306 15 14.7179 15H5.28205C3.46942 15 2 13.4881 2 11.623C2 9.82009 3.3731 8.34717 5.10199 8.25098L5.35314 8.24599C5.58687 5.90802 7.18335 4 10 4ZM10 5C7.88606 5 6.55108 6.31588 6.34818 8.34547C6.29707 8.85669 5.86688 9.24601 5.3531 9.24599L5.28207 9.24599C4.02819 9.24599 3 10.3039 3 11.623C3 12.9421 4.02819 14 5.28205 14H14.7179C15.9718 14 17 12.9421 17 11.623C17 10.3039 15.9718 9.24599 14.718 9.24599L14.6469 9.24599C14.1332 9.24601 13.703 8.85673 13.6518 8.34554C13.4497 6.32493 12.1085 5 10 5Z" fill="currentColor"/></svg>';

const flowIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 5C13.8954 5 13 5.89543 13 7C13 8.10457 13.8954 9 15 9C16.1046 9 17 8.10457 17 7C17 5.89543 16.1046 5 15 5ZM12.0415 6.5C12.2795 5.08114 13.5135 4 15 4C16.6569 4 18 5.34315 18 7C18 8.65685 16.6569 10 15 10C13.5135 10 12.2795 8.91886 12.0415 7.5H12C11.1716 7.5 10.5 8.17157 10.5 9V11.0001C10.5 12.3808 9.38071 13.5001 8 13.5001H7.9585C7.72042 14.9189 6.48646 16 5 16C3.34315 16 2 14.6569 2 13C2 11.3431 3.34315 10 5 10C6.48654 10 7.72055 11.0812 7.95854 12.5001H8C8.82843 12.5001 9.5 11.8285 9.5 11.0001V9C9.5 7.61929 10.6193 6.5 12 6.5H12.0415ZM5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11Z" fill="currentColor"/></svg>';

const mentionIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C14.4181 2.00016 17.9999 5.58193 18 10C18 12.4998 16.6223 13.9961 15 13.9961C13.9289 13.996 12.9643 13.3436 12.4326 12.1807C11.8198 13.2605 10.7603 14 9.5 14C7.49747 14 6 12.1341 6 10C6 7.86595 7.49747 6 9.5 6C10.5007 6 11.3754 6.46576 12 7.19824V6.5C12 6.22386 12.2239 6 12.5 6C12.7761 6 13 6.22386 13 6.5V10L13.0127 10.3896C13.1391 12.2623 14.177 12.996 15 12.9961C15.8779 12.9961 17 12.1615 17 10C16.9999 6.13422 13.8658 3.00016 10 3C6.13409 3 3.00013 6.13412 3 10C3.00016 13.8659 6.13411 17 10 17C10.8017 17 11.571 16.863 12.2881 16.6143C12.4827 16.5468 12.7009 16.5898 12.8467 16.7354C13.0995 16.9881 13.0231 17.4148 12.6865 17.5352C11.8469 17.8354 10.9428 18 10 18C5.58182 18 2.00016 14.4181 2 10C2.00013 5.58183 5.5818 2 10 2ZM9.5 7C8.18882 7 7 8.26806 7 10C7 11.7319 8.18882 13 9.5 13C10.8112 13 12 11.7319 12 10C12 8.26806 10.8112 7 9.5 7Z" fill="currentColor"/></svg>';

// ─── CSS ────────────────────────────────────────────────────

let css = '';
css += '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n';
css += "html, body { height: 100%; font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif; color: #242424; background: #f5f5f5; }\n";
css += '.page { padding: 40px; display: flex; flex-direction: column; gap: 48px; }\n';
css += 'h2 { font-size: 14px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }\n';
css += '.demo { background: #fff; border-radius: 16px; padding: 32px; border: 1px solid #e8e8e8; display: inline-flex; }\n';
css += '.state-row { display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-start; }\n';
css += '.state-cell { display: flex; flex-direction: column; gap: 8px; }\n';
css += '.state-label { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.6px; }\n';

// Add menu surface
css += ".am { display: flex; flex-direction: column; gap: 4px; width: 260px; background: #fff; border-radius: 16px; padding: 8px; font-family: 'Segoe UI', sans-serif; }\n";

// Header row
css += '.am__hdr { display: flex; height: 44px; align-items: center; padding: 4px 0; }\n';
css += '.am__hdr-inner { display: flex; align-items: center; gap: 8px; flex: 1; padding: 8px 12px; border-radius: 12px; background: transparent; }\n';
css += '.am__hdr-icon { display: flex; flex-shrink: 0; width: 20px; height: 20px; color: #242424; }\n';
css += '.am__hdr-icon svg { display: block; width: 20px; height: 20px; }\n';
css += '.am__hdr-label { flex: 1; font-size: 14px; font-weight: 400; line-height: 20px; color: #242424; }\n';

// Toggle switch
css += '.am__toggle { position: relative; width: 32px; height: 16px; border-radius: 9999px; background: #ababab; border: none; cursor: pointer; padding: 2px; transition: background 0.2s; flex-shrink: 0; outline: none; }\n';
css += '.am__toggle.on { background: #242424; }\n';
css += '.am__toggle::after { content: ""; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-radius: 9999px; background: #fff; transition: left 0.2s; }\n';
css += '.am__toggle.on::after { left: 18px; }\n';
css += '.am__toggle:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }\n';

// Divider
css += '.am__divider { padding: 8px 0; width: 100%; }\n';
css += '.am__divider-line { height: 1px; background: #f0f0f0; width: 100%; }\n';

// Menu item
css += ".am__item { display: flex; align-items: center; gap: 8px; padding: 12px; border-radius: 12px; background: transparent; border: none; cursor: pointer; font-family: 'Segoe UI', sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; color: #242424; text-align: left; width: 100%; transition: background 0.1s; outline: none; }\n";
css += '.am__item:hover { background: rgba(36,36,36,0.04); color: #1d1d1d; }\n';
css += '.am__item:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }\n';
css += '.am__item-icon { display: flex; flex-shrink: 0; width: 20px; height: 20px; color: #242424; }\n';
css += '.am__item-icon svg { display: block; width: 20px; height: 20px; }\n';
css += '.am__item-label { flex: 1; }\n';

// Forced hover for demo
css += '.am__item--hover { background: rgba(36,36,36,0.04); color: #1d1d1d; }\n';

// ─── Helper ─────────────────────────────────────────────────

function menuItem(icon: string, label: string, extra = ''): string {
  return '<button class="am__item' + extra + '">'
    + '<span class="am__item-icon">' + icon + '</span>'
    + '<span class="am__item-label">' + label + '</span>'
    + '</button>';
}

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html>';
html += '<html lang="en">';
html += '<head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Add Menu \u2014 Bebop Design System Preview</title>';
html += '<style>' + css + '</style>';
html += '</head>';
html += '<body>';
html += '<div class="page">';

// ─── Section 1: Full component (interactive) ───
html += '<div>';
html += '<h2>Add Menu \u2014 Interactive</h2>';
html += '<div class="demo">';
html += '<div class="am">';

// Header
html += '<div class="am__hdr"><div class="am__hdr-inner">';
html += '<span class="am__hdr-icon">' + briefcaseIco + '</span>';
html += '<span class="am__hdr-label">Work IQ</span>';
html += '<button class="am__toggle on" id="toggle1" aria-label="Toggle Work IQ"></button>';
html += '</div></div>';

// Divider
html += '<div class="am__divider"><div class="am__divider-line"></div></div>';

// Items
html += menuItem(addIco, 'Add work content');
html += menuItem(arrowUploadIco, 'Upload images and files');
html += menuItem(cloudIco, 'Attach cloud files');
html += menuItem(flowIco, 'Change data sources');
html += menuItem(mentionIco, 'Chat with agents');

html += '</div>'; // end am
html += '</div>'; // end demo
html += '</div>';

// ─── Section 2: With hover on "Change data sources" ───
html += '<div>';
html += '<h2>Add Menu \u2014 Hover State on Item</h2>';
html += '<div class="demo">';
html += '<div class="am">';

html += '<div class="am__hdr"><div class="am__hdr-inner">';
html += '<span class="am__hdr-icon">' + briefcaseIco + '</span>';
html += '<span class="am__hdr-label">Work IQ</span>';
html += '<button class="am__toggle on" aria-label="Toggle Work IQ"></button>';
html += '</div></div>';

html += '<div class="am__divider"><div class="am__divider-line"></div></div>';

html += menuItem(addIco, 'Add work content');
html += menuItem(arrowUploadIco, 'Upload images and files');
html += menuItem(cloudIco, 'Attach cloud files');
html += menuItem(flowIco, 'Change data sources', ' am__item--hover');
html += menuItem(mentionIco, 'Chat with agents');

html += '</div>';
html += '</div>';
html += '</div>';

// ─── Section 3: Toggle off ───
html += '<div>';
html += '<h2>Add Menu \u2014 Toggle Off</h2>';
html += '<div class="demo">';
html += '<div class="am">';

html += '<div class="am__hdr"><div class="am__hdr-inner">';
html += '<span class="am__hdr-icon">' + briefcaseIco + '</span>';
html += '<span class="am__hdr-label">Work IQ</span>';
html += '<button class="am__toggle" aria-label="Toggle Work IQ"></button>';
html += '</div></div>';

html += '<div class="am__divider"><div class="am__divider-line"></div></div>';

html += menuItem(addIco, 'Add work content');
html += menuItem(arrowUploadIco, 'Upload images and files');
html += menuItem(cloudIco, 'Attach cloud files');
html += menuItem(flowIco, 'Change data sources');
html += menuItem(mentionIco, 'Chat with agents');

html += '</div>';
html += '</div>';
html += '</div>';

// ─── Section 4: Individual menu item states ───
html += '<div>';
html += '<h2>Menu Item States</h2>';
html += '<div class="state-row">';
html += '<div class="state-cell"><span class="state-label">Rest</span>';
html += menuItem(addIco, 'Add work content');
html += '</div>';
html += '<div class="state-cell"><span class="state-label">Hover</span>';
html += menuItem(addIco, 'Add work content', ' am__item--hover');
html += '</div>';
html += '</div>';
html += '</div>';

html += '</div>'; // page

// ─── Script ─────────────────────────────────────────────────
html += '<script>';
// Toggle interactivity
html += 'document.querySelectorAll(".am__toggle").forEach(function(t) {';
html += '  t.addEventListener("click", function() { t.classList.toggle("on"); });';
html += '});';
html += '</script>';

html += '</body>';
html += '</html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'addMenu.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
