/**
 * LexIntent AI — intake instrument.
 * ~50 questions across 9 sections. Answers feed the AI resume analysis
 * so the report is scored against the candidate's own stated goals.
 */

export type QuestionType = "single" | "multi" | "scale" | "text" | "number";

export interface Question {
  id: string;
  prompt: string;
  help?: string;
  type: QuestionType;
  options?: string[];
  /** for scale questions */
  scaleLabels?: [string, string];
  optional?: boolean;
}

export interface Section {
  id: string;
  index: string; // "01"
  title: string;
  standfirst: string;
  questions: Question[];
}

export const SECTIONS: Section[] = [
  {
    id: "foundation",
    index: "01",
    title: "Academic Foundation",
    standfirst:
      "Where you studied and how far along you are. This sets the baseline the rest of the report is read against.",
    questions: [
      {
        id: "degree",
        prompt: "Which law programme are you enrolled in or did you complete?",
        type: "single",
        options: ["3-year LL.B.", "5-year B.A. LL.B.", "5-year B.B.A. LL.B.", "LL.M.", "Ph.D. / M.Phil.", "Other"],
      },
      {
        id: "year",
        prompt: "What year of study are you in?",
        type: "single",
        options: ["1st year", "2nd year", "3rd year", "4th year", "5th year", "Graduated, 0-1 yr out", "Graduated, 2+ yrs out"],
      },
      {
        id: "institution_tier",
        prompt: "How would you describe your institution?",
        help: "Used only to calibrate expectations, never as a ceiling.",
        type: "single",
        options: ["National Law University", "Top private university", "State / government law college", "Affiliated / regional college", "Foreign university"],
      },
      {
        id: "cgpa",
        prompt: "What is your current CGPA or percentage?",
        type: "text",
        help: "e.g. 7.8/10, or 68%",
      },
      {
        id: "class_rank",
        prompt: "Roughly where do you sit in your cohort?",
        type: "single",
        options: ["Top 5%", "Top 10%", "Top 25%", "Upper half", "Lower half", "Not sure"],
      },
      {
        id: "specialisation",
        prompt: "Do you have a declared honours / specialisation track?",
        type: "text",
        optional: true,
        help: "Leave blank if none.",
      },
    ],
  },
  {
    id: "recognition",
    index: "02",
    title: "Performance & Recognition",
    standfirst:
      "Prizes, ranks and selective achievements. Recruiters read these as proxies for consistency under pressure.",
    questions: [
      {
        id: "scholarships",
        prompt: "Have you held any merit scholarships or grants?",
        type: "single",
        options: ["Yes, national / competitive", "Yes, institutional", "Yes, need-based", "No"],
      },
      {
        id: "honours",
        prompt: "List academic honours (deans list, gold medal, subject prizes).",
        type: "text",
        optional: true,
      },
      {
        id: "moot_count",
        prompt: "How many moot court competitions have you participated in?",
        type: "single",
        options: ["0", "1-2", "3-4", "5-7", "8+"],
      },
      {
        id: "moot_best",
        prompt: "Best moot result to date?",
        type: "single",
        options: ["Winner", "Finalist", "Semi-finalist", "Best Memorial / Best Speaker", "Participated", "N/A"],
      },
      {
        id: "publications_count",
        prompt: "How many pieces have you published (journals, blogs, edited volumes)?",
        type: "single",
        options: ["0", "1-2", "3-5", "6-10", "10+"],
      },
      {
        id: "publication_tier",
        prompt: "Highest-standing venue you have published in?",
        type: "single",
        options: ["Peer-reviewed / UGC-CARE journal", "Established law blog", "Institutional newsletter", "Student journal", "None yet"],
      },
    ],
  },
  {
    id: "exposure",
    index: "03",
    title: "Practical Exposure",
    standfirst:
      "Internships and hands-on legal work. This is the single biggest driver of a strong early-career legal resume.",
    questions: [
      {
        id: "intern_count",
        prompt: "How many legal internships have you completed?",
        type: "single",
        options: ["0", "1-2", "3-4", "5-6", "7+"],
      },
      {
        id: "intern_types",
        prompt: "Which settings have you interned in?",
        type: "multi",
        options: ["Tier-1 law firm", "Boutique / mid-size firm", "Senior advocate's chambers", "In-house legal team", "Judicial clerkship / court", "NGO / legal aid", "Policy think tank", "Regulator / government"],
      },
      {
        id: "intern_longest",
        prompt: "Longest single internship?",
        type: "single",
        options: ["Under 2 weeks", "2-4 weeks", "1-2 months", "3-5 months", "6 months+"],
      },
      {
        id: "deal_exposure",
        prompt: "Have you had substantive transactional or deal exposure?",
        type: "scale",
        scaleLabels: ["None", "Extensive"],
      },
      {
        id: "litigation_exposure",
        prompt: "Have you had substantive litigation / disputes exposure?",
        type: "scale",
        scaleLabels: ["None", "Extensive"],
      },
      {
        id: "ppo",
        prompt: "Have you received a pre-placement offer (PPO) or return offer?",
        type: "single",
        options: ["Yes, accepted", "Yes, declined / pending", "No", "Not applicable yet"],
      },
    ],
  },
  {
    id: "skills",
    index: "04",
    title: "Skill Inventory",
    standfirst:
      "Self-rated competencies. The AI cross-checks these against what your resume actually evidences.",
    questions: [
      { id: "sk_research", prompt: "Legal research (databases, precedent, statutory interpretation)", type: "scale", scaleLabels: ["Novice", "Strong"] },
      { id: "sk_drafting", prompt: "Drafting (contracts, pleadings, opinions, memos)", type: "scale", scaleLabels: ["Novice", "Strong"] },
      { id: "sk_advocacy", prompt: "Oral advocacy / courtcraft", type: "scale", scaleLabels: ["Novice", "Strong"] },
      { id: "sk_diligence", prompt: "Due diligence & document review", type: "scale", scaleLabels: ["Novice", "Strong"] },
      { id: "sk_negotiation", prompt: "Negotiation & client counselling", type: "scale", scaleLabels: ["Novice", "Strong"] },
      {
        id: "languages",
        prompt: "Which languages can you work in professionally?",
        type: "text",
        help: "e.g. English, Hindi, French",
      },
      {
        id: "tools",
        prompt: "Which research / practice tools are you fluent in?",
        type: "multi",
        options: ["SCC Online", "Manupatra", "Westlaw", "LexisNexis", "HeinOnline", "Practical Law", "Kleos / practice mgmt", "None yet"],
      },
    ],
  },
  {
    id: "practice",
    index: "05",
    title: "Practice Direction",
    standfirst:
      "The kind of law you want to do. The report weights your profile against the norms of these specific areas.",
    questions: [
      {
        id: "primary_area",
        prompt: "Primary practice area you are aiming for",
        type: "single",
        options: ["Corporate / M&A", "Banking & Finance", "Disputes / Litigation", "Competition", "Intellectual Property", "Tax", "Criminal", "Constitutional / Public law", "Data & Technology", "Real Estate", "Employment", "Policy / Regulatory"],
      },
      {
        id: "secondary_area",
        prompt: "Secondary area you would also consider",
        type: "single",
        options: ["Corporate / M&A", "Banking & Finance", "Disputes / Litigation", "Competition", "Intellectual Property", "Tax", "Criminal", "Constitutional / Public law", "Data & Technology", "Real Estate", "Employment", "Policy / Regulatory", "Open to anything"],
      },
      {
        id: "setting_pref",
        prompt: "Preferred setting for your first role",
        type: "single",
        options: ["Large full-service firm", "Boutique / specialist firm", "Independent counsel / chambers", "In-house", "Government / judiciary", "Development sector", "Undecided"],
      },
      {
        id: "why_area",
        prompt: "In one or two sentences, why that area?",
        type: "text",
        help: "This helps the report judge whether your resume tells a coherent story.",
      },
    ],
  },
  {
    id: "professional",
    index: "06",
    title: "Professional Activity",
    standfirst:
      "Memberships, certifications and the extracurricular record that signals initiative beyond coursework.",
    questions: [
      {
        id: "bar",
        prompt: "Are you enrolled with a Bar Council?",
        type: "single",
        options: ["Yes", "Eligible, not yet enrolled", "Not yet eligible", "Pursuing a non-litigation path"],
      },
      {
        id: "certifications",
        prompt: "List any certifications (arbitration, competition law, IP, contract drafting, etc.).",
        type: "text",
        optional: true,
      },
      {
        id: "leadership",
        prompt: "Have you held a leadership role in a society, committee, journal or cell?",
        type: "multi",
        options: ["Editorial board", "Moot court committee", "Society / cell convenor", "Student bar / council", "Event / conference lead", "Community / pro bono lead", "None"],
      },
      {
        id: "competitions",
        prompt: "Non-moot competitions entered (debates, negotiation, ADR, MUN, essay).",
        type: "single",
        options: ["0", "1-3", "4-6", "7-10", "10+"],
      },
      {
        id: "pro_bono",
        prompt: "Roughly how many hours of pro bono / legal aid work have you done?",
        type: "single",
        options: ["0", "Under 20", "20-50", "50-100", "100+"],
      },
    ],
  },
  {
    id: "portfolio",
    index: "07",
    title: "Work Product",
    standfirst:
      "The tangible things you can show. A resume backed by linked work reads very differently from one that only asserts.",
    questions: [
      {
        id: "writing_sample",
        prompt: "Do you have a polished writing sample ready to send?",
        type: "single",
        options: ["Yes, several", "Yes, one", "A draft that needs work", "No"],
      },
      {
        id: "portfolio_links",
        prompt: "Do you maintain public links to your work (SSRN, blog, LinkedIn articles)?",
        type: "single",
        options: ["Yes, actively", "Yes, but outdated", "No"],
      },
      {
        id: "research_projects",
        prompt: "Have you worked as a research assistant to a professor or practitioner?",
        type: "single",
        options: ["Yes, ongoing", "Yes, completed", "No"],
      },
      {
        id: "notable_work",
        prompt: "Describe one piece of legal work you are most proud of.",
        type: "text",
        help: "A brief, a memo, an argued point, a published note. Two or three sentences.",
      },
    ],
  },
  {
    id: "targets",
    index: "08",
    title: "Career Targets",
    standfirst:
      "What you are actually aiming at. The gap between target and current profile is the core output of the report.",
    questions: [
      {
        id: "target_tier",
        prompt: "What tier of employer are you targeting first?",
        type: "single",
        options: ["Tier-1 firm", "Tier-2 firm", "Reputable boutique", "Senior counsel chambers", "In-house at a large company", "Public sector / judiciary", "Still deciding"],
      },
      {
        id: "geography",
        prompt: "Where do you want to practise?",
        type: "multi",
        options: ["Delhi NCR", "Mumbai", "Bengaluru", "Other metro (India)", "Tier-2 city (India)", "Abroad"],
      },
      {
        id: "timeline",
        prompt: "When do you need to be placed?",
        type: "single",
        options: ["Already applying", "Within 3 months", "This academic year", "Next year", "1-2 years out"],
      },
      {
        id: "comp_expectation",
        prompt: "What starting compensation would you consider a good outcome?",
        type: "single",
        options: ["Market-leading", "Solid / mid-market", "Willing to trade pay for the right seat", "Not a priority right now"],
      },
      {
        id: "biggest_worry",
        prompt: "What is your biggest worry about your candidacy right now?",
        type: "text",
      },
    ],
  },
  {
    id: "resume-self",
    index: "09",
    title: "Resume Self-Assessment",
    standfirst:
      "Your read on your own document, before ours. We compare your answers here to what the analysis finds.",
    questions: [
      {
        id: "resume_length",
        prompt: "How long is your current resume?",
        type: "single",
        options: ["1 page", "1.5 pages", "2 pages", "More than 2 pages"],
      },
      {
        id: "resume_updated",
        prompt: "When did you last meaningfully revise it?",
        type: "single",
        options: ["This month", "Within 3 months", "This year", "Over a year ago", "Can't remember"],
      },
      {
        id: "resume_format",
        prompt: "What format is it in?",
        type: "single",
        options: ["Plain single-column", "Two-column / sidebar", "Designed template (Canva etc.)", "Firm / university template"],
      },
      {
        id: "resume_tailoring",
        prompt: "Do you tailor it per application?",
        type: "single",
        options: ["Always", "Sometimes", "Rarely", "Never"],
      },
      {
        id: "resume_confidence",
        prompt: "How confident are you that it represents you well?",
        type: "scale",
        scaleLabels: ["Not at all", "Very"],
      },
      {
        id: "resume_goal",
        prompt: "What do you most want this analysis to tell you?",
        type: "text",
      },
    ],
  },
];

export const TOTAL_QUESTIONS = SECTIONS.reduce(
  (n, s) => n + s.questions.length,
  0,
);
