import os,re,json,yaml
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'.agents','skills')
CAT_RULES=[
 ('Security',r'security|trailofbits|strix|xss|coderabbit|owasp'),
 ('Design & UX',r'taste|design|ui-|theme|canvas|brand|banner|emilkowalski|open-design|frontend-checklist|frontend-design'),
 ('React & Web',r'react|vercel|composition|web-|deploy|supabase|nextjs|playwright|webapp'),
 ('Methodology',r'superpowers|addyosmani|mattpocock|karpathy|ponytail|caveman|planning|i-have-adhd'),
 ('Documents',r'docx|pptx|xlsx|pdf|slides|writing|humanizer'),
 ('Research & Tools',r'last30days|archify|mcp-builder|skill-creator'),
]
SRC={'addyosmani':('Addy Osmani','https://github.com/addyosmani/agent-skills','101K'),'superpowers':('obra / Jesse Vincent','https://github.com/obra/superpowers','296K'),'mattpocock':('Matt Pocock','https://github.com/mattpocock/skills','277K'),'trailofbits':('Trail of Bits','https://github.com/trailofbits/skills','7.4K'),'strix':('Strix','https://github.com/usestrix/strix','67K'),'taste':('Leonxlnx','https://github.com/Leonxlnx/taste-skill','93K'),'coderabbit':('CodeRabbit','https://github.com/coderabbitai/skills','187'),'emilkowalski':('Emil Kowalski','https://github.com/emilkowalski/skills','—'),'caveman':('Julius Brussee','https://github.com/JuliusBrussee/caveman','110K'),'ponytail':('Dietrich Gebert','https://github.com/DietrichGebert/ponytail','156K'),'open-design':('nexu-io open-design','https://github.com/nexu-io/open-design','100K'),'gstack':('Garry Tan','https://github.com/garrytan/gstack','135K'),'frontend-checklist':('David Dias','https://github.com/thedaviddias/Front-End-Checklist','74K'),'ui-ux-pro-max':('nextlevelbuilder','https://github.com/nextlevelbuilder/ui-ux-pro-max-skill','133K'),'karpathy-guidelines':('forrestchang','https://github.com/forrestchang/andrej-karpathy-skills','207K'),'planning-with-files':('OthmanAdi','https://github.com/OthmanAdi/planning-with-files','27K'),'humanizer':('blader','https://github.com/blader/humanizer','54K'),'i-have-adhd':('ayghri','https://github.com/ayghri/i-have-adhd','54K'),'last30days':('mvanhorn','https://github.com/mvanhorn/last30days-skill','64K'),'archify':('tt-a1i','https://github.com/tt-a1i/archify','78K'),'playwright-skill':('lackeyjb','https://github.com/lackeyjb/playwright-skill','—'),'supabase':('Supabase','https://github.com/supabase/agent-skills','2.7K'),'supabase-postgres-best-practices':('Supabase','https://github.com/supabase/agent-skills','2.7K')}
ANTH={'docx','pptx','xlsx','pdf','slides','canvas-design','theme-factory','brand','web-artifacts-builder','skill-creator','mcp-builder','webapp-testing','frontend-design'}
VERC={'react-best-practices','composition-patterns','react-view-transitions','react-native-skills','vercel-optimize','deploy-to-vercel','web-design-guidelines','writing-guidelines'}
SICK={'security-review','api-security-best-practices','backend-security-coder','frontend-security-coder','database-security','web-security-testing','frontend-mobile-security-xss-scan','nextjs-supabase-auth','ui-styling','design','design-system','banner-design'}
def source(top):
    if top in SRC: return SRC[top]
    if top in ANTH: return ('Anthropic','https://github.com/anthropics/skills','180K')
    if top in VERC: return ('Vercel Labs','https://github.com/vercel-labs/agent-skills','—')
    if top in SICK: return ('sickn33 AAS','https://github.com/sickn33/agentic-awesome-skills','47K')
    return ('Community','https://github.com','—')
skills=[]
for dp,dn,fn in os.walk(ROOT):
    if 'SKILL.md' not in fn: continue
    rel=os.path.relpath(dp,ROOT); top=rel.split('/')[0]; slug=rel.replace('/','--')
    txt=open(os.path.join(dp,'SKILL.md'),encoding='utf-8',errors='ignore').read()
    meta={}
    m=re.match(r'^---\n(.*?)\n---\n',txt,re.S)
    body=txt
    if m:
        try: meta=yaml.safe_load(m.group(1)) or {}
        except Exception: meta={}
        body=txt[m.end():]
    name=str(meta.get('name') or os.path.basename(dp))
    desc=str(meta.get('description') or '').strip()
    if not desc:
        for line in body.splitlines():
            if line.strip() and not line.startswith('#'): desc=line.strip()[:220]; break
    cat='Other'
    for c,pat in CAT_RULES:
        if re.search(pat,rel): cat=c; break
    files=[]
    for d2,_,f2 in os.walk(dp):
        for f in f2:
            p=os.path.join(d2,f); 
            if os.path.getsize(p)<400_000: files.append(os.path.relpath(p,dp))
    a,url,stars=source(top)
    words=len(body.split())
    skills.append(dict(slug=slug,name=name,pack=top,path=f'.agents/skills/{rel}',category=cat,description=desc[:400],author=a,sourceUrl=url,stars=stars,words=words,readMin=max(1,words//220),files=sorted(files)[:40],allFiles=sorted(files),body=body))
skills.sort(key=lambda s:(s['category'],s['pack'],s['name']))
os.makedirs('web/data',exist_ok=True)
json.dump([{k:v for k,v in s.items() if k not in('body','allFiles')} for s in skills],open('web/data/skills.json','w'),ensure_ascii=False)
os.makedirs('web/data/bodies',exist_ok=True)
for s in skills: open(f"web/data/bodies/{s['slug']}.md",'w').write(s['body'])
os.makedirs('web/public',exist_ok=True)
json.dump({'repo':'andos-public/Andox-skill','branch':'main','skills':{s['slug']:{'name':s['name'],'path':s['path'],'category':s['category'],'pack':s['pack'],'files':s['allFiles']} for s in skills}},open('web/public/manifest.json','w'))
from collections import Counter
print(len(skills),Counter(s['category'] for s in skills))
