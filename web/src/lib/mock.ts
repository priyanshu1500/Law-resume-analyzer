/** Mock analysis output. Stands in for the AI response until the backend exists. */

export const PRICING = {
  analysis: 1499, // INR, one-off resume analysis + report
  rewrite: 3999, // INR, human rewrite of the resume by the LexIntent desk
  currency: "₹",
};

export const SCORE = {
  overall: 78,
  band: "Good Potential",
  note: "You are on the right track. Strengthening a few key areas would materially improve your standing with top firms.",
  breakdown: [
    { key: "Content Quality", value: 82 },
    { key: "Legal Experience", value: 74 },
    { key: "Skills & Abilities", value: 70 },
    { key: "Achievements & Impact", value: 68 },
    { key: "Presentation & Clarity", value: 80 },
  ],
};

export const FORECAST = {
  chance: 68,
  target: "Tier-1 firms",
  verdict: "High chance",
  detail:
    "Based on your intake answers and resume, you are a credible applicant for a Tier-1 recruitment cycle, with two fixable gaps standing between you and a strong shortlist position.",
};

export const CAREER_PATH = {
  area: "Corporate Law",
  match: 78,
  rationale:
    "Your transactional internship exposure, drafting confidence and stated interest in M&A point consistently toward a corporate seat. Your litigation signal is thinner, so a disputes pivot would cost you time.",
};

export const STRENGTHS = [
  "Strong and consistent academic record across all years",
  "Internship spread covers firm, chambers and in-house settings",
  "Demonstrated legal research and drafting through published work",
  "Moot court record shows advocacy under pressure",
];

export const IMPROVEMENTS = [
  "Add at least one substantive corporate / M&A internship",
  "Make deal and matter exposure explicit, with your specific role",
  "Quantify achievements: cohort rank, competition fields, pro bono hours",
  "Tighten the experience section; lead each entry with the outcome",
];

export const REPORT_SECTIONS = [
  {
    id: "content",
    index: "01",
    title: "Content & Substance",
    verdict: "Solid, under-evidenced in places",
    body: "Your resume asserts capability that your intake answers support, but the document does not always show the work. Three internship entries describe the employer more than your contribution. Recruiters skim for the verb that belongs to you: drafted, argued, reviewed, advised. Rewrite each entry to open with that verb and the matter it attached to.",
    points: [
      "Employer-led phrasing in 3 of 6 experience entries",
      "No linked writing sample or portfolio reference",
      "Publications listed without one-line relevance notes",
    ],
  },
  {
    id: "experience",
    index: "02",
    title: "Legal Experience",
    verdict: "Broad, needs a corporate anchor",
    body: "You have interned across settings, which reads as curiosity rather than direction. For a corporate target, one recognised transactional internship would do more than two more general ones. Where you did touch deal work, the resume buries it in a list. Pull it to the front.",
    points: [
      "Transactional exposure present but not foregrounded",
      "Chambers internship is your strongest entry, so move it up",
      "Gap between penultimate and final year is unexplained",
    ],
  },
  {
    id: "presentation",
    index: "03",
    title: "Presentation & Clarity",
    verdict: "Clean, slightly generic",
    body: "The layout is readable and the length is right at one page. The template is a common one, so the document does not distinguish you on sight. Type hierarchy is flat: your name, section headings and body text sit too close in weight. A firmer hierarchy and a consistent date format would lift perceived polish without a redesign.",
    points: [
      "Flat typographic hierarchy, headings do not separate",
      "Two date formats used across sections",
      "Skills section is a keyword list without proficiency signal",
    ],
  },
];

export const RESOURCES = [
  { title: "How to get into Tier-1 Law Firms", kind: "Guide" },
  { title: "Resume Writing for Law Students", kind: "Guide" },
  { title: "Top 50 Law Firms, ranked", kind: "Report" },
  { title: "Judiciary Preparation Roadmap", kind: "Guide" },
];

export const ACTIVITY = [
  { label: "Resume analysed", date: "24 Aug 2026" },
  { label: "Intake completed", date: "24 Aug 2026" },
  { label: "Account created", date: "23 Aug 2026" },
];
