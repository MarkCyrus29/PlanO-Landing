"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Users, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

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
  const [animationStep, setAnimationStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    // Sequence: 0 (Chaos) -> wait 2s -> 1 (Scanning) -> wait 1.5s -> 2 (Clarity) -> wait 4s -> loop
    let timeout: NodeJS.Timeout;
    if (animationStep === 0) {
      timeout = setTimeout(() => setAnimationStep(1), 1200);
    } else if (animationStep === 1) {
      timeout = setTimeout(() => setAnimationStep(2), 1000);
    } else if (animationStep === 2) {
      timeout = setTimeout(() => setAnimationStep(0), 3000);
    }
    return () => clearTimeout(timeout);
  }, [animationStep]);

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-8 sm:py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
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
              WAITLIST OPEN — PHILIPPINES
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="font-display text-3xl sm:text-5xl lg:text-7xl font-light text-ink leading-tight mb-4 sm:mb-6">
            Your inquiries, <span className="font-semibold text-primary">briefed.</span>
            <br />
            Your suppliers, <span className="font-semibold text-primary">matched.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={fadeUp} className="font-sans text-base sm:text-lg text-ink-secondary mb-6 sm:mb-8 max-w-md">
            PlanO turns messy client chats into professional event briefs — and finds the right suppliers for your budget, instantly.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <motion.a
              href="#cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-primary text-surface font-sans text-base font-medium px-8 py-3.5 rounded-full hover:bg-primary-dark transition-colors duration-180 flex items-center gap-2 shadow-lg shadow-primary/30 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Join the Waitlist
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.a>
            <Link
              href="#how-it-works"
              className="font-sans text-base text-primary font-medium hover:text-primary-dark transition-colors duration-150"
            >
              See how it works
            </Link>
          </motion.div>

          {/* Social proof 
          <motion.div variants={fadeUp} className="flex items-center gap-2 font-sans text-sm text-ink-tertiary">
            <Users size={14} className="text-ink-tertiary" />
            <span>Joined by coordinators across Luzon, Visayas &amp; Mindanao</span>
          </motion.div> */}
        </motion.div>

        {/* Right: Chaos to Clarity Animation */}
        <motion.div
          className="flex-1 w-full max-w-md lg:max-w-lg relative h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
        >
          {/* Chaos Phase - Chat Bubbles */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-4 z-10"
            initial={false}
            animate={{ 
              opacity: animationStep === 0 ? 1 : animationStep === 1 ? 0.5 : 0,
              scale: animationStep === 2 ? 0.9 : 1,
              filter: animationStep === 1 ? "blur(4px)" : "blur(0px)"
            }}
            transition={{ duration: 0.5 }}
          >
            <ChatBubble 
              text="Hi sis! Magkano pag 150 pax sa Dec 15? May venue na kami." 
              delay={0} offset="-translate-x-2 sm:-translate-x-4 lg:-translate-x-8 -rotate-2" 
            />
            <ChatBubble 
              text="budget is around 450k lang sana. Kasya ba?" 
              delay={0.1} offset="translate-x-3 sm:translate-x-6 lg:translate-x-12 rotate-1" 
            />
            <ChatBubble 
              text="Ah wait, Maria Santos pala name ng bride." 
              delay={0.2} offset="-translate-x-1 sm:-translate-x-2 lg:-translate-x-4 -rotate-1" 
            />
          </motion.div>

          {/* Scanner Phase */}
          <motion.div 
            className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_rgba(29,158,117,0.8)] z-20 rounded-full"
            initial={{ top: "0%", opacity: 0 }}
            animate={{ 
              top: animationStep === 1 ? "100%" : "0%", 
              opacity: animationStep === 1 ? [0, 1, 1, 0] : 0 
            }}
            transition={{ duration: 1.0, ease: "linear" }}
          />

          {/* Clarity Phase - Structured Brief */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30"
            initial={false}
            animate={{ 
              opacity: animationStep === 2 ? 1 : 0,
              y: animationStep === 2 ? 0 : 20,
              scale: animationStep === 2 ? 1 : 0.95
            }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          >
            {animationStep === 2 && (
              <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl border border-white/40 shadow-2xl p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-25 ">
                  <Sparkles size={100} className="text-secondary"/>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-primary font-semibold tracking-wider uppercase">
                      PlanO AI Extraction
                    </div>
                    <div className="font-sans text-sm text-ink-secondary">Event Brief Created</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <DataRow label="Client" value="Maria Santos" />
                  <DataRow label="Date" value="Dec 15, 2026" />
                  <DataRow label="Guest Count" value="150 pax" />
                  <DataRow label="Budget" value="₱450,000" />
                  <div className="flex items-start justify-between py-2 border-t border-border/50">
                    <span className="font-sans text-xs text-ink-tertiary uppercase tracking-wide w-28 shrink-0">Venue</span>
                    <span className="font-sans text-sm font-medium text-primary bg-primary-light/50 px-2 py-0.5 rounded">Provided</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-2 border-t border-border/50 first:border-0">
      <span className="font-sans text-xs text-ink-tertiary uppercase tracking-wide w-28 shrink-0">{label}</span>
      <span className="font-sans text-sm font-medium text-ink text-right">{value}</span>
    </div>
  );
}

function ChatBubble({ text, delay, offset }: { text: string; delay: number; offset: string }) {
  return (
    <motion.div 
      className={`bg-white/90 backdrop-blur shadow-xl rounded-2xl rounded-tl-sm p-3 sm:p-4 w-52 sm:w-64 lg:w-72 border border-border/50 ${offset}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
    >
      <p className="font-sans text-sm text-ink-secondary">{text}</p>
    </motion.div>
  );
}
