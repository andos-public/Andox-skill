"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import Settings from "./Settings";
import { IHome, IExplore, IPlaybook, ISaved, ISearch, ICatalog } from "./icons";
import { useT, LangToggle } from "@/lib/i18n";
const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default function Nav() {
  const p = usePathname() || "/"; const { t } = useT();
  const is = (h: string) => h === "/" ? p === "/" : p.startsWith(h);
  const explore = is("/categories/") || is("/skills/");
  const Tab = ({ h, k, I, on }: { h: string; k: string; I: React.ComponentType<{size?:number; active?:boolean; className?:string}>; on: boolean }) => (
    <Link href={h} aria-current={on ? "page" : undefined} className={"flex flex-col items-center justify-end gap-1 pb-1 text-[10.5px] font-semibold tracking-wide min-h-[44px] press transition-colors " + (on ? "text-ember" : "text-muted")}><I size={24} active={on}/>{t(k)}</Link>);
  return (<>
    <header className="sticky top-0 z-40 glass">
      <div className="wrap h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight min-h-[44px]"><Image src={`${BP}/brand/logo-512.png`} alt="" width={34} height={25} priority className="h-7 w-auto"/><span className="text-[20px]">Andox</span></Link>
        <nav className="hidden md:flex items-center gap-0.5 text-sm font-medium">
          {([["/categories/","explore",IExplore,explore],["/skills/","catalog",ICatalog,is("/skills/")],["/playbooks/","playbooks",IPlaybook,is("/playbooks/")],["/saved/","saved",ISaved,is("/saved/")]] as const).map(([h,k,I,on]) => <Link key={h} className={"px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors " + (on ? "bg-ember-soft text-ember" : "text-muted hover:text-fg")} href={h}><I size={18} active={on}/>{t(k)}</Link>)}
        </nav>
        <div className="flex items-center gap-1">
          <Link href="/search/" aria-label={t("search")} className="hidden md:grid place-items-center size-11 rounded-full text-fg press"><ISearch size={24}/></Link>
          <span className="hidden md:flex items-center gap-1.5"><LangToggle/><ThemeToggle/></span><span className="md:hidden"><Settings/></span>
        </div>
      </div>
    </header>
    {/* Mobile tab bar: 4 tabs + raised search action in the centre */}
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg2 border-t border-line" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="relative grid grid-cols-5 h-[62px]">
        <Tab h="/" k="home" I={IHome} on={is("/")}/>
        <Tab h="/categories/" k="explore" I={IExplore} on={explore}/>
        <Link href="/search/" aria-label={t("search")} className={"relative flex flex-col items-center justify-end pb-1 text-[10.5px] font-semibold " + (is("/search/") ? "text-ember" : "text-muted")}>
          <span className={"absolute -top-5 grid place-items-center size-14 rounded-full text-black shadow-[0_8px_24px_-8px_var(--ember)] ring-4 ring-bg press transition-transform " + (is("/search/") ? "bg-ember scale-105" : "bg-ember")}><ISearch size={26} active/></span>
          <span className="mt-auto">{t("search")}</span>
        </Link>
        <Tab h="/playbooks/" k="playbooks" I={IPlaybook} on={is("/playbooks/")}/>
        <Tab h="/saved/" k="saved" I={ISaved} on={is("/saved/")}/>
      </div>
    </nav>
  </>);
}
