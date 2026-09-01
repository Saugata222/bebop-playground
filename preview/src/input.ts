/**
 * Input — Interactive Preview
 *
 * One Copilot primitive. Outline + Underline shapes × Small/Medium/Large ×
 * Rest / Hover / Pressed / Focus / Error / Disabled / Filled. Includes live inputs.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage, segControl } from './_scaffold';

// ─── State matrix ───────────────────────────────────────────

const STATES = ['rest', 'hover', 'pressed', 'focus', 'error', 'disabled', 'filled'] as const;
const STATE_LABEL: Record<string, string> = {
  rest: 'Rest', hover: 'Hover', pressed: 'Pressed', focus: 'Focus',
  error: 'Error', disabled: 'Disabled', filled: 'Filled',
};

function cell(shape: string, size: string, state: string): string {
  const text = state === 'disabled' || state === 'filled'
    ? '<span class="inp__text">Placeholder</span>'
    : '<span class="inp__ph">Placeholder</span>';
  const cls = ['inp', 'inp--' + shape, 'inp--' + size, 'is-' + state].join(' ');
  return '<div class="' + cls + '"><div class="inp__stack">' + text + '</div></div>';
}

function matrix(shape: string): string {
  let out = '';
  // header row of state labels
  out += '<div class="grid">';
  out += '<div class="grid__corner"></div>';
  for (const s of STATES) out += '<div class="grid__col">' + STATE_LABEL[s] + '</div>';
  for (const size of ['small', 'medium', 'large']) {
    out += '<div class="grid__row">' + size.charAt(0).toUpperCase() + size.slice(1) + '</div>';
    for (const s of STATES) out += '<div class="grid__cell">' + cell(shape, size, s) + '</div>';
  }
  out += '</div>';
  return out;
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 36px 0 16px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 1120px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }

/* ─── Matrix grid ─── */
.grid { display: grid; grid-template-columns: 64px repeat(7, 1fr); gap: 10px 12px; align-items: center; background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; overflow-x: auto; }
.grid__corner { }
.grid__col { font-size: 10px; font-weight: 600; color: #929292; text-transform: uppercase; letter-spacing: 0.6px; }
.grid__row { font-size: 11px; font-weight: 600; color: #5d5d5d; }
.grid__cell { }

/* ─── Input base ─── */
.inp {
  display: inline-flex; align-items: center; width: 100%;
  background: transparent; border-color: #6f6f6f; border-style: solid;
  font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-weight: 420;
  overflow: hidden;
}
.inp__stack { display: flex; align-items: center; flex: 1 0 0; min-width: 0; }
.inp__ph { color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.inp__text { color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* Shape: outline (border all sides) */
.inp--outline { border-width: 1px; }
/* Shape: underline (bottom only) */
.inp--underline { border-width: 0 0 1px 0; border-radius: 0 !important; }

/* Sizes — radius (outline), padding, gap, type */
.inp--small  { border-radius: 8px;  padding: 4px 6px;  font-size: 12px; line-height: 16px; font-variation-settings: 'opsz' 8, 'wght' 420; }
.inp--medium { border-radius: 12px; padding: 6px 10px; font-size: 14px; line-height: 20px; font-variation-settings: 'opsz' 8, 'wght' 420; }
.inp--large  { border-radius: 16px; padding: 8px 12px; font-size: 16px; line-height: 22px; font-variation-settings: 'wght' 420; }
.inp--small .inp__stack  { gap: 6px; }
.inp--medium .inp__stack { gap: 10px; }
.inp--large .inp__stack  { gap: 12px; }

/* States — border + text */
.is-rest     { border-color: #6f6f6f; }
.is-hover    { border-color: #787878; }
.is-pressed  { border-color: #818181; }
.is-focus    { border-color: #242424; }
.is-error    { border-color: #c02e56; }
.is-disabled { border-color: rgba(37,37,37,0.5); }
.is-disabled .inp__text { color: rgba(0,0,0,0.43); }
.is-filled   { border-color: rgba(37,37,37,0.5); }

/* ─── Live inputs ─── */
.live-row { display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 8px; }
.live { display: flex; flex-direction: column; gap: 6px; }
.live label { font-size: 11px; font-weight: 600; color: #5d5d5d; }
.live input {
  width: 220px; background: transparent; border: 1px solid #6f6f6f; border-radius: 12px;
  padding: 6px 10px; font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 14px;
  line-height: 20px; color: #242424; outline: none;
  font-variation-settings: 'opsz' 8, 'wght' 420;
}
.live input::placeholder { color: #6f6f6f; }
.live input:hover { border-color: #787878; }
.live input:focus { border-color: #242424; }
.live input.underline { border: 0; border-bottom: 1px solid #6f6f6f; border-radius: 0; padding-left: 2px; }
.live input.underline:focus { border-bottom-color: #242424; }
.live input.error { border-color: #c02e56; }
.live input:disabled { border-color: rgba(37,37,37,0.5); color: rgba(0,0,0,0.43); cursor: not-allowed; }

/* ─── Usage docs ─── */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
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

const heroInput = '<div class="live" style="width:280px"><input id="heroInput" type="text" placeholder="Search\u2026" style="width:280px"></div>';
const heroControls =
  segControl('Shape', 'shape', [
    { value: 'outline', label: 'Outline', active: true },
    { value: 'underline', label: 'Underline' },
  ]) +
  segControl('State', 'state', [
    { value: 'rest', label: 'Rest', active: true },
    { value: 'error', label: 'Error' },
    { value: 'disabled', label: 'Disabled' },
  ]);

const body = [
  stage(heroInput, heroControls),
  '<h2>Try it</h2>',
  '<div class="live-row">',
  '<div class="live"><label>Outline</label><input type="text" placeholder="Placeholder" /></div>',
  '<div class="live"><label>Underline</label><input class="underline" type="text" placeholder="Placeholder" /></div>',
  '<div class="live"><label>Error</label><input class="error" type="text" placeholder="Placeholder" /></div>',
  '<div class="live"><label>Disabled</label><input type="text" placeholder="Placeholder" disabled /></div>',
  '</div>',

  '<h2>Outline</h2>',
  '<span class="rl">Border on all sides \u00b7 rounded 8 / 12 / 16</span>',
  matrix('outline'),

  '<h2>Underline</h2>',
  '<span class="rl">Bottom border only \u00b7 no radius</span>',
  matrix('underline'),

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> Collect a single line of free-form text \u2014 names, search terms, values in a form. Use Outline when the field needs a clear boundary (forms, dialogs); use Underline for dense, low-chrome contexts (inline edits, table cells).</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Keep placeholder text as a hint, not the label.</li>',
  '<li>Match input size to surrounding density (Small in toolbars, Large on touch).</li>',
  '<li>Show the Error border with an adjacent message explaining the problem.</li>',
  '<li>Switch text to primary (#242424) once a value is entered.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Rely on placeholder alone to convey the field\u2019s purpose.</li>',
  '<li>Mix Outline and Underline inputs within one form.</li>',
  '<li>Use Error red as the only error signal (add text/icon).</li>',
  '<li>Disable a field without making the reason clear elsewhere.</li>',
  '</ul></div>',
  '</div>',

  '<script>(function(){var input=document.getElementById(\'heroInput\');var st={shape:\'outline\',state:\'rest\'};function paint(){var cls=[];if(st.shape===\'underline\')cls.push(\'underline\');if(st.state===\'error\')cls.push(\'error\');input.className=cls.join(\' \');input.disabled=st.state===\'disabled\';}document.querySelectorAll(\'[data-ctrl]\').forEach(function(btn){btn.addEventListener(\'click\',function(){var name=btn.getAttribute(\'data-ctrl\');st[name]=btn.getAttribute(\'data-value\');var seg=btn.parentNode;seg.querySelectorAll(\'button\').forEach(function(b){b.classList.toggle(\'is-active\',b===btn);});paint();});});paint();})();</script>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Input Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Input \u2014 Component Preview</h1>'
  + '<p class="hint">Single-line text field. Outline and Underline shapes, three sizes, seven states.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'input.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
