"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileArrowUpIcon, FileTextIcon, CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteNav } from "@/components/site-nav";
import { Eyebrow } from "@/components/ui";
import { useSession } from "@/lib/store";

const STAGES = [
  "Extracting document text",
  "Reading structure and formatting",
  "Scoring against the rulebook",
  "Assembling your report",
];

export default function UploadPage() {
  const router = useRouter();
  const { state, ready, update } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const name = file?.name ?? null;

  function accept(f: File | undefined) {
    if (!f) return;
    setError(null);
    setFile(f);
    update({ resumeName: f.name });
  }

  async function run() {
    if (!file) return;
    setError(null);
    setRunning(true);
    setStage(0);
    // cosmetic stage progression while the real request is in flight —
    // stops advancing at the last stage until the response actually lands
    const ticker = setInterval(() => setStage((s) => Math.min(s + 1, STAGES.length - 1)), 900);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/analyze", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Analysis failed");
      clearInterval(ticker);
      setStage(STAGES.length);
      update({ findings: json.findings });
      setTimeout(() => router.push("/report"), 400);
    } catch (err) {
      clearInterval(ticker);
      setRunning(false);
      setStage(0);
      setError(err instanceof Error ? err.message : "Something went wrong reading that file.");
    }
  }

  if (ready && !state.paid) {
    return (
      <Shell index="UPLOAD">
        <div className="py-24 text-center">
          <p className="u-display text-[1.5rem] text-ink">This step is locked.</p>
          <p className="mt-3 text-muted">Unlock the analysis to upload your resume.</p>
          <Link href="/unlock" className="u-link mt-6 inline-flex">
            Go to unlock
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell index="UPLOAD">
      <div className="grid gap-14 md:grid-cols-[1fr_0.85fr] md:gap-20">
        <div>
          <Eyebrow ox>Final step</Eyebrow>
          <h1 className="u-display mt-5 text-[2.5rem] leading-[1.05] text-ink sm:text-[3rem]">
            Upload your resume.
          </h1>
          <p className="mt-6 max-w-[48ch] text-[1.05rem] leading-relaxed text-muted">
            PDF or DOCX, one file, under 5MB. We read the document itself —
            structure, wording, formatting — and score it against the rulebook.
          </p>

          {!running ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                accept(e.dataTransfer.files?.[0]);
              }}
              className={`mt-10 border-2 border-dashed p-12 text-center transition-colors ${
                dragging ? "border-line bg-surface" : "border-line"
              }`}
            >
              <FileArrowUpIcon size={32} className="mx-auto text-muted" />
              {name ? (
                <p className="u-display mt-4 flex items-center justify-center gap-2 text-[1.1rem] text-ink">
                  <FileTextIcon size={18} />
                  {name}
                </p>
              ) : (
                <p className="mt-4 text-[0.9375rem] text-muted">
                  Drag a file here, or
                </p>
              )}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-3 border border-line px-5 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-navy hover:text-white"
              >
                {name ? "Choose a different file" : "Browse files"}
              </button>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx"
                hidden
                onChange={(e) => accept(e.target.files?.[0] ?? undefined)}
              />
              {error && (
                <p className="mt-4 text-[0.8125rem] text-evidence">{error}</p>
              )}
            </div>
          ) : (
            <ol className="mt-10 divide-y divide-line border-y border-line">
              {STAGES.map((s, i) => (
                <li key={s} className="flex items-center gap-3 py-4 text-[0.9375rem]">
                  {i < stage ? (
                    <span className="size-[7px] rounded-full bg-navy" />
                  ) : i === stage ? (
                    <CircleNotchIcon size={16} className="animate-spin text-navy" />
                  ) : (
                    <span className="size-[7px] rounded-full border border-line" />
                  )}
                  <span className={i <= stage ? "text-ink" : "text-muted"}>{s}</span>
                </li>
              ))}
            </ol>
          )}

          {!running && (
            <button
              type="button"
              onClick={run}
              disabled={!name}
              className="mt-8 border border-line bg-navy px-7 py-3.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white transition-transform active:translate-y-px disabled:cursor-not-allowed disabled:opacity-30"
            >
              Run the analysis
            </button>
          )}
        </div>

        <aside className="md:sticky md:top-12 md:self-start">
          <div className="border border-line bg-white p-7">
            <Eyebrow>What happens to your file</Eyebrow>
            <ul className="mt-4 space-y-3 text-[0.875rem] leading-relaxed text-muted">
              <li>It is read once to produce your report.</li>
              <li>It is not shared, sold, or used to train anything.</li>
              <li>You can delete it from your dashboard at any time.</li>
            </ul>
          </div>
        </aside>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode; index?: string }) {
  return (
    <div className="min-h-[100dvh] bg-white">
      <SiteNav />
      <main className="mx-auto max-w-[1180px] px-6 py-16">{children}</main>
    </div>
  );
}
