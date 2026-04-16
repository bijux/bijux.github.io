window.mermaidConfig = {
  startOnLoad: false,
  securityLevel: "loose",
};

function activeMermaidTheme() {
  const scheme = document.body?.getAttribute("data-md-color-scheme") || "default";
  return scheme === "slate" ? "dark" : "default";
}

function normalizeMermaidBlocks() {
  // Normalize superfences output (<pre class="mermaid"><code>...</code></pre>)
  // into <div class="mermaid">...</div> so Mermaid receives raw diagram text.
  const preNodes = document.querySelectorAll("pre.mermaid");
  preNodes.forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) {
      return;
    }

    const div = document.createElement("div");
    div.className = "mermaid";
    div.textContent = code.textContent || "";
    pre.replaceWith(div);
  });
}

function prepareMermaidNodesForRerender() {
  const nodes = document.querySelectorAll("div.mermaid");
  nodes.forEach((node) => {
    const source = node.dataset.bijuxMermaidSource || node.textContent || "";
    node.dataset.bijuxMermaidSource = source;
    node.removeAttribute("data-processed");
    node.textContent = source;
  });
}

function renderMermaidDiagrams() {
  if (typeof mermaid === "undefined") {
    return;
  }

  mermaid.initialize({
    ...window.mermaidConfig,
    theme: activeMermaidTheme(),
  });

  normalizeMermaidBlocks();
  const nodes = document.querySelectorAll("div.mermaid");
  if (!nodes.length) {
    return;
  }

  mermaid.run({ nodes });
}

document$.subscribe(() => {
  renderMermaidDiagrams();

  if (window.__bijuxMermaidThemeBound === true) {
    return;
  }

  window.__bijuxMermaidThemeBound = true;
  window.addEventListener("bijux:theme-change", () => {
    prepareMermaidNodesForRerender();
    renderMermaidDiagrams();
  });
});
