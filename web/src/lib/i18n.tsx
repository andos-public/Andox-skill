"use client";
import { createContext, useContext, useEffect, useState } from "react";
export type Lang = "en" | "hi";
const D: Record<string, [string, string]> = {
  home:["Home","होम"], explore:["Explore","खोजें"], catalog:["Catalog","कैटलॉग"], playbooks:["Playbooks","प्लेबुक"], saved:["Saved","सेव्ड"], categories:["Categories","श्रेणियाँ"], search:["Search","खोज"],
  hero1:["The skill workbench","आपके AI एजेंट का"], hero2:["for your AI agent.","स्किल वर्कबेंच।"],
  heroP:["Andox curates the most-used open-source agent skills into one organised, searchable library — with playbooks that tell your agent which skill to load, when, and why.","Andox सबसे ज़्यादा इस्तेमाल होने वाली open-source एजेंट स्किल्स को एक व्यवस्थित, खोजने योग्य लाइब्रेरी में लाता है — प्लेबुक के साथ जो बताती हैं कौन-सी स्किल कब और क्यों लोड करनी है।"],
  openCatalog:["Open the catalog","कैटलॉग खोलें"], startPlaybook:["Start with a playbook","प्लेबुक से शुरू करें"],
  s1:["01 — browse","01 — ब्राउज़"], s1h:["Six shelves, every skill has a home","छह शेल्फ़, हर स्किल का अपना ठिकाना"], allCats:["All categories →","सभी श्रेणियाँ →"],
  s2:["02 — how it works","02 — कैसे काम करता है"], s2h:["From “I have an idea” to “it shipped”","“एक आइडिया है” से “शिप हो गया” तक"],
  s3:["03 — playbooks","03 — प्लेबुक"], s3h:["Pick a path","रास्ता चुनें"], allPb:["All playbooks →","सभी प्लेबुक →"],
  s4:["04 — most useful first","04 — सबसे उपयोगी पहले"], s4h:["START HERE","यहाँ से शुरू करें"],
  browse:["BROWSE","ब्राउज़"], packs:["packs","पैक"],
  skills:["skills","स्किल्स"], steps:["steps","स्टेप"], copy:["Copy","कॉपी"], copied:["Copied","कॉपी हुआ"],
  copyPrompt:["Copy prompt","प्रॉम्प्ट कॉपी करें"], install:["Install","इंस्टॉल"], overview:["Overview","सारांश"], files:["Files","फ़ाइलें"], related:["Related","संबंधित"], fullDoc:["Full SKILL.md","पूरा SKILL.md"],
  whenToUse:["When to use","कब इस्तेमाल करें"], save:["Save","सेव"], savedBtn:["Saved","सेव्ड"], searchSkills:["Search skills…","स्किल्स खोजें…"], filters:["Filters","फ़िल्टर"], category:["Category","श्रेणी"], source:["Source","स्रोत"], depth:["Depth","गहराई"], pack:["Pack","पैक"],
  nothing:["Nothing matches. Try “review”, “design” or “security”.","कुछ नहीं मिला। “review”, “design” या “security” आज़माएँ।"], show:["Show","दिखाएँ"], clear:["Clear filters","फ़िल्टर हटाएँ"],
  cmdHint:["Search skills, playbooks, pages…","स्किल, प्लेबुक, पेज खोजें…"], stars:["GitHub stars","GitHub स्टार"], readTime:["min read","मिनट"],
  catalogH:["skills, organised.","स्किल्स, व्यवस्थित।"], catalogP:["Grouped by pack inside each category. Press / to search.","हर श्रेणी में पैक के अनुसार। खोजने के लिए / दबाएँ।"],
};
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({ lang: "en", setLang: () => {}, t: k => D[k]?.[0] ?? k });
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setL] = useState<Lang>("en");
  useEffect(() => { const l = localStorage.getItem("andox:lang"); if (l === "hi") setL("hi"); }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setL(l); localStorage.setItem("andox:lang", l); };
  const t = (k: string) => D[k]?.[lang === "hi" ? 1 : 0] ?? k;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}
export const useT = () => useContext(Ctx);
export function T({ k }: { k: string }) { const { t } = useT(); return <>{t(k)}</>; }
export function LangToggle() { const { lang, setLang } = useT(); return <button onClick={() => setLang(lang === "en" ? "hi" : "en")} aria-label="Language" className="btn !min-h-10 !px-2.5 text-xs font-mono">{lang === "en" ? "हिं" : "EN"}</button>; }
