/**
 * Connector Logos — Interactive HTML Preview
 *
 * A reference card listing every connector/company logo in the design system
 * icon set (src/components/icons), grouped by category. ServiceNow and Azure
 * DevOps are split out as tenant sources (enabled centrally by the admin, not
 * user-connected). Each tile embeds its logo (PNG data URI or inline SVG).
 *
 * Prefix: n/a (asset catalog, not a token component)
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');

function readPng(file: string): string {
  try { return 'data:image/png;base64,' + fs.readFileSync(path.join(iconsDir, file)).toString('base64'); } catch (e) { return ''; }
}
function readSvgColor(file: string): string {
  try { return fs.readFileSync(path.join(iconsDir, file), 'utf-8').replace(/\n/g, '').replace(/ (width|height)="\d+"/g, ''); } catch (e) { return ''; }
}
function readSvgGlyph(file: string): string {
  try {
    return fs.readFileSync(path.join(iconsDir, file), 'utf-8')
      .replace(/\n/g, '').replace(/ (width|height)="\d+"/g, '')
      .replace(/fill="#[0-9a-fA-F]{3,6}"/g, 'fill="currentColor"');
  } catch (e) { return ''; }
}

// kind: 'png' | 'svg' (color) | 'glyph' (currentColor)
type Logo = { name: string; file: string; kind: 'png' | 'svg' | 'glyph'; cat: string };

function logoMarkup(l: Logo): string {
  if (l.kind === 'png') {
    const src = readPng(l.file);
    return src ? '<img src="' + src + '" alt=""/>' : '<span class="tile__missing">?</span>';
  }
  if (l.kind === 'svg') return '<span class="tile__svg">' + readSvgColor(l.file) + '</span>';
  return '<span class="tile__glyph">' + readSvgGlyph(l.file) + '</span>';
}

// ─── Category taxonomy (render order) ────────────────────────────
const CATS = [
  'Commerce & Shopping', 'Communication', 'Consumer Health', 'Creative',
  'Data & Analytics', 'Development tools', 'Education', 'Financial Services',
  'Health & Life Sciences', 'Healthcare', 'Legal', 'Media', 'Nonprofit', 'Other',
];

// ─── Search synonyms per category ────────────────────────
// Common words that resolve to each category in the source search (Change-
// sources menu + Settings). Mirror of discoveryV2 SRC_DOMAINS — keep in sync.
const SYNONYMS: Record<string, string[]> = {
  'Commerce & Shopping': ['commerce', 'shopping', 'shop', 'sales', 'crm', 'ecommerce', 'retail', 'travel', 'booking', 'payments', 'payment', 'marketplace', 'store', 'marketing', 'ads', 'advertising'],
  'Communication': ['communication', 'comms', 'messaging', 'chat', 'support', 'contact', 'email', 'mail', 'inbox', 'teams', 'slack'],
  'Consumer Health': ['health', 'healthcare', 'wellness', 'fitness'],
  'Creative': ['design', 'creative', 'designer', 'ux', 'ui', 'diagram', 'whiteboard', 'graphics', 'video', 'photo', 'art', 'slides', 'presentation', 'branding'],
  'Data & Analytics': ['data', 'analytics', 'analysis', 'intelligence', 'research', 'dashboard', 'reporting', 'report', 'metrics', 'bi', 'insights', 'statistics', 'database', 'sql'],
  'Development tools': ['development', 'dev', 'developer', 'engineering', 'engineer', 'code', 'coding', 'devops', 'software', 'git', 'api', 'database', 'sql', 'repo', 'repository', 'cloud', 'deployment', 'infrastructure'],
  'Education': ['education', 'learning', 'learn', 'training', 'course', 'school', 'university', 'study', 'academic'],
  'Financial Services': ['finance', 'financial', 'finances', 'money', 'fsi', 'banking', 'bank', 'investment', 'investing', 'markets', 'market', 'trading', 'stocks', 'stock', 'credit', 'ratings', 'equity', 'capital', 'accounting', 'tax', 'crypto', 'invoice', 'invoicing', 'payroll', 'revenue', 'budget', 'wealth', 'fund', 'funds'],
  'Health & Life Sciences': ['health', 'healthcare', 'medical', 'medicine', 'drug', 'pharma', 'clinical', 'biotech'],
  'Healthcare': ['health', 'healthcare', 'medical', 'medicine', 'drug', 'pharma', 'wellness', 'patient', 'hospital'],
  'Legal': ['legal', 'law', 'litigation', 'court', 'attorney', 'lawyer', 'contract', 'compliance'],
  'Media': ['media', 'music', 'entertainment', 'news', 'streaming', 'podcast', 'video'],
  'Nonprofit': ['nonprofit', 'grants', 'grant', 'philanthropy', 'funding'],
  'Other': [],
};

// ─── Connectors, categorised ─────────────────────────────────────
const CONNECTORS: Logo[] = [
  // Commerce & Shopping
  { name: 'GoDaddy', file: 'godaddy-logo.png', kind: 'png', cat: 'Commerce & Shopping' },
  { name: 'HubSpot', file: 'hubspot-logo.png', kind: 'png', cat: 'Commerce & Shopping' },
  { name: 'Taskrabbit', file: 'taskrabbit-logo.png', kind: 'png', cat: 'Commerce & Shopping' },
  { name: 'Trivago', file: 'trivago-logo.png', kind: 'png', cat: 'Commerce & Shopping' },
  { name: 'Viator', file: 'viator-logo.png', kind: 'png', cat: 'Commerce & Shopping' },
  // Communication
  { name: 'Intercom', file: 'intercom-logo.png', kind: 'png', cat: 'Communication' },
  { name: 'Twilio', file: 'twilio-logo.png', kind: 'png', cat: 'Communication' },
  { name: 'Slack', file: 'slack-logo.png', kind: 'png', cat: 'Communication' },
  { name: 'Google Contacts', file: 'google-contacts-logo.png', kind: 'png', cat: 'Communication' },
  // Creative
  { name: 'Adobe Marketing Agent', file: 'adobe-logo.png', kind: 'png', cat: 'Creative' },
  { name: 'Canva', file: 'canva-logo.png', kind: 'png', cat: 'Creative' },
  { name: 'Excalidraw', file: 'excalidraw-logo.png', kind: 'png', cat: 'Creative' },
  { name: 'Mermaid Chart', file: 'mermaid-chart-logo.png', kind: 'png', cat: 'Creative' },
  { name: 'Miro', file: 'miro-logo.png', kind: 'png', cat: 'Creative' },
  { name: 'Figma', file: 'figma-logo.svg', kind: 'svg', cat: 'Creative' },
  // Data & Analytics
  { name: 'Blockscout', file: 'blockscout-logo.png', kind: 'png', cat: 'Data & Analytics' },
  { name: 'Clarity AI', file: 'clarity-ai-logo.png', kind: 'png', cat: 'Data & Analytics' },
  { name: 'Exa', file: 'exa-logo.png', kind: 'png', cat: 'Data & Analytics' },
  { name: 'Google Cloud BigQuery', file: 'bigquery-logo.png', kind: 'png', cat: 'Data & Analytics' },
  { name: 'Wolfram', file: 'wolfram-logo.png', kind: 'png', cat: 'Data & Analytics' },
  { name: 'Atlas AI', file: 'atlas-ai-logo.png', kind: 'png', cat: 'Data & Analytics' },
  { name: 'CB Insights MCP', file: 'cb-insights-logo.png', kind: 'png', cat: 'Data & Analytics' },
  { name: 'Forrester AI', file: 'forrester-logo.png', kind: 'png', cat: 'Data & Analytics' },
  // Development tools
  { name: 'Clerk', file: 'clerk-logo.png', kind: 'png', cat: 'Development tools' },
  { name: 'Granted', file: 'granted-logo.png', kind: 'png', cat: 'Development tools' },
  { name: 'Graphos MCP tools', file: 'graphos-logo.png', kind: 'png', cat: 'Development tools' },
  { name: 'Hugging Face', file: 'hugging-face-logo.png', kind: 'png', cat: 'Development tools' },
  { name: 'Linear', file: 'linear-logo.png', kind: 'png', cat: 'Development tools' },
  { name: 'Pg-aiguide', file: 'pg-aiguide-logo.png', kind: 'png', cat: 'Development tools' },
  { name: 'GitHub', file: 'github-logo.png', kind: 'png', cat: 'Development tools' },
  { name: 'Jira', file: 'jira-logo.png', kind: 'png', cat: 'Development tools' },
  { name: 'Confluence', file: 'confluence-logo.png', kind: 'png', cat: 'Development tools' },
  // Education
  { name: 'Goodnotes', file: 'goodnotes-logo.png', kind: 'png', cat: 'Education' },
  { name: 'Microsoft Learn', file: 'microsoft-learn-logo.png', kind: 'png', cat: 'Education' },
  // Financial Services
  { name: 'Aiwyn Tax', file: 'aiwyn-logo.png', kind: 'png', cat: 'Financial Services' },
  { name: 'Crypto.com', file: 'crypto-com-logo.png', kind: 'png', cat: 'Financial Services' },
  { name: 'LSEG', file: 'lseg-logo.png', kind: 'png', cat: 'Financial Services' },
  { name: 'Moody\u2019s', file: 'moodys-logo.png', kind: 'png', cat: 'Financial Services' },
  { name: 'Order by Cash App', file: 'cash-app-logo.png', kind: 'png', cat: 'Financial Services' },
  { name: 'S&P Global', file: 'sp-global-logo.png', kind: 'png', cat: 'Financial Services' },
  { name: 'Morningstar', file: 'morningstar-logo.png', kind: 'png', cat: 'Financial Services' },
  { name: 'PitchBook', file: 'pitchbook-logo.png', kind: 'png', cat: 'Financial Services' },
  { name: 'Daloopa', file: 'daloopa-logo.png', kind: 'png', cat: 'Financial Services' },
  { name: 'Fitch Solutions', file: 'fitch-solutions-logo.png', kind: 'png', cat: 'Financial Services' },
  // Consumer Health
  { name: 'MedlinePlus', file: 'medlineplus-logo.png', kind: 'png', cat: 'Consumer Health' },
  // Health & Life Sciences
  { name: 'RxNorm', file: 'rxnorm-logo.png', kind: 'png', cat: 'Health & Life Sciences' },
  { name: 'Synapse.org', file: 'synapse-logo.png', kind: 'png', cat: 'Health & Life Sciences' },
  { name: 'DrugBank', file: 'drugbank-logo.png', kind: 'png', cat: 'Health & Life Sciences' },
  // Healthcare
  { name: 'DrugData', file: 'drugdata-logo.png', kind: 'png', cat: 'Healthcare' },
  { name: 'FdaSafety', file: 'fdasafety-logo.png', kind: 'png', cat: 'Healthcare' },
  // Legal
  { name: 'Courtroom5', file: 'courtroom5-logo.png', kind: 'png', cat: 'Legal' },
  { name: 'Descrybe Legal Engine', file: 'descrybe-logo.png', kind: 'png', cat: 'Legal' },
  // Media
  { name: 'Melon', file: 'melon-logo.png', kind: 'png', cat: 'Media' },
  // Nonprofit
  { name: 'Kindora Funder Discovery', file: 'kindora-logo.png', kind: 'png', cat: 'Nonprofit' },
  // Other
  { name: 'AllTrails', file: 'alltrails-logo.png', kind: 'png', cat: 'Other' },
  { name: 'BoardWise', file: 'boardwise-logo.png', kind: 'png', cat: 'Other' },
  { name: 'Google Calendar', file: 'google-calendar-logo.png', kind: 'png', cat: 'Other' },
  { name: 'Malwarebytes', file: 'malwarebytes-logo.png', kind: 'png', cat: 'Other' },
  { name: 'Tripadvisor', file: 'tripadvisor-logo.png', kind: 'png', cat: 'Other' },
  { name: 'Turkish Airlines', file: 'turkish-airlines-logo.png', kind: 'png', cat: 'Other' },
  { name: 'ZipRecruiter', file: 'ziprecruiter-logo.png', kind: 'png', cat: 'Other' },
  { name: 'Smartsheet', file: 'smartsheet-logo.png', kind: 'png', cat: 'Other' },
  { name: 'Microsoft 365 apps', file: 'microsoft-365-20-regular.svg', kind: 'glyph', cat: 'Other' },
  { name: 'Google Drive', file: 'google-drive-logo.png', kind: 'png', cat: 'Other' },
];

// ─── Tenant sources (enabled by the admin, not user-connected) ───
const TENANT: Logo[] = [
  { name: 'ServiceNow', file: 'servicenow-logo.png', kind: 'png', cat: 'Tenant' },
  { name: 'Azure DevOps', file: 'azure-devops-logo.svg', kind: 'svg', cat: 'Tenant' },
];

function tile(l: Logo): string {
  return '<div class="tile"><div class="tile__logo">' + logoMarkup(l) + '</div><div class="tile__name">' + l.name + '</div></div>';
}
function grid(list: Logo[]): string {
  return '<div class="grid">' + list.map(tile).join('') + '</div>';
}
function catCard(cat: string): string {
  const list = CONNECTORS.filter(function (c) { return c.cat === cat; });
  if (!list.length) return '';
  const syns = SYNONYMS[cat] || [];
  const synHtml = syns.length
    ? '<div class="card__syns">' + syns.map(function (s) { return '<span class="syn">' + s + '</span>'; }).join('') + '</div>'
    : '';
  return '<div class="card"><div class="card__head"><span class="card__title">' + cat + '</span>'
    + '<span class="card__count">' + list.length + '</span></div>' + synHtml + grid(list) + '</div>';
}

const SHIELD = readSvgGlyph('shield-task-20-regular');
const tenantCard = '<div class="card card--tenant">'
  + '<div class="card__head"><span class="card__title-wrap"><span class="card__shield">' + SHIELD + '</span>'
  + '<span class="card__title">Tenant sources</span></span><span class="card__count">' + TENANT.length + '</span></div>'
  + '<div class="card__sub2">Enabled by your admin \u2014 managed centrally, not user-connected.</div>'
  + grid(TENANT) + '</div>';

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px 64px; color: #242424; }
.wrap { max-width: 1040px; margin: 0 auto; }
h1 { font-size: 24px; font-weight: 600; letter-spacing: -0.2px; text-align: center; }
.sub { font-size: 13px; color: #6f6f6f; text-align: center; margin: 6px 0 32px; }
.card { background: #fff; border: 1px solid #ececec; border-radius: 16px; padding: 24px 28px 28px; box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04); }
.card + .card { margin-top: 20px; }
.card--tenant { border-color: #cfe0f5; background: #f6faff; }
.card__head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 18px; }
.card__title-wrap { display: flex; align-items: center; gap: 8px; }
.card__shield { display: inline-flex; width: 20px; height: 20px; color: #0f6cbd; }
.card__shield svg { width: 20px; height: 20px; }
.card__title { font-size: 16px; font-weight: 600; }
.card__count { font-size: 12px; color: #6f6f6f; }
.card__sub2 { font-size: 12px; line-height: 16px; color: #5d5d5d; margin: -12px 0 18px; }
.card__syns { display: flex; flex-wrap: wrap; gap: 6px; margin: -8px 0 18px; }
.syn { display: inline-flex; align-items: center; height: 20px; padding: 0 8px; border-radius: 9999px; background: #f0f0f0; font-size: 11px; line-height: 14px; color: #5d5d5d; white-space: nowrap; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(148px, 1fr)); gap: 12px; }
.tile { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 18px 10px 14px; border: 1px solid #ebebeb; border-radius: 12px; background: #fff; transition: background 0.1s, border-color 0.1s, box-shadow 0.1s; }
.tile:hover { background: #fafafa; border-color: #dedede; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
.tile__logo { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #f8f8f8; }
.tile__logo img { width: 100%; height: 100%; object-fit: contain; }
.tile__svg { width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; }
.tile__svg svg { width: 40px; height: 40px; }
.tile__glyph { width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; color: #5b5fc7; }
.tile__glyph svg { width: 40px; height: 40px; }
.tile__missing { font-size: 20px; color: #b0b0b0; }
.tile__name { font-size: 12px; line-height: 16px; font-weight: 600; text-align: center; color: #242424; word-break: break-word; }
`;

const body = [
  '<div class="wrap">',
  '<h1>Connector Logos</h1>',
  '<p class="sub">Company logos in the design system icon set, grouped by category. ServiceNow and Azure DevOps are tenant sources \u2014 enabled centrally by the admin.</p>',
  tenantCard,
  CATS.map(catCard).join('\n'),
  '</div>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Connector Logos Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'connectorLogos.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
