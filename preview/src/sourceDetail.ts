/**
 * Source Detail (L2) — v1.2 — Interactive HTML Preview
 *
 * The connector detail page reached from the Settings Sources list (Figma node
 * 1790:48443). Identity (20px logo + name) with Disconnect and a header overflow
 * (⋯ → Reconnect), a single divider, an About description, a read-only Tools
 * list rendered as subtle Tag chips, and Details (connected on, account,
 * category, developer, more info). Rendered inside the Settings v1.2 modal
 * chrome. One Copilot styling; composes Dialog + Button + Tag + Menu + Divider + Link.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function icon(file: string, size: number, mono = true): string {
  let svg = fs.readFileSync(path.join(iconsDir, file), 'utf-8')
    .replace(/<\?xml[^>]*>/, '')
    .replace(/width="\d+"/, 'width="' + size + '"')
    .replace(/height="\d+"/, 'height="' + size + '"');
  if (mono) svg = svg.replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"');
  return svg.trim();
}
const ICON_DISMISS = icon('dismiss-20-regular.svg', 20);
const ICON_MORE = icon('more-horizontal-20-regular.svg', 20);
const ICON_BACK = icon('arrow-left-20-regular.svg', 20);
const ICON_SYNC = icon('arrow-sync-20-regular.svg', 20);
const ICON_OPEN = icon('open-20-regular.svg', 16);

// Read-only tool list (compact, no icons)
const TOOLS = [
  { name: 'Search issues', desc: 'Find issues with JQL or keywords across projects' },
  { name: 'Get issue details', desc: 'Read an issue\u2019s fields, status, and history' },
  { name: 'Create issue', desc: 'Open a new issue in a project' },
  { name: 'Update issue', desc: 'Edit fields, priority, or labels on an issue' },
  { name: 'Add comment', desc: 'Post a comment to an issue' },
  { name: 'Assign issue', desc: 'Set or change the assignee' },
  { name: 'Transition status', desc: 'Move an issue through its workflow' },
  { name: 'List projects', desc: 'Browse projects and boards you can access' },
];

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #3a3a3a; padding: 40px 24px; color: #242424; }
h1 { font-size: 22px; font-weight: 600; text-align: center; margin-bottom: 8px; color: #fff; }
.hint { font-size: 13px; color: #bdbdbd; text-align: center; margin-bottom: 28px; }
.stage { display: flex; justify-content: center; }

/* Modal (dialog surface) */
.sm { width: 720px; background: #fff; border-radius: 24px; padding: 28px;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08); }
.sm__hdr { display: flex; align-items: center; margin-bottom: 20px; }
.sm__title { width: 150px; flex-shrink: 0; font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.sm__back { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: none; background: none; border-radius: 9999px; color: #242424; cursor: pointer; margin-left: 24px; transition: background 0.1s; }
.sm__back:hover { background: rgba(36,36,36,0.04); }
.sm__back svg { width: 20px; height: 20px; }
.sm__hdrspace { flex: 1; }
.sm__close { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: none; background: none; border-radius: 8px; color: #242424; cursor: pointer; transition: background 0.1s; }
.sm__close:hover { background: rgba(36,36,36,0.04); }
.sm__body { display: flex; gap: 24px; }
.sm__side { width: 150px; flex-shrink: 0; display: flex; flex-direction: column; gap: 2px; }
.side__item { display: flex; align-items: center; height: 32px; padding: 6px 12px; border: none; background: transparent; border-radius: 8px; font-size: 14px; line-height: 20px; font-weight: 420; color: #5d5d5d; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s, color 0.1s; }
.side__item:hover { background: rgba(36,36,36,0.04); color: #242424; }
.side__item--sel { background: #ebebeb; color: #242424; font-weight: 625; }
.sm__content { flex: 1; min-width: 0; }

/* Back affordance */
.back { display: inline-flex; align-items: center; gap: 4px; border: none; background: none; padding: 2px 6px 2px 2px; margin: 0 0 12px -6px; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 20px; color: #5d5d5d; cursor: pointer; transition: background 0.1s, color 0.1s; }
.back:hover { background: rgba(36,36,36,0.04); color: #242424; }
.back svg { width: 20px; height: 20px; }

/* Identity row */
.id { display: flex; align-items: center; gap: 12px; }
.id__logo { width: 20px; height: 20px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; }
.id__logo img { width: 100%; height: 100%; object-fit: contain; }
.id__meta { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.id__name { font-size: 20px; line-height: 28px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }
.id__sub { font-size: 12px; line-height: 16px; color: #6f6f6f; }
.id__actions { display: flex; align-items: center; gap: 8px; position: relative; }
.btn-secondary { height: 32px; padding: 0 12px; border: none; border-radius: 12px; background: #f5f5f5; color: #242424; font-family: inherit; font-size: 14px; line-height: 20px; cursor: pointer; transition: background 0.1s; }
.btn-secondary:hover { background: #ebebeb; }
.icon-btn { width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 9999px; color: #242424; cursor: pointer; transition: background 0.1s; }
.icon-btn:hover { background: rgba(36,36,36,0.04); }

/* Overflow menu (menu + menuListItem) */
.ofl { position: relative; }
.ofl__menu { position: absolute; top: calc(100% + 4px); right: 0; min-width: 176px; background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 12px; padding: 4px;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08);
  opacity: 0; transform: translateY(-4px); pointer-events: none; transition: opacity 0.12s, transform 0.12s; z-index: 30; }
.ofl.is-open .ofl__menu { opacity: 1; transform: translateY(0); pointer-events: auto; }
.ofl__item { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 12px; border: none; background: transparent; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; cursor: pointer; text-align: left; transition: background 0.1s; }
.ofl__item:hover { background: rgba(36,36,36,0.04); }
.ofl__item svg { width: 20px; height: 20px; color: #242424; }

/* Divider */
.rule { height: 1px; background: #dedede; margin: 16px 0; border: none; }

/* Sections */
.sec { padding: 16px 0; }
.sec__h { font-size: 14px; line-height: 20px; font-weight: 600; color: #242424; margin-bottom: 8px; }
.sec__p { font-size: 14px; line-height: 20px; color: #5d5d5d; }

/* Tools (read-only) — subtle Tag chips (neutral-subtle fill, circular) */
.chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.chip { display: inline-flex; align-items: center; justify-content: center; min-height: 24px; padding: 2px 10px; border: none; border-radius: 9999px; background: rgba(0,0,0,0.05); color: #242424; font-size: 12px; line-height: 16px; white-space: nowrap; }

/* Details metadata */
.meta { display: flex; flex-direction: column; gap: 16px; }
.meta__row { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.meta__label { font-size: 14px; line-height: 20px; color: #5d5d5d; }
.meta__value { font-size: 14px; line-height: 20px; color: #242424; }
.meta__value--secondary { color: #6f6f6f; }
.meta__link { display: inline-flex; align-items: center; gap: 4px; font-size: 14px; line-height: 20px; color: #242424; text-decoration: none; }
.meta__link:hover { text-decoration: underline; }
.meta__link svg { width: 16px; height: 16px; color: #6f6f6f; }
`;

const SIDE = ['Startup', 'Personalization', 'Voice', 'Data controls', 'Notifications', 'Sources', 'Agents', 'Accounts', 'About', 'Internal tools'];
const sidebar = SIDE.map(function (c) { return '<button class="side__item' + (c === 'Sources' ? ' side__item--sel' : '') + '">' + c + '</button>'; }).join('');

const toolsHtml = '<div class="chips">' + TOOLS.map(function (t) {
  return '<span class="chip">' + t.name + '</span>';
}).join('') + '</div>';

const detail = [
  '<div class="sm__content">',
  // Identity
  '<div class="id">',
  '<span class="id__logo"><img src="../../src/components/icons/jira-logo.png" alt=""/></span>',
  '<div class="id__meta"><span class="id__name">Jira</span></div>',
  '<div class="id__actions">',
  '<button class="btn-secondary">Disconnect</button>',
  '<div class="ofl" id="ofl"><button class="icon-btn" id="oflBtn" aria-haspopup="menu" aria-expanded="false" aria-label="More options">' + ICON_MORE + '</button>',
  '<div class="ofl__menu" role="menu"><button class="ofl__item">' + ICON_SYNC + 'Reconnect</button></div>',
  '</div>',
  '</div></div>',
  '<hr class="rule"/>',
  // About
  '<div class="sec"><div class="sec__h">About</div>',
  '<p class="sec__p">Reference issues, sprints, and project workflows, and let Copilot search, summarize, and draft updates grounded in your team\u2019s work.</p></div>',
  // Tools (read-only) — subtle Tag chips
  '<div class="sec"><div class="sec__h">Tools</div>',
  toolsHtml,
  '</div>',
  // Details
  '<div class="sec"><div class="sec__h">Details</div>',
  '<div class="meta">',
  '<div class="meta__row"><span class="meta__label">Connected on</span><span class="meta__value">May 14, 2026</span></div>',
  '<div class="meta__row"><span class="meta__label">Account</span><span class="meta__value">elvia.atkins@contoso.com</span></div>',
  '<div class="meta__row"><span class="meta__label">Category</span><span class="meta__value">Development</span></div>',
  '<div class="meta__row"><span class="meta__label">Developer</span><a class="meta__link" href="#" onclick="return false">Atlassian ' + ICON_OPEN + '</a></div>',
  '<div class="meta__row"><span class="meta__label">More info</span><a class="meta__link" href="#" onclick="return false">Privacy Policy ' + ICON_OPEN + '</a></div>',
  '</div></div>',
  '</div>',
].join('\n');

const modal = [
  '<div class="stage"><div class="sm" role="dialog" aria-label="Settings">',
  '<div class="sm__hdr"><span class="sm__title">Settings</span>',
  '<button class="sm__back" aria-label="Back">' + ICON_BACK + '</button>',
  '<span class="sm__hdrspace"></span>',
  '<button class="sm__close" aria-label="Close">' + ICON_DISMISS + '</button></div>',
  '<div class="sm__body">',
  '<div class="sm__side">' + sidebar + '</div>',
  detail,
  '</div></div></div>',
].join('\n');

const body = [
  '<div class="stage" style="display:block;max-width:840px;margin:0 auto">',
  '<h1>Source Detail v1.2 \u2014 Component Preview</h1>',
  '<p class="hint">Connector detail (L2): identity + Disconnect + overflow (\u22ef \u2192 Reconnect), a single divider, About, a read-only Tools list as subtle Tag chips, and Details. One Copilot styling; composes Dialog + Button + Tag + Menu + Divider + Link.</p>',
  '</div>',
  stage(modal),
  '<script>',
  '(function(){',
  '  var ofl = document.getElementById("ofl"); if (!ofl) return;',
  '  var btn = document.getElementById("oflBtn");',
  '  btn.addEventListener("click", function(e){ e.stopPropagation(); var open = ofl.classList.toggle("is-open"); btn.setAttribute("aria-expanded", open); });',
  '  ofl.querySelector(".ofl__menu").addEventListener("click", function(e){ e.stopPropagation(); ofl.classList.remove("is-open"); btn.setAttribute("aria-expanded", false); });',
  '  document.addEventListener("click", function(){ ofl.classList.remove("is-open"); btn.setAttribute("aria-expanded", false); });',
  '  document.addEventListener("keydown", function(e){ if (e.key === "Escape" && ofl.classList.contains("is-open")) { ofl.classList.remove("is-open"); btn.setAttribute("aria-expanded", false); btn.focus(); } });',
  '})();',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Source Detail (L2) Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'sourceDetail.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'sourceDetail.html'));
