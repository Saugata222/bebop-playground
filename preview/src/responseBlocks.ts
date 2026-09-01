/**
 * Response Blocks — Preview
 *
 * One Copilot compound (node 4136:159976). The content type system used to
 * construct a response. Renders the full block taxonomy exactly per Figma with
 * the exact One Copilot fonts: Segoe Sans content (420 / 550 / 625), Georgia
 * editorial (quotes), Consolas code.
 *
 * Font: no icon assets needed. Output: preview/dist/responseBlocks.html
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Sample copy (matches Figma) ────────────────────────────

const S = "I'm Copilot, an AI companion created by Microsoft. My goal is to have meaningful and engaging conversations with you and provide helpful information.";

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1.page { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 28px; }
.wrap { max-width: 860px; margin: 0 auto; }
h2.sec { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }

/* Type-scale sheet — the 720 response column */
.sheet { background: #fcfcfc; border: 1px solid #ebebeb; border-radius: 16px; padding: 48px 56px; }
.col { width: 100%; max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; color: #242424; }

/* ── Content families / weights ── */
.rb { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; letter-spacing: 0; }
.rb-ed { font-family: 'Georgia Pro', Georgia, 'Times New Roman', serif; }
.rb-code { font-family: 'Consolas', 'Cascadia Code', 'SF Mono', ui-monospace, monospace; }

/* Headings — Segoe Sans, weight 550, ls -0.15 */
.h1 { font-size: 36px; line-height: 44px; font-weight: 550; font-variation-settings: 'wght' 550; letter-spacing: -0.15px; }
.h2 { font-size: 32px; line-height: 38px; font-weight: 550; font-variation-settings: 'wght' 550; letter-spacing: -0.15px; }
.h3 { font-size: 28px; line-height: 34px; font-weight: 550; font-variation-settings: 'wght' 550; letter-spacing: -0.15px; }
.h4 { font-size: 24px; line-height: 28px; font-weight: 550; font-variation-settings: 'wght' 550; letter-spacing: -0.15px; }
.h5 { font-size: 20px; line-height: 24px; font-weight: 550; font-variation-settings: 'wght' 550; letter-spacing: -0.15px; }

/* Subheadline / subtext */
.subhead { font-size: 16px; line-height: 22px; font-weight: 420; }
.subtext { font-size: 10px; line-height: 14px; font-weight: 420; color: #5d5d5d; }

/* Paragraphs */
.pL  { font-size: 20px; line-height: 34px; font-weight: 420; }
.pLS { font-size: 20px; line-height: 34px; font-weight: 625; }
.pM  { font-size: 16px; line-height: 28px; font-weight: 420; }
.pMS { font-size: 16px; line-height: 28px; font-weight: 625; }
.pS  { font-size: 12px; line-height: 20px; font-weight: 420; }
.pSS { font-size: 12px; line-height: 20px; font-weight: 625; }

/* Links — underlined, inherit size/weight */
.rb a, a.rb-link { color: #242424; text-decoration: underline; text-underline-offset: 2px; }

/* List */
.list { display: flex; flex-direction: column; gap: 4px; padding-left: 20px; }
.list li { font-size: 16px; line-height: 28px; font-weight: 420; }

/* Divider */
.divider { height: 1px; background: rgba(189,189,189,0.5); border: 0; margin: 8px 0; }

/* Quote — editorial Georgia, centered, quote mark */
.quote { text-align: center; padding: 8px 0; }
.quote__mark { font-family: 'Georgia Pro', Georgia, serif; font-size: 40px; line-height: 1; color: #242424; }
.quote__text { font-family: 'Georgia Pro', Georgia, 'Times New Roman', serif; font-size: 28px; line-height: 34px; font-weight: 420; letter-spacing: -0.15px; color: #242424; max-width: 520px; margin: 0 auto; }

/* Table — Segoe Sans 16/22 */
.tbl { width: 100%; border-collapse: collapse; font-size: 16px; line-height: 22px; }
.tbl th, .tbl td { text-align: left; padding: 10px 12px; border-bottom: 1px solid rgba(189,189,189,0.5); vertical-align: top; }
.tbl th { font-weight: 625; }
.tbl td { font-weight: 420; color: #242424; }

/* Code — Consolas 16/22 in subtle surface */
.code { font-family: 'Consolas', 'Cascadia Code', 'SF Mono', ui-monospace, monospace; font-size: 16px; line-height: 22px; font-weight: 420; background: #f5f5f5; border-radius: 16px; padding: 16px; white-space: pre; overflow-x: auto; }

.label { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; }

/* Usage docs */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
`;

// ─── Body ───────────────────────────────────────────────────

const col = [
  '<div class="col rb">',
  '<p class="h1">Heading Level 1. ' + S + '</p>',
  '<p class="h2">Heading Level 2. ' + S + '</p>',
  '<p class="h3">Heading Level 3. ' + S + '</p>',
  '<p class="h4">Heading Level 4. ' + S + '</p>',
  '<p class="h5">Heading Level 5. ' + S + '</p>',
  '<p class="subhead">Subheadline. ' + S + '</p>',
  '<p class="subtext">Subtitle. ' + S + '</p>',
  '<p class="pLS">Paragraph Large Strong. ' + S + '</p>',
  '<p class="pL">Paragraph Large. ' + S + '</p>',
  '<p class="pMS">Paragraph Medium Strong. ' + S + '</p>',
  '<p class="pM">Paragraph Medium. ' + S + '</p>',
  '<p class="pSS">Paragraph Small Strong. ' + S + '</p>',
  '<p class="pS">Paragraph Small. ' + S + '</p>',
  '<ul class="list"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
  '<hr class="divider" />',
  '<div class="quote"><div class="quote__mark">\u201c</div><p class="quote__text">XStream Pro has been unpredictable and disruptive. It\u2019s affecting our ability to deliver consistent service to our clients.</p></div>',
  '<table class="tbl"><thead><tr><th>Month</th><th>Escalations</th><th>Findings &amp; Evidence</th><th>Recommendations</th></tr></thead><tbody>'
    + '<tr><td>April</td><td>190</td><td>Baseline month; lower escalation volume; Level 2 &amp; 3 make up 30% of total</td><td>Focus on early detection and to keep escalations low</td></tr>'
    + '<tr><td>May</td><td>120</td><td>20% increase in total; Level 2 &amp; 3 ratio steady; possible seasonal uptick</td><td>Focus on early detection and to keep escalations low</td></tr>'
    + '<tr><td>June</td><td>190</td><td>Significant jump; 20% increase in total; Level 2 &amp; 3 rising; evidence of more complex cases</td><td>Invest in automation and cross collaboration</td></tr>'
    + '<tr><td>July</td><td>190</td><td>Highest escalation; Level 2 &amp; 3 at 30%; sustained complexity; possible resource gap</td><td>Launch escalation prevention; review staffing levels</td></tr>'
    + '</tbody></table>',
  '<pre class="code">const hello = "world";\nconsole.log(hello);</pre>',
  '<p class="pLS rb"><a href="#">Paragraph Large Strong Link. ' + S + '</a></p>',
  '<p class="pL rb"><a href="#">Paragraph Large Link. ' + S + '</a></p>',
  '<p class="pMS rb"><a href="#">Paragraph Medium Strong Link. ' + S + '</a></p>',
  '<p class="pM rb"><a href="#">Paragraph Medium Link. ' + S + '</a></p>',
  '<p class="pSS rb"><a href="#">Paragraph Small Strong Link. ' + S + '</a></p>',
  '<p class="pS rb"><a href="#">Paragraph Small Link. ' + S + '</a></p>',
  '</div>',
].join('\n');

const body = [
  '<h2 class="sec">Text blocks</h2>',
  '<div class="sheet">' + col + '</div>',
  '<h2 class="sec">Usage</h2>',
  '<div class="when"><strong>How responses are built.</strong> Response blocks are used to construct the response. There are various text blocks to represent different information; they\u2019re built with spacings depending on the typography scale (16px between blocks). Content uses <strong>Segoe Sans</strong> (weights 420 / 550 / 625), quotes use the <strong>Georgia</strong> editorial face, and code uses <strong>Consolas</strong> \u2014 headings step 36 \u2192 20 at weight 550 with \u22120.15 tracking; body paragraphs run Large 20/34, Medium 16/28, Small 12/20.</div>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Response Blocks Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1 class="page">Response Blocks \u2014 Component Preview</h1>'
  + '<p class="hint">The content type system that governs how responses are built \u2014 exact One Copilot fonts (Segoe Sans / Georgia / Consolas).</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'responseBlocks.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
