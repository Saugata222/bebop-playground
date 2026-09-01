/**
 * Header — Interactive HTML Preview
 *
 * Ported from the One Copilot Desktop UI Kit (Header page 3230:49558;
 * 4202:7003, variants 4202:33244). COMMERCIAL variant only (Consumer skipped).
 *
 * Left cluster:  Work IQ badge + Model picker ("Auto" + chevron).
 * Right cluster: Compliance shield (loud green) + Temporary chat.
 * Responsive: 1024+, 480-1023 (+ overflow), 320-479 (hamburger + compact).
 * Rendered in light and dark themes.
 *
 * Reuses the Button primitive (icon-only Medium Subtle; Subtle Medium picker).
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Icons (20px unless noted, currentColor) ────────────────

const chevronDown = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8537 7.64582C16.0493 7.84073 16.0499 8.15731 15.855 8.35292L10.39 13.8374C10.1751 14.0531 9.82574 14.0531 9.6108 13.8374L4.14582 8.35292C3.9509 8.15731 3.95147 7.84073 4.14708 7.64582C4.34269 7.4509 4.65927 7.45147 4.85418 7.64708L10.0004 12.8117L15.1466 7.64708C15.3415 7.45147 15.6581 7.4509 15.8537 7.64582Z" fill="currentColor"/></svg>';
const shieldTask = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8536 7.85355C14.0488 7.65829 14.0488 7.34171 13.8536 7.14645C13.6583 6.95118 13.3417 6.95118 13.1464 7.14645L9.5 10.7929L7.85355 9.14645C7.65829 8.95119 7.34171 8.95119 7.14645 9.14645C6.95118 9.34171 6.95118 9.65829 7.14645 9.85355L9.14645 11.8536C9.34171 12.0488 9.65829 12.0488 9.85355 11.8536L13.8536 7.85355ZM10.2774 2.08397C10.1094 1.97201 9.8906 1.97201 9.72265 2.08397C7.78446 3.3761 5.68833 4.18231 3.42929 4.50503C3.18296 4.54021 3 4.75118 3 5V9.5C3 13.3913 5.30699 16.2307 9.82051 17.9667C9.93605 18.0111 10.064 18.0111 10.1795 17.9667C14.693 16.2307 17 13.3913 17 9.5V5C17 4.75118 16.817 4.54021 16.5707 4.50503C14.3117 4.18231 12.2155 3.3761 10.2774 2.08397ZM4 5.42787C5.98541 5.09055 7.85275 4.39606 9.59914 3.34583L10 3.09715L10.4009 3.34583C12.1473 4.39606 14.0146 5.09055 16 5.42787V9.5C16 12.8921 14.0321 15.3634 10 16.9632C5.96795 15.3634 4 12.8921 4 9.5V5.42787Z" fill="currentColor"/></svg>';
const chatHintHalf = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.34743 5.55836C3.51577 5.30672 3.87062 5.28565 4.08473 5.49977C4.2614 5.67681 4.27921 5.95543 4.14235 6.16481C4.01249 6.36334 3.89243 6.56912 3.78298 6.78102C3.28305 7.74466 2.99982 8.83921 2.99978 9.99978C2.99978 11.2434 3.32513 12.4099 3.89333 13.4217C3.95578 13.5328 3.97395 13.6642 3.94313 13.7879L3.18727 16.8113L6.2107 16.0555L6.30445 16.0418C6.3986 16.0366 6.49355 16.0585 6.57691 16.1053C7.58902 16.674 8.75578 16.9997 9.99976 16.9998C11.4155 16.9998 12.7327 16.5779 13.8347 15.8562C14.044 15.7193 14.3227 15.7373 14.4997 15.9139C14.7139 16.128 14.6928 16.4828 14.4411 16.6512C13.1388 17.5221 11.5718 17.9998 9.99976 17.9998C8.65066 17.9997 7.37954 17.6633 6.26441 17.073L2.62087 17.9852C2.45067 18.0275 2.27033 17.9773 2.14626 17.8533C2.02237 17.7292 1.97198 17.5489 2.01443 17.3787L2.92458 13.7332C2.33515 12.6185 1.99978 11.3478 1.99978 9.99978C1.99983 8.42601 2.47709 6.86076 3.34743 5.55836ZM17.365 11.0008C17.6676 11.001 17.9033 11.2663 17.8445 11.5633C17.637 12.6109 17.2245 13.5842 16.6511 14.4412C16.4826 14.6928 16.1279 14.7139 15.9138 14.4998C15.7372 14.3228 15.7191 14.0439 15.8562 13.8348C16.3285 13.1148 16.6713 12.3022 16.8523 11.4304C16.9032 11.1852 17.1144 11.0008 17.365 11.0008ZM15.9148 5.49977C16.1289 5.28566 16.4836 5.30681 16.6521 5.55836C17.2253 6.41552 17.6372 7.38948 17.8445 8.43728C17.9032 8.73422 17.6676 9.00056 17.365 9.00076C17.1144 9.00076 16.9041 8.81542 16.8533 8.57009C16.6725 7.69802 16.3294 6.88506 15.8572 6.16481C15.7201 5.9556 15.7382 5.6768 15.9148 5.49977ZM8.43726 2.15504C8.73418 2.09633 9.0005 2.33192 9.00073 2.63453C9.00073 2.88508 8.8154 3.09633 8.57007 3.14723C7.69819 3.32813 6.88588 3.67102 6.16578 4.14332C5.95611 4.28083 5.6761 4.26203 5.49879 4.08473C5.2845 3.87025 5.30629 3.51498 5.55836 3.34645C6.41551 2.77342 7.38953 2.36222 8.43726 2.15504ZM11.5632 2.15504C12.6109 2.36255 13.5843 2.7751 14.4412 3.34845C14.6928 3.51694 14.7139 3.87163 14.4998 4.08574C14.3228 4.26281 14.0439 4.2809 13.8348 4.14383C13.1148 3.67153 12.3022 3.32866 11.4304 3.14766C11.1852 3.09676 11.0008 2.88554 11.0008 2.63496C11.001 2.33235 11.2663 2.09675 11.5632 2.15504Z" fill="currentColor"/></svg>';
const share = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.49994 2.99983C9.77601 2.99983 9.99982 3.22379 9.99994 3.49983C9.99991 3.77595 9.77606 3.99983 9.49994 3.99983H5.99994C4.89544 3.99983 4.00006 4.89537 3.99994 5.99983V13.9998C3.99997 15.1044 4.89539 15.9998 5.99994 15.9998H13.9999C15.1045 15.9998 15.9999 15.1044 15.9999 13.9998V12.4998C16.0001 12.2238 16.2239 11.9998 16.4999 11.9998C16.776 11.9998 16.9998 12.2238 16.9999 12.4998V13.9998C16.9999 15.6567 15.6568 16.9998 13.9999 16.9998H5.99994C4.34311 16.9998 2.99997 15.6567 2.99994 13.9998V5.99983C3.00006 4.34308 4.34316 2.99983 5.99994 2.99983H9.49994ZM13.2968 2.0428C13.477 1.96273 13.6883 1.99586 13.8349 2.12776L18.8349 6.62776C18.9401 6.72253 18.9999 6.85821 18.9999 6.99983C18.9999 7.14148 18.9401 7.2771 18.8349 7.3719L13.8349 11.8719C13.6882 12.0039 13.4771 12.037 13.2968 11.9569C13.1165 11.8765 13 11.6972 12.9999 11.4998V9.33968C11.5991 9.46788 10.3347 10.1192 9.29974 10.9481C8.28548 11.7605 7.52478 12.716 7.10541 13.4324L6.9472 13.7235C6.84349 13.9308 6.61037 14.0394 6.3847 13.9862C6.15928 13.9327 5.99997 13.7315 5.99994 13.4998C5.99997 11.4515 6.38151 9.21555 7.51849 7.47639C8.60923 5.8083 10.3673 4.64297 12.9999 4.51253V2.49983L13.0048 2.42659C13.0296 2.25912 13.1391 2.11304 13.2968 2.0428Z" fill="currentColor"/></svg>';
const moreHorizontal = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 10C6.25 10.6904 5.69036 11.25 5 11.25C4.30964 11.25 3.75 10.6904 3.75 10C3.75 9.30964 4.30964 8.75 5 8.75C5.69036 8.75 6.25 9.30964 6.25 10ZM11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10ZM15 11.25C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25Z" fill="currentColor"/></svg>';
const add = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5C10.2761 2.5 10.5 2.72386 10.5 3V9.5H17C17.2761 9.5 17.5 9.72386 17.5 10C17.5 10.2761 17.2761 10.5 17 10.5H10.5V17C10.5 17.2761 10.2761 17.5 10 17.5C9.72386 17.5 9.5 17.2761 9.5 17V10.5H3C2.72386 10.5 2.5 10.2761 2.5 10C2.5 9.72386 2.72386 9.5 3 9.5H9.5V3C9.5 2.72386 9.72386 2.5 10 2.5Z" fill="currentColor"/></svg>';
const hamburger = '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.75 5.5C2.75 5.22386 2.97386 5 3.25 5H16.75C17.0261 5 17.25 5.22386 17.25 5.5C17.25 5.77614 17.0261 6 16.75 6H3.25C2.97386 6 2.75 5.77614 2.75 5.5ZM2.75 10C2.75 9.72386 2.97386 9.5 3.25 9.5H16.75C17.0261 9.5 17.25 9.72386 17.25 10C17.25 10.2761 17.0261 10.5 16.75 10.5H3.25C2.97386 10.5 2.75 10.2761 2.75 10ZM3.25 14C2.97386 14 2.75 14.2239 2.75 14.5C2.75 14.7761 2.97386 15 3.25 15H16.75C17.0261 15 17.25 14.7761 17.25 14.5C17.25 14.2239 17.0261 14 16.75 14H3.25Z" fill="currentColor"/></svg>';

// ─── Builders ───────────────────────────────────────────────

function iconBtn(icon: string, label: string, extraCls?: string): string {
  return '<button class="hd__btn' + (extraCls ? ' ' + extraCls : '') + '" aria-label="' + label + '"><span class="hd__ico">' + icon + '</span></button>';
}
function badge(): string {
  return '<span class="hd__badge">Work IQ</span>';
}
function picker(): string {
  return '<button class="hd__picker"><span class="hd__picker-label">Auto</span><span class="hd__picker-chev">' + chevronDown + '</span></button>';
}

function headerBar(theme: string, bp: string): string {
  let left = '';
  let right = '';
  if (bp === 'lg') {
    left = badge() + picker();
    right = iconBtn(shieldTask, 'Compliance', 'hd__btn--shield') + iconBtn(chatHintHalf, 'Temporary chat');
  } else if (bp === 'md') {
    left = badge() + picker();
    right = iconBtn(shieldTask, 'Compliance', 'hd__btn--shield') + iconBtn(share, 'Share') + iconBtn(moreHorizontal, 'More');
  } else {
    left = iconBtn(hamburger, 'Menu');
    right = iconBtn(shieldTask, 'Compliance', 'hd__btn--shield') + iconBtn(add, 'New') + iconBtn(moreHorizontal, 'More');
  }
  return [
    '<div class="hd hd--' + theme + '">',
    '<div class="hd__left">' + left + '</div>',
    '<div class="hd__right">' + right + '</div>',
    '</div>',
  ].join('\n');
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 10px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 24px; }
.wrap { max-width: 1000px; margin: 0 auto; }
.rl { font-size: 10px; font-weight: 600; color: #9a9a9a; text-transform: uppercase; letter-spacing: 0.8px; margin: 14px 0 6px; }

/* ─── Header bar ─── */
.hd { display: flex; align-items: center; justify-content: space-between; gap: 8px; height: 56px; padding: 0 16px; border-radius: 12px; overflow: hidden; }
.hd + .hd { margin-top: 4px; }
.hd__left { display: flex; align-items: center; gap: 8px; min-width: 0; }
.hd__right { display: flex; align-items: center; gap: 4px; }

/* Work IQ badge */
.hd__badge { display: inline-flex; align-items: center; height: 24px; padding: 0 8px; border-radius: 12px; background: #f0f0f0; color: #242424; font-size: 12px; line-height: 16px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; white-space: nowrap; }

/* Model picker — Button: Subtle, Medium, text + chevron */
.hd__picker { display: inline-flex; align-items: center; gap: 4px; height: 32px; padding: 6px 8px 6px 10px; border: none; border-radius: 12px; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s; }
.hd__picker:hover { background: rgba(36,36,36,0.04); }
.hd__picker-label { font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }
.hd__picker-chev { display: inline-flex; width: 16px; height: 16px; }
.hd__picker-chev svg { display: block; width: 16px; height: 16px; }

/* Icon buttons — Button: icon-only Medium, Subtle, circular */
.hd__btn { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s; outline: none; }
.hd__btn:hover { background: rgba(36,36,36,0.04); }
.hd__btn:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }
.hd__ico { display: inline-flex; width: 20px; height: 20px; }
.hd__ico svg { display: block; width: 20px; height: 20px; }
/* Compliance shield — loud success green */
.hd__btn--shield { color: #008455; }

/* ─── Light / dark surfaces ─── */
.hd--light { background: #fcfcfc; }
.hd--dark { background: #242424; }
.hd--dark .hd__badge { background: rgba(255,255,255,0.10); color: #ffffff; }
.hd--dark .hd__picker { color: #ffffff; }
.hd--dark .hd__picker:hover { background: rgba(255,255,255,0.08); }
.hd--dark .hd__btn { color: #ffffff; }
.hd--dark .hd__btn:hover { background: rgba(255,255,255,0.08); }
.hd--dark .hd__btn--shield { color: #3ec27f; }

.flag { margin-top: 10px; font-size: 12px; color: #a93901; }
`;

// ─── Body ───────────────────────────────────────────────────

function bpBlock(theme: string): string {
  return [
    '<div class="rl">1024+</div>', headerBar(theme, 'lg'),
    '<div class="rl">480 \u2013 1023</div>', headerBar(theme, 'md'),
    '<div class="rl">320 \u2013 479</div>', headerBar(theme, 'sm'),
  ].join('\n');
}

const body = [
  stage(bpBlock('light')),
  '<h2>Commercial \u2014 Light</h2>',
  bpBlock('light'),
  '<h2>Commercial \u2014 Dark</h2>',
  bpBlock('dark'),
  '<p class="flag">Consumer variant intentionally skipped. The Work IQ chip maps to the Badge component (not yet ported) \u2014 rendered inline.</p>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Header Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Header \u2014 Component Preview</h1>'
  + '<p class="hint">One Copilot Commercial header: Work IQ + model picker (left), compliance shield + temporary chat (right). Shown across three responsive breakpoints in light and dark.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'header.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
