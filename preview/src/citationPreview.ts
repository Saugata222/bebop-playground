/**
 * Citation Preview — Interactive Preview
 *
 * One Copilot compound (node 3992:124587). Floating hover card that surfaces a
 * brief in-line glimpse of referenced sources — favicon, source name, article
 * headline, and link — without interrupting reading flow. Renders the card on
 * light and dark surfaces, a live citation-anchored hover demo, and usage docs.
 *
 * Composes the One Copilot `button` primitive (icon-only "more" action).
 * Icons: exact Fluent assets from src/components/icons. Font: Segoe Sans.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Icons ──────────────────────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
const moreH20 = readIcon('more-horizontal-20-regular.svg');

// ─── Data ───────────────────────────────────────────────────

// Product logos served relative to preview/dist/
const L = (f: string) => '../../src/components/icons/' + f;

interface Ref { logo: string; source: string; headline: string; url: string; }
const refs: Ref[] = [
  { logo: 'canva-logo.png', source: 'Canva', headline: 'Q2 Launch Brand Kit \u2014 spring campaign templates', url: 'canva.com/brand/q2-launch-kit' },
  { logo: 'moodys-logo.png', source: 'Moody\u2019s', headline: 'Consumer & Retail Credit Outlook 2026', url: 'moodys.com/research/consumer-retail-outlook-2026' },
  { logo: 'hubspot-logo.png', source: 'HubSpot', headline: 'Repeat Purchase Benchmarks 2026', url: 'hubspot.com/marketing/retention-benchmarks' },
];

// ─── Markup builders ────────────────────────────────────────

function favicon(logo: string): string {
  return '<span class="cp__fav"><img src="' + L(logo) + '" alt=""/></span>';
}

function refItem(r: Ref, active: boolean): string {
  const more = '<button class="cp__more" type="button" aria-label="More options">' + moreH20 + '</button>';
  return '<div class="cp__item' + (active ? ' cp__item--active' : '') + '">'
    + '<div class="cp__hd">'
    + favicon(r.logo)
    + '<span class="cp__src">' + r.source + '</span>'
    + more
    + '</div>'
    + '<p class="cp__title">' + r.headline + '</p>'
    + '</div>';
}

function card(activeIndex: number): string {
  let rows = '';
  refs.forEach((r, i) => { rows += refItem(r, i === activeIndex); });
  return '<div class="cp">' + rows + '</div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 760px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 10px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-radius: 16px; overflow: hidden; }
.stage { padding: 40px 24px; display: flex; align-items: flex-start; justify-content: center; }
.stage--light { background: #fcfcfc; }
.stage--dark { background: #242424; }

/* ─── Citation Preview card ─── */
.cp {
  width: 304px; max-height: 292px; overflow-y: auto; background: #fff;
  padding: 8px; border-radius: 24px; display: flex; flex-direction: column;
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.08), 0px 4px 8px 0px rgba(0,0,0,0.03), 0px 8px 12px 0px rgba(0,0,0,0.08);
  scrollbar-width: none; -ms-overflow-style: none;
}
.cp::-webkit-scrollbar { width: 0; height: 0; display: none; }
.cp__item { display: flex; flex-direction: column; gap: 6px; padding: 8px; border-radius: 16px; background: rgba(36,36,36,0); transition: background 0.1s; cursor: pointer; }
.cp__item:hover, .cp__item--active { background: rgba(24,24,24,0.04); }

/* Header row */
.cp__hd { display: flex; align-items: center; gap: 8px; }
.cp__fav {
  width: 16px; height: 16px; border-radius: 4px; flex-shrink: 0; overflow: hidden;
  display: inline-flex; align-items: center; justify-content: center; background: #fff;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.06);
}
.cp__fav img { width: 100%; height: 100%; object-fit: cover; display: block; }
.cp__src {
  flex: 1 0 0; min-width: 0; font-size: 12px; line-height: 16px; color: #5d5d5d;
  font-variation-settings: 'opsz' 8, 'wght' 420; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* "More" icon button — visible on active / hover row only */
.cp__more {
  display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
  width: 28px; height: 28px; padding: 4px; border: none; border-radius: 9999px;
  background: transparent; color: #242424; cursor: pointer; opacity: 0; transition: opacity 0.1s, background 0.1s;
}
.cp__more svg { width: 20px; height: 20px; }
.cp__more:hover { background: rgba(36,36,36,0.06); }
.cp__item:hover .cp__more, .cp__item--active .cp__more { opacity: 1; }

/* Headline (article title) — body-medium primary, up to 2 lines */
.cp__title {
  font-size: 14px; line-height: 20px; color: #242424; font-variation-settings: 'opsz' 8, 'wght' 420;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
/* URL — body-small secondary, truncated */
.cp__url {
  font-size: 12px; line-height: 16px; color: #5d5d5d; font-variation-settings: 'opsz' 8, 'wght' 420;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* ─── Live anchored demo ─── */
.live-stage { background: #fff; border: 1px solid #ebebeb; border-radius: 16px; padding: 40px 32px 140px; position: relative; }
.para { font-size: 15px; line-height: 1.7; color: #242424; max-width: 560px; margin: 0 auto; }
.cit-inline {
  display: inline-flex; align-items: center; gap: 2px; min-height: 20px; padding: 2px 6px;
  border-radius: 9999px; background: #f2f2f2; cursor: pointer; vertical-align: middle;
  font-size: 10px; line-height: 14px; color: #5d5d5d; font-variation-settings: 'opsz' 8, 'wght' 420;
}
.cit-inline:hover { background: #e8e8e8; }
.cit-inline--work { padding: 2px 6px 2px 3px; }
.cit-inline__fav { width: 14px; height: 14px; border-radius: 4px; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; background: #fff; box-shadow: 0 0 0 1.5px #f2f2f2; }
.cit-inline__fav img { width: 100%; height: 100%; object-fit: cover; display: block; }
.cit-inline__stack { display: inline-flex; align-items: center; }
.cit-inline__stack .cit-inline__fav + .cit-inline__fav { margin-left: -5px; }
.anchor { position: relative; display: inline-block; }
.anchor.is-pinned .cit-inline { background: #e2e2e2; box-shadow: 0 0 0 1px rgba(36,36,36,0.12) inset; }
.pop { position: absolute; top: calc(100% + 8px); left: 50%; transform: translateX(-50%) translateY(4px); opacity: 0; pointer-events: none; transition: opacity 0.12s ease, transform 0.12s ease; z-index: 20; }
/* Invisible bridge over the 8px gap so moving pill -> card keeps hover alive */
.pop::before { content: ''; position: absolute; left: 0; right: 0; top: -10px; height: 12px; }
.anchor.is-open .pop, .anchor.is-pinned .pop { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
@media (prefers-reduced-motion: reduce) { .pop { transition: none; } }

/* ─── Usage docs ─── */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
.usage { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }
.usage__col { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; }
.usage__col h3 { font-size: 12px; font-weight: 600; margin-bottom: 8px; }
.usage__col--do h3 { color: #0f7b0f; }
.usage__col--dont h3 { color: #b10e1c; }
.usage__col ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.usage__col li { font-size: 12px; line-height: 1.5; color: #5d5d5d; padding-left: 16px; position: relative; }
.usage__col li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 6px; border-radius: 50%; }
.usage__col--do li::before { background: #0f7b0f; }
.usage__col--dont li::before { background: #b10e1c; }
`;

// ─── Body markup ────────────────────────────────────────────

const body = [
  stage(card(0)),
  '<h2>Surface</h2>',
  '<div class="row">',
  '<div class="stage stage--light">' + card(-1) + '</div>',
  '<div class="stage stage--dark">' + card(-1) + '</div>',
  '</div>',

  '<h2>Interactive</h2>',
  '<p class="hint" style="text-align:left;margin:0 0 12px;">Hover a citation to invoke its preview; click the citation to pin it open. Hover a reference row for its \u201cmore\u201d action. Esc or click away dismisses a pinned preview.</p>',
  '<div class="live-stage">',
  '<p class="para">Repeat visits climb most when loyalty perks pair with fresh, on-brand seasonal creative '
  + '<span class="anchor" data-cit><span class="cit-inline cit-inline--work" role="button" tabindex="0" aria-haspopup="dialog" aria-label="3 sources">'
  + '<span class="cit-inline__stack">'
  + '<span class="cit-inline__fav"><img src="' + L('canva-logo.png') + '" alt=""/></span>'
  + '<span class="cit-inline__fav"><img src="' + L('moodys-logo.png') + '" alt=""/></span>'
  + '<span class="cit-inline__fav"><img src="' + L('hubspot-logo.png') + '" alt=""/></span>'
  + '</span> <span>3</span></span>'
  + '<span class="pop">' + card(-1) + '</span></span>'
  + ' rather than discounts alone.</p>',
  '</div>',

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> Citation Previews surface a brief in-line glimpse of referenced source material \u2014 including a link and abstract \u2014 without interrupting reading flow. They let readers quickly assess the content the model reasoned over without leaving the response.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Anchor the card to a citation pill and reveal it on hover / focus.</li>',
  '<li>Lead each row with a favicon + source name, then the headline and link.</li>',
  '<li>Give the active row a subtle backplate and reveal its \u201cmore\u201d action.</li>',
  '<li>Cap the card height and let the reference list scroll within it.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Block reading flow \u2014 the preview is ephemeral, not a modal.</li>',
  '<li>Pack full article bodies in \u2014 show headline + link, defer depth to the References panel.</li>',
  '<li>Show the row \u201cmore\u201d button on every row at rest \u2014 reveal it on the active row.</li>',
  '<li>Let headlines run past two lines \u2014 clamp and truncate the URL.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

// ─── Interaction script ─────────────────────────────────────

let js = '';
js += '<script>';
js += '\n';
js += 'var anchors = Array.prototype.slice.call(document.querySelectorAll(\'.anchor[data-cit]\'));';
js += '\n';
js += 'function closePinned(except) {';
js += '\n';
js += '  anchors.forEach(function (a) { if (a !== except) { a.classList.remove(\'is-pinned\'); a.classList.remove(\'is-open\'); } });';
js += '\n';
js += '}';
js += '\n';
js += 'anchors.forEach(function (a) {';
js += '\n';
js += '  var t = a.querySelector(\'.cit-inline\');';
js += '\n';
js += '  a.addEventListener(\'mouseenter\', function () { a.classList.add(\'is-open\'); });';
js += '\n';
js += '  a.addEventListener(\'mouseleave\', function () { if (!a.classList.contains(\'is-pinned\')) a.classList.remove(\'is-open\'); });';
js += '\n';
js += '  t.addEventListener(\'focus\', function () { a.classList.add(\'is-open\'); });';
js += '\n';
js += '  t.addEventListener(\'blur\', function () { if (!a.classList.contains(\'is-pinned\')) a.classList.remove(\'is-open\'); });';
js += '\n';
js += '  t.addEventListener(\'click\', function (e) {';
js += '\n';
js += '    e.stopPropagation();';
js += '\n';
js += '    var pin = !a.classList.contains(\'is-pinned\');';
js += '\n';
js += '    closePinned(a);';
js += '\n';
js += '    a.classList.toggle(\'is-pinned\', pin);';
js += '\n';
js += '    a.classList.toggle(\'is-open\', pin);';
js += '\n';
js += '  });';
js += '\n';
js += '  t.addEventListener(\'keydown\', function (e) { if (e.key === \'Enter\' || e.key === \' \') { e.preventDefault(); t.click(); } });';
js += '\n';
js += '});';
js += '\n';
js += 'document.addEventListener(\'click\', function () { closePinned(null); });';
js += '\n';
js += 'document.addEventListener(\'keydown\', function (e) { if (e.key === \'Escape\') closePinned(null); });';
js += '\n';
js += '</script>';

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Citation Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Citation Preview \u2014 Component Preview</h1>'
  + '<p class="hint">Floating hover card that previews referenced sources \u2014 favicon, source name, headline, and link \u2014 without leaving the response.</p>'
  + body + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'citationPreview.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
