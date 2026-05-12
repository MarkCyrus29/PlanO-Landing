"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section id="cta" className="bg-primary py-24 lg:py-32">
      <motion.div
        className="max-w-2xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp} className="font-display text-4xl lg:text-5xl font-light text-surface mb-6 leading-snug">
          Join coordinators getting
          <br />
          early access to PlanO.
        </motion.h2>
        <motion.p variants={fadeUp} className="font-sans text-base text-surface/80 mb-10">
          Free during beta. No credit card. Cancel anytime.
        </motion.p>

        {!submitted ? (
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full px-4 py-3 rounded-lg bg-surface/10 border border-surface/20 text-surface placeholder:text-surface/50 font-sans text-sm focus:outline-none focus:border-surface transition-colors"
            />
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto whitespace-nowrap bg-surface text-primary font-sans text-sm font-semibold px-6 py-3 rounded-lg hover:bg-primary-light transition-colors duration-180"
            >
              Request Access
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            className="bg-surface/10 border border-surface/20 rounded-xl p-6 max-w-md mx-auto mb-6"
          >
            <p className="font-sans text-base text-surface font-medium mb-1">
              You&rsquo;re on the list!
            </p>
            <p className="font-sans text-sm text-surface/70">
              We&rsquo;ll reach out when your access is ready.
            </p>
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 font-sans text-xs text-surface/60">
          <Lock size={12} />
          <span>Your information is private and never shared with suppliers.</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
