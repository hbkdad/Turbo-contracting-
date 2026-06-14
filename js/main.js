/* main.js — Turbo Contracting
   Navigation, header scroll, year fill, Web3Forms contact handler */

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

if (contactForm && formNote) {
  formNote.setAttribute("aria-live", "polite");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const accessKey = contactForm.querySelector('[name="access_key"]')?.value;
    if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      formNote.textContent =
        "Form not yet configured. To request a quote, email info@turbocontracting.ca directly.";
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
          "Quote request sent — we’ll be in touch shortly. For urgent work, email info@turbocontracting.ca or call directly.";
        formNote.classList.add("is-active");
        contactForm.reset();
      } else {
        throw new Error(json.message);
      }
    } catch (_err) {
      formNote.textContent =
        "Something went wrong. Please email info@turbocontracting.ca directly.";
      formNote.classList.add("is-active");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
