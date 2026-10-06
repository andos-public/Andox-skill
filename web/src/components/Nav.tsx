"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Settings from "./Settings";
import { IHome, IExplore, IPlaybook, ISaved, ISearch, ICatalog } from "./icons";
import { useT, LangToggle } from "@/lib/i18n";
const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function Wordmark({ size = 20 }: { size?: number }) {
  return <span className="wordmark" style={{ fontSize: size }}>Andox<span className="wordmark-dot">.</span></span>;
}
export default function Nav() {
  const p = usePathname() || "/"; const { t } = useT();
  const is = (h: string) => h === "/" ? p === "/" : p.startsWith(h);
  const explore = is("/categories/") || is("/skills/");
  const tabs = [["/","home",IHome,is("/")],["/categories/","explore",IExplore,explore],["/search/","search",ISearch,is("/search/")],["/playbooks/","playbooks",IPlaybook,is("/playbooks/")],["/saved/","saved",ISaved,is("/saved/")]] as const;
  return (<>
    <header className="sticky top-0 z-40 glass">
      <div className="wrap h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 min-h-[44px] press"><Image src={`${BP}/brand/logo-512.png`} alt="" width={34} height={25} priority className="h-6 w-auto"/><Wordmark/></Link>
        <nav className="hidden md:flex items-center gap-0.5 text-sm font-medium">
          {([["/categories/","explore",IExplore,explore],["/skills/","catalog",ICatalog,is("/skills/")],["/playbooks/","playbooks",IPlaybook,is("/playbooks/")],["/saved/","saved",ISaved,is("/saved/")]] as const).map(([h,k,I,on]) => <Link key={h} className={"px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors " + (on ? "bg-ember-soft text-ember" : "text-muted hover:text-fg")} href={h}><I size={18} active={on}/>{t(k)}</Link>)}
        </nav>
        <div className="flex items-center gap-1">
          <Link href="/search/" aria-label={t("search")} className="hidden md:grid place-items-center size-11 rounded-full text-fg press"><ISearch size={24}/></Link>
          <span className="hidden md:flex items-center gap-1.5"><LangToggle/><ThemeToggle/></span><span className="md:hidden"><Settings/></span>
        </div>
      </div>
    </header>
    {/* Mobile tab bar — everything stays inside the bar, nothing overlaps content */}
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 tabbar" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="grid grid-cols-5 h-[64px]">
        {tabs.map(([h,k,I,on]) => (<Link key={k} href={h} aria-current={on ? "page" : undefined} className={"tab " + (on ? "on" : "") + (k === "search" ? " tab-search" : "")}>
          <span className="tab-ic"><I size={k === "search" ? 24 : 24} active={on} weight={k === "search" ? "bold" : undefined}/></span>
          <span className="tab-lb">{t(k)}</span>
        </Link>))}
      </div>
    </nav>
  </>);
}
