import type { Metadata } from "next";
import { Manrope, JetBrains_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Link from "next/link";
import CommandPalette, { type Idx } from "@/components/CommandPalette";
import { LangProvider } from "@/lib/i18n";
import { getSkills, PLAYBOOKS, CATEGORIES, CAT_META } from "@/lib/data";
const geistSans = Manrope({ variable: "--font-geist-sans", subsets: ["latin"], weight: ["400","500","600","700","800"] });
const geistMono = JetBrains_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["400","500","600"] });
const deva = Noto_Sans_Devanagari({ variable: "--font-deva", subsets: ["devanagari"], weight: ["400","600","700"] });
export const metadata: Metadata = { title: "Andox Skills — give your AI agent superpowers", description: "A curated, organised library of 200+ agent skills with playbooks for building websites, secure auth and polished UI." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const index: Idx[] = [
    ...[["/", "Home"], ["/categories/", "Categories"], ["/skills/", "Catalog"], ["/playbooks/", "Playbooks"], ["/saved/", "Saved"], ["/search/", "Search"]].map(([id, name]) => ({ t: "page" as const, id, name, sub: "page" })),
    ...CATEGORIES.map(c => ({ t: "page" as const, id: `/categories/${CAT_META[c].slug}/`, name: c, sub: "category", cat: c })),
    ...PLAYBOOKS.map(p => ({ t: "playbook" as const, id: p.id, name: p.title, sub: p.tagline })),
    ...getSkills().map(s => ({ t: "skill" as const, id: s.slug, name: s.name, sub: `${s.pack} · ${s.category}`, cat: s.category })),
  ];
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);if(!t)matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(e){document.documentElement.classList.toggle('dark',e.matches)})}catch(e){}` }}/></head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${deva.variable} font-sans min-h-screen flex flex-col`}>
        <LangProvider>
          <Nav/>
          <main className="flex-1 md:pb-0">{children}</main>
          <footer className="border-t border-line mt-16"><div className="wrap py-10 text-sm text-muted flex flex-col sm:flex-row gap-4 justify-between">
            <div><b className="text-fg">Andox Skills</b> · curated agent skill library. Skills remain © their original authors (MIT/Apache); Andox adds curation, playbooks and tooling.</div>
            <div className="flex gap-4"><Link href="/skills/">Catalog</Link><Link href="/playbooks/">Playbooks</Link><a href="https://skills.sh" target="_blank" rel="noreferrer">skills.sh</a></div>
          </div></footer>
          <CommandPalette index={index}/>
        </LangProvider>
      </body>
    </html>
  );
}
