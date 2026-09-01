/**
 * List Item - Cowork — Interactive HTML Preview
 *
 * The installed-plugin row from the Cowork Customize page (Figma node 45:172081,
 * Installed list). Soft-filled row: brand logo + name + single-line description
 * + a reference toggle + a chevron to the plugin L2. Composes: row + toggle +
 * chevron. Interactive: click the toggle to flip on/off.
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function ico(name: string): string {
  try { return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8').replace(/\n/g, '').replace(/ (width|height)="\d+"/g, '').replace(/fill="#[0-9a-fA-F]{6}"/g, 'fill="currentColor"'); } catch (e) { return ''; }
}
function logoImg(file: string): string {
  try { return 'data:image/png;base64,' + fs.readFileSync(path.join(iconsDir, file)).toString('base64'); } catch (e) { return ''; }
}
function tile(letter: string, bg: string, fg = '#fff'): string { return '<span class="logo tile" style="background:' + bg + ';color:' + fg + '">' + letter + '</span>'; }
function brand(file: string): string { return '<img class="logo" src="' + logoImg(file) + '" alt=""/>'; }
const CHEV = ico('chevron-right-20-regular');

const ROWS = [
  { logo: tile('B', '#0061d5'), name: 'Box', desc: 'Sync repos, issues, pull requests, and workflows It combines data access, reasoning, and action t…', on: true },
  { logo: tile('G', '#8a50ff'), name: 'Gong', desc: 'Sync repos, issues, pull requests, and workflows', on: true },
  { logo: brand('jira-logo.png'), name: 'Jira', desc: 'Reference issues, sprints, and project workflows, and let Copilot search, summarize, and draft up…', on: true },
];

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #fafafa; color: #242424; padding: 48px 24px; }
h1 { font-size: 22px; font-weight: 600; text-align: center; margin-bottom: 6px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 28px; }
.wrap { max-width: 600px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }
.row { display: flex; align-items: center; gap: 12px; width: 100%; background: #f5f5f5; border: none; border-radius: 12px; padding: 12px 16px; cursor: pointer; text-align: left; font-family: inherit; transition: background 0.1s; }
.row:hover { background: #efefef; }
.logo { width: 24px; height: 24px; flex-shrink: 0; border-radius: 6px; object-fit: contain; display: block; }
.tile { display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }
.rtext { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.rname { font-size: 14px; line-height: 20px; font-weight: 600; color: #242424; }
.rdesc { font-size: 12px; line-height: 16px; color: #5d5d5d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tgl { position: relative; width: 40px; height: 20px; border-radius: 9999px; background: #8a8a8a; flex-shrink: 0; cursor: pointer; transition: background 0.15s; border: none; }
.tgl.on { background: #242424; }
.tgl__thumb { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 9999px; background: #fff; transition: transform 0.15s; }
.tgl.on .tgl__thumb { transform: translateX(20px); }
.chev { display: inline-flex; width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; }
.chev svg { width: 20px; height: 20px; }
`;

const rows = ROWS.map(function (r, i) {
  return '<div class="row">' + r.logo
    + '<div class="rtext"><span class="rname">' + r.name + '</span><span class="rdesc">' + r.desc + '</span></div>'
    + '<button class="tgl' + (r.on ? ' on' : '') + '" data-i="' + i + '" role="switch" aria-checked="' + r.on + '"><span class="tgl__thumb"></span></button>'
    + '<span class="chev">' + CHEV + '</span></div>';
}).join('');

const js = '<script>document.querySelectorAll(".tgl").forEach(function(t){ t.addEventListener("click", function(e){ e.stopPropagation(); var on = t.classList.toggle("on"); t.setAttribute("aria-checked", on); }); });</script>';

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>List Item - Cowork Preview</title><style>' + css + '</style></head><body>'
  + '<h1>List Item - Cowork</h1>'
  + '<p class="hint">Installed-plugin row (Cowork Customize → Installed). Soft-filled row: logo + name + description + reference toggle + chevron to L2. Click a toggle.</p>'
  + '<div class="wrap">' + rows + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'listItemCowork.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'listItemCowork.html'));
