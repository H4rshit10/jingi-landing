# The prompt for Claude

How to use this: open Claude, attach `DESIGN-SYSTEM.md`, paste **Part A**, and
then paste one page brief from **Part B**. Part C is what to send back when the
first attempt is close but not right.

If you cannot attach the file, paste the whole of `DESIGN-SYSTEM.md` where
Part A says to.

---

## Part A — paste this first

You are building one page of a real website for JINGI Corporate Solutions Pvt.
Ltd., an India-based firm that sets up and runs the Indian subsidiaries of
Japanese companies: market entry, legal and compliance, HR and recruitment,
accounts and taxation. The reader is a manager at a Japanese head office who
has to decide whether to trust a company on the other side of the continent.

The design system is in the attached `DESIGN-SYSTEM.md`. Read it before you
write anything. It is not inspiration, it is the specification: the tokens,
the type scale, the spacing, the component list and the motion contract are
already shipped and other pages already look like that. Your page has to sit
next to them without anyone noticing a seam.

### How to build it

- One self-contained HTML file. Plain HTML and CSS, no framework, no build
  step, no Tailwind, no CSS-in-JS. GSAP 3 with ScrollTrigger from a CDN is the
  only script dependency, and the page must be complete without it.
- Use the tokens as CSS custom properties exactly as the system names them.
  Never write a raw hex value except `#fff` for a card and rgba shadows.
- Reuse the component classes the system lists. If you need something that is
  not there, build it out of rows, rules and numbers rather than inventing a
  card, and say in one line why the existing components did not fit.
- Semantic HTML: one `h1`, headings in order, real landmarks, `lang="ja"` on
  every Japanese string, `alt=""` on decorative images, `aria-hidden="true"`
  on decorative SVG.
- Mobile first at 390px, then the 900px breakpoint the system uses. No
  horizontal scroll at any width.

### The motion contract, which is the part most people get wrong

Nothing may be hidden in CSS waiting for JavaScript to reveal it. Set every
animation start state in JavaScript, and only after checking that GSAP loaded
and that `prefers-reduced-motion` is not set. The page must be complete and
readable with scripts blocked, and under reduced motion everything arrives
already in place. Ambient loops pause when their section leaves the viewport.

Motion is: entrances of about 0.7 to 1.1 seconds on `expo.out`, hovers at
250ms, lines that draw on `power2.inOut`, and anything tied to the scrollbar on
`ease:"none"`. Nothing bounces, nothing spins, nothing slides in from off
screen for decoration.

### Content rules, which are absolute

1. **Invent nothing.** No figures, no client names, no staff names, no founding
   year, no testimonials, no awards, no case studies. If a number would make
   the layout sing, write `figure pending` and leave the slot.
2. The only real details you may use: the email `jpdesk@jingi.co.in` and the
   office at Tower B, Spaze i-Tech Park, Sector 49, Sohna Road, Gurugram,
   Haryana 122018. Use the city name only in an address or a legal line.
3. Write the copy yourself, in the system's voice: short declarative
   sentences, no marketing adjectives, no "seamless", no "leverage", no
   "one-stop solution". Say what happens and who does it.
4. One Japanese line under the lead, written for a Japanese reader rather than
   translated word for word.
5. No sentence may repeat a sentence that already exists on another page of
   this site.

### What to send back

The complete HTML file, then a short note listing: which component classes you
reused, anything new you had to add and why, and the one thing you are least
sure about. Do not explain the code line by line.

---

## Part B — the page brief, pick one

**Home.** One screen has to earn trust. The hero is a composed scene: India on
the left, Japan on the right, a sun between them and a gold arc joining the
two, carrying only two live clocks and the words "Five shared working hours a
day". Below it, a strip of the four practices with a gold line icon and one
sentence each. Then: why a Japanese company would use a local firm at all, how
an engagement actually goes from first call to running subsidiary, one large
sentence alone on its band, and a consultation band that ends the page.

**Services.** The four practices in full: India business entry, legal and
compliance, HR and recruitment, accounts and taxation. A page hero with a jump
index, then four numbered sections built as rows, each saying what is included,
what the client has to provide and roughly how long it takes. No pricing.

**About.** Who is accountable and how the firm works, not a story about
passion. A sticky photograph of the NCR beside a numbered account: how the team
is structured, how reporting to a head office works, which languages are
spoken, what happens when something goes wrong.

**Contact.** Make an enquiry easy in either language. A page hero with the
working-day arc and both clocks, a form with visible labels and inline
validation, the real address, and a plain statement of what happens after the
form is sent and how long a reply takes.

**Legal.** Privacy and terms in plain prose at 62 characters a line. No
decoration at all.

---

## Part C — what to send back when it is close

Use the line that matches what went wrong. One at a time.

1. "It reads as a generic template. Go back to `DESIGN-SYSTEM.md` §5: this site
   has no cards. Rebuild the [section] as numbered rows with hairlines."
2. "The type is flat. Fraunces needs `font-variation-settings:"opsz" N,"SOFT" 0,"WONK" 0`
   matched to each size, and the headline measure is 16ch, not the full column."
3. "Too much crimson. It appears about once per screen. Everything else is ink,
   muted and gold."
4. "The motion breaks the contract. Something is hidden in CSS. Set every start
   state in JavaScript after the GSAP and reduced-motion checks, and show me
   the page works with scripts off."
5. "You invented [x]. Remove it and write `figure pending`."
6. "It is crowded. The section padding is 104px and paragraphs stop at 62
   characters. Give it the whitespace the system asks for."
7. "The Japanese line reads like a translation. Write it for a Japanese reader
   instead."

---

## What this prompt will not give you

A page generated this way still needs the real plates. The photographs and the
hero's scene plates are generated separately, to the rules in `BRIEF.md`, and
dropped into `assets/`. Ask for image placeholders at the right aspect ratio
and swap them later.
