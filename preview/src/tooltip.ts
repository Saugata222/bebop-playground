/**
 * Tooltip — Interactive Preview
 *
 * One Copilot primitive (Tooltip node 1413:28897, usage 1506:1467). A read-only
 * floating label that supplements an already-affordable control. Renders the bare
 * surface, the four placements (Above / Below / Left / Right) around icon-only
 * triggers, a live hover/focus demo (aria-describedby + Esc to dismiss), and the
 * full usage guidance.
 *
 * Icons: exact Fluent System assets from src/components/icons.
 * Font: Segoe Sans (functional body-small).
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage, segControl } from './_scaffold';

// ─── Icons — exact Fluent System assets ─────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
const info20 = readIcon('info-20-regular.svg');
const settings20 = readIcon('settings-20-regular.svg');
const share20 = readIcon('share-20-regular.svg');
const copy20 = readIcon('copy-20-regular.svg');

// ─── Markup builders ────────────────────────────────────────

/** Bare tooltip surface. */
function tip(text: string, placement?: string): string {
  const cls = ['tt'];
  if (placement) cls.push('tt--' + placement);
  return '<span class="' + cls.join(' ') + '" role="tooltip">' + text + '</span>';
}

/** Icon-only trigger with a statically-shown tooltip in the given placement. */
function anchored(icon: string, label: string, placement: string): string {
  return '<div class="anchor">'
    + '<button class="trigger" type="button" aria-label="' + label + '">' + icon + '</button>'
    + tip(label, placement)
    + '</div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 760px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }
.cell { display: flex; flex-direction: column; }

/* Placement demo grid — generous room so surfaces never clip */
.grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; background: #fff; border: 1px solid #ebebeb; border-radius: 16px; padding: 56px 24px; }
.grid4 .cell { align-items: center; gap: 44px; }
.row { display: flex; gap: 40px; flex-wrap: wrap; align-items: center; margin-bottom: 16px; }

/* ─── Tooltip surface ─── */
.tt {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 4px 8px; border-radius: 8px; background: #fff;
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.08), 0px 2px 4px 0px rgba(0,0,0,0.03), 0px 4px 6px 0px rgba(0,0,0,0.08);
  font-size: 12px; line-height: 16px; letter-spacing: 0; color: #242424;
  font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420;
  white-space: nowrap; max-width: 240px; pointer-events: none;
}
.tt--wrap { white-space: normal; text-align: center; }

/* ─── Anchor + trigger ─── */
.anchor { position: relative; display: inline-flex; }
.trigger {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 9999px; border: none;
  background: transparent; color: #242424; cursor: pointer; transition: background 0.1s;
}
.trigger:hover { background: rgba(36,36,36,0.04); }
.trigger:focus-visible { outline: 2px solid #242424; outline-offset: 1px; }
.trigger svg { width: 20px; height: 20px; }

/* Static placements around the trigger (8px offset) */
.tt--above, .tt--below, .tt--left, .tt--right { position: absolute; }
.tt--above { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.tt--below { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
.tt--left { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
.tt--right { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }

/* ─── Live demo ─── */
.live-stage { display: flex; gap: 40px; align-items: center; background: #fff; border: 1px solid #ebebeb; border-radius: 16px; padding: 48px 32px; }
.live-tt { position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%) translateY(2px); opacity: 0; transition: opacity 0.1s ease, transform 0.1s ease; }
.anchor--live.is-open .live-tt { opacity: 1; transform: translateX(-50%) translateY(0); }
@media (prefers-reduced-motion: reduce) { .live-tt { transition: none; } }

/* ─── Usage docs ─── */
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
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
.a11y { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-top: 12px; }
.a11y h3 { font-size: 12px; font-weight: 600; margin-bottom: 8px; }
.a11y ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.a11y li { font-size: 12px; line-height: 1.5; color: #5d5d5d; padding-left: 16px; position: relative; }
.a11y li::before { content: ''; position: absolute; left: 2px; top: 6px; width: 5px; height: 5px; border-radius: 50%; background: #6f6f6f; }
.a11y b { color: #242424; font-weight: 600; }
`;

// ─── Body markup ────────────────────────────────────────────

const heroTip =
  '<div class="anchor" id="heroTipAnchor" style="margin:20px 0">' +
  '<button class="trigger" type="button" aria-label="Info">' + info20 + '</button>' +
  '<span class="tt tt--above" id="heroTip" role="tooltip">Tooltip</span></div>';
const heroControls = segControl('Placement', 'placement', [
  { value: 'above', label: 'Above', active: true },
  { value: 'below', label: 'Below' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
]);

const body = [
  stage(heroTip, heroControls),
  '<h2>Surface</h2>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Label</span>' + tip('Capabilities') + '</div>',
  '<div class="cell"><span class="rl">Shortcut hint</span>' + tip('Send \u00b7 \u2318\u21B5') + '</div>',
  '<div class="cell"><span class="rl">Wrapping (long)</span><span class="tt tt--wrap">Copies a shareable link to this conversation</span></div>',
  '</div>',

  '<h2>Placement</h2>',
  '<p class="hint" style="text-align:left;margin:0 0 12px;">Prefer <strong>Above</strong> by default; use another side only when layout forces it.</p>',
  '<div class="grid4">',
  '<div class="cell"><span class="rl">Above</span>' + anchored(info20, 'Above', 'above') + '</div>',
  '<div class="cell"><span class="rl">Below</span>' + anchored(settings20, 'Below', 'below') + '</div>',
  '<div class="cell"><span class="rl">Left</span>' + anchored(share20, 'Left', 'left') + '</div>',
  '<div class="cell"><span class="rl">Right</span>' + anchored(copy20, 'Right', 'right') + '</div>',
  '</div>',

  '<h2>Interactive</h2>',
  '<div class="live-stage">',
  '<div class="anchor anchor--live" id="live">',
  '<button class="trigger" type="button" id="liveTrigger" aria-label="Copy link" aria-describedby="liveTip">' + copy20 + '</button>',
  '<span class="tt live-tt" role="tooltip" id="liveTip">Copy link</span>',
  '</div>',
  '<span class="hint" style="margin:0;">Hover or focus the button \u2014 press <strong>Esc</strong> to dismiss while keeping focus.</span>',
  '</div>',

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> A tooltip is a read-only label that supplements an already-affordable control \u2014 clarify an icon-only button, surface the full text of a truncated string, or hint at a keyboard shortcut. Keep it short (a few words to one sentence) and non-critical: people on touch devices and keyboard-only users may never see it.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Attach it to a focusable trigger and associate it with aria-describedby.</li>',
  '<li>Default to the Above placement; flip sides only to avoid clipping.</li>',
  '<li>Keep copy to a short phrase or a single sentence.</li>',
  '<li>Wire up Escape to dismiss while leaving focus on the trigger (WCAG 1.4.13).</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Put required information inside a tooltip \u2014 use a visible label or inline message.</li>',
  '<li>Place links, buttons, or any focusable content in it \u2014 reach for a popover.</li>',
  '<li>Use it for errors, confirmations, or anything that prompts a decision \u2014 use a callout or dialog.</li>',
  '<li>Attach it to a non-interactive element that keyboard users can\'t reach.</li>',
  '</ul></div>',
  '</div>',
  '<div class="a11y"><h3>Accessibility</h3><ul>',
  '<li><b>Escape to dismiss.</b> Always wire up an Escape handler that hides the tooltip while leaving focus on the trigger.</li>',
  '<li><b>Associate the tooltip with its trigger.</b> Set aria-describedby on the trigger pointing at the tooltip\'s id, or screen reader users receive no content.</li>',
  '<li><b>Honor reduced motion.</b> When prefers-reduced-motion: reduce is set, show and hide instantly \u2014 no fade.</li>',
  '</ul></div>',
].join('\n');

// ─── Interaction script ─────────────────────────────────────

let js = '';
js += '<script>';
js += '\n';
js += 'var anchor = document.getElementById(\'live\');';
js += '\n';
js += 'var trigger = document.getElementById(\'liveTrigger\');';
js += '\n';
js += 'if (anchor && trigger) {';
js += '\n';
js += '  function show() { anchor.classList.add(\'is-open\'); }';
js += '\n';
js += '  function hide() { anchor.classList.remove(\'is-open\'); }';
js += '\n';
js += '  trigger.addEventListener(\'mouseenter\', show);';
js += '\n';
js += '  trigger.addEventListener(\'mouseleave\', hide);';
js += '\n';
js += '  trigger.addEventListener(\'focus\', show);';
js += '\n';
js += '  trigger.addEventListener(\'blur\', hide);';
js += '\n';
js += '  document.addEventListener(\'keydown\', function (e) { if (e.key === \'Escape\') hide(); });';
js += '\n';
js += '}';
js += '\n';
js += 'document.querySelectorAll(\'[data-ctrl]\').forEach(function(btn){ btn.addEventListener(\'click\', function(){ var t=document.getElementById(\'heroTip\'); t.className=\'tt tt--\'+btn.getAttribute(\'data-value\'); var seg=btn.parentNode; seg.querySelectorAll(\'button\').forEach(function(b){ b.classList.toggle(\'is-active\', b===btn); }); }); });';
js += '\n';
js += '</script>';

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Tooltip Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Tooltip \u2014 Component Preview</h1>'
  + '<p class="hint">Read-only floating label that supplements an already-affordable control. Beakless surface, Shadow/Low, Functional Body Small text. Placement Above (default), Below, Left, or Right.</p>'
  + body + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'tooltip.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
