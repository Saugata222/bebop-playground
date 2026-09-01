/**
 * Settings v1.2 — Interactive HTML Preview
 *
 * Aligned to the Source Discovery file (Figma node 1774:45318, "Settings v2").
 * A separate compound from the v1 settingsModal — both are kept. Composes the
 * Dialog surface, a MenuListItem-based category sidebar + source rows, a
 * Dropdown ("Filter by"), an Input (search), and Dividers.
 *
 * Note: connector brand logos use bundled assets where available (Confluence,
 * GitHub, Notion, Microsoft 365) and neutral tiles otherwise (Box, Gong).
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Glyphs ─────────────────────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function icon(file: string, size: number, mono = true): string {
  let svg = fs.readFileSync(path.join(iconsDir, file), 'utf-8')
    .replace(/<\?xml[^>]*>/, '')
    .replace(/width="\d+"/, 'width="' + size + '"')
    .replace(/height="\d+"/, 'height="' + size + '"');
  if (mono) svg = svg.replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"');
  return svg.trim();
}
function logoImg(file: string): string {
  return '<img class="src__logoimg" src="../../src/components/icons/' + file + '" alt="" />';
}
const ICON_DISMISS = icon('dismiss-20-regular.svg', 20);
const ICON_SEARCH = icon('search-20-regular.svg', 20);
const ICON_CHEVDOWN = icon('chevron-down-20-regular.svg', 20);
const ICON_CHEVRIGHT = icon('chevron-right-20-regular.svg', 20);
const ICON_M365 = icon('microsoft-365-20-regular.svg', 20);
const CHECK = '<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7.03 13.9 3.56 10a.75.75 0 1 0-1.12 1l4 4.5a.75.75 0 0 0 1.1.03l10.5-10.5a.75.75 0 0 0-1.06-1.06L7.03 13.9Z" fill="currentColor"/></svg>';

function tile(bg: string, fg: string, initials: string): string {
  return '<span class="src__tile" style="background:' + bg + ';color:' + fg + '">' + initials + '</span>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #3a3a3a; padding: 48px 24px; color: #242424; }
h1 { font-size: 22px; font-weight: 600; text-align: center; margin-bottom: 8px; color: #fff; }
.hint { font-size: 13px; color: #bdbdbd; text-align: center; margin-bottom: 32px; }
.stage { display: flex; justify-content: center; }

/* Modal */
.sm { width: 720px; background: #fff; border-radius: 24px; padding: 28px;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08); }

/* Header */
.sm__hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.sm__title { font-family: 'Segoe Sans','Segoe UI',system-ui,sans-serif; font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.sm__close { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: none; background: none; border-radius: 8px; color: #242424; cursor: pointer; transition: background 0.1s; }
.sm__close:hover { background: rgba(36,36,36,0.04); }
.sm__close svg { display: block; }

/* Body */
.sm__body { display: flex; gap: 24px; }

/* Sidebar */
.sm__side { width: 150px; flex-shrink: 0; display: flex; flex-direction: column; gap: 2px; }
.side__item { display: flex; align-items: center; height: 32px; padding: 6px 12px; border: none; background: transparent; border-radius: 8px; font-size: 14px; line-height: 20px; font-weight: 420; color: #5d5d5d; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s, color 0.1s; }
.side__item:hover { background: rgba(36,36,36,0.04); color: #242424; }
.side__item--sel { background: #ebebeb; color: #242424; font-weight: 625; }
.side__item--sel:hover { background: #e4e4e4; }

/* Content pane */
.sm__content { flex: 1; min-width: 0; }
.content__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.content__title { font-size: 16px; line-height: 22px; font-weight: 600; color: #242424; }
.content__tools { display: flex; align-items: center; gap: 8px; }
/* Filter dropdown (Source Filter primitive) */
.flt { position: relative; }
.flt__trigger { display: inline-flex; align-items: center; gap: 4px; height: 32px; padding: 0 8px 0 12px; border: none; border-radius: 12px; background: rgba(36,36,36,0); font-size: 14px; line-height: 20px; color: #242424; cursor: pointer; background-color: transparent; font-family: inherit; white-space: nowrap; transition: background 0.1s; }
.flt__trigger:hover { background: rgba(36,36,36,0.04); }
.flt.is-open .flt__trigger { background: #ebebeb; }
.flt__trigger svg { width: 20px; height: 20px; color: #6f6f6f; transition: transform 0.12s; }
.flt.is-open .flt__trigger svg { transform: rotate(180deg); }
.flt__menu { position: absolute; top: calc(100% + 4px); left: 0; min-width: 168px; background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 12px; padding: 4px; box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08); opacity: 0; transform: translateY(-4px); pointer-events: none; transition: opacity 0.12s, transform 0.12s; z-index: 30; }
.flt.is-open .flt__menu { opacity: 1; transform: translateY(0); pointer-events: auto; }
.flt__item { display: flex; align-items: center; gap: 6px; width: 100%; height: 36px; padding: 8px 12px; border: none; background: transparent; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; cursor: pointer; text-align: left; transition: background 0.1s; }
.flt__item:hover { background: rgba(36,36,36,0.04); }
.flt__item--sel { background: #ebebeb; font-weight: 625; }
.flt__check { width: 16px; height: 16px; margin-left: auto; color: #242424; display: none; }
.flt__item--sel .flt__check { display: inline-flex; }
.src__empty { padding: 20px 8px; font-size: 13px; color: #5d5d5d; }
.search { display: flex; align-items: center; gap: 8px; height: 32px; width: 160px; padding: 0 10px; border: 1px solid #dedede; border-radius: 12px; color: #6f6f6f; }
.search:focus-within { border-color: #242424; }
.search svg { width: 20px; height: 20px; flex-shrink: 0; }
.search input { flex: 1; min-width: 0; border: none; outline: none; background: none; font-family: inherit; font-size: 14px; color: #242424; }
.search input::placeholder { color: #6f6f6f; }
.content__desc { font-size: 14px; line-height: 20px; color: #5d5d5d; padding: 0 0 16px; border-bottom: 1px solid #dedede; margin-bottom: 4px; }

/* Source rows */
.src { display: flex; align-items: center; gap: 12px; min-height: 56px; padding: 12px 8px; border-bottom: 1px solid #ededed; border-radius: 8px; cursor: pointer; transition: background 0.1s; }
.src:last-child { border-bottom: none; }
.src:hover { background: rgba(36,36,36,0.04); }
.src__logo { width: 20px; height: 20px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; color: #242424; }
.src__logo svg { width: 20px; height: 20px; display: block; }
.src__logoimg { width: 20px; height: 20px; object-fit: contain; display: block; }
.src__tile { width: 20px; height: 20px; border-radius: 5px; display: inline-flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 700; }
.src__text { flex: 1; min-width: 0; }
.src__name { font-size: 14px; line-height: 20px; color: #242424; }
.src__sub { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.src__chev { width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; display: inline-flex; }
.src__connect { font-size: 14px; line-height: 20px; color: #242424; background: none; border: none; padding: 4px 8px; border-radius: 8px; cursor: pointer; flex-shrink: 0; font-family: inherit; }
.src__connect:hover { background: rgba(36,36,36,0.06); }
`;

// ─── Builders ───────────────────────────────────────────────

const CATEGORIES = ['Startup', 'Personalization', 'Voice', 'Data controls', 'Notifications', 'Sources', 'Agents', 'Accounts', 'About', 'Internal tools'];
function sidebar(active: string): string {
  return CATEGORIES.map(function (c) {
    return '<button class="side__item' + (c === active ? ' side__item--sel' : '') + '">' + c + '</button>';
  }).join('');
}

type Trailing = { kind: 'chevron' } | { kind: 'connect' };
type Src = { logo: string; name: string; sub: string; cats: string[]; rec?: boolean; trailing: Trailing };
function srcRow(s: Src): string {
  let out = '<div class="src" data-cats="' + s.cats.join(',') + '" data-rec="' + (s.rec ? '1' : '0') + '"><span class="src__logo">' + s.logo + '</span>';
  out += '<span class="src__text"><span class="src__name">' + s.name + '</span><br><span class="src__sub">' + s.sub + '</span></span>';
  out += s.trailing.kind === 'chevron'
    ? '<span class="src__chev">' + ICON_CHEVRIGHT + '</span>'
    : '<button class="src__connect">Connect</button>';
  return out + '</div>';
}

const FILTER_CATS = ['Productivity', 'Development', 'Communication', 'Design', 'Finance', 'Sales'];
function filterControl(): string {
  const items = ['All'].concat(FILTER_CATS).map(function (c) {
    return '<button class="flt__item' + (c === 'All' ? ' flt__item--sel' : '') + '" data-cat="' + c + '">' + c + '<span class="flt__check">' + CHECK + '</span></button>';
  }).join('');
  return '<div class="flt" id="flt">'
    + '<button class="flt__trigger" id="fltTrigger" aria-haspopup="menu" aria-expanded="false"><span id="fltLabel">Filter by</span>' + ICON_CHEVDOWN + '</button>'
    + '<div class="flt__menu" role="menu">' + items + '</div></div>';
}

const SOURCES: Src[] = [
  { logo: ICON_M365, name: 'Microsoft 365 Apps', sub: 'Chats, Emails, Meetings, Sharepoint and more', cats: ['Productivity'], rec: true, trailing: { kind: 'chevron' } },
  { logo: tile('#0061d5', '#fff', 'b'), name: 'Box', sub: 'Store, share, and reference files across teams', cats: ['Productivity'], rec: true, trailing: { kind: 'chevron' } },
  { logo: tile('#7c3aed', '#fff', 'G'), name: 'Gong', sub: 'Reference call recordings and deal insights', cats: ['Sales'], rec: true, trailing: { kind: 'chevron' } },
  { logo: logoImg('notion-logo.png'), name: 'Notion', sub: 'Sync pages, databases, comments, and tasks from Notion.', cats: ['Productivity'], trailing: { kind: 'chevron' } },
  { logo: logoImg('confluence-logo.png'), name: 'Confluence', sub: 'Reference team wikis, docs, and knowledge base articles', cats: ['Productivity'], trailing: { kind: 'connect' } },
  { logo: logoImg('github-logo.png'), name: 'GitHub', sub: 'Reference repositories, issues, and pull requests across teams', cats: ['Development'], trailing: { kind: 'connect' } },
  { logo: logoImg('jira-logo.png'), name: 'Jira', sub: 'Track issues, sprints, and project workflows', cats: ['Development'], trailing: { kind: 'connect' } },
  { logo: logoImg('slack-logo.png'), name: 'Slack', sub: 'Reference messages, channels, and shared files', cats: ['Communication'], trailing: { kind: 'connect' } },
  { logo: logoImg('intercom-logo.png'), name: 'Intercom', sub: 'Bring in customer conversations and support history', cats: ['Communication'], trailing: { kind: 'connect' } },
  { logo: logoImg('figma-logo.svg'), name: 'Figma', sub: 'Reference designs, prototypes, and comments', cats: ['Design'], trailing: { kind: 'connect' } },
  { logo: logoImg('canva-logo.png'), name: 'Canva', sub: 'Browse, summarize, and generate Canva designs', cats: ['Design'], trailing: { kind: 'connect' } },
  { logo: logoImg('hubspot-logo.png'), name: 'HubSpot', sub: 'Reference contacts, deals, and pipeline activity', cats: ['Sales'], trailing: { kind: 'connect' } },
  { logo: logoImg('moodys-logo.png'), name: "Moody's", sub: 'Reference credit ratings and financial research', cats: ['Finance'], trailing: { kind: 'connect' } },
  { logo: logoImg('lseg-logo.png'), name: 'LSEG', sub: 'Reference market data and financial analytics', cats: ['Finance'], trailing: { kind: 'connect' } },
  { logo: logoImg('sp-global-logo.png'), name: 'S&P Global', sub: 'Reference ratings, benchmarks, and market intelligence', cats: ['Finance'], trailing: { kind: 'connect' } },
];
const rows = SOURCES.map(srcRow).join('');

const modal = [
  '<div class="stage"><div class="sm" role="dialog" aria-label="Settings">',
  '<div class="sm__hdr"><span class="sm__title">Settings</span>',
  '<button class="sm__close" aria-label="Close">' + ICON_DISMISS + '</button></div>',
  '<div class="sm__body">',
  '<div class="sm__side">' + sidebar('Sources') + '</div>',
  '<div class="sm__content">',
  '<div class="content__head"><span class="content__title">Sources</span>',
  '<div class="content__tools">',
  filterControl(),
  '<div class="search">' + ICON_SEARCH + '<input type="text" id="smSearch" placeholder="Search" aria-label="Search sources"/></div>',
  '</div></div>',
  '<p class="content__desc">Add and manage the sources Copilot uses to find and retrieve content for you</p>',
  '<div class="src-list" id="srcList">' + rows + '</div>',
  '<div class="src__empty" id="srcEmpty" hidden>No sources match.</div>',
  '</div>',
  '</div>',
  '</div></div>',
].join('\n');

// ─── Page ───────────────────────────────────────────────────

const body = [
  '<div class="stage" style="display:block;max-width:840px;margin:0 auto">',
  '<h1>Settings v1.2 \u2014 Component Preview</h1>',
  '<p class="hint">One Copilot Settings (v1.2): a two-pane modal \u2014 category sidebar + content pane. Sources pane shown. Composes Dialog + MenuListItem + Dropdown + Input + Divider.</p>',
  '</div>',
  stage(modal),
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Settings v1.2 Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body
  + '<script>'
  + '(function(){'
  + '  var flt = document.getElementById("flt"); if (!flt) return;'
  + '  var trigger = document.getElementById("fltTrigger");'
  + '  var label = document.getElementById("fltLabel");'
  + '  var search = document.getElementById("smSearch");'
  + '  var list = document.getElementById("srcList");'
  + '  var empty = document.getElementById("srcEmpty");'
  + '  var activeCat = "All";'
  + '  trigger.addEventListener("click", function(e){ e.stopPropagation(); var open = flt.classList.toggle("is-open"); trigger.setAttribute("aria-expanded", open); });'
  + '  document.addEventListener("click", function(){ flt.classList.remove("is-open"); trigger.setAttribute("aria-expanded", false); });'
  + '  document.addEventListener("keydown", function(e){ if (e.key === "Escape" && flt.classList.contains("is-open")) { flt.classList.remove("is-open"); trigger.setAttribute("aria-expanded", false); trigger.focus(); } });'
  + '  window.addEventListener("scroll", function(){ if (flt.classList.contains("is-open")) { flt.classList.remove("is-open"); trigger.setAttribute("aria-expanded", false); } }, true);'
  + '  flt.querySelector(".flt__menu").addEventListener("click", function(e){ e.stopPropagation(); });'
  + '  flt.querySelectorAll(".flt__item").forEach(function(it){'
  + '    it.addEventListener("click", function(){'
  + '      activeCat = it.getAttribute("data-cat");'
  + '      flt.querySelectorAll(".flt__item").forEach(function(x){ x.classList.remove("flt__item--sel"); });'
  + '      it.classList.add("flt__item--sel");'
  + '      label.textContent = activeCat === "All" ? "Filter by" : activeCat;'
  + '      flt.classList.remove("is-open"); trigger.setAttribute("aria-expanded", false);'
  + '      paint();'
  + '    });'
  + '  });'
  + '  if (search) search.addEventListener("input", paint);'
  + '  function paint(){'
  + '    var q = (search ? search.value : "").trim().toLowerCase();'
  + '    var shown = 0;'
  + '    Array.prototype.forEach.call(list.querySelectorAll(".src"), function(row){'
  + '      var cats = (row.getAttribute("data-cats") || "").split(",");'
  + '      var rec = row.getAttribute("data-rec") === "1";'
  + '      var catOk = activeCat === "All" || (activeCat === "Recommended" ? rec : cats.indexOf(activeCat) !== -1);'
  + '      var qOk = !q || row.textContent.toLowerCase().indexOf(q) !== -1;'
  + '      var ok = catOk && qOk; row.hidden = !ok; if (ok) shown++;'
  + '    });'
  + '    if (empty) empty.hidden = shown !== 0;'
  + '  }'
  + '})();'
  + '</script>'
  + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'settingsV12.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'settingsV12.html'));
