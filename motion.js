// GSAP motion layer (GSAP 3.13 incl. SplitText & ScrollTrigger — free for commercial use since 2025)
(() => {
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // iOS gyro permission on first tap (fails silently)
  addEventListener('pointerdown', function ask() {
    try { if (window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) DeviceOrientationEvent.requestPermission().catch(() => {}); } catch (e) {}
    removeEventListener('pointerdown', ask);
  });
  if (rm || !window.gsap) { document.documentElement.classList.add('nx-ready'); return; }
  gsap.registerPlugin(SplitText, ScrollTrigger);
  document.fonts.ready.then(() => {
    const h = new SplitText('h1', { type: 'lines,words,chars', linesClass: 'ln', mask: 'lines' });
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.hdr > *', { y: -20, opacity: 0, duration: .9, stagger: .08 })
      .from('.badge', { y: 18, opacity: 0, duration: .8, stagger: .08 }, '<.1')
      .from(h.chars, { yPercent: 110, rotate: 6, duration: 1.1, stagger: .018 }, '<.1')
      .from('.hand', { opacity: 0, scale: .6, rotate: -14, duration: .9, ease: 'back.out(2)' }, '-=.6')
      .from('.sub', { y: 24, opacity: 0, duration: .9 }, '-=.7')
      .from('.cta .btn', { y: 30, opacity: 0, duration: .9, stagger: .08 }, '-=.7')
      .from('.facts span', { y: 16, opacity: 0, duration: .7, stagger: .08 }, '-=.7')
      .from('.side > *', { x: 60, opacity: 0, rotateY: -12, duration: 1.2, stagger: .12 }, '-=1.1');
    // scroll: copy drifts up, background zooms and dims
    gsap.to('.main', { y: -90, opacity: .2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.side', { y: -40, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.bg', { scale: 1.15, opacity: .5, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    // client tape
    const t = document.querySelector('.tape__t'); if (t) { t.innerHTML += t.innerHTML; gsap.to(t, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 }); }
  });
  // magnetic buttons + case card tilt (pointer devices only)
  if (matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.btn,.pill').forEach(b => {
      const xTo = gsap.quickTo(b, 'x', { duration: .5, ease: 'elastic.out(1,.4)' }), yTo = gsap.quickTo(b, 'y', { duration: .5, ease: 'elastic.out(1,.4)' });
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * .35); yTo((e.clientY - r.top - r.height / 2) * .45); });
      b.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
    const c = document.querySelector('.case');
    if (c) { gsap.set(c, { transformPerspective: 900 });
      c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); gsap.to(c, { rotateY: ((e.clientX - r.left) / r.width - .5) * 10, rotateX: -((e.clientY - r.top) / r.height - .5) * 10, duration: .5 }); });
      c.addEventListener('pointerleave', () => gsap.to(c, { rotateX: 0, rotateY: 0, duration: .8, ease: 'elastic.out(1,.5)' })); }
  }
})();
