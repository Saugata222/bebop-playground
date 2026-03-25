/**
 * _inject.ts — Post-processor for preview HTML files
 *
 * Redesigns every component preview page with:
 *   - Standardized header (title + tag + description + states)
 *   - Consistent layout, fonts, spacing matching the index/getting-started pages
 *   - Related components section at the bottom with 3 linked cards
 *   - Frosted auto-hide back bar
 *   - Bebop scrollbar primitive
 *
 * Run after all generators: npx tsx preview/src/_inject.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Component metadata ─────────────────────────────────────

interface ComponentMeta {
  title: string;
  desc: string;
  type: 'Compound' | 'Primitive';
  states: string[];
  related: string[]; // filenames without .html
}

const meta: Record<string, ComponentMeta> = {
  button: {
    title: 'Button',
    desc: 'Multi-variant button with 4 styles (subtle, outline, secondary, primary), 3 sizes (small, medium, large), icon and text layouts, selected and disabled states.',
    type: 'Primitive',
    states: ['Rest', 'Hover', 'Selected', 'Disabled'],
    related: ['tag', 'toggle', 'toolbar'],
  },
  tag: {
    title: 'Tag',
    desc: 'Dismissible chip with primary style, small and medium sizes, optional leading icon, and dismiss animation.',
    type: 'Primitive',
    states: ['Rest', 'Hover', 'Disabled'],
    related: ['button', 'divider', 'suggestionChips'],
  },
  tab: {
    title: 'Tab & TabList',
    desc: 'Pill-style tabs and tablist. Supports text and icon-only layouts, selected and unselected states, and single-select tablist behavior.',
    type: 'Primitive',
    states: ['Rest', 'Hover', 'Selected', 'Disabled', 'Focused'],
    related: ['button', 'divider', 'nav'],
  },
  toggle: {
    title: 'Toggle',
    desc: 'Small toggle switch for binary on/off states. Supports checked and unchecked with optional label and disabled state.',
    type: 'Primitive',
    states: ['Checked', 'Unchecked', 'Disabled'],
    related: ['button', 'sourcesMenu', 'divider'],
  },
  divider: {
    title: 'Divider',
    desc: 'Horizontal and vertical divider lines with optional inline content label. Supports center, start, and end alignment.',
    type: 'Primitive',
    states: ['Horizontal', 'Vertical', 'With Content'],
    related: ['toolbar', 'tab', 'tag'],
  },
  suggestionChips: {
    title: 'Suggestion Chips',
    desc: 'Prompt suggestion chips shown below the chat input. Outline style with hover state and overflow button.',
    type: 'Primitive',
    states: ['Rest', 'Hover', 'Focused'],
    related: ['button', 'chatInput', 'tag'],
  },
  sourceCard: {
    title: 'Source Card',
    desc: 'Compact connector card for the Apps & Sources view. Shows a service icon, name, and action control in 4 states: Add, Added, Enabled, Disabled.',
    type: 'Primitive',
    states: ['Add', 'Added', 'Enabled', 'Disabled'],
    related: ['toggle', 'button', 'sourcesMenu'],
  },
  menu: {
    title: 'Menu',
    desc: 'Dropdown menu surface with list items, section headers, secondary content positioning, split items, checkmarks, and chevron indicators.',
    type: 'Compound',
    states: ['Rest', 'Hover', 'Selected', 'Disabled'],
    related: ['button', 'dialog', 'nav'],
  },
  dialog: {
    title: 'Dialog',
    desc: 'Modal dialog overlay with header, body text, and footer buttons. Supports dismiss, primary, secondary, and tertiary actions.',
    type: 'Compound',
    states: ['Default', 'With Tertiary', 'No Body', 'No Dismiss'],
    related: ['button', 'menu', 'header'],
  },
  toolbar: {
    title: 'Toolbar',
    desc: 'Formatting toolbar with icon buttons, dividers, and selected state toggling for text formatting actions.',
    type: 'Compound',
    states: ['Rest', 'Hover', 'Selected'],
    related: ['button', 'divider', 'chatInput'],
  },
  header: {
    title: 'Header',
    desc: 'Top header bar with model picker dropdown and action buttons for temporary chat, shield, and more options.',
    type: 'Compound',
    states: ['Rest', 'Hover'],
    related: ['button', 'toolbar', 'nav'],
  },
  chatInput: {
    title: 'Chat Input',
    desc: 'Full-width chat input with toolbar, auto-growing textarea, underline indicator, mic button, and send button state transitions.',
    type: 'Compound',
    states: ['Rest', 'Focused', 'Text Entered'],
    related: ['button', 'suggestionChips', 'addMenu'],
  },
  canvasChat: {
    title: 'Canvas Chat',
    desc: 'Floating inline AI card with output area, input field, action buttons, attachments, and latency indicator.',
    type: 'Compound',
    states: ['Rest', 'Focused', 'With Response'],
    related: ['chatInput', 'button', 'dialog'],
  },
  addMenu: {
    title: 'Add Menu',
    desc: 'Frosted overlay menu triggered by the + button. Contains Work IQ toggle, file upload, cloud files, data sources, and agent links.',
    type: 'Compound',
    states: ['Open', 'Toggle On', 'Toggle Off'],
    related: ['chatInput', 'sourcesMenu', 'menu'],
  },
  sourcesMenu: {
    title: 'Sources Menu',
    desc: 'Data source picker with toggle switches for connected sources and connect buttons for new integrations.',
    type: 'Compound',
    states: ['Enabled', 'Disabled', 'Connect'],
    related: ['toggle', 'addMenu', 'menu'],
  },
  nav: {
    title: 'Nav',
    desc: 'Sidebar navigation with expand and collapse toggle, nav items, pinned and chat sections, split items, me control, and notification badge.',
    type: 'Compound',
    states: ['Expanded', 'Collapsed', 'Rest', 'Hover', 'Selected'],
    related: ['button', 'menu', 'header'],
  },
  responseFooter: {
    title: 'Response Footer',
    desc: 'Post-response action bar with Copy, Thumbs Up, Thumbs Down buttons, vertical divider, and sources button with file-type icon stack.',
    type: 'Compound',
    states: ['Rest', 'Hover', 'Pressed'],
    related: ['button', 'toolbar', 'chatInput'],
  },
};

// ─── Shared CSS ─────────────────────────────────────────────

const sharedCSS = `
/* ─── Bebop page overrides (injected by _inject.ts) ─── */
body { background: #fff !important; padding: 0 !important; margin: 0 !important; font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif !important; color: #242424; min-height: 100vh; display: block !important; align-items: initial !important; flex-direction: initial !important; }

/* Page wrapper */
.bp-header { max-width: 900px; margin: 0 auto; padding: 60px 48px 0; }
.bp-header__top { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.bp-header__title { font-family: Aptos, 'Segoe UI', sans-serif; font-size: 36px; font-weight: 300; color: #242424; line-height: 1.2; }
.bp-header__tag { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 8px; border-radius: 8px; }
.bp-header__tag--compound { background: #ebebeb; color: #242424; }
.bp-header__tag--primitive { background: #f5f5f5; color: #6f6f6f; }
.bp-header__desc { font-size: 15px; color: #6f6f6f; line-height: 1.6; max-width: 600px; margin-bottom: 20px; }
.bp-header__states { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 40px; }
.bp-header__state { font-size: 12px; color: #6f6f6f; background: #f5f5f5; padding: 3px 10px; border-radius: 8px; }

/* Content area — override all wrapper variants */
.wrap, .page, .section { max-width: 900px !important; margin-left: auto !important; margin-right: auto !important; padding-left: 48px !important; padding-right: 48px !important; }

/* Headings */
h1 { display: none !important; }
.hint, p.hint { display: none !important; }
h2 { font-family: 'Segoe UI', sans-serif !important; font-size: 16px !important; font-weight: 600 !important; color: #242424 !important; margin: 40px 0 16px !important; padding-bottom: 10px !important; border-bottom: 1px solid #f0f0f0 !important; }
h3 { font-family: 'Segoe UI', sans-serif !important; font-size: 13px !important; font-weight: 600 !important; color: #929292 !important; margin: 20px 0 12px !important; border: none !important; padding: 0 !important; text-transform: none !important; letter-spacing: 0 !important; }

/* Rows and cells */
.row { gap: 24px !important; margin-bottom: 20px !important; }
.cell { gap: 8px !important; }
.rl { font-size: 11px !important; font-weight: 600 !important; color: #929292 !important; text-transform: uppercase !important; letter-spacing: 0.5px !important; }

/* ─── Related components ─── */
.bp-related { max-width: 900px; margin: 0 auto; padding: 80px 48px; margin-top: 60px; border-top: 1px solid #f0f0f0; }
.bp-related__title { font-size: 16px; font-weight: 600; color: #242424; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0; }
.bp-related__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 12px; }
.bp-related__card { background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; padding: 24px; text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 8px; transition: background 0.1s, border-color 0.15s, box-shadow 0.15s; }
.bp-related__card:hover { background: #fcfcfc; border-color: #dedede; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.bp-related__card-top { display: flex; align-items: center; gap: 8px; }
.bp-related__card-name { font-size: 14px; font-weight: 600; line-height: 1.3; flex: 1; }
.bp-related__card-arrow { width: 16px; height: 16px; color: #929292; transition: color 0.1s, transform 0.15s; flex-shrink: 0; }
.bp-related__card:hover .bp-related__card-arrow { color: #242424; transform: translateX(2px); }
.bp-related__card-desc { font-size: 13px; color: #6f6f6f; line-height: 1.5; }
.bp-related__card-tag { display: inline-block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 8px; border-radius: 8px; width: fit-content; }

/* ─── Back bar (sticky, frosted) ─── */
.bebop-backbar { position: sticky; top: 0; left: 0; right: 0; z-index: 9999; height: 48px; display: flex; align-items: center; padding: 0 16px; background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #dedede; }
.bebop-backbar a { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 6px 12px; border-radius: 12px; text-decoration: none; color: #242424; font-family: 'Segoe UI', sans-serif; font-size: 14px; transition: background 0.1s; }
.bebop-backbar a:hover { background: rgba(36,36,36,0.04); }
.bebop-backbar a svg { width: 16px; height: 16px; }

/* ─── Scrollbar ─── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #6f6f6f; border-radius: 9999px; background-clip: content-box; border: 2px solid transparent; }
::-webkit-scrollbar-thumb:hover { border: 0; }
* { scrollbar-width: thin; scrollbar-color: #6f6f6f transparent; }
`;

const chevronSvg = '<svg class="bp-related__card-arrow" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const backBarHTML = '<!-- INJECT:BACKBAR --><div class="bebop-backbar"><a href="../index.html"><svg viewBox="0 0 16 16" fill="none"><path d="M10 13l-5-5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Back to catalog</a></div><!-- /INJECT:BACKBAR -->';

function buildHeader(m: ComponentMeta): string {
  const tagClass = m.type === 'Compound' ? 'bp-header__tag--compound' : 'bp-header__tag--primitive';
  const states = m.states.map(s => '<span class="bp-header__state">' + s + '</span>').join('');
  return '<!-- INJECT:HEADER --><div class="bp-header">'
    + '<div class="bp-header__top">'
    + '<span class="bp-header__title">' + m.title + '</span>'
    + '<span class="bp-header__tag ' + tagClass + '">' + m.type + '</span>'
    + '</div>'
    + '<p class="bp-header__desc">' + m.desc + '</p>'
    + '<div class="bp-header__states">' + states + '</div>'
    + '</div><!-- /INJECT:HEADER -->';
}

function buildRelated(relatedKeys: string[]): string {
  let cards = '';
  for (const key of relatedKeys) {
    const r = meta[key];
    if (!r) continue;
    const tagClass = r.type === 'Compound' ? 'bp-header__tag--compound' : 'bp-header__tag--primitive';
    cards += '<a class="bp-related__card" href="' + key + '.html">'
      + '<div class="bp-related__card-top"><span class="bp-related__card-name">' + r.title + '</span>' + chevronSvg + '</div>'
      + '<span class="bp-related__card-desc">' + r.desc.substring(0, 80) + (r.desc.length > 80 ? '...' : '') + '</span>'
      + '<span class="bp-related__card-tag ' + tagClass + '">' + r.type + '</span>'
      + '</a>';
  }
  return '<!-- INJECT:RELATED --><div class="bp-related"><div class="bp-related__title">Related Components</div><div class="bp-related__grid">' + cards + '</div></div><!-- /INJECT:RELATED -->';
}

// ─── Process files ──────────────────────────────────────────

const distDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const files = fs.readdirSync(distDir).filter(f => f.endsWith('.html'));

let count = 0;
for (const file of files) {
  const filePath = path.join(distDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  const componentName = file.replace('.html', '');

  // Shell: only inject hover back bar, no layout overrides
  if (file === 'shell.html') {
    if (!html.includes('bebop-shell-backbar')) {
      const shellBarCSS = '\n/* Shell back bar */\n.bebop-shell-hover { position: fixed; top: 0; left: 0; right: 0; height: 20px; z-index: 9998; }\n.bebop-shell-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 9999; height: 48px; display: flex; align-items: center; padding: 0 16px; background: rgba(255,255,255,0.9); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #dedede; transform: translateY(-100%); transition: transform 0.2s ease; }\n.bebop-shell-hover:hover ~ .bebop-shell-bar, .bebop-shell-bar:hover { transform: translateY(0); }\n.bebop-shell-bar a { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 6px 12px; border-radius: 12px; text-decoration: none; color: #242424; font-family: \'Segoe UI\', sans-serif; font-size: 14px; transition: background 0.1s; }\n.bebop-shell-bar a:hover { background: rgba(36,36,36,0.04); }\n.bebop-shell-bar a svg { width: 16px; height: 16px; }\n';
      const shellBarHTML = '<div class="bebop-shell-hover"></div><div class="bebop-shell-bar"><a href="../index.html"><svg viewBox="0 0 16 16" fill="none"><path d="M10 13l-5-5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Back to catalog</a></div>';
      if (html.includes('</style>')) {
        html = html.replace('</style>', shellBarCSS + '</style>');
      }
      const sBodyIdx = html.indexOf('<body>');
      if (sBodyIdx >= 0) {
        html = html.substring(0, sBodyIdx + 6) + shellBarHTML + html.substring(sBodyIdx + 6);
      }
      fs.writeFileSync(filePath, html, 'utf-8');
      count++;
      console.log('  Injected (shell): ' + file);
    }
    continue;
  }

  const m = meta[componentName];
  if (!m) { console.log('  Skipped (no meta): ' + file); continue; }

  // Strip any previous injection using comment sentinels
  html = html.replace(/<!-- INJECT:BACKBAR -->[\s\S]*?<!-- \/INJECT:BACKBAR -->/g, '');
  html = html.replace(/<!-- INJECT:HEADER -->[\s\S]*?<!-- \/INJECT:HEADER -->/g, '');
  html = html.replace(/<!-- INJECT:RELATED -->[\s\S]*?<!-- \/INJECT:RELATED -->/g, '');
  // Legacy strip (for files injected before sentinels were added)
  html = html.replace(/<div class="bebop-hover-zone">.*?<\/div>/g, '');
  html = html.replace(/<div class="bebop-backbar">[\s\S]*?<\/a><\/div>/g, '');

  // Inject CSS
  if (!html.includes('Bebop page overrides')) {
    if (html.includes('</style>')) {
      html = html.replace('</style>', sharedCSS + '\n</style>');
    } else if (html.includes('</head>')) {
      html = html.replace('</head>', '<style>' + sharedCSS + '</style></head>');
    }
  }

  // Inject back bar + header after <body>
  const bodyIdx = html.indexOf('<body>');
  if (bodyIdx >= 0) {
    const afterBody = bodyIdx + 6;
    html = html.substring(0, afterBody) + backBarHTML + buildHeader(m) + html.substring(afterBody);
  }

  // Inject related components before </body>
  const bodyEndIdx = html.indexOf('</body>');
  if (bodyEndIdx >= 0) {
    html = html.substring(0, bodyEndIdx) + buildRelated(m.related) + html.substring(bodyEndIdx);
  }

  fs.writeFileSync(filePath, html, 'utf-8');
  count++;
  console.log('  Injected: ' + file);
}

console.log('Done: ' + count + ' files processed');
