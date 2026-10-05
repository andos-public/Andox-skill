"use client";
import { ISearch, ISpark } from "./icons";
export default function SearchTrigger({ label }: { label: string }) {
  return <button onClick={() => window.dispatchEvent(new Event("andox:palette"))} className="panel w-full h-[54px] px-4 flex items-center gap-3 text-left press"><ISearch size={22} className="text-ember"/><span className="flex-1 text-muted text-[16px]">{label}</span><ISpark size={20} className="text-ember"/></button>;
}
