/**
 * Side Nav — Interactive HTML Preview
 *
 * Ported from the One Copilot Desktop UI Kit (Side Nav page 318:24131;
 * expanded 4227:63888, collapsed 4227:105674, flyouts 4227:96245, me control
 * 4227:100223). WORK variant only (Personal skipped).
 *
 * Sections: Expanded (light + dark), Collapsed rail (light + dark), a Flyout
 * popover (Agents), and the Me control profile menu.
 *
 * Reused One Copilot primitives: Tab/TabList (Chat|Tasks), Button (icon-only
 * Subtle), Avatar, Menu/menuListItem + Divider (flyout / me control), Popover.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Icon loader (reads Fluent assets, forces currentColor) ─

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function ico(name: string): string {
  try {
    return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8')
      .replace(/\n/g, '')
      .replace(/ (width|height)="\d+"/g, '')
      .replace(/fill="#[0-9a-fA-F]{6}"/g, 'fill="currentColor"');
  } catch (e) {
    return '';
  }
}

const copilotLogo = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-3.5 0-5 2.2-5.6 4.4C4 8 3 9.7 3 11.6 3 14 4.8 16 7.4 16.4 8.2 18.6 10 20 12.2 20c3.4 0 5-2.2 5.6-4.4C20 15 21 13.3 21 11.4 21 9 19.2 7 16.6 6.6 15.8 4.4 14 3 12 3Z" fill="currentColor"/></svg>';

// ─── Row builders ───────────────────────────────────────────

function item(icon: string, label: string, opts?: { selected?: boolean; dot?: boolean; more?: boolean }): string {
  const cls = ['ni'];
  if (opts && opts.selected) cls.push('ni--selected');
  const dot = opts && opts.dot ? '<span class="ni__dot"></span>' : '';
  const more = opts && opts.more ? '<span class="ni__more">' + ico('more-horizontal-20-regular') + '</span>' : '';
  return '<button class="' + cls.join(' ') + '"><span class="ni__ico">' + icon + '</span>' + dot
    + '<span class="ni__label">' + label + '</span>' + more + '</button>';
}
function chat(label: string, opts?: { selected?: boolean; faded?: boolean }): string {
  const cls = ['ni', 'ni--chat'];
  if (opts && opts.selected) cls.push('ni--selected');
  if (opts && opts.faded) cls.push('ni--faded');
  return '<button class="' + cls.join(' ') + '"><span class="ni__label">' + label + '</span>'
    + '<span class="ni__more">' + ico('more-horizontal-20-regular') + '</span></button>';
}
function sectionHead(label: string): string { return '<div class="nsh">' + label + '</div>'; }

function meRow(): string {
  return '<button class="me"><span class="me__avatar"><img src="../../src/components/icons/avatar-user.png" alt="Elvia Atkins"/></span><span class="me__info"><span class="me__name">Elvia Atkins</span><span class="me__lic">M365 Copilot (Premium)</span></span></button>';
}

function tabPivot(theme: string): string {
  // [OC] .Nav/Mode Switcher — the default Segmented Switch (.ss), mode variant:
  // the active segment shows its label; the others collapse to 32px icons, with
  // a sliding white indicator under the active mode.
  const seg = (glyph: string, label: string, sel: boolean, i: number) =>
    '<button class="ss__seg' + (sel ? ' ss__seg--selected' : '') + '" data-i="' + i + '" aria-label="' + label + '">'
    + '<span class="ss__icon">' + glyph + '</span>'
    + '<span class="ss__label"><span class="ss__ghost">' + label + '</span><span class="ss__real">' + label + '</span></span>'
    + '</button>';
  return [
    '<div class="ntabs">',
    '<div class="ss ss--' + theme + ' ss--mode" data-selected="0">',
    '<span class="ss__indicator"></span>',
    seg(ico('chat-20-regular'), 'Chat', true, 0),
    seg(ico('cowork-20-regular'), 'Cowork', false, 1),
    seg(ico('autopilot-20-regular'), 'Autopilot', false, 2),
    seg(ico('code-20-regular'), 'Code', false, 3),
    '</div>',
    '</div>',
  ].join('');
}

// ─── Expanded nav ───────────────────────────────────────────

function expandedNav(theme: string): string {
  return [
    '<div class="nav nav--' + theme + '">',
    '<div class="nav__header"><span class="nav__wordmark">Copilot</span>',
    '<div class="nav__hicons">',
    '<button class="ntool ntool--dot" aria-label="New task">' + ico('checkmark-square-20-regular') + '</button>',
    '<button class="ntool" aria-label="Apps">' + ico('grid-dots-20-regular') + '</button>',
    '<button class="ntool" aria-label="Toggle panel">' + ico('panel-left-20-regular') + '</button>',
    '</div></div>',
    tabPivot(theme),
    '<div class="nav__body">',
    item(ico('compose-20-regular'), 'New chat'),
    item(ico('search-20-regular'), 'Search'),
    item(ico('library-20-regular'), 'Library'),
    item(ico('bot-20-regular'), 'Agents'),
    item(ico('notebook-20-regular'), 'Notebooks', { more: true }),
    sectionHead('Pinned'),
    item(ico('bot-20-regular'), 'Researcher', { selected: true, dot: true }),
    item(ico('chat-20-regular'), 'Employee Training Program'),
    item(ico('chat-20-regular'), 'Market analysis and trends'),
    sectionHead('Chats'),
    chat('Relocation benefits'),
    chat('Escalation trends'),
    chat('New capabilities in Copilot', { selected: true }),
    chat('Latest emails from manager'),
    chat('Market Analysis and Trends'),
    chat('Sales Forecast FY25'),
    chat('Marketing Strategy for Q3'),
    chat('Budget Allocation for New Proje\u2026', { faded: true }),
    '</div>',
    '<div class="nav__footer">' + meRow() + '</div>',
    '</div>',
  ].join('\n');
}

// ─── Collapsed rail ─────────────────────────────────────────

function collapsedRail(theme: string): string {
  const rbtn = (icon: string, sel?: boolean) => '<button class="cr__btn' + (sel ? ' cr__btn--sel' : '') + '">' + icon + '</button>';
  return [
    '<div class="cr nav--' + theme + '">',
    '<div class="cr__logo">' + copilotLogo + '</div>',
    rbtn(ico('chat-20-filled'), true),
    rbtn(ico('compose-20-regular')),
    rbtn(ico('search-20-regular')),
    rbtn(ico('library-20-regular')),
    rbtn(ico('bot-20-regular')),
    rbtn(ico('notebook-20-regular')),
    '<div class="cr__spacer"></div>',
    '<button class="cr__avatar">EA</button>',
    '</div>',
  ].join('\n');
}

// ─── Flyout popover (Agents) ────────────────────────────────

function flyout(): string {
  const row = (icon: string, label: string) => '<button class="fly__item"><span class="fly__ico">' + icon + '</span><span class="fly__label">' + label + '</span></button>';
  return [
    '<div class="fly">',
    '<button class="fly__item fly__item--head"><span class="fly__ico">' + ico('bot-20-regular') + '</span><span class="fly__label">Agent Builder</span></button>',
    '<div class="fly__div"></div>',
    row(ico('bot-20-regular'), 'Sales'),
    row(ico('bot-20-regular'), 'Admin Promoted'),
    row(ico('bot-20-regular'), 'Researcher'),
    row(ico('bot-20-regular'), 'Analyst'),
    row(ico('compose-20-regular'), 'Create'),
    row(ico('chat-20-regular'), 'Idea Coach'),
    row(ico('chat-20-regular'), 'Prompt Coach'),
    '</div>',
  ].join('\n');
}

// ─── Me control menu ────────────────────────────────────────

function meMenu(): string {
  const row = (label: string, chev?: boolean) => '<button class="mm__item"><span class="mm__label">' + label + '</span>' + (chev ? '<span class="mm__chev">' + ico('chevron-right-20-regular') + '</span>' : '') + '</button>';
  return [
    '<div class="mm">',
    '<button class="mm__profile"><span class="me__avatar"><img src="../../src/components/icons/avatar-user.png" alt="Elvia Atkins"/></span><span class="me__info"><span class="me__name">Elvia Atkins</span><span class="me__lic">eatkins@contoso.com</span></span><span class="mm__chev">' + ico('chevron-right-20-regular') + '</span></button>',
    '<div class="mm__div"></div>',
    row('Settings'),
    row('Recent pages'),
    row('Scheduled prompts'),
    row('Give feedback'),
    '<div class="mm__div"></div>',
    row('Download apps', true),
    '<div class="mm__links"><span>Privacy</span><span>Terms</span><span>FAQ</span></div>',
    '</div>',
  ].join('\n');
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 36px 0 12px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 24px; }
.wrap { max-width: 1040px; margin: 0 auto; }
.stage { display: flex; gap: 32px; align-items: flex-start; flex-wrap: wrap; }
svg { display: block; }

/* ─── Nav container ─── */
.nav { width: 280px; display: flex; flex-direction: column; background: #fcfcfc; border: 1px solid #ececec; border-radius: 12px; overflow: hidden; height: 660px; }
.nav__header { display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 8px; }
.nav__wordmark { font-size: 16px; font-weight: 600; color: #242424; padding-left: 4px; }
.nav__hicons, .ntabs__tools { display: flex; align-items: center; gap: 4px; }
.ntool { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border: none; border-radius: 12px; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s; }
.ntool:hover { background: rgba(36,36,36,0.06); }
.ntool svg { width: 20px; height: 20px; }
.ntool--dot::after { content: ''; position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 9999px; background: #242424; border: 1px solid #fcfcfc; }
.nav--dark .ntool--dot::after { border-color: #1f1f1f; background: #fff; }

/* Tab pivot */
.ntabs { display: flex; align-items: center; padding: 2px 8px 8px; border-bottom: 1px solid #ececec; }
/* [OC] Nav mode switcher — the default Segmented Switch (.ss), mode variant */
.ss { position: relative; display: inline-flex; align-items: stretch; gap: 4px; width: 100%; padding: 4px; background: rgba(0,0,0,0.05); border-radius: 12px; }
.ss__seg { position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; gap: 4px; min-width: 0; padding: 6px 12px; border: none; border-radius: 12px; background: transparent; cursor: pointer; color: #5d5d5d; transition: color 0.15s; font-family: inherit; }
.ss--mode .ss__seg { flex: 0 0 32px; width: 32px; padding: 6px; }
.ss--mode .ss__seg .ss__label { display: none; }
.ss--mode .ss__seg--selected { flex: 1 1 auto; width: auto; padding: 6px 12px; }
.ss--mode .ss__seg--selected .ss__label { display: inline-grid; }
.ss--mode .ss__seg--selected .ss__icon { display: none; }
.ss__seg:hover:not(.ss__seg--selected) { color: #242424; }
.ss__seg--selected { color: #242424; }
.ss__icon { display: inline-flex; width: 20px; height: 20px; flex-shrink: 0; }
.ss__icon svg { width: 20px; height: 20px; display: block; }
.ss__label { position: relative; display: inline-grid; }
.ss__ghost { visibility: hidden; grid-area: 1 / 1; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.ss__real { grid-area: 1 / 1; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; white-space: nowrap; }
.ss__seg--selected .ss__real { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.ss__indicator { position: absolute; z-index: 0; top: 4px; left: 4px; bottom: 4px; background: #fff; border: 1px solid #dedede; border-radius: 12px; box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.05); transition: transform 0.22s cubic-bezier(0.2,0,0,1), width 0.22s cubic-bezier(0.2,0,0,1); }

/* Body */
.nav__body { flex: 1 1 auto; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 1px; }
.nav__body::-webkit-scrollbar { width: 8px; }
.nav__body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 9999px; }

/* Nav item */
.ni { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 32px; padding: 6px 8px; border: none; border-radius: 8px; background: transparent; color: #242424; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; position: relative; }
.ni:hover { background: rgba(36,36,36,0.04); }
.ni__ico { display: inline-flex; width: 20px; height: 20px; color: #424242; flex-shrink: 0; }
.ni__ico svg { width: 20px; height: 20px; }
.ni__label { flex: 1 1 auto; min-width: 0; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ni__dot { position: absolute; left: 3px; top: 50%; transform: translateY(-50%); width: 6px; height: 6px; border-radius: 9999px; background: #367af2; }
.ni__more { display: none; width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; }
.ni__more svg { width: 20px; height: 20px; }
.ni:hover .ni__more { display: inline-flex; }
.ni--selected { background: #ebebeb; }
.ni--selected .ni__label { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.ni--selected:hover { background: #e4e4e4; }
.ni--chat { padding-left: 8px; }
.ni--chat .ni__label { color: #424242; }
.ni--faded .ni__label { color: #a0a0a0; }

/* Section header */
.nsh { font-size: 12px; line-height: 16px; font-weight: 420; color: #6f6f6f; padding: 12px 8px 4px; }

/* Me control footer */
.nav__footer { border-top: 1px solid #ececec; padding: 8px; }
.me { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; border: none; border-radius: 8px; background: transparent; cursor: pointer; transition: background 0.1s; }
.me:hover { background: rgba(36,36,36,0.04); }
.me__avatar { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 9999px; background: #6b4fbb; color: #fff; font-size: 11px; font-weight: 600; flex-shrink: 0; overflow: hidden; }
.me__avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.me__info { display: flex; flex-direction: column; min-width: 0; text-align: left; }
.me__name { font-size: 13px; line-height: 16px; font-weight: 625; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.me__lic { font-size: 10px; line-height: 14px; color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* ─── Collapsed rail ─── */
.cr { width: 56px; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 12px 0; background: #fcfcfc; border: 1px solid #ececec; border-radius: 12px; height: 660px; }
.cr__logo { display: inline-flex; width: 32px; height: 32px; color: #242424; margin-bottom: 8px; }
.cr__logo svg { width: 28px; height: 28px; }
.cr__btn { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; padding: 10px; border: none; border-radius: 12px; background: transparent; color: #424242; cursor: pointer; transition: background 0.1s; }
.cr__btn:hover { background: rgba(36,36,36,0.06); }
.cr__btn svg { width: 20px; height: 20px; }
.cr__btn--sel { background: #ebebeb; color: #242424; }
.cr__spacer { flex: 1 1 auto; }
.cr__avatar { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 9999px; background: #6b4fbb; color: #fff; font-size: 12px; font-weight: 600; border: none; cursor: pointer; }

/* ─── Flyout popover ─── */
.fly, .mm { width: 260px; background: #fff; border: 1px solid #dedede; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12), 0 0 2px rgba(0,0,0,0.06); padding: 4px; }
.fly__item, .mm__item { display: flex; align-items: center; gap: 8px; width: 100%; padding: 8px; border: none; border-radius: 8px; background: transparent; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; }
.fly__item:hover, .mm__item:hover { background: rgba(36,36,36,0.04); }
.fly__ico, .mm__ico { display: inline-flex; width: 20px; height: 20px; color: #424242; flex-shrink: 0; }
.fly__ico svg, .mm__ico svg { width: 20px; height: 20px; }
.fly__label, .mm__label { flex: 1 1 auto; font-size: 14px; line-height: 20px; color: #242424; }
.fly__item--head .fly__label { font-weight: 625; }
.fly__div, .mm__div { height: 1px; background: #ececec; margin: 4px 0; }
.mm__chev { display: inline-flex; width: 16px; height: 16px; color: #424242; }
.mm__chev svg { width: 16px; height: 16px; }
/* Me menu — Figma Account Switcher (272px, Shadow/Higher) */
.mm { width: 272px; border-radius: 16px; padding: 8px; display: flex; flex-direction: column; gap: 8px; border-color: rgba(36,36,36,0); box-shadow: 0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.03), 0 16px 24px rgba(0,0,0,0.08); }
.mm__profile { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 12px; border: none; border-radius: 8px; background: transparent; cursor: pointer; }
.mm__profile .me__info { flex: 1 1 auto; }
.mm__profile .me__avatar { width: 40px; height: 40px; font-size: 14px; }
.mm__profile .me__name { font-size: 14px; line-height: 20px; font-weight: 625; }
.mm__profile .me__lic { font-size: 12px; line-height: 16px; color: #5d5d5d; }
.mm__profile:hover { background: rgba(36,36,36,0.04); }
.mm__item { padding: 10px 12px; gap: 6px; }
.mm__label { font-weight: 420; }
.mm__div { background: rgba(189,189,189,0.5); margin: 0; width: 100%; }
.mm__links { display: flex; align-items: center; justify-content: center; gap: 16px; min-height: 40px; padding: 0 12px; }
.mm__links span { font-size: 12px; line-height: 16px; color: #5d5d5d; cursor: pointer; }
.mm__links span:hover { color: #242424; text-decoration: underline; }

/* ─── Dark theme ─── */
.nav--dark, .cr.nav--dark { background: #1f1f1f; border-color: #333; }
.nav--dark .nav__header, .nav--dark .ntabs, .nav--dark .nav__footer { border-color: #333; }
.nav--dark .nav__wordmark, .nav--dark .me__name { color: #fff; }
.nav--dark .ntool, .nav--dark .ni__ico { color: #c7c7c7; }
.nav--dark .ntool:hover { background: rgba(255,255,255,0.08); }
.nav--dark .ntab { color: #dedede; }
.nav--dark .ntab:hover { background: rgba(255,255,255,0.06); }
.nav--dark .ntab--sel { background: rgba(255,255,255,0.12); color: #fff; }
.ss--dark { background: rgba(255,255,255,0.06); }
.ss--dark .ss__seg { color: #adadad; }
.ss--dark .ss__seg:hover:not(.ss__seg--selected) { color: #fff; }
.ss--dark .ss__seg--selected { color: #fff; }
.ss--dark .ss__indicator { background: #3b3b3b; border-color: rgba(255,255,255,0.08); }
.nav--dark .ni { color: #dedede; }
.nav--dark .ni:hover { background: rgba(255,255,255,0.06); }
.nav--dark .ni__label, .nav--dark .ni--chat .ni__label { color: #dedede; }
.nav--dark .ni--selected { background: rgba(255,255,255,0.12); }
.nav--dark .ni--faded .ni__label { color: #6f6f6f; }
.nav--dark .nsh { color: #a0a0a0; }
.nav--dark .me:hover { background: rgba(255,255,255,0.06); }
.cr.nav--dark .cr__logo { color: #fff; }
.cr.nav--dark .cr__btn { color: #c7c7c7; }
.cr.nav--dark .cr__btn:hover { background: rgba(255,255,255,0.08); }
.cr.nav--dark .cr__btn--sel { background: rgba(255,255,255,0.12); color: #fff; }

.flag { margin-top: 10px; font-size: 12px; color: #a93901; }
`;

// ─── Body ───────────────────────────────────────────────────

const body = [
  stage('<div style="display:flex;justify-content:center">' + expandedNav('light') + '</div>'),
  '<h2>Expanded \u2014 Work (light / dark)</h2>',
  '<div class="stage">' + expandedNav('light') + expandedNav('dark') + '</div>',

  '<h2>Collapsed rail \u2014 Work (light / dark)</h2>',
  '<div class="stage">' + collapsedRail('light') + collapsedRail('dark') + '</div>',

  '<h2>Flyout (Agents) \u00b7 Me control menu</h2>',
  '<div class="stage">' + flyout() + meMenu() + '</div>',
  '<p class="flag">Personal variant skipped. Flyout/Me-control reuse Menu + menuListItem + Divider + Popover; the Copilot logo glyph is a placeholder.</p>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Side Nav Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Side Nav \u2014 Component Preview</h1>'
  + '<p class="hint">One Copilot Side Nav (Work variant). Expanded and collapsed rail, plus a flyout and the Me control menu. Reuses Tab, Button, Avatar, and Menu primitives.</p>'
  + body + '</div>'
  + '<script>'
  + 'function ssLayout(ss){ var segs=ss.querySelectorAll(".ss__seg"); var sel=parseInt(ss.getAttribute("data-selected"),10)||0; var ind=ss.querySelector(".ss__indicator"); var t=segs[sel]; if(!t||!ind)return; ind.style.width=t.offsetWidth+"px"; ind.style.transform="translateX("+(t.offsetLeft-4)+"px)"; }'
  + 'function ssLayoutAll(){ document.querySelectorAll(".ss").forEach(ssLayout); }'
  + 'document.querySelectorAll(".ss").forEach(function(ss){ ss.querySelectorAll(".ss__seg").forEach(function(seg){ seg.addEventListener("click", function(){ ss.querySelectorAll(".ss__seg").forEach(function(s){ s.classList.remove("ss__seg--selected"); }); seg.classList.add("ss__seg--selected"); ss.setAttribute("data-selected", seg.getAttribute("data-i")); ssLayout(ss); }); }); });'
  + 'requestAnimationFrame(function(){ requestAnimationFrame(ssLayoutAll); });'
  + 'window.addEventListener("load", ssLayoutAll);'
  + 'window.addEventListener("resize", ssLayoutAll);'
  + '</script>'
  + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'nav.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
