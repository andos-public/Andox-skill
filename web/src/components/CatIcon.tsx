import { IBrain, IPalette, IShield, IAtom, IDoc, IScan, ILayers } from "./icons";
const BY_CAT: Record<string, React.ComponentType<{ size?: number; className?: string; active?: boolean; style?: React.CSSProperties }>> = { "Methodology": IBrain, "Design & UX": IPalette, "Security": IShield, "React & Web": IAtom, "Documents": IDoc, "Research & Tools": IScan, "All": ILayers };
const COLOR: Record<string, string> = { "Methodology": "#8b7cf6", "Design & UX": "#f472b6", "Security": "#f06565", "React & Web": "#38bdf8", "Documents": "#fbbf24", "Research & Tools": "#34d399", "All": "var(--ember)" };
export const catColor = (c: string) => COLOR[c] ?? "var(--ember)";
export default function CatIcon({ cat, size = 16, className = "", active = true, style }: { cat: string; size?: number; className?: string; active?: boolean; style?: React.CSSProperties }) {
  const I = BY_CAT[cat] ?? ILayers; return <I size={size} className={className} active={active} style={style}/>;
}
export function CatBadge({ cat, size = 36 }: { cat: string; size?: number }) {
  const c = catColor(cat);
  return <span className="grid place-items-center rounded-2xl shrink-0 border" style={{ width: size, height: size, color: c, background: `linear-gradient(145deg, color-mix(in oklab, ${c} 22%, transparent), color-mix(in oklab, ${c} 6%, transparent))`, borderColor: `color-mix(in oklab, ${c} 30%, transparent)`, boxShadow: `inset 0 1px 0 color-mix(in oklab, white 12%, transparent)` }}><CatIcon cat={cat} size={Math.round(size*0.52)}/></span>;
}
