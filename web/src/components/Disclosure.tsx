"use client";
import { useEffect, useState } from "react";
import { IChevron } from "./icons";
/** Collapsed on mobile by default, open on desktop. Progressive disclosure for dense content. */
export default function Disclosure({ title, meta, children, mobileOpen = false, desktopOpen = true, className = "" }: { title: React.ReactNode; meta?: React.ReactNode; children: React.ReactNode; mobileOpen?: boolean; desktopOpen?: boolean; className?: string }) {
  const [open, setOpen] = useState(mobileOpen);
  useEffect(() => { if (window.matchMedia("(min-width:1024px)").matches) setOpen(desktopOpen); }, [desktopOpen]);
  return (<section className={"panel overflow-hidden " + className}>
    <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="w-full flex items-center gap-3 px-4 py-3.5 min-h-[52px] text-left press">
      <span className="font-bold flex-1 min-w-0">{title}</span>{meta && <span className="mono shrink-0">{meta}</span>}<IChevron size={18} className={"text-muted transition-transform duration-300 " + (open ? "rotate-180" : "")}/>
    </button>
    <div className={"grid transition-[grid-template-rows] duration-300 ease-out " + (open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}><div className="overflow-hidden"><div className="px-4 pb-4 border-t border-line pt-4">{children}</div></div></div>
  </section>);
}
