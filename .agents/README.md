# Installed Agent Skills & References

All skills live in `.agents/skills/` (Universal / Agent Standard layout). Each has a `SKILL.md` entry point.
Agents working in this workspace MUST consult the relevant skill before doing the matching kind of work.

## Design
| Skill | Source | Use when |
|---|---|---|
| `frontend-design` | anthropics/skills | Any UI build — avoid the generic "AI look"; pick a bold, intentional aesthetic |
| `ui-ux-pro-max` (+ `design-system`, `design`, `brand`, `ui-styling`, `banner-design`, `slides`) | nextlevelbuilder/ui-ux-pro-max-skill | Styles, colors, fonts, design systems. Run `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<domain>" --design-system -p "<Project>"` |
| `web-design-guidelines` | vercel-labs/agent-skills | Accessibility + design review / audit of finished UI |

## Security
| Skill | Source | Use when |
|---|---|---|
| `security-review` | sickn33/antigravity-awesome-skills (`cc-skill-security-review`) | Reviewing code for vulns before shipping |
| `api-security-best-practices` | sickn33/antigravity-awesome-skills | Designing/reviewing API routes, auth, rate limits |
| `nextjs-supabase-auth` | sickn33/antigravity-awesome-skills | ONLY if stack is Next.js + Supabase |
| `trailofbits/*` | trailofbits/skills | Deep audits: `audit-context-building`, `entry-point-analyzer`, `differential-review` (PR diffs), `review-walkthrough`, `sharp-edges`, `supply-chain-risk-auditor`, `vulnerability-triage-brocards`, `post-patch-validation`, `variant-analysis`, `semgrep`, `codeql`, `sarif-parsing` |

### Security reference documents (`.agents/references/`) — READ, not skills
- `owasp-top10-2025/` — OWASP Top 10 (2025): A01…A10 markdown
- `owasp-asvs-5.0/` — ASVS 5.0 chapters (esp. V6 Authentication, V7 Session, V8 Authorization, V9 Tokens)
- `owasp-cheatsheets/` — Forgot Password, Authentication, Password Storage, Session Management, Credential Stuffing, MFA, Next.js Security, Input Validation, Authorization
- `nist/sp800-63b.txt` — NIST SP 800-63B (Digital Identity: Authentication & Authenticator Management)

Checklist for auth/password-reset/wallet work: Forgot_Password_Cheat_Sheet + ASVS V6/V7 + NIST 800-63B §3 (password rules, rate limiting, no composition rules, breach-list check).

## Testing
| Skill | Source | Use when |
|---|---|---|
| `playwright-skill` | lackeyjb/playwright-skill | Real-browser E2E: login, reset, wallet flows; include mobile viewports (e.g. 390×844) |

## Planning
| Skill | Source | Use when |
|---|---|---|
| `planning-with-files` | OthmanAdi/planning-with-files | Large multi-session builds: keep `task_plan.md`, `findings.md`, `progress.md` as persistent memory |
