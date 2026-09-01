/**
 * Prompt Lab — HTML Preview
 *
 * Ported from the One Copilot Desktop UI Kit (Prompt Lab page 26234:111404;
 * node 27514:24045). The prompt discovery modal that opens from the
 * suggestion-prompt overflow ("…").
 *
 * Reused: Dialog surface (radius 24, Shadow/Highest), Menu/menuListItem
 * (sidebar rows), Button (dismiss / bookmark), Divider.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function ico(name: string): string {
  try {
    return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8')
      .replace(/\n/g, '').replace(/ (width|height)="\d+"/g, '')
      .replace(/fill="#[0-9a-fA-F]{6}"/g, 'fill="currentColor"');
  } catch (e) { return ''; }
}

// ─── Prompt data (each view has its own prompts) ───────────

interface Prompt { cat: string; title: string; by: string; }
const ORG = 'Promoted by your organisation';
const SUGGESTED: Prompt[] = [
  { cat: 'I\u2019ve been away for 7 days!', title: 'Back from vacation: get urgent actions and mentions from the past 7 days.', by: ORG },
  { cat: 'Agents and Tools to Try', title: 'Show me which new tools or agents I should try and where they fit in my work.', by: ORG },
  { cat: 'Integrating AI into Planning', title: 'Show me how to deeply integrate AI into my planning, goals, and daily work.', by: ORG },
  { cat: 'Create a Reusable Skill', title: 'Help me create a reusable skill I can use to automate a task I do often.', by: ORG },
  { cat: 'Weekly Digest', title: 'Summarize the most important updates across my chats, email, and meetings this week.', by: ORG },
];
const TOPICS = ['Catch up', 'Ask', 'Create', 'Learn', 'Manage'];
const AGENTS = ['Analyst', 'Azure FinOps Budget Agent', 'Catch-up', 'Connect AI Assistant (Preview)', 'Employee Self-Service', 'Employee Self-Service[Retired]'];

function genPrompts(name: string, by: string): Prompt[] {
  return [
    { cat: name + ' \u00b7 Get started', title: 'Show me what ' + name + ' can help me with today.', by: by },
    { cat: name + ' \u00b7 Summarize', title: 'Summarize the latest updates relevant to ' + name + '.', by: by },
    { cat: name + ' \u00b7 Automate', title: 'Help me automate a recurring task using ' + name + '.', by: by },
  ];
}
// Agents with their own hand-authored prompts (fallback = generated).
const AGENT_PROMPTS: Record<string, Prompt[]> = {
  Analyst: [
    { cat: 'Analyze data', title: 'What are the trends you see in the uploaded files? Which variables are correlated and how much? Can you visualize the relationships?', by: 'Analyst' },
    { cat: 'Get insights', title: 'What are some quick insights about the data from the uploaded file?', by: 'Analyst' },
    { cat: 'Visualize', title: 'Create a table with the volume of planets, add a column to show the volume as multiple of Earth\u2019s, and a row to show the ratio.', by: 'Analyst' },
  ],
};
const PROMPTS: Record<string, Prompt[]> = { suggested: SUGGESTED, shared: genPrompts('Shared prompts', ORG) };
TOPICS.forEach(function (t) { PROMPTS['topic:' + t] = genPrompts(t, ORG); });
AGENTS.forEach(function (a) { PROMPTS['agent:' + a] = AGENT_PROMPTS[a] || genPrompts(a, a); });

// ─── Sidebar ────────────────────────────────────────────────

function navRow(icon: string, label: string, view: string, opts?: { sel?: boolean; dark?: boolean; gear?: boolean }): string {
  const cls = 'pl-nav' + (opts && opts.sel ? ' pl-nav--sel' : '') + (opts && opts.dark ? ' pl-nav--dark' : '');
  const gear = opts && opts.gear ? '<span class="pl-nav__gear">' + ico('settings-20-regular') + '</span>' : '';
  return '<button class="' + cls + '" data-view="' + view + '"><span class="pl-nav__ico">' + icon + '</span><span class="pl-nav__label">' + label + '</span>' + gear + '</button>';
}
function subRow(view: string, label: string): string {
  return '<button class="pl-sub" data-view="' + view + '">' + label + '</button>';
}
function accordion(label: string, key: string, rows: string): string {
  return [
    '<div class="pl-acc" data-acc="' + key + '">',
    '<button class="pl-acc__head" aria-expanded="false"><span class="pl-acc__label">' + label + '</span><span class="pl-acc__chev">' + ico('chevron-down-20-regular') + '</span></button>',
    '<div class="pl-acc__body" hidden>' + rows + '</div>',
    '</div>',
  ].join('');
}

function sidebar(): string {
  const topicRows = TOPICS.map(function (t) { return subRow('topic:' + t, t); }).join('');
  const agentRows = AGENTS.map(function (a) { return subRow('agent:' + a, a); }).join('');
  return [
    '<div class="pl-side">',
    '<div class="pl-side__scroll">',
    navRow(ico('microsoft-365-20-regular'), 'Suggested', 'suggested', { sel: true, dark: true }),
    navRow(ico('share-20-regular'), 'Shared prompts', 'shared', { gear: true }),
    accordion('Prompt topics', 'topics', topicRows),
    accordion('Agent prompts', 'agents', agentRows),
    '</div>',
    '<div class="pl-search">' + ico('search-20-regular') + '<input type="text" placeholder="Find by keyword" aria-label="Find by keyword"/></div>',
    '</div>',
  ].join('');
}

// ─── Prompt list ────────────────────────────────────────────

function promptItem(p: Prompt): string {
  return [
    '<div class="pl-item">',
    '<div class="pl-item__cat">' + p.cat + '</div>',
    '<div class="pl-item__title">' + p.title + '</div>',
    '<div class="pl-item__by">' + p.by + '</div>',
    '<button class="pl-item__bm" aria-label="Save prompt">' + ico('bookmark-20-regular') + '</button>',
    '</div>',
  ].join('');
}

function promptList(): string {
  return '<div class="pl-list" id="pl-list">' + SUGGESTED.map(promptItem).join('') + '</div>';
}

function filterBar(): string {
  return [
    '<div class="pl-filter">',
    '<button class="pl-filter__ico" aria-label="Filter">' + ico('options-20-regular') + '</button>',
    '<button class="pl-chip">Topic</button>',
    '<button class="pl-chip">Department</button>',
    '</div>',
  ].join('');
}

function modal(): string {
  return [
    '<div class="pl">',
    '<div class="pl__head"><h2 class="pl__title">Prompt Lab</h2><button class="pl__x" aria-label="Close">' + ico('dismiss-20-regular') + '</button></div>',
    '<div class="pl__body">',
    sidebar(),
    '<div class="pl__content">' + filterBar() + promptList() + '</div>',
    '</div>',
    '</div>',
  ].join('');
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 32px 20px; color: #242424; }
h1 { font-size: 22px; font-weight: 600; text-align: center; margin-bottom: 6px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 24px; }
.wrap { max-width: 1000px; margin: 0 auto; }
svg { display: block; }

/* Dimmed backdrop */
.pl-backdrop { position: relative; border-radius: 16px; background: #dcdcdc; padding: 40px; display: flex; justify-content: center; }

/* ─── Modal ─── */
.pl { width: 860px; max-width: 100%; height: 640px; background: #fff; border-radius: 24px; box-shadow: 0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.03), 0 32px 48px rgba(0,0,0,0.10); padding: 24px 24px 0; display: flex; flex-direction: column; overflow: hidden; }
.pl__head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px; }
.pl__title { font-size: 26px; line-height: 32px; font-weight: 600; color: #242424; }
.pl__x { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s; }
.pl__x:hover { background: rgba(36,36,36,0.06); }
.pl__x svg { width: 20px; height: 20px; }
.pl__body { flex: 1 1 auto; display: flex; gap: 24px; min-height: 0; }

/* Sidebar */
.pl-side { width: 200px; flex-shrink: 0; display: flex; flex-direction: column; min-height: 0; padding-top: 24px; }
.pl-side__scroll { flex: 1 1 auto; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; padding-right: 4px; }
.pl-side__scroll::-webkit-scrollbar { width: 8px; }
.pl-side__scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 9999px; }
.pl-nav { display: flex; align-items: center; gap: 8px; width: 100%; height: 40px; padding: 6px 8px; border: none; border-radius: 12px; background: transparent; color: #242424; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; }
.pl-nav:hover { background: rgba(36,36,36,0.04); }
.pl-nav__ico { display: inline-flex; width: 20px; height: 20px; color: #424242; flex-shrink: 0; }
.pl-nav__ico svg { width: 20px; height: 20px; }
.pl-nav__label { flex: 1 1 auto; font-size: 14px; line-height: 20px; font-weight: 420; }
.pl-nav__gear { display: inline-flex; width: 20px; height: 20px; color: #616161; flex-shrink: 0; }
.pl-nav__gear svg { width: 20px; height: 20px; }
.pl-nav--sel { background: #ebebeb; }
.pl-nav--sel:hover { background: #e0e0e0; }
.pl-nav--sel .pl-nav__ico { color: #242424; }
.pl-nav--sel .pl-nav__label { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.pl-nav--dark.pl-nav--sel { background: #242424; }
.pl-nav--dark.pl-nav--sel:hover { background: #2b2b2b; }
.pl-nav--dark.pl-nav--sel .pl-nav__label { color: #fff; }

/* Accordion section (Prompt topics / Agent prompts) */
.pl-acc { display: flex; flex-direction: column; margin-top: 6px; }
.pl-acc__head { display: flex; align-items: center; gap: 8px; width: 100%; height: 40px; padding: 6px 8px; border: none; border-radius: 12px; background: transparent; color: #242424; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; }
.pl-acc__head:hover { background: rgba(36,36,36,0.04); }
.pl-acc__label { flex: 1 1 auto; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.pl-acc__chev { display: inline-flex; width: 20px; height: 20px; color: #424242; flex-shrink: 0; transition: transform 0.18s ease; }
.pl-acc__chev svg { width: 20px; height: 20px; }
.pl-acc__head[aria-expanded="true"] .pl-acc__chev { transform: rotate(180deg); }
.pl-acc__body { display: flex; flex-direction: column; gap: 2px; padding: 2px 0 4px; }
.pl-acc__body[hidden] { display: none; }
.pl-sub { display: block; width: 100%; text-align: left; padding: 8px 8px 8px 12px; border: none; border-radius: 8px; background: transparent; color: #242424; cursor: pointer; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; transition: background 0.1s; }
.pl-sub:hover { background: rgba(36,36,36,0.04); }
.pl-sub--sel { background: #ebebeb; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }

/* Bottom keyword search */
.pl-search { display: flex; align-items: center; gap: 8px; height: 40px; margin-top: 8px; padding: 0 12px; border: 1px solid rgba(189,189,189,0.5); border-radius: 9999px; color: #6f6f6f; flex-shrink: 0; }
.pl-search:focus-within { border-color: #242424; }
.pl-search svg { width: 20px; height: 20px; flex-shrink: 0; }
.pl-search input { flex: 1 1 auto; min-width: 0; border: none; outline: none; background: none; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; }
.pl-search input::placeholder { color: #6f6f6f; }

/* Prompt list + filter bar */
.pl__content { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; min-height: 0; }
.pl-filter { display: flex; align-items: center; gap: 8px; padding: 24px 4px 12px; flex-shrink: 0; }
.pl-filter__ico { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border: none; border-radius: 9999px; background: transparent; color: #424242; cursor: pointer; transition: background 0.1s; }
.pl-filter__ico:hover { background: rgba(36,36,36,0.04); }
.pl-filter__ico svg { width: 20px; height: 20px; }
.pl-chip { height: 32px; padding: 6px 12px; border: none; border-radius: 9999px; background: #f0f0f0; color: #242424; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; cursor: pointer; transition: background 0.1s; }
.pl-chip:hover { background: #e6e6e6; }
.pl-list { flex: 1 1 auto; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; padding-right: 4px; }
.pl-list::-webkit-scrollbar { width: 8px; }
.pl-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 9999px; }
.pl-item { position: relative; padding: 16px 0; border-bottom: 1px solid #dedede; cursor: pointer; }
.pl-item:hover { background: rgba(36,36,36,0.015); }
.pl-item__cat { font-size: 12px; line-height: 16px; font-weight: 600; color: #242424; }
.pl-item__title { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 20px; line-height: 28px; font-weight: 400; color: #242424; margin: 4px 0; padding-right: 32px; }
.pl-item__by { font-size: 12px; line-height: 16px; color: #6f6f6f; }
.pl-item__bm { position: absolute; top: 16px; right: 0; display: none; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 4px; border: none; border-radius: 8px; background: transparent; color: #424242; cursor: pointer; }
.pl-item__bm:hover { background: rgba(36,36,36,0.06); }
.pl-item__bm svg { width: 20px; height: 20px; }
.pl-item:hover .pl-item__bm, .pl-item__bm.is-marked { display: inline-flex; }
.pl-item__bm.is-marked { color: #242424; }
`;

const body = [
  '<div class="wrap"><h1>Prompt Lab \u2014 Component Preview</h1>',
  stage(modal()),
  '<p class="hint">Prompt discovery modal. Suggested is selected by default. Prompt topics and Agent prompts are collapsible accordion sections (closed by default) \u2014 opening one collapses the other. Selecting a topic or agent loads its own prompts. Reuses the Dialog surface and Menu rows.</p>',
  '<div class="pl-backdrop">' + modal() + '</div>',
  '</div>',
  '<script>',
  '  var PROMPTS = ' + JSON.stringify(PROMPTS) + ';',
  '  var BM_SVG = ' + JSON.stringify(ico('bookmark-20-regular')) + ';',
  '  var list = document.getElementById(\'pl-list\');',
  '  function esc(s){ return s.replace(/&/g,\'&amp;\').replace(/</g,\'&lt;\').replace(/>/g,\'&gt;\'); }',
  '  function renderList(view){',
  '    var items = PROMPTS[view] || PROMPTS.suggested;',
  '    list.innerHTML = items.map(function(p){',
  '      return \'<div class="pl-item"><div class="pl-item__cat">\' + esc(p.cat) + \'</div>\'',
  '        + \'<div class="pl-item__title">\' + esc(p.title) + \'</div>\'',
  '        + \'<div class="pl-item__by">\' + esc(p.by) + \'</div>\'',
  '        + \'<button class="pl-item__bm" aria-label="Save prompt">\' + BM_SVG + \'</button></div>\';',
  '    }).join(\'\');',
  '    bindBookmarks();',
  '  }',
  '  function bindBookmarks(){ list.querySelectorAll(\'.pl-item__bm\').forEach(function(b){ if (b.__b) return; b.__b = 1; b.addEventListener(\'click\', function(e){ e.stopPropagation(); b.classList.toggle(\'is-marked\'); }); }); }',
  '  function clearSel(){ document.querySelectorAll(\'.pl-nav--sel\').forEach(function(o){ o.classList.remove(\'pl-nav--sel\'); }); document.querySelectorAll(\'.pl-sub--sel\').forEach(function(o){ o.classList.remove(\'pl-sub--sel\'); }); }',
  '  document.querySelectorAll(\'.pl-nav\').forEach(function(n){',
  '    n.addEventListener(\'click\', function(){ clearSel(); n.classList.add(\'pl-nav--sel\'); renderList(n.getAttribute(\'data-view\')); });',
  '  });',
  '  document.querySelectorAll(\'.pl-sub\').forEach(function(s){',
  '    s.addEventListener(\'click\', function(){ clearSel(); s.classList.add(\'pl-sub--sel\'); renderList(s.getAttribute(\'data-view\')); });',
  '  });',
  '  document.querySelectorAll(\'.pl-acc__head\').forEach(function(h){',
  '    h.addEventListener(\'click\', function(){',
  '      var acc = h.closest(\'.pl-acc\');',
  '      var open = h.getAttribute(\'aria-expanded\') === \'true\';',
  '      document.querySelectorAll(\'.pl-acc\').forEach(function(a){',
  '        var head = a.querySelector(\'.pl-acc__head\'); var bodyEl = a.querySelector(\'.pl-acc__body\');',
  '        head.setAttribute(\'aria-expanded\', \'false\'); bodyEl.hidden = true;',
  '      });',
  '      if (!open){ h.setAttribute(\'aria-expanded\', \'true\'); acc.querySelector(\'.pl-acc__body\').hidden = false; }',
  '    });',
  '  });',
  '  bindBookmarks();',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Prompt Lab Preview</title><style>' + css + '</style></head><body>' + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'promptLab.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'promptLab.html'));
