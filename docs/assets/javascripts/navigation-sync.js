(function () {
  // Compatibility entrypoint: shell navigation logic now lives under docs/assets/javascripts/shell/*
  // and is wired through shell/bootstrap.js.
  if (window.bijuxShell?.bootstrap?.ensureBound) {
    window.bijuxShell.bootstrap.ensureBound();
  }
})();
