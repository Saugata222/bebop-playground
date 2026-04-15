/**
 * Copilot Extensions — Flow Exploration
 *
 * Extensions management page within the Copilot shell layout:
 *   - Nav sidebar (256px) with Extensions item selected
 *   - Header bar (56px)
 *   - Content: "Extensions" title + tabs + search, acquired cards grid, store cards grid
 *
 * Reuses: nav, header, tab, button, acquiredCard, storeCard, menu tokens
 *
 * Usage:  npx tsx preview/src/copilotExtensions.ts
 * Output: preview/dist/copilotExtensions.html
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, ' ').trim();
}

// ─── Icons ──────────────────────────────────────────────────

const copilotIco = readIcon('copilot-20-regular.svg');
const searchIco = readIcon('search-20-regular.svg');
const moreHzIco = readIcon('more-horizontal-20-regular.svg');
const infoIco = readIcon('info-20-regular.svg');
const shareIco = readIcon('share-20-regular.svg');
const settingsIco = readIcon('settings-20-regular.svg');
const composeIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 4C10.7761 4 11 4.22386 11 4.5C11 4.77614 10.7761 5 10.5 5H6C4.89543 5 4 5.89543 4 7V14C4 15.1046 4.89543 16 6 16H13C14.1046 16 15 15.1046 15 14V9.5C15 9.22386 15.2239 9 15.5 9C15.7761 9 16 9.22386 16 9.5V14C16 15.6569 14.6569 17 13 17H6C4.34315 17 3 15.6569 3 14V7C3 5.34315 4.34315 4 6 4H10.5ZM16.1464 3.14645C16.3417 2.95118 16.6583 2.95118 16.8536 3.14645C17.0488 3.34171 17.0488 3.65829 16.8536 3.85355L9.06066 11.6464L8 12L8.35355 10.9393L16.1464 3.14645Z" fill="currentColor"/></svg>';
const broadActivityIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 4.5A1.5 1.5 0 0 1 4.5 3h11A1.5 1.5 0 0 1 17 4.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 15.5v-11ZM4.5 4a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-11ZM6 7.5A.5.5 0 0 1 6.5 7h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 6 7.5ZM6.5 10a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4Z" fill="currentColor"/></svg>';
const appsIco = readIcon('apps-20-regular.svg');
const agentsIco = readIcon('agents-20-regular.svg');
const chevDn12 = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z" fill="currentColor"/></svg>';
const chatIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C8.72679 18 7.49591 17.7018 6.38669 17.1393L6.266 17.075L2.62109 17.9851C2.31127 18.0625 2.02622 17.8369 2.00131 17.5438L2.00114 17.4624L2.01493 17.3787L2.925 13.735L2.86169 13.6153C2.4066 12.7186 2.12433 11.7422 2.03275 10.7283L2.00738 10.3463L2 10C2 5.58172 5.58172 2 10 2Z" fill="currentColor"/></svg>';
const pinIco = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.09 2.51C8.58 1.53 9.89 1.32 10.66 2.09L13.91 5.34C14.68 6.11 14.47 7.41 13.49 7.9L10.73 9.29C10.47 9.42 10.26 9.64 10.15 9.91L8.99 12.78C8.78 13.31 8.09 13.45 7.69 13.04L5.6 10.96L3.09 13.5H2.5V12.91L5.04 10.4L2.94 8.3C2.54 7.9 2.68 7.21 3.21 7L6.09 5.86C6.36 5.74 6.58 5.53 6.71 5.27L8.09 2.51Z" fill="currentColor"/></svg>';

// ─── Agent data ─────────────────────────────────────────────

const myAgents = [
  { name: 'Brand Image Sta\u2026', color: '#FF6B35' },
  { name: 'Idea Coach', color: '#4CAF50' },
  { name: 'Analyst', color: '#F2994A' },
  { name: 'Visual Creator', color: '#E040A0' },
  { name: 'People', color: '#6B4FBB' },
  { name: 'Brainstormer', color: '#00A651' },
  { name: 'Power BI', color: '#F2C811' },
  { name: 'Priority Matrix', color: '#0078D4' },
  { name: 'Researcher', color: '#6B4FBB' },
  { name: 'Deck Creator', color: '#00BCD4' },
  { name: 'Onboarding Buddy', color: '#2196F3' },
  { name: 'Figma', color: '#A259FF' },
];

const storeAgents = [
  { name: 'Sales', desc: 'Drive deals forward with clear insights and ready-to-use actions.', color: '#0078D4' },
  { name: 'Planner', desc: 'All your tasks and projects in one simple, familiar experience.', color: '#00A651' },
  { name: 'Researcher', desc: 'Fast insights to prep for your next meeting.', color: '#6B4FBB' },
  { name: 'Visual Creator', desc: 'Create stunning visuals with Microsoft 365 Copilot.', color: '#E040A0' },
  { name: 'Analyst', desc: 'Turn complex data into quick, easy-to-read answers.', color: '#F2994A' },
  { name: 'Employee Self-Service', desc: 'Assists employees by providing responses based on official policies.', color: '#0078D4' },
];

function letter(name: string): string { return name.slice(0, 2); }
function tintBg(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.1)`;
}

// ─── CSS ────────────────────────────────────────────────────

let css = '';
css += "*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n";
css += "html, body { height: 100%; font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif; color: #242424; }\n";
css += '@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }\n';

// Shell layout
css += '.shell { display: flex; height: 100vh; background: #fff; }\n';

// ─── Nav sidebar (256px, matches shell.ts nav tokens) ───
css += ".nav { width: 256px; min-width: 256px; background: #fff; display: flex; flex-direction: column; gap: 12px; padding: 8px 6px; overflow: hidden; flex-shrink: 0; border-right: 1px solid #f0f0f0; }\n";
css += '.nav__header { display: flex; align-items: center; justify-content: space-between; padding: 2px 0 0 0; }\n';
css += '.nav__body { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }\n';
css += '.nav__section { display: flex; flex-direction: column; }\n';
css += '.nav__footer { flex-shrink: 0; display: flex; flex-direction: column; gap: 4px; }\n';

// Nav header button (logo)
css += ".nhb { display: inline-flex; align-items: center; justify-content: center; padding: 8px 12px; border-radius: 12px; border: none; cursor: pointer; background: transparent; color: #242424; transition: background 0.1s; outline: none; }\n";
css += '.nhb:hover { background: rgba(36,36,36,0.04); }\n';
css += '.nhb svg { display: block; width: 20px; height: 20px; }\n';

// Nav item
css += ".ni { display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 6px 10px 6px 12px; border-radius: 12px; width: 100%; border: none; cursor: pointer; background: transparent; font-family: inherit; font-size: 14px; font-weight: 400; line-height: 1.4; color: #242424; text-align: left; transition: background 0.1s; outline: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n";
css += '.ni:hover { background: rgba(36,36,36,0.04); }\n';
css += '.ni.sel { background: #ebebeb; font-weight: 600; }\n';
css += '.ni.sel:hover { background: #e1e1e1; }\n';
css += '.ni svg { display: block; flex-shrink: 0; width: 20px; height: 20px; }\n';
css += '.ni__title { flex: 1 0 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; }\n';

// Section header
css += '.nsh { width: 100%; padding: 6px; font-size: 12px; color: #6f6f6f; font-weight: 400; line-height: 16px; cursor: default; }\n';

// Me control
css += ".me { display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 3px 10px; border-radius: 12px; flex: 1; min-width: 0; background: transparent; cursor: pointer; border: none; font-family: inherit; text-align: left; transition: background 0.1s; outline: none; color: #242424; }\n";
css += '.me:hover { background: rgba(36,36,36,0.04); }\n';
css += ".me__avatar { width: 28px; height: 28px; border-radius: 9999px; background: #d0d0d0; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: #fff; overflow: hidden; }\n";
css += ".me__avatar img { width: 100%; height: 100%; object-fit: cover; }\n";
css += ".me__info { flex: 1 0 0; min-width: 0; display: flex; flex-direction: column; }\n";
css += ".me__name { font-size: 12px; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n";
css += ".me__license { font-size: 10px; color: #6f6f6f; line-height: 1.4; }\n";

// ─── Main area ───
css += '.main { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow-y: auto; }\n';

// Header bar (56px)
css += ".hdr { display: flex; align-items: center; height: 56px; background: #fff; padding: 0 20px; flex-shrink: 0; }\n";
css += ".hdr__left { display: flex; align-items: center; gap: 4px; }\n";

// Model picker button (in header)
css += ".hdr-model { display: flex; align-items: center; gap: 4px; height: 32px; padding: 6px 10px; border-radius: 12px; border: none; background: transparent; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 400; color: #6f6f6f; transition: background 0.1s; }\n";
css += '.hdr-model:hover { background: rgba(36,36,36,0.04); }\n';
css += '.hdr-model svg { width: 12px; height: 12px; }\n';

// ─── Content area (80px padding, 1024px max-width) ───
css += '.content { padding: 24px 80px 60px; max-width: 1184px; }\n';

// Extensions header
css += '.ext-header { margin-bottom: 24px; }\n';
css += ".ext-title { font-size: 32px; font-weight: 600; line-height: 40px; color: #242424; margin-bottom: 16px; }\n";
css += '.ext-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; }\n';

// Tab list
css += '.ext-tabs { display: flex; gap: 4px; }\n';
css += ".ext-tab { height: 32px; padding: 6px 10px; border-radius: 12px; border: none; background: transparent; color: #242424; font-family: inherit; font-size: 14px; font-weight: 400; line-height: 20px; cursor: pointer; transition: background 0.1s; white-space: nowrap; }\n";
css += '.ext-tab:hover { background: rgba(36, 36, 36, 0.04); }\n';
css += '.ext-tab--active { background: #242424; color: #fff; font-weight: 600; }\n';
css += '.ext-tab--active:hover { background: #2b2b2b; }\n';

// Search box
css += ".ext-search { display: flex; align-items: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid #dedede; border-radius: 12px; background: #fff; width: 240px; }\n";
css += '.ext-search__icon { width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; }\n';
css += '.ext-search__icon svg { width: 20px; height: 20px; display: block; }\n';
css += ".ext-search__input { border: none; outline: none; font-family: inherit; font-size: 14px; color: #242424; background: transparent; flex: 1; line-height: 20px; }\n";
css += ".ext-search__input::placeholder { color: #6f6f6f; }\n";

// Section
css += '.ext-section { margin-bottom: 40px; }\n';
css += '.ext-section__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; }\n';
css += ".ext-section__title { font-size: 24px; font-weight: 600; line-height: 32px; color: #242424; }\n";
css += '.ext-section__actions { display: flex; gap: 8px; align-items: center; }\n';

// Action buttons
css += ".ext-btn { height: 38px; padding: 0 16px; border-radius: 12px; font-family: inherit; font-size: 14px; font-weight: 400; line-height: 20px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; transition: background 0.1s; outline: none; }\n";
css += '.ext-btn:focus-visible { outline: 2px solid #000; outline-offset: 1px; }\n';
css += '.ext-btn--outline { background: transparent; border: 1px solid #dedede; color: #242424; }\n';
css += '.ext-btn--outline:hover { background: rgba(36, 36, 36, 0.04); }\n';
css += '.ext-btn--primary { background: #242424; border: none; color: #fff; }\n';
css += '.ext-btn--primary:hover { background: #2b2b2b; }\n';
css += '.ext-btn svg { width: 20px; height: 20px; display: block; }\n';

// ─── Acquired Card (242×62, #f5f5f5, rounded-14) ───
css += '.acq-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 12px; }\n';
css += ".acq-card { display: flex; align-items: center; gap: 14px; height: 62px; padding: 9px 18px; border-radius: 14px; background: #f5f5f5; cursor: default; position: relative; transition: background 0.1s; }\n";
css += '.acq-card:hover { background: #ebebeb; }\n';
css += '.acq-card__icon { width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #fff; font-size: 14px; font-weight: 600; }\n';
css += ".acq-card__name { font-size: 16px; font-weight: 400; line-height: 24px; color: #242424; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n";
css += '.acq-card__more { width: 20px; height: 20px; color: #242424; opacity: 0; transition: opacity 0.15s; cursor: pointer; flex-shrink: 0; background: none; border: none; padding: 0; display: flex; align-items: center; justify-content: center; }\n';
css += '.acq-card__more svg { width: 20px; height: 20px; display: block; }\n';
css += '.acq-card:hover .acq-card__more { opacity: 1; }\n';

// Context menu (elevation-3)
css += '.acq-menu { position: absolute; top: 64px; right: 0; width: 202px; background: #fff; border-radius: 16px; padding: 8px; box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.18); z-index: 10; display: none; }\n';
css += '.acq-menu--open { display: block; }\n';
css += ".acq-menu__item { display: flex; align-items: center; gap: 6px; padding: 10px 12px; border-radius: 12px; font-size: 14px; font-weight: 400; line-height: 20px; color: #242424; cursor: pointer; transition: background 0.1s; }\n";
css += '.acq-menu__item:hover { background: rgba(36, 36, 36, 0.04); }\n';
css += '.acq-menu__item svg { width: 20px; height: 20px; flex-shrink: 0; display: block; }\n';

// ─── Store Card (333×110, white, 1px #dedede, rounded-18) ───
css += '.store-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 12px; }\n';
css += ".store-card { display: flex; align-items: center; padding: 17px 24px 17px 26px; border: 1px solid #dedede; border-radius: 18px; background: #fff; gap: 9px; cursor: default; transition: border-color 0.15s; }\n";
css += '.store-card:hover { border-color: #c4c4c4; }\n';
css += '.store-card__icon { width: 54px; height: 54px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; backdrop-filter: blur(8.4px); border: 0.844px solid rgba(0, 0, 0, 0.05); box-shadow: 0px 1.688px 6.75px 0px rgba(0, 0, 0, 0.05); color: #fff; font-size: 18px; font-weight: 600; }\n';
css += '.store-card__text { flex: 1; min-width: 0; }\n';
css += ".store-card__name { font-size: 14px; font-weight: 600; line-height: 20px; color: #242424; }\n";
css += ".store-card__desc { font-size: 14px; font-weight: 400; line-height: 20px; color: #616161; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }\n";

// See more
css += '.ext-seemore { display: flex; justify-content: flex-end; }\n';
css += ".ext-seemore__link { display: inline-flex; align-items: center; gap: 4px; font-size: 14px; font-weight: 400; color: #242424; cursor: pointer; background: none; border: none; padding: 6px 10px; border-radius: 12px; transition: background 0.1s; font-family: inherit; }\n";
css += '.ext-seemore__link:hover { background: rgba(36, 36, 36, 0.04); }\n';
css += '.ext-seemore__link svg { width: 12px; height: 12px; display: block; }\n';

// Scrollbar
css += '::-webkit-scrollbar { width: 6px; }\n';
css += '::-webkit-scrollbar-track { background: transparent; }\n';
css += '::-webkit-scrollbar-thumb { background: #6f6f6f; border-radius: 9999px; background-clip: content-box; border: 2px solid transparent; }\n';
css += '* { scrollbar-width: thin; scrollbar-color: #6f6f6f transparent; }\n';

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html>';
html += '<html lang="en">';
html += '<head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Copilot Extensions \u2014 Bebop Design System</title>';
html += '<style>' + css + '</style>';
html += '</head>';
html += '<body>';
html += '<div class="shell">';

// ─── Nav sidebar ───
html += '<nav class="nav">';
html += '<div class="nav__header">';
html += '<button class="nhb" type="button" aria-label="Copilot">' + copilotIco + '</button>';
html += '<button class="nhb" type="button" aria-label="New chat">' + composeIco + '</button>';
html += '</div>';
html += '<div class="nav__body">';
html += '<div class="nav__section">';
html += '<button class="ni" type="button">' + searchIco + '<span class="ni__title">Search</span></button>';
html += '<button class="ni" type="button">' + chatIco + '<span class="ni__title">Chats</span></button>';
html += '<button class="ni sel" type="button">' + appsIco + '<span class="ni__title">Extensions</span></button>';
html += '</div>';
html += '<div class="nav__section">';
html += '<span class="nsh">' + pinIco + ' Pinned</span>';
html += '<button class="ni" type="button">' + agentsIco + '<span class="ni__title">Researcher</span></button>';
html += '<button class="ni" type="button">' + agentsIco + '<span class="ni__title">Employee Training</span></button>';
html += '</div>';
html += '<div class="nav__section">';
html += '<span class="nsh">Chats</span>';
html += '<button class="ni" type="button"><span class="ni__title">Relocation benefits</span></button>';
html += '<button class="ni" type="button"><span class="ni__title">Escalation trends</span></button>';
html += '<button class="ni" type="button"><span class="ni__title">Market Analysis</span></button>';
html += '</div>';
html += '</div>';
html += '<div class="nav__footer">';
html += '<button class="me" type="button">';
html += '<span class="me__avatar"><img src="../../src/components/icons/avatar-mona-kane.png" alt="MK" /></span>';
html += '<span class="me__info"><span class="me__name">Mona Kane</span><span class="me__license">M365 Copilot (Premium)</span></span>';
html += '</button>';
html += '</div>';
html += '</nav>';

// ─── Main ───
html += '<div class="main">';

// Header bar
html += '<div class="hdr">';
html += '<div class="hdr__left">';
html += '<button class="hdr-model" type="button">4 Auto ' + chevDn12 + '</button>';
html += '</div>';
html += '</div>';

// Content
html += '<div class="content">';

// Extensions header
html += '<div class="ext-header">';
html += '<h1 class="ext-title">Extensions</h1>';
html += '<div class="ext-toolbar">';
html += '<div class="ext-tabs">';
html += '<button class="ext-tab" type="button" data-tab="all">All</button>';
html += '<button class="ext-tab ext-tab--active" type="button" data-tab="agents">Agents &amp; skills</button>';
html += '<button class="ext-tab" type="button" data-tab="sources">Data sources</button>';
html += '</div>';
html += '<div class="ext-search">';
html += '<span class="ext-search__icon">' + searchIco + '</span>';
html += '<input class="ext-search__input" type="text" placeholder="Search for agent or skill" aria-label="Search extensions" />';
html += '</div>';
html += '</div>';
html += '</div>';

// ─── My agents & skills ───
html += '<div class="ext-section" id="myAgents">';
html += '<div class="ext-section__head">';
html += '<h2 class="ext-section__title">My agents &amp; skills</h2>';
html += '<div class="ext-section__actions">';
html += '<button class="ext-btn ext-btn--outline" type="button">' + broadActivityIco + ' Agents activity</button>';
html += '<button class="ext-btn ext-btn--primary" type="button">' + composeIco + ' Create agent or skill</button>';
html += '</div>';
html += '</div>';
html += '<div class="acq-grid">';

for (const agent of myAgents) {
  html += '<div class="acq-card">';
  html += '<div class="acq-card__icon" style="background:' + agent.color + '">' + letter(agent.name) + '</div>';
  html += '<span class="acq-card__name">' + agent.name + '</span>';
  html += '<button class="acq-card__more" type="button" aria-label="More options" data-menu-trigger>' + moreHzIco + '</button>';
  html += '<div class="acq-menu">';
  html += '<div class="acq-menu__item">' + infoIco + ' About</div>';
  html += '<div class="acq-menu__item">' + shareIco + ' Share</div>';
  html += '<div class="acq-menu__item">' + settingsIco + ' Manage</div>';
  html += '</div>';
  html += '</div>';
}

html += '</div>';
html += '<div class="ext-seemore"><button class="ext-seemore__link" type="button">See more ' + chevDn12 + '</button></div>';
html += '</div>';

// ─── Connect more ───
html += '<div class="ext-section" id="connectMore">';
html += '<div class="ext-section__head">';
html += '<h2 class="ext-section__title">Connect more</h2>';
html += '</div>';
html += '<div class="store-grid">';

for (const agent of storeAgents) {
  html += '<div class="store-card">';
  html += '<div class="store-card__icon" style="background:' + tintBg(agent.color) + ';color:' + agent.color + '">' + letter(agent.name) + '</div>';
  html += '<div class="store-card__text">';
  html += '<div class="store-card__name">' + agent.name + '</div>';
  html += '<div class="store-card__desc">' + agent.desc + '</div>';
  html += '</div>';
  html += '</div>';
}

html += '</div>';
html += '<div class="ext-seemore"><button class="ext-seemore__link" type="button">See more ' + chevDn12 + '</button></div>';
html += '</div>';

html += '</div>'; // content
html += '</div>'; // main
html += '</div>'; // shell

// ─── Script ─────────────────────────────────────────────────

html += '<script>\n';

// Tab switching
html += 'document.querySelectorAll(\'.ext-tab\').forEach(function(tab) {\n';
html += '  tab.addEventListener(\'click\', function() {\n';
html += '    document.querySelectorAll(\'.ext-tab\').forEach(function(t) { t.classList.remove(\'ext-tab--active\'); });\n';
html += '    tab.classList.add(\'ext-tab--active\');\n';
html += '  });\n';
html += '});\n';
html += '\n';

// Overflow menu toggle
html += 'document.querySelectorAll(\'[data-menu-trigger]\').forEach(function(btn) {\n';
html += '  btn.addEventListener(\'click\', function(e) {\n';
html += '    e.stopPropagation();\n';
html += '    var menu = btn.parentElement.querySelector(\'.acq-menu\');\n';
html += '    var isOpen = menu.classList.contains(\'acq-menu--open\');\n';
html += '    document.querySelectorAll(\'.acq-menu--open\').forEach(function(m) { m.classList.remove(\'acq-menu--open\'); });\n';
html += '    if (!isOpen) menu.classList.add(\'acq-menu--open\');\n';
html += '  });\n';
html += '});\n';
html += '\n';

// Close menus on click outside
html += 'document.addEventListener(\'click\', function() {\n';
html += '  document.querySelectorAll(\'.acq-menu--open\').forEach(function(m) { m.classList.remove(\'acq-menu--open\'); });\n';
html += '});\n';
html += '\n';

// Search filtering
html += 'var searchInput = document.querySelector(\'.ext-search__input\');\n';
html += 'if (searchInput) {\n';
html += '  searchInput.addEventListener(\'input\', function() {\n';
html += '    var q = searchInput.value.toLowerCase();\n';
html += '    document.querySelectorAll(\'.acq-card\').forEach(function(card) {\n';
html += '      var name = card.querySelector(\'.acq-card__name\').textContent.toLowerCase();\n';
html += '      card.style.display = name.includes(q) ? \'\' : \'none\';\n';
html += '    });\n';
html += '    document.querySelectorAll(\'.store-card\').forEach(function(card) {\n';
html += '      var name = card.querySelector(\'.store-card__name\').textContent.toLowerCase();\n';
html += '      var desc = card.querySelector(\'.store-card__desc\').textContent.toLowerCase();\n';
html += '      card.style.display = (name.includes(q) || desc.includes(q)) ? \'\' : \'none\';\n';
html += '    });\n';
html += '  });\n';
html += '}\n';

html += '<\/script>\n';
html += '</body></html>';

// ─── Write ──────────────────────────────────────────────────
const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'copilotExtensions.html'), html, 'utf-8');
console.log('Done: preview/dist/copilotExtensions.html');
