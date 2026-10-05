"use client";
import { useEffect, useState } from "react";
const LINES = ["> read .agents/SKILLS_MASTER_LIST.md", "> grill-me: asking 6 questions before coding…", "> writing-plans: 7 steps, 3 risks flagged", "> test-driven-development: red → green → refactor", "> design-review: 4 spacing issues fixed", "> strix: 0 critical, 1 medium (patched)", "> ship ✓"];
export default function Typer() {
  const [i, setI] = useState(0); const [t, setT] = useState("");
  useEffect(() => { const line = LINES[i % LINES.length]; let k = 0; const id = setInterval(() => { k++; setT(line.slice(0, k)); if (k >= line.length) { clearInterval(id); setTimeout(() => setI(x => x + 1), 900); } }, 22); return () => clearInterval(id); }, [i]);
  return (<div className="font-mono text-[13px] leading-6 text-left">
    {LINES.slice(Math.max(0, (i % LINES.length) - 3), i % LINES.length).map((l, k) => <div key={k} className="text-muted truncate">{l}</div>)}
    <div className="caret text-fg truncate">{t}</div>
  </div>);
}
