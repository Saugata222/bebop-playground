/**
 * Chat Input — Interactive HTML Preview
 *
 * A single interactive chat input that transitions between states:
 *   Rest         → placeholder visible, subtle send, rest underline
 *   Focus-empty  → placeholder visible, subtle send, heavy underline
 *   Focus-entered → text visible, brand send w/ arrow-up, heavy underline
 *   Long prompt  → text wraps to multiple lines, buttons stay bottom-aligned
 *
 * Usage:  npx tsx preview/chatInput.ts
 * Output: preview/chatInput.html
 */

import * as fs from 'fs';
import * as path from 'path';

const t = {
  white: '#FFFFFF',
  neutral26: '#242424',
  neutralSubtle: '#f5f5f5',
  strokeLoud: '#6f6f6f',
  strokeHeavy: '#242424',
  fgTertiary: '#6f6f6f',
  fgPrimary: '#242424',
  enteredColor: '#1f1f1f',
  radiusCircular: '9999px',
  fontBody: "'Aptos', 'Segoe UI', system-ui, -apple-system, sans-serif",
} as const;

const icons = {
  diamondLink: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.06921 5.47061C9.70157 5.53748 11.3151 6.19323 12.5614 7.43938C15.1953 10.0734 15.1953 14.3445 12.5614 16.9785L11.7704 17.7696C10.7941 18.7458 9.21055 18.7457 8.23425 17.7696L2.23125 11.7666C1.25669 10.791 1.25532 9.20969 2.2293 8.23334L3.02228 7.43938C3.50534 6.95637 4.04407 6.56261 4.61702 6.25675C4.533 6.67435 4.48426 7.09823 4.46956 7.52239C4.21025 7.70667 3.96179 7.91397 3.72932 8.14642L2.93732 8.94038C2.35341 9.52609 2.35404 10.4743 2.93829 11.0595L8.94129 17.0625C9.52703 17.6481 10.4766 17.6481 11.0624 17.0625L11.8544 16.2715L12.0575 16.0567C14.0947 13.8015 14.0276 10.3198 11.8544 8.14642C10.697 6.98926 9.16773 6.42997 7.65123 6.46672C7.75078 6.12322 7.89053 5.78885 8.06921 5.47061ZM8.23425 2.22839C9.21055 1.25465 10.792 1.25601 11.7675 2.23035L17.7705 8.23334C18.7465 9.20957 18.7464 10.7932 17.7705 11.7695L16.9785 12.5615C16.4957 13.0442 15.9573 13.4384 15.3847 13.7441C15.4688 13.326 15.5175 12.9022 15.5322 12.4775C15.791 12.2935 16.0394 12.0865 16.2714 11.8545L17.0634 11.0615C17.6488 10.4757 17.6489 9.52605 17.0634 8.94038L11.0604 2.93738C10.4752 2.35333 9.52695 2.35263 8.94129 2.93641L8.14636 3.72938C5.90363 5.97286 5.9035 9.61108 8.14636 11.8545C9.30374 13.0118 10.8329 13.5699 12.3495 13.5332C12.25 13.877 12.1104 14.2118 11.9316 14.5303C10.2991 14.4634 8.68566 13.8078 7.43932 12.5615C4.80584 9.92749 4.80578 5.65633 7.43932 3.02235L8.23425 2.22839Z" fill="currentColor"/></svg>`,
  add: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5C10.2761 2.5 10.5 2.72386 10.5 3V9.5H17C17.2761 9.5 17.5 9.72386 17.5 10C17.5 10.2761 17.2761 10.5 17 10.5H10.5V17C10.5 17.2761 10.2761 17.5 10 17.5C9.72386 17.5 9.5 17.2761 9.5 17V10.5H3C2.72386 10.5 2.5 10.2761 2.5 10C2.5 9.72386 2.72386 9.5 3 9.5H9.5V3C9.5 2.72386 9.72386 2.5 10 2.5Z" fill="currentColor"/></svg>`,
  mic: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13C11.6569 13 13 11.6568 13 9.99998V5C13 3.34315 11.6569 2 10 2C8.34315 2 7 3.34315 7 5V9.99998C7 11.6568 8.34315 13 10 13ZM10 12C8.89543 12 8 11.1046 8 9.99998V5C8 3.89543 8.89543 3 10 3C11.1046 3 12 3.89543 12 5V9.99998C12 11.1046 11.1046 12 10 12ZM5 9.49998C5.27614 9.49998 5.5 9.72384 5.5 9.99998C5.5 12.4853 7.51472 14.5 10 14.5C12.4853 14.5 14.5 12.4853 14.5 9.99998C14.5 9.72384 14.7239 9.49998 15 9.49998C15.2761 9.49998 15.5 9.72384 15.5 9.99998C15.5 12.869 13.3033 15.2249 10.5 15.4776V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V15.4776C6.69675 15.2249 4.5 12.869 4.5 9.99998C4.5 9.72384 4.72386 9.49998 5 9.49998Z" fill="currentColor"/></svg>`,
  deviceEq: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C10.2761 2 10.5 2.22386 10.5 2.5V17.5C10.5 17.7761 10.2761 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5V2.5C9.5 2.22386 9.72386 2 10 2ZM13.5 5C13.7761 5 14 5.22386 14 5.5V14.5C14 14.7761 13.7761 15 13.5 15C13.2239 15 13 14.7761 13 14.5V5.5C13 5.22386 13.2239 5 13.5 5ZM7 5.5C7 5.22386 6.77614 5 6.5 5C6.22386 5 6 5.22386 6 5.5V14.5C6 14.7761 6.22386 15 6.5 15C6.77614 15 7 14.7761 7 14.5V5.5ZM16.5 8C16.7761 8 17 8.22386 17 8.5V11.5C17 11.7761 16.7761 12 16.5 12C16.2239 12 16 11.7761 16 11.5V8.5C16 8.22386 16.2239 8 16.5 8ZM4 8.5C4 8.22386 3.77614 8 3.5 8C3.22386 8 3 8.22386 3 8.5V11.5C3 11.7761 3.22386 12 3.5 12C3.77614 12 4 11.7761 4 11.5V8.5Z" fill="currentColor"/></svg>`,
  arrowUp: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.13269 9.16094C2.94651 9.36488 2.96091 9.68113 3.16485 9.86731C3.36879 10.0535 3.68504 10.0391 3.87122 9.83515L9.50195 3.6673L9.50195 17.498C9.50195 17.7742 9.72581 17.998 10.002 17.998C10.2781 17.998 10.502 17.7742 10.502 17.498L10.502 3.67019L16.13 9.83515C16.3162 10.0391 16.6325 10.0535 16.8364 9.86731C17.0404 9.68113 17.0548 9.36488 16.8686 9.16094L10.5545 2.24458C10.4268 2.10464 10.2592 2.02481 10.0861 2.0051C10.0587 2.00046 10.0306 1.99805 10.002 1.99805C9.97508 1.99805 9.9487 2.00017 9.92298 2.00425C9.74708 2.02242 9.57641 2.10253 9.44673 2.24458L3.13269 9.16094Z" fill="currentColor"/></svg>`,
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Chat Input \u2014 Interactive Preview</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: ${t.fontBody};
    background: #f3f3f3;
    padding: 48px 24px;
    display: flex; flex-direction: column; align-items: center; gap: 40px;
  }
  h1 { font-size: 24px; font-weight: 600; color: ${t.neutral26}; }
  .hint {
    font-size: 13px; color: ${t.fgTertiary}; text-align: center;
  }
  .state-badge {
    display: inline-block; font-size: 11px; font-weight: 600;
    color: ${t.fgTertiary}; text-transform: uppercase; letter-spacing: 1.2px;
    padding: 4px 10px; background: ${t.white}; border-radius: 6px;
    border: 1px solid #e0e0e0; margin-bottom: 12px;
    transition: all 0.15s ease;
  }
  .wrapper {
    width: 100%; max-width: 720px;
    display: flex; flex-direction: column; align-items: flex-start;
  }

  /* === Button classes (shared with button component tokens) === */

  /* Base button reset */
  .b {
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative;
    font-family: 'Segoe UI', sans-serif; letter-spacing: 0; line-height: 1.4;
    transition: background 0.1s ease; outline: none; white-space: nowrap;
    border: none; flex-shrink: 0;
  }
  .b svg { display: block; flex-shrink: 0; }
  .b:focus-visible { outline: 2px solid #000; outline-offset: 0; box-shadow: inset 0 0 0 1px #fff; }

  /* Icon only — Large (40×40, p:10, 20px icon) — Options, Add, Send */
  .b--ilg { width: 40px; height: 40px; padding: 10px; border-radius: 9999px; }
  .b--ilg svg { width: 20px; height: 20px; }

  /* Icon only — Medium (32×32, p:6, 20px icon) — Mic */
  .b--imd { width: 32px; height: 32px; padding: 6px; border-radius: 9999px; }
  .b--imd svg { width: 20px; height: 20px; }

  /* Subtle style (transparent bg, dark icon) */
  .b--subtle { background: transparent; color: ${t.fgPrimary}; }
  .b--subtle:hover { background: rgba(0,0,0,0.04); }

  /* Secondary style (subtle bg, dark icon) — Send disabled */
  .b--secondary { background: ${t.neutralSubtle}; color: ${t.fgPrimary}; }
  .b--secondary:hover { background: #ebebeb; }

  /* Primary style (dark bg, white icon) — Send enabled */
  .b--primary { background: ${t.fgPrimary}; color: ${t.white}; }
  .b--primary:hover { background: #3b3b3b; }

  /* \u2550\u2550\u2550 Chat input \u2550\u2550\u2550 */
  .ci {
    display: flex; gap: 0; align-items: flex-start; width: 100%;
  }
  .ci__container {
    flex: 1; display: flex; flex-direction: column; gap: 16px; min-width: 0;
  }
  .ci__row {
    display: flex; gap: 16px; align-items: flex-end;
    padding-right: 44px; max-width: 908px; width: 100%;
  }

  /* Toolbar */
  .ci__toolbar {
    display: flex; gap: 4px; align-items: flex-start;
    padding-bottom: 4px; flex-shrink: 0;
  }

  /* Input area */
  .ci__input {
    flex: 1; display: flex; align-items: flex-end; gap: 8px;
    padding: 8px 0; position: relative; min-width: 0;
  }

  /* Underline */
  .ci__line {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 1px; border-radius: 4px;
    background: ${t.strokeLoud};
    transition: background 0.15s ease;
  }
  .ci--focused .ci__line { background: ${t.strokeHeavy}; }

  /* Textarea — real editable element */
  .ci__textarea {
    flex: 1; min-width: 0; border: none; outline: none;
    resize: none; background: transparent; overflow: hidden;
    font-family: ${t.fontBody}; font-size: 20px; font-weight: 400;
    line-height: 36px; color: ${t.enteredColor};
    padding: 0 0 0 12px; margin: 0;
    caret-color: ${t.fgPrimary};
    field-sizing: content;
  }
  .ci__textarea::placeholder {
    color: ${t.fgTertiary}; line-height: 1.7;
  }
  /* Minimum height = one line */
  .ci__textarea:placeholder-shown {
    line-height: 1.7; color: ${t.fgTertiary};
  }
  .ci__textarea:not(:placeholder-shown) {
    line-height: 36px; color: ${t.enteredColor};
  }

  /* Send button wrapper */
  .ci__send-wrap {
    display: flex; align-items: flex-start;
    padding-bottom: 4px; flex-shrink: 0;
  }

  /* Send icon swap */
  .ci__send-icon--eq { display: block; }
  .ci__send-icon--arrow { display: none; }
  .ci--has-text .ci__send-icon--eq { display: none; }
  .ci--has-text .ci__send-icon--arrow { display: block; }

  /* Send button style swap — overrides base style via .ci state */
  .ci__send { transition: background 0.15s ease, color 0.15s ease; }
  .ci:not(.ci--has-text) .ci__send { background: ${t.neutralSubtle}; color: ${t.fgPrimary}; }
  .ci:not(.ci--has-text) .ci__send:hover { background: #ebebeb; }
  .ci.ci--has-text .ci__send { background: ${t.fgPrimary}; color: ${t.white}; }
  .ci.ci--has-text .ci__send:hover { background: #3b3b3b; }
</style>
</head>
<body>

<h1>Chat Input \u2014 Interactive Preview</h1>
<p class="hint">Click the input area and start typing. The component transitions between Rest, Focus, and Entered states automatically.<br>Try pasting a long prompt to see multiline behavior.</p>

<div class="wrapper">
  <div class="state-badge" id="stateBadge">REST</div>
  <div class="ci" id="chatInput">
    <div class="ci__container">
      <div class="ci__row">
        <div class="ci__toolbar">
          <button class="b b--ilg b--subtle" title="Diamond Link">${icons.diamondLink}</button>
          <button class="b b--ilg b--subtle" title="Add">${icons.add}</button>
        </div>
        <div class="ci__input">
          <textarea class="ci__textarea" id="textarea" rows="1" placeholder="Ask Copilot"></textarea>
          <button class="b b--imd b--subtle" title="Mic">${icons.mic}</button>
          <div class="ci__line"></div>
        </div>
        <div class="ci__send-wrap">
          <button class="b b--ilg ci__send" id="sendBtn" title="Send">
            <span class="ci__send-icon--eq">${icons.deviceEq}</span>
            <span class="ci__send-icon--arrow">${icons.arrowUp}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  const ci = document.getElementById('chatInput');
  const ta = document.getElementById('textarea');
  const badge = document.getElementById('stateBadge');

  function updateState() {
    const hasText = ta.value.trim().length > 0;
    const isFocused = document.activeElement === ta;

    ci.classList.toggle('ci--focused', isFocused);
    ci.classList.toggle('ci--has-text', hasText);

    // Auto-resize textarea height
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';

    // Update state badge
    if (!isFocused && !hasText) {
      badge.textContent = 'REST';
    } else if (isFocused && !hasText) {
      badge.textContent = 'FOCUS \u2014 EMPTY';
    } else if (hasText && ta.scrollHeight > 50) {
      badge.textContent = 'FOCUS \u2014 LONG PROMPT';
    } else {
      badge.textContent = 'FOCUS \u2014 TEXT ENTERED';
    }
  }

  ta.addEventListener('focus', updateState);
  ta.addEventListener('blur', updateState);
  ta.addEventListener('input', updateState);

  // Initialize
  updateState();
</script>

</body>
</html>`;

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'chatInput.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log(`\u2713  Preview written to ${outPath}`);
