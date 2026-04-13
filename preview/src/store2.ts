/**
 * Store Model 2 — Agents + Skills in Store, Sources in Settings
 *
 * Renders the Copilot shell with:
 *   - Store view: Two tabs (Agents | Skills)
 *   - Settings panel: Sources managed separately with toggles
 *
 * Usage:  npx tsx preview/src/store2.ts
 * Output: preview/dist/store2.html
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, ' ').trim();
}

// ─── Icons ──────────────────────────────────────────────────
const copilotIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.92704 2H12.1392C13.1927 2 14.1203 2.69397 14.4176 3.7046L14.8868 5.29901C15.0476 5.84546 15.5266 6.232 16.086 6.28068H16.3751C17.2627 6.28068 17.9479 6.53232 18.4023 7.04832C18.8449 7.55084 18.9913 8.21838 19.0009 8.88707C19.02 10.208 18.5033 11.849 18.0916 13.1554C17.7333 14.2924 17.273 15.4729 16.6552 16.3777C16.0399 17.2788 15.1999 18.0006 14.073 18.0006H7.87484L7.86695 18.0005H7.86063C6.80716 18.0005 5.87959 17.3066 5.58222 16.296L5.11309 14.7015C4.95237 14.1553 4.47368 13.7689 3.91456 13.7199H3.62488C2.73727 13.7199 2.05209 13.4683 1.59766 12.9523C1.15509 12.4498 1.00872 11.7822 0.999049 11.1135C0.979951 9.7926 1.49665 8.15165 1.90838 6.84517C2.26667 5.70826 2.72694 4.52772 3.34477 3.62288C3.96005 2.72178 4.80007 2 5.92704 2Z" fill="currentColor"/></svg>';
const searchIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7291 14.4362C12.5924 15.411 11.115 16 9.5 16C5.91015 16 3 13.0899 3 9.5C3 5.91015 5.91015 3 9.5 3C13.0899 3 16 5.91015 16 9.5C16 11.115 15.411 12.5924 14.4361 13.7292L17.8535 17.1465C18.0487 17.3417 18.0487 17.6583 17.8535 17.8536L13.7291 14.4362ZM15 9.5C15 6.46243 12.5376 4 9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15C10.8388 15 12.0658 14.5217 13.0196 13.7266Z" fill="currentColor"/></svg>';
const composeIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 4.00003C10.7761 4.00003 11 4.22389 11 4.50003C10.9999 4.77614 10.7761 5.00003 10.5 5.00003H6C4.89543 5.00003 4 5.89546 4 7.00002V14C4.00004 15.1045 4.89545 16 6 16H13C14.1045 16 14.9999 15.1045 15 14V9.50002C15 9.22388 15.2238 9.00002 15.5 9.00002ZM16.1465 3.14652C16.3417 2.95126 16.6582 2.95126 16.8535 3.14652C17.0487 3.34179 17.0487 3.65832 16.8535 3.85355L9.06054 11.6455L7.99999 12L8.35351 10.9395L16.1465 3.14652Z" fill="currentColor"/></svg>';
const folderIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 3C3.11929 3 2 4.11929 2 5.5V14.5C2 15.8807 3.11929 17 4.5 17H15.5C16.8807 17 18 15.8807 18 14.5V7.5C18 6.11929 16.8807 5 15.5 5H9.70711L8.21967 3.51256C7.89148 3.18437 7.44636 3 6.98223 3H4.5Z" fill="currentColor"/></svg>';
const gridDotsIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 4C5.25 4.69036 4.69036 5.25 4 5.25C3.30964 5.25 2.75 4.69036 2.75 4C2.75 3.30964 3.30964 2.75 4 2.75C4.69036 2.75 5.25 3.30964 5.25 4ZM17.25 16C17.25 16.6904 16.6904 17.25 16 17.25C15.3096 17.25 14.75 16.6904 14.75 16C14.75 15.3096 15.3096 14.75 16 14.75C16.6904 14.75 17.25 15.3096 17.25 16ZM16 11.25C16.6904 11.25 17.25 10.6904 17.25 10C17.25 9.30964 16.6904 8.75 16 8.75C15.3096 8.75 14.75 9.30964 14.75 10C14.75 10.6904 15.3096 11.25 16 11.25ZM17.25 4C17.25 4.69036 16.6904 5.25 16 5.25C15.3096 5.25 14.75 4.69036 14.75 4C14.75 3.30964 15.3096 2.75 16 2.75C16.6904 2.75 17.25 3.30964 17.25 4ZM10 17.25C10.6904 17.25 11.25 16.6904 11.25 16C11.25 15.3096 10.6904 14.75 10 14.75C9.30964 14.75 8.75 15.3096 8.75 16C8.75 16.6904 9.30964 17.25 10 17.25ZM11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10ZM10 5.25C10.6904 5.25 11.25 4.69036 11.25 4C11.25 3.30964 10.6904 2.75 10 2.75C9.30964 2.75 8.75 3.30964 8.75 4C8.75 4.69036 9.30964 5.25 10 5.25ZM5.25 16C5.25 16.6904 4.69036 17.25 4 17.25C3.30964 17.25 2.75 16.6904 2.75 16C2.75 15.3096 3.30964 14.75 4 14.75C4.69036 14.75 5.25 15.3096 5.25 16ZM4 11.25C4.69036 11.25 5.25 10.6904 5.25 10C5.25 9.30964 4.69036 8.75 4 8.75C3.30964 8.75 2.75 9.30964 2.75 10C2.75 10.6904 3.30964 11.25 4 11.25Z" fill="currentColor"/></svg>';
const chatIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C8.72679 18 7.49591 17.7018 6.38669 17.1393L6.266 17.075L2.62109 17.9851C2.31127 18.0625 2.02622 17.8369 2.00131 17.5438L2.00114 17.4624L2.01493 17.3787L2.925 13.735L2.86169 13.6153C2.4066 12.7186 2.12433 11.7422 2.03275 10.7283L2.00738 10.3463L2 10C2 5.58172 5.58172 2 10 2Z" fill="currentColor"/></svg>';
const alertIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99766 2C13.1466 2 15.7416 4.33488 15.9821 7.3554L15.9955 7.57762L16 7.80214L15.999 11.398L16.9244 13.6202C16.947 13.6743 16.9647 13.7302 16.9774 13.7871L16.9926 13.8733L17.0013 14.0046C17.0013 14.4526 16.7048 14.8387 16.2521 14.9677L16.1358 14.9945L16.0013 15.0046L12.4996 15.004L12.4946 15.1653C12.4095 16.469 11.3252 17.5 10 17.5C8.67453 17.5 7.58998 16.4685 7.50533 15.1644L7.49962 15.004L3.99891 15.0046C3.91096 15.0046 3.82358 14.993 3.73902 14.9702L3.61456 14.9277C3.20378 14.7567 2.96181 14.3392 3.01221 13.8757L3.0333 13.7483L3.07572 13.6202L3.99902 11.401L4.0001 7.79281L4.0044 7.56824C4.12702 4.45115 6.77104 2 9.99766 2Z" fill="currentColor"/></svg>';
const chevDn12 = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.14645 4.64645C2.34171 4.45118 2.65829 4.45118 2.85355 4.64645L6 7.79289L9.14645 4.64645C9.34171 4.45118 9.65829 4.45118 9.85355 4.64645C10.0488 4.84171 10.0488 5.15829 9.85355 5.35355L6.35355 8.85355C6.15829 9.04882 5.84171 9.04882 5.64645 8.85355L2.14645 5.35355C1.95118 5.15829 1.95118 4.84171 2.14645 4.64645Z" fill="currentColor"/></svg>';
const arrowSyncIco16 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.14645 0.646447C7.34171 0.451184 7.65829 0.451184 7.85355 0.646447L9.35355 2.14645C9.54882 2.34171 9.54882 2.65829 9.35355 2.85355L7.85355 4.35355C7.65829 4.54882 7.34171 4.54882 7.14645 4.35355C6.95118 4.15829 6.95118 3.84171 7.14645 3.64645L7.7885 3.00439C5.12517 3.11522 3 5.30943 3 8C3 9.56799 3.72118 10.9672 4.85185 11.8847C5.06627 12.0587 5.09904 12.3736 4.92503 12.588Z" fill="currentColor"/></svg>';
const dismissIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.08859 4.21569L4.14645 4.14645C4.32001 3.97288 4.58944 3.9536 4.78431 4.08859L4.85355 4.14645L10 9.293L15.1464 4.14645C15.32 3.97288 15.5894 3.9536 15.7843 4.08859L15.8536 4.14645C16.0271 4.32 16.0464 4.58944 15.9114 4.78431L15.8536 4.85355L10.707 10L15.8536 15.1464C16.0271 15.32 16.0464 15.5894 15.9114 15.7843L15.8536 15.8536C15.68 16.0271 15.4106 16.0464 15.2157 15.9114L15.1464 15.8536L10 10.707L4.85355 15.8536C4.67999 16.0271 4.41056 16.0464 4.21569 15.9114L4.14645 15.8536C3.97288 15.68 3.9536 15.4106 4.08859 15.2157L4.14645 15.1464L9.293 10L4.14645 4.85355C3.97288 4.67999 3.9536 4.41056 4.08859 4.21569Z" fill="currentColor"/></svg>';
const moreHorizontalIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 10C6.25 10.6904 5.69036 11.25 5 11.25C4.30964 11.25 3.75 10.6904 3.75 10C3.75 9.30964 4.30964 8.75 5 8.75C5.69036 8.75 6.25 9.30964 6.25 10ZM11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10ZM15 11.25C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25Z" fill="currentColor"/></svg>';
const addIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5C10.2761 2.5 10.5 2.72386 10.5 3V9.5H17C17.2761 9.5 17.5 9.72386 17.5 10C17.5 10.2761 17.2761 10.5 17 10.5H10.5V17C10.5 17.2761 10.2761 17.5 10 17.5C9.72386 17.5 9.5 17.2761 9.5 17V10.5H3C2.72386 10.5 2.5 10.2761 2.5 10C2.5 9.72386 2.72386 9.5 3 9.5H9.5V3C9.5 2.72386 9.72386 2.5 10 2.5Z" fill="currentColor"/></svg>';
const agentIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.20949 2.81648C5.53001 2.30825 6.08885 2 6.6897 2H9.50021C9.77635 2 10.0002 2.22386 10.0002 2.5C10.0002 2.77614 9.77635 3 9.50021 3H6.6897C6.43219 3 6.19269 3.13211 6.05533 3.34992L2.11367 9.59992C1.95951 9.84436 1.95951 10.1556 2.11367 10.4001L5.97726 16.5263C6.16322 16.8212 6.48744 17 6.83604 17C7.29602 17 7.69854 16.6908 7.81706 16.2463L11.218 3.49284C11.4527 2.61252 12.25 2 13.1611 2C13.8557 2 14.5011 2.35842 14.8682 2.94804L18.7888 9.24456C19.0768 9.70702 19.0768 10.293 18.7888 10.7554L14.7916 17.175C14.4721 17.6881 13.9105 18 13.306 18H10.5002C10.2241 18 10.0002 17.7761 10.0002 17.5C10.0002 17.2239 10.2241 17 10.5002 17H13.306Z" fill="currentColor"/></svg>';
const chevronRightIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.64582 4.14708C7.84073 3.95147 8.15731 3.95147 8.35292 4.14708L13.8374 9.6108C14.0531 9.82574 14.0531 10.1751 13.8374 10.39L8.35292 15.855C8.15731 16.0499 7.84073 16.0493 7.64582 15.8537C7.4509 15.6581 7.45147 15.3415 7.64708 15.1466L12.8117 10.0004L7.64708 4.85418C7.45147 4.65927 7.4509 4.34269 7.64582 4.14708Z" fill="currentColor"/></svg>';
const storeIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3.5C3 3.22386 3.22386 3 3.5 3H16.5C16.7761 3 17 3.22386 17 3.5V5.5C17 6.32843 16.3284 7 15.5 7H15V15.5C15 16.3284 14.3284 17 13.5 17H6.5C5.67157 17 5 16.3284 5 15.5V7H4.5C3.67157 7 3 6.32843 3 5.5V3.5ZM4 4V5.5C4 5.77614 4.22386 6 4.5 6H15.5C15.7761 6 16 5.77614 16 5.5V4H4ZM6 7V15.5C6 15.7761 6.22386 16 6.5 16H13.5C13.7761 16 14 15.7761 14 15.5V7H6ZM8 9C8 8.72386 8.22386 8.5 8.5 8.5H11.5C11.7761 8.5 12 8.72386 12 9C12 9.27614 11.7761 9.5 11.5 9.5H8.5C8.22386 9.5 8 9.27614 8 9Z" fill="currentColor"/></svg>';
const settingsIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.775 2.27475C8.31 1.907 8.935 2 9.265 2H10.735C11.065 2 11.69 1.907 12.225 2.27475L12.304 2.33325L13.409 3.23175C13.487 3.29575 13.58 3.33925 13.68 3.35825L15.103 3.638C15.7455 3.764 16.2115 4.182 16.427 4.7545L16.465 4.871L16.938 6.5185C16.967 6.619 17.021 6.7095 17.095 6.7815L18.193 7.83975C18.643 8.274 18.805 8.879 18.664 9.478L18.627 9.5965L18.1 11.0235C18.065 11.118 18.055 11.221 18.072 11.32L18.312 12.7635C18.451 13.598 17.993 14.2475 17.54 14.5485L17.425 14.6165L16.107 15.2985C16.017 15.3445 15.941 15.413 15.886 15.4965L15.126 16.646C14.711 17.274 14.023 17.546 13.397 17.44L13.274 17.415L11.864 17.0565C11.765 17.031 11.66 17.031 11.56 17.0565L10.151 17.415C9.4255 17.599 8.7905 17.249 8.424 16.787L8.349 16.686L7.589 15.536C7.534 15.453 7.458 15.384 7.368 15.338L6.05 14.656C5.479 14.3615 5.124 13.749 5.1195 13.104L5.123 12.983L5.363 11.54C5.38 11.441 5.37 11.338 5.335 11.243L4.808 9.8165C4.597 9.2445 4.696 8.648 5.072 8.1685L5.162 8.063L6.26 7.0015C6.334 6.9295 6.388 6.839 6.417 6.7385L6.89 5.091C7.0685 4.4735 7.505 4.024 8.078 3.8475L8.199 3.815L9.622 3.535C9.722 3.516 9.815 3.47225 9.893 3.40875L10.998 2.509C11.076 2.44525 11.1585 2.38475 11.245 2.3305L11.402 2.25075L11.3 2.30125L10.998 2.509L9.893 3.40875C9.815 3.47225 9.722 3.516 9.622 3.535L8.199 3.815C7.9085 3.872 7.691 4.0625 7.5895 4.327L7.559 4.429L7.083 6.0775C7.008 6.3375 6.866 6.5735 6.672 6.7625L5.577 7.821L5.531 7.8735C5.373 8.0835 5.3305 8.3375 5.425 8.5825L5.958 10.0097L5.997 10.126C6.0905 10.396 6.1115 10.685 6.058 10.966L5.818 12.409L5.8105 12.4825C5.787 12.7845 5.9295 13.087 6.207 13.23L7.525 13.912L7.613 13.967C7.862 14.102 8.0685 14.305 8.211 14.553L8.972 15.703L9.023 15.774C9.1935 15.984 9.473 16.111 9.7525 16.04L11.162 15.682C11.437 15.612 11.726 15.612 12.001 15.682L13.41 16.04C13.6895 16.111 13.969 15.984 14.14 15.774L14.191 15.703L14.952 14.553C15.094 14.305 15.3005 14.102 15.55 13.967L15.637 13.912L16.955 13.23C17.233 13.087 17.3755 12.7845 17.352 12.4825L17.345 12.409L17.105 10.966C17.051 10.685 17.072 10.396 17.166 10.126L17.205 10.0097L17.738 8.5825C17.8325 8.3375 17.79 8.0835 17.632 7.8735L17.586 7.821L16.491 6.7625C16.297 6.5735 16.155 6.3375 16.08 6.0775L15.604 4.429L15.574 4.327C15.472 4.0625 15.254 3.872 14.964 3.815L13.541 3.535C13.441 3.516 13.348 3.47225 13.27 3.40875L12.165 2.509C11.946 2.331 11.643 2.25 11.37 2.282L11.245 2.3305L10.998 2.509L12.165 2.509ZM10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7ZM10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8Z" fill="currentColor"/></svg>';

function ico(color: string, letter: string): string {
  return `<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="10" fill="${color}"/><text x="18" y="24" text-anchor="middle" font-size="14" font-weight="600" fill="#fff" font-family="Segoe UI, sans-serif">${letter}</text></svg>`;
}
function icoLg(color: string, letter: string): string {
  return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="${color}"/><text x="24" y="31" text-anchor="middle" font-size="18" font-weight="600" fill="#fff" font-family="Segoe UI">${letter}</text></svg>`;
}

// ─── CSS ────────────────────────────────────────────────────
var css = '';
css += '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }';
css += '\n';
css += "html, body { height: 100%; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #242424; background: #fff; }";
css += '\n';
css += '.shell { display: flex; height: 100vh; background: #fff; }';
css += '\n';

// Nav (same as store1)
css += '.nav { width: 256px; min-width: 256px; background: #fff; display: flex; flex-direction: column; gap: 12px; padding: 8px 6px; overflow: hidden; flex-shrink: 0; border-right: 1px solid #dedede; }';
css += '\n';
css += '.nav__header { display: flex; align-items: center; justify-content: space-between; padding: 2px 0 0 0; }';
css += '\n';
css += '.nav__top { display: flex; flex-direction: column; flex-shrink: 0; }';
css += '\n';
css += '.nav__body { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }';
css += '\n';
css += '.nav__section { display: flex; flex-direction: column; }';
css += '\n';
css += '.nav__footer { flex-shrink: 0; display: flex; flex-direction: column; gap: 4px; }';
css += '\n';
css += '.nav__footer-row { display: flex; align-items: center; gap: 0; }';
css += '\n';
css += '.nhb { display: inline-flex; align-items: center; justify-content: center; padding: 8px 12px; border-radius: 12px; border: none; cursor: pointer; background: transparent; color: #242424; transition: background 0.1s; outline: none; position: relative; }';
css += '\n';
css += '.nhb:hover { background: rgba(36,36,36,0.04); }';
css += '\n';
css += '.nhb svg { display: block; width: 20px; height: 20px; }';
css += '\n';
css += '.nhb__badge { position: absolute; top: 4px; right: 4px; min-width: 16px; height: 16px; background: #242424; border-radius: 9999px; color: #fff; font-size: 10px; font-weight: 600; display: flex; align-items: center; justify-content: center; padding: 0 2px; }';
css += '\n';
css += '.ni { display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 6px 10px 6px 12px; border-radius: 12px; width: 100%; border: none; cursor: pointer; background: transparent; font-family: inherit; font-size: 14px; font-weight: 400; line-height: 1.4; color: #242424; text-align: left; transition: background 0.1s; outline: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-decoration: none; }';
css += '\n';
css += '.ni:hover { background: rgba(36,36,36,0.04); }';
css += '\n';
css += '.ni.sel { background: #ebebeb; font-weight: 600; }';
css += '\n';
css += '.ni.sel:hover { background: #e1e1e1; }';
css += '\n';
css += '.ni svg { display: block; flex-shrink: 0; width: 20px; height: 20px; }';
css += '\n';
css += '.ni__title { flex: 1 0 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; }';
css += '\n';
css += '.ni__right { display: flex; align-items: center; flex-shrink: 0; }';
css += '\n';
css += '.ni__right-icon { display: flex; align-items: center; padding: 4px; }';
css += '\n';
css += '.ni__right-icon svg { width: 16px; height: 16px; }';
css += '\n';
css += '.ni-split { display: flex; align-items: center; width: 100%; border-radius: 12px; }';
css += '\n';
css += '.ni-split .ni { flex: 1 0 0; width: auto; }';
css += '\n';
css += '.ni-split__sec { display: flex; align-items: center; justify-content: center; gap: 8px; height: 36px; padding: 6px 12px; border-radius: 12px; border: none; cursor: pointer; background: transparent; color: #242424; transition: background 0.1s; }';
css += '\n';
css += '.ni-split__sec:hover { background: rgba(36,36,36,0.04); }';
css += '\n';
css += '.ni-split__sec svg { display: block; width: 12px; height: 12px; }';
css += '\n';
css += '.nsh { width: 100%; padding: 6px; font-size: 12px; color: #6f6f6f; font-weight: 400; line-height: 16px; cursor: default; }';
css += '\n';
css += '.me { display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 3px 10px; border-radius: 12px; flex: 1; min-width: 0; background: transparent; cursor: pointer; border: none; font-family: inherit; text-align: left; transition: background 0.1s; color: #242424; }';
css += '\n';
css += '.me:hover { background: rgba(36,36,36,0.04); }';
css += '\n';
css += '.me__avatar { width: 28px; height: 28px; border-radius: 9999px; background: #d0d0d0; flex-shrink: 0; }';
css += '\n';
css += '.me__info { flex: 1 0 0; min-width: 0; display: flex; flex-direction: column; padding-bottom: 1px; }';
css += '\n';
css += '.me__name { font-size: 12px; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }';
css += '\n';
css += '.me__license { font-size: 10px; color: #6f6f6f; line-height: 1.4; }';
css += '\n';

// Main
css += '.main { flex: 1; display: flex; flex-direction: column; min-width: 0; position: relative; overflow: hidden; }';
css += '\n';

// Reuse store styles from store1 + add settings panel
css += '.model-banner { background: linear-gradient(135deg, #E8DEF8 0%, #D1ECF9 100%); padding: 12px 32px; font-size: 13px; font-weight: 600; color: #424242; display: flex; align-items: center; gap: 8px; flex-shrink: 0; }';
css += '\n';
css += '.model-banner__label { background: #fff; padding: 2px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; }';
css += '\n';

// Store header
css += '.store-hdr { display: flex; align-items: center; justify-content: space-between; height: 56px; padding: 0 32px; flex-shrink: 0; border-bottom: 1px solid #f0f0f0; }';
css += '\n';
css += ".store-hdr__title { font-size: 20px; font-weight: 600; }";
css += '\n';
css += '.store-hdr__actions { display: flex; align-items: center; gap: 8px; }';
css += '\n';
css += ".store-hdr__btn { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border-radius: 8px; border: 1px solid #dedede; background: #fff; cursor: pointer; font-family: inherit; font-size: 13px; color: #242424; transition: background 0.1s; }";
css += '\n';
css += '.store-hdr__btn:hover { background: #f5f5f5; }';
css += '\n';
css += '.store-hdr__btn svg { width: 16px; height: 16px; }';
css += '\n';

// Tabs
css += '.store-tabs { display: flex; gap: 0; padding: 0 32px; border-bottom: 1px solid #f0f0f0; flex-shrink: 0; }';
css += '\n';
css += ".store-tab { padding: 10px 16px; font-size: 14px; font-weight: 400; color: #5d5d5d; cursor: pointer; border: none; background: none; font-family: inherit; border-bottom: 2px solid transparent; transition: color 0.15s, border-color 0.15s; }";
css += '\n';
css += '.store-tab:hover { color: #242424; }';
css += '\n';
css += '.store-tab--active { color: #242424; font-weight: 600; border-bottom-color: #242424; }';
css += '\n';

// Search & content
css += ".store-search { margin: 24px 32px 0; display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 12px; border-radius: 8px; border: 1px solid #dedede; background: #fff; transition: border-color 0.15s; }";
css += '\n';
css += '.store-search:focus-within { border-color: #242424; }';
css += '\n';
css += '.store-search svg { width: 16px; height: 16px; color: #6f6f6f; flex-shrink: 0; }';
css += '\n';
css += ".store-search input { flex: 1; border: none; outline: none; font-family: inherit; font-size: 14px; background: transparent; color: #242424; }";
css += '\n';
css += '.store-search input::placeholder { color: #6f6f6f; }';
css += '\n';
css += '.store-content { flex: 1; overflow-y: auto; padding: 0 32px 32px; }';
css += '\n';
css += '.store-section { margin-top: 28px; }';
css += '\n';
css += ".store-section__title { font-size: 16px; font-weight: 600; margin-bottom: 16px; }";
css += '\n';

// Cards
css += '.card-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }';
css += '\n';
css += ".card-compact { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 12px; border: 1px solid #f0f0f0; background: #fff; cursor: pointer; transition: background 0.15s, box-shadow 0.15s; position: relative; min-width: 0; }";
css += '\n';
css += '.card-compact:hover { background: #fafafa; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }';
css += '\n';
css += '.card-compact__icon { width: 36px; height: 36px; flex-shrink: 0; }';
css += '\n';
css += '.card-compact__icon svg { display: block; }';
css += '\n';
css += '.card-compact__name { font-size: 13px; font-weight: 400; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0; }';
css += '\n';
css += '.card-compact__badge { position: absolute; top: 6px; right: 6px; font-size: 9px; font-weight: 600; padding: 1px 5px; border-radius: 4px; line-height: 14px; text-transform: uppercase; letter-spacing: 0.3px; }';
css += '\n';
css += '.card-compact__badge--agent { background: #E8DEF8; color: #6B4FBB; }';
css += '\n';
css += '.card-compact__badge--skill { background: #D1ECF9; color: #0078D4; }';
css += '\n';
css += '.card-compact__more { position: absolute; top: 6px; right: 6px; width: 24px; height: 24px; border-radius: 6px; border: none; background: rgba(255,255,255,0.9); cursor: pointer; display: none; align-items: center; justify-content: center; color: #5d5d5d; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }';
css += '\n';
css += '.card-compact:hover .card-compact__more { display: flex; }';
css += '\n';
css += '.card-compact:hover .card-compact__badge { display: none; }';
css += '\n';
css += '.card-compact__more svg { width: 16px; height: 16px; }';
css += '\n';

css += '.card-grid--lg { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }';
css += '\n';
css += ".card-lg { display: flex; align-items: flex-start; gap: 14px; padding: 16px 18px; border-radius: 16px; border: 1px solid #f0f0f0; background: #fff; cursor: pointer; transition: background 0.15s, box-shadow 0.15s; }";
css += '\n';
css += '.card-lg:hover { background: #fafafa; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }';
css += '\n';
css += '.card-lg__icon { width: 40px; height: 40px; flex-shrink: 0; }';
css += '\n';
css += '.card-lg__icon svg { display: block; }';
css += '\n';
css += '.card-lg__text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }';
css += '\n';
css += '.card-lg__name { font-size: 14px; font-weight: 600; line-height: 1.3; display: flex; align-items: center; gap: 6px; }';
css += '\n';
css += '.card-lg__desc { font-size: 13px; color: #5d5d5d; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }';
css += '\n';
css += '.card-lg__type { font-size: 10px; font-weight: 600; padding: 1px 6px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.3px; }';
css += '\n';

// ─── Settings panel (right side-panel for Sources) ───
css += '.settings-panel { display: none; position: absolute; top: 0; right: 0; bottom: 0; width: 420px; background: #fff; box-shadow: -4px 0 24px rgba(0,0,0,0.1); z-index: 500; flex-direction: column; border-left: 1px solid #f0f0f0; }';
css += '\n';
css += '.settings-panel--open { display: flex; }';
css += '\n';
css += '.settings-panel__hdr { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-bottom: 1px solid #f0f0f0; }';
css += '\n';
css += ".settings-panel__title { font-size: 18px; font-weight: 600; }";
css += '\n';
css += '.settings-panel__close { width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #5d5d5d; transition: background 0.1s; }';
css += '\n';
css += '.settings-panel__close:hover { background: rgba(36,36,36,0.04); }';
css += '\n';
css += '.settings-panel__close svg { width: 20px; height: 20px; }';
css += '\n';
css += '.settings-panel__body { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 24px; }';
css += '\n';
css += '.settings-panel__desc { font-size: 13px; color: #5d5d5d; line-height: 1.5; }';
css += '\n';
css += ".settings-panel__section-title { font-size: 14px; font-weight: 600; margin-bottom: 12px; }";
css += '\n';

// Source row (toggle)
css += '.source-row { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; border: 1px solid #f0f0f0; margin-bottom: 8px; transition: background 0.1s; cursor: pointer; }';
css += '\n';
css += '.source-row:hover { background: #fafafa; }';
css += '\n';
css += '.source-row__icon { width: 32px; height: 32px; flex-shrink: 0; }';
css += '\n';
css += '.source-row__icon svg { display: block; }';
css += '\n';
css += '.source-row__name { flex: 1; font-size: 14px; font-weight: 500; }';
css += '\n';
// Toggle switch
css += '.toggle { width: 40px; height: 20px; border-radius: 10px; background: #c0c0c0; position: relative; cursor: pointer; transition: background 0.2s; flex-shrink: 0; }';
css += '\n';
css += '.toggle--on { background: #242424; }';
css += '\n';
css += '.toggle__knob { width: 16px; height: 16px; border-radius: 8px; background: #fff; position: absolute; top: 2px; left: 2px; transition: left 0.2s; }';
css += '\n';
css += '.toggle--on .toggle__knob { left: 22px; }';
css += '\n';

// Connect more card
css += '.connect-card { display: flex; align-items: center; gap: 12px; padding: 14px 16px; border-radius: 12px; border: 1px solid #f0f0f0; margin-bottom: 8px; cursor: pointer; transition: background 0.1s; }';
css += '\n';
css += '.connect-card:hover { background: #fafafa; }';
css += '\n';
css += '.connect-card__icon { width: 32px; height: 32px; flex-shrink: 0; }';
css += '\n';
css += '.connect-card__icon svg { display: block; }';
css += '\n';
css += '.connect-card__name { flex: 1; font-size: 14px; font-weight: 400; }';
css += '\n';
css += '.connect-card__add { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: #5d5d5d; }';
css += '\n';
css += '.connect-card__add svg { width: 16px; height: 16px; }';
css += '\n';

// Detail modal
css += '.modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 1000; align-items: center; justify-content: center; backdrop-filter: blur(4px); }';
css += '\n';
css += '.modal-overlay--open { display: flex; }';
css += '\n';
css += '.modal { width: 560px; max-height: 80vh; background: #fff; border-radius: 20px; box-shadow: 0 16px 48px rgba(0,0,0,0.16); display: flex; flex-direction: column; overflow: hidden; }';
css += '\n';
css += '.modal__header { padding: 24px 24px 16px; display: flex; align-items: flex-start; gap: 16px; }';
css += '\n';
css += '.modal__icon { width: 48px; height: 48px; flex-shrink: 0; }';
css += '\n';
css += '.modal__icon svg { display: block; }';
css += '\n';
css += '.modal__info { flex: 1; }';
css += '\n';
css += ".modal__name { font-size: 20px; font-weight: 600; line-height: 1.3; }";
css += '\n';
css += '.modal__creator { font-size: 13px; color: #5d5d5d; margin-top: 2px; }';
css += '\n';
css += '.modal__close { width: 32px; height: 32px; border-radius: 8px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #5d5d5d; flex-shrink: 0; }';
css += '\n';
css += '.modal__close:hover { background: rgba(36,36,36,0.04); }';
css += '\n';
css += '.modal__close svg { width: 20px; height: 20px; }';
css += '\n';
css += ".modal__cta { margin: 0 24px; height: 36px; border-radius: 8px; border: none; background: #242424; color: #fff; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; }";
css += '\n';
css += '.modal__cta:hover { background: #3b3b3b; }';
css += '\n';
css += '.modal__stats { display: flex; padding: 16px 24px; margin-top: 8px; border-top: 1px solid #f0f0f0; }';
css += '\n';
css += '.modal__stat { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; }';
css += '\n';
css += '.modal__stat-val { font-size: 15px; font-weight: 600; }';
css += '\n';
css += '.modal__stat-label { font-size: 11px; color: #6f6f6f; }';
css += '\n';
css += '.modal__stat + .modal__stat { border-left: 1px solid #f0f0f0; }';
css += '\n';
css += '.modal__body { flex: 1; overflow-y: auto; padding: 16px 24px 24px; }';
css += '\n';
css += '.modal__preview { width: 100%; height: 180px; border-radius: 12px; background: linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%); margin-bottom: 16px; display: flex; align-items: center; justify-content: center; color: #929292; font-size: 14px; }';
css += '\n';
css += '.modal__desc { font-size: 14px; line-height: 1.6; color: #424242; }';
css += '\n';
css += '.modal__tag { display: inline-flex; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; margin: 0 0 12px 24px; }';
css += '\n';
css += '.modal__req { margin-top: 16px; padding: 12px 16px; border-radius: 10px; background: #FFF8E1; border: 1px solid #FFE082; font-size: 13px; color: #5D4037; line-height: 1.5; }';
css += '\n';
css += '.modal__req strong { font-weight: 600; }';
css += '\n';

// Scrollbar
css += '::-webkit-scrollbar { width: 6px; background: transparent; }';
css += '\n';
css += '::-webkit-scrollbar-thumb { background: #c0c0c0; border-radius: 9999px; }';
css += '\n';

// ─── HTML ───────────────────────────────────────────────────
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Store Model 2 \u2014 Agents + Skills in Store</title>';
html += '<style>' + css + '</style></head><body>';
html += '<div class="shell">';

// Nav
html += '<div class="nav">';
html += '<div class="nav__header"><button class="nhb" title="Copilot">' + copilotIco + '</button><div style="flex:1"></div><button class="nhb">' + gridDotsIco + '</button></div>';
html += '<div class="nav__top">';
html += '<a class="ni" href="shell.html">' + composeIco + '<span class="ni__title">New chat</span></a>';
html += '<button class="ni">' + searchIco + '<span class="ni__title">Search</span></button>';
html += '<a class="ni" href="store1.html">' + storeIco + '<span class="ni__title">Store 1: Unified</span></a>';
html += '<a class="ni sel" href="store2.html">' + storeIco + '<span class="ni__title">Store 2: Split</span></a>';
html += '<a class="ni" href="store3.html">' + storeIco + '<span class="ni__title">Store 3: Agents</span></a>';
html += '<div class="ni-split"><button class="ni">' + folderIco + '<span class="ni__title">Workspaces</span></button><button class="ni-split__sec">' + chevDn12 + '</button></div>';
html += '</div>';
html += '<div class="nav__body">';
html += '<div class="nav__section"><div class="nsh">Pinned</div><button class="ni">' + chatIco + '<span class="ni__title">Escalation root cause</span></button><button class="ni">' + chatIco + '<span class="ni__title">Market Analysis</span></button></div>';
html += '<div class="nav__section"><div class="nsh">Chats</div><button class="ni"><span class="ni__title">Relocation benefits</span><span class="ni__right"><span class="ni__right-icon">' + arrowSyncIco16 + '</span></span></button><button class="ni"><span class="ni__title">Sales Forecast FY25</span></button></div>';
html += '</div>';
html += '<div class="nav__footer"><div class="nav__footer-row"><button class="me"><span class="me__avatar"><img src="../../src/components/icons/avatar-mona-kane.png" alt="MK" style="width:100%;height:100%;border-radius:9999px;object-fit:cover;"/></span><div class="me__info"><span class="me__name">Mona Kane</span><span class="me__license">M365 Copilot (Premium)</span></div></button><button class="nhb" title="Notifications" style="position:relative">' + alertIco + '<span class="nhb__badge">4</span></button></div></div>';
html += '</div>';

// Main
html += '<div class="main">';
html += '<div class="model-banner"><span class="model-banner__label">MODEL 2</span> Agents + Skills in Store \u2014 Sources managed separately in Settings panel</div>';

html += '<div class="store-hdr"><span class="store-hdr__title">Agents & Skills</span>';
html += '<div class="store-hdr__actions">';
html += '<button class="store-hdr__btn" id="openSettings">' + settingsIco + ' Connected Sources</button>';
html += '<button class="store-hdr__btn" style="background:#242424;color:#fff;border-color:#242424;">' + addIco + ' Create agent or skill</button>';
html += '</div></div>';

// Only 2 tabs: Agents & Skills
html += '<div class="store-tabs">';
html += '<button class="store-tab store-tab--active" data-tab="all">All</button>';
html += '<button class="store-tab" data-tab="agent">Agents</button>';
html += '<button class="store-tab" data-tab="skill">Skills</button>';
html += '</div>';

html += '<div class="store-content">';
html += '<div class="store-search"><span>' + searchIco + '</span><input type="text" placeholder="Search for an agent or skill" /></div>';

// My agents & skills (no sources here)
html += '<div class="store-section"><div class="store-section__title">My agents & skills</div><div class="card-grid">';

const myItems = [
  { n: 'Sales', c: '#0078D4', l: 'Sa', t: 'agent' },
  { n: 'Idea Coach', c: '#FFB800', l: 'IC', t: 'agent' },
  { n: 'Analyst', c: '#F2994A', l: 'An', t: 'agent' },
  { n: 'Visual Creator', c: '#E040A0', l: 'VC', t: 'agent' },
  { n: 'Summarize', c: '#00A651', l: 'Su', t: 'skill' },
  { n: 'Figma Design', c: '#A259FF', l: 'Fi', t: 'skill' },
  { n: 'Generate Report', c: '#0F7B3F', l: 'GR', t: 'skill' },
  { n: 'Researcher', c: '#6B4FBB', l: 'Re', t: 'agent' },
  { n: 'Power BI', c: '#F2C800', l: 'PB', t: 'agent' },
  { n: 'Brainstormer', c: '#00BFA5', l: 'Br', t: 'agent' },
  { n: 'Data Visualize', c: '#0078D4', l: 'DV', t: 'skill' },
  { n: 'Web Search', c: '#4A90D9', l: 'WS', t: 'skill' },
];

for (const i of myItems) {
  const bc = i.t === 'agent' ? 'card-compact__badge--agent' : 'card-compact__badge--skill';
  html += `<div class="card-compact" data-type="${i.t}" data-name="${i.n}" data-desc="A ${i.t} that enhances your Copilot experience." data-creator="Microsoft" data-color="${i.c}">`;
  html += `<span class="card-compact__icon">${ico(i.c, i.l)}</span>`;
  html += `<span class="card-compact__name">${i.n}</span>`;
  html += `<span class="card-compact__badge ${bc}">${i.t === 'agent' ? 'Agent' : 'Skill'}</span>`;
  html += `<button class="card-compact__more">${moreHorizontalIco}</button></div>`;
}

html += '</div></div>';

// Built by Microsoft
html += '<div class="store-section"><div class="store-section__title">Built by Microsoft</div><div class="card-grid--lg">';

const msCards2 = [
  { n: 'Sales', d: 'Drive deals forward with clear insights and ready-to-use actions.', c: '#0078D4', l: 'Sa', t: 'agent' },
  { n: 'Planner', d: 'All your tasks and projects in one simple, familiar experience.', c: '#00A651', l: 'Pl', t: 'agent' },
  { n: 'Researcher', d: 'Fast insights to prep for your next meeting.', c: '#6B4FBB', l: 'Re', t: 'agent' },
  { n: 'Analyst', d: 'Turn complex data into quick, easy-to-read answers.', c: '#F2994A', l: 'An', t: 'agent' },
  { n: 'Summarize', d: 'Condense documents and threads into key points.', c: '#00A651', l: 'Su', t: 'skill' },
  { n: 'RFP Generator', d: 'Build an RFP like a Microsoft Pro.', c: '#FF5733', l: 'RG', t: 'agent' },
];

for (const c of msCards2) {
  const bc = c.t === 'agent' ? 'card-compact__badge--agent' : 'card-compact__badge--skill';
  html += `<div class="card-lg" data-type="${c.t}" data-name="${c.n}" data-desc="${c.d}" data-creator="Microsoft" data-color="${c.c}">`;
  html += `<span class="card-lg__icon">${ico(c.c, c.l)}</span>`;
  html += `<div class="card-lg__text"><span class="card-lg__name">${c.n} <span class="card-lg__type ${bc}">${c.t === 'agent' ? 'Agent' : 'Skill'}</span></span>`;
  html += `<span class="card-lg__desc">${c.d}</span></div></div>`;
}

html += '</div></div>';
html += '</div>'; // store-content

// ─── Settings Panel (Sources) ───
html += '<div class="settings-panel" id="settingsPanel">';
html += '<div class="settings-panel__hdr"><span class="settings-panel__title">Connected Sources</span>';
html += '<button class="settings-panel__close" id="closeSettings">' + dismissIco + '</button></div>';
html += '<div class="settings-panel__body">';
html += '<div class="settings-panel__desc">Manage your data sources. Connected sources are available to all agents and skills automatically.</div>';

html += '<div><div class="settings-panel__section-title">Connected apps</div>';

const connected = [
  { n: 'ServiceNow', c: '#81B5A1', l: 'SN', on: true },
  { n: 'Jira', c: '#0052CC', l: 'Ji', on: true },
  { n: 'GitHub', c: '#24292E', l: 'GH', on: false },
];

for (const s of connected) {
  html += `<div class="source-row"><span class="source-row__icon">${ico(s.c, s.l)}</span>`;
  html += `<span class="source-row__name">${s.n}</span>`;
  html += `<div class="toggle ${s.on ? 'toggle--on' : ''}" data-toggle="${s.n}"><div class="toggle__knob"></div></div></div>`;
}

html += '</div>';

html += '<div><div class="settings-panel__section-title">Connect more</div>';
html += '<div class="settings-panel__desc" style="margin-bottom:12px">Copilot can search across your work data to find information and help you complete tasks faster.</div>';

const more = [
  { n: 'Confluence', c: '#0052CC', l: 'Co' },
  { n: 'Google Drive', c: '#4285F4', l: 'GD' },
  { n: 'HubSpot', c: '#FF7A59', l: 'HS' },
  { n: 'Notion', c: '#000000', l: 'No' },
  { n: 'Canva', c: '#00C4CC', l: 'Ca' },
  { n: 'Slack', c: '#4A154B', l: 'Sl' },
];

for (const s of more) {
  html += `<div class="connect-card"><span class="connect-card__icon">${ico(s.c, s.l)}</span>`;
  html += `<span class="connect-card__name">${s.n}</span>`;
  html += `<span class="connect-card__add">${addIco}</span></div>`;
}

html += '</div></div></div>'; // settings panel

// Detail modal
html += '<div class="modal-overlay" id="modalOverlay"><div class="modal">';
html += '<div class="modal__header"><span class="modal__icon" id="modalIcon"></span><div class="modal__info"><div class="modal__name" id="modalName"></div><div class="modal__creator" id="modalCreator"></div></div>';
html += '<button class="modal__close" id="modalClose">' + dismissIco + '</button></div>';
html += '<div class="modal__tag" id="modalTag"></div>';
html += '<button class="modal__cta" id="modalCta">Add</button>';
html += '<div class="modal__stats"><div class="modal__stat"><span class="modal__stat-val">4.8 \u2605</span><span class="modal__stat-label">3K ratings</span></div><div class="modal__stat"><span class="modal__stat-val">2.6K</span><span class="modal__stat-label">Installs last month</span></div><div class="modal__stat"><span class="modal__stat-val">Free</span><span class="modal__stat-label">Premium available</span></div></div>';
html += '<div class="modal__body"><div class="modal__preview">Preview</div>';
html += '<div class="modal__desc" id="modalDesc"></div>';
html += '<div class="modal__req" id="modalReq" style="display:none"></div>';
html += '</div></div></div>';

html += '</div>'; // main
html += '</div>'; // shell

// Script
html += '<script>';
html += '\n';

// Tab switching
html += 'document.querySelectorAll(".store-tab").forEach(function(tab) {';
html += '  tab.addEventListener("click", function() {';
html += '    document.querySelectorAll(".store-tab").forEach(function(t) { t.classList.remove("store-tab--active"); });';
html += '    tab.classList.add("store-tab--active");';
html += '    var filter = tab.getAttribute("data-tab");';
html += '    document.querySelectorAll(".card-compact, .card-lg").forEach(function(card) {';
html += '      var type = card.getAttribute("data-type");';
html += '      card.style.display = (filter === "all" || type === filter) ? "" : "none";';
html += '    });';
html += '  });';
html += '});';
html += '\n';

// Settings panel
html += 'document.getElementById("openSettings").addEventListener("click", function() {';
html += '  document.getElementById("settingsPanel").classList.add("settings-panel--open");';
html += '});';
html += '\n';
html += 'document.getElementById("closeSettings").addEventListener("click", function() {';
html += '  document.getElementById("settingsPanel").classList.remove("settings-panel--open");';
html += '});';
html += '\n';

// Toggle switches
html += 'document.querySelectorAll(".toggle").forEach(function(t) {';
html += '  t.addEventListener("click", function() { t.classList.toggle("toggle--on"); });';
html += '});';
html += '\n';

// Card click → modal
html += 'function openModal(card) {';
html += '  var name = card.getAttribute("data-name");';
html += '  var desc = card.getAttribute("data-desc");';
html += '  var creator = card.getAttribute("data-creator");';
html += '  var type = card.getAttribute("data-type");';
html += '  var color = card.getAttribute("data-color");';
html += '  document.getElementById("modalName").textContent = name;';
html += '  document.getElementById("modalCreator").textContent = "Created by " + creator;';
html += '  document.getElementById("modalDesc").innerHTML = "<p>" + desc + "</p><p>This extension enhances your Copilot experience with specialized capabilities.</p>";';
html += '  var tag = document.getElementById("modalTag");';
html += '  tag.textContent = type === "agent" ? "Agent" : "Skill";';
html += '  if (type === "agent") { tag.style.background = "#E8DEF8"; tag.style.color = "#6B4FBB"; }';
html += '  else { tag.style.background = "#D1ECF9"; tag.style.color = "#0078D4"; }';
html += '  document.getElementById("modalCta").textContent = "Add";';
html += '  document.getElementById("modalCta").className = "modal__cta";';
html += '  var icoSvg = \'<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="\' + color + \'"/><text x="24" y="31" text-anchor="middle" font-size="18" font-weight="600" fill="#fff" font-family="Segoe UI">\' + name.substring(0,2) + \'</text></svg>\';';
html += '  document.getElementById("modalIcon").innerHTML = icoSvg;';
html += '  var req = document.getElementById("modalReq");';
html += '  if (type === "agent" && (name === "Sales")) {';
html += '    req.style.display = "block";';
html += '    req.innerHTML = \'<strong>Requires source:</strong> This agent works best with <strong>Salesforce</strong>. <a href="#" onclick="document.getElementById(\\\'modalOverlay\\\').classList.remove(\\\'modal-overlay--open\\\');document.getElementById(\\\'settingsPanel\\\').classList.add(\\\'settings-panel--open\\\');return false;" style="color:#0078D4">Set up in Settings \u2192</a>\';';
html += '  } else { req.style.display = "none"; }';
html += '  document.getElementById("modalOverlay").classList.add("modal-overlay--open");';
html += '}';
html += '\n';

html += 'document.querySelectorAll(".card-compact, .card-lg").forEach(function(card) {';
html += '  card.addEventListener("click", function(e) {';
html += '    if (e.target.closest(".card-compact__more")) return;';
html += '    openModal(card);';
html += '  });';
html += '});';
html += '\n';

html += 'document.getElementById("modalClose").addEventListener("click", function() { document.getElementById("modalOverlay").classList.remove("modal-overlay--open"); });';
html += '\n';
html += 'document.getElementById("modalOverlay").addEventListener("click", function(e) { if (e.target === this) this.classList.remove("modal-overlay--open"); });';
html += '\n';

html += '</script></body></html>';

// Write
const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'store2.html'), html, 'utf-8');
console.log('Done: preview/dist/store2.html');
