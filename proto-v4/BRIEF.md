# JINGI v4 — image brief and motion menu

For Ankit. This is the image-rich build. It lives here, separate from `proto/`
(v3) and it is never pushed to Harshit's repository.

Everything below is either a plate for you to generate, or a motion technique
with its proper name so we can talk about it. Content and page decisions stay
with me; the copy does not change.

---

## Part 0 — the scene hero (added 2026-09-21, overrides Part 1 for the home hero)

The home hero is no longer one photograph. It is a composed scene built from
separate plates, India on the left and Japan on the right, after the mockup
you approved. Your call on the imagery stands: red sun, Fuji and blossom are
in. Each is its own element, so taking one out is deleting one `.sl` block in
`index.html`.

**The stack, back to front** (`assets/scene.css`, `assets/scene.js`):
sky, saffron and green ribbons, sun, gold arc, Japan plate, New Delhi plate
with its reflection, birds, paper wash, blossom branch, captions, petals,
mandala. Every plate hangs in `.scene-box`, a box with the plates' own aspect
ratio (1672:941), so they stay registered at every viewport.

**Motion:** sun rises and the arc draws itself on load, about two seconds.
Plates part under the cursor by depth and the whole picture leans about one
degree. On scroll the near plates leave faster than the far ones. Ribbons,
birds, petals and mandala drift in CSS and pause when the hero is off screen.
Phone gets the picture on top and the words on clean paper, no pointer motion.
No script or reduced motion: the finished picture, still.

**Facts in the picture, none invented:** two live clocks (IST, JST) and
"Five shared working hours a day". The ticker is gone; its content moved into
the captions and the strip of four practices under the hero. The home page's
"Services" rows went, because the strip does that job once.

**Clean pass:** the lattice, the graticule band and the meridians on light
ground are off on every page. The dark bands keep theirs.

**Plates in use today** (`assets/scene/`): `sky.webp`, `sun.webp`,
`japan.webp`, `sakura.webp` from the earlier layers study, and
`assets/photo-delhi.jpg` as the India side. The India plate is the weak one:
it is a photograph held in a soft window, not a cut-out in the same hand as
the Japan plate.

**Plates to generate next, once an image generator is connected** (same
painterly-photographic hand as `japan.webp`, transparent background, 1672x941
canvas so they drop into the same box):
1. `india.webp`: New Delhi's Secretariat domes and India Gate at golden hour,
   trees at the base, standing on the left 40% of the canvas, waterline at 85%.
2. `japan.webp` redo without the pagoda on its left third, so no mask is needed.
3. `sky.webp` wider (21:9) so the left fade can be gentler.

Part 1's "never in frame" rule still holds for every other photograph on the
site. It no longer applies to the home hero.

---

## Part 1 — the plates

### Rules that apply to every prompt

- **Photographic, not illustrated.** Cinematic still, natural colour. I tone
  every plate in CSS to the same navy-and-gold, so the generator's colour does
  not need to match between images; the *light* does.
- **Light:** golden hour or blue hour, haze, long lens. Never flat midday.
- **Never in frame:** people, text, signage, logos, watermarks, flags of any
  country, Mount Fuji, cherry blossom, a red sun, lanterns, pagodas, torii.
- **Composition:** the subject on one side, calm sky or space on the other. I
  say which side per plate, because the headline sits in the empty side.
- **Size:** at least 2400px on the long edge. JPG. Name the file as given and
  drop it in `proto-v4/assets/`.
- **Aspect ratio** is per plate. If your tool takes `--ar`, use that.

Paste the prompt line as is. Paste the negative line into the negative field
if your tool has one, otherwise append it as "avoid: …".

### The plates, in the order I need them

**1. `hero-rajpath.jpg` — Home hero. 21:9. Subject right, open sky left.**
> Rashtrapati Bhavan and the Rajpath in New Delhi seen from far down the avenue at dusk, long telephoto compression, warm golden haze, the dome sitting small in the right third of the frame, wide empty sky across the left two thirds, cinematic still, photorealistic, ultra wide 21:9

> negative: people, cars, text, signage, watermark, flags, Mount Fuji, cherry blossom, red sun, illustration, painting

**2. `cybercity-dusk.jpg` — Home, "Why JINGI" sticky plate. 4:5 portrait.**
> Gurugram Cyber City glass office towers at blue hour, the elevated metro viaduct curving through the lower foreground, office lights just switched on, cool sky with a warm horizon, telephoto, portrait 4:5, photorealistic

> negative: people, text, signage, logos, watermark, flags, illustration

**3. `manesar-dawn.jpg` — Services page, band under the hero. 16:9.**
> An industrial corridor outside Gurugram at dawn: long rows of factory sheds and a straight highway with thin morning mist, soft warm backlight, high vantage point, wide 16:9, photorealistic

> negative: people, vehicles, text, signage, watermark, illustration

**4. `plot-sunrise.jpg` — Services, practice 01 "India business entry". 4:3.**
> A cleared industrial plot at sunrise on the outskirts of Gurugram: a fresh boundary wall, a newly paved access road, survey markers, wide morning sky, warm low light, 4:3, photorealistic

> negative: people, text, signage, watermark, illustration

**5. `desk-documents.jpg` — Services, practice 02 "Legal & compliance". 4:3.**
> A tidy office desk beside a window in morning light: a stack of printed documents held with a paper clip, a fountain pen, a rubber stamp, a closed laptop, shallow depth of field, warm natural light, 4:3, photorealistic

> negative: people, legible text on the pages, logos, watermark, illustration

**6. `office-floor.jpg` — Services, practice 03 "HR & recruitment". 4:3.**
> An empty modern office floor in the morning, rows of clean desks with chairs, large windows with soft daylight, a few plants, calm and orderly, 4:3, photorealistic

> negative: people, screens switched on, text, signage, watermark, illustration

**7. `ledger.jpg` — Services, practice 04 "Accounts & taxation". 4:3.**
> Close-up of a printed financial report and a bound ledger on a wooden desk, a calculator and reading glasses beside them, warm side light, shallow depth of field, 4:3, photorealistic

> negative: people, legible numbers or text, logos, watermark, illustration

**8. `expressway-night.jpg` — Home consultation band, and the Contact hero. 21:9.**
> The Delhi–Gurugram expressway at night from a high vantage point, long-exposure light trails curving toward the city, deep navy sky, warm sodium street lights, ultra wide 21:9, photorealistic

> negative: people, text, signage, watermark, illustration

**9. `humayun-mist.jpg` — About, "Where" section. 16:10.**
> Humayun's Tomb in New Delhi on a misty winter morning, seen straight on across the garden's water channel, pale warm light, symmetrical and restrained, 16:10, photorealistic

> negative: people, text, watermark, flags, illustration

**10. `office-tower.jpg` — About hero. 4:5 portrait.**
> A modern glass office tower in Gurugram at dusk seen from street level looking up, clean lines, warm interior lights, soft blue sky, portrait 4:5, photorealistic

> negative: people, signage, logos, text, watermark, illustration

**11. `marunouchi-dusk.jpg` — optional, replaces the current Tokyo plate. 4:5.**
> Tokyo's Marunouchi office district at dusk seen from the Tokyo Station forecourt, orderly office towers, warm window lights, portrait 4:5, photorealistic

> negative: people, Tokyo Tower, Mount Fuji, cherry blossom, text, signage, watermark, illustration

### Not from a generator, ever

These need the client. Nothing AI-made stands in for them, because they are
claims about real people and a real place:

- The office exterior at Spaze i-Tech Park (replaces plate 10 at launch).
- The director's portrait, for the message on About.
- The team at their desks, for the People section.

And a warning about the mockups you shared: they carry a Lucknow head office,
a Tokyo liaison office, a Lucknow phone number, an `info@` email and four
named staff with AI faces. None of that is real. Nothing from those images
comes into the build as text.

---

## Part 2 — the motion menu

The scroll-driven motion you have seen in videos is a small family of named
techniques. Here they are, what each does in one line, and where it goes.

### Already in the build (v3)

| Name | What it does | Where |
|---|---|---|
| Split-text reveal | The headline rises word by word out of a mask | Every hero |
| Clip-path wipe | A photograph opens from the top edge | Every photograph |
| Ken Burns | A still settles slowly from 116% to 100% | Every photograph |
| SVG line drawing | A line draws itself along its path | The arc |
| Scroll scrubbing | Progress is tied to the scrollbar, so scrolling back reverses it | Stage line, rail, footer |
| Reading light | Words lift from 55% to full as you read | Home statement |
| Marquee | A strip runs continuously | The ticker |
| Page curtain | A navy sheet covers the exit, the next page reveals itself | Every link |
| Staggered reveal | Items arrive one after another, 16px, 0.6s | Lists, cards |

### Built in this pass, no images needed

| Name | What it does | Where |
|---|---|---|
| **The turning globe** | A wireframe globe turns from Tokyo to India as you scroll, and the route draws between the two cities. This is the "rotating on scroll" effect you described, done as the brand device instead of a product shot. Technique: scroll-scrubbed canvas with an orthographic projection. | Home, consultation band |
| Layered parallax | The photograph, the graticule, the headline and the texture move at four different speeds, which is what gives a hero depth | Home hero |
| Ambient drift | The jaali texture drifts one tile in about a minute, paused when off screen | Textured sections |

### Recommended next, once the plates are in

| Name | What it does | Where | Note |
|---|---|---|---|
| Pinned scrollytelling | The section locks in place and its content changes as you scroll through five steps | Services, the process | This is the strongest fit for "five visible stages, in order" |
| Scale on scroll | The hero plate shrinks slightly as you leave it and the next section slides over | Every hero | Subtle, 100% to 92% |
| Smooth scroll (Lenis) | The buttery inertia those videos have. A library that takes over scrolling | Site-wide | Try it once the images are in. It is a switch: off for touch and reduced motion. It also changes how find-in-page behaves, so we test before keeping it |
| Number counters | Figures count up when they come into view | Case figures | Only when JINGI gives real numbers |
| Image sequence scrubbing | Frames of an object play as you scroll, the Apple product-page effect | Nowhere yet | Needs a product or object. We have none. Listed so you know its name |

### Not for this audience

| Name | Why not |
|---|---|
| Cursor follower, magnetic buttons | Reads as an agency portfolio, not a corporate services firm |
| Horizontal scroll sections | Disorienting on a laptop trackpad, which is what a Japanese executive is holding |
| 3D card tilt, hover flip | The "funky" you said no to |
| Particles, floating petals | The postcard again |

---

## Part 3 — what changes on the pages

Decided by me, per your instruction, once the plates are in:

- **Home.** Hero becomes full-bleed on `hero-rajpath.jpg` with the four-layer
  parallax. "Why JINGI" swaps the Tokyo plate for `cybercity-dusk.jpg`. The
  consultation band carries the turning globe over `expressway-night.jpg`.
- **Services.** `manesar-dawn.jpg` runs as a band under the four numerals. Each
  practice gets its still-life plate beside the "What your head office
  receives" panel. The process section becomes pinned scrollytelling.
- **About.** Hero on `office-tower.jpg`, with the buta motif in brass in the
  corner. "Where" swaps to `humayun-mist.jpg`.
- **Contact.** Hero on `expressway-night.jpg` behind the arc and the clocks.
- **Legal.** No images. It is a document.

Textures across the site: the globe graticule (from v3), plus a **jaali**
lattice on paper sections, and a **buta** motif in the corner of two navy
heroes. Both are drawn in code, no image needed. Both are Indian, and neither
can be read as Japanese ornament.

Tone: plates run in full colour with a light warm grade in CSS, on the ivory,
charcoal, crimson and gold theme. No duotone. The tone is applied by the
stylesheet, so the plates themselves only need consistent light.

## Part 6 — corrections of 2026-09-21 evening

Four things came back from Ankit on `about.html`, and all four are fixed
across the whole of proto-v4, not just that page.

**The brown is gone.** The warm-ink palette taken from the AI mockups
(`--navy:#1F1D1B`, `--brass:#7D5F19`, plus a `sepia(.1)` on every plate and
warm-ink annotation pills) read as mud. Colour is now the brand guide's own
tokens verbatim: washi `#F7F3EA` and khadi `#EDE6D6` paper, night `#111B38`
and kon `#1F3266` for the dark bands, brass-ink `#86611F` on light and brass
`#C9A15B` on dark. Crimson `#9B1C24` stays as the single action colour. The
sepia is removed; plates run `saturate(.96) contrast(1.05)`. Annotation
labels over photographs are now paper-white on solid indigo, with gold kept
for the dot and the leader line only — gold type on a translucent warm plate
was the mud. Measured: 16 pairs, all WCAG AA, lowest 4.95:1.

**New type.** Bodoni Moda / Source Sans 3 / IBM Plex Mono out; **Fraunces**
(display, `opsz` 9–144, `SOFT` 0, `WONK` 0 pinned), **Instrument Sans**
(text) and **DM Mono** (kickers and meta) in. Noto Sans JP is unchanged.

**The giant footer wordmark is parked**, not deleted — the `.foot-mark` block
is commented out on all five pages with a note, and `site.js` already guards
on it being absent.

**The Tokyo tower plate is out of both places it appeared.** On the home page
the six reasons now run two-up across the full measure instead of one narrow
column beside a weak crop. On About, its place in the hero is taken by
`.hero-index`: a card of five ruled rows, one per section of the page,
numbered, each with a line of its own copy, linking to new section anchors
(`#name #message #team #network #where`). It is navigation and a precis at
once, which is what the photograph was failing to be.

Verified by `v4-verify.cjs` in the session scratchpad: tag balance, every
local file reference, every in-page and cross-page anchor, no live reference
to the removed markup, no stale token anywhere in the six stylesheets, and
the contrast table above. 430 checks, all passing.
