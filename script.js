(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress span");
  const backToTop = document.querySelector(".back-to-top");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");
  const navigationLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const pageRegions = [
    document.querySelector(".site-header"),
    document.querySelector("main"),
    document.querySelector(".site-footer"),
    document.querySelector(".back-to-top")
  ].filter(Boolean);

  let activeProject = null;
  let lastFocusedElement = null;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function updatePageChrome() {
    const scrollTop = window.scrollY;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min((scrollTop / maxScroll) * 100, 100);

    header?.classList.toggle("is-scrolled", scrollTop > 18);
    backToTop?.classList.toggle("is-visible", scrollTop > window.innerHeight * 0.7);

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  function setMenu(open) {
    if (!menuButton || !navigation) return;

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", open);
  }

  function closeMenu() {
    setMenu(false);
  }

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });

  navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (event) => {
    if (!navigation?.classList.contains("is-open")) return;
    if (navigation.contains(event.target) || menuButton?.contains(event.target)) return;
    closeMenu();
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  });

  const sections = [...document.querySelectorAll("main section[id], footer[id]")];
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navigationLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-30% 0px -60%", threshold: [0.05, 0.2, 0.5] }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6%" }
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  function padNumber(value) {
    return String(value).padStart(2, "0");
  }

  document.querySelectorAll("[data-carousel]").forEach((component) => {
    const carousel = component.querySelector(".carousel");
    const previous = component.querySelector("[data-carousel-previous]");
    const next = component.querySelector("[data-carousel-next]");
    const current = component.querySelector("[data-carousel-current]");
    const total = component.querySelector("[data-carousel-total]");

    if (!carousel) return;

    const cards = [...carousel.children];
    if (total) total.textContent = padNumber(cards.length);

    function getStep() {
      const firstCard = cards[0];
      if (!firstCard) return carousel.clientWidth;
      const gap = Number.parseFloat(getComputedStyle(carousel).gap) || 0;
      return firstCard.getBoundingClientRect().width + gap;
    }

    function updateCarouselState() {
      const max = Math.max(carousel.scrollWidth - carousel.clientWidth, 0);
      const tolerance = 4;
      if (previous) previous.disabled = carousel.scrollLeft <= tolerance;
      if (next) next.disabled = carousel.scrollLeft >= max - tolerance;

      if (current && cards.length) {
        const step = Math.max(getStep(), 1);
        const index = Math.min(Math.round(carousel.scrollLeft / step), cards.length - 1);
        current.textContent = padNumber(index + 1);
      }
    }

    function scroll(direction) {
      carousel.scrollBy({
        left: getStep() * direction,
        behavior: prefersReducedMotion.matches ? "auto" : "smooth"
      });
    }

    previous?.addEventListener("click", () => scroll(-1));
    next?.addEventListener("click", () => scroll(1));
    carousel.addEventListener("scroll", updateCarouselState, { passive: true });
    window.addEventListener("resize", updateCarouselState);

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scroll(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scroll(1);
      }
    });

    updateCarouselState();
  });

  function projectSlugFromLocation() {
    const match = window.location.hash.match(/^#\/portfolio\/([a-z0-9-]+)$/i);
    return match ? match[1] : null;
  }

  function setPageInert(inert) {
    pageRegions.forEach((region) => {
      if (inert) {
        region.setAttribute("inert", "");
        region.setAttribute("aria-hidden", "true");
      } else {
        region.removeAttribute("inert");
        region.removeAttribute("aria-hidden");
      }
    });
  }

  function focusableElements(container) {
    return [...container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )].filter((element) => !element.hasAttribute("hidden"));
  }

  function pauseAllDetailVideos(except = null) {
    document.querySelectorAll(".project-detail video").forEach((video) => {
      if (video !== except) video.pause();
    });
  }

  function showProject(slug, { updateHistory = true } = {}) {
    const detail = document.getElementById(`project-detail-${slug}`);
    if (!detail) return;

    if (activeProject === detail) return;

    if (activeProject) {
      hideProject({ restoreFocus: false });
    }

    lastFocusedElement = document.activeElement;
    activeProject = detail;
    detail.hidden = false;
    detail.setAttribute("aria-hidden", "false");
    body.classList.add("is-locked");
    setPageInert(true);

    const video = detail.querySelector("video");
    pauseAllDetailVideos(video);
    if (video && !prefersReducedMotion.matches) {
      video.play().catch(() => {});
    }

    requestAnimationFrame(() => {
      detail.classList.add("is-open");
      detail.querySelector("[data-close-project]")?.focus({ preventScroll: true });
    });

    if (updateHistory) {
      history.pushState({ project: slug }, "", `#/portfolio/${slug}`);
    }
  }

  function hideProject({ restoreFocus = true } = {}) {
    if (!activeProject) return;

    const detail = activeProject;
    const video = detail.querySelector("video");
    if (video) video.pause();

    detail.classList.remove("is-open");
    detail.setAttribute("aria-hidden", "true");
    activeProject = null;
    body.classList.remove("is-locked");
    setPageInert(false);

    window.setTimeout(() => {
      detail.hidden = true;
      if (restoreFocus && lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus({ preventScroll: true });
      }
    }, prefersReducedMotion.matches ? 0 : 440);
  }

  function requestCloseProject() {
    if (!activeProject) return;

    if (history.state?.project && !history.state.directEntry) {
      history.back();
      return;
    }

    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    hideProject();
  }

  function syncProjectWithLocation() {
    const slug = projectSlugFromLocation();
    if (slug) {
      if (!history.state?.project) {
        history.replaceState({ project: slug, directEntry: true }, "", window.location.href);
      }
      showProject(slug, { updateHistory: false });
    } else {
      hideProject();
    }
  }

  document.querySelectorAll("[data-project]").forEach((card) => {
    const open = () => showProject(card.dataset.project);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });

  document.querySelectorAll("[data-close-project]").forEach((button) => {
    button.addEventListener("click", requestCloseProject);
  });

  document.querySelectorAll(".project-detail").forEach((detail) => {
    detail.addEventListener("click", (event) => {
      if (event.target === detail) requestCloseProject();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      requestCloseProject();
      return;
    }

    if (event.key !== "Tab" || !activeProject) return;

    const focusable = focusableElements(activeProject);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("popstate", syncProjectWithLocation);
  window.addEventListener("scroll", updatePageChrome, { passive: true });
  window.addEventListener("resize", closeMenu);

  prefersReducedMotion.addEventListener?.("change", (event) => {
    if (event.matches) pauseAllDetailVideos();
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  updatePageChrome();
  syncProjectWithLocation();
})();
