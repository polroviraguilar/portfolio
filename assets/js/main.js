(() => {
  "use strict";

  const body = document.body;
  const header = document.querySelector(".site-header");
  const backToTop = document.querySelector(".back-to-top");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");
  const navigationLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pageRegions = [header, document.querySelector("main"), document.querySelector(".contact"), backToTop].filter(Boolean);

  let activeProject = null;
  let lastFocusedElement = null;
  let chromeFrame = 0;

  function updateChrome() {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 20);
    backToTop?.classList.toggle("is-visible", y > window.innerHeight * 0.75);
    chromeFrame = 0;
  }

  function requestChromeUpdate() {
    if (chromeFrame) return;
    chromeFrame = requestAnimationFrame(updateChrome);
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

  const observedSections = [...document.querySelectorAll("main section[id], footer[id]")];
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navigationLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`));
  }, { rootMargin: "-32% 0px -58%", threshold: [0.05, 0.2, 0.45] });
  observedSections.forEach((section) => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -6%" });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const selectedSection = document.querySelector(".selected-work");
  const featuredProjects = [...document.querySelectorAll(".featured-project[data-atmosphere]")];
  if (selectedSection && featuredProjects.length) {
    const atmosphereObserver = new IntersectionObserver((entries) => {
      const candidate = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!candidate) return;
      selectedSection.dataset.activeAtmosphere = candidate.target.dataset.atmosphere;
      featuredProjects.forEach((project) => project.classList.toggle("is-current", project === candidate.target));
    }, { rootMargin: "-30% 0px -35%", threshold: [0.12, 0.35, 0.6] });
    featuredProjects.forEach((project) => atmosphereObserver.observe(project));
  }

  function setVideoState(video, shouldPlay) {
    if (!(video instanceof HTMLVideoElement)) return;
    if (prefersReducedMotion.matches || !shouldPlay) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }

  const viewportVideos = [...document.querySelectorAll("[data-viewport-video]")];
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => setVideoState(entry.target, entry.isIntersecting && entry.intersectionRatio >= 0.35));
  }, { threshold: [0, 0.35, 0.75] });
  viewportVideos.forEach((video) => videoObserver.observe(video));
  prefersReducedMotion.addEventListener?.("change", () => viewportVideos.forEach((video) => setVideoState(video, false)));

  const animatedImages = [...document.querySelectorAll("img[data-animated-src]")];
  const animatedObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const image = entry.target;
      if (image.dataset.animatedLoaded !== "true") {
        image.src = image.dataset.animatedSrc;
        image.dataset.animatedLoaded = "true";
      }
      observer.unobserve(image);
    });
  }, { rootMargin: "250px 0px", threshold: 0.01 });
  animatedImages.forEach((image) => animatedObserver.observe(image));

  document.querySelectorAll("img").forEach((image) => {
    const applyFallback = () => {
      const fallback = image.dataset.fallback || "assets/images/common/media-placeholder.svg";
      if (image.dataset.fallbackApplied === "true" || image.src.endsWith(fallback)) return;
      image.dataset.fallbackApplied = "true";
      image.src = fallback;
    };
    image.addEventListener("error", applyFallback);
    if (image.complete && image.naturalWidth === 0) applyFallback();
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
    return [...container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      .filter((element) => !element.hasAttribute("hidden"));
  }

  function updateDetailProgress(detail) {
    const panel = detail?.querySelector(".project-detail__panel");
    const bar = detail?.querySelector(".detail-progress span");
    if (!panel || !bar) return;
    const maximum = Math.max(panel.scrollHeight - panel.clientHeight, 1);
    bar.style.width = `${Math.min((panel.scrollTop / maximum) * 100, 100)}%`;
  }

  function pauseDetailVideos(except = null) {
    document.querySelectorAll(".project-detail video").forEach((video) => {
      if (video !== except) video.pause();
    });
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

    const panel = detail.querySelector(".project-detail__panel");
    if (panel) panel.scrollTop = 0;
    updateDetailProgress(detail);

    const video = detail.querySelector("video");
    pauseDetailVideos(video);
    setVideoState(video, true);

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
    }, prefersReducedMotion.matches ? 0 : 360);
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

  document.querySelectorAll("[data-project]").forEach((trigger) => {
    const open = () => showProject(trigger.dataset.project);
    trigger.addEventListener("click", open);
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });

  document.querySelectorAll("[data-close-project]").forEach((button) => button.addEventListener("click", requestCloseProject));
  document.querySelectorAll(".project-detail").forEach((detail) => {
    detail.addEventListener("click", (event) => {
      if (event.target === detail) requestCloseProject();
    });
    const panel = detail.querySelector(".project-detail__panel");
    panel?.addEventListener("scroll", () => updateDetailProgress(detail), { passive: true });
  });

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
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.querySelectorAll("[data-media-switcher]").forEach((switcher) => {
    const image = switcher.querySelector("[data-media-image]");
    const buttons = [...switcher.querySelectorAll("[data-media-src]")];
    if (!image || !buttons.length) return;
    buttons.forEach((button) => button.addEventListener("click", () => {
      const source = button.dataset.mediaSrc;
      if (!source || image.src.endsWith(source)) return;
      buttons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      image.classList.add("is-changing");
      const preload = new Image();
      preload.onload = () => {
        image.src = source;
        image.alt = button.dataset.mediaAlt || "Selected 3D model";
        requestAnimationFrame(() => image.classList.remove("is-changing"));
      };
      preload.onerror = () => image.classList.remove("is-changing");
      preload.src = source;
    }));
  });

  document.getElementById("current-year").textContent = String(new Date().getFullYear());
  window.addEventListener("popstate", syncProjectWithLocation);
  window.addEventListener("scroll", requestChromeUpdate, { passive: true });
  window.addEventListener("resize", requestChromeUpdate, { passive: true });
  updateChrome();
  syncProjectWithLocation();
})();
