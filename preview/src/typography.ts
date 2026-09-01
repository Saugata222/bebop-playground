/**
 * Typography — Foundation Primitives Preview
 *
 * Reference page for Bebop typography, sourced from the Figma spec
 * (Bebop-web-components → Typography primitives / generics / functional /
 * content type sets) and wired to the local Segoe Sans variable font.
 *
 * Demonstrates:
 *   - Font families (3 primitives, 4 generic roles)
 *   - Optical size rule (Small < 14pt, Text 15–23pt, Display ≥ 24pt)
 *   - Weight primitives (100, 200, 300, 350, 400, 500, 590, 600, 700, 800, 900)
 *   - Size primitives (19 stops, 10px–76px)
 *   - Line-height multipliers (120% tight, 140% regular, 170% relaxed)
 *   - Functional type set (UI chrome)
 *   - Content type set (long-form reading)
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── CSS ────────────────────────────────────────────────────

let css = '';

// Variable font — ships in preview/fonts/, served relative to preview/dist/
css += '@font-face {';
css += "  font-family: 'Segoe Sans';";
css += "  src: url('../fonts/Segoe-sans.woff2') format('woff2-variations'),";
css += "       url('../fonts/Segoe-sans.woff2') format('woff2');";
css += '  font-weight: 100 900;';
css += '  font-style: normal;';
css += '  font-display: swap;';
css += '}';
css += '@font-face {';
css += "  font-family: 'Segoe Sans';";
css += "  src: url('../fonts/Segoe-sans-Italic.woff2') format('woff2-variations'),";
css += "       url('../fonts/Segoe-sans-Italic.woff2') format('woff2');";
css += '  font-weight: 100 900;';
css += '  font-style: italic;';
css += '  font-display: swap;';
css += '}';

css += '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }';
css += "body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-optical-sizing: auto; background: #fff; color: #242424; padding: 40px 24px; }";
css += '.wrap { max-width: 1100px; margin: 0 auto; }';
css += '.lead { font-size: 16px; line-height: 1.5; color: #5d5d5d; max-width: 640px; margin-bottom: 24px; }';
css += '.hint { font-size: 13px; color: #6f6f6f; line-height: 1.6; max-width: 640px; margin: -8px 0 16px; }';

// Tables
css += '.tbl { width: 100%; border-collapse: collapse; margin: 12px 0 24px; }';
css += '.tbl th { text-align: left; padding: 10px 16px; border-bottom: 1px solid #dedede; font-size: 12px; font-weight: 600; color: #5d5d5d; text-transform: uppercase; letter-spacing: 0.5px; }';
css += '.tbl td { padding: 12px 16px; border-bottom: 1px solid #f5f5f5; font-size: 14px; vertical-align: middle; color: #242424; }';
css += '.tbl tr:nth-child(even) td { background: #fafafa; }';
css += ".badge { display: inline-block; font-family: 'Cascadia Code', Consolas, monospace; font-size: 12px; background: #ebebeb; padding: 3px 8px; border-radius: 4px; color: #242424; white-space: nowrap; }";
css += '.muted { color: #6f6f6f; }';

// Optical size cards
css += '.opsz-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 12px 0 24px; }';
css += '.opsz-cell { background: #f5f5f5; border-radius: 16px; padding: 28px 24px; display: flex; flex-direction: column; gap: 16px; min-height: 200px; }';
css += '.opsz-cell__label { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.5px; }';
css += '.opsz-cell__sample { font-size: 56px; line-height: 1; color: #242424; margin: auto 0; }';
css += ".opsz-cell__sample--small   { font-variation-settings: 'opsz' 5, 'wght' 600; }";
css += ".opsz-cell__sample--text    { font-variation-settings: 'opsz' 10.5, 'wght' 600; }";
css += ".opsz-cell__sample--display { font-variation-settings: 'opsz' 36, 'wght' 600; }";
css += '.opsz-cell__rule { font-size: 12px; color: #5d5d5d; line-height: 1.5; }';

// Weight ramp
css += '.weight-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 12px 0 24px; }';
css += '.weight-cell { background: #f5f5f5; border-radius: 12px; padding: 18px 22px; display: flex; flex-direction: column; gap: 4px; }';
css += ".weight-cell__meta { font-family: 'Cascadia Code', Consolas, monospace; font-size: 11px; color: #6f6f6f; }";
css += '.weight-cell__sample { font-size: 28px; line-height: 1.1; color: #242424; }';

// Size ramp
css += '.size-list { display: flex; flex-direction: column; gap: 4px; margin: 12px 0 24px; }';
css += '.size-row { display: flex; align-items: baseline; gap: 20px; padding: 10px 16px; border-bottom: 1px solid #f5f5f5; }';
css += '.size-row__meta { min-width: 220px; display: flex; gap: 12px; align-items: baseline; }';
css += ".size-row__token { font-family: 'Cascadia Code', Consolas, monospace; font-size: 11px; color: #6f6f6f; }";
css += '.size-row__px { font-size: 11px; color: #929292; font-weight: 600; width: 48px; }';
css += '.size-row__sample { flex: 1; color: #242424; line-height: 1.1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }';

// Line-height blocks
css += '.lh-block { background: #f5f5f5; border-radius: 16px; padding: 24px 28px; margin: 12px 0; }';
css += '.lh-block__head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px; }';
css += '.lh-block__name { font-size: 14px; font-weight: 600; color: #242424; }';
css += ".lh-block__val { font-family: 'Cascadia Code', Consolas, monospace; font-size: 11px; color: #6f6f6f; }";
css += '.lh-block__why { font-size: 13px; color: #5d5d5d; margin-bottom: 12px; max-width: 560px; }';
css += '.lh-sample { font-size: 18px; color: #242424; max-width: 640px; }';
css += ".lh-sample--tight   { font-size: 40px; font-weight: 700; line-height: 1.2; font-variation-settings: 'opsz' 36; }";
css += ".lh-sample--regular { font-size: 14px; font-weight: 400; line-height: 1.4; font-variation-settings: 'opsz' 10.5; }";
css += ".lh-sample--relaxed { font-size: 16px; font-weight: 400; line-height: 1.7; font-variation-settings: 'opsz' 10.5; }";

// Type set specimens
css += '.specimen { background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; padding: 8px 24px; margin: 12px 0 24px; }';
css += '.spec-row { display: flex; align-items: baseline; gap: 24px; padding: 18px 0; border-bottom: 1px solid #f5f5f5; flex-wrap: wrap; }';
css += '.spec-row:last-child { border-bottom: none; }';
css += '.spec-row__meta { width: 280px; flex-shrink: 0; display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }';
css += '.spec-row__name { font-size: 13px; font-weight: 600; color: #242424; }';
css += ".spec-row__spec { font-family: 'Cascadia Code', Consolas, monospace; font-size: 11px; color: #6f6f6f; word-break: break-all; }";
css += '.spec-row__sample { flex: 1; min-width: 260px; color: #242424; word-break: break-word; }';
css += '.spec-row__sample--wrap { }';
css += '@media (max-width: 720px) {';
css += '  .spec-row__meta { width: 100%; }';
css += '  .spec-row__sample { flex: 1 1 100%; }';
css += '}';

// ─── HTML ───────────────────────────────────────────────────

let html = '';
html += '<!DOCTYPE html>';
html += '<html lang="en"><head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Typography — M365 Copilot Design System</title>';
html += '<style>' + css + '</style>';
html += '</head><body>';
html += '<div class="wrap">';

html += '<h1>Typography</h1>';

// ─── Font families ──────────────────────────────────────────
html += '<h2>Font families</h2>';
html += '<p class="hint"><strong>Segoe Sans</strong> (variable) is chosen over Segoe UI for a more consistent, vertically centered baseline — it anchors all functional UI and most content. <strong>Segoe Serif</strong> is reserved for titles and expressive editorial content. <strong>Consolas</strong> is used for code.</p>';

html += '<h3>Primitives</h3>';
html += '<table class="tbl"><thead><tr><th>Token</th><th>Font</th></tr></thead><tbody>';
html += '<tr><td><span class="badge">--prmt-font-family-segoe-sans</span></td><td>Segoe Sans</td></tr>';
html += '<tr><td><span class="badge">--prmt-font-family-segoe-serif</span></td><td>Segoe Serif</td></tr>';
html += '<tr><td><span class="badge">--prmt-font-family-consolas</span></td><td>Consolas</td></tr>';
html += '</tbody></table>';

html += '<h3>Generics</h3>';
html += '<table class="tbl"><thead><tr><th>Token</th><th>Primitive</th><th>Usage</th></tr></thead><tbody>';
html += '<tr><td><span class="badge">--gnrc-font-family-functional</span></td><td class="muted">Segoe Sans</td><td>UI chrome — buttons, nav, menus, form controls</td></tr>';
html += '<tr><td><span class="badge">--gnrc-font-family-content</span></td><td class="muted">Segoe Sans</td><td>Long-form body &amp; paragraphs</td></tr>';
html += '<tr><td><span class="badge">--gnrc-font-family-content-editorial</span></td><td class="muted">Segoe Serif</td><td>Titles &amp; expressive editorial content</td></tr>';
html += '<tr><td><span class="badge">--gnrc-font-family-content-code</span></td><td class="muted">Consolas</td><td>Code snippets, inline code</td></tr>';
html += '</tbody></table>';

// ─── Optical sizes ──────────────────────────────────────────
html += '<h2>Optical sizes</h2>';
html += '<p class="hint">Segoe Sans is a variable font with an <code>opsz</code> axis (5–36). The cut is chosen <strong>by font size, not weight</strong>. This keeps strokes legible at small sizes and refined at large ones.</p>';
html += '<div class="opsz-grid">';
html += '<div class="opsz-cell">'
  + '<div class="opsz-cell__label">Small · opsz 5</div>'
  + '<div class="opsz-cell__sample opsz-cell__sample--small">Ag</div>'
  + '<div class="opsz-cell__rule">Font sizes <strong>below 14pt</strong> — body-small, caption, bodyMedium, nav labels.</div>'
  + '</div>';
html += '<div class="opsz-cell">'
  + '<div class="opsz-cell__label">Text · opsz 10.5</div>'
  + '<div class="opsz-cell__sample opsz-cell__sample--text">Ag</div>'
  + '<div class="opsz-cell__rule"><strong>15pt–23pt</strong> — body-large, subtitle, title-small, paragraph styles.</div>'
  + '</div>';
html += '<div class="opsz-cell">'
  + '<div class="opsz-cell__label">Display · opsz 36</div>'
  + '<div class="opsz-cell__sample opsz-cell__sample--display">Ag</div>'
  + '<div class="opsz-cell__rule"><strong>24pt and above</strong> — title-medium/large, pageTitle, display, expressive headlines.</div>'
  + '</div>';
html += '</div>';
html += '<p class="hint">CSS: apply <code>font-optical-sizing: auto</code> to let browsers pick the axis based on font-size. For exact Figma parity, set <code>font-variation-settings: \'opsz\' 5 | 10.5 | 36</code> manually on the bucket.</p>';

// ─── Font weights ───────────────────────────────────────────
html += '<h2>Font weights</h2>';
html += '<p class="hint">Eleven primitive stops. The non-standard <strong>350</strong> (Semilight) and <strong>590</strong> are Segoe Sans variable-axis anchors. In practice Bebop uses 400 / 600 / 700 — the rest are available for editorial moments.</p>';

const weights: ReadonlyArray<readonly [string, number, string]> = [
  ['100', 100, 'Hairline'],
  ['200', 200, 'Thin'],
  ['300', 300, 'Light'],
  ['350', 350, 'Semilight'],
  ['400', 400, 'Regular'],
  ['500', 500, 'Medium'],
  ['590', 590, 'Demibold'],
  ['600', 600, 'Semibold'],
  ['700', 700, 'Bold'],
  ['800', 800, 'Extrabold'],
  ['900', 900, 'Black'],
];
html += '<div class="weight-grid">';
for (const [label, value, name] of weights) {
  html += '<div class="weight-cell">'
    + '<div class="weight-cell__meta"><span class="badge">--prmt-font-weight-' + label + '</span> · ' + name + '</div>'
    + '<div class="weight-cell__sample" style="font-weight:' + value + '">Abc 123</div>'
    + '</div>';
}
html += '</div>';

// ─── Font sizes ─────────────────────────────────────────────
html += '<h2>Font sizes</h2>';
html += '<p class="hint">Nineteen primitive stops, 10px–76px. Generic aliases (<code>--gnrc-font-size-functional-*</code>, <code>--gnrc-font-size-content-*</code>) reference these and support fluid scaling via <code>clamp()</code> between a mobile minimum (320px viewport) and desktop maximum (1440px).</p>';

const sizes: ReadonlyArray<readonly [number, string]> = [
  [10, '0.625'], [12, '0.75'], [14, '0.875'], [16, '1'],
  [20, '1.25'], [24, '1.5'], [28, '1.75'], [32, '2'],
  [36, '2.25'], [40, '2.5'], [44, '2.75'], [48, '3'],
  [52, '3.25'], [56, '3.5'], [60, '3.75'], [64, '4'],
  [68, '4.25'], [72, '4.5'], [76, '4.75'],
];
html += '<div class="size-list">';
for (const [px, rem] of sizes) {
  const previewText = px >= 40 ? 'Bebop' : px >= 20 ? 'The quick brown fox' : 'The quick brown fox jumps over the lazy dog';
  html += '<div class="size-row">'
    + '<div class="size-row__meta">'
    + '<span class="size-row__token"><span class="badge">--prmt-font-size-' + px + '</span></span>'
    + '<span class="size-row__px">' + px + ' px</span>'
    + '<span class="muted" style="font-family:Consolas,monospace; font-size:11px">' + rem + ' rem</span>'
    + '</div>'
    + '<div class="size-row__sample" style="font-size:' + px + 'px; font-weight:' + (px >= 24 ? 700 : 400) + '">' + previewText + '</div>'
    + '</div>';
}
html += '</div>';

// ─── Line heights ───────────────────────────────────────────
html += '<h2>Line heights</h2>';
html += '<p class="hint">Three canonical multipliers with explicit roles. Figma stores these inside text styles (variables cannot hold percentages).</p>';

html += '<div class="lh-block">'
  + '<div class="lh-block__head"><span class="lh-block__name">Tight · 120%</span><span class="lh-block__val"><span class="badge">--prmt-line-height-120</span></span></div>'
  + '<div class="lh-block__why">Tightened for large headings or expressive text to preserve visual cohesion and hierarchy. Applied to Functional-Display, PageTitle, Title, Content-PageHeader and Headlines.</div>'
  + '<div class="lh-sample lh-sample--tight">Good morning,<br/>Saugata</div>'
  + '</div>';

html += '<div class="lh-block">'
  + '<div class="lh-block__head"><span class="lh-block__name">Regular · 140%</span><span class="lh-block__val"><span class="badge">--prmt-line-height-140</span></span></div>'
  + '<div class="lh-block__why">Default modifier optimized for short-form scannable UI text and medium-length content. Applied to Subtitle, Body, Caption, Table, Code.</div>'
  + '<div class="lh-sample lh-sample--regular">Menu items, button labels, form controls, toolbar actions and suggestion chips all use this line height. It balances rhythm with density for compact UI surfaces.</div>'
  + '</div>';

html += '<div class="lh-block">'
  + '<div class="lh-block__head"><span class="lh-block__name">Relaxed · 170%</span><span class="lh-block__val"><span class="badge">--prmt-line-height-170</span></span></div>'
  + '<div class="lh-block__why">For dense paragraphs or long-form reading where breathing room improves comprehension. Applied exclusively to Content-Paragraph.</div>'
  + '<div class="lh-sample lh-sample--relaxed">Fortnum &amp; Mason has unveiled Bars of Chocolate, a product-design collaboration with creative agency Otherway that transforms chocolate into a multi-sensory experience. The result is bold, playful, and designed to be heard as much as tasted.</div>'
  + '</div>';

// ─── Functional type set ────────────────────────────────────
html += '<h2>Functional type set</h2>';
html += '<p class="hint">UI chrome — controls, navigation, menus, form fields. Always <code>--gnrc-font-family-functional</code> (Segoe Sans). Titles at 24px+ use the Display cut of the variable font; 15–23px use Text; below 14px uses Small. Headings are 600 (Semibold); body/caption default to 400 (Regular) with a <code>-strong</code> (600) companion token for every body size.</p>';

type Spec = { name: string; token: string; size: number; weight: number; lh: number; opsz: number; sample: string };
const functional: ReadonlyArray<Spec> = [
  { name: 'Display',         token: 'functional-display',      size: 68, weight: 600, lh: 1.2, opsz: 36,  sample: 'Display' },
  { name: 'Page title',      token: 'functional-pagetitle',    size: 40, weight: 600, lh: 1.2, opsz: 36,  sample: 'Page title' },
  { name: 'Title large',     token: 'functional-title-large',  size: 32, weight: 600, lh: 1.2, opsz: 36,  sample: 'Title large' },
  { name: 'Title medium',    token: 'functional-title-medium', size: 28, weight: 600, lh: 1.2, opsz: 36,  sample: 'Title medium' },
  { name: 'Title small',     token: 'functional-title-small',  size: 24, weight: 600, lh: 1.2, opsz: 10.5, sample: 'Title small' },
  { name: 'Subtitle',        token: 'functional-subtitle',     size: 20, weight: 600, lh: 1.4, opsz: 10.5, sample: 'Subtitle' },
  { name: 'Body large',      token: 'functional-body-large',   size: 16, weight: 400, lh: 1.4, opsz: 10.5, sample: 'Body large — prominent controls, chat input. Also: body-large-strong at 600.' },
  { name: 'Body default',    token: 'functional-body-default', size: 14, weight: 400, lh: 1.4, opsz: 5,    sample: 'Body default — the workhorse of UI text: buttons, menus, nav. Also: body-medium-strong.' },
  { name: 'Body small',      token: 'functional-body-small',   size: 12, weight: 400, lh: 1.4, opsz: 5,    sample: 'Body small — secondary meta and tags. Also: body-small-strong.' },
  { name: 'Caption',         token: 'functional-caption',      size: 10, weight: 400, lh: 1.4, opsz: 5,    sample: 'CAPTION — badges and micro-labels. Also: caption-strong.' },
];

html += '<div class="specimen">';
for (const s of functional) {
  html += '<div class="spec-row">'
    + '<div class="spec-row__meta">'
    + '<span class="spec-row__name">' + s.name + '</span>'
    + '<span class="spec-row__spec"><span class="badge">--gnrc-font-size-' + s.token + '</span></span>'
    + '<span class="spec-row__spec muted">' + s.size + 'px · ' + s.weight + ' · ' + Math.round(s.lh * 100) + '% · opsz ' + s.opsz + '</span>'
    + '</div>'
    + '<div class="spec-row__sample" style="font-size:' + s.size + 'px; font-weight:' + s.weight + '; line-height:' + s.lh + "; font-variation-settings:'opsz' " + s.opsz + '">' + s.sample + '</div>'
    + '</div>';
}
html += '</div>';

// ─── Content type set ───────────────────────────────────────
html += '<h2>Content type set</h2>';
html += '<p class="hint">Long-form reading — articles, documentation, assistant responses. All tokens use <code>--gnrc-font-family-content</code> (Segoe Sans) by default; use <code>--gnrc-font-family-content-editorial</code> (Segoe Serif) deliberately for expressive moments, and <code>--gnrc-font-family-content-code</code> (Consolas) for code. Paragraphs use a relaxed 170% line-height for reading comfort; expressive titles use 140%; H1–H4 and Page header use 120%. Each body/paragraph/table row also ships with a <code>-strong</code> (600) companion.</p>';

const content: ReadonlyArray<Spec> = [
  { name: 'Expressive large',  token: 'content-expressive-large',  size: 56, weight: 600, lh: 1.4, opsz: 36,  sample: 'Expressive' },
  { name: 'Expressive medium', token: 'content-expressive-medium', size: 36, weight: 600, lh: 1.4, opsz: 36,  sample: 'Expressive' },
  { name: 'Expressive small',  token: 'content-expressive-small',  size: 28, weight: 600, lh: 1.4, opsz: 36,  sample: 'Expressive' },
  { name: 'Page header',       token: 'content-pageheader',        size: 36, weight: 600, lh: 1.2, opsz: 36,  sample: 'Page header' },
  { name: 'H1',                token: 'content-h1',                size: 32, weight: 600, lh: 1.2, opsz: 36,  sample: 'H1 heading' },
  { name: 'H2',                token: 'content-h2',                size: 28, weight: 600, lh: 1.2, opsz: 36,  sample: 'H2 heading' },
  { name: 'H3',                token: 'content-h3',                size: 24, weight: 600, lh: 1.2, opsz: 10.5, sample: 'H3 heading' },
  { name: 'H4',                token: 'content-h4',                size: 20, weight: 600, lh: 1.2, opsz: 10.5, sample: 'H4 heading' },
  { name: 'Subheadline',       token: 'content-subheadline',       size: 14, weight: 400, lh: 1.4, opsz: 5,    sample: 'Subheadline for captions and meta inside articles.' },
  { name: 'Paragraph large',   token: 'content-paragraph-large',   size: 20, weight: 400, lh: 1.7, opsz: 10.5, sample: 'Paragraph large — editorial reading where breathing room improves comprehension. Also: paragraph-large-strong.' },
  { name: 'Paragraph default', token: 'content-paragraph-default', size: 16, weight: 400, lh: 1.7, opsz: 10.5, sample: 'Paragraph default — assistant responses and article bodies. Also: paragraph-medium-strong.' },
  { name: 'Paragraph small',   token: 'content-paragraph-small',   size: 12, weight: 400, lh: 1.7, opsz: 5,    sample: 'Paragraph small — inline help and reference pages. Also: paragraph-small-strong.' },
  { name: 'Table',             token: 'content-table',             size: 16, weight: 400, lh: 1.4, opsz: 10.5, sample: 'Table cell text with tighter line height. Also: table-strong.' },
  { name: 'Code',              token: 'content-code',              size: 16, weight: 400, lh: 1.4, opsz: 10.5, sample: 'const answer = 42; // --gnrc-font-family-content-code → Consolas' },
];

html += '<div class="specimen">';
for (const s of content) {
  const wrap = s.lh >= 1.5 ? ' spec-row__sample--wrap' : '';
  const fontFamily = s.token === 'content-code' ? "'Consolas', monospace" : "'Segoe Sans'";
  html += '<div class="spec-row">'
    + '<div class="spec-row__meta">'
    + '<span class="spec-row__name">' + s.name + '</span>'
    + '<span class="spec-row__spec"><span class="badge">--gnrc-font-size-' + s.token + '</span></span>'
    + '<span class="spec-row__spec muted">' + s.size + 'px · ' + s.weight + ' · ' + Math.round(s.lh * 100) + '% · opsz ' + s.opsz + '</span>'
    + '</div>'
    + '<div class="spec-row__sample' + wrap + '" style="font-family:' + fontFamily + '; font-size:' + s.size + 'px; font-weight:' + s.weight + '; line-height:' + s.lh + "; font-variation-settings:'opsz' " + s.opsz + '">' + s.sample + '</div>'
    + '</div>';
}
html += '</div>';

// ─── Letter spacing ─────────────────────────────────────────
html += '<h2>Letter spacing</h2>';
html += '<p class="hint">A single primitive. Two generic aliases both point at it — Bebop deliberately avoids tracking variation to keep rendering consistent across platforms.</p>';
html += '<table class="tbl"><thead><tr><th>Token</th><th>Value</th></tr></thead><tbody>';
html += '<tr><td><span class="badge">--prmt-letter-spacing-0</span></td><td>0</td></tr>';
html += '<tr><td><span class="badge">--gnrc-letter-spacing-functional</span></td><td class="muted">→ 0</td></tr>';
html += '<tr><td><span class="badge">--gnrc-letter-spacing-content</span></td><td class="muted">→ 0</td></tr>';
html += '</tbody></table>';

html += '</div>'; // /.wrap
html += '</body></html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'typography.html'), html, 'utf-8');
console.log('  ✓ typography.html');
