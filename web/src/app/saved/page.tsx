import { getSkills } from "@/lib/data";
import SavedList from "@/components/SavedList";
export const metadata = { title: "Saved — Andox Skills" };
export default function Saved() { const skills = getSkills().map(s => ({ slug: s.slug, name: s.name, pack: s.pack, category: s.category, description: s.description, readMin: s.readMin, path: s.path })); return <SavedList skills={skills}/>; }
