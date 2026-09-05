import type { Evidence, Findings, Breakdown, Flag } from "./types";
import rulebook from "./rulebook.json";

const RULEBOOK_VERSION = rulebook.version as string;

function clamp(n: number, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, n));
}
function ratio(a: number, b: number) {
  return b > 0 ? a / b : 0;
}

function citationFor(code: string): string | string[] | undefined {
  const all = [
    ...(rulebook.atsChecks as { code: string; citation?: string }[]),
    ...(rulebook.redFlags as { code: string; citation?: string | string[] }[]),
  ];
  return all.find((c) => c.code === code)?.citation;
}

function contentQuality(e: Evidence): Breakdown {
  const verbRatio = ratio(e.bulletsStartingWithVerb, e.bulletsTotal);
  const weakCount = e.weakPhraseHits.reduce((s, h) => s + h.count, 0);
  const genericCount = e.genericTaskHits.reduce((s, h) => s + h.count, 0);
  let value = 55 + verbRatio * 35 - weakCount * 6 - genericCount * 8;
  const evidence: string[] = [];
  if (e.bulletsTotal > 0) evidence.push(`${Math.round(verbRatio * 100)}% of bullets open with an action verb`);
  if (weakCount) evidence.push(`${weakCount} vague duty phrase(s) found ("responsible for", "helped with"...)`);
  if (genericCount) evidence.push(`${genericCount} generic task description(s) found (e.g. unspecific "legal research")`);
  if (e.bulletsTotal === 0) { value = 30; evidence.push("No bulleted experience detail found"); }
  return { key: "Content Quality", value: clamp(Math.round(value)), evidence };
}

function legalExperience(e: Evidence): Breakdown {
  const hasExp = e.sections.some((s) => s.name === "experience");
  const hasMoot = e.sections.some((s) => s.name === "moot");
  const hasPub = e.sections.some((s) => s.name === "publications");
  const expWords = e.sections.find((s) => s.name === "experience")?.wordCount ?? 0;
  let value = 40 + (hasExp ? 25 : 0) + (hasMoot ? 15 : 0) + (hasPub ? 10 : 0) + clamp(expWords / 8, 0, 10);
  const evidence: string[] = [];
  evidence.push(hasExp ? "Experience section present" : "No Experience/Internships section found");
  if (hasMoot) evidence.push("Moot court participation listed");
  if (hasPub) evidence.push("Publication(s) listed");
  return { key: "Legal Experience", value: clamp(Math.round(value)), evidence };
}

function skillsAbilities(e: Evidence): Breakdown {
  const hasSkills = e.sections.some((s) => s.name === "skills");
  const areaHits = Object.keys(e.practiceAreaKeywordHits).length;
  let value = 45 + (hasSkills ? 20 : 0) + clamp(areaHits * 8, 0, 35);
  const evidence: string[] = [];
  evidence.push(hasSkills ? "Skills section present" : "No dedicated Skills section found");
  if (areaHits) evidence.push(`Vocabulary matched to ${areaHits} practice area(s)`);
  return { key: "Skills & Abilities", value: clamp(Math.round(value)), evidence };
}

function achievementsImpact(e: Evidence): Breakdown {
  const quantRatio = ratio(e.bulletsWithNumbers, e.bulletsTotal);
  const hasHonors = e.sections.some((s) => s.name === "honors");
  const hasMootOrPub = e.sections.some((s) => s.name === "moot" || s.name === "publications");
  let value = 45 + quantRatio * 35 + (hasHonors ? 10 : 0) + (hasMootOrPub ? 10 : 0);
  const evidence: string[] = [];
  if (e.bulletsTotal > 0) evidence.push(`${Math.round(quantRatio * 100)}% of bullets are quantified (numbers, %, amounts)`);
  else evidence.push("No bullets to quantify");
  if (!hasHonors) evidence.push("No Honors/Awards section found");
  return { key: "Achievements & Impact", value: clamp(Math.round(value)), evidence };
}

function presentationClarity(e: Evidence): Breakdown {
  let value = 90;
  const evidence: string[] = [];
  if (e.layout.twoColumnLikely) { value -= 30; evidence.push("Two-column layout detected  -  the single highest-risk ATS/readability issue"); }
  if (e.layout.nonStandardHeadings.length) { value -= 6 * e.layout.nonStandardHeadings.length; evidence.push(`Non-standard section heading(s): ${e.layout.nonStandardHeadings.join(", ")}`); }
  if (e.dateFormats.length > 1) { value -= 10; evidence.push("Inconsistent date formats across the document"); }
  if (e.hasReferencesLine) { value -= 5; evidence.push('"References available upon request" line found  -  remove it'); }
  if (e.personalFieldsPresent.length) { value -= 6 * e.personalFieldsPresent.length; evidence.push(`Personal field(s) present that shouldn't be: ${e.personalFieldsPresent.join(", ")}`); }
  if (e.layout.contactOnlyInHeaderFooter) { value -= 10; evidence.push("Contact info only appears in a repeated page header"); }
  if (e.doc.looksImageOnly) { value = 5; evidence.push("Document text could not be extracted  -  likely an image-only / scanned PDF"); }
  if (evidence.length === 0) evidence.push("No formatting issues detected");
  return { key: "Presentation & Clarity", value: clamp(Math.round(value)), evidence };
}

function buildFlags(e: Evidence): { redFlags: Flag[]; atsFlags: Flag[] } {
  const redFlags: Flag[] = [];
  const atsFlags: Flag[] = [];

  if (e.doc.looksImageOnly) {
    atsFlags.push({ code: "image_only_pdf", severity: "high", message: "This looks like a scanned or image-only PDF  -  most ATS systems cannot read it at all. Export a real text-based PDF." });
  }
  if (e.layout.twoColumnLikely) {
    atsFlags.push({ code: "two_column_layout", severity: "high", message: "Two-column layout detected  -  confirmed in controlled ATS testing to scramble reading order.", citation: citationFor("two_column_layout") });
  }
  if (e.layout.contactOnlyInHeaderFooter) {
    atsFlags.push({ code: "contact_in_header_only", severity: "med", message: "Contact info appears only in a repeated page header  -  some ATS engines discard header/footer content.", citation: citationFor("contact_in_header_only") });
  }
  if (e.layout.nonStandardHeadings.length) {
    atsFlags.push({ code: "nonstandard_section_headings", severity: "low", message: `Rename these to conventional headings (Experience, Education, Skills): ${e.layout.nonStandardHeadings.join(", ")}.`, citation: citationFor("nonstandard_section_headings") });
  }

  for (const h of e.weakPhraseHits) {
    redFlags.push({ code: "weak_phrase", severity: "med", message: `Vague phrasing "${h.phrase}" used ${h.count}x  -  replace with a specific verb and task.`, citation: rulebook.weakPhrases.citation as string[] });
  }
  for (const h of e.genericTaskHits) {
    redFlags.push({ code: "generic_task", severity: "med", message: `"${h.phrase}" used ${h.count}x without specifics  -  state the actual work done.`, citation: rulebook.genericTaskFlags.citation as string });
  }
  if (e.personalFieldsPresent.length) {
    redFlags.push({ code: "personal_fields", severity: "med", message: `Remove personal fields not relevant to professional evaluation: ${e.personalFieldsPresent.join(", ")}.`, citation: "TLC-CV" });
  }
  if (e.hasReferencesLine) {
    redFlags.push({ code: "references_line", severity: "low", message: '"References available upon request" wastes space  -  drop it.', citation: "HLS-LAYOUT" });
  }
  if (e.dateFormats.length > 1) {
    redFlags.push({ code: "inconsistent_dates", severity: "med", message: "Use one consistent date format throughout the resume.", citation: ["HLS-WORKSHOP", "HLS-LAYOUT"] });
  }
  if (e.doc.format === "docx") {
    redFlags.push({ code: "not_pdf", severity: "low", message: "Submit as PDF  -  it's the format recruiters and most ATS pipelines expect.", citation: "TLC-CV" });
  }

  return { redFlags, atsFlags };
}

function buildStrengths(e: Evidence): string[] {
  const s: string[] = [];
  if (e.sections.some((x) => x.name === "moot")) s.push("Moot court participation is a strong, market-recognised credibility signal.");
  if (e.sections.some((x) => x.name === "publications")) s.push("A listed publication strengthens the substantive-work story.");
  if (ratio(e.bulletsStartingWithVerb, e.bulletsTotal) >= 0.6 && e.bulletsTotal > 0) s.push("Most bullets open with a strong action verb.");
  if (ratio(e.bulletsWithNumbers, e.bulletsTotal) >= 0.4 && e.bulletsTotal > 0) s.push("Achievements are meaningfully quantified.");
  if (Object.keys(e.practiceAreaKeywordHits).length >= 2) s.push("Resume vocabulary signals a coherent, declared practice-area interest rather than an unfocused spread.");
  if (s.length === 0) s.push("Document structure is readable and extractable.");
  return s;
}

export function runRules(e: Evidence): Findings {
  const breakdown = [contentQuality(e), legalExperience(e), skillsAbilities(e), achievementsImpact(e), presentationClarity(e)];
  const overallScore = Math.round(breakdown.reduce((s, b) => s + b.value, 0) / breakdown.length);
  const band = overallScore >= 85 ? "Excellent" : overallScore >= 70 ? "Good Potential" : overallScore >= 50 ? "Needs Work" : "Early Stage";
  const { redFlags, atsFlags } = buildFlags(e);
  const strengths = buildStrengths(e);
  // Prioritized fixes are no longer computed here — that's the
  // Recommendation Engine's job (src/lib/recommend.ts, Phase 3), which
  // merges these flags with Practice Compass career actions into one
  // ranked list instead of each surface prioritizing independently.

  const keywordMatch = Object.entries(e.practiceAreaKeywordHits).map(([practiceArea, matched]) => ({
    practiceArea,
    matched,
    pct: clamp(Math.round((matched.length / 6) * 100)),
  }));

  const requiredSections = rulebook.requiredSections as string[];
  const sectionsOut = requiredSections.map((name) => {
    const found = e.sections.find((s) => s.name === name);
    return { name, present: !!found, wordCount: found?.wordCount ?? 0 };
  });

  return {
    version: RULEBOOK_VERSION,
    overallScore,
    band,
    breakdown,
    redFlags,
    atsFlags,
    strengths,
    keywordMatch,
    quantification: { bulletsTotal: e.bulletsTotal, bulletsWithNumbers: e.bulletsWithNumbers },
    sections: sectionsOut,
    looksImageOnly: e.doc.looksImageOnly,
  };
}
