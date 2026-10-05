"use client";
import { useState } from "react";
export default function Tabs({ tabs }: { tabs: { id: string; label: string; content: React.ReactNode }[] }) {
  const [a, setA] = useState(tabs[0].id);
  return (<div>
    <div className="sticky top-14 z-20 -mx-4 px-4 bg-bg/90 backdrop-blur border-b border-line flex gap-1 overflow-x-auto hide-scroll">{tabs.map(t => <button key={t.id} onClick={() => setA(t.id)} className={"px-3 py-3 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors " + (a===t.id ? "border-ember text-fg" : "border-transparent text-muted hover:text-fg")}>{t.label}</button>)}</div>
    <div className="pt-5">{tabs.find(t => t.id === a)?.content}</div>
  </div>);
}
