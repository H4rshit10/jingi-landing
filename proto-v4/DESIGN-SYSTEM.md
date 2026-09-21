# JINGI — design system

Every value below is read out of the shipped prototype in `proto-v4/`, not
proposed. Stylesheets stack in this order and the last one wins:
`site.css → site-v2.css → site-v3.css → site-v4.css → theme.css → scene.css`.

The system is written entirely against tokens. Redefining the tokens
re-colours the whole site; nothing hard-codes a colour except white cards and
the shadows.

---

## 1. Who this is for, and the one idea

JINGI Corporate Solutions sets up and runs the Indian subsidiaries of Japanese
companies: market entry, legal and compliance, HR and recruitment, accounts
and taxation. The reader is a Japanese head-office manager who has to trust a
company on the other side of the continent.

**The idea: Japanese discipline, Indian subject.** Order, numbering,
whitespace and bilingual precision come from Japan. The work, the places and
the photographs are India. Nothing decorative is added that does not carry
information.

---

## 2. Colour

Every value below is the brand guide's own token. The warm-brown ink that
stood in `--navy` until 2026-09-21 read as mud, especially behind photography,
and was replaced by the guide's indigo.

```css
/* surfaces */
--paper:#F7F3EA;      /* washi, the page */
--paper-2:#EDE6D6;    /* khadi, alternate bands and hovers */
--line:#DED5C3;       /* hairlines */
--line-2:#C2B6A0;     /* hairlines that must be seen */

/* ink */
--ink:#1C1D26;        /* headings, strong text */
--text:#454A5C;       /* body */
--muted:#5D6170;      /* captions, meta, kickers */

/* the dark bands: night and kon, the guide's indigo */
--navy:#111B38; --navy-2:#1F3266;
--on-navy:#F7F3EA; --on-navy-muted:#AAB4CC;
--line-navy:rgba(247,243,234,.16);

/* gold: numerals, rules, ornament */
--brass:#86611F;      /* brass-ink, gold on ivory */
--brass-2:#C9A15B;    /* brass, gold on dark */
--rule-brass:rgba(201,161,91,.42);

/* crimson: the only action colour */
--accent:#9B1C24; --accent-2:#7C1119;
```

**Rules.**

- Crimson appears about once per screen: the primary button, the one italic
  word in a headline, the hover state of a text link. Never as a background
  panel, never as a flag.
- Gold is for numerals, rules, small ornament and icon strokes. Never for a
  paragraph.
- Indigo carries the dark bands, the annotation labels over photographs and the
  consultation band. Warm brown is not in the palette at all.
- Near-white (`#FBF8F2`) is not a surface, it is a card: the four numbered
  cards, the contact clock box and the About hero index sit on it so they lift
  off the ivory.
- Photographs run in full colour, `saturate(.96) contrast(1.05)`. No sepia, no
  duotone — the two SVG filters (`#warm`, `#duo`) are left in the markup but
  nothing uses them any more.

**Measured contrast** (every pair the site actually uses; all pass WCAG AA for
normal text, lowest 4.95):

| pair | ratio |
|---|---|
| ink on paper | 15.13 |
| text on paper | 7.94 |
| muted on paper | 5.56 |
| brass on paper | 5.07 |
| accent on paper | 7.34 |
| white on accent | 8.12 |
| ink on paper-2 | 13.48 |
| muted on paper-2 | 4.95 |
| ink on card | 15.81 |
| muted on card | 5.81 |
| brass on card | 5.29 |
| on-navy on navy | 15.32 |
| on-navy-muted on navy | 8.17 |
| brass-2 on navy | 7.06 |
| on-navy on navy-2 | 11.11 |
| brass-2 on navy-2 | 5.12 |

---

## 3. Type

```css
--serif:"Fraunces","Iowan Old Style","Palatino Linotype",Georgia,serif;  /* headings */
--sans:"Instrument Sans","Segoe UI",system-ui,sans-serif;               /* everything else */
--mono:"DM Mono","Cascadia Mono",Consolas,monospace;                    /* kickers, meta, clocks */
--jp:"Noto Sans JP","Hiragino Sans","Yu Gothic UI",sans-serif;          /* Japanese only */
```

One web-font request:

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..600&family=Instrument+Sans:ital,wght@0,400..600;1,400..600&family=DM+Mono:wght@400;500&family=Noto+Sans+JP:wght@400;500&display=swap" rel="stylesheet">
```

Fraunces is variable on four axes: `opsz` 9–144, `wght`, `SOFT` and `WONK`.
**Always set `font-variation-settings:"opsz" N,"SOFT" 0,"WONK" 0`** — `opsz`
near the size you are setting, or the thin strokes break up on screen, and
`WONK` pinned to 0, because the playful cut it turns on is wrong for this
client. Only `ital,opsz,wght` are requested from Google, so `SOFT`/`WONK` are
already fixed at 0 in the served file; the declaration is belt and braces.

| role | size | line | family | notes |
|---|---|---|---|---|
| home h1 (scene) | `clamp(38px,4.05vw,62px)` | 1.04 | serif 500 | opsz 96, max 16ch |
| inner-page h1 | `clamp(36px,4.6vw,62px)` | 1.02 | serif 500 | opsz 96, max 16ch |
| h2 | `clamp(30px,3.3vw,46px)` | 1.08 | serif 500 | opsz 56 |
| h3 | `clamp(22px,2vw,27px)` | 1.2 | serif 500 | opsz 24 |
| h4 | 19px | 1.3 | serif 500 | opsz 18 |
| body | 17px | 1.6 | sans 400 | colour `--text` |
| `.lead` | `clamp(18px,1.45vw,21px)` | 1.55 | sans 400 | max 62ch |
| `.k` kicker | 12px | — | mono 400 | `.09em`, uppercase, `--muted` |
| `.num` | 13px | — | mono 500 | `.06em`, `--brass` |
| `.ja` | 15px | — | jp 400 | `--muted`, `font-feature-settings:"palt"` |
| small | 14px | — | sans | `--muted` |
| footer wordmark | display | — | serif 500 | opsz 144, `.03em` — parked since 2026-09-21, markup commented out on every page |

**Rules.**

- Measure is 62ch for any paragraph, 16ch for a headline.
- Numerals in clocks and figures: `font-variant-numeric:lining-nums tabular-nums`.
- Japanese text carries `lang="ja"` and only then gets the JP family. Never set
  Latin text in a Japanese face, and never use kanji as ornament.
- One italic word per headline, in crimson, and only when it is the subject
  word ("Your *India* operation").

---

## 4. Rhythm and layout

```css
--gutter:clamp(20px,5vw,72px);
--max:1240px;
--sp-1:8px; --sp-2:16px; --sp-3:24px; --sp-4:40px;
--sp-5:64px; --sp-6:104px; --sp-7:160px;
--ease:cubic-bezier(.16,1,.3,1);
```

- `.wrap` is the container: `max-width:var(--max)` plus the gutter.
- `.section` is `padding-block:var(--sp-6)`; `.section.tight` uses `--sp-5`.
- `.split` is the page workhorse: `minmax(0,5fr) minmax(0,7fr)`, left column
  sticky at `top:96px`. Also `.grid-2` and `.grid-3`.
- Corner radius is **2px** everywhere. There are no rounded cards, no pills.
- Borders are 1px hairlines in `--line`. Shadows appear once, on the contact
  receipt panel; everything else is flat.
- One breakpoint carries the site: **900px**, where every grid becomes one
  column, the navigation becomes a sheet and the scene hero stacks. The strip
  under the hero adds 1100px and 560px.

---

## 5. Components, by the class that names them

| class | what it is |
|---|---|
| `.site-head` | sticky bar, 76px, blurred paper, hairline appears on scroll (`.scrolled`); `.on-navy` when it sits on a hero |
| `.nav a` | 15px link, underline wipes in from the left in crimson |
| `.nav .cta` | outlined button in the bar |
| `.lang` | EN / 日本語 toggle, mono, 2px box |
| `.btn` | 15px sans 500, `15px 22px`, min-height 48px, crimson, 2px radius, arrow SVG at the end |
| `.tlink` | text link on a hairline; the arrow slides 3px on hover |
| `.hero2.scene` | the home hero: see §6 |
| `.strip` | the four practices under the hero: gold line icon, name, one line |
| `.page-hero` | inner-page hero: crumbs, kicker, h1, lead, JA line, `.jump` index |
| `.hero-index` | the About hero right column: a card of five ruled rows, each a numbered section of the page with one line of its own copy. Navigation and precis at once — it replaced a weak photographic plate on 2026-09-21 |
| `.rows-list` | numbered rows with a rule between them. **The site's answer to cards** |
| `.reasons` | six numbered rows, two-up across the full measure. (`.reasons2`, the sticky-photograph variant, is unused since 2026-09-21) |
| `.stageline` | a process as a line that fills as you scroll |
| `.quad` | four numbered white cards with gold figures |
| `.arcbox` | white card with the working-day arc and both clocks |
| `.frame` | a photograph with a gold inset rule and optional annotations |
| `.statement` | one large serif sentence, alone on its band |
| `.band` / `.day` | the working-day chart, JST 06:00 to 24:00, shared hours in gold |
| `.site-foot` | dark warm-ink band with the wordmark |

**There are no cards on this site except `.quad`.** Rows, rules and numbers do
the work that boxes do elsewhere. If a layout wants a card, it wants a row.

---

## 6. The home hero: a composed scene

One picture built from separate plates, India on the left and Japan on the
right, as they sit on a map. Every plate hangs inside `.scene-box`, a box with
the plates' own aspect ratio (1672:941), so the plates stay registered with
each other at any viewport.

Back to front: sky, saffron and green ribbons, sun, gold arc, Japan plate,
New Delhi plate with its reflection, birds, paper wash, blossom branch,
captions, petals, mandala.

Placement is variables, not magic numbers:

```css
--sun-x:51.3%; --sun-y:28.3%; --sun-w:23%;
--india-x:27%; --india-b:14%; --india-w:34%;
--scene-h:clamp(600px,calc(100svh - 112px),860px);
```

The only words inside the picture are true ones: two live clocks (IST, JST)
and "Five shared working hours a day" at the top of the arc. Removing the sun,
the mountain or the blossom is deleting one `.sl` element.

---

## 7. Motion

Duration and easing are part of the palette.

- **Ease**: `cubic-bezier(.16,1,.3,1)` for interface, `expo.out` for entrances,
  `power2.inOut` for lines that draw, `none` for anything tied to the scrollbar.
- **Hover**: 250ms. **Navigation underline**: 300ms. **Page curtain**: 450ms.
- **Hero opening**, about two seconds total: kicker up 14px, rule draws,
  headline rises line by line behind a mask (`yPercent:110`, stagger 45ms),
  lead and buttons up 18px (stagger 80ms), sun rises, the two halves of the arc
  draw outward, captions fade in, the strip staggers.
- **On scroll**: near plates leave faster than far ones; photographs parallax
  about 5%; arcs and rules draw once at `top 85%`; the process line fills with
  scrub; the footer wordmark rises letter by letter.
- **Under the cursor** (fine pointer only): the hero plates part by depth, the
  furthest travelling about 30px, and the whole picture leans about one degree.

**The contract, and it is not negotiable.** Nothing is hidden in CSS. Every
start state is set in JavaScript, and only when GSAP is present and the visitor
has not asked for less motion. The page is complete and correct with scripts
off, and under `prefers-reduced-motion:reduce` everything arrives already in
place. Ambient loops pause when their section is off screen.

---

## 8. Accessibility, as built

- Focus is visible everywhere: `2px solid var(--ink)`, `outline-offset:3px`.
- Interactive targets are at least 44px tall, 48px for buttons.
- Decorative SVG carries `aria-hidden="true" focusable="false"`; decorative
  images take `alt=""`.
- Landmarks and one `h1` per page; headings never skip a level.
- No information is carried by colour alone.
- Every pair in §2 passes AA.

---

## 9. Content rules that the design depends on

These are why the layout looks the way it does, so a redesign must keep them.

1. **Never invent a fact.** No figures, no client names, no staff, no years, no
   testimonials, no awards. A number we do not have appears as "figure pending".
2. Real and usable today: the email `jpdesk@jingi.co.in`, and the office at
   Tower B, Spaze i-Tech Park, Sector 49, Sohna Road, Gurugram, Haryana 122018.
   The city name appears only where an address or a legal line needs it.
3. **No sentence appears on two pages.** Each page earns its own copy.
4. Bilingual by design: one Japanese line under each English lead, written for
   a Japanese reader, not translated word for word.
5. Photographs are of India: Delhi and the NCR, warm light, no people, no
   signage, no flags. The home hero's scene is the one deliberate exception and
   its Japanese elements are each one deletable element.

---

## 10. The pages, and what each one is for

| page | job | spine |
|---|---|---|
| `index.html` | make a stranger trust us in one screen | scene hero, strip of four practices, why JINGI, how it goes, statement, consultation band |
| `services.html` | the four practices in detail | page hero with jump index, four numbered sections as rows |
| `about.html` | who is accountable and how they work | page hero, sticky photograph beside the numbered account of the firm |
| `contact.html` | get an enquiry, in either language | page hero with the working-day arc and both clocks, form, real address |
| `legal.html` | the small print | page hero, plain prose at 62ch |

No build step. Plain HTML, one stylesheet stack, GSAP and ScrollTrigger
vendored locally, no framework, no bundler.
