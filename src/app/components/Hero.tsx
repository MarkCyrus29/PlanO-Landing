"use client";

import { ArrowRight, Users, AlertCircle } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section id="hero" className="relative  overflow-hidden grain-overlay">
      {/* SVG grain filter */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="grainFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
        </defs>
      </svg>

      {/* Decorative background layers */}
      <div className="hero-bg-layers" aria-hidden="true">
        <motion.div
          className="hero-orb hero-orb--primary"
          animate={{ x: [0, 30], y: [0, -20], scale: [1, 1.05] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="hero-orb hero-orb--secondary"
          animate={{ x: [0, -30], y: [0, 20], scale: [1, 1.05] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="hero-dots" />
        <div className="hero-vignette" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Left content */}
        <motion.div
          className="flex-1 max-w-xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Pre-badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="font-mono text-xs text-primary bg-primary-light rounded-full px-3 py-1 tracking-wide">
              NOW IN EARLY ACCESS — PHILIPPINES
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="font-display text-5xl lg:text-7xl font-light text-ink leading-tight mb-6">
            Your inquiries, <span className="font-semibold text-primary">briefed.</span>
            <br />
            Your suppliers, <span className="font-semibold text-primary">matched.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={fadeUp} className="font-sans text-lg text-ink-secondary mb-8 max-w-md">
            PlanO turns messy client chats into professional event briefs — and finds the right suppliers for your budget, instantly.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <a
              href="#cta"
              className="bg-primary text-surface font-sans text-base font-medium px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-180 flex items-center gap-2"
            >
              Get Early Access
              <ArrowRight size={16} />
            </a>
            <a
              href="#how-it-works"
              className="font-sans text-base text-primary underline underline-offset-4 hover:text-primary-dark transition-colors duration-150"
            >
              See how it works
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={fadeUp} className="flex items-center gap-2 font-sans text-sm text-ink-tertiary">
            <Users size={14} className="text-ink-tertiary" />
            <span>Joined by coordinators across Luzon, Visayas &amp; Mindanao</span>
          </motion.div>
        </motion.div>

        {/* Right: Event Brief mockup card */}
        <motion.div
          className="flex-1 w-full max-w-md lg:max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
        >
          <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
            {/* Card header */}
            <div className="font-mono text-xs text-ink-tertiary mb-5 tracking-wide">
              Event Brief · Wedding
            </div>

            {/* Data rows */}
            <div className="space-y-4">
              <DataRow label="Client" value="Maria Santos" />
              <DataRow label="Date" value="March 15, 2026" />
              <DataRow label="Guest Count" value="150 pax" />
              <DataRow label="Budget" value="₱450,000" />
              <div className="flex items-start justify-between py-2">
                <span className="font-sans text-xs text-ink-tertiary uppercase tracking-wide w-28 shrink-0">Venue</span>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="font-mono text-xs text-secondary bg-amber-light px-2 py-0.5 rounded-full flex items-center gap-1"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ delay: 0.8, duration: 0.3, ease: "easeOut" }}
                  >
                    <AlertCircle size={11} className="text-secondary" />
                    Missing
                  </motion.span>
                </div>
              </div>
            </div>

            {/* CTA row */}
            <div className="mt-6 pt-4 border-t border-border">
              <button className="font-sans text-sm text-primary hover:text-primary-dark transition-colors duration-150 flex items-center gap-1">
                Generate follow-up questions
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-2">
      <span className="font-sans text-xs text-ink-tertiary uppercase tracking-wide w-28 shrink-0">{label}</span>
      <span className="font-sans text-sm text-ink text-right">{value}</span>
    </div>
  );
}
