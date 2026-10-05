import Link from "next/link";
import { getSkills, CATEGORIES, CAT_META } from "@/lib/data";
import { CatBadge } from "@/components/CatIcon";
import { ArrowRight } from "lucide-react";
export const metadata = { title: "Categories — Andox Skills" };
export default function Categories() {
  const skills = getSkills();
  return (<div className="wrap py-6 sm:py-10">
    <div className="mono">explore</div>
    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">Six categories. Each one a complete toolkit.</h1>
    <p className="mt-1.5 text-muted text-sm sm:text-base max-w-2xl">Every category has its own page: what it’s for, who it’s for, where to start, and a one-line installer for the whole set.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {CATEGORIES.map(c => { const m = CAT_META[c]; const list = skills.filter(s => s.category === c); const packs = new Set(list.map(s => s.pack)).size; const mins = list.reduce((a,s)=>a+s.readMin,0);
        return (<Link key={c} href={`/categories/${m.slug}/`} className="panel panel-hover p-4 sm:p-5 flex gap-4">
          <CatBadge cat={c} size={44}/>
          <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="font-bold text-lg leading-tight">{c}</span><ArrowRight size={16} className="text-muted shrink-0"/></div>
            <p className="mt-1 text-sm text-muted">{m.blurb}</p>
            <div className="mt-3 flex gap-1.5 flex-wrap"><span className="tag tag-ember">{list.length} skills</span><span className="tag">{packs} packs</span><span className="tag">~{Math.round(mins/60)}h reading</span></div></div>
        </Link>); })}
    </div>
  </div>);
}
