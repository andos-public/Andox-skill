"use client";
import { useState } from "react";
import { Moon, Sun, SlidersHorizontal, X } from "lucide-react";
import { useT } from "@/lib/i18n";
export default function Settings() {
  const [open, setOpen] = useState(false); const { lang, setLang } = useT();
  const dark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const setTheme = (d: boolean) => { document.documentElement.classList.toggle("dark", d); localStorage.setItem("theme", d ? "dark" : "light"); setOpen(false); };
  return (<>
    <button onClick={() => setOpen(true)} aria-label="Settings" className="btn !min-h-10 !px-3 text-muted press md:hidden"><SlidersHorizontal size={18}/></button>
    {open && <div className="fixed inset-0 z-[70] md:hidden" role="dialog" aria-modal><div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)}/>
      <div className="absolute bottom-0 inset-x-0 panel !rounded-b-none p-5" style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}>
        <div className="flex items-center justify-between mb-4"><div className="font-bold">Settings</div><button onClick={() => setOpen(false)} className="btn !px-3"><X size={18}/></button></div>
        <div className="mono mb-2">Theme</div>
        <div className="grid grid-cols-2 gap-2"><button onClick={() => setTheme(true)} className={"btn " + (dark ? "border-ember text-ember" : "")}><Moon size={16}/> Dark</button><button onClick={() => setTheme(false)} className={"btn " + (!dark ? "border-ember text-ember" : "")}><Sun size={16}/> Light</button></div>
        <div className="mono mt-5 mb-2">Language</div>
        <div className="grid grid-cols-2 gap-2"><button onClick={() => { setLang("en"); setOpen(false); }} className={"btn " + (lang === "en" ? "border-ember text-ember" : "")}>English</button><button onClick={() => { setLang("hi"); setOpen(false); }} className={"btn " + (lang === "hi" ? "border-ember text-ember" : "")}>हिन्दी</button></div>
      </div></div>}
  </>);
}
