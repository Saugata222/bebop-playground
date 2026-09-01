/**
 * User Message — Interactive HTML Preview
 *
 * Aligned to the One Copilot Desktop UI Kit (Figma node 4136:122598).
 * The sent user turn: optional attachment list + prompt bubble + hover-revealed
 * actions. Composes attachmentPill chips and icon-only Buttons. Variants:
 * Short · Long (collapsed) · Long expanded · With attachments · Actions on hover,
 * in light and dark.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Glyphs ─────────────────────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function icon(file: string, size: number, mono = true): string {
  let svg = fs.readFileSync(path.join(iconsDir, file), 'utf-8')
    .replace(/<\?xml[^>]*>/, '')
    .replace(/width="\d+"/, 'width="' + size + '"')
    .replace(/height="\d+"/, 'height="' + size + '"');
  if (mono) svg = svg.replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"');
  return svg.trim();
}
const ICON_EDIT = icon('edit-20-regular.svg', 20);
const ICON_COPY = icon('copy-20-regular.svg', 20);
const ICON_BOOKMARK = icon('bookmark-20-regular.svg', 20);
const ICON_CHEVRON = icon('chevron-down-20-regular.svg', 20);
const ICON_WORD = icon('word-20-color.svg', 20, false);   // keep filetype color
const ICON_DOC = icon('document-20-regular.svg', 20);

const MSG_SHORT = 'Can you help me identify if there\u2019s a trend in escalations related to the new product line launched in May? I want to see if there is a noticeable trend or emerging pattern to inform our product strategy discussions this month.';
const MSG_LONG = MSG_SHORT + ' As we continue gathering feedback from early adopters and monitoring support channels, it would be helpful to understand whether the volume or nature of these escalations is shifting over time, especially as more customers begin integrating the product into their workflows. I\u2019m also curious if certain issue types are becoming more common, if specific customer segments are disproportionately affected, or if there are signals that point to broader usability or stability concerns.';

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #ececec; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 860px; margin: 0 auto; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.pane { border-radius: 16px; padding: 24px; }
.pane--light { background: #fff; border: 1px solid #ececec; }
.pane--dark { background: #1f1f1f; }
.pane__rl { font-size: 11px; font-weight: 600; color: #6f6f6f; margin-bottom: 12px; }
.pane--dark .pane__rl { color: #adadad; }
.beh { font-size: 14px; line-height: 1.55; color: #424242; margin-bottom: 12px; }
.beh:last-child { margin-bottom: 0; }
.beh b { color: #242424; }

/* ─── User message ─── */
.um { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; max-width: 720px; margin-left: auto; position: relative; outline: none; }
.um:focus-visible { outline: 2px solid #2664da; outline-offset: 4px; border-radius: 14px; }

/* Attachment list */
.um__attach { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; padding: 12px 16px; width: 100%; }
.att-img { width: 58px; height: 58px; border-radius: 16px; flex-shrink: 0; background: radial-gradient(120% 120% at 30% 20%, #f4c9a8, #9a5b4a); }
.att-img--wide { width: 120px; }
.att { display: inline-flex; align-items: center; gap: 8px; min-height: 58px; max-width: 186px; padding: 8px; background: #fcfcfc; border: 1px solid #dedede; border-radius: 16px; }
.att__glyph { width: 20px; height: 20px; flex-shrink: 0; color: #242424; display: flex; }
.att__text { display: flex; flex-direction: column; min-width: 0; }
.att__name { font-size: 14px; line-height: 20px; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.att__sub { font-size: 12px; line-height: 16px; color: #6f6f6f; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.att__chev { width: 20px; height: 20px; flex-shrink: 0; color: #6f6f6f; display: flex; }

/* Bubble */
.um__bubble { background: #f2f2f2; border-radius: 12px; padding: 8px 16px; max-width: 580px; position: relative; }
.um__text { font-family: 'Segoe Sans','Segoe UI',system-ui,sans-serif; font-size: 16px; line-height: 28px; font-weight: 420; letter-spacing: 0; color: #242424; }
.um__bubble--collapsed .um__text { max-height: 140px; overflow: hidden; }
.um__fade { position: absolute; left: 0; right: 0; bottom: 32px; height: 40px; background: linear-gradient(to bottom, rgba(242,242,242,0), #f2f2f2); pointer-events: none; }
.um__more { display: flex; justify-content: center; padding-top: 4px; }
.um__more button { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border: none; background: none; color: #6f6f6f; cursor: pointer; border-radius: 9999px; }
.um__more button:hover { background: rgba(36,36,36,0.06); }
.um__more button:focus-visible { outline: 2px solid #2664da; outline-offset: 1px; }
.um__more svg { transition: transform 0.15s; }
.um--expanded .um__more svg { transform: rotate(180deg); }

/* Actions */
.um__actions { display: flex; align-items: center; justify-content: flex-end; gap: 12px; padding: 4px 8px; opacity: 0; transition: opacity 0.12s; }
.um:hover .um__actions, .um:focus-within .um__actions, .um--actions .um__actions { opacity: 1; }
.um__btns { display: flex; align-items: center; }
.um__btns[role="toolbar"]:focus-within { outline: none; }
.um__btn { display: inline-flex; align-items: center; justify-content: center; padding: 6px; border: none; background: rgba(36,36,36,0); border-radius: 9999px; color: #242424; cursor: pointer; transition: background 0.1s; }
.um__btn:hover { background: rgba(36,36,36,0.04); }
.um__btn:focus-visible { outline: 2px solid #2664da; outline-offset: 1px; }
.um__btn svg { display: block; }
.um__time { font-size: 12px; line-height: 16px; color: #6f6f6f; white-space: nowrap; }

/* Elevated actions — message bottom cut off by scroll (Shadow/Low backplate) */
.um--elevated { padding-bottom: 44px; }
.um--elevated .um__bubble--collapsed .um__text { max-height: 96px; }
.um--elevated .um__actions { position: absolute; right: 8px; bottom: 4px; opacity: 1; background: #fff; border-radius: 12px; padding: 2px 8px 2px 4px;
  box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08); }
.pane--dark .um--elevated .um__actions { background: #2b2b2b; }

/* Dark theme */
.pane--dark .att-img { }
.pane--dark .att { background: #2b2b2b; border-color: #3d3d3d; }
.pane--dark .att__glyph, .pane--dark .att__name { color: #f5f5f5; }
.pane--dark .att__sub, .pane--dark .att__chev { color: #adadad; }
.pane--dark .um__bubble { background: #2b2b2b; }
.pane--dark .um__text { color: #f5f5f5; }
.pane--dark .um__fade { background: linear-gradient(to bottom, rgba(43,43,43,0), #2b2b2b); }
.pane--dark .um__btn { color: #f5f5f5; }
.pane--dark .um__btn:hover { background: rgba(255,255,255,0.06); }
.pane--dark .um__time, .pane--dark .um__more button { color: #adadad; }
`;

// ─── Builders ───────────────────────────────────────────────

function attachEntity(glyph: string, name: string, sub: string): string {
  return '<span class="att"><span class="att__glyph">' + glyph + '</span>'
    + '<span class="att__text"><span class="att__name">' + name + '</span>'
    + '<span class="att__sub">' + sub + '</span></span>'
    + '<span class="att__chev">' + ICON_CHEVRON + '</span></span>';
}

const attachList = '<div class="um__attach">'
  + '<span class="att-img"></span>'
  + '<span class="att-img att-img--wide"></span>'
  + attachEntity(ICON_WORD, 'Document Na\u2026', 'Microsoft Word')
  + attachEntity(ICON_DOC, 'Meeting Name', 'Meeting time')
  + '</div>';

const actionsRow = '<div class="um__actions">'
  + '<div class="um__btns" role="toolbar" aria-label="Message actions">'
  + '<button class="um__btn" aria-label="Edit" tabindex="-1">' + ICON_EDIT + '</button>'
  + '<button class="um__btn" aria-label="Copy" tabindex="-1">' + ICON_COPY + '</button>'
  + '<button class="um__btn" aria-label="Save" tabindex="-1">' + ICON_BOOKMARK + '</button>'
  + '</div><span class="um__time">Mar 15</span></div>';

type Opt = { text: string; attach?: boolean; collapsed?: boolean; actions?: boolean; showMore?: boolean; elevated?: boolean };
function um(o: Opt): string {
  const cls = ['um'];
  if (o.actions) cls.push('um--actions');
  if (o.elevated) cls.push('um--elevated');
  let out = '<div class="' + cls.join(' ') + '" tabindex="0" role="group" aria-label="User message">';
  if (o.attach) out += attachList;
  out += '<div class="um__bubble' + (o.collapsed ? ' um__bubble--collapsed' : '') + '">';
  out += '<p class="um__text">' + o.text + '</p>';
  if (o.collapsed) out += '<span class="um__fade"></span>';
  out += '</div>';
  if (o.showMore) out += '<div class="um__more"><button aria-label="Show more" aria-expanded="false">' + ICON_CHEVRON + '</button></div>';
  out += actionsRow;
  out += '</div>';
  return out;
}

function pair(label: string, o: Opt): string {
  return '<h2>' + label + '</h2><div class="grid">'
    + '<div class="pane pane--light"><div class="pane__rl">Light</div>' + um(o) + '</div>'
    + '<div class="pane pane--dark"><div class="pane__rl">Dark</div>' + um(o) + '</div>'
    + '</div>';
}

// ─── Page ───────────────────────────────────────────────────

const body = [
  '<div class="wrap">',
  stage('<div style="width:100%;max-width:640px;display:flex;justify-content:flex-end">' + um({ text: MSG_SHORT }) + '</div>'),
  '<h1>User Message \u2014 Component Preview</h1>',
  '<p class="hint">The sent user turn: optional attachment list + prompt bubble + hover-revealed actions (edit / copy / save + timestamp). Right-aligned. Hover a message to reveal its actions; use the chevron to expand a long message.</p>',
  pair('Short', { text: MSG_SHORT }),
  pair('Long \u2014 collapsed', { text: MSG_LONG, collapsed: true, showMore: true }),
  pair('Long \u2014 expanded', { text: MSG_LONG }),
  pair('With attachments', { text: MSG_SHORT, attach: true }),
  pair('Actions shown on hover / focus', { text: MSG_SHORT, actions: true }),
  pair('Elevated actions (message bottom scroll-cut)', { text: MSG_LONG, collapsed: true, elevated: true }),
  '<h2>Behaviors</h2>',
  '<div class="pane pane--light" style="display:block">',
  '<p class="beh"><b>Reveal.</b> Actions and the timestamp appear on <b>hover</b> or when the message receives <b>keyboard focus</b> (Tab to the message).</p>',
  '<p class="beh"><b>Actions toolbar.</b> The actions are a roving-tabindex toolbar: focus the message, press <b>Enter</b> to move into the toolbar, <b>\u2190 / \u2192</b> to move between edit / copy / save, and <b>Enter / Space</b> to activate. <b>Escape</b> returns focus to the message.</p>',
  '<p class="beh"><b>Expand / collapse.</b> Long messages collapse behind a fade with a chevron-down. Selecting it (or <b>Space / Enter</b> when focused) expands the message and the chevron flips up to collapse; the fade returns on collapse.</p>',
  '<p class="beh"><b>Elevated actions.</b> When the bottom of the message is cut off by scroll, the actions and timestamp lift onto a floating white backplate (Shadow/Low) on top of the message instead of sitting below it.</p>',
  '</div>',
  '</div>',
  '<script>',
  '  // Two-way expand / collapse',
  '  document.querySelectorAll(".um__more button").forEach(function(btn){',
  '    btn.addEventListener("click", function(){',
  '      var um = btn.closest(".um");',
  '      var bubble = um.querySelector(".um__bubble");',
  '      var expanded = um.classList.toggle("um--expanded");',
  '      bubble.classList.toggle("um__bubble--collapsed", !expanded);',
  '      var fade = bubble.querySelector(".um__fade");',
  '      if (expanded && fade) fade.style.display = "none";',
  '      else if (fade) fade.style.display = "";',
  '      btn.setAttribute("aria-expanded", expanded);',
  '      btn.setAttribute("aria-label", expanded ? "Show less" : "Show more");',
  '    });',
  '  });',
  '  // Roving-tabindex actions toolbar',
  '  document.querySelectorAll(".um__btns[role=toolbar]").forEach(function(bar){',
  '    var btns = Array.prototype.slice.call(bar.querySelectorAll(".um__btn"));',
  '    var um = bar.closest(".um");',
  '    function focusAt(i){ btns.forEach(function(b,j){ b.tabIndex = j===i ? 0 : -1; }); btns[i].focus(); }',
  '    um.addEventListener("keydown", function(e){',
  '      if (e.target === um && e.key === "Enter"){ e.preventDefault(); focusAt(0); }',
  '    });',
  '    bar.addEventListener("keydown", function(e){',
  '      var i = btns.indexOf(document.activeElement); if (i < 0) return;',
  '      if (e.key === "ArrowRight"){ e.preventDefault(); focusAt((i+1)%btns.length); }',
  '      else if (e.key === "ArrowLeft"){ e.preventDefault(); focusAt((i-1+btns.length)%btns.length); }',
  '      else if (e.key === "Escape"){ e.preventDefault(); btns.forEach(function(b){ b.tabIndex = -1; }); um.focus(); }',
  '    });',
  '  });',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>User Message Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'userMessage.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'userMessage.html'));
