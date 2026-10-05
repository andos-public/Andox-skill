import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { Home, Library, Route, Search } from "lucide-react";
const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default function Nav() {
  return (<>
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight"><Image src={`${BP}/brand/logo-512.png`} alt="Andox" width={34} height={25} priority className="h-6 w-auto"/><span>Andox</span><span className="mono hidden sm:inline">skills</span></Link>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link className="px-3 py-2 rounded-lg hover:bg-bg2" href="/skills/">Catalog</Link>
          <Link className="px-3 py-2 rounded-lg hover:bg-bg2" href="/playbooks/">Playbooks</Link>
          <Link className="px-3 py-2 rounded-lg hover:bg-bg2" href="/#how">How it works</Link>
          <a className="px-3 py-2 rounded-lg hover:bg-bg2" href="https://github.com/andos-public/Andox-skill" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <div className="flex items-center gap-2"><Link href="/skills/" className="btn !min-h-9 !px-3 hidden sm:inline-flex text-muted"><Search size={14}/> Search <span className="kbd">/</span></Link><ThemeToggle/></div>
      </div>
    </header>
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line bg-bg/95 backdrop-blur safe-b">
      <div className="grid grid-cols-4 h-16">
        {[["/","Home",Home],["/skills/","Skills",Library],["/playbooks/","Playbooks",Route],["/skills/?focus=1","Search",Search]].map(([h,l,I]) => { const Icon = I as React.ElementType; return (<Link key={l as string} href={h as string} className="flex flex-col items-center justify-center gap-1 text-[11px] font-medium text-muted hover:text-fg"><Icon size={20}/>{l as string}</Link>); })}
      </div>
    </nav>
  </>);
}
