# JINGI prototype, redesign v2

Five working pages in the corrected direction (Japan is the manner, India is the subject):
`index.html`, `about.html`, `services.html`, `contact.html`, `legal.html`.
`direction.html` is the internal design record for Ankit and Harshit, not for the client.

Open `index.html` from disk; nothing needs a server. Fonts come from Google Fonts and
fall back to system faces offline. GSAP is vendored in `assets/`.

The three stylesheets stack, and each layer is additive: remove the last one and you
get the previous look back rather than a broken page.

- `assets/site.css` is the base system (tokens are the first forty lines).
- `assets/site-v2.css` is the imagery layer: navy heroes, duotone photographs with
  brass annotations, ticker, arc, stage line, exit curtain.
- `assets/site-v3.css` is the craft pass: paper grain, the meridian graticule behind
  the navy bands, a fixed Tokyo-Gurugram rail above 1400px, ghost numerals behind the
  four practices, drawn hairlines on every kicker and section head, the reading-light
  headline on the home page, and the closing wordmark in the footer.
- `assets/site.js` drives all of it. Every page is complete without JavaScript: nothing
  is hidden by CSS, so a blocked script, a missing file or a reduced-motion setting
  leaves each page whole.

Notes:

- Copy is final as approved by Ankit; header, footer and the consultation band are the
  only blocks that repeat across pages.
- The two city photographs are AI stand-ins; see `direction.html` §08 for the shot list.
- The meridian field was redrawn once. Its first version used nested arcs and read as
  seigaiha, which is exactly the Japanese ornament this direction dropped.
