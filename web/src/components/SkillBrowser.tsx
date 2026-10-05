"use client";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import Fuse from "fuse.js";
import { Search, SlidersHorizontal, X, LayoutGrid, List, ArrowUpDown } from "lucide-react";
import type { Skill } from "@/lib/data";
import CatIcon from "./CatIcon";
import SkillCard, { type CardSkill } from "./SkillCard";
import SlideOver from "./SlideOver";
import { useT } from "@/lib/i18n";
const DIFF = (w:number) => w < 500 ? "Quick" : w < 1800 ? "Standard" : "Deep";
const GROUPS = ["Plan","Build / TDD","Debug","Review","Ship","Agent workflow"];
export default function SkillBrowser({ skills, categories, colors }: { skills: Skill[]; categories: readonly string[]; colors: Record<string,string> }) {
  const { t } = useT();
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All"); const [pack, setPack] = useState("All"); const [src, setSrc] = useState("All"); const [diff, setDiff] = useState("All"); const [grp, setGrp] = useState("All");
  const [sheet, setSheet] = useState(false); const [sort, setSort] = useState<"rel"|"name"|"short"|"long">("rel"); const [view, setView] = useState<"grid"|"list">("grid"); const [open, setOpen] = useState<CardSkill|null>(null);
  const inp = useRef<HTMLInputElement>(null);
  useEffect(() => { const p = new URLSearchParams(location.search); const c = p.get("cat"); if (c) setCat(c); const g = p.get("group"); if (g) setGrp(g); const s = p.get("q"); if (s) setQ(s); if (p.get("focus")) setTimeout(() => inp.current?.focus(), 50); const v = localStorage.getItem("andox:view"); if (v==="list"||v==="grid") setView(v); }, []);
  const setV = (v:"grid"|"list") => { setView(v); localStorage.setItem("andox:view", v); };
  const fuse = useMemo(() => new Fuse(skills, { keys: [{name:"name",weight:.5},{name:"description",weight:.3},{name:"pack",weight:.2}], threshold: .35, ignoreLocation: true }), [skills]);
  const inCat = useMemo(() => skills.filter(s => cat==="All"||s.category===cat), [skills, cat]);
  const packs = useMemo(() => ["All", ...Array.from(new Set(inCat.map(s => s.pack))).sort()], [inCat]);
  const srcs = useMemo(() => ["All", ...Array.from(new Set(inCat.map(s => s.author))).sort()], [inCat]);
  const results = useMemo(() => { let r = q.trim() ? fuse.search(q).map(x => x.item) : skills; if (cat !== "All") r = r.filter(s => s.category === cat); if (grp !== "All") r = r.filter(s => s.group === grp); if (pack !== "All") r = r.filter(s => s.pack === pack); if (src !== "All") r = r.filter(s => s.author === src); if (diff !== "All") r = r.filter(s => DIFF(s.words) === diff); if (sort==="name") r=[...r].sort((a,b)=>a.name.localeCompare(b.name)); if (sort==="short") r=[...r].sort((a,b)=>a.words-b.words); if (sort==="long") r=[...r].sort((a,b)=>b.words-a.words); return r; }, [q, cat, grp, pack, src, diff, sort, fuse, skills]);
  const counts = useMemo(() => Object.fromEntries(["All", ...categories].map(c => [c, c==="All"?skills.length:skills.filter(s=>s.category===c).length])), [skills, categories]);
  const byGroup = cat === "Methodology" && grp === "All";
  const grouped = useMemo(() => { const m = new Map<string, Skill[]>(); const key = (s: Skill) => byGroup ? (s.group || "Other") : s.pack; for (const s of results) { const k = key(s); if (!m.has(k)) m.set(k, []); m.get(k)!.push(s); } let e = Array.from(m.entries()); if (byGroup) e = e.sort((a,b)=>GROUPS.indexOf(a[0])-GROUPS.indexOf(b[0])); return e; }, [results, byGroup]);
  const active = (pack!=="All"?1:0)+(diff!=="All"?1:0)+(src!=="All"?1:0)+(grp!=="All"?1:0);
  const clear = () => { setPack("All"); setDiff("All"); setSrc("All"); setGrp("All"); };
  const pickCat = (c: string) => { setCat(c); setPack("All"); setSrc("All"); setGrp("All"); };
  const onOpen = useCallback((s: CardSkill) => setOpen(s), []);
  const card = (s: Skill) => ({ ...s, color: colors[s.category] });
  const Chip = ({on, onClick, children}:{on:boolean; onClick:()=>void; children:React.ReactNode}) => <button onClick={onClick} className={"tag !py-1.5 min-h-[32px] " + (on?"tag-ember":"")}>{children}</button>;
  const Filters = () => (<>
    {cat === "Methodology" && <><div className="mono mb-2">Stage</div><div className="flex flex-wrap gap-1.5">{["All", ...GROUPS].map(g => <Chip key={g} on={grp===g} onClick={() => setGrp(g)}>{g}</Chip>)}</div></>}
    <div className={"mono mb-2 " + (cat==="Methodology"?"mt-5":"")}>{t("source")}</div>
    <div className="flex flex-wrap gap-1.5">{srcs.map(p => <Chip key={p} on={src===p} onClick={() => setSrc(p)}>{p}</Chip>)}</div>
    <div className="mono mt-5 mb-2">{t("pack")}</div>
    <div className="flex flex-wrap gap-1.5 max-h-40 overflow-auto">{packs.map(p => <Chip key={p} on={pack===p} onClick={() => setPack(p)}>{p}</Chip>)}</div>
    <div className="mono mt-5 mb-2">{t("depth")}</div>
    <div className="flex gap-1.5">{["All","Quick","Standard","Deep"].map(d => <Chip key={d} on={diff===d} onClick={() => setDiff(d)}>{d}</Chip>)}</div>
    {active>0 && <button onClick={clear} className="mt-4 text-sm text-ember font-semibold min-h-[44px]">{t("clear")}</button>}
  </>);
  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block lg:sticky lg:top-20 self-start max-h-[calc(100vh-6rem)] overflow-auto pr-1">
        <div className="mono mb-2">{t("category")}</div>
        <div className="flex flex-col gap-0.5">{["All", ...categories].map(c => (<button key={c} onClick={() => pickCat(c)} className={"text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between gap-2 " + (cat===c ? "bg-bg2 border border-line font-semibold" : "hover:bg-bg2 text-muted")}><span className="flex items-center gap-2"><span style={{color: colors[c]}}><CatIcon cat={c} size={15}/></span> {c}</span><span className="mono">{counts[c]}</span></button>))}</div>
        <div className="mt-6 panel p-4"><Filters/></div>
      </aside>
      <div className="min-w-0">
        <div className="sticky top-14 z-30 -mx-4 px-4 py-2 bg-bg/90 backdrop-blur lg:static lg:p-0 lg:m-0 lg:bg-transparent">
          <div className="flex gap-2">
            <label className="panel flex items-center gap-2 px-3 h-12 flex-1"><Search size={18} className="text-muted"/><input ref={inp} value={q} onChange={e => setQ(e.target.value)} placeholder={t("searchSkills")} className="bg-transparent outline-none w-full text-base min-w-0"/>{q && <button aria-label="Clear" onClick={() => setQ("")} className="p-2 -mr-2"><X size={16} className="text-muted"/></button>}<span className="kbd hidden sm:inline">/</span></label>
            <button onClick={() => setSheet(true)} className="btn lg:hidden !px-3.5 relative min-h-[48px]" aria-label={t("filters")}><SlidersHorizontal size={18}/>{active>0 && <span className="absolute -top-1 -right-1 size-4 rounded-full bg-ember text-[10px] text-black grid place-items-center font-bold">{active}</span>}</button>
          </div>
          <div className="lg:hidden mt-2 -mx-4 px-4 flex gap-1.5 overflow-x-auto hide-scroll pb-1">{["All", ...categories].map(c => <button key={c} onClick={() => pickCat(c)} className={"tag !py-2 min-h-[36px] whitespace-nowrap " + (cat===c?"tag-ember":"")}><CatIcon cat={c} size={13}/> {c} <span className="opacity-60">{counts[c]}</span></button>)}</div>
          {cat === "Methodology" && <div className="lg:hidden mt-1.5 -mx-4 px-4 flex gap-1.5 overflow-x-auto hide-scroll pb-1">{["All", ...GROUPS].map(g => <button key={g} onClick={() => setGrp(g)} className={"tag !py-1.5 min-h-[32px] whitespace-nowrap " + (grp===g?"tag-ember":"")}>{g}</button>)}</div>}
        </div>
        <div className="mt-3 flex items-center justify-between gap-2"><div className="text-sm text-muted truncate">{results.length} {t("skills")}{q && <> · “{q}”</>}</div><div className="flex items-center gap-1.5 shrink-0"><label className="tag !py-1.5 min-h-[32px] cursor-pointer"><ArrowUpDown size={12}/><select value={sort} onChange={e=>setSort(e.target.value as typeof sort)} className="bg-transparent outline-none text-xs"><option value="rel">Relevance</option><option value="name">A → Z</option><option value="short">Shortest</option><option value="long">Deepest</option></select></label><div className="flex p-0.5 rounded-md border border-line"><button aria-label="Grid" onClick={()=>setV("grid")} className={"p-2 rounded " + (view==="grid"?"bg-bg2 text-fg":"text-muted")}><LayoutGrid size={14}/></button><button aria-label="List" onClick={()=>setV("list")} className={"p-2 rounded " + (view==="list"?"bg-bg2 text-fg":"text-muted")}><List size={14}/></button></div></div></div>
        {results.length === 0 && <div className="panel p-10 mt-4 text-center text-muted">{t("nothing")}</div>}
        <div className="mt-3 space-y-7">
          {grouped.map(([k, list]) => (<section key={k}>
            <div className="flex items-center gap-3 mb-2"><h3 className="font-bold text-sm">{k}</h3><span className="mono">{list.length}</span>{!byGroup && <span className="mono ml-auto flex items-center gap-1" style={{color: colors[list[0].category]}}><CatIcon cat={list[0].category} size={12}/> {list[0].category}</span>}</div>
            {view==="grid" ? <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{list.map(s => <SkillCard key={s.slug} s={card(s)} onOpen={onOpen}/>)}</div>
            : <div className="panel divide-y divide-line overflow-hidden">{list.map(s => <SkillCard key={s.slug} s={card(s)} onOpen={onOpen} view="list"/>)}</div>}
          </section>))}
        </div>
      </div>
      {sheet && (<div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal><div className="absolute inset-0 bg-black/60" onClick={() => setSheet(false)}/><div className="absolute bottom-0 inset-x-0 panel !rounded-b-none p-5 max-h-[80vh] overflow-auto" style={{paddingBottom:"calc(1.25rem + env(safe-area-inset-bottom))"}}><div className="flex items-center justify-between mb-4"><div className="font-bold">{t("filters")}</div><button onClick={() => setSheet(false)} className="btn !px-3"><X size={18}/></button></div><Filters/><button onClick={() => setSheet(false)} className="btn btn-ember w-full mt-6">{t("show")} {results.length} {t("skills")}</button></div></div>)}
      <SlideOver s={open} onClose={() => setOpen(null)}/>
    </div>
  );
}
