import Link from "next/link";
import { PLAYBOOKS, getSkill, CAT_META } from "@/lib/data";
import Copy from "@/components/Copy";
import { ArrowLeft } from "lucide-react";
export function generateStaticParams() { return PLAYBOOKS.map(p => ({ id: p.id })); }
export default async function Playbook({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const p = PLAYBOOKS.find(x => x.id === id); if (!p) return <div className="p-10">Not found</div>;
  const prompt = `Follow this playbook: "${p.title}". Goal: ${p.goal}\n` + p.steps.map((s,i)=>`${i+1}. ${s.title} — read and apply: ${s.skills.map(k=>getSkill(k)?.path+"/SKILL.md").join(", ")}`).join("\n") + `\nAfter each step, summarise what you did and what you verified before moving on.`;
  return (<div className="mx-auto max-w-5xl px-4 py-8">
    <Link href="/playbooks/" className="text-sm text-muted inline-flex items-center gap-1 hover:text-fg"><ArrowLeft size={14}/> Playbooks</Link>
    <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{p.title}</h1>
    <p className="mt-2 text-lg text-muted">{p.tagline}</p>
    <div className="card mt-5 p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"><div><div className="text-xs font-bold uppercase tracking-wider text-muted">Goal</div><p className="mt-1 text-sm">{p.goal}</p></div><Copy text={prompt} label="Copy full playbook prompt" primary/></div>
    <div className="mt-6 hidden md:flex items-center gap-2 overflow-auto py-2">{p.steps.map((s,i)=>(<div key={i} className="flex items-center gap-2 shrink-0"><div className="chip !py-1.5"><span className="size-5 grid place-items-center rounded-full bg-accent text-white text-[10px] font-bold">{i+1}</span>{s.title}</div>{i<p.steps.length-1 && <span className="text-muted">→</span>}</div>))}</div>
    <ol className="mt-8 space-y-6">
      {p.steps.map((s,i)=>(<li key={i} className="relative pl-14">
        {i<p.steps.length-1 && <span className="step-line" aria-hidden/>}
        <span className="absolute left-0 top-0 size-10 grid place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 text-white font-bold">{i+1}</span>
        <div className="card p-5"><div className="font-bold text-lg">{s.title}</div><p className="text-sm text-muted mt-1">{s.why}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">{s.skills.map(k=>{const sk=getSkill(k); if(!sk) return null; return (<Link key={k} href={`/skills/${k}/`} className="rounded-xl border border-border p-3 hover:border-accent transition-colors"><div className="text-xs text-muted">{CAT_META[sk.category]?.icon} {sk.pack}</div><div className="font-semibold text-sm mt-0.5">{sk.name}</div><div className="text-xs text-muted line-clamp-2 mt-1">{sk.description}</div></Link>);})}</div>
        </div></li>))}
    </ol>
  </div>);
}
