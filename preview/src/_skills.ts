/**
 * _skills.ts — Canonical connector skill catalog (shared source of truth)
 *
 * One Copilot / Bebop Design System. A SINGLE list of 3–4 skills per connector,
 * consumed by every surface so the skills stay identical everywhere:
 *   • Cowork  → plugin L2 skill rows, "Your skills" cards, skill L2 detail
 *   • Chat    → CIQ "/" skills menu, Settings → Source detail skills
 *
 * Keyed by a shared slug so the differing display names (Github/GitHub,
 * Hubspot/HubSpot, S&P Global, Moody's, …) all resolve to the same entry.
 * Rich instruction fields (purpose / best uses / setup) are synthesized per
 * surface from { name, desc } so both experiences render matching detail pages.
 */

export type ConnectorSkill = { name: string; desc: string };

/** Normalize a connector display name to its canonical skill-catalog key. */
export function skillSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ─── Canonical catalog: 3–4 skills per connector ────────────
export const CONNECTOR_SKILLS: Record<string, ConnectorSkill[]> = {
  'jira': [
    { name: 'sprint-status', desc: 'Snapshot the active sprint — scope, burndown, blockers, and what’s at risk before a standup or review. It checks every issue for missing points, incomplete acceptance criteria, and unassigned or blocked work, then rolls the findings into a single readiness report you can share.' },
    { name: 'issue-triage', desc: 'Prioritize, label, and route incoming issues to the right owner under your team’s rules. It classifies each ticket by severity and component, applies consistent priorities, and can de-duplicate, draft a first response, and escalate critical issues the moment they land.' },
    { name: 'release-notes', desc: 'Draft grouped release notes from closed issues across one or more fix versions. It organizes resolved work by epic, component, or label and tailors the tone for engineers or customers, ready to publish to Confluence, Markdown, or email.' },
    { name: 'backlog-grooming', desc: 'Surface stale, duplicate, or unestimated issues and suggest cleanup actions. It scans the backlog for gaps in points, owners, and acceptance criteria so refinement starts from a clear, prioritized list.' },
  ],
  'github': [
    { name: 'pr-review-digest', desc: 'Summarize open pull requests by review state, size, and what’s blocking merge. It ranks PRs so nothing stalls in the queue, highlights oversized or stale ones, and surfaces the reviews waiting specifically on you.' },
    { name: 'commit-standup', desc: 'Turn recent commits and merged PRs into a concise standup update. It groups activity by author or area, captures what shipped and what’s in progress, and can span several repositories while filtering out bots and merge noise.' },
    { name: 'issue-triage', desc: 'Label, assign, and draft a first response for new issues grounded in repo context. It applies consistent labels and priorities, routes each issue to the right owner, and flags likely duplicates as they arrive.' },
    { name: 'release-notes', desc: 'Draft release notes from merged pull requests and commits since the last tag. It groups changes by theme, calls out breaking changes, and produces both a technical and a customer-facing version.' },
  ],
  'slack': [
    { name: 'channel-catchup', desc: 'Summarize a busy channel into decisions, highlights, and items awaiting your reply. It cuts through high-volume threads, pulls out action items and owners, and surfaces the questions and mentions directed specifically at you.' },
    { name: 'decision-log', desc: 'Extract decisions from conversation into a structured log with owner and date. It turns scattered agreement into an auditable record — decision, owner, date, and rationale — you can revisit whenever you need it.' },
    { name: 'action-items', desc: 'Pull open action items and their owners from recent threads. It scans the conversation for commitments, assigns each to a person, and rolls them into a checklist you can track.' },
    { name: 'thread-summary', desc: 'Summarize a long thread into the key points and outcome. It captures what was discussed, what was decided, and what happens next, and can draft a reply that moves the thread forward.' },
  ],
  'canva': [
    { name: 'branded-presentation', desc: 'Generate an on-brand deck from an outline using your Canva brand kit and templates.' },
    { name: 'bulk-create', desc: 'Bulk-generate design variations from a data set (names, sizes, locales).' },
    { name: 'brand-check', desc: 'Check a design against your brand kit for colors, fonts, and logo usage.' },
  ],
  'confluence': [
    { name: 'space-summary', desc: 'Summarize recent edits and new pages across a Confluence space. It digests changes, new pages, and comments into an overview of key updates, owners, and open questions, and flags documentation that has gone stale or lost an owner.' },
    { name: 'page-from-template', desc: 'Create and publish a new page from a template (meeting notes, PRD, retro) pre-filled from the conversation. It applies your space’s structure and labels so the page lands ready to share.' },
    { name: 'doc-search', desc: 'Search your spaces and surface the most relevant pages with citations. It ranks results by relevance, quotes the passages that matter, and links straight back to the source page.' },
    { name: 'release-notes', desc: 'Compile formatted release notes from pages matching a label or date range. It gathers the right pages, groups the content by theme, and formats it into notes ready to publish.' },
  ],
  'servicenow': [
    { name: 'incident-triage', desc: 'Classify and route incidents by impact and urgency.' },
    { name: 'ticket-summary', desc: 'Summarize a ticket\u2019s history, status, and next step.' },
    { name: 'resolution-draft', desc: 'Draft a resolution grounded in similar past incidents.' },
  ],
  'notion': [
    { name: 'meeting-notes', desc: 'Turn raw notes into structured minutes with actions and owners.' },
    { name: 'doc-search', desc: 'Search pages, docs, and databases and summarize what you find.' },
    { name: 'database-query', desc: 'Query a Notion database and roll the results into a summary.' },
  ],
  'linear': [
    { name: 'cycle-review', desc: 'Summarize a cycle \u2014 done, in progress, and at risk.' },
    { name: 'issue-triage', desc: 'Prioritize and route new Linear issues to the right owner.' },
    { name: 'roadmap-update', desc: 'Draft a roadmap update from project and issue progress.' },
  ],
  'hubspot': [
    { name: 'deal-brief', desc: 'Summarize a deal\u2019s stage, history, and recommended next step before a call.' },
    { name: 'pipeline-summary', desc: 'Roll up pipeline by stage, owner, and forecast.' },
    { name: 'contact-lookup', desc: 'Find a contact\u2019s history and recent activity across the CRM.' },
  ],
  'google-drive': [
    { name: 'doc-summary', desc: 'Summarize a long document, sheet, or deck into key points.' },
    { name: 'file-search', desc: 'Search your Drive and surface the most relevant files.' },
    { name: 'folder-digest', desc: 'Digest recent changes across a folder into a quick update.' },
  ],
  'intercom': [
    { name: 'support-themes', desc: 'Cluster recent conversations into recurring themes and pain points.' },
    { name: 'conversation-summary', desc: 'Summarize a support conversation with sentiment and resolution.' },
    { name: 'sentiment-scan', desc: 'Scan recent conversations for sentiment shifts and escalations.' },
  ],
  's-p-global': [
    { name: 'company-profile', desc: 'Compile a company profile from fundamentals and filings.' },
    { name: 'market-brief', desc: 'Summarize market data and recent filings for a security.' },
    { name: 'filing-summary', desc: 'Summarize a specific filing into key figures and disclosures.' },
  ],
  'moody-s': [
    { name: 'credit-snapshot', desc: 'Compile a credit profile from ratings and risk indicators.' },
    { name: 'risk-scan', desc: 'Scan an entity for credit and risk signals.' },
    { name: 'rating-history', desc: 'Summarize an entity\u2019s rating history and recent changes.' },
  ],
  'london-stock-group-exchange': [
    { name: 'market-brief', desc: 'Summarize market data and recent filings for a security.' },
    { name: 'filing-lookup', desc: 'Look up filings for a company and summarize the latest.' },
    { name: 'index-summary', desc: 'Summarize an index\u2019s composition and recent moves.' },
  ],
  'google-calendar': [
    { name: 'day-plan', desc: 'Turn today\u2019s events into a prioritized plan with prep notes.' },
    { name: 'meeting-prep', desc: 'Prepare for an upcoming meeting with attendees, agenda, and context.' },
    { name: 'availability-check', desc: 'Find open slots and suggest times across attendees.' },
  ],
  'google-contacts': [
    { name: 'contact-lookup', desc: 'Find contact details and recent context for a person or company.' },
    { name: 'contact-enrich', desc: 'Enrich a contact with role, company, and recent interactions.' },
    { name: 'group-digest', desc: 'Summarize a contact group and recent touchpoints.' },
  ],
  'microsoft-365-apps': [
    { name: 'meeting-recap', desc: 'Recap a meeting from the transcript with decisions, action items, and owners.' },
    { name: 'inbox-triage', desc: 'Surface urgent emails and draft replies grounded in the thread history.' },
    { name: 'doc-summary', desc: 'Summarize a long document or deck into the key points and next steps.' },
    { name: 'weekly-digest', desc: 'Compile a weekly digest across your chats, email, and meetings.' },
  ],
};

/** Fallback skills for any connector missing from the catalog. */
export function fallbackSkills(name: string): ConnectorSkill[] {
  return [
    { name: 'search-' + skillSlug(name), desc: 'Search across your ' + name + ' content and surface the most relevant results.' },
    { name: skillSlug(name) + '-digest', desc: 'Summarize recent ' + name + ' activity into a quick, structured digest.' },
    { name: 'grounded-answer', desc: 'Answer a question with inline citations grounded in your ' + name + ' data.' },
  ];
}

/** Canonical skills for a connector by display name (catalog → fallback). */
export function skillsFor(name: string): ConnectorSkill[] {
  return CONNECTOR_SKILLS[skillSlug(name)] || fallbackSkills(name);
}
