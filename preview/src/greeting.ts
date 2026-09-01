/**
 * Greeting & Zero State — HTML Preview
 *
 * Ported from the One Copilot Desktop UI Kit (Greeting & zero state page
 * 1763:43777; Greeting 4020:1834, Zero state 3992:132662).
 *
 * Greeting = Content Expressive Small serif headline (28/34). Zero state
 * composes the Greeting with the Composer (Prompt Box, initial pill) and a
 * row of prompt suggestion chips. Rendered in light and dark themes.
 *
 * Reuses the Composer pill markup/styling and the promptSuggestions chip.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Glyphs (20px, currentColor) ────────────────────────────

const I = {
  add: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5C10.2761 2.5 10.5 2.72386 10.5 3V9.5H17C17.2761 9.5 17.5 9.72386 17.5 10C17.5 10.2761 17.2761 10.5 17 10.5H10.5V17C10.5 17.2761 10.2761 17.5 10 17.5C9.72386 17.5 9.5 17.2761 9.5 17V10.5H3C2.72386 10.5 2.5 10.2761 2.5 10C2.5 9.72386 2.72386 9.5 3 9.5H9.5V3C9.5 2.72386 9.72386 2.5 10 2.5Z" fill="currentColor"/></svg>',
  mic: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13C11.6569 13 13 11.6568 13 9.99998V5C13 3.34315 11.6569 2 10 2C8.34315 2 7 3.34315 7 5V9.99998C7 11.6568 8.34315 13 10 13ZM10 12C8.89543 12 8 11.1046 8 9.99998V5C8 3.89543 8.89543 3 10 3C11.1046 3 12 3.89543 12 5V9.99998C12 11.1046 11.1046 12 10 12ZM5 9.49998C5.27614 9.49998 5.5 9.72384 5.5 9.99998C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 9.99998C14.5 9.72384 14.7239 9.49998 15 9.49998C15.2761 9.49998 15.5 9.72384 15.5 9.99998C15.5 12.869 13.3033 15.2249 10.5 15.4776V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V15.4776C6.69675 15.2249 4.5 12.869 4.5 9.99998C4.5 9.72384 4.72386 9.49998 5 9.49998Z" fill="currentColor"/></svg>',
  eq: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C10.2761 2 10.5 2.22386 10.5 2.5V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V2.5C9.5 2.22386 9.72386 2 10 2ZM13.5 5C13.7761 5 14 5.22386 14 5.5V14.5C14 14.7761 13.7761 15 13.5 15C13.2239 15 13 14.7761 13 14.5V5.5C13 5.22386 13.2239 5 13.5 5ZM7 5.5C7 5.22386 6.77614 5 6.5 5C6.22386 5 6 5.22386 6 5.5V14.5C6 14.7761 6.22386 15 6.5 15C6.77614 15 7 14.7761 7 14.5V5.5ZM16.5 8C16.7761 8 17 8.22386 17 8.5V11.5C17 11.7761 16.7761 12 16.5 12C16.2239 12 16 11.7761 16 11.5V8.5C16 8.22386 16.2239 8 16.5 8ZM4 8.5C4 8.22386 3.77614 8 3.5 8C3.22386 8 3 8.22386 3 8.5V11.5C3 11.7761 3.22386 12 3.5 12C3.77614 12 4 11.7761 4 11.5V8.5Z" fill="currentColor"/></svg>',
  more: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 10C6.25 10.6904 5.69036 11.25 5 11.25C4.30964 11.25 3.75 10.6904 3.75 10C3.75 9.30964 4.30964 8.75 5 8.75C5.69036 8.75 6.25 9.30964 6.25 10ZM11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10ZM15 11.25C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25Z" fill="currentColor"/></svg>',
};

// ─── Builders ───────────────────────────────────────────────

function greeting(): string {
  return '<div class="zs__greeting">Hi Elvia, how can I help?</div>';
}

function composerPill(): string {
  return [
    '<div class="cmp">',
    '<div class="cmp__row">',
    '<button class="cmp__btn" aria-label="Add"><span class="cmp__ico">' + I.add + '</span></button>',
    '<span class="cmp__ta">Message Copilot</span>',
    '<button class="cmp__btn" aria-label="Dictate"><span class="cmp__ico">' + I.mic + '</span></button>',
    '<button class="cmp__btn" aria-label="Voice"><span class="cmp__ico">' + I.eq + '</span></button>',
    '</div>',
    '</div>',
  ].join('');
}

function suggestions(): string {
  const labels = ['Get to know Copilot', 'Prepare for what\u2019s ahead', 'Build it today'];
  const chips = labels.map(function (l) { return '<button class="zs__chip">' + l + '</button>'; }).join('');
  return '<div class="zs__chips">' + chips + '<button class="zs__overflow" aria-label="More">' + I.more + '</button></div>';
}

function zeroState(theme: string): string {
  return [
    '<div class="zs zs--' + theme + '">',
    greeting(),
    composerPill(),
    suggestions(),
    '</div>',
  ].join('\n');
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 36px 0 12px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 24px; }
.wrap { max-width: 900px; margin: 0 auto; }

/* ─── Greeting (Content Expressive Small serif, 28/34) ─── */
.zs__greeting {
  font-family: 'Segoe Serif', Georgia, 'Times New Roman', serif;
  font-size: 28px; line-height: 34px; font-weight: 400; letter-spacing: 0;
  text-align: center; color: #242424;
}

/* ─── Zero-state surface ─── */
.zs { display: flex; flex-direction: column; align-items: center; padding: 64px 48px; border-radius: 16px; }
.zs--light { background: #fcfcfc; }
.zs--dark { background: #242424; }
.zs > .cmp { margin-top: 24px; }
.zs > .zs__chips { margin-top: 16px; }

/* ─── Composer pill (initial, from Composer compound) ─── */
.cmp { width: 100%; max-width: 744px; background: #fff; border: 1px solid #dedede; border-radius: 28px; padding: 16px; }
.cmp__row { display: flex; align-items: center; gap: 4px; }
.cmp__ta { flex: 1 1 auto; min-width: 0; font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 16px; font-weight: 400; line-height: 28px; color: #6f6f6f; padding: 0 8px; }
.cmp__btn { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border-radius: 9999px; border: none; cursor: pointer; background: transparent; color: #242424; transition: background 0.1s ease; outline: none; flex-shrink: 0; }
.cmp__btn:hover { background: rgba(36,36,36,0.04); }
.cmp__ico { display: inline-flex; width: 20px; height: 20px; }
.cmp__ico svg { display: block; width: 20px; height: 20px; }

/* ─── Suggestion chips (from promptSuggestions) ─── */
.zs__chips { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center; }
.zs__chip {
  display: inline-flex; align-items: center; justify-content: center;
  background: transparent; border: 1px solid rgba(189,189,189,0.5); border-radius: 12px; padding: 10px; cursor: pointer;
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 14px; font-weight: 420; line-height: 20px; color: #5d5d5d;
  white-space: nowrap; transition: background 0.1s, border-color 0.1s;
}
.zs__chip:hover { background: rgba(24,24,24,0.04); }
.zs__overflow { display: inline-flex; align-items: center; justify-content: center; padding: 8px 6px; border-radius: 9999px; border: none; background: transparent; color: #6f6f6f; cursor: pointer; transition: background 0.1s; }
.zs__overflow:hover { background: rgba(24,24,24,0.04); }
.zs__overflow svg { width: 20px; height: 20px; display: block; }

/* ─── Dark theme overrides ─── */
.zs--dark .zs__greeting { color: #ffffff; }
.zs--dark .cmp { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.14); }
.zs--dark .cmp__ta { color: #a0a0a0; }
.zs--dark .cmp__btn { color: #ffffff; }
.zs--dark .cmp__btn:hover { background: rgba(255,255,255,0.08); }
.zs--dark .zs__chip { border-color: rgba(255,255,255,0.22); color: #dedede; }
.zs--dark .zs__chip:hover { background: rgba(255,255,255,0.06); }
.zs--dark .zs__overflow { color: #a0a0a0; }
.zs--dark .zs__overflow:hover { background: rgba(255,255,255,0.06); }

/* Standalone greeting cells */
.g-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; border-radius: 16px; overflow: hidden; }
.g-cell { padding: 56px 40px; display: flex; align-items: center; justify-content: center; }
.g-cell--light { background: #fcfcfc; }
.g-cell--dark { background: #242424; }
.g-cell--dark .zs__greeting { color: #ffffff; }
`;

// ─── Body ───────────────────────────────────────────────────

const body = [
  stage(greeting()),
  '<h2>Greeting \u2014 light / dark</h2>',
  '<div class="g-grid">',
  '<div class="g-cell g-cell--light">' + greeting() + '</div>',
  '<div class="g-cell g-cell--dark">' + greeting() + '</div>',
  '</div>',

  '<h2>Zero state \u2014 light</h2>',
  zeroState('light'),

  '<h2>Zero state \u2014 dark</h2>',
  zeroState('dark'),
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Greeting & Zero State Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Greeting &amp; Zero State \u2014 Component Preview</h1>'
  + '<p class="hint">Serif Greeting (Content Expressive Small, 28/34) with the Composer prompt box and suggestion chips. Light and dark themes.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'greeting.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
