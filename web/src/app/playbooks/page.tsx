import Link from "next/link";
import { PLAYBOOKS } from "@/lib/data";
export const metadata = { title: "Playbooks — Andox Skills" };
export default function Playbooks() {
  return (<div className="mx-auto max-w-7xl px-4 py-10">
    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Playbooks</h1>
    <p className="mt-2 text-muted max-w-2xl">A playbook is a diagrammed sequence of skills for a real goal. Follow the steps top to bottom; each step links to the exact skills to load.</p>
    <div className="mt-8 grid gap-4 md:grid-cols-3">{PLAYBOOKS.map(p => (<Link key={p.id} href={`/playbooks/${p.id}/`} className="card p-6 block"><div className="chip">{p.steps.length} steps · {p.steps.reduce((a,s)=>a+s.skills.length,0)} skills</div><div className="mt-3 font-bold text-xl">{p.title}</div><p className="mt-1 text-muted text-sm">{p.tagline}</p><ol className="mt-4 space-y-1 text-sm text-muted">{p.steps.map((s,i)=><li key={i}>{i+1}. {s.title}</li>)}</ol></Link>))}</div>
  </div>);
}
