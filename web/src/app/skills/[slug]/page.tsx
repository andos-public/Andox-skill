import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSkills, getSkill, getBody, CAT_META, PLAYBOOKS } from "@/lib/data";
import Copy from "@/components/Copy";
import { ExternalLink, FileText, Clock, Folder, ArrowLeft } from "lucide-react";
export function generateStaticParams() { return getSkills().map(s => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const s = getSkill(slug); return { title: `${s?.name ?? "Skill"} — Andox Skills`, description: s?.description }; }
export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const s = getSkill(slug); if (!s) return <div className="p-10">Not found</div>;
  const body = getBody(slug);
  const related = getSkills().filter(x => x.slug !== s.slug && (x.pack === s.pack || x.category === s.category)).slice(0, 6);
  const inPlaybooks = PLAYBOOKS.filter(p => p.steps.some(st => st.skills.includes(s.slug)));
  const install = `npx skills add andos-public/Andox-skill --skill ${s.name}`;
  const prompt = `Read the skill at ${s.path}/SKILL.md and follow it step by step for this task: <describe your task>. Report what you did and what you verified.`;
  const raw = `https://raw.githubusercontent.com/andos-public/Andox-skill/main/${s.path}/SKILL.md`;
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid gap-8 lg:grid-cols-[1fr_320px]">
      <article>
        <Link href="/skills/" className="text-sm text-muted inline-flex items-center gap-1 hover:text-fg"><ArrowLeft size={14}/> Catalog</Link>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs"><span className="chip">{CAT_META[s.category]?.icon} {s.category}</span><span className="chip">{s.pack}</span><span className="text-muted inline-flex items-center gap-1"><Clock size={12}/> {s.readMin} min read</span></div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{s.name}</h1>
        <p className="mt-3 text-muted text-lg">{s.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Copy text={install} label="Copy install command" primary/>
          <Copy text={body} label="Copy SKILL.md"/>
          <Copy text={prompt} label="Copy agent prompt"/>
          <a className="btn" href={raw} target="_blank" rel="noreferrer"><FileText size={16}/> Raw file</a>
        </div>
        <div className="card mt-4 p-3 font-mono text-xs overflow-auto text-muted">{install}</div>
        <div className="prose-skill mt-8"><ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown></div>
      </article>
      <aside className="space-y-4 lg:sticky lg:top-20 self-start">
        <div className="card p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-muted">Source</div>
          <div className="mt-2 font-semibold">{s.author}</div>
          <div className="text-sm text-muted">⭐ {s.stars} on GitHub</div>
          <a href={s.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 btn w-full justify-center"><ExternalLink size={14}/> Original repo</a>
          <p className="mt-3 text-xs text-muted">Licensed by the original author. Andox adds curation, playbooks and tooling.</p>
        </div>
        <div className="card p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-muted">Works with</div>
          <div className="mt-2 flex flex-wrap gap-1.5">{["Claude Code","Cursor","Codex","Gemini CLI","Copilot","Windsurf","Cline"].map(a => <span key={a} className="chip">{a}</span>)}</div>
        </div>
        {s.files.length > 1 && <div className="card p-5"><div className="text-xs font-bold uppercase tracking-wider text-muted">Files ({s.files.length})</div><ul className="mt-2 text-xs font-mono text-muted space-y-1 max-h-48 overflow-auto">{s.files.map(f => <li key={f} className="flex gap-1.5 items-center"><Folder size={11}/> {f}</li>)}</ul></div>}
        {inPlaybooks.length > 0 && <div className="card p-5"><div className="text-xs font-bold uppercase tracking-wider text-muted">Used in playbooks</div><ul className="mt-2 space-y-1 text-sm">{inPlaybooks.map(p => <li key={p.id}><Link className="text-accent font-semibold" href={`/playbooks/${p.id}/`}>{p.title}</Link></li>)}</ul></div>}
        <div className="card p-5"><div className="text-xs font-bold uppercase tracking-wider text-muted">Related</div><ul className="mt-2 space-y-1.5 text-sm">{related.map(r => <li key={r.slug}><Link className="hover:text-accent" href={`/skills/${r.slug}/`}>{r.name}</Link> <span className="text-xs text-muted">· {r.pack}</span></li>)}</ul></div>
      </aside>
    </div>
  );
}
