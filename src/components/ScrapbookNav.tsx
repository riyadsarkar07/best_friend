"use client";

import { friendshipConfig } from "@/data/friendship-config";

const links = [
  { href: "#home", label: "Home" },
  { href: "#gallery", label: "Gallery" },
  { href: "#timeline", label: "Timeline" },
  { href: "#scratch", label: "Secrets" },
  { href: "#letter", label: "Letter" },
  { href: "#quiz", label: "Quiz" },
  { href: "#finale", label: "Finale" },
];

export function ScrapbookNav({ progress }: { progress: number }) {
  return (
    <header className="sticky top-0 z-30 border-b border-cream-deep/80 bg-[#f6efe4]/88 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <a href="#home" className="font-serif text-lg text-ink">
          {friendshipConfig.siteTitle}
        </a>
        <nav aria-label="Scrapbook sections" className="flex flex-wrap gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-10 rounded-full px-3 py-2 text-sm text-ink-soft hover:bg-sage-soft hover:text-sage-deep"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="h-1 bg-cream-deep" aria-hidden="true">
        <div className="h-full bg-sage transition-[width] duration-200" style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}
