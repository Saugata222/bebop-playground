/**
 * MessageBar — Interactive HTML Preview
 *
 * Ported from the One Copilot Desktop UI Kit (Figma node 1413:28316).
 * Renders the four status intents (Information, Warning, Error, Success),
 * a no-actions variant, live dismiss, and the Figma "Usage guidance"
 * (node 1506:991).
 *
 * Font (exact): Segoe Sans functional. Message = Body Medium (14/20, wght 420);
 * button labels = Body Small Strong (12/16, wght 625); optical size 8.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Glyphs (Fluent UI System Icons, 20px, currentColor) ────

const ICON = {
  info: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.4921 8.91012C10.4497 8.67687 10.2456 8.49999 10.0001 8.49999C9.72397 8.49999 9.50011 8.72385 9.50011 8.99999V13.5021L9.50817 13.592C9.55051 13.8253 9.75465 14.0021 10.0001 14.0021C10.2763 14.0021 10.5001 13.7783 10.5001 13.5021V8.99999L10.4921 8.91012ZM10.7988 6.74999C10.7988 6.33578 10.463 5.99999 10.0488 5.99999C9.63461 5.99999 9.29883 6.33578 9.29883 6.74999C9.29883 7.16421 9.63461 7.49999 10.0488 7.49999C10.463 7.49999 10.7988 7.16421 10.7988 6.74999ZM18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z" fill="currentColor"/></svg>',
  warning: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.56195 3.26181C9.75109 2.91271 10.2521 2.91273 10.4412 3.26186L16.9418 15.2628C17.1222 15.5959 16.881 16.0009 16.5021 16.0009H3.49942C3.12051 16.0009 2.8793 15.5959 3.0598 15.2627L9.56195 3.26181ZM11.3205 2.78557C10.7532 1.73821 9.25014 1.73813 8.68271 2.78544L2.18056 14.7864C1.63905 15.7858 2.3627 17.0009 3.49942 17.0009H16.5021C17.6388 17.0009 18.3624 15.786 17.821 14.7865L11.3205 2.78557ZM10.5 7.50023C10.5 7.22409 10.2761 7.00023 9.99996 7.00023C9.72382 7.00023 9.49996 7.22409 9.49996 7.50023V11.5002C9.49996 11.7764 9.72382 12.0002 9.99996 12.0002C10.2761 12.0002 10.5 11.7764 10.5 11.5002V7.50023ZM10.75 13.7502C10.75 14.1644 10.4142 14.5002 9.99996 14.5002C9.58575 14.5002 9.24996 14.1644 9.24996 13.7502C9.24996 13.336 9.58575 13.0002 9.99996 13.0002C10.4142 13.0002 10.75 13.336 10.75 13.7502Z" fill="currentColor"/></svg>',
  diamond: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1194 2.87868C10.9478 1.70711 9.0483 1.70711 7.87673 2.87868L2.87868 7.87673C1.70711 9.0483 1.70711 10.9478 2.87868 12.1194L7.87673 17.1174C9.0483 18.289 10.9478 18.289 12.1194 17.1174L17.1174 12.1194C18.289 10.9478 18.289 9.0483 17.1174 7.87673L12.1194 2.87868ZM8.58384 3.58579C9.36488 2.80474 10.6312 2.80474 11.4123 3.58579L16.4103 8.58384C17.1914 9.36488 17.1914 10.6312 16.4103 11.4123L11.4123 16.4103C10.6312 17.1914 9.36489 17.1914 8.58384 16.4103L3.58579 11.4123C2.80474 10.6312 2.80474 9.36489 3.58579 8.58384L8.58384 3.58579ZM7.85355 7.14645C7.65829 6.95118 7.34171 6.95118 7.14645 7.14645C6.95118 7.34171 6.95118 7.65829 7.14645 7.85355L9.29289 10L7.14645 12.1464C6.95118 12.3417 6.95118 12.6583 7.14645 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L10 10.7071L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L10.7071 10L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645C12.6583 6.95118 12.3417 6.95118 12.1464 7.14645L10 9.29289L7.85355 7.14645Z" fill="currentColor"/></svg>',
  check: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM13.3584 7.64645C13.532 7.82001 13.5513 8.08944 13.4163 8.28431L13.3584 8.35355L9.35355 12.3584C9.17999 12.532 8.91056 12.5513 8.71569 12.4163L8.64645 12.3584L6.64645 10.3584C6.45118 10.1632 6.45118 9.84658 6.64645 9.65131C6.82001 9.47775 7.08944 9.45846 7.28431 9.59346L7.35355 9.65131L9 11.298L12.6513 7.64645C12.8466 7.45118 13.1632 7.45118 13.3584 7.64645Z" fill="currentColor"/></svg>',
  dismiss: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.08859 4.21569L4.14645 4.14645C4.32001 3.97288 4.58944 3.9536 4.78431 4.08859L4.85355 4.14645L10 9.293L15.1464 4.14645C15.32 3.97288 15.5894 3.9536 15.7843 4.08859L15.8536 4.14645C16.0271 4.32001 16.0464 4.58944 15.9114 4.78431L15.8536 4.85355L10.707 10L15.8536 15.1464C16.0271 15.32 16.0464 15.5894 15.9114 15.7843L15.8536 15.8536C15.68 16.0271 15.4106 16.0464 15.2157 15.9114L15.1464 15.8536L10 10.707L4.85355 15.8536C4.67999 16.0271 4.41056 16.0464 4.21569 15.9114L4.14645 15.8536C3.97288 15.68 3.9536 15.4106 4.08859 15.2157L4.14645 15.1464L9.293 10L4.14645 4.85355C3.97288 4.67999 3.9536 4.41056 4.08859 4.21569L4.14645 4.14645L4.08859 4.21569Z" fill="currentColor"/></svg>',
};

// ─── Markup builder ─────────────────────────────────────────

const INTENT_ICON: Record<string, string> = {
  neutral: ICON.info, warning: ICON.warning, danger: ICON.diamond, success: ICON.check,
};

function bar(intent: string, message: string, withActions: boolean): string {
  const actions = withActions
    ? '<button class="mb__btn">Button</button><button class="mb__btn">Button</button>'
    : '';
  return [
    '<div class="mb mb--' + intent + '">',
    '<span class="mb__icon">' + INTENT_ICON[intent] + '</span>',
    '<p class="mb__msg">' + message + '</p>',
    '<div class="mb__actions">' + actions
      + '<button class="mb__dismiss" aria-label="Dismiss">' + ICON.dismiss + '</button></div>',
    '</div>',
  ].join('\n');
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 920px; margin: 0 auto; }
.stack { display: flex; flex-direction: column; gap: 16px; }

/* ─── MessageBar ─── */
.mb {
  display: flex; align-items: center; gap: 8px;
  padding: 12px; border-radius: 16px; border: 1px solid transparent; width: 100%;
}
.mb__icon { display: inline-flex; flex-shrink: 0; width: 20px; height: 20px; }
.mb__icon svg { width: 20px; height: 20px; display: block; }
.mb__msg {
  flex: 1 0 0; min-width: 0;
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  font-size: 14px; line-height: 20px; letter-spacing: 0;
  font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420;
  color: #242424;
}
.mb__actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

/* Action button — Button primitive: Subtle, Small (rest label = regular 420) */
.mb__btn {
  display: inline-flex; align-items: center; justify-content: center;
  height: 24px; padding: 4px 8px; border: 1px solid transparent; border-radius: 8px;
  background: transparent; color: #242424; cursor: pointer; white-space: nowrap;
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  font-size: 12px; line-height: 16px; letter-spacing: 0;
  font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420;
  transition: background 0.1s;
}
.mb__btn:hover { background: rgba(36,36,36,0.04); }

/* Dismiss — Button primitive: Subtle, Icon-only, Medium (32px), circular */
.mb__dismiss {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; padding: 6px; border: none; border-radius: 9999px;
  background: transparent; color: #242424; cursor: pointer; transition: background 0.1s;
}
.mb__dismiss svg { width: 20px; height: 20px; display: block; }
.mb__dismiss:hover { background: rgba(36,36,36,0.04); }

/* Intents — surface + stroke + icon color (message stays #242424) */
.mb--neutral { background: #f2f2f2; border-color: #dedede; }
.mb--neutral .mb__icon { color: #242424; }
.mb--warning { background: #fff2ee; border-color: #ffd3c4; }
.mb--warning .mb__icon { color: #a93901; }
.mb--danger  { background: #fff1f3; border-color: #ffd0d6; }
.mb--danger  .mb__icon { color: #a62147; }
.mb--success { background: #e3fcee; border-color: #b1efcc; }
.mb--success .mb__icon { color: #017048; }

/* Dismiss-out animation */
.mb.is-dismissed { display: none; }

/* ─── Usage doc ─── */
.doc { background: #fff; border: 1px solid #ebebeb; border-radius: 16px; padding: 28px 32px; margin-top: 24px; }
.doc__sec { margin-bottom: 24px; }
.doc__sec:last-child { margin-bottom: 0; }
.doc__sec h3 { font-size: 18px; font-weight: 600; letter-spacing: -0.4px; margin-bottom: 10px; }
.doc__sec p { font-size: 14px; line-height: 1.55; color: #242424; margin-bottom: 10px; }
.doc__sec p:last-child { margin-bottom: 0; }
.doc__sec strong { font-weight: 700; }
`;

// ─── Usage guidance (Figma node 1506:991) ───────────────────

const usageDoc = [
  '<div class="doc">',
  '<div class="doc__sec"><h3>Types</h3>',
  '<p>MessageBar has four status types. Each carries a distinct semantic meaning and a different live-region politeness, so the choice changes both how the message reads and how assistive technology announces it. Match the status to the meaning \u2014 never use Warning to downplay an Error or Information.</p>',
  '<p><strong>Information.</strong> A neutral, informational update. Use it for context that\u2019s helpful but not urgent \u2014 a new feature, a routine state change, or a non-blocking heads-up.</p>',
  '<p><strong>Warning.</strong> A non-critical issue that needs attention. Use it when an action might have unintended consequences or a state could become a problem if it isn\u2019t addressed soon.</p>',
  '<p><strong>Error.</strong> A failure or blocking condition. Use it when something didn\u2019t work, a required action couldn\u2019t complete, or a state prevents someone from continuing.</p>',
  '<p><strong>Success.</strong> Confirms a positive outcome. Use it after an action completes successfully, like saving changes or finishing a multi-step flow.</p>',
  '</div>',
  '<div class="doc__sec"><h3>Behavior</h3>',
  '<p>MessageBar surfaces the outcome of an action across a full page or section, or communicates a persistent system state that needs attention. Reach for it when feedback is actionable and benefits from one or two inline responses adjacent to the message.</p>',
  '<p>Apply it at the page or section level \u2014 never on individual form fields. For inline validation use a field-level error beneath the input; for persistent help use hint text, a tooltip, or a callout; for destructive confirmations use a Dialog; for floating, ephemeral notifications use a Toast.</p>',
  '<p>Match the status to the semantic meaning of the message \u2014 the status is part of the message, not a stylistic choice. Show no more than two action buttons; if more responses are needed, the situation calls for a Dialog. Always give the dismiss button an accessible name.</p>',
  '</div>',
  '<div class="doc__sec"><h3>Layout</h3>',
  '<p>Never hardcode the container width. The 800px shown in the design source is for layout purposes only \u2014 in code, fill the parent.</p>',
  '</div>',
  '<div class="doc__sec"><h3>Accessibility</h3>',
  '<p>Set live-region politeness by status: use role="alert" for Error and Warning so the announcement is assertive, and role="status" for Information and Success so it stays polite. Overusing role="alert" desensitizes people to urgent alerts.</p>',
  '<p>When someone dismisses a MessageBar, remove it from the DOM rather than hiding it with display: none \u2014 a hidden bar with role="alert" can still be announced unexpectedly. Remove all show/hide transitions when prefers-reduced-motion: reduce is set.</p>',
  '</div>',
  '</div>',
].join('\n');

// ─── Body markup ────────────────────────────────────────────

const msg = 'Message providing information with actionable insights.';

const body = [
  stage('<div style="width:100%;max-width:560px">' + bar('neutral', msg, true) + '</div>'),
  '<h2>Status intents</h2>',
  '<div class="stack">',
  bar('neutral', msg, true),
  bar('warning', msg, true),
  bar('danger', msg, true),
  bar('success', msg, true),
  '</div>',

  '<h2>Without action buttons</h2>',
  '<div class="stack">',
  bar('neutral', 'A routine system state has changed. No action needed.', false),
  bar('success', 'Your changes were saved successfully.', false),
  '</div>',

  '<h2>Usage</h2>',
  usageDoc,
].join('\n');

// ─── Interaction script ─────────────────────────────────────

let js = '';
js += '<script>';
js += '\n';
js += 'document.querySelectorAll(\'.mb__dismiss\').forEach(function (d) {';
js += '\n';
js += '  d.addEventListener(\'click\', function () {';
js += '\n';
js += '    var mb = d.closest(\'.mb\');';
js += '\n';
js += '    if (mb) mb.classList.add(\'is-dismissed\');';
js += '\n';
js += '  });';
js += '\n';
js += '});';
js += '\n';
js += '</script>';

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>MessageBar Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>MessageBar \u2014 Component Preview</h1>'
  + '<p class="hint">Inline status notification. Four intents \u2014 Information, Warning, Error, Success. Click the X to dismiss.</p>'
  + body + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'messageBar.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
