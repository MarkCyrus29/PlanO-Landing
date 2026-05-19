"use client";

import { useState } from "react";
import { Upload, Sparkles, CheckSquare, Check, ClipboardPaste, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

/* ── Step data ── */
const steps = [
  {
    icon: Upload,
    num: "01",
    title: "Paste or upload the inquiry",
    shortTitle: "Paste",
    desc: "Manual form or screenshot. Taglish welcome.",
    accent: "var(--color-primary)",
    accentLight: "var(--color-primary-light)",
  },
  {
    icon: Sparkles,
    num: "02",
    title: "Review the AI-extracted brief",
    shortTitle: "Review",
    desc: "Confirm fields, correct errors, download or share.",
    accent: "var(--color-secondary)",
    accentLight: "var(--color-amber-light)",
  },
  {
    icon: CheckSquare,
    num: "03",
    title: "Generate a matched quote",
    shortTitle: "Quote",
    desc: "Your suppliers, your margin, your quote.",
    accent: "var(--color-primary)",
    accentLight: "var(--color-primary-light)",
  },
];

/* ── Animations ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const previewVariants: Variants = {
  enter: { opacity: 0, y: 14, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } },
};

/* ── Mini-demo previews for each step ── */
function StepOnePreview() {
  return (
    <div className="space-y-4">
      <div className="font-mono text-xs text-ink-tertiary tracking-wide mb-3">Incoming Message</div>
      {/* Fake chat bubble */}
      <motion.div
        className="bg-primary-light/60 border border-primary/20 rounded-2xl rounded-tl-md p-4 max-w-[90%]"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.08, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
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
        transition={{ delay: 0.25, duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
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
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 + i * 0.04, duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
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
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 + i * 0.06, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
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
    <section id="how-it-works" className="bg-background py-24 lg:py-48 overflow-clip relative">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={stagger}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center lg:text-left">
          <p className="font-mono text-xs text-ink-tertiary uppercase tracking-widest mb-4">
            The Workflow
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-light text-ink mb-4 leading-snug">
            From raw inquiry <br className="hidden lg:block"/> to ready quote.
          </h2>
          <p className="font-sans text-sm lg:text-base text-ink-secondary">
            <span className="lg:hidden">Tap the steps to see the magic happen.</span>
            <span className="hidden lg:inline">Scroll to see the magic happen.</span>
          </p>
        </motion.div>

        {/* Layout: steps on left, sticky preview on right */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-start relative">

          {/* Mobile step tabs */}
          <div className="lg:hidden w-full flex gap-2">
            {steps.map((s, i) => {
              const isActive = active === i;
              const Icon = s.icon;
              return (
                <button
                  key={s.num}
                  onClick={() => setActive(i)}
                  className={`
                    flex-1 flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-300 cursor-pointer
                    ${isActive
                      ? "bg-surface/80 backdrop-blur-md border-primary/30 shadow-lg shadow-primary/5"
                      : "bg-surface/30 backdrop-blur-sm border-border hover:border-primary/20 hover:bg-surface/50 opacity-60"
                    }
                  `}
                >
                  <div
                    className={`
                      w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300
                      ${isActive ? "bg-primary text-surface shadow-sm shadow-primary/20" : "bg-primary-light text-primary"}
                    `}
                  >
                    <Icon size={18} />
                  </div>
                  <span className={`font-sans text-xs font-medium transition-colors duration-300 ${isActive ? "text-ink" : "text-ink-tertiary"}`}>
                    {s.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Step cards column (Scrollable — desktop only) */}
          <div className="hidden lg:flex flex-col lg:w-[420px] shrink-0 relative lg:py-[20vh]">
            {steps.map((s, i) => {
              const isActive = active === i;
              const Icon = s.icon;

              return (
                <motion.div
                  key={s.num}
                  className="lg:min-h-[50vh] flex flex-col items-stretch mb-8 lg:mb-0"
                  onViewportEnter={() => {
                    // Only trigger scroll spy on desktop to avoid weird mobile jumping
                    if (window.innerWidth >= 1024) setActive(i);
                  }}
                  viewport={{ amount: 0.4, margin: "-5% 0px -35% 0px" }}
                >
                  <button
                    onClick={() => setActive(i)}
                    className={`
                      lg:sticky lg:top-32  relative w-full text-left p-6 lg:p-8 rounded-2xl border transition-all duration-300 cursor-pointer group
                      ${isActive
                        ? "bg-surface/80 backdrop-blur-md border-primary/30 shadow-xl shadow-primary/5 scale-100"
                        : "bg-surface/30 backdrop-blur-sm border-border hover:border-primary/20 hover:bg-surface/50 scale-95 opacity-50 hover:opacity-100"
                      }
                    `}
                  >
                    <div className="flex items-start gap-5">
                      {/* Number + icon */}
                      <div
                        className={`
                          w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300
                          ${isActive ? "bg-primary text-surface shadow-md shadow-primary/20" : "bg-primary-light text-primary"}
                        `}
                      >
                        <Icon size={24} />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-xs text-ink-tertiary">{s.num}</span>
                          <h3 className={`font-sans text-lg font-semibold transition-colors duration-300 ${isActive ? "text-ink" : "text-ink-secondary"}`}>
                            {s.title}
                          </h3>
                        </div>
                        <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Live preview panel (Sticky on Desktop) */}
          <div className="w-full lg:flex-1 lg:sticky lg:top-32 transition-all duration-300 z-20">
            <div className="relative bg-surface/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl overflow-hidden ring-1 ring-ink/5">
              {/* Decorative top bar */}
              <div className="flex items-center gap-1.5 px-6 py-4 border-b border-border/50 bg-background/30 backdrop-blur-md">
                <div className="w-3 h-3 rounded-full bg-border" />
                <div className="w-3 h-3 rounded-full bg-border" />
                <div className="w-3 h-3 rounded-full bg-border" />
                <span className="font-mono text-[10px] text-ink-tertiary ml-4">
                  PlanO Simulation — Step {steps[active].num}
                </span>

                {/* Progress bar */}
                <div className="ml-auto flex items-center gap-1.5">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i <= active ? "bg-primary w-8 shadow-[0_0_8px_rgba(29,158,117,0.4)]" : "bg-border w-3"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content area */}
              <div className="p-8 min-h-[380px] relative bg-gradient-to-b from-surface/50 to-background/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    variants={previewVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="h-full flex flex-col justify-center"
                  >
                    {previews[active]()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile prev/next controls */}
              <div className="lg:hidden px-6 py-4 border-t border-border/50 flex flex items-center justify-between bg-surface/80 backdrop-blur-md">
                <button
                  onClick={() => setActive(Math.max(0, active - 1))}
                  className={`font-sans text-sm transition-colors duration-150 flex flex-row items-center gap-1 ${
                    active === 0 ? "text-ink-tertiary/30 cursor-default" : "text-ink-secondary hover:text-primary cursor-pointer"
                  }`}
                  disabled={active === 0}
                >
                  <ArrowLeft size={14} /> Previous
                </button>
                <button
                  onClick={() => setActive(Math.min(2, active + 1))}
                  className={`font-sans text-sm font-medium flex flex-row items-center gap-1 transition-colors duration-150 ${
                    active === 2 ? "text-ink-tertiary/30 cursor-default" : "text-primary hover:text-primary-dark cursor-pointer"
                  }`}
                  disabled={active === 2}
                >
                  Next Step <ArrowRight size={14} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
