/**
 * Cowork Skills — joined interactive prototype
 *
 * One Copilot / Bebop Design System. Recreates the C3 Copilot Cowork shell
 * (Figma XmAUVyAVozksK1AMMW2WFo) and wires the Skills experiment together:
 *   home  →  + add menu  →  Customize (Plugins | Skills)
 *          →  Plugin L2  →  Skill L2   (with back-nav)
 *
 * Data: chat sources reused as plugins (Installed = Jira / GitHub / Slack,
 * Blocked = Canva); skills are synthesized per plugin in the SKILL.md
 * "Use when…" style. Persona = Elvia Atkins · Microsoft 365 (Premium).
 *
 * Self-contained HTML → preview/dist/coworkShell.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { skillsFor, type ConnectorSkill } from './_skills';

// ─── Icon helper (fill → currentColor) ──────────────────────
const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function ico(name: string, size = 20): string {
  try {
    let svg = fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8')
      .replace(/<\?xml[^>]*>/, '')
      .replace(/width="\d+"/, 'width="' + size + '"')
      .replace(/height="\d+"/, 'height="' + size + '"')
      .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"');
    return svg.trim();
  } catch (e) {
    return '';
  }
}
function logo(file: string): string {
  return '../../src/components/icons/' + file;
}
// Raw icon (keeps original multi-color fills, e.g. Office app glyphs).
function icoRaw(name: string, size = 20): string {
  try {
    return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8')
      .replace(/<\?xml[^>]*>/, '')
      .replace(/width="\d+"/, 'width="' + size + '"')
      .replace(/height="\d+"/, 'height="' + size + '"')
      .trim();
  } catch (e) {
    return '';
  }
}
// Inline a Cowork illustration SVG (exact export from Figma node 49:40826) at its
// natural art size so it sits correctly inside the 48px illustration slot.
function ill(name: string): string {
  try {
    return fs.readFileSync(path.join(iconsDir, 'cowork', name + '.svg'), 'utf-8')
      .replace(/<\?xml[^>]*>/, '')
      .trim();
  } catch (e) {
    return '';
  }
}

// Inline glyphs for icons not in the set
const G_GRID = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><g fill="currentColor"><circle cx="5" cy="5" r="1.4"/><circle cx="10" cy="5" r="1.4"/><circle cx="15" cy="5" r="1.4"/><circle cx="5" cy="10" r="1.4"/><circle cx="10" cy="10" r="1.4"/><circle cx="15" cy="10" r="1.4"/><circle cx="5" cy="15" r="1.4"/><circle cx="10" cy="15" r="1.4"/><circle cx="15" cy="15" r="1.4"/></g></svg>';
const G_TASKS = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><g fill="currentColor"><path d="M6.25 5.5a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9ZM6.25 9.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9ZM5.5 13.75c0-.41.34-.75.75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Z"/><circle cx="3.4" cy="6.25" r="1"/><circle cx="3.4" cy="10" r="1"/><circle cx="3.4" cy="13.75" r="1"/></g></svg>';
const G_FILTER = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5.75A.75.75 0 0 1 3.75 5h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.75ZM5 10a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 5 10Zm2.75 3.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z" fill="currentColor"/></svg>';
const G_PLUG = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 3.75a.75.75 0 0 1 1.5 0V6h3V3.75a.75.75 0 0 1 1.5 0V6h.75a.75.75 0 0 1 0 1.5h-.25v2a3.5 3.5 0 0 1-2.75 3.42v2.33a.75.75 0 0 1-1.5 0v-2.33A3.5 3.5 0 0 1 6.5 9.5v-2h-.25a.75.75 0 0 1 0-1.5H7V3.75ZM8 7.5v2a2 2 0 1 0 4 0v-2H8Z" fill="currentColor"/></svg>';
const G_SCROLL = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 3.5A2.5 2.5 0 0 0 3.5 6v1.25c0 .41.34.75.75.75H6v6a2.5 2.5 0 0 0 2.5 2.5h6A2.5 2.5 0 0 0 17 14V5.5A2 2 0 0 0 15 3.5H6Zm8.5 1.5v9a1 1 0 0 1-2 0V6a2.49 2.49 0 0 0-.5-1.5h2.5ZM8 7h3.5v7a1 1 0 0 0 .5.87V15H8.5a1 1 0 0 1-1-1V7H8Z" fill="currentColor"/></svg>';
const G_SHIELD = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2.2 4 4.4v4.3c0 3.5 2.4 6.7 6 7.6 3.6-.9 6-4.1 6-7.6V4.4L10 2.2Z" fill="#eaf5ea"/><path d="M10 2.2 4 4.4v4.3c0 3.5 2.4 6.7 6 7.6 3.6-.9 6-4.1 6-7.6V4.4L10 2.2Zm3.1 4.3-3.7 4.6a.75.75 0 0 1-1.1.07L6.7 9.4A.75.75 0 0 1 7.7 8.3l1.3 1.2 3.1-3.9a.75.75 0 1 1 1.1.9Z" fill="#4a9a4a"/></svg>';
const COPILOT_MARK = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><defs><linearGradient id="cp" x1="2" y1="4" x2="18" y2="16" gradientUnits="userSpaceOnUse"><stop stop-color="#2AA5F4"/><stop offset=".5" stop-color="#7D5FF5"/><stop offset="1" stop-color="#E1568C"/></linearGradient></defs><path d="M10 3c-2.2 0-3.4 1.5-4 3.2C5.3 8.2 5 9.6 3.8 9.6c-.6 0-1 .3-1 .9 0 2.9 2.4 5.5 5.6 5.5 2.2 0 3.5-1.5 4.1-3.2.6-1.9.9-3.4 2.1-3.4.6 0 1-.4 1-1C15.6 5.5 13.2 3 10 3Z" fill="url(#cp)"/></svg>';
const G_LOCK = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2.5A3.25 3.25 0 0 0 6.75 5.75V7.5H6A1.5 1.5 0 0 0 4.5 9v6A1.5 1.5 0 0 0 6 16.5h8A1.5 1.5 0 0 0 15.5 15V9A1.5 1.5 0 0 0 14 7.5h-.75V5.75A3.25 3.25 0 0 0 10 2.5Zm1.75 5H8.25V5.75a1.75 1.75 0 1 1 3.5 0V7.5Z" fill="currentColor"/></svg>';
const G_EXPAND = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5.75c0-.41.34-.75.75-.75h3a.75.75 0 0 1 0 1.5H7.56l2.72 2.72a.75.75 0 1 1-1.06 1.06L6.5 7.56V8.75a.75.75 0 0 1-1.5 0v-3Zm9.25 8.25h-3a.75.75 0 0 1 0-1.5h1.19l-2.72-2.72a.75.75 0 1 1 1.06-1.06l2.72 2.72V10.25a.75.75 0 0 1 1.5 0v3a.75.75 0 0 1-.75.75Z" fill="currentColor"/></svg>';

const ICON = {
  open: ico('open-20-regular'),
  panel: ico('panel-left-20-regular'),
  newTask: ico('add-circle-20-regular'),
  scheduled: ico('clock-20-regular'),
  customize: ico('briefcase-20-regular'),
  mic: ico('mic-20-regular'),
  settings: ico('settings-20-regular'),
  more: ico('more-horizontal-20-regular'),
  info: ico('info-20-regular'),
  check: ico('checkmark-circle-20-regular'),
  add: ico('add-20-regular'),
  chevR: ico('chevron-right-20-regular'),
  chevD: ico('chevron-down-20-regular'),
  back: ico('arrow-left-20-regular'),
  dismiss: ico('dismiss-20-regular'),
  search: ico('search-20-regular'),
  doc: ico('document-20-regular'),
  sync: ico('arrow-sync-20-regular'),
  share: ico('share-20-regular'),
  apps: ico('apps-20-regular'),
  tasks: ico('task-list-square-ltr-20-regular'),
  filter: ico('filter-20-regular'),
  plug: ico('plug-connected-20-regular'),
  scroll: ico('text-bullet-list-square-20-regular'),
  script: ico('script-20-regular'),
  shield: ico('shield-task-20-regular'),
  mark: COPILOT_MARK,
  lock: ico('lock-closed-20-regular'),
  expand: ico('arrow-expand-20-regular'),
};

// ─── CSS ────────────────────────────────────────────────────
const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #fff; color: #242424; }
button { font-family: inherit; cursor: pointer; border: none; background: none; }
svg { display: block; }

/* Full-screen shell */
.shell { display: flex; height: 100vh; width: 100vw; background: #fff; overflow: hidden; }

/* ── Side Nav (One Copilot shell) ── */
.nav { width: 280px; flex-shrink: 0; display: flex; flex-direction: column; background: #fcfcfc; border-right: 1px solid #ececec; overflow: hidden; }
.nav__header { display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 8px; }
.nav__brand { display: inline-flex; align-items: center; gap: 8px; min-width: 0; }
.nav__logo { width: 26px; height: 26px; color: #242424; flex-shrink: 0; display: inline-flex; }
.nav__logo svg { width: 26px; height: 26px; }
.nav__wordmark { font-size: 16px; font-weight: 600; color: #242424; white-space: nowrap; }
.nav__hicons { display: flex; align-items: center; gap: 2px; }
.ntool { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 4px; border-radius: 8px; color: #424242; transition: background 0.1s; }
.ntool:hover { background: rgba(36,36,36,0.06); }
.ntool svg { width: 20px; height: 20px; }
.ntool--dot { position: relative; }
.ntool--dot::after { content: ''; position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 9999px; background: #242424; border: 1px solid #fcfcfc; }
.ntabs { display: flex; align-items: center; padding: 0 12px 8px; }
.ss { position: relative; display: inline-flex; align-items: stretch; gap: 4px; width: 100%; padding: 4px; background: rgba(0,0,0,0.05); border-radius: 12px; }
.ss__seg { position: relative; z-index: 1; display: inline-flex; align-items: center; justify-content: center; gap: 4px; min-width: 0; padding: 6px 12px; border-radius: 12px; background: transparent; color: #5d5d5d; transition: color 0.15s; }
.ss--mode .ss__seg { flex: 0 0 32px; width: 32px; padding: 6px; }
.ss--mode .ss__seg .ss__label { display: none; }
.ss--mode .ss__seg--selected { flex: 1 1 auto; width: auto; padding: 6px 12px; }
.ss--mode .ss__seg--selected .ss__label { display: inline-grid; }
.ss--mode .ss__seg--selected .ss__icon { display: none; }
.ss__seg:hover:not(.ss__seg--selected) { color: #242424; }
.ss__seg--selected { color: #242424; }
.ss__icon { display: inline-flex; width: 20px; height: 20px; flex-shrink: 0; }
.ss__icon svg { width: 20px; height: 20px; }
.ss__label { position: relative; display: inline-grid; }
.ss__ghost { visibility: hidden; grid-area: 1 / 1; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.ss__real { grid-area: 1 / 1; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; white-space: nowrap; }
.ss__seg--selected .ss__real { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.ss__indicator { position: absolute; z-index: 0; top: 4px; left: 4px; bottom: 4px; background: #fff; border: 1px solid #dedede; border-radius: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: transform 0.22s cubic-bezier(0.2,0,0,1), width 0.22s cubic-bezier(0.2,0,0,1); }
.nav__body { flex: 1 1 auto; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 1px; }
.nav__body::-webkit-scrollbar { width: 8px; }
.nav__body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 9999px; }
.ni { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 32px; padding: 6px 8px; border-radius: 8px; color: #242424; text-align: left; transition: background 0.1s; position: relative; }
.ni:hover { background: rgba(36,36,36,0.04); }
.ni__ico { display: inline-flex; width: 20px; height: 20px; color: #424242; flex-shrink: 0; }
.ni__ico svg { width: 20px; height: 20px; }
.ni__label { flex: 1 1 auto; min-width: 0; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ni__more { display: none; width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; }
.ni__more svg { width: 20px; height: 20px; }
.ni:hover .ni__more { display: inline-flex; }
.ni--selected { background: #ebebeb; }
.ni--selected .ni__label { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.ni--chat .ni__label { color: #424242; }
.nsh { font-size: 12px; line-height: 16px; color: #6f6f6f; padding: 12px 8px 4px; }
.nav__footer { border-top: 1px solid #ececec; padding: 8px; }
.me { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; border-radius: 8px; transition: background 0.1s; }
.me:hover { background: rgba(36,36,36,0.04); }
.me__avatar { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 9999px; background: #6b4fbb; color: #fff; font-size: 11px; font-weight: 600; flex-shrink: 0; overflow: hidden; }
.me__avatar img { width: 100%; height: 100%; object-fit: cover; }
.me__info { display: flex; flex-direction: column; min-width: 0; text-align: left; }
.me__name { font-size: 13px; line-height: 16px; font-weight: 600; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.me__lic { font-size: 10px; line-height: 14px; color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* Main */
.main { flex: 1; min-width: 0; display: flex; flex-direction: column; position: relative; }
.topbar { height: 48px; display: flex; align-items: center; gap: 8px; padding: 0 16px; flex-shrink: 0; }
.pill { display: inline-flex; align-items: center; height: 28px; padding: 0 12px; background: #f0f0f0; border-radius: 8px; font-size: 13px; font-weight: 600; color: #242424; }
.model { display: inline-flex; align-items: center; gap: 2px; height: 28px; padding: 0 6px 0 8px; border-radius: 8px; font-size: 13px; color: #242424; }
.model:hover { background: rgba(0,0,0,0.04); }
.model svg { width: 16px; height: 16px; color: #616161; }
.topbar__sp { flex: 1; }
.topbar__ic { width: 32px; height: 32px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; color: #444; }
.topbar__ic:hover { background: rgba(0,0,0,0.04); }
.topbar__ic svg { width: 20px; height: 20px; }
.topbar__ic--shield { color: #008455; }

.scroll { flex: 1; overflow-y: auto; min-height: 0; }
#route-home .scroll { display: flex; flex-direction: column; justify-content: center; }
.route { display: none; }
.route.is-active { display: flex; flex-direction: column; flex: 1 1 auto; min-height: 0; }
#route-home.is-active { display: flex; flex-direction: column; }

/* Home */
.home { max-width: 792px; width: 100%; margin: 0 auto; padding: 40px 24px; }
.home__hi { text-align: center; font-family: 'Segoe Serif', Georgia, 'Times New Roman', serif; font-size: 28px; line-height: 34px; font-weight: 400; color: #242424; margin: 0 0 24px; }
.composer { display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 8px 0 8px; background: #fff; border: 1px solid #e2e2e2; border-radius: 28px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.composer__add { width: 36px; height: 36px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: #242424; }
.composer__add:hover { background: rgba(0,0,0,0.06); }
.composer__add svg { width: 22px; height: 22px; }
.composer__in { flex: 1; min-width: 0; font-size: 15px; color: #1f1f1f; border: none; outline: none; background: transparent; font-family: inherit; }
.composer__in::placeholder { color: #6f6f6f; }
.composer__in--cmd { font-size: 16px; color: #242424; font-weight: 600; font-variation-settings: 'opsz' 8, 'wght' 600; }
.composer__mic { width: 36px; height: 36px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: #444; }
.composer__mic svg { width: 20px; height: 20px; }
.composer__send { width: 32px; height: 32px; border-radius: 9999px; background: #242424; color: #fff; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
.composer__send:hover { background: #2b2b2b; }
.composer__send svg { width: 20px; height: 20px; }
.composer__send[hidden] { display: none; }

/* Cowork CIQ menu — reuses the ciqMenu compound row/tab styles inside an elevated card */
.ccq { position: absolute; top: calc(100% + 8px); left: 0; right: 0; background: #fff; border: 1px solid #ededed; border-radius: 16px; box-shadow: 0 0 2px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12); padding: 12px; z-index: 40; }
.ccq[hidden] { display: none; }
.ciq__tabs { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; margin-bottom: 4px; }
.ciq__tab { display: inline-flex; align-items: center; padding: 6px 12px; border: none; border-radius: 12px; background: transparent; color: #242424; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; cursor: pointer; transition: background 0.1s; white-space: nowrap; }
.ciq__tab:hover { background: rgba(36,36,36,0.04); }
.ciq__tab--sel { background: #242424; color: #fff; }
.ciq__tab--sel:hover { background: #313131; }
.ciq__list { display: flex; flex-direction: column; width: 100%; height: 320px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #c7c7c7 transparent; }
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
.ciq__trail { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; flex-shrink: 0; margin-left: auto; }
.ccq__empty { padding: 16px; font-size: 13px; color: #6f6f6f; text-align: center; }
.composer-wrap { position: relative; }
.addmenu { position: absolute; top: 62px; left: 0; width: 216px; background: #fff; border: 1px solid rgba(0,0,0,0.04); border-radius: 8px; padding: 7px; box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.14); z-index: 40; }
.addmenu[hidden] { display: none; }
.addmenu__it { display: flex; align-items: center; gap: 12px; width: 100%; height: 36px; text-align: left; padding: 0 8px; border-radius: 6px; }
.addmenu__it:hover { background: rgba(0,0,0,0.04); }
.addmenu__it--two { height: 54px; }
.addmenu__ic { width: 20px; height: 20px; color: #242424; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; }
.addmenu__ic svg { width: 20px; height: 20px; }
.addmenu__x { display: flex; flex-direction: column; min-width: 0; }
.addmenu__t { font-size: 14px; line-height: 20px; color: #242424; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }
.addmenu__d { display: block; font-size: 12px; line-height: 16px; color: #6f6f6f; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }
.addmenu__div { height: 1px; background: #e5e5e5; margin: 7px 8px; }

.sect { margin-top: 28px; }
.sect__hd { display: flex; align-items: center; margin-bottom: 8px; }
.sect__t { font-size: 13px; font-weight: 600; color: #242424; flex: 1; }
.sect__more { font-size: 13px; color: #5d5d5d; }
.sect__more:hover { text-decoration: underline; }

.upcard { border: 1px solid #e8e8e8; border-radius: 10px; overflow: hidden; }
.uprow { display: flex; align-items: center; gap: 12px; padding: 14px 16px; }
.uprow + .uprow { border-top: 1px solid #efefef; }
.uprow__x { flex: 1; min-width: 0; }
.uprow__t { font-size: 14px; color: #242424; }
.uprow__s { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #6f6f6f; margin-top: 2px; }
.uprow__s svg { width: 14px; height: 14px; }
.tagchip { display: inline-flex; align-items: center; gap: 5px; height: 24px; padding: 0 8px; background: #f2f2f2; border-radius: 12px; font-size: 12px; color: #242424; }
.tagchip img { width: 14px; height: 14px; border-radius: 3px; }
.plus2 { display: inline-flex; align-items: center; height: 24px; padding: 0 8px; background: #f2f2f2; border-radius: 12px; font-size: 12px; color: #5d5d5d; margin-left: 6px; }
.uprow__more { width: 28px; height: 28px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; color: #616161; margin-left: 6px; }
.uprow__more:hover { background: rgba(0,0,0,0.05); }
.uprow__more svg { width: 18px; height: 18px; }

.trycards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.trycard { border: 1px solid #dedede; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 8px; cursor: pointer; background: #fff; transition: background .1s, border-color .1s; }
.trycard:hover { background: rgba(36,36,36,0.02); border-color: #c7c7c7; }
.trycard__ic { display: flex; gap: 10px; align-items: center; height: 48px; }
.trycard__ic svg { display: block; flex-shrink: 0; }
.trycard__t { font-size: 16px; line-height: 22px; color: #242424; }

.foot { text-align: center; font-size: 11px; color: #9a9a9a; padding: 16px; }

/* ── Customize ── */
.cz { max-width: 680px; margin: 0 auto; padding: 44px 24px 60px; }
.cz__title { font-size: 28px; font-weight: 600; letter-spacing: -0.3px; color: #242424; margin-bottom: 20px; }
.cz__intro { font-size: 14px; line-height: 20px; color: #5d5d5d; margin: 0 0 28px; }
.cz__bar { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.tabs { display: flex; gap: 4px; flex: 1; }
.tabs__t { height: 30px; padding: 0 14px; border-radius: 8px; font-size: 14px; color: #5d5d5d; }
.tabs__t:hover { background: rgba(0,0,0,0.04); }
.tabs__t.is-on { background: #242424; color: #fff; font-weight: 600; }
.cz__baractions { display: flex; align-items: center; gap: 8px; }
.cz__baractions[hidden] { display: none; }
.cz__ic { width: 32px; height: 32px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; color: #444; }
.cz__ic:hover { background: rgba(0,0,0,0.04); }
.cz__ic svg { width: 20px; height: 20px; }
.btn-outline { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 14px; border: 1px solid #dedede; border-radius: 8px; background: #fff; font-size: 14px; color: #242424; }
.btn-outline:hover { background: #f7f7f7; }
.btn-outline svg { width: 16px; height: 16px; color: #444; }
.btn-outline--sm { height: 30px; padding: 0 12px; }
.split { display: inline-flex; align-items: stretch; }
.split__main { height: 32px; padding: 0 14px; background: #242424; color: #fff; font-weight: 600; font-size: 14px; border-radius: 8px 0 0 8px; }
.split__caret { width: 30px; background: #242424; color: #fff; border-radius: 0 8px 8px 0; border-left: 1px solid rgba(255,255,255,0.2); display: inline-flex; align-items: center; justify-content: center; }
.split__caret svg { width: 16px; height: 16px; }

.cz__sec { margin-bottom: 32px; }
.cz__h2 { font-size: 16px; font-weight: 600; color: #242424; }
.cz__h2row { display: flex; align-items: center; }
.cz__h2row .cz__h2 { flex: 1; }
.cz__h2ic { display: inline-flex; gap: 4px; color: #616161; }
.cz__h2ic svg { width: 20px; height: 20px; }
.cz__sub { font-size: 14px; line-height: 20px; color: #6f6f6f; margin: 4px 0 16px; }
.cz__more { display: flex; justify-content: flex-end; margin-top: 10px; }
.cz__sec.is-collapsed .lrows > *:nth-child(n+4),
.cz__sec.is-collapsed .scards > *:nth-child(n+4),
.cz__sec.is-collapsed .pcards > *:nth-child(n+7) { display: none; }
.sect__more { display: inline-flex; align-items: center; gap: 2px; font-size: 13px; color: #5d5d5d; }
.sect__more svg { width: 16px; height: 16px; }
.sect__more:hover { text-decoration: underline; }

.lrows { display: flex; flex-direction: column; gap: 12px; }
.lrow { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 12px 16px; background: #f5f5f5; border-radius: 12px; }
.lrow:hover { background: #f0f0f0; }
.lrow__logo { width: 24px; height: 24px; border-radius: 6px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; background: #fff; overflow: hidden; box-shadow: 0 0 0 1px rgba(0,0,0,0.04); }
.lrow__logo img { width: 100%; height: 100%; object-fit: contain; }
.lrow--skill .lrow__logo { width: 20px; height: 20px; background: transparent; box-shadow: none; color: #5d5d5d; }
.lrow--skill .lrow__logo svg { width: 20px; height: 20px; }
.lrow__x { flex: 1; min-width: 0; }
.lrow__t { display: block; font-size: 14px; line-height: 20px; font-weight: 600; color: #242424; }
.lrow__d { display: block; font-size: 12px; line-height: 16px; color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }
.lrow__chev { color: #8a8a8a; display: inline-flex; }
.lrow__chev svg { width: 20px; height: 20px; }
.lockpill { color: #8a8a8a; display: inline-flex; }
.lockpill svg { width: 20px; height: 20px; }

.tgl { width: 40px; height: 22px; border-radius: 11px; background: #c4c4c4; position: relative; flex-shrink: 0; transition: background 0.15s; }
.tgl__k { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: left 0.15s; box-shadow: 0 1px 2px rgba(0,0,0,0.25); }
.tgl.is-on { background: #242424; }
.tgl.is-on .tgl__k { left: 20px; }
.tgl.is-disabled { background: #e0e0e0; }
.tgl.is-disabled .tgl__k { background: #f4f4f4; }
.tgl--lg { width: 44px; height: 24px; border-radius: 12px; }
.tgl--lg .tgl__k { width: 20px; height: 20px; }
.tgl--lg.is-on .tgl__k { left: 22px; }

.pcards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.pcard { display: flex; gap: 12px; text-align: left; padding: 16px; border: 1px solid #dedede; border-radius: 12px; background: #fff; }
.pcard:hover { background: #fafafa; }
.pcard__logo { width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: 0 0 0 1px rgba(0,0,0,0.05); }
.pcard__logo img { width: 100%; height: 100%; object-fit: contain; }
.pcard__x { min-width: 0; }
.pcard__t { display: flex; align-items: center; gap: 4px; font-size: 14px; font-weight: 600; color: #242424; }
.pcard__lock { color: #8a8a8a; display: inline-flex; }
.pcard__lock svg { width: 14px; height: 14px; }
.pcard__d { display: block; font-size: 12px; line-height: 17px; color: #6f6f6f; margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* ── Skill card (Customize › Skills) — Figma 45:172574 ── */
.scards { display: flex; flex-direction: column; gap: 8px; }
.scard { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 12px; background: #f5f5f5; border-radius: 16px; position: relative; }
.scard:hover { background: #f0f0f0; }
.scard__ico { width: 38px; height: 38px; border-radius: 12px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; background: #fff; overflow: hidden; }
.scard__ico img { width: 20px; height: 20px; object-fit: contain; }
.scard__ico svg { width: 20px; height: 20px; color: #5d5d5d; }
.scard__x { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.scard__t { font-size: 14px; line-height: 20px; font-weight: 600; font-variation-settings: 'opsz' 8, 'wght' 600; color: #242424; }
.scard__d { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* ── L2 detail ── */
.l2bar { height: 48px; display: flex; align-items: center; gap: 8px; padding: 0 16px; flex-shrink: 0; }
.l2bar__back { width: 32px; height: 32px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; color: #242424; }
.l2bar__back:hover { background: rgba(0,0,0,0.05); }
.l2bar__back svg { width: 20px; height: 20px; }
.l2 { max-width: 620px; margin: 0 auto; padding: 8px 24px 60px; }
.l2id { display: flex; align-items: center; gap: 14px; }
.l2id__logo { width: 48px; height: 48px; border-radius: 11px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: 0 0 0 1px rgba(0,0,0,0.05); }
.l2id__logo img { width: 100%; height: 100%; object-fit: contain; }
.l2id__logo--skill { width: 54px; height: 54px; border-radius: 12px; background: #fff; color: #242424; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.05); }
.l2id__logo--skill svg { width: 30px; height: 30px; }
.l2id__x { flex: 1; min-width: 0; }
.l2id__name { font-size: 24px; line-height: 28px; font-weight: 600; color: #242424; }
.l2id__sub { font-size: 12px; line-height: 16px; color: #5d5d5d; margin-top: 4px; }
.skdrule { border: none; border-top: 1px solid #ececec; margin: 20px 0 16px; }
.l2id__cta { flex-shrink: 0; display: flex; align-items: center; gap: 6px; }
.btn-dark { height: 34px; padding: 0 18px; border-radius: 8px; background: #242424; color: #fff; font-size: 14px; font-weight: 600; }
.btn-dark:hover { background: #2b2b2b; }
.banner { display: flex; align-items: center; gap: 10px; margin-top: 16px; padding: 12px 14px; background: #f6f6f6; border-radius: 10px; font-size: 13px; color: #242424; }
.banner svg { width: 20px; height: 20px; color: #616161; flex-shrink: 0; }
.l2intro { font-size: 14px; font-weight: 600; color: #242424; margin-top: 20px; padding-top: 16px; border-top: 1px solid #ececec; }
.l2desc { font-size: 14px; line-height: 20px; color: #5d5d5d; margin-top: 8px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.l2desc.is-expanded { display: block; -webkit-line-clamp: unset; overflow: visible; }
.l2more { display: flex; justify-content: flex-end; margin-top: 8px; }
.l2descmore { display: none; justify-content: flex-end; margin-top: 8px; }
.l2descmore.is-shown { display: flex; }
.sect__more.is-open svg { transform: rotate(180deg); }
.l2sec { margin-top: 24px; }
.l2h2 { font-size: 15px; font-weight: 600; color: #242424; margin-bottom: 10px; }
.drows { display: flex; flex-direction: column; gap: 8px; }
.drow { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 14px; border: 1px solid #e8e8e8; border-radius: 10px; background: #fff; }
.drow:hover:not(.drow--static) { background: #fafafa; }
.drow--static { cursor: default; }
.drow__ic { width: 20px; height: 20px; flex-shrink: 0; color: #5d5d5d; }
.drow__ic svg { width: 20px; height: 20px; }
.drow__x { flex: 1; min-width: 0; }
.drow__t { display: block; font-size: 14px; font-weight: 600; color: #242424; }
.drow__d { display: block; font-size: 12px; line-height: 16px; color: #6f6f6f; margin-top: 2px; }
.drow__ofl { position: relative; flex-shrink: 0; }
.drow__more { width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 8px; color: #6f6f6f; cursor: pointer; transition: background 0.1s; }
.drow__more:hover { background: rgba(36,36,36,0.06); color: #242424; }
.drow__more svg { width: 20px; height: 20px; }
.drow__menu { position: absolute; top: calc(100% + 4px); right: 0; min-width: 180px; background: #fff; border-radius: 12px; padding: 4px; box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 10px 0 rgba(0,0,0,0.10); opacity: 0; transform: translateY(-4px); pointer-events: none; transition: opacity 0.12s, transform 0.12s; z-index: 20; }
.drow__ofl.open .drow__menu { opacity: 1; transform: translateY(0); pointer-events: auto; }
.drow__mi { display: flex; align-items: center; gap: 8px; width: 100%; padding: 8px 12px; border: none; background: transparent; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; cursor: pointer; text-align: left; transition: background 0.1s; }
.drow__mi:hover { background: rgba(36,36,36,0.04); }
.drow__mi svg { width: 20px; height: 20px; color: #242424; }
.drow__mi--danger { color: #b10e1c; }
.drow__mi--danger svg { color: #b10e1c; }

.detgrid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px 20px; }
.detlbl { font-size: 12px; font-weight: 600; color: #6f6f6f; margin-bottom: 4px; }
.detval { display: flex; align-items: center; gap: 2px; font-size: 13px; color: #242424; }
.detval svg { width: 14px; height: 14px; color: #616161; }
.detchip { display: inline-flex; align-items: center; height: 22px; padding: 0 8px; margin-top: 6px; background: #f2f2f2; border-radius: 6px; font-size: 11px; color: #5d5d5d; }
.detlink { display: block; font-size: 13px; color: #242424; margin-top: 2px; cursor: pointer; }
.detlink:hover { text-decoration: underline; }
.l2fromlink { color: #242424; cursor: pointer; }
.l2fromlink:hover { text-decoration: underline; }

.instr__hd { display: flex; align-items: center; }
.instr__hd .l2h2 { flex: 1; margin-bottom: 0; font-size: 16px; }
.instr__ic { display: inline-flex; align-items: center; gap: 10px; }
.instr__btn { width: 32px; height: 32px; border-radius: 9999px; display: inline-flex; align-items: center; justify-content: center; color: #424242; transition: background 0.1s; }
.instr__btn:hover { background: rgba(36,36,36,0.06); }
.instr__btn svg { width: 20px; height: 20px; }
.instr { border: 1px solid #dedede; border-radius: 16px; padding: 16px 20px; margin-top: 10px; }
.instr__b { margin-bottom: 16px; }
.instr__b:last-child { margin-bottom: 0; }
.instr__t { font-size: 14px; line-height: 20px; font-weight: 600; color: #242424; margin-bottom: 2px; }
.instr__b p { font-size: 14px; line-height: 20px; color: #424242; }
.instr__lines { display: flex; flex-direction: column; }
.instr__ln { font-size: 14px; line-height: 20px; color: #424242; }
`;

// ─── Side Nav (One Copilot shell, Cowork tab) ───────────────
const copilotLogo = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-3.5 0-5 2.2-5.6 4.4C4 8 3 9.7 3 11.6 3 14 4.8 16 7.4 16.4 8.2 18.6 10 20 12.2 20c3.4 0 5-2.2 5.6-4.4C20 15 21 13.3 21 11.4 21 9 19.2 7 16.6 6.6 15.8 4.4 14 3 12 3Z" fill="currentColor"/></svg>';
const RECENTS = [
  'Get feedback from Erik and Daisy',
  'Home budget spreadsheet',
  'Meeting notes summary',
  'Local competitor analysis',
  'Compress images for web',
];
function modeSeg(glyph: string, label: string, sel: boolean, i: number): string {
  return '<button class="ss__seg' + (sel ? ' ss__seg--selected' : '') + '" data-i="' + i + '" aria-label="' + label + '">'
    + '<span class="ss__icon">' + glyph + '</span>'
    + '<span class="ss__label"><span class="ss__ghost">' + label + '</span><span class="ss__real">' + label + '</span></span></button>';
}
function ni(icon: string, label: string, opts?: { sel?: boolean; nav?: string }): string {
  const attr = opts && opts.nav ? ' data-nav="' + opts.nav + '"' : '';
  return '<button class="ni' + (opts && opts.sel ? ' ni--selected' : '') + '"' + attr + '><span class="ni__ico">' + icon + '</span><span class="ni__label">' + label + '</span></button>';
}
function niChat(label: string): string {
  return '<button class="ni ni--chat"><span class="ni__label">' + label + '</span><span class="ni__more">' + ico('more-horizontal-20-regular') + '</span></button>';
}
function railHtml(): string {
  const recents = RECENTS.map(niChat).join('');
  return [
    '<aside class="nav" id="nav">',
    '<div class="nav__header">',
    '<span class="nav__brand"><span class="nav__wordmark">Copilot</span></span>',
    '<div class="nav__hicons">',
    '<button class="ntool ntool--dot" title="New task">' + ico('checkmark-square-20-regular') + '</button>',
    '<button class="ntool" title="Apps">' + ico('grid-dots-20-regular') + '</button>',
    '<button class="ntool" title="Collapse">' + ico('panel-left-20-regular') + '</button>',
    '</div></div>',
    '<div class="ntabs">',
    '<div class="ss ss--light ss--mode" id="sseg" data-selected="1">',
    '<span class="ss__indicator"></span>',
    modeSeg(ico('chat-20-regular'), 'Chat', false, 0),
    modeSeg(ico('cowork-20-regular'), 'Cowork', true, 1),
    modeSeg(ico('autopilot-20-regular'), 'Autopilot', false, 2),
    modeSeg(ico('code-20-regular'), 'Code', false, 3),
    '</div></div>',
    '<div class="nav__body">',
    ni(ico('compose-20-regular'), 'New task', { sel: true, nav: 'home' }),
    ni(ICON.tasks, 'My tasks'),
    ni(ico('clock-20-regular'), 'Scheduled'),
    ni(ico('briefcase-20-regular'), 'Customize', { nav: 'customize' }),
    '<div class="nsh">Recents</div>',
    recents,
    '</div>',
    '<div class="nav__footer">',
    '<button class="me"><span class="me__avatar"><img src="../../src/components/icons/avatar-user.png" alt="Elvia Atkins"/></span>',
    '<span class="me__info"><span class="me__name">Elvia Atkins</span><span class="me__lic">M365 Copilot (Premium)</span></span></button>',
    '</div>',
    '</aside>',
  ].join('');
}

// ─── Home route ─────────────────────────────────────────────
function homeHtml(): string {
  return [
    '<section class="route is-active" id="route-home">',
    '<div class="topbar"><span class="pill">Work IQ</span>',
    '<button class="model">Auto ' + ICON.chevD + '</button><span class="topbar__sp"></span>',
    '<button class="topbar__ic topbar__ic--shield" title="Protected">' + ICON.shield + '</button>',
    '<button class="topbar__ic">' + ICON.more + '</button></div>',
    '<div class="scroll"><div class="home">',
    '<h1 class="home__hi">Hi Elvia, how can I help?</h1>',
    '<div class="composer-wrap">',
    '<div class="composer"><button class="composer__add" id="composerAdd">' + ICON.add + '</button>',
    '<input class="composer__in" id="composerInput" placeholder="Start a task" autocomplete="off"/>',
    '<button class="composer__mic">' + ICON.mic + '</button>',
    '<button class="composer__send" id="composerSend" hidden aria-label="Send">' + ico('arrow-up-20-regular') + '</button></div>',
    '<div class="addmenu" id="addMenu" hidden>',
    '<button class="addmenu__it" data-ccq-open><span class="addmenu__ic">' + ico('attach-20-regular') + '</span><span class="addmenu__t">Add work content</span></button>',
    '<button class="addmenu__it"><span class="addmenu__ic">' + ico('arrow-upload-20-regular') + '</span><span class="addmenu__t">Upload image and files</span></button>',
    '<button class="addmenu__it"><span class="addmenu__ic">' + ico('cloud-20-regular') + '</span><span class="addmenu__t">Attach cloud files</span></button>',
    '<div class="addmenu__div"></div>',
    '<button class="addmenu__it addmenu__it--two" data-goto="customize"><span class="addmenu__ic">' + ico('toolbox-20-regular') + '</span><span class="addmenu__x"><span class="addmenu__t">Customize</span><span class="addmenu__d">Manage skills &amp; plugins</span></span></button>',
    '</div>',
    '<div class="ccq" id="ciqCowork" hidden><div class="ciq__tabs" id="ccqTabs"></div><div class="ciq__list" id="ccqList"></div></div>',
    '</div>',
    // Up next
    '<div class="sect"><div class="sect__hd"><span class="sect__t">Up next</span><button class="sect__more">Show more</button></div>',
    '<div class="upcard">',
    '<div class="uprow"><div class="uprow__x"><div class="uprow__t">Paid traffic investments</div>',
    '<div class="uprow__s">' + ICON.info + 'Needs your input</div></div>',
    '<span class="tagchip"><img src="' + logo('sp-global-logo.png') + '" alt=""/>Competitive Landscape</span><span class="plus2">+2</span>',
    '<button class="uprow__more">' + ICON.more + '</button></div>',
    '<div class="uprow"><div class="uprow__x"><div class="uprow__t">Get feedback from Erik and Daisy</div>',
    '<div class="uprow__s">' + ICON.sync + 'In progress</div></div>',
    '<button class="uprow__more">' + ICON.more + '</button></div>',
    '</div></div>',
    // Try these next
    '<div class="sect"><div class="sect__hd"><span class="sect__t">Try these next</span><button class="sect__more">Show more</button></div>',
    '<div class="trycards">',
    '<div class="trycard"><div class="trycard__ic">' + ill('ill-calendar') + '</div><div class="trycard__t">Organize my inbox</div></div>',
    '<div class="trycard"><div class="trycard__ic">' + ill('ill-lightning') + '</div><div class="trycard__t">Arrange my week</div></div>',
    '<div class="trycard"><div class="trycard__ic">' + ill('ill-cubes') + '</div><div class="trycard__t">Research a company</div></div>',
    '</div></div>',
    '<div class="foot">AI-generated content may be incorrect.</div>',
    '</div></div>',
    '</section>',
  ].join('');
}

// ─── Data model: plugins (reused chat sources) + skills ─────
type Skill = { name: string; desc: string; purpose: string; best: string[]; setup: string[] };
type Plugin = {
  name: string; logo: string; dev: string; state: 'installed' | 'discover' | 'blocked';
  intro: string; desc: string; mcpDesc: string; skills: Skill[];
  version: string; updated: string; price: string; priceChip: string; languages: string; cert: string;
};
function slug(s: string): string { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

const PLUGINS: Plugin[] = [
  {
    name: 'Jira', logo: 'jira-logo.png', dev: 'Atlassian', state: 'discover',
    intro: 'Bring your Jira projects into Copilot',
    desc: 'Reference issues, sprints, and project workflows, and let Copilot search, summarize, and draft updates grounded in your team\u2019s work. Jira skills turn raw board activity into sprint reports, triage decisions, and release notes without leaving Cowork.',
    mcpDesc: 'Connects remotely to Atlassian\u2019s MCP server at https://mcp.atlassian.com/jira, providing tools to search, read, and update issues.',
    skills: [
      { name: 'sprint-status', desc: 'Use when you need a snapshot of the current sprint \u2014 scope, burndown, blockers, and what\u2019s at risk before a standup or review.',
        purpose: 'Evaluates the active sprint for completeness and risk, then generates a readiness readout before standup or review. It analyzes every issue for missing story points, unlinked epics, incomplete acceptance criteria, unassigned tickets, and dependency conflicts, and rolls the findings into a single status summary.',
        best: ['Prepping a standup, sprint review, or stakeholder update', 'Auditing the backlog for missing story points and acceptance criteria', 'Catching up on scope and blockers after time away', 'Detecting unassigned or blocked issues before sprint commitment', 'Identifying cross-team dependency conflicts and external blockers', 'Spotting at-risk stories by comparing planned vs. historical velocity', 'Flagging tickets stuck in refinement too long without resolution'],
        setup: ['Connect the Jira project and select the active board and sprint', 'Choose the fields to summarize \u2014 status, assignee, story points, labels', 'Define readiness rules: what counts as ready for sprint entry', 'Configure risk thresholds \u2014 e.g., flag if more than 15% of issues lack points', 'Set dependency scanning depth across linked issues, boards, or projects', 'Map the cadence: on demand, daily pre-standup, or once per sprint', 'Pick notification channels \u2014 Slack, Teams, email, or a Confluence page', 'Choose a tone for the readout: concise, detailed, or executive'] },
      { name: 'issue-triage', desc: 'Use when new issues arrive and need prioritizing, labeling, and routing to the right owner under your team’s rules. It classifies each ticket by severity and component, applies consistent priorities, and suggests the correct assignee. It can also de-duplicate tickets, draft a first response grounded in project context, and escalate critical issues the moment they land.',
        purpose: 'Classifies and routes incoming issues by severity, component, and owner using your team\u2019s triage playbook, so nothing sits unlabeled. It applies consistent priorities and suggests the right assignee for each new ticket, and can draft a first response grounded in project context.',
        best: ['Clearing a backlog of unassigned or unlabeled bugs', 'Applying consistent labels, priorities, and components', 'Routing issues to the correct component or team owner', 'Drafting a first response grounded in project context', 'De-duplicating tickets that describe the same problem', 'Escalating critical-severity issues the moment they arrive'],
        setup: ['Connect the Jira project and the issue types to triage', 'Load your triage rules \u2014 labels, priorities, and owners', 'Define severity thresholds and escalation criteria', 'Map components to their responsible owners or teams', 'Choose auto-assign or suggest-only mode', 'Set a cadence: real-time on creation, or batched hourly', 'Configure where escalations are posted'] },
      { name: 'release-notes', desc: 'Use when drafting release notes from closed issues across one or more fix versions. It groups resolved work by theme — epic, component, or label — and turns it into readable notes you can share. It tailors the tone for engineers or customers and can publish straight to Confluence, Markdown, or email.',
        purpose: 'Turns resolved issues in one or more fix versions into readable, grouped release notes. It organizes changes by theme and tailors the tone for engineers or customers, and can publish straight to Confluence or Markdown.',
        best: ['Shipping a version and writing the changelog', 'Summarizing what changed for stakeholders and customers', 'Grouping fixes and features by epic, component, or label', 'Producing both a technical and a customer-facing set of notes', 'Compiling highlights across multiple fix versions'],
        setup: ['Connect the Jira project and select the fix version(s)', 'Choose how to group entries \u2014 epic, component, or label', 'Pick a tone: technical, customer-facing, or executive', 'Set filters for the issue types and statuses to include', 'Add a template or heading structure for the output', 'Choose the export target \u2014 Confluence, Markdown, or email'] },
    ],
    version: 'Version 4.2.1', updated: 'Updated 6/28/2026', price: 'Included with your plan.', priceChip: 'No purchase required', languages: 'English and 12 more', cert: 'M365 Certified app',
  },
  {
    name: 'GitHub', logo: 'github-logo.png', dev: 'GitHub', state: 'installed',
    intro: 'Reference your repositories inside Copilot',
    desc: 'Reference repositories, issues, and pull requests so Copilot can search code, summarize changes, and draft updates from your work. GitHub skills turn commit and PR activity into standups, review summaries, and release digests.',
    mcpDesc: 'Connects remotely to GitHub\u2019s MCP server at https://mcp.github.com, providing tools to search code, read issues, and inspect pull requests.',
    skills: [
      { name: 'pr-review-digest', desc: 'Use when you need a summary of open pull requests \u2014 what\u2019s waiting on you, what changed, and what\u2019s blocking merge.',
        purpose: 'Summarizes open pull requests by review state, size, and blockers so nothing stalls in the queue. It surfaces what’s waiting on you, what changed, and what’s blocking merge, and highlights oversized or stale PRs that need attention.',
        best: ['Clearing a review queue before end of day', 'Catching up on a repo after time away', 'Flagging pull requests that are blocking a release', 'Spotting oversized or stale pull requests', 'Highlighting PRs waiting on your review specifically', 'Summarizing the risk and scope of a large diff'],
        setup: ['Connect the repository and the target branches', 'Choose review scope — assigned to me or all open', 'Set size and staleness thresholds for flags', 'Define what counts as blocking (failing checks, requested changes)', 'Pick a cadence: on demand, daily, or on new review request', 'Choose where the digest is posted'] },
      { name: 'commit-standup', desc: 'Use when preparing a standup from recent commits and merged pull requests across a repo or team. It turns raw commit activity into a concise update grouped by author or area, capturing what shipped, what’s in progress, and what’s next. It can span several repositories and filter out bots and merge noise.',
        purpose: 'Turns recent commit and merge activity into a concise standup update, grouped by author or area. It captures what shipped, what’s in progress, and what’s next, and can span several repositories at once.',
        best: ['Daily standups and async check-ins', 'Weekly team digests of code changes', 'Summarizing a sprint of commits for a review', 'Tracking progress across several repositories', 'Giving non-engineers a readable view of what changed'],
        setup: ['Connect the repository or repositories', 'Set the time window for activity', 'Group results by author, area, or label', 'Choose a detail level: headline, summary, or full', 'Exclude bots, merge commits, or specific paths', 'Pick a cadence and a posting destination'] },
    ],
    version: 'Version 3.0.4', updated: 'Updated 6/12/2026', price: 'Included with your plan.', priceChip: 'No purchase required', languages: 'English and 20 more', cert: 'M365 Certified app',
  },
  {
    name: 'Slack', logo: 'slack-logo.png', dev: 'Slack Technologies', state: 'discover',
    intro: 'Catch up on Slack inside Copilot',
    desc: 'Search messages, channels, and files across your workspace so Copilot can catch you up and find what matters. Slack skills turn channel noise into catch-ups, decision logs, and follow-up lists.',
    mcpDesc: 'Connects remotely to Slack\u2019s MCP server at https://mcp.slack.com, providing tools to search messages, read channels, and list files.',
    skills: [
      { name: 'channel-catchup', desc: 'Use when you need to catch up on a busy channel without scrolling through everything. It summarizes recent activity into decisions, highlights, and anything awaiting your reply, and pulls action items out of long threads. It surfaces the questions and mentions directed specifically at you so nothing slips.',
        purpose: 'Summarizes recent channel activity into decisions, highlights, and anything awaiting your reply. It cuts through high-volume channels so you never miss what matters, and pulls action items out of long threads.',
        best: ['Catching up after PTO or a focus block', 'Skimming a high-volume channel quickly', 'Finding decisions buried in long threads', 'Surfacing questions and mentions directed at you', 'Pulling action items out of a busy conversation'],
        setup: ['Connect the channel or channels to monitor', 'Set the time window for the catch-up', 'Choose what to surface — decisions, mentions, questions', 'Filter out bots, reactions, or off-topic threads', 'Pick a cadence: on demand or a scheduled digest', 'Choose where the summary is delivered'] },
      { name: 'decision-log', desc: 'Use when you need a running log of decisions made in a channel, with who decided and when. It extracts decisions from conversation and keeps a structured, auditable record you can revisit later. It captures the decision, owner, date, and rationale so you can reconstruct why a choice was made.',
        purpose: 'Extracts decisions from conversation and keeps a structured, running log of who decided what and when. It turns scattered agreement into an auditable record you can revisit later.',
        best: ['Documenting project decisions as they happen', 'Auditing what was agreed and by whom', 'Building a decision record for a launch or migration', 'Reconstructing the rationale behind a past choice'],
        setup: ['Connect the channel to watch', 'Define what counts as a decision', 'Choose the fields to capture — decision, owner, date, rationale', 'Set an export target for the log', 'Pick a cadence for updates'] },
    ],
    version: 'Version 2.9.0', updated: 'Updated 5/30/2026', price: 'Included with your plan.', priceChip: 'No purchase required', languages: 'English and 30 more', cert: 'M365 Certified app',
  },
  {
    name: 'Canva', logo: 'canva-logo.png', dev: 'Canva Pty Ltd', state: 'discover',
    intro: 'Design inside Microsoft Copilot with Canva',
    desc: 'Browse, summarize, autofill, and even generate new Canva designs from Copilot. Canva skills turn briefs into on-brand presentations, social posts, and bulk-created assets grounded in your brand kit.',
    mcpDesc: 'Connects remotely to Canva\u2019s MCP server at https://mcp.canva.com, providing tools to browse designs, autofill templates, and generate assets.',
    skills: [
      { name: 'branded-presentation', desc: 'Use when you need an on-brand deck from an outline, applying your Canva brand kit and templates.',
        purpose: 'Generate a branded presentation from a topic or outline using your brand kit.',
        best: ['Turning a doc into a deck', 'Producing on-brand client presentations'],
        setup: ['Connect your Canva brand kit', 'Choose a template', 'Provide an outline', 'Set slide count'] },
      { name: 'bulk-create', desc: 'Use when you need many variations of a design from a data set (names, sizes, locales).',
        purpose: 'Bulk-generate design variations from a data source.',
        best: ['Localized social assets', 'Personalized certificates or badges'],
        setup: ['Connect a data source', 'Pick a base template', 'Map fields to elements', 'Choose export format'] },
    ],
    version: 'Version 1.0.10', updated: 'Updated 4/2/2026', price: 'Free and paid plans available.', priceChip: 'Purchases may be required', languages: 'English and 15 more', cert: 'M365 Certified app',
  },
  // Discover-only plugins
  { name: 'Confluence', logo: 'confluence-logo.png', dev: 'Atlassian', state: 'installed', intro: 'Reference your Confluence spaces', desc: 'Pull knowledge base articles and team documentation so Copilot can search, summarize, and reference your space.', mcpDesc: 'Connects to Atlassian\u2019s MCP server, providing tools to search and read pages.', skills: [ { name: 'space-summary', desc: 'Use when you need a digest of what changed across a Confluence space. It summarizes recent edits, new pages, and comments into a structured overview of key changes, owners, and open questions. It flags documentation that has gone stale or lost an owner so the space stays healthy.', purpose: 'Summarizes recent edits and new pages across a space into a structured digest of key changes, owners, and open questions. It keeps the team aligned without reading every page, and flags documentation that has gone stale or lost an owner.', best: ['Weekly knowledge digests for a team space', 'Onboarding to a space by seeing what changed recently', 'Tracking documentation drift and stale pages', 'Surfacing new decisions recorded in the space', 'Finding pages that need review or an owner'], setup: ['Connect the Confluence space', 'Set the time window for changes to include', 'Choose what to surface — new pages, edits, comments', 'Filter by label, section, or author', 'Pick a cadence and a delivery channel'] } ], version: 'Version 3.1.0', updated: 'Updated 6/1/2026', price: 'Included with your plan.', priceChip: 'No purchase required', languages: 'English and 12 more', cert: 'M365 Certified app' },
  { name: 'ServiceNow', logo: 'servicenow-logo.png', dev: 'ServiceNow', state: 'discover', intro: 'Triage tickets inside Copilot', desc: 'Look up tickets, incidents, and IT service records so Copilot can triage and draft resolutions.', mcpDesc: 'Connects to ServiceNow\u2019s MCP server, providing tools to search and update incidents.', skills: [ { name: 'incident-triage', desc: 'Use when new incidents arrive and need prioritization and routing.', purpose: 'Classify and route incidents by impact and urgency.', best: ['Clearing an incident queue'], setup: ['Connect the instance', 'Load routing rules'] } ], version: 'Version 2.4.0', updated: 'Updated 5/20/2026', price: 'Included with your plan.', priceChip: 'No purchase required', languages: 'English and 8 more', cert: 'M365 Certified app' },
  { name: 'Notion', logo: 'notion-logo.png', dev: 'Notion Labs', state: 'discover', intro: 'Reference your Notion workspace', desc: 'Reference pages, docs, and databases from your workspace so Copilot can find, summarize, and draft grounded in your notes.', mcpDesc: 'Connects to Notion\u2019s MCP server, providing tools to search pages and query databases.', skills: [ { name: 'meeting-notes', desc: 'Use when turning raw notes into structured meeting minutes.', purpose: 'Format notes into minutes with actions and owners.', best: ['After every meeting'], setup: ['Connect the workspace', 'Pick a template'] } ], version: 'Version 1.8.2', updated: 'Updated 6/5/2026', price: 'Free and paid plans available.', priceChip: 'Purchases may be required', languages: 'English and 10 more', cert: 'M365 Certified app' },
  { name: 'Linear', logo: 'linear-logo.png', dev: 'Linear', state: 'discover', intro: 'Track Linear issues inside Copilot', desc: 'Manage issues, projects, and team workflows so Copilot can track work and draft updates from Linear.', mcpDesc: 'Connects to Linear\u2019s MCP server, providing tools to search and update issues.', skills: [ { name: 'cycle-review', desc: 'Use when reviewing a Linear cycle\u2019s progress and scope.', purpose: 'Summarize a cycle: done, in progress, at risk.', best: ['Cycle reviews'], setup: ['Connect the team', 'Pick a cycle'] } ], version: 'Version 2.0.1', updated: 'Updated 6/18/2026', price: 'Included with your plan.', priceChip: 'No purchase required', languages: 'English and 6 more', cert: 'M365 Certified app' },
  { name: 'HubSpot', logo: 'hubspot-logo.png', dev: 'HubSpot', state: 'discover', intro: 'Bring your CRM into Copilot', desc: 'Connect CRM contacts, deals, and marketing data so Copilot can summarize pipeline and draft outreach.', mcpDesc: 'Connects to HubSpot\u2019s MCP server, providing tools to read contacts, deals, and companies.', skills: [ { name: 'deal-brief', desc: 'Use when you need a briefing on a deal before a call.', purpose: 'Summarize a deal\u2019s stage, history, and next step.', best: ['Pre-call prep'], setup: ['Connect the CRM', 'Pick a pipeline'] } ], version: 'Version 3.3.0', updated: 'Updated 6/9/2026', price: 'Free and paid plans available.', priceChip: 'Purchases may be required', languages: 'English and 14 more', cert: 'M365 Certified app' },
  { name: 'Google Drive', logo: 'google-drive-logo.png', dev: 'Google', state: 'discover', intro: 'Search your Drive inside Copilot', desc: 'Search documents, sheets, and slides in your Drive so Copilot can find and summarize your files.', mcpDesc: 'Connects to Google\u2019s MCP server, providing tools to search and read files.', skills: [ { name: 'doc-summary', desc: 'Use when you need a quick summary of a long document.', purpose: 'Summarize a Drive document into key points.', best: ['Skimming long docs'], setup: ['Connect Drive', 'Pick a file'] } ], version: 'Version 1.5.0', updated: 'Updated 5/28/2026', price: 'Included with your plan.', priceChip: 'No purchase required', languages: 'English and 40 more', cert: 'M365 Certified app' },
  { name: 'Intercom', logo: 'intercom-logo.png', dev: 'Intercom', state: 'discover', intro: 'Bring support conversations into Copilot', desc: 'Bring in customer conversations and support history so Copilot can summarize sentiment and surface themes.', mcpDesc: 'Connects to Intercom\u2019s MCP server, providing tools to read conversations and tickets.', skills: [ { name: 'support-themes', desc: 'Use when you need recurring themes across recent support conversations.', purpose: 'Cluster recent conversations into themes and pain points.', best: ['Weekly support reviews'], setup: ['Connect the workspace', 'Set a window'] } ], version: 'Version 2.2.0', updated: 'Updated 6/3/2026', price: 'Free and paid plans available.', priceChip: 'Purchases may be required', languages: 'English and 9 more', cert: 'M365 Certified app' },
  { name: 'S&P Global', logo: 'sp-global-logo.png', dev: 'S&P Global', state: 'discover', intro: 'Market intelligence inside Copilot', desc: 'Company fundamentals and market intelligence so Copilot can ground research in trusted financial data.', mcpDesc: 'Connects to S&P Global\u2019s MCP server, providing tools to look up fundamentals and filings.', skills: [ { name: 'company-profile', desc: 'Use when you need a fundamentals snapshot on a public company.', purpose: 'Compile a company profile from fundamentals and filings.', best: ['Pre-meeting research'], setup: ['Connect the data feed', 'Enter a ticker'] } ], version: 'Version 4.0.0', updated: 'Updated 6/22/2026', price: 'Paid plan required.', priceChip: 'Purchases may be required', languages: 'English', cert: 'M365 Certified app' },
  { name: 'Moody\u2019s', logo: 'moodys-logo.png', dev: 'Moody\u2019s', state: 'discover', intro: 'Credit ratings inside Copilot', desc: 'Credit ratings and risk insights so Copilot can ground research in trusted credit data.', mcpDesc: 'Connects to Moody\u2019s MCP server, providing tools to look up ratings and risk profiles.', skills: [ { name: 'credit-snapshot', desc: 'Use when you need a credit rating and risk snapshot on an entity.', purpose: 'Compile a credit profile from ratings and risk indicators.', best: ['Counterparty due diligence'], setup: ['Connect the data feed', 'Enter an entity'] } ], version: 'Version 1.2.0', updated: 'Updated 6/14/2026', price: 'Paid plan required.', priceChip: 'Purchases may be required', languages: 'English', cert: 'M365 Certified app' },
  { name: 'London Stock Group Exchange', logo: 'lseg-logo.png', dev: 'LSEG', state: 'discover', intro: 'Market data inside Copilot', desc: 'Market data and financial filings so Copilot can ground research in trusted exchange data.', mcpDesc: 'Connects to LSEG\u2019s MCP server, providing tools to look up market data and filings.', skills: [ { name: 'market-brief', desc: 'Use when you need a market data brief on a security.', purpose: 'Summarize market data and recent filings for a security.', best: ['Pre-trade research'], setup: ['Connect the data feed', 'Enter a ticker'] } ], version: 'Version 2.1.0', updated: 'Updated 6/16/2026', price: 'Paid plan required.', priceChip: 'Purchases may be required', languages: 'English', cert: 'M365 Certified app' },
  { name: 'Google Calendar', logo: 'google-calendar-logo.png', dev: 'Google', state: 'discover', intro: 'Reference your calendar inside Copilot', desc: 'Look up events, meetings, and availability so Copilot can plan and summarize your schedule.', mcpDesc: 'Connects to Google\u2019s MCP server, providing tools to read events and availability.', skills: [ { name: 'day-plan', desc: 'Use when you need a plan for the day from your calendar.', purpose: 'Turn today\u2019s events into a prioritized plan with prep notes.', best: ['Morning planning'], setup: ['Connect the calendar', 'Set working hours'] } ], version: 'Version 1.4.0', updated: 'Updated 5/26/2026', price: 'Included with your plan.', priceChip: 'No purchase required', languages: 'English and 40 more', cert: 'M365 Certified app' },
  { name: 'Google Contacts', logo: 'google-contacts-logo.png', dev: 'Google', state: 'discover', intro: 'Reference your contacts inside Copilot', desc: 'Search and manage your contact information so Copilot can find the right people fast.', mcpDesc: 'Connects to Google\u2019s MCP server, providing tools to search and read contacts.', skills: [ { name: 'contact-lookup', desc: 'Use when you need contact details for a person or company.', purpose: 'Find and summarize contact records with recent context.', best: ['Before reaching out'], setup: ['Connect contacts', 'Enter a name'] } ], version: 'Version 1.1.0', updated: 'Updated 5/24/2026', price: 'Included with your plan.', priceChip: 'No purchase required', languages: 'English and 40 more', cert: 'M365 Certified app' },
];

// Attach the shared canonical skills (identical across every surface).
// Instruction detail (purpose / best uses / setup) is synthesized to match the
// Chat experience's skill-detail generator so both render the same L2 pages.
function synthSkill(connector: string, sk: ConnectorSkill): Skill {
  return {
    name: sk.name,
    desc: sk.desc,
    purpose: 'The /' + sk.name + ' skill turns your ' + connector + ' data into a ready-to-use result. It searches the relevant records, grounds everything it produces in what it finds, and cites the sources it used so you can verify the output before you act on it.',
    best: [
      'Ask Copilot to run /' + sk.name + ' directly from a ' + connector + ' conversation',
      'Kick it off from a related ' + connector + ' item, thread, or page',
      'Chain it after a search so Copilot acts on exactly what it finds',
      'Schedule it as a recurring digest, standup, or status update',
      'Hand it to a teammate as a repeatable, shareable workflow',
      'Combine it with other skills to build a multi-step routine',
    ],
    setup: [
      'Connect ' + connector + ' and sign in with an account that has access',
      'Grant Copilot read access to the ' + connector + ' data this skill needs',
      'Choose the scope \u2014 which projects, channels, spaces, or folders to include',
      'Set any filters, time windows, or thresholds the skill should respect',
      'Pick a cadence: on demand, scheduled, or triggered by an event',
      'Invoke it any time by typing /' + sk.name + ' in the prompt box',
    ],
  };
}
PLUGINS.forEach(function (p) { p.skills = skillsFor(p.name).map(function (sk) { return synthSkill(p.name, sk); }); });

const BUILTIN_SKILLS = [
  { name: 'PDF', desc: 'Read, extract, and fill PDF forms; turn documents into structured summaries you can act on.' },
  { name: 'Word', desc: 'Draft, format, and edit Word documents with citations, styles, and your organization\u2019s templates.' },
  { name: 'Excel', desc: 'Build spreadsheets with live formulas, pivot data, and turn tables into charts and models.' },
];

function pluginBySlug(s: string): Plugin | undefined { return PLUGINS.find(function (p) { return slug(p.name) === s; }); }
function pluginLogoImg(p: Plugin): string { return '<img src="' + logo(p.logo) + '" alt=""/>'; }

// ─── Customize route (Plugins | Skills tabs) ────────────────
function pluginRowHtml(p: Plugin): string {
  const ctrl = p.state === 'blocked'
    ? '<span class="lockpill">' + ICON.lock + '</span>'
    : '<button class="tgl' + (p.state === 'installed' ? ' is-on' : '') + '" aria-label="Enable"><span class="tgl__k"></span></button>';
  return '<div class="lrow" role="button" tabindex="0" data-goto="pl-' + slug(p.name) + '">'
    + '<span class="lrow__logo">' + pluginLogoImg(p) + '</span>'
    + '<span class="lrow__x"><span class="lrow__t">' + p.name + '</span><span class="lrow__d">' + p.desc + '</span></span>'
    + ctrl + '<span class="lrow__chev">' + ICON.chevR + '</span></div>';
}
function pluginCardHtml(p: Plugin): string {
  const lock = p.state === 'blocked' ? ' <span class="pcard__lock">' + ICON.lock + '</span>' : '';
  return '<button class="pcard" data-goto="pl-' + slug(p.name) + '">'
    + '<span class="pcard__logo">' + pluginLogoImg(p) + '</span>'
    + '<span class="pcard__x"><span class="pcard__t">' + p.name + lock + '</span><span class="pcard__d">' + p.desc + '</span></span></button>';
}
// Overflow menu (⋮) for a skill card — Try in Copilot · Share · View details.
function skillCardOflHtml(id: string): string {
  return '<div class="drow__ofl"><button class="drow__more" data-more aria-label="Skill options">' + ico('more-vertical-20-regular') + '</button>'
    + '<div class="drow__menu" role="menu">'
    + '<button class="drow__mi" data-try>' + ico('chat-sparkle-20-regular') + 'Try in Copilot</button>'
    + '<button class="drow__mi">' + ico('share-20-regular') + 'Share</button>'
    + '<button class="drow__mi" data-goto="' + id + '">' + ico('info-20-regular') + 'View details</button>'
    + '</div></div>';
}
// Skill card — plugin logo tile + name/desc + overflow. Figma node 45:172574.
function skillCardHtml(p: Plugin, sk: Skill): string {
  const id = 'sk-' + slug(p.name) + '-' + slug(sk.name);
  return '<div class="scard" role="button" tabindex="0" data-goto="' + id + '">'
    + '<span class="scard__ico">' + pluginLogoImg(p) + '</span>'
    + '<span class="scard__x"><span class="scard__t">' + sk.name + '</span><span class="scard__d">' + sk.desc + '</span></span>'
    + skillCardOflHtml(id) + '</div>';
}
// Built-in skill card — generic glyph tile (no plugin logo).
function builtinSkillCardHtml(sk: { name: string; desc: string }): string {
  const id = 'sk-builtin-' + slug(sk.name);
  return '<div class="scard" role="button" tabindex="0" data-goto="' + id + '">'
    + '<span class="scard__ico">' + ICON.script + '</span>'
    + '<span class="scard__x"><span class="scard__t">' + sk.name + '</span><span class="scard__d">' + sk.desc + '</span></span>'
    + skillCardOflHtml(id) + '</div>';
}

function customizeHtml(): string {
  const installed = PLUGINS.filter(function (p) { return p.state === 'installed' || p.state === 'blocked'; });
  const discover = PLUGINS.filter(function (p) { return p.state === 'discover'; });
  // Your skills = every skill from every installed plugin, grouped by plugin and
  // ordered alphabetically by the installed plugin's name.
  const installedSkillPlugins = PLUGINS.filter(function (p) { return p.state === 'installed'; })
    .slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
  const yourSkills: string[] = [];
  installedSkillPlugins.forEach(function (p) {
    p.skills.forEach(function (sk) { yourSkills.push(skillCardHtml(p, sk)); });
  });
  const builtinRows = BUILTIN_SKILLS.map(builtinSkillCardHtml).join('');
  return [
    '<section class="route" id="route-customize">',
    '<div class="l2bar"><button class="l2bar__back" data-back>' + ICON.back + '</button><span class="topbar__sp"></span><button class="topbar__ic">' + ICON.more + '</button></div>',
    '<div class="scroll"><div class="cz">',
    '<div class="cz__hd"><h1 class="cz__title">Customize</h1></div>',
    '<div class="cz__bar"><div class="tabs"><button class="tabs__t is-on" data-tab="plugins">Plugins</button>',
    '<button class="tabs__t" data-tab="skills">Skills</button></div>',
    '<div class="cz__baractions" data-for="plugins"><button class="btn-outline">' + ico('arrow-upload-20-regular', 16) + 'Upload plugin</button></div>',
    '<div class="cz__baractions" data-for="skills" hidden><button class="cz__ic">' + ICON.search + '</button><button class="cz__ic">' + ICON.filter + '</button>',
    '<span class="split"><button class="split__main">Add</button><button class="split__caret">' + ICON.chevD + '</button></span></div>',
    '</div>',
    // Plugins tab
    '<div class="tabpane" data-pane="plugins">',
    '<p class="cz__intro">Plugins help Cowork extend its capabilities by connecting to external tools, services, and bundled skills.</p>',
    '<div class="cz__sec is-collapsed"><h2 class="cz__h2">Installed</h2><p class="cz__sub">Cowork will reference enabled plugins for relevant tasks.</p>',
    '<div class="lrows">' + installed.map(pluginRowHtml).join('') + '</div>',
    '<div class="cz__more"><button class="sect__more">Show more ' + ICON.chevD + '</button></div></div>',
    '<div class="cz__sec is-collapsed"><div class="cz__h2row"><h2 class="cz__h2">Discover</h2><span class="cz__h2ic">' + ICON.search + ICON.filter + '</span></div>',
    '<div class="pcards">' + discover.map(pluginCardHtml).join('') + '</div>',
    '<div class="cz__more"><button class="sect__more">Show more ' + ICON.chevD + '</button></div></div>',
    '</div>',
    // Skills tab
    '<div class="tabpane" data-pane="skills" hidden>',
    '<p class="cz__intro">Skills teach Cowork how to perform a specific task.</p>',
    '<div class="cz__sec is-collapsed"><h2 class="cz__h2">Your skills</h2><p class="cz__sub">Cowork will reference enabled skills for relevant tasks.</p>',
    '<div class="scards" id="yourSkills">' + yourSkills.join('') + '</div>',
    '<div class="cz__more"><button class="sect__more">Show more ' + ICON.chevD + '</button></div></div>',
    '<div class="cz__sec"><h2 class="cz__h2">Built-in</h2><p class="cz__sub">Skills included with Cowork. These skills cannot be disabled.</p>',
    '<div class="scards">' + builtinRows + '</div></div>',
    '</div>',
    '</div></div></section>',
  ].join('');
}

// ─── Plugin L2 ──────────────────────────────────────────────
function headerOflHtml(): string {
  return '<div class="drow__ofl"><button class="drow__more" data-more aria-label="More options">' + ico('more-vertical-20-regular') + '</button>'
    + '<div class="drow__menu" role="menu">'
    + '<button class="drow__mi">' + ico('arrow-sync-20-regular') + 'Re-install</button>'
    + '<button class="drow__mi drow__mi--danger">' + ico('delete-20-regular') + 'Delete</button>'
    + '</div></div>';
}
function detailBar(): string {
  return '<div class="l2bar"><button class="l2bar__back" data-back>' + ICON.back + '</button><span class="topbar__sp"></span>'
    + '<button class="btn-outline btn-outline--sm">Share</button>'
    + '<button class="topbar__ic">' + ICON.more + '</button></div>';
}
function pluginPaneHtml(p: Plugin): string {
  const cta = p.state === 'installed'
    ? '<button class="tgl tgl--lg is-on" aria-label="Enabled"><span class="tgl__k"></span></button>' + headerOflHtml()
    : p.state === 'blocked'
      ? '<button class="btn-dark">Request access</button>'
      : '<button class="btn-dark" data-add="' + slug(p.name) + '">Add</button>';
  const blockedBanner = p.state === 'blocked'
    ? '<div class="banner">' + ICON.lock + '<span>This plugin is blocked by your organization\u2019s policy.</span></div>'
    : '';
  const skills = p.skills.map(function (sk) {
    const skId = 'sk-' + slug(p.name) + '-' + slug(sk.name);
    const trailing = p.state === 'installed'
      ? skillCardOflHtml(skId)
      : '<span class="lrow__chev">' + ICON.chevR + '</span>';
    return '<div class="drow" role="button" tabindex="0" data-goto="' + skId + '">'
      + '<span class="drow__ic">' + ICON.script + '</span>'
      + '<span class="drow__x"><span class="drow__t">' + sk.name + '</span><span class="drow__d">' + sk.desc + '</span></span>'
      + trailing + '</div>';
  }).join('');
  return [
    '<section class="route" id="route-pl-' + slug(p.name) + '">' + detailBar() + '<div class="scroll"><div class="l2">',
    '<div class="l2id"><span class="l2id__logo">' + pluginLogoImg(p) + '</span>',
    '<div class="l2id__x"><div class="l2id__name">' + p.name + '</div><div class="l2id__sub">Created by ' + p.dev + '</div></div>',
    '<div class="l2id__cta">' + cta + '</div></div>',
    blockedBanner,
    '<div class="l2intro">' + p.intro + '</div>',
    '<p class="l2desc">' + p.desc + '</p><div class="l2descmore"><button class="sect__more" data-descmore><span class="descmore__t">Show more</span> ' + ICON.chevD + '</button></div>',
    // MCPs
    '<div class="l2sec"><h2 class="l2h2">MCPs</h2><div class="drow drow--static">'
    + '<span class="drow__ic">' + ICON.plug + '</span><span class="drow__x"><span class="drow__t">MCP Servers</span><span class="drow__d">' + p.mcpDesc + '</span></span></div></div>',
    // Skills
    '<div class="l2sec"><h2 class="l2h2">Skills</h2><div class="drows">' + skills + '</div>'
    + '<div class="l2more"><button class="sect__more">Show more ' + ICON.chevD + '</button></div></div>',
    // Details
    '<div class="l2sec"><h2 class="l2h2">Details</h2>',
    '<div class="detgrid">',
    '<div class="detcell"><div class="detlbl">Version</div><div class="detval">' + p.version + '</div><span class="detchip">' + p.updated + '</span></div>',
    '<div class="detcell"><div class="detlbl">Price</div><div class="detval">' + p.price + '</div><span class="detchip">' + p.priceChip + '</span></div>',
    '<div class="detcell"><div class="detlbl">Languages</div><div class="detval">' + p.languages + ' ' + ICON.chevD + '</div></div>',
    '<div class="detcell"><div class="detlbl">Legal</div><a class="detlink">Privacy policy</a><a class="detlink">Terms of service</a></div>',
    '<div class="detcell"><div class="detlbl">Support</div><a class="detlink">Get help</a><a class="detlink">Send feedback</a></div>',
    '<div class="detcell"><div class="detlbl">Certification</div><div class="detval">' + p.cert + '</div></div>',
    '</div></div>',
    '</div></div></section>',
  ].join('');
}

// ─── Skill L2 ───────────────────────────────────────────────
function skillPaneHtml(id: string, name: string, createdBy: string, desc: string, purpose: string, best: string[], setup: string[]): string {
  const bestLines = best.map(function (b) { return '<div class="instr__ln">' + b + '</div>'; }).join('');
  const setupLines = setup.map(function (s) { return '<div class="instr__ln">' + s + '</div>'; }).join('');
  return [
    '<section class="route" id="route-' + id + '">' + detailBar() + '<div class="scroll"><div class="l2">',
    '<div class="l2id"><span class="l2id__logo l2id__logo--skill">' + ICON.script + '</span>',
    '<div class="l2id__x"><div class="l2id__name">' + name + '</div><div class="l2id__sub">Created by ' + createdBy + '</div></div></div>',
    '<hr class="skdrule"/>',
    '<p class="l2desc">' + desc + '</p><div class="l2descmore"><button class="sect__more" data-descmore><span class="descmore__t">Show more</span> ' + ICON.chevD + '</button></div>',
    '<div class="l2sec"><div class="instr__hd"><h2 class="l2h2">Instructions</h2><span class="instr__ic"><button class="instr__btn" aria-label="Edit instructions">' + ico('edit-20-regular') + '</button><button class="instr__btn" aria-label="Suggest improvements">' + ico('chat-sparkle-20-regular') + '</button></span></div>',
    '<div class="instr">',
    '<div class="instr__b"><div class="instr__t">Purpose</div><p>' + purpose + '</p></div>',
    '<div class="instr__b"><div class="instr__t">Best uses</div><div class="instr__lines">' + bestLines + '</div></div>',
    '<div class="instr__b"><div class="instr__t">Skill set up</div><div class="instr__lines">' + setupLines + '</div></div>',
    '</div></div>',
    '</div></div></section>',
  ].join('');
}

function routesHtml(): string {
  let out = customizeHtml();
  PLUGINS.forEach(function (p) { out += pluginPaneHtml(p); });
  PLUGINS.forEach(function (p) {
    p.skills.forEach(function (sk) {
      out += skillPaneHtml('sk-' + slug(p.name) + '-' + slug(sk.name), sk.name, p.dev, sk.desc, sk.purpose, sk.best, sk.setup);
    });
  });
  BUILTIN_SKILLS.forEach(function (sk) {
    out += skillPaneHtml('sk-builtin-' + slug(sk.name), sk.name, 'Cowork',
      sk.desc, sk.desc, ['Included with Cowork \u2014 always available', 'No setup required'], ['This skill is built in and cannot be disabled.']);
  });
  return out;
}

// ─── Cowork CIQ content (same content as Chat CIQ, Cowork rendering) ────
const ccqPlugins = PLUGINS.map(function (p) {
  return { slug: slug(p.name), logo: pluginLogoImg(p), skills: p.skills.map(function (sk) { return { name: sk.name, desc: sk.desc }; }) };
});
const ccqContent = {
  files: [
    { icon: icoRaw('powerpoint-20-color'), title: 'Leading the way with Brew Fusion', sub: 'Opened yesterday' },
    { icon: icoRaw('word-20-color'), title: 'Q3 Product Requirements', sub: 'Edited 2 days ago' },
    { icon: icoRaw('excel-20-color'), title: 'FY25 Revenue model', sub: 'Opened last week' },
    { icon: icoRaw('powerpoint-20-color'), title: 'Brand guidelines 2026', sub: 'Edited 4 days ago' },
    { icon: icoRaw('word-20-color'), title: 'Customer research summary', sub: 'Opened 5 days ago' },
    { icon: icoRaw('excel-20-color'), title: 'Marketing budget tracker', sub: 'Edited last week' },
    { icon: icoRaw('word-20-color'), title: 'Launch retrospective', sub: 'Opened last week' },
  ],
  agents: [
    { icon: ico('agents-20-regular'), title: 'Researcher', sub: 'Deep multi-source research agent' },
    { icon: ico('agents-20-regular'), title: 'Analyst', sub: 'Data analysis and insights agent' },
    { icon: ico('agents-20-regular'), title: 'Writer', sub: 'Drafting and editing agent' },
    { icon: ico('agents-20-regular'), title: 'Planner', sub: 'Task planning and scheduling agent' },
    { icon: ico('agents-20-regular'), title: 'Summarizer', sub: 'Long-document summary agent' },
    { icon: ico('agents-20-regular'), title: 'Coder', sub: 'Code generation and review agent' },
    { icon: ico('agents-20-regular'), title: 'Presenter', sub: 'Slide and deck building agent' },
  ],
  people: [
    { icon: ico('person-20-regular'), title: 'Priya Natarajan', sub: 'Product Manager' },
    { icon: ico('person-20-regular'), title: 'Marcus Webb', sub: 'Engineering Lead' },
    { icon: ico('person-20-regular'), title: 'Elena Rodriguez', sub: 'Design Lead' },
    { icon: ico('person-20-regular'), title: 'David Kim', sub: 'Data Scientist' },
    { icon: ico('person-20-regular'), title: 'Sarah Chen', sub: 'Marketing Director' },
    { icon: ico('person-20-regular'), title: 'James Patel', sub: 'Sales Lead' },
    { icon: ico('person-20-regular'), title: 'Aisha Khan', sub: 'Customer Success' },
  ],
  meetings: [
    { icon: ico('calendar-ltr-20-regular'), title: 'Brew Fusion launch sync', sub: 'Tomorrow \u00b7 10:00 AM' },
    { icon: ico('calendar-ltr-20-regular'), title: 'Weekly product review', sub: 'Friday \u00b7 2:00 PM' },
    { icon: ico('calendar-ltr-20-regular'), title: 'Design critique', sub: 'Monday \u00b7 11:00 AM' },
    { icon: ico('calendar-ltr-20-regular'), title: 'Sprint planning', sub: 'Wednesday \u00b7 9:00 AM' },
    { icon: ico('calendar-ltr-20-regular'), title: 'Leadership standup', sub: 'Daily \u00b7 8:30 AM' },
    { icon: ico('calendar-ltr-20-regular'), title: 'Customer advisory board', sub: 'Thursday \u00b7 3:00 PM' },
    { icon: ico('calendar-ltr-20-regular'), title: 'Roadmap review', sub: 'Next Tuesday \u00b7 1:00 PM' },
  ],
  emails: [
    { icon: ico('mention-20-regular'), title: 'Re: Launch checklist', sub: 'From Priya \u00b7 yesterday' },
    { icon: ico('mention-20-regular'), title: 'Budget approval needed', sub: 'From Finance \u00b7 3 days ago' },
    { icon: ico('mention-20-regular'), title: 'Q3 OKRs draft', sub: 'From Marcus \u00b7 4 days ago' },
    { icon: ico('mention-20-regular'), title: 'Press release review', sub: 'From Comms \u00b7 today' },
    { icon: ico('mention-20-regular'), title: 'Vendor contract', sub: 'From Legal \u00b7 2 days ago' },
    { icon: ico('mention-20-regular'), title: 'Offsite logistics', sub: 'From Ops \u00b7 last week' },
    { icon: ico('mention-20-regular'), title: 'Customer escalation', sub: 'From Support \u00b7 yesterday' },
  ],
  chats: [
    { icon: ico('chat-20-regular'), title: 'Escalation trends', sub: 'Last message today' },
    { icon: ico('chat-20-regular'), title: 'Market analysis and trends', sub: 'Last message 2 days ago' },
    { icon: ico('chat-20-regular'), title: 'Launch war room', sub: 'Last message 1 hour ago' },
    { icon: ico('chat-20-regular'), title: 'Design system sync', sub: 'Last message yesterday' },
    { icon: ico('chat-20-regular'), title: 'Eng leads', sub: 'Last message 3 days ago' },
    { icon: ico('chat-20-regular'), title: 'Product feedback', sub: 'Last message today' },
    { icon: ico('chat-20-regular'), title: 'Competitive intel', sub: 'Last message last week' },
  ],
} as const;

// ─── Assemble ───────────────────────────────────────────────
const bodyJs = `
(function(){
  var hist = ['home'];
  function show(id){
    document.querySelectorAll('.route').forEach(function(r){ r.classList.remove('is-active'); });
    var el = document.getElementById('route-' + id);
    if (el){ el.classList.add('is-active'); var sc = el.querySelector('.scroll'); if (sc) sc.scrollTop = 0;
      el.querySelectorAll('.l2desc').forEach(function(d){ d.classList.remove('is-expanded'); var wrap = d.nextElementSibling; if (wrap && wrap.classList.contains('l2descmore')){ var btn = wrap.querySelector('[data-descmore]'); if (btn){ btn.classList.remove('is-open'); var t = btn.querySelector('.descmore__t'); if (t) t.textContent = 'Show more'; } wrap.classList.toggle('is-shown', d.scrollHeight > d.clientHeight + 1); } });
    }
    var railName = (id === 'home') ? 'home' : 'customize';
    document.querySelectorAll('.ni[data-nav]').forEach(function(n){
      n.classList.toggle('ni--selected', n.getAttribute('data-nav') === railName);
    });
  }
  function nav(id){ hist.push(id); show(id); }
  function back(){ if (hist.length > 1){ hist.pop(); show(hist[hist.length-1]); } }
  window.__nav = nav; window.__back = back;

  // Shared connector state (synced with Chat via localStorage; same origin).
  // Value 'on' = connected/installed, 'connect' = disconnected/discover.
  function ocSlug(x){ return String(x).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
  function ocLoad(){ try{ return JSON.parse(localStorage.getItem('oc-connectors')||'{}'); }catch(e){ return {}; } }
  function ocSet(s, st){ var m=ocLoad(); if(m[s]===st) return; m[s]=st; try{ localStorage.setItem('oc-connectors', JSON.stringify(m)); }catch(e){} }
  // Invoke a skill: drop /skill-name into the home composer as entered text.
  function invokeSkill(name){
    hist = ['home']; show('home');
    var inp = document.getElementById('composerInput');
    if (inp){ inp.value = '/' + name; inp.classList.add('composer__in--cmd'); }
    var send = document.getElementById('composerSend'); if (send) send.hidden = false;
    ccqClose();
  }

  // Cowork CIQ menu (reuses ciqMenu compound row/tab markup + styles).
  var CCQ_PLUGINS = ${JSON.stringify(ccqPlugins)};
  var CCQ_CONTENT = ${JSON.stringify(ccqContent)};
  var CCQ_TABS = [ {id:'all',label:'All'},{id:'skills',label:'Skills'},{id:'files',label:'Files'},{id:'agents',label:'Agents'},{id:'people',label:'People'},{id:'meetings',label:'Meetings'},{id:'emails',label:'Emails'},{id:'chats',label:'Chats'} ];
  var ccqTab = 'skills';
  function ccqQuery(){ var inp=document.getElementById('composerInput'); if(!inp) return ''; var v=(inp.value||'').replace(/^\\s+/,''); return v.indexOf('/')===0 ? v.slice(1).trim() : ''; }
  function ccqSkillRows(){ var out=[]; CCQ_PLUGINS.forEach(function(p){ if(!document.querySelector('.tabpane[data-pane="plugins"] .lrows .lrow[data-goto="pl-'+p.slug+'"]')) return; p.skills.forEach(function(sk){ out.push({icon:p.logo, title:'/'+sk.name, sub:sk.desc, kind:'skill', skill:sk.name}); }); }); return out; }
  function ccqMk(x){ return {icon:x.icon, title:x.title, sub:x.sub, kind:'content'}; }
  function ccqRowsFor(id){
    if(id==='skills') return ccqSkillRows();
    if(id==='all'){ var sk=ccqSkillRows(); var c=[]; ['files','people','meetings','emails','chats','agents'].forEach(function(k){ if(CCQ_CONTENT[k] && CCQ_CONTENT[k][0]) c.push(ccqMk(CCQ_CONTENT[k][0])); }); return sk.slice(0,2).concat(c); }
    return (CCQ_CONTENT[id]||[]).map(ccqMk);
  }
  function ccqRowHtml(r){
    var body = r.kind==='skill'
      ? '<span class="ciq__body"><span class="ciq__title">'+r.title+'</span><span class="ciq__desc">'+r.sub+'</span></span>'
      : '<span class="ciq__body ciq__body--row"><span class="ciq__label">'+r.title+'</span><span class="ciq__trail">'+r.sub+'</span></span>';
    var attr = r.kind==='skill' ? ' data-skill="'+r.skill+'"' : '';
    return '<button class="ciq__item"'+attr+'><span class="ciq__ico">'+r.icon+'</span>'+body+'</button>';
  }
  function ccqRender(){
    var tabsEl=document.getElementById('ccqTabs'); var listEl=document.getElementById('ccqList'); if(!tabsEl||!listEl) return;
    tabsEl.innerHTML = CCQ_TABS.map(function(t){ return '<button class="ciq__tab'+(t.id===ccqTab?' ciq__tab--sel':'')+'" data-ccqtab="'+t.id+'">'+t.label+'</button>'; }).join('');
    var rows = ccqRowsFor(ccqTab); var q=ccqQuery();
    if(q){ var ql=q.toLowerCase(); rows=rows.filter(function(r){ return (r.title+' '+r.sub).toLowerCase().indexOf(ql)!==-1; }); }
    listEl.innerHTML = rows.length ? rows.map(ccqRowHtml).join('') : '<div class="ccq__empty">No matches</div>';
  }
  function ccqOpen(tab){ if(tab) ccqTab=tab; var m=document.getElementById('ciqCowork'); if(m){ m.hidden=false; ccqRender(); } }
  function ccqClose(){ var m=document.getElementById('ciqCowork'); if(m) m.hidden=true; }

  var CHEV_R = ${JSON.stringify(ICON.chevR)};
  var OFL_MOREV = ${JSON.stringify(ico('more-vertical-20-regular'))};
  var OFL_TRY = ${JSON.stringify(ico('chat-sparkle-20-regular'))};
  var OFL_SHARE = ${JSON.stringify(ico('share-20-regular'))};
  var OFL_INFO = ${JSON.stringify(ico('info-20-regular'))};
  var OFL_REINSTALL = ${JSON.stringify(ico('arrow-sync-20-regular'))};
  var OFL_DELETE = ${JSON.stringify(ico('delete-20-regular'))};
  var PLUGIN_SKILLCARDS = ${JSON.stringify(Object.fromEntries(PLUGINS.map(function (p) { return [slug(p.name), p.skills.map(function (sk) { return skillCardHtml(p, sk); }).join('')]; })))};
  function oflHtml(){ return '<div class="drow__ofl"><button class="drow__more" data-more>' + OFL_MOREV + '</button><div class="drow__menu" role="menu"><button class="drow__mi" data-try>' + OFL_TRY + 'Try in Copilot</button><button class="drow__mi">' + OFL_SHARE + 'Share</button><button class="drow__mi">' + OFL_INFO + 'View details</button></div></div>'; }
  function hdrOflHtml(){ return '<div class="drow__ofl"><button class="drow__more" data-more aria-label="More options">' + OFL_MOREV + '</button><div class="drow__menu" role="menu"><button class="drow__mi">' + OFL_REINSTALL + 'Re-install</button><button class="drow__mi drow__mi--danger">' + OFL_DELETE + 'Delete</button></div></div>'; }
  function connectPlugin(s, silent){
    var pane = document.getElementById('route-pl-' + s);
    if (pane){
      var cta = pane.querySelector('.l2id__cta');
      if (cta) cta.innerHTML = '<button class="tgl tgl--lg is-on" aria-label="Enabled"><span class="tgl__k"></span></button>' + hdrOflHtml();
      pane.querySelectorAll('.l2sec .drows .drow').forEach(function(row){
        var chev = row.querySelector('.lrow__chev');
        if (chev){ chev.remove(); if (!row.querySelector('.drow__ofl')) row.insertAdjacentHTML('beforeend', oflHtml()); }
      });
    }
    var card = document.querySelector('.pcards .pcard[data-goto="pl-' + s + '"]');
    var rows = document.querySelector('.tabpane[data-pane="plugins"] .lrows');
    if (card && rows){
      var logoEl = card.querySelector('.pcard__logo'); var logo = logoEl ? logoEl.innerHTML : '';
      var nameEl = card.querySelector('.pcard__t'); var name = nameEl ? nameEl.textContent.trim() : s;
      var descEl = card.querySelector('.pcard__d'); var desc = descEl ? descEl.textContent.trim() : '';
      card.remove();
      var row = document.createElement('div');
      row.className = 'lrow'; row.setAttribute('role', 'button'); row.setAttribute('tabindex', '0'); row.setAttribute('data-goto', 'pl-' + s);
      row.innerHTML = '<span class="lrow__logo">' + logo + '</span><span class="lrow__x"><span class="lrow__t">' + name + '</span><span class="lrow__d">' + desc + '</span></span><button class="tgl is-on" aria-label="Enabled"><span class="tgl__k"></span></button><span class="lrow__chev">' + CHEV_R + '</span>';
      rows.appendChild(row);
    }
    var ys = document.getElementById('yourSkills');
    if (ys && PLUGIN_SKILLCARDS[s] && !ys.querySelector('[data-goto^="sk-' + s + '-"]')){ ys.insertAdjacentHTML('beforeend', PLUGIN_SKILLCARDS[s]); }
    if (!silent) ocSet(s, 'on');
  }
  function deletePlugin(s, silent){
    var pane = document.getElementById('route-pl-' + s);
    if (pane){
      var cta = pane.querySelector('.l2id__cta');
      if (cta) cta.innerHTML = '<button class="btn-dark" data-add="' + s + '">Add</button>';
      pane.querySelectorAll('.l2sec .drows .drow').forEach(function(row){
        var ofl = row.querySelector('.drow__ofl');
        if (ofl){ ofl.remove(); if (!row.querySelector('.lrow__chev')) row.insertAdjacentHTML('beforeend', '<span class="lrow__chev">' + CHEV_R + '</span>'); }
      });
    }
    var row = document.querySelector('.tabpane[data-pane="plugins"] .lrows .lrow[data-goto="pl-' + s + '"]');
    var cards = document.querySelector('.tabpane[data-pane="plugins"] .pcards');
    if (row && cards){
      var logoEl = row.querySelector('.lrow__logo'); var logo = logoEl ? logoEl.innerHTML : '';
      var nameEl = row.querySelector('.lrow__t'); var name = nameEl ? nameEl.textContent.trim() : s;
      var descEl = row.querySelector('.lrow__d'); var desc = descEl ? descEl.textContent.trim() : '';
      row.remove();
      var card = document.createElement('button');
      card.className = 'pcard'; card.setAttribute('data-goto', 'pl-' + s);
      card.innerHTML = '<span class="pcard__logo">' + logo + '</span><span class="pcard__x"><span class="pcard__t">' + name + '</span><span class="pcard__d">' + desc + '</span></span>';
      cards.appendChild(card);
    }
    var ysd = document.getElementById('yourSkills');
    if (ysd){ ysd.querySelectorAll('[data-goto^="sk-' + s + '-"]').forEach(function(el){ el.remove(); }); }
    if (!silent) ocSet(s, 'connect');
  }
  function ocApply(){
    var m = ocLoad();
    Object.keys(m).forEach(function(s){
      var st = m[s];
      var row = document.querySelector('.tabpane[data-pane="plugins"] .lrows .lrow[data-goto="pl-' + s + '"]');
      var card = document.querySelector('.tabpane[data-pane="plugins"] .pcards .pcard[data-goto="pl-' + s + '"]');
      if (st === 'on' && card){ connectPlugin(s, true); }
      else if (st === 'connect' && row){ deletePlugin(s, true); }
    });
  }
  window.addEventListener('storage', function(e){ if (e.key === 'oc-connectors'){ ocApply(); czRefresh(); } });
  ocApply();
  function czRefresh(){
    document.querySelectorAll('#route-customize .cz__sec').forEach(function(sec){
      var more = sec.querySelector('.cz__more');
      var list = sec.querySelector('.lrows, .pcards, .scards');
      if (!more || !list) return;
      var cap = list.classList.contains('pcards') ? 6 : 3;
      if (sec.getAttribute('data-expanded') === '1'){ more.style.display = 'none'; sec.classList.remove('is-collapsed'); return; }
      if (list.children.length <= cap){ more.style.display = 'none'; sec.classList.remove('is-collapsed'); }
      else { more.style.display = ''; sec.classList.add('is-collapsed'); }
    });
  }
  czRefresh();

  document.querySelectorAll('.ni[data-nav]').forEach(function(n){
    n.addEventListener('click', function(){ hist = ['home']; if (n.getAttribute('data-nav') !== 'home') hist.push('customize'); show(hist[hist.length-1]); });
  });
  // Mode segmented switch indicator
  function ssLayout(ss){ var segs = ss.querySelectorAll('.ss__seg'); var sel = parseInt(ss.getAttribute('data-selected'),10)||0; var ind = ss.querySelector('.ss__indicator'); var t = segs[sel]; if(!t||!ind) return; ind.style.width = t.offsetWidth+'px'; ind.style.transform = 'translateX('+(t.offsetLeft-4)+'px)'; }
  document.querySelectorAll('.ss').forEach(function(ss){
    ssLayout(ss);
    ss.querySelectorAll('.ss__seg').forEach(function(seg){ seg.addEventListener('click', function(){
      if (ss.classList.contains('ss--mode') && seg.getAttribute('data-i') === '0' && window.parent !== window){ window.parent.postMessage('cowork:switch-chat', '*'); return; }
      ss.querySelectorAll('.ss__seg').forEach(function(s){ s.classList.remove('ss__seg--selected'); }); seg.classList.add('ss__seg--selected'); ss.setAttribute('data-selected', seg.getAttribute('data-i')); ssLayout(ss); }); });
  });
  // Composer input → open the Cowork CIQ menu on "/" (same trigger as Chat).
  function ccqShowSend(on){ var s=document.getElementById('composerSend'); if(s) s.hidden=!on; }
  var composerInputEl = document.getElementById('composerInput');
  if (composerInputEl){
    composerInputEl.addEventListener('input', function(){
      var v = composerInputEl.value; var isCmd = v.replace(/^\\s+/,'').indexOf('/')===0;
      composerInputEl.classList.toggle('composer__in--cmd', isCmd);
      ccqShowSend(!!v.trim());
      var m = document.getElementById('ciqCowork');
      if (isCmd){ if (m && m.hidden) ccqOpen('skills'); else ccqRender(); } else { ccqClose(); }
    });
    composerInputEl.addEventListener('focus', function(){ if (composerInputEl.value.replace(/^\\s+/,'').indexOf('/')===0) ccqOpen(); });
  }
  document.addEventListener('click', function(e){
    var ccqTabEl = e.target.closest('[data-ccqtab]');
    if (ccqTabEl){ e.preventDefault(); ccqTab = ccqTabEl.getAttribute('data-ccqtab'); ccqRender(); return; }
    var ccqRowEl = e.target.closest('#ciqCowork .ciq__item');
    if (ccqRowEl){ e.preventDefault(); var sk = ccqRowEl.getAttribute('data-skill'); if (sk){ invokeSkill(sk); } else { ccqClose(); } return; }
    if (!e.target.closest('.composer-wrap')){ ccqClose(); }
  });
  document.addEventListener('click', function(e){
    var oflClick = e.target.closest('.drow__ofl');
    if (oflClick){
      var moreBtn = e.target.closest('[data-more]');
      if (moreBtn){ e.preventDefault(); e.stopPropagation(); var was = oflClick.classList.contains('open'); document.querySelectorAll('.drow__ofl.open').forEach(function(x){ x.classList.remove('open'); }); if (!was) oflClick.classList.add('open'); return; }
      if (e.target.closest('.drow__mi')){
        e.preventDefault(); e.stopPropagation();
        var mi = e.target.closest('.drow__mi');
        oflClick.classList.remove('open');
        if (mi.hasAttribute('data-try')){
          var host = mi.closest('.drow, .scard');
          var tn = host ? host.querySelector('.drow__t, .scard__t') : null;
          if (tn) invokeSkill(tn.textContent.trim());
          return;
        }
        if (mi.classList.contains('drow__mi--danger') && oflClick.closest('.l2id__cta')){
          var rt = oflClick.closest('.route');
          if (rt) deletePlugin(rt.id.replace('route-pl-', ''));
          czRefresh();
        }
        var mg = mi.getAttribute('data-goto');
        if (mg){ nav(mg); }
        return;
      }
      e.stopPropagation(); return;
    }
    document.querySelectorAll('.drow__ofl.open').forEach(function(x){ x.classList.remove('open'); });
    var dm = e.target.closest('[data-descmore]');
    if (dm){ e.preventDefault(); e.stopPropagation(); var wrapD = dm.closest('.l2descmore'); var dEl = wrapD ? wrapD.previousElementSibling : null; if (dEl && dEl.classList.contains('l2desc')){ var openD = dEl.classList.toggle('is-expanded'); dm.classList.toggle('is-open', openD); var tEl = dm.querySelector('.descmore__t'); if (tEl) tEl.textContent = openD ? 'Show less' : 'Show more'; } return; }
    var sm = e.target.closest('.cz__more .sect__more');
    if (sm && sm.closest('#route-customize')){ e.preventDefault(); var sec = sm.closest('.cz__sec'); if (sec){ sec.classList.remove('is-collapsed'); sec.setAttribute('data-expanded', '1'); var mw = sec.querySelector('.cz__more'); if (mw) mw.style.display = 'none'; } return; }
    var addEl = e.target.closest('[data-add]');
    if (addEl){ e.preventDefault(); e.stopPropagation(); connectPlugin(addEl.getAttribute('data-add')); czRefresh(); return; }
    var g = e.target.closest('[data-goto]'); if (g){ e.preventDefault(); nav(g.getAttribute('data-goto')); return; }
    var b = e.target.closest('[data-back]'); if (b){ e.preventDefault(); back(); return; }
    var t = e.target.closest('.tabs__t'); if (t){
      var tab = t.getAttribute('data-tab');
      document.querySelectorAll('.tabs__t').forEach(function(x){ x.classList.toggle('is-on', x === t); });
      document.querySelectorAll('.tabpane').forEach(function(p){ p.hidden = (p.getAttribute('data-pane') !== tab); });
      document.querySelectorAll('.cz__baractions').forEach(function(a){ a.hidden = (a.getAttribute('data-for') !== tab); });
      return;
    }
    var tg = e.target.closest('.tgl'); if (tg && !tg.disabled){ e.stopPropagation(); tg.classList.toggle('is-on'); return; }
  });
  // Add menu
  var addBtn = document.getElementById('composerAdd');
  var addMenu = document.getElementById('addMenu');
  if (addBtn && addMenu){
    addBtn.addEventListener('click', function(e){ e.stopPropagation(); addMenu.hidden = !addMenu.hidden; });
    document.addEventListener('click', function(e){ if (!addMenu.hidden && !addMenu.contains(e.target) && e.target !== addBtn) addMenu.hidden = true; });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') addMenu.hidden = true; });
    addMenu.querySelectorAll('.addmenu__it').forEach(function(it){ it.addEventListener('click', function(){ addMenu.hidden = true; if (it.hasAttribute('data-ccq-open')){ var ci=document.getElementById('composerInput'); if(ci) ci.focus(); ccqOpen('all'); } }); });
  }
})();
`;

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Cowork Skills — Prototype</title><style>' + css + '</style></head><body>'
  + '<div class="shell">'
  + railHtml()
  + '<div class="main">'
  + homeHtml()
  + routesHtml()
  + '</div>'
  + '</div>'
  + '<script>' + bodyJs + '</script>'
  + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'coworkShell.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'coworkShell.html'));
