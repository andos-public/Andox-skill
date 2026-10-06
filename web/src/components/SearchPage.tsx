"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { IconSearch, IconX, IconArrowUpLeft, IconHistory, IconTrendingUp, IconAdjustmentsHorizontal, IconArrowRight, IconBook, IconChevronRight } from "@tabler/icons-react";
import CatIcon, { catColor } from "./CatIcon";
import Bookmark from "./Bookmark";
import { useT } from "@/lib/i18n";
export type SItem = { slug:string; name:string; pack:string; category:string; group:string; description:string; readMin:number; words:number; author:string };
export type SPb = { id:string; title:string; tagline:string; n:number };
const DIFF = (w:number) => w < 500 ? "Quick" : w < 1800 ? "Standard" : "Deep";
const TRENDING = ["security review", "tdd", "design system", "animation", "plan", "debug", "pentest", "react performance", "pptx", "api"];
const KEY = "andox:recent";
export default function SearchPage({ skills, playbooks, categories }: { skills: SItem[]; playbooks: SPb[]; categories: string[] }) {
  const { t } = useT();
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All"); const [diff, setDiff] = useState("All"); const [recent, setRecent] = useState<string[]>([]); const [sheet, setSheet] = useState(false);
  const inp = useRef<HTMLInputElement>(null);
  useEffect(() => { const p = new URLSearchParams(location.search); const s = p.get("q"); if (s) setQ(s); try { setRecent(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch {} setTimeout(() => inp.current?.focus(), 80); }, []);
  const remember = (s: string) => { const v = s.trim(); if (!v) return; const next = [v, ...recent.filter(x => x !== v)].slice(0, 8); setRecent(next); localStorage.setItem(KEY, JSON.stringify(next)); };
  const fuse = useMemo(() => new Fuse(skills, { keys: [{name:"name",weight:.5},{name:"description",weight:.3},{name:"pack",weight:.15},{name:"group",weight:.05}], threshold: .38, ignoreLocation: true, includeMatches: true }), [skills]);
  const pfuse = useMemo(() => new Fuse(playbooks, { keys: ["title","tagline"], threshold: .4 }), [playbooks]);
  const res = useMemo(() => { if (!q.trim()) return []; let r = fuse.search(q).map(x => x.item); if (cat !== "All") r = r.filter(s => s.category === cat); if (diff !== "All") r = r.filter(s => DIFF(s.words) === diff); return r; }, [q, cat, diff, fuse]);
  const pres = useMemo(() => q.trim() ? pfuse.search(q).map(x => x.item).slice(0, 3) : [], [q, pfuse]);
  const cres = useMemo(() => q.trim() ? categories.filter(c => c.toLowerCase().includes(q.trim().toLowerCase())) : [], [q, categories]);
  const active = (cat !== "All" ? 1 : 0) + (diff !== "All" ? 1 : 0);
  const hl = (text: string) => { const w = q.trim(); if (!w) return text; const i = text.toLowerCase().indexOf(w.toLowerCase()); if (i < 0) return text; return <>{text.slice(0, i)}<mark className="bg-ember/25 text-fg rounded px-0.5">{text.slice(i, i + w.length)}</mark>{text.slice(i + w.length)}</>; };
  return (<div className="wrap pt-3 sm:pt-10 max-w-3xl">
    {/* search field */}
    <form onSubmit={e => { e.preventDefault(); remember(q); inp.current?.blur(); }} className="sticky top-14 z-30 -mx-4 px-4 pb-2 pt-1 bg-bg/95 backdrop-blur">
      <label className="panel flex items-center gap-3 h-[54px] px-4 focus-within:border-ember transition-colors">
        <IconSearch size={22} className="text-ember shrink-0"/>
        <input ref={inp} value={q} onChange={e => setQ(e.target.value)} enterKeyHint="search" autoComplete="off" placeholder={t("searchSkills")} className="bg-transparent outline-none w-full text-[16px] min-w-0"/>
        {q && <button type="button" aria-label="Clear" onClick={() => { setQ(""); inp.current?.focus(); }} className="grid place-items-center size-9 -mr-1 rounded-full text-muted"><IconX size={18}/></button>}
        <button type="button" onClick={() => setSheet(true)} aria-label={t("filters")} className={"grid place-items-center size-9 -mr-2 rounded-full relative " + (active ? "text-ember" : "text-muted")}><IconAdjustmentsHorizontal size={20}/>{active > 0 && <span className="absolute top-1 right-1 size-2 rounded-full bg-ember"/>}</button>
      </label>
      {/* quick category chips */}
      <div className="mt-2 -mx-4 px-4 flex gap-1.5 overflow-x-auto hide-scroll">{["All", ...categories].map(c => <button key={c} type="button" onClick={() => setCat(c)} className={"tag !py-1.5 min-h-[32px] whitespace-nowrap " + (cat === c ? "tag-ember" : "")}>{c !== "All" && <CatIcon cat={c} size={13}/>} {c}</button>)}</div>
    </form>

    {!q.trim() && (<div className="mt-4 space-y-7 in">
      {recent.length > 0 && <section><div className="flex items-center justify-between mb-2"><div className="mono flex items-center gap-1.5"><IconHistory size={14}/> Recent</div><button onClick={() => { setRecent([]); localStorage.removeItem(KEY); }} className="text-xs text-muted">Clear</button></div>
        <ul className="panel divide-y divide-line overflow-hidden">{recent.map(r => <li key={r}><button onClick={() => setQ(r)} className="w-full flex items-center gap-3 px-4 min-h-[48px] text-left text-[15px]"><IconHistory size={16} className="text-muted"/><span className="flex-1 truncate">{r}</span><IconArrowUpLeft size={16} className="text-muted"/></button></li>)}</ul></section>}
      <section><div className="mono flex items-center gap-1.5 mb-2"><IconTrendingUp size={14}/> Try searching</div><div className="flex flex-wrap gap-2">{TRENDING.map(s => <button key={s} onClick={() => setQ(s)} className="tag !py-2 !px-3 !text-[13px] !rounded-xl min-h-[40px] press">{s}</button>)}</div></section>
      <section><div className="mono mb-2">Browse by category</div><div className="grid grid-cols-2 gap-2">{categories.map(c => { const col = catColor(c); const n = skills.filter(s => s.category === c).length; return <Link key={c} href={`/skills/?cat=${encodeURIComponent(c)}`} className="panel panel-hover p-3.5 flex items-center gap-3 press"><span className="grid place-items-center size-10 rounded-xl shrink-0" style={{ color: col, background: `color-mix(in oklab, ${col} 14%, transparent)` }}><CatIcon cat={c} size={20}/></span><span className="min-w-0"><span className="block font-semibold text-[14px] leading-tight truncate">{c}</span><span className="block text-xs text-muted">{n} skills</span></span></Link>; })}</div></section>
    </div>)}

    {q.trim() && (<div className="mt-3 in">
      <div className="text-sm text-muted mb-3">{res.length} {t("skills")}{pres.length > 0 && <> · {pres.length} playbooks</>}</div>
      {cres.length > 0 && <div className="flex gap-2 mb-3 flex-wrap">{cres.map(c => <Link key={c} href={`/categories/${c.toLowerCase().split(" ")[0].replace("&","")}/`} className="tag tag-ember !py-2 !px-3 !text-[13px]"><CatIcon cat={c} size={14}/> {c} category <IconChevronRight size={14}/></Link>)}</div>}
      {pres.length > 0 && <ul className="space-y-2 mb-4">{pres.map(p => <li key={p.id}><Link href={`/playbooks/${p.id}/`} className="panel panel-hover p-3.5 flex items-center gap-3 press"><span className="grid place-items-center size-10 rounded-xl bg-ember-soft text-ember shrink-0"><IconBook size={20}/></span><span className="min-w-0 flex-1"><span className="block font-semibold truncate">{hl(p.title)}</span><span className="block text-xs text-muted truncate">Playbook · {p.n} steps · {p.tagline}</span></span><IconArrowRight size={18} className="text-muted"/></Link></li>)}</ul>}
      {res.length === 0 && pres.length === 0 && <div className="panel p-10 text-center text-muted">{t("nothing")}</div>}
      <ul className="space-y-2 stagger">{res.slice(0, 60).map(s => { const col = catColor(s.category); return (<li key={s.slug}><Link href={`/skills/${s.slug}/`} onClick={() => remember(q)} className="panel panel-hover p-3.5 flex items-start gap-3 press">
        <span className="grid place-items-center size-10 rounded-xl shrink-0 mt-0.5" style={{ color: col, background: `color-mix(in oklab, ${col} 14%, transparent)` }}><CatIcon cat={s.category} size={20}/></span>
        <span className="min-w-0 flex-1"><span className="block font-semibold text-[15px] leading-tight">{hl(s.name)}</span><span className="block text-[13px] text-muted mt-1 line-clamp-2">{hl(s.description)}</span><span className="mt-2 flex gap-1.5 flex-wrap"><span className="tag">{s.pack}</span>{s.group && <span className="tag">{s.group}</span>}<span className="tag">{DIFF(s.words)} · {s.readMin}m</span></span></span>
        <Bookmark slug={s.slug} compact/>
      </Link></li>); })}</ul>
      {res.length > 60 && <Link href={`/skills/?q=${encodeURIComponent(q)}`} className="btn w-full mt-4">Open all {res.length} in catalog</Link>}
    </div>)}

    {sheet && (<div className="fixed inset-0 z-50" role="dialog" aria-modal><div className="absolute inset-0 bg-black/60" onClick={() => setSheet(false)}/>
      <div className="absolute bottom-0 inset-x-0 sm:bottom-auto sm:top-24 sm:left-1/2 sm:-translate-x-1/2 sm:w-[480px] panel !rounded-b-none sm:!rounded-2xl p-5" style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}>
        <div className="flex items-center justify-between mb-4"><div className="font-bold">{t("filters")}</div><button onClick={() => setSheet(false)} className="btn !px-3"><IconX size={18}/></button></div>
        <div className="mono mb-2">{t("category")}</div><div className="flex flex-wrap gap-1.5">{["All", ...categories].map(c => <button key={c} onClick={() => setCat(c)} className={"tag !py-1.5 min-h-[32px] " + (cat === c ? "tag-ember" : "")}>{c}</button>)}</div>
        <div className="mono mt-5 mb-2">{t("depth")}</div><div className="flex gap-1.5">{["All","Quick","Standard","Deep"].map(d => <button key={d} onClick={() => setDiff(d)} className={"tag !py-1.5 min-h-[32px] " + (diff === d ? "tag-ember" : "")}>{d}</button>)}</div>
        <div className="mt-6 flex gap-2">{active > 0 && <button onClick={() => { setCat("All"); setDiff("All"); }} className="btn flex-1">{t("clear")}</button>}<button onClick={() => setSheet(false)} className="btn btn-ember flex-1">{t("show")}{q.trim() ? ` ${res.length}` : ""}</button></div>
      </div></div>)}
  </div>);
}
