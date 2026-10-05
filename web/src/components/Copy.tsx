"use client";
import { useState } from "react";
import { Check, Copy as CopyIcon } from "lucide-react";
export default function Copy({ text, label, variant = "" , icon = true }: { text: string; label: string; variant?: string; icon?: boolean }) {
  const [ok, setOk] = useState(false);
  async function go() { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1600); } catch {} }
  return <button onClick={go} className={"btn " + variant}>{icon && (ok ? <Check size={15}/> : <CopyIcon size={15}/>)}{ok ? "Copied" : label}</button>;
}
