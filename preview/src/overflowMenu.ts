/**
 * Overflow Menu — HTML Preview
 *
 * Shows the header "More" (⋯) dropdown with all anatomy slots:
 * account row, icon items, toggle row, section header, info rows.
 */

import * as fs from 'fs';
import * as path from 'path';
import { tokensCSS } from './_tokens';

// ─── Icons ──────────────────────────────────────────────────

const chevR = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.646 4.146a.5.5 0 0 1 .708 0l5.5 5.5a.5.5 0 0 1 0 .708l-5.5 5.5a.5.5 0 0 1-.708-.708L12.793 10 7.646 4.854a.5.5 0 0 1 0-.708z" fill="currentColor"/></svg>';
const pagesIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.414A2 2 0 0 0 15.414 6L12 2.586A2 2 0 0 0 10.586 2H6zm0 1h4.586a1 1 0 0 1 .707.293L14.707 6.707A1 1 0 0 1 15 7.414V16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="currentColor"/></svg>';
const clockIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 1 1 0 16A8 8 0 0 1 10 2zm0 1a7 7 0 1 0 0 14A7 7 0 0 0 10 3zm.5 2.5v4.293l2.854 2.853a.5.5 0 0 1-.708.708l-3-3A.5.5 0 0 1 9.5 10V5.5a.5.5 0 0 1 1 0z" fill="currentColor"/></svg>';
const gearIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-2 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm2-8a.75.75 0 0 1 .75.75v1.077a6.498 6.498 0 0 1 2.497 1.034l.762-.762a.75.75 0 1 1 1.06 1.06l-.761.762A6.498 6.498 0 0 1 15.343 7.5h.907a.75.75 0 0 1 0 1.5h-1.077a6.498 6.498 0 0 1-1.034 2.497l.762.762a.75.75 0 1 1-1.06 1.06l-.762-.761A6.498 6.498 0 0 1 10.5 13.657v.593a.75.75 0 0 1-1.5 0v-1.077a6.498 6.498 0 0 1-2.497-1.034l-.762.762a.75.75 0 0 1-1.06-1.06l.761-.762A6.498 6.498 0 0 1 4.157 9.25H3.25a.75.75 0 0 1 0-1.5h1.077a6.498 6.498 0 0 1 1.034-2.497l-.762-.762a.75.75 0 0 1 1.06-1.06l.762.761A6.498 6.498 0 0 1 9.25 3.093V2.25A.75.75 0 0 1 10 2z" fill="currentColor"/></svg>';
const downloadIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a.5.5 0 0 1 .5.5v9.793l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 .708-.708L9.5 12.293V2.5A.5.5 0 0 1 10 2zM3 16.5A.5.5 0 0 1 3.5 16h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" fill="currentColor"/></svg>';
const helpIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 1 1 0 16A8 8 0 0 1 10 2zm0 1a7 7 0 1 0 0 14A7 7 0 0 0 10 3zm0 10.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm0-8a2.5 2.5 0 0 1 .955 4.808c-.39.167-.705.508-.705.942v.5a.5.5 0 0 1-1 0v-.5c0-.887.553-1.618 1.316-1.941A1.5 1.5 0 1 0 8.5 7.5a.5.5 0 0 1-1 0A2.5 2.5 0 0 1 10 5.5z" fill="currentColor"/></svg>';
const feedbackIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2zM3 10a7 7 0 1 1 14 0 7 7 0 0 1-14 0zm7-3.5a.5.5 0 0 1 .5.5v2.793l1.854 1.853a.5.5 0 0 1-.708.708l-2-2A.5.5 0 0 1 9.5 10V7a.5.5 0 0 1 .5-.5z" fill="currentColor"/></svg>';
const shieldIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.664 2.076a.75.75 0 0 1 .672 0l6.5 3.25A.75.75 0 0 1 17.25 6v4c0 3.354-2.054 5.527-4.348 6.891a13.23 13.23 0 0 1-2.574 1.098.75.75 0 0 1-.656 0 13.23 13.23 0 0 1-2.574-1.098C4.804 15.527 2.75 13.354 2.75 10V6a.75.75 0 0 1 .414-.674l6.5-3.25zm.336 1.353L4.25 6.303V10c0 2.836 1.696 4.673 3.652 5.809A11.73 11.73 0 0 0 10 16.78a11.73 11.73 0 0 0 2.098-.971C14.054 14.673 15.75 12.836 15.75 10V6.303L10 3.429z" fill="currentColor"/></svg>';
const avatarIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" fill="#E0E0E0"/><circle cx="10" cy="8" r="3.5" fill="#9E9E9E"/><path d="M3.5 16.5C3.5 13.462 6.462 11 10 11s6.5 2.462 6.5 5.5" stroke="#9E9E9E" stroke-width="1.2" fill="none"/></svg>';
const dimissIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4.146 4.146a.5.5 0 0 1 .708 0L10 9.293l5.146-5.147a.5.5 0 0 1 .708.708L10.707 10l5.147 5.146a.5.5 0 0 1-.708.708L10 10.707l-5.146 5.147a.5.5 0 0 1-.708-.708L9.293 10 4.146 4.854a.5.5 0 0 1 0-.708z" fill="currentColor"/></svg>';

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--f-typography-fontFamily-functional); background: #f3f3f3; padding: 40px; color: #242424; }
.wrap { max-width: 900px; margin: 0 auto; }
h1 { font-size: 22px; font-weight: 600; margin-bottom: 6px; }
.hint { font-size: 13px; color: #6f6f6f; margin-bottom: 32px; }
h2 { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 12px; }
.row { display: flex; gap: 32px; align-items: flex-start; flex-wrap: wrap; margin-bottom: 40px; }

/* Menu surface */
.om { background: #fff; border-radius: 16px; box-shadow: 0px 3px 12px 0px rgba(0,0,0,0.18); padding: 8px; min-width: 260px; width: 280px; }

/* List item */
.om__item { display: flex; align-items: center; gap: 6px; padding: 10px 12px; border-radius: 12px; cursor: pointer; transition: background 0.1s; font-size: 14px; font-weight: 400; color: #242424; }
.om__item:hover { background: rgba(36,36,36,0.04); }
.om__icon { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.om__label { flex: 1; }
.om__chevron { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #242424; opacity: 0.5; }

/* Account row */
.om__account { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-radius: 12px; cursor: pointer; transition: background 0.1s; }
.om__account:hover { background: rgba(36,36,36,0.04); }
.om__avatar { width: 20px; height: 20px; border-radius: 9999px; overflow: hidden; flex-shrink: 0; }
.om__account-name { font-size: 14px; font-weight: 400; color: #242424; flex: 1; }

/* Divider */
.om__divider { height: 1px; background: #ebebeb; margin: 4px 0; }

/* Section header */
.om__section { font-size: 12px; font-weight: 600; color: #242424; padding: 8px 12px 4px; }

/* Toggle */
.om__toggle-row { display: flex; align-items: center; gap: 6px; padding: 10px 12px; border-radius: 12px; cursor: pointer; }
.om__toggle-row:hover { background: rgba(36,36,36,0.04); }
.om__toggle-label { flex: 1; font-size: 14px; color: #242424; }
.tgl { display: inline-flex; align-items: center; flex-shrink: 0; cursor: pointer; }
.tgl__track { width: 40px; height: 20px; border-radius: 9999px; position: relative; transition: background 0.15s; }
.tgl__thumb { width: 12px; height: 12px; border-radius: 9999px; position: absolute; top: 50%; transform: translateY(-50%); transition: left 0.15s; }
.tgl--on .tgl__track { background: #242424; }
.tgl--on .tgl__thumb { background: #fff; left: 24px; }
.tgl--off .tgl__track { background: #fff; border: 1px solid #dedede; }
.tgl--off .tgl__thumb { background: #6f6f6f; left: 4px; }

/* Info row (no interaction) */
.om__info { display: flex; align-items: center; gap: 6px; padding: 8px 12px; font-size: 14px; color: #6f6f6f; }
`;

// ─── Helpers ────────────────────────────────────────────────

const divider = '<div class="om__divider"></div>';

function item(ico: string, label: string, chev = false): string {
  return `<div class="om__item"><span class="om__icon">${ico}</span><span class="om__label">${label}</span>${chev ? `<span class="om__chevron">${chevR}</span>` : ''}</div>`;
}

function toggleRow(ico: string | null, label: string, on: boolean): string {
  const iconHtml = ico ? `<span class="om__icon">${ico}</span>` : '';
  const tgl = `<div class="tgl tgl--${on ? 'on' : 'off'}"><div class="tgl__track"><div class="tgl__thumb"></div></div></div>`;
  return `<div class="om__toggle-row">${iconHtml}<span class="om__toggle-label">${label}</span>${tgl}</div>`;
}

function infoRow(label: string): string {
  return `<div class="om__info">${label}</div>`;
}

// ─── Menu HTML ───────────────────────────────────────────────

const menu = `
<div class="om">
  <div class="om__account">
    <span class="om__avatar">${avatarIco}</span>
    <span class="om__account-name">Mona Kane</span>
    <span class="om__chevron">${chevR}</span>
  </div>
  ${divider}
  ${item(pagesIco, 'Recent pages')}
  ${item(clockIco, 'Scheduled prompts')}
  ${item(gearIco, 'Chat settings')}
  ${item(downloadIco, 'Download apps', true)}
  ${item(helpIco, 'Help and tips', true)}
  ${item(feedbackIco, 'Send feedback')}
  ${divider}
  ${toggleRow(shieldIco, 'Harmful content protection', true)}
  ${divider}
  <div class="om__section">Internal only</div>
  ${toggleRow(null, 'Try M365 Copilot style', true)}
  ${toggleRow(null, 'Try SSR', false)}
  ${infoRow('Ring: SDF')}
  ${infoRow('License: Premium')}
</div>`;

// ─── Page ────────────────────────────────────────────────────

const body = `
<div class="wrap">
  <h1>Overflow Menu</h1>
  <p class="hint">Header "More" (⋯) dropdown — account row, icon items, toggles, section headers, and info rows.</p>
  <h2>Full anatomy</h2>
  <div class="row">
    ${menu}
  </div>
</div>`;

// ─── Write ───────────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Overflow Menu — M365 Copilot Design System</title>'
  + '<style>' + tokensCSS + css + '</style></head><body>' + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'overflowMenu.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'overflowMenu.html'));
