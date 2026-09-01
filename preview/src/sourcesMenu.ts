/**
 * Sources Menu — Interactive HTML Preview  ("Change data sources")
 *
 * Aligned to the One Copilot Desktop UI Kit (Figma node 4096:12750).
 * Composes existing One Copilot primitives: Popover surface, header close
 * Button, search Input, MenuListItem rows (Source Menu item), Toggle switch,
 * and a footer MenuListItem — inside a 664×520 modal popover.
 *
 * Note: connector brand logos are not bundled as assets; where a real asset
 * isn't available a neutral colored logo tile stands in. Row geometry, type,
 * colors, and the toggle are exact to Figma.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Glyphs (Fluent UI System Icons, read from src/components/icons) ─────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function icon(file: string, size: number): string {
  return fs.readFileSync(path.join(iconsDir, file), 'utf-8')
    .replace(/<\?xml[^>]*>/, '')
    .replace(/width="\d+"/, 'width="' + size + '"')
    .replace(/height="\d+"/, 'height="' + size + '"')
    .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"')
    .trim();
}
const ICON_SEARCH = icon('search-20-regular.svg', 20);
const ICON_DISMISS = icon('dismiss-20-regular.svg', 20);
const ICON_MORE = icon('more-horizontal-20-regular.svg', 20);
const ICON_SETTINGS = icon('settings-20-regular.svg', 20);

// ─── Connector logos ────────────────────────────────────────
// Neutral colored tiles stand in for brand logos not bundled as assets.

function tile(bg: string, fg: string, initials: string): string {
  return '<span class="logo" style="background:' + bg + ';color:' + fg + '">' + initials + '</span>';
}
const LOGO = {
  m365: tile('linear-gradient(135deg,#e64a19 0 50%,#7cb342 50% 100%)', '#fff', ''),
  vscode: tile('#0a6cbc', '#fff', 'VS'),
  viva: tile('#7719aa', '#fff', 'Vi'),
  powerbi: tile('#e6a610', '#fff', 'BI'),
  figma: tile('#1e1e1e', '#fff', 'Fi'),
  gdrive: tile('#1fa463', '#fff', 'GD'),
};

// Real brand logos (PNGs bundled in src/components/icons) for the live modal.
function logoImg(file: string): string {
  return '<span class="logo"><img src="data:image/png;base64,' + fs.readFileSync(path.join(iconsDir, file)).toString('base64') + '" alt=""/></span>';
}
function glyphLogo(svg: string): string {
  return '<span class="logo logo--glyph">' + svg + '</span>';
}
type Conn = { logo: string; name: string; meta: string | null; t: Trailing };
const CONN: Conn[] = [
  { logo: glyphLogo(icon('apps-20-filled.svg', 20)), name: 'Microsoft 365 apps', meta: 'Chats, Emails, Meetings and more', t: { kind: 'toggle', on: true } },
  { logo: logoImg('hubspot-logo.png'), name: 'Hubspot', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('moodys-logo.png'), name: 'Moody\u2019s', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('lseg-logo.png'), name: 'London Stock Exchange Group', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('canva-logo.png'), name: 'Canva', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('google-calendar-logo.png'), name: 'Google Calendar', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('google-contacts-logo.png'), name: 'Google Contacts', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('notion-logo.png'), name: 'Notion', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('linear-logo.png'), name: 'Linear', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('intercom-logo.png'), name: 'Intercom', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('slack-logo.png'), name: 'Slack', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('github-logo.png'), name: 'GitHub', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('jira-logo.png'), name: 'Jira', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('confluence-logo.png'), name: 'Confluence', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('servicenow-logo.png'), name: 'ServiceNow', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('google-drive-logo.png'), name: 'Google Drive', meta: null, t: { kind: 'connect' } },
  { logo: logoImg('sp-global-logo.png'), name: 'S&P Global', meta: null, t: { kind: 'connect' } },
];

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #ececec; padding: 48px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 48px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 760px; margin: 0 auto; }
.stage { display: flex; justify-content: center; }

/* ─── Popover (modal) ─── */
.pop { width: 598px; min-height: 586px; background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 16px; padding: 28px; display: flex; flex-direction: column; gap: 16px;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08); }

/* Header */
.hdr { height: 32px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
.hdr__title { font-family: 'Segoe Sans','Segoe UI',system-ui,sans-serif; font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.hdr__actions { display: flex; align-items: center; gap: 4px; }
.hdr__manage { display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 8px; border: none; background: none; border-radius: 8px; font-family: 'Segoe Sans','Segoe UI',system-ui,sans-serif; font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; cursor: pointer; transition: background 0.1s; }
.hdr__manage:hover { background: rgba(36,36,36,0.04); }
.hdr__manage svg { display: block; width: 20px; height: 20px; }
.hdr__close { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: none; background: none; border-radius: 8px; color: #242424; cursor: pointer; transition: background 0.1s; }
.hdr__close:hover { background: rgba(36,36,36,0.04); }
.hdr__close svg { display: block; }

/* Search (Input primitive) */
.search { height: 40px; display: flex; align-items: center; gap: 8px; padding: 0 12px; border: 1px solid rgba(189,189,189,0.5); border-radius: 9999px; flex-shrink: 0; color: #6f6f6f; }
.search:focus-within { border-color: #242424; }
.search svg { display: block; flex-shrink: 0; }
.search input { flex: 1; border: none; outline: none; background: none; font-family: 'Segoe Sans','Segoe UI',system-ui,sans-serif; font-size: 14px; line-height: 20px; color: #242424; }
.search input::placeholder { color: #6f6f6f; }

/* Sub-header: source counter + Turn off all */
.subhdr { display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; padding: 2px 0; min-height: 28px; }
.subhdr__count { font-size: 12px; line-height: 16px; font-weight: 600; color: #5d5d5d; }
.subhdr__turnoff { font-size: 12px; line-height: 16px; font-weight: 420; color: #242424; background: none; border: none; padding: 4px 8px; border-radius: 8px; cursor: pointer; font-family: 'Segoe Sans','Segoe UI',system-ui,sans-serif; }
.subhdr__turnoff:hover { background: rgba(36,36,36,0.04); }
.subhdr__turnoff:disabled { color: #929292; cursor: not-allowed; background: none; }

/* List — 6 rows visible; the rest load on an infinite lazy scroll */
.list { display: flex; flex-direction: column; overflow-y: auto; max-height: 360px; margin: 0 -4px; padding: 0 4px; }
.loader { display: flex; align-items: center; justify-content: center; height: 56px; flex-shrink: 0; }
.loader[hidden] { display: none; }
.spin { width: 20px; height: 20px; border: 2px solid rgba(36,36,36,0.15); border-top-color: #242424; border-radius: 9999px; animation: smSpin 0.7s linear infinite; }
@keyframes smSpin { to { transform: rotate(360deg); } }

/* Source Menu item row (MenuListItem geometry) */
.smi { height: 56px; display: flex; align-items: center; flex-shrink: 0; border-bottom: 1px solid rgba(189,189,189,0.5); }
.smi__inner { flex: 1; display: flex; align-items: center; gap: 6px; min-width: 0; padding: 10px 12px; border-radius: 12px; background: rgba(36,36,36,0); transition: background 0.1s; }
.smi__inner:hover { background: rgba(36,36,36,0.04); }
.smi__label { flex: 1; min-width: 0; font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.smi__meta { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; flex-shrink: 0; }
.smi__connect { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; background: none; border: none; padding: 4px 8px; border-radius: 8px; cursor: pointer; flex-shrink: 0; }
.smi__connect:hover { background: rgba(36,36,36,0.04); }

/* Connector logo tile */
.logo { width: 20px; height: 20px; border-radius: 5px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 700; letter-spacing: 0; overflow: hidden; }
.logo img { width: 100%; height: 100%; object-fit: cover; }

/* Toggle (Toggle primitive: 32×16 track, 12 thumb) */
.tgl { width: 32px; height: 16px; border-radius: 9999px; position: relative; cursor: pointer; flex-shrink: 0; transition: background 0.15s, border-color 0.15s; border: 1px solid transparent; }
.tgl__thumb { width: 12px; height: 12px; border-radius: 9999px; position: absolute; top: 50%; transform: translateY(-50%); transition: left 0.15s, background 0.15s; }
.tgl--on { background: #242424; }
.tgl--on .tgl__thumb { background: #fff; left: 18px; }
.tgl--off { background: #fff; border-color: #dedede; }
.tgl--off .tgl__thumb { background: #6f6f6f; left: 2px; }

/* Footer MenuListItem */
.footer { height: 40px; display: flex; align-items: center; flex-shrink: 0; }
.footer__inner { flex: 1; display: flex; align-items: center; gap: 6px; padding: 10px 12px; border-radius: 12px; color: #242424; cursor: pointer; transition: background 0.1s; }
.footer__inner:hover { background: rgba(36,36,36,0.04); }
.footer__label { font-size: 14px; line-height: 20px; color: #242424; }
.footer svg { display: block; color: #242424; }

/* Variant grid */
.vgrid { display: grid; grid-template-columns: 180px 1fr; gap: 10px 16px; align-items: center; background: #fff; border: 1px solid #ececec; border-radius: 12px; padding: 24px; }
.vgrid__rl { font-size: 11px; font-weight: 600; color: #5d5d5d; }
.vcell { width: 100%; }
.logo--glyph { background: none !important; align-items: center; justify-content: center; color: #242424; }
.logo--glyph svg { width: 20px; height: 20px; }
`;

// ─── Builders ───────────────────────────────────────────────

function toggle(on: boolean): string {
  return '<span class="tgl tgl--' + (on ? 'on' : 'off') + '" role="switch" aria-checked="' + on + '" tabindex="0"><span class="tgl__thumb"></span></span>';
}

type Trailing = { kind: 'toggle'; on: boolean } | { kind: 'connect' };
function smi(logo: string, name: string, meta: string | null, trailing: Trailing): string {
  let inner = '<span class="logo-wrap">' + logo + '</span>';
  inner += '<span class="smi__label">' + name + '</span>';
  if (meta) inner += '<span class="smi__meta">' + meta + '</span>';
  if (trailing.kind === 'toggle') inner += toggle(trailing.on);
  else inner += '<button class="smi__connect">Connect</button>';
  return '<div class="smi"><div class="smi__inner">' + inner + '</div></div>';
}

// ─── Live modal ─────────────────────────────────────────────

const SM_MODEL = CONN.map(function (c) { return { n: c.name, logo: c.logo, meta: c.meta || '', state: c.t.kind === 'connect' ? 'connect' : (c.t.on ? 'on' : 'off') }; });

const modal = [
  '<div class="stage"><div class="pop" role="dialog" aria-label="Change sources">',
  '<div class="hdr"><span class="hdr__title">Change sources</span>',
  '<div class="hdr__actions">',
  '<button class="hdr__manage">' + ICON_SETTINGS + '<span>Manage sources</span></button>',
  '<button class="hdr__close" aria-label="Close">' + ICON_DISMISS + '</button></div></div>',
  '<div class="search">' + ICON_SEARCH + '<input type="text" id="smSearch" placeholder="Search" aria-label="Search sources"/></div>',
  '<div class="subhdr"><span class="subhdr__count" id="smCount">0 sources are on</span>',
  '<button class="subhdr__turnoff" id="smTurnOff">Turn off all</button></div>',
  '<div class="list" id="ciqList"><div class="loader" id="ciqLoader"><span class="spin"></span></div></div>',
  '</div></div>',
].join('\n');

// ─── Variant grid (Source Menu item states) ─────────────────

const variants = [
  '<div class="vgrid">',
  '<div class="vgrid__rl">On · with metadata</div>',
  '<div class="vcell">' + smi(LOGO.m365, 'Connector', 'Metadata', { kind: 'toggle', on: true }) + '</div>',
  '<div class="vgrid__rl">On · no metadata</div>',
  '<div class="vcell">' + smi(LOGO.vscode, 'Connector', null, { kind: 'toggle', on: true }) + '</div>',
  '<div class="vgrid__rl">Off · with metadata</div>',
  '<div class="vcell">' + smi(LOGO.viva, 'Connector', 'Metadata', { kind: 'toggle', on: false }) + '</div>',
  '<div class="vgrid__rl">Off · no metadata</div>',
  '<div class="vcell">' + smi(LOGO.powerbi, 'Connector', null, { kind: 'toggle', on: false }) + '</div>',
  '<div class="vgrid__rl">Not connected</div>',
  '<div class="vcell">' + smi(LOGO.figma, 'Connector', null, { kind: 'connect' }) + '</div>',
  '</div>',
].join('\n');

// ─── Page ───────────────────────────────────────────────────

const body = [
  '<div class="wrap">',
  '<h1>Sources Menu \u2014 Component Preview</h1>',
  '<p class="hint">"Change sources" modal, matching Figma Source Discovery (node 943:19731). Composes Popover + header Manage button + Input + source counter + MenuListItem rows + Toggle. Type to search; click a switch to toggle; click Connect to enable; Turn off all disables every source.</p>',
  stage(modal),
  '<h2>Source Menu item \u2014 states</h2>',
  variants,
  '<p class="hint" style="text-align:left;margin:12px 2px 0">6 sources are visible in the 360px viewport; the rest load on an infinite lazy scroll. Real brand logos are bundled from src/components/icons. Row geometry, type, colors, and the toggle match Figma exactly.</p>',
  '</div>',

  '<script>',
  '  document.querySelectorAll(".vgrid .tgl").forEach(function(t){',
  '    function flip(){ var on = t.classList.toggle("tgl--on"); t.classList.toggle("tgl--off", !on); t.setAttribute("aria-checked", on); }',
  '    t.addEventListener("click", flip);',
  '    t.addEventListener("keydown", function(e){ if(e.key===" "||e.key==="Enter"){ e.preventDefault(); flip(); } });',
  '  });',
  '  (function(){',
  '    var SM = ' + JSON.stringify(SM_MODEL) + ';',
  '    var list = document.getElementById("ciqList"); var loader = document.getElementById("ciqLoader");',
  '    var count = document.getElementById("smCount"); var turnOff = document.getElementById("smTurnOff"); var search = document.getElementById("smSearch");',
  '    var query = ""; var shown = 6; var loading = false;',
  '    function trailing(state){ if (state === "connect") return "<button class=\\"smi__connect\\">Connect</button>"; return "<span class=\\"tgl tgl--" + state + "\\" role=\\"switch\\" aria-checked=\\"" + (state === "on") + "\\" tabindex=\\"0\\"><span class=\\"tgl__thumb\\"></span></span>"; }',
  '    function rowHtml(item){ var meta = item.meta ? "<span class=\\"smi__meta\\">" + item.meta + "</span>" : ""; return "<div class=\\"smi\\" data-name=\\"" + item.n + "\\"><div class=\\"smi__inner\\"><span class=\\"logo-wrap\\">" + item.logo + "</span><span class=\\"smi__label\\">" + item.n + "</span>" + meta + trailing(item.state) + "</div></div>"; }',
  '    function updateCount(){ var n = 0; SM.forEach(function(x){ if (x.state === "on") n++; }); if (count) count.textContent = n === 1 ? "1 source is on" : n + " sources are on"; if (turnOff) turnOff.disabled = n === 0; }',
  '    function bind(){ list.querySelectorAll(".tgl").forEach(function(t){ if (t.__b) return; t.__b = 1; t.addEventListener("click", function(){ var row = t.closest(".smi"); var item = SM.filter(function(x){ return x.n === row.getAttribute("data-name"); })[0]; var on = t.classList.toggle("tgl--on"); t.classList.toggle("tgl--off", !on); t.setAttribute("aria-checked", on); if (item) item.state = on ? "on" : "off"; updateCount(); }); }); list.querySelectorAll(".smi__connect").forEach(function(b){ if (b.__b) return; b.__b = 1; b.addEventListener("click", function(){ var row = b.closest(".smi"); var item = SM.filter(function(x){ return x.n === row.getAttribute("data-name"); })[0]; if (item) item.state = "on"; var d = document.createElement("div"); d.innerHTML = trailing("on"); b.replaceWith(d.firstChild); bind(); updateCount(); }); }); }',
  '    function paint(){ if (!list) return; list.querySelectorAll(".smi").forEach(function(r){ r.remove(); }); var q = query.trim().toLowerCase(); var items = q ? SM.filter(function(x){ return x.n.toLowerCase().indexOf(q) !== -1; }) : SM.slice(0, shown); var frag = items.map(rowHtml).join(""); if (loader) loader.insertAdjacentHTML("beforebegin", frag); else list.insertAdjacentHTML("beforeend", frag); var more = !q && shown < SM.length; if (loader) loader.hidden = !more; bind(); updateCount(); }',
  '    function loadMore(){ if (loading || query.trim() || shown >= SM.length) return; loading = true; if (loader) loader.hidden = false; setTimeout(function(){ shown = Math.min(SM.length, shown + 3); loading = false; paint(); }, 500); }',
  '    if (list) list.addEventListener("scroll", function(){ if (list.scrollTop + list.clientHeight >= list.scrollHeight - 48) loadMore(); });',
  '    if (turnOff) turnOff.addEventListener("click", function(){ SM.forEach(function(x){ if (x.state === "on") x.state = "off"; }); paint(); });',
  '    if (search) search.addEventListener("input", function(){ query = this.value; if (!query.trim()) shown = 6; paint(); });',
  '    paint();',
  '  })();',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Sources Menu Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'sourcesMenu.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'sourcesMenu.html'));
