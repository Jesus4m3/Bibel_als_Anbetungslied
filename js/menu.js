(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("#site-nav");
  const script =
    document.currentScript ||
    document.querySelector('script[src$="js/menu.js"], script[src*="/js/menu.js"]');

  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  if (!nav) return;
  if (!script) return;

  const siteRootUrl = new URL("../", script.src);
  const currentPagePath = normalizePathname(window.location.pathname);
  const rootConfig = window.SITE_NAVIGATION || { pages: [], sections: [] };

  nav.innerHTML = "";

  for (const page of rootConfig.pages || []) {
    nav.appendChild(createLink(page, siteRootUrl));
  }

  for (const section of rootConfig.sections || []) {
    nav.appendChild(createLink({ title: section.title, href: section.href }, siteRootUrl));

    const sectionPages =
      (window.SECTION_NAVIGATION && window.SECTION_NAVIGATION[section.folder]) || [];

    if (!sectionPages.length) continue;

    const submenu = document.createElement("div");
    submenu.className = "submenu";
    const sectionBaseUrl = new URL(`${trimSlashes(section.folder)}/`, siteRootUrl);

    const sectionPath = normalizePathname(resolveHref(section.href, siteRootUrl));
    const isInsideSection =
      currentPagePath === sectionPath || currentPagePath.startsWith(`${sectionPath}/`);

    if (isInsideSection) {
      submenu.classList.add("is-visible");
    }

    for (const page of sectionPages) {
      submenu.appendChild(createLink(page, sectionBaseUrl));
    }

    nav.appendChild(submenu);
  }

  function createLink(item, baseUrl) {
    const link = document.createElement("a");
    const resolvedHref = resolveHref(item.href, baseUrl);
    const resolvedUrl = new URL(item.href, baseUrl);

    link.className = "nav-link";
    link.href = resolvedUrl.pathname + resolvedUrl.search + resolvedUrl.hash;
    link.textContent = item.title;

    if (normalizePathname(resolvedHref) === currentPagePath) {
      link.classList.add("active");
    }

    return link;
  }

  function resolveHref(href, baseUrl) {
    return new URL(href, baseUrl).pathname;
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
