/**
 * Variants Demo — Interactive Preview
 *
 * Demonstrates the variant switcher runtime (`_variants.ts`).
 * Shows three independent variant groups so you can see the panel scale.
 *
 * Authoring pattern (declarative):
 *   <div data-variant-group="GROUP" data-variant-label="Group label">
 *     <div data-variant="opt-a" data-variant-label-option="Option A" data-default>…</div>
 *     <div data-variant="opt-b" data-variant-label-option="Option B">…</div>
 *   </div>
 *
 * Usage:  npx tsx preview/src/variantsDemo.ts
 * Output: preview/dist/variantsDemo.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { injectVariantsRuntime } from './_variants.js';
import { tokensCSS } from './_tokens';

// ─── CSS ────────────────────────────────────────────────────

let css = '';
css += tokensCSS;
css += '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}';
css += "html,body{height:100%;font-family: var(--f-typography-fontFamily-functional);color:#242424;background:#f5f5f5;}";
css += '.page{max-width:980px;margin:0 auto;padding:48px 40px 96px;display:flex;flex-direction:column;gap:32px;}';
css += '.page__intro{margin-bottom:8px;}';
css += '.page__title{font-size:24px;font-weight:600;margin-bottom:8px;}';
css += '.page__sub{font-size:14px;color:#5d5d5d;line-height:1.5;}';
css += '.page__sub kbd{font-family:Cascadia Code,Consolas,monospace;font-size:12px;padding:2px 6px;background:#fff;border:1px solid #dedede;border-radius:6px;}';
css += '.section{background:#fff;border:1px solid #ebebeb;border-radius:16px;padding:24px;}';
css += '.section__label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:#6f6f6f;margin-bottom:16px;}';

// Card variants
css += '.card{display:flex;border:1px solid #ebebeb;border-radius:12px;overflow:hidden;background:#fff;}';
css += '.card--compact{padding:16px;gap:12px;align-items:center;}';
css += '.card--compact .card__icon{width:40px;height:40px;border-radius:8px;background:#ebebeb;display:flex;align-items:center;justify-content:center;flex-shrink:0;}';
css += '.card--compact .card__title{font-size:14px;font-weight:600;}';
css += '.card--compact .card__desc{font-size:12px;color:#6f6f6f;margin-top:2px;}';
css += '.card--image{flex-direction:column;}';
css += '.card--image .card__hero{height:140px;background:linear-gradient(135deg,#6366F1 0%,#8B5CF6 100%);}';
css += '.card--image .card__body{padding:20px;}';
css += '.card--image .card__title{font-size:16px;font-weight:600;}';
css += '.card--image .card__desc{font-size:13px;color:#5d5d5d;margin-top:6px;line-height:1.5;}';
css += '.card--hero{flex-direction:column;align-items:center;text-align:center;padding:40px 32px;background:linear-gradient(180deg,#fafafa 0%,#fff 100%);}';
css += '.card--hero .card__icon{width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#6366F1,#8B5CF6);display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:16px;}';
css += '.card--hero .card__title{font-size:20px;font-weight:600;}';
css += '.card--hero .card__desc{font-size:14px;color:#5d5d5d;margin-top:8px;max-width:320px;line-height:1.5;}';

// Dialog variants
css += '.dlg{border:1px solid #dedede;border-radius:16px;background:#fff;box-shadow:0 8px 24px rgba(0,0,0,0.06);overflow:hidden;max-width:480px;margin:0 auto;}';
css += '.dlg__hero{height:160px;background:linear-gradient(135deg,#10b981 0%,#3b82f6 100%);display:flex;align-items:center;justify-content:center;color:#fff;}';
css += '.dlg__body{padding:24px;}';
css += '.dlg__title{font-size:18px;font-weight:600;margin-bottom:8px;}';
css += '.dlg__desc{font-size:14px;color:#5d5d5d;line-height:1.5;margin-bottom:20px;}';
css += '.dlg__actions{display:flex;gap:8px;justify-content:flex-end;}';
css += '.btn{height:32px;padding:0 14px;border-radius:8px;font-family:inherit;font-size:13px;font-weight:600;border:none;cursor:pointer;}';
css += '.btn--primary{background:#242424;color:#fff;}';
css += '.btn--secondary{background:#f5f5f5;color:#242424;}';

// Menu variants
css += '.menu{border:1px solid #dedede;border-radius:12px;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,0.04);max-width:320px;padding:6px;}';
css += '.menu__item{display:flex;align-items:center;gap:10px;height:36px;padding:0 10px;border-radius:8px;font-size:13px;color:#242424;cursor:pointer;}';
css += '.menu__item:hover{background:rgba(36,36,36,0.04);}';
css += '.menu__icon{width:16px;height:16px;color:#5d5d5d;flex-shrink:0;}';
css += '.menu__sep{height:1px;background:#ebebeb;margin:6px 4px;}';
css += '.menu__label{font-size:11px;color:#6f6f6f;text-transform:uppercase;letter-spacing:0.04em;padding:6px 10px 4px;}';

// ─── HTML ────────────────────────────────────────────────────

let html = '';
html += '<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>';
html += '<title>Variants Demo — M365 Copilot Playground</title>';
html += '<style>' + css + '</style></head><body>';
html += '<div class="page">';
html += '  <div class="page__intro">';
html += '    <div class="page__title">Variants Demo</div>';
html += '    <div class="page__sub">Tap the <strong>Variants</strong> chip in the bottom-right (or press <kbd>V</kbd>) to switch between variants in-place. URL captures your selection; share it and reviewers see the same.</div>';
html += '  </div>';

// ─── Group 1: card layouts ──────────────────────────────────
html += '  <div class="section">';
html += '    <div class="section__label">Store card</div>';
html += '    <div data-variant-group="card" data-variant-label="Card layout">';
html += '      <div data-variant="compact" data-variant-label-option="Compact" data-default>';
html += '        <div class="card card--compact">';
html += '          <div class="card__icon">📦</div>';
html += '          <div><div class="card__title">Box agent</div><div class="card__desc">Sync files from your Box account</div></div>';
html += '        </div>';
html += '      </div>';
html += '      <div data-variant="image" data-variant-label-option="With image">';
html += '        <div class="card card--image">';
html += '          <div class="card__hero"></div>';
html += '          <div class="card__body"><div class="card__title">Box agent</div><div class="card__desc">Sync files from your Box account and search them alongside the rest of your knowledge.</div></div>';
html += '        </div>';
html += '      </div>';
html += '      <div data-variant="hero" data-variant-label-option="Hero">';
html += '        <div class="card card--hero">';
html += '          <div class="card__icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 5v10l-8 5-8-5V7l8-5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></div>';
html += '          <div class="card__title">Box agent</div>';
html += '          <div class="card__desc">A complete connector experience — discover, install, and configure with a guided setup.</div>';
html += '        </div>';
html += '      </div>';
html += '    </div>';
html += '  </div>';

// ─── Group 2: dialog with/without hero ──────────────────────
html += '  <div class="section">';
html += '    <div class="section__label">Connect dialog</div>';
html += '    <div data-variant-group="dialog" data-variant-label="Dialog style">';
html += '      <div data-variant="text" data-variant-label-option="Text only" data-default>';
html += '        <div class="dlg">';
html += '          <div class="dlg__body">';
html += '            <div class="dlg__title">Connect your Box account</div>';
html += '            <div class="dlg__desc">We\'ll request read-only access to files you choose. You can revoke access at any time from Settings.</div>';
html += '            <div class="dlg__actions"><button class="btn btn--secondary">Not now</button><button class="btn btn--primary">Connect</button></div>';
html += '          </div>';
html += '        </div>';
html += '      </div>';
html += '      <div data-variant="hero" data-variant-label-option="With hero">';
html += '        <div class="dlg">';
html += '          <div class="dlg__hero"><svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M3 7l9 5 9-5M3 7v10l9 5 9-5V7M3 7l9-5 9 5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></div>';
html += '          <div class="dlg__body">';
html += '            <div class="dlg__title">Connect your Box account</div>';
html += '            <div class="dlg__desc">We\'ll request read-only access to files you choose. You can revoke access at any time from Settings.</div>';
html += '            <div class="dlg__actions"><button class="btn btn--secondary">Not now</button><button class="btn btn--primary">Connect</button></div>';
html += '          </div>';
html += '        </div>';
html += '      </div>';
html += '    </div>';
html += '  </div>';

// ─── Group 3: menu contents ─────────────────────────────────
html += '  <div class="section">';
html += '    <div class="section__label">Add menu</div>';
html += '    <div data-variant-group="menu" data-variant-label="Menu contents">';
html += '      <div data-variant="lean" data-variant-label-option="Lean" data-default>';
html += '        <div class="menu">';
html += '          <div class="menu__item"><svg class="menu__icon" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> Upload file</div>';
html += '          <div class="menu__item"><svg class="menu__icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/></svg> Connect a source</div>';
html += '        </div>';
html += '      </div>';
html += '      <div data-variant="grouped" data-variant-label-option="Grouped">';
html += '        <div class="menu">';
html += '          <div class="menu__label">From this device</div>';
html += '          <div class="menu__item"><svg class="menu__icon" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> Upload file</div>';
html += '          <div class="menu__item"><svg class="menu__icon" viewBox="0 0 16 16" fill="none"><rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/></svg> Paste from clipboard</div>';
html += '          <div class="menu__sep"></div>';
html += '          <div class="menu__label">Connect a source</div>';
html += '          <div class="menu__item"><svg class="menu__icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/></svg> SharePoint</div>';
html += '          <div class="menu__item"><svg class="menu__icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/></svg> Google Drive</div>';
html += '          <div class="menu__item"><svg class="menu__icon" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/></svg> Box</div>';
html += '        </div>';
html += '      </div>';
html += '      <div data-variant="kitchen" data-variant-label-option="Kitchen-sink">';
html += '        <div class="menu">';
html += '          <div class="menu__label">Compose</div>';
html += '          <div class="menu__item">📝 Write with template</div>';
html += '          <div class="menu__item">🎨 Generate image</div>';
html += '          <div class="menu__item">🎙 Record voice note</div>';
html += '          <div class="menu__sep"></div>';
html += '          <div class="menu__label">Bring in</div>';
html += '          <div class="menu__item">📎 Upload file</div>';
html += '          <div class="menu__item">🔗 Paste link</div>';
html += '          <div class="menu__item">🌐 Browse the web</div>';
html += '          <div class="menu__sep"></div>';
html += '          <div class="menu__label">Connect</div>';
html += '          <div class="menu__item">🗂 SharePoint</div>';
html += '          <div class="menu__item">📁 Google Drive</div>';
html += '          <div class="menu__item">📦 Box</div>';
html += '        </div>';
html += '      </div>';
html += '    </div>';
html += '  </div>';

html += '</div>';

// Variants runtime — single line opt-in
html += injectVariantsRuntime();

html += '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'variantsDemo.html'), html, 'utf-8');
console.log('Wrote preview/dist/variantsDemo.html');
