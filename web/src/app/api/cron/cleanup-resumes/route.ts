import { NextResponse, type NextRequest } from "next/server";
import { getAdminClient } from "@/lib/supabase/server";

/**
 * GET /api/cron/cleanup-resumes — retention enforcement for uploaded resumes
 * (Phase 5). Deletes originals older than RETENTION_DAYS: the storage object
 * first, then the metadata row (so a failed storage delete never leaves an
 * orphaned row that looks like a still-valid file).
 *
 * Triggered by Vercel Cron (see vercel.json) on a schedule, authenticated by
 * a shared secret Vercel sends as `Authorization: Bearer <CRON_SECRET>` —
 * never runs on an unauthenticated request, so this can't be used to bulk-
 * delete on demand by anyone who finds the URL.
 */

const RETENTION_DAYS = 30;
const BATCH_SIZE = 200; // cap per run so one invocation can't run indefinitely

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const admin = getAdminClient();
  if (!admin) return NextResponse.json({ ok: true, deleted: 0, note: "supabase not configured" });

  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const { data: rows, error: selErr } = await admin
    .from("resumes")
    .select("id, storage_path")
    .lt("uploaded_at", cutoff)
    .limit(BATCH_SIZE);
  if (selErr) return NextResponse.json({ error: selErr.message }, { status: 500 });
  if (!rows || rows.length === 0) return NextResponse.json({ ok: true, deleted: 0 });

  const paths = rows.map((r) => r.storage_path as string);
  const { error: storageErr } = await admin.storage.from("resumes").remove(paths);
  if (storageErr) return NextResponse.json({ error: storageErr.message }, { status: 500 });

  const ids = rows.map((r) => r.id as string);
  const { error: delErr } = await admin.from("resumes").delete().in("id", ids);
  if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 });

  return NextResponse.json({ ok: true, deleted: ids.length });
}
