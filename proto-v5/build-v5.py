# -*- coding: utf-8 -*-
"""v5: fix the home, then build about / services / contact / legal from v4's content, word for word."""
import io, re, sys

V4 = "D:/client-work/jingi/proto-v4/"
V5 = "D:/client-work/jingi/proto-v5/"


def rd(p): return io.open(p, encoding="utf-8").read()
def wr(p, t): io.open(p, "w", encoding="utf-8", newline="\n").write(t)
def once(t, a, b, label):
    if t.count(a) != 1: sys.exit("anchor (%d): %s" % (t.count(a), label))
    return t.replace(a, b)


# ------------------------------------------------------------------ 1. home
h = rd(V5 + "index.html")
if 'class="masthead"' not in h:
    h = once(h, '<header class="head" id="top">', '<header class="masthead" id="top">', "header")
    h = once(h, '<footer class="foot">', '<footer class="site-end">', "footer")
    h = h.replace('class="wrap two ', 'class="wrap duo ').replace('class="wrap two"', 'class="wrap duo"').replace('<div class="two">', '<div class="duo">').replace('<div class="two why-top">', '<div class="duo why-top">')
    h = once(h, '      <a class="roll" href="#how" data-t="How we work"><span>How we work</span></a>\n', '', "nav how")
    h = once(h, '    <canvas class="petals" aria-hidden="true"></canvas>\n', '', "petals")
    h = once(h, '<a class="tlink" href="#how">How we work <svg', '<a class="tlink" href="services.html">The four services <svg', "hero link")
    # the stages are named on Services; home keeps v4's numbered line only
    h = re.sub(r'<ol>\s*<li><span class="n">01</span><b>Enquiry</b></li>.*?</ol>',
               '<ol aria-hidden="true">\n          <li><span class="n">01</span></li>\n          <li><span class="n">02</span></li>\n          <li><span class="n">03</span></li>\n          <li><span class="n">04</span></li>\n          <li><span class="n">05</span></li>\n        </ol>', h, flags=re.S)
    h = once(h, 'Legal, HR, accounts and market entry sit in one office and share one file on your company. Tokyo and India are three and a half hours apart, and five working hours of every day are shared.',
             'Tokyo and India are three and a half hours apart, and five working hours of every day are shared.', "bridge lead")
    h = h.replace('../proto-v4/', '')
    wr(V5 + "index.html", h)

c = rd(V5 + "assets/v5.css")
if ".masthead" not in c:
    c = re.sub(r'\.head(?=[.{ ])', '.masthead', c)
    c = re.sub(r'\.foot(?=[{ ])', '.site-end', c)
    c = re.sub(r'\.two(?=[.,{ ])', '.duo', c)
    c = once(c, ".petals{position:absolute;inset:0;z-index:1;width:100%;height:100%;pointer-events:none}\n", "", "petals css")
    c = c.replace(" .petals{height:min(46svh,360px)}", "")
    c = c.replace(".proc li{position:relative;padding-top:76px}", ".proc li{position:relative;padding-top:58px;min-height:58px}")
    wr(V5 + "assets/v5.css", c)

j = rd(V5 + "assets/v5.js")
if "'.masthead'" not in j:
    j = j.replace("$('.head')", "$('.masthead')").replace("'.head .bar > *'", "'.masthead .bar > *'")
    a = j.find("  /* ---------- petals:")
    b = j.find("  /* ---------- magnetic buttons")
    if a < 0 or b < 0: sys.exit("petals js")
    j = j[:a] + j[b:]
    j = j.replace("   joined. Labels decode out of kana, headlines are set line by line behind a\n   caret,", "   joined. Labels decode out of kana, headlines are set line by line behind a\n   caret,")
    wr(V5 + "assets/v5.js", j)


# ------------------------------------------------------------------ 2. v4's component styles, scoped to <main>
DROP_PREFIX = (".site-head", ".site-foot", ".nav", ".logo", ".lang", ".menu-btn", ".rail", ".grain", ".curtain", "html", "body",
               ":root", "*", ".btn", ".tlink", ".foot-", ".hero2", ".hero ", ".hero-", ".ticker", ".skip", ".defs", ".jaali", ".mer",
               ".rule-band", ".buta", ".globe", ".actions", ".has-jaali", ".section.has-jaali", ".practice.has-jaali", ".bigclocks", ".h1w")
DROP_EXACT = {".k", ".k b", ".lead", ".wrap", ".hero", "a", "img", "p", ":focus-visible", "em"}


def blocks(css):
    """yield (prelude, body) for each top-level rule"""
    i, n = 0, len(css)
    while i < n:
        o = css.find("{", i)
        if o < 0: return
        depth, k = 1, o + 1
        while k < n and depth:
            depth += {"{": 1, "}": -1}.get(css[k], 0); k += 1
        yield css[i:o].strip(), css[o + 1:k - 1]
        i = k


def scope(css):
    out = []
    for pre, body in blocks(css):
        if pre.startswith("@media") or pre.startswith("@supports"):
            inner = scope(body)
            if inner.strip(): out.append("%s{\n%s}\n" % (pre, inner))
        elif pre.startswith("@"):
            out.append("%s{%s}\n" % (pre, body))
        else:
            keep = []
            for s in pre.split(","):
                s = " ".join(s.split())
                if not s or s in DROP_EXACT or (s.startswith(DROP_PREFIX) and not s.startswith(".hero-index")): continue
                keep.append("main " + s)
            if keep: out.append("%s{%s}\n" % (",".join(keep), body.strip()))
    return "".join(out)


src = ""
for f in ("site.css", "site-v2.css", "site-v3.css", "site-v4.css"):
    src += re.sub(r"/\*.*?\*/", "", rd(V4 + "assets/" + f), flags=re.S) + "\n"

# v4's theme.css is a recolour, which v5 does not want; but components added there later still have to come across
theme = re.sub(r"/\*.*?\*/", "", rd(V4 + "assets/theme.css"), flags=re.S)
LATE = (".hero-index",)
for pre, body in blocks(theme):
    if any(k in pre for k in LATE) or (pre.startswith("@media") and any(k in body for k in LATE)):
        src += pre + "{" + body + "}" + chr(10)

pages_css = u"""/* JINGI v5 — inner pages.
   GENERATED by build-v5.py from proto-v4's component styles, every selector
   scoped to <main> so nothing reaches the v5 masthead or footer. The tokens
   those styles are written against are defined in v5.css; the few it lacks are
   below. Hand edits belong in the block at the bottom of build-v5.py. */
:root{--brass:#8A6A2C;--brass-2:#C8A561;--rule-brass:rgba(200,165,97,.34);
  --sp-1:8px;--sp-2:16px;--sp-3:24px;--sp-4:40px;--sp-5:64px;--sp-6:104px;--sp-7:160px;
  --d-quick:.24s;--d-base:.4s;--d-reveal:.7s;--d-ceremony:1.6s;--ease-out:cubic-bezier(.16,1,.3,1)}
""" + scope(src) + u"""
/* ---------- v5 over v4 ---------- */
main .page-hero,main .page-hero.navy{position:relative;margin-top:0;padding-top:calc(76px + var(--sp-5));overflow:hidden}
main .toc{align-self:start}
main .legal-doc .k{font:400 11.5px/1.4 var(--mono);letter-spacing:.2em}
main .page-hero.navy{background:var(--navy)}
main .page-hero h1 em{color:var(--gold)}
main .page-hero .plate{aspect-ratio:4/5;max-height:460px;width:100%}
main .where .plate,main .reasons2 .plate{aspect-ratio:4/3}
main .plate .plate-cap span{display:block}
main .navy .k,main .page-hero.navy .k{color:var(--on-navy-muted)}
main .k b{color:var(--gold-ink);font-weight:500;margin-right:4px} main .navy .k b{color:var(--gold)}
main h1,main h2{text-wrap:balance}
main .consult{position:relative}
main{--accent:var(--gold-ink);--accent-2:var(--ink)}
main .navy{--accent:var(--gold)}
main .page-hero .hero-index{background:rgba(241,236,224,.04);border-color:var(--line-navy)}
main .hero-index li,main .hero-index .close,main .hero-index .k::after{border-color:var(--line-navy)}
main .hero-index .k::after{background:var(--line-navy)}
main .hero-index strong{color:var(--on-navy)} main .hero-index em,main .hero-index .close{color:var(--on-navy-muted)}
main .hero-index a > b{color:var(--gold)}
"""
wr(V5 + "assets/v5-pages.css", pages_css)


# ------------------------------------------------------------------ 3. the four pages
home = rd(V5 + "index.html")
mast = home[home.find('<a class="skip"'):home.find("<main")]
foot = home[home.find('<footer class="site-end">'):home.find("<script")]
PLATE_N = [4]


def plate(m):
    PLATE_N[0] += 1
    block = m.group(0)
    alt = re.search(r'alt="([^"]*)"', block)
    anns = re.findall(r"<b>([^<]+)</b>", block)
    dark = "dark" if m.string[:m.start()].rfind('class="page-hero navy"') > m.string[:m.start()].rfind("</section>") else "light"
    cap = "".join("<span>%s</span>" % a for a in anns) or "<span>Photograph · to come</span>"
    return ('<div class="plate %s" data-iris>\n        <div class="plate-grid" aria-hidden="true"></div>\n'
            '        <p class="plate-cap"><b>Plate %02d%s</b>%s</p>\n      </div>') % (dark, PLATE_N[0], (" · " + alt.group(1)) if alt and alt.group(1) else "", cap)


def page(name, current):
    t = rd(V4 + name)
    title = re.search(r"<title>.*?</title>", t, re.S).group(0)
    desc = re.search(r'<meta name="description"[^>]*>', t).group(0)
    m = t[t.find("<main"):t.find("</main>") + 7].replace("<main>", '<main id="main">')
    m = re.sub(r'\s*<div class="mer[^"]*"[^>]*>.*?</div>', "", m, flags=re.S)
    m = re.sub(r'\s*<div class="jaali[^"]*"[^>]*>.*?</div>', "", m, flags=re.S)
    m = re.sub(r'\s*<div class="rule-band".*?</div>\s*(?=<section|</main>)', "\n\n  ", m, flags=re.S)
    m = re.sub(r'\s*<svg class="buta".*?</svg>', "", m, flags=re.S)
    m = m.replace(' has-jaali"', '"')
    m = re.sub(r'<div class="frame">.*?</div>', plate, m, flags=re.S)
    m = m.replace('class="btn on-navy"', 'class="btn gold" data-magnet').replace('class="btn"', 'class="btn gold" data-magnet')
    m = m.replace('<section class="navy consult"', '<section class="navy consult" data-expand')
    m = m.replace('data-clock="tokyo"', 'data-clock="Asia/Tokyo"').replace('data-clock="india"', 'data-clock="Asia/Kolkata"').replace(">--:--<", "><")
    head = mast.replace(' aria-current="page"', "")
    head = once(head, 'href="%s" data-t' % current, 'href="%s" aria-current="page" data-t' % current, "current " + name) if current else head
    out = u"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
%s
%s
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..600&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+JP:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/v5.css">
<link rel="stylesheet" href="assets/v5-pages.css">
</head>
<body class="inner">

%s%s

%s<script src="assets/gsap.min.js" defer></script>
<script src="assets/ScrollTrigger.min.js" defer></script>
<script src="assets/v5.js" defer></script>
</body>
</html>
""" % (title, desc, head, m, foot)
    wr(V5 + name, out)
    words = lambda s: re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s)).strip()
    src_main = t[t.find("<main"):t.find("</main>")]
    src_main = re.sub(r'<div class="frame">.*?</div>', "", src_main, flags=re.S)
    lost = [w for w in set(words(src_main).split()) if len(w) > 6 and w not in words(m)]
    print("%-14s plates so far %d, words lost: %s" % (name, PLATE_N[0], lost[:6] or "none"))


page("about.html", "about.html")
page("services.html", "services.html")
page("contact.html", "contact.html")
page("legal.html", None)
