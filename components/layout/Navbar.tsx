"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";

const subscribeTheme = (callback: () => void) => {
  window.addEventListener("theme-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("theme-change", callback);
    window.removeEventListener("storage", callback);
  };
};

const getThemeSnapshot = (): "dark" | "light" => {
  if (typeof window === "undefined") return "dark";
  try {
    return (localStorage.getItem("eyob_theme") as "dark" | "light") || "dark";
  } catch {
    return "dark";
  }
};

const getThemeServerSnapshot = (): "dark" | "light" => "dark";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("projects");
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("eyob_theme", nextTheme);
      if (nextTheme === "light") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
      window.dispatchEvent(new Event("theme-change"));
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "projects", "education", "certifications", "contact"];
      const scrollY = window.scrollY + 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="docked full-width top-0 sticky z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo / Wordmark */}
        <a
          className="flex items-center gap-3 group active:scale-95 transition-transform duration-150"
          href="#"
          aria-label="Eyob Getachew - Home"
        >
          <span className="font-label-mono text-body-lg font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
            EG / dev
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container border border-outline-variant/50 text-[10px] font-label-mono text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>{SITE_CONFIG.version}</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main Navigation"
        >
          {SITE_CONFIG.navLinks.map((link) => {
            const sectionKey = link.href.replace("#", "");
            const isActive = activeSection === sectionKey;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`font-label-mono text-label-mono transition-colors ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Trailing Action Badges & Buttons */}
        <div className="flex items-center gap-3">
          {/* Open to Opportunities Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/40 text-on-surface-variant font-label-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span>{SITE_CONFIG.status}</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface hover:text-primary transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Icon
              name={theme === "dark" ? "light_mode" : "dark_mode"}
              className="text-[18px]"
            />
          </button>

          {/* Primary Action */}
          <a
            className="px-4 py-2 rounded-lg bg-primary-container text-surface-container-lowest font-label-mono text-label-mono font-medium hover:bg-primary transition-all duration-200 active:scale-95 shadow-sm flex items-center gap-1.5"
            href="#contact"
          >
            <span>Get in Touch</span>
            <Icon name="north_east" className="text-[16px]" />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface hover:text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Navigation Menu"
          >
            <Icon name={isOpen ? "close" : "menu"} className="text-[20px]" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-outline-variant/30 bg-surface-container-lowest/95 backdrop-blur-xl px-6 py-5 shadow-2xl transition-all animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {SITE_CONFIG.navLinks.map((link) => {
              const sectionKey = link.href.replace("#", "");
              const isActive = activeSection === sectionKey;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-lg font-label-mono text-label-mono transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  )}
                </a>
              );
            })}

            <div className="pt-3 border-t border-outline-variant/30 mt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/40 text-on-surface-variant font-label-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>{SITE_CONFIG.status}</span>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface hover:text-primary font-label-mono text-[11px] flex items-center gap-1.5"
              >
                <Icon
                  name={theme === "dark" ? "light_mode" : "dark_mode"}
                  className="text-[16px]"
                />
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
