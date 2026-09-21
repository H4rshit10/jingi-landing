/* JINGI v5 — behaviour and motion.

   The page is complete without this file. Nothing is hidden in CSS: every
   start state below is set here, after checking that GSAP loaded and that the
   visitor has not asked for less motion.

   The motion has one idea behind it: two languages and two places being
   joined. Labels decode out of kana, headlines are set line by line behind a
   caret, a dot travels from Tokyo to India, and the dark bands open like
   sliding screens. */
(function () {
  'use strict';
  var d = document, w = window;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };

  /* ---------- clocks: a fact, so they run whatever else does ---------- */
  var clocks = $$('[data-clock]');
  function tick() {
    var now = new Date();
    clocks.forEach(function (el) {
      try {
        el.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: el.getAttribute('data-clock') }).format(now);
      } catch (e) {}
    });
  }
  tick(); setInterval(tick, 15000);

  /* ---------- menu and header ---------- */
  var head = $('.masthead'), btn = $('.menu-btn');
  if (btn) btn.addEventListener('click', function () {
    var open = head.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  $$('.nav a').forEach(function (a) { a.addEventListener('click', function () { head.classList.remove('open'); if (btn) btn.setAttribute('aria-expanded', 'false'); }); });
  function solid() { head.classList.toggle('solid', w.scrollY > 40); }
  solid(); w.addEventListener('scroll', solid, { passive: true });

  /* ---------- consultation form: checks the fields, then hands a finished email to the mail client ---------- */
  var form = d.getElementById('consult-form');
  if (form) {
    var status = form.querySelector('.status');
    var field = function (name) { return form.querySelector('[name="' + name + '"]'); };
    var setErr = function (el, on, msg) {
      var f = el.closest('.f'); if (!f) return;
      f.classList.toggle('err', on);
      var m = f.querySelector('.msg'); if (m && msg) m.textContent = msg;
      el.setAttribute('aria-invalid', on ? 'true' : 'false');
    };
    var validate = function (el) {
      var v = el.value.trim();
      if (el.required && !v) { setErr(el, true, 'This field is needed.'); return false; }
      if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setErr(el, true, 'That does not look like an email address.'); return false; }
      setErr(el, false); return true;
    };
    $$('input,select,textarea', form).forEach(function (el) {
      el.addEventListener('input', function () { if (el.closest('.f.err')) validate(el); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      $$('input,select,textarea', form).forEach(function (el) { if (!validate(el)) { ok = false; if (!first) first = el; } });
      if (!ok) { first.focus(); return; }
      var lang = form.querySelector('[name="lang"]:checked');
      var subject = 'Consultation request — ' + field('service').value + ' — ' + field('company').value;
      var body = ['Company: ' + field('company').value, 'Name: ' + field('name').value, 'Email: ' + field('email').value,
        'Service: ' + field('service').value, 'Reply in: ' + (lang ? lang.value : 'Japanese'), '', field('message').value].join('\n');
      var href = 'mailto:jpdesk@jingi.co.in?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var link = status.querySelector('a'); if (link) link.href = href;
      status.classList.add('show'); status.setAttribute('role', 'status');
      w.location.href = href;
    });
  }

  /* ---------- the services plate follows the row in hand (works without GSAP) ---------- */
  var rows = $$('.rows a'), odoCol = $('.odo .col'), cap = $('.svc-cap'), current = 0;

  var g = w.gsap, ST = w.ScrollTrigger, reduce = false, fine = false;
  try {
    reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
    fine = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  } catch (e) {}
  var motion = !!g && !reduce;

  function showRow(i) {
    if (i === current || !odoCol) return;
    current = i;
    var name = rows[i].querySelector('b').textContent;
    if (motion) {
      g.to(odoCol, { yPercent: -25 * i, duration: .9, ease: 'expo.inOut', overwrite: true });
      decode(cap, name, 14);
    } else {
      odoCol.style.transform = 'translateY(' + (-25 * i) + '%)';
      cap.textContent = name;
    }
  }
  rows.forEach(function (a, i) {
    a.addEventListener('mouseenter', function () { showRow(i); });
    a.addEventListener('focus', function () { showRow(i); });
  });

  /* ---------- decode: a label resolves out of half-width kana, left to right ---------- */
  var KANA = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
  function decode(el, text, fps) {
    if (!el) return;
    if (el._dec) cancelAnimationFrame(el._dec);
    var frame = 0, total = text.length, last = 0, step = 1000 / (fps || 22);
    function run(t) {
      if (t - last >= step) {
        last = t; frame++;
        var settled = Math.floor(frame * .8), out = '';
        for (var i = 0; i < total; i++) {
          var c = text.charAt(i);
          out += (i < settled || c === ' ') ? c : KANA.charAt((Math.random() * KANA.length) | 0);
        }
        el.textContent = out;
        if (settled >= total) { el.textContent = text; el._dec = 0; return; }
      }
      el._dec = requestAnimationFrame(run);
    }
    el._dec = requestAnimationFrame(run);
  }

  if (!motion) return;
  if (ST) g.registerPlugin(ST);
  var EXPO = 'expo.out';

  /* headlines are split into their real lines, so wait for the real fonts; hold them unseen until then */
  g.set('[data-typeset]', { opacity: 0 });
  var booted = false;
  function ready() { if (booted) return; booted = true; boot(); }
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(ready);
  setTimeout(ready, 1400);

  function boot() {

  /* ---------- typeset: split a headline into its real lines, then set each behind a caret ---------- */
  function typeset(h) {
    var html = h.innerHTML, words = [];
    Array.prototype.slice.call(h.childNodes).forEach(function (n) {
      if (n.nodeType === 3) n.textContent.split(/(\s+)/).forEach(function (t) { if (t.trim()) words.push(d.createTextNode(t)); });
      else words.push(n.cloneNode(true));
    });
    h.innerHTML = '';
    var spans = words.map(function (n, i) {
      var s = d.createElement('span'); s.style.display = 'inline-block'; s.appendChild(n);
      h.appendChild(s); if (i < words.length - 1) h.appendChild(d.createTextNode(' '));
      return s;
    });
    var lines = [], top = null;
    spans.forEach(function (s) {
      if (top === null || Math.abs(s.offsetTop - top) > 4) { lines.push([]); top = s.offsetTop; }
      lines[lines.length - 1].push(s);
    });
    h.innerHTML = '';
    var els = lines.map(function (ln) {
      var l = d.createElement('span'); l.className = 'ln';
      ln.forEach(function (s, i) { l.appendChild(s.firstChild); if (i < ln.length - 1) l.appendChild(d.createTextNode(' ')); });
      var c = d.createElement('i'); c.className = 'caret'; c.setAttribute('aria-hidden', 'true'); l.appendChild(c);
      h.appendChild(l); return l;
    });
    return { lines: els, restore: function () { h.innerHTML = html; } };
  }
  function setLines(h, tl, at) {
    var t = typeset(h), each = .78;
    t.lines.forEach(function (l, i) {
      var caret = l.querySelector('.caret'), p = { v: 0 };
      l.style.width = 'max-content';
      g.set(l, { clipPath: 'inset(-10% 100% -10% 0)' });
      if (i === 0) g.set(h, { opacity: 1 });
      tl.to(p, { v: 1, duration: each, ease: 'power3.inOut',
        onUpdate: function () {
          l.style.clipPath = 'inset(-10% ' + (100 - p.v * 100) + '% -10% 0)';
          caret.style.left = 'calc(' + (p.v * 100) + '% - 2px)';
        } }, at + i * .16);
      tl.to(caret, { opacity: 0, duration: .25 }, at + i * .16 + each);
    });
    tl.call(t.restore, null, at + (t.lines.length - 1) * .16 + each + .3);
    return at + (t.lines.length - 1) * .16 + each;
  }

  /* ---------- the hero: opening ---------- */
  var hero = $('.hero');
  if (hero) {
  var intro = g.timeline({ defaults: { ease: EXPO } });
  var heroKick = $('.hero [data-scramble]');
  if (heroKick) { var kt = heroKick.textContent; intro.call(function () { decode(heroKick, kt); }, null, .1); }
  intro.from('.masthead .bar > *', { y: -18, opacity: 0, duration: .9, stagger: .07 }, 0);
  intro.from('.hero-plate', { opacity: 0, scale: 1.06, duration: 2, ease: 'power2.out' }, 0);
  var end = setLines($('.hero h1'), intro, .25);
  intro.from('.hero [data-in]', { opacity: 0, y: 22, filter: 'blur(8px)', duration: 1, stagger: .12, clearProps: 'filter' }, end - .35);
  intro.from('.route .stop', { opacity: 0, x: 14, duration: .8, stagger: .16 }, .7);
  intro.from('.route .route-line', { scaleY: 0, transformOrigin: '50% 0', duration: .9, stagger: .16, ease: 'power2.inOut' }, .8);
  intro.from('.scroll-cue', { opacity: 0, duration: 1 }, end);

  /* the dot leaves Tokyo as the page leaves the hero, and is in India by the time it has gone */
  if (ST && w.innerWidth > 900) {
    var rl = $$('.route .route-line'), dot = $('.route-dot');
    g.set('.route-fill', { scaleY: 0 });
    var trip = g.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom 30%', scrub: .5 } });
    trip.to(rl[0].querySelector('.route-fill'), { scaleY: 1, ease: 'none', duration: 1 }, 0)
        .to(dot, { top: '100%', ease: 'none', duration: 1 }, 0)
        .to(dot, { opacity: 0, duration: .1 }, 1)
        .to(rl[1].querySelector('.route-fill'), { scaleY: 1, ease: 'none', duration: 1 }, 1);
    g.to('.hero-words', { yPercent: -12, opacity: .2, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    g.to('.hero-plate .plate-grid', { backgroundPosition: '0px 90px', ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* the lamp follows the cursor across the empty plate */
  var plate = $('.hero-plate');
  if (fine && plate) {
    hero.addEventListener('mousemove', function (e) {
      var r = plate.getBoundingClientRect();
      g.to(plate, { '--mx': (e.clientX - r.left) + 'px', '--my': (e.clientY - r.top) + 'px', duration: .9, ease: 'power3.out', overwrite: 'auto' });
    }, { passive: true });
  }

  } else {
    /* inner pages: same manners, smaller room */
    var ph = $('.page-hero');
    if (ph) {
      var pin = g.timeline({ defaults: { ease: EXPO } });
      pin.from('.masthead .bar > *', { y: -18, opacity: 0, duration: .9, stagger: .07 }, 0);
      var pk = $('.k.hero-k', ph);
      if (pk) { var pkt = pk.textContent; pin.call(function () { decode(pk, pkt); }, null, .1); }
      pin.from($$('.crumbs', ph), { opacity: 0, x: -10, duration: .7 }, .05);
      var h1 = $('h1', ph), pend = .3;
      if (h1) { g.set(h1, { opacity: 0 }); pend = setLines(h1, pin, .2); }
      pin.from($$('.rv-h', ph), { opacity: 0, y: 20, filter: 'blur(8px)', duration: 1, stagger: .1, clearProps: 'filter' }, pend - .35);
      var side = $$('.plate, .arcbox, .quad a', ph);
      if (side.length) pin.from(side, { opacity: 0, y: 24, duration: 1, stagger: .08 }, .5);
    }
  }

  /* ---------- magnetic buttons ---------- */
  if (fine) $$('[data-magnet]').forEach(function (b) {
    var x = g.quickTo(b, 'x', { duration: .5, ease: 'power3.out' }), y = g.quickTo(b, 'y', { duration: .5, ease: 'power3.out' });
    b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .28); y((e.clientY - r.top - r.height / 2) * .4); });
    b.addEventListener('mouseleave', function () { g.to(b, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1,.4)', overwrite: true }); });
  });

  if (!ST) { g.set('[data-typeset]', { opacity: 1 }); return; }

  /* header steps out of the way going down, returns going up */
  ST.create({ start: 120, end: 'max', onUpdate: function (s) {
    if (head.classList.contains('open')) return;
    g.to(head, { yPercent: s.direction === 1 ? -100 : 0, duration: .5, ease: 'power3.out', overwrite: true });
  } });

  /* ---------- below the hero ---------- */
  $$('main .band [data-scramble]').forEach(function (el) {
    var text = el.textContent;
    ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () { decode(el, text); } });
  });
  $$('main .band [data-typeset]').forEach(function (h) {
    var tl = g.timeline({ paused: true });
    ST.create({ trigger: h, start: 'top 84%', once: true, onEnter: function () { setLines(h, tl, 0); tl.play(); } });
  });
  /* text comes into focus rather than sliding up */
  $$('[data-blur]').forEach(function (el) {
    g.from(el, { opacity: 0, filter: 'blur(10px)', y: 16, duration: 1.1, ease: 'power2.out', clearProps: 'filter',
      scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
  });

  /* the dark bands open like sliding screens */
  $$('[data-expand]').forEach(function (b) {
    g.fromTo(b, { clipPath: 'inset(0% 7% 0% 7% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
      scrollTrigger: { trigger: b, start: 'top 96%', end: 'top 40%', scrub: .4 } });
  });

  /* the bridge diagram wires itself up */
  var dg = $('.diagram');
  if (dg) {
    var dt = g.timeline({ scrollTrigger: { trigger: dg, start: 'top 82%', once: true }, defaults: { ease: EXPO } });
    dt.from(dg.querySelectorAll('.end'), { opacity: 0, y: 12, duration: .8, stagger: .5 }, 0)
      .from(dg.querySelectorAll('.wire'), { scaleX: 0, duration: 1, stagger: .35, ease: 'power2.inOut' }, .15)
      .from(dg.querySelector('img'), { opacity: 0, scale: .82, duration: 1.1 }, .45)
      .from(dg.querySelector('.note'), { opacity: 0, x: 14, duration: .8 }, 1);
  }

  /* services: the gold rule draws over each hairline, numerals count up to themselves */
  $$('.rows li').forEach(function (li, i) {
    var num = li.querySelector('.num'), target = i + 1, o = { v: 0 };
    var tl = g.timeline({ scrollTrigger: { trigger: li, start: 'top 90%', once: true } });
    tl.fromTo(li, { '--rule': 0 }, { '--rule': 1, duration: 1.2, ease: 'power2.inOut' }, 0)
      .to(o, { v: target, duration: .9, ease: 'power2.out', onUpdate: function () { num.textContent = '0' + Math.round(o.v); } }, .1)
      .from(li.querySelector('.txt'), { opacity: 0, x: 22, duration: .9, ease: EXPO }, .15)
      .from(li.querySelector('.arr'), { opacity: 0, x: -14, duration: .7, ease: EXPO }, .4);
  });
  var sp = $('.svc-plate');
  if (sp) g.from(sp, { clipPath: 'inset(0 0 100% 0)', duration: 1.3, ease: 'expo.inOut', scrollTrigger: { trigger: sp, start: 'top 88%', once: true } });

  /* how it goes: the line is drawn by the scroll, and each stage fills in as the dot reaches it */
  var proc = $('.proc');
  if (proc) {
    var items = $$('li', proc), fill = $('.proc-fill', proc), pd = $('.proc-dot', proc), vertical = w.innerWidth <= 1100;
    proc.classList.add('js');
    g.set(fill, vertical ? { scaleY: 0 } : { scaleX: 0 });
    g.set(pd, vertical ? { top: '0%' } : { left: '0%' });
    var pt = g.timeline({ scrollTrigger: { trigger: proc, start: 'top 78%', end: vertical ? 'bottom 60%' : 'top 30%', scrub: .6,
      onUpdate: function (s) { items.forEach(function (li, i) { li.classList.toggle('lit', s.progress >= i / items.length * .98 + .02); }); } } });
    pt.to(fill, vertical ? { scaleY: 1, ease: 'none' } : { scaleX: 1, ease: 'none' }, 0)
      .to(pd, vertical ? { top: '100%', ease: 'none' } : { left: '100%', ease: 'none' }, 0);
  }

  /* why: the plate opens through an iris, the six reasons come into focus two at a time */
  $$('[data-iris]').forEach(function (el) {
    g.fromTo(el, { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 1.6, ease: 'expo.inOut',
      scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
  });
  ST.batch('.reasons li', { start: 'top 90%', once: true, onEnter: function (batch) {
    g.from(batch, { opacity: 0, filter: 'blur(9px)', y: 26, duration: 1.1, ease: 'power2.out', stagger: .14, clearProps: 'filter' });
  } });

  /* ---------- inner pages: v4's markup, v5's manners ---------- */
  if (d.body.classList.contains('inner')) {
    /* kickers: only the words decode, the numeral stays put */
    $$('main .k').forEach(function (k) {
      if (k.closest('.page-hero') || k.closest('.arcbox') || k.closest('form')) return;
      var n = k.lastChild;
      if (!n || n.nodeType !== 3 || !n.textContent.trim()) return;
      var text = n.textContent.trim(), s = d.createElement('span');
      k.setAttribute('aria-label', k.textContent.trim()); s.setAttribute('aria-hidden', 'true'); s.textContent = text;
      k.replaceChild(s, n); k.insertBefore(d.createTextNode(' '), s);
      ST.create({ trigger: k, start: 'top 88%', once: true, onEnter: function () { decode(s, text); } });
    });
    $$('main section:not(.page-hero) h2').forEach(function (h) {
      g.set(h, { opacity: 0 });
      var tl = g.timeline({ paused: true });
      ST.create({ trigger: h, start: 'top 86%', once: true, onEnter: function () { setLines(h, tl, 0); tl.play(); } });
    });
    ST.batch('main .rv', { start: 'top 90%', once: true, onEnter: function (batch) {
      g.from(batch.filter(function (el) { return !el.querySelector('h2'); }), { opacity: 0, filter: 'blur(9px)', y: 22, duration: 1.05, ease: 'power2.out', stagger: .1, clearProps: 'filter' });
    } });
    $$('main .arc .f').forEach(function (f) {
      g.fromTo(f, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', scrollTrigger: { trigger: f, start: 'top 88%', once: true } });
    });
  }

  /* closing plate drifts against the scroll */
  var tp = $('.talk-plate .plate-grid');
  if (tp) g.to(tp, { backgroundPosition: '0px -80px', ease: 'none', scrollTrigger: { trigger: '.talk', start: 'top bottom', end: 'bottom top', scrub: true } });

  w.addEventListener('load', function () { ST.refresh(); });
  } /* boot */
})();
