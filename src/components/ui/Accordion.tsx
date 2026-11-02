"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ icon, title, children, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  // Recalculate height on resize (content may reflow)
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;
    const el = contentRef.current;
    const observer = new ResizeObserver(() => {
      setHeight(el.scrollHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isOpen]);

  return (
    <div className="rounded-2xl bg-surface border border-border shadow-2xs overflow-hidden transition-shadow duration-200 hover:shadow-xs">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-5 sm:p-6 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="shrink-0 text-primary">{icon}</span>
        <h2 className="flex-1 font-sans text-base font-semibold text-ink leading-snug">
          {title}
        </h2>
        <ChevronDown
          size={18}
          className={`shrink-0 text-ink-tertiary transition-transform duration-300 ease-out group-hover:text-primary ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        style={{ height }}
        className="overflow-hidden transition-[height] duration-300 ease-out"
      >
        <div ref={contentRef} className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Public Accordion ────────────────────────────────── */

interface AccordionProps {
  items: {
    icon: React.ReactNode;
    title: string;
    content: React.ReactNode;
  }[];
  /** Allow multiple items open at once (default: false — only one at a time). */
  allowMultiple?: boolean;
  /** Index of the item to open by default (-1 = none). */
  defaultOpen?: number;
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = -1,
}: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set(defaultOpen >= 0 ? [defaultOpen] : [])
  );

  const toggle = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          icon={item.icon}
          title={item.title}
          isOpen={openIndices.has(i)}
          onToggle={() => toggle(i)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
