/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Practice Compass — the instrument. 47 items across 7 sections, 18 practice
 * areas, 8 working-style dimensions. Ported from the reference build; copy and
 * structure are the author's. Typography restored (em dash, middot, en dash).
 */

/* ---- 1 · DIMENSIONS ------------------------------------------------ */
export const DIMS = ["ANLY", "INV", "BLD", "DOCV", "PROC", "CNTST", "CMRC", "ADVS"] as const;
export const COND = ["PACE"] as const;
export const ALL = [...DIMS, ...COND] as const;

export const DN: Record<string, string> = {
  ANLY: "Open questions",
  INV: "Working out what happened",
  BLD: "Building the document",
  DOCV: "Volume",
  PROC: "Procedure and deadlines",
  CNTST: "Being challenged",
  CMRC: "Business and numbers",
  ADVS: "Advising people",
  PACE: "Unpredictable days",
};
export const DD: Record<string, string> = {
  ANLY: "Questions with no settled answer yet",
  INV: "Reconstructing facts from scattered evidence",
  BLD: "Writing the thing itself, and getting it exactly right",
  DOCV: "Staying accurate across a great many pages",
  PROC: "Steps, filings and dates that cannot move",
  CNTST: "Thinking while someone pushes back at you",
  ADVS: "Being the person someone comes to for an answer",
  CMRC: "Money, and why people are doing what they do",
  PACE: "Days that get hijacked without warning",
};

/* ---- 2 · PRACTICE AREAS · v = [ANLY INV BLD DOCV PROC CNTST CMRC ADVS] ---- */
export const P: Record<
  string,
  { n: string; v: number[]; pace: number; c: "H" | "M"; t: { T: number; A: number; C: number } }
> = {
  ma: { n: "M&A, Private Equity & General Corporate", v: [50, 30, 80, 92, 45, 25, 88, 55], pace: 60, c: "H", t: { T: 85, A: 10, C: 5 } },
  bank: { n: "Banking, Finance & Funds", v: [45, 25, 72, 94, 60, 20, 85, 45], pace: 60, c: "H", t: { T: 70, A: 25, C: 5 } },
  capm: { n: "Capital Markets & Securities", v: [45, 30, 70, 92, 85, 25, 80, 40], pace: 65, c: "H", t: { T: 65, A: 30, C: 5 } },
  insol: { n: "Restructuring & Insolvency", v: [60, 50, 78, 75, 95, 55, 72, 55], pace: 70, c: "M", t: { T: 30, A: 25, C: 45 } },
  clit: { n: "Commercial Litigation & Arbitration", v: [78, 65, 85, 70, 88, 80, 45, 50], pace: 72, c: "H", t: { T: 5, A: 10, C: 85 } },
  wc: { n: "White-Collar & Investigations", v: [70, 92, 70, 80, 70, 78, 50, 62], pace: 88, c: "M", t: { T: 5, A: 30, C: 65 } },
  crim: { n: "General Criminal Practice", v: [55, 85, 65, 45, 80, 90, 25, 70], pace: 85, c: "M", t: { T: 0, A: 5, C: 95 } },
  comp: { n: "Competition & Antitrust", v: [88, 55, 82, 75, 70, 55, 85, 50], pace: 65, c: "M", t: { T: 25, A: 45, C: 30 } },
  tax: { n: "Tax", v: [92, 45, 75, 60, 80, 55, 92, 50], pace: 40, c: "H", t: { T: 25, A: 35, C: 40 } },
  tech: { n: "Technology, Data & Privacy", v: [78, 35, 72, 55, 45, 30, 65, 68], pace: 42, c: "M", t: { T: 35, A: 55, C: 10 } },
  ip: { n: "Intellectual Property", v: [60, 45, 68, 70, 90, 55, 50, 55], pace: 38, c: "M", t: { T: 30, A: 30, C: 40 } },
  secreg: { n: "Sector Regulation & Licensing", v: [80, 40, 72, 70, 78, 40, 70, 62], pace: 45, c: "M", t: { T: 20, A: 60, C: 20 } },
  emp: { n: "Employment, Labour & Benefits", v: [65, 50, 80, 70, 62, 40, 55, 82], pace: 45, c: "H", t: { T: 20, A: 55, C: 25 } },
  re: { n: "Real Estate & Construction", v: [45, 45, 75, 92, 75, 30, 70, 55], pace: 45, c: "M", t: { T: 55, A: 25, C: 20 } },
  proj: { n: "Projects, Energy & Infrastructure", v: [62, 35, 78, 82, 70, 30, 78, 58], pace: 50, c: "M", t: { T: 45, A: 40, C: 15 } },
  const_: { n: "Constitutional, Public Law & Policy", v: [95, 45, 88, 45, 55, 68, 20, 42], pace: 62, c: "M", t: { T: 0, A: 35, C: 65 } },
  fam: { n: "Family, Succession & Private Client", v: [50, 55, 70, 40, 62, 60, 40, 92], pace: 65, c: "M", t: { T: 25, A: 40, C: 35 } },
  cons: { n: "Consumer, Claims & Access to Justice", v: [45, 60, 70, 45, 70, 65, 35, 80], pace: 58, c: "M", t: { T: 5, A: 15, C: 80 } },
};
export const PK = Object.keys(P);
export const MAPVERSION =
  "Practice map v1.0 · August 2026 · profiles not yet reviewed by practitioners";

export const WHAT: Record<string, string> = {
  ma: "Buying and selling companies, and everything around it.",
  bank: "Lending, security and funds — the documents that move money.",
  capm: "Raising money from investors and the public markets.",
  insol: "Companies that can't pay: rescuing them, or dividing what's left.",
  clit: "Contested commercial matters, in court and in arbitration.",
  wc: "Investigations, enforcement and economic offences.",
  crim: "Criminal defence and trial practice.",
  comp: "Merger control, cartels and market power.",
  tax: "Structuring, assessments and tribunal litigation on tax.",
  tech: "Data protection, platform regulation and technology contracts.",
  ip: "Trade marks, patents, and rights in things you can't touch.",
  secreg: "One regulator's world — finance, telecom, power, pharma, trade.",
  emp: "The employment relationship: contracts, compliance and disputes.",
  re: "Land, title, development and construction.",
  proj: "Infrastructure and energy, and the approvals that unlock them.",
  const_: "The State on the other side — writs, public law and policy.",
  fam: "Matrimonial, succession and private client work.",
  cons: "Consumer and accident claims, and access to justice.",
};

export const REALLY: Record<string, string> = {
  ma: "Due diligence: reading a great many contracts and listing every problem, then marking up the same agreement as changes come back.",
  bank: "Facility and security documents, condition-precedent checklists, and twenty compliance documents per matter.",
  capm: "Offering documents, listing compliance and continuous disclosure. High volume, unforgiving deadlines.",
  insol: "Applications, claim verification and tribunal filings. Statutory deadlines nobody can move.",
  clit: "Research notes, pleadings, chronologies and bundles. Appearances start short and come later than you expect.",
  wc: "Reconstructing chronologies from records and messages, and drafting replies to summons at very short notice.",
  crim: "Bail applications, trial attendance and witnesses — far earlier than anywhere else. Also waiting, and low pay for years.",
  comp: "Merger notifications, market definition and responses in investigations. Economics sits next to law.",
  tax: "Replies to show-cause and assessment notices, tribunal appeals, and reading accounts. A steep first decade.",
  tech: "Gap assessments, policies, and advising on what a product may lawfully do. Answers change by notification.",
  ip: "Prosecution is filings, examination reports and oppositions — repetitive by design. Enforcement is a different job.",
  secreg: "Applicability analysis, licence applications and representations. Slow, and on the regulator's timetable.",
  emp: "Contracts, HR policies, POSH work and compliance mapping across State after State.",
  re: "Title diligence and search reports, sale deeds and leases, RERA filings. Local-language records are common.",
  proj: "Concession and power purchase agreements, clearances and financing. Substantive work early; projects stall for years.",
  const_: "Writs, PILs and counter-affidavits with deep doctrinal research. No structured entry route.",
  fam: "Petitions and settlements, with a great deal of client contact — usually in the worst period of their lives.",
  cons: "Complaints and claims before commissions, evidence affidavits and arguments. Small matters, real advocacy early.",
};

export const ENTRY: Record<string, [string, string]> = {
  ma: ["Campus recruitment into a firm's corporate team; internships convert.", "Among the highest junior pay of the eighteen. The largest single intake."],
  bank: ["Campus recruitment into banking and finance teams, or a lender's in-house team.", "Among the highest junior pay. Steady intake, concentrated in Mumbai and Delhi."],
  capm: ["Campus recruitment into capital markets teams. Mostly Mumbai.", "High junior pay, few seats, and the work is high-volume."],
  insol: ["Firm insolvency teams, tribunal chambers, and resolution-professional support work.", "Middling pay on the firm route, thin in chambers. Intake follows the statute."],
  clit: ["A firm's disputes team, or a counsel's chamber.", "Firm route pays well; chambers pay very little for the first few years."],
  wc: ["White-collar teams in firms, or a chamber doing economic-offence work.", "Middling to high on the firm route. Few seats, and they go to people who have seen the work."],
  crim: ["A criminal chamber, district court first. Almost no campus route.", "Low pay for several years, whatever the route. Responsibility comes earlier than anywhere else."],
  comp: ["A small number of competition teams and boutiques.", "High pay, very few seats. One of the hardest entries on this list."],
  tax: ["Firm tax teams, tax boutiques, or a counsel's chamber.", "High pay once you are useful; a long apprenticeship first, and CAs compete for the same work."],
  tech: ["Technology and data teams in firms, and in-house at platforms and startups.", "Middling pay, growing intake, and the in-house route opens earlier than most."],
  ip: ["IP firms and prosecution practices. A science degree helps for patents.", "Middling pay. Prosecution and enforcement are separate jobs with separate entries."],
  secreg: ["Regulatory teams inside firms, or in-house in one regulated sector.", "Middling pay. Rarely advertised by this name — look inside corporate and sector teams."],
  emp: ["Employment teams in firms, HR-side consulting, and in-house.", "Middling pay, steady demand, and the in-house route is real."],
  re: ["Real estate teams in firms, developers' in-house teams, and local practices.", "Middling pay. Local-language records and local practice matter more than in most areas."],
  proj: ["Projects and energy teams in firms; also in-house with developers and lenders.", "High pay on the firm route. Substantive work early, and long quiet stretches."],
  const_: ["No structured route — a chamber, a judicial clerkship, panel work, or a policy organisation.", "Low pay for years. The entry is the hard part, not the work."],
  fam: ["A family law chamber or a small firm; much of it is built on your own referrals.", "Low at the start and slow to build, then it depends entirely on your own name."],
  cons: ["Legal aid, a claims practice, or a chamber.", "Low pay and small matters, but real advocacy sooner than anywhere except criminal work."],
};

export const TRY: Record<string, [string, string]> = {
  ma: ["Read one share purchase agreement and mark every clause you don't understand.", "Take a reported acquisition and write the one-page issue list you'd have given the buyer."],
  bank: ["Read one facility agreement's conditions-precedent list and work out who has to produce what.", "Take a reported SARFAESI matter and trace how the security was enforced."],
  capm: ["Open one recent IPO prospectus and read only the risk factors. Note which are real.", "Take one listed company's quarterly disclosures and list what the rules forced it to say."],
  insol: ["Reconstruct a Section 7 application from a reported admission order.", "Decide which half you want — the tribunal work or the restructuring. They are different jobs."],
  clit: ["Read one arbitral award end to end and write the losing side's best argument.", "Sit in a commercial court for a full day and time how much of it is substantive."],
  wc: ["Take a reported enforcement order and reconstruct the chronology behind it.", "Read one investigation report and list what evidence each finding rests on."],
  crim: ["Sit in a sessions court for a full day and write down what happened, hour by hour.", "Read one bail order and list every fact the judge relied on."],
  comp: ["Read one CCI merger order and write the summary a client would actually want.", "Take a market you know and try to define it three different ways."],
  tax: ["Take a reported tribunal decision and rewrite the taxpayer's argument in your own words.", "Learn to read a profit-and-loss statement properly. One weekend."],
  tech: ["Run a gap assessment on a real app's published privacy policy.", "Read one regulator consultation paper and write the two-paragraph client summary."],
  ip: ["Pull one trade mark examination report and draft the reply.", "Read one infringement judgment and separate what was proved from what was argued."],
  secreg: ["Read one regulator's consultation paper and write the two-paragraph note a client would want.", "Take one licence application form and work out what a client would have to prove."],
  emp: ["Take a real HR policy and map it against one State's rules.", "Read one industrial dispute award and summarise what actually decided it."],
  re: ["Read one title search report and list every gap it leaves open.", "Take one development agreement and work out who carries which risk."],
  proj: ["Read one concession agreement's termination clauses and work out who loses what.", "Take one stalled project reported in the press and find the approval that stopped it."],
  const_: ["Take a reported writ judgment and write the State's best answer to it.", "Read one law commission report and note what it recommends, and why."],
  fam: ["Read one reported maintenance judgment and note what evidence actually mattered.", "Sit in a family court for a morning."],
  cons: ["Read one consumer commission order and map the complaint to the relief given.", "Draft a consumer complaint from a real product failure you've had."],
};

/* ---- 3 · THE INSTRUMENT ------------------------------------------- */
export const CS = { unc: 1 as const, t: "I genuinely can't say yet" };

export type QItem = any;
export const Q: QItem[] = [];
const push = (o: QItem) => Q.push(o);
const PICK = (id: string, sec: string, q: string, o: any[], x: any = {}) =>
  push({ id, sec, k: "pick", q, o: o.concat(x.nocs ? [] : [CS]), ...x });
const MULTI = (id: string, sec: string, q: string, o: any[], max: number, x: any = {}) =>
  push({ id, sec, k: "multipick", max, q, o: o.concat(x.nocs ? [] : [CS]), ...x });
const RATE = (id: string, sec: string, q: string, dim: string, lo: string, hi: string, x: any = {}) =>
  push({ id, sec, k: "rate", q, dim, lo, hi, ...x });

/* -- S1 · How you work -- */
MULTI("Q1", "S1", "You have a free afternoon at work and can pick up anything you like. What do you reach for?",
  [{ t: "A difficult question — keep digging until you actually understand it", l: { ANLY: 3 } },
   { t: "Writing the first version of something from nothing", l: { BLD: 3 } },
   { t: "Working out what two sides really want, and finding a way through", l: { ADVS: 3, CMRC: 1 } },
   { t: "A confused situation — work out what probably happened", l: { INV: 3 } },
   { t: "A long document somebody else drafted — find everything wrong with it", l: { DOCV: 2, BLD: 1 } }], 2);

PICK("Q2", "S1", "Which of these would annoy you most?",
  [{ t: "A technically correct answer that doesn't solve the client's problem", l: { CMRC: 3, ADVS: 1 } },
   { t: "A persuasive argument with weak reasoning underneath it", l: { ANLY: 3 } },
   { t: "A missed filing date that ends the matter before it starts", l: { PROC: 3 } },
   { t: "A document full of inconsistencies that nobody caught", l: { DOCV: 3 } }]);

RATE("Q3", "S1", "Someone hands you 250 pages and says the answer is in there somewhere. How appealing is that?",
  "DOCV", "I'd hate it", "I'd quite enjoy it");

RATE("Q4", "S1", "And this: one page of text, a whole day, until every sentence is exactly right.",
  "BLD", "I'd hate it", "I'd quite enjoy it");

PICK("Q5", "S1", "You're given a large pile of material to work through. Honest first move?",
  [{ t: "Start at the beginning and read properly — the pattern shows up as you go", l: { DOCV: 3 } },
   { t: "Work out what actually matters, read only that, and accept you'll miss things", l: { CMRC: 2, INV: 1 } },
   { t: "Build an index first, then read — slower at the start, faster later", l: { PROC: 3 } },
   { t: "Get the shape of it, form a theory, then test the theory against the detail", l: { ANLY: 2, INV: 1 } }]);

PICK("Q6", "S1", "Three consecutive working days on just one of these. Which?",
  [{ t: "Researching", l: { ANLY: 3 } }, { t: "Drafting", l: { BLD: 3 } },
   { t: "Going through documents", l: { DOCV: 3 } },
   { t: "Filings, checklists and making sure nothing is missed", l: { PROC: 3 } },
   { t: "Meetings, calls and negotiations", l: { ADVS: 3, CMRC: 1 } }]);

PICK("Q7", "S1", "Someone disagrees with you sharply, in front of other people. What comes naturally?",
  [{ t: "Push back straight away", l: { CNTST: 3 } },
   { t: "Make the point calmly once, and let it stand", l: { CNTST: 1 } },
   { t: "Take it away, think it through, come back to it", l: { CNTST: -1, ANLY: 2 } },
   { t: "It would stay with you for the rest of the day", l: { CNTST: -3 } }]);

RATE("Q8", "S1", "Part of the job is that someone whose interests are opposed to yours will actively try to defeat what you are doing — and it isn't personal. How appealing is working in that setting?",
  "CNTST", "Not at all", "Very");

PICK("Q9", "S1", "You're given a task and no clear instructions. Honestly?",
  [{ t: "Good — I'd work out what needs doing", l: { ANLY: 2 } },
   { t: "Fine, but I'd pin down the objective with someone first", l: { ADVS: 2 } },
   { t: "I'd find how it was done last time and follow that", l: { PROC: 2 } },
   { t: "I'd rather have a clear process to work to", l: { PROC: 2, ANLY: -1 } }]);

PICK("Q10", "S1", "Which kind of satisfaction feels strongest?",
  [{ t: "Finding the answer nobody else had found", l: { ANLY: 3 } },
   { t: "Producing something extremely well-written and precise", l: { BLD: 3 } },
   { t: "A matter closing on terms everyone can live with, though nobody got everything", l: { CMRC: 2, ADVS: 2 } },
   { t: "Finding the one detail that changes the whole picture", l: { INV: 3 } }]);

RATE("Q11", "S1", "Over a whole year, how much of your working day would you want to be talking to people rather than reading and writing?",
  "TALK", "Almost none of it", "Most of it");

/* -- S2 · Rhythm -- */
PICK("Q12", "S2", "It's 6pm on Friday. Your weekend has just been cancelled by a client. Which reaction is honestly yours?",
  [{ t: "Annoyed for ten minutes, then quite enjoying it", l: { PACE: 3 } },
   { t: "Fine occasionally — but not as a way of living", l: { PACE: 0 } },
   { t: "It would ruin more than the weekend", l: { PACE: -3 } },
   { t: "I'd want to know it was genuinely necessary before I minded either way", l: { PACE: 1, ADVS: 1 } }]);

RATE("Q13", "S2", "How appealing is a job where a client can call at 9pm and take the next two days?",
  "PACE", "Not at all", "Genuinely fine");

PICK("Q14", "S2", "Which of these rooms would you rather spend an afternoon in?",
  [{ t: "A negotiation between two organisations", l: { CMRC: 2, ADVS: 1 } },
   { t: "A hearing", l: { CNTST: 3 } },
   { t: "A meeting where you explain the options to a client", l: { ADVS: 3 } },
   { t: "A room where a team is going through documents and evidence", l: { DOCV: 2, INV: 2 } }]);

/* -- S3 · What pulls you in -- */
const SIT: [string, string][] = [
  ["A company is about to buy another and needs to know what it is actually buying", "ma"],
  ["Two businesses agreed something years ago, both now read it differently, and a great deal turns on which reading wins", "clit"],
  ["Money has moved through six companies in three countries and nobody can say why", "wc"],
  ["A government decision has affected thousands of people who had no say in it", "const_"],
  ["A business can't pay what it owes and several groups of creditors all want to be paid first", "insol"],
  ["Whether a payment counts as one kind of income or another changes what a company owes by crores", "tax"],
  ["A company's most valuable asset is a name, and someone else has started using it", "ip"],
  ["A factory is closing and several hundred people's terms of employment are in question", "emp"],
  ["A power project needs land, permits and financing, and one missing piece is holding up everything", "proj"],
  ["A company must decide what it may lawfully do with the personal information of forty million users", "tech"],
  ["A bank is about to lend a very large sum and needs certainty it can recover it if things go wrong", "bank"],
  ["Someone has been accused of an offence and their liberty depends on the next two weeks", "crim"],
  ["A marriage has ended and two people must divide a life, with a child in the middle", "fam"],
  ["Someone was injured by a defective product and has no realistic way to pursue the company alone", "cons"],
  ["A builder has taken money from two hundred buyers and the towers are half-built", "re"],
  ["A regulator has written a rule that nobody in the industry knows how to comply with", "secreg"],
];
push({ id: "Q15", sec: "S3", k: "rank", n: 5, set: SIT.map((x) => x[0]), map: SIT.map((x) => x[1]),
  q: "Sixteen situations. Pick the five you'd most want to understand properly, in order.",
  help: "Don't think about jobs — just which puzzles interest you." });

PICK("Q16", "S3", "Which of these sounds most interesting as a thing to be good at?",
  [{ t: "Working out how an organisation can lawfully do what it wants", l: { CMRC: 2 }, i: { ma: 2, bank: 2, proj: 2, re: 2 } },
   { t: "Working out who is legally right when two sides disagree", l: { ANLY: 1, CNTST: 1 }, i: { clit: 2, insol: 2, ip: 2 } },
   { t: "Working out what actually happened when the facts are unclear", l: { INV: 2 }, i: { wc: 2, crim: 2, cons: 2 } },
   { t: "Working out whether a public body has acted lawfully", l: { ANLY: 2 }, i: { const_: 2, secreg: 2, tax: 2 } }]);

PICK("Q17", "S3", "Which outcome would feel most rewarding at the end of a long matter?",
  [{ t: "A transaction closes and everyone can move on", i: { ma: 2, bank: 2, capm: 2, re: 2 } },
   { t: "Your client wins a contested case", i: { clit: 2, crim: 2, const_: 2 } },
   { t: "An organisation avoids a serious consequence it never saw coming", i: { comp: 2, secreg: 2, tax: 2, emp: 2 } },
   { t: "A person gets a remedy they would not otherwise have had", i: { fam: 2, cons: 2, emp: 2, crim: 2 } },
   { t: "Something broken gets rebuilt so it can carry on", i: { insol: 2, proj: 2, re: 2 } }]);

MULTI("Q18", "S3", "Which of these would you actually spend a free Saturday reading about?",
  [{ t: "Whether a new business model breaks competition rules", i: { comp: 3 } },
   { t: "Whether a particular transaction creates a tax liability", i: { tax: 3 } },
   { t: "Whether someone's fundamental rights have been infringed", i: { const_: 3 } },
   { t: "Whether a company can use people's data in a new product", i: { tech: 3 } },
   { t: "How a failing company gets rescued instead of wound up", i: { insol: 3 } },
   { t: "How a disputed piece of land ended up with two owners", i: { re: 3 } },
   { t: "What an employer owes someone it is about to dismiss", i: { emp: 3 } },
   { t: "How an investigation proved where money actually went", i: { wc: 3 } },
   { t: "Who owns an idea when two people say they had it first", i: { ip: 3 } }], 2);

PICK("Q19", "S3", "Which world sounds most interesting to spend a career inside?",
  [{ t: "Businesses, deals, investment and money", i: { ma: 2, bank: 2, capm: 2, re: 2, proj: 2 } },
   { t: "Courts, evidence, arguments and outcomes", i: { clit: 2, crim: 2, cons: 2, insol: 2 } },
   { t: "Regulators, rules, institutions and compliance", i: { comp: 2, secreg: 2, tax: 2, tech: 2 } },
   { t: "Individuals, families, rights and personal consequences", i: { fam: 2, const_: 2, emp: 2, wc: 2 } }]);

PICK("Q20", "S3", "If you could become genuinely exceptional at exactly one thing, which?",
  [{ t: "Structuring complicated transactions", l: { CMRC: 2, BLD: 1 }, i: { ma: 3, bank: 2, proj: 2 } },
   { t: "Building arguments that win", l: { ANLY: 1, CNTST: 2 }, i: { clit: 3, const_: 2, crim: 2 } },
   { t: "Knowing one body of regulation better than anyone else", l: { ANLY: 2, PROC: 1 }, i: { tax: 3, comp: 2, secreg: 2, emp: 2 } },
   { t: "Finding evidence and reconstructing what happened", l: { INV: 3 }, i: { wc: 3, crim: 2 } },
   { t: "Being the person clients bring their worst problem to", l: { ADVS: 3 }, i: { emp: 2, fam: 2, cons: 2 } }]);

PICK("Q21", "S3", "Which client problem would you most want to be handed?",
  [{ t: "“We want to enter a new market.”", l: { CMRC: 2 }, i: { ma: 2, secreg: 2, proj: 1 } },
   { t: "“We are being investigated.”", l: { INV: 2 }, i: { wc: 3, crim: 1 } },
   { t: "“An employee has made a serious allegation.”", l: { ADVS: 2, INV: 1 }, i: { emp: 3 } },
   { t: "“Someone is using our brand.”", l: { CNTST: 1 }, i: { ip: 3 } },
   { t: "“We cannot pay our lenders next month.”", l: { CMRC: 2 }, i: { insol: 3, bank: 2 } }]);

PICK("Q22", "S3", "Which moment would feel most satisfying?",
  [{ t: "Landing the final clause of a difficult negotiation", l: { BLD: 2 }, i: { ma: 2, bank: 2, re: 1 } },
   { t: "Finding the authority that decides the case", l: { ANLY: 3 }, i: { clit: 2, const_: 2 } },
   { t: "Finding the document that turns an investigation", l: { INV: 3 }, i: { wc: 2, crim: 2 } },
   { t: "Finding the regulatory route that lets the client proceed", l: { ANLY: 2, CMRC: 1 }, i: { secreg: 2, tax: 2, comp: 2 } },
   { t: "A client telling you they'd have made the wrong call without you", l: { ADVS: 3 }, i: { emp: 2, fam: 2, tech: 2 } }]);

/* -- S4 · Telling near neighbours apart -- */
PICK("Q23", "S4", "A company is being bought. Which part of the work would you rather own?",
  [{ t: "Working out what the buyer is actually acquiring, and negotiating the terms", l: { CMRC: 2, BLD: 1 }, i: { ma: 3 } },
   { t: "Arranging and documenting the money that pays for it", l: { DOCV: 2, BLD: 1 }, i: { bank: 3 } },
   { t: "Raising that money from investors or the market in the first place", l: { DOCV: 2, CMRC: 1 }, i: { capm: 3 } },
   { t: "Working out which approvals and restrictions apply before any of it can happen", l: { ANLY: 2, PROC: 1 }, i: { secreg: 2, comp: 2 } }]);

PICK("Q24", "S4", "Something has gone badly wrong at a company. Which version would you rather work on?",
  [{ t: "Finding out where the money went, and why", l: { INV: 3 }, i: { wc: 3 } },
   { t: "Proving in a tribunal that the other side broke the contract", l: { CNTST: 2, ANLY: 1 }, i: { clit: 3 } },
   { t: "Challenging the regulator's order in court", l: { CNTST: 2, ANLY: 1 }, i: { const_: 2, clit: 2, secreg: 1 } },
   { t: "Persuading the regulator not to make the order at all", l: { ADVS: 2, ANLY: 1 }, i: { secreg: 3, comp: 1 } },
   { t: "Restructuring the company so it survives", l: { CMRC: 2, PROC: 1 }, i: { insol: 3 } }]);

PICK("Q25", "S4", "A technology company asks for help. Which problem attracts you?",
  [{ t: "Protecting what it has built — its technology and its name", l: { PROC: 2 }, i: { ip: 3 } },
   { t: "Working out what it may lawfully do with its users' data", l: { ANLY: 2 }, i: { tech: 3 } },
   { t: "Raising its next round of funding", l: { CMRC: 3 }, i: { bank: 2, capm: 2 } },
   { t: "Writing the agreements it runs its business on", l: { BLD: 3 }, i: { ma: 2, tech: 1 } },
   { t: "Sorting out how it hires, and how it lets people go", l: { ADVS: 2 }, i: { emp: 3 } }]);

PICK("Q26", "S4", "A large infrastructure project has stalled. Which problem would you rather solve?",
  [{ t: "Nobody can prove who owns the land it is being built on", l: { DOCV: 2, PROC: 1 }, i: { re: 3 } },
   { t: "The lenders want more security before they release the next tranche", l: { CMRC: 2 }, i: { bank: 2, proj: 2 } },
   { t: "The two companies building it are blaming each other", l: { CNTST: 2 }, i: { clit: 3 } },
   { t: "A regulator and a local objection have frozen the clearance", l: { ANLY: 2, ADVS: 1 }, i: { proj: 2, secreg: 2, const_: 1 } }]);

PICK("Q27", "S4", "Which would you rather know more about than almost anyone?",
  [{ t: "One complicated tax regime", l: { ANLY: 2, CMRC: 2 }, i: { tax: 3 } },
   { t: "How companies are bought and sold", l: { CMRC: 2 }, i: { ma: 3 } },
   { t: "How financial institutions are regulated", l: { PROC: 2 }, i: { secreg: 2, bank: 2, capm: 1 } },
   { t: "How the employment relationship is regulated", l: { ADVS: 2 }, i: { emp: 3 } },
   { t: "How evidence is gathered, tested and disbelieved", l: { INV: 2 }, i: { crim: 2, wc: 2, cons: 1 } }]);

PICK("Q28", "S4", "An organisation wants to do something new and has asked whether it can. Which part of that would you rather own?",
  [{ t: "Mapping the rule across every State it operates in", l: { DOCV: 2, PROC: 1 }, i: { emp: 3, secreg: 1 } },
   { t: "Working out what it costs, in tax, if they structure it one way or another", l: { CMRC: 2 }, i: { tax: 3 } },
   { t: "Working out whether it distorts the market they're in", l: { ANLY: 2 }, i: { comp: 3 } },
   { t: "Working out what it means for the data they hold", l: { ANLY: 2 }, i: { tech: 3 } },
   { t: "Getting the licence that lets them start", l: { PROC: 2 }, i: { secreg: 3 } }]);

PICK("Q29", "S4", "If you were going to spend your life in court, which court?",
  [{ t: "Commercial benches and arbitral tribunals — contracts and money", i: { clit: 3 } },
   { t: "Criminal courts — liberty, evidence and trial", i: { crim: 3 } },
   { t: "Constitutional benches — writs and public law", i: { const_: 3 } },
   { t: "Specialist tribunals — NCLT, ITAT, consumer, sectoral appellate", i: { insol: 2, tax: 2, cons: 2, secreg: 1 } },
   { t: "I'd rather not spend my life in court", l: { CNTST: -2 }, i: { ma: 1, bank: 1, tech: 1, emp: 1 } }]);

/* -- S5 · What the work is really like -- */
RATE("Q30", "S5", "A great deal of junior transactional work is this: reading a large number of contracts, listing every problem in them, and revising the same agreement over and over as the other side sends changes back. Three weeks of it. How do you expect you'd feel?",
  "DOCV", "I'd hate it", "I'd genuinely be fine");

PICK("Q31", "S5", "Junior disputes work is mostly research, document preparation, procedural steps, waiting and adjournments — with occasional short appearances that are usually routine. Which part would you find most tolerable?",
  [{ t: "The weeks of research", l: { ANLY: 3 } },
   { t: "Preparing the documents and the evidence", l: { DOCV: 2, BLD: 2 } },
   { t: "Keeping the procedure and the dates straight", l: { PROC: 3 } },
   { t: "The appearances, however short", l: { CNTST: 3 } },
   { t: "Explaining to an anxious client what is happening and why", l: { ADVS: 3 } }]);

PICK("Q32", "S5", "Some work is reconstructing what happened: going through records and messages, interviewing people whose accounts conflict, building a picture from fragments — often under time pressure, and often without ever learning the whole truth. Which part appeals?",
  [{ t: "Reconstructing the sequence from the material", l: { INV: 3 } },
   { t: "Working out what the law makes of it", l: { ANLY: 2 } },
   { t: "Deciding the strategy and arguing it", l: { CNTST: 2 } },
   { t: "Talking to the people and understanding their versions", l: { ADVS: 2, INV: 1 } },
   { t: "None of it appeals", l: { INV: -3 }, excl: 1 }]);

PICK("Q33", "S5", "Some work is about rules: reading them very closely, working out how they apply to an organisation that wasn't designed with them in mind, and being right about it. Which version would you rather do?",
  [{ t: "Reading the rules closely and advising what compliance requires", l: { PROC: 2, ANLY: 2 } },
   { t: "Arguing that the regulator has got it wrong", l: { CNTST: 2, ANLY: 1 } },
   { t: "Finding a commercially workable route through them", l: { CMRC: 3, ADVS: 1 } },
   { t: "Being in the room while the organisation is investigated", l: { INV: 2, PACE: 1 } },
   { t: "Rules work doesn't appeal at all", i: { secreg: -3, comp: -2, tax: -2, emp: -2, ip: -2 }, excl: 1 }]);

PICK("Q34", "S5", "Advisory work has a particular shape: you tell them what the risk is, they take a commercial decision anyway, and if you were right nobody ever finds out — because the thing you warned about didn't happen. How does that sit with you?",
  [{ t: "Fine — being the person they check with is the job", l: { ADVS: 3 } },
   { t: "I'd want to be closer to the decision than that", l: { CMRC: 3, ADVS: 1 } },
   { t: "I'd rather my work were tested by someone on the other side", l: { CNTST: 3, ADVS: -1 } },
   { t: "I'd find invisible work hard to keep caring about", l: { ADVS: -3 } }]);

PICK("Q35", "S5", "Which of these would you find hardest to sustain for two years?",
  [{ t: "Paperwork on one company's transactions", i: { ma: -2, bank: -2, capm: -2, re: -2 } },
   { t: "A case that may still be lost at the end", i: { clit: -2, const_: -2, crim: -2 } },
   { t: "Rules that a single notification can change overnight", i: { secreg: -2, tax: -2, comp: -2, tech: -2 } },
   { t: "One family's dispute, at close range", i: { fam: -2, cons: -2 } },
   { t: "Procedure, filings and tribunal dates", i: { insol: -2, ip: -2, capm: -1 } }]);

push({ id: "Q36", sec: "S5", k: "multi", q: "Which of these would honestly be a real problem for you over several years?",
  help: "Select any that apply — or none.",
  set: ["Long stretches where nothing visible happens",
    "Being the most junior person in every room for a long time",
    "Work that is mostly reading rather than talking",
    "Work that is mostly talking rather than reading",
    "Never really knowing whether you did well",
    "Being the one responsible when something goes wrong",
    "Repeating very similar work many times",
    "Having little control over your own hours"],
  av: [{ clit: -2, const_: -2, insol: -2, proj: -2 },
    { ma: -2, bank: -2, capm: -2 },
    { l: { ADVS: 2, ANLY: -2, DOCV: -2 } },
    { l: { ANLY: 2, DOCV: 2, ADVS: -2 } },
    { const_: -2, tech: -2, secreg: -2 },
    { crim: -2, wc: -2, fam: -2 },
    { capm: -2, ip: -2, bank: -2, re: -2 },
    { ma: -2, wc: -2, clit: -2, crim: -2 }],
  none: "None of these" });

PICK("Q37", "S5", "__DYNAMIC__",
  [{ t: "Still choose it — the subject matters that much to me", blend: "A" },
   { t: "Probably choose it, but I'd want to test it first", blend: "B" },
   { t: "Look for a neighbouring area with a better mix of work", blend: "C" },
   { t: "Probably choose something else", blend: "D" }]);

/* -- S6 · Where you'd work -- */
push({ id: "Q38", sec: "S6", k: "rank", n: 4,
  set: ["A firm — structured, supported, you specialise early, the work and the hours are both heavy",
    "Under an individual practitioner — court from the start, little structure, very little money for several years",
    "Inside one organisation — you know the business deeply, hours are more predictable, progress is slower",
    "A public role reached by examination or appointment — institutional, research-heavy, secure, slow"],
  dest: ["firm", "chamber", "inhouse", "public"],
  q: "Rank these four working lives, most to least appealing.",
  help: "Each one states its own cost. That's deliberate." });

PICK("Q39", "S6", "If money were not a consideration for your first five years, would that ranking change?",
  [{ t: "No, it would be the same" },
   { t: "Yes — I'd move independent practice up", flag: "chamber" },
   { t: "Yes — something else would move" }]);

RATE("Q40", "S6", "Being honest, and nobody sees this: how much does your starting salary matter for your first three years?",
  "MONEY", "Barely at all", "It's the deciding factor", { nocs: 1 });

RATE("Q41", "S6", "Inside a company you mostly decide what outside lawyers do, say no a good deal, and rarely draft the document yourself. How appealing is that?",
  "INHOUSE", "Not at all", "Very");

push({ id: "Q42", sec: "S6", k: "multi", q: "Where would you be willing to be based for your first five years?",
  set: ["Delhi NCR", "Mumbai", "Bengaluru", "Another metro", "A tier-2 city", "My home town, whatever it offers", "Anywhere — I'd move for the work"],
  none: "I don't know yet", city: 1 });

PICK("Q43", "S6", "Could you work day to day in a language other than English — reading records, talking to clients, in court?",
  [{ t: "Yes, comfortably", lang: 2 }, { t: "With effort, and I'd be willing", lang: 1 }, { t: "Realistically, no", lang: 0 }], { nocs: 1 });

/* -- S7 · What you've done -- */
push({ id: "Q44", sec: "S7", k: "multi", q: "Which of these have you actually done, even once, even briefly?",
  help: "This is about tasks, not where you did them. Where doesn't count here — deliberately.",
  set: ["Legal research", "Case-law research", "Contract review", "Contract drafting", "Petition or application drafting",
    "Document review of a large set", "Due diligence", "Compliance or policy work", "Investigation or fact-finding",
    "Client interaction", "Negotiation", "Attending a hearing or arbitration", "Working with financial statements",
    "Policy or legislative research", "Mooting or a client-counselling competition"],
  none: "None yet" });

PICK("Q45", "S7", "How much do you genuinely know about what lawyers in different practices do day to day?",
  [{ t: "Very little — I'm mostly imagining it", k: "a" },
   { t: "Some — I've read about it or spoken to people", k: "b" },
   { t: "Quite a lot — I've worked in more than one environment", k: "c" },
   { t: "A clear picture, from work I've done myself", k: "d" }], { nocs: 1 });

PICK("Q46", "S7", "Roughly how many internships or placements have you done?",
  [{ t: "None yet", n: 0 }, { t: "1–2", n: 1 }, { t: "3–4", n: 2 }, { t: "5–6", n: 3 }, { t: "7 or more", n: 4 }], { nocs: 1 });

PICK("Q47", "S7", "Last one. Which is most accurate right now?",
  [{ t: "I have a strong idea of the area I want", f: "confirm" },
   { t: "I have two or three areas in mind", f: "compare" },
   { t: "I have no idea yet", f: "explore" },
   { t: "I thought I knew, and now I'm not sure", f: "reexamine" }], { nocs: 1 });

/* one mark per question */
export const QMARK: Record<string, string> = {
  Q1: "compass", Q2: "clipboard", Q3: "stack", Q4: "nib", Q5: "lens", Q6: "calendar", Q7: "people", Q8: "bench",
  Q9: "route", Q10: "seal", Q11: "quotes", Q12: "calendar", Q13: "clock", Q14: "table", Q15: "bundle", Q16: "compass",
  Q17: "scales", Q18: "book", Q19: "columns", Q20: "ladder", Q21: "people", Q22: "lens", Q23: "seal", Q24: "lens",
  Q25: "chip", Q26: "tower", Q27: "book", Q28: "clipboard", Q29: "bench", Q30: "stack", Q31: "bench", Q32: "lens",
  Q33: "clipboard", Q34: "people", Q35: "clock", Q36: "scales", Q37: "route", Q38: "columns", Q39: "coin", Q40: "coin",
  Q41: "door", Q42: "map", Q43: "quotes", Q44: "ladder", Q45: "book", Q46: "gate", Q47: "compass",
};

export type SectionDef = {
  id: string; name: string; line: string; mark: string; a: number; b: number;
};
export const SECTIONS: SectionDef[] = [
  { id: "S1", name: "How you work", line: "How you like to spend a day.", mark: "book", a: 0, b: 0 },
  { id: "S2", name: "Rhythm", line: "Now — the shape of the week.", mark: "clock", a: 0, b: 0 },
  { id: "S3", name: "What pulls you", line: "Next, what actually interests you.", mark: "lens", a: 0, b: 0 },
  { id: "S4", name: "Narrowing down", line: "A few questions to tell close paths apart.", mark: "bundle", a: 0, b: 0 },
  { id: "S5", name: "Reality check", line: "Now the honest part — what the work is really like.", mark: "bench", a: 0, b: 0 },
  { id: "S6", name: "Where you'd work", line: "Where, and on what terms.", mark: "columns", a: 0, b: 0 },
  { id: "S7", name: "What you've done", line: "Last stretch. A little about you.", mark: "seal", a: 0, b: 0 },
];
SECTIONS.forEach((s) => {
  s.a = Q.findIndex((x) => x.sec === s.id);
  s.b = Q.map((x) => x.sec).lastIndexOf(s.id);
});
export const secOf = (i: number) => SECTIONS.find((s) => i >= s.a && i <= s.b) || SECTIONS[0];
