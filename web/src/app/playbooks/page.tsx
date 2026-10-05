import Link from "next/link";
import { PLAYBOOKS, getSkill } from "@/lib/data";
export const metadata = { title: "Playbooks — Andox Skills" };
export default function Playbooks() {
  return (<div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
    <div className="mono">playbooks</div>
    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">Paths, not piles.</h1>
    <p className="mt-1.5 text-muted max-w-2xl text-sm sm:text-base">A playbook sequences skills for one real goal. Each step says why it exists and which skills to load.</p>
    <div className="mt-6 grid gap-3 md:grid-cols-3">{PLAYBOOKS.map(p => (<Link key={p.id} href={`/playbooks/${p.id}/`} className="panel panel-hover p-5 flex flex-col"><span className="mono">{p.steps.length} steps · {p.steps.reduce((a,s)=>a+s.skills.length,0)} skills</span><div className="mt-2 font-bold text-xl leading-snug">{p.title}</div><p className="mt-1 text-muted text-sm">{p.tagline}</p><ol className="mt-4 flow space-y-2 pl-8 text-sm">{p.steps.map((s,i)=><li key={i} className="relative"><span className="absolute -left-8 top-0 size-6 grid place-items-center rounded-md border border-line bg-bg2 text-[11px] font-mono text-ember">{i+1}</span>{s.title}<span className="mono normal-case ml-2">{s.skills.map(k=>getSkill(k)?.pack).filter((v,i,a)=>v&&a.indexOf(v)===i).slice(0,2).join(", ")}</span></li>)}</ol></Link>))}</div>
  </div>);
}
