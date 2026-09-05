import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "node:crypto";
import { analyzeResume } from "@/lib/resume-analysis";
import { getServerClient, getAdminClient } from "@/lib/supabase/server";
import { isAuthConfigured } from "@/lib/supabase/config";

/**
 * POST /api/analyze — multipart form with a `file` field (PDF or DOCX).
 * Returns real, deterministic Findings (Phase 2 engine, no LLM call here).
 *
 * Security posture (Phase 5 — upload pipeline security):
 * - Validates real file bytes (magic number), not just the client-supplied
 *   Content-Type, and hard-caps size — a client can't lie its way past this.
 * - Rejects macro-enabled Office documents (a .docm renamed to .docx passes
 *   the ZIP magic-byte check, so we also scan for the macro-project marker).
 * - Requires a signed-in user once auth is configured (Phase 4) — no
 *   anonymous resume analysis. Stays open when auth isn't configured yet
 *   (local/demo), matching every other route's isAuthConfigured pattern.
 * - When signed in, the original file is written to the private "resumes"
 *   Storage bucket (per-user folder, RLS-enforced — see supabase-schema.sql)
 *   and indexed in public.resumes, so a user can revisit their report and
 *   the paid rewrite tier has the real file to work from. This is
 *   best-effort and never blocks returning the analysis: if storage fails,
 *   we log and still return Findings — losing the stored copy is recoverable
 *   (re-upload), losing the report the user is waiting on is not.
 * - Retention: originals are deleted automatically after 30 days by
 *   /api/cron/cleanup-resumes (see vercel.json).
 * - Does NOT yet check payment entitlement — that's Phase 7, once Razorpay
 *   is wired up. Being signed in is necessary but not sufficient once that
 *   lands; don't treat this route as the final gate.
 * - No rate limiting yet (Phase 8) — acceptable while there's no paid LLM
 *   call behind it (there isn't one yet; Phase 6 adds that, gated separately).
 */

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const PDF_MAGIC = Buffer.from("%PDF");
const DOCX_MAGIC = Buffer.from([0x50, 0x4b, 0x03, 0x04]); // ZIP local-file header (docx is a zip)
const DOCM_MARKER = Buffer.from("word/vbaProject.bin"); // present in the zip's file-name table for any macro-enabled Word doc

function sniffMime(buf: Buffer): string | null {
  if (buf.subarray(0, 4).equals(PDF_MAGIC)) return "application/pdf";
  if (buf.subarray(0, 4).equals(DOCX_MAGIC)) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  return null;
}

/** A .docm (macro-enabled) file renamed to .docx has the identical ZIP magic
 * bytes — reject it by scanning for the VBA project marker every
 * macro-enabled Office file contains, regardless of extension. */
function containsMacro(buf: Buffer): boolean {
  return buf.includes(DOCM_MARKER);
}

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export async function POST(request: NextRequest) {
  let userId: string | null = null;
  if (isAuthConfigured) {
    const sb = await getServerClient();
    const { data: auth } = (await sb?.auth.getUser()) ?? { data: { user: null } };
    if (!auth.user) return NextResponse.json({ error: "sign in required" }, { status: 401 });
    userId = auth.user.id;
  }

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
  if (mime === DOCX_MIME && containsMacro(buf)) {
    return NextResponse.json({ error: "macro-enabled Word documents aren't accepted — save as a plain .docx or PDF" }, { status: 415 });
  }

  let findings;
  try {
    findings = await analyzeResume(buf, mime);
  } catch (err) {
    console.error("analyze failed", err instanceof Error ? err.message : err); // no resume content logged
    return NextResponse.json({ error: "could not analyze this file" }, { status: 422 });
  }

  if (userId) {
    void storeResumeBestEffort({ userId, buf, mime, originalName: file.name }).catch((err) =>
      console.error("resume storage failed (non-fatal)", err instanceof Error ? err.message : err),
    );
  }

  return NextResponse.json({ findings });
}

async function storeResumeBestEffort(opts: { userId: string; buf: Buffer; mime: string; originalName: string }) {
  const admin = getAdminClient();
  if (!admin) return; // storage requires the service-role key; skip quietly if unset
  const ext = opts.mime === DOCX_MIME ? "docx" : "pdf";
  const safeName = opts.originalName.replace(/[^\w.\- ]/g, "_").slice(0, 120);
  const path = `${opts.userId}/${randomUUID()}-${safeName || `resume.${ext}`}`;

  const { error: uploadError } = await admin.storage.from("resumes").upload(path, opts.buf, {
    contentType: opts.mime,
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const { error: dbError } = await admin.from("resumes").insert({
    user_id: opts.userId,
    storage_path: path,
    original_name: opts.originalName,
    mime: opts.mime,
    size_bytes: opts.buf.byteLength,
  });
  if (dbError) throw dbError;
}
