"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Settings from "./Settings";
import { IHome, IExplore, ICatalog, IPlaybook, ISaved, ISearch } from "./icons";
import { useT, LangToggle } from "@/lib/i18n";
const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
const TABS = [["/","home",IHome],["/categories/","explore",IExplore],["/skills/","catalog",ICatalog],["/playbooks/","playbooks",IPlaybook],["/saved/","saved",ISaved]] as const;
export default function Nav() {
  const p = usePathname() || "/"; const { t } = useT();
  const is = (h: string) => h === "/" ? p === "/" : p.startsWith(h);
  const openPalette = () => window.dispatchEvent(new Event("andox:palette"));
  return (<>
    <header className="sticky top-0 z-40 glass">
      <div className="wrap h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight min-h-[44px]"><Image src={`${BP}/brand/logo-512.png`} alt="" width={34} height={25} priority className="h-7 w-auto"/><span className="text-[20px]">Andox</span></Link>
        <nav className="hidden md:flex items-center gap-0.5 text-sm font-medium">
          {TABS.slice(1).map(([h,k,I]) => { const on = is(h); return <Link key={h} className={"px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors " + (on ? "bg-ember-soft text-ember" : "text-muted hover:text-fg")} href={h}><I size={18} active={on}/>{t(k)}</Link>; })}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={openPalette} aria-label={t("search")} className="grid place-items-center size-11 rounded-full text-fg press"><ISearch size={26}/></button>
          <span className="hidden md:flex items-center gap-1.5"><LangToggle/><ThemeToggle/></span><span className="md:hidden"><Settings/></span>
        </div>
      </div>
    </header>
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg px-3 pt-2" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}>
      <div className="grid grid-cols-5 gap-1 p-1.5 rounded-[20px] bg-bg2 border border-line">
        {TABS.map(([h,k,I]) => { const on = is(h); return (<Link key={k} href={h} className={"flex flex-col items-center justify-center gap-1 rounded-2xl h-[54px] text-[11px] font-semibold transition-all press " + (on ? "bg-ember text-black shadow-[0_6px_18px_-6px_var(--ember)]" : "text-muted")}><I size={22} active={on}/>{t(k)}</Link>); })}
      </div>
    </nav>
  </>);
}
