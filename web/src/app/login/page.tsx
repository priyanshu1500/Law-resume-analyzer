"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { EnvelopeSimpleIcon, GoogleLogoIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { getBrowserClient } from "@/lib/supabase/client";
import { isAuthConfigured } from "@/lib/supabase/config";
import { useAuth } from "@/lib/auth";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/questionnaire";
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (user) router.replace(next);
  }, [user, next, router]);

  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      : undefined;

  async function magicLink(e: React.FormEvent) {
    e.preventDefault();
    const sb = getBrowserClient();
    if (!sb) return;
    setBusy(true);
    setErr(null);
    const { error } = await sb.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    });
    setBusy(false);
    if (error) setErr(error.message);
    else setSent(true);
  }

  async function google() {
    const sb = getBrowserClient();
    if (!sb) return;
    setErr(null);
    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) setErr(error.message);
  }

  return (
    <div className="min-h-[100dvh] bg-white">
      <SiteNav />
      <main className="mx-auto flex max-w-[440px] flex-col px-6 py-[clamp(3rem,10vh,6rem)]">
        <p className="u-eyebrow">Account</p>
        <h1 className="u-display mt-3 text-[clamp(1.9rem,4vw,2.6rem)]">
          {sent ? "Check your email." : "Sign in to continue."}
        </h1>

        {!isAuthConfigured ? (
          <div className="card mt-8 p-5 text-[0.9rem] text-muted">
            Sign-in isn&rsquo;t switched on yet.{" "}
            <Link href={next} className="u-link inline-flex text-sm">
              Continue without an account
            </Link>
          </div>
        ) : sent ? (
          <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
            We sent a sign-in link to <b className="text-ink">{email}</b>. Open it on this
            device to come back to where you left off. It expires in an hour.
          </p>
        ) : (
          <>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
              Your questionnaire answers are saved and carried over — signing in just lets
              you finish and come back to your result.
            </p>

            <button
              onClick={google}
              className="btn btn-ghost mt-7 w-full !justify-center"
            >
              <GoogleLogoIcon size={18} weight="bold" />
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.14em] text-muted">
              <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
            </div>

            <form onSubmit={magicLink} className="flex flex-col gap-3">
              <label className="text-[0.8125rem] font-semibold text-ink">Email address</label>
              <div className="flex items-center gap-2 rounded-[12px] border border-line px-3">
                <EnvelopeSimpleIcon size={17} className="text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent py-3 text-[0.95rem] text-ink outline-none placeholder:text-muted"
                />
              </div>
              <button type="submit" disabled={busy} className="btn btn-navy w-full !justify-center">
                {busy ? "Sending…" : "Email me a sign-in link"}
                <ArrowRightIcon size={15} weight="bold" />
              </button>
            </form>
          </>
        )}

        {err && <p className="mt-4 text-[0.8125rem] text-[#b91c1c]">{err}</p>}

        <p className="mt-8 text-[0.75rem] text-muted">
          No passwords. We only use your email to send the sign-in link and your results.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-white" />}>
      <LoginInner />
    </Suspense>
  );
}
