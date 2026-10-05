"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Home, LayoutGrid, Library, Route, Search, Heart } from "lucide-react";
import { useT, LangToggle } from "@/lib/i18n";
const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default function Nav() {
  const p = usePathname() || "/"; const { t } = useT();
  const is = (h: string) => h === "/" ? p === "/" : p.startsWith(h);
  const links = [["/categories/","categories"],["/skills/","catalog"],["/playbooks/","playbooks"],["/saved/","saved"]];
  const openPalette = () => window.dispatchEvent(new Event("andox:palette"));
  return (<>
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="wrap h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight min-h-[44px]"><Image src={`${BP}/brand/logo-512.png`} alt="Andox" width={34} height={25} priority className="h-6 w-auto"/><span>Andox</span><span className="mono hidden sm:inline">skills</span></Link>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {links.map(([h,k]) => <Link key={h} className={"px-3 py-2 rounded-lg hover:bg-bg2 " + (is(h) ? "text-fg bg-bg2" : "text-muted")} href={h}>{t(k)}</Link>)}
          <a className="px-3 py-2 rounded-lg hover:bg-bg2 text-muted" href="https://github.com/andos-public/Andox-skill" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <div className="flex items-center gap-1.5">
          <button onClick={openPalette} aria-label={t("search")} className="btn !min-h-10 !px-3 text-muted"><Search size={16}/><span className="hidden sm:inline">{t("search")}</span><span className="kbd hidden sm:inline">⌘K</span></button>
          <LangToggle/><ThemeToggle/>
        </div>
      </div>
    </header>
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line bg-bg/95 backdrop-blur" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="grid grid-cols-5 h-[60px]">
        {[["/","home",Home],["/categories/","explore",LayoutGrid],["/skills/","catalog",Library],["/playbooks/","playbooks",Route],["/saved/","saved",Heart]].map(([h,k,I]) => { const Icon = I as React.ElementType; const on = is(h as string); return (<Link key={k as string} href={h as string} className={"flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium min-h-[44px] " + (on ? "text-ember" : "text-muted")}><span className={"grid place-items-center h-7 w-10 rounded-lg " + (on ? "bg-ember-soft" : "")}><Icon size={20} strokeWidth={on?2.2:1.8}/></span>{t(k as string)}</Link>); })}
      </div>
    </nav>
  </>);
}
