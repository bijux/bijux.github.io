(function () {
  const BIJUX_THEME_KEY = "bijux:theme";
  const MD_PALETTE_KEY = "__palette";

  function safeGetGlobalTheme() {
    try {
      return localStorage.getItem(BIJUX_THEME_KEY);
    } catch (error) {
      return null;
    }
  }

  function safeSetGlobalTheme(scheme) {
    try {
      localStorage.setItem(BIJUX_THEME_KEY, scheme);
    } catch (error) {
      // Ignore storage write failures for private mode or policy-restricted browsers.
    }
  }

  function paletteOptions() {
    return Array.from(
      document.querySelectorAll("input[name='__palette'][data-md-color-scheme]")
    );
  }

  function optionByScheme(scheme) {
    return paletteOptions().find((option) => {
      return option.getAttribute("data-md-color-scheme") === scheme;
    });
  }

  function activeSchemeFromDom() {
    return document.body?.getAttribute("data-md-color-scheme") || null;
  }

  function applyThemeAttributes(option) {
    const attrs = ["scheme", "primary", "accent", "media"];
    for (const key of attrs) {
      const value = option.getAttribute(`data-md-color-${key}`);
      if (value === null || value === "") {
        document.body.removeAttribute(`data-md-color-${key}`);
        continue;
      }
      document.body.setAttribute(`data-md-color-${key}`, value);
    }
  }

  function writeMaterialPalette(option) {
    const color = {
      media: option.getAttribute("data-md-color-media") || "",
      scheme: option.getAttribute("data-md-color-scheme") || "default",
      primary: option.getAttribute("data-md-color-primary") || "teal",
      accent: option.getAttribute("data-md-color-accent") || "cyan",
    };

    if (typeof window.__md_set === "function") {
      window.__md_set(MD_PALETTE_KEY, { color });
    }
  }

  function applyScheme(scheme, persistGlobal) {
    const option = optionByScheme(scheme);
    if (!option) {
      return false;
    }

    option.checked = true;
    applyThemeAttributes(option);
    writeMaterialPalette(option);

    if (persistGlobal) {
      safeSetGlobalTheme(option.getAttribute("data-md-color-scheme") || "default");
    }

    return true;
  }

  function normalizeKnownScheme(scheme) {
    return optionByScheme(scheme) ? scheme : null;
  }

  function initializeGlobalTheme() {
    const savedScheme = normalizeKnownScheme(safeGetGlobalTheme());
    if (savedScheme) {
      applyScheme(savedScheme, false);
      return;
    }

    const activeScheme = normalizeKnownScheme(activeSchemeFromDom());
    if (activeScheme) {
      safeSetGlobalTheme(activeScheme);
    }
  }

  function bindPaletteChanges() {
    for (const option of paletteOptions()) {
      if (option.dataset.bijuxThemeBound === "true") {
        continue;
      }

      option.dataset.bijuxThemeBound = "true";
      option.addEventListener("change", () => {
        if (!option.checked) {
          return;
        }
        const scheme = option.getAttribute("data-md-color-scheme") || "default";
        applyScheme(scheme, true);
      });
    }
  }

  function bindCrossTabSync() {
    if (window.__bijuxThemeStorageBound === true) {
      return;
    }

    window.__bijuxThemeStorageBound = true;
    window.addEventListener("storage", (event) => {
      if (event.key !== BIJUX_THEME_KEY || !event.newValue) {
        return;
      }
      applyScheme(event.newValue, false);
    });
  }

  function init() {
    bindPaletteChanges();
    initializeGlobalTheme();
    bindCrossTabSync();
  }

  document$.subscribe(init);
})();
