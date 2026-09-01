/**
 * Auth Dialog — HTML Preview
 *
 * One Copilot compound (FCC-AdminX node 121:8045). Third-party connection
 * consent modal ("Connect Figma"): elevated surface (radius 24, Shadow/Highest,
 * 28px inset) with a Title Small header + partner subtitle, a centered logo
 * handshake row (Copilot · dots · partner), a Body Medium consent sentence with
 * an inline Settings link, and a right-aligned Cancel + primary footer.
 *
 * Shares the Dialog compound's surface, Title Small type, and footer buttons.
 * Icons: monochrome Copilot mark (_icons), Fluent more-horizontal, Figma logo.
 * Output: preview/dist/authDialog.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage } from './_scaffold';
import { copilotIco } from './_icons';

// ─── Icons — exact assets ───────────────────────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/fill="#(212121|242424)"/g, 'fill="currentColor"')
    .replace(/\n/g, '').trim();
}
const dots = readIcon('more-horizontal-20-regular.svg');
const figmaLogo = readIcon('figma-logo.svg');
function pngLogo(name: string): string {
  return '<img src="data:image/png;base64,' + fs.readFileSync(path.join(iconsDir, name)).toString('base64') + '" alt=""/>';
}
const confluenceLogo = pngLogo('confluence-logo.png');

// ─── Dialog builder ─────────────────────────────────────────

function authDialog(opts: {
  title: string;
  subtitle: string;
  partner: string;
  bodyLead: string;
  primary: string;
  usc?: { name: string; host: string };
}): string {
  const content = opts.usc
    ? ('<div class="ad__usc">'
      + '<div class="ad__usc-item"><div class="ad__usc-t">Continuous sync</div><div class="ad__usc-b">Your ' + opts.usc.name + ' content is automatically synced, stored and kept up to date.</div></div>'
      + '<div class="ad__usc-div"></div>'
      + '<div class="ad__usc-item"><div class="ad__usc-t">You\u2019re in control</div><div class="ad__usc-b">Copilot is limited to the permissions you set. You can delete conversations and disconnect a source at any time.</div></div>'
      + '<div class="ad__usc-div"></div>'
      + '<div class="ad__usc-item"><div class="ad__usc-t">Add your organisation\u2019s workspace</div><div class="ad__usc-b">Paste any ' + opts.usc.name + ' url from your workspace to connect</div>'
      + '<div class="ad__usc-input"><input type="text" placeholder="https://&lt;your-company&gt;.' + opts.usc.host + '/..." aria-label="Workspace URL"/></div></div>'
      + '</div>')
    : ('<p class="ad__body">' + opts.bodyLead + ' You can manage your sources in <a class="ad__link" href="#" onclick="return false">Settings</a>.</p>');
  return [
    '<div class="ad">',
    '<div class="ad__content">',
    '<div class="ad__text">',
    '<div class="ad__header">',
    '<div class="ad__title">' + opts.title + '</div>',
    '<div class="ad__subtitle">' + opts.subtitle + '</div>',
    '</div>',
    '<div class="ad__logos">',
    '<span class="ad__mark ad__mark--copilot">' + copilotIco + '</span>',
    '<span class="ad__dots">' + dots + '</span>',
    '<span class="ad__mark ad__mark--partner">' + opts.partner + '</span>',
    '</div>',
    content,
    '</div>',
    '<div class="ad__spacer"></div>',
    '<div class="ad__footer">',
    '<button class="ad-btn ad-btn--subtle">Cancel</button>',
    '<button class="ad-btn ad-btn--primary">' + opts.primary + '</button>',
    '</div>',
    '</div>',
    '</div>',
  ].join('');
}

function scene(dlg: string): string {
  return '<div class="ad-stage">' + dlg + '</div>';
}

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 14px; font-weight: 600; margin: 32px 0 12px; color: #5d5d5d; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 24px; }
.wrap { max-width: 900px; margin: 0 auto; }

/* ─── Stage (dark scrim) ─── */
.ad-stage { display: flex; align-items: center; justify-content: center; min-height: 460px; background: #333333; border-radius: 16px; padding: 48px; }

/* ─── Auth Dialog ─── */
.ad { width: 448px; max-width: 100%; background: #fff; border: 1px solid rgba(36,36,36,0); border-radius: 24px; padding: 28px; box-shadow: 0 0 1px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.03), 0 32px 48px rgba(0,0,0,0.08); }
.ad__content { display: flex; flex-direction: column; }
.ad__text { display: flex; flex-direction: column; gap: 12px; }

/* Header — Title Small (24/28, 600) + partner subtitle */
.ad__header { display: flex; flex-direction: column; gap: 4px; }
.ad__title { font-size: 24px; line-height: 28px; font-weight: 600; font-variation-settings: 'wght' 600; letter-spacing: -0.15px; color: #242424; }
.ad__subtitle { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 12px; line-height: 16px; font-weight: 400; color: #424242; }

/* Logo handshake row */
.ad__logos { display: flex; align-items: center; justify-content: center; gap: 16px; padding: 40px 0; }
.ad__mark { display: inline-flex; align-items: center; justify-content: center; }
.ad__mark--copilot { width: 48px; height: 48px; color: #242424; }
.ad__mark--copilot svg { width: 48px; height: 48px; }
.ad__mark--partner { width: 48px; height: 48px; }
.ad__mark--partner svg { width: 48px; height: 48px; }
.ad__dots { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; color: #6f6f6f; }
.ad__dots svg { width: 24px; height: 24px; }

/* Body — Body Medium (14/20, 420) */
.ad__body { font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; color: #242424; }
.ad__link { color: #242424; text-decoration: none; cursor: pointer; }
.ad__link:hover { color: #181818; text-decoration: underline; text-decoration-thickness: 1px; text-underline-position: from-font; text-decoration-skip-ink: none; }
.ad__mark--partner img { width: 48px; height: 48px; object-fit: contain; border-radius: 8px; display: block; }

/* Continuous-sync (USC) content — info sections + workspace URL input */
.ad__usc { display: flex; flex-direction: column; gap: 12px; width: 100%; }
.ad__usc-item { display: flex; flex-direction: column; gap: 4px; }
.ad__usc-t { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13px; line-height: 16px; font-weight: 600; color: #242424; }
.ad__usc-b { font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; color: #242424; }
.ad__usc-div { height: 1px; background: #dedede; width: 100%; }
.ad__usc-input { margin-top: 8px; width: 100%; }
.ad__usc-input input { width: 100%; height: 32px; border: 1px solid #242424; border-radius: 12px; padding: 6px 10px; font-family: inherit; font-size: 14px; line-height: 20px; color: #242424; background: transparent; outline: none; box-sizing: border-box; }
.ad__usc-input input::placeholder { color: rgba(0,0,0,0.56); }

/* Divider padding spacer (32px block) */
.ad__spacer { height: 32px; }

/* Footer — right-aligned Cancel + Primary */
.ad__footer { display: flex; align-items: center; justify-content: flex-end; gap: 6px; }
.ad-btn { display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 6px 10px; border: 1px solid transparent; border-radius: 12px; cursor: pointer; white-space: nowrap; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; font-variation-settings: 'opsz' 8, 'wght' 420; letter-spacing: 0; transition: background 0.1s; }
.ad-btn--subtle { background: transparent; color: #242424; }
.ad-btn--subtle:hover { background: rgba(36,36,36,0.04); }
.ad-btn--primary { background: #242424; color: #fff; }
.ad-btn--primary:hover { background: #3b3b3b; }

/* ─── Usage ─── */
.when { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 16px; margin: 16px 0 12px; font-size: 13px; line-height: 1.6; color: #5d5d5d; }
.when strong { color: #242424; font-weight: 600; }
.usage { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
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
  stage(authDialog({
    title: 'Connect Figma',
    subtitle: 'Developed by Figma',
    partner: figmaLogo,
    bodyLead: 'Let Copilot securely read your content from Figma.',
    primary: 'Continue to Figma',
  })),
  '<h2>Default — Connect Figma</h2>',
  scene(authDialog({
    title: 'Connect Figma',
    subtitle: 'Developed by Figma',
    partner: figmaLogo,
    bodyLead: 'Let Copilot securely read your content from Figma.',
    primary: 'Continue to Figma',
  })),

  '<h2>Continuous sync — User-level sync connector (Connect Confluence)</h2>',
  scene(authDialog({
    title: 'Connect Confluence',
    subtitle: 'Developed by Atlassian',
    partner: confluenceLogo,
    bodyLead: '',
    primary: 'Continue to Confluence',
    usc: { name: 'Confluence', host: 'atlassian.net' },
  })),

  '<h2>Usage</h2>',
  '<div class="when"><strong>When to use.</strong> The Auth Dialog appears when Copilot needs the user\u2019s explicit consent to connect a third-party source. The handshake row pairs the Copilot mark with the partner logo; the body states exactly what access is granted and links to Settings for source management. Continue proceeds to the partner\u2019s auth flow; Cancel dismisses.</div>',
  '<div class="usage">',
  '<div class="usage__col usage__col--do"><h3>Do</h3><ul>',
  '<li>State plainly what Copilot will access (\u201Csecurely read your content from\u2026\u201D).</li>',
  '<li>Pair the Copilot mark with the partner logo, separated by the connector dots.</li>',
  '<li>Keep the primary label action-specific: \u201CContinue to {Partner}\u201D.</li>',
  '<li>Link \u201CSettings\u201D so users can manage sources without leaving context.</li>',
  '</ul></div>',
  '<div class="usage__col usage__col--dont"><h3>Don\'t</h3><ul>',
  '<li>Use a generic \u201COK\u201D \u2014 the primary must name the destination.</li>',
  '<li>Add extra chrome (dividers, banners) \u2014 the surface is padding-only.</li>',
  '<li>Recolor the Copilot mark \u2014 it stays monochrome primary here.</li>',
  '<li>Bury the access scope \u2014 the consent sentence is the whole point.</li>',
  '</ul></div>',
  '</div>',
].join('\n');

// ─── Assemble ───────────────────────────────────────────────

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Auth Dialog Preview</title><style>' + css + '</style></head><body>'
  + '<div class="wrap"><h1>Auth Dialog \u2014 Component Preview</h1>'
  + '<p class="hint">Third-party connection consent modal (radius 24, Shadow/Highest). Title Small header + partner subtitle, centered logo handshake, Body Medium consent with Settings link, and a Cancel + primary footer.</p>'
  + body + '</div></body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
fs.writeFileSync(path.join(outDir, 'authDialog.html'), html, 'utf-8');
console.log('Done: ' + path.join(outDir, 'authDialog.html'));
