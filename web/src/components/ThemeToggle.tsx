"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  function toggle() { const n = !dark; setDark(n); document.documentElement.classList.toggle("dark", n); localStorage.setItem("theme", n ? "dark" : "light"); }
  return <button aria-label="Toggle theme" onClick={toggle} className="btn !min-h-9 !px-2.5 btn-ghost">{dark ? <Sun size={16}/> : <Moon size={16}/>}</button>;
}
