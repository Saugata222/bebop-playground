/**
 * Citation — Interactive Preview
 *
 * One Copilot primitive (node 3992:126696). Inline indicator marking where a
 * referenced source appears in a response. Renders the exact variant matrix —
 * Work (leading product icon) / Web (source-name text), each Rest + Selected,
 * across Light and Dark themes — a sources gallery, and usage guidance.
 *
 * Icons: exact Fluent / product assets from src/components/icons.
 * Font: Segoe Sans (functional caption).
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Icons — product / app color marks ──────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readSvg(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, '').trim();
}
const excel = readSvg('excel-20-color.svg');
const word = readSvg('word-20-color.svg');
const powerpoint = readSvg('powerpoint-20-color.svg');
const hubspot = readSvg('hubspot-20-color.svg');

// ─── Markup builders ────────────────────────────────────────

function work(icon: string, count: string, selected?: boolean): string {
  return '<span class="cit cit--work' + (selected ? ' cit--selected' : '') + '" role="button" tabindex="0">'
    + '<span class="cit__ico">' + icon + '</span>'
    + (count ? '<span class="cit__of">' + count + '</span>' : '')
    + '</span>';
}
function web(source: string, count: string, selected?: boolean): string {
  return '<span class="cit cit--web' + (selected ? ' cit--selected' : '') + '" role="button" tabindex="0">'
    + '<span class="cit__src">' + source + '</span>'
    + (count ? '<span class="cit__of">' + count + '</span>' : '')
    + '</span>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 760px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px; }

/* Variant matrix — 2 columns (light / dark surface) */
.matrix { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-radius: 16px; overflow: hidden; }
.mcell { padding: 28px 24px; display: flex; flex-direction: column; gap: 6px; position: relative; }
.mcell--light { background: #fcfcfc; }
.mcell--dark { background: #242424; }
.mcell__lbl { font-size: 12px; color: #242424; }
.mcell--dark .mcell__lbl { color: #dedede; }
.mcell__stage { display: flex; align-items: center; justify-content: center; padding: 16px 0 4px; }

/* ─── Citation pill ─── */
.cit {
  display: inline-flex; align-items: center; gap: 2px; min-height: 24px;
  padding: 4px 8px; border-radius: 9999px; background: #f2f2f2; cursor: pointer;
  border: none; transition: background 0.1s;
}
.cit:focus-visible { outline: 2px solid #242424; outline-offset: 2px; }
.cit__ico { display: inline-flex; align-items: center; }
.cit__ico svg { width: 16px; height: 16px; display: block; }
.cit__of, .cit__src {
  font-size: 10px; line-height: 14px; letter-spacing: 0; color: #5d5d5d;
  font-variation-settings: 'opsz' 8, 'wght' 420; white-space: nowrap;
}
.cit__src { max-width: 80px; overflow: hidden; text-overflow: ellipsis; }
.cit--selected { background: #242424; }
.cit--selected .cit__of, .cit--selected .cit__src { color: #ffffff; }

/* Dark surface theme */
.theme-dark .cit { background: #2e2e2e; }
.theme-dark .cit__of, .theme-dark .cit__src { color: #aeaeae; }
.theme-dark .cit--selected { background: #ffffff; }
.theme-dark .cit--selected .cit__of, .theme-dark .cit--selected .cit__src { color: #242424; }

/* Sources gallery */
.gallery { display: flex; flex-wrap: wrap; gap: 10px; background: #fff; border: 1px solid #ebebeb; border-radius: 16px; padding: 20px; }

/* ─── Usage docs ─── */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
.usage { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }
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

// ─── Body markup ────────────────────────────────────────────

function cell(theme: 'light' | 'dark', label: string, pill: string): string {
  const themeCls = theme === 'dark' ? ' theme-dark' : '';
  return '<div class="mcell mcell--' + theme + themeCls + '"><span class="mcell__lbl">' + label + '</span><div class="mcell__stage">' + pill + '</div></div>';
}

const body = [
  stage('<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">' + work(excel, '+2') + web('Yahoo News', '+2') + work(word, '') + web('Wikipedia', '') + '</div>'),
  '<h2>Variants</h2>',
  '<div class="matrix">',
  cell('light', 'Work', work(excel, '+2')),
  cell('dark', 'Work', work(excel, '+2')),
  cell('light', 'Web', web('Yahoo News', '+2')),
  cell('dark', 'Web', web('Yahoo News', '+2')),
  cell('light', 'Work selected', work(excel, '+2', true)),
  cell('dark', 'Work selected', work(excel, '+2', true)),
  cell('light', 'Web selected', web('Yahoo News', '+2', true)),
  cell('dark', 'Web selected', web('Yahoo News', '+2', true)),
  '</div>',

  '<h2>Sources gallery</h2>',
  '<div class="rl">Work \u00b7 product & connector marks</div>',
  '<div class="gallery">',
  work(excel, '+2'), work(word, ''), work(powerpoint, '+4'), work(hubspot, ''),
  '</div>',
  '<div class="rl" style="margin-top:16px;">Web \u00b7 source names</div>',
  '<div class="gallery">',
  web('Yahoo News', '+2'), web('Wikipedia', ''), web('The Verge', '+1'), web('Reuters', '+3'),
  '</div>',

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> Citations are inline indicators marking where referenced sources appear within a response. They act as entry points into a Citation Preview (hover card) or the full References panel \u2014 keep them compact so they read as a mark inside running text, not a button.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Use Work with a product / connector icon for enterprise sources; Web with the source name for open-web pages.</li>',
  '<li>Collapse multiple sources into a single pill with a +N overflow count.</li>',
  '<li>Let Selected invert the pill (heavy backplate) to mark the active reference.</li>',
  '<li>Adapt backplate + foreground to the surface theme (light vs dark).</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Pad the pill out to button size \u2014 it should sit inline within text.</li>',
  '<li>Let a Web source name grow unbounded \u2014 truncate past ~80px.</li>',
  '<li>Recolor the caption arbitrarily \u2014 use the theme\u2019s secondary / on-loud roles.</li>',
  '<li>Use a Citation where a full source card or reference row is warranted.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Citation Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Citation \u2014 Component Preview</h1>'
  + '<p class="hint">Inline source indicator. Work (product icon) and Web (source name) variants, each Rest and Selected, adapting to light and dark surfaces.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'citation.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
