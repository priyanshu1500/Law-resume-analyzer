# LexIntent AI — web

Editorial / broadsheet UI for a law-career resume analyser. Built from the
reference dashboard: warm paper palette, oxblood accent, Newsreader serif +
Inter labels.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## Screens (the core user flow)

| Route         | What it is                                                        |
| ------------- | --------------------------------------------------------------- |
| `/`           | Marketing landing: method, what the report measures, sample scorecard, fees |
| `/assessment` | 49-question intake across 9 sections, progress + local persistence |
| `/unlock`     | Paywall (₹1,499). Mock "pay" flips a local `paid` flag          |
| `/upload`     | Resume upload + faux analysis run, gated on `paid`             |
| `/report`     | The editorial analysis report (mock output)                    |
| `/dashboard`  | The logged-in dashboard from the reference image               |

## What is real vs mock

- **Real:** all UI, the 49-question instrument (`src/lib/questions.ts`), the
  step flow, client-side persistence (`src/lib/store.ts`, localStorage).
- **Mock:** the analysis output (`src/lib/mock.ts`), payment (no Stripe yet),
  file handling (name only, nothing uploaded), auth (none).
- **Placeholder:** hero / rail images use `picsum.photos` grayscale seeds.
  Swap for real editorial photography (courthouse, Justitia) before launch.

## Next steps toward the paid product

1. Auth + a real session store (Supabase).
2. Stripe Checkout on `/unlock`; webhook flips `paid` server-side; the AI call
   only runs after that (payment-gated execution).
3. File upload to object storage; parse to text.
4. AI analysis endpoint: resume text + intake answers + rubric -> the shape in
   `src/lib/mock.ts`.
5. Optional `/rewrite` commissioning flow for the ₹3,999 human edit.

## Design tokens

`src/app/globals.css` — `--paper`, `--ink`, `--oxblood`, `--rule`, `--track`,
exposed as Tailwind utilities (`bg-paper`, `text-ink`, `text-oxblood`, ...).
Editorial primitives: `.u-serif`, `.u-eyebrow`, `.u-dropnum`, `.u-link`,
`.u-pullquote`; add `.on-dark` on ink-background sections.
