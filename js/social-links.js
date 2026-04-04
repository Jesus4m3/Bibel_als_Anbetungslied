(() => {
  const content = document.querySelector(".content");
  const topbar = document.querySelector(".topbar");

  if (!content) return;
  if (document.querySelector("[data-social-share-trigger]")) return;

  const pageUrl = window.location.href;
  const title =
    document.querySelector("h1")?.textContent?.trim() ||
    document.title ||
    "Bibel als Musik";
  const description =
    document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content")
      ?.trim() || "";
  const shareText = description ? `${title} - ${description}` : title;

  const wrapper = document.createElement("div");
  wrapper.className = "social-share-widget";
  wrapper.dataset.socialLinks = "true";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "social-share-trigger";
  trigger.dataset.socialShareTrigger = "true";
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-label", "Teilen-Menü öffnen");
  trigger.innerHTML = `
    <span class="social-share-trigger-icon" aria-hidden="true">↗</span>
    <span class="social-share-trigger-text">Teilen</span>
  `;
  wrapper.appendChild(trigger);

  const section = document.createElement("section");
  section.className = "social-share-popup";
  section.setAttribute("role", "dialog");
  section.setAttribute("aria-modal", "false");
  section.setAttribute("aria-hidden", "true");

  const heading = document.createElement("h2");
  heading.textContent = "Seite teilen";
  section.appendChild(heading);

  const intro = document.createElement("p");
  intro.className = "social-share-intro";
  intro.textContent =
    "Wenn dir diese Seite hilft, kannst du sie hier direkt weitergeben.";
  section.appendChild(intro);

  const list = document.createElement("div");
  list.className = "social-share-grid";
  section.appendChild(list);

  const actions = getActions(pageUrl, title, shareText);

  actions.forEach((action) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "social-share-link social-share-button";
    button.dataset.platform = action.key;
    button.innerHTML = createLabelMarkup(action.shortLabel, action.label);
    button.addEventListener("click", action.onClick);
    list.appendChild(button);
  });

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "social-share-close";
  closeButton.setAttribute("aria-label", "Teilen-Menü schließen");
  closeButton.textContent = "×";
  closeButton.addEventListener("click", closePopup);
  section.appendChild(closeButton);

  wrapper.appendChild(section);

  mountWidget();

  trigger.addEventListener("click", () => {
    const isOpen = wrapper.classList.contains("is-open");
    if (isOpen) {
      closePopup();
      return;
    }

    openPopup();
  });

  document.addEventListener("click", (event) => {
    if (wrapper.contains(event.target)) return;
    closePopup();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePopup();
    }
  });

  window.addEventListener("resize", mountWidget);

  function getActions(url, shareTitle, shareMessage) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedMessage = encodeURIComponent(`${shareTitle}\n${url}`);

    const items = [
      {
        key: "facebook",
        label: "Facebook",
        shortLabel: "f",
        onClick: () =>
          openShareTarget(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          ),
      },
      {
        key: "x",
        label: "X",
        shortLabel: "X",
        onClick: () =>
          openShareTarget(
            `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
          ),
      },
      {
        key: "whatsapp",
        label: "WhatsApp",
        shortLabel: "W",
        onClick: () => openShareTarget(`https://wa.me/?text=${encodedMessage}`),
      },
      {
        key: "telegram",
        label: "Telegram",
        shortLabel: "T",
        onClick: () =>
          openShareTarget(
            `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
          ),
      },
      {
        key: "linkedin",
        label: "LinkedIn",
        shortLabel: "in",
        onClick: () =>
          openShareTarget(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          ),
      },
      {
        key: "email",
        label: "E-Mail",
        shortLabel: "@",
        onClick: () =>
          openShareTarget(
            `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${shareMessage}\n\n${url}`)}`,
            false,
          ),
      },
    ];

    if (navigator.share) {
      items.unshift({
        key: "share",
        label: "Direkt teilen",
        shortLabel: "+",
        onClick: async () => {
          try {
            await navigator.share({
              title: shareTitle,
              text: shareMessage,
              url,
            });
          } catch (error) {
            if (error?.name !== "AbortError") {
              console.error("Teilen fehlgeschlagen", error);
            }
          }
        },
      });
    }

    items.push({
      key: "copy",
      label: "Link kopieren",
      shortLabel: "⧉",
      onClick: async (event) => {
        const button = event.currentTarget;
        const originalLabel = button.querySelector(".social-share-text")?.textContent || "Link kopieren";

        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(url);
          } else {
            copyWithFallback(url);
          }

          updateButtonLabel(button, "Link kopiert");
        } catch (error) {
          console.error("Kopieren fehlgeschlagen", error);
          updateButtonLabel(button, "Kopieren fehlgeschlagen");
        }

        window.setTimeout(() => {
          updateButtonLabel(button, originalLabel);
        }, 2200);
      },
    });

    return items;
  }

  function createLabelMarkup(shortLabel, label) {
    return `
      <span class="social-share-icon" aria-hidden="true">${shortLabel}</span>
      <span class="social-share-text">${label}</span>
    `;
  }

  function updateButtonLabel(button, label) {
    const text = button.querySelector(".social-share-text");
    if (text) {
      text.textContent = label;
    }
  }

  function copyWithFallback(value) {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "absolute";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    document.body.removeChild(field);
  }

  function openShareTarget(targetUrl, newTab = true) {
    if (!targetUrl) return;

    if (!newTab) {
      window.location.href = targetUrl;
      return;
    }

    const popup = window.open(targetUrl, "_blank", "noopener,noreferrer");

    if (popup) {
      popup.opener = null;
      return;
    }

    const fallbackLink = document.createElement("a");
    fallbackLink.href = targetUrl;
    fallbackLink.target = "_blank";
    fallbackLink.rel = "noopener noreferrer";
    fallbackLink.style.display = "none";
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
  }

  function openPopup() {
    wrapper.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    section.setAttribute("aria-hidden", "false");
  }

  function closePopup() {
    wrapper.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    section.setAttribute("aria-hidden", "true");
  }

  function mountWidget() {
    const shouldUseTopbar = window.matchMedia("(max-width: 900px)").matches && topbar;

    if (shouldUseTopbar) {
      if (wrapper.parentElement !== topbar) {
        topbar.appendChild(wrapper);
      }
      return;
    }

    if (wrapper.parentElement !== content) {
      content.prepend(wrapper);
    }
  }
})();
