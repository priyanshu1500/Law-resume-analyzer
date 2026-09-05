/**
 * Shared types for the resume-analysis engine (Career Intelligence Phase 2:
 * Evidence Graph + Rules Engine). See docs/resume-analysis-architecture-plan.md.
 */

/** A single line of extracted text, with page-relative position when the
 * source format provides it (PDF via pdfjs). Positions are used only for
 * layout-risk checks (e.g. two-column detection) — never for scoring content. */
export interface TextLine {
  text: string;
  page: number;
  x: number;
  y: number;
  /** true if this line came from a page header/footer region (top/bottom ~8%) */
  inHeaderFooter: boolean;
}

export interface ExtractedDoc {
  /** "pdf" | "docx" */
  format: "pdf" | "docx";
  pageCount: number;
  /** Flattened reading-order text, one entry per line. */
  lines: TextLine[];
  /** Full plain text (lines joined) — convenience for regex passes that don't
   * need position. */
  text: string;
  /** true when extraction yielded near-empty text from a non-empty file —
   * the classic signature of an image-only / scanned PDF. */
  looksImageOnly: boolean;
}

export type Severity = "low" | "med" | "high";

export interface Section {
  name: string;                 // normalized: "education" | "experience" | ...
  rawHeading: string;            // the heading text as it appeared
  startLine: number;
  bullets: string[];             // bullet-like lines under this section
  wordCount: number;
}

/** The Evidence Graph's per-resume node set — structured facts pulled from the
 * document, before any scoring judgement is applied. */
export interface Evidence {
  doc: ExtractedDoc;
  sections: Section[];
  contact: { email: boolean; phone: boolean };
  personalFieldsPresent: string[];   // e.g. ["dateOfBirth","gender","religion"]
  hasPhoto: boolean;
  hasObjectiveSection: boolean;
  hasReferencesLine: boolean;
  dateFormats: string[];             // distinct date-format patterns observed
  layout: {
    twoColumnLikely: boolean;
    contactOnlyInHeaderFooter: boolean;
    nonStandardHeadings: string[];   // headings that didn't normalize to a known section
  };
  bulletsTotal: number;
  bulletsWithNumbers: number;
  bulletsStartingWithVerb: number;
  weakPhraseHits: { phrase: string; count: number }[];
  genericTaskHits: { phrase: string; count: number }[];
  verbHits: { verb: string; count: number }[];
  practiceAreaKeywordHits: Record<string, string[]>;  // area key -> matched keywords
}

export interface Breakdown {
  key: string;
  value: number;             // 0-100
  evidence: string[];        // short human-readable evidence lines
}

export interface Flag {
  code: string;
  severity: Severity;
  message: string;
  citation?: string | string[];
}

export interface Fix {
  code: string;
  detail: string;
  priority: number;          // lower = do first
}

export interface Findings {
  version: string;            // rulebook version this was computed against
  overallScore: number;
  band: string;
  breakdown: Breakdown[];
  redFlags: Flag[];
  atsFlags: Flag[];
  strengths: string[];
  fixes: Fix[];
  keywordMatch: { practiceArea: string; matched: string[]; pct: number }[];
  quantification: { bulletsTotal: number; bulletsWithNumbers: number };
  sections: { name: string; present: boolean; wordCount: number }[];
  looksImageOnly: boolean;
}
