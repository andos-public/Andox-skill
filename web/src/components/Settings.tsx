"use client";
import { useState } from "react";
import { Moon, Sun, MonitorSmartphone, SlidersHorizontal, X } from "lucide-react";
import { useT } from "@/lib/i18n";
export default function Settings() {
  const [open, setOpen] = useState(false); const { lang, setLang } = useT();
  const pref = typeof localStorage !== "undefined" ? (localStorage.getItem("theme") || "system") : "system";
  const setTheme = (m: "system"|"dark"|"light") => { if (m === "system") { localStorage.removeItem("theme"); document.documentElement.classList.toggle("dark", matchMedia("(prefers-color-scheme: dark)").matches); } else { localStorage.setItem("theme", m); document.documentElement.classList.toggle("dark", m === "dark"); } setOpen(false); };
  return (<>
    <button onClick={() => setOpen(true)} aria-label="Settings" className="btn !min-h-10 !px-3 text-muted press md:hidden"><SlidersHorizontal size={18}/></button>
    {open && <div className="fixed inset-0 z-[70] md:hidden" role="dialog" aria-modal><div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)}/>
      <div className="absolute bottom-0 inset-x-0 panel !rounded-b-none p-5" style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}>
        <div className="flex items-center justify-between mb-4"><div className="font-bold">Settings</div><button onClick={() => setOpen(false)} className="btn !px-3"><X size={18}/></button></div>
        <div className="mono mb-2">Theme</div>
        <div className="grid grid-cols-3 gap-2"><button onClick={() => setTheme("system")} className={"btn !px-2 " + (pref === "system" ? "border-ember text-ember" : "")}><MonitorSmartphone size={16}/> Auto</button><button onClick={() => setTheme("dark")} className={"btn !px-2 " + (pref === "dark" ? "border-ember text-ember" : "")}><Moon size={16}/> Dark</button><button onClick={() => setTheme("light")} className={"btn !px-2 " + (pref === "light" ? "border-ember text-ember" : "")}><Sun size={16}/> Light</button></div>
        <div className="mono mt-5 mb-2">Language</div>
        <div className="grid grid-cols-2 gap-2"><button onClick={() => { setLang("en"); setOpen(false); }} className={"btn " + (lang === "en" ? "border-ember text-ember" : "")}>English</button><button onClick={() => { setLang("hi"); setOpen(false); }} className={"btn " + (lang === "hi" ? "border-ember text-ember" : "")}>हिन्दी</button></div>
      </div></div>}
  </>);
}
