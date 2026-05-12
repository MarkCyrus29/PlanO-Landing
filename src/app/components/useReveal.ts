"use client";

import { useEffect, useRef } from "react";

export function useReveal(staggerMs = 80) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = el.querySelectorAll(".reveal-hidden, .reveal-left, .reveal-right");
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add("reveal-visible");
            }, i * staggerMs);
          });
          // Also reveal the container itself if it has the class
          if (el.classList.contains("reveal-hidden")) {
            el.classList.add("reveal-visible");
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [staggerMs]);

  return ref;
}
