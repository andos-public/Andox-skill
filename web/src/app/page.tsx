import Link from "next/link";
import { getSkills, CATEGORIES, CAT_META, PLAYBOOKS } from "@/lib/data";
import { ArrowRight, Terminal, Search, Route, ShieldCheck, Sparkles, Boxes } from "lucide-react";
import Copy from "@/components/Copy";
import Typer from "@/components/Typer";
export default function Home() {
  const skills = getSkills();
  const counts = Object.fromEntries(CATEGORIES.map(c => [c, skills.filter(s => s.category === c).length]));
  const packs = new Set(skills.map(s => s.pack)).size;
  const featured = ["mattpocock--grill-me","ponytail--ponytail","superpowers--test-driven-development","gstack--design-review","trailofbits--differential-review","emilkowalski--animate","strix--owasp-top-10-testing","frontend-checklist--frontend-checklist-global"].map(s => skills.find(x => x.slug === s)!).filter(Boolean);
  return (<>
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none"/>
      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-10 sm:pt-24 sm:pb-16 grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center">
        <div>
          <div className="in mono flex items-center gap-2"><span className="size-1.5 rounded-full bg-ember"/> {skills.length} skills · {packs} packs · {PLAYBOOKS.length} playbooks</div>
          <h1 className="in in-1 mt-4 text-[2.6rem] leading-[1.02] sm:text-6xl font-extrabold tracking-tight">The skill workbench<br/>for your <span className="text-ember">AI agent.</span></h1>
          <p className="in in-2 mt-5 text-muted text-base sm:text-lg max-w-xl">Andox curates the most-used open-source agent skills into one organised, searchable library — with playbooks that tell your agent <em>which</em> skill to load, <em>when</em>, and <em>why</em>.</p>
          <div className="in in-3 mt-7 flex flex-col sm:flex-row gap-3">
            <Link href="/skills/" className="btn btn-ember">Open the catalog <ArrowRight size={16}/></Link>
            <Link href="/playbooks/" className="btn">Start with a playbook <Route size={16}/></Link>
          </div>
          <div className="in in-3 mt-6 panel p-3 flex items-center gap-2 font-mono text-[13px] max-w-xl"><Terminal size={15} className="text-ember shrink-0"/><span className="truncate text-muted">npx skills add andos-public/Andox-skill</span><span className="ml-auto"><Copy text="npx skills add andos-public/Andox-skill" label="Copy" variant="!min-h-8 !px-2.5 text-xs"/></span></div>
        </div>
        <div className="in in-2 panel p-4 sm:p-5 bg-bg2">
          <div className="flex items-center gap-1.5 mb-3"><span className="size-2.5 rounded-full bg-line"/><span className="size-2.5 rounded-full bg-line"/><span className="size-2.5 rounded-full bg-line"/><span className="mono ml-2">agent session · andox</span></div>
          <Typer/>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-end justify-between mb-4"><div><div className="mono">01 — browse</div><h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">Six shelves, every skill has a home</h2></div><Link href="/skills/" className="text-sm font-semibold text-ember hidden sm:block">All skills →</Link></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <Link key={c} href={`/skills/?cat=${encodeURIComponent(c)}`} className="panel panel-hover p-4 sm:p-5 flex gap-4">
            <div className="mono pt-1 w-7">{String(i+1).padStart(2,"0")}</div>
            <div className="min-w-0 flex-1"><div className="flex items-center justify-between"><span className="font-bold">{CAT_META[c].icon} {c}</span><span className="tag">{counts[c]}</span></div><p className="mt-1.5 text-sm text-muted">{CAT_META[c].blurb}</p></div>
          </Link>))}
      </div>
    </section>

    <section id="how" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mono">02 — how it works</div>
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">From “I have an idea” to “it shipped”</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {[[Search,"Find the skill","Search by task (“pentest”, “animation”, “plan”). Each skill states when to use it."],[Route,"Follow a playbook","Playbooks sequence skills for a goal: website, secure auth & wallet, UI polish."],[Terminal,"Load it into your agent","One install command, or copy the SKILL.md / a ready-made agent prompt."],[ShieldCheck,"Ship with checks","Review, security and QA skills are part of every path — not an afterthought."]].map(([I,t,d],i) => { const Icon = I as React.ElementType; return (
          <div key={i} className="panel p-4 sm:p-5"><div className="flex items-center justify-between"><span className="size-9 grid place-items-center rounded-lg bg-ember-soft text-ember"><Icon size={17}/></span><span className="mono">step {i+1}</span></div><div className="mt-3 font-bold">{t as string}</div><p className="mt-1 text-sm text-muted">{d as string}</p></div>); })}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-end justify-between mb-4"><div><div className="mono">03 — playbooks</div><h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">Pick a path</h2></div><Link href="/playbooks/" className="text-sm font-semibold text-ember hidden sm:block">All playbooks →</Link></div>
      <div className="grid gap-3 md:grid-cols-3">
        {PLAYBOOKS.map(p => (<Link key={p.id} href={`/playbooks/${p.id}/`} className="panel panel-hover p-5 flex flex-col"><div className="flex items-center gap-2"><Boxes size={16} className="text-ember"/><span className="mono">{p.steps.length} steps · {p.steps.reduce((a,s)=>a+s.skills.length,0)} skills</span></div><div className="mt-3 font-bold text-lg leading-snug">{p.title}</div><p className="mt-1 text-sm text-muted">{p.tagline}</p><div className="mt-4 flex flex-wrap gap-1">{p.steps.slice(0,4).map((s,i)=><span key={i} className="tag">{i+1}. {s.title}</span>)}{p.steps.length>4 && <span className="tag">+{p.steps.length-4}</span>}</div></Link>))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-end justify-between mb-4"><div><div className="mono">04 — most useful first</div><h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">Start here</h2></div></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map(s => (<Link key={s.slug} href={`/skills/${s.slug}/`} className="panel panel-hover p-4 flex flex-col"><div className="flex items-center justify-between gap-2"><span className="tag">{CAT_META[s.category]?.icon} {s.pack}</span><span className="mono">★ {s.stars}</span></div><div className="mt-3 font-bold">{s.name}</div><p className="mt-1 text-sm text-muted line-clamp-3">{s.description}</p></Link>))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="panel p-6 sm:p-10 relative overflow-hidden"><div className="absolute inset-0 grid-bg opacity-60 pointer-events-none"/>
        <div className="relative max-w-2xl"><div className="mono flex items-center gap-2"><Sparkles size={14} className="text-ember"/> andox pro · soon</div><h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">Track which skills your project already uses.</h2><p className="mt-2 text-muted">Collections, per-project progress, weekly new skills and premium playbooks. The core catalog stays free and open.</p><div className="mt-5 flex flex-col sm:flex-row gap-3"><Link href="/skills/" className="btn btn-ember">Use the free catalog</Link><a href="https://github.com/andos-public/Andox-skill" target="_blank" rel="noreferrer" className="btn">Star on GitHub</a></div></div>
      </div>
    </section>
  </>);
}
