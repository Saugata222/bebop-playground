/**
 * Compare Entry — Runtime helper that adds a "Compare" button to the
 * experiment's top nav (the `.copilot-shell-bar`), on the right side.
 *
 * Mirrors the `.topbar__nav` pattern on `playground.html` where the page
 * tabs sit on the right. In an experiment, the analog is the hover-revealed
 * shell bar at the top.
 *
 * Click the button → a dropdown popover anchored to it lists the known
 * prototypes; picking one navigates to `compare.html?a={current}&b={picked}`.
 *
 * Usage in a generator:
 *   html += compareEntryRuntime;
 *
 * Guards:
 *   - Skips injection when embedded in an iframe (so the button does NOT
 *     appear inside compare.html's own panes). Detected via
 *     `window.self !== window.top`.
 *   - Skips injection when URL has `?nocompare=1`.
 */

import { experimentCompareOptions } from './_experimentRegistry.js';
import { serializeForScript } from './_html.js';

const compareOptionsJson = serializeForScript(experimentCompareOptions);

export const compareEntryRuntime = `
<style id="bp-cmp-style">
/* Shell-bar trigger — matches the other shell-bar links. */
.copilot-shell-bar .bp-cmp-btn { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border: 0; background: transparent; border-radius: 12px; font-family: 'Segoe UI', sans-serif; font-size: 14px; font-weight: 400; color: #242424; cursor: pointer; transition: background 0.1s; }
.copilot-shell-bar .bp-cmp-btn:hover { background: rgba(36,36,36,0.04); }
.copilot-shell-bar .bp-cmp-btn.is-open { background: #ebebeb; font-weight: 600; }
.copilot-shell-bar .bp-cmp-btn svg { width: 14px; height: 14px; }

/* Panel shell — mirrors the Variants menu (_variants.ts): solid #fff, 16px
   padding, 16px radius, 0 8px 32px shadow, 16px gap between sections. */
.bp-cmp-panel { position: fixed; top: 60px; right: 16px; z-index: 10000; min-width: 280px; max-width: calc(100vw - 32px); max-height: calc(100vh - 76px); box-sizing: border-box; display: flex; flex-direction: column; gap: 16px; background: #fff; border: 1px solid #dedede; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.12); padding: 16px; font-family: 'Segoe UI', sans-serif; color: #242424; }
.bp-cmp-panel[hidden] { display: none; }

/* Title row — 18px / 400 heading + 28px circular dismiss, same as Variants. */
.bp-cmp-panel__title { display: flex; align-items: center; justify-content: space-between; gap: 24px; font-size: 18px; font-weight: 400; color: #242424; line-height: 24px; margin: 0; }
.bp-cmp-panel__close { width: 28px; height: 28px; border: 0; background: transparent; border-radius: 9999px; cursor: pointer; color: #242424; display: inline-flex; align-items: center; justify-content: center; padding: 0; margin: -6px -6px -6px 0; flex-shrink: 0; transition: background 0.1s; }
.bp-cmp-panel__close:hover { background: rgba(36,36,36,0.04); }
.bp-cmp-panel__close svg { display: block; width: 16px; height: 16px; }

/* Item list — simple vertical list of options, no icons. */
.bp-cmp-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; max-height: 320px; overflow-y: auto; }
.bp-cmp-item { display: flex; align-items: center; width: 100%; min-height: 32px; padding: 6px 10px; border: 0; background: transparent; border-radius: 8px; text-align: left; font-family: inherit; font-size: 14px; font-weight: 400; line-height: 1.4; color: #242424; cursor: pointer; transition: background 0.1s; }
.bp-cmp-item:hover { background: #f5f5f5; }
.bp-cmp-item:focus-visible { outline: 2px solid #242424; outline-offset: -2px; }
</style>
<script>
(function(){
  if (window.__copilotCompareEntry) return;
  try { if (window.self !== window.top) return; } catch(e) { return; }
  try {
    var u = new URL(location.href);
    if (u.searchParams.get('nocompare') === '1') return;
  } catch(e) {}
  window.__copilotCompareEntry = true;

  var PROTOTYPES = ${compareOptionsJson};

  function currentSlug(){
    var m = location.pathname.match(/\\/([^\\/]+?)\\.html?$/);
    return m ? m[1] : '';
  }
  var current = currentSlug();

  function buildButton(){
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'bp-cmp-btn';
    btn.setAttribute('aria-label', 'Compare with another prototype');
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = ''
      + '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">'
      +   '<rect x="2" y="3" width="5" height="10" rx="1" stroke="currentColor" stroke-width="1.4"/>'
      +   '<rect x="9" y="3" width="5" height="10" rx="1" stroke="currentColor" stroke-width="1.4"/>'
      + '</svg>'
      + '<span>Compare</span>';
    return btn;
  }

  function buildPanel(){
    var panel = document.createElement('div');
    panel.className = 'bp-cmp-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Compare with another prototype');

    // Title row — "Compare" + circular dismiss (mirrors Variants panel).
    var title = document.createElement('h3');
    title.className = 'bp-cmp-panel__title';
    var titleText = document.createElement('span');
    titleText.textContent = 'Compare with';
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'bp-cmp-panel__close';
    close.setAttribute('aria-label', 'Close');
    close.innerHTML = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 3l10 10M13 3l-10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    title.appendChild(titleText);
    title.appendChild(close);

    var list = document.createElement('ul');
    list.className = 'bp-cmp-list';

    PROTOTYPES.forEach(function(p){
      if (p.slug === current) return;
      var li = document.createElement('li');
      var row = document.createElement('button');
      row.type = 'button';
      row.className = 'bp-cmp-item';
      row.dataset.slug = p.slug;

      row.textContent = p.label;

      row.addEventListener('click', function(){
        var a = encodeURIComponent(current);
        var b = encodeURIComponent(p.slug);
        location.href = '../compare.html?a=' + a + '&b=' + b;
      });

      li.appendChild(row);
      list.appendChild(li);
    });

    panel.appendChild(title);
    panel.appendChild(list);
    return { panel: panel, closeBtn: close };
  }

  function mount(){
    var bar = document.querySelector('.copilot-shell-bar');
    if (!bar) return false;
    if (bar.querySelector('.bp-cmp-btn')) return true;

    var btn = buildButton();
    var built = buildPanel();
    var panel = built.panel;

    bar.appendChild(btn);
    document.body.appendChild(panel);

    function open(){
      panel.hidden = false;
      btn.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
    function close(){
      panel.hidden = true;
      btn.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }
    function toggle(){ panel.hidden ? open() : close(); }

    btn.addEventListener('click', function(e){ e.stopPropagation(); toggle(); });
    built.closeBtn.addEventListener('click', close);
    document.addEventListener('click', function(e){
      if (panel.hidden) return;
      if (panel.contains(e.target) || btn.contains(e.target)) return;
      close();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && !panel.hidden) close();
    });
    return true;
  }

  function init(){
    if (mount()) return;
    // Shell bar might be injected later by _inject.ts post-processing at build
    // time, but in live DOM that already ran. As a safety net, watch briefly.
    var obs = new MutationObserver(function(){
      if (mount()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(function(){ obs.disconnect(); }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
`;
