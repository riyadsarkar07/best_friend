"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { friendshipConfig } from "@/data/friendship-config";

export function ScrapbookNav({ progress }: { progress: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const links = friendshipConfig.navSections;

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-line/70 bg-ivory/85 backdrop-blur-md backdrop-saturate-150">
        <div className="section-shell flex h-16 items-center justify-between gap-4">
          <a
            href="#home"
            className="group flex min-h-11 items-center gap-2.5"
            onClick={() => setMenuOpen(false)}
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-full border border-gold/50 bg-paper text-[0.62rem] font-bold tracking-[0.12em] text-gold"
              aria-hidden="true"
            >
              {friendshipConfig.friendName.slice(0, 1)}
              {friendshipConfig.senderName.slice(0, 1)}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="serif-italic text-[1.02rem] text-ink">
                {friendshipConfig.siteTitle}
              </span>
              <span className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-ink-faint">
                for {friendshipConfig.friendName}
              </span>
            </span>
          </a>

          <nav aria-label="Scrapbook sections" className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-3 py-2 text-[0.82rem] font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-sage-deep"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-sage transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper/80 text-ink transition hover:bg-paper md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close section menu" : "Open section menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="h-[3px] bg-cream" aria-hidden="true">
          <div
            className="h-full rounded-r-full bg-gradient-to-r from-sage to-gold transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(progress, 1)}%` }}
          />
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Scrapbook sections"
          className="border-b border-line bg-ivory/97 px-5 py-4 shadow-[0_20px_30px_-24px_rgba(74,56,40,0.5)] backdrop-blur-md md:hidden"
        >
          <ul className="grid grid-cols-2 gap-1.5">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold transition ${
                    activeId === link.id
                      ? "bg-sage-soft text-sage-deep"
                      : "text-ink-soft hover:bg-cream"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
