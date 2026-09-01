/**
 * Teaching Notification — Interactive HTML Preview (One Copilot)
 *
 * Source Discovery teaching popover. A clipped Citation Preview on a soft grey
 * plate, a title + body sentence, and a Skip / Connect sources action row.
 *
 * Default variant references Moody's, HubSpot, and LSEG (matching Figma
 * 1719:32051). A second variant swaps in GitHub, Jira, and Confluence.
 *
 * Output: preview/dist/teachingNotification.html
 */

// Logos served relative to preview/dist/
const L = (f: string) => '../../src/components/icons/' + f;

interface Ref { logo: string; source: string; title: string }

function preview(refs: Ref[]): string {
  const items = refs.map(function (r) {
    return [
      '<div class="tn-item">',
      '<div class="tn-item__hd">',
      '<span class="tn-item__logo"><img src="' + L(r.logo) + '" alt=""/></span>',
      '<span class="tn-item__src">' + r.source + '</span>',
      '</div>',
      '<div class="tn-item__title">' + r.title + '</div>',
      '</div>',
    ].join('');
  }).join('');
  return '<div class="tn-plate"><div class="tn-cprev">' + items + '</div></div>';
}

function card(refs: Ref[], sources: string): string {
  return [
    '<div class="tn">',
    preview(refs),
    '<div class="tn-text">',
    '<div class="tn-text__title">Bring data from new sources</div>',
    '<div class="tn-text__body">Connect ' + sources + ', and more to get insights from these sources</div>',
    '</div>',
    '<div class="tn-footer">',
    '<button class="tn-btn tn-btn--skip">Skip</button>',
    '<button class="tn-btn tn-btn--connect">Connect sources</button>',
    '</div>',
    '</div>',
  ].join('');
}

const DEFAULT_REFS: Ref[] = [
  { logo: 'moodys-logo.png', source: 'Moody\u2019s', title: 'Consumer & Retail Credit Outlook 2026' },
  { logo: 'hubspot-logo.png', source: 'HubSpot', title: 'Repeat Purchase Benchmarks 2026' },
  { logo: 'lseg-logo.png', source: 'London Stock Exchange Group', title: 'Credit Rating' },
];

const DEV_REFS: Ref[] = [
  { logo: 'github-logo.png', source: 'GitHub', title: 'Auth service — open pull requests' },
  { logo: 'jira-logo.png', source: 'Jira', title: 'Sprint 24 — open issues & blockers' },
  { logo: 'confluence-logo.png', source: 'Confluence', title: 'Release runbook & architecture docs' },
];

const DESIGN_REFS: Ref[] = [
  { logo: 'canva-logo.png', source: 'Canva', title: 'Q2 Launch Brand Kit — campaign templates' },
  { logo: 'figma-logo.svg', source: 'Figma', title: 'Source Discovery — UI Kit & specs' },
  { logo: 'notion-logo.png', source: 'Notion', title: 'Design system guidelines' },
];

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; color: #242424; }
.wrap { max-width: 860px; margin: 0 auto; padding: 48px 24px; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 6px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 40px; }
.cards { display: flex; gap: 48px; flex-wrap: wrap; justify-content: center; }
.card-col { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.rl { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.6px; }

/* ─── Teaching Notification ─── */
.tn { width: 320px; background: #fcfcfc; border-radius: 16px; padding-bottom: 20px; overflow: hidden;
  box-shadow: 0 6px 24px rgba(0,0,0,0.2); }

/* Grey plate clips the citation preview */
.tn-plate { position: relative; width: 320px; height: 180px; background: #f0f0f0; overflow: hidden; }
.tn-cprev { position: absolute; left: 20px; top: 20px; width: 279.53px; background: #fff; border-radius: 22.07px;
  padding: 7.36px; display: flex; flex-direction: column; gap: 2px;
  box-shadow: 0 7.36px 11.03px rgba(0,0,0,0.08), 0 3.68px 7.36px rgba(0,0,0,0.03), 0 0 0.92px rgba(0,0,0,0.08); }
.tn-item { display: flex; flex-direction: column; gap: 5.52px; padding: 7.36px; border-radius: 14.71px; }
.tn-item__hd { display: flex; align-items: center; gap: 7.36px; }
.tn-item__logo { width: 18.39px; height: 18.39px; border-radius: 4.6px; overflow: hidden; flex-shrink: 0; display: inline-flex; }
.tn-item__logo img { width: 100%; height: 100%; object-fit: contain; }
.tn-item__src { font-size: 11.03px; line-height: 14.71px; color: #5d5d5d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tn-item__title { font-size: 12.87px; line-height: 18.39px; color: #242424; }

/* Text block */
.tn-text { display: flex; flex-direction: column; gap: 8px; padding: 20px 20px 16px; }
.tn-text__title { font-size: 14px; line-height: 1.4; font-weight: 600; color: #242424; }
.tn-text__body { font-size: 14px; line-height: 1.4; font-weight: 400; color: #242424; }

/* Footer */
.tn-footer { display: flex; align-items: center; justify-content: flex-end; gap: 8px; height: 32px; padding: 4px 20px 0; }
.tn-btn { display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 6px 10px; border: none; border-radius: 12px; cursor: pointer; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 400; transition: background 0.1s; }
.tn-btn--skip { background: #f2f2f2; color: #242424; }
.tn-btn--skip:hover { background: #ebebeb; }
.tn-btn--connect { background: #242424; color: #fff; }
.tn-btn--connect:hover { background: #2b2b2b; }
`;

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Teaching Notification</title><style>' + css + '</style></head><body>'
  + '<div class="wrap">'
  + '<h1>Teaching Notification</h1>'
  + '<p class="hint">Source Discovery teaching popover \u2014 a clipped Citation Preview over a title, body, and Skip / Connect sources actions.</p>'
  + '<div class="cards">'
  + '<div class="card-col"><span class="rl">Default</span>' + card(DEFAULT_REFS, 'Moody\u2019s, HubSpot, LSEG') + '</div>'
  + '<div class="card-col"><span class="rl">GitHub \u00b7 Jira \u00b7 Confluence</span>' + card(DEV_REFS, 'GitHub, Jira, Confluence') + '</div>'  + '<div class="card-col"><span class="rl">Canva · Figma</span>' + card(DESIGN_REFS, 'Canva, Figma') + '</div>'  + '</div>'
  + '</div></body></html>';

import * as fs from 'fs';
import * as path from 'path';
const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'teachingNotification.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'teachingNotification.html'));
