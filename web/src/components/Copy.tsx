"use client";
import { useState } from "react";
import { Check, Copy as CopyIcon } from "lucide-react";
export default function Copy({ text, label, primary }: { text: string; label: string; primary?: boolean }) {
  const [ok, setOk] = useState(false);
  async function go() { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1600); } catch {} }
  return <button onClick={go} className={"btn " + (primary ? "btn-primary" : "")}>{ok ? <Check size={16}/> : <CopyIcon size={16}/>}{ok ? "Copied!" : label}</button>;
}
