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

const messyChats = [
  "Hi sis magkano pag 100 pax",
  "available ba dec 15?",
  "budget is 250k lang sana",
  "pwede ba out of town?",
  "hm photo and video",
  "my date is nov 8. may venue na",
  "can we do rustic theme?",
  "pa-send rates for partial coord",
];

// Duplicate for seamless marquee
const marqueeItems = [...messyChats, ...messyChats, ...messyChats];

export default function PainSection() {
  return (
    <section className="bg-background py-24 lg:py-32 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
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
        <motion.h2 variants={fadeUp} className="font-display text-3xl lg:text-4xl font-light text-ink mb-12 max-w-xl leading-snug">
          Coordinators are drowning in
          <br />
          <span className="font-semibold text-red-500/80">scattered information.</span>
        </motion.h2>

        {/* Wall of Pain Marquee */}
        <motion.div variants={fadeUp} className="relative w-[100vw] left-1/2 -translate-x-1/2 mb-16 overflow-hidden">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div className="flex gap-4 w-max animate-[marquee_30s_linear_infinite]">
            {marqueeItems.map((chat, i) => (
              <div
                key={i}
                className={`flex-none bg-surface/60 backdrop-blur-sm border border-border/60 px-6 py-3 rounded-2xl rounded-tl-sm text-sm text-ink-secondary/80 whitespace-nowrap ${
                  i % 2 === 0 ? "mt-4" : "mb-4"
                }`}
              >
                {chat}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pain Cards */}
        <motion.div className="grid md:grid-cols-3 gap-6" variants={stagger}>
          {painPoints.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="bg-surface/60 backdrop-blur-md rounded-xl border border-border/80 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-5 border border-red-100">
                <p.icon size={20} className="text-red-400" />
              </div>
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
