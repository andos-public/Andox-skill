import Link from "next/link";
import { getSkills, CATEGORIES, CAT_META, PLAYBOOKS } from "@/lib/data";
import { ArrowRight as IconArrowRight, SquaresFour as IconLayoutGrid, Package as IconPackage, BookOpen as IconBook, Terminal as IconTerminal2, Flask as IconFlask, Ruler as IconRulerMeasure, ShieldWarning as IconShieldSearch, Play as IconPlayerPlay, Bug as IconBug, Sparkle as IconSparkles, ListChecks as IconListCheck } from "@phosphor-icons/react/dist/ssr";
import CatIcon, { catColor } from "@/components/CatIcon";
import Bookmark from "@/components/Bookmark";
import SearchTrigger from "@/components/SearchTrigger";
import Copy from "@/components/Copy";
import { T } from "@/lib/i18n";
const START: [string, string, React.ComponentType<{size?:number; weight?:"duotone"|"regular"|"fill"}>, string][] = [
  ["mattpocock--grill-me", "Challenge assumptions. Find blind spots.", IconTerminal2, "#8b7cf6"],
  ["superpowers--test-driven-development", "Write tests. Then build.", IconFlask, "#fbbf24"],
  ["gstack--design-review", "Critique and improve.", IconRulerMeasure, "#38bdf8"],
  ["trailofbits--differential-review", "Audit risky diffs like a pro.", IconShieldSearch, "#f06565"],
  ["superpowers--systematic-debugging", "Root cause, not guesswork.", IconBug, "#34d399"],
  ["emilkowalski--animate", "Motion that feels native.", IconSparkles, "#f472b6"],
  ["frontend-checklist--frontend-checklist-global", "Ship nothing half-done.", IconListCheck, "#8b7cf6"],
  ["ponytail--ponytail", "Honest, blunt code review.", IconPlayerPlay, "#fbbf24"],
];
export default function Home() {
  const skills = getSkills(); const packs = new Set(skills.map(s => s.pack)).size;
  const count = (c: string) => skills.filter(s => s.category === c).length;
  const Label = ({ n, k }: { n: string; k: string }) => <div className="mono !text-[12px] !tracking-[.12em] mb-3">{n} — <T k={k}/></div>;
  return (<div className="wrap pt-5 sm:pt-12 space-y-8 sm:space-y-16">
    {/* HERO */}
    <section className="relative">
      <div className="absolute inset-x-0 -top-24 h-72 pointer-events-none" style={{ background: "radial-gradient(60% 70% at 50% 0%, color-mix(in oklab, var(--ember) 18%, transparent), transparent 70%)" }}/>
      <h1 className="relative text-[2.35rem] leading-[1.08] sm:text-6xl lg:text-7xl"><T k="hero1"/><br/><em className="text-ember not-italic"><T k="hero2"/></em></h1>
      <div className="relative mt-5 sm:max-w-2xl"><SearchTrigger label={`Search ${skills.length} skills…`}/></div>
      <div className="relative mt-3 flex gap-2 flex-wrap">{[[IconLayoutGrid, `${skills.length}`, "skills"],[IconPackage, `${packs}`, "packs"],[IconBook, `${PLAYBOOKS.length}`, "playbooks"]].map(([I, n, l], i) => { const Icon = I as React.ElementType; return <span key={i} className="tag !py-1.5 !px-2.5 !text-[11px] !rounded-lg"><Icon size={15} className="text-ember"/> {n as string} <T k={l as string}/></span>; })}</div>
    </section>

    {/* 01 BROWSE */}
    <section>
      <Label n="01" k="browse"/>
      <div className="flex gap-3 overflow-x-auto hide-scroll -mx-4 px-4 pb-1 snap-x snap-mandatory lg:grid lg:grid-cols-6 lg:overflow-visible lg:mx-0 lg:px-0">
        {CATEGORIES.map(c => { const col = catColor(c); return (
          <Link key={c} href={`/categories/${CAT_META[c].slug}/`} className="panel panel-hover p-4 min-w-[168px] lg:min-w-0 snap-start press">
            <span className="relative block h-[96px] -mx-4 -mt-4 mb-1 rounded-t-[13px] overflow-hidden bg-[#121316]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/ill/${CAT_META[c].slug}.webp`} alt="" width={320} height={96} className="size-full object-cover object-center" loading="lazy"/><span className="absolute left-3 bottom-2 grid place-items-center size-8 rounded-lg" style={{ color: col, background: "rgba(11,11,13,.7)" }}><CatIcon cat={c} size={18}/></span></span>
            <div className="mt-4 text-[18px] font-bold leading-tight">{c}</div>
            <div className="mt-0.5 text-muted text-[14px]">{count(c)} <T k="skills"/> →</div>
          </Link>); })}
      </div>
    </section>

    {/* 02 PLAYBOOKS */}
    <section>
      <Label n="02" k="playbooks"/>
      <div className="space-y-3 lg:grid lg:grid-cols-3 lg:gap-3 lg:space-y-0">
        {PLAYBOOKS.map(p => (<Link key={p.id} href={`/playbooks/${p.id}/`} className="panel panel-hover p-4 flex items-center gap-3 press">
          <div className="min-w-0 flex-1"><ol className="flex items-center">{[1,2,3,4].map(n => <li key={n} className="flex items-center"><span className="size-7 grid place-items-center rounded-full bg-ember text-black text-[12px] font-bold">{n}</span>{n < 4 && <span className="w-3 h-px bg-line mx-0.5 relative after:content-[''] after:absolute after:right-0 after:-top-[3px] after:size-[7px] after:border-t after:border-r after:border-line after:rotate-45"/>}</li>)}<li className="ml-2 mono normal-case">{p.steps.length} <T k="steps"/></li></ol>
          <div className="font-bold text-[16px] leading-tight mt-3 truncate">{p.title}</div><div className="text-muted text-sm mt-0.5 truncate">{p.tagline}</div></div>
          <span className="size-9 grid place-items-center rounded-full border border-ember/40 text-ember shrink-0"><IconArrowRight size={20}/></span>
        </Link>))}
      </div>
    </section>

    {/* 03 START HERE */}
    <section>
      <Label n="03" k="s4h"/>
      <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
        {START.map(([slug, line, I, col]) => { const s = skills.find(x => x.slug === slug); if (!s) return null; return (
          <Link key={slug} href={`/skills/${slug}/`} className="panel panel-hover p-3.5 flex items-center gap-3.5 press">
            <span className="grid place-items-center size-12 rounded-xl shrink-0 border" style={{ color: col, background: `color-mix(in oklab, ${col} 14%, transparent)`, borderColor: `color-mix(in oklab, ${col} 28%, transparent)` }}><I size={24} weight="duotone"/></span>
            <div className="min-w-0 flex-1"><div className="font-bold text-[16px] leading-tight truncate">{s.name}</div><div className="text-muted text-[14px] mt-0.5 truncate">{line}</div></div>
            <Bookmark slug={slug} compact/>
          </Link>); })}
      </div>
    </section>

    {/* INSTALL */}
    <section className="panel p-5 sm:p-8 bg-[#0c0d10] text-[#e6e6e6] border-[#1f2126]">
      <div className="mono !text-[12px] !tracking-[.12em]">install everything</div>
      <pre className="mt-3 font-mono text-[13px] leading-relaxed overflow-x-auto whitespace-pre"><span className="text-ember">$</span> curl -sL andos-public.github.io/Andox-skill/install.py | python3 - --all</pre>
      <div className="mt-4 flex gap-2"><Copy text="curl -sL https://andos-public.github.io/Andox-skill/install.py | python3 - --all" label="Copy command" variant="btn-ember flex-1 sm:flex-none"/><Link href="/skills/" className="btn flex-1 sm:flex-none !bg-transparent !text-[#e6e6e6] !border-[#2a2d33]">Browse first</Link></div>
    </section>
  </div>);
}
