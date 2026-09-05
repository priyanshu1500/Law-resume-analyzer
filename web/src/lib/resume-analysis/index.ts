import "server-only";
import { extractResume } from "./extract";
import { buildEvidence } from "./evidence";
import { runRules } from "./rules";
import type { Findings } from "./types";

export type { Findings, Evidence, ExtractedDoc } from "./types";

/** Full pipeline: raw file bytes -> Findings. Pure and deterministic — no
 * network calls, no LLM (that's Phase 6). Safe to call repeatedly / test. */
export async function analyzeResume(buf: Buffer, mime: string): Promise<Findings> {
  const doc = await extractResume(buf, mime);
  const evidence = buildEvidence(doc);
  return runRules(evidence);
}
