(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("#site-nav");

  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  if (!nav) return;

  const script =
    document.currentScript ||
    document.querySelector('script[src$="js/menu.js"], script[src*="/js/menu.js"]');

  if (!script) return;

  const siteRootUrl = new URL("../", script.src);
  const currentPagePath = normalizePathname(window.location.pathname);

  renderNavigation().catch((error) => {
    console.error("Navigation konnte nicht geladen werden.", error);
    nav.innerHTML = '<p class="menu-status">Navigation konnte nicht geladen werden.</p>';
  });

  async function renderNavigation() {
    const rootConfigUrl = new URL("nav.json", siteRootUrl);
    const rootConfig = await fetchJson(rootConfigUrl);

    nav.innerHTML = "";

    for (const page of rootConfig.pages || []) {
      nav.appendChild(createLink(page, siteRootUrl));
    }

    for (const section of rootConfig.sections || []) {
      const sectionLink = createLink(
        { title: section.title, href: section.href },
        siteRootUrl,
      );
      nav.appendChild(sectionLink);

      if (!section.folder) continue;

      const sectionBaseUrl = new URL(`${trimSlashes(section.folder)}/`, siteRootUrl);
      const sectionPath = normalizePathname(sectionBaseUrl.pathname);
      const isInsideSection =
        currentPagePath === sectionPath || currentPagePath.startsWith(`${sectionPath}/`);

      const submenu = document.createElement("div");
      submenu.className = "submenu";

      if (isInsideSection) {
        submenu.classList.add("is-visible");
      }

      const sectionConfig = await fetchJson(new URL("nav.json", sectionBaseUrl));

      for (const page of sectionConfig.pages || []) {
        submenu.appendChild(createLink(page, sectionBaseUrl));
      }

      if (submenu.childElementCount > 0) {
        nav.appendChild(submenu);
      }
    }
  }

  function createLink(item, baseUrl) {
    const link = document.createElement("a");
    const href = new URL(item.href, baseUrl);

    link.className = "nav-link";
    link.href = href.pathname + href.search + href.hash;
    link.textContent = item.title;

    if (normalizePathname(href.pathname) === currentPagePath) {
      link.classList.add("active");
    }

    return link;
  }

  async function fetchJson(url) {
    const response = await fetch(url.href);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} fuer ${url.href}`);
    }

    return response.json();
  }

  function normalizePathname(pathname) {
    if (!pathname) return "/";

    let normalized = pathname;

    if (!normalized.startsWith("/")) {
      normalized = `/${normalized}`;
    }

    normalized = normalized.replace(/\/index\.html$/i, "/");

    if (normalized.length > 1) {
      normalized = normalized.replace(/\/$/, "");
    }

    return normalized;
  }

  function trimSlashes(value) {
    return String(value || "").replace(/^\/+|\/+$/g, "");
  }
})();
