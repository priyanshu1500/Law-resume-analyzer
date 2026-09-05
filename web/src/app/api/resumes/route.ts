import { NextResponse, type NextRequest } from "next/server";
import { getServerClient } from "@/lib/supabase/server";
import { isAuthConfigured } from "@/lib/supabase/config";

/** GET /api/resumes -> the signed-in user's stored resume metadata
 * (never the file bytes themselves — just what's needed to list/delete). */
export async function GET() {
  if (!isAuthConfigured) return NextResponse.json({ resumes: [] });
  const sb = await getServerClient();
  const { data: auth } = (await sb?.auth.getUser()) ?? { data: { user: null } };
  if (!sb || !auth.user) return NextResponse.json({ resumes: [] });

  // RLS also enforces this filter — .eq is defense in depth, not the only guard.
  const { data, error } = await sb
    .from("resumes")
    .select("id, original_name, mime, size_bytes, uploaded_at")
    .eq("user_id", auth.user.id)
    .order("uploaded_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ resumes: data ?? [] });
}

/** DELETE /api/resumes  { id }  -> the "delete it from your dashboard" promise.
 * Removes both the storage object and the metadata row. RLS on storage.objects
 * and public.resumes means a user can only ever reach their own rows/files
 * regardless of what id they pass — no ownership check needed beyond that. */
export async function DELETE(request: NextRequest) {
  if (!isAuthConfigured) return NextResponse.json({ error: "not configured" }, { status: 404 });
  const sb = await getServerClient();
  const { data: auth } = (await sb?.auth.getUser()) ?? { data: { user: null } };
  if (!sb || !auth.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const id = typeof body?.id === "string" ? body.id : null;
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  const { data: row, error: selErr } = await sb.from("resumes").select("storage_path").eq("id", id).maybeSingle();
  if (selErr) return NextResponse.json({ error: selErr.message }, { status: 500 });
  if (!row) return NextResponse.json({ error: "not found" }, { status: 404 }); // RLS hides other users' rows as not-found

  const { error: storageErr } = await sb.storage.from("resumes").remove([row.storage_path]);
  if (storageErr) return NextResponse.json({ error: storageErr.message }, { status: 500 });

  const { error: delErr } = await sb.from("resumes").delete().eq("id", id);
  if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
