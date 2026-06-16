/* main.js — Turbo Contracting
   Navigation, header scroll, year fill, scroll progress, back-to-top, jump nav, Web3Forms */

const navToggle = document.querySelector("[data-nav-toggle]");
const primaryNav = document.querySelector("[data-primary-nav]");
const header = document.querySelector("[data-header]");
const yearTargets = document.querySelectorAll("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

yearTargets.forEach((target) => {
  target.textContent = new Date().getFullYear();
});

if (navToggle && primaryNav) {
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      navToggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
    }
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      document.body.classList.contains("nav-open") &&
      event.target instanceof Node &&
      !primaryNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 920) {
      closeMenu();
    }
  });
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* ── Scroll progress bar ── */
const progressBar = document.getElementById("tc-progress");
if (progressBar) {
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = pct.toFixed(2) + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

/* ── Back to top button ── */
const backTop = document.getElementById("tc-back-top");
if (backTop) {
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("is-visible", window.scrollY > 400);
  }, { passive: true });
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ── Services page jump nav active state ── */
const jumpNav = document.querySelector('.tc-services-jumpnav');
if (jumpNav) {
  const sections = Array.from(document.querySelectorAll('.tc-service-section[id]'));
  const links = Array.from(jumpNav.querySelectorAll('a[href^="#"]'));

  const updateJumpNav = () => {
    const threshold = window.scrollY + (window.innerHeight * 0.35) + 76;
    let current = sections[0]?.id || '';
    sections.forEach((sec) => {
      if (sec.getBoundingClientRect().top + window.scrollY <= threshold) {
        current = sec.id;
      }
    });
    links.forEach((link) => {
      const active = link.getAttribute('href') === '#' + current;
      link.classList.toggle('is-active', active);
      if (active) {
        link.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'instant' });
      }
    });
  };

  window.addEventListener('scroll', updateJumpNav, { passive: true });
  updateJumpNav();
}

/* ── Service gallery dropdowns ── */
document.querySelectorAll('[data-service-gallery]').forEach((gallery) => {
  const btn = gallery.querySelector('.tc-gallery-toggle');
  const panel = gallery.querySelector('.tc-gallery-panel');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    panel.classList.toggle('is-open', !open);
  });
});

/* ── Industry gallery modal & lightbox ── */
const industryPhotos = {
  mining:        ['leachtank.jpg','1.jpg','2.jpg','3.jpg','4.jpg'],
  exploration:   ['svt2.jpg','servicetruck.jpg','5.jpg','6.jpg','7.jpg'],
  manufacturing: ['stairs.jpg','8.jpg','9.jpg','10.jpg','11.jpg'],
  construction:  ['stairs.jpg','12.jpg','13.jpg','14.jpg','15.jpg'],
  pulp:          ['16.jpg','17.jpg','18.jpg','19.jpg','stairs.jpg'],
  utilities:     ['servicetruck.jpg','20.jpg','21.jpg','22.jpg','23.jpg'],
};

const indModal       = document.getElementById('tc-ind-modal');
const indModalGrid   = document.getElementById('tc-ind-modal-grid');
const indModalTitle  = document.getElementById('tc-ind-modal-title');
const indModalClose  = indModal?.querySelector('.tc-ind-modal-close');
const indModalBdrop  = indModal?.querySelector('.tc-ind-modal-backdrop');
const lightbox       = document.getElementById('tc-lightbox');
const lbImg          = document.getElementById('tc-lightbox-img');
const lbCounter      = document.getElementById('tc-lightbox-counter');
const lbClose        = lightbox?.querySelector('.tc-lightbox-close');
const lbPrev         = lightbox?.querySelector('.tc-lightbox-prev');
const lbNext         = lightbox?.querySelector('.tc-lightbox-next');
const lbBdrop        = lightbox?.querySelector('.tc-lightbox-backdrop');

let currentPhotos = [];
let lbIndex = 0;
let lastFocused = null;

function openIndModal(industry, label) {
  const photos = industryPhotos[industry] || [];
  currentPhotos = photos;
  indModalTitle.textContent = label;
  indModalGrid.innerHTML = photos.map((src, i) =>
    `<button class="tc-ind-photo-btn" data-index="${i}" aria-label="Open photo ${i + 1} of ${photos.length}">` +
    `<img src="images/${src}" alt="" loading="lazy" decoding="async"></button>`
  ).join('');
  indModal.classList.add('is-open');
  document.body.classList.add('tc-modal-open');
  indModalClose.focus();
  indModalGrid.querySelectorAll('.tc-ind-photo-btn').forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(Number(btn.dataset.index)));
  });
}

function closeIndModal() {
  indModal.classList.remove('is-open');
  document.body.classList.remove('tc-modal-open');
  lastFocused?.focus();
}

function openLightbox(index) {
  lbIndex = index;
  lbImg.src = 'images/' + currentPhotos[index];
  lbImg.alt = 'Photo ' + (index + 1) + ' of ' + currentPhotos.length;
  lbCounter.textContent = (index + 1) + ' / ' + currentPhotos.length;
  lightbox.classList.add('is-open');
  lbClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
}

function lbStep(dir) {
  openLightbox((lbIndex + dir + currentPhotos.length) % currentPhotos.length);
}

if (indModal) {
  document.querySelectorAll('[data-industry-trigger]').forEach((card) => {
    const activate = () => {
      lastFocused = card;
      openIndModal(card.dataset.industryTrigger, card.querySelector('h3').textContent);
    };
    card.addEventListener('click', activate);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });
  indModalClose?.addEventListener('click', closeIndModal);
  indModalBdrop?.addEventListener('click', closeIndModal);
  lbClose?.addEventListener('click', closeLightbox);
  lbBdrop?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', () => lbStep(-1));
  lbNext?.addEventListener('click', () => lbStep(1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('is-open')) { closeLightbox(); return; }
      if (indModal.classList.contains('is-open')) { closeIndModal(); }
    }
    if (lightbox.classList.contains('is-open')) {
      if (e.key === 'ArrowLeft')  lbStep(-1);
      if (e.key === 'ArrowRight') lbStep(1);
    }
  });
}

if (contactForm && formNote) {
  formNote.setAttribute("aria-live", "polite");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const accessKey = contactForm.querySelector('[name="access_key"]')?.value;
    if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      formNote.textContent =
        "Form not yet configured. To request a quote, email inspirationwelding@gmail.com directly.";
      formNote.classList.add("is-active");
      return;
    }

    const submitBtn = contactForm.querySelector('[type="submit"]');
    if (!(submitBtn instanceof HTMLButtonElement)) return;

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending…";
    submitBtn.disabled = true;

    try {
      const data = new FormData(contactForm);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await response.json();

      if (json.success) {
        formNote.textContent =
          "Quote request sent — we’ll be in touch shortly. For urgent work, call Rob at 705-262-4046.";
        formNote.classList.add("is-active");
        contactForm.reset();
      } else {
        throw new Error(json.message);
      }
    } catch (_err) {
      formNote.textContent =
        "Something went wrong. Please email inspirationwelding@gmail.com directly.";
      formNote.classList.add("is-active");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
