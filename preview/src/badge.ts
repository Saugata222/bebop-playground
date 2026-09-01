/**
 * Badge — Interactive HTML Preview
 *
 * One Copilot primitive (Source Discovery — Badge, node 1838:40290). A small
 * circular pill that tags an item inline with a short status word (e.g.
 * "Recommended" beside a source name). Soft neutral fill, Functional Caption
 * text. Composes into: sourceCard, listItemCowork, menuListItem.
 */

import * as fs from 'fs';
import * as path from 'path';
import { section, stage, variants, specs, usageGuidance } from './_scaffold';

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; color: #242424; }

/* ─── Badge primitive (--c-badge-*) ─── */
.badge {
  display: inline-flex; align-items: center; justify-content: center; gap: 2px;
  height: 16px; padding: 0 4px; border-radius: 9999px;
  background: rgba(0, 0, 0, 0.08); color: #242424;
  font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif;
  font-size: 10px; line-height: 14px; font-weight: 400;
  font-variation-settings: 'opsz' 8, 'wght' 400;
  letter-spacing: 0; white-space: nowrap; flex-shrink: 0;
}
.badge--brand { background: rgba(25, 103, 210, 0.2); color: #1967d2; }

/* In-context source row */
.badge-row { display: inline-flex; align-items: center; gap: 12px; }
.badge-row__logo { width: 24px; height: 24px; border-radius: 6px; background: #f0f0f0; flex-shrink: 0; }
.badge-row__meta { display: flex; flex-direction: column; gap: 2px; text-align: left; }
.badge-row__name { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; line-height: 20px; color: #242424; }
.badge-row__sub { font-size: 12px; line-height: 16px; color: #5d5d5d; }
`;

function badge(text: string, brand = false): string {
  return '<span class="badge' + (brand ? ' badge--brand' : '') + '">' + text + '</span>';
}

function row(name: string, sub: string, rec: boolean): string {
  return '<div class="badge-row"><span class="badge-row__logo"></span>'
    + '<span class="badge-row__meta"><span class="badge-row__name">' + name
    + (rec ? badge('Recommended') : '') + '</span>'
    + '<span class="badge-row__sub">' + sub + '</span></span></div>';
}

// ─── Body ───────────────────────────────────────────────────

const body = [
  stage(badge('Recommended')),

  section('Variants', variants([
    { label: 'Neutral', html: badge('Recommended') },
    { label: 'Brand', html: badge('New', true) },
  ]), 'Soft neutral · soft brand'),

  section('Labels', variants([
    { label: 'Recommended', html: badge('Recommended') },
    { label: 'New', html: badge('New', true) },
    { label: 'Beta', html: badge('Beta') },
    { label: 'Preview', html: badge('Preview', true) },
  ]), 'Neutral \u00b7 soft fill'),

  section('In context',
    '<div class="bp-card" style="padding:24px 28px; display:flex; flex-direction:column; gap:16px">'
    + row('Confluence', 'Pull knowledge base articles and team documentation', true)
    + row('Canva', 'Browse, summarize, autofill, and even generate new Canva designs', false)
    + '</div>',
    'Recommended source in the Settings list'),

  section('Specs', specs([
    { k: 'Height', v: '16px' },
    { k: 'Padding', v: '0 4px' },
    { k: 'Gap', v: '2px' },
    { k: 'Radius', v: '9999px (circular)' },
    { k: 'Background', v: 'Neutral rgba(0,0,0,0.08) · Brand rgba(25,103,210,0.2)' },
    { k: 'Text color', v: 'Neutral #242424 · Brand #1967d2' },
    { k: 'Type', v: 'Functional Caption \u00b7 Segoe Sans 10/14 \u00b7 400' },
  ])),

  usageGuidance([
    { h: 'Purpose', body: '<p>Use a Badge to tag an item inline with a short, non-interactive status word \u2014 e.g. \u201cRecommended\u201d beside a connectable source. It supplements the label; it never replaces it.</p>' },
    { h: 'Content', body: '<p>One or two words only (Recommended, New, Beta). Never place long-form text, counts, or interactive controls inside a Badge.</p>' },
    { h: 'Placement', body: '<p>Sits immediately after the item name on the same line, vertically centered. Keep to one Badge per item.</p>' },
    { h: 'Accessibility', body: '<p>The Badge is decorative reinforcement \u2014 the same meaning must be conveyed elsewhere (e.g. a Recommended filter). It has no states, focus, or role.</p>' },
  ]),
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Badge Preview</title><style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'badge.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
