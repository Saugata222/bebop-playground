/**
 * Connect Dialog — Interactive HTML Preview
 *
 * Modal authorization surface shown when a user clicks Connect on an unconnected
 * source. Matches Figma `[Bebop V2] Dialog` (node 2562:165377):
 *
 *   ┌─────────────────────────────────────────────────────┐
 *   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  ← Hero band #f5f5f5, 122px
 *   │ ░░░░░░  [Copilot]  •••  [Connector]  ░░░░░░░░░░░░  │
 *   │                                                     │
 *   │  Connect HubSpot                                    │  ← Title 20/28 semibold
 *   │  Developed by Microsoft Corporation                 │  ← Subtitle 12/16
 *   │                                                     │
 *   │  Let Copilot securely read your content from        │  ← Body 14/20, wraps at 472px
 *   │  HubSpot. You can manage your sources in Settings.  │
 *   │                                                     │
 *   │                            [Cancel]  [Continue to…] │  ← Footer, right-aligned
 *   └─────────────────────────────────────────────────────┘
 *
 * Reuses primitives:
 *   - Button (primary + secondary, medium size)
 *   - Focus ring (2px black outer + 1px white inner)
 *
 * Usage:  npx tsx preview/src/connectDialog.ts
 * Output: preview/dist/connectDialog.html
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, ' ').trim();
}

const copilotIco = readIcon('copilot-20-regular.svg');
const hubspotIco = readIcon('hubspot-20-color.svg');
const moreHorizontalIco = readIcon('more-horizontal-20-regular.svg');

// ─── CSS ────────────────────────────────────────────────────

let css = '';

// Reset + page chrome
css += '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n';
css += "html, body { height: 100%; font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif; color: #242424; background: #f5f5f5; }\n";
css += '@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }\n';

// Layout
css += '.page { padding: 40px; display: flex; flex-direction: column; gap: 48px; max-width: 900px; margin: 0 auto; }\n';
css += 'h2 { font-size: 14px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }\n';
css += '.demo { background: #2a2a2a; border-radius: 16px; padding: 64px 32px; display: flex; align-items: center; justify-content: center; min-height: 480px; }\n';

// ─── Dialog surface ─────────────────────────────────────────
// Connect Dialog spec: 556px wide, 16px radius, white, Elevation 5 shadow,
// transparent border (shadow alone defines the surface).
css += '.cd { width: 556px; background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 16px; box-shadow: 0px 12px 48px rgba(0,0,0,0.24), 0px 0px 3px rgba(0,0,0,0.03); overflow: hidden; position: relative; display: flex; flex-direction: column; gap: 16px; padding: 0 0 24px 0; transition: opacity 0.25s ease, transform 0.25s ease; }\n';
css += '.cd--dismissed { opacity: 0; transform: scale(0.96); pointer-events: none; }\n';

// ─── Hero band ──────────────────────────────────────────────
css += '.cd__hero { width: 100%; height: 122px; background: #f5f5f5; flex-shrink: 0; }\n';

// ─── Floating icon row ──────────────────────────────────────
// Centered horizontally, top:37px from dialog top — overlays the hero band.
css += '.cd__icons { position: absolute; top: 37px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 16px; }\n';
css += '.cd__brand { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }\n';
css += '.cd__brand svg { width: 48px; height: 48px; display: block; }\n';
css += '.cd__dots { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: #5d5d5d; flex-shrink: 0; }\n';
css += '.cd__dots svg { width: 32px; height: 32px; display: block; }\n';

// ─── Content section ───────────────────────────────────────
// Figma nests: Frame2147233636 (gap-16: textGroup ↔ footer) > Frame2147233635 (gap-8: header ↔ body)
css += '.cd__content { display: flex; flex-direction: column; gap: 16px; padding: 0 24px; }\n';
css += '.cd__text-group { display: flex; flex-direction: column; gap: 8px; }\n';
css += '.cd__header { display: flex; flex-direction: column; gap: 2px; word-break: break-word; }\n';
// Title — Functional/Subtitle: 20/28/Semibold, Segoe Sans
css += ".cd__title { font-family: 'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif; font-size: 20px; font-weight: 600; line-height: 28px; color: #242424; }\n";
// Subtitle — Caption 1: 12/16/Regular, Segoe UI, #424242
css += ".cd__subtitle { font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 400; line-height: 16px; color: #424242; }\n";
// Body — Functional/Body Medium: 14/20/Regular, Segoe Sans, max-width 472px
css += ".cd__body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, -apple-system, sans-serif; font-size: 14px; font-weight: 400; line-height: 20px; color: #242424; max-width: 472px; word-break: break-word; }\n";
css += '.cd__body a { color: inherit; text-decoration: underline; text-underline-offset: 2px; cursor: pointer; }\n';
css += '.cd__body a:hover { text-decoration-thickness: 2px; }\n';
css += '.cd__body a:focus-visible { outline: 2px solid #000; outline-offset: 2px; border-radius: 2px; }\n';

// ─── Footer ────────────────────────────────────────────────
// justify-between with empty left slot per Figma; right side holds buttons with 8px gap.
css += '.cd__footer { display: flex; align-items: flex-start; justify-content: space-between; padding: 4px 24px 0 24px; }\n';
css += '.cd__footer-right { display: flex; gap: 8px; }\n';

// ─── Buttons ────────────────────────────────────────────────
// Button — Bebop `buttonSizeMedium`: 32 height, 10 paddingInline, 12 borderRadius
css += ".cd__btn { height: 32px; padding-inline: 10px; border-radius: 12px; border: none; font-family: inherit; font-size: 14px; font-weight: 400; line-height: 20px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; transition: background 0.1s ease, color 0.1s ease; outline: none; position: relative; }\n";
css += '.cd__btn--secondary { background: #f5f5f5; color: #242424; }\n';
css += '.cd__btn--secondary:hover { background: #ebebeb; }\n';
css += '.cd__btn--primary { background: #242424; color: #ffffff; }\n';
css += '.cd__btn--primary:hover { background: #3b3b3b; }\n';
css += '.cd__btn:focus-visible { outline: 2px solid #000; outline-offset: 1px; box-shadow: 0 0 0 1px #fff inset; }\n';

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html>';
html += '<html lang="en">';
html += '<head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Connect Dialog — M365 Copilot Design System Preview</title>';
html += '<style>' + css + '</style>';
html += '</head>';
html += '<body>';
html += '<div class="page">';

// ─── Section 1: Default (HubSpot) ───────────────────────────
html += '<div>';
html += '<h2>Connect HubSpot — Default</h2>';
html += '<div class="demo bp-stage__canvas">';
html += '<div class="cd" id="cd1" role="dialog" aria-labelledby="cd1-title" aria-describedby="cd1-body">';
html += '<div class="cd__hero"></div>';
html += '<div class="cd__icons" aria-hidden="true">';
html += '<span class="cd__brand">' + copilotIco + '</span>';
html += '<span class="cd__dots">' + moreHorizontalIco + '</span>';
html += '<span class="cd__brand">' + hubspotIco + '</span>';
html += '</div>';
html += '<div class="cd__content">';
html += '<div class="cd__text-group">';
html += '<div class="cd__header">';
html += '<div class="cd__title" id="cd1-title">Connect HubSpot</div>';
html += '<div class="cd__subtitle">Developed by Microsoft Corporation</div>';
html += '</div>';
html += '<div class="cd__body" id="cd1-body">Let Copilot securely read your content from HubSpot. You can manage your sources in <a href="#" data-action="settings">Settings</a>.</div>';
html += '</div>'; // end .cd__text-group
html += '</div>'; // end .cd__content
html += '<div class="cd__footer">';
html += '<div></div>'; // empty left slot (Figma reserves 107px here)
html += '<div class="cd__footer-right">';
html += '<button type="button" class="cd__btn cd__btn--secondary" data-action="cancel">Cancel</button>';
html += '<button type="button" class="cd__btn cd__btn--primary" data-action="continue" data-target="HubSpot">Continue to HubSpot</button>';
html += '</div>';
html += '</div>';
html += '</div>'; // end .cd
html += '</div>'; // end .demo
html += '</div>'; // end section

html += '</div>'; // end .page

// ─── Script ─────────────────────────────────────────────────

html += '<script>\n';

// Cancel — dismiss dialog
html += 'document.querySelectorAll(\'[data-action="cancel"]\').forEach(function(btn) {\n';
html += '  btn.addEventListener(\'click\', function() {\n';
html += '    var dlg = btn.closest(\'.cd\');\n';
html += '    dlg.classList.add(\'cd--dismissed\');\n';
html += '    setTimeout(function() { dlg.classList.remove(\'cd--dismissed\'); }, 1500);\n';
html += '  });\n';
html += '});\n';

// Continue — flash "Connecting..." then dismiss
html += 'document.querySelectorAll(\'[data-action="continue"]\').forEach(function(btn) {\n';
html += '  btn.addEventListener(\'click\', function() {\n';
html += '    var orig = btn.textContent;\n';
html += '    btn.textContent = \'Connecting\\u2026\';\n';
html += '    btn.style.pointerEvents = \'none\';\n';
html += '    setTimeout(function() {\n';
html += '      var dlg = btn.closest(\'.cd\');\n';
html += '      dlg.classList.add(\'cd--dismissed\');\n';
html += '      setTimeout(function() {\n';
html += '        dlg.classList.remove(\'cd--dismissed\');\n';
html += '        btn.textContent = orig;\n';
html += '        btn.style.pointerEvents = \'\';\n';
html += '      }, 1500);\n';
html += '    }, 1000);\n';
html += '  });\n';
html += '});\n';

html += '<\/script>\n';

html += '</body>';
html += '</html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'connectDialog.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'connectDialog.html'));
