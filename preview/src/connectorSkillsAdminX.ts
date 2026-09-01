/**
 * Connector Skills — AdminX awareness (interactive)
 *
 * Static screen (M365 top bar, left nav, Connectors list) is a Figma screenshot
 * (node 1082:121482, web-content crop) so it looks exactly like the design. Only
 * the INTERACTIVE parts are built in HTML, exactly per Figma (node 1082:121844):
 *   - row hotspots over the list  -> open the details pane
 *   - close (X)                   -> remove the pane
 *   - Skills section (collapsible) with hover-tooltip chips
 *   - a chip -> the skill details page (Back returns)
 *
 * Embedded in connectorSkillsDeck as a live slide filling the browser-window
 * web-content area (Figma frame 998:114606, 1519x796).
 */

import * as fs from 'fs';
import * as path from 'path';

const here = path.dirname(new URL(import.meta.url).pathname);
const iconsDir = path.join(here, '..', '..', 'src', 'components', 'icons');
function ico(name: string): string {
  try {
    return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8')
      .replace(/\n/g, '').replace(/ (width|height)="\d+"/g, '')
      .replace(/fill="#[0-9a-fA-F]{6}"/g, 'fill="currentColor"');
  } catch (e) { return ''; }
}
function logoImg(file: string): string {
  try { return 'data:image/png;base64,' + fs.readFileSync(path.join(iconsDir, file)).toString('base64'); } catch (e) { return ''; }
}
function brandSvg(name: string): string {
  try {
    const raw = fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8').replace(/\n/g, '');
    return raw.replace(/<svg\b[^>]*>/, (tag) => tag.replace(/ (?:width|height)="\d+"/g, ''));
  } catch (e) { return ''; }
}
// Static admin-center screen (top bar + nav + list) exported from Figma.
const BG = 'data:image/png;base64,' + fs.readFileSync(path.join(here, 'assets', 'connectorSkillsDeck', 'adminx-web.png')).toString('base64');

// ─── Fluent icons (interactive pane chrome) ─────────────────
const CHEV_R = ico('chevron-right-20-regular');
const CHEV_D = ico('chevron-down-20-regular');
const CLOSE = ico('dismiss-20-regular');
const REFRESH = ico('arrow-sync-20-regular');
const INFO = ico('info-20-regular');
const CHECK = ico('checkmark-circle-20-filled');
const EDIT = ico('edit-20-regular');
const TERMINAL = ico('code-20-regular');
const BLOCK = '<svg viewBox="0 0 20 20" width="16" height="16" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.4"/><path d="M5 5l10 10" stroke="currentColor" stroke-width="1.4"/></svg>';

function connLogoInner(logo: string): string {
  if (logo.endsWith('-logo.svg')) return brandSvg(logo.slice(0, -4));
  if (logo.endsWith('.svg')) return ico(logo.slice(0, -4));
  return '<img src="' + logoImg(logo) + '" alt=""/>';
}
function connLogo(logo: string): string {
  return '<span class="ax-lg ax-lg--big">' + connLogoInner(logo) + '</span>';
}

// ─── Connector list rows (real company logos from the settings/sources catalog) ─
const ROW_DATA = [
  { name: 'Library', logo: 'figma-logo.svg', dev: 'Figma', cat: 'Creative', url: 'https://mcp.figma.app/mcp', conn: 'Figma01' },
  { name: 'Notion', logo: 'notion-logo.png', dev: 'Notion', cat: 'Productivity', url: 'https://mcp.notion.app/mcp', conn: 'Notion09' },
  { name: 'Linear', logo: 'linear-logo.png', dev: 'Linear', cat: 'Development tools', url: 'https://mcp.linear.app/mcp', conn: 'Linear' },
  { name: 'HelloWorld', logo: 'engineering-hub-logo.png', dev: 'Guru', cat: 'Other', url: 'https://mcp.guru.app/mcp', conn: 'Guru01' },
  { name: 'Slack', logo: 'slack-logo.png', dev: 'Slack', cat: 'Communication', url: 'https://mcp.slack.app/mcp', conn: 'Slack01' },
  { name: 'Jira', logo: 'jira-logo.png', dev: 'Atlassian', cat: 'Development tools', url: 'https://mcp.atlassian.com/jira', conn: 'Jira01' },
  { name: 'Confluence', logo: 'confluence-logo.png', dev: 'Atlassian', cat: 'Development tools', url: 'https://mcp.atlassian.com/confluence', conn: 'Confluence02' },
  { name: 'Azure DevOps', logo: 'azure-devops-logo.svg', dev: 'Microsoft', cat: 'Development tools', url: 'https://mcp.azure.com/devops', conn: 'AzureDevOps01' },
  { name: 'HubSpot', logo: 'hubspot-logo.png', dev: 'HubSpot', cat: 'Commerce & Shopping', url: 'https://mcp.hubspot.app/mcp', conn: 'HubSpot01' },
  { name: 'Miro', logo: 'miro-logo.png', dev: 'Miro', cat: 'Creative', url: 'https://mcp.miro.app/mcp', conn: 'Miro03' },
  { name: 'Canva', logo: 'canva-logo.png', dev: 'Canva', cat: 'Creative', url: 'https://mcp.canva.app/mcp', conn: 'Canva01' },
  { name: 'Hugging Face', logo: 'hugging-face-logo.png', dev: 'Hugging Face', cat: 'Development tools', url: 'https://mcp.huggingface.co/mcp', conn: 'HuggingFace01' },
  { name: 'London Stock Exchange', logo: 'lseg-logo.png', dev: 'LSEG', cat: 'Financial Services', url: 'https://mcp.lseg.app/mcp', conn: 'LSEG01' },
  { name: 'Moody\u2019s', logo: 'moodys-logo.png', dev: 'Moody\u2019s', cat: 'Financial Services', url: 'https://mcp.moodys.app/mcp', conn: 'Moodys01' },
  { name: 'S&P Global', logo: 'sp-global-logo.png', dev: 'S&P Global', cat: 'Financial Services', url: 'https://mcp.spglobal.app/mcp', conn: 'SPGlobal01' },
  { name: 'PitchBook', logo: 'pitchbook-logo.png', dev: 'PitchBook', cat: 'Financial Services', url: 'https://mcp.pitchbook.app/mcp', conn: 'PitchBook01' },
  { name: 'Smartsheet', logo: 'smartsheet-logo.png', dev: 'Smartsheet', cat: 'Other', url: 'https://mcp.smartsheet.app/mcp', conn: 'Smartsheet01' },
  { name: 'Intercom', logo: 'intercom-logo.png', dev: 'Intercom', cat: 'Communication', url: 'https://mcp.intercom.app/mcp', conn: 'Intercom01' },
  { name: 'Twilio', logo: 'twilio-logo.png', dev: 'Twilio', cat: 'Communication', url: 'https://mcp.twilio.app/mcp', conn: 'Twilio01' },
  { name: 'Google Drive', logo: 'google-drive-logo.png', dev: 'Google', cat: 'Other', url: 'https://mcp.google.com/drive', conn: 'GoogleDrive01' },
  { name: 'Wolfram', logo: 'wolfram-logo.png', dev: 'Wolfram', cat: 'Data & Analytics', url: 'https://mcp.wolfram.app/mcp', conn: 'Wolfram01' },
  { name: 'Adobe', logo: 'adobe-logo.png', dev: 'Adobe', cat: 'Creative', url: 'https://mcp.adobe.app/mcp', conn: 'Adobe01' },
  { name: 'Morningstar', logo: 'morningstar-logo.png', dev: 'Morningstar', cat: 'Financial Services', url: 'https://mcp.morningstar.app/mcp', conn: 'Morningstar01' },
];

// ─── Skills catalog ─────────────────────────────────────────
const SKILLS: { name: string; desc: string }[] = [
  { name: '/company-brief', desc: 'Pull a concise company overview with key facts, financials, and recent news.' },
  { name: '/earnings-recap', desc: 'Summarize the latest earnings call and report the headline numbers.' },
  { name: '/peer-benchmark', desc: 'Compare a company against its peers on valuation and growth.' },
  { name: '/filings-digest', desc: 'Scan a company\u2019s recent regulatory filings and summarize the key disclosures.' },
  { name: '/valuation-snapshot', desc: 'Show current valuation multiples with historical context.' },
  { name: '/market-summary', desc: 'Recap today\u2019s market moves across indices, sectors, and rates.' },
  { name: '/ownership-changes', desc: 'Track recent institutional ownership and insider transactions.' },
  { name: '/watchlist-update', desc: 'Report what changed across your saved tickers since last check.' },
  { name: '/dividend-history', desc: 'Pull dividend payments, yield, and payout history for a ticker.' },
];

// ─── CSS ────────────────────────────────────────────────────
const css = `
* { box-sizing: border-box; }
html, body { margin: 0; }
body { width: 1519px; height: 796px; overflow: hidden; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #242424; }
.ax { position: relative; width: 1519px; height: 796px; overflow: hidden; background: #faf9f8; }
.ax-bg { position: absolute; top: 0; left: -38px; width: 1595px; height: 841px; object-fit: fill; user-select: none; -webkit-user-drag: none; pointer-events: none; }
/* Overlay the baked "MCP Connectors" summary number (Figma 998:108635 = 45). */
.ax-mcpstat { position: absolute; left: 375px; top: 266px; background: #fff; color: #0078d4; font-size: 20px; font-weight: 600; line-height: 20px; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; z-index: 6; }

/* clickable row hotspots over the static list */
.ax-hot { position: absolute; left: 260px; width: 1240px; height: 33px; cursor: pointer; z-index: 4; border-radius: 4px; }
.ax-hot:hover { background: rgba(0,0,0,0.035); }
.ax-hot.is-active { background: rgba(15,108,189,0.10); }

/* ── connector list (built, interactive) — overlays the baked table body ── */
.ax-list { position: absolute; left: 262px; top: 396px; width: 1229px; height: 388px; overflow-y: auto; background: #fff; z-index: 5; }
.ax-list::-webkit-scrollbar { width: 10px; }
.ax-list::-webkit-scrollbar-thumb { background: #d2d0ce; border-radius: 5px; border: 3px solid #fff; }
.ax-lrow { position: relative; height: 34px; cursor: pointer; border-bottom: 1px solid #f0eeed; }
.ax-lrow:hover { background: #f5f4f3; }
.ax-lrow.is-active { background: rgba(15,108,189,0.08); }
.ax-lc { position: absolute; top: 0; bottom: 0; display: flex; align-items: center; font-size: 11px; line-height: 14px; color: #323130; white-space: nowrap; }
.ax-lc--logo { left: 37px; }
.ax-lc--name { left: 79px; font-weight: 600; color: #323130; }
.ax-lc--conn { left: 272px; color: #5f5e5c; }
.ax-lc--state { left: 472px; gap: 6px; }
.ax-lc--type { left: 625px; }
.ax-lc--wdt { left: 776px; gap: 6px; }
.ax-lc--sync { left: 922px; color: #5f5e5c; }
.ax-llogo { width: 22px; height: 22px; border-radius: 4px; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; background: #fff; flex-shrink: 0; }
.ax-llogo img, .ax-llogo svg { width: 22px; height: 22px; object-fit: contain; }
.ax-lnew { width: 6px; height: 6px; border-radius: 50%; background: #0078d4; margin-left: 8px; flex-shrink: 0; }
.ax-lc--state svg, .ax-lc--wdt svg { width: 14px; height: 14px; color: #1faa1f; }
.ax-lmcp { display: inline-flex; align-items: center; padding: 0 6px; height: 16px; border-radius: 3px; background: #fdf3d3; color: #6b5900; font-size: 10px; font-weight: 600; letter-spacing: .2px; }

/* ── details pane (built, interactive) ── */
.ax-pane { position: absolute; top: 38px; right: 0; height: 753px; width: 749px; background: #fff; box-shadow: -6px 0 24px rgba(0,0,0,.14); border-left: 1px solid #edebe9; display: flex; flex-direction: column; transform: translateX(100%); transition: transform .28s cubic-bezier(.22,.61,.36,1); z-index: 20; }
.ax-pane.is-open { transform: translateX(0); }
.ax-pane__top { display: flex; justify-content: flex-end; gap: 4px; padding: 12px 18px 0; }
.ax-pane__ibtn { width: 30px; height: 30px; border: none; background: none; color: #605e5c; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
.ax-pane__ibtn svg { width: 18px; height: 18px; }
.ax-pane__ibtn:hover { background: #f3f2f1; }
.ax-pane__scroll { flex: 1; overflow-y: auto; padding: 0 20px 24px; }
.ax-pane__scroll::-webkit-scrollbar { width: 10px; }
.ax-pane__scroll::-webkit-scrollbar-thumb { background: #d2d0ce; border-radius: 5px; border: 3px solid #fff; }
.ax-pane__sections { padding-bottom: 60px; }
.ax-skill-footer { display: none; flex-shrink: 0; padding: 12px 20px 16px; background: #fff; }
.ax-pane.is-skill .ax-skill-footer { display: block; }

.ax-ph { display: flex; align-items: flex-start; gap: 13px; }
.ax-lg--big { position: relative; width: 37px; height: 37px; border-radius: 8px; background: #fff; border: 1px solid #edebe9; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden; }
.ax-lg--big img, .ax-lg--big svg { width: 24px; height: 24px; object-fit: contain; }
.ax-ph__logo { position: relative; flex-shrink: 0; }
.ax-ph__pencil { position: absolute; right: -3px; bottom: -3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; border: 1px solid #edebe9; display: inline-flex; align-items: center; justify-content: center; color: #616161; z-index: 1; }
.ax-ph__pencil svg { width: 10px; height: 10px; }
.ax-ph__meta { flex: 1; padding-top: 2px; }
.ax-ph__title { display: flex; align-items: center; gap: 8px; }
.ax-ph__name { font-size: 17.5px; font-weight: 600; }
.ax-badge-mcp { display: inline-flex; align-items: center; padding: 0 6px; height: 14px; border-radius: 3px; background: #fdf3d3; color: #6b5900; font-size: 8.9px; font-weight: 600; letter-spacing: .2px; }
.ax-ph__sub { display: flex; align-items: center; gap: 6px; margin-top: 5px; font-size: 11.1px; color: #323130; }
.ax-ph__sub svg { width: 13px; height: 13px; color: #107c10; }
.ax-block { display: inline-flex; align-items: center; gap: 6px; height: 25.5px; padding: 0 11px; border: 1px solid #c8c6c4; border-radius: 4px; background: #fff; font-size: 11.1px; color: #242424; cursor: default; }
.ax-block svg { width: 13px; height: 13px; }

.ax-grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 19px; margin: 16px 0 3px; }
.ax-fld__l { font-size: 11.1px; font-weight: 600; margin-bottom: 3px; }
.ax-fld__v { font-size: 11.1px; color: #323130; }
.ax-link { color: #0078d4; text-decoration: none; }
.ax-link:hover { text-decoration: underline; }
.ax-showmore { color: #484644; font-weight: 600; text-decoration: underline; cursor: default; }
.ax-secblk { margin-top: 14px; }
.ax-secblk__h { font-size: 11.1px; font-weight: 600; margin-bottom: 5px; }
.ax-p { font-size: 11.1px; line-height: 15.9px; color: #323130; margin: 0; }
.ax-note { display: flex; gap: 6px; margin-top: 13px; font-size: 9.6px; line-height: 13px; color: #484644; }
.ax-note svg { width: 12px; height: 12px; flex-shrink: 0; margin-top: 1px; }

.ax-hr { height: 1px; background: #edebe9; margin: 16px 0; }
.ax-sec__hd { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 2px 0; }
.ax-sec__hd .ax-chev { color: #605e5c; display: inline-flex; }
.ax-sec__hd .ax-chev svg { width: 14px; height: 14px; }
.ax-sec__title { font-size: 12.7px; font-weight: 600; }
.ax-sec__body { display: none; padding-top: 11px; }
.ax-sec.is-open > .ax-sec__body { display: block; }

.ax-tools { display: grid; grid-template-columns: 1fr 1fr; gap: 19px; max-width: 414px; }
.ax-tools__l { font-size: 11.1px; font-weight: 600; margin-bottom: 6px; }
.ax-avail { display: inline-block; padding: 3px 9px; border-radius: 4px; background: #f5f5f5; font-size: 10.3px; color: #323130; margin-bottom: 9px; }
.ax-tgl { display: inline-flex; align-items: center; gap: 6px; font-size: 11.1px; color: #242424; }
.ax-tgl__sw { width: 32px; height: 16px; border-radius: 8px; background: #0078d4; position: relative; }
.ax-tgl__sw::after { content: ''; position: absolute; top: 2px; left: 18px; width: 12px; height: 12px; border-radius: 50%; background: #fff; }
.ax-toolrow { display: flex; align-items: center; gap: 19px; margin-top: 14px; }
.ax-btn2 { height: 25.5px; padding: 0 11px; border: 1px solid #d1d1d1; border-radius: 4px; background: #fff; font-size: 11.1px; font-weight: 600; color: #242424; cursor: default; }
.ax-linkbtn { color: #0078d4; font-size: 11.1px; cursor: default; }

.ax-skdesc { font-size: 11.1px; line-height: 15.9px; color: #323130; margin: 0 0 13px; }
.ax-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.ax-chip { position: relative; padding: 5px 9px; border-radius: 5px; background: #f5f5f5; font-size: 10.7px; color: #242424; cursor: pointer; }
.ax-chip:hover { background: #e9e8e6; }
/* Shared tooltip lives at pane level so it is never clipped by the scroll overflow. */
.ax-tip { position: absolute; display: none; width: 220px; box-sizing: border-box; background: #fff; color: #242424; font-size: 11px; line-height: 15px; padding: 8px 10px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.16), 0 0 1px rgba(0,0,0,.2); pointer-events: none; z-index: 40; }

.ax-skill { display: none; }
.ax-pane.is-skill .ax-pane__sections { display: none; }
.ax-pane.is-skill .ax-skill { display: block; }
.ax-skill__id { display: flex; align-items: center; gap: 6px; margin-bottom: 13px; color: #242424; }
.ax-skill__id svg { width: 16px; height: 16px; }
.ax-skill__name { font-size: 12.7px; line-height: 22px; font-weight: 600; color: #242424; }
.ax-skill__h { font-size: 11.1px; line-height: 15.9px; font-weight: 600; color: #323130; margin: 13px 0 3px; }
.ax-skill__id + .ax-skill__h { margin-top: 0; }
.ax-skill__sub { font-size: 11.1px; line-height: 15.9px; font-weight: 400; color: #484644; margin: 13px 0 0; }
.ax-skill__h + .ax-skill__sub { margin-top: 0; }
.ax-skill__p { font-size: 11.1px; line-height: 15.9px; color: #484644; margin: 0; }
.ax-skill__ul { margin: 0; padding-left: 16px; }
.ax-skill__ul li { font-size: 11.1px; line-height: 15.9px; color: #484644; }
.ax-skill__foot { margin-top: 19px; }
.ax-skill__cancel { height: 25.5px; padding: 5px 15px; border: none; border-radius: 4px; background: #e8e8e8; color: #323130; font-size: 11.1px; font-weight: 600; font-family: inherit; line-height: 16px; cursor: pointer; }
.ax-skill__cancel:hover { background: #dcdcdc; }

.ax-foot { font-size: 9.6px; line-height: 13px; color: #484644; margin-top: 19px; }
`;

function skillChips(): string {
  return SKILLS.map(function (s) {
    return '<span class="ax-chip" data-skill="' + s.name + '">' + s.name + '</span>';
  }).join('');
}
function pane(): string {
  let h = '<aside class="ax-pane" id="axPane">';
  h += '<div class="ax-pane__top"><button class="ax-pane__ibtn" id="axRefresh" aria-label="Refresh">' + REFRESH + '</button><button class="ax-pane__ibtn" id="axClose" aria-label="Close">' + CLOSE + '</button></div>';
  h += '<div class="ax-pane__scroll">';
  h += '<div class="ax-ph"><span class="ax-ph__logo" id="axPaneLogo">' + connLogo('linear-logo.png') + '<span class="ax-ph__pencil">' + EDIT + '</span></span>'
    + '<div class="ax-ph__meta"><div class="ax-ph__title"><span class="ax-ph__name" id="axPaneName">Linear</span><span class="ax-badge-mcp">MCP Server</span></div>'
    + '<div class="ax-ph__sub">' + CHECK + 'Ready<span>\u00b7</span>Developed by: <span id="axPaneDev">Linear</span></div></div>'
    + '<button class="ax-block">' + BLOCK + 'Block</button></div>';

  h += '<div class="ax-pane__sections">';
  h += '<div class="ax-grid3">'
    + '<div><div class="ax-fld__l">Available to</div><div class="ax-fld__v">Everyone <a class="ax-link" href="#" onclick="return false">Manage</a></div></div>'
    + '<div><div class="ax-fld__l">MCP URL</div><div class="ax-fld__v"><a class="ax-link" id="axPaneUrl" href="#" onclick="return false">https://mcp.lseg.app/mcp</a></div></div>'
    + '<div><div class="ax-fld__l">Category</div><div class="ax-fld__v" id="axPaneCat">Financial Services</div></div>'
    + '</div>';
  h += '<div class="ax-secblk"><div class="ax-secblk__h">About</div><p class="ax-p">Provides real-time access to LSEG\u2019s comprehensive financial market data ecosystem, spanning across asset classes and domains. It enables seamless integration of institutional-grade market data, analytics, and valuation to\u2026 <a class="ax-showmore" href="#" onclick="return false">Show more</a></p></div>';
  h += '<div class="ax-note">' + INFO + '<span>Only use connectors from trusted developers. Microsoft does not control which tools MCP owner makes available and cannot verify that they will work as intended or that they won\u2019t change.</span></div>';

  h += '<div class="ax-hr"></div>';
  h += '<div class="ax-sec is-open" id="axSecTools"><div class="ax-sec__hd" data-sec="Tools"><span class="ax-chev">' + CHEV_D + '</span><span class="ax-sec__title">Tools</span></div>'
    + '<div class="ax-sec__body">'
    + '<div class="ax-tools"><div><div class="ax-tools__l">Read/Search tools</div><span class="ax-avail">7 available</span><div><span class="ax-tgl"><span class="ax-tgl__sw"></span>Enabled</span></div></div>'
    + '<div><div class="ax-tools__l">Write/Delete tools</div><span class="ax-avail">19 available</span><div><span class="ax-tgl"><span class="ax-tgl__sw"></span>Enabled</span></div></div></div>'
    + '<div class="ax-toolrow"><button class="ax-btn2">Available tools</button><span class="ax-linkbtn">Sign in with new account</span></div>'
    + '<div class="ax-note">' + INFO + '<span>Any write or delete tools added by the developer later will be included automatically.</span></div>'
    + '</div></div>';

  h += '<div class="ax-hr"></div>';
  h += '<div class="ax-sec" id="axSecSkills"><div class="ax-sec__hd" data-sec="Skills"><span class="ax-chev">' + CHEV_R + '</span><span class="ax-sec__title">Skills</span></div>'
    + '<div class="ax-sec__body">'
    + '<p class="ax-skdesc">Connector skills let you link external services and automate workflows between platforms, defining how Copilot communicates with third-party apps.</p>'
    + '<div class="ax-chips">' + skillChips() + '</div>'
    + '</div></div>';

  h += '<div class="ax-hr"></div>';
  h += '<div class="ax-sec" id="axSecMcp"><div class="ax-sec__hd" data-sec="MCP details"><span class="ax-chev">' + CHEV_R + '</span><span class="ax-sec__title">MCP details</span></div>'
    + '<div class="ax-sec__body"><div class="ax-grid3"><div><div class="ax-fld__l">Transport</div><div class="ax-fld__v">Streamable HTTP</div></div><div><div class="ax-fld__l">Auth</div><div class="ax-fld__v">OAuth 2.1</div></div><div><div class="ax-fld__l">Version</div><div class="ax-fld__v">v1.4.0</div></div></div></div></div>';

  h += '<div class="ax-foot">By using Microsoft 365 Copilot Connectors, you agree to the <a class="ax-link" href="#" onclick="return false">Microsoft 365 Copilot Connectors: Terms of use.</a> You as data controller authorize Microsoft to create an index of third party data or otherwise send customer data and personal data to third-party services and retrieve third party data and import it into your Microsoft 365 tenant subject to your configurations.</div>';
  h += '</div>';

  h += '<div class="ax-skill" id="axSkill">'
    + '<div class="ax-hr"></div>'
    + '<div class="ax-skill__id">' + TERMINAL + '<span class="ax-skill__name" id="axSkillName">/filings-digest</span></div>'
    + '<div class="ax-skill__h">About</div><p class="ax-skill__p" id="axSkillAbout"></p>'
    + '<div class="ax-skill__h">Instructions</div>'
    + '<div class="ax-skill__sub">Purpose</div><p class="ax-skill__p" id="axSkillPurpose"></p>'
    + '<div class="ax-skill__sub">Best uses</div><ul class="ax-skill__ul" id="axSkillBest"></ul>'
    + '<div class="ax-skill__sub">Skill setup</div><ul class="ax-skill__ul" id="axSkillSetup"></ul>'
    + '</div>';

  h += '</div>';
  h += '<div class="ax-skill-footer"><button class="ax-skill__cancel" id="axSkillCancel">Cancel</button></div>';
  h += '<div class="ax-tip" id="axTip"></div>';
  h += '</aside>';
  return h;
}

// ─── page + JS ──────────────────────────────────────────────
const SKILL_JSON = JSON.stringify(SKILLS);
const ROW_JSON = JSON.stringify(ROW_DATA.map(function (r) { return { name: r.name, dev: r.dev, cat: r.cat, url: r.url, logo: connLogo(r.logo) }; }));

let html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=1519"/><title>Connectors — Admin center</title><style>' + css + '</style></head><body>';
html += '<div class="ax">';
html += '<img class="ax-bg" src="' + BG + '" alt=""/>';
html += '<div class="ax-mcpstat">45</div>';
html += '<div class="ax-list" id="axList">';
ROW_DATA.forEach(function (r, i) {
  html += '<div class="ax-lrow" data-i="' + i + '">';
  html += '<div class="ax-lc ax-lc--logo"><span class="ax-llogo">' + connLogoInner(r.logo) + '</span></div>';
  html += '<div class="ax-lc ax-lc--name">' + r.name + ((r as { isNew?: boolean }).isNew ? '<span class="ax-lnew"></span>' : '') + '</div>';
  html += '<div class="ax-lc ax-lc--conn">' + r.conn + '</div>';
  html += '<div class="ax-lc ax-lc--state">' + CHECK + 'Ready</div>';
  html += '<div class="ax-lc ax-lc--type"><span class="ax-lmcp">MCP</span></div>';
  html += '<div class="ax-lc ax-lc--wdt">' + CHECK + 'Enabled</div>';
  html += '<div class="ax-lc ax-lc--sync">Live</div>';
  html += '</div>';
});
html += '</div>';
html += pane();
html += '</div>';

html += '<script>(function(){';
html += 'var SKILLS=' + SKILL_JSON + ';var ROWS=' + ROW_JSON + ';';
html += 'var pane=document.getElementById("axPane");';
html += 'document.querySelectorAll(".ax-lrow").forEach(function(hot){hot.addEventListener("click",function(){var i=+hot.getAttribute("data-i");var c=ROWS[i];if(!c)return;';
html += 'document.querySelectorAll(".ax-lrow").forEach(function(x){x.classList.remove("is-active");});hot.classList.add("is-active");';
html += 'document.getElementById("axPaneName").textContent=c.name;document.getElementById("axPaneDev").textContent=c.dev;document.getElementById("axPaneCat").textContent=c.cat;';
html += 'document.getElementById("axPaneUrl").textContent=c.url;document.getElementById("axPaneLogo").innerHTML=c.logo+' + JSON.stringify('<span class="ax-ph__pencil">' + EDIT + '</span>') + ';';
html += 'pane.classList.remove("is-skill");pane.classList.add("is-open");var sc=pane.querySelector(".ax-pane__scroll");if(sc)sc.scrollTop=0;});});';
html += 'document.getElementById("axClose").addEventListener("click",function(){pane.classList.remove("is-open");document.querySelectorAll(".ax-lrow").forEach(function(x){x.classList.remove("is-active");});});';
html += 'pane.querySelectorAll(".ax-sec__hd").forEach(function(hd){hd.addEventListener("click",function(){var sec=hd.closest(".ax-sec");var open=sec.classList.toggle("is-open");var ch=hd.querySelector(".ax-chev");if(ch)ch.innerHTML=open?' + JSON.stringify(CHEV_D) + ':' + JSON.stringify(CHEV_R) + ';});});';
html += 'var INSTR_BEST=["Ask Copilot to run {s} directly from a conversation","Kick it off from a related item, thread, or page","Chain it after a search so Copilot acts on exactly what it finds","Schedule it as a recurring digest, standup, or status update"];';
html += 'var INSTR_SETUP=["Connect the source and sign in with an account that has access","Grant Copilot read access to the data this skill needs","Choose the scope \u2014 which projects, channels, spaces, or folders to include","Pick a cadence: on demand, scheduled, or triggered by an event","Invoke it any time by typing {s} in the prompt box"];';
html += 'pane.querySelectorAll(".ax-chip").forEach(function(chip){chip.addEventListener("click",function(){var nm=chip.getAttribute("data-skill");var sk=SKILLS.filter(function(x){return x.name===nm;})[0]||{name:nm,desc:""};';
html += 'document.getElementById("axSkillName").textContent=nm;document.getElementById("axSkillAbout").textContent=sk.desc;';
html += 'document.getElementById("axSkillPurpose").textContent="The "+nm+" skill turns your connected data into a ready-to-use result. It searches the relevant records, grounds everything it produces in what it finds, and cites the sources it used so you can verify the output before you act on it.";';
html += 'document.getElementById("axSkillBest").innerHTML=INSTR_BEST.map(function(t){return "<li>"+t.replace("{s}",nm)+"</li>";}).join("");';
html += 'document.getElementById("axSkillSetup").innerHTML=INSTR_SETUP.map(function(t){return "<li>"+t.replace("{s}",nm)+"</li>";}).join("");';
html += 'pane.classList.add("is-skill");var sc=pane.querySelector(".ax-pane__scroll");if(sc)sc.scrollTop=0;});});';
html += 'document.getElementById("axSkillCancel").addEventListener("click",function(){pane.classList.remove("is-skill");var sc=pane.querySelector(".ax-pane__scroll");if(sc)sc.scrollTop=0;});';
html += 'var axTip=document.getElementById("axTip");';
html += 'pane.querySelectorAll(".ax-chip").forEach(function(chip){';
html += 'chip.addEventListener("mouseenter",function(){var nm=chip.getAttribute("data-skill");var sk=SKILLS.filter(function(x){return x.name===nm;})[0];if(!sk)return;';
html += 'axTip.textContent=sk.desc;axTip.style.display="block";';
html += 'var cr=chip.getBoundingClientRect();var pr=pane.getBoundingClientRect();var tw=axTip.offsetWidth;var th=axTip.offsetHeight;';
html += 'var left=cr.left-pr.left+cr.width/2-tw/2;left=Math.max(8,Math.min(left,pr.width-tw-8));';
html += 'var top=cr.top-pr.top-th-8;if(top<8)top=cr.bottom-pr.top+8;';
html += 'axTip.style.left=left+"px";axTip.style.top=top+"px";});';
html += 'chip.addEventListener("mouseleave",function(){axTip.style.display="none";});});';
html += '})();</script>';
html += '</body></html>';

const outDir = path.join(here, '..', 'dist');
fs.writeFileSync(path.join(outDir, 'connectorSkillsAdminX.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'connectorSkillsAdminX.html') + ' (' + Math.round(html.length / 1024) + ' KB)');
