import { NextResponse, type NextRequest } from "next/server";
import { getServerClient } from "@/lib/supabase/server";
import { isAuthConfigured } from "@/lib/supabase/config";

/** GET  /api/responses  -> the signed-in user's saved responses (or {}) */
export async function GET() {
  if (!isAuthConfigured) return NextResponse.json({ responses: {} });
  const sb = await getServerClient();
  if (!sb) return NextResponse.json({ responses: {} });
  const { data: auth } = await sb.auth.getUser();
  if (!auth.user) return NextResponse.json({ responses: {} }, { status: 401 });

  const { data } = await sb
    .from("responses")
    .select("data")
    .eq("user_id", auth.user.id)
    .maybeSingle();
  return NextResponse.json({ responses: data?.data ?? {} });
}

/** POST /api/responses  { responses, fitDone? }  -> upsert; merges with existing */
export async function POST(request: NextRequest) {
  if (!isAuthConfigured) return NextResponse.json({ ok: true });
  const sb = await getServerClient();
  if (!sb) return NextResponse.json({ ok: true });
  const { data: auth } = await sb.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const incoming = (body?.responses ?? {}) as Record<string, unknown>;
  if (JSON.stringify(incoming).length > 50_000) {
    return NextResponse.json({ error: "payload too large" }, { status: 413 });
  }

  const { data: existing } = await sb
    .from("responses")
    .select("data")
    .eq("user_id", auth.user.id)
    .maybeSingle();

  const merged = { ...(existing?.data ?? {}), ...incoming };
  const { error } = await sb.from("responses").upsert(
    {
      user_id: auth.user.id,
      data: merged,
      fit_done: Boolean(body?.fitDone) || undefined,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, responses: merged });
}
