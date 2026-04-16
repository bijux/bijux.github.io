(function () {
  const shell = (window.bijuxShell = window.bijuxShell || {});

  function runShellNavigationSync() {
    shell.detailTabs?.syncDetailStripVisibility();
    shell.detailTabs?.syncDetailStripActiveState();
    shell.navReveal?.revealActiveNavigationTarget();
    shell.navReveal?.bindMobileDrawerReveal();
  }

  function ensureBound() {
    if (window.__bijuxShellBootstrapBound === true) {
      return;
    }

    window.__bijuxShellBootstrapBound = true;
    document$.subscribe(runShellNavigationSync);
  }

  shell.bootstrap = {
    runShellNavigationSync,
    ensureBound,
  };

  ensureBound();
})();
