# Phase 5 — Upload pipeline security

Implemented 2026-09-05. Covers `src/app/api/{analyze,resumes,cron/cleanup-resumes}/route.ts`,
`supabase-schema.sql`, `vercel.json`.

## File validation (extends Phase 2)

Already had: real magic-byte sniffing (not client Content-Type), 5MB cap,
in-memory-only processing, a 15s extraction timeout and a 12-page cap
(`extract.ts`, Phase 2) so a malformed or huge file can't hang a function.

**New this phase**: a `.docm` (macro-enabled Word document) renamed to
`.docx` has the identical ZIP magic bytes and would otherwise sail through
the existing check. Every macro-enabled Office file contains a
`word/vbaProject.bin` entry in its ZIP file-name table; `containsMacro()`
scans the raw bytes for that marker and rejects the upload (415) regardless
of what extension the client claims. Verified against a synthetic file with
the marker bytes.

## Private storage + signed access (RLS-enforced, not just by convention)

- New private bucket `resumes` (`public: false`).
- Path convention `resumes/{user_id}/{uuid}-{name}` is **enforced by RLS
  policy**, not just followed by our code: `storage.objects` policies check
  `(storage.foldername(name))[1] = auth.uid()::text` for select/insert/delete.
  A user literally cannot read, write, or delete another user's folder even
  via a direct Storage API call with their own valid session token.
- No update policy — a re-upload is a new object, never an in-place edit.
- `/api/analyze` writes the original file here **best-effort** when the
  caller is signed in, using the service-role client (`getAdminClient()`)
  so the write always succeeds regardless of RLS (needed because the route
  itself decides the path, before any user-scoped client would have a row to
  scope against). A storage failure is logged and does **not** block
  returning the analysis — the user is waiting on their report, not the copy.
- `public.resumes` indexes the metadata (path, name, mime, size, timestamp)
  with the same owner-only RLS pattern as `responses`/`entitlements`.

## User-initiated deletion

`GET /api/resumes` lists a signed-in user's own resume metadata (never file
bytes). `DELETE /api/resumes { id }` removes the storage object and the row.
Uses the **user-scoped** client here, not the admin client — RLS naturally
means a user can only ever affect their own storage object/row regardless of
what `id` they send (a mismatched id resolves to "not found", not "forbidden",
so it doesn't even confirm another user's row exists). This is the mechanism
behind the "you can delete it from your dashboard at any time" line already
on `/upload` — the dashboard UI to call it is a follow-up, not blocking this
phase's security work.

## Retention: automatic deletion after 30 days

`GET /api/cron/cleanup-resumes`, scheduled daily via `vercel.json`'s
`crons` entry. Vercel signs cron requests with
`Authorization: Bearer $CRON_SECRET` automatically once that env var is set
on the project — the route checks it and 401s otherwise (verified: hitting
it with no secret configured returns 401). Deletes the storage object
*before* the database row on each batch, so a failed storage delete can
never leave an orphaned row that looks like a still-valid file; batched at
200 rows per run so one invocation can't run unbounded.

**Setup needed once real Supabase + Vercel projects exist** (can't be done
from here): set `CRON_SECRET` in Vercel's project env vars (`openssl rand
-hex 32`), same value only needs to exist server-side — Vercel injects the
header itself, nothing to configure on the cron-job definition beyond the
schedule already in `vercel.json`.

## What's still open (tracked, not silently skipped)

- No virus/malware scanning of uploaded files — out of scope for this phase;
  the file is never executed and is only read by `pdfjs-dist`/`mammoth`'s
  text-extraction paths, not opened in any application that would run
  embedded content. Worth a ClamAV-style scan later if abuse is observed.
- Rate limiting on `/api/analyze` itself is deferred to Phase 8 (infra
  hardening), consistent with the Phase 4 decision — there's no metered LLM
  call behind it yet (Phase 6), so the cost of abuse today is CPU time on a
  serverless function with its own platform-level limits, not money.
