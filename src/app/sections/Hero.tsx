import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RevealWrapper } from "../../components/ui/RevealWrapper";
import HeroAnimation from "./HeroAnimation";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden grain-overlay">
      {/* Decorative background layers */}
      <div className="hero-bg-layers" aria-hidden="true">
        <div className="hero-orb hero-orb--primary" />
        <div className="hero-orb hero-orb--secondary" />
        <div className="hero-dots" />
        <div className="hero-vignette" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-8 sm:py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
        {/* Left content */}
        <RevealWrapper className="flex-1 max-w-xl reveal-stagger">
          {/* Pre-badge */}
          <div className="reveal-fade-up mb-6">
            <span className="font-mono text-xs text-primary bg-primary-light rounded-full px-3 py-1 tracking-wide">
              WAITLIST OPEN — PHILIPPINES
            </span>
          </div>

          {/* Headline */}
          <h1 className="reveal-fade-up font-display text-3xl sm:text-5xl lg:text-7xl font-light text-ink leading-tight mb-4 sm:mb-6">
            Your inquiries, <span className="font-semibold text-primary">briefed.</span>
            <br />
            Your suppliers, <span className="font-semibold text-primary">matched.</span>
          </h1>

          {/* Sub-headline / Answer-First Definition for AI Extraction */}
          <p className="reveal-fade-up font-sans text-base sm:text-lg text-ink-secondary mb-4 max-w-md">
            <strong>PlanO is an AI event coordination platform for the Philippines.</strong> It turns messy client chats—including Taglish—into professional event briefs, and automatically finds the right suppliers based on budget, location, and margin.
          </p>

          {/* CTAs */}
          <div className="reveal-fade-up flex flex-col sm:flex-row items-center gap-4 mb-6 mt-8">
            <a
              href="#cta"
              className="relative overflow-hidden bg-primary text-surface font-sans text-base font-medium px-8 py-3.5 rounded-full hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all duration-150 flex items-center gap-2 shadow-lg shadow-primary/30 group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Join the Waitlist
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </a>
            <Link
              href="#how-it-works"
              className="font-sans text-base text-primary font-medium hover:text-primary-dark transition-colors duration-150"
            >
              See how it works
            </Link>
          </div>
        </RevealWrapper>

        {/* Right: Chaos to Clarity Animation */}
        <HeroAnimation />
      </div>
    </section>
  );
}
