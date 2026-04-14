/**
 * Banner — Interactive HTML Preview
 *
 * Shows the banner component in 3 variants:
 *   Single source  — one app icon, CTA to connect that source
 *   Multi source   — 2×2 icon grid with overflow count, CTA to browse
 *   Connected      — confirmation icon, CTA to explore
 *
 * Reuses primitives:
 *   - Button (secondary style for action, subtle circular for dismiss)
 *   - Focus ring (2px black outer + 1px white inner)
 *   - Disabled state pattern
 *
 * Usage:  npx tsx preview/src/banner.ts
 * Output: preview/dist/banner.html
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, ' ').trim();
}

const dismissIco = readIcon('dismiss-20-regular.svg');

// ─── CSS ────────────────────────────────────────────────────

let css = '';

// Reset
css += '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n';
css += "html, body { height: 100%; font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif; color: #242424; background: #f5f5f5; }\n";

// Reduced motion
css += '@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }\n';

// Layout
css += '.page { padding: 40px; display: flex; flex-direction: column; gap: 48px; max-width: 800px; margin: 0 auto; }\n';
css += 'h2 { font-size: 14px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }\n';
css += '.demo { background: #fff; border-radius: 16px; padding: 32px; border: 1px solid #e8e8e8; display: flex; flex-direction: column; gap: 24px; }\n';
css += '.state-cell { display: flex; flex-direction: column; gap: 8px; }\n';
css += '.state-label { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.6px; }\n';

// ─── Banner container ───
css += ".bnr { display: flex; align-items: center; justify-content: center; padding: 16px; border: 1px solid #dedede; border-radius: 16px; background: #fff; font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif; transition: opacity 0.25s ease-out, max-height 0.3s ease-out, padding 0.3s ease-out, margin 0.3s ease-out, border-width 0.3s ease-out; overflow: hidden; }\n";
css += '.bnr--dismissed { opacity: 0; max-height: 0 !important; padding-block: 0; margin-block: 0; border-width: 0; pointer-events: none; }\n';

// ─── Banner row ───
css += '.bnr__row { display: flex; align-items: center; gap: 12px; width: 100%; }\n';

// ─── Image area — single icon ───
css += '.bnr__img { width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }\n';
css += '.bnr__img img { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; display: block; }\n';

// ─── Image area — multi (2×2 grid) ───
css += '.bnr__img--multi { display: flex; flex-wrap: wrap; gap: 2px; width: 40px; height: 40px; flex-shrink: 0; align-content: flex-start; }\n';
css += '.bnr__img--multi img { width: 19px; height: 19px; border-radius: 4px; object-fit: cover; display: block; }\n';
css += '.bnr__img--multi .bnr__overflow { width: 19px; height: 19px; border-radius: 4px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 400; color: #242424; line-height: 1; }\n';

// ─── Image area — connected (custom icon) ───
css += '.bnr__img--connected { width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }\n';
css += '.bnr__img--connected img { width: 40px; height: 40px; object-fit: contain; display: block; }\n';

// ─── Content ───
css += '.bnr__main { flex: 1; min-width: 0; overflow: hidden; }\n';
css += '.bnr__content { display: flex; align-items: center; gap: 20px; width: 100%; }\n';
css += '.bnr__text { flex: 1; min-width: 0; }\n';

// ─── Typography — from typeFunctional.bodyMediumStrong / bodyMedium ───
css += '.bnr__header { font-size: 14px; font-weight: 600; line-height: 20px; color: #242424; }\n';
css += '.bnr__body { font-size: 14px; font-weight: 400; line-height: 1.4; color: #242424; }\n';

// ─── Buttons — reuses buttonStyleSecondary + buttonSizeMedium (action) ───
css += '.bnr__buttons { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }\n';

// Action button — buttonStyleSecondary: bg #f5f5f5, hover #ebebeb, 32px height, radius 12
css += ".bnr__btn { height: 32px; padding-inline: 10px; border-radius: 12px; border: none; background: #f5f5f5; color: #242424; font-family: inherit; font-size: 14px; font-weight: 400; line-height: 20px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; transition: background 0.1s ease; outline: none; position: relative; }\n";
css += '.bnr__btn:hover { background: #ebebeb; }\n';
// Focus ring — matches focusRing: 2px black outer + 1px white inner
css += '.bnr__btn:focus-visible { outline: 2px solid #000; outline-offset: 1px; box-shadow: 0 0 0 1px #fff inset; }\n';

// Dismiss button — buttonStyleSubtle + buttonIconOnlyMedium: 32×32, circular, transparent
css += '.bnr__dismiss { width: 32px; height: 32px; border-radius: 9999px; border: none; background: transparent; color: #242424; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; padding: 0; transition: background 0.1s ease; outline: none; position: relative; }\n';
css += '.bnr__dismiss:hover { background: rgba(36, 36, 36, 0.04); }\n';
// Focus ring — same pattern
css += '.bnr__dismiss:focus-visible { outline: 2px solid #000; outline-offset: 1px; box-shadow: 0 0 0 1px #fff inset; }\n';
css += '.bnr__dismiss svg { width: 20px; height: 20px; display: block; }\n';

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html>';
html += '<html lang="en">';
html += '<head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Banner \u2014 Bebop Design System Preview</title>';
html += '<style>' + css + '</style>';
html += '</head>';
html += '<body>';
html += '<div class="page">';

// ─── Section 1: Single Source ───
html += '<div>';
html += '<h2>Single Source</h2>';
html += '<div class="demo">';
html += '<div class="state-cell">';
html += '<span class="state-label">Connect Prompt</span>';
html += '<div class="bnr" role="status">';
html += '<div class="bnr__row">';
html += '<div class="bnr__img"><img src="../../src/components/icons/sp-global-logo.png" alt="S&amp;P Global logo" /></div>';
html += '<div class="bnr__main"><div class="bnr__content">';
html += '<div class="bnr__text">';
html += '<div class="bnr__header">Connect your S&amp;P Global data to Copilot</div>';
html += '<div class="bnr__body">Connect to S&amp;P Global to access verified, up-to-date financial data</div>';
html += '</div>';
html += '<div class="bnr__buttons">';
html += '<button class="bnr__btn" type="button">Connect</button>';
html += '<button class="bnr__dismiss" type="button" aria-label="Dismiss banner">' + dismissIco + '</button>';
html += '</div>';
html += '</div></div>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '</div>';

// ─── Section 2: Multi Source ───
html += '<div>';
html += '<h2>Multi Source</h2>';
html += '<div class="demo">';
html += '<div class="state-cell">';
html += '<span class="state-label">Browse Prompt</span>';
html += '<div class="bnr" role="status">';
html += '<div class="bnr__row">';
html += '<div class="bnr__img--multi">';
html += '<img src="../../src/components/icons/sp-global-logo.png" alt="S&amp;P Global" />';
html += '<img src="../../src/components/icons/lseg-logo.png" alt="LSEG" />';
html += '<img src="../../src/components/icons/moodys-logo.png" alt="Moody\'s" />';
html += '<span class="bnr__overflow" aria-label="and 7 more">+7</span>';
html += '</div>';
html += '<div class="bnr__main"><div class="bnr__content">';
html += '<div class="bnr__text">';
html += '<div class="bnr__header">Connect your data to get more from Copilot</div>';
html += '<div class="bnr__body">Connect to S&amp;P Global, Moody\'s, LSEG and more to ground responses in trusted data</div>';
html += '</div>';
html += '<div class="bnr__buttons">';
html += '<button class="bnr__btn" type="button">Try now</button>';
html += '<button class="bnr__dismiss" type="button" aria-label="Dismiss banner">' + dismissIco + '</button>';
html += '</div>';
html += '</div></div>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '</div>';

// ─── Section 3: Connected Source ───
html += '<div>';
html += '<h2>Connected Source</h2>';
html += '<div class="demo">';
html += '<div class="state-cell">';
html += '<span class="state-label">Confirmation</span>';
html += '<div class="bnr" role="status">';
html += '<div class="bnr__row">';
html += '<div class="bnr__img--connected"><img src="../../src/components/icons/engineering-hub-logo.png" alt="Engineering Hub" /></div>';
html += '<div class="bnr__main"><div class="bnr__content">';
html += '<div class="bnr__text">';
html += '<div class="bnr__header">Your Engineering Hub is now connected to Copilot</div>';
html += '<div class="bnr__body">Access docs and team knowledge from Engineering Hub in your Copilot responses.</div>';
html += '</div>';
html += '<div class="bnr__buttons">';
html += '<button class="bnr__btn" type="button">Explore</button>';
html += '<button class="bnr__dismiss" type="button" aria-label="Dismiss banner">' + dismissIco + '</button>';
html += '</div>';
html += '</div></div>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '</div>';
html += '</div>';

// ─── Section 4: Interactive ───
html += '<div>';
html += '<h2>Interactive \u2014 Click Dismiss or Action</h2>';
html += '<div class="demo">';

// Interactive single source
html += '<div class="bnr" role="status">';
html += '<div class="bnr__row">';
html += '<div class="bnr__img"><img src="../../src/components/icons/sp-global-logo.png" alt="S&amp;P Global logo" /></div>';
html += '<div class="bnr__main"><div class="bnr__content">';
html += '<div class="bnr__text">';
html += '<div class="bnr__header">Connect your S&amp;P Global data to Copilot</div>';
html += '<div class="bnr__body">Connect to S&amp;P Global to access verified, up-to-date financial data</div>';
html += '</div>';
html += '<div class="bnr__buttons">';
html += '<button class="bnr__btn" type="button" data-action="connect">Connect</button>';
html += '<button class="bnr__dismiss" type="button" aria-label="Dismiss banner" data-action="dismiss">' + dismissIco + '</button>';
html += '</div>';
html += '</div></div>';
html += '</div>';
html += '</div>';

// Interactive multi source
html += '<div class="bnr" role="status">';
html += '<div class="bnr__row">';
html += '<div class="bnr__img--multi">';
html += '<img src="../../src/components/icons/sp-global-logo.png" alt="S&amp;P Global" />';
html += '<img src="../../src/components/icons/lseg-logo.png" alt="LSEG" />';
html += '<img src="../../src/components/icons/moodys-logo.png" alt="Moody\'s" />';
html += '<span class="bnr__overflow" aria-label="and 7 more">+7</span>';
html += '</div>';
html += '<div class="bnr__main"><div class="bnr__content">';
html += '<div class="bnr__text">';
html += '<div class="bnr__header">Connect your data to get more from Copilot</div>';
html += '<div class="bnr__body">Connect to S&amp;P Global, Moody\'s, LSEG and more to ground responses in trusted data</div>';
html += '</div>';
html += '<div class="bnr__buttons">';
html += '<button class="bnr__btn" type="button" data-action="connect">Try now</button>';
html += '<button class="bnr__dismiss" type="button" aria-label="Dismiss banner" data-action="dismiss">' + dismissIco + '</button>';
html += '</div>';
html += '</div></div>';
html += '</div>';
html += '</div>';

// Interactive connected source
html += '<div class="bnr" role="status">';
html += '<div class="bnr__row">';
html += '<div class="bnr__img--connected"><img src="../../src/components/icons/engineering-hub-logo.png" alt="Engineering Hub" /></div>';
html += '<div class="bnr__main"><div class="bnr__content">';
html += '<div class="bnr__text">';
html += '<div class="bnr__header">Your Engineering Hub is now connected to Copilot</div>';
html += '<div class="bnr__body">Access docs and team knowledge from Engineering Hub in your Copilot responses.</div>';
html += '</div>';
html += '<div class="bnr__buttons">';
html += '<button class="bnr__btn" type="button" data-action="connect">Explore</button>';
html += '<button class="bnr__dismiss" type="button" aria-label="Dismiss banner" data-action="dismiss">' + dismissIco + '</button>';
html += '</div>';
html += '</div></div>';
html += '</div>';
html += '</div>';

html += '</div>'; // demo
html += '</div>'; // section

html += '</div>'; // page

// ─── Script ─────────────────────────────────────────────────

html += '<script>\n';

// Dismiss — animate out
html += 'document.querySelectorAll(\'[data-action="dismiss"]\').forEach(function(btn) {\n';
html += '  btn.addEventListener(\'click\', function() {\n';
html += '    var bnr = btn.closest(\'.bnr\');\n';
html += '    bnr.style.maxHeight = bnr.offsetHeight + \'px\';\n';
html += '    requestAnimationFrame(function() {\n';
html += '      bnr.classList.add(\'bnr--dismissed\');\n';
html += '    });\n';
html += '  });\n';
html += '});\n';
html += '\n';

// Connect — flash confirmation then dismiss
html += 'document.querySelectorAll(\'[data-action="connect"]\').forEach(function(btn) {\n';
html += '  btn.addEventListener(\'click\', function() {\n';
html += '    var bnr = btn.closest(\'.bnr\');\n';
html += '    bnr.style.maxHeight = bnr.offsetHeight + \'px\';\n';
html += '    btn.textContent = \'Connected!\';\n';
html += '    btn.style.background = \'#dff6dd\';\n';
html += '    btn.style.color = \'#107C10\';\n';
html += '    btn.style.pointerEvents = \'none\';\n';
html += '    setTimeout(function() {\n';
html += '      requestAnimationFrame(function() {\n';
html += '        bnr.classList.add(\'bnr--dismissed\');\n';
html += '      });\n';
html += '    }, 1500);\n';
html += '  });\n';
html += '});\n';

html += '<\/script>\n';

html += '</body>';
html += '</html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'banner.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'banner.html'));
