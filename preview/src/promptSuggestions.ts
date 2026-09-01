/**
 * Prompt Suggestions — Interactive Preview
 *
 * One Copilot compound (node 4146:78273). Type-ahead prompt autosuggestions:
 * a category chip row (reuses suggestionChips) above a list of prompt rows
 * (reuses menuListItem + divider). Shows the main example plus the matched-word
 * highlight and light / dark theme variants.
 *
 * Icons: real Fluent more-horizontal-20 (overflow). Font: Segoe Sans.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Icon — real Fluent asset ───────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
const moreH20 = readIcon('more-horizontal-20-regular.svg');

// ─── Builders ───────────────────────────────────────────────

// Per-category suggestion sets. Selecting a chip swaps the list below.
const categories: { label: string; prompts: string[] }[] = [
  {
    label: 'Get to know Copilot',
    prompts: [
      'What can Copilot do for me at work?',
      'Show me around the Copilot app',
      'Summarize what happened while I was away',
    ],
  },
  {
    label: 'Prepare for what\u2019s ahead',
    prompts: [
      'Draft an agenda for my next meeting',
      'Catch me up on the launch project',
      'What\u2019s due this week across my files?',
    ],
  },
  {
    label: 'Build it today',
    prompts: [
      'Write a compelling intro paragraph to file',
      'Write a SQL query to return all columns from the table where',
      'Write a follow up email to meeting drive continued progress',
    ],
  },
];

function chip(label: string, index: number, selected: boolean): string {
  return '<button class="ps-chip' + (selected ? ' ps-chip--selected' : '') + '" data-chip="' + index + '" aria-pressed="' + (selected ? 'true' : 'false') + '">' + label + '</button>';
}

function chipRow(activeIndex: number): string {
  let chips = '';
  categories.forEach((c, i) => { chips += chip(c.label, i, i === activeIndex); });
  return '<div class="ps-chiprow">'
    + chips
    + '<button class="ps-overflow" aria-label="More categories">' + moreH20 + '</button>'
    + '</div>';
}

/** A prompt row. If matched is set, the typed prefix is de-emphasized. */
function promptRow(text: string, last: boolean, matched?: string): string {
  let label = text;
  if (matched) {
    label = '<span class="ps-matched">' + matched + '</span>' + text.slice(matched.length);
  }
  return '<div class="ps-row' + (last ? ' ps-row--last' : '') + '"><div class="ps-item"><span class="ps-label">' + label + '</span></div></div>';
}

function promptListFor(index: number): string {
  const prompts = categories[index]!.prompts;
  let rows = '';
  prompts.forEach((p, i) => { rows += promptRow(p, i === prompts.length - 1); });
  return '<div class="ps-list-rows" data-list>' + rows + '</div>';
}

/** A single-row variant cell used in the Variants grid. */
function variantCell(theme: string, matched: boolean): string {
  const row = matched
    ? promptRow('Write a compelling intro paragraph to file', true, 'Write a')
    : promptRow('Write a compelling intro paragraph to file', true);
  const title = matched ? 'With matched words' : 'Without matched word highlight';
  return '<div class="ps-cell ps-cell--' + theme + '"><span class="ps-cell__title">' + title + '</span>'
    + '<div class="ps-list ps-list--narrow">' + row + '</div></div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 28px; }
.wrap { max-width: 900px; margin: 0 auto; }

/* ─── Surface slot (surface/neutral/near, radius 16) ─── */
.ps-slot { background: #fcfcfc; border-radius: 16px; padding: 48px; display: flex; justify-content: center; }

/* ─── Prompt list (width 656, gap 12, left-aligned) ─── */
.ps-list { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; width: 656px; max-width: 100%; }
.ps-list--narrow { width: 100%; gap: 0; }
.ps-list-rows { display: flex; flex-direction: column; width: 100%; }

/* ─── Category chip row ─── */
.ps-chiprow { display: flex; align-items: center; gap: 12px; }
.ps-chip {
  display: inline-flex; align-items: center; justify-content: center;
  background: rgba(36,36,36,0); border: 1px solid rgba(189,189,189,0.5);
  border-radius: 12px; padding: 10px; gap: 4px; cursor: pointer;
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  font-size: 14px; font-weight: 420; line-height: 20px; color: #5d5d5d; white-space: nowrap;
  transition: background 0.1s, border-color 0.1s;
}
.ps-chip:hover { background: rgba(24,24,24,0.04); }
/* Selected chip — reuses the Tab primitive selected affordance */
.ps-chip--selected { background: #242424; border-color: transparent; color: #fff; font-weight: 625; }
.ps-chip--selected:hover { background: #313131; }
.ps-chip--selected:active { background: #3e3e3e; }
.ps-overflow {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 8px 6px; border-radius: 9999px; border: none; background: rgba(36,36,36,0);
  color: #6f6f6f; cursor: pointer; transition: background 0.1s;
}
.ps-overflow:hover { background: rgba(24,24,24,0.04); }
.ps-overflow svg { width: 20px; height: 20px; display: block; }

/* ─── Prompt row (menuListItem + bottom divider) ─── */
.ps-row { border-bottom: 1px solid #dedede; }
.ps-row--last { border-bottom: none; }
.ps-item {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 12px; border-radius: 12px; background: rgba(36,36,36,0);
  transition: background 0.1s; cursor: pointer;
}
.ps-item:hover { background: rgba(24,24,24,0.04); }
.ps-label {
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  font-size: 14px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; line-height: 20px; color: #242424;
}
/* Matched (already-typed) prefix is de-emphasized */
.ps-matched { color: #6f6f6f; }

/* ─── Variants grid ─── */
.ps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-radius: 16px; overflow: hidden; }
.ps-cell { padding: 40px; min-height: 150px; position: relative; display: flex; align-items: center; justify-content: center; }
.ps-cell__title { position: absolute; top: 20px; left: 20px; font-size: 14px; line-height: 20px; }
.ps-cell--light { background: #fcfcfc; }
.ps-cell--light .ps-cell__title { color: #242424; }
.ps-cell--dark { background: #242424; }
.ps-cell--dark .ps-cell__title { color: #dedede; }
.ps-cell--dark .ps-row { border-bottom-color: #484848; }
.ps-cell--dark .ps-item { background: rgba(255,255,255,0); }
.ps-cell--dark .ps-item:hover { background: rgba(255,255,255,0.06); }
.ps-cell--dark .ps-label { color: #dedede; }
.ps-cell--dark .ps-matched { color: #6f6f6f; }

/* ─── Usage ─── */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin: 16px 0 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
.usage { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.usage__col { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; }
.usage__col h3 { font-size: 12px; font-weight: 600; margin-bottom: 8px; }
.usage__col--do h3 { color: #0f7b0f; }
.usage__col--dont h3 { color: #b10e1c; }
.usage__col ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.usage__col li { font-size: 12px; line-height: 1.5; color: #5d5d5d; padding-left: 16px; position: relative; }
.usage__col li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 6px; border-radius: 50%; }
.usage__col--do li::before { background: #0f7b0f; }
.usage__col--dont li::before { background: #b10e1c; }
`;

// ─── Body ───────────────────────────────────────────────────

const body = [
  stage(chipRow(0) + promptListFor(0)),
  '<h2>Default — interactive</h2>',
  '<p class="hint" style="text-align:left;margin:0 0 12px">Only the category chips show by default. Select a chip to reveal that category\u2019s suggestion list; select it again to collapse it.</p>',
  '<div class="ps-slot"><div class="ps-list" id="ps-live">' + chipRow(-1) + '<div class="ps-list-rows" data-list></div></div></div>',

  '<h2>Variants</h2>',
  '<div class="ps-grid">',
  variantCell('light', false),
  variantCell('dark', false),
  variantCell('light', true),
  variantCell('dark', true),
  '</div>',

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> Type-ahead prompt autosuggestions appear when someone begins typing their own prompt. They are only available in the zero-query state \u2014 not at turn N. Category chips filter the suggestion set; each row completes the current prompt.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>De-emphasize the already-typed words (tertiary #6f6f6f) so the completion reads as the suggestion.</li>',
  '<li>Reuse suggestionChips for the category row and menuListItem for the prompt rows.</li>',
  '<li>Separate rows with the subtle divider; omit it on the last row.</li>',
  '<li>Reserve the semibold width (ghost node) so hover doesn\'t reflow the row.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Show autosuggestions at turn N \u2014 they are zero-query only.</li>',
  '<li>Fill or stroke the list container \u2014 weight comes from the rows.</li>',
  '<li>Mix icons into the prompt rows \u2014 they are text-only completions.</li>',
  '<li>Hardcode pixel radii \u2014 use base-300 (12) and circular for the overflow.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

// ─── Interaction ─────────────────────────────────────
const lists = categories.map((_, i) => promptListFor(i));
let js = '';
js += '<script>';
js += '\n';
js += 'var lists = ' + JSON.stringify(lists) + ';';
js += '\n';
js += 'var live = document.getElementById(\'ps-live\');';
js += '\n';
js += 'if (live) {';
js += '\n';
js += '  live.addEventListener(\'click\', function (e) {';
js += '\n';
js += '    var chip = e.target.closest(\'.ps-chip\');';
js += '\n';
js += '    if (!chip) return;';
js += '\n';
js += '    var idx = parseInt(chip.getAttribute(\'data-chip\'), 10);';
js += '\n';
js += '    var wasSelected = chip.classList.contains(\'ps-chip--selected\');';
js += '\n';
js += '    live.querySelectorAll(\'.ps-chip\').forEach(function (c) {';
js += '\n';
js += '      var on = c === chip && !wasSelected;';
js += '\n';
js += '      c.classList.toggle(\'ps-chip--selected\', on);';
js += '\n';
js += '      c.setAttribute(\'aria-pressed\', on ? \'true\' : \'false\');';
js += '\n';
js += '    });';
js += '\n';
js += '    var old = live.querySelector(\'[data-list]\');';
js += '\n';
js += '    if (old) old.outerHTML = wasSelected ? \'<div class="ps-list-rows" data-list></div>\' : lists[idx];';
js += '\n';
js += '  });';
js += '\n';
js += '}';
js += '\n';
js += '</script>';

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Prompt Suggestions Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Prompt Suggestions — Component Preview</h1>'
  + '<p class="hint">Type-ahead autosuggestions (zero-query). Category chips + prompt rows, with optional matched-word highlight, in light and dark themes.</p>'
  + body + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'promptSuggestions.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
