/**
 * MenuListItem (+ Menu surface) — Interactive Preview
 *
 * One Copilot primitive (Menu node 1956:15558, MenuListItem node 1956:14786).
 * Renders the full state matrix (rest / hover / pressed / selected / disabled)
 * for both secondary-text positions (Right = single line, Under = two lines),
 * a live Menu popover, and usage guidance.
 *
 * Icons: exact Fluent System assets (image-20 regular + filled) from
 * src/components/icons. Font: Segoe Sans (functional body).
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Icons — exact Fluent System assets ─────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
const image20 = readIcon('image-20-regular.svg');
const image20Filled = readIcon('image-20-filled.svg');

// ─── Markup builders ────────────────────────────────────────

interface ItemOpts {
  label?: string;
  secondary?: string;
  under?: boolean;    // Secondary=Under (two-line)
  state?: string;     // hover | pressed | disabled
  selected?: boolean;
  trailing?: boolean; // reserve 32px trailing slot
}

function item(opts: ItemOpts): string {
  const label = opts.label || 'Menu item';
  const secondary = opts.secondary || 'Secondary';
  const cls = ['mli'];
  if (opts.under) cls.push('mli--under');
  if (opts.state) cls.push('mli--' + opts.state);
  if (opts.selected) cls.push('mli--selected');

  const glyph = opts.selected ? image20Filled : image20;
  const icon = '<span class="mli__icon">' + glyph + '</span>';

  let content = '';
  if (opts.under) {
    content = '<span class="mli__content">'
      + '<span class="mli__label">' + label + '</span>'
      + '<span class="mli__secondary">' + secondary + '</span>'
      + '</span>';
  } else {
    content = '<span class="mli__label mli__label--inline">' + label + '</span>'
      + '<span class="mli__secondary mli__secondary--inline">' + secondary + '</span>';
  }

  const trailing = opts.under && opts.trailing ? '<span class="mli__trailing"></span>' : '';

  return '<div class="' + cls.join(' ') + '" role="menuitem"'
    + (opts.state === 'disabled' ? ' aria-disabled="true"' : '')
    + (opts.selected ? ' aria-checked="true"' : '')
    + '>' + icon + content + trailing + '</div>';
}

/** A framed row so backplate states read clearly on the grey page. */
function frame(label: string, node: string): string {
  return '<div class="cell"><span class="rl">' + label + '</span><div class="frame">' + node + '</div></div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 760px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }
.row { display: flex; gap: 40px; flex-wrap: wrap; align-items: flex-start; margin-bottom: 16px; }
.cell { display: flex; flex-direction: column; }
.frame { width: 224px; }

/* ─── MenuListItem ─── */
.mli {
  display: flex; align-items: center; gap: 6px; width: 100%;
  padding: 10px 12px; border-radius: 12px; background: rgba(36,36,36,0);
  cursor: pointer; transition: background 0.1s;
}
.mli--under { align-items: center; }

/* Interaction backplate */
.mli:hover, .mli--hover { background: rgba(36,36,36,0.04); }
.mli--pressed { background: rgba(36,36,36,0.08); }
.mli--selected { background: #ebebeb; }
.mli--selected:hover, .mli--selected.mli--hover { background: #e0e0e0; }
.mli--disabled { background: rgba(36,36,36,0); cursor: not-allowed; }

/* Leading icon — 20px, primary; filled + inherited when selected */
.mli__icon { display: inline-flex; width: 20px; height: 20px; color: #242424; flex-shrink: 0; }
.mli__icon svg { width: 20px; height: 20px; }
.mli--disabled .mli__icon { color: #929292; }

/* Content stack (Secondary=Under) */
.mli__content { display: flex; flex-direction: column; gap: 4px; min-width: 0; flex: 1 0 0; overflow: hidden; }

/* Label — Functional / Body Medium (Segoe Sans 14 / 420 / 20) */
.mli__label {
  font-size: 14px; line-height: 20px; letter-spacing: 0; color: #242424;
  font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.mli__label--inline { flex: 1 0 0; min-width: 0; }
.mli--selected .mli__label { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.mli--disabled .mli__label { color: #929292; }

/* Secondary — Functional / Body Small (Segoe Sans 12 / 420 / 16) */
.mli__secondary {
  font-size: 12px; line-height: 16px; letter-spacing: 0; color: #5d5d5d;
  font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420;
  white-space: nowrap;
}
.mli__secondary--inline { flex-shrink: 0; }
.mli--disabled .mli__secondary { color: #929292; }

/* Reserved trailing slot (Secondary=Under) */
.mli__trailing { width: 32px; height: 32px; flex-shrink: 0; }

/* Focus ring — 2px black outer + 1px white inner */
.mli:focus-visible { outline: 2px solid #242424; outline-offset: 0; box-shadow: 0 0 0 1px #fff inset; }

/* ─── Menu popover ─── */
.menu {
  width: 240px; background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 16px; padding: 8px;
  box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.08), 0px 2px 4px 0px rgba(0,0,0,0.03), 0px 4px 6px 0px rgba(0,0,0,0.08);
  display: flex; flex-direction: column;
}

/* ─── Usage docs ─── */
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
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
`;

// ─── Body markup ────────────────────────────────────────────

const body = [
  stage('<div class="menu" role="menu" style="width:240px">' + item({ label: 'Open' }) + item({ label: 'Duplicate', selected: true }) + item({ label: 'Rename' }) + item({ label: 'Delete', state: 'disabled' }) + '</div>'),
  '<h2>Secondary \u00b7 Right (single line, 40px)</h2>',
  '<div class="row">',
  frame('Rest', item({})),
  frame('Hover', item({ state: 'hover' })),
  frame('Pressed', item({ state: 'pressed' })),
  '</div>',
  '<div class="row">',
  frame('Selected', item({ selected: true })),
  frame('Disabled', item({ state: 'disabled' })),
  '</div>',

  '<h2>Secondary \u00b7 Under (two lines, 60px)</h2>',
  '<div class="row">',
  frame('Rest', item({ under: true, label: 'Menu', trailing: true })),
  frame('Hover', item({ under: true, label: 'Menu', state: 'hover', trailing: true })),
  frame('Pressed', item({ under: true, label: 'Menu', state: 'pressed', trailing: true })),
  '</div>',
  '<div class="row">',
  frame('Selected', item({ under: true, label: 'Menu item', selected: true, trailing: true })),
  frame('Disabled', item({ under: true, label: 'Menu item', state: 'disabled', trailing: true })),
  '</div>',

  '<h2>Menu \u00b7 in context</h2>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Popover \u00b7 single line</span><div class="menu" role="menu">'
    + item({ label: 'Open' })
    + item({ label: 'Duplicate', selected: true })
    + item({ label: 'Rename' })
    + item({ label: 'Delete', state: 'disabled' })
    + '</div></div>',
  '<div class="cell"><span class="rl">Popover \u00b7 two line</span><div class="menu" role="menu">'
    + item({ under: true, label: 'GPT-4o', secondary: 'Great for most tasks' })
    + item({ under: true, label: 'o1', secondary: 'Advanced reasoning', selected: true })
    + item({ under: true, label: 'o1-mini', secondary: 'Faster reasoning' })
    + '</div></div>',
  '</div>',

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> Rows inside a floating Menu that trigger a command or select a value. Pair a 20px leading icon with a primary label; use the secondary slot for a value, shortcut, or one-line description \u2014 Right for compact commands, Under for richer picks like a model list.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Signal the selected row with all three affordances: filled icon, semibold label, and the #ebebeb backplate.</li>',
  '<li>Keep labels short (Body Medium 14/20); truncate with an ellipsis rather than wrapping.</li>',
  '<li>Let each row stretch to the popover width; the 8px inset is on the surface, not the row.</li>',
  '<li>Keep the secondary text neutral-secondary (#5d5d5d) so it stays subordinate to the label.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Use Disabled to represent an unselected row \u2014 disabled means unavailable.</li>',
  '<li>Mix Secondary=Right and Secondary=Under within the same menu.</li>',
  '<li>Put long-form or wrapping copy in the secondary slot.</li>',
  '<li>Drop the backplate on a selected row \u2014 weight and icon alone aren\'t enough.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Menu List Item Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Menu List Item \u2014 Component Preview</h1>'
  + '<p class="hint">One Copilot menu row + Popover surface. Secondary text positions Right (single line) or Under (two lines); selected rows get a filled icon, semibold label, and soft backplate.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'menuListItem.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
