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
  const MEDIA_QUERY_BASE_FONT_PX = 16;
  const REFERENCE_WIDTHS = Object.freeze({
    phone390: 390,
    normal768: 768,
    normal1024: 1024,
    desktop1280: 1280,
    wide1920: 1920,
  });

  function mediaMatches(query) {
    return typeof window.matchMedia === "function" && window.matchMedia(query).matches;
  }

  function toPixelsFromEm(em) {
    // Media-query em units map to the browser's initial font size (16px in our shell assumptions),
    // not the potentially customized runtime <html> computed font-size.
    return em * MEDIA_QUERY_BASE_FONT_PX;
  }

  function currentViewportWidth() {
    if (typeof document.documentElement?.clientWidth === "number" && document.documentElement.clientWidth > 0) {
      return document.documentElement.clientWidth;
    }
    if (typeof window.innerWidth === "number") {
      return window.innerWidth;
    }
    if (window.visualViewport && typeof window.visualViewport.width === "number") {
      return window.visualViewport.width;
    }
    return Number.NaN;
  }

  function classifyViewportWidth(width) {
    if (!Number.isFinite(width) || width <= 0) {
      return VIEWPORT_PROFILES.DESKTOP;
    }
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
    const previousProfile = currentProfile;
    const width = currentViewportWidth();
    // Keep both targets in sync because CSS and JS hooks read from each in different contexts.
    writeViewportAttribute(document.documentElement, profile);
    writeViewportAttribute(document.body, profile);
    if (profile !== currentProfile) {
      window.dispatchEvent(
        new CustomEvent("bijux:viewport-change", {
          detail: {
            profile,
            previousProfile,
            width,
          },
        })
      );
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

    if (typeof window.matchMedia === "function") {
      [PHONE_MAX_MEDIA, NORMAL_MAX_MEDIA, WIDE_MIN_MEDIA].forEach((query) => {
        const mediaQuery = window.matchMedia(query);
        if (mediaQuery && typeof mediaQuery.addEventListener === "function") {
          mediaQuery.addEventListener("change", scheduleApply);
        } else if (mediaQuery && typeof mediaQuery.addListener === "function") {
          mediaQuery.addListener(scheduleApply);
        }
      });
    }
  }

  function init() {
    applyViewportProfile();
    bindViewportUpdates();
  }

  function initWithFallback() {
    if (typeof document$ !== "undefined" && document$ && typeof document$.subscribe === "function") {
      document$.subscribe(init);
      return;
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init, { once: true });
      return;
    }

    init();
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
    verifyReferenceWidths: () => ({
      390: classifyViewportWidth(REFERENCE_WIDTHS.phone390),
      768: classifyViewportWidth(REFERENCE_WIDTHS.normal768),
      1024: classifyViewportWidth(REFERENCE_WIDTHS.normal1024),
      1280: classifyViewportWidth(REFERENCE_WIDTHS.desktop1280),
      1920: classifyViewportWidth(REFERENCE_WIDTHS.wide1920),
    }),
    describe: () => {
      const profile = resolveViewportProfile();
      return {
        profile,
        width: currentViewportWidth(),
        references: {
          390: classifyViewportWidth(REFERENCE_WIDTHS.phone390),
          768: classifyViewportWidth(REFERENCE_WIDTHS.normal768),
          1024: classifyViewportWidth(REFERENCE_WIDTHS.normal1024),
          1280: classifyViewportWidth(REFERENCE_WIDTHS.desktop1280),
          1920: classifyViewportWidth(REFERENCE_WIDTHS.wide1920),
        },
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
        thresholdsPx: {
          phoneMax: toPixelsFromEm(PHONE_MAX_EM),
          normalMax: toPixelsFromEm(NORMAL_MAX_EM),
          wideMin: toPixelsFromEm(WIDE_MIN_EM),
        },
      };
    },
  };

  initWithFallback();
})();
