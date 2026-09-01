/**
 * Panel — CoT (Chain of Thought) Interactive Preview
 *
 * One Copilot Secondary Panel showing the "Thinking" reasoning steps: collapsed
 * steps (chevron) and an active step whose body has a vertical progress rail,
 * description paragraphs, and Citation pills. Light + Dark. Reuses the Panel shell.
 *
 * Figma: One-Copilot-Desktop-UI-Kit — CoT panel (node 3992:100669)
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function ico(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, ' ').trim();
}
const chevronIco = ico('chevron-right-16-regular.svg');

// ─── Builders ───────────────────────────────────────────────

function collapsedStep(title: string): string {
  return '<div class="cot"><div class="cot__row">'
    + '<span class="cot__status"><span class="cot__chev">' + chevronIco + '</span></span>'
    + '<span class="cot__title">' + title + '</span>'
    + '</div></div>';
}

function citation(color: string, label: string): string {
  return '<span class="cot__cite"><span class="cot__cite-ico" style="background:' + color + '"></span><span class="cot__cite-label">' + label + '</span></span>';
}

function para(text: string, cite: string): string {
  return '<div class="cot__para"><p class="cot__text">' + text + '</p>' + cite + '</div>';
}

function activeStep(title: string): string {
  const body = ''
    + '<p class="cot__text">I\u2019m pulling in signals from past launches, recent conversations, and what\u2019s already in motion so we\u2019re grounded before making any calls.</p>'
    + para('I\u2019m looking for patterns that feel relevant, not just what\u2019s loud or trendy.', citation('#21a366', 'Spring Dessert Trends 2019'))
    + para('I\u2019m pulling in signals for patterns that encourage return without relying on discounts or hype.', citation('#0f6cbd', 'Limited-Time Offe\u2026'))
    + para('I\u2019m exploring how everyday moments turn into reasons to come back.', citation('#c4314b', 'Influencer blog po\u2026'));
  return '<div class="cot cot--active"><div class="cot__row">'
    + '<span class="cot__status"><span class="cot__bullet"></span></span>'
    + '<span class="cot__title">' + title + '</span>'
    + '</div>'
    + '<div class="cot__bodywrap"><span class="cot__rail"></span><div class="cot__desc">' + body + '</div></div>'
    + '</div>';
}

function panel(theme: string): string {
  return '<div class="cotp cotp--' + theme + '">'
    + '<div class="cotp__head">Thinking</div>'
    + '<div class="cotp__steps">'
    + collapsedStep('Establish shared context')
    + collapsedStep('Review past launch materials')
    + activeStep('Scan current market and cultural signals')
    + '</div></div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', sans-serif; background: #eee; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 16px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 820px; margin: 0 auto; }
.stage { display: flex; gap: 32px; justify-content: center; flex-wrap: wrap; }

/* ─── Panel shell ─── */
.cotp { width: 360px; display: flex; flex-direction: column; border-left: 1px solid; min-height: 560px; padding: 12px 0; }
.cotp--light { background: #fcfcfc; border-color: rgba(189,189,189,0.5); }
.cotp--dark  { background: #242424; border-color: rgba(103,103,103,0.5); }
.cotp__head { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 14px; line-height: 20px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; padding: 8px 20px 12px; }
.cotp--light .cotp__head { color: #242424; } .cotp--dark .cotp__head { color: #dedede; }
.cotp__steps { display: flex; flex-direction: column; padding: 0 12px; }

/* ─── CoT step ─── */
.cot { width: 336px; padding: 4px 8px; border-radius: 8px; }
.cot__row { display: flex; align-items: center; gap: 8px; }
.cot__status { width: 16px; height: 24px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; }
.cot__chev { display: inline-flex; width: 12px; height: 12px; }
.cot__chev svg { width: 12px; height: 12px; display: block; }
.cotp--light .cot__chev { color: #5d5d5d; } .cotp--dark .cot__chev { color: #aeaeae; }
.cot__bullet { width: 12px; height: 12px; border-radius: 50%; }
.cotp--light .cot__bullet { background: #242424; } .cotp--dark .cot__bullet { background: #dedede; }
.cot__title { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }
.cotp--light .cot__title { color: #242424; } .cotp--dark .cot__title { color: #dedede; }

/* Active step body — rail + description */
.cot__bodywrap { display: flex; gap: 8px; }
.cot__rail { width: 16px; flex-shrink: 0; display: flex; justify-content: center; }
.cot__rail::before { content: ''; width: 1px; height: 100%; }
.cotp--light .cot__rail::before { background: #dedede; } .cotp--dark .cot__rail::before { background: #484848; }
.cot__desc { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; padding: 2px 0 8px; }
.cot__text { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 12px; line-height: 16px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; }
.cotp--light .cot__text { color: #5d5d5d; } .cotp--dark .cot__text { color: #aeaeae; }
.cot__para { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }

/* Citation pill */
.cot__cite { display: inline-flex; align-items: center; gap: 4px; max-width: 100%; padding: 2px 6px; border-radius: 8px; }
.cotp--light .cot__cite { background: #f2f2f2; } .cotp--dark .cot__cite { background: #2e2e2e; }
.cot__cite-ico { width: 16px; height: 16px; border-radius: 4px; flex-shrink: 0; }
.cot__cite-label { font-family: 'Segoe Sans','Segoe UI',sans-serif; font-size: 12px; line-height: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cotp--light .cot__cite-label { color: #242424; } .cotp--dark .cot__cite-label { color: #dedede; }

/* ─── Usage docs ─── */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin: 24px 0 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
.usage { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.usage__col { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; }
.usage__col h3 { font-size: 12px; font-weight: 600; margin-bottom: 8px; }
.usage__col--do h3 { color: #0f7b0f; } .usage__col--dont h3 { color: #b10e1c; }
.usage__col ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.usage__col li { font-size: 12px; line-height: 1.5; color: #5d5d5d; padding-left: 16px; position: relative; }
.usage__col li::before { content: ''; position: absolute; left: 0; top: 7px; width: 6px; height: 6px; border-radius: 50%; }
.usage__col--do li::before { background: #0f7b0f; } .usage__col--dont li::before { background: #b10e1c; }
`;

const body = [
  stage(panel('light')),
  '<h2>CoT panel</h2>',
  '<div class="stage">' + panel('light') + panel('dark') + '</div>',
  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> Show Chain-of-Thought so people can watch Copilot reason before it answers. Completed steps collapse behind a chevron; the active step expands to reveal its working \u2014 short narration paragraphs, each grounded with a Citation.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Keep step titles short and verb-led.</li>',
  '<li>Expand only the active step; collapse the rest.</li>',
  '<li>Attach a Citation to each grounded claim.</li>',
  '<li>Use the rail to show continuity between steps.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Expose raw model tokens or private chain data.</li>',
  '<li>Expand every step at once.</li>',
  '<li>Write long essays inside a step body.</li>',
  '<li>Drop the citation that grounds a claim.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Panel \u2014 CoT Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Panel \u2014 Chain of Thought</h1>'
  + '<p class="hint">Secondary panel showing Copilot\u2019s reasoning steps with a progress rail and grounded citations.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'cotPanel.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'cotPanel.html'));
