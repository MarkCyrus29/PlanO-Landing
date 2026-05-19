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
          <motion.div variants={fadeRight} className="flex-1 w-full relative">  
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative bg-surface/5 backdrop-blur-md border border-surface/10 rounded-2xl p-6 lg:p-8 shadow-2xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">
              <p className="font-mono text-xs text-primary mb-6 tracking-wider">PlanO Extraction Result</p>
              <div className="space-y-4">
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
          <motion.div variants={fadeLeft} className="flex-1 w-full relative">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-secondary/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative bg-amber-light/5 backdrop-blur-md border border-secondary/20 rounded-2xl p-6 lg:p-8 shadow-2xl hover:-translate-y-1 hover:border-secondary/50 transition-all duration-300">
              <div className="space-y-6">
                <MissingRow field="Venue" question="Hi po! May preferred venue na ba kayo, or would you like suggestions?" />
                <MissingRow field="Setup" question="Anong klaseng setup po ang gusto niyo — indoor or outdoor?" />
              </div>
              <button className="mt-8 bg-surface/10 hover:bg-surface/20 w-full rounded-lg py-3 font-sans text-sm text-surface transition-colors duration-150 flex items-center justify-center gap-2">
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
          <motion.div variants={fadeRight} className="flex-1 w-full relative">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative bg-surface/5 backdrop-blur-md border border-surface/10 rounded-2xl p-6 lg:p-8 shadow-2xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300">  
              <p className="font-mono text-xs text-primary mb-5 tracking-wider">Best Matches</p>
              <div className="w-full space-y-3">
                <SupplierRow category="CATERING" name="Kusina Manila Co." price="₱85,000" margin="12% MARGIN" selected={false} />
                <SupplierRow category="FLOWERS" name="Bloom PH Studio" price="₱42,000" margin="25% MARGIN" selected />
                <SupplierRow category="PHOTO" name="Frame & Light Co." price="₱65,000" margin="10% MARGIN" selected={false} />
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
    <div className="flex items-center gap-3 border-b border-surface/5 pb-2 last:border-0">
      <span className="font-mono text-xs text-ink-tertiary w-16 uppercase">{label}</span>
      <span className={`font-mono text-sm ${highlight ? "text-primary bg-primary/10 px-2 py-0.5 rounded" : "text-surface/90"}`}>{value}</span>
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

function SupplierRow({ category, name, price, margin, selected }: { category: string; name: string; price: string; margin?: string; selected: boolean }) {
  return (
    <div className={`flex items-center justify-between p-3 lg:p-4 rounded-xl border backdrop-blur-md transition-all ${selected ? "bg-primary/20 border-primary shadow-[0_0_15px_rgba(29,158,117,0.3)] scale-105" : "bg-surface/5 border-surface/10"}`}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] text-surface/40 hidden sm:block">{category}</span>
        <span className={`font-sans text-sm font-medium ${selected ? "text-white" : "text-surface/80"}`}>{name}</span>
      </div>
      <div className="flex items-center gap-3">
        {margin && <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded hidden sm:block">{margin}</span>}
        <span className={`font-sans text-sm ${selected ? "text-primary font-semibold" : "text-surface/60"}`}>{price}</span>
      </div>
    </div>
  );
}
