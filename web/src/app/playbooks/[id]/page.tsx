import Link from "next/link";
import { PLAYBOOKS, getSkill, CAT_META, difficulty } from "@/lib/data";
import Copy from "@/components/Copy";
import { ArrowLeft } from "lucide-react";
import CatIcon from "@/components/CatIcon";
export function generateStaticParams() { return PLAYBOOKS.map(p => ({ id: p.id })); }
export default async function Playbook({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const p = PLAYBOOKS.find(x => x.id === id); if (!p) return <div className="p-10">Not found</div>;
  const prompt = `Follow this playbook: "${p.title}". Goal: ${p.goal}\n` + p.steps.map((s,i)=>`${i+1}. ${s.title} — read and apply: ${s.skills.map(k=>getSkill(k)?.path+"/SKILL.md").join(", ")}`).join("\n") + `\nAfter each step, summarise what you did and what you verified before moving on.`;
  const total = p.steps.reduce((a,s)=>a+s.skills.length,0); const mins = p.steps.reduce((a,s)=>a+s.skills.reduce((b,k)=>b+(getSkill(k)?.readMin||0),0),0);
  return (<div className="mx-auto max-w-5xl px-4 py-5 sm:py-8">
    <Link href="/playbooks/" className="text-sm text-muted inline-flex items-center gap-1 hover:text-fg"><ArrowLeft size={14}/> Playbooks</Link>
    <div className="mt-3 flex flex-wrap gap-1.5"><span className="tag tag-ember">playbook</span><span className="tag">{p.steps.length} steps</span><span className="tag">{total} skills</span><span className="tag">~{mins} min reading</span></div>
    <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">{p.title}</h1>
    <p className="mt-2 text-muted text-[15px] sm:text-lg">{p.tagline}</p>
    <div className="panel mt-5 p-4 sm:p-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><div className="mono mb-1">Goal</div><p className="text-sm">{p.goal}</p></div><Copy text={prompt} label="Copy playbook prompt" variant="btn-ember"/></div>
    <div className="mt-6 flex gap-1.5 overflow-x-auto hide-scroll -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">{p.steps.map((s,i)=>(<a key={i} href={`#step-${i+1}`} className="tag !py-1.5 whitespace-nowrap"><span className="text-ember">{i+1}</span> {s.title}</a>))}</div>
    <ol className="mt-6 flow space-y-5 pl-10 sm:pl-12">
      {p.steps.map((s,i)=>(<li key={i} id={`step-${i+1}`} className="relative scroll-mt-20">
        <span className="absolute -left-10 sm:-left-12 top-3 size-6 grid place-items-center rounded-md bg-ember text-black text-xs font-bold font-mono">{i+1}</span>
        <div className="panel p-4 sm:p-5"><div className="font-bold text-lg leading-snug">{s.title}</div><p className="text-sm text-muted mt-1">{s.why}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">{s.skills.map(k=>{const sk=getSkill(k); if(!sk) return null; return (<Link key={k} href={`/skills/${k}/`} className="rounded-xl border border-line p-3 hover:border-ember/60 transition-colors"><div className="flex items-center justify-between"><span className="mono normal-case flex items-center gap-1"><CatIcon cat={sk.category} size={12}/> {sk.pack}</span><span className="tag">{difficulty(sk.words)}</span></div><div className="font-semibold text-sm mt-1.5">{sk.name}</div><div className="text-xs text-muted line-clamp-2 mt-1">{sk.description}</div></Link>);})}</div>
        </div></li>))}
    </ol>
  </div>);
}
