/**
 * Settings Modal — Interactive HTML Preview (One Copilot)
 *
 * The One Copilot Settings dialog. A full-width header ("Settings" + dismiss)
 * over a two-pane body: a text-only left nav rail and a right content pane.
 * The Sources tab is shown selected — a managed source list (chevron rows) and
 * a "Browse sources" section with an inline Search and connectable rows.
 *
 * Reuses primitives: button (dismiss + Connect), divider (row separators),
 * menuListItem-style rows, scrollbar (content overflow).
 *
 * Font (exact): Segoe Sans. Title = Functional/Subtitle (20/28, 600);
 * section headers = Body Medium Strong (14/20, 600); rows = Body Medium (14/20);
 * secondary = Body Small (12/16).
 *
 * Figma: One Copilot — Sources Framework — Settings (node 440:16814)
 * Usage:  npx tsx preview/src/settingsModal.ts  →  preview/dist/settingsModal.html
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Icons ──────────────────────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function icon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/\n/g, ' ').replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"').trim();
}
const chevronRight = icon('chevron-right-20-regular.svg');
const searchIco = icon('search-20-regular.svg');
const dismissIco = icon('dismiss-20-regular.svg');
const appsIco = icon('apps-20-regular.svg');

// Connector logos (relative to dist/)
const L = (f: string) => '../../src/components/icons/' + f;
const jiraLogo = L('jira-logo.png');
const notionLogo = L('notion-logo.png');
const canvaLogo = L('canva-logo.png');
const linearLogo = L('linear-logo.png');

// ─── Data ───────────────────────────────────────────────────

const navItems = ['Startup', 'Personalization', 'Voice', 'Data controls', 'Notifications', 'Sources', 'Agents', 'Accounts', 'About', 'Internal tools'];
const selectedNav = 'Sources';

interface SourceRow { icon: string; name: string; sub: string }
const managedSources: SourceRow[] = [
  { icon: '<span class="stg__gi">' + appsIco + '</span>', name: 'Microsoft 365 Apps', sub: 'Chats, Emails, Meetings, Sharepoint and more' },
  { icon: '<img src="' + jiraLogo + '" alt=""/>', name: 'JIRA', sub: 'Use web results to support responses' },
  { icon: '<img src="' + notionLogo + '" alt=""/>', name: 'Notion', sub: 'Review what Copilot can access' },
];

interface BrowseRow { icon: string; name: string; desc: string }
const browseSources: BrowseRow[] = [
  { icon: '<img src="' + canvaLogo + '" alt=""/>', name: 'Canva', desc: 'Browse, summarize, autofill, and even generate new Canva designs' },
  { icon: '<img src="' + linearLogo + '" alt=""/>', name: 'Linear', desc: 'Manage issues, projects, and team workflows in Linear' },
  { icon: '<img src="' + L('slack-logo.png') + '" alt=""/>', name: 'Slack', desc: 'Search messages, channels, and files across your workspace' },
  { icon: '<img src="' + L('github-logo.png') + '" alt=""/>', name: 'GitHub', desc: 'Reference repositories, issues, and pull requests' },
  { icon: '<img src="' + L('confluence-logo.png') + '" alt=""/>', name: 'Confluence', desc: 'Pull knowledge base articles and team documentation' },
  { icon: '<img src="' + L('servicenow-logo.png') + '" alt=""/>', name: 'ServiceNow', desc: 'Look up tickets, incidents, and IT service records' },
  { icon: '<img src="' + L('hubspot-logo.png') + '" alt=""/>', name: 'HubSpot', desc: 'Connect CRM contacts, deals, and marketing data' },
  { icon: '<img src="' + L('intercom-logo.png') + '" alt=""/>', name: 'Intercom', desc: 'Bring in customer conversations and support history' },
  { icon: '<img src="' + L('google-drive-logo.png') + '" alt=""/>', name: 'Google Drive', desc: 'Search documents, sheets, and slides in your Drive' },
  { icon: '<img src="' + L('google-calendar-logo.png') + '" alt=""/>', name: 'Google Calendar', desc: 'Look up events, meetings, and availability' },
  { icon: '<img src="' + L('google-contacts-logo.png') + '" alt=""/>', name: 'Google Contacts', desc: 'Search and manage your contact information' },
  { icon: '<img src="' + L('moodys-logo.png') + '" alt=""/>', name: "Moody's", desc: 'Credit ratings and risk insights' },
  { icon: '<img src="' + L('lseg-logo.png') + '" alt=""/>', name: 'London Stock Exchange Group', desc: 'Market data and financial filings' },
  { icon: '<img src="' + L('sp-global-logo.png') + '" alt=""/>', name: 'S&P Global', desc: 'Company fundamentals and market intelligence' },
];

// ─── Builders ───────────────────────────────────────────────

function navItem(label: string): string {
  const sel = label === selectedNav ? ' stg__navitem--sel' : '';
  return '<button class="stg__navitem' + sel + '">' + label + '</button>';
}

function sourceRow(r: SourceRow): string {
  return '<button class="stg__row">'
    + '<span class="stg__rowicon">' + r.icon + '</span>'
    + '<span class="stg__rowmeta"><span class="stg__rowname">' + r.name + '</span><span class="stg__rowsub">' + r.sub + '</span></span>'
    + '<span class="stg__chev">' + chevronRight + '</span>'
    + '</button>';
}

function browseRow(r: BrowseRow): string {
  return '<div class="stg__row stg__row--browse" data-name="' + (r.name + ' ' + r.desc).toLowerCase().replace(/"/g, '') + '">'
    + '<span class="stg__rowicon">' + r.icon + '</span>'
    + '<span class="stg__rowmeta"><span class="stg__rowname">' + r.name + '</span><span class="stg__rowsub">' + r.desc + '</span></span>'
    + '<button class="stg__connect">Connect</button>'
    + '</div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; color: #242424;
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(180deg, #e6e6e6, #d2d2d2); padding: 40px 24px; }

/* ─── Modal ─── */
.stg { width: 790px; max-width: 100%; height: 636px; max-height: calc(100vh - 80px); background: #fff; border-radius: 24px;
  box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.15), 0px 8px 16px 0px rgba(0,0,0,0.03), 0px 32px 48px 0px rgba(0,0,0,0.08);
  padding: 28px; display: flex; flex-direction: column; gap: 24px; }

/* Header bar */
.stg__bar { display: flex; align-items: center; justify-content: space-between; }
.stg__title { font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.stg__x { width: 32px; height: 32px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: background 0.1s; }
.stg__x:hover { background: rgba(36,36,36,0.04); }
.stg__x svg { width: 20px; height: 20px; }

/* Body: nav + content */
.stg__body { display: flex; gap: 24px; flex: 1; min-height: 0; }

/* Left nav (text only) */
.stg__nav { width: 198px; flex-shrink: 0; display: flex; flex-direction: column; gap: 2px; }
.stg__navitem { text-align: left; padding: 8px 12px; border: none; border-radius: 8px; background: transparent;
  font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; cursor: pointer; transition: background 0.1s; }
.stg__navitem:hover { background: rgba(36,36,36,0.04); }
.stg__navitem--sel { background: #ebebeb; font-weight: 600; }

/* Right content (scrolls) */
.stg__content { flex: 1; min-width: 0; overflow-y: auto; padding-right: 4px; scrollbar-width: thin; scrollbar-color: #6f6f6f transparent; }
.stg__content::-webkit-scrollbar { width: 10px; }
.stg__content::-webkit-scrollbar-thumb { background: #6f6f6f; border-radius: 9999px; border: 4px solid transparent; background-clip: content-box; }

.stg__sechead { font-size: 14px; line-height: 20px; font-weight: 600; color: #242424; }
.stg__secdesc { font-size: 12px; line-height: 16px; font-weight: 420; color: #5d5d5d; margin: 2px 0 4px; padding-bottom: 10px; border-bottom: 1px solid #dedede; }

/* Source / browse rows */
.stg__row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 4px; border: none;
  border-bottom: 1px solid #dedede; background: transparent; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; border-radius: 4px; }
.stg__row:hover { background: rgba(36,36,36,0.03); }
.stg__row--browse { cursor: default; }
.stg__row--browse:hover { background: transparent; }
.stg__rowicon { width: 20px; height: 20px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; }
.stg__rowicon img { width: 20px; height: 20px; object-fit: contain; display: block; }
.stg__gi { display: inline-flex; width: 20px; height: 20px; color: #242424; }
.stg__gi svg { width: 20px; height: 20px; }
.stg__rowmeta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.stg__rowname { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; }
.stg__rowsub { font-size: 12px; line-height: 16px; font-weight: 420; color: rgba(0,0,0,0.56); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.stg__row--browse .stg__rowsub { white-space: normal; }
.stg__chev { display: inline-flex; width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; }
.stg__chev svg { width: 20px; height: 20px; }

/* Connect (text button) */
.stg__connect { flex-shrink: 0; border: none; background: transparent; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; cursor: pointer; padding: 6px 10px; border-radius: 8px; transition: background 0.1s; }
.stg__connect:hover { background: rgba(36,36,36,0.04); }

/* Browse header + inline search */
.stg__browsehead { display: flex; align-items: center; justify-content: space-between; margin: 24px 0 4px; }
.stg__search { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border: 1px solid #dedede; border-radius: 9999px; background: #fff; }
.stg__search svg { width: 16px; height: 16px; color: rgba(0,0,0,0.56); }
.stg__search input { border: none; outline: none; background: transparent; font-family: inherit; font-size: 12px; line-height: 16px; color: #242424; width: 100px; }
.stg__search input::placeholder { color: rgba(0,0,0,0.56); }
.stg__empty { padding: 20px 4px; font-size: 13px; line-height: 18px; color: #5d5d5d; }
`;

// ─── Assemble ───────────────────────────────────────────────

const modal = '<div class="stg" role="dialog" aria-label="Settings">'
  + '<div class="stg__bar"><div class="stg__title">Settings</div>'
  + '<button class="stg__x" aria-label="Close">' + dismissIco + '</button></div>'
  + '<div class="stg__body">'
  + '<nav class="stg__nav">' + navItems.map(navItem).join('') + '</nav>'
  + '<div class="stg__content">'
  + '<div class="stg__sechead">Sources</div>'
  + '<div class="stg__secdesc">Add and manage the sources Copilot uses to find and retrieve content for you</div>'
  + managedSources.map(sourceRow).join('')
  + '<div class="stg__browsehead"><div class="stg__sechead">Browse sources</div>'
  + '<div class="stg__search">' + searchIco + '<input type="text" id="stgSearch" placeholder="Search" aria-label="Search sources"/></div></div>'
  + '<div id="stgBrowse">' + browseSources.map(browseRow).join('') + '</div>'
  + '<div class="stg__empty" id="stgEmpty" hidden>No sources match your search.</div>'
  + '</div>'
  + '</div></div>';

const js = '<script>'
  + '(function(){'
  + 'var input = document.getElementById("stgSearch");'
  + 'var rows = Array.prototype.slice.call(document.querySelectorAll("#stgBrowse .stg__row--browse"));'
  + 'var empty = document.getElementById("stgEmpty");'
  + 'if (!input) return;'
  + 'input.addEventListener("input", function(){'
  + '  var q = input.value.trim().toLowerCase();'
  + '  var shown = 0;'
  + '  rows.forEach(function(r){'
  + '    var match = !q || r.getAttribute("data-name").indexOf(q) !== -1;'
  + '    r.hidden = !match;'
  + '    if (match) shown++;'
  + '  });'
  + '  empty.hidden = shown !== 0;'
  + '});'
  + '})();'
  + '</script>';

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Settings Modal Preview</title><style>' + css + '</style></head><body>'
  + '<div class="bp-stage"><div class="bp-stage__canvas">' + modal + '</div></div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'settingsModal.html'), html, 'utf-8');
console.log('Done: preview/dist/settingsModal.html');
