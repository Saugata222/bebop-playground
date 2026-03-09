/**
 * Tab & TabList — Interactive HTML Preview
 *
 * Shows all tab variants: Layout × State × Selected
 * Plus TabList examples (text-only and icon-only rows).
 * Click to select a tab. Tab key for focus ring.
 */

import * as fs from 'fs';
import * as path from 'path';

// Image icon (regular 20px)
const imgR20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4C4.89543 4 4 4.89543 4 6V14C4 14.3726 4.10191 14.7215 4.27937 15.0201L8.94868 10.432C9.53227 9.85859 10.4677 9.85859 11.0513 10.432L15.7206 15.0201C15.8981 14.7215 16 14.3726 16 14V6C16 4.89543 15.1046 4 14 4H6ZM6 16H14C14.3692 16 14.7149 15.9 15.0118 15.7256L10.3504 11.1453C10.1559 10.9542 9.84409 10.9542 9.64956 11.1453L4.98824 15.7256C5.28505 15.9 5.63085 16 6 16Z" fill="currentColor"/></svg>';
// Image icon (filled 20px)
const imgF20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3C4.34315 3 3 4.34315 3 6V14C3 14.6495 3.20642 15.2509 3.55724 15.7419L8.94759 10.4345C9.53144 9.85964 10.4686 9.85964 11.0524 10.4345L16.4428 15.7419C16.7936 15.2509 17 14.6495 17 14V6C17 4.34315 15.6569 3 14 3H6ZM6 17C5.35372 17 4.75517 16.7956 4.26544 16.448L9.6492 11.1471C9.84381 10.9555 10.1562 10.9555 10.3508 11.1471L15.7346 16.448C15.2448 16.7956 14.6463 17 14 17H6ZM12.5 8.75C11.8096 8.75 11.25 8.19036 11.25 7.5C11.25 6.80964 11.8096 6.25 12.5 6.25C13.1904 6.25 13.75 6.80964 13.75 7.5C13.75 8.19036 13.1904 8.75 12.5 8.75Z" fill="currentColor"/></svg>';
// Grid icon (regular 20px)
const gridR20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4C4.89543 4 4 4.89543 4 6V9H9V4H6ZM10 4V9H16V6C16 4.89543 15.1046 4 14 4H10ZM16 10H10V16H14C15.1046 16 16 15.1046 16 14V10ZM9 16V10H4V14C4 15.1046 4.89543 16 6 16H9Z" fill="currentColor"/></svg>';
// Grid icon (filled 20px)
const gridF20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3C4.34315 3 3 4.34315 3 6V9.5H9.5V3H6ZM10.5 3V9.5H17V6C17 4.34315 15.6569 3 14 3H10.5ZM17 10.5H10.5V17H14C15.6569 17 17 15.6569 17 14V10.5ZM9.5 17V10.5H3V14C3 15.6569 4.34315 17 6 17H9.5Z" fill="currentColor"/></svg>';
// List icon (regular 20px)
const listR20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5.25C2.5 4.83579 2.83579 4.5 3.25 4.5H16.75C17.1642 4.5 17.5 4.83579 17.5 5.25C17.5 5.66421 17.1642 6 16.75 6H3.25C2.83579 6 2.5 5.66421 2.5 5.25ZM2.5 10C2.5 9.58579 2.83579 9.25 3.25 9.25H16.75C17.1642 9.25 17.5 9.58579 17.5 10C17.5 10.4142 17.1642 10.75 16.75 10.75H3.25C2.83579 10.75 2.5 10.4142 2.5 10ZM3.25 14C2.83579 14 2.5 14.3358 2.5 14.75C2.5 15.1642 2.83579 15.5 3.25 15.5H16.75C17.1642 15.5 17.5 15.1642 17.5 14.75C17.5 14.3358 17.1642 14 16.75 14H3.25Z" fill="currentColor"/></svg>';
// List icon (filled 20px)
const listF20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5.25C2.5 4.83579 2.83579 4.5 3.25 4.5H16.75C17.1642 4.5 17.5 4.83579 17.5 5.25C17.5 5.66421 17.1642 6 16.75 6H3.25C2.83579 6 2.5 5.66421 2.5 5.25ZM2.5 10C2.5 9.58579 2.83579 9.25 3.25 9.25H16.75C17.1642 9.25 17.5 9.58579 17.5 10C17.5 10.4142 17.1642 10.75 16.75 10.75H3.25C2.83579 10.75 2.5 10.4142 2.5 10ZM3.25 14C2.83579 14 2.5 14.3358 2.5 14.75C2.5 15.1642 2.83579 15.5 3.25 15.5H16.75C17.1642 15.5 17.5 15.1642 17.5 14.75C17.5 14.3358 17.1642 14 16.75 14H3.25Z" fill="currentColor"/></svg>';

function icoSlot(): string {
  return '<span class="tab__ico-r">' + imgR20 + '</span><span class="tab__ico-f">' + imgF20 + '</span>';
}

// ─── Tab builder helpers ────────────────────────────────────

function textTab(extra: string, label: string, disabled = false): string {
  return '<button class="tab tab--text' + extra + '"'
    + (disabled ? ' disabled' : '')
    + '><span class="tab__label">' + label + '</span></button>';
}

function iconTextTab(extra: string, label: string, disabled = false): string {
  return '<button class="tab tab--text' + extra + '"'
    + (disabled ? ' disabled' : '')
    + '>' + icoSlot() + '<span class="tab__label">' + label + '</span></button>';
}

function iconOnlyTab(icoR: string, icoF: string, extra: string, disabled = false): string {
  return '<button class="tab tab--ico' + extra + '"'
    + (disabled ? ' disabled' : '')
    + '><span class="tab__ico-r">' + icoR + '</span><span class="tab__ico-f">' + icoF + '</span></button>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
h3 { font-size: 14px; font-weight: 600; margin: 20px 0 12px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 900px; margin: 0 auto; }
.row { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 8px; align-items: flex-start; }
.cell { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; }

/* ─── Tablist container ─── */
.tablist { display: flex; gap: 4px; align-items: flex-start; }

/* ─── Base Tab ─── */
.tab {
  display: inline-flex; align-items: center; justify-content: center;
  position: relative; cursor: pointer; border: none;
  font-family: 'Segoe UI', 'Segoe Sans', sans-serif;
  font-size: 14px; font-weight: 400; line-height: 1.4;
  letter-spacing: 0; white-space: nowrap;
  transition: background 0.1s;
  outline: none;
  color: #242424;
  background: rgba(36,36,36,0);
}
.tab svg { display: block; flex-shrink: 0; width: 20px; height: 20px; }

/* Icon variant toggling */
.tab .tab__ico-r { display: inline-flex; }
.tab .tab__ico-f { display: none; }
.tab.sel .tab__ico-r { display: none; }
.tab.sel .tab__ico-f { display: inline-flex; }

/* ─── Text layout (Icon+Label or Text-only) ─── */
.tab--text {
  min-height: 32px; min-width: 32px;
  padding: 6px 10px; gap: 4px;
  border-radius: 12px;
}

/* ─── Icon-only layout ─── */
.tab--ico {
  padding: 6px;
  border-radius: 9999px;
}

/* ─── Unselected states ─── */
.tab:hover:not(:disabled):not(.sel) { background: rgba(36,36,36,0.04); color: #1d1d1d; }

/* ─── Selected states ─── */
.tab.sel { background: #242424; color: #fff; font-weight: 600; }
.tab.sel:hover:not(:disabled) { background: #2b2b2b; color: #fff; }

/* ─── Disabled ─── */
.tab:disabled { color: #929292; cursor: not-allowed; background: rgba(36,36,36,0); }
.tab.sel:disabled { background: #ebebeb; color: #929292; }

/* ─── Focus ring ─── */
.tab:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }
`;

// ─── Sections ───────────────────────────────────────────────

const body = [
  '<div class="wrap">',
  '<h1>Tab &amp; TabList — Component Preview</h1>',
  '<p class="hint">Click tabs to toggle selection. Use Tab key for focus ring. Hover for hover state.</p>',

  // ─── TabList: Text only ───
  '<h2>TabList — Text Only</h2>',
  '<div class="tablist" data-tablist>',
  textTab(' sel', 'All'),
  textTab('', 'Files'),
  textTab('', 'People'),
  textTab('', 'Chats'),
  textTab('', 'Emails'),
  '</div>',

  // ─── TabList: Icon + Text ───
  '<h2>TabList — Icon + Text</h2>',
  '<div class="tablist" data-tablist>',
  iconTextTab(' sel', 'All'),
  iconTextTab('', 'Files'),
  iconTextTab('', 'People'),
  iconTextTab('', 'Chats'),
  '</div>',

  // ─── TabList: Icon only ───
  '<h2>TabList — Icon Only</h2>',
  '<div class="tablist" data-tablist>',
  iconOnlyTab(imgR20, imgF20, ' sel'),
  iconOnlyTab(gridR20, gridF20, ''),
  iconOnlyTab(listR20, listF20, ''),
  '</div>',

  // ─── Tab States: Unselected ───
  '<h2>Tab States — Text (Icon + Label)</h2>',
  '<h3>Unselected</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>' + textTab('', 'Tab') + '</div>',
  '<div class="cell"><span class="rl">Hover</span><span class="hover-demo">' + textTab('', 'Tab') + '</span></div>',
  '<div class="cell"><span class="rl">Disabled</span>' + textTab('', 'Tab', true) + '</div>',
  '<div class="cell"><span class="rl">Focused</span><span class="focus-demo">' + textTab('', 'Tab') + '</span></div>',
  '</div>',

  '<h3>Selected</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>' + textTab(' sel', 'Tab') + '</div>',
  '<div class="cell"><span class="rl">Hover</span><span class="hover-demo">' + textTab(' sel', 'Tab') + '</span></div>',
  '<div class="cell"><span class="rl">Disabled+Sel</span>' + textTab(' sel', 'Tab', true) + '</div>',
  '<div class="cell"><span class="rl">Focused</span><span class="focus-demo">' + textTab(' sel', 'Tab') + '</span></div>',
  '</div>',

  // ─── Tab States: Icon Only ───
  '<h2>Tab States — Icon Only</h2>',
  '<h3>Unselected</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>' + iconOnlyTab(imgR20, imgF20, '') + '</div>',
  '<div class="cell"><span class="rl">Hover</span><span class="hover-demo">' + iconOnlyTab(imgR20, imgF20, '') + '</span></div>',
  '<div class="cell"><span class="rl">Disabled</span>' + iconOnlyTab(imgR20, imgF20, '', true) + '</div>',
  '</div>',

  '<h3>Selected</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>' + iconOnlyTab(imgR20, imgF20, ' sel') + '</div>',
  '<div class="cell"><span class="rl">Hover</span><span class="hover-demo">' + iconOnlyTab(imgR20, imgF20, ' sel') + '</span></div>',
  '<div class="cell"><span class="rl">Disabled+Sel</span>' + iconOnlyTab(imgR20, imgF20, ' sel', true) + '</div>',
  '</div>',

  // ─── Tab States: Icon + Text ───
  '<h2>Tab States — Icon + Text</h2>',
  '<h3>Unselected</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>' + iconTextTab('', 'Tab') + '</div>',
  '<div class="cell"><span class="rl">Selected</span>' + iconTextTab(' sel', 'Tab') + '</div>',
  '<div class="cell"><span class="rl">Disabled</span>' + iconTextTab('', 'Tab', true) + '</div>',
  '</div>',

  '</div>',

  // ─── Script ───
  '<script>',
  '  // TabList behavior: single-select within each tablist',
  '  document.querySelectorAll("[data-tablist]").forEach(tl => {',
  '    tl.querySelectorAll(".tab").forEach(t => {',
  '      t.addEventListener("click", () => {',
  '        if (t.disabled) return;',
  '        tl.querySelectorAll(".tab").forEach(s => s.classList.remove("sel"));',
  '        t.classList.add("sel");',
  '      });',
  '    });',
  '  });',
  '  // Standalone tabs: toggle',
  '  document.querySelectorAll(".tab:not([data-tablist] .tab)").forEach(t => {',
  '    t.addEventListener("click", () => {',
  '      if (t.disabled) return;',
  '      t.classList.toggle("sel");',
  '    });',
  '  });',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Tab &amp; TabList Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'tab.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
