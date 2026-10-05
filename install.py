#!/usr/bin/env python3
"""Andox Skills installer — zero dependencies (Python 3.8+).

  curl -sL https://andos-public.github.io/Andox-skill/install.py | python3 - --skill mattpocock--grill-me
  curl -sL https://andos-public.github.io/Andox-skill/install.py | python3 - --category security
  curl -sL https://andos-public.github.io/Andox-skill/install.py | python3 - --all --agent claude

Options:
  --skill SLUG [SLUG…]   install one or more skills (slug as shown on andox site)
  --category NAME        install every skill in a category (security, design, react, methodology, documents, research)
  --pack NAME            install every skill of one pack (e.g. superpowers)
  --all                  install the whole library
  --agent NAME           target folder preset: agents (default .agents/skills), claude (.claude/skills),
                         cursor (.cursor/skills), codex (.codex/skills), gemini (.gemini/skills), copilot (.github/skills)
  --to DIR               explicit target directory (overrides --agent)
  --list                 list matching skills and exit
  --force                overwrite existing skill folders
"""
import argparse, json, os, sys, urllib.request, concurrent.futures as cf
SITE = os.environ.get("ANDOX_SITE", "https://andos-public.github.io/Andox-skill")
RAW = "https://raw.githubusercontent.com/{repo}/{branch}/{path}"
AGENTS = {"agents": ".agents/skills", "claude": ".claude/skills", "cursor": ".cursor/skills", "codex": ".codex/skills", "gemini": ".gemini/skills", "copilot": ".github/skills", "windsurf": ".windsurf/skills", "cline": ".cline/skills"}
CATS = {"security": "Security", "design": "Design & UX", "react": "React & Web", "web": "React & Web", "methodology": "Methodology", "documents": "Documents", "docs": "Documents", "research": "Research & Tools", "tools": "Research & Tools"}
def get(url, binary=False):
    req = urllib.request.Request(url, headers={"User-Agent": "andox-install/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read(); return data if binary else data.decode("utf-8")
def main():
    ap = argparse.ArgumentParser(add_help=True, description="Install Andox skills into your agent's skills folder.")
    ap.add_argument("--skill", nargs="+", default=[]); ap.add_argument("--category"); ap.add_argument("--pack"); ap.add_argument("--all", action="store_true")
    ap.add_argument("--agent", default="agents", choices=sorted(AGENTS)); ap.add_argument("--to"); ap.add_argument("--list", action="store_true"); ap.add_argument("--force", action="store_true")
    a = ap.parse_args()
    if not (a.skill or a.category or a.pack or a.all): ap.print_help(); sys.exit(1)
    print("→ fetching manifest…"); m = json.loads(get(SITE + "/manifest.json")); skills = m["skills"]
    sel = {}
    for s in a.skill:
        if s in skills: sel[s] = skills[s]
        else:
            hits = {k: v for k, v in skills.items() if s.lower() in k.lower() or s.lower() == v["name"].lower()}
            if len(hits) == 1: sel.update(hits)
            elif hits: print(f"✗ '{s}' is ambiguous: {', '.join(sorted(hits))}"); sys.exit(2)
            else: print(f"✗ unknown skill '{s}'"); sys.exit(2)
    if a.category:
        cat = CATS.get(a.category.lower(), a.category)
        sel.update({k: v for k, v in skills.items() if v["category"].lower() == cat.lower()})
    if a.pack: sel.update({k: v for k, v in skills.items() if v["pack"].lower() == a.pack.lower()})
    if a.all: sel = dict(skills)
    if not sel: print("✗ nothing matched"); sys.exit(2)
    if a.list:
        for k, v in sorted(sel.items()): print(f"{k:50} {v['category']:18} {len(v['files'])} files")
        print(f"{len(sel)} skills"); return
    dest = a.to or AGENTS[a.agent]; os.makedirs(dest, exist_ok=True)
    print(f"→ installing {len(sel)} skill(s) into {dest}/")
    jobs = []
    for slug, v in sorted(sel.items()):
        folder = os.path.join(dest, v["path"].split("/", 2)[2])  # strip .agents/skills/
        if os.path.exists(os.path.join(folder, "SKILL.md")) and not a.force: print(f"  = {slug} (exists, use --force)"); continue
        for f in v["files"]: jobs.append((slug, v["path"] + "/" + f, os.path.join(folder, f)))
    done = set(); fail = []
    def fetch(j):
        slug, path, out = j
        try:
            data = get(RAW.format(repo=m["repo"], branch=m["branch"], path=path), binary=True)
            os.makedirs(os.path.dirname(out), exist_ok=True); open(out, "wb").write(data); return slug, None
        except Exception as e: return slug, f"{path}: {e}"
    with cf.ThreadPoolExecutor(max_workers=12) as ex:
        for slug, err in ex.map(fetch, jobs):
            if err: fail.append(err)
            elif slug not in done: done.add(slug); print(f"  ✓ {slug}")
    if fail: print("✗ failed files:\n  " + "\n  ".join(fail[:10]))
    print(f"\nDone. {len(done)} skill(s) ready in {dest}/\nTell your agent: \"Read {dest}/<skill>/SKILL.md and follow it.\"")
if __name__ == "__main__": main()
