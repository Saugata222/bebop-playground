/**
 * patch-shell-store.ts — Patches shell.ts output (shell.html) to add the Model 1 Store
 *
 * Reads the generated shell.html and injects:
 *   - Store CSS
 *   - "Agents & Apps" nav button
 *   - Store view HTML (hidden by default)
 *   - Detail modal
 *   - Store JavaScript interactions
 *
 * Usage:  npx tsx preview/src/shell.ts && npx tsx preview/src/patch-shell-store.ts
 * Output: Modifies preview/dist/shell.html in-place
 */

import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist', 'shell.html');
let html = fs.readFileSync(filePath, 'utf-8');

// ─── Icons ──────────────────────────────────────────────────
const agentIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.20949 2.81648C5.53001 2.30825 6.08885 2 6.6897 2H9.50021C9.77635 2 10.0002 2.22386 10.0002 2.5C10.0002 2.77614 9.77635 3 9.50021 3H6.6897C6.43219 3 6.19269 3.13211 6.05533 3.34992L2.11367 9.59992C1.95951 9.84436 1.95951 10.1556 2.11367 10.4001L5.97726 16.5263C6.16322 16.8212 6.48744 17 6.83604 17C7.29602 17 7.69854 16.6908 7.81706 16.2463L11.218 3.49284C11.4527 2.61252 12.25 2 13.1611 2C13.8557 2 14.5011 2.35842 14.8682 2.94804L18.7888 9.24456C19.0768 9.70702 19.0768 10.293 18.7888 10.7554L14.7916 17.175C14.4721 17.6881 13.9105 18 13.306 18H10.5002C10.2241 18 10.0002 17.7761 10.0002 17.5C10.0002 17.2239 10.2241 17 10.5002 17H13.306C13.5651 17 13.8058 16.8663 13.9427 16.6464L17.9399 10.2269C18.0264 10.088 18.0264 9.91202 17.9399 9.77313L14.0193 3.47661C13.8347 3.18019 13.5103 3 13.1611 3C12.703 3 12.3022 3.30794 12.1842 3.75051L8.78329 16.504C8.54804 17.3862 7.74907 18 6.83604 18C6.1441 18 5.50054 17.645 5.13143 17.0597L1.26783 10.9335C0.908119 10.3632 0.908119 9.63685 1.26783 9.06648L5.20949 2.81648Z" fill="currentColor"/></svg>';
const searchIco16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.4419 10.3975C12.4106 9.18809 13 7.66462 13 6C13 2.68629 10.3137 0 7 0C3.68629 0 1 2.68629 1 6C1 9.31371 3.68629 12 7 12C8.66462 12 10.1881 11.4106 11.3975 10.4419L14.2929 13.3371C14.6835 13.7277 15.3166 13.7277 15.7071 13.3371C16.0976 12.9466 16.0976 12.3135 15.7071 11.9229L11.4419 10.3975ZM11 6C11 8.20914 9.20914 10 7 10C4.79086 10 3 8.20914 3 6C3 3.79086 4.79086 2 7 2C9.20914 2 11 3.79086 11 6Z" fill="currentColor"/></svg>';
const addIco16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C8.27614 1.5 8.5 1.72386 8.5 2V7.5H14C14.2761 7.5 14.5 7.72386 14.5 8C14.5 8.27614 14.2761 8.5 14 8.5H8.5V14C8.5 14.2761 8.27614 14.5 8 14.5C7.72386 14.5 7.5 14.2761 7.5 14V8.5H2C1.72386 8.5 1.5 8.27614 1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H7.5V2C7.5 1.72386 7.72386 1.5 8 1.5Z" fill="currentColor"/></svg>';
const moreIco16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 8C5 8.55228 4.55228 9 4 9C3.44772 9 3 8.55228 3 8C3 7.44772 3.44772 7 4 7C4.55228 7 5 7.44772 5 8ZM9 8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8ZM12 9C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8C11 8.55228 11.4477 9 12 9Z" fill="currentColor"/></svg>';
const dismissIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4.08859 4.21569L4.14645 4.14645C4.32001 3.97288 4.58944 3.9536 4.78431 4.08859L4.85355 4.14645L10 9.293L15.1464 4.14645C15.32 3.97288 15.5894 3.9536 15.7843 4.08859L15.8536 4.14645C16.0271 4.32 16.0464 4.58944 15.9114 4.78431L15.8536 4.85355L10.707 10L15.8536 15.1464C16.0271 15.32 16.0464 15.5894 15.9114 15.7843L15.8536 15.8536C15.68 16.0271 15.4106 16.0464 15.2157 15.9114L15.1464 15.8536L10 10.707L4.85355 15.8536C4.67999 16.0271 4.41056 16.0464 4.21569 15.9114L4.14645 15.8536C3.97288 15.68 3.9536 15.4106 4.08859 15.2157L4.14645 15.1464L9.293 10L4.14645 4.85355C3.97288 4.67999 3.9536 4.41056 4.08859 4.21569Z" fill="currentColor"/></svg>';
const chevRightIco16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5.64645 2.14645C5.45118 2.34171 5.45118 2.65829 5.64645 2.85355L9.79289 7L5.64645 11.1464C5.45118 11.3417 5.45118 11.6583 5.64645 11.8536C5.84171 12.0488 6.15829 12.0488 6.35355 11.8536L10.8536 7.35355C11.0488 7.15829 11.0488 6.84171 10.8536 6.64645L6.35355 2.14645C6.15829 1.95118 5.84171 1.95118 5.64645 2.14645Z" fill="currentColor"/></svg>';

function cardIco(color: string, text: string, size: number): string {
  const r = size === 48 ? 14 : size === 40 ? 12 : 10;
  const fs = size === 48 ? 18 : size === 40 ? 16 : 14;
  const ty = size === 48 ? 31 : size === 40 ? 27 : 24;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none"><rect width="${size}" height="${size}" rx="${r}" fill="${color}"/><text x="${size/2}" y="${ty}" text-anchor="middle" font-size="${fs}" font-weight="600" fill="#fff" font-family="Segoe UI, sans-serif">${text}</text></svg>`;
}

// ─── 1. Store CSS ───────────────────────────────────────────
const storeCSS = `
/* ─── Store view ─── */
.store-view { display: none; flex: 1; flex-direction: column; overflow: hidden; }
.shell--store .store-view { display: flex; }
.shell--store .hdr, .shell--store .content, .shell--store .input-footer, .shell--store .am-overlay { display: none !important; }
.store-hdr { display: flex; align-items: center; justify-content: space-between; height: 56px; padding: 0 32px; flex-shrink: 0; border-bottom: 1px solid #f0f0f0; }
.store-hdr__title { font-size: 20px; font-weight: 600; font-family: 'Segoe UI', sans-serif; }
.store-hdr__actions { display: flex; align-items: center; gap: 8px; }
.store-hdr__btn { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border-radius: 8px; border: 1px solid #dedede; background: #fff; cursor: pointer; font-family: inherit; font-size: 13px; color: #242424; transition: background 0.1s; }
.store-hdr__btn:hover { background: #f5f5f5; }
.store-hdr__btn svg { width: 16px; height: 16px; }
.store-hdr__btn--primary { background: #242424; color: #fff; border-color: #242424; }
.store-hdr__btn--primary:hover { background: #3b3b3b; }
.store-tabs { display: flex; gap: 0; padding: 0 32px; border-bottom: 1px solid #f0f0f0; flex-shrink: 0; }
.store-tab { padding: 10px 16px; font-size: 14px; font-weight: 400; color: #5d5d5d; cursor: pointer; border: none; background: none; font-family: inherit; border-bottom: 2px solid transparent; transition: color 0.15s, border-color 0.15s; }
.store-tab:hover { color: #242424; }
.store-tab--active { color: #242424; font-weight: 600; border-bottom-color: #242424; }
.store-search { margin: 24px 32px 0; display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 12px; border-radius: 8px; border: 1px solid #dedede; background: #fff; transition: border-color 0.15s; }
.store-search:focus-within { border-color: #242424; }
.store-search svg { width: 16px; height: 16px; color: #6f6f6f; flex-shrink: 0; }
.store-search input { flex: 1; border: none; outline: none; font-family: inherit; font-size: 14px; background: transparent; color: #242424; }
.store-search input::placeholder { color: #6f6f6f; }
.store-scroll { flex: 1; overflow-y: auto; padding: 0 32px 40px; }
.store-section { margin-top: 28px; }
.store-section__title { font-size: 16px; font-weight: 600; margin-bottom: 16px; font-family: 'Segoe UI', sans-serif; }
.card-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.card-compact { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 12px; border: 1px solid #f0f0f0; background: #fff; cursor: pointer; transition: background 0.15s, box-shadow 0.15s; position: relative; min-width: 0; }
.card-compact:hover { background: #fafafa; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
.card-compact__icon { width: 36px; height: 36px; flex-shrink: 0; }
.card-compact__icon svg { display: block; }
.card-compact__name { font-size: 13px; font-weight: 400; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0; }
.card-compact__badge { position: absolute; top: 6px; right: 6px; font-size: 9px; font-weight: 600; padding: 1px 5px; border-radius: 4px; line-height: 14px; text-transform: uppercase; letter-spacing: 0.3px; }
.card-compact__badge--agent { background: #E8DEF8; color: #6B4FBB; }
.card-compact__badge--app { background: #D4EDDA; color: #0F7B3F; }
.card-compact__more { position: absolute; top: 6px; right: 6px; width: 24px; height: 24px; border-radius: 6px; border: none; background: rgba(255,255,255,0.9); cursor: pointer; display: none; align-items: center; justify-content: center; color: #5d5d5d; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
.card-compact:hover .card-compact__more { display: flex; }
.card-compact:hover .card-compact__badge { display: none; }
.card-compact__more svg { width: 16px; height: 16px; }
.card-grid--lg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.card-lg { display: flex; align-items: flex-start; gap: 14px; padding: 16px 18px; border-radius: 16px; border: 1px solid #f0f0f0; background: #fff; cursor: pointer; transition: background 0.15s, box-shadow 0.15s; }
.card-lg:hover { background: #fafafa; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.card-lg__icon { width: 40px; height: 40px; flex-shrink: 0; }
.card-lg__icon svg { display: block; }
.card-lg__text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.card-lg__name { font-size: 14px; font-weight: 600; line-height: 1.3; display: flex; align-items: center; gap: 6px; }
.card-lg__desc { font-size: 13px; color: #5d5d5d; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.card-lg__type { font-size: 10px; font-weight: 600; padding: 1px 6px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.3px; }
.store-seemore { display: flex; align-items: center; gap: 4px; margin-top: 12px; font-size: 13px; color: #5d5d5d; cursor: pointer; background: none; border: none; font-family: inherit; padding: 4px 0; }
.store-seemore:hover { color: #242424; }
.store-seemore svg { width: 16px; height: 16px; }
/* Detail modal */
.smodal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 1000; align-items: center; justify-content: center; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
.smodal-overlay--open { display: flex; }
.smodal { width: 560px; max-height: 80vh; background: #fff; border-radius: 20px; box-shadow: 0 16px 48px rgba(0,0,0,0.16); display: flex; flex-direction: column; overflow: hidden; }
.smodal__header { padding: 24px 24px 16px; display: flex; align-items: flex-start; gap: 16px; }
.smodal__icon { width: 48px; height: 48px; flex-shrink: 0; }
.smodal__icon svg { display: block; }
.smodal__info { flex: 1; }
.smodal__name { font-size: 20px; font-weight: 600; line-height: 1.3; }
.smodal__creator { font-size: 13px; color: #5d5d5d; margin-top: 2px; }
.smodal__close { width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #5d5d5d; transition: background 0.1s; flex-shrink: 0; }
.smodal__close:hover { background: rgba(36,36,36,0.04); }
.smodal__close svg { width: 20px; height: 20px; }
.smodal__tag { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 12px 24px; }
.smodal__cta { margin: 0 24px; height: 36px; border-radius: 8px; border: none; background: #242424; color: #fff; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
.smodal__cta:hover { background: #3b3b3b; }
.smodal__cta--connect { background: #0078D4; }
.smodal__cta--connect:hover { background: #106EBE; }
.smodal__stats { display: flex; align-items: center; gap: 0; padding: 16px 24px; margin-top: 8px; border-top: 1px solid #f0f0f0; }
.smodal__stat { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; }
.smodal__stat-val { font-size: 15px; font-weight: 600; }
.smodal__stat-label { font-size: 11px; color: #6f6f6f; }
.smodal__stat + .smodal__stat { border-left: 1px solid #f0f0f0; }
.smodal__body { flex: 1; overflow-y: auto; padding: 16px 24px 24px; }
.smodal__preview { width: 100%; height: 180px; border-radius: 12px; background: linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%); margin-bottom: 16px; display: flex; align-items: center; justify-content: center; color: #929292; font-size: 14px; }
.smodal__desc { font-size: 14px; line-height: 1.6; color: #424242; }
`;
html = html.replace('</style>', storeCSS + '</style>');

// ─── 2. Nav button: "Agents & Apps" after Search ────────────
const searchBtn = `<button class="ni"><svg width="20" height="20"`;
const searchBtnIdx = html.indexOf(searchBtn);
if (searchBtnIdx >= 0) {
  // Find end of this button
  const afterSearch = html.indexOf('</button>', searchBtnIdx) + '</button>'.length;
  const storeNavBtn = `<button class="ni" id="storeNavBtn">${agentIco}<span class="ni__title">Agents &amp; Apps</span></button>`;
  html = html.substring(0, afterSearch) + storeNavBtn + html.substring(afterSearch);
}

// ─── 3. Build store HTML ────────────────────────────────────

// Card data
const myItems = [
  { n: 'Sales', c: '#0078D4', l: 'Sa', t: 'agent', d: 'Drive deals forward with insights.', cr: 'Microsoft' },
  { n: 'Idea Coach', c: '#FFB800', l: 'IC', t: 'agent', d: 'Creative brainstorming partner.', cr: 'Microsoft' },
  { n: 'Analyst', c: '#F2994A', l: 'An', t: 'agent', d: 'Turn data into easy-to-read answers.', cr: 'Microsoft' },
  { n: 'Visual Creator', c: '#E040A0', l: 'VC', t: 'agent', d: 'Create stunning visuals.', cr: 'Microsoft' },
  { n: 'Researcher', c: '#6B4FBB', l: 'Re', t: 'agent', d: 'Fast insights for your next meeting.', cr: 'Microsoft' },
  { n: 'Power BI', c: '#F2C800', l: 'PB', t: 'agent', d: 'Interactive data dashboards.', cr: 'Microsoft' },
  { n: 'Salesforce', c: '#00A1E0', l: 'SF', t: 'app', d: 'CRM data: leads, pipeline, contacts.', cr: 'Salesforce' },
  { n: 'Jira', c: '#0052CC', l: 'Ji', t: 'app', d: 'Tickets, sprints, and backlogs.', cr: 'Atlassian' },
  { n: 'GitHub', c: '#24292E', l: 'GH', t: 'app', d: 'Repos, PRs, and issues.', cr: 'GitHub' },
  { n: 'Brainstormer', c: '#00BFA5', l: 'Br', t: 'agent', d: 'Group ideation sessions.', cr: 'Microsoft' },
  { n: 'Figma', c: '#A259FF', l: 'Fi', t: 'app', d: 'Design files and components.', cr: 'Figma' },
  { n: 'People', c: '#4A90D9', l: 'Pe', t: 'agent', d: 'Find colleagues and org charts.', cr: 'Microsoft' },
];

const msCards = [
  { n: 'Sales', d: 'Drive deals forward with clear insights and ready-to-use actions.', c: '#0078D4', l: 'Sa', t: 'agent' },
  { n: 'Planner', d: 'All your tasks and projects in one simple, familiar experience.', c: '#00A651', l: 'Pl', t: 'agent' },
  { n: 'Researcher', d: 'Fast insights to prep for your next meeting.', c: '#6B4FBB', l: 'Re', t: 'agent' },
  { n: 'Visual Creator', d: 'Create stunning visuals with Microsoft 365 Copilot.', c: '#E040A0', l: 'VC', t: 'agent' },
  { n: 'Employee Self Service', d: 'Assists employees by providing responses based on official policies.', c: '#0078D4', l: 'ES', t: 'agent' },
  { n: 'RFP Generator', d: 'Build an RFP like a Microsoft Pro.', c: '#FF5733', l: 'RG', t: 'agent' },
];

const appCards = [
  { n: 'ServiceNow', d: 'IT service management, tickets, and knowledge base.', c: '#81B5A1', l: 'SN' },
  { n: 'Confluence', d: 'Wiki pages and team documentation.', c: '#0052CC', l: 'Co' },
  { n: 'Google Drive', d: 'Files and documents from Google Workspace.', c: '#4285F4', l: 'GD' },
  { n: 'HubSpot', d: 'Marketing automation, CRM, and sales pipeline.', c: '#FF7A59', l: 'HS' },
  { n: 'Notion', d: 'Notes, docs, and project management workspace.', c: '#000000', l: 'No' },
  { n: 'Slack', d: 'Team messages, channels, and shared files.', c: '#4A154B', l: 'Sl' },
];

let storeHTML = '';
storeHTML += '<div class="store-view" id="storeView">';

// Store header
storeHTML += '<div class="store-hdr">';
storeHTML += '<span class="store-hdr__title">Agents &amp; Apps</span>';
storeHTML += '<div class="store-hdr__actions">';
storeHTML += `<button class="store-hdr__btn">${agentIco} Agents activity</button>`;
storeHTML += `<button class="store-hdr__btn store-hdr__btn--primary">${addIco16} Create agent</button>`;
storeHTML += '</div></div>';

// Tabs
storeHTML += '<div class="store-tabs">';
storeHTML += '<button class="store-tab store-tab--active" data-stab="all">All</button>';
storeHTML += '<button class="store-tab" data-stab="agent">Agents</button>';
storeHTML += '<button class="store-tab" data-stab="app">Apps</button>';
storeHTML += '</div>';

// Scrollable content
storeHTML += '<div class="store-scroll">';
storeHTML += `<div class="store-search"><span>${searchIco16}</span><input type="text" placeholder="Search for an agent or app" /></div>`;

// My agents & apps
storeHTML += '<div class="store-section"><div class="store-section__title">My agents &amp; apps</div><div class="card-grid">';
for (const item of myItems) {
  const badge = item.t === 'agent' ? 'Agent' : 'App';
  const badgeCls = `card-compact__badge--${item.t}`;
  storeHTML += `<div class="card-compact" data-type="${item.t}" data-name="${item.n}" data-desc="${item.d}" data-creator="${item.cr}" data-color="${item.c}">`;
  storeHTML += `<span class="card-compact__icon">${cardIco(item.c, item.l, 36)}</span>`;
  storeHTML += `<span class="card-compact__name">${item.n}</span>`;
  storeHTML += `<span class="card-compact__badge ${badgeCls}">${badge}</span>`;
  storeHTML += `<button class="card-compact__more">${moreIco16}</button>`;
  storeHTML += '</div>';
}
storeHTML += `</div><button class="store-seemore">See more ${chevRightIco16}</button></div>`;

// Built by Microsoft
storeHTML += '<div class="store-section"><div class="store-section__title">Built by Microsoft</div><div class="card-grid--lg">';
for (const c of msCards) {
  const badgeCls = `card-compact__badge--${c.t}`;
  const badge = c.t === 'agent' ? 'Agent' : 'App';
  storeHTML += `<div class="card-lg" data-type="${c.t}" data-name="${c.n}" data-desc="${c.d}" data-creator="Microsoft" data-color="${c.c}">`;
  storeHTML += `<span class="card-lg__icon">${cardIco(c.c, c.l, 40)}</span>`;
  storeHTML += `<div class="card-lg__text"><span class="card-lg__name">${c.n} <span class="card-lg__type ${badgeCls}">${badge}</span></span>`;
  storeHTML += `<span class="card-lg__desc">${c.d}</span></div></div>`;
}
storeHTML += `</div><button class="store-seemore">See more ${chevRightIco16}</button></div>`;

// Available Apps
storeHTML += '<div class="store-section"><div class="store-section__title">Available Apps</div><div class="card-grid--lg">';
for (const a of appCards) {
  storeHTML += `<div class="card-lg" data-type="app" data-name="${a.n}" data-desc="${a.d}" data-creator="${a.n}" data-color="${a.c}">`;
  storeHTML += `<span class="card-lg__icon">${cardIco(a.c, a.l, 40)}</span>`;
  storeHTML += `<div class="card-lg__text"><span class="card-lg__name">${a.n} <span class="card-lg__type card-compact__badge--app">App</span></span>`;
  storeHTML += `<span class="card-lg__desc">${a.d}</span></div></div>`;
}
storeHTML += '</div></div>';
storeHTML += '</div>'; // store-scroll
storeHTML += '</div>'; // store-view

// Insert before </div><!-- end main -->
// Find the am-overlay closing and insert store view after it
const amClose = '</div> <!-- end am-overlay -->';
const mainClose = '</div><!-- end main -->';

// Actually, let's find the pattern more robustly
const amOverlayEnd = html.indexOf('</div><!-- end am');
if (amOverlayEnd < 0) {
  // Try without comment
  // Insert before the last few </div> before </body>. Find </div></div><script>
  const scriptTag = html.indexOf('<script>');
  const insertPos = html.lastIndexOf('</div>', scriptTag);
  const insertPos2 = html.lastIndexOf('</div>', insertPos - 1);
  html = html.substring(0, insertPos2) + storeHTML + html.substring(insertPos2);
} else {
  // Insert after am-overlay end, before main end
  const insertAfter = html.indexOf('</div>', amOverlayEnd) + 6;
  html = html.substring(0, insertAfter) + storeHTML + html.substring(insertAfter);
}

// ─── 4. Detail modal (before </body>) ──────────────────────
let modalHTML = '';
modalHTML += '<div class="smodal-overlay" id="sModalOverlay">';
modalHTML += '<div class="smodal">';
modalHTML += '<div class="smodal__header">';
modalHTML += '<span class="smodal__icon" id="sModalIcon"></span>';
modalHTML += '<div class="smodal__info"><div class="smodal__name" id="sModalName"></div><div class="smodal__creator" id="sModalCreator"></div></div>';
modalHTML += `<button class="smodal__close" id="sModalClose">${dismissIco}</button>`;
modalHTML += '</div>';
modalHTML += '<div class="smodal__tag" id="sModalTag"></div>';
modalHTML += '<button class="smodal__cta" id="sModalCta">Add</button>';
modalHTML += '<div class="smodal__stats">';
modalHTML += '<div class="smodal__stat"><span class="smodal__stat-val">4.8 \u2605</span><span class="smodal__stat-label">3K ratings, 247 reviews</span></div>';
modalHTML += '<div class="smodal__stat"><span class="smodal__stat-val">2.6K</span><span class="smodal__stat-label">Installs in the last month</span></div>';
modalHTML += '<div class="smodal__stat"><span class="smodal__stat-val">Free</span><span class="smodal__stat-label">Premium subscription available</span></div>';
modalHTML += '</div>';
modalHTML += '<div class="smodal__body">';
modalHTML += '<div class="smodal__preview" id="sModalPreview">Preview</div>';
modalHTML += '<div class="smodal__desc" id="sModalDesc"></div>';
modalHTML += '</div></div></div>';

html = html.replace('<script>', modalHTML + '<script>');

// ─── 5. Store JavaScript (before </script>) ────────────────
const storeJS = `
// ─── Store view toggle ───
document.getElementById('storeNavBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  var shell = document.querySelector('.shell');
  shell.classList.toggle('shell--store');
  if (shell.classList.contains('shell--store')) {
    resetChat();
  }
});

// New chat exits store
var _origNewChat = document.getElementById('newChatBtn');
_origNewChat.addEventListener('click', function() {
  document.querySelector('.shell').classList.remove('shell--store');
});

// Store tab switching
document.querySelectorAll('.store-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.store-tab').forEach(function(t) { t.classList.remove('store-tab--active'); });
    tab.classList.add('store-tab--active');
    var filter = tab.getAttribute('data-stab');
    document.querySelectorAll('.card-compact, .card-lg').forEach(function(card) {
      var type = card.getAttribute('data-type');
      card.style.display = (filter === 'all' || type === filter) ? '' : 'none';
    });
  });
});

// Store card → detail modal
function openStoreModal(card) {
  var name = card.getAttribute('data-name');
  var desc = card.getAttribute('data-desc');
  var creator = card.getAttribute('data-creator');
  var type = card.getAttribute('data-type');
  var color = card.getAttribute('data-color');
  document.getElementById('sModalName').textContent = name;
  document.getElementById('sModalCreator').textContent = 'Created by ' + creator;
  document.getElementById('sModalDesc').innerHTML = '<p>' + desc + '</p><p>This extension helps teams work more efficiently by providing specialized capabilities directly within Copilot.</p>';
  var tag = document.getElementById('sModalTag');
  tag.textContent = type === 'agent' ? 'Agent' : 'App';
  if (type === 'agent') { tag.style.background = '#E8DEF8'; tag.style.color = '#6B4FBB'; }
  else { tag.style.background = '#D4EDDA'; tag.style.color = '#0F7B3F'; }
  var cta = document.getElementById('sModalCta');
  if (type === 'app') { cta.textContent = 'Connect'; cta.className = 'smodal__cta smodal__cta--connect'; }
  else { cta.textContent = 'Add'; cta.className = 'smodal__cta'; }
  document.getElementById('sModalIcon').innerHTML = '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="' + color + '"/><text x="24" y="31" text-anchor="middle" font-size="18" font-weight="600" fill="#fff" font-family="Segoe UI">' + name.substring(0,2) + '</text></svg>';
  document.getElementById('sModalOverlay').classList.add('smodal-overlay--open');
}

document.querySelectorAll('.card-compact, .card-lg').forEach(function(card) {
  card.addEventListener('click', function(e) {
    if (e.target.closest('.card-compact__more')) return;
    openStoreModal(card);
  });
});

document.getElementById('sModalClose').addEventListener('click', function() {
  document.getElementById('sModalOverlay').classList.remove('smodal-overlay--open');
});
document.getElementById('sModalOverlay').addEventListener('click', function(e) {
  if (e.target === this) this.classList.remove('smodal-overlay--open');
});
`;

html = html.replace('</script>', storeJS + '</script>');

// ─── Write ──────────────────────────────────────────────────
fs.writeFileSync(filePath, html, 'utf-8');
console.log('Done: patched shell.html with store view');
