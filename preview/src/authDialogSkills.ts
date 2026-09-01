/**
 * Auth Dialog w/ Skills — HTML Preview
 *
 * One Copilot FCC-AdminX connect-consent modal, "skills" generation
 * (Figma nodes 242:2901 FCC/MCP · 242:2736 user-sync). 640px surface, radius 24,
 * 40/32 padding. Header = 40px partner logo + name + close; a body description;
 * an optional Continuous-sync block (user-sync); a Skills section of "/skill"
 * pills capped to 2 rows with a "+N" overflow pill; a 3-column meta row
 * (Developed by · Category · More info / Links); an optional Organisation's
 * Workspace URL input (user-sync); and a single "Continue to {name}" button.
 *
 * Two variants:
 *   1. FCC / MCP source (e.g. Moody's) — description, Skills, meta, Continue.
 *   2. User-sync source (e.g. Confluence) — adds Continuous sync + Workspace URL.
 *
 * The skill list matches the source's Settings L2 skills 1:1; the auth modal
 * caps to 2 rows while the L2 lists them all.
 *
 * Output: preview/dist/authDialogSkills.html
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Icons + logos — exact assets ───────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/ (width|height)="\d+"/g, '')
    .replace(/fill="#(212121|242424)"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
function pngLogo(name: string): string {
  return '<img src="data:image/png;base64,' + fs.readFileSync(path.join(iconsDir, name)).toString('base64') + '" alt=""/>';
}
const dismiss = readIcon('dismiss-20-regular.svg');
const moodysLogo = pngLogo('moodys-logo.png');
const confluenceLogo = pngLogo('confluence-logo.png');

// ─── Skill catalogs (match the Settings L2 skill lists) ─────

const moodysSkills = [
  'credit-rating', 'rating-history', 'risk-score', 'issuer-profile', 'peer-compare',
  'default-probability', 'sector-outlook', 'covenant-check', 'watchlist', 'macro-brief',
  'esg-score', 'portfolio-risk',
];
const confluenceSkills = [
  'space-summary', 'page-from-template', 'doc-search', 'release-notes', 'create-page',
  'update-page', 'list-spaces', 'page-history',
];

// ─── Dialog builder ─────────────────────────────────────────

interface AuthOpts {
  logo: string;
  name: string;
  body: string;
  skills: string[];
  developer: string;
  category: string;
  usc?: { host: string; workspaceHint: string };
}

function pills(skills: string[]): string {
  return skills.map(function (s) { return '<span class="chip">/' + s + '</span>'; }).join('');
}

function authDialog(opts: AuthOpts): string {
  const isUsc = !!opts.usc;
  const sync = isUsc
    ? ('<div class="ad__sec"><div class="ad__sech">Continuous sync</div>'
      + '<p class="ad__secb">Your ' + opts.name + ' content is automatically synced, stored and kept up to date in Copilot. '
      + 'Syncing your content will make it accessible to your tenant admin. '
      + '<a class="ad__link" href="#" onclick="return false">Learn more</a></p></div>')
    : '';
  const workspace = isUsc
    ? ('<div class="ad__sec"><div class="ad__sech">Organisation\u2019s Workspace</div>'
      + '<p class="ad__secb">' + opts.usc!.workspaceHint + '</p>'
      + '<div class="ad__input"><input type="text" placeholder="https://&lt;your-company&gt;.' + opts.usc!.host + '/..." aria-label="Workspace URL"/></div></div>')
    : '';
  const linksLabel = isUsc ? 'Links' : 'More info';
  return [
    '<div class="ad" role="dialog" aria-label="Connect source">',
    '<div class="ad__head">',
    '<div class="ad__top">',
    '<span class="ad__logo">' + opts.logo + '</span>',
    '<span class="ad__name">' + opts.name + '</span>',
    '<button class="ad__close" aria-label="Close">' + dismiss + '</button>',
    '</div>',
    '<p class="ad__body">' + opts.body + '</p>',
    '</div>',
    sync,
    '<div class="ad__sec"><div class="ad__sech">Skills</div><div class="ad__chips">' + pills(opts.skills) + '</div></div>',
    '<div class="ad__meta">',
    '<div class="ad__metacol"><span class="ad__metal">Developer</span><a class="ad__metav ad__link" href="#" onclick="return false">' + opts.developer + '</a></div>',
    '<div class="ad__metacol"><span class="ad__metal">Category</span><span class="ad__metav">' + opts.category + '</span></div>',
    '<div class="ad__metacol"><span class="ad__metal">' + linksLabel + '</span><span class="ad__metav"><a class="ad__link" href="#" onclick="return false">Privacy Policy</a>, <a class="ad__link" href="#" onclick="return false">Terms of Service</a></span></div>',
    '</div>',
    workspace,
    '<div class="ad__footer"><button class="ad-btn ad-btn--primary">Continue to ' + opts.name + '</button></div>',
    '</div>',
  ].join('');
}

function scene(dlg: string): string {
  return '<div class="ad-stage">' + dlg + '</div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 24px; }
.wrap { max-width: 900px; margin: 0 auto; }
.ad-stage { display: flex; align-items: center; justify-content: center; background: #333333; border-radius: 16px; padding: 48px; }

/* ─── Auth Dialog (640px, radius 24, 40/32 padding) ─── */
.ad { width: 640px; max-width: 100%; max-height: none; background: #fff; border-radius: 24px; padding: 32px 40px; display: flex; flex-direction: column; gap: 24px;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.15), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08); }
.ad__head { display: flex; flex-direction: column; gap: 8px; }
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
.ad__sech { font-size: 16px; line-height: 24px; font-weight: 600; color: #242424; }
.ad__secb { font-size: 14px; line-height: 20px; font-weight: 420; color: #616161; margin: 0; }
.ad__chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.chip { display: inline-flex; align-items: center; justify-content: center; min-height: 24px; padding: 2px 10px; border: none; border-radius: 9999px; background: rgba(0,0,0,0.05); color: #242424; font-size: 12px; line-height: 16px; font-weight: 400; white-space: nowrap; }
.chip--more { color: #616161; }
.ad__meta { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; border-top: 1px solid #e0e0e0; padding-top: 16px; }
.ad__metacol { display: flex; flex-direction: column; gap: 4px; flex: 0 0 auto; min-width: 0; }
.ad__metal { font-size: 14px; line-height: 20px; color: #616161; }
.ad__metav { font-size: 14px; line-height: 20px; color: #242424; }
.ad__link { color: #242424; text-decoration: none; cursor: pointer; }
.ad__link:hover { color: #181818; text-decoration: underline; text-decoration-thickness: 1px; text-underline-position: from-font; text-decoration-skip-ink: none; }
.ad__input { width: 100%; }
.ad__input input { width: 100%; height: 40px; border: 1px solid #242424; border-radius: 12px; padding: 8px 12px; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; background: transparent; outline: none; }
.ad__input input::placeholder { color: rgba(0,0,0,0.56); }
.ad__footer { display: flex; align-items: center; justify-content: flex-end; margin-top: 8px; }
.ad-btn { display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 6px 10px; border: none; border-radius: 12px; cursor: pointer; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; transition: background 0.1s; }
.ad-btn--primary { background: #242424; color: #fff; }
.ad-btn--primary:hover { background: #2b2b2b; }

/* ─── Usage ─── */
.when { font-size: 14px; line-height: 1.6; color: #242424; background: #fff; border: 1px solid #ededed; border-radius: 12px; padding: 16px 18px; }
`;

// ─── Cap script — 2 rows + "+N" pill per Skills row ─────────

const capScript = "(function(){function reset(wrap){var m=wrap.querySelector('.chip--more');if(m)m.remove();[].slice.call(wrap.querySelectorAll('.chip')).forEach(function(p){p.style.display='';});}function cap(wrap){reset(wrap);if(wrap.clientWidth<40)return;var pills=[].slice.call(wrap.querySelectorAll('.chip'));function rowTops(){var t=[];[].slice.call(wrap.children).forEach(function(c){if(c.style.display==='none')return;var y=c.offsetTop;if(t.indexOf(y)===-1)t.push(y);});return t;}if(rowTops().length<=2)return;var more=document.createElement('span');more.className='chip chip--more';more.textContent='+0';wrap.appendChild(more);var vis=pills.slice(),hidden=0;while(rowTops().length>2&&vis.length){vis.pop().style.display='none';hidden++;more.textContent='+'+hidden;}if(hidden===0)more.remove();}function run(){document.querySelectorAll('.ad__chips').forEach(cap);}run();window.addEventListener('load',run);window.addEventListener('resize',run);})();";

// ─── Scenes ─────────────────────────────────────────────────

const body = [
  '<h2>FCC / MCP source \u2014 Connect Moody\u2019s</h2>',
  scene(authDialog({
    logo: moodysLogo,
    name: 'Moody\u2019s',
    body: 'Credit ratings, risk scores, and financial insights from Moody\u2019s. Copilot can look up ratings and summarize credit and default risk.',
    skills: moodysSkills,
    developer: 'Moody\u2019s',
    category: 'Financial Services',
  })),

  '<h2>User-sync source \u2014 Connect Confluence</h2>',
  scene(authDialog({
    logo: confluenceLogo,
    name: 'Confluence',
    body: 'Pull knowledge base articles and team documentation so Copilot can search, summarize, and reference your space. It reads pages and attachments.',
    skills: confluenceSkills,
    developer: 'Atlassian',
    category: 'Productivity',
    usc: { host: 'atlassian.net', workspaceHint: 'Paste any Confluence url from your workspace to connect' },
  })),

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> The connect-consent modal shown before a third-party source is authorized. The Skills section previews the "/skill" procedures the source will expose \u2014 capped to 2 rows with a "+N" pill so the dialog stays compact; the source\u2019s Settings L2 lists the same skills in full. User-sync sources add a Continuous-sync note and an Organisation\u2019s Workspace URL input; their meta column is labelled "Links". The primary action always names the destination: "Continue to {Partner}".</div>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Auth Dialog w/ Skills Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Auth Dialog w/ Skills \u2014 Component Preview</h1>'
  + '<p class="hint">FCC-AdminX connect-consent modal (640px, radius 24). Partner logo + name, description, a Skills pill row capped to 2 rows with a "+N" pill, a 3-column meta row, and \u2014 for user-sync sources \u2014 Continuous sync + an Organisation\u2019s Workspace URL input.</p>'
  + body + '</div><script>' + capScript + '</script></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'authDialogSkills.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'authDialogSkills.html'));
