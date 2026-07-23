(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector(".site-header");
  const progressBar = document.querySelector(".scroll-progress span");
  const backToTop = document.querySelector(".back-to-top");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");
  const navigationLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const pageRegions = [header, document.querySelector("main"), document.querySelector(".contact"), backToTop].filter(Boolean);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  let activeProject = null;
  let lastFocusedElement = null;
  let frameRequested = false;

  function updatePageChrome() {
    const scrollTop = window.scrollY;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    header?.classList.toggle("is-scrolled", scrollTop > 18);
    backToTop?.classList.toggle("is-visible", scrollTop > window.innerHeight * 0.72);
    if (progressBar) progressBar.style.width = `${Math.min((scrollTop / maxScroll) * 100, 100)}%`;
    frameRequested = false;
  }

  function requestChromeUpdate() {
    if (frameRequested) return;
    frameRequested = true;
    requestAnimationFrame(updatePageChrome);
  }

  function setMenu(open) {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navigation.classList.toggle("is-open", open);
  }

  menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  navigationLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("click", (event) => {
    if (!navigation?.classList.contains("is-open")) return;
    if (navigation.contains(event.target) || menuButton?.contains(event.target)) return;
    setMenu(false);
  });

  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" }));

  const sections = [...document.querySelectorAll("main section[id], footer[id]")];
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navigationLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`));
  }, { rootMargin: "-28% 0px -62%", threshold: [0.05, 0.2, 0.5] });
  sections.forEach((section) => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -5%" });
  document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
    revealObserver.observe(element);
  });

  if (supportsHover.matches && !prefersReducedMotion.matches) {
    document.addEventListener("pointermove", (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    }, { passive: true });

    document.querySelectorAll("[data-tilt]").forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty("--ry", `${x * 4.5}deg`);
        element.style.setProperty("--rx", `${y * -4.5}deg`);
      });
      element.addEventListener("pointerleave", () => {
        element.style.setProperty("--ry", "0deg");
        element.style.setProperty("--rx", "0deg");
      });
    });

    const stage = document.querySelector("[data-parallax-stage]");
    stage?.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.style.setProperty("--stage-x", `${x * 14}px`);
      stage.style.setProperty("--stage-y", `${y * 14}px`);
    });
    stage?.addEventListener("pointerleave", () => {
      stage.style.setProperty("--stage-x", "0px");
      stage.style.setProperty("--stage-y", "0px");
    });
  }

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
    return [...container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter((element) => !element.hasAttribute("hidden"));
  }

  function pauseAllDetailVideos(except = null) {
    document.querySelectorAll(".project-detail video").forEach((video) => { if (video !== except) video.pause(); });
  }

  function showProject(slug, { updateHistory = true } = {}) {
    const detail = document.getElementById(`project-detail-${slug}`);
    if (!detail || activeProject === detail) return;
    if (activeProject) hideProject({ restoreFocus: false });

    lastFocusedElement = document.activeElement;
    activeProject = detail;
    detail.hidden = false;
    detail.setAttribute("aria-hidden", "false");
    body.classList.add("is-locked");
    setPageInert(true);

    const video = detail.querySelector("video");
    pauseAllDetailVideos(video);
    if (video && !prefersReducedMotion.matches) video.play().catch(() => {});

    requestAnimationFrame(() => {
      detail.classList.add("is-open");
      detail.querySelector("[data-close-project]")?.focus({ preventScroll: true });
    });

    if (updateHistory) history.pushState({ project: slug }, "", `#/portfolio/${slug}`);
  }

  function hideProject({ restoreFocus = true } = {}) {
    if (!activeProject) return;
    const detail = activeProject;
    detail.querySelector("video")?.pause();
    detail.classList.remove("is-open");
    detail.setAttribute("aria-hidden", "true");
    activeProject = null;
    body.classList.remove("is-locked");
    setPageInert(false);

    window.setTimeout(() => {
      detail.hidden = true;
      if (restoreFocus && lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus({ preventScroll: true });
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
      if (!history.state?.project) history.replaceState({ project: slug, directEntry: true }, "", window.location.href);
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

  document.querySelectorAll("[data-close-project]").forEach((button) => button.addEventListener("click", requestCloseProject));
  document.querySelectorAll(".project-detail").forEach((detail) => detail.addEventListener("click", (event) => { if (event.target === detail) requestCloseProject(); }));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
      requestCloseProject();
      return;
    }
    if (event.key !== "Tab" || !activeProject) return;
    const focusable = focusableElements(activeProject);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });


  document.querySelectorAll("img[data-fallback]").forEach((image) => {
    const fallbackSource = image.dataset.fallback;
    const applyFallback = () => {
      if (!fallbackSource || image.dataset.fallbackApplied === "true") return;
      image.dataset.fallbackApplied = "true";
      image.src = fallbackSource;
    };

    image.addEventListener("error", applyFallback);
    if (image.complete && image.naturalWidth === 0) applyFallback();
  });

  document.querySelectorAll("[data-media-switcher]").forEach((switcher) => {
    const image = switcher.querySelector("[data-media-image]");
    const buttons = [...switcher.querySelectorAll("[data-media-src]")];
    if (!image || !buttons.length) return;

    buttons.forEach((button) => button.addEventListener("click", () => {
      const newSource = button.dataset.mediaSrc;
      const newAlt = button.dataset.mediaAlt;
      if (!newSource || image.src.endsWith(newSource)) return;
      buttons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      image.classList.add("is-changing");
      const preload = new Image();
      preload.onload = () => {
        image.src = newSource;
        image.alt = newAlt || "Selected 3D model";
        requestAnimationFrame(() => image.classList.remove("is-changing"));
      };
      preload.onerror = () => image.classList.remove("is-changing");
      preload.src = newSource;
    }));
  });

  document.getElementById("current-year").textContent = String(new Date().getFullYear());
  window.addEventListener("popstate", syncProjectWithLocation);
  window.addEventListener("scroll", requestChromeUpdate, { passive: true });
  window.addEventListener("resize", () => setMenu(false));
  prefersReducedMotion.addEventListener?.("change", (event) => { if (event.matches) pauseAllDetailVideos(); });

  updatePageChrome();
  syncProjectWithLocation();
})();
