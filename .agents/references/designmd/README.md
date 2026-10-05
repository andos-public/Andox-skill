# designmd.ai — तैयार DESIGN.md डिज़ाइन सिस्टम्स (रेफ़रेंस)

**क्या है:** 420+ community-made `DESIGN.md` फ़ाइलें — हर एक में रंग टोकन, टाइपोग्राफ़ी, spacing, कंपोनेंट नियम, mood/tone।
AI कोडिंग एजेंट इन्हें सीधे पढ़कर consistent UI बनाते हैं।

**कब इस्तेमाल करें (वर्कफ़्लो स्टेप 4 — डिज़ाइन):**
1. `ui-ux-pro-max` search script से domain के लिए style/palette सुझाव लो
2. designmd पर मिलता-जुलता तैयार सिस्टम खोजो → प्रोजेक्ट रूट में `DESIGN.md` की तरह सेव करो → `frontend-design` + `taste/taste-skill` के साथ उसी के टोकन इस्तेमाल करो
3. कभी भी generic AI-look वाला सिस्टम मत उठाओ — bold/opinionated चुनो

**CLI (बिना API key सर्च चलता है, download के लिए free key चाहिए):**
```bash
npx -y designmd search "dark fintech"                 # keyword
npx -y designmd search --tag minimal --tag saas       # tags
npx -y designmd search --sort trending --limit 10
export DESIGNMD_API_KEY=dk_xxx                        # https://designmd.ai → free key (user से माँगो)
npx -y designmd get <owner>/<slug>                    # देखो
npx -y designmd download <owner>/<slug>               # ./DESIGN.md में सेव
```
Web: https://designmd.ai/explore · फ़ॉर्मेट: https://designmd.ai/what-is-design-md (लोकल कॉपी: what-is-design-md.txt)

**उपयोगी tags:** saas, dashboard, fintech, digital-health, minimal, brutalist, dark, accessible, mobile-app, premium, playful
**ट्रेंडिंग स्नैपशॉट:** trending-snapshot-2026-10.txt
