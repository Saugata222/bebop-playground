/**
 * Link — Interactive Preview
 *
 * One Copilot primitive (node 2149:3308). Inline text hyperlink in two type
 * variants (Functional, Content), each across Rest / Hover / Pressed / Disabled.
 *
 * Font — EXACT: both variants render in Segoe Sans (functional "Small Regular"
 * 14/20, content "Text Regular" 16/28). Functional underline = 1px solid,
 * content underline = 2px dotted (hover / press only).
 */

import * as fs from 'fs';
import * as path from 'path';
import { section, stage, segControl, matrix as matrixTbl, specs, guidance } from './_scaffold';

// ─── Markup builders ────────────────────────────────────────

function staticLink(variant: string, state: string): string {
  return '<span class="lk lk--' + variant + ' lk--' + state + '">Link</span>';
}

function liveLink(variant: string): string {
  return '<a class="lk lk--' + variant + ' lk--live" href="#" onclick="return false;">Link</a>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 760px; margin: 0 auto; }

/* Spec grid */
.grid { display: grid; grid-template-columns: 120px repeat(4, 1fr); gap: 1px; background: #ebebeb; border: 1px solid #ebebeb; border-radius: 12px; overflow: hidden; margin-bottom: 16px; }
.grid > div { background: #fff; padding: 16px 18px; display: flex; align-items: center; }
.grid .head { background: #fafafa; font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; }
.grid .rowlabel { background: #fafafa; font-size: 11px; font-weight: 600; color: #242424; }

/* ─── Link base ─── */
.lk {
  display: inline-flex; align-items: center; gap: 2px;
  color: #242424; cursor: pointer; text-decoration: none;
  text-decoration-skip-ink: none; white-space: nowrap;
}

/* Functional variant — Segoe Sans "Small Regular" 14 / 420 / 20 */
.lk--functional {
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  font-size: 14px; font-weight: 420; line-height: 20px; letter-spacing: 0;
}
/* Content variant — Segoe Sans "Text Regular" 16 / 420 / 28 */
.lk--content {
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  font-size: 16px; font-weight: 420; line-height: 28px; letter-spacing: 0;
}

/* Static states */
.lk--rest { color: #242424; text-decoration: none; }
.lk--disabled { color: rgba(0,0,0,0.43); text-decoration: none; cursor: not-allowed; }

.lk--functional.lk--hover { color: #181818; text-decoration: underline; text-decoration-thickness: 1px; text-decoration-style: solid; }
.lk--functional.lk--pressed { color: #0d0d0d; text-decoration: underline; text-decoration-thickness: 1px; text-decoration-style: solid; }
.lk--content.lk--hover { color: #181818; text-decoration: underline; text-decoration-thickness: 2px; text-decoration-style: dotted; }
.lk--content.lk--pressed { color: #0d0d0d; text-decoration: underline; text-decoration-thickness: 2px; text-decoration-style: dotted; }

/* Live interactive links */
.lk--live { color: #242424; text-decoration: none; }
.lk--functional.lk--live:hover { color: #181818; text-decoration: underline; text-decoration-thickness: 1px; text-decoration-style: solid; }
.lk--functional.lk--live:active { color: #0d0d0d; }
.lk--content.lk--live:hover { color: #181818; text-decoration: underline; text-decoration-thickness: 2px; text-decoration-style: dotted; }
.lk--content.lk--live:active { color: #0d0d0d; }
.lk--live:focus-visible { outline: 2px solid #242424; outline-offset: 2px; border-radius: 2px; }

.live-row { display: flex; gap: 40px; align-items: center; background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 20px 22px; margin-bottom: 16px; }
.live-cell { display: flex; flex-direction: column; gap: 6px; }
.live-cell .rl { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; }

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

// ─── Spec grid rows ─────────────────────────────────────────

function specRow(label: string, variant: string): string {
  return '<div class="rowlabel">' + label + '</div>'
    + '<div>' + staticLink(variant, 'rest') + '</div>'
    + '<div>' + staticLink(variant, 'hover') + '</div>'
    + '<div>' + staticLink(variant, 'pressed') + '</div>'
    + '<div>' + staticLink(variant, 'disabled') + '</div>';
}

const body = [
  stage('<a id="heroLink" class="lk lk--functional lk--live" href="#" onclick="return false;">Link</a>',
    segControl('Variant', 'variant', [
      { value: 'functional', label: 'Functional', active: true },
      { value: 'content', label: 'Content' },
    ]) +
    segControl('State', 'state', [
      { value: 'rest', label: 'Rest', active: true },
      { value: 'hover', label: 'Hover' },
      { value: 'pressed', label: 'Pressed' },
      { value: 'disabled', label: 'Disabled' },
    ])),

  section('Variants \u00d7 states', matrixTbl(
    ['Rest', 'Hover', 'Pressed', 'Disabled'],
    [
      { label: 'Functional', cells: [staticLink('functional', 'rest'), staticLink('functional', 'hover'), staticLink('functional', 'pressed'), staticLink('functional', 'disabled')] },
      { label: 'Content', cells: [staticLink('content', 'rest'), staticLink('content', 'hover'), staticLink('content', 'pressed'), staticLink('content', 'disabled')] },
    ],
  )),

  section('Interactive',
    '<div class="bp-card" style="padding:20px 24px;display:flex;gap:40px;align-items:center;flex-wrap:wrap">' +
    '<div class="live-cell"><span class="rl">Functional</span>' + liveLink('functional') + '</div>' +
    '<div class="live-cell"><span class="rl">Content</span>' + liveLink('content') + '</div>' +
    '<div class="live-cell"><span class="rl">In a sentence</span><span class="lk--content" style="color:#5d5d5d">Read our ' + liveLink('content') + ' for details.</span></div>' +
    '</div>', 'Hover the links to reveal the underline affordance'),

  section('Specs', specs([
    { k: 'Functional', v: '14/20 \u00b7 underline 1px solid' },
    { k: 'Content', v: '16/28 \u00b7 underline 2px dotted' },
    { k: 'Rest', v: '#242424' },
    { k: 'Hover / Pressed', v: '#181818 / #0d0d0d' },
    { k: 'Disabled', v: 'rgba(0,0,0,0.43)' },
    { k: 'Underline', v: 'hover / press only' },
    { k: 'Font', v: 'Segoe Sans' },
  ])),

  section('Usage guidance',
    '<div class="bp-usage"><div class="bp-usage__card"><div class="bp-usage__sec"><h4>When to use</h4>' +
    '<p>Use a Link for inline navigation to another page, view, or resource within running text or UI labels. Choose the <em>Functional</em> variant inside chrome and controls (14px), and the <em>Content</em> variant inside reading/prose (16px). For a standalone action that performs an operation, use a Button instead.</p>' +
    '</div></div></div><div style="height:12px"></div>' +
    guidance(
      [
        'Keep link text descriptive of its destination \u2014 avoid \u201cclick here\u201d.',
        'Reveal the underline on hover/press (1px solid functional, 2px dotted content).',
        'Match the surrounding type: Functional in UI, Content in prose.',
        'Use the disabled color (43% black) and remove the pointer when inactive.',
      ],
      [
        'Use a Link to trigger an action \u2014 that\'s a Button.',
        'Underline links at rest \u2014 the underline is a hover/press affordance.',
        'Mix the functional and content underline styles within one context.',
        'Rely on color alone \u2014 the underline provides non-color distinction.',
      ],
    )),

  `<script>
(function () {
  var hero = document.getElementById('heroLink');
  var st = { variant: 'functional', state: 'rest' };
  function paint() {
    hero.className = 'lk lk--' + st.variant + ' ' + (st.state === 'rest' ? 'lk--live' : 'lk--' + st.state);
  }
  document.querySelectorAll('[data-ctrl]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-ctrl');
      st[name] = btn.getAttribute('data-value');
      var seg = document.querySelector('[data-seg="' + name + '"]');
      if (seg) seg.querySelectorAll('button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      paint();
    });
  });
  paint();
})();
</script>`,
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Link Preview</title><style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'link.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
