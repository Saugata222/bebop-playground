/**
 * Popover — Interactive Preview
 *
 * One Copilot primitive. Floating white surface (radius 16, Shadow/Low) with a
 * directional beak. Positions: Above / Below / Left / Right. Includes a live toggle.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage, segControl } from './_scaffold';

const SHADOW = '0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.03), 0 4px 6px rgba(0,0,0,0.08)';

function content(): string {
  return '<div class="pop__content">'
    + '<div class="pop__title">Popover title</div>'
    + '<div class="pop__body">Anchored surface that points back at its trigger. Holds any content.</div>'
    + '</div>';
}

function pop(position: string): string {
  return '<div class="pop pop--' + position + '"><span class="pop__beak"></span><div class="pop__surface">' + content() + '</div></div>';
}

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 36px 0 16px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 820px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; text-align: center; }

/* Layout for the four position demos */
.grid4 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px 48px; background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 48px 40px; }
.demo { display: flex; flex-direction: column; align-items: center; gap: 14px; }

/* ─── Popover ─── */
/* Surface + beak render as ONE silhouette: no per-element shadow/border; the
   Shadow/Low is applied once as chained drop-shadows on the container, so it
   follows the combined outline of the rounded rect + beak (single surface). */
.pop { position: relative; width: 232px; filter: drop-shadow(0 0 1px rgba(0,0,0,0.08)) drop-shadow(0 2px 4px rgba(0,0,0,0.03)) drop-shadow(0 4px 6px rgba(0,0,0,0.08)); }
.pop__surface {
  position: relative; z-index: 1; background: #fff; border-radius: 16px; padding: 16px;
}
.pop__content { display: flex; flex-direction: column; gap: 6px; }
.pop__title { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; color: #242424; }
.pop__body { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 12px; line-height: 16px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; color: #5d5d5d; }

/* Beak — rotated square in white, half tucked behind the surface. No own shadow
   or border; the container's drop-shadow outlines the union. Visible triangle is
   12×6 (Above/Below) / 6×12 (Left/Right). The 1px overlap hides the seam. */
.pop__beak {
  position: absolute; z-index: 0; width: 8.485px; height: 8.485px; background: #fff;
  transform: rotate(45deg);
}
.pop--above .pop__beak { left: 50%; top: 100%; margin: -5.243px 0 0 -4.243px; }
.pop--below .pop__beak { left: 50%; top: 0;    margin: -3.243px 0 0 -4.243px; }
.pop--left  .pop__beak { top: 50%; left: 100%; margin: -4.243px 0 0 -5.243px; }
.pop--right .pop__beak { top: 50%; left: 0;    margin: -4.243px 0 0 -3.243px; }

/* ─── Live demo ─── */
.live { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 48px; display: flex; justify-content: center; }
.anchor-wrap { position: relative; display: inline-block; }
.trigger {
  height: 32px; padding: 6px 12px; border: none; border-radius: 8px; background: #242424; color: #fff;
  font-family: 'Segoe UI', sans-serif; font-size: 14px; cursor: pointer;
}
.live-pop {
  position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%);
  opacity: 0; visibility: hidden; transition: opacity 0.12s ease; z-index: 10;
}
.anchor-wrap.is-open .live-pop { opacity: 1; visibility: visible; }

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

const body = [
  stage('<div id="heroPop">' + pop('below') + '</div>',
    segControl('Position', 'position', [
      { value: 'above', label: 'Above' },
      { value: 'below', label: 'Below', active: true },
      { value: 'left', label: 'Left' },
      { value: 'right', label: 'Right' },
    ])),
  '<h2>Positions</h2>',
  '<div class="grid4">',
  '<div class="demo"><span class="rl">Above</span>' + pop('above') + '</div>',
  '<div class="demo"><span class="rl">Below</span>' + pop('below') + '</div>',
  '<div class="demo"><span class="rl">Left</span>' + pop('left') + '</div>',
  '<div class="demo"><span class="rl">Right</span>' + pop('right') + '</div>',
  '</div>',

  '<h2>Try it</h2>',
  '<div class="live"><div class="anchor-wrap" id="anchor">'
  + '<button class="trigger" id="trigger" type="button">Toggle popover</button>'
  + '<div class="live-pop">' + pop('below') + '</div>'
  + '</div></div>',

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> Surface secondary content next to a trigger without leaving the page \u2014 hints, quick actions, small forms, or detail on demand. The beak ties the surface to its anchor; place it on the side with the most room.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Point the beak at the element that opened the popover.</li>',
  '<li>Flip position (Above/Below/Left/Right) to stay within the viewport.</li>',
  '<li>Dismiss on outside click or Esc.</li>',
  '<li>Keep content compact \u2014 it is a companion, not a page.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Use it for critical, blocking decisions \u2014 use a Dialog.</li>',
  '<li>Nest popovers or stack multiple open at once.</li>',
  '<li>Detach the beak from the trigger.</li>',
  '<li>Overflow the viewport instead of repositioning.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

let js = '';
js += '<script>';
js += '\n';
js += 'var a = document.getElementById(\'anchor\');';
js += '\n';
js += 'var t = document.getElementById(\'trigger\');';
js += '\n';
js += 't.addEventListener(\'click\', function (e) { e.stopPropagation(); a.classList.toggle(\'is-open\'); });';
js += '\n';
js += 'document.addEventListener(\'click\', function () { a.classList.remove(\'is-open\'); });';
js += '\n';
js += 'document.addEventListener(\'keydown\', function (e) { if (e.key === \'Escape\') a.classList.remove(\'is-open\'); });';
js += '\n';
js += 'document.querySelectorAll(\'[data-ctrl]\').forEach(function(btn){ btn.addEventListener(\'click\', function(){ var p=document.querySelector(\'#heroPop .pop\'); if(p) p.className=\'pop pop--\'+btn.getAttribute(\'data-value\'); var seg=btn.parentNode; seg.querySelectorAll(\'button\').forEach(function(b){ b.classList.toggle(\'is-active\', b===btn); }); }); });';
js += '\n';
js += '</script>';

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Popover Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Popover \u2014 Component Preview</h1>'
  + '<p class="hint">Floating anchored surface with a directional beak. Four positions, Shadow/Low elevation.</p>'
  + body + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'popover.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
