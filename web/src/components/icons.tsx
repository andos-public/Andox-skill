// Icon system per ui-ux-pro-max guidance: Phosphor Icons (MIT). regular = idle, fill = active, duotone = category tiles.
import { House, Compass, MagnifyingGlass, Path, BookmarkSimple, Heart, Brain, PaintBrush, ShieldCheck, Atom, FileText, Binoculars, Stack, CaretDown, Sparkle, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import type { IconProps, IconWeight } from "@phosphor-icons/react";
type P = { size?: number; className?: string; active?: boolean; style?: React.CSSProperties; weight?: IconWeight };
const mk = (I: React.ComponentType<IconProps>, activeWeight: IconWeight = "fill") => function Icon({ size = 22, className = "", active = false, style, weight }: P) { return <I size={size} weight={weight ?? (active ? activeWeight : "regular")} className={className} style={style} aria-hidden/>; };
export const IHome = mk(House); export const IExplore = mk(SquaresFour); export const ISearch = mk(MagnifyingGlass, "bold"); export const IPlaybook = mk(Path); export const ISaved = mk(BookmarkSimple); export const IHeart = mk(Heart); export const ICatalog = mk(Stack);
export const IBrain = mk(Brain, "duotone"); export const IPalette = mk(PaintBrush, "duotone"); export const IShield = mk(ShieldCheck, "duotone"); export const IAtom = mk(Atom, "duotone"); export const IDoc = mk(FileText, "duotone"); export const IScan = mk(Binoculars, "duotone"); export const ILayers = mk(Stack, "duotone");
export const IChevron = mk(CaretDown, "bold"); export const ISpark = mk(Sparkle);
