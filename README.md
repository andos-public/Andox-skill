# Andox Skills

**Give your AI agent real superpowers.** A curated, organised library of 200+ open-source agent skills (methodology, design & UX, security, web) with step-by-step playbooks.

- 🌐 Website: https://andos-public.github.io/Andos-skill-page/
- 📚 Skills live in `.agents/skills/` (each has a `SKILL.md`); references in `.agents/references/`
- 🧭 Master workflow: `.agents/SKILLS_MASTER_LIST.md`

## Use with your agent
```
npx skills add andos-public/Andos-skill-page
```
or tell your agent: *"Read .agents/SKILLS_MASTER_LIST.md first and follow the workflow."*

## Develop the site
```
python build_data.py          # .agents/skills -> web/data
cd web && npm ci && npm run dev
```
Skills remain © their original authors (MIT/Apache etc.); Andox adds curation, playbooks and tooling.
