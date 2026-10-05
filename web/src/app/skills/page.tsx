import { Suspense } from "react";
import { getSkills, CATEGORIES } from "@/lib/data";
import SkillBrowser from "@/components/SkillBrowser";
export const metadata = { title: "Catalog — Andox Skills" };
export default function SkillsPage() {
  const skills = getSkills();
  return (<div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
    <div className="mono">catalog</div>
    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">{skills.length} skills, organised.</h1>
    <p className="mt-1.5 text-muted text-sm sm:text-base">Grouped by pack inside each category. Press <span className="kbd">/</span> to search.</p>
    <div className="mt-5 sm:mt-8"><Suspense><SkillBrowser skills={skills} categories={CATEGORIES}/></Suspense></div>
  </div>);
}
