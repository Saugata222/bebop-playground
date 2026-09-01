/**
 * Dialog (One Copilot) — HTML Preview
 *
 * One Copilot Desktop UI Kit — Dialog (node 4020:1796). A modal that interrupts
 * the workflow for a critical, explicit acknowledgement. Three types
 * (Neutral / On Brand / Destructive) across Light and Dark, plus the canonical
 * "Open this link?" anatomy example.
 *
 * Usage:  npx tsx preview/src/dialogOneCopilot.ts
 * Output: preview/dist/dialogOneCopilot.html
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Builders ───────────────────────────────────────────────

type BtnKind = 'subtle' | 'secondary' | 'primary' | 'destructive';
function btn(label: string, kind: BtnKind): string {
  return '<button class="dlg-btn dlg-btn--' + kind + '">' + label + '</button>';
}
interface DlgSpec { title: string; body: string; actions: string; }
function dialog(spec: DlgSpec, dark?: boolean): string {
  return [
    '<div class="dlg' + (dark ? ' dlg--dark' : '') + '" role="dialog" aria-label="' + spec.title + '">',
    '<div class="dlg__text">',
    '<p class="dlg__title">' + spec.title + '</p>',
    '<p class="dlg__body">' + spec.body + '</p>',
    '</div>',
    '<div class="dlg__divpad"></div>',
    '<div class="dlg__footer">' + spec.actions + '</div>',
    '</div>',
  ].join('');
}

const NEUTRAL: DlgSpec = {
  title: 'Open this link?',
  body: 'This will take you to<br/>https://news.microsoft.com/microsoft-50/',
  actions: btn('Cancel', 'subtle') + btn('Okay', 'secondary'),
};
const ONBRAND: DlgSpec = {
  title: 'Additional feedback',
  body: 'With Think Deeper, Copilot takes 30 seconds to consider your question from all angles and perspectives.<br/><br/>It\u2019s for the toughest questions on your mind like problem solving, math, science, or careers.',
  actions: btn('Cancel', 'subtle') + btn('Submit feedback', 'primary'),
};
const DESTRUCTIVE: DlgSpec = {
  title: 'Delete conversation?',
  body: 'Once you delete a conversation, the messages are gone forever on every device.',
  actions: btn('Delete', 'destructive') + btn('Keep', 'primary'),
};

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 28px; }
.wrap { max-width: 1000px; margin: 0 auto; }
.rl { font-size: 11px; font-weight: 600; color: #929292; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }

/* Anatomy stage */
.stage { display: flex; align-items: center; justify-content: center; padding: 56px 24px; background: #dcdcdc; border-radius: 16px; }

/* Light / Dark variant grid */
.variants { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-radius: 16px; overflow: hidden; margin-top: 8px; }
.vcol { display: flex; flex-direction: column; gap: 24px; padding: 40px 32px; }
.vcol--light { background: #ececec; }
.vcol--dark { background: #1f1f1f; }
.vlabel { font-size: 12px; color: #6f6f6f; }
.vcol--dark .vlabel { color: #adadad; }

/* ─── Dialog ─── */
.dlg { width: 448px; max-width: 100%; background: #ffffff; border: 1px solid rgba(36,36,36,0); border-radius: 24px; padding: 28px; display: flex; flex-direction: column;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08); }
.dlg__text { display: flex; flex-direction: column; gap: 12px; color: #242424; }
.dlg__title { font-size: 24px; line-height: 28px; font-weight: 600; font-variation-settings: 'opsz' 12, 'wght' 600; letter-spacing: -0.15px; color: #242424; }
.dlg__body { font-size: 16px; line-height: 22px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; color: #242424; }
.dlg__divpad { height: 32px; }
.dlg__footer { display: flex; align-items: center; justify-content: flex-end; gap: 6px; }

/* Buttons (Button primitive, medium) */
.dlg-btn { height: 32px; padding: 6px 10px; border: none; border-radius: 12px; cursor: pointer; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; transition: background 0.1s, color 0.1s; }
.dlg-btn--subtle { background: rgba(36,36,36,0); color: #242424; }
.dlg-btn--subtle:hover { background: rgba(36,36,36,0.04); }
.dlg-btn--secondary { background: rgba(229,229,229,0.5); color: #242424; }
.dlg-btn--secondary:hover { background: rgba(212,212,212,0.54); }
.dlg-btn--primary { background: #242424; color: #ffffff; }
.dlg-btn--primary:hover { background: #313131; }
.dlg-btn--destructive { background: #ffe3e6; color: #c42344; }
.dlg-btn--destructive:hover { background: #fcd3d9; }

/* Dark theme */
.dlg--dark { background: #292929; border-color: rgba(255,255,255,0); box-shadow: 0 0 1px 0 rgba(0,0,0,0.4), 0 8px 16px 0 rgba(0,0,0,0.24), 0 32px 48px 0 rgba(0,0,0,0.36); }
.dlg--dark .dlg__text, .dlg--dark .dlg__title, .dlg--dark .dlg__body { color: #ededed; }
.dlg--dark .dlg-btn--subtle { background: rgba(255,255,255,0); color: #ededed; }
.dlg--dark .dlg-btn--subtle:hover { background: rgba(255,255,255,0.08); }
.dlg--dark .dlg-btn--secondary { background: rgba(255,255,255,0.08); color: #ededed; }
.dlg--dark .dlg-btn--secondary:hover { background: rgba(255,255,255,0.12); }
.dlg--dark .dlg-btn--primary { background: #ffffff; color: #242424; }
.dlg--dark .dlg-btn--primary:hover { background: #f0f0f0; }
.dlg--dark .dlg-btn--destructive { background: rgba(196,35,68,0.24); color: #ffb3c0; }
.dlg--dark .dlg-btn--destructive:hover { background: rgba(196,35,68,0.34); }
`;

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Dialog (One Copilot) Preview</title>';
html += '<style>' + css + '</style></head><body>';

html += '<div class="wrap">';
html += '<h1>Dialog \u2014 Component Preview</h1>';
html += '<p class="hint">A modal that interrupts the workflow for a critical action requiring explicit acknowledgement. White surface, radius 24, 28px inset, Shadow/Highest. Three types \u2014 Neutral, On Brand, Destructive.</p>';

// Anatomy
html += '<div class="bp-stage"><div class="bp-stage__canvas">' + dialog(NEUTRAL) + '</div></div>';

// Types — Light / Dark
html += '<h2>Types \u2014 Light / Dark</h2>';
html += '<div class="variants">';
html += '<div class="vcol vcol--light">';
html += '<div><div class="vlabel">Neutral</div>' + dialog(NEUTRAL) + '</div>';
html += '<div><div class="vlabel">On Brand</div>' + dialog(ONBRAND) + '</div>';
html += '<div><div class="vlabel">Destructive</div>' + dialog(DESTRUCTIVE) + '</div>';
html += '</div>';
html += '<div class="vcol vcol--dark">';
html += '<div><div class="vlabel">Neutral</div>' + dialog(NEUTRAL, true) + '</div>';
html += '<div><div class="vlabel">On Brand</div>' + dialog(ONBRAND, true) + '</div>';
html += '<div><div class="vlabel">Destructive</div>' + dialog(DESTRUCTIVE, true) + '</div>';
html += '</div>';
html += '</div>';

html += '</div>'; // wrap
html += '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'dialogOneCopilot.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'dialogOneCopilot.html'));
