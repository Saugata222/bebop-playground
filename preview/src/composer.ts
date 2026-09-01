/**
 * Composer (Prompt Box) — Interactive HTML Preview
 *
 * Ported from the One Copilot Desktop UI Kit (Composer page 0:1,
 * documentation template node 4020:1758).
 *
 * States: Initial (pill), Multiple lines, With attachments,
 * Capability enabled — Control off, Capability enabled — Control on.
 *
 * Reused One Copilot primitives: Button (icon-only Medium, Subtle + circular
 * brand Send), Tag (dismissible capability chip), Tab/TabList (bottom strip).
 * Result cards + attachment file cards render inline pending the Card primitive.
 *
 * Font (exact): textarea = Content Paragraph Medium (Segoe Sans 16/28);
 * capability tag / options = Functional Body Small (12/16); tabs = Body Medium.
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

// ─── Glyphs (Fluent UI System Icons, 20px unless noted, currentColor) ───

const I = {
  add: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5C10.2761 2.5 10.5 2.72386 10.5 3V9.5H17C17.2761 9.5 17.5 9.72386 17.5 10C17.5 10.2761 17.2761 10.5 17 10.5H10.5V17C10.5 17.2761 10.2761 17.5 10 17.5C9.72386 17.5 9.5 17.2761 9.5 17V10.5H3C2.72386 10.5 2.5 10.2761 2.5 10C2.5 9.72386 2.72386 9.5 3 9.5H9.5V3C9.5 2.72386 9.72386 2.5 10 2.5Z" fill="currentColor"/></svg>',
  mic: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13C11.6569 13 13 11.6568 13 9.99998V5C13 3.34315 11.6569 2 10 2C8.34315 2 7 3.34315 7 5V9.99998C7 11.6568 8.34315 13 10 13ZM10 12C8.89543 12 8 11.1046 8 9.99998V5C8 3.89543 8.89543 3 10 3C11.1046 3 12 3.89543 12 5V9.99998C12 11.1046 11.1046 12 10 12ZM5 9.49998C5.27614 9.49998 5.5 9.72384 5.5 9.99998C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 9.99998C14.5 9.72384 14.7239 9.49998 15 9.49998C15.2761 9.49998 15.5 9.72384 15.5 9.99998C15.5 12.869 13.3033 15.2249 10.5 15.4776V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V15.4776C6.69675 15.2249 4.5 12.869 4.5 9.99998C4.5 9.72384 4.72386 9.49998 5 9.49998Z" fill="currentColor"/></svg>',
  eq: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C10.2761 2 10.5 2.22386 10.5 2.5V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V2.5C9.5 2.22386 9.72386 2 10 2ZM13.5 5C13.7761 5 14 5.22386 14 5.5V14.5C14 14.7761 13.7761 15 13.5 15C13.2239 15 13 14.7761 13 14.5V5.5C13 5.22386 13.2239 5 13.5 5ZM7 5.5C7 5.22386 6.77614 5 6.5 5C6.22386 5 6 5.22386 6 5.5V14.5C6 14.7761 6.22386 15 6.5 15C6.77614 15 7 14.7761 7 14.5V5.5ZM16.5 8C16.7761 8 17 8.22386 17 8.5V11.5C17 11.7761 16.7761 12 16.5 12C16.2239 12 16 11.7761 16 11.5V8.5C16 8.22386 16.2239 8 16.5 8ZM4 8.5C4 8.22386 3.77614 8 3.5 8C3.22386 8 3 8.22386 3 8.5V11.5C3 11.7761 3.22386 12 3.5 12C3.77614 12 4 11.7761 4 11.5V8.5Z" fill="currentColor"/></svg>',
  arrowUp: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13269 9.16094C2.94651 9.36488 2.96091 9.68113 3.16485 9.86731C3.36879 10.0535 3.68504 10.0391 3.87122 9.83515L9.50195 3.6673L9.50195 17.498C9.50195 17.7742 9.72581 17.998 10.002 17.998C10.2781 17.998 10.502 17.7742 10.502 17.498L10.502 3.67019L16.13 9.83515C16.3162 10.0391 16.6325 10.0535 16.8364 9.86731C17.0404 9.68113 17.0548 9.36488 16.8686 9.16094L10.5545 2.24458C10.4268 2.10464 10.2592 2.02481 10.0861 2.0051C10.0587 2.00046 10.0306 1.99805 10.002 1.99805C9.97508 1.99805 9.9487 2.00017 9.92298 2.00425C9.74708 2.02242 9.57641 2.10253 9.44673 2.24458L3.13269 9.16094Z" fill="currentColor"/></svg>',
  options: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.95 5C14.7184 3.85888 13.7095 3 12.5 3C11.2905 3 10.2816 3.85888 10.05 5H2.5C2.22386 5 2 5.22386 2 5.5C2 5.77614 2.22386 6 2.5 6H10.05C10.2816 7.14112 11.2905 8 12.5 8C13.7297 8 14.752 7.11217 14.961 5.94254C14.9575 5.96177 14.9539 5.98093 14.95 6H17.5C17.7761 6 18 5.77614 18 5.5C18 5.22386 17.7761 5 17.5 5H14.95ZM12.5 7C11.6716 7 11 6.32843 11 5.5C11 4.67157 11.6716 4 12.5 4C13.3284 4 14 4.67157 14 5.5C14 6.32843 13.3284 7 12.5 7ZM9.94999 14C9.71836 12.8589 8.70948 12 7.5 12C6.29052 12 5.28164 12.8589 5.05001 14H2.5C2.22386 14 2 14.2239 2 14.5C2 14.7761 2.22386 15 2.5 15H5.05001C5.28164 16.1411 6.29052 17 7.5 17C8.70948 17 9.71836 16.1411 9.94999 15H17.5C17.7761 15 18 14.7761 18 14.5C18 14.2239 17.7761 14 17.5 14H9.94999ZM7.5 16C6.67157 16 6 15.3284 6 14.5C6 13.6716 6.67157 13 7.5 13C8.32843 13 9 13.6716 9 14.5C9 15.3284 8.32843 16 7.5 16Z" fill="currentColor"/></svg>',
  chevron: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.64582 4.14708C7.84073 3.95147 8.15731 3.9509 8.35292 4.14582L13.8374 9.6108C14.0531 9.82574 14.0531 10.1751 13.8374 10.39L8.35292 15.855C8.15731 16.0499 7.84073 16.0493 7.64582 15.8537C7.4509 15.6581 7.45147 15.3415 7.64708 15.1466L12.8117 10.0004L7.64708 4.85418C7.45147 4.65927 7.4509 4.34269 7.64582 4.14708Z" fill="currentColor"/></svg>',
  dismiss12: '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.58859 2.71569L2.64645 2.64645C2.82001 2.47288 3.08944 2.4536 3.28431 2.58859L3.35355 2.64645L8 7.293L12.6464 2.64645C12.8417 2.45118 13.1583 2.45118 13.3536 2.64645C13.5488 2.84171 13.5488 3.15829 13.3536 3.35355L8.707 8L13.3536 12.6464C13.5271 12.82 13.5464 13.0894 13.4114 13.2843L13.3536 13.3536C13.18 13.5271 12.9106 13.5464 12.7157 13.4114L12.6464 13.3536L8 8.707L3.35355 13.3536C3.15829 13.5488 2.84171 13.5488 2.64645 13.3536C2.45118 13.1583 2.45118 12.8417 2.64645 12.6464L7.293 8L2.64645 3.35355C2.47288 3.17999 2.4536 2.91056 2.58859 2.71569L2.64645 2.64645L2.58859 2.71569Z" fill="currentColor"/></svg>',
  document: '<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2C4.89543 2 4 2.89543 4 4V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V7.41421C16 7.01639 15.842 6.63486 15.5607 6.35355L11.6464 2.43934C11.3651 2.15804 10.9836 2 10.5858 2H6ZM5 4C5 3.44772 5.44772 3 6 3H10V6.5C10 7.32843 10.6716 8 11.5 8H15V16C15 16.5523 14.5523 17 14 17H6C5.44772 17 5 16.5523 5 16V4ZM14.7929 7H11.5C11.2239 7 11 6.77614 11 6.5V3.20711L14.7929 7Z" fill="currentColor"/></svg>',
};

// ─── Composer builders ──────────────────────────────────────

function addBtn(): string {
  return '<button class="cmp__btn" aria-label="Add"><span class="cmp__ico">' + I.add + '</span></button>';
}
function micBtn(): string {
  return '<button class="cmp__btn" aria-label="Dictate"><span class="cmp__ico">' + I.mic + '</span></button>';
}
function sendBtn(): string {
  return '<button class="cmp__send" aria-label="Send"><span class="cmp__ico cmp__send-eq">' + I.eq + '</span><span class="cmp__ico cmp__send-arrow">' + I.arrowUp + '</span></button>';
}
function textarea(placeholder: string, value: string): string {
  const v = value ? (' value="' + value + '"') : '';
  return '<textarea class="cmp__ta" rows="1" placeholder="' + placeholder + '"' + v + '>' + value + '</textarea>';
}

/** Capability chip — Tag primitive (dark, dismissible) */
function capabilityTag(label: string): string {
  return '<button class="cmp__tag" aria-label="Remove ' + label + '"><span class="cmp__tag-label">' + label + '</span><span class="cmp__tag-x">' + I.dismiss12 + '</span></button>';
}

/** Options — Button primitive: Subtle, Small, icon + text */
function optionsBtn(): string {
  return '<button class="cmp__opt"><span class="cmp__opt-ico">' + I.options + '</span><span class="cmp__opt-label">Options</span></button>';
}

/** Attachment file card (inline — Card primitive not yet ported) */
function fileCard(name: string, kind: string): string {
  return [
    '<div class="cmp__file">',
    '<span class="cmp__file-ico">' + I.document + '</span>',
    '<span class="cmp__file-text"><span class="cmp__file-name">' + name + '</span><span class="cmp__file-kind">' + kind + '</span></span>',
    '<button class="cmp__file-x" aria-label="Remove ' + name + '">' + I.dismiss12 + '</button>',
    '</div>',
  ].join('');
}
function thumb(): string { return '<div class="cmp__thumb"></div>'; }

/** Bottom-list result card (inline — Card primitive not yet ported) */
function resultCard(title: string): string {
  return '<div class="cmp__card"><div class="cmp__card-media"></div><div class="cmp__card-title">' + title + '</div></div>';
}

// ─── State compositions ─────────────────────────────────────

function initial(): string {
  return [
    '<div class="cmp cmp--pill" id="cmpLive">',
    '<div class="cmp__row cmp__row--input">',
    addBtn(),
    textarea('Message Copilot', ''),
    micBtn(),
    sendBtn(),
    '</div>',
    '</div>',
  ].join('\n');
}

function multiline(): string {
  const text = 'Draft a project kickoff note for the design systems team, summarize the goals for this quarter, and suggest three milestones we can review together.';
  return [
    '<div class="cmp cmp--box ci--has-text">',
    '<div class="cmp__textblock">' + text + '</div>',
    '<div class="cmp__row cmp__row--bottom">',
    '<div class="cmp__start">' + addBtn() + '</div>',
    '<div class="cmp__end">' + micBtn() + sendBtn() + '</div>',
    '</div>',
    '</div>',
  ].join('\n');
}

function withAttachments(): string {
  return [
    '<div class="cmp cmp--box">',
    '<div class="cmp__attach">' + thumb() + thumb() + fileCard('Document Name', 'Microsoft Word') + '</div>',
    '<div class="cmp__textblock cmp__textblock--ph">Message Copilot</div>',
    '<div class="cmp__row cmp__row--bottom">',
    '<div class="cmp__start">' + addBtn() + '</div>',
    '<div class="cmp__end">' + micBtn() + sendBtn() + '</div>',
    '</div>',
    '</div>',
  ].join('\n');
}

function capabilityOff(): string {
  return [
    '<div class="cmp cmp--box">',
    '<div class="cmp__textblock cmp__textblock--ph">Message Copilot</div>',
    '<div class="cmp__row cmp__row--bottom">',
    '<div class="cmp__start">' + addBtn() + capabilityTag('Capability') + optionsBtn() + '</div>',
    '<div class="cmp__end">' + micBtn() + sendBtn() + '</div>',
    '</div>',
    '</div>',
  ].join('\n');
}

function capabilityOn(): string {
  const tabs = ['Overview', 'Details', 'Sources'];
  const tabStrip = '<div class="cmp__tabs">'
    + '<button class="cmp__paddle cmp__paddle--l" aria-label="Previous">' + I.chevron + '</button>'
    + tabs.map(function (t, i) { return '<button class="cmp__tab' + (i === 0 ? ' is-selected' : '') + '">' + t + '</button>'; }).join('')
    + '<button class="cmp__paddle" aria-label="Next">' + I.chevron + '</button>'
    + '</div>';
  const cards = '<div class="cmp__cards">' + resultCard('Report') + resultCard('Report') + resultCard('Summary') + '</div>';
  return [
    '<div class="cmp cmp--box">',
    '<div class="cmp__textblock cmp__textblock--ph">Message Copilot</div>',
    '<div class="cmp__row cmp__row--bottom">',
    '<div class="cmp__start">' + addBtn() + capabilityTag('Capability') + optionsBtn() + '</div>',
    '<div class="cmp__end">' + micBtn() + sendBtn() + '</div>',
    '</div>',
    '<div class="cmp__bottom">' + tabStrip + cards + '</div>',
    '</div>',
  ].join('\n');
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 36px 0 12px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 24px; }
.wrap { max-width: 760px; margin: 0 auto; }

/* ─── Container ─── */
.cmp { width: 100%; background: #fff; border: 1px solid #dedede; padding: 16px; transition: border-color 0.15s ease; }
.cmp--pill { border-radius: 28px; }
.cmp--box { border-radius: 16px; }
.cmp:focus-within { border-color: #242424; }

.cmp__row { display: flex; align-items: center; gap: 4px; }
.cmp__row--bottom { margin-top: 12px; }
.cmp__start { display: flex; align-items: center; gap: 8px; flex: 1 1 auto; min-width: 0; }
.cmp__end { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }

/* Initial composer row: single-line inline → multi-line stacked (grid areas, no DOM move) */
.cmp__row--input { display: grid; align-items: center; gap: 4px 8px; grid-template-columns: auto minmax(0,1fr) auto auto; grid-template-areas: "add ta mic send"; }
.cmp__row--input > *:nth-child(1) { grid-area: add; }
.cmp__row--input > *:nth-child(2) { grid-area: ta; }
.cmp__row--input > *:nth-child(3) { grid-area: mic; }
.cmp__row--input > *:nth-child(4) { grid-area: send; }
.cmp--multiline .cmp__row--input { grid-template-areas: "ta ta ta ta" "add . mic send"; align-items: end; row-gap: 10px; }
.cmp--multiline.cmp--pill { border-radius: 16px; }

/* ─── Textarea (Content Paragraph Medium 16/28) ─── */
.cmp__ta {
  flex: 1 1 auto; min-width: 0; border: none; outline: none; resize: none; background: transparent; overflow: hidden;
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 16px; font-weight: 400; line-height: 28px;
  color: #1f1f1f; padding: 0 8px; margin: 0; caret-color: #242424; display: block;
}
.cmp__ta::placeholder { color: #6f6f6f; }
.cmp__textblock { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 16px; font-weight: 400; line-height: 28px; color: #1f1f1f; padding: 0 8px; }
.cmp__textblock--ph { color: #6f6f6f; }

/* ─── Icon buttons (Button: icon-only Medium, Subtle) ─── */
.cmp__btn { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border-radius: 9999px; border: none; cursor: pointer; background: transparent; color: #242424; transition: background 0.1s ease; outline: none; flex-shrink: 0; }
.cmp__btn:hover { background: rgba(36,36,36,0.04); }
.cmp__btn:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }
.cmp__ico { display: inline-flex; width: 20px; height: 20px; }
.cmp__ico svg { display: block; width: 20px; height: 20px; }

/* Send — waveform at rest, dark filled arrow when text present */
.cmp__send { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border-radius: 9999px; border: none; cursor: pointer; background: transparent; color: #242424; transition: background 0.1s ease, color 0.15s ease; outline: none; flex-shrink: 0; }
.cmp__send:hover { background: rgba(36,36,36,0.04); }
.cmp__send-arrow { display: none; }
.cmp.ci--has-text .cmp__send-eq { display: none; }
.cmp.ci--has-text .cmp__send-arrow { display: inline-flex; }
.cmp.ci--has-text .cmp__send { background: #242424; color: #fff; }
.cmp.ci--has-text .cmp__send:hover { background: #3b3b3b; }

/* ─── Capability tag (Tag primitive: dark, dismissible) ─── */
.cmp__tag { display: inline-flex; align-items: center; gap: 4px; height: 24px; padding: 4px 8px; border: none; border-radius: 8px; background: #242424; color: #fff; cursor: pointer; transition: background 0.1s; flex-shrink: 0; }
.cmp__tag:hover { background: #313131; }
.cmp__tag-label { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 12px; line-height: 16px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; white-space: nowrap; }
.cmp__tag-x { display: inline-flex; width: 12px; height: 12px; }
.cmp__tag-x svg { display: block; width: 12px; height: 12px; }

/* ─── Options (Button: Subtle, Small, icon+text) ─── */
.cmp__opt { display: inline-flex; align-items: center; gap: 4px; height: 24px; padding: 4px 8px; border: 1px solid transparent; border-radius: 8px; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s; flex-shrink: 0; }
.cmp__opt:hover { background: rgba(36,36,36,0.04); }
.cmp__opt-ico { display: inline-flex; width: 16px; height: 16px; }
.cmp__opt-ico svg { display: block; width: 16px; height: 16px; }
.cmp__opt-label { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 12px; line-height: 16px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }

/* ─── Attachments ─── */
.cmp__attach { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
.cmp__thumb { width: 40px; height: 40px; border-radius: 8px; background: linear-gradient(135deg, #dbe4f0, #c7d3e6); border: 1px solid #dedede; flex-shrink: 0; }
.cmp__file { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 8px; border: 1px solid #dedede; border-radius: 8px; background: #fff; }
.cmp__file-ico { display: inline-flex; width: 20px; height: 20px; color: #4b5c9b; }
.cmp__file-ico svg { display: block; width: 20px; height: 20px; }
.cmp__file-text { display: flex; flex-direction: column; line-height: 1; }
.cmp__file-name { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 12px; line-height: 16px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; color: #242424; }
.cmp__file-kind { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 12px; line-height: 16px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; color: #6f6f6f; }
.cmp__file-x { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; padding: 0; border: none; background: transparent; color: #6f6f6f; cursor: pointer; border-radius: 9999px; }
.cmp__file-x svg { width: 12px; height: 12px; display: block; }
.cmp__file-x:hover { background: rgba(36,36,36,0.06); }

/* ─── Bottom list: tab strip (Tab/TabList) + result cards ─── */
.cmp__bottom { margin-top: 12px; }
.cmp__tabs { display: flex; align-items: center; gap: 2px; }
.cmp__tab { height: 32px; padding: 6px 12px; border: none; border-radius: 12px; background: transparent; color: #242424; cursor: pointer; white-space: nowrap; font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; transition: background 0.1s; }
.cmp__tab:hover { background: rgba(36,36,36,0.04); }
.cmp__tab.is-selected { background: #ebebeb; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.cmp__paddle { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border: none; border-radius: 9999px; background: transparent; color: #242424; cursor: pointer; transition: background 0.1s; }
.cmp__paddle:hover { background: rgba(36,36,36,0.04); }
.cmp__paddle svg { display: block; width: 20px; height: 20px; }
.cmp__paddle--l { transform: rotate(180deg); }
.cmp__cards { display: flex; gap: 12px; margin-top: 12px; overflow: hidden; }
.cmp__card { flex: 0 0 200px; border: 1px solid #dedede; border-radius: 12px; overflow: hidden; background: #fff; }
.cmp__card-media { height: 96px; background: linear-gradient(135deg, #eef1f6, #dfe5f0); border-bottom: 1px solid #ececec; }
.cmp__card-title { padding: 10px 12px; font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; color: #242424; }

.flag { margin-top: 6px; font-size: 12px; color: #a93901; }
`;

// ─── Body ───────────────────────────────────────────────────

const body = [
  stage(initial()),
  '<h2>Initial state \u2014 type to swap voice \u2192 send</h2>',
  initial(),
  '<h2>Multiple lines</h2>',
  multiline(),
  '<h2>With attachments</h2>',
  withAttachments(),
  '<p class="flag">Attachment file cards render inline \u2014 the One Copilot Card primitive is not yet ported.</p>',
  '<h2>Capability enabled \u2014 Control off</h2>',
  capabilityOff(),
  '<h2>Capability enabled \u2014 Control on</h2>',
  capabilityOn(),
  '<p class="flag">Result cards render inline \u2014 the One Copilot Card primitive is not yet ported.</p>',
].join('\n');

// ─── Interaction: initial composer typing toggles send ──────

let js = '';
js += '<script>';
js += '\n';
js += 'document.querySelectorAll(\'.cmp__ta\').forEach(function (ta) {';
js += '\n';
js += '  var cmp = ta.closest(\'.cmp\');';
js += '\n';
js += '  function grow() {';
js += '\n';
js += '    ta.style.height = \'auto\';';
js += '\n';
js += '    var h = ta.scrollHeight, max = 200;';
js += '\n';
js += '    if (h > max) { ta.style.height = max + \'px\'; ta.style.overflowY = \'auto\'; }';
js += '\n';
js += '    else { ta.style.height = h + \'px\'; ta.style.overflowY = \'hidden\'; }';
js += '\n';
js += '    if (cmp) {';
js += '\n';
js += '      cmp.classList.toggle(\'cmp--multiline\', h > 40);';
js += '\n';
js += '      cmp.classList.toggle(\'ci--has-text\', ta.value.trim().length > 0);';
js += '\n';
js += '    }';
js += '\n';
js += '  }';
js += '\n';
js += '  ta.addEventListener(\'input\', grow);';
js += '\n';
js += '  grow();';
js += '\n';
js += '});';
js += '\n';
js += '</script>';

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Composer Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Composer (Prompt Box) \u2014 Component Preview</h1>'
  + '<p class="hint">The primary chat input. Reuses Button, Tag, and Tab primitives. Type in the initial state to see the voice button become the dark Send.</p>'
  + body + '</div>' + js + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'composer.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
