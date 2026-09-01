/**
 * Skill Attachment — HTML Preview
 *
 * One Copilot / Connector Skills — the chip that represents a connector skill
 * attached to the prompt box (Figma Connector-Skills node 29:30041), plus the
 * in-composer "prompt box with attachment" variant (node 29:30145).
 *
 * Usage:  npx tsx preview/src/skillAttachment.ts
 * Output: preview/dist/skillAttachment.html
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function ico(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8')
    .replace(/\n/g, '').replace(/ (width|height)="\d+"/g, '')
    .replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="currentColor"');
}
const SCRIPT = ico('script-20-regular');
const ADD = ico('add-20-regular');
const MIC = ico('mic-20-regular');
const EQ = ico('device-eq-20-regular');
const ARROW = ico('arrow-up-20-regular');
const X12 = '<svg viewBox="0 0 12 12" width="12" height="12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';

// ─── Builders ───────────────────────────────────────────────

function chip(name: string, desc: string): string {
  return [
    '<div class="sa" title="/' + name + '">',
    '<span class="sa__ico">' + SCRIPT + '</span>',
    '<span class="sa__meta"><span class="sa__name">/' + name + '</span><span class="sa__desc">' + desc + '</span></span>',
    '<button class="sa__x" aria-label="Remove /' + name + '">' + X12 + '</button>',
    '</div>',
  ].join('');
}

const SKILLS: Array<[string, string]> = [
  ['duplicate-reconciler', 'Find near-duplicate or stale pages on a topic'],
  ['space-digest', 'Summarize a Confluence space into a digest'],
  ['pr-summary', 'Summarize an open pull request'],
];

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 36px 0 14px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 28px; }
.wrap { max-width: 820px; margin: 0 auto; }
.rl { font-size: 11px; font-weight: 600; color: #929292; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
.stage { display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start; background: #fcfcfc; border: 1px solid #ececec; border-radius: 16px; padding: 32px; }

/* ─── Skill attachment chip ─── */
.sa { position: relative; display: inline-flex; align-items: center; gap: 8px; width: 186px; height: 58px; padding: 8px; padding-right: 26px; background: #fff; border: 1px solid #dedede; border-radius: 16px; }
.sa__ico { width: 32px; height: 32px; border-radius: 9999px; background: #f5f5f5; display: inline-flex; align-items: center; justify-content: center; color: #616161; flex-shrink: 0; }
.sa__ico svg { width: 20px; height: 20px; }
.sa__meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.sa__name { font-size: 14px; line-height: 20px; font-weight: 600; font-variation-settings: 'opsz' 8, 'wght' 600; color: #242424; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sa__desc { font-size: 12px; line-height: 16px; color: #5d5d5d; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sa__x { position: absolute; top: 6px; right: 6px; display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; padding: 0; border: none; background: none; border-radius: 4px; color: #616161; cursor: pointer; transition: background 0.1s, color 0.1s; }
.sa__x:hover { background: rgba(36,36,36,0.06); color: #242424; }
.sa__x svg { width: 12px; height: 12px; }

/* ─── Prompt box with attachment ─── */
.pb { width: 720px; max-width: 100%; background: #fff; border: 1px solid #dedede; border-radius: 28px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.pb__attach { display: flex; flex-wrap: wrap; gap: 8px; padding: 4px 4px 10px; }
.pb__ta { font-size: 16px; line-height: 28px; color: #6f6f6f; padding: 0 8px 8px; }
.pb__row { display: flex; align-items: center; gap: 4px; }
.pb__btn { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border-radius: 9999px; border: none; cursor: pointer; background: transparent; color: #242424; }
.pb__btn:hover { background: rgba(36,36,36,0.04); }
.pb__btn svg { width: 20px; height: 20px; }
.pb__sp { flex: 1 1 auto; }
.pb__send { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border-radius: 9999px; border: none; cursor: pointer; background: #242424; color: #fff; }
.pb__send svg { width: 20px; height: 20px; }
`;

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Skill Attachment Preview</title>';
html += '<style>' + css + '</style></head><body>';

html += '<div class="wrap">';
html += '<h1>Skill Attachment \u2014 Component Preview</h1>';
html += '<p class="hint">A connector skill attached to the prompt box \u2014 added when a \u201c/skill\u201d is selected from a source\u2019s skills list. 186\u00d758 chip: circular Script icon, /name (Body Medium Strong) + description (Body Small), and a top-right dismiss. Click \u00d7 to remove.</p>';

// Chip
html += '<h2>Attachment chip</h2>';
html += '<div class="stage">';
SKILLS.forEach(function (s) { html += chip(s[0], s[1]); });
html += '</div>';

// In-composer variant
html += '<h2>In the prompt box</h2>';
html += '<div class="stage" style="justify-content:center">';
html += '<div class="pb">';
html += '<div class="pb__attach">' + chip('duplicate-reconciler', 'Find near-duplicate or stale pages on a topic') + '</div>';
html += '<div class="pb__ta">Message Copilot</div>';
html += '<div class="pb__row">';
html += '<button class="pb__btn" aria-label="Add">' + ADD + '</button>';
html += '<span class="pb__sp"></span>';
html += '<button class="pb__btn" aria-label="Dictate">' + MIC + '</button>';
html += '<button class="pb__send" aria-label="Send">' + ARROW + '</button>';
html += '</div>';
html += '</div>';
html += '</div>';

html += '</div>'; // wrap

// Dismiss interaction
html += '<script>';
html += 'document.querySelectorAll(".sa__x").forEach(function(b){ b.addEventListener("click", function(){ var c = b.closest(".sa"); if (c) c.remove(); }); });';
html += '</script>';

html += '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'skillAttachment.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'skillAttachment.html'));
