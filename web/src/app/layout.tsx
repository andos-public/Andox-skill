import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Link from "next/link";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
export const metadata: Metadata = { title: "Andox Skills — give your AI agent superpowers", description: "A curated, organised library of 200+ agent skills with playbooks for building websites, secure auth and polished UI." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}` }}/></head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen flex flex-col`}>
        <Nav/>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border mt-20"><div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted flex flex-col sm:flex-row gap-4 justify-between">
          <div><b className="text-fg">Andox Skills</b> · curated agent skill library. Skills remain © their original authors (MIT/Apache); Andox adds curation, playbooks and tooling.</div>
          <div className="flex gap-4"><Link href="/skills/">Catalog</Link><Link href="/playbooks/">Playbooks</Link><a href="https://skills.sh" target="_blank" rel="noreferrer">skills.sh</a></div>
        </div></footer>
      </body>
    </html>
  );
}
