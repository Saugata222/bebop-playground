/**
 * Header — Interactive Preview
 *
 * Shows all 8 header shell types stacked vertically:
 *   1. Chat ZQ
 *   2. Chat Session
 *   3. Agent ZQ
 *   4. Agent Session
 *   5. Workspace ZQ
 *   6. Workspace Session
 *   7. Artifact
 *   8. Placeholder
 *
 * Action buttons are Subtle 32×32 circular icon-only buttons.
 * Model picker is Subtle Medium button with chevron-down.
 */

import * as fs from 'fs';
import * as path from 'path';

// ─── Icons (20px, fill="currentColor") ──────────────────────────────

const chevronDown = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.8537 7.64582C16.0493 7.84073 16.0499 8.15731 15.855 8.35292L10.39 13.8374C10.1751 14.0531 9.82574 14.0531 9.6108 13.8374L4.14582 8.35292C3.9509 8.15731 3.95147 7.84073 4.14708 7.64582C4.34269 7.4509 4.65927 7.45147 4.85418 7.64708L10.0004 12.8117L15.1466 7.64708C15.3415 7.45147 15.6581 7.4509 15.8537 7.64582Z" fill="currentColor"/></svg>';

const share = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.49994 2.99983C9.77601 2.99983 9.99982 3.22379 9.99994 3.49983C9.99991 3.77595 9.77606 3.99983 9.49994 3.99983H5.99994C4.89544 3.99983 4.00006 4.89537 3.99994 5.99983V13.9998C3.99997 15.1044 4.89539 15.9998 5.99994 15.9998H13.9999C15.1045 15.9998 15.9999 15.1044 15.9999 13.9998V12.4998C16.0001 12.2238 16.2239 11.9998 16.4999 11.9998C16.776 11.9998 16.9998 12.2238 16.9999 12.4998V13.9998C16.9999 15.6567 15.6568 16.9998 13.9999 16.9998H5.99994C4.34311 16.9998 2.99997 15.6567 2.99994 13.9998V5.99983C3.00006 4.34308 4.34316 2.99983 5.99994 2.99983H9.49994ZM13.2968 2.0428C13.477 1.96273 13.6883 1.99586 13.8349 2.12776L18.8349 6.62776C18.9401 6.72253 18.9999 6.85821 18.9999 6.99983C18.9999 7.14148 18.9401 7.2771 18.8349 7.3719L13.8349 11.8719C13.6882 12.0039 13.4771 12.037 13.2968 11.9569C13.1165 11.8765 13 11.6972 12.9999 11.4998V9.33968C11.5991 9.46788 10.3347 10.1192 9.29974 10.9481C8.28548 11.7605 7.52478 12.716 7.10541 13.4324L6.9472 13.7235C6.84349 13.9308 6.61037 14.0394 6.3847 13.9862C6.15928 13.9327 5.99997 13.7315 5.99994 13.4998C5.99997 11.4515 6.38151 9.21555 7.51849 7.47639C8.60923 5.8083 10.3673 4.64297 12.9999 4.51253V2.49983L13.0048 2.42659C13.0296 2.25912 13.1391 2.11304 13.2968 2.0428ZM13.9999 4.99983C13.9999 5.27595 13.7761 5.49983 13.4999 5.49983C10.9124 5.49983 9.32304 6.54517 8.35638 8.02327C7.67093 9.07163 7.28303 10.3628 7.11029 11.7069C7.54271 11.187 8.06927 10.6528 8.67474 10.1678C9.943 9.15206 11.6004 8.31526 13.4999 8.31526C13.776 8.31526 13.9997 8.53928 13.9999 8.81526V10.3758L17.7509 6.99983L13.9999 3.62288V4.99983Z" fill="currentColor"/></svg>';

const chatHintHalf = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.34743 5.55836C3.51577 5.30672 3.87062 5.28565 4.08473 5.49977C4.2614 5.67681 4.27921 5.95543 4.14235 6.16481C4.01249 6.36334 3.89243 6.56912 3.78298 6.78102C3.28305 7.74466 2.99982 8.83921 2.99978 9.99978C2.99978 11.2434 3.32513 12.4099 3.89333 13.4217C3.95578 13.5328 3.97395 13.6642 3.94313 13.7879L3.18727 16.8113L6.2107 16.0555L6.30445 16.0418C6.3986 16.0366 6.49355 16.0585 6.57691 16.1053C7.58902 16.674 8.75578 16.9997 9.99976 16.9998C11.4155 16.9998 12.7327 16.5779 13.8347 15.8562C14.044 15.7193 14.3227 15.7373 14.4997 15.9139C14.7139 16.128 14.6928 16.4828 14.4411 16.6512C13.1388 17.5221 11.5718 17.9998 9.99976 17.9998C8.65066 17.9997 7.37954 17.6633 6.26441 17.073L2.62087 17.9852C2.45067 18.0275 2.27033 17.9773 2.14626 17.8533C2.02237 17.7292 1.97198 17.5489 2.01443 17.3787L2.92458 13.7332C2.33515 12.6185 1.99978 11.3478 1.99978 9.99978C1.99983 8.42601 2.47709 6.86076 3.34743 5.55836ZM17.365 11.0008C17.6676 11.001 17.9033 11.2663 17.8445 11.5633C17.637 12.6109 17.2245 13.5842 16.6511 14.4412C16.4826 14.6928 16.1279 14.7139 15.9138 14.4998C15.7372 14.3228 15.7191 14.0439 15.8562 13.8348C16.3285 13.1148 16.6713 12.3022 16.8523 11.4304C16.9032 11.1852 17.1144 11.0008 17.365 11.0008ZM15.9148 5.49977C16.1289 5.28566 16.4836 5.30681 16.6521 5.55836C17.2253 6.41552 17.6372 7.38948 17.8445 8.43728C17.9032 8.73422 17.6676 9.00056 17.365 9.00076C17.1144 9.00076 16.9041 8.81542 16.8533 8.57009C16.6725 7.69802 16.3294 6.88506 15.8572 6.16481C15.7201 5.9556 15.7382 5.6768 15.9148 5.49977ZM8.43726 2.15504C8.73418 2.09633 9.0005 2.33192 9.00073 2.63453C9.00073 2.88508 8.8154 3.09633 8.57007 3.14723C7.69819 3.32813 6.88588 3.67102 6.16578 4.14332C5.95611 4.28083 5.6761 4.26203 5.49879 4.08473C5.2845 3.87025 5.30629 3.51498 5.55836 3.34645C6.41551 2.77342 7.38953 2.36222 8.43726 2.15504ZM11.5632 2.15504C12.6108 2.36254 13.5842 2.77507 14.4411 3.3484C14.6928 3.51686 14.7139 3.87157 14.4997 4.08571C14.3227 4.26233 14.0439 4.28048 13.8347 4.14332C13.1147 3.67098 12.3022 3.32823 11.4304 3.14723C11.1851 3.0963 11.0007 2.88506 11.0007 2.63453C11.001 2.33194 11.2663 2.09626 11.5632 2.15504Z" fill="currentColor"/></svg>';

const shieldTask = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8536 7.85355C14.0488 7.65829 14.0488 7.34171 13.8536 7.14645C13.6583 6.95118 13.3417 6.95118 13.1464 7.14645L9.5 10.7929L7.85355 9.14645C7.65829 8.95119 7.34171 8.95119 7.14645 9.14645C6.95118 9.34171 6.95118 9.65829 7.14645 9.85355L9.14645 11.8536C9.34171 12.0488 9.65829 12.0488 9.85355 11.8536L13.8536 7.85355ZM10.2774 2.08397C10.1094 1.97201 9.8906 1.97201 9.72265 2.08397C7.78446 3.3761 5.68833 4.18231 3.42929 4.50503C3.18296 4.54021 3 4.75118 3 5V9.5C3 13.3913 5.30699 16.2307 9.82051 17.9667C9.93605 18.0111 10.064 18.0111 10.1795 17.9667C14.693 16.2307 17 13.3913 17 9.5V5C17 4.75118 16.817 4.54021 16.5707 4.50503C14.3117 4.18231 12.2155 3.3761 10.2774 2.08397ZM4 5.42787C5.98541 5.09055 7.85275 4.39606 9.59914 3.34583L10 3.09715L10.4009 3.34583C12.1473 4.39606 14.0146 5.09055 16 5.42787V9.5C16 12.8921 14.0321 15.3634 10 16.9632C5.96795 15.3634 4 12.8921 4 9.5V5.42787Z" fill="currentColor"/></svg>';

const moreHorizontal = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.25 10C6.25 10.6904 5.69036 11.25 5 11.25C4.30964 11.25 3.75 10.6904 3.75 10C3.75 9.30964 4.30964 8.75 5 8.75C5.69036 8.75 6.25 9.30964 6.25 10ZM11.25 10C11.25 10.6904 10.6904 11.25 10 11.25C9.30964 11.25 8.75 10.6904 8.75 10C8.75 9.30964 9.30964 8.75 10 8.75C10.6904 8.75 11.25 9.30964 11.25 10ZM15 11.25C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25Z" fill="currentColor"/></svg>';

const planet = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 10.2205 3.51098 10.4385 3.53243 10.6534C3.03147 10.7058 2.71353 10.664 2.52319 10.5941C2.50783 10.3981 2.5 10.2 2.5 10C2.5 9.73438 2.51381 9.47198 2.54075 9.21349C1.71362 9.33698 1.21352 9.78526 1.05719 10.1934C0.968031 10.4262 0.979095 10.6594 1.0971 10.8737C1.21855 11.0941 1.48202 11.3439 1.98596 11.5311C2.59618 11.7569 3.5538 11.7294 4.90756 11.3844C6.24241 11.0442 7.88092 10.4175 9.80009 9.54511C11.7413 8.66274 13.4392 8.00847 14.8552 7.64687C16.2522 7.29013 17.4596 7.19495 18.3674 7.531C19.0281 7.77556 19.5106 8.15709 19.7755 8.63987C20.0434 9.12821 20.0597 9.66984 19.8752 10.1585C19.5344 11.0609 18.5517 11.7283 17.2796 11.8122C16.4691 15.0788 13.5173 17.5 10 17.5C7.19017 17.5 4.74123 15.9548 3.45654 13.6679C3.81384 13.6494 4.17789 13.6029 4.54488 13.5358C5.70368 15.3199 7.71403 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 9.77947 16.489 9.56151 16.4676 9.34662C16.9686 9.2942 17.2865 9.33605 17.4768 9.40595C17.4922 9.60195 17.5 9.80006 17.5 10C17.5 10.2664 17.4861 10.5296 17.459 10.7889C18.2871 10.6663 18.7847 10.2157 18.9397 9.80521C19.0282 9.57068 19.0165 9.33558 18.8987 9.12086C18.7779 8.90058 18.5171 8.65272 18.0203 8.4688C17.4101 8.24294 16.4545 8.27055 15.1026 8.61578C13.7698 8.95616 12.1332 9.58305 10.2139 10.4555C8.27249 11.3379 6.5725 11.992 5.15452 12.3534C3.75567 12.7099 2.54621 12.8048 1.6385 12.4688C0.973454 12.2218 0.487443 11.8395 0.221209 11.3562C-0.0484808 10.8666 -0.0637671 10.3243 0.123348 9.83572C0.46753 8.93711 1.45265 8.27523 2.71991 8.18981C3.52973 4.92218 6.482 2.5 10 2.5C12.8098 2.5 15.2588 4.04519 16.5435 6.33219C16.1862 6.35068 15.8221 6.39712 15.4551 6.46427C14.2963 4.68007 12.286 3.5 10 3.5Z" fill="currentColor"/></svg>';

const folder = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 3C3.11929 3 2 4.11929 2 5.5V14.5C2 15.8807 3.11929 17 4.5 17H15.5C16.8807 17 18 15.8807 18 14.5V7.5C18 6.11929 16.8807 5 15.5 5H9.70711L8.21967 3.51256C7.89148 3.18437 7.44636 3 6.98223 3H4.5ZM3 5.5C3 4.67157 3.67157 4 4.5 4H6.98223C7.18115 4 7.37191 4.07902 7.51256 4.21967L8.79289 5.5L7.43934 6.85355C7.34557 6.94732 7.21839 7 7.08579 7H3V5.5ZM3 8H7.08579C7.48361 8 7.86514 7.84196 8.14645 7.56066L9.70711 6H15.5C16.3284 6 17 6.67157 17 7.5V14.5C17 15.3284 16.3284 16 15.5 16H4.5C3.67157 16 3 15.3284 3 14.5V8Z" fill="currentColor"/></svg>';

const arrowLeft = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.15898 16.8666C9.36292 17.0528 9.67918 17.0384 9.86536 16.8345C10.0515 16.6305 10.0371 16.3143 9.8332 16.1281L3.66535 10.4974H17.4961C17.7722 10.4974 17.9961 10.2735 17.9961 9.99736C17.9961 9.72122 17.7722 9.49736 17.4961 9.49736H3.66824L9.8332 3.86927C10.0371 3.68309 10.0515 3.36684 9.86536 3.16289C9.67918 2.95895 9.36292 2.94456 9.15898 3.13074L2.24263 9.44478C2.10268 9.57254 2.02285 9.74008 2.00314 9.91323C1.99851 9.94058 1.99609 9.96869 1.99609 9.99736C1.99609 10.0242 1.99821 10.0506 2.00229 10.0763C2.02047 10.2522 2.10058 10.4229 2.24263 10.5526L9.15898 16.8666Z" fill="currentColor"/></svg>';

const openIcon = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H14C15.1046 16 16 15.1046 16 14V11.5C16 11.2239 16.2239 11 16.5 11C16.7761 11 17 11.2239 17 11.5V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6C3 4.34315 4.34315 3 6 3H8.5C8.77614 3 9 3.22386 9 3.5C9 3.77614 8.77614 4 8.5 4H6ZM11 3.5C11 3.22386 11.2239 3 11.5 3H16.5C16.7761 3 17 3.22386 17 3.5V8.5C17 8.77614 16.7761 9 16.5 9C16.2239 9 16 8.77614 16 8.5V4.70711L11.8536 8.85355C11.6583 9.04882 11.3417 9.04882 11.1464 8.85355C10.9512 8.65829 10.9512 8.34171 11.1464 8.14645L15.2929 4H11.5C11.2239 4 11 3.77614 11 3.5Z" fill="currentColor"/></svg>';

const dismiss = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.08859 4.21569L4.14645 4.14645C4.32001 3.97288 4.58944 3.9536 4.78431 4.08859L4.85355 4.14645L10 9.293L15.1464 4.14645C15.32 3.97288 15.5894 3.9536 15.7843 4.08859L15.8536 4.14645C16.0271 4.32001 16.0464 4.58944 15.9114 4.78431L15.8536 4.85355L10.707 10L15.8536 15.1464C16.0271 15.32 16.0464 15.5894 15.9114 15.7843L15.8536 15.8536C15.68 16.0271 15.4106 16.0464 15.2157 15.9114L15.1464 15.8536L10 10.707L4.85355 15.8536C4.67999 16.0271 4.41056 16.0464 4.21569 15.9114L4.14645 15.8536C3.97288 15.68 3.9536 15.4106 4.08859 15.2157L4.14645 15.1464L9.293 10L4.14645 4.85355C3.97288 4.67999 3.9536 4.41056 4.08859 4.21569L4.14645 4.14645L4.08859 4.21569Z" fill="currentColor"/></svg>';

const document = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2C4.89543 2 4 2.89543 4 4V16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V7.41421C16 7.01639 15.842 6.63486 15.5607 6.35355L11.6464 2.43934C11.3651 2.15804 10.9836 2 10.5858 2H6ZM5 4C5 3.44772 5.44772 3 6 3H10V6.5C10 7.32843 10.6716 8 11.5 8H15V16C15 16.5523 14.5523 17 14 17H6C5.44772 17 5 16.5523 5 16V4ZM14.7929 7H11.5C11.2239 7 11 6.77614 11 6.5V3.20711L14.7929 7Z" fill="currentColor"/></svg>';

// ─── Button Helpers ─────────────────────────────────────────────────

/** Action button — 32×32 circular icon-only Subtle */
function actionBtn(icon: string, label: string): string {
  return '<button class="b b--action" title="' + label + '" aria-label="' + label + '">' + icon + '</button>';
}

/** Model picker — Subtle Medium button with text + chevron */
function modelPicker(label: string): string {
  return '<button class="b b--picker" title="Model picker">'
    + '<span class="picker-label">' + label + '</span>'
    + '<span class="picker-chevron">' + chevronDown + '</span>'
    + '</button>';
}

/** Icon element for left section (non-interactive) */
function leftIcon(icon: string): string {
  return '<span class="hdr__icon">' + icon + '</span>';
}

// ─── Header Builder ─────────────────────────────────────────────────

function header(label: string, leftHtml: string, rightHtml: string): string {
  return '<div class="card">'
    + '<div class="card__label">' + label + '</div>'
    + '<div class="hdr">'
    + '<div class="hdr__left">' + leftHtml + '</div>'
    + '<div class="hdr__right">' + rightHtml + '</div>'
    + '</div>'
    + '</div>';
}

// ─── 8 Header Types ─────────────────────────────────────────────────

function chatZQ(): string {
  return header(
    '1. Chat ZQ',
    modelPicker('Auto'),
    actionBtn(chatHintHalf, 'Temp Chat')
      + actionBtn(shieldTask, 'Shield')
      + actionBtn(moreHorizontal, 'More')
  );
}

function chatSession(): string {
  return header(
    '2. Chat Session',
    modelPicker('Auto'),
    actionBtn(share, 'Share')
      + actionBtn(shieldTask, 'Shield')
      + actionBtn(moreHorizontal, 'More')
  );
}

function agentZQ(): string {
  return header(
    '3. Agent ZQ',
    leftIcon(planet) + modelPicker('Auto'),
    actionBtn(chatHintHalf, 'Temp Chat')
      + actionBtn(shieldTask, 'Shield')
      + actionBtn(moreHorizontal, 'More')
  );
}

function agentSession(): string {
  return header(
    '4. Agent Session',
    leftIcon(planet) + modelPicker('Auto'),
    actionBtn(share, 'Share')
      + actionBtn(shieldTask, 'Shield')
      + actionBtn(moreHorizontal, 'More')
  );
}

function workspaceZQ(): string {
  return header(
    '5. Workspace ZQ',
    leftIcon(folder) + modelPicker('Auto'),
    actionBtn(share, 'Share')
      + actionBtn(chatHintHalf, 'Temp Chat')
      + actionBtn(shieldTask, 'Shield')
      + actionBtn(moreHorizontal, 'More')
  );
}

function workspaceSession(): string {
  return header(
    '6. Workspace Session',
    actionBtn(arrowLeft, 'Back') + leftIcon(folder) + modelPicker('Auto'),
    actionBtn(share, 'Share')
      + actionBtn(shieldTask, 'Shield')
      + actionBtn(moreHorizontal, 'More')
  );
}

function artifact(): string {
  return header(
    '7. Artifact',
    leftIcon(document) + '<span class="hdr__title">Copilot Page Title</span>',
    actionBtn(openIcon, 'Open')
      + actionBtn(moreHorizontal, 'More')
      + actionBtn(dismiss, 'Dismiss')
  );
}

function placeholder(): string {
  return header(
    '8. Placeholder',
    '',
    actionBtn(moreHorizontal, 'More')
  );
}

// ─── CSS ────────────────────────────────────────────────────────────

const css = [
  '*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }',
  "body { font-family: 'Segoe UI', sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }",
  'h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }',
  '.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 40px; }',
  '.wrap { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }',

  // Card wrapper
  '.card { display: flex; flex-direction: column; gap: 4px; }',
  '.card__label { font-size: 11px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 1px; padding-left: 4px; }',

  // Header bar
  '.hdr { display: flex; align-items: center; height: 56px; background: #fff; padding: 0 24px; gap: 8px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }',
  '.hdr__left { display: flex; align-items: center; flex: 1; gap: 4px; min-width: 0; }',
  '.hdr__right { display: flex; align-items: center; flex: 1; justify-content: flex-end; gap: 4px; }',

  // Non-interactive icon in left section
  '.hdr__icon { display: inline-flex; align-items: center; color: #242424; }',
  '.hdr__icon svg { width: 20px; height: 20px; display: block; }',

  // Title text (Artifact)
  ".hdr__title { font-size: 14px; font-weight: 600; color: #242424; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: 'Segoe UI', sans-serif; }",

  // Base button reset
  ".b { display: inline-flex; align-items: center; justify-content: center; cursor: pointer; border: none; outline: none; font-family: 'Segoe UI', sans-serif; transition: background 0.1s; }",
  '.b svg { display: block; flex-shrink: 0; }',
  '.b:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }',

  // Action button — 32×32 circular icon-only Subtle
  '.b--action { width: 32px; height: 32px; padding: 6px; border-radius: 9999px; background: transparent; color: #242424; }',
  '.b--action:hover { background: rgba(36,36,36,0.04); }',
  '.b--action svg { width: 20px; height: 20px; }',

  // Model picker — Subtle Medium button
  '.b--picker { height: 32px; padding: 6px 10px; border-radius: 12px; background: transparent; color: #242424; gap: 4px; }',
  '.b--picker:hover { background: rgba(36,36,36,0.04); }',
  ".b--picker .picker-label { font-size: 14px; font-weight: 400; line-height: 1.4; font-family: 'Segoe UI', sans-serif; }",
  '.b--picker .picker-chevron { display: inline-flex; align-items: center; }',
  '.b--picker .picker-chevron svg { width: 20px; height: 20px; }',
].join('\n');

// ─── Build HTML ─────────────────────────────────────────────────────

const body = [
  '<h1>Header \u2014 Component Preview</h1>',
  '<p class="hint">8 header shell types. Hover action buttons for hover effect.</p>',
  '<div class="wrap">',
  chatZQ(),
  chatSession(),
  agentZQ(),
  agentSession(),
  workspaceZQ(),
  workspaceSession(),
  artifact(),
  placeholder(),
  '</div>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Header Preview</title>'
  + '<style>' + css + '</style>'
  + '</head><body>' + body + '</body></html>';

// ─── Write ──────────────────────────────────────────────────────────

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'header.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
