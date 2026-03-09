/**
 * Button — Complete Interactive Preview
 *
 * Full matrix: Style × Size × Layout × State × Selected
 */

import * as fs from 'fs';
import * as path from 'path';

// Icons
const ir16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5 5.50207C11.5 6.0555 11.0514 6.50414 10.4979 6.50414C9.94449 6.50414 9.49585 6.0555 9.49585 5.50207C9.49585 4.94864 9.94449 4.5 10.4979 4.5C11.0514 4.5 11.5 4.94864 11.5 5.50207ZM2 4.5C2 3.11929 3.11929 2 4.5 2H11.5C12.8807 2 14 3.11929 14 4.5V11.5C14 12.8807 12.8807 14 11.5 14H4.5C3.11929 14 2 12.8807 2 11.5V4.5ZM4.5 3C3.67157 3 3 3.67157 3 4.5V11.5C3 11.7316 3.05248 11.9509 3.1462 12.1467L6.79796 8.49499C7.46185 7.8311 8.53823 7.8311 9.20212 8.49499L12.8538 12.1467C12.9475 11.9509 13 11.7316 13 11.5V4.5C13 3.67157 12.3284 3 11.5 3H4.5ZM12.1467 12.8538L8.49501 9.2021C8.22164 8.92873 7.77843 8.92873 7.50506 9.2021L3.85333 12.8538C4.04914 12.9475 4.26844 13 4.5 13H11.5C11.7316 13 11.9509 12.9475 12.1467 12.8538Z" fill="currentColor"/></svg>';
const ir20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4C4.89543 4 4 4.89543 4 6V14C4 14.3726 4.10191 14.7215 4.27937 15.0201L8.94868 10.432C9.53227 9.85859 10.4677 9.85859 11.0513 10.432L15.7206 15.0201C15.8981 14.7215 16 14.3726 16 14V6C16 4.89543 15.1046 4 14 4H6ZM6 16H14C14.3692 16 14.7149 15.9 15.0118 15.7256L10.3504 11.1453C10.1559 10.9542 9.84409 10.9542 9.64956 11.1453L4.98824 15.7256C5.28505 15.9 5.63085 16 6 16Z" fill="currentColor"/></svg>';
const if16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 2C3.11929 2 2 3.11929 2 4.5V11.5C2 11.9037 2.09996 12.2856 2.27778 12.6222L6.79796 8.16866C7.46185 7.51359 8.53823 7.51359 9.20212 8.16866L13.7222 12.6222C13.9 12.2856 14 11.9037 14 11.5V4.5C14 3.11929 12.8807 2 11.5 2H4.5ZM10.4979 6.50414C11.0514 6.50414 11.5 6.0555 11.5 5.50207C11.5 4.94864 11.0514 4.5 10.4979 4.5C9.94449 4.5 9.49585 4.94864 9.49585 5.50207C9.49585 6.0555 9.94449 6.50414 10.4979 6.50414Z" fill="currentColor"/></svg>';
const if20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3C4.34315 3 3 4.34315 3 6V14C3 14.6495 3.20642 15.2509 3.55724 15.7419L8.94759 10.4345C9.53144 9.85964 10.4686 9.85964 11.0524 10.4345L16.4428 15.7419C16.7936 15.2509 17 14.6495 17 14V6C17 4.34315 15.6569 3 14 3H6ZM6 17C5.35372 17 4.75517 16.7956 4.26544 16.448L9.6492 11.1471C9.84381 10.9555 10.1562 10.9555 10.3508 11.1471L15.7346 16.448C15.2448 16.7956 14.6463 17 14 17H6ZM12.5 8.75C11.8096 8.75 11.25 8.19036 11.25 7.5C11.25 6.80964 11.8096 6.25 12.5 6.25C13.1904 6.25 13.75 6.80964 13.75 7.5C13.75 8.19036 13.1904 8.75 12.5 8.75Z" fill="currentColor"/></svg>';

function ico(sz: string): string {
  const is16 = sz.includes('sm') || sz.includes('ism');
  return '<span class="icon-r">' + (is16 ? ir16 : ir20) + '</span><span class="icon-f">' + (is16 ? if16 : if20) + '</span>';
}

function buildSection(title: string, cls: string): string {
  const btn = (sz: string, extra: string, label: string) =>
    '<button class="b b--' + sz + ' b--' + cls + extra + '">' + ico(sz) + ' ' + label + '</button>';
  const txt = (sz: string, extra: string, label: string) =>
    '<button class="b b--' + sz + ' b--' + cls + extra + '">' + label + '</button>';
  const ion = (sz: string, extra: string) =>
    '<button class="b b--' + sz + ' b--' + cls + extra + '">' + ico(sz) + '</button>';
  const disBtn = (sz: string) =>
    '<button class="b b--' + sz + ' b--' + cls + '" disabled>' + ico(sz) + ' Disabled</button>';
  const disTxt = (sz: string) =>
    '<button class="b b--' + sz + ' b--' + cls + '" disabled>Disabled</button>';
  const disIon = (sz: string) =>
    '<button class="b b--' + sz + ' b--' + cls + '" disabled>' + ico(sz) + '</button>';

  return [
    '<div class="section">',
    '<div class="section-title">' + title + '</div>',
    '<div class="grid">',
    // Icon + Text
    '<div class="row"><span class="rl">Icon+Text</span>'
      + btn('sm', '', 'Button') + btn('md', '', 'Button') + btn('lg', '', 'Button')
      + disBtn('md') + '</div>',
    // Text only
    '<div class="row"><span class="rl">Text only</span>'
      + txt('sm', '', 'Button') + txt('md', '', 'Button') + txt('lg', '', 'Button')
      + disTxt('md') + '</div>',
    // Icon only
    '<div class="row"><span class="rl">Icon only</span>'
      + ion('ism', '') + ion('imd', '') + ion('ilg', '')
      + disIon('imd') + '</div>',
    // Selected
    '<div class="row"><span class="rl">Selected</span>'
      + btn('sm', ' sel', 'Button') + btn('md', ' sel', 'Button') + btn('lg', ' sel', 'Button')
      + ion('imd', ' sel') + '</div>',
    // Selected disabled
    '<div class="row"><span class="rl">Sel+Disabled</span>'
      + '<button class="b b--md b--' + cls + ' sel" disabled>' + ico('md') + ' Disabled</button>'
      + '<button class="b b--imd b--' + cls + ' sel" disabled>' + ico('imd') + '</button>'
      + '</div>',
    '</div></div>',
  ].join('\n');
}

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 40px; }
.section { max-width: 1000px; margin: 0 auto 48px; }
.section-title { font-size: 18px; font-weight: 600; margin-bottom: 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
.grid { display: flex; flex-direction: column; gap: 12px; }
.row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.rl { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 1px; width: 90px; flex-shrink: 0; }

/* === Base === */
.b { display: inline-flex; align-items: center; justify-content: center; cursor: pointer; position: relative;
  font-family: 'Segoe UI', sans-serif; letter-spacing: 0; line-height: 1.4; transition: background 0.1s; outline: none; white-space: nowrap; }
.b svg { display: block; flex-shrink: 0; }
.b .icon-r { display: inline-flex; } .b .icon-f { display: none; }
.b.sel .icon-r { display: none; } .b.sel .icon-f { display: inline-flex; }
.b.sel { font-weight: 600; }
.b:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }

/* === Sizes === */
.b--sm { height: 25px; padding: 4px 8px; gap: 2px; border-radius: 8px; font-size: 12px; font-weight: 400; }
.b--sm svg { width: 16px; height: 16px; }
.b--md { height: 32px; padding: 6px 10px; gap: 4px; border-radius: 12px; font-size: 14px; font-weight: 400; }
.b--md svg { width: 20px; height: 20px; }
.b--lg { height: 38px; padding: 8px 12px; gap: 6px; border-radius: 16px; font-size: 16px; font-weight: 400; }
.b--lg svg { width: 20px; height: 20px; }
.b--ism { width: 24px; height: 24px; padding: 4px; border-radius: 8px; }
.b--ism svg { width: 16px; height: 16px; }
.b--imd { width: 32px; height: 32px; padding: 6px; border-radius: 12px; }
.b--imd svg { width: 20px; height: 20px; }
.b--ilg { width: 40px; height: 40px; padding: 10px; border-radius: 16px; }
.b--ilg svg { width: 20px; height: 20px; }

/* === Subtle === */
.b--subtle { background: transparent; color: #242424; border: none; }
.b--subtle:hover:not(:disabled) { background: rgba(36,36,36,0.04); }
.b--subtle.sel { background: #ebebeb; }
.b--subtle.sel:hover:not(:disabled) { background: #e0e0e0; }
.b--subtle:disabled { background: transparent; color: #929292; cursor: not-allowed; }
.b--subtle.sel:disabled { background: transparent; color: #929292; }

/* === Outline === */
.b--outline { background: transparent; color: #242424; border: 1px solid #dedede; }
.b--outline:hover:not(:disabled) { background: rgba(36,36,36,0.04); }
.b--outline.sel { background: #ebebeb; }
.b--outline.sel:hover:not(:disabled) { background: #e0e0e0; }
.b--outline:disabled { background: transparent; color: #929292; border-color: #dedede; cursor: not-allowed; }
.b--outline.sel:disabled { background: transparent; color: #929292; }

/* === Secondary === */
.b--secondary { background: #f5f5f5; color: #242424; border: none; }
.b--secondary:hover:not(:disabled) { background: #ebebeb; }
.b--secondary.sel { background: #242424; color: #fff; }
.b--secondary.sel:hover:not(:disabled) { background: #3b3b3b; }
.b--secondary:disabled { background: #f5f5f5; color: #929292; cursor: not-allowed; }
.b--secondary.sel:disabled { background: #242424; color: #929292; opacity: 0.4; cursor: not-allowed; }

/* === Primary === */
.b--primary { background: #242424; color: #fff; border: none; }
.b--primary:hover:not(:disabled) { background: #3b3b3b; }
.b--primary.sel { background: #242424; color: #fff; }
.b--primary.sel:hover:not(:disabled) { background: #3b3b3b; }
.b--primary:disabled { background: #242424; color: #fff; opacity: 0.4; cursor: not-allowed; }
.b--primary.sel:disabled { background: #242424; color: #fff; opacity: 0.4; cursor: not-allowed; }
`;

const body = [
  '<h1>Button \u2014 Complete Component Preview</h1>',
  '<p class="hint">Click to toggle Selected. Tab for focus ring. Hover for hover state.</p>',
  buildSection('Subtle', 'subtle'),
  buildSection('Outline', 'outline'),
  buildSection('Secondary', 'secondary'),
  buildSection('Primary', 'primary'),
  '<script>',
  '  document.querySelectorAll(".b:not(:disabled)").forEach(b => {',
  '    b.addEventListener("click", () => b.classList.toggle("sel"));',
  '  });',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Button Preview</title><style>' + css + '</style></head><body>' + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'button.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
