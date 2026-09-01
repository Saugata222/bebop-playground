/**
 * Skill Card - Cowork — Interactive HTML Preview
 *
 * The skill / MCP row from a Cowork plugin's L2 detail (Figma nodes 45:172759
 * rest, 45:172992 connected). Bordered white row: glyph + name + description +
 * a trailing chevron that becomes an overflow (⋮) menu once connected. Toggle
 * the "Connected" switch to flip the trailing control; the overflow opens a
 * menu (Try in Copilot · Share · View details).
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function ico(name: string): string {
  try { return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8').replace(/\n/g, '').replace(/ (width|height)="\d+"/g, '').replace(/fill="#[0-9a-fA-F]{6}"/g, 'fill="currentColor"'); } catch (e) { return ''; }
}
const SCRIPT = ico('script-20-regular');
const CHEV = ico('chevron-right-20-regular');
const MORE = ico('more-vertical-20-regular') || ico('more-horizontal-20-regular');
const TRY = ico('open-20-regular');
const SHARE = ico('share-android-20-regular') || ico('share-20-regular') || ico('arrow-forward-20-regular');
const INFO = ico('info-20-regular');

const ROWS = [
  { name: 'Jira-to-code', desc: 'Syncs issue data between code and Jira using REST API or Atlassian Connect. Use when establishing Jira-to-code workflows, exporting issue metadata, or setting up development tracking handoff.' },
  { name: 'Sprint-ready', desc: 'Automate Jira to sprint pipeline with Agile-SDK' },
  { name: 'Jira-generate-boards', desc: 'Translates project requirements, epics, stories, tasks, and subtasks into Jira by reusing workflow schemes, custom fields, and board configurations instead of hardcoded values.' },
];

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #fafafa; color: #242424; padding: 48px 24px; }
h1 { font-size: 22px; font-weight: 600; text-align: center; margin-bottom: 6px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 16px; }
.bar { display: flex; justify-content: center; margin-bottom: 24px; }
.switch { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: #242424; cursor: pointer; }
.tgl { position: relative; width: 40px; height: 20px; border-radius: 9999px; background: #8a8a8a; border: none; cursor: pointer; transition: background 0.15s; }
.tgl.on { background: #242424; }
.tgl__thumb { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 9999px; background: #fff; transition: transform 0.15s; }
.tgl.on .tgl__thumb { transform: translateX(20px); }
.wrap { max-width: 560px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }
.row { display: flex; align-items: center; gap: 12px; width: 100%; background: #fff; border: 1px solid #dedede; border-radius: 12px; padding: 12px 16px; }
.sico { width: 20px; height: 20px; flex-shrink: 0; color: #242424; align-self: flex-start; display: inline-flex; }
.sico svg { width: 20px; height: 20px; }
.stext { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
.sname { font-size: 14px; line-height: 20px; font-weight: 600; color: #242424; }
.sdesc { font-size: 12px; line-height: 16px; color: #5d5d5d; }
.strail { position: relative; flex-shrink: 0; }
.strail-btn { width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 8px; color: #6f6f6f; cursor: pointer; transition: background 0.1s; }
.strail-btn:hover { background: rgba(36,36,36,0.06); color: #242424; }
.strail-btn svg { width: 20px; height: 20px; }
.chev-only .strail-btn { cursor: default; }
.ofl { position: absolute; top: calc(100% + 4px); right: 0; min-width: 176px; background: #fff; border-radius: 12px; padding: 4px; box-shadow: 0 0 1px 0 rgba(0,0,0,0.08), 0 2px 4px 0 rgba(0,0,0,0.03), 0 4px 6px 0 rgba(0,0,0,0.08); opacity: 0; transform: translateY(-4px); pointer-events: none; transition: opacity 0.12s, transform 0.12s; z-index: 10; }
.strail.open .ofl { opacity: 1; transform: translateY(0); pointer-events: auto; }
.ofl__item { display: flex; align-items: center; gap: 8px; width: 100%; padding: 8px 12px; border: none; background: transparent; border-radius: 8px; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; cursor: pointer; text-align: left; transition: background 0.1s; }
.ofl__item:hover { background: rgba(36,36,36,0.04); }
.ofl__item svg { width: 20px; height: 20px; color: #242424; }
`;

const menu = '<div class="ofl" role="menu">'
  + '<button class="ofl__item">' + TRY + 'Try in Copilot</button>'
  + '<button class="ofl__item">' + SHARE + 'Share</button>'
  + '<button class="ofl__item">' + INFO + 'View details</button>'
  + '</div>';

const rows = ROWS.map(function (r) {
  return '<div class="row"><span class="sico">' + SCRIPT + '</span>'
    + '<div class="stext"><span class="sname">' + r.name + '</span><span class="sdesc">' + r.desc + '</span></div>'
    + '<div class="strail"><button class="strail-btn" data-trail><span class="tr-chev">' + CHEV + '</span><span class="tr-more" hidden>' + MORE + '</span></button>' + menu + '</div></div>';
}).join('');

const js = '<script>'
  + '(function(){'
  + '  var sw = document.getElementById("connSwitch");'
  + '  function apply(on){ document.querySelectorAll(".row").forEach(function(row){ row.querySelector(".tr-chev").hidden = on; row.querySelector(".tr-more").hidden = !on; row.querySelector(".strail-btn").style.cursor = on ? "pointer" : "default"; if (!on) row.querySelector(".strail").classList.remove("open"); }); }'
  + '  sw.addEventListener("click", function(){ var on = sw.classList.toggle("on"); sw.setAttribute("aria-checked", on); apply(on); });'
  + '  document.querySelectorAll("[data-trail]").forEach(function(b){ b.addEventListener("click", function(e){ e.stopPropagation(); if (!sw.classList.contains("on")) return; var t = b.closest(".strail"); var wasOpen = t.classList.contains("open"); document.querySelectorAll(".strail.open").forEach(function(x){ x.classList.remove("open"); }); if (!wasOpen) t.classList.add("open"); }); });'
  + '  document.addEventListener("click", function(){ document.querySelectorAll(".strail.open").forEach(function(x){ x.classList.remove("open"); }); });'
  + '  apply(false);'
  + '})();'
  + '</script>';

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Skill Card - Cowork Preview</title><style>' + css + '</style></head><body>'
  + '<h1>Skill Card - Cowork</h1>'
  + '<p class="hint">Skill / MCP row in a plugin L2. Bordered row: glyph + name + description + trailing control.</p>'
  + '<div class="bar"><span class="switch"><button class="tgl" id="connSwitch" role="switch" aria-checked="false"><span class="tgl__thumb"></span></button> Connected — chevron becomes an overflow (⋮) menu</span></div>'
  + '<div class="wrap">' + rows + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'skillCardCowork.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'skillCardCowork.html'));
