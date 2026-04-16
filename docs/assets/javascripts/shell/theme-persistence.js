(function () {
  const MD_PALETTE_KEY = "__palette";

  function resolveThemeKey() {
    return (
      document
        .querySelector("[data-bijux-theme-key]")
        ?.getAttribute("data-bijux-theme-key") || "bijux:theme"
    );
  }

  function safeGetGlobalTheme(themeKey) {
    try {
      return localStorage.getItem(themeKey);
    } catch (error) {
      return null;
    }
  }

  function safeSetGlobalTheme(themeKey, scheme) {
    try {
      localStorage.setItem(themeKey, scheme);
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

  function applyScheme(themeKey, scheme, persistGlobal) {
    const option = optionByScheme(scheme);
    if (!option) {
      return false;
    }

    option.checked = true;
    applyThemeAttributes(option);
    writeMaterialPalette(option);

    if (persistGlobal) {
      safeSetGlobalTheme(
        themeKey,
        option.getAttribute("data-md-color-scheme") || "default"
      );
    }

    return true;
  }

  function normalizeKnownScheme(scheme) {
    return optionByScheme(scheme) ? scheme : null;
  }

  function initializeGlobalTheme(themeKey) {
    const savedScheme = normalizeKnownScheme(safeGetGlobalTheme(themeKey));
    if (savedScheme) {
      applyScheme(themeKey, savedScheme, false);
      return;
    }

    const activeScheme = normalizeKnownScheme(activeSchemeFromDom());
    if (activeScheme) {
      safeSetGlobalTheme(themeKey, activeScheme);
    }
  }

  function bindPaletteChanges(themeKey) {
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
        applyScheme(themeKey, scheme, true);
      });
    }
  }

  function bindCrossTabSync(themeKey) {
    if (window.__bijuxThemeStorageBound === true) {
      return;
    }

    window.__bijuxThemeStorageBound = true;
    window.addEventListener("storage", (event) => {
      if (event.key !== themeKey || !event.newValue) {
        return;
      }
      applyScheme(themeKey, event.newValue, false);
    });
  }

  function init() {
    const themeKey = resolveThemeKey();
    bindPaletteChanges(themeKey);
    initializeGlobalTheme(themeKey);
    bindCrossTabSync(themeKey);
  }

  document$.subscribe(init);
})();
