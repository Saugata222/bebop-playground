/**
 * Preview Scaffold — shared builders for the unified primitive page anatomy.
 *
 * Every primitive preview follows one vertical rhythm:
 *   Header (injected by _inject.ts) → Stage → Variants → States → Specs →
 *   Guidance → Related (injected by _inject.ts).
 *
 * These builders emit semantic `bp-*` markup; all styling lives in the shared
 * scaffold stylesheet in `_inject.ts` (injected into every dist page), so the
 * surface stays consistent and generators carry no bespoke layout CSS.
 *
 * String-escaping: callers pass already-built HTML fragments. Follow the
 * preview generator escaping rules (see .github/instructions).
 */

// ─── Section wrapper ────────────────────────────────────────

/** A titled showcase region. `hint` is an optional right-aligned caption. */
export function section(title: string, body: string, hint = ''): string {
  const head =
    '<div class="bp-section__head"><span class="bp-section__title">' + title + '</span>' +
    (hint ? '<span class="bp-section__hint">' + hint + '</span>' : '') +
    '</div>';
  return '<section class="bp-section">' + head + body + '</section>';
}

// ─── 1. Stage — the interactive area ────────────────────────

/**
 * Dotted-canvas live area with one hero instance, plus an optional controls
 * rail underneath. `dark` swaps the canvas to the dark dot grid.
 */
export function stage(canvas: string, controls = '', opts: { dark?: boolean } = {}): string {
  const canvasCls = 'bp-stage__canvas' + (opts.dark ? ' bp-stage__canvas--dark' : '');
  return (
    '<div class="bp-stage">' +
    '<div class="' + canvasCls + '">' + canvas + '</div>' +
    (controls ? '<div class="bp-controls">' + controls + '</div>' : '') +
    '</div>'
  );
}

/**
 * A labeled segmented control for the controls rail. `name` is used for the
 * data attribute the generator's own JS listens on; options carry a value,
 * label, and optional `active` flag.
 */
export function segControl(
  label: string,
  name: string,
  options: { value: string; label: string; active?: boolean }[],
): string {
  const btns = options
    .map(
      (o) =>
        '<button type="button" data-ctrl="' + name + '" data-value="' + o.value + '"' +
        (o.active ? ' class="is-active"' : '') + '>' + o.label + '</button>',
    )
    .join('');
  return (
    '<div class="bp-control"><span class="bp-lbl">' + label + '</span>' +
    '<div class="bp-seg" data-seg="' + name + '">' + btns + '</div></div>'
  );
}

// ─── 2. Variants — one tile per configuration ───────────────

export function variants(tiles: { label: string; html: string }[]): string {
  const cells = tiles
    .map(
      (t) =>
        '<div class="bp-tile">' + t.html +
        '<span class="bp-tile__label">' + t.label + '</span></div>',
    )
    .join('');
  return '<div class="bp-variants">' + cells + '</div>';
}

// ─── 3. States — matrix that scrolls inside its own card ────

/** `cols` are the state names; each row has a label and one cell per column. */
export function matrix(cols: string[], rows: { label: string; cells: string[] }[]): string {
  const head =
    '<thead><tr><th></th>' + cols.map((c) => '<th>' + c + '</th>').join('') + '</tr></thead>';
  const body =
    '<tbody>' +
    rows
      .map(
        (r) =>
          '<tr><th>' + r.label + '</th>' +
          r.cells.map((c) => '<td>' + c + '</td>').join('') + '</tr>',
      )
      .join('') +
    '</tbody>';
  return '<div class="bp-matrix-wrap"><table class="bp-matrix">' + head + body + '</table></div>';
}

// ─── 4. Specs — token readout ───────────────────────────────

export function specs(items: { k: string; v: string }[]): string {
  const cells = items
    .map(
      (i) =>
        '<div class="bp-spec"><div class="bp-spec__k">' + i.k + '</div>' +
        '<div class="bp-spec__v">' + i.v + '</div></div>',
    )
    .join('');
  return '<div class="bp-specs">' + cells + '</div>';
}

// ─── 5. Guidance — Do / Don't cards ─────────────────────────

export function guidance(dos: string[], donts: string[]): string {
  const list = (items: string[]) => '<ul>' + items.map((i) => '<li>' + i + '</li>').join('') + '</ul>';
  const doCard =
    '<div class="bp-guide bp-guide--do"><div class="bp-guide__head"><span class="bp-guide__dot"></span>Do</div>' +
    list(dos) + '</div>';
  const dontCard =
    '<div class="bp-guide bp-guide--dont"><div class="bp-guide__head"><span class="bp-guide__dot"></span>Don\u2019t</div>' +
    list(donts) + '</div>';
  return '<div class="bp-guidance">' + doCard + dontCard + '</div>';
}

// ─── Usage guidance — long-form doc, One Copilot surface ────

/**
 * Long-form usage guidance housed in the unified section + card system.
 * Each section is a short semibold heading plus one or more `<p>` fragments
 * (callers may include `<strong>`). Preserves existing guidance copy while
 * matching the One Copilot page styling.
 */
export function usageGuidance(sections: { h: string; body: string }[], title = 'Usage guidance'): string {
  const inner = sections
    .map((s) => '<div class="bp-usage__sec"><h4>' + s.h + '</h4>' + s.body + '</div>')
    .join('');
  const card = '<div class="bp-usage"><div class="bp-usage__card">' + inner + '</div></div>';
  return section(title, card);
}
