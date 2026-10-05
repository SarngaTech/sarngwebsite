/** Branded illustrations used when a slide has no photo. Purely decorative. */

const Dots = () => (
  <div className="flex items-center gap-2" aria-hidden>
    <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
    <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
    <span className="h-3 w-3 rounded-full bg-[#28C840]" />
  </div>
);

const Glow = () => (
  <div
    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,165,245,.28),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(0,184,160,.22),transparent_55%)]"
    aria-hidden
  />
);

export function CodeVisual() {
  return (
    <div className="relative h-full w-full bg-navy-950 p-5 sm:p-8" aria-hidden>
      <Glow />
      <div className="relative flex items-center gap-3">
        <Dots />
        <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px] text-slate-300">career_ready.py</span>
      </div>
      <pre className="relative mt-5 max-h-[9.5rem] overflow-hidden font-mono text-[12px] leading-[1.8] sm:max-h-none text-slate-300 sm:text-[14px]">
<span className="text-sky-300">class</span> <span className="text-cyan-300">Learner</span>:{"\n"}
{"    "}<span className="text-sky-300">def</span> <span className="text-teal-300">journey</span>(self):{"\n"}
{"        "}self.<span className="text-teal-300">learn</span>(<span className="text-emerald-300">&quot;fundamentals&quot;</span>){"\n"}
{"        "}self.<span className="text-teal-300">build</span>(<span className="text-emerald-300">&quot;real skills&quot;</span>){"\n"}
{"        "}self.<span className="text-teal-300">grow</span>(mentor=<span className="text-amber-300">True</span>){"\n"}
{"        "}<span className="text-sky-300">return</span> <span className="text-emerald-300">&quot;career ready&quot;</span>{"\n"}
{"\n"}
you = <span className="text-cyan-300">Learner</span>(){"\n"}
you.<span className="text-teal-300">journey</span>()
      </pre>
    </div>
  );
}

export function DataVisual() {
  const bars = [38, 56, 44, 70, 62, 84, 76];
  return (
    <div className="relative h-full w-full bg-navy-950 p-5 sm:p-8" aria-hidden>
      <Glow />
      <div className="relative flex items-center justify-between">
        <Dots />
        <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300">Sales dashboard · illustrative</span>
      </div>
      <div className="relative mt-5 grid grid-cols-3 gap-3">
        {["Revenue", "Orders", "Regions"].map((k) => (
          <div key={k} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-[11px] uppercase tracking-wider text-slate-400">{k}</p>
            <div className="mt-2 h-2.5 w-3/4 rounded-full bg-gradient-to-r from-brand-cyan to-brand-teal" />
          </div>
        ))}
      </div>
      <div className="relative mt-4 grid grid-cols-5 gap-3">
        <div className="col-span-3 flex h-28 items-end gap-2 rounded-xl border border-white/10 bg-white/5 p-3 sm:h-40">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-brand-royal to-brand-cyan" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="col-span-2 flex h-28 items-center justify-center rounded-xl border border-white/10 bg-white/5 sm:h-40">
          <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90 sm:h-28 sm:w-28">
            <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="5" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="#00A5F5" strokeWidth="5" strokeDasharray="44 88" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="#00B8A0" strokeWidth="5" strokeDasharray="26 88" strokeDashoffset="-44" />
            <circle cx="18" cy="18" r="14" fill="none" stroke="#1261EB" strokeWidth="5" strokeDasharray="18 88" strokeDashoffset="-70" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function AIVisual() {
  return (
    <div className="relative h-full w-full bg-navy-950 p-5 sm:p-8" aria-hidden>
      <Glow />
      <div className="relative flex items-center justify-between">
        <Dots />
        <span className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300">AI assistant</span>
      </div>
      <div className="relative mt-6 space-y-3">
        <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-brand-royal px-4 py-2.5 text-sm text-white">
          Summarise last month&apos;s sales data by region.
        </div>
        <div className="flex max-w-[88%] gap-3">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-teal text-xs font-bold text-white">AI</span>
          <div className="space-y-2 rounded-2xl rounded-tl-md border border-white/10 bg-white/5 p-3.5">
            <div className="h-2 w-56 max-w-full rounded-full bg-white/25" />
            <div className="h-2 w-48 max-w-full rounded-full bg-white/20" />
            <div className="h-2 w-40 max-w-full rounded-full bg-white/15" />
          </div>
        </div>
      </div>
      <div className="relative mt-6 hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 sm:flex">
        {["Data Lake", "Data Factory", "Databricks", "Power BI"].map((t, i) => (
          <div key={t} className="flex items-center gap-2">
            {i > 0 && <span className="text-slate-500">→</span>}
            <span className="rounded-lg bg-white/10 px-2 py-1 text-[11px] font-medium text-slate-200 sm:text-xs">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BusinessVisual() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#EAF2FF] to-[#E6FAF6] p-5 sm:p-8" aria-hidden>
      <div className="relative overflow-hidden rounded-2xl border border-surface-line bg-white shadow-lift">
        <div className="flex items-center gap-3 border-b border-surface-line px-4 py-3">
          <Dots />
          <div className="h-5 flex-1 rounded-md bg-surface" />
        </div>
        <div className="grid grid-cols-[1fr_1.1fr] gap-4 p-5">
          <div className="space-y-2.5">
            <div className="h-3 w-24 rounded-full bg-brand-royal/80" />
            <div className="h-5 w-full rounded-md bg-navy-900" />
            <div className="h-5 w-4/5 rounded-md bg-navy-900" />
            <div className="h-2 w-full rounded-full bg-slate-200" />
            <div className="h-2 w-5/6 rounded-full bg-slate-200" />
            <div className="mt-3 h-8 w-28 rounded-full bg-gradient-to-r from-brand-royal to-brand-cyan" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-surface p-2.5">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-teal" />
                <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200" />
                <div className="mt-1 h-1.5 w-2/3 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
