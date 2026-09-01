/**
 * Accordion — Interactive Preview
 *
 * One Copilot primitive. Shows chevron-leading and chevron-trailing layouts,
 * collapsed / expanded / hover / focus states, live click-to-toggle, and usage docs.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Icons — exact Fluent System assets (read from src/components/icons) ──────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
const chevronRight16 = readIcon('chevron-right-16-regular.svg');
const image16 = readIcon('image-16-regular.svg');

// ─── Markup builder ─────────────────────────────────────────

function accordion(pos: string, open: boolean, opts?: { hover?: boolean; focus?: boolean }): string {
  const cls = ['acc', 'acc--' + pos];
  if (open) cls.push('acc--open');
  if (opts && opts.hover) cls.push('is-hover');
  if (opts && opts.focus) cls.push('is-focus');

  const chevron = '<span class="acc__chev">' + chevronRight16 + '</span>';
  const icon = '<span class="acc__icon">' + image16 + '</span>';
  const title = '<span class="acc__title">Section title</span>';

  let header = '';
  if (pos === 'leading') {
    header = '<button class="acc__header" type="button">' + chevron + icon + title + '</button>';
  } else {
    header = '<button class="acc__header" type="button"><span class="acc__content">' + icon + title + '</span>' + chevron + '</button>';
  }

  const body = '<div class="acc__body"><div class="acc__body-inner">Body content lives in a slot revealed on expand \u2014 paragraphs, lists, or nested controls.</div></div>';

  return '<div class="' + cls.join(' ') + '">' + header + body + '</div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 700px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }
.stack { display: flex; flex-direction: column; gap: 20px; margin-bottom: 16px; }
.panel { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 12px; }

/* ─── Accordion ─── */
.acc { width: 100%; }
.acc__header {
  display: flex; align-items: center; gap: 4px; width: 100%;
  min-height: 24px; padding: 4px 8px; border: none; border-radius: 8px;
  background: transparent; cursor: pointer; text-align: left;
  font-family: inherit; color: #242424; transition: background 0.1s;
}
.acc__header:hover, .acc.is-hover .acc__header { background: rgba(36,36,36,0.04); }
.acc__header:active { background: #f5f5f5; }
.acc__header:focus-visible, .acc.is-focus .acc__header {
  outline: 2px solid #242424; outline-offset: 1px;
}
.acc.is-focus .acc__header { outline: 2px solid #242424; outline-offset: 1px; }

.acc__chev { display: inline-flex; width: 16px; height: 16px; color: #242424; flex-shrink: 0; transition: transform 0.15s ease; }
.acc--open .acc__chev { transform: rotate(90deg); }

.acc__icon { display: inline-flex; width: 16px; height: 16px; color: #242424; flex-shrink: 0; }

.acc__content { display: flex; align-items: center; gap: 4px; flex: 1 0 0; min-width: 0; overflow: hidden; }

.acc__title {
  flex: 1 0 0; min-width: 0;
  font-family: 'Segoe Sans', 'Segoe UI', sans-serif;
  font-size: 12px; font-weight: 500; font-variation-settings: 'opsz' 8, 'wght' 500;
  line-height: 16px; letter-spacing: 0;
  color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.acc--trailing .acc__title { flex: 0 1 auto; }

/* Body reveal */
.acc__body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.18s ease; }
.acc--open .acc__body { grid-template-rows: 1fr; }
.acc__body-inner {
  overflow: hidden; padding: 0 8px;
  font-family: 'Aptos', 'Segoe UI', sans-serif; font-size: 12px; line-height: 16px; color: #5d5d5d;
}
.acc--open .acc__body-inner { padding: 4px 8px 8px; }

/* ─── Usage docs ─── */
.usage { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }
.usage__col { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; }
.usage__col h3 { font-size: 12px; font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
.usage__col--do h3 { color: #0f7b0f; }
.usage__col--dont h3 { color: #b10e1c; }
.usage__col ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.usage__col li { font-size: 12px; line-height: 1.5; color: #5d5d5d; padding-left: 16px; position: relative; }
.usage__col li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 6px; border-radius: 50%; }
.usage__col--do li::before { background: #0f7b0f; }
.usage__col--dont li::before { background: #b10e1c; }
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
`;

// ─── Body markup ────────────────────────────────────────────

const body = [
  stage('<div class="panel" style="width:440px">' + accordion('leading', true) + '</div>'),
  '<h2>Chevron leading</h2>',
  '<div class="stack">',
  '<div><span class="rl">Collapsed</span><div class="panel">' + accordion('leading', false) + '</div></div>',
  '<div><span class="rl">Expanded</span><div class="panel">' + accordion('leading', true) + '</div></div>',
  '<div><span class="rl">Hover</span><div class="panel">' + accordion('leading', false, { hover: true }) + '</div></div>',
  '<div><span class="rl">Focused</span><div class="panel">' + accordion('leading', false, { focus: true }) + '</div></div>',
  '</div>',

  '<h2>Chevron trailing</h2>',
  '<div class="stack">',
  '<div><span class="rl">Collapsed</span><div class="panel">' + accordion('trailing', false) + '</div></div>',
  '<div><span class="rl">Expanded</span><div class="panel">' + accordion('trailing', true) + '</div></div>',
  '</div>',

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> Group related content into collapsible sections so people can scan headings first and expand only what they need \u2014 settings groups, source lists, FAQs, or long secondary detail inside a panel.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Keep titles short and scannable (Body Small Strong, 12px).</li>',
  '<li>Use chevron-leading for dense lists, chevron-trailing for full-width rows.</li>',
  '<li>Let the whole header be the click target.</li>',
  '<li>Preserve expanded/collapsed state across interactions.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Nest accordions more than one level deep.</li>',
  '<li>Hide primary or required actions inside a collapsed body.</li>',
  '<li>Mix chevron-leading and chevron-trailing in the same group.</li>',
  '<li>Use it for a single always-open section \u2014 just show the content.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

// ─── Interaction script ─────────────────────────────────────

let js = '';
js += '<script>';
js += '\n';
js += 'document.querySelectorAll(\'.acc__header\').forEach(function (h) {';
js += '\n';
js += '  h.addEventListener(\'click\', function () {';
js += '\n';
js += '    var acc = h.closest(\'.acc\');';
js += '\n';
js += '    if (acc) acc.classList.toggle(\'acc--open\');';
js += '\n';
js += '  });';
js += '\n';
js += '});';
js += '\n';
js += '</script>';

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Accordion Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Accordion \u2014 Component Preview</h1>'
  + '<p class="hint">Expand-and-collapse section primitive. Click any header to toggle.</p>'
  + body + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'accordion.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
