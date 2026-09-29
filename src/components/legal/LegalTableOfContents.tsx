"use client";

import { useEffect, useState, useRef } from "react";

export interface TOCItem {
  id: string;
  label: string;
}

interface LegalTableOfContentsProps {
  items: TOCItem[];
}

export default function LegalTableOfContents({ items }: LegalTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = 180;
      let currentActive = items[0]?.id || "";

      // Check if user is scrolled near the bottom of the page
      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isBottom && items.length > 0) {
        currentActive = items[items.length - 1].id;
      } else {
        for (const item of items) {
          const el = document.getElementById(item.id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= offset) {
              currentActive = item.id;
            }
          }
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <aside
      ref={containerRef}
      className="hidden lg:block lg:col-span-3 sticky top-24 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-h-[calc(100vh-6.5rem)] overflow-y-auto pr-2"
      aria-label="Table of contents"
    >
      <p className="font-mono text-[10px] font-semibold text-ink-tertiary uppercase tracking-wider mb-2 pl-2.5">
        Contents
      </p>
      <nav className="space-y-0.5 border-l border-border/40">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block text-[11.5px] leading-snug py-0.5 pl-2.5 transition-all -ml-[1px] border-l-2 ${
                isActive
                  ? "border-primary text-primary font-semibold underline underline-offset-2 decoration-primary decoration-1.5 bg-primary-light/35 rounded-r"
                  : "border-transparent text-ink-secondary hover:text-ink hover:border-border"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
