import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Sparkles, Code2 as Github } from "lucide-react";
export default function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-border bg-bg/80">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-lg"><span className="grid place-items-center size-7 rounded-lg bg-gradient-to-br from-accent to-accent2 text-white"><Sparkles size={15}/></span>Andox <span className="text-muted font-semibold">Skills</span></Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link className="px-3 py-1.5 rounded-lg hover:bg-soft" href="/skills/">Catalog</Link>
          <Link className="px-3 py-1.5 rounded-lg hover:bg-soft" href="/playbooks/">Playbooks</Link>
          <Link className="px-3 py-1.5 rounded-lg hover:bg-soft hidden sm:block" href="/#how">How it works</Link>
          <a className="btn !p-2 ml-1" aria-label="GitHub" href="https://github.com/andos-public/Andos-skill-page" target="_blank" rel="noreferrer"><Github size={16}/></a>
          <ThemeToggle/>
        </nav>
      </div>
    </header>
  );
}
