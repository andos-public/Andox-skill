import { Suspense } from "react";
import { getSkills, CATEGORIES } from "@/lib/data";
import SkillBrowser from "@/components/SkillBrowser";
export const metadata = { title: "Catalog — Andox Skills" };
export default function SkillsPage() {
  const skills = getSkills();
  return (<div className="mx-auto max-w-7xl px-4 py-10">
    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Skill catalog</h1>
    <p className="mt-2 text-muted">{skills.length} curated skills from the most-starred agent skill packs. Search, filter, open, copy.</p>
    <div className="mt-8"><Suspense><SkillBrowser skills={skills} categories={CATEGORIES}/></Suspense></div>
  </div>);
}
