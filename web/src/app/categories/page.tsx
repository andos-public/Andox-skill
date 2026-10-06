import Link from "next/link";
import { getSkills, CATEGORIES, CAT_META } from "@/lib/data";
import { ArrowRight } from "lucide-react";
export const metadata = { title: "Categories — Andox Skills" };
export default function Categories() {
  const skills = getSkills();
  return (<div className="wrap py-6 sm:py-10">
    <div className="mono">explore</div>
    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">Six categories. Each one a complete toolkit.</h1>
    <p className="mt-1.5 text-muted text-sm sm:text-base max-w-2xl">Every category has its own page: what it’s for, who it’s for, where to start, and a one-line installer for the whole set.</p>
    <Link href="/skills/" className="mt-5 panel panel-hover p-4 flex items-center gap-3 press"><span className="grid place-items-center size-11 rounded-xl bg-ember-soft text-ember"><ArrowRight size={20}/></span><span className="flex-1"><span className="block font-bold">Browse the full catalog</span><span className="block text-sm text-muted">{skills.length} skills · filters, sort, grid/list</span></span></Link>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {CATEGORIES.map(c => { const m = CAT_META[c]; const list = skills.filter(s => s.category === c); const packs = new Set(list.map(s => s.pack)).size; const mins = list.reduce((a,s)=>a+s.readMin,0);
        return (<Link key={c} href={`/categories/${m.slug}/`} className="panel panel-hover p-4 sm:p-5 flex gap-4">
          <span className="relative size-[72px] shrink-0 rounded-xl overflow-hidden bg-[#121316]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/ill/${m.slug}.webp`} alt="" width={72} height={72} className="size-full object-cover"/></span>
          <div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="font-bold text-lg leading-tight">{c}</span><ArrowRight size={16} className="text-muted shrink-0"/></div>
            <p className="mt-1 text-sm text-muted">{m.blurb}</p>
            <div className="mt-3 flex gap-1.5 flex-wrap"><span className="tag tag-ember">{list.length} skills</span><span className="tag">{packs} packs</span><span className="tag">~{Math.round(mins/60)}h reading</span></div></div>
        </Link>); })}
    </div>
  </div>);
}
