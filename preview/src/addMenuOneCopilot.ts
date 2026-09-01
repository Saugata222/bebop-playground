/**
 * Add Menu (One Copilot) — Interactive Preview
 *
 * One Copilot compound (Menu node 3090:16767, placement 3090:16313). The menu
 * triggered by the "+" button in the chat input. Composed from existing One
 * Copilot primitives: the Menu Popover surface + MenuListItem rows grouped by
 * Dividers. Shows the menu, a live placement demo anchored to a "+" button, and
 * usage guidance.
 *
 * Icons: exact Fluent System assets from src/components/icons.
 * Font: Segoe Sans (functional body-medium).
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Icons ──────────────────────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
const attach = readIcon('attach-20-regular.svg');
const arrowUpload = readIcon('arrow-upload-20-regular.svg');
const cloud = readIcon('cloud-20-regular.svg');
const options = readIcon('options-20-regular.svg');
const flow = readIcon('flow-20-regular.svg');
const chevronRight = readIcon('chevron-right-20-regular.svg');
const add = readIcon('add-20-regular.svg');

// ─── Menu markup (composes menuListItem + divider) ──────────

interface Item { label: string; icon: string; submenu?: boolean; }
const ITEMS: (Item | 'divider')[] = [
  { label: 'Add content', icon: attach },
  { label: 'Upload image and files', icon: arrowUpload },
  { label: 'Attach cloud files', icon: cloud },
  'divider',
  { label: 'Add capabilities', icon: options, submenu: true },
  'divider',
  { label: 'Change data sources', icon: flow },
];

function row(it: Item): string {
  return '<div class="mli" role="menuitem">'
    + '<span class="mli__icon">' + it.icon + '</span>'
    + '<span class="mli__label">' + it.label + '</span>'
    + (it.submenu ? '<span class="mli__chev">' + chevronRight + '</span>' : '')
    + '</div>';
}

function menu(): string {
  let rows = '';
  for (const it of ITEMS) rows += it === 'divider' ? '<div class="am-div"></div>' : row(it);
  return '<div class="menu" role="menu">' + rows + '</div>';
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

/* ─── Menu popover (reuses Menu surface) ─── */
.menu {
  width: 240px; background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 16px; padding: 8px;
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.08), 0px 2px 4px 0px rgba(0,0,0,0.03), 0px 4px 6px 0px rgba(0,0,0,0.08);
  display: flex; flex-direction: column;
}

/* ─── MenuListItem (reused primitive) ─── */
.mli { display: flex; align-items: center; gap: 6px; width: 100%; padding: 10px 12px; border-radius: 12px; background: rgba(36,36,36,0); cursor: pointer; transition: background 0.1s; }
.mli:hover { background: rgba(36,36,36,0.04); }
.mli:active { background: rgba(36,36,36,0.08); }
.mli__icon { display: inline-flex; width: 20px; height: 20px; color: #242424; flex-shrink: 0; }
.mli__icon svg { width: 20px; height: 20px; }
.mli__label { flex: 1 0 0; min-width: 0; font-size: 14px; line-height: 20px; letter-spacing: 0; color: #242424; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mli__chev { display: inline-flex; width: 20px; height: 20px; color: #6f6f6f; flex-shrink: 0; }
.mli__chev svg { width: 20px; height: 20px; }

/* ─── Divider (reused primitive) ─── */
.am-div { height: 1px; background: rgba(189,189,189,0.5); margin: 8px 0; }

/* ─── Placement demo — chat input footer with "+" trigger ─── */
.stage { background: #fff; border: 1px solid #ebebeb; border-radius: 16px; padding: 40px; display: flex; justify-content: center; }
.ci { position: relative; width: 560px; }
.ci__box { background: #fff; border: 1px solid #dedede; border-radius: 24px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); padding: 12px; display: flex; flex-direction: column; gap: 8px; }
.ci__text { font-size: 15px; color: #6f6f6f; padding: 6px 8px 18px; }
.ci__footer { display: flex; align-items: center; gap: 8px; }
.ci__btn { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; border-radius: 12px; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s; }
.ci__btn:hover { background: rgba(36,36,36,0.04); }
.ci__btn svg { width: 20px; height: 20px; }
.ci__spacer { flex: 1; }
.ci__send { width: 32px; height: 32px; border-radius: 9999px; background: #242424; }

/* Anchored menu — opens Above, left-aligned to the "+" */
.am-anchor { position: absolute; left: 12px; bottom: 56px; opacity: 0; visibility: hidden; transform: translateY(4px); transition: opacity 0.12s ease, transform 0.12s ease; }
.ci.is-open .am-anchor { opacity: 1; visibility: visible; transform: translateY(0); }
.ci.is-open .ci__btn--add { background: rgba(36,36,36,0.08); }

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

// ─── Body ───────────────────────────────────────────────────

const body = [
  '<h2>Menu</h2>',
  '<div class="rl">Popover \u00b7 composed of MenuListItem + Divider</div>',
  '<div style="display:flex;justify-content:center;padding:16px 0;">' + menu() + '</div>',

  '<h2>Placement</h2>',
  '<p class="hint" style="text-align:left;margin:0 0 12px;">Triggered by the <strong>+</strong> button in the chat input; opens Above, left-aligned to the trigger. Click it.</p>',
  '<div class="stage"><div class="ci" id="ci">',
  '<div class="am-anchor">' + menu() + '</div>',
  '<div class="ci__box">',
  '<div class="ci__text">Message Copilot\u2026</div>',
  '<div class="ci__footer">',
  '<button class="ci__btn ci__btn--add" id="addBtn" type="button" aria-label="Add" aria-haspopup="menu">' + add + '</button>',
  '<span class="ci__spacer"></span>',
  '<span class="ci__send"></span>',
  '</div>',
  '</div>',
  '</div></div>',

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> The Add menu is the entry point from the chat input\u2019s <strong>+</strong> button for bringing content and capabilities into a conversation \u2014 adding content, uploading files, attaching cloud files, adding capabilities, and changing data sources. It is a standard Menu: reuse MenuListItem rows and Dividers rather than bespoke layout.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Anchor it to the + button and open Above, left-aligned to the trigger.</li>',
  '<li>Group related actions with Dividers (add/upload/attach \u00b7 capabilities \u00b7 data sources).</li>',
  '<li>Give branching items (Add capabilities) a trailing chevron to signal a submenu.</li>',
  '<li>Compose from MenuListItem + the Menu Popover surface \u2014 don\u2019t re-style rows.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Overload it \u2014 keep to the core add / upload / attach / capabilities / sources set.</li>',
  '<li>Mix secondary text or avatars into these rows; they are simple icon + label.</li>',
  '<li>Detach the menu from the + trigger or open it far from the anchor.</li>',
  '<li>Use a chevron on non-branching items.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

// ─── Interaction ────────────────────────────────────────────

let js = '';
js += '<script>';
js += '\n';
js += 'var ci = document.getElementById(\'ci\');';
js += '\n';
js += 'var addBtn = document.getElementById(\'addBtn\');';
js += '\n';
js += 'addBtn.addEventListener(\'click\', function (e) { e.stopPropagation(); ci.classList.toggle(\'is-open\'); });';
js += '\n';
js += 'document.addEventListener(\'click\', function () { ci.classList.remove(\'is-open\'); });';
js += '\n';
js += 'ci.querySelector(\'.am-anchor\').addEventListener(\'click\', function (e) { e.stopPropagation(); });';
js += '\n';
js += 'document.addEventListener(\'keydown\', function (e) { if (e.key === \'Escape\') ci.classList.remove(\'is-open\'); });';
js += '\n';
js += '</script>';

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Add Menu (One Copilot) Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Add Menu \u2014 Component Preview</h1>'
  + '<p class="hint">The menu opened by the chat input\u2019s + button \u2014 composed from the Menu Popover, MenuListItem rows, and Dividers.</p>'
  + body + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'addMenuOneCopilot.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
