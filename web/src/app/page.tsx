import Link from "next/link";
import { getSkills, CATEGORIES, CAT_META, PLAYBOOKS } from "@/lib/data";
import { ArrowRight, Terminal, BookOpen, ShieldCheck, Layers, Search, Route } from "lucide-react";
import Copy from "@/components/Copy";
export default function Home() {
  const skills = getSkills();
  const counts = Object.fromEntries(CATEGORIES.map(c => [c, skills.filter(s => s.category === c).length]));
  const featured = ["mattpocock--grill-me","superpowers--test-driven-development","ponytail--ponytail","gstack--design-review","trailofbits--differential-review","emilkowalski--animate"].map(s => skills.find(x => x.slug === s)!).filter(Boolean);
  return (
    <>
      <section className="glow">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 text-center">
          <span className="chip rise">✨ {skills.length} curated skills · 3 playbooks · works with Claude Code, Cursor, Codex, Gemini CLI</span>
          <h1 className="rise rise-2 mt-6 text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.02]">Give your AI agent<br/><span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">real superpowers.</span></h1>
          <p className="rise rise-3 mt-6 max-w-2xl mx-auto text-lg text-muted">Andox organises the best open-source agent skills — methodology, design, security, web — into one searchable library with step-by-step playbooks, so your agent builds high-level projects the right way.</p>
          <div className="rise rise-4 mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/skills/" className="btn btn-primary">Browse the catalog <ArrowRight size={16}/></Link>
            <Link href="/playbooks/" className="btn">See playbooks <Route size={16}/></Link>
          </div>
          <div className="rise rise-4 mt-10 mx-auto max-w-xl card p-3 flex items-center gap-3 text-left font-mono text-sm">
            <Terminal size={16} className="text-muted shrink-0"/><span className="truncate">npx skills add andos-public/Andos-skill-page</span><span className="ml-auto"><Copy text="npx skills add andos-public/Andos-skill-page" label="Copy"/></span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight">Explore by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(c => (
            <Link key={c} href={`/skills/?cat=${encodeURIComponent(c)}`} className="card p-5 block">
              <div className="flex items-center justify-between"><span className="text-2xl">{CAT_META[c].icon}</span><span className="chip">{counts[c]} skills</span></div>
              <div className="mt-3 font-bold text-lg">{c}</div>
              <p className="mt-1 text-sm text-muted">{CAT_META[c].blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[[Search,"Find","Search 200+ skills by task, stack or pack. Every skill has a plain-English 'when to use'."],[Layers,"Pick a playbook","Website, secure auth & wallet, UI polish — each is a diagrammed sequence of skills."],[Terminal,"Install in one command","Copy the install command or the SKILL.md straight into your agent."],[ShieldCheck,"Ship with confidence","Review, security and QA skills are built into every playbook."]].map(([I,t,d],i) => { const Icon = I as React.ElementType; return (
            <div key={i} className="card p-5"><div className="size-9 grid place-items-center rounded-xl bg-soft text-accent"><Icon size={18}/></div><div className="mt-3 font-bold">{i+1}. {t as string}</div><p className="mt-1 text-sm text-muted">{d as string}</p></div>); })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between"><h2 className="text-2xl font-bold tracking-tight">Playbooks</h2><Link href="/playbooks/" className="text-sm font-semibold text-accent">All playbooks →</Link></div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PLAYBOOKS.map(p => (<Link key={p.id} href={`/playbooks/${p.id}/`} className="card p-5 block"><div className="chip">{p.steps.length} steps · {p.steps.reduce((a,s)=>a+s.skills.length,0)} skills</div><div className="mt-3 font-bold text-lg">{p.title}</div><p className="mt-1 text-sm text-muted">{p.tagline}</p></Link>))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between"><h2 className="text-2xl font-bold tracking-tight">Featured skills</h2><Link href="/skills/" className="text-sm font-semibold text-accent">Full catalog →</Link></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(s => (<Link key={s.slug} href={`/skills/${s.slug}/`} className="card p-5 block"><div className="flex items-center gap-2 text-xs text-muted"><span className="chip">{CAT_META[s.category]?.icon} {s.category}</span><span>⭐ {s.stars}</span></div><div className="mt-3 font-bold">{s.name}</div><p className="mt-1 text-sm text-muted line-clamp-3">{s.description}</p><div className="mt-3 text-xs text-muted">by {s.author} · {s.readMin} min read</div></Link>))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="card p-8 sm:p-12 text-center glow">
          <BookOpen className="mx-auto text-accent" size={28}/>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Andox Pro is coming</h2>
          <p className="mt-3 text-muted max-w-xl mx-auto">Private collections, project tracking, weekly new skills and premium playbooks. The core catalog stays free.</p>
          <div className="mt-6"><Link href="/skills/" className="btn btn-primary">Start with the free catalog <ArrowRight size={16}/></Link></div>
        </div>
      </section>
    </>
  );
}
