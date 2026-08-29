# Law Resume Analyzer — Cost Analysis

## Product recap
1. Intake questionnaire — 45–50 question sets (multi-step form, save progress, branching)
2. Paywall — user pays a fee to unlock analysis
3. Resume upload + AI analysis against their answers + a scoring rubric
4. Delivered analysis report (PDF / web)
5. Paid upsell — human rewrite/edit of the resume by your team

---

## 1. One-time build costs

| Item | DIY (you + AI tooling) | Freelance | Agency |
|---|---|---|---|
| UI/UX design | $0–150 (templates) | $1,500–5,000 | $10,000+ |
| Frontend + backend build (forms, upload, payments, AI pipeline, report gen, accounts, admin) | $0 labor / time only | $6,000–25,000 | $30,000–80,000+ |
| Questionnaire content (legal-career specific, 45–50 sets) — needs a recruiter/career-coach's input | $0–500 | $500–3,000 | included |
| Analysis rubric + prompt engineering | time only | $1,000–4,000 | included |
| Logo / brand | $0–100 | $300–2,000 | included |
| Legal: ToS, privacy policy, disclaimers (you're handling PII + career advice) | $150–300 (Termly/iubenda) | $500–2,500 (lawyer review) | — |
| Business setup (LLC registration, bank account) | $50–500 | — | — |

**Lean DIY path to launch: roughly $300–1,500 out of pocket** (mostly domain, legal templates, business registration), plus your time.
**Outsourced build: $10,000–35,000.**

---

## 2. Fixed monthly costs (infrastructure)

| Service | Lean | Comfortable |
|---|---|---|
| Hosting (Vercel/Render/Railway) | $0–25 | $25–100 |
| Database (Supabase/Neon) | $0 | $25 |
| File storage (S3 / Cloudflare R2) | ~$0 | $1–5 |
| Email (Resend/Postmark) | $0 (free tier) | $15–20 |
| Auth (Supabase/Clerk) | $0 | $25 |
| Domain (amortized) | $1–2 | $1–2 |
| Analytics + error monitoring | $0 | $9–20 |
| No-code platform *if you go that route* (Bubble/Softr + Make) | $40–90 | $90–200 |
| **Total** | **~$5–50/mo** | **~$130–400/mo** |

---

## 3. Variable cost per paying user

| Component | Cost |
|---|---|
| Stripe fee (2.9% + $0.30) | ~$1.75 on a $50 charge · ~$4.65 on $150 |
| AI analysis — Claude Sonnet (~12K in / 5K out tokens) | ~$0.10–0.60 per report |
| AI analysis — Claude Opus (if used) | ~$0.50–2.00 per report |
| Email + storage | fractions of a cent |
| **Effective cost per paid analysis** | **~$3–8** |

The AI cost is tiny relative to the price. Payment processing is your biggest per-transaction cost.

Budget a **human QA pass** on each report early on (your time) until the rubric is proven.

---

## 4. The "edited by us" upsell — this is labor, not software

- Professional legal resume writers charge **$300–1,200 per resume**.
- If **you** do it: 2–5 hours each of your time.
- If you **outsource fulfillment**: your cost = the writer's fee (set your upsell price above it).
- This is the real scaling bottleneck — software costs stay flat, this one grows with volume.

---

## 5. Growth / optional costs

| Item | Cost |
|---|---|
| Marketing — Google Ads (legal keywords are pricey) | $5–15 per click |
| SEO content / partnerships (law schools, bar associations) | time or $500–2,000/mo |
| Professional liability (E&O) insurance — advisable if giving career advice | $300–1,000/yr |
| Support tooling | $0–50/mo |
| Bookkeeping / accounting | $0–200/mo |

---

## Bottom line

- **To launch lean (DIY build):** ~$300–1,500 up front + ~$5–50/mo running + ~$3–8 per paid user.
- **To launch with an outsourced build:** ~$10k–35k up front + ~$130–400/mo.
- **Margins on the analysis are high** (charge $30–80, cost ~$3–8).
- **The rewrite upsell is margin-thin unless priced well** — it's human labor; price it at 2–3x your writer cost.
- Biggest hidden costs: writing a genuinely good legal-specific questionnaire + rubric, and the human time on rewrites and QA.
