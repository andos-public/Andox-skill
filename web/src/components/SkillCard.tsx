"use client";
import Link from "next/link";
import CatIcon from "./CatIcon";
import Bookmark from "./Bookmark";
import StylePreview, { hasPreview } from "./StylePreview";
import { Star } from "lucide-react";
export type CardSkill = { slug:string; name:string; pack:string; category:string; group?:string; description:string; readMin:number; words:number; author:string; stars:string; color?:string };
const DIFF = (w:number) => w < 500 ? "Quick" : w < 1800 ? "Standard" : "Deep";
export default function SkillCard({ s, onOpen, view = "grid" }: { s: CardSkill; onOpen?: (s: CardSkill) => void; view?: "grid"|"list" }) {
  const href = `/skills/${s.slug}/`;
  const click = (e: React.MouseEvent) => { if (onOpen && window.matchMedia("(min-width:1024px)").matches && !e.metaKey && !e.ctrlKey) { e.preventDefault(); onOpen(s); } };
  if (view === "list") return (<Link href={href} onClick={click} className="flex items-center gap-3 px-3.5 py-2.5 min-h-[52px] hover:bg-bg"><span style={{ color: s.color }}><CatIcon cat={s.category} size={16}/></span><div className="min-w-0 flex-1"><div className="text-sm font-medium truncate">{s.name}</div><div className="text-xs text-muted truncate">{s.description}</div></div><span className="tag hidden sm:inline-flex">{DIFF(s.words)}</span><span className="mono shrink-0">{s.readMin}m</span><Bookmark slug={s.slug} compact/></Link>);
  return (<Link href={href} onClick={click} className="panel panel-hover p-3.5 sm:p-4 flex flex-col sm:min-h-[8.5rem]">
    <div className="flex items-start gap-2.5">
      {hasPreview(s.slug) ? <StylePreview slug={s.slug}/> : <span className="grid place-items-center size-8 rounded-lg shrink-0 border" style={{ color: s.color, background: `color-mix(in oklab, ${s.color ?? "var(--ember)"} 12%, transparent)`, borderColor: `color-mix(in oklab, ${s.color ?? "var(--ember)"} 25%, transparent)` }}><CatIcon cat={s.category} size={16}/></span>}
      <div className="min-w-0 flex-1"><div className="font-semibold leading-snug">{s.name}</div><div className="mono normal-case truncate">{s.pack}{s.group ? ` · ${s.group}` : ""}</div></div>
      <Bookmark slug={s.slug} compact/>
    </div>
    <p className="mt-2 text-sm text-muted line-clamp-2">{s.description}</p>
    <div className="mt-auto pt-2.5 flex items-center gap-1.5 flex-wrap"><span className="tag">{DIFF(s.words)}</span><span className="tag">{s.readMin} min</span>{s.stars !== "—" && <span className="tag ml-auto" title="GitHub stars of the source repo"><Star size={10}/> {s.stars}</span>}</div>
  </Link>);
}
