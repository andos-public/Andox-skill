"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, CornerDownLeft, Route, LayoutGrid, FileText } from "lucide-react";
import CatIcon from "./CatIcon";
import { useT } from "@/lib/i18n";
export type Idx = { t: "skill"|"playbook"|"page"; id: string; name: string; sub: string; cat?: string };
export default function CommandPalette({ index }: { index: Idx[] }) {
  const [open, setOpen] = useState(false); const [q, setQ] = useState(""); const [i, setI] = useState(0); const inp = useRef<HTMLInputElement>(null); const r = useRouter(); const { t } = useT();
  useEffect(() => { const k = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen(o => !o); } else if (e.key === "/" && !open && !(e.target as HTMLElement).matches("input,textarea,select")) { e.preventDefault(); setOpen(true); } else if (e.key === "Escape") setOpen(false); }; window.addEventListener("keydown", k); const o = () => setOpen(true); window.addEventListener("andox:palette", o); return () => { window.removeEventListener("keydown", k); window.removeEventListener("andox:palette", o); }; }, [open]);
  useEffect(() => { if (open) { setQ(""); setI(0); setTimeout(() => inp.current?.focus(), 20); } }, [open]);
  const fuse = useMemo(() => new Fuse(index, { keys: ["name", "sub"], threshold: .35, ignoreLocation: true }), [index]);
  const res = useMemo(() => (q.trim() ? fuse.search(q).map(x => x.item) : index.filter(x => x.t !== "skill").concat(index.filter(x => x.t === "skill").slice(0, 6))).slice(0, 12), [q, fuse, index]);
  const go = (x: Idx) => { setOpen(false); r.push(x.t === "skill" ? `/skills/${x.id}/` : x.t === "playbook" ? `/playbooks/${x.id}/` : x.id); };
  if (!open) return null;
  return (<div className="fixed inset-0 z-[60]" role="dialog" aria-modal><div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)}/>
    <div className="absolute inset-x-3 top-[8vh] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[600px] panel overflow-hidden shadow-2xl">
      <label className="flex items-center gap-2 px-4 h-14 border-b border-line"><Search size={18} className="text-muted"/><input ref={inp} value={q} onChange={e => { setQ(e.target.value); setI(0); }} onKeyDown={e => { if (e.key === "ArrowDown") { e.preventDefault(); setI(v => Math.min(v + 1, res.length - 1)); } if (e.key === "ArrowUp") { e.preventDefault(); setI(v => Math.max(v - 1, 0)); } if (e.key === "Enter" && res[i]) go(res[i]); }} placeholder={t("cmdHint")} className="bg-transparent outline-none w-full text-base"/><span className="kbd hidden sm:inline">esc</span></label>
      <ul className="max-h-[60vh] overflow-auto py-1">{res.map((x, k) => (<li key={x.t + x.id}><button onMouseEnter={() => setI(k)} onClick={() => go(x)} className={"w-full text-left flex items-center gap-3 px-4 py-2.5 min-h-[44px] " + (k === i ? "bg-bg" : "")}>
        <span className="text-ember shrink-0">{x.t === "skill" ? <CatIcon cat={x.cat || "All"} size={16}/> : x.t === "playbook" ? <Route size={16}/> : x.sub === "page" ? <LayoutGrid size={16}/> : <FileText size={16}/>}</span>
        <span className="min-w-0 flex-1"><span className="block text-sm font-medium truncate">{x.name}</span><span className="block text-xs text-muted truncate">{x.sub}</span></span>
        {k === i && <CornerDownLeft size={14} className="text-muted"/>}</button></li>))}
        {res.length === 0 && <li className="px-4 py-8 text-center text-sm text-muted">{t("nothing")}</li>}</ul>
      <div className="px-4 py-2 border-t border-line mono flex gap-3"><span><span className="kbd">↑↓</span> move</span><span><span className="kbd">↵</span> open</span><span className="ml-auto"><span className="kbd">⌘K</span> / <span className="kbd">/</span></span></div>
    </div></div>);
}
