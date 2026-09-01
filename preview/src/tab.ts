/**
 * Tab & TabList — Interactive HTML Preview
 *
 * Shows all tab variants: Layout × State × Selected
 * Plus TabList examples (text-only and icon-only rows).
 * Click to select a tab. Tab key for focus ring.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage, segControl } from './_scaffold';

// ─── Icons — real Fluent System assets (read from src/components/icons) ──────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}

// Image icon (Fluent, 20px) — the spec default icon slot
const imgR20 = readIcon('image-20-regular.svg');
const imgF20 = readIcon('image-20-filled.svg');
// Chevron (Fluent, 20px) — end-content overflow affordance
const chevron20 = readIcon('chevron-down-20-regular.svg');
// Grid icon (regular 20px)
const gridR20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4C4.89543 4 4 4.89543 4 6V9H9V4H6ZM10 4V9H16V6C16 4.89543 15.1046 4 14 4H10ZM16 10H10V16H14C15.1046 16 16 15.1046 16 14V10ZM9 16V10H4V14C4 15.1046 4.89543 16 6 16H9Z" fill="currentColor"/></svg>';
// Grid icon (filled 20px)
const gridF20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3C4.34315 3 3 4.34315 3 6V9.5H9.5V3H6ZM10.5 3V9.5H17V6C17 4.34315 15.6569 3 14 3H10.5ZM17 10.5H10.5V17H14C15.6569 17 17 15.6569 17 14V10.5ZM9.5 17V10.5H3V14C3 15.6569 4.34315 17 6 17H9.5Z" fill="currentColor"/></svg>';
// List icon (regular 20px)
const listR20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5.25C2.5 4.83579 2.83579 4.5 3.25 4.5H16.75C17.1642 4.5 17.5 4.83579 17.5 5.25C17.5 5.66421 17.1642 6 16.75 6H3.25C2.83579 6 2.5 5.66421 2.5 5.25ZM2.5 10C2.5 9.58579 2.83579 9.25 3.25 9.25H16.75C17.1642 9.25 17.5 9.58579 17.5 10C17.5 10.4142 17.1642 10.75 16.75 10.75H3.25C2.83579 10.75 2.5 10.4142 2.5 10ZM3.25 14C2.83579 14 2.5 14.3358 2.5 14.75C2.5 15.1642 2.83579 15.5 3.25 15.5H16.75C17.1642 15.5 17.5 15.1642 17.5 14.75C17.5 14.3358 17.1642 14 16.75 14H3.25Z" fill="currentColor"/></svg>';
// List icon (filled 20px)
const listF20 = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 5.25C2.5 4.83579 2.83579 4.5 3.25 4.5H16.75C17.1642 4.5 17.5 4.83579 17.5 5.25C17.5 5.66421 17.1642 6 16.75 6H3.25C2.83579 6 2.5 5.66421 2.5 5.25ZM2.5 10C2.5 9.58579 2.83579 9.25 3.25 9.25H16.75C17.1642 9.25 17.5 9.58579 17.5 10C17.5 10.4142 17.1642 10.75 16.75 10.75H3.25C2.83579 10.75 2.5 10.4142 2.5 10ZM3.25 14C2.83579 14 2.5 14.3358 2.5 14.75C2.5 15.1642 2.83579 15.5 3.25 15.5H16.75C17.1642 15.5 17.5 15.1642 17.5 14.75C17.5 14.3358 17.1642 14 16.75 14H3.25Z" fill="currentColor"/></svg>';

function icoSlot(): string {
  return '<span class="tab__ico-r">' + imgR20 + '</span><span class="tab__ico-f">' + imgF20 + '</span>';
}

// ─── Tab builder helpers ────────────────────────────────────

function textTab(extra: string, label: string, disabled = false): string {
  return '<button class="tab tab--text' + extra + '"'
    + (disabled ? ' disabled' : '')
    + '><span class="tab__label">' + label + '</span></button>';
}

function iconTextTab(extra: string, label: string, disabled = false): string {
  return '<button class="tab tab--text' + extra + '"'
    + (disabled ? ' disabled' : '')
    + '>' + icoSlot() + '<span class="tab__label">' + label + '</span></button>';
}

function iconOnlyTab(icoR: string, icoF: string, extra: string, disabled = false): string {
  return '<button class="tab tab--ico' + extra + '"'
    + (disabled ? ' disabled' : '')
    + '><span class="tab__ico-r">' + icoR + '</span><span class="tab__ico-f">' + icoF + '</span></button>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
h3 { font-size: 14px; font-weight: 600; margin: 20px 0 12px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 900px; margin: 0 auto; }
.row { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 8px; align-items: flex-start; }
.cell { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
.rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; }

/* ─── Tablist container ─── */
.tablist { display: flex; gap: 4px; align-items: flex-start; }

/* ─── Base Tab ─── */
.tab {
  display: inline-flex; align-items: center; justify-content: center;
  position: relative; cursor: pointer; border: none;
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  font-size: 14px; font-weight: 420; line-height: 20px;
  letter-spacing: 0; white-space: nowrap;
  transition: background 0.1s;
  outline: none;
  color: #242424;
  background: rgba(36,36,36,0);
}
.tab svg { display: block; flex-shrink: 0; width: 20px; height: 20px; }

/* Icon variant toggling */
.tab .tab__ico-r { display: inline-flex; }
.tab .tab__ico-f { display: none; }
.tab.sel .tab__ico-r { display: none; }
.tab.sel .tab__ico-f { display: inline-flex; }
.tab.no-ico .tab__ico-r, .tab.no-ico .tab__ico-f { display: none; }
.tab.no-label .tab__label { display: none; }

/* ─── Text layout (Icon+Label or Text-only) ─── */
.tab--text {
  min-height: 32px; min-width: 32px;
  padding: 6px 12px; gap: 4px;
  border-radius: 12px;
}

/* ─── Icon-only layout ─── */
.tab--ico {
  padding: 6px;
  border-radius: 9999px;
}

/* ─── Unselected states ─── */
.tab:hover:not(:disabled):not(.sel) { background: rgba(24,24,24,0.04); color: #181818; }
.tab:active:not(:disabled):not(.sel) { background: rgba(13,13,13,0.08); color: #0d0d0d; }

/* ─── Selected states ─── */
.tab.sel { background: #242424; color: #fff; font-weight: 625; }
.tab.sel:hover:not(:disabled) { background: #313131; color: #fff; }
.tab.sel:active:not(:disabled) { background: #3e3e3e; color: #fff; }

/* ─── Disabled ─── */
.tab:disabled { color: rgba(0,0,0,0.43); cursor: not-allowed; background: rgba(143,143,143,0.5); }
.tab.sel:disabled { background: rgba(143,143,143,0.5); color: rgba(0,0,0,0.43); }

/* ─── Focus ring ─── */
.tab:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }

/* ─── Hover/focus demo forcing ─── */
.hover-demo .tab { background: rgba(24,24,24,0.04); color: #181818; }
.hover-demo .tab.sel { background: #313131; color: #fff; }
.focus-demo .tab { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }

/* ─── End content (trailing icon button) ─── */
.tablist-strip { display: flex; align-items: center; gap: 4px; width: 400px; }
.tablist-strip .tablist { flex: 1 0 0; min-width: 0; overflow: clip; }
.tab-end {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; padding: 6px; border-radius: 9999px;
  border: 1px solid rgba(36,36,36,0); background: transparent; color: #242424;
  cursor: pointer; flex-shrink: 0;
}
.tab-end:hover { background: rgba(24,24,24,0.04); }
.tab-end svg { width: 20px; height: 20px; display: block; }

/* ─── Usage guidance ─── */
.usage__sec { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 20px 22px; margin-bottom: 12px; }
.usage__sec h3 { font-size: 16px; font-weight: 600; letter-spacing: -0.3px; margin: 0 0 10px; color: #242424; }
.usage__sec p.lead { font-size: 13px; line-height: 1.6; color: #5d5d5d; margin-bottom: 10px; }
.usage__sub { font-size: 12px; font-weight: 600; color: #242424; margin: 12px 0 6px; }
.usage__sec ul { list-style: none; display: flex; flex-direction: column; gap: 7px; margin: 0; }
.usage__sec li { font-size: 13px; line-height: 1.55; color: #5d5d5d; padding-left: 18px; position: relative; }
.usage__sec li::before { content: ''; position: absolute; left: 2px; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: #c7c7c7; }
.usage__sec li b { color: #242424; font-weight: 600; }
`;

// ─── Sections ───────────────────────────────────────────────

const heroTab = '<button id="heroTab" class="tab tab--text sel">' + icoSlot() + '<span class="tab__label">Tab</span></button>';
const heroControls =
  segControl('Layout', 'layout', [
    { value: 'both', label: 'Icon + text', active: true },
    { value: 'text', label: 'Text' },
    { value: 'icon', label: 'Icon' },
  ]) +
  segControl('State', 'state', [
    { value: 'rest', label: 'Rest' },
    { value: 'selected', label: 'Selected', active: true },
    { value: 'disabled', label: 'Disabled' },
  ]);

const body = [
  '<div class="wrap">',
  stage(heroTab, heroControls),

  // ─── TabList: Text only ───
  '<h2>TabList — Text Only</h2>',
  '<div class="tablist" data-tablist>',
  textTab(' sel', 'All'),
  textTab('', 'Files'),
  textTab('', 'People'),
  textTab('', 'Chats'),
  textTab('', 'Emails'),
  '</div>',

  // ─── TabList: Icon + Text ───
  '<h2>TabList — Icon + Text</h2>',
  '<div class="tablist" data-tablist>',
  iconTextTab(' sel', 'All'),
  iconTextTab('', 'Files'),
  iconTextTab('', 'People'),
  iconTextTab('', 'Chats'),
  '</div>',

  // ─── TabList: Icon only ───
  '<h2>TabList — Icon Only</h2>',
  '<div class="tablist" data-tablist>',
  iconOnlyTab(imgR20, imgF20, ' sel'),
  iconOnlyTab(gridR20, gridF20, ''),
  iconOnlyTab(listR20, listF20, ''),
  '</div>',

  // ─── TabList: with End content ───
  '<h2>TabList — With End Content</h2>',
  '<p class="hint" style="text-align:left;margin:0 0 12px">The trailing action lives in the End content slot, pinned to the trailing edge; the tab strip clips its overflow.</p>',
  '<div class="tablist-strip">',
  '<div class="tablist" data-tablist>',
  textTab(' sel', 'All'),
  textTab('', 'Files'),
  textTab('', 'People'),
  textTab('', 'Chats'),
  '</div>',
  '<button class="tab-end" aria-label="More tabs">' + chevron20 + '</button>',
  '</div>',

  // ─── Tab States: Unselected ───
  '<h2>Tab States — Text (Icon + Label)</h2>',
  '<h3>Unselected</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>' + textTab('', 'Tab') + '</div>',
  '<div class="cell"><span class="rl">Hover</span><span class="hover-demo">' + textTab('', 'Tab') + '</span></div>',
  '<div class="cell"><span class="rl">Disabled</span>' + textTab('', 'Tab', true) + '</div>',
  '<div class="cell"><span class="rl">Focused</span><span class="focus-demo">' + textTab('', 'Tab') + '</span></div>',
  '</div>',

  '<h3>Selected</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>' + textTab(' sel', 'Tab') + '</div>',
  '<div class="cell"><span class="rl">Hover</span><span class="hover-demo">' + textTab(' sel', 'Tab') + '</span></div>',
  '<div class="cell"><span class="rl">Disabled+Sel</span>' + textTab(' sel', 'Tab', true) + '</div>',
  '<div class="cell"><span class="rl">Focused</span><span class="focus-demo">' + textTab(' sel', 'Tab') + '</span></div>',
  '</div>',

  // ─── Tab States: Icon Only ───
  '<h2>Tab States — Icon Only</h2>',
  '<h3>Unselected</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>' + iconOnlyTab(imgR20, imgF20, '') + '</div>',
  '<div class="cell"><span class="rl">Hover</span><span class="hover-demo">' + iconOnlyTab(imgR20, imgF20, '') + '</span></div>',
  '<div class="cell"><span class="rl">Disabled</span>' + iconOnlyTab(imgR20, imgF20, '', true) + '</div>',
  '</div>',

  '<h3>Selected</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>' + iconOnlyTab(imgR20, imgF20, ' sel') + '</div>',
  '<div class="cell"><span class="rl">Hover</span><span class="hover-demo">' + iconOnlyTab(imgR20, imgF20, ' sel') + '</span></div>',
  '<div class="cell"><span class="rl">Disabled+Sel</span>' + iconOnlyTab(imgR20, imgF20, ' sel', true) + '</div>',
  '</div>',

  // ─── Tab States: Icon + Text ───
  '<h2>Tab States — Icon + Text</h2>',
  '<h3>Unselected</h3>',
  '<div class="row">',
  '<div class="cell"><span class="rl">Rest</span>' + iconTextTab('', 'Tab') + '</div>',
  '<div class="cell"><span class="rl">Selected</span>' + iconTextTab(' sel', 'Tab') + '</div>',
  '<div class="cell"><span class="rl">Disabled</span>' + iconTextTab('', 'Tab', true) + '</div>',
  '</div>',

  // ─── Usage guidance ───
  '<h2>Tab — Usage guidance</h2>',
  '<div class="usage__sec"><h3>Behavior</h3><ul>',
  '<li>Use a tab to switch between related content panels within a persistent container (Files, People, Chats) — only one panel is visible at a time.</li>',
  '<li>A tablist must always have exactly one active tab. Zero or multiple selected tabs is invalid — always keep one Selected=True.</li>',
  '<li>Don\'t use Disabled to represent an inactive tab. Disabled means unavailable; use Selected=False for the non-active tab.</li>',
  '<li>When Selected changes, the label weight shifts Regular (420) → Semibold (625). Reserve layout space at the Semibold width (ghost node) so the layout doesn\'t reflow.</li>',
  '<li>Never use a tab outside of a tablist — it isn\'t a standalone control.</li>',
  '</ul></div>',
  '<div class="usage__sec"><h3>Layout</h3>',
  '<p class="lead">Tab ships in two layouts — choose based on available space and icon recognizability.</p><ul>',
  '<li><b>Icon + label</b> is the default. The label improves discoverability and is right in most surfaces.</li>',
  '<li><b>Icon only</b> is for space-constrained contexts where the icon is self-explanatory. The container becomes circular and padding squares up — always provide an aria-label.</li>',
  '<li>Apply the correct radius token: Icon + label uses base-300 (12px); Icon only uses circular. Don\'t hardcode pixels.</li>',
  '<li>For the icon slot, use the Fluent Image icon as the default — never placeholder shapes or custom vectors.</li>',
  '</ul></div>',
  '<div class="usage__sec"><h3>Accessibility</h3><ul>',
  '<li><b>aria-label on Icon only tabs:</b> describe the content panel, not the icon — “Settings”, not “Gear icon”.</li>',
  '<li><b>Reduced motion:</b> when prefers-reduced-motion: reduce is set, tab transitions are instant.</li>',
  '</ul></div>',
  '<div class="usage__sec"><h3>Content</h3><ul>',
  '<li>Always use functional typography on labels. Never apply content-set type — tabs are interactive UI chrome, not editorial content.</li>',
  '</ul></div>',

  '<h2>TabList — Usage guidance</h2>',
  '<div class="usage__sec"><h3>Behavior</h3>',
  '<p class="lead">Tablist groups related tabs into a horizontal navigation strip for switching between mutually exclusive content panels, with an optional trailing end-content action.</p>',
  '<div class="usage__sub">Selection</div><ul>',
  '<li>Always keep exactly one tab Selected=true. Zero or multiple selected tabs is invalid state.</li></ul>',
  '<div class="usage__sub">End content</div><ul>',
  '<li>Place trailing actions in the End content slot — appending a standalone sibling button breaks alignment and the keyboard model.</li></ul>',
  '<div class="usage__sub">Container styling</div><ul>',
  '<li>Never apply a background fill or stroke to the container — tablist is a transparent layout wrapper; visual weight comes from the child tabs.</li>',
  '</ul></div>',
  '<div class="usage__sec"><h3>Layout</h3><ul>',
  '<li>Use the gap token — don\'t hardcode pixel values.</li>',
  '<li>Don\'t mix tab layouts within one tablist. Use either all Icon + text or all Icon only — mixing breaks rhythm and hit targets.</li>',
  '</ul></div>',
  '<div class="usage__sec"><h3>Accessibility</h3><ul>',
  '<li><b>Roving tabindex:</b> the tablist is a single tab stop with arrow-key navigation between tabs — don\'t make each tab a separate tab stop.</li>',
  '<li><b>Accessible name:</b> aria-label the container by purpose (“Message categories”), not by listing tab names.</li>',
  '<li><b>Tabpanels:</b> pair each tab with a role="tabpanel"; hide inactive panels with the hidden attribute rather than removing them from the DOM.</li>',
  '</ul></div>',

  '</div>',

  // ─── Script ───
  '<script>',
  '  (function(){ var hero=document.getElementById("heroTab"); var st={layout:"both",state:"selected"};',
  '    function paint(){ var cls=["tab"]; if(st.layout==="icon"){cls.push("tab--ico","no-label");} else {cls.push("tab--text"); if(st.layout==="text")cls.push("no-ico");} if(st.state==="selected")cls.push("sel"); hero.className=cls.join(" "); hero.disabled=st.state==="disabled"; }',
  '    document.querySelectorAll("[data-ctrl]").forEach(function(btn){ btn.addEventListener("click", function(){ var name=btn.getAttribute("data-ctrl"); st[name]=btn.getAttribute("data-value"); var seg=btn.parentNode; seg.querySelectorAll("button").forEach(function(b){ b.classList.toggle("is-active", b===btn); }); paint(); }); });',
  '    paint(); })();',
  '  // TabList behavior: single-select within each tablist',
  '  document.querySelectorAll("[data-tablist]").forEach(tl => {',
  '    tl.querySelectorAll(".tab").forEach(t => {',
  '      t.addEventListener("click", () => {',
  '        if (t.disabled) return;',
  '        tl.querySelectorAll(".tab").forEach(s => s.classList.remove("sel"));',
  '        t.classList.add("sel");',
  '      });',
  '    });',
  '  });',
  '  // Standalone tabs: toggle',
  '  document.querySelectorAll(".tab:not([data-tablist] .tab)").forEach(t => {',
  '    t.addEventListener("click", () => {',
  '      if (t.disabled) return;',
  '      t.classList.toggle("sel");',
  '    });',
  '  });',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Tab &amp; TabList Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'tab.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
