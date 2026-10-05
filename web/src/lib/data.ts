import fs from "fs";
import path from "path";
export type Skill = { slug:string; name:string; pack:string; path:string; category:string; group:string; description:string; author:string; sourceUrl:string; stars:string; words:number; readMin:number; files:string[] };
const DATA = path.join(process.cwd(), "data");
let cache: Skill[] | null = null;
export function getSkills(): Skill[] { if (!cache) cache = JSON.parse(fs.readFileSync(path.join(DATA, "skills.json"), "utf8")); return cache!; }
export function getSkill(slug: string) { return getSkills().find(s => s.slug === slug); }
export function getBody(slug: string) { try { return fs.readFileSync(path.join(DATA, "bodies", slug + ".md"), "utf8"); } catch { return ""; } }
export const CATEGORIES = ["Methodology","Design & UX","Security","React & Web","Documents","Research & Tools"] as const;
export type CatMeta = { slug:string; icon:string; color:string; blurb:string; long:string; forWho:string; outcomes:string[]; start:string[] };
export const CAT_META: Record<string,CatMeta> = {
  "Methodology": { slug:"methodology", color:"#8b7cf6", icon:"brain", blurb:"Plan → TDD → debug → review → ship. Superpowers, Addy Osmani, Matt Pocock, Ponytail.",
    long:"Methodology skills change how your agent thinks before it writes code: interrogating requirements, writing plans, test-driven loops, systematic debugging and honest self-review. They are the backbone of every playbook and the first thing worth installing.",
    forWho:"Anyone running an agent on a real codebase — solo builders, teams, students.", outcomes:["Fewer wrong-thing-built-fast moments","Smaller, reviewable diffs","Repeatable plan → build → verify loop"], start:["mattpocock--grill-me","superpowers--brainstorming","superpowers--test-driven-development","ponytail--ponytail"] },
  "Design & UX": { slug:"design", color:"#f472b6", icon:"palette", blurb:"Taste, UI/UX Pro Max, Emil Kowalski animations, Front-End Checklist.",
    long:"Design skills give the agent taste: typography and spacing systems, motion that feels native, accessibility and the long tail of front-end polish that separates a demo from a product. Use them when building UI or reviewing one.",
    forWho:"Builders shipping web or mobile UI who want it to feel premium without a designer on call.", outcomes:["Consistent spacing, type and colour decisions","Animations with proper easing and duration","Pre-launch front-end checklist passes"], start:["taste--taste-skill","ui-ux-pro-max","emilkowalski--animate","gstack--design-review"] },
  "Security": { slug:"security", color:"#f06565", icon:"shield", blurb:"Trail of Bits audits, Strix pentest, OWASP-aligned secure coding.",
    long:"Security skills bring audit-grade habits to everyday coding: differential review of risky diffs, OWASP Top-10 testing, secure defaults for auth, APIs and databases, and offensive checks before attackers run them for you.",
    forWho:"Anyone handling logins, payments, wallets, user data or public APIs.", outcomes:["Auth and session flows reviewed against known attack classes","Input, injection and XSS checks on every surface","Pentest-style verification before release"], start:["trailofbits--differential-review","strix--owasp-top-10-testing","security-review","api-security-best-practices"] },
  "React & Web": { slug:"react", color:"#38bdf8", icon:"atom", blurb:"Vercel React best practices, Supabase, Playwright, deploy.",
    long:"Framework-specific knowledge for modern web apps: React composition and performance patterns from Vercel, Supabase/Postgres practices, browser testing with Playwright and deployment hygiene.",
    forWho:"React / Next.js developers and anyone shipping to Vercel or Supabase.", outcomes:["Idiomatic component composition","Fewer re-render and data-fetching mistakes","E2E tests that actually run in CI"], start:["react-best-practices","composition-patterns","playwright-skill","deploy-to-vercel"] },
  "Documents": { slug:"documents", color:"#fbbf24", icon:"file", blurb:"docx, pptx, xlsx, pdf, slides, humanizer.",
    long:"Let the agent produce real deliverables — Word, PowerPoint, Excel and PDF — with correct structure, plus writing skills that make generated prose read like a human wrote it.",
    forWho:"Consultants, founders, students and teams who ship documents, not just code.", outcomes:["Properly formatted Office files","Slide decks from an outline","Natural, un-robotic writing"], start:["docx","pptx","xlsx","humanizer"] },
  "Research & Tools": { slug:"research", color:"#34d399", icon:"scan", blurb:"last30days research, archify diagrams, skill & MCP builders.",
    long:"Meta-skills: researching what changed recently, drawing architecture diagrams from a codebase, and building new skills or MCP servers so the library grows with your needs.",
    forWho:"Power users who extend their agent rather than only consume it.", outcomes:["Up-to-date research summaries","Architecture diagrams on demand","Your own skills and MCP servers"], start:["last30days","archify","skill-creator","mcp-builder"] },
};
export function catBySlug(slug: string) { return Object.entries(CAT_META).find(([,m]) => m.slug === slug)?.[0]; }
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
      {title:"Visual audit", why:"Find inconsistency, slop and slow interactions.", skills:["gstack--design-review","taste--taste-skill","ui-ux-pro-max"]},
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

export const GROUPS = ["Plan","Build / TDD","Debug","Review","Ship","Agent workflow"] as const;
export const GROUP_BLURB: Record<string,string> = { "Plan":"Interrogate the idea, write specs and plans before code.", "Build / TDD":"Implement in small verified steps.", "Debug":"Find root causes systematically.", "Review":"Audit, review and verify before claiming done.", "Ship":"Git hygiene, PRs, CI, launch and handoff.", "Agent workflow":"How to run, prompt and extend agents themselves." };
