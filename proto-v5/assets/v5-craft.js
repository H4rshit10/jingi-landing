/* JINGI v5 — the craft layer's behaviour. Loaded after v5.js.
   Contract unchanged: the page works without this file. The map and the
   theme toggle are functional, not decorative, so they run unconditionally;
   everything else waits on GSAP and prefers-reduced-motion like v5.js does. */
(function () {
  'use strict';
  var d = document, w = window;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = false;
  try { reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---------- theme toggle ---------- */
  var themeBtn = $('.theme-btn');
  if (themeBtn) {
    var paint = function () {
      var dark = d.documentElement.getAttribute('data-theme') === 'dark';
      themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    };
    paint();
    themeBtn.addEventListener('click', function () {
      var next = d.documentElement.getAttribute('data-theme') === 'dark' ? null : 'dark';
      var apply = function () {
        if (next) d.documentElement.setAttribute('data-theme', 'dark');
        else d.documentElement.removeAttribute('data-theme');
        try { localStorage.setItem('jingi-theme', next || 'light'); } catch (err) {}
        paint();
      };
      if (!d.startViewTransition || reduce) { apply(); return; }
      var r = themeBtn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      var endR = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      var t = d.startViewTransition(apply);
      t.ready.then(function () {
        d.documentElement.animate(
          { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + endR + 'px at ' + x + 'px ' + y + 'px)'] },
          { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)', pseudoElement: '::view-transition-new(root)' }
        );
      }).catch(function () {});
    });
  }

  /* ---------- office map (Leaflet; functional, no GSAP needed) ----------
     Coordinates: OpenStreetMap's best match for "Spaze i-Tech Park" on
     Sohna Road (28.4201631, 77.0404765) — the exact building entrance
     isn't in OSM's index, so this is the named commercial complex, not a
     verified rooftop pin. Replace with the exact coordinate if you have
     one from the property's own listing. */
  var mapEl = $('#office-map');
  if (mapEl && w.L) {
    var office = [28.4201631, 77.0404765];
    var map = L.map(mapEl, { scrollWheelZoom: false, zoomControl: true }).setView(office, 15);
    /* CARTO's basemaps.cartocdn.com free tier now watermarks tiles "KEY
       REQUIRED" without one; standard OSM tiles need no key at all. */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);
    var goldIcon = L.divIcon({
      className: 'office-pin',
      html: '<span style="display:block;width:14px;height:14px;border-radius:50%;background:#D8232A;box-shadow:0 0 0 4px rgba(216,35,42,.25),0 1px 3px rgba(0,0,0,.4)"></span>',
      iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -10]
    });
    L.marker(office, { icon: goldIcon }).addTo(map)
      .bindPopup('<b>JINGI Corporate Solutions</b>Tower B, Spaze i-Tech Park<br>Sector 49, Sohna Road, Gurugram');
    mapEl.closest('.office-map').addEventListener('click', function enable() {
      map.scrollWheelZoom.enable();
    }, { once: true });
  }

  /* ---------- tilted card (partner marks) ----------
     Works with plain CSS transforms if GSAP hasn't loaded; upgraded to a
     spring via gsap.quickTo, same technique as v5's own [data-magnet]. */
  var fine = false;
  try { fine = w.matchMedia('(hover: hover) and (pointer: fine)').matches; } catch (e) {}
  if (fine && !reduce) {
    $$('.tilt-card').forEach(function (card) {
      var inner = card.querySelector('.tilt-in');
      if (!inner) return;
      var rx, ry, sc;
      if (w.gsap) {
        rx = w.gsap.quickTo(inner, 'rotationX', { duration: .5, ease: 'power3.out' });
        ry = w.gsap.quickTo(inner, 'rotationY', { duration: .5, ease: 'power3.out' });
        sc = w.gsap.quickTo(inner, 'scale', { duration: .5, ease: 'power3.out' });
      }
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        var rotX = py * -14, rotY = px * 14;
        if (rx) { rx(rotX); ry(rotY); sc(1.05); }
        else inner.style.transform = 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.05)';
      });
      card.addEventListener('mouseleave', function () {
        if (rx) { rx(0); ry(0); sc(1); }
        else inner.style.transform = '';
      });
    });
  }

  var g = w.gsap, ST = w.ScrollTrigger;
  if (!g || reduce) return;
  if (ST) g.registerPlugin(ST);
  var EXPO = 'expo.out';

  /* ---------- page transition: the curtain ---------- */
  var curtain = $('#curtain');
  if (curtain) {
    var cSun = curtain.querySelector('.curtain-sun');
    var cLetters = $$('.curtain-word .cl > span', curtain);
    var cNote = curtain.querySelector('.curtain-note');
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var leaving = false;
    function park() {
      leaving = false; curtain.classList.remove('go');
      g.set(curtain, { y: 0, yPercent: 100 });
      g.set([cSun, cNote], { clearProps: 'all' });
      g.set(cLetters, { clearProps: 'all' });
    }
    if (d.documentElement.classList.contains('entering')) {
      curtain.addEventListener('animationend', function done(ev) {
        if (ev.target !== curtain) return;
        curtain.removeEventListener('animationend', done);
        d.documentElement.classList.remove('entering'); park();
      });
    } else park();
    w.addEventListener('pageshow', function (ev) { if (ev.persisted) { d.documentElement.classList.remove('entering'); park(); } });
    d.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a || leaving) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      var href = a.getAttribute('href');
      if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return;
      var file = href.split('#')[0].toLowerCase();
      if (!file || file === here) return;
      e.preventDefault(); leaving = true;
      try { sessionStorage.setItem('jingi-transit', '1'); } catch (err) {}
      curtain.classList.add('go');
      var out = g.timeline({ onComplete: function () { location.href = href; } });
      out.to(curtain, { y: 0, yPercent: 0, duration: .52, ease: 'expo.inOut' }, 0);
      if (cSun) out.fromTo(cSun, { yPercent: 72, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .52, ease: EXPO }, .14);
      if (cLetters.length) out.fromTo(cLetters, { yPercent: 118 }, { yPercent: 0, duration: .5, ease: EXPO, stagger: .035 }, .2);
      if (cNote) out.fromTo(cNote, { opacity: 0 }, { opacity: 1, duration: .34 }, .4);
    });
  }

  /* ---------- the footer mark ---------- */
  var mark = $('.foot-mark');
  if (mark && ST) {
    g.timeline({ scrollTrigger: { trigger: mark, start: 'top 94%', end: 'bottom bottom', scrub: .6 } })
      .fromTo('#foot-sun', { yPercent: 78 }, { yPercent: 0, ease: 'none' }, 0)
      .fromTo('#foot-word .fl > span', { yPercent: 112 }, { yPercent: 0, ease: 'none', stagger: .07 }, 0)
      .fromTo('#foot-horizon', { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
  }

  /* ---------- table-of-contents scroll-spy (legal.html) ---------- */
  var toc = $('.toc');
  if (toc && ST) {
    var tocSecs = $$('a[href^="#"]', toc).map(function (a) {
      var el = d.getElementById(a.getAttribute('href').slice(1));
      return el ? { a: a, el: el } : null;
    }).filter(Boolean);
    tocSecs.forEach(function (s, i) {
      var next = tocSecs[i + 1];
      ST.create({
        trigger: s.el, start: 'top 45%',
        endTrigger: next ? next.el : s.el, end: next ? 'top 45%' : 'bottom bottom',
        onToggle: function (self) { s.a.classList.toggle('active', self.isActive); }
      });
    });
  }

  /* ---------- facts digits count up to themselves (reuses .rows' idiom) --------- */
  $$('.facts dt').forEach(function (dt) {
    var text = dt.textContent.trim(), n = parseInt(text, 10);
    if (isNaN(n) || !ST) return;
    var o = { v: 0 };
    g.timeline({ scrollTrigger: { trigger: dt, start: 'top 92%', once: true } })
      .to(o, { v: n, duration: .9, ease: 'power2.out',
        onUpdate: function () { dt.firstChild.nodeValue = String(Math.round(o.v)).padStart(text.length, '0'); } });
  });

  /* ---------- the twenty marks ----------
     Each carries a data-motif naming how it behaves. Everything that
     "draws" is visible in the CSS and hidden here first, so a blocked
     script leaves every mark simply already drawn. */
  function strokeLen(el) {
    try { if (el.getTotalLength) return el.getTotalLength(); } catch (e) {}
    var r = el.getBoundingClientRect();
    return (r.width + r.height) * 2 || 200;
  }

  $$('[data-motif]').forEach(function (svg) {
    var kind = svg.getAttribute('data-motif');

    if (kind === 'draw' || kind === 'dial' || kind === 'ticks' || kind === 'stagger') {
      var parts = $$('path,circle,line,rect,polyline,ellipse', svg);
      if (!parts.length) return;
      parts.forEach(function (el) {
        var L = strokeLen(el);
        g.set(el, { strokeDasharray: L, strokeDashoffset: L });
      });
      var tl = g.timeline({ scrollTrigger: ST ? { trigger: svg, start: 'top 92%', once: true } : null });
      tl.to(parts, {
        strokeDashoffset: 0, duration: kind === 'stagger' ? .7 : 1.1,
        ease: 'power2.inOut', stagger: kind === 'stagger' ? .18 : .09
      });
      /* the dial's needle swings to its bearing once the face is drawn */
      var needle = svg.querySelector('[data-mf-needle]');
      if (needle) {
        /* same reason as the clock: the group's bbox centre is not the
           dial's centre, so the pivot is given in user units */
        g.set(needle, { svgOrigin: '39 39', rotation: -38 });
        tl.to(needle, { rotation: 0, duration: 1.4, ease: 'expo.out' }, .5);
      }
      return;
    }

    /* the dot walks the dashed route as the section is scrolled through */
    if (kind === 'travel' && ST) {
      var dot = svg.querySelector('[data-mf-dot]');
      if (!dot) return;
      g.fromTo(dot, { attr: { cx: 2 } }, {
        attr: { cx: 418 }, ease: 'none',
        scrollTrigger: { trigger: svg, start: 'top 95%', end: 'top 35%', scrub: .5 }
      });
      return;
    }

    /* the clock is told the real time in both places, not a decorative pose */
    if (kind === 'hands') {
      var hour = svg.querySelector('[data-mf-hour]'), min = svg.querySelector('[data-mf-min]');
      var setHands = function () {
        var now = new Date(), h, m;
        try {
          var parts2 = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).format(now).split(':');
          h = +parts2[0]; m = +parts2[1];
        } catch (e) { h = now.getHours(); m = now.getMinutes(); }
        /* svgOrigin, not transformOrigin: a <line>'s own bounding box is a
           hairline strip, so a bbox-relative origin swings the hand off
           the dial entirely. svgOrigin is in user units - the dial centre. */
        if (hour) g.set(hour, { svgOrigin: '20 20', rotation: (h % 12) * 30 + m * .5 });
        if (min) g.set(min, { svgOrigin: '20 20', rotation: m * 6 - 90 });
      };
      setHands(); setInterval(setHands, 30000);
      return;
    }
    /* kind === 'static': the CSS carries it (spin, ripple) */
  });

  /* ---------- scroll-expand: the empty plate, grown full-bleed ---------- */
  var expand = $('.expand');
  if (expand && ST) {
    var eFrame = expand.querySelector('.plate');
    var eGrid = expand.querySelector('.plate-grid');
    var eCap = expand.querySelector('.expand-cap-big');
    var small = w.innerWidth > 640
      ? { width: '46%', height: '54vh', borderRadius: '4px' }
      : { width: '84%', height: '46vh', borderRadius: '4px' };
    g.timeline({ scrollTrigger: { trigger: expand, start: 'top top', end: 'bottom bottom', scrub: .5 } })
      .fromTo(eFrame, small, { width: '100%', height: '100vh', borderRadius: '0px', ease: 'none' }, 0)
      .fromTo(eGrid, { opacity: .2 }, { opacity: .5, ease: 'none' }, 0)
      .fromTo(eCap, { opacity: 0, y: 22 }, { opacity: 1, y: 0, ease: 'none' }, .35);
  }
})();
