import Link from "next/link";
import { PLAYBOOKS, getSkill, CAT_META } from "@/lib/data";
import CatIcon from "@/components/CatIcon";
export const metadata = { title: "Playbooks — Andox Skills" };
export default function Playbooks() {
  return (<div className="wrap py-6 sm:py-10">
    <div className="mono">playbooks</div>
    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">Paths, not piles.</h1>
    <p className="mt-1.5 text-muted max-w-2xl text-sm sm:text-base">A playbook sequences skills for one real goal. Each step says why it exists and which skills to load.</p>
    <div className="mt-6 space-y-4">{PLAYBOOKS.map(p => (<Link key={p.id} href={`/playbooks/${p.id}/`} className="panel panel-hover p-5 block"><span className="mono">{p.steps.length} steps · {p.steps.reduce((a,s)=>a+s.skills.length,0)} skills</span><div className="mt-2 font-bold text-xl leading-snug">{p.title}</div><p className="mt-1 text-muted text-sm">{p.tagline}</p><ol className="hflow mt-4 -mx-5 px-5 pb-1">{p.steps.map((s,i)=><li key={i}><div className="rounded-xl border border-line p-3 h-full bg-bg"><div className="flex items-center gap-2"><span className="size-6 grid place-items-center rounded-md border border-line bg-bg2 text-[11px] font-mono text-ember">{i+1}</span><span className="text-sm font-semibold leading-tight">{s.title}</span></div><div className="mt-2 flex flex-wrap gap-1">{s.skills.slice(0,3).map(k=>{const sk=getSkill(k); return sk ? <span key={k} className="tag !text-[10px]" style={{color: CAT_META[sk.category]?.color}}><CatIcon cat={sk.category} size={10}/> {sk.name}</span> : null;})}{s.skills.length>3 && <span className="tag !text-[10px]">+{s.skills.length-3}</span>}</div></div></li>)}</ol></Link>))}</div>
  </div>);
}
