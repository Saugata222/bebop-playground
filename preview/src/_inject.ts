/**
 * _inject.ts — Post-processor for preview HTML files
 *
 * Redesigns every component preview page with:
 *   - Standardized header (title + tag + description + states)
 *   - Consistent layout, fonts, spacing matching the index/getting-started pages
 *   - Related components section at the bottom with 3 linked cards
 *   - Frosted auto-hide back bar
 *   - Bebop scrollbar primitive
 *
 * Run after all generators: npx tsx preview/src/_inject.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { experimentRegistry, type ExperimentDefinition } from './_experimentRegistry.js';

// ─── Component metadata ─────────────────────────────────────

interface ComponentMeta {
  title: string;
  desc: string;
  type: 'Compound' | 'Primitive';
  states: string[];
  related: string[]; // filenames without .html
}

const meta: Record<string, ComponentMeta> = {
  accordion: {
    title: 'Accordion',
    desc: 'Expand-and-collapse section primitive. A 24px header (chevron, leading icon, title) toggles a body slot. Chevron-leading and chevron-trailing layouts, with collapsed, expanded, hover, and focused states.',
    type: 'Primitive',
    states: ['Collapsed', 'Expanded', 'Hover', 'Focused'],
    related: ['divider', 'menu', 'nav'],
  },
  dropdown: {
    title: 'Dropdown',
    desc: 'Single-select dropdown. A 32px trigger (transparent surface, neutral stroke, Segoe Sans body-medium placeholder, trailing chevron) opens a white popover of 40px listbox items with a leading Fluent icon and label.',
    type: 'Primitive',
    states: ['Rest', 'Focused', 'Open', 'Selected'],
    related: ['menu', 'button', 'divider'],
  },
  menuListItem: {
    title: 'Menu List Item',
    desc: 'One Copilot menu row and Popover surface. A 20px leading icon + label with a secondary text slot positioned Right (single line, 40px) or Under (two lines, 60px). Rest, hover, pressed, disabled, and selected (filled icon + semibold label + soft #ebebeb backplate) inside a white Shadow/Low popover.',
    type: 'Primitive',
    states: ['Rest', 'Hover', 'Pressed', 'Selected', 'Disabled'],
    related: ['menu', 'dropdown', 'divider'],
  },
  tooltip: {
    title: 'Tooltip',
    desc: 'Read-only floating label that supplements an already-affordable control \u2014 an icon-only button, a truncated string, or a shortcut hint. White surface, 4\u00d78px padding, radius 8, Shadow/Low, Functional Body Small text. Placement Above (default), Below, Left, or Right; never interactive.',
    type: 'Primitive',
    states: ['Above', 'Below', 'Left', 'Right'],
    related: ['button', 'menuListItem', 'divider'],
  },
  link: {
    title: 'Link',
    desc: 'Inline text hyperlink in two type variants (Functional 14px, Content 16px), both in Segoe Sans. Rest, hover, pressed, and disabled states; functional uses a 1px solid underline, content a 2px dotted underline on hover/press.',
    type: 'Primitive',
    states: ['Rest', 'Hover', 'Pressed', 'Disabled'],
    related: ['button', 'divider', 'citation'],
  },
  input: {
    title: 'Input',
    desc: 'Single-line text field with an optional leading icon. Outline and Underline shapes, three sizes (small, medium, large), and seven states: rest, hover, pressed, focus, error, disabled, and filled.',
    type: 'Primitive',
    states: ['Rest', 'Hover', 'Pressed', 'Focus', 'Error', 'Disabled', 'Filled'],
    related: ['dropdown', 'button', 'chatInput'],
  },
  popover: {
    title: 'Popover',
    desc: 'Floating anchored surface with a directional beak. White surface, 16px radius, 16px padding, and a three-layer Shadow/Low elevation. Four positions — Above, Below, Left, Right — each pointing back at its trigger.',
    type: 'Primitive',
    states: ['Above', 'Below', 'Left', 'Right'],
    related: ['menu', 'dialog', 'tooltip'],
  },
  button: {
    title: 'Button',
    desc: 'Multi-variant button with 4 styles (subtle, outline, secondary, primary), 3 sizes (small, medium, large), icon and text layouts, and Standard vs Toggle types. Toggle reserves semibold width via a ghost element. Includes selected and disabled states plus usage guidance.',
    type: 'Primitive',
    states: ['Rest', 'Hover', 'Selected', 'Disabled'],
    related: ['tag', 'toggle', 'toolbar'],
  },
  tag: {
    title: 'Tag',
    desc: 'Dismissible chip that labels or filters content \u2014 the whole surface is the dismiss target. Icon-and-text and icon-only layouts, Small (24px) and Medium (32px) sizes, Regular and Selected (semibold) label weights, across Rest, Hover, Pressed, and Disabled. All icons use the Regular style (no filled variant).',
    type: 'Primitive',
    states: ['Rest', 'Hover', 'Pressed', 'Disabled', 'Selected'],
    related: ['button', 'divider', 'suggestionChips'],
  },
  badge: {
    title: 'Badge',
    desc: 'Small circular pill that tags an item inline with a short status word (e.g. \u201cRecommended\u201d beside a source name). Soft neutral fill (rgba(0,0,0,0.08)), 16px tall, 4px inline padding, circular radius, Functional Caption text (Segoe Sans 10/14, #242424). Non-interactive.',
    type: 'Primitive',
    states: ['Neutral', 'Brand'],
    related: ['tag', 'label', 'suggestionChips'],
  },
  tab: {
    title: 'Tab & TabList',
    desc: 'Pill-style tabs and tablist. Supports text and icon-only layouts, selected and unselected states, and single-select tablist behavior.',
    type: 'Primitive',
    states: ['Rest', 'Hover', 'Selected', 'Disabled', 'Focused'],
    related: ['button', 'divider', 'nav'],
  },
  toggle: {
    title: 'Toggle',
    desc: 'Small toggle switch for binary on/off states. Supports checked and unchecked with optional label and disabled state.',
    type: 'Primitive',
    states: ['Checked', 'Unchecked', 'Disabled'],
    related: ['button', 'sourcesMenu', 'divider'],
  },
  scrollbar: {
    title: 'Scrollbar',
    desc: 'Minimal overlay scrollbar. A 2px tertiary (#6f6f6f) pill thumb in a transparent, end-aligned track that widens to 6px on hover. Vertical and horizontal orientation.',
    type: 'Primitive',
    states: ['Vertical', 'Horizontal', 'Rest', 'Hover'],
    related: ['divider', 'canvasChat', 'menu'],
  },
  segmentedSwitch: {
    title: 'Segmented Switch',
    desc: 'Track-based control with 2\u20135 mutually exclusive segments and a sliding white indicator \u2014 Copilot\u2019s Chat/Cowork/Code switcher. Equal and Mixed grid width, label + icon-only segments, light and dark. Semibold-on-select with a ghost node to prevent reflow.',
    type: 'Primitive',
    states: ['2\u20135 segments', 'Equal', 'Mixed', 'Light', 'Dark'],
    related: ['tab', 'toggle', 'tabList'],
  },
  promptSuggestions: {
    title: 'Prompt Suggestions',
    desc: 'Type-ahead prompt autosuggestions (zero-query only). A category chip row (suggestionChips) above a list of prompt rows (menuListItem + divider), with an optional matched-word highlight that de-emphasizes the typed prefix. Light and dark themes.',
    type: 'Compound',
    states: ['Default', 'Matched words', 'Light', 'Dark'],
    related: ['suggestionChips', 'menuListItem', 'divider'],
  },
  attachmentPill: {
    title: 'Attachment Pill',
    desc: 'Composer attachment chip inserted from upload, OneDrive/Business, or the CiQ menu. A leading type glyph (filetype color icon, Fluent line icon, or circular avatar), a name with optional secondary line, and a trailing chevron. Files, people, meetings, emails, sites, channels, connector entities, context grounding \u2014 light and dark.',
    type: 'Compound',
    states: ['File', 'Person', 'Meeting', 'Uploading', 'Light', 'Dark'],
    related: ['avatar', 'tag', 'sourceCard'],
  },
  attachmentMenu: {
    title: 'Attachment Overflow Menu',
    desc: 'Popover listing every composer attachment, shown when clicking the overflow attachment pill. A titled surface (Attachments + dismiss) with attachment rows \u2014 type glyph, name, source \u2014 each with a Remove button. Light and dark. Reuses popover, button, menuListItem, and avatar.',
    type: 'Compound',
    states: ['Default', 'Light', 'Dark', 'Remove'],
    related: ['attachmentPill', 'popover', 'menuListItem'],
  },
  checkbox: {
    title: 'Checkbox',
    desc: 'Selection control for deferred, multi-select decisions. Unchecked, Checked, and Indeterminate statuses across Rest, Hover, Pressed, and Disabled states, in Standard (4px) and Circular styles, with the intentional secondary\u2192primary label shift.',
    type: 'Primitive',
    states: ['Unchecked', 'Checked', 'Indeterminate', 'Hover', 'Pressed', 'Disabled'],
    related: ['toggle', 'button', 'sourcesMenu'],
  },
  avatar: {
    title: 'Avatar',
    desc: 'Circular identity mark for a person, group, bot, or entity. Three mutually-exclusive display modes \u2014 Image, Icon (Fluent Person), and Initials \u2014 across seven sizes (16 \u2192 120px), each mapped to a functional type ramp. Non-interactive by default; renders full usage guidance.',
    type: 'Primitive',
    states: ['Image', 'Icon', 'Initials'],
    related: ['sourceCard', 'citation', 'menu'],
  },
  connectorLogos: {
    title: 'Connector Logos',
    desc: 'Reference catalog of every connector/company logo in the design system icon set, grouped by category (Commerce, Communication, Creative, Data & Analytics, Development tools, Financial Services, and more). ServiceNow and Azure DevOps are split out as tenant sources, enabled centrally by the admin. Each tile shows the embedded logo (PNG or inline SVG) and the connector name.',
    type: 'Primitive',
    states: ['By category', 'Tenant sources'],
    related: ['sourceCard', 'sourcesMenu', 'avatar'],
  },
  label: {
    title: 'Label',
    desc: 'Functional text label that names a control, with an optional required asterisk in danger. Small, Medium, and Large sizes in Regular (420) and Strong (625) weights, across Rest and Disabled states. Segoe Sans with size-stepped optical sizing (opsz 8 for S/M, 12 for L).',
    type: 'Primitive',
    states: ['Rest', 'Disabled', 'Required'],
    related: ['input', 'checkbox', 'dropdown'],
  },
  divider: {
    title: 'Divider',
    desc: 'Non-interactive separator. Horizontal and vertical lines with an optional content slot (20px icon + short label). Supports center, start, and end alignment; renders full usage guidance.',
    type: 'Primitive',
    states: ['Horizontal', 'Vertical', 'With Content'],
    related: ['accordion', 'toolbar', 'tab'],
  },
  suggestionChips: {
    title: 'Suggestion Chips',
    desc: 'Prompt suggestion chips shown below the chat input. Outline style with hover state and overflow button.',
    type: 'Primitive',
    states: ['Rest', 'Hover', 'Focused'],
    related: ['button', 'chatInput', 'tag'],
  },
  sourceCard: {
    title: 'Source Card',
    desc: 'Compact connector card for the Apps & Sources view. Shows a service icon, name, and action control in 4 states: Add, Added, Enabled, Disabled.',
    type: 'Primitive',
    states: ['Add', 'Added', 'Enabled', 'Disabled'],
    related: ['toggle', 'button', 'sourcesMenu'],
  },
  sourceFilter: {
    title: 'Source Filter',
    desc: 'A "Filter by" dropdown that narrows a connector / source list by category. Opens a menu with Recommended (the top connectors) plus competitive-use groupings (Finance, Productivity, Sales); selecting one filters the list live and the trigger reflects the active category. Composes the Dropdown trigger + Menu.',
    type: 'Primitive',
    states: ['Rest', 'Open', 'Recommended', 'Finance', 'Productivity', 'Sales'],
    related: ['dropdown', 'menu', 'sourcesMenu'],
  },
  citation: {
    title: 'Citation',
    desc: 'Inline indicator marking where a referenced source appears in a response — an entry point into a Citation Preview. Two variants: Work (leading product icon) and Web (source-name text), each with an optional +N overflow, across Rest and Selected in both Light and Dark themes.',
    type: 'Primitive',
    states: ['Work', 'Web', 'Selected', 'Light', 'Dark'],
    related: ['citationPreview', 'tag', 'responseFooter'],
  },
  citationPreview: {
    title: 'Citation Preview',
    desc: 'Floating hover card that surfaces a brief in-line glimpse of referenced sources — favicon, source name, article headline, and link — without interrupting reading flow. White surface, radius 24, Shadow/High; a stack of reference rows with an active-row backplate and a “more” action button.',
    type: 'Compound',
    states: ['Rest', 'Active Row', 'Scroll'],
    related: ['citation', 'menuListItem', 'responseFooter'],
  },  teachingNotification: {
    title: 'Teaching Notification',
    desc: 'Source Discovery teaching popover \u2014 a clipped Citation Preview on a soft grey plate over a title, a body sentence, and a Skip / Connect sources action row. Surface radius 16, Shadow/Raised; composes the Citation Preview and Button primitives. Shown with a Moody\u2019s / HubSpot / LSEG set and a GitHub / Jira / Confluence variant.',
    type: 'Compound',
    states: ['Default', 'GitHub · Jira · Confluence'],
    related: ['citationPreview', 'banner', 'button'],
  },  latency: {
    title: 'Latency',
    desc: 'AI thinking states shown before a response renders \u2014 Loading, Thinking, Chain-of-Thought, and Complete \u2014 for Default and Agent types across light and dark. An animated Copilot mark (real Figma motion GIF) with a shimmer-sweep label; completed steps settle to a static secondary label with a chevron.',
    type: 'Compound',
    states: ['Loading', 'Thinking', 'CoT', 'Complete', 'Agent'],
    related: ['citation', 'canvasChat', 'responseFooter'],
  },  responseBlocks: {
    title: 'Response Blocks',
    desc: 'The content type system used to construct a response \u2014 headings H1\u2013H5, subheadline, paragraphs (Large/Medium/Small + Strong + Link), list, divider, quote (editorial Georgia), table, and code (Consolas). Exact One Copilot fonts: Segoe Sans content (420/550/625), Georgia editorial, Consolas code.',
    type: 'Compound',
    states: ['Headings', 'Paragraphs', 'Quote', 'Table', 'Code', 'List'],
    related: ['response', 'citation', 'divider'],
  },  response: {
    title: 'Response',
    desc: 'A structured turn that composes a full reply \u2014 user message, optional latency, the Copilot message (a stack of Response Blocks with inline citations), and a Response Footer \u2014 in Light and Dark. A flexible blueprint that adapts to any context.',
    type: 'Compound',
    states: ['Light', 'Dark', 'With Citations', 'Footer'],
    related: ['responseBlocks', 'citation', 'latency'],
  },  addMenuOneCopilot: {
    title: 'Add Menu',
    desc: 'The One Copilot menu opened by the chat input \u201c+\u201d button \u2014 Add content, Upload image and files, Attach cloud files, Add capabilities (submenu), and Change data sources. Composed from the Menu Popover surface, MenuListItem rows, and Dividers; opens Above, left-aligned to the trigger.',
    type: 'Compound',
    states: ['Closed', 'Open', 'Hover', 'Submenu'],
    related: ['menuListItem', 'divider', 'chatInput'],
  },
  dialogOneCopilot: {
    title: 'Dialog',
    desc: 'One Copilot Dialog \u2014 a modal that interrupts the workflow for a critical action requiring explicit acknowledgement. White surface, radius 24, 28px inset, Shadow/Highest; Title Small (24/28 semibold) + Body Large (16/22) + a right-aligned footer. Three types: Neutral (Cancel + Okay secondary), On Brand (Cancel + Submit feedback primary), and Destructive (Delete subtle-danger + Keep primary). Light and dark. Reuses the Button primitive.',
    type: 'Compound',
    states: ['Neutral', 'On Brand', 'Destructive', 'Dark'],
    related: ['button', 'menu', 'connectDialog'],
  },
  skillAttachment: {
    title: 'Skill Attachment',
    desc: 'A connector skill attached to the prompt box \u2014 added when a \u201c/skill\u201d is selected from a source\u2019s skills list (Change sources \u2192 source L2). A 186\u00d758 chip with a circular Script icon, /name (Functional Body Medium Strong) + description (Functional Body Small), and a top-right dismiss. Shown standalone and inside the composer prompt box.',
    type: 'Compound',
    states: ['Default', 'In prompt box', 'Hover dismiss'],
    related: ['composer', 'chatInput', 'attachmentPill'],
  },
  menu: {
    title: 'Menu',
    desc: 'Dropdown menu surface with list items, section headers, secondary content positioning, split items, checkmarks, and chevron indicators.',
    type: 'Compound',
    states: ['Rest', 'Hover', 'Selected', 'Disabled'],
    related: ['button', 'dialog', 'nav'],
  },
  dialog: {
    title: 'Dialog',
    desc: 'Modal that interrupts the workflow for a critical action requiring explicit acknowledgment. Three types \u2014 Neutral, Feedback, and Destructive (Danger confirm). Radius 24, Shadow/Highest; Title Small header (24/28), Body Large text (16/22), and a right-aligned footer (Cancel Subtle + Primary/Danger). Reuses the Button primitive.',
    type: 'Compound',
    states: ['Neutral', 'Feedback', 'Destructive'],
    related: ['button', 'menu', 'header'],
  },
  toolbar: {
    title: 'Toolbar',
    desc: 'Formatting toolbar with icon buttons, dividers, and selected state toggling for text formatting actions.',
    type: 'Compound',
    states: ['Rest', 'Hover', 'Selected'],
    related: ['button', 'divider', 'chatInput'],
  },
  header: {
    title: 'Header',
    desc: 'The primary anchor bar (Commercial). Work IQ badge + model picker (Auto) on the left; compliance shield (loud green) + temporary chat on the right. Collapses across the 1024+, 480-1023, and 320-479 breakpoints, in light and dark. Reuses the Button primitive.',
    type: 'Compound',
    states: ['1024+', '480-1023', '320-479', 'Light', 'Dark'],
    related: ['button', 'composer', 'nav'],
  },
  chatInput: {
    title: 'Chat Input',
    desc: 'Full-width chat input with toolbar, auto-growing textarea, underline indicator, mic button, and send button state transitions.',
    type: 'Compound',
    states: ['Rest', 'Focused', 'Text Entered'],
    related: ['button', 'suggestionChips', 'addMenu'],
  },
  canvasChat: {
    title: 'Canvas Chat',
    desc: 'Floating inline AI card with output area, input field, action buttons, attachments, and latency indicator.',
    type: 'Compound',
    states: ['Rest', 'Focused', 'With Response'],
    related: ['chatInput', 'button', 'dialog'],
  },
  addMenu: {
    title: 'Add Menu',
    desc: 'Frosted overlay menu triggered by the + button. Contains Work IQ toggle, file upload, cloud files, data sources, and agent links.',
    type: 'Compound',
    states: ['Open', 'Toggle On', 'Toggle Off'],
    related: ['chatInput', 'sourcesMenu', 'menu'],
  },
  sourcesMenu: {
    title: 'Sources Menu',
    desc: '"Change sources" modal (Figma Source Discovery node 943:19731). Composes a Popover surface, a header Manage sources Button, search Input, a source counter with a Turn off all action, and a list of Source Menu item rows (MenuListItem + connector logo + trailing Toggle or Connect link). Six sources are visible; the rest load on an infinite lazy scroll.',
    type: 'Compound',
    states: ['On', 'Off', 'With metadata', 'Not connected'],
    related: ['menu', 'toggle', 'popover'],
  },
  userMessage: {
    title: 'User Message',
    desc: 'The sent user turn: an optional attachment list, the prompt bubble (#f2f2f2, radius 12, Content Paragraph Medium), and a hover-revealed actions row (edit / copy / bookmark icon buttons + timestamp). Right-aligned; long messages collapse with a show-more chevron. Composes attachmentPill + button.',
    type: 'Compound',
    states: ['Short', 'Long', 'Expanded', 'With attachments', 'Actions on hover'],
    related: ['attachmentPill', 'composer', 'button'],
  },
  nav: {
    title: 'Side Nav',
    desc: 'The single shared navigation shell (Work variant). Header (Copilot + open/apps/collapse), a Chat|Tasks Segmented Switch pivot, primary items, Pinned and Chats sections, and a Me control footer. Includes the collapsed icon rail, item flyouts, and the profile menu. Reuses Segmented Switch, Button, Avatar, and Menu primitives.',
    type: 'Compound',
    states: ['Expanded', 'Collapsed', 'Flyout', 'Me control', 'Light', 'Dark'],
    related: ['button', 'menu', 'header'],
  },
  responseFooter: {
    title: 'Response Footer',
    desc: 'Post-response action bar with Copy, Like, Dislike, Try again, and More buttons, a vertical divider, and a References button showing overlapping circular source avatars next to a "References" label. Light and dark.',
    type: 'Compound',
    states: ['Rest', 'Hover', 'Pressed'],
    related: ['button', 'toolbar', 'citation'],
  },
  banner: {
    title: 'Banner',
    desc: 'Contextual banner surface with an optional leading image or icon, a title and body, up to two actions, and a dismiss. Composes the Button primitive; available in Light and Dark themes.',
    type: 'Compound',
    states: ['Default', 'With image', 'With icon', 'With secondary', 'No dismiss', 'Dark'],
    related: ['button', 'messageBar', 'dialog'],
  },
  panel: {
    title: 'Panel',
    desc: 'Right-docked secondary panel with a 56px header (title, info, dismiss) over a scrollable content area. Shown here with the References content — source references in file and web variants plus a Related results section — in Light and Dark.',
    type: 'Compound',
    states: ['References', 'File item', 'Web item', 'Related results', 'Dark'],
    related: ['citation', 'divider', 'menu'],
  },
  cotPanel: {
    title: 'CoT Panel',
    desc: 'Secondary panel showing Copilot\u2019s Chain-of-Thought reasoning: collapsed steps behind a chevron and an active step whose body has a vertical progress rail, narration paragraphs, and grounded Citation pills. Light and Dark.',
    type: 'Compound',
    states: ['Collapsed step', 'Active step', 'Citations', 'Dark'],
    related: ['panel', 'citation', 'latency'],
  },
  messageBar: {
    title: 'MessageBar',
    desc: 'Inline status notification at the page or section level. Four intents \u2014 Information (neutral), Warning, Error (danger), and Success \u2014 each with its own subtle surface, stroke, and Fluent status icon. Message stays neutral in every intent; up to two subtle action buttons plus a circular dismiss. Renders full usage guidance.',
    type: 'Compound',
    states: ['Information', 'Warning', 'Error', 'Success', 'Dismissed'],
    related: ['banner', 'button', 'dialog'],
  },
  composer: {
    title: 'Composer',
    desc: 'The primary chat input (Prompt Box). Grows from a single-line pill into a multi-line box, and carries attachments, a dismissible capability chip with an Options button, and a bottom tab strip with result cards. Reuses the Button (icon-only Medium + circular Send), Tag, and Tab/TabList primitives.',
    type: 'Compound',
    states: ['Initial', 'Multiple lines', 'Attachments', 'Capability off', 'Capability on'],
    related: ['button', 'tag', 'tab'],
  },
  promptLab: {
    title: 'Prompt Lab',
    desc: 'The prompt discovery modal, opened from the suggestion-prompt overflow. A large elevated dialog (radius 24, Shadow/Highest) with a left sidebar: a selected Suggested entry, Shared prompts, and collapsible Prompt topics / Agent prompts accordion sections (closed by default, one open at a time) whose topic/agent tabs each load their own prompts. A keyword search pins to the bottom; the content pane has a filter row and a scrollable prompt list. Reuses the Dialog surface, Menu rows, Button, and Divider.',
    type: 'Compound',
    states: ['Suggested', 'Accordion', 'Agent prompts', 'Hover'],
    related: ['dialog', 'menu', 'suggestionChips'],
  },
  promptLabV12: {
    title: 'Prompt Lab v1.2',
    desc: 'Source Discovery prompt modal (radius 24, Shadow/Highest). Left sidebar of nav rows (Suggested / Find prompts / Saved / Shared) plus collapsible Topics / Agent prompts / Source prompts accordions (closed by default, one open at a time) whose sub-rows each load their own prompts with "Suggested by {source}" attribution. Selected rows use a soft grey pill. Reuses the Dialog surface, Menu rows, and Divider.',
    type: 'Compound',
    states: ['Suggested', 'Accordion', 'Source prompts', 'Hover'],
    related: ['promptLab', 'dialog', 'menu'],
  },
  greeting: {
    title: 'Greeting & Zero State',
    desc: 'The first-impression welcome and empty chat surface. A warm serif Greeting (Content Expressive Small, 28/34) that recognizes the user by name, composed in the Zero state with the Composer prompt box and a row of prompt suggestion chips. Light and dark themes.',
    type: 'Compound',
    states: ['Greeting', 'Zero state', 'Light', 'Dark'],
    related: ['composer', 'suggestionChips', 'header'],
  },
  settingsModal: {
    title: 'Settings Modal',
    desc: 'One Copilot Settings dialog. A full-width header (Settings + dismiss) over a two-pane body: a text-only left nav rail and a right content pane. Shows the Sources section \u2014 a managed source list (chevron rows) plus a Browse sources block with an inline search and Connect rows.',
    type: 'Compound',
    states: ['Sources', 'Browse', 'Search', 'Connect'],
    related: ['dialog', 'menu', 'connectDialog'],
  },
  cardCowork: {
    title: 'Card - Cowork',
    desc: 'Plugin discovery card from the Cowork Customize page (Discover grid). A bordered white tile with a leading brand logo and a two-line summary; selecting it opens the plugin L2. Laid out in a two-column grid. Composes card surface + logo + text.',
    type: 'Compound',
    states: ['Rest', 'Hover'],
    related: ['listItemCowork', 'skillCardCowork', 'sourceCard'],
  },
  listItemCowork: {
    title: 'List Item - Cowork',
    desc: 'Installed-plugin row from the Cowork Customize page (Installed list). A soft-filled row with a brand logo, name + single-line description, a reference toggle (on/off), and a chevron that opens the plugin L2. Composes row + toggle + chevron.',
    type: 'Compound',
    states: ['On', 'Off', 'Hover'],
    related: ['cardCowork', 'skillCardCowork', 'toggle'],
  },
  skillCardCowork: {
    title: 'Skill Card - Cowork',
    desc: 'Skill / MCP row inside a Cowork plugin L2. A bordered white row with a leading glyph, name + description, and a trailing chevron that becomes an overflow (\u22ee) menu \u2014 Try in Copilot \u00b7 Share \u00b7 View details \u2014 once the plugin is connected. MCP rows have no trailing control.',
    type: 'Compound',
    states: ['Rest', 'Connected', 'Overflow'],
    related: ['cardCowork', 'listItemCowork', 'menuListItem'],
  },
  ciqMenu: {
    title: 'CIQ Menu',
    desc: 'Connector IQ content + skills palette, in two variants: (1) inline below the composer \u2014 opens by typing \u201c/\u201d; and (2) a centered \u201cAdd content\u201d modal with a title + Search \u2014 opens from the Add menu. Both share a pill Tablist (All \u00b7 Skills \u00b7 Files \u00b7 People \u00b7 Meetings \u00b7 Emails \u00b7 Chats \u00b7 Sites \u00b7 Other) over a scrolling list of MenuListItem rows: content items (icon + label + timestamp) or skill items (icon + \u201c/name\u201d title + description). Selecting a row attaches it to the composer as a pill. Composes Dialog + Tab/TabList + MenuListItem + Attachment Pill.',
    type: 'Compound',
    states: ['Inline', 'Modal', 'Skills', 'Attach'],
    related: ['menuListItem', 'tabList', 'attachmentPill'],
  },
  settingsV12: {
    title: 'Settings v1.2',
    desc: 'One Copilot Settings, v1.2 \u2014 a two-pane modal with a category sidebar and a content pane. The Sources pane shows a section header (title + Filter-by dropdown + Search), a description with a divider, then source rows (logo + title + secondary + chevron or Connect). Separate from the v1 Settings Modal. Composes Dialog + MenuListItem + Dropdown + Input + Divider.',
    type: 'Compound',
    states: ['Sources', 'Filter', 'Search', 'Connect'],
    related: ['settingsModal', 'sourcesMenu', 'dialog'],
  },
  sourceDetail: {
    title: 'Source Detail v1.2',
    desc: 'Connector detail (L2) reached from the Settings Sources list. Identity (logo + name) with Disconnect and an overflow (\u22ef \u2192 Reconnect), a single divider, an About description, a read-only Tools list rendered as subtle Tag chips (what the connector exposes, no per-tool controls), and Details (connected on, account, category, developer, more info). One Copilot styling; composes Dialog + Button + Tag + Menu + Divider + Link.',
    type: 'Compound',
    states: ['Connected', 'Overflow', 'Tools'],
    related: ['settingsV12', 'sourcesMenu', 'tag'],
  },
  connectDialog: {
    title: 'Connect Dialog',
    desc: 'Connector authorization dialog with a hero band, floating logo row, title, body, and primary/secondary buttons.',
    type: 'Compound',
    states: ['Default', 'Authorizing', 'Error'],
    related: ['dialog', 'banner', 'button'],
  },
  authDialog: {
    title: 'Auth Dialog',
    desc: 'Third-party connection consent modal (\u201CConnect Figma\u201D). Elevated surface (radius 24, Shadow/Highest, 28px inset) with a Title Small header + partner subtitle, a centered Copilot\u00b7dots\u00b7partner logo handshake, and a right-aligned Cancel + primary footer. Two variants: the default Body Medium consent sentence, and a Continuous-sync (user-level sync connector) variant with Continuous sync / You\u2019re in control / Add your organisation\u2019s workspace sections plus a workspace URL input.',
    type: 'Compound',
    states: ['Default', 'Continuous sync', 'Rest', 'Hover'],
    related: ['dialog', 'connectDialog', 'button'],
  },
  authDialogSkills: {
    title: 'Auth Dialog w/ Skills',
    desc: 'FCC-AdminX connect-consent modal, skills generation (640px, radius 24, 40/32 padding). Partner logo + name + close, a description, a Skills row of \u201C/skill\u201D pills capped to 2 rows with a \u201C+N\u201D overflow pill, a 3-column meta row (Developed by \u00b7 Category \u00b7 More info), and a \u201CContinue to {Partner}\u201D button. User-sync sources add a Continuous-sync note and an Organisation\u2019s Workspace URL input, and relabel the meta column \u201CLinks\u201D. Skills match the source\u2019s Settings L2 list one-to-one.',
    type: 'Compound',
    states: ['FCC / MCP', 'User sync', 'Rest', 'Hover'],
    related: ['authDialog', 'connectDialog', 'tag'],
  },
  menu: {
    title: 'Menu',
    desc: 'Dropdown menu with list items, section headers, secondary content, split items, checkmarks, and chevrons.',
    type: 'Compound',
    states: ['Rest', 'Hover', 'Selected', 'Disabled'],
    related: ['menuListItem', 'dropdown', 'nav'],
  },
};

// ─── Shared CSS ─────────────────────────────────────────────

const sharedCSS = `
/* ─── Bebop page overrides (injected by _inject.ts) ─── */
body { background: #fff !important; padding: 0 !important; margin: 0 !important; font-family: 'Segoe UI', 'Segoe Sans', system-ui, -apple-system, sans-serif !important; color: #242424; min-height: 100vh; display: block !important; align-items: initial !important; flex-direction: initial !important; }

/* Page wrapper */
.bp-header { max-width: 920px; margin: 0 auto; padding: 60px 48px 0; }
.bp-header__top { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.bp-header__title { font-family: Aptos, 'Segoe UI', sans-serif; font-size: 36px; font-weight: 300; color: #242424; line-height: 1.2; }
.bp-header__tag { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 8px; border-radius: 8px; }
.bp-header__tag--compound { background: #ebebeb; color: #242424; }
.bp-header__tag--primitive { background: #f5f5f5; color: #6f6f6f; }
.bp-header__desc { font-size: 15px; color: #6f6f6f; line-height: 1.6; max-width: 600px; margin-bottom: 20px; }
.bp-header__states { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 40px; }
.bp-header__state { font-size: 12px; color: #6f6f6f; background: #f5f5f5; padding: 3px 10px; border-radius: 8px; }

/* Content area — override all wrapper variants */
.wrap, .page, .section { max-width: 920px !important; margin-left: auto !important; margin-right: auto !important; padding-left: 48px !important; padding-right: 48px !important; }

/* Headings */
h1 { display: none !important; }
.hint, p.hint { display: none !important; }
h2 { font-family: 'Segoe UI', sans-serif !important; font-size: 16px !important; font-weight: 600 !important; color: #242424 !important; margin: 40px 0 16px !important; padding-bottom: 10px !important; border-bottom: 1px solid #f0f0f0 !important; }
h3 { font-family: 'Segoe UI', sans-serif !important; font-size: 13px !important; font-weight: 600 !important; color: #929292 !important; margin: 20px 0 12px !important; border: none !important; padding: 0 !important; text-transform: none !important; letter-spacing: 0 !important; }

/* ═══════════════════════════════════════════════════════════════════════
   Unified primitive scaffold (bp-*)
   One anatomy for every primitive page: Stage → Variants → States → Specs →
   Guidance. Generators emit semantic bp-* markup; this stylesheet gives them
   a consistent One Copilot surface (Segoe Sans + opsz, radius 16 cards,
   Shadow/Low). Legacy classes (.section/.matrix/.grid/.row/.rl) are also
   normalized below so pages not yet converted still match the system.
   ═════════════════════════════════════════════════════════════════════ */

/* Section shell — every showcase block is a centered, titled region */
.bp-section { max-width: 920px; margin: 0 auto 44px; padding: 0 48px; }
.bp-section__head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 16px; }
.bp-section__title { font-family: 'Segoe Sans', 'Segoe UI', system-ui, sans-serif; font-size: 16px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; color: #242424; line-height: 22px; }
.bp-section__hint { font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-size: 13px; color: #929292; line-height: 20px; }
.bp-card { background: #fff; border: 1px solid #ebebeb; border-radius: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }

/* Sub-label — the small uppercase caption used inside cards */
.bp-lbl { font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #929292; }

/* ── 1. Stage — the interactive area ── */
.bp-stage { max-width: 920px; margin: 0 auto 16px; padding: 0 48px; }
.bp-stage__canvas { position: relative; min-height: 220px; display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; padding: 48px; border: 1px solid #ebebeb; border-radius: 16px; background-color: #fafafa; background-image: radial-gradient(#e4e4e4 1px, transparent 1px); background-size: 16px 16px; background-position: -8px -8px; }
.bp-stage__canvas--dark { background-color: #1f1f1f; background-image: radial-gradient(#3a3a3a 1px, transparent 1px); }
/* Controls rail — drives the stage */
.bp-controls { display: flex; flex-wrap: wrap; gap: 8px 24px; align-items: center; margin-top: 12px; padding: 14px 18px; background: #fff; border: 1px solid #ebebeb; border-radius: 12px; }
.bp-control { display: inline-flex; align-items: center; gap: 10px; }
.bp-control > .bp-lbl { flex-shrink: 0; }
/* Segmented control built from our own switcher styling */
.bp-seg { display: inline-flex; gap: 2px; padding: 3px; background: #f5f5f5; border-radius: 10px; }
.bp-seg button { height: 26px; padding: 0 12px; border: none; background: transparent; border-radius: 7px; font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-size: 12px; font-weight: 400; color: #5d5d5d; cursor: pointer; transition: background 0.1s, color 0.1s; white-space: nowrap; }
.bp-seg button:hover { color: #242424; }
.bp-seg button.is-active { background: #fff; color: #242424; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }

/* ── 2. Variants — card grid, one tile per configuration ── */
.bp-variants { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
.bp-tile { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; min-height: 100px; padding: 24px 20px; background: #fff; border: 1px solid #ebebeb; border-radius: 12px; text-align: center; }
.bp-tile__label { font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #929292; }

/* ── 3. States — matrix that scrolls INSIDE its own card ── */
.bp-matrix-wrap { max-width: 920px; margin: 0 auto; overflow-x: auto; background: #fff; border: 1px solid #ebebeb; border-radius: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
.bp-matrix { border-collapse: separate; border-spacing: 0; width: max-content; min-width: 100%; font-family: 'Segoe Sans', 'Segoe UI', sans-serif; }
.bp-matrix th, .bp-matrix td { padding: 18px 22px; text-align: left; vertical-align: middle; }
.bp-matrix thead th { position: sticky; top: 0; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: #929292; background: #fff; border-bottom: 1px solid #f0f0f0; white-space: nowrap; }
.bp-matrix thead th:first-child { position: sticky; left: 0; z-index: 3; }
.bp-matrix tbody th { position: sticky; left: 0; z-index: 1; font-size: 11px; font-weight: 600; color: #5d5d5d; background: #fff; white-space: nowrap; box-shadow: 1px 0 0 #f0f0f0; }
.bp-matrix tbody td { border-bottom: 1px solid #f7f7f7; }
.bp-matrix tbody tr:last-child td, .bp-matrix tbody tr:last-child th { border-bottom: none; }

/* ── 4. Specs — token readout ── */
.bp-specs { max-width: 920px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 1px; background: #f0f0f0; border: 1px solid #ebebeb; border-radius: 16px; overflow: hidden; }
.bp-spec { background: #fff; padding: 16px 20px; }
.bp-spec__k { font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #929292; margin-bottom: 5px; }
.bp-spec__v { font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-size: 14px; color: #242424; font-variant-numeric: tabular-nums; }

/* ── 5. Guidance — preserve existing Do/Don't usage content, house in cards ── */
.bp-guidance { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; }
.bp-guide { background: #fff; border: 1px solid #ebebeb; border-radius: 12px; padding: 20px; }
.bp-guide__head { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-size: 13px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; }
.bp-guide--do .bp-guide__head { color: #0f7b3f; }
.bp-guide--dont .bp-guide__head { color: #b10e1c; }
.bp-guide__dot { width: 8px; height: 8px; border-radius: 50%; }
.bp-guide--do .bp-guide__dot { background: #0f7b3f; }
.bp-guide--dont .bp-guide__dot { background: #b10e1c; }
.bp-guide ul { margin: 0; padding-left: 18px; }
.bp-guide li { font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-size: 13px; line-height: 1.6; color: #5d5d5d; margin-bottom: 6px; }

/* Usage guidance — long-form, One Copilot surface (Segoe Sans, radius 16 card) */
.bp-usage { max-width: 920px; margin: 0 auto; padding: 0 48px; }
.bp-usage__card { background: #fff; border: 1px solid #ebebeb; border-radius: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); padding: 32px 36px; display: flex; flex-direction: column; gap: 28px; }
.bp-usage__sec { display: flex; flex-direction: column; gap: 8px; }
.bp-usage__sec h4 { font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-size: 15px; font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; color: #242424; margin: 0; line-height: 20px; }
.bp-usage__sec p { font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-size: 14px; line-height: 20px; color: #5d5d5d; margin: 0 0 8px; }
.bp-usage__sec p:last-child { margin-bottom: 0; }
.bp-usage__sec strong { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; color: #242424; }
.bp-usage__sec ul { margin: 4px 0 0; padding-left: 18px; }
.bp-usage__sec li { font-family: 'Segoe Sans', 'Segoe UI', sans-serif; font-size: 14px; line-height: 20px; color: #5d5d5d; margin-bottom: 6px; }
.bp-usage__sec li strong, .bp-usage__sec li b { font-weight: 625; font-variation-settings: 'opsz' 8, 'wght' 625; color: #242424; }

/* ═══ Legacy guidance normalization → One Copilot styling (every page) ═══
   Bespoke guidance blocks (.when / .usage__col / .usage__sec / .a11y and the
   long-form .usage doc) are re-skinned here so guidance reads identically
   across all primitive AND compound pages: Segoe Sans + opsz, #5d5d5d body,
   #ebebeb radius-12 cards, one type scale. Only type + card chrome is set —
   never display — so each block keeps its own layout (Do/Don't grid, doc
   card, section stack). */
.when { max-width: 920px; margin-left: auto !important; margin-right: auto !important; border-color: #ebebeb !important; border-radius: 16px !important; padding: 18px 22px !important; box-shadow: 0 1px 2px rgba(0,0,0,0.04); font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; font-size: 14px !important; line-height: 20px !important; color: #5d5d5d !important; }
.when strong { font-weight: 625 !important; font-variation-settings: 'opsz' 8, 'wght' 625 !important; color: #242424 !important; }

.usage__col { border-color: #ebebeb !important; border-radius: 12px !important; padding: 20px !important; }
.usage__col h3 { font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; font-size: 13px !important; font-weight: 625 !important; font-variation-settings: 'opsz' 8, 'wght' 625 !important; letter-spacing: 0 !important; margin-bottom: 12px !important; }
.usage__col li { font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; font-size: 13px !important; line-height: 1.6 !important; color: #5d5d5d !important; }
.usage__col li::before { top: 8px !important; }

.usage__sec { border-color: #ebebeb !important; border-radius: 12px !important; padding: 20px 24px !important; }
.usage__sec h3 { font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; font-size: 15px !important; font-weight: 625 !important; font-variation-settings: 'opsz' 8, 'wght' 625 !important; letter-spacing: 0 !important; margin-bottom: 10px !important; }
.usage__sec p, .usage__sec li, .usage__sec p.lead { font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; color: #5d5d5d !important; font-size: 14px !important; line-height: 20px !important; }
.usage__sub { font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; font-weight: 625 !important; font-variation-settings: 'opsz' 8, 'wght' 625 !important; color: #242424 !important; }

.usage h3 { font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; font-size: 15px !important; font-weight: 625 !important; font-variation-settings: 'opsz' 8, 'wght' 625 !important; color: #242424 !important; }
.usage h4 { font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; font-weight: 625 !important; font-variation-settings: 'opsz' 8, 'wght' 625 !important; color: #242424 !important; }
.usage p, .usage li { font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; color: #5d5d5d !important; line-height: 20px !important; }

.a11y { border-color: #ebebeb !important; border-radius: 12px !important; padding: 20px 24px !important; }
.a11y h3 { font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; font-size: 15px !important; font-weight: 625 !important; font-variation-settings: 'opsz' 8, 'wght' 625 !important; }
.a11y li { font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; color: #5d5d5d !important; }
.bp-usage__sec code { font-family: 'Cascadia Code', ui-monospace, monospace; font-size: 12.5px; background: #f5f5f5; padding: 1px 5px; border-radius: 4px; }

/* ── Legacy normalization — make un-converted pages match the system ── */
/* Wrap bespoke .matrix cards in the unified surface + let them scroll */
.matrix { background: #fff !important; border: 1px solid #ebebeb !important; border-radius: 16px !important; box-shadow: 0 1px 2px rgba(0,0,0,0.04); max-width: 100%; overflow-x: auto; }
.section-title { font-family: 'Segoe Sans', 'Segoe UI', sans-serif !important; font-size: 16px !important; font-weight: 625 !important; font-variation-settings: 'opsz' 8, 'wght' 625 !important; color: #242424 !important; border-bottom: 1px solid #f0f0f0 !important; padding-bottom: 10px !important; }

/* Rows and cells */
.row { gap: 24px !important; margin-bottom: 20px !important; }
.cell { gap: 8px !important; }
.rl { font-size: 11px !important; font-weight: 600 !important; color: #929292 !important; text-transform: uppercase !important; letter-spacing: 0.5px !important; }

/* ─── Related components ─── */
.bp-related { max-width: 920px; margin: 0 auto; padding: 80px 48px; margin-top: 60px; border-top: 1px solid #f0f0f0; }
.bp-related__title { font-size: 16px; font-weight: 600; color: #242424; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0; }
.bp-related__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 12px; }
.bp-related__card { background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; padding: 24px; text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: 8px; transition: background 0.1s, border-color 0.15s, box-shadow 0.15s; }
.bp-related__card:hover { background: #fcfcfc; border-color: #dedede; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.bp-related__card-top { display: flex; align-items: center; gap: 8px; }
.bp-related__card-name { font-size: 14px; font-weight: 600; line-height: 1.3; flex: 1; }
.bp-related__card-arrow { width: 16px; height: 16px; color: #929292; transition: color 0.1s, transform 0.15s; flex-shrink: 0; }
.bp-related__card:hover .bp-related__card-arrow { color: #242424; transform: translateX(2px); }
.bp-related__card-desc { font-size: 13px; color: #6f6f6f; line-height: 1.5; }
.bp-related__card-tag { display: inline-block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 8px; border-radius: 8px; width: fit-content; }

/* ─── Back bar (sticky, frosted) ─── */
.copilot-backbar { position: sticky; top: 0; left: 0; right: 0; z-index: 9999; height: 48px; display: flex; align-items: center; padding: 0 16px; background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #dedede; }
.copilot-backbar a { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 6px 12px; border-radius: 12px; text-decoration: none; color: #242424; font-family: 'Segoe UI', sans-serif; font-size: 14px; transition: background 0.1s; }
.copilot-backbar a:hover { background: rgba(36,36,36,0.04); }
.copilot-backbar a svg { width: 16px; height: 16px; }

/* ─── Scrollbar ─── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #6f6f6f; border-radius: 9999px; background-clip: content-box; border: 2px solid transparent; }
::-webkit-scrollbar-thumb:hover { border: 0; }
* { scrollbar-width: thin; scrollbar-color: #6f6f6f transparent; }
`;

const chevronSvg = '<svg class="bp-related__card-arrow" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const backBarHTML = '<!-- INJECT:BACKBAR --><div class="copilot-backbar"><a href="../tokens.html"><svg viewBox="0 0 16 16" fill="none"><path d="M10 13l-5-5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Back to catalog</a></div><!-- /INJECT:BACKBAR -->';

function buildHeader(m: ComponentMeta): string {
  const tagClass = m.type === 'Compound' ? 'bp-header__tag--compound' : 'bp-header__tag--primitive';
  const states = m.states.map(s => '<span class="bp-header__state">' + s + '</span>').join('');
  return '<!-- INJECT:HEADER --><div class="bp-header">'
    + '<div class="bp-header__top">'
    + '<span class="bp-header__title">' + m.title + '</span>'
    + '<span class="bp-header__tag ' + tagClass + '">' + m.type + '</span>'
    + '</div>'
    + '<p class="bp-header__desc">' + m.desc + '</p>'
    + '<div class="bp-header__states">' + states + '</div>'
    + '</div><!-- /INJECT:HEADER -->';
}

function buildRelated(relatedKeys: string[]): string {
  let cards = '';
  for (const key of relatedKeys) {
    const r = meta[key];
    if (!r) continue;
    const tagClass = r.type === 'Compound' ? 'bp-header__tag--compound' : 'bp-header__tag--primitive';
    cards += '<a class="bp-related__card" href="' + key + '.html">'
      + '<div class="bp-related__card-top"><span class="bp-related__card-name">' + r.title + '</span>' + chevronSvg + '</div>'
      + '<span class="bp-related__card-desc">' + r.desc.substring(0, 80) + (r.desc.length > 80 ? '...' : '') + '</span>'
      + '<span class="bp-related__card-tag ' + tagClass + '">' + r.type + '</span>'
      + '</a>';
  }
  return '<!-- INJECT:RELATED --><div class="bp-related"><div class="bp-related__title">Related Components</div><div class="bp-related__grid">' + cards + '</div></div><!-- /INJECT:RELATED -->';
}

// ─── Process files ──────────────────────────────────────────

const distDir = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'dist');
const files = fs.readdirSync(distDir).filter(f => f.endsWith('.html'));

let count = 0;
for (const file of files) {
  const filePath = path.join(distDir, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  const componentName = file.replace('.html', '');

  // Shell + store experiments: only inject hover back bar, no layout overrides
  if (file === 'shell.html' || file.startsWith('store')) {
    const shellBarCSS = '\n/* INJECT:SHELLBAR:CSS */\n.copilot-shell-hover { position: fixed; top: 0; left: 0; right: 0; height: 20px; z-index: 9998; }\n.copilot-shell-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 9999; height: 48px; display: flex; align-items: center; padding: 0 16px; background: rgba(255,255,255,0.9); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #dedede; transform: translateY(-100%); transition: transform 0.2s ease; }\n.copilot-shell-hover:hover ~ .copilot-shell-bar, .copilot-shell-bar:hover { transform: translateY(0); }\n.copilot-shell-bar a { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 6px 12px; border-radius: 12px; text-decoration: none; color: #242424; font-family: \'Segoe UI\', sans-serif; font-size: 14px; transition: background 0.1s; }\n.copilot-shell-bar a:hover { background: rgba(36,36,36,0.04); }\n.copilot-shell-bar a svg { width: 16px; height: 16px; }\n/* /INJECT:SHELLBAR:CSS */\n';
    const shellBarHTML = '<!-- INJECT:SHELLBAR --><div class="copilot-shell-hover"></div><div class="copilot-shell-bar"><a href="../tokens.html"><svg viewBox="0 0 16 16" fill="none"><path d="M10 13l-5-5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Back to catalog</a></div><!-- /INJECT:SHELLBAR -->';

    html = html.replace(/\/\* INJECT:SHELLBAR:CSS \*\/[\s\S]*?\/\* \/INJECT:SHELLBAR:CSS \*\//g, '');
    html = html.replace(/\n?\/\* Shell back bar \*\/[\s\S]*?\.copilot-shell-bar a svg \{[^}]*\}\n/g, '');
    html = html.replace(/<!-- INJECT:SHELLBAR -->[\s\S]*?<!-- \/INJECT:SHELLBAR -->/g, '');
    html = html.replace(/<div class="copilot-shell-hover"><\/div><div class="copilot-shell-bar"><a href="\.\.\/tokens\.html">[\s\S]*?<\/a><\/div>/g, '');
    if (html.includes('</style>')) {
      html = html.replace('</style>', shellBarCSS + '</style>');
    }
    const sBodyIdx = html.indexOf('<body>');
    if (sBodyIdx >= 0) {
      html = html.substring(0, sBodyIdx + 6) + shellBarHTML + html.substring(sBodyIdx + 6);
    }
    fs.writeFileSync(filePath, html, 'utf-8');
    count++;
    console.log('  Injected (shell): ' + file);
    continue;
  }

  const m = meta[componentName];
  if (!m) { console.log('  Skipped (no meta): ' + file); continue; }

  // Strip any previous injection using comment sentinels
  html = html.replace(/<!-- INJECT:BACKBAR -->[\s\S]*?<!-- \/INJECT:BACKBAR -->/g, '');
  html = html.replace(/<!-- INJECT:HEADER -->[\s\S]*?<!-- \/INJECT:HEADER -->/g, '');
  html = html.replace(/<!-- INJECT:RELATED -->[\s\S]*?<!-- \/INJECT:RELATED -->/g, '');
  // Legacy strip (for files injected before sentinels were added)
  html = html.replace(/<div class="copilot-hover-zone">.*?<\/div>/g, '');
  html = html.replace(/<div class="copilot-backbar">[\s\S]*?<\/a><\/div>/g, '');

  // Inject CSS
  if (!html.includes('Bebop page overrides')) {
    if (html.includes('</style>')) {
      html = html.replace('</style>', sharedCSS + '\n</style>');
    } else if (html.includes('</head>')) {
      html = html.replace('</head>', '<style>' + sharedCSS + '</style></head>');
    }
  }

  // Inject back bar + header after <body>
  const bodyIdx = html.indexOf('<body>');
  if (bodyIdx >= 0) {
    const afterBody = bodyIdx + 6;
    html = html.substring(0, afterBody) + backBarHTML + buildHeader(m) + html.substring(afterBody);
  }

  // Inject related components before </body>
  const bodyEndIdx = html.indexOf('</body>');
  if (bodyEndIdx >= 0) {
    html = html.substring(0, bodyEndIdx) + buildRelated(m.related) + html.substring(bodyEndIdx);
  }

  fs.writeFileSync(filePath, html, 'utf-8');
  count++;
  console.log('  Injected: ' + file);
}

console.log('Done: ' + count + ' files processed');

// ─── Component catalog (tokens.html) ────────────────────────
// Regenerates the Primitives + Compounds grids in tokens.html from `meta`,
// with type + variant tags, filter chips, and a per-card Bebop/One Copilot
// toggle. A component's variant is derived from which preview files exist:
//   dist/<key>.html only        → One Copilot
//   dist/<key>-bebop.html only  → Bebop
//   both files                  → Both (renders the toggle)

// Legacy components superseded by a One Copilot replacement. These are moved
// off the main Tokens catalog and onto the Archive tab (archive.html). Do not
// reuse these in new work unless explicitly asked.
const archivedKeys = new Set<string>(['dialog', 'promptLab', 'settingsModal']);

function buildCatalog(): void {
  const pgPath = path.join(distDir, '..', 'tokens.html');
  if (!fs.existsSync(pgPath)) { console.log('Catalog: tokens.html not found'); return; }
  let pg = fs.readFileSync(pgPath, 'utf-8');

  const keys = Object.keys(meta);
  // One Copilot migration cutoff: any preview generator modified on/after this
  // date is a One Copilot build; anything older is a legacy Bebop component.
  // (Fixed date, not "today", so classifications stay stable across days.)
  const migrationCutoff = new Date(2026, 6, 1).getTime(); // 2026-07-01 local
  function variantOf(k: string): 'onecopilot' | 'bebop' | 'both' {
    const hasOC = fs.existsSync(path.join(distDir, k + '.html'));
    const hasBebop = fs.existsSync(path.join(distDir, k + '-bebop.html'));
    if (hasOC && hasBebop) return 'both';
    if (hasBebop) return 'bebop';
    // Otherwise classify by the preview generator's modified date:
    // built/updated on/after the migration cutoff → One Copilot; older → Bebop.
    try {
      const gen = fs.statSync(path.join(distDir, '..', 'src', k + '.ts')).mtime;
      return gen.getTime() >= migrationCutoff ? 'onecopilot' : 'bebop';
    } catch (e) {
      return 'bebop';
    }
  }
  function short(d: string): string { return d.length > 118 ? d.slice(0, 116).trim() + '\u2026' : d; }
  function vLabel(v: string): string { return v === 'both' ? 'Both' : v === 'bebop' ? 'Bebop' : 'One Copilot'; }
  const arrow = '<svg class="card__arrow" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function card(k: string): string {
    const m = meta[k];
    const v = variantOf(k);
    let toggle = '';
    if (v === 'both') {
      toggle = '<div class="catv">'
        + '<button class="catv__opt catv__opt--on" type="button" data-href="dist/' + k + '.html">One Copilot</button>'
        + '<button class="catv__opt" type="button" data-href="dist/' + k + '-bebop.html">Bebop</button>'
        + '</div>';
    }
    return '<a class="card catcard" data-variant="' + v + '" href="dist/' + k + '.html">'
      + '<div class="card__top"><span class="card__name">' + m.title + '</span>' + arrow + '</div>'
      + '<span class="card__desc">' + short(m.desc) + '</span>'
      + '<div class="catcard__tags"><span class="cattag catvtag catvtag--' + v + '">' + vLabel(v) + '</span></div>'
      + toggle
      + '</a>';
  }

  const prims = keys.filter(k => meta[k].type === 'Primitive' && !archivedKeys.has(k)).sort((a, b) => meta[a].title.localeCompare(meta[b].title));
  const comps = keys.filter(k => meta[k].type === 'Compound' && !archivedKeys.has(k)).sort((a, b) => meta[a].title.localeCompare(meta[b].title));
  const ocCount = keys.filter(k => !archivedKeys.has(k) && variantOf(k) === 'onecopilot').length;
  const bothCount = keys.filter(k => !archivedKeys.has(k) && variantOf(k) === 'both').length;
  const legacyCount = keys.filter(k => !archivedKeys.has(k) && variantOf(k) === 'bebop').length;

  const primSection = '<div class="section" data-group id="primitives"><div class="section-head"><span class="section-title">Primitives</span><span class="section-count">' + prims.length + '</span></div><div class="grid">' + prims.map(card).join('') + '</div></div>';
  const compSection = '<div class="section" data-group id="compound"><div class="section-head"><span class="section-title">Compound Components</span><span class="section-count">' + comps.length + '</span></div><div class="grid">' + comps.map(card).join('') + '</div></div>';
  const inner = '<!-- CATALOG:START -->' + primSection + compSection
    + '<!-- CATALOG:END -->';

  const catCSS = `/* CATALOG:CSS */
.catcard__tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 2px; }
.cattag { display: inline-flex; align-items: center; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; padding: 2px 8px; border-radius: 8px; line-height: 1.4; }
.cattag--type-primitive { background: #f5f5f5; color: #6f6f6f; }
.cattag--type-compound { background: #ebebeb; color: #242424; }
.catvtag--onecopilot { background: #e8eefc; color: #2b5cb8; }
.catvtag--both { background: #e9f7ec; color: #1a7f37; }
.catvtag--bebop { background: #fdeede; color: #9a6212; }
.catv { display: inline-flex; margin-top: 10px; border: 1px solid #dedede; border-radius: 9999px; overflow: hidden; background: #fff; width: fit-content; }
.catv__opt { border: none; background: transparent; font-family: inherit; font-size: 12px; padding: 4px 12px; color: #6f6f6f; cursor: pointer; }
.catv__opt--on { background: #242424; color: #fff; }
/* CATALOG:CSS-END */`;

  const catJS = `<!-- CATALOG:JS --><script>
(function(){
  document.querySelectorAll('.catv__opt').forEach(function(opt){
    opt.addEventListener('click', function(e){
      e.preventDefault(); e.stopPropagation();
      var card = opt.closest('.catcard');
      opt.parentNode.querySelectorAll('.catv__opt').forEach(function(x){ x.classList.remove('catv__opt--on'); });
      opt.classList.add('catv__opt--on');
      if (card) card.setAttribute('href', opt.getAttribute('data-href'));
    });
  });
})();
</script><!-- /CATALOG:JS -->`;

  // Idempotent: strip prior CSS/JS blocks
  pg = pg.replace(/\/\* CATALOG:CSS \*\/[\s\S]*?\/\* CATALOG:CSS-END \*\//g, '');
  pg = pg.replace(/<!-- CATALOG:JS -->[\s\S]*?<!-- \/CATALOG:JS -->/g, '');

  // Replace the entire <div class="main"> inner content with the generated grid
  pg = pg.replace(/<div class="main">[\s\S]*<\/div>\s*<div class="footer">/, function () {
    return '<div class="main">\n' + inner + '\n</div>\n\n<div class="footer">';
  });
  // Inject CSS before </style>, JS before </body>
  if (pg.includes('</style>')) pg = pg.replace('</style>', catCSS + '\n</style>');
  if (pg.includes('</body>')) pg = pg.replace('</body>', catJS + '\n</body>');

  fs.writeFileSync(pgPath, pg, 'utf-8');
  console.log('Catalog: injected ' + keys.length + ' components into tokens.html (' + ocCount + ' One Copilot, ' + bothCount + ' Both, ' + legacyCount + ' Bebop)');
}

buildCatalog();

// ─── Archive catalog (archive.html) ─────────────────────────
// Renders the archived (legacy) components into the Archive tab, between the
// <!-- ARCHIVE-CATALOG:START/END --> markers. Source of truth is `archivedKeys`.

function buildArchiveCatalog(): void {
  const apPath = path.join(distDir, '..', 'archive.html');
  if (!fs.existsSync(apPath)) { console.log('Archive catalog: archive.html not found'); return; }
  if (!/<!-- ARCHIVE-CATALOG:START -->[\s\S]*?<!-- ARCHIVE-CATALOG:END -->/.test(fs.readFileSync(apPath, 'utf-8'))) {
    console.log('Archive catalog: markers not found in archive.html'); return;
  }
  let ap = fs.readFileSync(apPath, 'utf-8');
  const arrow = '<svg class="card__arrow" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const shortDesc = (d: string): string => d.length > 118 ? d.slice(0, 116).trim() + '\u2026' : d;
  const akeys = [...archivedKeys].filter(k => meta[k]).sort((a, b) => meta[a].title.localeCompare(meta[b].title));
  const archiveCard = (k: string): string => {
    const m = meta[k];
    return '<a class="card catcard" href="dist/' + k + '.html">'
      + '<div class="card__top"><span class="card__name">' + m.title + '</span>' + arrow + '</div>'
      + '<span class="card__desc">' + shortDesc(m.desc) + '</span>'
      + '<div class="catcard__tags"><span class="cattag catvtag catvtag--bebop">Archived</span></div>'
      + '</a>';
  };
  const inner = '<!-- ARCHIVE-CATALOG:START -->' + akeys.map(archiveCard).join('') + '<!-- ARCHIVE-CATALOG:END -->';
  ap = ap.replace(/<!-- ARCHIVE-CATALOG:START -->[\s\S]*?<!-- ARCHIVE-CATALOG:END -->/, inner);
  ap = ap.replace(/(<span class="section-title">Components<\/span><span class="section-count">)\d+(<\/span>)/, '$1' + akeys.length + '$2');
  fs.writeFileSync(apPath, ap, 'utf-8');
  console.log('Archive catalog: injected ' + akeys.length + ' archived components into archive.html');
}

buildArchiveCatalog();

// ─── Experiment registry (prototypes.html) ──────────────────

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function experimentHref(experiment: ExperimentDefinition, query = ''): string {
  return experiment.output.replace(/^preview\//, '') + query;
}

function buildExperimentCard(experiment: ExperimentDefinition): string {
  const statusLabel = experiment.status.replace('-', ' ');
  const kind = experiment.kind === 'surface' ? 'prototype' : experiment.kind;
  const kindLabel = kind.charAt(0).toUpperCase() + kind.slice(1);
  const updated = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(experiment.updated + 'T00:00:00Z'));
  const tags = experiment.tags
    .map(tag => '<span class="registry-card__tag">' + escapeHtml(tag) + '</span>')
    .join('');

  const searchText = [
    experiment.title,
    experiment.description,
    experiment.owner,
    kind,
    experiment.status,
    ...experiment.tags,
    ...experiment.routes.map(route => route.title),
  ].join(' ').toLowerCase();

  return '<article class="card card--featured" style="cursor:default" data-workspace-item data-kind="' + kind + '" data-status="' + experiment.status + '" data-search="' + escapeHtml(searchText) + '">'
    + '<div class="card__info">'
    + '<div class="tp-head"><span class="card__name">' + escapeHtml(experiment.title) + '</span>'
    + '<span class="registry-card__status registry-card__status--' + experiment.status + '"><span></span>' + escapeHtml(statusLabel) + '</span></div>'
    + '<span class="card__desc">' + escapeHtml(experiment.description) + '</span>'
    + (tags ? '<div class="registry-card__tags">' + tags + '</div>' : '')
    + '<div class="tp-meta"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.5" stroke="#929292" stroke-width="1.2"/><path d="M3.5 13c0-2.2 2-3.5 4.5-3.5s4.5 1.3 4.5 3.5" stroke="#929292" stroke-width="1.2" stroke-linecap="round"/></svg><span>' + escapeHtml(experiment.owner) + ' · ' + escapeHtml(updated) + '</span></div>'
    + '<div class="tp-cta"><a class="card__cta" href="' + experimentHref(experiment) + '">Open ' + escapeHtml(kindLabel) + ' <svg viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div>'
    + '</div></article>';
}

function buildFolderBlock(name: string, members: ExperimentDefinition[]): string {
  const preview = members.map(m => m.title).join(' · ');
  return '<div class="folder" data-folder>'
    + '<div class="folder__head">'
    + '<svg class="folder__icon" viewBox="0 0 20 20" fill="none"><path d="M2.75 6A1.75 1.75 0 0 1 4.5 4.25h2.63c.46 0 .9.18 1.23.51l.88.88c.14.14.32.22.52.22H15.5A1.75 1.75 0 0 1 17.25 7.6v6.65A1.75 1.75 0 0 1 15.5 16H4.5a1.75 1.75 0 0 1-1.75-1.75V6Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>'
    + '<div class="folder__meta"><div class="folder__titlerow"><span class="folder__title">' + escapeHtml(name) + '</span>'
    + '<span class="folder__count">' + members.length + ' experiments</span></div>'
    + '<span class="folder__preview">' + escapeHtml(preview) + '</span></div>'
    + '<svg class="folder__chevron" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + '</div>'
    + '<div class="folder__body">' + members.map(buildExperimentCard).join('') + '</div>'
    + '</div>';
}

function buildTrackedGrid(tracked: ExperimentDefinition[]): string {
  // Group into folders + flat cards, then order newest-edited first.
  const folderOrder: string[] = [];
  const folderMembers = new Map<string, ExperimentDefinition[]>();
  const flat: ExperimentDefinition[] = [];
  tracked.forEach(exp => {
    if (exp.folder) {
      if (!folderMembers.has(exp.folder)) { folderMembers.set(exp.folder, []); folderOrder.push(exp.folder); }
      folderMembers.get(exp.folder)!.push(exp);
    } else {
      flat.push(exp);
    }
  });
  const items: { date: string; html: string }[] = [];
  folderOrder.forEach(name => {
    const members = folderMembers.get(name)!;
    const date = members.reduce((max, m) => (m.updated > max ? m.updated : max), '');
    items.push({ date, html: buildFolderBlock(name, members) });
  });
  // Non-folder tracked experiments (e.g. Copilot Shell) render separately as a full-width card, not in this grid.
  void flat;
  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return items.map(item => item.html).join('');
}

function buildExperimentRegistry(): void {
  const prototypesPath = path.join(distDir, '..', 'prototypes.html');
  if (!fs.existsSync(prototypesPath)) { console.log('Registry: prototypes.html not found'); return; }
  let html = fs.readFileSync(prototypesPath, 'utf-8');
  const tracked = experimentRegistry.filter(experiment => experiment.routes.length > 0 || Boolean(experiment.folder));

  const workspaceHtml = '<section class="workspace">'
    + '<div class="workspace__controls"><div class="workspace__search">'
    + '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m14.3 13.6 3.55 3.55-.7.7-3.55-3.55a6.5 6.5 0 1 1 .7-.7ZM9.5 15a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" fill="currentColor"/></svg>'
    + '<input id="workspaceSearch" type="search" autocomplete="off" aria-label="Search prototypes" placeholder="Search prototypes, owners, or tags"/>'
    + '<button class="workspace__clear" id="workspaceClear" type="button" aria-label="Clear search" hidden>'
    + '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.15 3.85a.5.5 0 0 1 .7-.7L8 7.3l4.15-4.15a.5.5 0 0 1 .7.7L8.7 8l4.15 4.15a.5.5 0 0 1-.7.7L8 8.7l-4.15 4.15a.5.5 0 0 1-.7-.7L7.3 8 3.15 3.85Z" fill="currentColor"/></svg></button></div>'
    + '<div class="workspace__filters" role="group" aria-label="Artifact type">'
    + '<button class="workspace__filter is-active" type="button" data-workspace-kind="all" aria-pressed="true">All</button>'
    + '<button class="workspace__filter" type="button" data-workspace-kind="prototype" aria-pressed="false">Prototypes</button>'
    + '<button class="workspace__filter" type="button" data-workspace-kind="deck" aria-pressed="false">Decks</button>'
    + '</div>'
    + '<button class="workspace__expand" id="workspaceExpand" type="button"><span>Expand all</span><svg class="workspace__expand-chev" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
    + '</div></section>';

  const registryHtml = '<!-- REGISTRY:START -->' + workspaceHtml + '<!-- REGISTRY:END -->';
  const trackedGridHtml = buildTrackedGrid(tracked);

  const registryCss = `/* REGISTRY:CSS */
.workspace { margin-bottom: 32px; }
.workspace__heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 18px; }
.workspace__heading > div { display: flex; flex-direction: column; gap: 4px; }
.workspace__heading h2 { font-size: 20px; font-weight: 600; line-height: 28px; }
.workspace__heading p { color: #6f6f6f; font-size: 14px; line-height: 20px; }
.workspace__count { flex-shrink: 0; color: #5d5d5d; font-size: 12px; line-height: 28px; }
.workspace__controls { display: flex; align-items: center; gap: 12px; }
.workspace__search { position: relative; min-width: 0; flex: 1; }
.workspace__search > svg { position: absolute; top: 50%; left: 12px; width: 18px; height: 18px; color: #5d5d5d; transform: translateY(-50%); pointer-events: none; }
.workspace__search input { width: 100%; height: 40px; padding: 8px 40px; border: 1px solid #bdbdbd; border-radius: 8px; outline: none; background: #fff; color: #242424; font: inherit; font-size: 14px; }
.workspace__search input:hover { border-color: #929292; }
.workspace__search input:focus { border-color: #242424; box-shadow: inset 0 -2px #242424; }
.workspace__search input::placeholder { color: #6f6f6f; }
.workspace__clear { position: absolute; top: 6px; right: 6px; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 8px; background: transparent; color: #5d5d5d; cursor: pointer; }
.workspace__clear[hidden] { display: none; }
.workspace__clear:hover { background: #ebebeb; color: #242424; }
.workspace__clear svg { width: 16px; height: 16px; }
.workspace__filters { display: inline-flex; flex-shrink: 0; padding: 3px; border: 1px solid #dedede; border-radius: 10px; background: #fff; }
.workspace__filter { min-height: 32px; padding: 5px 11px; border: 0; border-radius: 7px; background: transparent; color: #5d5d5d; font: inherit; font-size: 13px; cursor: pointer; }
.workspace__filter:hover { background: #f5f5f5; color: #242424; }
.workspace__filter.is-active { background: #242424; color: #fff; }
.workspace__expand { flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; height: 40px; padding: 0 10px 0 14px; border: 1px solid #dedede; border-radius: 8px; background: #fff; color: #242424; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; transition: background 0.1s, border-color 0.1s; }
.workspace__expand:hover { background: #f5f5f5; border-color: #c8c8c8; }
.workspace__expand-chev { width: 16px; height: 16px; color: #6f6f6f; transform: rotate(90deg); transition: transform 0.2s ease; }
.workspace__expand.is-expanded .workspace__expand-chev { transform: rotate(-90deg); }
.workspace__expand[hidden] { display: none; }
#my-prototypes.kind-flat .folder { display: contents; }
#my-prototypes.kind-flat .folder__head { display: none; }
#my-prototypes.kind-flat .folder__body { display: contents; }
.workspace-empty { display: none; padding: 48px 24px; border: 1px dashed #bdbdbd; border-radius: 12px; text-align: center; }
.workspace-empty.is-visible { display: block; }
.workspace-empty strong { display: block; margin-bottom: 4px; font-size: 16px; }
.workspace-empty span { color: #6f6f6f; font-size: 13px; }
[data-workspace-hidden] { display: none !important; }
.registry__heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 18px; }
.registry__heading > div { display: flex; flex-direction: column; gap: 5px; }
.registry__heading p { color: #6f6f6f; font-size: 14px; line-height: 20px; }
.registry__grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.registry-card { min-width: 0; display: flex; flex-direction: column; gap: 18px; padding: 20px; border: 1px solid #dedede; border-radius: 16px; background: #fff; }
.registry-card__top, .registry-card__footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.registry-card__kind { color: #5d5d5d; font-size: 11px; font-weight: 600; text-transform: uppercase; }
.registry-card__status { display: inline-flex; align-items: center; gap: 6px; color: #5d5d5d; font-size: 12px; text-transform: capitalize; }
.registry-card__status > span { width: 7px; height: 7px; border-radius: 50%; background: #929292; }
.registry-card__status--ready > span { background: #107c10; }
.registry-card__status--in-review > span { background: #986f0b; }
.registry-card h3 { margin-bottom: 6px; font-size: 18px; font-weight: 600; line-height: 24px; }
.registry-card p { color: #5d5d5d; font-size: 13px; line-height: 19px; }
.registry-card__evidence { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #ebebeb; border-bottom: 1px solid #ebebeb; }
.registry-card__evidence span { display: flex; min-width: 0; flex-direction: column; gap: 2px; padding: 12px 8px; color: #6f6f6f; font-size: 11px; line-height: 15px; }
.registry-card__evidence span + span { border-left: 1px solid #ebebeb; }
.registry-card__evidence strong { color: #242424; font-size: 16px; line-height: 20px; }
.registry-card__evidence .registry-card__gap strong { color: #986f0b; }
.registry-card__gaps { padding: 10px 12px; border-left: 3px solid #986f0b; background: #fff8e8; color: #5d5d5d; font-size: 11px; line-height: 16px; }
.registry-card__gaps strong { display: block; margin-bottom: 2px; color: #242424; }
.registry-card__gaps ul { margin: 0; padding-left: 16px; }
.registry-card__scenarios { display: flex; flex-wrap: wrap; gap: 6px; }
.registry-card__scenario { display: inline-flex; align-items: center; min-height: 28px; padding: 5px 9px; border-radius: 8px; background: #f5f5f5; color: #242424; font-size: 12px; line-height: 16px; text-decoration: none; }
.registry-card__scenario:hover { background: #ebebeb; }
.registry-card__tags { display: flex; flex-wrap: wrap; gap: 6px; }
.registry-card__tag { display: inline-flex; align-items: center; min-height: 24px; padding: 3px 9px; border-radius: 8px; background: #f5f5f5; color: #5d5d5d; font-size: 12px; line-height: 16px; }
#quality-tracked .grid { grid-template-columns: repeat(2, 1fr); }
.tp-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.tp-head .card__name { flex: 1; min-width: 0; }
.tp-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #929292; }
.tp-cta { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
.registry-card__footer { margin-top: auto; color: #6f6f6f; font-size: 11px; }
.registry-card__open { color: #242424; font-size: 13px; font-weight: 600; text-decoration: none; white-space: nowrap; }
.registry-card__open:hover { text-decoration: underline; }
@media (max-width: 960px) { .registry__grid { grid-template-columns: 1fr; } }
@media (max-width: 600px) {
  .topbar { padding: 0 16px; }
  .topbar__logo { flex-shrink: 0; }
  .topbar__logo span { display: none; }
  .topbar__spacer { display: none; }
  .topbar__nav { flex: 1; min-width: 0; overflow-x: auto; scrollbar-width: none; }
  .topbar__nav::-webkit-scrollbar { display: none; }
  .topbar__link { flex-shrink: 0; white-space: nowrap; }
  .hero { padding: 56px 24px 40px; }
  .main { padding-right: 24px; padding-left: 24px; }
  .workspace__heading, .workspace__controls { align-items: stretch; flex-direction: column; }
  .workspace__heading { gap: 4px; }
  .workspace__count { line-height: 20px; }
  .workspace__filters { width: 100%; overflow-x: auto; }
  .workspace__filter { flex: 1; }
  #prototypes .grid, #quality-tracked .grid { grid-template-columns: 1fr; }
  .registry-card__footer { align-items: flex-start; flex-direction: column; }
}
/* REGISTRY:CSS-END */`;

  const workspaceJs = `<!-- REGISTRY:JS --><script>
(function(){
  var input = document.getElementById('workspaceSearch');
  var clear = document.getElementById('workspaceClear');
  var count = document.getElementById('workspaceCount');
  var filters = Array.from(document.querySelectorAll('[data-workspace-kind]'));
  var sections = Array.from(document.querySelectorAll('#my-prototypes, #prototypes'));
  var expandBtn = document.getElementById('workspaceExpand');
  if (!input || !clear) return;

  document.querySelectorAll('#my-prototypes .card, #prototypes .card').forEach(function(card){
    card.setAttribute('data-workspace-item', '');
    var action = card.querySelector('.card__cta');
    var kind = action && /deck/i.test(action.textContent || '') ? 'deck' : 'prototype';
    card.setAttribute('data-kind', kind);
    card.setAttribute('data-status', 'untracked');
  });

  var items = Array.from(document.querySelectorAll('[data-workspace-item]'));
  var params = new URLSearchParams(location.search);
  var activeKind = params.get('type') || 'all';
  if (!filters.some(function(button){ return button.getAttribute('data-workspace-kind') === activeKind; })) activeKind = 'all';
  input.value = params.get('q') || '';

  var empty = document.createElement('div');
  empty.className = 'workspace-empty';
  empty.innerHTML = '<strong>No artifacts found</strong><span>Try another term or artifact type.</span>';
  document.querySelector('.workspace').insertAdjacentElement('afterend', empty);

  function normalized(value){ return value.toLowerCase().trim().replace(/\\s+/g, ' '); }
  function syncUrl(query){
    var next = new URL(location.href);
    query ? next.searchParams.set('q', query) : next.searchParams.delete('q');
    activeKind === 'all' ? next.searchParams.delete('type') : next.searchParams.set('type', activeKind);
    history.replaceState(null, '', next.pathname + next.search + next.hash);
  }
  function apply(){
    var query = normalized(input.value);
    var visible = 0;
    items.forEach(function(item){
      var haystack = normalized(item.getAttribute('data-search') || item.textContent || '');
      var kindMatch = activeKind === 'all' || item.getAttribute('data-kind') === activeKind;
      var searchMatch = !query || query.split(' ').every(function(term){ return haystack.includes(term); });
      var show = kindMatch && searchMatch;
      item.toggleAttribute('data-workspace-hidden', !show);
      if (show) visible++;
    });
    sections.forEach(function(section){
      var sectionItems = Array.from(section.querySelectorAll('[data-workspace-item]'));
      var visibleItems = sectionItems.filter(function(item){ return !item.hasAttribute('data-workspace-hidden'); });
      var sectionCount = section.querySelector('.section-count');
      section.toggleAttribute('data-workspace-hidden', sectionItems.length > 0 && visibleItems.length === 0);
      if (sectionCount) sectionCount.textContent = String(visibleItems.length);
    });
    document.querySelectorAll('[data-folder]').forEach(function(folder){
      var kids = Array.from(folder.querySelectorAll('[data-workspace-item]'));
      var anyVisible = kids.some(function(k){ return !k.hasAttribute('data-workspace-hidden'); });
      folder.toggleAttribute('data-workspace-hidden', kids.length > 0 && !anyVisible);
      if (query) { folder.classList.toggle('folder--open', anyVisible); } else { folder.classList.remove('folder--open'); }
    });
    filters.forEach(function(button){
      var active = button.getAttribute('data-workspace-kind') === activeKind;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    var mp = document.getElementById('my-prototypes');
    if (mp) mp.classList.toggle('kind-flat', activeKind !== 'all');
    if (expandBtn) expandBtn.hidden = activeKind !== 'all';
    updateExpandLabel();
    clear.hidden = !input.value;
    if (count) count.textContent = visible + (visible === 1 ? ' artifact' : ' artifacts');
    empty.classList.toggle('is-visible', visible === 0);
    syncUrl(input.value.trim());
  }

  input.addEventListener('input', apply);
  input.addEventListener('keydown', function(event){
    if (event.key === 'Escape' && input.value) { input.value = ''; apply(); }
  });
  clear.addEventListener('click', function(){ input.value = ''; input.focus(); apply(); });
  filters.forEach(function(button){
    button.addEventListener('click', function(){ activeKind = button.getAttribute('data-workspace-kind') || 'all'; apply(); });
  });
  document.addEventListener('keydown', function(event){
    if (event.key === '/' && !/input|textarea|select/i.test(document.activeElement && document.activeElement.tagName || '')) {
      event.preventDefault(); input.focus();
    }
  });
  document.querySelectorAll('.folder__head').forEach(function(head){
    head.addEventListener('click', function(){ head.parentElement.classList.toggle('folder--open'); updateExpandLabel(); });
  });
  function updateExpandLabel(){
    if (!expandBtn) return;
    var folders = Array.from(document.querySelectorAll('[data-folder]'));
    var allOpen = folders.length > 0 && folders.every(function(f){ return f.classList.contains('folder--open'); });
    var lbl = expandBtn.querySelector('span');
    if (lbl) lbl.textContent = allOpen ? 'Collapse all' : 'Expand all';
    expandBtn.classList.toggle('is-expanded', allOpen);
  }
  if (expandBtn) expandBtn.addEventListener('click', function(){
    var folders = Array.from(document.querySelectorAll('[data-folder]'));
    var allOpen = folders.length > 0 && folders.every(function(f){ return f.classList.contains('folder--open'); });
    folders.forEach(function(f){ f.classList.toggle('folder--open', !allOpen); });
    updateExpandLabel();
  });
  apply();
})();
</script><!-- /REGISTRY:JS -->`;

  html = html.replace(/\/\* REGISTRY:CSS \*\/[\s\S]*?\/\* REGISTRY:CSS-END \*\//g, '');
  html = html.replace(/<!-- REGISTRY:START -->[\s\S]*?<!-- REGISTRY:END -->/g, '');
  html = html.replace(/<!-- REGISTRY:JS -->[\s\S]*?<!-- \/REGISTRY:JS -->/g, '');
  html = html.replace('</style>', registryCss + '\n</style>');
  html = html.replace('<div class="main">', '<div class="main">\n\n  ' + registryHtml);
  html = html.replace(/<!-- TRACKED:START -->[\s\S]*?<!-- TRACKED:END -->/, '<!-- TRACKED:START -->' + trackedGridHtml + '<!-- TRACKED:END -->');
  html = html.replace('</body>', workspaceJs + '\n</body>');

  fs.writeFileSync(prototypesPath, html, 'utf-8');
  console.log('Registry: injected ' + tracked.length + ' quality-tracked artifacts into prototypes.html');
}

buildExperimentRegistry();
