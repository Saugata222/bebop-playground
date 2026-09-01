/**
 * Prompt Lab v1.2 — HTML Preview
 *
 * Source Discovery (file JD3kM4M4LpUM1n4fWQa4Q4) nodes 1759:75473 (Suggested)
 * and 1759:76345 (Source prompts → Confluence). The prompt discovery modal
 * with a left sidebar of nav rows (Suggested / Find prompts / Saved / Shared)
 * and collapsible section accordions (Topics / Agent prompts / Source prompts)
 * whose sub-rows each load their own prompts.
 *
 * Selected affordance = soft grey pill (#ebebeb) + semibold label. Accordions
 * are closed by default and mutually exclusive (opening one collapses the
 * others). Reuses the Dialog surface (radius 24, Shadow/Highest), Menu rows,
 * Button, and Divider.
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
function P(cat: string, title: string, by: string): Prompt { return { cat: cat, title: title, by: by }; }

const SUGGESTED: Prompt[] = [
  P('Reconnecting after time apart', 'How can I make the most of catching up with old friends?', 'Microsoft'),
  P('Bridging gaps smoothly', 'What are some thoughtful ways to update someone on recent changes in my life?', 'Microsoft'),
  P('Refreshing relationships', 'How can I approach a conversation to revive a stalled connection?', 'Microsoft'),
  P('Sharing stories and laughs', 'What topics spark engaging catch-up conversations with colleagues?', 'Microsoft'),
  P('Catching up on life\u2019s milestones', 'How do I express genuine interest in someone\u2019s recent achievements?', 'Microsoft'),
  P('Balancing updates and listening', 'What techniques help keep catch-ups meaningful and unhurried?', 'Microsoft'),
];

const CONFLUENCE: Prompt[] = [
  P('Organizing team knowledge', 'How can I structure a Confluence space so my team can quickly find the information they need?', 'Atlassian'),
  P('Writing effective documentation', 'What are some best practices for writing clear and concise documentation pages in Confluence?', 'Atlassian'),
  P('Reviving outdated pages', 'How can I approach cleaning up and refreshing stale Confluence pages that are no longer accurate?', 'Atlassian'),
  P('Collaborating on pages', 'What techniques help teams co-edit Confluence pages without creating conflicts or confusion?', 'Atlassian'),
  P('Tracking project milestones', 'How do I set up Confluence to document and celebrate key project milestones effectively?', 'Atlassian'),
  P('Balancing structure and flexibility', 'How can I keep a Confluence space organized without making it feel rigid or hard to update?', 'Atlassian'),
];

const ANALYST: Prompt[] = [
  P('Analyze data', 'What are the trends you see in the uploaded files? Which variables are correlated and how much? Can you visualize the relationships?', 'Analyst'),
  P('Get insights', 'What are some quick insights about the data from the uploaded file?', 'Analyst'),
  P('Visualize', 'Create a table with the volume of planets, add a column to show the volume as multiple of Earth\u2019s, and a row to show the ratio.', 'Analyst'),
];

function genPrompts(name: string, by: string): Prompt[] {
  return [
    P(name + ' \u00b7 Get started', 'Show me what ' + name + ' can help me with today.', by),
    P(name + ' \u00b7 Summarize', 'Summarize the latest updates relevant to ' + name + '.', by),
    P(name + ' \u00b7 Automate', 'Help me automate a recurring task using ' + name + '.', by),
  ];
}

// ─── Sidebar model ──────────────────────────────────────────

const TOPICS = ['Catch up', 'Ask', 'Create', 'Learn'];
const AGENTS = ['Analyst', 'Azure FinOps Budget Agent', 'Catch-up', 'Employee Self-Service'];
interface Source { name: string; by: string; }
const SOURCES: Source[] = [
  { name: 'Confluence', by: 'Atlassian' },
  { name: 'Github', by: 'GitHub' },
  { name: 'Google Drive', by: 'Google' },
];

const PROMPTS: Record<string, Prompt[]> = { suggested: SUGGESTED };
TOPICS.forEach(function (t) { PROMPTS['topic:' + t] = genPrompts(t, 'Microsoft'); });
AGENTS.forEach(function (a) { PROMPTS['agent:' + a] = a === 'Analyst' ? ANALYST : genPrompts(a, a); });
SOURCES.forEach(function (s) { PROMPTS['source:' + s.name] = s.name === 'Confluence' ? CONFLUENCE : genPrompts(s.name, s.by); });

// ─── Builders ───────────────────────────────────────────────

function navRow(icon: string, label: string, view: string, sel?: boolean): string {
  return '<button class="plv-nav' + (sel ? ' plv-nav--sel' : '') + '" data-view="' + view + '"><span class="plv-nav__ico">' + icon + '</span><span class="plv-nav__label">' + label + '</span></button>';
}
function subRow(view: string, label: string): string {
  return '<button class="plv-sub" data-view="' + view + '">' + label + '</button>';
}
function accordion(label: string, key: string, rows: string): string {
  return [
    '<div class="plv-acc" data-acc="' + key + '">',
    '<button class="plv-acc__head" aria-expanded="false"><span class="plv-acc__label">' + label + '</span><span class="plv-acc__chev">' + ico('chevron-right-20-regular') + '</span></button>',
    '<div class="plv-acc__body" hidden>' + rows + '</div>',
    '</div>',
  ].join('');
}

function sidebar(): string {
  const topicRows = TOPICS.map(function (t) { return subRow('topic:' + t, t); }).join('');
  const agentRows = AGENTS.map(function (a) { return subRow('agent:' + a, a); }).join('');
  const sourceRows = SOURCES.map(function (s) { return subRow('source:' + s.name, s.name); }).join('');
  return [
    '<div class="plv-side">',
    navRow(ico('grid-dots-20-regular'), 'Suggested', 'suggested', true),
    navRow(ico('search-20-regular'), 'Find prompts', 'find'),
    navRow(ico('bookmark-20-regular'), 'Saved', 'saved'),
    navRow(ico('people-team-20-regular'), 'Shared', 'shared'),
    accordion('Topics', 'topics', topicRows),
    accordion('Agent prompts', 'agents', agentRows),
    accordion('Source prompts', 'sources', sourceRows),
    '</div>',
  ].join('');
}

function promptItem(p: Prompt): string {
  return [
    '<div class="plv-item">',
    '<div class="plv-item__cat">' + p.cat + '</div>',
    '<div class="plv-item__title">' + p.title + '</div>',
    '<div class="plv-item__by">Suggested by ' + p.by + '</div>',
    '<button class="plv-item__bm" aria-label="Save prompt">' + ico('bookmark-20-regular') + '</button>',
    '</div>',
  ].join('');
}

function promptList(): string {
  return '<div class="plv-list" id="plv-list">' + SUGGESTED.map(promptItem).join('') + '</div>';
}

function modal(): string {
  return [
    '<div class="plv">',
    '<div class="plv__head"><h2 class="plv__title">Prompt Lab</h2><button class="plv__x" aria-label="Close">' + ico('dismiss-20-regular') + '</button></div>',
    '<div class="plv__body">',
    sidebar(),
    '<div class="plv__content">' + promptList() + '</div>',
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

.plv-backdrop { position: relative; border-radius: 16px; background: #dcdcdc; padding: 40px; display: flex; justify-content: center; }

/* Modal */
.plv { width: 840px; max-width: 100%; height: 600px; background: #fff; border-radius: 24px; box-shadow: 0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.03), 0 32px 48px rgba(0,0,0,0.08); padding: 24px 24px 0; display: flex; flex-direction: column; overflow: hidden; }
.plv__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-shrink: 0; }
.plv__title { font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.plv__x { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s; }
.plv__x:hover { background: rgba(36,36,36,0.06); }
.plv__x svg { width: 20px; height: 20px; }
.plv__body { flex: 1 1 auto; display: flex; gap: 24px; min-height: 0; }

/* Sidebar */
.plv-side { width: 200px; flex-shrink: 0; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; padding-right: 4px; }
.plv-side::-webkit-scrollbar { width: 8px; }
.plv-side::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 9999px; }
.plv-nav { display: flex; align-items: center; gap: 8px; width: 100%; height: 36px; padding: 6px 8px; border: none; border-radius: 8px; background: transparent; color: #242424; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; }
.plv-nav:hover { background: rgba(36,36,36,0.04); }
.plv-nav__ico { display: inline-flex; width: 20px; height: 20px; color: #424242; flex-shrink: 0; }
.plv-nav__ico svg { width: 20px; height: 20px; }
.plv-nav__label { font-size: 14px; line-height: 20px; font-weight: 420; }
.plv-nav--sel { background: #ebebeb; }
.plv-nav--sel:hover { background: #e0e0e0; }
.plv-nav--sel .plv-nav__ico { color: #242424; }
.plv-nav--sel .plv-nav__label { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }

/* Section accordion (Topics / Agent prompts / Source prompts) */
.plv-acc { display: flex; flex-direction: column; margin-top: 6px; }
.plv-acc__head { display: flex; align-items: center; gap: 8px; width: 100%; height: 36px; padding: 6px 8px; border: none; border-radius: 8px; background: transparent; color: #242424; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; }
.plv-acc__head:hover { background: rgba(36,36,36,0.04); }
.plv-acc__label { flex: 1 1 auto; font-size: 14px; line-height: 20px; font-weight: 420; }
.plv-acc__chev { display: inline-flex; width: 20px; height: 20px; color: #616161; flex-shrink: 0; transition: transform 0.18s ease; }
.plv-acc__chev svg { width: 20px; height: 20px; }
.plv-acc__head[aria-expanded="true"] .plv-acc__chev { transform: rotate(90deg); }
.plv-acc__body { display: flex; flex-direction: column; gap: 2px; padding: 2px 0 4px; }
.plv-acc__body[hidden] { display: none; }
.plv-sub { display: block; width: 100%; text-align: left; padding: 8px 8px 8px 12px; border: none; border-radius: 8px; background: transparent; color: #242424; cursor: pointer; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; transition: background 0.1s; }
.plv-sub:hover { background: rgba(36,36,36,0.04); }
.plv-sub--sel { background: #ebebeb; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }

/* Prompt list */
.plv__content { flex: 1 1 auto; min-width: 0; overflow-y: auto; padding-right: 4px; }
.plv__content::-webkit-scrollbar { width: 8px; }
.plv__content::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 9999px; }
.plv-list { display: flex; flex-direction: column; }
.plv-item { position: relative; padding: 16px 0; border-bottom: 1px solid #ebebeb; cursor: pointer; }
.plv-item:first-child { padding-top: 4px; }
.plv-item:hover { background: rgba(36,36,36,0.012); }
.plv-item__cat { font-size: 12px; line-height: 16px; color: #6f6f6f; }
.plv-item__title { font-size: 20px; line-height: 28px; font-weight: 400; color: #242424; margin: 4px 0; padding-right: 32px; }
.plv-item__by { font-size: 12px; line-height: 16px; color: #6f6f6f; }
.plv-item__bm { position: absolute; top: 16px; right: 0; display: none; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 4px; border: none; border-radius: 8px; background: transparent; color: #242424; cursor: pointer; }
.plv-item__bm:hover { background: rgba(36,36,36,0.06); }
.plv-item__bm svg { width: 20px; height: 20px; }
.plv-item:hover .plv-item__bm, .plv-item__bm.is-marked { display: inline-flex; }
.plv-item__bm.is-marked { color: #242424; }
`;

// ─── Page ───────────────────────────────────────────────────

const body = [
  '<div class="wrap"><h1>Prompt Lab v1.2 \u2014 Component Preview</h1>',
  stage(modal()),
  '<p class="hint">Source Discovery prompt modal. Suggested is selected by default. Topics / Agent prompts / Source prompts are collapsible accordions (closed by default, one open at a time) whose sub-rows each load their own prompts. Selected rows use a soft grey pill. Reuses the Dialog surface, Menu rows, and Divider.</p>',
  '<div class="plv-backdrop">' + modal() + '</div>',
  '</div>',
  '<script>',
  '  var PROMPTS = ' + JSON.stringify(PROMPTS) + ';',
  '  var BM_SVG = ' + JSON.stringify(ico('bookmark-20-regular')) + ';',
  '  var list = document.getElementById(\'plv-list\');',
  '  function esc(s){ return s.replace(/&/g,\'&amp;\').replace(/</g,\'&lt;\').replace(/>/g,\'&gt;\'); }',
  '  function renderList(view){',
  '    var items = PROMPTS[view] || PROMPTS.suggested;',
  '    list.innerHTML = items.map(function(p){',
  '      return \'<div class="plv-item"><div class="plv-item__cat">\' + esc(p.cat) + \'</div>\'',
  '        + \'<div class="plv-item__title">\' + esc(p.title) + \'</div>\'',
  '        + \'<div class="plv-item__by">Suggested by \' + esc(p.by) + \'</div>\'',
  '        + \'<button class="plv-item__bm" aria-label="Save prompt">\' + BM_SVG + \'</button></div>\';',
  '    }).join(\'\');',
  '    bindBookmarks();',
  '  }',
  '  function bindBookmarks(){ list.querySelectorAll(\'.plv-item__bm\').forEach(function(b){ if (b.__b) return; b.__b = 1; b.addEventListener(\'click\', function(e){ e.stopPropagation(); b.classList.toggle(\'is-marked\'); }); }); }',
  '  function clearSel(){ document.querySelectorAll(\'.plv-nav--sel\').forEach(function(o){ o.classList.remove(\'plv-nav--sel\'); }); document.querySelectorAll(\'.plv-sub--sel\').forEach(function(o){ o.classList.remove(\'plv-sub--sel\'); }); }',
  '  document.querySelectorAll(\'.plv-nav\').forEach(function(n){ n.addEventListener(\'click\', function(){ clearSel(); n.classList.add(\'plv-nav--sel\'); renderList(n.getAttribute(\'data-view\')); }); });',
  '  document.querySelectorAll(\'.plv-sub\').forEach(function(s){ s.addEventListener(\'click\', function(){ clearSel(); s.classList.add(\'plv-sub--sel\'); renderList(s.getAttribute(\'data-view\')); }); });',
  '  document.querySelectorAll(\'.plv-acc__head\').forEach(function(h){',
  '    h.addEventListener(\'click\', function(){',
  '      var acc = h.closest(\'.plv-acc\');',
  '      var open = h.getAttribute(\'aria-expanded\') === \'true\';',
  '      document.querySelectorAll(\'.plv-acc\').forEach(function(a){ a.querySelector(\'.plv-acc__head\').setAttribute(\'aria-expanded\', \'false\'); a.querySelector(\'.plv-acc__body\').hidden = true; });',
  '      if (!open){ h.setAttribute(\'aria-expanded\', \'true\'); acc.querySelector(\'.plv-acc__body\').hidden = false; }',
  '    });',
  '  });',
  '  bindBookmarks();',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Prompt Lab v1.2 Preview</title><style>' + css + '</style></head><body>' + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'promptLabV12.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'promptLabV12.html'));
