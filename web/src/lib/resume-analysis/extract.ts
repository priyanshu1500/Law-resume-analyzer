import "server-only";
import type { ExtractedDoc, TextLine } from "./types";

/**
 * Text + rough layout extraction. Server-only: never bundle a PDF parser into
 * the client. PDF -> pdfjs-dist (legacy/Node build, gives us x/y positions for
 * layout-risk checks). DOCX -> mammoth (plain text only; DOCX column/section
 * layout checks are a known gap, see rulebook.json knownGaps).
 *
 * Deliberately conservative: a timeout and a hard page cap so a malformed or
 * huge file can't hang or exhaust a serverless function (hardened further in
 * Phase 5 — upload pipeline security).
 */

const MAX_PAGES = 12;
const EXTRACT_TIMEOUT_MS = 15_000;
const HEADER_FOOTER_BAND = 0.08; // top/bottom 8% of the page counts as header/footer

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`${label} timed out`)), ms)),
  ]);
}

async function extractPdf(buf: Buffer): Promise<ExtractedDoc> {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  // Bundlers (Turbopack/webpack) mangle pdfjs's own dynamic import of its
  // worker script, so point it at the real file on disk explicitly instead
  // of relying on auto-detection — this is the standard fix for running
  // pdfjs-dist server-side inside a Next.js route handler.
  {
    const { pathToFileURL } = await import("node:url");
    const path = await import("node:path");
    const workerPath = path.join(process.cwd(), "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs");
    pdfjsLib.GlobalWorkerOptions.workerSrc = pathToFileURL(workerPath).href;
  }
  const data = new Uint8Array(buf);
  const doc = await withTimeout(
    pdfjsLib.getDocument({ data, useWorkerFetch: false, disableFontFace: true }).promise,
    EXTRACT_TIMEOUT_MS,
    "pdf load",
  );

  const pageCount = Math.min(doc.numPages, MAX_PAGES);
  const lines: TextLine[] = [];

  for (let p = 1; p <= pageCount; p++) {
    // eslint-disable-next-line no-await-in-loop
    const page = await withTimeout(doc.getPage(p), EXTRACT_TIMEOUT_MS, `pdf page ${p}`);
    const viewport = page.getViewport({ scale: 1 });
    // eslint-disable-next-line no-await-in-loop
    const content = await withTimeout(page.getTextContent(), EXTRACT_TIMEOUT_MS, `pdf text ${p}`);

    for (const item of content.items as { str?: string; transform?: number[] }[]) {
      const text = (item.str ?? "").trim();
      if (!text) continue;
      const x = item.transform?.[4] ?? 0;
      const yRaw = item.transform?.[5] ?? 0;
      const y = viewport.height - yRaw; // top-down, so header/footer bands are intuitive
      const inHeaderFooter = y < viewport.height * HEADER_FOOTER_BAND || y > viewport.height * (1 - HEADER_FOOTER_BAND);
      lines.push({ text, page: p, x, y, inHeaderFooter });
    }
  }

  // Merge same-line text fragments (pdfjs splits runs into separate items),
  // grouped by (page, rounded y). Critically, within a y-row we only merge
  // items that are actually adjacent in x (gap < COLUMN_GAP) — a two-column
  // layout puts unrelated left/right text on the *same* y-row, and merging
  // across that gap would destroy the x-position signal the layout-risk
  // check (two-column detection) depends on.
  const COLUMN_GAP = 60; // pt; a bigger x-jump than this on one row = a new column/segment, not a run split
  const rows = new Map<string, TextLine[]>();
  for (const l of lines) {
    const key = `${l.page}:${Math.round(l.y / 3)}`;
    if (!rows.has(key)) rows.set(key, []);
    rows.get(key)!.push(l);
  }
  const merged: TextLine[] = [];
  for (const group of rows.values()) {
    group.sort((a, b) => a.x - b.x);
    let run: TextLine[] = [];
    const flush = () => {
      if (!run.length) return;
      merged.push({
        text: run.map((g) => g.text).join(" ").replace(/\s+/g, " ").trim(),
        page: run[0].page,
        x: run[0].x,
        y: run[0].y,
        inHeaderFooter: run[0].inHeaderFooter,
      });
      run = [];
    };
    for (const item of group) {
      const prev = run[run.length - 1];
      if (prev && item.x - prev.x > COLUMN_GAP) flush();
      run.push(item);
    }
    flush();
  }
  merged.sort((a, b) => a.page - b.page || a.y - b.y);

  const text = merged.map((l) => l.text).join("\n");
  const looksImageOnly = text.replace(/\s/g, "").length < 20 && doc.numPages > 0;

  return { format: "pdf", pageCount, lines: merged, text, looksImageOnly };
}

async function extractDocx(buf: Buffer): Promise<ExtractedDoc> {
  const mammoth = (await import("mammoth")).default;
  const result = await withTimeout(mammoth.extractRawText({ buffer: buf }), EXTRACT_TIMEOUT_MS, "docx extract");
  const rawLines = result.value.split(/\r?\n/).map((t) => t.trim()).filter(Boolean);
  const lines: TextLine[] = rawLines.map((text, i) => ({ text, page: 1, x: 0, y: i, inHeaderFooter: false }));
  return {
    format: "docx",
    pageCount: 1,
    lines,
    text: rawLines.join("\n"),
    looksImageOnly: false,
  };
}

export async function extractResume(buf: Buffer, mime: string): Promise<ExtractedDoc> {
  if (mime === "application/pdf") return extractPdf(buf);
  if (mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return extractDocx(buf);
  throw new Error(`unsupported mime type: ${mime}`);
}
