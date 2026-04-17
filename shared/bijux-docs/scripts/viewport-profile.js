(function () {
  // Breakpoint contract:
  // - phone: < 48em
  // - normal: 48em to 76.2344em
  // - desktop: > 76.2344em and < 120em
  // - wide: >= 120em
  const PHONE_MAX_MEDIA = "(max-width: 47.9375em)";
  const NORMAL_MAX_MEDIA = "(max-width: 76.2344em)";
  const WIDE_MIN_MEDIA = "(min-width: 120em)";
  const VIEWPORT_PROFILES = Object.freeze({
    PHONE: "phone",
    NORMAL: "normal",
    DESKTOP: "desktop",
    WIDE: "wide",
  });
  const PHONE_MAX_EM = 47.9375;
  const NORMAL_MAX_EM = 76.2344;
  const WIDE_MIN_EM = 120;

  function mediaMatches(query) {
    return typeof window.matchMedia === "function" && window.matchMedia(query).matches;
  }

  function toPixelsFromEm(em) {
    const rootFontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize || "16");
    return em * (Number.isFinite(rootFontSize) ? rootFontSize : 16);
  }

  function currentViewportWidth() {
    if (window.visualViewport && typeof window.visualViewport.width === "number") {
      return window.visualViewport.width;
    }
    if (typeof window.innerWidth === "number") {
      return window.innerWidth;
    }
    return document.documentElement.clientWidth;
  }

  function classifyViewportWidth(width) {
    if (width <= toPixelsFromEm(PHONE_MAX_EM)) {
      return VIEWPORT_PROFILES.PHONE;
    }
    if (width >= toPixelsFromEm(WIDE_MIN_EM)) {
      return VIEWPORT_PROFILES.WIDE;
    }
    if (width <= toPixelsFromEm(NORMAL_MAX_EM)) {
      return VIEWPORT_PROFILES.NORMAL;
    }
    return VIEWPORT_PROFILES.DESKTOP;
  }

  function resolveViewportProfile() {
    if (typeof window.matchMedia !== "function") {
      return classifyViewportWidth(currentViewportWidth());
    }

    if (mediaMatches(PHONE_MAX_MEDIA)) {
      return VIEWPORT_PROFILES.PHONE;
    }

    if (mediaMatches(WIDE_MIN_MEDIA)) {
      return VIEWPORT_PROFILES.WIDE;
    }

    if (mediaMatches(NORMAL_MAX_MEDIA)) {
      return VIEWPORT_PROFILES.NORMAL;
    }

    return VIEWPORT_PROFILES.DESKTOP;
  }

  let currentProfile = null;

  function writeViewportAttribute(target, profile) {
    if (!target || typeof target.setAttribute !== "function") {
      return;
    }
    if (target.getAttribute("data-bijux-viewport") !== profile) {
      target.setAttribute("data-bijux-viewport", profile);
    }
  }

  function applyViewportProfile() {
    const profile = resolveViewportProfile();
    // Keep both targets in sync because CSS and JS hooks read from each in different contexts.
    writeViewportAttribute(document.documentElement, profile);
    writeViewportAttribute(document.body, profile);
    if (profile !== currentProfile) {
      window.dispatchEvent(new CustomEvent("bijux:viewport-change", { detail: { profile } }));
      currentProfile = profile;
    }
    return profile;
  }

  function bindViewportUpdates() {
    if (window.__bijuxViewportBound === true) {
      return;
    }

    window.__bijuxViewportBound = true;

    let rafId = 0;
    const scheduleApply = () => {
      if (rafId !== 0) {
        return;
      }
      // Coalesce rapid resize/orientation events into one profile recompute per frame.
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        applyViewportProfile();
      });
    };

    window.addEventListener("resize", scheduleApply, { passive: true });
    window.addEventListener("orientationchange", scheduleApply, { passive: true });
    window.addEventListener("pageshow", scheduleApply, { passive: true });

    if (window.visualViewport && typeof window.visualViewport.addEventListener === "function") {
      window.visualViewport.addEventListener("resize", scheduleApply, { passive: true });
    }
  }

  function init() {
    applyViewportProfile();
    bindViewportUpdates();
  }

  window.bijuxViewportProfile = {
    current: resolveViewportProfile,
    apply: applyViewportProfile,
    classifyWidth: classifyViewportWidth,
    media: {
      phoneMax: PHONE_MAX_MEDIA,
      normalMax: NORMAL_MAX_MEDIA,
      wideMin: WIDE_MIN_MEDIA,
    },
    describe: () => {
      const profile = resolveViewportProfile();
      return {
        profile,
        width: currentViewportWidth(),
        matches: {
          phone: profile === VIEWPORT_PROFILES.PHONE,
          normalBand: profile === VIEWPORT_PROFILES.NORMAL,
          desktopBand: profile === VIEWPORT_PROFILES.DESKTOP,
          wide: profile === VIEWPORT_PROFILES.WIDE,
        },
        mediaMatches: {
          phoneMax: mediaMatches(PHONE_MAX_MEDIA),
          normalMax: mediaMatches(NORMAL_MAX_MEDIA),
          wideMin: mediaMatches(WIDE_MIN_MEDIA),
        },
      };
    },
  };

  document$.subscribe(init);
})();
