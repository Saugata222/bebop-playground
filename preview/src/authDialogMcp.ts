/**
 * Standalone export — MCP connector auth dialog compound only.
 *
 * Emits a self-contained HTML of just the "Connect source" auth dialog as shown
 * for an MCP connector (HubSpot), with no shell or surrounding UI. CSS + markup
 * are lifted verbatim from connectorSkillsP0.ts so the compound renders
 * identically. Output → ~/Downloads/bebop-compounds/auth-dialog-mcp.html
 */
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function ico(name: string): string {
  try {
    return fs.readFileSync(path.join(iconsDir, name + '.svg'), 'utf-8')
      .replace(/\n/g, '').replace(/ (width|height)="\d+"/g, '')
      .replace(/fill="#[0-9a-fA-F]{6}"/g, 'fill="currentColor"');
  } catch (e) { return ''; }
}
function logoImg(file: string): string {
  try { return 'data:image/png;base64,' + fs.readFileSync(path.join(iconsDir, file)).toString('base64'); } catch (e) { return ''; }
}

// ─── MCP connector content (HubSpot) ────────────────────────
const NAME = 'HubSpot';
const LOGO = logoImg('hubspot-logo.png');
const ABOUT = 'Connect CRM contacts, deals, and marketing data so Copilot can summarize pipeline and draft outreach. It surfaces the customer context you need without leaving chat.';
const DEVELOPER = 'HubSpot';
const CATEGORY = 'Commerce & Shopping';
const SKILLS = ['contact-lookup', 'deal-summary', 'pipeline-report', 'company-brief', 'log-activity', 'create-deal', 'update-stage', 'draft-outreach', 'list-tasks', 'campaign-recap', 'lead-score', 'revenue-forecast'];
const SHOWN = 9; // matches the 2-row cap in the 640px dialog

// ─── CSS (verbatim from connectorSkillsP0.ts) ───────────────
let css = '';
css += '*{box-sizing:border-box;}';
css += 'html,body{height:100%;margin:0;}';
css += "body{font-family:'Segoe Sans','Segoe UI',system-ui,sans-serif;color:#242424;background:#f3f2f1;}";
css += '.ad-overlay { position: fixed; inset: 0; z-index: 220; background: rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center; padding: 24px; }';
css += '.ad { width: 640px; max-width: calc(100vw - 48px); max-height: calc(100vh - 48px); overflow-y: auto; background: #fff; border-radius: 24px; padding: 32px 40px; display: flex; flex-direction: column; gap: 24px; box-shadow: 0 0 2px 0 rgba(0,0,0,0.15), 0 8px 16px 0 rgba(0,0,0,0.03), 0 32px 48px 0 rgba(0,0,0,0.08); }';
css += '.ad__head { display: flex; flex-direction: column; gap: 8px; }';
css += '.ad__top { display: flex; align-items: center; gap: 12px; }';
css += '.ad__logo { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; flex-shrink: 0; }';
css += '.ad__logo img { width: 40px; height: 40px; object-fit: contain; border-radius: 8px; display: block; }';
css += '.ad__name { flex: 1 1 auto; font-size: 28px; line-height: 36px; font-weight: 600; letter-spacing: -0.15px; color: #242424; }';
css += '.ad__close { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: none; background: transparent; border-radius: 9999px; color: #242424; cursor: pointer; flex-shrink: 0; transition: background 0.1s; }';
css += '.ad__close:hover { background: rgba(36,36,36,0.04); }';
css += '.ad__close svg { width: 20px; height: 20px; }';
css += '.ad__body { font-size: 14px; line-height: 20px; font-weight: 420; color: #242424; margin: 0; }';
css += '.ad__sec { display: flex; flex-direction: column; gap: 8px; }';
css += '.ad__sech { font-size: 16px; line-height: 24px; font-weight: 600; color: #242424; }';
css += '.ad__chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }';
css += '.ad__more { color: #616161; cursor: default; }';
css += '.stgd__chip { display: inline-flex; align-items: center; justify-content: center; min-height: 24px; padding: 2px 10px; border: none; border-radius: 9999px; background: rgba(0,0,0,0.05); color: #242424; font-size: 12px; line-height: 16px; font-weight: 400; white-space: nowrap; }';
css += '.ad__meta { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; border-top: 1px solid #e0e0e0; padding-top: 16px; }';
css += '.ad__metacol { display: flex; flex-direction: column; gap: 4px; flex: 0 0 auto; min-width: 0; }';
css += '.ad__metal { font-size: 14px; line-height: 20px; color: #616161; }';
css += '.ad__metav { font-size: 14px; line-height: 20px; color: #242424; white-space: nowrap; }';
css += '.ad__link { color: #242424; text-decoration: none; cursor: pointer; }';
css += '.ad__link:hover { color: #181818; text-decoration: underline; text-decoration-thickness: 1px; text-underline-position: from-font; text-decoration-skip-ink: none; }';
css += '.ad__footer { display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 8px; }';
css += '.ad-btn { display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 6px 10px; border: none; border-radius: 12px; cursor: pointer; font-family: inherit; font-size: 14px; line-height: 20px; font-weight: 420; transition: background 0.1s; }';
css += '.ad-btn--primary { background: #242424; color: #fff; }';
css += '.ad-btn--primary:hover { background: #2b2b2b; }';

// ─── Markup ─────────────────────────────────────────────────
const chips = SKILLS.slice(0, SHOWN).map(function (s) { return '<span class="stgd__chip">/' + s + '</span>'; }).join('');
const moreChip = SKILLS.length > SHOWN ? '<span class="stgd__chip ad__more">+' + (SKILLS.length - SHOWN) + '</span>' : '';

let html = '';
html += '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width,initial-scale=1"/>';
html += '<title>Auth dialog — MCP connector</title><style>' + css + '</style></head><body>';
html += '<div class="ad-overlay">';
html += '<div class="ad" role="dialog" aria-label="Connect source">';
html += '<div class="ad__head">';
html += '<div class="ad__top">';
html += '<span class="ad__logo"><img src="' + LOGO + '" alt=""/></span>';
html += '<span class="ad__name">' + NAME + '</span>';
html += '<button class="ad__close" aria-label="Close">' + ico('dismiss-20-regular') + '</button>';
html += '</div>';
html += '<p class="ad__body">' + ABOUT + '</p>';
html += '</div>';
html += '<div class="ad__sec">';
html += '<div class="ad__sech">Skills</div>';
html += '<div class="ad__chips">' + chips + moreChip + '</div>';
html += '</div>';
html += '<div class="ad__meta">';
html += '<div class="ad__metacol"><span class="ad__metal">Developer</span><a class="ad__metav ad__link" href="#" onclick="return false">' + DEVELOPER + '</a></div>';
html += '<div class="ad__metacol"><span class="ad__metal">Category</span><span class="ad__metav">' + CATEGORY + '</span></div>';
html += '<div class="ad__metacol"><span class="ad__metal">More info</span><span class="ad__metav"><a class="ad__link" href="#" onclick="return false">Privacy Policy</a>, <a class="ad__link" href="#" onclick="return false">Terms of Service</a></span></div>';
html += '</div>';
html += '<div class="ad__footer">';
html += '<button class="ad-btn ad-btn--primary">Continue to ' + NAME + '</button>';
html += '</div>';
html += '</div></div>';
html += '</body></html>';

const outDir = path.join(os.homedir(), 'Downloads', 'bebop-compounds');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'auth-dialog-mcp.html');
fs.writeFileSync(outFile, html, 'utf-8');
console.log('Done: ' + outFile);
