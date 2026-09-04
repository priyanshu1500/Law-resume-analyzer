"use client";

import { useMemo } from "react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Band, Button, Eyebrow, Meter, CaseFileCTA, VerdictStamp } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ScoreCounter } from "@/components/motion-bits";
import { Mark } from "@/components/practice-mark";
import {
  P, PK, DN, DD, DIMS, WHAT, REALLY, ENTRY, TRY, Q,
} from "@/lib/practice-compass/data";
import {
  computeResult, whyFor, confidence, ORD, shortName,
} from "@/lib/practice-compass/engine";
import { useSession } from "@/lib/store";

const DEST: Record<string, string> = {
  firm: "Law firm",
  chamber: "Independent counsel / chamber",
  inhouse: "In-house",
  public: "Public sector, judiciary or policy",
};

export default function FitPage() {
  const { state, ready } = useSession();
  const resp = state.responses as Record<string, number | number[]>;
  const has = ready && Object.keys(resp).length > 0;

  const res = useMemo(() => (has ? computeResult(resp) : null), [has, resp]);

  if (!ready) {
    return (
      <div className="min-h-[100dvh] bg-white">
        <SiteNav />
      </div>
    );
  }

  if (!has || !res) {
    return (
      <div className="min-h-[100dvh] bg-white">
        <SiteNav />
        <Band>
          <Eyebrow>Your career fit</Eyebrow>
          <h1 className="u-display mt-4 text-[clamp(2rem,4.6vw,3.2rem)] [text-wrap:balance]">
            There&rsquo;s nothing to read yet.
          </h1>
          <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">
            The fit is built from the questionnaire. It takes about thirteen minutes
            and nothing is stored.
          </p>
          <div className="mt-7">
            <CaseFileCTA />
          </div>
        </Band>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-white">
      <SiteNav />
      {res.thin ? <Thin res={res} resp={resp} /> : <Full res={res} resp={resp} />}
      <SiteFooter />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function H2({ mark, children }: { mark: string; children: React.ReactNode }) {
  return (
    <div className="mt-14 mb-5 flex items-center gap-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-muted">
      <Mark name={mark} size={17} />
      {children}
    </div>
  );
}
function Limits({ lines }: { lines: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-1.5 text-[0.8125rem] text-muted">
      {lines.map((l, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-line">—</span>
          {l}
        </li>
      ))}
    </ul>
  );
}

function Full({ res, resp }: { res: any; resp: any }) {
  const { comb, cal, int, fit, ord, dest, tens, soft, trace, shape, open, mapVersion, exp, q, inf } = res;
  const VERD: Record<string, [React.ReactNode, string]> = {
    one: [
      <>Your answers point at <b className="font-semibold text-navy">{shortName(ord[0])}</b>.</>,
      `Clearly enough to act on. ${shortName(ord[1])} and ${shortName(ord[2])} come next.`,
    ],
    two: [
      <><b className="font-semibold text-navy">{shortName(ord[0])}</b> and <b className="font-semibold text-navy">{shortName(ord[1])}</b>, and this can't separate them.</>,
      `Treat the two as one direction — they sit close together in practice too. ${shortName(ord[2])} is next, at a distance.`,
    ],
    three: [
      <><b className="font-semibold text-navy">{shortName(ord[0])}</b>, then <b className="font-semibold text-navy">{shortName(ord[1])}</b> and <b className="font-semibold text-navy">{shortName(ord[2])}</b> — but the order between them isn&rsquo;t reliable.</>,
      "Treat the three as one direction. The gaps between them are inside the range you would get by changing a handful of answers, so an internship will separate them faster than more thinking will.",
    ],
  };

  return (
    <>
      <Band>
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>{open[0]}</Eyebrow>
            <VerdictStamp>
              {shape === "one" ? "Clear read" : shape === "two" ? "Two-way" : "Cluster"}
            </VerdictStamp>
          </div>
          <h1 className="mt-3 text-[clamp(1.7rem,4.6vw,2.6rem)] font-normal leading-[1.16] tracking-[-0.02em] [text-wrap:pretty] text-ink">
            {VERD[shape][0]}
          </h1>
          <p className="mt-3 max-w-[52ch] text-[1rem] leading-relaxed text-muted">
            {VERD[shape][1]} Ranked by how the daily work matches the way you like to
            work, and by which problems you said pull you in.
          </p>
        </Reveal>

        {/* top three */}
        <H2 mark="route">The three closest</H2>
        <div className="flex flex-col gap-3">
          {ord.slice(0, 3).map((p: string, i: number) => {
            const w = whyFor(p, resp, cal, trace);
            const nb = (res.NEIGHBOUR[p] || []).filter((x: string) => ord.slice(0, 6).includes(x));
            return (
              <div key={p} className="card p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[0.75rem] font-semibold tabular-nums text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-1 text-[1.3rem] font-medium leading-tight tracking-[-0.015em] text-ink">
                      {P[p].n}
                    </h3>
                    <p className="mt-1 text-[0.875rem] text-muted">{WHAT[p]}</p>
                  </div>
                  <div className="shrink-0 text-[1.6rem] font-semibold tabular-nums tracking-[-0.02em] text-evidence">
                    <ScoreCounter to={comb[p]} />
                  </div>
                </div>

                {w.length > 0 && (
                  <Why label="Why this came up" accent>
                    {w.map((x: any, k: number) => (
                      <li key={k}>
                        {x.k === "chose" ? (
                          <>You chose <em className="not-italic text-ink">&ldquo;{x.t}&rdquo;</em></>
                        ) : (
                          <>This work runs on <em className="not-italic text-ink">{x.t}</em>, and that was one of your highest scores ({ORD(x.v)})</>
                        )}
                      </li>
                    ))}
                  </Why>
                )}
                <Why label="What the junior years are actually like">
                  <li>{REALLY[p]}</li>
                </Why>
                <Why label="How people get in, and what it pays">
                  <li>{ENTRY[p][0]}</li>
                  <li>{ENTRY[p][1]}</li>
                </Why>
                {nb.length > 0 && (
                  <Why label="Read with">
                    <li>
                      On working style alone this is almost identical to{" "}
                      <em className="not-italic text-ink">
                        {nb.map((x: string) => P[x].n.replace(/,.*$/, "")).join(" and ")}
                      </em>
                      . What separates them here is the subject, not the way of working.
                    </li>
                  </Why>
                )}
                <div className="mt-3 text-[0.8125rem] text-muted">
                  {confidence(p, inf, exp, q, comb)} confidence · interest {int[p]} · working style {fit[p]}
                </div>
              </div>
            );
          })}
        </div>

        {/* rest of ten */}
        <H2 mark="bundle">The rest of your top ten</H2>
        <div className="border border-line bg-white">
          {ord.slice(3, 10).map((p: string, i: number) => (
            <div
              key={p}
              className="grid grid-cols-[24px_1fr_auto] items-center gap-x-3 border-b border-line px-4 py-2.5 last:border-b-0 sm:grid-cols-[24px_1fr_90px_40px]"
            >
              <span className="text-[0.75rem] tabular-nums text-muted">{i + 4}</span>
              <span className="text-[0.875rem]">{P[p].n}</span>
              <span className="hidden sm:block"><Meter value={comb[p]} /></span>
              <span className="text-right text-[0.8125rem] font-semibold tabular-nums">{comb[p]}</span>
            </div>
          ))}
        </div>
        <Limits lines={["These are relative — how each area matches your answers compared with the others. Not a probability of anything."]} />

        {/* work profile */}
        <H2 mark="book">How you like to work</H2>
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {DIMS.slice()
            .sort((a, b) => cal[b] - cal[a])
            .map((k) => {
              const un = soft[k] !== undefined;
              return (
                <div key={k}>
                  <div className="flex items-baseline justify-between text-[0.875rem]">
                    <span>
                      {DN[k]}
                      {un && (
                        <span className="ml-2 border border-navy px-1.5 text-[0.625rem] font-bold uppercase tracking-[0.08em] text-navy">
                          untested
                        </span>
                      )}
                    </span>
                    <span className="text-[0.75rem] tabular-nums text-muted">{ORD(cal[k])}</span>
                  </div>
                  <div className="relative mt-1.5 h-[5px] bg-track">
                    <span className="absolute left-1/2 top-[-2px] h-[9px] w-px bg-line" />
                    <span
                      className={`block h-[5px] ${un ? "bg-muted" : "bg-navy"}`}
                      style={{ width: `${cal[k]}%` }}
                    />
                  </div>
                  <div className="mt-1 text-[0.75rem] text-muted">{DD[k]}</div>
                </div>
              );
            })}
          <div>
            <div className="flex items-baseline justify-between text-[0.875rem]">
              <span>{DN.PACE}</span>
              <span className="text-[0.75rem] tabular-nums text-muted">{ORD(cal.PACE)}</span>
            </div>
            <div className="relative mt-1.5 h-[5px] bg-track">
              <span className="block h-[5px] bg-muted" style={{ width: `${cal.PACE}%` }} />
            </div>
            <div className="mt-1 text-[0.75rem] text-muted">A working condition, not part of the match</div>
          </div>
        </div>
        <Limits
          lines={[
            "The middle of each line is where someone answering at random would sit.",
            ...(Object.keys(soft).length
              ? ["Lines marked untested are kinds of work you haven't done yet, so those scores are pulled toward the middle rather than taken at face value."]
              : []),
          ]}
        />

        {/* worth knowing */}
        {tens.length > 0 && (
          <>
            <H2 mark="lens">Worth knowing about yourself</H2>
            <div className="flex flex-col gap-2.5">
              {tens.map((t: string, i: number) => (
                <p
                  key={i}
                  className="border border-line border-l-2 border-l-navy bg-white p-3.5 text-[0.9rem] leading-[1.5] text-muted [&_b]:font-semibold [&_b]:text-ink"
                  dangerouslySetInnerHTML={{ __html: t }}
                />
              ))}
            </div>
          </>
        )}

        {/* where */}
        <H2 mark="columns">Where you&rsquo;d want to work</H2>
        <div className="border border-line bg-white">
          {Object.keys(dest)
            .sort((a, b) => dest[b] - dest[a])
            .map((k, i) => (
              <div
                key={k}
                className="grid grid-cols-[24px_1fr_auto] items-center gap-x-3 border-b border-line px-4 py-2.5 last:border-b-0 sm:grid-cols-[24px_1fr_90px_40px]"
              >
                <span className="text-[0.75rem] tabular-nums text-muted">{i + 1}</span>
                <span className="text-[0.875rem]">{DEST[k]}</span>
                <span className="hidden sm:block"><Meter value={dest[k]} /></span>
                <span className="text-right text-[0.8125rem] font-semibold tabular-nums">{dest[k]}</span>
              </div>
            ))}
        </div>

        {/* do this week */}
        <H2 mark="clock">Two things to do this week</H2>
        <div className="border border-line bg-white">
          {(TRY[ord[0]] || []).map((t, i) => (
            <div key={i} className="grid grid-cols-[24px_1fr] gap-x-3 border-b border-line px-4 py-3 last:border-b-0">
              <span className="text-[0.75rem] tabular-nums text-muted">{i + 1}</span>
              <span className="text-[0.9rem]">{t}</span>
            </div>
          ))}
        </div>
      </Band>

      {/* next → the ₹99 analysis */}
      <Band tone="dark">
        <h2 className="text-[clamp(1.5rem,3.6vw,2.2rem)] font-normal tracking-[-0.02em]">
          Now make it show on paper.
        </h2>
        <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-white/70">
          Firms get hundreds of applications a week, and since AI the CVs all read the
          same. What separates you is being visibly good at one thing. That&rsquo;s
          what a direction is for.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-3">
          {[
            ["Step one", `A CV written for ${shortName(ord[0])}, not for everyone`],
            ["Step two", "A shortlist of firms and chambers that actually do this work"],
            ["Step three", "Applications that say why you, and why them"],
          ].map(([s, t]) => (
            <div key={s} className="bg-navy p-4">
              <div className="text-[0.625rem] font-bold uppercase tracking-[0.12em] text-white/60">{s}</div>
              <div className="mt-1.5 text-[0.9rem] font-medium">{t}</div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button href="/unlock" variant="light">Build my targeted CV · ₹99</Button>
        </div>
      </Band>

      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1240px] px-6 py-6">
          <Limits
            lines={[
              "It doesn't measure how good you are at anything.",
              "It doesn't predict whether anyone will hire you.",
              "Your college, your marks and where you interned are not inputs to any number above.",
              "Assessments like this match a person's eventual choice about half the time. This one hasn't been tested yet.",
            ]}
          />
          <Limits lines={[mapVersion, "Pay and entry describe the shape of the market, not a promise."]} />
          <p className="mt-4 text-[0.8125rem]">
            <Link href="/questionnaire" className="text-muted underline underline-offset-2 hover:text-ink">
              Take it again
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

function Why({
  label,
  children,
  accent = false,
}: {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "mt-3.5 border-l-2 border-l-evidence pl-3 pt-1"
          : "mt-3.5 border-t border-line pt-3"
      }
    >
      <div
        className={`text-[0.625rem] font-bold uppercase tracking-[0.12em] ${
          accent ? "text-evidence" : "text-muted"
        }`}
      >
        {label}
      </div>
      <ul className="mt-2 flex flex-col gap-1.5 text-[0.875rem] leading-[1.45] text-muted">
        {children}
      </ul>
    </div>
  );
}

/* ---- thin result ---- */
function Thin({ res, resp }: { res: any; resp: any }) {
  const { cal, inf, soft, exp, q, ord, mapVersion } = res;
  const rk: any = Q.find((x: any) => x.id === "Q15");
  const picked: string[] = (Array.isArray(resp.Q15) ? resp.Q15 : []).map((i: number) => rk.map[i]);
  const lean = [...new Set(picked)].slice(0, 4);
  if (!lean.length) lean.push(...ord.slice(0, 3));

  const why: string[] = [];
  if (q.unc >= 10) why.push(`you marked ${q.unc} questions "I genuinely can't say yet"`);
  if (exp.interns === 0) why.push("you haven't done an internship yet");
  if (exp.tasks === 0) why.push("you haven't done any of the kinds of legal work on that list yet");
  else if (exp.tasks <= 2)
    why.push(
      exp.tasks === 1
        ? "there is only one kind of legal work you've actually done"
        : `there are only ${exp.tasks} kinds of legal work you've actually done`,
    );
  if (exp.know === "a") why.push("you said you're mostly imagining what the work involves");

  const solid = DIMS.filter((k) => inf[k] >= 5 && soft[k] === undefined).sort((a, b) => cal[b] - cal[a]);
  const tries: string[] = [];
  lean.slice(0, 3).forEach((p: string) => {
    const t = (TRY[p] || [])[0];
    if (t && !tries.includes(t)) tries.push(t);
  });

  return (
    <>
      <Band>
        <Eyebrow>Your result</Eyebrow>
        <h1 className="mt-3 text-[clamp(1.7rem,4.6vw,2.6rem)] font-normal leading-[1.16] tracking-[-0.02em] text-ink">
          There isn&rsquo;t enough here yet to tell you.
        </h1>
        <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-muted">
          That is the honest answer, and it is a better one than a ranked list would be.
          You can only compare kinds of legal work once you&rsquo;ve seen some of it, and{" "}
          {why.length ? why.slice(0, 3).join(", ") + "." : "there isn't much to go on yet."}
        </p>
        <div className="mt-8 text-navy">
          <Mark name="gate" size={88} />
        </div>

        <H2 mark="route">The problems you said interested you</H2>
        <div className="border border-line bg-white">
          {lean.map((p: string) => (
            <div key={p} className="border-b border-line px-4 py-3 text-[0.9rem] last:border-b-0">
              <b className="font-semibold text-ink">{P[p].n}</b> — {WHAT[p]}
            </div>
          ))}
        </div>
        <Limits lines={["These come straight from the five situations you ranked — they are your answer, not a calculation. No scores, on purpose: on this many answers a ranking would be closer to noise than to a finding."]} />

        <H2 mark="clock">Do these, then come back</H2>
        <div className="border border-line bg-white">
          {tries.map((t, i) => (
            <div key={i} className="border-b border-line px-4 py-3 text-[0.9rem] last:border-b-0">{t}</div>
          ))}
          <div className="border-b border-line px-4 py-3 text-[0.9rem] last:border-b-0">
            Do one internship chosen for the <b className="font-semibold">work</b>, not the name of the place.
          </div>
          <div className="px-4 py-3 text-[0.9rem]">
            Ask two lawyers in different practices what they actually did in their first six months.
          </div>
        </div>

        {solid.length >= 3 && (
          <>
            <H2 mark="book">What can be said already</H2>
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {solid.map((k) => (
                <div key={k}>
                  <div className="flex items-baseline justify-between text-[0.875rem]">
                    <span>{DN[k]}</span>
                    <span className="text-[0.75rem] tabular-nums text-muted">{ORD(cal[k])}</span>
                  </div>
                  <div className="relative mt-1.5 h-[5px] bg-track">
                    <span className="absolute left-1/2 top-[-2px] h-[9px] w-px bg-line" />
                    <span className="block h-[5px] bg-navy" style={{ width: `${cal[k]}%` }} />
                  </div>
                  <div className="mt-1 text-[0.75rem] text-muted">{DD[k]}</div>
                </div>
              ))}
            </div>
            <Limits lines={["Only the parts of your working style you gave enough evidence for are shown."]} />
          </>
        )}
      </Band>

      <Band tone="dark">
        <h2 className="text-[clamp(1.5rem,3.6vw,2rem)] font-normal tracking-[-0.02em]">
          Come back after your next internship.
        </h2>
        <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-white/70">
          It gets sharper every time you&rsquo;ve seen more of the work. Nothing is
          stored, so just take it again.
        </p>
        <div className="mt-6">
          <Button href="/questionnaire" variant="light">Take it again</Button>
        </div>
      </Band>

      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1240px] px-6 py-6">
          <Limits lines={[mapVersion]} />
        </div>
      </div>
    </>
  );
}
