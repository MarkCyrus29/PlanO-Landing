"use client";

import { FileText, AlertCircle, Zap } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Features() {
  return (
    <section id="features" className="bg-ink py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-mono text-xs text-primary uppercase tracking-widest mb-4">
            What PlanO Does
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl lg:text-5xl font-light text-surface mb-20 leading-snug">
            Three tools. One workflow.
          </motion.h2>
        </motion.div>

        {/* Feature 1 — text left, mockup right */}
        <motion.div
          className="flex flex-col lg:flex-row items-start gap-12 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger}
        >
          <motion.div variants={fadeLeft} className="flex-1 max-w-md">
            <FileText size={24} className="text-primary mb-4" />
            <h3 className="font-display text-2xl lg:text-3xl font-light text-surface mb-4">
              Turn any inquiry into a professional brief.
            </h3>
            <p className="font-sans text-sm text-ink-tertiary leading-relaxed">
              Paste a client message or upload a screenshot. PlanO reads it — typos, Taglish, and all — and extracts a structured event brief in seconds. No reformatting. No guessing.
            </p>
          </motion.div>
          <motion.div variants={fadeRight} className="flex-1 w-full">
            <div className="bg-surface/5 border border-surface/10 rounded-xl p-5 hover:-translate-y-1 hover:border-primary transition-all duration-200">
              <p className="font-mono text-xs text-ink-tertiary mb-4">Extracted Brief</p>
              <div className="space-y-3">
                <MockRow label="Event" value="Wedding Reception" highlight={false} />
                <MockRow label="Date" value="2026-03-15" highlight={false} />
                <MockRow label="Guests" value="150" highlight />
                <MockRow label="Budget" value="₱450,000" highlight={false} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature 2 — text right, mockup left */}
        <motion.div
          className="flex flex-col lg:flex-row-reverse items-start gap-12 mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger}
        >
          <motion.div variants={fadeRight} className="flex-1 max-w-md">
            <AlertCircle size={24} className="text-secondary mb-4" />
            <h3 className="font-display text-2xl lg:text-3xl font-light text-surface mb-4">
              Know exactly what to ask.
            </h3>
            <p className="font-sans text-sm text-ink-tertiary leading-relaxed">
              PlanO flags every gap in a client inquiry and drafts the follow-up questions in natural Filipino coordinator language — ready to copy-paste directly into Messenger.
            </p>
          </motion.div>
          <motion.div variants={fadeLeft} className="flex-1 w-full">
            <div className="bg-amber-light/10 border border-secondary/20 rounded-xl p-5 hover:-translate-y-1 hover:border-primary transition-all duration-200">
              <div className="space-y-4">
                <MissingRow field="Venue" question="Hi po! May preferred venue na ba kayo, or would you like suggestions?" />
                <MissingRow field="Setup" question="Anong klaseng setup po ang gusto niyo — indoor or outdoor?" />
              </div>
              <button className="mt-5 font-sans text-sm text-primary hover:text-primary-dark transition-colors duration-150">
                Copy questions
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature 3 — text left, mockup right */}
        <motion.div
          className="flex flex-col lg:flex-row items-start gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger}
        >
          <motion.div variants={fadeLeft} className="flex-1 max-w-md">
            <Zap size={24} className="text-primary mb-4" />
            <h3 className="font-display text-2xl lg:text-3xl font-light text-surface mb-4">
              Find the right supplier, not just the cheapest one.
            </h3>
            <p className="font-sans text-sm text-ink-tertiary leading-relaxed">
              Your private supplier list. Filtered by distance from the venue. Optimized for your margin, not the lowest price. Your corpus, your quotes — never visible to other coordinators.
            </p>
          </motion.div>
          <motion.div variants={fadeRight} className="flex-1 w-full">
            <div className="bg-surface/5 border border-surface/10 rounded-xl p-5 hover:-translate-y-1 hover:border-primary transition-all duration-200">
              <div className="space-y-3">
                <SupplierRow category="CATERING" name="Kusina de Manila" price="₱185,000" selected={false} />
                <SupplierRow category="FLOWERS" name="Bloom PH Studio" price="₱42,000" selected />
                <SupplierRow category="PHOTO/VIDEO" name="Frame & Light Co." price="₱65,000" selected={false} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MockRow({ label, value, highlight }: { label: string; value: string; highlight: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-ink-tertiary w-16">{label}</span>
      <span className={`font-mono text-sm ${highlight ? "text-primary" : "text-surface/80"}`}>{value}</span>
    </div>
  );
}

function MissingRow({ field, question }: { field: string; question: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <AlertCircle size={12} className="text-secondary" />
        <span className="font-mono text-xs text-secondary">Missing: {field}</span>
      </div>
      <p className="font-sans text-sm text-surface/80 italic pl-5">{question}</p>
    </div>
  );
}

function SupplierRow({ category, name, price, selected }: { category: string; name: string; price: string; selected: boolean }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${selected ? "bg-primary-light/10 border-primary" : "border-surface/10"}`}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-ink-tertiary">{category}</span>
        <span className="font-sans text-sm font-semibold text-surface">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-sans text-sm text-primary">{price}</span>
        <button className={`font-sans text-xs px-3 py-1 rounded-lg border ${selected ? "border-primary text-primary" : "border-surface/20 text-surface/60"}`}>
          Select
        </button>
      </div>
    </div>
  );
}
