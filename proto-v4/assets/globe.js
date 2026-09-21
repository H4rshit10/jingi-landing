/* JINGI prototype — the turning globe.
   A wireframe globe in an orthographic projection. As the consultation band
   scrolls through, the globe turns from Tokyo to India and the great-circle
   route draws between the two cities. No landmasses on purpose: borders are
   a political claim, and the graticule with two points already says "two
   places on one globe".

   Contract: without GSAP or with reduced motion, one static frame is drawn
   with both cities in view and the route complete. Without script at all,
   the SVG arc underneath stays visible (see .globe-wrap in site-v4.css). */
(function () {
  'use strict';
  var wrap = document.querySelector('.globe-wrap');
  var c = wrap && wrap.querySelector('canvas');
  if (!c || !c.getContext) return;
  var ctx = c.getContext('2d');
  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var TOKYO = { lat: 35.68, lon: 139.69, name: 'Tokyo' };
  var INDIA = { lat: 28.46, lon: 77.03, name: 'India' };
  var LON_START = 165, LON_END = 52;         /* the turn: 113 degrees, Tokyo to India */
  var TILT = 22 * Math.PI / 180;
  var D2R = Math.PI / 180;

  var rootCss = getComputedStyle(document.documentElement);
  var PAPER = (rootCss.getPropertyValue('--globe-line') || '').trim() || '238,235,227';
  var BRASS = (rootCss.getPropertyValue('--globe-accent') || '').trim() || '200,168,90';
  var W = 0, H = 0, R = 0, cx = 0, cy = 0, dpr = 1;

  function size() {
    var r = c.getBoundingClientRect();
    if (!r.width) return false;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = r.width; H = r.height;
    c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = Math.min(W, H) / 2 - 30; cx = W / 2; cy = H / 2;
    return true;
  }

  /* unit vector for a lat/lon: x toward lon 0, y north, z toward lon 90 */
  function vec(lat, lon) {
    var la = lat * D2R, lo = lon * D2R;
    return [Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)];
  }
  /* rotate so that longitude lon0 faces the viewer, tilt the pole toward us, project */
  function proj(v, lon0) {
    var l = lon0 * D2R, cl = Math.cos(l), sl = Math.sin(l);
    var d = v[0] * cl + v[2] * sl;          /* depth toward the viewer */
    var sx = -v[0] * sl + v[2] * cl;        /* east is right */
    var y = v[1];
    var sy = y * Math.cos(TILT) - d * Math.sin(TILT);
    var sd = y * Math.sin(TILT) + d * Math.cos(TILT);
    return { x: cx + R * sx, y: cy - R * sy, d: sd };
  }

  /* draw a polyline of vectors, lifting the pen wherever it passes behind the globe */
  function poly(vs, lon0) {
    var pen = false;
    ctx.beginPath();
    for (var i = 0; i < vs.length; i++) {
      var p = proj(vs[i], lon0);
      if (p.d > 0) { if (pen) ctx.lineTo(p.x, p.y); else { ctx.moveTo(p.x, p.y); pen = true; } }
      else pen = false;
    }
    ctx.stroke();
  }

  /* graticule geometry, built once */
  var PARALLELS = [], MERIDIANS = [];
  (function build() {
    var lat, lon, line;
    for (lat = -75; lat <= 75; lat += 15) {
      line = [];
      for (lon = 0; lon <= 360; lon += 3) line.push(vec(lat, lon));
      PARALLELS.push({ lat: lat, pts: line });
    }
    for (lon = 0; lon < 360; lon += 15) {
      line = [];
      for (lat = -90; lat <= 90; lat += 3) line.push(vec(lat, lon));
      MERIDIANS.push({ lon: lon, pts: line });
    }
  })();

  /* the great-circle route, as points along the sphere between the two cities */
  var ROUTE = (function () {
    var a = vec(TOKYO.lat, TOKYO.lon), b = vec(INDIA.lat, INDIA.lon);
    var dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    var om = Math.acos(Math.max(-1, Math.min(1, dot))), so = Math.sin(om);
    var out = [], N = 72;
    for (var i = 0; i <= N; i++) {
      var t = i / N, ka = Math.sin((1 - t) * om) / so, kb = Math.sin(t * om) / so;
      out.push([a[0] * ka + b[0] * kb, a[1] * ka + b[1] * kb, a[2] * ka + b[2] * kb]);
    }
    return out;
  })();

  function city(cit, lon0, labelSide) {
    var p = proj(vec(cit.lat, cit.lon), lon0);
    if (p.d <= 0) return;
    var k = .55 + .45 * p.d;                      /* a little smaller near the limb */
    ctx.fillStyle = 'rgb(' + BRASS + ')';
    ctx.beginPath(); ctx.arc(p.x, p.y, 3.6 * k, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(' + BRASS + ',.45)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(p.x, p.y, 9 * k, 0, Math.PI * 2); ctx.stroke();
    ctx.font = '500 11px "IBM Plex Mono","Cascadia Mono",Consolas,monospace';
    ctx.fillStyle = 'rgba(' + BRASS + ',' + (.55 + .45 * p.d) + ')';
    ctx.textBaseline = 'middle';
    var label = cit.name.toUpperCase();
    /* keep the label inside the disc */
    var right = labelSide > 0 ? p.x + 16 : p.x - 16 - ctx.measureText(label).width;
    if (right + ctx.measureText(label).width > cx + R - 4) right = p.x - 16 - ctx.measureText(label).width;
    if (right < cx - R + 4) right = p.x + 16;
    ctx.textAlign = 'left';
    ctx.fillText(label, right, p.y);
  }

  function draw(progress) {
    if (!W && !size()) return;
    var p = Math.max(0, Math.min(1, progress));
    var lon0 = LON_START + (LON_END - LON_START) * p;
    ctx.clearRect(0, 0, W, H);

    /* volume: a soft light from the upper left */
    var g = ctx.createRadialGradient(cx - R * .38, cy - R * .42, R * .08, cx, cy, R);
    g.addColorStop(0, 'rgba(' + PAPER + ',.085)');
    g.addColorStop(1, 'rgba(' + PAPER + ',0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

    /* graticule */
    ctx.lineWidth = 1;
    var i;
    for (i = 0; i < PARALLELS.length; i++) {
      ctx.strokeStyle = 'rgba(' + PAPER + ',' + (PARALLELS[i].lat === 0 ? .26 : .13) + ')';
      poly(PARALLELS[i].pts, lon0);
    }
    for (i = 0; i < MERIDIANS.length; i++) {
      ctx.strokeStyle = 'rgba(' + PAPER + ',.13)';
      poly(MERIDIANS[i].pts, lon0);
    }
    /* the limb */
    ctx.strokeStyle = 'rgba(' + BRASS + ',.55)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();

    /* the route, dotted in full, then drawn solid as far as the turn has come */
    ctx.setLineDash([2, 6]); ctx.strokeStyle = 'rgba(' + BRASS + ',.4)'; ctx.lineWidth = 1;
    poly(ROUTE, lon0);
    ctx.setLineDash([]);
    var n = Math.round(ROUTE.length * Math.min(1, p * 1.15));
    if (n > 1) { ctx.strokeStyle = 'rgb(' + BRASS + ')'; ctx.lineWidth = 1.6; poly(ROUTE.slice(0, n), lon0); }

    city(TOKYO, lon0, 1);
    city(INDIA, lon0, -1);

    /* the offset, small, under the globe */
    ctx.font = '500 11px "IBM Plex Mono","Cascadia Mono",Consolas,monospace';
    ctx.fillStyle = 'rgba(' + PAPER + ',.6)'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillText('+3:30  ·  ONE DESK', cx, cy + R + 24);
  }

  wrap.classList.add('live');
  var g = window.gsap, ST = window.ScrollTrigger;
  var section = wrap.closest('.consult') || wrap;

  if (g && ST && !reduce) {
    g.registerPlugin(ST);
    var state = { p: 0 };
    size(); draw(0);
    g.to(state, { p: 1, ease: 'none', onUpdate: function () { draw(state.p); },
      scrollTrigger: { trigger: section, start: 'top 88%', end: 'bottom 40%', scrub: .7 } });
    window.addEventListener('resize', function () { size(); draw(state.p); });
    document.fonts && document.fonts.ready && document.fonts.ready.then(function () { draw(state.p); });
  } else {
    size(); draw(.5);
    window.addEventListener('resize', function () { size(); draw(.5); });
    document.fonts && document.fonts.ready && document.fonts.ready.then(function () { draw(.5); });
  }
})();
