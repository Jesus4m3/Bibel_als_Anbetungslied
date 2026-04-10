(() => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("#site-nav");
  const breadcrumb = document.querySelector(".breadcrumb");
  const script =
    document.currentScript ||
    document.querySelector('script[src$="js/menu.js"], script[src*="/js/menu.js"]');

  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  if (!nav || !script) return;

  const siteRootUrl = new URL("../", script.src);
  const currentPagePath = normalizePathname(window.location.pathname);
  const rootConfig = window.SITE_NAVIGATION || { pages: [], sections: [] };
  const pages = rootConfig.pages || [];
  const sectionGroups = rootConfig.sectionGroups || [];
  const sections = rootConfig.sections || [];
  const trailingPages = rootConfig.trailingPages || [];
  const sectionsByFolder = new Map(sections.map((section) => [section.folder, section]));
  const groupedFolders = new Set(sectionGroups.flatMap((group) => group.folders || []));
  const ungroupedSections = sections.filter((section) => !groupedFolders.has(section.folder));
  const rootLevelItems = [
    ...pages,
    ...sectionGroups.map((group) => ({
      title: group.title,
      href: group.href,
    })),
    ...ungroupedSections.map((section) => ({
      title: section.title,
      href: section.href,
      folder: section.folder,
    })),
    ...trailingPages,
  ];
  const startPage =
    findItemByPath(pages, siteRootUrl, normalizePathname("/")) ||
    findItemByPath(pages, siteRootUrl, normalizePathname("/index.html")) ||
    pages[0] ||
    { title: "Startseite", href: "index.html" };

  nav.innerHTML = "";

  for (const page of pages) {
    nav.appendChild(createLink(page, siteRootUrl));
  }

  for (const group of sectionGroups) {
    nav.appendChild(createLink({ title: group.title, href: group.href }, siteRootUrl));

    const groupSections = getGroupSections(group);
    if (!groupSections.length) continue;

    const groupSubmenu = document.createElement("div");
    groupSubmenu.className = "submenu";

    if (isInsideGroup(group, groupSections)) {
      groupSubmenu.classList.add("is-visible");
    }

    for (const section of groupSections) {
      groupSubmenu.appendChild(createLink({ title: section.title, href: section.href }, siteRootUrl));

      const sectionPages =
        (window.SECTION_NAVIGATION && window.SECTION_NAVIGATION[section.folder]) || [];

      if (!sectionPages.length) continue;

      const nestedSubmenu = document.createElement("div");
      nestedSubmenu.className = "submenu submenu-nested";
      const sectionBaseUrl = new URL(`${trimSlashes(section.folder)}/`, siteRootUrl);

      if (isInsideSection(section)) {
        nestedSubmenu.classList.add("is-visible");
      }

      for (const page of sectionPages) {
        nestedSubmenu.appendChild(createLink(page, sectionBaseUrl));
      }

      groupSubmenu.appendChild(nestedSubmenu);
    }

    nav.appendChild(groupSubmenu);
  }

  for (const section of ungroupedSections) {
    nav.appendChild(createLink({ title: section.title, href: section.href }, siteRootUrl));

    const sectionPages =
      (window.SECTION_NAVIGATION && window.SECTION_NAVIGATION[section.folder]) || [];

    if (!sectionPages.length) continue;

    const submenu = document.createElement("div");
    submenu.className = "submenu";
    const sectionBaseUrl = new URL(`${trimSlashes(section.folder)}/`, siteRootUrl);

    if (isInsideSection(section)) {
      submenu.classList.add("is-visible");
    }

    for (const page of sectionPages) {
      submenu.appendChild(createLink(page, sectionBaseUrl));
    }

    nav.appendChild(submenu);
  }

  for (const page of trailingPages) {
    nav.appendChild(createLink(page, siteRootUrl));
  }

  renderBreadcrumb();
  document.addEventListener("click", handleDocumentClick);

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

  function renderBreadcrumb() {
    if (!breadcrumb) return;

    const context = getPageContext();
    const items = [];

    if (context.type === "group") {
      items.push({
        title: startPage.title,
        href: startPage.href,
        baseUrl: siteRootUrl,
        menuItems: getStartChildren(),
        menuBaseUrl: siteRootUrl,
      });
      items.push({
        title: context.group.title,
        href: context.group.href,
        baseUrl: siteRootUrl,
        menuItems: context.groupSections,
        menuBaseUrl: siteRootUrl,
        current: true,
      });
    } else if (context.type === "section") {
      items.push({
        title: startPage.title,
        href: startPage.href,
        baseUrl: siteRootUrl,
        menuItems: getStartChildren(),
        menuBaseUrl: siteRootUrl,
      });
      if (context.group) {
        items.push({
          title: context.group.title,
          href: context.group.href,
          baseUrl: siteRootUrl,
          menuItems: getGroupSections(context.group),
          menuBaseUrl: siteRootUrl,
        });
      }
      items.push({
        title: context.section.title,
        href: context.section.href,
        baseUrl: siteRootUrl,
        menuItems: context.sectionPages,
        menuBaseUrl: context.sectionBaseUrl,
        current: true,
      });
    } else if (context.type === "section-page") {
      items.push({
        title: startPage.title,
        href: startPage.href,
        baseUrl: siteRootUrl,
        menuItems: getStartChildren(),
        menuBaseUrl: siteRootUrl,
      });
      if (context.group) {
        items.push({
          title: context.group.title,
          href: context.group.href,
          baseUrl: siteRootUrl,
          menuItems: getGroupSections(context.group),
          menuBaseUrl: siteRootUrl,
        });
      }
      items.push({
        title: context.section.title,
        href: context.section.href,
        baseUrl: siteRootUrl,
        menuItems: context.sectionPages,
        menuBaseUrl: context.sectionBaseUrl,
      });
      items.push({
        title: context.page.title,
        href: context.page.href,
        baseUrl: context.sectionBaseUrl,
        current: true,
      });
    } else {
      const currentItem = findItemByPath(rootLevelItems, siteRootUrl, currentPagePath);

      items.push({
        title: startPage.title,
        href: startPage.href,
        baseUrl: siteRootUrl,
        menuItems: getStartChildren(),
        menuBaseUrl: siteRootUrl,
        current: currentPagePath === normalizePathname(resolveHref(startPage.href, siteRootUrl)),
      });

      if (currentItem && currentItem.href !== startPage.href) {
        items.push({
          title: currentItem.title,
          href: currentItem.href,
          baseUrl: siteRootUrl,
          current: true,
        });
      } else if (!currentItem) {
        items.push({
          title: document.title,
          href: window.location.pathname,
          baseUrl: siteRootUrl,
          current: true,
        });
      }
    }

    breadcrumb.innerHTML = "";

    items.forEach((item, index) => {
      if (index > 0) {
        const separator = document.createElement("span");
        separator.className = "breadcrumb-separator";
        separator.textContent = "/";
        breadcrumb.appendChild(separator);
      }

      breadcrumb.appendChild(createBreadcrumbItem(item));
    });
  }

  function createBreadcrumbItem(item) {
    const wrapper = document.createElement("span");
    wrapper.className = "breadcrumb-item";

    const link = document.createElement(item.current ? "span" : "a");
    link.className = "breadcrumb-link";
    link.textContent = item.title;

    if (item.current) {
      link.classList.add("is-current");
    } else {
      const resolvedUrl = new URL(item.href, item.baseUrl);
      link.href = resolvedUrl.pathname + resolvedUrl.search + resolvedUrl.hash;
    }

    wrapper.appendChild(link);

    if (item.menuItems && item.menuItems.length > 0) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "breadcrumb-toggle";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", `${item.title} Menue umschalten`);
      button.textContent = "\u25be";

      const menu = document.createElement("div");
      menu.className = "breadcrumb-menu";

      for (const child of item.menuItems) {
        menu.appendChild(createBreadcrumbMenuLink(child, item.menuBaseUrl));
      }

      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = button.getAttribute("aria-expanded") === "true";
        closeBreadcrumbMenus();
        if (!isOpen) {
          wrapper.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
          button.textContent = "\u25b4";
        }
      });

      wrapper.appendChild(button);
      wrapper.appendChild(menu);
    }

    return wrapper;
  }

  function createBreadcrumbMenuLink(item, baseUrl) {
    const link = document.createElement("a");
    const resolvedUrl = new URL(item.href, baseUrl);
    const resolvedPath = normalizePathname(resolvedUrl.pathname);

    link.className = "breadcrumb-menu-link";
    link.href = resolvedUrl.pathname + resolvedUrl.search + resolvedUrl.hash;
    link.textContent = item.title;

    if (resolvedPath === currentPagePath) {
      link.classList.add("active");
    }

    return link;
  }

  function getPageContext() {
    for (const group of sectionGroups) {
      const groupPath = normalizePathname(resolveHref(group.href, siteRootUrl));
      const groupSections = getGroupSections(group);

      if (currentPagePath === groupPath) {
        return {
          type: "group",
          group,
          groupSections,
        };
      }
    }

    for (const section of sections) {
      const sectionBaseUrl = new URL(`${trimSlashes(section.folder)}/`, siteRootUrl);
      const sectionPath = normalizePathname(resolveHref(section.href, siteRootUrl));
      const sectionPages =
        (window.SECTION_NAVIGATION && window.SECTION_NAVIGATION[section.folder]) || [];
      const group = findGroupForSection(section.folder);

      if (currentPagePath === sectionPath) {
        return {
          type: "section",
          section,
          sectionPages,
          sectionBaseUrl,
          group,
        };
      }

      const currentSectionPage = findItemByPath(sectionPages, sectionBaseUrl, currentPagePath);

      if (currentSectionPage) {
        return {
          type: "section-page",
          section,
          page: currentSectionPage,
          sectionPages,
          sectionBaseUrl,
          group,
        };
      }
    }

    return { type: "root-page" };
  }

  function findItemByPath(items, baseUrl, targetPath) {
    return (items || []).find(
      (item) => normalizePathname(resolveHref(item.href, baseUrl)) === targetPath,
    );
  }

  function getStartChildren() {
    const startPath = normalizePathname(resolveHref(startPage.href, siteRootUrl));

    return rootLevelItems.filter(
      (item) => normalizePathname(resolveHref(item.href, siteRootUrl)) !== startPath,
    );
  }

  function closeBreadcrumbMenus() {
    document.querySelectorAll(".breadcrumb-item.is-open").forEach((item) => {
      item.classList.remove("is-open");
    });

    document.querySelectorAll(".breadcrumb-toggle").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.textContent = "\u25be";
    });
  }

  function handleDocumentClick(event) {
    if (event.target.closest(".breadcrumb-item")) return;
    closeBreadcrumbMenus();
  }

  function getGroupSections(group) {
    return (group.folders || [])
      .map((folder) => sectionsByFolder.get(folder))
      .filter(Boolean);
  }

  function findGroupForSection(folder) {
    return sectionGroups.find((group) => (group.folders || []).includes(folder)) || null;
  }

  function isInsideGroup(group, groupSections) {
    const groupPath = normalizePathname(resolveHref(group.href, siteRootUrl));

    if (currentPagePath === groupPath) {
      return true;
    }

    return groupSections.some((section) => isInsideSection(section));
  }

  function isInsideSection(section) {
    const sectionPath = normalizePathname(resolveHref(section.href, siteRootUrl));
    return currentPagePath === sectionPath || currentPagePath.startsWith(`${sectionPath}/`);
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
