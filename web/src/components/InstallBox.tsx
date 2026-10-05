"use client";
import { useState } from "react";
import Copy from "./Copy";
const AGENTS = [["agents","Universal (.agents)"],["claude","Claude Code"],["cursor","Cursor"],["codex","Codex"],["gemini","Gemini CLI"],["copilot","Copilot"],["windsurf","Windsurf"],["cline","Cline"]];
const SITE = "https://andos-public.github.io/Andox-skill";
export default function InstallBox({ target, npx }: { target: string; npx?: string }) {
  const [agent, setAgent] = useState("agents"); const [mode, setMode] = useState<"py"|"npx"|"manual">("py");
  const py = `curl -sL ${SITE}/install.py | python3 - ${target}${agent!=="agents"?` --agent ${agent}`:""}`;
  const pyWin = `python -c "import urllib.request as u;exec(u.urlopen('${SITE}/install.py').read())" ${target}${agent!=="agents"?` --agent ${agent}`:""}`;
  return (<div className="panel p-4 sm:p-5">
    <div className="flex items-center justify-between gap-3 flex-wrap"><div className="mono">Install</div>
      <div className="flex gap-1 p-0.5 rounded-lg border border-line bg-bg">{(["py","npx","manual"] as const).map(m => <button key={m} onClick={() => setMode(m)} className={"px-2.5 py-1 rounded-md text-xs font-semibold " + (mode===m ? "bg-bg2 text-fg border border-line" : "text-muted")}>{m==="py"?"Python":m==="npx"?"npx":"Manual"}</button>)}</div></div>
    {mode==="py" && <>
      <div className="mt-3 flex gap-1.5 overflow-x-auto hide-scroll -mx-4 px-4 sm:mx-0 sm:px-0">{AGENTS.map(([k,l]) => <button key={k} onClick={() => setAgent(k)} className={"tag !py-1.5 whitespace-nowrap " + (agent===k?"tag-ember":"")}>{l}</button>)}</div>
      <pre className="mt-3 rounded-xl bg-[#0c0d10] text-[#e6e6e6] border border-[#1f2126] p-3 text-[12px] leading-relaxed overflow-x-auto"><span className="text-ember">$</span> {py}</pre>
      <div className="mt-2 flex gap-2 flex-wrap"><Copy text={py} label="Copy (mac / Linux)" variant="btn-ember !min-h-10 text-xs"/><Copy text={pyWin} label="Copy (Windows)" variant="!min-h-10 text-xs"/></div>
      <p className="mt-2 text-xs text-muted">Zero dependencies, Python 3.8+. Downloads the skill files straight from the Andox repo into your agent’s skills folder. Add <code className="font-mono">--list</code> to preview, <code className="font-mono">--force</code> to overwrite.</p>
    </>}
    {mode==="npx" && <>
      <pre className="mt-3 rounded-xl bg-[#0c0d10] text-[#e6e6e6] border border-[#1f2126] p-3 text-[12px] leading-relaxed overflow-x-auto"><span className="text-ember">$</span> {npx ?? "npx skills add andos-public/Andox-skill"}</pre>
      <div className="mt-2"><Copy text={npx ?? "npx skills add andos-public/Andox-skill"} label="Copy command" variant="btn-ember !min-h-10 text-xs"/></div>
      <p className="mt-2 text-xs text-muted">Uses the skills.sh CLI (Node 18+). Interactive picker for multiple skills.</p>
    </>}
    {mode==="manual" && <ol className="mt-3 text-sm space-y-1.5 list-decimal pl-5 text-muted"><li>Open the skill’s <b className="text-fg">Full SKILL.md</b> tab and copy it.</li><li>Create <code className="font-mono text-fg">.agents/skills/&lt;name&gt;/SKILL.md</code> in your project (or your agent’s skills folder).</li><li>Paste, save. Tell the agent: <i>“Read that file and follow it.”</i></li></ol>}
  </div>);
}
