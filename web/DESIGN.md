# LexIntent — visual system (from the "Exhibit A" mockup)

Analyst notes for reconstruction. Confidence: ✅ high · ⚠️ medium · ❓ low.

## 1. Identity
Investigative-newspaper meets legal casefile. The brand carries on two things:
1. **The exhibit metaphor** — torn documents, "EXHIBIT A" tabs, `CONFIDENTIAL`
   stamps, red-pen margin notes in a casual hand.
2. **Anton all-caps headlines + polarity-flipping bands** (light → dark → light →
   dark → light → dark). The alternation *is* the layout rhythm.
Sharp, loud, confident. No softness, no gradient, no rounded corner.

## 2. Tokens

### Color
| Token | Hex | Role | Conf |
|---|---|---|---|
| `--paper` | `#f3efe4` | light band background (warm cream) | ⚠️ |
| `--card` | `#fbfaf5` | report / pricing card surface | ⚠️ |
| `--ink` | `#1a1a1a` | primary text on light | ✅ |
| `--charcoal` | `#161310` | dark band background (warm near-black) | ⚠️ |
| `--paper-on-dark` | `#f4f1ea` | text on dark bands | ✅ |
| `--oxblood` | `#7a1712` | accent: display words, CTAs, checks, eyebrows, ink notes | ⚠️ (brand bible `#6A0F1A`) |
| `--rule` | `#d9d4c7` | hairline border on light | ⚠️ |
| `--rule-dark` | `#39342b` | hairline border on dark | ⚠️ |
| `--muted` | `#8c8880` / on dark `#9c978c` | secondary text | ⚠️ |
| `--stamp` | `#e8c64d` | "MOST CHOSEN" badge (mustard) | ⚠️ |
| `--kraft` | `#ab8a5f` | envelope / folder in the exhibit (decorative) | ❓ |

### Type
| Role | Family | Notes |
|---|---|---|
| Display | **Anton** (Google, 400) | ALL CAPS, `leading: .92`, `letter-spacing: -0.01em`. Hero H1 `clamp(2.75rem, 6vw, 5.25rem)`; section H2 `clamp(2rem, 4.5vw, 3.25rem)`. Selective words in `--oxblood`. |
| Body / UI | **Inter** | 15–16px / 1.6. |
| Label / eyebrow | Inter | 11px, 700, `uppercase`, `tracking .14em`, usually `--oxblood`. |
| Handwritten note | **Caveat** (Google) | 18–20px, `--oxblood`, slight rotation, used only in the exhibit. |
| Casefile document | **Newsreader** | the fake CV name only, to sell "document". |
| Big numerals (78/100, ₹1,499) | Anton | |

### Geometry
- **Radius: 0** everywhere. Only the circular stamp and avatar photos are round.
- Section dividers: **2px solid `--ink`**. Inner dividers: 1px `--rule`.
- Feature cards (report, pricing): 1px border + **hard offset shadow** `6px 6px 0 rgba(20,18,16,.85)`.
- Exhibit papers: realistic soft shadow `0 30px 60px -25px rgba(0,0,0,.35)` + torn/deckle edge.
- Container `max-width: 1240px`; section padding `clamp(4rem, 9vw, 7.5rem)` block.

## 3. Signature components
`ExhibitStack` · `ScoreCard` (CONFIDENTIAL stamp) · `EditorialStamp` (circular
text-on-path) · `ReportPreviewCard` (2×2 + roadmap row) · `PageStack` (01–05
tabbed sheets) · `PricingCard` (standard / featured) · polarity `Band`.

Generic: `Button` (solid-oxblood / solid-ink / outline, all 0-radius, uppercase,
trailing `→`, hover inverts) · `Eyebrow` · `TrustItem` · `Testimonial` · `LogoWall`.

## 4. Layout
Alternating full-bleed bands. Each: left column = eyebrow + Anton headline
(+ list / CTA), right column = the section's visual. ~45 / 55 split, stacks on
mobile. Hard 2px rule between every band.

Band order: **light** hero · **dark** how-it-works · **light** sample-report ·
**dark** pricing · **light** testimonials · **dark** footer.

## 5. Do / Don't
**Do:** ALL-CAPS Anton headings; radius 0; single accent; alternate light/dark
bands; 2px black band rules; handwritten notes only in oxblood and only in the
exhibit; hard-offset shadows on feature cards.
**Don't:** rounded corners; serif display; more than one accent; gradients;
soft ambient shadows on UI cards; lowercase or sentence-case headlines; emoji.

## 6. Open questions
- Exact cream / charcoal / oxblood hex (sampled from a compressed mockup).
- Whether inner flow screens (assessment, unlock, upload, report, dashboard)
  adopt the same polarity-band treatment — this pass revamps the landing only;
  inner screens inherit the new tokens but keep their prior layout.
