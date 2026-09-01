/**
 * Variant Tabs — Reusable helper for compound preview pages.
 *
 * Renders a sticky tab strip at the top of a section. Clicking a tab swaps
 * which variant panel is visible. No interaction with the rendered component
 * is required to see another variant.
 *
 * Usage:
 *   import { renderVariantTabs, variantTabsCss } from './_variantTabs.js';
 *   // In CSS: append `variantTabsCss`
 *   // In HTML: insert renderVariantTabs({ id: 'banner', variants: [...] })
 *   // In a single trailing <script>, call window.bpVariantTabs() once.
 */

export type VariantPanel = {
  label: string;
  html: string;
};

export const variantTabsCss = `
.vt { margin: 0 auto 32px; max-width: 1100px; }
.vt__tabs { display: flex; gap: 4px; padding: 4px; background: #f5f5f5; border-radius: 12px; margin-bottom: 16px; overflow-x: auto; scrollbar-width: none; }
.vt__tabs::-webkit-scrollbar { display: none; }
.vt__tab { flex-shrink: 0; height: 32px; padding: 0 14px; border: 0; background: transparent; border-radius: 8px; font: 500 13px/1 'Segoe UI', system-ui, -apple-system, sans-serif; color: #5d5d5d; cursor: pointer; white-space: nowrap; transition: background 120ms ease, color 120ms ease; }
.vt__tab:hover { background: rgba(36,36,36,0.04); color: #242424; }
.vt__tab.is-active { background: #ffffff; color: #242424; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
.vt__panel { display: none; }
.vt__panel.is-active { display: block; }
`;

/** Inline JS that wires up tab clicks. Inject once per page. */
export const variantTabsJs = `
<script>
(function(){
  document.querySelectorAll('.vt').forEach(function(vt){
    var tabs = vt.querySelectorAll('.vt__tab');
    var panels = vt.querySelectorAll('.vt__panel');
    tabs.forEach(function(tab, i){
      tab.addEventListener('click', function(){
        tabs.forEach(function(t){ t.classList.remove('is-active'); });
        panels.forEach(function(p){ p.classList.remove('is-active'); });
        tab.classList.add('is-active');
        if (panels[i]) panels[i].classList.add('is-active');
      });
    });
  });
})();
</script>
`;

export function renderVariantTabs(opts: {
  id: string;
  variants: VariantPanel[];
  defaultIndex?: number;
}): string {
  const def = opts.defaultIndex ?? 0;
  let out = '<div class="vt" data-vt="' + escapeAttr(opts.id) + '">';
  out += '<div class="vt__tabs" role="tablist">';
  opts.variants.forEach((v, i) => {
    const active = i === def ? ' is-active' : '';
    out += '<button class="vt__tab' + active + '" role="tab" type="button">' + escapeHtml(v.label) + '</button>';
  });
  out += '</div>';
  opts.variants.forEach((v, i) => {
    const active = i === def ? ' is-active' : '';
    out += '<div class="vt__panel' + active + '" role="tabpanel">' + v.html + '</div>';
  });
  out += '</div>';
  return out;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escapeAttr(s: string): string {
  return escapeHtml(s);
}
