window.mermaidConfig = {
  startOnLoad: false,
  securityLevel: "loose",
};

document$.subscribe(() => {
  if (typeof mermaid === "undefined") {
    return;
  }

  mermaid.initialize(window.mermaidConfig);

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

  const nodes = document.querySelectorAll("div.mermaid");
  if (!nodes.length) {
    return;
  }

  mermaid.run({
    nodes,
  });
});
