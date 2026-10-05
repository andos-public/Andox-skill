"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { Home, LayoutGrid, Library, Route, Search, Bookmark } from "lucide-react";
const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default function Nav() {
  const p = usePathname() || "/";
  const is = (h: string) => h === "/" ? p === "/" : p.startsWith(h);
  const links = [["/categories/","Categories"],["/skills/","Catalog"],["/playbooks/","Playbooks"],["/saved/","Saved"]];
  return (<>
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight"><Image src={`${BP}/brand/logo-512.png`} alt="Andox" width={34} height={25} priority className="h-6 w-auto"/><span>Andox</span><span className="mono hidden sm:inline">skills</span></Link>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {links.map(([h,l]) => <Link key={h} className={"px-3 py-2 rounded-lg hover:bg-bg2 " + (is(h) ? "text-fg bg-bg2" : "text-muted")} href={h}>{l}</Link>)}
          <a className="px-3 py-2 rounded-lg hover:bg-bg2 text-muted" href="https://github.com/andos-public/Andox-skill" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <div className="flex items-center gap-1.5">
          <Link href="/skills/?focus=1" aria-label="Search" className="btn !min-h-9 !px-3 text-muted"><Search size={15}/><span className="hidden sm:inline">Search</span><span className="kbd hidden sm:inline">/</span></Link>
          <ThemeToggle/>
        </div>
      </div>
    </header>
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line bg-bg/95 backdrop-blur safe-b">
      <div className="grid grid-cols-5 h-16">
        {[["/","Home",Home],["/categories/","Explore",LayoutGrid],["/skills/","Catalog",Library],["/playbooks/","Playbooks",Route],["/saved/","Saved",Bookmark]].map(([h,l,I]) => { const Icon = I as React.ElementType; const on = is(h as string); return (<Link key={l as string} href={h as string} className={"flex flex-col items-center justify-center gap-1 text-[10.5px] font-medium " + (on ? "text-ember" : "text-muted")}><span className={"grid place-items-center size-7 rounded-lg " + (on ? "bg-ember-soft" : "")}><Icon size={19} strokeWidth={on?2.2:1.8}/></span>{l as string}</Link>); })}
      </div>
    </nav>
  </>);
}
