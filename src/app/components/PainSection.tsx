"use client";

import { MessageSquare, Clock, FileX } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const painPoints = [
  {
    icon: MessageSquare,
    title: "Inquiries live in twelve different chats",
    desc: "Coordinators juggle Messenger, Viber, Instagram DMs, and SMS simultaneously. Nothing is in one place.",
  },
  {
    icon: Clock,
    title: "Manual briefing eats hours you don't have",
    desc: "Building a brief from scratch for every inquiry is time no coordinator bills for.",
  },
  {
    icon: FileX,
    title: "Supplier quotes require endless back-and-forth",
    desc: "Finding the right supplier at the right price is guesswork without a system.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function PainSection() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={stagger}
      >
        {/* Eyebrow */}
        <motion.p variants={fadeUp} className="font-mono text-xs text-ink-tertiary uppercase tracking-widest mb-4">
          Sound Familiar?
        </motion.p>

        {/* Headline */}
        <motion.h2 variants={fadeUp} className="font-display text-3xl lg:text-4xl font-light text-ink mb-16 max-w-xl leading-snug">
          Coordinators are drowning in
          <br />
          <span className="font-semibold text-primary">scattered information.</span>
        </motion.h2>

        {/* Pain Cards */}
        <motion.div className="grid md:grid-cols-3 gap-6" variants={stagger}>
          {painPoints.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="bg-surface rounded-xl border border-border p-6"
            >
              <p.icon size={24} className="text-ink-tertiary mb-4" />
              <h3 className="font-sans text-base font-semibold text-ink mb-2">
                {p.title}
              </h3>
              <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
