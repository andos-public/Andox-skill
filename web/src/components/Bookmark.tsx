"use client";
import { useEffect, useState } from "react";
import { IHeart } from "./icons";
const KEY = "andox:saved";
export function readSaved(): string[] { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } }
export function useSaved() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => { setSaved(readSaved()); const h = () => setSaved(readSaved()); window.addEventListener("andox:saved", h); return () => window.removeEventListener("andox:saved", h); }, []);
  const toggle = (slug: string) => { const cur = readSaved(); const next = cur.includes(slug) ? cur.filter(x => x !== slug) : [slug, ...cur]; localStorage.setItem(KEY, JSON.stringify(next)); window.dispatchEvent(new Event("andox:saved")); };
  return { saved, toggle };
}
export default function Bookmark({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { saved, toggle } = useSaved(); const on = saved.includes(slug);
  return <button onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(slug); }} aria-pressed={on} aria-label={on ? "Remove from saved" : "Save skill"} className={compact ? "grid place-items-center size-9 -m-2 rounded-md " + (on ? "text-ember" : "text-muted hover:text-ember") : "btn " + (on ? "text-ember border-ember/50" : "")}><IHeart size={18} active={on}/>{!compact && (on ? "Saved" : "Save")}</button>;
}
