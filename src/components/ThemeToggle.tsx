"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

const lightQuery = "(prefers-color-scheme: light)";

function currentTheme() {
  return (
    document.documentElement.getAttribute("data-theme") ?? (window.matchMedia(lightQuery).matches ? "light" : "dark")
  );
}

// O tema muda pelo atributo data-theme (este botão) ou pela preferência do sistema.
function subscribe(cb: () => void) {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = window.matchMedia(lightQuery);
  mq.addEventListener("change", cb);
  return () => {
    observer.disconnect();
    mq.removeEventListener("change", cb);
  };
}

export function ThemeToggle() {
  // null no servidor: o estado só existe no navegador, então aria-pressed entra após a hidratação.
  const theme = useSyncExternalStore(subscribe, currentTheme, () => null);

  function toggle() {
    const next = currentTheme() === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Sem armazenamento (aba anônima, por exemplo): o tema vale só para esta visita.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Tema escuro"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      className="press grid size-11 place-items-center rounded-full text-text hover:bg-surface-2"
    >
      <Sun size={20} weight="bold" className="theme-sun" />
      <Moon size={20} weight="bold" className="theme-moon" />
    </button>
  );
}
