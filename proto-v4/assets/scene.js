/* JINGI v4 — motion for the scene hero.

   Contract, same as the rest of the site: the picture is complete without
   this file. Nothing is hidden in CSS; every start state below is set here,
   and only when GSAP is present and the visitor has not asked for less
   motion. The words are animated by site.js, as on every other page. */
(function () {
  'use strict';
  var d = document;
  var scene = d.querySelector('.hero2.scene');
  if (!scene) return;
  var stage = scene.querySelector('.scene-stage');
  var box = scene.querySelector('.scene-box');
  var layers = Array.prototype.slice.call(scene.querySelectorAll('.sl[data-depth]'));

  /* ambient CSS loops run only while the picture is on screen */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { scene.classList.toggle('is-off', !e.isIntersecting); });
    }, { rootMargin: '80px' }).observe(scene);
  }

  var g = window.gsap, ST = window.ScrollTrigger;
  var reduce = false, fine = false, wide = window.innerWidth > 900;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  } catch (e) {}
  if (!g || reduce) return;
  if (ST) g.registerPlugin(ST);

  /* ---------- the opening: about two seconds, then it is still ---------- */
  var sun = scene.querySelector('.sun-rise');
  var arcs = scene.querySelectorAll('.sl-arc path');
  var labels = scene.querySelectorAll('.scene-label');
  var open = g.timeline({ defaults: { ease: 'expo.out' } });

  open.from(scene.querySelector('.scene-sky'), { opacity: 0, duration: 1.6, ease: 'power2.out' }, 0);
  if (sun) open.from(sun, { yPercent: 16, duration: 2.1, ease: 'power3.out' }, 0);
  open.from(scene.querySelector('.sl-japan > img'), { y: 26, opacity: 0, duration: 1.5 }, .1);
  open.from(scene.querySelector('.sl-india .ph:not(.mirror)'), { y: 40, opacity: 0, duration: 1.5 }, .22);
  open.from(scene.querySelector('.sl-india .ph.mirror'), { opacity: 0, duration: 1.5 }, .5);
  open.from(scene.querySelector('.sl-sakura > img'), { xPercent: 5, yPercent: -5, opacity: 0, duration: 1.8, ease: 'power2.out' }, .3);
  if (arcs.length) {
    /* the two halves draw outward from the feet and meet at the label */
    open.fromTo(arcs[0], { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, .5);
    if (arcs[1]) open.fromTo(arcs[1], { strokeDashoffset: -1 }, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, .5);
  }
  if (labels.length) open.from(labels, { opacity: 0, y: 10, duration: .8, stagger: .14 }, 1.35);
  open.from(scene.querySelectorAll('.scene-wave, .scene-mandala'), { opacity: 0, duration: 1.6, ease: 'power1.out' }, .4);
  var strip = d.querySelectorAll('.strip a, .strip .say');
  if (strip.length) open.from(strip, { y: 16, opacity: 0, duration: .7, stagger: .08 }, 1.1);

  if (!wide) return;

  /* ---------- depth on scroll: far plates leave slowly, near ones quickly ---------- */
  if (ST) {
    layers.forEach(function (el) {
      var depth = parseFloat(el.getAttribute('data-depth')) || 0;
      /* the plate itself: the cursor owns its x and y, the opening owns what is inside it */
      g.to(el, { yPercent: -depth * 9, ease: 'none',
        scrollTrigger: { trigger: scene, start: 'top top', end: 'bottom top', scrub: .4 } });
    });
    g.to(box, { scale: 1.035, ease: 'none',
      scrollTrigger: { trigger: scene, start: 'top top', end: 'bottom top', scrub: .4 } });
  }

  /* ---------- depth under the cursor: the plates part, and the whole picture leans ---------- */
  if (fine) {
    var SHIFT = 30;                                     /* px of travel for the nearest plate */
    var movers = layers.map(function (el) {
      var depth = parseFloat(el.getAttribute('data-depth')) || 0;
      return { x: g.quickTo(el, 'x', { duration: 1.1, ease: 'power3.out' }),
               y: g.quickTo(el, 'y', { duration: 1.1, ease: 'power3.out' }), d: depth };
    });
    var tiltY = g.quickTo(box, 'rotationY', { duration: 1.4, ease: 'power3.out' });
    var tiltX = g.quickTo(box, 'rotationX', { duration: 1.4, ease: 'power3.out' });
    scene.addEventListener('mousemove', function (e) {
      var r = scene.getBoundingClientRect();
      var nx = ((e.clientX - r.left) / r.width - .5) * 2;
      var ny = ((e.clientY - r.top) / r.height - .5) * 2;
      movers.forEach(function (m) { m.x(-nx * SHIFT * m.d); m.y(-ny * SHIFT * m.d * .5); });
      tiltY(nx * 1.3); tiltX(-ny * .8);
    }, { passive: true });
    scene.addEventListener('mouseleave', function () {
      movers.forEach(function (m) { m.x(0); m.y(0); });
      tiltY(0); tiltX(0);
    });
  }
})();
