import type { ExtractedDoc, Evidence, Section, TextLine } from "./types";
import rulebook from "./rulebook.json";

/** Canonical section name -> heading synonyms it should match (lowercase). */
const SECTION_SYNONYMS: Record<string, string[]> = {
  education: ["education", "academic qualifications", "academics"],
  experience: [
    "experience", "internships", "internship", "work experience", "employment",
    "professional experience", "legal experience", "internship experience",
  ],
  honors: ["honors", "honours", "awards", "achievements"],
  activities: ["activities", "extracurricular", "extra-curricular", "positions of responsibility", "committees"],
  publications: ["publications", "thesis", "research papers"],
  moot: ["moot court", "moots", "moot court competitions", "moot court & publications"],
  skills: ["skills", "skills and interests", "skills & interests", "technical skills", "languages"],
  certifications: ["certifications", "certificates", "courses"],
  references: ["references"],
  objective: ["objective", "career objective", "profile summary", "summary"],
};
const ALL_SYNONYMS = Object.entries(SECTION_SYNONYMS).flatMap(([k, arr]) => arr.map((s) => [s, k] as const));

function matchHeading(line: string): { name: string; raw: string } | null {
  const norm = line.toLowerCase().replace(/[:.]+$/, "").trim();
  if (norm.length === 0 || norm.length > 45) return null;
  if (/^[-•*]/.test(line.trim())) return null; // bullets aren't headings
  for (const [syn, canon] of ALL_SYNONYMS) {
    if (norm === syn || norm.startsWith(syn + " ") || norm === syn.replace(/s$/, "")) {
      return { name: canon, raw: line.trim() };
    }
  }
  // ALL-CAPS short line with no digits/@ is a plausible custom heading
  if (line.trim().length <= 40 && line === line.toUpperCase() && /[A-Z]/.test(line) && !/[@0-9]/.test(line)) {
    return { name: `other:${norm}`, raw: line.trim() };
  }
  return null;
}

function isBullet(line: string): boolean {
  return /^[-•*•]/.test(line.trim()) || /^\d+[.)]\s/.test(line.trim());
}

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?\d[\d\s-]{8,}\d)/;
const DOB_RE = /\b(date of birth|dob)\b/i;
const GENDER_RE = /\bgender\s*[:\-]/i;
const RELIGION_RE = /\breligion\s*[:\-]/i;
const ADDRESS_RE = /\b\d{6}\b|\bsector\s?\d|\bhouse no\b/i;
const REFERENCES_LINE_RE = /references\s+(available\s+)?(upon|on)\s+request/i;
const PASSIVE_RE = new RegExp(rulebook.passiveVoicePattern, "i");
const QUANT_RES = (rulebook.quantificationPatterns as string[]).map((p) => new RegExp(p, "i"));

const DATE_PATTERNS: [string, RegExp][] = [
  ["mon-yyyy", /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4}\b/i],
  ["season-yyyy", /\b(summer|winter|spring|fall|autumn)\s+\d{4}\b/i],
  ["yyyy-yyyy", /(19|20)\d{2}\s?-\s?(19|20)\d{2}/],
  ["dd-mm-yyyy", /\b\d{1,2}[/.]\d{1,2}[/.]\d{2,4}\b/],
];

/** Curated legal-practice-area keyword hints, general domain knowledge (NOT
 * research-sourced like rulebook.json  -  see knownGaps). Covers a representative
 * subset of the 18 Practice Compass areas; extend over time rather than
 * blocking on full coverage. */
const AREA_KEYWORDS: Record<string, string[]> = {
  ma: ["merger", "acquisition", "due diligence", "share purchase", "conditions precedent", "private equity"],
  bank: ["loan agreement", "facility agreement", "lender", "security documents", "banking"],
  capm: ["ipo", "listing", "sebi", "prospectus", "capital markets"],
  insol: ["insolvency", "ibc", "nclt", "resolution plan", "liquidation"],
  clit: ["arbitration", "litigation", "hearing", "pleadings", "dispute resolution"],
  wc: ["white collar", "fraud", "investigation", "compliance"],
  crim: ["criminal", "bail", "sessions court", "fir"],
  comp: ["competition law", "cci", "antitrust"],
  tax: ["tax", "gst", "income tax", "tribunal"],
  tech: ["data protection", "technology law", "privacy", "cyber"],
  ip: ["patent", "trademark", "copyright", "intellectual property"],
  emp: ["employment law", "labour", "hr policy"],
  re: ["real estate", "title diligence", "property law"],
  proj: ["project finance", "infrastructure", "energy"],
  fam: ["family law", "matrimonial", "custody"],
};

export function buildEvidence(doc: ExtractedDoc): Evidence {
  const lines = doc.lines.map((l) => l.text);
  const sections: Section[] = [];
  let current: Section | null = null;
  const nonStandardHeadings: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (!raw.trim()) continue;
    const h = matchHeading(raw);
    if (h) {
      if (current) sections.push(current);
      current = { name: h.name, rawHeading: h.raw, startLine: i, bullets: [], wordCount: 0 };
      if (h.name.startsWith("other:")) nonStandardHeadings.push(h.raw);
      continue;
    }
    if (current) {
      current.wordCount += raw.split(/\s+/).filter(Boolean).length;
      if (isBullet(raw) || current.bullets.length < 40) current.bullets.push(raw);
    }
  }
  if (current) sections.push(current);

  const fullText = doc.text;
  const contact = { email: EMAIL_RE.test(fullText), phone: PHONE_RE.test(fullText) };

  const personalFieldsPresent: string[] = [];
  if (DOB_RE.test(fullText)) personalFieldsPresent.push("dateOfBirth");
  if (GENDER_RE.test(fullText)) personalFieldsPresent.push("gender");
  if (RELIGION_RE.test(fullText)) personalFieldsPresent.push("religion");
  if (ADDRESS_RE.test(fullText)) personalFieldsPresent.push("fullResidentialAddress");

  const hasObjectiveSection = sections.some((s) => s.name === "objective");
  const hasReferencesLine = REFERENCES_LINE_RE.test(fullText);

  const dateFormats = DATE_PATTERNS.filter(([, re]) => re.test(fullText)).map(([name]) => name);

  // -- layout: two-column detection via x-position clustering (PDF only; docx has no positions)
  let twoColumnLikely = false;
  let contactOnlyInHeaderFooter = false;
  if (doc.format === "pdf") {
    const nonHF = doc.lines.filter((l) => !l.inHeaderFooter);
    const buckets = new Map<number, number>();
    for (const l of nonHF) {
      const bx = Math.round(l.x / 15) * 15;
      buckets.set(bx, (buckets.get(bx) ?? 0) + 1);
    }
    const strong = [...buckets.entries()].filter(([, count]) => count >= 3).map(([x]) => x).sort((a, b) => a - b);
    for (let i = 0; i < strong.length; i++) {
      for (let j = i + 1; j < strong.length; j++) {
        if (strong[j] - strong[i] > 150) { twoColumnLikely = true; break; }
      }
      if (twoColumnLikely) break;
    }
    if (doc.pageCount > 1) {
      const emailLines = doc.lines.filter((l) => EMAIL_RE.test(l.text));
      contactOnlyInHeaderFooter = emailLines.length > 0 && emailLines.every((l) => l.inHeaderFooter);
    }
  }

  // -- bullet / verb / quantification stats (scan bullet-like lines across all sections)
  const allBullets = sections.flatMap((s) => s.bullets).filter((b) => b.trim().length > 0);
  const bulletsWithNumbers = allBullets.filter((b) => QUANT_RES.some((re) => re.test(b))).length;
  const bulletsStartingWithVerb = allBullets.filter((b) => {
    const stripped = b.replace(/^[-•*\d.)\s]+/, "");
    const firstWord = stripped.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, "");
    const allVerbs = [...rulebook.verbBank.general, ...rulebook.verbBank.legalIndia];
    return allVerbs.some((v) => v.split(" ")[0] === firstWord) && !PASSIVE_RE.test(b);
  }).length;

  const weakPhraseHits = (rulebook.weakPhrases.flag as string[])
    .map((phrase) => ({ phrase, count: (fullText.match(new RegExp(phrase, "gi")) ?? []).length }))
    .filter((h) => h.count > 0);
  const genericTaskHits = (rulebook.genericTaskFlags.flag as string[])
    .map((phrase) => ({ phrase, count: (fullText.match(new RegExp(phrase, "gi")) ?? []).length }))
    .filter((h) => h.count > 0);

  const verbHits = [...rulebook.verbBank.general, ...rulebook.verbBank.legalIndia]
    .map((verb) => ({ verb, count: (fullText.match(new RegExp(`\\b${verb.split(" ")[0]}`, "gi")) ?? []).length }))
    .filter((h) => h.count > 0);

  const practiceAreaKeywordHits: Record<string, string[]> = {};
  for (const [area, kws] of Object.entries(AREA_KEYWORDS)) {
    const matched = kws.filter((k) => fullText.toLowerCase().includes(k));
    if (matched.length) practiceAreaKeywordHits[area] = matched;
  }

  return {
    doc,
    sections,
    contact,
    personalFieldsPresent,
    hasPhoto: false, // not detectable from text-only extraction yet  -  see knownGaps
    hasObjectiveSection,
    hasReferencesLine,
    dateFormats,
    layout: { twoColumnLikely, contactOnlyInHeaderFooter, nonStandardHeadings },
    bulletsTotal: allBullets.length,
    bulletsWithNumbers,
    bulletsStartingWithVerb,
    weakPhraseHits,
    genericTaskHits,
    verbHits,
    practiceAreaKeywordHits,
  };
}
