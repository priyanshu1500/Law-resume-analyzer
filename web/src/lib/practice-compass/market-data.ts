/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Market Data — the third data layer in the Career Intelligence architecture
 * (Resume Data / Practice Data / Market Data). Extends `data.ts` rather than
 * forking it: same 18 practice-area keys as `P`/`ENTRY`.
 *
 * Sourced from docs/research/raw/tier5-market-data.md (agent-reach research,
 * 2026-09-05). Every fact below carries a citation; this file is intentionally
 * incomplete where the research pass found no reliable source — see
 * `KNOWN_GAPS`. Extend it as more research lands; don't invent firm-specific
 * facts to fill gaps.
 *
 * Consumers: the resume Rules Engine (screening context in advice copy) and,
 * per the content-creation rules, the reel research pipeline can draw on the
 * same firm/tier facts — one Market Data layer, two products.
 */

export type MarketCitation =
  | "JOBAAJ-FIRMS"   // jobaaj.com — How to Secure an Internship at Top Law Firms, 2025-12-01
  | "NLUD-RCC";      // NLU Delhi Recruitment Coordination Committee policy + brochure

/** Named Tier-1 Indian corporate firms per source; treat as illustrative, not
 * exhaustive — the source names AZB, Khaitan, CAM explicitly as a cluster;
 * the wider "Tier 1" grouping in general industry commentary (SAM, Trilegal,
 * JSA, S&R) is common convention, not this source's own claim. */
export const TIER1_FIRMS: { name: string; citation: MarketCitation }[] = [
  { name: "AZB & Partners", citation: "JOBAAJ-FIRMS" },
  { name: "Khaitan & Co", citation: "JOBAAJ-FIRMS" },
  { name: "Cyril Amarchand Mangaldas", citation: "JOBAAJ-FIRMS" },
];

/** General Tier-1 corporate-firm screening facts — not practice-area specific
 * (the research pass did not find area-by-area screening criteria; see
 * KNOWN_GAPS). Applies broadly to corporate/transactional practice areas. */
export const TIER1_SCREENING = {
  cgpaCutoffRange: [7.5, 8.0] as [number, number],
  cgpaNote:
    "Tier-1 firms commonly screen on CGPA in this range; applications below it often go unread regardless of other merits.",
  resumeWants: [
    "clean, plain formatting — no decorative fonts or colours",
    "CGPA displayed prominently",
    "internship entries with specific work done, not generic \"legal research\"",
    "achievements, awards, publications, moots",
    "relevant skills: drafting, research, languages",
    "relevant certifications",
  ],
  citation: "JOBAAJ-FIRMS" as MarketCitation,
};

/** Career-building signals the market rewards, independent of the resume's
 * writing quality — feeds the Evidence Graph / Recommendation Engine. */
export const MARKET_SIGNALS: { code: string; weight: "high" | "med" | "low"; note: string; citation: MarketCitation }[] = [
  { code: "moot_court", weight: "high", note: "Builds research/drafting/speaking skill and firm connections through senior mooters.", citation: "JOBAAJ-FIRMS" },
  { code: "committee_leadership", weight: "med", note: "Editorial boards, organising committees — signals management, not just research capability.", citation: "JOBAAJ-FIRMS" },
  { code: "declared_specialisation", weight: "high", note: "A developed, declared practice-area interest outperforms an unfocused internship spread.", citation: "JOBAAJ-FIRMS" },
  { code: "progressive_internship_ladder", weight: "low", note: "Smaller firms/practitioners before Tier-1 applications is the market-endorsed path for early years.", citation: "JOBAAJ-FIRMS" },
  { code: "internship_diversity", weight: "med", note: "Diverse internship spread across firms/chambers/judicial settings is an explicit placement-committee credibility signal.", citation: "NLUD-RCC" },
];

/** Per-area market notes, keyed identically to `P`/`ENTRY` in `data.ts`.
 * Only populated where the research pass found a sourced fact; absent keys
 * fall back to the general TIER1_SCREENING facts above — this is deliberate,
 * not an oversight (see KNOWN_GAPS). */
export const AREA_MARKET_NOTES: Record<string, { note: string; citation: MarketCitation }[]> = {
  ma: [{ note: "Corporate/M&A is the practice area the Tier-1-firm screening facts above most directly describe (diligence, drafting-heavy internship work).", citation: "JOBAAJ-FIRMS" }],
};

export const KNOWN_GAPS = [
  "Firm-specific or practice-area-specific screening criteria beyond the general Tier-1 corporate signals above (e.g. what an M&A team screens for vs. a disputes team specifically).",
  "Litigation-chamber-side hiring criteria — this research pass surfaced firm-side data more than chamber-side.",
];
