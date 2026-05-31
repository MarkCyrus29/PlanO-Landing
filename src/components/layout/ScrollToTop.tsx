"use client";

import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="text-ink-tertiary hover:text-surface transition-colors duration-150"
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
