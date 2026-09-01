/**
 * Source Discovery — Interactive Leadership Deck
 *
 * A self-contained, presentation-style deck that faithfully reproduces the 27-slide
 * Figma deck "Source Discovery" (file JD3kM4M4LpUM1n4fWQa4Q4). Static deck chrome
 * (eyebrow/title, monospace status badges, model tags, annotations, pill callouts,
 * navy section dividers, static content slides) is reproduced exactly; the embedded
 * Microsoft Copilot "screens" are interactive (hybrid: scripted Figma states + free
 * chat typing / source toggles that snap back on navigation).
 *
 * Three CSS namespaces — no collision with sibling generators:
 *   deck-*   presentation frame (stage, arrows, counter, ESC grid)
 *   slide-*  per-slide chrome + dividers + static content
 *   sk-*     the Copilot screen kit (shell, toast, settings, connect dialog, …)
 *
 * Geometry: every slide is authored in exact 1920×1080 px ("the stage"); one
 * transform:scale(S) letterboxes it to the viewport. Screen frames sit at the
 * Figma offsets within that 1920-space (shell window = 1296×810 @ (312,280), a
 * 1440×900 shell scaled ×0.9).
 *
 * Navigation is foolproof: → / Space / click-empty-stage / on-screen arrows /
 * ESC grid all converge on goToSlide(n), which re-bakes the target slide's screen
 * to its scripted state. Live controls (buttons, toggles, textareas, hotspots) are
 * exempt from click-to-advance via a capture-phase allow-list.
 *
 * Usage:  npx tsx preview/src/sourceDiscoveryDeck.ts
 * Output: preview/dist/sourceDiscoveryDeck.html
 */

import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function readIcon(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8').replace(/\n/g, ' ').trim();
}
function readIconCC(name: string): string {
  return fs.readFileSync(path.join(iconsDir, name), 'utf-8')
    .replace(/\n/g, ' ')
    .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"')
    .trim();
}
const ASSET = '../../src/components/icons/';
function logoImg(file: string, alt: string, radius = 0): string {
  const r = radius ? ('border-radius:' + radius + 'px;') : '';
  return '<img src="' + ASSET + file + '" alt="' + alt + '" style="width:100%;height:100%;object-fit:contain;display:block;' + r + '" />';
}

// ─── Inline UI icons (20px, currentColor) ───────────────────────────
const copilotIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.92704 2H12.1392C13.1927 2 14.1203 2.69397 14.4176 3.7046L14.8868 5.29901C15.0476 5.84546 15.5266 6.232 16.086 6.28068H16.3751C17.2627 6.28068 17.9479 6.53232 18.4023 7.04832C18.8449 7.55084 18.9913 8.21838 19.0009 8.88707C19.02 10.208 18.5033 11.849 18.0916 13.1554C17.7333 14.2924 17.273 15.4729 16.6552 16.3777C16.0399 17.2788 15.1999 18.0006 14.073 18.0006H7.87484L7.86695 18.0005H7.86063C6.80716 18.0005 5.87959 17.3066 5.58222 16.296L5.11309 14.7015C4.95237 14.1553 4.47368 13.7689 3.91456 13.7199H3.62488C2.73727 13.7199 2.05209 13.4683 1.59766 12.9523C1.15509 12.4498 1.00872 11.7822 0.999049 11.1135C0.979951 9.7926 1.49665 8.15165 1.90838 6.84517C2.26667 5.70826 2.72694 4.52772 3.34477 3.62288C3.96005 2.72178 4.80007 2 5.92704 2ZM2.86214 7.14574C2.43465 8.50224 1.98267 9.97352 1.99894 11.0991C2.00696 11.6536 2.12929 12.0429 2.34812 12.2914C2.55509 12.5264 2.924 12.7199 3.62488 12.7199H6.25213C6.8614 12.7199 7.39814 12.3195 7.57212 11.7352C8.04172 10.158 8.83794 7.4963 9.46637 5.45934L9.49937 5.35233C9.64852 4.86841 9.79284 4.40016 9.94826 3.98475C10.0807 3.63087 10.2289 3.29335 10.4095 3H5.92704C5.28311 3 4.70642 3.40208 4.17062 4.18678C3.63737 4.96774 3.2122 6.03493 2.86214 7.14574ZM5.73445 13.7199C5.88192 13.9288 5.99729 14.1639 6.07243 14.4193L6.54156 16.0137C6.71371 16.5988 7.25073 17.0005 7.86063 17.0005H7.88678C8.24574 16.9969 8.48955 16.8275 8.64066 16.6226C8.80779 16.3959 8.96035 16.0792 9.11514 15.6654C9.25974 15.2789 9.39567 14.8381 9.5478 14.3446L9.57806 14.2465C9.64307 14.0357 9.70989 13.8183 9.77797 13.596C9.543 13.6733 9.29325 13.7147 9.03611 13.7147H6.41074C6.35823 13.7182 6.30534 13.7199 6.25213 13.7199H5.73445ZM8.1935 12.7147H9.03611C9.58916 12.7147 10.0832 12.3842 10.2986 11.8846C10.7359 10.4387 11.1692 8.98844 11.4694 7.98005C11.5449 7.72668 11.6599 7.4933 11.8065 7.28588H10.9638C10.4111 7.28588 9.91739 7.61592 9.70178 8.11487C9.26432 9.56118 8.83086 11.0119 8.53054 12.0206C8.45511 12.2739 8.34011 12.5073 8.1935 12.7147ZM10.2221 6.40449C10.457 6.32723 10.7067 6.28588 10.9638 6.28588H13.5902C13.6424 6.28243 13.695 6.28068 13.7479 6.28068H14.2655C14.118 6.07183 14.0026 5.83666 13.9274 5.58128L13.4583 3.98687C13.2862 3.40177 12.7491 3 12.1392 3H12.1244C11.7593 3.00023 11.512 3.17099 11.3593 3.37803C11.1922 3.60467 11.0396 3.92146 10.8848 4.33517C10.7402 4.72167 10.6043 5.16256 10.4522 5.65601L10.4219 5.75415C10.3569 5.96483 10.2901 6.18225 10.2221 6.40449ZM17.1379 12.8549C17.5653 11.4984 18.0173 10.0271 18.001 8.90153C17.993 8.34698 17.8707 7.95771 17.6519 7.70923C17.4449 7.47423 17.076 7.28068 16.3751 7.28068H13.7479C13.1386 7.28068 12.6018 7.68108 12.4279 8.26541C11.9583 9.84263 11.1621 12.5043 10.5336 14.5413L10.5006 14.6483C10.3515 15.1322 10.2072 15.6005 10.0517 16.0159C9.91933 16.3697 9.77114 16.7073 9.59044 17.0006H14.073C14.7169 17.0006 15.2936 16.5985 15.8294 15.8138C16.3626 15.0329 16.7878 13.9657 17.1379 12.8549Z" fill="currentColor"/></svg>';
const composeIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 4.00003C10.7761 4.00003 11 4.22389 11 4.50003C10.9999 4.77614 10.7761 5.00003 10.5 5.00003H6C4.89543 5.00003 4 5.89546 4 7.00002V14C4.00004 15.1045 4.89545 16 6 16H13C14.1045 16 14.9999 15.1045 15 14V9.50002C15 9.22388 15.2238 9.00002 15.5 9.00002C15.7761 9.00002 16 9.22388 16 9.50002V14C15.9999 15.6568 14.6568 17 13 17H6C4.34317 17 3.00004 15.6568 3 14V7.00002C3 5.34318 4.34314 4.00003 6 4.00003H10.5ZM16.1465 3.14652C16.3417 2.95126 16.6582 2.95126 16.8535 3.14652C17.0487 3.34179 17.0487 3.65832 16.8535 3.85355L9.06054 11.6455L7.99999 12L8.35351 10.9395L16.1465 3.14652Z" fill="currentColor"/></svg>';
const searchIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7291 14.4362C12.5924 15.411 11.115 16 9.5 16C5.91015 16 3 13.0899 3 9.5C3 5.91015 5.91015 3 9.5 3C13.0899 3 16 5.91015 16 9.5C16 11.115 15.411 12.5924 14.4361 13.7292L17.8535 17.1465C18.0487 17.3417 18.0487 17.6583 17.8535 17.8536C17.6799 18.0271 17.4105 18.0464 17.2156 17.9114L17.1464 17.8536L13.7291 14.4362ZM13.0196 13.7266C13.276 13.5128 13.5127 13.2761 13.7265 13.0197C14.5216 12.0659 15 10.8388 15 9.5C15 6.46243 12.5376 4 9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15C10.8388 15 12.0658 14.5217 13.0196 13.7266Z" fill="currentColor"/></svg>';
const agentIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.20949 2.81648C5.53001 2.30825 6.08885 2 6.6897 2H9.50021C9.77635 2 10.0002 2.22386 10.0002 2.5C10.0002 2.77614 9.77635 3 9.50021 3H6.6897C6.43219 3 6.19269 3.13211 6.05533 3.34992L2.11367 9.59992C1.95951 9.84436 1.95951 10.1556 2.11367 10.4001L5.97726 16.5263C6.16322 16.8212 6.48744 17 6.83604 17C7.29602 17 7.69854 16.6908 7.81706 16.2463L11.218 3.49284C11.4527 2.61252 12.25 2 13.1611 2C13.8557 2 14.5011 2.35842 14.8682 2.94804L18.7888 9.24456C19.0768 9.70702 19.0768 10.293 18.7888 10.7554L14.7916 17.175C14.4721 17.6881 13.9105 18 13.306 18H10.5002C10.2241 18 10.0002 17.7761 10.0002 17.5C10.0002 17.2239 10.2241 17 10.5002 17H13.306C13.5651 17 13.8058 16.8663 13.9427 16.6464L17.9399 10.2269C18.0264 10.088 18.0264 9.91202 17.9399 9.77313L14.0193 3.47661C13.8347 3.18019 13.5103 3 13.1611 3C12.703 3 12.3022 3.30794 12.1842 3.75051L8.78329 16.504C8.54804 17.3862 7.74907 18 6.83604 18C6.1441 18 5.50054 17.645 5.13143 17.0597L1.26783 10.9335C0.908119 10.3632 0.908119 9.63685 1.26783 9.06648L5.20949 2.81648Z" fill="currentColor"/></svg>';
const folderIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 3C3.11929 3 2 4.11929 2 5.5V14.5C2 15.8807 3.11929 17 4.5 17H15.5C16.8807 17 18 15.8807 18 14.5V7.5C18 6.11929 16.8807 5 15.5 5H9.70711L8.21967 3.51256C7.89148 3.18437 7.44636 3 6.98223 3H4.5ZM3 5.5C3 4.67157 3.67157 4 4.5 4H6.98223C7.18115 4 7.37191 4.07902 7.51256 4.21967L8.79289 5.5L7.43934 6.85355C7.34557 6.94732 7.21839 7 7.08579 7H3V5.5ZM3 8H7.08579C7.48361 8 7.86514 7.84196 8.14645 7.56066L9.70711 6H15.5C16.3284 6 17 6.67157 17 7.5V14.5C17 15.3284 16.3284 16 15.5 16H4.5C3.67157 16 3 15.3284 3 14.5V8Z" fill="currentColor"/></svg>';
const pinIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.1221 3.13715C10.7326 1.91616 12.3599 1.65208 13.3251 2.61737L17.382 6.67419C18.3472 7.63947 18.0832 9.26676 16.8622 9.87726L13.4037 11.6065C13.0751 11.7708 12.8183 12.0499 12.6818 12.391L11.2459 15.981C10.9792 16.6476 10.1179 16.8244 9.61027 16.3167L7 13.7064L3.70711 16.9993H3V16.2922L6.29289 12.9993L3.68262 10.3891C3.17498 9.88142 3.35177 9.02011 4.01834 8.75348L7.60829 7.3175C7.94939 7.18106 8.22855 6.92419 8.39285 6.5956L10.1221 3.13715ZM12.618 3.32447C12.1354 2.84183 11.3217 2.97387 11.0165 3.58437L9.28727 7.04282C9.01345 7.59046 8.54818 8.01858 7.97968 8.24598L4.38973 9.68196L10.3174 15.6096L11.7534 12.0197C11.9808 11.4512 12.4089 10.9859 12.9565 10.7121L16.415 8.98283C17.0255 8.67758 17.1575 7.86394 16.6749 7.3813L12.618 3.32447Z" fill="currentColor"/></svg>';
const gridDotsIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 4C5.25 4.69036 4.69036 5.25 4 5.25C3.30964 5.25 2.75 4.69036 2.75 4C2.75 3.30964 3.30964 2.75 4 2.75C4.69036 2.75 5.25 3.30964 5.25 4ZM17.25 16C17.25 16.6904 16.6904 17.25 16 17.25C15.3096 17.25 14.75 16.6904 14.75 16C14.75 15.3096 15.3096 14.75 16 14.75C16.6904 14.75 17.25 15.3096 17.25 16ZM16 11.25C16.6904 11.25 17.25 10.6904 17.25 10C17.25 9.30964 16.6904 8.75 16 8.75C15.3096 8.75 14.75 9.30964 14.75 10C14.75 10.6904 15.3096 11.25 16 11.25ZM17.25 4C17.25 4.69036 16.6904 5.25 16 5.25C15.3096 5.25 14.75 4.69036 14.75 4C14.75 3.30964 15.3096 2.75 16 2.75C16.6904 2.75 17.25 3.30964 17.25 4ZM10 17.25C10.6904 17.25 11.25 16.6904 11.25 16C11.25 15.3096 10.6904 14.75 10 14.75C9.30964 14.75 8.75 15.3096 8.75 16C8.75 16.6904 9.30964 17.25 10 17.25ZM11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10ZM10 5.25C10.6904 5.25 11.25 4.69036 11.25 4C11.25 3.30964 10.6904 2.75 10 2.75C9.30964 2.75 8.75 3.30964 8.75 4C8.75 4.69036 9.30964 5.25 10 5.25ZM5.25 16C5.25 16.6904 4.69036 17.25 4 17.25C3.30964 17.25 2.75 16.6904 2.75 16C2.75 15.3096 3.30964 14.75 4 14.75C4.69036 14.75 5.25 15.3096 5.25 16ZM4 11.25C4.69036 11.25 5.25 10.6904 5.25 10C5.25 9.30964 4.69036 8.75 4 8.75C3.30964 8.75 2.75 9.30964 2.75 10C2.75 10.6904 3.30964 11.25 4 11.25Z" fill="currentColor"/></svg>';
const chevronDownIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8537 7.64582C16.0493 7.84073 16.0499 8.15731 15.855 8.35292L10.39 13.8374C10.1751 14.0531 9.82574 14.0531 9.6108 13.8374L4.14582 8.35292C3.9509 8.15731 3.95147 7.84073 4.14708 7.64582C4.34269 7.4509 4.65927 7.45147 4.85418 7.64708L10.0004 12.8117L15.1466 7.64708C15.3415 7.45147 15.6581 7.4509 15.8537 7.64582Z" fill="currentColor"/></svg>';
const chatHintHalfIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.34743 5.55836C3.51577 5.30672 3.87062 5.28565 4.08473 5.49977C4.2614 5.67681 4.27921 5.95543 4.14235 6.16481C4.01249 6.36334 3.89243 6.56912 3.78298 6.78102C3.28305 7.74466 2.99982 8.83921 2.99978 9.99978C2.99978 11.2434 3.32513 12.4099 3.89333 13.4217C3.95578 13.5328 3.97395 13.6642 3.94313 13.7879L3.18727 16.8113L6.2107 16.0555L6.30445 16.0418C6.3986 16.0366 6.49355 16.0585 6.57691 16.1053C7.58902 16.674 8.75578 16.9997 9.99976 16.9998C11.4155 16.9998 12.7327 16.5779 13.8347 15.8562C14.044 15.7193 14.3227 15.7373 14.4997 15.9139C14.7139 16.128 14.6928 16.4828 14.4411 16.6512C13.1388 17.5221 11.5718 17.9998 9.99976 17.9998C8.65066 17.9997 7.37954 17.6633 6.26441 17.073L2.62087 17.9852C2.45067 18.0275 2.27033 17.9773 2.14626 17.8533C2.02237 17.7292 1.97198 17.5489 2.01443 17.3787L2.92458 13.7332C2.33515 12.6185 1.99978 11.3478 1.99978 9.99978C1.99983 8.42601 2.47709 6.86076 3.34743 5.55836ZM17.365 11.0008C17.6676 11.001 17.9033 11.2663 17.8445 11.5633C17.637 12.6109 17.2245 13.5842 16.6511 14.4412C16.4826 14.6928 16.1279 14.7139 15.9138 14.4998C15.7372 14.3228 15.7191 14.0439 15.8562 13.8348C16.3285 13.1148 16.6713 12.3022 16.8523 11.4304C16.9032 11.1852 17.1144 11.0008 17.365 11.0008ZM15.9148 5.49977C16.1289 5.28566 16.4836 5.30681 16.6521 5.55836C17.2253 6.41552 17.6372 7.38948 17.8445 8.43728C17.9032 8.73422 17.6676 9.00056 17.365 9.00076C17.1144 9.00076 16.9041 8.81542 16.8533 8.57009C16.6725 7.69802 16.3294 6.88506 15.8572 6.16481C15.7201 5.9556 15.7382 5.6768 15.9148 5.49977ZM8.43726 2.15504C8.73418 2.09633 9.0005 2.33192 9.00073 2.63453C9.00073 2.88508 8.8154 3.09633 8.57007 3.14723C7.69819 3.32813 6.88588 3.67102 6.16578 4.14332C5.95611 4.28083 5.6761 4.26203 5.49879 4.08473C5.2845 3.87025 5.30629 3.51498 5.55836 3.34645C6.41551 2.77342 7.38953 2.36222 8.43726 2.15504ZM11.5632 2.15504C12.6108 2.36254 13.5842 2.77507 14.4411 3.3484C14.6928 3.51686 14.7139 3.87157 14.4997 4.08571C14.3227 4.26233 14.0439 4.28048 13.8347 4.14332C13.1147 3.67098 12.3022 3.32823 11.4304 3.14723C11.1851 3.0963 11.0007 2.88506 11.0007 2.63453C11.001 2.33194 11.2663 2.09626 11.5632 2.15504Z" fill="currentColor"/></svg>';
const shieldTaskIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8536 7.85355C14.0488 7.65829 14.0488 7.34171 13.8536 7.14645C13.6583 6.95118 13.3417 6.95118 13.1464 7.14645L9.5 10.7929L7.85355 9.14645C7.65829 8.95119 7.34171 8.95119 7.14645 9.14645C6.95118 9.34171 6.95118 9.65829 7.14645 9.85355L9.14645 11.8536C9.34171 12.0488 9.65829 12.0488 9.85355 11.8536L13.8536 7.85355ZM10.2774 2.08397C10.1094 1.97201 9.8906 1.97201 9.72265 2.08397C7.78446 3.3761 5.68833 4.18231 3.42929 4.50503C3.18296 4.54021 3 4.75118 3 5V9.5C3 13.3913 5.30699 16.2307 9.82051 17.9667C9.93605 18.0111 10.064 18.0111 10.1795 17.9667C14.693 16.2307 17 13.3913 17 9.5V5C17 4.75118 16.817 4.54021 16.5707 4.50503C14.3117 4.18231 12.2155 3.3761 10.2774 2.08397ZM4 5.42787C5.98541 5.09055 7.85275 4.39606 9.59914 3.34583L10 3.09715L10.4009 3.34583C12.1473 4.39606 14.0146 5.09055 16 5.42787V9.5C16 12.8921 14.0321 15.3634 10 16.9632C5.96795 15.3634 4 12.8921 4 9.5V5.42787Z" fill="currentColor"/></svg>';
const moreHorizontalIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 10C6.25 10.6904 5.69036 11.25 5 11.25C4.30964 11.25 3.75 10.6904 3.75 10C3.75 9.30964 4.30964 8.75 5 8.75C5.69036 8.75 6.25 9.30964 6.25 10ZM11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10ZM15 11.25C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25Z" fill="currentColor"/></svg>';
const addIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5C10.2761 2.5 10.5 2.72386 10.5 3V9.5H17C17.2761 9.5 17.5 9.72386 17.5 10C17.5 10.2761 17.2761 10.5 17 10.5H10.5V17C10.5 17.2761 10.2761 17.5 10 17.5C9.72386 17.5 9.5 17.2761 9.5 17V10.5H3C2.72386 10.5 2.5 10.2761 2.5 10C2.5 9.72386 2.72386 9.5 3 9.5H9.5V3C9.5 2.72386 9.72386 2.5 10 2.5Z" fill="currentColor"/></svg>';
const micIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13C11.6569 13 13 11.6568 13 9.99998V5C13 3.34315 11.6569 2 10 2C8.34315 2 7 3.34315 7 5V9.99998C7 11.6568 8.34315 13 10 13ZM10 12C8.89543 12 8 11.1046 8 9.99998V5C8 3.89543 8.89543 3 10 3C11.1046 3 12 3.89543 12 5V9.99998C12 11.1046 11.1046 12 10 12ZM5 9.49998C5.27614 9.49998 5.5 9.72384 5.5 9.99998C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 9.99998C14.5 9.72384 14.7239 9.49998 15 9.49998C15.2761 9.49998 15.5 9.72384 15.5 9.99998C15.5 12.869 13.3033 15.2249 10.5 15.4776V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V15.4776C6.69675 15.2249 4.5 12.869 4.5 9.99998C4.5 9.72384 4.72386 9.49998 5 9.49998Z" fill="currentColor"/></svg>';
const deviceEqIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C10.2761 2 10.5 2.22386 10.5 2.5V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V2.5C9.5 2.22386 9.72386 2 10 2ZM13.5 5C13.7761 5 14 5.22386 14 5.5V14.5C14 14.7761 13.7761 15 13.5 15C13.2239 15 13 14.7761 13 14.5V5.5C13 5.22386 13.2239 5 13.5 5ZM7 5.5C7 5.22386 6.77614 5 6.5 5C6.22386 5 6 5.22386 6 5.5V14.5C6 14.7761 6.22386 15 6.5 15C6.77614 15 7 14.7761 7 14.5V5.5ZM16.5 8C16.7761 8 17 8.22386 17 8.5V11.5C17 11.7761 16.7761 12 16.5 12C16.2239 12 16 11.7761 16 11.5V8.5C16 8.22386 16.2239 8 16.5 8ZM4 8.5C4 8.22386 3.77614 8 3.5 8C3.22386 8 3 8.22386 3 8.5V11.5C3 11.7761 3.22386 12 3.5 12C3.77614 12 4 11.7761 4 11.5V8.5Z" fill="currentColor"/></svg>';
const arrowUpIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13269 9.16094C2.94651 9.36488 2.96091 9.68113 3.16485 9.86731C3.36879 10.0535 3.68504 10.0391 3.87122 9.83515L9.50195 3.6673L9.50195 17.498C9.50195 17.7742 9.72581 17.998 10.002 17.998C10.2781 17.998 10.502 17.7742 10.502 17.498L10.502 3.67019L16.13 9.83515C16.3162 10.0391 16.6325 10.0535 16.8364 9.86731C17.0404 9.68113 17.0548 9.36488 16.8686 9.16094L10.5545 2.24458C10.4268 2.10464 10.2592 2.02481 10.0861 2.0051C10.0587 2.00046 10.0306 1.99805 10.002 1.99805C9.97508 1.99805 9.9487 2.00017 9.92298 2.00425C9.74708 2.02242 9.57641 2.10253 9.44673 2.24458L3.13269 9.16094Z" fill="currentColor"/></svg>';
const briefcaseIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 2C12.2165 2 13 2.7835 13 3.75V5H15C16.6569 5 18 6.34315 18 8V14C18 15.6569 16.6569 17 15 17H5C3.39489 17 2.08421 15.7394 2.00391 14.1543L2 14V8C2 6.34315 3.34315 5 5 5H7V3.75C7 2.7835 7.7835 2 8.75 2H11.25ZM17 11.2314C16.469 11.7077 15.7695 12 15 12H11V12.5C11 12.7761 10.7761 13 10.5 13H9.5C9.22386 13 9 12.7761 9 12.5V12H5C4.23053 12 3.53103 11.7077 3 11.2314V14L3.01074 14.2041C3.113 15.2128 3.96435 16 5 16H15C16.1046 16 17 15.1046 17 14V11.2314ZM5 6C3.89543 6 3 6.89543 3 8V9C3 10.1046 3.89543 11 5 11H9V10.5C9 10.2239 9.22386 10 9.5 10H10.5C10.7761 10 11 10.2239 11 10.5V11H15C16.1046 11 17 10.1046 17 9V8C17 6.89543 16.1046 6 15 6H5ZM8.75 3C8.33579 3 8 3.33579 8 3.75V5H12V3.75C12 3.33579 11.6642 3 11.25 3H8.75Z" fill="currentColor"/></svg>';
const dismissIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.08859 4.21569L4.14645 4.14645C4.32001 3.97288 4.58944 3.9536 4.78431 4.08859L4.85355 4.14645L10 9.293L15.1464 4.14645C15.32 3.97288 15.5894 3.9536 15.7843 4.08859L15.8536 4.14645C16.0271 4.32001 16.0464 4.58944 15.9114 4.78431L15.8536 4.85355L10.707 10L15.8536 15.1464C16.0271 15.32 16.0464 15.5894 15.9114 15.7843L15.8536 15.8536C15.68 16.0271 15.4106 16.0464 15.2157 15.9114L15.1464 15.8536L10 10.707L4.85355 15.8536C4.67999 16.0271 4.41056 16.0464 4.21569 15.9114L4.14645 15.8536C3.97288 15.68 3.9536 15.4106 4.08859 15.2157L4.14645 15.1464L9.293 10L4.14645 4.85355C3.97288 4.67999 3.9536 4.41056 4.08859 4.21569Z" fill="currentColor"/></svg>';
const connectedIco = readIcon('connected-20-regular.svg');
const smSearchIco = readIconCC('search-20-regular.svg');
const smDismissIco = readIconCC('dismiss-20-regular.svg');
const smMoreHorizontalIco = readIconCC('more-horizontal-20-regular.svg');
const smChatIco = readIconCC('chat-20-regular.svg');
const smDataUsageIco = readIconCC('data-usage-20-regular.svg');
const smPeopleSettingsIco = readIconCC('people-settings-20-regular.svg');
const smAgentsIco = readIconCC('agents-20-regular.svg');
const smFlowIco = readIconCC('flow-20-regular.svg');
const smFlowFilledIco = readIconCC('flow-20-filled.svg');
const cdMoreDots = moreHorizontalIco;

// ─── Connector logos (square <img>) ─────────────────────────────────
function logo20(file: string, alt: string, cover = false): string {
  const fit = cover ? 'object-fit:cover;border-radius:4px;' : 'object-fit:contain;';
  return '<img src="' + ASSET + file + '" alt="' + alt + '" width="20" height="20" style="display:block;' + fit + '" />';
}
const moodysIco = logo20('moodys-logo.png', "Moody’s", true);
const lsegIco = logo20('lseg-logo.png', 'LSEG');
const canvaIco = logo20('canva-logo.png', 'Canva');
const hubspotIco = logo20('hubspot-logo.png', 'HubSpot');
const gcalIco = logo20('google-calendar-logo.png', 'Google Calendar');
const gcontactIco = logo20('google-contacts-logo.png', 'Google Contacts');
const notionIco = logo20('notion-logo.png', 'Notion');
const linearIco = logo20('linear-logo.png', 'Linear');
const intercomIco = logo20('intercom-logo.png', 'Intercom');

// Source catalog used by the settings + CSF screens (Figma 127:129366 order).
type Src = { key: string; name: string; desc: string; ico: string };
const CATALOG: Src[] = [
  { key: 'hubspot', name: 'HubSpot', desc: 'Connect sales and marketing data', ico: hubspotIco },
  { key: 'lseg', name: 'London Stock Exchange Group', desc: 'Market data and financial filings', ico: lsegIco },
  { key: 'moodys', name: "Moody’s", desc: 'Credit ratings and risk insights', ico: moodysIco },
  { key: 'canva', name: 'Canva', desc: 'Connect your designs and content', ico: canvaIco },
  { key: 'gcal', name: 'Google Calendar', desc: 'Look up events and availability', ico: gcalIco },
  { key: 'gcontact', name: 'Google Contacts', desc: 'Search and manage contact information', ico: gcontactIco },
  { key: 'intercom', name: 'Intercom', desc: 'Plan and build products', ico: intercomIco },
  { key: 'linear', name: 'Linear', desc: 'Track issues and project progress', ico: linearIco },
];

// ════════════════════════════════════════════════════════════════════
//  CSS
// ════════════════════════════════════════════════════════════════════
let css = '';

// ─── Reset + fonts ───
css += `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}`;
css += `html,body{height:100%;background:#0b0b0c;overflow:hidden;}`;
css += `:root{--deck-sans:'Segoe UI','Segoe Sans',system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif;`;
css += `--deck-mono:'Cascadia Code',ui-monospace,'SF Mono','Roboto Mono',Menlo,Consolas,monospace;`;
css += `--deck-aptos:Aptos,'Segoe UI',system-ui,sans-serif;}`;
css += `body{font-family:var(--deck-sans);color:#242424;-webkit-font-smoothing:antialiased;}`;
css += `@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important;}}`;

// ─── Deck frame ───
css += `.deck-root{position:fixed;inset:0;background:#0b0b0c;display:flex;align-items:center;justify-content:center;outline:none;}`;
css += `.deck-stage-wrap{position:absolute;}`;
css += `.slide-stage{position:absolute;top:0;left:0;width:1920px;height:1080px;transform-origin:top left;overflow:hidden;}`;
// Each slide is absolutely stacked; only the current is shown.
css += `.slide{position:absolute;inset:0;width:1920px;height:1080px;display:none;}`;
css += `.slide--active{display:block;}`;

// Arrows + counter (fixed, unscaled, always clickable)
css += `.deck-arrow{position:fixed;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:9999px;border:none;background:rgba(255,255,255,.06);color:rgba(255,255,255,.55);display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:50;transition:background .15s,color .15s,opacity .15s;opacity:0;}`;
css += `.deck-root:hover .deck-arrow{opacity:1;}`;
css += `.deck-arrow:hover{background:rgba(255,255,255,.14);color:#fff;}`;
css += `.deck-arrow:disabled{opacity:0!important;pointer-events:none;}`;
css += `.deck-arrow--prev{left:20px;}.deck-arrow--next{right:20px;}`;
css += `.deck-arrow svg{width:24px;height:24px;}`;
css += `.deck-counter{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:50;font-family:var(--deck-mono);font-size:12px;letter-spacing:.5px;color:rgba(255,255,255,.4);background:rgba(255,255,255,.05);padding:5px 12px;border-radius:9999px;opacity:0;transition:opacity .15s;user-select:none;cursor:pointer;}`;
css += `.deck-root:hover .deck-counter{opacity:1;}`;
// ESC grid overview
css += `.deck-grid{position:fixed;inset:0;background:#0a0a0c;z-index:100;display:none;overflow-y:auto;padding:56px 40px;}`;
css += `.deck-grid--open{display:block;}`;
css += `.deck-grid__title{font-family:var(--deck-sans);font-size:14px;color:rgba(255,255,255,.5);text-align:center;margin-bottom:28px;letter-spacing:.4px;}`;
css += `.deck-grid__inner{display:flex;flex-wrap:wrap;gap:22px;justify-content:center;max-width:1640px;margin:0 auto;}`;
css += `.deck-thumb{position:relative;border-radius:8px;overflow:hidden;cursor:pointer;background:#fff;border:2px solid transparent;flex:0 0 auto;transition:border-color .12s,transform .12s;}`;
css += `.deck-thumb:hover{border-color:#2f6bff;transform:translateY(-2px);}`;
css += `.deck-thumb.is-current{border-color:#2f6bff;}`;
css += `.deck-thumb__scale{position:absolute;top:0;left:0;width:1920px;height:1080px;transform-origin:top left;pointer-events:none;}`;
css += `.deck-thumb__num{position:absolute;bottom:5px;right:7px;font-family:var(--deck-mono);font-size:11px;color:#fff;background:rgba(0,0,0,.55);padding:1px 6px;border-radius:5px;z-index:2;}`;

// ─── Slide chrome (content slides) ───
css += `.slide-bg{position:absolute;inset:0;background:#ededed;}`;
css += `.slide-eyebrow{position:absolute;left:88px;top:78px;font-family:var(--deck-sans);font-size:28px;font-weight:400;line-height:34px;color:#b3b3b3;}`;
css += `.slide-title{position:absolute;left:88px;top:108px;font-family:var(--deck-sans);font-size:52px;font-weight:400;line-height:62px;color:#242424;letter-spacing:-.5px;max-width:1200px;}`;
css += `.slide-badges{position:absolute;right:88px;top:150px;display:flex;align-items:center;gap:16px;}`;
css += `.slide-badge{display:inline-flex;align-items:center;gap:9px;height:48px;padding:0 22px;border-radius:9999px;border:1px solid #d3d3d3;background:transparent;font-family:var(--deck-mono);font-size:19px;line-height:1;color:#242424;white-space:nowrap;}`;
css += `.slide-badge__dot{width:20px;height:20px;flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;}`;
css += `.slide-badge__dot svg{width:20px;height:20px;display:block;}`;
css += `.slide-tags{position:absolute;left:88px;top:222px;display:flex;align-items:center;gap:12px;}`;
css += `.slide-tag{display:inline-flex;align-items:center;gap:8px;height:34px;padding:0 14px 0 8px;border-radius:9999px;border:1px solid #d8d8d8;background:transparent;font-family:var(--deck-mono);font-size:15px;color:#3a3a3a;}`;
css += `.slide-tag__dot{width:18px;height:18px;border-radius:9999px;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;}`;
css += `.slide-tag__dot svg{width:12px;height:12px;}`;
// Bottom annotation + pills
css += `.slide-annot{position:absolute;left:50%;transform:translateX(-50%);bottom:150px;width:1340px;text-align:center;font-family:var(--deck-sans);font-size:30px;font-weight:400;line-height:40px;color:#6a6a6a;}`;
css += `.slide-annot b{color:#2c2c2c;font-weight:700;}`;
css += `.slide-pills{position:absolute;left:50%;transform:translateX(-50%);bottom:60px;display:flex;align-items:center;justify-content:center;gap:18px;flex-wrap:nowrap;white-space:nowrap;}`;
css += `.slide-pill{display:inline-flex;align-items:center;height:48px;padding:0 24px;border-radius:9999px;border:1px solid #cfcfcf;background:transparent;font-family:var(--deck-mono);font-size:18px;color:#3a3a3a;white-space:nowrap;}`;

// ─── Section dividers ───
css += `.slide-divider{position:absolute;inset:0;background:radial-gradient(120% 130% at 18% 12%,#1f3a96 0%,#0a1a76 45%,#00005f 100%);overflow:hidden;}`;
css += `.slide-divider__grain{position:absolute;inset:0;pointer-events:none;opacity:.5;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}`;
css += `.slide-divider__corner{position:absolute;font-family:var(--deck-mono);font-size:22px;color:rgba(255,255,255,.78);letter-spacing:.5px;}`;
css += `.slide-divider__corner--tl{left:64px;top:52px;}`;
css += `.slide-divider__corner--tr{right:64px;top:52px;text-align:right;}`;
css += `.slide-divider__title{position:absolute;left:64px;font-family:var(--deck-sans);font-weight:300;font-size:128px;line-height:1.0;color:#fff;text-transform:lowercase;letter-spacing:-3px;}`;
css += `.slide-divider__title--bottom{bottom:60px;}`;
css += `.slide-divider__title--mid{top:50%;transform:translateY(-46%);}`;
css += `.slide-divider__graphic{position:absolute;}`;
css += `.slide-divider__graphic svg{display:block;}`;
css += `.slide-divider__kicker{position:absolute;right:64px;top:52px;text-align:right;}`;
css += `.slide-divider__kicker .k1{font-family:var(--deck-sans);font-weight:400;font-size:44px;color:#fff;line-height:1;}`;
css += `.slide-divider__kicker .k2{font-family:var(--deck-mono);font-size:20px;color:rgba(255,255,255,.78);margin-top:14px;display:flex;gap:36px;justify-content:flex-end;}`;

// ─── Screen frame ───
css += `.screen-frame{position:absolute;overflow:hidden;border-radius:20px;background:#fff;box-shadow:0 24px 70px rgba(15,23,42,.16),0 2px 8px rgba(15,23,42,.06);}`;
css += `.screen-frame__inner{position:absolute;top:0;left:0;transform-origin:top left;}`;
// Cursor pointer graphic
css += `.sk-cursor{position:absolute;width:42px;height:42px;z-index:60;pointer-events:none;filter:drop-shadow(0 2px 4px rgba(0,0,0,.25));}`;
css += `.sk-cursor svg{width:100%;height:100%;display:block;}`;
// Hotspot highlight ring
css += `.deck-hotspot{position:relative;}`;
css += `@keyframes hotspot-pulse{0%{box-shadow:0 0 0 0 rgba(47,107,255,.45);}70%{box-shadow:0 0 0 12px rgba(47,107,255,0);}100%{box-shadow:0 0 0 0 rgba(47,107,255,0);}}`;
css += `.deck-hotspot::after{content:"";position:absolute;inset:-4px;border-radius:14px;animation:hotspot-pulse 1.8s ease-out infinite;pointer-events:none;}`;

// ─── Static content slides ───
css += `.stat-wrap{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:56px;}`;
css += `.stat-row{display:flex;gap:28px;}`;
css += `.stat-card{width:455px;height:268px;border-radius:20px;border:1px solid #e2e2e2;background:linear-gradient(180deg,#fcfcfc,#f3f3f3);padding:42px 40px;display:flex;flex-direction:column;gap:18px;}`;
css += `.stat-card__num{font-family:var(--deck-sans);font-weight:300;font-size:96px;line-height:.9;color:#2c2c2c;letter-spacing:-2px;}`;
css += `.stat-card__label{font-family:var(--deck-sans);font-size:30px;line-height:38px;color:#6a6a6a;font-weight:400;}`;
css += `.stat-headline{font-family:var(--deck-sans);font-size:64px;font-weight:300;color:#2c2c2c;text-align:center;letter-spacing:-1px;}`;
css += `.stat-headline em{font-style:normal;color:#ff5a4d;}`;
css += `.stat-headline b{font-weight:600;color:#2c2c2c;}`;
css += `.stat-sub{font-family:var(--deck-sans);font-size:30px;color:#6a6a6a;text-align:center;margin-top:14px;font-weight:400;}`;
css += `.stat-sub b{font-weight:700;color:#3a3a3a;}`;
css += `.stat-foot{position:absolute;right:88px;bottom:72px;font-family:var(--deck-sans);font-size:24px;color:#9a9a9a;}`;

// Persona slide
css += `.persona-wrap{position:absolute;left:240px;top:330px;display:flex;flex-direction:column;gap:0;}`;
css += `.persona-row{display:flex;gap:40px;align-items:flex-start;}`;
css += `.persona-card{width:780px;border-radius:20px;border:1px solid #e2e2e2;background:linear-gradient(180deg,#fbfbfb,#f3f3f3);padding:42px 48px;display:flex;flex-direction:column;gap:18px;}`;
css += `.persona-id{display:flex;align-items:center;gap:32px;}`;
css += `.persona-photo{width:128px;height:128px;border-radius:9999px;object-fit:cover;flex-shrink:0;background:#ddd;}`;
css += `.persona-name{font-family:var(--deck-sans);font-weight:300;font-size:86px;line-height:.95;color:#3a3a3a;letter-spacing:-1px;}`;
css += `.persona-desc{font-family:var(--deck-sans);font-size:34px;color:#3a3a3a;font-weight:400;}`;
css += `.persona-tags{display:flex;flex-direction:column;gap:14px;align-items:flex-start;padding-top:8px;}`;
css += `.persona-tags .slide-pill{font-size:22px;height:50px;}`;
css += `.persona-logos{display:flex;gap:10px;margin-top:6px;}`;
css += `.persona-logos span{width:40px;height:40px;display:inline-flex;}`;
css += `.persona-quote{position:absolute;left:240px;top:700px;width:1100px;font-family:var(--deck-sans);font-size:34px;line-height:46px;color:#6a6a6a;}`;
css += `.persona-quote b{color:#2c2c2c;font-weight:700;}`;
css += `.persona-foot{position:absolute;left:50%;transform:translateX(-50%);bottom:90px;font-family:var(--deck-sans);font-size:30px;color:#8a8a8a;}`;

// ════════════════════════════════════════════════════════════════════
//  CSS — Screen kit (sk-*)  [shell + toast]
// ════════════════════════════════════════════════════════════════════

// Shell is authored at 1440×900 and scaled to fit the 1296×810 screen frame.
css += `.sk-shell{position:relative;width:1440px;height:100%;display:flex;background:#fff;font-family:var(--deck-sans);color:#242424;overflow:hidden;}`;
// Nav rail (collapsed icon rail)
css += `.sk-nav{width:64px;min-width:64px;background:#fff;display:flex;flex-direction:column;align-items:center;gap:8px;padding:10px 0;flex-shrink:0;border-right:1px solid #ededed;}`;
css += `.sk-nav__btn{width:44px;height:44px;border-radius:12px;border:none;background:transparent;color:#3a3a3a;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .1s;}`;
css += `.sk-nav__btn:hover{background:rgba(36,36,36,.05);}`;
css += `.sk-nav__btn svg{width:22px;height:22px;}`;
css += `.sk-nav__spacer{flex:1;}`;
css += `.sk-main{flex:1;display:flex;flex-direction:column;min-width:0;position:relative;}`;
// Header
css += `.sk-hdr{display:flex;align-items:center;height:60px;padding:0 22px 0 18px;gap:8px;flex-shrink:0;}`;
css += `.sk-hdr__left{display:flex;align-items:center;flex:1;gap:6px;min-width:0;}`;
css += `.sk-hdr__right{display:flex;align-items:center;gap:8px;justify-content:flex-end;}`;
css += `.sk-pick{height:36px;padding:6px 10px;border-radius:12px;background:transparent;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;color:#242424;font-family:inherit;font-size:16px;}`;
css += `.sk-pick:hover{background:rgba(36,36,36,.05);}`;
css += `.sk-pick svg{width:20px;height:20px;}`;
css += `.sk-pick__sep{color:#bcbcbc;font-size:16px;}`;
css += `.sk-iconbtn{width:36px;height:36px;border-radius:9999px;border:none;background:transparent;color:#3a3a3a;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:background .1s;}`;
css += `.sk-iconbtn:hover{background:rgba(36,36,36,.05);}`;
css += `.sk-iconbtn svg{width:20px;height:20px;}`;
css += `.sk-iconbtn--green{color:#3a8a3a;}`;
// Content
css += `.sk-content{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;position:relative;overflow:hidden;}`;
css += `.sk-stage-inner{width:900px;max-width:900px;display:flex;flex-direction:column;gap:34px;margin-top:250px;}`;
css += `.sk-greeting{font-family:var(--deck-aptos);font-size:44px;line-height:48px;font-weight:400;}`;
css += `.sk-greeting .g1{color:#1a1a1a;font-weight:600;}`;
css += `.sk-greeting .g2{color:#8a8a8a;font-weight:400;}`;
// Chat input
css += `.sk-ci-area{display:flex;flex-direction:column;gap:18px;width:100%;}`;
css += `.sk-ci{display:flex;align-items:flex-end;gap:10px;width:100%;position:relative;padding:8px 0;}`;
css += `.sk-ci__line{position:absolute;left:0;right:0;bottom:0;height:1px;background:#6f6f6f;}`;
css += `.sk-ci.is-focus .sk-ci__line{background:#242424;}`;
css += `.sk-ci__add{width:40px;height:40px;border-radius:9999px;border:none;background:transparent;color:#242424;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}`;
css += `.sk-ci__add:hover{background:rgba(36,36,36,.05);}`;
css += `.sk-ci__add svg{width:22px;height:22px;}`;
css += `.sk-ci__ta{flex:1;min-width:0;border:none;outline:none;resize:none;background:transparent;font-family:var(--deck-sans);font-size:22px;line-height:40px;color:#1f1f1f;padding:0 4px 0 8px;caret-color:#242424;}`;
css += `.sk-ci__ta::placeholder{color:#6f6f6f;}`;
css += `.sk-ci__mic{width:36px;height:36px;border-radius:9999px;border:none;background:transparent;color:#242424;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}`;
css += `.sk-ci__mic:hover{background:rgba(36,36,36,.05);}`;
css += `.sk-ci__mic svg{width:22px;height:22px;}`;
css += `.sk-ci__send{width:40px;height:40px;border-radius:9999px;border:none;background:#f5f5f5;color:#242424;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;margin-left:6px;transition:background .12s,color .12s;}`;
css += `.sk-ci__send:hover{background:#ebebeb;}`;
css += `.sk-ci.is-text .sk-ci__send{background:#242424;color:#fff;}`;
css += `.sk-ci.is-text .sk-ci__send .i-eq{display:none;}`;
css += `.sk-ci__send .i-arrow{display:none;}`;
css += `.sk-ci.is-text .sk-ci__send .i-arrow{display:block;}`;
css += `.sk-ci__send svg{width:22px;height:22px;}`;
// Suggestion chips
css += `.sk-chips{display:flex;align-items:center;gap:10px;}`;
css += `.sk-chip{display:inline-flex;align-items:center;gap:7px;height:36px;padding:0 14px;border-radius:12px;border:1px solid #dedede;background:transparent;color:#242424;font-family:var(--deck-sans);font-size:16px;cursor:pointer;white-space:nowrap;transition:background .1s,border-color .1s;}`;
css += `.sk-chip:hover{background:rgba(36,36,36,.04);border-color:#c8c8c8;}`;
css += `.sk-chip--source{padding-left:8px;}`;
css += `.sk-chip--source.is-active{background:#242424;color:#fff;border-color:#242424;}`;
css += `.sk-chip__logo{width:22px;height:22px;border-radius:4px;overflow:hidden;display:inline-flex;flex-shrink:0;}`;
css += `.sk-chip__logo img{width:100%;height:100%;object-fit:cover;}`;
css += `.sk-chip__more{width:36px;height:36px;border-radius:9999px;border:1px solid #dedede;background:transparent;color:#242424;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}`;
css += `.sk-chip__more:hover{background:rgba(36,36,36,.04);}`;
css += `.sk-chip__more svg{width:20px;height:20px;}`;
// ZQ prompt list
css += `.sk-zq{display:none;flex-direction:column;gap:4px;padding-top:18px;}`;
css += `.sk-zq.is-open{display:flex;}`;
css += `.sk-zq__item{background:transparent;border:none;text-align:left;font-family:var(--deck-sans);font-size:17px;line-height:22px;color:#242424;cursor:pointer;padding:9px 12px;border-radius:12px;}`;
css += `.sk-zq__item:hover{background:rgba(36,36,36,.04);}`;
css += `.sk-zq__item:nth-child(n+4){color:#9a9a9a;}`;

// ─── Notification toast (slide 11) ───
css += `.sk-toast{position:absolute;left:24px;top:70px;width:386px;border-radius:14px;background:#fff;border:1px solid #ededed;box-shadow:0 8px 28px rgba(15,23,42,.12);padding:18px;z-index:5;}`;
css += `.sk-toast__top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;}`;
css += `.sk-toast__title{font-family:var(--deck-sans);font-size:18px;font-weight:600;color:#242424;line-height:24px;}`;
css += `.sk-toast__x{width:28px;height:28px;border-radius:9999px;border:none;background:transparent;color:#6a6a6a;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}`;
css += `.sk-toast__x:hover{background:rgba(36,36,36,.05);}`;
css += `.sk-toast__x svg{width:18px;height:18px;}`;
css += `.sk-toast__body{font-family:var(--deck-sans);font-size:15.5px;line-height:21px;color:#5a5a5a;margin-top:6px;}`;
css += `.sk-toast__btn{margin-top:16px;float:right;height:36px;padding:0 16px;border-radius:10px;border:none;background:#1f1f1f;color:#fff;font-family:var(--deck-sans);font-size:15px;cursor:pointer;}`;
css += `.sk-toast__btn:hover{background:#000;}`;
css += `.sk-toast::after{content:"";display:block;clear:both;}`;

// ─── Connect dialog (sk-cd) ───
css += `.sk-cd{width:556px;background:#fff;border-radius:16px;box-shadow:0 12px 48px rgba(0,0,0,.24),0 0 3px rgba(0,0,0,.03);overflow:hidden;display:flex;flex-direction:column;gap:16px;padding:0 0 24px;position:relative;font-family:var(--deck-sans);}`;
css += `.sk-cd__hero{width:100%;height:122px;background:#f5f5f5;flex-shrink:0;}`;
css += `.sk-cd__icons{position:absolute;top:37px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:16px;}`;
css += `.sk-cd__brand{width:48px;height:48px;display:flex;align-items:center;justify-content:center;}`;
css += `.sk-cd__brand svg{width:48px;height:48px;display:block;}`;
css += `.sk-cd__brand img{width:48px;height:48px;border-radius:8px;object-fit:cover;display:block;}`;
css += `.sk-cd__dots{width:32px;height:32px;color:#5d5d5d;display:flex;align-items:center;justify-content:center;}`;
css += `.sk-cd__dots svg{width:32px;height:32px;display:block;}`;
css += `.sk-cd__content{display:flex;flex-direction:column;gap:16px;padding:0 24px;}`;
css += `.sk-cd__tg{display:flex;flex-direction:column;gap:8px;}`;
css += `.sk-cd__head{display:flex;flex-direction:column;gap:2px;}`;
css += `.sk-cd__title{font-size:20px;font-weight:600;line-height:28px;color:#242424;}`;
css += `.sk-cd__sub{font-size:12px;color:#424242;line-height:16px;}`;
css += `.sk-cd__body{font-size:14px;line-height:20px;color:#242424;max-width:472px;}`;
css += `.sk-cd__body a{color:inherit;text-decoration:underline;text-underline-offset:2px;}`;
css += `.sk-cd__footer{display:flex;justify-content:flex-end;gap:8px;padding:4px 24px 0;}`;
css += `.sk-cd__btn{height:32px;padding:0 14px;border-radius:12px;border:none;font-family:inherit;font-size:14px;cursor:pointer;transition:background .1s;}`;
css += `.sk-cd__btn--sec{background:#f5f5f5;color:#242424;}.sk-cd__btn--sec:hover{background:#ebebeb;}`;
css += `.sk-cd__btn--pri{background:#242424;color:#fff;}.sk-cd__btn--pri:hover{background:#3b3b3b;}`;
css += `.sk-cd__btn--dis{background:#cfcfcf;color:#fff;}`;

// ─── Settings modal (sk-sm) ───
css += `.sk-frost{position:absolute;inset:0;background:rgba(247,247,248,.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);z-index:5;}`;
css += `.sk-sm{position:absolute;z-index:6;background:#fff;border-radius:22px;display:flex;box-shadow:0 24px 70px rgba(15,23,42,.22),0 0 3px rgba(0,0,0,.04);overflow:hidden;font-family:var(--deck-sans);}`;
css += `.sk-sm__nav{width:236px;flex-shrink:0;display:flex;flex-direction:column;gap:4px;padding:22px 16px;}`;
css += `.sk-sm__crumb{height:30px;font-size:15px;font-weight:600;color:#424242;display:flex;align-items:center;margin-bottom:6px;}`;
css += `.sk-sm__navitem{position:relative;display:flex;align-items:center;gap:11px;padding:11px 12px;border-radius:8px;font-size:15px;color:#242424;cursor:pointer;}`;
css += `.sk-sm__navitem:hover{background:rgba(0,0,0,.03);}`;
css += `.sk-sm__navitem.sel{background:#ebebeb;border-radius:10px;}`;
css += `.sk-sm__navitem.sel::before{content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:16px;background:#424242;border-radius:20px;}`;
css += `.sk-sm__navicon{width:20px;height:20px;color:#242424;display:inline-flex;align-items:center;}`;
css += `.sk-sm__navicon svg{width:20px;height:20px;display:block;}`;
css += `.sk-sm__div{width:1px;background:#e6e6e6;flex-shrink:0;}`;
css += `.sk-sm__main{width:560px;flex-shrink:0;display:flex;flex-direction:column;gap:16px;padding:22px 26px 26px;position:relative;}`;
css += `.sk-sm__x{position:absolute;top:18px;right:20px;width:32px;height:32px;border:none;background:transparent;border-radius:8px;cursor:pointer;color:#242424;display:flex;align-items:center;justify-content:center;}`;
css += `.sk-sm__x:hover{background:rgba(0,0,0,.04);}.sk-sm__x svg{width:20px;height:20px;}`;
css += `.sk-sm__title{font-size:20px;font-weight:700;color:#242424;}`;
css += `.sk-sm__desc{font-size:14px;color:#5a5a5a;line-height:20px;}`;
css += `.sk-sm__card{border:1px solid #e6e6e6;border-radius:12px;padding:6px;display:flex;flex-direction:column;}`;
css += `.sk-sm__crow{display:flex;align-items:center;gap:12px;padding:10px 12px;}`;
css += `.sk-sm__clogo{width:28px;height:28px;display:inline-flex;align-items:center;flex-shrink:0;}`;
css += `.sk-sm__clogo img,.sk-sm__clogo svg{width:28px;height:28px;object-fit:contain;border-radius:4px;display:block;}`;
css += `.sk-sm__cname{flex:1;font-size:15px;font-weight:600;color:#242424;}`;
css += `.sk-sm__cmore{width:30px;height:30px;border:none;background:transparent;color:#666;cursor:pointer;border-radius:6px;display:flex;align-items:center;justify-content:center;}`;
css += `.sk-sm__cmore:hover{background:rgba(0,0,0,.04);}.sk-sm__cmore svg{width:20px;height:20px;}`;
css += `.sk-sm__bhead{display:flex;align-items:center;justify-content:space-between;}`;
css += `.sk-sm__btitle{font-size:16px;font-weight:600;color:#242424;}`;
css += `.sk-sm__search{width:206px;height:34px;display:flex;align-items:center;gap:8px;padding:0 10px;border:1px solid #d6d6d6;border-radius:8px;background:#fff;}`;
css += `.sk-sm__search.is-focus{border-color:#242424;box-shadow:0 1px 0 #242424;}`;
css += `.sk-sm__search svg{width:18px;height:18px;color:#8a8a8a;flex-shrink:0;}`;
css += `.sk-sm__search input{flex:1;min-width:0;border:none;outline:none;font-size:14px;color:#242424;background:transparent;}`;
css += `.sk-sm__search input::placeholder{color:#8a8a8a;}`;
css += `.sk-sm__list{border:1px solid #e6e6e6;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:16px;}`;
css += `.sk-sm__row{display:flex;align-items:center;gap:12px;}`;
css += `.sk-sm__rlogo{width:32px;height:32px;display:inline-flex;align-items:center;flex-shrink:0;}`;
css += `.sk-sm__rlogo img,.sk-sm__rlogo svg{width:32px;height:32px;object-fit:contain;border-radius:4px;display:block;}`;
css += `.sk-sm__rmeta{flex:1;min-width:0;}`;
css += `.sk-sm__rname{font-size:14px;font-weight:600;color:#242424;}`;
css += `.sk-sm__rdesc{font-size:12px;color:#5a5a5a;}`;
css += `.sk-sm__connect{height:30px;padding:0 16px;border:1px solid #d0d0d0;border-radius:8px;background:#fff;font-family:inherit;font-size:13px;color:#242424;cursor:pointer;flex-shrink:0;}`;
css += `.sk-sm__connect:hover{background:#f5f5f5;}`;

// ─── Slide-2 connect composition (dialog + stat cards) ───
css += `.s2-wrap{position:absolute;left:410px;top:330px;display:flex;align-items:flex-start;gap:24px;}`;
css += `.s2-dialog-card{width:600px;border-radius:18px;background:#f3f3f3;padding:0;overflow:hidden;}`;
css += `.s2-stats{display:flex;flex-direction:column;gap:24px;}`;
css += `.s2-stat{width:300px;border-radius:18px;border:1px solid #e2e2e2;background:#fbfbfb;padding:30px 32px;display:flex;flex-direction:column;gap:14px;}`;
css += `.s2-stat--muted{background:#f3f3f3;color:#a8a8a8;}`;
css += `.s2-stat__top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;}`;
css += `.s2-stat__num{font-family:var(--deck-sans);font-weight:300;font-size:78px;line-height:.85;color:#2c2c2c;letter-spacing:-2px;}`;
css += `.s2-stat--muted .s2-stat__num{color:#bdbdbd;}`;
css += `.s2-stat__grid{display:grid;grid-template-columns:repeat(5,1fr);gap:5px;width:160px;}`;
css += `.s2-stat__grid span{width:28px;height:28px;border-radius:6px;overflow:hidden;display:inline-flex;}`;
css += `.s2-stat__grid img{width:100%;height:100%;object-fit:cover;}`;
css += `.s2-stat__label{font-family:var(--deck-sans);font-size:26px;color:#6a6a6a;}`;
css += `.s2-stat--muted .s2-stat__label{color:#bdbdbd;}`;

// ════════════════════════════════════════════════════════════════════
//  Builders
// ════════════════════════════════════════════════════════════════════

const BLUE = '#2f6bff';

// Status badge dot icons (monospace badges, top-right of content slides)
function statusDot(kind: string): string {
  if (kind === 'complete') return '<span class="slide-badge__dot"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" fill="#2e9e44"/><path d="M6 10.3l2.6 2.6L14 7.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
  if (kind === 'progress') return '<span class="slide-badge__dot"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke="#1f6bff" stroke-width="2"/><circle cx="10" cy="10" r="3.4" fill="#1f6bff"/></svg></span>';
  if (kind === 'risk') return '<span class="slide-badge__dot"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke="#e8590c" stroke-width="2"/><circle cx="10" cy="10" r="3.4" fill="#e8590c"/></svg></span>';
  return '';
}
type Badge = { text: string; kind?: string };
type Tag = { text: string; color: string };

const checkMini = '<svg viewBox="0 0 16 16" fill="none"><path d="M4 8.3l2.4 2.4L12 5.4" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';

interface ChromeOpts {
  eyebrow?: string; title?: string; badges?: Badge[]; tags?: Tag[]; annot?: string; pills?: string[];
}
function renderChrome(c: ChromeOpts): string {
  let h = '<div class="slide-bg"></div>';
  if (c.eyebrow) h += '<div class="slide-eyebrow">' + c.eyebrow + '</div>';
  if (c.title) h += '<div class="slide-title">' + c.title + '</div>';
  if (c.badges && c.badges.length) {
    h += '<div class="slide-badges">';
    for (const b of c.badges) h += '<span class="slide-badge">' + statusDot(b.kind || '') + b.text + '</span>';
    h += '</div>';
  }
  if (c.tags && c.tags.length) {
    h += '<div class="slide-tags">';
    for (const t of c.tags) h += '<span class="slide-tag"><span class="slide-tag__dot" style="background:' + t.color + '">' + checkMini + '</span>' + t.text + '</span>';
    h += '</div>';
  }
  if (c.annot) h += '<div class="slide-annot">' + c.annot + '</div>';
  if (c.pills && c.pills.length) {
    h += '<div class="slide-pills">';
    for (const p of c.pills) h += '<span class="slide-pill">' + p + '</span>';
    h += '</div>';
  }
  return h;
}

// Connector-node graphic (3 nodes joined — the "Copilot Connectors" motif)
function connectorGraphic(size: number): string {
  const s = size;
  return '<svg width="' + s + '" height="' + Math.round(s * 0.62) + '" viewBox="0 0 200 124" fill="none">'
    + '<line x1="34" y1="40" x2="92" y2="40" stroke="#5b8cff" stroke-width="7" stroke-linecap="round"/>'
    + '<line x1="120" y1="62" x2="120" y2="62" stroke="#5b8cff" stroke-width="7"/>'
    + '<path d="M92 40 Q120 40 120 70 L120 84" stroke="#5b8cff" stroke-width="7" fill="none" stroke-linecap="round"/>'
    + '<circle cx="26" cy="40" r="18" fill="#2f6bff"/>'
    + '<circle cx="100" cy="40" r="14" fill="none" stroke="#5b8cff" stroke-width="7"/>'
    + '<circle cx="120" cy="98" r="18" fill="#2f6bff"/>'
    + '</svg>';
}

// ─── Divider slide ───
interface DividerOpts { title: string; tl?: string; tr?: string; kicker?: boolean; layout?: 'mid' | 'bottom'; }
function renderDivider(d: DividerOpts): string {
  let h = '<div class="slide-divider">';
  h += '<div class="slide-divider__grain"></div>';
  if (d.kicker) {
    // Closing slide: "Copilot Connectors" lockup top-right + small graphic top-left
    h += '<div class="slide-divider__graphic" style="left:64px;top:48px;">' + connectorGraphic(150) + '</div>';
    h += '<div class="slide-divider__kicker"><div class="k1">Copilot Connectors</div><div class="k2"><span>' + (d.tr || '2026') + '</span><span>Saugata</span></div></div>';
  } else if (d.tl || d.tr) {
    // Title slide: corner labels + larger graphic bottom-right
    if (d.tl) h += '<div class="slide-divider__corner slide-divider__corner--tl">' + d.tl + '</div>';
    if (d.tr) h += '<div class="slide-divider__corner slide-divider__corner--tr">' + d.tr + '</div>';
    h += '<div class="slide-divider__graphic" style="right:120px;bottom:160px;">' + connectorGraphic(260) + '</div>';
  } else {
    // Section divider: small graphic top-left
    h += '<div class="slide-divider__graphic" style="left:64px;top:120px;">' + connectorGraphic(150) + '</div>';
  }
  const cls = d.layout === 'mid' ? 'slide-divider__title--mid' : 'slide-divider__title--bottom';
  h += '<div class="slide-divider__title ' + cls + '">' + d.title + '</div>';
  h += '</div>';
  return h;
}

// ─── Shell screen ───
interface ShellOpts {
  greeting?: string;        // default "Welcome back, Mona!"
  showWorkIQ?: boolean;     // header shows "Work IQ | Auto" vs just "Auto"
  placeholder?: string;
  zqChip?: boolean;         // show the "Explore Moodys'" source prompt chip
  zqOpen?: boolean;         // expand the prompt list
  toast?: boolean;          // slide-11 notification toast
  contentTop?: number;      // override the greeting/input vertical offset (inner px)
}
function buildShell(o: ShellOpts): string {
  const greeting = o.greeting || 'Welcome back, Mona!';
  const gParts = greeting.split(/,(.+)/);
  const g1 = gParts[0] + (greeting.indexOf(',') >= 0 ? ',' : '');
  const g2 = (gParts[1] || '').trim();
  let h = '<div class="sk-shell">';
  // Nav rail
  h += '<div class="sk-nav">';
  h += '<button class="sk-nav__btn" title="Copilot">' + copilotIco + '</button>';
  h += '<button class="sk-nav__btn" title="New chat">' + composeIco + '</button>';
  h += '<button class="sk-nav__btn" title="Search">' + searchIco + '</button>';
  h += '<button class="sk-nav__btn" title="Agents">' + agentIco + '</button>';
  h += '<button class="sk-nav__btn" title="Pages">' + folderIco + '</button>';
  h += '<button class="sk-nav__btn" title="Pinned">' + pinIco + '</button>';
  h += '<div class="sk-nav__spacer"></div>';
  h += '</div>';
  // Main
  h += '<div class="sk-main">';
  h += '<div class="sk-hdr"><div class="sk-hdr__left">';
  if (o.showWorkIQ !== false) {
    h += '<button class="sk-pick">' + briefcaseIco + '<span>Work IQ</span></button><span class="sk-pick__sep">|</span>';
  }
  h += '<button class="sk-pick"><span>Auto</span>' + chevronDownIco + '</button>';
  h += '</div><div class="sk-hdr__right">';
  h += '<button class="sk-iconbtn" title="Temp chat">' + chatHintHalfIco + '</button>';
  h += '<button class="sk-iconbtn sk-iconbtn--green" title="Protected">' + shieldTaskIco + '</button>';
  h += '<button class="sk-iconbtn" title="More">' + moreHorizontalIco + '</button>';
  h += '</div></div>';
  // Content
  h += '<div class="sk-content">';
  if (o.toast) {
    h += '<div class="sk-toast">';
    h += '<div class="sk-toast__top"><div class="sk-toast__title">Bring data from new sources</div>';
    h += '<button class="sk-toast__x" title="Dismiss">' + dismissIco + '</button></div>';
    h += '<div class="sk-toast__body">Connect Moody’s, Hubspot, LSEG and more to get insights from these sources in Copilot</div>';
    h += '<button class="sk-toast__btn" data-sk="connect-sources">Connect sources</button>';
    h += '</div>';
  }
  const ctop = o.contentTop != null ? (' style="margin-top:' + o.contentTop + 'px;"') : '';
  h += '<div class="sk-stage-inner"' + ctop + '>';
  h += '<div class="sk-greeting"><span class="g1">' + g1 + '</span> <span class="g2">' + g2 + '</span></div>';
  h += '<div class="sk-ci-area">';
  h += '<div class="sk-ci"><button class="sk-ci__add" title="Add">' + addIco + '</button>';
  h += '<textarea class="sk-ci__ta" rows="1" placeholder="' + (o.placeholder || 'Message Copilot') + '"></textarea>';
  h += '<button class="sk-ci__mic" title="Dictate">' + micIco + '</button>';
  h += '<button class="sk-ci__send" title="Send"><span class="i-eq">' + deviceEqIco + '</span><span class="i-arrow">' + arrowUpIco + '</span></button>';
  h += '<div class="sk-ci__line"></div></div>';
  // Chips
  h += '<div class="sk-chips">';
  if (o.zqChip) {
    h += '<button class="sk-chip sk-chip--source' + (o.zqOpen ? ' is-active' : '') + '" data-sk="zq-chip"><span class="sk-chip__logo"><img src="' + ASSET + 'moodys-logo.png" alt=""/></span>Explore Moodys’</button>';
    h += '<button class="sk-chip">Prepare for what’s ahead</button>';
    h += '<button class="sk-chip">Create something inspiring</button>';
  } else {
    h += '<button class="sk-chip">What’s new</button>';
    h += '<button class="sk-chip">Prepare for what’s ahead</button>';
    h += '<button class="sk-chip">Create something inspiring</button>';
  }
  h += '<button class="sk-chip__more" title="More">' + moreHorizontalIco + '</button>';
  h += '</div>';
  // ZQ prompt list
  const zqPrompts = [
    "What’s Tesla’s current Moody’s credit rating and outlook?",
    "Show me Moody’s rating actions on US banks this quarter",
    "Summarize Moody’s 2026 outlook for the European auto industry",
    'Compare credit ratings for Apple and Microsoft',
    "What’s Moody’s view on default risk in commercial real estate?",
  ];
  h += '<div class="sk-zq' + (o.zqOpen ? ' is-open' : '') + '" data-sk="zq-list">';
  for (const p of zqPrompts) h += '<button class="sk-zq__item">' + p + '</button>';
  h += '</div>';
  h += '</div>'; // ci-area
  h += '</div>'; // stage-inner
  h += '</div>'; // content
  h += '</div>'; // main
  h += '</div>'; // shell
  return h;
}

// Screen frame wrapper: shell sits in a 1296-wide frame as a 1440-wide inner @ ×0.9.
// The frame height (1920-space) clips the shell card; default 495 matches the
// homepage-screen height in the Figma deck (greeting/input/chips near the lower
// third, annotation visible below the card).
function shellFrame(inner: string, frameH = 495): string {
  const innerH = Math.round(frameH / 0.9);
  let h = '<div class="screen-frame" style="left:312px;top:280px;width:1296px;height:' + frameH + 'px;">';
  h += '<div class="screen-frame__inner" style="width:1440px;height:' + innerH + 'px;transform:scale(0.9);">' + inner + '</div>';
  h += '</div>';
  return h;
}
const smVoiceIco = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM6 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm-2 6.25C4 11.007 5.007 10 6.25 10h3.5c1.243 0 2.25 1.007 2.25 2.25 0 1.659-.756 2.94-1.94 3.787C8.892 16.866 7.43 17.25 6 17.25c-1.43 0-2.892-.384-4.06-1.213C.756 15.19 0 13.909 0 12.25Zm10.5 0c0-.69-.56-1.25-1.25-1.25h-6.5c-.69 0-1.25.56-1.25 1.25 0 1.34.61 2.31 1.522 2.962.93.66 2.184 1.038 3.478 1.038 1.294 0 2.547-.378 3.478-1.038.913-.652 1.522-1.621 1.522-2.962ZM16 3a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13A.5.5 0 0 1 16 3Zm-2.5 2.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5Zm5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5Z" fill="currentColor"/></svg>';

// ─── Connect dialog ───
const moodys48 = '<img src="' + ASSET + 'moodys-logo.png" alt="Moody’s"/>';
const lseg48 = '<img src="' + ASSET + 'lseg-logo.png" alt="LSEG"/>';
function buildConnectDialog(o: { source: string; logo: string; primary?: 'dark' | 'gray'; width?: number }): string {
  const pri = o.primary === 'gray' ? 'sk-cd__btn--dis' : 'sk-cd__btn--pri';
  const w = o.width ? (' style="width:' + o.width + 'px;"') : '';
  let h = '<div class="sk-cd"' + w + '>';
  h += '<div class="sk-cd__hero"></div>';
  h += '<div class="sk-cd__icons"><span class="sk-cd__brand">' + copilotIco + '</span><span class="sk-cd__dots">' + cdMoreDots + '</span><span class="sk-cd__brand">' + o.logo + '</span></div>';
  h += '<div class="sk-cd__content"><div class="sk-cd__tg"><div class="sk-cd__head">';
  h += '<div class="sk-cd__title">Connect ' + o.source + '</div><div class="sk-cd__sub">Developed by Microsoft Corporation</div></div>';
  h += '<div class="sk-cd__body">Let Copilot securely read your content from ' + o.source + '. You can manage your sources in <a href="#">Settings</a>.</div></div></div>';
  h += '<div class="sk-cd__footer"><button class="sk-cd__btn sk-cd__btn--sec">Cancel</button><button class="sk-cd__btn ' + pri + '" data-sk="cd-continue">Continue to ' + o.source + '</button></div>';
  h += '</div>';
  return h;
}

// ─── Settings modal (Sources tab) ───
function smNavItem(icon: string, label: string, sel = false): string {
  return '<div class="sk-sm__navitem' + (sel ? ' sel' : '') + '"><span class="sk-sm__navicon">' + icon + '</span>' + label + '</div>';
}
function smConnRow(key: string): string {
  let logo = '', name = '';
  if (key === 'm365') { logo = copilotIco; name = 'Microsoft 365 Apps'; }
  else { const s = CATALOG.find(c => c.key === key)!; logo = s.ico; name = s.name; }
  return '<div class="sk-sm__crow"><span class="sk-sm__clogo">' + logo + '</span><span class="sk-sm__cname">' + name + '</span><button class="sk-sm__cmore">' + smMoreHorizontalIco + '</button></div>';
}
function smBrowseRow(key: string, hot = false): string {
  const s = CATALOG.find(c => c.key === key)!;
  const hotAttr = hot ? ' data-hot="1"' : '';
  return '<div class="sk-sm__row"><span class="sk-sm__rlogo">' + s.ico + '</span><div class="sk-sm__rmeta"><div class="sk-sm__rname">' + s.name + '</div><div class="sk-sm__rdesc">' + s.desc + '</div></div><button class="sk-sm__connect" data-sk="advance"' + hotAttr + '>Connect</button></div>';
}
function buildSettingsModal(o: { connected: string[]; browse: string[]; searchFocus?: boolean; pos: 'center' | 'right'; top?: number; scrolled?: boolean; hotKey?: string }): string {
  const posCss = o.pos === 'right' ? 'right:34px;' : 'left:50%;transform:translateX(-50%);';
  let h = '<div class="sk-sm" style="' + posCss + 'top:' + (o.top != null ? o.top : 40) + 'px;">';
  h += '<div class="sk-sm__nav"><div class="sk-sm__crumb">Chat settings</div>';
  h += smNavItem(smChatIco, 'General') + smNavItem(smDataUsageIco, 'Data controls') + smNavItem(smPeopleSettingsIco, 'Personalization') + smNavItem(smVoiceIco, 'Voice') + smNavItem(smAgentsIco, 'Agents') + smNavItem(smFlowFilledIco, 'Sources', true);
  h += '</div><div class="sk-sm__div"></div>';
  h += '<div class="sk-sm__main"><button class="sk-sm__x">' + smDismissIco + '</button>';
  if (!o.scrolled) {
    h += '<div class="sk-sm__title">Sources</div><div class="sk-sm__desc">Add and manage the sources Copilot uses to find and retrieve content for you.</div>';
    h += '<div class="sk-sm__card">' + smConnRow('m365') + o.connected.map(smConnRow).join('') + '</div>';
  }
  h += '<div class="sk-sm__bhead"><div class="sk-sm__btitle">Browse sources</div><div class="sk-sm__search' + (o.searchFocus ? ' is-focus' : '') + '">' + smSearchIco + '<input placeholder="Search for a source"/></div></div>';
  h += '<div class="sk-sm__list">' + o.browse.map(k => smBrowseRow(k, k === o.hotKey)).join('') + '</div>';
  h += '</div></div>';
  return h;
}
// Settings screen = dimmed homepage shell + frost + modal (+ optional connect dialog)
function buildSettingsScreen(o: { connected: string[]; browse: string[]; searchFocus?: boolean; pos: 'center' | 'right'; top?: number; dialog?: string; dialogPos?: string; scrolled?: boolean; hotKey?: string }): string {
  let inner = buildShell({ greeting: 'Welcome back, Mona!' });
  inner += '<div class="sk-frost"></div>';
  inner += buildSettingsModal(o);
  if (o.dialog) inner += '<div style="position:absolute;z-index:7;' + (o.dialogPos || 'left:70px;top:150px;') + '">' + o.dialog + '</div>';
  return inner;
}

// ─── Slide-2 stat cards ───
function statNine(): string {
  const grid = ['canva-logo.png', 'google-calendar-logo.png', 'google-contacts-logo.png', 'hubspot-logo.png', 'intercom-logo.png', 'lseg-logo.png', 'moodys-logo.png', 'notion-logo.png', 'linear-logo.png'];
  let g = '<div class="s2-stat__grid">';
  for (const f of grid) g += '<span><img src="' + ASSET + f + '" alt=""/></span>';
  g += '</div>';
  return '<div class="s2-stat"><div class="s2-stat__top"><div class="s2-stat__num">9</div>' + g + '</div><div class="s2-stat__label">enabled currently</div></div>';
}
function statThirty(): string {
  return '<div class="s2-stat s2-stat--muted"><div class="s2-stat__num">30+</div><div class="s2-stat__label">expected by July</div></div>';
}

// ════════════════════════════════════════════════════════════════════
//  SLIDES
// ════════════════════════════════════════════════════════════════════
type SlideRender = string;
interface Slide { id: number; section: string; hotspot?: string; html: SlideRender; }
const SLIDES: Slide[] = [];
function addSlide(s: Slide) { SLIDES.push(s); }

// 1 — divider: discovery
addSlide({ id: 1, section: 'discovery', html: renderDivider({ title: "discovery<br>of FCC’s<br>in Copilot", tl: '2026', tr: 'Saugata', layout: 'bottom' }) });

// 2 — connect dialog (Moody's) + stat cards
addSlide({ id: 2, section: 'discovery', html:
  renderChrome({
    eyebrow: 'What are',
    title: 'Federated Copilot Connectors',
    annot: 'Federated connectors allow Copilot user to bring in external data, <b>enriching and grounding responses in 3P context.</b> End users in Copilot can <b>easily authenticate and connect to a source; without any admin involvement.</b>',
    pills: ['1 click end-user authentication', 'No admin involvement required'],
  })
  + '<div class="s2-wrap">'
  + buildConnectDialog({ source: 'Moodys’', logo: moodys48, primary: 'gray', width: 600 })
  + '<div class="s2-stats">' + statNine() + statThirty() + '</div>'
  + '</div>'
});

// 3 — static: current numbers
addSlide({ id: 3, section: 'discovery', html:
  renderChrome({ eyebrow: 'What are', title: 'Our current numbers' })
  + '<div class="stat-wrap"><div class="stat-row">'
  + '<div class="stat-card"><div class="stat-card__num">318+</div><div class="stat-card__label">Tenants have<br>FCCs enabled*</div></div>'
  + '<div class="stat-card"><div class="stat-card__num">423</div><div class="stat-card__label">Users connected<br>across all tenants</div></div>'
  + '</div>'
  + '<div><div class="stat-headline">only <em>~1.3</em> users per tenant</div><div class="stat-sub">are connected to <b>at-least 1 FCC</b></div></div>'
  + '</div>'
  + '<div class="stat-foot">*Currently in 10% WW</div>'
});

// 4 — static: persona
addSlide({ id: 4, section: 'discovery', html:
  renderChrome({ eyebrow: 'Who is our', title: 'User persona' })
  + '<div class="persona-wrap"><div class="persona-row">'
  + '<div class="persona-card"><div class="persona-id">'
  + '<img class="persona-photo" src="' + ASSET + 'avatar-mona-kane.png" alt="Mona Kane"/>'
  + '<div class="persona-name">Mona Kane</div></div>'
  + '<div class="persona-desc">Mona Kane is a financial analyst at Contoso</div></div>'
  + '<div class="persona-tags">'
  + '<span class="slide-pill">Curious about AI</span>'
  + '<span class="slide-pill">Not aware of sources or connectors</span>'
  + '<span class="slide-pill">Has active Moody’s &amp; LSEG subscriptions</span>'
  + '<div class="persona-logos"><span>' + copilotIco + '</span><span>' + logoImg('moodys-logo.png', "Moody’s", 4) + '</span><span>' + logoImg('lseg-logo.png', 'LSEG', 4) + '</span></div>'
  + '</div></div></div>'
  + '<div class="persona-quote">“I want Copilot to help me in my <b>daily tasks faster</b>, and <b>give me responses and analysis that is grounded in live market data &amp; certified sources.</b>”</div>'
  + '<div class="persona-foot">Contoso has recently purchased Copilot licences for their employees</div>'
});

// 10 — divider: increase awareness
addSlide({ id: 10, section: 'awareness', html: renderDivider({ title: 'increase<br>awareness', layout: 'bottom' }) });

// 11 — shell + notification toast
addSlide({ id: 11, section: 'awareness', hotspot: '[data-sk="connect-sources"]', html:
  renderChrome({
    eyebrow: 'awareness through',
    title: 'Teaching moment (Notification)',
    tags: [{ text: 'Claude', color: '#e8833a' }, { text: 'OAI', color: '#1a1a1a' }],
    badges: [{ text: 'Approvals Complete', kind: 'complete' }, { text: 'ETA : WW 6/30' }],
    annot: 'When Mona open’s Copilot, she receives <b>a notification making her aware of sources and the ability to connect her data</b> even before she has expressed any intent',
    pills: ['1 notif per addressable user', '1 notif per new batch release in phase 2'],
  })
  + shellFrame(buildShell({ greeting: 'Welcome back, Mona!', showWorkIQ: false, toast: true }))
});

const settingsChrome12 = {
  eyebrow: 'converting intent through',
  title: 'Source tab in settings',
  tags: [{ text: 'Claude', color: '#e8833a' }, { text: 'OAI', color: '#1a1a1a' }],
  badges: [{ text: 'Approvals Complete', kind: 'complete' }, { text: 'ETA : WW 6/30' }] as Badge[],
  annot: 'Mona clicks on the notification and is redirected to the <b>sources tab in settings, where she can browse and search &amp; connect to a source easily</b>',
  pills: ['Featured sources followed by rest alphabetically', 'Search across catalogue, with domain search in Phase 2'],
};

// 12 — settings Sources tab, search field highlighted
addSlide({ id: 12, section: 'awareness', hotspot: '.sk-sm__search', html:
  renderChrome(settingsChrome12)
  + shellFrame(buildSettingsScreen({ connected: [], browse: ['hubspot', 'lseg', 'moodys', 'canva', 'gcal'], searchFocus: true, pos: 'center', top: 28 }), 560)
});

// 13 — settings Sources tab (scrolled list), cursor on Moody's Connect
addSlide({ id: 13, section: 'awareness', hotspot: '[data-hot="1"]', html:
  renderChrome(Object.assign({}, settingsChrome12, { badges: [{ text: 'Approvals Complete', kind: 'complete' }, { text: 'ETA : WW 6/22' }] as Badge[] }))
  + shellFrame(buildSettingsScreen({ connected: [], browse: ['hubspot', 'lseg', 'moodys', 'canva', 'gcal', 'gcontact', 'intercom', 'linear'], pos: 'center', top: 40, scrolled: true, hotKey: 'moodys' }), 560)
});

// 14 — connect dialog (Moody's) over settings (Moody's now connected)
addSlide({ id: 14, section: 'awareness', hotspot: '[data-sk="cd-continue"]', html:
  renderChrome({
    eyebrow: 'converting intent through',
    title: 'Source tab in settings',
    tags: [{ text: 'Claude', color: '#e8833a' }, { text: 'OAI', color: '#1a1a1a' }],
    badges: [{ text: 'Approvals Complete', kind: 'complete' }, { text: 'ETA : WW 6/22' }],
    annot: 'Mona connects to Moodys’, and it moves up to the connected section',
  })
  + shellFrame(buildSettingsScreen({
      connected: ['moodys'], browse: ['lseg', 'canva', 'gcal'], pos: 'right', top: 18,
      dialog: buildConnectDialog({ source: 'Moodys’', logo: moodys48, primary: 'dark' }),
      dialogPos: 'left:40px;top:150px;',
    }), 580)
});

const zqChrome = {
  eyebrow: 'awareness &amp; engagement through',
  title: 'ZQ prompts',
  tags: [{ text: 'Claude', color: '#e8833a' }] as Tag[],
  badges: [{ text: 'Design in progress', kind: 'progress' }] as Badge[],
  annot: 'Back on the Copilot homepage, Mona can now see a <b>new prompt tab for Moodys’</b> listed with prompts that help her engage with the source easily.',
  pills: ['Platinum prompt sets for recently connected source', 'Tab persistent for that chat’s ZQ state'],
};

// 15 — shell + "Explore Moodys'" ZQ prompt chip (collapsed)
addSlide({ id: 15, section: 'awareness', hotspot: '[data-sk="zq-chip"]', html:
  renderChrome(zqChrome)
  + shellFrame(buildShell({ greeting: 'Welcome back, Mona!', zqChip: true }), 540)
});

// 16 — shell + ZQ prompt list expanded (greeting shifts up to make room for prompts)
addSlide({ id: 16, section: 'awareness', html:
  renderChrome(zqChrome)
  + shellFrame(buildShell({ greeting: 'Welcome back, Mona!', zqChip: true, zqOpen: true, contentTop: 90 }), 580)
});

// 17, 25, 30 — section dividers (screens added later)
addSlide({ id: 17, section: 'convert', html: renderDivider({ title: 'convert intent<br>into attached', layout: 'bottom' }) });
addSlide({ id: 25, section: 'engaged', html: renderDivider({ title: 'connected<br>to engaged', layout: 'bottom' }) });
addSlide({ id: 30, section: 'summary', html: renderDivider({ title: 'summarizing…', layout: 'bottom' }) });

// 32 — closing
addSlide({ id: 32, section: 'closing', html: renderDivider({ title: 'thank<br>you', kicker: true, tr: '2026', layout: 'bottom' }) });

// ════════════════════════════════════════════════════════════════════
//  Runtime script
// ════════════════════════════════════════════════════════════════════
const SLIDE_META = SLIDES.map(s => ({ id: s.id, section: s.section, hotspot: s.hotspot || null }));

const runtime = `
(function(){
  var META = ${JSON.stringify(SLIDE_META)};
  var stage = document.getElementById('stage');
  var wrap = document.getElementById('stageWrap');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var baked = slides.map(function(s){ return s.innerHTML; });
  var counter = document.getElementById('counter');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var idx = 0;
  var curScale = 1;
  var cursor = document.getElementById('deckCursor');

  function layout(){
    var s = Math.min(window.innerWidth/1920, window.innerHeight/1080);
    curScale = s;
    stage.style.transform = 'scale(' + s + ')';
    wrap.style.width = (1920*s) + 'px';
    wrap.style.height = (1080*s) + 'px';
    wrap.style.left = ((window.innerWidth - 1920*s)/2) + 'px';
    wrap.style.top = ((window.innerHeight - 1080*s)/2) + 'px';
    positionCursor();
  }
  window.addEventListener('resize', layout);

  var _hotEl = null;
  function applyHotspot(slideEl, sel){
    _hotEl = null;
    if (!sel) return;
    var el = slideEl.querySelector(sel);
    if (el){ el.classList.add('deck-hotspot'); _hotEl = el; }
  }
  // Place the pointer cursor just below-right of the active hotspot, in stage space.
  function positionCursor(){
    if (!_hotEl){ cursor.style.display = 'none'; return; }
    var hr = _hotEl.getBoundingClientRect();
    var sr = stage.getBoundingClientRect();
    var S = curScale || 1;
    var x = (hr.left - sr.left)/S + (hr.width/S)*0.62;
    var y = (hr.top - sr.top)/S + (hr.height/S) + 2;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
    cursor.style.display = 'block';
  }
  function wireShell(slideEl){
    // chat input focus + has-text states (hybrid free typing)
    var ci = slideEl.querySelector('.sk-ci');
    if (ci){
      var ta = ci.querySelector('.sk-ci__ta');
      if (ta){
        ta.addEventListener('focus', function(){ ci.classList.add('is-focus'); });
        ta.addEventListener('blur', function(){ ci.classList.remove('is-focus'); });
        ta.addEventListener('input', function(){ ci.classList.toggle('is-text', ta.value.trim().length>0); });
      }
    }
    // ZQ chip: when it is the scripted hotspot (slide 15) let the click bubble so
    // the deck advances to the expanded state; otherwise toggle the list locally.
    var zqChip = slideEl.querySelector('[data-sk="zq-chip"]');
    var zqList = slideEl.querySelector('[data-sk="zq-list"]');
    if (zqChip && zqList){
      zqChip.addEventListener('click', function(e){
        if (zqChip.classList.contains('deck-hotspot')) return;
        e.stopPropagation();
        zqChip.classList.toggle('is-active'); zqList.classList.toggle('is-open');
      });
    }
    var zqItems = slideEl.querySelectorAll('.sk-zq__item');
    Array.prototype.forEach.call(zqItems, function(it){
      it.addEventListener('click', function(e){ e.stopPropagation(); var t=slideEl.querySelector('.sk-ci__ta'); if(t){ t.value=it.textContent; t.closest('.sk-ci').classList.add('is-text'); } });
    });
  }
  function show(n){
    n = Math.max(0, Math.min(slides.length-1, n));
    var prev = slides[idx];
    if (prev) prev.classList.remove('slide--active');
    idx = n;
    var el = slides[idx];
    // snap back to baked state
    el.innerHTML = baked[idx];
    el.classList.add('slide--active');
    wireShell(el);
    applyHotspot(el, META[idx].hotspot);
    positionCursor();
    counter.textContent = (idx+1) + ' / ' + slides.length;
    prevBtn.disabled = (idx===0);
    nextBtn.disabled = (idx===slides.length-1);
  }
  function next(){ show(idx+1); }
  function prev(){ show(idx-1); }
  window.__deckNext = next; window.__deckPrev = prev; window.__deckGo = show;

  // ESC grid overview
  var grid = document.getElementById('deckGrid');
  var gridInner = document.getElementById('gridInner');
  function buildGrid(){
    if (gridInner.children.length) return;
    var TW = 366, S = TW/1920;
    for (var i=0;i<slides.length;i++){
      var thumb = document.createElement('div');
      thumb.className = 'deck-thumb';
      thumb.style.width = TW + 'px';
      thumb.style.height = (1080*S) + 'px';
      var sc = document.createElement('div');
      sc.className = 'deck-thumb__scale';
      sc.style.transform = 'scale(' + S + ')';
      sc.innerHTML = baked[i];
      thumb.appendChild(sc);
      var num = document.createElement('div'); num.className = 'deck-thumb__num'; num.textContent = (i+1); thumb.appendChild(num);
      (function(k){ thumb.addEventListener('click', function(){ closeGrid(); show(k); }); })(i);
      gridInner.appendChild(thumb);
    }
  }
  function openGrid(){ buildGrid(); markGridCurrent(); grid.classList.add('deck-grid--open'); }
  function closeGrid(){ grid.classList.remove('deck-grid--open'); }
  function gridOpen(){ return grid.classList.contains('deck-grid--open'); }
  function toggleGrid(){ gridOpen() ? closeGrid() : openGrid(); }
  function markGridCurrent(){
    var thumbs = gridInner.children;
    for (var i=0;i<thumbs.length;i++) thumbs[i].classList.toggle('is-current', i===idx);
  }
  counter.addEventListener('click', function(e){ e.stopPropagation(); toggleGrid(); });

  // keyboard — ignore nav keys while the audience is typing in a field (hybrid mode)
  document.addEventListener('keydown', function(e){
    if (e.key==='Escape'){ e.preventDefault(); toggleGrid(); return; }
    if (gridOpen()){ return; }
    var tag = (e.target && e.target.tagName) || '';
    var typing = (tag==='INPUT' || tag==='TEXTAREA' || (e.target && e.target.isContentEditable));
    if (typing) return;
    if (e.key==='ArrowRight' || e.key===' ' || e.key==='PageDown'){ e.preventDefault(); next(); }
    else if (e.key==='ArrowLeft' || e.key==='PageUp'){ e.preventDefault(); prev(); }
    else if (e.key==='Home'){ e.preventDefault(); show(0); }
    else if (e.key==='End'){ e.preventDefault(); show(slides.length-1); }
  });
  // Live controls that should NOT trigger a background advance (the audience can
  // freely interact with them — hybrid mode). The chat textarea, source toggles,
  // nav buttons, secondary dialog buttons, etc.
  var ALLOW = '.sk-ci__ta, .sk-ci__add, .sk-ci__mic, .sk-nav__btn, .sk-iconbtn, .sk-pick, .sk-chip__more, .sk-zq__item, .sk-sm__x, .sk-sm__cmore, .sk-toast__x, .sk-cd__btn--sec, .sk-tgl, input, textarea';
  var ADVANCE = '.deck-hotspot, [data-sk="connect-sources"], [data-sk="advance"], [data-sk="cd-continue"]';
  stage.addEventListener('click', function(e){
    // 1) the highlighted hotspot / scripted advance triggers always move forward
    if (e.target.closest(ADVANCE)){ next(); return; }
    // 2) live controls are handled by their own listeners, no advance
    if (e.target.closest(ALLOW)) return;
    // 3) any other click on the stage advances the deck
    next();
  });
  prevBtn.addEventListener('click', function(e){ e.stopPropagation(); prev(); });
  nextBtn.addEventListener('click', function(e){ e.stopPropagation(); next(); });

  layout(); show(0);
})();
`;

// ════════════════════════════════════════════════════════════════════
//  HTML document
// ════════════════════════════════════════════════════════════════════
let html = '<!DOCTYPE html>';
html += '<html lang="en"><head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1"/>';
html += '<title>Source Discovery — Interactive Deck</title>';
html += '<style>' + css + '</style>';
html += '</head><body>';
html += '<div class="deck-root" id="deckRoot" tabindex="0">';
html += '<div class="deck-stage-wrap" id="stageWrap"><div class="slide-stage" id="stage">';
for (const s of SLIDES) {
  html += '<div class="slide" data-id="' + s.id + '">' + s.html + '</div>';
}
html += '<div class="sk-cursor" id="deckCursor" style="display:none;"><svg viewBox="0 0 28 28" fill="none"><path d="M5 3l16 8.2-6.7 1.8-3.4 6.4L5 3z" fill="#2f6bff" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg></div>';
html += '</div></div>';
html += '<button class="deck-arrow deck-arrow--prev" id="prevBtn" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
html += '<button class="deck-arrow deck-arrow--next" id="nextBtn" aria-label="Next"><svg viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
html += '<div class="deck-counter" id="counter">1 / ' + SLIDES.length + '</div>';
html += '<div class="deck-grid" id="deckGrid"><div class="deck-grid__title">Overview — click a slide to jump · Esc to close</div><div class="deck-grid__inner" id="gridInner"></div></div>';
html += '</div>';
html += '<script>' + runtime + '<\/script>';
html += '</body></html>';

// ─── Write ───
const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'sourceDiscoveryDeck.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath + ' (' + SLIDES.length + ' slides)');
