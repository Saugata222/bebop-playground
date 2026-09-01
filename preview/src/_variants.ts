/**
 * Variants Runtime — In-experiment variant switcher for Bebop prototypes.
 *
 * Usage in a generator:
 *   import { injectVariantsRuntime } from './_variants';
 *   ...
 *   html += injectVariantsRuntime();
 *   fs.writeFileSync(...);
 *
 * Authoring model (declarative, AI-friendly):
 *   <div data-variant-group="storeCard" data-variant-label="Card style">
 *     <div data-variant="compact" data-variant-label-option="Compact">…</div>
 *     <div data-variant="image" data-variant-label-option="With image" data-default>…</div>
 *     <div data-variant="hero" data-variant-label-option="Hero">…</div>
 *   </div>
 *
 * The runtime:
 *  - Auto-discovers groups on DOMContentLoaded and via MutationObserver
 *    (so variants inside lazy-rendered dialogs/menus also work).
 *  - Renders a floating "Variants" chip bottom-right; chip + panel only
 *    appear when at least one group is present.
 *  - Cross-fades (~150ms) when switching, plus a brief outline flash on
 *    the newly-active variant so the user can locate the swap.
 *  - URL-encodes selections as ?v=group1:opt,group2:opt for shareable links.
 *  - Emits `copilot:variant-change` CustomEvent on document so generators can
 *    react if a variant should also nudge interactive state.
 *  - Press `V` to toggle the panel; `Esc` to close.
 */

const VARIANTS_RUNTIME_JS = `
(function () {
  if (window.__copilotVariants) return;
  window.__copilotVariants = true;

  var STYLE = ''
    // Collapsed chip — 30px tall (px 12, py 6), 18px radius, no icon, just label + count.
    + '.bv-chip{position:fixed;bottom:16px;right:16px;z-index:99999;padding:6px 12px;display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#fff;border:1px solid #dedede;border-radius:18px;font-family: var(--f-typography-fontFamily-functional);font-size:13px;font-weight:400;color:#242424;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.08);transition:background 0.1s;}'
    + '.bv-chip:hover{background:#fafafa;}'
    + '.bv-chip__count{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:9px;background:#242424;color:#fff;font-size:11px;font-weight:600;}'
    // Expanded panel — width hugs content (min 260, max viewport - 32).
    + '.bv-panel{position:fixed;bottom:62px;right:16px;z-index:99999;min-width:260px;max-width:calc(100vw - 32px);box-sizing:border-box;background:#fff;border:1px solid #dedede;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.12);padding:16px;font-family: var(--f-typography-fontFamily-functional);color:#242424;display:none;flex-direction:column;gap:16px;}'
    + '.bv-panel--open{display:flex;}'
    // Title row — "Variants" 18px + 16px dismiss icon right-aligned.
    + '.bv-panel__title{display:flex;align-items:center;justify-content:space-between;gap:24px;font-size:18px;font-weight:400;color:#242424;line-height:24px;margin:0;}'
    + '.bv-panel__close{width:28px;height:28px;border:none;background:transparent;cursor:pointer;color:#242424;border-radius:9999px;display:inline-flex;align-items:center;justify-content:center;padding:0;margin:-6px -6px -6px 0;flex-shrink:0;transition:background 0.1s;}'
    + '.bv-panel__close:hover{background:rgba(36,36,36,0.04);}'
    + '.bv-panel__close svg{display:block;width:16px;height:16px;}'
    // Group — 8px gap between uppercase label and segmented track.
    + '.bv-group{display:flex;flex-direction:column;gap:8px;}'
    + '.bv-group__label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:#6f6f6f;line-height:15px;margin:0;}'
    // Segmented — 34px track, #f5f5f5 bg, 10px radius, 3px inner padding, 4px gap.
    // Track stretches to fill the panel's content box so every group aligns.
    + '.bv-seg{display:flex;gap:4px;padding:3px;background:#f5f5f5;border-radius:10px;box-sizing:border-box;height:34px;align-items:center;}'
    + '.bv-seg__btn{flex:1 0 auto;min-width:max-content;height:28px;padding:0 12px;border:none;background:transparent;border-radius:7px;font-family:inherit;font-size:12px;font-weight:400;color:#5d5d5d;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;transition:background 0.1s,color 0.1s;}'
    + '.bv-seg__btn:hover{color:#242424;}'
    + '.bv-seg__btn--active{background:#fff;color:#242424;font-weight:600;box-shadow:0 1px 2px rgba(0,0,0,0.06);}'
    // Default dot — 5px circle, #242424 when on active btn, #929292 otherwise.
    + '.bv-seg__btn__dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:#929292;flex-shrink:0;}'
    + '.bv-seg__btn--active .bv-seg__btn__dot{background:#242424;}'
    // Select fallback for >5 options.
    + '.bv-select{width:100%;height:32px;padding:0 10px;border:1px solid #dedede;border-radius:8px;background:#fff;font-family:inherit;font-size:13px;color:#242424;cursor:pointer;box-sizing:border-box;}'
    + '[data-variant-group]{transition:opacity 0.15s ease;}';

  var style = document.createElement('style');
  style.textContent = STYLE;
  document.head.appendChild(style);

  var groups = new Map();
  var chip = null;
  var panel = null;

  function readUrl() {
    var u = new URL(location.href);
    var v = u.searchParams.get('v');
    var map = {};
    if (!v) return map;
    v.split(',').forEach(function (pair) {
      var bits = pair.split(':');
      if (bits.length === 2 && bits[0] && bits[1]) map[bits[0].trim()] = bits[1].trim();
    });
    return map;
  }

  function writeUrl() {
    var u = new URL(location.href);
    var parts = [];
    groups.forEach(function (g, name) {
      if (g.active !== g.defaultOption) parts.push(name + ':' + g.active);
    });
    if (parts.length) u.searchParams.set('v', parts.join(','));
    else u.searchParams.delete('v');
    history.replaceState(null, '', u.toString());
  }

  function scan() {
    var containers = document.querySelectorAll('[data-variant-group]');
    var urlMap = readUrl();
    var changed = false;
    containers.forEach(function (container) {
      var name = container.getAttribute('data-variant-group');
      if (!name || groups.has(name)) return;
      var optionEls = Array.from(container.querySelectorAll(':scope > [data-variant]'));
      if (optionEls.length < 2) return;
      var options = optionEls.map(function (el) {
        return {
          name: el.getAttribute('data-variant') || '',
          label: el.getAttribute('data-variant-label-option') || el.getAttribute('data-variant') || '',
          el: el
        };
      });
      var defaultEl = optionEls.find(function (el) { return el.hasAttribute('data-default'); });
      var defaultOption = (defaultEl && defaultEl.getAttribute('data-variant')) || options[0].name;
      var groupLabel = container.getAttribute('data-variant-label') || name;
      var urlActive = urlMap[name];
      var active = (urlActive && options.some(function (o) { return o.name === urlActive; })) ? urlActive : defaultOption;
      groups.set(name, { container: container, options: options, active: active, defaultOption: defaultOption, label: groupLabel });
      options.forEach(function (o) { o.el.style.display = (o.name === active) ? '' : 'none'; });
      // Notify listeners of the initial state (URL- or default-driven) so any
      // CSS hooks or interactive nudges get applied on first paint, not just
      // when the user manually switches.
      document.dispatchEvent(new CustomEvent('copilot:variant-change', { detail: { group: name, variant: active } }));
      changed = true;
    });
    if (changed) renderUI();
  }

  function setActive(name, opt, animate) {
    var g = groups.get(name);
    if (!g || g.active === opt) return;
    g.active = opt;
    if (animate) {
      g.container.style.opacity = '0';
      setTimeout(function () {
        g.options.forEach(function (o) { o.el.style.display = (o.name === opt) ? '' : 'none'; });
        g.container.style.opacity = '1';
      }, 150);
    } else {
      g.options.forEach(function (o) { o.el.style.display = (o.name === opt) ? '' : 'none'; });
    }
    writeUrl();
    document.dispatchEvent(new CustomEvent('copilot:variant-change', { detail: { group: name, variant: opt } }));
    renderUI();
  }

  function resetAll() {
    groups.forEach(function (g, name) { setActive(name, g.defaultOption, true); });
  }

  function ensureChip() {
    if (chip) return;
    chip = document.createElement('button');
    chip.className = 'bv-chip';
    chip.type = 'button';
    chip.title = 'Variants (press V)';
    chip.innerHTML = 'Variants <span class="bv-chip__count" id="bvCount">0</span>';
    chip.addEventListener('click', togglePanel);
    document.body.appendChild(chip);

    panel = document.createElement('div');
    panel.className = 'bv-panel';
    document.body.appendChild(panel);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('bv-panel--open')) {
        closePanel();
        return;
      }
      if ((e.key === 'v' || e.key === 'V') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        var t = e.target;
        var tag = (t && t.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (t && t.isContentEditable)) return;
        e.preventDefault();
        togglePanel();
      }
    });
  }

  function togglePanel() {
    if (!panel) return;
    if (panel.classList.contains('bv-panel--open')) closePanel(); else openPanel();
  }
  function openPanel() { panel.classList.add('bv-panel--open'); }
  function closePanel() { panel.classList.remove('bv-panel--open'); }

  function escapeHtml(s) { return String(s).replace(/[&<>]/g, function (c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]; }); }
  function escapeAttr(s) { return String(s).replace(/[&<>"\\']/g, function (c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); }

  // A group is "on screen" only when its container is rendered, its bounding
  // rect intersects the viewport, and it isn't fully covered by an overlay
  // (modal, dialog, drawer) sitting on top of it.
  function isVisible(el) {
    if (!el || !el.isConnected) return false;
    if (el.offsetParent === null && getComputedStyle(el).position !== 'fixed') return false;
    var r = el.getBoundingClientRect();
    // When the currently-active option is empty the group's own rect collapses
    // to ~0 size, but its layout anchor (r.left / r.top) is still meaningful.
    // Synthesize a small probe rect around that anchor so we test visibility
    // at where the group *lives*, not at a loose ancestor.
    if (r.width < 2 || r.height < 2) {
      var ax = r.left, ay = r.top;
      r = { left: ax - 4, top: ay - 4, right: ax + 4, bottom: ay + 4, width: 8, height: 8 };
    }
    var vw = window.innerWidth || document.documentElement.clientWidth;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.bottom < 0 || r.right < 0 || r.top > vh || r.left > vw) return false;
    // Occlusion test: probe points inside the rect and accept if at least one
    // lands on the group itself, a descendant, or the group's parent chain
    // (parent chain covers the empty-variant case where the group has no
    // paintable pixels of its own but sits inside a visible container).
    var cx = Math.max(0, Math.min(vw - 1, r.left + r.width / 2));
    var cy = Math.max(0, Math.min(vh - 1, r.top + r.height / 2));
    var probes = [[cx, cy], [r.left + 1, r.top + 1], [r.right - 1, r.bottom - 1]];
    // Backdrop-blur veto: if any element stacked above the probe point has
    // backdrop-filter set and isn't the group or its ancestor, the group is
    // reading as "behind a blur layer".
    if (typeof document.elementsFromPoint === 'function') {
      var stack = document.elementsFromPoint(cx, cy);
      for (var s = 0; s < stack.length; s++) {
        var node = stack[s];
        if (node === el || el.contains(node) || node.contains(el)) break;
        var bf = getComputedStyle(node).backdropFilter || getComputedStyle(node).webkitBackdropFilter;
        if (bf && bf !== 'none') return false;
      }
    }
    for (var i = 0; i < probes.length; i++) {
      var x = probes[i][0], y = probes[i][1];
      if (x < 0 || y < 0 || x >= vw || y >= vh) continue;
      var top = document.elementFromPoint(x, y);
      // Accept if the probe resolves to the group, a descendant, or an
      // ancestor that contains the group's layout slot.
      if (top && (top === el || el.contains(top) || top.contains(el))) return true;
    }
    return false;
  }

  function visibleGroups() {
    var out = [];
    groups.forEach(function (g, name) { if (isVisible(g.container)) out.push([name, g]); });
    return out;
  }

  function renderUI() {
    if (groups.size === 0) {
      if (chip) chip.style.display = 'none';
      return;
    }
    ensureChip();
    var visible = visibleGroups();
    if (visible.length === 0) {
      chip.style.display = 'none';
      if (panel) panel.classList.remove('bv-panel--open');
      return;
    }
    chip.style.display = '';
    var countEl = document.getElementById('bvCount');
    if (countEl) countEl.textContent = String(visible.length);

    var html = '<div class="bv-panel__title">Variants <button type="button" class="bv-panel__close" aria-label="Close"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.58859 2.71569L2.64645 2.64645C2.82001 2.47288 3.08944 2.4536 3.28431 2.58859L3.35355 2.64645L8 7.293L12.6464 2.64645C12.8417 2.45118 13.1583 2.45118 13.3536 2.64645C13.5488 2.84171 13.5488 3.15829 13.3536 3.35355L8.707 8L13.3536 12.6464C13.5271 12.82 13.5464 13.0894 13.4114 13.2843L13.3536 13.3536C13.18 13.5271 12.9106 13.5464 12.7157 13.4114L12.6464 13.3536L8 8.707L3.35355 13.3536C3.15829 13.5488 2.84171 13.5488 2.64645 13.3536C2.45118 13.1583 2.45118 12.8417 2.64645 12.6464L7.293 8L2.64645 3.35355C2.47288 3.17999 2.4536 2.91056 2.58859 2.71569L2.64645 2.64645L2.58859 2.71569Z" fill="currentColor"/></svg></button></div>';
    visible.forEach(function (entry) {
      var name = entry[0];
      var g = entry[1];
      html += '<div class="bv-group">';
      html += '<div class="bv-group__label">' + escapeHtml(g.label) + '</div>';
      if (g.options.length <= 5) {
        html += '<div class="bv-seg" role="tablist">';
        g.options.forEach(function (o) {
          var active = o.name === g.active;
          var isDefault = o.name === g.defaultOption;
          var dot = isDefault ? '<span class="bv-seg__btn__dot" title="Default"></span>' : '';
          html += '<button type="button" class="bv-seg__btn' + (active ? ' bv-seg__btn--active' : '') + '" data-bv-set="' + escapeAttr(name) + ':' + escapeAttr(o.name) + '">' + dot + escapeHtml(o.label) + '</button>';
        });
        html += '</div>';
      } else {
        html += '<select class="bv-select" data-bv-select="' + escapeAttr(name) + '">';
        g.options.forEach(function (o) {
          var isDefault = o.name === g.defaultOption;
          html += '<option value="' + escapeAttr(o.name) + '"' + (o.name === g.active ? ' selected' : '') + '>' + escapeHtml(o.label) + (isDefault ? ' \u2022 default' : '') + '</option>';
        });
        html += '</select>';
      }
      html += '</div>';
    });
    panel.innerHTML = html;

    panel.querySelector('.bv-panel__close').addEventListener('click', closePanel);
    panel.querySelectorAll('[data-bv-set]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var bits = btn.getAttribute('data-bv-set').split(':');
        setActive(bits[0], bits[1], true);
      });
    });
    panel.querySelectorAll('[data-bv-select]').forEach(function (sel) {
      sel.addEventListener('change', function () {
        setActive(sel.getAttribute('data-bv-select'), sel.value, true);
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
  else scan();
  // Discover new groups (childList) AND react to visibility changes via class/style swaps.
  // Ignore mutations inside our own chip/panel to avoid feedback loops.
  var mo = new MutationObserver(function (records) {
    for (var i = 0; i < records.length; i++) {
      var t = records[i].target;
      if (t && t.nodeType === 1 && (t.closest && (t.closest('.bv-chip') || t.closest('.bv-panel')))) continue;
      scan();
      scheduleRender();
      return;
    }
  });
  mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'hidden', 'aria-hidden'] });
  // Re-evaluate visibility on viewport changes and pointer activity (cheap, throttled).
  var rafPending = false;
  function scheduleRender() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(function () { rafPending = false; renderUI(); });
  }
  window.addEventListener('resize', scheduleRender);
  window.addEventListener('scroll', scheduleRender, true);
  document.addEventListener('click', scheduleRender, true);

  window.copilotVariants = {
    setActive: setActive,
    reset: resetAll,
    list: function () { return Array.from(groups.entries()).map(function (e) { return { name: e[0], active: e[1].active, options: e[1].options.map(function (o) { return o.name; }) }; }); }
  };
})();
`;

/**
 * Returns a `<script>` tag string that initialises the variants runtime.
 * Append this once near the end of an experiment's HTML.
 */
export function injectVariantsRuntime(): string {
  return '<script>' + VARIANTS_RUNTIME_JS + '</script>';
}
