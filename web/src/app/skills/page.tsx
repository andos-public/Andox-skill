import { Suspense } from "react";
import { getSkills, CATEGORIES, CAT_META } from "@/lib/data";
import SkillBrowser from "@/components/SkillBrowser";
import { T } from "@/lib/i18n";
export const metadata = { title: "Catalog — Andox Skills" };
export default function SkillsPage() {
  const skills = getSkills(); const colors = Object.fromEntries(CATEGORIES.map(c => [c, CAT_META[c].color]));
  return (<div className="wrap py-5 sm:py-10">
    <div className="mono">catalog</div>
    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">{skills.length} <T k="catalogH"/></h1>
    <p className="mt-1.5 text-muted text-sm sm:text-base hidden sm:block"><T k="catalogP"/></p>
    <div className="mt-4 sm:mt-8"><Suspense><SkillBrowser skills={skills} categories={CATEGORIES} colors={colors}/></Suspense></div>
  </div>);
}
