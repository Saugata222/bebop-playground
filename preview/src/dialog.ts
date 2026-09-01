/**
 * Dialog — Interactive HTML Preview
 *
 * Ported from the One Copilot Desktop UI Kit (Dialog page 2519:484419;
 * node 4020:1796). Three types — Neutral, Feedback, and Destructive — each an
 * elevated modal (radius 24, Shadow/Highest) with a Title Small header, Body
 * Large text, and a right-aligned footer.
 *
 * Reused primitive: Button (Subtle Cancel; Primary / Danger confirm).
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Buttons (Button primitive — Small) ─────────────────────

function btnSubtle(label: string): string {
  return '<button class="dlg-btn dlg-btn--subtle">' + label + '</button>';
}
function btnPrimary(label: string): string {
  return '<button class="dlg-btn dlg-btn--primary">' + label + '</button>';
}
function btnDanger(label: string): string {
  return '<button class="dlg-btn dlg-btn--danger">' + label + '</button>';
}

// ─── Dialog builder ─────────────────────────────────────────

function dialog(title: string, bodyHtml: string, footer: string): string {
  return [
    '<div class="dlg">',
    '<div class="dlg__title">' + title + '</div>',
    '<div class="dlg__body">' + bodyHtml + '</div>',
    '<div class="dlg__footer">' + footer + '</div>',
    '</div>',
  ].join('');
}

function neutral(): string {
  return dialog(
    'Open this link?',
    'This will take you to<br/>https://www.microsoft.com/en-us/soft-biz/',
    btnSubtle('Cancel') + btnPrimary('Okay'),
  );
}
function feedback(): string {
  return dialog(
    'Additional feedback',
    '<p>With Think Deeper, Copilot takes 30 seconds to consider your question from all angles and perspectives.</p><p style="margin-top:12px">It\u2019s for the toughest questions on your real-life problem solving, math, science, or careers.</p>',
    btnSubtle('Cancel') + btnPrimary('Submit feedback'),
  );
}
function destructive(): string {
  return dialog(
    'Delete conversation?',
    'Once you delete a conversation, the messages are gone forever on every device.',
    btnSubtle('Cancel') + btnDanger('Delete'),
  );
}

function scene(label: string, dlg: string): string {
  return '<div class="scene"><span class="scene__label">' + label + '</span><div class="scene__stage">' + dlg + '</div></div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 24px; }
.wrap { max-width: 900px; margin: 0 auto; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.scene { }
.scene__label { display: block; font-size: 10px; font-weight: 600; color: #9a9a9a; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }
.scene__stage { display: flex; align-items: center; justify-content: center; min-height: 260px; background: #d9d9d9; border-radius: 16px; padding: 32px; }

/* ─── Dialog ─── */
.dlg { width: 340px; max-width: 100%; background: #fff; border-radius: 24px; box-shadow: 0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.03), 0 32px 48px rgba(0,0,0,0.10); padding: 24px; display: flex; flex-direction: column; gap: 12px; }
.dlg__title { font-size: 24px; line-height: 28px; font-weight: 600; font-variation-settings: 'wght' 600; letter-spacing: -0.15px; color: #242424; }
.dlg__body { font-size: 16px; line-height: 22px; font-weight: 420; font-variation-settings: 'opsz' 12, 'wght' 420; letter-spacing: 0; color: #242424; }
.dlg__footer { display: flex; align-items: center; justify-content: flex-end; gap: 8px; margin-top: 4px; }

/* Footer buttons — Button primitive, Medium; rest label = regular 420 */
.dlg-btn { display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 6px 12px; border: 1px solid transparent; border-radius: 12px; cursor: pointer; white-space: nowrap; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; letter-spacing: 0; transition: background 0.1s; }
.dlg-btn--subtle { background: transparent; color: #242424; }
.dlg-btn--subtle:hover { background: rgba(36,36,36,0.04); }
.dlg-btn--primary { background: #242424; color: #fff; border-color: transparent; }
.dlg-btn--primary:hover { background: #3b3b3b; }
.dlg-btn--danger { background: #ffe3e6; color: #a62147; border-color: transparent; }
.dlg-btn--danger:hover { background: #ffd0d6; }
`;

// ─── Body ───────────────────────────────────────────────────

const body = [
  stage(neutral()),
  '<h2>Neutral</h2>',
  scene('Open this link?', neutral()),
  '<h2>Types</h2>',
  '<div class="grid">',
  scene('Feedback', feedback()),
  scene('Destructive', destructive()),
  '</div>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Dialog Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Dialog \u2014 Component Preview</h1>'
  + '<p class="hint">Modal that interrupts the workflow for a critical action. Neutral, Feedback, and Destructive types. Radius 24, Shadow/Highest; Cancel (Subtle) + Primary / Danger confirm.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'dialog.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'dialog.html'));
