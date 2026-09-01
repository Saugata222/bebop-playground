/**
 * Response — Preview
 *
 * One Copilot compound (node 4020:2612). A full turn that composes the pieces we
 * already built: the Response Blocks type system, inline Citation pills, and the
 * Response Footer component (reused, not rebuilt). Renders a complete example
 * response in Light and Dark exactly per Figma.
 *
 * Reuses: responseFooter markup/CSS, citation Work/Web pills, responseBlocks types.
 * Icons: exact Fluent / product assets from src/components/icons.
 * Output: preview/dist/response.html
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Assets ─────────────────────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#[0-9A-Fa-f]{3,6}"/g, 'fill="currentColor"')
    .replace(/\n/g, ' ').trim();
}
function readSvg(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, '').trim();
}
function logoDataUri(file: string): string {
  return 'data:image/png;base64,' + fs.readFileSync(path.join(iconsDir, file)).toString('base64');
}

// Footer icons (same as responseFooter component)
const copyIco = readIcon('copy-20-regular.svg');
const thumbLikeR = readIcon('thumb-like-20-regular.svg');
const thumbLikeF = readIcon('thumb-like-20-filled.svg');
const thumbDislikeR = readIcon('thumb-dislike-20-regular.svg');
const thumbDislikeF = readIcon('thumb-dislike-20-filled.svg');
const tryAgainIco = readIcon('arrow-sync-20-regular.svg');
const moreIco = readIcon('more-horizontal-20-regular.svg');
const planetIco = readIcon('planet-20-regular.svg');
// Citation Work mark
const excelIco = readSvg('excel-20-color.svg');
// Reference avatars
const moodysLogo = logoDataUri('moodys-logo.png');
const lsegLogo = logoDataUri('lseg-logo.png');
const spGlobalLogo = logoDataUri('sp-global-logo.png');

// ─── Reused: Response Footer (from responseFooter component) ─

function avatar(kind: 'logo' | 'web', value: string): string {
  if (kind === 'logo') return '<span class="rf__avatar" style="background-image:url(' + value + ')"></span>';
  return '<span class="rf__avatar rf__avatar--web">' + planetIco + '</span>';
}
function footer(avatars: string[], dark?: boolean): string {
  let h = '<div class="rf' + (dark ? ' rf--dark' : '') + '">';
  h += '<div class="rf__toolbar">';
  h += '<button class="rf__btn" title="Copy">' + copyIco + '</button>';
  h += '<button class="rf__btn rf__btn--like" title="Like"><span class="ico-r">' + thumbLikeR + '</span><span class="ico-f">' + thumbLikeF + '</span></button>';
  h += '<button class="rf__btn rf__btn--dislike" title="Dislike"><span class="ico-r">' + thumbDislikeR + '</span><span class="ico-f">' + thumbDislikeF + '</span></button>';
  h += '<button class="rf__btn" title="Try again">' + tryAgainIco + '</button>';
  h += '<button class="rf__btn" title="More actions">' + moreIco + '</button>';
  h += '</div>';
  if (avatars.length) {
    h += '<div class="rf__divider"></div>';
    h += '<button class="rf__sources" title="View references"><span class="rf__avatars">' + avatars.join('') + '</span><span>References</span></button>';
  }
  h += '</div>';
  return h;
}

// ─── Reused: Citation pills (from citation component) ───────

function citWork(icon: string, count: string): string {
  return '<span class="cit cit--work">' + '<span class="cit__ico">' + icon + '</span>' + (count ? '<span class="cit__of">' + count + '</span>' : '') + '</span>';
}
function citWeb(source: string, count: string): string {
  return '<span class="cit cit--web"><span class="cit__src">' + source + '</span>' + (count ? '<span class="cit__of">' + count + '</span>' : '') + '</span>';
}

// ─── Copilot message (Response Blocks) ──────────────────────

function copilotBody(): string {
  return [
    '<p class="pM">Support tickets for XStream Pro have climbed steadily this quarter, with escalations concentrated in the enterprise tier ' + citWork(excelIco, '+2') + '. The pattern points to reliability rather than usability \u2014 most reports cite unexpected disconnects during peak hours.</p>',
    '<p class="pM">Sentiment across recent coverage echoes the same theme ' + citWeb('Yahoo News', '+2') + ', with customers describing the service as \u201cunpredictable.\u201d</p>',
    '<p class="h5">Supporting evidence</p>',
    '<p class="pM">Escalation volume rose from 120 in May to 190 in July, and Level 2\u20133 cases now make up 30% of the total \u2014 a clear sign of increasing complexity.</p>',
    '<div class="quote"><span class="quote__mark">\u201c</span><p class="quote__text">XStream Pro has been unpredictable and disruptive. It\u2019s affecting our ability to deliver consistent service to our clients.</p></div>',
    '<p class="h5">Suggested next steps</p>',
    '<ul class="list"><li>Launch an escalation-prevention program focused on early detection.</li><li>Review staffing levels against sustained Level 2\u20133 complexity.</li><li>Invest in automation and cross-team collaboration.</li></ul>',
    '<p class="pM">Would you like me to <a href="#">generate a chart</a> or <a href="#">draft a summary email</a> from <a href="#">Product_Launch_Feedback_Summary</a>?</p>',
  ].join('');
}

// ─── Turn ───────────────────────────────────────────────────

function turn(dark?: boolean): string {
  const refs = [avatar('logo', moodysLogo), avatar('logo', lsegLogo), avatar('logo', spGlobalLogo)];
  return '<div class="turn' + (dark ? ' turn--dark' : '') + '">'
    + '<div class="usermsg">Can you summarize the support ticket trends for XStream Pro and recommend next steps?</div>'
    + '<div class="copilot">' + copilotBody() + '</div>'
    + footer(refs, dark)
    + '</div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1.page { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 28px; }
.wrap { max-width: 900px; margin: 0 auto; }
h2.sec { font-size: 14px; font-weight: 600; margin: 32px 0 12px; }

/* Theme stages */
.stages { display: grid; grid-template-columns: 1fr; gap: 4px; border-radius: 16px; overflow: hidden; }
.stage { padding: 40px; }
.stage--light { background: #ffffff; }
.stage--dark { background: #242424; }
.stage__lbl { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #6f6f6f; margin-bottom: 24px; }
.stage--dark .stage__lbl { color: #9a9a9a; }

/* ── Turn ── */
.turn { width: 100%; max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; }

/* User message — right-aligned subtle bubble */
.usermsg { align-self: flex-end; max-width: 460px; background: #f5f5f5; border-radius: 20px; padding: 12px 16px; font-size: 16px; line-height: 28px; font-weight: 420; color: #242424; margin-bottom: 24px; }
.turn--dark .usermsg { background: #363636; color: #ededed; }

/* Copilot message — Response Blocks stack (16px gap) */
.copilot { display: flex; flex-direction: column; gap: 16px; color: #242424; }
.turn--dark .copilot { color: #ededed; }

/* Response Blocks types (Segoe Sans content / Georgia editorial) */
.pM { font-size: 16px; line-height: 28px; font-weight: 420; }
.h5 { font-size: 20px; line-height: 24px; font-weight: 550; font-variation-settings: 'wght' 550; letter-spacing: -0.15px; margin-top: 8px; }
.copilot a { color: inherit; text-decoration: underline; text-underline-offset: 2px; }
.list { display: flex; flex-direction: column; gap: 4px; padding-left: 22px; }
.list li { font-size: 16px; line-height: 28px; font-weight: 420; }
.quote { text-align: center; padding: 8px 0; }
.quote__mark { display: block; font-family: 'Georgia Pro', Georgia, serif; font-size: 40px; line-height: 1; }
.quote__text { font-family: 'Georgia Pro', Georgia, 'Times New Roman', serif; font-size: 28px; line-height: 34px; font-weight: 420; letter-spacing: -0.15px; max-width: 520px; margin: 4px auto 0; }

/* ── Citation pills (from citation component) ── */
.cit { display: inline-flex; align-items: center; gap: 2px; min-height: 24px; padding: 4px 8px; border-radius: 9999px; background: #f2f2f2; cursor: pointer; vertical-align: middle; }
.cit__ico { display: inline-flex; align-items: center; }
.cit__ico svg { width: 16px; height: 16px; display: block; }
.cit__of, .cit__src { font-size: 10px; line-height: 14px; color: #5d5d5d; font-variation-settings: 'opsz' 8, 'wght' 420; white-space: nowrap; }
.cit__src { max-width: 80px; overflow: hidden; text-overflow: ellipsis; }
.turn--dark .cit { background: #2e2e2e; }
.turn--dark .cit__of, .turn--dark .cit__src { color: #aeaeae; }

/* ── Response Footer (reused from responseFooter component) ── */
.rf { display: flex; align-items: center; padding-top: 20px; }
.rf__toolbar { display: flex; align-items: center; gap: 0; }
.rf__btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 6px; border-radius: 9999px; background: transparent; border: none; cursor: pointer; color: #424242; transition: background 0.1s, color 0.1s; }
.rf__btn:hover { background: rgba(36, 36, 36, 0.04); color: #242424; }
.rf__btn:active { background: rgba(36, 36, 36, 0.08); }
.rf__btn svg { width: 20px; height: 20px; }
.rf__btn .ico-r { display: block; line-height: 0; }
.rf__btn .ico-f { display: none; line-height: 0; }
.rf__btn--active .ico-r { display: none; }
.rf__btn--active .ico-f { display: block; }
.rf__divider { width: 1px; height: 20px; background: rgba(189,189,189,0.5); margin: 0 4px; flex-shrink: 0; }
.rf__sources { display: flex; align-items: center; gap: 6px; height: 32px; padding: 6px 10px 6px 8px; border-radius: 9999px; background: transparent; border: none; cursor: pointer; color: #242424; transition: background 0.1s; font-family: inherit; font-size: 14px; font-weight: 420; line-height: 20px; }
.rf__sources:hover { background: rgba(36, 36, 36, 0.04); }
.rf__avatars { display: inline-flex; align-items: center; }
.rf__avatars .rf__avatar { width: 20px; height: 20px; border-radius: 9999px; background-color: #fff; background-size: cover; background-position: center; background-repeat: no-repeat; box-shadow: 0 0 0 1.5px #fff; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; color: #fff; font-size: 10px; font-weight: 600; }
.rf__avatars .rf__avatar + .rf__avatar { margin-left: -6px; }
.rf__avatars .rf__avatar svg { width: 12px; height: 12px; color: #5d5d5d; }
.rf__avatars .rf__avatar--web { background: #ebebeb; color: #5d5d5d; }
.rf--dark .rf__btn { color: #e0e0e0; }
.rf--dark .rf__btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
.rf--dark .rf__divider { background: rgba(255,255,255,0.16); }
.rf--dark .rf__sources { color: #fff; }
.rf--dark .rf__sources:hover { background: rgba(255,255,255,0.08); }
.rf--dark .rf__avatar { box-shadow: 0 0 0 1.5px #242424; }

/* Usage */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin-bottom: 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
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
`;

// ─── Body ───────────────────────────────────────────────────

const body = [
  '<h2 class="sec">Turn</h2>',
  '<div class="stages">',
  '<div class="stage stage--light"><div class="stage__lbl">Light</div>' + turn(false) + '</div>',
  '<div class="stage stage--dark"><div class="stage__lbl">Dark</div>' + turn(true) + '</div>',
  '</div>',

  '<h2 class="sec">Usage</h2>',
  '<div class="when"><strong>How a response is built.</strong> A Response is a Turn that composes existing pieces \u2014 a user message, an optional <strong>Latency</strong> state, the Copilot message as a stack of <strong>Response Blocks</strong> (16px apart) with inline <strong>Citations</strong>, and the <strong>Response Footer</strong>. Templates are flexible blueprints that adapt to any context in Light and Dark.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>Compose the body from Response Blocks at the exact type scale, 16px apart.</li>',
  '<li>Reuse the Citation pill inline (Work for enterprise sources, Web for open web).</li>',
  '<li>Reuse the Response Footer for actions and the References avatar stack.</li>',
  '<li>Right-align the user message in a subtle bubble; keep the reply full-width.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Re-typeset blocks \u2014 use the Segoe Sans / Georgia / Consolas scale as-is.</li>',
  '<li>Rebuild the footer or citation \u2014 compose the existing components.</li>',
  '<li>Mix content and functional type inside a reading block.</li>',
  '<li>Crowd blocks together \u2014 preserve the 16px rhythm and the quote\u2019s breathing room.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Response Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1 class="page">Response \u2014 Component Preview</h1>'
  + '<p class="hint">A full turn composed from Response Blocks, inline Citations, and the Response Footer \u2014 in Light and Dark.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'response.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
