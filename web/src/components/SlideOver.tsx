"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { X, ExternalLink, Maximize2 } from "lucide-react";
import Copy from "./Copy";
import Bookmark from "./Bookmark";
import CatIcon from "./CatIcon";
import type { CardSkill } from "./SkillCard";
const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default function SlideOver({ s, onClose }: { s: CardSkill | null; onClose: () => void }) {
  const [body, setBody] = useState(""); const [loading, setLoading] = useState(false);
  useEffect(() => { if (!s) return; setLoading(true); setBody(""); fetch(`${BP}/b/${s.slug}.md`).then(r => r.text()).then(t => { setBody(t); setLoading(false); }).catch(() => setLoading(false)); }, [s]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);
  if (!s) return null;
  const install = `npx skills add andos-public/Andox-skill --skill ${s.name}`;
  const prompt = `Read .agents/skills/${s.slug.split("--").join("/")}/SKILL.md and follow it step by step for this task: <describe your task>.`;
  return (<div className="fixed inset-0 z-50 hidden lg:block"><div className="absolute inset-0 bg-black/40" onClick={onClose}/>
    <aside className="absolute right-0 top-0 h-full w-[560px] max-w-[90vw] bg-bg border-l border-line shadow-2xl flex flex-col animate-[in_.25s_ease-out]">
      <div className="p-5 border-b border-line">
        <div className="flex items-center justify-between gap-2"><span className="tag tag-ember"><CatIcon cat={s.category} size={12}/> {s.category}</span><div className="flex gap-1"><Link href={`/skills/${s.slug}/`} className="btn !min-h-9 !px-2.5 text-xs"><Maximize2 size={14}/> Full page</Link><button onClick={onClose} aria-label="Close" className="btn !min-h-9 !px-2.5"><X size={16}/></button></div></div>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight">{s.name}</h2>
        <div className="mono normal-case mt-1">{s.pack} · {s.author} · {s.readMin} min</div>
        <p className="mt-2 text-sm text-muted">{s.description}</p>
        <div className="mt-3 flex gap-2 flex-wrap"><Copy text={install} label="Install" variant="btn-ember !min-h-10 text-xs"/><Copy text={body} label="Copy SKILL.md" variant="!min-h-10 text-xs"/><Copy text={prompt} label="Agent prompt" variant="!min-h-10 text-xs"/><Bookmark slug={s.slug}/></div>
      </div>
      <div className="flex-1 overflow-auto p-5">{loading ? <div className="text-sm text-muted">Loading SKILL.md…</div> : <div className="prose-skill"><ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown></div>}</div>
      <div className="p-3 border-t border-line flex justify-between items-center"><span className="mono">esc to close</span><a className="text-xs text-ember font-semibold inline-flex items-center gap-1" href={`https://github.com/andos-public/Andox-skill/tree/main/.agents/skills/${s.slug.split("--").join("/")}`} target="_blank" rel="noreferrer">GitHub <ExternalLink size={12}/></a></div>
    </aside></div>);
}
