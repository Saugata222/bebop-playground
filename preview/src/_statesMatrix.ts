/**
 * States Matrix — Reusable helper for component preview pages.
 *
 * Renders a table where rows are component variants (size × style)
 * and columns are visual states (Rest, Hover, Pressed, Focus, Disabled, Selected).
 *
 * Each cell renders the same component with a forced-state class so that
 * every visual state is visible at rest, without interaction.
 *
 * The component's own CSS must be patched so that interactive pseudo-classes
 * (`:hover`, `:active`, `:focus-visible`) ALSO match a sibling class
 * (`.is-hover`, `.is-pressed`, `.is-focus`). See per-component generators
 * for the shim pattern.
 */

export type StateCol = {
  /** Column header label */
  label: string;
  /** CSS class to apply to the rendered element to force this visual state. Empty string for Rest. */
  cls: string;
  /** If true, also render the element with the `disabled` attribute (for native button/input). */
  disabled?: boolean;
};

export type RowSpec = {
  label: string;
  /** Free-form metadata the component-specific render fn can read */
  meta?: Record<string, unknown>;
};

export type RenderCell = (row: RowSpec, col: StateCol) => string;

/** CSS shared by every states matrix. Inject once per page. */
export const statesMatrixCss = `
.sm { margin: 32px auto 0; padding: 24px; background: #fff; border: 1px solid #ebebeb; border-radius: 16px; max-width: 1100px; }
.sm__title { font-size: 18px; font-weight: 600; color: #242424; margin-bottom: 4px; }
.sm__sub { font-size: 12px; color: #6f6f6f; margin-bottom: 20px; }
.sm__scroll { overflow-x: auto; }
.sm__table { width: 100%; border-collapse: separate; border-spacing: 0; min-width: 640px; }
.sm__table th, .sm__table td { padding: 12px 14px; text-align: left; vertical-align: middle; }
.sm__table thead th { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 1px solid #ebebeb; padding-bottom: 8px; white-space: nowrap; }
.sm__table tbody td { border-bottom: 1px solid #f5f5f5; }
.sm__table tbody tr:last-child td { border-bottom: none; }
.sm__rowlbl { font-size: 12px; font-weight: 600; color: #242424; white-space: nowrap; padding-right: 24px !important; }
.sm__cell { background: transparent; }
`;

/**
 * Build the matrix HTML.
 */
export function renderStatesMatrix(opts: {
  title: string;
  subtitle?: string;
  rows: RowSpec[];
  cols: StateCol[];
  render: RenderCell;
}): string {
  let out = '<section class="sm">';
  out += '<div class="sm__title">' + escapeHtml(opts.title) + '</div>';
  if (opts.subtitle) out += '<div class="sm__sub">' + escapeHtml(opts.subtitle) + '</div>';
  out += '<div class="sm__scroll"><table class="sm__table">';
  out += '<thead><tr><th></th>';
  for (const c of opts.cols) out += '<th>' + escapeHtml(c.label) + '</th>';
  out += '</tr></thead><tbody>';
  for (const r of opts.rows) {
    out += '<tr><td class="sm__rowlbl">' + escapeHtml(r.label) + '</td>';
    for (const c of opts.cols) {
      out += '<td class="sm__cell">' + opts.render(r, c) + '</td>';
    }
    out += '</tr>';
  }
  out += '</tbody></table></div></section>';
  return out;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
