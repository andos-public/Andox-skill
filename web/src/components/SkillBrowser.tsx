"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, LayoutGrid, List } from "lucide-react";
import type { Skill } from "@/lib/data";
const ICON: Record<string,string> = {"Methodology":"🧠","Design & UX":"🎨","Security":"🛡️","React & Web":"⚛️","Documents":"📄","Research & Tools":"🔎"};
export default function SkillBrowser({ skills, categories }: { skills: Skill[]; categories: readonly string[] }) {
  const [q, setQ] = useState(""); const [cat, setCat] = useState<string>("All"); const [pack, setPack] = useState("All"); const [view, setView] = useState<"grid"|"list">("grid");
  useEffect(() => { const p = new URLSearchParams(location.search); const c = p.get("cat"); if (c) setCat(c); const s = p.get("q"); if (s) setQ(s); }, []);
  const fuse = useMemo(() => new Fuse(skills, { keys: [{name:"name",weight:.5},{name:"description",weight:.3},{name:"pack",weight:.2}], threshold: .35, ignoreLocation: true }), [skills]);
  const packs = useMemo(() => ["All", ...Array.from(new Set(skills.filter(s => cat==="All"||s.category===cat).map(s => s.pack))).sort()], [skills, cat]);
  const results = useMemo(() => { let r = q.trim() ? fuse.search(q).map(x => x.item) : skills; if (cat !== "All") r = r.filter(s => s.category === cat); if (pack !== "All") r = r.filter(s => s.pack === pack); return r; }, [q, cat, pack, fuse, skills]);
  const counts = useMemo(() => Object.fromEntries(["All", ...categories].map(c => [c, c==="All"?skills.length:skills.filter(s=>s.category===c).length])), [skills, categories]);
  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="lg:sticky lg:top-20 self-start">
        <div className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Category</div>
        <div className="flex lg:flex-col gap-1 overflow-auto pb-2">
          {["All", ...categories].map(c => (<button key={c} onClick={() => { setCat(c); setPack("All"); }} className={"text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between gap-2 whitespace-nowrap " + (cat===c ? "bg-fg text-bg font-semibold" : "hover:bg-soft")}><span>{c==="All"?"✦":ICON[c]} {c}</span><span className="text-xs opacity-70">{counts[c]}</span></button>))}
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-muted mt-5 mb-2">Pack</div>
        <select value={pack} onChange={e => setPack(e.target.value)} className="w-full card !rounded-lg px-3 py-2 text-sm">{packs.map(p => <option key={p}>{p}</option>)}</select>
      </aside>
      <div>
        <div className="flex gap-2 items-center">
          <label className="card flex items-center gap-2 px-3 py-2 flex-1"><Search size={16} className="text-muted"/><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search skills… e.g. tdd, animation, pentest, supabase" className="bg-transparent outline-none w-full text-sm"/></label>
          <button aria-label="Grid" onClick={() => setView("grid")} className={"btn !p-2 " + (view==="grid"?"!border-accent":"")}><LayoutGrid size={16}/></button>
          <button aria-label="List" onClick={() => setView("list")} className={"btn !p-2 " + (view==="list"?"!border-accent":"")}><List size={16}/></button>
        </div>
        <div className="mt-3 text-sm text-muted">{results.length} skill{results.length===1?"":"s"}{q && <> for “{q}”</>}</div>
        {results.length === 0 && <div className="card p-10 mt-4 text-center text-muted">No skills match. Try a broader term like “review” or “design”.</div>}
        <div className={"mt-4 " + (view==="grid" ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-2")}>
          {results.map(s => view==="grid" ? (
            <Link key={s.slug} href={`/skills/${s.slug}/`} className="card p-5 block">
              <div className="flex items-center gap-2 text-xs text-muted"><span className="chip">{ICON[s.category]} {s.category}</span><span className="truncate">{s.pack}</span></div>
              <div className="mt-3 font-bold">{s.name}</div>
              <p className="mt-1 text-sm text-muted line-clamp-3">{s.description}</p>
              <div className="mt-3 text-xs text-muted flex justify-between"><span>by {s.author}</span><span>⭐ {s.stars} · {s.readMin} min</span></div>
            </Link>
          ) : (
            <Link key={s.slug} href={`/skills/${s.slug}/`} className="card px-4 py-3 flex items-center gap-4">
              <span className="text-lg">{ICON[s.category]}</span>
              <div className="min-w-0 flex-1"><div className="font-semibold truncate">{s.name} <span className="text-muted font-normal text-xs">· {s.pack}</span></div><div className="text-xs text-muted truncate">{s.description}</div></div>
              <span className="text-xs text-muted hidden sm:block">⭐ {s.stars}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
