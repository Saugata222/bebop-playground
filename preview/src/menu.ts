/**
 * Menu — Interactive HTML Preview
 *
 * Shows all menu sub-components:
 *   - Menu surface with list items & section headers
 *   - List item states (rest, hover, selected, disabled)
 *   - Secondary content (right & under positions)
 *   - Split items with separate chevron hover
 *   - Checkmark, icon, avatar, chevron slots
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Icons ──────────────────────────────────────────────────

// Image icon (regular 20px)
const imgR20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 7.5C14 8.32843 13.3284 9 12.5 9C11.6716 9 11 8.32843 11 7.5C11 6.67157 11.6716 6 12.5 6C13.3284 6 14 6.67157 14 7.5ZM13 7.5C13 7.22386 12.7761 7 12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8C12.7761 8 13 7.77614 13 7.5ZM3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4C4.89543 4 4 4.89543 4 6V14C4 14.3726 4.10191 14.7215 4.27937 15.0201L8.94868 10.432C9.53227 9.85859 10.4677 9.85859 11.0513 10.432L15.7206 15.0201C15.8981 14.7215 16 14.3726 16 14V6C16 4.89543 15.1046 4 14 4H6ZM6 16H14C14.3692 16 14.7149 15.9 15.0118 15.7256L10.3504 11.1453C10.1559 10.9542 9.84409 10.9542 9.64956 11.1453L4.98824 15.7256C5.28505 15.9 5.63085 16 6 16Z" fill="currentColor"/></svg>';

// Checkmark (16px regular)
const checkR16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8536 3.14645C14.0488 3.34171 14.0488 3.65829 13.8536 3.85355L5.85355 11.8536C5.65829 12.0488 5.34171 12.0488 5.14645 11.8536L2.14645 8.85355C1.95118 8.65829 1.95118 8.34171 2.14645 8.14645C2.34171 7.95118 2.65829 7.95118 2.85355 8.14645L5.5 10.7929L13.1464 3.14645C13.3417 2.95118 13.6583 2.95118 13.8536 3.14645Z" fill="currentColor"/></svg>';

// Chevron right (20px)
const chevR20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.64645 4.14645C7.45118 4.34171 7.45118 4.65829 7.64645 4.85355L12.7929 10L7.64645 15.1464C7.45118 15.3417 7.45118 15.6583 7.64645 15.8536C7.84171 16.0488 8.15829 16.0488 8.35355 15.8536L13.8536 10.3536C14.0488 10.1583 14.0488 9.84171 13.8536 9.64645L8.35355 4.14645C8.15829 3.95118 7.84171 3.95118 7.64645 4.14645Z" fill="currentColor"/></svg>';

// Chevron down (12px) for split
const chevD12 = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z" fill="currentColor"/></svg>';

// Planet icon (agent/researcher, 20px)
const planetR20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10Z" fill="currentColor"/><path d="M10 6C9.44772 6 9 6.44772 9 7C9 7.55228 9.44772 8 10 8C10.5523 8 11 7.55228 11 7C11 6.44772 10.5523 6 10 6Z" fill="currentColor"/></svg>';

// Data line icon (analyst, 20px)
const dataR20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3.5C3 3.22386 3.22386 3 3.5 3C3.77614 3 4 3.22386 4 3.5V16H16.5C16.7761 16 17 16.2239 17 16.5C17 16.7761 16.7761 17 16.5 17H3.5C3.22386 17 3 16.7761 3 16.5V3.5ZM16.8536 6.85355C17.0488 6.65829 17.0488 6.34171 16.8536 6.14645C16.6583 5.95118 16.3417 5.95118 16.1464 6.14645L12 10.2929L9.85355 8.14645C9.65829 7.95118 9.34171 7.95118 9.14645 8.14645L5.14645 12.1464C4.95118 12.3417 4.95118 12.6583 5.14645 12.8536C5.34171 13.0488 5.65829 13.0488 5.85355 12.8536L9.5 9.20711L11.6464 11.3536C11.8417 11.5488 12.1583 11.5488 12.3536 11.3536L16.8536 6.85355Z" fill="currentColor"/></svg>';

// Agent add icon (20px)
const agentR20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C10.2761 2 10.5 2.22386 10.5 2.5V9.5H17.5C17.7761 9.5 18 9.72386 18 10C18 10.2761 17.7761 10.5 17.5 10.5H10.5V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V10.5H2.5C2.22386 10.5 2 10.2761 2 10C2 9.72386 2.22386 9.5 2.5 9.5H9.5V2.5C9.5 2.22386 9.72386 2 10 2Z" fill="currentColor"/></svg>';

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
h3 { font-size: 14px; font-weight: 600; margin: 20px 0 12px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 1000px; margin: 0 auto; }
.row { display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 16px; align-items: flex-start; }
.cell { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; }

/* ─── Menu surface ─── */
.menu {
  background: #ffffff; padding: 8px; border-radius: 16px;
  box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.18);
  display: flex; flex-direction: column; align-items: stretch;
  width: max-content;
}

/* ─── Menu Item (base) ─── */
.mi {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 12px; border-radius: 12px;
  width: 240px; cursor: pointer; border: none;
  font-family: inherit; font-size: 14px; font-weight: 400;
  line-height: 1.4; letter-spacing: 0; color: #242424;
  background: rgba(36,36,36,0); transition: background 0.1s;
  outline: none; text-align: left; position: relative;
}
.mi svg { display: block; flex-shrink: 0; }
.mi:hover:not(:disabled):not(.mi--sh) { background: rgba(36,36,36,0.04); color: #1d1d1d; }
.mi:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }

/* Selected */
.mi.sel { background: #ebebeb; font-weight: 600; }
.mi.sel:hover:not(:disabled) { background: #e1e1e1; color: #1d1d1d; }

/* Disabled */
.mi:disabled { color: #929292; cursor: not-allowed; background: rgba(36,36,36,0); }
.mi:disabled .mi__sec { color: #929292; }

/* Section Header */
.mi--sh { font-size: 12px; font-weight: 600; cursor: default; }
.mi--sh:hover { background: rgba(36,36,36,0); }

/* ─── Slots ─── */
.mi__icon { width: 20px; height: 20px; flex-shrink: 0; }
.mi__check { width: 16px; height: 16px; flex-shrink: 0; padding: 2px 0; }
.mi__avatar { width: 16px; height: 16px; border-radius: 9999px; flex-shrink: 0; background: #d0d0d0; padding: 2px; }
.mi__label { flex: 1 0 0; min-width: 1px; min-height: 1px; line-height: 1.4; }
.mi__sec { font-size: 12px; font-weight: 400; color: #5d5d5d; white-space: nowrap; line-height: 1.4; }
.mi.sel .mi__sec { font-weight: 600; }
.mi__chev { width: 20px; height: 20px; flex-shrink: 0; color: #242424; }

/* Content column (for "under" secondary position) */
.mi--under { align-items: flex-start; }
.mi__content { display: flex; flex-direction: column; flex: 1 0 0; min-width: 1px; overflow: hidden; }
.mi__content .mi__label { flex: none; }
.mi__content .mi__sec { white-space: normal; }

/* ─── Split item row ─── */
.mi-split {
  display: flex; align-items: center; width: 240px;
  border-radius: 12px; position: relative;
}
.mi-split .mi { flex: 1 0 0; width: auto; background: transparent; }
.mi-split .mi:hover:not(:disabled) { background: rgba(36,36,36,0.04); }
.mi-split .mi-split__btn {
  display: flex; align-items: center; justify-content: center;
  width: 44px; padding: 10px 12px; border-radius: 12px;
  border: none; cursor: pointer; background: transparent;
  color: #242424; transition: background 0.1s; outline: none;
}
.mi-split .mi-split__btn:hover:not(:disabled) { background: rgba(36,36,36,0.04); }
.mi-split .mi-split__btn:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }
.mi-split .mi-split__btn:disabled { color: #929292; cursor: not-allowed; }
.mi-split .mi-split__btn svg { display: block; }

/* Selected split — base bg on wrapper, independent hover on sub-parts */
.mi-split.sel { background: #ebebeb; }
.mi-split.sel .mi { font-weight: 600; background: transparent; }
.mi-split.sel .mi:hover:not(:disabled) { background: #e1e1e1; }
.mi-split.sel .mi-split__btn { background: transparent; }
.mi-split.sel .mi-split__btn:hover:not(:disabled) { background: #e1e1e1; }
`;

// ─── HTML builders ──────────────────────────────────────────

function menuItem(opts: {
  label: string;
  icon?: string;
  secondary?: string;
  secondaryUnder?: boolean;
  chevron?: boolean;
  checkmark?: boolean;
  selected?: boolean;
  disabled?: boolean;
  sectionHeader?: boolean;
}): string {
  const cls = ['mi'];
  if (opts.sectionHeader) cls.push('mi--sh');
  if (opts.selected) cls.push('sel');
  if (opts.secondaryUnder) cls.push('mi--under');

  let inner = '';
  if (opts.checkmark) inner += '<span class="mi__check">' + checkR16 + '</span>';
  if (opts.icon) inner += '<span class="mi__icon">' + opts.icon + '</span>';

  if (opts.secondaryUnder && opts.secondary) {
    inner += '<div class="mi__content">'
      + '<span class="mi__label">' + opts.label + '</span>'
      + '<span class="mi__sec">' + opts.secondary + '</span>'
      + '</div>';
  } else {
    inner += '<span class="mi__label">' + opts.label + '</span>';
    if (opts.secondary) inner += '<span class="mi__sec">' + opts.secondary + '</span>';
  }

  if (opts.chevron) inner += '<span class="mi__chev">' + chevR20 + '</span>';

  return '<button class="' + cls.join(' ') + '"'
    + (opts.disabled ? ' disabled' : '')
    + '>' + inner + '</button>';
}

function splitItem(opts: {
  label: string;
  icon?: string;
  secondary?: string;
  secondaryUnder?: boolean;
  selected?: boolean;
  disabled?: boolean;
}): string {
  const rowCls = 'mi-split' + (opts.selected ? ' sel' : '');
  const miCls = ['mi'];
  if (opts.selected) miCls.push('sel');
  if (opts.secondaryUnder) miCls.push('mi--under');

  let inner = '';
  if (opts.icon) inner += '<span class="mi__icon">' + opts.icon + '</span>';

  if (opts.secondaryUnder && opts.secondary) {
    inner += '<div class="mi__content">'
      + '<span class="mi__label">' + opts.label + '</span>'
      + '<span class="mi__sec">' + opts.secondary + '</span>'
      + '</div>';
  } else {
    inner += '<span class="mi__label">' + opts.label + '</span>';
    if (opts.secondary) inner += '<span class="mi__sec">' + opts.secondary + '</span>';
  }

  return '<div class="' + rowCls + '">'
    + '<button class="' + miCls.join(' ') + '"' + (opts.disabled ? ' disabled' : '') + '>' + inner + '</button>'
    + '<button class="mi-split__btn"' + (opts.disabled ? ' disabled' : '') + '>' + chevR20 + '</button>'
    + '</div>';
}

// ─── Sections ───────────────────────────────────────────────

const body = [
  '<div class="wrap">',
  '<h1>Menu — Component Preview</h1>',
  '<p class="hint">Hover items for hover state. Click to toggle selected. Tab for focus ring.</p>',

  // ─── Complete Menu Example ───
  '<h2>Complete Menu</h2>',
  '<div class="row">',
  '<div class="menu">',
  menuItem({ label: 'Chat with', sectionHeader: true }),
  menuItem({ label: 'Researcher', icon: planetR20, selected: true }),
  menuItem({ label: 'Analyst', icon: dataR20 }),
  menuItem({ label: 'New agent', icon: agentR20 }),
  '</div>',

  '<div class="menu">',
  menuItem({ label: 'View options', sectionHeader: true }),
  menuItem({ label: 'Grid view', icon: imgR20, secondary: 'Ctrl+G' }),
  menuItem({ label: 'List view', icon: imgR20, secondary: 'Ctrl+L', selected: true }),
  menuItem({ label: 'Compact view', icon: imgR20, disabled: true }),
  '</div>',

  '<div class="menu">',
  menuItem({ label: 'Actions', sectionHeader: true }),
  menuItem({ label: 'Open file', icon: imgR20 }),
  menuItem({ label: 'Share', icon: imgR20, chevron: true }),
  menuItem({ label: 'Export as…', icon: imgR20, chevron: true }),
  menuItem({ label: 'Delete', icon: imgR20, disabled: true }),
  '</div>',
  '</div>',

  // ─── List Item States ───
  '<h2>List Item States</h2>',
  '<h3>Secondary Right</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>',
  menuItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary' }),
  '</div>',
  '<div class="cell"><span class="rl">Selected</span>',
  menuItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary', selected: true }),
  '</div>',
  '<div class="cell"><span class="rl">Disabled</span>',
  menuItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary', disabled: true }),
  '</div>',
  '</div>',

  '<h3>Secondary Under</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>',
  menuItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary text', secondaryUnder: true }),
  '</div>',
  '<div class="cell"><span class="rl">Selected</span>',
  menuItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary text', secondaryUnder: true, selected: true }),
  '</div>',
  '<div class="cell"><span class="rl">Disabled</span>',
  menuItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary text', secondaryUnder: true, disabled: true }),
  '</div>',
  '</div>',

  '<h3>Text Only (No Icon)</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>',
  menuItem({ label: 'Menu item' }),
  '</div>',
  '<div class="cell"><span class="rl">With Chevron</span>',
  menuItem({ label: 'Menu item', chevron: true }),
  '</div>',
  '<div class="cell"><span class="rl">With Checkmark</span>',
  menuItem({ label: 'Menu item', checkmark: true }),
  '</div>',
  '</div>',

  '<h3>Section Headers</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Normal</span>',
  menuItem({ label: 'Section title', sectionHeader: true }),
  '</div>',
  '<div class="cell"><span class="rl">Disabled</span>',
  menuItem({ label: 'Section title', sectionHeader: true, disabled: true }),
  '</div>',
  '</div>',

  // ─── Split Items ───
  '<h2>Split Items</h2>',
  '<h3>Secondary Right</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>',
  splitItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary' }),
  '</div>',
  '<div class="cell"><span class="rl">Selected</span>',
  splitItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary', selected: true }),
  '</div>',
  '<div class="cell"><span class="rl">Disabled</span>',
  splitItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary', disabled: true }),
  '</div>',
  '</div>',

  '<h3>Secondary Under</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>',
  splitItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary', secondaryUnder: true }),
  '</div>',
  '<div class="cell"><span class="rl">Selected</span>',
  splitItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary', secondaryUnder: true, selected: true }),
  '</div>',
  '<div class="cell"><span class="rl">Disabled</span>',
  splitItem({ label: 'Menu item', icon: imgR20, secondary: 'Secondary', secondaryUnder: true, disabled: true }),
  '</div>',
  '</div>',

  '</div>',

  // ─── Script ───
  '<script>',
  '  // Single selection on click for list items (not section headers or disabled)',
  '  document.querySelectorAll(".mi:not(.mi--sh):not(:disabled)").forEach(el => {',
  '    el.addEventListener("click", () => {',
  '      document.querySelectorAll(".mi.sel").forEach(s => s.classList.remove("sel"));',
  '      el.classList.add("sel");',
  '    });',
  '  });',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Menu Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'menu.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
