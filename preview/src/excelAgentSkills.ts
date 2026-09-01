/**
 * Excel Agent Skills — interactive prototype
 *
 * One Copilot / Connector Skills. Recreates the Excel + Copilot pane from the
 * Connector Skills Figma (HrcwzQ59vChIgZU5PvPVQM, nodes 81:97932 / 81:99559 /
 * 81:98315): a static Excel workbook on the left and the interactive Copilot
 * "Let's edit your workbook" pane on the right, including the sources picker
 * popover. Fluent 2 web styling (Segoe UI), exact per the Figma.
 *
 * Left (Excel chrome + grid) is static by design; the right pane is the focus.
 * Self-contained HTML → preview/dist/excelAgentSkills.html
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function ico(name: string, size = 20): string {
  try {
    return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8')
      .replace(/<\?xml[^>]*>/, '')
      .replace(/width="\d+"/, 'width="' + size + '"')
      .replace(/height="\d+"/, 'height="' + size + '"')
      .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"')
      .trim();
  } catch (e) { return ''; }
}
function logo(file: string): string { return '../../src/components/icons/' + file; }

// Inline glyphs
const EXCEL_LOGO = '<svg viewBox="0 0 20 20" width="20" height="20" fill="none"><path d="M11 3H5.5A1.5 1.5 0 0 0 4 4.5v11A1.5 1.5 0 0 0 5.5 17H11V3Z" fill="#21A366"/><path d="M11 3h3.5A1.5 1.5 0 0 1 16 4.5V6h-5V3Z" fill="#33C481"/><path d="M11 6h5v4h-5V6Z" fill="#107C41"/><path d="M11 10h5v4h-5v-4Z" fill="#0B6E37"/><path d="M11 14h5v1.5A1.5 1.5 0 0 1 14.5 17H11v-3Z" fill="#21A366"/><rect x="1.5" y="6" width="9" height="8" rx="1" fill="#107C41"/><path d="M4 8.3l1.4 2 1.5-2M4 11.7l1.4-2 1.5 2" stroke="#fff" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CONNECTOR = '<svg viewBox="0 0 20 20" width="20" height="20" fill="none"><circle cx="6" cy="13.5" r="2.1" stroke="currentColor" stroke-width="1.4"/><circle cx="14" cy="6.5" r="2.1" stroke="currentColor" stroke-width="1.4"/><path d="M7.6 12 12.4 8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
const WAFFLE = '<svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor"><g><circle cx="4" cy="4" r="1.4"/><circle cx="10" cy="4" r="1.4"/><circle cx="16" cy="4" r="1.4"/><circle cx="4" cy="10" r="1.4"/><circle cx="10" cy="10" r="1.4"/><circle cx="16" cy="10" r="1.4"/><circle cx="4" cy="16" r="1.4"/><circle cx="10" cy="16" r="1.4"/><circle cx="16" cy="16" r="1.4"/></g></svg>';
const GLOBE_BLUE = '<svg viewBox="0 0 20 20" width="20" height="20" fill="none"><circle cx="10" cy="10" r="7.2" stroke="#0F6CBD" stroke-width="1.3"/><path d="M2.8 10h14.4M10 2.8c2 2 3 4.6 3 7.2s-1 5.2-3 7.2c-2-2-3-4.6-3-7.2s1-5.2 3-7.2Z" stroke="#0F6CBD" stroke-width="1.3"/></svg>';
const SEND_ARROW = '<svg viewBox="0 0 20 20" width="16" height="16" fill="none"><path d="M10 15V5M6 9l4-4 4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// ─── Grid data (Income Statement) ───────────────────────────
type Row = { a: string; v?: [string, string, string, string]; indent?: number; };
const ROWS: Row[] = [
  { a: '' },
  { a: '', v: ['2025', '2024', '2025', '2024'] },
  { a: 'Revenue:' },
  { a: 'Product', v: ['$15,319', '$17,080', '$46,810', '$51,556'], indent: 1 },
  { a: 'Service and other', v: ['54,747', '44,778', '158,473', '128,839'], indent: 1 },
  { a: 'Total revenue', v: ['70,066', '61,858', '205,283', '180,395'], indent: 1 },
  { a: 'Cost of revenue:' },
  { a: 'Product', v: ['3,037', '4,339', '10,187', '13,834'], indent: 1 },
  { a: 'Service and other', v: ['18,882', '14,166', '53,630', '40,596'], indent: 1 },
  { a: 'Total cost of revenue', v: ['21,919', '18,505', '63,817', '54,430'], indent: 1 },
  { a: 'Gross margin', v: ['48,147', '43,353', '141,466', '125,965'], indent: 1 },
  { a: 'Research and development', v: ['8,198', '7,653', '23,659', '21,454'] },
  { a: 'Sales and marketing', v: ['6,212', '6,207', '18,369', '17,640'] },
  { a: 'General and administrative', v: ['1,737', '1,912', '5,233', '5,363'] },
  { a: 'Operating income', v: ['32,000', '27,581', '94,205', '81,508'] },
  { a: 'Other expense, net', v: ['(623)', '(854)', '(3,194)', '(971)'] },
  { a: 'Income before income taxes', v: ['31,377', '26,727', '91,011', '80,537'] },
  { a: 'Provision for income taxes', v: ['5,553', '4,788', '16,412', '14,437'] },
  { a: 'Net income', v: ['$25,824', '$21,939', '$74,599', '$66,100'] },
];
const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
const TOTAL_ROWS = 29;

// ─── CSS ────────────────────────────────────────────────────
const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', system-ui, sans-serif; color: #242424; background: #fff; }
button { font-family: inherit; cursor: pointer; border: none; background: none; }
svg { display: block; }

.win { display: flex; flex-direction: column; height: 100vh; width: 100vw; background: #fff; overflow: hidden; }

/* Title bar */
.tbar { display: flex; align-items: center; height: 48px; padding: 0 8px; gap: 8px; flex-shrink: 0; }
.tbar__waffle { width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; color: #616161; border-radius: 4px; }
.tbar__waffle:hover { background: #f0f0f0; }
.tbar__doc { display: flex; align-items: center; gap: 8px; padding: 0 4px; }
.tbar__title { font-size: 14px; color: #242424; font-weight: 600; }
.tbar__cloud { color: #0f7937; display: inline-flex; }
.tbar__cloud svg { width: 16px; height: 16px; }
.tbar__chev { color: #616161; display: inline-flex; }
.tbar__chev svg { width: 12px; height: 12px; }
.tbar__search { flex: 1; max-width: 468px; margin: 0 auto; height: 32px; background: #f3f3f3; border-radius: 6px; display: flex; align-items: center; gap: 8px; padding: 0 12px; color: #616161; font-size: 13px; }
.tbar__search svg { width: 16px; height: 16px; }
.tbar__right { display: flex; align-items: center; gap: 4px; margin-left: auto; }
.tbar__ic { width: 36px; height: 36px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; color: #424242; }
.tbar__ic:hover { background: #f0f0f0; }
.tbar__ic svg { width: 20px; height: 20px; }
.tbar__av { width: 32px; height: 32px; border-radius: 50%; background: #c9b7a8 url(../../src/components/icons/avatar-user.png) center/cover; margin-left: 4px; }

/* Menu bar */
.mbar { display: flex; align-items: center; height: 40px; padding: 0 8px; gap: 2px; flex-shrink: 0; }
.mbar__tab { height: 28px; padding: 0 10px; border-radius: 4px; font-size: 14px; color: #242424; display: inline-flex; align-items: center; }
.mbar__tab:hover { background: #f0f0f0; }
.mbar__tab--active { font-weight: 600; position: relative; }
.mbar__tab--active::after { content: ''; position: absolute; left: 10px; right: 10px; bottom: -6px; height: 2px; background: #0f7937; border-radius: 2px; }
.mbar__right { margin-left: auto; display: flex; align-items: center; gap: 6px; }
.mbar__btn { height: 30px; padding: 0 10px; border-radius: 4px; font-size: 13px; color: #242424; display: inline-flex; align-items: center; gap: 6px; }
.mbar__btn:hover { background: #f0f0f0; }
.mbar__btn svg { width: 16px; height: 16px; color: #424242; }
.mbar__share { height: 30px; padding: 0 14px; border-radius: 4px; background: #0f7937; color: #fff; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; }
.mbar__share svg { width: 16px; height: 16px; color: #fff; }

/* Ribbon */
.ribbon { display: flex; align-items: center; height: 44px; padding: 0 8px; gap: 2px; background: #f8f8f8; border-top: 1px solid #edebe9; flex-shrink: 0; overflow: hidden; }
.rb { width: 28px; height: 28px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; color: #424242; flex-shrink: 0; }
.rb:hover { background: #eaeaea; }
.rb svg { width: 18px; height: 18px; }
.rb--sm { width: 20px; }
.rb__chev { width: 16px; color: #616161; }
.rb__chev svg { width: 12px; height: 12px; }
.rb-div { width: 1px; height: 24px; background: #e0e0e0; margin: 0 4px; flex-shrink: 0; }
.rb-dd { height: 26px; border: 1px solid #e0e0e0; border-radius: 4px; background: #fff; display: inline-flex; align-items: center; gap: 6px; padding: 0 6px 0 8px; font-size: 12px; color: #242424; flex-shrink: 0; }
.rb-dd svg { width: 12px; height: 12px; color: #616161; }
.rb-dd--font { width: 116px; } .rb-dd--size { width: 46px; } .rb-dd--num { width: 92px; }
.rb-copilot { width: 28px; height: 28px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: auto; }

/* Formula bar */
.fx { display: flex; align-items: center; height: 30px; border-top: 1px solid #edebe9; border-bottom: 1px solid #edebe9; flex-shrink: 0; }
.fx__name { width: 120px; display: flex; align-items: center; justify-content: space-between; padding: 0 8px; font-size: 12px; color: #242424; border-right: 1px solid #edebe9; height: 100%; }
.fx__name svg { width: 12px; height: 12px; color: #616161; }
.fx__tools { display: flex; align-items: center; gap: 10px; padding: 0 10px; color: #a6a6a6; font-size: 13px; border-right: 1px solid #edebe9; height: 100%; }
.fx__val { padding: 0 12px; font-size: 13px; color: #242424; }

/* Main split */
.main { display: flex; flex: 1; min-height: 0; }
.left { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.gridwrap { flex: 1; overflow: auto; }

/* Grid */
table.grid { border-collapse: collapse; table-layout: fixed; font-size: 12px; }
.grid th, .grid td { border: 1px solid #e0e0e0; height: 20px; padding: 0 4px; overflow: hidden; white-space: nowrap; }
.grid thead th { background: #f5f5f5; color: #616161; font-weight: 400; text-align: center; height: 22px; position: sticky; top: 0; z-index: 2; }
.grid thead th.colhdr--sel { background: #d6e8d6; color: #0f5a2b; font-weight: 600; }
.grid .rowhdr { background: #f5f5f5; color: #616161; font-weight: 400; text-align: center; width: 40px; position: sticky; left: 0; z-index: 1; }
.grid .rowhdr--sel { background: #d6e8d6; color: #0f5a2b; font-weight: 600; }
.grid td { background: #fff; color: #242424; }
.grid td.num { text-align: right; }
.grid td.corner { background: #f5f5f5; position: sticky; left: 0; top: 0; z-index: 3; width: 40px; }
.grid td.cell--sel { outline: 2px solid #0f7937; outline-offset: -2px; }
.cA { width: 210px; } .cBE { width: 78px; } .cN { width: 56px; }
.hspan { text-align: center; color: #242424; }

/* Sheet tabs + status */
.tabs { display: flex; align-items: center; height: 32px; border-top: 1px solid #e0e0e0; padding: 0 8px; gap: 2px; flex-shrink: 0; background: #fff; }
.tabs__nav { display: flex; align-items: center; gap: 2px; color: #616161; margin-right: 6px; }
.tabs__nav svg { width: 16px; height: 16px; }
.tab { height: 24px; padding: 0 12px; font-size: 12px; color: #444; display: inline-flex; align-items: center; border-radius: 4px 4px 0 0; }
.tab--active { color: #0f7937; font-weight: 600; border-bottom: 2px solid #0f7937; }
.tabs__add { width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; color: #616161; }
.tabs__add svg { width: 16px; height: 16px; }
.status { display: flex; align-items: center; height: 24px; border-top: 1px solid #e0e0e0; padding: 0 12px; gap: 16px; font-size: 12px; color: #444; flex-shrink: 0; background: #fff; }
.status__sp { margin-left: auto; }
.status__zoom { display: flex; align-items: center; gap: 8px; }

/* ── Copilot pane ── */
.pane { width: 468px; flex-shrink: 0; background: #fafafa; border-left: 1px solid #e0e0e0; display: flex; flex-direction: column; }
.ph { display: flex; align-items: center; height: 48px; padding: 0 8px; gap: 4px; flex-shrink: 0; }
.ph__ic { width: 32px; height: 32px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; color: #424242; }
.ph__ic:hover { background: rgba(0,0,0,0.05); }
.ph__ic svg { width: 20px; height: 20px; }
.ph__shield { color: #0f7937; }
.ph__sp { flex: 1; }
.ph__auto { height: 30px; padding: 0 8px 0 12px; border: 1px solid #e0e0e0; border-radius: 6px; background: #fff; display: inline-flex; align-items: center; gap: 4px; font-size: 13px; color: #242424; }
.ph__auto svg { width: 14px; height: 14px; color: #616161; }
.ph__new { width: 34px; height: 30px; border-radius: 6px; background: #0f7937; color: #fff; display: inline-flex; align-items: center; justify-content: center; }
.ph__new:hover { background: #0c6630; }
.ph__new svg { width: 18px; height: 18px; }

.pb { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 0 16px; min-height: 0; }
.pb__inner { position: relative; }
.greet { font-size: 20px; line-height: 28px; font-weight: 600; color: #242424; letter-spacing: -0.1px; margin-bottom: 12px; }
.allow { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; color: #424242; margin-bottom: 8px; }
.allow svg { width: 14px; height: 14px; color: #616161; }

.cmp { position: relative; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.06); padding: 12px 14px 8px; }
.cmp__in { font-size: 14px; line-height: 20px; color: #707070; min-height: 20px; }
.cmp__row { display: flex; align-items: center; gap: 12px; margin-top: 10px; }
.cmp__ic { width: 24px; height: 24px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; color: #424242; }
.cmp__ic:hover { background: rgba(0,0,0,0.05); }
.cmp__ic svg { width: 20px; height: 20px; }
.cmp__sp { flex: 1; }

.chips { display: flex; flex-direction: column; gap: 8px; margin-top: 24px; }
.chip { display: block; width: 100%; text-align: left; min-height: 40px; padding: 10px 12px; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 13px; line-height: 16px; color: #424242; }
.chip:hover { background: #fafafa; }
.chip .lnk { color: #0f7937; font-weight: 600; }
.seemore { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; color: #424242; margin-top: 8px; padding: 4px 2px; }
.seemore svg { width: 14px; height: 14px; }

.pf { display: flex; align-items: center; gap: 6px; height: 40px; padding: 0 16px; font-size: 12px; color: #616161; flex-shrink: 0; }
.pf svg { width: 14px; height: 14px; color: #808080; }

/* Sources popover */
.srcpop { position: absolute; left: 24px; top: 100%; margin-top: 8px; width: 320px; background: #fff; border-radius: 12px; padding: 0 0 8px; box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.14); z-index: 40; }
.srcpop[hidden] { display: none; }
.srcpop__search { height: 32px; border: 1px solid #d1d1d1; border-radius: 4px; display: flex; align-items: center; padding: 0 10px; font-size: 13px; color: #707070; margin: 16px 20px 8px; }
.srcrow { display: flex; align-items: center; gap: 10px; height: 40px; padding: 0 4px 0 12px; border-radius: 4px; margin: 0 8px; }
.srcrow:hover { background: #f5f5f5; }
.srcrow__logo { width: 20px; height: 20px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; }
.srcrow__logo img { width: 100%; height: 100%; object-fit: contain; }
.srcrow__name { flex: 1; font-size: 14px; color: #242424; }
.srcrow__connect { height: 26px; padding: 0 12px; border-radius: 4px; background: #0f7937; color: #fff; font-size: 13px; font-weight: 600; }
.tgl { width: 40px; height: 20px; border-radius: 10px; background: #bdbdbd; position: relative; flex-shrink: 0; transition: background 0.15s; }
.tgl__k { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: left 0.15s; box-shadow: 0 1px 2px rgba(0,0,0,0.3); }
.tgl.is-on { background: #0f7937; } .tgl.is-on .tgl__k { left: 22px; }
.srcrow__chev { color: #616161; display: inline-flex; align-items: center; padding: 0 2px; margin-left: 2px; }
.srcrow__chev svg { width: 16px; height: 16px; }

/* Sources popover — skills drill-in */
.srcpop__list[hidden], .srcpop__skills[hidden] { display: none; }
.skback { display: flex; align-items: center; gap: 8px; width: calc(100% - 16px); height: 36px; padding: 0 12px; margin: 0 8px; text-align: left; font-size: 13px; color: #424242; border-radius: 4px; }
.skback:hover { background: #f5f5f5; }
.skback__ic { display: inline-flex; color: #424242; }
.skback__ic svg { width: 18px; height: 18px; }
.skrow { display: flex; align-items: center; gap: 12px; width: calc(100% - 16px); height: 40px; padding: 0 12px; margin: 0 8px; text-align: left; border-radius: 4px; }
.skrow:hover { background: #f5f5f5; }
.skrow__ic { width: 20px; height: 20px; flex-shrink: 0; color: #424242; display: inline-flex; }
.skrow__ic svg { width: 20px; height: 20px; }
.skrow__name { font-size: 14px; color: #242424; }

/* Composer — active (skill mention) state */
.cmp__mention { color: #0f7937; }
.cmp__send { width: 28px; height: 28px; border-radius: 50%; background: #0f7937; color: #fff; display: none; align-items: center; justify-content: center; flex-shrink: 0; }
.cmp__send:hover { background: #0c6630; }
.cmp__send svg { width: 16px; height: 16px; }
.cmp__conn.is-active { background: #ebebeb; color: #424242; }
.pane.is-active .cmp__conn { display: none; }
.pane.is-active .cmp__send { display: inline-flex; }
.chips[hidden] { display: none; }
.seemore-wrap { display: flex; }
.pane.is-active .seemore-wrap { justify-content: flex-end; }
`;

// ─── Ribbon HTML ────────────────────────────────────────────
function rb(icon: string, chev = false): string {
  return '<button class="rb">' + icon + '</button>' + (chev ? '<button class="rb rb__chev">' + ico('chevron-down-16-regular', 12) + '</button>' : '');
}
function ribbon(): string {
  return [
    '<div class="ribbon">',
    rb(ico('arrow-undo-20-regular', 18)), rb(ico('arrow-redo-20-regular', 18)),
    '<div class="rb-div"></div>',
    rb(ico('clipboard-paste-20-regular', 18), true),
    '<div class="rb-div"></div>',
    '<span class="rb-dd rb-dd--font">Calibri (Body)' + ico('chevron-down-16-regular', 12) + '</span>',
    '<span class="rb-dd rb-dd--size">11' + ico('chevron-down-16-regular', 12) + '</span>',
    '<button class="rb"><b style="font-size:15px">B</b></button>',
    rb(ico('border-all-20-regular', 18), true), rb(ico('paint-bucket-20-regular', 18), true), rb(ico('text-color-20-regular', 18), true),
    '<button class="rb rb__chev">' + ico('more-horizontal-20-regular', 16) + '</button>',
    '<div class="rb-div"></div>',
    rb(ico('text-align-left-20-regular', 18), true), rb(ico('text-align-justify-20-regular', 18)), rb(ico('text-wrap-20-regular', 18)), rb(ico('table-simple-20-regular', 18), true),
    '<div class="rb-div"></div>',
    '<span class="rb-dd rb-dd--num">General' + ico('chevron-down-16-regular', 12) + '</span>',
    '<button class="rb"><span style="font-size:13px">$</span></button>',
    '<button class="rb"><span style="font-size:13px">%</span></button>',
    '<button class="rb"><span style="font-size:11px">.0</span></button>',
    '<button class="rb"><span style="font-size:11px">.00</span></button>',
    '<div class="rb-div"></div>',
    rb(ico('math-formula-20-regular', 18), true), rb(ico('arrow-sort-20-regular', 18), true), rb(ico('search-20-regular', 18), true),
    '<div class="rb-div"></div>',
    '<button class="rb">' + ico('more-horizontal-20-regular', 18) + '</button>',
    '<span class="rb-copilot">' + copilotMark(20) + '</span>',
    '</div>',
  ].join('');
}
function copilotMark(size: number): string {
  return '<svg viewBox="0 0 20 20" width="' + size + '" height="' + size + '" fill="none"><defs><linearGradient id="cpx" x1="2" y1="4" x2="18" y2="16" gradientUnits="userSpaceOnUse"><stop stop-color="#2AA5F4"/><stop offset=".5" stop-color="#7D5FF5"/><stop offset="1" stop-color="#E1568C"/></linearGradient></defs><path d="M10 3c-2.2 0-3.4 1.5-4 3.2C5.3 8.2 5 9.6 3.8 9.6c-.6 0-1 .3-1 .9 0 2.9 2.4 5.5 5.6 5.5 2.2 0 3.5-1.5 4.1-3.2.6-1.9.9-3.4 2.1-3.4.6 0 1-.4 1-1C15.6 5.5 13.2 3 10 3Z" fill="url(#cpx)"/></svg>';
}

// ─── Grid HTML ──────────────────────────────────────────────
function grid(): string {
  let h = '<table class="grid"><colgroup><col style="width:40px"/>';
  COLS.forEach(function (c) { h += '<col class="' + (c === 'A' ? 'cA' : (['B', 'C', 'D', 'E'].indexOf(c) >= 0 ? 'cBE' : 'cN')) + '"/>'; });
  h += '</colgroup><thead><tr><td class="corner"></td>';
  COLS.forEach(function (c) { h += '<th class="' + (c === 'B' ? 'colhdr--sel' : '') + '">' + c + '</th>'; });
  h += '</tr></thead><tbody>';
  for (let r = 1; r <= TOTAL_ROWS; r++) {
    const data = ROWS[r - 1];
    h += '<tr><td class="rowhdr' + (r === 19 ? ' rowhdr--sel' : '') + '">' + r + '</td>';
    if (r === 1) {
      // header spans
      h += '<td></td>';
      h += '<td colspan="2" class="hspan">Three Months Ended March 31</td>';
      h += '<td colspan="2" class="hspan">Nine Months Ended March 31</td>';
      for (let c = 5; c < COLS.length; c++) h += '<td></td>';
    } else if (data) {
      const pad = data.indent ? ' style="padding-left:' + (4 + data.indent * 12) + 'px"' : '';
      h += '<td' + pad + '>' + data.a + '</td>';
      const vals = data.v || ['', '', '', ''];
      vals.forEach(function (val, i) {
        const sel = (r === 19 && i === 0) ? ' cell--sel' : '';
        h += '<td class="num' + sel + '">' + val + '</td>';
      });
      for (let c = 5; c < COLS.length; c++) h += '<td></td>';
    } else {
      for (let c = 0; c < COLS.length; c++) h += '<td></td>';
    }
    h += '</tr>';
  }
  h += '</tbody></table>';
  return h;
}

// ─── Sources popover (list + per-connector skills drill-in) ─
type Src = { name: string; glyph?: string; img?: string; state: 'on' | 'connect'; drill?: boolean; skills?: string[] };
const SOURCES: Src[] = [
  { name: 'Web', glyph: GLOBE_BLUE, state: 'on' },
  { name: 'Work', glyph: '<span style="color:#0F6CBD">' + ico('briefcase-20-regular') + '</span>', state: 'on' },
  { name: 'Confluence', img: 'confluence-logo.png', state: 'on', drill: true, skills: ['space-summary', 'page-search', 'recent-updates', 'knowledge-gaps', 'doc-outline'] },
  { name: 'Github', img: 'github-logo.png', state: 'on', drill: true, skills: ['pr-review-digest', 'commit-standup', 'issue-triage', 'release-notes', 'code-search'] },
  { name: 'Moody\u2019s', img: 'moodys-logo.png', state: 'on', drill: true, skills: ['Credit-rating-lookup', 'Default-risk-score', 'Peer-spread-matrix', 'Covenant-flag-scan', 'Downgrade-early-warning'] },
  { name: 'Canva', img: 'canva-logo.png', state: 'connect' },
];
function srcSlug(s: string): string { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
function sourcesPopover(): string {
  const rows = SOURCES.map(function (s) {
    const logoHtml = s.img ? '<img src="' + logo(s.img) + '" alt=""/>' : (s.glyph || '');
    const trail = s.state === 'connect'
      ? '<button class="srcrow__connect">Connect</button>'
      : '<button class="tgl is-on" aria-label="Toggle ' + s.name + '"><span class="tgl__k"></span></button>'
        + (s.drill ? '<button class="srcrow__chev" data-drill="' + srcSlug(s.name) + '">' + ico('chevron-right-20-regular', 16) + '</button>' : '');
    return '<div class="srcrow"><span class="srcrow__logo">' + logoHtml + '</span><span class="srcrow__name">' + s.name + '</span>' + trail + '</div>';
  }).join('');
  // Per-connector skills sub-views
  const skillViews = SOURCES.filter(function (s) { return s.drill; }).map(function (s) {
    const items = (s.skills || []).map(function (sk) {
      return '<button class="skrow" data-skill="' + sk + '"><span class="skrow__ic">' + ico('script-20-regular') + '</span><span class="skrow__name">' + sk + '</span></button>';
    }).join('');
    return '<div class="srcpop__skills" data-conn="' + srcSlug(s.name) + '" hidden>'
      + '<div class="srcpop__search">Search ' + s.name + ' skills</div>'
      + '<button class="skback"><span class="skback__ic">' + ico('arrow-left-20-regular', 18) + '</span>All sources</button>'
      + items + '</div>';
  }).join('');
  return '<div class="srcpop" id="srcPop" hidden>'
    + '<div class="srcpop__list" id="srcList"><div class="srcpop__search">Search sources</div>' + rows + '</div>'
    + skillViews + '</div>';
}

// ─── Copilot pane ───────────────────────────────────────────
function pane(): string {
  return [
    '<div class="pane" id="pane">',
    '<div class="ph">',
    '<button class="ph__ic">' + ico('line-horizontal-3-20-regular') + '</button>',
    '<button class="ph__ic ph__shield" title="Protected">' + ico('shield-task-20-regular') + '</button>',
    '<span class="ph__sp"></span>',
    '<button class="ph__auto">Auto ' + ico('chevron-down-20-regular', 14) + '</button>',
    '<button class="ph__new" title="New chat">' + ico('compose-20-regular', 18) + '</button>',
    '<button class="ph__ic">' + ico('more-horizontal-20-regular') + '</button>',
    '<button class="ph__ic">' + ico('dismiss-20-regular') + '</button>',
    '</div>',
    '<div class="pb"><div class="pb__inner">',
    '<div class="greet">Let\u2019s edit your workbook</div>',
    '<div class="allow">Allow editing ' + ico('chevron-down-16-regular', 14) + '</div>',
    '<div class="cmp" id="cmp"><div class="cmp__in" id="cmpIn">Describe what you\u2019d like to edit</div>',
    '<div class="cmp__row">',
    '<button class="cmp__ic">' + ico('add-20-regular') + '</button>',
    '<button class="cmp__ic cmp__conn" id="srcBtn" aria-haspopup="true" aria-expanded="false">' + CONNECTOR + '</button>',
    '<span class="cmp__sp"></span>',
    '<button class="cmp__ic">' + ico('mic-20-regular') + '</button>',
    '<button class="cmp__send" id="cmpSend" title="Send">' + SEND_ARROW + '</button>',
    '</div>',
    sourcesPopover(),
    '</div>',
    '<div class="chips" id="chipsDefault">',
    '<button class="chip">Help me better understand this workbook</button>',
    '<button class="chip">Analyze the data in this workbook</button>',
    '<button class="chip">List key findings from <span class="lnk">March Sales Report</span></button>',
    '</div>',
    '<div class="chips" id="chipsActive" hidden>',
    '<button class="chip">Help me better understand this workbook with a quick summary</button>',
    '<button class="chip">Help me analyze the data in this workbook</button>',
    '<button class="chip">List key findings from this data</button>',
    '</div>',
    '<div class="seemore-wrap"><button class="seemore">See more ' + ico('chevron-down-16-regular', 14) + '</button></div>',
    '</div></div>',
    '<div class="pf">M365 Copilot (Premium) ' + ico('info-20-regular', 14) + '</div>',
    '</div>',
  ].join('');
}

// ─── Assemble ───────────────────────────────────────────────
const bodyJs = `
(function(){
  var btn = document.getElementById('srcBtn');
  var pop = document.getElementById('srcPop');
  var pane = document.getElementById('pane');
  var cmpIn = document.getElementById('cmpIn');
  var list = document.getElementById('srcList');
  if (!btn || !pop) return;
  var skillViews = pop.querySelectorAll('.srcpop__skills');
  function showList(){ list.hidden = false; skillViews.forEach(function(v){ v.hidden = true; }); }
  function openPop(){ pop.hidden = false; btn.classList.add('is-active'); btn.setAttribute('aria-expanded','true'); showList(); }
  function closePop(){ pop.hidden = true; btn.classList.remove('is-active'); btn.setAttribute('aria-expanded','false'); }
  btn.addEventListener('click', function(e){ e.stopPropagation(); if (pop.hidden) openPop(); else closePop(); });
  document.addEventListener('click', function(e){ if (!pop.hidden && !pop.contains(e.target) && !btn.contains(e.target)) closePop(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closePop(); });
  pop.querySelectorAll('.tgl').forEach(function(t){ t.addEventListener('click', function(e){ e.stopPropagation(); t.classList.toggle('is-on'); }); });
  pop.querySelectorAll('.srcrow__chev').forEach(function(c){ c.addEventListener('click', function(e){ e.stopPropagation(); var id = c.getAttribute('data-drill'); list.hidden = true; skillViews.forEach(function(v){ v.hidden = v.getAttribute('data-conn') !== id; }); }); });
  pop.querySelectorAll('.skback').forEach(function(b){ b.addEventListener('click', function(e){ e.stopPropagation(); showList(); }); });
  pop.querySelectorAll('.skrow').forEach(function(s){ s.addEventListener('click', function(e){ e.stopPropagation(); var sk = s.getAttribute('data-skill'); cmpIn.innerHTML = '<span class="cmp__mention">@' + sk + '</span>'; pane.classList.add('is-active'); document.getElementById('chipsDefault').hidden = true; document.getElementById('chipsActive').hidden = false; closePop(); }); });
  var send = document.getElementById('cmpSend');
  if (send) send.addEventListener('click', function(){ cmpIn.textContent = 'Describe what you\\u2019d like to edit'; pane.classList.remove('is-active'); document.getElementById('chipsDefault').hidden = false; document.getElementById('chipsActive').hidden = true; });
})();
`;

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Excel Agent Skills</title><style>' + css + '</style></head><body>'
  + '<div class="win">'
  // Title bar
  + '<div class="tbar"><button class="tbar__waffle">' + WAFFLE + '</button>'
  + '<span class="tbar__doc">' + EXCEL_LOGO + '<span class="tbar__title">Q3 2025 Financials</span>'
  + '<span class="tbar__cloud">' + ico('cloud-20-regular', 16) + '</span><span class="tbar__chev">' + ico('chevron-down-20-regular', 12) + '</span></span>'
  + '<div class="tbar__search">' + ico('search-20-regular', 16) + 'Search (Alt + Q)</div>'
  + '<div class="tbar__right"><button class="tbar__ic">' + ico('settings-20-regular') + '</button>'
  + '<button class="tbar__ic">' + ico('more-horizontal-20-regular') + '</button><span class="tbar__av"></span></div></div>'
  // Menu bar
  + '<div class="mbar">'
  + ['File', 'Home', 'Insert', 'Formulas', 'Data', 'Review', 'View', 'Automate', 'Help'].map(function (t) { return '<button class="mbar__tab' + (t === 'Home' ? ' mbar__tab--active' : '') + '">' + t + '</button>'; }).join('')
  + '<div class="mbar__right">'
  + '<button class="mbar__btn">' + ico('chat-20-regular', 16) + 'Comments</button>'
  + '<button class="mbar__btn">' + ico('history-20-regular', 16) + 'Catch Up</button>'
  + '<button class="mbar__btn">' + ico('edit-20-regular', 16) + 'Editing ' + ico('chevron-down-20-regular', 12) + '</button>'
  + '<button class="mbar__share">' + ico('share-20-regular', 16) + 'Share</button></div></div>'
  // Ribbon + formula bar
  + ribbon()
  + '<div class="fx"><div class="fx__name">B19' + ico('chevron-down-20-regular', 12) + '</div>'
  + '<div class="fx__tools">\u2715 \u2713 <i>fx</i></div><div class="fx__val">$25,824</div></div>'
  // Main split
  + '<div class="main"><div class="left">'
  + '<div class="gridwrap">' + grid() + '</div>'
  + '<div class="tabs"><span class="tabs__nav">' + ico('chevron-left-20-regular', 16) + ico('chevron-right-20-regular', 16) + ico('line-horizontal-3-20-regular', 16) + '</span>'
  + '<button class="tab tab--active">Income Statement</button><button class="tab">Cash Flows</button><button class="tab">Quarterly Income Statements</button>'
  + '<button class="tabs__add">' + ico('add-20-regular', 16) + '</button></div>'
  + '<div class="status">Calculation Mode: Automatic<span>Workbook Statistics</span><span class="status__sp"></span>'
  + '<span>Give Feedback to Microsoft</span><span class="status__zoom">\u2212 100% +</span></div>'
  + '</div>'
  + pane()
  + '</div>'
  + '</div>'
  + '<script>' + bodyJs + '</script>'
  + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'excelAgentSkills.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'excelAgentSkills.html'));
