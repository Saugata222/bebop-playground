/**
 * Toggle (Switch) — Interactive HTML Preview
 *
 * Shows the toggle switch in all states:
 * Checked/Unchecked × Rest/Hover/Disabled, with and without labels.
 * Click to toggle checked state.
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
h3 { font-size: 14px; font-weight: 600; margin: 20px 0 12px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 800px; margin: 0 auto; }
.row { display: flex; gap: 32px; flex-wrap: wrap; margin-bottom: 16px; align-items: center; }
.cell { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; }

/* ─── Toggle container ─── */
.tgl {
  display: inline-flex; align-items: center; gap: 6px; padding: 4px;
  cursor: pointer; user-select: none; outline: none;
  border: none; background: none; font-family: inherit;
}
.tgl:focus-visible .tgl__track { outline: 2px solid #000; outline-offset: 1px; box-shadow: 0 0 0 3px #fff; }

/* ─── Label ─── */
.tgl__label { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; }

/* ─── Track ─── */
.tgl__track {
  width: 32px; height: 16px; border-radius: 9999px; position: relative;
  transition: background 0.15s, border-color 0.15s;
  flex-shrink: 0;
}

/* ─── Thumb ─── */
.tgl__thumb {
  width: 12px; height: 12px; border-radius: 9999px; position: absolute;
  top: 50%; transform: translateY(-50%);
  transition: left 0.15s, background 0.15s;
}

/* ─── Unchecked (off) ─── */
.tgl:not(.tgl--on) .tgl__track { background: #ffffff; border: 1px solid #dedede; }
.tgl:not(.tgl--on) .tgl__thumb { background: #6f6f6f; left: 2px; }
.tgl:not(.tgl--on):hover .tgl__track { background: #f5f5f5; }

/* ─── Checked (on) ─── */
.tgl--on .tgl__track { background: #242424; border: 1px solid transparent; }
.tgl--on .tgl__thumb { background: #ffffff; left: 16px; }
.tgl--on:hover .tgl__track { background: #2b2b2b; }

/* ─── Disabled ─── */
.tgl--dis { cursor: not-allowed; pointer-events: none; opacity: 1; }
.tgl--dis .tgl__label { color: #929292; }
.tgl--dis:not(.tgl--on) .tgl__track { background: #ffffff; border-color: #dedede; }
.tgl--dis:not(.tgl--on) .tgl__thumb { background: #929292; }
.tgl--dis.tgl--on .tgl__track { background: #ebebeb; border-color: transparent; }
.tgl--dis.tgl--on .tgl__thumb { background: #929292; }
`;

// ─── HTML builder ───────────────────────────────────────────

function toggleSwitch(opts: { label?: string; checked?: boolean; disabled?: boolean }): string {
  const cls = ['tgl'];
  if (opts.checked) cls.push('tgl--on');
  if (opts.disabled) cls.push('tgl--dis');
  let inner = '';
  if (opts.label) inner += '<span class="tgl__label">' + opts.label + '</span>';
  inner += '<span class="tgl__track"><span class="tgl__thumb"></span></span>';
  return '<button class="' + cls.join(' ') + '"' + (opts.disabled ? ' disabled' : '') + ' role="switch" aria-checked="' + (opts.checked ? 'true' : 'false') + '">' + inner + '</button>';
}

// ─── Sections ───────────────────────────────────────────────

const body = [
  '<div class="wrap">',
  '<h1>Toggle (Switch) — Component Preview</h1>',
  '<p class="hint">Click to toggle on/off. Hover for hover state.</p>',

  '<h2>With Label</h2>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Checked</span>' + toggleSwitch({ label: 'Chats, Emails, Meetings', checked: true }) + '</div>',
  '<div class="cell"><span class="rl">Unchecked</span>' + toggleSwitch({ label: 'Chats, Emails, Meetings', checked: false }) + '</div>',
  '</div>',

  '<h2>Without Label</h2>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Checked</span>' + toggleSwitch({ checked: true }) + '</div>',
  '<div class="cell"><span class="rl">Unchecked</span>' + toggleSwitch({ checked: false }) + '</div>',
  '</div>',

  '<h2>Disabled</h2>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Checked + Disabled</span>' + toggleSwitch({ label: 'Disabled on', checked: true, disabled: true }) + '</div>',
  '<div class="cell"><span class="rl">Unchecked + Disabled</span>' + toggleSwitch({ label: 'Disabled off', checked: false, disabled: true }) + '</div>',
  '</div>',

  '<h2>Interactive Group</h2>',
  '<div class="row" style="flex-direction:column;gap:12px;align-items:flex-start">',
  toggleSwitch({ label: 'Enable notifications', checked: true }),
  toggleSwitch({ label: 'Dark mode', checked: false }),
  toggleSwitch({ label: 'Auto-save drafts', checked: true }),
  toggleSwitch({ label: 'Sound effects', checked: false }),
  '</div>',

  '</div>',

  '<script>',
  '  document.querySelectorAll(".tgl:not(.tgl--dis)").forEach(function(el) {',
  '    el.addEventListener("click", function() {',
  '      el.classList.toggle("tgl--on");',
  '      el.setAttribute("aria-checked", el.classList.contains("tgl--on") ? "true" : "false");',
  '    });',
  '  });',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Toggle Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'toggle.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
