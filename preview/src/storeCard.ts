/**
 * Store Card — Interactive HTML Preview
 *
 * Shows all 4 store card variants:
 *   Agent Acquired, Source Acquired, Agent Discover, Source Discover
 *
 * Usage:  npx tsx preview/src/storeCard.ts
 * Output: preview/dist/storeCard.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { renderStatesMatrix, statesMatrixCss, type RowSpec, type StateCol } from './_statesMatrix.js';
import { tokensCSS } from './_tokens';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, ' ').trim();
}

const moreHzIco = readIcon('more-horizontal-16-regular.svg');

// ─── CSS ────────────────────────────────────────────────────

let css = '';
css += tokensCSS;
css += '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n';
css += "html, body { height: 100%; font-family: var(--f-typography-fontFamily-functional); color: #242424; background: #f5f5f5; }\n";
css += '.page { padding: 40px; display: flex; flex-direction: column; gap: 48px; }\n';
css += 'h2 { font-size: 14px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }\n';
css += '.demo { background: #fff; border-radius: 16px; padding: 32px; border: 1px solid #e8e8e8; }\n';
css += '.grid-acquired { display: grid; grid-template-columns: repeat(auto-fill, minmax(242px, 1fr)); gap: 8px; }\n';
css += '.grid-discover { display: grid; grid-template-columns: repeat(auto-fill, minmax(333px, 1fr)); gap: 8px; }\n';

// ─── Acquired card (compact) ───
css += ".sc-acquired { display: flex; align-items: center; gap: 14px; padding: 9px 18px; background: #f5f5f5; border-radius: 14px; cursor: pointer; position: relative; transition: background 0.1s; height: 62px; min-width: 242px; max-width: 320px; }\n";
css += '.sc-acquired:hover, .sc-acquired.is-hover { background: #ebebeb; }\n';

// Agent icon (acquired)
css += '.sc-acquired__icon--agent { width: 38px; height: 38px; border-radius: 12px; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); border: 0.6px solid rgba(0,0,0,0.08); box-shadow: 0px 1.2px 4.7px rgba(0,0,0,0.05); }\n';
css += '.sc-acquired__icon--agent img { width: 24px; height: 24px; object-fit: contain; }\n';

// Avatar icon (acquired)
css += '.sc-acquired__icon--avatar { width: 38px; height: 38px; border-radius: 8px; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border: 0.6px solid rgba(0,0,0,0.05); }\n';
css += '.sc-acquired__icon--avatar img { width: 19px; height: 19px; object-fit: contain; }\n';

// Source icon (acquired)
css += '.sc-acquired__icon--source { width: 38px; height: 38px; border-radius: 12px; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }\n';
css += '.sc-acquired__icon--source img { width: 38px; height: 38px; object-fit: contain; }\n';

// Name (acquired)
css += ".sc-acquired__name { font-family: var(--f-typography-fontFamily-functional); font-size: 16px; font-weight: 400; color: #242424; line-height: 23px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0; }\n";

// More button
css += '.sc-acquired__more { width: 24px; height: 24px; display: none; align-items: center; justify-content: center; color: #242424; flex-shrink: 0; cursor: pointer; border-radius: 8px; transition: background 0.1s; border: none; background: transparent; padding: 4px; }\n';
css += '.sc-acquired:hover .sc-acquired__more { display: flex; }\n';
css += '.sc-acquired.is-hover .sc-acquired__more { display: flex; }\n';
css += '.sc-acquired__more:hover { background: rgba(36,36,36,0.04); }\n';
css += '.sc-acquired__more svg { width: 16px; height: 16px; }\n';

// ─── Discover card (large) ───
css += ".sc-discover { display: flex; align-items: center; padding: 17px 24px 17px 26px; background: #fff; border: 1px solid #dedede; border-radius: 18px; cursor: pointer; transition: border-color 0.1s, box-shadow 0.15s; }\n";
css += '.sc-discover:hover, .sc-discover.is-hover { border-color: #c4c4c4; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }\n';
css += '.sc-discover__inner { display: flex; gap: 9px; align-items: flex-start; }\n';

// Agent icon (discover)
css += '.sc-discover__icon--agent { width: 54px; height: 54px; border-radius: 12px; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8.4px); -webkit-backdrop-filter: blur(8.4px); border: 0.844px solid rgba(0,0,0,0.08); box-shadow: 0px 1.7px 6.75px rgba(0,0,0,0.05); }\n';
css += '.sc-discover__icon--agent img { width: 34px; height: 34px; object-fit: contain; }\n';

// Source icon (discover)
css += '.sc-discover__icon--source { width: 54px; height: 54px; border-radius: 12px; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }\n';
css += '.sc-discover__icon--source img { width: 54px; height: 54px; object-fit: contain; }\n';

// Text
css += '.sc-discover__text { flex: 1; min-width: 0; height: 63px; display: flex; flex-direction: column; gap: 0; }\n';
css += ".sc-discover__name { font-family: var(--f-typography-fontFamily-functional); font-size: 14px; font-weight: 600; color: #242424; line-height: 20px; height: 23px; }\n";
css += ".sc-discover__desc { font-family: var(--f-typography-fontFamily-functional); font-size: 14px; font-weight: 400; color: #616161; line-height: 20px; height: 40px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }\n";
css += statesMatrixCss + '\n';

// ─── States Matrix ──────────────────────────────────────────

function acquiredCardHtml(extra: string, opts: { kind: 'agent' | 'source' }): string {
  let s = '<div class="sc-acquired' + (extra ? ' ' + extra : '') + '">';
  if (opts.kind === 'agent') {
    s += '<div class="sc-acquired__icon--agent" style="background:rgba(24,90,189,0.1);"><img src="../../src/components/icons/figma.png" alt=""></div>';
    s += '<span class="sc-acquired__name">Figma</span>';
  } else {
    s += '<div class="sc-acquired__icon--source"><img src="../../src/components/icons/servicenow-logo.png" alt=""></div>';
    s += '<span class="sc-acquired__name">ServiceNow</span>';
  }
  s += '<button class="sc-acquired__more">' + moreHzIco + '</button>';
  s += '</div>';
  return s;
}

function discoverCardHtml(extra: string, opts: { kind: 'agent' | 'source' }): string {
  let s = '<div class="sc-discover' + (extra ? ' ' + extra : '') + '" style="width:333px"><div class="sc-discover__inner">';
  if (opts.kind === 'agent') {
    s += '<div class="sc-discover__icon--agent" style="background:rgba(61,213,240,0.1);"><img src="../../src/components/icons/copilot-for-sales.png" alt=""></div>';
    s += '<div class="sc-discover__text"><span class="sc-discover__name">Sales</span><span class="sc-discover__desc">Drive deals forward with clear insights.</span></div>';
  } else {
    s += '<div class="sc-discover__icon--source"><img src="../../src/components/icons/google-drive-logo.png" alt=""></div>';
    s += '<div class="sc-discover__text"><span class="sc-discover__name">Google Drive</span><span class="sc-discover__desc">Access files, docs and data from Google Workspace.</span></div>';
  }
  s += '</div></div>';
  return s;
}

function buildStatesMatrix(): string {
  const rows: RowSpec[] = [
    { label: 'Agent Acquired',  meta: { layout: 'acquired', kind: 'agent' } },
    { label: 'Source Acquired', meta: { layout: 'acquired', kind: 'source' } },
    { label: 'Agent Discover',  meta: { layout: 'discover', kind: 'agent' } },
    { label: 'Source Discover', meta: { layout: 'discover', kind: 'source' } },
  ];
  const cols: StateCol[] = [
    { label: 'Rest',  cls: '' },
    { label: 'Hover', cls: 'is-hover' },
  ];
  let out = '<div class="page" style="padding-top:0">';
  out += renderStatesMatrix({
    title: 'States Matrix',
    subtitle: 'All 4 store-card variants \u00d7 hover affordance.',
    rows,
    cols,
    render: (rowSpec, col) => {
      const m = rowSpec.meta as { layout: 'acquired' | 'discover'; kind: 'agent' | 'source' };
      if (m.layout === 'acquired') return acquiredCardHtml(col.cls, { kind: m.kind });
      return discoverCardHtml(col.cls, { kind: m.kind });
    },
  });
  out += '</div>';
  return out;
}

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html>';
html += '<html lang="en"><head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Store Card — Component Preview</title>';
html += '<style>' + css + '</style>';
html += '</head><body>';
html += '<div class="page">';

// ─── Agent Acquired ───
html += '<div><h2>Agent Acquired</h2><div class="demo"><div class="grid-acquired">';

const agentAcquired = [
  { name: 'Figma', icon: 'figma.png', bg: 'rgba(24,90,189,0.1)' },
  { name: 'Idea Coach', icon: 'lightbulb-filament.png', bg: 'rgba(181,164,29,0.1)' },
  { name: 'Analyst', icon: 'data-line.png', bg: 'rgba(207,69,200,0.1)' },
  { name: 'Brainstormer', icon: 'weather-rain.png', bg: 'linear-gradient(189deg, #5c98ed 5%, #6c6ae1 51%, #764bce 93%)', type: 'avatar' },
];

for (const a of agentAcquired) {
  const iconCls = a.type === 'avatar' ? 'sc-acquired__icon--avatar' : 'sc-acquired__icon--agent';
  html += '<div class="sc-acquired">';
  html += '  <div class="' + iconCls + '" style="background:' + a.bg + ';"><img src="../../src/components/icons/' + a.icon + '" alt="' + a.name + '"></div>';
  html += '  <span class="sc-acquired__name">' + a.name + '</span>';
  html += '  <button class="sc-acquired__more">' + moreHzIco + '</button>';
  html += '</div>';
}

html += '</div></div></div>';

// ─── Source Acquired ───
html += '<div><h2>Source Acquired</h2><div class="demo"><div class="grid-acquired">';

const sourceAcquired = [
  { name: 'ServiceNow', icon: 'servicenow-logo.png' },
  { name: 'Jira', icon: 'jira-logo.png' },
  { name: 'S&P Global', icon: 'sp-global-logo.png' },
  { name: 'Github', icon: 'github-logo.png' },
];

for (const s of sourceAcquired) {
  html += '<div class="sc-acquired">';
  html += '  <div class="sc-acquired__icon--source"><img src="../../src/components/icons/' + s.icon + '" alt="' + s.name + '"></div>';
  html += '  <span class="sc-acquired__name">' + s.name + '</span>';
  html += '  <button class="sc-acquired__more">' + moreHzIco + '</button>';
  html += '</div>';
}

html += '</div></div></div>';

// ─── Agent Discover ───
html += '<div><h2>Agent Discover</h2><div class="demo"><div class="grid-discover">';

const agentDiscover = [
  { name: 'Sales', desc: 'Drive deals forward with clear insights and ready\u2011to\u2011use actions.', icon: 'copilot-for-sales.png', bg: 'rgba(61,213,240,0.1)' },
  { name: 'Planner', desc: 'All your tasks and projects in one simple, familiar experiences', icon: 'planner.png', bg: 'rgba(162,41,175,0.1)' },
  { name: 'Researcher', desc: 'Fast insights to prep for your next meeting.', icon: 'planet-1.png', bg: 'rgba(25,32,239,0.1)' },
];

for (const a of agentDiscover) {
  html += '<div class="sc-discover"><div class="sc-discover__inner">';
  html += '  <div class="sc-discover__icon--agent" style="background:' + a.bg + ';"><img src="../../src/components/icons/' + a.icon + '" alt="' + a.name + '"></div>';
  html += '  <div class="sc-discover__text">';
  html += '    <span class="sc-discover__name">' + a.name + '</span>';
  html += '    <span class="sc-discover__desc">' + a.desc + '</span>';
  html += '  </div>';
  html += '</div></div>';
}

html += '</div></div></div>';

// ─── Source Discover ───
html += '<div><h2>Source Discover</h2><div class="demo"><div class="grid-discover">';

const sourceDiscover = [
  { name: 'Google Drive', desc: 'Access files, docs and data from Google Workspace', icon: 'google-drive-logo.png' },
  { name: 'Hubspot', desc: 'CRM contacts, deals, and marketing campaign insights', icon: 'hubspot-20-color.svg' },
  { name: 'Confluence', desc: 'Team wikis, documentation, and knowledge bases from Atlassian', icon: 'confluence-logo.png' },
];

for (const s of sourceDiscover) {
  html += '<div class="sc-discover"><div class="sc-discover__inner">';
  html += '  <div class="sc-discover__icon--source"><img src="../../src/components/icons/' + s.icon + '" alt="' + s.name + '"></div>';
  html += '  <div class="sc-discover__text">';
  html += '    <span class="sc-discover__name">' + s.name + '</span>';
  html += '    <span class="sc-discover__desc">' + s.desc + '</span>';
  html += '  </div>';
  html += '</div></div>';
}

html += '</div></div></div>';

html += '</div>'; // end page
html += buildStatesMatrix();
html += '</body></html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'storeCard.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
