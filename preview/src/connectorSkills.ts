/**
  * Connector Skills — Experiment (replica of the One Copilot Shell zero state)
 *
 * A full-viewport assembly of the One Copilot compounds (no browser chrome,
 * no dark mode). Composes: Side Nav (expanded, collapsible) with the Segmented
 * Switch pivot, Header (Commercial), and Greeting & Zero State (Composer +
 * suggestion chips), plus the Prompt Lab modal and the Me control menu.
 *
 * Carried-forward interactions:
 *   - Composer: typing swaps the voice waveform for the dark Send button
 *   - Nav: collapse / expand toggle (panel-left)
 *   - Segmented Switch: click to change the selected mode
 *   - Suggestion overflow (…): opens the Prompt Lab modal
 *   - Me control avatar: opens the profile menu
 *
 * Reused primitives/compounds: Side Nav, Segmented Switch, Button, Avatar,
 * Header, Composer, Greeting, suggestion chips, Prompt Lab, Menu.
 */

import * as fs from 'fs';
import * as path from 'path';
import { skillsFor } from './_skills';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
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
function raw(name: string): string {
  try { return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8').replace(/\n/g, '').replace(/ (width|height)="\d+"/g, ''); } catch (e) { return ''; }
}
const copilotLogo = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3c-3.5 0-5 2.2-5.6 4.4C4 8 3 9.7 3 11.6 3 14 4.8 16 7.4 16.4 8.2 18.6 10 20 12.2 20c3.4 0 5-2.2 5.6-4.4C20 15 21 13.3 21 11.4 21 9 19.2 7 16.6 6.6 15.8 4.4 14 3 12 3Z" fill="currentColor"/></svg>';

// ─── Side Nav (expanded, collapsible) ───────────────────────

function item(icon: string, label: string, opts?: { sel?: boolean; dot?: boolean; id?: string }): string {
  const dot = opts && opts.dot ? '<span class="ni__dot"></span>' : '';
  return '<button' + (opts && opts.id ? ' id="' + opts.id + '"' : '') + ' class="ni' + (opts && opts.sel ? ' ni--selected' : '') + '"><span class="ni__ico">' + icon + '</span>' + dot + '<span class="ni__label">' + label + '</span></button>';
}
function chat(label: string, sel?: boolean): string {
  return '<button class="ni ni--chat' + (sel ? ' ni--selected' : '') + '"><span class="ni__label">' + label + '</span><span class="ni__more">' + ico('more-horizontal-20-regular') + '</span></button>';
}
function modeSeg(glyph: string, label: string, sel: boolean, i: number): string {
  return '<button class="ss__seg' + (sel ? ' ss__seg--selected' : '') + '" data-i="' + i + '" aria-label="' + label + '">'
    + '<span class="ss__icon">' + glyph + '</span>'
    + '<span class="ss__label"><span class="ss__ghost">' + label + '</span><span class="ss__real">' + label + '</span></span>'
    + '</button>';
}

function meMenu(): string {
  const row = (label: string, chev?: boolean) => '<button class="mm__item"><span class="mm__label">' + label + '</span>' + (chev ? '<span class="mm__chev">' + ico('chevron-right-20-regular') + '</span>' : '') + '</button>';
  return [
    '<div class="mm" id="meMenu">',
    '<button class="mm__profile"><span class="me__avatar"><img src="../../src/components/icons/avatar-user.png" alt="Elvia Atkins"/></span><span class="me__info"><span class="me__name">Elvia Atkins</span><span class="me__lic">eatkins@contoso.com</span></span><span class="mm__chev">' + ico('chevron-right-20-regular') + '</span></button>',
    '<div class="mm__div"></div>',
    '<button class="mm__item" id="meSettings"><span class="mm__label">Settings</span></button>',
    row('Recent pages'),
    row('Scheduled prompts'),
    row('Give feedback'),
    '<div class="mm__div"></div>',
    row('Download apps', true),
    '<div class="mm__links"><span>Privacy</span><span>Terms</span><span>FAQ</span></div>',
    '</div>',
  ].join('');
}

function nav(): string {
  return [
    '<aside class="nav" id="nav">',
    '<div class="nav__header">',
    '<span class="nav__brand"><span class="nav__logo">' + copilotLogo + '</span><span class="nav__wordmark">Copilot</span></span>',
    '<div class="nav__hicons">',
    '<button class="ntool ntool--dot" title="New task">' + ico('checkmark-square-20-regular') + '</button>',
    '<button class="ntool" title="Apps">' + ico('grid-dots-20-regular') + '</button>',
    '<button class="ntool" id="navToggle" title="Collapse">' + ico('panel-left-20-regular') + '</button>',
    '</div></div>',
    '<div class="ntabs">',
    '<div class="ss ss--light ss--mode" id="sseg" data-selected="0">',
    '<span class="ss__indicator"></span>',
    modeSeg(ico('chat-20-regular'), 'Chat', true, 0),
    modeSeg(ico('cowork-20-regular'), 'Cowork', false, 1),
    modeSeg(ico('autopilot-20-regular'), 'Autopilot', false, 2),
    modeSeg(ico('code-20-regular'), 'Code', false, 3),
    '</div></div>',
    '<div class="nav__body">',
    item(ico('compose-20-regular'), 'New chat', { id: 'newChatBtn' }),
    item(ico('search-20-regular'), 'Search'),
    item(ico('library-20-regular'), 'Library'),
    item(ico('bot-20-regular'), 'Agents'),
    item(ico('notebook-20-regular'), 'Notebooks'),
    '<div class="nsh">Pinned</div>',
    item(ico('bot-20-regular'), 'Researcher'),
    item(ico('chat-20-regular'), 'Employee Training Program'),
    item(ico('chat-20-regular'), 'Market analysis and trends'),
    '<div class="nsh">Chats</div>',
    chat('Relocation benefits'),
    chat('Escalation trends'),
    chat('New capabilities in Copilot'),
    chat('Latest emails from manager'),
    chat('Market Analysis and Trends'),
    chat('Sales Forecast FY25'),
    chat('Marketing Strategy for Q3'),
    '</div>',
    '<div class="nav__footer">',
    '<button class="me" id="meBtn"><span class="me__avatar"><img src="../../src/components/icons/avatar-user.png" alt="Elvia Atkins"/></span><span class="me__info"><span class="me__name">Elvia Atkins</span><span class="me__lic">M365 Copilot (Premium)</span></span></button>',
    meMenu(),
    '</div>',
    '</aside>',
  ].join('\n');
}

// ─── Header ─────────────────────────────────────────────────

function header(): string {
  return [
    '<header class="hdr">',
    '<div class="hdr__left"><span class="hdr__badge">Work IQ</span>',
    '<button class="hdr__picker"><span>Auto</span><span class="hdr__chev">' + ico('chevron-down-12-regular') + '</span></button></div>',
    '<div class="hdr__right">',
    '<button class="hdr__btn hdr__btn--shield" title="Compliance">' + ico('shield-task-20-regular') + '</button>',
    '<button class="hdr__btn" title="Temporary chat">' + ico('chat-hint-half-20-regular') + '</button>',
    '</div>',
    '</header>',
  ].join('');
}

// ─── Zero state ─────────────────────────────────────────────

// Source suggestion — the first pill is a "source pill" for the last source the
// user connected (through the Sources menu / Settings → Connect → auth). Each
// source carries its own tailored prompt set; unknown sources fall back to
// generic prompts. Keyed by the source display name so the auth flow can look
// prompts up by the just-connected source.
const SRC_PROMPTS: Record<string, string[]> = {
  'GitHub': [
    'Generate a README with setup instructions and contribution guidelines',
    'Open a pull request summarizing my recent commits',
    'Create a GitHub Actions workflow to run tests on pull requests',
  ],
  'Notion': [
    'Summarize my meeting notes from this week',
    'Turn this doc into a list of action items',
    'Find the product spec for the launch',
  ],
  'Confluence': [
    'Summarize the latest release notes',
    'Find our onboarding runbook',
    'Draft a project update page for stakeholders',
  ],
  'Jira': [
    'What issues are assigned to me this sprint?',
    'Summarize the blockers in the current sprint',
    'Create a bug ticket from this description',
  ],
  'Google Drive': [
    'Find the latest budget spreadsheet',
    'Summarize the quarterly review deck',
    'Draft a summary of the docs shared with me this week',
  ],
  'Slack': [
    'Catch me up on my unread channels',
    'Summarize the thread about the launch',
    'Find the file someone shared last week',
  ],
  'Hubspot': [
    'Summarize my open deals this quarter',
    'Which contacts need a follow-up?',
    'Draft an outreach email for a new lead',
  ],
  'Linear': [
    'What issues are assigned to me this cycle?',
    'Summarize the blockers in the current project',
    'Create an issue from this bug report',
  ],
  'ServiceNow': [
    'Show my open incidents',
    'Summarize this week\u2019s IT tickets',
    'Draft a resolution note for this incident',
  ],
};
function sourcePrompts(name: string): string[] {
  return SRC_PROMPTS[name] || [
    'Summarize the latest updates in ' + name,
    'Find something specific in ' + name,
    'Draft an update using my ' + name + ' content',
  ];
}
// Default zero-state pill: "Suggested" with the Microsoft brand mark. It stays
// this way until the user connects their first source in the session (through
// the auth flow), at which point the pill becomes "From {source}". New chat
// resets it back to Suggested.
const MS_LOGO = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1h6.5v6.5H1z" fill="#F25022"/><path d="M8.5 1H15v6.5H8.5z" fill="#7FBA00"/><path d="M1 8.5h6.5V15H1z" fill="#00A4EF"/><path d="M8.5 8.5H15V15H8.5z" fill="#FFB900"/></svg>';
const SUGGESTED_LABEL = 'Suggested';

// Suggested-prompts compound: the first chip is the source pill, the rest are
// generic categories. Each chip reveals its own prompt list.
const zsCategories: { label: string; prompts: string[] }[] = [
  {
    label: SUGGESTED_LABEL,
    prompts: [
      'Catch me up on what I missed this week',
      'Summarize my unread messages and emails',
      'What should I focus on today?',
    ],
  },
  {
    label: 'Get to know Copilot',
    prompts: [
      'What can Copilot do for me at work?',
      'Show me around the Copilot app',
      'What data sources can Copilot use?',
    ],
  },
  {
    label: 'Prepare for what\u2019s ahead',
    prompts: [
      'Draft an agenda for my next meeting',
      'Catch me up on the launch project',
      'What\u2019s due this week across my files?',
    ],
  },
  {
    label: 'Build it today',
    prompts: [
      'Write a compelling intro paragraph to file',
      'Write a SQL query to return all columns from the table where',
      'Write a follow up email to meeting drive continued progress',
    ],
  },
];

function addMenuMarkup(): string {
  const row = (icon: string, label: string, opts?: { sub?: boolean; id?: string }) =>
    '<button class="addm__item"' + (opts && opts.id ? ' id="' + opts.id + '"' : '') + ' role="menuitem"><span class="addm__ico">' + icon + '</span><span class="addm__label">' + label + '</span>' + (opts && opts.sub ? '<span class="addm__chev">' + ico('chevron-right-20-regular') + '</span>' : '') + '</button>';
  return '<div class="addm" id="addMenu" role="menu">'
    + row(ico('attach-20-regular'), 'Add content', { id: 'addContentBtn' })
    + row(ico('arrow-upload-20-regular'), 'Upload image and files')
    + row(ico('cloud-20-regular'), 'Attach cloud files')
    + '<div class="addm-div"></div>'
    + row(ico('options-20-regular'), 'Add capabilities', { sub: true })
    + '<div class="addm-div"></div>'
    + row(ico('flow-20-regular'), 'Change data sources', { id: 'changeDsBtn' })
    + '</div>';
}

function zeroState(): string {
  const chip = (label: string, index: number, lead?: string) => '<button class="zs__chip" data-chip="' + index + '" aria-pressed="false">' + (lead ? '<span class="zs__chip-ico">' + lead + '</span>' : '') + label + '</button>';
  return [
    '<div class="zs">',
    '<div class="zs__greeting">Hi Elvia, how can I help?</div>',
    '<div class="thread" id="thread"></div>',
    '<div class="cmp" id="cmp">',
    addMenuMarkup(),
    '<div class="cmp__attach" id="cmpAttach"></div>',
    '<div class="cmp__row">',
    '<button class="cmp__btn" id="addBtn" title="Add" aria-haspopup="menu" aria-expanded="false">' + ico('add-20-regular') + '</button>',
    '<textarea class="cmp__ta" id="cmpTa" rows="1" placeholder="Message Copilot"></textarea>',
    '<button class="cmp__btn" title="Dictate">' + ico('mic-20-regular') + '</button>',
    '<button class="cmp__send" id="cmpSend" title="Send"><span class="cmp__send-eq">' + ico('device-eq-20-regular') + '</span><span class="cmp__send-arrow">' + ico('arrow-up-20-regular') + '</span></button>',
    '</div></div>',
    '<div class="zs__chips">',
    '<button class="zs__chip zs__chip--src" data-chip="0" aria-pressed="false" id="srcChip"><span class="zs__chip-ico">' + MS_LOGO + '</span><span id="srcChipLabel">' + SUGGESTED_LABEL + '</span></button>',
    chip('Get to know Copilot', 1),
    chip('Prepare for what\u2019s ahead', 2),
    chip('Build it today', 3),
    '<button class="zs__overflow" id="chipMore" title="More prompts">' + ico('more-horizontal-20-regular') + '</button>',
    '</div>',
    '<div class="zs__list" id="zsList"></div>',
    '<div class="ciq" id="ciqMenu" hidden><div class="ciq__tabs" id="ciqTabs"></div><div class="ciq__list" id="ciqList"></div></div>',
    '</div>',
  ].join('');
}

// ─── Prompt Lab modal ───────────────────────────────────────

// Prompt sets surfaced when an Agent tab or a connected Source tab is selected.
const PL_DATA = {
  'agent:Researcher': [
    { cat: 'Deep research', title: 'Summarize the latest findings on our top competitor', by: 'Suggested by Microsoft' },
    { cat: 'Evidence gathering', title: 'Find and cite sources that support this claim', by: 'Suggested by Microsoft' },
  ],
  'agent:Analyst': [
    { cat: 'Data insight', title: 'Analyze last quarter\u2019s sales and highlight anomalies', by: 'Suggested by Microsoft' },
    { cat: 'Forecasting', title: 'Project next month\u2019s pipeline from current trends', by: 'Suggested by Microsoft' },
  ],
  'agent:Idea Coach': [
    { cat: 'Brainstorm', title: 'Generate ten campaign concepts for the spring launch', by: 'Suggested by Microsoft' },
    { cat: 'Refine', title: 'Sharpen this idea into a one-line pitch', by: 'Suggested by Microsoft' },
  ],
  'source:Microsoft 365 apps': [
    { cat: 'Catch up', title: 'Summarize unread emails from my manager this week', by: 'From Microsoft 365 apps' },
    { cat: 'Meetings', title: 'What decisions were made in yesterday\u2019s meetings?', by: 'From Microsoft 365 apps' },
    { cat: 'Documents', title: 'Find the latest version of the launch plan in SharePoint', by: 'From Microsoft 365 apps' },
  ],
};

function promptLab(): string {
  const navRow = (icon: string, label: string, sel?: boolean) => '<button class="pl-nav' + (sel ? ' pl-nav--sel' : '') + '"><span class="pl-nav__ico">' + icon + '</span><span class="pl-nav__label">' + label + '</span></button>';
  const topic = (label: string, sel?: boolean, muted?: boolean) => '<button class="pl-topic' + (sel ? ' pl-topic--sel' : '') + (muted ? ' pl-topic--muted' : '') + '">' + label + '</button>';
  const pItem = (cat: string, title: string) => '<div class="pl-item"><div class="pl-item__cat">' + cat + '</div><div class="pl-item__title">' + title + '</div><div class="pl-item__by">Suggested by Microsoft</div><button class="pl-item__bm">' + ico('bookmark-20-regular') + '</button></div>';
  const group = (id: string, label: string, open?: boolean) => '<button class="pl-group" data-group="' + id + '" aria-expanded="' + (open ? 'true' : 'false') + '"><span class="pl-group__label">' + label + '</span><span class="pl-group__chev">' + ico('chevron-right-20-regular') + '</span></button>';
  const tab = (id: string, label: string) => '<button class="pl-tab" data-cat="' + id + '">' + label + '</button>';
  const agentTabs = ['Researcher', 'Analyst', 'Idea Coach'].map(function (a) { return tab('agent:' + a, a); }).join('');
  const sourceTabs = ['Microsoft 365 apps'].map(function (s) { return tab('source:' + s, s); }).join('');
  return [
    '<div class="pl-overlay" id="plOverlay">',
    '<div class="pl">',
    '<div class="pl__head"><h2 class="pl__title">Prompt Lab</h2><button class="pl__x" id="plClose">' + ico('dismiss-20-regular') + '</button></div>',
    '<div class="pl__body">',
    '<div class="pl-side">',
    navRow(ico('grid-dots-20-regular'), 'Suggested', true),
    navRow(ico('search-20-regular'), 'Find prompts'),
    navRow(ico('bookmark-20-regular'), 'Saved'),
    navRow(ico('people-team-20-regular'), 'Shared'),
    '<div class="pl-shead">Topics</div>',
    topic('Catch up'), topic('Ask'), topic('Learn'), topic('Show all', false, true),
    group('agents', 'Agents', false),
    '<div class="pl-group__items" data-items="agents" hidden>' + agentTabs + '</div>',
    group('sources', 'Sources', false),
    '<div class="pl-group__items" data-items="sources" hidden>' + sourceTabs + '</div>',
    '</div>',
    '<div class="pl__content" id="plContent">',
    pItem('Reconnecting after time apart', 'How can I make the most of catching up with old friends?'),
    pItem('Bridging gaps smoothly', 'What are some thoughtful ways to update someone on recent changes in my life?'),
    pItem('Refreshing relationships', 'How can I approach a conversation to revive a stalled connection?'),
    pItem('Sharing stories and laughs', 'What topics spark engaging catch-up conversations with colleagues?'),
    pItem('Catching up on life\u2019s milestones', 'How do I express genuine interest in someone\u2019s recent achievements?'),
    '</div>',
    '</div>',
    '</div>',
    '</div>',
  ].join('');
}

// ─── Sources Menu modal ("Change sources") ─────────────────
// Matches Figma Source Discovery node 943:19731. Microsoft 365 apps is the one
// connected source (with a metadata summary); the rest are connectable and load
// on an infinite, lazy scroll toward the bottom of the 360px viewport.

interface SrcConn { logo: string; name: string; meta?: string; desc: string; trailing: 'on' | 'off' | 'connect' | 'chevron'; }
const SRC_CONNECTORS: SrcConn[] = [
  { logo: 'microsoft-365-20-regular.svg', name: 'Microsoft 365 apps', meta: 'Chats, Emails, Meetings and more', desc: 'Chats, Emails, Meetings, Sharepoint and more', trailing: 'on' },
  { logo: 'hubspot-logo.png', name: 'Hubspot', desc: 'Connect CRM contacts, deals, and marketing data', trailing: 'connect' },
  { logo: 'moodys-logo.png', name: 'Moody\u2019s', desc: 'Credit ratings and risk insights', trailing: 'connect' },
  { logo: 'lseg-logo.png', name: 'London Stock Group Exchange', desc: 'Market data and financial filings', trailing: 'connect' },
  { logo: 'canva-logo.png', name: 'Canva', desc: 'Browse, summarize, autofill, and even generate new Canva designs', trailing: 'connect' },
  { logo: 'google-calendar-logo.png', name: 'Google Calendar', desc: 'Look up events, meetings, and availability', trailing: 'connect' },
  { logo: 'google-contacts-logo.png', name: 'Google Contacts', desc: 'Search and manage your contact information', trailing: 'connect' },
  { logo: 'notion-logo.png', name: 'Notion', desc: 'Reference pages, docs, and databases from your workspace', trailing: 'connect' },
  { logo: 'linear-logo.png', name: 'Linear', desc: 'Manage issues, projects, and team workflows in Linear', trailing: 'connect' },
  { logo: 'intercom-logo.png', name: 'Intercom', desc: 'Bring in customer conversations and support history', trailing: 'connect' },
  { logo: 'slack-logo.png', name: 'Slack', desc: 'Search messages, channels, and files across your workspace', trailing: 'connect' },
  { logo: 'github-logo.png', name: 'Github', desc: 'Reference repositories, issues, and pull requests', trailing: 'on' },
  { logo: 'jira-logo.png', name: 'Jira', desc: 'Track issues, sprints, and project workflows', trailing: 'connect' },
  { logo: 'confluence-logo.png', name: 'Confluence', desc: 'Pull knowledge base articles and team documentation', trailing: 'on' },
  { logo: 'servicenow-logo.png', name: 'ServiceNow', desc: 'Look up tickets, incidents, and IT service records', trailing: 'connect' },
  { logo: 'google-drive-logo.png', name: 'Google Drive', desc: 'Search documents, sheets, and slides in your Drive', trailing: 'connect' },
  { logo: 'sp-global-logo.png', name: 'S&P Global', desc: 'Company fundamentals and market intelligence', trailing: 'connect' },
];
function srcLogoHtml(logo: string): string {
  if (logo.endsWith('.svg')) return '<span class="srcm__logo srcm__logo--glyph">' + ico(logo.slice(0, -4)) + '</span>';
  return '<span class="srcm__logo"><img src="' + logoImg(logo) + '" alt=""/></span>';
}
function stgLogoHtml(logo: string): string {
  if (logo.endsWith('.svg')) return '<span class="stg__gi">' + ico(logo.slice(0, -4)) + '</span>';
  return '<img src="' + logoImg(logo) + '" alt=""/>';
}
// Unified source model shared by the Change-sources menu and the Settings
// Sources tab so connect/toggle state flows both ways.
const SRC_CATS: Record<string, string[]> = {
  'Microsoft 365 apps': ['Productivity'], 'Hubspot': ['Sales'],
  'Moody\u2019s': ['Finance'], 'London Stock Group Exchange': ['Finance'], 'Canva': ['Design'],
  'Google Calendar': ['Productivity'], 'Google Contacts': ['Productivity'], 'Notion': ['Productivity'],
  'Linear': ['Development'], 'Intercom': ['Communication'], 'Slack': ['Communication'], 'Github': ['Development'],
  'Jira': ['Development'], 'Confluence': ['Productivity'], 'ServiceNow': ['Development'],
  'Google Drive': ['Productivity'], 'S&P Global': ['Finance'],
};
const SRC_REC = ['Microsoft 365 apps', 'Hubspot'];
const STG_CHECK_SVG = '<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7.03 13.9 3.56 10a.75.75 0 1 0-1.12 1l4 4.5a.75.75 0 0 0 1.1.03l10.5-10.5a.75.75 0 0 0-1.06-1.06L7.03 13.9Z" fill="currentColor"/></svg>';
const SRC_MODEL = SRC_CONNECTORS.map(function (c) {
  return { n: c.name, logo: srcLogoHtml(c.logo), stgLogo: stgLogoHtml(c.logo), logoSrc: c.logo.endsWith('.svg') ? '' : logoImg(c.logo), meta: c.meta || '', desc: c.desc, state: c.trailing, cats: SRC_CATS[c.name] || [], rec: SRC_REC.indexOf(c.name) !== -1 };
});

// ─── Source L2 detail (Settings → Sources → a connected source) ─────
// Figma node 1790:48443 — identity + Disconnect + overflow, then About, a
// read-only Tools list, and Details. About / Tools / Developer are per-source;
// Account, Category, and Connected-on fall back to the shared model + defaults.
const SRC_DETAIL: Record<string, { about: string; tools: string[]; developer: string; connectedOn?: string }> = {
  'Jira': {
    about: 'Reference issues, sprints, and project workflows, and let Copilot search, summarize, and draft updates grounded in your team\u2019s work.',
    tools: ['Search issues', 'Get issue details', 'Create issue', 'Update issue', 'Add comment', 'Assign issue', 'Transition status', 'List projects'],
    developer: 'Atlassian',
  },
  'Confluence': {
    about: 'Pull knowledge base articles and team documentation so Copilot can search, summarize, and reference your space.',
    tools: ['Search pages', 'Get page', 'Create page', 'Update page', 'List spaces', 'Get attachments', 'Add comment', 'Search space'],
    developer: 'Atlassian',
  },
  'Github': {
    about: 'Reference repositories, issues, and pull requests so Copilot can search code, summarize changes, and draft updates from your work.',
    tools: ['Search repositories', 'Get file contents', 'List issues', 'Create issue', 'List pull requests', 'Get commit history', 'Search code', 'List branches'],
    developer: 'GitHub',
  },
  'Notion': {
    about: 'Reference pages, docs, and databases from your workspace so Copilot can find, summarize, and draft grounded in your notes.',
    tools: ['Search pages', 'Get page content', 'Create page', 'Update page', 'Query database', 'List databases', 'Add comment', 'Search workspace'],
    developer: 'Notion Labs',
  },
  'Slack': {
    about: 'Search messages, channels, and files across your workspace so Copilot can catch you up and find what matters.',
    tools: ['Search messages', 'List channels', 'Get channel history', 'Send message', 'List files', 'Get thread', 'Search files', 'List members'],
    developer: 'Slack Technologies',
  },
  'Linear': {
    about: 'Manage issues, projects, and team workflows so Copilot can track work and draft updates from Linear.',
    tools: ['Search issues', 'Get issue', 'Create issue', 'Update issue', 'List projects', 'List cycles', 'Add comment', 'Assign issue'],
    developer: 'Linear',
  },
  'Google Drive': {
    about: 'Search documents, sheets, and slides in your Drive so Copilot can find and summarize your files.',
    tools: ['Search files', 'Get file', 'List folders', 'Get document text', 'Export file', 'Share file', 'List recent', 'Get metadata'],
    developer: 'Google',
  },
  'Hubspot': {
    about: 'Connect CRM contacts, deals, and marketing data so Copilot can summarize pipeline and draft outreach.',
    tools: ['Search contacts', 'Get contact', 'List deals', 'Get deal', 'Create note', 'List companies', 'Get pipeline', 'Log activity'],
    developer: 'HubSpot',
  },
  'ServiceNow': {
    about: 'Look up tickets, incidents, and IT service records so Copilot can triage and draft resolutions.',
    tools: ['Search incidents', 'Get incident', 'Create incident', 'Update incident', 'List requests', 'Get record', 'Add work note', 'Assign incident'],
    developer: 'ServiceNow',
  },
} as const;

// ─── Connector Skills (per source) ─────────────────────────
// Figma Connector-Skills nodes 13:18709 / 14:16083 / 14:14087. A connected
// source exposes named "/skill" procedures. Surfaced two ways: a chevron beside
// the connected source in Change-sources → a skills sub-view, and a Skills
// section (cards, "Show more" past 3) on the Settings source detail page.

interface Skill { name: string; desc: string; }
// Populate every connector from the shared canonical catalog (preview/src/_skills.ts)
// so skills stay identical across Chat (CIQ menu, Settings source detail) and Cowork.
const SRC_SKILLS: Record<string, Skill[]> = {};
SRC_CONNECTORS.forEach(function (c) { SRC_SKILLS[c.name] = skillsFor(c.name).map(function (sk) { return { name: sk.name, desc: sk.desc }; }); });
function srcSkills(name: string): Skill[] { return SRC_SKILLS[name] || []; }

/** Skill glyph — Fluent "Script" icon (Figma node 14:4310). */
const SKILL_ICON = ico('script-20-regular');

// ─── CIQ Menu data (content + skills palette below the composer) ────
// Slash skills + connected content, surfaced from "Add content" or by typing
// "/" in the composer. Each row: { icon (html), title, sub, kind }.
const CIQ_CONFLUENCE = '<img src="' + logoImg('confluence-logo.png') + '" alt=""/>';
const CIQ_SKILLS = [
  { icon: CIQ_CONFLUENCE, title: '/space-digest', sub: 'Summarize a Confluence space into a structured digest of key decisions, owners, and open questions', kind: 'skill' },
  { icon: CIQ_CONFLUENCE, title: '/page-from-template', sub: 'Create and publish a new Confluence page from a template (meeting notes, PRD, retro, decision log)', kind: 'skill' },
  { icon: ico('calendar-ltr-20-regular'), title: '/calendar-management', sub: 'Find open time, propose agendas, and manage invites across your connected calendars', kind: 'skill' },
  { icon: CIQ_CONFLUENCE, title: '/label-cleanup', sub: 'Audit and normalize labels across a Confluence space so content stays discoverable', kind: 'skill' },
];
const CIQ_FILES = [
  { icon: raw('powerpoint-20-color'), title: 'Leading the way with Brew Fusion', sub: 'Opened yesterday', kind: 'content' },
  { icon: raw('word-20-color'), title: 'Q3 Product Requirements', sub: 'Edited 2 days ago', kind: 'content' },
  { icon: raw('excel-20-color'), title: 'FY25 Revenue model', sub: 'Opened last week', kind: 'content' },
];
const CIQ_PEOPLE = [
  { icon: ico('person-20-regular'), title: 'Priya Natarajan', sub: 'Product Manager', kind: 'content' },
  { icon: ico('person-20-regular'), title: 'Marcus Webb', sub: 'Engineering Lead', kind: 'content' },
];
const CIQ_MEETINGS = [
  { icon: ico('calendar-ltr-20-regular'), title: 'Brew Fusion launch sync', sub: 'Tomorrow \u00b7 10:00 AM', kind: 'content' },
  { icon: ico('calendar-ltr-20-regular'), title: 'Weekly product review', sub: 'Friday \u00b7 2:00 PM', kind: 'content' },
];
const CIQ_EMAILS = [
  { icon: ico('mention-20-regular'), title: 'Re: Launch checklist', sub: 'From Priya \u00b7 yesterday', kind: 'content' },
  { icon: ico('mention-20-regular'), title: 'Budget approval needed', sub: 'From Finance \u00b7 3 days ago', kind: 'content' },
];
const CIQ_CHATS = [
  { icon: ico('chat-20-regular'), title: 'Escalation trends', sub: 'Last message today', kind: 'content' },
  { icon: ico('chat-20-regular'), title: 'Market analysis and trends', sub: 'Last message 2 days ago', kind: 'content' },
];
const CIQ_TABS = [
  { id: 'all', label: 'All', rows: [CIQ_SKILLS[0]!, CIQ_FILES[0]!, CIQ_PEOPLE[0]!, CIQ_MEETINGS[0]!, CIQ_CHATS[0]!] },
  { id: 'skills', label: 'Skills', rows: CIQ_SKILLS },
  { id: 'files', label: 'Files', rows: CIQ_FILES },
  { id: 'people', label: 'People', rows: CIQ_PEOPLE },
  { id: 'meetings', label: 'Meetings', rows: CIQ_MEETINGS },
  { id: 'emails', label: 'Emails', rows: CIQ_EMAILS },
  { id: 'chats', label: 'Chats', rows: CIQ_CHATS },
  { id: 'others', label: 'Others', rows: [CIQ_FILES[1]!, CIQ_PEOPLE[1]!] },
];

// ─── CIQ Menu — modal variant ("Add content" dialog, node 48:181228) ────
// Same palette (Search + Tablist + list) inside a centered dialog surface.
const CIQ_AV_MONA = '<img style="border-radius:9999px" src="' + logoImg('avatar-mona-kane.png') + '" alt=""/>';
const CIQ_AV_GROUP = '<img style="border-radius:9999px" src="' + logoImg('people-interwoven.png') + '" alt=""/>';
const CIQ_NOTION = '<img src="' + logoImg('notion-logo.png') + '" alt=""/>';
const CIQ_VIVA = ico('chat-20-regular');
const CIQ_MAIL = ico('mention-20-regular');
const CIQ_MALL = [
  { icon: CIQ_AV_MONA, title: 'Mona Kane', sub: 'mona.kane@contoso.com', kind: 'content' },
  { icon: raw('powerpoint-20-color'), title: 'Leading the way with Brew Fusion', sub: 'Opened yesterday', kind: 'content' },
  { icon: ico('calendar-ltr-20-regular'), title: 'Team standup', sub: 'Yesterday \u00b7 12:30 PM - 12:55 PM \u00b7 Mona', kind: 'content' },
  { icon: CIQ_MAIL, title: 'Project Zenith kickoff', sub: 'From: Mona Kane \u00b7 Yesterday', kind: 'content' },
  { icon: ico('calendar-ltr-20-regular'), title: 'Team standup', sub: 'Meeting series', kind: 'content', chev: true },
  { icon: CIQ_AV_GROUP, title: 'Mona, Kevin and Emily', sub: 'Fri 04/10/26 9:29 AM', kind: 'content' },
  { icon: ico('calendar-ltr-20-regular'), title: 'Project Chimera sync', sub: 'Adrian, Cooper, Craig +10 \u00b7 Mon 04/13/26', kind: 'content' },
  { icon: CIQ_VIVA, title: 'Sound Check - Weekly highlights', sub: 'Viva Engage', kind: 'content' },
];
const CIQ_MSKILLS = [
  { icon: ico('calendar-ltr-20-regular'), title: '/calendar-management', sub: 'Full-spectrum calendar management with purpose-aware classification, block defense, and tiered scheduling', kind: 'skill' },
  { icon: CIQ_CONFLUENCE, title: '/space-digest', sub: 'Summarize a Confluence space into a structured digest of key decisions, owners, and open questions', kind: 'skill' },
  { icon: CIQ_CONFLUENCE, title: '/page-from-template', sub: 'Create and publish a new Confluence page from a template (meeting notes, PRD, retro, decision log)', kind: 'skill' },
  { icon: CIQ_CONFLUENCE, title: '/release-notes-builder', sub: 'Compile formatted release notes or a changelog from pages matching a label or date range', kind: 'skill' },
  { icon: CIQ_NOTION, title: '/workspace-digest', sub: 'Summarize recent activity across a workspace or database into an at-a-glance digest labels', kind: 'skill' },
];
const CIQ_SITES = [
  { icon: ico('library-20-regular'), title: 'Brew Fusion Launch', sub: 'SharePoint site', kind: 'content' },
  { icon: ico('library-20-regular'), title: 'Product Marketing', sub: 'SharePoint site', kind: 'content' },
];
const CIQ_MTABS = [
  { id: 'all', label: 'All', rows: CIQ_MALL },
  { id: 'skills', label: 'Skills', rows: CIQ_MSKILLS },
  { id: 'files', label: 'Files', rows: CIQ_FILES },
  { id: 'people', label: 'People', rows: CIQ_PEOPLE },
  { id: 'meetings', label: 'Meetings', rows: CIQ_MEETINGS },
  { id: 'emails', label: 'Emails', rows: CIQ_EMAILS },
  { id: 'chats', label: 'Chats', rows: CIQ_CHATS },
  { id: 'sites', label: 'Sites', rows: CIQ_SITES },
  { id: 'other', label: 'Other', rows: [CIQ_FILES[2]!, CIQ_PEOPLE[1]!] },
];

function ciqModal(): string {
  return [
    '<div class="ciqm-overlay" id="ciqmOverlay">',
    '<div class="ciqm" role="dialog" aria-label="Add content">',
    '<div class="ciqm__hdr"><span class="ciqm__title">Add content</span>',
    '<button class="ciqm__x" id="ciqmClose" aria-label="Close">' + ico('dismiss-20-regular') + '</button></div>',
    '<div class="ciqm__search">' + ico('search-20-regular') + '<input type="text" id="ciqmSearch" placeholder="Search" aria-label="Search content"/></div>',
    '<div class="ciq__tabs" id="ciqmTabs"></div>',
    '<div class="ciqm__list ciq__list" id="ciqmList"></div>',
    '</div></div>',
  ].join('');
}

function sourcesModal(): string {
  return [
    '<div class="src-overlay" id="srcOverlay">',
    '<div class="srcm" role="dialog" aria-label="Change sources">',
    '<div class="srcm__hdr"><span class="srcm__title">Change sources</span>',
    '<div class="srcm__hdr-actions">',
    '<button class="srcm__close" id="srcClose" aria-label="Close">' + ico('dismiss-20-regular') + '</button></div></div>',
    '<div class="srcm__search">' + ico('search-20-regular') + '<input id="srcSearch" placeholder="Search" aria-label="Search sources"/></div>',
    '<div id="srcMainView">',
    '<div class="srcm__group">',
    '<div class="srcm__subhdr"><span class="srcm__count" id="srcCount">0 sources are on</span>',
    '<button class="srcm__turnoff" id="srcTurnOff">Turn off all</button></div>',
    '<div class="srcm__list" id="srcList"></div>',
    '</div>',
    '</div>',
    '<div class="srcm__skillsview" id="srcSkillsView" hidden>',
    '<button class="srcm__subnav" id="srcSkBack" aria-label="Back to sources">' + ico('arrow-left-20-regular') + '<span class="srcm__subname" id="srcSkName"></span></button>',
    '<div class="srcm__skilllist" id="srcSkList"></div>',
    '</div>',
    '</div></div>',
  ].join('');
}

// ─── Settings modal (Sources tab) — opened from "Manage" ────
// Figma node 3102:32349 — 790×636 dialog over a blurred shell. Left nav rail
// (Sources selected) + right content: managed source rows (chevron) and a
// "Browse sources" section with inline search and connectable rows.

const STG_NAV = ['Startup', 'Personalization', 'Voice', 'Data controls', 'Notifications', 'Sources', 'Agents', 'Accounts', 'About', 'Internal tools'];
function settingsModal(): string {
  const navHtml = STG_NAV.map(function (l) { return '<button class="stg__navitem' + (l === 'Sources' ? ' stg__navitem--sel' : '') + '">' + l + '</button>'; }).join('');
  return [
    '<div class="stg-overlay" id="stgOverlay">',
    '<div class="stg" role="dialog" aria-label="Settings">',
    '<div class="stg__bar"><div class="stg__title">Settings</div>',
    '<button class="stg__back" id="stgBack" aria-label="Back">' + ico('arrow-left-20-regular') + '</button>',
    '<div class="stg__barspace"></div>',
    '<button class="stg__x" id="stgClose" aria-label="Close">' + ico('dismiss-20-regular') + '</button></div>',
    '<div class="stg__body">',
    '<nav class="stg__nav">' + navHtml + '</nav>',
    '<div class="stg__content">',
    '<div id="stgMain">',
    '<div class="stg__sechead-row"><div class="stg__sechead">Sources</div>',
    '<div class="stg__tools">',
    '<div class="stg__flt" id="stgFlt"><button class="stg__filter" id="stgFilterBtn" aria-haspopup="menu" aria-expanded="false"><span id="stgFilterLabel">Filter by</span>' + ico('chevron-down-20-regular') + '</button>'
    + '<div class="stg__fmenu" role="menu">' + ['All', 'Recommended', 'Productivity', 'Development', 'Communication', 'Design', 'Finance', 'Sales'].map(function (c) { return '<button class="stg__fitem' + (c === 'All' ? ' stg__fitem--sel' : '') + '" data-cat="' + c + '">' + c + '<span class="stg__fcheck">' + STG_CHECK_SVG + '</span></button>'; }).join('') + '</div></div>',
    '<div class="stg__search-sm">' + ico('search-20-regular') + '<input type="text" id="stgSearch" placeholder="Search" aria-label="Search sources"/></div>',
    '</div></div>',
    '<div class="stg__secdesc">Add and manage the sources Copilot uses to find and retrieve content for you</div>',
    '<div id="stgList"></div>',
    '<div class="stg__empty" id="stgEmpty" hidden>No sources match your search.</div>',
    '</div>',
    '<div id="stgDetail" hidden></div>',
    '</div></div></div></div>',
  ].join('');
}

// ─── Auth Dialog (Connect consent) — opened from a source "Connect" ─
// Figma node 3114:17394 — 448×340 modal over a blurred shell. Copilot mark ·
// dots · partner logo handshake, a consent line, and Cancel + primary footer.
// Title / partner logo / body / primary label are filled in per source.

function authModal(): string {
  return [
    '<div class="ad-overlay" id="adOverlay">',
    '<div class="ad" role="dialog" aria-label="Connect source">',
    '<div class="ad__text">',
    '<div class="ad__header">',
    '<div class="ad__title" id="adTitle">Connect</div>',
    '<div class="ad__subtitle" id="adSubtitle">Developed by</div>',
    '</div>',
    '<div class="ad__logos">',
    '<span class="ad__mark ad__mark--copilot">' + ico('microsoft-365-20-regular') + '</span>',
    '<span class="ad__dots">' + ico('more-horizontal-20-regular') + '</span>',
    '<span class="ad__mark ad__mark--partner" id="adPartner"></span>',
    '</div>',
    '<p class="ad__body"><span id="adBody">Let Copilot securely read your content.</span> You can manage your sources in <a class="ad__link" href="#" onclick="return false">Settings</a>.</p>',
    '</div>',
    '<div class="ad__footer">',
    '<button class="ad-btn ad-btn--subtle" id="adCancel">Cancel</button>',
    '<button class="ad-btn ad-btn--primary" id="adContinue">Continue</button>',
    '</div>',
    '</div></div>',
  ].join('');
}

// ─── Secondary CoT panel (chain-of-thought reasoning) ──────
// Figma node 3118:48568 — right-docked panel that surfaces the reasoning
// behind the response: collapsed step rows + one expanded step whose substeps
// stream in with inline web citations.

function cotStep(label: string, active?: boolean): string {
  const lead = active
    ? '<span class="cot-step__dot"></span>'
    : '<span class="cot-step__chev">' + ico('chevron-right-16-regular') + '</span>';
  return '<button class="cot-step' + (active ? ' cot-step--active' : '') + '">' + lead + '<span class="cot-step__label">' + label + '</span></button>';
}
function cotSub(text: string, cite?: string): string {
  const c = cite ? '<div class="cot-cite"><span class="cite cite--web">' + ico('globe-20-regular') + '<span class="cite__name">' + cite + '</span></span></div>' : '';
  return '<p class="cot-sub">' + text + '</p>' + c;
}
function cotPanel(): string {
  return [
    '<aside class="sp" id="spPanel" aria-label="Reasoning">',
    '<div class="sp__hdr"><span class="sp__title">Reasoning</span>',
    '<button class="sp__x hdr__btn" id="spClose" aria-label="Close reasoning">' + ico('dismiss-20-regular') + '</button></div>',
    '<div class="sp__body">',
    cotStep('Establish shared context'),
    cotStep('Review past launch materials'),
    cotStep('Scan current market and cultural signals', true),
    '<div class="cot-subs">',
    cotSub('I\u2019m pulling in signals from past launches, recent conversations, and what\u2019s already in motion so we\u2019re grounded before making any calls.'),
    cotSub('I\u2019m looking for patterns that feel relevant, not just what\u2019s loud or trendy.', 'Spring Dessert Trends 2026'),
    cotSub('I\u2019m pulling in signals for patterns that encourage return without relying on discounts or hype.', 'Limited-Time Offers That Drive Repeat Visits'),
    cotSub('I\u2019m exploring how everyday moments turn into reasons to come back.', 'Influencer blog posts and social'),
    '</div>',
    '</div>',
    '</aside>',
  ].join('');
}

// ─── Copilot response blocks (streamed after thinking) ─────
// Figma nodes 3118:48562 / 3118:48565 — paragraphs with inline Work/Web
// citations, a divider, an H4 section, and the response action footer.

function citeFile(title: string): string {
  return '<span class="cite cite--file" title="' + title + '">' + ico('document-20-regular') + '</span>';
}
function citeWeb(name: string, plus: number): string {
  return '<span class="cite cite--web">' + ico('globe-20-regular') + '<span class="cite__name">' + name + '</span>' + (plus ? '<span class="cite__plus">+' + plus + '</span>' : '') + '</span>';
}
function responseBlocksHtml(): string {
  const foot = (icon: string, label: string) => '<button class="rfoot__btn" data-tip="' + label + '" title="' + label + '" aria-label="' + label + '">' + ico(icon) + '</button>';
  const toggleFoot = (idName: string, reg: string, fil: string, label: string) => '<button class="rfoot__btn rfoot__btn--toggle" id="' + idName + '" data-tip="' + label + '" title="' + label + '" aria-label="' + label + '"><span class="ico-r">' + ico(reg) + '</span><span class="ico-f">' + ico(fil) + '</span></button>';
  const avatar = (inner: string, cls?: string) => '<span class="rfoot__avatar' + (cls ? ' ' + cls : '') + '">' + inner + '</span>';
  return [
    '<button class="cotbar" id="cotBar" aria-expanded="false"><span class="cotbar__mark">' + ico('copilot-20-regular') + '</span><span class="cotbar__label">Reasoned about escalation trends</span><span class="cotbar__chev">' + ico('chevron-right-16-regular') + '</span></button>',
    '<p class="resp__p">Based on the data from <a class="resp__link" data-ref="0" onclick="return false" href="#">Product_Launch_Feedback_Summary</a>, I\u2019ve identified a notable increase in escalations starting mid-May 2025, which aligns with the launch of the new product line: \u201cXStream Pro Series.\u201d ' + citeFile('Product_Launch_Feedback_Summary') + '</p>',
    '<p class="resp__p">Escalations related to XStream Pro increased by 47% from May to July, signaling a growing concern among enterprise clients. The top three recurring issues\u2014connectivity dropouts (reported in 38% of XStream-related tickets), firmware update failures, and inconsistent performance under load\u2014have been particularly disruptive for users in high-availability environments. Internal diagnostics revealed that 62% of connectivity issues were linked to a recent patch (v4.3.2) that introduced a regression in the network handshake protocol. ' + citeWeb('Yahoo News', 2) + '</p>',
    '<hr class="resp__hr"/>',
    '<h4 class="resp__h4">Supporting evidence</h4>',
    '<p class="resp__p">Escalation data shows a clear spike in incidents starting mid-May, aligning with the launch of the XStream Pro Series. Escalations tied to this product rose by 47% over two months, with common issues including connectivity dropouts, firmware update failures, and inconsistent performance.</p>',
    '<div class="rfoot">',
    '<div class="rfoot__toolbar">',
    foot('copy-20-regular', 'Copy'),
    toggleFoot('rfLike', 'thumb-like-20-regular', 'thumb-like-20-filled', 'Good response'),
    toggleFoot('rfDislike', 'thumb-dislike-20-regular', 'thumb-dislike-20-filled', 'Bad response'),
    foot('arrow-sync-20-regular', 'Try again'),
    foot('more-horizontal-20-regular', 'More actions'),
    '</div>',
    '<div class="rfoot__divider"></div>',
    '<button class="rfoot__refs" id="rfRefs" data-ref="all" aria-label="References"><span class="rfoot__avatars">'
      + avatar(ico('document-20-regular'), 'rfoot__avatar--file')
      + avatar('Y', 'rfoot__avatar--y')
      + avatar('R', 'rfoot__avatar--r')
      + '</span><span class="rfoot__refs-label">References</span></button>',
    '</div>',
  ].join('');
}

// ─── References / Citation Preview popover ─────────────────
// Hover an inline citation or click References to reveal the source list
// (Citation Preview card — favicon, source, headline, url).

interface RefSrc { fav: string; letter: string; source: string; headline: string; url: string; file?: boolean; }
const RESP_REFS: RefSrc[] = [
  { fav: '#0f6cbd', letter: 'P', source: 'Product_Launch_Feedback_Summary', headline: 'Escalation summary \u2014 XStream Pro Series', url: 'SharePoint \u00b7 Product Analytics', file: true },
  { fav: '#6001d2', letter: 'Y', source: 'Yahoo News', headline: 'XStream Pro complaints climb as firmware issues mount', url: 'yahoo.com/news/xstream-pro-firmware-issues' },
  { fav: '#0a66c2', letter: 'R', source: 'Reuters', headline: 'Enterprise clients flag connectivity regressions', url: 'reuters.com/tech/xstream-connectivity' },
];
function refsPopover(): string {
  const rows = RESP_REFS.map(function (r) {
    const fav = r.file
      ? '<span class="cp__fav cp__fav--file">' + ico('document-20-regular') + '</span>'
      : '<span class="cp__fav" style="background:' + r.fav + '">' + r.letter + '</span>';
    return '<div class="cp__item">'
      + '<div class="cp__hd">' + fav + '<span class="cp__src">' + r.source + '</span>'
      + '<button class="cp__more" aria-label="More options">' + ico('more-horizontal-20-regular') + '</button></div>'
      + '<p class="cp__title">' + r.headline + '</p>'
      + '<p class="cp__url">' + r.url + '</p></div>';
  }).join('');
  return '<div class="cp" id="refsPop" role="dialog" aria-label="References">' + rows + '</div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; color: #242424; overflow: hidden; }
svg { display: block; }
button { font-family: inherit; }

.shell { display: flex; height: 100vh; width: 100vw; background: #fff; }

/* ─── Embedded Cowork mode ─── */
#mode-cowork { position: fixed; inset: 0; width: 100vw; height: 100vh; border: 0; display: none; z-index: 200; background: #fff; }
body.cowork-active #mode-cowork { display: block; }
body.cowork-active .shell { display: none; }

/* ─── Side Nav ─── */
.nav { width: 280px; flex-shrink: 0; display: flex; flex-direction: column; background: #fcfcfc; border-right: 1px solid #ececec; transition: width 0.18s ease; overflow: hidden; }
.nav--collapsed { width: 64px; }
.nav__header { display: flex; align-items: center; justify-content: space-between; padding: 12px 12px 8px; }
.nav__brand { display: inline-flex; align-items: center; gap: 8px; min-width: 0; }
.nav__logo { display: none; width: 28px; height: 28px; color: #242424; flex-shrink: 0; }
.nav__logo svg { width: 26px; height: 26px; }
.nav__wordmark { font-size: 16px; font-weight: 600; color: #242424; white-space: nowrap; }
.nav__hicons, .ntabs__tools { display: flex; align-items: center; gap: 2px; }
.ntool { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 4px; border: none; border-radius: 8px; background: transparent; color: #424242; cursor: pointer; transition: background 0.1s; }
.ntool:hover { background: rgba(36,36,36,0.06); }
.ntool svg { width: 20px; height: 20px; }

.ntabs { display: flex; align-items: center; padding: 0 12px 8px; }
.ntool--dot { position: relative; }
.ntool--dot::after { content: ''; position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 9999px; background: #242424; border: 1px solid #fcfcfc; }
/* Default Segmented Switch (.ss), mode variant */
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

.nav__body { flex: 1 1 auto; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 1px; }
.nav__body::-webkit-scrollbar { width: 8px; background: transparent; }
.nav__body::-webkit-scrollbar-track { background: transparent; }
.nav__body::-webkit-scrollbar-thumb { background: transparent; border-radius: 9999px; transition: background 0.3s; }
.nav__body.is-scrolling::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); }
.ni { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 32px; padding: 6px 8px; border: none; border-radius: 8px; background: transparent; color: #242424; cursor: pointer; text-align: left; transition: background 0.1s; position: relative; }
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
.ni--chat .ni__label { color: #424242; }
.nsh { font-size: 12px; line-height: 16px; color: #6f6f6f; padding: 12px 8px 4px; }

.nav__footer { border-top: 1px solid #ececec; padding: 8px; position: relative; }
.me { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; border: none; border-radius: 8px; background: transparent; cursor: pointer; transition: background 0.1s; }
.me:hover { background: rgba(36,36,36,0.04); }
.me__avatar { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 9999px; background: #6b4fbb; color: #fff; font-size: 11px; font-weight: 600; flex-shrink: 0; overflow: hidden; }
.me__avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.me__info { display: flex; flex-direction: column; min-width: 0; text-align: left; }
.me__name { font-size: 13px; line-height: 16px; font-weight: 625; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.me__lic { font-size: 10px; line-height: 14px; color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* Collapsed state */
.nav--collapsed .nav__wordmark, .nav--collapsed .ntabs, .nav--collapsed .ni__label, .nav--collapsed .ni__dot, .nav--collapsed .ni__more, .nav--collapsed .nsh, .nav--collapsed .me__info, .nav--collapsed .nav__hicons .ntool:not(#navToggle) { display: none; }
.nav--collapsed .nav__header { justify-content: center; flex-direction: column; gap: 8px; }
.nav--collapsed .nav__logo { display: inline-flex; }
.nav--collapsed .ni { justify-content: center; padding: 6px; }
.nav--collapsed .me { justify-content: center; padding: 6px; }

/* Me control menu — Figma Account Switcher (272px, Shadow/Higher) */
.mm { position: absolute; left: 8px; bottom: 60px; width: 272px; background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 16px; box-shadow: 0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.03), 0 16px 24px rgba(0,0,0,0.08); padding: 8px; display: none; flex-direction: column; gap: 8px; z-index: 40; }
.mm.is-open { display: flex; }
.mm__profile { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 12px; border: none; border-radius: 8px; background: transparent; cursor: pointer; }
.mm__profile .me__info { flex: 1 1 auto; }
.mm__profile .me__avatar { width: 40px; height: 40px; font-size: 14px; }
.mm__profile .me__name { font-size: 14px; line-height: 20px; font-weight: 625; }
.mm__profile .me__lic { font-size: 12px; line-height: 16px; color: #5d5d5d; }
.mm__profile:hover { background: rgba(36,36,36,0.04); }
.mm__item { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 12px; border: none; border-radius: 8px; background: transparent; cursor: pointer; text-align: left; transition: background 0.1s; }
.mm__item:hover { background: rgba(36,36,36,0.04); }
.mm__label { flex: 1 1 auto; font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; }
.mm__chev { display: inline-flex; width: 16px; height: 16px; color: #424242; flex-shrink: 0; }
.mm__chev svg { width: 16px; height: 16px; }
.mm__div { height: 1px; width: 100%; background: rgba(189,189,189,0.5); }
.mm__links { display: flex; align-items: center; justify-content: center; gap: 16px; min-height: 40px; padding: 0 12px; }
.mm__links span { font-size: 12px; line-height: 16px; color: #5d5d5d; cursor: pointer; }
.mm__links span:hover { color: #242424; text-decoration: underline; }

/* ─── Main ─── */
.main { flex: 1 1 auto; display: flex; flex-direction: column; min-width: 0; }
.hdr { display: flex; align-items: center; justify-content: space-between; height: 56px; padding: 0 12px; flex-shrink: 0; }
.hdr__left { display: flex; align-items: center; gap: 2px; }
.hdr__badge { display: inline-flex; align-items: center; justify-content: center; gap: 4px; height: 32px; padding: 6px 10px; border-radius: 12px; background: transparent; color: #242424; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; cursor: pointer; transition: background 0.1s; }
.hdr__badge:hover { background: rgba(36,36,36,0.04); }
.hdr__picker { display: inline-flex; align-items: center; gap: 4px; height: 32px; padding: 6px 8px 6px 10px; border: none; border-radius: 12px; background: transparent; color: #242424; cursor: pointer; font-size: 14px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }
.hdr__picker:hover { background: rgba(36,36,36,0.04); }
.hdr__chev { display: inline-flex; width: 12px; height: 12px; }
.hdr__chev svg { width: 12px; height: 12px; }
.hdr__right { display: flex; align-items: center; gap: 4px; }
.hdr__btn { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s; }
.hdr__btn:hover { background: rgba(36,36,36,0.04); }
.hdr__btn svg { width: 20px; height: 20px; }
.hdr__btn--shield { color: #008455; }

.body { flex: 1 1 auto; display: flex; align-items: center; justify-content: center; padding: 24px; }
.zs { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 768px; position: relative; }
.zs__greeting { font-family: 'Segoe Serif', Georgia, 'Times New Roman', serif; font-size: 28px; line-height: 34px; font-weight: 400; color: #242424; margin-bottom: 24px; }

/* ─── Conversation mode ─── */
.thread { display: none; }
.shell--convo .body { align-items: stretch; padding: 0; }
.shell--convo .zs { height: 100%; justify-content: flex-end; margin: 0 auto; }
.shell--convo .zs__greeting, .shell--convo .zs__chips, .shell--convo .zs__list { display: none; }
.shell--convo .thread { display: flex; flex-direction: column; gap: 16px; flex: 1 1 auto; width: 100%; overflow-y: auto; padding: 24px 4px 8px; }
.shell--convo .thread::-webkit-scrollbar { width: 8px; background: transparent; }
.shell--convo .thread::-webkit-scrollbar-track { background: transparent; }
.shell--convo .thread::-webkit-scrollbar-thumb { background: transparent; border-radius: 9999px; transition: background 0.3s; }
.shell--convo .thread.is-scrolling::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); }
.shell--convo .cmp { margin-bottom: 12px; }
.shell--convo .cmp::before { content: ''; position: absolute; left: 0; right: 0; bottom: calc(100% + 1px); height: 32px; background: linear-gradient(to top, #fff, rgba(255,255,255,0)); pointer-events: none; }

/* User message bubble */
.umsg { display: flex; justify-content: flex-end; }
.umsg__bubble { max-width: 560px; background: #f2f2f2; border-radius: 12px; padding: 8px 16px; font-size: 16px; line-height: 28px; color: #242424; white-space: pre-wrap; word-break: break-word; }

/* Copilot response */
.resp { display: flex; flex-direction: column; gap: 16px; max-width: 720px; animation: respIn 0.28s ease both; }
@keyframes respIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .resp { animation: none; } }
.resp__p { font-size: 16px; line-height: 28px; font-weight: 420; color: #242424; }
.resp__link { color: #242424; text-decoration: underline; text-underline-offset: 2px; cursor: pointer; }
.resp__hr { border: none; border-top: 1px solid rgba(189,189,189,0.5); margin: 8px 0; }
.resp__h4 { font-size: 24px; line-height: 28px; font-weight: 600; font-variation-settings: 'wght' 550; letter-spacing: -0.15px; color: #242424; margin-top: 4px; }
.resp__p--muted { color: #adadad; }

/* Inline citation pill (Work = icon only · Web = source + count) */
.cite { display: inline-flex; align-items: center; gap: 2px; vertical-align: middle; min-height: 20px; padding: 2px 6px; margin-left: 2px; background: #f2f2f2; color: #5d5d5d; border-radius: 9999px; font-size: 10px; line-height: 14px; cursor: pointer; transition: background 0.1s; translate: 0 -1px; }
.cite:hover { background: #ebebeb; }
.cite svg { width: 14px; height: 14px; }
.cite--file { padding: 3px; }
.cite__name { max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cite__plus { font-weight: 600; }

/* Thinking indicator (latency) */
.think { display: inline-flex; align-items: center; gap: 6px; }
.think__mark { display: inline-flex; width: 20px; height: 20px; color: #242424; }
.think__mark svg { width: 20px; height: 20px; }
.think__label { font-size: 16px; line-height: 28px; color: #242424; background: linear-gradient(100deg,#242424 30%, #bdbdbd 50%, #242424 70%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: thinkShimmer 1.6s linear infinite; }
@keyframes thinkShimmer { to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .think__label { animation: none; -webkit-text-fill-color: #242424; } }

/* Reasoning chip (toggles the CoT panel) */
.cotbar { display: inline-flex; align-items: center; gap: 8px; align-self: flex-start; height: 32px; padding: 0 10px 0 8px; border: 1px solid #dedede; border-radius: 9999px; background: #fff; color: #242424; cursor: pointer; transition: background 0.1s; }
.cotbar:hover { background: rgba(36,36,36,0.04); }
.cotbar__mark { display: inline-flex; width: 20px; height: 20px; }
.cotbar__mark svg { width: 20px; height: 20px; }
.cotbar__label { font-size: 14px; line-height: 20px; }
.cotbar__chev { display: inline-flex; width: 16px; height: 16px; color: #6f6f6f; transition: transform 0.18s ease; }
.cotbar__chev svg { width: 16px; height: 16px; }
.shell--sp-open .cotbar__chev { transform: rotate(90deg); }

/* Response footer — action toolbar + divider + References button */
.rfoot { display: flex; align-items: center; margin-top: 8px; }
.rfoot__toolbar { display: flex; align-items: center; gap: 0; }
.rfoot__btn { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border: none; border-radius: 9999px; background: transparent; color: #424242; cursor: pointer; transition: background 0.1s, color 0.1s; }
.rfoot__btn:hover { background: rgba(36,36,36,0.04); color: #242424; }
.rfoot__btn:active { background: rgba(36,36,36,0.08); }
.rfoot__btn svg { width: 20px; height: 20px; }
.rfoot__btn .ico-f { display: none; }
.rfoot__btn.is-on { color: #242424; }
.rfoot__btn.is-on .ico-r { display: none; }
.rfoot__btn.is-on .ico-f { display: block; }
.rfoot__btn[data-tip]:hover::after { content: attr(data-tip); position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); background: #242424; color: #fff; font-size: 12px; line-height: 16px; padding: 4px 8px; border-radius: 6px; white-space: nowrap; pointer-events: none; z-index: 90; }
.rfoot__divider { width: 1px; height: 20px; background: rgba(189,189,189,0.5); margin: 0 4px; flex-shrink: 0; }
.rfoot__refs { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 6px 10px 6px 8px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; }
.rfoot__refs:hover { background: rgba(36,36,36,0.04); }
.rfoot__refs:active { background: rgba(36,36,36,0.08); }
.rfoot__avatars { display: inline-flex; align-items: center; }
.rfoot__avatar { width: 20px; height: 20px; border-radius: 9999px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 0 0 1.5px #fff; color: #fff; font-size: 10px; font-weight: 600; }
.rfoot__avatar + .rfoot__avatar { margin-left: -6px; }
.rfoot__avatar svg { width: 12px; height: 12px; }
.rfoot__avatar--file { background: #ebebeb; color: #5d5d5d; }
.rfoot__avatar--y { background: #6001d2; }
.rfoot__avatar--r { background: #0a66c2; }

/* Citation Preview popover (References + inline citation hover) */
.cp { position: fixed; z-index: 95; width: 304px; max-height: 292px; overflow-y: auto; background: #fff; padding: 8px; border-radius: 24px; display: none; flex-direction: column; box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.08), 0px 4px 8px 0px rgba(0,0,0,0.03), 0px 8px 12px 0px rgba(0,0,0,0.08); scrollbar-width: none; }
.cp.is-open { display: flex; }
.cp::-webkit-scrollbar { width: 0; height: 0; display: none; }
.cp__item { display: flex; flex-direction: column; gap: 6px; padding: 8px; border-radius: 16px; background: rgba(36,36,36,0); transition: background 0.1s; cursor: pointer; }
.cp__item:hover { background: rgba(24,24,24,0.04); }
.cp__hd { display: flex; align-items: center; gap: 8px; }
.cp__fav { width: 16px; height: 16px; border-radius: 4px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; color: #fff; font-size: 9px; font-weight: 700; text-transform: uppercase; }
.cp__fav--file { background: #ebebeb; color: #5d5d5d; }
.cp__fav--file svg { width: 12px; height: 12px; }
.cp__src { flex: 1 0 0; min-width: 0; font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cp__more { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; width: 28px; height: 28px; padding: 4px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; opacity: 0; transition: opacity 0.1s, background 0.1s; }
.cp__more svg { width: 20px; height: 20px; }
.cp__more:hover { background: rgba(36,36,36,0.06); }
.cp__item:hover .cp__more { opacity: 1; }
.cp__title { font-size: 14px; line-height: 20px; color: #242424; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.cp__url { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* ─── Secondary CoT panel ─── */
.sp { width: 0; flex-shrink: 0; display: flex; flex-direction: column; background: #fff; border-left: 1px solid #ececec; overflow: hidden; transition: width 0.2s ease; }
.shell--sp-open .sp { width: 340px; }
.sp__hdr { display: flex; align-items: center; justify-content: space-between; height: 56px; padding: 0 8px 0 16px; flex-shrink: 0; }
.sp__title { font-size: 14px; line-height: 20px; font-weight: 600; color: #242424; }
.sp__body { flex: 1 1 auto; overflow-y: auto; padding: 4px 16px 24px; }
.sp__body::-webkit-scrollbar { width: 8px; background: transparent; }
.sp__body::-webkit-scrollbar-track { background: transparent; }
.sp__body::-webkit-scrollbar-thumb { background: transparent; border-radius: 9999px; transition: background 0.3s; }
.sp__body.is-scrolling::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); }
.cot-step { display: flex; align-items: center; gap: 8px; width: 100%; padding: 8px 4px; border: none; background: transparent; cursor: pointer; text-align: left; border-radius: 8px; transition: background 0.1s; }
.cot-step:hover { background: rgba(36,36,36,0.04); }
.cot-step__chev { display: inline-flex; width: 16px; height: 16px; color: #616161; flex-shrink: 0; }
.cot-step__chev svg { width: 16px; height: 16px; }
.cot-step__dot { width: 8px; height: 8px; margin: 0 4px; border-radius: 9999px; background: #242424; flex-shrink: 0; }
.cot-step__label { font-size: 14px; line-height: 20px; color: #242424; }
.cot-subs { display: flex; flex-direction: column; gap: 12px; padding: 4px 0 8px 12px; }
.cot-sub { font-size: 13px; line-height: 18px; color: #616161; }
.cot-cite { margin-top: -6px; }
.cot-cite .cite { margin-left: 0; }

.cmp { position: relative; width: 100%; background: #fff; border: 1px solid #dedede; border-radius: 28px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: border-color 0.15s; }
.cmp:focus-within { border-color: #c7c7c7; }

/* Add menu (opens above the + button) */
.addm { position: absolute; left: 0; bottom: calc(100% + 8px); width: 260px; background: #fff; border-radius: 16px; padding: 8px; box-shadow: 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 4px rgba(0,0,0,0.03), 0px 8px 24px rgba(0,0,0,0.14); display: none; flex-direction: column; z-index: 50; }
.cmp.is-am-open .addm { display: flex; }
.cmp.is-am-open #addBtn { background: rgba(36,36,36,0.08); }
.addm__item { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 12px; border: none; border-radius: 12px; background: transparent; cursor: pointer; text-align: left; transition: background 0.1s; }
.addm__item:hover { background: rgba(36,36,36,0.04); }
.addm__ico { display: inline-flex; width: 20px; height: 20px; color: #242424; flex-shrink: 0; }
.addm__ico svg { width: 20px; height: 20px; }
.addm__label { flex: 1 0 0; min-width: 0; font-size: 14px; line-height: 20px; color: #242424; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; white-space: nowrap; }
.addm__chev { display: inline-flex; width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; }
.addm__chev svg { width: 20px; height: 20px; }
.addm-div { height: 1px; background: rgba(189,189,189,0.5); margin: 8px 0; }
.cmp__row { display: flex; align-items: center; gap: 4px; }
/* Skill attachment chip (added from the source menu L2) */
.cmp__attach { display: none; flex-wrap: wrap; gap: 8px; padding: 4px 4px 10px; }
.cmp__attach:not(:empty) { display: flex; }
.cmp-attach { position: relative; display: inline-flex; align-items: center; gap: 8px; height: 58px; padding: 8px; padding-right: 26px; border: 1px solid #dedede; border-radius: 16px; background: #fff; max-width: 220px; }
.cmp-attach__ico { width: 32px; height: 32px; border-radius: 9999px; background: #f5f5f5; display: inline-flex; align-items: center; justify-content: center; color: #616161; flex-shrink: 0; overflow: hidden; }
.cmp-attach__ico svg { width: 20px; height: 20px; }
.cmp-attach__ico img { width: 20px; height: 20px; object-fit: contain; display: block; }
.cmp-attach__meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.cmp-attach__name { font-size: 14px; line-height: 20px; font-weight: 600; font-variation-settings: 'opsz' 8, 'wght' 600; color: #242424; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cmp-attach__desc { font-size: 12px; line-height: 16px; color: #5d5d5d; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cmp-attach__x { position: absolute; top: 6px; right: 6px; display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; padding: 0; border: none; background: none; border-radius: 4px; color: #616161; cursor: pointer; transition: background 0.1s, color 0.1s; }
.cmp-attach__x:hover { background: rgba(36,36,36,0.06); color: #242424; }
.cmp-attach__x svg { width: 12px; height: 12px; }
.cmp__ta { flex: 1 1 auto; min-width: 0; border: none; outline: none; resize: none; background: transparent; overflow: hidden; font-family: 'Segoe Sans','Segoe UI',system-ui,sans-serif; font-size: 16px; line-height: 28px; color: #1f1f1f; padding: 0 8px; caret-color: #242424; field-sizing: content; }
.cmp__ta::placeholder { color: #6f6f6f; }
.cmp__btn, .cmp__send { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border-radius: 9999px; border: none; cursor: pointer; background: transparent; color: #242424; transition: background 0.1s, color 0.15s; flex-shrink: 0; }
.cmp__btn:hover, .cmp__send:hover { background: rgba(36,36,36,0.04); }
.cmp__btn svg, .cmp__send svg { width: 20px; height: 20px; }
.cmp__send-arrow { display: none; }
.cmp.ci--has-text .cmp__send-eq { display: none; }
.cmp.ci--has-text .cmp__send-arrow { display: inline-flex; }
.cmp.ci--has-text .cmp__send { background: #242424; color: #fff; }
.cmp.ci--has-text .cmp__send:hover { background: #3b3b3b; }
.zs__chips { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: flex-start; width: 100%; max-width: 656px; margin-top: 16px; }
.zs__chip { display: inline-flex; align-items: center; gap: 6px; padding: 10px; border: 1px solid rgba(189,189,189,0.5); border-radius: 12px; background: transparent; color: #5d5d5d; font-size: 14px; font-weight: 420; line-height: 20px; cursor: pointer; transition: background 0.1s; }
.zs__chip:hover { background: rgba(24,24,24,0.04); }
.zs__chip--selected { background: #242424; border-color: transparent; color: #fff; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.zs__chip--selected:hover { background: #313131; }
.zs__chip--selected .zs__chip-ico { color: #fff; }
.zs__chip-ico { display: inline-flex; width: 16px; height: 16px; color: #6f6f6f; }
.zs__chip-ico svg { width: 16px; height: 16px; }
.zs__chip-ico img { width: 16px; height: 16px; object-fit: contain; display: block; }
.zs__chip--src .zs__chip-ico { width: 18px; height: 18px; align-items: center; justify-content: center; }
.zs__chip--src .zs__chip-ico img { width: 15px; height: 15px; }
.zs__chip--src.zs__chip--selected .zs__chip-ico { background: #fff; border-radius: 4px; }
.zs__overflow { display: inline-flex; align-items: center; justify-content: center; padding: 8px 6px; border: none; border-radius: 9999px; background: transparent; color: #6f6f6f; cursor: pointer; transition: background 0.1s; }
.zs__overflow:hover { background: rgba(24,24,24,0.04); }
.zs__overflow svg { width: 20px; height: 20px; }
.zs__list { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); width: 100%; max-width: 656px; margin-top: 12px; }
.ciq { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); width: 100%; max-width: 656px; margin-top: 12px; display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
.ciq[hidden] { display: none; }
.zs.ciq-open .zs__chips { display: none; }
.ciq__tabs { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.ciq__tab { display: inline-flex; align-items: center; padding: 6px 12px; border: none; border-radius: 12px; background: transparent; color: #242424; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; cursor: pointer; transition: background 0.1s; white-space: nowrap; }
.ciq__tab:hover { background: rgba(36,36,36,0.04); }
.ciq__tab--sel { background: #242424; color: #fff; }
.ciq__tab--sel:hover { background: #313131; }
.ciq__list { display: flex; flex-direction: column; width: 100%; max-height: 236px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #c7c7c7 transparent; }
.ciq__list::-webkit-scrollbar { width: 8px; background: transparent; }
.ciq__list::-webkit-scrollbar-track { background: transparent; }
.ciq__list::-webkit-scrollbar-thumb { background: transparent; border-radius: 9999px; transition: background 0.3s; }
.ciq__list.is-scrolling::-webkit-scrollbar-thumb { background: #c7c7c7; }
.ciq__item { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 12px; border: none; border-radius: 12px; background: transparent; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; }
.ciq__item:hover { background: rgba(36,36,36,0.04); }
.ciq__ico { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; flex-shrink: 0; color: #242424; }
.ciq__ico img, .ciq__ico svg { width: 20px; height: 20px; object-fit: contain; display: block; }
.ciq__cbody { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.ciq__crow { flex: 1; min-width: 0; display: flex; flex-direction: row; align-items: center; gap: 6px; }
.ciq__title { font-size: 14px; line-height: 20px; font-weight: 550; font-variation-settings: 'opsz' 8, 'wght' 550; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ciq__label { flex: 1; min-width: 0; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ciq__desc { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ciq__trail { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; flex-shrink: 0; }
.ciq__chev { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; }
.ciq__chev svg { width: 20px; height: 20px; }
/* CIQ menu — modal variant ("Add content" dialog) */
.ciqm-overlay { position: fixed; inset: 0; z-index: 215; background: rgba(0,0,0,0.15); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); display: none; align-items: center; justify-content: center; }
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
.zs__list:empty { display: none; }
.zs__list-rows { display: flex; flex-direction: column; }
.zs__row { border-bottom: 1px solid #dedede; }
.zs__row--last { border-bottom: none; }
.zs__item { display: flex; align-items: center; gap: 6px; padding: 10px 12px; border-radius: 12px; background: transparent; transition: background 0.1s; cursor: pointer; }
.zs__item:hover { background: rgba(24,24,24,0.04); }
.zs__label { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 14px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; line-height: 20px; color: #242424; }
.disc { text-align: center; font-size: 12px; line-height: 16px; color: #8a8a8a; padding: 12px 24px 20px; }

/* ─── Prompt Lab modal ─── */
.pl-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.32); display: none; align-items: center; justify-content: center; z-index: 100; }
.pl-overlay.is-open { display: flex; }
.pl { width: 880px; max-width: 92vw; height: 660px; max-height: 88vh; background: #fff; border-radius: 24px; box-shadow: 0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.03), 0 32px 48px rgba(0,0,0,0.14); padding: 24px 24px 0; display: flex; flex-direction: column; overflow: hidden; }
.pl__head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px; }
.pl__title { font-size: 26px; line-height: 32px; font-weight: 600; }
.pl__x { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; }
.pl__x:hover { background: rgba(36,36,36,0.06); }
.pl__x svg { width: 20px; height: 20px; }
.pl__body { flex: 1 1 auto; display: flex; gap: 24px; min-height: 0; }
.pl-side { width: 180px; flex-shrink: 0; display: flex; flex-direction: column; gap: 4px; padding-top: 24px; }
.pl-nav { display: flex; align-items: center; gap: 8px; width: 100%; height: 32px; padding: 6px 8px; border: none; border-radius: 8px; background: transparent; color: #242424; cursor: pointer; text-align: left; transition: background 0.1s; }
.pl-nav:hover { background: rgba(36,36,36,0.04); }
.pl-nav__ico { display: inline-flex; width: 20px; height: 20px; color: #424242; }
.pl-nav__ico svg { width: 20px; height: 20px; }
.pl-nav__label { font-size: 14px; line-height: 20px; }
.pl-nav--sel { background: #ebebeb; }
.pl-nav--sel .pl-nav__label { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.pl-shead { font-size: 12px; line-height: 16px; color: #6f6f6f; padding: 8px 8px 4px; margin-top: 8px; }
.pl-topic { display: block; width: 100%; text-align: left; padding: 6px 8px; border: none; border-radius: 8px; background: transparent; color: #242424; cursor: pointer; font-size: 14px; line-height: 20px; transition: background 0.1s; }
.pl-topic:hover { background: rgba(36,36,36,0.04); }
.pl-topic--sel { background: #ebebeb; }
.pl-topic--muted { color: #6f6f6f; }
.pl-group { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 8px 8px 4px; margin-top: 8px; border: none; background: transparent; cursor: pointer; }
.pl-group__label { font-size: 12px; line-height: 16px; color: #6f6f6f; }
.pl-group__chev { display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; color: #6f6f6f; transition: transform 0.15s ease; }
.pl-group__chev svg { width: 16px; height: 16px; }
.pl-group[aria-expanded="true"] .pl-group__chev { transform: rotate(90deg); }
.pl-group__items { display: flex; flex-direction: column; gap: 2px; }
.pl-group__items[hidden] { display: none; }
.pl-tab { display: block; width: 100%; text-align: left; padding: 6px 8px 6px 16px; border: none; border-radius: 8px; background: transparent; color: #242424; cursor: pointer; font-size: 14px; line-height: 20px; transition: background 0.1s; }
.pl-tab:hover { background: rgba(36,36,36,0.04); }
.pl-tab--sel { background: #ebebeb; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.pl__content { flex: 1 1 auto; min-width: 0; overflow-y: auto; padding: 24px 4px 0 0; }
.pl__content::-webkit-scrollbar { width: 8px; background: transparent; }
.pl__content::-webkit-scrollbar-track { background: transparent; }
.pl__content::-webkit-scrollbar-thumb { background: transparent; border-radius: 9999px; transition: background 0.3s; }
.pl__content.is-scrolling::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); }
.pl-item { position: relative; padding: 16px 0; border-bottom: 1px solid #dedede; cursor: pointer; }
.pl-item:hover { background: rgba(36,36,36,0.015); }
.pl-item__cat { font-size: 12px; line-height: 16px; color: #6f6f6f; }
.pl-item__title { font-size: 20px; line-height: 28px; font-weight: 400; color: #242424; margin: 4px 0; padding-right: 32px; }
.pl-item__by { font-size: 12px; line-height: 16px; color: #6f6f6f; }
.pl-item__bm { position: absolute; top: 16px; right: 0; display: none; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 4px; border: none; border-radius: 8px; background: transparent; color: #424242; cursor: pointer; }
.pl-item__bm:hover { background: rgba(36,36,36,0.06); }
.pl-item__bm svg { width: 20px; height: 20px; }
.pl-item:hover .pl-item__bm { display: inline-flex; }

/* ─── Sources Menu modal ("Change data sources") ─── */
.src-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(0,0,0,0.15); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); display: none; align-items: center; justify-content: center; }
.src-overlay.is-open { display: flex; }
.srcm { width: 598px; height: 520px; background: #fff; border: 0.5px solid #dedede; border-radius: 16px; padding: 28px; display: flex; flex-direction: column; gap: 16px;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.15), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08); }
.srcm__hdr { height: 32px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
.srcm__title { font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.srcm__hdr-actions { display: flex; align-items: center; gap: 4px; }
.srcm__manage { display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 8px; border: none; background: none; border-radius: 8px; font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; cursor: pointer; transition: background 0.1s; }
.srcm__manage:hover { background: rgba(36,36,36,0.04); }
.srcm__manage svg { width: 20px; height: 20px; }
.srcm__close { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: none; background: none; border-radius: 8px; color: #242424; cursor: pointer; transition: background 0.1s; }
.srcm__close:hover { background: rgba(36,36,36,0.04); }
.srcm__close svg { width: 20px; height: 20px; }
.srcm__search { height: 40px; display: flex; align-items: center; gap: 8px; padding: 0 12px; border: 1px solid rgba(189,189,189,0.5); border-radius: 9999px; flex-shrink: 0; color: #6f6f6f; }
.srcm__search:focus-within { border-color: #242424; }
.srcm__search svg { width: 20px; height: 20px; flex-shrink: 0; }
.srcm__search input { flex: 1; border: none; outline: none; background: none; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; }
.srcm__search input::placeholder { color: #6f6f6f; }
.srcm__group { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 4px; }
.srcm__subhdr { display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; padding: 0 12px; min-height: 36px; }
.srcm__count { font-size: 12px; line-height: 16px; font-weight: 400; color: #5d5d5d; }
.srcm__turnoff { font-size: 12px; line-height: 16px; font-weight: 420; color: #242424; background: none; border: none; padding: 4px 8px; border-radius: 8px; cursor: pointer; }
.srcm__turnoff:hover { background: rgba(36,36,36,0.04); }
.srcm__turnoff:disabled { color: #929292; cursor: not-allowed; background: none; }
.srcm__list { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow-y: auto; margin: 0 -4px; padding: 0 4px; scrollbar-width: thin; scrollbar-color: transparent transparent; }
.srcm__list::-webkit-scrollbar { width: 8px; background: transparent; }
.srcm__list::-webkit-scrollbar-track { background: transparent; }
.srcm__list::-webkit-scrollbar-thumb { background: transparent; border-radius: 9999px; transition: background 0.3s; }
.srcm__list.is-scrolling { scrollbar-color: rgba(0,0,0,0.14) transparent; }
.srcm__list.is-scrolling::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); }
.srcm__row { height: 56px; display: flex; align-items: center; flex-shrink: 0; border-bottom: 1px solid rgba(189,189,189,0.5); }
.srcm__inner { flex: 1; display: flex; align-items: center; gap: 6px; min-width: 0; padding: 10px 12px; border-radius: 12px; background: rgba(36,36,36,0); transition: background 0.1s; }
.srcm__inner:hover { background: rgba(36,36,36,0.04); }
.srcm__logo { width: 20px; height: 20px; border-radius: 5px; overflow: hidden; flex-shrink: 0; display: inline-flex; }
.srcm__logo img { width: 100%; height: 100%; object-fit: cover; }
.srcm__logo--glyph { background: none; align-items: center; justify-content: center; color: #242424; }
.srcm__logo--glyph svg { width: 20px; height: 20px; }
.srcm__label { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; white-space: nowrap; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.srcm__meta { flex-shrink: 0; font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; }
.srcm__connect { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; background: none; border: none; padding: 4px 8px; border-radius: 8px; cursor: pointer; flex-shrink: 0; }
.srcm__connect:hover { background: rgba(36,36,36,0.04); }
.srcm__chev { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; margin-left: 6px; padding: 4px; border: none; border-radius: 8px; background: transparent; color: #6f6f6f; flex-shrink: 0; cursor: pointer; transition: background 0.1s, color 0.1s; }
.srcm__chev:hover { background: rgba(36,36,36,0.06); color: #242424; }
.srcm__chev svg { width: 20px; height: 20px; }
/* Skills sub-view (chevron → source's skills) */
#srcMainView { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 16px; }
#srcMainView[hidden] { display: none; }
.srcm__skillsview { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 8px; }
.srcm__skillsview[hidden] { display: none; }
.srcm__subnav { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 32px; padding: 6px 4px; border: none; background: transparent; cursor: pointer; text-align: left; border-radius: 8px; color: #242424; transition: background 0.1s; }
.srcm__subnav:hover { background: rgba(36,36,36,0.04); }
.srcm__subnav svg { width: 20px; height: 20px; flex-shrink: 0; }
.srcm__subname { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; }
.srcm__skilllist { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; overflow-y: auto; scrollbar-width: thin; scrollbar-color: transparent transparent; }
.srcm__skilllist::-webkit-scrollbar { width: 8px; background: transparent; }
.srcm__skilllist::-webkit-scrollbar-track { background: transparent; }
.srcm__skilllist::-webkit-scrollbar-thumb { background: transparent; border-radius: 9999px; transition: background 0.3s; }
.srcm__skilllist.is-scrolling { scrollbar-color: rgba(0,0,0,0.14) transparent; }
.srcm__skilllist.is-scrolling::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); }
.srcm__skill { position: relative; display: flex; align-items: flex-start; gap: 10px; padding: 10px 8px; cursor: pointer; border-radius: 8px; transition: background 0.1s; }
.srcm__skill::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: rgba(189,189,189,0.5); }
.srcm__skill:last-child::after { display: none; }
.srcm__skill:hover { background: rgba(36,36,36,0.04); }
.srcm__skico { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; color: #616161; flex-shrink: 0; margin-top: 1px; }
.srcm__skico svg { width: 20px; height: 20px; }
.srcm__skmeta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.srcm__skname { font-size: 14px; line-height: 20px; font-weight: 600; font-variation-settings: 'opsz' 8, 'wght' 600; color: #242424; }
.srcm__skdesc { font-size: 12px; line-height: 16px; font-weight: 420; color: #5d5d5d; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
.srcm__tgl { width: 32px; height: 16px; border-radius: 9999px; position: relative; cursor: pointer; flex-shrink: 0; border: 1px solid transparent; transition: background 0.15s, border-color 0.15s; }
.srcm__thumb { width: 12px; height: 12px; border-radius: 9999px; position: absolute; top: 50%; transform: translateY(-50%); transition: left 0.15s, background 0.15s; }
.srcm__tgl--on { background: #242424; }
.srcm__tgl--on .srcm__thumb { background: #fff; left: 18px; }
.srcm__tgl--off { background: #fff; border-color: #dedede; }
.srcm__tgl--off .srcm__thumb { background: #6f6f6f; left: 2px; }
.srcm__footer { height: 40px; display: flex; align-items: center; flex-shrink: 0; }
.srcm__footer-inner { flex: 1; display: flex; align-items: center; gap: 6px; padding: 10px 12px; border-radius: 12px; color: #242424; cursor: pointer; transition: background 0.1s; }
.srcm__footer-inner:hover { background: rgba(36,36,36,0.04); }
.srcm__footer-inner span { font-size: 14px; line-height: 20px; }
.srcm__footer-inner svg { width: 20px; height: 20px; }

/* ─── Settings modal (Sources tab) ─── */
.stg-overlay { position: fixed; inset: 0; z-index: 210; background: rgba(0,0,0,0.15); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); display: none; align-items: center; justify-content: center; }
.stg-overlay.is-open { display: flex; }
/* Compound-level: gutter always reserved (no layout shift); bar invisible at rest, thumb shown only while scrolling */
.stg-overlay, .stg-overlay *, .src-overlay, .src-overlay * { scrollbar-width: thin !important; scrollbar-color: transparent transparent !important; }
.stg-overlay ::-webkit-scrollbar, .src-overlay ::-webkit-scrollbar { width: 8px !important; height: 8px !important; background: transparent !important; }
.stg-overlay ::-webkit-scrollbar-track, .src-overlay ::-webkit-scrollbar-track { background: transparent !important; }
.stg-overlay ::-webkit-scrollbar-thumb, .src-overlay ::-webkit-scrollbar-thumb { background: transparent !important; border-radius: 9999px !important; transition: background 0.2s; }
.stg-overlay .is-scrolling, .src-overlay .is-scrolling { scrollbar-color: rgba(0,0,0,0.28) transparent !important; }
.stg-overlay .is-scrolling::-webkit-scrollbar-thumb, .src-overlay .is-scrolling::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.28) !important; }
.stg { width: 790px; height: 636px; max-width: calc(100vw - 48px); max-height: calc(100vh - 48px); background: #fff; border-radius: 24px;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.15), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08); padding: 28px; display: flex; flex-direction: column; gap: 24px; }
.stg__bar { display: flex; align-items: center; flex-shrink: 0; height: 32px; }
.stg__title { width: 198px; flex-shrink: 0; font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.stg__barspace { flex: 1; }
.stg__back { width: 32px; height: 32px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; display: none; align-items: center; justify-content: center; margin-left: 24px; transition: background 0.1s; }
.stg__back:hover { background: rgba(36,36,36,0.04); }
.stg__back svg { width: 20px; height: 20px; }
.stg.is-detail .stg__back { display: inline-flex; }
.stg__x { width: 32px; height: 32px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: background 0.1s; }
.stg__x:hover { background: rgba(36,36,36,0.04); }
.stg__x svg { width: 20px; height: 20px; }
.stg__body { display: flex; gap: 24px; flex: 1; min-height: 0; }
.stg__nav { width: 198px; flex-shrink: 0; display: flex; flex-direction: column; gap: 2px; }
.stg__navitem { text-align: left; padding: 8px 12px; border: none; border-radius: 8px; background: transparent; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; cursor: pointer; transition: background 0.1s; }
.stg__navitem:hover { background: rgba(36,36,36,0.04); }
.stg__navitem--sel { background: #ebebeb; font-weight: 600; }
.stg__content { flex: 1; min-width: 0; overflow-y: auto; padding-right: 6px; scrollbar-width: thin; scrollbar-color: transparent transparent; }
.stg__content::-webkit-scrollbar { width: 8px; background: transparent; }
.stg__content::-webkit-scrollbar-track { background: transparent; }
.stg__content::-webkit-scrollbar-thumb { background: transparent; border-radius: 9999px; transition: background 0.3s; }
.stg__content.is-scrolling { scrollbar-color: #c7c7c7 transparent; }
.stg__content.is-scrolling::-webkit-scrollbar-thumb { background: #c7c7c7; }
.stg__sechead { font-size: 16px; line-height: 22px; font-weight: 600; color: #242424; }
.stg__sechead-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
@keyframes srcflash { 0% { background: #dbe8ff; } 100% { background: transparent; } }
.src-justconnected { animation: srcflash 1.5s ease; }
.srcm__row.src-justconnected .srcm__inner, .src-justconnected.stg__row { animation: srcflash 1.5s ease; }
.stg__tools { display: flex; align-items: center; gap: 8px; }
.stg__filter { display: inline-flex; align-items: center; gap: 4px; height: 32px; padding: 0 8px 0 12px; border: none; border-radius: 12px; background: transparent; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; cursor: pointer; transition: background 0.1s; white-space: nowrap; }
.stg__filter:hover { background: rgba(36,36,36,0.04); }
.stg__filter svg { width: 20px; height: 20px; color: #6f6f6f; transition: transform 0.12s; }
.stg__flt { position: relative; }
.stg__flt.is-open .stg__filter { background: #ebebeb; }
.stg__flt.is-open .stg__filter svg { transform: rotate(180deg); }
.stg__fmenu { position: absolute; top: calc(100% + 4px); left: 0; min-width: 168px; background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 12px; padding: 4px; box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08); opacity: 0; transform: translateY(-4px); pointer-events: none; transition: opacity 0.12s, transform 0.12s; z-index: 40; }
.stg__flt.is-open .stg__fmenu { opacity: 1; transform: translateY(0); pointer-events: auto; }
.stg__fitem { display: flex; align-items: center; gap: 6px; width: 100%; height: 36px; padding: 8px 12px; border: none; background: transparent; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; cursor: pointer; text-align: left; transition: background 0.1s; }
.stg__fitem:hover { background: rgba(36,36,36,0.04); }
.stg__fitem--sel { background: #ebebeb; font-weight: 625; }
.stg__fcheck { width: 16px; height: 16px; margin-left: auto; color: #242424; display: none; }
.stg__fitem--sel .stg__fcheck { display: inline-flex; }
.stg__secdesc { font-size: 14px; line-height: 20px; font-weight: 420; color: #5d5d5d; margin: 0 0 4px; padding: 0 0 16px; border-bottom: 1px solid #dedede; }
.stg__row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 4px; border: none; border-bottom: 1px solid #dedede; background: transparent; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; }
.stg__row:hover { background: rgba(36,36,36,0.03); }
.stg__row--browse { cursor: default; }
.stg__row--browse:hover { background: transparent; }
.stg__rowicon { width: 20px; height: 20px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; }
.stg__rowicon img { width: 20px; height: 20px; object-fit: contain; display: block; }
.stg__gi { display: inline-flex; width: 20px; height: 20px; color: #242424; }
.stg__gi svg { width: 20px; height: 20px; }
.stg__rowmeta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.stg__rowname { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; }
.stg__rowsub { font-size: 12px; line-height: 16px; font-weight: 420; color: #5d5d5d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.stg__row--browse .stg__rowsub { white-space: normal; }
.stg__chev { display: inline-flex; width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; }
.stg__chev svg { width: 20px; height: 20px; }
.stg__connect { flex-shrink: 0; border: none; background: transparent; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; cursor: pointer; padding: 6px 10px; border-radius: 8px; transition: background 0.1s; }
.stg__connect:hover { background: rgba(36,36,36,0.04); }
.stg__connect--done { color: #5d5d5d; cursor: default; }
.stg__connect--done:hover { background: transparent; }
.stg__browsehead { display: flex; align-items: center; justify-content: space-between; margin: 24px 0 4px; }
.stg__search-sm { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 10px; border: 1px solid #dedede; border-radius: 12px; background: #fff; }
.stg__search-sm svg { width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; }
.stg__search-sm input { border: none; outline: none; background: transparent; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; width: 120px; }
.stg__search-sm input::placeholder { color: #6f6f6f; }
.stg__empty { padding: 20px 4px; font-size: 13px; line-height: 18px; color: #5d5d5d; }

/* ─── Source L2 detail (Settings → Sources → connected source) ─── */
.stgd__id { display: flex; align-items: center; gap: 12px; }
.stgd__logo { width: 20px; height: 20px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; }
.stgd__logo img { width: 20px; height: 20px; object-fit: contain; display: block; }
.stgd__logo .stg__gi { width: 20px; height: 20px; }
.stgd__logo svg { width: 20px; height: 20px; }
.stgd__name { flex: 1; min-width: 0; font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.stgd__actions { display: flex; align-items: center; gap: 8px; position: relative; }
.stgd__disconnect { height: 32px; padding: 0 12px; border: none; border-radius: 8px; background: #f5f5f5; color: #242424; font-family: inherit; font-size: 14px; line-height: 20px; cursor: pointer; transition: background 0.1s; }
.stgd__disconnect:hover { background: #ebebeb; }
.stgd__ofl { position: relative; }
.stgd__more { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 9999px; color: #242424; cursor: pointer; transition: background 0.1s; }
.stgd__more:hover { background: rgba(36,36,36,0.04); }
.stgd__more svg { width: 20px; height: 20px; }
.stgd__oflmenu { position: absolute; top: calc(100% + 4px); right: 0; min-width: 176px; background: #fff; border-radius: 12px; padding: 4px; box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08); opacity: 0; transform: translateY(-4px); pointer-events: none; transition: opacity 0.12s, transform 0.12s; z-index: 30; }
.stgd__ofl.is-open .stgd__oflmenu { opacity: 1; transform: translateY(0); pointer-events: auto; }
.stgd__oflitem { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 12px; border: none; background: transparent; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; cursor: pointer; text-align: left; transition: background 0.1s; }
.stgd__oflitem:hover { background: rgba(36,36,36,0.04); }
.stgd__oflitem svg { width: 20px; height: 20px; color: #242424; }
.stgd__rule { height: 1px; background: #dedede; margin: 16px 0; border: none; }
.stgd__sec { padding: 16px 0; }
.stgd__sech { font-size: 14px; line-height: 20px; font-weight: 600; color: #242424; margin-bottom: 8px; }
.stgd__p { font-size: 14px; line-height: 20px; color: #5d5d5d; }
.stgd__chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.stgd__chip { display: inline-flex; align-items: center; justify-content: center; min-height: 24px; padding: 2px 10px; border: none; border-radius: 9999px; background: rgba(0,0,0,0.05); color: #242424; font-size: 12px; line-height: 16px; font-weight: 400; white-space: nowrap; }
/* Skills section — cards + Show more */
.stgd__skills { display: flex; flex-direction: column; gap: 8px; }
.stgd__skmore { display: contents; }
.stgd__skmore[hidden] { display: none; }
.stgd__skill { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 10px 14px; border: 1px solid #dedede; border-radius: 12px; background: #fff; transition: background 0.1s, border-color 0.1s; }
.stgd__skill:hover { background: rgba(36,36,36,0.02); border-color: #c7c7c7; }
.stgd__skico { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; color: #616161; flex-shrink: 0; }
.stgd__skico svg { width: 20px; height: 20px; }
.stgd__skmeta { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1 1 auto; }
.stgd__skname { font-size: 14px; line-height: 20px; font-weight: 600; font-variation-settings: 'opsz' 8, 'wght' 600; color: #242424; }
.stgd__skdesc { font-size: 12px; line-height: 16px; font-weight: 420; color: #5d5d5d; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
.stgd__skofl { position: relative; flex-shrink: 0; }
.stgd__skmenu { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; background: transparent; border-radius: 9999px; color: #424242; cursor: pointer; transition: background 0.1s; }
.stgd__skmenu:hover { background: rgba(36,36,36,0.06); }
.stgd__skmenu svg { width: 20px; height: 20px; }
.stgd__skoflmenu { position: absolute; top: calc(100% + 4px); right: 0; min-width: 180px; background: #fff; border-radius: 12px; padding: 4px; box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08); opacity: 0; transform: translateY(-4px); pointer-events: none; transition: opacity 0.12s, transform 0.12s; z-index: 40; }
.stgd__skofl.is-open .stgd__skoflmenu { opacity: 1; transform: translateY(0); pointer-events: auto; }
/* Skill expanded view (L3) */
.stgd__skhead { display: flex; align-items: center; gap: 12px; padding: 25px 0 18px; border-bottom: 1px solid #dedede; }
.stgd__skhico { width: 20px; height: 20px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; color: #616161; }
.stgd__skhico svg { width: 20px; height: 20px; }
.stgd__skhmeta { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.stgd__skhname { font-size: 16px; line-height: 28px; font-weight: 600; font-variation-settings: 'opsz' 8, 'wght' 600; color: #242424; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.stgd__skhsub { font-size: 12px; line-height: 16px; color: #242424; }
.stgd__skhact { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.stgd__skhchat { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 9999px; color: #242424; cursor: pointer; transition: background 0.1s; }
.stgd__skhchat:hover { background: rgba(36,36,36,0.04); }
.stgd__skhchat svg { width: 20px; height: 20px; }
.stgd__share { height: 32px; padding: 0 10px; border: 1px solid #dedede; border-radius: 12px; background: #fff; color: #242424; font-family: inherit; font-size: 14px; line-height: 20px; cursor: pointer; transition: background 0.1s; }
.stgd__share:hover { background: rgba(36,36,36,0.04); }
.stgd__skabout { display: flex; flex-direction: column; gap: 4px; padding: 16px 0; }
.stgd__skinstr { display: flex; flex-direction: column; gap: 8px; padding: 16px 0; }
.stgd__skl { font-size: 14px; line-height: 20px; color: #242424; }
.stgd__skabouttxt { font-size: 14px; line-height: 20px; color: #5d5d5d; opacity: 0.7; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.stgd__skabouttxt.is-expanded { display: block; -webkit-line-clamp: unset; overflow: visible; }
.stgd__skmore2 { display: inline-flex; align-self: flex-start; margin-top: 2px; padding: 2px 0; background: none; border: none; color: #242424; font-family: inherit; font-size: 12px; line-height: 16px; cursor: pointer; }
.stgd__skmore2:hover { text-decoration: underline; }
.stgd__skmore2[hidden] { display: none; }
.stgd__instr { border: 1px solid #dedede; border-radius: 16px; padding: 12px 20px; display: flex; flex-direction: column; gap: 16px; }
.stgd__instrsec { display: flex; flex-direction: column; gap: 4px; }
.stgd__instrh { font-size: 14px; line-height: 20px; font-weight: 600; font-variation-settings: 'opsz' 8, 'wght' 600; color: #242424; }
.stgd__instrp { font-size: 14px; line-height: 20px; color: #242424; }
.stgd__instrul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; }
.stgd__instrul li { font-size: 14px; line-height: 20px; color: #242424; }
.stgd__showmore { align-self: flex-start; margin-top: 2px; padding: 6px 10px; border: none; border-radius: 8px; background: transparent; color: #242424; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; cursor: pointer; transition: background 0.1s; }
.stgd__showmore:hover { background: rgba(36,36,36,0.04); }
.stgd__meta { display: flex; flex-direction: column; gap: 16px; }
.stgd__row { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.stgd__label { font-size: 14px; line-height: 20px; color: #5d5d5d; }
.stgd__value { font-size: 14px; line-height: 20px; color: #242424; }
.stgd__link { display: inline-flex; align-items: center; gap: 4px; font-size: 14px; line-height: 20px; color: #242424; text-decoration: none; cursor: pointer; }
.stgd__link:hover { text-decoration: underline; }
.stgd__link svg { width: 16px; height: 16px; color: #6f6f6f; }

/* ─── Auth Dialog (Connect consent) ─── */
.ad-overlay { position: fixed; inset: 0; z-index: 220; background: rgba(0,0,0,0.15); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); display: none; align-items: center; justify-content: center; }
.ad-overlay.is-open { display: flex; }
.ad { width: 448px; max-width: calc(100vw - 48px); background: #fff; border-radius: 24px; padding: 28px; display: flex; flex-direction: column;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.15), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08); }
.ad__text { display: flex; flex-direction: column; gap: 12px; }
.ad__header { display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }
.ad__title { font-size: 24px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.ad__subtitle { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 12px; line-height: 16px; font-weight: 400; color: #424242; }
.ad__logos { display: flex; align-items: center; justify-content: center; gap: 16px; padding: 40px 0; }
.ad__mark { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; }
.ad__mark--copilot { color: #242424; }
.ad__mark--copilot svg { width: 48px; height: 48px; }
.ad__mark--partner img { width: 48px; height: 48px; object-fit: contain; border-radius: 8px; display: block; }
.ad__dots { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; color: #6f6f6f; }
.ad__dots svg { width: 24px; height: 24px; }
.ad__body { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; }
.ad__link { color: #242424; text-decoration: none; cursor: pointer; }
.ad__link:hover { color: #181818; text-decoration: underline; text-decoration-thickness: 1px; text-underline-position: from-font; text-decoration-skip-ink: none; }
.ad__footer { display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 32px; }
.ad-btn { display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 6px 10px; border: none; border-radius: 12px; cursor: pointer; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; transition: background 0.1s; }
.ad-btn--subtle { background: transparent; color: #242424; }
.ad-btn--subtle:hover { background: rgba(36,36,36,0.04); }
.ad-btn--primary { background: #242424; color: #fff; }
.ad-btn--primary:hover { background: #2b2b2b; }
`;

// ─── JS interactions ────────────────────────────────────────

const zsLists = zsCategories.map(function (c) {
  let rows = '';
  c.prompts.forEach(function (p, i) {
    const last = i === c.prompts.length - 1;
    rows += '<div class="zs__row' + (last ? ' zs__row--last' : '') + '"><div class="zs__item"><span class="zs__label">' + p + '</span></div></div>';
  });
  return '<div class="zs__list-rows">' + rows + '</div>';
});

// Per-source prompt lists keyed by source name, so when the user connects a
// source through the auth flow the pill can swap to that source's prompts.
const srcPromptLists: Record<string, string> = {};
Object.keys(SRC_PROMPTS).forEach(function (name) {
  let rows = '';
  sourcePrompts(name).forEach(function (p, i) { const last = i === sourcePrompts(name).length - 1; rows += '<div class="zs__row' + (last ? ' zs__row--last' : '') + '"><div class="zs__item"><span class="zs__label">' + p + '</span></div></div>'; });
  srcPromptLists[name] = '<div class="zs__list-rows">' + rows + '</div>';
});

const js = [
  '<script>',
  '(function(){',
  "  var __scrollHideTimers = new WeakMap();",
  "  document.addEventListener('scroll', function(e){ var el = e.target; if (el && el.nodeType === 1 && el.classList){ el.classList.add('is-scrolling'); var t = __scrollHideTimers.get(el); if (t) clearTimeout(t); __scrollHideTimers.set(el, setTimeout(function(){ el.classList.remove('is-scrolling'); }, 800)); } }, true);",
  '  var zsLists = ' + JSON.stringify(zsLists) + ';',
  '  var SRC_PROMPT_LISTS = ' + JSON.stringify(srcPromptLists) + ';',
  '  var SRC_PROMPTS_RAW = ' + JSON.stringify(SRC_PROMPTS) + ';',
  '  var MS_LOGO = ' + JSON.stringify(MS_LOGO) + ';',
  "  var nav = document.getElementById('nav');",
  "  var toggle = document.getElementById('navToggle');",
  "  if (toggle) toggle.addEventListener('click', function(){ nav.classList.toggle('nav--collapsed'); });",
  "  var cmp = document.getElementById('cmp'); var ta = document.getElementById('cmpTa');",
  "  function syncSend(){ if (!cmp) return; var wrap = document.getElementById('cmpAttach'); var hasText = ta && ta.value.trim().length > 0; var hasAttach = wrap && wrap.children.length > 0; cmp.classList.toggle('ci--has-text', hasText || hasAttach); }",
  "  if (ta) ta.addEventListener('input', syncSend);",
  "  var RESP_HTML = " + JSON.stringify('<div class="resp" id="respBlk">' + responseBlocksHtml() + '</div>') + ";",
  "  var THINK_HTML = " + JSON.stringify('<div class="think"><span class="think__mark">' + ico('copilot-20-regular') + '</span><span class="think__label">Thinking</span></div>') + ";",
  "  var U_OPEN = " + JSON.stringify('<div class="umsg"><div class="umsg__bubble">') + ";",
  "  var U_CLOSE = " + JSON.stringify('</div></div><div class="cwrap"></div>') + ";",
  "  var shellEl = document.querySelector('.shell'); var thread = document.getElementById('thread'); var sendBtn = document.getElementById('cmpSend');",
  "  function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }",
  "  var respTimer = null;",
  "  function bindResp(){ var cotBar = document.getElementById('cotBar'); if (cotBar && !cotBar.__b){ cotBar.__b = 1; cotBar.addEventListener('click', function(){ var open = shellEl.classList.toggle('shell--sp-open'); cotBar.setAttribute('aria-expanded', open ? 'true' : 'false'); }); } document.querySelectorAll('.rfoot__btn--toggle').forEach(function(b){ if (b.__b) return; b.__b = 1; b.addEventListener('click', function(){ var was = b.classList.contains('is-on'); if (b.id === 'rfLike'){ var d = document.getElementById('rfDislike'); if (d) d.classList.remove('is-on'); } if (b.id === 'rfDislike'){ var l = document.getElementById('rfLike'); if (l) l.classList.remove('is-on'); } b.classList.toggle('is-on', !was); }); }); bindRefs(); }",
  "  var refsPop = document.getElementById('refsPop'); var refsHideT = null; var refsPinned = false;",
  "  function placeRefs(anchor){ if (!refsPop) return; refsPop.classList.add('is-open'); var a = anchor.getBoundingClientRect(); var w = refsPop.offsetWidth, h = refsPop.offsetHeight; var left = Math.min(Math.max(8, a.left), window.innerWidth - w - 8); var top = a.top - h - 8; if (top < 8) top = a.bottom + 8; refsPop.style.left = left + 'px'; refsPop.style.top = top + 'px'; }",
  "  function hideRefs(){ if (refsPinned || !refsPop) return; refsPop.classList.remove('is-open'); }",
  "  function scheduleHideRefs(){ if (refsHideT) clearTimeout(refsHideT); refsHideT = setTimeout(hideRefs, 140); }",
  "  if (refsPop){ refsPop.addEventListener('mouseenter', function(){ if (refsHideT) clearTimeout(refsHideT); }); refsPop.addEventListener('mouseleave', scheduleHideRefs); }",
  "  function bindRefs(){ document.querySelectorAll('.resp .cite, .resp .resp__link').forEach(function(c){ if (c.__b) return; c.__b = 1; c.addEventListener('mouseenter', function(){ if (refsPinned) return; if (refsHideT) clearTimeout(refsHideT); placeRefs(c); }); c.addEventListener('mouseleave', scheduleHideRefs); }); var refsBtn = document.getElementById('rfRefs'); if (refsBtn && !refsBtn.__b){ refsBtn.__b = 1; refsBtn.addEventListener('click', function(e){ e.stopPropagation(); refsPinned = !refsPinned; if (refsPinned){ placeRefs(refsBtn); } else if (refsPop){ refsPop.classList.remove('is-open'); } }); } }",
  "  document.addEventListener('click', function(e){ if (refsPinned && refsPop && !refsPop.contains(e.target) && !(e.target.closest && e.target.closest('#rfRefs'))){ refsPinned = false; refsPop.classList.remove('is-open'); } });",
  "  function sendMessage(){ if (!ta || !thread) return; var text = ta.value.trim(); if (!text) return; shellEl.classList.add('shell--convo'); thread.innerHTML = U_OPEN + escapeHtml(text) + U_CLOSE; var cw = thread.querySelector('.cwrap'); if (cw) cw.innerHTML = THINK_HTML; ta.value = ''; if (cmp) cmp.classList.remove('ci--has-text'); thread.scrollTop = thread.scrollHeight; shellEl.classList.add('shell--sp-open'); if (respTimer) clearTimeout(respTimer); respTimer = setTimeout(function(){ var w = thread.querySelector('.cwrap'); if (w){ w.innerHTML = RESP_HTML; var r = document.getElementById('respBlk'); requestAnimationFrame(function(){ if (r) r.classList.add('is-in'); }); bindResp(); } thread.scrollTop = thread.scrollHeight; }, 1500); }",
  "  if (sendBtn) sendBtn.addEventListener('click', sendMessage);",
  "  if (ta) ta.addEventListener('keydown', function(e){ if (e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(); } });",
  "  var spClose = document.getElementById('spClose'); if (spClose) spClose.addEventListener('click', function(){ shellEl.classList.remove('shell--sp-open'); var cb = document.getElementById('cotBar'); if (cb) cb.setAttribute('aria-expanded','false'); });",
  "  document.querySelectorAll('#spPanel .cot-step').forEach(function(s){ s.addEventListener('click', function(){ s.classList.toggle('cot-step--open'); }); });",
  "  var addBtn = document.getElementById('addBtn');",
  "  if (addBtn) addBtn.addEventListener('click', function(e){ e.stopPropagation(); var open = cmp.classList.toggle('is-am-open'); addBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); });",
  "  document.querySelectorAll('#addMenu .addm__item').forEach(function(it){ it.addEventListener('click', function(){ cmp.classList.remove('is-am-open'); if (addBtn) addBtn.setAttribute('aria-expanded','false'); }); });",
  "  var CIQ_TABS = " + JSON.stringify(CIQ_TABS) + ";",
  "  var CIQ_MTABS = " + JSON.stringify(CIQ_MTABS) + ";",
  "  var CIQ_CHEV = " + JSON.stringify(ico('chevron-right-20-regular')) + ";",
  "  var ciqMenu = document.getElementById('ciqMenu'); var ciqTabs = document.getElementById('ciqTabs'); var ciqList = document.getElementById('ciqList'); var zsEl = document.querySelector('.zs'); var ciqSlash = false;",
  "  var ciqmOv = document.getElementById('ciqmOverlay'); var ciqmTabs = document.getElementById('ciqmTabs'); var ciqmList = document.getElementById('ciqmList'); var ciqmSearch = document.getElementById('ciqmSearch'); var ciqmTab = 'all';",
  "  function ciqRowHtml(r){ var trail = r.chev ? ('<span class=\"ciq__trail\">' + r.sub + '</span><span class=\"ciq__chev\">' + CIQ_CHEV + '</span>') : ('<span class=\"ciq__trail\">' + r.sub + '</span>'); var body = r.kind === 'skill' ? '<span class=\"ciq__cbody\"><span class=\"ciq__title\">' + r.title + '</span><span class=\"ciq__desc\">' + r.sub + '</span></span>' : '<span class=\"ciq__crow\"><span class=\"ciq__label\">' + r.title + '</span>' + trail + '</span>'; return '<button class=\"ciq__item\"><span class=\"ciq__ico\">' + r.icon + '</span>' + body + '</button>'; }",
  "  function ciqSkillRows(){ var out = []; if (typeof SRC === 'undefined' || !SRC) return out; SRC.forEach(function(s){ if (s.state !== 'on' && s.state !== 'chevron') return; var sk = (typeof SRC_SKILLS !== 'undefined' && SRC_SKILLS[s.n]) || []; sk.forEach(function(k){ out.push({ icon: s.stgLogo, title: '/' + k.name, sub: k.desc, kind: 'skill' }); }); }); return out; }",
  "  function ciqRender(data, id, tabsEl, listEl, q){ if (!listEl || !tabsEl) return id; var tb = null; for (var i=0;i<data.length;i++){ if (data[i].id===id) tb=data[i]; } if (!tb) tb = data[0]; tabsEl.innerHTML = data.map(function(x){ return '<button class=\"ciq__tab' + (x.id===tb.id?' ciq__tab--sel':'') + '\" data-tab=\"' + x.id + '\">' + x.label + '</button>'; }).join(''); var rows = tb.rows; if (tb.id === 'skills') rows = ciqSkillRows(); else if (tb.id === 'all') { var _sk = ciqSkillRows(); rows = (_sk.length ? [_sk[0]] : []).concat(tb.rows.filter(function(r){ return r.kind !== 'skill'; })); } if (q){ var ql = q.toLowerCase(); rows = rows.filter(function(r){ return (r.title + ' ' + r.sub).toLowerCase().indexOf(ql) !== -1; }); } listEl.innerHTML = rows.length ? rows.map(ciqRowHtml).join('') : '<div class=\"ciqm__empty\">No results.</div>'; listEl.querySelectorAll('.ciq__item').forEach(function(it, i){ it.addEventListener('click', function(){ ciqAttach(rows[i]); }); }); return tb.id; }",
  "  function openCiq(id){ if (!ciqMenu) return; ciqRender(CIQ_TABS, id || 'all', ciqTabs, ciqList); ciqMenu.hidden = false; if (zsEl) zsEl.classList.add('ciq-open'); }",
  "  function closeCiq(){ if (!ciqMenu) return; ciqMenu.hidden = true; ciqSlash = false; if (zsEl) zsEl.classList.remove('ciq-open'); }",
  "  if (ciqTabs) ciqTabs.addEventListener('click', function(e){ var t = e.target.closest('.ciq__tab'); if (t) ciqRender(CIQ_TABS, t.getAttribute('data-tab'), ciqTabs, ciqList); });",
  "  function ciqmPaint(){ ciqmTab = ciqRender(CIQ_MTABS, ciqmTab, ciqmTabs, ciqmList, ciqmSearch ? ciqmSearch.value.trim() : ''); }",
  "  if (ciqmTabs) ciqmTabs.addEventListener('click', function(e){ var t = e.target.closest('.ciq__tab'); if (t){ ciqmTab = t.getAttribute('data-tab'); ciqmPaint(); } });",
  "  function openCiqModal(){ if (!ciqmOv) return; ciqmTab = 'all'; if (ciqmSearch) ciqmSearch.value = ''; ciqmPaint(); ciqmOv.classList.add('is-open'); if (ciqmSearch) setTimeout(function(){ ciqmSearch.focus(); }, 20); }",
  "  function closeCiqModal(){ if (ciqmOv) ciqmOv.classList.remove('is-open'); }",
  "  if (ciqmSearch) ciqmSearch.addEventListener('input', ciqmPaint);",
  "  var ciqmClose = document.getElementById('ciqmClose'); if (ciqmClose) ciqmClose.addEventListener('click', closeCiqModal);",
  "  if (ciqmOv) ciqmOv.addEventListener('click', function(e){ if (e.target === ciqmOv) closeCiqModal(); });",
  "  function ciqAttach(r){ var wrap = document.getElementById('cmpAttach'); if (wrap){ var key = r.title; if (!wrap.querySelector('[data-ciq=\"' + key + '\"]')){ var el = document.createElement('div'); el.className = 'cmp-attach'; el.setAttribute('data-ciq', key); el.setAttribute('title', r.title); el.innerHTML = '<span class=\"cmp-attach__ico\">' + r.icon + '</span><span class=\"cmp-attach__meta\"><span class=\"cmp-attach__name\">' + r.title + '</span><span class=\"cmp-attach__desc\">' + r.sub + '</span></span><button class=\"cmp-attach__x\" aria-label=\"Remove\">' + X12_SVG + '</button>'; el.querySelector('.cmp-attach__x').addEventListener('click', function(e){ e.stopPropagation(); el.remove(); syncSend(); }); wrap.appendChild(el); } } closeCiq(); closeCiqModal(); syncSend(); if (ta) ta.focus(); }",
  "  var addContentBtn = document.getElementById('addContentBtn'); if (addContentBtn) addContentBtn.addEventListener('click', function(e){ e.stopPropagation(); if (cmp) cmp.classList.remove('is-am-open'); if (addBtn) addBtn.setAttribute('aria-expanded','false'); openCiqModal(); });",
  "  if (ta) ta.addEventListener('input', function(){ if (/(^|\\s)\\/[a-z-]*$/i.test(ta.value)) { ciqSlash = true; openCiq('skills'); } else if (ciqSlash && ta.value.indexOf('/') === -1) { closeCiq(); } });",
  "  document.addEventListener('click', function(e){ if (ciqMenu && !ciqMenu.hidden && !ciqMenu.contains(e.target) && cmp && !cmp.contains(e.target) && !(e.target.closest && e.target.closest('#addContentBtn'))) closeCiq(); });",
  "  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') { closeCiq(); closeCiqModal(); } });",
  "  var srcOv = document.getElementById('srcOverlay'); var changeDs = document.getElementById('changeDsBtn'); var srcClose = document.getElementById('srcClose');",
  "  if (changeDs && srcOv) changeDs.addEventListener('click', function(e){ e.stopPropagation(); if (typeof closeSrcSkills === 'function') closeSrcSkills(); srcOv.classList.add('is-open'); requestAnimationFrame(srcFill); });",
  "  if (srcClose) srcClose.addEventListener('click', function(){ srcOv.classList.remove('is-open'); if (typeof closeSrcSkills === 'function') closeSrcSkills(); });",
  "  var srcManage = document.getElementById('srcManage'); var stgOv = document.getElementById('stgOverlay'); var stgClose = document.getElementById('stgClose');",
  "  if (srcManage && stgOv) srcManage.addEventListener('click', function(){ srcOv.classList.remove('is-open'); stgOv.classList.add('is-open'); });",
  "  if (stgClose) stgClose.addEventListener('click', function(){ stgOv.classList.remove('is-open'); closeStgDetail(); });",
  "  if (stgOv) stgOv.addEventListener('click', function(e){ if (e.target === stgOv) { stgOv.classList.remove('is-open'); closeStgDetail(); } });",
  "  var stgSearch = document.getElementById('stgSearch'); var stgList = document.getElementById('stgList'); var stgEmpty = document.getElementById('stgEmpty'); var stgQuery = ''; var STG_CHEV = " + JSON.stringify(ico('chevron-right-20-regular')) + ";",
  "  var STGD_MORE = " + JSON.stringify(ico('more-horizontal-20-regular')) + "; var STGD_SYNC = " + JSON.stringify(ico('arrow-sync-20-regular')) + "; var STGD_OPEN = " + JSON.stringify(ico('open-20-regular')) + ";",
  "  var SK_MENU = " + JSON.stringify(ico('more-vertical-20-regular')) + "; var SK_TRY = " + JSON.stringify(ico('chat-sparkle-20-regular')) + "; var SK_SHARE = " + JSON.stringify(ico('share-20-regular')) + "; var SK_INFO = " + JSON.stringify(ico('info-20-regular')) + "; var SK_CHAT = " + JSON.stringify(ico('chat-sparkle-20-regular')) + ";",
  "  var SRC_DETAIL = " + JSON.stringify(SRC_DETAIL) + ";",
  "  var stg = stgOv ? stgOv.querySelector('.stg') : null; var stgBack = document.getElementById('stgBack'); var stgMain = document.getElementById('stgMain'); var stgDetail = document.getElementById('stgDetail'); var currentStgName = ''; var stgSkillReturn = null;",
  "  function stgdRow(label, valueHtml){ return '<div class=\"stgd__row\"><span class=\"stgd__label\">' + label + '</span>' + valueHtml + '</div>'; }",
  "  function closeStgDetail(){ stgSkillReturn = null; if (stgMain) stgMain.hidden = false; if (stgDetail){ stgDetail.hidden = true; stgDetail.innerHTML = ''; } if (stg) stg.classList.remove('is-detail'); }",
  "  function skillInstr(source, s){ return { about: s.desc, purpose: 'The /' + s.name + ' skill turns your ' + source + ' data into a ready-to-use result. It searches the relevant records, grounds everything it produces in what it finds, and cites the sources it used so you can verify the output before you act on it.', best: ['Ask Copilot to run /' + s.name + ' directly from a ' + source + ' conversation', 'Kick it off from a related ' + source + ' item, thread, or page', 'Chain it after a search so Copilot acts on exactly what it finds', 'Schedule it as a recurring digest, standup, or status update', 'Hand it to a teammate as a repeatable, shareable workflow', 'Combine it with other skills to build a multi-step routine'], setup: ['Connect ' + source + ' and sign in with an account that has access', 'Grant Copilot read access to the ' + source + ' data this skill needs', 'Choose the scope — which projects, channels, spaces, or folders to include', 'Set any filters, time windows, or thresholds the skill should respect', 'Pick a cadence: on demand, scheduled, or triggered by an event', 'Invoke it any time by typing /' + s.name + ' in the prompt box'] }; }",
  "  function openSkillDetail(source, s){ if (!stgDetail) return; var instr = skillInstr(source, s); var best = instr.best.map(function(b){ return '<li>' + b + '</li>'; }).join(''); var setup = instr.setup.map(function(b){ return '<li>' + b + '</li>'; }).join(''); var html = '<div class=\"stgd__skhead\"><span class=\"stgd__skhico\">' + SKILL_ICON + '</span><div class=\"stgd__skhmeta\"><span class=\"stgd__skhname\">/' + s.name + '</span><span class=\"stgd__skhsub\">Created by ' + source + '</span></div><div class=\"stgd__skhact\"><button class=\"stgd__skhchat\" id=\"skdChat\" aria-label=\"Add to chat\">' + SK_CHAT + '</button></div></div><div class=\"stgd__skabout\"><span class=\"stgd__skl\">About</span><p class=\"stgd__skabouttxt\" id=\"skdAbout\">' + instr.about + '</p><button class=\"stgd__skmore2\" id=\"skdAboutMore\" hidden><span class=\"stgd__skmore2t\">Show more</span></button></div><div class=\"stgd__skinstr\"><span class=\"stgd__skl\">Instructions</span><div class=\"stgd__instr\"><div class=\"stgd__instrsec\"><div class=\"stgd__instrh\">Purpose</div><p class=\"stgd__instrp\">' + instr.purpose + '</p></div><div class=\"stgd__instrsec\"><div class=\"stgd__instrh\">Best uses</div><ul class=\"stgd__instrul\">' + best + '</ul></div><div class=\"stgd__instrsec\"><div class=\"stgd__instrh\">Skill set up</div><ul class=\"stgd__instrul\">' + setup + '</ul></div></div></div>'; stgDetail.innerHTML = html; if (stgMain) stgMain.hidden = true; stgDetail.hidden = false; if (stg) stg.classList.add('is-detail'); stgSkillReturn = source; var sc = document.querySelector('.stg__content'); if (sc) sc.scrollTop = 0; var chatBtn = document.getElementById('skdChat'); if (chatBtn) chatBtn.addEventListener('click', function(){ if (stgOv) stgOv.classList.remove('is-open'); if (srcOv) srcOv.classList.remove('is-open'); addSkillAttach(source, s); }); var abT = document.getElementById('skdAbout'); var abM = document.getElementById('skdAboutMore'); if (abT && abM){ if (abT.scrollHeight > abT.clientHeight + 1) abM.hidden = false; abM.addEventListener('click', function(){ var op = abT.classList.toggle('is-expanded'); var lb = abM.querySelector('.stgd__skmore2t'); if (lb) lb.textContent = op ? 'Show less' : 'Show more'; }); } }",
  "  function openStgDetail(name){ currentStgName = name; var item = SRC.filter(function(x){ return x.n === name; })[0]; if (!item || !stgDetail) return; var d = SRC_DETAIL[name] || {}; var about = d.about || item.desc; var tools = d.tools || ['Search', 'Get details', 'Summarize content', 'List items']; var developer = d.developer || name; var category = (item.cats && item.cats[0]) || 'Productivity'; var chips = tools.map(function(t){ return '<span class=\"stgd__chip\">' + t + '</span>'; }).join(''); var html = '<div class=\"stgd__id\"><span class=\"stgd__logo\">' + item.stgLogo + '</span><span class=\"stgd__name\">' + name + '</span><div class=\"stgd__actions\"><button class=\"stgd__disconnect\" id=\"stgdDisconnect\">Disconnect</button><div class=\"stgd__ofl\" id=\"stgdOfl\"><button class=\"stgd__more\" id=\"stgdMoreBtn\" aria-haspopup=\"menu\" aria-expanded=\"false\" aria-label=\"More options\">' + STGD_MORE + '</button><div class=\"stgd__oflmenu\" role=\"menu\"><button class=\"stgd__oflitem\" id=\"stgdReconnect\">' + STGD_SYNC + 'Reconnect</button></div></div></div></div><hr class=\"stgd__rule\"/><div class=\"stgd__sec\"><div class=\"stgd__sech\">About</div><p class=\"stgd__p\">' + about + '</p></div><div class=\"stgd__sec\"><div class=\"stgd__sech\">Tools</div><div class=\"stgd__chips\">' + chips + '</div></div>' + (function(){ var _sk = SRC_SKILLS[name] || []; if (!_sk.length) return ''; function _skc(s){ return '<div class=\"stgd__skill\" data-skill=\"' + s.name + '\"><span class=\"stgd__skico\">' + SKILL_ICON + '</span><span class=\"stgd__skmeta\"><span class=\"stgd__skname\">/' + s.name + '</span><span class=\"stgd__skdesc\">' + s.desc + '</span></span><div class=\"stgd__skofl\"><button class=\"stgd__skmenu\" aria-haspopup=\"menu\" aria-expanded=\"false\" aria-label=\"Skill options\">' + SK_MENU + '</button><div class=\"stgd__skoflmenu\" role=\"menu\"><button class=\"stgd__oflitem\" data-act=\"try\">' + SK_TRY + 'Try in Copilot</button><button class=\"stgd__oflitem\" data-act=\"view\">' + SK_INFO + 'View details</button></div></div></div>'; } var _rest = _sk.slice(3).map(_skc).join(''); return '<div class=\"stgd__sec\"><div class=\"stgd__sech\">Skills</div><div class=\"stgd__skills\">' + _sk.slice(0,3).map(_skc).join('') + '<div class=\"stgd__skmore\" hidden>' + _rest + '</div>' + (_rest ? '<button class=\"stgd__showmore\" type=\"button\">Show more</button>' : '') + '</div></div>'; })() + '<div class=\"stgd__sec\"><div class=\"stgd__sech\">Details</div><div class=\"stgd__meta\">' + stgdRow('Connected on', '<span class=\"stgd__value\">' + (d.connectedOn || 'May 14, 2026') + '</span>') + stgdRow('Account', '<span class=\"stgd__value\">elvia.atkins@contoso.com</span>') + stgdRow('Category', '<span class=\"stgd__value\">' + category + '</span>') + stgdRow('Developer', '<a class=\"stgd__link\" href=\"#\" onclick=\"return false\">' + developer + ' ' + STGD_OPEN + '</a>') + stgdRow('More info', '<a class=\"stgd__link\" href=\"#\" onclick=\"return false\">Privacy Policy ' + STGD_OPEN + '</a>') + '</div></div>'; stgDetail.innerHTML = html; if (stgMain) stgMain.hidden = true; stgDetail.hidden = false; if (stg) stg.classList.add('is-detail'); var sc = document.querySelector('.stg__content'); if (sc) sc.scrollTop = 0; var mb = document.getElementById('stgdMoreBtn'); var ofl = document.getElementById('stgdOfl'); if (mb && ofl){ mb.addEventListener('click', function(e){ e.stopPropagation(); var o = ofl.classList.toggle('is-open'); mb.setAttribute('aria-expanded', o); }); ofl.querySelector('.stgd__oflmenu').addEventListener('click', function(e){ e.stopPropagation(); ofl.classList.remove('is-open'); mb.setAttribute('aria-expanded', false); }); } var dc = document.getElementById('stgdDisconnect'); if (dc) dc.addEventListener('click', function(){ item.state = 'connect'; ocSet(ocSlug(item.n), 'connect'); stgPaint(); srcPaint(); updateSrcCount(); closeStgDetail(); }); }",
  "  if (stgBack) stgBack.addEventListener('click', function(){ if (stgSkillReturn){ var s = stgSkillReturn; stgSkillReturn = null; openStgDetail(s); } else { closeStgDetail(); } });",
  "  if (stgDetail) stgDetail.addEventListener('click', function(e){ var mb = e.target.closest('.stgd__skmenu'); if (mb){ e.stopPropagation(); var ofl = mb.closest('.stgd__skofl'); var wasOpen = ofl.classList.contains('is-open'); stgDetail.querySelectorAll('.stgd__skofl.is-open').forEach(function(o){ o.classList.remove('is-open'); }); if (!wasOpen){ ofl.classList.add('is-open'); mb.setAttribute('aria-expanded', 'true'); } else { mb.setAttribute('aria-expanded', 'false'); } return; } var act = e.target.closest('.stgd__oflitem[data-act]'); if (act && act.closest('.stgd__skill')){ e.stopPropagation(); var card = act.closest('.stgd__skill'); var skn = card.getAttribute('data-skill'); var a = act.getAttribute('data-act'); stgDetail.querySelectorAll('.stgd__skofl.is-open').forEach(function(o){ o.classList.remove('is-open'); }); var sk = (SRC_SKILLS[currentStgName] || []).filter(function(x){ return x.name === skn; })[0]; if (!sk) return; if (a === 'try'){ if (stgOv) stgOv.classList.remove('is-open'); if (srcOv) srcOv.classList.remove('is-open'); addSkillAttach(currentStgName, sk); } else if (a === 'view'){ openSkillDetail(currentStgName, sk); } return; } var sm = e.target.closest('.stgd__showmore'); if (sm){ var wrap = sm.closest('.stgd__skills'); var more = wrap ? wrap.querySelector('.stgd__skmore') : null; if (more) more.hidden = false; sm.remove(); } });",
  "  document.addEventListener('click', function(){ var o = document.getElementById('stgdOfl'); if (o) o.classList.remove('is-open'); if (stgDetail) stgDetail.querySelectorAll('.stgd__skofl.is-open').forEach(function(x){ x.classList.remove('is-open'); }); });",
  "  function stgRowHtml(item){ var isConnect = item.state === 'connect'; var trailing = isConnect ? '<button class=\"stg__connect\">Connect</button>' : '<span class=\"stg__chev\">' + STG_CHEV + '</span>'; var tag = isConnect ? 'div' : 'button'; return '<' + tag + ' class=\"stg__row\" data-name=\"' + item.n + '\"><span class=\"stg__rowicon\">' + item.stgLogo + '</span><span class=\"stg__rowmeta\"><span class=\"stg__rowname\">' + item.n + '</span><span class=\"stg__rowsub\">' + item.desc + '</span></span>' + trailing + '</' + tag + '>'; }",
  "  function stgPaint(){ if (!stgList) return; var q = stgQuery.trim().toLowerCase(); var list = SRC.filter(function(x){ var catOk = stgCat === 'All' || (stgCat === 'Recommended' ? x.rec : (x.cats || []).indexOf(stgCat) !== -1); return catOk && (!q || (x.n + ' ' + x.desc).toLowerCase().indexOf(q) !== -1); }).sort(srcCmp); stgList.innerHTML = list.map(stgRowHtml).join(''); if (stgEmpty) stgEmpty.hidden = !(q && list.length === 0); }",
  "  var stgFlt = document.getElementById('stgFlt'); var stgFilterBtn = document.getElementById('stgFilterBtn'); var stgFilterLabel = document.getElementById('stgFilterLabel'); var stgCat = 'All';",
  "  if (stgFilterBtn) stgFilterBtn.addEventListener('click', function(e){ e.stopPropagation(); var open = stgFlt.classList.toggle('is-open'); stgFilterBtn.setAttribute('aria-expanded', open); });",
  "  if (stgFlt) stgFlt.querySelector('.stg__fmenu').addEventListener('click', function(e){ e.stopPropagation(); });",
  "  if (stgFlt) stgFlt.querySelectorAll('.stg__fitem').forEach(function(it){ it.addEventListener('click', function(){ stgCat = it.getAttribute('data-cat'); stgFlt.querySelectorAll('.stg__fitem').forEach(function(x){ x.classList.remove('stg__fitem--sel'); }); it.classList.add('stg__fitem--sel'); if (stgFilterLabel) stgFilterLabel.textContent = stgCat === 'All' ? 'Filter by' : stgCat; stgFlt.classList.remove('is-open'); stgFilterBtn.setAttribute('aria-expanded', false); stgPaint(); }); });",
  "  document.addEventListener('click', function(){ if (stgFlt) { stgFlt.classList.remove('is-open'); if (stgFilterBtn) stgFilterBtn.setAttribute('aria-expanded', false); } });",
  "  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && stgFlt && stgFlt.classList.contains('is-open')) { stgFlt.classList.remove('is-open'); if (stgFilterBtn) { stgFilterBtn.setAttribute('aria-expanded', false); stgFilterBtn.focus(); } } });",
  "  window.addEventListener('scroll', function(){ if (stgFlt && stgFlt.classList.contains('is-open')) { stgFlt.classList.remove('is-open'); if (stgFilterBtn) stgFilterBtn.setAttribute('aria-expanded', false); } }, true);",
  "  if (stgSearch) stgSearch.addEventListener('input', function(){ stgQuery = this.value; stgPaint(); });",
  "  if (stgList) stgList.addEventListener('click', function(e){ var b = e.target.closest('.stg__connect'); if (b){ var crow = b.closest('.stg__row'); var cname = crow.getAttribute('data-name'); var citem = SRC.filter(function(x){ return x.n === cname; })[0]; openAuth(cname, citem ? citem.logoSrc : ''); return; } var row = e.target.closest('.stg__row'); if (row && row.tagName === 'BUTTON'){ openStgDetail(row.getAttribute('data-name')); } });",
  "  var adOv = document.getElementById('adOverlay'); var adTitle = document.getElementById('adTitle'); var adSubtitle = document.getElementById('adSubtitle'); var adPartner = document.getElementById('adPartner'); var adBody = document.getElementById('adBody'); var adContinue = document.getElementById('adContinue'); var adCancel = document.getElementById('adCancel'); var adName = null; var adReturn = null;",
  "  function openAuth(name, logoSrc){ adName = name; adReturn = (srcOv && srcOv.classList.contains('is-open')) ? srcOv : ((stgOv && stgOv.classList.contains('is-open')) ? stgOv : null); if (adReturn) adReturn.classList.remove('is-open'); if (adTitle) adTitle.textContent = 'Connect ' + name; if (adSubtitle) adSubtitle.textContent = 'Developed by ' + name; if (adPartner) adPartner.innerHTML = logoSrc ? '<img src=\"' + logoSrc + '\" alt=\"\"/>' : ''; if (adBody) adBody.textContent = 'Let Copilot securely read your content from ' + name + '.'; if (adContinue) adContinue.textContent = 'Continue to ' + name; if (adOv) adOv.classList.add('is-open'); }",
  "  function closeAuth(){ if (adOv) adOv.classList.remove('is-open'); if (adReturn) adReturn.classList.add('is-open'); adReturn = null; adName = null; }",
  "  if (adCancel) adCancel.addEventListener('click', closeAuth);",
  "  if (adOv) adOv.addEventListener('click', function(e){ if (e.target === adOv) closeAuth(); });",
  "  if (adContinue) adContinue.addEventListener('click', function(){ var connectedName = adName; var ret = adReturn; if (adName){ var item = SRC.filter(function(x){ return x.n === adName; })[0]; if (item) item.state = 'on'; ocSet(ocSlug(adName), 'on'); setLastConnected(adName, item ? item.logoSrc : ''); srcPaint(); stgPaint(); updateSrcCount(); ensureSourceTab(adName); } closeAuth(); if (connectedName && ret) { setTimeout(function(){ var rows = ret.querySelectorAll('[data-name]'); var row = null; for (var i = 0; i < rows.length; i++){ if (rows[i].getAttribute('data-name') === connectedName){ row = rows[i]; break; } } if (!row) return; var sc = row.parentElement; while (sc && sc !== ret){ var oy = getComputedStyle(sc).overflowY; if ((oy === 'auto' || oy === 'scroll') && sc.scrollHeight > sc.clientHeight + 1) break; sc = sc.parentElement; } if (sc && sc !== ret){ var scR = sc.getBoundingClientRect(); var rR = row.getBoundingClientRect(); sc.scrollTop += (rR.top - scR.top) - (sc.clientHeight - rR.height) / 2; } else if (row.scrollIntoView){ row.scrollIntoView({ block: 'center' }); } row.classList.add('src-justconnected'); (function(el){ setTimeout(function(){ el.classList.remove('src-justconnected'); }, 1500); })(row); }, 80); } });",
  "  if (srcOv) srcOv.addEventListener('click', function(e){ if (e.target === srcOv) srcOv.classList.remove('is-open'); });",
  "  var SRC = " + JSON.stringify(SRC_MODEL) + ";",
  "  function ocSlug(x){ return String(x).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }",
  "  function ocLoad(){ try{ return JSON.parse(localStorage.getItem('oc-connectors')||'{}'); }catch(e){ return {}; } }",
  "  function ocSet(s, st){ var m=ocLoad(); if(m[s]===st) return; m[s]=st; try{ localStorage.setItem('oc-connectors', JSON.stringify(m)); }catch(e){} }",
  "  function ocApplyChat(paint){ var m=ocLoad(); var changed=false; SRC.forEach(function(x){ var st=m[ocSlug(x.n)]; if(!st) return; if(st==='on' && x.state!=='on'){ x.state='on'; changed=true; } else if(st==='connect' && x.state!=='connect'){ x.state='connect'; changed=true; } }); if(changed && paint){ if(typeof srcPaint==='function') srcPaint(); if(typeof stgPaint==='function') stgPaint(); if(typeof updateSrcCount==='function') updateSrcCount(); if(typeof ciqRefresh==='function') ciqRefresh(); } }",
  "  ocApplyChat(false);",
  "  function ciqRefresh(){ try { if (typeof ciqmOv!=='undefined' && ciqmOv && ciqmOv.classList.contains('is-open') && typeof ciqmPaint==='function') ciqmPaint(); if (typeof ciqMenu!=='undefined' && ciqMenu && !ciqMenu.hidden){ var _ct = ciqTabs && ciqTabs.querySelector('.ciq__tab--sel'); ciqRender(CIQ_TABS, _ct ? _ct.getAttribute('data-tab') : 'all', ciqTabs, ciqList); } } catch(e){} }",
  "  window.addEventListener('storage', function(e){ if(e.key==='oc-connectors') ocApplyChat(true); });",
  "  var srcList = document.getElementById('srcList');",
  "  var srcCount = document.getElementById('srcCount'); var srcTurnOff = document.getElementById('srcTurnOff'); var srcSearch = document.getElementById('srcSearch');",
  "  var srcQuery = ''; var srcShown = 6; var srcTimer = null;",
  "  var SRC_SKILLS = " + JSON.stringify(SRC_SKILLS) + "; var SKILL_ICON = " + JSON.stringify(SKILL_ICON) + ";",
  "  function srcHasSkills(name){ return !!(SRC_SKILLS[name] && SRC_SKILLS[name].length); }",
  "  function srcTrailing(item){ if (item.state === 'connect') return '<button class=\"srcm__connect\">Connect</button>'; var chev = srcHasSkills(item.n) ? '<button class=\"srcm__chev\" aria-label=\"View skills for ' + item.n + '\">' + STG_CHEV + '</button>' : ''; if (item.state === 'chevron') return chev; return '<span class=\"srcm__tgl srcm__tgl--' + item.state + '\" role=\"switch\" aria-checked=\"' + (item.state === 'on') + '\" tabindex=\"0\"><span class=\"srcm__thumb\"></span></span>' + chev; }",
  "  function srcRowHtml(item){ var meta = item.meta ? '<span class=\"srcm__meta\">' + item.meta + '</span>' : ''; return '<div class=\"srcm__row\" data-name=\"' + item.n + '\"><div class=\"srcm__inner\">' + item.logo + '<span class=\"srcm__label\">' + item.n + '</span>' + meta + srcTrailing(item) + '</div></div>'; }",
  "  var srcMainView = document.getElementById('srcMainView'); var srcSkillsView = document.getElementById('srcSkillsView'); var srcSkList = document.getElementById('srcSkList'); var srcSkName = document.getElementById('srcSkName'); var srcSkBack = document.getElementById('srcSkBack');",
  "  function openSrcSkills(name){ var skills = SRC_SKILLS[name] || []; if (!skills.length || !srcSkList) return; if (srcSkName) srcSkName.textContent = name; srcSkList.innerHTML = skills.map(function(s){ return '<div class=\"srcm__skill\" data-skill=\"' + s.name + '\"><span class=\"srcm__skico\">' + SKILL_ICON + '</span><span class=\"srcm__skmeta\"><span class=\"srcm__skname\">/' + s.name + '</span><span class=\"srcm__skdesc\">' + s.desc + '</span></span></div>'; }).join(''); srcSkList.querySelectorAll('.srcm__skill').forEach(function(row, i){ row.addEventListener('click', function(){ addSkillAttach(name, skills[i]); }); }); if (srcMainView) srcMainView.hidden = true; if (srcSkillsView) srcSkillsView.hidden = false; }",
  "  var X12_SVG = '<svg viewBox=\"0 0 12 12\" width=\"12\" height=\"12\" fill=\"none\"><path d=\"M3 3l6 6M9 3l-6 6\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/></svg>';",
  "  function addSkillAttach(source, s){ var wrap = document.getElementById('cmpAttach'); if (!wrap) return; if (!wrap.querySelector('[data-skill=\"' + s.name + '\"]')){ var el = document.createElement('div'); el.className = 'cmp-attach'; el.setAttribute('data-skill', s.name); el.setAttribute('title', '/' + s.name); el.innerHTML = '<span class=\"cmp-attach__ico\">' + SKILL_ICON + '</span><span class=\"cmp-attach__meta\"><span class=\"cmp-attach__name\">/' + s.name + '</span><span class=\"cmp-attach__desc\">' + s.desc + '</span></span><button class=\"cmp-attach__x\" aria-label=\"Remove /' + s.name + '\">' + X12_SVG + '</button>'; el.querySelector('.cmp-attach__x').addEventListener('click', function(e){ e.stopPropagation(); el.remove(); syncSend(); }); wrap.appendChild(el); } var srcOv2 = document.getElementById('srcOverlay'); if (srcOv2) srcOv2.classList.remove('is-open'); closeSrcSkills(); syncSend(); var ta2 = document.getElementById('cmpTa'); if (ta2) ta2.focus(); }",
  "  function closeSrcSkills(){ if (srcSkillsView) srcSkillsView.hidden = true; if (srcMainView) srcMainView.hidden = false; }",
  "  if (srcSkBack) srcSkBack.addEventListener('click', closeSrcSkills);",
  "  function updateSrcCount(){ var n = 0, on = 0; SRC.forEach(function(x){ if (x.state === 'on' || x.state === 'chevron') n++; if (x.state === 'on') on++; }); if (srcCount) srcCount.textContent = n === 1 ? '1 source is on' : n + ' sources are on'; if (srcTurnOff) srcTurnOff.disabled = on === 0; }",
  "  function srcBind(){ srcList.querySelectorAll('.srcm__tgl').forEach(function(t){ if (t.__b) return; t.__b = 1; t.addEventListener('click', function(){ var row = t.closest('.srcm__row'); var item = SRC.filter(function(x){ return x.n === row.getAttribute('data-name'); })[0]; var on = t.classList.toggle('srcm__tgl--on'); t.classList.toggle('srcm__tgl--off', !on); t.setAttribute('aria-checked', on); if (item) item.state = on ? 'on' : 'off'; updateSrcCount(); }); }); srcList.querySelectorAll('.srcm__chev').forEach(function(c){ if (c.__b) return; c.__b = 1; c.addEventListener('click', function(e){ e.stopPropagation(); var row = c.closest('.srcm__row'); openSrcSkills(row.getAttribute('data-name')); }); }); srcList.querySelectorAll('.srcm__connect').forEach(function(b){ if (b.__b) return; b.__b = 1; b.addEventListener('click', function(){ var row = b.closest('.srcm__row'); var item = SRC.filter(function(x){ return x.n === row.getAttribute('data-name'); })[0]; openAuth(row.getAttribute('data-name'), item ? item.logoSrc : ''); }); }); }",
  "  function srcRank(x){ return x.n === 'Microsoft 365 apps' ? 0 : (x.state !== 'connect' ? 1 : 2); }",
  "  function srcCmp(a, b){ var ra = srcRank(a), rb = srcRank(b); if (ra !== rb) return ra - rb; var an = a.n.toLowerCase(), bn = b.n.toLowerCase(); return an < bn ? -1 : (an > bn ? 1 : 0); }",
  "  function srcSorted(){ return SRC.slice().sort(srcCmp); }",
  "  function srcPaint(){ if (!srcList) return; srcList.querySelectorAll('.srcm__row').forEach(function(r){ r.remove(); }); var q = srcQuery.trim().toLowerCase(); var sorted = srcSorted(); var items = q ? sorted.filter(function(x){ return x.n.toLowerCase().indexOf(q) !== -1; }) : sorted.slice(0, srcShown); var frag = items.map(srcRowHtml).join(''); srcList.insertAdjacentHTML('beforeend', frag); srcBind(); updateSrcCount(); }",
  "  function srcLoadMore(){ if (srcQuery.trim() || srcShown >= SRC.length || srcTimer) return; srcTimer = setTimeout(function(){ srcTimer = null; srcShown = Math.min(SRC.length, srcShown + 3); srcPaint(); }, 220); }",
  "  function srcFill(){ if (!srcList || srcQuery.trim()) return; var g = 0; while (srcList.clientHeight > 0 && srcList.scrollHeight <= srcList.clientHeight && srcShown < SRC.length && g++ < 50) { srcShown = Math.min(SRC.length, srcShown + 3); srcPaint(); } }",
  "  if (srcList) srcList.addEventListener('scroll', function(){ if (srcList.scrollTop + srcList.clientHeight >= srcList.scrollHeight - 48) srcLoadMore(); });",
  "  if (srcTurnOff) srcTurnOff.addEventListener('click', function(){ SRC.forEach(function(x){ if (x.state === 'on') x.state = 'off'; }); srcPaint(); });",
  "  if (srcSearch) srcSearch.addEventListener('input', function(){ if (srcSkillsView && !srcSkillsView.hidden) closeSrcSkills(); srcQuery = this.value; if (!srcQuery.trim()) srcShown = 6; srcPaint(); });",
  "  srcPaint();",
  "  stgPaint();",
  "  document.addEventListener('click', function(e){ if (cmp && !cmp.contains(e.target)) { cmp.classList.remove('is-am-open'); if (addBtn) addBtn.setAttribute('aria-expanded','false'); } });",
  "  function ssLayout(ss){ var segs=ss.querySelectorAll('.ss__seg'); var sel=parseInt(ss.getAttribute('data-selected'),10)||0; var ind=ss.querySelector('.ss__indicator'); var t=segs[sel]; if(!t||!ind)return; ind.style.width=t.offsetWidth+'px'; ind.style.transform='translateX('+(t.offsetLeft-4)+'px)'; }",
  "  document.querySelectorAll('.ss').forEach(function(ss){ ss.querySelectorAll('.ss__seg').forEach(function(seg){ seg.addEventListener('click', function(){ if (ss.classList.contains('ss--mode') && seg.getAttribute('data-i') === '1'){ document.body.classList.add('cowork-active'); return; } ss.querySelectorAll('.ss__seg').forEach(function(s){ s.classList.remove('ss__seg--selected'); }); seg.classList.add('ss__seg--selected'); ss.setAttribute('data-selected', seg.getAttribute('data-i')); ssLayout(ss); }); }); });",
  "  window.addEventListener('message', function(e){ if (e && e.data === 'cowork:switch-chat'){ document.body.classList.remove('cowork-active'); } });",
  "  requestAnimationFrame(function(){ requestAnimationFrame(function(){ document.querySelectorAll('.ss').forEach(ssLayout); }); });",
  "  window.addEventListener('load', function(){ document.querySelectorAll('.ss').forEach(ssLayout); });",
  "  window.addEventListener('resize', function(){ document.querySelectorAll('.ss').forEach(ssLayout); });",
  "  var zsList = document.getElementById('zsList');",
  "  var SUGGESTED_LIST = zsLists[0];",
  "  document.querySelectorAll('.zs__chip').forEach(function(chip){ chip.addEventListener('click', function(){ var idx = parseInt(chip.getAttribute('data-chip'), 10); var wasSel = chip.classList.contains('zs__chip--selected'); document.querySelectorAll('.zs__chip').forEach(function(c){ var on = c === chip && !wasSel; c.classList.toggle('zs__chip--selected', on); c.setAttribute('aria-pressed', on ? 'true' : 'false'); }); if (zsList) zsList.innerHTML = wasSel ? '' : zsLists[idx]; }); });",
  "  function setLastConnected(name, logoSrc){ var chip = document.getElementById('srcChip'); if (!chip) return; var iconEl = chip.querySelector('.zs__chip-ico'); if (iconEl) iconEl.innerHTML = logoSrc ? '<img src=\"' + logoSrc + '\" alt=\"\"/>' : ''; var lbl = document.getElementById('srcChipLabel'); if (lbl) lbl.textContent = 'From ' + name; var rows = SRC_PROMPT_LISTS[name]; if (!rows){ var gp = ['Summarize the latest updates in ' + name, 'Find something specific in ' + name, 'Draft an update using my ' + name + ' content']; var r = ''; gp.forEach(function(p, i){ r += '<div class=\"zs__row' + (i === gp.length - 1 ? ' zs__row--last' : '') + '\"><div class=\"zs__item\"><span class=\"zs__label\">' + p + '</span></div></div>'; }); rows = '<div class=\"zs__list-rows\">' + r + '</div>'; } zsLists[0] = rows; if (chip.classList.contains('zs__chip--selected') && zsList) zsList.innerHTML = rows; }",
  "  function resetSourcePill(){ var chip = document.getElementById('srcChip'); if (!chip) return; var iconEl = chip.querySelector('.zs__chip-ico'); if (iconEl) iconEl.innerHTML = MS_LOGO; var lbl = document.getElementById('srcChipLabel'); if (lbl) lbl.textContent = 'Suggested'; zsLists[0] = SUGGESTED_LIST; if (chip.classList.contains('zs__chip--selected') && zsList) zsList.innerHTML = SUGGESTED_LIST; }",
  "  var newChatBtn = document.getElementById('newChatBtn'); if (newChatBtn) newChatBtn.addEventListener('click', function(){ if (shellEl) shellEl.classList.remove('shell--convo', 'shell--sp-open'); if (thread) thread.innerHTML = ''; document.querySelectorAll('.zs__chip').forEach(function(c){ c.classList.remove('zs__chip--selected'); c.setAttribute('aria-pressed', 'false'); }); if (zsList) zsList.innerHTML = ''; resetSourcePill(); });",
  "  var plo = document.getElementById('plOverlay');",
  "  var chipMore = document.getElementById('chipMore');",
  "  if (chipMore) chipMore.addEventListener('click', function(){ plo.classList.add('is-open'); });",
  "  var plClose = document.getElementById('plClose');",
  "  if (plClose) plClose.addEventListener('click', function(){ plo.classList.remove('is-open'); });",
  "  if (plo) plo.addEventListener('click', function(e){ if (e.target === plo) plo.classList.remove('is-open'); });",
  "  var PL_DATA = " + JSON.stringify(PL_DATA) + ";",
  "  var PL_BM = " + JSON.stringify(ico('bookmark-20-regular')) + ";",
  "  var plContent = document.getElementById('plContent');",
  "  function plItemHtml(it){ return '<div class=\"pl-item\"><div class=\"pl-item__cat\">' + it.cat + '</div><div class=\"pl-item__title\">' + it.title + '</div><div class=\"pl-item__by\">' + it.by + '</div><button class=\"pl-item__bm\">' + PL_BM + '</button></div>'; }",
  "  function plPaint(cat){ var items = PL_DATA[cat]; if (!items || !plContent) return; plContent.innerHTML = items.map(plItemHtml).join(''); plContent.scrollTop = 0; }",
  "  document.querySelectorAll('.pl-group').forEach(function(g){ g.addEventListener('click', function(){ var open = g.getAttribute('aria-expanded') === 'true'; g.setAttribute('aria-expanded', open ? 'false' : 'true'); var items = document.querySelector('.pl-group__items[data-items=\"' + g.getAttribute('data-group') + '\"]'); if (items) items.hidden = open; }); });",
  "  function selectPlTab(t){ document.querySelectorAll('.pl-tab').forEach(function(x){ x.classList.remove('pl-tab--sel'); }); document.querySelectorAll('.pl-topic').forEach(function(x){ x.classList.remove('pl-topic--sel'); }); t.classList.add('pl-tab--sel'); plPaint(t.getAttribute('data-cat')); }",
  "  function bindPlTab(t){ if (t.__plb) return; t.__plb = 1; t.addEventListener('click', function(){ selectPlTab(t); }); }",
  "  document.querySelectorAll('.pl-tab').forEach(bindPlTab);",
  "  function ensureSourceTab(name){ var key = 'source:' + name; if (!PL_DATA[key]){ var base = SRC_PROMPTS_RAW[name] || ['Summarize the latest updates in ' + name, 'Find something specific in ' + name, 'Draft an update using my ' + name + ' content']; var cats = ['Catch up','Find','Draft','Create','Explore']; var items = base.map(function(p, i){ return { cat: cats[i % cats.length], title: p, by: 'From ' + name }; }); items.push({ cat: 'Ask', title: 'What can I do with my ' + name + ' content?', by: 'From ' + name }); items.push({ cat: 'Summarize', title: 'Give me a weekly digest from ' + name, by: 'From ' + name }); PL_DATA[key] = items; } var group = document.querySelector('.pl-group__items[data-items=\"sources\"]'); if (!group) return; var exists = false; group.querySelectorAll('.pl-tab').forEach(function(t){ if (t.getAttribute('data-cat') === key) exists = true; }); if (!exists){ var btn = document.createElement('button'); btn.className = 'pl-tab'; btn.setAttribute('data-cat', key); btn.textContent = name; group.appendChild(btn); bindPlTab(btn); var g = document.querySelector('.pl-group[data-group=\"sources\"]'); if (g && g.getAttribute('aria-expanded') !== 'true'){ g.setAttribute('aria-expanded','true'); group.hidden = false; } } }",
  "  var meBtn = document.getElementById('meBtn'); var meMenu = document.getElementById('meMenu');",
  "  if (meBtn) meBtn.addEventListener('click', function(e){ e.stopPropagation(); meMenu.classList.toggle('is-open'); });",
  "  var meSettings = document.getElementById('meSettings');",
  "  if (meSettings && stgOv) meSettings.addEventListener('click', function(){ if (meMenu) meMenu.classList.remove('is-open'); stgOv.classList.add('is-open'); if (typeof stgPaint === 'function') stgPaint(); });",
  "  document.addEventListener('click', function(e){ if (meMenu && !meMenu.contains(e.target) && meBtn && !meBtn.contains(e.target)) meMenu.classList.remove('is-open'); });",
  "  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') { plo && plo.classList.remove('is-open'); meMenu && meMenu.classList.remove('is-open'); cmp && cmp.classList.remove('is-am-open'); srcOv && srcOv.classList.remove('is-open'); stgOv && stgOv.classList.remove('is-open'); adOv && adOv.classList.remove('is-open'); } });",
  '})();',
  '</script>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Connector Skills</title><style>' + css + '</style></head><body>'
  + '<div class="shell">'
  + nav()
  + '<div class="main">' + header() + '<div class="body">' + zeroState() + '</div><div class="disc">Copilot is an AI and may make mistakes. Using Copilot means you agree to the Terms of Use. See our Privacy Statement.</div></div>'
  + cotPanel()
  + '</div>'
  + promptLab()
  + sourcesModal()
  + settingsModal()
  + authModal()
  + ciqModal()
  + refsPopover()
  + '<iframe id="mode-cowork" src="coworkShell.html" title="Cowork" loading="lazy"></iframe>'
  + '</body>' + js + '</html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'connectorSkills.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'connectorSkills.html'));
