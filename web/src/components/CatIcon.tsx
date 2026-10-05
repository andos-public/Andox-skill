import { Brain, Palette, Shield, Atom, FileText, ScanSearch, Layers, type LucideProps } from "lucide-react";
const MAP: Record<string, React.ComponentType<LucideProps>> = { brain: Brain, palette: Palette, shield: Shield, atom: Atom, file: FileText, scan: ScanSearch, all: Layers };
const BY_CAT: Record<string, string> = { "Methodology": "brain", "Design & UX": "palette", "Security": "shield", "React & Web": "atom", "Documents": "file", "Research & Tools": "scan", "All": "all" };
export default function CatIcon({ cat, size = 16, className = "" }: { cat: string; size?: number; className?: string }) {
  const I = MAP[BY_CAT[cat] ?? "all"]; return <I size={size} className={className} strokeWidth={1.8} aria-hidden/>;
}
export function CatBadge({ cat, size = 36 }: { cat: string; size?: number }) {
  return <span className="grid place-items-center rounded-xl bg-ember-soft text-ember border border-ember/20 shrink-0" style={{ width: size, height: size }}><CatIcon cat={cat} size={Math.round(size*0.5)}/></span>;
}
