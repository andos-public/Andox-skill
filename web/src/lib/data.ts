import fs from "fs";
import path from "path";
export type Skill = { slug:string; name:string; pack:string; path:string; category:string; description:string; author:string; sourceUrl:string; stars:string; words:number; readMin:number; files:string[] };
const DATA = path.join(process.cwd(), "data");
let cache: Skill[] | null = null;
export function getSkills(): Skill[] { if (!cache) cache = JSON.parse(fs.readFileSync(path.join(DATA, "skills.json"), "utf8")); return cache!; }
export function getSkill(slug: string) { return getSkills().find(s => s.slug === slug); }
export function getBody(slug: string) { try { return fs.readFileSync(path.join(DATA, "bodies", slug + ".md"), "utf8"); } catch { return ""; } }
export const CATEGORIES = ["Methodology","Design & UX","Security","React & Web","Documents","Research & Tools"] as const;
export const CAT_META: Record<string,{icon:string; color:string; blurb:string}> = {
  "Methodology": { icon: "🧠", color: "violet", blurb: "Plan → TDD → debug → review → ship. Superpowers, Addy Osmani, Matt Pocock, Ponytail." },
  "Design & UX": { icon: "🎨", color: "pink", blurb: "Taste, UI/UX Pro Max, Emil Kowalski animations, Front-End Checklist." },
  "Security": { icon: "🛡️", color: "red", blurb: "Trail of Bits audits, Strix pentest, OWASP-aligned secure coding." },
  "React & Web": { icon: "⚛️", color: "sky", blurb: "Vercel React best practices, Supabase, Playwright, deploy." },
  "Documents": { icon: "📄", color: "amber", blurb: "docx, pptx, xlsx, pdf, slides, humanizer." },
  "Research & Tools": { icon: "🔎", color: "emerald", blurb: "last30days research, archify diagrams, skill & MCP builders." },
};
export type Playbook = { id:string; title:string; tagline:string; goal:string; steps:{title:string; why:string; skills:string[]}[] };
export const PLAYBOOKS: Playbook[] = [
  { id:"build-a-website", title:"Build a production website", tagline:"Idea → shipped site, with taste and tests.", goal:"Go from a vague idea to a deployed, reviewed, mobile-ready website using a repeatable agent workflow.",
    steps:[
      {title:"Interrogate the idea", why:"Agents build the wrong thing fast. Grill the requirements first.", skills:["mattpocock--grill-me","superpowers--brainstorming","addyosmani--idea-refine"]},
      {title:"Write the plan", why:"A written plan the agent can execute step by step.", skills:["superpowers--writing-plans","mattpocock--to-spec","planning-with-files"]},
      {title:"Design before code", why:"Decide hierarchy, type, color and motion up front.", skills:["gstack--plan-design-review","ui-ux-pro-max","frontend-design","taste--taste-skill"]},
      {title:"Build with discipline", why:"Small steps, tests first, no over-engineering.", skills:["superpowers--test-driven-development","ponytail--ponytail","react-best-practices","karpathy-guidelines"]},
      {title:"Polish the interface", why:"Motion and edge cases separate good from great.", skills:["emilkowalski--animate","emilkowalski--break-ui","gstack--design-review"]},
      {title:"Audit & test", why:"Checklist + real browser on desktop and 390×844 mobile.", skills:["frontend-checklist--frontend-checklist-global","playwright-skill","webapp-testing"]},
      {title:"Review & ship", why:"Independent review, then deploy.", skills:["coderabbit--code-review","superpowers--verification-before-completion","deploy-to-vercel"]},
    ]},
  { id:"secure-auth-and-wallet", title:"Secure login, password reset & wallet", tagline:"Money and identity flows that survive an audit.", goal:"Implement auth, reset and wallet features with OWASP-aligned controls, static review and a dynamic pentest.",
    steps:[
      {title:"Threat-model first", why:"Know your entry points before writing code.", skills:["trailofbits--entry-point-analyzer","trailofbits--audit-context-building","api-security-best-practices"]},
      {title:"Secure coding", why:"Backend, frontend and database rules while you build.", skills:["backend-security-coder","frontend-security-coder","database-security","nextjs-supabase-auth"]},
      {title:"Static review", why:"Catch injection, authz and secret issues in code.", skills:["security-review","trailofbits--semgrep","trailofbits--differential-review"]},
      {title:"Dynamic pentest", why:"Attack the running app like an adversary would.", skills:["strix--web-app-penetration-testing","strix--owasp-top-10-testing","strix--api-security-testing"]},
      {title:"Fix & verify", why:"Close findings and prove they are closed.", skills:["strix--fix-security-vulnerabilities-with-strix","trailofbits--post-patch-validation","superpowers--verification-before-completion"]},
    ]},
  { id:"polish-ui", title:"Polish an existing UI", tagline:"From 'works' to 'feels premium' in one pass.", goal:"Audit and upgrade an existing interface: hierarchy, spacing, motion, accessibility and performance.",
    steps:[
      {title:"Visual audit", why:"Find inconsistency, slop and slow interactions.", skills:["gstack--design-review","taste--redesign-skill","ui-ux-pro-max"]},
      {title:"Motion pass", why:"Add animation only where it helps.", skills:["emilkowalski--find-animation-opportunities","emilkowalski--improve-animations","emilkowalski--review-animations"]},
      {title:"Accessibility & forms", why:"Keyboard, focus, contrast, validation.", skills:["frontend-checklist--keyboard-navigation","frontend-checklist--focus-management","frontend-checklist--color-contrast","frontend-checklist--form-validation"]},
      {title:"Performance", why:"Core Web Vitals that users feel.", skills:["frontend-checklist--largest-contentful-paint","frontend-checklist--cumulative-layout-shift","vercel-optimize"]},
      {title:"Break it", why:"Long text, empty states, errors, tiny screens.", skills:["emilkowalski--break-ui","playwright-skill"]},
    ]},
];

export type Outline = { level: number; text: string }[];
export function getOutline(body: string): Outline {
  const out: Outline = [];
  for (const line of body.split("\n")) { const m = /^(#{2,3})\s+(.+)/.exec(line); if (m) out.push({ level: m[1].length, text: m[2].replace(/[*`_]/g, "").trim() }); }
  return out.slice(0, 14);
}
export function whenToUse(desc: string): string | null {
  const m = /(use (?:this )?(?:skill )?when[^.]*\.|when (?:the user|you|a user)[^.]*\.|use for[^.]*\.)/i.exec(desc); return m ? m[1] : null;
}
export function difficulty(words: number): "Quick" | "Standard" | "Deep" { return words < 500 ? "Quick" : words < 1800 ? "Standard" : "Deep"; }
