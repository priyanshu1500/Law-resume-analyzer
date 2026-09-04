# LexIntent Resume Rulebook v1

Synthesized 2026-09-05 from the sources in `docs/research/raw/`. Every rule
below carries a citation key resolving to those files. This is the human-
readable version of `src/lib/resume-analysis/rulebook.json`, which the rules
engine and the Claude explanation-layer prompt both consume — keep the two in
sync when this file changes.

Citation keys: `HLS-LAYOUT`, `HLS-WORKSHOP` (Tier 1) · `ATL-2026`, `ATL-2021`
(Tier 2) · `TLC-CV`, `NLUD-RCC`, `LAWCTOPUS-INTERN` (Tier 3) · `ATS-BENCH-2026`
(Tier 4) · `JOBAAJ-FIRMS` (Tier 5).

## 1 · Structure & section order

- Standard order: Header → Education → Honors/Activities → (Thesis/Publications
  if relevant) → Experience → Skills & Interests. [`HLS-LAYOUT`]
- Use conventional section names (Experience, Education, Skills) — creative
  headings measurably hurt ATS parsing. [`ATS-BENCH-2026`]
- Cap Honors and Activities at 3–5 entries each; more dilutes signal. [`HLS-LAYOUT`]
- No job-objective / career-objective section for students with meaningful
  internship history; **exception** — for 1st/2nd-year students with limited
  internships, a short objective/profile line is acceptable and can help frame
  a thin resume. Treat as experience-conditional, not a flat pass/fail.
  [`HLS-LAYOUT` vs `TLC-CV`]
- No "References available upon request" line. [`HLS-LAYOUT`]

## 2 · Length

- India-specific, more precise than the Western norm: **1 page for 1st–3rd
  year students; up to 2 pages for final-year students with substantial
  experience.** [`TLC-CV`]
- General/Western norm for context: 1–2 pages for students, up to 2 (rarely 3
  with addenda) for practicing lawyers — not directly applicable to the
  product's student audience but kept for the post-qualification tier later.
  [`HLS-WORKSHOP`, `ATL-2026`]

## 3 · Header & personal info

- Include: name, professional email, phone, city/state, LinkedIn (optional).
  [`HLS-LAYOUT`, `TLC-CV`]
- **Do not include** (India-specific privacy/professionalism norm): date of
  birth, gender, religion, full residential address. [`TLC-CV`]
- No photos. [`HLS-WORKSHOP`]

## 4 · Bullet / language quality

- Every bullet starts with an action verb; avoid passive voice ("was
  responsible for" → active verb). [`HLS-LAYOUT`, `HLS-WORKSHOP`]
- General action-verb bank: Led, Supervised, Managed, Motivated, Facilitated,
  Enforced, Developed, Directed, Established, Generated, Increased,
  Engineered, Achieved, Resolved, Pioneered, Expanded, Organized, Created.
  [`HLS-WORKSHOP`]
- Legal-internship-specific verb bank (India): drafted, researched, analyzed,
  prepared, assisted in drafting, conducted due diligence, reviewed
  agreements. [`JOBAAJ-FIRMS`]
- Weak-phrase flags: "helped with", "responsible for", "worked on" — should
  be replaced with a specific verb + specific task/output. [`JOBAAJ-FIRMS`,
  `HLS-LAYOUT`]
- Quantify results wherever the underlying fact supports it (counts, %,
  amounts). [`HLS-WORKSHOP`]
- Bullet length should scale with the experience's importance — most
  significant roles get longer, more detailed bullets. [`HLS-LAYOUT`]
- Internship bullets should state **specific work done**, never a generic
  "legal research" with no further detail. [`JOBAAJ-FIRMS`]
- AI-generated-sounding phrasing (generic boilerplate, no specific detail) is
  an active red flag to recruiters — the product's own suggested rewrites
  must stay specific to the candidate's actual evidence, never generic
  filler. [`ATL-2026`]

## 5 · Formatting

- Sans-serif font preferred for digital readability (Arial/Calibri/Helvetica)
  over Times New Roman/Garamond, though Tier-3 India source lists Times New
  Roman/Calibri/Garamond as all acceptable — treat font family as a soft
  recommendation, not a hard fail. [`ATL-2021`, `TLC-CV`]
- Body 11–12pt, headings 13–14pt, line spacing 1.15–1.5. [`TLC-CV`]
- No colored fonts, no decorative/graphic templates, no columns-as-design.
  [`HLS-WORKSHOP`, `ATL-2026`, `TLC-CV`]
- File format: **PDF only.** [`TLC-CV`]
- Consistent date formatting throughout (don't mix "Sept." and "September",
  or exact-month with year-only). [`HLS-WORKSHOP`, `HLS-LAYOUT`]
- Latin honors phrases italicized lowercase (*magna cum laude*, etc.). [`HLS-LAYOUT`]

## 6 · ATS mechanics (evidence-based — see `ATS-BENCH-2026`, a controlled test,
not repeated folklore)

- **High severity**: two-column / sidebar layouts — the one confirmed,
  measurable parsing breaker (reading-order scramble).
- **Medium severity**: contact info placed only in a repeated page
  header/footer, never in the body of page one — some ATS engines drop
  header/footer content as boilerplate.
- **Low–medium severity**: non-standard/creative section headings.
- **Not a red flag** (contradicts common but untested advice): skills
  grids/tables, em-dashes, curly quotes — these parsed cleanly in the
  controlled test. The rules engine should explicitly not penalize these.

## 7 · Gaps & disclosures

- Unexplained employment/education gaps are a recruiter red flag; the resume
  (or an accompanying note) should address the reason briefly rather than
  leave it silently visible. [`HLS-WORKSHOP`, `ATL-2026`]
- LinkedIn and resume must agree on titles/dates — a mismatch is a
  credibility flag before any call happens (informational for the product's
  advice copy; the rules engine can't verify LinkedIn itself). [`ATL-2026`]
- India-specific: any pre-placement offer or secured assessment internship
  must be disclosed per placement-committee convention — informational, not a
  resume-quality scoring factor. [`NLUD-RCC`]

## 8 · Signals the market rewards (feeds the Evidence Graph / Recommendation
Engine, not just the writing-quality score)

- Moot court participation, academic/research publications, and internship
  diversity across firms/chambers/judicial settings are explicitly named
  placement-committee and recruiter credibility signals. [`NLUD-RCC`,
  `JOBAAJ-FIRMS`]
- A declared, developed practice-area interest ("specialist gets noticed")
  outperforms an unfocused spread of unrelated internships — this is the same
  insight the Practice Compass fit engine already encodes; the resume engine
  should score internship-to-declared-interest coherence, not just internship
  count. [`JOBAAJ-FIRMS`]
- A progressive internship ladder (smaller firms/practitioners before Tier-1
  applications) is the market-endorsed path, relevant to how the product
  frames "next steps" for early-year students differently from final-years.
  [`JOBAAJ-FIRMS`, `LAWCTOPUS-INTERN`]

## Known gaps (for the next research pass)

Firm-specific / practice-area-specific screening criteria beyond the general
Tier-1 corporate-firm signals above, and litigation-chamber-side hiring
criteria specifically, were not found in this pass. `market-data.ts` is
structured to extend cleanly once that research lands.
