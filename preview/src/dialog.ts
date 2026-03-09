/**
 * Dialog — Interactive HTML Preview
 *
 * Shows the dialog component in its default configuration,
 * plus variants: no body, with tertiary button, no secondary button.
 * Click "Open Dialog" to show modal with overlay.
 */

import * as fs from 'fs';
import * as path from 'path';

// Dismiss icon (20px regular)
const dismissIcon = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.08859 4.21569L4.14645 4.14645C4.32001 3.97288 4.58944 3.9536 4.78431 4.08859L4.85355 4.14645L10 9.293L15.1464 4.14645C15.32 3.97288 15.5894 3.9536 15.7843 4.08859L15.8536 4.14645C16.0271 4.32 16.0464 4.58944 15.9114 4.78431L15.8536 4.85355L10.707 10L15.8536 15.1464C16.0271 15.32 16.0464 15.5894 15.9114 15.7843L15.8536 15.8536C15.68 16.0271 15.4106 16.0464 15.2157 15.9114L15.1464 15.8536L10 10.707L4.85355 15.8536C4.67999 16.0271 4.41056 16.0464 4.21569 15.9114L4.14645 15.8536C3.97288 15.68 3.9536 15.4106 4.08859 15.2157L4.14645 15.1464L9.293 10L4.14645 4.85355C3.97288 4.67999 3.9536 4.41056 4.08859 4.21569Z" fill="currentColor"/></svg>';

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 900px; margin: 0 auto; }
.row { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 24px; align-items: flex-start; }

/* ─── Trigger buttons ─── */
.trigger {
  display: inline-flex; align-items: center; justify-content: center;
  height: 32px; padding: 6px 10px; gap: 4px; border-radius: 12px;
  font-family: inherit; font-size: 14px; font-weight: 400; line-height: 1.4;
  cursor: pointer; border: none; background: #f5f5f5; color: #242424;
  transition: background 0.1s;
}
.trigger:hover { background: #ebebeb; }

/* ─── Overlay ─── */
.overlay {
  display: none; position: fixed; inset: 0; z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  align-items: center; justify-content: center;
}
.overlay.open { display: flex; }

/* ─── Dialog surface ─── */
.dlg {
  background: #ffffff;
  min-width: 480px; width: 600px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(36, 36, 36, 0);
  box-shadow: 0px 12px 48px 0px rgba(0, 0, 0, 0.24), 0px 0px 3px 0px rgba(0, 0, 0, 0.03);
  display: flex; flex-direction: column; gap: 8px;
  overflow: clip;
  position: relative;
}

/* ─── Header ─── */
.dlg__header {
  display: flex; gap: 8px; align-items: flex-start; width: 100%;
}
.dlg__title {
  flex: 1 0 0;
  font-family: 'Segoe UI', 'Segoe Sans', sans-serif;
  font-size: 20px; font-weight: 600; line-height: 1.4;
  color: #242424; min-height: 1px; min-width: 1px;
}

/* ─── Dismiss button ─── */
.dlg__dismiss-wrap {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; padding-left: 4px; flex-shrink: 0;
}
.dlg__dismiss {
  display: flex; align-items: center; justify-content: center;
  padding: 6px; border-radius: 9999px; border: none;
  background: rgba(36, 36, 36, 0); cursor: pointer;
  color: #242424; transition: background 0.1s;
}
.dlg__dismiss:hover { background: rgba(36, 36, 36, 0.04); }
.dlg__dismiss:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }
.dlg__dismiss svg { display: block; width: 20px; height: 20px; }

/* ─── Body ─── */
.dlg__body {
  width: 100%;
}
.dlg__body p {
  font-family: 'Segoe UI', 'Segoe Sans', sans-serif;
  font-size: 14px; font-weight: 400; line-height: 1.4;
  color: #242424; margin: 0;
}

/* ─── Footer ─── */
.dlg__footer {
  display: flex; align-items: flex-start; justify-content: space-between;
  width: 100%; padding-top: 4px;
}
.dlg__footer-left { display: flex; gap: 0; align-items: flex-start; }
.dlg__footer-right { display: flex; gap: 8px; align-items: flex-start; }

/* ─── Footer buttons ─── */
.dlg__btn {
  display: inline-flex; align-items: center; justify-content: center;
  height: 32px; padding: 6px 10px; gap: 4px; border-radius: 12px;
  font-family: 'Segoe UI', 'Segoe Sans', sans-serif;
  font-size: 14px; font-weight: 400; line-height: 1.4;
  letter-spacing: 0; white-space: nowrap; cursor: pointer; border: none;
  transition: background 0.1s;
}
.dlg__btn:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }
.dlg__btn--primary { background: #242424; color: #ffffff; }
.dlg__btn--primary:hover { background: #3b3b3b; }
.dlg__btn--secondary { background: #f5f5f5; color: #242424; }
.dlg__btn--secondary:hover { background: #ebebeb; }
.dlg__btn--tertiary { background: #f5f5f5; color: #242424; }
.dlg__btn--tertiary:hover { background: #ebebeb; }

/* ─── Inline (non-modal) demo card ─── */
.demo-card {
  background: #fcfcfc; border: 2px solid #f0f0f0; border-radius: 24px;
  padding: 60px 24px; display: flex; align-items: center; justify-content: center;
  position: relative;
}
.demo-label {
  position: absolute; top: 16px; left: 24px;
  font-size: 14px; font-weight: 600; color: #5d5d5d;
}
`;

// ─── Dialog HTML builders ───────────────────────────────────

function dialogHTML(opts: {
  id?: string;
  title: string;
  body?: string;
  dismiss?: boolean;
  primary: string;
  secondary?: string;
  tertiary?: string;
}): string {
  const dismiss = opts.dismiss !== false
    ? '<div class="dlg__dismiss-wrap"><button class="dlg__dismiss" aria-label="Dismiss"'
      + (opts.id ? ' onclick="closeDialog(\'' + opts.id + '\')"' : '')
      + '>' + dismissIcon + '</button></div>'
    : '';
  const body = opts.body
    ? '<div class="dlg__body"><p>' + opts.body + '</p></div>'
    : '';
  const tertiary = opts.tertiary
    ? '<button class="dlg__btn dlg__btn--tertiary">' + opts.tertiary + '</button>'
    : '';
  const secondary = opts.secondary
    ? '<button class="dlg__btn dlg__btn--secondary"'
      + (opts.id ? ' onclick="closeDialog(\'' + opts.id + '\')"' : '')
      + '>' + opts.secondary + '</button>'
    : '';
  const primary = '<button class="dlg__btn dlg__btn--primary"'
    + (opts.id ? ' onclick="closeDialog(\'' + opts.id + '\')"' : '')
    + '>' + opts.primary + '</button>';

  return '<div class="dlg">'
    + '<div class="dlg__header">'
    + '<div class="dlg__title">' + opts.title + '</div>'
    + dismiss
    + '</div>'
    + body
    + '<div class="dlg__footer">'
    + '<div class="dlg__footer-left">' + tertiary + '</div>'
    + '<div class="dlg__footer-right">' + primary + secondary + '</div>'
    + '</div>'
    + '</div>';
}

// ─── Sections ───────────────────────────────────────────────

const body = [
  '<div class="wrap">',
  '<h1>Dialog — Component Preview</h1>',
  '<p class="hint">Click "Open Dialog" to see the modal overlay. Click buttons or dismiss to close.</p>',

  // ─── Modal demos ───
  '<h2>Interactive Modal Dialogs</h2>',
  '<div class="row">',
  '<button class="trigger" onclick="openDialog(\'dlg-default\')">Open Default Dialog</button>',
  '<button class="trigger" onclick="openDialog(\'dlg-tertiary\')">Open with Tertiary</button>',
  '<button class="trigger" onclick="openDialog(\'dlg-minimal\')">Open Minimal (No Body)</button>',
  '</div>',

  // Overlay: Default
  '<div class="overlay" id="dlg-default">',
  dialogHTML({
    id: 'dlg-default',
    title: 'Main question or action',
    body: 'Here is more about the consequences of the main action, if details are needed.',
    primary: 'Take action',
    secondary: 'Different action',
  }),
  '</div>',

  // Overlay: With Tertiary
  '<div class="overlay" id="dlg-tertiary">',
  dialogHTML({
    id: 'dlg-tertiary',
    title: 'Confirm deletion',
    body: 'This action cannot be undone. All associated data will be permanently removed.',
    primary: 'Delete',
    secondary: 'Cancel',
    tertiary: 'Learn more',
  }),
  '</div>',

  // Overlay: Minimal
  '<div class="overlay" id="dlg-minimal">',
  dialogHTML({
    id: 'dlg-minimal',
    title: 'Are you sure you want to proceed?',
    primary: 'Confirm',
    secondary: 'Cancel',
  }),
  '</div>',

  // ─── Inline static variants ───
  '<h2>Static Variants</h2>',

  '<div class="demo-card"><span class="demo-label">Default</span>',
  dialogHTML({
    title: 'Main question or action',
    body: 'Here is more about the consequences of the main action, if details are needed.',
    primary: 'Take action',
    secondary: 'Different action',
  }),
  '</div>',

  '<div class="demo-card" style="margin-top:16px"><span class="demo-label">With Tertiary Button</span>',
  dialogHTML({
    title: 'Confirm important action',
    body: 'This will affect your entire workspace. Please review before confirming.',
    primary: 'Confirm',
    secondary: 'Cancel',
    tertiary: 'Learn more',
  }),
  '</div>',

  '<div class="demo-card" style="margin-top:16px"><span class="demo-label">No Body</span>',
  dialogHTML({
    title: 'Discard unsaved changes?',
    primary: 'Discard',
    secondary: 'Keep editing',
  }),
  '</div>',

  '<div class="demo-card" style="margin-top:16px"><span class="demo-label">No Dismiss / No Secondary</span>',
  dialogHTML({
    title: 'Session expired',
    body: 'Your session has timed out. Please sign in again to continue.',
    dismiss: false,
    primary: 'Sign in',
  }),
  '</div>',

  '</div>',

  // ─── Script ───
  '<script>',
  '  function openDialog(id) {',
  '    document.getElementById(id).classList.add("open");',
  '  }',
  '  function closeDialog(id) {',
  '    document.getElementById(id).classList.remove("open");',
  '  }',
  '  // Close on overlay click (outside dialog)',
  '  document.querySelectorAll(".overlay").forEach(ov => {',
  '    ov.addEventListener("click", e => {',
  '      if (e.target === ov) ov.classList.remove("open");',
  '    });',
  '  });',
  '  // Close on Escape',
  '  document.addEventListener("keydown", e => {',
  '    if (e.key === "Escape") {',
  '      document.querySelectorAll(".overlay.open").forEach(ov => ov.classList.remove("open"));',
  '    }',
  '  });',
  '</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Dialog Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'dialog.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
