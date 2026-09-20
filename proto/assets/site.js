/* JINGI prototype — shared behaviour, v2.
   Contract: the page is complete without this file. Nothing below hides
   content unless it is about to animate it in, and only when GSAP loaded
   and the visitor has not asked for reduced motion. */
(function () {
  'use strict';
  var d = document;
  var head = d.querySelector('.site-head');
  var menuBtn = d.querySelector('.menu-btn');
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---------- header: scrolled state, and transparent over a navy hero ---------- */
  var navyHero = d.querySelector('.hero2, .page-hero.navy');
  function onScroll() {
    if (!head) return;
    head.classList.toggle('scrolled', window.scrollY > 8);
    if (navyHero) {
      var limit = navyHero.offsetTop + navyHero.offsetHeight - 76;
      head.classList.toggle('on-navy', window.scrollY < limit);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  if (menuBtn && head) {
    menuBtn.addEventListener('click', function () {
      var open = head.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && head.classList.contains('open')) { head.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); }
    });
  }
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  Array.prototype.forEach.call(d.querySelectorAll('.nav a'), function (a) {
    var h = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
    if (h === here && !a.classList.contains('cta')) a.setAttribute('aria-current', 'page');
  });

  /* ---------- clocks (every element marked data-clock) ---------- */
  function inZone(date, zone) {
    try {
      return new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
    } catch (e) { return '--:--'; }
  }
  var clocks = d.querySelectorAll('[data-clock]');
  function tick() {
    var now = new Date();
    var t = inZone(now, 'Asia/Tokyo'), g = inZone(now, 'Asia/Kolkata');
    Array.prototype.forEach.call(clocks, function (el) { el.textContent = el.getAttribute('data-clock') === 'tokyo' ? t : g; });
  }
  tick();
  setInterval(tick, 30000);

  /* ---------- consultation form ---------- */
  var form = d.getElementById('consult-form');
  if (form) {
    var status = form.querySelector('.status');
    function field(name) { return form.querySelector('[name="' + name + '"]'); }
    function setErr(el, on, msg) {
      var f = el.closest('.f');
      if (!f) return;
      f.classList.toggle('err', on);
      var m = f.querySelector('.msg');
      if (m && msg) m.textContent = msg;
      el.setAttribute('aria-invalid', on ? 'true' : 'false');
    }
    Array.prototype.forEach.call(form.querySelectorAll('input,select,textarea'), function (el) {
      el.addEventListener('input', function () { if (el.closest('.f.err')) validate(el); });
    });
    function validate(el) {
      var v = el.value.trim();
      if (el.required && !v) { setErr(el, true, 'This field is needed.'); return false; }
      if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setErr(el, true, 'That does not look like an email address.'); return false; }
      setErr(el, false);
      return true;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      Array.prototype.forEach.call(form.querySelectorAll('input,select,textarea'), function (el) {
        if (!validate(el)) { ok = false; if (!first) first = el; }
      });
      if (!ok) { first.focus(); return; }
      var lang = form.querySelector('[name="lang"]:checked');
      var subject = 'Consultation request — ' + field('service').value + ' — ' + field('company').value;
      var body = [
        'Company: ' + field('company').value,
        'Name: ' + field('name').value,
        'Email: ' + field('email').value,
        'Service: ' + field('service').value,
        'Reply in: ' + (lang ? lang.value : 'Japanese'),
        '',
        field('message').value
      ].join('\n');
      var href = 'mailto:jpdesk@jingi.co.in?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var link = status.querySelector('a');
      if (link) link.href = href;
      status.classList.add('show');
      status.setAttribute('role', 'status');
      window.location.href = href;
    });
  }

  /* ---------- motion ---------- */
  if (!window.gsap || reduce) return;
  var g = window.gsap;
  var ST = window.ScrollTrigger;
  if (ST) g.registerPlugin(ST);
  var EXPO = 'expo.out';

  /* page-exit curtain: internal links slide a navy sheet up, then navigate.
     Exit is short (450 ms); the next page's own entrance is the reveal. */
  var curtain = d.createElement('div');
  curtain.className = 'curtain';
  curtain.setAttribute('aria-hidden', 'true');
  d.body.appendChild(curtain);
  g.set(curtain, { yPercent: 101 });
  window.addEventListener('pageshow', function () { curtain.classList.remove('go'); g.set(curtain, { yPercent: 101 }); });
  d.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return;
    var file = href.split('#')[0].toLowerCase();
    if (file === here) return; /* same page anchors scroll normally */
    e.preventDefault();
    curtain.classList.add('go');
    g.to(curtain, { yPercent: 0, duration: .45, ease: 'expo.inOut', onComplete: function () { window.location.href = href; } });
  });

  /* headline words, wrapped only now so a scriptless page keeps plain text */
  function splitWords(h) {
    var text = h.textContent.trim().split(/\s+/);
    h.textContent = '';
    text.forEach(function (w, i) {
      var wrap = d.createElement('span'); wrap.className = 'h1w';
      var inner = d.createElement('span'); inner.textContent = w;
      wrap.appendChild(inner); h.appendChild(wrap);
      if (i < text.length - 1) h.appendChild(d.createTextNode(' '));
    });
    return h.querySelectorAll('.h1w > span');
  }

  /* entrance choreography */
  var intro = g.timeline({ defaults: { ease: EXPO } });
  var h1 = d.querySelector('.hero2 h1, .page-hero h1');
  var kick = d.querySelectorAll('.hero-k');           /* kicker + crumbs */
  var rest = d.querySelectorAll('.rv-h:not(h1)');     /* lead, ja, actions, jump */
  if (kick.length) intro.from(kick, { y: 14, opacity: 0, duration: .7 }, 0);
  if (h1) intro.from(splitWords(h1), { yPercent: 110, duration: 1.1, stagger: .045 }, .1);
  if (rest.length) intro.from(rest, { y: 18, opacity: 0, duration: .8, stagger: .08 }, .55);

  var heroFrame = d.querySelector('.hero2 .frame, .page-hero .frame');
  if (heroFrame) {
    var img = heroFrame.querySelector('img');
    intro.fromTo(heroFrame, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'expo.inOut' }, .35);
    if (img) intro.fromTo(img, { scale: 1.16 }, { scale: 1, duration: 2.6, ease: 'power2.out' }, .35);
    var anns = heroFrame.querySelectorAll('.ann');
    Array.prototype.forEach.call(anns, function (ann, i) {
      var line = ann.querySelector('i'), lab = ann.querySelector('b');
      if (line) intro.from(line, { scaleX: 0, duration: .6 }, 1.35 + i * .18);
      if (lab) intro.from(lab, { opacity: 0, x: -6, duration: .5 }, 1.6 + i * .18);
    });
    var c2 = heroFrame.querySelector('.clocks2');
    if (c2) intro.from(c2, { opacity: 0, y: 10, duration: .6 }, 1.5);
    /* gentle parallax inside the frame on scroll, desktop only */
    if (ST && img && window.innerWidth > 900) {
      g.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: heroFrame, start: 'top bottom', end: 'bottom top', scrub: true } });
    }
  }
  var quad = d.querySelectorAll('.quad a');
  if (quad.length) intro.from(quad, { opacity: 0, y: 16, duration: .7, stagger: .09 }, .6);
  var arcbox = d.querySelector('.arcbox');
  if (arcbox) intro.from(arcbox, { opacity: 0, y: 16, duration: .8 }, .6);

  /* the arc draws itself when it comes into view */
  function drawArc(svg, delay) {
    var f = svg.querySelector('.f');
    if (!f) return;
    g.fromTo(f, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', delay: delay || 0,
      scrollTrigger: ST ? { trigger: svg, start: 'top 85%', once: true } : null });
  }
  Array.prototype.forEach.call(d.querySelectorAll('.arc'), function (svg) { drawArc(svg, svg.closest('.page-hero') ? .9 : 0); });

  /* stage line: fills as the statement scrolls through, lighting each node */
  var sl = d.querySelector('.stageline');
  if (sl && ST) {
    var fill = sl.querySelector('.fill'), nodes = sl.querySelectorAll('li');
    g.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: sl, start: 'top 85%', end: 'bottom 45%', scrub: .6,
        onUpdate: function (self) { nodes.forEach(function (n, i) { n.classList.toggle('lit', self.progress >= i / (nodes.length - 1) - .02); }); } } });
  }

  /* sticky-photo parallax and reveals on scroll */
  if (ST) {
    g.utils.toArray('.frame:not(.hero2 .frame):not(.page-hero .frame)').forEach(function (fr) {
      var im = fr.querySelector('img');
      g.fromTo(fr, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'expo.inOut',
        scrollTrigger: { trigger: fr, start: 'top 85%', once: true } });
      if (im) g.fromTo(im, { scale: 1.12 }, { scale: 1, duration: 2.2, ease: 'power2.out', scrollTrigger: { trigger: fr, start: 'top 85%', once: true } });
      Array.prototype.forEach.call(fr.querySelectorAll('.ann'), function (ann, i) {
        var line = ann.querySelector('i'), lab = ann.querySelector('b');
        if (line) g.from(line, { scaleX: 0, duration: .6, delay: .9 + i * .2, scrollTrigger: { trigger: fr, start: 'top 85%', once: true } });
        if (lab) g.from(lab, { opacity: 0, x: -6, duration: .5, delay: 1.1 + i * .2, scrollTrigger: { trigger: fr, start: 'top 85%', once: true } });
      });
    });
    g.utils.toArray('.rv').forEach(function (el) {
      g.from(el, { y: 16, opacity: 0, duration: .6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
  }
})();
