"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { const d = document.documentElement.classList.contains("dark"); setDark(d); }, []);
  function toggle() { const n = !dark; setDark(n); document.documentElement.classList.toggle("dark", n); localStorage.setItem("theme", n ? "dark" : "light"); }
  return <button aria-label="Toggle theme" onClick={toggle} className="btn !p-2">{dark ? <Sun size={16}/> : <Moon size={16}/>}</button>;
}
