/**
 * Panel — References (Interactive Preview)
 *
 * One Copilot Secondary Panel showing the References content: source-reference
 * items in file and web variants, a "Related results" section, Light + Dark.
 * Composes Fluent icons; header dismiss reuses the subtle icon-button pattern.
 *
 * Figma: One-Copilot-Desktop-UI-Kit — References panel (node 4020:1718)
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function ico(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, ' ').trim();
}
const infoIco = ico('info-20-regular.svg');
const dismissIco = ico('dismiss-20-regular.svg');
const moreIco = ico('more-vertical-20-regular.svg');
const docIco = ico('document-20-regular.svg');

// ─── Item builders ──────────────────────────────────────────

function fileItem(title: string, meta: string, snippet: string): string {
  return '<div class="ri">'
    + '<span class="ri__ico ri__ico--file">' + docIco + '</span>'
    + '<div class="ri__col">'
    + '<div class="ri__row1"><span class="ri__title">' + title + '</span></div>'
    + '<div class="ri__meta"><span class="ri__sec">' + meta + '</span><span class="ri__more">' + moreIco + '</span></div>'
    + '<div class="ri__snippet">' + snippet + '</div>'
    + '</div></div>';
}

function webItem(color: string, source: string, title: string, url: string): string {
  return '<div class="ri">'
    + '<span class="ri__fav" style="background:' + color + '"></span>'
    + '<div class="ri__col">'
    + '<div class="ri__sec">' + source + '</div>'
    + '<div class="ri__title">' + title + '</div>'
    + '<div class="ri__sec ri__url">' + url + '</div>'
    + '</div></div>';
}

function panel(theme: string): string {
  const items = ''
    + fileItem('Support ticket summary', 'Mona Kane modified 3 days ago', '\u201c\u2026one of the top recurring issue is the inconsistency of performance when under different loads\u2026\u201d')
    + fileItem('Support ticket summary', 'Mona Kane modified 3 days ago', '\u201c\u2026one of the top recurring issue is the inconsistency of performance when under different loads\u2026\u201d')
    + webItem('#6001d2', 'Yahoo News', 'US Space Force unveils new names for satellites', 'yahoo.com/news/articles/space-force-unveils-themes-w\u2026')
    + webItem('#6001d2', 'Yahoo News', 'US Space Force unveils new names for satellites', 'yahoo.com/news/articles/space-force-unveils-themes-w\u2026')
    + fileItem('Support ticket summary', 'Mona Kane modified 3 days ago', '\u201c\u2026one of the top recurring issue is the inconsistency of performance when under different loads\u2026\u201d');
  const related = ''
    + fileItem('Support ticket summary', 'Mona Kane modified 3 days ago', '\u201c\u2026one of the top recurring issue is the inconsistency of performance when under different loads\u2026\u201d')
    + fileItem('Support ticket summary', 'Mona Kane modified 3 days ago', '\u201c\u2026one of the top recurring issue is the inconsistency of performance when under different loads\u2026\u201d');
  return '<div class="pnl pnl--' + theme + '">'
    + '<div class="pnl__hdr"><div class="pnl__hdr-l"><span class="pnl__hdr-title">References</span><span class="pnl__hdr-info">' + infoIco + '</span></div>'
    + '<button class="pnl__dismiss" type="button" aria-label="Close">' + dismissIco + '</button></div>'
    + '<div class="pnl__content">'
    + '<div class="pnl__list">' + items + '</div>'
    + '<div class="pnl__section">Related results</div>'
    + '<div class="pnl__list">' + related + '</div>'
    + '</div></div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', sans-serif; background: #eee; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 16px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 820px; margin: 0 auto; }
.stage { display: flex; gap: 32px; justify-content: center; flex-wrap: wrap; }

/* ─── Panel shell ─── */
.pnl { width: 360px; display: flex; flex-direction: column; border-left: 1px solid; height: 720px; overflow: hidden; }
.pnl--light { background: #fcfcfc; border-color: rgba(189,189,189,0.5); }
.pnl--dark  { background: #242424; border-color: rgba(103,103,103,0.5); }

/* Header */
.pnl__hdr { height: 56px; flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; }
.pnl__hdr-l { display: flex; align-items: center; gap: 6px; }
.pnl__hdr-title { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.pnl__hdr-info { display: inline-flex; width: 16px; height: 16px; }
.pnl__hdr-info svg { width: 16px; height: 16px; display: block; }
.pnl--light .pnl__hdr-title { color: #242424; } .pnl--light .pnl__hdr-info { color: #5d5d5d; }
.pnl--dark .pnl__hdr-title { color: #dedede; } .pnl--dark .pnl__hdr-info { color: #aeaeae; }
.pnl__dismiss { width: 32px; height: 32px; border: none; background: transparent; border-radius: 9999px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: background 0.1s; }
.pnl__dismiss svg { width: 20px; height: 20px; display: block; }
.pnl--light .pnl__dismiss { color: #242424; } .pnl--light .pnl__dismiss:hover { background: rgba(36,36,36,0.04); }
.pnl--dark .pnl__dismiss { color: #dedede; } .pnl--dark .pnl__dismiss:hover { background: rgba(255,255,255,0.06); }

/* Content scroll */
.pnl__content { flex: 1; overflow-y: auto; padding-bottom: 12px; }
.pnl__list { display: flex; flex-direction: column; gap: 2px; padding: 0 12px; }

/* Section header */
.pnl__section { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 12px; line-height: 16px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; padding: 8px; }
.pnl--light .pnl__section { color: #5d5d5d; } .pnl--dark .pnl__section { color: #aeaeae; }

/* ─── Reference item ─── */
.ri { display: flex; align-items: flex-start; gap: 6px; width: 336px; padding: 8px; border-radius: 16px; background: transparent; cursor: pointer; transition: background 0.1s; }
.pnl--light .ri:hover { background: rgba(36,36,36,0.04); }
.pnl--dark .ri:hover { background: rgba(255,255,255,0.06); }
.ri__ico { display: inline-flex; width: 16px; height: 16px; flex-shrink: 0; margin-top: 2px; }
.ri__ico svg { width: 16px; height: 16px; display: block; }
.ri__ico--file { color: #21a366; }
.ri__fav { width: 16px; height: 16px; border-radius: 4px; flex-shrink: 0; margin-top: 2px; }
.ri__col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.ri__title { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pnl--light .ri__title { color: #242424; } .pnl--dark .ri__title { color: #dedede; }
.ri__row1 { display: flex; align-items: center; }
.ri__meta { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.ri__sec { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 12px; line-height: 16px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pnl--light .ri__sec { color: #5d5d5d; } .pnl--dark .ri__sec { color: #aeaeae; }
.ri__more { display: inline-flex; width: 16px; height: 16px; flex-shrink: 0; }
.ri__more svg { width: 16px; height: 16px; display: block; }
.pnl--light .ri__more { color: #5d5d5d; } .pnl--dark .ri__more { color: #aeaeae; }
.ri__snippet { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 12px; line-height: 16px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.pnl--light .ri__snippet { color: #5d5d5d; } .pnl--dark .ri__snippet { color: #aeaeae; }
.ri__url { display: block; }

/* ─── Usage docs ─── */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin: 24px 0 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
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

const body = [
  stage(panel('light')),
  '<h2>References panel</h2>',
  '<div class="stage">' + panel('light') + panel('dark') + '</div>',
  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> Dock references beside a response so people can trace every claim to its source. Each item surfaces the source icon, title, and a short glimpse of the referenced content \u2014 file references show author and date; web references show the site and URL.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Group primary results, then a \u201cRelated results\u201d section.</li>',
  '<li>Truncate long titles/URLs to one line; clamp snippets to two.</li>',
  '<li>Keep the source icon/favicon to aid recognition.</li>',
  '<li>Let the whole item be the click target to open the source.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Mix unrelated content into the references list.</li>',
  '<li>Hide the dismiss control \u2014 the panel is dismissible.</li>',
  '<li>Show more than a two-line snippet per item.</li>',
  '<li>Drop the author/date or URL that establishes provenance.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Panel \u2014 References Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Panel \u2014 References</h1>'
  + '<p class="hint">Secondary panel docked beside a response \u2014 source references in file and web variants.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'panel.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'panel.html'));
