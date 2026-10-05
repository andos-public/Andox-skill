import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSkills, getSkill, getBody, getOutline, whenToUse, difficulty, CAT_META, PLAYBOOKS } from "@/lib/data";
import Copy from "@/components/Copy";
import Tabs from "@/components/Tabs";
import CatIcon from "@/components/CatIcon";
import Bookmark from "@/components/Bookmark";
import InstallBox from "@/components/InstallBox";
import StickyBar from "@/components/StickyBar";
import Disclosure from "@/components/Disclosure";
import { ExternalLink, FileText, ArrowLeft, Folder, Terminal, Bot, ClipboardList, Star } from "lucide-react";
export function generateStaticParams() { return getSkills().map(s => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const s = getSkill(slug); return { title: `${s?.name ?? "Skill"} — Andox Skills`, description: s?.description }; }
export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const s = getSkill(slug); if (!s) return <div className="p-10">Not found</div>;
  const body = getBody(slug); const outline = getOutline(body); const wtu = whenToUse(s.description); const diff = difficulty(s.words);
  const related = getSkills().filter(x => x.slug !== s.slug && x.pack === s.pack).slice(0, 5);
  const sameCat = getSkills().filter(x => x.slug !== s.slug && x.pack !== s.pack && x.category === s.category).slice(0, 4);
  const inPlaybooks = PLAYBOOKS.filter(p => p.steps.some(st => st.skills.includes(s.slug)));
  const install = `npx skills add andos-public/Andox-skill --skill ${s.name}`;
  const prompt = `Read ${s.path}/SKILL.md and follow it step by step for this task: <describe your task>. Before finishing, list what you verified.`;
  const raw = `https://raw.githubusercontent.com/andos-public/Andox-skill/main/${s.path}/SKILL.md`;
  const Spec = ({k,v}:{k:string;v:React.ReactNode}) => <div className="flex justify-between gap-3 py-2 border-b border-line last:border-0 text-sm"><span className="text-muted">{k}</span><span className="font-medium text-right">{v}</span></div>;
  const overview = (<div className="grid gap-5 lg:grid-cols-[1fr_300px]">
    <div className="space-y-5">
      <div className="panel p-4 sm:p-5"><div className="mono mb-2">When to use</div><p className="text-[15px] leading-relaxed">{wtu ?? s.description}</p></div>
      {outline.length > 0 && <Disclosure title="How this skill flows" meta={`${outline.filter(o=>o.level===2).length} steps`}>
        <ol className="flow space-y-2 pl-8">{outline.map((o,i) => <li key={i} className={"relative " + (o.level===3?"ml-4 text-sm text-muted":"font-medium")}><span className={"absolute -left-8 top-1 size-6 grid place-items-center rounded-md border border-line bg-bg2 text-[11px] font-mono " + (o.level===2?"text-ember border-ember/40":"")}>{o.level===2?String(outline.slice(0,i+1).filter(x=>x.level===2).length):"·"}</span>{o.text}</li>)}</ol>
        <p className="mono mt-4">auto-generated from SKILL.md headings</p></Disclosure>}
      <Disclosure title="Use it in 10 seconds" meta="3 ways">
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-line p-3"><Terminal size={16} className="text-ember"/><div className="font-semibold text-sm mt-2">Install</div><p className="text-xs text-muted mt-1">One command, any agent CLI.</p><div className="mt-2"><Copy text={install} label="Copy command" variant="!min-h-9 !px-2.5 text-xs w-full"/></div></div>
          <div className="rounded-xl border border-line p-3"><ClipboardList size={16} className="text-ember"/><div className="font-semibold text-sm mt-2">Paste</div><p className="text-xs text-muted mt-1">Drop the full SKILL.md into context.</p><div className="mt-2"><Copy text={body} label="Copy SKILL.md" variant="!min-h-9 !px-2.5 text-xs w-full"/></div></div>
          <div className="rounded-xl border border-line p-3"><Bot size={16} className="text-ember"/><div className="font-semibold text-sm mt-2">Prompt</div><p className="text-xs text-muted mt-1">Ready-made instruction for your agent.</p><div className="mt-2"><Copy text={prompt} label="Copy prompt" variant="!min-h-9 !px-2.5 text-xs w-full"/></div></div>
        </div></Disclosure>
    </div>
    <aside className="space-y-4">
      <Disclosure title="Spec" mobileOpen><div className="-mt-2"><Spec k="Category" v={<Link href={`/categories/${CAT_META[s.category]?.slug}/`} className="text-ember inline-flex items-center gap-1"><CatIcon cat={s.category} size={13}/>{s.category}</Link>}/><Spec k="Pack" v={s.pack}/><Spec k="Depth" v={<span className="tag">{diff}</span>}/><Spec k="Read time" v={`${s.readMin} min`}/><Spec k="Files" v={s.files.length}/><Spec k="GitHub stars" v={<span className="inline-flex items-center gap-1" title="Stars of the original source repo"><Star size={12} className="text-ember"/>{s.stars}</span>}/></div></Disclosure>
      <Disclosure title="Author & license"><div><div className="font-semibold">{s.author}</div><a href={s.sourceUrl} target="_blank" rel="noreferrer" className="btn w-full mt-3 !min-h-10 text-sm"><ExternalLink size={14}/> Original repo</a><p className="mt-2 text-xs text-muted">Licensed by the original author. Andox adds curation, playbooks and tooling.</p></div></Disclosure>
      <Disclosure title="Works with" desktopOpen={false}><div className="flex flex-wrap gap-1">{["Claude Code","Cursor","Codex","Gemini CLI","Copilot","Windsurf","Cline"].map(a => <span key={a} className="tag">{a}</span>)}</div></Disclosure>
      {inPlaybooks.length > 0 && <div className="panel p-4"><div className="mono mb-2">In playbooks</div><ul className="space-y-1 text-sm">{inPlaybooks.map(p => <li key={p.id}><Link className="text-ember font-semibold" href={`/playbooks/${p.id}/`}>{p.title}</Link></li>)}</ul></div>}
    </aside>
  </div>);
  const doc = (<div className="grid gap-6 lg:grid-cols-[1fr_240px]"><details className="sk panel p-4 sm:p-5 min-w-0" open><summary className="cursor-pointer flex items-center justify-between min-h-[44px]"><span className="font-bold">SKILL.md <span className="mono ml-2">{s.words} words</span></span><span className="tag">toggle</span></summary><div className="prose-skill min-w-0 mt-3 border-t border-line pt-3"><ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown></div></details>
    <aside className="hidden lg:block sticky top-32 self-start"><div className="mono mb-2">On this page</div><ul className="space-y-1 text-sm">{outline.filter(o=>o.level===2).map((o,i)=><li key={i} className="text-muted truncate">{o.text}</li>)}</ul><a href={raw} target="_blank" rel="noreferrer" className="btn w-full mt-4 !min-h-10 text-sm"><FileText size={14}/> Raw on GitHub</a></aside></div>);
  const files = (<div className="panel p-4 sm:p-5"><div className="mono mb-3">{s.files.length} files in {s.path}</div><ul className="font-mono text-sm space-y-1.5">{s.files.map(f => <li key={f} className="flex gap-2 items-center text-muted"><Folder size={13} className="text-ember"/> {f}</li>)}</ul><a href={`https://github.com/andos-public/Andox-skill/tree/main/${s.path}`} target="_blank" rel="noreferrer" className="btn mt-4 !min-h-10 text-sm"><ExternalLink size={14}/> Browse on GitHub</a></div>);
  const rel = (<div className="space-y-5">
    {related.length>0 && <div><div className="mono mb-2">More from {s.pack}</div><div className="grid gap-2 sm:grid-cols-2">{related.map(r => <Link key={r.slug} href={`/skills/${r.slug}/`} className="panel panel-hover p-3"><div className="font-semibold text-sm">{r.name}</div><div className="text-xs text-muted line-clamp-2 mt-1">{r.description}</div></Link>)}</div></div>}
    {sameCat.length>0 && <div><div className="mono mb-2">Also in {s.category}</div><div className="grid gap-2 sm:grid-cols-2">{sameCat.map(r => <Link key={r.slug} href={`/skills/${r.slug}/`} className="panel panel-hover p-3"><div className="font-semibold text-sm">{r.name} <span className="mono normal-case">· {r.pack}</span></div><div className="text-xs text-muted line-clamp-2 mt-1">{r.description}</div></Link>)}</div></div>}
  </div>);
  return (
    <div className="wrap py-5 sm:py-8">
      <Link href="/skills/" className="text-sm text-muted inline-flex items-center gap-1 hover:text-fg"><ArrowLeft size={14}/> Catalog</Link>
      <div className="mt-3 flex flex-wrap items-center gap-1.5"><Link href={`/categories/${CAT_META[s.category]?.slug}/`} className="tag" style={{color: CAT_META[s.category]?.color, borderColor: CAT_META[s.category]?.color+"66"}}><CatIcon cat={s.category} size={12}/> {s.category}</Link>{s.group && <span className="tag">{s.group}</span>}<span className="tag">{s.pack}</span><span className="tag">{diff}</span><span className="tag">{s.readMin} min</span></div>
      <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight break-words">{s.name}</h1>
      <p className="mt-2 text-muted text-[15px] sm:text-lg max-w-3xl">{s.description}</p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"><Copy text={install} label="Install command" variant="btn-ember"/><Copy text={body} label="Copy SKILL.md"/><span className="hidden sm:contents"><Copy text={prompt} label="Agent prompt"/><Bookmark slug={s.slug}/></span></div>
      <StickyBar prompt={prompt} install={install} slug={s.slug}/>
      <div className="mt-6"><Tabs tabs={[{id:"o",label:"Overview",content:overview},{id:"i",label:"Install",content:<div className="max-w-2xl"><InstallBox target={`--skill ${s.slug}`} npx={install}/></div>},{id:"d",label:"Full SKILL.md",content:doc},{id:"f",label:`Files (${s.files.length})`,content:files},{id:"r",label:"Related",content:rel}]}/></div>
    </div>
  );
}
