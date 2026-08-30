import Image from "next/image";
import { ScalesIcon } from "@phosphor-icons/react/dist/ssr";
import { TESTIMONIALS, SCHOOLS } from "@/lib/mock";

export function Testimonials() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-center">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
        {TESTIMONIALS.map((t, i) => (
          <div key={t.by} className="flex items-center gap-4">
            {t.avatar && (
              <Image
                src={`https://picsum.photos/seed/lexintent-face-${i}/80/80?grayscale`}
                alt=""
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-full border border-ink object-cover"
              />
            )}
            <p className="max-w-[24ch] font-doc text-[0.95rem] italic leading-snug text-ink">
              &ldquo;{t.quote}&rdquo;
              <span className="mt-1 block font-sans text-[0.6875rem] not-italic uppercase tracking-[0.12em] text-muted">
                {t.by}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="lg:border-l lg:border-rule lg:pl-10">
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-muted">
          Trusted by students from
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {SCHOOLS.map((s) => (
            <span
              key={s}
              className="flex items-center gap-2 border border-rule-strong px-3 py-2 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-ink"
            >
              <ScalesIcon size={13} weight="regular" />
              {s}
            </span>
          ))}
          <span className="text-[0.6875rem] italic text-muted">&amp; more</span>
        </div>
      </div>
    </div>
  );
}
