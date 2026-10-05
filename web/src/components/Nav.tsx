"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Settings from "./Settings";
import { IHome, IExplore, ICatalog, IPlaybook, IHeart, ISearch } from "./icons";
import { useT, LangToggle } from "@/lib/i18n";
const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
const TABS = [["/","home",IHome],["/categories/","explore",IExplore],["/skills/","catalog",ICatalog],["/playbooks/","playbooks",IPlaybook],["/saved/","saved",IHeart]] as const;
export default function Nav() {
  const p = usePathname() || "/"; const { t } = useT();
  const is = (h: string) => h === "/" ? p === "/" : p.startsWith(h);
    const openPalette = () => window.dispatchEvent(new Event("andox:palette"));
  return (<>
    <header className="sticky top-0 z-40 glass">
      <div className="wrap h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight min-h-[44px] press"><Image src={`${BP}/brand/logo-512.png`} alt="Andox" width={34} height={25} priority className="h-6 w-auto"/><span className="text-[17px]">Andox</span><span className="mono hidden sm:inline">skills</span></Link>
        <nav className="hidden md:flex items-center gap-0.5 text-sm font-medium p-1 rounded-full border border-line bg-bg2/60">
          {TABS.slice(1).map(([h,k,I]) => { const on = is(h); return <Link key={h} className={"px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors " + (on ? "bg-ember-soft text-ember" : "text-muted hover:text-fg")} href={h}><I size={16} active={on}/>{t(k)}</Link>; })}
        </nav>
        <div className="flex items-center gap-1.5">
          <button onClick={openPalette} aria-label={t("search")} className="btn !min-h-10 !px-3 text-muted press"><ISearch size={18}/><span className="hidden sm:inline">{t("search")}</span><span className="kbd hidden sm:inline">⌘K</span></button>
          <span className="hidden md:flex items-center gap-1.5"><LangToggle/><ThemeToggle/></span><Settings/>
        </div>
      </div>
    </header>
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg2 border-t border-line" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="grid grid-cols-5 h-[58px]">
        {TABS.map(([h,k,I]) => { const on = is(h); return (<Link key={k} href={h} className={"relative flex flex-col items-center justify-center gap-[3px] text-[11px] font-medium min-h-[44px] press " + (on ? "text-ember" : "text-muted")}>{on && <span className="absolute top-0 h-[2px] w-8 rounded-b bg-ember"/>}<I size={24} active={on}/>{t(k)}</Link>); })}
      </div>
    </nav>
  </>);
}
