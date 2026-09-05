/**
 * Recommendation Engine (Phase 3 of the Career Intelligence architecture).
 * One prioritized, deduplicated action list — the single source both /fit's
 * "do this week" and /report's "fix in this order" render from, instead of
 * two independently-maintained lists.
 *
 * Deterministic, zero API cost, same as the Rules Engine (rules.ts). Ranking
 * logic (not a fabricated score): a broken-formatting resume blocks
 * everything else a recruiter would notice, so high-severity ATS issues come
 * first; a real career-building action (an internship, a moot) outranks
 * wording polish because it's the highest-leverage fix available to someone
 * who has a resume at all; then resume red flags by severity; low-severity
 * polish last.
 */
import type { Findings } from "./resume-analysis/types";
import { TRY } from "./practice-compass/data";

export interface Recommendation {
  code: string;
  detail: string;
  source: "resume" | "career";
  priority: number; // 1 = do first
}

export function buildRecommendations(opts: {
  findings?: Findings | null;
  /** top practice-area key from Practice Compass (res.ord[0]); omit or pass
   * null when the fit result is "thin" (not enough signal to recommend a
   * direction) — career actions are skipped in that case. */
  topArea?: string | null;
}): Recommendation[] {
  const { findings, topArea } = opts;
  const recs: Recommendation[] = [];
  const seen = new Set<string>();
  const push = (code: string, detail: string, source: Recommendation["source"]) => {
    const key = detail.trim().toLowerCase();
    if (!detail.trim() || seen.has(key)) return;
    seen.add(key);
    recs.push({ code, detail, source, priority: 0 });
  };

  // 1. high-severity resume/ATS issues — these block everything else a
  //    recruiter would even get to notice.
  if (findings) {
    for (const f of findings.atsFlags.filter((x) => x.severity === "high")) push(f.code, f.message, "resume");
  }

  // 2. the highest-leverage action available: build real, direction-matched
  //    evidence (an internship, a moot) — outranks wording polish.
  if (topArea) {
    for (const t of TRY[topArea] ?? []) push("career_action", t, "career");
  }

  // 3. remaining resume flags, most severe first.
  if (findings) {
    const weight = { high: 0, med: 1, low: 2 } as const;
    const rest = [...findings.atsFlags.filter((x) => x.severity !== "high"), ...findings.redFlags].sort(
      (a, b) => weight[a.severity] - weight[b.severity],
    );
    for (const f of rest) push(f.code, f.message, "resume");
    // the weakest-scoring breakdown area, if not already covered above
    const weakest = [...findings.breakdown].sort((a, b) => a.value - b.value)[0];
    if (weakest) push("weakest_area", `Lowest-scoring area: ${weakest.key} (${weakest.value}/100) - ${weakest.evidence[0] ?? "see breakdown"}.`, "resume");
  }

  recs.forEach((r, i) => (r.priority = i + 1));
  return recs;
}
