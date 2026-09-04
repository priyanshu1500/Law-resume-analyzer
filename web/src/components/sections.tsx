import {
  UploadSimpleIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  TrendUpIcon,
  BookOpenIcon,
  BankIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { Eyebrow } from "./ui";
import { Courthouse } from "./illus";

const STEPS = [
  { n: 1, icon: UploadSimpleIcon, t: "Upload", d: "Upload your resume in PDF format.", c: "bg-navy" },
  { n: 2, icon: MagnifyingGlassIcon, t: "Analyse", d: "Our AI deeply analyses your resume.", c: "bg-gold" },
  { n: 3, icon: ChartBarIcon, t: "Get Insights", d: "Receive detailed feedback and scores.", c: "bg-teal" },
  { n: 4, icon: TrendUpIcon, t: "Improve", d: "Enhance your resume and stand out.", c: "bg-navy" },
];

const FEATURES = [
  { icon: BookOpenIcon, t: "Legal Context Aware", d: "Understands legal terms, roles & qualifications." },
  { icon: BankIcon, t: "Indian Legal Landscape", d: "Tailored for Indian law firms, chambers & institutions." },
  { icon: ShieldCheckIcon, t: "Confidential & Secure", d: "Your data stays private. Always." },
];

export function HowItWorks() {
  return (
    <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      {/* timeline */}
      <div id="how">
        <Reveal>
          <Eyebrow>How It Works</Eyebrow>
          <div className="mt-3 h-[3px] w-10 rounded-full bg-gold" />
        </Reveal>
        <RevealGroup className="mt-10 flex flex-wrap items-start gap-x-3 gap-y-8 sm:flex-nowrap">
          {STEPS.map(({ n, icon: Icon, t, d, c }, i) => (
            <RevealItem key={n} className="flex min-w-[120px] flex-1 flex-col items-center text-center">
              <div className="relative">
                <span className={`grid size-14 place-items-center rounded-full ${c} text-white`}>
                  <Icon size={22} weight="regular" />
                </span>
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full border-2 border-white bg-ink text-[0.625rem] font-bold text-white">
                  {n}
                </span>
              </div>
              <div className="mt-4 text-[0.95rem] font-bold text-ink">{t}</div>
              <p className="mt-1 text-[0.8125rem] leading-snug text-muted">{d}</p>
              {i < STEPS.length - 1 && (
                <span className="mt-5 hidden text-lg tracking-[0.2em] text-line sm:block">···</span>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* features + courthouse */}
      <div id="features" className="lg:border-l lg:border-line lg:pl-16">
        <RevealGroup className="space-y-7">
          {FEATURES.map(({ icon: Icon, t, d }) => (
            <RevealItem key={t} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-navy text-white">
                <Icon size={20} weight="regular" />
              </span>
              <div>
                <div className="text-[0.9375rem] font-bold tracking-tight text-ink">{t}</div>
                <p className="mt-0.5 max-w-[34ch] text-[0.875rem] leading-snug text-muted">{d}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={200} className="mt-6 flex justify-end">
          <Courthouse size={190} />
        </Reveal>
      </div>
    </div>
  );
}
