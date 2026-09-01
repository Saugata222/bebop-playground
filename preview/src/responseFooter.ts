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
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, ' ').trim();
}

const copyIco = readIcon('copy-20-regular.svg');
const thumbLikeR = readIcon('thumb-like-20-regular.svg');
const thumbLikeF = readIcon('thumb-like-20-filled.svg');
const thumbDislikeR = readIcon('thumb-dislike-20-regular.svg');
const thumbDislikeF = readIcon('thumb-dislike-20-filled.svg');
const tryAgainIco = readIcon('arrow-sync-20-regular.svg');
const moreIco = readIcon('more-horizontal-20-regular.svg');
const planetIco = readIcon('planet-20-regular.svg');
// More-menu icons (real Fluent)
const editIco = readIcon('edit-20-regular.svg');
const bookmarkIco = readIcon('bookmark-20-regular.svg');
const shareIco = readIcon('share-20-regular.svg');
const dismissIco = readIcon('dismiss-20-regular.svg');

// Source logos as data URIs
function logoDataUri(file: string): string {
  const buf = fs.readFileSync(path.join(iconsDir, file));
  return 'data:image/png;base64,' + buf.toString('base64');
}
const moodysLogo = logoDataUri('moodys-logo.png');
const lsegLogo = logoDataUri('lseg-logo.png');
const spGlobalLogo = logoDataUri('sp-global-logo.png');

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
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
.rf__divider { width: 1px; height: 20px; background: rgba(189,189,189,0.5); margin: 0 4px; flex-shrink: 0; }

/* Sources/References button — overlapping circular avatars + label, pill */
.rf__sources { display: flex; align-items: center; gap: 6px; height: 32px; padding: 6px 10px 6px 8px; border-radius: 9999px; background: transparent; border: none; cursor: pointer; color: #242424; transition: background 0.1s; font-family: inherit; font-size: 14px; font-weight: 420; line-height: 20px; }
.rf__sources:hover { background: rgba(36, 36, 36, 0.04); }
.rf__sources:active { background: rgba(36, 36, 36, 0.08); }

/* Avatar stack — overlapping circular favicons */
.rf__avatars { display: inline-flex; align-items: center; }
.rf__avatars .rf__avatar { width: 20px; height: 20px; border-radius: 9999px; background-color: #fff; background-size: cover; background-position: center; background-repeat: no-repeat; box-shadow: 0 0 0 1.5px #fff; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; color: #fff; font-size: 10px; font-weight: 600; }
.rf__avatars .rf__avatar + .rf__avatar { margin-left: -6px; }
.rf__avatars .rf__avatar svg { width: 12px; height: 12px; color: #5d5d5d; }
.rf__avatars .rf__avatar--web { background: #ebebeb; color: #5d5d5d; }

/* Copy toast */
.rf__toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: #242424; color: #fff; font-size: 13px; padding: 8px 16px; border-radius: 8px; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
.rf__toast--visible { opacity: 1; }

/* Row for states */
.row { display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-start; margin-bottom: 16px; }
.cell { display: flex; flex-direction: column; gap: 8px; }
.rl { font-size: 11px; font-weight: 600; color: #929292; text-transform: uppercase; letter-spacing: 0.5px; }

/* Light / Dark variant stage */
.variants { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-radius: 16px; overflow: hidden; margin-top: 8px; }
.vcell { padding: 40px; }
.vcell--light { background: #fcfcfc; }
.vcell--dark { background: #242424; }
.vlabel { font-size: 12px; color: #6f6f6f; margin-bottom: 28px; }
.vcell--dark .vlabel { color: #adadad; }
.rf--dark .rf__btn { color: #e0e0e0; }
.rf--dark .rf__btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
.rf--dark .rf__divider { background: rgba(255,255,255,0.16); }
.rf--dark .rf__sources { color: #fff; }
.rf--dark .rf__sources:hover { background: rgba(255,255,255,0.08); }
.rf--dark .rf__avatar { box-shadow: 0 0 0 1.5px #242424; }
.rf--dark .rf__avatar--web { background: #3b3b3b; color: #ccc; }

/* ─── Tooltip (custom) ─── */
.rf__btn[data-tip] { position: relative; }
.rf__btn[data-tip]:hover::after {
  content: attr(data-tip); position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%);
  background: #242424; color: #fff; font-size: 12px; line-height: 16px; padding: 4px 8px; border-radius: 6px;
  white-space: nowrap; pointer-events: none; z-index: 60;
}
.rf--dark .rf__btn[data-tip]:hover::after { background: #f5f5f5; color: #242424; }

/* ─── Feedback ack chip ("Feedback received") ─── */
.rf__ack { font-size: 13px; line-height: 20px; color: #5d5d5d; padding-left: 8px; white-space: nowrap; }
.rf--dark .rf__ack { color: #adadad; }

/* ─── Hover-to-reveal footer (previous vs current response) ─── */
.resp { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px 18px; margin-bottom: 8px; }
.resp__text { font-family: Aptos, 'Segoe UI', sans-serif; font-size: 15px; line-height: 26px; color: #242424; margin-bottom: 4px; }
.resp .rf { padding-top: 8px; opacity: 1; transition: opacity 0.15s ease; }
.resp--prev .rf { opacity: 0; pointer-events: none; }
.resp--prev:hover .rf { opacity: 1; pointer-events: auto; }
.resp__tag { display: inline-block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: #6f6f6f; margin-bottom: 8px; }

/* ─── More overflow menu ─── */
.rf-menu {
  position: absolute; z-index: 80; min-width: 200px; background: #fff; border-radius: 12px; padding: 4px;
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.08), 0px 8px 16px 0px rgba(0,0,0,0.03), 0px 32px 48px 0px rgba(0,0,0,0.08);
  display: none;
}
.rf-menu--open { display: block; }
.rf-mi { display: flex; align-items: center; gap: 8px; height: 40px; padding: 0 12px; border-radius: 8px; cursor: pointer; font-size: 14px; line-height: 20px; color: #242424; background: transparent; border: none; width: 100%; text-align: left; font-family: inherit; }
.rf-mi:hover { background: rgba(24,24,24,0.04); }
.rf-mi svg { width: 20px; height: 20px; flex-shrink: 0; color: #242424; }

/* ─── Feedback modal ─── */
.rf-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.32); display: none; align-items: center; justify-content: center; z-index: 100; }
.rf-modal--open { display: flex; }
.rf-modal__card { width: 440px; max-width: 92vw; background: #fff; border-radius: 16px; padding: 20px; box-shadow: 0px 0px 1px rgba(0,0,0,0.08), 0px 8px 16px rgba(0,0,0,0.03), 0px 32px 48px rgba(0,0,0,0.08); }
.rf-modal__head { display: flex; align-items: flex-start; justify-content: space-between; }
.rf-modal__title { font-size: 20px; line-height: 28px; font-weight: 600; color: #242424; }
.rf-modal__x { width: 28px; height: 28px; border: none; background: transparent; border-radius: 9999px; cursor: pointer; color: #242424; display: inline-flex; align-items: center; justify-content: center; }
.rf-modal__x:hover { background: rgba(24,24,24,0.04); }
.rf-modal__x svg { width: 20px; height: 20px; }
.rf-modal__sub { font-size: 13px; line-height: 18px; color: #5d5d5d; margin: 2px 0 14px; }
.rf-opts { display: flex; flex-direction: column; gap: 2px; }
.rf-opt { display: flex; align-items: center; gap: 10px; padding: 8px 4px; font-size: 14px; line-height: 20px; color: #242424; cursor: pointer; }
.rf-opt input { accent-color: #242424; width: 16px; height: 16px; }
.rf-modal textarea { width: 100%; min-height: 72px; border: 1px solid #dedede; border-radius: 8px; padding: 8px 10px; font-family: inherit; font-size: 14px; line-height: 20px; margin-top: 10px; resize: vertical; outline: none; }
.rf-modal textarea:focus { border-color: #242424; }
.rf-modal__foot { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
.rf-modal__btn { height: 32px; padding: 0 14px; border-radius: 12px; font-size: 14px; line-height: 20px; font-family: inherit; cursor: pointer; border: 1px solid transparent; }
.rf-modal__btn--cancel { background: #f5f5f5; color: #242424; }
.rf-modal__btn--cancel:hover { background: #ebebeb; }
.rf-modal__btn--submit { background: #242424; color: #fff; }
.rf-modal__btn--submit:hover { background: #2b2b2b; }
`;

// ─── Helpers ────────────────────────────────────────────────

function likeBtn(): string {
  return '<button class="rf__btn rf__btn--like" title="Like" data-tip="Good response">'
    + '<span class="ico-r">' + thumbLikeR + '</span>'
    + '<span class="ico-f">' + thumbLikeF + '</span>'
    + '</button>';
}

function dislikeBtn(): string {
  return '<button class="rf__btn rf__btn--dislike" title="Dislike" data-tip="Bad response">'
    + '<span class="ico-r">' + thumbDislikeR + '</span>'
    + '<span class="ico-f">' + thumbDislikeF + '</span>'
    + '</button>';
}

function avatar(kind: 'logo' | 'web' | 'work', value: string): string {
  if (kind === 'logo') {
    return '<span class="rf__avatar" style="background-image:url(' + value + ')"></span>';
  }
  if (kind === 'work') {
    // Coloured initial avatar (e.g. “Y” on purple for Yammer)
    return '<span class="rf__avatar" style="background:' + value + '">' + 'Y' + '</span>';
  }
  // web globe
  return '<span class="rf__avatar rf__avatar--web">' + planetIco + '</span>';
}

function sourcesButton(avatars: string[]): string {
  if (avatars.length === 0) return '';
  let h = '<div class="rf__divider"></div>';
  h += '<button class="rf__sources" title="View references">';
  h += '<span class="rf__avatars">' + avatars.join('') + '</span>';
  h += '<span class="rf__sources-label">References</span>';
  h += '</button>';
  return h;
}

function footer(avatars: string[], dark?: boolean): string {
  let h = '<div class="rf' + (dark ? ' rf--dark' : '') + '">';
  h += '<div class="rf__toolbar">';
  h += '<button class="rf__btn rf__btn--copy" title="Copy" data-tip="Copy the entire response">' + copyIco + '</button>';
  h += likeBtn();
  h += dislikeBtn();
  h += '<button class="rf__btn rf__btn--retry" title="Try again" data-tip="Regenerate">' + tryAgainIco + '</button>';
  h += '<button class="rf__btn rf__btn--more" title="More actions" data-tip="More actions">' + moreIco + '</button>';
  h += '</div>';
  h += sourcesButton(avatars);
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
html += '<div class="bp-stage"><div class="bp-stage__canvas">' + footer([avatar('work', '#7C3AED'), avatar('web', ''), avatar('web', '')]) + '</div></div>';

// Default with response text
html += '<h2>Default</h2>';
html += '<div class="response-text">';
html += '<p>Here\u2019s a summary of the quarterly report. Revenue increased by 12% year-over-year, driven primarily by strong growth in the cloud services division. Operating margins improved to 38%, reflecting ongoing efficiency initiatives.</p>';
html += '</div>';
html += footer([avatar('work', '#7C3AED'), avatar('web', ''), avatar('web', '')]);

// With logo avatars
html += '<h2>With source logos</h2>';
html += '<div class="response-text">';
html += '<p>Based on the files you shared, here are the key action items from the meeting.</p>';
html += '</div>';
html += footer([avatar('logo', moodysLogo), avatar('logo', lsegLogo), avatar('logo', spGlobalLogo)]);

// States
html += '<h2>States</h2>';
html += '<div class="row">';

html += '<div class="cell"><span class="rl">Action toolbar only</span>';
html += footer([]);
html += '</div>';

html += '<div class="cell"><span class="rl">Single source</span>';
html += footer([avatar('logo', moodysLogo)]);
html += '</div>';

html += '<div class="cell"><span class="rl">Three sources</span>';
html += footer([avatar('work', '#7C3AED'), avatar('web', ''), avatar('web', '')]);
html += '</div>';

html += '</div>'; // end row

// Light / Dark variants
html += '<h2>Light / Dark</h2>';
html += '<div class="variants">';
html += '<div class="vcell vcell--light"><div class="vlabel">Variant name</div>' + footer([avatar('work', '#7C3AED'), avatar('web', ''), avatar('web', '')]) + '</div>';
html += '<div class="vcell vcell--dark"><div class="vlabel">Variant name</div>' + footer([avatar('work', '#7C3AED'), avatar('web', ''), avatar('web', '')], true) + '</div>';
html += '</div>';

// Interactions
html += '<h2>Interactions</h2>';
html += '<div class="when" style="background:#fff;border:1px solid #ebebeb;border-radius:12px;padding:14px 16px;margin-bottom:16px;font-size:13px;line-height:1.6;color:#5d5d5d">';
html += '<strong style="color:#242424">Try it.</strong> <b>Copy</b> → “Copied” toast. <b>Thumbs up</b> → selects + “Feedback received”. <b>Thumbs down</b> → opens the feedback form overlay. <b>Try again</b> → Regenerate. <b>More</b> → overflow menu. <b>References</b> → opens the References pane (not shown here).';
html += '</div>';
html += '<div style="background:#fcfcfc;border:1px solid #ebebeb;border-radius:12px;padding:16px 18px">';
html += '<div class="resp__text" style="font-family:Aptos,Segoe UI,sans-serif;font-size:15px;line-height:26px;color:#242424;margin-bottom:4px">Based on the data, escalations related to XStream Pro increased by 47% — signalling a growing concern among enterprise clients.</div>';
html += footer([avatar('work', '#7C3AED'), avatar('web', ''), avatar('web', '')]);
html += '</div>';

// Hover to reveal footer
html += '<h2>Reveal on hover — previous vs current</h2>';
html += '<div class="when" style="background:#fff;border:1px solid #ebebeb;border-radius:12px;padding:14px 16px;margin-bottom:16px;font-size:13px;line-height:1.6;color:#5d5d5d">The current response always shows its footer; <strong style="color:#242424">previous responses hide the footer and reveal it on hover</strong>. Hover the top card.</div>';
html += '<div class="resp resp--prev"><span class="resp__tag">Previous response · hover to reveal</span><div class="resp__text">Escalations related to XStream Pro increased by 47% from May to July, signalling a growing concern among enterprise clients.</div>' + footer([avatar('work', '#7C3AED'), avatar('web', '')]) + '</div>';
html += '<div class="resp"><span class="resp__tag">Current response</span><div class="resp__text">Would you like me to generate a chart or draft a summary email to the product team?</div>' + footer([avatar('work', '#7C3AED'), avatar('web', ''), avatar('web', '')]) + '</div>';

html += '</div>'; // end wrap

// Toast
html += '<div class="rf__toast" id="toast">Copied to clipboard</div>';

// More overflow menu (singleton)
html += '<div class="rf-menu" id="rfMenu">'
  + '<button class="rf-mi" data-mi="Copied">' + copyIco + 'Copy</button>'
  + '<button class="rf-mi" data-mi="Editing…">' + editIco + 'Edit</button>'
  + '<button class="rf-mi" data-mi="Saved">' + bookmarkIco + 'Save</button>'
  + '<button class="rf-mi" data-mi="Shared">' + shareIco + 'Share</button>'
  + '</div>';

// Feedback modal (opened by Thumbs down)
html += '<div class="rf-modal" id="rfModal">'
  + '<div class="rf-modal__card" role="dialog" aria-modal="true" aria-label="Feedback">'
  + '<div class="rf-modal__head"><div class="rf-modal__title">What happened?</div>'
  + '<button class="rf-modal__x" id="rfModalX" aria-label="Close">' + dismissIco + '</button></div>'
  + '<div class="rf-modal__sub">Your feedback helps improve responses. Select all that apply.</div>'
  + '<div class="rf-opts">'
  + '<label class="rf-opt"><input type="checkbox"> Inaccurate or wrong</label>'
  + '<label class="rf-opt"><input type="checkbox"> Not up to date</label>'
  + '<label class="rf-opt"><input type="checkbox"> Didn’t fully answer</label>'
  + '<label class="rf-opt"><input type="checkbox"> Too wordy</label>'
  + '<label class="rf-opt"><input type="checkbox"> Made up facts</label>'
  + '<label class="rf-opt"><input type="checkbox"> Harmful or offensive</label>'
  + '</div>'
  + '<textarea placeholder="Tell us more (optional)"></textarea>'
  + '<div class="rf-modal__foot"><button class="rf-modal__btn rf-modal__btn--cancel" id="rfModalCancel">Cancel</button>'
  + '<button class="rf-modal__btn rf-modal__btn--submit" id="rfModalSubmit">Submit</button></div>'
  + '</div></div>';

// Script
html += '<script>';
// Copy toast
html += 'document.querySelectorAll(".rf__btn--copy").forEach(function(btn) {';
html += '  btn.addEventListener("click", function() {';
html += '    var toast = document.getElementById("toast");';
html += '    toast.textContent = "Copied";';
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

// ─── Interaction behaviors (toast + ack + feedback modal + more menu) ───
html += 'var rfToast = document.getElementById("toast");';
html += 'function rfShowToast(m){ rfToast.textContent = m; rfToast.classList.add("rf__toast--visible"); clearTimeout(window.__rft); window.__rft = setTimeout(function(){ rfToast.classList.remove("rf__toast--visible"); }, 1500); }';
// Like → "Feedback received" ack + toast
html += 'document.querySelectorAll(".rf__btn--like").forEach(function(b){ b.addEventListener("click", function(){ var f = b.closest(".rf"); var tb = f.querySelector(".rf__toolbar"); var ack = f.querySelector(".rf__ack"); if (b.classList.contains("rf__btn--active")) { if (!ack) { ack = document.createElement("span"); ack.className = "rf__ack"; ack.textContent = "Feedback received"; tb.parentNode.insertBefore(ack, tb.nextSibling); } rfShowToast("Feedback received"); } else if (ack) { ack.remove(); } }); });';
// Dislike → open feedback modal
html += 'var rfModal = document.getElementById("rfModal");';
html += 'function rfCloseModal(){ rfModal.classList.remove("rf-modal--open"); }';
html += 'document.querySelectorAll(".rf__btn--dislike").forEach(function(b){ b.addEventListener("click", function(){ var f = b.closest(".rf"); var ack = f.querySelector(".rf__ack"); if (ack) ack.remove(); if (b.classList.contains("rf__btn--active")) { rfModal.classList.add("rf-modal--open"); } else { rfCloseModal(); } }); });';
html += 'document.getElementById("rfModalX").addEventListener("click", rfCloseModal);';
html += 'document.getElementById("rfModalCancel").addEventListener("click", rfCloseModal);';
html += 'document.getElementById("rfModalSubmit").addEventListener("click", function(){ rfCloseModal(); rfShowToast("Feedback received"); });';
html += 'rfModal.addEventListener("click", function(e){ if (e.target === rfModal) rfCloseModal(); });';
// Try again + References toasts
html += 'document.querySelectorAll(".rf__btn--retry").forEach(function(b){ b.addEventListener("click", function(){ rfShowToast("Regenerating\u2026"); }); });';
html += 'document.querySelectorAll(".rf__sources").forEach(function(b){ b.addEventListener("click", function(e){ e.stopPropagation(); rfShowToast("Opening References pane\u2026"); }); });';
// More → overflow menu (singleton, positioned under the button)
html += 'var rfMenu = document.getElementById("rfMenu"); var rfAnchor = null;';
html += 'function rfCloseMenu(){ rfMenu.classList.remove("rf-menu--open"); rfAnchor = null; }';
html += 'document.querySelectorAll(".rf__btn--more").forEach(function(b){ b.addEventListener("click", function(e){ e.stopPropagation(); if (rfAnchor === b) { rfCloseMenu(); return; } var r = b.getBoundingClientRect(); rfMenu.style.top = (window.scrollY + r.bottom + 4) + "px"; rfMenu.style.left = (window.scrollX + r.left) + "px"; rfMenu.classList.add("rf-menu--open"); rfAnchor = b; }); });';
html += 'rfMenu.querySelectorAll(".rf-mi").forEach(function(mi){ mi.addEventListener("click", function(){ rfShowToast(mi.getAttribute("data-mi")); rfCloseMenu(); }); });';
html += 'document.addEventListener("click", function(){ if (rfAnchor) rfCloseMenu(); });';
html += '</script>';

html += '</body></html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, 'responseFooter.html'), html, 'utf-8');
console.log('Done: preview/dist/responseFooter.html');
