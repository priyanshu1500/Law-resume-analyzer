# Phase 4 — Auth + RLS hardening

Reviewed and hardened 2026-09-05. Covers `supabase-schema.sql`,
`src/lib/supabase/*`, `src/lib/auth.tsx`, `src/app/login/page.tsx`,
`src/app/auth/callback/route.ts`, `src/app/api/{responses,analyze}/route.ts`,
`src/proxy.ts`.

## RLS policy review (both tables — default-deny confirmed)

**`public.responses`** — `for all using (auth.uid() = user_id) with check (auth.uid() = user_id)`.
A signed-in user can only select/insert/update/delete their own row. No row
matches for an anonymous request (`auth.uid()` is null). Correct.

**`public.entitlements`** — `for select using (auth.uid() = user_id)` only.
There is **no** insert/update/delete policy, which under RLS means those
operations are denied to every role except the table owner / service role.
Only the payment webhook (Phase 7, using `getAdminClient()` — the service-role
key, which bypasses RLS entirely) can grant an entitlement. A user cannot
grant themselves one by calling the Supabase REST API directly. Correct.

**Manual verification checklist** (do this once real Supabase keys are set —
can't be run live from this environment since auth is unconfigured here):
1. Create two test accounts (A and B) via magic link.
2. As A, complete a few questionnaire answers.
3. In the Supabase SQL editor, run `select * from responses;` as the
   `anon`/`authenticated` role (via `set role authenticated; set request.jwt.claim.sub = '<B's uid>';`)
   and confirm A's row is invisible.
4. Attempt `insert into entitlements (user_id, product) values ('<B>', 'analysis')`
   as `authenticated` — confirm it's rejected (no policy = denied).
5. Confirm the same insert succeeds using the service-role key (Phase 7's
   webhook path).

## Cookie hardening

Added `cookieOptions: { sameSite: "lax", secure: NODE_ENV==="production" }`
to all three Supabase client constructors (`server.ts`, `client.ts`,
`proxy.ts`) so the session cookie is never sent over plain HTTP in
production, while local `next dev` (http://localhost) still works.

**`httpOnly` is intentionally left `false`** (the `@supabase/ssr` library
default) — the browser client (`client.ts`) reads this same cookie via
`document.cookie` for client-side session refresh; that's how the modern
cookie-based Supabase SSR pattern works, and there's no way to make it
`httpOnly` without breaking that. The mitigation for cookie theft via XSS is
therefore **not** `httpOnly` here — it's not injecting untrusted content
into the DOM in the first place (React's default escaping, no
`dangerouslySetInnerHTML` of resume or model-derived text anywhere in this
codebase) plus the CSP headers planned for Phase 8. Tracked, not silently
accepted.

## Auth-endpoint rate limiting

`signInWithOtp` / `signInWithOAuth` are called **directly from the browser**
against Supabase's own Auth (GoTrue) service — there is no custom server
route in front of them to add our own rate limiting to, and there shouldn't
be: Supabase's Auth service already enforces its own rate limits on OTP
requests (per-email and per-IP). **Action for the user, not code**: once a
real Supabase project exists, check Authentication → Rate Limits in the
Supabase dashboard and confirm the defaults are sane before launch (the
defaults are reasonable but worth a look, e.g. tightening the OTP-send limit
if abuse shows up).

## Open-redirect fix

`/auth/callback` and `/login` both took a `?next=` query param and used it
in a redirect. Added `safeNext()` in both places: only a same-origin path
starting with a single `/` (never `//`, `/\`, or an absolute URL) is
accepted; anything else falls back to `/questionnaire`. Defense in depth —
the callback route's `${origin}${next}` string-concat pattern already
prevented an actual off-site redirect, but the explicit allowlist removes
any risk from a future refactor that redirects on `next` directly.

## `/api/analyze` now requires sign-in when auth is configured

Previously fully anonymous. Now: if `isAuthConfigured`, a request without a
valid session gets `401`; the upload page redirects to `/login?next=/upload`
on that response. When auth isn't configured yet (current deployed state —
no Supabase keys set), the route stays open, matching every other route's
`isAuthConfigured` pattern in this codebase. This does **not** yet check
payment entitlement — that's Phase 7's job once Razorpay lands; being
signed in is necessary but not sufficient after that ships.

## `/api/responses` payload cap

Added a 50KB cap on the incoming `responses` JSON body before it's merged
and upserted — a signed-in user could otherwise bloat their own row
indefinitely (self-only impact, but free to prevent).

## CSRF posture

State-changing routes (`/api/responses` POST, `/api/analyze` POST) rely on
the session cookie's `SameSite=Lax` attribute as CSRF protection — a
cross-site form/link navigation won't carry the cookie for a POST. No
custom CSRF token is implemented; proportionate for this app's actual
state-changing actions (save quiz answers, run a resume analysis) versus the
complexity of a token scheme. Revisit if a route with real financial/destructive
effect is added without going through a signed webhook (Phase 7's Razorpay
webhook is signature-verified independently, not cookie-session-based).

## No anonymous report storage

Already true by construction: Phase 2's `Findings` live only in
`localStorage` (`lexintent.session.v2`), never written to Supabase. There is
currently no `resumes`/`evidence` table at all (a deliberate Phase 2
decision — see docs/resume-analysis-architecture-plan.md — persistence
waits for Phase 5's private-bucket + retention-policy work).
