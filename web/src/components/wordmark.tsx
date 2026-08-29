import { ScalesIcon } from "@phosphor-icons/react/dist/ssr";

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 place-items-center border border-ink/70 text-ink">
        <ScalesIcon size={20} weight="regular" />
      </span>
      {!compact && (
        <div className="leading-none">
          <div className="u-serif text-[1.35rem] tracking-tight text-ink">
            LexIntent <span className="text-oxblood">AI</span>
          </div>
          <div className="u-eyebrow mt-1 text-[0.5625rem]">
            Law Career Intelligence
          </div>
        </div>
      )}
    </div>
  );
}
