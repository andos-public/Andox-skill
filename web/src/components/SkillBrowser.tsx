"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, SlidersHorizontal, X, LayoutGrid, List, ArrowUpDown } from "lucide-react";
import CatIcon from "./CatIcon";
import Bookmark from "./Bookmark";
import type { Skill } from "@/lib/data";
const DIFF = (w:number) => w < 500 ? "Quick" : w < 1800 ? "Standard" : "Deep";
export default function SkillBrowser({ skills, categories }: { skills: Skill[]; categories: readonly string[] }) {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All"); const [pack, setPack] = useState("All"); const [diff, setDiff] = useState("All"); const [sheet, setSheet] = useState(false); const [sort, setSort] = useState<"rel"|"name"|"short"|"long">("rel"); const [view, setView] = useState<"grid"|"list">("grid");
  useEffect(() => { const v = localStorage.getItem("andox:view"); if (v==="list"||v==="grid") setView(v); }, []);
  const setV = (v:"grid"|"list") => { setView(v); localStorage.setItem("andox:view", v); };
  const inp = useRef<HTMLInputElement>(null);
  useEffect(() => { const p = new URLSearchParams(location.search); const c = p.get("cat"); if (c) setCat(c); const s = p.get("q"); if (s) setQ(s); if (p.get("focus")) setTimeout(() => inp.current?.focus(), 50);
    const k = (e: KeyboardEvent) => { if (e.key === "/" && !(e.target as HTMLElement).matches("input,textarea")) { e.preventDefault(); inp.current?.focus(); } }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, []);
  const fuse = useMemo(() => new Fuse(skills, { keys: [{name:"name",weight:.5},{name:"description",weight:.3},{name:"pack",weight:.2}], threshold: .35, ignoreLocation: true }), [skills]);
  const packs = useMemo(() => ["All", ...Array.from(new Set(skills.filter(s => cat==="All"||s.category===cat).map(s => s.pack))).sort()], [skills, cat]);
  const results = useMemo(() => { let r = q.trim() ? fuse.search(q).map(x => x.item) : skills; if (cat !== "All") r = r.filter(s => s.category === cat); if (pack !== "All") r = r.filter(s => s.pack === pack); if (diff !== "All") r = r.filter(s => DIFF(s.words) === diff); if (sort==="name") r=[...r].sort((a,b)=>a.name.localeCompare(b.name)); if (sort==="short") r=[...r].sort((a,b)=>a.words-b.words); if (sort==="long") r=[...r].sort((a,b)=>b.words-a.words); return r; }, [q, cat, pack, diff, sort, fuse, skills]);
  const counts = useMemo(() => Object.fromEntries(["All", ...categories].map(c => [c, c==="All"?skills.length:skills.filter(s=>s.category===c).length])), [skills, categories]);
  const grouped = useMemo(() => { const m = new Map<string, Skill[]>(); for (const s of results) { const k = s.pack; if (!m.has(k)) m.set(k, []); m.get(k)!.push(s); } return Array.from(m.entries()); }, [results]);
  const active = (pack!=="All"?1:0)+(diff!=="All"?1:0);
  const Filters = () => (<>
    <div className="mono mb-2">Pack</div>
    <div className="flex flex-wrap gap-1.5">{packs.map(p => <button key={p} onClick={() => setPack(p)} className={"tag !text-xs !py-1 " + (pack===p?"tag-ember":"")}>{p}</button>)}</div>
    <div className="mono mt-5 mb-2">Depth</div>
    <div className="flex gap-1.5">{["All","Quick","Standard","Deep"].map(d => <button key={d} onClick={() => setDiff(d)} className={"tag !text-xs !py-1 " + (diff===d?"tag-ember":"")}>{d}</button>)}</div>
    {active>0 && <button onClick={() => { setPack("All"); setDiff("All"); }} className="mt-4 text-xs text-ember font-semibold">Clear filters</button>}
  </>);
  return (
    <div className="grid gap-6 lg:grid-cols-[230px_1fr]">
      <aside className="hidden lg:block lg:sticky lg:top-20 self-start">
        <div className="mono mb-2">Category</div>
        <div className="flex flex-col gap-0.5">{["All", ...categories].map(c => (<button key={c} onClick={() => { setCat(c); setPack("All"); }} className={"text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between gap-2 " + (cat===c ? "bg-bg2 border border-line font-semibold" : "hover:bg-bg2 text-muted")}><span className="flex items-center gap-2"><CatIcon cat={c} size={15} className={cat===c?"text-ember":""}/> {c}</span><span className="mono">{counts[c]}</span></button>))}</div>
        <div className="mt-6 panel p-4"><Filters/></div>
      </aside>
      <div>
        <div className="sticky top-14 z-30 -mx-4 px-4 py-2 bg-bg/90 backdrop-blur lg:static lg:p-0 lg:m-0 lg:bg-transparent">
          <div className="flex gap-2">
            <label className="panel flex items-center gap-2 px-3 h-11 flex-1"><Search size={16} className="text-muted"/><input ref={inp} value={q} onChange={e => setQ(e.target.value)} placeholder="Search skills…" className="bg-transparent outline-none w-full text-sm min-w-0"/>{q && <button aria-label="Clear" onClick={() => setQ("")}><X size={14} className="text-muted"/></button>}<span className="kbd hidden sm:inline">/</span></label>
            <button onClick={() => setSheet(true)} className="btn lg:hidden !px-3 relative"><SlidersHorizontal size={16}/>{active>0 && <span className="absolute -top-1 -right-1 size-4 rounded-full bg-ember text-[10px] text-black grid place-items-center font-bold">{active}</span>}</button>
          </div>
          <div className="lg:hidden mt-2 -mx-4 px-4 flex gap-1.5 overflow-x-auto hide-scroll pb-1">{["All", ...categories].map(c => <button key={c} onClick={() => { setCat(c); setPack("All"); }} className={"tag !text-xs !py-1.5 whitespace-nowrap " + (cat===c?"tag-ember":"")}><CatIcon cat={c} size={12}/> {c} <span className="opacity-60">{counts[c]}</span></button>)}</div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2"><div className="text-sm text-muted truncate">{results.length} skill{results.length===1?"":"s"}{q && <> for “{q}”</>}</div><div className="flex items-center gap-1.5 shrink-0"><label className="tag !py-1.5 cursor-pointer"><ArrowUpDown size={12}/><select value={sort} onChange={e=>setSort(e.target.value as typeof sort)} className="bg-transparent outline-none text-xs"><option value="rel">Relevance</option><option value="name">A → Z</option><option value="short">Shortest</option><option value="long">Deepest</option></select></label><div className="flex p-0.5 rounded-md border border-line"><button aria-label="Grid" onClick={()=>setV("grid")} className={"p-1.5 rounded " + (view==="grid"?"bg-bg2 text-fg":"text-muted")}><LayoutGrid size={14}/></button><button aria-label="List" onClick={()=>setV("list")} className={"p-1.5 rounded " + (view==="list"?"bg-bg2 text-fg":"text-muted")}><List size={14}/></button></div></div></div>
        {results.length === 0 && <div className="panel p-10 mt-4 text-center text-muted">Nothing matches. Try “review”, “design” or “security”.</div>}
        <div className="mt-3 space-y-7">
          {grouped.map(([pk, list]) => (<section key={pk}>
            <div className="flex items-center gap-3 mb-2"><h3 className="font-bold text-sm">{pk}</h3><span className="mono">{list.length}</span><span className="mono ml-auto flex items-center gap-1"><CatIcon cat={list[0].category} size={12}/> {list[0].category}</span></div>
            {view==="grid" ? <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {list.map(s => (<Link key={s.slug} href={`/skills/${s.slug}/`} className="panel panel-hover p-3.5 sm:p-4 flex flex-col sm:min-h-[7.5rem]">
                <div className="flex items-start justify-between gap-2"><span className="font-semibold leading-snug">{s.name}</span><span className="flex items-center gap-1 shrink-0"><span className="tag">{DIFF(s.words)}</span><Bookmark slug={s.slug} compact/></span></div>
                <p className="mt-1 text-sm text-muted line-clamp-2">{s.description}</p>
                <div className="mt-auto pt-2 mono flex justify-between"><span className="truncate">{s.author}</span><span>{s.readMin} min</span></div>
              </Link>))}
            </div> : <div className="panel divide-y divide-line overflow-hidden">
              {list.map(s => (<Link key={s.slug} href={`/skills/${s.slug}/`} className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-bg"><div className="min-w-0 flex-1"><div className="text-sm font-medium truncate">{s.name}</div><div className="text-xs text-muted truncate">{s.description}</div></div><span className="tag hidden sm:inline-flex">{DIFF(s.words)}</span><span className="mono shrink-0">{s.readMin}m</span><Bookmark slug={s.slug} compact/></Link>))}
            </div>}
          </section>))}
        </div>
      </div>
      {sheet && (<div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal><div className="absolute inset-0 bg-black/60" onClick={() => setSheet(false)}/><div className="absolute bottom-0 inset-x-0 panel !rounded-b-none p-5 max-h-[80vh] overflow-auto safe-b"><div className="flex items-center justify-between mb-4"><div className="font-bold">Filters</div><button onClick={() => setSheet(false)} className="btn !min-h-9 !px-2.5"><X size={16}/></button></div><Filters/><button onClick={() => setSheet(false)} className="btn btn-ember w-full mt-6">Show {results.length} skills</button></div></div>)}
    </div>
  );
}
