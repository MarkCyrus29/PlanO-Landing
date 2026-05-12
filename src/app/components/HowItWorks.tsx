"use client";

import { useState } from "react";
import { Upload, Sparkles, CheckSquare, ArrowRight, Check, ClipboardPaste } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

/* ── Step data ── */
const steps = [
  {
    icon: Upload,
    num: "01",
    title: "Paste or upload the inquiry",
    desc: "Manual form or screenshot. Taglish welcome.",
    accent: "var(--color-primary)",
    accentLight: "var(--color-primary-light)",
  },
  {
    icon: Sparkles,
    num: "02",
    title: "Review the AI-extracted brief",
    desc: "Confirm fields, correct errors, download or share.",
    accent: "var(--color-secondary)",
    accentLight: "var(--color-amber-light)",
  },
  {
    icon: CheckSquare,
    num: "03",
    title: "Generate a matched quote",
    desc: "Your suppliers, your margin, your quote.",
    accent: "var(--color-primary)",
    accentLight: "var(--color-primary-light)",
  },
];

/* ── Animations ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const previewVariants: Variants = {
  enter: { opacity: 0, y: 20, scale: 0.97 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.25, ease: "easeIn" } },
};

/* ── Mini-demo previews for each step ── */
function StepOnePreview() {
  return (
    <div className="space-y-4">
      <div className="font-mono text-xs text-ink-tertiary tracking-wide mb-3">Incoming Message</div>
      {/* Fake chat bubble */}
      <motion.div
        className="bg-primary-light/60 border border-primary/20 rounded-2xl rounded-tl-md p-4 max-w-[90%]"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
      >
        <p className="font-sans text-sm text-ink leading-relaxed">
          &quot;Hi po! Naghahanap po kami ng coordinator for our wedding this March 15. Around 150 guests, budget is around 450k. May suggestion po ba kayo for catering and flowers?&quot;
        </p>
        <span className="block font-mono text-[10px] text-ink-tertiary mt-2">via Messenger · 2m ago</span>
      </motion.div>

      {/* Action hint */}
      <motion.div
        className="flex items-center gap-2 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.3 }}
      >
        <ClipboardPaste size={14} className="text-primary" />
        <span className="font-mono text-xs text-primary">Paste detected — ready to process</span>
      </motion.div>
    </div>
  );
}

function StepTwoPreview() {
  const fields = [
    { label: "Event", value: "Wedding Reception", status: "ok" },
    { label: "Date", value: "2026-03-15", status: "ok" },
    { label: "Guests", value: "150 pax", status: "ok" },
    { label: "Budget", value: "₱450,000", status: "ok" },
    { label: "Venue", value: "—", status: "missing" },
  ];

  return (
    <div className="space-y-3">
      <div className="font-mono text-xs text-ink-tertiary tracking-wide mb-3">Extracted Brief</div>
      {fields.map((f, i) => (
        <motion.div
          key={f.label}
          className="flex items-center justify-between py-1.5"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
        >
          <span className="font-mono text-xs text-ink-tertiary uppercase w-16">{f.label}</span>
          <div className="flex items-center gap-2">
            <span className={`font-sans text-sm ${f.status === "missing" ? "text-secondary italic" : "text-ink"}`}>
              {f.status === "missing" ? "Missing" : f.value}
            </span>
            {f.status === "ok" ? (
              <Check size={12} className="text-primary" />
            ) : (
              <motion.span
                className="inline-block w-2 h-2 rounded-full bg-secondary"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StepThreePreview() {
  const suppliers = [
    { cat: "CATERING", name: "Kusina de Manila", price: "₱185,000", match: 96 },
    { cat: "FLOWERS", name: "Bloom PH Studio", price: "₱42,000", match: 91 },
    { cat: "PHOTO", name: "Frame & Light Co.", price: "₱65,000", match: 88 },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-ink-tertiary tracking-wide">Matched Suppliers</span>
        <span className="font-mono text-[10px] text-primary bg-primary-light px-2 py-0.5 rounded-full">
          ₱292,000 / ₱450,000 budget
        </span>
      </div>
      {suppliers.map((s, i) => (
        <motion.div
          key={s.cat}
          className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50 hover:border-primary/40 transition-colors duration-150"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.1, duration: 0.35 }}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-ink-tertiary w-14">{s.cat}</span>
            <span className="font-sans text-sm font-medium text-ink">{s.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-sans text-sm text-primary font-medium">{s.price}</span>
            <span className="font-mono text-[10px] text-primary bg-primary-light px-1.5 py-0.5 rounded">
              {s.match}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const previews = [StepOnePreview, StepTwoPreview, StepThreePreview];

/* ── Main component ── */
export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="bg-background py-24 lg:py-32 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={stagger}
      >
        {/* Header */}
        <motion.p variants={fadeUp} className="font-mono text-xs text-ink-tertiary uppercase tracking-widest mb-4">
          The Workflow
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-3xl lg:text-4xl font-light text-ink mb-4 max-w-lg leading-snug">
          From raw inquiry to ready quote.
        </motion.h2>
        <motion.p variants={fadeUp} className="font-sans text-sm text-ink-secondary mb-14 max-w-md">
          Click each step to see it in action.
        </motion.p>

        {/* Layout: steps on left, preview on right */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Step cards column */}
          <motion.div className="flex flex-col gap-4 lg:w-[380px] shrink-0" variants={stagger}>
            {steps.map((s, i) => {
              const isActive = active === i;
              const Icon = s.icon;

              return (
                <motion.button
                  key={s.num}
                  variants={fadeUp}
                  onClick={() => setActive(i)}
                  className={`
                    relative w-full text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer group
                    ${isActive
                      ? "bg-surface border-primary/30 shadow-lg shadow-primary/5"
                      : "bg-transparent border-border hover:border-primary/20 hover:bg-surface/50"
                    }
                  `}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Active glow accent */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-primary"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start gap-4 pl-2">
                    {/* Number + icon */}
                    <div
                      className={`
                        w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300
                        ${isActive ? "bg-primary text-surface" : "bg-primary-light text-primary"}
                      `}
                    >
                      <Icon size={20} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] text-ink-tertiary">{s.num}</span>
                        <h3 className={`font-sans text-sm font-semibold transition-colors duration-300 ${isActive ? "text-ink" : "text-ink-secondary"}`}>
                          {s.title}
                        </h3>
                      </div>
                      <p className="font-sans text-xs text-ink-tertiary leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      size={16}
                      className={`
                        shrink-0 mt-1 transition-all duration-300
                        ${isActive ? "text-primary opacity-100 translate-x-0" : "text-ink-tertiary opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"}
                      `}
                    />
                  </div>
                </motion.button>
              );
            })}

            {/* Progress dots — mobile hint */}
            <div className="flex items-center justify-center gap-2 mt-2 lg:hidden">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    active === i ? "bg-primary w-6" : "bg-border"
                  }`}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Live preview panel */}
          <motion.div
            variants={fadeUp}
            className="flex-1 w-full min-h-[340px]"
          >
            <div className="relative bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
              {/* Decorative top bar */}
              <div className="flex items-center gap-1.5 px-5 py-3 border-b border-border bg-background/50">
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="font-mono text-[10px] text-ink-tertiary ml-3">
                  PlanO Simulation — Step {steps[active].num}
                </span>

                {/* Progress bar */}
                <div className="ml-auto flex items-center gap-1">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i <= active ? "bg-primary w-6" : "bg-border w-3"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content area */}
              <div className="p-6 min-h-[280px] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    variants={previewVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {previews[active]()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom action bar */}
              <div className="px-6 py-3 border-t border-border flex items-center justify-between bg-background/30">
                <button
                  onClick={() => setActive(Math.max(0, active - 1))}
                  className={`font-sans text-xs transition-colors duration-150 ${
                    active === 0 ? "text-ink-tertiary/30 cursor-default" : "text-ink-secondary hover:text-primary cursor-pointer"
                  }`}
                  disabled={active === 0}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setActive(Math.min(2, active + 1))}
                  className={`font-sans text-xs font-medium flex items-center gap-1 transition-colors duration-150 ${
                    active === 2 ? "text-ink-tertiary/30 cursor-default" : "text-primary hover:text-primary-dark cursor-pointer"
                  }`}
                  disabled={active === 2}
                >
                  Next Step <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
