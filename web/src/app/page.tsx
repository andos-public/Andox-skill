import Link from "next/link";
import { getSkills, CATEGORIES, CAT_META, PLAYBOOKS } from "@/lib/data";
import { ArrowRight, Terminal, Search, Route, ShieldCheck, Sparkles, Star } from "lucide-react";
import Copy from "@/components/Copy";
import Typer from "@/components/Typer";
import CatIcon, { CatBadge } from "@/components/CatIcon";
import SkillCard from "@/components/SkillCard";
import { T } from "@/lib/i18n";
import Disclosure from "@/components/Disclosure";
export default function Home() {
  const skills = getSkills();
  const counts = Object.fromEntries(CATEGORIES.map(c => [c, skills.filter(s => s.category === c).length]));
  const packs = new Set(skills.map(s => s.pack)).size;
  const featured = ["mattpocock--grill-me","ponytail--ponytail","superpowers--test-driven-development","gstack--design-review","trailofbits--differential-review","emilkowalski--animate","strix--owasp-top-10-testing","frontend-checklist--frontend-checklist-global"].map(s => skills.find(x => x.slug === s)!).filter(Boolean);
  const py = "curl -sL https://andos-public.github.io/Andox-skill/install.py | python3 - --all";
  return (<>
    <section className="relative overflow-hidden border-b border-line noise">
      <div className="absolute inset-0 dots pointer-events-none"/>
      <div className="relative wrap pt-10 pb-10 sm:pt-28 sm:pb-24 grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-center">
        <div>
          <div className="in mono flex items-center gap-2"><span className="size-1.5 rounded-full bg-ember"/> {skills.length} skills · {packs} packs · {PLAYBOOKS.length} playbooks</div>
          <h1 className="in in-1 mt-4 text-[2.25rem] leading-[1.05] sm:text-6xl lg:text-7xl font-extrabold tracking-tight"><T k="hero1"/><br/><span className="text-ember"><T k="hero2"/></span></h1>
          <p className="in in-2 mt-5 text-muted text-base sm:text-lg max-w-xl"><T k="heroP"/></p>
          <div className="in in-3 mt-7 flex flex-col sm:flex-row gap-3">
            <Link href="/skills/" className="btn btn-ember"><T k="openCatalog"/> <ArrowRight size={16}/></Link>
            <Link href="/playbooks/" className="btn"><T k="startPlaybook"/> <Route size={16}/></Link>
          </div>
          <div className="in in-3 mt-6 panel p-3 flex items-center gap-2 font-mono text-[13px] max-w-xl"><Terminal size={15} className="text-ember shrink-0"/><span className="truncate text-muted">{py.replace("https://","")}</span><span className="ml-auto"><Copy text={py} label="Copy" variant="!min-h-9 !px-2.5 text-xs"/></span></div>
        </div>
        <div className="in in-2 panel p-4 sm:p-5 bg-bg2 hidden lg:block">
          <div className="flex items-center gap-1.5 mb-3"><span className="size-2.5 rounded-full bg-line"/><span className="size-2.5 rounded-full bg-line"/><span className="size-2.5 rounded-full bg-line"/><span className="mono ml-2">agent session · andox</span></div>
          <Typer/>
        </div>
      </div>
    </section>

    <section className="wrap py-8 sm:py-14">
      <div className="flex items-end justify-between mb-4"><div><div className="mono"><T k="s1"/></div><h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1"><T k="s1h"/></h2></div><Link href="/categories/" className="text-sm font-semibold text-ember hidden sm:block"><T k="allCats"/></Link></div>
      {/* mobile: horizontal snap row; desktop: 3-col grid */}
      <div className="stagger flex gap-3 overflow-x-auto hide-scroll -mx-4 px-4 pb-1 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:mx-0 sm:px-0">
        {CATEGORIES.map((c, i) => (
          <Link key={c} href={`/categories/${CAT_META[c].slug}/`} className="panel panel-hover p-4 sm:p-5 flex gap-3.5 min-w-[260px] sm:min-w-0 snap-start">
            <CatBadge cat={c} size={40}/>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2"><span className="font-bold">{c}</span><span className="mono !text-[10px] opacity-60">{String(i+1).padStart(2,"0")}</span></div>
              <p className="mt-1.5 text-sm text-muted line-clamp-2">{CAT_META[c].blurb}</p>
              <div className="mt-3 text-xs font-semibold text-ember">{counts[c]} skills <ArrowRight size={12} className="inline"/></div>
            </div>
          </Link>))}
      </div>
      <Link href="/categories/" className="sm:hidden mt-3 btn w-full"><T k="allCats"/></Link>
    </section>

    <section id="how" className="border-y border-line bg-bg2/40">
      <div className="wrap py-10 sm:py-14 grid lg:grid-cols-[320px_1fr] gap-8 items-start">
        <div className="lg:sticky lg:top-24"><div className="mono"><T k="s2"/></div><h2 className="text-xl sm:text-3xl font-bold tracking-tight mt-1"><T k="s2h"/></h2><p className="mt-3 text-muted text-sm sm:text-base">Skills are markdown instructions your agent reads before working. Andox makes finding and loading the right one a two-second job.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[[Search,"Find the skill","Search by task (“pentest”, “animation”, “plan”). Each skill states when to use it."],[Route,"Follow a playbook","Playbooks sequence skills for a goal: website, secure auth & wallet, UI polish."],[Terminal,"Load it into your agent","One Python or npx command, or copy the SKILL.md / a ready-made agent prompt."],[ShieldCheck,"Ship with checks","Review, security and QA skills are part of every path — not an afterthought."]].map(([I,t,d],i) => { const Icon = I as React.ElementType; return (
            <div key={i} className="panel p-4 sm:p-5"><div className="flex items-center justify-between"><span className="size-9 grid place-items-center rounded-lg bg-ember-soft text-ember"><Icon size={17}/></span><span className="mono">step {i+1}</span></div><div className="mt-3 font-bold">{t as string}</div><p className="mt-1 text-sm text-muted">{d as string}</p></div>); })}
        </div>
      </div>
    </section>

    <section className="wrap py-10 sm:py-14">
      <div className="flex items-end justify-between mb-4"><div><div className="mono"><T k="s3"/></div><h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1"><T k="s3h"/></h2></div><Link href="/playbooks/" className="text-sm font-semibold text-ember hidden sm:block"><T k="allPb"/></Link></div>
      <div className="grid gap-3 md:grid-cols-3">
        {PLAYBOOKS.map(p => (<Link key={p.id} href={`/playbooks/${p.id}/`} className="panel panel-hover p-5 flex flex-col"><span className="mono">{p.steps.length} steps · {p.steps.reduce((a,s)=>a+s.skills.length,0)} skills</span><div className="mt-2 font-bold text-lg leading-snug">{p.title}</div><p className="mt-1 text-sm text-muted">{p.tagline}</p>
          <ol className="mt-4 flex items-center gap-1 overflow-hidden">{p.steps.map((s,i)=><li key={i} className="flex items-center gap-1 shrink-0"><span className="size-6 grid place-items-center rounded-md border border-line bg-bg text-[11px] font-mono text-ember" title={s.title}>{i+1}</span>{i<p.steps.length-1 && <span className="w-3 h-px bg-line"/>}</li>)}</ol></Link>))}
      </div>
    </section>

    <section className="wrap py-10 sm:py-14">
      <div className="flex items-end justify-between mb-4"><div><div className="mono"><T k="s4"/></div><h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1"><T k="s4h"/></h2></div><span className="mono hidden sm:flex items-center gap-1"><Star size={11}/> = GitHub stars of source repo</span></div>
      <div className="grid gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-4 stagger">{featured.slice(0,4).map(s => <SkillCard key={s.slug} s={{...s, color: CAT_META[s.category].color}}/>)}</div>
      <div className="mt-3"><Disclosure title="More starters" meta={`${featured.length-4} skills`} desktopOpen={false}><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{featured.slice(4).map(s => <SkillCard key={s.slug} s={{...s, color: CAT_META[s.category].color}}/>)}</div></Disclosure></div>
    </section>

    <section className="wrap py-12">
      <div className="panel p-6 sm:p-10 relative overflow-hidden"><div className="absolute inset-0 grid-bg opacity-60 pointer-events-none"/>
        <div className="relative max-w-2xl"><div className="mono flex items-center gap-2"><Sparkles size={14} className="text-ember"/> andox pro · soon</div><h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">Track which skills your project already uses.</h2><p className="mt-2 text-muted">Collections, per-project progress, weekly new skills and premium playbooks. The core catalog stays free and open.</p><div className="mt-5 flex flex-col sm:flex-row gap-3"><Link href="/skills/" className="btn btn-ember">Use the free catalog</Link><a href="https://github.com/andos-public/Andox-skill" target="_blank" rel="noreferrer" className="btn">Star on GitHub</a></div></div>
      </div>
    </section>
  </>);
}
