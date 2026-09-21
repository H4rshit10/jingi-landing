# JINGI — master prompt for Stitch

For Ankit. Paste Part A first to set the project. Then generate one screen at
a time with Part B. Use Part C to push a screen further. Part D is the motion
spec: Stitch renders still screens, so hand Part D to whatever writes the code
(Stitch's code export, another tool, or me).

Everything in the copy blocks is real and approved. Nothing else may be
invented: no team names, no faces, no figures, no second office, no phone
number that is not on the current site.

---

## Part A — the master prompt (paste once)

```
PROJECT
A five-page corporate website for JINGI Corporate Solutions Pvt. Ltd., a Gurugram (India) firm that sets up and runs the Indian subsidiaries of Japanese companies: market entry, legal and compliance, HR and recruitment, accounts and taxation. Bilingual, Japanese and English. The audience is a Japanese executive at head office and their manager in India. The site must feel premium, calm and cinematic: an editorial magazine cover, not a SaaS template.

VISUAL LANGUAGE
- Surfaces: warm ivory paper #F5F0E6 as the base, a sand tone #ECE4D3 for alternate sections, pure white #FFFFFF for cards. One deep night-navy band per page #0F1B33. Hairlines #D8CFBE.
- Ink: charcoal #1D1C22 for headlines, #3B3A40 for text, #66646C for muted text.
- Accent: one deep crimson #9B1C24 for every button, for links on hover, and for exactly one italic word in each headline. Never as a background except a thin rule.
- Gold: antique gold #B8923F for numerals, small rules, line icons and the arc; a darker gold ink #7D5F19 where gold text sits on ivory.
- Photography: full colour, warm golden-hour or blue-hour light, haze, long-lens compression. Cinematic, never flat.
- Textures, always faint (6–14% opacity): a soft translucent Indian tricolour wave behind the hero text; paisley and mandala line-art in section corners; a light paper grain over everything; thin gold hairlines as section rules.
- Type: headlines in Bodoni Moda (fallback Playfair Display), weight 500, tight leading, with the accent word in crimson italic. Body in Source Sans 3, 17px, line-height 1.6. Small-caps labels in IBM Plex Mono, 11–12px, letter-spacing 0.12em, uppercase. Japanese lines in Noto Sans JP.
- Layout: 1240px content width on a 12-column grid, 72px side gutters on desktop, generous vertical rhythm (104px between sections). Buttons 48px tall, 2px radius. Cards 6px radius with a soft shadow.

NAVIGATION (every page)
Left: the JINGI logo (a navy wordmark with a red sun mark) with "Corporate Solutions Pvt. Ltd." beside it in small caps. Centre: Home, About, Services, Contact. Right: "EN | 日本語" language switch and a crimson button "Request a consultation →". The header is transparent over the hero and becomes ivory with a hairline once scrolled.

HOME HERO — a full-viewport cinematic scene built in layers, back to front, so each layer can move independently:
1. Sky: a pale warm gradient, ivory at the horizon rising through peach to a soft blue at the top, with thin haze.
2. A large crimson sun disc, about 30% of the viewport height, rising centre-right behind the skyline, with a soft warm glow around it.
3. Far background, right side: Mount Fuji, snow-capped, hazy and distant. [Client-safe swap if needed: Tokyo's Marunouchi office district at dusk, no mountain.]
4. Mid-ground: one continuous waterfront skyline across the full width. The Gateway of India and Mumbai's waterfront on the left flow seamlessly into Tokyo's skyline with the Skytree and a bridge on the right. Still water along the bottom edge carries their reflections.
5. A thin gold arc spans over the sun. At its left foot a label block "INDIA — People · Ideas · Growth", at its right foot "JAPAN — Trust · Technology · Opportunities", both in small caps. At the apex, "A STRONGER TOMORROW TOGETHER" in small caps above a short crimson tick.
6. Foreground and atmosphere: a cherry-blossom branch entering top-right with a few loose petals; three small birds mid-sky; a faded Indian pavilion (chhatri) at the far left edge; faint mandala line-art bottom-left; the tricolour wave at 12% behind the text.
7. The text block, left third, vertically centred: kicker with a short crimson rule "FOR JAPANESE COMPANIES · INDIA"; headline in three or four lines at about 80px, "Your India operation, run the way your head office expects." with "India" in crimson italic; lead paragraph 20px muted: "JINGI incorporates, staffs, keeps compliant and reports on the Indian subsidiaries of Japanese companies. One accountable team, working in Japanese, on the ground."; a Japanese line beneath in Noto Sans JP: "日本企業のインド子会社の設立・人事・法務・会計を、日本語で、現地から一貫して支えます。"; two buttons: crimson filled "Request a consultation →" and an outlined "The four services →".
8. A strip along the bottom of the hero on the ivory base: four service items in a row, each a thin gold line icon, a bold label and a one-line description, separated by hairlines: "India business entry — from the first question to a bank-ready company", "Legal & compliance — contracts, labour law, every filing date watched", "HR & recruitment — Japanese-speaking hires, payroll, appraisals", "Accounts & taxation — books, GST, TDS, a monthly report head office can read". At the right end of the strip: "ONE OFFICE. FOUR PRACTICES. IN JAPANESE." in small caps with a crimson rule.

HOME, BELOW THE HERO
- A running ticker strip on sand: the four services, "日本語対応", "Tokyo 15:50 JST", "India 12:20 IST", "Five shared working hours a day", separated by small gold dots.
- "01 WHY JINGI" — headline "Six things you can hold us to." Split layout: a tall colour photograph of Tokyo on the left with a small gold annotation label "Tokyo · your head office", and on the right six numbered items (gold numerals 01–06), each a short serif title and two lines of text: Everything in Japanese; We know how a head office decides; We act, not only advise; One team across four functions; We stay after go-live; Careful by habit.
- "02 SERVICES" — headline "Four practices, one file on your company." Four white cards on ivory with a large ghosted gold numeral in the corner of each, a thin gold line icon, the service name in serif, one line of text, and a crimson "Explore →" link. Cards lift on hover.
- "03 HOW IT GOES" — on sand, a large statement "Every engagement runs in five visible stages, with one person accountable for all of them." with a horizontal timeline of five gold nodes 01–05 drawn beneath it, a gold path connecting them, and a link "How an engagement runs →". A large faint paisley line-art in the empty right half.
- Consultation band — the night-navy band. Left: a wireframe globe drawn in thin ivory lines with a gold great-circle route from Tokyo to India and both cities marked, "+3:30 · one desk" beneath. Right: kicker "NEXT STEP", headline "Considering India? Start with one conversation, in Japanese.", one line of text "No obligation, at whatever stage you are. A member of the team replies within one business day.", crimson button.
- Footer — night-navy. Four columns: the logo with "JINGI Corporate Solutions Private Limited / India desk for Japanese companies."; Pages; Services; Write to us with "jpdesk@jingi.co.in" and "日本語でのお問い合わせ". A legal row with "© 2026 JINGI Corporate Solutions Private Limited", Privacy · Terms, "Design: Void Craft & zxevo_dot". Beneath it all, the word JINGI set enormous in the headline serif in ivory, rising from behind a thin horizon line, with a gold arc curving behind the letters.

COMPONENTS
- Section header: a small-caps kicker with a gold numeral and a short gold rule, then the serif headline, then a hairline across.
- Numbered list item: gold mono numeral, serif title, sans text, hairline below.
- Card: white, 6px radius, soft shadow, ghosted gold numeral, line icon, crimson link.
- Photograph frame: colour photo, faint dark vignette, 1px gold inner border, small-caps annotation labels on dark chips with a gold leader line and dot.
- Buttons: crimson filled with white text, or 1px ink outline; both carry an arrow.
- "Figure pending" tag: a dashed gold outline with mono text, used wherever a real number is not yet supplied.
- Language switch: EN active on ink, 日本語 muted.

RESPONSIVE
Design at 1440 desktop, 1024 tablet, 390 phone. On the phone the hero shows the text block first and the scene beneath it as a 16:9 band with the sun and arc kept and the floating labels hidden. Navigation collapses to a menu button. Touch targets at least 44px. No horizontal scrolling anywhere.

ACCESSIBILITY
WCAG AA contrast for all text. Visible focus rings. Semantic landmarks. Japanese text marked lang="ja". Everything readable with images off.

RULES
Use only the copy given here. Do not invent people, faces, statistics, awards, a second office, a phone number, or client logos. The only office is Tower B, Spaze i-Tech Park, Sector 49, Sohna Road, Gurugram, Haryana 122018, India. The only email is jpdesk@jingi.co.in. Where a number would normally go, show the "figure pending" tag. No lorem ipsum. No stock photos of people.

FIRST OUTPUT
The Home page at 1440 wide, full length, with the hero exactly as described.
```

---

## Part B — screen prompts (one at a time, after Part A)

**Home, mobile**
```
Now the same Home page at 390 wide. Text block first, then the hero scene as a 16:9 band with the sun, arc and skyline kept and the floating labels hidden. Stack every section to one column. Keep the ticker, the six numbered items, the four cards, the timeline, the globe band and the footer wordmark.
```

**About**
```
The About page, same system. Hero on ivory: kicker "ABOUT JINGI", headline "Who answers when your head office calls." with "answers" in crimson italic, a lead: "JINGI Corporate Solutions was set up to be the one number a Japanese company dials about India: a Japanese representative director, and Indian specialists in law, people and accounts who work as one office."; right, a tall colour photograph of a modern glass office tower at dusk with the annotation "India · where it is answered". Then: a section explaining the two readings of the name, 仁義 (righteousness, the way of doing right by people) and 神器 (the sacred instruments), set as a large typographic block with the kanji in Noto Sans JP; a director's message as a blockquote with a signature line "Hisako Sugawara, Representative Director" and "菅原 久子", no photograph; a team section as a row of monogram tiles (initials in serif on sand), no faces; a row of association marks: JETRO, JCCII, IJCC; a "Where" section with a colour photograph of Humayun's Tomb in mist and a small India–Japan map with a gold arc between the two; the consultation band; the footer.
```

**Services**
```
The Services page. Hero on ivory: kicker "SERVICES", headline "Entry, legal, people, accounts. Done by one team." with "one team" in crimson italic; right, a 2×2 grid of white cards with enormous gold numerals 01–04 and the practice names in small caps beneath. A full-width colour photograph band of an industrial corridor at dawn. Then four practice sections, each with: a gold numeral kicker "SERVICE 01", the practice name in serif with its Japanese subtitle, a lead, a "What we do" list with gold dashes, a white card "What your head office receives" with four numbered lines, a colour still-life photograph (desk with documents; empty office floor; a ledger; a cleared industrial plot at sunrise), and a case row: Situation / What JINGI did / Result with a dashed gold "figure pending" tag. A process section, "How an engagement runs", five stages laid out along a drawn gold path with a node and a short paragraph each. Consultation band. Footer.
```

**Contact**
```
The Contact page. Hero on ivory: kicker "CONTACT", headline "One conversation, in Japanese, at whatever stage you are." with "Japanese" in crimson italic; right, a white card with a gold arc from Tokyo to India and two large clocks beneath, "Tokyo · JST 15:50" and "India · IST 12:20" in the serif with lining figures. Below: a two-column layout. Left: a form with Company, Name, Email, Service (select), Message, and a "Reply in: Japanese / English" choice, a crimson submit button "Send request →", and a note "This opens your mail app; we never store the form". Right: Office with the address "Tower B, Spaze i-Tech Park, Sector 49, Sohna Road, Gurugram, Haryana 122018, India" and an "Open in Maps →" link; Hours "Mon–Fri, 09:30–18:00 IST"; Write "jpdesk@jingi.co.in"; Japanese desk "日本語でのお問い合わせ". Then a short FAQ as an accordion. Footer.
```

**Legal**
```
The Legal page as a document: a sticky table of contents on the left, Privacy Notice and Terms of Use on the right in a readable measure, numbered headings, a dashed gold badge "Draft · under counsel's review" at the top. Ivory, no photographs. Footer.
```

---

## Part C — refinement prompts (use any, in any order)

```
Push the hero's depth: make the skyline three separate layers (far, mid, near) with more atmospheric haze between them, increase the sun's glow, and let the water reflection soften toward the bottom edge.
```
```
The hero text is competing with the scene. Fade the scene to 70% behind the left third and strengthen the tricolour wave slightly, so the headline sits on a calmer field.
```
```
Make the service cards more premium: bigger ghost numerals, thinner line icons, more whitespace inside, a 1px gold top rule that appears on hover.
```
```
The night-navy band feels flat. Add a faint globe graticule texture across it at 8% and a soft light from the upper left behind the globe.
```
```
The footer wordmark should be enormous, at least 60% of the viewport width, ivory on navy, the gold arc passing behind the letters, a thin horizon line at the baseline.
```
```
Mobile: reduce the hero to text first, then a 16:9 scene band. Make every touch target at least 44px. Keep the ticker.
```
```
Warmer overall. Shift the photographs toward golden hour, add 2% more paper grain, and make every hairline gold at 30% instead of grey.
```

---

## Part D — the motion spec (for the code step, not for Stitch)

Timings and easing for the whole site: quick 240ms, base 400ms, reveal 700ms, ceremony 1600ms; easing `cubic-bezier(.16,1,.3,1)`; exits shorter than entrances; everything respects `prefers-reduced-motion` by resting at its end state.

**Hero ceremony on load, about 2.2s in total**
1. The sun rises from behind the skyline over 1.6s.
2. The gold arc draws from the left foot to the right over 1.4s, starting 0.4s in; the apex label fades up when the arc completes.
3. The two label blocks fade and rise 12px, staggered 120ms.
4. The headline rises word by word out of a mask, 1.1s, 45ms stagger; the crimson word last.
5. The lead, the Japanese line and the buttons fade and rise 18px, 80ms stagger.
6. The skyline layers settle into place from small offsets: far 12px, mid 24px, near 36px.
7. Ambient loops: petals drift down and across on a 30s loop; the birds drift slowly; the water reflection shimmers by a few percent of opacity; the tricolour wave drifts on a 60s loop. All paused when the hero is off screen.

**Mouse parallax on the hero (desktop only)**
Layers shift inversely with the cursor: sky 4px, sun 8px, mountain 10px, skyline 14–22px by depth, petals 26px. Eased over 600ms. Off on touch.

**Scroll**
- Hero layers move at 0.2 / 0.5 / 0.8 of scroll speed by depth. The sun sinks slightly. The scene scales to 0.96 and fades over the hero's height while the services strip slides up over it.
- Every section reveals with a 16px rise and fade over 600ms, items staggered 80ms.
- The section rule draws from left to right before its headline.
- The timeline path draws (stroke-dashoffset) and each node lights as the path reaches it, scrubbed to the scroll.
- The globe turns from Tokyo to India as the band scrolls through, the route drawing between them, scrubbed.
- The statement headline lifts word by word from 55% to full opacity as it is read, scrubbed.
- The footer wordmark: letters rise out of masks, the horizon draws, the arc completes, all on one scrubbed timeline.

**Hover**
Buttons darken to #7C1119 over 240ms. Cards lift 4px and their gold top rule sweeps across over 700ms. Text links sweep an underline from left to right. Photographs scale 1.03 inside their frame.

**Page transitions**
Leaving a page raises a navy curtain over 450ms; the next page arrives already covered and lifts the curtain over 700ms as its own hero ceremony starts.

**Not used**
No cursor followers, no magnetic buttons, no horizontal scroll sections, no 3D card tilts, no particle systems beyond the petals.

---

## How to use it

1. Paste Part A. Let Stitch produce the Home desktop screen.
2. If the hero is not a layered scene, paste the first Part C prompt before anything else. The scene is the point.
3. Generate the other screens with Part B, one at a time.
4. Export, then hand Part D to the build. Stitch will not animate; the build will.
5. Send me the exported code or Figma and I wire the motion, the globe and the real copy, and run the checks.
