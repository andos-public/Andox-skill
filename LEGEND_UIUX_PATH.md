# Andox · "UI/UX Legend" learning path for a new agent

Goal: turn a fresh coding agent into a top-tier **app / web UI-UX builder** (UI/UX Pro Max level).
31 skills, ordered. Core = must learn. Pro = learn when the task needs it.

## 0. Install everything in one shot (Python, no deps)

```bash
curl -sL https://andos-public.github.io/Andox-skill/install.py | python3 - \
  --skill ui-ux-pro-max taste--taste-skill taste--redesign-skill taste--minimalist-skill taste--brandkit \
          taste--image-to-code-skill emilkowalski--animate gstack--design-review \
          frontend-checklist--frontend-checklist-global frontend-design web-design-guidelines \
          design-system ui-styling theme-factory open-design--color-expert open-design--brand-guidelines \
          react-best-practices composition-patterns react-view-transitions vercel-optimize \
          playwright-skill webapp-testing addyosmani--performance-optimization \
          mattpocock--grill-me superpowers--brainstorming superpowers--writing-plans \
          superpowers--test-driven-development superpowers--verification-before-completion mattpocock--code-review \
          security-review frontend-security-coder nextjs-supabase-auth deploy-to-vercel archify
```
Add `--agent claude` / `cursor` / `codex` / `gemini` to target that tool's skills folder.

## 1. The path (read in this order)

### Stage A — Design intelligence (CORE)
| # | Skill | Why | Read |
|---|-------|-----|------|
| 1 | `ui-ux-pro-max` | The brain: 79 styles, 192 palettes, 74 font pairings, 119 UX rules, icon system (Phosphor), stack guides. Query it before every UI decision. | 17m |
| 2 | `taste--taste-skill` | What "good" looks like: hierarchy, spacing, restraint, anti-AI-slop rules. | 58m |
| 3 | `web-design-guidelines` (Vercel) | Accessibility + interaction baseline for the web. | 1m |
| 4 | `frontend-design` (Anthropic) | How to turn a brief into distinctive, non-template UI. | 6m |
| 5 | `design-system` | Tokens, components, naming — scale without drift. | 3m |
| 6 | `theme-factory` | Generate coherent light/dark themes from a seed. | 1m |
| 7 | `open-design--color-expert` + `open-design--brand-guidelines` | Colour theory and brand consistency. | 5m |

### Stage B — Craft & motion (CORE)
| 8 | `ui-styling` | Tailwind/shadcn patterns, responsive layout, mobile-first. | 4m |
| 9 | `emilkowalski--animate` | Motion that feels native: easing, duration, enter/exit, reduced-motion. | 8m |
| 10 | `taste--minimalist-skill` / `taste--redesign-skill` | Reduce; then redesign existing screens systematically. | 13m |
| 11 | `taste--brandkit` | Logo → tokens → components in one pass. | 11m |
| 12 | `taste--image-to-code-skill` | Build pixel-faithful UI from a mockup/screenshot. | 26m |

### Stage C — React / Next.js implementation (CORE for web apps)
| 13 | `react-best-practices` (Vercel) | Rendering, data, state done right. | 4m |
| 14 | `composition-patterns` | Compound components, slots, headless patterns. | 1m |
| 15 | `react-view-transitions` | Page/element transitions in Next. | 7m |
| 16 | `vercel-optimize` + `addyosmani--performance-optimization` | Core Web Vitals, bundle, images, fonts. | 20m |

### Stage D — Process that prevents bad UI (CORE)
| 17 | `mattpocock--grill-me` → `superpowers--brainstorming` → `superpowers--writing-plans` | Interrogate the brief, explore options, write the plan before code. | 19m |
| 18 | `superpowers--test-driven-development` | Build in small verified steps. | 6m |
| 19 | `gstack--design-review` | Structured UI critique with screenshots — run after every screen. | 85m (skim, use checklist) |
| 20 | `frontend-checklist--frontend-checklist-global` | Pre-ship checklist: head, a11y, perf, SEO, i18n. | 8m |
| 21 | `superpowers--verification-before-completion` + `mattpocock--code-review` | Never claim done without evidence. | 6m |

### Stage E — Ship safely (PRO)
| 22 | `playwright-skill` + `webapp-testing` | Real-browser checks, mobile viewports, screenshots. | 5m |
| 23 | `security-review` + `frontend-security-coder` | XSS, CSRF, auth UI, secrets in client. | 13m |
| 24 | `nextjs-supabase-auth` | Auth flows that are secure *and* usable. | 4m |
| 25 | `deploy-to-vercel` | Preview → prod with env hygiene. | 7m |
| 26 | `archify` | Architecture diagrams from the codebase for docs/handoff. | 6m |

## 2. Prompt to give the new agent (copy as-is)

```
You are a senior product designer-engineer. Before touching UI, load these skills from .agents/skills in order and follow them:
ui-ux-pro-max → taste-skill → web-design-guidelines → frontend-design → design-system → ui-styling → emilkowalski/animate.
Rules:
1. Query ui-ux-pro-max (scripts/search.py) for style, palette, font pairing, icons and UX rules for THIS product before choosing anything. Use Phosphor icons only; one icon weight for idle, "fill" for active.
2. Design mobile-first (390px) → tablet → desktop. Nothing may overflow the viewport; verify with Playwright screenshots at 390/768/1280 and check `innerHeight === visualViewport.height`.
3. Start with grill-me + brainstorming + writing-plans: give me 3 directions with trade-offs, then a plan. Do not code before I approve.
4. Build with TDD in small steps (react-best-practices, composition-patterns). Motion via animate rules; respect prefers-reduced-motion.
5. After each screen run gstack/design-review and frontend-checklist; attach screenshots and the fixed list.
6. Before saying "done": verification-before-completion, security-review, frontend-security-coder. Show evidence.
Deliverable for every screen: screenshot (mobile+desktop), tokens used, components list, a11y notes, perf notes.
```

## 3. One-line "learn now" version
```
Read .agents/skills/ui-ux-pro-max/SKILL.md, taste/taste-skill/SKILL.md, frontend-design/SKILL.md, ui-styling/SKILL.md and emilkowalski/animate/SKILL.md. Summarise the 20 rules you will apply to every UI you build, then wait for my brief.
```
