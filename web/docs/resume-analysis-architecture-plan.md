# LexIntent Resume Analyser — Career Intelligence architecture + launch plan

## Context

Two prior revisions covered: (1) a deterministic rule engine + single cost-capped
Claude call, security built into every phase, and (2) a research phase to ground
the rules in real sources. The user then proposed a layered architecture:

```
UX (Report / Score / Roadmap)
  -> Career Intelligence (Evidence Graph, Rules Engine, Recommendation Engine, LLM Explanation Layer)
       -> Resume Data | Practice Data | Market Data
```

**Verdict: this is a better architecture, and it's adopted.** It isn't a
different plan so much as a correct refactor of the same one — it fixes a real
gap: my earlier plan had one monolithic `Findings` function and two unrelated
scoring systems (the existing Practice Compass fit engine, and a new resume
engine). The layered version makes them **one system with two views**:

- **Evidence Graph** — the connective layer I was missing. A resume fact
  ("mooted on investor-state arbitration") isn't scored in isolation; it's
  evidence that maps to a dimension (advocacy, drafting), a practice area
  (dispute resolution), and a market requirement (what firms in that area
  actually ask for). Both Practice Compass (`/fit`) and the resume report
  (`/report`) become *readouts of the same graph* instead of parallel logic —
  build once, power both, and every future LexIntent product (the law job-map
  mentioned as next-up) plugs into the same Practice Data + Market Data instead
  of starting over.
- **Rules Engine** = the deterministic checks from the prior plan (unchanged).
- **Recommendation Engine** = a new explicit layer that turns graph + rule
  output into a *sequenced* roadmap ("do this first") — currently this logic
  is informally duplicated between `/fit`'s "two things to do this week" and
  `/report`'s "fix in this order." One engine, two renderings.
- **LLM Explanation Layer** = exactly the single Claude call already planned,
  just named as what it structurally is: it explains and phrases, it never
  scores or decides.

**Pragmatic build choice, flagged for approval:** "Evidence Graph" ships as
typed relational tables in the existing Supabase Postgres (an `evidence`
table with `claim`, `source_field`, `maps_to_dimension`, `maps_to_practice_area`,
`confidence`, edges expressed as foreign keys/join tables) — **not** a graph
database. Same reasoning power, zero new infra, zero new attack surface, fits
the "no vibe-coded product" security mandate. Revisit a real graph DB only if
query patterns actually demand it later.

**Market Data is the genuinely new piece** and the one with the most leverage:
firms, roles, requirements, opportunities. It doesn't exist yet in the codebase
(Practice Data does — `src/lib/practice-compass/data.ts`; Resume Data is
Phase 3 below). It's sourced in the research phase and, per the go-to-market
section, doubles as content fuel for the Instagram acquisition engine already
being built (`D:\agency content\`) — real firm/requirement facts are what make
a "Case File" reel feel authoritative instead of generic.

## Revised phase list

**Phase 1 — Research: rulebook + Market Data** *(expanded from the prior revision)*
Use the `agent-reach` skill (installed, no API key) to gather, paraphrase-and-cite
(never store scraped full text verbatim):
- *Writing-quality rulebook* (as previously planned): Harvard/Yale/NYU OCS
  guides, BigLaw recruiter articles, Indian sources (NLU placement cells, Bar &
  Bench, LiveLaw, LawCtopus), ATS mechanics guides.
- *Market Data* (new): named firms/chambers by practice area and tier, what
  each tier/area is known to actually require (internship count, moot/publication
  weight, drafting-sample expectations), and general role/opportunity shape per
  practice area (already partially seeded in `practice-compass/data.ts`'s
  `ENTRY`/`DEST` fields — this phase deepens and sources it, doesn't replace it).
- Output: `docs/research/raw/<slug>.md` (source notes, cited), 
  `docs/research/resume-rulebook.md` (human-readable rules with citations),
  `src/lib/resume-analysis/rulebook.json` (verb lists, section norms, red flags,
  ATS pitfalls), `src/lib/practice-compass/market-data.ts` (firms/requirements,
  extending the existing data module rather than forking a new one).

**Phase 2 — Evidence Graph + Rules Engine (the shared core)**
- Supabase tables: `evidence` (per-resume extracted facts), `dimension_map` /
  `practice_map` (join tables scoring an evidence row against Practice Data
  dimensions and areas — reuses the existing calibration logic in
  `practice-compass/engine.ts` rather than reinventing scoring math).
- Resume extraction (`pdfjs-dist`/`mammoth`) populates `evidence` rows.
- Rules Engine (deterministic, from the prior plan) reads `evidence` +
  `rulebook.json` + `market-data.ts` to produce section/ATS/quantification/
  keyword-match checks — same as previously planned, now graph-aware instead
  of a flat one-off object.
- Practice Compass (`/fit`) and the resume score (`/report`) both become
  queries over this graph — `computeResult()` in `practice-compass/engine.ts`
  is extended to accept resume `evidence` as an optional richer input, not
  replaced.

**Phase 3 — Recommendation Engine**
- One prioritization function, consuming graph + rule output, producing a
  ranked, deduplicated fix list — replaces the currently-separate "do this
  week" (`/fit`) and "fix in this order" (`/report`) lists with one source.
- Deterministic, zero API cost, same as the Rules Engine.

**Phase 4 — Auth + RLS hardening** *(unchanged from prior plan)*

**Phase 5 — Upload pipeline security** *(unchanged from prior plan)*

**Phase 6 — LLM Explanation Layer (the one Claude call)**
- Same cost/security design as previously planned (Haiku for ₹99 tier, Sonnet
  for ₹499 tier, cached system prompt built from `rulebook.json`, strict JSON
  output, tight `max_tokens`, response cached by
  `(resumeHash, findingsVersion, rulebookVersion)`).
- Explicitly scoped: it explains the graph + recommendations in the recruiter's
  voice and rewrites flagged bullets. It never assigns the score.

**Phase 7 — Payments (Razorpay) wired to real entitlement** *(unchanged)*

**Phase 8 — Infra hardening + observability** *(unchanged)*

**Phase 9 — Pre-launch security review** *(unchanged)*

## Go-to-market: capturing users, conversion, margin

Treating this as a business, not just a build:

**Funnel (validate, don't guess).** The existing shape is already the right
one for a cash-conscious student audience: free Practice Compass fit (the
hook, no paywall) -> ₹99 resume analysis (low-friction first purchase, value
already proven by the free fit) -> ₹499 rewrite (upsell only *after* they've
seen the real findings, never bundled upfront). Add funnel-stage analytics
(questionnaire start -> fit viewed -> paywall hit -> ₹99 paid -> ₹499 paid) from
day one — Phase 8's observability work should include this, not just error
tracking. Without it, pricing/copy decisions are guesses.

**Margins are structural, not aspirational.** Because the Rules/Recommendation
engines do the scoring for free and the LLM layer is one short, cached,
Haiku-tier call, the marginal cost of a ₹99 report is a small fraction of a
rupee in model cost — gross margin on the analysis tier is dictated almost
entirely by Vercel/Supabase infra and Razorpay's take rate, not API spend. The
₹499 tier's Sonnet call costs more per report but is still small relative to
₹499. This is the direct payoff of the "engine does the work, LLM only
explains" decision from Phase 6/prior plan — worth stating plainly since it's
the reason this architecture is also the profitable one.

**Distribution is already being built — connect it.** The Instagram "Case
File" reel engine (`D:\agency content\`) is the CAC-minimizing acquisition
channel. Market Data from Phase 1 should be treated as shared fuel: the same
sourced firm/requirement facts that make a resume finding credible also make a
reel's claim credible ("Tier-1 M&A firms in Bombay want X" is both a report
line and a hook line). Don't build Market Data twice for two teams/products.

**Trust signals convert this audience.** Law students are skeptical of generic
"AI resume tools." Phase 1's citations aren't just internal grounding — surface
them ("built on Harvard OCS + NLU placement-cell guidance") on the landing
page and in the report itself. Credibility is a conversion lever here, not
just a quality one.

**Retention and cross-sell justify the auth investment.** Phase 4's auth
system isn't only about gating the paid call — it's the account that will
carry a user into the next LexIntent product (the law job-map mentioned as
planned). Capture the relationship once (email via magic link, already
built), don't re-acquire per product. The existing "come back after your next
internship" copy on `/fit` is already a lifecycle-reactivation hook worth
wiring to an actual email/WhatsApp trigger later, not just static copy.

**Pricing stays as-is for now.** No confident basis to change ₹99/₹499 without
funnel data; treat it as the first thing to A/B test once Phase 8 analytics are
live, not something to change blind today.

## Files (representative)

| Phase | Paths |
|---|---|
| 1 | `docs/research/raw/*.md`, `docs/research/resume-rulebook.md`, `src/lib/resume-analysis/rulebook.json`, `src/lib/practice-compass/market-data.ts` |
| 2 | `supabase-schema.sql` (`evidence`, `dimension_map`, `practice_map` tables), `src/lib/resume-analysis/{extract,evidence,rules}.ts`, `src/lib/practice-compass/engine.ts` (extended) |
| 3 | `src/lib/resume-analysis/recommend.ts` |
| 4 | `supabase-schema.sql` (RLS policies), `src/lib/auth.tsx`, `src/proxy.ts` |
| 5 | `src/app/api/upload/route.ts`, Supabase Storage bucket config |
| 6 | `src/app/api/report/route.ts`, `src/lib/resume-analysis/claude.ts` |
| 7 | `src/app/api/payments/*`, Razorpay webhook handler |
| 8 | `next.config.ts` (headers), Sentry init, funnel analytics events, `docs/privacy-policy.md` |

## Verification

- Phase 1: every rulebook/market-data entry traceable to a cited source; no
  scraped full-text committed.
- Phase 2–3: run against a fixture set of real anonymized resumes (good/bad/
  edge cases); confirm `/fit` and `/report` scores stay consistent with each
  other for the same person (same graph, no contradictions).
- Phase 4–8: each phase's own security checklist item, as in the prior plan
  (RLS test with a second account, upload rejection tests, webhook signature
  rejection test, header scan).
- Go-to-market: funnel event counts visible in analytics before declaring
  Phase 8 done.

## Process

Proceed phase by phase with a check-in between phases, as before. Phase 1
(research: rulebook + Market Data) is next once this plan is approved.
