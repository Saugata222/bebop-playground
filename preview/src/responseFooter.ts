/**
 * Response Footer — Interactive Preview
 *
 * Shows the response footer with action toolbar (Copy, Thumbs Up, Thumbs Down),
 * vertical divider, and sources button with file-type icon stack + chevron.
 *
 * Click Like/Dislike to toggle filled state. Click Copy for toast feedback.
 *
 * Usage:  npx tsx preview/src/responseFooter.ts
 * Output: preview/dist/responseFooter.html
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Read icon files ────────────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');

function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, ' ').trim();
}

const copyIco = readIcon('copy-20-regular.svg');
const thumbLikeR = readIcon('thumb-like-20-regular.svg');
const thumbLikeF = readIcon('thumb-like-20-filled.svg');
const thumbDislikeR = readIcon('thumb-dislike-20-regular.svg');
const thumbDislikeF = readIcon('thumb-dislike-20-filled.svg');
const chevronRightIco12 = readIcon('chevron-right-12-regular.svg');
const wordIco = readIcon('word-20-color.svg');
const excelIco = readIcon('excel-20-color.svg');
const pptIco = readIcon('powerpoint-20-color.svg');

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { width: 100%; max-width: 780px; margin: 0 auto; }

/* Mock response text */
.response-text { font-family: Aptos, 'Segoe UI', sans-serif; font-size: 16px; line-height: 28px; color: #242424; }
.response-text p { margin: 0 0 12px; }

/* Response footer container */
.rf { display: flex; align-items: center; padding-top: 16px; }

/* Action toolbar */
.rf__toolbar { display: flex; align-items: center; gap: 0; }

/* Action button */
.rf__btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border-radius: 9999px; background: transparent; border: none; cursor: pointer; color: #424242; transition: background 0.1s, color 0.1s; }
.rf__btn:hover { background: rgba(36, 36, 36, 0.04); color: #242424; }
.rf__btn:active { background: rgba(36, 36, 36, 0.08); }
.rf__btn svg { width: 20px; height: 20px; }

/* Icon swap: regular ↔ filled for like/dislike */
.rf__btn .ico-r { display: block; line-height: 0; }
.rf__btn .ico-f { display: none; line-height: 0; }
.rf__btn.rf__btn--active .ico-r { display: none; }
.rf__btn.rf__btn--active .ico-f { display: block; }

/* Divider */
.rf__divider { width: 1px; height: 20px; background: #dedede; margin: 0 4px; flex-shrink: 0; }

/* Sources button */
.rf__sources { display: flex; align-items: center; gap: 4px; height: 32px; min-width: 32px; padding: 6px 10px; border-radius: 16px; background: transparent; border: none; cursor: pointer; color: #242424; transition: background 0.1s; }
.rf__sources:hover { background: rgba(36, 36, 36, 0.04); }
.rf__sources:active { background: rgba(36, 36, 36, 0.08); }

/* Icon stack */
.rf__icons { display: flex; align-items: center; gap: 2px; }
.rf__icons svg { width: 20px; height: 20px; }

/* Chevron */
.rf__chevron { width: 12px; height: 12px; color: #424242; }
.rf__chevron svg { width: 12px; height: 12px; }

/* Copy toast */
.rf__toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: #242424; color: #fff; font-size: 13px; padding: 8px 16px; border-radius: 8px; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
.rf__toast--visible { opacity: 1; }

/* Row for states */
.row { display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-start; margin-bottom: 16px; }
.cell { display: flex; flex-direction: column; gap: 8px; }
.rl { font-size: 11px; font-weight: 600; color: #929292; text-transform: uppercase; letter-spacing: 0.5px; }
`;

// ─── Helpers ────────────────────────────────────────────────

function likeBtn(): string {
  return '<button class="rf__btn rf__btn--like" title="Like">'
    + '<span class="ico-r">' + thumbLikeR + '</span>'
    + '<span class="ico-f">' + thumbLikeF + '</span>'
    + '</button>';
}

function dislikeBtn(): string {
  return '<button class="rf__btn rf__btn--dislike" title="Dislike">'
    + '<span class="ico-r">' + thumbDislikeR + '</span>'
    + '<span class="ico-f">' + thumbDislikeF + '</span>'
    + '</button>';
}

function footer(sources: string[]): string {
  let h = '<div class="rf">';
  h += '<div class="rf__toolbar">';
  h += '<button class="rf__btn rf__btn--copy" title="Copy">' + copyIco + '</button>';
  h += likeBtn();
  h += dislikeBtn();
  h += '</div>';
  if (sources.length > 0) {
    h += '<div class="rf__divider"></div>';
    h += '<button class="rf__sources" title="View sources">';
    h += '<span class="rf__icons">' + sources.join('') + '</span>';
    h += '<span class="rf__chevron">' + chevronRightIco12 + '</span>';
    h += '</button>';
  }
  h += '</div>';
  return h;
}

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Response Footer Preview</title>';
html += '<style>' + css + '</style></head><body>';

html += '<div class="wrap">';
html += '<h1>Response Footer \u2014 Component Preview</h1>';
html += '<p class="hint">Click Like / Dislike to toggle selected (filled) state. Click Copy for toast.</p>';

// Default with response text
html += '<h2>Default</h2>';
html += '<div class="response-text">';
html += '<p>Here\u2019s a summary of the quarterly report. Revenue increased by 12% year-over-year, driven primarily by strong growth in the cloud services division. Operating margins improved to 38%, reflecting ongoing efficiency initiatives.</p>';
html += '</div>';
html += footer([wordIco, excelIco, pptIco]);

// With two sources
html += '<h2>Two sources</h2>';
html += '<div class="response-text">';
html += '<p>Based on the files you shared, here are the key action items from the meeting.</p>';
html += '</div>';
html += footer([wordIco, excelIco]);

// States
html += '<h2>States</h2>';
html += '<div class="row">';

html += '<div class="cell"><span class="rl">Action toolbar only</span>';
html += footer([]);
html += '</div>';

html += '<div class="cell"><span class="rl">Single source</span>';
html += footer([wordIco]);
html += '</div>';

html += '<div class="cell"><span class="rl">Three sources</span>';
html += footer([wordIco, excelIco, pptIco]);
html += '</div>';

html += '</div>'; // end row

html += '</div>'; // end wrap

// Toast
html += '<div class="rf__toast" id="toast">Copied to clipboard</div>';

// Script
html += '<script>';
// Copy toast
html += 'document.querySelectorAll(".rf__btn--copy").forEach(function(btn) {';
html += '  btn.addEventListener("click", function() {';
html += '    var toast = document.getElementById("toast");';
html += '    toast.classList.add("rf__toast--visible");';
html += '    setTimeout(function() { toast.classList.remove("rf__toast--visible"); }, 1500);';
html += '  });';
html += '});';
// Like/Dislike toggle — mutually exclusive within the same footer
html += 'document.querySelectorAll(".rf__btn--like, .rf__btn--dislike").forEach(function(btn) {';
html += '  btn.addEventListener("click", function() {';
html += '    var footer = btn.closest(".rf");';
html += '    var isLike = btn.classList.contains("rf__btn--like");';
html += '    var sibling = footer.querySelector(isLike ? ".rf__btn--dislike" : ".rf__btn--like");';
html += '    if (btn.classList.contains("rf__btn--active")) {';
html += '      btn.classList.remove("rf__btn--active");';
html += '    } else {';
html += '      btn.classList.add("rf__btn--active");';
html += '      if (sibling) sibling.classList.remove("rf__btn--active");';
html += '    }';
html += '  });';
html += '});';
html += '</script>';

html += '</body></html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, 'responseFooter.html'), html, 'utf-8');
console.log('Done: preview/dist/responseFooter.html');
