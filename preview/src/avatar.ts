/**
 * Avatar — Interactive HTML Preview
 *
 * Ported from the One Copilot Desktop UI Kit (Figma node 2149:3419).
 * Renders the full mode × size matrix (Image · Icon · Initials across
 * 16 / 20 / 28 / 32 / 40 / 56 / 120px) and the Figma "Usage guidance"
 * (node 1497:1267).
 */

import * as fs from 'fs';
import * as path from 'path';
import { stage, segControl } from './_scaffold';

// ─── Fluent Person glyphs (read from src/components/icons) ───────────────────

const iconsDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..', 'src', 'components', 'icons');
function personSvg(size: number): string {
  return fs.readFileSync(path.join(iconsDir, `person-${size}-regular.svg`), 'utf-8')
    .replace(/<\?xml[^>]*>/, '')
    .replace(/width="\d+"/, '')
    .replace(/height="\d+"/, '')
    .trim();
}
// Nearest available optical size → rendered at the glyph box dimension.
const PERSON: Record<number, string> = { 12: personSvg(16), 16: personSvg(16), 24: personSvg(24), 32: personSvg(32), 56: personSvg(48) };

// Real user photo (from Figma node 2149:3426) — embedded once as a data URI.
const USER_PHOTO = 'data:image/png;base64,' + fs.readFileSync(path.join(iconsDir, 'avatar-user.png')).toString('base64');

// ─── Size definitions (container → padding → glyph/type) ────────────────────

type SizeDef = { size: number; pad: number; icon: number; fs: number; lh: number; weight: number; ls: number; initials: string };
const SIZES: SizeDef[] = [
  { size: 16, pad: 2, icon: 12, fs: 10, lh: 14, weight: 420, ls: 0, initials: 'A' },
  { size: 20, pad: 2, icon: 16, fs: 10, lh: 14, weight: 420, ls: 0, initials: 'AB' },
  { size: 28, pad: 6, icon: 16, fs: 12, lh: 16, weight: 420, ls: 0, initials: 'AB' },
  { size: 32, pad: 4, icon: 24, fs: 14, lh: 20, weight: 420, ls: 0, initials: 'AB' },
  { size: 40, pad: 8, icon: 24, fs: 16, lh: 22, weight: 420, ls: 0, initials: 'AB' },
  { size: 56, pad: 12, icon: 32, fs: 24, lh: 28, weight: 600, ls: -0.15, initials: 'AB' },
  { size: 120, pad: 32, icon: 56, fs: 32, lh: 38, weight: 600, ls: -0.15, initials: 'AB' },
];

// ─── CSS ────────────────────────────────────────────────────

const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { --avatar-photo: url("${USER_PHOTO}"); }
body { font-family: 'Segoe UI', 'Segoe Sans', system-ui, sans-serif; background: #f3f3f3; padding: 40px 24px; color: #242424; }
h1 { font-size: 24px; font-weight: 600; text-align: center; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 600; margin: 40px 0 16px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
.hint { font-size: 13px; color: #6f6f6f; text-align: center; margin-bottom: 32px; }
.wrap { max-width: 920px; margin: 0 auto; }

/* Matrix */
.matrix { display: grid; grid-template-columns: 96px repeat(7, 1fr); gap: 20px 12px; align-items: center; background: #fff; border: 1px solid #ececec; border-radius: 12px; padding: 28px 24px; }
.matrix__col { font-size: 10px; font-weight: 600; color: #6f6f6f; text-transform: uppercase; letter-spacing: 0.8px; text-align: center; }
.matrix__rl { font-size: 11px; font-weight: 600; color: #5d5d5d; text-align: left; }
.cell { display: flex; align-items: center; justify-content: center; min-height: 120px; }

/* ─── Avatar ─── */
.avatar { position: relative; display: inline-flex; align-items: center; justify-content: center; border-radius: 9999px; overflow: hidden; flex-shrink: 0; }
/* Image mode — photo fills the circle edge-to-edge */
.avatar--image { background: transparent; }
.avatar--image .avatar__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; background: var(--avatar-photo) center/cover no-repeat; }
/* Icon + Initials modes — soft neutral fill */
.avatar--icon, .avatar--initials { background: rgba(215,215,215,0.5); }
.avatar__glyph { color: #242424; display: flex; align-items: center; justify-content: center; }
.avatar__glyph svg { display: block; }
.avatar__initials { color: #242424; font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; text-align: center; white-space: nowrap; user-select: none; }

/* Usage guidance */
.usage { background: #fff; border: 1px solid #ececec; border-radius: 12px; padding: 28px 32px; margin-top: 24px; }
.usage h3 { font-size: 16px; font-weight: 600; color: #242424; margin: 22px 0 10px; }
.usage h3:first-child { margin-top: 0; }
.usage h4 { font-size: 13px; font-weight: 600; color: #242424; margin: 16px 0 6px; }
.usage p { font-size: 14px; line-height: 1.55; color: #424242; margin-bottom: 12px; }
.usage ul { margin: 0 0 4px 20px; }
.usage li { font-size: 14px; line-height: 1.55; color: #424242; margin-bottom: 8px; }
.usage li b { color: #242424; }
`;

// ─── Avatar builder ─────────────────────────────────────────

// Real user photo — image mode fills the circle regardless of content.

function avatar(mode: 'image' | 'icon' | 'initials', d: SizeDef): string {
  const box = 'width:' + d.size + 'px;height:' + d.size + 'px';
  if (mode === 'image') {
    return '<span class="avatar avatar--image" style="' + box + '">'
      + '<span class="avatar__img" role="img" aria-label="User avatar"></span>'
      + '</span>';
  }
  if (mode === 'icon') {
    const glyph = '<span class="avatar__glyph" style="width:' + d.icon + 'px;height:' + d.icon + 'px">'
      + PERSON[d.icon]!.replace('<svg', '<svg width="' + d.icon + '" height="' + d.icon + '"') + '</span>';
    return '<span class="avatar avatar--icon" style="' + box + ';padding:' + d.pad + 'px">' + glyph + '</span>';
  }
  const txt = '<span class="avatar__initials" style="font-size:' + d.fs + 'px;line-height:' + d.lh
    + 'px;font-weight:' + d.weight + ';letter-spacing:' + d.ls + 'px">' + d.initials + '</span>';
  return '<span class="avatar avatar--initials" style="' + box + ';padding:' + d.pad + 'px">' + txt + '</span>';
}

function matrix(): string {
  let out = '<div class="matrix">';
  out += '<div class="matrix__col"></div>';
  SIZES.forEach(function (d) { out += '<div class="matrix__col">' + d.size + 'px</div>'; });
  (['image', 'icon', 'initials'] as const).forEach(function (mode) {
    const label = mode.charAt(0).toUpperCase() + mode.slice(1);
    out += '<div class="matrix__rl">' + label + '</div>';
    SIZES.forEach(function (d) { out += '<div class="cell">' + avatar(mode, d) + '</div>'; });
  });
  out += '</div>';
  return out;
}

// ─── Usage guidance (Figma node 1497:1267) — verbatim ───────

const usage = [
  '<div class="usage">',

  '<h3>When to use</h3>',
  '<p>Use an avatar to represent a person, group, bot, or entity in a UI context \u2014 anywhere the experience needs to identify who or what is associated with a piece of content. Common surfaces include conversation threads, comments, and participant lists; assignment fields, people pickers, and profile headers.</p>',
  '<p>For abstract concepts, statuses, or categories, use an icon instead. Avatar is reserved for identifiable people, groups, bots, or entities. For overlapping multi-person displays, use the avatar group pattern, which is composed separately from this component.</p>',
  '<p>Don\'t use avatar as an interactive control. If the surrounding context needs interaction \u2014 opening a profile card, starting a chat \u2014 the wrapper element owns the interactive role, and the avatar inside it stays decorative or informative chrome.</p>',

  '<h3>Behavior</h3>',
  '<p>The three display modes are mutually exclusive. At runtime, show exactly one: image when a photo is available, otherwise icon or initials based on entity type. Don\'t show a fallback icon alongside initials.</p>',
  '<p>Avatar is non-interactive by default. Don\'t apply tabindex, pointer events, or interactive ARIA roles directly to the avatar. When the surrounding context needs interaction, the wrapper element owns that behavior.</p>',
  '<p>The activity ring scales with size. Both the transparent offset and the brand stroke widen in step with the container \u2014 thin at Small, thicker at XL \u2014 so the ring reads as a proportional emphasis rather than a fixed overlay.</p>',
  '<p>At Small and Medium sizes, the activity ring stroke can be hard to perceive. When the ring is the only signal that someone is active or collaborating, supplement it with a textual status indicator like a tooltip so the status carries to people who can\'t see the ring clearly.</p>',
  '<p>In icon mode, always use the Fluent Iconography Image icon as the default value. Don\'t substitute placeholder frames, shapes, or custom vectors.</p>',

  '<h3>Layout</h3>',
  '<p>Pick the size that matches the role the avatar plays on the surface.</p>',
  '<ul>',
  '<li><b>Small</b> \u2014 use for inline contexts where the avatar is a supporting detail: mentions, compact chips, message timestamps. At 16px, identity cues compress across all three modes \u2014 photos lose facial detail, icons read only if simple and high-contrast (the default Image icon works; multi-stroke entity icons may not), initials are limited to a single character in caption type, and the activity ring stroke is thin and may fall below the perceptual threshold. Treat Small as a supporting detail alongside adjacent text, not as the primary identifier.</li>',
  '<li><b>Medium</b> \u2014 default for most surfaces. Use in comment threads, assignment rows, and any context where the avatar shares vertical space with body text.</li>',
  '<li><b>Large</b> \u2014 use for higher-emphasis identity moments: profile cards, people pickers, detail views.</li>',
  '<li><b>XL</b> \u2014 use sparingly for hero moments: large profile views, about pages, onboarding flows. One per focal surface is the intended use.</li>',
  '</ul>',
  '<p>Avatar groups (multiple overlapping avatars) are a separate composed pattern and aren\'t covered by this component.</p>',

  '<h3>Accessibility</h3>',
  '<p>Treat each avatar as either decorative or informative \u2014 the choice drives every other accessibility decision on the component.</p>',
  '<ul>',
  '<li><b>Decorative or informative.</b> When the person\'s name or entity title appears adjacent \u2014 for example, in a list row or a comment thread \u2014 mark the avatar aria-hidden="true" to avoid announcing the identity twice. When the avatar is the only identifier in context, give it an accessible name that describes the person or entity, not the visual.</li>',
  '<li><b>Image alt text.</b> When the photo is informative, mirror the avatar\'s accessible name on the inner image. When the avatar is decorative, use empty alt text so the image is also skipped.</li>',
  '<li><b>Activity ring labeling.</b> The activity ring is a visual presence cue with no inherent semantics. When the ring is the sole signal that someone is active or collaborating, supplement it with a textual indicator \u2014 a visible label or a tooltip \u2014 so the status is announced to assistive technology.</li>',
  '<li><b>Zoom.</b> Avatar containers are fully circular, which keeps their shape at any zoom level. Set the container diameter in a zoom-resilient unit on surfaces that need to scale.</li>',
  '<li><b>Motion.</b> Avatar has no animated state transitions, so no reduced-motion accommodation is required on the component itself.</li>',
  '</ul>',

  '<h3>Content</h3>',
  '<h4>Initials</h4>',
  '<p>Use 1\u20132 uppercase characters. For a person, use the first and last initial \u2014 for example, LM. For a group or entity, use up to 2 characters from the entity name. Don\'t use lowercase or punctuation. At Small size, limit initials to a single character \u2014 two letters feel tight inside the 16px container and compromise legibility.</p>',
  '<h4>Icon</h4>',
  '<p>Default to the Image icon from Fluent Iconography. Swap for a more specific entity icon only when the entity type is consistently recognizable by that icon \u2014 like a bot icon for automated agents or a group icon for shared mailboxes.</p>',
  '<h4>Image</h4>',
  '<p>The photo should crop closely to the person\'s face or the entity\'s primary visual mark. Avoid padding or whitespace around the subject inside the circular container.</p>',
  '<h4>Typography</h4>',
  '<p>Always use functional typography for initials. Don\'t apply content-set type (Segoe Serif, editorial styles) to avatar initials \u2014 they are UI chrome, not editorial content.</p>',

  '</div>',
].join('\n');

// ─── Page ───────────────────────────────────────────────────

const body = [
  '<div class="wrap">',
  stage(
    '<div id="heroAv" style="display:flex;align-items:center;justify-content:center">' +
    '<span data-mode="image">' + avatar('image', SIZES[6]!) + '</span>' +
    '<span data-mode="icon" style="display:none">' + avatar('icon', SIZES[6]!) + '</span>' +
    '<span data-mode="initials" style="display:none">' + avatar('initials', SIZES[6]!) + '</span>' +
    '</div>',
    segControl('Mode', 'mode', [
      { value: 'image', label: 'Image', active: true },
      { value: 'icon', label: 'Icon' },
      { value: 'initials', label: 'Initials' },
    ]),
  ),
  '<h2>Mode \u00d7 Size</h2>',
  matrix(),
  '<p class="hint" style="text-align:left;margin:12px 2px 0">Image mode uses a placeholder fill; in product it renders a photo cropped to the subject. Icon mode uses the Fluent Person glyph on a soft neutral fill.</p>',
  '<h2>Usage guidance</h2>',
  usage,
  '</div>',
  '<script>(function(){var ctr=document.getElementById(\'heroAv\');if(!ctr)return;document.querySelectorAll(\'[data-ctrl]\').forEach(function(btn){btn.addEventListener(\'click\',function(){var m=btn.getAttribute(\'data-value\');ctr.querySelectorAll(\'[data-mode]\').forEach(function(s){s.style.display=s.getAttribute(\'data-mode\')===m?\'\':\'none\';});var seg=btn.parentNode;seg.querySelectorAll(\'button\').forEach(function(b){b.classList.toggle(\'is-active\',b===btn);});});});})();</script>',
].join('\n');

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>'
  + '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
  + '<title>Avatar Preview</title>'
  + '<style>' + css + '</style></head><body>'
  + body + '</body></html>';

const outDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const outPath = path.join(outDir, 'avatar.html');
fs.writeFileSync(outPath, html, 'utf-8');
console.log('Done: ' + outPath);
