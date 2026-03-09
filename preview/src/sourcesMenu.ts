/**
 * Sources Menu — Interactive HTML Preview
 *
 * Shows the sources dropdown with toggle switches and connect buttons.
 * Reuses toggle primitive styling.
 */

import * as fs from 'fs';
import * as path from 'path';

// M365 icon (using apps icon as stand-in for product icons)
const appsIco20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 17.0009C3.7203 17.0009 3.07955 16.406 3.00687 15.6454L3 15.5009V4.50092C3 3.72122 3.59489 3.08047 4.35554 3.00778L4.5 3.00092H9C9.7797 3.00092 10.4204 3.5958 10.4931 4.35646L10.5 4.50092V4.75534L12.6886 2.48609C13.2276 1.92691 14.0959 1.8766 14.6956 2.34798L14.8118 2.44922L17.5694 5.17386C18.1219 5.71976 18.1614 6.5886 17.68 7.18505L17.5767 7.30053L15.266 9.50034L15.5 9.50092C16.2797 9.50092 16.9204 10.0958 16.9931 10.8565L17 11.0009V15.5009C17 16.2806 16.4051 16.9214 15.6445 16.994L15.5 17.0009H4.5ZM9.5 10.5009H4V15.5009C4 15.7157 4.13542 15.8988 4.32553 15.9696L4.41012 15.9929L4.5 16.0009H9.5V10.5009ZM15.5 10.5009H10.5V16.0009H15.5C15.7455 16.0009 15.9496 15.824 15.9919 15.5908L16 15.5009V11.0009C16 10.7555 15.8231 10.5513 15.5899 10.509L15.5 10.5009ZM10.5 7.71034V9.50034H12.29L10.5 7.71034ZM9 4.00092H4.5C4.25454 4.00092 4.05039 4.17779 4.00806 4.41104L4 4.50092V9.50092H9.5V4.50092C9.5 4.28614 9.36458 4.10299 9.17447 4.0322L9.08988 4.00897L9 4.00092ZM14.1222 3.17357C13.9396 2.99744 13.6692 2.98247 13.4768 3.12096L13.4086 3.18007L10.7926 5.89421C10.6271 6.06592 10.6086 6.32593 10.7356 6.51736L10.799 6.59475L13.4147 9.21046C13.5826 9.37838 13.8409 9.40226 14.0345 9.28022L14.1131 9.21898L16.8708 6.59231C17.0433 6.4177 17.061 6.14817 16.9248 5.95411L16.8665 5.88521L14.1222 3.17357Z" fill="currentColor"/></svg>';

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 900px; margin: 0 auto; }

/* ─── Sources container ─── */
.src { display: flex; flex-direction: column; width: 820px; max-width: 100%; padding: 0 56px; }

/* ─── Source item (default size) ─── */
.si { display: flex; align-items: center; width: 100%; height: 44px; padding: 4px 0; }
.si__inner { display: flex; flex: 1 0 0; align-items: center; gap: 8px; min-height: 1px; min-width: 1px; padding: 8px 12px; border-radius: 12px; background: rgba(36,36,36,0); transition: background 0.1s; cursor: default; }
.si__inner:hover { background: rgba(36,36,36,0.04); }
.si__icon { width: 20px; height: 20px; flex-shrink: 0; color: #242424; }
.si__icon svg { display: block; width: 20px; height: 20px; }
.si__label { flex: 1 0 0; min-width: 1px; min-height: 1px; font-size: 14px; font-weight: 400; line-height: 20px; color: #242424; }

/* ─── Toggle switch area ─── */
.si__toggle-area { display: flex; align-items: center; gap: 6px; padding: 2px; flex-shrink: 0; }
.si__toggle-label { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; }

/* ─── Toggle track+thumb (reused from toggle primitive) ─── */
.tgl-track { width: 32px; height: 16px; border-radius: 9999px; position: relative; cursor: pointer; transition: background 0.15s, border-color 0.15s; flex-shrink: 0; }
.tgl-thumb { width: 12px; height: 12px; border-radius: 9999px; position: absolute; top: 50%; transform: translateY(-50%); transition: left 0.15s, background 0.15s; }

/* Unchecked */
.tgl-track:not(.tgl-track--on) { background: #fff; border: 1px solid #dedede; }
.tgl-track:not(.tgl-track--on) .tgl-thumb { background: #6f6f6f; left: 2px; }
.tgl-track:not(.tgl-track--on):hover { background: #f5f5f5; }

/* Checked */
.tgl-track--on { background: #242424; border: 1px solid transparent; }
.tgl-track--on .tgl-thumb { background: #fff; left: 16px; }
.tgl-track--on:hover { background: #2b2b2b; }

/* ─── Connect button ─── */
.si__connect { display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 6px 10px; border-radius: 12px; border: none; background: transparent; color: #242424; font-family: inherit; font-size: 14px; font-weight: 400; line-height: 1.4; cursor: pointer; transition: background 0.1s; outline: none; white-space: nowrap; flex-shrink: 0; }
.si__connect:hover { background: rgba(36,36,36,0.04); }
.si__connect:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }
`;

function sourceItem(opts: { label: string; toggleOn?: boolean; toggleLabel?: string; connect?: boolean }): string {
  let action = '';
  if (opts.connect) {
    action = '<button class="si__connect">Connect</button>';
  } else {
    const trackCls = 'tgl-track' + (opts.toggleOn ? ' tgl-track--on' : '');
    action = '<div class="si__toggle-area">';
    if (opts.toggleLabel) action += '<span class="si__toggle-label">' + opts.toggleLabel + '</span>';
    action += '<div class="' + trackCls + '"><div class="tgl-thumb"></div></div>';
    action += '</div>';
  }
  return '<div class="si"><div class="si__inner">'
    + '<span class="si__icon">' + appsIco20 + '</span>'
    + '<span class="si__label">' + opts.label + '</span>'
    + action
    + '</div></div>';
}

const body = [
  '<div class="wrap">',
  '<h1>Sources Menu — Component Preview</h1>',
  '<p class="hint">Click toggles to switch on/off. Hover items for hover state.</p>',

  '<h2>Sources List</h2>',
  '<div class="src">',
  sourceItem({ label: 'Microsoft 365 apps', toggleOn: true, toggleLabel: 'Chats, Emails, Meetings' }),
  sourceItem({ label: 'Viva Sales', toggleOn: true }),
  sourceItem({ label: 'Adobe', toggleOn: false }),
  sourceItem({ label: 'Canva', connect: true }),
  sourceItem({ label: 'Azure DevOps', connect: true }),
  '</div>',

  '<h2>Individual States</h2>',
  '<div class="src">',
  sourceItem({ label: 'Enabled with label', toggleOn: true, toggleLabel: 'Files, Teams' }),
  sourceItem({ label: 'Enabled without label', toggleOn: true }),
  sourceItem({ label: 'Disabled', toggleOn: false }),
  sourceItem({ label: 'Not connected', connect: true }),
  '</div>',

  '</div>',

  '<script>',
  '  document.querySelectorAll(".tgl-track").forEach(function(el) {',
  '    el.addEventListener("click", function() {',
  '      el.classList.toggle("tgl-track--on");',
  '    });',
  '  });',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Sources Menu Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'sourcesMenu.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
