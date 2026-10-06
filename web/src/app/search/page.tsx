import { Suspense } from "react";
import { getSkills, PLAYBOOKS, CATEGORIES } from "@/lib/data";
import SearchPage from "@/components/SearchPage";
export const metadata = { title: "Search — Andox Skills" };
export default function Search() {
  const skills = getSkills().map(s => ({ slug: s.slug, name: s.name, pack: s.pack, category: s.category, group: s.group, description: s.description, readMin: s.readMin, words: s.words, author: s.author }));
  const playbooks = PLAYBOOKS.map(p => ({ id: p.id, title: p.title, tagline: p.tagline, n: p.steps.length }));
  return <Suspense><SearchPage skills={skills} playbooks={playbooks} categories={[...CATEGORIES]}/></Suspense>;
}
