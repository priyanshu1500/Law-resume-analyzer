import { NextResponse, type NextRequest } from "next/server";
import { analyzeResume } from "@/lib/resume-analysis";

/**
 * POST /api/analyze — multipart form with a `file` field (PDF or DOCX).
 * Returns real, deterministic Findings (Phase 2 engine, no LLM call here).
 *
 * Security posture for THIS phase (intentionally minimal, not final):
 * - Validates real file bytes (magic number), not just the client-supplied
 *   Content-Type, and hard-caps size — a client can't lie its way past this.
 * - The file is processed in memory and never written to disk or storage —
 *   no data-at-rest risk yet, which is deliberate: private-bucket storage +
 *   retention policy is Phase 5 (Upload pipeline security).
 * - NOT YET behind auth/entitlement — that's Phase 4 (RLS) + Phase 7
 *   (payments wired to real entitlement). Do not treat this route as
 *   production-ready to expose broadly until those land; it's the engine's
 *   development/integration endpoint for now.
 * - No rate limiting yet (Phase 5/8) — fine while there's no paid LLM call
 *   behind it (there isn't one yet; Phase 6 adds that, gated separately).
 */

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const PDF_MAGIC = Buffer.from("%PDF");
const DOCX_MAGIC = Buffer.from([0x50, 0x4b, 0x03, 0x04]); // ZIP local-file header (docx is a zip)

function sniffMime(buf: Buffer): string | null {
  if (buf.subarray(0, 4).equals(PDF_MAGIC)) return "application/pdf";
  if (buf.subarray(0, 4).equals(DOCX_MAGIC)) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  return null;
}

export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "expected multipart/form-data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing file field" }, { status: 400 });
  }
  if (file.size === 0 || file.size > MAX_BYTES) {
    return NextResponse.json({ error: "file must be non-empty and under 5MB" }, { status: 413 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const mime = sniffMime(buf);
  if (!mime) {
    return NextResponse.json({ error: "unsupported file type — upload a PDF or DOCX" }, { status: 415 });
  }

  try {
    const findings = await analyzeResume(buf, mime);
    return NextResponse.json({ findings });
  } catch (err) {
    console.error("analyze failed", err instanceof Error ? err.message : err); // no resume content logged
    return NextResponse.json({ error: "could not analyze this file" }, { status: 422 });
  }
}
