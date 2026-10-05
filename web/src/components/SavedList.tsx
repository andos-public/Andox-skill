"use client";
import Link from "next/link";
import { useSaved } from "./Bookmark";
import Bookmark from "./Bookmark";
import Copy from "./Copy";
import CatIcon from "./CatIcon";
import { Bookmark as Icon } from "lucide-react";
type S = { slug:string; name:string; pack:string; category:string; description:string; readMin:number; path:string };
export default function SavedList({ skills }: { skills: S[] }) {
  const { saved } = useSaved(); const list = saved.map(s => skills.find(x => x.slug === s)!).filter(Boolean);
  const py = `curl -sL https://andos-public.github.io/Andox-skill/install.py | python3 - --skill ${list.map(s=>s.slug).join(" ")}`;
  const prompt = `Read and follow these skills for my task: ${list.map(s=>s.path+"/SKILL.md").join(", ")}. Task: <describe>`;
  return (<div className="wrap max-w-5xl py-6 sm:py-10">
    <div className="mono">your shelf</div>
    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">Saved skills</h1>
    <p className="mt-1.5 text-muted text-sm sm:text-base">Stored on this device for now. Sign-in and project tracking arrive with Andox Pro.</p>
    {list.length === 0 ? <div className="panel p-10 mt-6 text-center"><Icon className="mx-auto text-muted" size={28}/><p className="mt-3 text-muted">Nothing saved yet. Tap the bookmark on any skill.</p><Link href="/skills/" className="btn btn-ember mt-5">Browse catalog</Link></div> : (<>
      <div className="mt-5 flex gap-2 flex-wrap"><Copy text={py} label={`Install all ${list.length} (Python)`} variant="btn-ember"/><Copy text={prompt} label="Copy agent prompt"/></div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">{list.map(s => <Link key={s.slug} href={`/skills/${s.slug}/`} className="panel panel-hover p-4 flex gap-3"><CatIcon cat={s.category} size={18} className="text-ember mt-0.5 shrink-0"/><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><span className="font-semibold">{s.name}</span><Bookmark slug={s.slug} compact/></div><div className="mono normal-case">{s.pack} · {s.readMin}m</div><p className="text-sm text-muted line-clamp-2 mt-1">{s.description}</p></div></Link>)}</div></>)}
  </div>);
}
