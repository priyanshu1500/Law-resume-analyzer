// @ts-nocheck
/* eslint-disable */
/**
 * Practice Compass — scoring engine. Ported verbatim from the reference build.
 * Pure functions: given a `resp` map (questionId -> answer), returns the result.
 * The reference self-checks the instrument; `selfCheck()` is kept and run once.
 */
import {
  ALL, DIMS, DN, DD, P, PK, Q, MAPVERSION,
} from "./data";

export type Resp = Record<string, number | number[]>;

/* ---- 5 · SCORING ------------------------------------------------- */
const SELW = [1, 0.6];
const one = (a: any) => (Array.isArray(a) ? a[0] : a);
const arr = (a: any) => (a === undefined ? [] : Array.isArray(a) ? a : [a]);

function blend(it: any, a: any, key: string) {
  const sel = arr(a).slice(0, 2); const acc: any = {}; let tw = 0;
  sel.forEach((oi: number, r: number) => {
    const o = it.o[oi]; if (!o || o.unc) return;
    const w = SELW[r] ?? 0.35; tw += w;
    Object.entries(o[key] || {}).forEach(([k, v]: any) => (acc[k] = (acc[k] || 0) + v * w));
  });
  return tw === 0 ? null : (Object.keys(acc).forEach((k) => (acc[k] /= tw)), acc);
}

function emphasis(resp: Resp) {
  const raw: any = {}, mx: any = {}, mn: any = {}, inf: any = {};
  ALL.forEach((d) => { raw[d] = 0; mx[d] = 0; mn[d] = 0; inf[d] = 0; });
  Q.forEach((it: any) => {
    const w = it.w ?? 1;
    if (it.k === "pick" || it.k === "multipick") {
      ALL.forEach((d) => {
        const v = it.o.filter((o: any) => !o.unc).map((o: any) => ((o.l || {})[d] || 0) * w);
        if (v.some((x: number) => x !== 0)) { mx[d] += Math.max(...v); mn[d] += Math.min(...v); }
      });
      const b = blend(it, resp[it.id], "l"); if (!b) return;
      Object.entries(b).forEach(([d, v]: any) => { raw[d] += v * w; inf[d]++; });
    } else if (it.k === "multi" && it.av) {
      it.av.forEach((m: any) => {
        if (m.l) Object.entries(m.l).forEach(([d, v]: any) => { if (v > 0) mx[d] += v; else mn[d] += v; });
      });
      arr(resp[it.id]).forEach((i: number) => {
        const m = it.av[i];
        if (m && m.l) Object.entries(m.l).forEach(([d, v]: any) => { raw[d] += v; inf[d]++; });
      });
    }
  });
  const out: any = {};
  ALL.forEach((d) => { const sp = mx[d] - mn[d]; out[d] = sp === 0 ? 50 : (100 * (raw[d] - mn[d])) / sp; });
  return { out, inf };
}

const ANCHOR: any = { DOCV: ["Q3", "Q30"], BLD: ["Q4"], CNTST: ["Q8"], PACE: ["Q13"] };
const W_ANCHOR = 0.6;
export function dimensions(resp: Resp) {
  const { out, inf } = emphasis(resp), d: any = {};
  ALL.forEach((k) => {
    const ids = (ANCHOR[k] || []).filter((id: string) => resp[id] !== undefined);
    if (ids.length) {
      const ap = ids.reduce((s: number, id: string) => s + ((one(resp[id]) - 1) / 4) * 100, 0) / ids.length;
      d[k] = (1 - W_ANCHOR) * out[k] + W_ANCHOR * ap; inf[k] += 2 * ids.length;
    } else d[k] = out[k];
  });
  if (resp.Q11 !== undefined) {
    const t = (one(resp.Q11) - 3) * 6;
    d.ADVS = Math.max(0, Math.min(100, d.ADVS + t));
    d.ANLY = Math.max(0, Math.min(100, d.ANLY - t * 0.6));
    d.DOCV = Math.max(0, Math.min(100, d.DOCV - t * 0.6));
    inf.ADVS++;
  }
  return { d, inf };
}

let NULLD: any = null;
function randomResp() {
  const r: any = {};
  Q.forEach((q: any) => {
    if (q.k === "rate") r[q.id] = 1 + Math.floor(Math.random() * 5);
    else if (q.k === "rank") {
      const ix = [...q.set.keys()];
      for (let i = ix.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ix[i], ix[j]] = [ix[j], ix[i]]; }
      r[q.id] = ix.slice(0, q.n);
    } else if (q.k === "multi") r[q.id] = [...q.set.keys()].filter(() => Math.random() < 0.3);
    else if (q.k === "multipick") r[q.id] = [Math.floor(Math.random() * q.o.length)];
    else r[q.id] = [Math.floor(Math.random() * q.o.length)];
  });
  return r;
}
function calibrateNull(n = 3000) {
  const acc: any = {}; ALL.forEach((d) => (acc[d] = [])); const spreads: number[] = [];
  for (let i = 0; i < n; i++) {
    const r = randomResp(), { d } = dimensions(r);
    ALL.forEach((k) => acc[k].push(d[k]));
    if (i < 700) { const c = combineAll(r, d, true); spreads.push(c.gap12); }
  }
  const o: any = {};
  ALL.forEach((k) => {
    const a = acc[k], m = a.reduce((s: number, x: number) => s + x, 0) / a.length;
    o[k] = { m, s: Math.sqrt(a.reduce((s: number, x: number) => s + (x - m) * (x - m), 0) / a.length) || 1 };
  });
  spreads.sort((a, b) => a - b);
  o.__gap = { p50: spreads[Math.floor(spreads.length * 0.5)], p85: spreads[Math.floor(spreads.length * 0.85)] };
  return o;
}
function erf(x: number) {
  const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x);
  const p = ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t;
  return s * (1 - p * Math.exp(-x * x));
}
const pctile = (z: number) => Math.max(1, Math.min(99, Math.round(50 * (1 + erf(z / Math.SQRT2)))));

const DIM_TASKS: any = {
  ANLY: [0, 1, 13], INV: [8, 6], BLD: [3, 4], DOCV: [2, 5, 6], PROC: [4, 7, 11],
  CNTST: [11, 14], CMRC: [10, 12, 6], ADVS: [9, 10, 14],
};
function applyExposure(cal: any, resp: Resp) {
  const done = arr(resp.Q44).filter((x: number) => x >= 0), soft: any = {};
  DIMS.forEach((d) => {
    const n = (DIM_TASKS[d] || []).filter((t: number) => done.includes(t)).length;
    const f = n === 0 ? 0.6 : n === 1 ? 0.82 : 1;
    if (f < 1) soft[d] = n;
    cal[d] = Math.round(50 + (cal[d] - 50) * f);
  });
  return soft;
}
function calibrated(d: any) { const c: any = {}; ALL.forEach((k) => (c[k] = pctile((d[k] - NULLD[k].m) / NULLD[k].s))); return c; }

function pearson(a: number[], b: number[]) {
  const n = a.length, ma = a.reduce((s, x) => s + x, 0) / n, mb = b.reduce((s, x) => s + x, 0) / n;
  let nu = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) { const x = a[i] - ma, y = b[i] - mb; nu += x * y; da += x * x; db += y * y; }
  return da === 0 || db === 0 ? 0 : nu / Math.sqrt(da * db);
}

const MU = DIMS.map((k, i) => PK.reduce((s, p) => s + P[p].v[i], 0) / PK.length);
const SD = DIMS.map((k, i) => {
  const a = PK.map((p) => P[p].v[i]);
  return Math.sqrt(a.reduce((s, x) => s + (x - MU[i]) ** 2, 0) / a.length) || 1;
});
let NEIGHBOUR: any = {};
function buildNeighbours() {
  const z = (p0: string) => P[p0].v.map((x, i) => (x - MU[i]) / SD[i]);
  PK.forEach((a) => { NEIGHBOUR[a] = PK.filter((b) => b !== a && pearson(z(a), z(b)) >= 0.85); });
}
function fits(cal: any) {
  const sv = DIMS.map((k) => (cal[k] - 50) / 20), f: any = {};
  PK.forEach((p) => { const fv = P[p].v.map((x, i) => (x - MU[i]) / SD[i]); f[p] = Math.round(50 * (pearson(sv, fv) + 1)); });
  return f;
}

const CEIL = (() => {
  const c: any = {}; PK.forEach((k) => (c[k] = 0));
  const rk: any = Q.find((x: any) => x.id === "Q15");
  rk.map.forEach((k: string) => (c[k] += rk.n));
  Q.filter((it: any) => (it.k === "pick" || it.k === "multipick") && it.o.some((o: any) => o.i)).forEach((it: any) => {
    const per: any = {};
    it.o.forEach((o: any) => Object.entries(o.i || {}).forEach(([k, v]: any) => { if (v > 0) per[k] = Math.max(per[k] || 0, v * (it.w ?? 1)); }));
    Object.entries(per).forEach(([k, v]: any) => (c[k] += v));
  });
  PK.forEach((k) => (c[k] = Math.max(c[k], 1)));
  return c;
})();
export function interests(resp: Resp, trace?: any) {
  const p: any = {}; PK.forEach((k) => (p[k] = 0));
  const rk: any = Q.find((x: any) => x.id === "Q15");
  arr(resp.Q15).forEach((si: number, r: number) => {
    const k = rk.map[si], pts = rk.n - r; p[k] += pts;
    if (trace) (trace[k] = trace[k] || []).push({ q: "Q15", t: rk.set[si], pts });
  });
  Q.filter((it: any) => (it.k === "pick" || it.k === "multipick") && it.o.some((o: any) => o.i)).forEach((it: any) => {
    const b = blend(it, resp[it.id], "i"); if (!b) return;
    Object.entries(b).forEach(([k, v]: any) => {
      if (p[k] === undefined) return; p[k] += v * (it.w ?? 1);
      if (trace && v > 0) (trace[k] = trace[k] || []).push({ q: it.id, t: it.o[arr(resp[it.id])[0]].t, pts: v });
    });
  });
  const av: any = Q.find((x: any) => x.id === "Q36");
  arr(resp.Q36).forEach((i: number) => {
    const m = av.av[i]; if (!m) return;
    Object.entries(m).forEach(([k, v]: any) => { if (k !== "l" && p[k] !== undefined) p[k] += v; });
  });
  const norm: any = {}; PK.forEach((k) => (norm[k] = p[k] / CEIL[k]));
  const vals = Object.values(norm) as number[], lo = Math.min(...vals), hi = Math.max(...vals), o: any = {};
  PK.forEach((k) => (o[k] = hi === lo ? 50 : Math.round((100 * (norm[k] - lo)) / (hi - lo))));
  return o;
}

const BLEND: any = { A: [0.65, 0.35], B: [0.5, 0.5], C: [0.35, 0.65], D: [0.25, 0.75], U: [0.5, 0.5] };
function blendKey(resp: Resp) {
  const it: any = Q.find((x: any) => x.id === "Q37"), i = one(resp.Q37);
  return i === undefined || !it.o[i] || it.o[i].unc ? "U" : it.o[i].blend;
}

function realism(resp: Resp, comb: any) {
  const notes: string[] = [];
  const lang = (() => { const i = one(resp.Q43); const o = (Q.find((x: any) => x.id === "Q43") as any).o[i]; return o ? o.lang : 1; })();
  if (lang === 0) {
    ["re", "crim", "cons", "fam"].forEach((k) => (comb[k] = Math.round(comb[k] * 0.88)));
    notes.push("You said you couldn't realistically work day to day in another language. Real estate, criminal, consumer and family practice are pulled down a little for that — in most of India they are not English-language jobs.");
  }
  const cities = arr(resp.Q42);
  const smallOnly = cities.length && cities.every((i: number) => i >= 4 && i <= 5);
  if (smallOnly) {
    ["ma", "bank", "capm", "comp", "tech"].forEach((k) => (comb[k] = Math.round(comb[k] * 0.85)));
    notes.push("Outside the big metros there is very little corporate, competition or capital markets work. That's a market fact, not a judgement — and consumer, criminal, family, real estate and employment practices exist everywhere.");
  }
  return notes;
}

function combineAll(resp: Resp, dRaw: any, quiet?: boolean) {
  const cal = quiet
    ? (() => { const c: any = {}; ALL.forEach((k) => (c[k] = Math.round(dRaw[k]))); return c; })()
    : calibrated(dRaw);
  const soft = applyExposure(cal, resp);
  const fit = fits(cal), int = interests(resp), bk = blendKey(resp), [wi, wf] = BLEND[bk];
  const comb: any = {}; PK.forEach((k) => (comb[k] = Math.round(wi * int[k] + wf * fit[k])));
  const vals = PK.map((k) => comb[k]);
  const ord = PK.slice().sort((a, b) => comb[b] - comb[a]);
  return {
    cal, soft, fit, int, comb, spread: Math.max(...vals) - Math.min(...vals),
    gap12: comb[ord[0]] - comb[ord[1]], gap23: comb[ord[1]] - comb[ord[2]],
  };
}

function destinations(resp: Resp) {
  const it: any = Q.find((x: any) => x.id === "Q38"), s: any = { firm: 0, chamber: 0, inhouse: 0, public: 0 };
  arr(resp.Q38).forEach((si: number, r: number) => (s[it.dest[si]] += 4 - r));
  if (one(resp.Q39) === 1) s.chamber += 1.5;
  if (resp.Q41 !== undefined) s.inhouse += (one(resp.Q41) - 3) * 0.8;
  if (resp.Q40 !== undefined) { const m = one(resp.Q40) - 3; s.chamber -= m * 0.7; s.public += m * 0.2; s.firm += m * 0.4; }
  const v = Object.values(s) as number[], lo = Math.min(...v), hi = Math.max(...v), o: any = {};
  Object.keys(s).forEach((k) => (o[k] = hi === lo ? 50 : Math.round(22 + (72 * (s[k] - lo)) / (hi - lo))));
  return o;
}
function exposure(resp: Resp) {
  const tasks = arr(resp.Q44).filter((x: number) => x >= 0).length;
  const kd = one(resp.Q45) === undefined ? "b" : ((Q.find((x: any) => x.id === "Q45") as any).o[one(resp.Q45)] || {}).k || "b";
  const n = one(resp.Q46) === undefined ? 0 : ((Q.find((x: any) => x.id === "Q46") as any).o[one(resp.Q46)] || {}).n || 0;
  return { tasks, know: kd, interns: n };
}
function quality(resp: Resp) {
  let unc = 0, ans = 0;
  Q.forEach((it: any) => {
    if (it.k !== "pick" && it.k !== "multipick") return; const a = arr(resp[it.id]);
    if (!a.length) return; ans++; if (it.o[a[0]] && it.o[a[0]].unc) unc++;
  });
  return { unc, ans };
}
function topDimsFor(p: string) {
  return DIMS.map((k, i) => ({ k, dv: Math.abs(P[p].v[i] - MU[i]) })).sort((a, b) => b.dv - a.dv).slice(0, 4).map((x) => x.k);
}
export function confidence(p: string, inf: any, exp: any, q: any, comb: any) {
  let c = 100;
  topDimsFor(p).forEach((d) => { if (inf[d] < 4) c -= 14; else if (inf[d] < 6) c -= 6; });
  c -= 5 * q.unc;
  if (exp.tasks >= 9) c += 8; else if (exp.tasks <= 2) c -= 12;
  if (exp.know === "a") c = Math.min(c, 55);
  if (exp.know === "d") c += 5;
  c -= ({ H: 0, M: 8 } as any)[P[p].c] || 0;
  const ord = PK.slice().sort((a, b) => comb[b] - comb[a]);
  const me = ord.indexOf(p), margin = me < ord.length - 1 ? comb[p] - comb[ord[me + 1]] : 6;
  if (margin < 2) c -= 12; else if (margin < 5) c -= 6;
  c = Math.max(5, Math.min(99, c));
  return c >= 75 ? "high" : c >= 52 ? "moderate" : c >= 32 ? "low" : "very low";
}

export function whyFor(p: string, resp: Resp, cal: any, trace: any) {
  const out: any[] = [];
  const t = (trace[p] || []).slice().sort((a: any, b: any) => b.pts - a.pts).slice(0, 2);
  t.forEach((x: any) => out.push({ k: "chose", t: x.t }));
  const agree = DIMS.map((k, i) => ({ k, pd: P[p].v[i] - MU[i], sd: cal[k] - 50 }))
    .filter((x) => x.pd > 4 && x.sd > 8).sort((a, b) => b.pd * b.sd - a.pd * a.sd).slice(0, 2);
  agree.forEach((x) => out.push({ k: "dim", t: DN[x.k].toLowerCase(), v: cal[x.k] }));
  return out;
}

function tensions(cal: any, int: any, fit: any, comb: any, resp: Resp, exp: any, rnotes: string[]) {
  const o = [...rnotes];
  const ord = PK.slice().sort((a, b) => comb[b] - comb[a]);
  const topInt = PK.slice().sort((a, b) => int[b] - int[a])[0];
  const top5 = PK.slice().sort((a, b) => fit[b] - fit[a]).slice(0, 5);
  const deal = ["ma", "bank", "capm", "re"], disp = ["clit", "crim", "cons"];
  const mi = (a: string[]) => Math.max(...a.map((k) => int[k]));
  if (mi(deal) >= 70 && cal.DOCV <= 32) o.push("<b>You want deal work and you've said you don't want volume.</b> The junior years are mostly reading and re-reading long documents. Test that on one short transactional internship before you commit a year to it.");
  if (mi(disp) >= 70 && cal.CNTST <= 32) o.push("<b>You're drawn to disputes but not to being challenged.</b> Junior disputes work is mostly written, so the early years may suit you better than you expect — but the practice does eventually need the other half.");
  if (Math.max(int.tax, int.comp) >= 70 && cal.CMRC <= 32) o.push("<b>Numbers are a gate here, not an advantage.</b> Tax and competition treat commercial fluency as a requirement. It is learnable, and the people who learn it are unusually well paid — but it has to be learned.");
  if (!top5.includes(topInt)) o.push("<b>Your interest and your working style point different ways.</b> " + P[topInt].n.split(",")[0] + " attracts you most, but the daily shape of it isn't what suits you. That usually means the subject pulls you more than the job does.");
  if (cal.PACE <= 30 && P[ord[0]].pace >= 75) o.push("<b>You want a predictable week, and your strongest match doesn't have one.</b> " + P[ord[0]].n.split(",")[0] + " gets hijacked routinely. Worth knowing before, not after.");
  if (one(resp.Q39) === 1) o.push("<b>Independent practice moved up once money came out of it.</b> That's a constraint, not a preference — and there are salaried routes into court-facing work: firm disputes teams, white-collar practices, in-house litigation management.");
  if (cal.ADVS >= 68 && cal.CNTST <= 40 && mi(disp.concat(["wc"])) >= 65) o.push("<b>You want to advise more than you want to fight.</b> Employment, tax, competition and insolvency all have both halves — the advisory side may be the version of this you actually want.");
  if (exp.interns === 0 && one(resp.Q47) === 0) o.push("<b>You're confident about work you haven't seen yet.</b> That's the most common way students lose two years. The three things at the bottom of this page are worth more to you than the numbers above them.");
  if (exp.interns >= 3 && exp.know === "a") o.push("<b>Several placements, and you still feel you're guessing.</b> That usually means they were observational. Choose the next one for the work, not the place.");
  if (cal.DOCV <= 32 && P[ord[0]].v[3] >= 85) o.push("<b>Volume is the defining feature of your top match, and it's your lowest score.</b> If the interest is real, test that directly rather than assuming it will be fine.");
  if (o.length < 2) {
    const a = DIMS.map((k, i) => ({ k, pd: P[ord[0]].v[i] - MU[i], sd: cal[k] - 50 }))
      .filter((x) => x.pd > 8 && x.sd > 15).sort((a, b) => b.pd * b.sd - a.pd * a.sd)[0];
    if (a) o.push("<b>Your interest and your working style agree.</b> " + P[ord[0]].n.split(",")[0] +
      " runs on " + DN[a.k].toLowerCase() + ", and that's where your answers sat highest. Agreement between the two is the strongest signal this can give you.");
    if (comb[ord[0]] - comb[ord[2]] < 8) o.push("<b>The top three are effectively tied.</b> Treat them as one direction, not a ranking — and let the next internship break the tie.");
  }
  return o.slice(0, 4);
}

/* the dynamic stem for Q37, from answers so far */
export function q37Stem(resp: Resp) {
  const { d } = dimensions(resp); const cal = NULLD ? calibrated(d) : d;
  const worst = (["DOCV", "PROC", "BLD", "ANLY", "ADVS", "CNTST", "INV"] as const)
    .map((k) => ({ k, v: cal[k] })).sort((a, b) => a.v - b.v)[0];
  const NAME: any = {
    DOCV: "going through large volumes of documents", PROC: "procedure, filings and dates",
    BLD: "drafting", ANLY: "long stretches of research", ADVS: "managing people and clients",
    CNTST: "being argued with", INV: "digging through evidence",
  };
  return "Your answers so far suggest you'd least enjoy " + NAME[worst.k] +
    ". Suppose the area you're drawn to turns out to be about 60% that, for the first three years. What would you do?";
}

export const ORD = (n: number) => {
  const t = n % 100;
  return t >= 11 && t <= 13 ? n + "th" : n + (({ 1: "st", 2: "nd", 3: "rd" } as any)[n % 10] || "th");
};
export const shortName = (p: string) => P[p].n.replace(/,.*$/, "").replace(/ &.*$/, "");

const OPEN: any = {
  confirm: ["You came in with an area in mind.", "Here is what your answers actually say."],
  compare: ["You came in with two or three in mind.", "Here is how they separate."],
  explore: ["You came in with no idea.", "Here is where to start looking."],
  reexamine: ["You thought you knew, and then weren't sure.", "Here is what your answers say now."],
  none: ["Your result", "What your answers point at."],
};

/* ---- integrity check (kept from the reference) ------------------- */
export function selfCheck() {
  const bad: string[] = [];
  Q.forEach((it: any) => {
    (it.o || []).forEach((o: any) => {
      Object.keys(o.l || {}).forEach((k) => { if (!ALL.includes(k as any)) bad.push(it.id + " l." + k); });
      Object.keys(o.i || {}).forEach((k) => { if (!PK.includes(k)) bad.push(it.id + " i." + k); });
    });
    (it.av || []).forEach((m: any) => Object.keys(m).forEach((k) => {
      if (k === "l") Object.keys(m.l).forEach((d) => { if (!ALL.includes(d as any)) bad.push(it.id + " av.l." + d); });
      else if (!PK.includes(k)) bad.push(it.id + " av." + k);
    }));
    (it.map || []).forEach((k: string) => { if (!PK.includes(k)) bad.push(it.id + " map." + k); });
  });
  PK.forEach((p) => { if (P[p].v.length !== DIMS.length) bad.push("profile length " + p); });
  return bad;
}

/* ---- the one call the page makes ------------------------------- */
export type CompassResult = ReturnType<typeof computeResult>;

let calibrating = false;
function ensureNull() {
  if (NULLD) return;
  calibrating = true;
  NULLD = calibrateNull(3000);
  buildNeighbours();
  calibrating = false;
}

export function computeResult(resp: Resp) {
  ensureNull();
  if (!Object.keys(NEIGHBOUR).length) buildNeighbours();

  const { d, inf } = dimensions(resp);
  const trace: any = {};
  const cal = calibrated(d);
  const soft = applyExposure(cal, resp);
  const fit = fits(cal), int = interests(resp, trace), bk = blendKey(resp), [wi, wf] = BLEND[bk];
  const comb: any = {}; PK.forEach((k) => (comb[k] = Math.round(wi * int[k] + wf * fit[k])));
  const rnotes = realism(resp, comb);
  const ord = PK.slice().sort((a, b) => comb[b] - comb[a]);
  const exp = exposure(resp), q = quality(resp);
  const tens = tensions(cal, int, fit, comb, resp, exp, rnotes);
  const dest = destinations(resp);
  const fkey = ((Q.find((x: any) => x.id === "Q47") as any).o[one(resp.Q47)] || {}).f || "none";
  const T = NULLD.__gap ? Math.max(6, NULLD.__gap.p85) : 9;
  const g12 = comb[ord[0]] - comb[ord[1]], g23 = comb[ord[1]] - comb[ord[2]];
  const shape = g12 >= T ? "one" : g23 >= T ? "two" : "three";

  const untested = Object.keys(soft).length;
  const thin =
    q.unc >= 10 ||
    (exp.know === "a" && exp.interns === 0) ||
    exp.tasks <= 2 ||
    (untested >= 6 && exp.interns === 0);

  return {
    cal, soft, fit, int, comb, ord, dest, tens, exp, q, shape, g12, g23, T,
    inf, trace, fkey, rnotes, thin, open: OPEN[fkey], mapVersion: MAPVERSION,
    NEIGHBOUR,
  };
}
