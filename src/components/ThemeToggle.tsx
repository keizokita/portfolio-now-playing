"use client";

import { Moon, Sun } from "@phosphor-icons/react";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ??
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
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
      aria-label="Alternar tema claro e escuro"
      className="press grid size-11 place-items-center rounded-full text-text hover:bg-surface-2"
    >
      <Sun size={20} weight="bold" className="theme-sun" />
      <Moon size={20} weight="bold" className="theme-moon" />
    </button>
  );
}
