/**
 * Attachment Pill — Interactive Preview
 *
 * One Copilot compound (node 4175:67840). Composer attachment chips: a leading
 * type glyph (filetype color icon / Fluent line icon / circular avatar), a name
 * with optional secondary line, and a trailing chevron. Shows a composer
 * example plus the full type matrix in light and dark.
 *
 * Reuses: avatar (people/entity), Fluent icons. Font: Segoe Sans.
 * Fallback glyph (document-20) marks types whose Fluent icon isn't in the repo:
 * calendar, mail, channel, people, text-quote, spinner.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Icons ──────────────────────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
/** Line icon → currentColor. */
function icon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
/** Multicolor filetype icon → keep original fills. */
function iconColor(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, '').trim();
}

const wordColor = iconColor('word-20-color.svg');
const excelColor = iconColor('excel-20-color.svg');
const docIcon = icon('document-20-regular.svg');
const appsIcon = icon('apps-20-regular.svg');
const chevron = icon('chevron-down-20-regular.svg');

// ─── Pill builder ───────────────────────────────────────────

type Pill = {
  glyph: string;      // svg or avatar html
  avatar?: string;    // initials for circular avatar
  entity?: boolean;   // wrap glyph in 32px circle
  name: string;
  secondary?: string;
  fallback?: boolean; // uses document fallback (icon missing)
};

function pillGlyph(p: Pill): string {
  if (p.avatar) {
    return '<span class="ap__avatar">' + p.avatar + '</span>';
  }
  if (p.entity) {
    return '<span class="ap__entity">' + p.glyph + '</span>';
  }
  return '<span class="ap__icon' + (p.fallback ? ' ap__icon--fallback' : '') + '">' + p.glyph + '</span>';
}

function pill(p: Pill): string {
  const text = '<span class="ap__text"><span class="ap__name">' + p.name + '</span>'
    + (p.secondary ? '<span class="ap__secondary">' + p.secondary + '</span>' : '') + '</span>';
  return '<div class="ap"' + (p.fallback ? ' title="Fallback glyph — real Fluent icon not yet in repo"' : '') + '>'
    + pillGlyph(p) + text + '<button class="ap__trailing" aria-label="Options">' + chevron + '</button></div>';
}

// ─── Type matrix ────────────────────────────────────────────

const types: Pill[] = [
  { glyph: wordColor, name: 'Document Name', secondary: 'Microsoft Word' },
  { glyph: excelColor, name: 'Q3 Budget.xlsx', secondary: 'Microsoft Excel' },
  { glyph: '', avatar: 'MK', name: 'Mona Kane', secondary: 'Email address' },
  { glyph: docIcon, name: 'Meeting Name', secondary: 'Meeting date', fallback: true },
  { glyph: docIcon, name: 'Email Title', secondary: 'From sender', fallback: true },
  { glyph: docIcon, name: 'Chat Name', secondary: 'Members', fallback: true },
  { glyph: appsIcon, entity: true, name: 'Site Name', secondary: 'site url' },
  { glyph: docIcon, entity: true, name: 'Channel Name', secondary: 'Team name', fallback: true },
  { glyph: '', avatar: 'AC', name: 'Entity Name', secondary: 'Connector name' },
  { glyph: docIcon, name: 'Pull quotes', secondary: 'Guide', fallback: true },
];

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 28px; }
.wrap { max-width: 900px; margin: 0 auto; }
.note { font-size: 12px; color: #8a6d0b; background: #fff8e1; border: 1px solid #ffe08a; border-radius: 8px; padding: 8px 12px; margin-bottom: 16px; }

/* ─── Attachment pill ─── */
.ap {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fcfcfc; border: 1px solid #dedede; border-radius: 16px;
  padding: 8px; min-height: 58px; max-width: 220px;
}
.ap__icon { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; flex-shrink: 0; color: #242424; }
.ap__icon svg, .ap__entity svg, .ap__trailing svg { display: block; width: 20px; height: 20px; }
.ap__icon--fallback { color: #6f6f6f; }
.ap__entity { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 9999px; background: #f5f5f5; color: #242424; flex-shrink: 0; }
.ap__avatar {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 9999px; background: linear-gradient(135deg,#6b8afd,#9b6bfd);
  color: #fff; font-size: 12px; font-weight: 625; flex-shrink: 0;
}
.ap__text { display: flex; flex-direction: column; gap: 2px; min-width: 0; max-width: 120px; }
.ap__name { font-size: 14px; font-weight: 420; line-height: 20px; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ap__secondary { font-size: 12px; font-weight: 420; line-height: 16px; color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ap__trailing { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 4px; border: none; border-radius: 9999px; background: rgba(36,36,36,0); color: #242424; cursor: pointer; flex-shrink: 0; transition: background 0.1s; }
.ap__trailing:hover { background: rgba(24,24,24,0.04); }

/* ─── Composer example ─── */
.composer { background: #fff; border: 1px solid #ebebeb; border-radius: 16px; padding: 16px; max-width: 640px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
.composer__pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
.composer__text { font-size: 14px; line-height: 20px; color: #242424; margin-bottom: 12px; }
.composer__bar { display: flex; align-items: center; justify-content: space-between; }
.composer__send { width: 32px; height: 32px; border-radius: 9999px; background: #242424; color: #fff; border: none; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }

/* ─── Type matrix (light / dark columns) ─── */
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-radius: 16px; overflow: hidden; }
.grid__cell { padding: 20px 24px; display: flex; align-items: center; gap: 16px; }
.grid__cell--light { background: #fcfcfc; }
.grid__cell--dark { background: #242424; }
.grid__label { font-size: 12px; width: 120px; flex-shrink: 0; }
.grid__cell--light .grid__label { color: #6f6f6f; }
.grid__cell--dark .grid__label { color: #adadad; }

/* dark pill overrides */
.grid__cell--dark .ap { background: #2b2b2b; border-color: #484848; }
.grid__cell--dark .ap__name { color: #fff; }
.grid__cell--dark .ap__secondary { color: #adadad; }
.grid__cell--dark .ap__icon { color: #fff; }
.grid__cell--dark .ap__icon--fallback { color: #adadad; }
.grid__cell--dark .ap__entity { background: #3b3b3b; color: #fff; }
.grid__cell--dark .ap__trailing { color: #fff; }
.grid__cell--dark .ap__trailing:hover { background: rgba(255,255,255,0.08); }
`;

// ─── Body ───────────────────────────────────────────────────

const labels = ['Files', 'Files', 'People', 'Meeting', 'Email', 'Chat', 'Site', 'Channel', 'Connector entity', 'Context grounding'];

let matrix = '';
types.forEach((t, i) => {
  matrix += '<div class="grid__cell grid__cell--light"><span class="grid__label">' + labels[i] + '</span>' + pill(t) + '</div>';
  matrix += '<div class="grid__cell grid__cell--dark"><span class="grid__label">' + labels[i] + '</span>' + pill(t) + '</div>';
});

const body = [
  stage(pill({ glyph: wordColor, name: 'Document Name', secondary: 'Microsoft Word' })),
  '<div class="note"><strong>Icon note:</strong> Types marked with a muted glyph use a <code>document-20</code> fallback \u2014 the real Fluent icons (calendar, mail, channel, people, text-quote, spinner) aren\u2019t in the repo yet. Word/Excel color filetypes and avatars are exact.</div>',

  '<h2>In the composer</h2>',
  '<div class="composer">',
  '<div class="composer__pills">'
    + pill({ glyph: wordColor, name: 'Document Name', secondary: 'Microsoft Word' })
    + pill({ glyph: docIcon, name: 'Meeting Name', secondary: 'Meeting date', fallback: true })
    + '</div>',
  '<div class="composer__text">Write a BRD to top architecture firms in the Pacific Northwest United States. We will read pull quotes for context.</div>',
  '<div class="composer__bar"><span></span><button class="composer__send" aria-label="Send">\u2191</button></div>',
  '</div>',

  '<h2>Types \u00d7 theme</h2>',
  '<div class="grid">' + matrix + '</div>',

  '<h2>Usage</h2>',
  '<div class="note" style="color:#5d5d5d;background:#fff;border-color:#ebebeb"><strong>When to use.</strong> Attachment pills represent content grounded into a prompt \u2014 inserted from upload, OneDrive/Business, or the CiQ menu. The leading glyph communicates type (filetype color icon, Fluent line icon, or circular avatar for people/entities); the name truncates at 120px with an optional secondary line; the trailing chevron opens per-attachment options and doubles as the remove affordance.</div>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Attachment Pill Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Attachment Pill \u2014 Component Preview</h1>'
  + '<p class="hint">Composer attachment chips: type glyph + name (+ secondary) + trailing chevron. Files, people, meetings, emails, sites, channels, connector entities, context grounding \u2014 light and dark.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'attachmentPill.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
