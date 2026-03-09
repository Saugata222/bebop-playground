/**
 * Settings — Interactive HTML Preview (Sources Tab)
 *
 * Shows the settings dialog with left nav pane and Sources content:
 *   - Title bar with breadcrumb and dismiss
 *   - 5 nav items (Sources selected with blue pill)
 *   - Connected source card (Notion)
 *   - Connect more grid (8 connector cards)
 *
 * Usage:  npx tsx preview/src/settings.ts
 * Output: preview/dist/settings.html
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Icons ──────────────────────────────────────────────────

const settingsIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.91099 7.38266C2.28028 6.24053 2.88863 5.19213 3.69133 4.30364C3.82707 4.15339 4.04002 4.09984 4.23069 4.16802L6.14897 4.85392C6.66905 5.03977 7.24131 4.76883 7.42716 4.24875C7.44544 4.19762 7.45952 4.14507 7.46925 4.09173L7.83471 2.08573C7.87104 1.88627 8.02422 1.7285 8.22251 1.6863C8.8027 1.5628 9.39758 1.5 10.0003 1.5C10.6026 1.5 11.1971 1.56273 11.7769 1.68607C11.9752 1.72824 12.1284 1.88591 12.1648 2.08529L12.5313 4.09165C12.6303 4.63497 13.1511 4.9951 13.6944 4.89601C13.7479 4.88627 13.8004 4.87219 13.8515 4.85395L15.7698 4.16802C15.9605 4.09984 16.1734 4.15339 16.3092 4.30364C17.1119 5.19213 17.7202 6.24053 18.0895 7.38266C18.1518 7.57534 18.0918 7.78658 17.9374 7.91764L16.3825 9.23773C15.9615 9.5952 15.9101 10.2263 16.2675 10.6473C16.3027 10.6887 16.3411 10.7271 16.3825 10.7623L17.9374 12.0824C18.0918 12.2134 18.1518 12.4247 18.0895 12.6173C17.7202 13.7595 17.1119 14.8079 16.3092 15.6964C16.1734 15.8466 15.9605 15.9002 15.7698 15.832L13.8515 15.1461C13.3315 14.9602 12.7592 15.2312 12.5733 15.7512C12.5551 15.8024 12.541 15.8549 12.5312 15.9085L12.1648 17.9147C12.1284 18.1141 11.9752 18.2718 11.7769 18.3139C11.1971 18.4373 10.6026 18.5 10.0003 18.5C9.39758 18.5 8.8027 18.4372 8.22251 18.3137C8.02422 18.2715 7.87104 18.1137 7.83471 17.9143L7.46926 15.9084C7.37018 15.365 6.8494 15.0049 6.30608 15.104C6.25265 15.1137 6.20011 15.1278 6.14906 15.1461L4.23069 15.832C4.04002 15.9002 3.82707 15.8466 3.69133 15.6964C2.88863 14.8079 2.28028 13.7595 1.91099 12.6173C1.84869 12.4247 1.90876 12.2134 2.06313 12.0824L3.61798 10.7623C4.03897 10.4048 4.09046 9.77373 3.73299 9.35274C3.69784 9.31135 3.65937 9.27288 3.618 9.23775L2.06313 7.91764C1.90876 7.78658 1.84869 7.57534 1.91099 7.38266ZM7.50026 10C7.50026 8.61929 8.61954 7.5 10.0003 7.5C11.381 7.5 12.5003 8.61929 12.5003 10C12.5003 11.3807 11.381 12.5 10.0003 12.5C8.61954 12.5 7.50026 11.3807 7.50026 10Z" fill="currentColor"/></svg>';

const dataUsageIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10C9.72386 10 9.5 10.2239 9.5 10.5V13.5C9.5 13.7761 9.72386 14 10 14C10.2761 14 10.5 13.7761 10.5 13.5V10.5C10.5 10.2239 10.2761 10 10 10ZM6 8.5C6 8.22386 6.22386 8 6.5 8C6.77614 8 7 8.22386 7 8.5V13.5C7 13.7761 6.77614 14 6.5 14C6.22386 14 6 13.7761 6 13.5V8.5ZM13.5 6C13.2239 6 13 6.22386 13 6.5V13.5C13 13.7761 13.2239 14 13.5 14C13.7761 14 14 13.7761 14 13.5V6.5C14 6.22386 13.7761 6 13.5 6ZM3 5C3 3.89543 3.89543 3 5 3H15C16.1046 3 17 3.89543 17 5V15C17 16.1046 16.1046 17 15 17H5C3.89543 17 3 16.1046 3 15V5ZM4 5V15C4 15.5523 4.44772 16 5 16H15C15.5523 16 16 15.5523 16 15V5C16 4.44772 15.5523 4 15 4H5C4.44772 4 4 4.44772 4 5Z" fill="currentColor"/></svg>';

const agentIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.20949 2.81648C5.53001 2.30825 6.08885 2 6.6897 2H9.50021C9.77635 2 10.0002 2.22386 10.0002 2.5C10.0002 2.77614 9.77635 3 9.50021 3H6.6897C6.43219 3 6.19269 3.13211 6.05533 3.34992L2.11367 9.59992C1.95951 9.84436 1.95951 10.1556 2.11367 10.4001L5.97726 16.5263C6.16322 16.8212 6.48744 17 6.83604 17C7.29602 17 7.69854 16.6908 7.81706 16.2463L11.218 3.49284C11.4527 2.61252 12.25 2 13.1611 2C13.8557 2 14.5011 2.35842 14.8682 2.94804L18.7888 9.24456C19.0768 9.70702 19.0768 10.293 18.7888 10.7554L14.7916 17.175C14.4721 17.6881 13.9105 18 13.306 18H10.5002C10.2241 18 10.0002 17.7761 10.0002 17.5C10.0002 17.2239 10.2241 17 10.5002 17H13.306C13.5651 17 13.8058 16.8663 13.9427 16.6464L17.9399 10.2269C18.0264 10.088 18.0264 9.91202 17.9399 9.77313L14.0193 3.47661C13.8347 3.18019 13.5103 3 13.1611 3C12.703 3 12.3022 3.30794 12.1842 3.75051L8.78329 16.504C8.54804 17.3862 7.74907 18 6.83604 18C6.1441 18 5.50054 17.645 5.13143 17.0597L1.26783 10.9335C0.908119 10.3632 0.908119 9.63685 1.26783 9.06648L5.20949 2.81648Z" fill="currentColor"/></svg>';

const peopleSettingsIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 5.75C4.5 4.50736 5.50736 3.5 6.75 3.5C7.99264 3.5 9 4.50736 9 5.75C9 6.99264 7.99264 8 6.75 8C5.50736 8 4.5 6.99264 4.5 5.75ZM6.75 2.5C4.95507 2.5 3.5 3.95507 3.5 5.75C3.5 7.54493 4.95507 9 6.75 9C8.54493 9 10 7.54493 10 5.75C10 3.95507 8.54493 2.5 6.75 2.5ZM1.5 12C1.5 10.8954 2.39543 10 3.5 10H10C10.3612 10 10.7001 10.0958 10.9926 10.2633C10.7157 10.4928 10.4617 10.7489 10.2345 11.0276C10.1593 11.0096 10.0808 11 10 11H3.5C2.94772 11 2.5 11.4477 2.5 12V12.0602L2.50063 12.0781C2.50141 12.0951 2.50313 12.1233 2.50686 12.1611C2.51433 12.2368 2.52976 12.3497 2.56146 12.4874C2.62512 12.7638 2.75235 13.1312 3.00512 13.497C3.4916 14.2012 4.51315 15 6.75 15C7.70399 15 8.43693 14.8547 9.00159 14.6334C9.00989 14.9824 9.05071 15.3233 9.12112 15.6533C8.47689 15.8698 7.69552 16 6.75 16C4.23685 16 2.8834 15.0801 2.18238 14.0655C1.8414 13.5719 1.67175 13.08 1.58697 12.7118C1.54446 12.5272 1.52278 12.3716 1.5117 12.2593C1.50614 12.2031 1.50322 12.1574 1.50169 12.1241L1.50005 12.0705L1.5 12.064V12ZM13 6.5C13 5.67157 13.6716 5 14.5 5C15.3284 5 16 5.67157 16 6.5C16 7.32843 15.3284 8 14.5 8C13.6716 8 13 7.32843 13 6.5ZM14.5 4C13.1193 4 12 5.11929 12 6.5C12 7.88071 13.1193 9 14.5 9C15.8807 9 17 7.88071 17 6.5C17 5.11929 15.8807 4 14.5 4Z" fill="currentColor"/></svg>';

const flowIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 5C13.8954 5 13 5.89543 13 7C13 8.10457 13.8954 9 15 9C16.1046 9 17 8.10457 17 7C17 5.89543 16.1046 5 15 5ZM12.0415 6.5C12.2795 5.08114 13.5135 4 15 4C16.6569 4 18 5.34315 18 7C18 8.65685 16.6569 10 15 10C13.5135 10 12.2795 8.91886 12.0415 7.5H12C11.1716 7.5 10.5 8.17157 10.5 9V11.0001C10.5 12.3808 9.38071 13.5001 8 13.5001H7.9585C7.72042 14.9189 6.48646 16 5 16C3.34315 16 2 14.6569 2 13C2 11.3431 3.34315 10 5 10C6.48654 10 7.72055 11.0812 7.95854 12.5001H8C8.82843 12.5001 9.5 11.8285 9.5 11.0001V9C9.5 7.61929 10.6193 6.5 12 6.5H12.0415ZM5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11Z" fill="currentColor"/></svg>';

const dismissIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.08859 4.21569L4.14645 4.14645C4.32001 3.97288 4.58944 3.9536 4.78431 4.08859L4.85355 4.14645L10 9.293L15.1464 4.14645C15.32 3.97288 15.5894 3.9536 15.7843 4.08859L15.8536 4.14645C16.0271 4.32001 16.0464 4.58944 15.9114 4.78431L15.8536 4.85355L10.707 10L15.8536 15.1464C16.0271 15.32 16.0464 15.5894 15.9114 15.7843L15.8536 15.8536C15.68 16.0271 15.4106 16.0464 15.2157 15.9114L15.1464 15.8536L10 10.707L4.85355 15.8536C4.67999 16.0271 4.41056 16.0464 4.21569 15.9114L4.14645 15.8536C3.97288 15.68 3.9536 15.4106 4.08859 15.2157L4.14645 15.1464L9.293 10L4.14645 4.85355C3.97288 4.67999 3.9536 4.41056 4.08859 4.21569Z" fill="currentColor"/></svg>';

const moreIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 10C6.25 10.6904 5.69036 11.25 5 11.25C4.30964 11.25 3.75 10.6904 3.75 10C3.75 9.30964 4.30964 8.75 5 8.75C5.69036 8.75 6.25 9.30964 6.25 10ZM11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10ZM15 11.25C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25Z" fill="currentColor"/></svg>';

const chevRightIco = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.64645 2.14645C4.45118 2.34171 4.45118 2.65829 4.64645 2.85355L7.79289 6L4.64645 9.14645C4.45118 9.34171 4.45118 9.65829 4.64645 9.85355C4.84171 10.0488 5.15829 10.0488 5.35355 9.85355L8.85355 6.35355C9.04882 6.15829 9.04882 5.84171 8.85355 5.64645L5.35355 2.14645C5.15829 1.95118 4.84171 1.95118 4.64645 2.14645Z" fill="currentColor"/></svg>';

// ─── Connector logos (colored placeholder circles) ──────────

function logoCircle(color: string, letter: string): string {
  return '<div style="width:20px;height:20px;border-radius:6px;background:' + color + ';display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700;">' + letter + '</div>';
}

function logoBig(color: string, letter: string): string {
  return '<div style="width:32px;height:32px;border-radius:8px;background:' + color + ';display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:700;">' + letter + '</div>';
}

// ─── CSS ────────────────────────────────────────────────────

let css = '';
css += "*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n";
css += "html, body { height: 100%; font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif; color: #242424; background: #e8e8e8; display: flex; align-items: center; justify-content: center; }\n";

// Scrollbar
css += '::-webkit-scrollbar { width: 6px; background: transparent; }\n';
css += '::-webkit-scrollbar-thumb { background: #6f6f6f; border-radius: 9999px; border: 2px solid transparent; background-clip: content-box; }\n';
css += '::-webkit-scrollbar-thumb:hover { border-width: 0; }\n';
css += '::-webkit-scrollbar-track { background: transparent; }\n';

// Dialog surface
css += ".stg { width: 800px; height: 600px; background: #fff; border-radius: 24px; box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.2), 0px 14px 28px 0px rgba(0,0,0,0.24); display: flex; flex-direction: column; overflow: hidden; }\n";

// Title bar
css += ".stg__title { display: flex; align-items: center; height: 64px; padding: 8px 20px; background: #fff; border-radius: 24px 24px 0 0; flex-shrink: 0; }\n";
css += ".stg__breadcrumb { display: flex; align-items: center; gap: 4px; flex: 1; }\n";
css += ".stg__bc-text { font-size: 14px; color: #616161; line-height: 20px; }\n";
css += ".stg__bc-chev { display: flex; align-items: center; color: #616161; }\n";
css += ".stg__bc-chev svg { width: 12px; height: 12px; }\n";
css += ".stg__bc-active { font-size: 14px; color: #242424; line-height: 20px; }\n";
css += ".stg__dismiss { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; background: transparent; cursor: pointer; border-radius: 9999px; color: #242424; transition: background 0.1s; }\n";
css += ".stg__dismiss:hover { background: rgba(0,0,0,0.04); }\n";
css += ".stg__dismiss svg { width: 20px; height: 20px; }\n";

// Body (nav + content)
css += ".stg__body { display: flex; flex: 1; overflow: hidden; }\n";

// Nav pane
css += ".stg__nav { width: 220px; flex-shrink: 0; padding-top: 16px; display: flex; flex-direction: column; }\n";
css += ".stg__nav-menu { display: flex; flex-direction: column; padding-left: 20px; }\n";

// Nav item
css += ".stg__ni { display: flex; align-items: center; height: 40px; padding: 3px 0; width: 100%; border: none; cursor: pointer; background: transparent; font-family: inherit; text-align: left; outline: none; }\n";
css += ".stg__ni-inner { display: flex; align-items: center; gap: 8px; height: 100%; flex: 1; padding: 0 12px 0 10px; border-radius: 4px; transition: background 0.1s; }\n";
css += ".stg__ni:hover .stg__ni-inner { background: rgba(0,0,0,0.04); }\n";
css += ".stg__ni-icon { width: 20px; height: 20px; flex-shrink: 0; color: #242424; }\n";
css += ".stg__ni-icon svg { display: block; width: 20px; height: 20px; }\n";
css += ".stg__ni-label { font-size: 14px; font-weight: 400; line-height: 20px; color: #242424; }\n";

// Nav item selected
css += ".stg__ni--sel { height: 48px; }\n";
css += ".stg__ni--sel .stg__ni-inner { background: rgba(0,0,0,0.04); border-radius: 12px; position: relative; }\n";
css += ".stg__ni--sel .stg__ni-inner::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 16px; background: #464feb; border-radius: 999px; }\n";
css += ".stg__ni--sel:hover .stg__ni-inner { background: rgba(0,0,0,0.06); }\n";

// Content area
css += ".stg__content { flex: 1; overflow-y: auto; padding: 24px 24px 24px 0; display: flex; flex-direction: column; gap: 24px; }\n";

// Sources header
css += ".stg__src-header { display: flex; flex-direction: column; gap: 10px; }\n";
css += ".stg__src-title { font-size: 20px; font-weight: 700; line-height: 28px; color: #242424; }\n";
css += ".stg__src-desc { font-size: 14px; font-weight: 400; line-height: 20px; color: #424242; }\n";
css += ".stg__src-link { color: #464feb; text-decoration: none; cursor: pointer; }\n";
css += ".stg__src-link:hover { text-decoration: underline; }\n";

// Connected card
css += ".stg__connected { border: 1px solid #e0e0e0; border-radius: 12px; padding: 16px; background: #fff; display: flex; align-items: center; }\n";
css += ".stg__connected-info { display: flex; align-items: center; gap: 12px; flex: 1; }\n";
css += ".stg__connected-logo { width: 32px; height: 32px; flex-shrink: 0; }\n";
css += ".stg__connected-text { display: flex; flex-direction: column; gap: 4px; }\n";
css += ".stg__connected-name { font-size: 14px; font-weight: 600; line-height: 20px; color: #242424; }\n";
css += ".stg__connected-caption { font-size: 12px; font-weight: 400; line-height: 16px; color: #424242; }\n";
css += ".stg__connected-more { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; background: transparent; cursor: pointer; border-radius: 9999px; color: #242424; transition: background 0.1s; flex-shrink: 0; }\n";
css += ".stg__connected-more:hover { background: rgba(0,0,0,0.04); }\n";
css += ".stg__connected-more svg { width: 20px; height: 20px; }\n";

// Section title
css += ".stg__section-title { font-size: 16px; font-weight: 600; line-height: 24px; color: #242424; }\n";

// Connector grid
css += ".stg__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n";
css += ".stg__card { border: 1px solid #e0e0e0; border-radius: 12px; padding: 16px; background: #fff; display: flex; flex-direction: column; gap: 4px; cursor: pointer; transition: background 0.1s; border: 1px solid #e0e0e0; }\n";
css += ".stg__card:hover { background: rgba(0,0,0,0.04); }\n";
css += ".stg__card-icon { width: 20px; height: 20px; flex-shrink: 0; }\n";
css += ".stg__card-name { font-size: 14px; font-weight: 600; line-height: 20px; color: #242424; }\n";

// Connect more section
css += ".stg__connect-section { display: flex; flex-direction: column; gap: 16px; }\n";

// ─── HTML ───────────────────────────────────────────────────

let html = '<!DOCTYPE html>';
html += '<html lang="en">';
html += '<head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Settings \u2014 Bebop Design System Preview</title>';
html += '<style>' + css + '</style>';
html += '</head>';
html += '<body>';

// Dialog
html += '<div class="stg">';

// Title bar
html += '<div class="stg__title">';
html += '<div class="stg__breadcrumb">';
html += '<span class="stg__bc-text">Settings</span>';
html += '<span class="stg__bc-chev">' + chevRightIco + '</span>';
html += '<span class="stg__bc-active">Chat settings</span>';
html += '</div>';
html += '<button class="stg__dismiss" title="Close">' + dismissIco + '</button>';
html += '</div>';

// Body
html += '<div class="stg__body">';

// Nav pane
html += '<div class="stg__nav">';
html += '<div class="stg__nav-menu">';

// Nav items
const navItems = [
  { icon: settingsIco, label: 'General' },
  { icon: dataUsageIco, label: 'Data controls' },
  { icon: agentIco, label: 'Agents' },
  { icon: peopleSettingsIco, label: 'Personalization' },
  { icon: flowIco, label: 'Sources', selected: true },
];

for (const item of navItems) {
  const sel = (item as { selected?: boolean }).selected ? ' stg__ni--sel' : '';
  html += '<button class="stg__ni' + sel + '">';
  html += '<div class="stg__ni-inner">';
  html += '<span class="stg__ni-icon">' + item.icon + '</span>';
  html += '<span class="stg__ni-label">' + item.label + '</span>';
  html += '</div>';
  html += '</button>';
}

html += '</div>'; // nav-menu
html += '</div>'; // nav

// Content area
html += '<div class="stg__content">';

// Sources header
html += '<div class="stg__src-header">';
html += '<div class="stg__src-title">Sources</div>';
html += '<div class="stg__src-desc">Manage the sources Copilot uses to find and retrieve content for you. <a class="stg__src-link" href="#">Learn more.</a></div>';
html += '</div>';

// Connected source card
html += '<div class="stg__connected">';
html += '<div class="stg__connected-info">';
html += '<div class="stg__connected-logo">' + logoBig('#000', 'N') + '</div>';
html += '<div class="stg__connected-text">';
html += '<div class="stg__connected-name">Notion</div>';
html += '<div class="stg__connected-caption">Used in Chat and Researcher</div>';
html += '</div>';
html += '</div>';
html += '<button class="stg__connected-more" title="More">' + moreIco + '</button>';
html += '</div>';

// Connect more section
html += '<div class="stg__connect-section">';
html += '<div class="stg__section-title">Connect more</div>';

// Connector grid
html += '<div class="stg__grid">';

const connectors = [
  { color: '#00C4CC', letter: 'C', name: 'Canva' },
  { color: '#1A73E8', letter: 'C', name: 'Confluence' },
  { color: '#4285F4', letter: 'G', name: 'Google Calendar' },
  { color: '#4285F4', letter: 'G', name: 'Google Contacts' },
  { color: '#FF6B35', letter: 'I', name: 'Intercom' },
  { color: '#34A853', letter: 'G', name: 'Google Drive' },
  { color: '#5E6AD2', letter: 'L', name: 'Linear' },
  { color: '#4A154B', letter: 'S', name: 'Slack' },
];

for (const c of connectors) {
  html += '<div class="stg__card">';
  html += '<div class="stg__card-icon">' + logoCircle(c.color, c.letter) + '</div>';
  html += '<div class="stg__card-name">' + c.name + '</div>';
  html += '</div>';
}

html += '</div>'; // grid
html += '</div>'; // connect-section

html += '</div>'; // content
html += '</div>'; // body
html += '</div>'; // stg

// Script — nav item single selection
html += '<script>';
html += 'document.querySelectorAll(".stg__ni").forEach(function(el) {';
html += '  el.addEventListener("click", function() {';
html += '    document.querySelectorAll(".stg__ni--sel").forEach(function(s) { s.classList.remove("stg__ni--sel"); });';
html += '    el.classList.add("stg__ni--sel");';
html += '  });';
html += '});';
html += '</script>';

html += '</body>';
html += '</html>';

// ─── Write ──────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.join(outDir, 'settings.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
