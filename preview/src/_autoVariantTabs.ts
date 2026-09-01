/**
 * Auto Variant Tabs — Runtime helper.
 *
 * Drop the autoVariantTabsHead string into the page <head>. On load it scans
 * the document for sibling `<h2>` headings inside `.page` and converts each
 * group into a tabbed switcher: each <h2> becomes a tab, and the content that
 * follows it (until the next <h2> or end of parent) becomes the panel.
 *
 * No edits to existing preview generators required — just inject this helper.
 *
 * Optional opt-out: add class "no-vt" to a section's wrapper or to the <h2>
 * itself, and that section will be left as a plain heading.
 */

export const autoVariantTabsHead = `
<style id="bp-auto-vt-style">
.bp-vt { margin: 0 0 32px; }
.bp-vt__tabs { display: flex; gap: 4px; padding: 4px; background: #f5f5f5; border-radius: 12px; margin-bottom: 16px; overflow-x: auto; scrollbar-width: none; }
.bp-vt__tabs::-webkit-scrollbar { display: none; }
.bp-vt__tab { flex-shrink: 0; height: 32px; padding: 0 14px; border: 0; background: transparent; border-radius: 8px; font: 500 13px/1 'Segoe UI', system-ui, -apple-system, sans-serif; color: #5d5d5d; cursor: pointer; white-space: nowrap; transition: background 120ms ease, color 120ms ease; }
.bp-vt__tab:hover { background: rgba(36,36,36,0.04); color: #242424; }
.bp-vt__tab.is-active { background: #ffffff; color: #242424; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
.bp-vt__panel { display: none; }
.bp-vt__panel.is-active { display: block; }
.bp-vt__panel > h2:first-child { display: none; }
</style>
<script>
(function(){
  function init(){
    // Strategy A: parent has 2+ direct <h2> children, group adjacent siblings between them.
    // Strategy B: parent has 2+ direct children where each child contains an <h2> as a descendant
    //             (typical pattern: each section is wrapped in its own <div><h2>...</h2>...</div>).
    var processed = new Set();

    function processStrategyA(parent){
      if (processed.has(parent)) return;
      var children = Array.from(parent.children);
      var hasH2 = children.filter(function(c){ return c.tagName === 'H2' && !c.classList.contains('no-vt'); });
      if (hasH2.length < 2) return false;
      processed.add(parent);
      var groups = [];
      var current = null;
      children.forEach(function(node){
        if (node.tagName === 'H2' && !node.classList.contains('no-vt')) {
          current = { label: node.textContent.trim(), nodes: [node] };
          groups.push(current);
        } else if (current) {
          current.nodes.push(node);
        }
      });
      buildTabs(parent, groups, groups[0].nodes[0]);
      return true;
    }

    function processStrategyB(parent){
      if (processed.has(parent)) return false;
      var children = Array.from(parent.children);
      // Each candidate must be an element whose first heading descendant is an h2 with no .no-vt.
      var candidates = children.map(function(c){
        if (c.classList && c.classList.contains('no-vt')) return null;
        var h = c.querySelector ? c.querySelector('h1, h2, h3') : null;
        if (h && h.tagName === 'H2' && !h.classList.contains('no-vt')) return { node: c, label: h.textContent.trim(), heading: h };
        return null;
      }).filter(Boolean);
      if (candidates.length < 2) return false;
      // All candidate sections must be contiguous siblings — fine if they aren't, we still wrap them.
      processed.add(parent);
      var groups = candidates.map(function(c){ return { label: c.label, nodes: [c.node], heading: c.heading }; });
      buildTabs(parent, groups, candidates[0].node);
      // Hide the in-section heading since the tab now provides the label.
      groups.forEach(function(g){ if (g.heading) g.heading.style.display = 'none'; });
      return true;
    }

    function buildTabs(parent, groups, anchor){
      var vt = document.createElement('div');
      vt.className = 'bp-vt';
      var tabs = document.createElement('div');
      tabs.className = 'bp-vt__tabs';
      tabs.setAttribute('role','tablist');
      vt.appendChild(tabs);
      parent.insertBefore(vt, anchor);
      groups.forEach(function(g, i){
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bp-vt__tab' + (i === 0 ? ' is-active' : '');
        btn.setAttribute('role','tab');
        btn.textContent = g.label;
        tabs.appendChild(btn);
        var panel = document.createElement('div');
        panel.className = 'bp-vt__panel' + (i === 0 ? ' is-active' : '');
        panel.setAttribute('role','tabpanel');
        g.nodes.forEach(function(n){ panel.appendChild(n); });
        vt.appendChild(panel);
      });
      var tabBtns = tabs.querySelectorAll('.bp-vt__tab');
      var panels  = vt.querySelectorAll('.bp-vt__panel');
      tabBtns.forEach(function(b, i){
        b.addEventListener('click', function(){
          tabBtns.forEach(function(x){ x.classList.remove('is-active'); });
          panels.forEach(function(x){ x.classList.remove('is-active'); });
          b.classList.add('is-active');
          if (panels[i]) panels[i].classList.add('is-active');
        });
      });
    }

    // Find candidate parents.
    var parents = new Set();
    document.querySelectorAll('h2').forEach(function(h){
      if (h.classList.contains('no-vt')) return;
      if (h.closest('.bp-vt')) return;
      if (h.closest('nav, aside, header.shell, .shell-header')) return;
      var p = h.parentElement;
      if (!p) return;
      // Walk up to find a parent that contains either: 2+ direct h2 siblings, or 2+ section-wrapper siblings.
      // Try direct h2 first (Strategy A); else try wrapper of the wrapper (Strategy B).
      parents.add(p);
      if (p.parentElement) parents.add(p.parentElement);
    });
    parents.forEach(function(p){
      if (processStrategyA(p)) return;
      processStrategyB(p);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
`;
