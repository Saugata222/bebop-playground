/**
 * Attachment Overflow Menu — Interactive Preview
 *
 * One Copilot compound (node 24632:20936). A titled Popover listing composer
 * attachments; each row has a type glyph, name + secondary, and a Remove button.
 * Shows light + dark themes; Remove and dismiss are interactive.
 *
 * Reuses: popover (surface), button (dismiss + Remove), menuListItem (rows),
 * avatar (person), Fluent filetype icons. Font: Segoe Sans.
 * Fallback glyph (document-20) marks missing icons: calendar, mail.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Icons ──────────────────────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function icon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"').replace(/\n/g, '').trim();
}
function iconColor(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, '').trim();
}
const wordColor = iconColor('word-20-color.svg');
const excelColor = iconColor('excel-20-color.svg');
const pptColor = iconColor('powerpoint-20-color.svg');
const docIcon = icon('document-20-regular.svg');
const dismiss = icon('dismiss-20-regular.svg');

// ─── Rows ───────────────────────────────────────────────────

type Row = { glyph: string; avatar?: string; name: string; secondary: string; fallback?: boolean };

const rows: Row[] = [
  { glyph: wordColor, name: 'Document Name', secondary: 'Microsoft Word' },
  { glyph: docIcon, name: 'Meeting Name', secondary: 'Meeting time', fallback: true },
  { glyph: docIcon, name: 'Email Title', secondary: 'From Sender', fallback: true },
  { glyph: excelColor, name: 'Document Name', secondary: 'Microsoft Excel' },
  { glyph: pptColor, name: 'Document Name', secondary: 'Microsoft PowerPoint' },
  { glyph: '', avatar: 'MK', name: 'Person Name', secondary: 'Email address' },
];

function rowHtml(r: Row): string {
  const glyph = r.avatar
    ? '<span class="am__avatar">' + r.avatar + '</span>'
    : '<span class="am__glyph' + (r.fallback ? ' am__glyph--fallback' : '') + '">' + r.glyph + '</span>';
  return '<div class="am__row">' + glyph
    + '<span class="am__text"><span class="am__name">' + r.name + '</span><span class="am__secondary">' + r.secondary + '</span></span>'
    + '<button class="am__remove">Remove</button></div>';
}

function menu(theme: string): string {
  let list = '';
  rows.forEach(r => { list += rowHtml(r); });
  return '<div class="am am--' + theme + '">'
    + '<div class="am__header"><span class="am__title">Attachments</span>'
    + '<button class="am__dismiss" aria-label="Close">' + dismiss + '</button></div>'
    + '<div class="am__list">' + list + '</div></div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 28px; }
.wrap { max-width: 1040px; margin: 0 auto; }
.note { font-size: 12px; color: #8a6d0b; background: #fff8e1; border: 1px solid #ffe08a; border-radius: 8px; padding: 8px 12px; margin-bottom: 16px; }

/* ─── Menu surface ─── */
.am { width: 480px; max-width: 100%; background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 16px; padding: 8px;
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.08), 0px 8px 16px 0px rgba(0,0,0,0.03), 0px 32px 48px 0px rgba(0,0,0,0.08); }

/* Header */
.am__header { display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 8px; }
.am__title { font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.am__dismiss { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; }
.am__dismiss:hover { background: rgba(24,24,24,0.04); }
.am__dismiss svg { width: 20px; height: 20px; display: block; }

/* Rows */
.am__list { display: flex; flex-direction: column; }
.am__row { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 8px; transition: background 0.1s; }
.am__row:hover { background: rgba(24,24,24,0.04); }
.am__glyph { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; flex-shrink: 0; color: #242424; }
.am__glyph svg { width: 20px; height: 20px; display: block; }
.am__glyph--fallback { color: #6f6f6f; }
.am__avatar { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 9999px; background: linear-gradient(135deg,#6b8afd,#9b6bfd); color: #fff; font-size: 12px; font-weight: 625; flex-shrink: 0; }
.am__text { display: flex; flex-direction: column; gap: 2px; flex: 1 0 0; min-width: 0; }
.am__name { font-size: 14px; font-weight: 420; line-height: 20px; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.am__secondary { font-size: 12px; font-weight: 420; line-height: 16px; color: #5d5d5d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.am__remove { flex-shrink: 0; background: transparent; border: 1px solid #dedede; border-radius: 12px; padding: 6px 12px; font-family: inherit; font-size: 14px; font-weight: 420; line-height: 20px; color: #242424; cursor: pointer; transition: background 0.1s; }
.am__remove:hover { background: rgba(24,24,24,0.04); }

/* ─── Dark theme ─── */
.am--dark { background: #292929; border-color: #484848; }
.am--dark .am__title, .am--dark .am__name, .am--dark .am__glyph { color: #fff; }
.am--dark .am__glyph--fallback { color: #adadad; }
.am--dark .am__secondary { color: #adadad; }
.am--dark .am__dismiss { color: #fff; }
.am--dark .am__dismiss:hover, .am--dark .am__row:hover, .am--dark .am__remove:hover { background: rgba(255,255,255,0.08); }
.am--dark .am__remove { border-color: #5a5a5a; color: #fff; }

/* Theme stage cells */
.stage { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-radius: 16px; overflow: hidden; }
.stage__cell { padding: 56px 40px; display: flex; align-items: flex-start; justify-content: center; }
.stage__cell--light { background: #fcfcfc; }
.stage__cell--dark { background: #242424; }
`;

// ─── Body ───────────────────────────────────────────────────

const body = [
  stage(menu('light')),
  '<div class="note"><strong>Icon note:</strong> Meeting and Email rows use a <code>document-20</code> fallback \u2014 <code>calendar-20</code> and <code>mail-20</code> aren\u2019t in the repo yet. Word / Excel / PowerPoint color filetypes and the avatar are exact.</div>',

  '<h2>Default</h2>',
  '<div style="display:flex;justify-content:center;padding:40px;background:#fcfcfc;border-radius:16px">' + menu('light') + '</div>',

  '<h2>Light / Dark</h2>',
  '<div class="stage">',
  '<div class="stage__cell stage__cell--light">' + menu('light') + '</div>',
  '<div class="stage__cell stage__cell--dark">' + menu('dark') + '</div>',
  '</div>',

  '<h2>Usage</h2>',
  '<div class="note" style="color:#5d5d5d;background:#fff;border-color:#ebebeb"><strong>When to use.</strong> The attachment overflow menu appears when clicking the overflow attachment pill. It lists every grounded attachment as a row \u2014 type glyph, name, and source \u2014 with a Remove action per row. Dismiss with the header X. Reuses the Popover surface (Shadow/Highest), Button (dismiss + Remove), MenuListItem rows, and Avatar for people.</div>',
].join('\n');

// ─── Interaction ────────────────────────────────────────────

let js = '';
js += '<script>';
js += '\n';
js += 'document.querySelectorAll(\'.am__remove\').forEach(function (b) {';
js += '\n';
js += '  b.addEventListener(\'click\', function () { var r = b.closest(\'.am__row\'); if (r) r.remove(); });';
js += '\n';
js += '});';
js += '\n';
js += 'document.querySelectorAll(\'.am__dismiss\').forEach(function (b) {';
js += '\n';
js += '  b.addEventListener(\'click\', function () { var m = b.closest(\'.am\'); if (m) m.style.display = \'none\'; });';
js += '\n';
js += '});';
js += '\n';
js += '</script>';

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Attachment Overflow Menu Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Attachment Overflow Menu \u2014 Component Preview</h1>'
  + '<p class="hint">Popover listing composer attachments. Each row: type glyph + name/secondary + Remove. Click Remove or the header \u00d7 to interact.</p>'
  + body + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'attachmentMenu.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
