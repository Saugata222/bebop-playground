/**
 * ConnectorSkills Deck — Experiment
 *
 * A full-screen, keyboard-driven slide deck recreating the Figma "Connector
 * Skills" deck (file HrcwzQ59vChIgZU5PvPVQM, node 998:121428). Each Figma slide
 * frame is presented full-bleed (16:9, letterboxed on other aspect ratios) so
 * the deck is pixel-faithful to the source. Compete screenshots remain native
 * PNG layers to preserve small UI text.
 *
 * The /awareness section (Figma slides 5, 5.1-5.4) is merged into ONE
 * interactive slide: the Settings L1 (Sources) page rendered live from the
 * connectorSkillsP0 experiment inside the slide's screen window, so the
 * audience can click a source -> L2 detail -> Connect during the talk. Only the
 * screen area is interactive; the title/label/background are static chrome.
 *
 * Interaction:
 *   - Left / Right (also Up/Down, PageUp/PageDown, Space) move between slides
 *   - Home / End jump to first / last; f toggles fullscreen
 *   - Hovering the left/right edge reveals a chevron button to move slides
 *   - The URL hash (#5) tracks position so refresh keeps the slide
 *
 * Slide order: 1, 2, 2.1, 3, 3.1, 3.2, 4, [5 = live settings], 6, 6.1, 6.2, 7, [8 = live admin], 10
 *
 * Self-contained chrome: slide imagery is base64-inlined. Live slides embed
 * sibling preview HTML files in iframes.
 */

import * as fs from 'fs';
import * as path from 'path';
import { liveDeckSlides, type LiveDeckSlide } from './_deckHarness.ts';
import { scriptAssignment } from './_html.ts';

const here = path.dirname(new URL(import.meta.url).pathname);
const assetDir = path.join(here, 'assets', 'connectorSkillsDeck');
// Cache-bust the live iframes so a fresh deck load never serves a stale sibling (AdminX/P0).
const deckV = Date.now();
// Deck chrome fonts inlined so headers/pills render crisply on Pages without a separate file.
const orbitB64 = fs.readFileSync(path.join(here, '..', 'fonts', 'Orbit.woff2')).toString('base64');
const dmSansB64 = fs.readFileSync(path.join(here, '..', 'fonts', 'DMSans.woff2')).toString('base64');

function dataUri(n: number): string {
  const p = path.join(assetDir, 'slide' + String(n).padStart(2, '0') + '.jpg');
  return 'data:image/jpeg;base64,' + fs.readFileSync(p).toString('base64');
}

function assetUri(name: string): string {
  return 'data:image/jpeg;base64,' + fs.readFileSync(path.join(assetDir, name)).toString('base64');
}

function fileUri(name: string, mime: string): string {
  return 'data:' + mime + ';base64,' + fs.readFileSync(path.join(assetDir, name)).toString('base64');
}

type Slide =
  | { type: 'img'; label: string; src: string }
  | { type: 'cover'; label: string; src: string }
  | { type: 'overlay'; label: string; bg: string; cards: [number, number, number, number][]; radius: number }
  | { type: 'reveal'; label: string; bg: string; layers: { src: string; rect: [number, number, number, number] }[] }
  | { type: 'crisp'; label: string; bg: string; transitionGroup: string; heading?: string; pills?: string[]; caption?: string; layers: { src: string; rect: [number, number, number, number]; crop: [number, number]; radius: number; border?: number }[] }
  | LiveDeckSlide;

// Figma "Web content and sidebar" frame in slide 5 = x240 y220 1440x900 within
// the 1920x1080 slide -> screen window as percentages of the slide box.
const SCREEN_RECT: [number, number, number, number] = [240 / 1920 * 100, 220 / 1080 * 100, 1440 / 1920 * 100, 900 / 1080 * 100];
// AdminX awareness live slide: browser-window web-content area (Figma frame 998:114606, x200 y284 1519x796) in the 1920x1080 slide.
const ADMINX_RECT: [number, number, number, number] = [200 / 1920 * 100, 284 / 1080 * 100, 1519 / 1920 * 100, 796 / 1080 * 100];

// Model logos for /compete pills (real Figma assets: Claude sunburst PNG, OpenAI vector).
const CLAUDE_LOGO = '<img class="cpill__img" alt="" src="data:image/png;base64,' + fs.readFileSync(path.join(assetDir, 'claude-logo.png')).toString('base64') + '"/>';
const OPENAI_LOGO = fs.readFileSync(path.join(assetDir, 'openai-logo.svg'), 'utf-8').replace(/\n/g, '');
function cpill(logo: string, text: string): string { return (logo ? '<span class="cpill__logo">' + logo + '</span>' : '') + text; }

const SLIDES: Slide[] = [
  { type: 'cover', label: '1', src: dataUri(1) },
  // /mos package — split in two: base (no cards) then the three columns fade in one by one.
  { type: 'img', label: '2', src: fileUri('slide02base.jpg', 'image/jpeg') },
  { type: 'reveal', label: '2.1', bg: fileUri('slide02base.jpg', 'image/jpeg'), layers: [
    { src: fileUri('slide02c1.png', 'image/png'), rect: [30, 580, 497, 430] },
    { src: fileUri('slide02c2.png', 'image/png'), rect: [527, 580, 500, 430] },
    { src: fileUri('slide02c3.png', 'image/png'), rect: [1027, 580, 483, 430] },
  ] },
  // /compete — native Figma screenshots stay independent so browser text is never flattened and resampled with the slide chrome.
  { type: 'crisp', label: '3', bg: fileUri('slide-compete-claude-awareness.png', 'image/png'), transitionGroup: 'compete', heading: '/compete', pills: [cpill(CLAUDE_LOGO, 'Claude'), cpill('', 'Awareness of skills')], caption: 'Skills show up in settings and directory', layers: [
    { src: fileUri('claude-aware-left.png', 'image/png'), rect: [-174, 350, 735, 461], crop: [1.0304, -0.0304], radius: 12 },
    { src: fileUri('claude-aware-center.png', 'image/png'), rect: [593, 350, 734, 460], crop: [1.0304, -0.0304], radius: 12 },
    { src: fileUri('claude-aware-right.png', 'image/png'), rect: [1359, 350, 735, 461], crop: [1.0304, -0.0304], radius: 12 },
  ] },
  { type: 'crisp', label: '3.1', bg: fileUri('slide-compete-openai-awareness.png', 'image/png'), transitionGroup: 'compete', heading: '/compete', pills: [cpill(OPENAI_LOGO, 'OpenAI'), cpill('', 'Awareness of skills')], caption: 'Skills show up in settings and directory', layers: [
    { src: fileUri('openai-aware-left.png', 'image/png'), rect: [-172, 350, 733, 460], crop: [1.0304, -0.0304], radius: 12 },
    { src: fileUri('openai-aware-center.png', 'image/png'), rect: [593, 350, 733, 460], crop: [1.0304, -0.0304], radius: 12, border: 1 },
    { src: fileUri('openai-aware-right.png', 'image/png'), rect: [1358, 350, 733, 460], crop: [1.0304, -0.0304], radius: 12, border: 1 },
  ] },
  { type: 'crisp', label: '3.2', bg: fileUri('slide-compete-claude-invocation.png', 'image/png'), transitionGroup: 'compete', heading: '/compete', pills: [cpill(CLAUDE_LOGO, 'Claude'), cpill('', 'Invocation of skills')], caption: 'Skills can be invoked implicitly or explicitly', layers: [
    { src: fileUri('claude-invoke-left.png', 'image/png'), rect: [-242, 350, 734.463, 460], crop: [1.0314, -0.0314], radius: 12, border: 1.098 },
    { src: fileUri('claude-invoke-center.png', 'image/png'), rect: [527.59, 350, 733.365, 460], crop: [1.0314, -0.0314], radius: 12, border: 1.098 },
    { src: fileUri('claude-invoke-right.png', 'image/png'), rect: [1296.09, 350, 734.463, 460], crop: [1.0314, -0.0314], radius: 12, border: 1.098 },
  ] },
  { type: 'img', label: '4', src: dataUri(5) },
  // Merged /awareness — live Settings L1 (Sources) from connectorSkillsP0.
  ...liveDeckSlides('connectorSkillsP0.html', [
    { label: '5', chrome: dataUri(6), view: 'settings', rect: SCREEN_RECT, base: [1440, 900], heading: '/awareness', labels: ['Skills in source details', 'Skill description on hover', 'Transparent view of skill instructions'], labelWidths: [380, 408, 578] },
  // /invocation — implicit query, explicit slash / + menu, and discovery.
    { label: '6', chrome: dataUri(11), view: 'implicit', transitionGroup: 'invocation', rect: SCREEN_RECT, base: [1440, 900], shadow: true, heading: '/invocation', labelText: 'Implicit invocation based on query', labelWidth: 521 },
    { label: '6.1', chrome: dataUri(12), view: 'ciq', transitionGroup: 'invocation', rect: SCREEN_RECT, base: [1440, 900], heading: '/invocation', labelText: 'Explicit invocation using /', labelWidth: 422, labelAltText: 'Explicit invocation using + menu', labelAltWidth: 493, headerSrc: dataUri(11) },
    { label: '6.2', chrome: assetUri('slide-inv3.jpg'), view: 'disc', transitionGroup: 'invocation', rect: SCREEN_RECT, base: [1440, 900], shadow: true, heading: '/invocation', labelText: 'Invocation driving connector discovery', labelWidth: 578 },
  ]),
  { type: 'img', label: '7', src: dataUri(16) },
  // Merged /awareness AdminX (Figma 8, 8.1-8.3) -> live Connectors list + interactive details pane + skill detail.
  ...liveDeckSlides('connectorSkillsAdminX.html', [
    { label: '8', chrome: dataUri(17), rect: ADMINX_RECT, base: [1519, 796], screenRadius: 0, heading: '/awareness', labelText: 'Skill information in details pane', labelWidth: 507 },
  ]),
  { type: 'img', label: '10', src: dataUri(21) },
];

const CHEV_LEFT = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5 8 12l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHEV_RIGHT = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const css = `
@font-face { font-family: 'Orbit'; src: url(data:font/woff2;base64,${orbitB64}) format('woff2'); font-weight: 400; font-style: normal; font-display: block; }
@font-face { font-family: 'DM Sans'; src: url(data:font/woff2;base64,${dmSansB64}) format('woff2'); font-weight: 100 1000; font-style: normal; font-display: block; }
* { box-sizing: border-box; }
html, body { margin: 0; height: 100%; }
body {
  background: #0c0c0e;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  color: #e9e9ea;
  -webkit-font-smoothing: antialiased;
}
.stage { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; }
.frame { position: relative; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; }
.slide {
  max-width: 100vw; max-height: 100vh; width: auto; height: auto;
  object-fit: contain; display: block;
  user-select: none; -webkit-user-drag: none;
}
/* Crossfade cover: the outgoing slide sits on top and fades out to reveal the new one underneath (no black flash). */
.xfade {
  position: absolute; inset: 0; margin: auto;
  max-width: 100vw; max-height: 100vh; width: auto; height: auto;
  object-fit: contain; display: block;
  pointer-events: none; opacity: 0; z-index: 30; will-change: opacity;
}

/* Overlay slide — static art with live hover zones over baked cards */
.overlaywrap {
  position: relative;
  width: min(100vw, calc(100vh * 16 / 9));
  height: min(100vh, calc(100vw * 9 / 16));
  transition: opacity .18s ease;
}
.overlaywrap[hidden] { display: none; }
.overlaybg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; pointer-events: none; user-select: none; -webkit-user-drag: none; }
.hotcard {
  position: absolute; box-sizing: border-box;
  border: 1.5px solid transparent; background-color: transparent; cursor: pointer;
  transition: box-shadow .18s ease, background-color .18s ease, border-color .18s ease;
}
.hotcard:hover {
  box-shadow: 0 14px 36px rgba(0,0,0,.16);
  background-color: rgba(36,36,36,.04);
  border-color: rgba(36,36,36,.45);
}

/* Reveal slide — base art with card columns that fade in one by one */
.revealwrap { position: relative; width: min(100vw, calc(100vh * 16 / 9)); height: min(100vh, calc(100vw * 9 / 16)); transition: opacity .18s ease; }
.revealwrap[hidden] { display: none; }
.revealbg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; pointer-events: none; user-select: none; -webkit-user-drag: none; }
.reveal-layer { position: absolute; object-fit: fill; pointer-events: none; user-select: none; -webkit-user-drag: none; opacity: 0; transition: opacity .5s ease; }
.reveal-layer.is-in { opacity: 1; }

/* Crisp compete slide — original Figma PNGs remain independent high-density browser layers. */
.crispwrap { position: relative; width: min(100vw, calc(100vh * 16 / 9)); height: min(100vh, calc(100vw * 9 / 16)); }
.crispwrap[hidden] { display: none; }
.crispbg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; pointer-events: none; user-select: none; -webkit-user-drag: none; }
.crisplayer { position: absolute; box-sizing: border-box; overflow: hidden; padding: 0; background: transparent; cursor: zoom-in; appearance: none; }
.crisplayer:focus-visible { outline: 3px solid #242424; outline-offset: 3px; }
.crisplayer img { position: absolute; left: 0; width: 100%; max-width: none; pointer-events: none; user-select: none; -webkit-user-drag: none; }

/* Screenshot lightbox */
.shotmodal { position: fixed; inset: 0; z-index: 100; display: flex; align-items: center; justify-content: center; padding: 5vh 5vw; background: rgba(12,12,14,.82); opacity: 0; transition: opacity .16s ease; }
.shotmodal[hidden] { display: none; }
.shotmodal.is-open { opacity: 1; }
.shotmodal__viewport { position: relative; overflow: hidden; border-radius: 12px; box-shadow: 0 28px 80px rgba(0,0,0,.42), 0 4px 18px rgba(0,0,0,.28); transform: scale(.975); transition: transform .16s ease; }
.shotmodal.is-open .shotmodal__viewport { transform: scale(1); }
.shotmodal__image { position: absolute; left: 0; top: 0; display: block; max-width: none; }
.shotmodal__close { position: fixed; top: max(18px, env(safe-area-inset-top)); right: max(18px, env(safe-area-inset-right)); z-index: 101; width: 44px; height: 44px; display: grid; place-items: center; padding: 0 0 3px; border: 1px solid rgba(255,255,255,.2); border-radius: 50%; background: rgba(24,24,27,.82); color: #fff; font: 300 30px/1 "Segoe UI", sans-serif; cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,.28); }
.shotmodal__close:hover { background: rgba(36,36,39,.94); }
.shotmodal__close:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

/* Cover slide — static art with a subtle animated ASCII field behind (screen-blended so it only lifts the dark bg) */
.coverwrap { position: relative; width: min(100vw, calc(100vh * 16 / 9)); height: min(100vh, calc(100vw * 9 / 16)); transition: opacity .18s ease; }
.coverwrap[hidden] { display: none; }
.coverbg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; pointer-events: none; user-select: none; -webkit-user-drag: none; z-index: 1; }
.cover-fx { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; mix-blend-mode: screen; z-index: 2; }

/* Live (interactive) slide */
.livewrap {
  position: relative;
  width: min(100vw, calc(100vh * 16 / 9));
  height: min(100vh, calc(100vw * 9 / 16));
  border-radius: min(2.083vw, 3.704vh);
  overflow: hidden;
}
.livewrap[hidden] { display: none; }
.livebg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; pointer-events: none; user-select: none; -webkit-user-drag: none; }
.livescreen { position: absolute; overflow: hidden; background: transparent; }
.livescreen iframe { position: absolute; left: 0; top: 0; border: 0; transform-origin: 0 0; background: #f5f5f5; }
.textlabel {
  position: absolute; z-index: 4; display: none; align-items: center; justify-content: center;
  box-sizing: border-box; padding: 0 20px; border: 1px solid #9a9a9a; border-radius: 32px;
  background: #f1f1f1; color: #1e1e1e; white-space: nowrap; pointer-events: none;
  font-family: "Orbit", "Cascadia Code", "SFMono-Regular", Consolas, monospace;
  font-weight: 400; line-height: 1.2; letter-spacing: -0.264px; -webkit-font-smoothing: antialiased;
}
.headercrop { position: absolute; left: 0; top: 0; width: 36%; height: 20%; display: none; overflow: hidden; pointer-events: none; }
.headercrop img { position: absolute; left: 0; top: 0; max-width: none; pointer-events: none; user-select: none; -webkit-user-drag: none; }
.slidehead { position: absolute; z-index: 4; display: none; align-items: center; box-sizing: border-box; background: #f1f1f1; color: #8a8a8a; white-space: nowrap; pointer-events: none; font-family: 'DM Sans', system-ui, sans-serif; font-weight: 400; line-height: 1; letter-spacing: -0.5px; -webkit-font-smoothing: antialiased; }
.cpills { position: absolute; z-index: 4; display: none; align-items: center; pointer-events: none; }
.cpill { display: inline-flex; align-items: center; box-sizing: border-box; border: 1px solid #c9c9c9; background: #f1f1f1; color: #242424; white-space: nowrap; font-family: 'Orbit', 'Cascadia Code', 'SFMono-Regular', Consolas, monospace; font-weight: 400; letter-spacing: -0.264px; -webkit-font-smoothing: antialiased; }
.cpill__logo { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; color: #424242; }
.cpill__logo svg, .cpill__logo img { display: block; width: 100%; height: 100%; object-fit: contain; }
.ccap { position: absolute; left: 50%; transform: translateX(-50%); display: none; z-index: 4; }

/* Progress bar */
.pbar { display: none; }

/* Edge hover zones + chevron buttons (kept narrow so they never cover the live screen) */
.edge { position: fixed; top: 0; bottom: 0; width: 8vw; min-width: 76px; max-width: 150px; z-index: 60;
  display: flex; align-items: center; border: none; background: transparent; cursor: pointer; padding: 0; outline: none; }
.edge--left { left: 0; justify-content: flex-start; padding-left: 18px; }
.edge--right { right: 0; justify-content: flex-end; padding-right: 18px; }
.edge__btn {
  width: 54px; height: 54px; border-radius: 9999px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(24,24,27,.62); color: #fff; border: 1px solid rgba(255,255,255,.14);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 6px 18px rgba(0,0,0,.35);
  opacity: 0; transform: scale(.9); transition: opacity .16s ease, transform .16s ease; pointer-events: none;
}
.edge__btn svg { width: 26px; height: 26px; }
.edge:hover .edge__btn, .edge:focus-visible .edge__btn { opacity: 1; transform: scale(1); }
.edge--disabled { pointer-events: none; }
.edge--disabled .edge__btn { display: none; }

/* Counter pill */
.counter { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 40;
  display: none; align-items: center; gap: 10px; padding: 7px 14px; border-radius: 9999px;
  background: rgba(20,20,23,.6); border: 1px solid rgba(255,255,255,.1);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  font-size: 13px; letter-spacing: .02em; color: #cfcfd2; opacity: 0; transition: opacity .3s ease; pointer-events: none; }
.counter.is-visible { opacity: 0; }
.counter__label { color: #fff; font-weight: 600; }
.counter__sep { color: #6a6a70; }

/* Live badge on the interactive slide */
.livebadge { position: fixed; bottom: 20px; right: 20px; z-index: 40; display: none; align-items: center; gap: 7px;
  padding: 6px 12px 6px 10px; border-radius: 9999px; background: rgba(20,20,23,.6); border: 1px solid rgba(255,255,255,.1);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); font-size: 12.5px; color: #d6d6d9; pointer-events: none; }
.livebadge.is-visible { display: none; }
.livebadge__dot { width: 8px; height: 8px; border-radius: 50%; background: #34c759; box-shadow: 0 0 6px rgba(52,199,89,.7); }

/* First-load keyboard hint */
.hint { position: fixed; bottom: 64px; left: 50%; transform: translateX(-50%); z-index: 40;
  padding: 8px 16px; border-radius: 9999px; background: rgba(20,20,23,.72); border: 1px solid rgba(255,255,255,.1);
  font-size: 13px; color: #b9b9be; backdrop-filter: blur(8px); transition: opacity .4s ease; pointer-events: none; }
.hint.is-hidden { opacity: 0; }
.hint kbd { display: inline-block; min-width: 20px; text-align: center; padding: 1px 6px; margin: 0 2px; border-radius: 5px;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.14); font-family: inherit; font-size: 12px; color: #fff; }
@media (max-width: 640px) { .hint { display: none; } .edge { width: 16vw; } }
`;

let html = '';
html += '<!DOCTYPE html>';
html += '<html lang="en"><head>';
html += '<meta charset="utf-8"/>';
html += '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>';
html += '<title>Connector Skills \u2014 Deck</title>';
html += '<style>' + css + '</style>';
html += '</head><body>';
html += '<div class="pbar" id="pbar"></div>';
html += '<div class="stage"><div class="frame" id="frame">';
html += '<img class="slide" id="slide" alt="Slide"/>';
html += '<div class="livewrap" id="live" hidden><img class="livebg" id="liveBg" alt=""/><div class="headercrop" id="headerCrop"><img id="headerArt" alt=""/></div><div class="livescreen" id="liveScreen"></div><div class="slidehead" id="slideHead"></div><div class="textlabel" id="textLabel"></div></div>';
html += '<img class="xfade" id="xfade" alt="" aria-hidden="true"/>';
html += '<div class="overlaywrap" id="overlay" hidden><img class="overlaybg" id="overlayBg" alt=""/></div>';
html += '<div class="revealwrap" id="reveal" hidden><img class="revealbg" id="revealBg" alt=""/></div>';
html += '<div class="crispwrap" id="crisp" hidden><img class="crispbg" id="crispBg" alt=""/><div class="slidehead" id="crispHead"></div><div class="cpills" id="crispPills"></div><div class="cpill ccap" id="crispCaption"></div></div>';
html += '<div class="coverwrap" id="cover" hidden><img class="coverbg" id="coverBg" alt=""/><canvas class="cover-fx" id="coverFx"></canvas></div>';
html += '</div></div>';
html += '<div class="shotmodal" id="shotModal" role="dialog" aria-modal="true" aria-label="Expanded screenshot" hidden><div class="shotmodal__viewport" id="shotModalViewport"><img class="shotmodal__image" id="shotModalImg" alt="Expanded compete screenshot"/></div><button class="shotmodal__close" id="shotModalClose" type="button" aria-label="Close expanded screenshot">&times;</button></div>';
html += '<button class="edge edge--left" id="edgePrev" aria-label="Previous slide"><span class="edge__btn">' + CHEV_LEFT + '</span></button>';
html += '<button class="edge edge--right" id="edgeNext" aria-label="Next slide"><span class="edge__btn">' + CHEV_RIGHT + '</span></button>';
html += '<div class="counter" id="counter"><span class="counter__label" id="cLabel">1</span><span class="counter__sep">\u2022</span><span id="cIndex">1</span> / <span id="cTotal">21</span></div>';
html += '<div class="livebadge" id="liveBadge"><span class="livebadge__dot"></span>Live \u00b7 click the screen to interact</div>';
html += '<button id="focusSink" aria-hidden="true" tabindex="-1" style="position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none;border:0;"></button>';
html += '<div class="hint" id="hint"><kbd>\u2190</kbd><kbd>\u2192</kbd> to navigate \u00b7 <kbd>F</kbd> fullscreen</div>';

// ─── Deck runtime ───────────────────────────────────────────
html += '<script>';
html += '(function(){';
html += '  ' + scriptAssignment('SLIDES', SLIDES);
html += '  var n = SLIDES.length;';
html += '  var img = document.getElementById(\'slide\');';
html += '  var frame = document.getElementById(\'frame\');';
html += '  var live = document.getElementById(\'live\');';
html += '  var overlay = document.getElementById(\'overlay\');';
html += '  var overlayBg = document.getElementById(\'overlayBg\');';
html += '  var reveal = document.getElementById(\'reveal\');';
html += '  var revealBg = document.getElementById(\'revealBg\');';
html += '  var crisp = document.getElementById(\'crisp\');';
html += '  var crispBg = document.getElementById(\'crispBg\');';
html += '  var crispHead = document.getElementById(\'crispHead\');';
html += '  var crispPills = document.getElementById(\'crispPills\');';
html += '  var crispCaption = document.getElementById(\'crispCaption\');';
html += '  var shotModal = document.getElementById(\'shotModal\');';
html += '  var shotModalViewport = document.getElementById(\'shotModalViewport\');';
html += '  var shotModalImg = document.getElementById(\'shotModalImg\');';
html += '  var shotModalClose = document.getElementById(\'shotModalClose\');';
html += '  var cover = document.getElementById(\'cover\');';
html += '  var coverBg = document.getElementById(\'coverBg\');';
html += '  var coverFx = document.getElementById(\'coverFx\');';
html += '  var liveBg = document.getElementById(\'liveBg\');';
html += '  var headerCrop = document.getElementById(\'headerCrop\');';
html += '  var headerArt = document.getElementById(\'headerArt\');';
html += '  var liveScreen = document.getElementById(\'liveScreen\');';
html += '  var liveFrames = {};';
html += '  function wireFrameKeys(fr){ if (fr.__deckKeysWired) return; fr.__deckKeysWired = 1; function attach(){ var doc; try { doc = fr.contentDocument; } catch(e){ return; } if (!doc || doc.__deckKeysWired) return; doc.__deckKeysWired = 1; doc.addEventListener(\'keydown\', function(e){ var target = e.target; if (e.metaKey || e.ctrlKey || e.altKey || (target && (target.matches(\'input, textarea, select\') || target.isContentEditable))) return; var k = e.key; if (k === \'ArrowRight\' || k === \'ArrowDown\' || k === \'PageDown\' || k === \' \'){ e.preventDefault(); next(); } else if (k === \'ArrowLeft\' || k === \'ArrowUp\' || k === \'PageUp\'){ e.preventDefault(); prev(); } else if (k === \'Home\'){ e.preventDefault(); go(0); } else if (k === \'End\'){ e.preventDefault(); go(n - 1); } }); } fr.addEventListener(\'load\', attach); if (fr.contentDocument && fr.contentDocument.readyState === \'complete\') attach(); }';
html += '  function preloadLive(i){ if (liveFrames[i]) return liveFrames[i]; var s = SLIDES[i]; if (!s || s.type !== \'live\') return null; var fr = document.createElement(\'iframe\'); fr.title = \'Live\'; fr.setAttribute(\'allow\', \'clipboard-write\'); fr.setAttribute(\'scrolling\', \'no\'); fr.style.cssText = \'position:absolute;left:0;top:0;border:0;transform-origin:0 0;background:#f5f5f5;display:none;\'; fr.src = s.iframe + (s.iframe.indexOf(\'?\')<0?\'?\':\'&\') + \'v=' + deckV + '\'; liveScreen.appendChild(fr); liveFrames[i] = fr; wireFrameKeys(fr); return fr; }';
html += '  function activateLiveFrame(fr, s){ var posted = false; function post(){ if (posted || SLIDES[cur] !== s || !fr.contentWindow) return; posted = true; try { fr.contentWindow.postMessage({ type: \'copilot-deck-activate\', view: s.iframe.indexOf(\'?view=\') === -1 ? \'\' : decodeURIComponent(s.iframe.split(\'?view=\')[1]) }, location.origin); } catch(e){} } fr.addEventListener(\'load\', post, { once: true }); try { if (fr.contentWindow.location.href !== \'about:blank\' && fr.contentDocument && fr.contentDocument.readyState === \'complete\') post(); } catch(e){} }';
html += '  var textLabel = document.getElementById(\'textLabel\');';
html += '  var slideHead = document.getElementById(\'slideHead\');';
html += '  var pbar = document.getElementById(\'pbar\');';
html += '  var counter = document.getElementById(\'counter\');';
html += '  var cLabel = document.getElementById(\'cLabel\');';
html += '  var cIndex = document.getElementById(\'cIndex\');';
html += '  var cTotal = document.getElementById(\'cTotal\');';
html += '  var edgePrev = document.getElementById(\'edgePrev\');';
html += '  var edgeNext = document.getElementById(\'edgeNext\');';
html += '  var liveBadge = document.getElementById(\'liveBadge\');';
html += '  var focusSink = document.getElementById(\'focusSink\');';
html += '  var hint = document.getElementById(\'hint\');';
html += '  var xfade = document.getElementById(\'xfade\');';
html += '  cTotal.textContent = String(n);';
html += '  document.body.tabIndex = -1;';
html += '  function clampFromHash(){ var h = decodeURIComponent((location.hash || \'\').replace(\'#\', \'\')); if (h.indexOf(\'slide=\') === 0){ var label = h.slice(6); for (var i = 0; i < n; i++){ if (SLIDES[i].label === label) return i; } } var v = parseInt(h, 10); if (!isNaN(v) && v >= 1 && v <= n) return v - 1; return 0; }';
html += '  var cur = clampFromHash();';
html += '  var counterT = null;';
html += '  var modalTrigger = null;';
html += '  function showCounter(){ counter.classList.add(\'is-visible\'); if (counterT) clearTimeout(counterT); counterT = setTimeout(function(){ counter.classList.remove(\'is-visible\'); }, 1800); }';
html += '  var currentShotLayer = null;';
html += '  function layoutShot(){ if (shotModal.hidden || !currentShotLayer) return; var nw = shotModalImg.naturalWidth, nh = shotModalImg.naturalHeight; if (!nw || !nh) return; var topFrac = -currentShotLayer.crop[1] / currentShotLayer.crop[0]; if (!(topFrac >= 0)) topFrac = 0; var visAspect = nw / (nh * (1 - topFrac)); var availW = 0.92 * window.innerWidth, availH = 0.88 * window.innerHeight; var dispW = Math.min(availW, availH * visAspect); var dispH = dispW / visAspect; var imgH = dispW * nh / nw; shotModalViewport.style.width = dispW + \'px\'; shotModalViewport.style.height = dispH + \'px\'; shotModalImg.style.width = dispW + \'px\'; shotModalImg.style.height = imgH + \'px\'; shotModalImg.style.top = (-topFrac * imgH) + \'px\'; }';
html += '  function openShot(layer, trigger){ modalTrigger = trigger; currentShotLayer = layer; shotModalImg.onload = layoutShot; shotModalImg.src = layer.src; shotModal.hidden = false; if (shotModalImg.complete) layoutShot(); shotModal.offsetWidth; shotModal.classList.add(\'is-open\'); shotModalClose.focus(); }';
html += '  function closeShot(){ if (shotModal.hidden) return; shotModal.classList.remove(\'is-open\'); shotModal.hidden = true; shotModalImg.removeAttribute(\'src\'); currentShotLayer = null; if (modalTrigger) modalTrigger.focus(); }';
html += '  shotModalClose.addEventListener(\'click\', closeShot);';
html += '  shotModal.addEventListener(\'click\', function(e){ if (e.target === shotModal) closeShot(); });';
// Position + scale the live screen iframe so it exactly fills the Figma window.
html += '  function layoutLive(){ var s = SLIDES[cur]; if (!s || s.type !== \'live\') return; var fr = liveFrames[cur]; if (!fr) return; var w = live.clientWidth; var r = s.rect; liveScreen.style.left = r[0] + \'%\'; liveScreen.style.top = r[1] + \'%\'; liveScreen.style.width = r[2] + \'%\'; liveScreen.style.height = r[3] + \'%\'; var k = w / 1920; fr.style.width = s.base[0] + \'px\'; fr.style.height = s.base[1] + \'px\'; fr.style.transform = \'scale(\' + k + \')\'; var rad = Math.round((s.screenRadius == null ? 18 : s.screenRadius) * k); liveScreen.style.borderTopLeftRadius = rad + \'px\'; liveScreen.style.borderTopRightRadius = rad + \'px\'; if (s.shadow){ liveScreen.style.borderBottomLeftRadius = rad + \'px\'; liveScreen.style.borderBottomRightRadius = rad + \'px\'; liveScreen.style.boxShadow = \'0 24px 60px rgba(0,0,0,0.16), 0 4px 14px rgba(0,0,0,0.08)\'; } else { liveScreen.style.borderBottomLeftRadius = \'0\'; liveScreen.style.borderBottomRightRadius = \'0\'; liveScreen.style.boxShadow = \'none\'; } }';
html += '  function buildHotcards(s){ while (overlay.children.length > 1) overlay.removeChild(overlay.lastChild); for (var i = 0; i < s.cards.length; i++){ var d = document.createElement(\'div\'); d.className = \'hotcard\'; overlay.appendChild(d); } }';
html += '  function layoutOverlay(){ var s = SLIDES[cur]; if (!s || s.type !== \'overlay\') return; var w = overlay.clientWidth; var k = w / 1920; var rad = Math.round(s.radius * k); var cards = overlay.querySelectorAll(\'.hotcard\'); for (var i = 0; i < cards.length; i++){ var c = s.cards[i]; if (!c) continue; var el = cards[i]; el.style.left = (c[0] / 1920 * 100) + \'%\'; el.style.top = (c[1] / 1080 * 100) + \'%\'; el.style.width = (c[2] / 1920 * 100) + \'%\'; el.style.height = (c[3] / 1080 * 100) + \'%\'; el.style.borderRadius = rad + \'px\'; } }';
html += '  function buildReveal(s){ while (reveal.children.length > 1) reveal.removeChild(reveal.lastChild); for (var i = 0; i < s.layers.length; i++){ var im2 = document.createElement(\'img\'); im2.className = \'reveal-layer\'; im2.alt = \'\'; im2.src = s.layers[i].src; reveal.appendChild(im2); } var els = [].slice.call(reveal.querySelectorAll(\'.reveal-layer\')); els.forEach(function(el, i){ setTimeout(function(){ if (SLIDES[cur] && SLIDES[cur].type === \'reveal\' && el.isConnected) el.classList.add(\'is-in\'); }, 450 + i * 700); }); }';
html += '  function layoutReveal(){ var s = SLIDES[cur]; if (!s || s.type !== \'reveal\') return; var els = reveal.querySelectorAll(\'.reveal-layer\'); for (var i = 0; i < els.length; i++){ var r = s.layers[i] && s.layers[i].rect; if (!r) continue; var el = els[i]; el.style.left = (r[0] / 1920 * 100) + \'%\'; el.style.top = (r[1] / 1080 * 100) + \'%\'; el.style.width = (r[2] / 1920 * 100) + \'%\'; el.style.height = (r[3] / 1080 * 100) + \'%\'; } }';
html += '  function buildCrisp(s){ var old = crisp.querySelectorAll(\'.crisplayer\'); for (var q = 0; q < old.length; q++) old[q].parentNode.removeChild(old[q]); for (var i = 0; i < s.layers.length; i++){ var box = document.createElement(\'button\'); box.type = \'button\'; box.className = \'crisplayer\'; box.setAttribute(\'aria-label\', \'Enlarge screenshot \' + (i + 1)); box.__layer = s.layers[i]; box.addEventListener(\'click\', function(){ openShot(this.__layer, this); }); var shot = document.createElement(\'img\'); shot.alt = \'\'; shot.src = s.layers[i].src; box.appendChild(shot); crisp.appendChild(box); } if (crispHead){ if (s.heading){ crispHead.textContent = s.heading; crispHead.style.display = \'flex\'; } else crispHead.style.display = \'none\'; } if (crispPills){ if (s.pills){ crispPills.innerHTML = s.pills.map(function(p){ return \'<span class="cpill">\' + p + \'</span>\'; }).join(\'\'); crispPills.style.display = \'flex\'; } else crispPills.style.display = \'none\'; } if (crispCaption){ if (s.caption){ crispCaption.textContent = s.caption; crispCaption.style.display = \'inline-flex\'; } else crispCaption.style.display = \'none\'; } }';
html += '  function layoutCrisp(){ var s = SLIDES[cur]; if (!s || s.type !== \'crisp\') return; var k = crisp.clientWidth / 1920; var boxes = crisp.querySelectorAll(\'.crisplayer\'); for (var i = 0; i < boxes.length; i++){ var layer = s.layers[i]; if (!layer) continue; var r = layer.rect; var box = boxes[i]; var shot = box.firstElementChild; box.style.left = (r[0] / 1920 * 100) + \'%\'; box.style.top = (r[1] / 1080 * 100) + \'%\'; box.style.width = (r[2] / 1920 * 100) + \'%\'; box.style.height = (r[3] / 1080 * 100) + \'%\'; box.style.borderRadius = (layer.radius * k) + \'px\'; box.style.border = layer.border ? ((layer.border * k) + \'px solid #b9b9b9\') : \'0\'; shot.style.height = (layer.crop[0] * 100) + \'%\'; shot.style.top = (layer.crop[1] * 100) + \'%\'; } if (crispHead){ crispHead.style.left = (40 / 1920 * 100) + \'%\'; crispHead.style.top = (48 / 1080 * 100) + \'%\'; crispHead.style.height = (104 * k) + \'px\'; crispHead.style.paddingLeft = (11 * k) + \'px\'; crispHead.style.paddingRight = (26 * k) + \'px\'; crispHead.style.fontSize = (94 * k) + \'px\'; } if (crispPills){ crispPills.style.top = (62 / 1080 * 100) + \'%\'; crispPills.style.right = ((1920 - 1858) / 1920 * 100) + \'%\'; crispPills.style.height = (58 * k) + \'px\'; crispPills.style.gap = (14 * k) + \'px\'; var cps = crispPills.querySelectorAll(\'.cpill\'); for (var cj = 0; cj < cps.length; cj++){ var cp = cps[cj]; cp.style.height = (58 * k) + \'px\'; cp.style.borderRadius = (29 * k) + \'px\'; cp.style.padding = \'0 \' + (20 * k) + \'px\'; cp.style.fontSize = (25 * k) + \'px\'; cp.style.gap = (9 * k) + \'px\'; var lg = cp.querySelector(\'.cpill__logo\'); if (lg){ lg.style.width = (27 * k) + \'px\'; lg.style.height = (27 * k) + \'px\'; } } } if (crispCaption){ crispCaption.style.top = (862 / 1080 * 100) + \'%\'; crispCaption.style.height = (58 * k) + \'px\'; crispCaption.style.borderRadius = (29 * k) + \'px\'; crispCaption.style.padding = \'0 \' + (22 * k) + \'px\'; crispCaption.style.fontSize = (25 * k) + \'px\'; } }';
html += '  var fxRAF = null, fxT = 0, fxCtx = null, fxLast = 0;';
html += '  function sizeAscii(){ if (!coverFx || !cover) return; var r = cover.getBoundingClientRect(); var dpr = Math.min(window.devicePixelRatio || 1, 2); coverFx.width = Math.max(1, Math.round(r.width * dpr)); coverFx.height = Math.max(1, Math.round(r.height * dpr)); coverFx.__dpr = dpr; }';
html += '  function fxFrame(ts){ if (!fxRAF) return; fxRAF = requestAnimationFrame(fxFrame); if (ts - fxLast < 45) return; fxLast = ts; var ctx = fxCtx; if (!ctx) return; var W = coverFx.width, H = coverFx.height, dpr = coverFx.__dpr || 1; var cell = Math.round(26 * dpr); ctx.clearRect(0, 0, W, H); ctx.font = Math.round(cell * 0.82) + \'px ui-monospace, Menlo, Consolas, monospace\'; ctx.textBaseline = \'top\'; var cols = Math.ceil(W / cell), rows = Math.ceil(H / cell); fxT += 0.028; var ramp = \' .:-=+*#%\'; for (var y = 0; y < rows; y++){ for (var x = 0; x < cols; x++){ var dX = (x * cell + cell / 2) / W * 1920, dY = (y * cell + cell / 2) / H * 1080; if (dX > 1338 && dX < 1868 && dY > 40 && dY < 142) continue; var ex = Math.max(0, Math.min(1, (dX - 1350) / 90)) * Math.max(0, Math.min(1, (dY - 450) / 90)); if (ex > 0.97) continue; var v = Math.sin(x * 0.25 + fxT) + Math.sin(y * 0.33 + fxT * 0.8) + Math.sin((x + y) * 0.17 - fxT * 0.6); var nn = (v + 3) / 6; if (nn < 0.44) continue; var idx = Math.floor(nn * 8); var ch = ramp.charAt(idx); if (ch === \' \') continue; var a = (0.05 + (nn - 0.44) * 0.28) * (1 - ex); ctx.fillStyle = \'rgba(150,168,200,\' + a.toFixed(3) + \')\'; ctx.fillText(ch, x * cell, y * cell); } } }';
html += '  function startAscii(){ if (fxRAF || !coverFx) return; sizeAscii(); fxCtx = coverFx.getContext(\'2d\'); fxLast = 0; fxRAF = requestAnimationFrame(fxFrame); }';
html += '  function stopAscii(){ if (fxRAF){ cancelAnimationFrame(fxRAF); fxRAF = null; } if (fxCtx && coverFx){ fxCtx.clearRect(0, 0, coverFx.width, coverFx.height); } }';
html += '  function wireAwareLabel(fr, s){ if (!fr || fr.__awareWired) return; fr.__awareWired = 1; function attach(){ var doc; try { doc = fr.contentDocument; } catch(e){ return; } if (!doc) return; var st = \'default\'; var hovering = false; function apply(){ if (!textLabel || !s.labels || !s.labelWidths) return; var idx = (st === \'detail\') ? 2 : (hovering ? 1 : 0); setPill(s.labels[idx], s.labelWidths[idx]); } fr.__awareApply = apply; doc.addEventListener(\'mouseover\', function(e){ var t = e.target && e.target.closest && e.target.closest(\'.stgd__chip--skill\'); if (t){ hovering = true; apply(); } }); doc.addEventListener(\'mouseout\', function(e){ var t = e.target && e.target.closest && e.target.closest(\'.stgd__chip--skill\'); if (t){ hovering = false; apply(); } }); var sd = doc.getElementById(\'stgDetail\'); function checkDetail(){ var inD = !!(sd && !sd.hidden && sd.querySelector(\'.stgd__skhead\')); st = inD ? \'detail\' : \'default\'; if (inD) hovering = false; apply(); } if (sd){ try { new MutationObserver(checkDetail).observe(sd, { childList: true, subtree: true, attributes: true }); } catch(e){} } apply(); } if (fr.contentDocument && fr.contentDocument.readyState === \'complete\') attach(); fr.addEventListener(\'load\', attach); }';
html += '  function layoutHeader(){ if (!headerArt || !live) return; headerArt.style.width = live.clientWidth + \'px\'; headerArt.style.height = live.clientHeight + \'px\'; }';
html += '  function setPill(text, width){ if (!textLabel || !text || !width) return; textLabel.textContent = text; textLabel.__baseWidth = width; textLabel.style.width = (width * live.clientWidth / 1920) + \'px\'; }';
html += '  function setTextLabel(s, alternate){ if (!textLabel || !s.labelText) return; var useAlt = !!(alternate && s.labelAltText); setPill(useAlt ? s.labelAltText : s.labelText, useAlt ? s.labelAltWidth : s.labelWidth); }';
html += '  function wireTextLabel(fr, s){ if (!fr || !s.labelAltText || fr.__textLabelWired) return; fr.__textLabelWired = 1; function attach(){ var doc; try { doc = fr.contentDocument; } catch(e){ return; } if (!doc) return; var cmp = doc.getElementById(\'cmp\'); if (!cmp) return; function apply(){ if (SLIDES[cur] === s) setTextLabel(s, cmp.classList.contains(\'is-am-open\')); } fr.__textLabelApply = apply; try { new MutationObserver(apply).observe(cmp, { attributes: true, attributeFilter: [\'class\'] }); } catch(e){} apply(); } if (fr.contentDocument && fr.contentDocument.readyState === \'complete\') attach(); fr.addEventListener(\'load\', attach); }';
html += '  function layoutTextLabel(){ var s = SLIDES[cur]; if (!s || s.type !== \'live\' || (!s.labelText && !s.labels) || !textLabel) return; var k = live.clientWidth / 1920; textLabel.style.right = ((1920 - 1858) / 1920 * 100) + \'%\'; textLabel.style.top = (62 / 1080 * 100) + \'%\'; textLabel.style.height = (58 * k) + \'px\'; textLabel.style.padding = \'0 \' + (20 * k) + \'px\'; textLabel.style.borderRadius = (32 * k) + \'px\'; textLabel.style.fontSize = (24 * k) + \'px\'; if (textLabel.__baseWidth) textLabel.style.width = (textLabel.__baseWidth * k) + \'px\'; }';
html += '  function layoutHead(){ var s = SLIDES[cur]; if (!s || s.type !== \'live\' || !s.heading || !slideHead) return; var k = live.clientWidth / 1920; slideHead.style.left = (40 / 1920 * 100) + \'%\'; slideHead.style.top = (48 / 1080 * 100) + \'%\'; slideHead.style.height = (104 * k) + \'px\'; slideHead.style.paddingLeft = (11 * k) + \'px\'; slideHead.style.paddingRight = (26 * k) + \'px\'; slideHead.style.fontSize = (94 * k) + \'px\'; }';
html += '  function render(){';
html += '    var s = SLIDES[cur];';
html += '    if (s.type !== \'cover\'){ if (cover) cover.hidden = true; stopAscii(); }';
html += '    if (textLabel && !(s.type === \'live\' && (s.labelText || s.labels))) textLabel.style.display = \'none\';';
html += '    if (slideHead && !(s.type === \'live\' && s.heading)) slideHead.style.display = \'none\';';
html += '    if (headerCrop && !(s.type === \'live\' && s.headerSrc)) headerCrop.style.display = \'none\';';
html += '    if (s.type === \'live\'){';
html += '      img.style.display = \'none\';';
html += '      overlay.hidden = true;';
html += '      reveal.hidden = true;';
html += '      crisp.hidden = true;';
html += '      live.hidden = false;';
html += '      if (liveBg.getAttribute(\'src\') !== s.chrome) liveBg.src = s.chrome;';
html += '      if (s.headerSrc && headerCrop && headerArt){ if (headerArt.getAttribute(\'src\') !== s.headerSrc) headerArt.src = s.headerSrc; headerCrop.style.display = \'block\'; layoutHeader(); }';
html += '      var fr = preloadLive(cur);';
html += '      for (var _lk in liveFrames){ liveFrames[_lk].style.display = (_lk == cur) ? \'block\' : \'none\'; }';
html += '      activateLiveFrame(fr, s);';
html += '      liveBadge.classList.add(\'is-visible\');';
html += '      layoutLive();';
html += '      if (s.labels && s.labelWidths && textLabel){ setPill(s.labels[0], s.labelWidths[0]); textLabel.style.display = \'flex\'; layoutTextLabel(); wireAwareLabel(fr, s); if (fr.__awareApply) fr.__awareApply(); }';
html += '      if (s.labelText && textLabel){ setTextLabel(s, false); textLabel.style.display = \'flex\'; layoutTextLabel(); wireTextLabel(fr, s); if (fr.__textLabelApply) fr.__textLabelApply(); }';
html += '      if (s.heading && slideHead){ slideHead.textContent = s.heading; slideHead.style.display = \'flex\'; layoutHead(); }';
html += '    } else if (s.type === \'overlay\'){';
html += '      img.style.display = \'none\';';
html += '      live.hidden = true;';
html += '      reveal.hidden = true;';
html += '      crisp.hidden = true;';
html += '      overlay.hidden = false;';
html += '      if (overlayBg.getAttribute(\'src\') !== s.bg) overlayBg.src = s.bg;';
html += '      buildHotcards(s);';
html += '      layoutOverlay();';
html += '      liveBadge.classList.remove(\'is-visible\');';
html += '      try { window.focus(); document.body.focus(); } catch(e){}';
html += '    } else if (s.type === \'reveal\'){';
html += '      img.style.display = \'none\';';
html += '      live.hidden = true;';
html += '      overlay.hidden = true;';
html += '      crisp.hidden = true;';
html += '      reveal.hidden = false;';
html += '      if (revealBg.getAttribute(\'src\') !== s.bg) revealBg.src = s.bg;';
html += '      buildReveal(s);';
html += '      layoutReveal();';
html += '      liveBadge.classList.remove(\'is-visible\');';
html += '      try { window.focus(); document.body.focus(); } catch(e){}';
html += '    } else if (s.type === \'crisp\'){';
html += '      img.style.display = \'none\';';
html += '      live.hidden = true;';
html += '      overlay.hidden = true;';
html += '      reveal.hidden = true;';
html += '      crisp.hidden = false;';
html += '      if (crispBg.getAttribute(\'src\') !== s.bg) crispBg.src = s.bg;';
html += '      buildCrisp(s);';
html += '      layoutCrisp();';
html += '      liveBadge.classList.remove(\'is-visible\');';
html += '      try { window.focus(); document.body.focus(); } catch(e){}';
html += '    } else if (s.type === \'cover\'){';
html += '      img.style.display = \'none\';';
html += '      live.hidden = true;';
html += '      overlay.hidden = true;';
html += '      reveal.hidden = true;';
html += '      crisp.hidden = true;';
html += '      cover.hidden = false;';
html += '      if (coverBg.getAttribute(\'src\') !== s.src) coverBg.src = s.src;';
html += '      startAscii();';
html += '      liveBadge.classList.remove(\'is-visible\');';
html += '      try { window.focus(); document.body.focus(); } catch(e){}';
html += '    } else {';
html += '      live.hidden = true;';
html += '      overlay.hidden = true;';
html += '      reveal.hidden = true;';
html += '      crisp.hidden = true;';
html += '      img.style.display = \'block\';';
html += '      img.src = s.src;';
html += '      img.alt = \'Slide \' + s.label;';
html += '      liveBadge.classList.remove(\'is-visible\');';
html += '      try { for (var _bk in liveFrames){ if (liveFrames[_bk].contentWindow) liveFrames[_bk].contentWindow.blur(); } } catch(e){}';
html += '      try { window.focus(); if (focusSink) focusSink.focus(); } catch(e){}';
html += '    }';
html += '    cLabel.textContent = s.label;';
html += '    cIndex.textContent = String(cur + 1);';
html += '    pbar.style.width = ((cur + 1) / n * 100) + \'%\';';
html += '    edgePrev.classList.toggle(\'edge--disabled\', cur === 0);';
html += '    edgeNext.classList.toggle(\'edge--disabled\', cur === n - 1);';
  html += '    var stableHash = \'slide=\' + encodeURIComponent(s.label); if (stableHash !== (location.hash || \'\').replace(\'#\', \'\')) history.replaceState(null, \'\', \'#\' + stableHash);';
html += '    showCounter();';
html += '  }';
html += '  function currentCoverSrc(){ var s = SLIDES[cur]; return s.type === \'live\' ? s.chrome : ((s.type === \'overlay\' || s.type === \'reveal\' || s.type === \'crisp\') ? s.bg : s.src); }';
html += '  function go(to){ var t = Math.max(0, Math.min(n - 1, to)); if (t === cur){ showCounter(); return; } var from = SLIDES[cur], target = SLIDES[t]; var direct = !!(from.transitionGroup && from.transitionGroup === target.transitionGroup); var slow = (cur === 0 || t === 0); var dur = slow ? 900 : 200; if (xfade){ xfade.style.transition = \'none\'; if (direct){ xfade.style.opacity = \'0\'; } else { xfade.src = currentCoverSrc(); xfade.style.opacity = \'1\'; } } cur = t; render(); if (xfade && !direct){ requestAnimationFrame(function(){ requestAnimationFrame(function(){ xfade.style.transition = \'opacity \' + dur + \'ms ease-in-out\'; xfade.style.opacity = \'0\'; }); }); } }';
html += '  function next(){ go(cur + 1); }';
html += '  function prev(){ go(cur - 1); }';
html += '  render();';
html += '  (function preloadAll(){ var q = []; for (var _i=0;_i<n;_i++){ if (SLIDES[_i].type===\'live\') q.push(_i); } q.sort(function(a,b){ return Math.abs(a-cur)-Math.abs(b-cur); }); var _p=0; function step(){ if (_p>=q.length) return; preloadLive(q[_p++]); setTimeout(step, 220); } setTimeout(step, 300); })();';
html += '  document.addEventListener(\'keydown\', function(e){';
html += '    if (!shotModal.hidden){ if (e.key === \'Escape\'){ e.preventDefault(); closeShot(); } else if (e.key === \'Tab\'){ e.preventDefault(); shotModalClose.focus(); } return; }';
html += '    if (e.metaKey || e.ctrlKey || e.altKey) return;';
html += '    var k = e.key;';
html += '    if (k === \'ArrowRight\' || k === \'ArrowDown\' || k === \'PageDown\' || k === \' \' || k === \'l\'){ e.preventDefault(); next(); }';
html += '    else if (k === \'ArrowLeft\' || k === \'ArrowUp\' || k === \'PageUp\' || k === \'h\'){ e.preventDefault(); prev(); }';
html += '    else if (k === \'Home\'){ e.preventDefault(); go(0); }';
html += '    else if (k === \'End\'){ e.preventDefault(); go(n - 1); }';
html += '    else if (k === \'f\' || k === \'F\'){ e.preventDefault(); if (!document.fullscreenElement){ (document.documentElement.requestFullscreen || function(){}).call(document.documentElement); } else { (document.exitFullscreen || function(){}).call(document); } }';
html += '  });';
html += '  edgePrev.addEventListener(\'click\', function(e){ e.preventDefault(); prev(); });';
html += '  edgeNext.addEventListener(\'click\', function(e){ e.preventDefault(); next(); });';
html += '  window.addEventListener(\'hashchange\', function(){ var t = clampFromHash(); if (t !== cur) go(t); });';
html += '  window.addEventListener(\'resize\', function(){ pbar.style.width = ((cur + 1) / n * 100) + \'%\'; layoutLive(); layoutHeader(); layoutOverlay(); layoutTextLabel(); layoutHead(); layoutReveal(); layoutCrisp(); layoutShot(); if (SLIDES[cur] && SLIDES[cur].type === \'cover\') sizeAscii(); });';
html += '  document.addEventListener(\'mousemove\', function(){ showCounter(); });';
html += '  var hintDismissed = false; function dropHint(){ if (hintDismissed) return; hintDismissed = true; hint.classList.add(\'is-hidden\'); }';
html += '  setTimeout(dropHint, 4200);';
html += '  document.addEventListener(\'keydown\', dropHint, { once: true });';
html += '  document.addEventListener(\'click\', dropHint, { once: true });';
// touch swipe (ignored when the gesture starts on the live screen)
html += '  var tx = null; document.addEventListener(\'touchstart\', function(e){ if (e.target && e.target.closest && e.target.closest(\'.livescreen, .crisplayer, .shotmodal\')) { tx = null; return; } tx = e.touches[0].clientX; }, { passive: true });';
html += '  document.addEventListener(\'touchend\', function(e){ if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 40){ if (dx < 0) next(); else prev(); } tx = null; });';
html += '})();';
html += '</script>';
html += '</body></html>';

const outDir = path.join(here, '..', 'dist');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'connectorSkillsDeck.html');
fs.writeFileSync(outPath, html, 'utf-8');
// eslint-disable-next-line no-console
console.log('Done: ' + outPath + ' (' + SLIDES.length + ' slides, ' + Math.round(html.length / 1024) + ' KB)');
