/**
 * Card - Cowork — Interactive HTML Preview
 *
 * The plugin discovery card from the Cowork Customize page (Figma node
 * 45:172081, Discover grid). Bordered white tile: brand logo + name + 2-line
 * description. Rendered in a 2-column grid. Composes: card surface + logo + text.
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function logoImg(file: string): string {
  try { return 'data:image/png;base64,' + fs.readFileSync(path.join(iconsDir, file)).toString('base64'); } catch (e) { return ''; }
}
function tile(letter: string, bg: string, fg = '#fff'): string {
  return '<span class="tile" style="background:' + bg + ';color:' + fg + '">' + letter + '</span>';
}
function brand(file: string): string { return '<img class="logo" src="' + logoImg(file) + '" alt=""/>'; }

const CARDS = [
  { logo: brand('confluence-logo.png'), name: 'Confluence', desc: 'Reference team wikis, docs, and knowledge base articles' },
  { logo: brand('github-logo.png'), name: 'Github', desc: 'Reference repositories, issues, and pull requests across teams' },
  { logo: brand('jira-logo.png'), name: 'Jira', desc: 'Reference issues, sprints, and project workflows, and let Copilot search, su…' },
  { logo: tile('M', '#ffd02f', '#000'), name: 'Miro', desc: 'Capture ideas, generate diagrams, and sync outcomes t…' },
  { logo: tile('H', '#111', '#fff'), name: 'Harvey', desc: 'Accelerate legal drafting, review, and research with domain-tun…' },
  { logo: tile('M', '#ff3d57', '#fff'), name: 'Monday.com', desc: 'Create, update, and summarize' },
];

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #fafafa; color: #242424; padding: 48px 24px; }
h1 { font-size: 22px; font-weight: 600; text-align: center; margin-bottom: 6px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 28px; }
.wrap { max-width: 720px; margin: 0 auto; }
.grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.card { display: flex; gap: 12px; align-items: flex-start; background: #fff; border: 1px solid #dedede; border-radius: 12px; padding: 16px; cursor: pointer; transition: background 0.1s, border-color 0.1s, box-shadow 0.1s; }
.card:hover { background: #fcfcfc; border-color: #c7c7c7; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.logo { width: 28px; height: 28px; flex-shrink: 0; border-radius: 6px; object-fit: contain; display: block; }
.tile { width: 28px; height: 28px; flex-shrink: 0; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; }
.ctext { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.cname { font-size: 14px; line-height: 20px; font-weight: 600; color: #242424; }
.cdesc { font-size: 12px; line-height: 16px; color: #5d5d5d; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
`;

const grid = '<div class="grid">' + CARDS.map(function (c) {
  return '<div class="card">' + c.logo + '<div class="ctext"><span class="cname">' + c.name + '</span><span class="cdesc">' + c.desc + '</span></div></div>';
}).join('') + '</div>';

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Card - Cowork Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Card - Cowork</h1>'
  + '<p class="hint">Plugin discovery card (Cowork Customize → Discover). Bordered tile: brand logo + name + 2-line description, in a 2-column grid.</p>'
  + grid + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'cardCowork.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'cardCowork.html'));
