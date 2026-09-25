"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroAnimation() {
  const [animationStep, setAnimationStep] = useState<0 | 1 | 2>(0);
  const [isInView, setIsInView] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return; // Pause animation when offscreen
    
    // Sequence: 0 (Chaos) -> wait 1.2s -> 1 (Scanning) -> wait 1s -> 2 (Clarity) -> wait 3s -> loop
    let timeout: NodeJS.Timeout;
    if (animationStep === 0) {
      timeout = setTimeout(() => setAnimationStep(1), 1200);
    } else if (animationStep === 1) {
      timeout = setTimeout(() => setAnimationStep(2), 1000);
    } else if (animationStep === 2) {
      timeout = setTimeout(() => setAnimationStep(0), 3000);
    }
    return () => clearTimeout(timeout);
  }, [animationStep, isInView]);

  return (
    <motion.div
      ref={heroRef}
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
          <div className="w-full bg-white/95 rounded-2xl border border-border shadow-sm p-6 lg:p-8 relative overflow-hidden">
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
      className={`bg-white/95 shadow-xl rounded-2xl rounded-tl-sm p-3 sm:p-4 w-52 sm:w-64 lg:w-72 border border-border/50 ${offset}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
    >
      <p className="font-sans text-sm text-ink-secondary">{text}</p>
    </motion.div>
  );
}
