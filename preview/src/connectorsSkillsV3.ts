/**
  * Connectors & Skills v3 — Experiment (Discovery v2 base + Connector Skills)
 *
 * Discovery v2's full source-discovery shell (USC input auth for Confluence &
 * Google Drive, disconnect confirmation + sync/removing timers, rich Change-
 * sources menu and Settings L2 source detail) with the Connector-Skills layer
 * grafted on top:
 *   - Per-source "/skill" procedures (from the shared preview/src/_skills.ts)
 *   - A chevron on connected sources in Change-sources -> a skills sub-view
 *   - A Skills section on the Settings L2 source detail (cards, "Show more")
 *   - The CIQ palette below the composer (content + skills, "/" trigger and the
 *     "Add content" modal variant)
 *
 * Reused primitives/compounds: Side Nav, Segmented Switch, Button, Avatar,
 * Header, Composer, Greeting, suggestion chips, Prompt Lab, Menu.
 */

import * as fs from 'fs';
import * as path from 'path';
import { skillsFor } from './_skills';
import { injectVariantsRuntime } from './_variants';

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
// Raw color SVG (brand logos) — preserves the file's own fills/strokes rather
// than flattening to currentColor like ico() does.
function brandSvg(name: string): string {
  try {
    return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8')
      .replace(/\n/g, '').replace(/ (width|height)="\d+"/g, '');
  } catch (e) { return ''; }
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
    + row(ico('attach-20-regular'), 'Add content')
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

interface SrcConn { logo: string; name: string; meta?: string; desc: string; trailing: 'on' | 'off' | 'connect' | 'chevron'; tenant?: boolean; cat: string; badge?: boolean; usc?: boolean; uscHost?: string; uscDev?: string; uscAdd?: string; uscPh?: string; }
const SRC_CONNECTORS: SrcConn[] = [
  { logo: 'microsoft-365-20-regular.svg', name: 'Microsoft 365 apps', meta: 'Chats, Emails, Meetings and more', desc: 'Chats, Emails, Meetings, SharePoint, and more', trailing: 'on', cat: 'Other' },
  { logo: 'servicenow-logo.png', name: 'ServiceNow', desc: 'Look up tickets, incidents, and IT service records', trailing: 'on', tenant: true, cat: 'Development tools' },
  { logo: 'azure-devops-logo.svg', name: 'Azure DevOps', desc: 'Reference repos, pipelines, boards, and work items', trailing: 'on', tenant: true, cat: 'Development tools' },
  { logo: 'godaddy-logo.png', name: 'GoDaddy', desc: 'Manage domains, websites, hosting, and store settings', trailing: 'connect', cat: 'Commerce & Shopping' },
  { logo: 'hubspot-logo.png', name: 'HubSpot', desc: 'Connect CRM contacts, deals, and marketing data', trailing: 'connect', cat: 'Commerce & Shopping' },
  { logo: 'taskrabbit-logo.png', name: 'Taskrabbit', desc: 'Book vetted local taskers for errands and chores', trailing: 'connect', cat: 'Commerce & Shopping', badge: true },
  { logo: 'trivago-logo.png', name: 'Trivago', desc: 'Compare hotel prices and deals across sites', trailing: 'connect', cat: 'Commerce & Shopping' },
  { logo: 'viator-logo.png', name: 'Viator', desc: 'Browse and book tours, activities, and experiences', trailing: 'connect', cat: 'Commerce & Shopping' },
  { logo: 'intercom-logo.png', name: 'Intercom', desc: 'Bring in customer conversations and support history', trailing: 'connect', cat: 'Communication' },
  { logo: 'twilio-logo.png', name: 'Twilio', desc: 'Reference messaging, voice, and verification activity logs', trailing: 'connect', cat: 'Communication' },
  { logo: 'slack-logo.png', name: 'Slack', desc: 'Search messages, channels, and files across workspace', trailing: 'connect', cat: 'Communication' },
  { logo: 'google-contacts-logo.png', name: 'Google Contacts', desc: 'Search and manage contacts, emails, and numbers', trailing: 'connect', cat: 'Communication' },
  { logo: 'medlineplus-logo.png', name: 'MedlinePlus', desc: 'Look up consumer health and drug information', trailing: 'connect', cat: 'Consumer Health' },
  { logo: 'adobe-logo.png', name: 'Adobe Marketing Agent', desc: 'Pull creative assets, campaigns, and marketing data', trailing: 'connect', cat: 'Creative' },
  { logo: 'canva-logo.png', name: 'Canva', desc: 'Browse, summarize, and generate new Canva designs', trailing: 'on', cat: 'Creative' },
  { logo: 'excalidraw-logo.png', name: 'Excalidraw', desc: 'Reference, create, and edit whiteboard sketches', trailing: 'connect', cat: 'Creative' },
  { logo: 'mermaid-chart-logo.png', name: 'Mermaid Chart', desc: 'Create and reference diagrams-as-code and flowcharts', trailing: 'connect', cat: 'Creative' },
  { logo: 'miro-logo.png', name: 'Miro', desc: 'Reference boards, sticky notes, frames, and diagrams', trailing: 'connect', cat: 'Creative', badge: true },
  { logo: 'figma-logo.svg', name: 'Figma', desc: 'Reference design files, frames, components, and comments', trailing: 'connect', cat: 'Creative' },
  { logo: 'blockscout-logo.png', name: 'Blockscout', desc: 'Explore blockchain transactions, addresses, and contracts', trailing: 'connect', cat: 'Data & Analytics' },
  { logo: 'clarity-ai-logo.png', name: 'Clarity AI', desc: 'Sustainability, ESG, and climate risk analytics', trailing: 'connect', cat: 'Data & Analytics' },
  { logo: 'exa-logo.png', name: 'Exa', desc: 'AI-native web search and content retrieval', trailing: 'connect', cat: 'Data & Analytics' },
  { logo: 'bigquery-logo.png', name: 'Google Cloud BigQuery', desc: 'Query datasets and run analytics at scale', trailing: 'connect', cat: 'Data & Analytics' },
  { logo: 'wolfram-logo.png', name: 'Wolfram', desc: 'Computation, math, and curated knowledge across domains', trailing: 'connect', cat: 'Data & Analytics' },
  { logo: 'atlas-ai-logo.png', name: 'Atlas AI', desc: 'Predictive geospatial, economic, and demographic analytics', trailing: 'connect', cat: 'Data & Analytics' },
  { logo: 'cb-insights-logo.png', name: 'CB Insights MCP', desc: 'Market intelligence on companies, funding, and trends', trailing: 'connect', cat: 'Data & Analytics' },
  { logo: 'forrester-logo.png', name: 'Forrester AI', desc: 'Access research, analyst reports, and market insights', trailing: 'connect', cat: 'Data & Analytics' },
  { logo: 'clerk-logo.png', name: 'Clerk', desc: 'Manage users, sessions, and authentication for apps', trailing: 'connect', cat: 'Development tools' },
  { logo: 'granted-logo.png', name: 'Granted', desc: 'Streamline cloud access, roles, and permission requests', trailing: 'connect', cat: 'Development tools' },
  { logo: 'graphos-logo.png', name: 'Graphos MCP tools', desc: 'Apollo GraphOS schema, graph, and operation tooling', trailing: 'connect', cat: 'Development tools' },
  { logo: 'hugging-face-logo.png', name: 'Hugging Face', desc: 'Reference models, datasets, and Spaces from Hub', trailing: 'connect', cat: 'Development tools' },
  { logo: 'linear-logo.png', name: 'Linear', desc: 'Manage issues, projects, and team workflows', trailing: 'connect', cat: 'Development tools' },
  { logo: 'pg-aiguide-logo.png', name: 'Pg-aiguide', desc: 'Postgres schema guidance, query help, and tuning', trailing: 'connect', cat: 'Development tools' },
  { logo: 'jira-logo.png', name: 'Jira', desc: 'Track issues, sprints, boards, and project workflows', trailing: 'connect', cat: 'Development tools' },
  { logo: 'confluence-logo.png', name: 'Confluence', desc: 'Pull knowledge base articles and team documentation', trailing: 'connect', cat: 'Development tools', usc: true, uscHost: 'atlassian.net', uscDev: 'Atlassian' },
  { logo: 'goodnotes-logo.png', name: 'Goodnotes', desc: 'Reference handwritten notes, documents, and annotations', trailing: 'connect', cat: 'Education' },
  { logo: 'microsoft-learn-logo.png', name: 'Microsoft Learn', desc: 'Search Microsoft docs, training, and learning paths', trailing: 'connect', cat: 'Education' },
  { logo: 'aiwyn-logo.png', name: 'Aiwyn Tax', desc: 'Tax practice management, billing, and client workflows', trailing: 'connect', cat: 'Financial Services' },
  { logo: 'crypto-com-logo.png', name: 'Crypto.com', desc: 'Track crypto prices, holdings, and transaction history', trailing: 'connect', cat: 'Financial Services' },
  { logo: 'lseg-logo.png', name: 'London Stock Exchange Group', desc: 'Market data, filings, and company fundamentals', trailing: 'connect', cat: 'Financial Services' },
  { logo: 'moodys-logo.png', name: 'Moody’s', desc: 'Credit ratings, risk scores, and financial insights', trailing: 'connect', cat: 'Financial Services' },
  { logo: 'cash-app-logo.png', name: 'Order by Cash App', desc: 'Reference Cash App payments, orders, and transfers', trailing: 'connect', cat: 'Financial Services' },
  { logo: 'sp-global-logo.png', name: 'S&P Global', desc: 'Company fundamentals, market data, and intelligence', trailing: 'connect', cat: 'Financial Services' },
  { logo: 'morningstar-logo.png', name: 'Morningstar', desc: 'Investment research, fund ratings, and portfolio analytics', trailing: 'connect', cat: 'Financial Services', badge: true },
  { logo: 'pitchbook-logo.png', name: 'PitchBook', desc: 'Private market, VC, and PE deal data', trailing: 'connect', cat: 'Financial Services' },
  { logo: 'daloopa-logo.png', name: 'Daloopa', desc: 'Automated financial data extraction from filings and models', trailing: 'connect', cat: 'Financial Services' },
  { logo: 'fitch-solutions-logo.png', name: 'Fitch Solutions', desc: 'Credit ratings, macro research, and country risk', trailing: 'connect', cat: 'Financial Services' },
  { logo: 'rxnorm-logo.png', name: 'RxNorm', desc: 'Standardized drug names, codes, and clinical mappings', trailing: 'connect', cat: 'Health & Life Sciences' },
  { logo: 'synapse-logo.png', name: 'Synapse.org', desc: 'Open biomedical research data and analysis tools', trailing: 'connect', cat: 'Health & Life Sciences' },
  { logo: 'drugbank-logo.png', name: 'DrugBank', desc: 'Drug, target, pathway, and interaction reference data', trailing: 'connect', cat: 'Health & Life Sciences', badge: true },
  { logo: 'drugdata-logo.png', name: 'DrugData', desc: 'Medicare and Medicaid drug pricing and coverage', trailing: 'connect', cat: 'Healthcare' },
  { logo: 'fdasafety-logo.png', name: 'FdaSafety', desc: 'FDA drug safety, labels, and adverse events', trailing: 'connect', cat: 'Healthcare' },
  { logo: 'courtroom5-logo.png', name: 'Courtroom5', desc: 'Litigation guidance and prep for self-represented users', trailing: 'connect', cat: 'Legal' },
  { logo: 'descrybe-logo.png', name: 'Descrybe Legal Engine', desc: 'Search, summarize, and cite case law', trailing: 'connect', cat: 'Legal' },
  { logo: 'melon-logo.png', name: 'Melon', desc: 'Reference music catalog, charts, and playlists', trailing: 'connect', cat: 'Media' },
  { logo: 'kindora-logo.png', name: 'Kindora Funder Discovery', desc: 'Discover grant funders, opportunities, and eligibility matches', trailing: 'connect', cat: 'Nonprofit' },
  { logo: 'alltrails-logo.png', name: 'AllTrails', desc: 'Look up trails, hikes, and outdoor routes', trailing: 'connect', cat: 'Other', badge: true },
  { logo: 'boardwise-logo.png', name: 'BoardWise', desc: 'Board governance, meeting prep, and director insights', trailing: 'connect', cat: 'Other' },
  { logo: 'google-calendar-logo.png', name: 'Google Calendar', desc: 'Look up events, meetings, schedules, and availability', trailing: 'connect', cat: 'Other' },
  { logo: 'malwarebytes-logo.png', name: 'Malwarebytes', desc: 'Reference threat scans, detections, and security status', trailing: 'connect', cat: 'Other' },
  { logo: 'tripadvisor-logo.png', name: 'Tripadvisor', desc: 'Reviews for hotels, restaurants, and attractions', trailing: 'connect', cat: 'Other' },
  { logo: 'turkish-airlines-logo.png', name: 'Turkish Airlines', desc: 'Look up flights, bookings, schedules, and status', trailing: 'connect', cat: 'Other' },
  { logo: 'ziprecruiter-logo.png', name: 'ZipRecruiter', desc: 'Search jobs, candidates, applications, and hiring activity', trailing: 'connect', cat: 'Other' },
  { logo: 'smartsheet-logo.png', name: 'Smartsheet', desc: 'Reference sheets, projects, tasks, and reports', trailing: 'connect', cat: 'Other' },
  { logo: 'google-drive-logo.png', name: 'Google Drive', desc: 'Search documents, sheets, and slides in Drive', trailing: 'connect', cat: 'Other', usc: true, uscDev: 'Google', uscAdd: 'Paste a Google Drive folder or file link to connect', uscPh: 'https://drive.google.com/drive/folders/...' },
];
function srcLogoHtml(logo: string): string {
  if (logo.endsWith('-logo.svg')) return '<span class="srcm__logo srcm__logo--glyph">' + brandSvg(logo.slice(0, -4)) + '</span>';
  if (logo.endsWith('.svg')) return '<span class="srcm__logo srcm__logo--glyph">' + ico(logo.slice(0, -4)) + '</span>';
  return '<span class="srcm__logo"><img src="' + logoImg(logo) + '" alt=""/></span>';
}
function stgLogoHtml(logo: string): string {
  if (logo.endsWith('-logo.svg')) return '<span class="stg__gi">' + brandSvg(logo.slice(0, -4)) + '</span>';
  if (logo.endsWith('.svg')) return '<span class="stg__gi">' + ico(logo.slice(0, -4)) + '</span>';
  return '<img src="' + logoImg(logo) + '" alt=""/>';
}
// Unified source model shared by the Change-sources menu and the Settings
// Sources tab so connect/toggle state flows both ways.
const SRC_REC = ['London Stock Exchange Group', 'Moody\u2019s', 'HubSpot'];
const STG_CHECK_SVG = '<svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7.03 13.9 3.56 10a.75.75 0 1 0-1.12 1l4 4.5a.75.75 0 0 0 1.1.03l10.5-10.5a.75.75 0 0 0-1.06-1.06L7.03 13.9Z" fill="currentColor"/></svg>';
const SRC_MODEL = SRC_CONNECTORS.map(function (c) {
  return { n: c.name, logo: srcLogoHtml(c.logo), stgLogo: stgLogoHtml(c.logo), logoSrc: c.logo.endsWith('.svg') ? '' : logoImg(c.logo), meta: c.meta || '', desc: c.desc, state: c.trailing, cats: c.cat ? [c.cat] : [], rec: SRC_REC.indexOf(c.name) !== -1, tenant: c.tenant === true, badge: c.badge === true, usc: c.usc === true, uscHost: c.uscHost || '', uscDev: c.uscDev || '', uscAdd: c.uscAdd || '', uscPh: c.uscPh || '' };
});

// ─── Connector Skills (per source) ─────────────────────────
// A connected source exposes named "/skill" procedures. Surfaced three ways: a
// chevron beside a connected source in Change-sources -> a skills sub-view, a
// Skills section on the Settings L2 source detail, and the CIQ palette below the
// composer. Populated from the shared canonical catalog (preview/src/_skills.ts)
// so skills stay identical across surfaces.
interface Skill { name: string; desc: string; }
// Curated rich skill catalogs (12 each) for a few showcase connectors so the
// auth modal can demonstrate the 2-row cap + "+N" pill and the Settings L2 can
// list a full set. Other connectors keep their canonical 3–4 from _skills.ts.
const RICH_SKILLS: Record<string, Skill[]> = {
  'HubSpot': [
    { name: 'contact-lookup', desc: 'Find a contact\u2019s details, owner, and recent activity.' },
    { name: 'deal-summary', desc: 'Summarize a deal\u2019s stage, value, and next steps.' },
    { name: 'pipeline-report', desc: 'Report on pipeline health across stages and owners.' },
    { name: 'company-brief', desc: 'Pull a company record with its contacts and open deals.' },
    { name: 'log-activity', desc: 'Log a call, email, or note against a record.' },
    { name: 'create-deal', desc: 'Create a new deal from a short prompt.' },
    { name: 'update-stage', desc: 'Move a deal to a new pipeline stage.' },
    { name: 'draft-outreach', desc: 'Draft personalized outreach grounded in the contact\u2019s history.' },
    { name: 'list-tasks', desc: 'List open tasks and follow-ups due this week.' },
    { name: 'campaign-recap', desc: 'Recap a marketing campaign\u2019s performance and engagement.' },
    { name: 'lead-score', desc: 'Surface high-intent leads by recent engagement.' },
    { name: 'revenue-forecast', desc: 'Forecast expected revenue from the current pipeline.' },
  ],
  'Moody\u2019s': [
    { name: 'credit-rating', desc: 'Look up an entity\u2019s current credit rating and outlook.' },
    { name: 'rating-history', desc: 'Trace an issuer\u2019s rating changes over time.' },
    { name: 'risk-score', desc: 'Pull a counterparty\u2019s risk score and key drivers.' },
    { name: 'issuer-profile', desc: 'Summarize an issuer\u2019s financials and rating rationale.' },
    { name: 'peer-compare', desc: 'Compare ratings and risk across a peer group.' },
    { name: 'default-probability', desc: 'Get an entity\u2019s estimated default probability.' },
    { name: 'sector-outlook', desc: 'Summarize the credit outlook for a sector.' },
    { name: 'covenant-check', desc: 'Flag covenant and leverage concerns in a filing.' },
    { name: 'watchlist', desc: 'Track entities on rating watch or under review.' },
    { name: 'macro-brief', desc: 'Brief on macro and country-risk factors.' },
    { name: 'esg-score', desc: 'Pull ESG risk scores and their rationale.' },
    { name: 'portfolio-risk', desc: 'Aggregate credit risk across a portfolio.' },
  ],
  'London Stock Exchange Group': [
    { name: 'search-securities', desc: 'Search securities by name, ticker, or ISIN.' },
    { name: 'get-quote', desc: 'Pull the latest quote and day range for a security.' },
    { name: 'get-fundamentals', desc: 'Retrieve company fundamentals and key ratios.' },
    { name: 'list-filings', desc: 'List recent regulatory filings for a company.' },
    { name: 'get-filing', desc: 'Open a specific filing and summarize it.' },
    { name: 'get-index', desc: 'Pull an index\u2019s constituents and levels.' },
    { name: 'historical-prices', desc: 'Get historical prices over a time range.' },
    { name: 'corporate-actions', desc: 'List dividends, splits, and corporate actions.' },
    { name: 'ownership', desc: 'Summarize major shareholders and ownership changes.' },
    { name: 'peer-benchmark', desc: 'Benchmark a company against its sector peers.' },
    { name: 'earnings-calendar', desc: 'Show upcoming earnings dates and events.' },
    { name: 'market-summary', desc: 'Summarize today\u2019s market movers and drivers.' },
  ],
  'S&P Global': [
    { name: 'company-fundamentals', desc: 'Pull fundamentals and financial statements.' },
    { name: 'credit-rating', desc: 'Look up an entity\u2019s S&P credit rating.' },
    { name: 'market-data', desc: 'Get real-time and historical market data.' },
    { name: 'sector-intelligence', desc: 'Summarize sector trends and outlook.' },
    { name: 'peer-analysis', desc: 'Compare a company against its peers.' },
    { name: 'estimates', desc: 'Pull consensus estimates and recent revisions.' },
    { name: 'ownership', desc: 'Summarize institutional ownership.' },
    { name: 'filings-search', desc: 'Search filings and earnings transcripts.' },
    { name: 'commodity-prices', desc: 'Get commodity and energy prices.' },
    { name: 'esg-scores', desc: 'Pull ESG scores and rationale.' },
    { name: 'macro-indicators', desc: 'Summarize key macroeconomic indicators.' },
    { name: 'risk-monitor', desc: 'Monitor credit and market-risk signals.' },
  ],
  'Jira': [
    { name: 'sprint-status', desc: 'Summarize the active sprint\u2019s progress and blockers.' },
    { name: 'issue-triage', desc: 'Triage new issues by priority, component, and owner.' },
    { name: 'release-notes', desc: 'Draft release notes from resolved issues.' },
    { name: 'backlog-grooming', desc: 'Suggest backlog grooming and prioritization.' },
    { name: 'search-issues', desc: 'Search issues by project, status, or assignee.' },
    { name: 'create-issue', desc: 'Create a new issue from a short prompt.' },
    { name: 'update-issue', desc: 'Update fields on an existing issue.' },
    { name: 'add-comment', desc: 'Add a comment grounded in the issue\u2019s history.' },
    { name: 'assign-issue', desc: 'Assign or reassign an issue to a teammate.' },
    { name: 'transition-status', desc: 'Move an issue to a new workflow status.' },
    { name: 'list-projects', desc: 'List projects with their lead and status.' },
    { name: 'sprint-report', desc: 'Compile a sprint report with velocity and carryover.' },
  ],
  'ServiceNow': [
    { name: 'search-incidents', desc: 'Search incidents by state, priority, or assignee.' },
    { name: 'get-incident', desc: 'Open an incident and summarize its timeline.' },
    { name: 'create-incident', desc: 'Create a new incident from a short prompt.' },
    { name: 'update-incident', desc: 'Update fields or state on an incident.' },
    { name: 'list-requests', desc: 'List open service requests and their status.' },
    { name: 'add-work-note', desc: 'Add a work note grounded in the record history.' },
    { name: 'assign-incident', desc: 'Assign or reassign an incident to a group.' },
    { name: 'major-incident', desc: 'Summarize a major incident and its impact.' },
    { name: 'change-summary', desc: 'Summarize a change request and its risk.' },
    { name: 'sla-status', desc: 'Report SLA status and breaches across incidents.' },
    { name: 'knowledge-search', desc: 'Search the knowledge base for a resolution.' },
    { name: 'escalate', desc: 'Escalate an incident to the right group.' },
  ],
};
const SRC_SKILLS: Record<string, Skill[]> = {};
SRC_CONNECTORS.forEach(function (c) {
  SRC_SKILLS[c.name] = RICH_SKILLS[c.name] || skillsFor(c.name).map(function (sk) { return { name: sk.name, desc: sk.desc }; });
});
function srcSkills(name: string): Skill[] { return SRC_SKILLS[name] || []; }
/** Skill glyph — Fluent "Script" icon. */
const SKILL_ICON = ico('script-20-regular');
/** MCP server glyph — Fluent "Plug connected" icon. */
const MCP_ICON = ico('plug-connected-20-regular');
const SK_MENU = ico('more-vertical-20-regular');
const SK_TRY = ico('chat-sparkle-20-regular');
const SK_INFO = ico('info-20-regular');
const SK_CHAT = ico('chat-sparkle-20-regular');

// ─── CIQ Menu data (content + skills palette below the composer) ────
const CIQ_CONFLUENCE = '<img src="' + logoImg('confluence-logo.png') + '" alt=""/>';
const CIQ_SKILLS = [
  { icon: CIQ_CONFLUENCE, title: '/space-digest', sub: 'Summarize a Confluence space into a structured digest of key decisions, owners, and open questions', kind: 'skill' },
  { icon: CIQ_CONFLUENCE, title: '/page-from-template', sub: 'Create and publish a new Confluence page from a template (meeting notes, PRD, retro, decision log)', kind: 'skill' },
  { icon: ico('calendar-ltr-20-regular'), title: '/calendar-management', sub: 'Find open time, propose agendas, and manage invites across your connected calendars', kind: 'skill' },
  { icon: CIQ_CONFLUENCE, title: '/label-cleanup', sub: 'Audit and normalize labels across a Confluence space so content stays discoverable', kind: 'skill' },
];
const CIQ_FILES = [
  { icon: brandSvg('powerpoint-20-color'), title: 'Leading the way with Brew Fusion', sub: 'Opened yesterday', kind: 'content' },
  { icon: brandSvg('word-20-color'), title: 'Q3 Product Requirements', sub: 'Edited 2 days ago', kind: 'content' },
  { icon: brandSvg('excel-20-color'), title: 'FY25 Revenue model', sub: 'Opened last week', kind: 'content' },
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
const CIQ_AV_MONA = '<img style="border-radius:9999px" src="' + logoImg('avatar-mona-kane.png') + '" alt=""/>';
const CIQ_AV_GROUP = '<img style="border-radius:9999px" src="' + logoImg('people-interwoven.png') + '" alt=""/>';
const CIQ_NOTION = '<img src="' + logoImg('notion-logo.png') + '" alt=""/>';
const CIQ_VIVA = ico('chat-20-regular');
const CIQ_MAIL = ico('mention-20-regular');
const CIQ_MALL = [
  { icon: CIQ_AV_MONA, title: 'Mona Kane', sub: 'mona.kane@contoso.com', kind: 'content' },
  { icon: brandSvg('powerpoint-20-color'), title: 'Leading the way with Brew Fusion', sub: 'Opened yesterday', kind: 'content' },
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
  { icon: CIQ_NOTION, title: '/workspace-digest', sub: 'Summarize recent activity across a workspace or database into an at-a-glance digest', kind: 'skill' },
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
const CIQ_CHEV = ico('chevron-right-20-regular');

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

// ─── Source L2 detail (Settings → Sources → a connected source) ─────
// Figma node 1790:48443 — identity + Disconnect + overflow, then About, a
// read-only Tools list, and Details. About / Tools / Developer are per-source;
// Account, Category, and Connected-on fall back to the shared model + defaults.
const SRC_DETAIL: Record<string, { about: string; tools: string[]; developer: string; connectedOn?: string }> = {
  'Microsoft 365 apps': {
    about: 'Ground Copilot in your Microsoft 365 content across chats, emails, meetings, files, and SharePoint sites. It searches, summarizes, and drafts inside the apps you already work in every day.',
    tools: ['Search email', 'Summarize meetings', 'Search chats', 'Find files', 'Search SharePoint', 'Get calendar', 'List recent documents'],
    developer: 'Microsoft',
  },
  'ServiceNow': {
    about: 'Look up tickets, incidents, and IT service records so Copilot can triage issues and draft resolutions. It reads records and work notes to keep your service desk moving.',
    tools: ['Search incidents', 'Get incident', 'Create incident', 'Update incident', 'List requests', 'Get record', 'Add work note', 'Assign incident'],
    developer: 'ServiceNow',
  },
  'Azure DevOps': {
    about: 'Reference repos, pipelines, boards, and work items so Copilot can search code, summarize builds, and draft updates. It stays grounded in your projects and delivery status.',
    tools: ['Search work items', 'Get work item', 'Create work item', 'Update work item', 'List pull requests', 'Get build status', 'List pipelines', 'Search code'],
    developer: 'Microsoft',
  },
  'GoDaddy': {
    about: 'Manage domains, websites, hosting, and online store settings from one place. Copilot can check domain status, DNS records, and site details on your behalf.',
    tools: ['List domains', 'Get domain', 'Check availability', 'Manage DNS', 'Get hosting status', 'List products', 'Renew domain'],
    developer: 'GoDaddy',
  },
  'HubSpot': {
    about: 'Connect CRM contacts, deals, and marketing data so Copilot can summarize pipeline and draft outreach. It surfaces the customer context you need without leaving chat.',
    tools: ['Search contacts', 'Get contact', 'List deals', 'Get deal', 'Create note', 'List companies', 'Get pipeline', 'Log activity'],
    developer: 'HubSpot',
  },
  'Taskrabbit': {
    about: 'Book vetted local taskers for errands, moving, and home chores. Copilot can find taskers, compare quotes, and manage your bookings end to end.',
    tools: ['Search taskers', 'Get tasker', 'Create booking', 'Get booking', 'List categories', 'Get quote', 'Cancel booking', 'Message tasker'],
    developer: 'Taskrabbit',
  },
  'Trivago': {
    about: 'Compare hotel prices and deals across booking sites in one search. Copilot can look up stays, filter by preference, and surface the best rates.',
    tools: ['Search hotels', 'Get hotel', 'Compare prices', 'Filter by amenities', 'Get reviews', 'List deals', 'Check availability'],
    developer: 'trivago',
  },
  'Viator': {
    about: 'Browse and book tours, activities, and travel experiences worldwide. Copilot can find things to do, check availability, and pull booking details.',
    tools: ['Search experiences', 'Get experience', 'Check availability', 'Get pricing', 'List reviews', 'Create booking', 'Find nearby'],
    developer: 'Viator',
  },
  'Intercom': {
    about: 'Bring in customer conversations and support history so Copilot can catch you up and draft replies. It reads tickets, notes, and profiles to keep context.',
    tools: ['Search conversations', 'Get conversation', 'List contacts', 'Get contact', 'Reply to conversation', 'List tickets', 'Add note'],
    developer: 'Intercom',
  },
  'Twilio': {
    about: 'Reference messaging, voice, and verification activity so Copilot can summarize communication logs. It reads message and call history and can look up numbers.',
    tools: ['List messages', 'Get message', 'List calls', 'Get call', 'Send message', 'Lookup number', 'Get usage'],
    developer: 'Twilio',
  },
  'Slack': {
    about: 'Search messages, channels, and files across your workspace so Copilot can catch you up and find what matters. It reads threads and shared files to stay grounded.',
    tools: ['Search messages', 'List channels', 'Get channel history', 'Send message', 'List files', 'Get thread', 'List members'],
    developer: 'Slack Technologies',
  },
  'Google Contacts': {
    about: 'Search and manage contacts, emails, and phone numbers so Copilot can find the right person fast. It reads your address book and can look up details.',
    tools: ['Search contacts', 'Get contact', 'List contacts', 'Get email', 'Get phone number', 'List groups', 'Find duplicates'],
    developer: 'Google',
  },
  'MedlinePlus': {
    about: 'Look up trusted consumer health and drug information from the U.S. National Library of Medicine. Copilot can explain conditions, medications, and tests in plain language.',
    tools: ['Search topics', 'Get health topic', 'Search drugs', 'Get drug info', 'Get test details', 'List symptoms', 'Find related topics'],
    developer: 'U.S. National Library of Medicine',
  },
  'Adobe Marketing Agent': {
    about: 'Pull creative assets, campaigns, and marketing performance data from Adobe. Copilot can reference brand content and summarize campaign results.',
    tools: ['Search assets', 'Get asset', 'List campaigns', 'Get campaign', 'Get performance', 'List audiences', 'Export asset'],
    developer: 'Adobe',
  },
  'Canva': {
    about: 'Browse, summarize, autofill, and even generate new Canva designs. Copilot can reference your brand kit and turn ideas into on-brand visuals.',
    tools: ['Search designs', 'Get design', 'Create design', 'Autofill template', 'List brand assets', 'Export design', 'Generate design'],
    developer: 'Canva',
  },
  'Excalidraw': {
    about: 'Reference, create, and edit hand-drawn style whiteboard sketches and diagrams. Copilot can read your scenes and help lay out ideas visually.',
    tools: ['List scenes', 'Get scene', 'Create scene', 'Add shape', 'Update element', 'Export scene', 'Search scenes'],
    developer: 'Excalidraw',
  },
  'Mermaid Chart': {
    about: 'Create and reference diagrams-as-code, flowcharts, and sequence diagrams. Copilot can generate and edit Mermaid definitions grounded in your docs.',
    tools: ['List diagrams', 'Get diagram', 'Create diagram', 'Update diagram', 'Render diagram', 'Validate syntax', 'Export diagram'],
    developer: 'Mermaid Chart',
  },
  'Miro': {
    about: 'Reference boards, sticky notes, frames, and diagrams so Copilot can summarize and draft from your visual workspace. It reads board content and can add items.',
    tools: ['List boards', 'Get board', 'Search items', 'Get sticky notes', 'Create item', 'Get frames', 'Export board'],
    developer: 'Miro',
  },
  'Figma': {
    about: 'Reference design files, frames, components, and comments so Copilot can inspect and summarize your designs. It reads file structure and design tokens.',
    tools: ['Get file', 'List frames', 'Get components', 'Export node', 'Get comments', 'List styles', 'Get variables'],
    developer: 'Figma',
  },
  'Blockscout': {
    about: 'Explore blockchain transactions, addresses, and smart contracts across networks. Copilot can trace activity and read verified contract details.',
    tools: ['Get transaction', 'Get address', 'List transactions', 'Get contract', 'Get token', 'Get balance', 'Get logs'],
    developer: 'Blockscout',
  },
  'Clarity AI': {
    about: 'Sustainability, ESG, and climate risk analytics on companies and portfolios. Copilot can pull scores and summarize impact and risk exposure.',
    tools: ['Search companies', 'Get ESG score', 'Get climate risk', 'List controversies', 'Get impact metrics', 'Compare companies', 'Get benchmarks'],
    developer: 'Clarity AI',
  },
  'Exa': {
    about: 'AI-native web search and content retrieval built for grounding. Copilot can run semantic searches and pull clean, relevant sources.',
    tools: ['Search web', 'Get contents', 'Find similar', 'Get highlights', 'Search by domain', 'Get answer', 'Filter by date'],
    developer: 'Exa',
  },
  'Google Cloud BigQuery': {
    about: 'Query large datasets and run analytics at scale in BigQuery. Copilot can explore schemas, run SQL, and summarize results.',
    tools: ['Run query', 'List datasets', 'Get table schema', 'Preview rows', 'List tables', 'Get job status', 'Estimate cost'],
    developer: 'Google',
  },
  'Wolfram': {
    about: 'Computation, math, and curated knowledge across science and everyday domains. Copilot can compute answers and pull structured facts.',
    tools: ['Compute', 'Solve equation', 'Get facts', 'Plot function', 'Convert units', 'Query knowledge', 'Get step-by-step'],
    developer: 'Wolfram',
  },
  'Atlas AI': {
    about: 'Predictive geospatial, economic, and demographic analytics for emerging markets. Copilot can pull location-based indicators and forecasts.',
    tools: ['Search locations', 'Get indicators', 'Get forecast', 'Get demographics', 'Get economic data', 'Compare regions', 'Export dataset'],
    developer: 'Atlas AI',
  },
  'CB Insights MCP': {
    about: 'Market intelligence on companies, funding, and industry trends. Copilot can research startups, deals, and competitive landscapes.',
    tools: ['Search companies', 'Get company', 'Get funding', 'List investors', 'Get market map', 'Get trends', 'Get news'],
    developer: 'CB Insights',
  },
  'Forrester AI': {
    about: 'Access Forrester research, analyst reports, and market insights. Copilot can summarize findings and reference frameworks and Waves.',
    tools: ['Search research', 'Get report', 'Get analyst insight', 'List waves', 'Get framework', 'Get predictions', 'Get benchmarks'],
    developer: 'Forrester',
  },
  'Clerk': {
    about: 'Manage users, sessions, and authentication for your applications. Copilot can inspect identity data and summarize auth activity.',
    tools: ['List users', 'Get user', 'List sessions', 'Get session', 'List organizations', 'Search users', 'Get audit logs'],
    developer: 'Clerk',
  },
  'Granted': {
    about: 'Streamline cloud access, roles, and just-in-time permission requests. Copilot can check access status and help request or review grants.',
    tools: ['List access', 'Request access', 'Get grant', 'List roles', 'Approve request', 'Revoke access', 'Get audit log'],
    developer: 'Common Fate',
  },
  'Graphos MCP tools': {
    about: 'Work with Apollo GraphOS schemas, graphs, and operations so Copilot can inspect and reason about your API graph. It reads schema changes and field usage.',
    tools: ['List graphs', 'Get schema', 'Search operations', 'Get field usage', 'List variants', 'Check schema', 'Get changelog'],
    developer: 'Apollo GraphQL',
  },
  'Hugging Face': {
    about: 'Reference models, datasets, and Spaces from the Hub so Copilot can search, compare, and summarize ML artifacts. It reads model cards and metadata.',
    tools: ['Search models', 'Get model card', 'Search datasets', 'List Spaces', 'Get model files', 'Compare models', 'List tags'],
    developer: 'Hugging Face',
  },
  'Linear': {
    about: 'Manage issues, projects, and team workflows so Copilot can track work and draft updates. It reads your cycles and roadmap to keep grounded.',
    tools: ['Search issues', 'Get issue', 'Create issue', 'Update issue', 'List projects', 'List cycles', 'Assign issue'],
    developer: 'Linear',
  },
  'Pg-aiguide': {
    about: 'Postgres schema guidance, query help, and performance tuning tips. Copilot can explain your schema and suggest and refine SQL.',
    tools: ['Get schema', 'Explain query', 'Suggest index', 'Optimize query', 'List tables', 'Get table stats', 'Get query plan'],
    developer: 'Pg-aiguide',
  },
  'Jira': {
    about: 'Track issues, sprints, boards, and project workflows so Copilot can search, summarize, and draft updates grounded in your team’s work.',
    tools: ['Search issues', 'Get issue details', 'Create issue', 'Update issue', 'Add comment', 'Assign issue', 'Transition status'],
    developer: 'Atlassian',
  },
  'Confluence': {
    about: 'Pull knowledge base articles and team documentation so Copilot can search, summarize, and reference your space. It reads pages and attachments.',
    tools: ['Search pages', 'Get page', 'Create page', 'Update page', 'List spaces', 'Get attachments', 'Search space'],
    developer: 'Atlassian',
  },
  'Goodnotes': {
    about: 'Reference handwritten notes, documents, and PDF annotations from your notebooks. Copilot can search and summarize what you have captured.',
    tools: ['List notebooks', 'Get note', 'Search notes', 'Get annotations', 'Export page', 'List documents', 'Get handwriting text'],
    developer: 'Goodnotes',
  },
  'Microsoft Learn': {
    about: 'Search Microsoft documentation, training modules, and learning paths. Copilot can find guidance and summarize how-to content.',
    tools: ['Search docs', 'Get article', 'List modules', 'Get learning path', 'Search training', 'Get certification', 'Get code samples'],
    developer: 'Microsoft',
  },
  'Aiwyn Tax': {
    about: 'Tax practice management, billing, and client workflow automation. Copilot can reference engagements and summarize billing and status.',
    tools: ['List clients', 'Get client', 'List engagements', 'Get invoice', 'Create invoice', 'Get payment status', 'Get workflow'],
    developer: 'Aiwyn',
  },
  'Crypto.com': {
    about: 'Track crypto prices, holdings, and transaction history. Copilot can pull live rates and summarize your portfolio activity.',
    tools: ['Get price', 'List holdings', 'Get transaction', 'List transactions', 'Get portfolio value', 'Get market data', 'List assets'],
    developer: 'Crypto.com',
  },
  'London Stock Exchange Group': {
    about: 'Market data, financial filings, and company fundamentals from LSEG. Copilot can pull quotes, filings, and reference data.',
    tools: ['Search securities', 'Get quote', 'Get fundamentals', 'List filings', 'Get filing', 'Get index', 'Get historical prices'],
    developer: 'LSEG',
  },
  'Moody’s': {
    about: 'Credit ratings, risk scores, and financial insights from Moody’s. Copilot can look up ratings and summarize credit and default risk.',
    tools: ['Search entities', 'Get credit rating', 'Get risk score', 'Get default risk', 'List peers', 'Get rating history', 'Get outlook'],
    developer: 'Moody’s',
  },
  'Order by Cash App': {
    about: 'Reference Cash App payments, orders, and transfers. Copilot can look up transaction history and summarize activity.',
    tools: ['List payments', 'Get payment', 'List orders', 'Get order', 'Get balance', 'List transfers', 'Search activity'],
    developer: 'Block',
  },
  'S&P Global': {
    about: 'Company fundamentals, market data, and intelligence reports from S&P Global. Copilot can pull financials and summarize market intelligence.',
    tools: ['Search companies', 'Get fundamentals', 'Get market data', 'Get estimates', 'List filings', 'Get credit rating', 'Get ownership'],
    developer: 'S&P Global',
  },
  'Morningstar': {
    about: 'Investment research, fund ratings, and portfolio analytics from Morningstar. Copilot can summarize performance, fundamentals, and analyst views.',
    tools: ['Search securities', 'Get quote', 'Get fund rating', 'Get fundamentals', 'List holdings', 'Get performance', 'Compare funds'],
    developer: 'Morningstar',
  },
  'PitchBook': {
    about: 'Private market, VC, and PE deal data. Copilot can research companies, deals, investors, and valuations across private markets.',
    tools: ['Search companies', 'Get company', 'Search deals', 'Get deal', 'List investors', 'Get valuations', 'List comparables'],
    developer: 'Morningstar',
  },
  'Daloopa': {
    about: 'Automated financial data extraction from filings and models. Copilot can pull granular fundamentals and historical line items.',
    tools: ['Search companies', 'Get financials', 'Get line item', 'Get historicals', 'List filings', 'Get model data', 'Get segments'],
    developer: 'Daloopa',
  },
  'Fitch Solutions': {
    about: 'Credit ratings, macro research, and country risk from Fitch. Copilot can reference ratings and summarize economic outlooks.',
    tools: ['Search entities', 'Get credit rating', 'Get country risk', 'Get macro data', 'Get research', 'Get forecast', 'Get outlook'],
    developer: 'Fitch Solutions',
  },
  'RxNorm': {
    about: 'Standardized drug names, codes, and clinical mappings from the NIH. Copilot can normalize medications and map between vocabularies.',
    tools: ['Search drugs', 'Get RxCUI', 'Get drug name', 'Get related drugs', 'Map to NDC', 'Get ingredients', 'Get interactions'],
    developer: 'U.S. National Library of Medicine',
  },
  'Synapse.org': {
    about: 'Open biomedical research data and collaborative analysis tools from Sage Bionetworks. Copilot can find datasets and reference study metadata.',
    tools: ['Search datasets', 'Get dataset', 'Get file', 'List projects', 'Get metadata', 'List tables', 'Query table'],
    developer: 'Sage Bionetworks',
  },
  'DrugBank': {
    about: 'Drug, target, pathway, and interaction reference data. Copilot can look up pharmacology and check drug interactions.',
    tools: ['Search drugs', 'Get drug', 'Get interactions', 'Get targets', 'Search by indication', 'Get pharmacology', 'Get identifiers'],
    developer: 'DrugBank',
  },
  'DrugData': {
    about: 'Medicare and Medicaid drug pricing and coverage data from CMS. Copilot can look up spending, pricing, and coverage details.',
    tools: ['Search drugs', 'Get pricing', 'Get spending', 'Get coverage', 'List plans', 'Get NADAC', 'Compare drugs'],
    developer: 'Centers for Medicare & Medicaid Services',
  },
  'FdaSafety': {
    about: 'FDA drug safety, labeling, and adverse event data. Copilot can look up warnings, recalls, and reported events.',
    tools: ['Search drugs', 'Get label', 'Get adverse events', 'List recalls', 'Get warnings', 'Get enforcement', 'Get boxed warning'],
    developer: 'U.S. Food & Drug Administration',
  },
  'Courtroom5': {
    about: 'Litigation guidance and case preparation for self-represented users. Copilot can help organize a case and reference procedure.',
    tools: ['Search guidance', 'Get case step', 'List deadlines', 'Get document template', 'Get procedure', 'Track case', 'Get checklist'],
    developer: 'Courtroom5',
  },
  'Descrybe Legal Engine': {
    about: 'Search, summarize, and cite case law opinions. Copilot can find relevant decisions and explain holdings in plain language.',
    tools: ['Search case law', 'Get opinion', 'Summarize case', 'Get citation', 'Find similar cases', 'Filter by jurisdiction', 'Get holding'],
    developer: 'Descrybe.ai',
  },
  'Melon': {
    about: 'Reference music catalog, charts, artists, and playlists from Melon. Copilot can look up tracks and summarize charts.',
    tools: ['Search tracks', 'Get track', 'Get artist', 'List charts', 'Get album', 'Get playlist', 'Find similar'],
    developer: 'Kakao',
  },
  'Kindora Funder Discovery': {
    about: 'Discover grant funders, opportunities, and eligibility matches for nonprofits. Copilot can surface funders and summarize fit.',
    tools: ['Search funders', 'Get funder', 'Match opportunities', 'Get eligibility', 'List grants', 'Get deadline', 'Save prospect'],
    developer: 'Kindora',
  },
  'AllTrails': {
    about: 'Look up trails, hikes, and outdoor routes with reviews and conditions. Copilot can find routes and summarize difficulty and terrain.',
    tools: ['Search trails', 'Get trail', 'List reviews', 'Get difficulty', 'Get elevation', 'Find nearby', 'Get conditions'],
    developer: 'AllTrails',
  },
  'BoardWise': {
    about: 'Board governance, meeting prep, and director insights. Copilot can organize materials and summarize board activity.',
    tools: ['List meetings', 'Get agenda', 'Get board pack', 'List members', 'Get minutes', 'Track action items', 'Search documents'],
    developer: 'BoardWise',
  },
  'Google Calendar': {
    about: 'Look up events, meetings, schedules, and availability. Copilot can check your calendar and help find open times.',
    tools: ['List events', 'Get event', 'Create event', 'Update event', 'Find free time', 'Get attendees', 'List calendars'],
    developer: 'Google',
  },
  'Malwarebytes': {
    about: 'Reference threat scans, detections, and endpoint security status. Copilot can summarize scan results and flagged threats.',
    tools: ['List scans', 'Get scan', 'List detections', 'Get threat', 'Get device status', 'List quarantine', 'Run scan'],
    developer: 'Malwarebytes',
  },
  'Tripadvisor': {
    about: 'Reviews and ratings for hotels, restaurants, and attractions. Copilot can look up places and summarize traveler feedback.',
    tools: ['Search places', 'Get place', 'Get reviews', 'Get rating', 'List photos', 'Find nearby', 'Compare places'],
    developer: 'Tripadvisor',
  },
  'Turkish Airlines': {
    about: 'Look up flights, bookings, schedules, and status. Copilot can check itineraries and flight details on your behalf.',
    tools: ['Search flights', 'Get flight status', 'Get booking', 'List itineraries', 'Get schedule', 'Get baggage rules', 'Get fare'],
    developer: 'Turkish Airlines',
  },
  'ZipRecruiter': {
    about: 'Search jobs, candidates, applications, and hiring activity. Copilot can find roles and summarize applicant pipelines.',
    tools: ['Search jobs', 'Get job', 'List candidates', 'Get candidate', 'List applications', 'Post job', 'Search resumes'],
    developer: 'ZipRecruiter',
  },
  'Smartsheet': {
    about: 'Reference sheets, projects, tasks, reports, and workflows. Copilot can summarize status and update rows on your behalf.',
    tools: ['List sheets', 'Get sheet', 'Add row', 'Update row', 'Search', 'Get reports', 'Get attachments'],
    developer: 'Smartsheet',
  },
  'Google Drive': {
    about: 'Search documents, sheets, and slides in your Drive. Copilot can find files and summarize their contents.',
    tools: ['Search files', 'Get file', 'List folders', 'Get document text', 'Export file', 'Share file', 'Get metadata'],
    developer: 'Google',
  },
} as const;

function sourcesModal(): string {
  return [
    '<div class="src-overlay" id="srcOverlay">',
    '<div class="srcm" role="dialog" aria-label="Change sources">',
    '<div class="srcm__hdr"><span class="srcm__title">Change sources</span>',
    '<div class="srcm__hdr-actions">',
    '<button class="srcm__manage" id="srcManage">' + ico('settings-20-regular') + '<span>Manage sources</span></button>',
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
    '<div class="stg__sechead-sticky">',
    '<div class="stg__sechead-row"><div class="stg__sechead">Sources</div>',
    '<div class="stg__tools">',
    '<div class="stg__flt" id="stgFlt"><button class="stg__filter" id="stgFilterBtn" aria-haspopup="menu" aria-expanded="false"><span id="stgFilterLabel">Filter by</span>' + ico('chevron-down-20-regular') + '</button>'
    + '<div class="stg__fmenu" role="menu">' + ['All', 'Recommended', 'Commerce & Shopping', 'Communication', 'Consumer Health', 'Creative', 'Data & Analytics', 'Development tools', 'Education', 'Financial Services', 'Health & Life Sciences', 'Healthcare', 'Legal', 'Media', 'Nonprofit', 'Other'].map(function (c) { return '<button class="stg__fitem' + (c === 'All' ? ' stg__fitem--sel' : '') + '" data-cat="' + c + '">' + c + '<span class="stg__fcheck">' + STG_CHECK_SVG + '</span></button>'; }).join('') + '</div></div>',
    '<div class="stg__search-sm">' + ico('search-20-regular') + '<input type="text" id="stgSearch" placeholder="Search" aria-label="Search sources"/></div>',
    '</div></div>',
    '<div class="stg__secdesc">Add and manage the sources Copilot uses to find and retrieve content for you</div>',
    '</div>',
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
    '<div class="ad__head">',
    '<div class="ad__top">',
    '<span class="ad__logo" id="adPartner"></span>',
    '<span class="ad__name" id="adName2">Connect</span>',
    '<button class="ad__close" id="adCancel" aria-label="Close">' + ico('dismiss-20-regular') + '</button>',
    '</div>',
    '<p class="ad__body" id="adBody"></p>',
    '</div>',
    '<div class="ad__sec" id="adSync" hidden>',
    '<div class="ad__sech">Continuous sync</div>',
    '<p class="ad__secb" id="adSyncBody"></p>',
    '</div>',
    '<div class="ad__sec">',
    '<div class="ad__sech">Skills</div>',
    '<div class="ad__chips" id="adSkills"></div>',
    '</div>',
    '<div class="ad__meta">',
    '<div class="ad__metacol"><span class="ad__metal">Developer</span><a class="ad__metav ad__link" id="adDev" href="#" onclick="return false">\u2014</a></div>',
    '<div class="ad__metacol"><span class="ad__metal">Category</span><span class="ad__metav" id="adCat">\u2014</span></div>',
    '<div class="ad__metacol"><span class="ad__metal" id="adLinksLbl">More info</span><span class="ad__metav"><a class="ad__link" href="#" onclick="return false">Privacy Policy</a>, <a class="ad__link" href="#" onclick="return false">Terms of Service</a></span></div>',
    '</div>',
    '<div class="ad__sec" id="adWs" hidden>',
    '<div class="ad__sech">Organisation\u2019s Workspace</div>',
    '<p class="ad__secb" id="adWsHint"></p>',
    '<div class="ad__input"><input id="adUscInput" type="text" placeholder="https://&lt;your-company&gt;.atlassian.net/..." aria-label="Workspace URL"/></div>',
    '</div>',
    '<div class="ad__footer">',
    '<button class="ad-btn ad-btn--primary" id="adContinue">Continue</button>',
    '</div>',
    '</div></div>',
  ].join('');
}

// ─── Disconnect confirmation (USC connectors) — Figma node 3283:153722 ─
function disconnectModal(): string {
  return [
    '<div class="ad-overlay" id="dcOverlay">',
    '<div class="ad" role="dialog" aria-label="Disconnect source">',
    '<div class="ad__text">',
    '<div class="ad__header"><div class="ad__title" id="dcTitle">Disconnect?</div></div>',
    '<div class="dc__logo" id="dcLogo"></div>',
    '<div class="dc__body"><p id="dcBody1">This will remove your personal data from Copilot. Re-connecting may take a long time to complete.</p><p id="dcBody2">You can still continue old chats that reference this content.</p></div>',
    '</div>',
    '<div class="ad__footer">',
    '<button class="ad-btn ad-btn--subtle" id="dcCancel">Cancel</button>',
    '<button class="ad-btn ad-btn--danger" id="dcConfirm">Disconnect</button>',
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
.nav__body::-webkit-scrollbar { width: 8px; }
.nav__body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 9999px; }
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
.shell--convo .thread::-webkit-scrollbar { width: 8px; }
.shell--convo .thread::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 9999px; }
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
.sp__body::-webkit-scrollbar { width: 8px; }
.sp__body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 9999px; }
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
.pl__content::-webkit-scrollbar { width: 8px; }
.pl__content::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 9999px; }
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
.srcm__list { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow-y: auto; overflow-x: hidden; margin: 0 -4px; padding: 0 4px; scrollbar-width: thin; scrollbar-color: #6f6f6f transparent; }
.srcm__list::-webkit-scrollbar { width: 10px; }
.srcm__list::-webkit-scrollbar-track { background: transparent; }
.srcm__list::-webkit-scrollbar-thumb { background: #6f6f6f; border-radius: 9999px; border: 4px solid transparent; background-clip: content-box; min-height: 24px; }
.srcm__list:hover::-webkit-scrollbar-thumb { border-width: 2px; }
.srcm__row { height: 56px; display: flex; align-items: center; flex-shrink: 0; border-bottom: 1px solid rgba(189,189,189,0.5); }
.srcm__inner { flex: 1; display: flex; align-items: center; gap: 6px; min-width: 0; padding: 10px 12px; border-radius: 12px; background: rgba(36,36,36,0); transition: background 0.1s; }
.srcm__inner:hover { background: rgba(36,36,36,0.04); }
.srcm__logo { width: 20px; height: 20px; border-radius: 5px; overflow: hidden; flex-shrink: 0; display: inline-flex; }
.srcm__logo img { width: 100%; height: 100%; object-fit: cover; }
.srcm__logo--glyph { background: none; align-items: center; justify-content: center; color: #242424; }
.srcm__logo--glyph svg { width: 20px; height: 20px; }
.srcm__label { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; white-space: nowrap; flex: 0 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.srcm__spacer { flex: 1 1 auto; min-width: 4px; }
.srcm__inner .badge { margin-left: 2px; }
.srcm__meta { flex-shrink: 0; font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; }
.srcm__connect { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; background: none; border: none; padding: 4px 8px; border-radius: 8px; cursor: pointer; flex-shrink: 0; }
.srcm__connect:hover { background: rgba(36,36,36,0.04); }
.srcm__chev { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; margin-left: 6px; padding: 4px; border: none; border-radius: 8px; background: transparent; color: #6f6f6f; flex-shrink: 0; cursor: pointer; transition: background 0.1s, color 0.1s; }
.srcm__chev:hover { background: rgba(36,36,36,0.06); color: #242424; }
.srcm__chev svg { width: 20px; height: 20px; }
.srcm__tgl { width: 32px; height: 16px; border-radius: 9999px; position: relative; cursor: pointer; flex-shrink: 0; border: 1px solid transparent; transition: background 0.15s, border-color 0.15s; }
.srcm__thumb { width: 12px; height: 12px; border-radius: 9999px; position: absolute; top: 50%; transform: translateY(-50%); transition: left 0.15s, background 0.15s; }
.srcm__tgl--on { background: #242424; }
.srcm__tgl--on .srcm__thumb { background: #fff; left: 18px; }
.spin { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; flex-shrink: 0; }
.spin svg { width: 20px; height: 20px; }
.spin__t { fill: none; stroke: rgba(0,0,0,0.10); stroke-width: 2; }
.spin__i { fill: none; stroke: #242424; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 13 50; transform-origin: 10px 10px; animation: dv2spin 0.85s linear infinite; }
@keyframes dv2spin { to { transform: rotate(360deg); } }
.syncstat { position: relative; display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0; outline: none; }
.syncstat__txt { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; }
.syncstat__tip { position: fixed; left: 0; top: 0; width: 224px; background: #fff; color: #242424; font-size: 12px; line-height: 16px; padding: 8px 10px; border-radius: 8px; box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.14); opacity: 0; pointer-events: none; transition: opacity 0.12s; z-index: 300; }
.syncstat__tip.is-show { opacity: 1; }
.syncstat__tip::after { content: ''; position: absolute; left: var(--beak, 50%); top: calc(100% - 5px); width: 10px; height: 10px; background: #fff; transform: translateX(-50%) rotate(45deg); border-radius: 2px; box-shadow: 2px 2px 3px rgba(0,0,0,0.06); }
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
.stg__content { flex: 1; min-width: 0; overflow-y: auto; overflow-x: hidden; scrollbar-width: thin; scrollbar-color: #6f6f6f transparent; }
.stg__content::-webkit-scrollbar { width: 10px; }
.stg__content::-webkit-scrollbar-track { background: transparent; }
.stg__content::-webkit-scrollbar-thumb { background: #6f6f6f; border-radius: 9999px; border: 4px solid transparent; background-clip: content-box; min-height: 24px; }
.stg__content:hover::-webkit-scrollbar-thumb { border-width: 2px; }
.stg__sechead { font-size: 16px; line-height: 22px; font-weight: 600; color: #242424; }
.stg__sechead-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.stg__sechead-sticky { position: sticky; top: 0; z-index: 3; background: #fff; }
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
.stg__fmenu { position: absolute; top: calc(100% + 4px); left: 0; min-width: 200px; max-height: 224px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: #c7c7c7 transparent; background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 12px; padding: 4px; box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08); opacity: 0; transform: translateY(-4px); pointer-events: none; transition: opacity 0.12s, transform 0.12s; z-index: 40; }
.stg__fmenu::-webkit-scrollbar { width: 8px; }
.stg__fmenu::-webkit-scrollbar-thumb { background: #c7c7c7; border-radius: 9999px; }
.stg__fitem { flex-shrink: 0; }
.stg__flt.is-open .stg__fmenu { opacity: 1; transform: translateY(0); pointer-events: auto; }
.stg__fitem { display: flex; align-items: center; gap: 6px; width: 100%; height: 36px; padding: 8px 12px; border: none; background: transparent; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; cursor: pointer; text-align: left; white-space: nowrap; transition: background 0.1s; }
.stg__fitem:hover { background: rgba(36,36,36,0.04); }
.stg__fitem--sel { background: #ebebeb; font-weight: 625; }
.stg__fcheck { width: 16px; height: 16px; margin-left: auto; color: #242424; display: none; }
.stg__fitem--sel .stg__fcheck { display: inline-flex; }
.stg__secdesc { font-size: 14px; line-height: 20px; font-weight: 420; color: #5d5d5d; margin: 0 0 4px; padding: 0 0 16px; border-bottom: 1px solid #dedede; }
.stg__row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 12px 4px; border: none; border-bottom: 1px solid #dedede; background: transparent; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; }
.stg__row:hover { background: rgba(36,36,36,0.03); }
.stg__row--browse { cursor: default; }
.stg__row--browse:hover { background: transparent; }
.stg__rowicon { width: 20px; height: 20px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; border-radius: 5px; overflow: hidden; }
.stg__rowicon img { width: 20px; height: 20px; object-fit: cover; display: block; }
.stg__gi { display: inline-flex; width: 20px; height: 20px; color: #242424; }
.stg__gi svg { width: 20px; height: 20px; }
.stg__rowmeta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.stg__rowname { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; }
.stg__namerow { display: flex; align-items: center; gap: 6px; min-width: 0; }
.badge { display: inline-flex; align-items: center; justify-content: center; gap: 2px; height: 16px; padding: 0 4px; border-radius: 9999px; background: rgba(0,0,0,0.08); color: #242424; font-size: 10px; line-height: 14px; font-weight: 400; font-variation-settings: 'opsz' 8, 'wght' 400; white-space: nowrap; flex-shrink: 0; }
.badge--brand { background: rgba(25, 103, 210, 0.2); color: #1967d2; }
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
.stgd__admin { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 4px; font-size: 14px; line-height: 20px; color: #616161; white-space: nowrap; }
.stgd__admin svg { width: 20px; height: 20px; color: #616161; flex-shrink: 0; }
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
.stgd__chip--skill { cursor: pointer; transition: background 0.1s; }
.stgd__chip--skill:hover { background: rgba(0,0,0,0.09); }
.stgd__mcpcard { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border: 1px solid #dedede; border-radius: 12px; background: #fff; }
.stgd__mcpico { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; color: #242424; flex: 0 0 auto; }
.stgd__mcpico svg { width: 20px; height: 20px; }
.stgd__mcpmeta { display: flex; flex-direction: column; gap: 2px; flex: 1 1 auto; min-width: 0; }
.stgd__mcpname { font-size: 14px; line-height: 20px; font-weight: 600; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.stgd__mcpdesc { font-size: 13px; line-height: 18px; color: #5d5d5d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.stgd__meta { display: flex; flex-direction: column; gap: 16px; }
.stgd__row { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.stgd__label { font-size: 14px; line-height: 20px; color: #5d5d5d; }
.stgd__value { font-size: 14px; line-height: 20px; color: #242424; }
.stgd__link { display: inline-flex; align-items: center; gap: 4px; font-size: 14px; line-height: 20px; color: #242424; text-decoration: none; cursor: pointer; }
.stgd__link:hover { text-decoration: underline; }
.stgd__link svg { width: 16px; height: 16px; color: #6f6f6f; }
.stgd__links2 { display: inline-flex; flex-wrap: wrap; gap: 12px; }

/* ─── Auth Dialog (Connect consent) ─── */
.ad-overlay { position: fixed; inset: 0; z-index: 220; background: rgba(0,0,0,0.15); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); display: none; align-items: center; justify-content: center; }
.ad-overlay.is-open { display: flex; }
.ad { width: 640px; max-width: calc(100vw - 48px); max-height: calc(100vh - 48px); overflow-y: auto; background: #fff; border-radius: 24px; padding: 32px 40px; display: flex; flex-direction: column; gap: 24px;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.15), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08); }
.ad__head { display: flex; flex-direction: column; gap: 8px; }
.ad__text { display: flex; flex-direction: column; gap: 12px; }
.ad__header { display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }
.ad__title { font-size: 24px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.ad__top { display: flex; align-items: center; gap: 12px; }
.ad__logo { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; flex-shrink: 0; }
.ad__logo img { width: 40px; height: 40px; object-fit: contain; border-radius: 8px; display: block; }
.ad__logo svg { width: 40px; height: 40px; }
.ad__name { flex: 1 1 auto; font-size: 28px; line-height: 36px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.ad__close { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; background: transparent; border-radius: 9999px; color: #242424; cursor: pointer; flex-shrink: 0; transition: background 0.1s; }
.ad__close:hover { background: rgba(36,36,36,0.04); }
.ad__close svg { width: 20px; height: 20px; }
.ad__body { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; margin: 0; }
.ad__sec { display: flex; flex-direction: column; gap: 8px; }
.ad__sec[hidden] { display: none; }
.ad__sech { font-size: 16px; line-height: 24px; font-weight: 600; color: #242424; }
.ad__secb { font-size: 14px; line-height: 20px; font-weight: 420; color: #616161; margin: 0; }
.ad__chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.ad__more { color: #616161; cursor: default; }
.ad__rule { width: 100%; height: 1px; border: 0; background: #e0e0e0; margin: 0; }
.ad__meta { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; border-top: 1px solid #e0e0e0; padding-top: 16px; }
.ad__metacol { display: flex; flex-direction: column; gap: 4px; flex: 0 0 auto; min-width: 0; }
.ad__metal { font-size: 14px; line-height: 20px; color: #616161; }
.ad__metav { font-size: 14px; line-height: 20px; color: #242424; white-space: nowrap; }
.ad__input { width: 100%; }
.ad__input input { width: 100%; height: 40px; border: 1px solid #242424; border-radius: 12px; padding: 8px 12px; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; background: transparent; outline: none; box-sizing: border-box; }
.ad__input input::placeholder { color: rgba(0,0,0,0.56); }
.ad__link { color: #242424; text-decoration: none; cursor: pointer; }
.ad__link:hover { color: #181818; text-decoration: underline; text-decoration-thickness: 1px; text-underline-position: from-font; text-decoration-skip-ink: none; }
.ad__footer { display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 8px; }
.ad-btn { display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 6px 10px; border: none; border-radius: 12px; cursor: pointer; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; transition: background 0.1s; }
.ad-btn--subtle { background: transparent; color: #242424; }
.ad-btn--subtle:hover { background: rgba(36,36,36,0.04); }
.ad-btn--primary { background: #242424; color: #fff; }
.ad-btn--primary:hover { background: #2b2b2b; }
.ad-btn--danger { background: #fff1f3; color: #a62147; }
.ad-btn--danger:hover { background: #ffe3e9; }
.dc__logo { display: flex; align-items: center; justify-content: center; padding: 20px 0; }
.dc__logo img { width: 48px; height: 48px; object-fit: contain; border-radius: 8px; display: block; }
.dc__body { display: flex; flex-direction: column; gap: 16px; font-size: 16px; line-height: 22px; font-weight: 420; color: #242424; }

/* ─── Connector Skills: composer attach chips + sources sub-view ─── */
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
#srcMainView { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 16px; }
#srcMainView[hidden] { display: none; }
.srcm__skillsview { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: 8px; }
.srcm__skillsview[hidden] { display: none; }
.srcm__subnav { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 32px; padding: 6px 4px; border: none; background: transparent; cursor: pointer; text-align: left; border-radius: 8px; color: #242424; transition: background 0.1s; }
.srcm__subnav:hover { background: rgba(36,36,36,0.04); }
.srcm__subnav svg { width: 20px; height: 20px; flex-shrink: 0; }
.srcm__subname { font-size: 14px; line-height: 20px; font-weight: 600; color: #242424; }
.srcm__skilllist { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.14) transparent; }
.srcm__skill { position: relative; display: flex; align-items: flex-start; gap: 10px; padding: 10px 8px; cursor: pointer; border-radius: 8px; transition: background 0.1s; }
.srcm__skill::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: rgba(189,189,189,0.5); }
.srcm__skill:last-child::after { display: none; }
.srcm__skill:hover { background: rgba(36,36,36,0.04); }
.srcm__skico { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; color: #616161; flex-shrink: 0; margin-top: 1px; }
.srcm__skico svg { width: 20px; height: 20px; }
.srcm__skmeta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.srcm__skname { font-size: 14px; line-height: 20px; font-weight: 600; font-variation-settings: 'opsz' 8, 'wght' 600; color: #242424; }
.srcm__skdesc { font-size: 12px; line-height: 16px; font-weight: 420; color: #5d5d5d; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }

/* ─── CIQ palette (below composer) + modal variant ─── */
.ciq { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); width: 100%; max-width: 656px; margin-top: 12px; display: flex; flex-direction: column; gap: 8px; align-items: flex-start; z-index: 60; background: #fff; border-radius: 16px; box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 8px 16px 0 rgba(0,0,0,0.06); padding: 12px; }
.ciq[hidden] { display: none; }
.zs.ciq-open .zs__chips, .zs.ciq-open .zs__list { display: none; }
.ciq__tabs { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.ciq__tab { display: inline-flex; align-items: center; padding: 6px 12px; border: none; border-radius: 12px; background: transparent; color: #242424; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; cursor: pointer; transition: background 0.1s; white-space: nowrap; }
.ciq__tab:hover { background: rgba(36,36,36,0.04); }
.ciq__tab--sel { background: #242424; color: #fff; }
.ciq__tab--sel:hover { background: #313131; }
.ciq__list { display: flex; flex-direction: column; width: 100%; max-height: 236px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #c7c7c7 transparent; }
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

/* ─── Settings L2: Skills section + skill detail (L3) ─── */
.stgd__skills { display: flex; flex-direction: column; gap: 8px; }
.stgd__skmore { display: contents; }
.stgd__skmore[hidden] { display: none; }
.stgd__skill { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 10px 14px; border: 1px solid #dedede; border-radius: 12px; background: #fff; cursor: pointer; transition: background 0.1s, border-color 0.1s; }
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
.stgd__skhead { display: flex; align-items: center; gap: 12px; padding: 4px 0 18px; border-bottom: 1px solid #dedede; }
.stgd__skhico { width: 20px; height: 20px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; color: #616161; }
.stgd__skhico svg { width: 20px; height: 20px; }
.stgd__skhmeta { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.stgd__skhname { font-size: 16px; line-height: 28px; font-weight: 600; font-variation-settings: 'opsz' 8, 'wght' 600; color: #242424; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.stgd__skhsub { font-size: 12px; line-height: 16px; color: #242424; }
.stgd__skhact { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.stgd__skhchat { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 9999px; color: #242424; cursor: pointer; transition: background 0.1s; }
.stgd__skhchat:hover { background: rgba(36,36,36,0.04); }
.stgd__skhchat svg { width: 20px; height: 20px; }
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
.stgd__instrul { margin: 0; padding: 0 0 0 18px; list-style: disc; display: flex; flex-direction: column; gap: 2px; }
.stgd__instrul li { font-size: 14px; line-height: 20px; color: #242424; }
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
  '  var zsLists = ' + JSON.stringify(zsLists) + ';',
  '  var SRC_PROMPT_LISTS = ' + JSON.stringify(srcPromptLists) + ';',
  '  var SRC_PROMPTS_RAW = ' + JSON.stringify(SRC_PROMPTS) + ';',
  '  var MS_LOGO = ' + JSON.stringify(MS_LOGO) + ';',
  "  var nav = document.getElementById('nav');",
  "  var toggle = document.getElementById('navToggle');",
  "  if (toggle) toggle.addEventListener('click', function(){ nav.classList.toggle('nav--collapsed'); });",
  "  var cmp = document.getElementById('cmp'); var ta = document.getElementById('cmpTa');",
  "  if (ta) ta.addEventListener('input', function(){ syncSend(); });",
  "  var CIQ_TABS = " + JSON.stringify(CIQ_TABS) + ";",
  "  var CIQ_MTABS = " + JSON.stringify(CIQ_MTABS) + ";",
  "  var CIQ_CHEV = " + JSON.stringify(CIQ_CHEV) + ";",
  "  var ciqMenu = document.getElementById('ciqMenu'); var ciqTabs = document.getElementById('ciqTabs'); var ciqList = document.getElementById('ciqList'); var zsEl = document.querySelector('.zs');",
  "  var ciqmOv = document.getElementById('ciqmOverlay'); var ciqmTabs = document.getElementById('ciqmTabs'); var ciqmList = document.getElementById('ciqmList'); var ciqmSearch = document.getElementById('ciqmSearch'); var ciqmTab = 'all'; var ciqSlash = false;",
  "  function ciqAttach(r){ var wrap = document.getElementById('cmpAttach'); if (wrap){ var key = r.title; if (!wrap.querySelector('[data-ciq=\"' + key + '\"]')){ var el = document.createElement('div'); el.className = 'cmp-attach'; el.setAttribute('data-ciq', key); el.setAttribute('title', r.title); el.innerHTML = '<span class=\"cmp-attach__ico\">' + r.icon + '</span><span class=\"cmp-attach__meta\"><span class=\"cmp-attach__name\">' + r.title + '</span><span class=\"cmp-attach__desc\">' + r.sub + '</span></span><button class=\"cmp-attach__x\" aria-label=\"Remove\">' + X12_SVG + '</button>'; el.querySelector('.cmp-attach__x').addEventListener('click', function(e){ e.stopPropagation(); el.remove(); syncSend(); }); wrap.appendChild(el); } } closeCiq(); closeCiqModal(); syncSend(); if (ta) ta.focus(); }",
  "  function ciqRowHtml(r){ var trail = r.chev ? ('<span class=\"ciq__trail\">' + r.sub + '</span><span class=\"ciq__chev\">' + CIQ_CHEV + '</span>') : ('<span class=\"ciq__trail\">' + r.sub + '</span>'); var body = r.kind === 'skill' ? '<span class=\"ciq__cbody\"><span class=\"ciq__title\">' + r.title + '</span><span class=\"ciq__desc\">' + r.sub + '</span></span>' : '<span class=\"ciq__crow\"><span class=\"ciq__label\">' + r.title + '</span>' + trail + '</span>'; return '<button class=\"ciq__item\"><span class=\"ciq__ico\">' + r.icon + '</span>' + body + '</button>'; }",
  "  function ciqSkillRows(){ var out = []; if (typeof SRC === 'undefined' || !SRC) return out; SRC.forEach(function(s){ if (s.state !== 'on' && s.state !== 'chevron') return; var sk = (typeof SRC_SKILLS !== 'undefined' && SRC_SKILLS[s.n]) || []; sk.forEach(function(k){ out.push({ icon: s.stgLogo, title: '/' + k.name, sub: k.desc, kind: 'skill' }); }); }); return out; }",
  "  function ciqRender(data, id, tabsEl, listEl, q){ if (!listEl || !tabsEl) return id; var tb = null; for (var i=0;i<data.length;i++){ if (data[i].id===id) tb=data[i]; } if (!tb) tb = data[0]; tabsEl.innerHTML = data.map(function(x){ return '<button class=\"ciq__tab' + (x.id===tb.id?' ciq__tab--sel':'') + '\" data-tab=\"' + x.id + '\">' + x.label + '</button>'; }).join(''); var rows = tb.rows; if (tb.id === 'skills') rows = ciqSkillRows(); else if (tb.id === 'all') { var _sk = ciqSkillRows(); rows = (_sk.length ? [_sk[0]] : []).concat(tb.rows.filter(function(r){ return r.kind !== 'skill'; })); } if (q){ var ql = q.toLowerCase(); rows = rows.filter(function(r){ return (r.title + ' ' + r.sub).toLowerCase().indexOf(ql) !== -1; }); } listEl.innerHTML = rows.length ? rows.map(ciqRowHtml).join('') : '<div class=\"ciqm__empty\">No results.</div>'; listEl.querySelectorAll('.ciq__item').forEach(function(it, i){ it.addEventListener('click', function(){ ciqAttach(rows[i]); }); }); return tb.id; }",
  "  function openCiq(id){ if (!ciqMenu) return; ciqRender(CIQ_TABS, id || 'all', ciqTabs, ciqList); ciqMenu.hidden = false; if (zsEl) zsEl.classList.add('ciq-open'); }",
  "  function closeCiq(){ if (!ciqMenu) return; ciqMenu.hidden = true; ciqSlash = false; if (zsEl) zsEl.classList.remove('ciq-open'); }",
  "  function ciqmPaint(){ ciqmTab = ciqRender(CIQ_MTABS, ciqmTab, ciqmTabs, ciqmList, ciqmSearch ? ciqmSearch.value.trim() : ''); }",
  "  function openCiqModal(){ if (!ciqmOv) return; ciqmTab = 'all'; if (ciqmSearch) ciqmSearch.value = ''; ciqmPaint(); ciqmOv.classList.add('is-open'); if (ciqmSearch) setTimeout(function(){ ciqmSearch.focus(); }, 20); }",
  "  function closeCiqModal(){ if (ciqmOv) ciqmOv.classList.remove('is-open'); }",
  "  if (ciqTabs) ciqTabs.addEventListener('click', function(e){ var t = e.target.closest('.ciq__tab'); if (t) ciqRender(CIQ_TABS, t.getAttribute('data-tab'), ciqTabs, ciqList); });",
  "  if (ciqmTabs) ciqmTabs.addEventListener('click', function(e){ var t = e.target.closest('.ciq__tab'); if (t){ ciqmTab = t.getAttribute('data-tab'); ciqmPaint(); } });",
  "  var ciqmCloseBtn = document.getElementById('ciqmClose'); if (ciqmCloseBtn) ciqmCloseBtn.addEventListener('click', closeCiqModal); if (ciqmOv) ciqmOv.addEventListener('click', function(e){ if (e.target === ciqmOv) closeCiqModal(); }); if (ciqmSearch) ciqmSearch.addEventListener('input', ciqmPaint);",
  "  if (ta) ta.addEventListener('input', function(){ var v = ta.value; var idx = v.lastIndexOf('/'); var ok = idx !== -1 && (idx === 0 || v.charAt(idx-1) === ' ') && v.slice(idx).indexOf(' ') === -1; if (ok) openCiq('skills'); else closeCiq(); });",
  "  document.addEventListener('click', function(e){ if (ciqMenu && !ciqMenu.hidden){ if (!ciqMenu.contains(e.target) && e.target !== ta) closeCiq(); } });",
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
  "  document.querySelectorAll('#addMenu .addm__item').forEach(function(it){ it.addEventListener('click', function(){ cmp.classList.remove('is-am-open'); if (addBtn) addBtn.setAttribute('aria-expanded','false'); var lbl = it.querySelector('.addm__label'); if (lbl && lbl.textContent.trim() === 'Add content') openCiqModal(); }); });",
  "  var srcOv = document.getElementById('srcOverlay'); var changeDs = document.getElementById('changeDsBtn'); var srcClose = document.getElementById('srcClose');",
  "  if (changeDs && srcOv) changeDs.addEventListener('click', function(e){ e.stopPropagation(); closeSrcSkills(); srcOv.classList.add('is-open'); requestAnimationFrame(srcFill); });",
  "  if (srcClose) srcClose.addEventListener('click', function(){ srcOv.classList.remove('is-open'); });",
  "  var srcManage = document.getElementById('srcManage'); var stgOv = document.getElementById('stgOverlay'); var stgClose = document.getElementById('stgClose');",
  "  if (srcManage && stgOv) srcManage.addEventListener('click', function(){ srcOv.classList.remove('is-open'); stgOv.classList.add('is-open'); });",
  "  if (stgClose) stgClose.addEventListener('click', function(){ stgOv.classList.remove('is-open'); closeStgDetail(); });",
  "  if (stgOv) stgOv.addEventListener('click', function(e){ if (e.target === stgOv) { stgOv.classList.remove('is-open'); closeStgDetail(); } });",
  "  var stgSearch = document.getElementById('stgSearch'); var stgList = document.getElementById('stgList'); var stgEmpty = document.getElementById('stgEmpty'); var stgQuery = ''; var STG_CHEV = " + JSON.stringify(ico('chevron-right-20-regular')) + "; var SPINNER = '<span class=\"spin\" role=\"progressbar\" aria-label=\"Syncing\"><svg viewBox=\"0 0 20 20\"><circle class=\"spin__t\" cx=\"10\" cy=\"10\" r=\"8\"/><circle class=\"spin__i\" cx=\"10\" cy=\"10\" r=\"8\"/></svg></span>';",
  "  var STGD_MORE = " + JSON.stringify(ico('more-horizontal-20-regular')) + "; var STGD_SYNC = " + JSON.stringify(ico('arrow-sync-20-regular')) + "; var STGD_OPEN = " + JSON.stringify(ico('open-20-regular')) + "; var STGD_ADMIN = " + JSON.stringify(ico('shield-task-20-regular')) + "; var STGD_REPORT = " + JSON.stringify(ico('warning-20-regular')) + ";",
  "  var SRC_DETAIL = " + JSON.stringify(SRC_DETAIL) + ";",
  "  var stg = stgOv ? stgOv.querySelector('.stg') : null; var stgBack = document.getElementById('stgBack'); var stgMain = document.getElementById('stgMain'); var stgDetail = document.getElementById('stgDetail');",
  "  function stgdRow(label, valueHtml){ return '<div class=\"stgd__row\"><span class=\"stgd__label\">' + label + '</span>' + valueHtml + '</div>'; }",
  "  function mcpTopics(ts){ var verbs=['search','get','list','create','update','summarize','find','check','manage','send','add','assign','reply','compare','filter','renew','cancel','message','lookup','log','book','browse','pull','draft','track','review','schedule','sign','look']; var seen={}; var out=[]; (ts||[]).forEach(function(t){ var w=String(t).toLowerCase().split(' '); if (verbs.indexOf(w[0])>=0) w=w.slice(1); var n=w.join(' '); if(!n) return; var key=n.replace(/s$/,''); if(seen[key]) return; seen[key]=1; out.push(n); }); out=out.slice(0,4); if(!out.length) return 'core operations'; if(out.length===1) return out[0]; return out.slice(0,-1).join(', ') + ', and ' + out[out.length-1]; }",
  "  function closeStgDetail(){ stgSkillReturn = null; if (stgMain) stgMain.hidden = false; if (stgDetail){ stgDetail.hidden = true; stgDetail.innerHTML = ''; } if (stg) stg.classList.remove('is-detail'); }",
  "  function openStgDetail(name){ currentStgName = name; var item = SRC.filter(function(x){ return x.n === name; })[0]; if (!item || !stgDetail) return; var d = SRC_DETAIL[name] || {}; var about = d.about || item.desc; var tools = d.tools || ['Search', 'Get details', 'Summarize content', 'List items']; var developer = d.developer || name; var category = (item.cats && item.cats[0]) || 'Productivity'; var mcpName = name + ' MCP Server'; var mcpDesc = 'Remote MCP server providing ' + name + ' tools for ' + mcpTopics(tools) + '.'; var mcpGroup = 'mcp-' + (++stgVariantSeq); var wsUrl = item.usc ? (item.uscHost ? ('https://contoso.' + item.uscHost + '/') : (item.uscPh || 'https://contoso.example.com/')) : ''; var chips = tools.map(function(t){ return '<span class=\"stgd__chip\">' + t + '</span>'; }).join(''); var leadAction = item.tenant ? '<span class=\"stgd__admin\">' + STGD_ADMIN + 'Enabled by your admin</span>' : '<button class=\"stgd__disconnect\" id=\"stgdDisconnect\">Disconnect</button>'; var oflItem = item.tenant ? '<button class=\"stgd__oflitem\" id=\"stgdReport\">' + STGD_REPORT + 'Report issue</button>' : '<button class=\"stgd__oflitem\" id=\"stgdReconnect\">' + STGD_SYNC + 'Reconnect</button>'; var html = '<div class=\"stgd__id\"><span class=\"stgd__logo\">' + item.stgLogo + '</span><span class=\"stgd__name\">' + name + '</span><div class=\"stgd__actions\">' + leadAction + '<div class=\"stgd__ofl\" id=\"stgdOfl\"><button class=\"stgd__more\" id=\"stgdMoreBtn\" aria-haspopup=\"menu\" aria-expanded=\"false\" aria-label=\"More options\">' + STGD_MORE + '</button><div class=\"stgd__oflmenu\" role=\"menu\">' + oflItem + '</div></div></div></div><hr class=\"stgd__rule\"/><div class=\"stgd__sec\"><div class=\"stgd__sech\">About</div><p class=\"stgd__p\">' + about + '</p></div>' + (item.usc ? '<div class=\"stgd__sec\"><div class=\"stgd__sech\">Continuous sync</div><p class=\"stgd__p\">Your content is automatically synced, stored and kept up to date in Copilot. Syncing your content will make it accessible to your tenant admin. <a class=\"ad__link\" href=\"#\" onclick=\"return false\">Learn more</a></p></div>' : '<div data-variant-group=\"' + mcpGroup + '\" data-variant-label=\"MCP server\"><div data-variant=\"default\" data-variant-label-option=\"Default\" data-default></div><div data-variant=\"mcp\" data-variant-label-option=\"MCP variant\"><div class=\"stgd__sec\"><div class=\"stgd__sech\">MCP servers</div><div class=\"stgd__mcpcard\"><span class=\"stgd__mcpico\">' + MCP_ICON + '</span><span class=\"stgd__mcpmeta\"><span class=\"stgd__mcpname\">' + mcpName + '</span><span class=\"stgd__mcpdesc\">' + mcpDesc + '</span></span></div></div></div></div>') + (function(){ var _sk = SRC_SKILLS[name] || []; if (!_sk.length) return ''; var _pills = _sk.map(function(s){ return '<button class=\"stgd__chip stgd__chip--skill\" type=\"button\" data-skill=\"' + s.name + '\">/' + s.name + '</button>'; }).join(''); return '<div class=\"stgd__sec\"><div class=\"stgd__sech\">Skills</div><div class=\"stgd__chips\">' + _pills + '</div></div>'; })() + '<div class=\"stgd__sec\"><div class=\"stgd__sech\">Details</div><div class=\"stgd__meta\">' + stgdRow('Connected on', '<span class=\"stgd__value\">' + (d.connectedOn || 'May 14, 2026') + '</span>') + stgdRow('Account', '<span class=\"stgd__value\">elvia.atkins@contoso.com</span>') + (item.usc ? stgdRow('Workspace', '<span class=\"stgd__value\">' + wsUrl + '</span>') : '') + stgdRow('Developer', '<a class=\"stgd__link\" href=\"#\" onclick=\"return false\">' + developer + ' ' + STGD_OPEN + '</a>') + stgdRow('Category', '<span class=\"stgd__value\">' + category + '</span>') + stgdRow('More info', '<span class=\"stgd__links2\"><a class=\"stgd__link\" href=\"#\" onclick=\"return false\">Privacy Policy ' + STGD_OPEN + '</a><a class=\"stgd__link\" href=\"#\" onclick=\"return false\">Terms of service ' + STGD_OPEN + '</a></span>') + '</div></div>'; stgDetail.innerHTML = html; if (stgMain) stgMain.hidden = true; stgDetail.hidden = false; if (stg) stg.classList.add('is-detail'); var sc = document.querySelector('.stg__content'); if (sc) sc.scrollTop = 0; var mb = document.getElementById('stgdMoreBtn'); var ofl = document.getElementById('stgdOfl'); if (mb && ofl){ mb.addEventListener('click', function(e){ e.stopPropagation(); var o = ofl.classList.toggle('is-open'); mb.setAttribute('aria-expanded', o); }); ofl.querySelector('.stgd__oflmenu').addEventListener('click', function(e){ e.stopPropagation(); ofl.classList.remove('is-open'); mb.setAttribute('aria-expanded', false); }); } var dc = document.getElementById('stgdDisconnect'); if (dc) dc.addEventListener('click', function(){ if (item.usc){ openDisconnect(item.n, item.logoSrc); } else { item.state = 'connect'; stgPaint(); srcPaint(); updateSrcCount(); closeStgDetail(); } }); }",
  "  if (stgBack) stgBack.addEventListener('click', function(){ if (stgSkillReturn){ var s = stgSkillReturn; stgSkillReturn = null; openStgDetail(s); } else { closeStgDetail(); } });",
  "  document.addEventListener('click', function(){ var o = document.getElementById('stgdOfl'); if (o) o.classList.remove('is-open'); if (stgDetail) stgDetail.querySelectorAll('.stgd__skofl.is-open').forEach(function(x){ x.classList.remove('is-open'); }); });",
  "  if (stgDetail) stgDetail.addEventListener('click', function(e){ var _skp = e.target.closest('.stgd__chip--skill'); if (_skp){ e.stopPropagation(); var _skpn = _skp.getAttribute('data-skill'); var _skpsk = (SRC_SKILLS[currentStgName] || []).filter(function(x){ return x.name === _skpn; })[0]; if (_skpsk) openSkillDetail(currentStgName, _skpsk); return; } var mb = e.target.closest('.stgd__skmenu'); if (mb){ e.stopPropagation(); var ofl = mb.closest('.stgd__skofl'); var wasOpen = ofl.classList.contains('is-open'); stgDetail.querySelectorAll('.stgd__skofl.is-open').forEach(function(o){ o.classList.remove('is-open'); }); if (!wasOpen){ ofl.classList.add('is-open'); mb.setAttribute('aria-expanded','true'); } else { mb.setAttribute('aria-expanded','false'); } return; } var act = e.target.closest('.stgd__oflitem[data-act]'); if (act && act.closest('.stgd__skill')){ e.stopPropagation(); var card = act.closest('.stgd__skill'); var skn = card.getAttribute('data-skill'); var a = act.getAttribute('data-act'); stgDetail.querySelectorAll('.stgd__skofl.is-open').forEach(function(o){ o.classList.remove('is-open'); }); var sk = (SRC_SKILLS[currentStgName] || []).filter(function(x){ return x.name === skn; })[0]; if (!sk) return; if (a === 'try'){ if (stgOv) stgOv.classList.remove('is-open'); if (srcOv) srcOv.classList.remove('is-open'); addSkillAttach(currentStgName, sk); } else if (a === 'view'){ openSkillDetail(currentStgName, sk); } return; } var sm = e.target.closest('.stgd__showmore'); if (sm){ var wrap = sm.closest('.stgd__skills'); var more = wrap ? wrap.querySelector('.stgd__skmore') : null; if (more) more.hidden = false; sm.remove(); } });",
  "  function skillInstr(source, s){ return { about: s.desc, purpose: 'The /' + s.name + ' skill turns your ' + source + ' data into a ready-to-use result. It searches the relevant records, grounds everything it produces in what it finds, and cites the sources it used so you can verify the output before you act on it.', best: ['Ask Copilot to run /' + s.name + ' directly from a ' + source + ' conversation', 'Kick it off from a related ' + source + ' item, thread, or page', 'Chain it after a search so Copilot acts on exactly what it finds', 'Schedule it as a recurring digest, standup, or status update', 'Hand it to a teammate as a repeatable, shareable workflow'], setup: ['Connect ' + source + ' and sign in with an account that has access', 'Grant Copilot read access to the ' + source + ' data this skill needs', 'Choose the scope \u2014 which projects, channels, spaces, or folders to include', 'Pick a cadence: on demand, scheduled, or triggered by an event', 'Invoke it any time by typing /' + s.name + ' in the prompt box'] }; }",
  "  function openSkillDetail(source, s){ if (!stgDetail) return; var instr = skillInstr(source, s); var best = instr.best.map(function(b){ return '<li>' + b + '</li>'; }).join(''); var setup = instr.setup.map(function(b){ return '<li>' + b + '</li>'; }).join(''); var html = '<div class=\"stgd__skhead\"><span class=\"stgd__skhico\">' + SKILL_ICON + '</span><div class=\"stgd__skhmeta\"><span class=\"stgd__skhname\">/' + s.name + '</span><span class=\"stgd__skhsub\">Created by ' + source + '</span></div><div class=\"stgd__skhact\"><button class=\"stgd__skhchat\" id=\"skdChat\" aria-label=\"Add to chat\">' + SK_CHAT + '</button></div></div><div class=\"stgd__skabout\"><span class=\"stgd__skl\">About</span><p class=\"stgd__skabouttxt\" id=\"skdAbout\">' + instr.about + '</p><button class=\"stgd__skmore2\" id=\"skdAboutMore\" hidden><span class=\"stgd__skmore2t\">Show more</span></button></div><div class=\"stgd__skinstr\"><span class=\"stgd__skl\">Instructions</span><div class=\"stgd__instr\"><div class=\"stgd__instrsec\"><div class=\"stgd__instrh\">Purpose</div><p class=\"stgd__instrp\">' + instr.purpose + '</p></div><div class=\"stgd__instrsec\"><div class=\"stgd__instrh\">Best uses</div><ul class=\"stgd__instrul\">' + best + '</ul></div><div class=\"stgd__instrsec\"><div class=\"stgd__instrh\">Skill set up</div><ul class=\"stgd__instrul\">' + setup + '</ul></div></div></div>'; stgDetail.innerHTML = html; if (stgMain) stgMain.hidden = true; stgDetail.hidden = false; if (stg) stg.classList.add('is-detail'); stgSkillReturn = source; var sc = document.querySelector('.stg__content'); if (sc) sc.scrollTop = 0; var chatBtn = document.getElementById('skdChat'); if (chatBtn) chatBtn.addEventListener('click', function(){ if (stgOv) stgOv.classList.remove('is-open'); if (srcOv) srcOv.classList.remove('is-open'); addSkillAttach(source, s); }); var abT = document.getElementById('skdAbout'); var abM = document.getElementById('skdAboutMore'); if (abT && abM){ if (abT.scrollHeight > abT.clientHeight + 1) abM.hidden = false; abM.addEventListener('click', function(){ var op = abT.classList.toggle('is-expanded'); var lb = abM.querySelector('.stgd__skmore2t'); if (lb) lb.textContent = op ? 'Show less' : 'Show more'; }); } }",
  "  function stgRowHtml(item){ var isConnect = item.state === 'connect'; var isSync = item.state === 'syncing' || item.state === 'removing'; var trailing = isConnect ? '<button class=\"stg__connect\">Connect</button>' : (isSync ? syncTrailing(item) : '<span class=\"stg__chev\">' + STG_CHEV + '</span>'); var tag = (isConnect || isSync) ? 'div' : 'button'; var recBadge = (item.rec && isConnect) ? '<span class=\"badge\">Recommended</span>' : ''; var newBadge = (item.badge && isConnect) ? '<span class=\"badge badge--brand\">New</span>' : ''; return '<' + tag + ' class=\"stg__row\" data-name=\"' + item.n + '\"><span class=\"stg__rowicon\">' + item.stgLogo + '</span><span class=\"stg__rowmeta\"><span class=\"stg__namerow\"><span class=\"stg__rowname\">' + item.n + '</span>' + recBadge + newBadge + '</span><span class=\"stg__rowsub\">' + item.desc + '</span></span>' + trailing + '</' + tag + '>'; }",
  "  function stgPaint(){ if (!stgList) return; var q = stgQuery.trim().toLowerCase(); var list = SRC.filter(function(x){ var catOk = stgCat === 'All' || (stgCat === 'Recommended' ? x.rec : (x.cats || []).indexOf(stgCat) !== -1); return catOk && srcMatch(x, q); }).sort(stgCmp); stgList.innerHTML = list.map(stgRowHtml).join(''); if (stgEmpty) stgEmpty.hidden = !(q && list.length === 0); }",
  "  var stgFlt = document.getElementById('stgFlt'); var stgFilterBtn = document.getElementById('stgFilterBtn'); var stgFilterLabel = document.getElementById('stgFilterLabel'); var stgCat = 'All';",
  "  if (stgFilterBtn) stgFilterBtn.addEventListener('click', function(e){ e.stopPropagation(); var open = stgFlt.classList.toggle('is-open'); stgFilterBtn.setAttribute('aria-expanded', open); });",
  "  if (stgFlt) stgFlt.querySelector('.stg__fmenu').addEventListener('click', function(e){ e.stopPropagation(); });",
  "  if (stgFlt) stgFlt.querySelectorAll('.stg__fitem').forEach(function(it){ it.addEventListener('click', function(){ stgCat = it.getAttribute('data-cat'); stgFlt.querySelectorAll('.stg__fitem').forEach(function(x){ x.classList.remove('stg__fitem--sel'); }); it.classList.add('stg__fitem--sel'); if (stgFilterLabel) stgFilterLabel.textContent = stgCat === 'All' ? 'Filter by' : stgCat; stgFlt.classList.remove('is-open'); stgFilterBtn.setAttribute('aria-expanded', false); stgPaint(); var sc0 = document.querySelector('.stg__content'); if (sc0) sc0.scrollTop = 0; }); });",
  "  document.addEventListener('click', function(){ if (stgFlt) { stgFlt.classList.remove('is-open'); if (stgFilterBtn) stgFilterBtn.setAttribute('aria-expanded', false); } });",
  "  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && stgFlt && stgFlt.classList.contains('is-open')) { stgFlt.classList.remove('is-open'); if (stgFilterBtn) { stgFilterBtn.setAttribute('aria-expanded', false); stgFilterBtn.focus(); } } });",
  "  window.addEventListener('scroll', function(e){ if (e.target && e.target.nodeType === 1 && e.target.closest && e.target.closest('.stg__fmenu')) return; if (stgFlt && stgFlt.classList.contains('is-open')) { stgFlt.classList.remove('is-open'); if (stgFilterBtn) stgFilterBtn.setAttribute('aria-expanded', false); } }, true);",
  "  if (stgSearch) stgSearch.addEventListener('input', function(){ stgQuery = this.value; stgPaint(); var sc = document.querySelector('.stg__content'); if (sc) sc.scrollTop = 0; });",
  "  if (stgList) stgList.addEventListener('click', function(e){ var b = e.target.closest('.stg__connect'); if (b){ var crow = b.closest('.stg__row'); var cname = crow.getAttribute('data-name'); var citem = SRC.filter(function(x){ return x.n === cname; })[0]; openAuth(cname, citem ? citem.logoSrc : ''); return; } var row = e.target.closest('.stg__row'); if (row && row.tagName === 'BUTTON'){ openStgDetail(row.getAttribute('data-name')); } });",
  "  var adOv = document.getElementById('adOverlay'); var adPartner = document.getElementById('adPartner'); var adName2 = document.getElementById('adName2'); var adBody = document.getElementById('adBody'); var adContinue = document.getElementById('adContinue'); var adCancel = document.getElementById('adCancel'); var adName = null; var adReturn = null;",
  "  var dcOv = document.getElementById('dcOverlay'); var dcTitle = document.getElementById('dcTitle'); var dcLogo = document.getElementById('dcLogo'); var dcBody2 = document.getElementById('dcBody2'); var dcConfirm = document.getElementById('dcConfirm'); var dcCancel = document.getElementById('dcCancel'); var dcName = null;",
  "  function openDisconnect(name, logoSrc){ dcName = name; if (dcTitle) dcTitle.textContent = 'Disconnect ' + name + '?'; if (dcLogo) dcLogo.innerHTML = logoSrc ? '<img src=\"' + logoSrc + '\" alt=\"\"/>' : ''; if (dcBody2) dcBody2.textContent = 'You can still continue old chats that reference ' + name + ' content.'; if (dcOv) dcOv.classList.add('is-open'); }",
  "  if (dcCancel) dcCancel.addEventListener('click', function(){ if (dcOv) dcOv.classList.remove('is-open'); dcName = null; });",
  "  if (dcOv) dcOv.addEventListener('click', function(e){ if (e.target === dcOv){ dcOv.classList.remove('is-open'); dcName = null; } });",
  "  if (dcConfirm) dcConfirm.addEventListener('click', function(){ var nm = dcName; if (dcOv) dcOv.classList.remove('is-open'); dcName = null; if (!nm) return; closeStgDetail(); var item = SRC.filter(function(x){ return x.n === nm; })[0]; if (item){ item.state = 'removing'; (function(n){ setTimeout(function(){ var it = SRC.filter(function(x){ return x.n === n; })[0]; if (it && it.state === 'removing'){ it.state = 'connect'; srcPaint(); stgPaint(); updateSrcCount(); } }, 10000); })(nm); } srcQuery = ''; srcShown = 6; if (srcSearch) srcSearch.value = ''; stgQuery = ''; if (stgSearch) stgSearch.value = ''; stgCat = 'All'; if (stgFilterLabel) stgFilterLabel.textContent = 'Filter by'; var allIt = null; if (stgFlt) stgFlt.querySelectorAll('.stg__fitem').forEach(function(x){ x.classList.remove('stg__fitem--sel'); if (x.getAttribute('data-cat') === 'All') allIt = x; }); if (allIt) allIt.classList.add('stg__fitem--sel'); srcPaint(); stgPaint(); updateSrcCount(); });",
  "  function capAuthSkills(){ var wrap = document.getElementById('adSkills'); if (!wrap) return; var old = wrap.querySelector('.ad__more'); if (old) old.remove(); var pills = [].slice.call(wrap.querySelectorAll('.stgd__chip')); pills.forEach(function(p){ p.style.display = ''; }); function rowTops(){ var tops = []; [].slice.call(wrap.children).forEach(function(c){ if (c.style.display === 'none') return; var t = c.offsetTop; if (tops.indexOf(t) === -1) tops.push(t); }); return tops; } if (rowTops().length <= 2) return; var more = document.createElement('span'); more.className = 'stgd__chip ad__more'; more.textContent = '+0'; wrap.appendChild(more); var visible = pills.slice(); var hidden = 0; while (rowTops().length > 2 && visible.length){ var last = visible.pop(); last.style.display = 'none'; hidden++; more.textContent = '+' + hidden; } if (hidden === 0) more.remove(); }",
  "  function openAuth(name, logoSrc){ adName = name; var uitem = SRC.filter(function(x){ return x.n === name; })[0]; adReturn = (srcOv && srcOv.classList.contains('is-open')) ? srcOv : ((stgOv && stgOv.classList.contains('is-open')) ? stgOv : null); if (adReturn) adReturn.classList.remove('is-open'); var det = SRC_DETAIL[name] || {}; if (adPartner) adPartner.innerHTML = logoSrc ? ('<img src=\"' + logoSrc + '\" alt=\"\"/>') : (uitem ? uitem.logo : ''); if (adName2) adName2.textContent = name; if (adBody) adBody.textContent = det.about || (uitem ? uitem.desc : ''); if (adContinue) adContinue.textContent = 'Continue to ' + name; var isUsc = uitem && uitem.usc; var adSkills = document.getElementById('adSkills'); if (adSkills){ var sks = SRC_SKILLS[name] || []; adSkills.innerHTML = sks.map(function(s){ return '<span class=\"stgd__chip\">/' + s.name + '</span>'; }).join(''); } var adDev = document.getElementById('adDev'); if (adDev) adDev.textContent = det.developer || (uitem && uitem.uscDev ? uitem.uscDev : name); var adCat = document.getElementById('adCat'); if (adCat) adCat.textContent = (uitem && uitem.cats && uitem.cats[0]) ? uitem.cats[0] : 'Productivity'; var adLinksLbl = document.getElementById('adLinksLbl'); if (adLinksLbl) adLinksLbl.textContent = isUsc ? 'Links' : 'More info'; var adSync = document.getElementById('adSync'); var adWs = document.getElementById('adWs'); if (isUsc){ if (adSync){ adSync.hidden = false; var sb = document.getElementById('adSyncBody'); if (sb) sb.innerHTML = 'Your ' + name + ' content is automatically synced, stored and kept up to date in Copilot. Syncing your content will make it accessible to your tenant admin. <a class=\"ad__link\" href=\"#\" onclick=\"return false\">Learn more</a>'; } if (adWs){ adWs.hidden = false; var wh = document.getElementById('adWsHint'); if (wh) wh.textContent = uitem.uscAdd ? uitem.uscAdd : ('Paste any ' + name + ' url from your workspace to connect'); var ui = document.getElementById('adUscInput'); if (ui){ ui.value = ''; ui.placeholder = uitem.uscPh ? uitem.uscPh : ('https://<your-company>.' + (uitem.uscHost || 'example.com') + '/...'); } } } else { if (adSync) adSync.hidden = true; if (adWs) adWs.hidden = true; } if (adOv) adOv.classList.add('is-open'); capAuthSkills(); }",
  "  function closeAuth(){ if (adOv) adOv.classList.remove('is-open'); if (adReturn) adReturn.classList.add('is-open'); adReturn = null; adName = null; }",
  "  if (adCancel) adCancel.addEventListener('click', closeAuth);",
  "  if (adOv) adOv.addEventListener('click', function(e){ if (e.target === adOv) closeAuth(); });",
  "  if (adContinue) adContinue.addEventListener('click', function(){ var connectedName = adName; var ret = adReturn; if (adName){ var item = SRC.filter(function(x){ return x.n === adName; })[0]; if (item){ if (item.usc){ item.state = 'syncing'; item.syncStart = Date.now(); (function(nm){ setTimeout(function(){ var itA = SRC.filter(function(x){ return x.n === nm; })[0]; if (itA && itA.state === 'syncing'){ srcPaint(); stgPaint(); } }, 2000); setTimeout(function(){ var it2 = SRC.filter(function(x){ return x.n === nm; })[0]; if (it2 && it2.state === 'syncing'){ it2.state = 'on'; srcPaint(); stgPaint(); updateSrcCount(); } }, 10000); })(adName); } else { item.state = 'on'; } } setLastConnected(adName, item ? item.logoSrc : ''); srcQuery = ''; srcShown = 6; if (srcSearch) srcSearch.value = ''; stgQuery = ''; if (stgSearch) stgSearch.value = ''; stgCat = 'All'; if (stgFilterLabel) stgFilterLabel.textContent = 'Filter by'; var allIt = null; if (stgFlt) stgFlt.querySelectorAll('.stg__fitem').forEach(function(x){ x.classList.remove('stg__fitem--sel'); if (x.getAttribute('data-cat') === 'All') allIt = x; }); if (allIt) allIt.classList.add('stg__fitem--sel'); srcPaint(); stgPaint(); updateSrcCount(); ensureSourceTab(adName); } closeAuth(); if (connectedName && ret) { setTimeout(function(){ var rows = ret.querySelectorAll('[data-name]'); var row = null; for (var i = 0; i < rows.length; i++){ if (rows[i].getAttribute('data-name') === connectedName){ row = rows[i]; break; } } if (!row) return; var sc = row.parentElement; while (sc && sc !== ret){ var oy = getComputedStyle(sc).overflowY; if ((oy === 'auto' || oy === 'scroll') && sc.scrollHeight > sc.clientHeight + 1) break; sc = sc.parentElement; } if (sc && sc !== ret){ var scR = sc.getBoundingClientRect(); var rR = row.getBoundingClientRect(); sc.scrollTop += (rR.top - scR.top) - (sc.clientHeight - rR.height) / 2; } else if (row.scrollIntoView){ row.scrollIntoView({ block: 'center' }); } row.classList.add('src-justconnected'); (function(el){ setTimeout(function(){ el.classList.remove('src-justconnected'); }, 1500); })(row); }, 80); } });",
  "  if (srcOv) srcOv.addEventListener('click', function(e){ if (e.target === srcOv) srcOv.classList.remove('is-open'); });",
  "  var SRC = " + JSON.stringify(SRC_MODEL) + ";",
  "  var SRC_SKILLS = " + JSON.stringify(SRC_SKILLS) + ";",
  "  var SKILL_ICON = " + JSON.stringify(SKILL_ICON) + ";",
  "  var MCP_ICON = " + JSON.stringify(MCP_ICON) + ";",
  "  var SK_MENU = " + JSON.stringify(SK_MENU) + ";",
  "  var SK_TRY = " + JSON.stringify(SK_TRY) + ";",
  "  var SK_INFO = " + JSON.stringify(SK_INFO) + ";",
  "  var SK_CHAT = " + JSON.stringify(SK_CHAT) + ";",
  "  var currentStgName = null; var stgSkillReturn = null; var stgVariantSeq = 0;",
  "  var srcList = document.getElementById('srcList');",
  "  var srcCount = document.getElementById('srcCount'); var srcTurnOff = document.getElementById('srcTurnOff'); var srcSearch = document.getElementById('srcSearch');",
  "  var srcQuery = ''; var srcShown = 6; var srcTimer = null;",
  "  function syncTrailing(item){ var isRem = item.state === 'removing'; var label = isRem ? 'Removing your data' : ((Date.now() - (item.syncStart || 0) < 2000) ? 'Connected' : 'Sync in progress'); var tip = isRem ? 'Removing your personal data. Wait before reconnecting' : ('Sync is in progress. We will notify you when ' + item.n + ' is ready to use.'); return '<span class=\"syncstat\" tabindex=\"0\"><span class=\"syncstat__txt\">' + label + '</span>' + SPINNER + '<span class=\"syncstat__tip\" role=\"tooltip\">' + tip + '</span></span>'; }",
  "  function srcTrailing(item){ var state = item.state; if (state === 'connect') return '<button class=\"srcm__connect\">Connect</button>'; if (state === 'syncing' || state === 'removing') return syncTrailing(item); if (state === 'chevron') return '<span class=\"srcm__chev\">' + STG_CHEV + '</span>'; return '<span class=\"srcm__tgl srcm__tgl--' + state + '\" role=\"switch\" aria-checked=\"' + (state === 'on') + '\" tabindex=\"0\"><span class=\"srcm__thumb\"></span></span>'; }",
  "  function srcRowHtml(item){ var meta = item.meta ? '<span class=\"srcm__meta\">' + item.meta + '</span>' : ''; var recBadge = (item.rec && item.state === 'connect') ? '<span class=\"badge\">Recommended</span>' : ''; var newBadge = (item.badge && item.state === 'connect') ? '<span class=\"badge badge--brand\">New</span>' : ''; return '<div class=\"srcm__row\" data-name=\"' + item.n + '\"><div class=\"srcm__inner\">' + item.logo + '<span class=\"srcm__label\">' + item.n + '</span>' + recBadge + newBadge + '<span class=\"srcm__spacer\"></span>' + meta + srcTrailing(item) + '</div></div>'; }",
  "  function updateSrcCount(){ var n = 0, on = 0; SRC.forEach(function(x){ if (x.state === 'on' || x.state === 'chevron') n++; if (x.state === 'on') on++; }); if (srcCount) srcCount.textContent = n === 1 ? '1 source is on' : n + ' sources are on'; if (srcTurnOff) srcTurnOff.disabled = on === 0; }",
  "  function srcBind(){ srcList.querySelectorAll('.srcm__tgl').forEach(function(t){ if (t.__b) return; t.__b = 1; t.addEventListener('click', function(){ var row = t.closest('.srcm__row'); var item = SRC.filter(function(x){ return x.n === row.getAttribute('data-name'); })[0]; var on = t.classList.toggle('srcm__tgl--on'); t.classList.toggle('srcm__tgl--off', !on); t.setAttribute('aria-checked', on); if (item) item.state = on ? 'on' : 'off'; updateSrcCount(); }); }); srcList.querySelectorAll('.srcm__connect').forEach(function(b){ if (b.__b) return; b.__b = 1; b.addEventListener('click', function(){ var row = b.closest('.srcm__row'); var item = SRC.filter(function(x){ return x.n === row.getAttribute('data-name'); })[0]; openAuth(row.getAttribute('data-name'), item ? item.logoSrc : ''); }); }); srcList.querySelectorAll('.srcm__chev').forEach(function(c){ if (c.__b) return; c.__b = 1; c.addEventListener('click', function(e){ e.stopPropagation(); var row = c.closest('.srcm__row'); openSrcSkills(row.getAttribute('data-name')); }); }); }",
  "  function srcHasSkills(name){ return !!(SRC_SKILLS[name] && SRC_SKILLS[name].length); }",
  "  function openSrcSkills(name){ var skills = SRC_SKILLS[name] || []; var mv = document.getElementById('srcMainView'); var sv = document.getElementById('srcSkillsView'); var sl = document.getElementById('srcSkList'); var sn = document.getElementById('srcSkName'); if (!skills.length || !sl) return; if (sn) sn.textContent = name; sl.innerHTML = skills.map(function(s){ return '<div class=\"srcm__skill\" data-skill=\"' + s.name + '\"><span class=\"srcm__skico\">' + SKILL_ICON + '</span><span class=\"srcm__skmeta\"><span class=\"srcm__skname\">/' + s.name + '</span><span class=\"srcm__skdesc\">' + s.desc + '</span></span></div>'; }).join(''); sl.querySelectorAll('.srcm__skill').forEach(function(row, i){ row.addEventListener('click', function(){ addSkillAttach(name, skills[i]); }); }); if (mv) mv.hidden = true; if (sv) sv.hidden = false; }",
  "  function closeSrcSkills(){ var mv = document.getElementById('srcMainView'); var sv = document.getElementById('srcSkillsView'); if (sv) sv.hidden = true; if (mv) mv.hidden = false; }",
  "  var X12_SVG = '<svg viewBox=\"0 0 12 12\" width=\"12\" height=\"12\" fill=\"none\"><path d=\"M3 3l6 6M9 3l-6 6\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/></svg>';",
  "  function syncSend(){ if (!cmp) return; var wrap = document.getElementById('cmpAttach'); var hasText = ta && ta.value.trim().length > 0; var hasAttach = wrap && wrap.children.length > 0; cmp.classList.toggle('ci--has-text', hasText || hasAttach); }",
  "  function addSkillAttach(source, s){ var wrap = document.getElementById('cmpAttach'); if (!wrap) return; if (!wrap.querySelector('[data-skill=\"' + s.name + '\"]')){ var el = document.createElement('div'); el.className = 'cmp-attach'; el.setAttribute('data-skill', s.name); el.setAttribute('title', '/' + s.name); el.innerHTML = '<span class=\"cmp-attach__ico\">' + SKILL_ICON + '</span><span class=\"cmp-attach__meta\"><span class=\"cmp-attach__name\">/' + s.name + '</span><span class=\"cmp-attach__desc\">' + s.desc + '</span></span><button class=\"cmp-attach__x\" aria-label=\"Remove /' + s.name + '\">' + X12_SVG + '</button>'; el.querySelector('.cmp-attach__x').addEventListener('click', function(e){ e.stopPropagation(); el.remove(); syncSend(); }); wrap.appendChild(el); } var srcOv2 = document.getElementById('srcOverlay'); if (srcOv2) srcOv2.classList.remove('is-open'); closeSrcSkills(); syncSend(); var ta2 = document.getElementById('cmpTa'); if (ta2) ta2.focus(); }",
  "  var srcSkBack = document.getElementById('srcSkBack'); if (srcSkBack) srcSkBack.addEventListener('click', closeSrcSkills);",
  "  function srcRank(x){ return x.n === 'Microsoft 365 apps' ? 0 : (x.state !== 'connect' ? 1 : 2); }",
  "  var SRC_DOMAINS = { finance: ['Financial Services'], financial: ['Financial Services'], finances: ['Financial Services'], money: ['Financial Services'], fsi: ['Financial Services'], banking: ['Financial Services'], bank: ['Financial Services'], investment: ['Financial Services'], investing: ['Financial Services'], markets: ['Financial Services'], market: ['Financial Services'], trading: ['Financial Services'], stocks: ['Financial Services'], stock: ['Financial Services'], credit: ['Financial Services'], ratings: ['Financial Services'], equity: ['Financial Services'], capital: ['Financial Services'], accounting: ['Financial Services'], tax: ['Financial Services'], crypto: ['Financial Services'], development: ['Development tools'], dev: ['Development tools'], developer: ['Development tools'], engineering: ['Development tools'], engineer: ['Development tools'], code: ['Development tools'], coding: ['Development tools'], devops: ['Development tools'], software: ['Development tools'], git: ['Development tools'], api: ['Development tools'], commerce: ['Commerce & Shopping'], shopping: ['Commerce & Shopping'], shop: ['Commerce & Shopping'], sales: ['Commerce & Shopping'], crm: ['Commerce & Shopping'], ecommerce: ['Commerce & Shopping'], retail: ['Commerce & Shopping'], travel: ['Commerce & Shopping'], booking: ['Commerce & Shopping'], design: ['Creative'], creative: ['Creative'], designer: ['Creative'], ux: ['Creative'], ui: ['Creative'], diagram: ['Creative'], whiteboard: ['Creative'], communication: ['Communication'], comms: ['Communication'], messaging: ['Communication'], chat: ['Communication'], support: ['Communication'], contact: ['Communication'], data: ['Data & Analytics'], analytics: ['Data & Analytics'], analysis: ['Data & Analytics'], intelligence: ['Data & Analytics'], research: ['Data & Analytics'], education: ['Education'], learning: ['Education'], learn: ['Education'], training: ['Education'], course: ['Education'], health: ['Healthcare', 'Health & Life Sciences', 'Consumer Health'], healthcare: ['Healthcare', 'Health & Life Sciences', 'Consumer Health'], medical: ['Healthcare', 'Health & Life Sciences'], medicine: ['Healthcare', 'Health & Life Sciences'], drug: ['Healthcare', 'Health & Life Sciences'], pharma: ['Healthcare', 'Health & Life Sciences'], clinical: ['Health & Life Sciences'], biotech: ['Health & Life Sciences'], legal: ['Legal'], law: ['Legal'], litigation: ['Legal'], court: ['Legal'], media: ['Media'], music: ['Media'], entertainment: ['Media'], nonprofit: ['Nonprofit'], grants: ['Nonprofit'], grant: ['Nonprofit'], philanthropy: ['Nonprofit'], funding: ['Nonprofit'], email: ['Communication'], mail: ['Communication'], inbox: ['Communication'], teams: ['Communication'], slack: ['Communication'], dashboard: ['Data & Analytics'], reporting: ['Data & Analytics'], report: ['Data & Analytics'], metrics: ['Data & Analytics'], bi: ['Data & Analytics'], insights: ['Data & Analytics'], statistics: ['Data & Analytics'], database: ['Data & Analytics', 'Development tools'], sql: ['Data & Analytics', 'Development tools'], graphics: ['Creative'], video: ['Creative', 'Media'], photo: ['Creative'], art: ['Creative'], slides: ['Creative'], presentation: ['Creative'], branding: ['Creative'], payments: ['Commerce & Shopping'], payment: ['Commerce & Shopping'], marketplace: ['Commerce & Shopping'], store: ['Commerce & Shopping'], marketing: ['Commerce & Shopping'], ads: ['Commerce & Shopping'], advertising: ['Commerce & Shopping'], news: ['Media'], streaming: ['Media'], podcast: ['Media'], school: ['Education'], university: ['Education'], study: ['Education'], academic: ['Education'], attorney: ['Legal'], lawyer: ['Legal'], contract: ['Legal'], compliance: ['Legal'], invoice: ['Financial Services'], invoicing: ['Financial Services'], payroll: ['Financial Services'], revenue: ['Financial Services'], budget: ['Financial Services'], wealth: ['Financial Services'], fund: ['Financial Services'], funds: ['Financial Services'], repo: ['Development tools'], repository: ['Development tools'], cloud: ['Development tools'], deployment: ['Development tools'], infrastructure: ['Development tools'], wellness: ['Consumer Health', 'Healthcare'], fitness: ['Consumer Health'], patient: ['Healthcare'], hospital: ['Healthcare'] };",
  "  function srcDomainCats(q){ var out = {}; if (q.length < 2) return out; for (var k in SRC_DOMAINS){ if (k.indexOf(q) === 0 || q.indexOf(k) === 0){ SRC_DOMAINS[k].forEach(function(c){ out[c] = 1; }); } } return out; }",
  "  function stgRank(x){ if (x.n === 'Microsoft 365 apps') return 0; if (x.state !== 'connect') return 1; if (x.rec) return 2; return 3; }",
  "  function srcMatch(x, q){ if (!q) return true; if (x.n.toLowerCase().indexOf(q) !== -1) return true; if (x.desc && x.desc.toLowerCase().indexOf(q) !== -1) return true; var cats = x.cats || []; var i; for (i = 0; i < cats.length; i++){ if (cats[i].toLowerCase().indexOf(q) !== -1) return true; } var dc = srcDomainCats(q); for (i = 0; i < cats.length; i++){ if (dc[cats[i]]) return true; } return false; }",
  "  function srcCmp(a, b){ var ra = stgRank(a), rb = stgRank(b); if (ra !== rb) return ra - rb; var an = a.n.toLowerCase(), bn = b.n.toLowerCase(); return an < bn ? -1 : (an > bn ? 1 : 0); }",
  "  function stgCmp(a, b){ var ra = stgRank(a), rb = stgRank(b); if (ra !== rb) return ra - rb; var an = a.n.toLowerCase(), bn = b.n.toLowerCase(); return an < bn ? -1 : (an > bn ? 1 : 0); }",
  "  function srcSorted(){ return SRC.slice().sort(srcCmp); }",
  "  function srcPaint(){ if (!srcList) return; srcList.querySelectorAll('.srcm__row').forEach(function(r){ r.remove(); }); var q = srcQuery.trim().toLowerCase(); var sorted = srcSorted(); var items = q ? sorted.filter(function(x){ return srcMatch(x, q); }) : sorted.slice(0, srcShown); var frag = items.map(srcRowHtml).join(''); srcList.insertAdjacentHTML('beforeend', frag); srcBind(); updateSrcCount(); }",
  "  function srcLoadMore(){ if (srcQuery.trim() || srcShown >= SRC.length || srcTimer) return; srcTimer = setTimeout(function(){ srcTimer = null; srcShown = Math.min(SRC.length, srcShown + 3); srcPaint(); }, 220); }",
  "  function srcFill(){ if (!srcList || srcQuery.trim()) return; var g = 0; while (srcList.clientHeight > 0 && srcList.scrollHeight <= srcList.clientHeight && srcShown < SRC.length && g++ < 50) { srcShown = Math.min(SRC.length, srcShown + 3); srcPaint(); } }",
  "  if (srcList) srcList.addEventListener('scroll', function(){ if (srcList.scrollTop + srcList.clientHeight >= srcList.scrollHeight - 48) srcLoadMore(); });",
  "  if (srcTurnOff) srcTurnOff.addEventListener('click', function(){ SRC.forEach(function(x){ if (x.state === 'on') x.state = 'off'; }); srcPaint(); });",
  "  if (srcSearch) srcSearch.addEventListener('input', function(){ srcQuery = this.value; if (!srcQuery.trim()) srcShown = 6; srcPaint(); if (srcList) srcList.scrollTop = 0; });",
  "  srcPaint();",
  "  function positionSyncTip(ss){ var tip = ss.querySelector('.syncstat__tip'); if (!tip) return; tip.classList.add('is-show'); var r = ss.getBoundingClientRect(); var tw = tip.offsetWidth || 224; var th = tip.offsetHeight || 40; var cx = r.left + r.width / 2; var margin = 8; var left = cx - tw / 2; if (left < margin) left = margin; if (left + tw > window.innerWidth - margin) left = window.innerWidth - margin - tw; var top = r.top - th - 10; if (top < margin) top = r.bottom + 10; tip.style.left = left + 'px'; tip.style.top = top + 'px'; tip.style.setProperty('--beak', (cx - left) + 'px'); }",
  "  function hideSyncTip(ss){ var tip = ss.querySelector('.syncstat__tip'); if (tip) tip.classList.remove('is-show'); }",
  "  document.addEventListener('mouseover', function(e){ var ss = e.target.closest ? e.target.closest('.syncstat') : null; if (ss) positionSyncTip(ss); });",
  "  document.addEventListener('mouseout', function(e){ var ss = e.target.closest ? e.target.closest('.syncstat') : null; if (ss && !ss.contains(e.relatedTarget)) hideSyncTip(ss); });",
  "  document.addEventListener('focusin', function(e){ var ss = e.target.closest ? e.target.closest('.syncstat') : null; if (ss) positionSyncTip(ss); });",
  "  document.addEventListener('focusout', function(e){ var ss = e.target.closest ? e.target.closest('.syncstat') : null; if (ss) hideSyncTip(ss); });",
  "  stgPaint();",
  "  document.addEventListener('click', function(e){ if (cmp && !cmp.contains(e.target)) { cmp.classList.remove('is-am-open'); if (addBtn) addBtn.setAttribute('aria-expanded','false'); } });",
  "  function ssLayout(ss){ var segs=ss.querySelectorAll('.ss__seg'); var sel=parseInt(ss.getAttribute('data-selected'),10)||0; var ind=ss.querySelector('.ss__indicator'); var t=segs[sel]; if(!t||!ind)return; ind.style.width=t.offsetWidth+'px'; ind.style.transform='translateX('+(t.offsetLeft-4)+'px)'; }",
  "  document.querySelectorAll('.ss').forEach(function(ss){ ss.querySelectorAll('.ss__seg').forEach(function(seg){ seg.addEventListener('click', function(){ ss.querySelectorAll('.ss__seg').forEach(function(s){ s.classList.remove('ss__seg--selected'); }); seg.classList.add('ss__seg--selected'); ss.setAttribute('data-selected', seg.getAttribute('data-i')); ssLayout(ss); }); }); });",
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

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Connectors &amp; Skills v3</title><style>' + css + '</style></head><body>'
  + '<div class="shell">'
  + nav()
  + '<div class="main">' + header() + '<div class="body">' + zeroState() + '</div><div class="disc">Copilot is an AI and may make mistakes. Using Copilot means you agree to the Terms of Use. See our Privacy Statement.</div></div>'
  + cotPanel()
  + '</div>'
  + promptLab()
  + sourcesModal()
  + settingsModal()
  + authModal()
  + disconnectModal()
  + ciqModal()
  + refsPopover()
  + injectVariantsRuntime()
  + '</body>' + js + '</html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'connectorsSkillsV3.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'connectorsSkillsV3.html'));
