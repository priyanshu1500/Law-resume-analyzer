# Tier 4 — ATS parsing mechanics (general, non-legal)

Research method: Exa web search via `agent-reach`. This source is unusually
valuable because it's an actual controlled experiment rather than repeated
folklore — used to correct several commonly-repeated but untested ATS "rules."

---

### Source: "ATS Parsing Benchmark 2026: What Resume Layouts Break" —
ATS Verification (Syed Muhammad Tanzeel Hayder), atsverification.com,
published 2026-06-30, accessed 2026-09-05
<https://atsverification.com/blog/ats-parsing-benchmark-2026/>

Controlled test: one resume, six layout variants, measured against a real
parser.

| Layout | Score | Result |
|---|---|---|
| Clean single-column (control) | 100/A | Perfect parse, baseline |
| Two-column + sidebar | 85/B | **Critical fail** — reading-order scramble |
| Contact info in a repeated page header | 95/A | Email extracted 3×; some ATS engines skip header/footer regions entirely and drop contact info dropped-in-header-only cases |
| Creative/non-standard section headings | 95/A | Missing standard headings recognized |
| Skills as a table/grid | 100/A | **Did not break** — contradicts common folklore |
| Em-dashes & curly quotes | 100/A | **Did not break** — contradicts common folklore |

**Rules engine implications (evidence-based, not folklore):**
- **Two-column / sidebar layouts are the one confirmed, high-severity ATS
  risk** — flag this as a `high` severity red flag when detected (e.g. via
  large horizontal position variance per text line from `pdfjs` positions).
- **Contact info must appear in the body of page one, not only in a running
  header/footer** — flag as a `med` severity check (some parsers drop
  header/footer content as boilerplate).
- **Non-standard section headings** (creative naming instead of "Experience"/
  "Education"/"Skills") measurably degrade parsing — flag as `low`-`med`,
  suggest the conventional heading names.
- **Do NOT flag** skills grids/tables or em-dashes/curly-quote punctuation as
  ATS risks — this is commonly-repeated advice this benchmark shows is false;
  excluding it avoids the product giving confidently wrong guidance.
