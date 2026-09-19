# JINGI — landing page prototype

A single-file landing page for **JINGI Corporate Solutions**, a firm that helps
Japanese companies set up and run operations in India.

Everything ships from one HTML file plus self-hosted dependencies. There is no
build step: clone it, serve the folder, open the page.

```bash
python -m http.server 8080
# → http://localhost:8080/JINGI-Layers.html
```

Serve it over HTTP rather than opening the file directly — `file://` blocks the
font stylesheet.

## What's here

| Path | |
|---|---|
| `JINGI-Layers.html` | the page: markup, styles and motion in one file |
| `assets/` | the two corner plates used by the About section |
| `fonts/` | self-hosted Mukta, Shippori Mincho, Zen Kaku Gothic New |
| `vendor/gsap/` | GSAP 3.13.0 + ScrollTrigger |

No external requests at runtime. Fonts and GSAP are served from this repo, which
keeps the page working offline, removes a third-party font request, and pins the
animation library to a known version instead of a floating CDN tag.

## Sections

Hero · About JINGI · Services · Why JINGI · How we work · Contact · Footer

## The motion language

Timings come from a brand motion spec built on two ideas — *Ma* (間, the
meaningful pause) and *Laya* (लय, rhythm). They live as CSS custom properties
rather than numbers scattered through the JavaScript:

```
--dur-instant   120ms     --ease-ma    cubic-bezier(.16,1,.3,1)
--dur-quick     240ms     --ease-laya  cubic-bezier(.65,0,.35,1)
--dur-base      400ms     --ease-exit  cubic-bezier(.4,0,1,1)
--dur-reveal    700ms     --stagger    80ms
--dur-ceremony  1600ms
```

Four set pieces:

- **Sunrise** — the sun climbs from behind Mt Fuji on first visit. 1.6s, once
  per session (`sessionStorage`).
- **Horizon draw** — a hairline draws out before each section title, 0.9s.
- **Laya stagger** — groups rise 16px and fade in, 80ms apart.
- **Wave drift** — the wave texture drifts behind the dark sections, and pauses
  the moment it leaves the viewport.

Plus a travelling disc: the sun that rises in the hero becomes the marker that
travels the process timeline and the page rail, and the page closes with the
wordmark and the sun rising together out of a horizon.

### The wave

青海波 *Seigaiha* gives the concentric arcs; लहरिया *Lehariya* gives the diagonal
axis. One SVG pattern that is structurally both, used at 6–12% opacity and never
behind body text.

The drift is lattice-aligned rather than eyeballed: one vertical tile period is
`(0, 60)` in pattern space, which rotated −28° is `(28.168, 52.977)` on screen,
so the loop translates by exactly four of those and lands back on the lattice —
seamless, with no seam to hide, and compositor-only.

## Ground rules the page keeps

- Only `transform` and `opacity` are animated.
- No smooth-scroll library — hijacking the scrollbar breaks keyboard and
  assistive-technology users.
- No bounce or overshoot easings.
- Content is readable before JavaScript runs; nothing is held behind a loader.
- `prefers-reduced-motion` is honoured in both CSS and JS: the sun is already
  risen, reveals are instant, ambient loops stop.
- Text contrast meets WCAG 2.2 AA, including where type sits over artwork.

## Language

An EN ⇄ 日本語 toggle crossfades in 240ms. Navigation, calls to action and
section labels carry verified Japanese; body copy is intentionally left in
English rather than machine-translated, pending a native copy deck.

## Status

Prototype. Two things are known to be outstanding:

- The logo is a raster asset still reading "Jingi Global" and needs replacing
  with one that matches the registered name.
- The Japanese copy deck for full bilingual parity, and the `/ja/` routing plus
  `hreflang` that real parity requires, are not built.

## Third-party

- **GSAP 3.13.0** — © GreenSock, used under the GreenSock Standard License.
  See <https://gsap.com/licensing/>.
- **Mukta**, **Shippori Mincho**, **Zen Kaku Gothic New** — SIL Open Font
  License 1.1. See `fonts/OFL.txt`.

Artwork in `assets/` and the page copy belong to the project owner and are not
covered by the above.
