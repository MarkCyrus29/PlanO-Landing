"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const faqs = [
  {
    question: "What is PlanO?",
    answer:
      "PlanO is an AI-powered event planning tool built for Filipino event coordinators. It converts messy client messages — including Taglish — into structured event briefs in seconds and matches coordinators with the right suppliers based on budget, location, and margin preferences.",
  },
  {
    question: "How does PlanO create event briefs?",
    answer:
      "Paste a client message from Messenger, Viber, SMS, or any platform. PlanO's AI reads it — typos, Taglish, and all — and extracts a structured event brief with fields like event type, date, guest count, budget, and venue. It also flags missing details and drafts follow-up questions for you.",
  },
  {
    question: "How does supplier matching work?",
    answer:
      "PlanO matches you with suppliers from your private database. It filters by distance from the venue and price within the client's budget, and optimizes for your profit margin — not just the cheapest option. Your supplier list is private and never shared with other coordinators.",
  },
  {
    question: "How do I get access to PlanO?",
    answer:
      "PlanO is currently rolling out access to waitlist members. Sign up for the waitlist and we'll notify you when your spot is ready.",
  },
  {
    question: "Who is PlanO for?",
    answer:
      "PlanO is built specifically for freelance and independent event coordinators in the Philippines — wedding coordinators, corporate event planners, and debut organizers who manage client inquiries across multiple messaging platforms.",
  },
  {
    question: "Does PlanO understand Taglish?",
    answer:
      "Yes. PlanO's AI is designed to understand Taglish (Tagalog-English mixed language), including informal chat-style messages with abbreviations, typos, and colloquial expressions commonly used in Filipino conversations.",
  },
  {
    question: "Is my supplier list private?",
    answer:
      "Absolutely. Your supplier database in PlanO is private and encrypted. No other coordinator can see your supplier list, pricing, or margin settings. PlanO is not a marketplace — it's your personal coordination tool.",
  },
  {
    question: "When will PlanO launch?",
    answer:
      "PlanO is currently rolling out access in waves to waitlist members. Join the waitlist to be notified when your spot is ready.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="bg-background py-24 lg:py-32">
      <motion.div
        className="max-w-3xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={stagger}
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs text-ink-tertiary uppercase tracking-widest mb-4"
        >
          Frequently Asked Questions
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-display text-3xl lg:text-4xl font-light text-ink mb-12 leading-snug"
        >
          Got questions?{" "}
          <span className="font-semibold text-primary">We have answers.</span>
        </motion.h2>

        <motion.div variants={stagger} className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              variants={fadeUp}
              className="bg-surface/60 backdrop-blur-md rounded-xl border border-border/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 "
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-sans text-sm font-semibold text-ink group-hover:text-primary transition-colors duration-150">
                  {faq.question}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-ink-tertiary shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 font-sans text-sm text-ink-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
