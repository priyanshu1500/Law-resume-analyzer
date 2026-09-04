# Tier 5 — Market data: what Indian firms/chambers actually look for

Research method: Exa web search via `agent-reach`. Paraphrased, not
reproduced. This tier feeds `src/lib/practice-compass/market-data.ts`, not the
writing-quality rulebook.

---

### Source: "How to Secure an Internship at Top Law Firms" — jobaaj.com,
published 2025-12-01, accessed 2026-09-05
<https://www.jobaaj.com/blog/how-to-secure-an-internship-at-top-law-firms>

Written about Tier-1 Indian corporate firms (names it discusses: AZB &
Partners, Khaitan & Co, Cyril Amarchand Mangaldas):

- **CGPA screens are real and typically cited around 7.5–8.0+** at Tier-1
  firms — applications below the cutoff often aren't read regardless of other
  merits. Treat as a documented market fact to surface in advice copy (e.g.
  "Tier-1 firms commonly screen on CGPA ~7.5+"), not as something the resume
  engine can itself verify or penalize (CGPA is self-reported, out of scope
  for the rules engine's own scoring).
- What Tier-1 firms look for on the resume specifically: clean/plain
  formatting (no decorative fonts/colors), CGPA displayed prominently,
  internship entries with **specific work done** rather than generic "legal
  research", achievements/awards/publications/moots, relevant skills
  (drafting, research, languages), relevant certifications.
- Explicit power-verb list given for legal internship bullets: **drafted,
  researched, analyzed, prepared, assisted in drafting, conducted due
  diligence, reviewed agreements** — directly usable as a legal-specific
  supplement to the general (Harvard) action-verb bank.
- Weak phrasing flagged: "helped with X" — should become a specific verb +
  specific task.
- Career-building signals that precede a strong resume, not resume content
  per se, but valuable Market Data: moot-court participation (cited as
  building research/drafting/speaking skill and firm connections through
  senior mooters), committee/editorial-board leadership, a declared practice
  interest developed over time (a "specialist gets noticed" framing), and a
  progressive internship ladder (smaller firms/practitioners before Tier-1
  applications) rather than jumping straight to Tier-1 with no experience.
- Tiering language used: "Tier 1 (AZB, Khaitan, CAM)" as a named cluster —
  useful as a citation for a `tier` field on Market Data firm entries, though
  a fuller tier list (adding Cyril Amarchand's peers e.g. Shardul Amarchand
  Mangaldas, Trilegal, JSA, S&R Associates — commonly grouped with the above
  in Indian legal-market commentary generally) should be treated as
  reasonable industry convention rather than this single source's claim, and
  re-verified before being asserted as fact in user-facing copy.

**Not found in this pass, left as an open gap for a future research pass:**
firm-specific, practice-area-specific resume requirements (e.g. what an M&A
team specifically screens for vs. a disputes team) beyond the general Tier-1
signals above, and litigation-chamber-side hiring criteria (this pass
surfaced firm-side data more than chamber-side). `market-data.ts` should be
built to make adding these easy later rather than waiting to be complete now.
