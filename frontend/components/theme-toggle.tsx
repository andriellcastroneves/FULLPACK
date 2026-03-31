"use client";

import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("fullpack-theme") as ThemeMode | null;
  if (savedTheme) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("fullpack-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme}>
      <span className="theme-toggle__dot" />
      {theme === "light" ? "Modo claro" : "Modo escuro"}
    </button>
  );
}
