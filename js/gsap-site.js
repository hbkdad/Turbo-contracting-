/* gsap-site.js — Turbo Contracting and Mining Services
   GSAP + ScrollTrigger + Lenis — 3D animations, parallax, tilt */

(function () {
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Lenis smooth scroll ── */
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({ duration: 1.0, smoothWheel: true, lerp: 0.12 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  if (reduced) {
    /* minimal: just run counters */
    document.querySelectorAll('[data-counter]').forEach((el) => {
      el.textContent = el.dataset.counter + (el.dataset.suffix || '');
    });
    return;
  }

  /* ── Hero photo parallax (scroll) ── */
  const heroBg = document.querySelector('[data-hero-bg]');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '[data-hero]',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /* ── Hero mouse parallax ── */
  const hero = document.querySelector('[data-hero]');
  if (hero && heroBg) {
    hero.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (clientX - cx) / cx;
      const dy = (clientY - cy) / cy;
      gsap.to(heroBg, {
        x: dx * -18,
        y: dy * -12,
        duration: 1.2,
        ease: 'power2.out',
      });
    });
  }

  /* ── Hero text entrance ── */
  const heroItems = gsap.utils.toArray('[data-motion="hero"]');
  if (heroItems.length) {
    gsap.set(heroItems, { opacity: 0, y: 48 });
    gsap.to(heroItems, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.2,
      clearProps: 'transform,opacity',
    });
  }

  /* ── Clip-path reveal for images ── */
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Section reveals (fade up) ── */
  gsap.utils.toArray('[data-motion="section"]').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Stagger groups ── */
  gsap.utils.toArray('[data-motion="stagger"]').forEach((group) => {
    const items = gsap.utils.toArray(':scope > [data-motion-item]', group);
    if (!items.length) return;
    gsap.fromTo(items,
      { opacity: 0, y: 28, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.09,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: group,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ── Gallery depth parallax (different scroll speeds) ── */
  gsap.utils.toArray('.tc-gallery-depth .tc-gallery-img').forEach((img, i) => {
    const speed = i % 3 === 0 ? -0.08 : i % 3 === 1 ? 0.06 : -0.04;
    gsap.to(img, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  });

  /* ── 3D photo tilt on hover ── */
  document.querySelectorAll('.tc-photo-3d').forEach((card) => {
    const inner = card.querySelector('img') || card;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(card, {
        rotateY: x * 12,
        rotateX: -y * 8,
        transformPerspective: 900,
        ease: 'power2.out',
        duration: 0.45,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });

  /* ── Before/After drag slider ── */
  document.querySelectorAll('.tc-ba-wrap').forEach((wrap) => {
    const after = wrap.querySelector('.tc-ba-after');
    const handle = wrap.querySelector('.tc-ba-handle');
    if (!after || !handle) return;

    let dragging = false;
    const setPos = (clientX) => {
      const rect = wrap.getBoundingClientRect();
      const pct = Math.min(Math.max((clientX - rect.left) / rect.width * 100, 2), 98);
      after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + '%';
    };

    /* animate in on scroll to 50% */
    ScrollTrigger.create({
      trigger: wrap,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo({ pct: 0 }, { pct: 50 }, {
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: function () {
            const p = this.targets()[0].pct;
            after.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
            handle.style.left = p + '%';
          },
        });
      },
    });

    wrap.addEventListener('mousedown', (e) => { dragging = true; setPos(e.clientX); });
    wrap.addEventListener('touchstart', (e) => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mousemove', (e) => { if (dragging) setPos(e.clientX); });
    window.addEventListener('touchmove', (e) => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mouseup', () => { dragging = false; });
    window.addEventListener('touchend', () => { dragging = false; });
  });

  /* ── Counter roll-up ── */
  document.querySelectorAll('[data-counter]').forEach((el) => {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.suffix || '';
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString() + suffix; },
          onComplete: () => { el.textContent = target.toLocaleString() + suffix; },
        });
      },
    });
  });

}());
