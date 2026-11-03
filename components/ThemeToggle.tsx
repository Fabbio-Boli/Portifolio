"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function preferredTheme(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    const nextTheme = saved === "dark" || saved === "light" ? saved : preferredTheme();
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}>{theme === "dark" ? "Tema claro" : "Tema escuro"}</button>;
}

