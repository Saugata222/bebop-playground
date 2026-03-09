/**
 * Tag — Interactive HTML Preview (no Selected variant)
 *
 * Shows tag variants: Style × Size × Layout × State
 * Dismiss button removes the tag with animation.
 */

import * as fs from 'fs';
import * as path from 'path';

const dx20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.08859 4.21569L4.14645 4.14645C4.32001 3.97288 4.58944 3.9536 4.78431 4.08859L4.85355 4.14645L10 9.293L15.1464 4.14645C15.32 3.97288 15.5894 3.9536 15.7843 4.08859L15.8536 4.14645C16.0271 4.32 16.0464 4.58944 15.9114 4.78431L15.8536 4.85355L10.707 10L15.8536 15.1464C16.0271 15.32 16.0464 15.5894 15.9114 15.7843L15.8536 15.8536C15.68 16.0271 15.4106 16.0464 15.2157 15.9114L15.1464 15.8536L10 10.707L4.85355 15.8536C4.67999 16.0271 4.41056 16.0464 4.21569 15.9114L4.14645 15.8536C3.97288 15.68 3.9536 15.4106 4.08859 15.2157L4.14645 15.1464L9.293 10L4.14645 4.85355C3.97288 4.67999 3.9536 4.41056 4.08859 4.21569Z" fill="currentColor"/></svg>';
const dx16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.58859 2.71569L2.64645 2.64645C2.82001 2.47288 3.08944 2.4536 3.28431 2.58859L3.35355 2.64645L8 7.293L12.6464 2.64645C12.8417 2.45118 13.1583 2.45118 13.3536 2.64645C13.5488 2.84171 13.5488 3.15829 13.3536 3.35355L8.707 8L13.3536 12.6464C13.5271 12.82 13.5464 13.0894 13.4114 13.2843L13.3536 13.3536C13.18 13.5271 12.9106 13.5464 12.7157 13.4114L12.6464 13.3536L8 8.707L3.35355 13.3536C3.15829 13.5488 2.84171 13.5488 2.64645 13.3536C2.45118 13.1583 2.45118 12.8417 2.64645 12.6464L7.293 8L2.64645 3.35355C2.47288 3.17999 2.4536 2.91056 2.58859 2.71569Z" fill="currentColor"/></svg>';
const circ16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM8 13C5.23858 13 3 10.7614 3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8C13 10.7614 10.7614 13 8 13Z" fill="currentColor"/></svg>';

function tagIT(sz: string, extra: string, label: string): string {
  const d = sz === 'sm' ? dx16 : dx20;
  return '<div class="t t--' + sz + ' t--primary' + extra + '">'
    + '<span class="t__label">' + label + '</span>'
    + '<button class="t__dismiss" aria-label="Dismiss">' + d + '</button>'
    + '</div>';
}

function tagIO(sz: string, extra: string): string {
  const d = sz === 'sm' ? dx16 : dx20;
  return '<div class="t t--' + sz + '-io t--primary' + extra + '">'
    + '<button class="t__dismiss" aria-label="Dismiss">' + d + '</button>'
    + '</div>';
}

function tagWithIcon(sz: string, extra: string, label: string): string {
  const d = sz === 'sm' ? dx16 : dx20;
  return '<div class="t t--' + sz + ' t--primary' + extra + '">'
    + '<span class="t__icon-before">' + circ16 + '</span>'
    + '<span class="t__label">' + label + '</span>'
    + '<button class="t__dismiss" aria-label="Dismiss">' + d + '</button>'
    + '</div>';
}

function row(items: [string, string][]): string {
  return '<div class="row">' + items.map(([label, html]) =>
    '<div class="cell"><span class="rl">' + label + '</span>' + html + '</div>'
  ).join('') + '</div>';
}

const body = [
  '<h2>Medium \u2014 Icon and Text</h2>',
  row([
    ['Rest', tagIT('md', '', 'Tag text')],
    ['Disabled', tagIT('md', ' dis', 'Tag text')],
  ]),
  '<h2>Medium \u2014 Icon and Text + Leading Icon</h2>',
  row([
    ['Rest', tagWithIcon('md', '', 'Tag text')],
  ]),
  '<h2>Medium \u2014 Icon Only (Dismiss)</h2>',
  row([
    ['Rest', tagIO('md', '')],
    ['Disabled', tagIO('md', ' dis')],
  ]),
  '<h2>Small \u2014 Icon and Text</h2>',
  row([
    ['Rest', tagIT('sm', '', 'Tag text')],
    ['Disabled', tagIT('sm', ' dis', 'Tag text')],
  ]),
  '<h2>Small \u2014 Icon Only (Dismiss)</h2>',
  row([
    ['Rest', tagIO('sm', '')],
    ['Disabled', tagIO('sm', ' dis')],
  ]),
].join('\n');

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 24px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 900px; margin: 0 auto; }
.row { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 8px; }
.cell { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; }

.t {
  display: inline-flex; align-items: center; justify-content: center;
  position: relative; transition: background 0.1s, opacity 0.2s;
}

/* Sizes */
.t--md { height: 32px; padding: 6px 10px; gap: 2px; border-radius: 12px; font-size: 14px; }
.t--md svg { width: 20px; height: 20px; }
.t--md .t__icon-before svg { width: 16px; height: 16px; }
.t--sm { height: 25px; padding: 4px 8px; gap: 2px; border-radius: 8px; font-size: 12px; }
.t--sm svg { width: 16px; height: 16px; }
.t--sm .t__icon-before svg { width: 12px; height: 12px; }
.t--md-io { width: 32px; height: 32px; padding: 6px; border-radius: 9999px; }
.t--md-io svg { width: 20px; height: 20px; }
.t--sm-io { width: 25px; height: 25px; padding: 4px; border-radius: 9999px; }
.t--sm-io svg { width: 16px; height: 16px; }

/* Primary style */
.t--primary { background: #242424; color: #fff; }
.t--primary:hover:not(.dis) { background: #2b2b2b; }

/* Label */
.t__label { font-weight: 400; line-height: 1.4; padding: 0 2px; }

/* Dismiss */
.t__dismiss {
  display: inline-flex; align-items: center; justify-content: center;
  background: none; border: none; color: inherit; cursor: pointer; padding: 0; line-height: 0;
}

/* Icon before */
.t__icon-before { display: inline-flex; align-items: center; justify-content: center; padding: 2px; }

/* Disabled */
.t.dis { background: #ebebeb; color: #929292; cursor: not-allowed; }
.t.dis .t__dismiss { pointer-events: none; }

/* Remove animation */
.t.removing { opacity: 0; transform: scale(0.9); transition: opacity 0.15s, transform 0.15s; }
`;

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Tag Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Tag \u2014 Component Preview</h1>'
  + '<p class="hint">Hover for hover state. Click the \u00d7 dismiss icon to remove a tag.</p>'
  + body + '</div>'
  + '<script>'
  + 'document.querySelectorAll(".t__dismiss").forEach(d=>{'
  +   'd.addEventListener("click",e=>{'
  +     'e.stopPropagation();'
  +     'const t=d.closest(".t");'
  +     'if(t&&!t.classList.contains("dis")){'
  +       't.classList.add("removing");'
  +       'setTimeout(()=>t.remove(),200);'
  +     '}'
  +   '});'
  + '});'
  + '</script></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'tag.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
