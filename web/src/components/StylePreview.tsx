// Tiny CSS/SVG swatches for style skills so they can be scanned visually.
const P: Record<string, React.ReactNode> = {
  "taste--minimalist-skill": <div className="sw bg-white"><div className="absolute left-2 top-2 h-1 w-5 bg-black/80"/><div className="absolute left-2 top-4 h-0.5 w-8 bg-black/30"/><div className="absolute right-2 bottom-2 h-2 w-4 border border-black/60"/></div>,
  "taste--brutalist-skill": <div className="sw bg-[#f4f000]"><div className="absolute inset-1 border-2 border-black"/><div className="absolute left-2 top-2 h-2 w-6 bg-black"/><div className="absolute right-2 bottom-2 h-3 w-3 bg-black"/></div>,
  "taste--soft-skill": <div className="sw" style={{background:"linear-gradient(135deg,#fde2e4,#e2ece9)"}}><div className="absolute left-2 top-2 h-4 w-4 rounded-full bg-white/80 shadow"/><div className="absolute right-2 bottom-2 h-3 w-7 rounded-full bg-white/70"/></div>,
  "taste--redesign-skill": <div className="sw bg-[#111]"><div className="absolute left-1.5 top-1.5 h-2 w-3 bg-[#555]"/><div className="absolute right-1.5 top-1.5 h-2 w-3 bg-[#ff8a2a]"/><div className="absolute left-1.5 bottom-1.5 h-0.5 w-8 bg-[#444]"/></div>,
  "taste--taste-skill": <div className="sw bg-[#0d0d0d]"><div className="absolute left-2 top-2 h-1 w-6 bg-white"/><div className="absolute left-2 top-4 h-0.5 w-4 bg-white/40"/><div className="absolute right-2 bottom-2 h-2 w-2 bg-[#ff8a2a] rotate-45"/></div>,
  "taste--brandkit": <div className="sw bg-white flex"><div className="flex-1 bg-[#1e3a8a]"/><div className="flex-1 bg-[#f59e0b]"/><div className="flex-1 bg-[#111]"/></div>,
  "taste--stitch-skill": <div className="sw bg-[#f8fafc]"><div className="absolute inset-1 border border-dashed border-[#64748b]"/><div className="absolute left-2 top-2 h-1.5 w-1.5 bg-[#38bdf8]"/><div className="absolute right-2 bottom-2 h-1.5 w-1.5 bg-[#38bdf8]"/></div>,
  "taste--image-to-code-skill": <div className="sw bg-[#0f172a]"><div className="absolute left-1.5 top-1.5 h-3 w-4 bg-[#334155] rounded-sm"/><div className="absolute right-1.5 top-2 text-[7px] font-mono text-[#7dd3fc]">&lt;/&gt;</div><div className="absolute left-1.5 bottom-1.5 h-0.5 w-8 bg-[#475569]"/></div>,
  "ui-ux-pro-max": <div className="sw" style={{background:"linear-gradient(135deg,#6366f1,#ec4899)"}}><div className="absolute left-2 top-2 h-1 w-5 bg-white/90 rounded"/><div className="absolute left-2 bottom-2 h-2 w-4 bg-white/40 rounded"/></div>,
  "emilkowalski--animate": <div className="sw bg-[#111]"><div className="absolute left-2 top-2.5 h-2 w-2 rounded-full bg-[#ff8a2a] opacity-30"/><div className="absolute left-4 top-2.5 h-2 w-2 rounded-full bg-[#ff8a2a] opacity-60"/><div className="absolute left-6 top-2.5 h-2 w-2 rounded-full bg-[#ff8a2a]"/><div className="absolute left-2 bottom-1.5 h-0.5 w-8 bg-[#333]"/></div>,
};
export default function StylePreview({ slug }: { slug: string }) { return <>{P[slug] ?? null}</>; }
export const hasPreview = (slug: string) => slug in P;
