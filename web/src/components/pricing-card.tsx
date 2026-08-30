import { Button, Check } from "./ui";
import { PRICING } from "@/lib/mock";

type Tier = (typeof PRICING.tiers)[number];

export function PricingCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={`relative flex flex-col border border-ink bg-[#f7f3e8] p-6 text-ink [--ink:#1a1a1a] [--ink-soft:#40403b] [--muted:#8c8880] [--oxblood:#7a1712] [--rule:#d9d4c7] ${
        tier.featured
          ? "shadow-[8px_8px_0_rgba(0,0,0,0.55)]"
          : "shadow-[6px_6px_0_rgba(0,0,0,0.35)]"
      }`}
    >
      {tier.badge && (
        <span className="absolute right-5 top-5 bg-stamp px-2 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-ink">
          {tier.badge}
        </span>
      )}

      <div className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink">
        {tier.name}
      </div>
      <div className="mt-2 u-display text-[2.5rem] leading-[0.8] text-oxblood">
        {PRICING.currency}
        {tier.price.toLocaleString("en-IN")}
      </div>
      <div className="mt-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-oxblood">
        {tier.cadence}
      </div>

      {tier.intro && (
        <p className="mt-4 text-[0.8125rem] text-ink-soft">{tier.intro}</p>
      )}

      <ul className="mt-4 grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
        {tier.features.map((f) => (
          <Check key={f}>{f}</Check>
        ))}
      </ul>

      <div className="mt-6 flex-1" />
      <Button
        href="/assessment"
        variant={tier.featured ? "ink" : "oxblood"}
        className="w-full"
      >
        {tier.cta}
      </Button>
    </div>
  );
}
