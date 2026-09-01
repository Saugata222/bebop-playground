/**
 * Chat Settings — HTML Preview
 *
 * Shows the full-screen settings modal: header, nav sidebar (Sources selected),
 * and the main content area with connector card grid.
 */

import * as fs from 'fs';
import * as path from 'path';
import { tokensCSS } from './_tokens';

// ─── Icons ──────────────────────────────────────────────────

const dismissIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4.146 4.146a.5.5 0 0 1 .708 0L10 9.293l5.146-5.147a.5.5 0 0 1 .708.708L10.707 10l5.147 5.146a.5.5 0 0 1-.708.708L10 10.707l-5.146 5.147a.5.5 0 0 1-.708-.708L9.293 10 4.146 4.854a.5.5 0 0 1 0-.708z" fill="currentColor"/></svg>';
const chevLeftIco = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M10.354 3.146a.5.5 0 0 1 0 .708L6.207 8l4.147 4.146a.5.5 0 0 1-.708.708l-4.5-4.5a.5.5 0 0 1 0-.708l4.5-4.5a.5.5 0 0 1 .708 0z"/></svg>';
const bellIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 0 0-6 6v3l-1.293 1.293A1 1 0 0 0 3.5 14H7a3 3 0 0 0 6 0h3.5a1 1 0 0 0 .707-1.707L16 11V8a6 6 0 0 0-6-6zm0 13a2 2 0 0 1-2-2h4a2 2 0 0 1-2 2zm0-12a5 5 0 0 1 5 5v3.5l1 1H4l1-1V8a5 5 0 0 1 5-5z" fill="currentColor"/></svg>';
const gearIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-2 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm2-8a.75.75 0 0 1 .75.75v1.077a6.498 6.498 0 0 1 2.497 1.034l.762-.762a.75.75 0 1 1 1.06 1.06l-.761.762A6.498 6.498 0 0 1 15.343 7.5h.907a.75.75 0 0 1 0 1.5h-1.077a6.498 6.498 0 0 1-1.034 2.497l.762.762a.75.75 0 1 1-1.06 1.06l-.762-.761A6.498 6.498 0 0 1 10.5 13.657v.593a.75.75 0 0 1-1.5 0v-1.077a6.498 6.498 0 0 1-2.497-1.034l-.762.762a.75.75 0 0 1-1.06-1.06l.761-.762A6.498 6.498 0 0 1 4.157 9.25H3.25a.75.75 0 0 1 0-1.5h1.077a6.498 6.498 0 0 1 1.034-2.497l-.762-.762a.75.75 0 0 1 1.06-1.06l.762.761A6.498 6.498 0 0 1 9.25 3.093V2.25A.75.75 0 0 1 10 2z" fill="currentColor"/></svg>';
const dataIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3c-3.5 0-6 1.12-6 2.5v9C4 15.88 6.5 17 10 17s6-1.12 6-2.5v-9C16 4.12 13.5 3 10 3zm5 11.5c0 .828-2.015 1.5-5 1.5s-5-.672-5-1.5V13c1.17.63 2.976 1 5 1s3.83-.37 5-1v1.5zm0-3.5c0 .828-2.015 1.5-5 1.5s-5-.672-5-1.5V9c1.17.63 2.976 1 5 1s3.83-.37 5-1v2zm0-3.5C15 8.328 12.985 9 10 9S5 8.328 5 7.5V5.5C5 4.672 7.015 4 10 4s5 .672 5 1.5V7.5z" fill="currentColor"/></svg>';
const personIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 9c3.5 0 6 1.79 6 3.5V17H4v-1.5C4 13.79 6.5 12 10 12z" fill="currentColor"/></svg>';
const micIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm-2 3a2 2 0 0 1 4 0v5a2 2 0 0 1-4 0V5zm-3 5a.5.5 0 0 1 1 0 4 4 0 0 0 8 0 .5.5 0 0 1 1 0 5 5 0 0 1-4.5 4.975V17h2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h2v-2.025A5 5 0 0 1 5 10z" fill="currentColor"/></svg>';
const agentsIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2zm0 1a7 7 0 1 1 0 14A7 7 0 0 1 10 3zm0 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 1a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="currentColor"/></svg>';
const connectedIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM7 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM13 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM7 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-6-3.5 6-3.5.5.866-6 3.5L7 10.866zm0 1.5 6 3.5-.5.866-6-3.5.5-.866z" fill="currentColor"/></svg>';
const flagIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 2.5a.5.5 0 0 1 1 0V3h10.5a.5.5 0 0 1 .354.854L12.207 7.5l3.647 3.646A.5.5 0 0 1 15.5 12H5v5.5a.5.5 0 0 1-1 0V2.5zm1 1.5v7h9.293l-3.147-3.146a.5.5 0 0 1 0-.708L14.293 4H5z" fill="currentColor"/></svg>';
const m365Ico = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1.5" y="1.5" width="7.5" height="7.5" rx="1.5" fill="#F25022"/><rect x="11" y="1.5" width="7.5" height="7.5" rx="1.5" fill="#7FBA00"/><rect x="1.5" y="11" width="7.5" height="7.5" rx="1.5" fill="#00A4EF"/><rect x="11" y="11" width="7.5" height="7.5" rx="1.5" fill="#FFB900"/></svg>';

// Connector placeholder icons
function connIco(label: string, bg: string): string {
  return `<svg width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" rx="4" fill="${bg}"/><text x="10" y="14" font-family="Segoe UI,Arial,sans-serif" font-size="8" font-weight="700" fill="white" text-anchor="middle">${label}</text></svg>`;
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--f-typography-fontFamily-functional); background: #f3f3f3; padding: 40px; color: #242424; }
.wrap { max-width: 1000px; margin: 0 auto; }
h1 { font-size: 22px; font-weight: 600; margin-bottom: 6px; }
.hint { font-size: 13px; color: #6f6f6f; margin-bottom: 32px; }
h2 { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 12px; }

/* ─── Modal ─── */
.cs { width: 824px; height: 709px; background: #fff; border-radius: 24px; box-shadow: 0px 8px 32px 0px rgba(0,0,0,0.20); display: flex; flex-direction: column; overflow: hidden; }

/* ─── Header ─── */
.cs__hdr { height: 58px; border-bottom: 1px solid #e8e8e8; display: flex; align-items: center; padding: 0 20px; gap: 10px; flex-shrink: 0; }
.cs__hdr-icon { width: 20px; height: 20px; flex-shrink: 0; }
.cs__hdr-title { font-size: 14px; font-weight: 600; color: #242424; flex: 1; }
.cs__hdr-dismiss { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #424242; transition: background 0.1s; border: none; background: transparent; }
.cs__hdr-dismiss:hover { background: rgba(36,36,36,0.04); }

/* ─── Body ─── */
.cs__body { display: flex; flex: 1; min-height: 0; }

/* ─── Nav ─── */
.cs__nav { width: 260px; border-right: 1px solid #e8e8e8; padding: 8px 0; flex-shrink: 0; overflow-y: auto; }
.cs__nav-section { font-size: 12px; font-weight: 600; color: #5d5d5d; padding: 12px 20px 4px; }
.cs__nav-item { display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 8px 20px; font-size: 14px; font-weight: 400; color: #242424; cursor: pointer; transition: background 0.1s; position: relative; }
.cs__nav-item:hover { background: rgba(36,36,36,0.04); }
.cs__nav-item--selected { font-weight: 600; }
.cs__nav-item--selected::before { content: ''; position: absolute; left: 0; top: 6px; bottom: 6px; width: 3px; background: #242424; border-radius: 0 2px 2px 0; }
.cs__nav-icon { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

/* ─── Content ─── */
.cs__content { flex: 1; padding: 30px 40px; overflow-y: auto; }
.cs__breadcrumb { display: flex; align-items: center; gap: 4px; font-size: 14px; color: #5d5d5d; margin-bottom: 16px; }
.cs__page-title { font-size: 20px; font-weight: 700; color: #242424; margin-bottom: 6px; }
.cs__page-sub { font-size: 14px; color: #5d5d5d; margin-bottom: 24px; }
.cs__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cs__card { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 16px; border: 1px solid #e0e0e0; border-radius: 12px; background: #fff; cursor: pointer; transition: background 0.1s, border-color 0.1s; }
.cs__card:hover { background: rgba(36,36,36,0.04); border-color: #c4c4c4; }
.cs__card-icon { width: 20px; height: 20px; }
.cs__card-label { font-size: 12px; font-weight: 600; color: #242424; }
`;

// ─── Connector grid items ────────────────────────────────────

const connectors = [
  { label: 'HubSpot',     ico: connIco('HS', '#FF7A59') },
  { label: 'Slack',       ico: connIco('SL', '#4A154B') },
  { label: 'Jira',        ico: connIco('JR', '#0052CC') },
  { label: 'GitHub',      ico: connIco('GH', '#24292F') },
  { label: 'Notion',      ico: connIco('NT', '#000000') },
  { label: 'Canva',       ico: connIco('CA', '#00C4CC') },
  { label: 'Dynamics 365',ico: connIco('D3', '#002050') },
  { label: 'Intercom',    ico: connIco('IC', '#1F8DED') },
  { label: 'ServiceNow',  ico: connIco('SN', '#62D84E') },
];

const gridHtml = connectors.map(c =>
  `<div class="cs__card"><span class="cs__card-icon">${c.ico}</span><span class="cs__card-label">${c.label}</span></div>`
).join('\n');

// ─── Modal HTML ─────────────────────────────────────────────

const modal = `
<div class="cs">
  <div class="cs__hdr">
    <span class="cs__hdr-icon">${m365Ico}</span>
    <span class="cs__hdr-title">Microsoft 365 Copilot</span>
    <button class="cs__hdr-dismiss">${dismissIco}</button>
  </div>
  <div class="cs__body">
    <nav class="cs__nav">
      <div class="cs__nav-item"><span class="cs__nav-icon">${bellIco}</span>Notifications</div>
      <div class="cs__nav-section">Chat</div>
      <div class="cs__nav-item"><span class="cs__nav-icon">${gearIco}</span>General</div>
      <div class="cs__nav-item"><span class="cs__nav-icon">${dataIco}</span>Data controls</div>
      <div class="cs__nav-item"><span class="cs__nav-icon">${personIco}</span>Personalization</div>
      <div class="cs__nav-item"><span class="cs__nav-icon">${micIco}</span>Voice</div>
      <div class="cs__nav-item"><span class="cs__nav-icon">${agentsIco}</span>Agents</div>
      <div class="cs__nav-item cs__nav-item--selected"><span class="cs__nav-icon">${connectedIco}</span>Sources</div>
      <div class="cs__nav-section">Feature tools</div>
      <div class="cs__nav-item"><span class="cs__nav-icon">${flagIco}</span>Flags</div>
      <div class="cs__nav-section">Internal use</div>
      <div class="cs__nav-item">Build Info</div>
      <div class="cs__nav-item">Overrides</div>
    </nav>
    <div class="cs__content">
      <div class="cs__breadcrumb">${chevLeftIco} Chat</div>
      <div class="cs__page-title">Sources</div>
      <div class="cs__page-sub">Manage which sources Copilot can access to answer your questions.</div>
      <div class="cs__grid">${gridHtml}</div>
    </div>
  </div>
</div>`;

// ─── Page ────────────────────────────────────────────────────

const body = `
<div class="wrap">
  <h1>Chat Settings</h1>
  <p class="hint">Full-screen settings modal — header, side nav, and Sources content page with connector card grid.</p>
  <h2>Full anatomy</h2>
  ${modal}
</div>`;

// ─── Write ───────────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Chat Settings — M365 Copilot Design System</title>'
  + '<style>' + tokensCSS + css + '</style></head><body>' + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'chatSettings.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'chatSettings.html'));
