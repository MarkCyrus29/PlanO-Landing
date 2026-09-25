"use client";

import { useReveal } from "@/hooks/useReveal";
import React from "react";

export function RevealWrapper({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useReveal();

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
