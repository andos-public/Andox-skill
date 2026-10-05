# AGENT SKILLS MASTER LIST — Developer / Agent के लिए ज़रूरी स्किल्स

> **किसी भी एजेंट को काम देते समय यह फ़ाइल पढ़ने को कहें:** `/home/user/.agents/SKILLS_MASTER_LIST.md`
> सभी स्किल्स `/home/user/.agents/skills/<name>/SKILL.md` में हैं। रेफ़रेंस डॉक्स `/home/user/.agents/references/` में।
> कुल: **124 स्किल्स** (`find .agents/skills -name SKILL.md | wc -l`)

---

## भाग 1 — रिसर्च: एक डेवलपर/एजेंट को कौन-कौन सी स्किल आनी चाहिए

(स्रोत: anthropics/skills, obra/superpowers, addyosmani/agent-skills, mattpocock/skills, vercel-labs, nextlevelbuilder, trailofbits, OWASP — 2026 के सबसे ज़्यादा इस्तेमाल होने वाले स्किल रेपो)

| # | क्षमता (Capability) | क्यों ज़रूरी | इंस्टॉल्ड स्किल |
|---|---|---|---|
| 1 | **Brainstorm → Spec → Plan** | बिना सोचे कोड लिखना सबसे बड़ी ग़लती | `superpowers/brainstorming`, `superpowers/writing-plans`, `addyosmani/spec-driven-development`, `addyosmani/planning-and-task-breakdown`, `mattpocock/to-spec`, `mattpocock/to-tickets`, `mattpocock/grill-me`, `planning-with-files` |
| 2 | **Domain / Codebase Design** | सही आर्किटेक्चर, मॉड्यूल सीमाएँ | `mattpocock/codebase-design`, `mattpocock/domain-modeling`, `addyosmani/api-and-interface-design` |
| 3 | **Coding Discipline (TDD, छोटे कदम)** | कम बग, वेरिफ़ाई करने योग्य काम | `superpowers/test-driven-development`, `addyosmani/test-driven-development`, `addyosmani/incremental-implementation`, `karpathy-guidelines`, `addyosmani/constraint-driven-development` |
| 4 | **Debugging** | अंदाज़े से नहीं, सिस्टमैटिक तरीक़े से | `superpowers/systematic-debugging`, `addyosmani/debugging-and-error-recovery`, `mattpocock/diagnosing-bugs`, `mattpocock/triage` |
| 5 | **Code Review & Quality** | मर्ज से पहले बहु-आयामी समीक्षा | `addyosmani/code-review-and-quality`, `superpowers/requesting-code-review`, `superpowers/receiving-code-review`, `addyosmani/code-simplification`, `mattpocock/pr`, `coderabbit/code-review`, `coderabbit/autofix` (CodeRabbit CLI से असली AI रिव्यू) |
| 6 | **Verification before "Done"** | एजेंट झूठा "हो गया" न बोले | `superpowers/verification-before-completion`, `superpowers/finishing-a-development-branch` |
| 7 | **Git Workflow** | ब्रांच, worktree, commit अनुशासन | `superpowers/using-git-worktrees`, `addyosmani/git-workflow-and-versioning`, `mattpocock/git-guardrails-claude-code`, `mattpocock/setup-pre-commit` |
| 8 | **Frontend / UI-UX** | जेनरिक AI-लुक से बचना, डिज़ाइन सिस्टम | `frontend-design`, `ui-ux-pro-max`, `design-system`, `ui-styling`, `taste/*`, `addyosmani/frontend-ui-engineering`, `web-design-guidelines` |
| 9 | **React / Next.js** | परफ़ॉर्मेंस, कम्पोज़िशन, ट्रांज़िशन | `react-best-practices`, `composition-patterns`, `react-view-transitions`, `vercel-optimize` |
| 10 | **Mobile** | React Native ऐप | `react-native-skills` |
| 11 | **Backend / Database** | Supabase, Postgres, DB सुरक्षा | `supabase`, `supabase-postgres-best-practices`, `database-security`, `nextjs-supabase-auth` |
| 12 | **Security** | OWASP Top 10, auth, API | `security-review`, `api-security-best-practices`, `addyosmani/security-and-hardening`, `backend-security-coder`, `frontend-security-coder`, `web-security-testing`, `frontend-mobile-security-xss-scan`, `trailofbits/*`, **`strix/*` (9 — AI pentesting: असली exploit PoC के साथ)** |
| 13 | **Testing (Browser E2E)** | असली ब्राउज़र, मोबाइल viewport | `playwright-skill`, `webapp-testing`, `addyosmani/browser-testing-with-devtools` |
| 14 | **Performance & Observability** | तेज़ ऐप, लॉग/मेट्रिक | `addyosmani/performance-optimization`, `addyosmani/observability-and-instrumentation` |
| 15 | **CI/CD & Deploy** | पाइपलाइन, Vercel डिप्लॉय | `addyosmani/ci-cd-and-automation`, `deploy-to-vercel`, `addyosmani/shipping-and-launch` |
| 16 | **Documentation / ADR** | निर्णयों का रिकॉर्ड | `addyosmani/documentation-and-adrs`, `mattpocock/writing-for-agents`, `mattpocock/handoff` |
| 17 | **Migration / Deprecation** | पुराने कोड को सुरक्षित बदलना | `addyosmani/deprecation-and-migration` |
| 18 | **Multi-agent / Context** | बड़े काम को बाँटना, कॉन्टेक्स्ट बचाना | `superpowers/dispatching-parallel-agents`, `superpowers/subagent-driven-development`, `addyosmani/context-engineering` |
| 19 | **Office Docs (DOCX/PDF/PPTX/XLSX)** | रिपोर्ट, प्रेज़ेंटेशन, शीट बनाना | `docx`, `pdf`, `pptx`, `xlsx`, `slides` |
| 20 | **MCP / Tooling** | नया MCP सर्वर या स्किल बनाना | `mcp-builder`, `skill-creator`, `superpowers/writing-skills` |
| 21 | **Brand & Visual Assets** | लोगो, बैनर, थीम | `brand`, `taste/brandkit`, `banner-design`, `canvas-design`, `theme-factory` |

---

## भाग 2 — किसी भी प्रोजेक्ट के लिए मानक वर्कफ़्लो (एजेंट इसी क्रम में चले)

1. `superpowers/using-superpowers` + `addyosmani/using-agent-skills` पढ़ो (स्किल कैसे चुनें)
2. **समझो**: `superpowers/brainstorming` → `mattpocock/grill-me` (अस्पष्टता निकालो)
3. **योजना**: `planning-with-files` (task_plan.md, findings.md, progress.md) → `superpowers/writing-plans`
4. **डिज़ाइन**: `frontend-design` + `ui-ux-pro-max` search script + `taste/taste-skill` + `references/designmd/` (तैयार DESIGN.md खोजो: `npx designmd search "<domain>"`)
5. **बनाओ**: `superpowers/test-driven-development`, `karpathy-guidelines`, `react-best-practices`, `supabase`
6. **सुरक्षा**: (a) static: `security-review` + `api-security-best-practices` + `references/owasp-*` + `references/nist/sp800-63b.txt` → (b) dynamic pentest: `strix/find-security-vulnerabilities-in-code` (कोड), `strix/web-app-penetration-testing` / `strix/api-security-testing` (चलता ऐप), `strix/owasp-top-10-testing` → findings पर `strix/fix-security-vulnerabilities-with-strix` → CI में `strix/ci-security-scanning-with-strix`
7. **टेस्ट**: `playwright-skill` (desktop + 390×844 mobile), `web-design-guidelines` ऑडिट
8. **समीक्षा**: `coderabbit/code-review` (CLI: `coderabbit review`) → `addyosmani/code-review-and-quality` → `superpowers/verification-before-completion`
9. **शिप**: `addyosmani/shipping-and-launch`, `deploy-to-vercel`, `mattpocock/handoff`

---

## भाग 3 — रेफ़रेंस डॉक्स (`.agents/references/`)

| फ़ोल्डर | सामग्री |
|---|---|
| `owasp-top10-2025/` | OWASP Top 10 (2025) A01–A10 |
| `owasp-asvs-5.0/` | ASVS 5.0 — V6 Auth, V7 Session, V8 Authz, V9 Tokens, V10 OAuth… |
| `owasp-cheatsheets/` | Forgot Password, Authentication, Password Storage, Session Mgmt, Credential Stuffing, MFA, Next.js Security, Input Validation, Authorization |
| `nist/sp800-63b.txt` | NIST SP 800-63B Rev.4 (Digital Identity / Authenticators) |
| `designmd/` | designmd.ai — 420+ तैयार DESIGN.md डिज़ाइन सिस्टम; CLI उपयोग गाइड + ट्रेंडिंग स्नैपशॉट |

---

## भाग 4 — सभी 124 स्किल्स की पूरी सूची (path + विवरण)

| Skill path (`.agents/skills/…`) | Description |
|---|---|
| `addyosmani/api-and-interface-design` | Guides stable API and interface design. Use when designing APIs, module boundaries, or any public interface. U |
| `addyosmani/browser-testing-with-devtools` | Tests in real browsers via Chrome DevTools MCP. Use when building or debugging anything that runs in a browser |
| `addyosmani/ci-cd-and-automation` | Automates CI/CD pipeline setup. Use when setting up or modifying build and deployment pipelines. Use when you  |
| `addyosmani/code-review-and-quality` | Conducts multi-axis code review. Use before merging any change. Use when reviewing code written by yourself, a |
| `addyosmani/code-simplification` | Simplifies code for clarity. Use when refactoring code for clarity without changing behavior. Use when code wo |
| `addyosmani/constraint-driven-development` | Establishes a project's quality bar as a written contract and stops agents quietly lowering it. Interviews the |
| `addyosmani/context-engineering` | Optimizes agent context setup. Use when starting a new session, when agent output quality degrades, when switc |
| `addyosmani/debugging-and-error-recovery` | Guides systematic root-cause debugging. Use when tests fail, builds break, something that worked yesterday bro |
| `addyosmani/deprecation-and-migration` | Manages deprecation and migration. Use when removing old systems, APIs, or features. Use when migrating users  |
| `addyosmani/documentation-and-adrs` | Records decisions and documentation. Use when you need to document an architecture decision (ADR) or the reaso |
| `addyosmani/doubt-driven-development` | Subjects every non-trivial decision to a fresh-context adversarial review before it stands. Use when you want  |
| `addyosmani/frontend-ui-engineering` | Builds production-quality, accessible, responsive user-facing UIs. Use when building or modifying interfaces a |
| `addyosmani/git-workflow-and-versioning` | Structures git workflow practices. Use when making any code change. Use when committing, branching, resolving  |
| `addyosmani/idea-refine` | Refines raw ideas into sharp, actionable concepts through structured divergent and convergent thinking. Use wh |
| `addyosmani/incremental-implementation` | Delivers changes incrementally in thin, verifiable slices. Use when implementing any feature or change that to |
| `addyosmani/interview-me` | Extracts what the user actually wants instead of what they think they should want. Achieves this through one-q |
| `addyosmani/observability-and-instrumentation` | Instruments code so production behavior is visible and diagnosable. Use when adding logging, metrics, tracing, |
| `addyosmani/performance-optimization` | Optimizes application performance across frontend, backend, queries, and databases. Use when performance requi |
| `addyosmani/planning-and-task-breakdown` | Breaks work into ordered tasks. Use when you have a spec or clear requirements and need to break work into imp |
| `addyosmani/security-and-hardening` | Hardens code against vulnerabilities. Use when auditing an input handler for vulnerabilities, when handling us |
| `addyosmani/shipping-and-launch` | Prepares production launches. Use when preparing to deploy to production, or when asking what needs to be in p |
| `addyosmani/source-driven-development` | Grounds every implementation decision in official documentation. Use when you want to verify an approach again |
| `addyosmani/spec-driven-development` | Creates specs before coding. Use when starting a new project, feature, or significant change and no specificat |
| `addyosmani/test-driven-development` | Drives development with tests using the red-green-refactor loop. Use when implementing any logic, fixing any b |
| `addyosmani/using-agent-skills` | Discovers and invokes agent skills. Use when starting a session, or when you need to decide which skill or wor |
| `api-security-best-practices` | Implement secure API design patterns including authentication, authorization, input validation, rate limiting, |
| `backend-security-coder` | Expert in secure backend coding practices specializing in input validation, authentication, and API security.  |
| `banner-design` | Design banners for social media, ads, website heroes, creative assets, and print. Multiple art direction optio |
| `brand` | Brand voice, visual identity, messaging frameworks, asset management, brand consistency. Activate for branded  |
| `canvas-design` | Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when |
| `coderabbit/code-review` | Reviews code changes using CodeRabbit AI CLI; groups findings by severity, supports fix-review cycles |
| `coderabbit/autofix` | Fetch unresolved CodeRabbit review comments from GitHub PRs and apply fixes |
| `composition-patterns` |  |
| `database-security` | Authorized database security assessment across PostgreSQL, MySQL, MSSQL, MongoDB, and Redis: exposure, authori |
| `deploy-to-vercel` | Deploy applications and websites to Vercel. Use when the user requests deployment actions like "deploy my app" |
| `design-system` | Token architecture, component specifications, and slide generation. Three-layer tokens (primitive→semantic |
| `design` | Comprehensive design skill: brand identity, design tokens, UI styling, logo generation (55 styles, Gemini AI), |
| `docx` | Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files) or Wo |
| `frontend-design` | Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps w |
| `frontend-mobile-security-xss-scan` | You are a frontend security specialist focusing on Cross-Site Scripting (XSS) vulnerability detection and prev |
| `frontend-security-coder` | Expert in secure frontend coding practices specializing in XSS prevention, output sanitization, and client-sid |
| `karpathy-guidelines` | Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code t |
| `mattpocock/codebase-design` | Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interfac |
| `mattpocock/diagnosing-bugs` | Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or r |
| `mattpocock/domain-modeling` | Build and sharpen a project's domain model. Use when discussing codebase terminology, writing or editing a GLO |
| `mattpocock/git-guardrails-claude-code` | Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, branch -D, etc.) before t |
| `mattpocock/grill-me` | A relentless interview to sharpen a plan or design. |
| `mattpocock/handoff` | Compact the current conversation into a handoff document for another agent to pick up. |
| `mattpocock/pr` | Use when writing a PR body. |
| `mattpocock/prototype` | Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check whether a sta |
| `mattpocock/setup-pre-commit` | Set up Husky pre-commit hooks with lint-staged (Prettier), type checking, and tests in the current repo. Use w |
| `mattpocock/teach` | Teach the user a new skill or concept, within this workspace. |
| `mattpocock/to-spec` | Turn the current conversation into a spec and publish it to the project issue tracker: no interview, just synt |
| `mattpocock/to-tickets` | Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocki |
| `mattpocock/triage` | Move issues and external PRs through a state machine of triage roles, categorise, verify, grill if needed, and |
| `mattpocock/wayfinder` | Plan a huge chunk of work (more than one agent session can hold) as a shared map of decision tickets on your i |
| `mattpocock/writing-for-agents` | Writing documents for agents. Use when creating or editing skills, or modifying AGENTS.md or CLAUDE.md. |
| `mcp-builder` | Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with externa |
| `nextjs-supabase-auth` | Expert integration of Supabase Auth with Next.js App Router |
| `pdf` | Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text |
| `planning-with-files` | Persistent file-based planning for multi-step AI-agent work. Keeps task_plan.md, findings.md, and progress.md  |
| `playwright-skill` | Complete browser automation with Playwright. Auto-detects dev servers, writes reusable test scripts, and suppo |
| `pptx` | Use this skill any time a .pptx or .potx file is involved in any way — as input, output, or both. This inclu |
| `react-best-practices` | React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when  |
| `react-native-skills` |  |
| `react-view-transitions` | Guide for implementing smooth, native-feeling animations using React's View Transition API (`<ViewTransition>` |
| `security-review` | This skill ensures all code follows security best practices and identifies potential vulnerabilities. Use when |
| `skill-creator` | Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to c |
| `slides` | Create strategic HTML presentations with Chart.js, design tokens, responsive layouts, copywriting formulas, an |
| `supabase-postgres-best-practices` | Postgres best practices maintained by Supabase, for Postgres running anywhere. Load this skill BEFORE writing  |
| `strix/api-security-testing` | Pentest REST/GraphQL APIs with Strix: auth, BOLA/IDOR, injection, rate limits |
| `strix/application-security-testing` | End-to-end AppSec testing of a running application with Strix agents |
| `strix/ci-security-scanning-with-strix` | Add Strix scans to GitHub Actions / CI to block vulnerable PRs |
| `strix/find-security-vulnerabilities-in-code` | Scan a codebase/repo directory for vulnerabilities (SAST + dynamic validation) |
| `strix/fix-security-vulnerabilities-with-strix` | Turn Strix findings into patches and verify the fix |
| `strix/managed-pentesting-with-strix` | Use Strix Cloud (app.strix.ai) for managed pentests and PR reviews |
| `strix/owasp-top-10-testing` | Test an app specifically against OWASP Top 10 categories |
| `strix/penetration-testing-with-strix` | General autonomous pentest workflow (recon → exploit → validate → report) |
| `strix/web-app-penetration-testing` | Browser-driven web app pentest: XSS, CSRF, auth bypass, session issues |
| `supabase` | Use when doing ANY task involving Supabase. Triggers: Supabase products (Database, Auth, Edge Functions, Realt |
| `superpowers/brainstorming` | You MUST use this before any creative work - creating features, building components, adding functionality, or  |
| `superpowers/diagnosing-superpowers` | Use when a superpowers session went wrong and your human partner wants to know why — repeated work, ignored  |
| `superpowers/dispatching-parallel-agents` | Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies |
| `superpowers/executing-plans` | Use when executing an implementation plan in the current session as the implementer yourself — your human pa |
| `superpowers/finishing-a-development-branch` | Use when implementation is complete, all tests pass, and you need to decide how to integrate the work |
| `superpowers/receiving-code-review` | Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear |
| `superpowers/requesting-code-review` | Use when completing tasks, implementing major features, or before merging to verify work meets requirements |
| `superpowers/subagent-driven-development` | Use when executing implementation plans with independent tasks in the current session |
| `superpowers/systematic-debugging` | Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes |
| `superpowers/test-driven-development` | Use when implementing any feature or bugfix, before writing implementation code |
| `superpowers/using-git-worktrees` | Use when starting feature work that needs isolation from current workspace or before executing implementation  |
| `superpowers/using-superpowers` | Use when starting any conversation - establishes how to find and use skills, requiring skill invocation before |
| `superpowers/verification-before-completion` | Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires runn |
| `superpowers/writing-plans` | Use when you have a spec or requirements for a multi-step task, before touching code |
| `superpowers/writing-skills` | Use when creating new skills, editing existing skills, or verifying skills work before deployment |
| `taste/brandkit` | Premium brand-kit image generation skill for creating high-end brand-guidelines boards, logo systems, identity |
| `taste/brutalist-skill` | Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics. Rigid grids, extre |
| `taste/image-to-code-skill` | Elite website image-to-code skill for Codex. For visually important web tasks, it must first generate the desi |
| `taste/minimalist-skill` | Clean editorial-style interfaces. Warm monochrome palette, typographic contrast, flat bento grids, muted paste |
| `taste/redesign-skill` | Upgrades existing websites and apps to premium quality. Audits current design, identifies generic AI patterns, |
| `taste/soft-skill` | Teaches the AI to design like a high-end agency. Defines the exact fonts, spacing, shadows, card structures, a |
| `taste/taste-skill` | Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the r |
| `theme-factory` | Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing page |
| `trailofbits/audit-context-building` | Understand a codebase before looking for bugs in it - what each function assumes, what it guarantees, and what |
| `trailofbits/codeql` | >- |
| `trailofbits/differential-review` | Performs security-focused differential review of code changes. Adapts analysis depth to codebase size, uses gi |
| `trailofbits/entry-point-analyzer` | Analyzes smart contract codebases to identify state-changing entry points for security auditing. Detects exter |
| `trailofbits/post-patch-validation` | > |
| `trailofbits/review-walkthrough` | Generates an interactive HTML walkthrough for reviewing code changes. Use only when explicitly called. |
| `trailofbits/sarif-parsing` | >- |
| `trailofbits/semgrep` | >- |
| `trailofbits/sharp-edges` | Identifies error-prone APIs, dangerous configurations, and footgun designs that enable security mistakes. Use  |
| `trailofbits/supply-chain-risk-auditor` | Audits a project's dependencies for supply-chain risk: version-matched advisories for direct dependencies and  |
| `trailofbits/variant-analysis` | Hunts for the other instances of a bug already found — the variants of one root cause across a codebase. Use |
| `trailofbits/vulnerability-triage-brocards` | >- |
| `ui-styling` | Create beautiful, accessible user interfaces with shadcn/ui components (built on Radix UI + Tailwind), Tailwin |
| `ui-ux-pro-max` | UI/UX design intelligence for web, mobile, and desktop. This skill should be used when designing, building, re |
| `vercel-optimize` | Use for Vercel cost and performance optimization on deployed projects, especially Next.js, SvelteKit, Nuxt, an |
| `web-artifacts-builder` | Suite of tools for creating elaborate, multi-component claude.ai HTML artifacts using modern frontend web tech |
| `web-design-guidelines` | Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility |
| `web-security-testing` | Web application security testing workflow for OWASP Top 10 vulnerabilities including injection, XSS, authentic |
| `webapp-testing` | Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend  |
| `writing-guidelines` | Review docs/prose for Writing Guidelines compliance. Use when asked to "review my docs", "check writing style" |
| `xlsx` | Use this skill any time a spreadsheet file is the primary input or output. This means any task where the user  |


---

## बाहरी टूल जिनके लिए सेटअप/लॉगिन चाहिए
| टूल | ज़रूरत | कमांड |
|---|---|---|
| CodeRabbit | अकाउंट लॉगिन | `coderabbit auth login` |
| Strix | Docker चालू + LLM API key | `curl -sSL https://strix.ai/install \| bash` → `export STRIX_LLM=... LLM_API_KEY=...` → `strix --target ./app` |
| designmd | download के लिए free API key (search बिना key चलता है) | `export DESIGNMD_API_KEY=dk_...` |
| Playwright | पहली बार Chromium डाउनलोड | स्किल ख़ुद करता है |

## स्रोत रेपो
- anthropics/skills · obra/superpowers · addyosmani/agent-skills · mattpocock/skills · multica-ai/andrej-karpathy-skills
- vercel-labs/agent-skills · nextlevelbuilder/ui-ux-pro-max-skill · Leonxlnx/taste-skill
- trailofbits/skills · sickn33/antigravity-awesome-skills · supabase/agent-skills
- coderabbitai/skills · usestrix/strix · designmd.ai
- lackeyjb/playwright-skill · OthmanAdi/planning-with-files
- OWASP (Top10, ASVS, CheatSheetSeries) · NIST SP 800-63B

## नया एजेंट शुरू करते समय प्रॉम्प्ट (कॉपी करें)
```
पहले /home/user/.agents/SKILLS_MASTER_LIST.md पढ़ो। काम के हिसाब से भाग-2 का वर्कफ़्लो फ़ॉलो करो
और हर चरण पर संबंधित SKILL.md पढ़कर ही आगे बढ़ो। सिक्योरिटी के लिए .agents/references/ के OWASP/NIST डॉक्स देखो।
```

---

## 🆕 भाग-6: UI/UX + Website बनाने वाले skills (जोड़े गए 2026-10-05, कुल अब 170 skills, ~1 MB जोड़ा)

**कब पढ़ें:** वर्कफ़्लो चरण-4 (डिज़ाइन) और चरण-7/8 (QA) में। क्रम: `plan-design-review` → `frontend-design`/`ui-ux-pro-max`/`taste` → build → `emilkowalski/*` (animation) → `design-review` → `frontend-checklist-global`

| # | Skill | Path | काम |
|---|---|---|---|
| 1 | plan-design-review | `.agents/skills/gstack/plan-design-review/` | बनाने से पहले design plan की समीक्षा — hierarchy, flows, UX gaps (Garry Tan) |
| 2 | design-review | `.agents/skills/gstack/design-review/` | बने UI का designer-eye QA: spacing, hierarchy, AI-slop, slow interactions — फिर fix |
| 3 | emil-design-eng | `.agents/skills/emilkowalski/emil-design-eng/` | Emil Kowalski की design-engineering सोच (polished UI) |
| 4 | animate | `.agents/skills/emilkowalski/animate/` | web animation सही तरीके से (easing, duration) |
| 5 | animation-vocabulary | `.agents/skills/emilkowalski/animation-vocabulary/` | animation शब्दावली/सिद्धांत |
| 6 | find-animation-opportunities | `.agents/skills/emilkowalski/find-animation-opportunities/` | कहाँ motion जोड़ने से UX सुधरे |
| 7 | improve-animations | `.agents/skills/emilkowalski/improve-animations/` | मौजूदा animation सुधारना |
| 8 | review-animations | `.agents/skills/emilkowalski/review-animations/` | animation review |
| 9 | break-ui | `.agents/skills/emilkowalski/break-ui/` | UI को तोड़कर edge-cases खोजना (long text, empty, error) |
| 10 | pick-ui-library | `.agents/skills/emilkowalski/pick-ui-library/` | सही UI library चुनना |
| 11 | prototype | `.agents/skills/emilkowalski/prototype/` | तेज़ UI prototype |
| 12 | apple-design | `.agents/skills/emilkowalski/apple-design/` | Apple HIG-style design |
| 13 | mobile-native | `.agents/skills/emilkowalski/mobile-native/` | mobile-native feel |
| 14 | stitch-skill | `.agents/skills/taste/stitch-skill/` | Google Stitch style UI |
| 15 | imagegen-frontend-web | `.agents/skills/taste/imagegen-frontend-web/` | web UI image-gen prompts |
| 16 | imagegen-frontend-mobile | `.agents/skills/taste/imagegen-frontend-mobile/` | mobile UI image-gen prompts |
| 17 | color-expert | `.agents/skills/open-design/color-expert/` | color palette |
| 18 | design-brief | `.agents/skills/open-design/design-brief/` | design brief लिखना |
| 19 | design-consultation | `.agents/skills/open-design/design-consultation/` | design सलाह |
| 20 | brand-guidelines | `.agents/skills/open-design/brand-guidelines/` | brand guide |
| 21 | copywriting | `.agents/skills/open-design/copywriting/` | UI copy/microcopy |
| 22 | faq-page | `.agents/skills/open-design/faq-page/` | FAQ page pattern |
| 23 | frontend-checklist-global | `.agents/skills/frontend-checklist/frontend-checklist-global/` | पूरी Front-End Checklist (74K⭐) एक entry से audit |
| 24–46 | UX subset (23) | `.agents/skills/frontend-checklist/*` | loading-indicators, form-validation, error-handling, touch-targets, focus-management, keyboard-navigation, color-contrast, dark-mode-css, reduced-motion, 404-page, modal-accessibility, heading-hierarchy, responsive-images, font-loading, CLS/LCP/INP, accessible-authentication, password-field-security, form-labels, input-types, skip-link, viewport |
| ref | Front-End-Checklist README | `.agents/references/frontend-checklist/README.md` | पूरी checklist (reference) |

## 🆕 भाग-7: बड़े-⭐ वाले हल्के skills (जोड़े गए 2026-10-05, कुल अब 202 skills)

| # | Pack (⭐) | Skills | Path | कब पढ़ें |
|---|---|---|---|---|
| 1 | **ponytail** (156K) | ponytail, ponytail-review, ponytail-audit, ponytail-debt, ponytail-gain, ponytail-help | `.agents/skills/ponytail/` | चरण-5 build में हमेशा ON — over-engineering रोकता है; PR पर `ponytail-review`, पूरे repo पर `ponytail-audit` |
| 2 | **mattpocock** +13 (277K) | grill-with-docs, improve-codebase-architecture, tdd, implement, implement-spec, code-review, research, retro, ask-matt, wizard, grilling, wait-what, to-questionnaire | `.agents/skills/mattpocock/` (अब 28) | चरण-2/3/5/8 |
| 3 | **caveman** (110K) | caveman, caveman-compress, safe-refactor, surgical-patch, investigate-first, lean-build, verify-and-stop, caveman-review, caveman-commit | `.agents/skills/caveman/` | token बचाने को; refactor में `safe-refactor` |
| 4 | **humanizer** (54K) | humanizer (+agents) | `.agents/skills/humanizer/` | किसी भी user-facing text/copy पर |
| 5 | **i-have-adhd** (54K) | i-have-adhd | `.agents/skills/i-have-adhd/` | जवाब छोटा/ऊपर रखने के लिए |
| 6 | **last30days** (64K) | last30days | `.agents/skills/last30days/` | किसी topic/tool की ताज़ा (30-दिन) रिसर्च (Reddit/X/YT/HN) |
| 7 | **archify** (78K) | archify (bin+renderers) | `.agents/skills/archify/` | plan/codebase → interactive diagram (चरण-3 planning) |
