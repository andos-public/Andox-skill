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
  const idx = Math.max(0, TABS.findIndex(([h]) => is(h)));
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
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 px-3 pointer-events-none" style={{ paddingBottom: "max(env(safe-area-inset-bottom), 10px)" }}>
      <div className="pointer-events-auto relative grid grid-cols-5 h-[64px] rounded-[22px] glass-strong shadow-[0_12px_40px_-12px_rgba(0,0,0,.6)]">
        <span className="absolute top-1.5 bottom-1.5 w-[calc(20%-6px)] left-[3px] rounded-2xl bg-ember-soft transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)]" style={{ transform: `translateX(calc(${idx} * (100% + 6px)))` }}/>
        {TABS.map(([h,k,I]) => { const on = is(h); return (<Link key={k} href={h} className={"relative z-10 flex flex-col items-center justify-center gap-0.5 text-[10.5px] font-semibold min-h-[44px] transition-colors " + (on ? "text-ember" : "text-muted")}><I size={23} active={on} className={on ? "tab-pop" : ""}/>{t(k)}</Link>); })}
      </div>
    </nav>
  </>);
}
