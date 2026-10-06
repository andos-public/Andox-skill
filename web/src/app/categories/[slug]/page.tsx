import Link from "next/link";
import { getSkills, CATEGORIES, CAT_META, catBySlug, PLAYBOOKS, difficulty, GROUPS, GROUP_BLURB } from "@/lib/data";
import CatIcon, { CatBadge } from "@/components/CatIcon";
import InstallBox from "@/components/InstallBox";
import Copy from "@/components/Copy";
import Disclosure from "@/components/Disclosure";
import { ArrowLeft, ArrowRight, Check, Users, Target } from "lucide-react";
export function generateStaticParams() { return CATEGORIES.map(c => ({ slug: CAT_META[c].slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const c = catBySlug(slug); return { title: `${c} skills — Andox Skills`, description: c ? CAT_META[c].long : "" }; }
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const c = catBySlug(slug); if (!c) return <div className="p-10">Not found</div>;
  const m = CAT_META[c]; const all = getSkills(); const list = all.filter(s => s.category === c);
  const packs = Array.from(new Set(list.map(s => s.pack))).map(p => ({ p, items: list.filter(s => s.pack === p) })).sort((a,b) => b.items.length - a.items.length);
  const depth = { Quick: 0, Standard: 0, Deep: 0 } as Record<string, number>; list.forEach(s => depth[difficulty(s.words)]++);
  const mins = list.reduce((a,s)=>a+s.readMin,0);
  const start = m.start.map(s => all.find(x => x.slug === s)!).filter(Boolean);
  const pbs = PLAYBOOKS.map(p => ({ p, n: p.steps.flatMap(s => s.skills).filter(k => list.some(x => x.slug === k)).length })).filter(x => x.n > 0);
  const others = CATEGORIES.filter(x => x !== c);
  const prompt = `You have the Andox "${c}" skill set installed under .agents/skills/. Before starting any task that touches ${c.toLowerCase()}, list the relevant SKILL.md files, read the ones that apply, and follow them. Start with: ${start.map(s => s.path + "/SKILL.md").join(", ")}.`;
  return (<div className="wrap py-5 sm:py-8">
    <Link href="/categories/" className="text-sm text-muted inline-flex items-center gap-1 hover:text-fg"><ArrowLeft size={14}/> Categories</Link>
    <div className="mt-4 panel overflow-hidden relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/ill/${m.slug}.webp`} alt="" width={640} height={640} className="absolute right-0 top-0 h-full w-auto opacity-90 pointer-events-none select-none" style={{ maskImage: "linear-gradient(90deg, transparent, #000 35%)" }}/>
      <div className="relative p-5 sm:p-8 min-h-[150px] sm:min-h-[200px] flex flex-col justify-end max-w-[62%]"><div className="mono">category · {list.length} skills · {packs.length} packs</div><h1 className="mt-1 text-[1.9rem] sm:text-4xl leading-tight">{c}</h1></div>
    </div>
    <p className="mt-4 text-[15px] sm:text-lg text-muted max-w-3xl line-clamp-3 sm:line-clamp-none">{m.long}</p>
    <div className="mt-5 grid grid-cols-3 sm:grid-cols-6 gap-2">
      {[["Skills",list.length],["Packs",packs.length],["Reading",`~${Math.round(mins/60)}h`],["Quick",depth.Quick],["Standard",depth.Standard],["Deep",depth.Deep]].map(([k,v]) => <div key={k as string} className="panel p-3"><div className="text-xl font-extrabold tabular-nums">{v}</div><div className="mono">{k}</div></div>)}
    </div>
    <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <Disclosure title="Who it’s for & what you get">
          <div className="grid sm:grid-cols-2 gap-5">
            <div><div className="mono flex items-center gap-1.5 mb-2"><Users size={13}/> Who it’s for</div><p className="text-sm">{m.forWho}</p></div>
            <div><div className="mono flex items-center gap-1.5 mb-2"><Target size={13}/> What you get</div><ul className="text-sm space-y-1.5">{m.outcomes.map(o => <li key={o} className="flex gap-2"><Check size={15} className="text-ember shrink-0 mt-0.5"/>{o}</li>)}</ul></div>
          </div>
        </Disclosure>
        <section><div className="flex items-end justify-between mb-3"><h2 className="font-bold text-lg">Start here</h2><span className="mono">recommended order</span></div>
          <ol className="flow space-y-2 pl-9">{start.map((s,i) => <li key={s.slug} className="relative"><span className="absolute -left-9 top-3 size-6 grid place-items-center rounded-md bg-ember text-black text-xs font-bold font-mono">{i+1}</span><Link href={`/skills/${s.slug}/`} className="panel panel-hover p-3.5 block"><div className="flex items-center justify-between gap-2"><span className="font-semibold">{s.name}</span><span className="tag">{difficulty(s.words)} · {s.readMin}m</span></div><p className="text-sm text-muted mt-1 line-clamp-2">{s.description}</p></Link></li>)}</ol>
        </section>
        {c === "Methodology" && <section><h2 className="font-bold text-lg mb-3">Six stages of the workflow</h2><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{GROUPS.map((g,i) => { const n = list.filter(s => s.group === g).length; return (<Link key={g} href={`/skills/?cat=Methodology&group=${encodeURIComponent(g)}`} className="panel panel-hover p-4 flex gap-3"><span className="size-7 grid place-items-center rounded-md bg-ember text-black text-xs font-bold font-mono shrink-0">{i+1}</span><div className="min-w-0"><div className="font-semibold">{g}</div><p className="text-xs text-muted mt-0.5 line-clamp-2">{GROUP_BLURB[g]}</p><div className="text-xs font-semibold text-ember mt-1.5">{n} skills</div></div></Link>); })}</div></section>}
        <section><div className="flex items-end justify-between mb-3"><h2 className="font-bold text-lg">All {list.length} skills by pack</h2><Link href={`/skills/?cat=${encodeURIComponent(c)}`} className="text-sm font-semibold text-ember">Search inside <ArrowRight size={14} className="inline"/></Link></div>
          <div className="space-y-3">{packs.map(({p, items}) => (<details key={p} className="panel overflow-hidden group" open={items.length <= 6}>
            <summary className="list-none cursor-pointer p-4 flex items-center justify-between gap-3"><div><div className="font-semibold">{p}</div><div className="mono normal-case">{items[0].author} · {items[0].stars} GitHub stars</div></div><span className="tag">{items.length}</span></summary>
            <div className="border-t border-line divide-y divide-line">{items.map(s => <Link key={s.slug} href={`/skills/${s.slug}/`} className="flex items-center gap-3 px-4 py-3 hover:bg-bg"><div className="min-w-0 flex-1"><div className="text-sm font-medium truncate">{s.name}</div><div className="text-xs text-muted truncate">{s.description}</div></div><span className="mono shrink-0">{s.readMin}m</span><ArrowRight size={14} className="text-muted shrink-0"/></Link>)}</div>
          </details>))}</div>
        </section>
      </div>
      <aside className="space-y-4 lg:sticky lg:top-20 self-start">
        <InstallBox target={`--category ${m.slug}`} npx={`npx skills add andos-public/Andox-skill`}/>
        <div className="panel p-4"><div className="mono mb-2">Agent prompt for this category</div><p className="text-xs text-muted line-clamp-3">{prompt}</p><div className="mt-3"><Copy text={prompt} label="Copy prompt" variant="w-full !min-h-10 text-xs"/></div></div>
        {pbs.length > 0 && <div className="panel p-4"><div className="mono mb-2">Used in playbooks</div><ul className="space-y-2">{pbs.map(({p,n}) => <li key={p.id}><Link href={`/playbooks/${p.id}/`} className="flex items-center justify-between text-sm"><span className="font-semibold text-ember">{p.title}</span><span className="mono">{n} skills</span></Link></li>)}</ul></div>}
        <div className="panel p-4"><div className="mono mb-2">Other categories</div><div className="grid grid-cols-1 gap-1">{others.map(o => <Link key={o} href={`/categories/${CAT_META[o].slug}/`} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-bg text-sm"><CatIcon cat={o} size={15} className="text-ember"/>{o}<span className="mono ml-auto">{all.filter(s=>s.category===o).length}</span></Link>)}</div></div>
      </aside>
    </div>
  </div>);
}
