/**
 * CIQ Menu (Connector IQ / Skills palette) — Interactive HTML Preview
 *
 * The content + skills palette that opens below the composer (Figma Connector
 * Skills, node 32:66172 "/" variant + node 32:77514 list item). A pill Tablist
 * (All · Skills · Files · People · Meetings · Emails · Chats · Others) over a
 * scrolling list of MenuListItems. Two row layouts:
 *   • Content/file item  — icon + label + trailing timestamp  (Secondary=Right)
 *   • Skill item ("/")   — icon + "/name" title over description (Secondary=Under)
 *
 * Selecting a row attaches it above the composer (reuses the attachment pill).
 * Composes: tabList + tab (pill), menuListItem, attachmentPill / skillAttachment.
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function ico(name: string): string {
  try {
    return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8')
      .replace(/\n/g, '').replace(/ (width|height)="\d+"/g, '')
      .replace(/fill="#[0-9a-fA-F]{6}"/g, 'fill="currentColor"');
  } catch (e) { return ''; }
}
function raw(name: string): string {
  try { return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8').replace(/\n/g, '').replace(/ (width|height)="\d+"/g, ''); }
  catch (e) { return ''; }
}
function logoImg(file: string): string {
  try { return 'data:image/png;base64,' + fs.readFileSync(path.join(iconsDir, file)).toString('base64'); }
  catch (e) { return ''; }
}

const CONFLUENCE = '<img src="' + logoImg('confluence-logo.png') + '" alt=""/>';
const CALENDAR = ico('calendar-ltr-20-regular');
const PERSON = ico('person-20-regular');
const CHAT = ico('chat-20-regular');
const MAIL = ico('mention-20-regular');
const PPTX = raw('powerpoint-20-color');
const DOCX = raw('word-20-color');
const XLSX = raw('excel-20-color');
const DISMISS = ico('dismiss-20-regular');
const SEARCH = ico('search-20-regular');
const MIC = ico('mic-20-regular');
const ADD = ico('add-20-regular');
const ARROW_UP = ico('arrow-up-20-regular');

// ─── Data ───────────────────────────────────────────────────
// Skills (slash commands) surfaced on the Skills tab and by typing "/".
type Row = { icon: string; title: string; sub: string; kind: 'skill' | 'content' };
const SKILLS: Row[] = [
  { icon: CONFLUENCE, title: '/space-digest', sub: 'Summarize a Confluence space into a structured digest of key decisions, owners, and open questions', kind: 'skill' },
  { icon: CONFLUENCE, title: '/page-from-template', sub: 'Create and publish a new Confluence page from a template (meeting notes, PRD, retro, decision log)', kind: 'skill' },
  { icon: CALENDAR, title: '/calendar-management', sub: 'Find open time, propose agendas, and manage invites across your connected calendars', kind: 'skill' },
  { icon: CONFLUENCE, title: '/label-cleanup', sub: 'Audit and normalize labels across a Confluence space so content stays discoverable', kind: 'skill' },
];
const FILES: Row[] = [
  { icon: PPTX, title: 'Leading the way with Brew Fusion', sub: 'Opened yesterday', kind: 'content' },
  { icon: DOCX, title: 'Q3 Product Requirements', sub: 'Edited 2 days ago', kind: 'content' },
  { icon: XLSX, title: 'FY25 Revenue model', sub: 'Opened last week', kind: 'content' },
];
const PEOPLE: Row[] = [
  { icon: PERSON, title: 'Priya Natarajan', sub: 'Product Manager', kind: 'content' },
  { icon: PERSON, title: 'Marcus Webb', sub: 'Engineering Lead', kind: 'content' },
];
const MEETINGS: Row[] = [
  { icon: CALENDAR, title: 'Brew Fusion launch sync', sub: 'Tomorrow · 10:00 AM', kind: 'content' },
  { icon: CALENDAR, title: 'Weekly product review', sub: 'Friday · 2:00 PM', kind: 'content' },
];
const EMAILS: Row[] = [
  { icon: MAIL, title: 'Re: Launch checklist', sub: 'From Priya · yesterday', kind: 'content' },
  { icon: MAIL, title: 'Budget approval needed', sub: 'From Finance · 3 days ago', kind: 'content' },
];
const CHATS: Row[] = [
  { icon: CHAT, title: 'Escalation trends', sub: 'Last message today', kind: 'content' },
  { icon: CHAT, title: 'Market analysis and trends', sub: 'Last message 2 days ago', kind: 'content' },
];
const TABS: { id: string; label: string; rows: Row[] }[] = [
  { id: 'all', label: 'All', rows: [SKILLS[0]!, FILES[0]!, PEOPLE[0]!, MEETINGS[0]!, CHATS[0]!] },
  { id: 'skills', label: 'Skills', rows: SKILLS },
  { id: 'files', label: 'Files', rows: FILES },
  { id: 'people', label: 'People', rows: PEOPLE },
  { id: 'meetings', label: 'Meetings', rows: MEETINGS },
  { id: 'emails', label: 'Emails', rows: EMAILS },
  { id: 'chats', label: 'Chats', rows: CHATS },
  { id: 'others', label: 'Others', rows: [FILES[1]!, PEOPLE[1]!] },
];

// ─── CSS ────────────────────────────────────────────────────
const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #fff; color: #242424; }
.frame { width: 640px; max-width: 100%; margin: 0 auto; padding: 8px; }

/* Composer mock */
.cmp { position: relative; width: 100%; background: #fff; border: 1px solid #dedede; border-radius: 26px; padding: 12px 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.cmp__pills { display: none; flex-wrap: wrap; gap: 8px; padding: 4px 4px 10px; }
.cmp.has-pills .cmp__pills { display: flex; }
.cmp__row { display: flex; align-items: center; gap: 8px; }
.cmp__btn { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; border-radius: 9999px; background: transparent; color: #424242; cursor: pointer; flex-shrink: 0; }
.cmp__btn:hover { background: rgba(36,36,36,0.05); }
.cmp__btn svg { width: 20px; height: 20px; }
.cmp__ta { flex: 1; min-width: 0; border: none; outline: none; resize: none; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; background: transparent; padding: 6px 4px; }
.cmp__ta::placeholder { color: #6f6f6f; }
.cmp__send { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; border-radius: 9999px; background: #242424; color: #fff; cursor: pointer; flex-shrink: 0; }
.cmp__send svg { width: 20px; height: 20px; }

/* Attachment pill (reused) */
.pill { display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 4px 8px 4px 6px; border: 1px solid #dedede; border-radius: 8px; background: #fff; max-width: 220px; }
.pill__ico { display: inline-flex; width: 20px; height: 20px; flex-shrink: 0; }
.pill__ico img, .pill__ico svg { width: 20px; height: 20px; object-fit: contain; display: block; }
.pill__name { font-size: 14px; line-height: 20px; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pill__x { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border: none; background: transparent; color: #5d5d5d; cursor: pointer; flex-shrink: 0; }
.pill__x svg { width: 14px; height: 14px; }

/* CIQ menu (inline, no card) */
.ciq { display: flex; flex-direction: column; gap: 8px; width: 100%; align-items: flex-start; margin-top: 8px; padding: 0 4px; }
.ciq__tabs { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.ciq__tab { display: inline-flex; align-items: center; padding: 6px 12px; border: none; border-radius: 12px; background: transparent; color: #242424; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; cursor: pointer; transition: background 0.1s; white-space: nowrap; }
.ciq__tab:hover { background: rgba(36,36,36,0.04); }
.ciq__tab--sel { background: #242424; color: #fff; }
.ciq__tab--sel:hover { background: #313131; }
.ciq__list { display: flex; flex-direction: column; width: 100%; max-height: 208px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #c7c7c7 transparent; }
.ciq__list::-webkit-scrollbar { width: 8px; }
.ciq__list::-webkit-scrollbar-thumb { background: #c7c7c7; border-radius: 9999px; }
.ciq__item { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 12px; border: none; border-radius: 12px; background: transparent; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; }
.ciq__item:hover { background: rgba(36,36,36,0.04); }
.ciq__ico { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; flex-shrink: 0; color: #242424; }
.ciq__ico img, .ciq__ico svg { width: 20px; height: 20px; object-fit: contain; display: block; }
.ciq__body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.ciq__body--row { flex-direction: row; align-items: center; gap: 6px; }
.ciq__title { font-size: 14px; line-height: 20px; font-weight: 550; font-variation-settings: 'opsz' 8, 'wght' 550; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ciq__label { flex: 1; min-width: 0; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ciq__desc { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ciq__trail { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; flex-shrink: 0; }

/* Modal trigger */
.trigger-row { padding: 4px; }
.modal-trigger { display: inline-flex; align-items: center; height: 32px; padding: 0 14px; border: 1px solid #dedede; border-radius: 9999px; background: #fff; color: #242424; font-family: inherit; font-size: 13px; cursor: pointer; transition: background 0.1s; }
.modal-trigger:hover { background: #fcfcfc; }

/* CIQ menu — modal variant */
.ciqm-overlay { position: fixed; inset: 0; z-index: 50; background: rgba(0,0,0,0.15); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); display: none; align-items: center; justify-content: center; }
.ciqm-overlay.is-open { display: flex; }
.ciqm { width: 720px; max-width: calc(100vw - 48px); max-height: calc(100vh - 96px); background: #fff; border-radius: 24px; box-shadow: 0 0 2px 0 rgba(0,0,0,0.15), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08); padding: 24px 28px 20px; display: flex; flex-direction: column; gap: 16px; }
.ciqm__hdr { display: flex; align-items: center; justify-content: space-between; }
.ciqm__title { font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.ciqm__x { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s; }
.ciqm__x:hover { background: rgba(36,36,36,0.04); }
.ciqm__x svg { width: 20px; height: 20px; }
.ciqm__search { display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 16px; border: 1px solid #dedede; border-radius: 9999px; background: #fff; }
.ciqm__search svg { width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; }
.ciqm__search input { flex: 1; min-width: 0; border: none; outline: none; background: transparent; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; }
.ciqm__search input::placeholder { color: #6f6f6f; }
.ciqm__list { height: 360px; max-height: 360px; flex-shrink: 0; }
.ciqm__empty { padding: 24px 4px; font-size: 13px; line-height: 18px; color: #5d5d5d; text-align: center; }
`;

// ─── HTML ───────────────────────────────────────────────────
const composer = ''
  + '<div class="cmp" id="cmp">'
  + '<div class="cmp__pills" id="pills"></div>'
  + '<div class="cmp__row">'
  + '<button class="cmp__btn" title="Add">' + ADD + '</button>'
  + '<textarea class="cmp__ta" id="ta" rows="1" placeholder="Message Copilot — type / for skills"></textarea>'
  + '<button class="cmp__btn" title="Dictate">' + MIC + '</button>'
  + '<button class="cmp__send" title="Send">' + ARROW_UP + '</button>'
  + '</div></div>';

const tabsHtml = TABS.map(function (tb, i) {
  return '<button class="ciq__tab' + (i === 0 ? ' ciq__tab--sel' : '') + '" data-tab="' + tb.id + '">' + tb.label + '</button>';
}).join('');

const menu = ''
  + '<div class="ciq" id="ciq">'
  + '<div class="ciq__tabs" id="ciqTabs">' + tabsHtml + '</div>'
  + '<div class="ciq__list" id="ciqList"></div>'
  + '</div>';

const modalOverlay = ''
  + '<div class="ciqm-overlay" id="ciqmOverlay">'
  + '<div class="ciqm" role="dialog" aria-label="Add content">'
  + '<div class="ciqm__hdr"><span class="ciqm__title">Add content</span><button class="ciqm__x" id="ciqmClose" aria-label="Close">' + DISMISS + '</button></div>'
  + '<div class="ciqm__search">' + SEARCH + '<input type="text" id="ciqmSearch" placeholder="Search"/></div>'
  + '<div class="ciq__tabs" id="ciqmTabs"></div>'
  + '<div class="ciq__list ciqm__list" id="ciqmList"></div>'
  + '</div></div>';

const canvas = '<div class="frame">' + composer + '<div class="trigger-row"><button class="modal-trigger" id="openModal">Open “Add content” modal</button></div>' + menu + '</div>' + modalOverlay;

const js = ''
  + '<script>'
  + '(function(){'
  + '  var TABS = ' + JSON.stringify(TABS) + ';'
  + '  var list = document.getElementById(\'ciqList\');'
  + '  var pills = document.getElementById(\'pills\');'
  + '  var cmp = document.getElementById(\'cmp\');'
  + '  var DISMISS = ' + JSON.stringify(DISMISS) + ';'
  + '  function rowHtml(r){'
  + '    var body = r.kind === \'skill\''
  + '      ? \'<span class="ciq__body"><span class="ciq__title">\' + r.title + \'</span><span class="ciq__desc">\' + r.sub + \'</span></span>\''
  + '      : \'<span class="ciq__body ciq__body--row"><span class="ciq__label">\' + r.title + \'</span><span class="ciq__trail">\' + r.sub + \'</span></span>\';'
  + '    return \'<button class="ciq__item" data-title="\' + r.title.replace(/"/g, \'&quot;\') + \'">\' + \'<span class="ciq__ico">\' + r.icon + \'</span>\' + body + \'</button>\';'
  + '  }'
  + '  function paint(id){'
  + '    var tb = TABS.filter(function(x){ return x.id === id; })[0];'
  + '    if (!tb || !list) return;'
  + '    list.innerHTML = tb.rows.map(rowHtml).join(\'\');'
  + '    list.querySelectorAll(\'.ciq__item\').forEach(function(it, i){'
  + '      it.addEventListener(\'click\', function(){ attach(tb.rows[i]); });'
  + '    });'
  + '  }'
  + '  function attach(r){'
  + '    if (!pills || !cmp) return;'
  + '    var el = document.createElement(\'span\');'
  + '    el.className = \'pill\';'
  + '    el.innerHTML = \'<span class="pill__ico">\' + r.icon + \'</span><span class="pill__name">\' + r.title + \'</span><button class="pill__x" title="Remove">\' + DISMISS + \'</button>\';'
  + '    el.querySelector(\'.pill__x\').addEventListener(\'click\', function(){ el.remove(); if (!pills.children.length) cmp.classList.remove(\'has-pills\'); });'
  + '    pills.appendChild(el);'
  + '    cmp.classList.add(\'has-pills\');'
  + '  }'
  + '  document.getElementById(\'ciqTabs\').querySelectorAll(\'.ciq__tab\').forEach(function(t){'
  + '    t.addEventListener(\'click\', function(){'
  + '      document.querySelectorAll(\'.ciq__tab\').forEach(function(x){ x.classList.remove(\'ciq__tab--sel\'); });'
  + '      t.classList.add(\'ciq__tab--sel\');'
  + '      paint(t.getAttribute(\'data-tab\'));'
  + '    });'
  + '  });'
  + '  var ta = document.getElementById(\'ta\');'
  + '  if (ta) ta.addEventListener(\'input\', function(){'
  + '    if (/\\/[a-z-]*$/i.test(ta.value)) {'
  + '      document.querySelectorAll(\'.ciq__tab\').forEach(function(x){ x.classList.toggle(\'ciq__tab--sel\', x.getAttribute(\'data-tab\') === \'skills\'); });'
  + '      paint(\'skills\');'
  + '    }'
  + '  });'
  + '  var ciqmOv = document.getElementById(\'ciqmOverlay\'); var ciqmTabs = document.getElementById(\'ciqmTabs\'); var ciqmList = document.getElementById(\'ciqmList\'); var ciqmSearch = document.getElementById(\'ciqmSearch\'); var ciqmTab = \'all\';'
  + '  function ciqmPaint(){ var tb = TABS.filter(function(x){ return x.id === ciqmTab; })[0] || TABS[0]; ciqmTab = tb.id; ciqmTabs.innerHTML = TABS.map(function(x){ return \'<button class="ciq__tab\' + (x.id===tb.id?\' ciq__tab--sel\':\'\') + \'" data-tab="\' + x.id + \'">\' + x.label + \'</button>\'; }).join(\'\'); ciqmTabs.querySelectorAll(\'.ciq__tab\').forEach(function(t){ t.addEventListener(\'click\', function(){ ciqmTab = t.getAttribute(\'data-tab\'); ciqmPaint(); }); }); var q = (ciqmSearch.value||\'\').trim().toLowerCase(); var rows = tb.rows; if (q) rows = rows.filter(function(r){ return (r.title+\' \'+r.sub).toLowerCase().indexOf(q) !== -1; }); ciqmList.innerHTML = rows.length ? rows.map(rowHtml).join(\'\') : \'<div class="ciqm__empty">No results.</div>\'; ciqmList.querySelectorAll(\'.ciq__item\').forEach(function(it, i){ it.addEventListener(\'click\', function(){ attach(rows[i]); closeModal(); }); }); }'
  + '  function openModal(){ ciqmTab = \'all\'; ciqmSearch.value = \'\'; ciqmPaint(); ciqmOv.classList.add(\'is-open\'); setTimeout(function(){ ciqmSearch.focus(); }, 20); }'
  + '  function closeModal(){ ciqmOv.classList.remove(\'is-open\'); }'
  + '  document.getElementById(\'openModal\').addEventListener(\'click\', openModal);'
  + '  document.getElementById(\'ciqmClose\').addEventListener(\'click\', closeModal);'
  + '  ciqmOv.addEventListener(\'click\', function(e){ if (e.target === ciqmOv) closeModal(); });'
  + '  ciqmSearch.addEventListener(\'input\', ciqmPaint);'
  + '  document.addEventListener(\'keydown\', function(e){ if (e.key === \'Escape\') closeModal(); });'
  + '  paint(\'all\');'
  + '})();'
  + '</script>';

const hint = 'Two variants of the same palette. Inline (below the composer): type "/" to focus Skills; click a row to attach it as a pill. Modal ("Add content"): opens from the Add menu with a title + Search over the pill Tablist. Both use MenuListItem rows — content (label + timestamp) or skill (/name + description).';

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>CIQ Menu Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + '<div style="min-height:100vh;background:#fafafa;padding:64px 24px;display:flex;flex-direction:column;align-items:center;gap:24px">'
  + canvas
  + '<div style="max-width:640px;font:13px/1.6 \'Segoe UI\',sans-serif;color:#6f6f6f;text-align:center">' + hint + '</div>'
  + '</div>'
  + js
  + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'ciqMenu.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'ciqMenu.html'));
