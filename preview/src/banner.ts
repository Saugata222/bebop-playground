/**
 * Banner — Interactive HTML Preview (One Copilot)
 *
 * Rounded banner surface with optional leading image/icon, a title + body,
 * up to two actions and a dismiss — in Light and Dark themes.
 * Composes the Button primitive (primary / secondary / subtle) for CTAs.
 *
 * Figma: One-Copilot-Desktop-UI-Kit — Banner (node 4020:1566)
 * Usage:  npx tsx preview/src/banner.ts   →  preview/dist/banner.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, ' ').trim();
}
const dismissIco = readIcon('dismiss-20-regular.svg');
const imageIco = readIcon('image-16-regular.svg');

// ─── Banner builder ─────────────────────────────────────────

interface Opts { lead?: 'none' | 'image' | 'icon'; primary?: boolean; secondary?: boolean; dismiss?: boolean; }

function banner(theme: string, opts: Opts): string {
  const lead = opts.lead || 'none';
  let leadHtml = '';
  if (lead === 'image') leadHtml = '<div class="bnr__lead bnr__lead--image"></div>';
  else if (lead === 'icon') leadHtml = '<div class="bnr__lead bnr__lead--icon">' + imageIco + '</div>';

  let btns = '';
  if (opts.secondary) btns += '<button class="bnr__btn bnr__btn--secondary" type="button">Secondary</button>';
  if (opts.primary) btns += '<button class="bnr__btn bnr__btn--primary" type="button">Primary</button>';
  if (opts.dismiss) btns += '<button class="bnr__dismiss" type="button" aria-label="Dismiss" data-action="dismiss">' + dismissIco + '</button>';
  const buttons = btns ? '<div class="bnr__buttons">' + btns + '</div>' : '';

  return '<div class="bnr bnr--' + theme + '">' + leadHtml
    + '<div class="bnr__main">'
    + '<div class="bnr__text">'
    + '<div class="bnr__title">Banner title</div>'
    + '<div class="bnr__body">Supporting text that explains the message in a sentence or two.</div>'
    + '</div>'
    + buttons
    + '</div></div>';
}

function stack(theme: string): string {
  const rows: [string, Opts][] = [
    ['Default', { primary: true, dismiss: true }],
    ['With image', { lead: 'image', primary: true, dismiss: true }],
    ['With icon', { lead: 'icon', primary: true, dismiss: true }],
    ['With secondary', { secondary: true, primary: true, dismiss: true }],
    ['No dismiss', { primary: true }],
    ['No CTA', { dismiss: true }],
  ];
  let out = '';
  for (const [label, o] of rows) {
    out += '<div class="cell"><span class="rl">' + label + '</span>' + banner(theme, o) + '</div>';
  }
  return out;
}

// ─── Side pane variant (compact, 244px, body-small, dismiss-only) ───
function sidePane(theme: string, lead: 'none' | 'image' | 'icon'): string {
  let leadHtml = '';
  if (lead === 'image') leadHtml = '<div class="bnr__lead bnr__lead--image"></div>';
  else if (lead === 'icon') leadHtml = '<div class="bnr__lead bnr__lead--icon">' + imageIco + '</div>';
  return '<div class="bnr bnr--' + theme + ' bnr--sp">' + leadHtml
    + '<div class="bnr__main">'
    + '<div class="bnr__text">'
    + '<div class="bnr__title">Main question or action</div>'
    + '<div class="bnr__body">Here is more about the consequences of the main action, if details are needed.</div>'
    + '</div>'
    + '<div class="bnr__buttons"><button class="bnr__dismiss" type="button" aria-label="Dismiss" data-action="dismiss">' + dismissIco + '</button></div>'
    + '</div></div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 16px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 640px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; }
.panel { display: flex; flex-direction: column; gap: 20px; border-radius: 16px; padding: 24px; }
.panel--light { background: #fff; border: 1px solid #ebebeb; }
.panel--dark { background: #1a1a1a; border: 1px solid #000; }
.panel--dark .rl { color: #929292; }
.cell { display: flex; flex-direction: column; gap: 8px; }

/* ─── Banner ─── */
.bnr {
  display: flex; align-items: center; gap: 12px; width: 100%;
  padding: 16px; border-radius: 24px; border: 1px solid transparent;
  transition: opacity 0.25s ease, max-height 0.3s ease, padding 0.3s ease, border-width 0.3s ease;
  overflow: hidden;
}
.bnr--light { background: #ffffff; border-color: #dedede; }
.bnr--dark  { background: #292929; border-color: #484848; }
.bnr--dismissed { opacity: 0; max-height: 0 !important; padding-block: 0; border-width: 0; pointer-events: none; }

/* Lead */
.bnr__lead { flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.bnr__lead--image { width: 60px; height: 60px; border-radius: 12px; background: #f0f0f0; }
.bnr--dark .bnr__lead--image { background: #3a3a3a; }
.bnr__lead--icon { width: 40px; height: 40px; }
.bnr__lead--icon svg { width: 20px; height: 20px; display: block; }
.bnr--light .bnr__lead--icon { color: #242424; }
.bnr--dark .bnr__lead--icon { color: #fffbf8; }

/* Main = text + buttons */
.bnr__main { flex: 1; min-width: 0; display: flex; align-items: center; gap: 20px; }
.bnr__text { flex: 1; min-width: 0; }
.bnr__title { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.bnr__body { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }
.bnr--light .bnr__title { color: #242424; } .bnr--light .bnr__body { color: #242424; }
.bnr--dark .bnr__title { color: #fffbf8; } .bnr--dark .bnr__body { color: #dedede; }

/* Buttons */
.bnr__buttons { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.bnr__btn {
  height: 32px; padding: 0 10px; border-radius: 12px; border: 1px solid transparent; cursor: pointer;
  font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 14px; line-height: 20px;
  font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420;
  display: inline-flex; align-items: center; justify-content: center; white-space: nowrap;
  transition: background 0.1s ease; outline: none;
}
.bnr__btn--primary { background: rgba(229,229,229,0.5); color: #242424; }
.bnr__btn--primary:hover { background: #ebebeb; }
.bnr--dark .bnr__btn--primary { background: rgba(51,51,51,0.5); color: #dedede; }
.bnr--dark .bnr__btn--primary:hover { background: rgba(51,51,51,0.7); }
.bnr__btn--secondary { background: #fcfcfc; border-color: #dedede; color: #242424; }
.bnr__btn--secondary:hover { background: #f5f5f5; }
.bnr--dark .bnr__btn--secondary { background: #242424; border-color: #484848; color: #dedede; }
.bnr--dark .bnr__btn--secondary:hover { background: #303030; }

/* Dismiss — 28×28 circular subtle (icon 20 + 4) */
.bnr__dismiss {
  width: 28px; height: 28px; border-radius: 9999px; border: none; background: transparent;
  cursor: pointer; display: inline-flex; align-items: center; justify-content: center; padding: 0;
  transition: background 0.1s ease; outline: none;
}
.bnr__dismiss svg { width: 20px; height: 20px; display: block; }
.bnr--light .bnr__dismiss { color: #242424; }
.bnr--light .bnr__dismiss:hover { background: rgba(36,36,36,0.04); }
.bnr--dark .bnr__dismiss { color: #dedede; }
.bnr--dark .bnr__dismiss:hover { background: rgba(255,255,255,0.06); }

/* ─── Side pane variant — compact 244px, body-small, 36px lead, dismiss-only ─── */
.bnr--sp { width: 244px; align-items: flex-start; gap: 10px; padding: 10px; border-radius: 16px; }
.bnr--sp .bnr__lead--image { width: 36px; height: 36px; border-radius: 8px; background: #f2f2f2; }
.bnr--dark.bnr--sp .bnr__lead--image { background: #3a3a3a; }
.bnr--sp .bnr__lead--icon { width: 36px; height: 36px; border-radius: 12px; }
.bnr--sp .bnr__lead--icon svg { width: 24px; height: 24px; }
.bnr--sp .bnr__main { align-items: flex-start; gap: 2px; }
.bnr--sp .bnr__text { padding-left: 4px; display: flex; flex-direction: column; gap: 2px; }
.bnr--sp .bnr__title { font-size: 12px; line-height: 16px; }
.bnr--sp .bnr__body { font-size: 12px; line-height: 16px; }
.bnr--sp .bnr__dismiss { width: 24px; height: 24px; }
.bnr--sp .bnr__dismiss svg { width: 12px; height: 12px; }

/* ─── Usage docs ─── */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
.usage { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.usage__col { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; }
.usage__col h3 { font-size: 12px; font-weight: 600; margin-bottom: 8px; }
.usage__col--do h3 { color: #0f7b0f; } .usage__col--dont h3 { color: #b10e1c; }
.usage__col ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.usage__col li { font-size: 12px; line-height: 1.5; color: #5d5d5d; padding-left: 16px; position: relative; }
.usage__col li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 6px; border-radius: 50%; }
.usage__col--do li::before { background: #0f7b0f; } .usage__col--dont li::before { background: #b10e1c; }
`;

// ─── HTML ───────────────────────────────────────────────────

const body = [
  stage('<div style="width:100%;max-width:520px">' + banner('light', { lead: 'image', primary: true, secondary: true, dismiss: true }) + '</div>'),
  '<h2>Light</h2>',
  '<div class="panel panel--light">' + stack('light') + '</div>',
  '<h2>Dark</h2>',
  '<div class="panel panel--dark">' + stack('dark') + '</div>',
  '<h2>Side pane variant</h2>',
  '<div class="when" style="margin-bottom:16px">Compact 244px banner for the narrow side pane — radius 16, 10px padding, body-small (12/16) type, 36px lead, and a small 12px dismiss. No CTA buttons.</div>',
  '<div class="panel panel--light" style="align-items:flex-start"><div class="cell"><span class="rl">With image</span>' + sidePane('light', 'image') + '</div><div class="cell"><span class="rl">With icon</span>' + sidePane('light', 'icon') + '</div><div class="cell"><span class="rl">Text only</span>' + sidePane('light', 'none') + '</div></div>',
  '<div class="panel panel--dark" style="align-items:flex-start"><div class="cell"><span class="rl">With image</span>' + sidePane('dark', 'image') + '</div><div class="cell"><span class="rl">With icon</span>' + sidePane('dark', 'icon') + '</div></div>',
  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> Surface a contextual message tied to the current view \u2014 a prompt to connect data, a status confirmation, or a tip \u2014 without interrupting the flow. Pair a clear title with a one-line body and at most one primary action.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Lead with a scannable title (Body Medium Strong).</li>',
  '<li>Keep to one primary action; add Secondary only when needed.</li>',
  '<li>Offer dismiss for non-critical messages.</li>',
  '<li>Use the Dark theme on dark surfaces.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Stack multiple banners or use for blocking errors (use a Dialog).</li>',
  '<li>Write more than two lines of body copy.</li>',
  '<li>Use more than two action buttons.</li>',
  '<li>Mix themes against the wrong background.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

let js = '';
js += '<script>';
js += '\n';
js += 'document.querySelectorAll(\'[data-action="dismiss"]\').forEach(function (b) {';
js += '\n';
js += '  b.addEventListener(\'click\', function () {';
js += '\n';
js += '    var bnr = b.closest(\'.bnr\');';
js += '\n';
js += '    if (!bnr) return;';
js += '\n';
js += '    bnr.style.maxHeight = bnr.offsetHeight + \'px\';';
js += '\n';
js += '    requestAnimationFrame(function () { bnr.classList.add(\'bnr--dismissed\'); });';
js += '\n';
js += '  });';
js += '\n';
js += '});';
js += '\n';
js += '</script>';

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Banner Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Banner \u2014 Component Preview</h1>'
  + '<p class="hint">Contextual banner surface with optional lead, actions and dismiss \u2014 Light and Dark.</p>'
  + body + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'banner.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'banner.html'));
