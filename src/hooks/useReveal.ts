"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight IntersectionObserver-based reveal hook.
 * Adds `.reveal-visible` to children with `.reveal-fade-up`, `.reveal-fade-left`, or `.reveal-fade-right`.
 * Uses CSS transitions (no JS animation library).
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = el.querySelectorAll(
            ".reveal-fade-up, .reveal-fade-left, .reveal-fade-right"
          );
          children.forEach((child) => {
            child.classList.add("reveal-visible");
          });
          // Also reveal the container itself
          if (
            el.classList.contains("reveal-fade-up") ||
            el.classList.contains("reveal-fade-left") ||
            el.classList.contains("reveal-fade-right")
          ) {
            el.classList.add("reveal-visible");
          }
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
