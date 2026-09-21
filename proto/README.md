# JINGI prototype, redesign v2

Five working pages in the corrected direction (Japan is the manner, India is the subject):
`index.html`, `about.html`, `services.html`, `contact.html`, `legal.html`.
`direction.html` is the internal design record for Ankit and Harshit, not for the client.

Open `index.html` from disk; nothing needs a server. Fonts come from Google Fonts and
fall back to system faces offline. GSAP is vendored in `assets/`.

- `assets/site.css` is the base system (tokens are the first forty lines).
- `assets/site-v2.css` + `assets/site.js` are the v2 layer: navy heroes, duotone
  photographs with brass annotations, ticker, arc, stage line, entrance motion,
  exit curtain. Every page is complete without JavaScript.
- Copy is final as approved by Ankit; header, footer and the consultation band are the
  only blocks that repeat across pages.
- The two city photographs are AI stand-ins; see `direction.html` §08 for the shot list.
