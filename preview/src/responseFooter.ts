/**
 * Response Footer — Interactive Preview
 *
 * Shows the response footer with action toolbar (Copy, Thumbs Up, Thumbs Down),
 * vertical divider, and sources button with file-type icon stack + chevron.
 *
 * Click action buttons to see press/active feedback.
 * Click sources button to toggle a mock sources panel.
 *
 * Usage:  npx tsx preview/src/responseFooter.ts
 * Output: preview/dist/responseFooter.html
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Icons ──────────────────────────────────────────────────

const copyIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2C6.89543 2 6 2.89543 6 4V14C6 15.1046 6.89543 16 8 16H14C15.1046 16 16 15.1046 16 14V4C16 2.89543 15.1046 2 14 2H8ZM7 4C7 3.44772 7.44772 3 8 3H14C14.5523 3 15 3.44772 15 4V14C15 14.5523 14.5523 15 14 15H8C7.44772 15 7 14.5523 7 14V4ZM4 6.00001C4 5.25973 4.4022 4.61339 5 4.26758V14.5C5 15.8807 6.11929 17 7.5 17H13.7324C13.3866 17.5978 12.7403 18 12 18H7.5C5.567 18 4 16.433 4 14.5V6.00001Z" fill="currentColor"/></svg>';

const thumbLikeIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.052 2.29418C10.3913 1.31688 11.6841 0.866611 12.4829 1.70374C12.6455 1.87416 12.8081 2.05832 12.9176 2.22254C13.2379 2.70305 13.3725 3.33584 13.4218 3.9522C13.4721 4.58034 13.438 5.25446 13.3738 5.86473C13.3093 6.47735 13.2129 7.03948 13.1328 7.44766C13.1294 7.46535 13.1259 7.48277 13.1225 7.49989H14.006C15.8777 7.49989 17.2924 9.19503 16.9576 11.0365L16.2737 14.7983C15.8017 17.3942 13.2078 19.0289 10.6622 18.3347L5.06251 16.8075C4.14894 16.5583 3.45455 15.8144 3.26885 14.8859L2.91581 13.1207C2.63809 11.7321 3.69991 10.5623 4.82905 10.116C5.15163 9.9885 5.44337 9.82668 5.66974 9.62586C7.37583 8.11234 7.99442 6.90276 9.05406 4.77684C9.4084 4.06594 9.77205 3.10043 10.052 2.29418ZM12.0165 7.87851L12.0169 7.87696L12.0187 7.86962L12.0262 7.83852C12.0328 7.81068 12.0426 7.76892 12.0549 7.71482C12.0793 7.60658 12.1135 7.44919 12.1515 7.25525C12.2277 6.86655 12.3188 6.33493 12.3793 5.76005C12.4401 5.18282 12.4685 4.57569 12.425 4.03195C12.3806 3.47644 12.2652 3.04673 12.0855 2.77724C12.0264 2.68859 11.9138 2.55593 11.7594 2.3941C11.5605 2.18565 11.1314 2.23417 10.9967 2.62217C10.7141 3.43598 10.3334 4.45183 9.94904 5.22294C8.88216 7.36338 8.19326 8.72396 6.33336 10.3739C5.99304 10.6758 5.58878 10.891 5.19665 11.046C4.31631 11.394 3.75035 12.1944 3.89639 12.9246L4.24943 14.6898C4.36085 15.2469 4.77748 15.6932 5.32562 15.8427L10.9254 17.3699C12.9052 17.9099 14.9227 16.6384 15.2898 14.6194L15.9738 10.8577C16.197 9.62998 15.2538 8.49989 14.006 8.49989H12.5015C12.3476 8.49989 12.2022 8.42895 12.1074 8.3076C12.0127 8.18627 11.9792 8.02785 12.0165 7.87851Z" fill="currentColor"/></svg>';

const thumbDislikeIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.052 17.7055C10.3913 18.6828 11.6841 19.133 12.4829 18.2959C12.6455 18.1255 12.8081 17.9413 12.9176 17.7771C13.2379 17.2966 13.3725 16.6638 13.4218 16.0474C13.4721 15.4193 13.438 14.7452 13.3738 14.1349C13.3093 13.5223 13.2129 12.9602 13.1328 12.552C13.1294 12.5343 13.1259 12.5169 13.1225 12.4998H14.006C15.8777 12.4998 17.2924 10.8046 16.9576 8.9631L16.2737 5.2014C15.8017 2.60545 13.2078 0.970708 10.6622 1.66494L5.06251 3.19214C4.14894 3.4413 3.45455 4.18522 3.26885 5.11376L2.91581 6.87894C2.63809 8.26755 3.69991 9.43732 4.82905 9.88364C5.15163 10.0111 5.44337 10.173 5.66974 10.3738C7.37583 11.8873 7.99442 13.0969 9.05406 15.2228C9.4084 15.9337 9.77205 16.8992 10.052 17.7055ZM12.0165 12.1211L12.0169 12.1227L12.0187 12.13L12.0262 12.1611C12.0328 12.189 12.0426 12.2307 12.0549 12.2848C12.0793 12.3931 12.1135 12.5505 12.1515 12.7444C12.2277 13.1331 12.3188 13.6647 12.3793 14.2396C12.4401 14.8168 12.4685 15.424 12.425 15.9677C12.3806 16.5232 12.2652 16.9529 12.0855 17.2224C12.0264 17.3111 11.9138 17.4437 11.7594 17.6055C11.5605 17.814 11.1314 17.7655 10.9967 17.3775C10.7141 16.5637 10.3334 15.5478 9.94904 14.7767C8.88216 12.6363 8.19326 11.2757 6.33336 9.62572C5.99304 9.32382 5.58878 9.10865 5.19665 8.95366C4.31631 8.60568 3.75035 7.80525 3.89639 7.07506L4.24943 5.30988C4.36085 4.75276 4.77748 4.3064 5.32562 4.15691L10.9254 2.62971C12.9052 2.08975 14.9227 3.36121 15.2898 5.38028L15.9738 9.14198C16.197 10.3697 15.2538 11.4998 14.006 11.4998H12.5015C12.3476 11.4998 12.2022 11.5707 12.1074 11.6921C12.0127 11.8134 11.9792 11.9718 12.0165 12.1211Z" fill="currentColor"/></svg>';

const chevronRightIco12 = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.64645 2.14645C4.45118 2.34171 4.45118 2.65829 4.64645 2.85355L7.79289 6L4.64645 9.14645C4.45118 9.34171 4.45118 9.65829 4.64645 9.85355C4.84171 10.0488 5.15829 10.0488 5.35355 9.85355L8.85355 6.35355C9.04882 6.15829 9.04882 5.84171 8.85355 5.64645L5.35355 2.14645C5.15829 1.95118 4.84171 1.95118 4.64645 2.14645Z" fill="currentColor"/></svg>';

// File-type icons (simplified colored SVGs matching Fluent file icons)
const wordIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="2" width="12" height="16" rx="2" fill="#185ABD"/><path d="M7.5 7H12.5M7.5 10H12.5M7.5 13H10.5" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>';

const excelIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="2" width="12" height="16" rx="2" fill="#107C41"/><path d="M8 7L12 13M12 7L8 13" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>';

const pptIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="2" width="12" height="16" rx="2" fill="#C43E1C"/><path d="M8 13V7H11C12.1046 7 13 7.89543 13 9V9C13 10.1046 12.1046 11 11 11H8" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// ─── CSS ────────────────────────────────────────────────────

let css = '';
css += '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n';
css += "body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif; background: #fff; color: #242424; padding: 48px; display: flex; flex-direction: column; gap: 48px; align-items: flex-start; }\n";

// Section
css += '.section { display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 772px; }\n';
css += '.section__title { font-size: 13px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.5px; }\n';

// Mock response text
css += '.response-text { font-size: 14px; line-height: 1.6; color: #242424; max-width: 640px; }\n';
css += '.response-text p { margin-bottom: 8px; }\n';

// Response footer container
css += '.rf { display: flex; align-items: center; padding-top: 16px; width: 100%; }\n';

// Action toolbar
css += '.rf__toolbar { display: flex; align-items: center; gap: 0; }\n';

// Action button
css += '.rf__btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border-radius: 9999px; background: transparent; border: none; cursor: pointer; color: #424242; transition: background 0.1s, color 0.1s; }\n';
css += '.rf__btn:hover { background: rgba(36, 36, 36, 0.04); color: #242424; }\n';
css += '.rf__btn:active { background: rgba(36, 36, 36, 0.08); }\n';
css += '.rf__btn svg { width: 20px; height: 20px; }\n';

// Tooltip
css += '.rf__btn[title] { position: relative; }\n';

// Divider
css += '.rf__divider { width: 1px; height: 20px; background: #dedede; margin: 0 4px; flex-shrink: 0; }\n';

// Sources button
css += '.rf__sources { display: flex; align-items: center; gap: 4px; height: 32px; min-width: 32px; padding: 6px 10px; border-radius: 16px; background: transparent; border: none; cursor: pointer; color: #242424; transition: background 0.1s; }\n';
css += '.rf__sources:hover { background: rgba(36, 36, 36, 0.04); }\n';
css += '.rf__sources:active { background: rgba(36, 36, 36, 0.08); }\n';

// Icon stack
css += '.rf__icons { display: flex; align-items: center; gap: 2px; }\n';
css += '.rf__icons svg { width: 20px; height: 20px; }\n';

// Chevron
css += '.rf__chevron { width: 12px; height: 12px; color: #424242; }\n';
css += '.rf__chevron svg { width: 12px; height: 12px; }\n';

// Copy toast
css += '.rf__toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: #242424; color: #fff; font-size: 13px; padding: 8px 16px; border-radius: 8px; opacity: 0; transition: opacity 0.2s; pointer-events: none; }\n';
css += '.rf__toast--visible { opacity: 1; }\n';

// Variant: with more actions
css += '.rf--full .rf__toolbar { gap: 0; }\n';

// States section
css += '.states { display: flex; gap: 24px; flex-wrap: wrap; }\n';
css += '.state-card { display: flex; flex-direction: column; gap: 8px; padding: 24px; border: 1px solid #f0f0f0; border-radius: 16px; min-width: 280px; }\n';
css += '.state-card__label { font-size: 12px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.5px; }\n';

// Scrollbar
css += '::-webkit-scrollbar { width: 6px; }\n';
css += '::-webkit-scrollbar-track { background: transparent; }\n';
css += '::-webkit-scrollbar-thumb { background: #6f6f6f; border-radius: 9999px; background-clip: content-box; border: 2px solid transparent; }\n';
css += '* { scrollbar-width: thin; scrollbar-color: #6f6f6f transparent; }\n';

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Response Footer \u2014 Bebop Preview</title>';
html += '<style>' + css + '</style></head><body>';

// ─── Default: Copy + Like + Dislike ─────────────────────────

html += '<div class="section">';
html += '<span class="section__title">Default</span>';
html += '<div class="response-text">';
html += '<p>Here\'s a summary of the quarterly report. Revenue increased by 12% year-over-year, driven primarily by strong growth in the cloud services division. Operating margins improved to 38%, reflecting ongoing efficiency initiatives.</p>';
html += '</div>';
html += '<div class="rf">';
html += '<div class="rf__toolbar">';
html += '<button class="rf__btn" title="Copy">' + copyIco + '</button>';
html += '<button class="rf__btn" title="Like">' + thumbLikeIco + '</button>';
html += '<button class="rf__btn" title="Dislike">' + thumbDislikeIco + '</button>';
html += '</div>';
html += '<div class="rf__divider"></div>';
html += '<button class="rf__sources" title="View sources">';
html += '<span class="rf__icons">' + wordIco + excelIco + pptIco + '</span>';
html += '<span class="rf__chevron">' + chevronRightIco12 + '</span>';
html += '</button>';
html += '</div>';
html += '</div>';

// ─── With response context ──────────────────────────────────

html += '<div class="section">';
html += '<span class="section__title">With response context</span>';
html += '<div class="response-text">';
html += '<p>Based on the files you shared, here are the key action items from the meeting:</p>';
html += '<p>1. Finalize the Q3 budget proposal by Friday<br/>2. Schedule follow-up with the design team<br/>3. Review and approve the marketing timeline</p>';
html += '</div>';
html += '<div class="rf">';
html += '<div class="rf__toolbar">';
html += '<button class="rf__btn" title="Copy">' + copyIco + '</button>';
html += '<button class="rf__btn" title="Like">' + thumbLikeIco + '</button>';
html += '<button class="rf__btn" title="Dislike">' + thumbDislikeIco + '</button>';
html += '</div>';
html += '<div class="rf__divider"></div>';
html += '<button class="rf__sources" title="View sources">';
html += '<span class="rf__icons">' + wordIco + excelIco + '</span>';
html += '<span class="rf__chevron">' + chevronRightIco12 + '</span>';
html += '</button>';
html += '</div>';
html += '</div>';

// ─── States ─────────────────────────────────────────────────

html += '<div class="section">';
html += '<span class="section__title">States</span>';
html += '<div class="states">';

// Action buttons only (no sources)
html += '<div class="state-card">';
html += '<span class="state-card__label">Action toolbar only</span>';
html += '<div class="rf">';
html += '<div class="rf__toolbar">';
html += '<button class="rf__btn" title="Copy">' + copyIco + '</button>';
html += '<button class="rf__btn" title="Like">' + thumbLikeIco + '</button>';
html += '<button class="rf__btn" title="Dislike">' + thumbDislikeIco + '</button>';
html += '</div>';
html += '</div>';
html += '</div>';

// Sources only (single file)
html += '<div class="state-card">';
html += '<span class="state-card__label">Single source</span>';
html += '<div class="rf">';
html += '<div class="rf__toolbar">';
html += '<button class="rf__btn" title="Copy">' + copyIco + '</button>';
html += '<button class="rf__btn" title="Like">' + thumbLikeIco + '</button>';
html += '<button class="rf__btn" title="Dislike">' + thumbDislikeIco + '</button>';
html += '</div>';
html += '<div class="rf__divider"></div>';
html += '<button class="rf__sources" title="View sources">';
html += '<span class="rf__icons">' + wordIco + '</span>';
html += '<span class="rf__chevron">' + chevronRightIco12 + '</span>';
html += '</button>';
html += '</div>';
html += '</div>';

html += '</div>'; // end states
html += '</div>'; // end section

// Toast
html += '<div class="rf__toast" id="toast">Copied to clipboard</div>';

// ─── Script ─────────────────────────────────────────────────

html += '<script>';
html += 'document.querySelectorAll(".rf__btn[title=\\"Copy\\"]").forEach(function(btn) {';
html += '  btn.addEventListener("click", function() {';
html += '    var toast = document.getElementById("toast");';
html += '    toast.classList.add("rf__toast--visible");';
html += '    setTimeout(function() { toast.classList.remove("rf__toast--visible"); }, 1500);';
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
