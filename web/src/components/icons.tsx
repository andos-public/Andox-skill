// Icon set: Phosphor Icons (MIT, https://phosphoricons.com). Active = filled weight, inactive = regular.
import { House, SquaresFour, Books, Path, Heart, MagnifyingGlass, Brain, PaintBrush, ShieldCheck, Atom, FileText, Binoculars, Stack, CaretDown, Sparkle } from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
type P = { size?: number; className?: string; active?: boolean; style?: React.CSSProperties };
const mk = (I: React.ComponentType<IconProps>) => ({ size = 22, className = "", active = false, style }: P) => <I size={size} weight={active ? "fill" : "regular"} className={className} style={style} aria-hidden/>;
export const IHome = mk(House); export const IExplore = mk(SquaresFour); export const ICatalog = mk(Books); export const IPlaybook = mk(Path); export const IHeart = mk(Heart); export const ISearch = mk(MagnifyingGlass);
export const IBrain = mk(Brain); export const IPalette = mk(PaintBrush); export const IShield = mk(ShieldCheck); export const IAtom = mk(Atom); export const IDoc = mk(FileText); export const IScan = mk(Binoculars); export const ILayers = mk(Stack);
export const IChevron = ({ size = 18, className = "", style }: P) => <CaretDown size={size} weight="bold" className={className} style={style} aria-hidden/>;
export const ISpark = ({ size = 18, className = "", style }: P) => <Sparkle size={size} weight="fill" className={className} style={style} aria-hidden/>;
